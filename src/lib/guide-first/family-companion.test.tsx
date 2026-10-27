import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, within, cleanup } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import i18n from "i18next";
import ProcedureCompanion from "@/components/guide-first/ProcedureCompanion";
import { FAMILY_SLUGS, FIELD_MAPPED_FAMILY_SLUGS, isFamilySlug } from "./family-model";
import { isArrivalSlug } from "./arrival-model";
import { GUIDE_SOURCES } from "./official-sources";
import { getAllFormEntries } from "@/lib/form-catalog";
import bs from "@/i18n/locales/bs/pages.json";
import hr from "@/i18n/locales/hr/pages.json";
import sr from "@/i18n/locales/sr/pages.json";
import de from "@/i18n/locales/de/pages.json";

const locales = { bs, hr, sr, de };
type Guides = typeof bs.familyCompanions.guides;

describe("Family Phase 2 companions", () => {
  it("covers exactly five family items and never Kindergeld", () => {
    expect(FAMILY_SLUGS).toEqual(["elterngeld", "mutterschaftsgeld", "kinderzuschlag", "krippengeld-bayern", "wirtschaftliche-jugendhilfe"]);
    expect(isFamilySlug("kindergeld")).toBe(false);
    expect(isArrivalSlug("kindergeld")).toBe(false);
    const slugs = getAllFormEntries().map((e) => e.slug);
    for (const slug of FAMILY_SLUGS) expect(slugs).toContain(slug);
  });
  it("links the official forms and pages named by the owner", () => {
    const urls = (slug: string) => [GUIDE_SOURCES[slug].url, ...(GUIDE_SOURCES[slug].extraLinks ?? []).map((l) => l.url)];
    expect(urls("kinderzuschlag")).toEqual(expect.arrayContaining([
      "https://www.arbeitsagentur.de/familie-und-kinder/downloads-familie-und-kinder/formulare-kinderzuschlag",
      "https://www.arbeitsagentur.de/datei/kiz1-antrag_ba036540.pdf", "https://www.arbeitsagentur.de/datei/kiz1-ank_ba035005.pdf",
      "https://www.arbeitsagentur.de/datei/kiz1-ana_ba034980.pdf", "https://www.arbeitsagentur.de/datei/kiz1-hinweise_ba036545.pdf",
    ]));
    expect(urls("elterngeld")).toContain("https://familienportal.de/familienportal/familienleistungen/elterngeld/faq/wie-kann-ich-elterngeld-beantragen--124762");
    expect(urls("krippengeld-bayern")).toEqual(expect.arrayContaining(["https://www.zbfs.bayern.de/familienleistungen/krippengeld/", "https://www.zbfs.bayern.de/familienleistungen/krippengeld/papierantrag/"]));
    expect(urls("wirtschaftliche-jugendhilfe")).toContain("https://verwaltung.bund.de/leistungsverzeichnis/de/leistung/99107007010000");
    expect(urls("mutterschaftsgeld").join(" ")).toMatch(/gesetzlichen-krankenkasse.*bundesamtes-fuer-soziale-sicherung/);
  });
  it.each(Object.entries(locales))("%s has identical structure; only KiZ claims exact field locations", (_l, locale) => {
    for (const slug of FAMILY_SLUGS) {
      const g = locale.familyCompanions.guides[slug] as Guides[typeof slug];
      const b = bs.familyCompanions.guides[slug] as Guides[typeof slug];
      expect(g.steps.map((s) => s.id)).toEqual(b.steps.map((s) => s.id));
      expect(g.terms.map((t) => [t.id, t.german, ("options" in t ? t.options : []).map((o) => o.german)])).toEqual(b.terms.map((t) => [t.id, t.german, ("options" in t ? t.options : []).map((o) => o.german)]));
      const mapped = g.terms.filter((t) => "reference" in t).length;
      if (FIELD_MAPPED_FAMILY_SLUGS.includes(slug)) expect(mapped).toBe(g.terms.length);
      else expect(mapped).toBe(0);
      for (const t of g.terms) for (const k of ["meaning", "instruction", "where", "example", "mistake"] as const) expect(t[k].length).toBeGreaterThan(6);
    }
  });
  it("KiZ requires KiZ 1, AnA in every case and one AnK per child, with all KiZ 1 Familienstand choices", () => {
    const kiz = bs.familyCompanions.guides.kinderzuschlag;
    expect(kiz.introduction).toMatch(/KiZ 1-AnA[^.]*SVAKOM/);
    expect(kiz.introduction).toMatch(/KiZ 1-AnK[^.]*SVAKO dijete/);
    const status = kiz.terms.find((t) => t.id === "kiz1-person");
    expect(status && "options" in status ? status.options.map((o) => o.german) : []).toEqual(["ledig", "verheiratet/verpartnert", "getrennt lebend seit", "geschieden/Partnerschaft aufgehoben", "verwitwet"]);
  });
  for (const [lang, locale] of Object.entries(locales)) {
    it.each(FAMILY_SLUGS)(`${lang} %s renders, jumps every term with all options, and reviews to completion`, async (slug) => {
      const instance = i18n.createInstance();
      await instance.init({ lng: lang, resources: { [lang]: { pages: locale } }, interpolation: { escapeValue: false } });
      const { container } = render(<I18nextProvider i18n={instance}><ProcedureCompanion slug={slug} /></I18nextProvider>);
      const c = screen.getByTestId("arrival-companion");
      const data = locale.familyCompanions.guides[slug] as Guides[typeof slug];
      const ui = locale.arrivalCompanions.ui;
      expect(within(c).getByRole("heading", { name: data.title })).toBeTruthy();
      expect(container.querySelectorAll("input, textarea").length).toBe(0);
      for (const a of Array.from(c.querySelectorAll("a"))) expect(a.getAttribute("target")).toBe("_blank");
      const select = c.querySelector('select[data-nav="arrival-terms"]') as HTMLSelectElement;
      expect(select.options.length).toBe(data.terms.length);
      data.terms.forEach((term, i) => {
        fireEvent.change(select, { target: { value: String(i) } });
        expect(within(c).getAllByRole("heading", { level: 4 })[0].textContent).toContain(term.german);
        for (const o of "options" in term ? term.options : []) expect(within(c).getAllByText(o.german).length).toBeGreaterThan(0);
        expect(!!within(c).queryByTestId("term-reference")).toBe("reference" in term);
      });
      if ("gate" in data) {
        for (const o of data.gate.options) {
          fireEvent.click(within(c).getByRole("button", { name: o.label }));
          expect(screen.getByTestId("companion-gate-result").textContent).toBe(o.result);
        }
      }
      for (let i = 0; i < data.steps.length - 1; i++) fireEvent.click(within(c).getAllByRole("button", { name: ui.advance })[0]);
      fireEvent.click(within(c).getByRole("button", { name: ui.finish }));
      expect(within(c).getAllByText(ui.completionTitle).length).toBeGreaterThan(0);
      cleanup();
    });
  }
  it("Krippengeld is gated by the 31.12.2024 birth-date cut-off and Mutterschaftsgeld separates GKV from BAS", () => {
    for (const locale of Object.values(locales)) {
      const k = locale.familyCompanions.guides["krippengeld-bayern"];
      expect(k.gate.options.map((o) => o.id)).toEqual(["before2025", "from2025"]);
      expect(k.gate.options[0].label).toContain("31.12.2024");
      expect(k.gate.options[1].label).toContain("01.01.2025");
      expect(locale.familyCompanions.guides.mutterschaftsgeld.gate.options.map((o) => o.id)).toEqual(["gkv", "bas", "unsure"]);
    }
  });
});
