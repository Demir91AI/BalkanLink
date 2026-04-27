/**
 * /anerkennung-fakulteti
 *
 * Detaljan vodič za priznavanje AKADEMSKIH diploma sa Balkana
 * (Bachelor, Master, Magistar, Doktor). Fokus: ZAB Zeugnisbewertung,
 * Anabin H+/H+/-/H- statusi, konkretni primjeri sa univerziteta
 * iz BiH, Hrvatske, Srbije, Crne Gore, Sjeverne Makedonije, Kosova.
 *
 * Razlika od /anerkennung-navigator:
 *  - Navigator pokriva REGLEMENTOVANA zanimanja (ljekar, sestra, učitelj…)
 *  - Ova stranica pokriva NEREGLEMENTOVANA akademska zvanja (ekonomista,
 *    pravnik, filolog, IT inženjer…) gdje je dovoljan ZAB Zeugnisbewertung.
 *
 * Sadržaj je informativan i baziran na javnim izvorima (ZAB, Anabin, BIBB).
 * Stand: 2026.
 *
 * Premium-gated. Free preview: uvod + 2 koraka, ostalo iza paywalla.
 */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  GraduationCap,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  FileText,
  Euro,
  Clock,
  Lock,
  Crown,
  Info,
  Search,
  Building2,
  ListOrdered,
  Sparkles,
  ChevronDown,
  ChevronUp,
  BookOpen,
} from "lucide-react";
import { SEO } from "@/components/SEO";
import PageNavBar from "@/components/navigation/PageNavBar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { usePremiumAccess } from "@/hooks/usePremiumAccess";
import { navigateBackOrHome } from "@/lib/navigation";
import { cn } from "@/lib/utils";

/* ──────────── Tipovi ──────────── */

interface UniExample {
  uni: string;
  country: string; // emoji + ime
  status: "H+" | "H+/-" | "H-";
  notes: string;
  diplomaExample: string;
  germanEquivalent: string;
}

interface FacultyCase {
  id: string;
  faculty: string;
  germanField: string;
  reglementiert: boolean;
  whatToDo: string;
  examples: UniExample[];
  tip?: string;
}

/* ──────────── Podaci: tipični fakulteti i primjeri ──────────── */

