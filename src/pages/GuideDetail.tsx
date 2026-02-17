import { useParams, Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, AlertTriangle, Clock, FileText, ExternalLink, Building2 } from "lucide-react";
import { motion } from "framer-motion";
import { getGuideBySlug } from "@/lib/guide-data";
import { useLanguage } from "@/contexts/LanguageContext";

type LangKey = "de" | "bs" | "en";

function getLangKey(lang: string): LangKey {
  if (lang === "de") return "de";
  if (lang === "en") return "en";
  return "bs";
}

export default function GuideDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLanguage();
  const guide = getGuideBySlug(slug || "");
  const lk = getLangKey(language);

  if (!guide) {
    return (
      <section className="py-20 text-center">
        <p className="text-muted-foreground">Guide not found.</p>
        <Link to="/formulare" className="mt-4 inline-block text-primary underline">
          ← Back
        </Link>
      </section>
    );
  }

  const sectionLabels = {
    de: { who: "Wer hat Anspruch?", authority: "Zuständige Behörde", form: "Formularname", steps: "Schritt-für-Schritt Ausfüllanleitung", docs: "Benötigte Unterlagen", time: "Bearbeitungsdauer", mistakes: "Häufige Fehler", links: "Offizielle Links" },
    bs: { who: "Ko ima pravo?", authority: "Nadležna institucija", form: "Naziv formulara", steps: "Korak-po-korak uputstvo", docs: "Potrebni dokumenti", time: "Vrijeme obrade", mistakes: "Česte greške", links: "Službeni linkovi" },
    en: { who: "Who is eligible?", authority: "Responsible authority", form: "Form name", steps: "Step-by-step guide", docs: "Required documents", time: "Processing time", mistakes: "Common mistakes", links: "Official links" },
  };
  const labels = sectionLabels[lk];

  const categoryPaths: Record<string, string> = {
    familie: "/familie",
    wohnen: "/foerderungen",
    arbeit: "/foerderungen",
    gesundheit: "/foerderungen",
    bildung: "/foerderungen",
  };

  return (
    <>
      {/* Header */}
      <section className="border-b bg-primary py-10">
        <div className="container max-w-3xl">
          <Link
            to={categoryPaths[guide.category] || "/formulare"}
            className="mb-4 inline-flex items-center gap-1 text-xs text-primary-foreground/70 hover:text-primary-foreground"
          >
            <ArrowLeft className="h-3 w-3" /> Back
          </Link>
          <h1 className="text-2xl font-bold text-primary-foreground md:text-3xl">
            {guide.title[lk]}
          </h1>
        </div>
      </section>

      <section className="py-10">
        <div className="container max-w-3xl space-y-8">
          {/* Anspruch */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="mb-3 flex items-center gap-2 text-sm font-bold">
              <CheckCircle2 className="h-4 w-4 text-gold" /> {labels.who}
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">{guide.who[lk]}</p>
          </motion.div>

          {/* Behörde + Formular */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border bg-card p-5 shadow-sm">
              <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                <Building2 className="h-3.5 w-3.5" /> {labels.authority}
              </div>
              <p className="text-sm font-medium">{guide.authority[lk]}</p>
            </div>
            <div className="rounded-xl border bg-card p-5 shadow-sm">
              <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                <FileText className="h-3.5 w-3.5" /> {labels.form}
              </div>
              <p className="text-sm font-medium">{guide.formName[lk]}</p>
            </div>
          </motion.div>

          {/* Schritt für Schritt */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="rounded-xl border bg-card p-6 shadow-sm">
            <h2 className="mb-4 text-sm font-bold">{labels.steps}</h2>
            <div className="space-y-4">
              {guide.steps[lk].map((step, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold/15 text-xs font-bold text-gold">
                    {i + 1}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold">{step.field}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{step.instruction}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Dokumente */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-xl border bg-card p-6 shadow-sm">
            <h2 className="mb-3 text-sm font-bold">{labels.docs}</h2>
            <ul className="space-y-2">
              {guide.documents[lk].map((doc, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                  {doc}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Bearbeitungsdauer + Fehler */}
          <div className="grid gap-4 sm:grid-cols-2">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="rounded-xl border bg-card p-5 shadow-sm">
              <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                <Clock className="h-3.5 w-3.5" /> {labels.time}
              </div>
              <p className="text-lg font-bold text-primary">{guide.processingTime[lk]}</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="rounded-xl border border-warning/20 bg-warning/5 p-5 shadow-sm">
              <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-warning">
                <AlertTriangle className="h-3.5 w-3.5" /> {labels.mistakes}
              </div>
              <ul className="space-y-1">
                {guide.commonMistakes[lk].map((m, i) => (
                  <li key={i} className="text-xs text-muted-foreground">• {m}</li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Links */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="rounded-xl border bg-card p-6 shadow-sm">
            <h2 className="mb-3 text-sm font-bold">{labels.links}</h2>
            <div className="flex flex-col gap-2 sm:flex-row">
              <a
                href={guide.officialPdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-primary/10 px-4 py-2.5 text-xs font-semibold text-primary transition-colors hover:bg-primary/20"
              >
                <FileText className="h-4 w-4" /> PDF / {labels.form}
              </a>
              <a
                href={guide.onlineLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-gold/10 px-4 py-2.5 text-xs font-semibold text-gold transition-colors hover:bg-gold/20"
              >
                <ExternalLink className="h-4 w-4" /> Online-Portal
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
