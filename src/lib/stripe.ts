import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import i18n from "@/i18n";

/**
 * Historical one-time product type retained for payment verification only.
 * New annual membership uses useMembership; lifetime checkout is retired.
 */
export type ProductKey = "plus";

/** Legacy Premium subscription products — existing subscribers only, no new sales. */
export const STRIPE_PRODUCT_IDS = {
  PREMIUM_MONTHLY: "prod_UP1YRWIs7iC35l",
  PREMIUM_YEARLY: "prod_UP1ZSixHnuI7Tz",
} as const;

/**
 * Compatibility entry point for retired lifetime checkout. Never contacts Stripe.
 */
export async function initiateCheckout(_product: ProductKey) {
  toast({
    title: i18n.t("plus:errorTitle"),
    description: i18n.t("plus:ctaDisabledNote"),
  });
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
