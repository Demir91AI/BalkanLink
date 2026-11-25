/**
 * FormularPilot — BA "Anlage KDU" (Kosten der Unterkunft und Heizung), edition 10/2026.
 * DEVELOPMENT ONLY and OFF by default (see isKduPilotEnabled). The official PDF is never
 * bundled, proxied or hosted: the user supplies their own copy downloaded from the
 * Bundesagentur für Arbeit; filling happens only in their browser memory.
 *
 * Fail-closed pipeline: validate -> preflight (hash + all 77 native fields/types, no
 * encryption, no XFA) -> edition gate -> glyph/width check -> fill exact native names
 * -> read-back of EVERY field. Never flattened, signatures and signature dates untouched.
 */
import { PDFDocument, PDFCheckBox, PDFRadioGroup, PDFTextField } from "pdf-lib";
import { embedUnicodeFont } from "../unicode-font";
import { preflightPdfTemplate, type PdfTemplateManifest, type PreflightIssue } from "@/lib/pdf-preflight";

export const KDU_OFFICIAL_URL = "https://www.arbeitsagentur.de/datei/anlagekdu_ba032980.pdf";
export const KDU_INDEX_URL = "https://www.arbeitsagentur.de/arbeitslos-arbeit-finden/downloads-arbeitslos-arbeit-finden";
export const KDU_HINTS_URL = "https://www.arbeitsagentur.de/grundsicherung/ausfuellhinweise";

export interface KduEdition {
  version: string;
  sha256: string;
  /** Source/hash/fields verified. Rights are tracked separately and block production. */
  status: "current_verified" | "superseded";
  evidence: string;
  checkedAt: string;
}

export const KDU_EDITIONS: KduEdition[] = [{
  version: "Anlage KDU BA 10/2026",
  sha256: "c451fabb6f3110d6a2640c1fd380d203d93f9b226d2f588f3bf4ab276c90ee20",
  status: "current_verified",
  evidence: "Downloaded 2026-11-25 from KDU_OFFICIAL_URL (HTTP 200, application/pdf, no Access-Control-Allow-Origin header); %PDF-1.7, 3 pages, producer axaio MadeToTag 4.1.141, AcroForm, not encrypted, no /XFA; 77 fields read with pdf-lib; hash prefix equals 2026-10-28 inventory",
  checkedAt: "2026-11-25",
}];

/** BA imprint (arbeitsagentur.de/impressum, read 2026-11-25): copying/distribution needs prior BA permission. */
export const KDU_RIGHTS = {
  status: "unresolved" as const,
  openQuestions: [
    "whether filling a user-supplied copy in the user's browser counts as 'Verarbeitung in elektronischen Systemen' requiring source attribution or BA permission",
    "whether offering this as a paid membership feature is permitted",
  ],
};

/** Production activation requires owner + legal review; dev also needs an explicit env flag. */
export const KDU_PRODUCTION_ENABLED = false;
export function isKduPilotEnabled(env: { DEV?: boolean; VITE_FORMULARPILOT_KDU?: string } = import.meta.env): boolean {
  if (KDU_PRODUCTION_ENABLED) return true;
  return env.DEV === true && env.VITE_FORMULARPILOT_KDU === "true";
}

/* ---------------- native field schema (read from the original PDF) ---------------- */

