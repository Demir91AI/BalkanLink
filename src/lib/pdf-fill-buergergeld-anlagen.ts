/**
 * Bürgergeld Anlagen — popunjava bilo koju od 11 BA Anlage PDF-ova.
 *
 * Koristi generički PDF engine. Popunjavamo header (Antragsteller Name + GebDatum)
 * uvijek, plus Anlage-specifična polja za koja wizard ima podatke (vidi
 * `buergergeld-anlagen-fields.ts`). Sve se radi lokalno u browseru.
 */
import { buildAnlageFieldFills, type AnlageBaseData, type AnlageCode } from "@/lib/buergergeld-anlagen-fields";
import { fillPdfForm, type PdfFormConfig, downloadBlob } from "@/lib/pdf-form-engine";

export { downloadBlob };
export type { AnlageBaseData, AnlageCode };

export const ANLAGEN_META: Record<AnlageCode, { url: string; label: string; titleBs: string }> = {
  ek:  { url: "/muster/bg-anlage-ek-2026.pdf",  label: "Anlage EK (Einkommen)",            titleBs: "Anlage EK — Prihodi" },
  eks: { url: "/muster/bg-anlage-eks-2026.pdf", label: "Anlage EKS (Selbstständige)",       titleBs: "Anlage EKS — Samostalna djelatnost" },
  hg:  { url: "/muster/bg-anlage-hg-2026.pdf",  label: "Anlage HG (Haushaltsgemeinschaft)", titleBs: "Anlage HG — Domaćinstvo" },
  kdu: { url: "/muster/bg-anlage-kdu-2026.pdf", label: "Anlage KDU (Unterkunft)",           titleBs: "Anlage KDU — Stan i grijanje" },
  ki:  { url: "/muster/bg-anlage-ki-2026.pdf",  label: "Anlage KI (Kind)",                  titleBs: "Anlage KI — Dijete u BG" },
  meb: { url: "/muster/bg-anlage-meb-2026.pdf", label: "Anlage MEB (Mehrbedarf)",           titleBs: "Anlage MEB — Dodatne potrebe" },
  sv:  { url: "/muster/bg-anlage-sv-2026.pdf",  label: "Anlage SV (Sozialversicherung)",    titleBs: "Anlage SV — Socijalno osiguranje" },
  uh1: { url: "/muster/bg-anlage-uh1-2026.pdf", label: "Anlage UH1 (Unterhalt)",            titleBs: "Anlage UH1 — Alimentacija" },
  ve:  { url: "/muster/bg-anlage-ve-2026.pdf",  label: "Anlage VE (Veränderung)",           titleBs: "Anlage VE — Promjena okolnosti" },
  vm:  { url: "/muster/bg-anlage-vm-2026.pdf",  label: "Anlage VM (Vermögen)",              titleBs: "Anlage VM — Imovina" },
  wep: { url: "/muster/bg-anlage-wep-2026.pdf", label: "Anlage WEP (Weitere Person)",       titleBs: "Anlage WEP — Druga osoba u BG" },
};

export async function fillBuergergeldAnlagePdf(code: AnlageCode, data: AnlageBaseData): Promise<Blob> {
  const meta = ANLAGEN_META[code];
  const cfg: PdfFormConfig<AnlageBaseData> = {
    url: meta.url,
    label: meta.label,
    builder: (d) => buildAnlageFieldFills(code, d),
    updateFieldAppearances: false,
  };
  return fillPdfForm(cfg, data, `BG-Anlage-${code.toUpperCase()}`);
}
