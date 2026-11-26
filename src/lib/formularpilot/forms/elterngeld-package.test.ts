import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { PDFDocument, PDFCheckBox, PDFTextField } from "pdf-lib";
import { prepareElterngeldPackage, requiredAnnexes, validatePackage, type PackageAnswers } from "./elterngeld-package";
import { lifeMonthBounds, maternityBasisMonths } from "./elterngeld-shared-2025-plan";
import type { IncomeStageAnswers } from "./elterngeld-shared-2025-income";

const today = "2026-11-26";
const child = { vorname: "Lana", nachname: "Kovač", geburtsdatum: "2026-09-10", anzahl: 1, fruehgeboren: false, behinderung: false };
const id = { vorname: "Maja", nachname: "Kovač", geburtsdatum: "1992-03-14" };
const parent = { ...id, geschlecht: "weiblich" as const, familienstand: "ledig" as const, wohnsitzDE: true, seitGeburt: true,
  adresse: { strasse: "Musterstraße", nr: "12", plz: "20095", ort: "Hamburg" }, steuerId: "12345678901",
  staatsangehoerigkeit: "deutsch" as const, nato: false, diplomat: false, kv: "privat" as const, imHaushalt: true, beziehung: "leiblich" as const };
const months = (n: number) => Array.from({ length: 32 }, (_, i) => (i < n ? "basis" as const : "none" as const));
const base = (): PackageAnswers => ({
  child,
  household: { alleinerziehend: { entlastung: true, unmoeglich: false, kindeswohl: false }, as: { ...parent }, kindAdresse: "wie_as", einkommen: "bis175_fest", antragstellende: "nur_ich", weitereKinderImHaushalt: 0, weitereKinder: [] },
  income: { as: { minimum: true, confirmsMax32Hours: true }, biologicalMother: { kind: "none" } },
  plan: { as: { months: months(2), max32HoursConfirmed: true, parentalLeave: [], paidLeave: { kind: "none" } } },
  final: { as: { bank: { kind: "account", bank: "Musterbank", iban: "DE89370400440532013000", country: "DE", holder: { kind: "self" } } } },
});
const sta = { parent: id, child: { vorname: "Lana", nachname: "Kovač", geburtsdatum: "2026-09-10" }, answer: { kind: "andere" as const, staat: "Bosnien und Herzegowina" } };
const residence = { parent: id, child: sta.child, livesOutsideGermany: true,
  address: { country: "Bosnien und Herzegowina", street: "Musterstraße", houseNumber: "12", postalCode: "71000", city: "Sarajevo" },
  stay: { kind: "limited" as const, from: "2026-01", to: "2027-01" }, worksInGermanyOrGermanContract: true, hasGermanEmployer: true,
  employerSeat: { postalCode: "20095", city: "Hamburg" }, availablePostingProofsAttached: true };
const withIncome = (a: PackageAnswers): PackageAnswers => {
  a.income = { as: { minimum: false, initialProfits: "none", employee: { reasons: [], includeMonths: [], coronaExclude: [], changed: false },
    earnings: { wages: true, wageKinds: [], profitKinds: [] }, replacements: { kinds: [], pensions: [], otherBenefits: [] } }, biologicalMother: { kind: "none" } } as IncomeStageAnswers;
  a.plan.as.during = { wages: true, profits: false, replacements: { kinds: [], pensions: [], otherBenefits: [] }, foreignChildBenefit: false, internationalOrganisationBenefit: false, vocationalTraining: false };
  a.incomeAnnex = { as: { parent: id, child: sta.child, wages: [{ period: { from: "2026-09-10", to: "2027-09-09" }, hours: "10", category: "mini" }], combinedMax32HoursConfirmed: true, wageProofsAttached: true } };
  return a;
};

describe("Lebensmonat boundaries (§187(2)/§188 BGB) incl. birthdays 29–31", () => {
  it("ordinary and month-end birthdays", () => {
    expect(lifeMonthBounds("2026-09-10", 1)).toEqual({ first: "2026-09-10", last: "2026-10-09" });
    expect(lifeMonthBounds("2027-01-31", 1)).toEqual({ first: "2027-01-31", last: "2027-02-28" });
    expect(lifeMonthBounds("2027-01-31", 2)).toEqual({ first: "2027-03-01", last: "2027-03-30" });
    expect(lifeMonthBounds("2028-01-30", 1)).toEqual({ first: "2028-01-30", last: "2028-02-29" });
    expect(lifeMonthBounds("2026-09-01", 1)).toEqual({ first: "2026-09-01", last: "2026-09-30" });
  });
  it("day-30 birth with protection to 09.11 needs Basis in months 1–2 only", () => {
    const inc: IncomeStageAnswers = { as: { minimum: true, confirmsMax32Hours: true }, biologicalMother: { kind: "benefits", periods: { gkv: { from: "2026-08-20", to: "2026-11-09" } }, gkvDataConsent: false } };
    expect(maternityBasisMonths("2026-09-30", inc)).toEqual([1, 2]);
  });
});

