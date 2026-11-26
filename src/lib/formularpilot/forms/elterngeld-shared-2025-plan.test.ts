import { describe, it, expect } from "vitest";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { PDFDocument } from "pdf-lib";
import { validatePlanStage, planStageFills, maternityBasisMonths, type ParentPlan, type PlanStageAnswers, type MonthMode } from "./elterngeld-shared-2025-plan";
import { fillStage4ForTesting, EG_NEVER_FILL, type EgChildAnswers } from "./elterngeld-shared-2025";
import type { HouseholdAnswers } from "./elterngeld-shared-2025-parents";
import type { IncomeStageAnswers } from "./elterngeld-shared-2025-income";

const child: EgChildAnswers = { vorname: "Lana", nachname: "Kovač", geburtsdatum: "2026-09-10", anzahl: 1, fruehgeboren: false, behinderung: false };
const parent = { vorname: "Maja", nachname: "Kovač", geburtsdatum: "1992-03-14", geschlecht: "weiblich" as const, familienstand: "ledig" as const,
  wohnsitzDE: true, seitGeburt: true, adresse: { strasse: "Musterstraße", nr: "12", plz: "20095", ort: "Hamburg" }, steuerId: "12345678901",
  staatsangehoerigkeit: "deutsch" as const, nato: false, diplomat: false, kv: "privat" as const, imHaushalt: true, beziehung: "leiblich" as const };
const single: HouseholdAnswers = { alleinerziehend: { entlastung: true, unmoeglich: false, kindeswohl: false }, as: parent,
  kindAdresse: "wie_as", einkommen: "bis175_fest", antragstellende: "nur_ich", weitereKinderImHaushalt: 0, weitereKinder: [] };
const couple: HouseholdAnswers = { ...single, alleinerziehend: { entlastung: false, unmoeglich: false, kindeswohl: false }, antragstellende: "beide",
  other: { ...parent, vorname: "Damir", nachname: "Novak", geschlecht: "männlich", gleicheAdresse: true } };
const income: IncomeStageAnswers = { as: { minimum: true, confirmsMax32Hours: true }, biologicalMother: { kind: "none" } };
const bothIncome: IncomeStageAnswers = { ...income, other: income.as };
function months(mode: MonthMode, from: number, to: number): MonthMode[] { return Array.from({ length: 32 }, (_, i) => i + 1 >= from && i + 1 <= to ? mode : "none"); }
function plan(selected = months("basis", 1, 12)): ParentPlan { return { months: selected, max32HoursConfirmed: true, parentalLeave: [], paidLeave: { kind: "none" } }; }
const check = (p: ParentPlan, h = single, inc = income) => validatePlanStage({ as: p }, inc, h, child);
const errorCodes = (p: ParentPlan, h = single, inc = income) => check(p, h, inc).errors.map((e) => e.code);
const ordinary = { as: plan() };
const plus = { as: plan(months("plus", 1, 28)) };
const bonus = { as: { ...plan(months("plus", 1, 24)), months: [...Array<MonthMode>(24).fill("plus"), ...Array<MonthMode>(4).fill("bonus"), ...Array<MonthMode>(4).fill("none")], bonus24to32Confirmed: true } };
const duringIncome: IncomeStageAnswers = { as: { minimum: false, initialProfits: "none", employee: { reasons: [], includeMonths: [], coronaExclude: [], changed: false },
  earnings: { wages: false, wageKinds: [], profitKinds: [] }, replacements: { kinds: [], pensions: [], otherBenefits: [] } }, biologicalMother: { kind: "none" } };
const during: NonNullable<ParentPlan["during"]> = { wages: false, profits: false, replacements: { kinds: ["unemployment", "sickness", "private_sickness", "older_elterngeld", "buergergeld"], pensions: ["Erwerbsminderungsrente", "Altersrente"], otherBenefits: ["Kurzarbeitergeld", "Insolvenzgeld"] },
  foreignChildBenefit: false, internationalOrganisationBenefit: false, vocationalTraining: true };
