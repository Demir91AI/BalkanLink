/**
 * FormularPilot strict AcroForm engine, extracted unchanged from the Anlage KDU slice.
 * Fail-closed: preflight (hash + native fields/types, no encryption/XFA) -> edition gate ->
 * mapping guard -> radio option check -> glyph/width check -> fill exact native names ->
 * read-back of EVERY field + field count. Never flattens; neverFill fields stay untouched.
 * Pure, browser-local, no network, no storage.
 */
import { PDFDocument, PDFCheckBox, PDFRadioGroup, PDFTextField } from "pdf-lib";
import { embedUnicodeFont } from "../unicode-font";
import { preflightPdfTemplate, type PdfTemplateManifest, type PreflightIssue } from "@/lib/pdf-preflight";

export type NativeFieldType = "text" | "checkbox" | "radio";

export interface StrictEdition {
  version: string;
  sha256: string;
  status: "current_verified" | "superseded";
  evidence: string;
  checkedAt: string;
}

export type StrictFill<N extends string = string> =
  | { name: N; type: "text"; value: string }
  | { name: N; type: "check" }
  | { name: N; type: "radio"; value: string };

export type StrictBlockCode =
  | "PREFLIGHT_FAILED" | "UNEXPECTED_FIELDS" | "EDITION_NOT_CURRENT" | "UNMAPPED_FIELD"
  | "RADIO_OPTION_MISMATCH" | "FONT_UNAVAILABLE" | "UNSUPPORTED_GLYPHS" | "TEXT_OVERFLOW" | "READBACK_MISMATCH";

export type StrictFillResult =
  | { ok: true; bytes: Uint8Array; edition: string; filledFields: number }
  | { ok: false; code: StrictBlockCode; preflight?: PreflightIssue[]; fields?: string[] };

export interface StrictFormSpec<N extends string> {
  fields: Record<N, NativeFieldType>;
  manifest: PdfTemplateManifest;
  editions: StrictEdition[];
  neverFill: readonly N[];
  /** Radio group name -> exact expected option set from the original. */
  radioOptions: Partial<Record<N, readonly string[]>>;
  fontSize?: number;
  padding?: number;
}

export interface StrictFillOptions {
  fontBytes: Uint8Array;
  /** TEST-ONLY: accept a synthetic fixture with the same native schema but another hash. */
  allowFixtureForTesting?: boolean;
}

