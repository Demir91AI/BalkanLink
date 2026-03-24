import { Lock, Crown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const includedForms = [
  "Kindergeld", "Wohngeld", "Anmeldung", "Bürgergeld",
  "Elterngeld", "BAföG", "Arbeitslosengeld",
];

interface FormPaywallProps {
  formLabel: string;
}

export default function FormPaywall({ formLabel }: FormPaywallProps) {
  const { user } = useAuth();

  return (
    <div className="relative mt-8">
      {/* Blurred preview hint */}
      <div className="pointer-events-none select-none blur-[6px] opacity-30 max-h-32 overflow-hidden" aria-hidden="true">
        <div className="space-y-3">
          <div className="h-3 w-3/4 rounded bg-muted-foreground/20" />
          <div className="h-3 w-1/2 rounded bg-muted-foreground/20" />
          <div className="h-3 w-2/3 rounded bg-muted-foreground/20" />
          <div className="h-3 w-1/3 rounded bg-muted-foreground/20" />
        </div>
      </div>

      {/* Lock overlay */}
      <div className="relative -mt-8 flex flex-col items-center rounded-2xl border border-gold/20 bg-gradient-to-b from-muted/70 to-muted/30 px-6 py-10 text-center backdrop-blur-sm">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/10 ring-1 ring-gold/20">
          <Lock className="h-6 w-6 text-gold" />
        </div>

        <h3 className="mb-1 text-base font-bold">Smart Guide – korak po korak</h3>
        <p className="mb-6 max-w-md text-xs text-muted-foreground">
          Riješi formular bez grešaka uz vođeni vodič sa detaljnim objašnjenjima svakog polja.
        </p>

        {/* Pricing options */}
        <div className="grid w-full max-w-md gap-3 sm:grid-cols-2">
          {/* Single form */}
          <div className="rounded-xl border border-border/60 bg-card p-4 text-left">
            <p className="text-lg font-extrabold text-foreground">3.99€</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Pristup samo ovom formularu
            </p>
          </div>

          {/* All forms */}
          <div className="rounded-xl border-2 border-gold/40 bg-gold/5 p-4 text-left relative">
            <span className="absolute -top-2.5 right-3 rounded-full bg-gold px-2.5 py-0.5 text-[10px] font-bold text-gold-foreground">
              POPULARAN
            </span>
            <p className="text-lg font-extrabold text-foreground">9.99€</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Pristup svim formularima na 30 dana
            </p>
            <ul className="mt-3 space-y-1">
              {includedForms.map((f) => (
                <li key={f} className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <Check className="h-3 w-3 text-gold shrink-0" /> {f}
                </li>
              ))}
              <li className="text-[11px] text-muted-foreground pl-[18px]">
                i još 30+ formulara
              </li>
            </ul>
          </div>
        </div>

        <Button className="btn-gold-gradient mt-6 rounded-xl px-8" asChild>
          <Link to={user ? "/premium" : "/login"}>
            <Crown className="mr-2 h-4 w-4" />
            Otključaj odmah
          </Link>
        </Button>
      </div>
    </div>
  );
}
