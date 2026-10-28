import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";
import { LEGACY_PREMIUM_PRICE_IDS } from "../_shared/products.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const log = (step: string, details?: unknown) => {
  const extra = details ? ` ${JSON.stringify(details)}` : "";
  console.log(`[stripe-sync-audit] ${step}${extra}`);
};

type NotifyArgs = {
  admin: any;
  type: string;
  severity: "info" | "success" | "warning" | "error";
  title: string;
  body: string;
  metadata?: Record<string, unknown>;
  email?: Record<string, unknown> | null;
};

async function notifyAdmins({ admin, type, severity, title, body, metadata = {} }: NotifyArgs) {
  // Source-only: internal audits no longer depend on the user email queue.
  // Checked insert preserves existing table compatibility; atomic dedupe needs staged SQL.
  const result = await admin.from("admin_notifications").insert({ type, severity, title, body, metadata });
  if (result.error) throw new Error("INTERNAL_NOTIFICATION_NOT_PERSISTED");
}

const toIso = (value: unknown): string | null => {
  const seconds = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(seconds) || seconds <= 0) return null;
  const d = new Date(seconds * 1000);
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
};

const periodEndOf = (sub: any): string | null =>
  toIso(sub?.current_period_end ?? sub?.items?.data?.[0]?.current_period_end);

