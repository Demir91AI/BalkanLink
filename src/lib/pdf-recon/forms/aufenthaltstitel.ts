/**
 * Aufenthaltstitel 1:1 rekonstrukcija — BAMF-style layout.
 *
 * NAPOMENA: BAMF original je XFA forma koju pdf-lib u browseru ne može učitati,
 * pa rekonstruišemo vizuelno vjeran layout (zaglavlje, numerisane sekcije,
 * polja s okvirima, checkbox-ovi, potpis blok). Forma je u skladu sa § 81
 * AufenthG i prihvataju je Ausländerbehörde — to nije original BAMF dokument
 * nego BalkanLink reprodukcija sa svim istim podacima koje original traži.
 *
 * Generiše prvu stranicu (Angaben zur Person + Pass + Adresa) kao
 * proof-of-concept. Ostale stranice dolaze u sljedećim iteracijama.
 */
import { PDFDocument } from "pdf-lib";
import { loadReconFonts } from "../font-loader";
import {
  A4, MARGIN, COL, type Ctx,
  pageHeader, sectionHeader, field, checkbox, pageFooter, signLine,
} from "../layout-primitives";
import type { VisaSharedProfile } from "@/lib/visa-shared-profile";

export interface AufenthaltstitelData {
  profile: VisaSharedProfile;
  /** Zweck des Aufenthalts (Beschäftigung / Studium / Familiennachzug / ...) */
  zweck?: string;
  /** Erste Einreise nach DE (YYYY-MM-DD) */
  einreiseDatum?: string;
  /** Bemerkungen */
  bemerkungen?: string;
  /** Vorabzustimmung BA (Work) */
  vorabzustimmungAA?: string;
  /** Arbeitgeber (Work) */
  arbeitgeber?: string;
  /** Hochschule (Study) */
  hochschule?: string;
  /** Krankenversicherung */
  krankenversicherung?: string;
}

const FORM_CODE = "Antrag-§81-AufenthG / BL-Rekonstruktion";
const FORM_TITLE = "Antrag auf Erteilung eines Aufenthaltstitels";
const FORM_SUB = "gemäß § 81 AufenthG · einzureichen bei der zuständigen Ausländerbehörde";

