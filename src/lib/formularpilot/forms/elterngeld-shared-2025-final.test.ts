import { describe, expect, it } from "vitest";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { PDFDocument } from "pdf-lib";
import { finalStageFills, validateFinalStage, type FinalParentAnswers, type FinalStageAnswers } from "./elterngeld-shared-2025-final";
import { EG_FIELDS } from "./elterngeld-shared-2025.fields";
import { EG_NEVER_FILL, fillStage5ForTesting, prepareElterngeldShared, type EgChildAnswers } from "./elterngeld-shared-2025";
import type { HouseholdAnswers } from "./elterngeld-shared-2025-parents";
import type { IncomeStageAnswers } from "./elterngeld-shared-2025-income";
import type { ParentPlan } from "./elterngeld-shared-2025-plan";

const child: EgChildAnswers = { vorname: "Lana", nachname: "Kovač", geburtsdatum: "2026-09-10", anzahl: 1, fruehgeboren: false, behinderung: false };
const parent = { vorname: "Maja", nachname: "Kovač", geburtsdatum: "1992-03-14", geschlecht: "weiblich" as const, familienstand: "ledig" as const,
  wohnsitzDE: true, seitGeburt: true, adresse: { strasse: "Musterstraße", nr: "12", plz: "20095", ort: "Hamburg" }, steuerId: "12345678901",
  staatsangehoerigkeit: "deutsch" as const, nato: false, diplomat: false, kv: "privat" as const, imHaushalt: true, beziehung: "leiblich" as const };
const single: HouseholdAnswers = { alleinerziehend: { entlastung: true, unmoeglich: false, kindeswohl: false }, as: parent,
  kindAdresse: "wie_as", einkommen: "bis175_fest", antragstellende: "nur_ich", weitereKinderImHaushalt: 0, weitereKinder: [] };
const couple: HouseholdAnswers = { ...single, alleinerziehend: { entlastung: false, unmoeglich: false, kindeswohl: false }, antragstellende: "beide",
  other: { ...parent, vorname: "Damir", nachname: "Novak", geschlecht: "männlich", gleicheAdresse: true } };
const income: IncomeStageAnswers = { as: { minimum: true, confirmsMax32Hours: true }, biologicalMother: { kind: "none" } };
const make = (): FinalParentAnswers => ({ bank: { kind: "account", bank: "Musterbank", iban: "DE89 3704 0044 0532 0130 00", country: "DE", holder: { kind: "self" } } });
const plan = (): ParentPlan => ({ months: Array.from({ length: 32 }, (_, i) => i < 2 ? "basis" : "none"), max32HoursConfirmed: true, parentalLeave: [], paidLeave: { kind: "none" } });
const codes = (x: FinalParentAnswers, h = single) => validateFinalStage({ as: x }, h).errors.map((e) => e.code);

describe("Elterngeld section13 exact semantics", () => {
  it("voluntary contacts may all be empty, signatures never mapped", () => {
    expect(validateFinalStage({ as: make() }, single)).toEqual({ errors: [], blocks: [] });
    expect(finalStageFills({ as: make() }, single).some((f) => EG_NEVER_FILL.includes(f.name))).toBe(false);
  });
  it("DE IBAN checksum required, whitespace normalized", () => {
    const a = make(); if (a.bank.kind !== "account") throw new Error("fixture");
    expect(finalStageFills({ as: a }, single)).toContainEqual({ name: "13a IBAN AS", type: "text", value: "DE89370400440532013000" });
    a.bank.iban = "DE00370400440532013000";
    expect(codes(a)).toContain("de_iban_checksum");
  });
  it("BIC only for foreign accounts; foreign validation blocks, not silently omitted", () => {
    const a = make(); if (a.bank.kind !== "account") throw new Error("fixture");
    a.bank.bic = "COBADEFFXXX";
    expect(codes(a)).toContain("germany_no_bic");
    a.bank.country = "foreign";
    expect(validateFinalStage({ as: a }, single).blocks).toEqual(["FOREIGN_ACCOUNT_VALIDATION_UNVERIFIED"]);
  });
  it("same account only in other-parent column; no hidden bank answers", () => {
    expect(codes({ bank: { kind: "same_as_applicant" } })).toContain("same_account_other_only");
    const a: FinalStageAnswers = { as: make(), other: { bank: { kind: "same_as_applicant" } } };
    expect(validateFinalStage(a, couple)).toEqual({ errors: [], blocks: [] });
    expect(finalStageFills(a, couple)).toContainEqual({ name: "13a Konto wie AS", type: "check" });
    a.other = { bank: { kind: "same_as_applicant", iban: "hidden" } as never };
    expect(validateFinalStage(a, couple).errors.map((e) => e.code)).toContain("hidden_answers");
  });
  it("third-party account requires names; other-parent option requires actual name in form", () => {
    const a = make(); if (a.bank.kind !== "account") throw new Error("fixture");
    a.bank.holder = { kind: "third_party", firstName: "", lastName: "" };
    expect(codes(a)).toEqual(["required_safe_text", "required_safe_text"]);
    a.bank.holder = { kind: "other_parent" };
    expect(codes(a)).toContain("other_parent_name_required");
  });
  it("representative requires explicit attached proof; signatures remain blank", () => {
    const a = { ...make(), representative: { firstName: "Maja", lastName: "Kovač", proofAttached: false } };
    expect(codes(a)).toContain("proof_required");
    a.representative.proofAttached = true;
    expect(codes(a)).toEqual([]);
  });
  it("invalid optional contacts and unverified multiline messages are rejected", () => {
    expect(codes({ ...make(), email: "wrong", phone: "letters", message: "a\nb" })).toEqual(["phone", "email", "single_line_only"]);
  });
  it("other-column answers forbidden when only one applies", () => {
    expect(validateFinalStage({ as: make(), other: make() }, single).errors).toContainEqual({ field: "other", code: "not_applicable" });
  });
  it("covers all 27 section13 applicant-fillable native fields with exact single-choice mapping", () => {
    const seen = new Set<string>();
    for (const kind of ["self", "other_parent", "third_party"] as const) {
      const a = make(); if (a.bank.kind !== "account") throw new Error("fixture");
      a.bank.holder = kind === "third_party" ? { kind, firstName: "Maja", lastName: "Kovač" } : { kind };
      a.bank.country = "foreign"; a.bank.bic = "COBADEFFXXX";
      a.phone = "+49 30 123456"; a.email = "synthetic@example.invalid"; a.message = "Nachweis folgt";
      a.representative = { firstName: "Maja", lastName: "Kovač", proofAttached: true };
      for (const f of finalStageFills({ as: a, other: a }, couple)) seen.add(f.name);
      const boxes = finalStageFills({ as: a, other: a }, couple).filter((f) => f.name.startsWith("13a Bankverbindung"));
      expect(boxes.map((f) => f.name)).toEqual([`13a Bankverbindung ${{ self: 1, other_parent: 2, third_party: 3 }[kind]}`, `13a Bankverbindung ${{ self: 4, other_parent: 5, third_party: 6 }[kind]}`]);
    }
    finalStageFills({ as: make(), other: { bank: { kind: "same_as_applicant" } } }, couple).forEach((f) => seen.add(f.name));
    const expected = Object.keys(EG_FIELDS).filter((n) => n.startsWith("13") && !EG_NEVER_FILL.includes(n as keyof typeof EG_FIELDS));
    expect(expected).toHaveLength(27);
    expect([...seen].sort()).toEqual(expected.sort());
  });
});

