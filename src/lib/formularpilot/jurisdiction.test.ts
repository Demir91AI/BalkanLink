import { describe, it, expect } from "vitest";
import { resolveBundesland, BUNDESLAND_CODES, BUNDESLAND_NAMES } from "./jurisdiction";
import { resolveServiceCoverage, SERVICE_REGISTRY } from "./service-coverage";

describe("resolveBundesland", () => {
  it("resolves all 16 canonical names and codes exactly", () => {
    expect(BUNDESLAND_CODES).toHaveLength(16);
    for (const c of BUNDESLAND_CODES) {
      expect(resolveBundesland(BUNDESLAND_NAMES[c])).toMatchObject({ status: "exact", code: c });
      expect(resolveBundesland(c.toUpperCase())).toMatchObject({ status: "exact", code: c });
    }
  });

  it("never confuses Sachsen and Sachsen-Anhalt", () => {
    expect(resolveBundesland("Sachsen")).toMatchObject({ status: "exact", code: "sn" });
    expect(resolveBundesland("sachsen anhalt")).toMatchObject({ status: "exact", code: "st" });
    expect(resolveBundesland("Sachsen-Anhalt")).toMatchObject({ status: "exact", code: "st" });
    const typo = resolveBundesland("Sachsn");
    expect(typo.status).toBe("needs_confirmation");
    if (typo.status === "needs_confirmation") expect(typo.code).toBe("sn");
    const typo2 = resolveBundesland("Sachsen Anhlt");
    if (typo2.status === "needs_confirmation") expect(typo2.code).toBe("st");
    else expect(typo2.status).not.toBe("exact");
  });

  it("fuzzy 'Baden Wartenberg' requires confirmation, never exact", () => {
    expect(resolveBundesland("Baden Wartenberg")).toMatchObject({ status: "needs_confirmation", code: "bw" });
  });

  it("handles umlaut-less spelling and aliases", () => {
    expect(resolveBundesland("Thueringen")).toMatchObject({ status: "exact", code: "th" });
    expect(resolveBundesland("NRW")).toMatchObject({ status: "exact", code: "nw" });
  });

  it("refuses garbage and empty input", () => {
    expect(resolveBundesland("").status).toBe("unknown");
    expect(resolveBundesland("xy").status).toBe("unknown");
    expect(resolveBundesland("Wien").status).toBe("unknown");
  });
});

describe("resolveServiceCoverage", () => {
  it("Kindergeld is federal and blocked regardless of state", () => {
    expect(SERVICE_REGISTRY["kindergeld-kg1"].scope).toBe("federal");
    const r = resolveServiceCoverage("kindergeld-kg1", { state: "by", referenceDate: "2026-01-10" });
    expect(r).toMatchObject({ ok: false, reason: "EDITION_BLOCKED" });
    expect(r.coverage?.authority).toContain("Familienkasse");
  });

  it("Elterngeld is state-specific and requires a state", () => {
    expect(resolveServiceCoverage("elterngeld", { referenceDate: "2026-01-10" }))
      .toMatchObject({ ok: false, reason: "STATE_REQUIRED" });
  });

  it("all 16 states have routing but none is marked ready", () => {
    for (const c of BUNDESLAND_CODES) {
      const r = resolveServiceCoverage("elterngeld", { state: c, referenceDate: "2026-01-10" });
      expect(r.ok).toBe(false);
      expect(r.coverage).toBeDefined();
    }
  });

  it("Bayern is birth-date dependent", () => {
    expect(resolveServiceCoverage("elterngeld", { state: "by", referenceDate: "2025-06-01" }))
      .toMatchObject({ ok: false, reason: "EDITION_NOT_TESTED" });
    expect(resolveServiceCoverage("elterngeld", { state: "by", referenceDate: "2021-08-31" }))
      .toMatchObject({ ok: false, reason: "NO_EDITION_FOR_DATE" });
  });

  it("BW (L-Bank) has no verified edition and refuses safely", () => {
    const r = resolveServiceCoverage("elterngeld", { state: "bw", referenceDate: "2025-04-30" });
    expect(r).toMatchObject({ ok: false, reason: "NO_EDITION_FOR_DATE" });
    expect(r.coverage?.authority).toContain("L-Bank");
  });

  it("refuses missing date, unknown service", () => {
    expect(resolveServiceCoverage("elterngeld", { state: "be" })).toMatchObject({ reason: "DATE_REQUIRED" });
    expect(resolveServiceCoverage("wohngeld", { state: "be", referenceDate: "2026-01-01" }))
      .toMatchObject({ reason: "UNKNOWN_SERVICE" });
  });
});
