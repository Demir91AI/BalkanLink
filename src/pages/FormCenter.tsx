import { Link } from "react-router-dom";
import { Baby, Landmark, Heart, FileText, Home, Car, Briefcase, HeartPulse, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { getGuideBySlug, type Guide } from "@/lib/guide-data";

interface CategoryDef {
  id: string;
  title: string;
  icon: typeof Baby;
  slugs: string[];
}

const categories: CategoryDef[] = [
  {
    id: "porodica",
    title: "Familie & Kinder",
    icon: Baby,
    slugs: ["kindergeld", "kinderzuschlag", "elterngeld", "elternzeit", "mutterschutz", "mutterschaftsleistungen", "bildung-teilhabe", "unterhalt", "unterhaltsvorschuss"],
  },
  {
    id: "socijalna",
    title: "Soziale Leistungen",
    icon: Landmark,
    slugs: ["buergergeld", "wohngeld", "bafoeg", "krippengeld-bayern", "sozialhilfe"],
  },
  {
    id: "stanovanje",
    title: "Wohnen",
    icon: Home,
    slugs: ["anmeldung", "wbs"],
  },
  {
    id: "zdravlje",
    title: "Gesundheit",
    icon: HeartPulse,
    slugs: ["krankengeld", "pflegegrad"],
  },
  {
    id: "dokumenti",
    title: "Dokumente",
    icon: FileText,
    slugs: ["fuehrungszeugnis", "aufenthaltstitel-verlaengerung"],
  },
];

function GuideRow({ guide }: { guide: Guide }) {
  return (
    <Link
      to={`/formulari/${guide.slug}`}
      className="group flex items-center justify-between gap-3 rounded-xl border border-border/40 bg-background p-4 transition-all hover:border-gold/40 hover:shadow-sm"
    >
      <div className="min-w-0">
        <p className="font-semibold text-sm truncate">{guide.title.bs}</p>
        <p className="text-[11px] text-muted-foreground truncate">{guide.authority.bs}</p>
      </div>
      <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

export default function FormCenter() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-extrabold sm:text-3xl">
          Formulare – Hilfe beim Ausfüllen
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Schritt für Schritt durch die wichtigsten deutschen Formulare.
        </p>
      </div>

      <Accordion type="single" collapsible className="space-y-2">
        {categories.map((cat) => {
          const guides = cat.slugs.map((s) => getGuideBySlug(s)).filter(Boolean) as Guide[];
          if (guides.length === 0) return null;
          const Icon = cat.icon;
          return (
            <AccordionItem key={cat.id} value={cat.id} className="rounded-2xl border border-border/60 bg-card px-5 shadow-sm">
              <AccordionTrigger className="hover:no-underline gap-3 py-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold">
                    <Icon className="h-5 w-5" strokeWidth={1.6} />
                  </div>
                  <div className="text-left">
                    <span className="font-bold text-sm">{cat.title}</span>
                    <span className="ml-2 text-xs text-muted-foreground">({guides.length})</span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-2 pb-2">
                  {guides.map((g) => (
                    <GuideRow key={g.slug} guide={g} />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
