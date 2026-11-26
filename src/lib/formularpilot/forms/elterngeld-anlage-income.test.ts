import { describe, expect, it } from "vitest";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { PDFDocument } from "pdf-lib";
import { INCOME_ANNEX_FIELDS } from "./elterngeld-anlage-income.fields";
import { fillIncomeAnnexForTesting, incomeAnnexFills, incomeAnnexSpec, validateIncomeAnnex, type IncomeAnnexAnswers } from "./elterngeld-anlage-income";

const today = "2026-11-26";
function fixture(): IncomeAnnexAnswers {
  const period = { from: "2026-09-10", to: "2027-09-09" };
  return { parent: { vorname: "Maja", nachname: "Kovač", geburtsdatum: "1992-03-14" },
    child: { vorname: "Lana", nachname: "Kovač", geburtsdatum: "2026-09-10" },
    wages: [{ period: { ...period }, hours: "10,5", category: "mini" }, { period: { ...period }, hours: "5", category: "midi" }],
    profits: { kinds: ["self_employed", "business", "agriculture"], activities: [{ period: { ...period }, hours: "0", monthlyProfit: "-123,45" }, { period: { ...period }, hours: "5", monthlyProfit: "50" }],
      actualExpensesRequested: true, allTaxFree: false, childcareChildren: 3 },
    combinedMax32HoursConfirmed: true, wageProofsAttached: true, profitProofsAttached: true, workReductionExplanationAttached: true, childcareProofAttached: true };
}
describe("Elterngeld income annex native mapping and official constraints", () => {
  it("mixed wage and profit/loss branches coexist; zero work hours allowed for passive income", () => {
    expect(validateIncomeAnnex(fixture(), today)).toEqual([]);
    expect(incomeAnnexFills(fixture())).toContainEqual({ name: "2a erste Gewinneinkünfte Betrag", type: "text", value: "-123,45" });
    expect(incomeAnnexFills(fixture())).toContainEqual({ name: "2a erste Gewinneinkünfte Stunden", type: "text", value: "0" });
  });
  it("only two printed lines per income type; never silently drops additional activities", () => {
    const a = fixture(); a.wages.push(a.wages[0]);
    if (a.profits) a.profits.activities.push(a.profits.activities[0]);
    expect(validateIncomeAnnex(a, today).map((e) => e.code)).toEqual(expect.arrayContaining(["max_two_original_lines", "one_or_two_original_lines"]));
  });
  it("32-hour limit requires explicit combined confirmation and valid numeric hours", () => {
    const a = fixture(); a.combinedMax32HoursConfirmed = false; a.wages[0].hours = "32,01";
    expect(validateIncomeAnnex(a, today).map((e) => e.code)).toEqual(expect.arrayContaining(["required", "zero_to32_hours"]));
  });
  it("future dates allowed, invalid/reversed/prebirth dates refused", () => {
    const a = fixture(); a.wages[0].period.from = "2026-09-09"; a.wages[1].period.to = "2026-02-30";
    expect(validateIncomeAnnex(a, today).filter((e) => e.code === "date_range")).toHaveLength(2);
  });
  it("printed tax-free yes/no and actual-expense request are explicit, not inferred from losses", () => {
    const a = fixture(), f = incomeAnnexFills(a);
    expect(f).toContainEqual({ name: "2Kontrollkästchen4", type: "check" });
    expect(f).toContainEqual({ name: "2Kontrollkästchen6", type: "check" });
    expect(f.some((x) => x.name === "2Kontrollkästchen5")).toBe(false);
    if (a.profits) { a.profits.allTaxFree = true; a.profits.actualExpensesRequested = false; }
    const yes = incomeAnnexFills(a);
    expect(yes).toContainEqual({ name: "2Kontrollkästchen5", type: "check" });
    expect(yes.some((x) => ["2Kontrollkästchen4", "2Kontrollkästchen6"].includes(x.name))).toBe(false);
  });
  it("proofs and work reduction explanation required without storing any uploaded proof", () => {
    const a = fixture(); a.wageProofsAttached = false; a.profitProofsAttached = false; a.workReductionExplanationAttached = false; a.childcareProofAttached = false;
    expect(validateIncomeAnnex(a, today).filter((e) => e.code === "proof_required")).toHaveLength(4);
  });
  it("invalid person dates, signed money and unknown categories refused", () => {
    const a = fixture(); a.parent.geburtsdatum = "1992-02-30"; a.wages[0].category = "invented" as never;
    if (a.profits) a.profits.activities[0].monthlyProfit = "1.000,00";
    expect(validateIncomeAnnex(a, today).map((e) => e.code)).toEqual(expect.arrayContaining(["date", "options", "signed_eur"]));
  });
  it("annex trigger required, orphaned proof confirmations rejected", () => {
    const a = fixture(); a.wages = []; delete a.profits;
    expect(validateIncomeAnnex(a, today).map((e) => e.code)).toContain("section12a_trigger_required");
    expect(validateIncomeAnnex(a, today).map((e) => e.code)).toContain("hidden_answers");
  });
  it("all 35 native fields covered, wage choice exclusive; BB/TH not inferred from other states", () => {
    const seen = new Set<string>();
    for (const category of ["mini", "midi", "training", "voluntary"] as const) for (const taxFree of [false, true]) {
      const a = fixture(); a.wages.forEach((w) => w.category = category); if (a.profits) a.profits.allTaxFree = taxFree;
      const f = incomeAnnexFills(a); f.forEach((x) => seen.add(x.name));
      expect(f.filter((x) => /^1Kontrollkästchen[1-4]$/.test(x.name))).toHaveLength(1);
      expect(f.filter((x) => /^1Kontrollkästchen[5-8]$/.test(x.name))).toHaveLength(1);
    }
    expect(Object.keys(INCOME_ANNEX_FIELDS)).toHaveLength(35);
    expect([...seen].sort()).toEqual(Object.keys(INCOME_ANNEX_FIELDS).sort());
    expect(incomeAnnexSpec("BB")).toBeNull(); expect(incomeAnnexSpec("TH")).toBeNull();
  });
});

