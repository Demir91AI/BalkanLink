import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

/** Real Stripe LIVE price IDs (Stand 2026) */
export const STRIPE_PRICE_IDS = {
  PREMIUM_MONTHLY: "price_1TQDVTR9oGwbVekBC4NGd2XI", // 9.99€/mj
  PREMIUM_YEARLY: "price_1TQDVsR9oGwbVekBWswag3oI", // 99.90€/god
  PRO_AD_7DAY: "price_1TQDWjR9oGwbVekBDdS6ogxW", // 1.99€
  PRO_AD_30DAY: "price_1TQDX1R9oGwbVekB7h7UFuIU", // 4.99€
  DEUTSCH_A1: "price_1TQDZBR9oGwbVekBAIVw8KAz", // 9.99€
  DEUTSCH_A2: "price_1TQDZTR9oGwbVekBzZ0mzjKv", // 14.99€
  DEUTSCH_B1: "price_1TQDZjR9oGwbVekBQT6y65hp", // 19.99€
  DEUTSCH_B2: "price_1TQDbAR9oGwbVekB4hNkb0so", // 24.99€
  DEUTSCH_C1: "price_1TQDbRR9oGwbVekB5MxVzBks", // 29.99€
  DEUTSCH_C2: "price_1TQDbkR9oGwbVekBbuLxMbrA", // 34.99€
  FEATURED_FIRMA: "price_1TQDWCR9oGwbVekBLfyqBXYy", // 14.99€/mj
  DOC_CHECK: "price_1TQDc3R9oGwbVekBYppvp6Y7", // 2.99€ jednokratno
} as const;

/** Stripe LIVE product IDs for subscription tier mapping */
export const STRIPE_PRODUCT_IDS = {
  PREMIUM_MONTHLY: "prod_UP1YRWIs7iC35l",
  PREMIUM_YEARLY: "prod_UP1ZSixHnuI7Tz",
} as const;

/**
 * Initiate Stripe checkout via edge function.
 */
export async function initiateCheckout(priceId: string, _userId: string, mode: "subscription" | "payment" = "payment", _formSlug?: string) {
  try {
    const { data, error } = await supabase.functions.invoke("create-checkout", {
      body: { priceId, mode },
    });
    if (error) throw error;
    if (data?.url) {
      window.open(data.url, "_blank");
    } else {
      throw new Error("No checkout URL returned");
    }
  } catch (err) {
    console.error("Checkout error:", err);
    toast({
      title: "Greška",
      description: "Nije moguće pokrenuti plaćanje. Pokušajte ponovo.",
      variant: "destructive",
    });
  }
}

/**
 * Check subscription status via edge function.
 */
export async function checkSubscriptionStatus(): Promise<{
  subscribed: boolean;
  product_id?: string;
  subscription_end?: string;
}> {
  try {
    const { data, error } = await supabase.functions.invoke("check-subscription");
    if (error) throw error;
    return data ?? { subscribed: false };
  } catch {
    return { subscribed: false };
  }
}

/**
 * Open Stripe customer portal for subscription management.
 */
export async function openCustomerPortal() {
  try {
    const { data, error } = await supabase.functions.invoke("customer-portal");
    if (error) throw error;
    if (data?.url) {
      window.open(data.url, "_blank");
    }
  } catch (err) {
    console.error("Portal error:", err);
    toast({
      title: "Greška",
      description: "Nije moguće otvoriti portal za upravljanje pretplatom.",
      variant: "destructive",
    });
  }
}
