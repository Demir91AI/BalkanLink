/** Shared original August 2025, sections 10–12, pages 17–21; official HH source re-read 2026-11-25.
 * The month grid is transcription, not an entitlement calculator. This checkpoint supports ordinary
 * prospective plans only. Premature/disabled/foreign/adoptive and already-filed/other-parent-later cases
 * remain explicitly blocked until their authoritative special rules and attachments are verified.
 * Maternity allocation is not guessed: plans with maternity benefits remain blocked in this checkpoint.
 * The pure mapper covers every native grid position but public PDF generation remains disabled.
 */
import { isoDateValid, isoToDe, type StrictFill } from "../engine/strict-acroform";
import type { EgChildAnswers, EgError, EgFieldName } from "./elterngeld-shared-2025";
import { otherPart2Required, singleParent, type HouseholdAnswers } from "./elterngeld-shared-2025-parents";
import type { DateRange, IncomeStageAnswers, ReplacementAnswers } from "./elterngeld-shared-2025-income";

export const MONTH_MODES = ["none", "basis", "plus", "bonus"] as const;
export type MonthMode = typeof MONTH_MODES[number];
export interface ParentPlan {
  /** Exactly 32 Lebensmonate; one choice per row. */
  months: MonthMode[];
  /** Explicit confirmation for EVERY selected month, no hours are inferred. */
  max32HoursConfirmed: boolean;
  /** Only with bonus: explicit 24–32 weekly hours confirmation. */
  bonus24to32Confirmed?: boolean;
  parentalLeave: DateRange[]; // zero, one or two original lines
  /** Section 12.d applies even to the minimum-only branch. */
  paidLeave: { kind: "none" } | { kind: "yes"; days: number; period: DateRange; preBirthHours: string };
  /** Sections 12.a–c omitted for minimum-only applicants (printed skip to 12.d). */
  during?: {
    wages: boolean; profits: boolean;
    replacements: ReplacementAnswers;
    foreignChildBenefit: boolean; internationalOrganisationBenefit: boolean;
    vocationalTraining: boolean;
  };
}
export interface PlanStageAnswers { as: ParentPlan; other?: ParentPlan }
export type PlanBlock = "SPECIAL_CHILD_PLAN_UNVERIFIED" | "MATERNITY_MONTH_ALLOCATION_UNVERIFIED" | "PRIOR_OR_SEPARATE_PLAN_UNVERIFIED"
  | "INCOME_ANNEX_REQUIRED" | "FOREIGN_BENEFITS_UNVERIFIED" | "ADOPTION_PLAN_UNVERIFIED";
const dateRangeValid = (r: DateRange, birth: string) => isoDateValid(r.from, "9999-12-31") && isoDateValid(r.to, "9999-12-31") && r.from >= birth && r.from <= r.to;
const namedLinesValid = (a: string[]) => Array.isArray(a) && a.length <= 2 && a.every((s) => typeof s === "string" && Boolean(s.trim()) && !/[\u0000-\u001f\u007f]/.test(s));
const replacementKinds = ["unemployment", "sickness", "private_sickness", "older_elterngeld", "buergergeld"];

