/**
 * /porezi/dvostruko-domacinstvo (BS) · /sr same slug
 * /hr/porezi/dvostruko-kucanstvo
 * /de/steuern/doppelte-haushaltsfuehrung
 *
 * Doppelte Haushaltsführung (DHF) — edukativni modul.
 *
 * Sadržaj je strogo informativan: objašnjava šta je DHF, ko obično
 * ispunjava uslove, koje kategorije troškova postoje (bez konkretnih
 * iznosa u eurima), koje dokaze treba čuvati i tipične greške.
 *
 * Pravne reference: § 9 Abs. 1 Nr. 5 EStG, R 9.11 LStR, BMF Schreiben
 * 25.11.2020, BFH VI R 39/16, VI R 39/17.
 *
 * Premium-gated kao i wizard. Bez PII-a.
 */
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import {
  Home,
  Crown,
  Lock,
  CheckCircle2,
  AlertTriangle,
  Info,
  FileText,
  ArrowRight,
  ExternalLink,
  Calculator,
} from "lucide-react";

import { SEO } from "@/components/SEO";
import PageNavBar from "@/components/navigation/PageNavBar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { usePremiumAccess } from "@/hooks/usePremiumAccess";
import { useLocalizedNavigate } from "@/hooks/useLocalizedHref";
import { POREZI_HUB_PATH } from "@/lib/porezi-modules";
import { langFromPath } from "@/lib/i18n-paths";
import type { SupportedLanguage } from "@/i18n";

const SUPPORTED: SupportedLanguage[] = ["bs", "de", "hr", "sr"];
const CRITERIA_KEYS = ["c1", "c2", "c3", "c4", "c5"] as const;
const COSTS_KEYS = ["k1", "k2", "k3", "k4", "k5"] as const;
const PROOFS_KEYS = ["p1", "p2", "p3", "p4", "p5"] as const;
const MISTAKES_KEYS = ["m1", "m2", "m3", "m4", "m5"] as const;
const FAQ_KEYS = ["q1", "q2", "q3", "q4"] as const;

