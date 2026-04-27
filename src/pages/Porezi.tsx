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
import { Link } from "react-router-dom";
import { Crown, Lock, ArrowRight, Calculator } from "lucide-react";

import { SEO } from "@/components/SEO";
import PageNavBar from "@/components/navigation/PageNavBar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import {
  POREZI_MODULES,
  POREZI_HUB_PATH,
  type PoreziModule,
} from "@/lib/porezi-modules";
import { usePremiumAccess } from "@/hooks/usePremiumAccess";
import { useLocalizedHref, useLocalizedNavigate } from "@/hooks/useLocalizedHref";
import type { SupportedLanguage } from "@/i18n";

const SUPPORTED: SupportedLanguage[] = ["bs", "de", "hr", "sr"];

export default function Porezi() {
  const { t, i18n } = useTranslation("porezi");
  const localize = useLocalizedHref();
  const navigate = useLocalizedNavigate();
  const { isPremium, isLoggedIn } = usePremiumAccess();

  const raw = (i18n.language ?? "bs").split("-")[0];
  const lang = (SUPPORTED.includes(raw as SupportedLanguage) ? raw : "bs") as SupportedLanguage;

  const wizardModule = POREZI_MODULES.find((m) => m.id === "wizard");
  const wizardPath = wizardModule?.routes[lang] ?? "/porezi/da-li-moram";

  const handleModuleClick = (m: PoreziModule) => {
    if (m.status !== "available") return;
    const path = m.routes[lang];
    if (!path) return;

    // Premium gate: not premium → bounce to /premium (or /login first).
    if (!isPremium) {
      navigate(isLoggedIn ? "/premium" : "/login");
      return;
    }
    navigate(path);
  };

  const handleHeroCTA = () => {
    if (!isPremium) {
      navigate(isLoggedIn ? "/premium" : "/login");
      return;
    }
    navigate(wizardPath);
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

        {/* Hero */}
        <div className="rounded-2xl bg-[#F5F0E8] p-6 sm:p-8 mb-6 text-center">
          <Calculator className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
          <Badge variant="outline" className="mb-3 border-[hsl(var(--gold))]/40 text-xs">
            <Crown className="mr-1 h-3 w-3 text-[hsl(var(--gold))]" />
            {t("hero.badge")}
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
            {t("hero.title")}
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto mb-5">
            {t("hero.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Button
              onClick={handleHeroCTA}
              className="btn-gold-gradient rounded-xl px-6 shadow-md"
            >
              {t("hero.ctaPrimary")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              asChild
              className="rounded-xl"
            >
              <a href="#modules">{t("hero.ctaSecondary")}</a>
            </Button>
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

        {/* Modules grid */}
        <section id="modules" className="mb-10">
          <h2 className="text-lg font-semibold mb-4">{t("modulesHeading")}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {POREZI_MODULES.map((m) => {
              const Icon = m.icon;
              const isAvailable = m.status === "available";
              const title = t(`modules.${m.id}.title`);
              const desc = t(`modules.${m.id}.desc`);

              return (
                <Card
                  key={m.id}
                  onClick={() => handleModuleClick(m)}
                  className={cn(
                    "border-l-4 transition-all",
                    m.accent,
                    isAvailable
                      ? "cursor-pointer hover:shadow-md hover:-translate-y-0.5"
                      : "opacity-60 cursor-not-allowed",
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
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted">
                        <Icon className="h-5 w-5 text-foreground" />
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
                          {isAvailable && (
                            <Badge
                              variant="outline"
                              className="text-[10px] px-1.5 py-0 border-[hsl(var(--gold))]/40 text-[hsl(var(--gold))]"
                            >
                              {!isPremium && <Lock className="mr-0.5 h-2.5 w-2.5" />}
                              {t("premiumBadge")}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {desc}
                        </p>
                        {isAvailable && (
                          <div className="mt-2 inline-flex items-center text-xs font-medium text-foreground">
                            {t("openModule")}
                            <ArrowRight className="ml-1 h-3 w-3" />
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

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
