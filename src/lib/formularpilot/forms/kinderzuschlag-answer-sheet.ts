/**
 * FormularPilot — Kinderzuschlag (KiZ) answer sheet. DEVELOPMENT ONLY, not wired into UI.
 *
 * The official KiZ1 form set is XFA + encrypted ("change: no") and is NOT modified, decrypted
 * or re-mapped. Instead this builds a clearly NON-OFFICIAL helper sheet: the user's answers
 * next to German labels, the list of official documents to fill (KiZ1, KiZ1-AnA, one KiZ1-AnK
 * per child), official links, signature and mailing instructions. It is never a complete
 * application and never claims to be one.
 *
 * Evidence (checked 2026-10-26): KiZ1-H "Hinweise" (BA, modDate 19.06.2026):
 *  - use "Antrag auf Kinderzuschlag" + "Anlage Antragsteller(in) und Partner(in)" + one
 *    "Anlage Kind" for each child under 25 living in the household (also temporarily);
 *  - further annexes may be required (www.kinderzuschlag.de);
 *  - partners both sign; signed originals by post to the Familienkasse; proofs only as copies;
 *  - postal address of "Ihre Familienkasse" at www.kinderzuschlag.de (no address is output here).
 */
import { PDFDocument, rgb, type PDFFont, type PDFPage } from "pdf-lib";
import { embedUnicodeFont } from "../unicode-font";

export const KIZ_LINKS = {
  formsPage: "https://www.arbeitsagentur.de/familie-und-kinder/downloads-familie-und-kinder/formulare-kinderzuschlag",
  online: "https://web.arbeitsagentur.de/kiz/ui/start",
  kiz1: "https://www.arbeitsagentur.de/datei/kiz1-antrag_ba036540.pdf",
  ana: "https://www.arbeitsagentur.de/datei/kiz1-ana_ba034980.pdf",
  ank: "https://www.arbeitsagentur.de/datei/kiz1-ank_ba035005.pdf",
  hinweise: "https://www.arbeitsagentur.de/datei/kiz1-hinweise_ba036545.pdf",
  /** Official place to find "die Postanschrift Ihrer Familienkasse" (per KiZ1-H). */
  familienkasseLocator: "https://www.kinderzuschlag.de",
} as const;
export const KIZ_EVIDENCE = {
  hinweiseSha256: "612880838943449a0af54becb66bf198f4b65bf3506e32fdc03109ef700c9f37",
  hinweiseModDate: "2026-06-19",
  checkedAt: "2026-10-26",
} as const;

export interface KizPerson { familienname: string; vorname: string; geburtsdatum: string; kindergeldnummer?: string }
export interface KizChild { familienname: string; vorname: string; geburtsdatum: string; lebtImHaushalt: boolean | null }
export interface KizAnswers {
  antragsteller: KizPerson;
  /** null = explicitly no partner in household; undefined = not answered yet. */
  partner: KizPerson | null | undefined;
  strasse: string; plz: string; ort: string;
  kinder: KizChild[];
}

export type KizErrorCode = "REQUIRED" | "INVALID_DATE" | "DATE_IN_FUTURE" | "INVALID_PLZ" | "NO_CHILDREN" | "UNANSWERED";
export interface KizError { path: string; code: KizErrorCode }

const ISO = /^(\d{4})-(\d{2})-(\d{2})$/;
function parseIso(s: string): Date | null {
  const m = ISO.exec(s ?? "");
  if (!m) return null;
  const d = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]));
  return d.getUTCMonth() === +m[2] - 1 && d.getUTCDate() === +m[3] ? d : null;
}
const toDe = (iso: string) => { const m = ISO.exec(iso)!; return `${m[3]}.${m[2]}.${m[1]}`; };
const blank = (s?: string) => !s || !s.trim();

function ageOn(dob: Date, today: Date): number {
  let a = today.getUTCFullYear() - dob.getUTCFullYear();
  if (today.getUTCMonth() < dob.getUTCMonth() || (today.getUTCMonth() === dob.getUTCMonth() && today.getUTCDate() < dob.getUTCDate())) a--;
  return a;
}

