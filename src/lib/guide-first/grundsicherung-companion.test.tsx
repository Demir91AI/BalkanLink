import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import ProcedureCompanion from "@/components/guide-first/ProcedureCompanion";
import GrundsicherungNavigator from "@/components/guide-first/GrundsicherungNavigator";
import { getAllFormEntries } from "@/lib/form-catalog";
import { GUIDE_SOURCES } from "./official-sources";
import { GRUNDSICHERUNG_SLUGS, VERIFIED_PDFS, suggestForms, type NavigatorAnswers } from "./grundsicherung-model";
import bs from "@/i18n/locales/bs/pages.json";
import hr from "@/i18n/locales/hr/pages.json";
import sr from "@/i18n/locales/sr/pages.json";
import de from "@/i18n/locales/de/pages.json";

const locales = { bs, hr, sr, de };
const alone: NavigatorAnswers = { kind: "initial", partner: "no", childrenUnder15: "no", children15plus: "no", housing: "none", employed: "no", selfEmployed: "no", assets: "no", specialNeeds: "no" };
afterEach(cleanup);
describe("Grundsicherung navigator rules — BA 10/2026", () => {
  it("HA H keeps EK per person and VM despite no income/assets", () => {
    const forms = suggestForms(alone).map((s) => s.form);
    expect(forms).toContain("HA"); expect(forms).toContain("EK"); expect(forms).toContain("VM");
    expect(forms).not.toContain("WBA"); expect(forms).not.toContain("KDU");
  });
  it("WBA F keeps VM; employed renewal uses WBA 16, not mandatory new EK/KDU", () => {
    const forms = suggestForms({ ...alone, kind: "renewal", employed: "yes", housing: "rent" }).map((s) => s.form);
    expect(forms).toContain("VM"); expect(forms).toContain("WBA D 16"); expect(forms).toContain("WBA C");
    expect(forms).not.toContain("EK"); expect(forms).not.toContain("KDU");
  });
  it("partner and children age bands suggest WEP/KI; self-employed EKS", () => {
    const r = suggestForms({ ...alone, partner: "yes", childrenUnder15: "yes", children15plus: "yes", selfEmployed: "yes", housing: "owned" });
    expect(r.filter((s) => s.form === "WEP")).toHaveLength(2);
    expect(r.find((s) => s.form === "KI")?.level).toBe("likely");
    expect(r.find((s) => s.form === "EKS")?.level).toBe("likely");
    expect(r.find((s) => s.form === "KDU")?.reason).toBe("kduOwned");
  });
  it("uncertainty is not interpreted as definite yes/no or binary gender", () => {
    const r = suggestForms({ ...alone, kind: "unsure", partner: "unsure", childrenUnder15: "unsure" });
    expect(r.filter((s) => s.form === "HA" || s.form === "WBA")).toHaveLength(2);
    expect(r.every((s) => s.level === "check")).toBe(true);
    expect("gender" in alone).toBe(false);
  });
});

describe("verified Grundsicherung field companions", () => {
  it("pins three editions, exact URLs, page counts and hashes", () => {
    expect(VERIFIED_PDFS.hauptantrag).toEqual({ url: "https://www.arbeitsagentur.de/datei/antrag-sgb2_ba042689.pdf", edition: "10/2026", pages: 8, sha256Prefix: "ca83914379b236b2" });
    expect(VERIFIED_PDFS.weiterbewilligung.pages).toBe(6);
    expect(VERIFIED_PDFS["anlage-kdu"].url).toBe("https://www.arbeitsagentur.de/datei/anlagekdu_ba032980.pdf");
    for (const s of GRUNDSICHERUNG_SLUGS) expect(GUIDE_SOURCES[s].url).toBe(VERIFIED_PDFS[s].url);
    expect(getAllFormEntries()).toHaveLength(46);
  });
  it("covers every numbered field in source order, not invented page numbering", () => {
    for (const [slug, max] of [["hauptantrag", 85], ["weiterbewilligung", 30], ["anlage-kdu", 40]] as const) {
      const numbers = new Set<number>();
      for (const term of bs.grundsicherungCompanions.guides[slug].terms) {
        const last = term.reference.split("·").at(-1)?.trim() ?? "";
        const match = last.match(/^(\d+)(?:–(\d+))?$/);
        if (match) for (let i = Number(match[1]); i <= Number(match[2] ?? match[1]); i++) numbers.add(i);
      }
      expect([...numbers]).toEqual(Array.from({ length: max }, (_, i) => i + 1));
    }
  });
  it.each(Object.entries(locales))("%s keeps all field IDs, references and exact German choices", (_lng, locale) => {
    for (const slug of GRUNDSICHERUNG_SLUGS) {
      const shape = (d: typeof bs.grundsicherungCompanions) => d.guides[slug].terms.map((t) => [t.id, t.reference, t.german, "options" in t ? t.options.map((o) => o.german) : []]);
      expect(shape(locale.grundsicherungCompanions)).toEqual(shape(bs.grundsicherungCompanions));
    }
  });
  it.each(Object.entries(locales).flatMap(([lng, locale]) => GRUNDSICHERUNG_SLUGS.map((slug) => [lng, locale, slug] as const)))("%s/%s companion jumps and reviews", async (lng, locale, slug) => {
    const instance = i18next.createInstance();
    await instance.init({ lng, resources: { [lng]: { pages: locale } }, interpolation: { escapeValue: false } });
    const { container } = render(<I18nextProvider i18n={instance}><ProcedureCompanion slug={slug} /></I18nextProvider>);
    const select = container.querySelector<HTMLSelectElement>('select[data-nav="arrival-terms"]');
    expect(select?.options.length).toBe(locale.grundsicherungCompanions.guides[slug].terms.length);
    if (!select) throw new Error("missing jump");
    fireEvent.change(select, { target: { value: "2" } });
    expect(screen.getByTestId("term-reference").textContent).toContain(locale.grundsicherungCompanions.guides[slug].terms[2].reference);
    const link = container.querySelector(`a[href="${VERIFIED_PDFS[slug].url}"]`);
    expect(link?.getAttribute("target")).toBe("_blank");
    expect(container.querySelectorAll("input,textarea").length).toBe(0);
    fireEvent.click(screen.getByRole("button", { name: locale.arrivalCompanions.ui.advance }));
    expect(container.textContent).toContain(locale.grundsicherungCompanions.guides[slug].steps[1].sections.action);
  });
  it("navigator renders choices without collecting inputs", async () => {
    const instance = i18next.createInstance();
    await instance.init({ lng: "bs", resources: { bs: { pages: bs } } });
    const { container } = render(<I18nextProvider i18n={instance}><GrundsicherungNavigator /></I18nextProvider>);
    expect(container.querySelectorAll("fieldset")).toHaveLength(9);
    expect(container.querySelectorAll("input,textarea")).toHaveLength(0);
  });
});