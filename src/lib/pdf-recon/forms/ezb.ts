/**
 * EzB — Erklärung zum Beschäftigungsverhältnis (BA-Vordruck 146206) 1:1 rekonstrukcija.
 * Popunjava poslodavac, predaje se uz vizu (BA Vorabzustimmung).
 */
import { PDFDocument } from "pdf-lib";
import { loadReconFonts } from "../font-loader";
import {
  A4, MARGIN, COL, type Ctx,
  pageHeader, sectionHeader, field, pageFooter, signLine,
} from "../layout-primitives";
import type { VisaSharedProfile } from "@/lib/visa-shared-profile";

export interface EzbData {
  profile: VisaSharedProfile;
  agName?: string; agAdresse?: string; agAnsprechpartner?: string;
  agTelefon?: string; agEmail?: string;
  branche?: string; betriebsgroesse?: string;
  taetigkeit?: string; arbeitsort?: string;
  vertragsbeginn?: string; vertragsende?: string; befristet?: string;
  wochenstunden?: string; schichtarbeit?: string;
  bruttoMonat?: string; bruttoStunde?: string;
  urlaubstage?: string; tarifvertrag?: string;
  ortDatum?: string;
}

const FORM_CODE = "BA 146206\nEzB";
const FORM_TITLE = "Erklärung zum Beschäftigungsverhältnis";
const FORM_SUB = "§ 39 AufenthG · einzureichen mit dem Visumantrag / bei der Ausländerbehörde";

