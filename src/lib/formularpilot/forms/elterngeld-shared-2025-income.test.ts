import { describe, it, expect } from "vitest";
import { readFileSync, existsSync, writeFileSync } from "node:fs";
import { PDFDocument, PDFTextField, PDFCheckBox, PDFRadioGroup } from "pdf-lib";
import { EG_FIELDS } from "./elterngeld-shared-2025.fields";
import { fillStage3ForTesting, EG_NEVER_FILL, prepareElterngeldShared, type EgChildAnswers } from "./elterngeld-shared-2025";
import { type HouseholdAnswers } from "./elterngeld-shared-2025-parents";
import { validateIncomeStage, incomeStageFills, PERIOD_REASONS, WAGE_KINDS, PROFIT_KINDS, CONTRIBUTIONS, REPLACEMENTS, MATERNITY_KINDS,
  type IncomeStageAnswers, type ParentIncome, type MaternityAnswers } from "./elterngeld-shared-2025-income";

const birth = "2026-11-01", today = "2026-11-25";
const child: EgChildAnswers = { vorname: "Lana", nachname: "Kovač", geburtsdatum: birth, anzahl: 1, fruehgeboren: false, behinderung: false };
const parent = { vorname: "Maja", nachname: "Kovač", geburtsdatum: "1992-03-14", geschlecht: "weiblich" as const,
  familienstand: "ledig" as const, wohnsitzDE: true, seitGeburt: true, adresse: { strasse: "Musterstraße", nr: "12", plz: "20095", ort: "Hamburg" },
  steuerId: "12345678901", staatsangehoerigkeit: "deutsch" as const, nato: false, diplomat: false, kv: "privat" as const, imHaushalt: true, beziehung: "leiblich" as const };
const single: HouseholdAnswers = { alleinerziehend: { entlastung: true, unmoeglich: false, kindeswohl: false }, as: parent,
  kindAdresse: "wie_as", einkommen: "bis175_fest", antragstellende: "nur_ich", weitereKinder: [] };
const couple: HouseholdAnswers = { ...single, alleinerziehend: { entlastung: false, unmoeglich: false, kindeswohl: false }, antragstellende: "beide",
  other: { ...parent, vorname: "Damir", nachname: "Novak", geschlecht: "männlich", gleicheAdresse: true } };
const minimum: ParentIncome = { minimum: true, confirmsMax32Hours: true };
const employee: Extract<ParentIncome, { minimum: false }> = { minimum: false, initialProfits: "none",
  employee: { reasons: [], includeMonths: [], coronaExclude: [], changed: false },
  earnings: { wages: true, wageKinds: ["mini"], profitKinds: [] }, replacements: { kinds: [], pensions: [], otherBenefits: [] } };
const self: Extract<ParentIncome, { minimum: false }> = { minimum: false, initialProfits: "taxable",
  self: { under35Request: false, reasons: [...PERIOD_REASONS], shiftToYear: 2024 },
  earnings: { wages: true, wageKinds: [...WAGE_KINDS], profitKinds: [...PROFIT_KINDS], contributions: [...CONTRIBUTIONS] },
  replacements: { kinds: [...REPLACEMENTS], pensions: ["Erwerbsminderungsrente", "Altersrente"], otherBenefits: ["Kurzarbeitergeld", "Insolvenzgeld"] } };
const changed: Extract<ParentIncome, { minimum: false }> = { ...employee, initialProfits: "tax_free",
  employee: { reasons: [...PERIOD_REASONS], includeMonths: [{ from: "2025-01", to: "2025-02" }, { from: "2025-04", to: "2025-05" }],
    coronaExclude: [{ from: "2020-03", to: "2020-04" }, { from: "2022-08", to: "2022-09" }], changed: true, changedProfits: "tax_free" } };