export function validateKiz(a: KizAnswers, today: string): KizError[] {
  const now = parseIso(today);
  if (!now) throw new Error("today must be ISO yyyy-mm-dd");
  const e: KizError[] = [];
  const person = (p: KizPerson, path: string) => {
    if (blank(p.familienname)) e.push({ path: `${path}.familienname`, code: "REQUIRED" });
    if (blank(p.vorname)) e.push({ path: `${path}.vorname`, code: "REQUIRED" });
    date(p.geburtsdatum, `${path}.geburtsdatum`);
  };
  const date = (s: string, path: string) => {
    const d = parseIso(s);
    if (blank(s)) e.push({ path, code: "REQUIRED" });
    else if (!d) e.push({ path, code: "INVALID_DATE" });
    else if (d > now) e.push({ path, code: "DATE_IN_FUTURE" });
  };
  person(a.antragsteller, "antragsteller");
  if (a.partner === undefined) e.push({ path: "partner", code: "UNANSWERED" });
  else if (a.partner) person(a.partner, "partner");
  if (blank(a.strasse)) e.push({ path: "strasse", code: "REQUIRED" });
  if (blank(a.ort)) e.push({ path: "ort", code: "REQUIRED" });
  if (blank(a.plz)) e.push({ path: "plz", code: "REQUIRED" });
  else if (!/^\d{5}$/.test(a.plz.trim())) e.push({ path: "plz", code: "INVALID_PLZ" });
  if (!a.kinder.length) e.push({ path: "kinder", code: "NO_CHILDREN" });
  a.kinder.forEach((k, i) => {
    if (blank(k.familienname)) e.push({ path: `kinder.${i}.familienname`, code: "REQUIRED" });
    if (blank(k.vorname)) e.push({ path: `kinder.${i}.vorname`, code: "REQUIRED" });
    date(k.geburtsdatum, `kinder.${i}.geburtsdatum`);
    if (k.lebtImHaushalt === null) e.push({ path: `kinder.${i}.lebtImHaushalt`, code: "UNANSWERED" });
  });
  return e;
}

export interface KizDocumentPlan {
  documents: { key: "KiZ1" | "KiZ1-AnA" | "KiZ1-AnK"; count: number; url: string; forChildIndexes?: number[] }[];
  signatures: ("antragsteller" | "partner")[];
  notes: ("further_annexes_may_be_required" | "proofs_as_copies_only" | "originals_signed_by_post" | "child_25_or_older_no_ank" | "child_not_in_household_no_ank")[];
  delivery: { status: "requires_official_lookup"; locatorUrl: string; onlineAlternative: string };
}

/** Deterministic document plan for VALID answers (call validateKiz first). */
export function planKizDocuments(a: KizAnswers, today: string): KizDocumentPlan {
  const now = parseIso(today)!;
  const ank: number[] = [];
  const notes: KizDocumentPlan["notes"] = ["further_annexes_may_be_required", "proofs_as_copies_only", "originals_signed_by_post"];
  a.kinder.forEach((k, i) => {
    const age = ageOn(parseIso(k.geburtsdatum)!, now);
    if (!k.lebtImHaushalt) { if (!notes.includes("child_not_in_household_no_ank")) notes.push("child_not_in_household_no_ank"); return; }
    if (age >= 25) { if (!notes.includes("child_25_or_older_no_ank")) notes.push("child_25_or_older_no_ank"); return; }
    ank.push(i);
  });
  return {
    documents: [
      { key: "KiZ1", count: 1, url: KIZ_LINKS.kiz1 },
      { key: "KiZ1-AnA", count: 1, url: KIZ_LINKS.ana },
      { key: "KiZ1-AnK", count: ank.length, url: KIZ_LINKS.ank, forChildIndexes: ank },
    ],
    signatures: a.partner ? ["antragsteller", "partner"] : ["antragsteller"],
    notes,
    delivery: { status: "requires_official_lookup", locatorUrl: KIZ_LINKS.familienkasseLocator, onlineAlternative: KIZ_LINKS.online },
  };
}

export const KIZ_SHEET_BANNER = [
  "NICHT AMTLICH – Ausfüllhilfe (BalkanLink FormularPilot)",
  "Dies ist KEIN Antrag und ersetzt keinen amtlichen Vordruck. Übertragen Sie die Angaben selbst",
  "in die amtlichen Vordrucke der Familienkasse oder nutzen Sie den Online-Antrag.",
] as const;

export type KizSheetResult =
  | { ok: true; bytes: Uint8Array; plan: KizDocumentPlan }
  | { ok: false; code: "VALIDATION_FAILED"; errors: KizError[] }
  | { ok: false; code: "FONT_UNAVAILABLE" | "UNSUPPORTED_GLYPHS"; fields?: string[] };

