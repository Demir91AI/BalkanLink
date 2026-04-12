import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, Crown, GraduationCap, X, Gift, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navigateBackOrHome } from "@/lib/navigation";
import { initiateCheckout, STRIPE_PRICE_IDS } from "@/lib/stripe";
import { useAuth } from "@/contexts/AuthContext";

const individualLevels = [
  { level: "A1", price: "9,99€",  desc: "Osnove — prvi koraci",        priceId: "DEUTSCH_A1" as const },
  { level: "A2", price: "14,99€", desc: "Svakodnevica — laki razgovori", priceId: "DEUTSCH_A2" as const },
  { level: "B1", price: "19,99€", desc: "Samostalna komunikacija",      priceId: "DEUTSCH_B1" as const },
  { level: "B2", price: "24,99€", desc: "Složenije situacije",          priceId: "DEUTSCH_B2" as const },
  { level: "C1", price: "29,99€", desc: "Zahtjevan & poslovni nivo",    priceId: "DEUTSCH_C1" as const },
  { level: "C2", price: "34,99€", desc: "Profesionalni nivo",           priceId: "DEUTSCH_C2" as const },
];

const freeFeatures = [
  { text: "3 lekcije po nivou besplatno", included: true },
  { text: "3 rečenice Sprachassistenta (od 500)", included: true },
  { text: "Sve lekcije A1–C2 (240 ukupno)", included: false },
  { text: "500 zadataka po stageu", included: false },
  { text: "Neograničen Sprachassistent", included: false },
  { text: "Amazon Wertgutschein 30€", included: false },
];

const premiumFeatures = [
  "40 lekcija po nivou (240 ukupno A1–C2)",
  "500 zadataka po stageu",
  "3 stagea po lekciji = 1.500 zadataka po lekciji",
  "Sprachassistent — 500 rečenica",
  "Svi scenariji iz stvarnog života u Njemačkoj",
  "Smart Progress sistem",
  "Amazon Wertgutschein 30€ pri završetku A1–C2",
];

