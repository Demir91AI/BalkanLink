import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, within, cleanup } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import i18n from "i18next";
import ProcedureCompanion from "@/components/guide-first/ProcedureCompanion";
import { ARRIVAL_SLUGS, isArrivalSlug } from "./arrival-model";
import { isFormFree, formCatalog } from "@/lib/form-catalog";
import { decideGuideAccess } from "./guide-access";
import { FREE_ENTITLEMENT } from "@/lib/entitlement";
import { GUIDE_SOURCES } from "./official-sources";
import bs from "@/i18n/locales/bs/pages.json";
import hr from "@/i18n/locales/hr/pages.json";
import sr from "@/i18n/locales/sr/pages.json";
import de from "@/i18n/locales/de/pages.json";

const locales = { bs, hr, sr, de };
describe("Arrival Phase 1 procedure companions", () => {
  it("is scoped to exactly four arrival entries, not Kindergeld or visa", () => {
    expect(ARRIVAL_SLUGS).toEqual(["anmeldung", "steuer-id", "fuehrerschein", "fahrzeugzulassung"]);
    expect(isArrivalSlug("kindergeld")).toBe(false);
    expect(isArrivalSlug("viza")).toBe(false);
    expect(formCatalog.find((g) => g.id === "dolazak")?.isFree).toBe(true);
  });
  it.each(ARRIVAL_SLUGS)("%s remains free signed out with both flag states", (slug) => {
    expect(isFormFree(slug)).toBe(true);
    for (const monetizationV2 of [false, true]) expect(decideGuideAccess({ monetizationV2, isFreeSlug: isFormFree(slug), legacyPremium: false, signedIn: false, entitlement: FREE_ENTITLEMENT })).toBe("full");
  });
  it.each(Object.entries(locales))("%s has identical step/term/option IDs and no fabricated form references", (_lang, locale) => {
    for (const slug of ARRIVAL_SLUGS) {
      const data = locale.arrivalCompanions.guides[slug];
      expect(data.steps.map((s) => s.id)).toEqual(bs.arrivalCompanions.guides[slug].steps.map((s) => s.id));
      expect(data.terms.map((s) => s.id)).toEqual(bs.arrivalCompanions.guides[slug].terms.map((s) => s.id));
      expect(data.steps.length).toBe(slug === "steuer-id" ? 5 : 6);
      for (const s of data.steps) {
        expect(s.sections).not.toHaveProperty("verifiedField");
        expect(s).not.toHaveProperty("reference");
      }
      for (const term of data.terms) for (const key of ["meaning", "instruction", "where", "example", "mistake"] as const) expect(term[key].length).toBeGreaterThan(15);
      expect(GUIDE_SOURCES[slug].verifiedOn).toBe("27.10.2026");
    }
  });
  for (const [lang, locale] of Object.entries(locales)) {
    it.each(ARRIVAL_SLUGS)(`${lang} %s jumps every term, exposes all options and reviews through completion`, async (slug) => {
      const instance = i18n.createInstance();
      await instance.init({ lng: lang, resources: { [lang]: { pages: locale } }, interpolation: { escapeValue: false } });
      const { container } = render(<I18nextProvider i18n={instance}><ProcedureCompanion slug={slug} /></I18nextProvider>);
      const companion = screen.getByTestId("arrival-companion");
      const data = locale.arrivalCompanions.guides[slug];
      const ui = locale.arrivalCompanions.ui;
      expect(within(companion).getByRole("heading", { name: data.title })).toBeTruthy();
      expect(within(companion).getByRole("button", { name: ui.paper }).getAttribute("aria-pressed")).toBe("true");
      fireEvent.click(within(companion).getByRole("button", { name: ui.online }));
      expect(screen.getByTestId("arrival-mode-note").textContent).toBe(data.modes.online);
      const selector = within(companion).getByRole("combobox");
      expect(selector.querySelectorAll("option")).toHaveLength(data.terms.length);
      for (let index = 0; index < data.terms.length; index++) {
        fireEvent.change(selector, { target: { value: String(index) } });
        const term = data.terms[index];
        expect(within(companion).getByRole("heading", { name: `${term.german} — ${term.meaning}` })).toBeTruthy();
        if ("options" in term) for (const option of term.options) {
          expect(within(companion).getByText(option.german, { selector: "strong" })).toBeTruthy();
          expect(within(companion).getByText(option.meaning)).toBeTruthy();
        }
      }
      const workflow = within(screen.getByTestId("smartguide-template"));
      for (let index = 0; index < data.steps.length; index++) {
        expect(workflow.getByRole("heading", { name: data.steps[index].title })).toBeTruthy();
        fireEvent.click(workflow.getByRole("button", { name: index < data.steps.length - 1 ? ui.advance : ui.finish }));
      }
      expect(screen.getByTestId("guide-completion")).toBeTruthy();
      fireEvent.click(workflow.getByRole("button", { name: ui.reopen }));
      fireEvent.click(workflow.getByRole("button", { name: ui.unmark }));
      expect(screen.getByTestId("guide-reviewed-count").textContent).toContain(String(data.steps.length - 1));
      expect(container.querySelectorAll("input, textarea, select:not([data-nav])")).toHaveLength(0);
      expect(container.querySelector("[data-workflow]")).toBeNull();
      for (const link of companion.querySelectorAll('a[href^="http"]')) {
        expect(link.getAttribute("href")).toMatch(/^https:\/\/(verwaltung\.bund\.de|www\.gesetze-im-internet\.de|online\.portal\.bzst\.de|www\.bzst\.de|karriere\.bzst\.de|www\.service\.bremen\.de|www\.bmv\.de|www\.elster\.de)\//);
        expect(link.getAttribute("target")).toBe("_blank");
        expect(link.getAttribute("rel")).toBe("noopener noreferrer");
      }
      cleanup();
    });
  }
});