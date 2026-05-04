import { PDFDocument } from "pdf-lib";
import { buildFieldFills, type ElterngeldFormData } from "@/lib/elterngeld-bayern-fields";

const PDF_URL = "/muster/elterngeld-bayern-2025.pdf";

/**
 * Učitava originalni Bayern Elterngeld PDF (AcroForm),
 * popunjava polja podacima korisnika lokalno u browseru,
 * vraća popunjeni PDF kao Blob za download.
 *
 * Privatnost: PDF se nikad ne šalje na server.
 */
export async function fillElterngeldPdf(data: ElterngeldFormData): Promise<Blob> {
  const res = await fetch(PDF_URL);
  if (!res.ok) throw new Error(`PDF fetch failed: ${res.status}`);
  const bytes = await res.arrayBuffer();

  const pdfDoc = await PDFDocument.load(bytes, { ignoreEncryption: true });
  const form = pdfDoc.getForm();

  const fills = buildFieldFills(data);
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
    console.warn("[ElterngeldPDF] Polja nisu nađena:", missing);
  }

  // NE flatten — ostavljamo polja editabilna da klijent može
  // dopuniti specifične dijelove (sekcije 7–14, prilozi).
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