const maternity: MaternityAnswers = { kind: "benefits", periods: Object.fromEntries(MATERNITY_KINDS.map((k) => [k, { from: "2026-09-20", to: "2026-12-27" }])), gkvDataConsent: false };
const input = (as: ParentIncome = employee, biologicalMother: MaternityAnswers = { kind: "none" }): IncomeStageAnswers => ({ as, biologicalMother });
const errors = (a: IncomeStageAnswers, h = single) => validateIncomeStage(a, h, birth);
const names = (a: IncomeStageAnswers, h = single) => incomeStageFills(a, h).map((f) => f.name);

describe("Elterngeld checkpoint 3 — printed rules", () => {
  it("minimum-only skips 6–8 but section 9 remains mandatory", () => {
    expect(errors(input(minimum))).toEqual([]);
    expect(names(input(minimum))).toEqual(["5 Mindestbetrag AS", "9 kein Anspruch"]);
  });
  it("minimum request requires confirmation of at most 32 hours and rejects stale income", () => {
    expect(errors(input({ minimum: true, confirmsMax32Hours: false } as never))).toContainEqual({ field: "as.confirmsMax32Hours", code: "required" });
    expect(errors(input({ ...minimum, earnings: employee.earnings } as never))).toContainEqual({ field: "as.minimum", code: "hidden_answers" });
  });
  it("other income answers only when both parents apply", () => {
    expect(errors(input(), couple)).toContainEqual({ field: "other", code: "required" });
    expect(errors({ ...input(), other: employee })).toContainEqual({ field: "other", code: "not_applicable" });
    expect(names(input()).some((n) => n.endsWith(" 2E"))).toBe(false);
  });
  it("initial profit question uses exact separate single-choice boxes for AS and 2E", () => {
    expect(names({ as: employee, other: self, biologicalMother: { kind: "none" } }, couple)).toContain("6a Ihre 1");
    expect(names({ as: employee, other: self, biologicalMother: { kind: "none" } }, couple)).toContain("6a Ihre 6");
    expect(names(input(changed))).toContain("6a Ihre 2");
  });
  it("taxable profits require 6.b, others require 6.c", () => {
    expect(errors(input({ ...self, self: undefined }))).toContainEqual({ field: "as.self", code: "required" });
    expect(errors(input({ ...employee, employee: undefined }))).toContainEqual({ field: "as.employee", code: "required" });
    expect(errors(input({ ...self, employee: employee.employee }))).toContainEqual({ field: "as.employee", code: "not_applicable" });
  });
  it("strictly-under-35 request leads to 6.c and leaves 6.b shift fields empty", () => {
    const a = { ...employee, initialProfits: "taxable" as const, self: { under35Request: true, reasons: [] } };
    expect(errors(input(a))).toEqual([]);
    expect(names(input(a))).toContain("6b Gewinneinkünfte unter 35 Euro AS");
    expect(names(input(a))).not.toContain("6b Antrag Verschiebung B-Zeitraum AS");
    expect(errors(input({ ...a, self: { ...a.self, shiftToYear: 2024 } }))).toContainEqual({ field: "as.self", code: "under35_skips_self_period" });
  });
  it("shift request needs a printed reason and a calendar year before 2025 for birth in 2026", () => {
    expect(errors(input({ ...self, self: { under35Request: false, reasons: [], shiftToYear: 2024 } }))).toContainEqual({ field: "as.self.shiftToYear", code: "reason_required" });
    expect(errors(input({ ...self, self: { under35Request: false, reasons: ["maternity_this"], shiftToYear: 2025 } }))).toContainEqual({ field: "as.self.shiftToYear", code: "earlier_calendar_year" });
    expect(errors(input(self))).toEqual([]);
  });
  it("Corona self-employed request sets only existing shift checkbox/year, not an invented field", () => {
    const a = { ...self, self: { under35Request: false, reasons: [], coronaReducedIncome: true, shiftToYear: 2020 } };
    expect(errors(input(a))).toEqual([]);
    expect(names(input(a))).toContain("6b B-Zeitraum verschieben auf AS");
    expect(errors(input({ ...a, self: { ...a.self, shiftToYear: undefined } }))).toContainEqual({ field: "as.self.shiftToYear", code: "required" });
  });
  it("Monat/Jahr ranges are exactly MM.YYYY, not a fabricated day", () => {
    expect(incomeStageFills(input(changed), single)).toContainEqual({ name: "6c Berücksichtigung1 von Jahr AS", type: "text", value: "01.2025" });
    expect(errors(input(changed))).toEqual([]);
    expect(errors(input({ ...changed, employee: { ...changed.employee, includeMonths: [{ from: "2025-13", to: "2025-13" }] } } as never)).map((e) => e.code)).toContain("month_ranges");
  });
  it("Corona exclusion limited to March 2020–September 2022, max two nonoverlapping ranges", () => {
    for (const ranges of [[{ from: "2020-02", to: "2020-03" }], [{ from: "2022-09", to: "2022-10" }],
      [{ from: "2020-03", to: "2020-04" }, { from: "2020-04", to: "2020-05" }], Array(3).fill({ from: "2020-03", to: "2020-04" })]) {
      expect(errors(input({ ...changed, employee: { ...changed.employee, coronaExclude: ranges } } as never)).map((e) => e.code)).toContain("corona_month_ranges");
    }
  });
  it("inclusion and exclusion cannot request the same month", () => {
    expect(errors(input({ ...changed, employee: { ...changed.employee, includeMonths: [{ from: "2020-03", to: "2020-04" }] } } as never))).toContainEqual({ field: "as.employee", code: "include_exclude_overlap" });
  });
  it("changed-period native boxes with misleading 2E names are mapped by actual columns", () => {
    expect(names(input(changed))).toContain("6c Antrag Ausklammern 2E2");
    expect(names({ as: minimum, other: changed, biologicalMother: { kind: "none" } }, couple)).toContain("6c Antrag Ausklammern 2E5");
    expect(names(input(changed))).not.toContain("6c Antrag Ausklammern 2E5");
  });
  it("taxable profits in changed period return to 6.b; unresolved under35 cycle is blocked", () => {
    const a = { ...changed, employee: { ...changed.employee, changedProfits: "taxable" }, self: self.self } as Extract<ParentIncome, { minimum: false }>;
    expect(errors(input(a))).toEqual([]);
    expect(errors(input({ ...a, self: undefined }))).toContainEqual({ field: "as.self", code: "required" });
    expect(errors(input({ ...a, self: { under35Request: true, reasons: [] } }))).toContainEqual({ field: "as.self", code: "changed_period_under35_unresolved" });
  });
  it("all applicable wage/profit types can coexist; wage subtypes need wage income", () => {
    expect(errors(input(self))).toEqual([]);
    expect(names(input(self))).toEqual(expect.arrayContaining(["7a Mini-Job AS", "7a Midi-Job AS", "7a Berufsausbildung AS", "7a Freiwilligendienst AS", "7a Gewerbebetrieb AS", "7a selbstständige Arbeit AS", "7a Land-Forstwirtschaft AS"]));
    expect(errors(input({ ...employee, earnings: { ...employee.earnings, wages: false } }))).toContainEqual({ field: "as.earnings.wageKinds", code: "options" });
  });
  it("section 7.b is profit-only; nichts davon cannot coexist with positive contributions", () => {
    expect(names(input(self))).toContain("7b  Kirchensteuer AS");
    expect(names(input(self))).not.toContain("7b keine Pflichtbeiträge AS");
    expect(names(input({ ...self, earnings: { ...self.earnings, contributions: [] } }))).toContain("7b keine Pflichtbeiträge AS");
    expect(errors(input({ ...employee, earnings: { ...employee.earnings, contributions: [] } }))).toContainEqual({ field: "as.earnings.contributions", code: "not_applicable" });
  });
  it("rejects invalid/duplicate choice values and more than two named replacement lines", () => {
    expect(errors(input({ ...self, earnings: { ...self.earnings, contributions: ["church", "church"] } }))).toContainEqual({ field: "as.earnings.contributions", code: "required" });
    expect(errors(input({ ...self, replacements: { ...self.replacements, pensions: ["A", "B", "C"] } }))).toContainEqual({ field: "as.replacements.pensions", code: "max_two_named_lines" });
  });
  it("section 9 is biological-mother information, not inferred from the applicant's gender", () => {
    const h = { ...single, as: { ...parent, geschlecht: "männlich" as const } };
    expect(validateIncomeStage(input(minimum, maternity), h, birth)).toEqual([]);
    expect(incomeStageFills(input(minimum, maternity), h).filter((f) => f.name.startsWith("9 "))).toHaveLength(15);
  });
  it("maternity no-entitlement choice excludes benefits and stale consent", () => {
    expect(errors(input(minimum, { kind: "none", gkvDataConsent: true } as never))).toContainEqual({ field: "biologicalMother", code: "hidden_answers" });
    expect(names(input(minimum, maternity))).not.toContain("9 kein Anspruch");
  });
  it("GKV data consent is explicit, optional and GKV-only", () => {
    expect(names(input(minimum, maternity))).not.toContain("9 Datenabruf Mutterschaftsgeld");
    expect(names(input(minimum, { ...maternity, gkvDataConsent: true }))).toContain("9 Datenabruf Mutterschaftsgeld");
    expect(errors(input(minimum, { kind: "benefits", periods: { employer: { from: birth, to: "2026-12-27" } }, gkvDataConsent: true }))).toContainEqual({ field: "biologicalMother.gkvDataConsent", code: "gkv_only_explicit_consent" });
  });
  it("maternity end date may be future, but impossible dates and reversed periods are rejected", () => {
    expect(errors(input(employee, maternity))).toEqual([]);
    for (const r of [{ from: "2026-02-30", to: birth }, { from: "2026-12-01", to: birth }]) {
      expect(errors(input(minimum, { kind: "benefits", periods: { gkv: r }, gkvDataConsent: false }))).toContainEqual({ field: "biologicalMother.gkv", code: "date_range" });
    }
  });
  it("public finished-PDF output remains blocked even with a compatible original", async () => {
    expect(await prepareElterngeldShared(new Uint8Array(), child, { land: "HH", today })).toEqual({ ok: false, code: "MAPPING_INCOMPLETE" });
  });
});

