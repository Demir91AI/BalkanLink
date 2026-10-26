/**
 * FormularPilot — BAMF 630.007 "Antrag auf Zulassung zur Teilnahme am Integrationskurs".
 * DEVELOPMENT ONLY. Not wired into the live page (src/pages/muster/IntegrationskursMuster.tsx).
 *
 * Pipeline (fail-closed at every step):
 *   validate answers -> preflight template (hash + native fields) -> edition gate
 *   -> fill (exact native field names, no guessing) -> text-fit check -> read-back of ALL fields.
 * The signature is never filled. The user reviews, prints, signs and sends it.
 * Output messages are codes (i18n keys later), never user data in reports.
 */
import { PDFDocument, PDFTextField, PDFCheckBox, StandardFonts } from "pdf-lib";
import { preflightPdfTemplate, type PdfTemplateManifest, type PreflightIssue } from "@/lib/pdf-preflight";
import type { FieldFill } from "@/lib/pdf-form-engine";

/* ---------------- provenance / editions ---------------- */

export const IK_OFFICIAL_PAGE_URL =
  "https://www.bamf.de/SharedDocs/Anlagen/DE/Integration/Integrationskurse/Kursteilnehmer/AntraegeAlle/630-007_antrag-zulassung-integrationskurs-ausl_pdf.html?nn=453250";

export interface IkEdition {
  version: string;
  sha256?: string;
  /** "current_verified" is the ONLY status the production gate accepts. */
  status: "current_verified" | "superseded" | "not_obtained";
  evidence: string;
  checkedAt: string;
}

export const IK_EDITIONS: IkEdition[] = [
  {
    version: "KNr. 630.007w BAMF 01/2026",
    sha256: "53462fffb5e68585045704e230b8aa6314f4ded4b0ec39d5443d29e2a317e91f",
    status: "superseded",
    evidence: "bundled public/muster/integrationskurs-bamf-630007.pdf; footer 630.007w 01/2026, Stand Januar 2026, AcroForm, not encrypted, Adobe PDF Library 24.2",
    checkedAt: "2026-10-26",
  },
  {
    version: "KNr. 630.007x BAMF 07/2026",
    status: "not_obtained",
    evidence: "BAMF form page shows Datum 22.07.2026; PDF download returned 404/timeout on 2026-10-26; hash and fields unknown",
    checkedAt: "2026-10-26",
  },
];

/* ---------------- native field schema (read from PDF, not invented) ---------------- */

export const IK_F = {
  traeger: "Falls der Antrag über einen Kursträger gestellt wird bitte Namen und Trägerkennung eintragen",
  name: "Name",
  vorname: "Vorname",
  geburtsname: "Ggf Geburtsname",
  geburtsdatum: "Geburtsdatum",
  m: "männlich",
  w: "weiblich",
  d: "divers",
  strasse: "Straße und Hausnummer",
  plz: "Postleitzahl",
  ort: "Ort",
  co: "Ggf wohnhaft bei co",
  email: "EMail optional",
  staat: "Staatsangehörigkeit",
  einreise: "Jahr der Einreise optional",
  stAsyl: "Ich bin Asylbewerberin oder Asylbewerber",
  stDuldung: "Ich besitze eine Duldung nach  60a Abs 2 S 3 AufenthG eine Ausbildungsduldung nach  60c",
  stAe24_25: "Ich besitze eine Aufenthaltserlaubnis gemäß  24 AufenthG oder  25 Abs 5 AufenthG",
  stDeutsch: "Ich besitze die deutsche Staatsangehörigkeit verfüge nicht über ausreichende Kenntnisse der",
  stEu: "Ich bin Staatsangehörige oder Staatsangehöriger eines Mitgliedstaates der EU",
  stSonstig: "Ich bin sonstiger Ausländer oder sonstige Ausländerin z B Ich besitze einen Aufenthaltstitel",
  ortDatum1: "Ort Datum",
  kbSgb2: "Leistungen nach SGB II Bürgergeld oder SGB III Arbeitslosengeld",
  kbSgb12: "Leistungen nach SGB XII Leistungen zum Lebensunterhalt",
  kbBeschaeftigt: "ich bin beschäftigt und mein Bruttoentgelt übersteigt nicht",
  kbKinder: "Anzahl der gegebenenfalls berücksichtigungsfähigen Kinder an",
  kbSonstig: "ich bin aus sonstigen Gründen finanziell bedürftig",
  ortDatum2: "Ort Datum_2",
} as const;

