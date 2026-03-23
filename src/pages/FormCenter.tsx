import { useState } from "react";
import { Link } from "react-router-dom";
import { Baby, Landmark, Heart, FileText, Home, ChevronRight, ChevronDown, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getGuideBySlug, type Guide } from "@/lib/guide-data";
import { motion, AnimatePresence } from "framer-motion";

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

function CategoryCard({ cat, onClick, guideCount }: { cat: CategoryDef; onClick: () => void; guideCount: number }) {
  const Icon = cat.icon;
  return (
    <button
      onClick={onClick}
      className="group flex items-center gap-4 rounded-2xl border border-border/40 bg-card p-5 text-left transition-all hover:border-gold/40 hover:shadow-md hover:-translate-y-0.5 w-full"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold transition-colors group-hover:bg-gold/20">
        <Icon className="h-5 w-5" strokeWidth={1.6} />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-sm">{cat.title}</h3>
        <p className="text-xs text-muted-foreground">{guideCount} {guideCount === 1 ? "formular" : "formulara"}</p>
      </div>
      <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
    </button>
  );
}

export default function FormCenter() {
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const activeCat = categories.find((c) => c.id === openCategory);
  const activeGuides = activeCat
    ? (activeCat.slugs.map((s) => getGuideBySlug(s)).filter(Boolean) as Guide[])
    : [];

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

      <AnimatePresence mode="wait">
        {!openCategory ? (
          <motion.div
            key="categories"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="grid gap-3 sm:grid-cols-2"
          >
            {categories.map((cat) => {
              const count = cat.slugs.map((s) => getGuideBySlug(s)).filter(Boolean).length;
              if (count === 0) return null;
              return (
                <CategoryCard
                  key={cat.id}
                  cat={cat}
                  guideCount={count}
                  onClick={() => setOpenCategory(cat.id)}
                />
              );
            })}
          </motion.div>
        ) : (
          <motion.div
            key={`guides-${openCategory}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
          >
            <button
              onClick={() => setOpenCategory(null)}
              className="mb-5 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-3 w-3" /> Nazad na kategorije
            </button>

            {activeCat && (
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10 text-gold">
                  <activeCat.icon className="h-5 w-5" strokeWidth={1.6} />
                </div>
                <h2 className="font-heading text-lg font-bold">{activeCat.title}</h2>
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {activeGuides.map((g) => (
                <GuideCard key={g.slug} guide={g} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
