import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import { readFileSync } from "node:fs";
import type { ArrivalProcedure } from "./arrival-model";
import ProcedureCompanion from "@/components/guide-first/ProcedureCompanion";
import { FINAL_SPECIALIST_SLUGS, VERIFIED_PDFS, isGrundsicherungSlug } from "./grundsicherung-model";
import { getGuideSource } from "./official-sources";
import inventory from "../../../docs/formulari-final-field-inventory.json";
import bs from "@/i18n/locales/bs/pages.json";
import hr from "@/i18n/locales/hr/pages.json";
import sr from "@/i18n/locales/sr/pages.json";
import de from "@/i18n/locales/de/pages.json";
const locales = { bs, hr, sr, de };
const forms = FINAL_SPECIALIST_SLUGS;
afterEach(cleanup);
describe("Final ten verified specialist guides", () => {
 it.each(forms)("pins live source and actual edition for %s",(slug)=>{
  const expected={"nichterreichbarkeit":"05/2026","arbeitsbescheinigung":"08/2023","antragsruecknahme":"07/2026"}[slug] ?? "10/2026";
  expect(VERIFIED_PDFS[slug].edition).toBe(expected);
  expect(VERIFIED_PDFS[slug].sha256Prefix).toMatch(/^[a-f0-9]{16}$/);
  expect(getGuideSource(slug).url).toBe(VERIFIED_PDFS[slug].url);
  expect(getGuideSource(slug).verifiedOn).toBe("28.10.2026");
  expect(isGrundsicherungSlug(slug)).toBe(true);
 });
 it.each([["anlage-hg",24],["anlage-uf",125],["anlage-se",34],["anlage-uh1",35],["anlage-uh2",35],["anlage-uh3",61]] as const)("covers %s numbered fields exactly once",(slug,count)=>{
  expect(inventory[slug].flatMap(t=>t.numbers)).toEqual(Array.from({length:count},(_,i)=>i+1));
 });
 it("keeps MEB medical numbering separate and employer document numbering separate",()=>{
  const m=inventory["anlage-meb"];
  expect(m.filter(t=>!t.id.startsWith("meb-med")).flatMap(t=>t.numbers)).toEqual(Array.from({length:12},(_,i)=>i+1));
  expect(m.filter(t=>t.id.startsWith("meb-med")).flatMap(t=>t.numbers)).toEqual(Array.from({length:21},(_,i)=>i+1));
  const a=inventory.arbeitsbescheinigung;
  expect(a.filter(t=>t.reference.startsWith("Arbeitsbescheinigung SGB III")).flatMap(t=>t.numbers).sort((a,b)=>a-b)).toEqual(Array.from({length:119},(_,i)=>i+1));
  expect(a.filter(t=>t.reference.startsWith("Einkommensbescheinigung SGB II")).flatMap(t=>t.numbers)).toEqual(Array.from({length:38},(_,i)=>i+1));
 });
 it.each(Object.entries(locales))("%s retains exact German labels/references/option parity and all explanations",(_lang,locale)=>{
  for(const slug of forms){
   const terms=(locale.grundsicherungCompanions.guides[slug] as ArrivalProcedure).terms;
   expect(terms.map(t=>t.id)).toEqual(inventory[slug].map(t=>t.id));
   for(const [i,t] of terms.entries()){
    const original=inventory[slug][i];expect(t.german).toBe(original.german);expect(t.reference).toBe(original.reference);
    expect(t.options?.map(o=>o.german) ?? []).toEqual("options" in original?original.options:[]);
    for(const k of ["meaning","instruction","where","example","mistake"] as const)expect(t[k].trim().length).toBeGreaterThan(10);
   }
  }
 });
 it("retains all independently selectable SE declarations and UF accident-type branches",()=>{
  expect(bs.grundsicherungCompanions.guides["anlage-se"].terms.find(t=>t.id==="se-28")?.options).toHaveLength(3);
  const uf=inventory["anlage-uf"].flatMap(t=>t.options);
  expect(uf).toContain("Verkehrsunfall (weiter mit Abschnitt J)");
  expect(uf).toContain("Arbeitsunfall (weiter mit Abschnitt I)");
 });
 it("introduces no answer intake, storage or transmission in the reused companion",()=>{
  const source=readFileSync("src/components/guide-first/ProcedureCompanion.tsx","utf8");
  expect(source).not.toMatch(/localStorage|sessionStorage|fetch\(|supabase|<input|<textarea/);
  expect(isGrundsicherungSlug("grundsicherung")).toBe(false);
 });
 it.each(Object.entries(locales))("%s renders every jump/options, opens originals, advances and completes",async(lng,locale)=>{
  for(const slug of forms){
   const instance=i18next.createInstance();
   await instance.init({lng,resources:{[lng]:{pages:locale}},interpolation:{escapeValue:false}});
   const {container}=render(<I18nextProvider i18n={instance}><ProcedureCompanion slug={slug}/></I18nextProvider>);
   const select=container.querySelector<HTMLSelectElement>("select[data-nav]");if(!select)throw new Error("Missing field jump");
   const data=locale.grundsicherungCompanions.guides[slug] as ArrivalProcedure;
   for(const [index,term] of data.terms.entries()){
    fireEvent.change(select,{target:{value:String(index)}});
    expect(screen.getByTestId("term-reference").textContent).toContain(term.reference);
    expect([...container.querySelectorAll("li > strong")].map(el=>el.textContent)).toEqual(term.options?.map(o=>o.german) ?? []);
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
 }, 30000);
});
