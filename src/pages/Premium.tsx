import { Check, X, Star, Shield, Zap, ArrowRight, Crown, Megaphone, Image, Monitor, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import LegalDisclaimer from "@/components/LegalDisclaimer";
import PricingHero from "@/components/pricing/PricingHero";
import PricingCard from "@/components/pricing/PricingCard";
import PricingFreeVsPremium from "@/components/pricing/PricingFreeVsPremium";

export default function Premium() {
  const { user, isPremium } = useAuth();

  return (
    <>
      <PricingHero />

      {/* PRODUCTS */}
      <section className="py-16 md:py-20">
        <div className="container max-w-5xl space-y-8">

          {/* 1. BalkanLink Premium */}
          <PricingCard
            icon={<Crown className="h-6 w-6 text-[hsl(var(--gold))]" />}
            title="BalkanLink Premium"
            price="4.99€"
            period="/ Monat"
            badge="Exklusives Startangebot"
            features={[
              "Smart Guide (Schritt-für-Schritt Hilfe bei Formularen)",
              "Unterstützung beim Ausfüllen",
              "KI-Hilfe bei Fragen",
              "Zugriff auf alle Premium-Inhalte",
            ]}
            cta="Jetzt freischalten"
            highlight
            user={user}
            isPremium={isPremium}
          />

          <PricingFreeVsPremium />

          {/* 2. Premium-Präsenz (HAUPTPRODUKT) */}
          <PricingCard
            icon={<Image className="h-6 w-6 text-[hsl(var(--gold))]" />}
            title="Premium-Präsenz"
            price="19.99€"
            period="/ Monat"
            badge="Exklusives Startangebot"
            features={[
              "Große Darstellung",
              "Automatisch wechselnde Bilder (Slideshow)",
              "Top-Position auf der Seite",
              "Mehr Sichtbarkeit und Klicks",
            ]}
            cta="Jetzt sichtbar werden"
            highlight
            user={user}
            isPremium={isPremium}
            rank={1}
          />

          {/* 3. Banner-Präsenz */}
          <PricingCard
            icon={<Monitor className="h-6 w-6 text-[hsl(var(--gold))]" />}
            title="Banner-Präsenz"
            price="9.99€"
            period="/ Monat"
            badge="Exklusives Startangebot"
            features={[
              "Rotierende Anzeige (Auto-Slider)",
              "Manuelles Scrollen möglich (links/rechts)",
              "Sichtbar zwischen mehreren Sektionen",
            ]}
            cta="Jetzt sichtbar werden"
            user={user}
            isPremium={isPremium}
            rank={2}
          />

          {/* 4. PRO Anzeige */}
          <PricingCard
            icon={<Megaphone className="h-6 w-6 text-[hsl(var(--gold))]" />}
            title="Anzeige hervorheben (PRO)"
            price="2.99€"
            period="/ 30 Tage"
            features={[
              "Anzeige erscheint über normalen Anzeigen",
              "Mehr Sichtbarkeit und mehr Anfragen",
            ]}
            cta="Anzeige hervorheben – 2.99€"
            small
            user={user}
            isPremium={isPremium}
            rank={3}
          >
            <div className="mt-3 space-y-1 text-xs text-muted-foreground">
              <p>• Max. 3–5 gleichzeitig hervorgehobene Anzeigen</p>
              <p>• Automatisches Ablaufdatum nach 30 Tagen</p>
              <p>• Bei mehr → Rotation oder Sortierung nach Datum</p>
            </div>
          </PricingCard>

          {/* 5. Kostenlose Anzeigen Info */}
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                <Info className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-sm font-semibold">Kostenlose Anzeigen</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Laufzeit: 14 Tage — danach automatisch deaktiviert.
                </p>
                <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                  <li className="flex items-center gap-1.5">
                    <Check className="h-3 w-3 text-[hsl(var(--success))] shrink-0" /> Kostenlos erneuern
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="h-3 w-3 text-[hsl(var(--success))] shrink-0" /> Oder PRO Anzeige aktivieren
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="h-3 w-3 text-[hsl(var(--success))] shrink-0" /> Beim Erneuern erscheint die Anzeige wieder oben wie neu
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST + LEGAL */}
      <section className="py-14">
        <div className="container max-w-5xl">
          <div className="grid gap-5 sm:grid-cols-3">
            {[
              { icon: Shield, text: "Keine Vertragsbindung" },
              { icon: Zap, text: "Jederzeit kündbar" },
              { icon: Star, text: "Für die Balkan-Community in Deutschland" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex flex-col items-center rounded-xl border bg-card p-6 text-center shadow-sm">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(var(--gold))]/10">
                    <Icon className="h-5 w-5 text-[hsl(var(--gold))]" />
                  </div>
                  <p className="text-sm font-medium">{item.text}</p>
                </div>
              );
            })}
          </div>

          {/* §19 UStG */}
          <div className="mt-8 rounded-lg border border-border bg-muted/50 p-4 text-center">
            <p className="text-xs text-muted-foreground">
              Gemäß §19 UStG wird keine Umsatzsteuer berechnet.
            </p>
          </div>

          <LegalDisclaimer />
        </div>
      </section>
    </>
  );
}
