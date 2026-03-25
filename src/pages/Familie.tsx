import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft, Baby, BookOpen, GraduationCap, HandCoins, Heart, Users, Shield, Banknote, Scale } from "lucide-react";
import { motion } from "framer-motion";
import { getGuidesByCategory } from "@/lib/guide-data";
import { useLanguage } from "@/contexts/LanguageContext";
import LegalDisclaimer from "@/components/LegalDisclaimer";
import { navigateBackOrHome } from "@/lib/navigation";

type LangKey = "de" | "bs" | "en";
function getLangKey(lang: string): LangKey {
  if (lang === "de") return "de";
  if (lang === "en") return "en";
  return "bs";
}

const iconMap: Record<string, any> = {
  kindergeld: Baby,
  kinderzuschlag: HandCoins,
  elterngeld: Users,
  elternzeit: Users,
  mutterschutz: Shield,
  mutterschaftsleistungen: Banknote,
  "bildung-teilhabe": BookOpen,
  unterhalt: Scale,
  unterhaltsvorschuss: HandCoins,
};

const titles = {
  de: { title: "Familie & Kinder", subtitle: "Alle Leistungen und Ansprüche für Familien mit Kindern in Deutschland." },
  bs: { title: "Porodica i djeca", subtitle: "Sve naknade i prava za porodice sa djecom u Njemačkoj." },
  en: { title: "Family & Children", subtitle: "All benefits and rights for families with children in Germany." },
};

export default function Familie() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const lk = getLangKey(language);
  const familyGuides = getGuidesByCategory("familie");
  const t = titles[lk];

  return (
    <>
      <section className="border-b bg-primary py-12">
        <div className="container max-w-3xl">
          <button onClick={() => navigateBackOrHome(navigate)} className="back-button mb-4 text-xs text-primary-foreground">
            <ArrowLeft className="h-3 w-3" /> Nazad
          </button>
          <h1 className="text-2xl font-bold text-primary-foreground md:text-3xl text-center">{t.title}</h1>
          <p className="mt-2 text-sm text-primary-foreground/80 md:text-base text-center">{t.subtitle}</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container max-w-3xl">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
            className="grid gap-4 sm:grid-cols-2"
          >
            {familyGuides.map((guide) => {
              const Icon = iconMap[guide.slug] || Heart;
              return (
                <motion.div
                  key={guide.slug}
                  variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                >
                  <Link
                    to={`/guide/${guide.slug}`}
                    className="group flex flex-col gap-3 rounded-xl border bg-card p-5 shadow-sm transition-all duration-300 hover:border-gold/40 hover:shadow-md hover:-translate-y-0.5"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-gold/10 group-hover:text-gold">
                      <Icon className="h-5 w-5" strokeWidth={1.5} />
                    </div>
                    <h2 className="text-sm font-bold">{guide.title[lk]}</h2>
                    <p className="text-xs leading-relaxed text-muted-foreground">{guide.who[lk]}</p>
                    <span className="mt-auto inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:text-gold">
                      {lk === "de" ? "Ausfüllhilfe öffnen" : lk === "en" ? "Open guide" : "Otvori vodič"} <ArrowRight className="h-3 w-3" />
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
          <LegalDisclaimer />
        </div>
      </section>
    </>
  );
}
