/**
 * Učitava originalni Familienkasse KG1 PDF (AcroForm), popunjava polja
 * podacima korisnika lokalno u browseru, vraća popunjeni PDF kao Blob.
 *
 * Privatnost: PDF se nikad ne šalje na server.
 */
import { PDFDocument } from "pdf-lib";
import { buildKindergeldFieldFills, type KindergeldFormData } from "@/lib/kindergeld-fields";

const PDF_URL = "/muster/kg1-antrag-kindergeld-2026.pdf";

export async function fillKindergeldPdf(data: KindergeldFormData): Promise<Blob> {
  const res = await fetch(PDF_URL);
  if (!res.ok) throw new Error(`PDF fetch failed: ${res.status}`);
  const bytes = await res.arrayBuffer();

  const pdfDoc = await PDFDocument.load(bytes, { ignoreEncryption: true });
  const form = pdfDoc.getForm();

  const fills = buildKindergeldFieldFills(data);
  const missing: string[] = [];

  for (const f of fills) {
    try {
      if (f.type === "text") {
        const field = form.getTextField(f.name);
        field.setText(f.value ?? "");
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

  // NE flatten — polja ostaju editabilna (potpis, dodaci).
  const out = await pdfDoc.save();
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