type Row = {
  email: string;
  user_id: string | null;
  db_tier: string | null;
  db_is_premium: boolean | null;
  db_expires_at: string | null;
  stripe_customer_id: string | null;
  stripe_status: string | null;
  stripe_period_end: string | null;
  stripe_price_id: string | null;
  stripe_interval: string | null;
  cancel_at_period_end: boolean | null;
  diff_days: number | null;
  status: "ok" | "date_mismatch" | "missing_in_db" | "missing_in_stripe" | "no_stripe";
  issue: string | null;
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const admin = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } },
  );

  let actorId: string | null = null;
  let actorEmail: string | null = null;
  let actorAction = "audit";
  let actorTargetEmail: string | null = null;

  const writeSyncLog = async (entry: Record<string, unknown>) => {
    try {
      await admin.from("stripe_sync_log").insert({
        action: actorAction,
        admin_user_id: actorId,
        admin_email: actorEmail,
        target_email: actorTargetEmail,
        ...entry,
      });
    } catch (e) {
      log("sync log insert failed", { message: String(e) });
    }
  };

  try {
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");

    const token = req.headers.get("Authorization")?.replace("Bearer ", "").trim();
    if (!token) return new Response(JSON.stringify({ error: "unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    const { data: userData, error: userError } = await admin.auth.getUser(token);
    if (userError || !userData?.user) {
      return new Response(JSON.stringify({ error: "unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    actorId = userData.user.id;
    actorEmail = userData.user.email ?? null;

    const { data: isAdmin } = await admin.rpc("has_role", { _user_id: userData.user.id, _role: "admin" });
    if (!isAdmin) {
      return new Response(JSON.stringify({ error: "forbidden" }), { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const body = req.method === "POST" ? await req.json().catch(() => ({})) : {};
    const applyFix: boolean = body?.apply === true;
    const targetEmail: string | null = typeof body?.email === "string" && body.email.trim()
      ? body.email.trim().toLowerCase()
      : null;

    actorAction = applyFix ? (targetEmail ? "sync_user" : "sync_all") : "audit";
    actorTargetEmail = targetEmail;

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });

    // 1) All Stripe subscriptions (all statuses)
    const subs: any[] = [];
    for await (const sub of stripe.subscriptions.list({ status: "all", limit: 100, expand: ["data.customer"] })) {
      subs.push(sub);
    }
    log("stripe subscriptions loaded", { count: subs.length });

    // 2) Profiles
    const { data: profiles, error: profErr } = await admin
      .from("profiles")
      .select("id, email, is_premium, subscription_tier, subscription_expires_at");
    if (profErr) throw profErr;

    const byEmail = new Map<string, any>();
    for (const p of profiles ?? []) {
      if (p.email) byEmail.set(p.email.toLowerCase(), p);
    }

    const rows: Row[] = [];
    const seenEmails = new Set<string>();

    for (const sub of subs) {
      const customer: any = sub.customer;
      const email: string | null = (typeof customer === "object" ? customer?.email : null) ?? null;
      const key = email?.toLowerCase() ?? "";
      if (key) seenEmails.add(key);
      const profile = key ? byEmail.get(key) : null;

      const periodEnd = periodEndOf(sub);
      const price = sub.items?.data?.[0]?.price;
      // Only consumer Premium subscriptions are relevant for profile access
      if (!sub.items?.data?.some((it: any) => LEGACY_PREMIUM_PRICE_IDS.includes(it.price?.id))) continue;
      if (profile?.subscription_tier === "lifetime") continue;
      const dbExp = profile?.subscription_expires_at ?? null;

      let diffDays: number | null = null;
      if (periodEnd && dbExp) {
        diffDays = Math.round((new Date(periodEnd).getTime() - new Date(dbExp).getTime()) / 86400000);
      }

      let status: Row["status"] = "ok";
      let issue: string | null = null;
      const stripeActive = sub.status === "active" || sub.status === "trialing";

      if (!profile) {
        status = "missing_in_db";
        issue = "Stripe pretplata bez profila u bazi";
      } else if (stripeActive && (!profile.is_premium || !dbExp)) {
        status = "date_mismatch";
        issue = "Stripe aktivan, baza nije premium / nema datum isteka";
      } else if (stripeActive && diffDays !== null && Math.abs(diffDays) >= 1) {
        status = "date_mismatch";
        issue = `Razlika u datumu isteka: ${diffDays > 0 ? "+" : ""}${diffDays} dana`;
      } else if (!stripeActive && profile.is_premium && dbExp && new Date(dbExp).getTime() > Date.now()) {
        status = "date_mismatch";
        issue = `Stripe status "${sub.status}", a baza još daje premium`;
      }

      rows.push({
        email: email ?? "(bez emaila)",
        user_id: profile?.id ?? null,
        db_tier: profile?.subscription_tier ?? null,
        db_is_premium: profile?.is_premium ?? null,
        db_expires_at: dbExp,
        stripe_customer_id: typeof customer === "object" ? customer?.id ?? null : customer ?? null,
        stripe_status: sub.status,
        stripe_period_end: periodEnd,
        stripe_price_id: price?.id ?? null,
        stripe_interval: price?.recurring?.interval ?? null,
        cancel_at_period_end: sub.cancel_at_period_end ?? null,
        diff_days: diffDays,
        status,
        issue,
      });
    }

    // 3) Profiles marked premium but with no Stripe subscription at all
    for (const p of profiles ?? []) {
      const key = p.email?.toLowerCase();
      if (!key || seenEmails.has(key)) continue;
      const isPaidTier = p.subscription_tier === "premium" || p.subscription_tier === "premium_yearly";
      if (!p.is_premium && !isPaidTier) continue;
      rows.push({
        email: p.email,
        user_id: p.id,
        db_tier: p.subscription_tier,
        db_is_premium: p.is_premium,
        db_expires_at: p.subscription_expires_at,
        stripe_customer_id: null,
        stripe_status: null,
        stripe_period_end: null,
        stripe_price_id: null,
        stripe_interval: null,
        cancel_at_period_end: null,
        diff_days: null,
        status: isPaidTier ? "missing_in_stripe" : "no_stripe",
        issue: isPaidTier ? "Baza kaže plaćeni premium, ali nema Stripe pretplate" : null,
      });
    }

    // 4) Optional: apply fixes (align DB with Stripe). When `email` is set, only that user.
    let fixed = 0;
    if (applyFix) {
      for (const row of rows) {
        if (targetEmail && row.email.toLowerCase() !== targetEmail) continue;
        if (!row.user_id) continue;
        if (!targetEmail && row.status !== "date_mismatch") continue;
        if (targetEmail && row.status === "ok" && !row.stripe_status) continue;
        const stripeActive = row.stripe_status === "active" || row.stripe_status === "trialing";
        if (stripeActive && row.stripe_period_end) {
          const tier = row.stripe_interval === "year" ? "premium_yearly" : "premium";
          const { error } = await admin
            .from("profiles")
            .update({ is_premium: true, subscription_tier: tier, subscription_expires_at: row.stripe_period_end })
            .eq("id", row.user_id);
          if (!error) fixed++;
        } else if (!stripeActive) {
          const { error } = await admin
            .from("profiles")
            .update({ is_premium: false, subscription_tier: "free", subscription_expires_at: null })
            .eq("id", row.user_id);
          if (!error) fixed++;
        }
      }
      log("fixes applied", { fixed });
    }

    // 5) Payment records from the database, grouped by status
    const { data: paymentRows } = await admin
      .from("payments")
      .select("id, user_id, amount, currency, status, paid_at, created_at")
      .order("created_at", { ascending: false })
      .limit(200);

    const profileById = new Map((profiles ?? []).map((p: any) => [p.id, p]));
    const payments = (paymentRows ?? []).map((p: any) => ({
      ...p,
      email: profileById.get(p.user_id)?.email ?? null,
    }));

    const normalize = (s: string | null) => {
      const v = (s ?? "").toLowerCase();
      if (v === "paid" || v === "succeeded") return "paid";
      if (v === "failed" || v === "canceled" || v === "cancelled") return "failed";
      return "pending";
    };
    const paymentTotals = {
      paid: payments.filter((p) => normalize(p.status) === "paid").length,
      failed: payments.filter((p) => normalize(p.status) === "failed").length,
      pending: payments.filter((p) => normalize(p.status) === "pending").length,
      paidAmountCents: payments
        .filter((p) => normalize(p.status) === "paid")
        .reduce((sum, p) => sum + (Number(p.amount) || 0), 0),
    };

    const summary = {
      stripeSubscriptions: subs.length,
      stripeActive: subs.filter((s) => s.status === "active" || s.status === "trialing").length,
      profiles: profiles?.length ?? 0,
      mismatches: rows.filter((r) => r.status !== "ok").length,
      fixed,
      checkedAt: new Date().toISOString(),
      payments: paymentTotals,
    };

    rows.sort((a, b) => (a.status === "ok" ? 1 : 0) - (b.status === "ok" ? 1 : 0) || a.email.localeCompare(b.email));

    // 6) Admin notifications (in-app + email)
    const mismatchRows = rows.filter((r) => r.status !== "ok");
    const emailRows = mismatchRows.slice(0, 15).map((r) => ({
      email: r.email,
      status: r.status,
      issue: r.issue,
      db_expires_at: r.db_expires_at,
      stripe_period_end: r.stripe_period_end,
      diff_days: r.diff_days,
    }));

    if (applyFix) {
      const ok = fixed > 0;
      const scope = targetEmail ? `korisnika ${targetEmail}` : "svih neslaganja";
      await notifyAdmins({
        admin,
        type: "stripe_sync",
        severity: ok ? "success" : "error",
        title: ok ? `Stripe sync uspješan (${scope})` : `Stripe sync nije ništa promijenio (${scope})`,
        body: ok
          ? `Ažurirano profila: ${fixed}. Preostalih neslaganja: ${mismatchRows.length}.`
          : `Sync je pokrenut za ${scope}, ali nijedan profil nije ažuriran. Preostalih neslaganja: ${mismatchRows.length}.`,
        metadata: { fixed, target: targetEmail, mismatches: mismatchRows.length },
        email: {
          outcome: ok ? "success" : "failure",
          headline: ok ? "Stripe sync uspješan" : "Stripe sync nije ništa promijenio",
          message: ok
            ? `Ažurirano profila: ${fixed} (${scope}).`
            : `Sync pokrenut za ${scope}, ali nijedan profil nije ažuriran.`,
          checkedAt: summary.checkedAt,
          stripeActive: summary.stripeActive,
          mismatches: mismatchRows.length,
          fixed,
          rows: emailRows,
        },
      });
    } else if (mismatchRows.length > 0) {
      await notifyAdmins({
        admin,
        type: "stripe_mismatch",
        severity: "warning",
        title: `Otkriveno ${mismatchRows.length} neslaganja Stripe ↔ baza`,
        body: mismatchRows
          .slice(0, 5)
          .map((r) => `${r.email}: ${r.issue ?? r.status}`)
          .join(" · "),
        metadata: { mismatches: mismatchRows.length, rows: emailRows },
        email: {
          outcome: "mismatch",
          headline: "Otkriveno neslaganje Stripe ↔ baza",
          message: `Pronađeno je ${mismatchRows.length} neslaganja između Stripe pretplata i baze.`,
          checkedAt: summary.checkedAt,
          stripeActive: summary.stripeActive,
          mismatches: mismatchRows.length,
          fixed: 0,
          rows: emailRows,
        },
      });
    }

    await writeSyncLog({
      success: applyFix ? fixed > 0 : true,
      records_updated: fixed,
      mismatches_found: mismatchRows.length,
      details: {
        stripeSubscriptions: summary.stripeSubscriptions,
        stripeActive: summary.stripeActive,
        profiles: summary.profiles,
        payments: summary.payments,
      },
    });

    return new Response(JSON.stringify({ summary, rows, payments }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    log("ERROR", { message });
    await writeSyncLog({ success: false, error_message: message });
    await notifyAdmins({
      admin,
      type: "stripe_sync",
      severity: "error",
      title: "Stripe sync neuspješan",
      body: message,
      metadata: { error: message },
      email: {
        outcome: "failure",
        headline: "Stripe sync neuspješan",
        message,
        checkedAt: new Date().toISOString(),
        mismatches: 0,
        fixed: 0,
        rows: [],
      },
    });
    return new Response(JSON.stringify({ error: message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
