import { QUOTAS, TRIAL_DAYS, YEARLY_PRICE_CENTS } from "@/lib/entitlement";
export { NEW_CUSTOMER_CHECKOUT_READY } from "../../supabase/functions/_shared/checkout-policy";

/** Single source for the NEW public offer (owner-approved 2026). Legacy Stripe records are untouched server-side. */
export const MEMBERSHIP = {
  trialDays: TRIAL_DAYS,
  yearlyPriceCents: YEARLY_PRICE_CENTS,
  /** Planning only; actual legacy revenue continues to come from billing records. */
  monthlyEquivalent: YEARLY_PRICE_CENTS / 100 / 12,
  trial: QUOTAS.trial,
  yearly: QUOTAS.new_yearly,
  /** Central membership info page; /premium and /pricing redirect here. */
  path: "/paketi",
} as const;

export type MembershipCta = "owned" | "register" | "checkout" | "disabled";

/**
 * Which single CTA the offer shows. Checkout only when the server switch is on;
 * otherwise a disabled, clearly "not yet activated" button — never the old €19.90 checkout.
 */
export function membershipCta(i: { signedIn: boolean; fullAccess: boolean; checkoutEnabled: boolean }): MembershipCta {
  if (i.fullAccess) return "owned";
  if (!i.signedIn) return "register";
  return i.checkoutEnabled ? "checkout" : "disabled";
}