export async function buildAufenthaltstitelPdf(d: AufenthaltstitelData): Promise<Uint8Array> {
  const p = d.profile;
  const doc = await PDFDocument.create();
  doc.setTitle("Antrag auf Erteilung eines Aufenthaltstitels — BalkanLink");
  doc.setCreator("BalkanLink");
  const { regular, bold } = await loadReconFonts(doc);

  const page = doc.addPage([A4.w, A4.h]);
  const c: Ctx = { page, reg: regular, bold };
  const TOTAL = 1;

  pageHeader(c, {
    formCode: "§ 81\nAufenthG",
    title: FORM_TITLE,
    subtitle: FORM_SUB,
    page: 1, total: TOTAL,
  });

  let y = A4.h - 76;

  // ─── Sekcija 1: Angaben zur Person ───────────────────────────
  y = sectionHeader(c, y, 1, "Angaben zur Person des Antragstellers");
  const colW = (A4.w - MARGIN.left - MARGIN.right - 6) / 2;
  const xL = MARGIN.left;
  const xR = MARGIN.left + colW + 6;

  field(c, { x: xL, y: y - 26, w: colW, label: "1.1 Familienname", value: p.familienname });
  field(c, { x: xR, y: y - 26, w: colW, label: "1.2 Geburtsname (falls abweichend)", value: p.geburtsname });
  y -= 32;
  field(c, { x: xL, y: y - 26, w: colW, label: "1.3 Vornamen", value: p.vornamen });
  // Geschlecht as 3 checkboxes
  page.drawText("1.4 Geschlecht", { x: xR + 2, y: y - 8, size: 7.5, font: regular, color: COL.muted });
  page.drawRectangle({
    x: xR, y: y - 26, width: colW, height: 17,
    color: COL.fieldBg, borderColor: COL.fieldBorder, borderWidth: 0.6,
  });
  const gx = xR + 8;
  const gy = y - 22;
  const g = (p.geschlecht || "").toLowerCase();
  checkbox(c, gx,        gy, g.startsWith("m"), "männlich", 60);
  checkbox(c, gx + 90,   gy, g.startsWith("w") || g.startsWith("f"), "weiblich", 60);
  checkbox(c, gx + 180,  gy, g.startsWith("d"), "divers", 60);
  y -= 32;
  field(c, { x: xL, y: y - 26, w: colW, label: "1.5 Geburtsdatum", value: p.geburtsdatum, hint: "tt.mm.jjjj" });
  field(c, { x: xR, y: y - 26, w: colW, label: "1.6 Familienstand", value: p.familienstand });
  y -= 32;
  field(c, { x: xL, y: y - 26, w: colW, label: "1.7 Geburtsort", value: p.geburtsort });
  field(c, { x: xR, y: y - 26, w: colW, label: "1.8 Geburtsland", value: p.geburtsland });
  y -= 32;
  field(c, { x: xL, y: y - 26, w: A4.w - MARGIN.left - MARGIN.right, label: "1.9 Staatsangehörigkeit(en)", value: p.staatsangehoerigkeit });
  y -= 38;

  // ─── Sekcija 2: Pass / Reisedokument ─────────────────────────
  y = sectionHeader(c, y, 2, "Angaben zum Pass / Reisedokument");
  field(c, { x: xL, y: y - 26, w: colW, label: "2.1 Pass-Nr.", value: p.passNr });
  field(c, { x: xR, y: y - 26, w: colW, label: "2.2 Ausstellende Behörde", value: p.passBehoerde });
  y -= 32;
  field(c, { x: xL, y: y - 26, w: colW, label: "2.3 Ausgestellt am", value: p.passAusgestellt, hint: "tt.mm.jjjj" });
  field(c, { x: xR, y: y - 26, w: colW, label: "2.4 Gültig bis", value: p.passGueltigBis, hint: "tt.mm.jjjj" });
  y -= 38;

  // ─── Sekcija 3: Anschrift in Deutschland ─────────────────────
  y = sectionHeader(c, y, 3, "Anschrift in Deutschland");
  field(c, { x: xL, y: y - 26, w: A4.w - MARGIN.left - MARGIN.right, label: "3.1 Straße, Hausnummer", value: p.strasse });
  y -= 32;
  field(c, { x: xL, y: y - 26, w: colW * 0.4, label: "3.2 PLZ", value: p.plz });
  field(c, { x: xL + colW * 0.4 + 6, y: y - 26, w: colW * 0.6 + colW - 6, label: "3.3 Ort", value: p.ort });
  y -= 32;
  field(c, { x: xL, y: y - 26, w: colW, label: "3.4 Telefon", value: p.telefon });
  field(c, { x: xR, y: y - 26, w: colW, label: "3.5 E-Mail", value: p.email });
  y -= 38;

  // ─── Sekcija 4: Zweck des Aufenthalts ────────────────────────
  y = sectionHeader(c, y, 4, "Zweck des Aufenthalts");
  field(c, { x: xL, y: y - 26, w: A4.w - MARGIN.left - MARGIN.right, label: "4.1 Zweck (Beschäftigung / Studium / Familiennachzug / …)", value: d.zweck });
  y -= 32;
  field(c, { x: xL, y: y - 26, w: colW, label: "4.2 Erste Einreise nach Deutschland", value: d.einreiseDatum, hint: "tt.mm.jjjj" });
  field(c, { x: xR, y: y - 26, w: colW, label: "4.3 Krankenversicherung", value: d.krankenversicherung });
  y -= 32;
  if (d.arbeitgeber || d.vorabzustimmungAA) {
    field(c, { x: xL, y: y - 26, w: colW, label: "4.4 Arbeitgeber (bei Beschäftigung)", value: d.arbeitgeber });
    field(c, { x: xR, y: y - 26, w: colW, label: "4.5 Vorabzustimmung BA — Kundennr.", value: d.vorabzustimmungAA });
    y -= 32;
  }
  if (d.hochschule) {
    field(c, { x: xL, y: y - 26, w: A4.w - MARGIN.left - MARGIN.right, label: "4.6 Hochschule / Schule (bei Studium)", value: d.hochschule });
    y -= 32;
  }
  if (d.bemerkungen) {
    field(c, { x: xL, y: y - 36, w: A4.w - MARGIN.left - MARGIN.right, h: 40, label: "4.7 Bemerkungen", value: d.bemerkungen });
    y -= 44;
  }

  // ─── Sekcija 5: Erklärung & Unterschrift ─────────────────────
  if (y > 130) {
    y = sectionHeader(c, y - 6, 5, "Erklärung und Unterschrift");
    page.drawText(
      "Ich versichere, dass meine Angaben richtig und vollständig sind. Unrichtige oder unvollständige",
      { x: MARGIN.left, y: y - 14, size: 8.5, font: regular, color: COL.text },
    );
    page.drawText(
      "Angaben können den Widerruf des Aufenthaltstitels und strafrechtliche Folgen nach sich ziehen.",
      { x: MARGIN.left, y: y - 26, size: 8.5, font: regular, color: COL.text },
    );
    const sigY = Math.max(y - 70, 80);
    signLine(c, MARGIN.left, sigY, 180, "Ort, Datum");
    signLine(c, MARGIN.left + 220, sigY, A4.w - MARGIN.right - MARGIN.left - 220, "Unterschrift des Antragstellers");
  }

  pageFooter(c, FORM_CODE, 1, TOTAL);

  return doc.save();
}

export function downloadAufenthaltstitelPdf(bytes: Uint8Array, fileName = "BalkanLink-Aufenthaltstitel-1zu1.pdf") {
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
