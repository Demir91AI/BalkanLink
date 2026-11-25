/**
 * FormularPilot — BA "Anlage SV" (Sozialversicherung), edition Jobcenter-SV 10/2026.
 * DEVELOPMENT ONLY and OFF by default. The user supplies their own official copy; the PDF
 * is never bundled, proxied or hosted. Filling runs in browser memory via the shared
 * strict engine. Signature dates are never filled.
 *
 * Conditional rules (from the printed form text, page 1–2):
 * - Q8–Q10 are always answered ja/nein.
 * - Q11 only when the person in section B has completed age 55 (on the fill date); otherwise blank.
 * - Section D (Q12 Zuschuss) is offered only when any of Q8–Q11 is "ja"; with all "nein"
 *   the form states compulsory statutory insurance applies, so Q12 stays blank (conservative).
 */
import type { PdfTemplateManifest, PreflightIssue } from "@/lib/pdf-preflight";
import { fillStrictAcroForm, blank, RX, isoDateValid, isoToDe, isPilotEnabled, type StrictEdition, type StrictFill, type StrictFormSpec } from "../engine/strict-acroform";

export const SV_OFFICIAL_URL = "https://www.arbeitsagentur.de/datei/anlagesv_ba033005.pdf";
export const SV_HINTS_URL = "https://www.arbeitsagentur.de/link/antragshinweise";
export const SV_SOURCE = "Bundesagentur für Arbeit · Anlage SV (Jobcenter-SV 10/2026)";

export const SV_EDITIONS: StrictEdition[] = [{
  version: "Anlage SV BA 10/2026",
  sha256: "c24b142bf60865018067a018413dbfbc39a0a009de1a48891bb3ef57364dd7ab",
  status: "current_verified",
  evidence: "Downloaded 2026-11-25 from SV_OFFICIAL_URL (HTTP 200); 2 pages, footer 'Jobcenter-SV - 10/2026', AcroForm, not encrypted, no /XFA; 14 fields read with pdf-lib; full hash equals 2026-10-28 inventory",
  checkedAt: "2026-11-25",
}];

export const SV_RIGHTS = { status: "unresolved" as const, note: "BA imprint reserves copying/distribution; same open questions as KDU_RIGHTS." };

export const SV_PRODUCTION_ENABLED = false;
export function isSvPilotEnabled(env: { DEV?: boolean; VITE_FORMULARPILOT_SV?: string } = import.meta.env): boolean {
  return isPilotEnabled(SV_PRODUCTION_ENABLED, env.VITE_FORMULARPILOT_SV, env.DEV);
}

const T = "text", R = "radio";
export const SV_FIELDS = {
  txtfPersonVorname: T, txtfPersonNachname: T, datePersonGebDatum: T, txtfBGNr: T,
  txtfBGVorname: T, txtfBGNachname: T, dateBGGebDatum: T,
  rbtnPKV: R, rbtnSelbstaendig: R, rbtnBeihilfe: R, rbtnVersFrei: R, rbtnKVPVZuschuss: R,
  dateUnterschriftPerson: T, dateUnterschriftBetreuer: T,
} as const;
export type SvFieldName = keyof typeof SV_FIELDS;
export const SV_NEVER_FILL: SvFieldName[] = ["dateUnterschriftPerson", "dateUnterschriftBetreuer"];

const YN = ["ja", "nein"] as const;
/** Exact native "ja" export value of rbtnKVPVZuschuss in the original (read 2026-11-25). */
export const SV_ZUSCHUSS_JA = "ja, fuegen Sie den aktuellen Bescheid ueber die monatlichen Beitraege sowie bei privater Versicherung einen Nachweis ueber den Beitrag, den Sie im Basistarif zahlen wuerden, bei";

export const SV_MANIFEST: PdfTemplateManifest = { formKey: "anlage-sv", version: SV_EDITIONS[0].version, sha256: SV_EDITIONS[0].sha256, fields: { ...SV_FIELDS } };

export type YesNo = "ja" | "nein";
export interface SvAnswers {
  vorname: string; nachname: string; geburtsdatum: string; bgNr?: string;
  bVorname: string; bNachname: string; bGeburtsdatum: string;
  pkv?: YesNo; selbstaendig?: YesNo; beihilfe?: YesNo; versFrei?: YesNo; zuschuss?: YesNo;
}
export interface SvValidationError { field: string; code: string }

