/**
 * Central entitlement model (BalkanLink 2.0, Phase 1).
 * The server RPC `get_entitlement` is the source of truth; this module only
 * mirrors its rules for typing, tests and offline fallbacks. Not yet wired to UI.
 */
export type EntitlementSource =
  | "admin"
  | "legacy_lifetime"
  | "legacy_sub"
  | "new_yearly"
  | "trial"
  | "free";

export type QuotaPeriod = "month" | "trial_total" | "unlimited" | "none";

export interface EntitlementQuota {
  period: QuotaPeriod;
  /** null = unlimited (legacy/admin, never downgraded) */
  assistant_replies: number | null;
  document_analyses: number | null;
}

export interface Entitlement {
  source: EntitlementSource;
  full_access: boolean;
  active_until: string | null;
  unused_doc_credits: number;
  quota: EntitlementQuota;
}

export const QUOTAS: Record<EntitlementSource, EntitlementQuota> = {
  admin: { period: "unlimited", assistant_replies: null, document_analyses: null },
  legacy_lifetime: { period: "unlimited", assistant_replies: null, document_analyses: null },
  legacy_sub: { period: "unlimited", assistant_replies: null, document_analyses: null },
  new_yearly: { period: "month", assistant_replies: 40, document_analyses: 5 },
  trial: { period: "trial_total", assistant_replies: 10, document_analyses: 2 },
  free: { period: "none", assistant_replies: 0, document_analyses: 0 },
};

export const TRIAL_DAYS = 7;
export const YEARLY_PRICE_CENTS = 1999;

export interface ProfileLike {
  subscription_tier: string | null;
  is_premium: boolean | null;
  subscription_expires_at: string | null;
}

/** Pure mirror of the SQL precedence: admin > lifetime > legacy sub > yearly > trial > free. */
export function resolveSource(
  profile: ProfileLike | null,
  isAdmin: boolean,
  now: Date = new Date(),
): { source: EntitlementSource; active_until: string | null } {
  if (isAdmin) return { source: "admin", active_until: null };
  if (!profile) return { source: "free", active_until: null };
  const tier = profile.subscription_tier;
  const exp = profile.subscription_expires_at;
  const future = !!exp && new Date(exp).getTime() > now.getTime();
  if (tier === "lifetime") return { source: "legacy_lifetime", active_until: null };
  if (profile.is_premium && (tier === "premium" || tier === "premium_yearly") && (!exp || future))
    return { source: "legacy_sub", active_until: exp };
  if (tier === "annual" && future) return { source: "new_yearly", active_until: exp };
  if ((tier === "trial" || tier === "launch_trial" || tier === "influencer_trial") && future)
    return { source: "trial", active_until: exp };
  return { source: "free", active_until: null };
}

export const FREE_ENTITLEMENT: Entitlement = {
  source: "free",
  full_access: false,
  active_until: null,
  unused_doc_credits: 0,
  quota: QUOTAS.free,
};
