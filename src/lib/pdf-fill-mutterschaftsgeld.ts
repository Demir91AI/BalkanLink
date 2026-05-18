/**
 * Mutterschaftsgeld (BAS — Bundesamt für soziale Sicherung), Antragsformular 2026.
 * Za privatno osigurane / samozaposlene bez GKV Krankentagegelda.
 * Zero-Knowledge: sve lokalno u browseru. PDF ostaje editabilan.
 */
import { fillPdfForm, type PdfFormConfig, type FieldFill, downloadBlob } from "@/lib/pdf-form-engine";

export { downloadBlob };

const PDF_URL = "/muster/mutterschaftsgeld-bas-2026.pdf";

export interface MutterschaftsgeldFormData {
  vorname: string;
  nachname: string;
  geburtsdatum: string;
  versichertenNr: string;
  strasse: string;
  plz: string;
  ort: string;
  krankenkasse: string;
  entbindungstermin: string;
  tatsaechlicheGeburt: string;
  beschaeftigtBei: string;
  beschaeftigtSeit: string;
  schutzfristVon: string;
  schutzfristBis: string;
  iban: string;
  bic: string;
  kontoinhaber: string;
}

const txt = (name: string, value: string): FieldFill => ({ name, type: "text", value });

function formatDate(iso: string): string {
  if (!iso) return "";
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  return m ? `${m[3]}.${m[2]}.${m[1]}` : iso;
}

export function buildMutterschaftsgeldFieldFills(d: MutterschaftsgeldFormData): FieldFill[] {
  const fills: FieldFill[] = [];
  const fullName = [d.nachname, d.vorname].filter(Boolean).join(", ").trim();
  const anschrift = [d.strasse, [d.plz, d.ort].filter(Boolean).join(" ")].filter(Boolean).join(", ");

  // Gornji blok (kratka verzija)
  if (fullName) fills.push(txt("Name Vorname", fullName));
  if (anschrift) fills.push(txt("Anschrift", anschrift));
  if (d.entbindungstermin) fills.push(txt("Voraussichtlicher Entbindungstermin 1", formatDate(d.entbindungstermin)));
  if (d.schutzfristVon) fills.push(txt("Beginn der Schutzfrist", formatDate(d.schutzfristVon)));
  if (d.versichertenNr) fills.push(txt("SteuerID", d.versichertenNr));
  if (d.beschaeftigtSeit) fills.push(txt("Beginn des Beschäftigungsverhältnisses Heimarbeitsverhältnisses", formatDate(d.beschaeftigtSeit)));

  // IBAN / kontoinhaber
  if (d.iban) fills.push(txt("IBAN", d.iban.replace(/\s+/g, "")));
  if (d.kontoinhaber) fills.push(txt("Name des Kontoinhabers sofern es sich nicht um Ihr eigenes Konto handelt", d.kontoinhaber));

  // Donji blok (detaljni profil)
  if (d.nachname) fills.push(txt("Name", d.nachname));
  if (d.vorname) fills.push(txt("Vorname", d.vorname));
  if (d.geburtsdatum) fills.push(txt("Geburtsdatum", formatDate(d.geburtsdatum)));
  if (d.strasse) fills.push(txt("Adresse", d.strasse));
  if (d.plz) fills.push(txt("Postleitzahl", d.plz));
  if (d.ort) fills.push(txt("Wohnort", d.ort));
  if (d.entbindungstermin) fills.push(txt("voraussichtlicher Entbindungstermin", formatDate(d.entbindungstermin)));
  if (d.tatsaechlicheGeburt) fills.push(txt("tatsächlicher Entbindungstermin", formatDate(d.tatsaechlicheGeburt)));
  if (d.krankenkasse) fills.push(txt("Krankenkasse", d.krankenkasse));
  if (d.beschaeftigtBei) fills.push(txt("1 Name Arbeitgeber", d.beschaeftigtBei));
  if (d.beschaeftigtSeit) fills.push(txt("seit", formatDate(d.beschaeftigtSeit)));
  if (d.versichertenNr) fills.push(txt("Identifikationsnummer", d.versichertenNr));

  return fills;
}

const MSG_CONFIG: PdfFormConfig<MutterschaftsgeldFormData> = {
  url: PDF_URL,
  label: "BAS Mutterschaftsgeld 2026",
  builder: buildMutterschaftsgeldFieldFills,
  updateFieldAppearances: false,
};

export async function fillMutterschaftsgeldPdf(data: MutterschaftsgeldFormData): Promise<Blob> {
  return fillPdfForm(MSG_CONFIG, data, "MutterschaftsgeldPDF");
}
