import { describe, it, expect } from "vitest";
import { resolveSource, QUOTAS, TRIAL_DAYS, YEARLY_PRICE_CENTS } from "./entitlement";

const now = new Date("2026-10-27T12:00:00Z");
const p = (tier: string, premium: boolean, exp: string | null) => ({
  subscription_tier: tier, is_premium: premium, subscription_expires_at: exp,
});

describe("entitlement rules", () => {
  it("admin wins over everything", () => {
    expect(resolveSource(p("free", false, null), true, now).source).toBe("admin");
  });
  it("lifetime is never downgraded, even with past expiry", () => {
    expect(resolveSource(p("lifetime", false, "2020-01-01T00:00:00Z"), false, now).source).toBe("legacy_lifetime");
  });
  it("legacy monthly subscriber keeps access while active", () => {
    expect(resolveSource(p("premium", true, "2026-11-20T00:00:00Z"), false, now).source).toBe("legacy_sub");
    expect(resolveSource(p("premium", true, null), false, now).source).toBe("legacy_sub");
  });
  it("trial is active on day 6 and ends after day 7", () => {
    expect(resolveSource(p("trial", true, "2026-10-28T12:00:00Z"), false, now).source).toBe("trial");
    expect(resolveSource(p("trial", true, "2026-10-26T12:00:00Z"), false, now).source).toBe("free");
  });
  it("new yearly needs a future expiry", () => {
    expect(resolveSource(p("annual", true, "2027-10-27T00:00:00Z"), false, now).source).toBe("new_yearly");
    expect(resolveSource(p("annual", true, "2026-10-01T00:00:00Z"), false, now).source).toBe("free");
  });
  it("yearly quota is 40 assistant replies and 5 document analyses per month", () => {
    expect(QUOTAS.new_yearly).toEqual({ period: "month", assistant_replies: 40, document_analyses: 5 });
  });
  it("trial quota is 10 replies and 2 analyses in total", () => {
    expect(QUOTAS.trial).toEqual({ period: "trial_total", assistant_replies: 10, document_analyses: 2 });
  });
  it("legacy and admin have no quota cap", () => {
    for (const s of ["admin", "legacy_lifetime", "legacy_sub"] as const) {
      expect(QUOTAS[s].assistant_replies).toBeNull();
    }
  });
  it("trial is 7 days and yearly price is 19.99 EUR", () => {
    expect(TRIAL_DAYS).toBe(7);
    expect(YEARLY_PRICE_CENTS).toBe(1999);
  });
});
