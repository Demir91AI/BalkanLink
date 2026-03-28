import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, ClipboardList, PenLine, Clock, ChevronLeft, ChevronRight, Pencil, MapPin, Hash, XCircle, MinusCircle, FileCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

/* ─── Hardcoded 8-step Smart Guide data ─── */
interface StepData {
  deField: string;
  bhsField: string;
  whatToWrite: string;
  whereToFind?: string;
  format?: string;
  commonMistake: string;
  whenToLeaveEmpty?: string;
  example?: string;
  note?: string;
}

const STEPS: StepData[] = [
  {
    deField: "Steuerliche Identifikationsnummer",
    bhsField: "Poreski identifikacioni broj",
    whatToWrite: "Tvoj 11-cifreni lični poreski broj. Nije isto što i Steuernummer.",
    whereToFind: "Pismo od Bundeszentralamt für Steuern, platna lista (Lohnsteuerbescheinigung), ili porezno rješenje.",
    format: 'Tačno 11 cifara, bez razmaka. Primjer: 12345678901',
    commonMistake: "Ne miješaj sa Steuernummer koji ima format 12/345/67890. Familienkasse traži isključivo Steuer-ID.",
    whenToLeaveEmpty: "Samo ako Steuer-ID još nije dodijeljen — napiši napomenu 'noch nicht vergeben'.",
    example: "65 929 310 054",
  },
  {
    deField: "Familienname, Titel",
    bhsField: "Prezime i titula",
    whatToWrite: "Tvoje trenutno prezime kako piše u pasošu ili ličnoj karti.",
    whereToFind: "Pasoš ili lična karta.",
    format: "Samo prezime, bez imena. Titulu upiši samo ako je službena (Dr., Dipl. itd.)",
    commonMistake: "Ne upisivati i ime i prezime u isto polje.",
    whenToLeaveEmpty: "Nikad — obavezno polje.",
    example: "Mustermann",
  },
  {
    deField: "Vorname",
    bhsField: "Ime",
    whatToWrite: "Tvoje ime kako piše u pasošu.",
    format: "Samo ime, bez prezimena.",
    commonMistake: "Upisati prezime umjesto imena.",
    example: "Mujo",
  },
  {
    deField: "Geburtsdatum",
    bhsField: "Datum rođenja",
    whatToWrite: "Tvoj datum rođenja.",
    format: "TT.MM.JJJJ — Primjer: 15.03.1985",
    commonMistake: "Američki format MM/DD/YYYY nije prihvatljiv.",
  },
  {
    deField: "Staatsangehörigkeit",
    bhsField: "Državljanstvo",
    whatToWrite: "Naziv tvoje države državljanstva na njemačkom.",
    example: "Bosnien und Herzegowina / Serbien / Kroatien / Kosovo / Nordmazedonien",
    commonMistake: "Pisati 'Bosna' umjesto 'Bosnien und Herzegowina'.",
    note: "Ako nisi EU/EWR državljanin — obavezno priloži Aufenthaltstitel uz zahtjev.",
  },
  {
    deField: "Anschrift",
    bhsField: "Adresa stanovanja",
    whatToWrite: "Tvoja trenutna adresa prijave (Meldebescheinigung).",
    format: "Straße/Platz + Hausnummer u prvom redu, Postleitzahl + Wohnort u drugom.",
    commonMistake: "Adresa mora biti ista kao na Meldebescheinigung. Ako se razlikuje — zahtjev može biti odbijen.",
  },
  {
    deField: "IBAN, BIC, Bank",
    bhsField: "Bankovni podaci",
    whatToWrite: "IBAN tvog njemačkog bankovnog računa na koji želiš primati Kindergeld.",
    format: "DE + 20 cifara. Primjer: DE89 3704 0044 0532 0130 00",
    commonMistake: "Upisati tuđi račun (npr. supružnikov) bez da je on naveden kao Kontoinhaber.",
    note: "Ako IBAN pripada drugoj osobi, mora biti označeno 'nicht antragstellende Person' i upisano njeno ime.",
  },
  {
    deField: "Unterschrift",
    bhsField: "Potpis",
    whatToWrite: "Datum i mjesto potpisivanja + vlastoručni potpis.",
    commonMistake: "Zaboraviti potpis supružnika/partnera koji živi u istom domaćinstvu.",
    note: "Na Musterformlaru ne potpisuješ — potpis ide samo na original koji predaješ Familienkasse.",
  },
];

