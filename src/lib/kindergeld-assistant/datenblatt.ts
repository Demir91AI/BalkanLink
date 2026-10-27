/**
 * Kindergeld Asistent — deterministic, browser-only "Ausfüllhilfe / Datenblatt".
 *
 * The official BA KG1 and KG1-AnK are encrypted XFA forms ("change: no", verified 2026-10-26).
 * They are NEVER decrypted, flattened, modified or filled here. This module builds a separate,
 * clearly NON-OFFICIAL data sheet listing the user's values next to the German field labels,
 * so the user can transfer them into the official online application or the unchanged official PDF.
 * No network calls, no persistence, no AI.
 */
import { PDFDocument, rgb, type PDFFont, type PDFPage } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";

/** Official sources (Bundesagentur für Arbeit / Familienkasse), checked 2026-10-26. */
export const KG_OFFICIAL = {
  formsPage: "https://www.arbeitsagentur.de/familie-und-kinder/downloads-familie-und-kinder/formulare-kindergeld",
  kg1: "https://www.arbeitsagentur.de/datei/kg1-antrag-kindergeld_ba036550.pdf",
  ank: "https://www.arbeitsagentur.de/datei/kg1-anlagekind_ba033765.pdf",
  online: "https://www.arbeitsagentur.de/familie-und-kinder/kindergeld-beantragen",
  familienkasseFinden: "https://www.arbeitsagentur.de/familienkasse-finden",
  checkedAt: "2026-10-26",
} as const;

export const FONT_SHA256 = "76d04c18ea243f426b7de1f3ad208e927008f961dc5945e5aad352d0dfde8ee8";

export type YesNo = "yes" | "no" | "";
export interface KgFlags {
  /** Applicant, partner or a child lives/works abroad, or gets foreign family benefits. */
  crossBorder: YesNo;
  hasPartner: YesNo;
}
export interface KgChild { vorname: string; geburtsdatum: string; geschlecht: string; familienkasse?: string }
/** Subset of the existing legacy page state (kg1-muster-data) — same keys, no new storage. */
export interface KgData {
  steuerId1: string; familienname: string; vorname: string; geburtsname?: string; geburtsdatum: string;
  geburtsort?: string; staatsangehoerigkeit: string; strasse: string; plz: string; wohnort: string; staat: string;
  familienstand?: string;
  steuerId2?: string; eFamilienname?: string; eVorname?: string; eGeburtsdatum?: string; eStaatsangehoerigkeit?: string;
  iban: string; bic?: string; bank?: string; kontoinhaber?: string; khName?: string; khVorname?: string;
  kinder: KgChild[];
}

export type KgErrorCode = "REQUIRED" | "INVALID_DATE" | "DATE_IN_FUTURE" | "INVALID_STEUER_ID" | "INVALID_PLZ" | "INVALID_IBAN" | "NO_CHILDREN" | "UNANSWERED";
export interface KgError { path: string; code: KgErrorCode }
export type KgNote = "cross_border_official_check" | "adult_child_official_check" | "ank_per_child" | "sign_original" | "no_auto_submit";

const ISO = /^(\d{4})-(\d{2})-(\d{2})$/;
const blank = (s?: string) => !s || !s.trim();
function parseIso(s?: string): Date | null {
  const m = ISO.exec(s ?? "");
  if (!m) return null;
  const d = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]));
  return d.getUTCMonth() === +m[2] - 1 && d.getUTCDate() === +m[3] ? d : null;
}
const toDe = (iso: string) => { const m = ISO.exec(iso); return m ? `${m[3]}.${m[2]}.${m[1]}` : iso; };
function ageOn(dob: Date, now: Date) {
  let a = now.getUTCFullYear() - dob.getUTCFullYear();
  if (now.getUTCMonth() < dob.getUTCMonth() || (now.getUTCMonth() === dob.getUTCMonth() && now.getUTCDate() < dob.getUTCDate())) a--;
  return a;
}
export function ibanValid(raw: string): boolean {
  const s = raw.replace(/\s+/g, "").toUpperCase();
  if (!/^[A-Z]{2}\d{2}[A-Z0-9]{11,30}$/.test(s)) return false;
  if (s.startsWith("DE") && s.length !== 22) return false;
  const r = (s.slice(4) + s.slice(0, 4)).replace(/[A-Z]/g, (c) => String(c.charCodeAt(0) - 55));
  let mod = 0;
  for (const ch of r) mod = (mod * 10 + +ch) % 97;
  return mod === 1;
}
/** Children actually entered (legacy state always has 5 slots). */
export const filledChildren = (d: KgData) => d.kinder.filter((k) => !blank(k.vorname) || !blank(k.geburtsdatum));