const FACULTY_CASES: FacultyCase[] = [
  {
    id: "ekonomski",
    faculty: "Ekonomski fakultet",
    germanField: "Wirtschaftswissenschaften / Betriebswirtschaftslehre (BWL)",
    reglementiert: false,
    whatToDo:
      "NIJE reglementovano. Dovoljan je ZAB Zeugnisbewertung (208 €) za prikaz diplome poslodavcu. Za rad u banci, kontrolingu, marketingu — ne treba ti ništa više.",
    examples: [
      {
        uni: "Ekonomski fakultet, Univerzitet u Sarajevu",
        country: "🇧🇦 BiH",
        status: "H+",
        notes:
          "H+ status u Anabinu. Diplome se priznaju kao ekvivalent njemačkim Bachelor/Master diplomama.",
        diplomaExample: "Bachelor (240 ECTS) — Smjer: Menadžment",
        germanEquivalent: "Bachelor of Arts in Wirtschaftswissenschaften",
      },
      {
        uni: "Ekonomski fakultet, Univerzitet u Beogradu",
        country: "🇷🇸 Srbija",
        status: "H+",
        notes: "Priznat kao državno akreditovani univerzitet.",
        diplomaExample: "Diplomirani ekonomista (4 godine, 240 ECTS)",
        germanEquivalent: "Bachelor of Science in Economics",
      },
      {
        uni: "Ekonomski fakultet, Sveučilište u Zagrebu",
        country: "🇭🇷 Hrvatska",
        status: "H+",
        notes: "EU diploma — automatsko priznavanje za većinu poslova.",
        diplomaExample: "Magistar ekonomije (Mag. oec.)",
        germanEquivalent: "Master of Science in Wirtschaftswissenschaften",
      },
    ],
    tip: "Ako radiš u IT/finansije/marketing — poslodavci često ne traže ni Zeugnisbewertung. Dovoljan je prevod diplome od Stalnog sudskog tumača za njemački jezik.",
  },
  {
    id: "pravni",
    faculty: "Pravni fakultet",
    germanField: "Rechtswissenschaften (Jura)",
    reglementiert: true,
    whatToDo:
      "REGLEMENTOVANO ako želiš raditi kao Rechtsanwalt/Notar/Richter. Treba ti Eignungsprüfung (provjera sposobnosti) ILI puni studij njemačkog prava + 2× Staatsexamen. Za pravni savjetnik (Wirtschaftsjurist), pravnik u firmi (In-House) — dovoljan je ZAB Zeugnisbewertung.",
    examples: [
      {
        uni: "Pravni fakultet, Univerzitet u Sarajevu",
        country: "🇧🇦 BiH",
        status: "H+",
        notes:
          "Diploma se priznaje kao Bachelor/Master, ali za rad kao odvjetnik u Njemačkoj treba Eignungsprüfung.",
        diplomaExample: "Diplomirani pravnik (4+1, 300 ECTS)",
        germanEquivalent: "Master of Laws (LL.M.) — bez prava bavljenja advokaturom",
      },
      {
        uni: "Pravni fakultet, Sveučilište u Zagrebu",
        country: "🇭🇷 Hrvatska",
        status: "H+",
        notes:
          "EU diploma. Olakšano priznavanje preko EU direktive 2005/36/EG za odvjetnike.",
        diplomaExample: "Magistar prava",
        germanEquivalent: "Master of Laws — uz Eignungsprüfung priznat za njemačku advokaturu",
      },
    ],
    tip: "Bez 2× Staatsexamen ne možeš biti Richter/Staatsanwalt/Notar. Ali možeš raditi kao Syndikus (in-house) pravnik u firmi sa balkanskom diplomom + ZAB.",
  },
  {
    id: "tehnicki",
    faculty: "Tehnički/Inženjerski fakulteti (ETF, MAŠ, GRAĐ, RGN)",
    germanField: "Ingenieurwissenschaften (Maschinenbau, Elektrotechnik, Bauingenieurwesen)",
    reglementiert: false,
    whatToDo:
      "Profesija inženjera nije reglementovana — možeš raditi inženjerske poslove odmah. Ali NAZIV 'Ingenieur' je zaštićen — za korištenje titule treba upis u Ingenieurkammer (kantonalna inženjerska komora). Za to: ZAB Zeugnisbewertung + zahtjev pri Ingenieurkammer Bundeslanda u kojem živiš (npr. IK Bau NRW, BayIKa).",
    examples: [
      {
        uni: "Elektrotehnički fakultet, Univerzitet u Sarajevu (ETF)",
        country: "🇧🇦 BiH",
        status: "H+",
        notes: "Bachelor (4 god, 240 ECTS) i Master (5+, 300 ECTS) priznaju se ravnopravno.",
        diplomaExample: "Magistar elektrotehnike (Mag. ing. el.)",
        germanEquivalent: "Master of Engineering (Elektrotechnik)",
      },
      {
        uni: "Mašinski fakultet, Univerzitet u Beogradu",
        country: "🇷🇸 Srbija",
        status: "H+",
        notes: "Diplome priznate; za 'Ing.' titulu — Ingenieurkammer Bundeslanda.",
        diplomaExample: "Diplomirani inženjer mašinstva (Master, 300 ECTS)",
        germanEquivalent: "Master of Science (Maschinenbau)",
      },
      {
        uni: "FER, Sveučilište u Zagrebu",
        country: "🇭🇷 Hrvatska",
        status: "H+",
        notes:
          "EU + visok rang — vrlo dobro priznata u industriji. Često poslodavci priznaju i bez ZAB-a.",
        diplomaExample: "Magistar inženjer računarstva",
        germanEquivalent: "Master of Science in Informatik",
      },
    ],
    tip: "Za rad kao Software Engineer u Berlinu / Münchenu često ti čak ni ZAB ne treba — diploma + GitHub/iskustvo su dovoljni. ZAB napravi samo ako tražiš Blue Card ili javni sektor.",
  },
  {
    id: "filozofski",
    faculty: "Filozofski / Filološki fakultet (jezici, historija, sociologija)",
    germanField: "Geisteswissenschaften / Philologie",
    reglementiert: false,
    whatToDo:
      "Nereglementovano osim ako želiš biti učitelj/profesor u školi (tada — Lehramt, treba puni postupak preko Kultusministerium Bundeslanda). Za prevodioca, novinara, urednika — dovoljan ZAB.",
    examples: [
      {
        uni: "Filozofski fakultet, Univerzitet u Sarajevu",
        country: "🇧🇦 BiH",
        status: "H+",
        notes: "Diplome iz njemačkog/engleskog/historije priznate.",
        diplomaExample: "Profesor njemačkog jezika i književnosti (Magistar)",
        germanEquivalent: "Master of Arts in Germanistik",
      },
      {
        uni: "Filozofski fakultet, Univerzitet u Beogradu",
        country: "🇷🇸 Srbija",
        status: "H+",
        notes: "Vrhunski rangiran u regionu, široko priznat.",
        diplomaExample: "Master sociologije",
        germanEquivalent: "Master of Arts in Soziologie",
      },
    ],
    tip: "Za rad kao prevodilac u Njemačkoj — još ti treba i Beeidigter Übersetzer ispit u Oberlandesgericht (OLG) Bundeslanda (oko 200–400 €).",
  },
  {
    id: "medicinski",
    faculty: "Medicinski fakultet",
    germanField: "Humanmedizin",
    reglementiert: true,
    whatToDo:
      "STROGO REGLEMENTOVANO. NE ide preko ZAB-a! Treba ti Approbation (Bezirksregierung Bundeslanda) + Fachsprachprüfung (B2/C1 + medicinski jezik) + eventualno Kenntnisprüfung. Vidi modul „Anerkennung Navigator“ → izbor profesije = Ljekar.",
    examples: [
      {
        uni: "Medicinski fakultet, Univerzitet u Sarajevu / Tuzli / Banja Luci",
        country: "🇧🇦 BiH",
        status: "H+",
        notes:
          "Studij od 6 godina (360 ECTS) priznat kao ekvivalent njemačkom Staatsexamenu — uz Kenntnisprüfung (300–700 €) i Fachsprachprüfung (400–600 €).",
        diplomaExample: "Doktor medicine (Dr. med., 6 god)",
        germanEquivalent: "Approbation als Arzt (uz Kenntnisprüfung)",
      },
    ],
    tip: "Ovo je poseban tok — koristi alat „Anerkennung Navigator“ na ovoj platformi za detaljan korak-po-korak postupak.",
  },
  {
    id: "it",
    faculty: "Računarstvo / Informatika",
    germanField: "Informatik",
    reglementiert: false,
    whatToDo:
      "NIJE reglementovano. ZAB Zeugnisbewertung opciono. Za Blue Card EU dovoljan je dokaz da je institucija u Anabinu sa H+ statusom.",
    examples: [
      {
        uni: "Prirodno-matematički fakultet, Univerzitet u Sarajevu (PMF)",
        country: "🇧🇦 BiH",
        status: "H+",
        notes: "Smjer Informatika priznat kao Bachelor/Master.",
        diplomaExample: "Bachelor računarstva (180 ECTS)",
        germanEquivalent: "Bachelor of Science in Informatik",
      },
      {
        uni: "FOI Varaždin / FER Zagreb",
        country: "🇭🇷 Hrvatska",
        status: "H+",
        notes: "EU diploma + odlična reputacija u njemačkim IT firmama.",
        diplomaExample: "Magistar informatike",
        germanEquivalent: "Master of Science in Informatik",
      },
      {
        uni: "Matematički fakultet / ETF, Univerzitet u Beogradu",
        country: "🇷🇸 Srbija",
        status: "H+",
        notes: "Visoko cijenjene diplome u SAP/Allianz/Bosch ekosistemu.",
        diplomaExample: "Master inženjer računarstva",
        germanEquivalent: "Master of Engineering in Informatik",
      },
    ],
    tip: "IT firme u DE često ne traže formalnu Anerkennung. Dovoljan je njemački/engleski CV, prevod diplome, GitHub portfolio.",
  },
];