const cardConfig = [
  { key: "whatToWrite" as const, label: "Šta tačno upisuješ", icon: <Pencil className="h-3.5 w-3.5" />, color: "border-blue-200 bg-blue-50 dark:border-blue-900/40 dark:bg-blue-950/20" },
  { key: "whereToFind" as const, label: "Gdje to nađeš", icon: <MapPin className="h-3.5 w-3.5" />, color: "border-emerald-200 bg-emerald-50 dark:border-emerald-900/40 dark:bg-emerald-950/20" },
  { key: "format" as const, label: "Format", icon: <Hash className="h-3.5 w-3.5" />, color: "border-violet-200 bg-violet-50 dark:border-violet-900/40 dark:bg-violet-950/20" },
  { key: "commonMistake" as const, label: "Česte greške", icon: <XCircle className="h-3.5 w-3.5" />, color: "border-red-200 bg-red-50 dark:border-red-900/40 dark:bg-red-950/20" },
  { key: "whenToLeaveEmpty" as const, label: "Kada ostaviti prazno", icon: <MinusCircle className="h-3.5 w-3.5" />, color: "border-amber-200 bg-amber-50 dark:border-amber-900/40 dark:bg-amber-950/20" },
  { key: "example" as const, label: "Primjer popunjenog", icon: <FileCheck className="h-3.5 w-3.5" />, color: "border-cyan-200 bg-cyan-50 dark:border-cyan-900/40 dark:bg-cyan-950/20" },
];

type CardKey = "whatToWrite" | "whereToFind" | "format" | "commonMistake" | "whenToLeaveEmpty" | "example";

