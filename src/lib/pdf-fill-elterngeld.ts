/**
 * Elterngeld — koristi generički PDF engine, sa per-Bundesland konfiguracijom.
 * Dodavanje novog Bundeslanda = registruj `PdfFormConfig` u PDF_CONFIGS.
 */
import { buildFieldFills, type ElterngeldFormData } from "@/lib/elterngeld-bayern-fields";
import { buildHamburgFieldFills } from "@/lib/elterngeld-hamburg-fields";
import { buildNiedersachsenFieldFills } from "@/lib/elterngeld-niedersachsen-fields";
import { buildMecklenburgFieldFills } from "@/lib/elterngeld-mecklenburg-fields";
import { buildThueringenFieldFills } from "@/lib/elterngeld-thueringen-fields";
import type { BundeslandId } from "@/lib/elterngeld-bundeslaender";
import { fillPdfForm, type PdfFormConfig, downloadBlob } from "@/lib/pdf-form-engine";

export { downloadBlob };

const PDF_CONFIGS: Partial<Record<BundeslandId, PdfFormConfig<ElterngeldFormData>>> = {
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
    builder: buildNiedersachsenFieldFills,
    label: "Rheinland-Pfalz (Kreis/Stadt)",
  },
  sh: {
    url: "/muster/elterngeld-schleswig-holstein-2025.pdf",
    builder: buildNiedersachsenFieldFills,
    label: "Schleswig-Holstein (LASG)",
  },
  st: {
    url: "/muster/elterngeld-sachsen-anhalt-2025.pdf",
    builder: buildNiedersachsenFieldFills,
    label: "Sachsen-Anhalt (Landesverwaltungsamt Halle)",
  },
  th: {
    url: "/muster/elterngeld-thueringen-2025.pdf",
    builder: buildThueringenFieldFills,
    label: "Thüringen (Landesverwaltungsamt Suhl)",
  },
};

export function getPdfConfig(bl: BundeslandId): PdfFormConfig<ElterngeldFormData> | undefined {
  return PDF_CONFIGS[bl];
}

export async function fillElterngeldPdf(
  data: ElterngeldFormData,
  bundesland: BundeslandId = "by",
): Promise<Blob> {
  const cfg = PDF_CONFIGS[bundesland];
  if (!cfg) throw new Error(`No PDF config for Bundesland: ${bundesland}`);
  return fillPdfForm(cfg, data, `ElterngeldPDF/${bundesland}`);
}
