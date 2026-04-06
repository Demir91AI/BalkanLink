import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { ChevronLeft, ChevronRight, FileText, BookOpen, AlertTriangle, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import type { Tables } from "@/integrations/supabase/types";
import { useSubscription } from "@/hooks/useSubscription";
import SmartGuideLock from "@/components/paywall/SmartGuideLock";

type FormField = Tables<"form_fields">;

/* ------------------------------------------------------------------ */
/*  STEP DEFINITIONS + RICH CONTENT                                    */
/* ------------------------------------------------------------------ */

interface GuideCard {
  title: string;
  icon: string;
  items: string[];
}

interface StepContent {
  key: string;
  title: string;
  desc: string;
  cards: GuideCard[];
  example: { label: string; lines: string[] };
  miniDict?: { term: string; meaning: string }[];
  rejectionReasons?: string[];
}

const steps: StepContent[] = [
  {
    key: "antragsteller",
    title: "Schritt 1: Antragstellende Person",
    desc: "Tvoji lični podaci — ime, adresa, Steuer-ID",
    rejectionReasons: [
      "Pogrešna ili izostavljena Steuer-ID (najčešći razlog!)",
      "Nedostaje potpis na kraju formulara",
      "IBAN netačan ili sa pogrešnim razmacima",
      "Nedostaje Anlage Kind (prilog za dijete) kada je potreban",
      "Adresa se ne poklapa s prijavom prebivališta (Meldebescheinigung)",
    ],
    cards: [
      {
        title: "Šta tačno upisuješ",
        icon: "✏️",
        items: [
          "Steuer-ID (Steuerliche Identifikationsnummer) — tvoj porezni ID, 11 cifara",
          "Familienname — prezime tačno kao u pasošu/ličnoj karti",
          "Vorname — ime tačno kao u pasošu (bez nadimaka!)",
          "Geburtsdatum — datum rođenja u formatu DD.MM.GGGG",
          "Geburtsort — mjesto rođenja (grad + država ako si rođen/a vani)",
          "Staatsangehörigkeit — državljanstvo, npr. \"Bosnien und Herzegowina\"",
          "Anschrift — ulica (Straße), kućni broj (Hausnr.), poštanski broj (PLZ), grad (Ort)",
          "Familienstand — bračni status: ledig (neoženjen/neudata), verheiratet (u braku), geschieden (razveden/a), verwitwet (udovac/udovica)",
        ],
      },
      {
        title: "Gdje to nađeš",
        icon: "🔍",
        items: [
          "Steuer-ID → pismo od Finanzamt-a (dolazi poštom kad se prvi put prijaviš), ili na portalu Elster, ili na poreznom rješenju (Steuerbescheid)",
          "Ime i prezime → pasoš ili lična karta (Aufenthaltstitel)",
          "Adresa → Meldebescheinigung (potvrda o prijavi prebivališta) ili pismo koje si dobio/la od grada",
          "Datum rođenja → pasoš",
        ],
      },
      {
        title: "Format (kako izgleda pravilan unos)",
        icon: "📐",
        items: [
          "Steuer-ID: 12 345 678 901 (11 cifara, razmaci opcioni)",
          "Datum: 15.03.1990 (uvijek DD.MM.GGGG)",
          "PLZ: 80331 (5 cifara za Njemačku)",
          "Državljanstvo: puni naziv na njemačkom, npr. \"Kroatien\", \"Serbien\"",
        ],
      },
      {
        title: "Česte greške",
        icon: "⚠️",
        items: [
          "Miješanje Steuer-ID (11 cifara, za osobu) sa Steuernummer (drugačiji format, za poreznu prijavu) — NISU ISTI!",
          "Pisanje nadimka umjesto punog imena iz pasoša",
          "Pogrešan format datuma (američki MM/DD umjesto DD.MM.GGGG)",
          "Umlaut greške: ü, ö, ä — ako ih nemaš na tastaturi, piši ue, oe, ae",
          "Adresa koja se razlikuje od prijave prebivališta",
        ],
      },
      {
        title: "Kada ostaviti prazno",
        icon: "⬜",
        items: [
          "Steuer-ID: nikad ne ostavljaj prazno — ako je nemaš, zatraži od Finanzamt-a",
          "Geburtsort: obavezno — upiši i državu ako si rođen/a van Njemačke",
          "Sva polja u ovom koraku su obavezna",
        ],
      },
    ],
    example: {
      label: "Primjer popunjenog (pseudo podaci)",
      lines: [
        "Steuer-ID: 12 345 678 901",
        "Familienname: Hodžić",
        "Vorname: Marko",
        "Geburtsdatum: 15.03.1990",
        "Geburtsort: Sarajevo, Bosnien und Herzegowina",
        "Staatsangehörigkeit: Bosnien und Herzegowina",
        "Straße/Hausnr.: Schillerstraße 12",
        "PLZ / Ort: 80336 München",
        "Familienstand: verheiratet",
      ],
    },
    miniDict: [
      { term: "Vorname", meaning: "Ime" },
      { term: "Nachname / Familienname", meaning: "Prezime" },
      { term: "PLZ (Postleitzahl)", meaning: "Poštanski broj" },
      { term: "Ort", meaning: "Grad / Mjesto" },
      { term: "Anschrift", meaning: "Adresa" },
      { term: "Geburtsdatum", meaning: "Datum rođenja" },
      { term: "Staatsangehörigkeit", meaning: "Državljanstvo" },
      { term: "Familienstand", meaning: "Bračni status" },
      { term: "ledig", meaning: "Neoženjen / neudata" },
      { term: "verheiratet", meaning: "U braku" },
      { term: "geschieden", meaning: "Razveden/a" },
    ],
  },
  {
    key: "partner",
    title: "Schritt 2: Partner / Drugi roditelj",
    desc: "Podaci o partneru ili drugom roditelju u domaćinstvu",
    cards: [
      {
        title: "Šta tačno upisuješ",
        icon: "✏️",
        items: [
          "Ime i prezime partnera/drugog roditelja",
          "Steuer-ID partnera (ako ima)",
          "Geburtsdatum partnera",
          "Adresa (ako je ista kao tvoja, dovoljno je naznačiti \"wie Antragsteller\")",
        ],
      },
      {
        title: "Gdje to nađeš",
        icon: "🔍",
        items: [
          "Steuer-ID partnera → njihovo pismo od Finanzamt-a ili Elster portal",
          "Ime/prezime → pasoš partnera",
          "Ako partner nema Steuer-ID (tek došao/la) → ostaviti prazno i napisati napomenu",
        ],
      },
      {
        title: "Format",
        icon: "📐",
        items: [
          "Steuer-ID: 11 cifara, isti format kao tvoja",
          "Datum: DD.MM.GGGG",
        ],
      },
      {
        title: "Česte greške",
        icon: "⚠️",
        items: [
          "Popunjavanje ovog dijela kada partner NE živi u istom domaćinstvu",
          "Miješanje podataka bivšeg partnera sa sadašnjim",
          "Zaboravljanje Steuer-ID partnera (ako postoji, obavezno upisati)",
        ],
      },
      {
        title: "Kada ostaviti prazno",
        icon: "⬜",
        items: [
          "Ako si samohrani roditelj (alleinerziehend) — preskoči cijeli korak",
          "Ako ste razvedeni (geschieden) ili trajno razdvojeni (dauernd getrennt lebend)",
          "Ako partner ne živi u Njemačkoj i nema Steuer-ID",
        ],
      },
    ],
    example: {
      label: "Primjer popunjenog",
      lines: [
        "Familienname: Hodžić",
        "Vorname: Ana",
        "Steuer-ID: 98 765 432 109",
        "Geburtsdatum: 22.07.1992",
        "Anschrift: wie Antragsteller (ista kao podnosilac)",
      ],
    },
  },
  {
    key: "zahlung",
    title: "Schritt 3: Zahlungsweg (Plaćanje)",
    desc: "IBAN i podaci o bankovnom računu za isplatu Kindergeld-a",
    cards: [
      {
        title: "Šta tačno upisuješ",
        icon: "✏️",
        items: [
          "IBAN — međunarodni broj bankovnog računa",
          "Kontoinhaber — vlasnik računa (ime i prezime)",
          "Ako isplata ide na račun druge osobe — navesti ime te osobe",
        ],
      },
      {
        title: "Gdje to nađeš",
        icon: "🔍",
        items: [
          "IBAN → u banking aplikaciji (npr. Sparkasse, N26, Commerzbank), na bankovnoj kartici, ili na mjesečnom izvodu",
          "Kontoinhaber → isto kao ime na bankovnom računu",
        ],
      },
      {
        title: "Format",
        icon: "📐",
        items: [
          "IBAN (Njemačka): DE89 3704 0044 0532 0130 00 (22 znaka, počinje sa DE)",
          "Kontoinhaber: tačno kao što piše u banci (pazi na umlaut-e)",
        ],
      },
      {
        title: "Česte greške",
        icon: "⚠️",
        items: [
          "Pogrešan IBAN — uvijek provjeri u banking aplikaciji, ne prepisuj od nekoga",
          "Ime vlasnika računa se ne poklapa sa imenom u banci",
          "Razmaci u IBAN-u — na formularu upisuj BEZ razmaka ili tačno u polja",
          "Upisivanje BIC/SWIFT umjesto IBAN-a",
        ],
      },
      {
        title: "Kada ostaviti prazno",
        icon: "⬜",
        items: [
          "Nikad ne ostavljaj IBAN prazno — inače ne mogu isplatiti Kindergeld",
          "Ako nemaš njemački račun, moraš ga otvoriti prije podnošenja zahtjeva",
        ],
      },
    ],
    example: {
      label: "Primjer popunjenog",
      lines: [
        "IBAN: DE89 3704 0044 0532 0130 00",
        "Kontoinhaber: Marko Hodžić",
      ],
    },
  },
  {
    key: "bescheid",
    title: "Schritt 4: Bescheid-Empfänger",
    desc: "Ko prima rješenje (odluku) o Kindergeld-u",
    cards: [
      {
        title: "Šta tačno upisuješ",
        icon: "✏️",
        items: [
          "Ime i adresa osobe/organizacije koja treba primiti odluku (Bescheid)",
          "U većini slučajeva — ništa (jer ćeš ti dobiti pismo na svoju adresu)",
        ],
      },
      {
        title: "Gdje to nađeš",
        icon: "🔍",
        items: [
          "Samo ako koristiš poreznog savjetnika (Steuerberater) ili advokata koji zastupa tvoj zahtjev",
          "Adresa savjetnika → na njihovoj vizitkarti ili ugovoru",
        ],
      },
      {
        title: "Format",
        icon: "📐",
        items: [
          "Standardna adresa: Ime, Ulica + broj, PLZ + Grad",
        ],
      },
      {
        title: "Česte greške",
        icon: "⚠️",
        items: [
          "Popunjavanje ovog dijela bez potrebe — ako želiš da pismo dođe tebi, ne popunjavaj",
          "Pogrešna adresa savjetnika",
        ],
      },
      {
        title: "Kada ostaviti prazno",
        icon: "⬜",
        items: [
          "UVIJEK ostavi prazno ako nemaš savjetnika ili zastupnika",
          "Pismo (Bescheid) će automatski doći na tvoju adresu iz Koraka 1",
        ],
      },
    ],
    example: {
      label: "Primjer",
      lines: [
        "U većini slučajeva: ostavi prazno ✓",
        "Ako imaš savjetnika: Steuerberater Max Müller, Kaiserstr. 5, 60311 Frankfurt",
      ],
    },
  },
  {
    key: "kinder",
    title: "Schritt 5: Kinder (Djeca)",
    desc: "Informacije o djeci za koju tražiš Kindergeld",
    cards: [
      {
        title: "Šta tačno upisuješ",
        icon: "✏️",
        items: [
          "Ime i prezime svakog djeteta",
          "Datum i mjesto rođenja djeteta",
          "Steuer-ID djeteta (ako je dijete prijavljeno u Njemačkoj, ima svoju Steuer-ID)",
          "Adresa djeteta (ako je ista kao tvoja — napiši \"wie Antragsteller\")",
          "Razlika: djeca za koju tražiš Kindergeld vs. ostala djeca u kući",
        ],
      },
      {
        title: "Gdje to nađeš",
        icon: "🔍",
        items: [
          "Steuer-ID djeteta → dolazi poštom od Finanzamt-a nakon prijave prebivališta djeteta",
          "Datum rođenja → rodni list (Geburtsurkunde)",
          "Ako je dijete rođeno u inostranstvu, treba prevedeni rodni list",
        ],
      },
      {
        title: "Format",
        icon: "📐",
        items: [
          "Datum: DD.MM.GGGG",
          "Steuer-ID djeteta: 11 cifara",
          "Navodi djecu po redu — od najstarijeg do najmlađeg",
        ],
      },
      {
        title: "Česte greške",
        icon: "⚠️",
        items: [
          "Zaboravljanje Steuer-ID djeteta (ako postoji — obavezno upisati!)",
          "Miješanje redova djece — pazi koji red pripada kojem djetetu",
          "Ne navođenje djeteta koje živi kod drugog roditelja (ali se računa za redosljed)",
          "Nedostaje Anlage Kind (KG1-AnlKi) prilog — svako dijete treba svoj prilog!",
        ],
      },
      {
        title: "Kada ostaviti prazno",
        icon: "⬜",
        items: [
          "Ako dijete živi u inostranstvu — navedi ga ali provjeri posebne uvjete",
          "Ako je dijete starije od 18 — možda ima pravo ako je u školovanju (do 25)",
          "Polje \"weitere Kinder\" popuni samo ako imaš više djece nego što stane u tabelu",
        ],
      },
    ],
    example: {
      label: "Primjer popunjenog (2 djece)",
      lines: [
        "Kind 1: Hodžić, Emina, geb. 10.05.2018, Steuer-ID: 11 222 333 444, Geburtsort: München",
        "Kind 2: Hodžić, Amar, geb. 03.11.2021, Steuer-ID: 55 666 777 888, Geburtsort: München",
        "Adresse: wie Antragsteller",
      ],
    },
  },
  {
    key: "unterschrift",
    title: "Schritt 6: Unterschrift (Potpis)",
    desc: "Potpis, datum i završetak formulara",
    cards: [
      {
        title: "Šta tačno upisuješ",
        icon: "✏️",
        items: [
          "Datum podnošenja (Datum) — današnji datum kad šalješ formular",
          "Potpis (Unterschrift) — tvoj potpis rukom",
        ],
      },
      {
        title: "Gdje to nađeš",
        icon: "🔍",
        items: [
          "Datum: danas — dan kad šalješ ili predaješ formular",
          "Potpis: tvoj lični potpis (kao na ličnoj karti)",
        ],
      },
      {
        title: "Format",
        icon: "📐",
        items: [
          "Datum: DD.MM.GGGG (npr. 02.03.2026)",
          "Potpis: čitko, rukom — digitalni potpis se NE prihvata za papirni formular",
        ],
      },
      {
        title: "Česte greške",
        icon: "⚠️",
        items: [
          "Zaboravljanje potpisa — ovo je najlakša greška i čest razlog za odbijanje!",
          "Stavljanje pogrešnog datuma (ne datum popunjavanja, nego datum slanja)",
          "Potpis koji se ne poklapa sa imenom na formularu",
        ],
      },
      {
        title: "Kada ostaviti prazno",
        icon: "⬜",
        items: [
          "NIKAD — potpis i datum su uvijek obavezni",
          "Ako oba roditelja žive u domaćinstvu, dovoljno je potpis jednog roditelja",
          "Ako šalješ online (ako je moguće), slijedi upute za elektronski potpis",
        ],
      },
    ],
    example: {
      label: "Primjer",
      lines: [
        "Datum: 02.03.2026",
        "Unterschrift: [potpis rukom — Marko Hodžić]",
      ],
    },
  },
];

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */

interface Props {
  fields: FormField[];
  pdfUrl: string;
}

export default function SmartGuideWizard({ fields, pdfUrl }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlStep = parseInt(searchParams.get("step") || "1", 10);
  const step = Math.max(0, Math.min(steps.length - 1, urlStep - 1));
  const current = steps[step];
  const { canAccessStep } = useSubscription();

  const setStep = useCallback((i: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("step", String(i + 1));
    setSearchParams(newParams, { replace: false });
  }, [searchParams, setSearchParams]);

  const sectionFields = fields.filter((f) => f.section === current.key);
  const hasMappedFields = sectionFields.length > 0;

  const handleScrollToPdf = () => {
    if (!hasMappedFields) {
      toast({ title: "Mapiranje u toku", description: "PDF highlight će biti dostupan uskoro." });
      return;
    }
    // Future: scroll to mapped field area in PDF viewer
    toast({ title: "Prikaži na PDF-u", description: "Prebaci se na \"PDF Smart Click\" tab za interaktivni prikaz." });
  };

  return (
    <div className="mt-4 space-y-4">
      {/* Step pills */}
      <div className="flex items-center gap-1 overflow-x-auto pb-2">
        {steps.map((s, i) => (
          <button
            key={s.key}
            onClick={() => setStep(i)}
            className={`shrink-0 rounded-full px-3 py-1 text-[10px] font-medium transition ${
              i === step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <SmartGuideLock locked={!canAccessStep(step)}>
        {/* Step header */}
        <div className="rounded-2xl border bg-card p-5">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-bold text-sm">{current.title}</h3>
              <p className="text-xs text-muted-foreground">{current.desc}</p>
            </div>
            <Button variant="outline" size="sm" className="shrink-0 text-[10px]" onClick={handleScrollToPdf}>
              <Eye className="mr-1 h-3 w-3" /> Prikaži na PDF-u
            </Button>
          </div>

          {!hasMappedFields && (
            <div className="mt-3 flex items-start gap-2 rounded-xl border border-yellow-300/40 bg-yellow-50 p-3 dark:border-yellow-700/40 dark:bg-yellow-950/30">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-yellow-600 dark:text-yellow-400" />
              <div>
                <div className="mb-1 flex items-center gap-2">
                  <Badge variant="outline" className="border-yellow-500/30 text-yellow-700 dark:text-yellow-300 text-[9px]">
                    <BookOpen className="mr-1 h-3 w-3" /> Guide mode
                  </Badge>
                </div>
                <p className="text-xs text-yellow-800 dark:text-yellow-200">
                  Mapiranje klikabilnih polja je u toku. Ovaj korak možeš popuniti uz vodič ispod, a PDF pregled će raditi čim mapiranje bude završeno.
                </p>
              </div>
            </div>
          )}

          {hasMappedFields && (
            <div className="mt-4 space-y-3">
              {sectionFields.map((field) => (
                <div key={field.id} className="rounded-xl border bg-background p-4">
                  <div className="mb-1 flex items-start justify-between gap-2">
                    <p className="text-xs font-bold text-primary">{field.label_de}</p>
                  </div>
                  <p className="text-xs font-medium">{field.label_bs}</p>
                  {field.help_text_bs && (<div className="mt-2"><p className="text-[10px] font-semibold text-muted-foreground">Šta upisati ovdje:</p><p className="text-xs">{field.help_text_bs}</p></div>)}
                  {field.example && (<div className="mt-2"><p className="text-[10px] font-semibold text-muted-foreground">Primjer:</p><p className="text-xs font-mono bg-muted/50 rounded px-2 py-1 inline-block">{field.example}</p></div>)}
                  {field.where_to_find_bs && (<div className="mt-2"><p className="text-[10px] font-semibold text-muted-foreground">Gdje to nađeš:</p><p className="text-xs">{field.where_to_find_bs}</p></div>)}
                  {field.common_mistakes_bs && (<div className="mt-2"><p className="text-[10px] font-semibold text-muted-foreground">Najčešće greške:</p><p className="text-xs text-red-600 dark:text-red-400">{field.common_mistakes_bs}</p></div>)}
                  {field.format_hint_bs && (<div className="mt-2"><p className="text-[10px] font-semibold text-muted-foreground">Kako upisati:</p><p className="text-xs">{field.format_hint_bs}</p></div>)}
                </div>
              ))}
            </div>
          )}
        </div>

        {current.rejectionReasons && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 dark:border-red-900/40 dark:bg-red-950/20">
            <h4 className="mb-2 flex items-center gap-1.5 text-xs font-bold text-red-700 dark:text-red-400">
              <AlertTriangle className="h-3.5 w-3.5" /> Najčešći razlozi zbog kojih odbijaju zahtjev
            </h4>
            <ul className="space-y-1 pl-4 list-disc">
              {current.rejectionReasons.map((r, i) => (
                <li key={i} className="text-xs text-red-600 dark:text-red-300">{r}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="grid gap-3 sm:grid-cols-2">
          {current.cards.map((card) => (
            <div key={card.title} className="rounded-2xl border bg-card p-4">
              <h4 className="mb-2 text-xs font-bold"><span className="mr-1.5">{card.icon}</span>{card.title}</h4>
              <ul className="space-y-1 pl-4 list-disc">
                {card.items.map((item, i) => (<li key={i} className="text-xs text-muted-foreground leading-relaxed">{item}</li>))}
              </ul>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4">
          <h4 className="mb-2 text-xs font-bold text-primary">📝 {current.example.label}</h4>
          <div className="space-y-0.5">
            {current.example.lines.map((line, i) => (<p key={i} className="text-xs font-mono">{line}</p>))}
          </div>
        </div>

        {current.miniDict && (
          <div className="rounded-2xl border bg-card p-4">
            <h4 className="mb-2 text-xs font-bold">📖 Mini rječnik</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 sm:grid-cols-3">
              {current.miniDict.map((d) => (
                <div key={d.term} className="text-xs">
                  <span className="font-semibold">{d.term}</span>{" "}
                  <span className="text-muted-foreground">— {d.meaning}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </StepLockOverlay>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" disabled={step === 0} onClick={() => setStep(step - 1)}>
          <ChevronLeft className="mr-1 h-4 w-4" /> Nazad
        </Button>
        <span className="text-[10px] text-muted-foreground">{step + 1} / {steps.length}</span>
        <Button variant="outline" size="sm" disabled={step === steps.length - 1} onClick={() => setStep(step + 1)}>
          Dalje <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>

      {/* PDF link */}
      <div className="text-center">
        <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground underline">
          <FileText className="h-3 w-3" /> Otvori službeni PDF u novom tabu
        </a>
      </div>
    </div>
  );
}
