import { describe, it, expect, afterEach } from "vitest";
import { render, cleanup, fireEvent, within, waitFor } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import DocumentsCompanion from "@/components/guide-first/DocumentsCompanion";
import { DOCUMENTS_LINKS, DOCUMENTS_SLUGS, isDocumentsSlug } from "./documents-model";
import { isGrundsicherungSlug } from "./grundsicherung-model";
import { isFormFree, getAllFormEntries, formCatalog } from "@/lib/form-catalog";
import bs from "@/i18n/locales/bs/pages.json";
import hr from "@/i18n/locales/hr/pages.json";
import sr from "@/i18n/locales/sr/pages.json";
import de from "@/i18n/locales/de/pages.json";
const locales = { bs, hr, sr, de };
type Lng = keyof typeof locales;
afterEach(cleanup);
function shape(v: unknown): unknown {
  if (Array.isArray(v)) return v.map(shape);
  if (v && typeof v === "object") return Object.fromEntries(Object.entries(v).map(([k,x]) => [k, ["id","german"].includes(k) ? x : shape(x)]));
  return typeof v;
}
async function mount(lng: Lng, slug: typeof DOCUMENTS_SLUGS[number]) {
  const instance = i18next.createInstance();
  await instance.init({ lng, resources: { [lng]: { pages: locales[lng] } }, interpolation: { escapeValue: false } });
  return render(<I18nextProvider i18n={instance}><DocumentsCompanion slug={slug} /></I18nextProvider>);
}
describe("documents scope", () => {
  it("preserves 46 catalog services and free certificate access", () => {
    expect(getAllFormEntries()).toHaveLength(46);
    expect(formCatalog.find(g=>g.id==='dokumenti')?.items.map(i=>i.slug)).toEqual([...DOCUMENTS_SLUGS]);
    expect(isFormFree('fuehrungszeugnis')).toBe(true);
    expect(isFormFree('grundsicherung')).toBe(false);
    expect(isFormFree('kirchenaustritt')).toBe(false);
  });
  it("keeps SGB XII separate from the SGB II navigator", () => {
    expect(isDocumentsSlug('grundsicherung')).toBe(true);
    expect(isGrundsicherungSlug('grundsicherung')).toBe(false);
    expect(isDocumentsSlug('hauptantrag')).toBe(false);
    expect(isDocumentsSlug('anerkennung-navigator')).toBe(false);
    for (const l of Object.values(locales)) expect(l.documentsCompanions.guides.grundsicherung.title).toContain('SGB XII');
  });
  it("identical four-locale structure, ids and choices; no fake mapping or sensitive selectors", () => {
    for (const l of [hr,sr,de]) expect(shape(l.documentsCompanions)).toEqual(shape(bs.documentsCompanions));
    for (const l of Object.values(locales)) for (const g of Object.values(l.documentsCompanions.guides)) {
      expect(g).not.toHaveProperty('gate');
      for (const t of g.terms) expect(t).not.toHaveProperty('reference');
    }
    expect(Object.values(bs.documentsCompanions.guides).map(g=>g.terms.length)).toEqual([7,5,5]);
    expect(Object.values(bs.documentsCompanions.guides).map(g=>g.steps.length)).toEqual([6,5,5]);
  });
  it("only pinned official sources", () => {
    for(const links of Object.values(DOCUMENTS_LINKS)) for(const l of links) {
      expect(new URL(l.url).protocol).toBe('https:');
      expect(new URL(l.url).hostname).toMatch(/^(www\.)?(bmas\.de|service\.berlin\.de|bundesjustizamt\.de|fuehrungszeugnis\.bund\.de|verwaltung\.bund\.de|bayernportal\.de|justiz\.nrw\.de)$/);
    }
  });
});
describe.each(Object.keys(locales) as Lng[])('documents UI %s', lng => {
  it.each(DOCUMENTS_SLUGS)('%s: every term/option, links, review-next/focus, navigation and no storage', async slug => {
    const view=await mount(lng,slug); const root=view.getByTestId('arrival-companion');
    const data=locales[lng].documentsCompanions.guides[slug]; const ui=locales[lng].arrivalCompanions.ui;
    expect([...root.querySelectorAll('header a')].map(a=>a.getAttribute('href'))).toEqual(DOCUMENTS_LINKS[slug].map(l=>l.url));
    for(const link of root.querySelectorAll('header a')) {expect(link.getAttribute('target')).toBe('_blank');expect(link.getAttribute('rel')).toContain('noopener');}
    const select=within(root).getByRole('combobox');expect(within(select).getAllByRole('option')).toHaveLength(data.terms.length);
    for(const [i,t] of data.terms.entries()) {
      fireEvent.change(select,{target:{value:String(i)}});expect(root.querySelector('h4[tabindex]')?.textContent).toContain(t.german);
      for(const opt of ('options' in t ? t.options : []) ?? []) expect([...root.querySelectorAll('li strong')].some(e=>e.textContent===opt.german)).toBe(true);
    }
    fireEvent.click(within(root).getByRole('button',{name:ui.previousTerm}));
    expect(root.querySelector('h4[tabindex]')?.textContent).toContain(data.terms[data.terms.length-2].german);
    fireEvent.click(within(root).getByRole('button',{name:ui.nextTerm}));
    fireEvent.click(within(root).getByRole('button',{name:ui.online}));expect(view.getByTestId('arrival-mode-note').textContent).toBe(data.modes.online);
    const wizard=view.getByTestId('smartguide-template');
    fireEvent.click(within(wizard).getByRole('button',{name:ui.advance}));
    expect(within(wizard).getByRole('progressbar').getAttribute('aria-valuenow')).toBe('2');
    await waitFor(()=>expect(document.activeElement?.textContent).toBe(data.steps[1].title));
    for(let i=1;i<data.steps.length-1;i++) fireEvent.click(within(wizard).getByRole('button',{name:ui.advance}));
    fireEvent.click(within(wizard).getByRole('button',{name:ui.finish}));expect(view.getByTestId('guide-completion').textContent).toContain(ui.completionBody);
    fireEvent.click(within(wizard).getByRole('button',{name:ui.reopen}));
    fireEvent.click(within(wizard).getByRole('button',{name:ui.unmark}));
    expect(view.container.querySelectorAll('input,textarea,[data-workflow] details')).toHaveLength(0);
    expect(view.queryByTestId('companion-gate')).toBeNull();
    view.unmount();const fresh=await mount(lng,slug);expect(fresh.getByRole('progressbar').getAttribute('aria-valuenow')).toBe('1');
  });
});