const original = process.env.EG_ORIGINAL;
describe.runIf(Boolean(original && existsSync(original)))("authentic original checkpoints1–5 (internal only)", () => {
  for (const label of ["single", "same_account", "third_party", "maternity"] as const) it(label, async () => {
    if (!original) throw new Error("EG_ORIGINAL required");
    const h = label === "same_account" ? couple : single;
    const inc: IncomeStageAnswers = label === "maternity" ? { ...income, biologicalMother: { kind: "benefits", periods: { gkv: { from: "2026-08-01", to: "2026-11-09" }, employer: { from: "2026-08-01", to: "2026-11-09" } }, gkvDataConsent: false } } : h === couple ? { ...income, other: income.as } : income;
    const final: FinalStageAnswers = { as: { ...make(), representative: { firstName: "Maja", lastName: "Kovač", proofAttached: true }, message: "Nachweis folgt" }, ...(h === couple ? { other: { bank: { kind: "same_as_applicant" as const } } } : {}) };
    if (label === "third_party" && final.as.bank.kind === "account") final.as.bank.holder = { kind: "third_party", firstName: "Damir", lastName: "Novak" };
    const p = { as: plan(), ...(h === couple ? { other: { ...plan(), months: Array.from({ length: 32 }, (_, i) => i >= 2 && i < 4 ? "basis" as const : "none" as const) } } : {}), ...(label === "maternity" ? { biologicalMotherApplicant: "as" as const } : {}) };
    const r = await fillStage5ForTesting(new Uint8Array(readFileSync(original)), child, h, inc, p, final, { land: "HH", today: "2026-11-26" }, { fontBytes: new Uint8Array(readFileSync("src/assets/fonts/liberation-sans/LiberationSans-Regular.ttf")) });
    expect(r.ok ? "ok" : JSON.stringify(r)).toBe("ok"); if (!r.ok) return;
    const pdf = await PDFDocument.load(r.bytes), f = pdf.getForm();
    expect(pdf.getPageCount()).toBe(23); expect(f.getFields()).toHaveLength(531);
    for (const x of finalStageFills(final, h)) {
      if (x.type === "text") expect(f.getTextField(x.name).getText()).toBe(x.value);
      else if (x.type === "check") expect(f.getCheckBox(x.name).isChecked()).toBe(true);
    }
    for (const n of EG_NEVER_FILL) expect(f.getTextField(n).getText() ?? "").toBe("");
    if (label === "maternity") { expect(f.getCheckBox("10 Basiselterngeld AS Monat 2").isChecked()).toBe(true); expect(f.getCheckBox("9 Datenabruf Mutterschaftsgeld").isChecked()).toBe(false); }
    if (process.env.EG_OUT) writeFileSync(`${process.env.EG_OUT}/stage5-${label}.pdf`, r.bytes);
    // Internal checkpoint success must never open the public output gate.
    expect(await prepareElterngeldShared(new Uint8Array(readFileSync(original)), child, { land: "HH", today: "2026-11-26" })).toEqual({ ok: false, code: "MAPPING_INCOMPLETE" });
  });
});