/**
 * Bewerbungs-Mappe — kompletan paket za ambasadu / Ausländerbehörde.
 *
 * Premium feature. Generiše PROFESIONALAN paket koji korisnik nosi na termin:
 *
 *   1. Naslovnica (BalkanLink branded, ime, vize tip, datum)
 *   2. Anschreiben (motivaciono pismo na njemačkom, auto-generisano iz podataka)
 *   3. Kompletan Datenblatt (svi podaci, BHS+DE labele)
 *   4. Checkliste dokumenata (sa kvačicama što je korisnik već prikupio)
 *
 * Princip: ugradi se NA POSTOJEĆI Datenblatt — koristimo iste pdf-lib helpere,
 * samo dodamo cover/anschreiben/checkliste sekcije ispred.
 */
import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from "pdf-lib";
import type { VisaSharedProfile } from "@/lib/visa-shared-profile";
import { buildVisaDatenblatt, type DatenblattInput } from "@/lib/visa-datenblatt-pdf";

export interface MappeChecklistItem {
  label: string;
  /** true = korisnik već ima dokument */
  done?: boolean;
}

export interface BewerbungsMappeInput extends DatenblattInput {
  /** Tip vize za naslovnicu (npr. "§18g Blue Card EU") */
  visaType: string;
  /** Država porijekla za naslovnicu (npr. "Bosna i Hercegovina") */
  countryOfOrigin?: string;
  /** Anschreiben tijelo (njemački) — auto-generisano iz form datae */
  anschreibenBody: string;
  /** Checkliste dokumenata za ovu vizu */
  checklist: MappeChecklistItem[];
}

const PAGE_W = 595.28;
const PAGE_H = 841.89;
const MARGIN_X = 48;

const COLOR = {
  navy: rgb(0.02, 0.09, 0.27),
  gold: rgb(0.79, 0.59, 0.13),
  text: rgb(0.09, 0.09, 0.13),
  muted: rgb(0.42, 0.45, 0.5),
  rule: rgb(0.85, 0.87, 0.92),
  white: rgb(1, 1, 1),
  navyLight: rgb(0.12, 0.22, 0.4),
};

const DIACRITIC_MAP: Record<string, string> = {
  "š": "s", "Š": "S", "č": "c", "Č": "C", "ć": "c", "Ć": "C",
  "đ": "dj", "Đ": "Dj", "ž": "z", "Ž": "Z",
  "ä": "ae", "Ä": "Ae", "ö": "oe", "Ö": "Oe", "ü": "ue", "Ü": "Ue", "ß": "ss",
  "—": "-", "–": "-", "„": '"', "“": '"', "”": '"', "‚": "'", "‘": "'", "’": "'",
  "•": "*", "✓": "v", "✕": "x", "→": "->", "⚠": "!", "ℹ": "i",
};
// WinAnsi (Helvetica) ne podržava ove byte-ove — pdf-lib baca grešku ako prođu.
const WIN_ANSI_UNMAPPED = new Set([0x81, 0x8D, 0x8F, 0x90, 0x9D]);
function safe(s: string): string {
  if (!s) return "";
  return s.split("").map((c) => {
    if (DIACRITIC_MAP[c]) return DIACRITIC_MAP[c];
    const code = c.charCodeAt(0);
    if (code < 32 && code !== 10) return " "; // strip kontrolne karaktere (osim newline)
    if (code >= 256) return "?";
    if (WIN_ANSI_UNMAPPED.has(code)) return "?";
    return c;
  }).join("");
}

function wrap(text: string, font: PDFFont, size: number, maxW: number): string[] {
  const out: string[] = [];
  for (const para of (safe(text) || "").split("\n")) {
    if (!para) { out.push(""); continue; }
    const words = para.split(/\s+/);
    let line = "";
    for (const w of words) {
      const test = line ? line + " " + w : w;
      if (font.widthOfTextAtSize(test, size) > maxW && line) {
        out.push(line); line = w;
      } else line = test;
    }
    out.push(line);
  }
  return out;
}

