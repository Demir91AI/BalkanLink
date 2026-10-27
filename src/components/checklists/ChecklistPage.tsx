/**
 * Universal Premium Checklist template.
 *
 * Renders one checklist (documents → steps → deadlines → warnings → tips)
 * driven by:
 *  - <ChecklistDef>  (structural: id, icon, counts, premium)
 *  - i18n namespace `checklists` under key `<id>.*`
 *
 * Features:
 *  - Premium gate (uses usePremiumAccess)
 *  - Localized checkbox state (localStorage per checklist)
 *  - Print-optimized via window.print() — CSS hides UI chrome
 *  - WhatsApp share via PageNavBar showShare
 *  - 4 languages, no hardcoded strings
 */
import { useTranslation } from "react-i18next";
import {
  Crown,
  Lock,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Lightbulb,
  FileText,
  ExternalLink,
  Printer,
  ArrowLeft,
  RotateCcw,
} from "lucide-react";

import { SEO } from "@/components/SEO";
import PageNavBar from "@/components/navigation/PageNavBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

import { usePremiumAccess } from "@/hooks/usePremiumAccess";
import { useLocalizedNavigate } from "@/hooks/useLocalizedHref";
import { useLocation } from "react-router-dom";
import { langFromPath } from "@/lib/i18n-paths";
import { useChecklistProgress } from "./useChecklistProgress";
import type { ChecklistDef } from "@/lib/checklists-data";
import { CHECKLIST_HUB_PATH } from "@/lib/checklists-data";

const ACCENT_CLASSES: Record<ChecklistDef["accent"], { bg: string; border: string; text: string; soft: string }> = {
  emerald: { bg: "bg-emerald-500", border: "border-emerald-500/30", text: "text-emerald-600", soft: "bg-emerald-500/10" },
  amber: { bg: "bg-amber-500", border: "border-amber-500/30", text: "text-amber-600", soft: "bg-amber-500/10" },
  indigo: { bg: "bg-indigo-500", border: "border-indigo-500/30", text: "text-indigo-600", soft: "bg-indigo-500/10" },
  rose: { bg: "bg-rose-500", border: "border-rose-500/30", text: "text-rose-600", soft: "bg-rose-500/10" },
  blue: { bg: "bg-blue-500", border: "border-blue-500/30", text: "text-blue-600", soft: "bg-blue-500/10" },
  violet: { bg: "bg-violet-500", border: "border-violet-500/30", text: "text-violet-600", soft: "bg-violet-500/10" },
  teal: { bg: "bg-teal-500", border: "border-teal-500/30", text: "text-teal-600", soft: "bg-teal-500/10" },
  orange: { bg: "bg-orange-500", border: "border-orange-500/30", text: "text-orange-600", soft: "bg-orange-500/10" },
};

