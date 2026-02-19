import { Check, Star, Shield, Zap, MessageCircle, FileText, Clock, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import LegalDisclaimer from "@/components/LegalDisclaimer";

const texts = {
  bs: {
    hero: "BalkanDE Premium",
    heroSub: "Otključaj sve alate i sadržaje za jednostavniji život u Njemačkoj.",
    price: "30",
    currency: "€",
    once: "jednokratno",
    cta: "Premium aktivirati",
    ctaSoon: "Uskoro dostupno",
    login: "Prijavi se da aktiviraš Premium",
    alreadyPremium: "Već imaš Premium pristup ✓",
    features: [
      { icon: BookOpen, text: "Detaljne Schritt-für-Schritt upute za sve procese" },
      { icon: FileText, text: "Formularhilfe – objašnjenje polje po polje" },
      { icon: Shield, text: "Pravni detalji, rokovi i prigovori" },
      { icon: Zap, text: "Checklisten & Downloads (PDF)" },
      { icon: MessageCircle, text: "Neograničen AI Chat s personaliziranim odgovorima" },
      { icon: Clock, text: "Prioritetna podrška" },
    ],
    freeTitle: "Free",
    freeDesc: "Za sve korisnike",
    premiumTitle: "Premium",
    premiumDesc: "Puni pristup",
    freeFeatures: [
      "Osnovne informacije i pregled",
      "Kategorije & navigacija",
      "Community pregled",
      "Ograničen Chat",
    ],
  },
  de: {
    hero: "BalkanDE Premium",
    heroSub: "Schalte alle Tools und Inhalte für ein einfacheres Leben in Deutschland frei.",
    price: "30",
    currency: "€",
    once: "einmalig",
    cta: "Premium aktivieren",
    ctaSoon: "Bald verfügbar",
    login: "Melde dich an, um Premium zu aktivieren",
    alreadyPremium: "Du hast bereits Premium-Zugang ✓",
    features: [
      { icon: BookOpen, text: "Detaillierte Schritt-für-Schritt-Anleitungen" },
      { icon: FileText, text: "Formularhilfe – Feld für Feld erklärt" },
      { icon: Shield, text: "Rechtliche Details, Fristen & Widerspruch" },
      { icon: Zap, text: "Checklisten & Downloads (PDF)" },
      { icon: MessageCircle, text: "Unbegrenzter AI-Chat mit personalisierten Antworten" },
      { icon: Clock, text: "Prioritäts-Support" },
    ],
    freeTitle: "Free",
    freeDesc: "Für alle Nutzer",
    premiumTitle: "Premium",
    premiumDesc: "Voller Zugang",
    freeFeatures: [
      "Grundlegende Informationen & Überblick",
      "Kategorien & Navigation",
      "Community-Übersicht",
      "Eingeschränkter Chat",
    ],
  },
  en: {
    hero: "BalkanDE Premium",
    heroSub: "Unlock all tools and content for an easier life in Germany.",
    price: "30",
    currency: "€",
    once: "one-time",
    cta: "Activate Premium",
    ctaSoon: "Coming soon",
    login: "Sign in to activate Premium",
    alreadyPremium: "You already have Premium access ✓",
    features: [
      { icon: BookOpen, text: "Detailed step-by-step guides for all processes" },
      { icon: FileText, text: "Form help – field by field explained" },
      { icon: Shield, text: "Legal details, deadlines & appeals" },
      { icon: Zap, text: "Checklists & Downloads (PDF)" },
      { icon: MessageCircle, text: "Unlimited AI Chat with personalized answers" },
      { icon: Clock, text: "Priority support" },
    ],
    freeTitle: "Free",
    freeDesc: "For all users",
    premiumTitle: "Premium",
    premiumDesc: "Full access",
    freeFeatures: [
      "Basic information & overview",
      "Categories & navigation",
      "Community overview",
      "Limited Chat",
    ],
  },
};

function getLk(lang: string): "bs" | "de" | "en" {
  if (lang === "de") return "de";
  if (lang === "en") return "en";
  return "bs";
}

export default function Premium() {
  const { user, isPremium } = useAuth();
  const { language } = useLanguage();
  const t = texts[getLk(language)];

  return (
    <>
      <section className="border-b bg-primary py-14">
        <div className="container text-center">
          <Star className="mx-auto mb-3 h-8 w-8 text-primary-foreground/80" />
          <h1 className="text-2xl font-bold text-primary-foreground md:text-3xl">{t.hero}</h1>
          <p className="mt-2 text-sm text-primary-foreground/80 md:text-base">{t.heroSub}</p>
        </div>
      </section>

      <section className="py-14">
        <div className="container max-w-4xl">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Free */}
            <div className="rounded-xl border bg-card p-8 shadow-sm">
              <h2 className="text-lg font-bold">{t.freeTitle}</h2>
              <p className="mb-1 text-xs text-muted-foreground">{t.freeDesc}</p>
              <p className="mb-6 text-3xl font-extrabold">0{t.currency}</p>
              <ul className="space-y-3">
                {t.freeFeatures.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Premium */}
            <div className="rounded-xl border-2 border-primary bg-card p-8 shadow-md ring-2 ring-primary/10">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-bold">{t.premiumTitle}</h2>
              </div>
              <p className="mb-1 text-xs text-muted-foreground">{t.premiumDesc}</p>
              <p className="mb-6">
                <span className="text-3xl font-extrabold">{t.price}{t.currency}</span>
                <span className="ml-2 text-sm text-muted-foreground">{t.once}</span>
              </p>
              <ul className="mb-8 space-y-3">
                {t.features.map((f, i) => {
                  const Icon = f.icon;
                  return (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{f.text}</span>
                    </li>
                  );
                })}
              </ul>

              {isPremium ? (
                <p className="text-center text-sm font-medium text-primary">{t.alreadyPremium}</p>
              ) : user ? (
                <Button size="lg" className="w-full" disabled>
                  {t.ctaSoon}
                </Button>
              ) : (
                <Button size="lg" className="w-full" asChild>
                  <Link to="/login">{t.login}</Link>
                </Button>
              )}
            </div>
          </div>

          <LegalDisclaimer />
        </div>
      </section>
    </>
  );
}
