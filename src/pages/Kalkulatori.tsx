import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp, ExternalLink, X } from "lucide-react";
import PageNavBar from "@/components/navigation/PageNavBar";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Collapsible, CollapsibleContent, CollapsibleTrigger,
} from "@/components/ui/collapsible";


/* ── German locale formatter ── */
const fmt = (n: number) =>
  n.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const pct = (part: number, whole: number) =>
  whole > 0 ? ((part / whole) * 100).toFixed(1) : "0.0";

/* ── Bundesländer with Kirchensteuer rate ── */
const BUNDESLAENDER = [
  { value: "BW", label: "Baden-Württemberg", ks: 8 },
  { value: "BY", label: "Bayern", ks: 8 },
  { value: "BE", label: "Berlin", ks: 9 },
  { value: "BB", label: "Brandenburg", ks: 9 },
  { value: "HB", label: "Bremen", ks: 9 },
  { value: "HH", label: "Hamburg", ks: 9 },
  { value: "HE", label: "Hessen", ks: 9 },
  { value: "MV", label: "Mecklenburg-Vorpommern", ks: 9 },
  { value: "NI", label: "Niedersachsen", ks: 9 },
  { value: "NW", label: "Nordrhein-Westfalen", ks: 9 },
  { value: "RP", label: "Rheinland-Pfalz", ks: 9 },
  { value: "SL", label: "Saarland", ks: 9 },
  { value: "SN", label: "Sachsen", ks: 9 },
  { value: "ST", label: "Sachsen-Anhalt", ks: 9 },
  { value: "SH", label: "Schleswig-Holstein", ks: 9 },
  { value: "TH", label: "Thüringen", ks: 9 },
];

const OST_LAENDER = ["BB", "MV", "SN", "ST", "TH", "BE"];

const STEUERKLASSE_OPTIONS = [
  { value: 1, label: "I — Slobodan/a, samac" },
  { value: 2, label: "II — Samohrani roditelj" },
  { value: 3, label: "III — Bračni par, veća plata" },
  { value: 4, label: "IV — Bračni par, slične plate" },
  { value: 5, label: "V — Bračni par, manja plata" },
  { value: 6, label: "VI — Drugi posao / više poslodavaca" },
];

const KINDERFREIBETRAG_OPTIONS = [
  { value: "0", label: "0 — Nemam pravo / ne koristim" },
  { value: "0.5", label: "0.5 — Pola (jedan roditelj)" },
  { value: "1", label: "1.0 — Standardno (jedan roditelj, oba dijela)" },
  { value: "1.5", label: "1.5" },
  { value: "2", label: "2.0 — Standardno (oba roditelja, jedno dijete)" },
  { value: "2.5", label: "2.5" },
  { value: "3", label: "3.0" },
  { value: "4", label: "4.0" },
  { value: "6", label: "6.0 — Maksimalno (oba roditelja, troje+ djece)" },
];

/* ── Tax computation 2025 §32a EStG ── */
function computeYearlyTax2025(zvE: number): number {
  if (zvE <= 12084) return 0;
  if (zvE <= 17430) {
    const y = (zvE - 12084) / 10000;
    return Math.floor((932.30 * y + 1400) * y);
  }
  if (zvE <= 68430) {
    const y = (zvE - 17430) / 10000;
    return Math.floor((176.44 * y + 2397) * y + 1025.38);
  }
  if (zvE <= 277825) return Math.floor(0.42 * zvE - 10602.13);
  return Math.floor(0.45 * zvE - 18936.88);
}

/* ── Tax computation 2024 §32a EStG ── */
function computeYearlyTax2024(zvE: number): number {
  if (zvE <= 11604) return 0;
  if (zvE <= 17005) {
    const y = (zvE - 11604) / 10000;
    return Math.floor((922.98 * y + 1400) * y);
  }
  if (zvE <= 66760) {
    const y = (zvE - 17005) / 10000;
    return Math.floor((181.19 * y + 2397) * y + 1025.38);
  }
  if (zvE <= 277825) return Math.floor(0.42 * zvE - 10602.13);
  return Math.floor(0.45 * zvE - 18936.88);
}

function computeYearlyTax(zvE: number, year: number): number {
  return year >= 2025 ? computeYearlyTax2025(zvE) : computeYearlyTax2024(zvE);
}

/* ── Inputs state ── */
interface CalcInputs {
  brutto: number;
  period: "monatlich" | "jaehrlich";
  godina: number;
  steuerklasse: number;
  bundesland: string;
  hasDjeca: boolean;
  brojDjece: number | null;
  brojDjeceIspod25: number | null;
  kinderfreibetrag: number;
  alter: number;
  kvType: "gesetzlich" | "privat";
  zusatzbeitrag: number;
  pkvBeitrag: number;
  rvEnabled: boolean;
  avEnabled: boolean;
  kirchensteuer: boolean;
  freibetrag: number;
  geldwerterVorteil: number;
}

const DEFAULTS: CalcInputs = {
  brutto: 3000,
  period: "monatlich",
  godina: 2026,
  steuerklasse: 1,
  bundesland: "BY",
  hasDjeca: false,
  brojDjece: null,
  brojDjeceIspod25: null,
  kinderfreibetrag: 2.0,
  alter: 30,
  kvType: "gesetzlich",
  zusatzbeitrag: 2.5,
  pkvBeitrag: 400,
  rvEnabled: true,
  avEnabled: true,
  kirchensteuer: false,
  freibetrag: 0,
  geldwerterVorteil: 0,
};

