import { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronDown, ChevronUp, ExternalLink, Info } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Tooltip, TooltipContent, TooltipTrigger, TooltipProvider,
} from "@/components/ui/tooltip";
import {
  Collapsible, CollapsibleContent, CollapsibleTrigger,
} from "@/components/ui/collapsible";
import SubpageNav from "@/components/SubpageNav";

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
  steuerklasse: number;
  bundesland: string;
  hasDjeca: boolean;
  brojDjece: number;
  kinderfreibetrag: boolean;
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
  steuerklasse: 1,
  bundesland: "BY",
  hasDjeca: false,
  brojDjece: 1,
  kinderfreibetrag: false,
  alter: 30,
  kvType: "gesetzlich",
  zusatzbeitrag: 1.7,
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

  // BBG 2024
  const bbgKvPv = 5175;
  const bbgRvAv = isOst ? 7450 : 7550;

  const rvBasis = Math.min(bruttoMonat, bbgRvAv);
  const kvBasis = Math.min(bruttoMonat, bbgKvPv);

  // Social contributions
  const rv = inp.rvEnabled ? rvBasis * 0.093 : 0;
  const av = inp.avEnabled ? rvBasis * 0.013 : 0;

  let kv = 0;
  let pkvMonat = 0;
  if (inp.kvType === "gesetzlich") {
    kv = kvBasis * (0.073 + (inp.zusatzbeitrag / 100) / 2);
  } else {
    pkvMonat = inp.pkvBeitrag;
  }

  let pvRate = isSachsen ? 0.02025 : 0.01525;
  if (!inp.hasDjeca && inp.alter >= 23) pvRate += 0.0035;
  const pv = kvBasis * pvRate;

  const sozialGesamt = rv + av + kv + pv + pkvMonat;

  // Tax
  const gvJahr = inp.geldwerterVorteil * 12;
  let taxableBrutto = bruttoJahr + gvJahr - inp.freibetrag;

  const werbungskosten = 1230;
  const sonderausgaben = 36;
  const vorsorgepauschale = bruttoJahr * 0.11;

  let zvE = taxableBrutto - werbungskosten - sonderausgaben - vorsorgepauschale;

  // Kinderfreibetrag 2024: 6384€ per child
  const kfbTotal = inp.kinderfreibetrag && inp.hasDjeca ? inp.brojDjece * 6384 : 0;

  let yearlyTax: number;
  switch (inp.steuerklasse) {
    case 2:
      zvE = Math.max(0, zvE - 4260);
      zvE = Math.max(0, zvE - kfbTotal);
      yearlyTax = computeYearlyTax2024(zvE);
      break;
    case 3:
      zvE = Math.max(0, zvE - kfbTotal);
      yearlyTax = computeYearlyTax2024(Math.max(0, zvE / 2)) * 2;
      break;
    case 5:
    case 6:
      zvE = taxableBrutto - werbungskosten - sonderausgaben - vorsorgepauschale;
      zvE = Math.max(0, zvE);
      yearlyTax = computeYearlyTax2024(zvE);
      break;
    default: // 1, 4
      zvE = Math.max(0, zvE - kfbTotal);
      yearlyTax = computeYearlyTax2024(Math.max(0, zvE));
  }

  const lohnsteuerMonat = Math.max(0, yearlyTax / 12);

  // Soli
  let soliMonat = 0;
  if (yearlyTax > 31080) {
    soliMonat = lohnsteuerMonat * 0.055;
  } else if (yearlyTax > 18130) {
    const factor = (yearlyTax - 18130) / (31080 - 18130);
    soliMonat = lohnsteuerMonat * 0.055 * factor;
  }

  // Kirchensteuer
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

/* ── Info tooltip ── */
function InfoTip({ text }: { text: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="inline-block ml-1 text-[#F59E0B]/60 cursor-pointer text-xs">ⓘ</span>
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-[240px] text-xs">{text}</TooltipContent>
    </Tooltip>
  );
}

/* ── Toggle buttons component ── */
function ToggleButtons({
  options,
  value,
  onChange,
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
    primaryUrl: "https://www.bmwsb.bund.de/Webs/BMWSB/DE/themen/stadt-wohnen/wohnraumfoerderung/wohngeld/wohngeld-rechner/wohngeld-rechner.html",
    fallbackUrl: "https://www.wohngeld.org/wohngeld-rechner/",
  },
  {
    title: "Kfz Steuer Rechner",
    desc: "Izračunaj godišnji porez na vozilo — zvanični alat",
    primaryUrl: "https://www.bmf-steuerrechner.de/kfzsteuer/kfzsteuer.xhtml",
    fallbackUrl: "https://www.adac.de/rund-ums-fahrzeug/auto-kaufen-verkaufen/kfz-steuer/kfz-steuer-rechner/",
  },
  {
    title: "Renten Rechner",
    desc: "Procijeni svoju buduću penziju — zvanični DRV alat",
    primaryUrl: "https://www.rvrecht.de/rentenrechner",
    fallbackUrl: "https://www.rentenrechner.de",
  },
];

