import { describe, it, expect, beforeAll } from "vitest";
import { render, cleanup } from "@testing-library/react";
import { readFileSync } from "fs";
import { MemoryRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "i18next";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GuideContent } from "@/pages/FormCenter";
import { getAllFormEntries } from "@/lib/form-catalog";
import { resolveLegacyMuster } from "./legacy-muster";
import { decideGuideAccess } from "./guide-access";
import { GUIDE_SOURCES } from "./official-sources";
import { FREE_ENTITLEMENT, QUOTAS, type Entitlement } from "@/lib/entitlement";
import bs from "@/i18n/locales/bs/pages.json";
import hr from "@/i18n/locales/hr/pages.json";
import sr from "@/i18n/locales/sr/pages.json";
import de from "@/i18n/locales/de/pages.json";

const entries = getAllFormEntries().filter((e) => e.slug !== "anerkennung-navigator");
const PDF_FILL = /(popuni|ispuni|generiši|generiraj|preuzmi popunjen|ausfüllen und herunterladen|pdf ausfüllen|autofill|musterformular öffnen)/i;

beforeAll(async () => {
  await i18n.init({ lng: "bs", resources: { bs: { pages: bs } }, interpolation: { escapeValue: false } });
});

describe("Phase 5: every catalog guide uses the shared guide-first frame", () => {
  it("catalog still lists 46 services", () => {
    expect(getAllFormEntries().length).toBe(46);
  });
  it.each(entries.map((e) => [e.slug, e.label]))("%s renders frame, status, no data entry, no PDF-fill CTA", (slug, label) => {
    const qc = new QueryClient();
    const { container } = render(
      <QueryClientProvider client={qc}>
        <I18nextProvider i18n={i18n}>
          <MemoryRouter><GuideContent slug={slug} title={label} /></MemoryRouter>
        </I18nextProvider>
      </QueryClientProvider>,
    );
    expect(container.querySelector(`[data-testid="guide-frame"][data-slug="${slug}"]`)).toBeTruthy();
    expect(container.querySelector('[data-testid="guide-verify-status"]')).toBeTruthy();
    expect(container.querySelector('[data-testid="official-next-step"]') || slug === "kindergeld").toBeTruthy();
    expect(container.querySelectorAll("input, textarea, select").length, slug).toBe(0);
    const ctas = [...container.querySelectorAll("a, button")].map((n) => n.textContent ?? "");
    expect(ctas.filter((c) => PDF_FILL.test(c)), slug).toEqual([]);
    for (const a of container.querySelectorAll('a[href^="http"]')) {
      expect(a.getAttribute("href")!.startsWith("https://"), a.getAttribute("href")!).toBe(true);
    }
    cleanup();
  });
  it("unverified guides say they need current official verification", () => {
    const unverified = entries.filter((e) => !GUIDE_SOURCES[e.slug]?.verifiedOn);
    expect(unverified.length).toBeGreaterThan(40);
    expect(bs.guideFirst.frame.unverified).toMatch(/provjer/i);
  });
  it("Kindergeld lists official forms page; Elterngeld points to ElterngeldDigital", () => {
    expect(GUIDE_SOURCES.kindergeld.extraLinks?.[0].url).toBe("https://www.arbeitsagentur.de/familie-und-kinder/downloads-familie-und-kinder/formulare-kindergeld");
    expect(GUIDE_SOURCES.elterngeld.url).toBe("https://familienportal.de/familienportal/rechner-antraege/elterngeld-digital");
  });
});

describe("Phase 5: all legacy /musterformular routes resolve to guides", () => {
  const app = readFileSync("src/App.tsx", "utf8");
  const paths = [...new Set([...app.matchAll(/path="(musterformular[^"]*)"/g)].map((m) => "/" + m[1]))]
    .filter((p) => !p.includes(":"));
  it("finds 35+ legacy routes", () => expect(paths.length).toBeGreaterThanOrEqual(35));
  it.each(paths)("%s → guide", (p) => {
    for (const prefix of ["", "/de", "/hr", "/sr"]) {
      const t = resolveLegacyMuster(prefix + p);
      expect(t, prefix + p).toBeTruthy();
      expect(t!.includes("musterformular")).toBe(false);
      expect(t!.startsWith(prefix + "/")).toBe(true);
    }
  });
});

describe("Phase 5: guide access decision", () => {
  const ent = (source: Entitlement["source"], full: boolean): Entitlement => ({ ...FREE_ENTITLEMENT, source, full_access: full, quota: QUOTAS[source] });
  const base = { isFreeSlug: false, legacyPremium: false, signedIn: true, entitlement: FREE_ENTITLEMENT };
  it("flag OFF keeps the legacy rule exactly", () => {
    expect(decideGuideAccess({ ...base, monetizationV2: false })).toBe("subscribe");
    expect(decideGuideAccess({ ...base, monetizationV2: false, isFreeSlug: true })).toBe("full");
    expect(decideGuideAccess({ ...base, monetizationV2: false, legacyPremium: true })).toBe("full");
    // a trial entitlement does not change behaviour before rollout
    expect(decideGuideAccess({ ...base, monetizationV2: false, entitlement: ent("trial", true) })).toBe("subscribe");
  });
  it("flag ON: trial, yearly, legacy and admin get the full guide", () => {
    for (const s of ["trial", "new_yearly", "legacy_lifetime", "legacy_sub", "admin"] as const)
      expect(decideGuideAccess({ ...base, monetizationV2: true, entitlement: ent(s, true) })).toBe("full");
  });
  it("flag ON: expired trial asks to subscribe, signed-out asks to register", () => {
    expect(decideGuideAccess({ ...base, monetizationV2: true })).toBe("subscribe");
    expect(decideGuideAccess({ ...base, monetizationV2: true, signedIn: false })).toBe("register");
    expect(decideGuideAccess({ ...base, monetizationV2: true, legacyPremium: true })).toBe("full");
  });
});

describe("Phase 5: i18n parity for new keys", () => {
  const shape = (o: unknown): unknown => (Array.isArray(o) ? o.length : o && typeof o === "object" ? Object.fromEntries(Object.entries(o).map(([k, v]) => [k, shape(v)])) : typeof o);
  it.each([["hr", hr], ["sr", sr], ["de", de]] as const)("%s matches bs frame/paywall", (_l, loc) => {
    expect(shape(loc.guideFirst.frame)).toEqual(shape(bs.guideFirst.frame));
    expect(shape(loc.guideFirst.paywall)).toEqual(shape(bs.guideFirst.paywall));
  });
  it("paywall copy has no fixed price or per-field promise", () => {
    for (const l of [bs, hr, sr, de]) expect(JSON.stringify(l.guideFirst.paywall)).not.toMatch(/€|19[.,]9|svako polje/);
  });
});

describe("Phase 5: contrast tokens of the frame", () => {
  const lum = (hex: string) => {
    const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  };
  const ratio = (a: string, b: string) => (Math.max(lum(a), lum(b)) + 0.05) / (Math.min(lum(a), lum(b)) + 0.05);
  it("body and title text meet WCAG AA on both card colours", () => {
    for (const bg of ["#111B2D", "#18253A"]) {
      expect(ratio("#CBD5E1", bg)).toBeGreaterThan(4.5);
      expect(ratio("#F8FAFC", bg)).toBeGreaterThan(4.5);
    }
  });
});
