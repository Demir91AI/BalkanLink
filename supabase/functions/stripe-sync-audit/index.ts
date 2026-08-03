import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const log = (step: string, details?: unknown) => {
  const extra = details ? ` ${JSON.stringify(details)}` : "";
  console.log(`[stripe-sync-audit] ${step}${extra}`);
};

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

  try {
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");

    const token = req.headers.get("Authorization")?.replace("Bearer ", "").trim();
    if (!token) return new Response(JSON.stringify({ error: "unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    const { data: userData, error: userError } = await admin.auth.getUser(token);
    if (userError || !userData?.user) {
      return new Response(JSON.stringify({ error: "unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    const { data: isAdmin } = await admin.rpc("has_role", { _user_id: userData.user.id, _role: "admin" });
    if (!isAdmin) {
      return new Response(JSON.stringify({ error: "forbidden" }), { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const body = req.method === "POST" ? await req.json().catch(() => ({})) : {};
    const applyFix: boolean = body?.apply === true;
    const targetEmail: string | null = typeof body?.email === "string" && body.email.trim()
      ? body.email.trim().toLowerCase()
      : null;

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

    const summary = {
      stripeSubscriptions: subs.length,
      stripeActive: subs.filter((s) => s.status === "active" || s.status === "trialing").length,
      profiles: profiles?.length ?? 0,
      mismatches: rows.filter((r) => r.status !== "ok").length,
      fixed,
      checkedAt: new Date().toISOString(),
    };

    rows.sort((a, b) => (a.status === "ok" ? 1 : 0) - (b.status === "ok" ? 1 : 0) || a.email.localeCompare(b.email));

    return new Response(JSON.stringify({ summary, rows }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    log("ERROR", { message });
    return new Response(JSON.stringify({ error: message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
