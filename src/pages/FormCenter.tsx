import { useState, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Search,
  Star,
  ChevronRight,
  ArrowLeft,
  ChevronLeft,
  AlertTriangle,
  BookOpen,
  ClipboardList,
  PenLine,
  Pencil,
  MapPin,
  Hash,
  XCircle,
  MinusCircle,
  FileCheck,
  Info,
  ExternalLink,
  FileText,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { guides, getGuideBySlug, getOfficialUrl, type GuideStepCard } from "@/lib/guide-data";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

const FEATURED_SLUGS = ["kindergeld", "wohngeld", "anmeldung", "steuerklassenwechsel", "buergergeld"];

type LangKey = "de" | "bs" | "en";
const lang: LangKey = "bs";

const cardConfig: { key: keyof GuideStepCard; label: string; icon: React.ReactNode; color: string }[] = [
  { key: "whatToWrite", label: "Šta tačno upisuješ", icon: <Pencil className="h-3.5 w-3.5" />, color: "border-blue-200 bg-blue-50 dark:border-blue-900/40 dark:bg-blue-950/20" },
  { key: "whereToFind", label: "Gdje to nađeš", icon: <MapPin className="h-3.5 w-3.5" />, color: "border-emerald-200 bg-emerald-50 dark:border-emerald-900/40 dark:bg-emerald-950/20" },
  { key: "format", label: "Format", icon: <Hash className="h-3.5 w-3.5" />, color: "border-violet-200 bg-violet-50 dark:border-violet-900/40 dark:bg-violet-950/20" },
  { key: "commonMistakes", label: "Česte greške", icon: <XCircle className="h-3.5 w-3.5" />, color: "border-red-200 bg-red-50 dark:border-red-900/40 dark:bg-red-950/20" },
  { key: "whenToLeaveEmpty", label: "Kada ostaviti prazno", icon: <MinusCircle className="h-3.5 w-3.5" />, color: "border-amber-200 bg-amber-50 dark:border-amber-900/40 dark:bg-amber-950/20" },
  { key: "example", label: "Primjer popunjenog", icon: <FileCheck className="h-3.5 w-3.5" />, color: "border-cyan-200 bg-cyan-50 dark:border-cyan-900/40 dark:bg-cyan-950/20" },
];

/* ─── Guide Content (right side) ─── */
function GuideContent({ slug }: { slug: string }) {
  const guide = getGuideBySlug(slug);
  const [step, setStep] = useState(0);

  if (!guide) return null;

  const steps = guide.steps[lang];
  const current = steps[step];
  const progress = ((step + 1) / steps.length) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-heading text-xl font-extrabold sm:text-2xl">{guide.title[lang]}</h1>
        <p className="mt-1 text-xs text-muted-foreground">Izvor: {guide.authority[lang]}</p>
        {guide.formName && (
          <p className="mt-0.5 text-xs text-muted-foreground">Formular: {guide.formName[lang]}</p>
        )}
      </div>

      {/* Info blocks */}
      <div className="space-y-3">
        {guide.commonMistakes[lang].length > 0 && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 dark:border-red-900/40 dark:bg-red-950/20">
            <h3 className="mb-2 flex items-center gap-1.5 text-xs font-bold text-red-700 dark:text-red-400">
              <AlertTriangle className="h-3.5 w-3.5" /> Najčešće greške
            </h3>
            <ul className="space-y-1 pl-4 list-disc">
              {guide.commonMistakes[lang].map((m, i) => (
                <li key={i} className="text-xs text-red-600 dark:text-red-300">{m}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="rounded-2xl border border-border/60 bg-card p-4">
          <h3 className="mb-2 flex items-center gap-1.5 text-xs font-bold">
            <ClipboardList className="h-3.5 w-3.5 text-primary" /> Dokumenti
          </h3>
          <ul className="space-y-1 pl-4 list-disc">
            {guide.documents[lang].map((d, i) => (
              <li key={i} className="text-xs text-muted-foreground">{d}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-border/60 bg-card p-4">
          <h3 className="mb-2 flex items-center gap-1.5 text-xs font-bold">
            <PenLine className="h-3.5 w-3.5 text-primary" /> Ko podnosi zahtjev
          </h3>
          <p className="text-xs text-muted-foreground">{guide.who[lang]}</p>
          <p className="mt-2 text-xs">
            <span className="font-semibold">Vrijeme obrade:</span>{" "}
            <span className="text-muted-foreground">{guide.processingTime[lang]}</span>
          </p>
        </div>
      </div>

      {/* Step wizard */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Progress value={progress} className="h-2 flex-1" />
          <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">
            Korak {step + 1} / {steps.length}
          </span>
        </div>

        <div className="flex items-center gap-1 overflow-x-auto pb-2">
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              className={cn(
                "shrink-0 rounded-full px-3 py-1 text-[10px] font-medium transition",
                i === step
                  ? "bg-primary text-primary-foreground"
                  : i < step
                  ? "bg-primary/20 text-primary"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <div className="rounded-2xl border border-border/60 bg-card p-5">
          <Badge variant="outline" className="text-[10px] mb-2">
            <BookOpen className="mr-1 h-3 w-3" /> Korak {step + 1}
          </Badge>
          <h3 className="font-bold text-sm mt-1">{current.field}</h3>
          <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{current.instruction}</p>
        </div>

        {current.cards && current.cards.length > 0 && (
          <div className="grid gap-3 sm:grid-cols-2">
            {current.cards.map((card, ci) =>
              cardConfig.map(({ key, label, icon, color }) => {
                const value = card[key];
                if (!value) return null;
                return (
                  <div key={`${ci}-${key}`} className={`rounded-xl border p-4 ${color}`}>
                    <h4 className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold">
                      {icon} {label}
                    </h4>
                    <p className="text-xs leading-relaxed text-foreground/80">{value}</p>
                  </div>
                );
              })
            )}
          </div>
        )}

        <div className="flex items-center justify-between">
          <Button variant="outline" size="sm" disabled={step === 0} onClick={() => setStep(step - 1)}>
            <ChevronLeft className="mr-1 h-4 w-4" /> Nazad
          </Button>
          <Button variant="outline" size="sm" disabled={step === steps.length - 1} onClick={() => setStep(step + 1)}>
            Dalje <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>

      {getOfficialUrl(guide) && (
        <div className="rounded-2xl border border-border/60 bg-card p-5 text-center">
          <h3 className="mb-2 flex items-center justify-center gap-1.5 text-xs font-bold">
            <Info className="h-3.5 w-3.5 text-primary" /> Službene informacije
          </h3>
          <a
            href={getOfficialUrl(guide)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-primary/10 px-4 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary/20"
          >
            <ExternalLink className="h-3.5 w-3.5" /> Otvori službenu stranicu
          </a>
        </div>
      )}
    </div>
  );
}

/* ─── Main Page ─── */
export default function FormCenter() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [search, setSearch] = useState("");

  const activeSlug = slug || "";

  const filtered = useMemo(() => {
    if (!search.trim()) return guides;
    const q = search.toLowerCase();
    return guides.filter(
      (g) =>
        g.title.de.toLowerCase().includes(q) ||
        g.title.bs.toLowerCase().includes(q) ||
        g.slug.includes(q)
    );
  }, [search]);

  const featured = useMemo(() => guides.filter((g) => FEATURED_SLUGS.includes(g.slug)), []);

  const handleSelect = (s: string) => {
    navigate(`/formulari/${s}`);
  };

  // Mobile: if a slug is selected, show only the guide
  if (isMobile && activeSlug) {
    return (
      <div className="px-4 py-6">
        <button
          onClick={() => navigate("/formulari")}
          className="mb-4 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-3 w-3" /> Svi formulari
        </button>
        <GuideContent key={activeSlug} slug={activeSlug} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      {/* Page title */}
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-extrabold sm:text-3xl">
          Formulari – Smart Guide
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Svi formulari na jednom mjestu. Odaberi formular i prati upute korak po korak.
        </p>
      </div>

      {/* Featured */}
      {!activeSlug && (
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {featured.map((g) => (
            <button
              key={g.slug}
              onClick={() => handleSelect(g.slug)}
              className="group flex flex-col items-center gap-2 rounded-2xl border border-gold/30 bg-gradient-to-b from-gold/5 to-transparent p-4 text-center transition-all hover:border-gold/60 hover:shadow-md"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10 text-gold transition-colors group-hover:bg-gold/20">
                <Star className="h-5 w-5" strokeWidth={1.6} />
              </div>
              <span className="text-xs font-bold leading-tight">{g.title.de}</span>
            </button>
          ))}
        </div>
      )}

      <div className="flex gap-6">
        {/* ─── Sidebar ─── */}
        <aside
          className={cn(
            "shrink-0",
            isMobile ? "hidden" : "sticky top-20 self-start w-72"
          )}
        >
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Pretraži formular (npr. Kindergeld, Anmeldung…)"
              className="pl-9 h-10 text-sm rounded-xl border-border/60 bg-card"
            />
          </div>

          <ScrollArea className="h-[calc(100vh-12rem)]">
            <nav className="space-y-1 pr-2">
              {filtered.map((g) => {
                const isActive = g.slug === activeSlug;
                return (
                  <button
                    key={g.slug}
                    onClick={() => handleSelect(g.slug)}
                    className={cn(
                      "w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-all",
                      isActive
                        ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                        : "text-foreground/80 hover:bg-accent hover:text-foreground"
                    )}
                  >
                    <FileText className={cn("h-4 w-4 shrink-0", isActive ? "text-primary-foreground" : "text-muted-foreground")} />
                    <span className="truncate">{g.title.de}</span>
                  </button>
                );
              })}
              {filtered.length === 0 && (
                <p className="px-3 py-6 text-xs text-muted-foreground text-center">Nema rezultata.</p>
              )}
            </nav>
          </ScrollArea>
        </aside>

        {/* ─── Main content ─── */}
        <main className="min-w-0 flex-1">
          {activeSlug ? (
            <GuideContent key={activeSlug} slug={activeSlug} />
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              {/* Mobile: show search + list */}
              {isMobile ? (
                <div className="w-full space-y-3">
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Pretraži formular…"
                      className="pl-9 h-10 text-sm rounded-xl border-border/60 bg-card"
                    />
                  </div>
                  {filtered.map((g) => (
                    <button
                      key={g.slug}
                      onClick={() => handleSelect(g.slug)}
                      className="w-full flex items-center gap-3 rounded-xl border border-border/40 bg-card px-4 py-3 text-left text-sm transition hover:border-gold/40 hover:shadow-sm"
                    >
                      <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
                      <div className="min-w-0">
                        <p className="font-semibold truncate">{g.title.de}</p>
                        <p className="text-[11px] text-muted-foreground truncate">{g.title.bs}</p>
                      </div>
                      <ChevronRight className="ml-auto h-4 w-4 shrink-0 text-muted-foreground" />
                    </button>
                  ))}
                </div>
              ) : (
                <>
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/5 mb-6">
                    <FileText className="h-10 w-10 text-primary/40" />
                  </div>
                  <h2 className="text-lg font-bold text-foreground/70">Odaberi formular</h2>
                  <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                    Klikni na bilo koji formular s lijeve strane da vidiš detaljne upute za popunjavanje.
                  </p>
                </>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