/* ──────────── Anabin status objašnjenja ──────────── */

const ANABIN_STATUSES = [
  {
    code: "H+",
    label: "H+ (priznata)",
    color: "emerald",
    description:
      "Ustanova je državno priznata u zemlji porijekla i njene diplome se mogu vrednovati u Njemačkoj. NAJBOLJI scenarij — možeš direktno aplicirati za ZAB Zeugnisbewertung.",
  },
  {
    code: "H+/-",
    label: "H+/- (uvjetno priznata)",
    color: "amber",
    description:
      "Status u procjeni — neke diplome priznate, neke nisu. Tipično za novije privatne fakultete. Treba dodatna provjera.",
  },
  {
    code: "H-",
    label: "H- (nije priznata)",
    color: "rose",
    description:
      "Ustanova NIJE priznata. Diplome se uglavnom ne mogu vrednovati. Najbolja opcija: dokazati kroz radno iskustvo + dodatne certifikate ili upisati novi studij u DE.",
  },
];

/* ──────────── ZAB postupak — koraci ──────────── */

const ZAB_STEPS = [
  {
    n: 1,
    title: "Provjeri svoju ustanovu u Anabin bazi",
    body: "Idi na anabin.kmk.org → Hochschulen → Suchen nach Hochschulen → izaberi zemlju (npr. Bosnien und Herzegowina) → potraži svoj univerzitet. Status mora biti H+ ili H+/-.",
    link: "https://anabin.kmk.org/anabin/hochschulinstitutionen.html",
    linkLabel: "Anabin: Hochschulen",
  },
  {
    n: 2,
    title: "Provjeri svoju diplomu u Anabin bazi",
    body: "U istoj bazi → Hochschulabschlüsse → Suchen nach Abschlüssen. Ako tvoj abschluss već postoji u bazi sa zelenom oznakom 'entspricht' — možda ti uopće NE TREBA ZAB Zeugnisbewertung (poslodavac može sam printati ekvivalenciju).",
    link: "https://anabin.kmk.org/anabin/hochschulabschluesse.html",
    linkLabel: "Anabin: Abschlüsse",
  },
  {
    n: 3,
    title: "Prikupi dokumente za ZAB Zeugnisbewertung",
    body: "Trebat će ti: 1) ovjerena kopija diplome (original + njemački prevod od stalnog sudskog tumača), 2) ovjerena kopija dodatka diplomi (Diploma Supplement / transkript ocjena), 3) sažetak diplomskog rada na njemačkom (1–2 stranice), 4) kopija pasoša, 5) lebenslauf na njemačkom, 6) potvrda o uplati 208 €.",
    link: "https://zab.kmk.org/de/zeugnisbewertung/antrag-stellen",
    linkLabel: "ZAB: Antrag stellen",
  },
  {
    n: 4,
    title: "Pošalji zahtjev online + poštom",
    body: "Aplikacija ide kroz online portal ZAB-a. Uplata 208 € (nepovratno) prije obrade. Originali dokumenata i ovjereni prevodi šalju se poštom na adresu: Sekretariat der KMK – ZAB, Graurheindorfer Str. 157, 53117 Bonn.",
    link: "https://zab.kmk.org/de/zeugnisbewertung/antrag-stellen",
    linkLabel: "ZAB online portal",
  },
  {
    n: 5,
    title: "Sačekaj rješenje (Bewertung)",
    body: "Obrada traje 3–5 mjeseci (službeno do 6 mj). Dobivaš službeni dokument 'Zeugnisbewertung für ausländische Hochschulqualifikationen' — prikazuje koji je njemački ekvivalent tvoje diplome (npr. 'entspricht einem deutschen Bachelor of Science').",
  },
  {
    n: 6,
    title: "Koristi Bewertung",
    body: "Dokument je trajno važeći. Koristiš ga: u CV-u, prilažeš uz aplikaciju za posao, prilažeš uz zahtjev za Blue Card EU, prilažeš pri upisu na njemački Master/PhD, prilažeš pri javnim natječajima.",
  },
];

