import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import { Link } from "react-router-dom";
import type { useCookieConsent } from "@/hooks/useCookieConsent";

type Props = Pick<ReturnType<typeof useCookieConsent>, "consent" | "showPreferences" | "closePreferences" | "acceptAll" | "rejectOptional" | "saveCustom">;

const CATEGORY_DEFS = [
  { key: "necessary" as const, i18n: "necessary", locked: true },
  { key: "analyticsConsent" as const, i18n: "analytics" },
  { key: "marketingConsent" as const, i18n: "marketing" },
  { key: "functionalConsent" as const, i18n: "functional" },
];

export default function CookiePreferencesModal({ consent, showPreferences, closePreferences, acceptAll, rejectOptional, saveCustom }: Props) {
  const { t } = useTranslation("common");
  const [analytics, setAnalytics] = useState(consent.analyticsConsent);
  const [marketing, setMarketing] = useState(consent.marketingConsent);
  const [functional, setFunctional] = useState(consent.functionalConsent);

  useEffect(() => {
    if (showPreferences) {
      setAnalytics(consent.analyticsConsent);
      setMarketing(consent.marketingConsent);
      setFunctional(consent.functionalConsent);
    }
  }, [showPreferences, consent]);

  const handleSave = () => {
    saveCustom({ analyticsConsent: analytics, marketingConsent: marketing, functionalConsent: functional });
  };

  return (
    <Dialog open={showPreferences} onOpenChange={(o) => { if (!o) closePreferences(); }}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-[hsl(var(--gold))]" />
            {t("cookies.modal.title")}
          </DialogTitle>
          <DialogDescription className="text-xs">
            {t("cookies.modal.description")}{" "}
            <Link to="/datenschutz" className="underline hover:text-foreground" onClick={closePreferences}>
              {t("cookies.modal.privacyLink")}
            </Link>.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-2">
          {CATEGORY_DEFS.map((cat) => {
            const checked = cat.key === "necessary"
              ? true
              : cat.key === "analyticsConsent" ? analytics
              : cat.key === "marketingConsent" ? marketing
              : functional;

            const toggle = cat.key === "analyticsConsent" ? setAnalytics
              : cat.key === "marketingConsent" ? setMarketing
              : cat.key === "functionalConsent" ? setFunctional
              : undefined;

            return (
              <div key={cat.key} className="flex items-center justify-between gap-3 rounded-lg border border-border/60 p-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{t(`cookies.categories.${cat.i18n}.label`)}</p>
                    {cat.locked && (
                      <span className="rounded-full bg-[hsl(var(--gold))]/15 px-2 py-0.5 text-[10px] font-semibold text-[hsl(var(--gold))]">
                        {t("cookies.modal.alwaysActive")}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{t(`cookies.categories.${cat.i18n}.desc`)}</p>
                </div>
                <Switch
                  checked={checked}
                  disabled={cat.locked}
                  onCheckedChange={toggle}
                  className="shrink-0"
                />
              </div>
            );
          })}
        </div>

        <DialogFooter className="flex flex-col gap-2 sm:flex-col">
          <Button size="sm" onClick={handleSave} className="w-full h-10 border border-border font-medium text-xs">
            {t("cookies.actions.save")}
          </Button>
          <Button
            size="sm"
            onClick={acceptAll}
            className="w-full h-10 bg-[hsl(var(--gold))] hover:bg-[hsl(var(--gold))]/90 text-[hsl(var(--primary))] font-semibold text-xs"
          >
            {t("cookies.actions.acceptAll")}
          </Button>
          <Button size="sm" variant="ghost" onClick={rejectOptional} className="w-full h-10 text-muted-foreground text-xs">
            {t("cookies.actions.rejectOptional")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
