/**
 * Bürgergeld Hauptantrag — koristi generički PDF engine.
 *
 * Federalni BA Hauptantrag (Stand 04/2026), čisti AcroForm sa čitljivim imenima.
 * Polja se popunjavaju lokalno u browseru — ništa ne ide na server.
 */
import { buildBuergergeldFieldFills, type BuergergeldFormData } from "@/lib/buergergeld-fields";
import { fillPdfForm, type PdfFormConfig, downloadBlob } from "@/lib/pdf-form-engine";

export { downloadBlob };
export type { BuergergeldFormData };

const PDF_URL = "/muster/buergergeld-hauptantrag-2026.pdf";

const BUERGERGELD_CONFIG: PdfFormConfig<BuergergeldFormData> = {
  url: PDF_URL,
  label: "Bürgergeld Hauptantrag (BA, 04/2026)",
  builder: buildBuergergeldFieldFills,
  // BHS slova (č/š/ž/ć/đ) — pustimo Adobe Reader da renderuje sa Unicode fontom.
  updateFieldAppearances: false,
};

export async function fillBuergergeldPdf(data: BuergergeldFormData): Promise<Blob> {
  return fillPdfForm(BUERGERGELD_CONFIG, data, "BuergergeldPDF");
}