export async function buildEzbPdf(d: EzbData): Promise<Uint8Array> {
  const p = d.profile;
  const doc = await PDFDocument.create();
  doc.setTitle("EzB — BalkanLink");
  doc.setCreator("BalkanLink");
  const { regular, bold } = await loadReconFonts(doc);

  const page = doc.addPage([A4.w, A4.h]);
  const c: Ctx = { page, reg: regular, bold };
  pageHeader(c, { formCode: FORM_CODE, title: FORM_TITLE, subtitle: FORM_SUB, page: 1, total: 1 });

  let y = A4.h - 76;
  const W = A4.w - MARGIN.left - MARGIN.right;
  const colW = (W - 6) / 2;
  const xL = MARGIN.left;
  const xR = MARGIN.left + colW + 6;

  // 1. Ausländer/in
  y = sectionHeader(c, y, 1, "Angaben zum/zur ausländischen Arbeitnehmer/in");
  field(c, { x: xL, y: y - 26, w: colW, label: "1.1 Familienname", value: p.familienname });
  field(c, { x: xR, y: y - 26, w: colW, label: "1.2 Vornamen", value: p.vornamen });
  y -= 32;
  field(c, { x: xL, y: y - 26, w: colW, label: "1.3 Geburtsdatum", value: p.geburtsdatum, hint: "tt.mm.jjjj" });
  field(c, { x: xR, y: y - 26, w: colW, label: "1.4 Staatsangehörigkeit", value: p.staatsangehoerigkeit });
  y -= 32;
  field(c, { x: xL, y: y - 26, w: W, label: "1.5 Pass-Nr.", value: p.passNr });
  y -= 38;

  // 2. Arbeitgeber
  y = sectionHeader(c, y, 2, "Angaben zum Arbeitgeber");
  field(c, { x: xL, y: y - 26, w: W, label: "2.1 Firma / Arbeitgeber-Name", value: d.agName });
  y -= 32;
  field(c, { x: xL, y: y - 26, w: W, label: "2.2 Anschrift", value: d.agAdresse });
  y -= 32;
  field(c, { x: xL, y: y - 26, w: colW, label: "2.3 Ansprechpartner", value: d.agAnsprechpartner });
  field(c, { x: xR, y: y - 26, w: colW, label: "2.4 Telefon", value: d.agTelefon });
  y -= 32;
  field(c, { x: xL, y: y - 26, w: colW, label: "2.5 E-Mail", value: d.agEmail });
  field(c, { x: xR, y: y - 26, w: colW, label: "2.6 Branche", value: d.branche });
  y -= 32;
  field(c, { x: xL, y: y - 26, w: colW, label: "2.7 Betriebsgröße (Mitarbeiter)", value: d.betriebsgroesse });
  y -= 38;

  // 3. Tätigkeit & Arbeitsort
  y = sectionHeader(c, y, 3, "Tätigkeit und Arbeitsort");
  field(c, { x: xL, y: y - 26, w: W, label: "3.1 Bezeichnung der Tätigkeit", value: d.taetigkeit });
  y -= 32;
  field(c, { x: xL, y: y - 26, w: W, label: "3.2 Arbeitsort (Ort, ggf. Adresse)", value: d.arbeitsort });
  y -= 38;

  // 4. Arbeitsverhältnis
  y = sectionHeader(c, y, 4, "Arbeitsverhältnis");
  field(c, { x: xL, y: y - 26, w: colW, label: "4.1 Vertragsbeginn", value: d.vertragsbeginn, hint: "tt.mm.jjjj" });
  field(c, { x: xR, y: y - 26, w: colW, label: "4.2 Vertragsende (bei Befristung)", value: d.vertragsende, hint: "tt.mm.jjjj" });
  y -= 32;
  field(c, { x: xL, y: y - 26, w: colW, label: "4.3 Befristet (ja/nein)", value: d.befristet });
  field(c, { x: xR, y: y - 26, w: colW, label: "4.4 Wochenstunden", value: d.wochenstunden });
  y -= 32;
  field(c, { x: xL, y: y - 26, w: W, label: "4.5 Schichtarbeit (ja/nein)", value: d.schichtarbeit });
  y -= 38;

  // 5. Vergütung
  y = sectionHeader(c, y, 5, "Vergütung");
  field(c, { x: xL, y: y - 26, w: colW, label: "5.1 Brutto-Monatsgehalt (EUR)", value: d.bruttoMonat });
  field(c, { x: xR, y: y - 26, w: colW, label: "5.2 Brutto-Stundenlohn (EUR)", value: d.bruttoStunde });
  y -= 32;
  field(c, { x: xL, y: y - 26, w: colW, label: "5.3 Urlaubstage / Jahr", value: d.urlaubstage });
  field(c, { x: xR, y: y - 26, w: colW, label: "5.4 Tarifvertrag", value: d.tarifvertrag });
  y -= 38;

  // 6. Erklärung & Unterschrift Arbeitgeber — uvijek na dnu, ako nema mjesta otvori novu stranicu
  let secCtx = c;
  let secY = y;
  if (y < 170) {
    const p2 = doc.addPage([A4.w, A4.h]);
    secCtx = { page: p2, reg: regular, bold };
    pageHeader(secCtx, { formCode: FORM_CODE, title: FORM_TITLE, subtitle: FORM_SUB, page: 2, total: 2 });
    secY = A4.h - 76;
  }
  secY = sectionHeader(secCtx, secY, 6, "Erklärung und Unterschrift des Arbeitgebers");
  secCtx.page.drawText(
    "Der Arbeitgeber erklärt, dass die obigen Angaben richtig und vollständig sind und",
    { x: MARGIN.left, y: secY - 14, size: 8.5, font: regular, color: COL.text },
  );
  secCtx.page.drawText(
    "die Beschäftigung zu den genannten Bedingungen erfolgt (§ 39 AufenthG, § 26 BeschV).",
    { x: MARGIN.left, y: secY - 26, size: 8.5, font: regular, color: COL.text },
  );
  const sigY = secY - 70;
  signLine(secCtx, MARGIN.left, sigY, 180, d.ortDatum ? `Ort, Datum: ${d.ortDatum}` : "Ort, Datum");
  signLine(secCtx, MARGIN.left + 220, sigY, A4.w - MARGIN.right - MARGIN.left - 220, "Unterschrift & Firmenstempel");

  // Update footer pages
  const total = secCtx.page === c.page ? 1 : 2;
  pageFooter(c, "BA 146206 EzB / BL-Rekonstruktion", 1, total);
  if (total === 2) pageFooter(secCtx, "BA 146206 EzB / BL-Rekonstruktion", 2, 2);
  return doc.save();
}
