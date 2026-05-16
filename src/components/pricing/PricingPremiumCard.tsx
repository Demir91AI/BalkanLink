import { Check, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { STRIPE_PRICE_IDS } from "@/lib/stripe";

interface Props {
  yearly: boolean;
  isPremium: boolean;
  onCheckout: (priceId: string, mode: "subscription" | "payment") => void;
}

export default function PricingPremiumCard({ yearly, isPremium, onCheckout }: Props) {
  return (
    <div className="relative rounded-2xl border-2 border-[hsl(var(--gold))] bg-card p-6 flex flex-col shadow-lg">
      <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[hsl(var(--gold))] px-3 py-1 text-[10px] font-bold text-white whitespace-nowrap">
        NAJPOPULARNIJE
      </span>
      <div className="flex items-center justify-between gap-2 mt-2">
        <h2 className="text-lg font-bold">Premium</h2>
        <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 whitespace-nowrap">
          🎁 7 dana free
        </span>
      </div>
      <p className="mt-1 text-3xl font-bold">
        {yearly ? "99,90€" : "9,99€"}
        <span className="text-sm font-normal text-muted-foreground">
          /{yearly ? "god." : "mj."}
        </span>
      </p>
      <p className="text-xs text-muted-foreground mb-1">
        {yearly ? "8,33€/mj. — uštedi 20€" : "Otkaži u bilo kojem trenutku"}
      </p>
      <p className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 mb-6">
        Probaj 7 dana besplatno — samo danas
      </p>

      <div className="flex-1 space-y-4 text-sm">
        <Category icon="📋" title="FORMULARI">
          <Ft>Svi Musterformulari — uključeni bez doplate</Ft>
          <Ft>Smart Guide za svaki formular</Ft>
          <Ft>Tačna uputstva šta upisati u svako polje</Ft>
          <Ft>25+ formulara: Bürgergeld, Kindergeld, Elterngeld i još 20+</Ft>
        </Category>

        <Category icon="✈️" title="VIZA NAVIGATOR">
          <Ft>Kompletni vodiči za sve tipove viza</Ft>
          <Ft>Dokumenti, rokovi, adrese ureda</Ft>
          <Ft>Savjeti za termin + Vorabzustimmung</Ft>
          <Ft>Sve balkanske države</Ft>
        </Category>

        <Category icon="🤖" title="BALKANLINK ASISTENT">
          <Ft>Neograničena pitanja</Ft>
          <Ft>Personalizirani savjeti za tvoju situaciju</Ft>
        </Category>

        <Category icon="🔍" title="DOKUMENTEN-CHECK">
          <Ft>5 provjera dokumenata dnevno gratis</Ft>
          <Ft>Dodatne provjere isti dan — 2,99€/kom</Ft>
          <Ft>Objašnjenje na tvom jeziku</Ft>
        </Category>

        <Category icon="🇩🇪" title="DEUTSCH TRAINER">
          <Ft>240 lekcija (40 po nivou, A1–C2)</Ft>
          <Ft>500 zadataka po stageu (AI-generisano)</Ft>
          <Ft>Sprachassistent — 500 rečenica</Ft>
          <Ft>Završi A1–C2 → Amazon Wertgutschein 30€</Ft>
        </Category>

        <Category icon="✉️" title="ŠABLONI / VORLAGEN">
          <Ft>Svi šabloni + PDF download</Ft>
          <Ft>Bewerbungsschreiben, Lebenslauf i još 10+</Ft>
        </Category>

        <Category icon="📢" title="PRO OGLASI">
          <Ft>Besplatno postavljanje oglasa</Ft>
          <Ft>Trajanje oglasa: max 10 dana</Ft>
        </Category>
      </div>

      <Button
        className="mt-6 w-full rounded-xl bg-[hsl(var(--gold))] text-sm font-bold text-white hover:bg-[hsl(var(--gold-light))] h-11 text-base"
        onClick={() =>
          onCheckout(
            yearly ? STRIPE_PRICE_IDS.PREMIUM_YEARLY : STRIPE_PRICE_IDS.PREMIUM_MONTHLY,
            "subscription"
          )
        }
      >
        <Crown className="mr-2 h-4 w-4" />
        {isPremium ? "Promijeni plan" : "Aktiviraj Premium →"}
      </Button>

      {!yearly && (
        <>
          <p className="mt-2 text-center text-[11px] text-muted-foreground">
            ili 99,90€/godišnje — uštedi 2 mjeseca
          </p>
          <Button
            variant="outline"
            className="mt-1.5 w-full rounded-xl border-[hsl(var(--gold))]/30 text-[hsl(var(--gold))] hover:bg-[hsl(var(--gold))]/10 text-xs h-9"
            onClick={() => onCheckout(STRIPE_PRICE_IDS.PREMIUM_YEARLY, "subscription")}
          >
            Godišnji plan →
          </Button>
        </>
      )}

      <p className="mt-2 text-center text-[10px] text-muted-foreground">
        §19 UStG — bez PDV-a
      </p>
    </div>
  );
}

function Category({ icon, title, children }: { icon: string; title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="font-bold text-xs text-foreground mb-1.5">{icon} {title}</p>
      <ul className="space-y-1.5">{children}</ul>
    </div>
  );
}

function Ft({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2 text-xs">
      <span className="mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-[hsl(var(--success))]/10">
        <Check className="h-2.5 w-2.5 text-[hsl(var(--success))]" />
      </span>
      {children}
    </li>
  );
}
