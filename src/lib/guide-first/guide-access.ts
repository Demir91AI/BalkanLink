import type { Entitlement } from "@/lib/entitlement";

export type GuideAccess = "full" | "register" | "subscribe";

export interface GuideAccessInput {
  /** entitlement_settings.monetization_v2_enabled — unknown/error must be passed as false. */
  monetizationV2: boolean;
  isFreeSlug: boolean;
  /** Legacy useSubscription().isPremium — never downgraded. */
  legacyPremium: boolean;
  signedIn: boolean;
  entitlement: Entitlement;
}

/**
 * FormCenter guide gate. With the rollout flag OFF the decision is byte-for-byte
 * the pre-Phase-5 rule (isPremium || free slug). With it ON, server entitlement
 * full_access (admin, legacy, trial, new_yearly) unlocks; legacy premium still wins.
 */
export function decideGuideAccess(i: GuideAccessInput): GuideAccess {
  if (i.isFreeSlug || i.legacyPremium) return "full";
  if (!i.monetizationV2) return "subscribe";
  if (i.entitlement.full_access) return "full";
  return i.signedIn ? "subscribe" : "register";
}
