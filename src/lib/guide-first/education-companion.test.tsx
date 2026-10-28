import { describe, it, expect, afterEach } from "vitest";
import { render, cleanup, fireEvent, within, waitFor } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import { readFileSync } from "node:fs";
import EducationCompanion from "@/components/guide-first/EducationCompanion";
import { EDUCATION_LINKS, EDUCATION_SLUGS, isEducationSlug } from "./education-model";
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
  if (v && typeof v === "object") return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, ["id", "german", "reference"].includes(k) ? x : shape(x)]));
  return typeof v;
}
async function mount(lng: Lng, slug: typeof EDUCATION_SLUGS[number]) {
  const instance = i18next.createInstance();
  await instance.init({ lng, resources: { [lng]: { pages: locales[lng] } }, interpolation: { escapeValue: false } });
  return render(<I18nextProvider i18n={instance}><EducationCompanion slug={slug} /></I18nextProvider>);
}

describe("education scope and mapping", () => {
  it("keeps the catalog and excludes the rich Anerkennung feature", () => {
    expect(getAllFormEntries()).toHaveLength(46);
    expect(EDUCATION_SLUGS).toEqual(["bafoeg", "schueler-bafoeg", "integrationskurs"]);
    expect(isEducationSlug("anerkennung-navigator")).toBe(false);
    for (const slug of EDUCATION_SLUGS) expect(getAllFormEntries().some(e => e.slug === slug)).toBe(true);
    const source = readFileSync("src/pages/FormCenter.tsx", "utf8");
    expect(source).toContain("<EducationCompanion slug={slug} />");
    expect(source).toContain('navigate("/anerkennung-navigator"');
  });
  it("preserves draft ids, German choices, references and four-language structure", () => {
    const draft = JSON.parse(readFileSync("docs/education-draft/educationCompanions.bs.draft.json", "utf8"));
    expect(shape(bs.educationCompanions)).toEqual(shape(draft));
    for (const l of [hr, sr, de]) expect(shape(l.educationCompanions)).toEqual(shape(bs.educationCompanions));
  });
  it("retains all 35 groups and 18 procedural steps", () => {
    for (const l of Object.values(locales)) {
      const guides = l.educationCompanions.guides;
      expect([guides.bafoeg.terms.length, guides["schueler-bafoeg"].terms.length, guides.integrationskurs.terms.length]).toEqual([18, 8, 9]);
      expect([guides.bafoeg.steps.length, guides["schueler-bafoeg"].steps.length, guides.integrationskurs.steps.length]).toEqual([7, 5, 6]);
      for (const term of guides.integrationskurs.terms) expect(term).not.toHaveProperty("reference");
      expect(guides.bafoeg.terms.find(t => t.id === "z1")?.reference).toBe("Formblatt 01, Seite 1, Zeile 1–3");
      expect(guides.bafoeg.terms.find(t => t.id === "z85")?.reference).toBe("Formblatt 01, Seite 6, Zeile 85");
    }
  });
  it("uses publisher links without reconstructing PDF URLs", () => {
    for (const links of Object.values(EDUCATION_LINKS)) for (const link of links) {
      expect(new URL(link.url).protocol).toBe("https:");
      expect(new URL(link.url).hostname).toMatch(/^(www\.)?(xn--bafg-7qa\.de|bafoeg-digital\.de|bamf\.de|bamf-navi\.bamf\.de)$/);
      expect(link.url).not.toContain("__blob");
    }
  });
});

describe.each(Object.keys(locales) as Lng[])("education UI (%s)", lng => {
  it.each(EDUCATION_SLUGS)("%s: links, each gate and term, reviewed-next and completion, memory only", async slug => {
    const view = await mount(lng, slug);
    const root = view.getByTestId("arrival-companion");
    const data = locales[lng].educationCompanions.guides[slug];
    const ui = locales[lng].arrivalCompanions.ui;
    expect([...root.querySelectorAll("header a")].map(a => a.getAttribute("href"))).toEqual(EDUCATION_LINKS[slug].map(l => l.url));
    for (const link of root.querySelectorAll("header a")) {
      expect(link.getAttribute("target")).toBe("_blank");
      expect(link.getAttribute("rel")).toContain("noopener");
    }
    for (const option of data.gate.options) {
      fireEvent.click(within(root).getByRole("button", { name: option.label }));
      expect(within(root).getByTestId("companion-gate-result").textContent).toBe(option.result);
    }
    const select = within(root).getByRole("combobox");
    expect(within(select).getAllByRole("option")).toHaveLength(data.terms.length);
    for (const [index, term] of data.terms.entries()) {
      fireEvent.change(select, { target: { value: String(index) } });
      expect(root.querySelector("h4[tabindex]")?.textContent).toContain(term.german);
      for (const option of ("options" in term ? term.options : []) ?? []) expect([...root.querySelectorAll("li strong")].some(el => el.textContent === option.german)).toBe(true);
    }
    fireEvent.click(within(root).getByRole("button", { name: ui.online }));
    expect(within(root).getByTestId("arrival-mode-note").textContent).toBe(data.modes.online);
    const wizard = within(root).getByTestId("smartguide-template");
    fireEvent.click(within(wizard).getByRole("button", { name: ui.advance }));
    expect(within(wizard).getByRole("progressbar").getAttribute("aria-valuenow")).toBe("2");
    await waitFor(() => expect(document.activeElement?.textContent).toBe(data.steps[1].title));
    expect(within(wizard).getByTestId("guide-reviewed-count").textContent).toContain("1");
    for (let i = 1; i < data.steps.length - 1; i++) fireEvent.click(within(wizard).getByRole("button", { name: ui.advance }));
    fireEvent.click(within(wizard).getByRole("button", { name: ui.finish }));
    expect(within(wizard).getByTestId("guide-completion").textContent).toContain(ui.completionBody);
    fireEvent.click(within(wizard).getByRole("button", { name: ui.reopen }));
    expect(within(wizard).queryByTestId("guide-completion")).toBeNull();
    fireEvent.click(within(wizard).getByRole("button", { name: ui.unmark }));
    expect(view.container.querySelectorAll("input, textarea, [data-workflow] details")).toHaveLength(0);
    view.unmount();
    const fresh = await mount(lng, slug);
    expect(fresh.getByTestId("companion-gate-result").textContent).not.toBe(data.gate.options[3].result);
    expect(fresh.getByRole("progressbar").getAttribute("aria-valuenow")).toBe("1");
  });
});