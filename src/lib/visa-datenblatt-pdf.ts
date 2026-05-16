/**
 * Visa Datenblatt PDF generator.
 *
 * KONTEKST:
 *  Službeni BAMF / BA / VIDEX / Bundesdruckerei obrasci za vize tehnički nisu
 *  pogodni za 1:1 auto-fill u browseru:
 *   - BAMF Aufenthaltstitel obrasci su XFA forme (svaka Ausländerbehörde svoj),
 *     pdf-lib ne može popuniti XFA polja u browseru.
 *   - BA EzB (146206) je flat printable PDF, nema AcroForm polja.
 *   - Nationalvisum se popunjava ISKLJUČIVO u VIDEX online portalu.
 *   - Verpflichtungserklärung je sigurnosni Bundesdruckerei dokument sa
 *     serijskim brojem i ne smije se reproducirati.
 *
 *  Stoga generišemo NAŠ vlastiti čisti "Datenblatt" PDF — strukturirani prikaz
 *  svih unesenih podataka po sekcijama službenog obrasca, sa BHS i DE labelama.
 *  Korisnik štampa Datenblatt i koristi ga kao podsjetnik / template kad
 *  popunjava službeni obrazac (na šalteru, u VIDEX-u, itd.).
 *
 *  Princip identičan kao "Premium Check-liste kao PDF" iz memorije.
 */
import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from "pdf-lib";
import type { VisaSharedProfile } from "@/lib/visa-shared-profile";

export interface DatenblattRow {
  label: string;
  value: string | undefined | null;
}

export interface DatenblattSection {
  title: string;
  rows: DatenblattRow[];
}

export interface DatenblattInput {
  formTitle: string;
  formSubtitle?: string;
  /** Razlog zašto ovo nije 1:1 popunjen službeni PDF (ide u žuti box na vrh) */
  reasonNote: string;
  /** Šta korisnik dalje radi sa Datenblattom (zelena uputa) */
  usageNote: string;
  /** URL službenog originala (link na dnu) */
  officialPdfUrl?: string;
  officialPdfLabel?: string;
  profile: VisaSharedProfile;
  /** Form-specific sekcije (D, E, F...) — sekcije A/B/C iz profila se dodaju automatski */
  sections: DatenblattSection[];
}

const PAGE_W = 595.28; // A4 portrait
const PAGE_H = 841.89;
const MARGIN_X = 48;
const MARGIN_TOP = 56;
const MARGIN_BOTTOM = 56;

const COLOR = {
  text: rgb(0.09, 0.09, 0.13),
  muted: rgb(0.42, 0.45, 0.5),
  navy: rgb(0.02, 0.09, 0.27),
  gold: rgb(0.79, 0.59, 0.13),
  rule: rgb(0.85, 0.87, 0.92),
  amberBg: rgb(1, 0.97, 0.88),
  amberBorder: rgb(0.85, 0.65, 0.13),
  greenBg: rgb(0.93, 0.99, 0.95),
  greenBorder: rgb(0.06, 0.5, 0.31),
};

interface Cursor { y: number; page: PDFPage; }

function newPage(doc: PDFDocument): PDFPage {
  return doc.addPage([PAGE_W, PAGE_H]);
}

function ensureSpace(doc: PDFDocument, c: Cursor, needed: number): Cursor {
  if (c.y - needed < MARGIN_BOTTOM) {
    return { page: newPage(doc), y: PAGE_H - MARGIN_TOP };
  }
  return c;
}

/**
 * pdf-lib StandardFonts (Helvetica) koristi WinAnsi encoding koji ne podržava
 * š/č/đ/ž/ć i ostale Unicode znakove → throw "WinAnsi cannot encode...".
 * Sanitiziramo na najbliži ASCII ekvivalent prije crtanja.
 */
const DIACRITIC_MAP: Record<string, string> = {
  "š": "s", "Š": "S", "č": "c", "Č": "C", "ć": "c", "Ć": "C",
  "đ": "dj", "Đ": "Dj", "ž": "z", "Ž": "Z",
  "ä": "ae", "Ä": "Ae", "ö": "oe", "Ö": "Oe", "ü": "ue", "Ü": "Ue", "ß": "ss",
  "á": "a", "à": "a", "â": "a", "é": "e", "è": "e", "ê": "e",
  "í": "i", "ì": "i", "î": "i", "ó": "o", "ò": "o", "ô": "o",
  "ú": "u", "ù": "u", "û": "u", "ñ": "n", "ç": "c",
  "—": "-", "–": "-", "„": '"', "“": '"', "”": '"', "‚": "'", "‘": "'", "’": "'",
  "•": "*", "✓": "v", "✕": "x", "⚠": "!", "ℹ": "i", "→": "->",
};
// WinAnsi (Helvetica) ne podržava ove byte-ove — pdf-lib baca grešku ako prođu.
const WIN_ANSI_UNMAPPED = new Set([0x81, 0x8D, 0x8F, 0x90, 0x9D]);
function safe(s: string): string {
  if (!s) return "";
  return s.split("").map((c) => {
    if (DIACRITIC_MAP[c]) return DIACRITIC_MAP[c];
    const code = c.charCodeAt(0);
    if (code < 32 && code !== 10) return " ";
    if (code >= 256) return "?";
    if (WIN_ANSI_UNMAPPED.has(code)) return "?";
    return c;
  }).join("");
}

