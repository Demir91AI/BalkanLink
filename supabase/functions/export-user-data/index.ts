import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

function fmtDate(iso?: string | null): string {
  if (!iso) return "—";
  try {
    const d = new Date(iso);
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();
    const hh = String(d.getHours()).padStart(2, "0");
    const mi = String(d.getMinutes()).padStart(2, "0");
    return `${dd}.${mm}.${yyyy} ${hh}:${mi}`;
  } catch {
    return String(iso);
  }
}

function fmtDateOnly(iso?: string | null): string {
  if (!iso) return "—";
  try {
    const d = new Date(iso);
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();
    return `${dd}.${mm}.${yyyy}`;
  } catch {
    return String(iso);
  }
}

function section(title: string): string {
  const line = "─".repeat(60);
  return `\n${line}\n  ${title.toUpperCase()}\n${line}\n`;
}

function kv(label: string, value: unknown): string {
  const v = value === null || value === undefined || value === "" ? "—" : String(value);
  return `  ${label.padEnd(28, " ")}${v}\n`;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabase.auth.getUser(token);
    if (userError || !userData.user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const userId = userData.user.id;
    const userEmail = userData.user.email;

    const [
      profile,
      payments,
      mrezaPayments,
      ads,
      notifPrefs,
      trainerProgress,
      docCheckUsage,
      chatUsage,
      formAccess,
    ] = await Promise.all([
      supabase.from("profiles").select("*").eq("id", userId).maybeSingle(),
      supabase.from("payments").select("*").eq("user_id", userId).order("created_at", { ascending: false }),
      supabase.from("mreza_payments").select("*").eq("user_id", userId).order("created_at", { ascending: false }),
      supabase.from("ads").select("*").eq("user_id", userId).order("created_at", { ascending: false }),
      supabase.from("classifieds_notification_preferences").select("*").eq("user_id", userId),
      supabase.from("trainer_progress").select("*").eq("user_id", userId).maybeSingle(),
      supabase.from("doc_check_usage").select("*").eq("user_id", userId).order("used_at", { ascending: false }),
      supabase.from("chat_usage").select("*").eq("user_id", userId).order("used_at", { ascending: false }),
      supabase.from("user_form_access").select("*").eq("user_id", userId).order("purchased_at", { ascending: false }),
    ]);

    const p = profile.data;
    const tp = trainerProgress.data;

    let out = "";
    out += "═══════════════════════════════════════════════════════════\n";
    out += "       BALKANLINK — IZVJEŠTAJ O TVOJIM PODACIMA\n";
    out += "       GDPR čl. 15 — Pravo na pristup podacima\n";
    out += "═══════════════════════════════════════════════════════════\n";
    out += `\n  Generisano:    ${fmtDate(new Date().toISOString())}\n`;
    out += `  Korisnik:      ${userEmail ?? "—"}\n`;
    out += `  ID računa:     ${userId}\n`;

    out += section("Profil");
    if (p) {
      out += kv("Ime", p.first_name);
      out += kv("Email", p.email);
      out += kv("Račun kreiran", fmtDate(p.created_at));
      out += kv("Posljednja prijava", fmtDate(p.last_login_at));
      out += kv("Premium status", p.is_premium ? "Aktivan" : "Neaktivan");
      out += kv("Paket", p.subscription_tier);
      out += kv("Pretplata ističe", fmtDateOnly(p.subscription_expires_at));
    } else {
      out += "  (nema podataka)\n";
    }

    out += section("Plaćanja (Stripe)");
    const allPayments = payments.data ?? [];
    if (allPayments.length === 0) {
      out += "  (nema zabilježenih plaćanja)\n";
    } else {
      for (const pay of allPayments) {
        out += `  • ${fmtDate(pay.created_at)}  ${pay.amount} ${pay.currency?.toUpperCase() ?? "EUR"}  —  ${pay.status}\n`;
        if (pay.transaction_id) out += `    Transakcija: ${pay.transaction_id}\n`;
      }
    }

    const mreza = mrezaPayments.data ?? [];
    if (mreza.length > 0) {
      out += section("Plaćanja (Mreža / oglasi)");
      for (const pay of mreza) {
        out += `  • ${fmtDate(pay.created_at)}  ${pay.amount} ${pay.currency?.toUpperCase() ?? "EUR"}  —  ${pay.status}  (${pay.product_type})\n`;
      }
    }

    out += section("Oglasi");
    const allAds = ads.data ?? [];
    if (allAds.length === 0) {
      out += "  (nema oglasa)\n";
    } else {
      for (const ad of allAds) {
        out += `  • [${ad.status}] ${ad.title}\n`;
        out += `    ${ad.city}, ${ad.bundesland}  —  ${ad.domain}/${ad.type}\n`;
        out += `    Postavljeno: ${fmtDate(ad.created_at)}\n`;
      }
    }

    out += section("Pristup formularima (Premium)");
    const access = formAccess.data ?? [];
    if (access.length === 0) {
      out += "  (nema posebnih pristupa)\n";
    } else {
      for (const a of access) {
        out += `  • ${a.form_slug}  —  ${fmtDateOnly(a.purchased_at)}  (${a.status})\n`;
      }
    }

    out += section("Deutsch Trainer napredak");
    if (tp) {
      out += kv("Nivo", tp.level);
      out += kv("XP", tp.xp);
      out += kv("Streak", tp.streak);
      out += kv("Završene lekcije", (tp.completed_lessons ?? []).length);
      out += kv("Posljednja izmjena", fmtDate(tp.updated_at));
    } else {
      out += "  (nema napretka)\n";
    }

    out += section("Korištenje servisa");
    out += kv("Provjere dokumenata", (docCheckUsage.data ?? []).length);
    out += kv("Pitanja Asistentu", (chatUsage.data ?? []).length);

    const prefs = notifPrefs.data ?? [];
    if (prefs.length > 0) {
      out += section("Notifikacije (oglasi)");
      for (const pref of prefs) {
        out += `  • ${pref.category}: ${pref.enabled ? "uključeno" : "isključeno"}\n`;
      }
    }

    out += "\n═══════════════════════════════════════════════════════════\n";
    out += "  Ovo je tvoja kompletna kopija podataka u skladu sa\n";
    out += "  GDPR članom 15. Za brisanje računa (čl. 17) koristi\n";
    out += "  opciju u 'Postavke računa' na profilu.\n";
    out += "\n  Kontakt: kontakt@balkanlink.de\n";
    out += "═══════════════════════════════════════════════════════════\n";

    return new Response(out, {
      headers: {
        ...corsHeaders,
        "Content-Type": "text/plain; charset=utf-8",
        "Content-Disposition": `attachment; filename="balkanlink-podaci-${new Date().toISOString().slice(0, 10)}.txt"`,
      },
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("[export-user-data]", msg);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
