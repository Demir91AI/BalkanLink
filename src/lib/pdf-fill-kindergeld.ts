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

const isSteuerIdField = (name: string) => name.includes("Steuer-ID");
const pageIndexForField = (name: string) => name.includes("Page2[0]") ? 2 : 1;

function drawSteuerIdText(pdfDoc: PDFDocument, field: PDFField, fieldName: string, value: string, font: EmbeddedFont) {
  const widget = field.acroField.getWidgets()[0];
  const page = pdfDoc.getPages()[pageIndexForField(fieldName)];
  const text = value.replace(/\D/g, "");
  if (!widget || !page || !text) return;
  const rect = widget.getRectangle();
  const size = 8.5;
  const cellWidth = rect.width / text.length;
  [...text].forEach((digit, index) => {
    const digitWidth = font.widthOfTextAtSize(digit, size);
    page.drawText(digit, {
      x: rect.x + (index * cellWidth) + ((cellWidth - digitWidth) / 2),
      y: rect.y + Math.max(2.4, (rect.height - size) / 2),
      size,
      font,
      color: rgb(0, 0, 0),
    });
  });
}

export async function fillKindergeldPdf(data: KindergeldFormData): Promise<Blob> {
  const res = await fetch(PDF_URL);
  if (!res.ok) throw new Error(`PDF fetch failed: ${res.status}`);
  const bytes = await res.arrayBuffer();

  const pdfDoc = await PDFDocument.load(bytes, { ignoreEncryption: true });
  const form = pdfDoc.getForm();
  const steuerIdFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const fills = buildKindergeldFieldFills(data);
  const missing: string[] = [];

  for (const f of fills) {
    try {
      if (f.type === "text") {
        const field = form.getTextField(f.name);
        field.setText(f.value ?? "");
        if (isSteuerIdField(f.name)) drawSteuerIdText(pdfDoc, field, f.name, f.value ?? "", steuerIdFont);
      } else if (f.type === "check") {
        const field = form.getCheckBox(f.name);
        field.check();
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
