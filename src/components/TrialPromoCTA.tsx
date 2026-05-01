import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Sparkles, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const PROMO_END = new Date("2026-05-31T23:59:59Z");
const DISMISS_KEY = "bl_trial_promo_dismissed_v1";
const DISMISS_DAYS = 3;

/**
 * Sticky bottom CTA — visible only to NON-premium visitors during the
 * Launch Promo window (until 31.05.2026). Promotes the auto-7-day Premium
 * trial that every new registration receives via handle_new_user().
 *
 * Hidden for: premium users, admins (preview mode), or after dismiss.
 */
export default function TrialPromoCTA() {
  const { t } = useTranslation("common");
  const { user, isPremium, loading, profileLoading } = useAuth();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (loading || profileLoading) return;
    if (isPremium) { setVisible(false); return; }
    if (new Date() > PROMO_END) { setVisible(false); return; }

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

    // Small delay so it never competes with cookie banner / first paint
    const timer = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(timer);
  }, [isPremium, loading, profileLoading]);

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
      <div className="flex items-center gap-2 rounded-full border border-amber-400/40 bg-gradient-to-r from-amber-500/95 to-yellow-400/95 px-3 py-2 shadow-lg backdrop-blur-sm">
        <Sparkles className="h-4 w-4 shrink-0 text-slate-900" aria-hidden />
        <Link
          to={ctaHref}
          className="flex-1 truncate text-[13px] font-semibold text-slate-900 hover:underline"
        >
          {t("trialCta.text", "7 dana Premium besplatno — testiraj odmah")}
        </Link>
        <button
          type="button"
          onClick={dismiss}
          aria-label={t("trialCta.dismiss", "Zatvori")}
          className="grid h-6 w-6 place-items-center rounded-full text-slate-900/70 hover:bg-slate-900/10 hover:text-slate-900"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
