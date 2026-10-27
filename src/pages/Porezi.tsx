/**
 * /porezi (Tax Department Hub)
 *
 * Mirrored on /de/steuern, /hr/porezi, /sr/porezi via the LocalizedRoutes
 * mounted in App.tsx (one component, four URL prefixes — language is
 * detected from the path).
 *
 * Landing is FREE (publicly visible). Module cards themselves are PREMIUM —
 * clicking an "available" card while not premium navigates to /premium.
 * "coming-soon" cards are visually disabled and not clickable.
 *
 * No PII is collected on this page; it is purely informational.
 */
import { useTranslation } from "react-i18next";
import {
  Lock,
  ArrowRight,
  Calculator,
  ShieldCheck,
  CalendarCheck,
  Sparkles,
} from "lucide-react";

import { SEO } from "@/components/SEO";
import PageNavBar from "@/components/navigation/PageNavBar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import {
  POREZI_MODULES,
  type PoreziModule,
} from "@/lib/porezi-modules";
import { usePremiumAccess } from "@/hooks/usePremiumAccess";
import { useLocalizedNavigate } from "@/hooks/useLocalizedHref";
import type { SupportedLanguage } from "@/i18n";

const SUPPORTED: SupportedLanguage[] = ["bs", "de", "hr", "sr"];

export default function Porezi() {
  const { t, i18n } = useTranslation("porezi");
  const navigate = useLocalizedNavigate();
  const { isPremium, isLoggedIn } = usePremiumAccess();

  const raw = (i18n.language ?? "bs").split("-")[0];
  const lang = (SUPPORTED.includes(raw as SupportedLanguage) ? raw : "bs") as SupportedLanguage;

  const wizardModule = POREZI_MODULES.find((m) => m.id === "wizard");
  const wizardPath = wizardModule?.routes[lang] ?? "/porezi/da-li-moram";

  const availableModules = POREZI_MODULES.filter((m) => m.status === "available");
  const comingSoonModules = POREZI_MODULES.filter((m) => m.status === "coming-soon");

  const handleModuleClick = (m: PoreziModule) => {
    if (m.status !== "available") return;
    const path = m.routes[lang];
    if (!path) return;

    if (!isPremium) {
      navigate(isLoggedIn ? "/paketi" : "/register");
      return;
    }
    navigate(path);
  };

  const handleHeroCTA = () => {
    if (!isPremium) {
      navigate(isLoggedIn ? "/paketi" : "/register");
      return;
    }
    navigate(wizardPath);
  };

  const renderCard = (m: PoreziModule) => {
    const Icon = m.icon;
    const isAvailable = m.status === "available";
    const title = t(`modules.${m.id}.title`);
    const desc = t(`modules.${m.id}.desc`);

    return (
      <Card
        key={m.id}
        onClick={() => handleModuleClick(m)}
        className={cn(
          "relative border-l-4 transition-all overflow-hidden group",
          m.accent,
          isAvailable
            ? "cursor-pointer hover:shadow-lg hover:-translate-y-0.5 bg-card"
            : "opacity-70 cursor-not-allowed bg-muted/30",
        )}
        role={isAvailable ? "button" : undefined}
        tabIndex={isAvailable ? 0 : -1}
        onKeyDown={(e) => {
          if (!isAvailable) return;
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleModuleClick(m);
          }
        }}
        aria-disabled={!isAvailable}
      >
        <CardContent className="p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <div
              className={cn(
                "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors",
                isAvailable
                  ? "bg-[hsl(var(--gold))]/10 text-[hsl(var(--gold))] group-hover:bg-[hsl(var(--gold))]/20"
                  : "bg-muted text-muted-foreground",
              )}
            >
              <Icon className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h3 className="text-sm font-semibold leading-tight">
                  {title}
                </h3>
                {!isAvailable && (
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                    {t("comingSoonBadge")}
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {desc}
              </p>
              {isAvailable && (
                <div className="mt-3 inline-flex items-center text-xs font-semibold text-[hsl(var(--gold))] group-hover:translate-x-0.5 transition-transform">
                  {t("openModule")}
                  <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <>
      <SEO
        title={t("seo.title")}
        description={t("seo.description")}
        path="/porezi"
      />

      <div className="mx-auto max-w-3xl px-4 py-6 pb-28">
        <PageNavBar />

        {/* Hero — premium feel */}
        <div className="relative rounded-3xl bg-gradient-to-br from-[#F5F0E8] via-[#FAF6EE] to-[#F0E9D8] p-6 sm:p-10 mb-6 text-center overflow-hidden border border-[hsl(var(--gold))]/20">
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
               style={{ backgroundImage: "radial-gradient(circle at 20% 20%, hsl(var(--gold)) 0, transparent 50%), radial-gradient(circle at 80% 80%, hsl(var(--gold)) 0, transparent 50%)" }} />
          <div className="relative">
            <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[hsl(var(--gold))]/15 mb-4">
              <Calculator className="h-7 w-7 text-[hsl(var(--gold))]" />
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold mb-3 tracking-tight">
              {t("hero.title")}
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto mb-6 text-sm sm:text-base leading-relaxed">
              {t("hero.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <Button
                onClick={handleHeroCTA}
                size="lg"
                className="btn-gold-gradient rounded-xl px-7 shadow-md font-semibold"
              >
                {!isPremium && <Lock className="mr-2 h-4 w-4" />}
                {t("hero.ctaPrimary")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                asChild
                size="lg"
                className="rounded-xl bg-white/70"
              >
                <a href="#modules">{t("hero.ctaSecondary")}</a>
              </Button>
            </div>

            {/* Trust strip */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] sm:text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <CalendarCheck className="h-3.5 w-3.5 text-[hsl(var(--gold))]" />
                {t("hero.trust1")}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-[hsl(var(--gold))]" />
                {t("hero.trust2")}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-[hsl(var(--gold))]" />
                {t("hero.trust3")}
              </span>
            </div>
          </div>
        </div>

        {/* Intro */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-2">{t("intro.heading")}</h2>
          <p className="text-sm text-muted-foreground mb-2 leading-relaxed">
            {t("intro.p1")}
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {t("intro.p2")}
          </p>
        </section>

        {/* Available now */}
        <section id="modules" className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              {t("availableNow")}
            </h2>
            <span className="text-xs text-muted-foreground">{availableModules.length}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {availableModules.map(renderCard)}
          </div>
        </section>

        {/* Coming soon — hidden when nothing is pending */}
        {comingSoonModules.length > 0 && (
          <section className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-muted-foreground">
                {t("comingSoonHeading")}
              </h2>
              <span className="text-xs text-muted-foreground">{comingSoonModules.length}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {comingSoonModules.map(renderCard)}
            </div>
          </section>
        )}

        {/* Legal notice */}
        <section className="rounded-xl border border-border bg-muted/40 p-4 text-xs text-muted-foreground">
          <p className="font-semibold text-foreground mb-1">
            {t("legal.heading")}
          </p>
          <p className="mb-2 leading-relaxed">{t("legal.body")}</p>
          <p className="leading-relaxed opacity-80">{t("legal.sources")}</p>
        </section>
      </div>
    </>
  );
}