export default function TrainerPreise() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLevelCheckout = (priceId: keyof typeof STRIPE_PRICE_IDS) => {
    if (!user) { navigate("/login"); return; }
    initiateCheckout(STRIPE_PRICE_IDS[priceId], user.id, "payment");
  };

  return (
    <>
      <section className="border-b bg-primary py-6">
        <div className="container max-w-3xl">
          <button
            onClick={() => navigateBackOrHome(navigate)}
            className="mb-3 flex items-center gap-1.5 text-sm text-primary-foreground/60 hover:text-primary-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Nazad
          </button>
          <div className="flex items-center gap-3">
            <GraduationCap className="h-7 w-7 text-[hsl(var(--gold))]" />
            <div>
              <h1 className="text-lg font-black text-primary-foreground sm:text-xl">
                BalkanLink Deutsch — Cijene
              </h1>
              <p className="text-xs text-primary-foreground/70">
                Nauči njemački za stvarne situacije u Njemačkoj
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="container max-w-3xl py-6 space-y-8">

        {/* ── FREE vs PREMIUM ── */}
        <div className="rounded-2xl border bg-card p-5">
          <h2 className="mb-4 text-sm font-black text-center">
            Besplatno vs. Premium
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-border bg-muted/30 p-4">
              <p className="mb-3 text-xs font-black text-muted-foreground">
                BESPLATNO
              </p>
              <ul className="space-y-2">
                {freeFeatures.map((f) => (
                  <li key={f.text} className="flex items-start gap-1.5 text-[11px]">
                    {f.included ? (
                      <Check className="mt-0.5 h-3 w-3 shrink-0 text-[hsl(var(--success))]" />
                    ) : (
                      <X className="mt-0.5 h-3 w-3 shrink-0 text-muted-foreground/40" />
                    )}
                    <span className={f.included ? "font-medium" : "text-muted-foreground/60 line-through"}>
                      {f.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border-2 border-[hsl(var(--gold))]/30 bg-gradient-to-b from-[hsl(var(--gold))]/5 to-[hsl(var(--gold))]/10 p-4">
              <div className="mb-3 flex items-center gap-1.5">
                <Crown className="h-3.5 w-3.5 text-[hsl(var(--gold))]" />
                <p className="text-xs font-black text-[hsl(var(--gold))]">PREMIUM</p>
              </div>
              <ul className="space-y-2">
                {premiumFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-1.5 text-[11px] font-medium">
                    <Check className="mt-0.5 h-3 w-3 shrink-0 text-[hsl(var(--gold))]" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => navigate("/paketi")}
                className="mt-4 w-full rounded-xl h-9 text-xs font-bold bg-[hsl(var(--gold))] text-white hover:bg-[hsl(var(--gold))]/90"
              >
                Kupi Premium →
              </Button>
            </div>
          </div>
        </div>

        {/* ── PREMIUM REKLAMA ── */}
        <div className="rounded-2xl border-2 border-[hsl(var(--gold))]/40 bg-gradient-to-br from-[hsl(var(--gold))]/10 to-transparent p-6">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="h-5 w-5 text-[hsl(var(--gold))]" />
            <h2 className="text-sm font-black">Zašto Premium?</h2>
          </div>
          <div className="space-y-2 text-sm">
            <p className="text-muted-foreground">
              Kupuješ nivoe pojedinačno? A1 do C2 = <strong className="text-foreground">134,94€</strong> — i to bez Amazon vaučera.
            </p>
            <p className="text-muted-foreground">
              Uzmeš Godišnji Premium: svih 6 nivoa + sve Premium funkcije = <strong className="text-foreground">99,90€</strong>. Završi A1–C2 → dobiješ{" "}
              <strong className="text-foreground">30€ Amazon vaučer</strong>. Stvarno platiš samo{" "}
              <strong className="text-[hsl(var(--gold))]">69,90€</strong> za kompletan kurs.
            </p>
            <p className="font-bold text-foreground">
              Uštediš 65€. Dobiješ vaučer. Odluka je laka.
            </p>
          </div>
          <Button
            onClick={() => navigate("/paketi")}
            className="mt-4 w-full rounded-xl bg-[hsl(var(--gold))] text-white font-bold hover:bg-[hsl(var(--gold))]/90"
          >
            <Crown className="mr-2 h-4 w-4" />
            Godišnji Premium — 99,90€ →
          </Button>
        </div>

        {/* ── EINZELNE NIVEAUS ── */}
        <div>
          <h2 className="mb-1 text-sm font-black text-center">
            Pojedinačni nivoi
          </h2>
          <p className="text-center text-xs text-muted-foreground mb-4">
            Kupi samo nivo koji trebaš — bez pretplate
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {individualLevels.map((lvl) => (
              <div key={lvl.level} className="rounded-xl border bg-card p-4 text-center flex flex-col">
                <span className="mb-1 inline-block rounded-full bg-primary px-3 py-0.5 text-[10px] font-black text-primary-foreground">
                  {lvl.level}
                </span>
                <p className="mt-2 text-lg font-black">{lvl.price}</p>
                <p className="mt-0.5 text-[10px] text-muted-foreground flex-1">{lvl.desc}</p>
                <Button
                  onClick={() => handleLevelCheckout(lvl.priceId)}
                  variant="outline"
                  className="mt-3 h-8 w-full rounded-lg text-[11px] font-bold"
                >
                  Kupi →
                </Button>
              </div>
            ))}
          </div>
          <p className="mt-3 text-center text-[10px] text-muted-foreground">
            Kupovinom svih 6 nivoa pojedinačno platiš 134,94€ — Godišnji Premium košta 99,90€ i uključuje sve.
          </p>
        </div>

        {/* ── WERTGUTSCHEIN ── */}
        <div className="rounded-2xl border-2 border-[hsl(var(--gold))]/20 bg-gradient-to-b from-[hsl(var(--gold))]/5 to-[hsl(var(--gold))]/10 p-5">
          <h2 className="mb-3 text-sm font-black flex items-center gap-2">
            <Gift className="h-4 w-4 text-[hsl(var(--gold))]" />
            Amazon Wertgutschein Program
          </h2>
          <div className="rounded-xl bg-card border p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-bold">Završi A1–C2 kompletno</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Samo za aktivne Premium korisnike
              </p>
            </div>
            <p className="text-xl font-black text-[hsl(var(--gold))]">30€</p>
          </div>
          <p className="mt-3 text-[10px] text-muted-foreground leading-relaxed">
            Potrebno: aktivan Premium + 100% završetak svih lekcija A1–C2. Wertgutschein je dobrovoljna bonus nagrada — nije pravno potraživanje. Manualnu provjeru vrši BalkanLink. Detalji u{" "}
            <button
              onClick={() => navigate("/deutsch-trainer/bonusbedingungen")}
              className="text-primary underline"
            >
              Bonusbedingungen
            </button>.
          </p>
        </div>

      </div>
    </>
  );
}
