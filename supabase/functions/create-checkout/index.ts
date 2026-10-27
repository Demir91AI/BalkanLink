import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";
import { newCheckoutAvailability } from "../_shared/checkout-policy.ts";
import { annualCheckoutGate, isExactAnnualPrice } from "../_shared/annual.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { headers: { ...corsHeaders, "Content-Type": "application/json" }, status });

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return json({ error: "Not authenticated" }, 401);
    const supabaseClient = createClient(Deno.env.get("SUPABASE_URL") ?? "", Deno.env.get("SUPABASE_ANON_KEY") ?? "");
    const { data } = await supabaseClient.auth.getUser(authHeader.replace("Bearer ", ""));
    const user = data.user;
    if (!user?.email) return json({ error: "Not authenticated" }, 401);

    let body: { product?: unknown; returnTo?: unknown } = {};
    try { body = await req.json(); } catch { /* empty */ }
    // Retired consumer offers must never generate new Stripe sessions. Existing
    // historical payments remain verifiable via the webhook/verify-payment paths.
    if (body.product === "plus") return json({ error: "product_retired" }, 410);
    const unavailable = newCheckoutAvailability(body.product);
    if (unavailable) return json({ error: unavailable.error }, unavailable.status);
    if (body.product === "annual") return await annualCheckout(req, user, body.returnTo);
    return json({ error: "product_retired" }, 410);
  } catch (error) {
    console.error("[create-checkout]", error instanceof Error ? error.message : String(error));
    return json({ error: "Checkout failed" }, 500);
  }
});

const ALLOWED_ORIGINS = ["https://balkanlink.de", "https://www.balkanlink.de", "https://staro.lovable.app", "https://id-preview--42558ae9-0b5a-4abf-bab6-f6cb6cf85927.lovable.app"];

// New voluntary €19.99/year membership — staged behind entitlement_settings flags.
// deno-lint-ignore no-explicit-any
async function annualCheckout(req: Request, user: any, returnTo: unknown) {
  const admin = createClient(Deno.env.get("SUPABASE_URL") ?? "", Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "", {
    auth: { persistSession: false },
  });
  if (!user.email_confirmed_at) return json({ error: "email_not_verified" }, 403);
  const stripeKey = Deno.env.get("STRIPE_SECRET_KEY") || "";
  const priceId = Deno.env.get("STRIPE_ANNUAL_PRICE_ID") || undefined;
  const { data: settings } = await admin.from("entitlement_settings").select("annual_checkout_enabled, annual_live_mode_allowed").maybeSingle();
  const { data: ent } = await admin.rpc("_entitlement_core", { uid: user.id });
  const { data: rows } = await admin.from("annual_subscriptions").select("status, current_period_end").eq("user_id", user.id);
  const now = Date.now();
  const hasActiveAnnualRow = (rows ?? []).some((r) => ["active", "past_due", "incomplete", "trialing"].includes(r.status) && (!r.current_period_end || new Date(r.current_period_end).getTime() > now));

  const pre = annualCheckoutGate({
    enabled: settings?.annual_checkout_enabled === true, liveAllowed: settings?.annual_live_mode_allowed === true,
    stripeKey, priceId, entitlementSource: (ent as { source?: string } | null)?.source ?? "free",
    hasActiveAnnualRow, stripeActiveSubCount: 0,
  });
  if (!pre.ok) return json({ error: pre.error }, pre.status);
  if (!priceId) return json({ error: "annual_not_configured" }, 503);

  const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });
  const price = await stripe.prices.retrieve(priceId);
  if (!isExactAnnualPrice(price as never, priceId)) return json({ error: "annual_price_mismatch" }, 503);

  const customers = await stripe.customers.list({ email: user.email, limit: 1 });
  const customerId = customers.data[0]?.id;
  if (customerId) {
    const subs = await stripe.subscriptions.list({ customer: customerId, status: "all", limit: 20 });
    const open = subs.data.filter((s) => ["active", "trialing", "past_due", "incomplete", "unpaid"].includes(s.status));
    if (open.length > 0) return json({ error: "subscription_exists" }, 409);
  }

  const rawOrigin = req.headers.get("origin") || "";
  const origin = ALLOWED_ORIGINS.includes(rawOrigin) ? rawOrigin : "https://balkanlink.de";
  const safeReturnTo = typeof returnTo === "string" && returnTo.startsWith("/") && !returnTo.startsWith("//") ? returnTo : "/";
  const meta = { user_id: user.id, product_key: "annual" };
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    customer_email: customerId ? undefined : user.email,
    line_items: [{ price: priceId, quantity: 1 }],
    mode: "subscription",
    client_reference_id: user.id,
    // No Stripe trial: the 7-day trial is cardless and server-side; the card is charged only on this voluntary checkout.
    subscription_data: { metadata: meta },
    success_url: `${origin}/payment-success?session_id={CHECKOUT_SESSION_ID}&return_to=${encodeURIComponent(safeReturnTo)}`,
    cancel_url: `${origin}/placanje-otkazano`,
    metadata: meta,
  }, { idempotencyKey: `annual-${user.id}-${new Date().toISOString().slice(0, 13)}` });
  return json({ url: session.url });
}
