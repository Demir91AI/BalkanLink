import { useState } from "react";
import { Check, X, Crown, Tag, Building2, Megaphone, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { initiateCheckout, STRIPE_PRICE_IDS, openCustomerPortal } from "@/lib/stripe";
import { useNavigate } from "react-router-dom";
import PageNav from "@/components/navigation/PageNav";

export default function Pricing() {
  const [yearly, setYearly] = useState(false);
  const { user, isPremium } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = (priceId: string) => {
    if (!user) {
      navigate("/login");
      return;
    }
    initiateCheckout(priceId, user.id);
  };

  return (
    <div className="min-h-screen bg-background">
      <PageNav />
      <div className="container max-w-5xl py-10 px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-2xl md:text-3xl font-bold">Odaberi svoj plan</h1>
          <p className="mt-2 text-muted-foreground">
            Bez skrivenih troškova. Otkaži u bilo kojem trenutku.
          </p>

          {isPremium && (
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-[hsl(var(--gold))]/10 px-4 py-2 text-sm font-medium text-[hsl(var(--gold))]">
              <Crown className="h-4 w-4" />
              Trenutno ste Premium korisnik
              <Button
                variant="ghost"
                size="sm"
                className="ml-2 h-7 text-xs"
                onClick={openCustomerPortal}
              >
                <Settings className="mr-1 h-3 w-3" />
                Upravljaj pretplatom
              </Button>
            </div>
          )}

          {/* Monthly/Yearly toggle */}
          <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-border bg-muted/50 p-1">
            <button
              onClick={() => setYearly(false)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                !yearly ? "bg-background shadow-sm text-foreground" : "text-muted-foreground"
              }`}
            >
              Mjesečno
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`relative rounded-full px-4 py-2 text-sm font-medium transition-all ${
                yearly ? "bg-background shadow-sm text-foreground" : "text-muted-foreground"
              }`}
            >
              Godišnje
              <span className="absolute -top-2 -right-2 rounded-full bg-[hsl(var(--success))] px-1.5 py-0.5 text-[8px] font-bold text-white">
                Uštedi 17%
              </span>
            </button>
          </div>
        </div>

        {/* Plan Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Free */}
          <div className="rounded-2xl border border-border bg-card p-6 flex flex-col">
            <h2 className="text-lg font-bold">Besplatno</h2>
            <p className="mt-1 text-3xl font-bold">0€</p>
            <p className="text-xs text-muted-foreground mb-6">Zauvijek besplatno</p>

            <ul className="flex-1 space-y-2.5 text-sm">
              <Feature yes>Uvod u sve Smart Guides</Feature>
              <Feature yes>Brutto-Netto kalkulator</Feature>
              <Feature yes>Pregled oglasa (Classifieds)</Feature>
              <Feature yes>3 besplatne AI poruke</Feature>
              <Feature no>Kompletni formulari</Feature>
              <Feature no>Puni AI Asistent</Feature>
              <Feature no>Deutsch kurs</Feature>
            </ul>

            <Button
              variant="outline"
              className="mt-6 w-full rounded-xl"
              onClick={() => navigate("/register")}
            >
              Počni besplatno
            </Button>
          </div>

          {/* Premium (highlighted) */}
          <div className="relative rounded-2xl border-2 border-[hsl(var(--gold))] bg-card p-6 flex flex-col shadow-lg">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[hsl(var(--gold))] px-3 py-1 text-[10px] font-bold text-white whitespace-nowrap">
              NAJPOPULARNIJE
            </span>
            <h2 className="text-lg font-bold mt-2">Premium</h2>
            <p className="mt-1 text-3xl font-bold">
              {yearly ? "99.90€" : "9.99€"}
              <span className="text-sm font-normal text-muted-foreground">
                /{yearly ? "god." : "mjes."}
              </span>
            </p>
            <p className="text-xs text-muted-foreground mb-6">
              {yearly ? "8.33€/mjes. — uštedi 20€" : "Otkaži u bilo kojem trenutku"}
            </p>

            <ul className="flex-1 space-y-2.5 text-sm">
              <Feature yes>Sve iz Besplatnog plana</Feature>
              <Feature yes>Svi Musterformulare (15+ formulara)</Feature>
              <Feature yes>Kompletni Smart Guides (korak po korak)</Feature>
              <Feature yes>Neograničen AI Asistent</Feature>
              <Feature yes>Dokumenten-Check AI</Feature>
              <Feature yes>Kompletan Deutsch kurs</Feature>
              <Feature yes>Detaljni Viza Navigator</Feature>
              <Feature yes>Prioritetna podrška</Feature>
            </ul>

            <Button
              className="mt-6 w-full rounded-xl bg-[hsl(var(--gold))] text-sm font-bold text-white hover:bg-[hsl(var(--gold-light))]"
              onClick={() =>
                handleCheckout(yearly ? STRIPE_PRICE_IDS.PREMIUM_YEARLY : STRIPE_PRICE_IDS.PREMIUM_MONTHLY)
              }
            >
              <Crown className="mr-2 h-4 w-4" />
              {isPremium ? "Promijeni plan" : "Počni Premium"}
            </Button>
            <p className="mt-2 text-center text-[10px] text-muted-foreground">
              §19 UStG — bez PDV-a
            </p>
          </div>

          {/* Single formular */}
          <div className="rounded-2xl border border-border bg-card p-6 flex flex-col">
            <h2 className="text-lg font-bold">Jednokratni formular</h2>
            <p className="mt-1 text-3xl font-bold">
              3.99€
              <span className="text-sm font-normal text-muted-foreground"> po formularu</span>
            </p>
            <p className="text-xs text-muted-foreground mb-6">Jednokratno, zauvijek</p>

            <ul className="flex-1 space-y-2.5 text-sm">
              <Feature yes>Pristup jednom formularu po izboru</Feature>
              <Feature yes>Zauvijek, bez pretplate</Feature>
              <Feature no>Ostali formulari</Feature>
              <Feature no>Smart Guides</Feature>
              <Feature no>AI Asistent</Feature>
            </ul>

            <Button
              variant="outline"
              className="mt-6 w-full rounded-xl"
              onClick={() => navigate("/formulari")}
            >
              <Tag className="mr-2 h-4 w-4" />
              Odaberi formular
            </Button>
          </div>
        </div>

        {/* Firma oglasi */}
        <div className="mt-16">
          <h2 className="text-xl font-bold text-center mb-6">
            <Building2 className="inline mr-2 h-5 w-5" />
            Reklamirajte svoju firmu
          </h2>
          <div className="grid gap-4 md:grid-cols-2 max-w-2xl mx-auto">
            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 className="font-bold">Basic</h3>
              <p className="text-2xl font-bold mt-1">9.99€<span className="text-sm font-normal text-muted-foreground">/mjes.</span></p>
              <p className="text-xs text-muted-foreground mt-1">Sidebar banner</p>
            </div>
            <div className="rounded-2xl border-2 border-[hsl(var(--gold))] bg-card p-5">
              <h3 className="font-bold">Featured</h3>
              <p className="text-2xl font-bold mt-1">19.99€<span className="text-sm font-normal text-muted-foreground">/mjes.</span></p>
              <p className="text-xs text-muted-foreground mt-1">Homepage banner + sidebar</p>
            </div>
          </div>
          <div className="text-center mt-4">
            <Button variant="outline" className="rounded-xl" asChild>
              <a href="mailto:info@balkanlink.de">Kontaktirajte nas</a>
            </Button>
          </div>
        </div>

        {/* Classifieds PRO */}
        <div className="mt-12 max-w-md mx-auto">
          <h2 className="text-xl font-bold text-center mb-4">
            <Megaphone className="inline mr-2 h-5 w-5" />
            Istaknite vaš oglas
          </h2>
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">7 dana</span>
              <span className="font-bold">1.99€</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">30 dana</span>
              <span className="font-bold">4.99€</span>
            </div>
          </div>
        </div>

        <p className="mt-10 text-center text-[10px] text-muted-foreground">
          Gemäß § 19 UStG wird keine Umsatzsteuer berechnet.
        </p>
      </div>
    </div>
  );
}

function Feature({ yes, no, children }: { yes?: boolean; no?: boolean; children: React.ReactNode }) {
  return (
    <li className={`flex items-start gap-2 ${no ? "text-muted-foreground" : ""}`}>
      {yes && (
        <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[hsl(var(--success))]/10">
          <Check className="h-3 w-3 text-[hsl(var(--success))]" />
        </span>
      )}
      {no && (
        <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-muted">
          <X className="h-3 w-3 text-muted-foreground" />
        </span>
      )}
      {children}
    </li>
  );
}