const CHECKBOXES = new Set<string>([
  IK_F.m, IK_F.w, IK_F.d, IK_F.stAsyl, IK_F.stDuldung, IK_F.stAe24_25, IK_F.stDeutsch, IK_F.stEu,
  IK_F.stSonstig, IK_F.kbSgb2, IK_F.kbSgb12, IK_F.kbBeschaeftigt, IK_F.kbSonstig,
]);

export const IK_MANIFEST: PdfTemplateManifest = {
  formKey: "bamf-630.007",
  version: IK_EDITIONS[0].version,
  sha256: IK_EDITIONS[0].sha256,
  fields: Object.fromEntries(
    Object.values(IK_F).map((n) => [n, CHECKBOXES.has(n) ? "checkbox" : "text"]),
  ) as PdfTemplateManifest["fields"],
};

/* ---------------- questionnaire answers ---------------- */

export type IkStatus = "asyl" | "duldung" | "ae_24" | "ae_25_5" | "deutsch" | "eu" | "sonstig";
export type IkKostenGrund = "sgb2_3" | "sgb12" | "beschaeftigt" | "sonstig";

export interface IkAnswers {
  traeger?: string;
  familienname: string;
  vorname: string;
  geburtsname?: string;
  /** ISO yyyy-mm-dd */
  geburtsdatum: string;
  geschlecht: "" | "m" | "w" | "d";
  strasse: string;
  plz: string;
  ort: string;
  co?: string;
  email?: string;
  staatsangehoerigkeit: string;
  einreiseJahr?: string;
  /** Exactly one status; §24 and §25(5) are asked separately (cost rules differ). */
  status: IkStatus | "";
  declKeineSchulischeAusbildung: boolean;
  declAngabenRichtig: boolean;
  declEinwilligung: boolean;
  /** Optional page 2. Undefined = user does not apply for cost exemption. */
  kostenbefreiung?: { grund: IkKostenGrund | ""; kinderAnzahl?: string; declAngabenRichtig: boolean };
  unterschriftOrt: string;
  /** ISO date the user will sign. */
  unterschriftDatum: string;
}

export type IkErrorCode =
  | "REQUIRED" | "INVALID_DATE" | "DATE_IN_FUTURE" | "IMPLAUSIBLE_BIRTHDATE" | "INVALID_PLZ"
  | "INVALID_EMAIL" | "INVALID_YEAR" | "DECLARATION_REQUIRED" | "COST_EXEMPTION_NOT_NEEDED"
  | "INVALID_CHILD_COUNT" | "CHILD_COUNT_NOT_APPLICABLE" | "SIGNATURE_BEFORE_BIRTH";

export interface IkValidationError { field: keyof IkAnswers | "kostenbefreiung.grund" | "kostenbefreiung.kinderAnzahl" | "kostenbefreiung.declAngabenRichtig"; code: IkErrorCode }

const ISO = /^(\d{4})-(\d{2})-(\d{2})$/;
function parseIso(s: string): Date | null {
  const m = ISO.exec(s ?? "");
  if (!m) return null;
  const d = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]));
  return d.getUTCFullYear() === +m[1] && d.getUTCMonth() === +m[2] - 1 && d.getUTCDate() === +m[3] ? d : null;
}
const toDe = (iso: string) => { const m = ISO.exec(iso)!; return `${m[3]}.${m[2]}.${m[1]}`; };
const blank = (s?: string) => !s || !s.trim();

