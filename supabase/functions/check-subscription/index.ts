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
  console.log(`[check-subscription] ${step}${extra}`);
};

const unixSecondsToIso = (value: unknown): string | null => {
  const seconds = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(seconds) || seconds <= 0) return null;
  const date = new Date(seconds * 1000);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );

  try {
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header");

    const token = authHeader.replace("Bearer ", "");

    // getUser is more stable than getClaims (does not require JWKS round-trip)
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError || !userData?.user) {
      throw new Error(`Auth error: ${userError?.message ?? "Invalid token"}`);
    }

    const userId = userData.user.id;
    const userEmail = userData.user.email;
    if (!userId || !userEmail) throw new Error("User not authenticated or email missing");
    log("authenticated", { userId, userEmail });

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });
    const customers = await stripe.customers.list({ email: userEmail, limit: 1 });

    if (customers.data.length === 0) {
      // Only sync to "free" if profile is currently flagged premium and Stripe truly has no record.
      // Don't aggressively downgrade — webhook is the source of truth.
      log("no stripe customer found");
      const { data: profile } = await supabaseClient
        .from("profiles")
        .select("is_premium")
        .eq("id", userId)
        .maybeSingle();

      if (profile?.is_premium) {
        // Profile says premium but Stripe has nothing — leave alone, webhook will reconcile.
        log("profile says premium but no stripe customer — leaving as-is");
      } else {
        await supabaseClient.from("profiles").update({
          is_premium: false,
          subscription_tier: "free",
          subscription_expires_at: null,
        }).eq("id", userId);
      }

      return new Response(JSON.stringify({ subscribed: false }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const customerId = customers.data[0].id;
    log("found stripe customer", { customerId });

    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: "active",
      limit: 1,
    });

    const hasActiveSub = subscriptions.data.length > 0;
    let subscriptionEnd: string | null = null;
    let productId: string | null = null;
    let priceId: string | null = null;
    let interval: string | null = null;
    let cancelAtPeriodEnd = false;
    let amount: number | null = null;
    let currency: string | null = null;

    if (hasActiveSub) {
      const sub = subscriptions.data[0];
      const item = sub.items.data[0];
      subscriptionEnd = unixSecondsToIso(
        sub.current_period_end ?? (item as { current_period_end?: number }).current_period_end
      );
      productId = item.price.product as string;
      priceId = item.price.id;
      interval = item.price.recurring?.interval ?? null;
      cancelAtPeriodEnd = sub.cancel_at_period_end ?? false;
      amount = item.price.unit_amount ?? null;
      currency = item.price.currency ?? null;
      log("active subscription", { subscriptionId: sub.id, productId, interval });
    } else {
      log("no active subscription");
    }

    // Sync premium status to profiles table (only relevant fields)
    await supabaseClient.from("profiles").update({
      is_premium: hasActiveSub,
      subscription_tier: hasActiveSub ? "premium" : "free",
      subscription_expires_at: subscriptionEnd,
    }).eq("id", userId);

    return new Response(JSON.stringify({
      subscribed: hasActiveSub,
      product_id: productId,
      price_id: priceId,
      subscription_end: subscriptionEnd,
      interval,
      cancel_at_period_end: cancelAtPeriodEnd,
      amount,
      currency,
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    const stack = error instanceof Error ? error.stack : undefined;
    console.error("[check-subscription] ERROR:", msg, stack);
    return new Response(JSON.stringify({ error: msg }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
