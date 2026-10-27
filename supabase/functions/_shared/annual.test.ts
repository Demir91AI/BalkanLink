import { assert, assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { annualApplyArgs, annualCheckoutGate, isExactAnnualPrice } from "./annual.ts";

const PID = "price_test_annual";
const price = { id: PID, active: true, unit_amount: 1999, currency: "eur", recurring: { interval: "year", interval_count: 1 } };
const sub = (o: Record<string, unknown> = {}) => ({
  id: "sub_1", customer: "cus_1", status: "active", cancel_at_period_end: false,
  current_period_end: 2_000_000_000, metadata: { user_id: "u1", product_key: "annual" },
  items: { data: [{ quantity: 1, price }] }, ...o,
});
const gate = { enabled: true, liveAllowed: false, stripeKey: "sk_test_x", priceId: PID, entitlementSource: "free", hasActiveAnnualRow: false, stripeActiveSubCount: 0 };

Deno.test("only exact €19.99 / 1 year price is accepted", () => {
  assert(isExactAnnualPrice(price, PID));
  assert(!isExactAnnualPrice({ ...price, unit_amount: 999 }, PID));
  assert(!isExactAnnualPrice({ ...price, currency: "usd" }, PID));
  assert(!isExactAnnualPrice({ ...price, recurring: { interval: "month" } }, PID));
  assert(!isExactAnnualPrice({ ...price, recurring: { interval: "year", interval_count: 2 } }, PID));
  assert(!isExactAnnualPrice(price, "price_other"));
});

Deno.test("checkout gate: off by default, live needs approval, no duplicates, legacy never resold", () => {
  assertEquals(annualCheckoutGate({ ...gate, enabled: false }), { ok: false, status: 403, error: "annual_disabled" });
  assertEquals(annualCheckoutGate({ ...gate, priceId: undefined }).ok, false);
  assertEquals(annualCheckoutGate({ ...gate, stripeKey: "sk_live_x" }), { ok: false, status: 403, error: "annual_live_not_approved" });
  for (const s of ["admin", "legacy_lifetime", "legacy_sub", "new_yearly"])
    assertEquals(annualCheckoutGate({ ...gate, entitlementSource: s }).ok, false);
  assertEquals(annualCheckoutGate({ ...gate, hasActiveAnnualRow: true }).ok, false);
  assertEquals(annualCheckoutGate({ ...gate, stripeActiveSubCount: 1 }).ok, false);
  assertEquals(annualCheckoutGate({ ...gate, entitlementSource: "trial" }).ok, true);
});

Deno.test("webhook mapping: ours only, period end, cancel flag, failures keep status", () => {
  const a = annualApplyArgs(sub(), PID)!;
  assertEquals(a.uid, "u1");
  assertEquals(a.p_period_end, new Date(2_000_000_000_000).toISOString());
  assertEquals(annualApplyArgs(sub({ cancel_at_period_end: true }), PID)!.p_cancel_at_period_end, true);
  assertEquals(annualApplyArgs(sub({ status: "past_due" }), PID)!.p_status, "past_due");
  assertEquals(annualApplyArgs(sub({ metadata: {} }), PID), null);
  assertEquals(annualApplyArgs(sub({ items: { data: [{ quantity: 1, price: { ...price, unit_amount: 999 } }] } }), PID), null);
  // legacy €9.99 monthly subscription is never mapped as annual
  assertEquals(annualApplyArgs(sub({ items: { data: [{ quantity: 1, price: { id: "price_1TQDVTR9oGwbVekBC4NGd2XI", unit_amount: 999, currency: "eur", recurring: { interval: "month" } } }] } }), PID), null);
});