const T = "text", C = "checkbox", R = "radio";
export const KDU_FIELDS = {
  txtfPersonVorname: T, txtfPersonNachname: T, datePersonGebDatum: T, txtfBGNr: T,
  txtfPersonStr: T, txtfPersonHausNr: T, txtfPersonPlz: T, txtfPersonOrt: T,
  numfUnterkunftAnzahlPersonen: T, txtfUnterkunftBaujahr: T, numfUnterkunftAnzahlRaum: T,
  numfUnterkunftAnzahlKueche: T, numfUnterkunftAnzahlBad: T, numfUnterkunftGesamt: T,
  numfUnterkunftSelbst: T, numfUnterkunftVermietet: T, numfUnterkunftLeer: T, numfUnterkunftGewerbe: T,
  chbxWohnenMiete: C, chbxWohnenEigentum: C,
  chbxBedarfGrundmiete: C, numfBedarfGrundmiete: T, chbxBedarfNebenkosten: C, numfBedarfNebenkosten: T,
  chbxBedarfHeizkosten: C, numfBedarfHeizkosten: T, chbxBedarfSonstiges: C, numfBedarfSonstiges: T,
  chbxBedarfPauschalmiete: C, numfBedarfPauschalmiete: T,
  rbtnWohneinheit: R, numfWohneinheitAnzahl: T,
  chbxEigentumSchuldzinsen: C, chbxEigentumHeizkosten: C, chbxEigentumWartung: C, chbxEigentumGrundsteuern: C,
  chbxEigentumVersicherung: C, chbxEigentumWasser: C, chbxEigentumAbwasser: C, chbxEigentumMuell: C,
  chbxEigentumSchornstein: C, chbxEigentumStrassenreinigung: C, chbxEigentumSonstiges: C, txtfEigentumSonstige: T,
  chbxEnergiequellenStrom: C, chbxEnergiequellenGas: C, chbxEnergiequellenOel: C, chbxEnergiequellenFernwaerme: C,
  chbxEnergiequellenHolz: C, chbxEnergiequellenSonstiges: C, txtfEnergiequellenSonstiges: T,
  rbtnBrenstoff: R,
  chbxHeizungsartZentralheizung: C, chbxHeizungsartEinzelofen: C, chbxHeizungsartNachtspeicherofen: C,
  chbxKochenStrom: C, chbxKochenGas: C, chbxKochenSonstiges: C, txtfKochenSonstiges: T,
  chbxWasserZentral: C, chbxWasserDezentral: C,
  chbxWarmwasserStrom: C, chbxWarmwasserGas: C, chbxWarmwasserHeizoel: C, chbxWarmwasserHolz: C,
  chbxWarmwasserKohle: C, chbxWarmwasserSonstiges: C, txtfWarmwasserSonstiges: T,
  rbtnMieteDirekt: R, txtfVermieterName: T, txtfVermieterStr: T, txtfVermieterHausNr: T,
  txtfVermieterPlz: T, txtfVermieterOrt: T, txtfVermieterIBAN: T,
  dateUnterschriftPerson: T, dateUnterschriftBetreuer: T,
} as const;
export type KduFieldName = keyof typeof KDU_FIELDS;
/** Signature dates belong to the act of signing; never filled by us. */
export const KDU_NEVER_FILL: KduFieldName[] = ["dateUnterschriftPerson", "dateUnterschriftBetreuer"];
/** Verified export values of both radio groups in the original. */
export const KDU_RADIO_OPTIONS = ["ja", "nein"] as const;

export const KDU_MANIFEST: PdfTemplateManifest = {
  formKey: "anlage-kdu", version: KDU_EDITIONS[0].version, sha256: KDU_EDITIONS[0].sha256, fields: { ...KDU_FIELDS },
};

/* ---------------- answers ---------------- */

export const BEDARF = ["Grundmiete", "Nebenkosten", "Heizkosten", "Sonstiges", "Pauschalmiete"] as const;
export const EIGENTUM = ["Schuldzinsen", "Heizkosten", "Wartung", "Grundsteuern", "Versicherung", "Wasser", "Abwasser", "Muell", "Schornstein", "Strassenreinigung", "Sonstiges"] as const;
export const ENERGIE = ["Strom", "Gas", "Oel", "Fernwaerme", "Holz", "Sonstiges"] as const;
export const HEIZART = ["Zentralheizung", "Einzelofen", "Nachtspeicherofen"] as const;
export const KOCHEN = ["Strom", "Gas", "Sonstiges"] as const;
export const WARMWASSER = ["Strom", "Gas", "Heizoel", "Holz", "Kohle", "Sonstiges"] as const;
type Of<A extends readonly string[]> = A[number];

