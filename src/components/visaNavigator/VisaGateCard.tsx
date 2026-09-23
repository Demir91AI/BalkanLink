import { Lock, Crown, CheckCircle2, UserPlus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/contexts/AuthContext";
import { useSubscription } from "@/hooks/useSubscription";
import { useNavigate } from "react-router-dom";
import PlusCtaLabel from "@/components/paywall/PlusCtaLabel";

const BENEFITS = [
  "Kompletan vodič — svaki korak detaljno objašnjen",
  "Tačno koje dokumente pripremiti i gdje ih nabaviti",
  "Adrese ambasada, konzulata i nadležnih institucija",
  "Musterformulari — primjeri pravilno popunjenih zahtjeva",
  "Najčešće greške i kako ih izbjeći",
  "Šta raditi ako viza bude odbijena",
  "Direktni linkovi na zvanične izvore",
];

interface Props {
  routeTitle?: string;
}

/**
 * Premium paywall for Visa Navigator — matches Mutterschaftsgeld style.
 */
export default function VisaGateCard({ routeTitle }: Props) {
  const { user } = useAuth();
  const { isPremium } = useSubscription();
  const navigate = useNavigate();

  if (isPremium) return null;

  const isAnon = !user;
  const title = routeTitle ? `Otključaj ${routeTitle}` : "Otključaj kompletan vodič";

  return (
    <div className="my-6 rounded-2xl border border-[hsl(var(--gold))]/25 bg-white/[0.03] px-6 py-10 shadow-xl backdrop-blur-sm">
      <div className="flex flex-col items-center text-center max-w-md mx-auto gap-5">
        <div className="h-14 w-14 rounded-2xl bg-[hsl(var(--gold))]/10 flex items-center justify-center ring-1 ring-[hsl(var(--gold))]/25">
          <Lock className="h-7 w-7 text-[hsl(var(--gold))]" />
        </div>

        <div>
          <h3 className="text-lg font-bold text-white">{title}</h3>
          <p className="mt-3 text-sm font-semibold text-white/70">Šta dobijaš uz Premium:</p>
        </div>

        <ul className="text-left text-xs text-white/75 space-y-2 w-full">
          {BENEFITS.map((b) => (
            <li key={b} className="flex items-start gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span>{b}</span>
            </li>
          ))}
        </ul>

        <div className="w-full space-y-2 mt-2">
          {isAnon ? (
            <>
              <button
                onClick={() => navigate("/register")}
                className="w-full rounded-full py-3 text-sm font-bold text-white flex items-center justify-center gap-2"
                style={{ background: "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--gold-dark)))" }}
              >
                <UserPlus className="h-4 w-4" />
                Registruj se besplatno
              </button>
              <button
                onClick={() => navigate("/login")}
                className="w-full text-xs text-white/55 hover:text-white/75 transition-colors"
              >
                Već imaš nalog? <span className="underline">Prijavi se</span>
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("/paketi")}
              className="w-full rounded-full py-3 text-sm font-bold text-white flex items-center justify-center gap-2"
              style={{ background: "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--gold-dark)))" }}
            >
              <Crown className="h-4 w-4" />
              <PlusCtaLabel />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