export function ageOn(iso: string, today: string): number {
  let a = Number(today.slice(0, 4)) - Number(iso.slice(0, 4));
  if (today.slice(5) < iso.slice(5)) a--;
  return a;
}
export function svNeedsQ11(a: Pick<SvAnswers, "bGeburtsdatum">, today: string) {
  return isoDateValid(a.bGeburtsdatum, today) && ageOn(a.bGeburtsdatum, today) >= 55;
}
export function svOffersZuschuss(a: SvAnswers) {
  return [a.pkv, a.selbstaendig, a.beihilfe, a.versFrei].includes("ja");
}

export function validateSvAnswers(a: SvAnswers, today: string): SvValidationError[] {
  const e: SvValidationError[] = [];
  const name = (f: string, v?: string, opt = false) => {
    if (blank(v)) { if (!opt) e.push({ field: f, code: "required" }); return; }
    if (RX.CTRL.test(v!) || v!.trim().length > 60) e.push({ field: f, code: "invalid_chars" });
  };
  const date = (f: string, v: string) => { if (blank(v)) e.push({ field: f, code: "required" }); else if (!isoDateValid(v, today)) e.push({ field: f, code: "date" }); };
  const yn = (f: string, v?: string) => { if (v !== "ja" && v !== "nein") e.push({ field: f, code: "required" }); };
  name("vorname", a.vorname); name("nachname", a.nachname); date("geburtsdatum", a.geburtsdatum); name("bgNr", a.bgNr, true);
  name("bVorname", a.bVorname); name("bNachname", a.bNachname); date("bGeburtsdatum", a.bGeburtsdatum);
  yn("pkv", a.pkv); yn("selbstaendig", a.selbstaendig); yn("beihilfe", a.beihilfe);
  if (svNeedsQ11(a, today)) yn("versFrei", a.versFrei);
  else if (a.versFrei) e.push({ field: "versFrei", code: "not_applicable" });
  if (svOffersZuschuss(a)) yn("zuschuss", a.zuschuss);
  else if (a.zuschuss) e.push({ field: "zuschuss", code: "not_applicable" });
  return e;
}

export function buildSvFills(a: SvAnswers): StrictFill<SvFieldName>[] {
  const f: StrictFill<SvFieldName>[] = [];
  const t = (name: SvFieldName, v?: string) => { if (!blank(v)) f.push({ name, type: "text", value: v!.trim().replace(/\s+/g, " ") }); };
  const r = (name: SvFieldName, v?: YesNo, ja = "ja") => { if (v) f.push({ name, type: "radio", value: v === "ja" ? ja : "nein" }); };
  t("txtfPersonVorname", a.vorname); t("txtfPersonNachname", a.nachname); t("datePersonGebDatum", isoToDe(a.geburtsdatum)); t("txtfBGNr", a.bgNr);
  t("txtfBGVorname", a.bVorname); t("txtfBGNachname", a.bNachname); t("dateBGGebDatum", isoToDe(a.bGeburtsdatum));
  r("rbtnPKV", a.pkv); r("rbtnSelbstaendig", a.selbstaendig); r("rbtnBeihilfe", a.beihilfe); r("rbtnVersFrei", a.versFrei);
  r("rbtnKVPVZuschuss", a.zuschuss, SV_ZUSCHUSS_JA);
  return f;
}

const SV_SPEC: StrictFormSpec<SvFieldName> = {
  fields: SV_FIELDS, manifest: SV_MANIFEST, editions: SV_EDITIONS, neverFill: SV_NEVER_FILL,
  radioOptions: { rbtnPKV: YN, rbtnSelbstaendig: YN, rbtnBeihilfe: YN, rbtnVersFrei: YN, rbtnKVPVZuschuss: [SV_ZUSCHUSS_JA, "nein"] },
  fontSize: 9, padding: 4,
};

export type SvPrepareResult =
  | { ok: true; bytes: Uint8Array; edition: string; filledFields: number }
  | { ok: false; code: string; validation?: SvValidationError[]; preflight?: PreflightIssue[]; fields?: string[] };

export async function prepareAnlageSv(templateBytes: Uint8Array, answers: SvAnswers, opts: { today: string; fontBytes: Uint8Array; allowFixtureForTesting?: boolean }): Promise<SvPrepareResult> {
  const validation = validateSvAnswers(answers, opts.today);
  if (validation.length) return { ok: false, code: "VALIDATION_FAILED", validation };
  return fillStrictAcroForm(SV_SPEC, templateBytes, buildSvFills(answers), opts);
}
