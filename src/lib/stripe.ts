import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import i18n from "@/i18n";

/**
 * Purchasable consumer products. The client only sends a product KEY — the server
 * (create-checkout) maps it to an allowlisted LIVE Stripe price and mode.
 *  - plus:      BalkanLink Plus, 19,90€ one-time (price_1UIwaPR9oGwbVekB3tcoSeHB)
 */
export type ProductKey = "plus";

/** Legacy Premium subscription products — existing subscribers only, no new sales. */
export const STRIPE_PRODUCT_IDS = {
  PREMIUM_MONTHLY: "prod_UP1YRWIs7iC35l",
  PREMIUM_YEARLY: "prod_UP1ZSixHnuI7Tz",
} as const;

/**
 * Start a Stripe Checkout for an allowlisted product.
 */
export async function initiateCheckout(product: ProductKey) {
  try {
    const returnTo = `${window.location.pathname}${window.location.search}`;
    const { data, error } = await supabase.functions.invoke("create-checkout", {
      body: { product, returnTo },
    });
    if (error) {
      // 409 = already owns Plus
      const ctx = (error as { context?: Response }).context;
      if (ctx && ctx.status === 409) {
        toast({ title: i18n.t("plus:errorTitle"), description: i18n.t("plus:alreadyOwned") });
        return;
      }
      throw error;
    }
    if (data?.url) {
      window.location.href = data.url;
    } else {
      throw new Error("No checkout URL returned");
    }
  } catch (err) {
    console.error("Checkout error:", err);
    toast({
      title: i18n.t("plus:errorTitle"),
      description: i18n.t("plus:checkoutError"),
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

export type PaymentVerification = {
  status: "succeeded" | "pending" | "invalid";
  mode?: "payment" | "subscription" | "setup" | null;
  amount?: number | null;
  currency?: string | null;
  transaction_id?: string | null;
  paid_at?: string | null;
  session_id?: string | null;
  product?: ProductKey | null;
};

/**
 * Verify a Stripe checkout session and fetch payment details (amount, date, transaction id).
 */
export async function verifyPaymentSession(sessionId: string): Promise<PaymentVerification> {
  try {
    const { data, error } = await supabase.functions.invoke("verify-payment", {
      body: { session_id: sessionId },
    });
    if (error) throw error;
    return (data as PaymentVerification) ?? { status: "pending" };
  } catch {
    // Network/edge error — treat as pending so the UI keeps polling
    // and falls back to global subscription state instead of "invalid".
    return { status: "pending" };
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