function wrap(text: string, font: PDFFont, size: number, maxW: number): string[] {
  const out: string[] = [];
  for (const para of (safe(text) || "").split("\n")) {
    const words = para.split(/\s+/);
    let line = "";
    for (const w of words) {
      const test = line ? line + " " + w : w;
      if (font.widthOfTextAtSize(test, size) > maxW && line) {
        out.push(line);
        line = w;
      } else {
        line = test;
      }
    }
    out.push(line);
  }
  return out;
}

function drawText(
  page: PDFPage, text: string, x: number, y: number,
  font: PDFFont, size: number, color = COLOR.text,
) {
  page.drawText(safe(text || ""), { x, y, size, font, color });
}

function drawWrappedBox(
  doc: PDFDocument, c: Cursor, text: string, font: PDFFont, size: number,
  bg: ReturnType<typeof rgb>, border: ReturnType<typeof rgb>,
): Cursor {
  const innerW = PAGE_W - MARGIN_X * 2 - 20;
  const lines = wrap(text, font, size, innerW);
  const lineH = size * 1.4;
  const boxH = lines.length * lineH + 18;
  let cur = ensureSpace(doc, c, boxH + 6);
  cur.page.drawRectangle({
    x: MARGIN_X, y: cur.y - boxH, width: PAGE_W - MARGIN_X * 2, height: boxH,
    color: bg, borderColor: border, borderWidth: 1.2,
  });
  let yy = cur.y - 14;
  for (const ln of lines) {
    drawText(cur.page, ln, MARGIN_X + 10, yy, font, size, COLOR.text);
    yy -= lineH;
  }
  return { page: cur.page, y: cur.y - boxH - 12 };
}

function drawSectionHeader(
  doc: PDFDocument, c: Cursor, title: string, fontBold: PDFFont,
): Cursor {
  let cur = ensureSpace(doc, c, 32);
  cur.page.drawRectangle({
    x: MARGIN_X, y: cur.y - 4, width: 4, height: 18, color: COLOR.gold,
  });
  drawText(cur.page, title, MARGIN_X + 12, cur.y, fontBold, 12.5, COLOR.navy);
  cur.page.drawLine({
    start: { x: MARGIN_X, y: cur.y - 8 },
    end: { x: PAGE_W - MARGIN_X, y: cur.y - 8 },
    thickness: 0.5, color: COLOR.rule,
  });
  return { page: cur.page, y: cur.y - 22 };
}

function drawRow(
  doc: PDFDocument, c: Cursor, label: string, value: string,
  fontBold: PDFFont, fontReg: PDFFont,
): Cursor {
  const labelW = 200;
  const valueW = PAGE_W - MARGIN_X * 2 - labelW - 10;
  const labelLines = wrap(label, fontBold, 9.5, labelW);
  const valueLines = wrap(value || "—", fontReg, 10.5, valueW);
  const rows = Math.max(labelLines.length, valueLines.length);
  const lineH = 14;
  const blockH = rows * lineH + 6;
  let cur = ensureSpace(doc, c, blockH);
  let yy = cur.y;
  labelLines.forEach((ln, i) => drawText(cur.page, ln, MARGIN_X, yy - i * lineH, fontBold, 9.5, COLOR.muted));
  valueLines.forEach((ln, i) => drawText(cur.page, ln, MARGIN_X + labelW, yy - i * lineH, fontReg, 10.5, value ? COLOR.text : COLOR.muted));
  cur.page.drawLine({
    start: { x: MARGIN_X, y: yy - blockH + 4 },
    end: { x: PAGE_W - MARGIN_X, y: yy - blockH + 4 },
    thickness: 0.3, color: COLOR.rule,
  });
  return { page: cur.page, y: yy - blockH };
}

function drawHeader(page: PDFPage, fontBold: PDFFont, fontReg: PDFFont, title: string, subtitle?: string) {
  // Top bar
  page.drawRectangle({ x: 0, y: PAGE_H - 6, width: PAGE_W, height: 6, color: COLOR.gold });
  drawText(page, "BalkanLink — Datenblatt", MARGIN_X, PAGE_H - 28, fontBold, 11, COLOR.navy);
  drawText(page, "balkanlink.de", PAGE_W - MARGIN_X - fontReg.widthOfTextAtSize("balkanlink.de", 9), PAGE_H - 28, fontReg, 9, COLOR.muted);
  drawText(page, title, MARGIN_X, PAGE_H - 50, fontBold, 14, COLOR.text);
  if (subtitle) {
    drawText(page, subtitle, MARGIN_X, PAGE_H - 66, fontReg, 9.5, COLOR.muted);
  }
  page.drawLine({
    start: { x: MARGIN_X, y: PAGE_H - 76 }, end: { x: PAGE_W - MARGIN_X, y: PAGE_H - 76 },
    thickness: 0.5, color: COLOR.rule,
  });
}

