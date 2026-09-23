import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";
import { fulfillCheckoutSession, LEGACY_PREMIUM_PRICE_IDS, LEGACY_PREMIUM_PRODUCT_IDS, PRODUCTS } from "../_shared/products.ts";

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
    // Only legacy consumer Premium subscriptions affect profile access.
    // Business subscriptions (e.g. Featured Firma) must NEVER grant consumer access.
    const isLegacyPremiumSub = (sub: Stripe.Subscription) =>
      sub.items.data.some((it) =>
        LEGACY_PREMIUM_PRICE_IDS.includes(it.price.id) ||
        LEGACY_PREMIUM_PRODUCT_IDS.includes(typeof it.price.product === "string" ? it.price.product : it.price.product.id)
      );
    const periodEndIso = (sub: Stripe.Subscription) => {
      const end = (sub as any).current_period_end ?? (sub.items.data[0] as any)?.current_period_end;
      return typeof end === "number" ? new Date(end * 1000).toISOString() : null;
    };
    // Lifetime rows are additionally protected by a DB trigger; we also filter here.
    const updateLegacyPremiumByEmail = async (email: string, patch: Record<string, unknown>) =>
      supabase.from("profiles").update(patch).eq("email", email).neq("subscription_tier", "lifetime");

    switch (event.type) {
      // ── Checkout completed (one-time products: Plus / Dokumenten-Check) ──
      case "checkout.session.completed":
      case "checkout.session.async_payment_succeeded": {
        const session = event.data.object as Stripe.Checkout.Session;
        const customerEmail = session.customer_email ?? session.customer_details?.email;
        log(event.type, { userId: session.metadata?.user_id, mode: session.mode, paid: session.payment_status });

        if (session.mode !== "payment") {
          log("Non-payment checkout ignored (no new subscriptions are sold)", { mode: session.mode });
          break;
        }
        if (session.payment_status !== "paid") {
          log("Session not paid yet — waiting for async_payment_succeeded");
          break;
        }

        const { data: already } = await supabase
          .from("mreza_payments").select("id").eq("provider_payment_id", session.id).maybeSingle();

        const key = await fulfillCheckoutSession(stripe, supabase, session);
        if (!key) {
          log("Session not eligible for fulfillment (not an allowlisted product/amount)", { sessionId: session.id });
          break;
        }
        log("Fulfilled", { key, sessionId: session.id });

        if (!already) {
          await notifyAdminPayment({
            email: customerEmail,
            productLabel: PRODUCTS[key].label,
            amountCents: session.amount_total ?? 0,
            currency: (session.currency ?? "eur").toUpperCase(),
            mode: "payment",
            transactionId: (session.payment_intent as string) ?? session.id,
            paidAt: new Date().toISOString(),
          });
        }
        break;
      }

      // ── Legacy Premium subscription renewals (existing subscribers only) ──
      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        const subId = (invoice as any).subscription ?? (invoice as any).parent?.subscription_details?.subscription;
        if (!subId) break;
        const sub = await stripe.subscriptions.retrieve(typeof subId === "string" ? subId : subId.id);
        if (!isLegacyPremiumSub(sub)) break;
        const customer = await stripe.customers.retrieve(sub.customer as string);
        if (customer.deleted || !(customer as Stripe.Customer).email) break;
        const email = (customer as Stripe.Customer).email!;
        const expiresAt = periodEndIso(sub);
        const { error } = await updateLegacyPremiumByEmail(email, {
          is_premium: true, subscription_tier: "premium", subscription_expires_at: expiresAt,
        });
        if (error) log("ERROR renewing legacy premium", { email, error: error.message });
        else log("Legacy premium renewed", { email, expiresAt });
        break;
      }

      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        if (!isLegacyPremiumSub(sub)) { log("Non-consumer subscription ignored", { id: sub.id }); break; }
        const customer = await stripe.customers.retrieve(sub.customer as string);
        if (customer.deleted || !(customer as Stripe.Customer).email) break;
        const email = (customer as Stripe.Customer).email!;
        const isActive = event.type === "customer.subscription.updated" && (sub.status === "active" || sub.status === "trialing");
        const { error } = await updateLegacyPremiumByEmail(email, {
          is_premium: isActive,
          subscription_tier: isActive ? "premium" : "free",
          subscription_expires_at: isActive ? periodEndIso(sub) : null,
        });
        if (error) log("ERROR updating legacy subscription", { email, error: error.message });
        else log("Legacy subscription synced", { email, status: sub.status, isActive });
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        log("Payment failed", { invoiceId: invoice.id });
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