export async function buildKizAnswerSheet(a: KizAnswers, opts: { today: string; fontBytes: Uint8Array }): Promise<KizSheetResult> {
  const errors = validateKiz(a, opts.today);
  if (errors.length) return { ok: false, code: "VALIDATION_FAILED", errors };
  const plan = planKizDocuments(a, opts.today);

  const doc = await PDFDocument.create();
  doc.setTitle("Ausfüllhilfe Kinderzuschlag – nicht amtlich");
  doc.setProducer("BalkanLink FormularPilot");
  doc.setCreationDate(new Date(`${opts.today}T00:00:00Z`));
  doc.setModificationDate(new Date(`${opts.today}T00:00:00Z`));
  let uf;
  try { uf = await embedUnicodeFont(doc, opts.fontBytes); } catch { return { ok: false, code: "FONT_UNAVAILABLE" }; }

  const lines: { text: string; size: number; gap?: number }[] = [];
  const h = (t: string) => lines.push({ text: t, size: 12, gap: 8 });
  const row = (label: string, value: string) => lines.push({ text: `${label}: ${value}`, size: 10 });
  const p = (t: string) => lines.push({ text: t, size: 9 });

  KIZ_SHEET_BANNER.forEach((t, i) => lines.push({ text: t, size: i === 0 ? 13 : 9 }));
  h("Antragsteller(in)");
  const person = (x: KizPerson) => {
    row("Familienname", x.familienname.trim()); row("Vorname", x.vorname.trim());
    row("Geburtsdatum", toDe(x.geburtsdatum));
    if (!blank(x.kindergeldnummer)) row("Kindergeldnummer", x.kindergeldnummer!.trim());
  };
  person(a.antragsteller);
  row("Straße und Hausnummer", a.strasse.trim()); row("Postleitzahl", a.plz.trim()); row("Ort", a.ort.trim());
  h("Partner(in)");
  if (a.partner) person(a.partner); else p("Keine Partnerin / kein Partner im Haushalt angegeben.");
  a.kinder.forEach((k, i) => {
    h(`Kind ${i + 1}${plan.documents[2].forChildIndexes!.includes(i) ? " – Anlage Kind (KiZ1-AnK) ausfüllen" : " – keine Anlage Kind laut Ihren Angaben"}`);
    row("Familienname", k.familienname.trim()); row("Vorname", k.vorname.trim()); row("Geburtsdatum", toDe(k.geburtsdatum));
    row("Lebt im Haushalt", k.lebtImHaushalt ? "ja" : "nein");
  });
  h("Amtliche Vordrucke, die Sie ausfüllen müssen");
  for (const d of plan.documents) if (d.count) p(`${d.count} × ${d.key}: ${d.url}`);
  p(`Weitere Anlagen können nötig sein: ${KIZ_LINKS.familienkasseLocator}`);
  p(`Hinweise der Familienkasse (KiZ1-H): ${KIZ_LINKS.hinweise}`);
  h("Unterschrift und Versand");
  p(a.partner ? "Antrag und Anlagen unterschreiben: Sie UND Ihr(e) Partner(in)." : "Antrag und Anlagen unterschreiben.");
  p("Originale per Post an Ihre Familienkasse (Postanschrift, nicht Besucheradresse). Nachweise nur in Kopie.");
  p(`Postanschrift Ihrer Familienkasse: selbst nachsehen unter ${KIZ_LINKS.familienkasseLocator}`);
  p(`Alternative: Online-Antrag ${KIZ_LINKS.online}`);
  lines.push({ text: `Stand der geprüften Quellen: ${toDe(KIZ_EVIDENCE.checkedAt)}. Keine Gewähr für Vollständigkeit.`, size: 8, gap: 10 });

  const bad = lines.filter((l) => uf!.missingGlyphs(l.text).length).map((l) => l.text.split(":")[0]);
  if (bad.length) return { ok: false, code: "UNSUPPORTED_GLYPHS", fields: bad };

  const M = 50; const W = 595.28; const H = 841.89;
  let page: PDFPage = doc.addPage([W, H]);
  let y = H - M;
  const draw = (t: string, size: number, font: PDFFont) => {
    // Wrap by measured width; never truncate.
    const words = t.split(" "); let cur = "";
    const out: string[] = [];
    for (const w of words) {
      const next = cur ? `${cur} ${w}` : w;
      if (font.widthOfTextAtSize(next, size) > W - 2 * M && cur) { out.push(cur); cur = w; } else cur = next;
    }
    if (cur) out.push(cur);
    for (const o of out) {
      if (y < M + size) { page = doc.addPage([W, H]); y = H - M; }
      page.drawText(o, { x: M, y, size, font, color: rgb(0, 0, 0) });
      y -= size * 1.4;
    }
  };
  for (const l of lines) { y -= l.gap ?? 0; draw(l.text, l.size, uf.font); }
  return { ok: true, bytes: await doc.save(), plan };
}
