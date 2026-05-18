/**
 * BAMF 630.007 — Antrag auf Zulassung zum Integrationskurs (für Ausländer/-innen).
 * Zero-Knowledge: sve lokalno u browseru. PDF ostaje editabilan.
 */
import { fillPdfForm, type PdfFormConfig, type FieldFill, downloadBlob } from "@/lib/pdf-form-engine";

export { downloadBlob };

const PDF_URL = "/muster/integrationskurs-bamf-630007.pdf";

export interface IntegrationskursFormData {
  familienname: string;
  vorname: string;
  geburtsdatum: string;
  geburtsort: string;
  geschlecht: "" | "männlich" | "weiblich" | "divers";
  staatsangehoerigkeit: string;
  strasse: string;
  plz: string;
  ort: string;
  email: string;
  sigOrt: string;
  sigDatum: string;
}

const txt = (name: string, value: string): FieldFill => ({ name, type: "text", value });
const chk = (name: string): FieldFill => ({ name, type: "check" });

function formatDate(iso: string): string {
  if (!iso) return "";
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  return m ? `${m[3]}.${m[2]}.${m[1]}` : iso;
}

export function buildIntegrationskursFieldFills(d: IntegrationskursFormData): FieldFill[] {
  const fills: FieldFill[] = [];

  if (d.familienname) fills.push(txt("Name", d.familienname));
  if (d.vorname) fills.push(txt("Vorname", d.vorname));
  if (d.geburtsdatum) fills.push(txt("Geburtsdatum", formatDate(d.geburtsdatum)));
  if (d.geschlecht === "männlich") fills.push(chk("männlich"));
  else if (d.geschlecht === "weiblich") fills.push(chk("weiblich"));
  else if (d.geschlecht === "divers") fills.push(chk("divers"));

  if (d.strasse) fills.push(txt("Straße und Hausnummer", d.strasse));
  if (d.plz) fills.push(txt("Postleitzahl", d.plz));
  if (d.ort) fills.push(txt("Ort", d.ort));
  if (d.email) fills.push(txt("EMail optional", d.email));
  if (d.staatsangehoerigkeit) fills.push(txt("Staatsangehörigkeit", d.staatsangehoerigkeit));

  // Datum potpis (gornji i donji blok)
  if (d.sigDatum || d.sigOrt) {
    const dateStr = [d.sigOrt, formatDate(d.sigDatum)].filter(Boolean).join(", ");
    fills.push(txt("Ort Datum", dateStr));
    fills.push(txt("Ort Datum_2", dateStr));
  }

  return fills;
}

const IK_CONFIG: PdfFormConfig<IntegrationskursFormData> = {
  url: PDF_URL,
  label: "BAMF 630.007 Integrationskurs",
  builder: buildIntegrationskursFieldFills,
  updateFieldAppearances: false,
};

export async function fillIntegrationskursPdf(data: IntegrationskursFormData): Promise<Blob> {
  return fillPdfForm(IK_CONFIG, data, "IntegrationskursPDF");
}