const dir = process.env.EG_INCOME_DIR;
describe.runIf(Boolean(dir && existsSync(dir)))("authentic income annex per Land", () => {
  for (const land of ["HH", "SH", "RP"] as const) it(`${land}: all mapped fields read back, no protection/XFA`, async () => {
    if (!dir) throw new Error("EG_INCOME_DIR required");
    const a = fixture(), original = new Uint8Array(readFileSync(`${dir}/${land}_income.pdf`));
    const r = await fillIncomeAnnexForTesting(land, original, a, today, { fontBytes: new Uint8Array(readFileSync("src/assets/fonts/liberation-sans/LiberationSans-Regular.ttf")) });
    expect(r.ok ? "ok" : JSON.stringify(r)).toBe("ok"); if (!r.ok || !("bytes" in r)) return;
    const pdf = await PDFDocument.load(r.bytes), form = pdf.getForm();
    expect(pdf.getPageCount()).toBe(3); expect(pdf.isEncrypted).toBe(false); expect(form.hasXFA()).toBe(false); expect(form.getFields()).toHaveLength(35);
    for (const f of incomeAnnexFills(a)) {
      if (f.type === "text") expect(form.getTextField(f.name).getText()).toBe(f.value);
      else expect(form.getCheckBox(f.name).isChecked()).toBe(true);
    }
    if (process.env.EG_OUT) writeFileSync(`${process.env.EG_OUT}/${land}-income-filled.pdf`, r.bytes);
  });
  it("same field inventory is not enough: wrong Land hash is rejected", async () => {
    if (!dir) throw new Error("EG_INCOME_DIR required");
    const r = await fillIncomeAnnexForTesting("HH", new Uint8Array(readFileSync(`${dir}/SH_income.pdf`)), fixture(), today, { fontBytes: new Uint8Array(readFileSync("src/assets/fonts/liberation-sans/LiberationSans-Regular.ttf")) });
    expect(r.ok).toBe(false); expect("bytes" in r).toBe(false);
  });
});