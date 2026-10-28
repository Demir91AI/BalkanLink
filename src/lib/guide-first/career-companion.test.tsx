import { describe, it, expect, afterEach } from "vitest";
import { render, cleanup, fireEvent, within } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import CareerCompanion from "@/components/guide-first/CareerCompanion";
import { CAREER_LINKS, CAREER_SLUGS } from "./career-model";
import { getAllFormEntries } from "@/lib/form-catalog";
import bs from "@/i18n/locales/bs/pages.json";
import hr from "@/i18n/locales/hr/pages.json";
import sr from "@/i18n/locales/sr/pages.json";
import de from "@/i18n/locales/de/pages.json";

const locales = { bs, hr, sr, de };
type Lng = keyof typeof locales;
afterEach(cleanup);
function shape(v: unknown): unknown {
  if (Array.isArray(v)) return v.map(shape);
  if (v && typeof v === "object") return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, k === "id" || k === "german" ? x : shape(x)]));
  return typeof v;
}
async function mount(lng: Lng, slug: (typeof CAREER_SLUGS)[number]) {
  const instance = i18next.createInstance();
  await instance.init({ lng, resources: { [lng]: { pages: locales[lng] } }, interpolation: { escapeValue: false } });
  return render(<I18nextProvider i18n={instance}><CareerCompanion slug={slug} /></I18nextProvider>);
}

describe("career companions data", () => {
  it("keeps catalog slugs and count", () => {
    const slugs = getAllFormEntries().map((e) => e.slug);
    expect(slugs).toHaveLength(46);
    for (const s of CAREER_SLUGS) expect(slugs).toContain(s);
  });
  it("has identical structure, ids and German terms in four locales", () => {
    for (const l of ["hr", "sr", "de"] as const) expect(shape(locales[l].careerCompanions)).toEqual(shape(bs.careerCompanions));
  });
  it("claims no field/page references", () => {
    for (const l of Object.values(locales)) for (const g of Object.values(l.careerCompanions.guides)) for (const t of g.terms) expect(t).not.toHaveProperty("reference");
  });
  it("ALG keeps three distinct registration steps", () => {
    expect(bs.careerCompanions.guides.arbeitslosengeld.terms.slice(0, 3).map((t) => t.german)).toEqual(["Arbeitsuchendmeldung", "Arbeitslosmeldung", "Antrag auf Arbeitslosengeld"]);
  });
  it("Steuerklasse lists the three couple combinations", () => {
    const opts = bs.careerCompanions.guides.steuerklassenwechsel.terms[0].options!.map((o) => o.german);
    expect(opts).toEqual(["IV/IV", "III/V", "IV/IV mit Faktor"]);
  });
  it("only official https links", () => {
    for (const links of Object.values(CAREER_LINKS)) for (const l of links) expect(l.url).toMatch(/^https:\/\/(www\.)?(arbeitsagentur\.de|gkv-spitzenverband\.de|bundesgesundheitsministerium\.de|gesund\.bund\.de|verwaltung\.bund\.de|elster\.de|formulare-bfinv\.de|finanzamt-bw\.fv-bwl\.de)\//);
  });
});

describe.each(Object.keys(locales) as Lng[])("career UI (%s)", (lng) => {
  it.each(CAREER_SLUGS)("%s: links new tab, gate, jump, review-next, no inputs", async (slug) => {
    const { container } = await mount(lng, slug);
    const root = container.querySelector('[data-testid="arrival-companion"]') as HTMLElement;
    const links = [...root.querySelectorAll("header a")];
    expect(links.map((a) => a.getAttribute("href"))).toEqual(CAREER_LINKS[slug].map((l) => l.url));
    for (const a of links) expect(a.getAttribute("target")).toBe("_blank");
    const data = locales[lng].careerCompanions.guides[slug];
    const option = data.gate.options[1];
    fireEvent.click(within(root).getByRole("button", { name: option.label }));
    expect(within(root).getByTestId("companion-gate-result").textContent).toBe(option.result);
    const select = root.querySelector('select[data-nav="arrival-terms"]') as HTMLSelectElement;
    fireEvent.change(select, { target: { value: String(data.terms.length - 1) } });
    expect(root.querySelector("h4[tabindex]")!.textContent).toContain(data.terms[data.terms.length - 1].german);
    fireEvent.click(within(root).getByRole("button", { name: locales[lng].arrivalCompanions.ui.advance }));
    expect(within(root).getAllByText(data.steps[1].title).length).toBeGreaterThan(0);
    expect(container.querySelectorAll("input, textarea").length).toBe(0);
  });
});
