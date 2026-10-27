/** Code-level release hold: annual price, legal review and billing QA are not ready.
 * Database flags alone must not open new sales. Historical fulfillment is separate.
 */
export const NEW_CUSTOMER_CHECKOUT_READY = false;

export function newCheckoutAvailability(product: unknown): { error: string; status: number } | null {
  if (product === "annual") {
    return NEW_CUSTOMER_CHECKOUT_READY ? null : { error: "annual_checkout_unavailable", status: 503 };
  }
  // Includes old monthly/yearly, per-document, course, ad and lifetime keys,
  // as well as arbitrary price IDs; none is a new-customer offer.
  return { error: "product_retired", status: 410 };
}