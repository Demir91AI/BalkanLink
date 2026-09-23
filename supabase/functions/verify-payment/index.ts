import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";
import { fulfillCheckoutSession } from "../_shared/products.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

type Status = "succeeded" | "pending" | "invalid";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? ""
  );

  try {
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header");
    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError || !userData.user?.email) throw new Error("User not authenticated");

    const url = new URL(req.url);
    let sessionId = url.searchParams.get("session_id");
    if (!sessionId && req.method !== "GET") {
      try {
        const body = await req.json();
        sessionId = body?.session_id ?? null;
      } catch { /* ignore */ }
    }

    if (!sessionId) {
      return new Response(JSON.stringify({ status: "invalid" satisfies Status }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["payment_intent", "subscription", "subscription.latest_invoice"],
    });

    // Ensure session belongs to the requesting user
    if (session.metadata?.user_id && session.metadata.user_id !== userData.user.id) {
      return new Response(JSON.stringify({ status: "invalid" satisfies Status }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }
    if (!session.metadata?.user_id && session.customer_email && session.customer_email !== userData.user.email) {
      const detailsEmail = session.customer_details?.email;
      if (!detailsEmail || detailsEmail !== userData.user.email) {
        return new Response(JSON.stringify({ status: "invalid" satisfies Status }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        });
      }
    }

    const safeIso = (unix: number | null | undefined): string | null => {
      if (typeof unix !== "number" || !Number.isFinite(unix) || unix <= 0) return null;
      try {
        const d = new Date(unix * 1000);
        const iso = d.toISOString();
        return iso;
      } catch {
        return null;
      }
    };

    let status: Status = "pending";
    let amount: number | null = null;
    let currency: string | null = null;
    let transactionId: string | null = null;
    let paidAt: string | null = null;
    let productKey: string | null = null;
    let mode: "payment" | "subscription" | "setup" | null = session.mode ?? null;

    if (session.mode === "subscription") {
      const sub = session.subscription as Stripe.Subscription | null;
      const invoice = (sub?.latest_invoice ?? null) as Stripe.Invoice | string | null;
      const invoiceObj = invoice && typeof invoice === "object" ? invoice : null;

      const paid = session.payment_status === "paid" || sub?.status === "active" || sub?.status === "trialing";
      status = paid ? "succeeded" : "pending";

      amount = invoiceObj?.amount_paid ?? session.amount_total ?? null;
      currency = (invoiceObj?.currency ?? session.currency ?? "eur").toUpperCase();
      transactionId = invoiceObj?.id ?? sub?.id ?? session.id;
      paidAt =
        safeIso((invoiceObj as any)?.status_transitions?.paid_at) ??
        safeIso((invoiceObj as any)?.created) ??
        safeIso(session.created);
    } else {
      const pi = session.payment_intent as Stripe.PaymentIntent | string | null;
      const piObj = pi && typeof pi === "object" ? pi : null;

      if (session.payment_status === "paid" || piObj?.status === "succeeded") {
        status = "succeeded";
      } else if (
        piObj?.status === "requires_payment_method" ||
        piObj?.status === "canceled" ||
        session.status === "expired"
      ) {
        status = "pending";
      } else {
        status = "pending";
      }

      amount = piObj?.amount_received ?? session.amount_total ?? null;
      currency = (piObj?.currency ?? session.currency ?? "eur").toUpperCase();
      transactionId = piObj?.id ?? session.id;
      paidAt = safeIso(piObj?.created) ?? safeIso(session.created);

      // ── Server-side fulfillment (idempotent, allowlisted products only) ──
      if (status === "succeeded") {
        try {
          const adminClient = createClient(
            Deno.env.get("SUPABASE_URL") ?? "",
            Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
            { auth: { persistSession: false } }
          );
          productKey = await fulfillCheckoutSession(stripe, adminClient, session, userData.user.id);
        } catch (e) {
          console.error("fulfillment failed:", e instanceof Error ? e.message : String(e));
        }
      }
    }

    return new Response(
      JSON.stringify({
        status,
        mode,
        amount,        // minor units (cents)
        currency,
        transaction_id: transactionId,
        paid_at: paidAt,
        session_id: session.id,
        product: productKey,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
  } catch (error) {
    console.error("[verify-payment] Error:", error);
    return new Response(JSON.stringify({ error: "Payment verification failed", status: "invalid" satisfies Status }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
