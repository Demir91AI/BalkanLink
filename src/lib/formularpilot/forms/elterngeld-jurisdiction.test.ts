import { describe, expect, it } from "vitest";
import { ELTERNGELD_DIRECTORY, ELTERNGELD_OFFICE_LOOKUP, ELTERNGELD_STATE_ROUTES, resolveElterngeldRoute } from "./elterngeld-jurisdiction";
describe("Elterngeld all16 official route fallback (not PDF compatibility)", () => {
  it("exactly16 directory-listed jurisdictions, no inferred seventeenth", () => {
    expect(Object.keys(ELTERNGELD_STATE_ROUTES).sort()).toEqual(["BB", "BE", "BW", "BY", "HB", "HE", "HH", "MV", "NI", "NW", "RP", "SH", "SL", "SN", "ST", "TH"]);
  });
  for (const land of Object.keys(ELTERNGELD_STATE_ROUTES)) it(`${land}: explicit official fallback, no output bytes`, () => {
    const r = resolveElterngeldRoute(land, "2026-09-10", "2026-11-26");
    expect(r.ok).toBe(true); if (!r.ok) return;
    expect(r.land).toBe(land); expect(r.pdfGeneration).toBe(false);
    expect(r.officeLookup).toBe(ELTERNGELD_OFFICE_LOOKUP); expect(r.directory).toBe(ELTERNGELD_DIRECTORY);
    expect(r.officialRoute.startsWith("https://")).toBe(true); expect("bytes" in r).toBe(false);
    expect(r.landPageIndependentlyVerified).toBe(false);
    expect(r.reason).toBe(["BB", "HH", "RP", "SH"].includes(land) ? "MAPPING_INCOMPLETE" : "LAND_EDITION_UNSUPPORTED");
  });
  it("missing/unknown state and invalid/future birth refuse", () => {
    expect(resolveElterngeldRoute("", "2026-09-10", "2026-11-26")).toEqual({ ok: false, code: "LAND_REQUIRED" });
    expect(resolveElterngeldRoute("DE", "2026-09-10", "2026-11-26").ok).toBe(false);
    expect(resolveElterngeldRoute("HH", "2026-02-30", "2026-11-26").ok).toBe(false);
    expect(resolveElterngeldRoute("HH", "2026-11-27", "2026-11-26").ok).toBe(false);
  });
  it("old births route officially without accepting the current PDF edition", () => {
    const r = resolveElterngeldRoute("HH", "2025-03-31", "2026-11-26");
    expect(r.ok).toBe(true); if (r.ok) { expect(r.reason).toBe("EDITION_UNSUPPORTED"); expect(r.pdfGeneration).toBe(false); }
  });
  it("directory HTTP links never silently upgraded", () => {
    for (const land of ["BE", "MV"]) { const r = resolveElterngeldRoute(land, "2026-09-10", "2026-11-26"); expect(r.ok).toBe(true); if (r.ok) expect(r.officialRoute).toBe(ELTERNGELD_DIRECTORY); }
  });
});