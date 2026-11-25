import { describe, it, expect } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { PDFDocument } from "pdf-lib";
import { EG_FIELDS } from "./elterngeld-shared-2025.fields";
import { checkJurisdiction, validateChild, prepareElterngeldShared, fillStage1ForTesting, childFills, isElterngeldPilotEnabled, EG_MAPPING_COMPLETE, EG_PRODUCTION_ENABLED, type EgChildAnswers } from "./elterngeld-shared-2025";

const FONT = new Uint8Array(readFileSync(join(process.cwd(), "src/assets/fonts/liberation-sans/LiberationSans-Regular.ttf")));
const today = "2026-11-25";
const child: EgChildAnswers = { vorname: "Lana", nachname: "Kovač", geburtsdatum: "2026-09-10", anzahl: 1, fruehgeboren: false, behinderung: false };
const original = process.env.EG_ORIGINAL;

describe("Elterngeld shared 2025 — stage 1 gates", () => {
  it("is hard-disabled and incomplete", () => {
    expect(EG_PRODUCTION_ENABLED).toBe(false); expect(EG_MAPPING_COMPLETE).toBe(false);
    expect(isElterngeldPilotEnabled({ DEV: false, VITE_FORMULARPILOT_ELTERNGELD: "true" })).toBe(false);
    expect(Object.keys(EG_FIELDS)).toHaveLength(531);
  });
  it("requires an explicit verified Land", () => {
    expect(checkJurisdiction({ land: "", today }, child.geburtsdatum)).toBe("LAND_REQUIRED");
    expect(checkJurisdiction({ land: "TH", today }, child.geburtsdatum)).toBe("LAND_UNVERIFIED");
    for (const l of ["BB", "HH", "RP", "SH"] as const) expect(checkJurisdiction({ land: l, today }, child.geburtsdatum)).toBeNull();
    expect(checkJurisdiction({ land: "BY" as never, today }, child.geburtsdatum)).toBe("LAND_UNVERIFIED");
  });
  it("blocks births before 01.04.2025 and future dates", () => {
    expect(checkJurisdiction({ land: "BB", today }, "2025-03-31")).toBe("BIRTH_BEFORE_EDITION");
    expect(checkJurisdiction({ land: "BB", today }, "2025-04-01")).toBeNull();
    expect(checkJurisdiction({ land: "BB", today }, "2027-01-01")).toBe("INVALID_INPUT");
  });
  it("validates premature birth (≥ 6 weeks) and multiples", () => {
    expect(validateChild({ ...child, fruehgeboren: true }, today)).toContainEqual({ field: "errechneterTermin", code: "date" });
    expect(validateChild({ ...child, fruehgeboren: true, errechneterTermin: "2026-10-01" }, today)).toContainEqual({ field: "errechneterTermin", code: "not_6_weeks" });
    expect(validateChild({ ...child, fruehgeboren: true, errechneterTermin: "2026-10-22" }, today)).toEqual([]);
    expect(validateChild({ ...child, anzahl: 0 }, today)).toContainEqual({ field: "anzahl", code: "range" });
  });
  it("never returns a PDF while mapping is incomplete", async () => {
    expect(await prepareElterngeldShared(new Uint8Array(), child, { land: "HH", today })).toEqual({ ok: false, code: "MAPPING_INCOMPLETE" });
  });
  it("leaves the multiples count blank for a single child", () => {
    expect(childFills(child).map((f) => f.name)).not.toContain("1a Anzahl der Kinder");
  });

  describe.runIf(!!original && existsSync(original!))("authentic original (local copy)", () => {
    it("fills section 1 with full read-back; everything else untouched", async () => {
      const a = { ...child, anzahl: 2, fruehgeboren: true, errechneterTermin: "2026-10-30", behinderung: true };
      const r = await fillStage1ForTesting(new Uint8Array(readFileSync(original!)), a, { fontBytes: FONT });
      expect(r.ok).toBe(true); if (!r.ok) return;
      const f = (await PDFDocument.load(r.bytes)).getForm();
      expect(f.getTextField("1a Nachname").getText()).toBe("Kovač");
      expect(f.getTextField("1b Geburtsdatum Jahr").getText()).toBe("10.09.2026");
      expect(f.getTextField("1b Errechneter Geburtstermin Jahr").getText()).toBe("30.10.2026");
      expect(f.getTextField("1a Anzahl der Kinder").getText()).toBe("2");
      expect(f.getCheckBox("1b Früh geboren").isChecked()).toBe(true);
      expect(f.getTextField("13c Datum AS").getText() ?? "").toBe("");
      expect(f.getFields()).toHaveLength(531);
    });
    it("blocks a modified original", async () => {
      const d = await PDFDocument.load(new Uint8Array(readFileSync(original!))); d.setTitle("x");
      const r = await fillStage1ForTesting(await d.save(), child, { fontBytes: FONT });
      expect(r.ok).toBe(false);
    });
  });
});
