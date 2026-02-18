import { useParams, Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, AlertTriangle, Clock, FileText, ExternalLink, Building2, Info, Download } from "lucide-react";
import { motion } from "framer-motion";
import { getGuideBySlug } from "@/lib/guide-data";
import { resolveGuideLinks, auditGuideLinks } from "@/lib/guide-links";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect } from "react";

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

  // DEV: audit links on first render
  useEffect(() => {
    if (import.meta.env.DEV) {
      auditGuideLinks();
    }
  }, []);

  if (!guide) {
    return (
      <section className="py-20 text-center">
        <h2 className="mb-2 text-lg font-bold">
          {lk === "de" ? "Seite nicht gefunden" : lk === "bs" ? "Stranica nije pronađena" : "Page not found"}
        </h2>
        <p className="text-muted-foreground">
          {lk === "de"
            ? "Der gewünschte Guide existiert nicht."
            : lk === "bs"
            ? "Traženi vodič ne postoji."
            : "The requested guide does not exist."}
        </p>
        <Link to="/formulare" className="mt-4 inline-block text-primary underline">
          ← {lk === "de" ? "Zurück" : lk === "bs" ? "Nazad" : "Back"}
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

  const buttonLabels = {
    de: { portal: "Online-Portal", downloads: "Formulare & Downloads", info: "Offizielle Info" },
    bs: { portal: "Online-Portal", downloads: "Formulari i preuzimanja", info: "Službene informacije" },
    en: { portal: "Online Portal", downloads: "Forms & Downloads", info: "Official Info" },
  };

  const categoryPaths: Record<string, string> = {
    familie: "/familie",
    wohnen: "/foerderungen",
    arbeit: "/foerderungen",
    gesundheit: "/foerderungen",
    bildung: "/foerderungen",
  };

  // Use central link registry (Single Source of Truth)
  const { links: registryLinks, showFallbackHint } = resolveGuideLinks(guide.slug);

  const linkIcon = (type: string) => {
    if (type === "portal") return <ExternalLink className="h-4 w-4" />;
    if (type === "downloads") return <Download className="h-4 w-4" />;
    return <Info className="h-4 w-4" />;
  };

  const linkStyle = (type: string) => {
    if (type === "portal") return "bg-gold/10 text-gold hover:bg-gold/20";
    if (type === "downloads") return "bg-primary/10 text-primary hover:bg-primary/20";
    return "bg-muted text-muted-foreground hover:bg-muted/80";
  };

  const fallbackTexts = {
    de: "Formular ist ggf. vor Ort erhältlich (Rathaus/Bürgerbüro/zuständige Behörde). Nutze das Online-Portal oder frage vor Ort nach.",
    bs: "Formular je dostupan online ili na licu mjesta (Rathaus/Bürgerbüro/nadležna institucija). Ako PDF nije direktno dostupan, koristi Online-Portal ili preuzmi formular sa zvanične stranice.",
    en: "The form may be available on-site (town hall/citizens' office/responsible authority). Use the online portal or ask in person.",
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
            <ArrowLeft className="h-3 w-3" /> {lk === "de" ? "Zurück" : lk === "bs" ? "Nazad" : "Back"}
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

          {/* Službeni linkovi — from central registry */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="rounded-xl border bg-card p-6 shadow-sm">
            <h2 className="mb-3 text-sm font-bold">{labels.links}</h2>

            {registryLinks.length > 0 && (
              <div className="flex flex-col gap-2 sm:flex-row">
                {registryLinks.map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-semibold transition-colors ${linkStyle(link.type)}`}
                  >
                    {linkIcon(link.type)} {buttonLabels[lk][link.type]}
                  </a>
                ))}
              </div>
            )}

            {showFallbackHint && (
              <p className={`text-xs text-muted-foreground ${registryLinks.length > 0 ? "mt-3" : ""}`}>
                <Info className="mr-1 inline h-3 w-3" />
                {fallbackTexts[lk]}
              </p>
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
}
