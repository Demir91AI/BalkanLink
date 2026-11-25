/**
 * FormularPilot — shared "Antrag auf Elterngeld für Geburten ab dem 01.04.2025" (BMFSFJ, ModDate 2025-08-21).
 * STAGE 1 OF A STAGED SLICE. DEVELOPMENT ONLY, OFF by default, production hard-disabled, NOT wired into any page.
 *
 * Jurisdiction is never inferred from bytes: the user must choose the Land explicitly, and only Länder whose
 * official publisher page served this exact full SHA-256 on the revalidation date are accepted.
 * Thüringen is excluded: on 2026-11-25 its official URL returned a CAPTCHA page instead of the PDF (unverified).
 *
 * The form has 23 pages / 531 native fields. Stage 1 maps only section 1 (Angaben zum Kind, page 1).
 * Because the mapping is incomplete, the public entry point ALWAYS refuses to produce a PDF
 * (MAPPING_INCOMPLETE) — an incomplete official application is never offered as finished.
 * Cases requiring separate official attachments (Anlage "Staatsangehörigkeit", "Wohnsitz im Ausland",
 * "Einkünfte neben dem Elterngeld") are out of scope and fail closed until those originals are verified.
 */
import { fillStrictAcroForm, blank, isoDateValid, isoToDe, isPilotEnabled, type StrictEdition, type StrictFill, type StrictFormSpec, type StrictFillOptions } from "../engine/strict-acroform";
import type { PdfTemplateManifest } from "@/lib/pdf-preflight";
import { EG_FIELDS, EG_RADIO_OPTIONS } from "./elterngeld-shared-2025.fields";

export const EG_SHA256 = "e3735fd8516188073377c7b931dfc096e26c76ffdf385db5c68cb0c11ab0feff";
export const EG_MIN_BIRTH = "2025-04-01";

export type EgLand = "BB" | "HH" | "RP" | "SH" | "TH";
/** Official publisher sources revalidated 2026-11-25 (HTTP 200, %PDF, full hash compared). */
export const EG_LAND_SOURCES: Record<EgLand, { url: string; status: "verified" | "unverified"; evidence: string }> = {
  BB: { url: "https://www.brandenburg.de/media_fast/4/1_Einheitlicher_Elterngeldantrag_2025.pdf", status: "verified", evidence: "2026-11-25: 3,345,804 bytes, sha256 = EG_SHA256" },
  HH: { url: "https://fhh1.hamburg.de/Dibis/form/pdf/Antrag_auf_Elterngeld_fuer_Geburten_ab_dem_01.04.2025_Stand_08_25.pdf", status: "verified", evidence: "2026-11-25: 3,345,804 bytes, sha256 = EG_SHA256" },
  RP: { url: "https://mffki.rlp.de/fileadmin/07/Dokumente/Themen/Familie/Gute_Zukunft_fuer_alle_Kinder_und_Eltern/Elterngeld/2025_08_1_Einheitlicher_Elterngeldantrag.pdf", status: "verified", evidence: "2026-11-25: 3,345,804 bytes, sha256 = EG_SHA256" },
  SH: { url: "https://www.schleswig-holstein.de/DE/landesregierung/ministerien-behoerden/LASG/Aufgaben/KinderUndEltern/Download/1_EinheitlicherElterngeldantrag.pdf?__blob=publicationFile&v=3", status: "verified", evidence: "2026-11-25: 3,345,804 bytes, sha256 = EG_SHA256" },
  TH: { url: "https://landesverwaltungsamt.thueringen.de/fileadmin/TLVwA/Versorgung_und_Integration/Elterngeld/Antrag_auf_Elterngeld__092025__fuer_Geburten_ab_01.04.2025.pdf", status: "unverified", evidence: "2026-11-25: official URL returned a CAPTCHA HTML page (not a PDF); 2026-11-25 audit hash not re-confirmed" },
};

