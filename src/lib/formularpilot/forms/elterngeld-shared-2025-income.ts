/**
 * Shared Elterngeld August 2025, checkpoint 3: printed sections 5–9 (pages 9–16).
 * Source: EG_LAND_SOURCES.HH, SHA-256 EG_SHA256, re-read 2026-11-25.
 * This is answer transcription, NOT an income/entitlement/assessment-period calculator.
 * Period changes and the <35 EUR request must be explicitly confirmed from the printed
 * conditions; tax-free/negative/foreign income is never inferred from nationality or amounts.
 * Page 13's misleading native names "6c Antrag Ausklammern 2E1..6" are the changed-period
 * profit question: first three AS (left column), last three 2E (right column).
 * Section 9 always concerns the biological mother, even if she is not applying.
 * Only validated test fills are exposed; the public complete-application gate stays closed.
 */
import { blank, isoDateValid, isoToDe, type StrictFill } from "../engine/strict-acroform";
import type { EgFieldName, EgError } from "./elterngeld-shared-2025";
import { otherPart2Required, type HouseholdAnswers } from "./elterngeld-shared-2025-parents";

export const PROFIT_ANSWERS = ["none", "tax_free", "taxable"] as const;
export type ProfitAnswer = typeof PROFIT_ANSWERS[number];
export const PERIOD_REASONS = ["maternity_this", "maternity_older", "elterngeld_older_under14", "elterngeld_older_premature", "pregnancy_illness", "military_civil"] as const;
export type PeriodReason = typeof PERIOD_REASONS[number];
export const WAGE_KINDS = ["mini", "midi", "training", "voluntary"] as const;
export const PROFIT_KINDS = ["business", "self_employed", "agriculture"] as const;
export const CONTRIBUTIONS = ["church", "health_care", "pension", "unemployment"] as const;
export const REPLACEMENTS = ["unemployment", "sickness", "private_sickness", "older_elterngeld", "buergergeld"] as const;

export interface MonthRange { from: string; to: string } // YYYY-MM, printed Monat/Jahr
export interface DateRange { from: string; to: string } // YYYY-MM-DD, future end dates allowed
export interface SelfPeriod {
  /** The user confirms BOTH printed calendar-year averages are strictly <35 EUR/month. */
  under35Request: boolean;
  reasons: PeriodReason[];
  /** Printed Corona clause has no own checkbox; only the request and year are filled. */
  coronaReducedIncome?: boolean;
  shiftToYear?: number;
}
export interface EmployeePeriod {
  reasons: PeriodReason[];
  /** Optional request to INCLUDE excluded months, at most two printed ranges. */
  includeMonths: MonthRange[];
  /** Optional Corona exclusion, at most two printed ranges, March 2020–September 2022. */
  coronaExclude: MonthRange[];
  /** User answers the printed "Falls sich ... nicht geändert hat" branch; never calculated. */
  changed: boolean;
  changedProfits?: ProfitAnswer;
}
export interface BeforeBirthEarnings {
  wages: boolean;
  wageKinds: (typeof WAGE_KINDS[number])[];
  profitKinds: (typeof PROFIT_KINDS[number])[];
  /** Empty list means "nichts davon", only when there ARE profits (section 7.b). */
  contributions?: (typeof CONTRIBUTIONS[number])[];
}
export interface ReplacementAnswers {
  kinds: (typeof REPLACEMENTS[number])[];
  pensions: string[]; // at most two lines
  otherBenefits: string[]; // at most two lines
}
export type ParentIncome =
  | { minimum: true; confirmsMax32Hours: true }
  | { minimum: false; initialProfits: ProfitAnswer; self?: SelfPeriod; employee?: EmployeePeriod;
      earnings: BeforeBirthEarnings; replacements: ReplacementAnswers };
export const MATERNITY_KINDS = ["gkv", "employer", "civil_service", "private_sickness", "foreign"] as const;
export type MaternityKind = typeof MATERNITY_KINDS[number];
export type MaternityAnswers =
  | { kind: "none" }
  | { kind: "benefits"; periods: Partial<Record<MaternityKind, DateRange>>; gkvDataConsent: boolean };
export interface IncomeStageAnswers { as: ParentIncome; other?: ParentIncome; biologicalMother: MaternityAnswers }

