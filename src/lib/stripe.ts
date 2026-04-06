import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

/** Real Stripe price IDs */
export const STRIPE_PRICE_IDS = {
  PREMIUM_MONTHLY: "price_1TJHeDR9oGwbVekBiuiEiAn1",
  PREMIUM_YEARLY: "price_1TJHecR9oGwbVekB86ShMKjB",
  SINGLE_FORMULAR: "price_1TJHgMR9oGwbVekBrDCPzBa9",
  PRO_AD_7DAY: "price_1TJHgZR9oGwbVekBnOVNmjEo",
  PRO_AD_30DAY: "price_1TJHgqR9oGwbVekB2gknywnu",
} as const;

/** Stripe product IDs for subscription tier mapping */
export const STRIPE_PRODUCT_IDS = {
  PREMIUM_MONTHLY: "prod_UHrMPPjYqOdBZM",
  PREMIUM_YEARLY: "prod_UHrNePEaRqOa7c",
} as const;

/**
 * Determine checkout mode based on price ID
 */
function getCheckoutMode(priceId: string): "subscription" | "payment" {
  if (
    priceId === STRIPE_PRICE_IDS.PREMIUM_MONTHLY ||
    priceId === STRIPE_PRICE_IDS.PREMIUM_YEARLY
  ) {
    return "subscription";
  }
  return "payment";
}

/**
 * Initiate Stripe checkout via edge function.
 */
export async function initiateCheckout(
  priceId: string,
  _userId: string,
  formSlug?: string
) {
  try {
    const mode = getCheckoutMode(priceId);
    const { data, error } = await supabase.functions.invoke("create-checkout", {
      body: { priceId, mode, formSlug },
    });

    if (error) throw error;
    if (data?.url) {
      window.open(data.url, "_blank");
    }
  } catch (err) {
    console.error("Checkout error:", err);
    toast({
      title: "Greška pri plaćanju",
      description: "Pokušajte ponovo ili nas kontaktirajte na info@balkanlink.de",
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
