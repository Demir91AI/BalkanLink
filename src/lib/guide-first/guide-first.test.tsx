import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "i18next";
import { resolveLegacyMuster } from "./legacy-muster";
import { GUIDE_SOURCES } from "./official-sources";
import { MUSTER_SLUG_MAP, getAllFormEntries } from "@/lib/form-catalog";
import LegacyMusterGuard from "@/components/guide-first/LegacyMusterGuard";
import KindergeldGuideContent from "@/components/KindergeldGuideContent";
import bs from "@/i18n/locales/bs/pages.json";
import hr from "@/i18n/locales/hr/pages.json";
import sr from "@/i18n/locales/sr/pages.json";
import de from "@/i18n/locales/de/pages.json";

const keys = (o: unknown, p = ""): string[] =>
  o && typeof o === "object" && !Array.isArray(o)
    ? Object.entries(o as Record<string, unknown>).flatMap(([k, v]) => keys(v, p ? `${p}.${k}` : k))
    : [p];

describe("legacy Muster redirects", () => {
  it("every mapped Muster slug resolves to its catalog guide", () => {
    const slugs = new Set(getAllFormEntries().map((e) => e.slug));
    for (const ms of new Set(Object.values(MUSTER_SLUG_MAP))) {
      const target = resolveLegacyMuster(`/musterformular/${ms}`)!;
      expect(target.startsWith("/formulari/")).toBe(true);
      expect(slugs.has(target.replace("/formulari/", "").split("?")[0])).toBe(true);
    }
  });
  it("keeps locale prefixes and handles special cases", () => {
    expect(resolveLegacyMuster("/de/musterformular/kindergeld")).toBe("/de/formulari/kindergeld");
    expect(resolveLegacyMuster("/hr/musterformular/steuerklasse")).toBe("/hr/formulari/steuerklassenwechsel");
    expect(resolveLegacyMuster("/musterformular/buergergeld")).toBe("/formulari/hauptantrag?from=buergergeld");
    expect(resolveLegacyMuster("/sr/musterformular/einbuergerung")).toBe("/sr/dvojno-drzavljanstvo/einbuergerung-vodic");
    expect(resolveLegacyMuster("/musterformular/antrag-generic")).toBe("/formulari");
    expect(resolveLegacyMuster("/de/muster/kindergeld/preview")).toBe("/de/formulari/kindergeld");
    expect(resolveLegacyMuster("/formulari/kindergeld")).toBeNull();
    expect(resolveLegacyMuster("/vorlagen")).toBeNull();
  });
  it("guard renders the guide route instead of the old page", () => {
    render(
      <MemoryRouter initialEntries={["/musterformular/wohngeld"]}>
        <Routes>
          <Route path="*" element={<LegacyMusterGuard><p>old form</p></LegacyMusterGuard>} />
          <Route path="/formulari/:slug" element={<p>guide page</p>} />
        </Routes>
      </MemoryRouter>,
    );
    expect(screen.queryByText("old form")).toBeNull();
    expect(screen.getByText("guide page")).toBeTruthy();
  });
});

describe("guide-first sources", () => {
  it("every catalog service has a source entry; only primary-source-reviewed workflows are marked verified", () => {
    for (const e of getAllFormEntries()) expect(GUIDE_SOURCES[e.slug], e.slug).toBeDefined();
    const verified = Object.entries(GUIDE_SOURCES).filter(([, s]) => s.verifiedOn).map(([k]) => k);
    expect(verified).toEqual(["steuer-id", "kindergeld", "kinderzuschlag"]);
  });
  it("never labels known third-party sites as official", () => {
    const urls = Object.values(GUIDE_SOURCES).map((s) => s.url ?? "");
    expect(urls.some((u) => /elterngeld\.net|kirchenaustritt\.de/.test(u))).toBe(false);
  });
});

describe("Kindergeld SmartGuide", () => {
  it("has the same guideFirst keys in all 4 languages", () => {
    const ref = keys(bs.guideFirst).sort();
    for (const l of [hr, sr, de]) expect(keys(l.guideFirst).sort()).toEqual(ref);
  });
  it("asks for no personal data and links to the official online application", async () => {
    await i18n.init({ lng: "bs", resources: { bs: { pages: bs } }, interpolation: { escapeValue: false } });
    const { container } = render(
      <I18nextProvider i18n={i18n}><KindergeldGuideContent /></I18nextProvider>,
    );
    expect(container.querySelectorAll("input:not([type=checkbox]), textarea, select").length).toBe(0);
    fireEvent.click(screen.getByRole("button", { name: /Korak 4:/ }));
    const cta = screen.getByText(bs.guideFirst.kindergeld.ctaOnline).closest("a");
    expect(cta?.getAttribute("href")).toBe("https://www.arbeitsagentur.de/familie-und-kinder/eservices-fuer-familien");
    expect(cta?.getAttribute("rel")).toBe("noopener noreferrer");
    expect(container.textContent).not.toMatch(/2027/);
  });
});

describe("Kindergeld special cases", () => {
  it.each([
    ["adult", "https://www.arbeitsagentur.de/familie-und-kinder/infos-rund-um-kindergeld/kindergeld-ab-18-jahren"],
    ["cross", "https://www.arbeitsagentur.de/familie-und-kinder/infos-rund-um-kindergeld/kindergeld-ausland"],
  ] as const)("%s shows only its official panel, not the newborn steps", async (c, url) => {
    await i18n.init({ lng: "bs", resources: { bs: { pages: bs } }, interpolation: { escapeValue: false } });
    const { fireEvent } = await import("@testing-library/react");
    render(<I18nextProvider i18n={i18n}><KindergeldGuideContent /></I18nextProvider>);
    fireEvent.click(screen.getByText(bs.guideFirst.kindergeld.case[c]));
    expect(screen.queryByText(bs.guideFirst.kindergeld.ctaOnline)).toBeNull();
    const cta = screen.getByText(bs.guideFirst.kindergeld.special[c].cta).closest("a");
    expect(cta?.getAttribute("href")).toBe(url);
    fireEvent.click(screen.getByText(bs.guideFirst.kindergeld.special.back));
    expect(screen.getByTestId("smartguide-template")).toBeTruthy();
  });
});