function drawCoverPage(
  doc: PDFDocument, fontReg: PDFFont, fontBold: PDFFont,
  input: BewerbungsMappeInput,
) {
  const p = doc.addPage([PAGE_W, PAGE_H]);
  // Navy hero background top
  p.drawRectangle({ x: 0, y: PAGE_H - 320, width: PAGE_W, height: 320, color: COLOR.navy });
  // Gold accent bar
  p.drawRectangle({ x: 0, y: PAGE_H - 326, width: PAGE_W, height: 6, color: COLOR.gold });

  // BalkanLink brand
  p.drawText(safe("BalkanLink"), { x: MARGIN_X, y: PAGE_H - 80, size: 22, font: fontBold, color: COLOR.gold });
  p.drawText(safe("Bewerbungs-Mappe"), { x: MARGIN_X, y: PAGE_H - 108, size: 14, font: fontReg, color: COLOR.white });

  // Title block
  const title = safe(input.formTitle);
  const titleLines = wrap(title, fontBold, 20, PAGE_W - MARGIN_X * 2);
  let y = PAGE_H - 180;
  titleLines.forEach((ln) => {
    p.drawText(ln, { x: MARGIN_X, y, size: 20, font: fontBold, color: COLOR.white });
    y -= 26;
  });

  // Visa type pill
  const pillText = safe(input.visaType);
  const pillW = fontBold.widthOfTextAtSize(pillText, 11) + 24;
  p.drawRectangle({ x: MARGIN_X, y: y - 8, width: pillW, height: 22, color: COLOR.gold });
  p.drawText(pillText, { x: MARGIN_X + 12, y: y - 2, size: 11, font: fontBold, color: COLOR.navy });

  // Applicant info block (white card on navy)
  const cardY = PAGE_H - 470;
  p.drawRectangle({
    x: MARGIN_X, y: cardY, width: PAGE_W - MARGIN_X * 2, height: 130,
    color: COLOR.white, borderColor: COLOR.rule, borderWidth: 1,
  });

  const name = [input.profile.vornamen, input.profile.familienname].filter(Boolean).join(" ").trim() || "—";
  const birth = input.profile.geburtsdatum || "—";
  const nat = input.profile.staatsangehoerigkeit || input.countryOfOrigin || "—";
  const pass = input.profile.passNr || "—";

  const rows: [string, string][] = [
    ["Antragsteller/in (Aplikant)", name],
    ["Geburtsdatum (Datum rodjenja)", birth],
    ["Staatsangehoerigkeit (Drzavljanstvo)", nat],
    ["Reisepass-Nr. (Broj pasosa)", pass],
    ["Datum (Datum izrade)", new Date().toLocaleDateString("de-DE")],
  ];

  let ry = cardY + 110;
  rows.forEach(([k, v]) => {
    p.drawText(safe(k), { x: MARGIN_X + 14, y: ry, size: 9, font: fontReg, color: COLOR.muted });
    p.drawText(safe(v), { x: MARGIN_X + 220, y: ry, size: 10.5, font: fontBold, color: COLOR.text });
    ry -= 18;
  });

  // Footer note
  const foot = "Diese Mappe wurde lokal im Browser des Antragstellers erstellt. BalkanLink ist ein Informationsdienst (RDG/StBerG).";
  const footLines = wrap(foot, fontReg, 8.5, PAGE_W - MARGIN_X * 2);
  let fy = 56;
  footLines.forEach((ln) => { p.drawText(ln, { x: MARGIN_X, y: fy, size: 8.5, font: fontReg, color: COLOR.muted }); fy -= 12; });

  // Page number area
  p.drawText("balkanlink.de", {
    x: PAGE_W - MARGIN_X - fontBold.widthOfTextAtSize("balkanlink.de", 9),
    y: 30, size: 9, font: fontBold, color: COLOR.navy,
  });
}