/** Statuses for which the course is always free (page 2 of the form): no exemption request. */
const ALWAYS_FREE: IkStatus[] = ["asyl", "duldung", "ae_25_5"];

export function validateIkAnswers(a: IkAnswers, today: string): IkValidationError[] {
  const e: IkValidationError[] = [];
  const now = parseIso(today);
  if (!now) throw new Error("today must be ISO yyyy-mm-dd");
  const req = (f: keyof IkAnswers) => { if (blank(a[f] as string)) e.push({ field: f, code: "REQUIRED" }); };
  (["familienname", "vorname", "strasse", "plz", "ort", "staatsangehoerigkeit", "unterschriftOrt"] as const).forEach(req);
  if (!a.geschlecht) e.push({ field: "geschlecht", code: "REQUIRED" });
  if (!a.status) e.push({ field: "status", code: "REQUIRED" });

  const dob = parseIso(a.geburtsdatum);
  if (blank(a.geburtsdatum)) e.push({ field: "geburtsdatum", code: "REQUIRED" });
  else if (!dob) e.push({ field: "geburtsdatum", code: "INVALID_DATE" });
  else if (dob > now) e.push({ field: "geburtsdatum", code: "DATE_IN_FUTURE" });
  else if (now.getUTCFullYear() - dob.getUTCFullYear() > 120) e.push({ field: "geburtsdatum", code: "IMPLAUSIBLE_BIRTHDATE" });

  const sig = parseIso(a.unterschriftDatum);
  if (blank(a.unterschriftDatum)) e.push({ field: "unterschriftDatum", code: "REQUIRED" });
  else if (!sig) e.push({ field: "unterschriftDatum", code: "INVALID_DATE" });
  else if (sig > now) e.push({ field: "unterschriftDatum", code: "DATE_IN_FUTURE" });
  else if (dob && sig < dob) e.push({ field: "unterschriftDatum", code: "SIGNATURE_BEFORE_BIRTH" });

  if (!blank(a.plz) && !/^\d{5}$/.test(a.plz.trim())) e.push({ field: "plz", code: "INVALID_PLZ" });
  if (!blank(a.email) && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(a.email!.trim())) e.push({ field: "email", code: "INVALID_EMAIL" });
  if (!blank(a.einreiseJahr)) {
    const y = Number(a.einreiseJahr);
    if (!/^\d{4}$/.test(a.einreiseJahr!.trim()) || y < 1900 || y > now.getUTCFullYear() || (dob && y < dob.getUTCFullYear()))
      e.push({ field: "einreiseJahr", code: "INVALID_YEAR" });
  }
  if (!a.declKeineSchulischeAusbildung) e.push({ field: "declKeineSchulischeAusbildung", code: "DECLARATION_REQUIRED" });
  if (!a.declAngabenRichtig) e.push({ field: "declAngabenRichtig", code: "DECLARATION_REQUIRED" });
  if (!a.declEinwilligung) e.push({ field: "declEinwilligung", code: "DECLARATION_REQUIRED" });

  const kb = a.kostenbefreiung;
  if (kb) {
    if (a.status && ALWAYS_FREE.includes(a.status)) e.push({ field: "kostenbefreiung", code: "COST_EXEMPTION_NOT_NEEDED" });
    if (!kb.grund) e.push({ field: "kostenbefreiung.grund", code: "REQUIRED" });
    if (kb.grund === "beschaeftigt") {
      if (blank(kb.kinderAnzahl)) e.push({ field: "kostenbefreiung.kinderAnzahl", code: "REQUIRED" });
      else if (!/^\d{1,2}$/.test(kb.kinderAnzahl!.trim())) e.push({ field: "kostenbefreiung.kinderAnzahl", code: "INVALID_CHILD_COUNT" });
    } else if (!blank(kb.kinderAnzahl)) e.push({ field: "kostenbefreiung.kinderAnzahl", code: "CHILD_COUNT_NOT_APPLICABLE" });
    if (!kb.declAngabenRichtig) e.push({ field: "kostenbefreiung.declAngabenRichtig", code: "DECLARATION_REQUIRED" });
  }
  return e;
}