/* ── Main component ── */
export default function Kalkulatori() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState<CalcInputs>({ ...DEFAULTS });
  const [isYearly, setIsYearly] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [linkErrors, setLinkErrors] = useState<Record<number, boolean>>({});

  const update = useCallback((patch: Partial<CalcInputs>) => {
    setInputs(prev => ({ ...prev, ...patch }));
  }, []);

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

  const handleExternalLink = (primaryUrl: string, fallbackUrl: string, index: number) => {
    const newWindow = window.open(primaryUrl, "_blank", "noopener,noreferrer");
    if (!newWindow || newWindow.closed) {
      const fallback = window.open(fallbackUrl, "_blank", "noopener,noreferrer");
      if (!fallback || fallback.closed) {
        setLinkErrors(prev => ({ ...prev, [index]: true }));
      }
    }
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-[#0B0F1A]">
        <SubpageNav />

        {/* Header */}
        <div className="container pt-6 pb-2">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white shadow backdrop-blur hover:bg-white/20 transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" /> Nazad
          </button>
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
                  {/* Bruto plata */}
                  <div className="space-y-1">
                    <Label className="text-sm text-white/70 font-medium">Bruto plata</Label>
                    <div className="relative">
                      <input
                        type="number"
                        min={0}
                        step={50}
                        value={inputs.brutto || ""}
                        onChange={e => update({ brutto: Number(e.target.value) })}
                        placeholder="npr. 3000"
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-lg font-bold focus:border-[#F59E0B] focus:outline-none placeholder:text-white/30 transition-all duration-300"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-white/40">€</span>
                    </div>
                  </div>

                  {/* Period */}
                  <div className="space-y-1">
                    <Label className="text-sm text-white/70 font-medium">Obračunski period</Label>
                    <ToggleButtons
                      options={[
                        { label: "Mjesečno", value: "monatlich" },
                        { label: "Godišnje", value: "jaehrlich" },
                      ]}
                      value={inputs.period}
                      onChange={v => update({ period: v as "monatlich" | "jaehrlich" })}
                    />
                  </div>

                  {/* Godina */}
                  <div className="space-y-1">
                    <Label className="text-sm text-white/70 font-medium">Godina obračuna</Label>
                    <Select value="2024" onValueChange={() => {}}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2024">2024</SelectItem>
                        <SelectItem value="2023">2023</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Steuerklasse */}
                  <div className="space-y-1">
                    <Label className="text-sm text-white/70 font-medium">Porezna klasa (Steuerklasse)</Label>
                    <Select value={String(inputs.steuerklasse)} onValueChange={v => update({ steuerklasse: Number(v) })}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {STEUERKLASSE_OPTIONS.map(o => (
                          <SelectItem key={o.value} value={String(o.value)} className="text-sm">
                            {o.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Bundesland */}
                  <div className="space-y-1">
                    <Label className="text-sm text-white/70 font-medium">Savezna zemlja (Bundesland)</Label>
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
                  {/* Djeca toggle */}
                  <div className="space-y-1">
                    <Label className="text-sm text-white/70 font-medium">Imate li djecu?</Label>
                    <ToggleButtons
                      options={[{ label: "Ne", value: "ne" }, { label: "Da", value: "da" }]}
                      value={inputs.hasDjeca ? "da" : "ne"}
                      onChange={v => update({ hasDjeca: v === "da" })}
                    />
                  </div>

                  {/* Broj djece */}
                  {inputs.hasDjeca && (
                    <div className="space-y-1">
                      <Label className="text-sm text-white/70 font-medium">Broj djece</Label>
                      <Select value={String(inputs.brojDjece)} onValueChange={v => update({ brojDjece: Number(v) })}>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5].map(n => (
                            <SelectItem key={n} value={String(n)}>{n === 5 ? "5+" : String(n)}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {/* Kinderfreibetrag */}
                  {inputs.hasDjeca && (
                    <div className="space-y-1">
                      <Label className="text-sm text-white/70 font-medium">
                        Kinderfreibetrag
                        <InfoTip text="Porezno oslobođenje za djecu — automatski se primjenjuje ako je povoljnije od Kindergeld" />
                      </Label>
                      <ToggleButtons
                        options={[{ label: "Ne", value: "ne" }, { label: "Da", value: "da" }]}
                        value={inputs.kinderfreibetrag ? "da" : "ne"}
                        onChange={v => update({ kinderfreibetrag: v === "da" })}
                      />
                    </div>
                  )}

                  {/* Starost */}
                  <div className="space-y-1">
                    <Label className="text-sm text-white/70 font-medium">Starost</Label>
                    <input
                      type="number"
                      min={18}
                      max={67}
                      value={inputs.alter}
                      onChange={e => update({ alter: Number(e.target.value) })}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-sm font-bold focus:border-[#F59E0B] focus:outline-none transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="border-t border-white/10" />

                {/* GRUPA 3: OSIGURANJA I DODACI */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* KV type */}
                  <div className="space-y-1">
                    <Label className="text-sm text-white/70 font-medium">Zdravstveno osiguranje</Label>
                    <ToggleButtons
                      options={[
                        { label: "Gesetzlich (GKV)", value: "gesetzlich" },
                        { label: "Privat (PKV)", value: "privat" },
                      ]}
                      value={inputs.kvType}
                      onChange={v => update({ kvType: v as "gesetzlich" | "privat" })}
                    />
                  </div>

                  {/* Zusatzbeitrag */}
                  {inputs.kvType === "gesetzlich" && (
                    <div className="space-y-1">
                      <Label className="text-sm text-white/70 font-medium">
                        Zusatzbeitrag (%)
                        <InfoTip text="Prosječni Zusatzbeitrag 2024 je 1.7%" />
                      </Label>
                      <input
                        type="number"
                        step={0.1}
                        min={0}
                        max={5}
                        value={inputs.zusatzbeitrag}
                        onChange={e => update({ zusatzbeitrag: Number(e.target.value) })}
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-sm font-bold focus:border-[#F59E0B] focus:outline-none transition-all duration-300"
                      />
                    </div>
                  )}

                  {/* PKV Beitrag */}
                  {inputs.kvType === "privat" && (
                    <div className="space-y-1">
                      <Label className="text-sm text-white/70 font-medium">
                        Mjesečni PKV doprinos (€)
                        <InfoTip text="Unesite vaš stvarni PKV iznos" />
                      </Label>
                      <input
                        type="number"
                        min={0}
                        value={inputs.pkvBeitrag}
                        onChange={e => update({ pkvBeitrag: Number(e.target.value) })}
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-sm font-bold focus:border-[#F59E0B] focus:outline-none transition-all duration-300"
                      />
                    </div>
                  )}

                  {/* RV */}
                  <div className="space-y-1">
                    <Label className="text-sm text-white/70 font-medium">
                      Penzijsko osiguranje
                      <InfoTip text="Beamte i samozaposleni mogu biti izuzeti" />
                    </Label>
                    <ToggleButtons
                      options={[{ label: "Uključeno", value: "on" }, { label: "Isključeno", value: "off" }]}
                      value={inputs.rvEnabled ? "on" : "off"}
                      onChange={v => update({ rvEnabled: v === "on" })}
                    />
                  </div>

                  {/* AV */}
                  <div className="space-y-1">
                    <Label className="text-sm text-white/70 font-medium">Osiguranje od nezaposlenosti</Label>
                    <ToggleButtons
                      options={[{ label: "Uključeno", value: "on" }, { label: "Isključeno", value: "off" }]}
                      value={inputs.avEnabled ? "on" : "off"}
                      onChange={v => update({ avEnabled: v === "on" })}
                    />
                  </div>

                  {/* Kirchensteuer */}
                  <div className="space-y-1">
                    <Label className="text-sm text-white/70 font-medium">Kirchensteuer</Label>
                    <ToggleButtons
                      options={[{ label: "Ne", value: "ne" }, { label: "Da", value: "da" }]}
                      value={inputs.kirchensteuer ? "da" : "ne"}
                      onChange={v => update({ kirchensteuer: v === "da" })}
                    />
                  </div>

                  {/* Freibetrag */}
                  <div className="space-y-1">
                    <Label className="text-sm text-white/70 font-medium">
                      Godišnji porezni odbitak (€) — opcionalno
                      <InfoTip text="Unesi ako imaš odobren Freibetrag od Finanzamt" />
                    </Label>
                    <input
                      type="number"
                      min={0}
                      value={inputs.freibetrag || ""}
                      onChange={e => update({ freibetrag: Number(e.target.value) })}
                      placeholder="npr. 1000"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-sm font-bold focus:border-[#F59E0B] focus:outline-none placeholder:text-white/30 transition-all duration-300"
                    />
                  </div>

                  {/* Geldwerter Vorteil */}
                  <div className="space-y-1">
                    <Label className="text-sm text-white/70 font-medium">
                      Geldwerter Vorteil / Firmenwagen (€) — opcionalno
                      <InfoTip text="Dodaj ako imaš benefit u naravi (npr. firmeni auto, stan plaćen od firme)" />
                    </Label>
                    <input
                      type="number"
                      min={0}
                      value={inputs.geldwerterVorteil || ""}
                      onChange={e => update({ geldwerterVorteil: Number(e.target.value) })}
                      placeholder="npr. 300"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-sm font-bold focus:border-[#F59E0B] focus:outline-none placeholder:text-white/30 transition-all duration-300"
                    />
                  </div>
                </div>
              </div>

              {/* ─── OUTPUT / RESULTS ─── */}
              <div className="space-y-5">
                {/* Highlight box */}
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

                {/* Breakdown bar */}
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

                  {/* Difference */}
                  <p className="text-red-400 font-bold text-sm mt-3 text-center">
                    Razlika: − {fmt(diff)} € ({pct(diff, brutto)}% odlazi državi)
                  </p>
                </div>

                {/* Collapsible details */}
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
    </TooltipProvider>
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
