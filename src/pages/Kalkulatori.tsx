import { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronDown, ChevronUp, Euro, ExternalLink, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Tooltip, TooltipContent, TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Collapsible, CollapsibleContent, CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  BUNDESLAENDER, DEFAULT_INPUTS, computeBruttoNetto,
  type BruttoNettoInputs,
} from "@/lib/brutto-netto-config";
import SubpageNav from "@/components/SubpageNav";

const fmt = (n: number) =>
  n.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const pct = (part: number, whole: number) =>
  whole > 0 ? ((part / whole) * 100).toFixed(1) : "0.0";

const STEUERKLASSE_DESC: Record<number, string> = {
  1: "Slobodan/a",
  2: "Samohrani roditelj",
  3: "Bračni par (veća plata)",
  4: "Bračni par (jednake plate)",
  5: "Bračni par (manja plata)",
  6: "Drugi posao",
};

const externalTools = [
  {
    title: "Wohngeld Rechner",
    desc: "Provjeri da li imaš pravo na stambenu pomoć",
    primaryUrl: "https://www.bmwsb.bund.de/Webs/BMWSB/DE/themen/stadt-wohnen/wohnraumfoerderung/wohngeld/wohngeld-rechner/wohngeld-rechner.html",
    fallbackUrl: "https://www.wohngeldrechner.nrw.de",
  },
  {
    title: "Kfz Steuer Rechner",
    desc: "Izračunaj godišnji porez na vozilo",
    primaryUrl: "https://www.adac.de/rund-ums-fahrzeug/auto-kaufen-verkaufen/kfz-steuer/kfz-steuer-rechner/",
    fallbackUrl: "https://www.kfz-steuer.de",
  },
  {
    title: "Renten Rechner",
    desc: "Procijeni svoju buduću penziju u Njemačkoj",
    primaryUrl: "https://www.deutsche-rentenversicherung.de/DRV/DE/Rente/Rentenberechnung/rentenberechnung_node.html",
    fallbackUrl: "https://www.rentenrechner.de",
  },
];

function InfoTip({ text }: { text: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Info className="ml-1 inline h-3.5 w-3.5 text-white/40 cursor-help" />
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-[240px] text-xs">{text}</TooltipContent>
    </Tooltip>
  );
}