export default function KindergeldGuideContent() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const current = STEPS[step];
  const progress = ((step + 1) / STEPS.length) * 100;
  const isLast = step === STEPS.length - 1;

  return (
    <div className="space-y-8">
      {/* ─── DIO 1: Info header ─── */}
      <div className="space-y-4">
        <div>
          <h1 className="font-heading text-xl font-extrabold sm:text-2xl">Dječji dodatak (Kindergeld)</h1>
          <p className="mt-1 text-xs text-muted-foreground">Izvor: Familienkasse pri Saveznoj agenciji za rad</p>
          <p className="mt-0.5 text-xs text-muted-foreground">Formular: Zahtjev za dječji dodatak (KG1)</p>
        </div>

        {/* Ko može podnijeti */}
        <div className="rounded-2xl border border-border/60 bg-card p-4">
          <h3 className="mb-2 flex items-center gap-1.5 text-xs font-bold">
            <PenLine className="h-3.5 w-3.5 text-primary" /> Ko može podnijeti zahtjev
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Roditelji sa prebivalištem u Njemačkoj, za svako dijete do 18. godine (do 25. uz školovanje).
          </p>
          <p className="mt-3 text-xs">
            <span className="font-semibold flex items-center gap-1">
              <Clock className="h-3 w-3" /> Vrijeme obrade:
            </span>
            <span className="text-muted-foreground">4–6 sedmica od podnošenja zahtjeva.</span>
          </p>
        </div>

        {/* Šta treba pripremiti */}
        <div className="rounded-2xl border border-border/60 bg-card p-4">
          <h3 className="mb-2 flex items-center gap-1.5 text-xs font-bold">
            <ClipboardList className="h-3.5 w-3.5 text-primary" /> Šta treba pripremiti
          </h3>
          <ul className="space-y-1 pl-4 list-disc">
            <li className="text-xs text-muted-foreground">Popunjen obrazac KG1</li>
            <li className="text-xs text-muted-foreground">Rodni list djeteta (original ili ovjerena kopija)</li>
            <li className="text-xs text-muted-foreground">Prijava prebivališta (Meldebescheinigung)</li>
            <li className="text-xs text-muted-foreground">Steuer-ID roditelja i djeteta</li>
            <li className="text-xs text-muted-foreground">Kopija pasoša ili lične karte</li>
            <li className="text-xs text-muted-foreground">Boravišna dozvola (ako ste iz ne-EU zemlje)</li>
          </ul>
        </div>

        {/* Najčešće greške — crveni box, ne mijenjati */}
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 dark:border-red-900/40 dark:bg-red-950/20">
          <h3 className="mb-2 flex items-center gap-1.5 text-xs font-bold text-red-700 dark:text-red-400">
            <AlertTriangle className="h-3.5 w-3.5" /> Najčešće greške
          </h3>
          <ul className="space-y-1 pl-4 list-disc">
            <li className="text-xs text-red-600 dark:text-red-300">Nepotpuna dokumentacija — rodni list djeteta zaboravljen</li>
            <li className="text-xs text-red-600 dark:text-red-300">Pogrešan IBAN ili ime vlasnika računa</li>
            <li className="text-xs text-red-600 dark:text-red-300">Steuernummer umjesto Steuer-ID</li>
            <li className="text-xs text-red-600 dark:text-red-300">Nedostaje potpis supružnika</li>
          </ul>
        </div>
      </div>

      {/* ─── DIO 2: Musterformular kartica ─── */}
      <div
        className="rounded-2xl p-6 text-center"
        style={{ backgroundColor: "#111827", border: "1px solid #3B82F6" }}
      >
        <div className="text-[32px] mb-3">📋</div>
        <h2 className="text-xl font-bold text-white">Vježbaj na Musterformlaru</h2>
        <p className="mt-1 text-sm font-semibold" style={{ color: "#EAB308" }}>
          Popuni kao original — pa znaš tačno šta ide gdje
        </p>
        <p className="mt-2 text-[13px] text-gray-400">
          Interaktivna kopija originalnog KG1 formulara. Bez državnih obilježja — samo za učenje i vježbu.
        </p>
        <p className="mt-1 text-[11px] text-gray-500">
          Original KG1 formulara dostupan na službenoj stranici Familienkasse.
        </p>
        <button
          onClick={() => navigate("/formulari/kindergeld/muster")}
          className="mt-4 w-full font-bold text-white py-3 px-6 rounded-[10px]"
          style={{ backgroundColor: "#3B82F6" }}
        >
          📋 Otvori Musterformular →
        </button>
      </div>

      {/* ─── DIO 3: Smart Guide korak po korak ─── */}
      <div className="space-y-4">
        <div className="text-center">
          <h2 className="text-lg font-bold text-foreground">Smart Guide — korak po korak</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Svako polje objašnjeno — šta upisati, gdje naći, format i česte greške
          </p>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-3">
          <Progress value={progress} className="h-2 flex-1" />
          <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">
            Korak {step + 1} / {STEPS.length}
          </span>
        </div>

        {/* Step pills */}
        <div className="flex items-center gap-1 overflow-x-auto pb-2">
          {STEPS.map((_, i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              className={
                "shrink-0 rounded-full px-3 py-1 text-[10px] font-medium transition " +
                (i === step
                  ? "bg-primary text-primary-foreground"
                  : i < step
                  ? "bg-primary/20 text-primary"
                  : "bg-muted text-muted-foreground hover:bg-muted/80")
              }
            >
              {i + 1}
            </button>
          ))}
        </div>

        {/* Current step card */}
        <div className="rounded-2xl border border-border/60 bg-card p-5">
          <p className="text-[10px] font-medium text-muted-foreground mb-1">Korak {step + 1}</p>
          <h3 className="font-bold text-sm">{current.deField}</h3>
          <p className="text-xs text-muted-foreground mt-0.5">{current.bhsField}</p>
        </div>

        {/* Detail cards */}
        <div className="grid gap-3 sm:grid-cols-2">
          {cardConfig.map(({ key, label, icon, color }) => {
            const value = current[key as CardKey];
            if (!value) return null;
            return (
              <div key={key} className={`rounded-xl border p-4 ${color}`}>
                <h4 className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold">
                  {icon} {label}
                </h4>
                <p className="text-xs leading-relaxed text-foreground/80">{value}</p>
              </div>
            );
          })}
          {current.note && (
            <div className="rounded-xl border p-4 border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900/30 sm:col-span-2">
              <h4 className="mb-1.5 text-[11px] font-bold">ℹ️ Napomena</h4>
              <p className="text-xs leading-relaxed text-foreground/80">{current.note}</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button variant="outline" size="sm" disabled={step === 0} onClick={() => setStep(step - 1)}>
            <ChevronLeft className="mr-1 h-4 w-4" /> Nazad
          </Button>
          {isLast ? (
            <Button
              size="sm"
              className="font-bold"
              style={{ backgroundColor: "#EAB308", color: "#000" }}
              onClick={() => navigate("/formulari/kindergeld/muster")}
            >
              ✅ Završeno — idi na Musterformular
            </Button>
          ) : (
            <Button
              size="sm"
              className="font-bold"
              style={{ backgroundColor: "#EAB308", color: "#000" }}
              onClick={() => setStep(step + 1)}
            >
              Dalje <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* ─── DIO 4: Link na original ─── */}
      <div className="rounded-lg p-4 text-center" style={{ backgroundColor: "#1F2937" }}>
        <p className="text-[13px] text-gray-400">
          Original KG1 formular preuzmi direktno od Bundesagentur für Arbeit
        </p>
        <a
          href="https://www.arbeitsagentur.de/datei/kg1-antrag-kindergeld_ba017202.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-2 text-sm font-medium"
          style={{ color: "#3B82F6" }}
        >
          🔗 Preuzmi originalni KG1 formular (PDF)
        </a>
      </div>
    </div>
  );
}
