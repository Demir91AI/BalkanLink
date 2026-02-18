import { Link } from "react-router-dom";
import { Crown, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";

const texts = {
  bs: {
    title: "Ovaj sadržaj je dio BalkanDE Premium.",
    desc: "Otključaj kompletne upute, formulare i ličnu podršku.",
    cta: "Premium aktivirati",
    login: "Prijavi se",
  },
  de: {
    title: "Dieser Inhalt ist Teil von BalkanDE Premium.",
    desc: "Erhalte vollständige Anleitungen, Formulare und persönliche Unterstützung.",
    cta: "Premium aktivieren",
    login: "Anmelden",
  },
  en: {
    title: "This content is part of BalkanDE Premium.",
    desc: "Get complete guides, forms, and personal support.",
    cta: "Activate Premium",
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
  /** If true, content is shown. If false, the gate overlay is shown. */
  fallback?: React.ReactNode;
}

export default function PremiumGate({ children, fallback }: PremiumGateProps) {
  const { isPremium, user } = useAuth();
  const { language } = useLanguage();
  const lk = getLk(language);
  const t = texts[lk];

  if (isPremium) return <>{children}</>;

  return (
    <div className="relative mt-6">
      {/* Blurred preview of first bit of content */}
      {fallback && (
        <div className="pointer-events-none select-none blur-sm opacity-50 max-h-40 overflow-hidden">
          {fallback}
        </div>
      )}
      {/* Overlay */}
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-primary/20 bg-muted/50 px-6 py-10 text-center">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <Lock className="h-5 w-5 text-primary" />
        </div>
        <p className="mb-1 text-sm font-semibold">{t.title}</p>
        <p className="mb-5 max-w-sm text-xs text-muted-foreground">{t.desc}</p>
        <Button asChild size="sm">
          <Link to={user ? "/premium" : "/login"}>
            <Crown className="mr-2 h-4 w-4" />
            {user ? t.cta : t.login}
          </Link>
        </Button>
      </div>
    </div>
  );
}