const original = process.env.EG_ORIGINAL;
const cases: [string, IncomeStageAnswers][] = [
  ["minimum", { as: minimum, other: minimum, biologicalMother: { kind: "none" } }],
  ["self", { as: self, other: self, biologicalMother: { ...maternity, gkvDataConsent: true } }],
  ["employee", { as: employee, other: employee, biologicalMother: { kind: "none" } }],
  ["changed-taxfree", { as: changed, other: changed, biologicalMother: maternity }],
  ["changed-none", { as: { ...changed, employee: { ...changed.employee, changedProfits: "none" } } as never, other: { ...changed, employee: { ...changed.employee, changedProfits: "none" } } as never, biologicalMother: { kind: "none" } }],
  ["changed-taxable", { as: { ...changed, employee: { ...changed.employee, changedProfits: "taxable" }, self: self.self } as never, other: { ...changed, employee: { ...changed.employee, changedProfits: "taxable" }, self: self.self } as never, biologicalMother: { kind: "none" } }],
  ["under35", { as: { ...employee, initialProfits: "taxable", self: { under35Request: true, reasons: [] } }, other: { ...employee, initialProfits: "taxable", self: { under35Request: true, reasons: [] } }, biologicalMother: { kind: "none" } }],
  ["no-contributions", { as: { ...self, earnings: { ...self.earnings, contributions: [] } }, other: { ...self, earnings: { ...self.earnings, contributions: [] } }, biologicalMother: { kind: "none" } }],
];
describe("checkpoint 3 native mapping coverage", () => {
  it("all 131 section 5–9 native fields are exercised across valid synthetic cases", () => {
    const covered = new Set(cases.flatMap(([, a]) => { expect(errors(a, couple)).toEqual([]); return names(a, couple); }));
    const expected = Object.keys(EG_FIELDS).filter((n) => /^(5 |6[a-c] |7[ab] |8 |9 )/.test(n));
    expect(expected.length).toBe(131);
    expect(expected.filter((n) => !covered.has(n as never))).toEqual([]);
    expect([...covered].filter((n) => !(n in EG_FIELDS))).toEqual([]);
  });
});
describe.runIf(Boolean(original && existsSync(original)))("authentic original checkpoints 1–3", () => {
  for (const [label, a] of cases) it(`${label}: all 531 fields read back, signatures/authority blank`, async () => {
    if (!original) throw new Error("EG_ORIGINAL required");
    const r = await fillStage3ForTesting(new Uint8Array(readFileSync(original)), child, couple, a, { land: "HH", today }, {
      fontBytes: new Uint8Array(readFileSync("src/assets/fonts/liberation-sans/LiberationSans-Regular.ttf")) });
    expect(r.ok ? "ok" : JSON.stringify(r)).toBe("ok"); if (!r.ok) return;
    const doc = await PDFDocument.load(r.bytes), f = doc.getForm();
    expect(f.getFields()).toHaveLength(531);
    for (const fill of incomeStageFills(a, couple)) {
      if (fill.type === "text") expect(f.getTextField(fill.name).getText()).toBe(fill.value);
      else if (fill.type === "check") expect(f.getCheckBox(fill.name).isChecked()).toBe(true);
    }
    for (const name of EG_NEVER_FILL) expect(f.getTextField(name).getText() ?? "").toBe("");
    for (const field of f.getFields().filter((x) => /^(10 |11 |12[a-d] |13[a-c] )/.test(x.getName()))) {
      if (field instanceof PDFTextField) expect(field.getText() ?? "").toBe("");
      else if (field instanceof PDFCheckBox) expect(field.isChecked()).toBe(false);
      else if (field instanceof PDFRadioGroup) expect(field.getSelected()).toBeUndefined();
    }
    if (process.env.EG_OUT) writeFileSync(`${process.env.EG_OUT}/stage3-${label}.pdf`, r.bytes);
  });
  it("rejects unverified Land, pre-edition birth, altered PDF and invalid answers before output", async () => {
    if (!original) throw new Error("EG_ORIGINAL required");
    const bytes = new Uint8Array(readFileSync(original));
    const opts = { fontBytes: new Uint8Array(readFileSync("src/assets/fonts/liberation-sans/LiberationSans-Regular.ttf")) };
    const unverified = await fillStage3ForTesting(bytes, child, couple, cases[0][1], { land: "TH", today }, opts);
    expect(unverified.ok).toBe(false); if (unverified.ok === false) expect(unverified.code).toBe("LAND_UNVERIFIED");
    const oldBirth = await fillStage3ForTesting(bytes, { ...child, geburtsdatum: "2025-03-31" }, couple, cases[0][1], { land: "HH", today }, opts);
    expect(oldBirth.ok).toBe(false); if (oldBirth.ok === false) expect(oldBirth.code).toBe("BIRTH_BEFORE_EDITION");
    const invalid = await fillStage3ForTesting(bytes, child, couple, { ...cases[0][1], other: undefined }, { land: "HH", today }, opts);
    expect(invalid.ok).toBe(false); if (invalid.ok === false) expect(invalid.code).toBe("INVALID_INPUT");
    const altered = new Uint8Array(bytes.length + 1); altered.set(bytes); altered[bytes.length] = 10;
    const result = await fillStage3ForTesting(altered, child, couple, cases[0][1], { land: "HH", today }, opts);
    expect(result.ok).toBe(false); if (result.ok === false) expect(result.code).toBe("PREFLIGHT_FAILED");
  });
});