export function validateKg(d: KgData, flags: KgFlags, today: string): KgError[] {
  const now = parseIso(today);
  if (!now) throw new Error("today must be ISO yyyy-mm-dd");
  const e: KgError[] = [];
  const req = (v: string | undefined, path: string) => { if (blank(v)) e.push({ path, code: "REQUIRED" }); };
  const date = (v: string | undefined, path: string) => {
    if (blank(v)) return e.push({ path, code: "REQUIRED" });
    const p = parseIso(v); if (!p) e.push({ path, code: "INVALID_DATE" }); else if (p > now) e.push({ path, code: "DATE_IN_FUTURE" });
  };
  if (!flags.crossBorder) e.push({ path: "crossBorder", code: "UNANSWERED" });
  if (!flags.hasPartner) e.push({ path: "hasPartner", code: "UNANSWERED" });
  req(d.familienname, "familienname"); req(d.vorname, "vorname"); date(d.geburtsdatum, "geburtsdatum");
  req(d.staatsangehoerigkeit, "staatsangehoerigkeit");
  if (blank(d.steuerId1)) e.push({ path: "steuerId1", code: "REQUIRED" });
  else if (!/^\d{11}$/.test(d.steuerId1.replace(/\s/g, ""))) e.push({ path: "steuerId1", code: "INVALID_STEUER_ID" });
  req(d.strasse, "strasse"); req(d.wohnort, "wohnort");
  if (blank(d.plz)) e.push({ path: "plz", code: "REQUIRED" });
  else if ((blank(d.staat) || /^deutschland$/i.test(d.staat.trim())) && !/^\d{5}$/.test(d.plz.trim())) e.push({ path: "plz", code: "INVALID_PLZ" });
  if (flags.hasPartner === "yes") {
    req(d.eFamilienname, "eFamilienname"); req(d.eVorname, "eVorname"); date(d.eGeburtsdatum, "eGeburtsdatum");
    if (!blank(d.steuerId2) && !/^\d{11}$/.test(d.steuerId2!.replace(/\s/g, ""))) e.push({ path: "steuerId2", code: "INVALID_STEUER_ID" });
  }
  if (blank(d.iban)) e.push({ path: "iban", code: "REQUIRED" });
  else if (!ibanValid(d.iban)) e.push({ path: "iban", code: "INVALID_IBAN" });
  if (d.kontoinhaber === "other") req(d.khName, "khName");
  const kids = filledChildren(d);
  if (!kids.length) e.push({ path: "kinder", code: "NO_CHILDREN" });
  d.kinder.forEach((k, i) => {
    if (blank(k.vorname) && blank(k.geburtsdatum)) return;
    req(k.vorname, `kinder.${i}.vorname`); date(k.geburtsdatum, `kinder.${i}.geburtsdatum`);
  });
  return e;
}