export interface KduAnswers {
  vorname: string; nachname: string; geburtsdatum: string; bgNr?: string;
  strasse: string; hausnr: string; plz: string; ort: string;
  personen: string; baujahr?: string; raeume?: string; kuechen?: string; baeder?: string;
  flaecheGesamt: string; flaecheSelbst?: string; flaecheVermietet?: string; flaecheLeer?: string; flaecheGewerbe?: string;
  wohnen: "miete" | "eigentum" | "";
  /** Miete only: monthly amounts in euro, keyed by need. */
  bedarf: Partial<Record<Of<typeof BEDARF>, string>>;
  /** Eigentum only. */
  mehrereWohneinheiten?: "ja" | "nein"; wohneinheiten?: string;
  eigentum: Of<typeof EIGENTUM>[]; eigentumSonstige?: string;
  energie: Of<typeof ENERGIE>[]; energieSonstige?: string;
  brennstoffSelbst?: "ja" | "nein";
  heizart: Of<typeof HEIZART>[];
  kochen: Of<typeof KOCHEN>[]; kochenSonstige?: string;
  wasser: "zentral" | "dezentral" | "";
  warmwasser: Of<typeof WARMWASSER>[]; warmwasserSonstige?: string;
  /** Miete only. */
  mieteDirekt?: "ja" | "nein";
  vermieter?: { name: string; strasse: string; hausnr: string; plz: string; ort: string; iban: string };
}

export interface KduValidationError { field: string; code: string }

const blank = (v?: string) => !v || !v.trim();
const INT = /^\d{1,4}$/;
const AREA = /^\d{1,5}(,\d{1,2})?$/;
const EUR = /^\d{1,6}(,\d{1,2})?$/;
const PLZ = /^\d{5}$/;
const CTRL = /[\u0000-\u001f\u007f]/;

export function ibanValid(raw: string): boolean {
  const s = raw.replace(/\s+/g, "").toUpperCase();
  if (!/^DE\d{20}$/.test(s)) return false;
  const r = (s.slice(4) + s.slice(0, 4)).replace(/[A-Z]/g, (c) => String(c.charCodeAt(0) - 55));
  let m = 0; for (const d of r) m = (m * 10 + Number(d)) % 97;
  return m === 1;
}

function isoDateValid(v: string, today: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(v)) return false;
  const d = new Date(v + "T00:00:00Z");
  return !isNaN(+d) && d.toISOString().slice(0, 10) === v && v <= today && v >= "1900-01-01";
}
export const toDe = (iso: string) => `${iso.slice(8, 10)}.${iso.slice(5, 7)}.${iso.slice(0, 4)}`;