const reasonNames: Record<PeriodReason, string> = {
  maternity_this: "Mutterschutz dieses Kind", maternity_older: "Mutterschutz älteres Kind",
  elterngeld_older_under14: "Elterngeld älteres Kind", elterngeld_older_premature: "Elterngeld älteres K Frühgeburt",
  pregnancy_illness: "Erkrankung", military_civil: "Wehr- o Zivildienst",
};
const wageNames = { mini: "Mini-Job", midi: "Midi-Job", training: "Berufsausbildung", voluntary: "Freiwilligendienst" };
const profitNames = { business: "Gewerbebetrieb", self_employed: "selbstständige Arbeit", agriculture: "Land-Forstwirtschaft" };
const contributionNames = { church: "Kirchensteuer", health_care: "KV PV", pension: "RV Versorgungswerk", unemployment: "ALV" };
const replacementNames = { unemployment: "Arbeitslosengeld", sickness: "Krankengeld", private_sickness: "Krankentagegeld", older_elterngeld: "Elterngeld f älteres Kind", buergergeld: "Bürgergeld" };
const maternityNames: Record<MaternityKind, [EgFieldName, string]> = {
  gkv: ["9 Anspruch Mutterschaftsgeld", "Mutterschaftsgeld KV"], employer: ["9 Anspruch Zuschuss AG", "Zuschuss AG"],
  civil_service: ["9 Beamtin-Soldatin", "Beamtin-Soldatin"], private_sickness: ["9 Anspruch Krankentagegeld", "Krankentagegeld"],
  foreign: ["9 Anspruch Ausland", "Ausland"],
};

const member = (value: unknown, allowed: readonly string[]) => typeof value === "string" && allowed.includes(value);
function listValid(value: unknown, allowed: readonly string[]): boolean {
  return Array.isArray(value) && value.every((v) => member(v, allowed)) && new Set(value).size === value.length;
}
function monthValid(v: string, birth: string): boolean {
  return /^\d{4}-(0[1-9]|1[0-2])$/.test(v) && v >= "1900-01" && v < birth.slice(0, 7);
}
function rangesValid(ranges: MonthRange[], birth: string, corona: boolean): boolean {
  if (!Array.isArray(ranges) || ranges.length > 2) return false;
  const ordered = ranges.slice().sort((a, b) => a.from.localeCompare(b.from));
  return ordered.every((r, i) => monthValid(r.from, birth) && monthValid(r.to, birth) && r.from <= r.to
    && (!corona || (r.from >= "2020-03" && r.to <= "2022-09"))
    && (i === 0 || ordered[i - 1].to < r.from));
}
function linesValid(lines: string[]): boolean {
  return Array.isArray(lines) && lines.length <= 2 && lines.every((v) => typeof v === "string" && !blank(v) && !/[\u0000-\u001f\u007f]/.test(v));
}

