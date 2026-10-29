import { describe, it, expect } from "vitest";
import { nextStepCards } from "./assistant-next-steps";
import { isValidProductionRoute } from "./canonical-routes";
import bs from "../i18n/locales/bs/common.json";
import hr from "../i18n/locales/hr/common.json";
import sr from "../i18n/locales/sr/common.json";
import de from "../i18n/locales/de/common.json";

const valid = (p: string) => isValidProductionRoute(p);

describe("assistant next-step cards", () => {
  it("Elterngeld → SmartGuide + documents + conditions, max 3", () => {
    const c = nextStepCards({ guideSlug: "elterngeld", isValidRoute: valid });
    expect(c).toHaveLength(3);
    expect(c[0]).toMatchObject({ kind: "route", to: "/formulari/elterngeld" });
    expect(c.slice(1).every(x => x.kind === "ask")).toBe(true);
  });
  it("Kindergeld route is a real route", () => {
    const c = nextStepCards({ guideSlug: "kindergeld", isValidRoute: valid });
    expect(c[0]).toMatchObject({ to: "/formulari/kindergeld" });
    expect(valid("/formulari/kindergeld")).toBe(true);
  });
  it("route already shown by answer buttons is not duplicated", () => {
    const c = nextStepCards({ guideSlug: "elterngeld", isValidRoute: valid, excludeRoutes: ["/formulari/elterngeld"] });
    expect(c.some(x => x.kind === "route")).toBe(false);
    expect(c).toHaveLength(2);
  });
  it("visa question → /viza navigator", () => {
    const c = nextStepCards({ userText: "Kako dobiti vizu za rad?", isValidRoute: valid });
    expect(c[0]).toMatchObject({ kind: "route", to: "/viza" });
  });
  it("unknown topic or unverified slug → no cards", () => {
    expect(nextStepCards({ userText: "Kindersitzerhöhung", isValidRoute: valid })).toEqual([]);
    expect(nextStepCards({ guideSlug: "nepostoji", isValidRoute: valid })).toEqual([]);
  });
  it("invalid route is never offered", () => {
    const c = nextStepCards({ guideSlug: "elterngeld", isValidRoute: () => false });
    expect(c.some(x => x.kind === "route")).toBe(false);
  });
  it("all card texts exist in BS/HR/SR/DE and never promise entitlement", () => {
    for (const loc of [bs, hr, sr, de] as any[]) {
      const n = loc.assistantNext;
      for (const k of ["openGuide", "openVisa", "askDocs", "askDocsQ", "askConditions", "askConditionsQ", "askVisaDocs", "askVisaDocsQ", "title"]) {
        expect(typeof n[k]).toBe("string");
      }
      expect(typeof loc.chatScroll.preparing).toBe("string");
    }
    expect(bs.assistantNext.askConditionsQ).not.toMatch(/imam pravo\b(?!.*opć)/i);
  });
});
