import { Link } from "react-router-dom";
import { Baby, Landmark, Heart, FileText, Home, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
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
    title: "Porodica i djeca",
    icon: Baby,
    slugs: ["kindergeld", "kinderzuschlag", "elterngeld", "elternzeit", "mutterschutz", "mutterschaftsleistungen", "bildung-teilhabe", "unterhalt", "unterhaltsvorschuss"],
  },
  {
    id: "socijalna",
    title: "Socijalna pomoć",
    icon: Landmark,
    slugs: ["buergergeld", "wohngeld", "bafoeg", "krippengeld-bayern", "sozialhilfe"],
  },
  {
    id: "zdravlje",
    title: "Zdravlje i njega",
    icon: Heart,
    slugs: ["krankengeld", "pflegegrad"],
  },
  {
    id: "dokumenti",
    title: "Dokumenti",
    icon: FileText,
    slugs: ["fuehrungszeugnis", "aufenthaltstitel-verlaengerung"],
  },
  {
    id: "stanovanje",
    title: "Stanovanje",
    icon: Home,
    slugs: ["anmeldung", "wbs"],
  },
];

function GuideCard({ guide }: { guide: Guide }) {
  return (
    <div className="flex flex-col justify-between rounded-2xl border bg-card p-5 shadow-sm hover:shadow-md transition-shadow">
      <div>
        <h3 className="font-bold text-sm">{guide.title.bs}</h3>
        <p className="mt-1 text-[11px] text-muted-foreground">{guide.authority.bs}</p>
        <p className="mt-2 text-xs text-muted-foreground line-clamp-2">{guide.who.bs}</p>
      </div>
      <Button className="mt-4 w-full rounded-xl text-xs" size="sm" asChild>
        <Link to={`/formulari/${guide.slug}`}>
          Otvori Smart Guide <ChevronRight className="ml-1 h-3 w-3" />
        </Link>
      </Button>
    </div>
  );
}

export default function FormCenter() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-10">
        <h1 className="font-heading text-2xl font-extrabold sm:text-3xl">
          Formulari & Anträge — Smart Guide
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Korak-po-korak vodič za popunjavanje najvažnijih njemačkih formulara. Bez PDF-a, bez uploada — samo jasna objašnjenja.
        </p>
      </div>

      <div className="space-y-10">
        {categories.map((cat) => {
          const guides = cat.slugs
            .map((s) => getGuideBySlug(s))
            .filter(Boolean) as Guide[];
          if (guides.length === 0) return null;

          const Icon = cat.icon;
          return (
            <section key={cat.id}>
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <h2 className="font-heading text-lg font-bold">{cat.title}</h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {guides.map((g) => (
                  <GuideCard key={g.slug} guide={g} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
