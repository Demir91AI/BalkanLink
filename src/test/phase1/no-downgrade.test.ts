/**
 * Phase 1 NO-DOWNGRADE safety net. Additions are allowed; removals/renames of
 * pinned baseline items fail. Update baseline.json only with owner approval.
 */
import { describe, it, expect } from "vitest";
import baseline from "./baseline.json";
import {
  routePaths, redirects, routeElements, adminGuardedPaths, languagePrefixes,
  storageKeys, importsOf, fileText,
} from "./extract";
import { PDF_FILL_FORMS, ELTERNGELD_VARIANTS } from "@/lib/formularpilot/inventory/forms";
import { outputLabelFor } from "@/lib/formularpilot/output-label";

const missing = (pinned: string[], current: string[]) => pinned.filter((p) => !current.includes(p));

describe("routes", () => {
  it("keeps every baseline route path", () => {
    expect(missing(baseline.routes, routePaths())).toEqual([]);
  });
  it("keeps every redirect pointing to the same target", () => {
    const cur = redirects();
    for (const [from, to] of Object.entries(baseline.redirects)) expect([from, cur[from]]).toEqual([from, to]);
  });
  it("keeps each route rendering the same page component", () => {
    const cur = routeElements();
    for (const [p, el] of Object.entries(baseline.routeElements)) expect([p, cur[p]]).toEqual([p, el]);
  });
  it("keeps the 4-language prefixes (bs root + de/hr/sr)", () => {
    expect(languagePrefixes()).toEqual(["de", "hr", "sr"]);
    expect(routePaths()).toContain("/*");
  });
  it("keeps Kindergeld preview window in all 4 languages", () => {
    for (const p of ["/muster/kindergeld/preview", "/de/muster/kindergeld/preview", "/hr/muster/kindergeld/preview", "/sr/muster/kindergeld/preview"]) {
      expect(routePaths()).toContain(p);
    }
  });
  it("keeps admin routes behind AdminGuard", () => {
    expect(missing(baseline.adminGuarded, adminGuardedPaths())).toEqual([]);
    for (const p of routePaths()) if (p.startsWith("admin")) expect(adminGuardedPaths()).toContain(p);
  });
  it("keeps critical journey targets", () => {
    const all = routePaths();
    for (const p of ["familie", "formulari", "formulari/:slug", "dokumenten-check", "ai-asistent", "paketi", "vorlagen", "check-liste", "deutsch-trainer", "viza", "porezi", "admin"]) {
      expect(all).toContain(p);
    }
  });
});

describe("saved form data", () => {
  it("keeps every browser-storage key (renaming loses user entries)", () => {
    expect(missing(baseline.storageKeys, storageKeys())).toEqual([]);
  });
});

describe("hub imports", () => {
  for (const [file, imps] of Object.entries(baseline.hubImports)) {
    it(`${file} keeps its feature imports`, () => {
      expect(missing(imps as string[], importsOf(file))).toEqual([]);
    });
  }
});

describe("payments & entitlement contract (code level)", () => {
  const products = fileText("supabase/functions/_shared/products.ts");
  const webhook = fileText("supabase/functions/stripe-webhook/index.ts");
  it("retains historic one-time product metadata for reconciliation, but forbids new sales", () => {
    expect(products).toMatch(/export type ProductKey = "plus";/);
    expect(products).toMatch(/amountCents: 1990/);
    expect(products).toMatch(/mode: "payment"/);
    expect(fileText("supabase/functions/create-checkout/index.ts")).toMatch(/body\.product === "plus"\) return json\(\{ error: "product_retired" \}, 410\)/);
  });
  it("keeps the two legacy monthly subscription prices recognised", () => {
    expect(products).toContain("price_1TQDVTR9oGwbVekBC4NGd2XI");
    expect(products).toContain("price_1TQDVsR9oGwbVekBWswag3oI");
  });
  it("webhook still handles renewals and never downgrades lifetime", () => {
    expect(webhook).toContain("invoice.payment_succeeded");
    expect(webhook).toContain("isLegacyPremiumSub");
    expect(webhook).toMatch(/\.neq\("subscription_tier", "lifetime"\)/);
  });
  it("webhook never cancels subscriptions", () => {
    expect(webhook).not.toMatch(/subscriptions\.(cancel|del)\(/);
  });
});

describe("label rule for NEW 2.0 UI", () => {
  it("no current family form may be labelled verified official", () => {
    for (const e of PDF_FILL_FORMS) {
      for (const v of e.variants) expect([e.id, v.id, outputLabelFor(e, v)]).not.toContain("verified_official");
    }
    expect(ELTERNGELD_VARIANTS.every((v) => v.readiness !== "tested")).toBe(true);
  });
  it("only an authentic tested variant with cleared rights becomes verified", () => {
    const v = { id: "x", pdfTech: "acroform" as const, provenance: "authentic_official_verified" as const, readiness: "tested" as const, blockers: [] };
    expect(outputLabelFor({ kind: "pdf_fill", rights: "not_applicable" }, v)).toBe("verified_official");
    expect(outputLabelFor({ kind: "pdf_fill", rights: "unknown" }, v)).toBe("helper_sheet_non_official");
    expect(outputLabelFor({ kind: "pdf_fill", rights: "not_applicable" }, { ...v, readiness: "needs_review" })).toBe("helper_sheet_non_official");
    expect(outputLabelFor({ kind: "external_link", rights: "unknown" })).toBe("guide_with_official_link");
  });
  it("FormularPilot stays unwired from live pages", () => {
    const hubs = Object.keys(baseline.hubImports);
    for (const f of hubs) expect(importsOf(f).some((i) => i.includes("formularpilot"))).toBe(false);
  });
});
