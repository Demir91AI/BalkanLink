import { describe, it, expect } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { PDFDocument } from "pdf-lib";
import { fillStage2ForTesting, childFills, type EgChildAnswers } from "./elterngeld-shared-2025";
import { householdFills, validateHousehold, needsCitizenshipAnnex, EG_EXCLUSIVE_GROUPS, type HouseholdAnswers, type ParentAnswers } from "./elterngeld-shared-2025-parents";
import { fillStaForTesting, staSpec, validateSta, type StaInput } from "./elterngeld-anlage-staatsangehoerigkeit";

const FONT = new Uint8Array(readFileSync(join(process.cwd(), "src/assets/fonts/liberation-sans/LiberationSans-Regular.ttf")));
const today = "2026-11-25";
const child: EgChildAnswers = { vorname: "Lana", nachname: "Kovač", geburtsdatum: "2026-09-10", anzahl: 1, fruehgeboren: false, behinderung: false };
const adr = { strasse: "Musterstraße", nr: "12a", plz: "20095", ort: "Hamburg" };
const maja: ParentAnswers = { vorname: "Maja", nachname: "Kovač", geburtsdatum: "1992-03-14", geschlecht: "weiblich", familienstand: "verheiratet", mitAnderemElternteil: true,
  wohnsitzDE: true, seitGeburt: false, inDeSeit: "2019-06-01", adresse: adr, steuerId: "12345678901", staatsangehoerigkeit: "andere", nato: false, diplomat: false,
  kv: "pflicht", versichertennummer: "A123456789", kkName: "AOK", kkOrt: "Hamburg", imHaushalt: true, beziehung: "leiblich" };
const damir: ParentAnswers = { ...maja, vorname: "Damir", nachname: "Novak", geburtsdatum: "1990-01-02", geschlecht: "männlich", gleicheAdresse: true, adresse: undefined, steuerId: "98765432109", staatsangehoerigkeit: "deutsch", seitGeburt: true, inDeSeit: undefined, gleicheKk: true, kv: "freiwillig", kkName: undefined, kkOrt: undefined };
const couple: HouseholdAnswers = { alleinerziehend: { entlastung: false, unmoeglich: false, kindeswohl: false }, as: maja, other: damir, kindAdresse: "wie_as", einkommen: "bis175_fest", antragstellende: "beide",
  weitereKinderImHaushalt: 1, weitereKinder: [{ vorname: "Ena", nachname: "Kovač", geburtsdatum: "2024-02-02", behinderung20: false, leiblichAS: true, leiblich2E: true }] };
const single: HouseholdAnswers = { ...couple, alleinerziehend: { entlastung: true, unmoeglich: false, kindeswohl: false }, other: undefined, antragstellende: "nur_ich", as: { ...maja, familienstand: "ledig", mitAnderemElternteil: undefined, kv: "privat", versichertennummer: undefined, kkName: undefined, kkOrt: undefined }, weitereKinderImHaushalt: 0, weitereKinder: [] };

describe("Elterngeld stage 2 — rules", () => {
  it("4.a counts all children up to18; 4.b qualifying list is separate", () => {
    const h = { ...couple, weitereKinderImHaushalt: 5 };
    expect(validateHousehold(h, today)).toEqual({ errors: [], blocks: [] });
    expect(householdFills(h)).toContainEqual({ name: "4a weitere Kinder Anzahl", type: "text", value: "5" });
    expect(householdFills(h).filter((f) => /^4b Vorname/.test(f.name))).toHaveLength(1);
    expect(householdFills({ ...single, weitereKinderImHaushalt: 2 })).toContainEqual({ name: "4a Anzahl 2", type: "check" });
    expect(householdFills({ ...single, weitereKinderImHaushalt: 2 }).some((f) => f.name.startsWith("4b "))).toBe(false);
  });
  it("missing/negative household count and list larger than total are rejected", () => {
    expect(validateHousehold({ ...single, weitereKinderImHaushalt: undefined } as never, today).errors).toContainEqual({ field: "weitereKinderImHaushalt", code: "nonnegative_integer" });
    expect(validateHousehold({ ...single, weitereKinderImHaushalt: -1 }, today).errors).toContainEqual({ field: "weitereKinderImHaushalt", code: "nonnegative_integer" });
    expect(validateHousehold({ ...couple, weitereKinderImHaushalt: 0 }, today).errors).toContainEqual({ field: "weitereKinder", code: "exceeds_household_count" });
  });
  it("unknown household/parent choices are rejected before native mapping", () => {
    const h = { ...single, kindAdresse: "invented", einkommen: "invented", antragstellende: "invented", as: { ...single.as, kv: "invented", beziehung: "invented", staatsangehoerigkeit: "invented", familienstand: "invented" } } as never;
    expect(validateHousehold(h, today).errors.map((e) => e.field)).toEqual(expect.arrayContaining(["kindAdresse", "einkommen", "antragstellende", "as.kv", "as.beziehung", "as.staatsangehoerigkeit", "as.familienstand"]));
  });
  it("valid couple and single-parent cases have no errors", () => {
    expect(validateHousehold(couple, today)).toEqual({ errors: [], blocks: [] });
    expect(validateHousehold(single, today)).toEqual({ errors: [], blocks: [] });
  });
  it("other parent is required unless 2.a is ticked", () => {
    expect(validateHousehold({ ...couple, other: undefined }, today).errors).toContainEqual({ field: "2e", code: "required" });
  });
  it("'beide' conflicts with single-parent 2.a", () => {
    expect(validateHousehold({ ...single, antragstellende: "beide", other: damir }, today).errors).toContainEqual({ field: "antragstellende", code: "conflicts_2a" });
  });
  it("residence abroad and >3 siblings are blocked, never guessed", () => {
    expect(validateHousehold({ ...couple, other: { ...damir, wohnsitzDE: false } }, today).blocks).toContain("WOHNSITZ_AUSLAND_UNSUPPORTED");
    const s = couple.weitereKinder[0];
    expect(validateHousehold({ ...couple, weitereKinder: [s, s, s, s] }, today).blocks).toContain("TOO_MANY_SIBLINGS");
  });
  it("validates Steuer-ID, PLZ, KK details, adoption date", () => {
    const e = validateHousehold({ ...couple, as: { ...maja, steuerId: "0123", adresse: { ...adr, plz: "123" }, kkName: "" }, aufnahmedatum: "2026-01-01" }, today).errors.map((x) => x.field);
    expect(e).toEqual(expect.arrayContaining(["as.steuerId", "as.plz", "as.kk", "aufnahmedatum"]));
    expect(validateHousehold({ ...couple, as: { ...maja, beziehung: "adoptiv" } }, today).errors).toContainEqual({ field: "aufnahmedatum", code: "date" });
  });
  it("citizenship annex only from the printed 2.g answer, per parent in scope", () => {
    expect(needsCitizenshipAnnex(couple)).toEqual(["as"]);
    expect(needsCitizenshipAnnex({ ...couple, antragstellende: "nur_ich", other: { ...damir, staatsangehoerigkeit: "andere" } })).toEqual(["as"]);
    expect(staSpec("BB")).toBeNull(); expect(staSpec("TH")).toBeNull();
  });
  it("every printed single-choice group gets at most one box", () => {
    for (const h of [couple, single]) {
      const names = new Set(householdFills(h).map((f) => f.name));
      for (const g of EG_EXCLUSIVE_GROUPS) expect(g.filter((n) => names.has(n)).length).toBeLessThanOrEqual(1);
    }
  });
  it("single parent: no other-parent fields at all", () => {
    expect(householdFills(single).some((f) => / 2E|Staatsangehörigkeit [34]|Nato [5-8]/.test(f.name))).toBe(false);
  });
});