/* ── Core calculation ── */
function calculate(inp: CalcInputs) {
  const bruttoMonat = inp.period === "jaehrlich" ? inp.brutto / 12 : inp.brutto;
  const bruttoJahr = bruttoMonat * 12;
  const isOst = OST_LAENDER.includes(inp.bundesland);
  const isSachsen = inp.bundesland === "SN";
  const is2025 = inp.godina >= 2025;

  const bbgKvPv = is2025 ? 5512.50 : 5175;
  const bbgRvAv = is2025 ? 7550 : (isOst ? 7450 : 7550);

  const rvBasis = Math.min(bruttoMonat, bbgRvAv);
  const kvBasis = Math.min(bruttoMonat, bbgKvPv);

  const rv = inp.rvEnabled ? rvBasis * 0.093 : 0;
  const av = inp.avEnabled ? rvBasis * 0.013 : 0;

  let kv = 0;
  let pkvMonat = 0;
  if (inp.kvType === "gesetzlich") {
    kv = kvBasis * (0.073 + (inp.zusatzbeitrag / 100) / 2);
  } else {
    pkvMonat = inp.pkvBeitrag;
  }

  // PV: kinderlos zuschlag only if no children under 25 AND age >= 23
  const effBrojDjece = inp.brojDjece ?? 0;
  const effBrojDjeceIspod25 = inp.brojDjeceIspod25 ?? 0;
  let pvRate = isSachsen ? 0.02025 : 0.01525;
  const hasChildUnder25 = inp.hasDjeca && effBrojDjeceIspod25 > 0;
  if (!hasChildUnder25 && !inp.hasDjeca && inp.alter >= 23) pvRate += 0.0035;
  const pv = kvBasis * pvRate;

  const sozialGesamt = rv + av + kv + pv + pkvMonat;

  // Tax
  const gvJahr = inp.geldwerterVorteil * 12;
  let taxableBrutto = bruttoJahr + gvJahr - inp.freibetrag;

  const werbungskosten = 1230;
  const sonderausgaben = 36;
  const vorsorgepauschale = bruttoJahr * 0.11;

  let zvE = taxableBrutto - werbungskosten - sonderausgaben - vorsorgepauschale;

  // Kinderfreibetrag
  const kfbPerUnit = is2025 ? 9312 : 6384;
  const kfbTotal = inp.hasDjeca ? inp.kinderfreibetrag * kfbPerUnit : 0;

  // Günstigerprüfung: only apply KFB if tax saving > Kindergeld equivalent
  const applyKfb = (baseZvE: number): number => {
    if (kfbTotal <= 0) return baseZvE;
    const taxWithout = computeYearlyTax(Math.max(0, baseZvE), inp.godina);
    const taxWith = computeYearlyTax(Math.max(0, baseZvE - kfbTotal), inp.godina);
    const kindergeldYearly = (inp.hasDjeca ? effBrojDjece : 0) * 250 * 12;
    if ((taxWithout - taxWith) > kindergeldYearly) {
      return Math.max(0, baseZvE - kfbTotal);
    }
    return baseZvE;
  };

  let yearlyTax: number;
  switch (inp.steuerklasse) {
    case 2:
      zvE = Math.max(0, zvE - 4260);
      zvE = applyKfb(zvE);
      yearlyTax = computeYearlyTax(Math.max(0, zvE), inp.godina);
      break;
    case 3:
      zvE = applyKfb(Math.max(0, zvE));
      yearlyTax = computeYearlyTax(Math.max(0, zvE / 2), inp.godina) * 2;
      break;
    case 5:
    case 6:
      zvE = taxableBrutto - werbungskosten - sonderausgaben - vorsorgepauschale;
      zvE = Math.max(0, zvE);
      yearlyTax = computeYearlyTax(zvE, inp.godina);
      break;
    default:
      zvE = applyKfb(Math.max(0, zvE));
      yearlyTax = computeYearlyTax(Math.max(0, zvE), inp.godina);
  }

  const lohnsteuerMonat = Math.max(0, yearlyTax / 12);

  let soliMonat = 0;
  if (yearlyTax > 31080) {
    soliMonat = lohnsteuerMonat * 0.055;
  } else if (yearlyTax > 18130) {
    const factor = (yearlyTax - 18130) / (31080 - 18130);
    soliMonat = lohnsteuerMonat * 0.055 * factor;
  }

  const ksRate = BUNDESLAENDER.find(b => b.value === inp.bundesland)?.ks ?? 9;
  const kirchensteuerMonat = inp.kirchensteuer ? lohnsteuerMonat * (ksRate / 100) : 0;

  const steuernGesamt = lohnsteuerMonat + soliMonat + kirchensteuerMonat;
  const nettoMonat = bruttoMonat - steuernGesamt - sozialGesamt;

  const r2 = (n: number) => Math.round(n * 100) / 100;

  return {
    bruttoMonat: r2(bruttoMonat),
    nettoMonat: r2(nettoMonat),
    lohnsteuerMonat: r2(lohnsteuerMonat),
    soliMonat: r2(soliMonat),
    kirchensteuerMonat: r2(kirchensteuerMonat),
    steuernGesamt: r2(steuernGesamt),
    rv: r2(rv), av: r2(av), kv: r2(kv), pv: r2(pv),
    pkvMonat: r2(pkvMonat),
    sozialGesamt: r2(sozialGesamt),
  };
}

