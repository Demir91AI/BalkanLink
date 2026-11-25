import { describe, it, expect } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { PDFDocument } from "pdf-lib";
import { prepareAnlageSv, validateSvAnswers, buildSvFills, SV_FIELDS, SV_ZUSCHUSS_JA, SV_PRODUCTION_ENABLED, isSvPilotEnabled, type SvAnswers } from "./anlage-sv";

const today = "2026-11-25";
const FONT = new Uint8Array(readFileSync(join(process.cwd(), "src/assets/fonts/liberation-sans/LiberationSans-Regular.ttf")));
const base: SvAnswers = { vorname: "Maja", nachname: "Kovač", geburtsdatum: "1990-04-12", bgNr: "12345BG0001", bVorname: "Maja", bNachname: "Kovač", bGeburtsdatum: "1990-04-12", pkv: "ja", selbstaendig: "nein", beihilfe: "nein", zuschuss: "ja" };
const original = process.env.SV_ORIGINAL_PDF;

describe("Anlage SV rules", () => {
  it("production hard off, dev needs explicit flag", () => {
    expect(SV_PRODUCTION_ENABLED).toBe(false);
    expect(isSvPilotEnabled({ DEV: true })).toBe(false);
    expect(isSvPilotEnabled({ DEV: false, VITE_FORMULARPILOT_SV: "true" })).toBe(false);
    expect(isSvPilotEnabled({ DEV: true, VITE_FORMULARPILOT_SV: "true" })).toBe(true);
  });
  it("valid answers pass", () => expect(validateSvAnswers(base, today)).toEqual([]));
  it("Q8–10 required", () => expect(validateSvAnswers({ ...base, pkv: undefined }, today)).toContainEqual({ field: "pkv", code: "required" }));
  it("Q11 required only from age 55", () => {
    const old = { ...base, bGeburtsdatum: "1971-11-25" };
    expect(validateSvAnswers(old, today)).toContainEqual({ field: "versFrei", code: "required" });
    expect(validateSvAnswers({ ...base, bGeburtsdatum: "1971-11-26", versFrei: "ja" }, today)).toContainEqual({ field: "versFrei", code: "not_applicable" });
  });
  it("Zuschuss only when any Q8–11 is ja", () => {
    const allNo = { ...base, pkv: "nein" as const, zuschuss: undefined };
    expect(validateSvAnswers(allNo, today)).toEqual([]);
    expect(validateSvAnswers({ ...allNo, zuschuss: "ja" }, today)).toContainEqual({ field: "zuschuss", code: "not_applicable" });
    expect(validateSvAnswers({ ...base, zuschuss: undefined }, today)).toContainEqual({ field: "zuschuss", code: "required" });
  });
  it("future/invalid dates and control chars rejected", () => {
    expect(validateSvAnswers({ ...base, geburtsdatum: "2027-01-01" }, today)).toContainEqual({ field: "geburtsdatum", code: "date" });
    expect(validateSvAnswers({ ...base, vorname: "Ma\u0007ja" }, today)).toContainEqual({ field: "vorname", code: "invalid_chars" });
  });
  it("maps Zuschuss ja to exact native export value, never signature dates", () => {
    const f = buildSvFills(base);
    expect(f).toContainEqual({ name: "rbtnKVPVZuschuss", type: "radio", value: SV_ZUSCHUSS_JA });
    expect(f.some((x) => x.name.startsWith("dateUnterschrift"))).toBe(false);
    expect(f.find((x) => x.name === "datePersonGebDatum")).toMatchObject({ value: "12.04.1990" });
  });
  it("rejects non-PDF input", async () => {
    const r = await prepareAnlageSv(new Uint8Array([1, 2, 3]), base, { today, fontBytes: FONT });
    expect(r).toMatchObject({ ok: false, code: "PREFLIGHT_FAILED" });
  });
  it("rejects a PDF of another form (hash/fields)", async () => {
    const d = await PDFDocument.create(); d.addPage(); d.getForm().createTextField("x").addToPage(d.getPage(0));
    const r = await prepareAnlageSv(await d.save(), base, { today, fontBytes: FONT });
    expect(r.ok).toBe(false);
  });

  describe.runIf(!!original && existsSync(original!))("authentic original (local copy)", () => {
    const cases: [string, SvAnswers][] = [
      ["pkv+zuschuss", base],
      ["allNo", { ...base, pkv: "nein", zuschuss: undefined, bgNr: undefined }],
      ["55+ other person", { ...base, bVorname: "Damir", bNachname: "Novak", bGeburtsdatum: "1965-03-02", pkv: "nein", versFrei: "ja", zuschuss: "nein" }],
    ];
    for (const [n, a] of cases) it(`fills + reads back every field: ${n}`, async () => {
      const r = await prepareAnlageSv(new Uint8Array(readFileSync(original!)), a, { today, fontBytes: FONT });
      expect(r.ok).toBe(true);
      if (!r.ok) return;
      const f = (await PDFDocument.load(r.bytes)).getForm();
      expect(f.getFields().length).toBe(Object.keys(SV_FIELDS).length);
      expect(f.getTextField("dateUnterschriftPerson").getText() ?? "").toBe("");
      expect(f.getTextField("txtfBGVorname").getText()).toBe(a.bVorname);
      expect(f.getRadioGroup("rbtnVersFrei").getSelected()).toBe(a.versFrei);
      expect(r.edition).toBe("Anlage SV BA 10/2026");
    });
    it("blocks a modified original (hash)", async () => {
      const b = new Uint8Array(readFileSync(original!)); const d = await PDFDocument.load(b); d.setTitle("x");
      const r = await prepareAnlageSv(await d.save(), base, { today, fontBytes: FONT });
      expect(r.ok).toBe(false);
    });
  });
});