function validateParentPlan(a: ParentPlan, p: string, minimum: boolean, birth: string, errors: EgError[], blocks: Set<PlanBlock>) {
  const err = (field: string, code: string) => errors.push({ field: `${p}.${field}`, code });
  if (!Array.isArray(a.months) || a.months.length !== 32 || a.months.some((m) => !MONTH_MODES.includes(m))) { err("months", "exactly_32_known_choices"); return; }
  if (a.months.filter((m) => m === "basis" || m === "plus").length < 2) err("months", "minimum_two_basis_or_plus_months");
  if (a.months.slice(14).includes("basis")) err("months", "basis_first14_only");
  if (a.max32HoursConfirmed !== true) err("max32HoursConfirmed", "required");
  const bonus = a.months.flatMap((m, i) => m === "bonus" ? [i] : []);
  if (bonus.length) {
    if (bonus.length < 2 || bonus.length > 4 || bonus.some((m, i) => i > 0 && m !== bonus[i - 1] + 1)) err("months", "bonus_2_to4_consecutive");
    if (a.bonus24to32Confirmed !== true) err("bonus24to32Confirmed", "required");
  } else if (a.bonus24to32Confirmed !== undefined) err("bonus24to32Confirmed", "not_applicable");
  if (!Array.isArray(a.parentalLeave) || a.parentalLeave.length > 2 || a.parentalLeave.some((r) => !dateRangeValid(r, birth))) err("parentalLeave", "max_two_date_ranges");
  else {
    const sorted = a.parentalLeave.slice().sort((x, y) => x.from.localeCompare(y.from));
    if (sorted.length === 2 && sorted[0].to >= sorted[1].from) err("parentalLeave", "overlap");
  }
  if (a.paidLeave.kind === "yes") {
    if (!Number.isInteger(a.paidLeave.days) || a.paidLeave.days < 1 || a.paidLeave.days > 999) err("paidLeave.days", "positive_integer");
    if (!dateRangeValid(a.paidLeave.period, birth)) err("paidLeave.period", "date_range");
    if (!/^\d{1,2}(,\d{1,2})?$/.test(a.paidLeave.preBirthHours) || Number(a.paidLeave.preBirthHours.replace(",", ".")) <= 0) err("paidLeave.preBirthHours", "hours");
  } else if (a.paidLeave.kind !== "none" || Object.keys(a.paidLeave).length !== 1) err("paidLeave", "hidden_or_invalid_answers");
  if (minimum) {
    if (a.during) err("during", "minimum_skips_to12d");
    return;
  }
  if (!a.during) { err("during", "required"); return; }
  const d = a.during;
  if (typeof d.wages !== "boolean" || typeof d.profits !== "boolean") err("during.income", "required");
  if (d.wages || d.profits) blocks.add("INCOME_ANNEX_REQUIRED");
  const r = d.replacements;
  if (!Array.isArray(r.kinds) || new Set(r.kinds).size !== r.kinds.length || r.kinds.some((k) => !replacementKinds.includes(k))) err("during.replacements.kinds", "options");
  if (!namedLinesValid(r.pensions) || !namedLinesValid(r.otherBenefits)) err("during.replacements", "max_two_named_lines");
  if (typeof d.foreignChildBenefit !== "boolean" || typeof d.internationalOrganisationBenefit !== "boolean" || typeof d.vocationalTraining !== "boolean") err("during", "required");
  if (d.foreignChildBenefit || d.internationalOrganisationBenefit) blocks.add("FOREIGN_BENEFITS_UNVERIFIED");
}

export function validatePlanStage(a: PlanStageAnswers, income: IncomeStageAnswers, h: HouseholdAnswers, child: EgChildAnswers): { errors: EgError[]; blocks: PlanBlock[] } {
  const errors: EgError[] = [], blocks = new Set<PlanBlock>();
  if (child.fruehgeboren || child.anzahl > 1 || child.behinderung || h.weitereKinder.some((s) => s.behinderung20)) blocks.add("SPECIAL_CHILD_PLAN_UNVERIFIED");
  if (h.as.beziehung !== "leiblich" || (otherPart2Required(h) && h.other?.beziehung !== "leiblich")) blocks.add("ADOPTION_PLAN_UNVERIFIED");
  if (income.biologicalMother.kind !== "none") blocks.add("MATERNITY_MONTH_ALLOCATION_UNVERIFIED");
  if (["ich_spaeter", "ich_bereits"].includes(h.antragstellende)) blocks.add("PRIOR_OR_SEPARATE_PLAN_UNVERIFIED");
  validateParentPlan(a.as, "as", income.as.minimum, child.geburtsdatum, errors, blocks);
  if (otherPart2Required(h)) {
    if (!a.other || !income.other) errors.push({ field: "other", code: "required" });
    else validateParentPlan(a.other, "other", income.other.minimum, child.geburtsdatum, errors, blocks);
  } else if (a.other) errors.push({ field: "other", code: "not_applicable" });
  if (errors.some((e) => e.code === "exactly_32_known_choices")) return { errors, blocks: [...blocks] };
  const other = a.other?.months ?? Array<MonthMode>(32).fill("none");
  // Ordinary printed budget; no eligibility, income reduction or exceptional rights are inferred.
  const units = [...a.as.months, ...other].reduce((sum, m) => sum + (m === "basis" ? 2 : m === "plus" ? 1 : 0), 0);
  const budget = otherPart2Required(h) || singleParent(h) ? 28 : 24;
  if (units > budget) errors.push({ field: "months", code: "ordinary_basis_plus_budget" });
  if (!singleParent(h)) for (const [p, months] of [["as", a.as.months], ["other", other]] as const) {
    if (months.reduce((sum, m) => sum + (m === "basis" ? 2 : m === "plus" ? 1 : 0), 0) > 24) errors.push({ field: `${p}.months`, code: "ordinary_parent_max12_basis_equivalent" });
  }
  const concurrent = a.as.months.flatMap((m, i) => m === "basis" && other[i] === "basis" ? [i] : []);
  if (concurrent.length > 1 || concurrent.some((m) => m >= 12)) errors.push({ field: "months", code: "ordinary_concurrent_basis_one_first12" });
  if (!singleParent(h) && a.as.months.some((m, i) => (m === "bonus") !== (other[i] === "bonus"))) errors.push({ field: "months", code: "bonus_both_same_months" });
  const last = Math.max(...a.as.months.flatMap((m, i) => m !== "none" ? [i] : []), ...other.flatMap((m, i) => m !== "none" ? [i] : []));
  for (let i = 14; i <= last; i++) {
    if (!["plus", "bonus"].includes(a.as.months[i]) && !["plus", "bonus"].includes(other[i])) errors.push({ field: `months.${i + 1}`, code: "no_gap_from15" });
  }
  return { errors, blocks: [...blocks] };
}

