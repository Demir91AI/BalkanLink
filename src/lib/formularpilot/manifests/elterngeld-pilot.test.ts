import { describe, it, expect } from "vitest";
import { resolveServiceCoverage } from "../service-coverage";
import { BAYERN_EDITIONS, BW_EDITIONS } from "./elterngeld-pilot";

const by = (d: string) => resolveServiceCoverage("elterngeld", { state: "by", referenceDate: d });
const bw = (d: string) => resolveServiceCoverage("elterngeld", { state: "bw", referenceDate: d });

describe("Elterngeld pilot: Bayern (ZBFS) birth-date editions", () => {
  it.each([
    ["2021-09-01", "ZBFS 09/2021"], ["2024-03-31", "ZBFS 09/2021"],
    ["2024-04-01", "ZBFS 04/2024"], ["2024-12-31", "ZBFS 04/2024"],
    ["2025-01-01", "ZBFS 01/2025"], ["2025-03-31", "ZBFS 01/2025"],
    ["2025-04-01", "ZBFS 04/2025"], ["2025-04-30", "ZBFS 04/2025"],
    ["2025-05-01", "ZBFS 05/2025"], ["2026-10-01", "ZBFS 05/2025"],
  ])("birth %s → %s, but not fillable (needs_review)", (d, label) => {
    const r = by(d);
    expect(r).toMatchObject({ ok: false, reason: "EDITION_NOT_TESTED" });
    expect(r.edition?.versionLabel).toBe(label);
  });

  it("refuses births before 2021-09-01 (no official form offered)", () => {
    expect(by("2021-08-31")).toMatchObject({ ok: false, reason: "NO_EDITION_FOR_DATE" });
  });

  it("editions are contiguous, hash-pinned, official ZBFS URLs, none tested", () => {
    for (let i = 1; i < BAYERN_EDITIONS.length; i++) {
      expect(BAYERN_EDITIONS[i].validFrom).toBe(BAYERN_EDITIONS[i - 1].validUntil);
    }
    for (const e of BAYERN_EDITIONS) {
      expect(e.sourceUrl.startsWith("https://www.zbfs.bayern.de/")).toBe(true);
      expect(e.sha256).toMatch(/^[0-9a-f]{64}$/);
      expect(e.status).not.toBe("tested");
    }
  });

  it("rejects malformed dates", () => {
    expect(by("01.05.2025")).toMatchObject({ ok: false, reason: "DATE_REQUIRED" });
  });
});

describe("Elterngeld pilot: Baden-Württemberg (L-Bank) own procedure", () => {
  it("routes to L-Bank with official online portal", () => {
    const r = bw("2026-01-10");
    expect(r).toMatchObject({ ok: false, reason: "EDITION_NOT_TESTED" });
    expect(r.coverage?.authority).toContain("L-Bank");
    expect(r.coverage?.onlinePortalUrl).toContain("behoerden-serviceportal.de");
    expect(r.coverage?.deliveryModes[0]).toBe("official_online_portal");
  });

  it("paper form is flat (no fields) and never uses Bayern editions", () => {
    expect(BW_EDITIONS.every((e) => e.technology === "flat" && e.fieldCount === 0)).toBe(true);
    expect(bw("2026-01-10").edition?.sourceUrl.startsWith("https://www.l-bank.de/")).toBe(true);
  });

  it("refuses births before the only registered BW edition", () => {
    expect(bw("2025-04-30")).toMatchObject({ ok: false, reason: "NO_EDITION_FOR_DATE" });
  });
});
