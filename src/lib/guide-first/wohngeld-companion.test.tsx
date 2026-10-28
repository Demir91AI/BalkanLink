import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup, fireEvent, within } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import WohngeldCompanion from "@/components/guide-first/WohngeldCompanion";
import { WOHNGELD_LINKS, wohngeldLinks, wohngeldVariant } from "./wohngeld-model";
import bs from "@/i18n/locales/bs/pages.json";
import hr from "@/i18n/locales/hr/pages.json";
import sr from "@/i18n/locales/sr/pages.json";
import de from "@/i18n/locales/de/pages.json";

const locales = { bs, hr, sr, de };
afterEach(cleanup);

function shape(v: unknown): unknown {
  if (Array.isArray(v)) return v.map(shape);
  if (v && typeof v === "object") return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, k === "id" || k === "german" ? x : shape(x)]));
  return typeof v;
}
async function mount(lng: keyof typeof locales) {
  const instance = i18next.createInstance();
  await instance.init({ lng, resources: { [lng]: { pages: locales[lng] } }, interpolation: { escapeValue: false } });
  return render(<I18nextProvider i18n={instance}><WohngeldCompanion /></I18nextProvider>);
}
const ui = (lng: keyof typeof locales) => locales[lng].wohngeldCompanion.ui;
const click = (label: string) => fireEvent.click(screen.getByRole("button", { name: label }));
const hrefs = (c: HTMLElement) => [...c.querySelectorAll('[data-testid="arrival-companion"] header a')].map((a) => a.getAttribute("href"));

describe("Wohngeld decision rules", () => {
  it("routes only Bayern+rent and Bayern+own to Bavarian variants", () => {
    expect(wohngeldVariant({ state: "bayern", housing: "rent", kind: null })).toBe("bayernMiete");
    expect(wohngeldVariant({ state: "bayern", housing: "own", kind: "renewal" })).toBe("bayernLasten");
    for (const state of ["other", "unsure", null] as const) for (const housing of ["rent", "own", "unsure", null] as const) expect(wohngeldVariant({ state, housing, kind: null })).toBe("general");
    expect(wohngeldVariant({ state: "bayern", housing: "unsure", kind: null })).toBe("general");
  });
  it("shows Bavarian original forms only for the matching selection", () => {
    expect(wohngeldLinks("bayernMiete")[0]).toBe("mzForm");
    expect(wohngeldLinks("bayernLasten")[0]).toBe("lzForm");
    expect(wohngeldLinks("general")).toEqual(["bund"]);
    expect(WOHNGELD_LINKS.mzForm).toBe("https://www.stmb.bayern.de/assets/stmi/wohnen/wohngeld/35_mz_antrag_bildschirm.pdf");
    expect(WOHNGELD_LINKS.lzForm).toBe("https://www.stmb.bayern.de/assets/stmi/wohnen/wohngeld/35_lz_antrag_bildschirm.pdf");
  });
});

describe("Wohngeld locales", () => {
  it("has identical structure, ids and German terms in all four locales", () => {
    for (const l of ["hr", "sr", "de"] as const) expect(shape(locales[l].wohngeldCompanion)).toEqual(shape(bs.wohngeldCompanion));
  });
  it("claims no field or page indices in any variant", () => {
    for (const l of Object.values(locales)) for (const g of Object.values(l.wohngeldCompanion.guides)) for (const term of g.terms) expect(term).not.toHaveProperty("reference");
  });
});

describe.each(Object.keys(locales) as (keyof typeof locales)[])("Wohngeld UI (%s)", (lng) => {
  it("defaults to general guide, switches branches, links open in new tabs", async () => {
    const { container } = await mount(lng);
    const companion = () => container.querySelector('[data-testid="arrival-companion"]')!;
    expect(companion().getAttribute("data-variant")).toBe("general");
    expect(hrefs(container)).toEqual([WOHNGELD_LINKS.bund]);
    click(ui(lng).opt.bayern); click(ui(lng).opt.rent);
    expect(companion().getAttribute("data-variant")).toBe("bayernMiete");
    expect(hrefs(container)).toContain(WOHNGELD_LINKS.mzForm);
    expect(hrefs(container)).not.toContain(WOHNGELD_LINKS.lzForm);
    click(ui(lng).opt.own);
    expect(hrefs(container)).toContain(WOHNGELD_LINKS.lzForm);
    expect(hrefs(container)).not.toContain(WOHNGELD_LINKS.mzForm);
    for (const a of container.querySelectorAll('[data-testid="arrival-companion"] header a')) { expect(a.getAttribute("target")).toBe("_blank"); expect(a.getAttribute("rel")).toContain("noopener"); }
    click(ui(lng).opt.other);
    expect(companion().getAttribute("data-variant")).toBe("general");
    expect(hrefs(container).some((h) => h?.includes("stmb.bayern.de") || h?.includes("bayernportal"))).toBe(false);
    expect(screen.getByTestId("wohngeld-result").textContent).toBe(ui(lng).resultOther);
    click(ui(lng).opt.renewal);
    expect(screen.getByTestId("wohngeld-kind").textContent).toBe(ui(lng).kindRenewal);
    expect(container.querySelectorAll("input, textarea").length).toBe(0);
  });
  it("jump dropdown and review-and-next work", async () => {
    const { container } = await mount(lng);
    const select = container.querySelector('select[data-nav="arrival-terms"]') as HTMLSelectElement;
    const terms = locales[lng].wohngeldCompanion.guides.general.terms;
    fireEvent.change(select, { target: { value: String(terms.length - 1) } });
    expect(container.querySelector("h4[tabindex]")!.textContent).toContain(terms[terms.length - 1].german);
    const steps = locales[lng].wohngeldCompanion.guides.general.steps;
    const companion = within(container.querySelector('[data-testid="arrival-companion"]') as HTMLElement);
    fireEvent.click(companion.getByRole("button", { name: locales[lng].arrivalCompanions.ui.advance }));
    expect(companion.getAllByText(steps[1].title).length).toBeGreaterThan(0);
  });
});
