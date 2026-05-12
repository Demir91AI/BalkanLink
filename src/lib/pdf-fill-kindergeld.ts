/**
 * Kindergeld (KG1) — koristi generički PDF engine.
 *
 * Specifičnosti:
 *  - `updateFieldAppearances: false` da Adobe sam renderuje Unicode (č/š/ž/ć/đ).
 *  - `customDraw` ručno iscrtava Steuer-ID cifre po segmentiranim ćelijama
 *    (Chrome PDF viewer ne renderuje appearance segmentiranih AcroForm polja).
 */
import { StandardFonts, rgb } from "pdf-lib";
import { buildKindergeldFieldFills, type KindergeldFormData } from "@/lib/kindergeld-fields";
import { fillPdfForm, type PdfFormConfig, downloadBlob } from "@/lib/pdf-form-engine";

export { downloadBlob };

const PDF_URL = "/muster/kg1-antrag-kindergeld-2026.pdf";

const isSteuerIdField = (name: string) => name.includes("Steuer-ID");
const pageIndexForField = (name: string) => (name.includes("Page2[0]") ? 2 : 1);

const KINDERGELD_CONFIG: PdfFormConfig<KindergeldFormData> = {
  url: PDF_URL,
  label: "Kindergeld KG1 (Familienkasse)",
  builder: buildKindergeldFieldFills,
  updateFieldAppearances: false,
  customDraw: async ({ pdfDoc, field, fill }) => {
    if (fill.type !== "text" || !isSteuerIdField(fill.name)) return;
    const text = (fill.value ?? "").replace(/\D/g, "");
    if (!text) return;
    const widget = field.acroField.getWidgets()[0];
    const page = pdfDoc.getPages()[pageIndexForField(fill.name)];
    if (!widget || !page) return;
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const rect = widget.getRectangle();
    const size = 8.5;
    const cellWidth = rect.width / text.length;
    [...text].forEach((digit, index) => {
      const digitWidth = font.widthOfTextAtSize(digit, size);
      page.drawText(digit, {
        x: rect.x + index * cellWidth + (cellWidth - digitWidth) / 2,
        y: rect.y + Math.max(2.4, (rect.height - size) / 2),
        size,
        font,
        color: rgb(0, 0, 0),
      });
    });
  },
};

export async function fillKindergeldPdf(data: KindergeldFormData): Promise<Blob> {
  return fillPdfForm(KINDERGELD_CONFIG, data, "KindergeldPDF");
}
