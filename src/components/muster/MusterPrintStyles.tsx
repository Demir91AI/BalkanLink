import { useTranslation } from "react-i18next";

interface Props {
  /** ID of the paper element that should be printed */
  paperId: string;
  /** Footer text to render at bottom of printed PDF */
  pdfFooterOverride?: string;
}

/**
 * Injects @media print rules so window.print() produces a clean A4 PDF
 * containing only the form paper (no nav, no buttons, no disclaimer banner).
 * Place once inside any MusterFormBase-wrapped page that exposes PDF download.
 */
export default function MusterPrintStyles({ paperId, pdfFooterOverride }: Props) {
  const { t } = useTranslation("forms");
  const footer = pdfFooterOverride ?? t("musterFlow.pdfFooter");

  const css = `
    @media print {
      @page { size: A4; margin: 12mm; }
      body { background: #fff !important; }
      body * { visibility: hidden !important; }
      #${paperId}, #${paperId} * { visibility: visible !important; }
      #${paperId} {
        position: absolute !important;
        left: 0 !important; top: 0 !important;
        width: 100% !important; max-width: none !important;
        margin: 0 !important; padding: 0 !important;
        box-shadow: none !important; border: none !important;
        background: #fff !important; color: #000 !important;
      }
      #${paperId} input, #${paperId} select, #${paperId} textarea {
        border: none !important; background: transparent !important;
        color: #000 !important; -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      #${paperId} input[type="checkbox"], #${paperId} input[type="radio"] {
        accent-color: #000 !important;
      }
      .no-print { display: none !important; }
      #${paperId}::after {
        content: "${footer.replace(/"/g, '\\"')}";
        display: block;
        margin-top: 16mm;
        padding-top: 6mm;
        border-top: 1px solid #999;
        font-size: 9pt;
        color: #555;
        font-style: italic;
        text-align: center;
        line-height: 1.5;
      }
    }
  `;

  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}