export async function fillStrictAcroForm<N extends string>(
  spec: StrictFormSpec<N>, templateBytes: Uint8Array, fills: StrictFill<N>[], opts: StrictFillOptions,
): Promise<StrictFillResult> {
  const fontSize = spec.fontSize ?? 9, padding = spec.padding ?? 4;
  const manifest = opts.allowFixtureForTesting ? { ...spec.manifest, sha256: undefined } : spec.manifest;
  const pf = await preflightPdfTemplate(templateBytes, manifest);
  if (!pf.allowed) return { ok: false, code: "PREFLIGHT_FAILED", preflight: pf.issues };
  if (pf.unexpectedFields.length) return { ok: false, code: "UNEXPECTED_FIELDS", fields: pf.unexpectedFields };
  const edition = spec.editions.find((e) => e.sha256 === pf.sha256);
  if (!opts.allowFixtureForTesting && edition?.status !== "current_verified") return { ok: false, code: "EDITION_NOT_CURRENT" };

  const bad = fills.filter((x) => !(x.name in spec.fields) || spec.neverFill.includes(x.name)).map((x) => x.name);
  if (bad.length) return { ok: false, code: "UNMAPPED_FIELD", fields: bad };

  const doc = await PDFDocument.load(templateBytes.slice(), { updateMetadata: false });
  const form = doc.getForm();
  for (const [name, want] of Object.entries(spec.radioOptions) as [string, readonly string[]][]) {
    const got = form.getRadioGroup(name).getOptions().slice().sort().join("|");
    if (got !== [...want].sort().join("|")) return { ok: false, code: "RADIO_OPTION_MISMATCH", fields: [name] };
  }
  for (const x of fills) {
    if (x.type === "radio" && !(spec.radioOptions[x.name] ?? []).includes(x.value)) return { ok: false, code: "RADIO_OPTION_MISMATCH", fields: [x.name] };
  }
  let uf;
  try { uf = await embedUnicodeFont(doc, opts.fontBytes); } catch { return { ok: false, code: "FONT_UNAVAILABLE" }; }

  const unsupported: string[] = [], overflow: string[] = [];
  for (const x of fills) {
    if (x.type !== "text") continue;
    if (uf.missingGlyphs(x.value).length) { unsupported.push(x.name); continue; }
    const widgets = form.getTextField(x.name).acroField.getWidgets();
    if (widgets.length !== 1) { overflow.push(x.name); continue; }
    if (uf.font.widthOfTextAtSize(x.value, fontSize) > widgets[0].getRectangle().width - padding) overflow.push(x.name);
  }
  if (unsupported.length) return { ok: false, code: "UNSUPPORTED_GLYPHS", fields: unsupported.sort() };
  if (overflow.length) return { ok: false, code: "TEXT_OVERFLOW", fields: overflow.sort() };

  for (const x of fills) {
    if (x.type === "text") { const tf = form.getTextField(x.name); tf.setText(x.value); tf.setFontSize(fontSize); }
    else if (x.type === "check") form.getCheckBox(x.name).check();
    else form.getRadioGroup(x.name).select(x.value);
  }
  form.updateFieldAppearances(uf.font);
  const bytes = await doc.save({ updateFieldAppearances: false });

  const back = (await PDFDocument.load(bytes, { updateMetadata: false })).getForm();
  const expected = new Map<string, string | boolean>(fills.map((x) => [x.name, x.type === "check" ? true : x.value]));
  const mismatch: string[] = [];
  for (const name of Object.keys(spec.fields)) {
    const fld = back.getField(name);
    const want = expected.get(name);
    let got: string | boolean | undefined;
    if (fld instanceof PDFTextField) got = fld.getText() ?? "";
    else if (fld instanceof PDFCheckBox) got = fld.isChecked();
    else if (fld instanceof PDFRadioGroup) got = fld.getSelected() ?? "";
    const ok = want === undefined ? got === "" || got === false : got === want;
    if (!ok) mismatch.push(name);
  }
  if (back.getFields().length !== Object.keys(spec.fields).length) mismatch.push("__field_count__");
  if (mismatch.length) return { ok: false, code: "READBACK_MISMATCH", fields: mismatch.sort() };
  return { ok: true, bytes, edition: edition?.version ?? "fixture", filledFields: fills.length };
}

/* ---------------- shared validators ---------------- */
export const blank = (v?: string) => !v || !v.trim();
export const RX = {
  INT: /^\d{1,4}$/, AREA: /^\d{1,5}(,\d{1,2})?$/, EUR: /^\d{1,6}(,\d{1,2})?$/, PLZ: /^\d{5}$/, CTRL: /[\u0000-\u001f\u007f]/,
};
export function ibanValidDE(raw: string): boolean {
  const s = raw.replace(/\s+/g, "").toUpperCase();
  if (!/^DE\d{20}$/.test(s)) return false;
  const r = (s.slice(4) + s.slice(0, 4)).replace(/[A-Z]/g, (c) => String(c.charCodeAt(0) - 55));
  let m = 0; for (const d of r) m = (m * 10 + Number(d)) % 97;
  return m === 1;
}
export function isoDateValid(v: string, today: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(v)) return false;
  const d = new Date(v + "T00:00:00Z");
  return !isNaN(+d) && d.toISOString().slice(0, 10) === v && v <= today && v >= "1900-01-01";
}
export const isoToDe = (iso: string) => `${iso.slice(8, 10)}.${iso.slice(5, 7)}.${iso.slice(0, 4)}`;

/** Dev-only flag gate shared by pilots; production constant must be passed false until legal review. */
export function isPilotEnabled(productionEnabled: boolean, flag: string | undefined, dev: boolean | undefined): boolean {
  if (productionEnabled) return true;
  return dev === true && flag === "true";
}
