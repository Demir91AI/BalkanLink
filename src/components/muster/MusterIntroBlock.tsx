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
 *  3. Optional amber "zašto Datenblatt" objašnjenje (kada je 1:1 nemoguć)
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

      {datenblatt && (
        <>
          <div
            className="no-print"
            style={{
              marginBottom: 14, padding: 14,
              background: "#FFFBEB", border: "1.5px solid #D97706", borderRadius: 10,
              fontSize: 12, lineHeight: 1.55, color: "#78350F",
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: 4 }}>ℹ Zašto Datenblatt, a ne popunjen službeni PDF?</div>
            {datenblatt.reasonNote}
          </div>

          <div
            className="no-print"
            style={{
              marginBottom: 18, padding: 16,
              background: "#F5F3FF", border: "2px solid #7C3AED", borderRadius: 10,
            }}
          >
            <div style={{ fontWeight: 700, fontSize: 14, color: "#4C1D95", marginBottom: 6 }}>
              {datenblatt.title ?? "📋 Preuzmi BalkanLink Datenblatt (PDF)"}
            </div>
            <div style={{ fontSize: 12, color: "#4C1D95", lineHeight: 1.55, marginBottom: 12 }}>
              Strukturirani sažetak svih podataka po sekcijama službenog obrasca, sa BHS i DE labelama.
              Ponesi ga na šalter ili koristi kao predložak kad popunjavaš službeni PDF / online portal.
            </div>
            <button
              onClick={handleDatenblatt}
              disabled={busy}
              style={{
                background: busy ? "#A78BFA" : "#7C3AED",
                color: "#fff", border: "none", padding: "12px 18px", borderRadius: 8,
                fontWeight: 700, fontSize: 14, cursor: busy ? "default" : "pointer",
                boxShadow: "0 4px 12px rgba(124,58,237,0.3)",
              }}
            >
              {busy ? "Generišem PDF…" : (datenblatt.buttonLabel ?? "📥 Preuzmi Datenblatt PDF")}
            </button>
          </div>
        </>
      )}

      <div className="no-print" style={{ marginBottom: 18, padding: 16, background: "#ECFDF5", border: "2px solid #10B981", borderRadius: 10 }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: "#065F46", marginBottom: 6 }}>
          {downloadTitle}
        </div>
        <div style={{ fontSize: 12, color: "#065F46", lineHeight: 1.55, marginBottom: 12 }}>
          {downloadBody}
        </div>
        <button
          onClick={handlePrint}
          style={{ background: "#15803d", color: "#fff", border: "none", padding: "12px 18px", borderRadius: 8, fontWeight: 700, fontSize: 14, cursor: "pointer", boxShadow: "0 4px 12px rgba(21,128,61,0.3)" }}
        >
          {downloadLabel}
        </button>
        {originalPdfUrl && (
          <div style={{ marginTop: 10, fontSize: 12 }}>
            <a href={originalPdfUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#065F46", textDecoration: "underline", fontWeight: 600 }}>
              {originalPdfLabel}
            </a>
          </div>
        )}
      </div>
    </>
  );
}
