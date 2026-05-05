import { PDFDocument } from "pdf-lib";
import { buildFieldFills, type ElterngeldFormData } from "@/lib/elterngeld-bayern-fields";
import { buildHamburgFieldFills } from "@/lib/elterngeld-hamburg-fields";
import { buildNiedersachsenFieldFills } from "@/lib/elterngeld-niedersachsen-fields";
import { buildMecklenburgFieldFills } from "@/lib/elterngeld-mecklenburg-fields";
import type { BundeslandId } from "@/lib/elterngeld-bundeslaender";

interface PdfConfig {
  url: string;
  builder: (d: ElterngeldFormData) => ReturnType<typeof buildFieldFills>;
  label: string;
}

const PDF_CONFIGS: Partial<Record<BundeslandId, PdfConfig>> = {
  by: {
    url: "/muster/elterngeld-bayern-2025.pdf",
    builder: buildFieldFills,
    label: "Bayern (ZBFS)",
  },
  hh: {
    url: "/muster/elterngeld-hamburg-2025.pdf",
    builder: buildHamburgFieldFills,
    label: "Hamburg (BAGSFI)",
  },
  ni: {
    url: "/muster/elterngeld-niedersachsen-2025.pdf",
    builder: buildNiedersachsenFieldFills,
    label: "Niedersachsen (Landkreis/Stadt)",
  },
  bb: {
    url: "/muster/elterngeld-brandenburg-2025.pdf",
    builder: buildNiedersachsenFieldFills,
    label: "Brandenburg (Landkreis/Stadt)",
  },
  mv: {
    url: "/muster/elterngeld-mecklenburg-vorpommern-2025.pdf",
    builder: buildMecklenburgFieldFills,
    label: "Mecklenburg-Vorpommern (LAGuS)",
  },
  be: {
    url: "/muster/elterngeld-berlin-2025.pdf",
    builder: buildNiedersachsenFieldFills,
    label: "Berlin (Bezirksamt)",
  },
  hb: {
    url: "/muster/elterngeld-bremen-2025.pdf",
    builder: buildNiedersachsenFieldFills,
    label: "Bremen (Amt für Soziale Dienste)",
  },
  rp: {
    url: "/muster/elterngeld-rheinland-pfalz-2025.pdf",
    builder: buildNiedersachsenFieldFills, // identičan "Einheitlicher Antrag" template
    label: "Rheinland-Pfalz (Kreis/Stadt)",
  },
  sh: {
    url: "/muster/elterngeld-schleswig-holstein-2025.pdf",
    builder: buildNiedersachsenFieldFills, // identičan "Einheitlicher Antrag" template
    label: "Schleswig-Holstein (LASG)",
  },
};

export function getPdfConfig(bl: BundeslandId): PdfConfig | undefined {
  return PDF_CONFIGS[bl];
}

/**
 * Učitava originalni Elterngeld PDF za odabrani Bundesland (AcroForm),
 * popunjava polja podacima korisnika lokalno u browseru,
 * vraća popunjeni PDF kao Blob za download.
 *
 * Privatnost: PDF se nikad ne šalje na server.
 */
export async function fillElterngeldPdf(
  data: ElterngeldFormData,
  bundesland: BundeslandId = "by",
): Promise<Blob> {
  const cfg = PDF_CONFIGS[bundesland];
  if (!cfg) throw new Error(`No PDF config for Bundesland: ${bundesland}`);

  const res = await fetch(cfg.url);
  if (!res.ok) throw new Error(`PDF fetch failed: ${res.status}`);
  const bytes = await res.arrayBuffer();

  const pdfDoc = await PDFDocument.load(bytes, { ignoreEncryption: true });
  const form = pdfDoc.getForm();

  const fills = cfg.builder(data);
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
    console.warn(`[ElterngeldPDF/${bundesland}] Polja nisu nađena:`, missing);
  }

  // NE flatten — ostavljamo polja editabilna da klijent može
  // dopuniti specifične dijelove (Einkommen, Anlagen).
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
