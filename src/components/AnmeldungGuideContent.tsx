import { useState } from "react";
import { AlertTriangle, ClipboardList, PenLine, Clock, ChevronLeft, ChevronRight, Pencil, MapPin, Hash, XCircle, FileCheck, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface StepData {
  deField: string;
  bhsField: string;
  whatToWrite: string;
  whereToFind?: string;
  format?: string;
  commonMistake: string;
  note?: string;
}

const STEPS: StepData[] = [
  {
    deField: "Termin buchen",
    bhsField: "Zakazati termin",
    whatToWrite: "Online na stranici svog Bürgermta rezerviši termin što prije — rokovi su često 2-3 sedmice unaprijed.",
    whereToFind: "Google: '[tvoj grad] Bürgeramt Termin' ili direktno na bürgeramt.de",
    format: "Termin mora biti u roku od 14 dana od useljenja u stan",
    commonMistake: "Čekati prekasno — kazna do 1000€ ako se ne prijaviš na vrijeme!",
    note: "Ako nema termina online, idi fizički ujutro što ranije — često prime bez termina",
  },
  {
    deField: "Wohnungsgeberbestätigung",
    bhsField: "Potvrda stanodavca",
    whatToWrite: "Dokument koji tvoj stanodavac mora potpisati — bez ovoga prijava nije moguća",
    whereToFind: "Od stanodavca — oni su zakonski obavezni dati ti ovaj dokument",
    format: "Mora biti potpisano od stanodavca, s adresom stana i datumom useljenja",
    commonMistake: "Stanodavac kaže da ne mora dati — to nije tačno, zakonski mora!",
    note: "Ako stanodavac odbija, prijavi to Einwohnermeldeamt-u",
  },
  {
    deField: "Persönliche Daten",
    bhsField: "Lični podaci",
    whatToWrite: "Ime, prezime, datum rođenja, državljanstvo, stara adresa, nova adresa, datum useljenja",
    whereToFind: "Pasoš ili lična karta",
    format: "Datum format: TT.MM.JJJJ",
    commonMistake: "Upisati staru adresu iz matične zemlje umjesto zadnje adrese u Njemačkoj",
    note: "Ako dolaziš prvi put u Njemačku — stara adresa je adresa u matičnoj zemlji",
  },
  {
    deField: "Anmeldung abschließen",
    bhsField: "Završetak prijave (Meldebescheinigung)",
    whatToWrite: "Ništa — ovo dobijaš od Bürgermta na licu mjesta",
    whereToFind: "Odmah na šalteru nakon prijave",
    format: "Čuvaj ovaj dokument — treba ti za sve: banku, posao, Kindergeld, Krankenkasse",
    commonMistake: "Baciti ili izgubiti Meldebescheinigung — uvijek napravi kopije",
    note: "Meldebescheinigung je najvažniji dokument u Njemačkoj — bez njega ne možeš otvoriti račun u banci",
  },
];

const cardConfig = [
  { key: "whatToWrite" as const, label: "Šta tačno upisuješ", icon: <Pencil className="h-3.5 w-3.5" />, color: "border-blue-200 bg-blue-50 dark:border-blue-900/40 dark:bg-blue-950/20" },
  { key: "whereToFind" as const, label: "Gdje to nađeš", icon: <MapPin className="h-3.5 w-3.5" />, color: "border-emerald-200 bg-emerald-50 dark:border-emerald-900/40 dark:bg-emerald-950/20" },
  { key: "format" as const, label: "Format", icon: <Hash className="h-3.5 w-3.5" />, color: "border-violet-200 bg-violet-50 dark:border-violet-900/40 dark:bg-violet-950/20" },
  { key: "commonMistake" as const, label: "Česte greške", icon: <XCircle className="h-3.5 w-3.5" />, color: "border-red-200 bg-red-50 dark:border-red-900/40 dark:bg-red-950/20" },
];

type CardKey = "whatToWrite" | "whereToFind" | "format" | "commonMistake";

export default function AnmeldungGuideContent() {
  const [step, setStep] = useState(0);
  const current = STEPS[step];
  const progress = ((step + 1) / STEPS.length) * 100;
  const isLast = step === STEPS.length - 1;

  return (
    <div className="space-y-8">
      {/* ─── DIO 1: Info header ─── */}
      <div className="space-y-4">
        <div>
          <h1 className="font-heading text-xl font-extrabold sm:text-2xl">Prijava prebivališta (Anmeldung)</h1>
          <p className="mt-1 text-xs text-muted-foreground">Izvor: Bürgeramt / Einwohnermeldeamt</p>
          <p className="mt-0.5 text-xs text-muted-foreground">Formular: Anmeldung einer Wohnung</p>
        </div>

        <div className="rounded-2xl border border-border/60 bg-card p-4">
          <h3 className="mb-2 flex items-center gap-1.5 text-xs font-bold">
            <PenLine className="h-3.5 w-3.5 text-primary" /> Ko može podnijeti zahtjev
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Svaka osoba koja se useljava u stan u Njemačkoj — u roku od 14 dana od useljenja.
          </p>
          <p className="mt-3 text-xs">
            <span className="font-semibold flex items-center gap-1">
              <Clock className="h-3 w-3" /> Vrijeme obrade:
            </span>
            <span className="text-muted-foreground">Odmah (Meldebescheinigung se izdaje na licu mjesta)</span>
          </p>
        </div>

        <div className="rounded-2xl border border-border/60 bg-card p-4">
          <h3 className="mb-2 flex items-center gap-1.5 text-xs font-bold">
            <ClipboardList className="h-3.5 w-3.5 text-primary" /> Šta treba pripremiti
          </h3>
          <ul className="space-y-1 pl-4 list-disc">
            <li className="text-xs text-muted-foreground">Lična karta ili pasoš</li>
            <li className="text-xs text-muted-foreground">Potvrda stanodavca (Wohnungsgeberbestätigung)</li>
            <li className="text-xs text-muted-foreground">Ugovor o najmu (preporučeno)</li>
            <li className="text-xs text-muted-foreground">Eventualno vjenčani list / rodni list</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 dark:border-red-900/40 dark:bg-red-950/20">
          <h3 className="mb-2 flex items-center gap-1.5 text-xs font-bold text-red-700 dark:text-red-400">
            <AlertTriangle className="h-3.5 w-3.5" /> Najčešće greške
          </h3>
          <ul className="space-y-1 pl-4 list-disc">
            <li className="text-xs text-red-600 dark:text-red-300">Propušten rok od 14 dana (moguća kazna!)</li>
            <li className="text-xs text-red-600 dark:text-red-300">Nedostaje potvrda stanodavca</li>
            <li className="text-xs text-red-600 dark:text-red-300">Termin prekasno rezervisan</li>
            <li className="text-xs text-red-600 dark:text-red-300">Stara adresa nije odjavljena pri dolasku iz inostranstva</li>
          </ul>
        </div>
      </div>

      {/* ─── DIO 2: Smart Guide korak po korak ─── */}
      <div className="space-y-4">
        <div className="text-center">
          <h2 className="text-lg font-bold text-foreground">Smart Guide — korak po korak</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Svako polje objašnjeno — šta upisati, gdje naći, format i česte greške
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Progress value={progress} className="h-2 flex-1" />
          <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">
            Korak {step + 1} / {STEPS.length}
          </span>
        </div>

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

        <div className="rounded-2xl border border-border/60 bg-card p-5">
          <p className="text-[10px] font-medium text-muted-foreground mb-1">Korak {step + 1}</p>
          <h3 className="font-bold text-sm">{current.deField}</h3>
          <p className="text-xs text-muted-foreground mt-0.5">{current.bhsField}</p>
        </div>

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
              <h4 className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold">
                <Info className="h-3.5 w-3.5" /> Napomena
              </h4>
              <p className="text-xs leading-relaxed text-foreground/80">{current.note}</p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <Button variant="outline" size="sm" disabled={step === 0} onClick={() => setStep(step - 1)}>
            <ChevronLeft className="mr-1 h-4 w-4" /> Nazad
          </Button>
          {isLast ? (
            <Button size="sm" className="font-bold" style={{ backgroundColor: "#EAB308", color: "#000" }}>
              ✅ Završeno
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
          Više informacija na službenoj stranici BMI
        </p>
        <a
          href="https://www.bmi.bund.de"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-2 text-sm font-medium"
          style={{ color: "#60A5FA" }}
        >
          🔗 Službena stranica BMI
        </a>
      </div>
    </div>
  );
}
