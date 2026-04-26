import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  GraduationCap,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  FileText,
  Database,
  Euro,
  Clock,
  Lock,
  Crown,
  ArrowRight,
  Info,
  BookOpen,
  Sparkles,
  MapPin,
  Mail,
  Copy,
  Download,
  Building2,
} from "lucide-react";
import { toast } from "sonner";
import { SEO } from "@/components/SEO";
import PageNavBar from "@/components/navigation/PageNavBar";
import { usePremiumAccess } from "@/hooks/usePremiumAccess";
import { useAuth } from "@/contexts/AuthContext";
import { navigateBackOrHome } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import {
  COUNTRIES,
  PROFESSIONS,
  ANABIN_STATUS,
  ANERKENNUNGSZUSCHUSS,
  OFFICIAL_PORTALS,
  type Country,
  type Regulation,
} from "@/lib/anerkennung-data";
import {
  BUNDESLAENDER,
  getAuthority,
  ZAB_FALLBACK,
} from "@/lib/anerkennung-bundeslaender";
import {
  generateAnerkennungEmail,
  type EmailTemplateInput,
} from "@/lib/anerkennung-email-templates";

/* ──────────── Helpers ──────────── */

function RegulationBadge({ reg }: { reg: Regulation }) {
  if (reg === "REG") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/10 px-2 py-0.5 text-[10px] font-bold uppercase text-rose-600 dark:text-rose-400">
        <AlertTriangle className="h-3 w-3" /> Reglementovano
      </span>
    );
  }
  if (reg === "PARTIAL") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold uppercase text-amber-600 dark:text-amber-400">
        <Info className="h-3 w-3" /> Djelimično
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-600 dark:text-emerald-400">
      <CheckCircle2 className="h-3 w-3" /> Nicht-reglementiert
    </span>
  );
}

function SectionCard({
  icon,
  title,
  children,
  tone = "default",
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  tone?: "default" | "gold" | "warning";
}) {
  const toneClasses = {
    default: "border-border/40 bg-card",
    gold: "border-[hsl(var(--gold))]/30 bg-[hsl(var(--gold))]/5",
    warning: "border-amber-500/30 bg-amber-500/5",
  };
  return (
    <section className={cn("rounded-2xl border p-5 sm:p-6", toneClasses[tone])}>
      <div className="flex items-center gap-3 mb-4">
        <div className="h-9 w-9 rounded-xl bg-[hsl(var(--gold))]/10 ring-1 ring-[hsl(var(--gold))]/20 flex items-center justify-center text-[hsl(var(--gold))]">
          {icon}
        </div>
        <h3 className="text-base sm:text-lg font-bold text-foreground">{title}</h3>
      </div>
      {children}
    </section>
  );
}

/* ──────────── Premium Paywall ──────────── */

