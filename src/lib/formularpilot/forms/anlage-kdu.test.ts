import { describe, it, expect } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { PDFDocument, PDFName } from "pdf-lib";
import { prepareAnlageKdu, validateKduAnswers, buildKduFills, ibanValid, isKduPilotEnabled, KDU_FIELDS, KDU_EDITIONS, type KduAnswers } from "./anlage-kdu";

const FONT = new Uint8Array(readFileSync(join(process.cwd(), "src/assets/fonts/liberation-sans/LiberationSans-Regular.ttf")));
const today = "2026-11-25";
const FIX = { today, fontBytes: FONT, allowFixtureForTesting: true };

/** Synthetic fixture: same native names/types as the original, NOT the official PDF. */
async function fixture(opts: { radioOptions?: string[]; extraField?: boolean; drop?: string; narrow?: boolean } = {}) {
  const doc = await PDFDocument.create();
  const page = doc.addPage([595, 2600]);
  const form = doc.getForm();
  let y = 2580;
  for (const [name, type] of Object.entries(KDU_FIELDS)) {
    if (name === opts.drop) continue;
    y -= 30;
    if (type === "text") form.createTextField(name).addToPage(page, { x: 20, y, width: opts.narrow ? 30 : 250, height: 20 });
    else if (type === "checkbox") form.createCheckBox(name).addToPage(page, { x: 20, y, width: 12, height: 12 });
    else {
      const g = form.createRadioGroup(name);
      (opts.radioOptions ?? ["ja", "nein"]).forEach((o, i) => g.addOptionToPage(o, page, { x: 20 + i * 40, y, width: 12, height: 12 }));
    }
  }
  if (opts.extraField) form.createTextField("unknownExtra").addToPage(page, { x: 300, y: 10, width: 50, height: 20 });
  return new Uint8Array(await doc.save());
}

// Synthetic people only.
const miete: KduAnswers = {
  vorname: "Maja", nachname: "Kovač", geburtsdatum: "1991-04-12", strasse: "Müllerstraße", hausnr: "12a", plz: "80331", ort: "München",
  personen: "3", raeume: "3", kuechen: "1", baeder: "1", flaecheGesamt: "72,5",
  wohnen: "miete", bedarf: { Grundmiete: "850", Nebenkosten: "180,50", Heizkosten: "95" },
  eigentum: [], energie: ["Gas"], brennstoffSelbst: "nein", heizart: ["Zentralheizung"], kochen: ["Strom"],
  wasser: "dezentral", warmwasser: ["Strom"], mieteDirekt: "ja",
  vermieter: { name: "Damir Novak", strasse: "Großer Weg", hausnr: "3", plz: "01067", ort: "Dresden", iban: "DE89 3704 0044 0532 0130 00" },
};
const eigentum: KduAnswers = {
  vorname: "Damir", nachname: "Novak", geburtsdatum: "1980-01-02", strasse: "Weg", hausnr: "1", plz: "01067", ort: "Dresden",
  personen: "2", flaecheGesamt: "120", flaecheSelbst: "80", flaecheVermietet: "40",
  wohnen: "eigentum", bedarf: {}, mehrereWohneinheiten: "ja", wohneinheiten: "2", eigentum: ["Grundsteuern", "Sonstiges"], eigentumSonstige: "Hausmeister",
  energie: ["Holz"], brennstoffSelbst: "ja", heizart: ["Einzelofen"], kochen: ["Sonstiges"], kochenSonstige: "Induktion", wasser: "zentral", warmwasser: [],
};

async function readBack(bytes: Uint8Array) {
  const f = (await PDFDocument.load(bytes)).getForm();
  return f;
}

