import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";
import { PRODUCTS, isProductKey } from "../_shared/products.ts";

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
    if (!isProductKey(body.product)) return json({ error: "Unknown product" }, 400);
    const product = PRODUCTS[body.product];

    const admin = createClient(Deno.env.get("SUPABASE_URL") ?? "", Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "", {
      auth: { persistSession: false },
    });

    // Plus is a one-time lifetime purchase — don't sell it twice.
    if (body.product === "plus") {
      const { data: prof } = await admin.from("profiles").select("subscription_tier").eq("id", user.id).maybeSingle();
      const { data: has } = await admin.rpc("has_full_access", { uid: user.id });
      if (has || prof?.subscription_tier === "lifetime") return json({ error: "already_owned" }, 409);
    }

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", { apiVersion: "2025-08-27.basil" });
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    const customerId = customers.data[0]?.id;

    const ALLOWED_ORIGINS = ["https://balkanlink.de", "https://www.balkanlink.de", "https://staro.lovable.app", "https://id-preview--42558ae9-0b5a-4abf-bab6-f6cb6cf85927.lovable.app"];
    const rawOrigin = req.headers.get("origin") || "";
    const origin = ALLOWED_ORIGINS.includes(rawOrigin) ? rawOrigin : "https://balkanlink.de";
    const returnTo = body.returnTo;
    const safeReturnTo = typeof returnTo === "string" && returnTo.startsWith("/") && !returnTo.startsWith("//") ? returnTo : "/";

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : user.email,
      customer_creation: customerId ? undefined : "always",
      line_items: [{ price: product.priceId, quantity: 1 }],
      mode: product.mode,
      invoice_creation: { enabled: true },
      payment_intent_data: { receipt_email: user.email, description: product.label },
      success_url: `${origin}/payment-success?session_id={CHECKOUT_SESSION_ID}&return_to=${encodeURIComponent(safeReturnTo)}`,
      cancel_url: `${origin}/placanje-otkazano`,
      metadata: { user_id: user.id, product_key: body.product, return_to: safeReturnTo },
    });

    return json({ url: session.url });
  } catch (error) {
    console.error("[create-checkout]", error instanceof Error ? error.message : String(error));
    return json({ error: "Checkout failed" }, 500);
  }
});
