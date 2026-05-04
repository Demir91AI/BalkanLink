import { FileCheck, Lock, Crown, CheckCircle2, Mail, Home, Smartphone, AlertTriangle, Undo2, Award, FileText, Heart } from "lucide-react";
import { SEO } from "@/components/SEO";
import PageNavBar from "@/components/navigation/PageNavBar";
import { useNavigate, useParams, Link } from "react-router-dom";
import { navigateBackOrHome } from "@/lib/navigation";
import { VORLAGEN_TEMPLATES, getTemplate } from "@/lib/vorlagen-templates";
import VorlagenGenerator from "@/components/vorlagen/VorlagenGenerator";
import { useSubscription } from "@/hooks/useSubscription";
import { useTranslation } from "react-i18next";

import type { LucideIcon } from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  briefcase: Mail,
  file: FileText,
  home: Home,
  wifi: Smartphone,
  star: Award,
  heart: Heart,
  alert: AlertTriangle,
  undo: Undo2,
};

/** Slugs that are free (no premium required) */
const FREE_TEMPLATE_SLUGS = new Set(["kuendigung", "mietkuendigung"]);


function FreeBadge({ label }: { label: string }) {
  return (
    <span className="shrink-0 rounded-full bg-emerald-100 dark:bg-emerald-900/30 px-2 py-0.5 text-[9px] font-bold uppercase text-emerald-700 dark:text-emerald-400">
      {label}
    </span>
  );
}

function PremiumBadge({ label }: { label: string }) {
  return (
    <span className="shrink-0 flex items-center gap-0.5 rounded-full bg-[hsl(var(--gold))]/10 px-2 py-0.5 text-[9px] font-bold uppercase text-[hsl(var(--gold))]">
      <Lock className="h-2.5 w-2.5" /> {label}
    </span>
  );
}

function TemplatePremiumPaywall({ templateName }: { templateName: string }) {
  const navigate = useNavigate();
  const { t } = useTranslation("pages");
  const benefits = [
    t("vorlagen.ui.benefit1"),
    t("vorlagen.ui.benefit2"),
    t("vorlagen.ui.benefit3"),
    t("vorlagen.ui.benefit4"),
    t("vorlagen.ui.benefit5"),
    t("vorlagen.ui.benefit6"),
  ];
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center gap-5 max-w-md mx-auto">
      <div className="h-14 w-14 rounded-2xl bg-[hsl(var(--gold))]/10 flex items-center justify-center ring-1 ring-[hsl(var(--gold))]/20">
        <Lock className="h-7 w-7 text-[hsl(var(--gold))]" />
      </div>
      <div>
        <h2 className="text-lg font-bold">{t("vorlagen.ui.unlock", { name: templateName })}</h2>
        <p className="mt-3 text-sm text-muted-foreground font-semibold">{t("vorlagen.ui.whatYouGet")}</p>
      </div>
      <ul className="text-left text-xs text-muted-foreground space-y-2 w-full">
        {benefits.map((b, i) => (
          <li key={i} className="flex items-start gap-2">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" /> {b}
          </li>
        ))}
      </ul>
      <div className="w-full space-y-2 mt-2">
        <button
          onClick={() => navigate("/paketi")}
          className="w-full rounded-full py-3 text-sm font-bold text-white"
          style={{ background: "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--gold-dark)))" }}
        >
          <Crown className="inline-block mr-1.5 h-4 w-4" />
          {t("vorlagen.ui.ctaUnlock")}
        </button>
      </div>
    </div>
  );
}

export default function Vorlagen() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const { isPremium } = useSubscription();
  const { t } = useTranslation("pages");

  const SECTIONS = [
    { id: "work" as const, titleDe: t("vorlagen.ui.sectionWork"), titleLocal: t("vorlagen.ui.sectionWorkLocal") },
    { id: "service" as const, titleDe: t("vorlagen.ui.sectionService"), titleLocal: t("vorlagen.ui.sectionServiceLocal") },
    { id: "health" as const, titleDe: t("vorlagen.ui.sectionHealth"), titleLocal: t("vorlagen.ui.sectionHealthLocal") },
  ];

  /** Get localized title for a template (falls back to DE) */
  const tplTitle = (slug: string, fallback: string): string => {
    const k = `vorlagen.templates.${slug}.title`;
    const v = t(k);
    return v === k ? fallback : v;
  };

  /* ── Individual template detail/generator view ── */
  if (slug) {
    const tpl = getTemplate(slug);

    if (!tpl) {
      return (
        <div className="container max-w-3xl py-8 px-4">
          <PageNavBar onBack={() => navigateBackOrHome(navigate)} showShare />
          <p className="text-muted-foreground">{t("vorlagen.ui.notFound")}</p>
        </div>
      );
    }

    const Icon = ICON_MAP[tpl.icon] ?? FileCheck;
    const isFree = FREE_TEMPLATE_SLUGS.has(tpl.slug);
    const canAccess = isPremium || isFree;
    const localTitle = tplTitle(tpl.slug, tpl.titleBs);

    return (
      <div className="container max-w-3xl py-8 px-4">
        <PageNavBar onBack={() => navigateBackOrHome(navigate)} showShare />

        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold sm:text-2xl">{tpl.titleDe}</h1>
              {isPremium ? null : (isFree ? <FreeBadge label={t("vorlagen.ui.freeBadge")} /> : <PremiumBadge label={t("vorlagen.ui.premiumBadge")} />)}
            </div>
            <p className="text-sm text-muted-foreground">{localTitle}</p>
          </div>
        </div>
        {canAccess ? (
          <VorlagenGenerator template={tpl} />
        ) : (
          <TemplatePremiumPaywall templateName={tpl.titleDe} />
        )}
      </div>
    );
  }

  /* ── Overview listing ── */
  return (
    <div className="container max-w-3xl py-8 px-4">
      <SEO title={t("vorlagen.ui.seoTitle")} description={t("vorlagen.ui.seoDescription")} path="/vorlagen" />
      <PageNavBar onBack={() => navigateBackOrHome(navigate)} showShare />
      <h1 className="text-2xl font-bold mb-1 text-foreground">{t("vorlagen.ui.pageTitle")}</h1>
      <p className="text-sm text-muted-foreground mb-8">
        {t("vorlagen.ui.pageSubtitle")}
      </p>

      <div className="space-y-8">
        {SECTIONS.map((section) => {
          const items = VORLAGEN_TEMPLATES.filter((i) => i.section === section.id);
          if (!items.length) return null;
          return (
            <div key={section.id}>
              <h2 className="text-lg font-semibold mb-4">
                {section.titleDe}{" "}
                <span className="text-muted-foreground font-normal text-sm">
                  — {section.titleLocal}
                </span>
              </h2>
              <div className="grid gap-3">
                {items.map((item) => {
                  const Icon = ICON_MAP[item.icon] ?? FileCheck;
                  const isFree = FREE_TEMPLATE_SLUGS.has(item.slug);
                  return (
                    <div
                      key={item.slug}
                      className="relative flex items-center gap-4 rounded-xl border border-border bg-card p-4 hover:bg-accent/50 transition-colors"
                    >
                      <Link
                        to={`/vorlagen/${item.slug}`}
                        className="flex flex-1 min-w-0 items-center gap-4"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-foreground">{item.titleDe}</p>
                            {isPremium ? null : (isFree ? <FreeBadge label={t("vorlagen.ui.freeBadge")} /> : <PremiumBadge label={t("vorlagen.ui.premiumBadge")} />)}
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {tplTitle(item.slug, item.titleBs)}
                          </p>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