const detailed: PlanStageAnswers = { as: { ...plan(), parentalLeave: [{ from: "2026-09-10", to: "2027-01-09" }, { from: "2027-02-10", to: "2027-05-09" }], during,
  paidLeave: { kind: "yes", days: 10, period: { from: "2026-10-01", to: "2026-10-14" }, preBirthHours: "38,5" } } };

describe("Elterngeld checkpoint 4 — ordinary supported plan rules", () => {
  it("valid single-parent ordinary basis/plus/bonus plans", () => {
    for (const p of [ordinary, plus, bonus]) expect(validatePlanStage(p, income, single, child)).toEqual({ errors: [], blocks: [] });
  });
  it("requires exactly 32 known choices, one enum per month", () => {
    expect(errorCodes(plan(Array(31).fill("none")))).toContain("exactly_32_known_choices");
    expect(errorCodes(plan(Array(32).fill("unknown") as never))).toContain("exactly_32_known_choices");
  });
  it("each applicant needs at least two Basiselterngeld/ElterngeldPlus months, not bonus alone", () => {
    expect(errorCodes(plan(months("basis", 1, 1)))).toContain("minimum_two_basis_or_plus_months");
    expect(errorCodes({ ...plan(months("bonus", 1, 2)), bonus24to32Confirmed: true })).toContain("minimum_two_basis_or_plus_months");
  });
  it("ordinary basis confined to first 14 life months", () => {
    expect(errorCodes(plan(months("basis", 14, 15)))).toContain("basis_first14_only");
  });
  it("ordinary basis/plus budget 14 equivalents for single parent, 12 for one nonsingle applicant", () => {
    expect(errorCodes(plan(months("plus", 1, 29)))).toContain("ordinary_basis_plus_budget");
    const notSingle = { ...single, alleinerziehend: { entlastung: false, unmoeglich: false, kindeswohl: false }, other: couple.other };
    expect(errorCodes(plan(months("plus", 1, 25)), notSingle)).toContain("ordinary_basis_plus_budget");
    expect(errorCodes(plan(months("plus", 1, 24)), notSingle)).not.toContain("ordinary_basis_plus_budget");
  });
  it("both-parent budget is 14 combined, max12 per ordinary parent", () => {
    const p = { as: plan(months("basis", 1, 12)), other: plan(months("basis", 13, 14)) };
    expect(validatePlanStage(p, bothIncome, couple, child)).toEqual({ errors: [], blocks: [] });
    const invalid = validatePlanStage({ as: plan(months("plus", 1, 26)), other: plan(months("plus", 1, 2)) }, bothIncome, couple, child);
    expect(invalid.errors).toContainEqual({ field: "as.months", code: "ordinary_parent_max12_basis_equivalent" });
  });
  it("ordinary simultaneous basis max one month and only within first12", () => {
    const p = { as: plan(months("basis", 1, 2)), other: plan(months("basis", 1, 2)) };
    expect(validatePlanStage(p, bothIncome, couple, child).errors.map((e) => e.code)).toContain("ordinary_concurrent_basis_one_first12");
    expect(validatePlanStage({ as: plan(months("basis", 12, 13)), other: plan(months("basis", 13, 14)) }, bothIncome, couple, child).errors.map((e) => e.code)).toContain("ordinary_concurrent_basis_one_first12");
  });
  it("§4(6) multiples or child disability permit concurrent Basis in months13–14, without increasing budget", () => {
    const p = { as: plan(months("basis", 13, 14)), other: plan(months("basis", 13, 14)) };
    for (const c of [{ ...child, anzahl: 2 }, { ...child, behinderung: true }]) {
      expect(validatePlanStage(p, bothIncome, couple, c)).toEqual({ errors: [], blocks: [] });
      expect(validatePlanStage({ as: plan(months("basis", 1, 12)), other: plan(months("basis", 1, 12)) }, bothIncome, couple, c).errors).toContainEqual({ field: "months", code: "ordinary_basis_plus_budget" });
    }
  });
  it("disabled older sibling does not prove Geschwisterbonus; that exceptional case stays blocked", () => {
    const h = { ...couple, weitereKinderImHaushalt: 1, weitereKinder: [{ vorname: "Ena", nachname: "Kovač", geburtsdatum: "2024-02-02", behinderung20: true, leiblichAS: true, leiblich2E: true }] };
    expect(validatePlanStage({ as: plan(months("basis", 1, 2)), other: plan(months("basis", 1, 2)) }, bothIncome, h, child).blocks).toContain("SPECIAL_CHILD_PLAN_UNVERIFIED");
  });
  it("no gap after month15 until last selected month", () => {
    const m = months("plus", 1, 16); m[14] = "none";
    expect(check(plan(m)).errors).toContainEqual({ field: "months.15", code: "no_gap_from15" });
  });
  it("bonus needs 2–4 consecutive months and explicit24–32h confirmation", () => {
    const m = months("basis", 1, 2); m[2] = "bonus"; m[4] = "bonus";
    expect(errorCodes(plan(m))).toContain("bonus_2_to4_consecutive");
    expect(errorCodes(plan(m))).toContain("required");
    expect(errorCodes({ ...plan(), bonus24to32Confirmed: true })).toContain("not_applicable");
  });
  it("nonsingle bonus must match both parents exactly", () => {
    const m = months("basis", 1, 2); m[2] = "bonus"; m[3] = "bonus";
    expect(validatePlanStage({ as: { ...plan(m), bonus24to32Confirmed: true }, other: plan(months("plus", 3, 4)) }, bothIncome, couple, child).errors.map((e) => e.code)).toContain("bonus_both_same_months");
  });
  it("max32 weekly hours requires explicit confirmation", () => {
    expect(check({ ...plan(), max32HoursConfirmed: false }).errors).toContainEqual({ field: "as.max32HoursConfirmed", code: "required" });
  });
  it("special children and unconfirmed maternity identity stay blocked, not guessed", () => {
    expect(validatePlanStage(ordinary, income, single, { ...child, fruehgeboren: true }).blocks).toContain("SPECIAL_CHILD_PLAN_UNVERIFIED");
    expect(validatePlanStage(ordinary, { ...income, biologicalMother: { kind: "benefits", periods: { employer: { from: child.geburtsdatum, to: "2026-11-09" } }, gkvDataConsent: false } }, single, child).errors).toContainEqual({ field: "biologicalMotherApplicant", code: "explicit_mother_required" });
    expect(check(plan(), { ...single, antragstellende: "ich_bereits" }).blocks).toContain("PRIOR_OR_SEPARATE_PLAN_UNVERIFIED");
  });
  it("Elternzeit supports at most two ordered date ranges, never calendar-month guesses", () => {
    expect(validatePlanStage(detailed, duringIncome, single, child)).toEqual({ errors: [], blocks: [] });
    expect(errorCodes({ ...plan(), parentalLeave: [{ from: "2026-09-10", to: "2026-10-01" }, { from: "2026-10-01", to: "2026-11-01" }] })).toContain("overlap");
    expect(errorCodes({ ...plan(), parentalLeave: [{ from: "2026-09-09", to: "2026-10-01" }] })).toContain("max_two_date_ranges");
  });
  it("minimum-only skips12a–c but still asks paid leave in12d", () => {
    expect(errorCodes({ ...plan(), during })).toContain("minimum_skips_to12d");
    const f = planStageFills(ordinary, income, single);
    expect(f).toContainEqual({ name: "12d bez Urlaub 1", type: "check" });
    expect(f.some((x) => /^12[abc] /.test(x.name))).toBe(false);
  });
  it("wages and profits may coexist; either requires the official income annex", () => {
    const p = { as: { ...plan(), during: { ...during, wages: true, profits: true } } };
    expect(validatePlanStage(p, duringIncome, single, child).blocks).toContain("INCOME_ANNEX_REQUIRED");
    const f = planStageFills(p, duringIncome, single);
    expect(f).toContainEqual({ name: "12a Einkünfte 1", type: "check" });
    expect(f).toContainEqual({ name: "12a Einkünfte 2", type: "check" });
    expect(f.some((x) => x.name === "12a Einkünfte 3")).toBe(false);
  });
  it("foreign and international-organisation benefits remain explicit unsupported cases", () => {
    expect(validatePlanStage({ as: { ...plan(), during: { ...during, foreignChildBenefit: true } } }, duringIncome, single, child).blocks).toContain("FOREIGN_BENEFITS_UNVERIFIED");
  });
  it("paid leave NEIN/JA ordering is exact; details keep native12c names", () => {
    const f = planStageFills(detailed, duringIncome, single);
    expect(f).toContainEqual({ name: "12d bez Urlaub 2", type: "check" });
    expect(f).toContainEqual({ name: "12c Anzahl Urlaubstage AS", type: "text", value: "10" });
    expect(f).toContainEqual({ name: "12c Arbeitszeit AS", type: "text", value: "38,5" });
    expect(f.some((x) => x.name === "12d bez Urlaub 1")).toBe(false);
    expect(errorCodes({ ...plan(), paidLeave: { kind: "yes", days: 0, period: { from: "2026-10-02", to: "2026-10-01" }, preBirthHours: "0" } })).toEqual(expect.arrayContaining(["positive_integer", "date_range", "hours"]));
  });
});

