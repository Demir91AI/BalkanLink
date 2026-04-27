import { ChevronLeft, ChevronRight, Home } from "lucide-react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { navigateBackOrHome } from "@/lib/navigation";
import { SUPPORTED_LANGUAGES } from "@/i18n";

const LANG_PREFIXES = SUPPORTED_LANGUAGES.filter((l) => l !== "bs");

interface BreadcrumbsProps {
  /** Override last crumb (current page) — useful for dynamic pages like /firma/:id */
  currentLabel?: string;
  /** Override intermediate crumb labels by segment */
  overrides?: Record<string, string>;
  /** Hide the standalone Back button */
  hideBack?: boolean;
  /** Custom back handler (default: hierarchical navigateBackOrHome) */
  onBack?: () => void;
  /** Variant — "dark" for navy/glass pages, "light" for cream pages */
  variant?: "dark" | "light";
  /** Inline mode — no bottom margin */
  inline?: boolean;
  className?: string;
}

/**
 * Unified Breadcrumbs component.
 *
 * - Auto-derives crumbs from the current URL pathname
 * - Translates each segment via `common:breadcrumb.routes.<segment>`
 * - Falls back to title-cased segment if no translation exists
 * - Strips language prefix (/de, /hr, /sr) from crumb path computation
 * - Provides Back + Home shortcuts (translated)
 */
export default function Breadcrumbs({
  currentLabel,
  overrides = {},
  hideBack = false,
  onBack,
  variant = "dark",
  inline = false,
  className = "",
}: BreadcrumbsProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation("common");

  const isDark = variant === "dark";

  const { crumbs, langPrefix } = useMemo(() => {
    const path = (location.pathname || "/").replace(/\/+$/, "") || "/";
    const segments = path.split("/").filter(Boolean);

    let langPrefix = "";
    if (segments.length && (LANG_PREFIXES as readonly string[]).includes(segments[0])) {
      langPrefix = "/" + segments[0];
      segments.shift();
    }

    const crumbs = segments.map((seg, idx) => {
      const isLast = idx === segments.length - 1;
      const href = langPrefix + "/" + segments.slice(0, idx + 1).join("/");
      const override = overrides[seg];
      const translated = t(`breadcrumb.routes.${seg}`, { defaultValue: "" });
      const label =
        (isLast && currentLabel) ||
        override ||
        translated ||
        decodeURIComponent(seg)
          .replace(/[-_]/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase());
      return { label, href, isLast };
    });

    return { crumbs, langPrefix };
  }, [location.pathname, t, overrides, currentLabel]);

  const handleBack = () => {
    if (onBack) onBack();
    else navigateBackOrHome(navigate);
  };

  const homeHref = langPrefix || "/";

  // Theme classes
  const btnBase =
    "flex items-center gap-1.5 text-[13px] font-medium transition-colors px-3 py-1.5 rounded-lg";
  const btnTheme = isDark
    ? "text-white/50 hover:text-white/80 hover:bg-white/[0.06]"
    : "text-[#6B6B6B] hover:text-[#2D2D2D] hover:bg-[#F0EAD8]";

  const linkTheme = isDark ? "text-white/40 hover:text-white/70" : "text-[#8A8A8A] hover:text-[#2D2D2D]";
  const lastTheme = isDark ? "text-white/70" : "text-[#2D2D2D]";
  const sepTheme = isDark ? "text-white/20" : "text-[#B5A87E]";

  return (
    <div className={`${inline ? "" : "mb-4"} ${className}`}>
      {/* Back + Home shortcuts */}
      <div className="flex items-center gap-2 mb-2">
        {!hideBack && (
          <button onClick={handleBack} className={`${btnBase} ${btnTheme}`} aria-label={t("breadcrumb.back")}>
            <ChevronLeft className="h-4 w-4" />
            {t("breadcrumb.back")}
          </button>
        )}
        <button
          onClick={() => navigate(homeHref)}
          className={`${btnBase} ${btnTheme}`}
          aria-label={t("breadcrumb.home")}
        >
          <Home className="h-4 w-4" />
          {t("breadcrumb.home")}
        </button>
      </div>

      {/* Crumb trail */}
      {crumbs.length > 0 && (
        <nav aria-label="breadcrumb" className="flex flex-wrap items-center gap-1 text-xs">
          <Link to={homeHref} className={`font-medium transition-colors ${linkTheme}`}>
            {t("breadcrumb.home")}
          </Link>
          {crumbs.map((c, i) => (
            <span key={i} className="flex items-center gap-1">
              <ChevronRight className={`h-3 w-3 ${sepTheme}`} />
              {c.isLast ? (
                <span className={`font-semibold ${lastTheme}`} aria-current="page">
                  {c.label}
                </span>
              ) : (
                <Link to={c.href} className={`font-medium transition-colors ${linkTheme}`}>
                  {c.label}
                </Link>
              )}
            </span>
          ))}
        </nav>
      )}
    </div>
  );
}
