import { FileCheck, Lock, Crown, CheckCircle2, Mail, Home, Smartphone, AlertTriangle, Undo2, Award, FileText, Heart } from "lucide-react";
import { SEO } from "@/components/SEO";
import PageNavBar from "@/components/navigation/PageNavBar";
import { useNavigate, useParams, Link } from "react-router-dom";
import { navigateBackOrHome } from "@/lib/navigation";
import { VORLAGEN_TEMPLATES, getTemplate } from "@/lib/vorlagen-templates";
import VorlagenGenerator from "@/components/vorlagen/VorlagenGenerator";
import { useSubscription } from "@/hooks/useSubscription";
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

const SECTIONS = [
  { id: "work" as const, titleDe: "Arbeitsrecht & Karriere", titleBs: "Radno pravo i karijera" },
  { id: "service" as const, titleDe: "Kundenservice / Verträge", titleBs: "Ugovori i reklamacije" },
  { id: "health" as const, titleDe: "Gesundheit & Versicherung", titleBs: "Zdravstvo i osiguranje" },
];

function FreeBadge() {
  return (
    <span className="shrink-0 rounded-full bg-emerald-100 dark:bg-emerald-900/30 px-2 py-0.5 text-[9px] font-bold uppercase text-emerald-700 dark:text-emerald-400">
      Besplatno
    </span>
  );
}

function PremiumBadge() {
  return (
    <span className="shrink-0 flex items-center gap-0.5 rounded-full bg-[hsl(var(--gold))]/10 px-2 py-0.5 text-[9px] font-bold uppercase text-[hsl(var(--gold))]">
      <Lock className="h-2.5 w-2.5" /> Premium
    </span>
  );
}

function TemplatePremiumPaywall({ templateName }: { templateName: string }) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center gap-5 max-w-md mx-auto">
      <div className="h-14 w-14 rounded-2xl bg-[hsl(var(--gold))]/10 flex items-center justify-center ring-1 ring-[hsl(var(--gold))]/20">
        <Lock className="h-7 w-7 text-[hsl(var(--gold))]" />
      </div>
      <div>
        <h2 className="text-lg font-bold">Otključaj {templateName}</h2>
        <p className="mt-3 text-sm text-muted-foreground font-semibold">Šta dobijaš:</p>
      </div>
      <ul className="text-left text-xs text-muted-foreground space-y-2 w-full">
        <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" /> Profesionalni njemački tekst (pravno ispravan)</li>
        <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" /> Forma s pitanjima na tvom jeziku</li>
        <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" /> Automatsko popunjavanje tvojih podataka</li>
        <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" /> Preuzimanje kao PDF spreman za slanje</li>
        <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" /> Savjeti šta treba priložiti uz dokument</li>
        <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" /> Primjer pravilno popunjenog dokumenta</li>
      </ul>
      <div className="w-full space-y-2 mt-2">
        <button
          onClick={() => navigate("/paketi")}
          className="w-full rounded-full py-3 text-sm font-bold text-white"
          style={{ background: "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--gold-dark)))" }}
        >
          <Crown className="inline-block mr-1.5 h-4 w-4" />
          Otključaj Premium — 9.99€/mj.
        </button>


      </div>
    </div>
  );
}

export default function Vorlagen() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const { isPremium } = useSubscription();

  /* ── Individual template detail/generator view ── */
  if (slug) {
    const tpl = getTemplate(slug);

    if (!tpl) {
      return (
        <div className="container max-w-3xl py-8 px-4">
          <PageNavBar onBack={() => navigateBackOrHome(navigate)} />
          <p className="text-muted-foreground">Vorlage nicht gefunden.</p>
        </div>
      );
    }

    const Icon = ICON_MAP[tpl.icon] ?? FileCheck;
    const isFree = FREE_TEMPLATE_SLUGS.has(tpl.slug);
    const canAccess = isPremium || isFree;

    return (
      <div className="container max-w-3xl py-8 px-4">
        <PageNavBar onBack={() => navigateBackOrHome(navigate)} />

        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold sm:text-2xl">{tpl.titleDe}</h1>
              {isFree ? <FreeBadge /> : <PremiumBadge />}
            </div>
            <p className="text-sm text-muted-foreground">{tpl.titleBs}</p>
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
      <SEO title="Vorlagen — Pisma i Dopisi" description="Gotovi šabloni za njemačka pisma — otkaz ugovora, zahtjevi, molbe. Na bosanskom i njemačkom." path="/vorlagen" />
      <PageNavBar onBack={() => navigateBackOrHome(navigate)} />
      <h1 className="text-2xl font-bold mb-1 text-foreground">Šabloni / Vorlagen</h1>
      <p className="text-sm text-muted-foreground mb-8">
        Profesionalni njemački dokumenti — popuni i preuzmi u 2 minute
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
                  — {section.titleBs}
                </span>
              </h2>
              <div className="grid gap-3">
                {items.map((item) => {
                  const Icon = ICON_MAP[item.icon] ?? FileCheck;
                  const isFree = FREE_TEMPLATE_SLUGS.has(item.slug);
                  return (
                    <Link
                      key={item.slug}
                      to={`/vorlagen/${item.slug}`}
                      className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-foreground">{item.titleDe}</p>
                          {isFree ? <FreeBadge /> : <PremiumBadge />}
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {item.titleBs}
                        </p>
                      </div>
                    </Link>
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
