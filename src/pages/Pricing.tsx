import { useState } from "react";
import { Check, X, Crown, Building2, Megaphone, Settings, GraduationCap, Zap, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { initiateCheckout, STRIPE_PRICE_IDS, openCustomerPortal } from "@/lib/stripe";
import { useNavigate } from "react-router-dom";
import PageNav from "@/components/navigation/PageNav";
import PricingFreeCard from "@/components/pricing/PricingFreeCard";
import PricingPremiumCard from "@/components/pricing/PricingPremiumCard";
import PricingComparisonTable from "@/components/pricing/PricingComparisonTable";
import { SEO } from "@/components/SEO";

const deutschLevels = [
  { level: "A1", price: "9,99€",  desc: "Osnove — prvi koraci",          priceId: "DEUTSCH_A1" },
  { level: "A2", price: "14,99€", desc: "Svakodnevica — laki razgovori", priceId: "DEUTSCH_A2" },
  { level: "B1", price: "19,99€", desc: "Samostalna komunikacija",       priceId: "DEUTSCH_B1" },
  { level: "B2", price: "24,99€", desc: "Složenije situacije",           priceId: "DEUTSCH_B2" },
  { level: "C1", price: "29,99€", desc: "Zahtjevan & poslovni nivo",     priceId: "DEUTSCH_C1" },
  { level: "C2", price: "34,99€", desc: "Profesionalni nivo",            priceId: "DEUTSCH_C2" },
];

export default function Pricing() {
  const [yearly, setYearly] = useState(false);
  const { user, isPremium } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = (priceId: string, mode: "subscription" | "payment" = "payment") => {
    if (!user) { navigate("/login"); return; }
    initiateCheckout(priceId, user.id, mode);
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO title="Cijene i Paketi — Premium 9.99€/mj" description="BalkanLink Premium za 9.99€ mjesečno — sve formulare, viza navigator, Dokumenten-Check, Asistent 24/7. Otkaži kad god želiš." path="/cijene" />
      <PageNav />
      <div className="container max-w-5xl py-10 px-4 space-y-16">

        {/* ── HEADER ── */}
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-bold">Cijene i paketi</h1>
          <p className="mt-2 text-muted-foreground">
            Bez skrivenih troškova. Otkaži u bilo kojem trenutku.
          </p>

          {isPremium && (
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-[hsl(var(--gold))]/10 px-4 py-2 text-sm font-medium text-[hsl(var(--gold))]">
              <Crown className="h-4 w-4" />
              Trenutno ste Premium korisnik
              <Button variant="ghost" size="sm" className="ml-2 h-7 text-xs" onClick={openCustomerPortal}>
                <Settings className="mr-1 h-3 w-3" />
                Upravljaj pretplatom
              </Button>
            </div>
          )}

          {/* Toggle */}
          <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-border bg-muted/50 p-1">
            <button
              onClick={() => setYearly(false)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${!yearly ? "bg-background shadow-sm text-foreground" : "text-muted-foreground"}`}
            >
              Mjesečno
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`relative rounded-full px-4 py-2 text-sm font-medium transition-all ${yearly ? "bg-background shadow-sm text-foreground" : "text-muted-foreground"}`}
            >
              Godišnje
              <span className="absolute -top-2 -right-2 rounded-full bg-[hsl(var(--success))] px-1.5 py-0.5 text-[8px] font-bold text-white">
                Uštedi 17%
              </span>
            </button>
          </div>
        </div>

        {/* ── PLAN KARTICE ── */}
        <div className="grid gap-6 md:grid-cols-2">
          <PricingFreeCard />
          <PricingPremiumCard yearly={yearly} isPremium={isPremium} onCheckout={handleCheckout} />
        </div>

        {/* ── TABELA ── */}
        <PricingComparisonTable />

        {/* ── DEUTSCHTRAINER ── */}
        <div>
          <div className="flex items-center justify-center gap-2 mb-4">
            <GraduationCap className="h-5 w-5 text-[hsl(var(--gold))]" />
            <h2 className="text-xl font-bold">BalkanLink Deutsch — Pojedinačni nivoi</h2>
          </div>

          {/* Reklama */}
          <div className="rounded-2xl border-2 border-[hsl(var(--gold))]/40 bg-gradient-to-br from-[hsl(var(--gold))]/10 to-transparent p-6 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="h-5 w-5 text-[hsl(var(--gold))]" />
              <p className="font-black text-sm">Jesi li siguran da hoćeš kupovati pojedinačno?</p>
            </div>
            <p className="text-sm text-muted-foreground">
              Kupuješ nivoe jedan po jedan? A1 do C2 = <strong className="text-foreground">134,94€</strong> — i to bez Amazon vaučera.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Uzmeš Godišnji Premium: svih 6 nivoa + sve Premium funkcije = <strong className="text-foreground">99,90€</strong>.
              Završi A1–C2 → dobiješ <strong className="text-foreground">30€ Amazon vaučer</strong>.
              Stvarno platiš samo <strong className="text-[hsl(var(--gold))]">69,90€</strong> za kompletan kurs.
            </p>
            <p className="font-bold text-foreground mt-3">Uštediš 65€. Dobiješ vaučer. Odluka je laka.</p>
            <Button
              onClick={() => navigate("/paketi")}
              className="mt-4 bg-[hsl(var(--gold))] text-white font-bold rounded-xl hover:bg-[hsl(var(--gold))]/90"
            >
              <Crown className="mr-2 h-4 w-4" />
              Godišnji Premium — 99,90€ →
            </Button>
          </div>

          {/* Level kartice */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {deutschLevels.map((lvl) => (
              <div key={lvl.level} className="rounded-xl border bg-card p-4 text-center flex flex-col">
                <span className="mb-1 inline-block rounded-full bg-primary px-3 py-0.5 text-[10px] font-black text-primary-foreground">
                  {lvl.level}
                </span>
                <p className="mt-2 text-lg font-black">{lvl.price}</p>
                <p className="mt-0.5 text-[10px] text-muted-foreground flex-1">{lvl.desc}</p>
                <Button
                  onClick={() => handleCheckout(
                    STRIPE_PRICE_IDS[lvl.priceId as keyof typeof STRIPE_PRICE_IDS],
                    "payment"
                  )}
                  variant="outline"
                  className="mt-3 h-8 w-full rounded-lg text-[11px] font-bold"
                >
                  Kupi →
                </Button>
              </div>
            ))}
          </div>
          <p className="mt-3 text-center text-[10px] text-muted-foreground">
            Svih 6 nivoa pojedinačno = 134,94€ — Godišnji Premium = 99,90€ i uključuje sve.
          </p>
        </div>

        {/* ── WERTGUTSCHEIN ── */}
        <div className="rounded-2xl border-2 border-[hsl(var(--gold))]/20 bg-gradient-to-b from-[hsl(var(--gold))]/5 to-[hsl(var(--gold))]/10 p-5 max-w-md mx-auto">
          <h2 className="mb-3 text-sm font-black flex items-center justify-center gap-2">
            <Gift className="h-4 w-4 text-[hsl(var(--gold))]" />
            Amazon Wertgutschein Program
          </h2>
          <div className="rounded-xl bg-card border p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-bold">Završi A1–C2 kompletno</p>
              <p className="text-xs text-muted-foreground mt-0.5">Samo za aktivne Premium korisnike</p>
            </div>
            <p className="text-xl font-black text-[hsl(var(--gold))]">30€</p>
          </div>
          <p className="mt-3 text-[10px] text-muted-foreground leading-relaxed text-center">
            Potrebno: aktivan Premium + 100% završetak A1–C2. Manualnu provjeru vrši BalkanLink.
          </p>
        </div>

        {/* ── PRO OGLAS ── */}
        <div className="max-w-md mx-auto">
          <h2 className="text-xl font-bold text-center mb-4">
            <Megaphone className="inline mr-2 h-5 w-5" />
            Istakni oglas (Nudim / Tražim)
          </h2>
          <div className="rounded-2xl border border-border bg-card p-5 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-medium">7 dana</p>
                <p className="text-xs text-muted-foreground">Non-Premium korisnici</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="font-bold">1,99€</span>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 rounded-lg text-[11px] font-bold"
                  onClick={() => handleCheckout(STRIPE_PRICE_IDS.PRO_AD_7DAY, "payment")}
                >
                  Kupi →
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-medium">30 dana</p>
                <p className="text-xs text-muted-foreground">Non-Premium korisnici</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="font-bold">4,99€</span>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 rounded-lg text-[11px] font-bold"
                  onClick={() => handleCheckout(STRIPE_PRICE_IDS.PRO_AD_30DAY, "payment")}
                >
                  Kupi →
                </Button>
              </div>
            </div>
            <div className="h-px bg-border" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium flex items-center gap-1">
                  <Crown className="h-3.5 w-3.5 text-[hsl(var(--gold))]" />
                  Premium oglas
                </p>
                <p className="text-xs text-muted-foreground">Max 10 dana trajanje</p>
              </div>
              <span className="font-bold text-[hsl(var(--gold))]">Gratis</span>
            </div>
          </div>
        </div>

        {/* ── DOKUMENTEN-CHECK ── */}
        <div className="max-w-md mx-auto">
          <h2 className="text-xl font-bold text-center mb-4">Dokumenten-Check</h2>
          <div className="rounded-2xl border border-border bg-card p-5 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-medium">Jednokratno</p>
                <p className="text-xs text-muted-foreground">Resetuje se nakon svake upotrebe</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="font-bold">2,99€</span>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 rounded-lg text-[11px] font-bold"
                  onClick={() => handleCheckout(STRIPE_PRICE_IDS.DOC_CHECK, "payment")}
                >
                  Kupi →
                </Button>
              </div>
            </div>
            <div className="h-px bg-border" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium flex items-center gap-1">
                  <Crown className="h-3.5 w-3.5 text-[hsl(var(--gold))]" />
                  Premium
                </p>
                <p className="text-xs text-muted-foreground">Nakon 5 provjera isti dan = 2,99€/kom</p>
              </div>
              <span className="font-bold text-[hsl(var(--gold))]">5×/dan gratis</span>
            </div>
          </div>
        </div>

        {/* ── FIRMA BANER ── */}
        <div className="max-w-md mx-auto">
          <h2 className="text-xl font-bold text-center mb-4">
            <Building2 className="inline mr-2 h-5 w-5" />
            Reklamiraj svoju firmu
          </h2>
          <div className="rounded-2xl border-2 border-[hsl(var(--gold))] bg-card p-5">
            <h3 className="font-bold">Featured</h3>
            <p className="text-[13px] text-muted-foreground mt-0.5">
              Istaknuta pozicija + prikazano na naslovnoj stranici
            </p>
            <p className="text-2xl font-bold mt-1">
              14,99€<span className="text-sm font-normal text-muted-foreground">/mjes.</span>
            </p>
            <p className="text-xs text-muted-foreground mt-2">Istaknuta kartica + flow banner</p>
            <Button
              className="mt-4 w-full rounded-xl bg-[hsl(var(--gold))] text-white hover:bg-[hsl(var(--gold-light))] text-sm font-bold"
              onClick={() => handleCheckout(STRIPE_PRICE_IDS.FEATURED_FIRMA, "subscription")}
            >
              Kupi Featured →
            </Button>
          </div>
        </div>

        <p className="text-center text-[10px] text-muted-foreground">
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
