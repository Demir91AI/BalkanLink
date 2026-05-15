import { Link } from "react-router-dom";
import { ArrowRight, Home, Briefcase, HeartPulse, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";
import { getGuidesByCategory, type Guide } from "@/lib/guide-data";
import LegalDisclaimer from "@/components/LegalDisclaimer";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";
import { SEO } from "@/components/SEO";

type LangKey = "de" | "bs" | "en";
function getLangKey(lang: string): LangKey {
  if (lang === "de") return "de";
  if (lang === "en") return "en";
  return "bs";
}

const categoryMeta: Record<Guide["category"], { icon: any; label: { de: string; bs: string; en: string } }> = {
  wohnen: { icon: Home, label: { de: "Wohnen", bs: "Stanovanje", en: "Housing" } },
  arbeit: { icon: Briefcase, label: { de: "Arbeit", bs: "Posao", en: "Work" } },
  gesundheit: { icon: HeartPulse, label: { de: "Gesundheit", bs: "Zdravlje", en: "Health" } },
  bildung: { icon: GraduationCap, label: { de: "Kinder & Bildung", bs: "Djeca i obrazovanje", en: "Children & Education" } },
  familie: { icon: Home, label: { de: "Familie", bs: "Porodica", en: "Family" } },
};

const titles = {
  de: { title: "Förderungen & Zuschüsse", subtitle: "Alle staatlichen Hilfen — mit Ausfüllhilfe und Schritt-für-Schritt Anleitung." },
  bs: { title: "Pomoći i naknade", subtitle: "Sve državne pomoći — sa uputstvima za popunjavanje korak po korak." },
  en: { title: "Benefits & Subsidies", subtitle: "All government benefits — with step-by-step filling guides." },
};

export default function Foerderungen() {
  const lk = getLangKey("bs");
  const t = titles[lk];

  const categories: Guide["category"][] = ["wohnen", "arbeit", "gesundheit", "bildung"];

  return (
    <>
      <SEO title="Pomoći i Naknade — Državne Subvencije" description="Sve državne pomoći u Njemačkoj — stanovanje, posao, zdravlje, obrazovanje, porodica. Sa uputstvima za popunjavanje." path="/foerderungen" />
      <section className="border-b bg-primary py-12">
        <div className="container max-w-3xl">
          <Breadcrumbs variant="dark" />
          <h1 className="text-2xl font-bold text-primary-foreground md:text-3xl text-center">{t.title}</h1>
          <p className="mt-2 text-sm text-primary-foreground/80 md:text-base text-center">{t.subtitle}</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container max-w-3xl space-y-10">
          {categories.map((cat) => {
            const meta = categoryMeta[cat];
            const guides = getGuidesByCategory(cat);
            if (guides.length === 0) return null;
            const CatIcon = meta.icon;
            return (
              <div key={cat}>
                <div className="mb-4 flex items-center gap-2">
                  <CatIcon className="h-5 w-5 text-gold" strokeWidth={1.5} />
                  <h2 className="text-base font-bold">{meta.label[lk]}</h2>
                </div>
                <motion.div
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
                  className="grid gap-3 sm:grid-cols-2"
                >
                  {guides.map((guide) => (
                    <motion.div
                      key={guide.slug}
                      variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                    >
                      <Link
                        to={`/formulari/${guide.slug}`}
                        className="group flex items-center gap-3 rounded-xl border bg-card p-4 shadow-sm transition-all duration-300 hover:border-gold/40 hover:shadow-md"
                      >
                        <div className="min-w-0 flex-1">
                          <h3 className="text-sm font-semibold">{guide.title[lk]}</h3>
                          <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">{guide.who[lk]}</p>
                        </div>
                        <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground/30 transition-colors group-hover:text-gold" />
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            );
          })}
          <LegalDisclaimer />
        </div>
      </section>
    </>
  );
}
