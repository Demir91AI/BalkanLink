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

  const ADMIN_EMAIL = "kontakt@balkanlink.de";
  const formatAmount = (cents: number) => (cents / 100).toFixed(2);
  const notifyAdminPayment = async (payload: {
    email?: string | null;
    productLabel: string;
    amountCents: number;
    currency: string;
    mode: "subscription" | "payment";
    transactionId: string;
    paidAt: string;
  }) => {
    try {
      const { error } = await supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: "admin-new-payment",
          recipientEmail: ADMIN_EMAIL,
          idempotencyKey: `admin-payment-${payload.transactionId}`,
          templateData: {
            email: payload.email ?? "—",
            productLabel: payload.productLabel,
            amountFormatted: formatAmount(payload.amountCents),
            currency: payload.currency,
            mode: payload.mode,
            transactionId: payload.transactionId,
            paidAt: payload.paidAt,
          },
        },
      });
      if (error) log("admin email error", { error: error.message });
      else log("admin payment notified", { txId: payload.transactionId });
    } catch (e) {
      log("admin email threw", { error: e instanceof Error ? e.message : String(e) });
    }
  };

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

            // Record payment in payments table for Historija plaćanja
            const amountTotal = session.amount_total ?? 0;
            const currency = (session.currency ?? "eur").toUpperCase();
            const txId = (session.payment_intent as string) ?? session.id;
            const { error: payErr } = await supabase.from("payments").insert({
              user_id: userId,
              provider: "stripe",
              status: "paid",
              amount: amountTotal,
              currency,
              transaction_id: txId,
              paid_at: new Date().toISOString(),
            });
            if (payErr) log("ERROR inserting payment", { userId, error: payErr.message });
            else log("Payment recorded", { userId, txId, amountTotal });

            await notifyAdminPayment({
              email: customerEmail,
              productLabel: "Premium pretplata",
              amountCents: amountTotal,
              currency,
              mode: "subscription",
              transactionId: txId,
              paidAt: new Date().toISOString(),
            });
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

          const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { limit: 10 });
          const isDocCheck = lineItems.data.some(
            (li) => li.price?.id === "price_1TQDc3R9oGwbVekBYppvp6Y7"
          );
          if (isDocCheck) {
            const { error: creditErr } = await supabase.rpc("grant_doc_check_credit", {
              uid: userId,
              session_id: session.id,
              amt_cents: session.amount_total ?? 299,
              curr: (session.currency ?? "eur").toUpperCase(),
            });
            if (creditErr) log("ERROR granting doc-check credit", { userId, error: creditErr.message });
            else log("Doc-check credit granted", { userId, sessionId: session.id });
          }

          // Record one-time payment in payments table
          const amountTotal = session.amount_total ?? 0;
          const currency = (session.currency ?? "eur").toUpperCase();
          const txId = (session.payment_intent as string) ?? session.id;
          const { error: payErr } = await supabase.from("payments").insert({
            user_id: userId,
            provider: "stripe",
            status: "paid",
            amount: amountTotal,
            currency,
            transaction_id: txId,
            paid_at: new Date().toISOString(),
          });
          if (payErr) log("ERROR inserting one-time payment", { userId, error: payErr.message });
          else log("One-time payment recorded", { userId, txId, amountTotal });

          await notifyAdminPayment({
            email: customerEmail,
            productLabel: isDocCheck ? "Dokumenten-Check (2,99€)" : (formSlug ? `Forma: ${formSlug}` : "Jednokratna uplata"),
            amountCents: amountTotal,
            currency,
            mode: "payment",
            transactionId: txId,
            paidAt: new Date().toISOString(),
          });
        }
        break;
      }

      // ── Subscription renewal payment ─────────────────────────
      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        // Skip the first invoice — it's already covered by checkout.session.completed
        if (invoice.billing_reason === "subscription_create") {
          log("Skipping initial invoice (handled by checkout.session.completed)");
          break;
        }
        const customerId = invoice.customer as string;
        const customer = await stripe.customers.retrieve(customerId);
        if (customer.deleted) break;
        const email = (customer as Stripe.Customer).email;
        if (!email) break;

        const { data: profile } = await supabase
          .from("profiles")
          .select("id")
          .eq("email", email)
          .maybeSingle();
        if (!profile?.id) {
          log("No profile found for renewal", { email });
          break;
        }

        const txId = (invoice.payment_intent as string) ?? invoice.id;
        const { error: payErr } = await supabase.from("payments").insert({
          user_id: profile.id,
          provider: "stripe",
          status: "paid",
          amount: invoice.amount_paid ?? 0,
          currency: (invoice.currency ?? "eur").toUpperCase(),
          transaction_id: txId,
          paid_at: new Date().toISOString(),
        });
        if (payErr) log("ERROR inserting renewal payment", { email, error: payErr.message });
        else log("Renewal payment recorded", { email, txId });

        await notifyAdminPayment({
          email,
          productLabel: "Premium obnova pretplate",
          amountCents: invoice.amount_paid ?? 0,
          currency: (invoice.currency ?? "eur").toUpperCase(),
          mode: "subscription",
          transactionId: txId,
          paidAt: new Date().toISOString(),
        });
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
