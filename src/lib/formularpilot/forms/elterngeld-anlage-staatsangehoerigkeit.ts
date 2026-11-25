/**
 * Elterngeld "Anlage: Staatsangehörigkeit zu Abschnitt 2.g" (zur Antragsversion August 2025).
 * Printed trigger (main form 2.g): "Eine andere, keine oder meine Staatsangehörigkeit ist ungeklärt"; the annex
 * itself: "nur ausfüllen, falls Sie nicht die deutsche Staatsangehörigkeit haben". Nationality is never inferred.
 * Editions per Land (official publisher URL, full hash, 2026-11-25). Same 13 native fields in both editions.
 * BB: no official attachment URL found → citizenship cases blocked for BB. TH stays blocked overall.
 * Development only; not wired; production disabled with the main form.
 */
import { fillStrictAcroForm, blank, isoToDe, type StrictEdition, type StrictFill, type StrictFormSpec, type StrictFillOptions } from "../engine/strict-acroform";
import type { PdfTemplateManifest } from "@/lib/pdf-preflight";
import type { EgLand } from "./elterngeld-shared-2025";

export const STA_EDITIONS_BY_LAND: Partial<Record<EgLand, { url: string; sha256: string; modDate: string }>> = {
  HH: { url: "https://fhh1.hamburg.de/Dibis/form/pdf/Anlage_Staatsangehoerigkeit_zu_Abschnitt_2.g_im_Antrag_auf_Elterngeld_Stand_08_25.pdf", sha256: "c12de26530946b269ed71a3153504682f3eae8658a19812d9c1c12ee43558929", modDate: "2025-09-09" },
  SH: { url: "https://www.schleswig-holstein.de/DE/landesregierung/ministerien-behoerden/LASG/Aufgaben/KinderUndEltern/Download/3_2g_Staatsangehoerigkeit.pdf?__blob=publicationFile", sha256: "c12de26530946b269ed71a3153504682f3eae8658a19812d9c1c12ee43558929", modDate: "2025-09-09" },
  RP: { url: "https://mkbwk.rlp.de/fileadmin/07/Dokumente/Themen/Familie/Gute_Zukunft_fuer_alle_Kinder_und_Eltern/Elterngeld/2025_08_3_Staatsangehoerigkeit_2g.pdf", sha256: "ee9c699109f36596e1dd15588b3ee95468c34a728a2cae46010d82cce22a9c34", modDate: "2025-07-29" },
};

const T = "text", C = "checkbox";
export const STA_FIELDS = {
  "AS Vorname": T, "AS Nachname": T, "AS Geburtsdatum Tag": T, "Vorname Kind": T, "Nachname Kind": T, "Geburtsdatum Kind Tag": T,
  "2gKontrollkästchen1": C, "2g Staatsangehörigkeit1": T, "2gKontrollkästchen2": C, "2gKontrollkästchen3": C,
  "2gKontrollkästchen4": C, "2g Staatsangehörigkeit2": T, "2gKontrollkästchen5": C,
} as const;
export type StaField = keyof typeof STA_FIELDS;

export function staSpec(land: EgLand): StrictFormSpec<StaField> | null {
  const e = STA_EDITIONS_BY_LAND[land];
  if (!e) return null;
  const editions: StrictEdition[] = [{ version: "Anlage Staatsangehörigkeit (Antragsversion August 2025)", sha256: e.sha256, status: "current_verified", evidence: `${e.url} 2026-11-25: %PDF, 1 page, 13 fields, not encrypted, no XFA, ModDate ${e.modDate}`, checkedAt: "2026-11-25" }];
  const manifest: PdfTemplateManifest = { formKey: `elterngeld-anlage-sta-${land}`, version: editions[0].version, sha256: e.sha256, fields: { ...STA_FIELDS } };
  return { fields: STA_FIELDS, manifest, editions, neverFill: [], radioOptions: {} };
}

export type StaAnswer = { kind: "eu"; staat: string; freizuegigkeitEntzogen: boolean } | { kind: "andere"; staat: string } | { kind: "staatenlos" };
export interface StaInput { parent: { vorname: string; nachname: string; geburtsdatum: string }; child: { vorname: string; nachname: string; geburtsdatum: string }; answer: StaAnswer }

export function validateSta(x: StaInput): string[] {
  const e: string[] = [];
  if (x.answer.kind !== "staatenlos" && blank(x.answer.staat)) e.push("staat");
  if (x.answer.kind === "eu" && typeof x.answer.freizuegigkeitEntzogen !== "boolean") e.push("freizuegigkeit");
  return e;
}

export function staFills(x: StaInput): StrictFill<StaField>[] {
  const f: StrictFill<StaField>[] = [
    { name: "AS Vorname", type: "text", value: x.parent.vorname.trim() }, { name: "AS Nachname", type: "text", value: x.parent.nachname.trim() },
    { name: "AS Geburtsdatum Tag", type: "text", value: isoToDe(x.parent.geburtsdatum) },
    { name: "Vorname Kind", type: "text", value: x.child.vorname.trim() }, { name: "Nachname Kind", type: "text", value: x.child.nachname.trim() },
    { name: "Geburtsdatum Kind Tag", type: "text", value: isoToDe(x.child.geburtsdatum) },
  ];
  const a = x.answer;
  if (a.kind === "eu") f.push({ name: "2gKontrollkästchen1", type: "check" }, { name: "2g Staatsangehörigkeit1", type: "text", value: a.staat.trim() }, { name: a.freizuegigkeitEntzogen ? "2gKontrollkästchen2" : "2gKontrollkästchen3", type: "check" });
  else if (a.kind === "andere") f.push({ name: "2gKontrollkästchen4", type: "check" }, { name: "2g Staatsangehörigkeit2", type: "text", value: a.staat.trim() });
  else f.push({ name: "2gKontrollkästchen5", type: "check" });
  return f;
}

/** TEST-ONLY until the whole application is complete. */
export async function fillStaForTesting(land: EgLand, bytes: Uint8Array, x: StaInput, opts: StrictFillOptions) {
  const spec = staSpec(land);
  if (!spec) return { ok: false as const, code: "ANNEX_UNVERIFIED_FOR_LAND" as const };
  if (validateSta(x).length) return { ok: false as const, code: "INVALID_INPUT" as const };
  return fillStrictAcroForm(spec, bytes, staFills(x), opts);
}
