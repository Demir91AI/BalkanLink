/**
 * Reusable shell for an educational Porezi module.
 *
 * Pages pass an `id` (matches i18n namespace `porezi:<id>.*`) and the
 * lengths of each section. The component pulls all copy from i18n
 * using stable keys so translations stay flat per-module.
 *
 * Premium-gated. No PII collected. Checklist is local-only.
 */
import { type ComponentType, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import {
  Crown,
  Lock,
  CheckCircle2,
  AlertTriangle,
  Info,
  FileText,
  ArrowRight,
  ExternalLink,
  Calculator,
  ListChecks,
  RotateCcw,
  Euro,
  ListOrdered,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

import { SEO } from "@/components/SEO";
import PageNavBar from "@/components/navigation/PageNavBar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

import { usePremiumAccess } from "@/hooks/usePremiumAccess";
import { useLocalizedNavigate } from "@/hooks/useLocalizedHref";
import { POREZI_HUB_PATH } from "@/lib/porezi-modules";
import { langFromPath } from "@/lib/i18n-paths";
import type { SupportedLanguage } from "@/i18n";
import { usePoreziChecklist } from "./usePoreziChecklist";

const SUPPORTED: SupportedLanguage[] = ["bs", "de", "hr", "sr"];

export interface PoreziModuleConfig {
  /** Stable id, used for i18n key prefix and checklist storage. */
  id: string;
  /** Hero icon. */
  icon: LucideIcon;
  /** Path passed to <SEO /> for canonical. */
  seoPath: string;
  /** Number of items in each i18n list. Pass 0 to hide a section. */
  counts: {
    intro?: number; // p1, p2, ...
    criteria?: number; // c1..cN
    amounts?: number; // a1..aN  (label + value + note)  ← NEW: 2026 iznosi/pauschali
    costs?: number; // k1..kN  (uses .title and .desc)
    steps?: number; // s1..sN  (title + body + zeile/anlage) ← NEW: ELSTER walkthrough
    example?: boolean; // ← NEW: realan primjer popunjavanja (intro + 1..N rows + result)
    exampleRows?: number; // r1..rN  (label + value)
    proofs?: number; // p1..pN  (also serves as checklist source)
    mistakes?: number; // m1..mN
    faq?: number; // q1..qN  (uses .q and .a)
  };
  /** Optional next-step link out (e.g. ELSTER). */
  externalLink?: { href: string; labelKey?: string };
}

export function PoreziModuleTemplate({ config }: { config: PoreziModuleConfig }) {
  const { t } = useTranslation("porezi");
  const { pathname } = useLocation();
  const langFromUrl = langFromPath(pathname);
  const lang: SupportedLanguage = SUPPORTED.includes(langFromUrl)
    ? langFromUrl
    : "bs";

  const navigate = useLocalizedNavigate();
  const { isPremium, isLoggedIn } = usePremiumAccess();
  const hubPath = POREZI_HUB_PATH[lang];

  const { id, icon: Icon, seoPath, counts, externalLink } = config;
  const k = (suffix: string) => `${id}.${suffix}`;

  /* ─────────────── Premium gate ─────────────── */
  if (!isPremium) {
    return (
      <>
        <SEO
          title={t(k("seo.title"))}
          description={t(k("seo.description"))}
          path={seoPath}
        />
        <div className="mx-auto max-w-2xl px-4 py-6 pb-28">
          <PageNavBar  showShare />
          <Card className="rounded-2xl border border-[hsl(var(--gold))]/30 shadow-sm">
            <CardContent className="p-6 sm:p-8 text-center">
              <Crown className="mx-auto h-10 w-10 text-[hsl(var(--gold))] mb-3" />
              <h1 className="text-xl sm:text-2xl font-bold mb-2">
                {t(k("gate.title"))}
              </h1>
              <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
                {t(k("gate.body"))}
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <Button
                  onClick={() => navigate(isLoggedIn ? "/paketi" : "/register")}
                  className="btn-gold-gradient rounded-xl px-6"
                >
                  <Lock className="mr-2 h-4 w-4" />
                  {isLoggedIn ? t(k("gate.ctaPremium")) : t(k("gate.ctaLogin"))}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate(hubPath)}
                  className="rounded-xl"
                >
                  {t(k("gate.ctaBack"))}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  /* ─────────────── Helpers ─────────────── */
  const introKeys = range(counts.intro ?? 0, "p");
  const criteriaKeys = range(counts.criteria ?? 0, "c");
  const amountsKeys = range(counts.amounts ?? 0, "a");
  const costsKeys = range(counts.costs ?? 0, "k");
  const stepsKeys = range(counts.steps ?? 0, "s");
  const exampleRowKeys = range(counts.exampleRows ?? 0, "r");
  const proofsKeys = range(counts.proofs ?? 0, "p");
  const mistakesKeys = range(counts.mistakes ?? 0, "m");
  const faqKeys = range(counts.faq ?? 0, "q");

  return (
    <>
      <SEO
        title={t(k("seo.title"))}
        description={t(k("seo.description"))}
        path={seoPath}
      />

      <div className="mx-auto max-w-3xl px-4 py-6 pb-28">
        <PageNavBar  showShare />

        {/* Hero */}
        <div className="rounded-2xl bg-[#F5F0E8] p-6 sm:p-8 mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-sm">
              <Icon className="h-5 w-5 text-foreground" />
            </div>
            <Badge variant="outline" className="border-[hsl(var(--gold))]/40 text-xs">
              <Crown className="mr-1 h-3 w-3 text-[hsl(var(--gold))]" />
              {t(k("hero.badge"))}
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
            {t(k("hero.title"))}
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            {t(k("hero.subtitle"))}
          </p>
        </div>

        {/* Intro */}
        {introKeys.length > 0 && (
          <Section icon={<Info className="h-4 w-4" />} title={t(k("intro.heading"))}>
            {introKeys.map((key) => (
              <p
                key={key}
                className="text-sm text-foreground/90 leading-relaxed mb-2 last:mb-0"
              >
                {t(k(`intro.${key}`))}
              </p>
            ))}
          </Section>
        )}

        {/* Criteria */}
        {criteriaKeys.length > 0 && (
          <Section
            icon={<CheckCircle2 className="h-4 w-4 text-emerald-600" />}
            title={t(k("criteria.heading"))}
          >
            <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
              {t(k("criteria.intro"))}
            </p>
            <ul className="space-y-2">
              {criteriaKeys.map((key) => (
                <li
                  key={key}
                  className="flex items-start gap-2 rounded-lg border border-border bg-background p-3"
                >
                  <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-emerald-600" />
                  <span className="text-sm text-foreground/90 leading-relaxed">
                    {t(k(`criteria.list.${key}`))}
                  </span>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* Amounts (2026 paušali / iznosi sa izvorom) */}
        {amountsKeys.length > 0 && (
          <Section
            icon={<Euro className="h-4 w-4 text-emerald-700" />}
            title={t(k("amounts.heading"))}
          >
            <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
              {t(k("amounts.intro"))}
            </p>
            <div className="overflow-hidden rounded-xl border border-emerald-600/20 divide-y divide-emerald-600/10">
              {amountsKeys.map((key) => (
                <div key={key} className="grid grid-cols-12 gap-2 bg-emerald-50/40 p-3">
                  <div className="col-span-12 sm:col-span-7 text-sm font-medium text-foreground/90 leading-relaxed">
                    {t(k(`amounts.list.${key}.label`))}
                  </div>
                  <div className="col-span-12 sm:col-span-5 sm:text-right">
                    <div className="text-sm font-bold text-emerald-800">
                      {t(k(`amounts.list.${key}.value`))}
                    </div>
                    <div className="text-[11px] text-muted-foreground leading-snug">
                      {t(k(`amounts.list.${key}.note`))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-2 text-[11px] text-muted-foreground italic leading-relaxed">
              {t(k("amounts.disclaimer"))}
            </p>
          </Section>
        )}

        {/* Costs (title + desc cards) */}
        {costsKeys.length > 0 && (
          <Section
            icon={<Calculator className="h-4 w-4 text-blue-600" />}
            title={t(k("costs.heading"))}
          >
            <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
              {t(k("costs.intro"))}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {costsKeys.map((key) => (
                <Card key={key} className="rounded-xl border border-border">
                  <CardContent className="p-3">
                    <div className="text-sm font-semibold mb-1">
                      {t(k(`costs.list.${key}.title`))}
                    </div>
                    <div className="text-xs text-muted-foreground leading-relaxed">
                      {t(k(`costs.list.${key}.desc`))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-3 rounded-lg border border-amber-500/30 bg-amber-500/5 p-3 flex items-start gap-2">
              <Info className="h-4 w-4 mt-0.5 shrink-0 text-amber-600" />
              <p className="text-xs text-foreground/90 leading-relaxed">
                {t(k("costs.noNumbersNote"))}
              </p>
            </div>
          </Section>
        )}

        {/* Proofs / Checklist */}
        {proofsKeys.length > 0 && (
          <ChecklistSection
            moduleId={id}
            keys={proofsKeys}
            title={t(k("proofs.heading"))}
            intro={t(k("proofs.intro"))}
            label={(key) => t(k(`proofs.list.${key}`))}
            doneLabel={t("checklist.done")}
            resetLabel={t("checklist.reset")}
            progressLabel={(done, total) =>
              t("checklist.progress", { done, total })
            }
          />
        )}

        {/* Steps — ELSTER walkthrough korak-po-korak (Anlage / Zeile reference) */}
        {stepsKeys.length > 0 && (
          <Section
            icon={<ListOrdered className="h-4 w-4 text-indigo-700" />}
            title={t(k("steps.heading"))}
          >
            <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
              {t(k("steps.intro"))}
            </p>
            <ol className="space-y-2.5">
              {stepsKeys.map((key, idx) => (
                <li
                  key={key}
                  className="rounded-xl border border-indigo-600/20 bg-indigo-50/40 p-3"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-700 text-xs font-bold text-white">
                      {idx + 1}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-semibold text-foreground mb-1">
                        {t(k(`steps.list.${key}.title`))}
                      </div>
                      <div className="text-sm text-foreground/80 leading-relaxed">
                        {t(k(`steps.list.${key}.body`))}
                      </div>
                      {(() => {
                        const zeile = t(k(`steps.list.${key}.zeile`), { defaultValue: "" });
                        return zeile ? (
                          <div className="mt-2 inline-flex items-center gap-1.5 rounded-md bg-white border border-indigo-700/30 px-2 py-1 text-[11px] font-mono text-indigo-900">
                            <FileText className="h-3 w-3" />
                            {zeile}
                          </div>
                        ) : null;
                      })()}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </Section>
        )}

        {/* Example — realan primjer popunjavanja sa procijenjenom uštedom */}
        {counts.example && exampleRowKeys.length > 0 && (
          <Section
            icon={<Sparkles className="h-4 w-4 text-amber-600" />}
            title={t(k("example.heading"))}
          >
            <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
              {t(k("example.intro"))}
            </p>
            <div className="overflow-hidden rounded-xl border border-amber-500/30">
              <div className="bg-amber-500/10 px-3 py-2 text-xs font-semibold text-amber-900 uppercase tracking-wide">
                {t(k("example.scenarioTitle"))}
              </div>
              <div className="divide-y divide-amber-500/15 bg-background">
                {exampleRowKeys.map((key) => (
                  <div key={key} className="grid grid-cols-12 gap-2 px-3 py-2.5">
                    <div className="col-span-7 text-sm text-foreground/90 leading-relaxed">
                      {t(k(`example.rows.${key}.label`))}
                    </div>
                    <div className="col-span-5 text-right text-sm font-semibold text-foreground">
                      {t(k(`example.rows.${key}.value`))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-12 gap-2 bg-emerald-600/10 px-3 py-3 border-t border-emerald-600/30">
                <div className="col-span-7 text-sm font-bold text-emerald-900">
                  {t(k("example.resultLabel"))}
                </div>
                <div className="col-span-5 text-right text-base font-bold text-emerald-900">
                  {t(k("example.resultValue"))}
                </div>
              </div>
            </div>
            <p className="mt-2 text-[11px] text-muted-foreground italic leading-relaxed">
              {t(k("example.disclaimer"))}
            </p>
          </Section>
        )}

        {/* Mistakes */}
        {mistakesKeys.length > 0 && (
          <Section
            icon={<AlertTriangle className="h-4 w-4 text-rose-600" />}
            title={t(k("mistakes.heading"))}
          >
            <ul className="space-y-2">
              {mistakesKeys.map((key) => (
                <li
                  key={key}
                  className="flex items-start gap-2 rounded-lg border border-rose-500/30 bg-rose-500/5 p-3"
                >
                  <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0 text-rose-600" />
                  <span className="text-sm text-foreground/90 leading-relaxed">
                    {t(k(`mistakes.list.${key}`))}
                  </span>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* FAQ */}
        {faqKeys.length > 0 && (
          <Section icon={<Info className="h-4 w-4" />} title={t(k("faq.heading"))}>
            <div className="space-y-3">
              {faqKeys.map((key) => (
                <div
                  key={key}
                  className="rounded-xl border border-border bg-background p-3"
                >
                  <div className="text-sm font-semibold mb-1">
                    {t(k(`faq.list.${key}.q`))}
                  </div>
                  <div className="text-sm text-muted-foreground leading-relaxed">
                    {t(k(`faq.list.${key}.a`))}
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Next steps */}
        <div className="rounded-2xl border border-[hsl(var(--gold))]/30 bg-[hsl(var(--gold))]/5 p-5 mb-6">
          <h3 className="text-base font-semibold mb-2">
            {t(k("nextSteps.heading"))}
          </h3>
          <p className="text-sm text-foreground/90 mb-3 leading-relaxed">
            {t(k("nextSteps.body"))}
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              onClick={() => navigate(hubPath)}
              variant="outline"
              className="rounded-xl"
            >
              {t(k("nextSteps.ctaHub"))}
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
            {externalLink && (
              <Button asChild variant="outline" className="rounded-xl">
                <a
                  href={externalLink.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t(k(externalLink.labelKey ?? "nextSteps.ctaElster"))}
                  <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                </a>
              </Button>
            )}
          </div>
        </div>

        {/* Legal */}
        <div className="rounded-xl border border-border bg-muted/40 p-4 text-xs text-muted-foreground">
          <p className="font-semibold text-foreground mb-1">
            {t(k("legal.heading"))}
          </p>
          <p className="leading-relaxed mb-2">{t(k("legal.body"))}</p>
          <p className="leading-relaxed opacity-80">{t(k("legal.sources"))}</p>
        </div>
      </div>
    </>
  );
}

/* ─────────────── Section helpers ─────────────── */

function Section({
  icon,
  title,
  children,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
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

function ChecklistSection({
  moduleId,
  keys,
  title,
  intro,
  label,
  doneLabel,
  resetLabel,
  progressLabel,
}: {
  moduleId: string;
  keys: string[];
  title: string;
  intro: string;
  label: (key: string) => string;
  doneLabel: string;
  resetLabel: string;
  progressLabel: (done: number, total: number) => string;
}) {
  const { checked, toggle, reset, completedCount, hydrated } =
    usePoreziChecklist(moduleId);

  const total = keys.length;
  const done = completedCount(keys);
  const allDone = total > 0 && done === total;
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <section className="mb-6">
      <h2 className="text-base sm:text-lg font-semibold mb-3 flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-muted">
          <ListChecks className="h-4 w-4 text-indigo-600" />
        </span>
        {title}
      </h2>
      <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
        {intro}
      </p>

      {/* Progress strip */}
      <div className="mb-3 rounded-xl border border-border bg-background p-3">
        <div className="flex items-center justify-between mb-2 text-xs">
          <span className="font-medium text-foreground">
            {progressLabel(done, total)}
          </span>
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <RotateCcw className="h-3 w-3" />
            {resetLabel}
          </button>
        </div>
        <Progress value={pct} className="h-1.5" />
        {allDone && hydrated && (
          <div className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
            <CheckCircle2 className="h-3.5 w-3.5" />
            {doneLabel}
          </div>
        )}
      </div>

      <ul className="space-y-2">
        {keys.map((key) => {
          const isChecked = !!checked[key];
          return (
            <li key={key}>
              <label
                className={cn(
                  "flex items-start gap-3 rounded-lg border bg-background p-3 cursor-pointer transition-colors",
                  isChecked
                    ? "border-emerald-500/40 bg-emerald-500/5"
                    : "border-border hover:bg-muted/40",
                )}
              >
                <Checkbox
                  checked={isChecked}
                  onCheckedChange={() => toggle(key)}
                  className="mt-0.5"
                />
                <span
                  className={cn(
                    "text-sm leading-relaxed",
                    isChecked
                      ? "text-foreground/70 line-through decoration-emerald-600/40"
                      : "text-foreground/90",
                  )}
                >
                  {label(key)}
                </span>
              </label>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function range(n: number, prefix: string): string[] {
  return Array.from({ length: n }, (_, i) => `${prefix}${i + 1}`);
}

/** Re-export for thin page modules. */
export type { LucideIcon, ComponentType };