/* ── Info tooltip data ── */
const INFO_TEXTS: Record<string, { title: string; text: string; extra?: string }> = {
  brutto: {
    title: "Bruto plata",
    text: "Bruto plata je iznos koji ste dogovorili s poslodavcem — prije svih odbitaka. Od ovog iznosa se odbijaju porezi i doprinosi i na kraju dobijate neto platu na račun. Što je veća bruto plata, to su i odbitci viši, ali neto iznos raste brže od poreza do određene granice.",
    extra: "Zašto bitno: Ovo je polazna tačka za cijeli izračun.",
  },
  period: {
    title: "Mjesečno ili godišnje?",
    text: "Ako unosite bruto platu po mjesecu, rezultat će biti mjesečni neto iznos. Ako unosite godišnju platu, kalkulator je dijeli sa 12 i računa po istoj logici. Korisno ako u ugovoru imate navedenu godišnju platu (Jahresgehalt).",
  },
  godina: {
    title: "Godina obračuna",
    text: "Porezne stope, pragovi i iznosi doprinosa se mijenjaju svake godine. Izaberite godinu za koju želite obračun. Ranija godina je korisna ako želite usporediti ili provjeriti retroaktivni obračun.",
  },
  steuerklasse: {
    title: "Porezna klasa (Steuerklasse)",
    text: "Porezna klasa određuje koliko poreza se odbija od plate svaki mjesec. Postoji 6 klasa:\n• Klasa I: samci, razvedeni, udovci — standardna\n• Klasa II: samohrani roditelji — nešto povoljnija\n• Klasa III: bračni par gdje jedan ima veću platu — manje poreza odbija se od veće plate\n• Klasa IV: bračni par sa sličnim platama\n• Klasa V: bračni par, manja plata — više poreza\n• Klasa VI: drugi posao ili više poslodavaca — najveći odbitak, bez olakšica\nVažno: klasa ne mijenja ukupnu godišnju obavezu, nego raspodjelu. Klasa III i V se zajedno koriste kao par.",
  },
  bundesland: {
    title: "Savezna zemlja (Bundesland)",
    text: "Bundesland je bitan zbog Kirchensteuer — crkveni porez se razlikuje po saveznoj zemlji: Bayern i Baden-Württemberg naplaćuju 8% od Lohnsteuer, svi ostali naplaćuju 9%. Također, za Pflegeversicherung postoji razlika u Sachsenu. Ako niste sigurni, izaberite saveznu zemlju u kojoj radite.",
  },
  djeca: {
    title: "Djeca i poreski obračun",
    text: "Djeca mogu uticati na vaš poreski obračun na nekoliko načina: kroz Kinderfreibetrag (poreznu olakšicu) i kroz Pflegeversicherung (ako imate djecu ispod 25, ne plaćate dodatnih 0.35%). Ako nemate djecu, ovi faktori se ne primjenjuju.",
  },
  brojDjece: {
    title: "Ukupan broj djece",
    text: "Unesite ukupan broj djece za koje imate roditeljsku odgovornost. Ovaj broj se koristi za izračun Kinderfreibetrag i može uticati na Pflegeversicherung. Djeca koja žive u drugom domaćinstvu se i dalje računaju ako ih vi uzdržavate ili imate zajedničko starateljstvo.",
  },
  brojDjeceIspod25: {
    title: "Djeca ispod 25 godina — zašto je bitno?",
    text: "U Njemačkoj se i starija djeca uzimaju u obzir ako su još na školovanju ili studiju — do maksimalno 25. godine. Ovo polje je posebno važno za Pflegeversicherung: osobe bez djece starije od 23 plaćaju dodatnih 0.35% kao Kinderlosenzuschlag. Ako imate dijete ispod 25 godina (čak i jedno), taj dodatak se ne naplaćuje.",
    extra: "Može smanjiti odbitak za osiguranje njege.",
  },
  kinderfreibetrag: {
    title: "Kinderfreibetrag — porezna olakšica za djecu",
    text: "Kinderfreibetrag je iznos koji se može oduzeti od poreske osnovice za svako dijete. Za 2024 iznosi 6.384 € po djetetu godišnje (za oba roditelja zajedno). Ovaj iznos smanjuje poreznu osnovicu i time i Lohnsteuer.\nVažno: Finanzamt automatski provjerava da li je Kinderfreibetrag ili Kindergeld povoljniji i primjenjuje bolju opciju. Za niske prihode Kindergeld je obično povoljniji i Kinderfreibetrag ne pravi razliku. Za više prihode Kinderfreibetrag može smanjiti porez.\nU ovom kalkulatoru možete izabrati udio koji vam odgovara zavisno od toga da li oba roditelja koriste olakšicu ili samo jedan.",
  },
  alter: {
    title: "Starost",
    text: "Starost je relevantna za Pflegeversicherung — osobe bez djece starije od 23 plaćaju dodatnih 0.35% kao Kinderlosenzuschlag.",
  },
  kvType: {
    title: "Zakonsko ili privatno zdravstveno osiguranje?",
    text: "U Njemačkoj postoje dva sistema zdravstvenog osiguranja:\n• GKV (gesetzlich): zakonsko, obavezno za većinu zaposlenih. Doprinos se računa kao procenat od bruto plate.\n• PKV (privat): privatno, dostupno za osobe s višim primanjima ili samozaposlene. Iznos zavisi od ugovora, ne od plate.\nAko ste u GKV sistemu, odbitak se automatski izračunava. Ako imate PKV, unesite vaš stvarni mjesečni doprinos.",
  },
  zusatzbeitrag: {
    title: "Zusatzbeitrag — dodatni procenat KV",
    text: "Zusatzbeitrag je dodatni procenat koji naplaćuje vaša zdravstvena osiguravajuća kuća povrh standardnog doprinosa. Standardni GKV doprinos je 14.6% (polovina = 7.3% plaća zaposleni). Zusatzbeitrag varira zavisno od osiguravajuće kuće — obično između 0.9% i 2.5%. Provjerite tačan iznos u dokumentima vaše zdravstvene kase.",
  },
  pkv: {
    title: "Privatno zdravstveno osiguranje (PKV)",
    text: "Unesite vaš stvarni mjesečni PKV iznos kako bi kalkulator mogao tačno izračunati odbitke.",
  },
  rv: {
    title: "Rentenversicherung — penzijsko osiguranje",
    text: "Penzijsko osiguranje je obavezno za većinu zaposlenih. Stopa za 2024 iznosi 18.6% — polovina (9.3%) plaća zaposleni, drugu polovinu plaća poslodavac. Odbitak se primjenjuje samo do određene gornje granice plate (Beitragsbemessungsgrenze). Iznad te granice nema dodatnog odbitka. Beamte (državni službenici) i neke posebne kategorije mogu biti izuzete — u tom slučaju isključite ovo polje.",
  },
  av: {
    title: "Arbeitslosenversicherung",
    text: "Osiguranje od nezaposlenosti je obavezno za zaposlenike. Stopa za 2024 je 2.6% — polovina (1.3%) plaća zaposleni. Daje pravo na Arbeitslosengeld (naknadu za nezaposlenost) ako ostanete bez posla pod određenim uslovima. Samozaposleni i Beamte obično nisu obuhvaćeni — u tom slučaju isključite ovo polje.",
  },
  pv: {
    title: "Pflegeversicherung — osiguranje za njegu",
    text: "Pflegeversicherung pokriva troškove dugotrajne njege (npr. starački dom, kućna njega) ako to postane potrebno. Stopa za 2024 je 3.05% — polovina plaća zaposleni (1.525%). Izuzetak: osobe bez djece starije od 23 plaćaju dodatnih 0.35% (Kinderlosenzuschlag). U Sachsenu je raspodjela malo drugačija. Ako imate dijete ispod 25 godina, dodatak se ne primjenjuje.",
  },
  kirchensteuer: {
    title: "Crkveni porez (Kirchensteuer)",
    text: "Kirchensteuer se odbija samo ako ste prijavljeni kao član vjerske zajednice koja ga naplaćuje u Njemačkoj (npr. Katolička ili Evangelička crkva). Ako niste član takve zajednice, ili ste istupili, ovo polje ostavite isključeno. Iznos zavisi od savezne zemlje: Bayern i Baden-Württemberg = 8%, ostali = 9% od Lohnsteuer. Ovo može značajno promijeniti ukupni odbitak, posebno kod viših plata.",
  },
  freibetrag: {
    title: "Godišnji porezni odbitak (Freibetrag)",
    text: "Ovo polje nije automatski isto za svakoga. Freibetrag je individualna porezna olakšica koja može smanjiti vaš mjesečni porez ako vam je posebno odobrena od Finanzamt-a. Može biti vezana za određene prijavljene troškove, posebne životne okolnosti ili druge porezno relevantne situacije. Nije isto što i Grundfreibetrag — zakonski neoporezivi minimum koji važi za sve i koji kalkulator automatski uzima u obzir. Ako niste tražili i dobili posebni Freibetrag od Finanzamt-a, ovo polje ostavite na 0. Nasumičan unos broja bez stvarne osnove daje pogrešan rezultat.",
    extra: "Primjer: ako imate odobreno 1.200 € godišnje za troškove prevoza ili dvojno domaćinstvo, unesite 1200.",
  },
  geldwerterVorteil: {
    title: "Geldwerter Vorteil — nenovčana korist",
    text: "Geldwerter Vorteil je nenovčana korist od poslodavca koja se porezno tretira kao dio prihoda. Najčešći primjer je firmeni automobil koji koristite privatno — obračunava se kao 1% od kataložne cijene auta per mjesec. Drugi primjeri: plaćena stanarina, obroci, parking. Ovaj iznos se dodaje na bruto i povećava poreznu osnovicu, što znači više poreza — čak i ako novac direktno ne primite. Ako nemate ovakvu pogodnost, ostavite polje na 0.",
  },
};

