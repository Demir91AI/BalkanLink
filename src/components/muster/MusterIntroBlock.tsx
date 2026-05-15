import MusterDisclaimer from "./MusterDisclaimer";
import PrivacyGuarantee from "./PrivacyGuarantee";

interface Props {
  formKey: string;
  /** Optional ID of the paper element to print (defaults to window.print) */
  paperId?: string;
  /** Title for the green download box, e.g. "Preuzmi popunjeni formular kao PDF" */
  downloadTitle?: string;
  /** Body text under title */
  downloadBody?: string;
  /** Button label */
  downloadLabel?: string;
  /** Optional original PDF link rendered below the green box */
  originalPdfUrl?: string;
  originalPdfLabel?: string;
}

/**
 * Drop-in intro block for Musterformulare without dedicated 1:1 PDF auto-fill.
 *
 * Renders the same UX as Kindergeld:
 *  1. Legal disclaimer gate (RDG/StBerG)
 *  2. Privacy Guarantee box
 *  3. Green "Popuni online → preuzmi PDF" box (uses window.print → "Save as PDF")
 *  4. Optional link to the official empty PDF
 */
export default function MusterIntroBlock({
  formKey,
  paperId,
  downloadTitle = "✅ Popuni online → preuzmi popunjeni formular kao PDF",
  downloadBody = "Tvoji podaci se popunjavaju lokalno u tvom browseru — ništa ne ide na server. Klikom na dugme otvara se dijalog za štampu — odaberi „Sačuvaj kao PDF“ i preuzmi popunjeni Musterformular.",
  downloadLabel = "📄 Preuzmi popunjeni Musterformular (PDF)",
  originalPdfUrl,
  originalPdfLabel = "Original (službeni PDF) →",
}: Props) {
  const handlePrint = () => {
    if (paperId) {
      const el = document.getElementById(paperId);
      if (el) el.scrollIntoView({ behavior: "auto", block: "start" });
    }
    setTimeout(() => window.print(), 100);
  };

  return (
    <>
      <MusterDisclaimer formKey={formKey}><></></MusterDisclaimer>
      <PrivacyGuarantee />

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