export interface KgPlan {
  documents: { key: "KG1" | "KG1-AnK"; count: number; url: string }[];
  notes: KgNote[];
  /** false whenever a special case is outside what this sheet covers. */
  coveredBySheet: boolean;
}
export function planKg(d: KgData, flags: KgFlags, today: string): KgPlan {
  const now = parseIso(today)!;
  const kids = filledChildren(d);
  const notes: KgNote[] = ["ank_per_child", "sign_original", "no_auto_submit"];
  if (flags.crossBorder === "yes") notes.unshift("cross_border_official_check");
  if (kids.some((k) => { const b = parseIso(k.geburtsdatum); return b && ageOn(b, now) >= 18; })) notes.unshift("adult_child_official_check");
  return {
    documents: [
      { key: "KG1", count: 1, url: KG_OFFICIAL.kg1 },
      { key: "KG1-AnK", count: kids.length, url: KG_OFFICIAL.ank },
    ],
    notes,
    coveredBySheet: !notes.includes("cross_border_official_check") && !notes.includes("adult_child_official_check"),
  };
}

export const KG_SHEET_BANNER = [
  "NICHT AMTLICH – BalkanLink Ausfüllhilfe / Datenblatt Kindergeld",
  "Dies ist KEIN Antrag und ersetzt keinen amtlichen Vordruck. Übertragen Sie die Angaben selbst in den",
  "Online-Antrag oder in die unveränderten amtlichen Vordrucke KG1 und Anlage Kind der Familienkasse.",
] as const;

export type KgSheetResult =
  | { ok: true; bytes: Uint8Array; plan: KgPlan; text: string }
  | { ok: false; code: "VALIDATION_FAILED"; errors: KgError[] }
  | { ok: false; code: "FONT_UNAVAILABLE" | "UNSUPPORTED_GLYPHS" };