function validateParent(a: ParentIncome, p: string, birth: string, errors: EgError[]) {
  const err = (field: string, code: string) => errors.push({ field: `${p}.${field}`, code });
  if (a.minimum === true) {
    if (a.confirmsMax32Hours !== true) err("confirmsMax32Hours", "required");
    // Reject stale hidden answers, do not silently discard them after a branch change.
    if (Object.keys(a).some((k) => !["minimum", "confirmsMax32Hours"].includes(k))) err("minimum", "hidden_answers");
    return;
  }
  if (a.minimum !== false) { err("minimum", "required"); return; }
  if (!member(a.initialProfits, PROFIT_ANSWERS)) err("initialProfits", "required");
  const employeeNeeded = a.initialProfits !== "taxable" || a.self?.under35Request === true;
  const backToSelf = employeeNeeded && a.employee?.changed && a.employee.changedProfits === "taxable";
  const selfNeeded = a.initialProfits === "taxable" || backToSelf;
  if (selfNeeded && !a.self) err("self", "required");
  if (!selfNeeded && a.self) err("self", "not_applicable");
  if (a.self) {
    if (typeof a.self.under35Request !== "boolean") err("self.under35Request", "required");
    if (!listValid(a.self.reasons, PERIOD_REASONS)) err("self.reasons", "options");
    if (a.self.coronaReducedIncome !== undefined && typeof a.self.coronaReducedIncome !== "boolean") err("self.coronaReducedIncome", "options");
    if (a.self.under35Request && (a.self.reasons.length || a.self.shiftToYear !== undefined || a.self.coronaReducedIncome)) err("self", "under35_skips_self_period");
    // The printed return to 6.b followed by another <35 request creates a cycle.
    // No automatic resolution is offered until the authority confirms this special case.
    if (backToSelf && a.self.under35Request) err("self", "changed_period_under35_unresolved");
    if (a.self.shiftToYear !== undefined) {
      if (!Number.isInteger(a.self.shiftToYear) || a.self.shiftToYear < 1900 || a.self.shiftToYear >= Number(birth.slice(0, 4)) - 1) err("self.shiftToYear", "earlier_calendar_year");
      if (!a.self.reasons.length && !a.self.coronaReducedIncome) err("self.shiftToYear", "reason_required");
    }
    if (a.self.coronaReducedIncome && a.self.shiftToYear === undefined) err("self.shiftToYear", "required");
  }
  if (employeeNeeded && !a.employee) err("employee", "required");
  if (!employeeNeeded && a.employee) err("employee", "not_applicable");
  if (a.employee) {
    const x = a.employee;
    if (!listValid(x.reasons, PERIOD_REASONS)) err("employee.reasons", "options");
    if (!rangesValid(x.includeMonths, birth, false)) err("employee.includeMonths", "month_ranges");
    if (!rangesValid(x.coronaExclude, birth, true)) err("employee.coronaExclude", "corona_month_ranges");
    if (x.includeMonths.length && !x.reasons.length) err("employee.includeMonths", "reason_required");
    if (typeof x.changed !== "boolean") err("employee.changed", "required");
    if (x.changed && !x.reasons.length && !x.coronaExclude.length) err("employee.changed", "no_period_change");
    if (x.changed && !member(x.changedProfits, PROFIT_ANSWERS)) err("employee.changedProfits", "required");
    if (!x.changed && x.changedProfits !== undefined) err("employee.changedProfits", "not_applicable");
    if (x.includeMonths.some((r) => x.coronaExclude.some((c) => r.from <= c.to && c.from <= r.to))) err("employee", "include_exclude_overlap");
  }
  const e = a.earnings;
  if (typeof e.wages !== "boolean") err("earnings.wages", "required");
  if (!listValid(e.wageKinds, WAGE_KINDS) || (!e.wages && e.wageKinds.length)) err("earnings.wageKinds", "options");
  if (!listValid(e.profitKinds, PROFIT_KINDS)) err("earnings.profitKinds", "options");
  if (e.profitKinds.length) {
    if (!listValid(e.contributions, CONTRIBUTIONS)) err("earnings.contributions", "required");
  } else if (e.contributions !== undefined) err("earnings.contributions", "not_applicable");
  if (!listValid(a.replacements.kinds, REPLACEMENTS)) err("replacements.kinds", "options");
  if (!linesValid(a.replacements.pensions)) err("replacements.pensions", "max_two_named_lines");
  if (!linesValid(a.replacements.otherBenefits)) err("replacements.otherBenefits", "max_two_named_lines");
}

export function validateIncomeStage(a: IncomeStageAnswers, h: HouseholdAnswers, birth: string): EgError[] {
  const errors: EgError[] = [];
  validateParent(a.as, "as", birth, errors);
  if (otherPart2Required(h)) {
    if (!a.other) errors.push({ field: "other", code: "required" });
    else validateParent(a.other, "other", birth, errors);
  } else if (a.other) errors.push({ field: "other", code: "not_applicable" });
  const m = a.biologicalMother;
  if (m.kind === "none") {
    if (Object.keys(m).length !== 1) errors.push({ field: "biologicalMother", code: "hidden_answers" });
  } else if (m.kind === "benefits") {
    const keys = Object.keys(m.periods);
    if (!keys.length || keys.some((k) => !member(k, MATERNITY_KINDS))) errors.push({ field: "biologicalMother.periods", code: "options" });
    for (const k of MATERNITY_KINDS) {
      const r = m.periods[k];
      // Future end of maternity protection is valid; do not use today's date as a ceiling.
      if (r && (!isoDateValid(r.from, "9999-12-31") || !isoDateValid(r.to, "9999-12-31") || r.from > r.to)) errors.push({ field: `biologicalMother.${k}`, code: "date_range" });
    }
    if (typeof m.gkvDataConsent !== "boolean" || (m.gkvDataConsent && !m.periods.gkv)) errors.push({ field: "biologicalMother.gkvDataConsent", code: "gkv_only_explicit_consent" });
  } else errors.push({ field: "biologicalMother", code: "required" });
  return errors;
}

