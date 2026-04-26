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
 * Per-language allow-list of paths whose chrome AND body are fully
 * translated — the banner MUST NOT appear on these. Everything else under
 * /de/*, /hr/*, /sr/* shows the banner.
 *
 * For /de/* we keep the prior allow-list (Viza, DeutschTrainer, NudimTrazim
 * etc. that have been fully translated). For /hr/* and /sr/* only the
 * landing pages with no long-form body are excluded — every Smart Guide
 * body page shows the banner until dedicated translations land.
 */
const SHARED_LANDING_SUFFIXES = [
  "", // root (e.g. /hr)
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/dokumentencheck",
  "/dokumenten-check",
  "/deutsch-trainer",
  "/viza",
  "/nudim-trazim",
];

const TRANSLATED_PATHS: Record<"de" | "hr" | "sr", Set<string>> = {
  de: new Set(SHARED_LANDING_SUFFIXES.map((s) => `/de${s}`)),
  hr: new Set(SHARED_LANDING_SUFFIXES.map((s) => `/hr${s}`)),
  sr: new Set(SHARED_LANDING_SUFFIXES.map((s) => `/sr${s}`)),
};

export default function TranslationPendingBanner() {
  // Per Demir's apr 2026 directive: the platform must never advertise
  // "translation pending". All UI strings (HR, SR, DE) ship fully translated
  // via the locale JSONs. The banner is therefore disabled platform-wide.
  // Component kept as a no-op to preserve existing imports/mounts and to
  // make it trivial to re-enable in the future if a partial-translation
  // workflow is ever reintroduced.
  void useLocation();
  void useTranslation();
  void useState;
  void useMemo;
  return null;

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
