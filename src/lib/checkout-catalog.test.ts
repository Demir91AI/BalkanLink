import { describe, expect, it, vi } from "vitest";
import { readFileSync } from "node:fs";
import { NEW_CUSTOMER_CHECKOUT_READY, newCheckoutAvailability } from "../../supabase/functions/_shared/checkout-policy";
import { annualCheckoutGate, isExactAnnualPrice } from "../../supabase/functions/_shared/annual";
import { LEGACY_PREMIUM_PRICE_IDS, productKeyForPrice } from "../../supabase/functions/_shared/products";
import { MEMBERSHIP } from "./membership";

const invoke = vi.fn();
vi.mock("@/integrations/supabase/client", () => ({ supabase: { functions: { invoke: (...args: unknown[]) => invoke(...args) } } }));
vi.mock("@/hooks/use-toast", () => ({ toast: vi.fn() }));
vi.mock("@/i18n", () => ({ default: { t: (key: string) => key } }));
vi.mock("i18next", () => ({ default: { t: (key: string) => key } }));
import { initiateCheckout } from "./stripe";
import { startAnnualCheckout } from "@/hooks/useMembership";

describe("confirmed catalog: new sales held, historical entitlements retained", () => {
  it("annual remains unavailable even if mutable server flags and a price are ready", () => {
    const gate = annualCheckoutGate({ enabled: true, liveAllowed: true, stripeKey: "rk_live_fixture", priceId: "price_fixture", entitlementSource: "free", hasActiveAnnualRow: false, stripeActiveSubCount: 0 });
    expect(gate.ok).toBe(true);
    expect(NEW_CUSTOMER_CHECKOUT_READY).toBe(false);
    expect(newCheckoutAvailability("annual")).toEqual({ error: "annual_checkout_unavailable", status: 503 });
  });
  for (const key of ["plus", "premium_monthly", "premium_yearly", "doc_check", "deutsch_a2", "pro_ad_7days", ...LEGACY_PREMIUM_PRICE_IDS]) {
    it(`${key} cannot start a new checkout`, () => {
      expect(newCheckoutAvailability(key)).toEqual({ error: "product_retired", status: 410 });
    });
  }
  it("retired lifetime client entry makes zero payment calls", async () => {
    invoke.mockClear();
    await initiateCheckout("plus");
    expect(invoke).not.toHaveBeenCalled();
  });
  it("annual client entry makes zero payment calls during release hold", async () => {
    invoke.mockClear();
    await startAnnualCheckout();
    expect(invoke).not.toHaveBeenCalled();
  });
  it("archived historical one-time price still reconciles previously paid sessions", () => {
    expect(productKeyForPrice("price_1UIwaPR9oGwbVekB3tcoSeHB")).toBe("plus");
  });
  it("monthly legacy prices cannot be accepted as the new annual price", () => {
    expect(LEGACY_PREMIUM_PRICE_IDS).toEqual(["price_1TQDVTR9oGwbVekBC4NGd2XI", "price_1TQDVsR9oGwbVekBWswag3oI"]);
    for (const id of LEGACY_PREMIUM_PRICE_IDS) {
      expect(isExactAnnualPrice({ id, unit_amount: 999, currency: "eur", recurring: { interval: "month" } }, id)).toBe(false);
    }
  });
  it("new planning rate is €19.99/year rather than €9.99/month", () => {
    expect(MEMBERSHIP.yearlyPriceCents).toBe(1999);
    expect(MEMBERSHIP.monthlyEquivalent).toBeCloseTo(19.99 / 12);
  });
  it("endpoint checks the hold before staged checkout; no historical catalog creates sessions", () => {
    const endpoint = readFileSync("supabase/functions/create-checkout/index.ts", "utf8");
    expect(endpoint.indexOf("if (unavailable) return")).toBeLessThan(endpoint.indexOf("return await annualCheckout"));
    expect(endpoint).not.toContain("PRODUCTS[");
  });
});