type F = StrictFill<EgFieldName>;
const check = (name: string): F => ({ name: name as EgFieldName, type: "check" });
const text = (name: string, value: string): F => ({ name: name as EgFieldName, type: "text", value });
const monthDE = (iso: string) => `${iso.slice(5, 7)}.${iso.slice(0, 4)}`;
function rangeFills(p: "AS" | "2E", ranges: MonthRange[], prefix: string): F[] {
  return ranges.flatMap((r, i) => [text(`${prefix}${i + 1} von Jahr ${p}`, monthDE(r.from)), text(`${prefix}${i + 1} bis Jahr ${p}`, monthDE(r.to))]);
}
function parentIncomeFills(a: ParentIncome, p: "AS" | "2E"): F[] {
  if (a.minimum === true) return [check(`5 Mindestbetrag ${p}`)];
  const f: F[] = [check(`6a Ihre ${PROFIT_ANSWERS.indexOf(a.initialProfits) + (p === "AS" ? 1 : 4)}`)];
  if (a.self) {
    if (a.self.under35Request) f.push(check(`6b Gewinneinkünfte unter 35 Euro ${p}`));
    else {
      f.push(...a.self.reasons.map((r) => check(`6b ${reasonNames[r]} ${p}`)));
      if (a.self.shiftToYear !== undefined) f.push(check(`6b Antrag Verschiebung B-Zeitraum ${p}`), text(`6b B-Zeitraum verschieben auf ${p}`, String(a.self.shiftToYear)));
    }
  }
  if (a.employee) {
    const x = a.employee;
    f.push(...x.reasons.map((r) => check(`6c ${reasonNames[r]} ${p}`)));
    if (x.includeMonths.length) f.push(check(`6c Antrag Berücksichtigung ${p}`), ...rangeFills(p, x.includeMonths, "6c Berücksichtigung"));
    if (x.coronaExclude.length) f.push(check(`6c Antrag Ausklammern ${p}`), ...rangeFills(p, x.coronaExclude, "6c Ausklammern"));
    if (x.changed && x.changedProfits) f.push(check(`6c Antrag Ausklammern 2E${PROFIT_ANSWERS.indexOf(x.changedProfits) + (p === "AS" ? 1 : 4)}`));
  }
  if (a.earnings.wages) f.push(check(`7a Einkünfte nicht-selbständig ${p}`), ...a.earnings.wageKinds.map((k) => check(`7a ${wageNames[k]} ${p}`)));
  if (a.earnings.profitKinds.length) {
    f.push(check(`7a Gewinneinkünfte ${p}`), ...a.earnings.profitKinds.map((k) => check(`7a ${profitNames[k]} ${p}`)));
    const c = a.earnings.contributions ?? [];
    if (!c.length) f.push(check(`7b keine Pflichtbeiträge ${p}`));
    else f.push(...c.map((k) => check(`7b ${k === "church" && p === "AS" ? " Kirchensteuer" : contributionNames[k]} ${p}`)));
  }
  f.push(...a.replacements.kinds.map((k) => check(`8 ${replacementNames[k]} ${p}`)));
  if (a.replacements.pensions.length) f.push(check(`8 Rente ${p}`), ...a.replacements.pensions.map((v, i) => text(`8 Rentenart${i + 1} ${p}`, v.trim())));
  if (a.replacements.otherBenefits.length) f.push(check(`8 Eink-Ersatzleistungen ${p}`), ...a.replacements.otherBenefits.map((v, i) => text(`8 ArtErsatzleistung${i + 1} ${p}`, v.trim())));
  return f;
}

/** Pure mapping; callers MUST validateIncomeStage before invoking the strict engine. */
export function incomeStageFills(a: IncomeStageAnswers, h: HouseholdAnswers): F[] {
  const f = parentIncomeFills(a.as, "AS");
  if (otherPart2Required(h) && a.other) f.push(...parentIncomeFills(a.other, "2E"));
  const m = a.biologicalMother;
  if (m.kind === "none") f.push(check("9 kein Anspruch"));
  else for (const k of MATERNITY_KINDS) {
    const r = m.periods[k];
    if (r) {
      const [flag, name] = maternityNames[k];
      f.push(check(flag), text(`9 ${name} von Jahr`, isoToDe(r.from)), text(`9 ${name} bis Jahr`, isoToDe(r.to)));
    }
  }
  if (m.kind === "benefits" && m.gkvDataConsent) f.push(check("9 Datenabruf Mutterschaftsgeld"));
  return f;
}