function drawAnschreibenPage(
  doc: PDFDocument, fontReg: PDFFont, fontBold: PDFFont,
  input: BewerbungsMappeInput,
) {
  const p = doc.addPage([PAGE_W, PAGE_H]);
  // Header bar
  p.drawRectangle({ x: 0, y: PAGE_H - 6, width: PAGE_W, height: 6, color: COLOR.gold });
  p.drawText(safe("BalkanLink Bewerbungs-Mappe"), { x: MARGIN_X, y: PAGE_H - 28, size: 11, font: fontBold, color: COLOR.navy });

  // Section title
  p.drawText(safe("Anschreiben (Pratece pismo)"), { x: MARGIN_X, y: PAGE_H - 60, size: 16, font: fontBold, color: COLOR.text });
  p.drawLine({ start: { x: MARGIN_X, y: PAGE_H - 70 }, end: { x: PAGE_W - MARGIN_X, y: PAGE_H - 70 }, thickness: 0.6, color: COLOR.gold });

  // Sender block (DIN 5008 style, top-right)
  const senderLines = [
    [input.profile.vornamen, input.profile.familienname].filter(Boolean).join(" "),
    input.profile.strasse,
    [input.profile.plz, input.profile.ort].filter(Boolean).join(" "),
    input.profile.telefon,
    input.profile.email,
  ].filter(Boolean);
  let sy = PAGE_H - 100;
  senderLines.forEach((ln) => {
    p.drawText(safe(String(ln)), { x: MARGIN_X, y: sy, size: 9.5, font: fontReg, color: COLOR.text });
    sy -= 13;
  });

  // Recipient
  let ry = sy - 30;
  p.drawText(safe("An die zustaendige Botschaft / Ausslaenderbehoerde"), { x: MARGIN_X, y: ry, size: 10, font: fontBold, color: COLOR.text });
  ry -= 16;
  p.drawText(safe("- Visa-Stelle -"), { x: MARGIN_X, y: ry, size: 10, font: fontReg, color: COLOR.text });

  // Date
  ry -= 30;
  const today = new Date().toLocaleDateString("de-DE");
  p.drawText(safe(`Ort, den ${today}`), { x: PAGE_W - MARGIN_X - 160, y: ry, size: 10, font: fontReg, color: COLOR.text });

  // Subject
  ry -= 30;
  p.drawText(safe(`Betreff: Antrag auf ${input.visaType}`), { x: MARGIN_X, y: ry, size: 11, font: fontBold, color: COLOR.text });

  // Body
  ry -= 26;
  const innerW = PAGE_W - MARGIN_X * 2;
  const bodyLines = wrap(input.anschreibenBody, fontReg, 10.5, innerW);
  bodyLines.forEach((ln) => {
    if (ry < 120) return; // overflow guard (rare)
    p.drawText(ln, { x: MARGIN_X, y: ry, size: 10.5, font: fontReg, color: COLOR.text });
    ry -= 15;
  });

  // Signature line
  ry -= 30;
  p.drawLine({ start: { x: MARGIN_X, y: ry }, end: { x: MARGIN_X + 180, y: ry }, thickness: 0.5, color: COLOR.text });
  ry -= 12;
  p.drawText(safe([input.profile.vornamen, input.profile.familienname].filter(Boolean).join(" ") || "Unterschrift"), { x: MARGIN_X, y: ry, size: 10, font: fontReg, color: COLOR.text });

  // Footer
  p.drawText(safe("BalkanLink Bewerbungs-Mappe - Stand 2026 - balkanlink.de"), { x: MARGIN_X, y: 28, size: 8, font: fontReg, color: COLOR.muted });
}

function drawChecklistPage(
  doc: PDFDocument, fontReg: PDFFont, fontBold: PDFFont,
  input: BewerbungsMappeInput,
) {
  const p = doc.addPage([PAGE_W, PAGE_H]);
  p.drawRectangle({ x: 0, y: PAGE_H - 6, width: PAGE_W, height: 6, color: COLOR.gold });
  p.drawText(safe("BalkanLink Bewerbungs-Mappe"), { x: MARGIN_X, y: PAGE_H - 28, size: 11, font: fontBold, color: COLOR.navy });

  p.drawText(safe("Checkliste der Unterlagen (Lista dokumenata)"), { x: MARGIN_X, y: PAGE_H - 60, size: 16, font: fontBold, color: COLOR.text });
  p.drawLine({ start: { x: MARGIN_X, y: PAGE_H - 70 }, end: { x: PAGE_W - MARGIN_X, y: PAGE_H - 70 }, thickness: 0.6, color: COLOR.gold });

  p.drawText(safe("Donesi sve dokumente na termin. Stikliraj kako ih prikupljas."), {
    x: MARGIN_X, y: PAGE_H - 92, size: 10, font: fontReg, color: COLOR.muted,
  });

  let y = PAGE_H - 130;
  const lineH = 22;
  const boxSize = 12;
  input.checklist.forEach((item, i) => {
    // checkbox
    p.drawRectangle({
      x: MARGIN_X, y: y - 2, width: boxSize, height: boxSize,
      borderColor: COLOR.navy, borderWidth: 1, color: item.done ? COLOR.navy : COLOR.white,
    });
    if (item.done) {
      // little V mark
      p.drawText("v", { x: MARGIN_X + 3, y: y - 1, size: 10, font: fontBold, color: COLOR.white });
    }
    // label
    const labelLines = wrap(item.label, fontReg, 11, PAGE_W - MARGIN_X * 2 - boxSize - 12);
    labelLines.forEach((ln, idx) => {
      p.drawText(ln, { x: MARGIN_X + boxSize + 10, y: y - idx * 13, size: 11, font: fontReg, color: COLOR.text });
    });
    y -= Math.max(lineH, labelLines.length * 13 + 6);
    // numbering subtle dot
    if (i < input.checklist.length - 1) {
      p.drawLine({
        start: { x: MARGIN_X, y: y + 8 },
        end: { x: PAGE_W - MARGIN_X, y: y + 8 },
        thickness: 0.2, color: COLOR.rule,
      });
    }
    if (y < 80) return; // overflow guard
  });

  p.drawText(safe("BalkanLink Bewerbungs-Mappe - Stand 2026 - balkanlink.de"), { x: MARGIN_X, y: 28, size: 8, font: fontReg, color: COLOR.muted });
}