export function validateKduAnswers(a: KduAnswers, today: string): KduValidationError[] {
  const e: KduValidationError[] = [];
  const req = (field: string, v?: string) => { if (blank(v)) e.push({ field, code: "required" }); };
  const pat = (field: string, v: string | undefined, re: RegExp, code: string) => { if (!blank(v) && !re.test(v!.trim())) e.push({ field, code }); };
  const allText: [string, string | undefined][] = [
    ["vorname", a.vorname], ["nachname", a.nachname], ["bgNr", a.bgNr], ["strasse", a.strasse], ["hausnr", a.hausnr], ["ort", a.ort],
    ["eigentumSonstige", a.eigentumSonstige], ["energieSonstige", a.energieSonstige], ["kochenSonstige", a.kochenSonstige], ["warmwasserSonstige", a.warmwasserSonstige],
    ["vermieter.name", a.vermieter?.name], ["vermieter.strasse", a.vermieter?.strasse], ["vermieter.ort", a.vermieter?.ort],
  ];
  for (const [f, v] of allText) if (v && CTRL.test(v)) e.push({ field: f, code: "invalid_chars" });

  req("vorname", a.vorname); req("nachname", a.nachname);
  if (blank(a.geburtsdatum)) e.push({ field: "geburtsdatum", code: "required" });
  else if (!isoDateValid(a.geburtsdatum, today)) e.push({ field: "geburtsdatum", code: "date" });
  req("strasse", a.strasse); req("hausnr", a.hausnr); req("plz", a.plz); pat("plz", a.plz, PLZ, "plz"); req("ort", a.ort);
  req("personen", a.personen); pat("personen", a.personen, /^[1-9]\d?$/, "int");
  if (!blank(a.baujahr) && !(/^\d{4}$/.test(a.baujahr!.trim()) && a.baujahr!.trim() <= today.slice(0, 4))) e.push({ field: "baujahr", code: "year" });
  for (const k of ["raeume", "kuechen", "baeder"] as const) pat(k, a[k], INT, "int");
  req("flaecheGesamt", a.flaecheGesamt);
  for (const k of ["flaecheGesamt", "flaecheSelbst", "flaecheVermietet", "flaecheLeer", "flaecheGewerbe"] as const) pat(k, a[k], AREA, "area");

  if (a.wohnen !== "miete" && a.wohnen !== "eigentum") e.push({ field: "wohnen", code: "required" });
  if (a.wohnen === "miete") {
    const chosen = BEDARF.filter((b) => a.bedarf[b] !== undefined);
    if (!chosen.length) e.push({ field: "bedarf", code: "required" });
    if (a.bedarf.Pauschalmiete !== undefined && chosen.length > 1) e.push({ field: "bedarf", code: "pauschal_exclusive" });
    for (const b of chosen) { req(`bedarf.${b}`, a.bedarf[b]); pat(`bedarf.${b}`, a.bedarf[b], EUR, "eur"); }
    if (a.mieteDirekt !== "ja" && a.mieteDirekt !== "nein") e.push({ field: "mieteDirekt", code: "required" });
    if (a.mieteDirekt === "ja") {
      const v = a.vermieter;
      req("vermieter.name", v?.name); req("vermieter.strasse", v?.strasse); req("vermieter.hausnr", v?.hausnr);
      req("vermieter.plz", v?.plz); pat("vermieter.plz", v?.plz, PLZ, "plz"); req("vermieter.ort", v?.ort);
      if (blank(v?.iban)) e.push({ field: "vermieter.iban", code: "required" });
      else if (!ibanValid(v!.iban)) e.push({ field: "vermieter.iban", code: "iban" });
    }
  } else {
    if (Object.values(a.bedarf).some((v) => v !== undefined)) e.push({ field: "bedarf", code: "not_applicable" });
    if (a.mieteDirekt || a.vermieter) e.push({ field: "mieteDirekt", code: "not_applicable" });
  }
  if (a.wohnen === "eigentum") {
    if (a.mehrereWohneinheiten !== "ja" && a.mehrereWohneinheiten !== "nein") e.push({ field: "mehrereWohneinheiten", code: "required" });
    if (a.mehrereWohneinheiten === "ja") { req("wohneinheiten", a.wohneinheiten); pat("wohneinheiten", a.wohneinheiten, /^([2-9]|[1-9]\d)$/, "int"); }
    else if (!blank(a.wohneinheiten)) e.push({ field: "wohneinheiten", code: "not_applicable" });
    if (a.eigentum.includes("Sonstiges")) req("eigentumSonstige", a.eigentumSonstige);
  } else if (a.mehrereWohneinheiten || a.eigentum.length || !blank(a.wohneinheiten)) e.push({ field: "eigentum", code: "not_applicable" });
  if (!a.eigentum.includes("Sonstiges") && !blank(a.eigentumSonstige)) e.push({ field: "eigentumSonstige", code: "not_applicable" });

  const other = (list: string[], v: string | undefined, f: string) => {
    if (list.includes("Sonstiges")) req(f, v); else if (!blank(v)) e.push({ field: f, code: "not_applicable" });
  };
  other(a.energie, a.energieSonstige, "energieSonstige");
  other(a.kochen, a.kochenSonstige, "kochenSonstige");
  if (a.wasser !== "zentral" && a.wasser !== "dezentral") e.push({ field: "wasser", code: "required" });
  if (a.wasser === "dezentral") { if (!a.warmwasser.length) e.push({ field: "warmwasser", code: "required" }); }
  else if (a.warmwasser.length) e.push({ field: "warmwasser", code: "not_applicable" });
  other(a.warmwasser, a.warmwasserSonstige, "warmwasserSonstige");
  if (a.brennstoffSelbst && a.brennstoffSelbst !== "ja" && a.brennstoffSelbst !== "nein") e.push({ field: "brennstoffSelbst", code: "invalid" });
  return e;
}

/* ---------------- mapping ---------------- */

export type KduFill =
  | { name: KduFieldName; type: "text"; value: string }
  | { name: KduFieldName; type: "check" }
  | { name: KduFieldName; type: "radio"; value: (typeof KDU_RADIO_OPTIONS)[number] };