export default function PoreziDoppelhaushalt() {
  const { t } = useTranslation("porezi");
  const { pathname } = useLocation();
  const langFromUrl = langFromPath(pathname);
  const lang: SupportedLanguage = SUPPORTED.includes(langFromUrl)
    ? langFromUrl
    : "bs";

  const navigate = useLocalizedNavigate();
  const { isPremium, isLoggedIn } = usePremiumAccess();

  const hubPath = POREZI_HUB_PATH[lang];

  /* ─────────────── Premium gate ─────────────── */
  if (!isPremium) {
    return (
      <>
        <SEO
          title={t("dhf.seo.title")}
          description={t("dhf.seo.description")}
          path="/porezi/dvostruko-domacinstvo"
        />
        <div className="mx-auto max-w-2xl px-4 py-6 pb-28">
          <PageNavBar />
          <Card className="rounded-2xl border border-[hsl(var(--gold))]/30 shadow-sm">
            <CardContent className="p-6 sm:p-8 text-center">
              <Crown className="mx-auto h-10 w-10 text-[hsl(var(--gold))] mb-3" />
              <h1 className="text-xl sm:text-2xl font-bold mb-2">
                {t("dhf.gate.title")}
              </h1>
              <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
                {t("dhf.gate.body")}
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <Button
                  onClick={() => navigate(isLoggedIn ? "/premium" : "/login")}
                  className="btn-gold-gradient rounded-xl px-6"
                >
                  <Lock className="mr-2 h-4 w-4" />
                  {isLoggedIn ? t("dhf.gate.ctaPremium") : t("dhf.gate.ctaLogin")}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate(hubPath)}
                  className="rounded-xl"
                >
                  {t("dhf.gate.ctaBack")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO
        title={t("dhf.seo.title")}
        description={t("dhf.seo.description")}
        path="/porezi/dvostruko-domacinstvo"
      />

      <div className="mx-auto max-w-3xl px-4 py-6 pb-28">
        <PageNavBar />

        {/* Hero */}
        <div className="rounded-2xl bg-[#F5F0E8] p-6 sm:p-8 mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-sm">
              <Home className="h-5 w-5 text-foreground" />
            </div>
            <Badge variant="outline" className="border-[hsl(var(--gold))]/40 text-xs">
              <Crown className="mr-1 h-3 w-3 text-[hsl(var(--gold))]" />
              {t("dhf.hero.badge")}
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
            {t("dhf.hero.title")}
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            {t("dhf.hero.subtitle")}
          </p>
        </div>

        {/* Intro / Šta je DHF */}
        <Section
          icon={<Info className="h-4 w-4" />}
          title={t("dhf.intro.heading")}
        >
          <p className="text-sm text-foreground/90 leading-relaxed mb-2">
            {t("dhf.intro.p1")}
          </p>
          <p className="text-sm text-foreground/90 leading-relaxed">
            {t("dhf.intro.p2")}
          </p>
        </Section>

        {/* Kriteriji */}
        <Section
          icon={<CheckCircle2 className="h-4 w-4 text-emerald-600" />}
          title={t("dhf.criteria.heading")}
        >
          <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
            {t("dhf.criteria.intro")}
          </p>
          <ul className="space-y-2">
            {CRITERIA_KEYS.map((k) => (
              <li
                key={k}
                className="flex items-start gap-2 rounded-lg border border-border bg-background p-3"
              >
                <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-emerald-600" />
                <span className="text-sm text-foreground/90 leading-relaxed">
                  {t(`dhf.criteria.list.${k}`)}
                </span>
              </li>
            ))}
          </ul>
        </Section>

        {/* Kategorije troškova */}
        <Section
          icon={<Calculator className="h-4 w-4 text-blue-600" />}
          title={t("dhf.costs.heading")}
        >
          <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
            {t("dhf.costs.intro")}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {COSTS_KEYS.map((k) => (
              <Card key={k} className="rounded-xl border border-border">
                <CardContent className="p-3">
                  <div className="text-sm font-semibold mb-1">
                    {t(`dhf.costs.list.${k}.title`)}
                  </div>
                  <div className="text-xs text-muted-foreground leading-relaxed">
                    {t(`dhf.costs.list.${k}.desc`)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-3 rounded-lg border border-amber-500/30 bg-amber-500/5 p-3 flex items-start gap-2">
            <Info className="h-4 w-4 mt-0.5 shrink-0 text-amber-600" />
            <p className="text-xs text-foreground/90 leading-relaxed">
              {t("dhf.costs.noNumbersNote")}
            </p>
          </div>
        </Section>

        {/* Dokazi */}
        <Section
          icon={<FileText className="h-4 w-4 text-indigo-600" />}
          title={t("dhf.proofs.heading")}
        >
          <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
            {t("dhf.proofs.intro")}
          </p>
          <ul className="space-y-2">
            {PROOFS_KEYS.map((k) => (
              <li
                key={k}
                className="flex items-start gap-2 rounded-lg border border-border bg-background p-3"
              >
                <FileText className="h-4 w-4 mt-0.5 shrink-0 text-indigo-600" />
                <span className="text-sm text-foreground/90 leading-relaxed">
                  {t(`dhf.proofs.list.${k}`)}
                </span>
              </li>
            ))}
          </ul>
        </Section>

        {/* Najčešće greške */}
        <Section
          icon={<AlertTriangle className="h-4 w-4 text-rose-600" />}
          title={t("dhf.mistakes.heading")}
        >
          <ul className="space-y-2">
            {MISTAKES_KEYS.map((k) => (
              <li
                key={k}
                className="flex items-start gap-2 rounded-lg border border-rose-500/30 bg-rose-500/5 p-3"
              >
                <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0 text-rose-600" />
                <span className="text-sm text-foreground/90 leading-relaxed">
                  {t(`dhf.mistakes.list.${k}`)}
                </span>
              </li>
            ))}
          </ul>
        </Section>

        {/* FAQ */}
        <Section
          icon={<Info className="h-4 w-4" />}
          title={t("dhf.faq.heading")}
        >
          <div className="space-y-3">
            {FAQ_KEYS.map((k) => (
              <div
                key={k}
                className="rounded-xl border border-border bg-background p-3"
              >
                <div className="text-sm font-semibold mb-1">
                  {t(`dhf.faq.list.${k}.q`)}
                </div>
                <div className="text-sm text-muted-foreground leading-relaxed">
                  {t(`dhf.faq.list.${k}.a`)}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Next steps */}
        <div className="rounded-2xl border border-[hsl(var(--gold))]/30 bg-[hsl(var(--gold))]/5 p-5 mb-6">
          <h3 className="text-base font-semibold mb-2">
            {t("dhf.nextSteps.heading")}
          </h3>
          <p className="text-sm text-foreground/90 mb-3 leading-relaxed">
            {t("dhf.nextSteps.body")}
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              onClick={() => navigate(hubPath)}
              variant="outline"
              className="rounded-xl"
            >
              {t("dhf.nextSteps.ctaHub")}
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-xl"
            >
              <a
                href="https://www.elster.de/eportal/start"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("dhf.nextSteps.ctaElster")}
                <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
              </a>
            </Button>
          </div>
        </div>

        {/* Legal */}
        <div className="rounded-xl border border-border bg-muted/40 p-4 text-xs text-muted-foreground">
          <p className="font-semibold text-foreground mb-1">
            {t("dhf.legal.heading")}
          </p>
          <p className="leading-relaxed mb-2">{t("dhf.legal.body")}</p>
          <p className="leading-relaxed opacity-80">{t("dhf.legal.sources")}</p>
        </div>
      </div>
    </>
  );
}

function Section({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-6">
      <h2 className={cn("text-base sm:text-lg font-semibold mb-3 flex items-center gap-2")}>
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-muted">
          {icon}
        </span>
        {title}
      </h2>
      {children}
    </section>
  );
}
