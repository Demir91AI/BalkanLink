/** Official August2025 section12.a annex. Strict internal checkpoint, not public output.
 * HH/SH/RP have distinct byte hashes despite identical field inventories. BB unverified.
 * Printed 556€ job text is not used as a 2026 classification rule: user supplies the
 * employer-confirmed category; no income/entitlement calculation or silent date selection.
 * Second wage proof wording is corrected in SH/RP, unlike the HH original's profit typo.
 */
import { fillStrictAcroForm, isoDateValid, isoToDe, blank, type StrictFormSpec, type StrictFill, type StrictFillOptions } from "../engine/strict-acroform";
import type { EgLand, EgError } from "./elterngeld-shared-2025";
import type { StaInput } from "./elterngeld-anlage-staatsangehoerigkeit";
import { INCOME_ANNEX_FIELDS } from "./elterngeld-anlage-income.fields";
import { WAGE_KINDS, PROFIT_KINDS, type DateRange } from "./elterngeld-shared-2025-income";

export const INCOME_ANNEX_EDITIONS: Partial<Record<EgLand, { url: string; sha256: string; modified: string }>> = {
  HH: { url: "https://fhh1.hamburg.de/Dibis/form/pdf/Anlage_zum_Elterngeldantrag_Einkuenfte_neben_dem_Elterngeld_Stand_08_25.pdf", sha256: "cd43a9c04ec4d07b907368ce0806131b9f19176510eafc580d43aa5847f44712", modified: "2025-09-09" },
  SH: { url: "https://www.schleswig-holstein.de/DE/landesregierung/ministerien-behoerden/LASG/Aufgaben/KinderUndEltern/Download/4_12a_EinkuenfteNebenDemElterngeld.pdf?__blob=publicationFile&v=5", sha256: "cd07a894e1755b7452365adc60ce7bbe3c38aacbbaaa517873abd06280179aa2", modified: "2025-09-24" },
  RP: { url: "https://mkbwk.rlp.de/fileadmin/07/Dokumente/Themen/Familie/Gute_Zukunft_fuer_alle_Kinder_und_Eltern/Elterngeld/2025_08_4_Weitere_Einkuenfte_12a.pdf", sha256: "993b443842d02d765f60fd8ac6ce8a8653f3b99ba71d2c9cfa3e6dfce15f1706", modified: "2026-02-27" },
};
export type IncomeAnnexField = keyof typeof INCOME_ANNEX_FIELDS;
export interface WageActivity { period: DateRange; hours: string; category?: typeof WAGE_KINDS[number] }
export interface ProfitActivity { period: DateRange; hours: string; monthlyProfit: string }
export interface IncomeAnnexAnswers {
  parent: StaInput["parent"]; child: StaInput["child"];
  wages: WageActivity[];
  profits?: { kinds: (typeof PROFIT_KINDS[number])[]; activities: ProfitActivity[];
    actualExpensesRequested: boolean; allTaxFree: boolean; childcareChildren?: number };
  combinedMax32HoursConfirmed: boolean;
  wageProofsAttached?: boolean; profitProofsAttached?: boolean; workReductionExplanationAttached?: boolean; childcareProofAttached?: boolean;
}
export function incomeAnnexSpec(land: EgLand): StrictFormSpec<IncomeAnnexField> | null {
  const e = INCOME_ANNEX_EDITIONS[land]; if (!e) return null;
  const version = "Anlage Einkünfte neben dem Elterngeld — August2025";
  return { fields: INCOME_ANNEX_FIELDS, neverFill: [], radioOptions: {},
    manifest: { formKey: `elterngeld-income-${land}`, version, sha256: e.sha256, fields: { ...INCOME_ANNEX_FIELDS } },
    editions: [{ version, sha256: e.sha256, status: "current_verified", checkedAt: "2026-11-26", evidence: `${e.url}; 3 pages,35 fields (21 text,14 checkbox), no encryption/XFA; ModDate ${e.modified}; rights unresolved` }] };
}
export function validateIncomeAnnex(a: IncomeAnnexAnswers, today: string): EgError[] {
  const errors: EgError[] = [];
  const err = (field: string, code: string) => errors.push({ field, code });
  for (const [p, person] of [["parent", a.parent], ["child", a.child]] as const) {
    if (blank(person.vorname) || /[\u0000-\u001f\u007f]/.test(person.vorname)) err(`${p}.vorname`, "required_safe_text");
    if (blank(person.nachname) || /[\u0000-\u001f\u007f]/.test(person.nachname)) err(`${p}.nachname`, "required_safe_text");
    if (!isoDateValid(person.geburtsdatum, today)) err(`${p}.geburtsdatum`, "date");
  }
  if (!Array.isArray(a.wages) || a.wages.length > 2) err("wages", "max_two_original_lines");
  if (!a.wages.length && !a.profits) err("income", "section12a_trigger_required");
  if (a.combinedMax32HoursConfirmed !== true) err("combinedMax32HoursConfirmed", "required");
  const activity = (x: WageActivity | ProfitActivity, p: string) => {
    if (!isoDateValid(x.period.from, "9999-12-31") || !isoDateValid(x.period.to, "9999-12-31") || x.period.from < a.child.geburtsdatum || x.period.from > x.period.to) err(`${p}.period`, "date_range");
    if (!/^\d{1,2}(,\d{1,2})?$/.test(x.hours) || Number(x.hours.replace(",", ".")) > 32) err(`${p}.hours`, "zero_to32_hours");
  };
  a.wages.forEach((x, i) => {
    activity(x, `wages.${i}`);
    if (x.category !== undefined && !WAGE_KINDS.includes(x.category)) err(`wages.${i}.category`, "options");
  });
  if (a.wages.length && a.wageProofsAttached !== true) err("wageProofsAttached", "proof_required");
  if (!a.wages.length && a.wageProofsAttached !== undefined) err("wageProofsAttached", "not_applicable");
  if (a.profits) {
    const p = a.profits;
    if (!p.kinds.length || new Set(p.kinds).size !== p.kinds.length || p.kinds.some((k) => !PROFIT_KINDS.includes(k))) err("profits.kinds", "options");
    if (!Array.isArray(p.activities) || p.activities.length < 1 || p.activities.length > 2) err("profits.activities", "one_or_two_original_lines");
    p.activities.forEach((x, i) => { activity(x, `profits.${i}`); if (!/^-?\d{1,6}(,\d{1,2})?$/.test(x.monthlyProfit)) err(`profits.${i}.monthlyProfit`, "signed_eur"); });
    if (typeof p.actualExpensesRequested !== "boolean" || typeof p.allTaxFree !== "boolean") err("profits.choices", "required");
    if (a.profitProofsAttached !== true) err("profitProofsAttached", "proof_required");
    if (a.workReductionExplanationAttached !== true) err("workReductionExplanationAttached", "proof_required");
    if (p.childcareChildren !== undefined) {
      if (!Number.isInteger(p.childcareChildren) || p.childcareChildren < 1 || p.childcareChildren > 99) err("profits.childcareChildren", "positive_integer");
      if (a.childcareProofAttached !== true) err("childcareProofAttached", "proof_required");
    } else if (a.childcareProofAttached !== undefined) err("childcareProofAttached", "not_applicable");
  } else if (a.profitProofsAttached !== undefined || a.workReductionExplanationAttached !== undefined || a.childcareProofAttached !== undefined) err("profits", "hidden_answers");
  return errors;
}
type F = StrictFill<IncomeAnnexField>;
const T = (name: string, value: string): F => ({ name: name as IncomeAnnexField, type: "text", value: value.trim() });
const C = (name: string): F => ({ name: name as IncomeAnnexField, type: "check" });
export function incomeAnnexFills(a: IncomeAnnexAnswers): F[] {
  const f: F[] = [T("AS Vorname", a.parent.vorname), T("AS Nachname", a.parent.nachname), T("AS Geburtsdatum", isoToDe(a.parent.geburtsdatum)),
    T("Vorname Kind", a.child.vorname), T("Nachname Kind", a.child.nachname), T("Geburtsdatum Kind", isoToDe(a.child.geburtsdatum))];
  a.wages.forEach((x, i) => {
    const prefix = i === 0 ? "1 erste Tätigkeit" : "1 weitere Tätigkeit";
    f.push(T(`${prefix} von`, isoToDe(x.period.from)), T(`${prefix} bis`, isoToDe(x.period.to)), T(`${prefix} Stunden`, x.hours));
    if (x.category) f.push(C(`1Kontrollkästchen${WAGE_KINDS.indexOf(x.category) + 1 + 4 * i}`));
  });
  if (a.profits) {
    const p = a.profits;
    const kinds = { self_employed: 1, business: 2, agriculture: 3 };
    f.push(...p.kinds.map((k) => C(`2Kontrollkästchen${kinds[k]}`)));
    p.activities.forEach((x, i) => {
      const prefix = i === 0 ? "2a erste Gewinneinkünfte" : "2a weitere Gewinneinkünfte";
      f.push(T(`${prefix} von`, isoToDe(x.period.from)), T(`${prefix} bis`, isoToDe(x.period.to)), T(`${prefix} Betrag`, x.monthlyProfit), T(`${prefix} Stunden`, x.hours));
    });
    if (p.actualExpensesRequested) f.push(C("2Kontrollkästchen4"));
    f.push(C(`2Kontrollkästchen${p.allTaxFree ? 5 : 6}`));
    if (p.childcareChildren !== undefined) f.push(T("2c Kinder Tagespflege", String(p.childcareChildren)));
  }
  return f;
}
/** Internal checkpoint only; main application still blocks until annex orchestration is complete. */
export async function fillIncomeAnnexForTesting(land: EgLand, bytes: Uint8Array, a: IncomeAnnexAnswers, today: string, opts: StrictFillOptions) {
  const spec = incomeAnnexSpec(land); if (!spec) return { ok: false as const, code: "ANNEX_UNVERIFIED_FOR_LAND" as const };
  const errors = validateIncomeAnnex(a, today); if (errors.length) return { ok: false as const, code: "INVALID_INPUT" as const, errors };
  return fillStrictAcroForm(spec, bytes, incomeAnnexFills(a), opts);
}