/** Deterministic mapping of VALID answers. Blank optionals stay empty. */
export function buildKduFills(a: KduAnswers): KduFill[] {
  const f: KduFill[] = [];
  const t = (name: KduFieldName, v?: string) => { if (!blank(v)) f.push({ name, type: "text", value: v!.trim().replace(/\s+/g, " ") }); };
  const c = (name: KduFieldName) => f.push({ name, type: "check" });
  t("txtfPersonVorname", a.vorname); t("txtfPersonNachname", a.nachname); t("datePersonGebDatum", toDe(a.geburtsdatum)); t("txtfBGNr", a.bgNr);
  t("txtfPersonStr", a.strasse); t("txtfPersonHausNr", a.hausnr); t("txtfPersonPlz", a.plz); t("txtfPersonOrt", a.ort);
  t("numfUnterkunftAnzahlPersonen", a.personen); t("txtfUnterkunftBaujahr", a.baujahr);
  t("numfUnterkunftAnzahlRaum", a.raeume); t("numfUnterkunftAnzahlKueche", a.kuechen); t("numfUnterkunftAnzahlBad", a.baeder);
  t("numfUnterkunftGesamt", a.flaecheGesamt); t("numfUnterkunftSelbst", a.flaecheSelbst); t("numfUnterkunftVermietet", a.flaecheVermietet);
  t("numfUnterkunftLeer", a.flaecheLeer); t("numfUnterkunftGewerbe", a.flaecheGewerbe);
  if (a.wohnen === "miete") {
    c("chbxWohnenMiete");
    for (const b of BEDARF) if (a.bedarf[b] !== undefined) { c(`chbxBedarf${b}` as KduFieldName); t(`numfBedarf${b}` as KduFieldName, a.bedarf[b]); }
    f.push({ name: "rbtnMieteDirekt", type: "radio", value: a.mieteDirekt! });
    if (a.mieteDirekt === "ja" && a.vermieter) {
      const v = a.vermieter;
      t("txtfVermieterName", v.name); t("txtfVermieterStr", v.strasse); t("txtfVermieterHausNr", v.hausnr);
      t("txtfVermieterPlz", v.plz); t("txtfVermieterOrt", v.ort); t("txtfVermieterIBAN", v.iban.replace(/\s+/g, "").toUpperCase());
    }
  } else {
    c("chbxWohnenEigentum");
    f.push({ name: "rbtnWohneinheit", type: "radio", value: a.mehrereWohneinheiten! });
    if (a.mehrereWohneinheiten === "ja") t("numfWohneinheitAnzahl", a.wohneinheiten);
    for (const x of a.eigentum) c(`chbxEigentum${x}` as KduFieldName);
    t("txtfEigentumSonstige", a.eigentumSonstige);
  }
  for (const x of a.energie) c(`chbxEnergiequellen${x}` as KduFieldName);
  t("txtfEnergiequellenSonstiges", a.energieSonstige);
  if (a.brennstoffSelbst) f.push({ name: "rbtnBrenstoff", type: "radio", value: a.brennstoffSelbst });
  for (const x of a.heizart) c(`chbxHeizungsart${x}` as KduFieldName);
  for (const x of a.kochen) c(`chbxKochen${x}` as KduFieldName);
  t("txtfKochenSonstiges", a.kochenSonstige);
  c(a.wasser === "zentral" ? "chbxWasserZentral" : "chbxWasserDezentral");
  for (const x of a.warmwasser) c(`chbxWarmwasser${x}` as KduFieldName);
  t("txtfWarmwasserSonstiges", a.warmwasserSonstige);
  return f;
}

/* ---------------- prepare (fail-closed) ---------------- */

export type KduBlockCode =
  | "VALIDATION_FAILED" | "PREFLIGHT_FAILED" | "UNEXPECTED_FIELDS" | "EDITION_NOT_CURRENT" | "UNMAPPED_FIELD"
  | "RADIO_OPTION_MISMATCH" | "FONT_UNAVAILABLE" | "UNSUPPORTED_GLYPHS" | "TEXT_OVERFLOW" | "READBACK_MISMATCH";

export type KduPrepareResult =
  | { ok: true; bytes: Uint8Array; edition: string; filledFields: number }
  | { ok: false; code: KduBlockCode; validation?: KduValidationError[]; preflight?: PreflightIssue[]; fields?: string[] };

export interface KduPrepareOptions {
  today: string;
  fontBytes: Uint8Array;
  /** TEST-ONLY: accept a synthetic fixture with the same native schema but another hash. */
  allowFixtureForTesting?: boolean;
}

const FONT_SIZE = 9;
const PADDING = 4;

