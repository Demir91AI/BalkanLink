import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const log = (step: string, details?: unknown) => {
  console.log(`[STRIPE-WEBHOOK] ${step}${details ? ` - ${JSON.stringify(details)}` : ""}`);
};

serve(async (req) => {
  // Only POST is valid for webhooks
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
  const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
  if (!stripeKey || !webhookSecret) {
    log("ERROR", "Missing STRIPE_SECRET_KEY or STRIPE_WEBHOOK_SECRET");
    return new Response("Server misconfigured", { status: 500 });
  }

  const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });
  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    log("ERROR", "Missing stripe-signature header");
    return new Response("Missing signature", { status: 400 });
  }

  const body = await req.text();
  let event: Stripe.Event;

  try {
    event = await stripe.webhooks.constructEventAsync(body, signature, webhookSecret);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    log("Signature verification failed", { error: msg });
    return new Response(`Webhook signature verification failed: ${msg}`, { status: 400 });
  }

  log("Event received", { type: event.type, id: event.id });

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );

  try {
    switch (event.type) {
      // ── Checkout completed ──────────────────────────────────
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.user_id;
        const customerEmail = session.customer_email ?? session.customer_details?.email;

        log("checkout.session.completed", { userId, customerEmail, mode: session.mode });

        if (session.mode === "subscription" && userId) {
          // Fetch subscription details for expiration date
          const subscriptionId = session.subscription as string;
          if (subscriptionId) {
            const sub = await stripe.subscriptions.retrieve(subscriptionId);
            const expiresAt = new Date(sub.current_period_end * 1000).toISOString();

            const { error } = await supabase.from("profiles").update({
              is_premium: true,
              subscription_tier: "premium",
              subscription_expires_at: expiresAt,
            }).eq("id", userId);

            if (error) {
              log("ERROR updating profile", { userId, error: error.message });
            } else {
              log("Profile activated", { userId, expiresAt });
            }
          }
        }

        // One-time payment — handle DeutschTrainer level purchases etc.
        if (session.mode === "payment" && userId) {
          const formSlug = session.metadata?.form_slug;
          if (formSlug) {
            const { error } = await supabase.from("user_form_access").insert({
              user_id: userId,
              form_slug: formSlug,
              status: "active",
            });
            if (error) log("ERROR granting form access", { error: error.message });
            else log("Form access granted", { userId, formSlug });
          }
        }
        break;
      }

      // ── Subscription updated (renewal, upgrade, downgrade) ──
      case "customer.subscription.updated": {
        const sub = event.data.object as Stripe.Subscription;
        const customerId = sub.customer as string;
        const customer = await stripe.customers.retrieve(customerId);
        if (customer.deleted) break;

        const email = (customer as Stripe.Customer).email;
        if (!email) break;

        const isActive = sub.status === "active" || sub.status === "trialing";
        const expiresAt = new Date(sub.current_period_end * 1000).toISOString();

        const { error } = await supabase.from("profiles").update({
          is_premium: isActive,
          subscription_tier: isActive ? "premium" : "free",
          subscription_expires_at: isActive ? expiresAt : null,
        }).eq("email", email);

        if (error) log("ERROR updating subscription", { email, error: error.message });
        else log("Subscription updated", { email, status: sub.status, isActive });
        break;
      }

      // ── Subscription deleted / cancelled ────────────────────
      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        const customerId = sub.customer as string;
        const customer = await stripe.customers.retrieve(customerId);
        if (customer.deleted) break;

        const email = (customer as Stripe.Customer).email;
        if (!email) break;

        const { error } = await supabase.from("profiles").update({
          is_premium: false,
          subscription_tier: "free",
          subscription_expires_at: null,
        }).eq("email", email);

        if (error) log("ERROR deactivating subscription", { email, error: error.message });
        else log("Subscription deactivated", { email });
        break;
      }

      // ── Invoice payment failed ──────────────────────────────
      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        const customerEmail = invoice.customer_email;
        log("Payment failed", { email: customerEmail, invoiceId: invoice.id });
        // Don't deactivate immediately — Stripe retries. 
        // Deactivation happens via customer.subscription.deleted after all retries fail.
        break;
      }

      default:
        log("Unhandled event type", { type: event.type });
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    log("ERROR processing webhook", { error: msg });
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
