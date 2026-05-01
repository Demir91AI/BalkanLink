import { useEffect, useState } from "react";
import { Shield, Settings, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import type { useCookieConsent } from "@/hooks/useCookieConsent";

type Props = Pick<ReturnType<typeof useCookieConsent>, "showBanner" | "acceptAll" | "rejectOptional" | "openPreferences">;

const SESSION_DISMISS_KEY = "bl_cookie_banner_dismissed";
const AUTO_HIDE_MS = 30_000;

export default function CookieConsentBanner({ showBanner, acceptAll, rejectOptional, openPreferences }: Props) {
  const { t } = useTranslation("common");
  const [dismissed, setDismissed] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(SESSION_DISMISS_KEY) === "1";
    } catch {
      return false;
    }
  });

  // Auto-hide nakon 30s ako korisnik ne reaguje (saglasnost ostaje neevidentirana,
  // ali banner ne blokira interakciju; pojavit će se opet u sljedećoj sesiji).
  useEffect(() => {
    if (!showBanner || dismissed) return;
    const id = window.setTimeout(() => {
      try {
        sessionStorage.setItem(SESSION_DISMISS_KEY, "1");
      } catch {
        /* noop */
      }
      setDismissed(true);
    }, AUTO_HIDE_MS);
    return () => window.clearTimeout(id);
  }, [showBanner, dismissed]);

  if (!showBanner || dismissed) return null;

  const handleClose = () => {
    try {
      sessionStorage.setItem(SESSION_DISMISS_KEY, "1");
    } catch {
      /* noop */
    }
    setDismissed(true);
  };

  return (
    <div
      className="fixed bottom-16 md:bottom-3 inset-x-0 z-[60] px-2 sm:px-6 animate-in slide-in-from-bottom-4 duration-300 pointer-events-none"
      role="region"
      aria-label={t("cookies.banner.title")}
    >
      <div className="mx-auto max-w-xl rounded-full sm:rounded-2xl border border-border/30 bg-card/95 backdrop-blur-xl shadow-2xl pointer-events-auto">
        {/* Mobile: slim pill */}
        <div className="sm:hidden flex items-center gap-1.5 px-2.5 py-1.5">
          <Shield className="h-3.5 w-3.5 text-[hsl(var(--gold))] shrink-0" aria-hidden />
          <p className="text-[10.5px] leading-tight text-muted-foreground flex-1 truncate">
            {t("cookies.banner.descriptionShort")}
          </p>
          <button
            onClick={acceptAll}
            className="shrink-0 rounded-full bg-[hsl(var(--gold))] px-2.5 py-1 text-[10px] font-bold text-[hsl(var(--primary))]"
          >
            {t("cookies.actions.acceptAll")}
          </button>
          <button
            onClick={openPreferences}
            aria-label={t("cookies.actions.settings")}
            className="shrink-0 h-6 w-6 grid place-items-center text-muted-foreground hover:text-foreground"
          >
            <Settings className="h-3 w-3" />
          </button>
          <button
            onClick={handleClose}
            aria-label="Sakrij"
            className="shrink-0 h-6 w-6 grid place-items-center text-muted-foreground/70 hover:text-foreground"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Desktop / tablet: kompaktna verzija u jednom redu */}
        <div className="hidden sm:flex items-center gap-3 px-4 py-3">
          <Shield className="h-4 w-4 text-[hsl(var(--gold))] shrink-0" aria-hidden />
          <p className="text-[12px] leading-snug text-muted-foreground flex-1">
            {t("cookies.banner.description")}
          </p>
          <Button
            size="sm"
            onClick={acceptAll}
            className="bg-[hsl(var(--gold))] hover:bg-[hsl(var(--gold))]/90 text-[hsl(var(--primary))] font-semibold text-xs h-8"
          >
            {t("cookies.actions.acceptAll")}
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={rejectOptional}
            className="text-xs h-8"
          >
            {t("cookies.actions.rejectOptional")}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={openPreferences}
            className="text-muted-foreground hover:text-foreground text-xs h-8 gap-1.5"
          >
            <Settings className="h-3.5 w-3.5" />
            {t("cookies.actions.settings")}
          </Button>
          <button
            onClick={handleClose}
            aria-label="Sakrij"
            className="shrink-0 h-7 w-7 grid place-items-center rounded-full text-muted-foreground/70 hover:text-foreground hover:bg-muted/40"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
