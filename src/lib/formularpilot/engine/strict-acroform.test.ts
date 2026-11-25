import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { PDFDocument } from "pdf-lib";
import { fillStrictAcroForm, ibanValidDE, isoDateValid, isPilotEnabled, type StrictFormSpec } from "./strict-acroform";

const FONT = new Uint8Array(readFileSync(process.cwd() + "/src/assets/fonts/liberation-sans/LiberationSans-Regular.ttf"));

async function fixture() {
  const doc = await PDFDocument.create(); const page = doc.addPage([600, 400]); const form = doc.getForm();
  form.createTextField("name").addToPage(page, { x: 20, y: 300, width: 200, height: 20 });
  form.createTextField("sig").addToPage(page, { x: 20, y: 260, width: 200, height: 20 });
  form.createCheckBox("box").addToPage(page, { x: 20, y: 220, width: 12, height: 12 });
  const r = form.createRadioGroup("yn");
  r.addOptionToPage("ja", page, { x: 20, y: 180, width: 12, height: 12 }); r.addOptionToPage("nein", page, { x: 40, y: 180, width: 12, height: 12 });
  return doc.save();
}
type N = "name" | "sig" | "box" | "yn";
const spec: StrictFormSpec<N> = {
  fields: { name: "text", sig: "text", box: "checkbox", yn: "radio" },
  manifest: { formKey: "t", sha256: "0".repeat(64), fields: { name: "text", sig: "text", box: "checkbox", yn: "radio" } },
  editions: [], neverFill: ["sig"], radioOptions: { yn: ["ja", "nein"] },
};
const opts = { fontBytes: FONT, allowFixtureForTesting: true };

describe("strict acroform engine", () => {
  it("fills and reads back exact fields", async () => {
    const r = await fillStrictAcroForm(spec, await fixture(), [{ name: "name", type: "text", value: "Maja Kovač" }, { name: "box", type: "check" }, { name: "yn", type: "radio", value: "nein" }], opts);
    expect(r.ok).toBe(true);
    if (r.ok) { const f = (await PDFDocument.load(r.bytes)).getForm(); expect(f.getTextField("name").getText()).toBe("Maja Kovač"); expect(f.getTextField("sig").getText() ?? "").toBe(""); }
  });
  it("blocks neverFill and unknown fields", async () => {
    const r = await fillStrictAcroForm(spec, await fixture(), [{ name: "sig", type: "text", value: "x" }], opts);
    expect(r).toMatchObject({ ok: false, code: "UNMAPPED_FIELD" });
  });
  it("blocks radio value outside original options", async () => {
    const r = await fillStrictAcroForm(spec, await fixture(), [{ name: "yn", type: "radio", value: "vielleicht" }], opts);
    expect(r).toMatchObject({ ok: false, code: "RADIO_OPTION_MISMATCH" });
  });
  it("blocks text overflow", async () => {
    const r = await fillStrictAcroForm(spec, await fixture(), [{ name: "name", type: "text", value: "W".repeat(80) }], opts);
    expect(r).toMatchObject({ ok: false, code: "TEXT_OVERFLOW" });
  });
  it("blocks unknown edition without fixture flag", async () => {
    const r = await fillStrictAcroForm(spec, await fixture(), [], { fontBytes: FONT });
    expect(r.ok).toBe(false);
  });
  it("validators and gate", () => {
    expect(ibanValidDE("DE89 3704 0044 0532 0130 00")).toBe(true);
    expect(ibanValidDE("DE89370400440532013001")).toBe(false);
    expect(isoDateValid("2026-02-30", "2026-11-25")).toBe(false);
    expect(isPilotEnabled(false, "true", false)).toBe(false);
    expect(isPilotEnabled(false, "true", true)).toBe(true);
  });
});
