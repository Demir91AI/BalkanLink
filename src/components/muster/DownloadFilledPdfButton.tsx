import { useTranslation } from "react-i18next";

interface Props {
  /** ID of the paper element to print (e.g. `${rootId}-paper`) */
  paperId?: string;
}

/**
 * Triggers browser print dialog (user picks "Save as PDF").
 * Uses global @media print CSS injected via MusterPrintStyles.
 */
export default function DownloadFilledPdfButton({ paperId }: Props) {
  const { t } = useTranslation("forms");

  const handleDownload = () => {
    if (paperId) {
      const el = document.getElementById(paperId);
      if (el) el.scrollIntoView({ behavior: "auto", block: "start" });
    }
    setTimeout(() => window.print(), 100);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }} className="no-print">
      <button
        onClick={handleDownload}
        style={{
          background: "#15803d", color: "#fff", border: "none",
          padding: "14px", borderRadius: 8, fontWeight: 700, fontSize: 15,
          cursor: "pointer", textAlign: "center", width: "100%",
          boxShadow: "0 4px 12px rgba(21,128,61,0.3)",
        }}
      >
        {t("musterFlow.downloadPdf.button")}
      </button>
      <p style={{ fontSize: 11, color: "#9CA3AF", textAlign: "center", margin: 0 }}>
        {t("musterFlow.downloadPdf.hint")}
      </p>
    </div>
  );
}
