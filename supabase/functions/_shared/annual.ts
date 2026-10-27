// New voluntary yearly membership (BalkanLink 2.0, Phase 3). Staged: inactive until
// entitlement_settings.annual_checkout_enabled AND a configured STRIPE_ANNUAL_PRICE_ID.
// Live-mode keys additionally require annual_live_mode_allowed (owner approval).

export const ANNUAL = { amountCents: 1999, currency: "eur", interval: "year" } as const;

export interface PriceLike {
  id: string;
  active?: boolean;
  unit_amount: number | null;
  currency: string;
  recurring?: { interval: string; interval_count?: number } | null;
}

/** Exact €19.99 / 1 year recurring, nothing else. */
export function isExactAnnualPrice(p: PriceLike | null | undefined, expectedId: string | undefined): boolean {
  if (!p || !expectedId || p.id !== expectedId) return false;
  return p.active !== false && p.unit_amount === ANNUAL.amountCents && p.currency === ANNUAL.currency &&
    p.recurring?.interval === ANNUAL.interval && (p.recurring?.interval_count ?? 1) === 1;
}

export type CheckoutGate =
  | { ok: true }
  | { ok: false; status: number; error: string };

export function annualCheckoutGate(i: {
  enabled: boolean;
  liveAllowed: boolean;
  stripeKey: string;
  priceId: string | undefined;
  entitlementSource: string;
  hasActiveAnnualRow: boolean;
  stripeActiveSubCount: number;
}): CheckoutGate {
  if (!i.enabled) return { ok: false, status: 403, error: "annual_disabled" };
  if (!i.priceId) return { ok: false, status: 503, error: "annual_not_configured" };
  if (i.stripeKey.startsWith("sk_live_") || i.stripeKey.startsWith("rk_live_")) {
    if (!i.liveAllowed) return { ok: false, status: 403, error: "annual_live_not_approved" };
  }
  if (["admin", "legacy_lifetime", "legacy_sub", "new_yearly"].includes(i.entitlementSource))
    return { ok: false, status: 409, error: "already_member" };
  if (i.hasActiveAnnualRow || i.stripeActiveSubCount > 0) return { ok: false, status: 409, error: "subscription_exists" };
  return { ok: true };
}

// deno-lint-ignore no-explicit-any
export function subscriptionAnnualPrice(sub: any, priceId: string | undefined): PriceLike | null {
  if (!priceId || !sub?.items?.data || sub.items.data.length !== 1) return null;
  const it = sub.items.data[0];
  if ((it.quantity ?? 1) !== 1) return null;
  return isExactAnnualPrice(it.price, priceId) ? it.price : null;
}

// deno-lint-ignore no-explicit-any
export function periodEndIso(sub: any): string | null {
  const end = sub?.current_period_end ?? sub?.items?.data?.[0]?.current_period_end;
  return typeof end === "number" ? new Date(end * 1000).toISOString() : null;
}

/** RPC args for apply_annual_subscription; null when the subscription is not ours. */
// deno-lint-ignore no-explicit-any
export function annualApplyArgs(sub: any, priceId: string | undefined) {
  const price = subscriptionAnnualPrice(sub, priceId);
  const uid = sub?.metadata?.user_id;
  if (!price || typeof uid !== "string" || sub?.metadata?.product_key !== "annual") return null;
  return {
    uid,
    p_sub_id: sub.id as string,
    p_customer_id: typeof sub.customer === "string" ? sub.customer : sub.customer?.id,
    p_status: sub.status as string,
    p_period_end: periodEndIso(sub),
    p_cancel_at_period_end: !!sub.cancel_at_period_end,
    p_amount_cents: price.unit_amount!,
    p_currency: price.currency,
    p_interval: price.recurring!.interval,
  };
}