/* ──────────── Komponenta ──────────── */

export default function AnerkennungFakulteti() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isPremium } = usePremiumAccess();
  const [openCase, setOpenCase] = useState<string | null>("ekonomski");

  const handleBack = () => navigateBackOrHome(navigate);

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 min-h-screen">
      <SEO
        title="Anerkennung fakultetske diplome u Njemačkoj — ZAB & Anabin vodič 2026"
        description="Detaljan vodič kako priznati Bachelor/Master/Magistar diplomu sa Balkana u Njemačkoj. Anabin, ZAB Zeugnisbewertung, primjeri sa Sarajevskog, Zagrebačkog i Beogradskog univerziteta."
        path="/anerkennung-fakulteti"
      />
      <PageNavBar onBack={handleBack} />

      {/* HEADER */}
      <header className="mb-6">
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <div className="h-10 w-10 rounded-xl bg-[hsl(var(--gold))]/10 ring-1 ring-[hsl(var(--gold))]/20 flex items-center justify-center">
            <GraduationCap className="h-5 w-5 text-[hsl(var(--gold))]" />
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-foreground">
            Anerkennung fakulteta
          </h1>
          <span className="inline-flex items-center gap-1 rounded-full bg-[hsl(var(--gold))]/10 px-2.5 py-1 text-[10px] font-bold uppercase text-[hsl(var(--gold))]">
            <Crown className="h-3 w-3" /> Premium
          </span>
        </div>
        <p className="text-sm text-muted-foreground max-w-3xl">
          Praktičan vodič za priznavanje akademskih diploma (Bachelor, Master,
          Magistar, Doktor) sa univerziteta u BiH, Hrvatskoj, Srbiji, Crnoj
          Gori, Sjevernoj Makedoniji i na Kosovu. Sa konkretnim primjerima i
          procedurom korak-po-korak.
        </p>
        <div className="h-px mt-4 mb-6 bg-border/40" />
      </header>

      {/* UVOD: Šta je Anerkennung vs Zeugnisbewertung */}
      <section className="mb-8 rounded-2xl border border-border/40 bg-card p-5 sm:p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-9 w-9 rounded-xl bg-blue-500/10 ring-1 ring-blue-500/20 flex items-center justify-center">
            <Info className="h-4 w-4 text-blue-500" />
          </div>
          <h2 className="text-lg font-bold text-foreground">
            Prvo razumiješ razliku
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
            <div className="font-bold text-foreground mb-1">
              ✓ ZAB Zeugnisbewertung (208 €)
            </div>
            <p className="text-muted-foreground">
              Za <strong>nereglementovana</strong> zanimanja (ekonomista,
              programer, sociolog, inženjer u privatnoj firmi). Dobivaš
              dokument koji potvrđuje ekvivalent tvoje diplome u njemačkom
              sistemu (Bachelor/Master). Ide kroz <strong>ZAB Bonn</strong>.
            </p>
          </div>
          <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-4">
            <div className="font-bold text-foreground mb-1">
              ⚠ Berufsanerkennung (200–1.000 €)
            </div>
            <p className="text-muted-foreground">
              Za <strong>reglementovana</strong> zanimanja (ljekar, sestra,
              učitelj, advokat, arhitekta, farmaceut). Punim postupkom
              uključujući stručni ispit. Ide kroz <strong>Bezirksregierung
              </strong> ili strukovnu komoru. Vidi modul „Anerkennung
              Navigator“.
            </p>
          </div>
        </div>
        <div className="mt-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-700 dark:text-amber-400 flex gap-2">
          <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
          <span>
            Većini ljudi sa Balkana koji rade u IT-u, ekonomiji, marketingu,
            inženjeringu — dovoljan je <strong>ZAB Zeugnisbewertung</strong>{" "}
            (208 €). Nemoj plaćati skupe agencije za ono što sam riješiš.
          </span>
        </div>
      </section>

      {/* ANABIN STATUSI */}
      <section className="mb-8 rounded-2xl border border-border/40 bg-card p-5 sm:p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-9 w-9 rounded-xl bg-[hsl(var(--gold))]/10 ring-1 ring-[hsl(var(--gold))]/20 flex items-center justify-center">
            <Search className="h-4 w-4 text-[hsl(var(--gold))]" />
          </div>
          <h2 className="text-lg font-bold text-foreground">
            Anabin statusi — šta znače
          </h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-3">
          {ANABIN_STATUSES.map((s) => (
            <div
              key={s.code}
              className={cn(
                "rounded-xl border p-4 text-sm",
                s.color === "emerald" &&
                  "border-emerald-500/30 bg-emerald-500/5",
                s.color === "amber" && "border-amber-500/30 bg-amber-500/5",
                s.color === "rose" && "border-rose-500/30 bg-rose-500/5",
              )}
            >
              <div className="font-bold text-foreground mb-1">{s.label}</div>
              <p className="text-xs text-muted-foreground">{s.description}</p>
            </div>
          ))}
        </div>
        <a
          href="https://anabin.kmk.org/anabin/hochschulinstitutionen.html"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[hsl(var(--gold))] hover:underline"
        >
          Otvori Anabin bazu <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </section>

      {/* ZAB ŠEST KORAKA */}
      <section className="mb-8 rounded-2xl border border-[hsl(var(--gold))]/30 bg-[hsl(var(--gold))]/5 p-5 sm:p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-9 w-9 rounded-xl bg-[hsl(var(--gold))]/10 ring-1 ring-[hsl(var(--gold))]/20 flex items-center justify-center">
            <ListOrdered className="h-4 w-4 text-[hsl(var(--gold))]" />
          </div>
          <h2 className="text-lg font-bold text-foreground">
            ZAB Zeugnisbewertung — postupak korak-po-korak
          </h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-3 mb-5">
          <div className="rounded-lg border border-border/40 bg-background p-3 flex items-center gap-2">
            <Euro className="h-4 w-4 text-[hsl(var(--gold))]" />
            <div>
              <div className="text-[11px] text-muted-foreground uppercase">
                Cijena
              </div>
              <div className="font-bold text-sm">208 € (jednokratno)</div>
            </div>
          </div>
          <div className="rounded-lg border border-border/40 bg-background p-3 flex items-center gap-2">
            <Clock className="h-4 w-4 text-[hsl(var(--gold))]" />
            <div>
              <div className="text-[11px] text-muted-foreground uppercase">
                Trajanje
              </div>
              <div className="font-bold text-sm">3–5 mjeseci</div>
            </div>
          </div>
          <div className="rounded-lg border border-border/40 bg-background p-3 flex items-center gap-2">
            <Building2 className="h-4 w-4 text-[hsl(var(--gold))]" />
            <div>
              <div className="text-[11px] text-muted-foreground uppercase">
                Nadležno
              </div>
              <div className="font-bold text-sm">ZAB Bonn (KMK)</div>
            </div>
          </div>
        </div>

        <ol className="space-y-3">
          {ZAB_STEPS.map((step, idx) => {
            const locked = !isPremium && idx >= 2;
            return (
              <li
                key={step.n}
                className={cn(
                  "rounded-xl border p-4 transition-all",
                  locked
                    ? "border-border/30 bg-muted/30 opacity-60"
                    : "border-border/40 bg-background",
                )}
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[hsl(var(--gold))] text-[11px] font-extrabold text-background">
                    {step.n}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm text-foreground flex items-center gap-2">
                      {step.title}
                      {locked && (
                        <Lock className="h-3.5 w-3.5 text-muted-foreground" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      {locked
                        ? "🔒 Detalji dostupni u Premium verziji."
                        : step.body}
                    </p>
                    {!locked && step.link && (
                      <a
                        href={step.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[hsl(var(--gold))] hover:underline"
                      >
                        {step.linkLabel}{" "}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        {!isPremium && (
          <div className="mt-5 rounded-xl border border-[hsl(var(--gold))]/30 bg-background p-4 text-center">
            <Lock className="h-6 w-6 mx-auto text-[hsl(var(--gold))] mb-2" />
            <div className="font-bold text-sm mb-1">
              Otključaj kompletan vodič
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              Detalje koraka 3–6, sve primjere fakulteta, dokumente i email
              šablone.
            </p>
            <Button
              onClick={() => navigate("/paketi")}
              className="bg-gradient-to-r from-[hsl(var(--gold))] to-[hsl(var(--gold-dark))] text-white"
            >
              <Crown className="mr-1.5 h-4 w-4" /> Postani Premium
            </Button>
          </div>
        )}
      </section>

      {/* PRIMJERI FAKULTETA */}
      <section className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-9 w-9 rounded-xl bg-[hsl(var(--gold))]/10 ring-1 ring-[hsl(var(--gold))]/20 flex items-center justify-center">
            <BookOpen className="h-4 w-4 text-[hsl(var(--gold))]" />
          </div>
          <h2 className="text-lg font-bold text-foreground">
            Primjeri po fakultetima sa Balkana
          </h2>
        </div>

        <div className="space-y-3">
          {FACULTY_CASES.map((c, idx) => {
            const open = openCase === c.id;
            const locked = !isPremium && idx >= 1;
            return (
              <div
                key={c.id}
                className={cn(
                  "rounded-2xl border overflow-hidden",
                  locked
                    ? "border-border/30 bg-muted/30"
                    : "border-border/40 bg-card",
                )}
              >
                <button
                  onClick={() => !locked && setOpenCase(open ? null : c.id)}
                  disabled={locked}
                  className={cn(
                    "w-full flex items-center justify-between gap-3 p-4 text-left",
                    !locked && "hover:bg-muted/30",
                  )}
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm text-foreground flex items-center gap-2 flex-wrap">
                      {c.faculty}
                      {c.reglementiert ? (
                        <Badge
                          variant="outline"
                          className="bg-rose-500/10 text-rose-600 border-rose-500/30 text-[10px]"
                        >
                          Reglementovano
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="bg-emerald-500/10 text-emerald-600 border-emerald-500/30 text-[10px]"
                        >
                          Slobodno
                        </Badge>
                      )}
                      {locked && (
                        <Lock className="h-3.5 w-3.5 text-muted-foreground" />
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      DE: {c.germanField}
                    </div>
                  </div>
                  {!locked &&
                    (open ? (
                      <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                    ))}
                </button>

                {open && !locked && (
                  <div className="px-4 pb-4 border-t border-border/40 pt-4 space-y-4">
                    <div className="rounded-lg bg-muted/40 p-3 text-xs text-foreground/90 leading-relaxed">
                      <strong className="text-foreground">Šta da radiš:</strong>{" "}
                      {c.whatToDo}
                    </div>

                    <div className="space-y-2">
                      <div className="text-[11px] font-bold uppercase text-muted-foreground">
                        Konkretni primjeri:
                      </div>
                      {c.examples.map((ex) => (
                        <div
                          key={ex.uni}
                          className="rounded-xl border border-border/40 bg-background p-3"
                        >
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="font-semibold text-sm text-foreground">
                              {ex.country} {ex.uni}
                            </div>
                            <span
                              className={cn(
                                "rounded-full px-2 py-0.5 text-[10px] font-bold",
                                ex.status === "H+" &&
                                  "bg-emerald-500/15 text-emerald-600",
                                ex.status === "H+/-" &&
                                  "bg-amber-500/15 text-amber-600",
                                ex.status === "H-" &&
                                  "bg-rose-500/15 text-rose-600",
                              )}
                            >
                              Anabin: {ex.status}
                            </span>
                          </div>
                          <div className="grid sm:grid-cols-2 gap-2 text-xs">
                            <div>
                              <div className="text-muted-foreground text-[10px] uppercase">
                                Tvoja diploma
                              </div>
                              <div className="text-foreground font-medium">
                                {ex.diplomaExample}
                              </div>
                            </div>
                            <div>
                              <div className="text-muted-foreground text-[10px] uppercase">
                                Njemački ekvivalent
                              </div>
                              <div className="text-foreground font-medium">
                                {ex.germanEquivalent}
                              </div>
                            </div>
                          </div>
                          <p className="mt-2 text-[11px] text-muted-foreground italic">
                            {ex.notes}
                          </p>
                        </div>
                      ))}
                    </div>

                    {c.tip && (
                      <div className="rounded-lg bg-[hsl(var(--gold))]/10 border border-[hsl(var(--gold))]/30 p-3 text-xs text-foreground flex gap-2">
                        <Sparkles className="h-4 w-4 text-[hsl(var(--gold))] shrink-0 mt-0.5" />
                        <span>
                          <strong>Pro tip:</strong> {c.tip}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {locked && (
                  <div className="px-4 pb-4 text-xs text-muted-foreground border-t border-border/40 pt-3">
                    🔒 Otključaj sve primjere fakulteta i univerziteta —{" "}
                    <button
                      onClick={() => navigate("/paketi")}
                      className="font-bold text-[hsl(var(--gold))] hover:underline"
                    >
                      Postani Premium
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* TIPIČNI DOKUMENTI */}
      <section className="mb-8 rounded-2xl border border-border/40 bg-card p-5 sm:p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-9 w-9 rounded-xl bg-[hsl(var(--gold))]/10 ring-1 ring-[hsl(var(--gold))]/20 flex items-center justify-center">
            <FileText className="h-4 w-4 text-[hsl(var(--gold))]" />
          </div>
          <h2 className="text-lg font-bold text-foreground">
            Tipičan paket dokumenata za ZAB
          </h2>
        </div>
        <ul className="space-y-2 text-sm">
          {[
            "Originalna diploma + ovjerena kopija (notarska ovjera u BiH/HR/RS)",
            "Njemački prevod diplome od stalnog sudskog tumača (Beeidigter Übersetzer) — 30–80 € po stranici",
            "Dodatak diplomi (Diploma Supplement) ili transkript ocjena sa svim predmetima i ECTS bodovima",
            "Sažetak diplomskog/master rada na njemačkom (1–2 stranice)",
            "Lebenslauf (CV) na njemačkom",
            "Kopija pasoša ili lične karte",
            "Potvrda o uplati 208 € na ZAB račun",
            "Po potrebi: potvrda o završenoj srednjoj školi (Maturazeugnis) sa prevodom",
          ].map((d) => (
            <li key={d} className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
              <span className="text-foreground/90">{d}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-700 dark:text-amber-400 flex gap-2">
          <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
          <span>
            <strong>Napomena 2026:</strong> ZAB sada prihvata <em>certified
            digital copies</em> kroz online portal — ne moraš slati originale
            poštom ako koristiš VIDEOIDENT ovjeru ili eIDAS-priznati digitalni
            potpis.
          </span>
        </div>
      </section>

      {/* DISCLAIMER */}
      <p className="text-[11px] text-muted-foreground text-center pb-4">
        Stand: 2026. Informacije zasnovane na javnim izvorima (zab.kmk.org,
        anabin.kmk.org, anerkennung-in-deutschland.de). Konačnu odluku o
        priznavanju donosi nadležna ustanova. Ovaj vodič nije zamjena za
        službenu pravnu konsultaciju.
      </p>
    </div>
  );
}
