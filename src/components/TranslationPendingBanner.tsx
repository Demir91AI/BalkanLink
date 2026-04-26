/**
 * <TranslationPendingBanner />
 *
 * Subtle yellow info banner shown only on /de/* routes whose long-form body
 * content is not yet translated to German. Dismissible via X (component-local
 * state — re-appears on next page load).
 *
 * Mount in Layout.tsx above <Outlet />. The banner decides on its own whether
 * to render based on current pathname + active language.
 */
import { useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { X, Info } from "lucide-react";

/**
 * Routes whose German version is ALREADY translated by this prompt — banner
 * MUST NOT appear on these. Everything else under /de/* shows the banner.
 */
// Routes whose German chrome is fully translated. Pages with deep nested
// children still pending translation (Viza, DeutschTrainer, NudimTrazim)
// are intentionally NOT listed here so the banner appears.
const TRANSLATED_DE_PATHS = new Set<string>([
  "/de",
  // Auth flows — chrome translated
  "/de/login",
  "/de/register",
  "/de/forgot-password",
  "/de/reset-password",
  // Dokumentenprüfung — full page chrome translated
  "/de/dokumentencheck",
  // DeutschTrainer — full page + child components translated
  "/de/deutsch-trainer",
]);

export default function TranslationPendingBanner() {
  const { pathname } = useLocation();
  const { t, i18n } = useTranslation();
  const [dismissed, setDismissed] = useState(false);

  const visible = useMemo(() => {
    if (dismissed) return false;
    if (i18n.language !== "de") return false;
    if (!pathname.startsWith("/de")) return false;
    if (TRANSLATED_DE_PATHS.has(pathname)) return false;
    return true;
  }, [pathname, i18n.language, dismissed]);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="relative mx-auto mt-3 flex w-full max-w-5xl items-start gap-3 rounded-xl border border-amber-400/30 bg-amber-50/80 px-4 py-3 text-sm text-amber-900 shadow-sm dark:bg-amber-950/30 dark:text-amber-200"
    >
      <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
      <div className="flex-1">
        <p className="font-semibold leading-tight">{t("pages:translationBanner.title")}</p>
        <p className="mt-0.5 leading-snug opacity-90">{t("pages:translationBanner.message")}</p>
      </div>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label={t("common:buttons.close")}
        className="ml-2 rounded p-1 text-amber-700 transition-colors hover:bg-amber-100 dark:text-amber-300 dark:hover:bg-amber-900/40"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
