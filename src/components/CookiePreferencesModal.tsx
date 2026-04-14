import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import { Link } from "react-router-dom";
import type { useCookieConsent } from "@/hooks/useCookieConsent";

type Props = Pick<ReturnType<typeof useCookieConsent>, "consent" | "showPreferences" | "closePreferences" | "acceptAll" | "rejectOptional" | "saveCustom">;

const CATEGORIES = [
  {
    key: "necessary" as const,
    label: "Neophodni kolačići",
    desc: "Potrebni su za osnovni rad stranice i ne mogu se isključiti.",
    locked: true,
  },
  {
    key: "analyticsConsent" as const,
    label: "Analitika",
    desc: "Pomažu nam da razumijemo kako korisnici koriste BalkanLink kako bismo poboljšali sadržaj i iskustvo.",
  },
  {
    key: "marketingConsent" as const,
    label: "Marketing",
    desc: "Koriste se za mjerenje kampanja i prikaz relevantnijeg promotivnog sadržaja.",
  },
  {
    key: "functionalConsent" as const,
    label: "Funkcionalni kolačići",
    desc: "Pamte određene izbore i poboljšavaju korisničko iskustvo.",
  },
];

export default function CookiePreferencesModal({ consent, showPreferences, closePreferences, acceptAll, rejectOptional, saveCustom }: Props) {
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
            Postavke kolačića
          </DialogTitle>
          <DialogDescription className="text-xs">
            Odaberite koje kategorije kolačića želite dozvoliti. Više informacija u{" "}
            <Link to="/datenschutz" className="underline hover:text-foreground" onClick={closePreferences}>
              zaštiti podataka
            </Link>.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-2">
          {CATEGORIES.map((cat) => {
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
                    <p className="text-sm font-medium">{cat.label}</p>
                    {cat.locked && (
                      <span className="rounded-full bg-[hsl(var(--gold))]/15 px-2 py-0.5 text-[10px] font-semibold text-[hsl(var(--gold))]">
                        Uvijek aktivno
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{cat.desc}</p>
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
            Spremi izbor
          </Button>
          <Button
            size="sm"
            onClick={acceptAll}
            className="w-full h-10 bg-[hsl(var(--gold))] hover:bg-[hsl(var(--gold))]/90 text-[hsl(var(--primary))] font-semibold text-xs"
          >
            Prihvati sve
          </Button>
          <Button size="sm" variant="ghost" onClick={rejectOptional} className="w-full h-10 text-muted-foreground text-xs">
            Odbij opcionalne
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
