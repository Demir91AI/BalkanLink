import { useState, useEffect, useCallback, useRef } from "react";
import { Play, Pause, ChevronLeft, ChevronRight, ChevronDown, CheckCircle2, Baby, Euro, FileText, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

/* ─── SLIDESHOW DATA ─── */
const SLIDES = [
  {
    icon: <Baby className="h-10 w-10 text-yellow-400" />,
    title: "250€ po djetetu, svaki mjesec",
    desc: "Kindergeld iznosi 250€ mjesečno za svako dijete — od prvog dana prijave u Njemačkoj.",
    bg: "from-[#0f1f3d] to-[#1a3a6b]",
  },
  {
    icon: <FileText className="h-10 w-10 text-emerald-400" />,
    title: "Formular KG1 + dokumenti",
    desc: "Trebaš popunjen KG1 obrazac, rodni list djeteta, Steuer-ID, Meldebescheinigung i kopiju pasoša.",
    bg: "from-[#1a3a6b] to-[#0f2d5c]",
  },
  {
    icon: <Euro className="h-10 w-10 text-amber-400" />,
    title: "Retroaktivno do 6 mjeseci",
    desc: "Možeš dobiti Kindergeld retroaktivno za prethodnih 6 mjeseci — ali samo ako podneseš zahtjev na vrijeme.",
    bg: "from-[#0f2d5c] to-[#132a4a]",
  },
  {
    icon: <Clock className="h-10 w-10 text-sky-400" />,
    title: "Obrada traje 4–6 sedmica",
    desc: "Familienkasse obrađuje zahtjev u prosjeku 4–6 sedmica. Isplata ide na tvoj njemački IBAN.",
    bg: "from-[#132a4a] to-[#0f1f3d]",
  },
];

const SLIDE_DURATION = 5000; // ms

/* ─── SMART GUIDE STEPS ─── */
const STEPS = [
  {
    deField: "Steuerliche Identifikationsnummer",
    bhsField: "Poreski identifikacioni broj",
    details: [
      { label: "Šta upisuješ", value: "Tvoj 11-cifreni lični poreski broj. Nije isto što i Steuernummer." },
      { label: "Gdje nađeš", value: "Pismo od Bundeszentralamt für Steuern, platna lista ili porezno rješenje." },
      { label: "Format", value: "Tačno 11 cifara, bez razmaka. Primjer: 12345678901" },
      { label: "Česta greška", value: "Miješanje sa Steuernummer (format 12/345/67890). Familienkasse traži isključivo Steuer-ID." },
    ],
  },
  {
    deField: "Familienname, Titel",
    bhsField: "Prezime i titula",
    details: [
      { label: "Šta upisuješ", value: "Prezime kako piše u pasošu ili ličnoj karti." },
      { label: "Format", value: "Samo prezime, bez imena. Titulu (Dr., Dipl.) samo ako je službena." },
      { label: "Česta greška", value: "Ne upisivati i ime i prezime u isto polje." },
    ],
  },
  {
    deField: "Vorname",
    bhsField: "Ime",
    details: [
      { label: "Šta upisuješ", value: "Tvoje ime kako piše u pasošu." },
      { label: "Format", value: "Samo ime, bez prezimena." },
      { label: "Česta greška", value: "Upisati prezime umjesto imena." },
    ],
  },
  {
    deField: "Geburtsdatum",
    bhsField: "Datum rođenja",
    details: [
      { label: "Šta upisuješ", value: "Tvoj datum rođenja." },
      { label: "Format", value: "TT.MM.JJJJ — Primjer: 15.03.1985" },
      { label: "Česta greška", value: "Američki format MM/DD/YYYY nije prihvatljiv." },
    ],
  },
  {
    deField: "Staatsangehörigkeit",
    bhsField: "Državljanstvo",
    details: [
      { label: "Šta upisuješ", value: "Naziv države državljanstva na njemačkom." },
      { label: "Primjer", value: "Bosnien und Herzegowina / Serbien / Kroatien / Kosovo / Nordmazedonien" },
      { label: "Česta greška", value: "Pisati 'Bosna' umjesto 'Bosnien und Herzegowina'." },
      { label: "Napomena", value: "Ako nisi EU/EWR državljanin — obavezno priloži Aufenthaltstitel." },
    ],
  },
  {
    deField: "Anschrift",
    bhsField: "Adresa stanovanja",
    details: [
      { label: "Šta upisuješ", value: "Tvoja trenutna adresa prijave (Meldebescheinigung)." },
      { label: "Format", value: "Straße + Hausnummer, zatim PLZ + Wohnort." },
      { label: "Česta greška", value: "Adresa mora biti ista kao na Meldebescheinigung. Razlika = odbijanje zahtjeva." },
    ],
  },
  {
    deField: "IBAN, BIC, Bank",
    bhsField: "Bankovni podaci",
    details: [
      { label: "Šta upisuješ", value: "IBAN tvog njemačkog računa za primanje Kindergelda." },
      { label: "Format", value: "DE + 20 cifara. Primjer: DE89 3704 0044 0532 0130 00" },
      { label: "Česta greška", value: "Upisati tuđi račun bez da je ta osoba navedena kao Kontoinhaber." },
      { label: "Napomena", value: "Ako IBAN pripada drugoj osobi, označi 'nicht antragstellende Person' i upiši njeno ime." },
    ],
  },
  {
    deField: "Unterschrift",
    bhsField: "Potpis",
    details: [
      { label: "Šta upisuješ", value: "Datum i mjesto potpisivanja + vlastoručni potpis." },
      { label: "Česta greška", value: "Zaboraviti potpis supružnika koji živi u istom domaćinstvu." },
      { label: "Napomena", value: "Na Musterformularu ne potpisuješ — potpis samo na original za Familienkasse." },
    ],
  },
];

/* ─── SLIDESHOW COMPONENT ─── */
function KindergeldSlideshow() {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (!playing) { clearTimer(); return; }
    const tick = 50;
    intervalRef.current = setInterval(() => {
      setElapsed((prev) => {
        if (prev + tick >= SLIDE_DURATION) {
          setCurrent((c) => (c + 1) % SLIDES.length);
          return 0;
        }
        return prev + tick;
      });
    }, tick);
    return clearTimer;
  }, [playing, clearTimer]);

  const goTo = (i: number) => { setCurrent(i); setElapsed(0); };

  const slide = SLIDES[current];
  const pct = (elapsed / SLIDE_DURATION) * 100;

  return (
    <div className={`rounded-2xl bg-gradient-to-br ${slide.bg} p-6 text-white relative overflow-hidden`}>
      <div className="flex items-center gap-4 mb-4">
        {slide.icon}
        <div className="flex-1">
          <h3 className="text-lg font-bold leading-tight">{slide.title}</h3>
          <p className="text-sm text-white/70 mt-1 leading-relaxed">{slide.desc}</p>
        </div>
      </div>

      {/* Progress */}
      <div className="flex gap-1.5 mb-3">
        {SLIDES.map((_, i) => (
          <div key={i} className="flex-1 h-1 rounded-full bg-white/20 overflow-hidden cursor-pointer" onClick={() => goTo(i)}>
            <div
              className="h-full bg-white/80 rounded-full transition-all duration-100"
              style={{ width: i < current ? "100%" : i === current ? `${pct}%` : "0%" }}
            />
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] text-white/50 font-medium">{current + 1} / {SLIDES.length}</span>
        <button
          onClick={() => setPlaying(!playing)}
          className="flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium hover:bg-white/20 transition"
        >
          {playing ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
          {playing ? "Pauza" : "Play"}
        </button>
      </div>
    </div>
  );
}

/* ─── ACCORDION STEP ─── */
function AccordionStep({ step, index, isOpen, onToggle, isCompleted }: {
  step: typeof STEPS[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  isCompleted: boolean;
}) {
  return (
    <div className={`rounded-xl border transition-colors ${isOpen ? "border-primary/40 bg-primary/5" : "border-border/60 bg-card"}`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 p-4 text-left"
      >
        <span className={`shrink-0 flex items-center justify-center h-7 w-7 rounded-full text-xs font-bold ${
          isCompleted ? "bg-emerald-500 text-white" : isOpen ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
        }`}>
          {isCompleted ? <CheckCircle2 className="h-4 w-4" /> : index + 1}
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold truncate">{step.deField}</p>
          <p className="text-[11px] text-muted-foreground truncate">{step.bhsField}</p>
        </div>
        <ChevronDown className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="px-4 pb-4 space-y-2">
          {step.details.map((d, i) => (
            <div key={i} className="rounded-lg border border-border/40 bg-background p-3">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide mb-1">{d.label}</p>
              <p className="text-xs leading-relaxed text-foreground/80">{d.value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── MAIN COMPONENT ─── */
export default function KindergeldHowTo() {
  const [currentStep, setCurrentStep] = useState(0);
  const [openStep, setOpenStep] = useState(0);
  const [completed, setCompleted] = useState<Set<number>>(new Set());

  const toggleStep = (i: number) => {
    setOpenStep(openStep === i ? -1 : i);
    setCurrentStep(i);
  };

  const goStep = (dir: -1 | 1) => {
    const next = Math.min(Math.max(currentStep + dir, 0), STEPS.length - 1);
    setCurrentStep(next);
    setOpenStep(next);
    if (dir === 1) setCompleted((prev) => new Set(prev).add(currentStep));
  };

  const finishAll = () => {
    const all = new Set<number>();
    STEPS.forEach((_, i) => all.add(i));
    setCompleted(all);
  };

  const progress = ((currentStep + 1) / STEPS.length) * 100;
  const allDone = completed.size === STEPS.length;

  return (
    <div className="space-y-6">
      {/* ─── VIDEO SLIDESHOW ─── */}
      <KindergeldSlideshow />

      {/* ─── SMART GUIDE ─── */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-bold">Smart Guide — 8 koraka</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Svako polje objašnjeno. Klikni na korak da ga otvoriš.</p>
        </div>

        <div className="flex items-center gap-3">
          <Progress value={progress} className="h-2 flex-1" />
          <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">
            {currentStep + 1} / {STEPS.length}
          </span>
        </div>

        <div className="space-y-2">
          {STEPS.map((step, i) => (
            <AccordionStep
              key={i}
              step={step}
              index={i}
              isOpen={openStep === i}
              onToggle={() => toggleStep(i)}
              isCompleted={completed.has(i)}
            />
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button variant="outline" size="sm" disabled={currentStep === 0} onClick={() => goStep(-1)}>
            <ChevronLeft className="mr-1 h-4 w-4" /> Nazad
          </Button>
          {currentStep === STEPS.length - 1 ? (
            <Button
              size="sm"
              className="font-bold"
              onClick={finishAll}
              style={allDone ? { backgroundColor: "#22c55e", color: "#fff" } : { backgroundColor: "#EAB308", color: "#000" }}
            >
              {allDone ? "✅ Gotovo!" : "Završi vodič"}
            </Button>
          ) : (
            <Button
              size="sm"
              className="font-bold"
              style={{ backgroundColor: "#EAB308", color: "#000" }}
              onClick={() => goStep(1)}
            >
              Dalje <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