function drawFooter(page: PDFPage, fontReg: PDFFont, idx: number, total: number) {
  drawText(page, `Datenblatt — generisano lokalno u browseru • Stand 2026 • BalkanLink je informativni servis (RDG/StBerG)`, MARGIN_X, 28, fontReg, 8, COLOR.muted);
  const pg = `${idx} / ${total}`;
  drawText(page, pg, PAGE_W - MARGIN_X - fontReg.widthOfTextAtSize(pg, 9), 28, fontReg, 9, COLOR.muted);
}

function profileSections(p: VisaSharedProfile): DatenblattSection[] {
  return [
    {
      title: "A. Persönliche Angaben (Lični podaci)",
      rows: [
        { label: "Familienname (Prezime)", value: p.familienname },
        { label: "Geburtsname (Djevojačko prezime)", value: p.geburtsname },
        { label: "Vornamen (Ime)", value: p.vornamen },
        { label: "Geburtsdatum (Datum rođenja)", value: p.geburtsdatum },
        { label: "Geburtsort / -land (Mjesto / država rođenja)", value: [p.geburtsort, p.geburtsland].filter(Boolean).join(", ") },
        { label: "Staatsangehörigkeit (Državljanstvo)", value: p.staatsangehoerigkeit },
        { label: "Geschlecht (Spol)", value: p.geschlecht },
        { label: "Familienstand (Bračno stanje)", value: p.familienstand },
      ],
    },
    {
      title: "B. Reisepass (Pasoš)",
      rows: [
        { label: "Pass-Nr. (Broj pasoša)", value: p.passNr },
        { label: "Ausgestellt am (Datum izdavanja)", value: p.passAusgestellt },
        { label: "Gültig bis (Vrijedi do)", value: p.passGueltigBis },
        { label: "Behörde (Izdavalac)", value: p.passBehoerde },
      ],
    },
    {
      title: "C. Anschrift in Deutschland & Kontakt",
      rows: [
        { label: "Straße, Hausnr.", value: p.strasse },
        { label: "PLZ, Ort", value: [p.plz, p.ort].filter(Boolean).join(" ") },
        { label: "Telefon", value: p.telefon },
        { label: "E-Mail", value: p.email },
      ],
    },
  ];
}

export async function buildVisaDatenblatt(input: DatenblattInput): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  doc.setTitle(safe(`Datenblatt — ${input.formTitle}`));
  doc.setCreator("BalkanLink");
  doc.setProducer("BalkanLink Datenblatt Generator");

  const fontReg = await doc.embedFont(StandardFonts.Helvetica);
  const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);

  let page = newPage(doc);
  drawHeader(page, fontBold, fontReg, input.formTitle, input.formSubtitle);
  let c: Cursor = { page, y: PAGE_H - 92 };

  // Reason box (amber)
  c = drawWrappedBox(doc, c, `⚠ Zašto Datenblatt umjesto popunjenog službenog PDF-a:\n${input.reasonNote}`, fontReg, 9.5, COLOR.amberBg, COLOR.amberBorder);

  // Usage box (green)
  c = drawWrappedBox(doc, c, `✓ Kako koristiti Datenblatt:\n${input.usageNote}`, fontReg, 9.5, COLOR.greenBg, COLOR.greenBorder);

  // Sections
  const allSections = [...profileSections(input.profile), ...input.sections];
  for (const sec of allSections) {
    c = drawSectionHeader(doc, c, sec.title, fontBold);
    for (const r of sec.rows) {
      c = drawRow(doc, c, r.label, (r.value ?? "").toString(), fontBold, fontReg);
    }
    c.y -= 6;
  }

  // Footer + per-page header on subsequent pages
  const pages = doc.getPages();
  pages.forEach((p, i) => {
    if (i > 0) {
      drawText(p, "BalkanLink — Datenblatt (nastavak)", MARGIN_X, PAGE_H - 28, fontBold, 10, COLOR.navy);
      p.drawLine({
        start: { x: MARGIN_X, y: PAGE_H - 36 }, end: { x: PAGE_W - MARGIN_X, y: PAGE_H - 36 },
        thickness: 0.4, color: COLOR.rule,
      });
    }
    drawFooter(p, fontReg, i + 1, pages.length);
    if (input.officialPdfUrl) {
      const txt = `${input.officialPdfLabel ?? "Original obrazac"}: ${input.officialPdfUrl}`;
      drawText(p, txt, MARGIN_X, 14, fontReg, 7.5, COLOR.muted);
    }
  });

  return doc.save();
}

export function downloadDatenblatt(bytes: Uint8Array, fileName: string) {
  const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
