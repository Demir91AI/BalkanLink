import { useState } from "react";
import MusterDisclaimer from "./MusterDisclaimer";
import PrivacyGuarantee from "./PrivacyGuarantee";

export interface DatenblattConfig {
  /** Async builder returning PDF bytes */
  build: () => Promise<Uint8Array>;
  fileName: string;
  /** Razlog zašto se generiše Datenblatt umjesto 1:1 popunjenog službenog PDF-a */
  reasonNote: string;
  /** Title for the purple datenblatt CTA box */
  title?: string;
  /** Button label */
  buttonLabel?: string;
}

interface Props {
  formKey: string;
  paperId?: string;
  downloadTitle?: string;
  downloadBody?: string;
  downloadLabel?: string;
  originalPdfUrl?: string;
  originalPdfLabel?: string;
  /** When provided, renders extra purple "Preuzmi Datenblatt PDF" CTA + amber explainer note. */
  datenblatt?: DatenblattConfig;
}

/**
 * Drop-in intro block for Musterformulare.
 *
 *  1. Legal disclaimer gate (RDG/StBerG)
 *  2. Privacy Guarantee box
 *  3. Optional amber "zašto Datenblatt" objašnjenje
 *  4. Optional purple Datenblatt PDF CTA (pdf-lib generated)
 *  5. Green "Popuni online → preuzmi PDF" box (window.print fallback)
 *  6. Optional link to the official empty PDF
 */
export default function MusterIntroBlock({
  formKey,
  paperId,
  downloadTitle = "✅ Popuni online → preuzmi popunjeni formular kao PDF",
  downloadBody = "Tvoji podaci se popunjavaju lokalno u tvom browseru — ništa ne ide na server. Klikom na dugme otvara se dijalog za štampu — odaberi „Sačuvaj kao PDF“ i preuzmi popunjeni Musterformular.",
  downloadLabel = "📄 Preuzmi popunjeni Musterformular (PDF)",
  originalPdfUrl,
  originalPdfLabel = "Original (službeni PDF) →",
  datenblatt,
}: Props) {
  const [busy, setBusy] = useState(false);

  const handlePrint = () => {
    if (paperId) {
      const el = document.getElementById(paperId);
      if (el) el.scrollIntoView({ behavior: "auto", block: "start" });
    }
    setTimeout(() => window.print(), 100);
  };

  const handleDatenblatt = async () => {
    if (!datenblatt || busy) return;
    setBusy(true);
    try {
      const bytes = await datenblatt.build();
      const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = datenblatt.fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (e) {
      console.error("Datenblatt PDF error", e);
      alert("Greška pri generisanju Datenblatt PDF-a.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <MusterDisclaimer formKey={formKey}><></></MusterDisclaimer>
      <PrivacyGuarantee />

