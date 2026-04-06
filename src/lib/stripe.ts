import { toast } from "@/hooks/use-toast";

export const STRIPE_PRICE_IDS = {
  PREMIUM_MONTHLY: "price_PLACEHOLDER_premium_monthly",
  PREMIUM_YEARLY: "price_PLACEHOLDER_premium_yearly",
  SINGLE_FORMULAR: "price_PLACEHOLDER_single_formular",
  PRO_AD_7DAY: "price_PLACEHOLDER_pro_ad_7day",
  PRO_AD_30DAY: "price_PLACEHOLDER_pro_ad_30day",
} as const;

/**
 * Initiate Stripe checkout. Currently shows a placeholder toast.
 * Replace with actual Stripe redirect when ready.
 */
export function initiateCheckout(_priceId: string, _userId: string) {
  toast({
    title: "Stripe integracija uskoro dostupna",
    description: "Kontaktirajte nas na info@balkanlink.de",
  });
}