export const EG_EDITIONS: StrictEdition[] = [{
  version: "Elterngeldantrag Geburten ab 01.04.2025 (Stand 08/2025)", sha256: EG_SHA256, status: "current_verified",
  evidence: "Page 1 title 'Antrag auf Elterngeld für Geburten ab dem 01.04.2025'; ModDate 2025-08-21; 23 pages; AcroForm 531 fields (144 text, 387 buttons); not encrypted; no XFA",
  checkedAt: "2026-11-25",
}];
export const EG_RIGHTS = { status: "unresolved" as const, note: "Publisher reuse rights (BMFSFJ / Länder) not confirmed." };

export const EG_PRODUCTION_ENABLED = false;
/** False until every applicant-fillable section is mapped, reviewed and read-back tested. */
export const EG_MAPPING_COMPLETE = false;
export const EG_STAGES = [
  { id: 1, sections: ["1 Angaben zum Kind"], pages: [1], status: "mapped" },
  { id: 2, sections: ["2 Angaben zu den Eltern", "3 Beziehung zum Kind", "4 Weitere Kinder", "Anlage Staatsangehörigkeit (HH/SH/RP)"], pages: [2, 3, 4, 5, 6, 7, 8], status: "mapped" },
  { id: 3, sections: ["6 Bemessungszeitraum", "7 Einkommen vor der Geburt", "8 Einkommensersatzleistungen", "9 Mutterschaftsleistungen"], pages: [9, 10, 11, 12, 13, 14, 15, 16], status: "inventoried" },
  { id: 4, sections: ["10–11 Bezugsmonate (Planer, 164 Felder)", "12 Einkommen während des Bezugs"], pages: [17, 18, 19, 20, 21], status: "inventoried" },
  { id: 5, sections: ["13 Bankverbindung, Kontakt, Unterschriften"], pages: [21, 22, 23], status: "inventoried" },
] as const;

export function isElterngeldPilotEnabled(env: { DEV?: boolean; VITE_FORMULARPILOT_ELTERNGELD?: string } = import.meta.env): boolean {
  return isPilotEnabled(EG_PRODUCTION_ENABLED, env.VITE_FORMULARPILOT_ELTERNGELD, env.DEV);
}

export type EgFieldName = keyof typeof EG_FIELDS;
/** Authority-only and signature place/date fields are never filled. */
export const EG_NEVER_FILL: EgFieldName[] = ["Behördenadresse", "13c Ort AS", "13c Datum AS", "13c Ort 2E", "13c Datum 2E", "13c Ort Vertr AS", "13c Datum Vertr AS", "13c Ort Vertr 2E", "13c Datum Vertr 2E"];

export const EG_MANIFEST: PdfTemplateManifest = { formKey: "elterngeld-shared-2025", version: EG_EDITIONS[0].version, sha256: EG_SHA256, fields: { ...EG_FIELDS } };
export const EG_SPEC: StrictFormSpec<EgFieldName> = {
  fields: EG_FIELDS as Record<EgFieldName, "text" | "checkbox" | "radio">, manifest: EG_MANIFEST, editions: EG_EDITIONS,
  neverFill: EG_NEVER_FILL, radioOptions: EG_RADIO_OPTIONS as Partial<Record<EgFieldName, readonly string[]>>,
};

/** Stage 1 semantics (page 1, section 1). Text: "Tag Monat Jahr" boxes accept TT.MM.JJJJ. */
export interface EgChildAnswers {
  vorname: string; nachname: string; geburtsdatum: string;
  /** Total children born (multiples). 1 = no multiples → field left blank as instructed. */
  anzahl: number;
  /** "mindestens 6 Wochen vor dem errechneten Geburtstermin" → requires the calculated date. */
  fruehgeboren: boolean; errechneterTermin?: string;
  behinderung: boolean;
}
export interface EgContext { land: EgLand | ""; today: string }
export type EgBlock =
  | "LAND_REQUIRED" | "LAND_UNVERIFIED" | "BIRTH_BEFORE_EDITION" | "INVALID_INPUT" | "MAPPING_INCOMPLETE" | "PRODUCTION_DISABLED";
export interface EgError { field: string; code: string }

