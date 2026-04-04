import { ChevronLeft, FileCheck, Clock, Briefcase, Home, Wifi, Star, Heart, File } from "lucide-react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { navigateBackOrHome } from "@/lib/navigation";
import { VORLAGEN_TEMPLATES, getTemplate } from "@/lib/vorlagen-templates";
import VorlagenGenerator from "@/components/vorlagen/VorlagenGenerator";
import { usePremiumAccess } from "@/hooks/usePremiumAccess";
import PremiumPaywall from "@/components/PremiumPaywall";

const ICON_MAP: Record<string, React.ElementType> = {
  briefcase: Briefcase,
  file: File,
  home: Home,
  wifi: Wifi,
  star: Star,
  heart: Heart,
};

const SECTIONS = [
  { id: "work" as const, titleDe: "Arbeitsrecht & Karriere", titleBs: "Radno pravo i karijera" },
  { id: "service" as const, titleDe: "Kundenservice / Verträge", titleBs: "Ugovori i reklamacije" },
];

export default function Vorlagen() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const { t } = useLanguage();
  const { canUseDocGenerator } = usePremiumAccess();

  /* ── Individual template detail/generator view ── */
  if (slug) {
    const tpl = getTemplate(slug);

    if (!tpl) {
      return (
        <div className="container max-w-3xl py-8 px-4">
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => navigateBackOrHome(navigate)} className="back-button">
              <ChevronLeft className="h-4 w-4" /> Nazad
            </button>
            <button onClick={() => navigate("/")} className="flex items-center gap-1.5 text-[13px] font-medium text-[#6B6B6B] hover:text-[#2D2D2D] transition-colors px-3 py-1.5 rounded-lg hover:bg-[#F0EAD8]">
              <Home className="h-4 w-4" /> Početna
            </button>
          </div>
          <p className="text-muted-foreground">Vorlage nicht gefunden.</p>
        </div>
      );
    }

    const Icon = ICON_MAP[tpl.icon] ?? FileCheck;

    return (
      <div className="container max-w-3xl py-8 px-4">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigateBackOrHome(navigate)} className="back-button">
            <ChevronLeft className="h-4 w-4" /> Nazad
          </button>
          <button onClick={() => navigate("/")} className="flex items-center gap-1.5 text-[13px] font-medium text-[#6B6B6B] hover:text-[#2D2D2D] transition-colors px-3 py-1.5 rounded-lg hover:bg-[#F0EAD8]">
            <Home className="h-4 w-4" /> Početna
          </button>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold sm:text-2xl">{tpl.titleDe}</h1>
            <p className="text-sm text-muted-foreground">{tpl.titleBs}</p>
          </div>
        </div>
        {canUseDocGenerator ? (
          <VorlagenGenerator template={tpl} />
        ) : (
          <PremiumPaywall variant="doc-generator" />
        )}
      </div>
    );
  }

  /* ── Overview listing ── */
  return (
    <div className="container max-w-3xl py-8 px-4">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigateBackOrHome(navigate)} className="back-button">
          <ChevronLeft className="h-4 w-4" /> Nazad
        </button>
        <button onClick={() => navigate("/")} className="flex items-center gap-1.5 text-[13px] font-medium text-[#6B6B6B] hover:text-[#2D2D2D] transition-colors px-3 py-1.5 rounded-lg hover:bg-[#F0EAD8]">
          <Home className="h-4 w-4" /> Početna
        </button>
      </div>
      <h1 className="text-2xl font-bold mb-1">Šabloni / Vorlagen</h1>
      <p className="text-sm text-muted-foreground mb-8">
        Kreiraj profesionalne dokumente za Njemačku — besplatno i bez registracije.
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
                        <p className="font-semibold text-foreground">{item.titleDe}</p>
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