/* ---------------- mapping ---------------- */

const STATUS_FIELD: Record<IkStatus, string> = {
  asyl: IK_F.stAsyl, duldung: IK_F.stDuldung, ae_24: IK_F.stAe24_25, ae_25_5: IK_F.stAe24_25,
  deutsch: IK_F.stDeutsch, eu: IK_F.stEu, sonstig: IK_F.stSonstig,
};
const KOSTEN_FIELD: Record<IkKostenGrund, string> = {
  sgb2_3: IK_F.kbSgb2, sgb12: IK_F.kbSgb12, beschaeftigt: IK_F.kbBeschaeftigt, sonstig: IK_F.kbSonstig,
};

/** Deterministic mapping of VALID answers to native fields. Blank optionals are left empty. */
export function buildIkFills(a: IkAnswers): FieldFill[] {
  const f: FieldFill[] = [];
  const t = (name: string, v?: string) => { if (!blank(v)) f.push({ name, type: "text", value: v!.trim() }); };
  t(IK_F.traeger, a.traeger);
  t(IK_F.name, a.familienname);
  t(IK_F.vorname, a.vorname);
  t(IK_F.geburtsname, a.geburtsname);
  t(IK_F.geburtsdatum, toDe(a.geburtsdatum));
  f.push({ name: a.geschlecht === "m" ? IK_F.m : a.geschlecht === "w" ? IK_F.w : IK_F.d, type: "check" });
  t(IK_F.strasse, a.strasse);
  t(IK_F.plz, a.plz);
  t(IK_F.ort, a.ort);
  t(IK_F.co, a.co);
  t(IK_F.email, a.email);
  t(IK_F.staat, a.staatsangehoerigkeit);
  t(IK_F.einreise, a.einreiseJahr);
  f.push({ name: STATUS_FIELD[a.status as IkStatus], type: "check" });
  const ortDatum = `${a.unterschriftOrt.trim()}, ${toDe(a.unterschriftDatum)}`;
  t(IK_F.ortDatum1, ortDatum);
  if (a.kostenbefreiung) {
    f.push({ name: KOSTEN_FIELD[a.kostenbefreiung.grund as IkKostenGrund], type: "check" });
    if (a.kostenbefreiung.grund === "beschaeftigt") t(IK_F.kbKinder, a.kostenbefreiung.kinderAnzahl);
    t(IK_F.ortDatum2, ortDatum);
  }
  return f;
}

/* ---------------- prepare (fail-closed) ---------------- */

export type IkBlockCode =
  | "VALIDATION_FAILED" | "PREFLIGHT_FAILED" | "EDITION_NOT_CURRENT" | "TEXT_OVERFLOW" | "READBACK_MISMATCH";

export interface IkInstructions {
  attachments: string[];
  signatures: string[];
  delivery: {
    status: "requires_official_lookup";
    reason: "bamf_regional_office_or_course_provider_not_verified";
    sourceUrl: string;
  };
  userMustReview: true;
}

export type IkPrepareResult =
  | { ok: true; bytes: Uint8Array; edition: string; filledFields: number; instructions: IkInstructions }
  | {
      ok: false; code: IkBlockCode; validation?: IkValidationError[];
      preflight?: PreflightIssue[]; fields?: string[];
    };

export interface IkPrepareOptions {
  today: string;
  /**
   * TEST-ONLY: accept an edition that is not "current_verified" (e.g. the superseded
   * bundled 01/2026). Production must never set this.
   */
  allowNonCurrentEditionForTesting?: boolean;
}