function AnerkennungPaywall() {
  const navigate = useNavigate();
  return (
    <div className="mx-auto max-w-2xl py-10">
      <div className="rounded-3xl border border-[hsl(var(--gold))]/30 bg-gradient-to-br from-[hsl(var(--gold))]/5 to-background p-8 text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[hsl(var(--gold))]/10 ring-1 ring-[hsl(var(--gold))]/30">
          <Lock className="h-8 w-8 text-[hsl(var(--gold))]" />
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-foreground">
          Anerkennung Navigator
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Asistent za priznavanje diplome iz BiH, Hrvatske, Srbije, Crne Gore,
          Sjeverne Makedonije i Kosova
        </p>

        <div className="mt-6 grid gap-3 text-left">
          {[
            "Dijagnostika tvog slučaja po zemlji, profesiji i Bundeslandu",
            "Roadmap za 10 najtraženijih zanimanja (medicina, inženjeri, učitelji…)",
            "Vodič za Anabin bazu na bosanskom — šta znače H+, H−, gleichwertig",
            "Spisak svih dokumenata + Apostille + sudski tumač",
            "Procijenjeno trajanje i troškovi po profesiji",
            "Anerkennungszuschuss — kako dobiti državnu finansijsku pomoć",
            "Direktni linkovi na nadležne ustanove (Profi-Filter)",
          ].map((b) => (
            <div key={b} className="flex items-start gap-2 text-sm">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
              <span className="text-foreground/90">{b}</span>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate("/paketi")}
          className="mt-6 w-full rounded-full py-3 text-sm font-bold text-white"
          style={{
            background:
              "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--gold-dark)))",
          }}
        >
          <Crown className="inline-block mr-1.5 h-4 w-4" />
          Otključaj Premium — 9.99 €/mj.
        </button>

        <p className="mt-3 text-[11px] text-muted-foreground">
          Pravno bezbjedan informativni alat — sve informacije bazirane na
          službenim njemačkim izvorima (Anabin, BIBB, BMFTR, ZAB).
        </p>
      </div>
    </div>
  );
}

/* ──────────── Main Page ──────────── */

export default function AnerkennungNavigator() {
  const navigate = useNavigate();
  const { isPremium } = usePremiumAccess();
  const { displayName } = useAuth();

  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedProfession, setSelectedProfession] = useState<string | null>(null);
  const [bundesland, setBundesland] = useState<string>("");
  const [emailFullName, setEmailFullName] = useState<string>(displayName || "");
  const [emailVisible, setEmailVisible] = useState(false);

  const profession = useMemo(
    () => PROFESSIONS.find((p) => p.id === selectedProfession) || null,
    [selectedProfession]
  );
  const country = useMemo(
    () => COUNTRIES.find((c) => c.code === selectedCountry) || null,
    [selectedCountry]
  );
  const bundeslandObj = useMemo(
    () => BUNDESLAENDER.find((b) => b.code === bundesland) || null,
    [bundesland]
  );
  const authority = useMemo(() => {
    if (!profession || !bundesland) return null;
    return getAuthority(profession.id, bundesland) || ZAB_FALLBACK;
  }, [profession, bundesland]);

  const generatedEmail = useMemo(() => {
    if (!profession || !country || !bundeslandObj || !emailFullName.trim()) return null;
    const input: EmailTemplateInput = {
      fullName: emailFullName.trim(),
      professionDE: profession.nameDE,
      professionLocal: profession.name,
      countryOfOrigin: country.name,
      bundesland: bundeslandObj.name,
      regulation: profession.regulation,
      requiresLanguageExam: profession.requiresLanguageExam,
    };
    return generateAnerkennungEmail(input);
  }, [profession, country, bundeslandObj, emailFullName]);

  const copyEmail = () => {
    if (!generatedEmail) return;
    const fullText = `${generatedEmail.subject}\n\n${generatedEmail.body}`;
    navigator.clipboard.writeText(fullText);
    toast.success("Email kopiran u clipboard");
  };

  const downloadEmail = () => {
    if (!generatedEmail) return;
    const fullText = `Betreff: ${generatedEmail.subject}\n\n${generatedEmail.body}\n\n\n────────────────────────────────────\n${generatedEmail.bsTranslation}`;
    const blob = new Blob([fullText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Anerkennung-Email-${profession?.id || "bewerbung"}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Email preuzet");
  };

  const handleBack = () => navigateBackOrHome(navigate);
  const resetWizard = () => {
    setSelectedCountry(null);
    setSelectedProfession(null);
    setBundesland("");
    setEmailVisible(false);
  };

  // Premium gate
  if (!isPremium) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-6 min-h-screen">
        <SEO
          title="Anerkennung Navigator — Priznavanje diplome u Njemačkoj"
          description="Asistent za priznavanje diplome iz BiH, Hrvatske, Srbije, Crne Gore, Sjeverne Makedonije i Kosova. Anabin baza, roadmap po profesiji, Anerkennungszuschuss."
          path="/anerkennung-navigator"
        />
        <PageNavBar onBack={handleBack} />
        <div className="mb-6">
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-foreground flex items-center gap-3">
            <GraduationCap className="h-7 w-7 text-[hsl(var(--gold))]" />
            Anerkennung Navigator
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Priznavanje diplome iz zemalja bivše Jugoslavije u Njemačkoj
          </p>
        </div>
        <AnerkennungPaywall />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 min-h-screen">
      <SEO
        title="Anerkennung Navigator — Priznavanje diplome u Njemačkoj"
        description="Asistent za priznavanje diplome iz BiH, Hrvatske, Srbije, Crne Gore, Sjeverne Makedonije i Kosova. Anabin baza, roadmap po profesiji, Anerkennungszuschuss."
        path="/anerkennung-navigator"
      />

      <PageNavBar onBack={handleBack} />

      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-10 rounded-xl bg-[hsl(var(--gold))]/10 ring-1 ring-[hsl(var(--gold))]/20 flex items-center justify-center">
            <GraduationCap className="h-5 w-5 text-[hsl(var(--gold))]" />
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-foreground">
            Anerkennung Navigator
          </h1>
          <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-[hsl(var(--gold))]/10 px-2.5 py-1 text-[10px] font-bold uppercase text-[hsl(var(--gold))]">
            <Crown className="h-3 w-3" /> Premium
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          Priznavanje diplome i zanimanja iz BiH, HR, SR, CG, MK, XK
        </p>
        <div className="h-px mt-4 mb-6 bg-border/40" />
      </div>

      {/* Disclaimer — pravna zaštita */}
      <div className="mb-6 rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-xs sm:text-sm text-amber-700 dark:text-amber-300">
        <div className="flex items-start gap-2">
          <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
          <div>
            <strong className="block mb-1">Informativni alat — nije pravni savjet</strong>
            Sve informacije su preuzete iz javno dostupnih službenih njemačkih
            izvora (Anabin, BIBB, BMFTR, ZAB) i orijentacionog su karaktera.
            Konačnu odluku o priznavanju donosi isključivo nadležna ustanova
            tvog Bundeslanda. Stand: 2026.
          </div>
        </div>
      </div>

      {/* ────────── STEP 1: Country ────────── */}
      {!selectedCountry && (
        <section className="space-y-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[hsl(var(--gold))] mb-3">
              Korak 1 od 3
            </p>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
              Iz koje zemlje je tvoja diploma?
            </h2>
            <p className="text-sm text-muted-foreground">
              Procedura se razlikuje za EU i ne-EU diplome.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {COUNTRIES.map((c) => (
              <button
                key={c.code}
                onClick={() => setSelectedCountry(c.code)}
                className="group flex items-center gap-4 rounded-2xl border border-border/40 bg-card p-4 text-left transition hover:border-[hsl(var(--gold))]/40 hover:shadow-md"
              >
                <span className="text-3xl">{c.flag}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-foreground">{c.name}</p>
                  <p className="text-[11px] text-muted-foreground">
                    {c.euMember ? "🇪🇺 EU članica" : "Treća zemlja"}
                  </p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-[hsl(var(--gold))]" />
              </button>
            ))}
          </div>
        </section>
      )}

      {/* ────────── STEP 2: Profession ────────── */}
      {selectedCountry && !selectedProfession && country && (
        <section className="space-y-6">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[hsl(var(--gold))] mb-2">
                Korak 2 od 3
              </p>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-1 flex items-center gap-2">
                <span>{country.flag}</span> Tvoja profesija
              </h2>
              <p className="text-sm text-muted-foreground">
                Top 10 najtraženijih zanimanja prema ZAB statistici 2024.
              </p>
            </div>
            <button
              onClick={() => setSelectedCountry(null)}
              className="text-xs font-semibold text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              <ChevronLeft className="h-3 w-3" /> Promijeni zemlju
            </button>
          </div>

          {/* Country specific note */}
          <div className="rounded-xl border border-border/40 bg-muted/30 p-4 text-xs text-muted-foreground">
            <strong className="text-foreground">{country.name}: </strong>
            {country.notes}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {PROFESSIONS.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedProfession(p.id)}
                className="group rounded-2xl border border-border/40 bg-card p-4 text-left transition hover:border-[hsl(var(--gold))]/40 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-foreground truncate">{p.name}</p>
                    <p className="text-[11px] text-muted-foreground italic truncate">
                      {p.nameDE}
                    </p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-[hsl(var(--gold))] shrink-0 mt-1" />
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <RegulationBadge reg={p.regulation} />
                  <span className="text-[10px] text-muted-foreground">
                    {p.category}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* ────────── STEP 3: Bundesland ────────── */}
      {selectedCountry && selectedProfession && !bundesland && profession && country && (
        <section className="space-y-6">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[hsl(var(--gold))] mb-2">
                Korak 3 od 4
              </p>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-1 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-[hsl(var(--gold))]" />
                U kojem Bundeslandu želiš raditi?
              </h2>
              <p className="text-sm text-muted-foreground">
                Nadležna ustanova zavisi od Bundeslanda. Birajte gdje planirate
                raditi (a ne gdje trenutno živite, ako se razlikuje).
              </p>
            </div>
            <button
              onClick={() => setSelectedProfession(null)}
              className="text-xs font-semibold text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              <ChevronLeft className="h-3 w-3" /> Promijeni profesiju
            </button>
          </div>

          <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {BUNDESLAENDER.map((b) => (
              <button
                key={b.code}
                onClick={() => setBundesland(b.code)}
                className="group rounded-xl border border-border/40 bg-card p-3 text-left transition hover:border-[hsl(var(--gold))]/40 hover:shadow-md"
              >
                <p className="font-bold text-foreground text-sm">{b.name}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  {b.capital}
                </p>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* ────────── STEP 4: Result roadmap ────────── */}
      {profession && country && bundesland && (
        <section className="space-y-6">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[hsl(var(--gold))] mb-2">
                Korak 4 od 4 — Rezultat
              </p>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2 flex-wrap">
                <span>{country.flag}</span>
                <span>{profession.name}</span>
              </h2>
              <p className="text-sm text-muted-foreground italic">
                {profession.nameDE}
              </p>
              {bundeslandObj && (
                <p className="mt-1 text-xs text-muted-foreground flex items-center gap-1.5">
                  <MapPin className="h-3 w-3" /> {bundeslandObj.name}
                  <button
                    onClick={() => setBundesland("")}
                    className="ml-1 text-[hsl(var(--gold))] hover:underline"
                  >
                    promijeni
                  </button>
                </p>
              )}
            </div>
            <button
              onClick={resetWizard}
              className="text-xs font-semibold text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              <ChevronLeft className="h-3 w-3" /> Nova provjera
            </button>
          </div>

          {/* Diagnostic summary */}
          <div className="rounded-2xl border border-[hsl(var(--gold))]/30 bg-gradient-to-br from-[hsl(var(--gold))]/5 to-transparent p-5">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <Sparkles className="h-4 w-4 text-[hsl(var(--gold))]" />
              <p className="text-xs font-bold uppercase tracking-wider text-[hsl(var(--gold))]">
                Tvoj slučaj
              </p>
              <RegulationBadge reg={profession.regulation} />
              {country.euMember && (
                <span className="rounded-full bg-blue-500/10 px-2 py-0.5 text-[10px] font-bold uppercase text-blue-600 dark:text-blue-400">
                  🇪🇺 EU diploma
                </span>
              )}
            </div>
            <p className="text-sm text-foreground/90 leading-relaxed">
              {profession.description}
            </p>
            {profession.regulation === "REG" && (
              <p className="mt-3 text-xs text-rose-700 dark:text-rose-300">
                <strong>OBAVEZNO:</strong> Bez formalnog priznavanja NE smiješ
                obavljati ovo zanimanje u Njemačkoj.
              </p>
            )}
            {profession.regulation === "NREG" && (
              <p className="mt-3 text-xs text-emerald-700 dark:text-emerald-300">
                <strong>DOBRA VIJEST:</strong> Možeš odmah početi raditi i bez
                priznavanja. Priznavanje je preporučljivo za bolji status i platu.
              </p>
            )}
            {profession.notes && (
              <p className="mt-3 text-xs text-muted-foreground">
                <Info className="inline h-3 w-3 mr-1" />
                {profession.notes}
              </p>
            )}
          </div>

          {/* Quick stats */}
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-border/40 bg-card p-4">
              <Clock className="h-4 w-4 text-[hsl(var(--gold))] mb-2" />
              <p className="text-[11px] text-muted-foreground uppercase font-semibold">
                Trajanje
              </p>
              <p className="text-sm font-bold text-foreground mt-1">
                {profession.durationRange}
              </p>
            </div>
            <div className="rounded-xl border border-border/40 bg-card p-4">
              <Euro className="h-4 w-4 text-[hsl(var(--gold))] mb-2" />
              <p className="text-[11px] text-muted-foreground uppercase font-semibold">
                Troškovi
              </p>
              <p className="text-sm font-bold text-foreground mt-1">
                {profession.costRange}
              </p>
            </div>
            <div className="rounded-xl border border-border/40 bg-card p-4">
              <BookOpen className="h-4 w-4 text-[hsl(var(--gold))] mb-2" />
              <p className="text-[11px] text-muted-foreground uppercase font-semibold">
                Jezik
              </p>
              <p className="text-sm font-bold text-foreground mt-1">
                {profession.requiresLanguageExam
                  ? "Obavezna provjera (B2/C1)"
                  : "Nije obavezna"}
              </p>
            </div>
          </div>

          {/* Steps */}
          <SectionCard
            icon={<ArrowRight className="h-5 w-5" />}
            title="Koraci postupka"
          >
            <ol className="space-y-3">
              {profession.steps.map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[hsl(var(--gold))]/10 text-[11px] font-bold text-[hsl(var(--gold))]">
                    {i + 1}
                  </span>
                  <span className="text-sm text-foreground/90 pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </SectionCard>

          {/* Documents */}
          <SectionCard
            icon={<FileText className="h-5 w-5" />}
            title="Potrebni dokumenti"
          >
            <ul className="grid gap-2 sm:grid-cols-2">
              {profession.documents.map((doc) => (
                <li key={doc} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-1" />
                  <span className="text-foreground/90">{doc}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 rounded-lg bg-amber-500/5 border border-amber-500/20 p-3 text-xs text-amber-700 dark:text-amber-300">
              <strong>📌 Apostille:</strong> Sva originalna dokumenta iz BiH/HR/SR/CG/MK/XK
              moraju biti opremljena Haškim apostille-om prije prevoda. Apostille se
              dobija u sudu / ministarstvu pravde zemlje porijekla.
              <br />
              <strong className="block mt-2">📌 Prevod:</strong> Prevode mogu raditi
              SAMO sudski tumači (vereidigte/öffentlich bestellte Übersetzer)
              registrovani u Njemačkoj. Lista je javna na justiz.de.
            </div>
          </SectionCard>

          {/* Anabin guide */}
          <SectionCard
            icon={<Database className="h-5 w-5" />}
            title="Kako koristiti Anabin bazu"
            tone="gold"
          >
            <p className="text-sm text-foreground/90 mb-4">
              Anabin (anabin.kmk.org) je službena baza za vrednovanje stranih
              diploma u Njemačkoj. Dostupna je samo na njemačkom — evo vodiča na
              bosanskom.
            </p>

            <div className="space-y-4">
              <div>
                <p className="text-xs font-bold uppercase text-foreground mb-2">
                  📚 Statusi institucija (univerziteta / škola)
                </p>
                <ul className="space-y-2">
                  {ANABIN_STATUS.institutions.map((s) => (
                    <li
                      key={s.code}
                      className="rounded-lg border border-border/40 bg-card p-3 text-xs"
                    >
                      <strong className="text-[hsl(var(--gold))]">
                        {s.title}
                      </strong>
                      <p className="text-muted-foreground mt-1">{s.description}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-xs font-bold uppercase text-foreground mb-2">
                  🎓 Statusi diploma (vrednovanje)
                </p>
                <ul className="space-y-2">
                  {ANABIN_STATUS.diplomas.map((s) => (
                    <li
                      key={s.code}
                      className="rounded-lg border border-border/40 bg-card p-3 text-xs"
                    >
                      <strong className="text-[hsl(var(--gold))]">
                        {s.title}
                      </strong>
                      <p className="text-muted-foreground mt-1">{s.description}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="https://anabin.kmk.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-[hsl(var(--gold))] hover:underline"
              >
                Otvori Anabin bazu <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </SectionCard>

          {/* Anerkennungszuschuss */}
          <SectionCard
            icon={<Euro className="h-5 w-5" />}
            title="Anerkennungszuschuss — državna pomoć"
            tone="gold"
          >
            <p className="text-sm text-foreground/90 mb-4">
              {ANERKENNUNGSZUSCHUSS.description}
            </p>

            <div className="grid gap-4 sm:grid-cols-2 mb-4">
              <div>
                <p className="text-xs font-bold uppercase text-foreground mb-2">
                  ✅ Imaš pravo ako:
                </p>
                <ul className="space-y-1">
                  {ANERKENNUNGSZUSCHUSS.eligibility.map((e) => (
                    <li
                      key={e}
                      className="text-xs text-foreground/80 flex items-start gap-2"
                    >
                      <CheckCircle2 className="h-3 w-3 text-emerald-500 shrink-0 mt-0.5" />
                      {e}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-bold uppercase text-foreground mb-2">
                  💰 Šta pokriva:
                </p>
                <ul className="space-y-1">
                  {ANERKENNUNGSZUSCHUSS.whatItCovers.map((w) => (
                    <li
                      key={w}
                      className="text-xs text-foreground/80 flex items-start gap-2"
                    >
                      <CheckCircle2 className="h-3 w-3 text-emerald-500 shrink-0 mt-0.5" />
                      {w}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <p className="text-xs font-bold uppercase text-foreground mb-2">
                📋 Kako podnijeti zahtjev:
              </p>
              <ol className="space-y-1 mb-4">
                {ANERKENNUNGSZUSCHUSS.howToApply.map((step, i) => (
                  <li
                    key={step}
                    className="text-xs text-foreground/80 flex items-start gap-2"
                  >
                    <span className="font-bold text-[hsl(var(--gold))]">{i + 1}.</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-lg bg-amber-500/5 border border-amber-500/20 p-3 text-xs text-amber-700 dark:text-amber-300 mb-4">
              <AlertTriangle className="inline h-3 w-3 mr-1" />
              {ANERKENNUNGSZUSCHUSS.important}
            </div>

            <div className="flex flex-wrap gap-2">
              {ANERKENNUNGSZUSCHUSS.officialLinks.map((l) => (
                <a
                  key={l.url}
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border/40 bg-card px-3 py-1.5 text-[11px] font-semibold text-foreground hover:border-[hsl(var(--gold))]/40"
                >
                  {l.label} <ExternalLink className="h-3 w-3" />
                </a>
              ))}
            </div>
          </SectionCard>

          {/* Nadležna ustanova za Bundesland */}
          {authority && bundeslandObj && (
            <SectionCard
              icon={<Building2 className="h-5 w-5" />}
              title={`Nadležna ustanova — ${bundeslandObj.name}`}
              tone="gold"
            >
              <div className="rounded-xl border border-border/40 bg-card p-4">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[hsl(var(--gold))] mb-1">
                  {authority.authorityType}
                </p>
                <p className="text-sm font-bold text-foreground mb-2">
                  {authority.name}
                </p>
                {authority.notes && (
                  <p className="text-xs text-muted-foreground mb-3">
                    {authority.notes}
                  </p>
                )}
                <a
                  href={authority.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[hsl(var(--gold))]/10 px-3 py-1.5 text-xs font-semibold text-[hsl(var(--gold))] hover:bg-[hsl(var(--gold))]/20"
                >
                  Otvori službenu stranicu <ExternalLink className="h-3 w-3" />
                </a>
              </div>
              <p className="mt-3 text-[11px] text-muted-foreground">
                💡 Savjet: koristi i službeni{" "}
                <a
                  href="https://berater.anerkennung-in-deutschland.de/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[hsl(var(--gold))] hover:underline"
                >
                  Profi-Filter (BIBB)
                </a>{" "}
                za dodatnu provjeru i kontakt podatke (telefon, email).
              </p>
            </SectionCard>
          )}

          {/* Email generator */}
          <SectionCard
            icon={<Mail className="h-5 w-5" />}
            title="Email šablon — prvi kontakt sa ustanovom"
            tone="gold"
          >
            <p className="text-sm text-foreground/90 mb-4">
              Spreman email na njemačkom jeziku za slanje nadležnoj ustanovi.
              Unesi svoje ime i klikni <strong>Generiši</strong>.
            </p>

            <div className="grid gap-3 sm:grid-cols-[1fr_auto] mb-4">
              <input
                type="text"
                value={emailFullName}
                onChange={(e) => setEmailFullName(e.target.value)}
                placeholder="Tvoje ime i prezime"
                className="rounded-lg border border-border/40 bg-card px-4 py-2.5 text-sm focus:border-[hsl(var(--gold))]/60 focus:outline-none"
              />
              <button
                onClick={() => setEmailVisible(true)}
                disabled={!emailFullName.trim()}
                className="rounded-lg bg-[hsl(var(--gold))] px-5 py-2.5 text-sm font-bold text-[hsl(var(--primary))] disabled:opacity-50 hover:opacity-90"
              >
                Generiši email
              </button>
            </div>

            {emailVisible && generatedEmail && (
              <div className="space-y-4">
                <div className="rounded-xl border border-border/40 bg-muted/30 p-4">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    Betreff (naslov)
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    {generatedEmail.subject}
                  </p>
                </div>

                <div className="rounded-xl border border-border/40 bg-card p-4">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
                    Tekst (njemački — kopiraj i pošalji)
                  </p>
                  <pre className="whitespace-pre-wrap text-xs text-foreground/90 font-sans leading-relaxed">
                    {generatedEmail.body}
                  </pre>
                </div>

                <details className="rounded-xl border border-border/40 bg-muted/20 p-4">
                  <summary className="cursor-pointer text-xs font-bold text-foreground">
                    📖 Prikaži prevod na bosanski (samo za tvoje razumijevanje)
                  </summary>
                  <pre className="mt-3 whitespace-pre-wrap text-xs text-foreground/80 font-sans leading-relaxed">
                    {generatedEmail.bsTranslation}
                  </pre>
                </details>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={copyEmail}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border/40 bg-card px-4 py-2 text-xs font-semibold text-foreground hover:border-[hsl(var(--gold))]/40"
                  >
                    <Copy className="h-3.5 w-3.5" /> Kopiraj email
                  </button>
                  <button
                    onClick={downloadEmail}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border/40 bg-card px-4 py-2 text-xs font-semibold text-foreground hover:border-[hsl(var(--gold))]/40"
                  >
                    <Download className="h-3.5 w-3.5" /> Preuzmi (.txt)
                  </button>
                </div>

                <div className="rounded-lg bg-amber-500/5 border border-amber-500/20 p-3 text-xs text-amber-700 dark:text-amber-300">
                  <AlertTriangle className="inline h-3 w-3 mr-1" />
                  Šablon je informativni alat — prilagodi ga svojoj situaciji.
                  Provjeri kontakt-email nadležne ustanove na njihovoj službenoj
                  stranici prije slanja.
                </div>
              </div>
            )}
          </SectionCard>

          {/* Official links */}
          <SectionCard
            icon={<ExternalLink className="h-5 w-5" />}
            title="Službeni izvori za ovu profesiju"
          >
            <div className="grid gap-2">
              {profession.officialLinks.map((l) => (
                <a
                  key={l.url}
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-3 rounded-lg border border-border/40 bg-card p-3 text-sm hover:border-[hsl(var(--gold))]/40"
                >
                  <span className="text-foreground/90">{l.label}</span>
                  <ExternalLink className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                </a>
              ))}
            </div>
          </SectionCard>
        </section>
      )}

      {/* ────────── Always at bottom: official portals ────────── */}
      <div className="mt-10 pt-8 border-t border-border/40">
        <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">
          📚 Svi službeni izvori (uvijek aktuelno)
        </h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {OFFICIAL_PORTALS.map((p) => (
            <a
              key={p.url}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl border border-border/40 bg-card p-3 text-sm hover:border-[hsl(var(--gold))]/40"
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <p className="font-bold text-foreground">{p.name}</p>
                <ExternalLink className="h-3.5 w-3.5 text-muted-foreground group-hover:text-[hsl(var(--gold))] shrink-0" />
              </div>
              <p className="text-[11px] text-muted-foreground">{p.description}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
