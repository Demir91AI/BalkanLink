import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import { readFileSync } from "node:fs";
import ProcedureCompanion from "@/components/guide-first/ProcedureCompanion";
import { VERIFIED_PDFS, isGrundsicherungSlug } from "./grundsicherung-model";
import { getGuideSource } from "./official-sources";
import inventory from "../../../docs/grundsicherung-phase3c-field-inventory.json";
import bs from "@/i18n/locales/bs/pages.json";
import hr from "@/i18n/locales/hr/pages.json";
import sr from "@/i18n/locales/sr/pages.json";
import de from "@/i18n/locales/de/pages.json";
const locales = { bs, hr, sr, de };
const forms = ["eks", "sv", "bb", "ve"] as const;
afterEach(cleanup);
describe("Phase 3C verified specialist annexes", () => {
 it.each([
  ["eks",9,"c1cac86eb8632d52","anlageeks_ba033540.pdf"],
  ["sv",2,"c24b142bf6086501","anlagesv_ba033005.pdf"],
  ["bb",2,"7f113da78445bc9e","anlagebb_ba032985.pdf"],
  ["ve",2,"acd507c0efa4e563","anlageve_ba033130.pdf"],
 ] as const)("pins %s edition, pages, checksum and live-index original",(c,pages,sha256Prefix,file)=>{
  const slug=`anlage-${c}` as const;
  expect(VERIFIED_PDFS[slug]).toEqual({edition:"10/2026",pages,sha256Prefix,url:`https://www.arbeitsagentur.de/datei/${file}`});
  expect(getGuideSource(slug).url).toBe(VERIFIED_PDFS[slug].url);
  expect(getGuideSource(slug).verifiedOn).toBe("28.10.2026");
  expect(isGrundsicherungSlug(slug)).toBe(true);
 });
 it.each([["eks",60],["sv",16],["bb",18],["ve",17]] as const)("covers every %s numbered field once and in order",(c,count)=>{
  expect(inventory[c].flatMap(t=>t.numbers)).toEqual(Array.from({length:count},(_,i)=>i+1));
 });
 it.each(Object.entries(locales))("%s retains exact German labels/references/option parity and all explanations",(_lang,locale)=>{
  for(const c of forms){
   const terms=locale.grundsicherungCompanions.guides[`anlage-${c}`].terms;
   expect(terms.map(t=>t.id)).toEqual(inventory[c].map(t=>t.id));
   for(const [i,t] of terms.entries()){
    const original=inventory[c][i];expect(t.german).toBe(original.german);expect(t.reference).toBe(original.reference);
    expect("options" in t?t.options.map(o=>o.german):[]).toEqual("options" in original?original.options:[]);
    for(const k of ["meaning","instruction","where","example","mistake"] as const)expect(t[k].trim().length).toBeGreaterThan(10);
   }
  }
 });
 it("preserves every EKS A/B/C row and all BB/VE printed options",()=>{
  const eks=bs.grundsicherungCompanions.guides["anlage-eks"].terms;
  const rows=eks.flatMap(t=>"options" in t?t.options.map(o=>o.german):[]);
  expect(rows.filter(r=>/^A\d/.test(r))).toHaveLength(7);
  expect(rows.filter(r=>/^B\d/.test(r))).toHaveLength(31);
  expect(rows).toContain("B16 Tilgung bestehender betrieblicher Darlehen");
  expect(rows).toContain("B18 an das Finanzamt gezahlte Umsatzsteuer");
  expect(rows).toContain("Abzüglich privat gefahrener Kilometer (0,10 Euro je gefahrenem Kilometer)");
  expect(bs.grundsicherungCompanions.guides["anlage-bb"].terms.find(t=>t.id==="bb-9")?.options).toHaveLength(5);
  expect(bs.grundsicherungCompanions.guides["anlage-ve"].terms.filter(t=>"options" in t)).toHaveLength(5);
 });
 it("introduces no answer intake, storage or transmission in the reused companion",()=>{
  const source=readFileSync("src/components/guide-first/ProcedureCompanion.tsx","utf8");
  expect(source).not.toMatch(/localStorage|sessionStorage|fetch\(|supabase|<input|<textarea/);
  expect(isGrundsicherungSlug("grundsicherung")).toBe(false);
 });
 it.each(Object.entries(locales))("%s renders every jump/options, opens originals, advances and completes",async(lng,locale)=>{
  for(const c of forms){
   const slug=`anlage-${c}` as const;const instance=i18next.createInstance();
   await instance.init({lng,resources:{[lng]:{pages:locale}},interpolation:{escapeValue:false}});
   const {container}=render(<I18nextProvider i18n={instance}><ProcedureCompanion slug={slug}/></I18nextProvider>);
   const select=container.querySelector<HTMLSelectElement>("select[data-nav]");if(!select)throw new Error("Missing field jump");
   const data=locale.grundsicherungCompanions.guides[slug];
   for(const [index,term] of data.terms.entries()){
    fireEvent.change(select,{target:{value:String(index)}});
    expect(screen.getByTestId("term-reference").textContent).toContain(term.reference);
    expect([...container.querySelectorAll("li > strong")].map(el=>el.textContent)).toEqual("options" in term?term.options.map(o=>o.german):[]);
   }
   expect(container.querySelectorAll("input,textarea")).toHaveLength(0);
   const link=container.querySelector<HTMLAnchorElement>(`a[href="${VERIFIED_PDFS[slug].url}"]`);expect(link?.target).toBe("_blank");expect(link?.rel).toContain("noopener");
   const ui=locale.arrivalCompanions.ui;
   fireEvent.click(screen.getByRole("button",{name:ui.advance}));expect(screen.getByRole("progressbar").getAttribute("aria-valuenow")).toBe("2");
   for(let n=1;n<data.steps.length-1;n++)fireEvent.click(screen.getByRole("button",{name:ui.advance}));
   fireEvent.click(screen.getByRole("button",{name:ui.finish}));expect(screen.getByTestId("guide-completion").textContent).toContain(ui.completionBody);
   fireEvent.click(screen.getByRole("button",{name:ui.reopen}));fireEvent.click(screen.getByRole("button",{name:ui.unmark}));
   expect(screen.getByRole("progressbar").getAttribute("aria-valuenow")).toBe("1");cleanup();
  }
 });
});