/* ── InfoTooltip component ── */
function InfoTooltip({ id, activeId, setActiveId }: { id: string; activeId: string | null; setActiveId: (id: string | null) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const info = INFO_TEXTS[id];
  const isOpen = activeId === id;

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setActiveId(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen, setActiveId]);

  if (!info) return null;

  return (
    <span className="relative inline-block">
      <span
        onClick={(e) => { e.preventDefault(); setActiveId(isOpen ? null : id); }}
        className="inline-block ml-1.5 text-[#F59E0B]/70 hover:text-[#F59E0B] text-sm cursor-pointer select-none"
      >
        ⓘ
      </span>
      {isOpen && (
        <div ref={ref} className="absolute left-0 top-full z-50 mt-2 w-[320px] max-w-[90vw] rounded-xl border border-[#F59E0B]/20 bg-[#0a1628] p-4 shadow-xl">
          <button onClick={() => setActiveId(null)} className="absolute top-2 right-2 text-white/40 hover:text-white/80">
            <X className="h-3.5 w-3.5" />
          </button>
          <p className="text-[#F59E0B] font-bold text-sm mb-2">{info.title}</p>
          <p className="text-white/70 text-sm leading-relaxed whitespace-pre-line">{info.text}</p>
          {info.extra && (
            <p className="mt-2 text-white/50 text-xs">{info.extra}</p>
          )}
        </div>
      )}
    </span>
  );
}

