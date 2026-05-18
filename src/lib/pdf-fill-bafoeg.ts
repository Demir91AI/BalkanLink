/**
 * BAföG Formblatt 01 (BMBF, Stand 2025) — popunjava originalni PDF.
 * Zero-Knowledge: sve lokalno u browseru. PDF ostaje editabilan.
 */
import { fillPdfForm, type PdfFormConfig, type FieldFill, downloadBlob } from "@/lib/pdf-form-engine";

export { downloadBlob };

const PDF_URL = "/muster/bafoeg-formblatt-01-2025.pdf";

export interface BafoegElternteil {
  name: string;
  vorname: string;
  geburtsdatum: string;
  strasse: string;
  plz: string;
  ort: string;
}

export interface BafoegFormData {
  familienname: string;
  vorname: string;
  geburtsdatum: string;
  geburtsort: string;
  staatsangehoerigkeit: string;
  strasse: string;
  plz: string;
  ort: string;
  telefon: string;
  email: string;
  iban: string;
  // Ausbildung
  schuleName: string;
  studiengang: string;
  ausbildungsortPlz: string;
  ausbildungsort: string;
  bafoegAmt: string;
  // Eltern
  eltern: BafoegElternteil[];
  // Potpis
  sigOrt: string;
  sigDatum: string;
}

const txt = (name: string, value: string): FieldFill => ({ name, type: "text", value });

function parseStrasseHausnr(s: string): { strasse: string; hausnr: string } {
  const m = /^(.+?)\s+(\d+[a-zA-Z]?)$/.exec(s.trim());
  if (m) return { strasse: m[1].trim(), hausnr: m[2] };
  return { strasse: s, hausnr: "" };
}

function formatDate(iso: string): string {
  if (!iso) return "";
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  return m ? `${m[3]}.${m[2]}.${m[1]}` : iso;
}

export function buildBafoegFieldFills(d: BafoegFormData): FieldFill[] {
  const fills: FieldFill[] = [];
  const fullName = [d.vorname, d.familienname].filter(Boolean).join(" ").trim();
  const sh = parseStrasseHausnr(d.strasse);

  if (d.familienname) fills.push(txt("Name", d.familienname));
  if (d.vorname) fills.push(txt("Vorname", d.vorname));
  if (d.geburtsdatum) fills.push(txt("Geburtsdatum", formatDate(d.geburtsdatum)));
  if (d.geburtsort) fills.push(txt("Geburtsort", d.geburtsort));
  if (d.staatsangehoerigkeit) fills.push(txt("eigene Staatsangehörigkeit", d.staatsangehoerigkeit));

  if (sh.strasse) fills.push(txt("Anschrift Straße", sh.strasse));
  if (sh.hausnr) fills.push(txt("Anschrift Hausnummer", sh.hausnr));
  if (d.plz) fills.push(txt("Anschrift Postleitzahl", d.plz));
  if (d.ort) fills.push(txt("Anschrift Ort", d.ort));
  fills.push(txt("Anschrift Land", "Deutschland"));

  if (d.telefon) fills.push(txt("Kontaktdaten Telefon", d.telefon));
  if (d.email) fills.push(txt("Kontaktdaten E-Mail", d.email));

  // IBAN: 6 polja po 4 cifre (DE = 22)
  const ibanClean = d.iban.replace(/\s+/g, "");
  if (ibanClean) {
    for (let i = 0; i < 6; i++) {
      const seg = ibanClean.slice(i * 4, i * 4 + 4);
      if (seg) fills.push(txt(`IBAN ${i + 1}`, seg));
    }
    if (fullName) fills.push(txt("Name, Vorname Kontoinhaber", fullName));
  }

  // Ausbildung
  const ausbStaette = [d.schuleName, d.ausbildungsort].filter(Boolean).join(", ");
  if (ausbStaette) fills.push(txt("Ausbildungsstätte und Ausbildungsort", ausbStaette));
  if (d.studiengang) fills.push(txt("Klasse/Fachrichtung", d.studiengang));
  if (d.ausbildungsortPlz) fills.push(txt("Anschrift Ausbildung Postleitzahl", d.ausbildungsortPlz));
  if (d.ausbildungsort) fills.push(txt("Anschrift Ausbildung Ort", d.ausbildungsort));
  fills.push(txt("Anschrift Ausbildung Land", "Deutschland"));
  if (fullName) fills.push(txt("auszubildende Person", fullName));
  if (d.bafoegAmt) fills.push(txt("bisheriges Amt für Ausbildungsförderung", d.bafoegAmt));

  // Eltern (do 2)
  const ELTERN_KEYS = [
    { suffix: "1. Elternteil", strSpace: "" },
    { suffix: " 2. Elternteil", strSpace: " " }, // PDF koristi dupli space prefiks za 2. Elternteil
  ];
  (d.eltern || []).slice(0, 2).forEach((e, i) => {
    const k = ELTERN_KEYS[i];
    const esh = parseStrasseHausnr(e.strasse);
    if (e.name) fills.push(txt(`Name ${k.suffix}`, e.name));
    if (e.vorname) fills.push(txt(`Vorname Name ${k.suffix}`, e.vorname));
    if (e.geburtsdatum) fills.push(txt(`Geburtsdatum ${k.suffix}`, formatDate(e.geburtsdatum)));
    if (esh.strasse) fills.push(txt(`Straße${k.strSpace} ${k.suffix.replace(/^\s+/, "")}`.replace("Straße", "Straße"), esh.strasse));
    // Korigovani exact field names po listingu:
    if (i === 0) {
      if (esh.strasse) fills.push(txt("Straße 1. Elternteil", esh.strasse));
      if (esh.hausnr) fills.push(txt("Hausnummer 1. Elternteil", esh.hausnr));
      if (e.plz) fills.push(txt("Postleitzahl 1. Elternteil", e.plz));
      if (e.ort) fills.push(txt("Ort 1. Elternteil", e.ort));
      fills.push(txt("Land 1. Elternteil", "Deutschland"));
    } else {
      if (esh.strasse) fills.push(txt("Straße  2. Elternteil", esh.strasse));
      if (esh.hausnr) fills.push(txt("Hausnummer  2. Elternteil", esh.hausnr));
      if (e.plz) fills.push(txt("Postleitzahl  2. Elternteil", e.plz));
      if (e.ort) fills.push(txt("Ort  2. Elternteil", e.ort));
      fills.push(txt("Land  2. Elternteil", "Deutschland"));
    }
  });

  // Potpis (datum + Ort)
  if (d.sigDatum || d.sigOrt) {
    const dateStr = [d.sigOrt, formatDate(d.sigDatum)].filter(Boolean).join(", ");
    fills.push(txt("Datum UnterschriftNamensangabe durch die auszubildende Person", dateStr));
  }

  return fills;
}

const BAFOEG_CONFIG: PdfFormConfig<BafoegFormData> = {
  url: PDF_URL,
  label: "BAföG Formblatt 01 (BMBF)",
  builder: buildBafoegFieldFills,
  updateFieldAppearances: false,
};

export async function fillBafoegPdf(data: BafoegFormData): Promise<Blob> {
  return fillPdfForm(BAFOEG_CONFIG, data, "BafoegPDF");
}