describe("Anlage KDU pipeline", () => {
  it("is off by default and in production builds", () => {
    expect(isKduPilotEnabled({ DEV: false, VITE_FORMULARPILOT_KDU: "true" })).toBe(false);
    expect(isKduPilotEnabled({ DEV: true })).toBe(false);
    expect(isKduPilotEnabled({ DEV: true, VITE_FORMULARPILOT_KDU: "true" })).toBe(true);
  });
  it("pins the full verified hash of edition 10/2026", () => {
    expect(KDU_EDITIONS[0].sha256).toBe("c451fabb6f3110d6a2640c1fd380d203d93f9b226d2f588f3bf4ab276c90ee20");
    expect(Object.keys(KDU_FIELDS)).toHaveLength(77);
  });
  it("fills rent case and reads every value back", async () => {
    const r = await prepareAnlageKdu(await fixture(), miete, FIX);
    expect(r.ok).toBe(true);
    if (!("bytes" in r)) return;
    const f = await readBack(r.bytes);
    expect(f.getTextField("txtfPersonNachname").getText()).toBe("Kovač");
    expect(f.getTextField("datePersonGebDatum").getText()).toBe("12.04.1991");
    expect(f.getTextField("numfBedarfNebenkosten").getText()).toBe("180,50");
    expect(f.getCheckBox("chbxBedarfHeizkosten").isChecked()).toBe(true);
    expect(f.getCheckBox("chbxBedarfPauschalmiete").isChecked()).toBe(false);
    expect(f.getRadioGroup("rbtnMieteDirekt").getSelected()).toBe("ja");
    expect(f.getTextField("txtfVermieterIBAN").getText()).toBe("DE89370400440532013000");
    expect(f.getTextField("dateUnterschriftPerson").getText() ?? "").toBe("");
    expect(f.getRadioGroup("rbtnWohneinheit").getSelected()).toBeUndefined();
  });
  it("fills owner case with conditional fields", async () => {
    const r = await prepareAnlageKdu(await fixture(), eigentum, FIX);
    expect(r.ok).toBe(true);
    if (!("bytes" in r)) return;
    const f = await readBack(r.bytes);
    expect(f.getCheckBox("chbxWohnenEigentum").isChecked()).toBe(true);
    expect(f.getRadioGroup("rbtnWohneinheit").getSelected()).toBe("ja");
    expect(f.getTextField("numfWohneinheitAnzahl").getText()).toBe("2");
    expect(f.getRadioGroup("rbtnBrenstoff").getSelected()).toBe("ja");
    expect(f.getTextField("txtfVermieterName").getText() ?? "").toBe("");
  });
  it("never fills signature dates", () => {
    for (const a of [miete, eigentum]) expect(buildKduFills(a).map((x) => x.name)).not.toContain("dateUnterschriftPerson");
  });
  it("rejects missing required answers and invalid formats", () => {
    const codes = validateKduAnswers({ ...miete, vorname: "", plz: "123", geburtsdatum: "2030-01-01", vermieter: { ...miete.vermieter!, iban: "DE00 1234" } }, today);
    expect(codes).toEqual(expect.arrayContaining([
      { field: "vorname", code: "required" }, { field: "plz", code: "plz" }, { field: "geburtsdatum", code: "date" }, { field: "vermieter.iban", code: "iban" },
    ]));
  });
  it("enforces conditional consistency", () => {
    expect(validateKduAnswers({ ...miete, bedarf: { Pauschalmiete: "900", Grundmiete: "1" } }, today)).toContainEqual({ field: "bedarf", code: "pauschal_exclusive" });
    expect(validateKduAnswers({ ...miete, wasser: "zentral" }, today)).toContainEqual({ field: "warmwasser", code: "not_applicable" });
    expect(validateKduAnswers({ ...eigentum, mieteDirekt: "ja" }, today)).toContainEqual({ field: "mieteDirekt", code: "not_applicable" });
    expect(validateKduAnswers({ ...eigentum, eigentumSonstige: "" }, today)).toContainEqual({ field: "eigentumSonstige", code: "required" });
    expect(validateKduAnswers({ ...miete, mieteDirekt: undefined }, today)).toContainEqual({ field: "mieteDirekt", code: "required" });
  });
  it("validates IBAN checksum", () => {
    expect(ibanValid("DE89 3704 0044 0532 0130 00")).toBe(true);
    expect(ibanValid("DE89 3704 0044 0532 0130 01")).toBe(false);
  });
  it("blocks the fixture without the test switch (hash gate)", async () => {
    const r = await prepareAnlageKdu(await fixture(), miete, { today, fontBytes: FONT });
    expect(r).toMatchObject({ ok: false, code: "PREFLIGHT_FAILED" });
  });
  it("blocks missing fields, extra fields and wrong radio choices", async () => {
    expect(await prepareAnlageKdu(await fixture({ drop: "chbxWasserZentral" }), miete, FIX)).toMatchObject({ ok: false, code: "PREFLIGHT_FAILED" });
    expect(await prepareAnlageKdu(await fixture({ extraField: true }), miete, FIX)).toMatchObject({ ok: false, code: "UNEXPECTED_FIELDS" });
    expect(await prepareAnlageKdu(await fixture({ radioOptions: ["Ja", "Nein"] }), miete, FIX)).toMatchObject({ ok: false, code: "RADIO_OPTION_MISMATCH" });
  });
  it("blocks truncated text", async () => {
    expect(await prepareAnlageKdu(await fixture({ narrow: true }), miete, FIX)).toMatchObject({ ok: false, code: "TEXT_OVERFLOW" });
  });
  it("blocks XFA documents (encryption checked by shared preflight)", async () => {
    const doc = await PDFDocument.load(await fixture());
    const acro = doc.catalog.lookup(PDFName.of("AcroForm")) as import("pdf-lib").PDFDict;
    acro.set(PDFName.of("XFA"), doc.context.obj([]));
    const r = await prepareAnlageKdu(new Uint8Array(await doc.save()), miete, FIX);
    expect(r).toMatchObject({ ok: false, code: "PREFLIGHT_FAILED" });
    if ("preflight" in r) expect(r.preflight).toContainEqual({ code: "XFA_FORM" });
  });
  it("blocks unreadable input", async () => {
    expect(await prepareAnlageKdu(new TextEncoder().encode("not a pdf"), miete, FIX)).toMatchObject({ ok: false, code: "PREFLIGHT_FAILED" });
  });

  // Authentic original is never bundled. Runs only when a locally obtained copy is provided.
  const original = process.env.KDU_ORIGINAL_PDF;
  it.runIf(!!original && existsSync(original!))("fills the authentic official original (local copy)", async () => {
    const bytes = new Uint8Array(readFileSync(original!));
    for (const a of [miete, eigentum]) {
      const r = await prepareAnlageKdu(bytes, a, { today, fontBytes: FONT });
      expect(r).toMatchObject({ ok: true, edition: "Anlage KDU BA 10/2026" });
      if ("bytes" in r && process.env.KDU_OUT) (await import("node:fs")).writeFileSync(`${process.env.KDU_OUT}/${a.wohnen}.pdf`, r.bytes);
    }
  });
});