export async function prepareAnlageKdu(templateBytes: Uint8Array, answers: KduAnswers, opts: KduPrepareOptions): Promise<KduPrepareResult> {
  const validation = validateKduAnswers(answers, opts.today);
  if (validation.length) return { ok: false, code: "VALIDATION_FAILED", validation };

  const manifest = opts.allowFixtureForTesting ? { ...KDU_MANIFEST, sha256: undefined } : KDU_MANIFEST;
  const pf = await preflightPdfTemplate(templateBytes, manifest);
  if (!pf.allowed) return { ok: false, code: "PREFLIGHT_FAILED", preflight: pf.issues };
  if (pf.unexpectedFields.length) return { ok: false, code: "UNEXPECTED_FIELDS", fields: pf.unexpectedFields };
  const edition = KDU_EDITIONS.find((e) => e.sha256 === pf.sha256);
  if (!opts.allowFixtureForTesting && edition?.status !== "current_verified") return { ok: false, code: "EDITION_NOT_CURRENT" };

  const fills = buildKduFills(answers);
  const bad = fills.filter((x) => !(x.name in KDU_FIELDS) || KDU_NEVER_FILL.includes(x.name)).map((x) => x.name);
  if (bad.length) return { ok: false, code: "UNMAPPED_FIELD", fields: bad };

  const doc = await PDFDocument.load(templateBytes.slice(), { updateMetadata: false });
  const form = doc.getForm();
  for (const name of ["rbtnWohneinheit", "rbtnMieteDirekt", "rbtnBrenstoff"]) {
    const opts2 = form.getRadioGroup(name).getOptions().slice().sort().join("|");
    if (opts2 !== [...KDU_RADIO_OPTIONS].sort().join("|")) return { ok: false, code: "RADIO_OPTION_MISMATCH", fields: [name] };
  }
  let uf;
  try { uf = await embedUnicodeFont(doc, opts.fontBytes); } catch { return { ok: false, code: "FONT_UNAVAILABLE" }; }

  const unsupported: string[] = [], overflow: string[] = [];
  for (const x of fills) {
    if (x.type !== "text") continue;
    if (uf.missingGlyphs(x.value).length) { unsupported.push(x.name); continue; }
    const widgets = form.getTextField(x.name).acroField.getWidgets();
    if (widgets.length !== 1) { overflow.push(x.name); continue; }
    if (uf.font.widthOfTextAtSize(x.value, FONT_SIZE) > widgets[0].getRectangle().width - PADDING) overflow.push(x.name);
  }
  if (unsupported.length) return { ok: false, code: "UNSUPPORTED_GLYPHS", fields: unsupported.sort() };
  if (overflow.length) return { ok: false, code: "TEXT_OVERFLOW", fields: overflow.sort() };

  for (const x of fills) {
    if (x.type === "text") { const tf = form.getTextField(x.name); tf.setText(x.value); tf.setFontSize(FONT_SIZE); }
    else if (x.type === "check") form.getCheckBox(x.name).check();
    else form.getRadioGroup(x.name).select(x.value);
  }
  form.updateFieldAppearances(uf.font);
  const bytes = await doc.save({ updateFieldAppearances: false });

  // Read-back: mapped fields equal intended values; all other fields empty/unset.
  const back = (await PDFDocument.load(bytes, { updateMetadata: false })).getForm();
  const expected = new Map<string, string | boolean>(fills.map((x) => [x.name, x.type === "check" ? true : x.value]));
  const mismatch: string[] = [];
  for (const name of Object.keys(KDU_FIELDS)) {
    const fld = back.getField(name);
    const want = expected.get(name);
    let got: string | boolean | undefined;
    if (fld instanceof PDFTextField) got = fld.getText() ?? "";
    else if (fld instanceof PDFCheckBox) got = fld.isChecked();
    else if (fld instanceof PDFRadioGroup) got = fld.getSelected() ?? "";
    const ok = want === undefined ? got === "" || got === false : got === want;
    if (!ok) mismatch.push(name);
  }
  if (back.getFields().length !== Object.keys(KDU_FIELDS).length) mismatch.push("__field_count__");
  if (mismatch.length) return { ok: false, code: "READBACK_MISMATCH", fields: mismatch.sort() };
  return { ok: true, bytes, edition: edition?.version ?? "fixture", filledFields: fills.length };
}