export function checkJurisdiction(ctx: EgContext, birthIso: string): EgBlock | null {
  if (!ctx.land) return "LAND_REQUIRED";
  if (EG_LAND_SOURCES[ctx.land]?.status !== "verified") return "LAND_UNVERIFIED";
  if (!isoDateValid(birthIso, ctx.today)) return "INVALID_INPUT";
  if (birthIso < EG_MIN_BIRTH) return "BIRTH_BEFORE_EDITION";
  return null;
}

export function validateChild(a: EgChildAnswers, today: string): EgError[] {
  const e: EgError[] = [];
  if (blank(a.vorname)) e.push({ field: "vorname", code: "required" });
  if (blank(a.nachname)) e.push({ field: "nachname", code: "required" });
  if (!isoDateValid(a.geburtsdatum, today)) e.push({ field: "geburtsdatum", code: "date" });
  if (!Number.isInteger(a.anzahl) || a.anzahl < 1 || a.anzahl > 9) e.push({ field: "anzahl", code: "range" });
  if (a.fruehgeboren) {
    const t = a.errechneterTermin ?? "";
    if (!/^\d{4}-\d{2}-\d{2}$/.test(t) || Number.isNaN(Date.parse(t))) e.push({ field: "errechneterTermin", code: "date" });
    // ≥ 6 weeks (42 days) before the calculated date, as printed on the form.
    else if (isoDateValid(a.geburtsdatum, today) && (Date.parse(t) - Date.parse(a.geburtsdatum)) / 86400000 < 42) e.push({ field: "errechneterTermin", code: "not_6_weeks" });
  } else if (a.errechneterTermin) e.push({ field: "errechneterTermin", code: "only_if_premature" });
  return e;
}

export function childFills(a: EgChildAnswers): StrictFill<EgFieldName>[] {
  const f: StrictFill<EgFieldName>[] = [
    { name: "1a Vorname(n)", type: "text", value: a.vorname.trim() },
    { name: "1a Nachname", type: "text", value: a.nachname.trim() },
    { name: "1b Geburtsdatum Jahr", type: "text", value: isoToDe(a.geburtsdatum) },
  ];
  if (a.anzahl > 1) f.push({ name: "1a Anzahl der Kinder", type: "text", value: String(a.anzahl) });
  if (a.fruehgeboren) f.push({ name: "1b Früh geboren", type: "check" }, { name: "1b Errechneter Geburtstermin Jahr", type: "text", value: isoToDe(a.errechneterTermin!) });
  if (a.behinderung) f.push({ name: "1b Behinderung", type: "check" });
  return f;
}

/** Public entry point. Fails closed: until EG_MAPPING_COMPLETE it never returns PDF bytes. */
export async function prepareElterngeldShared(_bytes: Uint8Array, child: EgChildAnswers, ctx: EgContext): Promise<{ ok: false; code: EgBlock; errors?: EgError[] }> {
  const j = checkJurisdiction(ctx, child.geburtsdatum);
  if (j) return { ok: false, code: j };
  const errors = validateChild(child, ctx.today);
  if (errors.length) return { ok: false, code: "INVALID_INPUT", errors };
  if (!EG_MAPPING_COMPLETE) return { ok: false, code: "MAPPING_INCOMPLETE" };
  return { ok: false, code: "PRODUCTION_DISABLED" };
}

/** TEST-ONLY: stage 1 + 2 fills through the strict engine. */
export function fillStage2ForTesting(bytes: Uint8Array, child: EgChildAnswers, h: import("./elterngeld-shared-2025-parents").HouseholdAnswers, opts: StrictFillOptions) {
  return import("./elterngeld-shared-2025-parents").then((m) => fillStrictAcroForm(EG_SPEC, bytes, [...childFills(child), ...m.householdFills(h)], opts));
}

/** TEST-ONLY: exercises the stage-1 mapping through the strict engine (preflight, hash, read-back). */
export function fillStage1ForTesting(bytes: Uint8Array, child: EgChildAnswers, opts: StrictFillOptions) {
  return fillStrictAcroForm(EG_SPEC, bytes, childFills(child), opts);
}
