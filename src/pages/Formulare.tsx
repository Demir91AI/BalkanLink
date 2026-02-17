import { Link } from "react-router-dom";
import { ArrowRight, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { guides } from "@/lib/guide-data";
import { useLanguage } from "@/contexts/LanguageContext";

type LangKey = "de" | "bs" | "en";
function getLangKey(lang: string): LangKey {
  if (lang === "de") return "de";
  if (lang === "en") return "en";
  return "bs";
}

const titles = {
  de: { title: "Formulare & Anträge", subtitle: "Alle wichtigen Anträge — mit vollständiger Ausfüllhilfe." },
  bs: { title: "Formulari i zahtjevi", subtitle: "Svi važni zahtjevi — sa kompletnim uputstvom za popunjavanje." },
  en: { title: "Forms & Applications", subtitle: "All important applications — with complete filling guides." },
};

export default function Formulare() {
  const { language } = useLanguage();
  const lk = getLangKey(language);
  const t = titles[lk];

  return (
    <>
      <section className="border-b bg-primary py-12">
        <div className="container text-center">
          <h1 className="text-2xl font-bold text-primary-foreground md:text-3xl">{t.title}</h1>
          <p className="mt-2 text-sm text-primary-foreground/80 md:text-base">{t.subtitle}</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container max-w-3xl">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04 } } }}
            className="space-y-3"
          >
            {guides.map((guide) => (
              <motion.div
                key={guide.slug}
                variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
              >
                <Link
                  to={`/guide/${guide.slug}`}
                  className="group flex items-start gap-4 rounded-xl border bg-card p-5 shadow-sm transition-all duration-300 hover:border-gold/40 hover:shadow-md"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-gold/10 group-hover:text-gold">
                    <FileText className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-sm font-bold">{guide.title[lk]}</h2>
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-1">{guide.who[lk]}</p>
                  </div>
                  <ArrowRight className="ml-auto mt-2 h-4 w-4 shrink-0 text-muted-foreground/30 transition-colors group-hover:text-gold" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
