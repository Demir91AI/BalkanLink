import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import ProcedureCompanion from "@/components/guide-first/ProcedureCompanion";
import { VERIFIED_PDFS } from "./grundsicherung-model";
import inventory from "../../../docs/grundsicherung-phase3b-field-inventory.json";
import bs from "@/i18n/locales/bs/pages.json";
import hr from "@/i18n/locales/hr/pages.json";
import sr from "@/i18n/locales/sr/pages.json";
import de from "@/i18n/locales/de/pages.json";

const locales = { bs, hr, sr, de };
const forms = ["ek", "vm", "ki", "wep"] as const;
afterEach(cleanup);

describe("Phase 3B exact BA editions and complete field maps", () => {
  it("pins live-index editions, pages and document hashes", () => {
    for (const [form, pages, hash, file] of [
      ["ek", 4, "78218d99991efbfa", "anlageek_ba032960.pdf"],
      ["vm", 6, "dd0f8cebc3049d45", "anlagevm_ba033055.pdf"],
      ["ki", 5, "6c7f97165fca5f84", "anlageki_ba033000.pdf"],
      ["wep", 7, "de9e9b6249d88278", "anlagewep_ba033100.pdf"],
    ] as const) expect(VERIFIED_PDFS[`anlage-${form}`]).toEqual({ url: `https://www.arbeitsagentur.de/datei/${file}`, pages, edition: "10/2026", sha256Prefix: hash });
  });
  it("covers all 205 field numbers once in original order", () => {
    for (const [form, count] of [["ek", 41], ["vm", 35], ["ki", 54], ["wep", 75]] as const) {
      const numbers = inventory[form].flatMap((t) => t.numbers);
      expect(numbers).toEqual(Array.from({ length: count }, (_, i) => i + 1));
    }
  });
  it.each(Object.entries(locales))("%s has all source labels, references, choices and substantial explanations", (_lang, locale) => {
    for (const form of forms) {
      const terms = locale.grundsicherungCompanions.guides[`anlage-${form}`].terms;
      expect(terms.map((t) => t.id)).toEqual(inventory[form].map((t) => t.id));
      for (const [i, t] of terms.entries()) {
        const source = inventory[form][i];
        expect(t.german).toBe(source.german);
        expect(t.reference).toBe(source.reference);
        expect("options" in t ? t.options.map((o) => o.german) : []).toEqual("options" in source ? source.options : []);
        for (const k of ["instruction", "where", "example", "mistake"] as const) expect(t[k].trim().length).toBeGreaterThan(5);
      }
    }
  });
  it("EK includes full continued income list, KI gender choices and WEP seven statuses", () => {
    const find = (form: typeof forms[number], id: string) => bs.grundsicherungCompanions.guides[`anlage-${form}`].terms.find((t) => t.id === id);
    const ek = find("ek", "ek-23"); expect(ek && "options" in ek ? ek.options.length : 0).toBe(21);
    const ki = find("ki", "ki-12"); expect(ki && "options" in ki ? ki.options.map((o) => o.german) : []).toEqual(["Männlich", "Weiblich", "Divers", "Keine Angabe"]);
    const wep = find("wep", "wep-23"); expect(wep && "options" in wep ? wep.options.length : 0).toBe(7);
  });
  it.each(Object.entries(locales))("%s renders all printed options in the correct group, then advances", async (lng, locale) => {
    for (const form of forms) {
      const slug = `anlage-${form}` as const;
      const instance = i18next.createInstance();
      await instance.init({ lng, resources: { [lng]: { pages: locale } }, interpolation: { escapeValue: false } });
      const { container } = render(<I18nextProvider i18n={instance}><ProcedureCompanion slug={slug} /></I18nextProvider>);
      const select = container.querySelector<HTMLSelectElement>("select[data-nav]");
      if (!select) throw new Error("missing jump dropdown");
      const terms = locale.grundsicherungCompanions.guides[slug].terms;
      for (const [index, term] of terms.entries()) {
        fireEvent.change(select, { target: { value: String(index) } });
        expect(screen.getByTestId("term-reference").textContent).toContain(term.reference);
        if ("options" in term) {
          const printed = [...container.querySelectorAll("li > strong")].map((el) => el.textContent);
          expect(printed).toEqual(term.options.map((o) => o.german));
        }
      }
      expect(container.querySelectorAll("input,textarea")).toHaveLength(0);
      fireEvent.click(screen.getByRole("button", { name: locale.arrivalCompanions.ui.advance }));
      expect(container.textContent).toContain(locale.grundsicherungCompanions.guides[slug].steps[1].sections.action);
      cleanup();
    }
  });
});