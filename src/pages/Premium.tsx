import { Check, X, Star, Shield, Zap, Crown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import LegalDisclaimer from "@/components/LegalDisclaimer";
import logo from "@/assets/logo-balkanlink.png";

const freeFeatures = [
  { text: "Osnovne informacije", included: true },
  { text: "Pretraga zajednice (gradovi, restorani, džemati)", included: true },
  { text: "Lista institucija", included: true },
  { text: "Jednostavni AI odgovori", included: true },
  { text: "Pregled kategorija", included: true },
  { text: "Kompletna uputstva korak-po-korak", included: false },
  { text: "Popunjavanje formulara uz pomoć", included: false },
  { text: "Premium vodiči (Kindergeld, Kita, Wohngeld…)", included: false },
  { text: "Lični AI asistiran proces", included: false },
  { text: "Prioritetne informacije", included: false },
  { text: "Premium sadržaj bez ograničenja", included: false },
];

const premiumFeatures = [
  "Osnovne informacije",
  "Pretraga zajednice (gradovi, restorani, džemati)",
  "Lista institucija",
  "Jednostavni AI odgovori",
  "Pregled kategorija",
  "Kompletna uputstva korak-po-korak",
  "Popunjavanje formulara uz pomoć",
  "Premium vodiči (Kindergeld, Kita, Wohngeld…)",
  "Lični AI asistiran proces",
  "Prioritetne informacije",
  "Premium sadržaj bez ograničenja",
];

const trustItems = [
  { icon: Shield, text: "Bez ugovorne obaveze" },
  { icon: Zap, text: "Otkazivanje bilo kada" },
  { icon: Star, text: "Napravljeno za Balkan zajednicu u Njemačkoj" },
];

export default function Premium() {
  const { user, isPremium } = useAuth();

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#0B1F3A] py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0B1F3A]/80" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        <div className="container relative z-10 text-center">
          <img src={logo} alt="BalkanLink" className="mx-auto mb-6 h-14 w-auto object-contain" />
          <h1 className="font-heading text-3xl font-extrabold tracking-tight text-white md:text-5xl">
            BalkanLink <span className="text-gold">Premium</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/50 md:text-lg">
            Sve što ti treba za život u Njemačkoj — bez lutanja i gubljenja vremena.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button size="lg" className="btn-gold-gradient h-12 rounded-xl px-8 text-sm font-bold" asChild>
              <a href="#pricing">
                Postani Premium član
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button variant="ghost" size="lg" className="h-12 rounded-xl px-8 text-sm text-white/40 hover:text-white hover:bg-white/5" asChild>
              <Link to="/">Nastavi besplatno</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="py-16 md:py-20">
        <div className="container max-w-4xl">
          <h2 className="mb-2 text-center font-heading text-2xl font-bold md:text-3xl">
            Šta dobijaš?
          </h2>
          <p className="mb-10 text-center text-sm text-muted-foreground">
            Uporedi Free i Premium pristup.
          </p>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-hidden rounded-2xl border shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-6 py-4 text-left font-semibold">Funkcija</th>
                  <th className="px-6 py-4 text-center font-semibold">Free</th>
                  <th className="relative px-6 py-4 text-center font-semibold">
                    <div className="absolute -top-px left-0 right-0 h-1 rounded-t bg-gold" />
                    Premium
                  </th>
                </tr>
              </thead>
              <tbody>
                {premiumFeatures.map((feat, i) => {
                  const isFree = freeFeatures[i]?.included;
                  return (
                    <tr key={i} className="border-b last:border-b-0 transition-colors hover:bg-muted/30">
                      <td className="px-6 py-3.5">{feat}</td>
                      <td className="px-6 py-3.5 text-center">
                        {isFree ? (
                          <Check className="mx-auto h-4 w-4 text-emerald-500" />
                        ) : (
                          <X className="mx-auto h-4 w-4 text-muted-foreground/30" />
                        )}
                      </td>
                      <td className="bg-gold/[0.03] px-6 py-3.5 text-center">
                        <Check className="mx-auto h-4 w-4 text-gold" />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="flex flex-col gap-4 md:hidden">
            <div className="rounded-xl border bg-card p-5">
              <h3 className="mb-3 font-semibold">Free</h3>
              <ul className="space-y-2.5">
                {freeFeatures.map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-[13px]">
                    {f.included ? (
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
                    ) : (
                      <X className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground/30" />
                    )}
                    <span className={f.included ? "" : "text-muted-foreground/50"}>{f.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border-2 border-gold/30 bg-card p-5 ring-1 ring-gold/10">
              <div className="mb-3 flex items-center gap-2">
                <Crown className="h-4 w-4 text-gold" />
                <h3 className="font-semibold">Premium</h3>
              </div>
              <ul className="space-y-2.5">
                {premiumFeatures.map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-[13px]">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="section-separator" />

      {/* PRICING */}
      <section id="pricing" className="scroll-mt-20 py-16 md:py-20">
        <div className="container max-w-3xl">
          <h2 className="mb-10 text-center font-heading text-2xl font-bold md:text-3xl">
            Odaberi svoj plan
          </h2>

          <div className="grid gap-5 sm:grid-cols-2">
            {/* Monthly */}
            <div className="flex flex-col rounded-2xl border bg-card p-7 shadow-sm">
              <h3 className="text-sm font-semibold text-muted-foreground">Mjesečno</h3>
              <p className="mt-2 mb-1">
                <span className="font-heading text-4xl font-extrabold">9€</span>
                <span className="ml-1 text-sm text-muted-foreground">/ mjesec</span>
              </p>
              <p className="mb-6 text-xs text-muted-foreground">Bez obaveze, otkaži bilo kada.</p>
              <div className="mt-auto">
                {isPremium ? (
                  <p className="text-center text-sm font-medium text-gold">Aktivan ✓</p>
                ) : (
                  <Button variant="outline" className="w-full rounded-xl" disabled={!user} asChild={!user ? false : undefined}>
                    {user ? "Uskoro dostupno" : <Link to="/login">Prijavi se</Link>}
                  </Button>
                )}
              </div>
            </div>

            {/* Yearly */}
            <div className="relative flex flex-col rounded-2xl border-2 border-gold/40 bg-card p-7 shadow-md ring-2 ring-gold/10">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gold px-4 py-1 text-[11px] font-bold text-[#0B1F3A]">
                Najpopularnije
              </div>
              <h3 className="text-sm font-semibold text-muted-foreground">Godišnje</h3>
              <p className="mt-2 mb-1">
                <span className="font-heading text-4xl font-extrabold">49€</span>
                <span className="ml-1 text-sm text-muted-foreground">/ godina</span>
              </p>
              <p className="mb-6 text-xs text-gold font-medium">Uštedi 59€ godišnje</p>
              <div className="mt-auto">
                {isPremium ? (
                  <p className="text-center text-sm font-medium text-gold">Aktivan ✓</p>
                ) : (
                  <Button className="btn-gold-gradient w-full rounded-xl" disabled={!user} asChild={!user ? false : undefined}>
                    {user ? "Uskoro dostupno" : <Link to="/login">Prijavi se</Link>}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-separator" />

      {/* TRUST */}
      <section className="py-14">
        <div className="container max-w-3xl">
          <div className="grid gap-5 sm:grid-cols-3">
            {trustItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex flex-col items-center rounded-xl border bg-card p-6 text-center shadow-sm">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-gold/10">
                    <Icon className="h-5 w-5 text-gold" />
                  </div>
                  <p className="text-sm font-medium">{item.text}</p>
                </div>
              );
            })}
          </div>
          <LegalDisclaimer />
        </div>
      </section>
    </>
  );
}