/* ── Toggle buttons component ── */
function ToggleButtons({
  options, value, onChange,
}: {
  options: { label: string; value: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex rounded-xl overflow-hidden border border-white/20">
      {options.map(opt => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`flex-1 px-3 py-2.5 text-xs font-bold transition-all duration-300 ${
            value === opt.value
              ? "bg-[#F59E0B] text-[#0f1f3d]"
              : "bg-white/10 text-white/60 hover:bg-white/15"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

/* ── External tools data ── */
const externalTools = [
  {
    title: "Wohngeld Rechner",
    desc: "Provjeri da li imaš pravo na stambenu pomoć od države",
    url: "https://www.bundesregierung.de/breg-de/themen/wohngeld/wohngeldrechner",
  },
  {
    title: "Kfz Steuer Rechner",
    desc: "Izračunaj godišnji porez na vozilo — zvanični alat",
    url: "https://www.bmf-steuerrechner.de/kfzst/",
  },
  {
    title: "Renten Rechner",
    desc: "Procijeni svoju buduću penziju — zvanični DRV alat",
    url: "https://www.rvrentenrechner.de/",
  },
  {
    title: "ALG 1 Rechner",
    desc: "Izračunaj visinu naknade za nezaposlenost (Arbeitslosengeld I) — zvanični alat Bundesagentur für Arbeit",
    url: "https://con.arbeitsagentur.de/prod/self-service/anspruch-berechnen.html",
  },
];

/* ── Main component ── */
/* ── Parse helper: accept comma or dot, strip leading zeros ── */
function parseNum(raw: string, allowDecimal = false): number {
  const cleaned = raw.replace(",", ".");
  const n = allowDecimal ? parseFloat(cleaned) : parseInt(cleaned, 10);
  return isNaN(n) ? 0 : n;
}

/* ── String-state numeric input for clean editing ── */
type EditStrings = Record<string, string>;

export default function Kalkulatori() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState<CalcInputs>({ ...DEFAULTS });
  const [isYearly, setIsYearly] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [_linkErrors, _setLinkErrors] = useState<Record<number, boolean>>({});
  const [activeInfo, setActiveInfo] = useState<string | null>(null);
  const [editStr, setEditStr] = useState<EditStrings>({});

  const update = useCallback((patch: Partial<CalcInputs>) => {
    setInputs(prev => ({ ...prev, ...patch }));
  }, []);

  /* Get the displayed string for a numeric field */
  const getFieldStr = (key: string, value: number | null | undefined, fallback = ""): string => {
    if (key in editStr) return editStr[key];
    if (value == null || (value === 0 && fallback === "")) return "";
    return String(value);
  };

  /* Handle focus: start string editing */
  const handleFocus = (key: string, value: number | null | undefined) => {
    setEditStr(prev => ({
      ...prev,
      [key]: value == null ? "" : (value === 0 ? "" : String(value)),
    }));
  };

  /* Handle change: just store raw string */
  const handleChange = (key: string, raw: string) => {
    setEditStr(prev => ({ ...prev, [key]: raw }));
  };

  /* Handle blur: parse, clean, commit to numeric state */
  const handleBlur = (key: string, opts?: { allowDecimal?: boolean; min?: number; nullable?: boolean }) => {
    const raw = editStr[key] ?? "";
    setEditStr(prev => { const n = { ...prev }; delete n[key]; return n; });
    if (raw.trim() === "") {
      if (opts?.nullable) {
        update({ [key]: null } as any);
      } else {
        update({ [key]: opts?.min ?? 0 } as any);
      }
      return;
    }
    let n = parseNum(raw, opts?.allowDecimal);
    if (opts?.min != null && n < opts.min) n = opts.min;
    update({ [key]: n } as any);
  };

  const result = useMemo(() => calculate(inputs), [inputs]);

  const mult = isYearly ? 12 : 1;
  const periodLabel = isYearly ? "godišnje" : "mjesečno";
  const netto = Math.max(0, result.nettoMonat) * mult;
  const brutto = result.bruttoMonat * mult;
  const steuern = result.steuernGesamt * mult;
  const sozial = result.sozialGesamt * mult;
  const diff = brutto - netto;
  const total = netto + steuern + sozial;
  const segPct = (val: number) => total > 0 ? Math.max(0, (val / total) * 100) : 0;

  const djecaIspod25Error = inputs.hasDjeca && inputs.brojDjeceIspod25 != null && inputs.brojDjece != null && inputs.brojDjeceIspod25 > inputs.brojDjece;

  const handleExternalLink = (primaryUrl: string, fallbackUrl: string, index: number) => {
    const newWindow = window.open(primaryUrl, "_blank", "noopener,noreferrer");
    if (!newWindow || newWindow.closed) {
      const fallback = window.open(fallbackUrl, "_blank", "noopener,noreferrer");
      if (!fallback || fallback.closed) {
        setLinkErrors(prev => ({ ...prev, [index]: true }));
      }
    }
  };

  const I = (id: string) => <InfoTooltip id={id} activeId={activeInfo} setActiveId={setActiveInfo} />;

  return (
    <div className="min-h-screen bg-[#0B0F1A]">
      

      {/* Header */}
      <div className="container pt-6 pb-2 px-4">
        <PageNavBar />
        <h1 className="text-2xl font-bold text-white md:text-3xl">Kalkulatori</h1>
        <p className="mt-2 text-sm text-white/50">Korisni alati za finansijsko planiranje u Njemačkoj</p>
      </div>

      {/* ── SEKCIJA 1: Brutto-Netto Rechner ── */}
      <section className="container py-8">
        <div className="rounded-2xl border border-[#F59E0B]/20 bg-[#0f1f3d] p-6 shadow-xl">
          <span className="inline-block rounded-full bg-[#F59E0B] px-3 py-1 text-xs font-bold text-[#0f1f3d] mb-4">
            BalkanLink Tool
          </span>
          <h2 className="text-2xl font-black text-white">Brutto-Netto Rechner</h2>
          <p className="text-sm text-white/50 mb-6">Izračunaj svoju neto platu u Njemačkoj</p>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* ─── INPUT FORM ─── */}
            <div className="space-y-6">
              {/* GRUPA 1: OSNOVNO */}
              <div className="space-y-4">
                <div className="space-y-1">
                  <Label className="text-sm text-white/70 font-medium">Bruto plata {I("brutto")}</Label>
                  <div className="relative">
                    <input
                      type="text"
                      inputMode="numeric"
                      value={getFieldStr("brutto", inputs.brutto)}
                      onFocus={() => handleFocus("brutto", inputs.brutto)}
                      onChange={e => handleChange("brutto", e.target.value)}
                      onBlur={() => handleBlur("brutto", { min: 0 })}
                      placeholder="npr. 3000"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-lg font-bold focus:border-[#F59E0B] focus:outline-none placeholder:text-white/30 transition-all duration-300"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-white/40">€</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <Label className="text-sm text-white/70 font-medium">Obračunski period {I("period")}</Label>
                  <ToggleButtons
                    options={[
                      { label: "Mjesečno", value: "monatlich" },
                      { label: "Godišnje", value: "jaehrlich" },
                    ]}
                    value={inputs.period}
                    onChange={v => update({ period: v as "monatlich" | "jaehrlich" })}
                  />
                </div>

                <div className="space-y-1">
                  <Label className="text-sm text-white/70 font-medium">Godina obračuna {I("godina")}</Label>
                  <Select value={String(inputs.godina)} onValueChange={v => update({ godina: Number(v) })}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2026">2026</SelectItem>
                      <SelectItem value="2025">2025</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1">
                  <Label className="text-sm text-white/70 font-medium">Porezna klasa (Steuerklasse) {I("steuerklasse")}</Label>
                  <Select value={String(inputs.steuerklasse)} onValueChange={v => update({ steuerklasse: Number(v) })}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {STEUERKLASSE_OPTIONS.map(o => (
                        <SelectItem key={o.value} value={String(o.value)} className="text-sm">{o.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1">
                  <Label className="text-sm text-white/70 font-medium">Savezna zemlja (Bundesland) {I("bundesland")}</Label>
                  <Select value={inputs.bundesland} onValueChange={v => update({ bundesland: v })}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {BUNDESLAENDER.map(b => (
                        <SelectItem key={b.value} value={b.value} className="text-sm">{b.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="border-t border-white/10" />

              {/* GRUPA 2: PORODICA I DODACI */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label className="text-sm text-white/70 font-medium">Imate li djecu? {I("djeca")}</Label>
                  <ToggleButtons
                    options={[{ label: "Ne", value: "ne" }, { label: "Da", value: "da" }]}
                    value={inputs.hasDjeca ? "da" : "ne"}
                    onChange={v => update({ hasDjeca: v === "da" })}
                  />
                </div>

                {inputs.hasDjeca && (
                  <>
                    <div className="space-y-1">
                      <Label className="text-sm text-white/70 font-medium">Broj djece (ukupno) {I("brojDjece")}</Label>
                      <div className="relative">
                        <input
                          type="text"
                          inputMode="numeric"
                          value={getFieldStr("brojDjece", inputs.brojDjece)}
                          onFocus={() => handleFocus("brojDjece", inputs.brojDjece)}
                          onChange={e => handleChange("brojDjece", e.target.value)}
                          onBlur={() => handleBlur("brojDjece", { min: 0, nullable: true })}
                          placeholder="npr. 2"
                          className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 pr-12 text-white text-sm font-bold focus:border-[#F59E0B] focus:outline-none transition-all duration-300"
                        />
                        <div className="absolute right-1 top-1/2 -translate-y-1/2 flex flex-col">
                          <button type="button" onClick={() => { setEditStr(prev => { const c = { ...prev }; delete c.brojDjece; return c; }); update({ brojDjece: (inputs.brojDjece ?? 0) + 1 }); }} className="px-2 py-0.5 text-white/50 hover:text-[#F59E0B] transition-colors text-xs leading-none">▲</button>
                          <button type="button" onClick={() => { setEditStr(prev => { const c = { ...prev }; delete c.brojDjece; return c; }); const v = Math.max(0, (inputs.brojDjece ?? 0) - 1); update({ brojDjece: v || null }); }} className="px-2 py-0.5 text-white/50 hover:text-[#F59E0B] transition-colors text-xs leading-none">▼</button>
                        </div>
                      </div>
                      <div className="flex gap-1.5 mt-1.5 flex-wrap">
                        {[1, 2, 3, 4, 5].map(n => (
                          <button key={n} type="button" onClick={() => { setEditStr(prev => { const c = { ...prev }; delete c.brojDjece; return c; }); update({ brojDjece: n }); }}
                            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all duration-200 ${inputs.brojDjece === n ? "bg-[#F59E0B] text-[#0f1f3d]" : "bg-white/10 text-white/60 hover:bg-white/20"}`}
                          >{n}</button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <Label className="text-sm text-white/70 font-medium">Broj djece ispod 25 godina {I("brojDjeceIspod25")}</Label>
                      <div className="relative">
                        <input
                          type="text"
                          inputMode="numeric"
                          value={getFieldStr("brojDjeceIspod25", inputs.brojDjeceIspod25)}
                          onFocus={() => handleFocus("brojDjeceIspod25", inputs.brojDjeceIspod25)}
                          onChange={e => handleChange("brojDjeceIspod25", e.target.value)}
                          onBlur={() => handleBlur("brojDjeceIspod25", { min: 0, nullable: true })}
                          placeholder="npr. 1"
                          className={`w-full bg-white/10 rounded-xl px-4 py-3 pr-12 text-white text-sm font-bold focus:outline-none transition-all duration-300 ${
                            djecaIspod25Error ? "border-2 border-red-400 focus:border-red-400" : "border border-white/20 focus:border-[#F59E0B]"
                          }`}
                        />
                        <div className="absolute right-1 top-1/2 -translate-y-1/2 flex flex-col">
                          <button type="button" onClick={() => { setEditStr(prev => { const c = { ...prev }; delete c.brojDjeceIspod25; return c; }); update({ brojDjeceIspod25: (inputs.brojDjeceIspod25 ?? 0) + 1 }); }} className="px-2 py-0.5 text-white/50 hover:text-[#F59E0B] transition-colors text-xs leading-none">▲</button>
                          <button type="button" onClick={() => { setEditStr(prev => { const c = { ...prev }; delete c.brojDjeceIspod25; return c; }); const v = Math.max(0, (inputs.brojDjeceIspod25 ?? 0) - 1); update({ brojDjeceIspod25: v || null }); }} className="px-2 py-0.5 text-white/50 hover:text-[#F59E0B] transition-colors text-xs leading-none">▼</button>
                        </div>
                      </div>
                      <div className="flex gap-1.5 mt-1.5 flex-wrap">
                        {[0, 1, 2, 3, 4].map(n => (
                          <button key={n} type="button" onClick={() => { setEditStr(prev => { const c = { ...prev }; delete c.brojDjeceIspod25; return c; }); update({ brojDjeceIspod25: n || null }); }}
                            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all duration-200 ${inputs.brojDjeceIspod25 === n ? "bg-[#F59E0B] text-[#0f1f3d]" : "bg-white/10 text-white/60 hover:bg-white/20"}`}
                          >{n}</button>
                        ))}
                      </div>
                      {djecaIspod25Error && (
                        <p className="text-xs text-red-400 mt-1">Broj djece ispod 25 ne može biti veći od ukupnog broja djece</p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <Label className="text-sm text-white/70 font-medium">Kinderfreibetrag {I("kinderfreibetrag")}</Label>
                      <Select value={String(inputs.kinderfreibetrag)} onValueChange={v => update({ kinderfreibetrag: Number(v) })}>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {KINDERFREIBETRAG_OPTIONS.map(o => (
                            <SelectItem key={o.value} value={o.value} className="text-sm">{o.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}

                <div className="space-y-1">
                  <Label className="text-sm text-white/70 font-medium">Starost {I("alter")}</Label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={getFieldStr("alter", inputs.alter)}
                    onFocus={() => handleFocus("alter", inputs.alter)}
                    onChange={e => handleChange("alter", e.target.value)}
                    onBlur={() => handleBlur("alter", { min: 18 })}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-sm font-bold focus:border-[#F59E0B] focus:outline-none transition-all duration-300"
                  />
                </div>
              </div>

              <div className="border-t border-white/10" />

              {/* GRUPA 3: OSIGURANJA I DODACI */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label className="text-sm text-white/70 font-medium">Zdravstveno osiguranje {I("kvType")}</Label>
                  <ToggleButtons
                    options={[
                      { label: "Gesetzlich (GKV)", value: "gesetzlich" },
                      { label: "Privat (PKV)", value: "privat" },
                    ]}
                    value={inputs.kvType}
                    onChange={v => update({ kvType: v as "gesetzlich" | "privat" })}
                  />
                </div>

                {inputs.kvType === "gesetzlich" && (
                  <div className="space-y-1">
                    <Label className="text-sm text-white/70 font-medium">Zusatzbeitrag (%) {I("zusatzbeitrag")}</Label>
                    <input
                      type="text"
                      inputMode="decimal"
                      value={getFieldStr("zusatzbeitrag", inputs.zusatzbeitrag)}
                      onFocus={() => handleFocus("zusatzbeitrag", inputs.zusatzbeitrag)}
                      onChange={e => handleChange("zusatzbeitrag", e.target.value)}
                      onBlur={() => handleBlur("zusatzbeitrag", { allowDecimal: true, min: 0 })}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-sm font-bold focus:border-[#F59E0B] focus:outline-none transition-all duration-300"
                    />
                  </div>
                )}

                {inputs.kvType === "privat" && (
                  <div className="space-y-1">
                    <Label className="text-sm text-white/70 font-medium">Mjesečni PKV doprinos (€) {I("pkv")}</Label>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={getFieldStr("pkvBeitrag", inputs.pkvBeitrag)}
                      onFocus={() => handleFocus("pkvBeitrag", inputs.pkvBeitrag)}
                      onChange={e => handleChange("pkvBeitrag", e.target.value)}
                      onBlur={() => handleBlur("pkvBeitrag", { min: 0 })}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-sm font-bold focus:border-[#F59E0B] focus:outline-none transition-all duration-300"
                    />
                  </div>
                )}

                <div className="space-y-1">
                  <Label className="text-sm text-white/70 font-medium">Penzijsko osiguranje {I("rv")}</Label>
                  <ToggleButtons
                    options={[{ label: "Uključeno", value: "on" }, { label: "Isključeno", value: "off" }]}
                    value={inputs.rvEnabled ? "on" : "off"}
                    onChange={v => update({ rvEnabled: v === "on" })}
                  />
                </div>

                <div className="space-y-1">
                  <Label className="text-sm text-white/70 font-medium">Osiguranje od nezaposlenosti {I("av")}</Label>
                  <ToggleButtons
                    options={[{ label: "Uključeno", value: "on" }, { label: "Isključeno", value: "off" }]}
                    value={inputs.avEnabled ? "on" : "off"}
                    onChange={v => update({ avEnabled: v === "on" })}
                  />
                </div>

                <div className="space-y-1">
                  <Label className="text-sm text-white/70 font-medium">Kirchensteuer {I("kirchensteuer")}</Label>
                  <ToggleButtons
                    options={[{ label: "Ne", value: "ne" }, { label: "Da", value: "da" }]}
                    value={inputs.kirchensteuer ? "da" : "ne"}
                    onChange={v => update({ kirchensteuer: v === "da" })}
                  />
                </div>

                <div className="space-y-1">
                  <Label className="text-sm text-white/70 font-medium">Godišnji porezni odbitak (€) {I("freibetrag")}</Label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={getFieldStr("freibetrag", inputs.freibetrag, "")}
                    onFocus={() => handleFocus("freibetrag", inputs.freibetrag)}
                    onChange={e => handleChange("freibetrag", e.target.value)}
                    onBlur={() => handleBlur("freibetrag", { min: 0 })}
                    placeholder="npr. 1000"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-sm font-bold focus:border-[#F59E0B] focus:outline-none placeholder:text-white/30 transition-all duration-300"
                  />
                </div>

                <div className="space-y-1">
                  <Label className="text-sm text-white/70 font-medium">Geldwerter Vorteil / Firmenwagen (€) {I("geldwerterVorteil")}</Label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={getFieldStr("geldwerterVorteil", inputs.geldwerterVorteil, "")}
                    onFocus={() => handleFocus("geldwerterVorteil", inputs.geldwerterVorteil)}
                    onChange={e => handleChange("geldwerterVorteil", e.target.value)}
                    onBlur={() => handleBlur("geldwerterVorteil", { min: 0 })}
                    placeholder="npr. 300"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-sm font-bold focus:border-[#F59E0B] focus:outline-none placeholder:text-white/30 transition-all duration-300"
                  />
                </div>
              </div>
            </div>

            {/* ─── OUTPUT / RESULTS ─── */}
            <div className="space-y-5">
              <div className="rounded-2xl border border-green-400/30 bg-green-950 p-6 transition-all duration-300">
                <p className="text-sm text-green-300/70 font-medium">Dobiješ na račun:</p>
                <p className="text-6xl font-black text-green-400 tabular-nums transition-all duration-300 my-2">
                  {fmt(netto)} €
                </p>
                <p className="text-sm text-green-300/50">neto / {periodLabel}</p>
                <button
                  onClick={() => setIsYearly(!isYearly)}
                  className="mt-3 text-xs text-[#F59E0B] cursor-pointer underline"
                >
                  {isYearly ? "Prikaži mjesečno" : "Prikaži godišnje"}
                </button>
                {isYearly && (
                  <p className="mt-2 text-sm font-bold text-green-400/80">
                    Godišnje na račun: {fmt(netto)} €
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex h-5 w-full overflow-hidden rounded-full">
                  <div className="bg-green-400 transition-all duration-300" style={{ width: `${segPct(netto)}%` }} />
                  <div className="bg-red-400 transition-all duration-300" style={{ width: `${segPct(steuern)}%` }} />
                  <div className="bg-orange-400 transition-all duration-300" style={{ width: `${segPct(sozial)}%` }} />
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <span className="text-green-400 text-sm font-bold">🟢 Neto</span>
                    <p className="text-sm font-bold text-green-400 tabular-nums">{fmt(netto)} €</p>
                    <p className="text-[10px] text-white/40">({pct(netto, brutto)}%)</p>
                  </div>
                  <div>
                    <span className="text-red-400 text-sm font-bold">🔴 Porez</span>
                    <p className="text-sm font-bold text-red-400 tabular-nums">{fmt(steuern)} €</p>
                    <p className="text-[10px] text-white/40">({pct(steuern, brutto)}%)</p>
                  </div>
                  <div>
                    <span className="text-orange-400 text-sm font-bold">🟠 Doprinosi</span>
                    <p className="text-sm font-bold text-orange-400 tabular-nums">{fmt(sozial)} €</p>
                    <p className="text-[10px] text-white/40">({pct(sozial, brutto)}%)</p>
                  </div>
                </div>

                <p className="text-red-400 font-bold text-sm mt-3 text-center">
                  Razlika: − {fmt(diff)} € ({pct(diff, brutto)}% odlazi državi)
                </p>
              </div>

              <Collapsible open={detailsOpen} onOpenChange={setDetailsOpen}>
                <CollapsibleTrigger className="flex items-center gap-2 text-[#F59E0B] text-sm cursor-pointer mt-4">
                  {detailsOpen ? (
                    <>Sakrij detalje <ChevronUp className="h-3.5 w-3.5" /></>
                  ) : (
                    <>Prikaži detalje <ChevronDown className="h-3.5 w-3.5" /></>
                  )}
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="mt-3 rounded-xl border border-white/10 bg-white/5 p-4 space-y-2 text-sm text-white/70">
                    <DetailRow label="Lohnsteuer" amount={result.lohnsteuerMonat * mult} brutto={brutto} />
                    <DetailRow label="Solidaritätszuschlag" amount={result.soliMonat * mult} brutto={brutto} />
                    {inputs.kirchensteuer && <DetailRow label="Kirchensteuer" amount={result.kirchensteuerMonat * mult} brutto={brutto} />}
                    <div className="border-t border-white/10 my-2" />
                    <DetailRow label={inputs.kvType === "gesetzlich" ? "Krankenversicherung (GKV)" : "Private KV (PKV)"} amount={(inputs.kvType === "gesetzlich" ? result.kv : result.pkvMonat) * mult} brutto={brutto} />
                    {inputs.rvEnabled && <DetailRow label="Rentenversicherung" amount={result.rv * mult} brutto={brutto} />}
                    {inputs.avEnabled && <DetailRow label="Arbeitslosenversicherung" amount={result.av * mult} brutto={brutto} />}
                    <DetailRow label="Pflegeversicherung" amount={result.pv * mult} brutto={brutto} />
                    {inputs.geldwerterVorteil > 0 && (
                      <div className="flex justify-between text-white/50 italic">
                        <span>Geldwerter Vorteil</span>
                        <span>+{fmt(inputs.geldwerterVorteil * mult)} €</span>
                      </div>
                    )}
                    {inputs.freibetrag > 0 && (
                      <div className="flex justify-between text-white/50 italic">
                        <span>Steuerfreibetrag</span>
                        <span>−{fmt(inputs.freibetrag / (isYearly ? 1 : 12))} €</span>
                      </div>
                    )}
                    <div className="border-t border-white/10 my-2" />
                    <div className="flex justify-between font-bold text-red-400">
                      <span>UKUPNI ODBICI</span>
                      <span className="tabular-nums">{fmt(diff)} €</span>
                    </div>
                    <div className="flex justify-between font-bold text-green-400 text-lg">
                      <span>NETO</span>
                      <span className="tabular-nums">{fmt(netto)} €</span>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>
        </div>
      </section>

      {/* ── SEKCIJA 2: Dodatni alati ── */}
      <section className="container pb-16">
        <h3 className="text-lg font-semibold text-gray-600 mb-4 mt-2">Dodatni alati</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {externalTools.map((tool, i) => (
            <div
              key={tool.title}
              className="bg-white border-2 border-gray-200 rounded-xl p-5 shadow-sm hover:border-[#0f1f3d] hover:shadow-md transition-all"
            >
              <h4 className="text-[#0f1f3d] font-bold text-base">{tool.title}</h4>
              <p className="text-gray-600 text-sm mt-1 mb-4">{tool.desc}</p>
              <button
                onClick={() => handleExternalLink(tool.primaryUrl, tool.fallbackUrl, i)}
                className="w-full bg-[#0f1f3d] text-white font-bold rounded-full px-5 py-2.5 text-sm hover:bg-[#1a3a6b] transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                Otvori kalkulator <ExternalLink className="h-3.5 w-3.5" />
              </button>
              {linkErrors[i] && (
                <p className="text-xs text-red-500 mt-2 text-center">Trenutno nedostupno — pokušajte kasnije</p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function DetailRow({ label, amount, brutto }: { label: string; amount: number; brutto: number }) {
  return (
    <div className="flex justify-between">
      <span>{label}</span>
      <span className="tabular-nums font-medium">{fmt(amount)} € ({pct(amount, brutto)}%)</span>
    </div>
  );
}