describe("source-checked maternity life-month allocation — §4(4), §3(1) BEEG", () => {
  const withPeriod = (from: string, to: string): IncomeStageAnswers => ({ ...income,
    biologicalMother: { kind: "benefits", periods: { employer: { from, to } }, gkvDataConsent: false } });
  it("one entitlement day counts as Basis; last day belongs to previous life month", () => {
    expect(maternityBasisMonths("2026-09-10", withPeriod("2026-09-10", "2026-11-09"))).toEqual([1, 2]);
    expect(maternityBasisMonths("2026-09-10", withPeriod("2026-09-10", "2026-11-10"))).toEqual([1, 2, 3]);
    expect(maternityBasisMonths("2026-09-10", withPeriod("2026-10-10", "2026-10-10"))).toEqual([2]);
  });
  it("prebirth-only periods use no postbirth month, overlapping types count once", () => {
    expect(maternityBasisMonths("2026-09-10", withPeriod("2026-08-01", "2026-09-09"))).toEqual([]);
    expect(maternityBasisMonths("2026-09-10", { ...income, biologicalMother: { kind: "benefits", periods: { gkv: { from: "2026-09-10", to: "2026-11-09" }, employer: { from: "2026-10-10", to: "2026-11-10" } }, gkvDataConsent: false } })).toEqual([1, 2, 3]);
  });
  it("requires selected Basis, never auto-writes Plus/none or changes the plan", () => {
    const p: PlanStageAnswers = { as: plan(months("plus", 1, 4)), biologicalMotherApplicant: "as" };
    const before = JSON.stringify(p);
    const v = validatePlanStage(p, withPeriod("2026-09-10", "2026-11-09"), single, child);
    expect(v.errors).toContainEqual({ field: "as.months.1", code: "maternity_requires_basis" });
    expect(v.errors).toContainEqual({ field: "as.months.2", code: "maternity_requires_basis" });
    expect(JSON.stringify(p)).toBe(before);
    expect(validatePlanStage({ ...ordinary, biologicalMotherApplicant: "as" }, withPeriod("2026-09-10", "2026-11-09"), single, child)).toEqual({ errors: [], blocks: [] });
  });
  it("uses explicit other-parent column rather than gender; mother must be applying", () => {
    const inc = { ...withPeriod("2026-09-10", "2026-11-09"), other: income.as };
    const p: PlanStageAnswers = { as: plan(months("basis", 3, 4)), other: plan(months("basis", 1, 2)), biologicalMotherApplicant: "other" };
    expect(validatePlanStage(p, inc, couple, child)).toEqual({ errors: [], blocks: [] });
    expect(validatePlanStage({ as: plan(), biologicalMotherApplicant: "other" }, inc, single, child).errors).toContainEqual({ field: "biologicalMotherApplicant", code: "applying_biological_parent_required" });
  });
  it("non-applying mother and month-end birthdays remain explicit unresolved blocks", () => {
    expect(validatePlanStage({ ...ordinary, biologicalMotherApplicant: "not_applying" }, withPeriod("2026-09-10", "2026-11-09"), single, child).blocks).toContain("MATERNITY_MONTH_ALLOCATION_UNVERIFIED");
    expect(maternityBasisMonths("2026-01-31", withPeriod("2026-01-31", "2026-03-01"))).toBe(null);
    expect(validatePlanStage({ ...ordinary, biologicalMotherApplicant: "as" }, withPeriod("2026-09-30", "2026-11-09"), single, { ...child, geburtsdatum: "2026-09-30" }).blocks).toContain("MONTH_END_ALLOCATION_UNVERIFIED");
  });
  it("foreign maternity stays blocked pending annex and equivalence verification", () => {
    const inc: IncomeStageAnswers = { ...income, biologicalMother: { kind: "benefits", periods: { foreign: { from: "2026-09-10", to: "2026-11-09" } }, gkvDataConsent: false } };
    expect(validatePlanStage({ ...ordinary, biologicalMotherApplicant: "as" }, inc, single, child).blocks).toContain("FOREIGN_BENEFITS_UNVERIFIED");
  });
});

