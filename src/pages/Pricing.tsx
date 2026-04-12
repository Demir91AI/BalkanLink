import { useState } from "react";
import { Crown, Building2, Megaphone, Settings, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { initiateCheckout, STRIPE_PRICE_IDS, openCustomerPortal } from "@/lib/stripe";
import { useNavigate } from "react-router-dom";
import PageNav from "@/components/navigation/PageNav";
import PricingFreeCard from "@/components/pricing/PricingFreeCard";
import PricingPremiumCard from "@/components/pricing/PricingPremiumCard";
import PricingComparisonTable from "@/components/pricing/PricingComparisonTable";

export default function Pricing() {
  const [yearly, setYearly] = useState(false);
  const { user, isPremium } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = (priceId: string, mode: "subscription" | "payment" = "payment") => {
    if (!user) {
      navigate("/login");
      return;
    }
    initiateCheckout(priceId, user.id, mode);
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
        <div className="grid gap-6 md:grid-cols-2">
          <PricingFreeCard />

          <PricingPremiumCard
            yearly={yearly}
            isPremium={isPremium}
            onCheckout={handleCheckout}
          />
        </div>

        {/* Comparison Table */}
        <PricingComparisonTable />

        {/* Firma oglasi */}
        <div className="mt-16">
          <h2 className="text-xl font-bold text-center mb-6">
            <Building2 className="inline mr-2 h-5 w-5" />
            Reklamirajte svoju firmu
          </h2>
          <div className="max-w-md mx-auto">
            <div className="rounded-2xl border-2 border-[hsl(var(--gold))] bg-card p-5">
              <h3 className="font-bold">Featured</h3>
              <p className="text-[13px] text-muted-foreground mt-0.5">Istaknuta pozicija + prikazano na naslovnoj stranici</p>
              <p className="text-2xl font-bold mt-1">14.99€<span className="text-sm font-normal text-muted-foreground">/mjes.</span></p>
              <p style={{ fontSize: 11, fontWeight: 700, color: "#EAB308", marginTop: 4 }}>🎉 Promo cijena — prvih 6 mjeseci</p>
              <p className="text-xs text-muted-foreground mt-1">Istaknuta kartica + flow banner</p>
              <Button
                className="mt-4 w-full rounded-xl bg-[hsl(var(--gold))] text-white hover:bg-[hsl(var(--gold-light))] text-sm"
                asChild
              >
                <a href="mailto:kontakt@balkanlink.de?subject=Featured%20Firma%20Paket">
                  Zatraži Featured →
                </a>
              </Button>
            </div>
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
          Sve cijene bez PDV-a. §19 UStG Kleinunternehmerregelung.
        </p>
      </div>
    </div>
  );
}

export function Feature({ yes, no, children }: { yes?: boolean; no?: boolean; children: React.ReactNode }) {
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