export default function ChecklistPage({ checklist }: { checklist: ChecklistDef }) {
  const { t } = useTranslation("checklists");
  const { isPremium, isLoggedIn } = usePremiumAccess();
  const navigate = useLocalizedNavigate();
  const { pathname } = useLocation();
  const lang = langFromPath(pathname);
  const hubPath = CHECKLIST_HUB_PATH[lang] || CHECKLIST_HUB_PATH.bs;

  const { id, icon: Icon, accent, counts, premium, officialLink } = checklist;
  const accentClasses = ACCENT_CLASSES[accent];

  const documents = (t(`${id}.documents`, { returnObjects: true }) as string[]) || [];
  const steps = (t(`${id}.steps`, { returnObjects: true }) as string[]) || [];
  const deadlines = (t(`${id}.deadlines`, { returnObjects: true }) as string[]) || [];
  const warnings = (t(`${id}.warnings`, { returnObjects: true }) as string[]) || [];
  const tips = (t(`${id}.tips`, { returnObjects: true }) as string[]) || [];

  const totalCheckable = documents.length + steps.length;
  const { checkedSet, toggle, reset, doneCount } = useChecklistProgress(id, totalCheckable);

  const title = t(`${id}.title`);
  const subtitle = t(`${id}.subtitle`);
  const seoTitle = `${title} — ${t("ui.documents")} | BalkanLink`;

  // Premium gate
  if (premium && !isPremium) {
    return (
      <>
        <SEO title={seoTitle} description={subtitle} path={`/check-liste/${id}`} />
        <div className="mx-auto max-w-2xl px-4 py-6 pb-28">
          <PageNavBar showShare shareTitle={title} />
          <Card className="rounded-2xl border border-[hsl(var(--gold))]/30 mt-4">
            <CardContent className="p-6 sm:p-8 text-center">
              <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[hsl(var(--gold))]/10">
                <Icon className={cn("h-7 w-7", accentClasses.text)} />
              </div>
              <Crown className="mx-auto h-8 w-8 text-[hsl(var(--gold))] mb-2" />
              <h1 className="text-2xl font-bold mb-2">{title}</h1>
              <p className="text-sm text-muted-foreground mb-3">{subtitle}</p>
              <p className="text-base font-medium mb-6 mt-4 text-foreground/90">
                {t("ui.premiumGate.body")}
              </p>

              {/* Free preview: counts only */}
              <div className="grid grid-cols-3 gap-2 mb-6 max-w-md mx-auto">
                <div className="rounded-lg border border-border bg-background p-2.5">
                  <div className="text-xl font-bold">{counts.documents}</div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wide">{t("ui.documents")}</div>
                </div>
                <div className="rounded-lg border border-border bg-background p-2.5">
                  <div className="text-xl font-bold">{counts.steps}</div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wide">{t("ui.steps")}</div>
                </div>
                <div className="rounded-lg border border-border bg-background p-2.5">
                  <div className="text-xl font-bold">{counts.deadlines}</div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wide">{t("ui.deadlines")}</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <Button
                  onClick={() => navigate(isLoggedIn ? "/paketi" : "/register")}
                  className="btn-gold-gradient rounded-xl px-6"
                >
                  <Lock className="mr-2 h-4 w-4" />
                  {isLoggedIn ? t("ui.premiumGate.cta") : t("ui.premiumGate.ctaLogin")}
                </Button>
                <Button variant="outline" onClick={() => navigate(hubPath)} className="rounded-xl">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {t("ui.backToHub")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  // Full checklist
  return (
    <>
      <SEO title={seoTitle} description={subtitle} path={`/check-liste/${id}`} />

      {/* Print-only header */}
      <div className="hidden print:block px-8 py-4 border-b border-border">
        <div className="text-xs text-muted-foreground">BalkanLink — Stand 2026</div>
        <h1 className="text-2xl font-bold mt-1">{title}</h1>
        <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-6 pb-28 print:max-w-none print:py-0">
        <div className="print:hidden">
          <PageNavBar showShare shareTitle={title} />
        </div>

        {/* Hero — screen only */}
        <div className={cn("rounded-2xl p-6 mt-4 mb-6 border print:hidden", accentClasses.soft, accentClasses.border)}>
          <div className="flex items-center gap-3 mb-3">
            <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl shadow-sm", accentClasses.bg)}>
              <Icon className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col gap-1">
              <Badge variant="outline" className="border-[hsl(var(--gold))]/40 text-xs w-fit">
                <Crown className="mr-1 h-3 w-3 text-[hsl(var(--gold))]" />
                {t("hub.badge")}
              </Badge>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">{title}</h1>
          <p className="text-sm sm:text-base text-foreground/80 leading-relaxed">{subtitle}</p>

          {/* Progress + Actions */}
          {totalCheckable > 0 && (
            <div className="mt-5 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium">{t("ui.progress", { done: doneCount, total: totalCheckable })}</span>
                <button
                  onClick={reset}
                  className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <RotateCcw className="h-3 w-3" /> {t("ui.reset")}
                </button>
              </div>
              <Progress value={(doneCount / totalCheckable) * 100} className="h-1.5" />
              <p className="text-[11px] text-muted-foreground italic">{t("ui.checklistSaved")}</p>
            </div>
          )}

          <div className="mt-4 flex flex-wrap gap-2">
            <Button onClick={() => window.print()} variant="outline" size="sm" className="rounded-lg">
              <Printer className="mr-1.5 h-3.5 w-3.5" />
              {t("ui.print")} / {t("ui.downloadPdf")}
            </Button>
            {officialLink && (
              <Button asChild variant="outline" size="sm" className="rounded-lg">
                <a href={officialLink} target="_blank" rel="noopener noreferrer">
                  {t("ui.officialLink")}
                  <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </Button>
            )}
          </div>
        </div>

        {/* Documents */}
        {documents.length > 0 && (
          <Section
            icon={<FileText className={cn("h-5 w-5", accentClasses.text)} />}
            title={t("ui.documents")}
            count={documents.length}
          >
            <ul className="space-y-2">
              {documents.map((item, idx) => {
                const checkId = `doc-${idx}`;
                return (
                  <li
                    key={idx}
                    className="flex items-start gap-3 rounded-lg border border-border bg-background p-3"
                  >
                    <Checkbox
                      id={checkId}
                      checked={checkedSet.has(checkId)}
                      onCheckedChange={() => toggle(checkId)}
                      className="mt-0.5 shrink-0"
                    />
                    <label
                      htmlFor={checkId}
                      className={cn(
                        "text-sm leading-relaxed flex-1 cursor-pointer",
                        checkedSet.has(checkId) && "line-through text-muted-foreground"
                      )}
                    >
                      {item}
                    </label>
                  </li>
                );
              })}
            </ul>
          </Section>
        )}

        {/* Steps */}
        {steps.length > 0 && (
          <Section
            icon={<CheckCircle2 className="h-5 w-5 text-blue-600" />}
            title={t("ui.steps")}
            count={steps.length}
          >
            <ol className="space-y-2.5">
              {steps.map((step, idx) => {
                const checkId = `step-${idx}`;
                return (
                  <li key={idx} className="flex items-start gap-3 rounded-xl border border-blue-500/20 bg-blue-50/40 dark:bg-blue-950/20 p-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                      {idx + 1}
                    </div>
                    <Checkbox
                      id={checkId}
                      checked={checkedSet.has(checkId)}
                      onCheckedChange={() => toggle(checkId)}
                      className="mt-0.5 shrink-0 print:hidden"
                    />
                    <label
                      htmlFor={checkId}
                      className={cn(
                        "text-sm leading-relaxed flex-1 cursor-pointer",
                        checkedSet.has(checkId) && "line-through text-muted-foreground"
                      )}
                    >
                      {step}
                    </label>
                  </li>
                );
              })}
            </ol>
          </Section>
        )}

        {/* Deadlines */}
        {deadlines.length > 0 && (
          <Section icon={<Clock className="h-5 w-5 text-amber-600" />} title={t("ui.deadlines")} count={deadlines.length}>
            <ul className="space-y-2">
              {deadlines.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/5 p-3">
                  <Clock className="h-4 w-4 mt-0.5 shrink-0 text-amber-600" />
                  <span className="text-sm leading-relaxed flex-1">{item}</span>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* Warnings */}
        {warnings.length > 0 && (
          <Section
            icon={<AlertTriangle className="h-5 w-5 text-rose-600" />}
            title={t("ui.warnings")}
            count={warnings.length}
          >
            <ul className="space-y-2">
              {warnings.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 rounded-lg border border-rose-500/30 bg-rose-500/5 p-3">
                  <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0 text-rose-600" />
                  <span className="text-sm leading-relaxed flex-1">{item}</span>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* Tips */}
        {tips.length > 0 && (
          <Section
            icon={<Lightbulb className="h-5 w-5 text-[hsl(var(--gold))]" />}
            title={t("ui.tips")}
            count={tips.length}
          >
            <ul className="space-y-2">
              {tips.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 rounded-lg border border-[hsl(var(--gold))]/30 bg-[hsl(var(--gold))]/5 p-3"
                >
                  <Lightbulb className="h-4 w-4 mt-0.5 shrink-0 text-[hsl(var(--gold))]" />
                  <span className="text-sm leading-relaxed flex-1">{item}</span>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* Disclaimer */}
        <p className="mt-6 text-[11px] text-muted-foreground italic leading-relaxed text-center print:mt-8">
          {t("ui.disclaimer")}
        </p>

        {/* Back to hub — screen only */}
        <div className="mt-6 print:hidden text-center">
          <Button onClick={() => navigate(hubPath)} variant="outline" className="rounded-xl">
            <ArrowLeft className="mr-1.5 h-4 w-4" />
            {t("ui.backToHub")}
          </Button>
        </div>
      </div>
    </>
  );
}

function Section({
  icon,
  title,
  count,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-6 print:mb-4 print:break-inside-avoid">
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <h2 className="text-lg font-bold">{title}</h2>
        <span className="text-xs text-muted-foreground font-medium">({count})</span>
      </div>
      {children}
    </section>
  );
}