const original = process.env.EG_ORIGINAL;
describe.runIf(Boolean(original && existsSync(original)))("authentic original checkpoints1–4 supported cases", () => {
  for (const [label, p, inc] of [["basis", ordinary, income], ["plus", plus, income], ["bonus", bonus, income], ["detailed", detailed, duringIncome]] as const) it(label, async () => {
    if (!original) throw new Error("EG_ORIGINAL required");
    const r = await fillStage4ForTesting(new Uint8Array(readFileSync(original)), child, single, inc, p, { land: "HH", today: "2026-11-25" }, {
      fontBytes: new Uint8Array(readFileSync("src/assets/fonts/liberation-sans/LiberationSans-Regular.ttf")) });
    expect(r.ok ? "ok" : JSON.stringify(r)).toBe("ok"); if (r.ok === false) return;
    const f = (await PDFDocument.load(r.bytes)).getForm();
    expect(f.getFields()).toHaveLength(531);
    for (const x of planStageFills(p, inc, single)) {
      if (x.type === "text") expect(f.getTextField(x.name).getText()).toBe(x.value);
      else if (x.type === "check") expect(f.getCheckBox(x.name).isChecked()).toBe(true);
    }
    for (const name of EG_NEVER_FILL) expect(f.getTextField(name).getText() ?? "").toBe("");
    if (process.env.EG_OUT) writeFileSync(`${process.env.EG_OUT}/stage4-${label}.pdf`, r.bytes);
  });
  it("required income attachment prevents any partial output", async () => {
    if (!original) throw new Error("EG_ORIGINAL required");
    const r = await fillStage4ForTesting(new Uint8Array(readFileSync(original)), child, single, duringIncome,
      { as: { ...plan(), during: { ...during, wages: true } } }, { land: "HH", today: "2026-11-25" }, {
        fontBytes: new Uint8Array(readFileSync("src/assets/fonts/liberation-sans/LiberationSans-Regular.ttf")) });
    expect(r.ok).toBe(false); if (r.ok === false && "blocks" in r) expect(r.blocks).toContain("INCOME_ANNEX_REQUIRED");
    expect("bytes" in r).toBe(false);
  });
});