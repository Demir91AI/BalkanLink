import { FileDown } from "lucide-react";
import { useTranslation } from "@/i18n/useTranslation";

export default function PrintFormButton() {
  const { t } = useTranslation("visaNavigator");
  return (
    <button
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-[14px] font-medium transition-all hover:opacity-80"
      style={{ border: "1px solid #C9A84C", color: "#C9A84C", background: "transparent" }}
    >
      <FileDown size={16} />
      {t("preview_pdf")}
    </button>
  );
}