/**
 * Glavni builder — pravi kompletnu Mappu:
 *   [Cover] + [Anschreiben] + [Checkliste] + [postojeci Datenblatt sadržaj]
 */
export async function buildBewerbungsMappe(input: BewerbungsMappeInput): Promise<Uint8Array> {
  // 1. Generiši "intro" doc sa cover + anschreiben + checklist
  const introDoc = await PDFDocument.create();
  introDoc.setTitle(safe(`Bewerbungs-Mappe - ${input.formTitle}`));
  introDoc.setCreator("BalkanLink");
  introDoc.setProducer("BalkanLink Bewerbungs-Mappe Generator");

  const fontReg = await introDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await introDoc.embedFont(StandardFonts.HelveticaBold);

  drawCoverPage(introDoc, fontReg, fontBold, input);
  drawAnschreibenPage(introDoc, fontReg, fontBold, input);
  drawChecklistPage(introDoc, fontReg, fontBold, input);

  // 2. Generiši postojeći Datenblatt
  const datenblattBytes = await buildVisaDatenblatt(input);
  const datenblattDoc = await PDFDocument.load(datenblattBytes);

  // 3. Spoji: intro stranice + datenblatt stranice
  const finalDoc = await PDFDocument.create();
  finalDoc.setTitle(safe(`Bewerbungs-Mappe - ${input.formTitle}`));
  finalDoc.setCreator("BalkanLink");

  const introPages = await finalDoc.copyPages(introDoc, introDoc.getPageIndices());
  introPages.forEach((p) => finalDoc.addPage(p));
  const datenblattPages = await finalDoc.copyPages(datenblattDoc, datenblattDoc.getPageIndices());
  datenblattPages.forEach((p) => finalDoc.addPage(p));

  return finalDoc.save();
}

/**
 * Auto-generator za Anschreiben body — koristi profile + visa type.
 */
export function generateAnschreiben(
  profile: VisaSharedProfile,
  visaType: string,
  paragraphSection: string,
  extraReason?: string,
): string {
  const name = [profile.vornamen, profile.familienname].filter(Boolean).join(" ").trim() || "[Ime Prezime]";
  const nat = profile.staatsangehoerigkeit || "[Drzavljanstvo]";
  const birth = profile.geburtsdatum || "[Datum rodjenja]";
  const passNr = profile.passNr || "[Broj pasosa]";

  const intro = `Sehr geehrte Damen und Herren,`;

  const body1 = `hiermit beantrage ich, ${name}, geboren am ${birth}, Staatsangehoerigkeit ${nat}, ` +
    `die Erteilung eines Aufenthaltstitels gemaess ${paragraphSection} AufenthG (${visaType}).`;

  const body2 = `Meine Identitaet weise ich mit dem Reisepass Nr. ${passNr} nach. ` +
    `Alle relevanten Angaben zu meiner Person, zu meinem Vorhaben in Deutschland sowie ` +
    `zur Finanzierung meines Aufenthalts entnehmen Sie bitte dem beiliegenden Datenblatt ` +
    `und der Checkliste der Unterlagen, die Bestandteil dieser Bewerbungs-Mappe sind.`;

  const body3 = extraReason
    ? `${extraReason}`
    : `Fuer Rueckfragen stehe ich Ihnen jederzeit gerne zur Verfuegung.`;

  const body4 = `Ich bitte um wohlwollende Bearbeitung meines Antrags und bedanke mich im Voraus ` +
    `fuer Ihre Bemuehungen.`;

  const closing = `Mit freundlichen Gruessen`;

  return `${intro}\n\n${body1}\n\n${body2}\n\n${body3}\n\n${body4}\n\n${closing}`;
}

/** Download helper. */
export function downloadMappe(bytes: Uint8Array, fileName: string) {
  const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = fileName;
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