export default function Kalkulatori() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState<BruttoNettoInputs>({ ...DEFAULT_INPUTS });
  const [isYearly, setIsYearly] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [linkErrors, setLinkErrors] = useState<Record<number, boolean>>({});

  const update = useCallback((patch: Partial<BruttoNettoInputs>) => {
    setInputs(prev => ({ ...prev, ...patch }));
  }, []);

  const result = useMemo(() => computeBruttoNetto(inputs), [inputs]);

  const mult = isYearly ? 12 : 1;
  const periodLabel = isYearly ? "godišnje" : "mjesečno";
  const netto = Math.max(0, result.nettoMonat) * mult;
  const brutto = result.bruttoMonat * mult;
  const steuern = result.steuernGesamt * mult;
  const sozial = result.sozialabgabenGesamt * mult;
  const diff = brutto - netto;
  const total = steuern + sozial + netto;
  const segPct = (val: number) => total > 0 ? Math.max(0, (val / total) * 100) : 0;

  const handleExternalLink = async (primaryUrl: string, fallbackUrl: string, index: number) => {
    try {
      await fetch(primaryUrl, { method: "HEAD", mode: "no-cors" });
      window.open(primaryUrl, "_blank", "noopener,noreferrer");
    } catch {
      try {
        window.open(fallbackUrl, "_blank", "noopener,noreferrer");
      } catch {
        setLinkErrors(prev => ({ ...prev, [index]: true }));
      }
    }
  };

  return (
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

      {/* ── SEKCIJA 1: BalkanLink Kalkulator ── */}
      <section className="container py-8">
        <div className="rounded-2xl border border-[#F59E0B]/20 bg-[#0f1f3d] p-6 shadow-xl">
          <span className="inline-block rounded-full bg-[#F59E0B] px-3 py-1 text-xs font-bold text-[#0f1f3d] mb-3">
            BalkanLink Tool
          </span>
          <h2 className="text-xl font-bold text-white mb-1">Brutto-Netto Rechner</h2>
          <p className="text-sm text-white/50 mb-6">Izračunaj svoju platu u Njemačkoj — brzo i jasno</p>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* ─ INPUTS ─ */}
            <div className="space-y-4">
              {/* Bruto */}
              <div className="space-y-1.5">
                <Label className="text-xs text-white/70">
                  Bruto plata (€) <InfoTip text="Unesite svoju bruto mjesečnu platu" />
                </Label>
                <div className="relative">
                  <Input
                    type="number"
                    min={0}
                    step={100}
                    value={inputs.brutto || ""}
                    onChange={e => update({ brutto: Number(e.target.value) })}
                    placeholder="3500"
                    className="tabular-nums text-lg font-bold pr-8 bg-white/10 border-white/20 text-white placeholder:text-white/30"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-white/40">€</span>
                </div>
              </div>

              {/* Steuerklasse */}
              <div className="space-y-1.5">
                <Label className="text-xs text-white/70">Steuerklasse</Label>
                <Select value={String(inputs.steuerklasse)} onValueChange={v => update({ steuerklasse: Number(v) })}>
                  <SelectTrigger className="text-xs bg-white/10 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6].map(k => (
                      <SelectItem key={k} value={String(k)} className="text-xs">
                        Klasse {k} — {STEUERKLASSE_DESC[k]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Bundesland */}
              <div className="space-y-1.5">
                <Label className="text-xs text-white/70">Bundesland</Label>
                <Select value={inputs.bundesland} onValueChange={v => update({ bundesland: v })}>
                  <SelectTrigger className="text-xs bg-white/10 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {BUNDESLAENDER.map(b => (
                      <SelectItem key={b.value} value={b.value} className="text-xs">{b.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Toggles */}
              <div className="flex items-center gap-3">
                <Switch
                  checked={!inputs.kinderlos}
                  onCheckedChange={v => update({ kinderlos: !v })}
                />
                <Label className="text-xs text-white/70">Djeca</Label>
              </div>
              <div className="flex items-center gap-3">
                <Switch
                  checked={inputs.kirchensteuer}
                  onCheckedChange={v => update({ kirchensteuer: v })}
                />
                <Label className="text-xs text-white/70">Crkveni porez</Label>
              </div>
            </div>

            {/* ─ RESULTS ─ */}
            <div className="space-y-4">
              {/* Monthly/Yearly toggle */}
              <div className="flex rounded-lg border border-white/20 overflow-hidden">
                {[false, true].map(yearly => (
                  <button
                    key={String(yearly)}
                    onClick={() => setIsYearly(yearly)}
                    className={`flex-1 px-4 py-2.5 text-xs font-semibold transition-all duration-300 ${
                      isYearly === yearly
                        ? "bg-[#F59E0B] text-[#0f1f3d]"
                        : "bg-white/5 text-white/50 hover:bg-white/10"
                    }`}
                  >
                    {yearly ? "Godišnje" : "Mjesečno"}
                  </button>
                ))}
              </div>

              {/* Highlight */}
              <div className="rounded-xl border border-green-500/20 bg-white/5 p-5 transition-all duration-300">
                <p className="text-sm text-white/60">Dobiješ na račun:</p>
                <p className="text-5xl font-black text-green-400 tabular-nums transition-all duration-300">
                  {fmt(netto)} €
                </p>
                <p className="text-sm text-white/40 mt-1">neto / {periodLabel}</p>
                {isYearly && (
                  <p className="mt-2 text-sm font-bold text-green-400/80">
                    Godišnje na račun: {fmt(netto)} €
                  </p>
                )}
              </div>

              {/* Breakdown bar */}
              <div className="space-y-3">
                <div className="flex h-6 w-full overflow-hidden rounded-full">
                  <div className="bg-green-500 transition-all duration-300" style={{ width: `${segPct(netto)}%` }} />
                  <div className="bg-red-500 transition-all duration-300" style={{ width: `${segPct(steuern)}%` }} />
                  <div className="bg-orange-500 transition-all duration-300" style={{ width: `${segPct(sozial)}%` }} />
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="flex items-center justify-center gap-1.5 mb-1">
                      <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
                      <span className="text-[10px] font-semibold text-white/50">Neto</span>
                    </div>
                    <p className="text-sm font-bold text-white tabular-nums">{fmt(netto)} €</p>
                    <p className="text-[10px] text-white/40">({pct(netto, brutto)}%)</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1.5 mb-1">
                      <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                      <span className="text-[10px] font-semibold text-white/50">Porez</span>
                    </div>
                    <p className="text-sm font-bold text-white tabular-nums">{fmt(steuern)} €</p>
                    <p className="text-[10px] text-white/40">({pct(steuern, brutto)}%)</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1.5 mb-1">
                      <span className="h-2.5 w-2.5 rounded-full bg-orange-500" />
                      <span className="text-[10px] font-semibold text-white/50">Doprinosi</span>
                    </div>
                    <p className="text-sm font-bold text-white tabular-nums">{fmt(sozial)} €</p>
                    <p className="text-[10px] text-white/40">({pct(sozial, brutto)}%)</p>
                  </div>
                </div>

                {/* Difference */}
                <p className="text-red-400 font-bold mt-2 text-center text-sm">
                  Razlika: − {fmt(diff)} € ({pct(diff, brutto)}% odlazi državi)
                </p>
              </div>

              {/* Collapsible details */}
              <Collapsible open={detailsOpen} onOpenChange={setDetailsOpen}>
                <CollapsibleTrigger className="flex items-center gap-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs font-semibold text-white/50 hover:text-white transition-colors">
                  {detailsOpen ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                  Prikaži detalje
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="mt-2 rounded-xl border border-white/10 bg-white/5 p-4 space-y-2 text-xs text-white/70">
                    <p className="font-bold text-white/40 uppercase tracking-wider text-[10px]">Porezi</p>
                    <Row label="Lohnsteuer" amount={result.lohnsteuerMonat * mult} />
                    <Row label="Solidaritätszuschlag" amount={result.soliMonat * mult} />
                    {inputs.kirchensteuer && <Row label="Kirchensteuer" amount={result.kirchensteuerMonat * mult} />}
                    <div className="border-t border-white/10 my-2" />
                    <p className="font-bold text-white/40 uppercase tracking-wider text-[10px]">Doprinosi</p>
                    <Row label="Krankenversicherung" amount={result.kvAN * mult} />
                    <Row label="Rentenversicherung" amount={result.rvAN * mult} />
                    <Row label="Arbeitslosenversicherung" amount={result.avAN * mult} />
                    <Row label="Pflegeversicherung" amount={result.pvAN * mult} />
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>
        </div>
      </section>

      {/* ── SEKCIJA 2: Dodatni alati ── */}
      <section className="container pb-16">
        <h3 className="text-lg font-semibold text-white/60 mb-4 mt-2">Dodatni alati</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {externalTools.map((tool, i) => (
            <div
              key={tool.title}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-5 shadow-sm"
            >
              <h4 className="text-base font-semibold text-white mb-1">{tool.title}</h4>
              <p className="text-sm text-white/50 mb-4">{tool.desc}</p>
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 text-xs border-white/20 text-white hover:bg-white/10"
                onClick={() => handleExternalLink(tool.primaryUrl, tool.fallbackUrl, i)}
              >
                Otvori kalkulator <ExternalLink className="h-3 w-3" />
              </Button>
              {linkErrors[i] && (
                <p className="text-xs text-red-400 mt-1">Trenutno nedostupno — pokušajte kasnije</p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Row({ label, amount }: { label: string; amount: number }) {
  return (
    <div className="flex justify-between">
      <span>{label}</span>
      <span className="tabular-nums font-medium">{fmt(amount)} €</span>
    </div>
  );
}
