/**
 * Učitava originalni Familienkasse KG1 PDF (AcroForm), popunjava polja
 * podacima korisnika lokalno u browseru, vraća popunjeni PDF kao Blob.
 *
 * Privatnost: PDF se nikad ne šalje na server.
 */
import { PDFDocument, StandardFonts, rgb, type PDFField } from "pdf-lib";
import { buildKindergeldFieldFills, type KindergeldFormData } from "@/lib/kindergeld-fields";

const PDF_URL = "/muster/kg1-antrag-kindergeld-2026.pdf";

type EmbeddedFont = Awaited<ReturnType<PDFDocument["embedFont"]>>;

const normalizeForPdfOverlay = (value: string) => value
  .replace(/[čć]/g, "c").replace(/[ČĆ]/g, "C")
  .replace(/[đ]/g, "d").replace(/[Đ]/g, "D")
  .replace(/[š]/g, "s").replace(/[Š]/g, "S")
  .replace(/[ž]/g, "z").replace(/[Ž]/g, "Z");

// KG1 contains a cover/instruction page before the fillable form pages.
const pageIndexForField = (name: string) => name.includes("Page2[0]") ? 2 : 1;

function fitText(value: string, font: EmbeddedFont, maxWidth: number, initialSize: number) {
  let size = initialSize;
  while (size > 5 && font.widthOfTextAtSize(value, size) > maxWidth) size -= 0.5;
  let text = value;
  while (text.length > 1 && font.widthOfTextAtSize(text, size) > maxWidth) text = text.slice(0, -1);
  return { text, size };
}

function drawVisibleText(pdfDoc: PDFDocument, field: PDFField, fieldName: string, value: string, font: EmbeddedFont) {
  const widget = field.acroField.getWidgets()[0];
  if (!widget) return;
  const rect = widget.getRectangle();
  const page = pdfDoc.getPages()[pageIndexForField(fieldName)];
  if (!page) return;
  const safeValue = normalizeForPdfOverlay(value).trim();
  if (!safeValue) return;
  const initialSize = Math.min(10, Math.max(6, rect.height * 0.72));
  const fitted = fitText(safeValue, font, Math.max(8, rect.width - 4), initialSize);
  page.drawText(fitted.text, {
    x: rect.x + 2,
    y: rect.y + Math.max(1.5, (rect.height - fitted.size) / 2),
    size: fitted.size,
    font,
    color: rgb(0, 0, 0),
  });
}

function drawVisibleCheck(pdfDoc: PDFDocument, field: PDFField, fieldName: string) {
  const widget = field.acroField.getWidgets()[0];
  if (!widget) return;
  const rect = widget.getRectangle();
  const page = pdfDoc.getPages()[pageIndexForField(fieldName)];
  if (!page) return;
  const pad = Math.max(1.8, Math.min(rect.width, rect.height) * 0.2);
  page.drawLine({ start: { x: rect.x + pad, y: rect.y + pad }, end: { x: rect.x + rect.width - pad, y: rect.y + rect.height - pad }, thickness: 1.1, color: rgb(0, 0, 0) });
  page.drawLine({ start: { x: rect.x + pad, y: rect.y + rect.height - pad }, end: { x: rect.x + rect.width - pad, y: rect.y + pad }, thickness: 1.1, color: rgb(0, 0, 0) });
}

export async function fillKindergeldPdf(data: KindergeldFormData): Promise<Blob> {
  const res = await fetch(PDF_URL);
  if (!res.ok) throw new Error(`PDF fetch failed: ${res.status}`);
  const bytes = await res.arrayBuffer();

  const pdfDoc = await PDFDocument.load(bytes, { ignoreEncryption: true });
  const form = pdfDoc.getForm();
  const overlayFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const fills = buildKindergeldFieldFills(data);
  const missing: string[] = [];

  for (const f of fills) {
    try {
      if (f.type === "text") {
        const field = form.getTextField(f.name);
        field.setText(f.value ?? "");
        drawVisibleText(pdfDoc, field, f.name, f.value ?? "", overlayFont);
      } else if (f.type === "check") {
        const field = form.getCheckBox(f.name);
        field.check();
        drawVisibleCheck(pdfDoc, field, f.name);
      }
    } catch {
      missing.push(`${f.type}:${f.name}`);
    }
  }

  if (missing.length && typeof console !== "undefined") {
    console.warn("[KindergeldPDF] Polja nisu nađena:", missing);
  }

  // NE flatten i NE update appearances — Adobe Reader sam renderuje
  // polja sa Unicode fontom (podržava č/š/ž/ć/đ).
  const out = await pdfDoc.save({ updateFieldAppearances: false });
  return new Blob([out as unknown as ArrayBuffer], { type: "application/pdf" });
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