const original = process.env.EG_ORIGINAL;
describe.runIf(!!original && existsSync(original!))("authentic main original — stage 1+2 read-back", () => {
  for (const [label, h] of [["couple", couple], ["single", single]] as const) {
    it(label, async () => {
      const r = await fillStage2ForTesting(new Uint8Array(readFileSync(original!)), child, h, { fontBytes: FONT });
      expect(r.ok ? "ok" : JSON.stringify(r)).toBe("ok"); if (!r.ok) return;
      const form = (await PDFDocument.load(r.bytes)).getForm();
      const fills = [...childFills(child), ...householdFills(h)];
      for (const f of fills) {
        if (f.type === "text") expect(form.getTextField(f.name).getText()).toBe(f.value);
        else if (f.type === "check") expect(form.getCheckBox(f.name).isChecked()).toBe(true);
        else expect(form.getRadioGroup(f.name).getSelected()).toBe(f.value);
      }
      const set = new Set(fills.map((f) => f.name));
      const stray = form.getFields().filter((x) => !set.has(x.getName() as never)).filter((x) => ("isChecked" in x && (x as never as { isChecked(): boolean }).isChecked()) || ("getText" in x && !!(x as never as { getText(): string | undefined }).getText()));
      expect(stray.map((x) => x.getName())).toEqual([]);
      expect(form.getFields()).toHaveLength(531);
      if (process.env.EG_OUT) (await import("node:fs")).writeFileSync(`${process.env.EG_OUT}/${label}.pdf`, r.bytes);
    });
  }
});

const sta = process.env.EG_STA_DIR;
const staIn: StaInput = { parent: maja, child, answer: { kind: "andere", staat: "Bosnien und Herzegowina" } };
describe.runIf(!!sta && existsSync(sta!))("authentic Anlage Staatsangehörigkeit per Land", () => {
  for (const land of ["HH", "SH", "RP"] as const) it(land, async () => {
    const r = await fillStaForTesting(land, new Uint8Array(readFileSync(`${sta}/${land}_sta.pdf`)), staIn, { fontBytes: FONT });
    expect(r.ok).toBe(true); if (!r.ok || !("bytes" in r)) return;
    const f = (await PDFDocument.load(r.bytes)).getForm();
    expect(f.getTextField("2g Staatsangehörigkeit2").getText()).toBe("Bosnien und Herzegowina");
    expect(f.getCheckBox("2gKontrollkästchen4").isChecked()).toBe(true);
    expect(f.getCheckBox("2gKontrollkästchen1").isChecked()).toBe(false);
  });
  it("wrong Land edition is rejected (RP file under HH)", async () => {
    const r = await fillStaForTesting("HH", new Uint8Array(readFileSync(`${sta}/RP_sta.pdf`)), staIn, { fontBytes: FONT });
    expect(r.ok).toBe(false);
  });
  it("EU branch requires the Freizügigkeit answer", () => {
    expect(validateSta({ ...staIn, answer: { kind: "eu", staat: "Kroatien" } as never })).toContain("freizuegigkeit");
  });
});