describe("integrated HH package rules", () => {
  it("ordinary single applicant needs no annex", () => {
    expect(requiredAnnexes("HH", base())).toEqual([]);
    expect(validatePackage("HH", base(), today)).toEqual({ errors: [], reasons: [], required: [] });
  });
  it("citizenship 'andere' triggers STA; 'deutsch' never does", () => {
    const a = base(); a.household.as.staatsangehoerigkeit = "andere";
    expect(requiredAnnexes("HH", a)).toEqual([{ kind: "sta", role: "as", verifiedForLand: true }]);
    expect(validatePackage("HH", a, today).errors).toContainEqual({ field: "sta.as", code: "required" });
    a.sta = { as: sta }; expect(validatePackage("HH", a, today).errors).toEqual([]);
  });
  it("BB citizenship trigger → official route, never partial PDF", async () => {
    const a = base(); a.household.as.staatsangehoerigkeit = "andere"; a.sta = { as: sta };
    const r = await prepareElterngeldPackage("BB", a, { main: new Uint8Array() }, today, { fontBytes: new Uint8Array() });
    expect(r.ok === false && r.code).toBe("OFFICIAL_ROUTE");
  });
  it("annex identity must match main form", () => {
    const a = base(); a.household.as.staatsangehoerigkeit = "andere"; a.sta = { as: { ...sta, parent: { ...id, nachname: "Anders" } } };
    expect(validatePackage("HH", a, today).errors).toContainEqual({ field: "sta.as", code: "identity_mismatch" });
  });
  it("residence abroad lifted only with verified annex; SH has none → official route", () => {
    const a = base(); a.household.as = { ...parent, wohnsitzDE: false, adresse: undefined, seitGeburt: undefined }; a.residence = { as: residence };
    expect(validatePackage("HH", a, today).reasons).toEqual([]);
    expect(validatePackage("SH", a, today).reasons).toContain("ANNEX_RESIDENCE_UNVERIFIED_FOR_LAND");
  });
  it("income during Elterngeld needs income annex; unrequested annex refused", () => {
    expect(validatePackage("HH", withIncome(base()), today).reasons).toEqual([]);
    const a = base(); a.sta = { as: sta };
    expect(validatePackage("HH", a, today).errors).toContainEqual({ field: "sta.as", code: "not_applicable" });
  });
  it("unverified Land and special cases route officially", () => {
    expect(validatePackage("TH", base(), today).reasons).toEqual(["LAND_UNVERIFIED"]);
    const a = base(); a.household.antragstellende = "ich_bereits";
    expect(validatePackage("HH", a, today).reasons).toContain("PRIOR_OR_SEPARATE_PLAN_UNVERIFIED");
  });
});

const dir = process.env.EG_HH_DIR;
describe.runIf(Boolean(dir && existsSync(`${dir}/main.pdf`)))("authentic HH originals: integrated package read-back", () => {
  const read = (n: string) => new Uint8Array(readFileSync(`${dir}/${n}.pdf`));
  const opts = { fontBytes: new Uint8Array(readFileSync("src/assets/fonts/liberation-sans/LiberationSans-Regular.ttf")) };
  const value = async (bytes: Uint8Array, name: string) => { const f = (await PDFDocument.load(bytes)).getForm().getField(name);
    return f instanceof PDFTextField ? f.getText() : f instanceof PDFCheckBox ? f.isChecked() : undefined; };
  it("main + STA + income + residence all filled from untouched originals", async () => {
    const a = withIncome(base());
    a.household.as = { ...parent, wohnsitzDE: false, adresse: undefined, seitGeburt: undefined, staatsangehoerigkeit: "andere" };
    a.sta = { as: sta }; a.residence = { as: residence };
    const originals = { main: read("main"), sta: read("sta"), income: read("income"), residence: read("residence") };
    const before = originals.main.slice();
    const r = await prepareElterngeldPackage("HH", a, originals, today, opts);
    if (!r.ok) throw new Error(JSON.stringify(r));
    expect(r.files.map((f) => f.kind)).toEqual(["main", "sta", "residence", "income"]);
    expect(originals.main).toEqual(before);
    const main = r.files[0].bytes;
    expect(await value(main, "1a Vorname(n)")).toBe("Lana");
    expect(await value(main, "2b Familienstand 18")).toBe(true);
    expect(await value(main, "13a IBAN AS")).toBe("DE89370400440532013000");
    for (const s of ["13c Ort AS", "13c Datum AS"]) expect(await value(main, s) ?? "").toBe("");
  }, 120000);
  it("missing annex original refused", async () => {
    const a = base(); a.household.as.staatsangehoerigkeit = "andere"; a.sta = { as: sta };
    const r = await prepareElterngeldPackage("HH", a, { main: read("main") }, today, opts);
    expect(r).toEqual({ ok: false, code: "ORIGINAL_MISSING", missing: ["sta"] });
  }, 60000);
  it("wrong original for annex slot refused by hash", async () => {
    const a = base(); a.household.as.staatsangehoerigkeit = "andere"; a.sta = { as: sta };
    const r = await prepareElterngeldPackage("HH", a, { main: read("main"), sta: read("income") }, today, opts);
    expect(r.ok).toBe(false);
  }, 60000);
});
