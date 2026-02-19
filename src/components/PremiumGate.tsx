import { Link } from "react-router-dom";
import { Crown, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";

const texts = {
  bs: {
    title: "Ovaj sadržaj je dio BalkanDE Premium.",
    desc: "Otključaj kompletne upute, formulare i ličnu podršku.",
    cta: "Otključaj Premium",
    login: "Prijavi se",
  },
  de: {
    title: "Dieser Inhalt ist Teil von BalkanDE Premium.",
    desc: "Erhalte vollständige Anleitungen, Formulare und persönliche Unterstützung.",
    cta: "Premium freischalten",
    login: "Anmelden",
  },
  en: {
    title: "This content is part of BalkanDE Premium.",
    desc: "Get complete guides, forms, and personal support.",
    cta: "Unlock Premium",
    login: "Sign in",
  },
};

function getLk(lang: string): "bs" | "de" | "en" {
  if (lang === "de") return "de";
  if (lang === "en") return "en";
  return "bs";
}

interface PremiumGateProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function PremiumGate({ children, fallback }: PremiumGateProps) {
  const { isPremium, user } = useAuth();
  const { language } = useLanguage();
  const lk = getLk(language);
  const t = texts[lk];

  if (isPremium) return <>{children}</>;

  return (
    <div className="relative mt-8">
      {/* Blurred preview */}
      {fallback && (
        <div className="pointer-events-none select-none blur-[6px] opacity-40 max-h-48 overflow-hidden" aria-hidden="true">
          {fallback}
        </div>
      )}

      {/* Lock overlay */}
      <div className="relative -mt-4 flex flex-col items-center justify-center rounded-2xl border border-gold/15 bg-gradient-to-b from-muted/60 to-muted/30 px-6 py-12 text-center backdrop-blur-sm">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/10 ring-1 ring-gold/20">
          <Lock className="h-6 w-6 text-gold" />
        </div>
        <p className="mb-1 text-sm font-bold">{t.title}</p>
        <p className="mb-6 max-w-sm text-xs text-muted-foreground">{t.desc}</p>
        <Button className="btn-gold-gradient rounded-xl px-6" asChild>
          <Link to={user ? "/premium" : "/login"}>
            <Crown className="mr-2 h-4 w-4" />
            {user ? t.cta : t.login}
          </Link>
        </Button>
      </div>
    </div>
  );
}
