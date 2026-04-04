import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function PageNav({ onBack }: { onBack?: () => void }) {
  const navigate = useNavigate();
  const { t } = useLanguage();
  return (
    <div className="page-nav-row">
      <button className="page-nav-btn page-nav-btn--back" onClick={() => (onBack ? onBack() : navigate(-1))}>
        {t("nav.back")}
      </button>
      <button className="page-nav-btn page-nav-btn--home" onClick={() => navigate("/")} aria-label={t("nav.home")}>
        <Home size={18} color="#FFFFFF" style={{ display: "block" }} />
      </button>
    </div>
  );
}
