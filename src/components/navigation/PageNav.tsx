import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";
import { useTranslation } from "react-i18next";

/**
 * Compact two-button nav (Back + Home icon). Kept as is for legacy CSS styling.
 * For full breadcrumb trail, use <Breadcrumbs /> instead.
 */
export default function PageNav({ onBack }: { onBack?: () => void }) {
  const navigate = useNavigate();
  const { t } = useTranslation("common");
  return (
    <div className="page-nav-row">
      <button className="page-nav-btn page-nav-btn--back" onClick={() => (onBack ? onBack() : navigate(-1))}>
        {t("breadcrumb.back", { defaultValue: "Nazad" })}
      </button>
      <button
        className="page-nav-btn page-nav-btn--home"
        onClick={() => navigate("/")}
        aria-label={t("breadcrumb.home", { defaultValue: "Početna" })}
      >
        <Home size={18} color="#FFFFFF" style={{ display: "block" }} />
      </button>
    </div>
  );
}