async function sha256(bytes: Uint8Array) {
  const h = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(h)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

/** Lines of the sheet (German labels, user values). Exposed for copy-to-clipboard and tests. */
export function sheetLines(d: KgData, flags: KgFlags, plan: KgPlan): { text: string; size: number; gap?: number }[] {
  const L: { text: string; size: number; gap?: number }[] = [];
  const h = (t: string) => L.push({ text: t, size: 12, gap: 8 });
  const row = (label: string, v?: string) => { if (!blank(v)) L.push({ text: `${label}: ${v!.trim()}`, size: 10 }); };
  const p = (t: string) => L.push({ text: t, size: 9 });
  KG_SHEET_BANNER.forEach((t, i) => L.push({ text: t, size: i === 0 ? 13 : 9 }));
  h("Antrag KG1 – Antragstellende Person");
  row("Steuerliche Identifikationsnummer", d.steuerId1.replace(/\s/g, ""));
  row("Familienname", d.familienname); row("Vorname", d.vorname); row("Geburtsname", d.geburtsname);
  row("Geburtsdatum", toDe(d.geburtsdatum)); row("Geburtsort", d.geburtsort);
  row("Staatsangehörigkeit", d.staatsangehoerigkeit); row("Familienstand", d.familienstand);
  row("Straße, Hausnummer", d.strasse); row("PLZ", d.plz); row("Wohnort", d.wohnort); row("Staat", d.staat);
  h("Ehegatte / Lebenspartner(in) / anderer Elternteil im Haushalt");
  if (flags.hasPartner === "yes") {
    row("Steuerliche Identifikationsnummer", d.steuerId2?.replace(/\s/g, ""));
    row("Familienname", d.eFamilienname); row("Vorname", d.eVorname);
    row("Geburtsdatum", d.eGeburtsdatum ? toDe(d.eGeburtsdatum) : ""); row("Staatsangehörigkeit", d.eStaatsangehoerigkeit);
  } else p("Keine Person angegeben.");
  h("Zahlungsweg");
  row("IBAN", d.iban.replace(/\s+/g, "").toUpperCase().replace(/(.{4})/g, "$1 ").trim());
  row("BIC", d.bic); row("Bank", d.bank);
  row("Kontoinhaber(in)", d.kontoinhaber === "other" ? [d.khName, d.khVorname].filter(Boolean).join(", ") : "antragstellende Person");
  filledChildren(d).forEach((k, i) => {
    h(`Kind ${i + 1} – Angaben für KG1 und eigene Anlage Kind`);
    row("Vorname", k.vorname); row("Geburtsdatum", toDe(k.geburtsdatum));
    row("Geschlecht", k.geschlecht === "m" ? "männlich" : k.geschlecht === "w" ? "weiblich" : k.geschlecht === "d" ? "divers" : k.geschlecht);
  });
  h("Amtliche Vordrucke (unverändert, von der Familienkasse)");
  for (const doc of plan.documents) if (doc.count) p(`${doc.count} × ${doc.key === "KG1" ? "Antrag auf Kindergeld (KG1)" : "Anlage Kind (KG1-AnK)"}: ${doc.url}`);
  p(`Online-Antrag: ${KG_OFFICIAL.online}`);
  if (plan.notes.includes("cross_border_official_check")) p(`Auslandsbezug angegeben: Ob weitere Anlagen nötig sind (z. B. Anlage Ausland), prüft die Familienkasse – siehe ${KG_OFFICIAL.formsPage}. Diese Ausfüllhilfe deckt diesen Fall NICHT vollständig ab.`);
  if (plan.notes.includes("adult_child_official_check")) p("Kind ab 18 Jahren: In der Anlage Kind sind zusätzliche Angaben und Nachweise nötig (Ausbildung, Studium usw.). Diese Ausfüllhilfe deckt diesen Fall NICHT vollständig ab.");
  h("Unterschrift und Abgabe");
  p("Amtlichen Antrag selbst prüfen, unterschreiben und selbst einreichen. BalkanLink sendet nichts.");
  p(`Zuständige Familienkasse selbst ermitteln: ${KG_OFFICIAL.familienkasseFinden}`);
  L.push({ text: `Quellen geprüft am ${toDe(KG_OFFICIAL.checkedAt)}. Keine Gewähr für Vollständigkeit oder Anspruch.`, size: 8, gap: 10 });
  return L;
}

export async function buildKindergeldDatenblatt(d: KgData, flags: KgFlags, opts: { today: string; fontBytes: Uint8Array }): Promise<KgSheetResult> {
  const errors = validateKg(d, flags, opts.today);
  if (errors.length) return { ok: false, code: "VALIDATION_FAILED", errors };
  const plan = planKg(d, flags, opts.today);
  if ((await sha256(opts.fontBytes)) !== FONT_SHA256) return { ok: false, code: "FONT_UNAVAILABLE" };
  const doc = await PDFDocument.create();
  doc.registerFontkit(fontkit);
  const font = await doc.embedFont(opts.fontBytes, { subset: false });
  const fk = fontkit.create(opts.fontBytes as unknown as Buffer);
  const lines = sheetLines(d, flags, plan);
  if (lines.some((l) => [...l.text].some((c) => c.trim() && !fk.hasGlyphForCodePoint(c.codePointAt(0)!)))) return { ok: false, code: "UNSUPPORTED_GLYPHS" };
  doc.setTitle("Ausfüllhilfe Kindergeld – nicht amtlich");
  doc.setProducer("BalkanLink");
  const stamp = new Date(`${opts.today}T00:00:00Z`);
  doc.setCreationDate(stamp); doc.setModificationDate(stamp);
  const M = 50, W = 595.28, H = 841.89;
  let page: PDFPage = doc.addPage([W, H]);
  let y = H - M;
  const draw = (t: string, size: number, f: PDFFont) => {
    const out: string[] = []; let cur = "";
    for (const w of t.split(" ")) { const n = cur ? `${cur} ${w}` : w; if (f.widthOfTextAtSize(n, size) > W - 2 * M && cur) { out.push(cur); cur = w; } else cur = n; }
    if (cur) out.push(cur);
    for (const o of out) { if (y < M + size) { page = doc.addPage([W, H]); y = H - M; } page.drawText(o, { x: M, y, size, font: f, color: rgb(0, 0, 0) }); y -= size * 1.4; }
  };
  for (const l of lines) { y -= l.gap ?? 0; draw(l.text, l.size, font); }
  return { ok: true, bytes: await doc.save(), plan, text: lines.map((l) => l.text).join("\n") };
}