export function ikInstructions(a: IkAnswers): IkInstructions {
  const attachments = ["copy_of_identity_or_residence_document"];
  const signatures = ["page1_signature"];
  if (a.kostenbefreiung) {
    attachments.push(
      a.kostenbefreiung.grund === "sgb2_3" || a.kostenbefreiung.grund === "sgb12" ? "copy_current_benefit_notice"
        : a.kostenbefreiung.grund === "beschaeftigt" ? "copy_current_payslip_or_contract_and_child_allowance_proof"
          : "copy_hardship_proof",
    );
    signatures.push("page2_signature");
  }
  return {
    attachments, signatures, userMustReview: true,
    delivery: { status: "requires_official_lookup", reason: "bamf_regional_office_or_course_provider_not_verified", sourceUrl: IK_OFFICIAL_PAGE_URL },
  };
}

const FONT_SIZE = 10;
const PADDING = 4;

export async function prepareIk630007(
  templateBytes: Uint8Array, answers: IkAnswers, opts: IkPrepareOptions,
): Promise<IkPrepareResult> {
  const validation = validateIkAnswers(answers, opts.today);
  if (validation.length) return { ok: false, code: "VALIDATION_FAILED", validation };

  const pf = await preflightPdfTemplate(templateBytes, IK_MANIFEST);
  if (!pf.allowed) return { ok: false, code: "PREFLIGHT_FAILED", preflight: pf.issues };

  const edition = IK_EDITIONS.find((e) => e.sha256 === pf.sha256);
  if (!edition || (edition.status !== "current_verified" && !opts.allowNonCurrentEditionForTesting))
    return { ok: false, code: "EDITION_NOT_CURRENT" };

  const doc = await PDFDocument.load(templateBytes.slice(), { updateMetadata: false });
  const form = doc.getForm();
  const helv = await doc.embedFont(StandardFonts.Helvetica);
  const fills = buildIkFills(answers);

  // Text-fit check against the real widget width (no silent truncation).
  const overflow: string[] = [];
  for (const fill of fills) {
    if (fill.type !== "text") continue;
    const w = form.getTextField(fill.name).acroField.getWidgets()[0].getRectangle().width - PADDING;
    const measurable = (fill.value ?? "").replace(/[^\x20-\x7E\u00A0-\u00FF]/g, "W");
    if (helv.widthOfTextAtSize(measurable, FONT_SIZE) > w) overflow.push(fill.name);
  }
  if (overflow.length) return { ok: false, code: "TEXT_OVERFLOW", fields: overflow };

  for (const fill of fills) {
    if (fill.type === "text") form.getTextField(fill.name).setText(fill.value ?? "");
    else form.getCheckBox(fill.name).check();
  }
  const bytes = await doc.save({ updateFieldAppearances: false });

  // Read-back: every mapped field must equal the intended value; every other field must be empty.
  const back = (await PDFDocument.load(bytes, { updateMetadata: false })).getForm();
  const expected = new Map(fills.map((f) => [f.name, f.type === "text" ? f.value ?? "" : true]));
  const mismatch: string[] = [];
  for (const field of back.getFields()) {
    const name = field.getName();
    const want = expected.get(name);
    if (field instanceof PDFTextField) {
      if ((field.getText() ?? "") !== (typeof want === "string" ? want : "")) mismatch.push(name);
    } else if (field instanceof PDFCheckBox) {
      if (field.isChecked() !== (want === true)) mismatch.push(name);
    }
  }
  for (const name of expected.keys()) if (!back.getFields().some((f) => f.getName() === name)) mismatch.push(name);
  if (mismatch.length) return { ok: false, code: "READBACK_MISMATCH", fields: mismatch.sort() };

  return { ok: true, bytes, edition: edition.version, filledFields: fills.length, instructions: ikInstructions(answers) };
}