type F = StrictFill<EgFieldName>;
const C = (name: string): F => ({ name: name as EgFieldName, type: "check" });
const T = (name: string, value: string): F => ({ name: name as EgFieldName, type: "text", value });
const modeNames = { basis: "Basiselterngeld", plus: "Elterngeld Plus", bonus: "P-Bonus" };
const benefitNames = { unemployment: "ALG", sickness: "Krankengeld", private_sickness: "Krankentagegeld", older_elterngeld: "Elterngelt älteres Kind", buergergeld: "Bürgergeld" };
function parentPlanFills(a: ParentPlan, p: "AS" | "2E", minimum: boolean): F[] {
  const f: F[] = [];
  a.months.forEach((m, i) => { if (m !== "none") f.push(C(`10 ${modeNames[m]} ${p} Monat ${i + 1}`)); });
  a.parentalLeave.forEach((r, i) => f.push(T(`11 Anfang Elternzeit${i + 1} Jahr ${p}`, isoToDe(r.from)), T(`11 Ende Elternzeit${i + 1} Jahr ${p}`, isoToDe(r.to))));
  const offset = p === "AS" ? 0 : 2;
  if (!minimum && a.during) {
    const d = a.during, n = p === "AS" ? 0 : 3;
    if (d.wages) f.push(C(`12a Einkünfte ${n + 1}`));
    if (d.profits) f.push(C(`12a Einkünfte ${n + 2}`));
    if (!d.wages && !d.profits) f.push(C(`12a Einkünfte ${n + 3}`));
    f.push(...d.replacements.kinds.map((k) => C(`12b ${benefitNames[k]} ${p}`)));
    if (d.replacements.pensions.length) f.push(C(`12b Rente ${p}`), ...d.replacements.pensions.map((v, i) => T(`12b Rentenart${i + 1} ${p}`, v.trim())));
    if (d.replacements.otherBenefits.length) f.push(C(`12b Ersatzleistungen ${p}`), ...d.replacements.otherBenefits.map((v, i) => T(`12b Leistungsart${i + 1} ${p}`, v.trim())));
    if (d.foreignChildBenefit) f.push(C(`12b Leistungen Ausland ${p}`));
    if (d.internationalOrganisationBenefit) f.push(C(`12b Leistungen zwStaatl Org ${p}`));
    f.push(C(`12c Ausbildung Umschulung ${(d.vocationalTraining ? 1 : 2) + offset}`));
  }
  // Printed order is NEIN, JA — native dates/hours retain misleading 12c names in section 12.d.
  f.push(C(`12d bez Urlaub ${(a.paidLeave.kind === "none" ? 1 : 2) + offset}`));
  if (a.paidLeave.kind === "yes") f.push(T(`12c Anzahl Urlaubstage ${p}`, String(a.paidLeave.days)),
    T(`12c Urlaub von Jahr ${p}`, isoToDe(a.paidLeave.period.from)), T(`12c Urlaub bis Jahr ${p}`, isoToDe(a.paidLeave.period.to)), T(`12c Arbeitszeit ${p}`, a.paidLeave.preBirthHours));
  return f;
}
/** Pure transcription; validatePlanStage errors AND blocks must be checked by the caller. */
export function planStageFills(a: PlanStageAnswers, income: IncomeStageAnswers, h: HouseholdAnswers): F[] {
  return [...parentPlanFills(a.as, "AS", income.as.minimum), ...(otherPart2Required(h) && a.other && income.other ? parentPlanFills(a.other, "2E", income.other.minimum) : [])];
}