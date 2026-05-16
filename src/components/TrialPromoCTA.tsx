import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Sparkles, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

/**
 * Routes where Premium promotion is FORBIDDEN.
 * Premium should only surface contextually (after a user hits a limit
 * or visits a premium-gated page) — never as a homepage push.
 */
// NOTE: Home (/) is intentionally allowed during the Launch Trial window —
// the 7-day free trial is a launch hook, not a generic premium upsell.
// Only legal/auth pages stay forbidden.
const NO_PREMIUM_PUSH_ROUTES = [
  "/login", "/register", "/forgot-password", "/reset-password",
  "/cookies", "/cookie-richtlinie",
  "/impressum", "/datenschutz", "/agb", "/disclaimer", "/dsa",
  "/nutzungsbedingungen", "/ki-hinweis", "/napomena-o-ki",
];

function isHomeOrLegal(pathname: string): boolean {
  // Strip locale prefix (/hr, /sr, /de)
  const stripped = pathname.replace(/^\/(hr|sr|de)(?=\/|$)/, "") || "/";
  return NO_PREMIUM_PUSH_ROUTES.includes(stripped);
}

const DISMISS_KEY = "bl_trial_promo_dismissed_v1";
const DISMISS_DAYS = 3;

/**
 * Sticky bottom CTA — visible only to NON-premium visitors. Promotes the
 * auto-7-day Premium trial that every new registration receives via
 * handle_new_user(). No hardcoded month-based deadline — always "today".
 *
 * Hidden for: premium users, admins (preview mode), or after dismiss.
 */
export default function TrialPromoCTA() {
  const { t } = useTranslation("common");
  const { user, isPremium, loading, profileLoading } = useAuth();
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (loading || profileLoading) return;
    if (isPremium) { setVisible(false); return; }
    // ⛔ Never push Premium on home or legal pages — only contextually deeper in app
    if (isHomeOrLegal(location.pathname)) { setVisible(false); return; }

    try {
      const raw = localStorage.getItem(DISMISS_KEY);
      if (raw) {
        const ts = parseInt(raw, 10);
        const ageMs = Date.now() - ts;
        if (ageMs < DISMISS_DAYS * 24 * 60 * 60 * 1000) {
          setVisible(false);
          return;
        }
      }
    } catch { /* noop */ }

    // Delay 60s — popups must never compete with first paint or cookie banner
    const timer = setTimeout(() => setVisible(true), 60_000);
    return () => clearTimeout(timer);
  }, [isPremium, loading, profileLoading, location.pathname]);

  if (!visible) return null;

  const dismiss = () => {
    try { localStorage.setItem(DISMISS_KEY, String(Date.now())); } catch { /* noop */ }
    setVisible(false);
  };

  const ctaHref = user ? "/pretplata" : "/register";

  return (
    <div
      className="fixed left-2 right-2 z-[55] mx-auto max-w-md md:left-1/2 md:right-auto md:-translate-x-1/2"
      style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 72px)" }}
      role="region"
      aria-label={t("trialCta.aria", "Premium probni period")}
    >
      <div className="flex items-center gap-1 rounded-full border border-amber-400/40 bg-gradient-to-r from-amber-500/95 to-yellow-400/95 py-2 pl-3 pr-1 shadow-lg backdrop-blur-sm">
        <Link
          to={ctaHref}
          className="flex flex-1 items-center justify-center gap-2 truncate text-[13px] font-semibold text-slate-900 hover:underline"
        >
          <Sparkles className="h-4 w-4 shrink-0 text-slate-900" aria-hidden />
          <span className="truncate">{t("trialCta.text", "7 dana Premium besplatno — testiraj odmah")}</span>
          <Sparkles className="h-4 w-4 shrink-0 text-slate-900" aria-hidden />
        </Link>
        <button
          type="button"
          onClick={dismiss}
          aria-label={t("trialCta.dismiss", "Zatvori")}
          className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-slate-900/70 hover:bg-slate-900/10 hover:text-slate-900"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
