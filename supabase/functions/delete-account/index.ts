import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const log = (step: string, details?: unknown) => {
  const d = details ? ` - ${JSON.stringify(details)}` : "";
  console.log(`[delete-account] ${step}${d}`);
};

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

    // ---------------------------------------------------------------
    // STEP 0 — Confirmation guard. MUST pass before ANY destructive
    // operation (Stripe cancellation, DB deletes, auth deletion).
    // Mirrors client-side checks in src/pages/MojiPodaci.tsx.
    // ---------------------------------------------------------------
    const body = await req.json().catch(() => ({}));
    const { confirm_email, confirm_text } = body as {
      confirm_email?: string;
      confirm_text?: string;
    };
    // Sesija je već autentifikovana (token validiran iznad). Tražimo samo
    // tipkanu potvrdu "OBRIŠI" — case-insensitive, trim — kako bi se izbjegli
    // slučajni klikovi. Email kompariranje je uklonjeno jer je sesija dovoljna.
    const textMatches =
      typeof confirm_text === "string" &&
      confirm_text.trim().toUpperCase() === "OBRIŠI";

    if (!textMatches) {
      log("confirmation guard FAILED — aborting before any destructive op", {
        textMatches,
      });
      return new Response(
        JSON.stringify({ error: "Potvrda nije ispravna. Ukucaj OBRIŠI." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    log("confirmation guard PASSED — proceeding with deletion", { userId, userEmail });

    // ---------------------------------------------------------------
    // STEP 1 — Cancel active Stripe subscriptions.
    // Runs ONLY after the guard above. Failures are collected and
    // reported to the client but do NOT abort account deletion (user
    // has explicitly requested erasure under GDPR čl. 17).
    // ---------------------------------------------------------------
    const stripeWarnings: string[] = [];
    let stripeCancelledCount = 0;
    try {
      const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
      if (!stripeKey) {
        stripeWarnings.push("STRIPE_SECRET_KEY nije konfigurisan — preskačem otkazivanje pretplate.");
        log("stripe key missing — skipping cancellation");
      } else if (!userEmail) {
        stripeWarnings.push("Email korisnika nije dostupan — preskačem Stripe pretragu.");
      } else {
        const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });
        let customers;
        try {
          customers = await stripe.customers.list({ email: userEmail, limit: 5 });
        } catch (e) {
          const msg = e instanceof Error ? e.message : String(e);
          stripeWarnings.push(`Stripe customers.list nije uspio: ${msg}`);
          log("stripe customers.list failed", { error: msg });
          customers = { data: [] as Array<{ id: string }> };
        }

        for (const customer of customers.data) {
          let subs;
          try {
            subs = await stripe.subscriptions.list({
              customer: customer.id,
              status: "active",
              limit: 10,
            });
          } catch (e) {
            const msg = e instanceof Error ? e.message : String(e);
            stripeWarnings.push(`Stripe subscriptions.list nije uspio za ${customer.id}: ${msg}`);
            log("stripe subscriptions.list failed", { customerId: customer.id, error: msg });
            continue;
          }

          for (const sub of subs.data) {
            try {
              await stripe.subscriptions.cancel(sub.id);
              stripeCancelledCount += 1;
              log("cancelled subscription", { subId: sub.id });
            } catch (e) {
              const msg = e instanceof Error ? e.message : String(e);
              stripeWarnings.push(`Otkazivanje pretplate ${sub.id} nije uspjelo: ${msg}`);
              log("stripe subscriptions.cancel failed", { subId: sub.id, error: msg });
            }
          }
        }
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      stripeWarnings.push(`Neočekivana greška pri Stripe operaciji: ${msg}`);
      log("stripe block unexpected error (continuing)", { error: msg });
    }

    // 2. Delete user-owned rows across all related tables
    const tables = [
      "ads",
      "classifieds_notification_preferences",
      "trainer_progress",
      "doc_check_usage",
      "chat_usage",
      "user_form_access",
      "user_roles",
      "reviews",
      "directory_listings",
      "pro_services",
      "mreza_payments",
      "payments",
    ];

    for (const table of tables) {
      const { error } = await supabase.from(table).delete().eq("user_id", userId);
      if (error) log(`failed to delete from ${table} (continuing)`, { error: error.message });
    }

    // 3. Delete profile (id = user_id)
    const { error: profErr } = await supabase.from("profiles").delete().eq("id", userId);
    if (profErr) log("failed to delete profile (continuing)", { error: profErr.message });

    // 4. Delete auth user (final step)
    const { error: authErr } = await supabase.auth.admin.deleteUser(userId);
    if (authErr) {
      log("auth delete failed", { error: authErr.message });
      return new Response(
        JSON.stringify({ error: `Brisanje auth korisnika nije uspjelo: ${authErr.message}` }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    log("deletion complete", { userId, stripeCancelledCount, stripeWarnings });
    return new Response(
      JSON.stringify({
        success: true,
        stripe_cancelled_count: stripeCancelledCount,
        stripe_warnings: stripeWarnings,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("[delete-account] ERROR", msg);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
