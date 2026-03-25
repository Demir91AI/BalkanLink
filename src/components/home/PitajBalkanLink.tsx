import { useState, useRef } from "react";
import {
  Search, ArrowRight, Loader2, BookOpen, Briefcase, Home,
  FileText, GraduationCap, CheckCircle2, AlertTriangle,
  ClipboardList, FolderOpen, Footprints, Info, Scale, ListChecks, FileQuestion,
  Clock, Euro, Gauge, Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat-assistant`;

/* ── Quick topic chips ── */
const QUICK_TOPICS = [
  { label: "Kindergeld", icon: FileText },
  { label: "Stan", icon: Home },
  { label: "Posao", icon: Briefcase },
  { label: "Boravisna dozvola", icon: BookOpen },
  { label: "Ausbildung", icon: GraduationCap },
];

/* ── Intent filter chips ── */
const INTENT_FILTERS = [
  { key: "informacija", label: "Informacija", icon: Info },
  { key: "pravo", label: "Imam li pravo?", icon: Scale },
  { key: "koraci", label: "Koraci", icon: ListChecks },
  { key: "formular", label: "Formular", icon: FileQuestion },
];

/* ── Badge icon mapping ── */
const BADGE_ICONS: Record<string, typeof Clock> = {
  duration: Clock,
  cost: Euro,
  difficulty: Gauge,
  amount: Euro,
};

/* ── Response type ── */
interface StructuredResponse {
  type: string;
  title: string;
  summary: string;
  badges?: { label: string; type: string }[];
  eligibility?: string[];
  documents?: string[];
  steps?: string[];
  warnings?: string[];
  guideSlug?: string;
  formSlug?: string;
  redirect_url?: string;
  redirect_label?: string;
  relatedTopics?: { label: string; url: string }[];
  cta?: string;
  error?: string;
}

export default function PitajBalkanLink() {
  const [query, setQuery] = useState("");
  const [intentFilter, setIntentFilter] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<StructuredResponse | null>(null);
  const { language } = useLanguage();
  const inputRef = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const askAssistant = async (text: string) => {
    if (!text.trim() || loading) return;
    setLoading(true);
    setResponse(null);

    const enrichedText = intentFilter
      ? `${text} (${intentFilter === "pravo" ? "da li imam pravo" : intentFilter === "koraci" ? "koji su koraci" : intentFilter === "formular" ? "koji formular trebam" : "opce informacije"})`
      : text;

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: [{ role: "user", content: enrichedText }],
          language,
        }),
      });

      if (!resp.ok) throw new Error("Request failed");
      const data = await resp.json();

      if (data.error) {
        setResponse({ type: "error", title: "Greska", summary: data.error, steps: [], warnings: [] });
      } else {
        setResponse(data as StructuredResponse);
      }

      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 200);
    } catch {
      setResponse({
        type: "error",
        title: "Greska",
        summary: "Greska pri obradi zahtjeva. Pokusajte ponovo.",
        steps: [],
        warnings: [],
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    askAssistant(query);
  };

  return (
    <section className="relative w-full bg-gradient-to-b from-[hsl(215,55%,7%)] to-[hsl(215,50%,11%)] py-14 px-4 sm:px-6 lg:py-20">
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:32px_32px]" />

      <div className="relative z-10 mx-auto max-w-3xl">
        {/* Heading */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-4xl">
            Pitaj{" "}
            <span className="text-gold drop-shadow-[0_0_16px_rgba(255,204,0,0.35)]">
              BalkanLink
            </span>
          </h2>
          <p className="mt-2 text-sm text-white/50 sm:text-base">
            Tvoj pametan vodic kroz Njemacku — od prijave do posla.
          </p>
        </div>

        {/* Intent filter chips */}
        <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-white/30 mr-1">
            Sta zelis tacno?
          </span>
          {INTENT_FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setIntentFilter(intentFilter === f.key ? null : f.key)}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                intentFilter === f.key
                  ? "bg-gold text-gold-foreground shadow-[0_0_12px_rgba(255,204,0,0.3)]"
                  : "border border-white/10 bg-white/[0.04] text-white/50 hover:border-gold/30 hover:text-gold"
              }`}
            >
              <f.icon className="h-3 w-3" />
              {f.label}
            </button>
          ))}
        </div>

        {/* Search bar */}
        <form onSubmit={handleSubmit} className="relative">
          <div className="flex items-center rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-sm shadow-[0_4px_32px_rgba(0,0,0,0.3)] transition-all focus-within:border-gold/40 focus-within:shadow-[0_4px_32px_rgba(255,204,0,0.12)]">
            <Search className="ml-5 h-5 w-5 shrink-0 text-white/30" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Postavi pitanje... (npr. Kindergeld, stan, posao, Anmeldung)"
              className="flex-1 bg-transparent px-4 py-4 text-sm text-white placeholder:text-white/30 focus:outline-none sm:py-5 sm:text-base"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="mr-2 flex h-10 w-10 items-center justify-center rounded-xl bg-gold text-gold-foreground transition-all hover:bg-gold-light disabled:opacity-30 sm:mr-3 sm:h-11 sm:w-11"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
              )}
            </button>
          </div>
        </form>

        {/* Quick topics */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          {QUICK_TOPICS.map((topic) => (
            <button
              key={topic.label}
              onClick={() => {
                setQuery(topic.label);
                askAssistant(topic.label);
              }}
              disabled={loading}
              className="flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-white/50 transition-all hover:border-gold/30 hover:bg-gold/10 hover:text-gold disabled:opacity-40 sm:text-sm"
            >
              <topic.icon className="h-3.5 w-3.5" />
              {topic.label}
            </button>
          ))}
        </div>

        {/* ─── RESULT AREA ─── */}
        <AnimatePresence mode="wait">
          {(response || loading) && (
            <motion.div
              ref={resultRef}
              key="result"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="mt-10 space-y-4"
            >
              {loading && !response ? (
                <div className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.04] p-6 text-white/40">
                  <Loader2 className="h-5 w-5 animate-spin text-gold" />
                  <span className="text-sm">Obradujem tvoje pitanje...</span>
                </div>
              ) : response ? (
                <div className="space-y-4">
                  {/* ── HEADER CARD ── */}
                  <div className="rounded-2xl border border-white/[0.08] bg-white/[0.06] p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Sparkles className="h-4 w-4 text-gold shrink-0" />
                          <h3 className="text-lg font-bold text-white sm:text-xl truncate">
                            {response.title}
                          </h3>
                        </div>
                        <p className="text-sm text-white/60 leading-relaxed">
                          {response.summary}
                        </p>
                      </div>
                    </div>

                    {/* Badges */}
                    {response.badges && response.badges.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {response.badges.map((badge, i) => {
                          const Icon = BADGE_ICONS[badge.type] || Clock;
                          return (
                            <span
                              key={i}
                              className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.08] px-3 py-1 text-[11px] font-semibold text-white/70"
                            >
                              <Icon className="h-3 w-3 text-gold" />
                              {badge.label}
                            </span>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* ── ELIGIBILITY CARD ── */}
                  {response.eligibility && response.eligibility.length > 0 && (
                    <ResultCard
                      icon={<CheckCircle2 className="h-4 w-4" />}
                      title="Da li imas pravo?"
                      accentClass="text-emerald-400"
                      borderClass="border-emerald-500/20"
                    >
                      <ul className="space-y-2">
                        {response.eligibility.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400/70" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </ResultCard>
                  )}

                  {/* ── DOCUMENTS CARD ── */}
                  {response.documents && response.documents.length > 0 && (
                    <ResultCard
                      icon={<FolderOpen className="h-4 w-4" />}
                      title="Sta ti treba?"
                      accentClass="text-blue-400"
                      borderClass="border-blue-500/20"
                    >
                      <ul className="space-y-2">
                        {response.documents.map((doc, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                            <ClipboardList className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-400/70" />
                            <span>{doc}</span>
                          </li>
                        ))}
                      </ul>
                    </ResultCard>
                  )}

                  {/* ── STEPS CARD ── */}
                  {response.steps && response.steps.length > 0 && (
                    <ResultCard
                      icon={<Footprints className="h-4 w-4" />}
                      title="Kako ide postupak?"
                      accentClass="text-gold"
                      borderClass="border-gold/20"
                    >
                      <ol className="space-y-3">
                        {response.steps.map((step, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-white/70">
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/20 text-[11px] font-bold text-gold">
                              {i + 1}
                            </span>
                            <span className="pt-0.5">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </ResultCard>
                  )}

                  {/* ── WARNINGS CARD ── */}
                  {response.warnings && response.warnings.length > 0 && (
                    <ResultCard
                      icon={<AlertTriangle className="h-4 w-4" />}
                      title="Najcesce greske"
                      accentClass="text-amber-400"
                      borderClass="border-amber-500/20"
                    >
                      <ul className="space-y-2">
                        {response.warnings.map((w, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                            <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400/70" />
                            <span>{w}</span>
                          </li>
                        ))}
                      </ul>
                    </ResultCard>
                  )}

                  {/* ── CTA CARD ── */}
                  {(response.guideSlug || response.redirect_url) && (
                    <div className="rounded-2xl border border-gold/20 bg-gold/[0.06] p-5 sm:p-6 text-center">
                      {response.guideSlug && (
                        <>
                          <Link to={`/guide/${response.guideSlug}`}>
                            <Button className="h-12 w-full rounded-xl bg-gold text-gold-foreground font-bold text-sm hover:bg-gold-light shadow-[0_4px_20px_rgba(255,204,0,0.3)] sm:w-auto sm:px-8">
                              <FileText className="mr-2 h-4 w-4" />
                              Popuni bez greske (Smart Guide)
                            </Button>
                          </Link>
                          <p className="mt-2 text-xs text-white/40">
                            Korak-po-korak vodjenje kroz formular
                          </p>
                        </>
                      )}
                      {!response.guideSlug && response.redirect_url && (
                        <Link to={response.redirect_url}>
                          <Button className="h-12 w-full rounded-xl bg-gold text-gold-foreground font-bold text-sm hover:bg-gold-light shadow-[0_4px_20px_rgba(255,204,0,0.3)] sm:w-auto sm:px-8">
                            {response.redirect_label || "Otvori"}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      )}
                    </div>
                  )}

                  {/* ── CROSS NAVIGATION ── */}
                  {response.relatedTopics && response.relatedTopics.length > 0 && (
                    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5">
                      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/30">
                        Mozda ti treba i:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {response.relatedTopics.map((topic, i) => (
                          <Link
                            key={i}
                            to={topic.url}
                            className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs font-medium text-white/60 transition-all hover:border-gold/30 hover:text-gold hover:bg-gold/10"
                          >
                            {topic.label}
                            <ArrowRight className="h-3 w-3" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : null}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ── Reusable Result Card ── */
function ResultCard({
  icon,
  title,
  accentClass,
  borderClass,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  accentClass: string;
  borderClass: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`rounded-2xl border ${borderClass} bg-white/[0.04] p-5 sm:p-6`}>
      <div className={`mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${accentClass}`}>
        {icon}
        {title}
      </div>
      {children}
    </div>
  );
}
