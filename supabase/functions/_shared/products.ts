// Server-side allowlist of purchasable consumer products (Stripe LIVE).
// The client may only send a product KEY; price, amount and mode are decided here.

export type ProductKey = "plus" | "doc_check";

export const PRODUCTS: Record<ProductKey, { priceId: string; amountCents: number; currency: "eur"; mode: "payment"; label: string }> = {
  plus: {
    priceId: "price_1UIwaPR9oGwbVekB3tcoSeHB", // BalkanLink Plus — 19.90 EUR one-time (prod_VJZjPMIXbjieme)
    amountCents: 1990,
    currency: "eur",
    mode: "payment",
    label: "BalkanLink Plus (19,90€ jednokratno)",
  },
  doc_check: {
    priceId: "price_1UIwaQR9oGwbVekBMgsX3h7d", // Dokumenten-Check — 1.99 EUR one-time (prod_VJZjkJkrpIdAcp)
    amountCents: 199,
    currency: "eur",
    mode: "payment",
    label: "Dokumenten-Check (1,99€)",
  },
};

export const isProductKey = (v: unknown): v is ProductKey =>
  typeof v === "string" && Object.prototype.hasOwnProperty.call(PRODUCTS, v);

/** Map a Stripe price id back to a product key (only allowlisted prices). */
export const productKeyForPrice = (priceId: string | null | undefined): ProductKey | null => {
  if (!priceId) return null;
  for (const [k, p] of Object.entries(PRODUCTS)) if (p.priceId === priceId) return k as ProductKey;
  return null;
};

/** Legacy consumer Premium subscription products (existing subscribers only, no new sales). */
export const LEGACY_PREMIUM_PRODUCT_IDS = ["prod_UP1YRWIs7iC35l", "prod_UP1ZSixHnuI7Tz"];
export const LEGACY_PREMIUM_PRICE_IDS = ["price_1TQDVTR9oGwbVekBC4NGd2XI", "price_1TQDVsR9oGwbVekBWswag3oI"];

/**
 * Verify a completed Checkout Session against the allowlist and fulfill it idempotently.
 * Returns the product key if fulfilled (or already fulfilled), null if not eligible.
 */
// deno-lint-ignore no-explicit-any
export async function fulfillCheckoutSession(stripe: any, admin: any, session: any, expectedUserId?: string) {
  if (session.mode !== "payment" || session.payment_status !== "paid") return null;
  const userId: string | undefined = session.metadata?.user_id;
  if (!userId) return null;
  if (expectedUserId && userId !== expectedUserId) return null;

  const items = await stripe.checkout.sessions.listLineItems(session.id, { limit: 5 });
  if (items.data.length !== 1) return null;
  const li = items.data[0];
  const key = productKeyForPrice(li.price?.id);
  if (!key) return null;
  const p = PRODUCTS[key];
  if ((li.quantity ?? 1) !== 1) return null;
  if ((session.currency ?? "").toLowerCase() !== p.currency) return null;
  if (session.amount_total !== p.amountCents) return null;

  const { error } = await admin.rpc("fulfill_stripe_checkout", {
    uid: userId,
    session_id: session.id,
    product_key: key,
    amt_cents: session.amount_total,
    curr: (session.currency ?? "eur").toUpperCase(),
  });
  if (error) throw new Error(`fulfill_stripe_checkout: ${error.message}`);
  return key;
}
