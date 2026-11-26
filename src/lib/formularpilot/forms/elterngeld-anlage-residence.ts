/** Wohnsitz im Ausland, HH/RP August2025 originals inspected 26.11.2026.
 * SH publisher currently serves April2025 bytes; compatibility with August main unconfirmed.
 * Trigger is actual non-DE residence, never nationality. Employment answers transcribed,
 * not used to decide rights or competent Land. Main foreign cases remain blocked until
 * cross-document orchestration, authority scope and edition compatibility are verified.
 */
import { blank, isoDateValid, isoToDe, fillStrictAcroForm, type StrictFormSpec, type StrictFill, type StrictFillOptions } from "../engine/strict-acroform";
import type { EgLand, EgError } from "./elterngeld-shared-2025";
import type { StaInput } from "./elterngeld-anlage-staatsangehoerigkeit";
export const RESIDENCE_FIELDS = {
  "Geburtsdatum Kind Tag": "text", "AS Vorname": "text", "Vorname Kind": "text", "AS Nachname": "text", "Nachname Kind": "text",
  "2c Staat": "text", "2c Str": "text", "2c AdrZusatz": "text", "2c PLZ": "text", "2c Ort": "text", "2c Hausnr": "text",
  "2c AG D PLZ": "text", "2c AG D Ort": "text", "AS Geburtsdatum": "text", "2c Aufenth befristet von": "text", "2c Aufenth befristet bis": "text", "2c Aufenth unbefristet seit": "text",
  "2cKontrollkästchen1": "checkbox", "2cKontrollkästchen2": "checkbox", "2cKontrollkästchen3": "checkbox", "2cKontrollkästchen4": "checkbox", "2cKontrollkästchen5": "checkbox", "2cKontrollkästchen6": "checkbox",
} as const;
export const RESIDENCE_EDITIONS: Partial<Record<EgLand, { url: string; sha256: string; modified: string }>> = {
  HH: { url: "https://fhh1.hamburg.de/Dibis/form/pdf/Anlage_Wohnsitz_im_Ausland_zu_Abschnitt_2.c_im_Antrag_auf_Elterngeld_Stand_08_25.pdf", sha256: "86b3868cb12b2aea1c90136f4cee50cf8adb99aee73522ae6e164b692c7518c4", modified: "2025-09-09" },
  RP: { url: "https://mffki.rlp.de/fileadmin/07/Dokumente/Themen/Familie/Gute_Zukunft_fuer_alle_Kinder_und_Eltern/Elterngeld/2025_08_2_Wohnsitz_im_Ausland_2c.pdf", sha256: "2d152dfc16359c58ee134221b9cc74c03b5386bc194c2db83ddca2642e2be59a", modified: "2025-08-05" },
};
export interface ResidenceAnnexAnswers {
  parent: StaInput["parent"]; child: StaInput["child"];
  /** Explicit answer to the printed trigger. */
  livesOutsideGermany: boolean;
  address: { country: string; street: string; houseNumber: string; addition?: string; postalCode: string; city: string };
  stay: { kind: "limited"; from: string; to: string } | { kind: "unlimited"; since: string }; // YYYY-MM
  worksInGermanyOrGermanContract: boolean;
  /** Printed conditional: only if the preceding answer is NO. */
  otherWorksInGermanyOrGermanContract?: boolean;
  /** German employer is a separate explicit fact, not inferred from place of work. */
  hasGermanEmployer: boolean; employerSeat?: { postalCode: string; city: string };
  availablePostingProofsAttached: boolean;
}
export function residenceSpec(land: EgLand): StrictFormSpec<keyof typeof RESIDENCE_FIELDS> | null {
  const e = RESIDENCE_EDITIONS[land]; if (!e) return null;
  const version = "Anlage Wohnsitz im Ausland — August2025";
  return { fields: RESIDENCE_FIELDS, neverFill: [], radioOptions: {},
    manifest: { formKey: `elterngeld-residence-${land}`, version, sha256: e.sha256, fields: { ...RESIDENCE_FIELDS } },
    editions: [{ version, sha256: e.sha256, status: "current_verified", checkedAt: "2026-11-26", evidence: `${e.url};2 pages,23 fields(17 text,6 checkbox);no encryption/XFA;ModDate ${e.modified};rights unresolved` }] };
}
export function validateResidenceAnnex(a: ResidenceAnnexAnswers, today: string): EgError[] {
  const errors: EgError[] = [], err = (field: string, code: string) => errors.push({ field, code });
  const safeText = (v: string | undefined) => typeof v === "string" && !blank(v) && !/[\u0000-\u001f\u007f]/.test(v);
  const month = (s: string) => /^\d{4}-(0[1-9]|1[0-2])$/.test(s) && s >= "1900-01";
  for (const [p, x] of [["parent", a.parent], ["child", a.child]] as const) {
    if (!safeText(x.vorname) || !safeText(x.nachname)) err(`${p}.name`, "required_safe_text");
    if (!isoDateValid(x.geburtsdatum, today)) err(`${p}.geburtsdatum`, "date");
  }
  if (a.livesOutsideGermany !== true) err("livesOutsideGermany", "annex_trigger_required");
  for (const k of ["country", "street", "houseNumber", "postalCode", "city"] as const) if (!safeText(a.address[k])) err(`address.${k}`, "required_safe_text");
  if (a.address.addition && !safeText(a.address.addition)) err("address.addition", "safe_text");
  if (a.stay.kind === "limited") {
    if (!month(a.stay.from) || !month(a.stay.to) || a.stay.from > today.slice(0, 7) || a.stay.from > a.stay.to) err("stay", "month_range");
    if (Object.keys(a.stay).some((k) => !["kind", "from", "to"].includes(k))) err("stay", "hidden_answers");
  } else if (a.stay.kind === "unlimited") {
    if (!month(a.stay.since) || a.stay.since > today.slice(0, 7)) err("stay.since", "month");
    if (Object.keys(a.stay).some((k) => !["kind", "since"].includes(k))) err("stay", "hidden_answers");
  } else err("stay", "required");
  if (typeof a.worksInGermanyOrGermanContract !== "boolean") err("worksInGermanyOrGermanContract", "required");
  if (a.worksInGermanyOrGermanContract === false) {
    if (typeof a.otherWorksInGermanyOrGermanContract !== "boolean") err("otherWorksInGermanyOrGermanContract", "required");
  } else if (a.otherWorksInGermanyOrGermanContract !== undefined) err("otherWorksInGermanyOrGermanContract", "not_applicable");
  if (typeof a.hasGermanEmployer !== "boolean") err("hasGermanEmployer", "required");
  if (a.hasGermanEmployer) {
    if (!/^\d{5}$/.test(a.employerSeat?.postalCode ?? "") || !safeText(a.employerSeat?.city)) err("employerSeat", "german_plz_city");
  } else if (a.employerSeat) err("employerSeat", "not_applicable");
  if (a.availablePostingProofsAttached !== true) err("availablePostingProofsAttached", "available_proofs_required");
  return errors;
}
type F = StrictFill<keyof typeof RESIDENCE_FIELDS>;
const T = (name: string, value: string): F => ({ name: name as keyof typeof RESIDENCE_FIELDS, type: "text", value: value.trim() });
const C = (n: number): F => ({ name: `2cKontrollkästchen${n}` as keyof typeof RESIDENCE_FIELDS, type: "check" });
const monthDe = (s: string) => `${s.slice(5)}.${s.slice(0, 4)}`;
export function residenceFills(a: ResidenceAnnexAnswers): F[] {
  const f: F[] = [T("AS Vorname", a.parent.vorname), T("AS Nachname", a.parent.nachname), T("AS Geburtsdatum", isoToDe(a.parent.geburtsdatum)),
    T("Vorname Kind", a.child.vorname), T("Nachname Kind", a.child.nachname), T("Geburtsdatum Kind Tag", isoToDe(a.child.geburtsdatum)),
    T("2c Staat", a.address.country), T("2c Str", a.address.street), T("2c Hausnr", a.address.houseNumber), T("2c PLZ", a.address.postalCode), T("2c Ort", a.address.city)];
  if (a.address.addition) f.push(T("2c AdrZusatz", a.address.addition));
  if (a.stay.kind === "limited") f.push(C(1), T("2c Aufenth befristet von", monthDe(a.stay.from)), T("2c Aufenth befristet bis", monthDe(a.stay.to)));
  else f.push(C(2), T("2c Aufenth unbefristet seit", monthDe(a.stay.since)));
  f.push(C(a.worksInGermanyOrGermanContract ? 3 : 4));
  if (!a.worksInGermanyOrGermanContract) f.push(C(a.otherWorksInGermanyOrGermanContract ? 5 : 6));
  if (a.hasGermanEmployer && a.employerSeat) f.push(T("2c AG D PLZ", a.employerSeat.postalCode), T("2c AG D Ort", a.employerSeat.city));
  return f;
}
export async function fillResidenceForTesting(land: EgLand, bytes: Uint8Array, a: ResidenceAnnexAnswers, today: string, opts: StrictFillOptions) {
  const spec = residenceSpec(land); if (!spec) return { ok: false as const, code: "ANNEX_UNVERIFIED_FOR_LAND" as const };
  const errors = validateResidenceAnnex(a, today); if (errors.length) return { ok: false as const, code: "INVALID_INPUT" as const, errors };
  return fillStrictAcroForm(spec, bytes, residenceFills(a), opts);
}