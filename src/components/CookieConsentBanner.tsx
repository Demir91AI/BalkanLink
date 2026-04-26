import { Shield, Settings } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import type { useCookieConsent } from "@/hooks/useCookieConsent";

type Props = Pick<ReturnType<typeof useCookieConsent>, "showBanner" | "acceptAll" | "rejectOptional" | "openPreferences">;

export default function CookieConsentBanner({ showBanner, acceptAll, rejectOptional, openPreferences }: Props) {
  const { t } = useTranslation("common");
  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-[60] p-4 sm:p-6 animate-in slide-in-from-bottom-4 duration-300">
      <div className="mx-auto max-w-2xl rounded-2xl border border-border/20 bg-card/95 backdrop-blur-xl shadow-2xl p-5 sm:p-6">
        <div className="flex items-start gap-3 mb-4">
          <Shield className="h-5 w-5 text-[hsl(var(--gold))] mt-0.5 shrink-0" />
          <div>
            <h3 className="text-sm font-semibold text-foreground">{t("cookies.banner.title")}</h3>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              {t("cookies.banner.description")}
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            size="sm"
            onClick={acceptAll}
            className="bg-[hsl(var(--gold))] hover:bg-[hsl(var(--gold))]/90 text-[hsl(var(--primary))] font-semibold text-xs h-9"
          >
            {t("cookies.actions.acceptAll")}
          </Button>
          <Button
            size="sm"
            onClick={rejectOptional}
            className="bg-card hover:bg-muted text-foreground font-medium text-xs h-9 border border-border"
          >
            {t("cookies.actions.rejectOptional")}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={openPreferences}
            className="text-muted-foreground hover:text-foreground text-xs h-9 gap-1.5"
          >
            <Settings className="h-3.5 w-3.5" />
            {t("cookies.actions.settings")}
          </Button>
        </div>
      </div>
    </div>
  );
}
