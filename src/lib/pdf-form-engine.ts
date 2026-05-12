/**
 * Generički engine za popunjavanje originalnih AcroForm PDF-ova.
 *
 * Princip (isti za Kindergeld, Elterngeld, sve buduće obrasce):
 *  1. Učitaj originalni PDF (fetch + PDFDocument.load).
 *  2. Pozovi `builder(data)` koji vrati niz `FieldFill` (text/check po imenu polja).
 *  3. Engine setText / check kroz pdf-lib.
 *  4. Opcionalni `customDraw` hook za ručno crtanje (npr. segmentirane Steuer-ID
 *     ćelije koje Chrome PDF viewer ne renderuje iz AcroForm appearance).
 *  5. NE flatten — polja ostaju editabilna (privatnost: sve lokalno u browseru).
 *
 * Dodavanje novog obrasca = napiši field builder + registruj `PdfFormConfig`.
 */
import { PDFDocument, type PDFField, type PDFForm } from "pdf-lib";

export interface FieldFill {
  name: string;
  type: "text" | "check";
  value?: string;
}

export interface CustomDrawContext {
  pdfDoc: PDFDocument;
  form: PDFForm;
  field: PDFField;
  fill: FieldFill;
}

export interface PdfFormConfig<TData> {
  /** Putanja do originalnog PDF-a (public/muster/...). */
  url: string;
  /** Mapper iz wizard podataka u listu polja za popunjavanje. */
  builder: (data: TData) => FieldFill[];
  /** Human-readable label (npr. "Bayern (ZBFS)"). */
  label?: string;
  /** Ostavi false za PDF-ove koji koriste ne-ASCII slova (č/š/ž/ć/đ) — Acrobat sam renderuje sa Unicode fontom. */
  updateFieldAppearances?: boolean;
  /**
   * Hook po polju — pokreće se NAKON setText/check.
   * Vrati true ako si ručno odradio render (npr. segmentirane Steuer-ID cifre).
   */
  customDraw?: (ctx: CustomDrawContext) => void | Promise<void>;
}

export async function fillPdfForm<TData>(
  cfg: PdfFormConfig<TData>,
  data: TData,
  logTag = "PDF",
): Promise<Blob> {
  const res = await fetch(cfg.url);
  if (!res.ok) throw new Error(`PDF fetch failed: ${res.status}`);
  const bytes = await res.arrayBuffer();

  const pdfDoc = await PDFDocument.load(bytes, { ignoreEncryption: true });
  const form = pdfDoc.getForm();

  const fills = cfg.builder(data);
  const missing: string[] = [];

  for (const fill of fills) {
    try {
      let field: PDFField;
      if (fill.type === "text") {
        const tf = form.getTextField(fill.name);
        tf.setText(fill.value ?? "");
        field = tf;
      } else {
        const cb = form.getCheckBox(fill.name);
        cb.check();
        field = cb;
      }
      if (cfg.customDraw) {
        await cfg.customDraw({ pdfDoc, form, field, fill });
      }
    } catch {
      missing.push(`${fill.type}:${fill.name}`);
    }
  }

  if (missing.length && typeof console !== "undefined") {
    console.warn(`[${logTag}] Polja nisu nađena:`, missing);
  }

  const out = await pdfDoc.save({
    updateFieldAppearances: cfg.updateFieldAppearances ?? true,
  });
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
