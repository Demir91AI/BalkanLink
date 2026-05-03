import { ChevronLeft, ChevronRight, Home } from "lucide-react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { navigateBackOrHome } from "@/lib/navigation";
import { SUPPORTED_LANGUAGES } from "@/i18n";
import ShareButton from "@/components/share/ShareButton";
import { PageSaveStar } from "@/components/saved/PageSaveStar";

const LANG_PREFIXES = SUPPORTED_LANGUAGES.filter((l) => l !== "bs");

interface BreadcrumbsProps {
  /** Override last crumb (current page) — useful for dynamic pages like /firma/:id */
  currentLabel?: string;
  /** Custom crumb trail for state-based screens that don't change URL */
  items?: Array<{ label: string; href?: string; onClick?: () => void }>;
  /** Override intermediate crumb labels by segment */
  overrides?: Record<string, string>;
  /** Hide the standalone Back button */
  hideBack?: boolean;
  /** Custom back handler (default: hierarchical navigateBackOrHome) */
  onBack?: () => void;
  /**
   * Variant — "dark" for navy/glass pages, "light" for cream pages,
   * "auto" uses semantic tokens that work on either background (default).
   */
  variant?: "dark" | "light" | "auto";
  /** Inline mode — no bottom margin */
  inline?: boolean;
  className?: string;
  /** Hide the auto-derived crumb trail (only show Back + Home buttons) */
  hideTrail?: boolean;
  /** Show share button on the right side */
  showShare?: boolean;
  /** Override share title (defaults to document.title) */
  shareTitle?: string;
}

/**
 * Unified Breadcrumbs component — single source of truth for page navigation.
 *
 * Layout:
 *   [< Nazad]  [🏠 Početna]
 *   🏠 › Section › Subsection › Current
 *
 * - Auto-derives crumbs from the current URL pathname
 * - Translates each segment via `common:breadcrumb.routes.<segment>`
 * - Strips language prefix (/de, /hr, /sr) from crumb path computation
 * - Provides Back + Home shortcuts (translated)
 * - "auto" variant uses semantic tokens — works on any background
 */
export default function Breadcrumbs({
  currentLabel,
  items,
  overrides = {},
  hideBack = false,
  onBack,
  variant = "auto",
  inline = false,
  className = "",
  hideTrail = false,
  showShare = true,
  shareTitle,
}: BreadcrumbsProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation("common");

  const { crumbs, langPrefix } = useMemo(() => {
    const path = (location.pathname || "/").replace(/\/+$/, "") || "/";
    const segments = path.split("/").filter(Boolean);

    let langPrefix = "";
    if (segments.length && (LANG_PREFIXES as readonly string[]).includes(segments[0])) {
      langPrefix = "/" + segments[0];
      segments.shift();
    }

    const autoCrumbs = segments.map((seg, idx) => {
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

    const crumbs = items?.length
      ? items.map((item, idx) => ({ ...item, isLast: idx === items.length - 1 }))
      : autoCrumbs;

    return { crumbs, langPrefix };
  }, [location.pathname, t, overrides, currentLabel, items]);

  const handleBack = () => {
    if (onBack) onBack();
    else navigateBackOrHome(navigate);
  };

  const homeHref = langPrefix || "/";

  // Theme classes
  const themes = {
    dark: {
      btn: "text-white/60 hover:text-white hover:bg-white/[0.08] border-white/10",
      link: "text-white/45 hover:text-white/80",
      last: "text-white/85",
      sep: "text-white/25",
      trailHome: "text-white/45 hover:text-white/80",
    },
    light: {
      btn: "text-[#6B6B6B] hover:text-[#2D2D2D] hover:bg-[#F0EAD8] border-[#E5DFC9]",
      link: "text-[#8A8A8A] hover:text-[#2D2D2D]",
      last: "text-[#2D2D2D]",
      sep: "text-[#B5A87E]",
      trailHome: "text-[#8A8A8A] hover:text-[#2D2D2D]",
    },
    auto: {
      btn: "text-muted-foreground hover:text-foreground hover:bg-muted/60 border-border/50",
      link: "text-muted-foreground hover:text-foreground",
      last: "text-foreground",
      sep: "text-muted-foreground/50",
      trailHome: "text-muted-foreground hover:text-foreground",
    },
  } as const;

  const theme = themes[variant];

  const btnBase =
    "inline-flex items-center gap-1.5 text-[13px] font-medium transition-colors px-3 py-1.5 rounded-full border";

  const showCrumbs = !hideTrail && crumbs.length > 0;

  return (
    <div className={`${inline ? "" : "mb-5"} ${className}`}>
      <nav aria-label="breadcrumb" className="flex flex-wrap items-center gap-2">
        {!hideBack && (
          <button
            onClick={handleBack}
            className={`${btnBase} ${theme.btn}`}
            aria-label={t("breadcrumb.back")}
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            {t("breadcrumb.back")}
          </button>
        )}
        <Link
          to={homeHref}
          className={`${btnBase} ${theme.btn}`}
          aria-label={t("breadcrumb.home")}
        >
          <Home className="h-4 w-4" aria-hidden="true" />
          {t("breadcrumb.home")}
        </Link>

        {showCrumbs && (
          <div className="flex min-w-0 flex-wrap items-center gap-1.5 text-xs">
          {crumbs.map((c, i) => (
            <span key={i} className="flex items-center gap-1.5">
              <ChevronRight className={`h-3 w-3 ${theme.sep}`} aria-hidden="true" />
              {c.isLast ? (
                <span className={`font-semibold ${theme.last}`} aria-current="page">
                  {c.label}
                </span>
              ) : c.onClick ? (
                <button
                  type="button"
                  onClick={c.onClick}
                  className={`font-medium transition-colors ${theme.link}`}
                >
                  {c.label}
                </button>
              ) : (
                <Link
                  to={c.href || homeHref}
                  className={`font-medium transition-colors ${theme.link}`}
                >
                  {c.label}
                </Link>
              )}
            </span>
          ))}
          </div>
        )}

        {showShare && (
          <div className="ml-auto flex items-center gap-2">
            <PageSaveStar title={shareTitle} />
            <ShareButton variant="compact" title={shareTitle} />
          </div>
        )}
      </nav>
    </div>
  );
}
