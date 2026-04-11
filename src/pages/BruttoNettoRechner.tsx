import { useState, useMemo, useEffect, useCallback } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  ChevronRight, Info, RotateCcw, Share2, Euro, AlertTriangle,
  ChevronDown, ChevronUp, Building2
} from "lucide-react";
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
import { toast } from "sonner";
import {
  BUNDESLAENDER, TAX_YEARS, DEFAULT_INPUTS,
  computeBruttoNetto,
  type BruttoNettoInputs, type BruttoNettoResult, type TaxYear,
} from "@/lib/brutto-netto-config";
import PageNav from "@/components/navigation/PageNav";

/* ─── Helpers ─── */
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

function InfoTip({ text }: { text: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Info className="ml-1 inline h-3.5 w-3.5 text-muted-foreground cursor-help" />
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-[240px] text-xs">
        {text}
      </TooltipContent>
    </Tooltip>
  );
}

/* ─── LocalStorage ─── */
const LS_KEY = "bl_brutto_netto_inputs";
function loadInputs(): BruttoNettoInputs {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) return { ...DEFAULT_INPUTS, ...JSON.parse(raw) };
  } catch { /* ignore */ }
  return { ...DEFAULT_INPUTS };
}
function saveInputs(inputs: BruttoNettoInputs) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(inputs));
  } catch { /* ignore */ }
}

/* ═══════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════ */
export default function BruttoNettoRechner() {
  const [searchParams] = useSearchParams();
  const [inputs, setInputs] = useState<BruttoNettoInputs>(() => {
    const fromUrl = searchParams.get("b");
    if (fromUrl) {
      try {
        const parsed = JSON.parse(atob(fromUrl));
        return { ...DEFAULT_INPUTS, ...parsed };
      } catch { /* ignore */ }
    }
    return loadInputs();
  });
  const [isYearly, setIsYearly] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const update = useCallback((patch: Partial<BruttoNettoInputs>) => {
    setInputs(prev => {
      const next = { ...prev, ...patch };
      saveInputs(next);
      return next;
    });
  }, []);

  const result = useMemo(() => computeBruttoNetto(inputs), [inputs]);

  const kirchensteuerSatz = inputs.kirchensteuerSatzOverride ??
    (BUNDESLAENDER.find(b => b.value === inputs.bundesland)?.kirchensteuerSatz ?? 9);

  const mult = isYearly ? 12 : 1;
  const periodLabel = isYearly ? "godišnje" : "mjesečno";

  const netto = Math.max(0, result.nettoMonat) * mult;
  const brutto = result.bruttoMonat * mult;
  const steuern = result.steuernGesamt * mult;
  const sozial = result.sozialabgabenGesamt * mult;
  const diff = brutto - netto;
  const total = steuern + sozial + netto;

  const handleReset = () => {
    setInputs({ ...DEFAULT_INPUTS });
    saveInputs({ ...DEFAULT_INPUTS });
    toast.success("Resetovano!");
  };

  const handleShare = () => {
    const { brutto: b, period, steuerklasse, bundesland, kirchensteuer, steuerjahr, alter, kinderfreibetrag, kinderlos, kinderUnter25, kvType, zusatzbeitrag } = inputs;
    const shareData = { brutto: b, period, steuerklasse, bundesland, kirchensteuer, steuerjahr, alter, kinderfreibetrag, kinderlos, kinderUnter25, kvType, zusatzbeitrag };
    const encoded = btoa(JSON.stringify(shareData));
    const url = `${window.location.origin}/brutto-netto-rechner?b=${encoded}`;
    navigator.clipboard.writeText(url).then(() => toast.success("Link kopiert!"));
  };

  const segPct = (val: number) => total > 0 ? Math.max(0, (val / total) * 100) : 0;

  return (
    <div className="min-h-screen bg-background">
      <PageNav />
      {/* Breadcrumb */}
      <div className="border-b bg-card">
        <div className="container flex items-center gap-1.5 py-3 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">BalkanLink</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground font-medium">{"Rechner"}</span>
        </div>
      </div>

      {/* Header */}
      <section className="border-b bg-primary py-8 md:py-10">
        <div className="container text-center">
          <Euro className="mx-auto h-6 w-6 text-[hsl(var(--gold))] mb-3" />
          <h1 className="text-xl font-bold text-primary-foreground md:text-2xl">
            {"Brutto-Netto-Rechner"}
          </h1>
          <p className="mt-2 text-sm text-primary-foreground/80">
            {"Berechne dein Nettogehalt"}
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="py-6 md:py-10">
        <div className="container max-w-6xl">
          <div className="grid gap-6 lg:grid-cols-[1fr_440px]">

            {/* ═══ LEFT: INPUTS ═══ */}
            <div className="space-y-5">
              <div className="rounded-xl border bg-card p-5 shadow-sm space-y-5">
                <h2 className="flex items-center gap-2 text-sm font-bold">
                  <Euro className="h-4 w-4 text-primary" /> {"Daten eingeben"}
                </h2>

                {/* Brutto */}
                <div className="space-y-1.5">
                  <Label className="text-xs">
                    Bruto plata (€)
                    <InfoTip text={"Brutto-Monatsgehalt eingeben"} />
                  </Label>
                  <div className="relative">
                    <Input
                      type="number"
                      min={0}
                      step={100}
                      value={inputs.brutto || ""}
                      onChange={e => update({ brutto: Number(e.target.value) })}
                      placeholder="3500"
                      className="tabular-nums text-lg font-bold pr-8"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">€</span>
                  </div>
                  <div className="flex rounded-lg border overflow-hidden mt-2">
                    {(["monatlich", "jaehrlich"] as const).map(p => (
                      <button
                        key={p}
                        onClick={() => update({ period: p })}
                        className={`flex-1 px-3 py-2 text-xs font-medium transition-colors ${
                          inputs.period === p
                            ? "bg-primary text-primary-foreground"
                            : "bg-card text-muted-foreground hover:bg-muted"
                        }`}
                      >
                        {p === "monatlich" ? "Monatlich" : "Jährlich"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Steuerklasse with descriptions */}
                <div className="space-y-1.5">
                  <Label className="text-xs">
                    {"Steuerklasse"}
                    <InfoTip text={"Steuerklasse wählen"} />
                  </Label>
                  <Select value={String(inputs.steuerklasse)} onValueChange={v => update({ steuerklasse: Number(v) })}>
                    <SelectTrigger className="text-xs"><SelectValue /></SelectTrigger>
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
                  <Label className="text-xs">
                    {"Bundesland"}
                    <InfoTip text={"Bundesland wählen"} />
                  </Label>
                  <Select value={inputs.bundesland} onValueChange={v => update({ bundesland: v })}>
                    <SelectTrigger className="text-xs"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {BUNDESLAENDER.map(b => (
                        <SelectItem key={b.value} value={b.value} className="text-xs">{b.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Kirchensteuer */}
                <div className="flex items-center gap-3">
                  <Switch checked={inputs.kirchensteuer} onCheckedChange={v => update({ kirchensteuer: v })} />
                  <Label className="text-xs">
                    Crkveni porez ({kirchensteuerSatz}%)
                    <InfoTip text={"Kirchensteuer (falls Kirchenmitglied)"} />
                  </Label>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                  <Button variant="outline" size="sm" onClick={handleReset} className="gap-1.5 text-xs">
                    <RotateCcw className="h-3.5 w-3.5" /> {"Resetuj"}
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleShare} className="gap-1.5 text-xs">
                    <Share2 className="h-3.5 w-3.5" /> {"Podijeli"}
                  </Button>
                </div>

                {/* Izračunaj button */}
                <button
                  type="button"
                  onClick={() => {
                    const el = document.querySelector('[data-result-box]');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                  className="w-full md:w-auto mt-2 rounded-full px-7 py-3 text-[15px] font-bold text-[hsl(var(--gold-foreground))] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(255,184,0,0.35)] active:scale-[0.985]"
                  style={{ background: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)", boxShadow: "0 10px 24px rgba(255,184,0,0.30)" }}
                >
                  Izračunaj
                </button>
              </div>
            </div>

            {/* ═══ RIGHT: RESULTS ═══ */}
            <div className="space-y-5 lg:sticky lg:top-6 lg:self-start">

              {/* Toggle */}
              <div className="flex rounded-lg border overflow-hidden">
                {[false, true].map(yearly => (
                  <button
                    key={String(yearly)}
                    onClick={() => setIsYearly(yearly)}
                    className={`flex-1 px-4 py-2.5 text-xs font-semibold transition-colors ${
                      isYearly === yearly
                        ? "bg-primary text-primary-foreground"
                        : "bg-card text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    {yearly ? "Godišnje" : "Mjesečno"}
                  </button>
                ))}
              </div>

              {/* Highlight box */}
              <div data-result-box className="rounded-2xl border-2 border-[hsl(var(--success))]/30 bg-[#0f1f3d] p-6 shadow-xl shadow-[hsl(var(--success))]/5 transition-all duration-300">
                <p className="text-xs font-semibold text-white/50 mb-1">Dobiješ na račun:</p>
                <p className="text-5xl font-black text-[hsl(var(--success))] tabular-nums transition-all duration-300">
                  {fmt(netto)} €
                </p>
                <p className="text-xs text-white/40 mt-1">neto / {periodLabel}</p>

                {isYearly && (
                  <p className="mt-2 text-sm font-bold text-[hsl(var(--success))]/80">
                    Godišnje na račun: {fmt(netto)} €
                  </p>
                )}
              </div>

              {/* Visual breakdown bar */}
              <div className="rounded-xl border bg-card p-5 shadow-sm space-y-4">
                <div className="flex h-6 w-full overflow-hidden rounded-full">
                  <div
                    className="bg-[hsl(var(--success))] transition-all duration-300"
                    style={{ width: `${segPct(netto)}%` }}
                  />
                  <div
                    className="bg-destructive transition-all duration-300"
                    style={{ width: `${segPct(steuern)}%` }}
                  />
                  <div
                    className="bg-orange-500 transition-all duration-300"
                    style={{ width: `${segPct(sozial)}%` }}
                  />
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-[10px] sm:text-sm">
                  <div>
                    <div className="flex items-center justify-center gap-1.5 mb-1">
                      <span className="h-2.5 w-2.5 rounded-full bg-[hsl(var(--success))]" />
                      <span className="text-[10px] font-semibold text-muted-foreground">Neto</span>
                    </div>
                    <p className="text-sm font-bold tabular-nums">{fmt(netto)} €</p>
                    <p className="text-[10px] text-muted-foreground">({pct(netto, brutto)}%)</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1.5 mb-1">
                      <span className="h-2.5 w-2.5 rounded-full bg-destructive" />
                      <span className="text-[10px] font-semibold text-muted-foreground">Porez</span>
                    </div>
                    <p className="text-sm font-bold tabular-nums">{fmt(steuern)} €</p>
                    <p className="text-[10px] text-muted-foreground">({pct(steuern, brutto)}%)</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1.5 mb-1">
                      <span className="h-2.5 w-2.5 rounded-full bg-orange-500" />
                      <span className="text-[10px] font-semibold text-muted-foreground">Doprinosi</span>
                    </div>
                    <p className="text-sm font-bold tabular-nums">{fmt(sozial)} €</p>
                    <p className="text-[10px] text-muted-foreground">({pct(sozial, brutto)}%)</p>
                  </div>
                </div>

                {/* Difference highlight */}
                <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-center">
                  <p className="text-sm font-bold text-destructive">
                    Razlika: − {fmt(diff)} € ({pct(diff, brutto)}% odlazi državi)
                  </p>
                </div>
              </div>

              {/* Collapsible details */}
              <Collapsible open={detailsOpen} onOpenChange={setDetailsOpen}>
                <CollapsibleTrigger className="flex items-center gap-2 w-full rounded-xl border bg-card px-5 py-3 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors">
                  {detailsOpen ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                  Prikaži detalje
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="mt-2 rounded-xl border bg-card p-5 shadow-sm space-y-3">
                    <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Porezi</h3>
                    <DetailRow label="Lohnsteuer" amount={result.lohnsteuerMonat * mult} />
                    <DetailRow label="Solidaritätszuschlag" amount={result.soliMonat * mult} />
                    {inputs.kirchensteuer && (
                      <DetailRow label="Kirchensteuer" amount={result.kirchensteuerMonat * mult} />
                    )}

                    <div className="border-t my-2" />
                    <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Doprinosi</h3>
                    <DetailRow label="Krankenversicherung" amount={result.kvAN * mult} />
                    <DetailRow label="Rentenversicherung" amount={result.rvAN * mult} />
                    <DetailRow label="Arbeitslosenversicherung" amount={result.avAN * mult} />
                    <DetailRow label="Pflegeversicherung" amount={result.pvAN * mult} />

                    <div className="border-t my-2" />
                    <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                      <Building2 className="h-3.5 w-3.5" /> Troškovi poslodavca
                    </h3>
                    <DetailRow label="Ukupni trošak za poslodavca" amount={result.agKostenGesamt * mult} bold />
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* Info note */}
              <div className="flex items-start gap-2 px-1 py-2">
                <Info className="h-3.5 w-3.5 text-muted-foreground/60 mt-0.5 shrink-0" />
                <p className="text-xs text-muted-foreground/60 leading-relaxed">
                  {"Informative Schätzung — keine Rechtsberatung."}
                </p>
              </div>
            </div>
          </div>

          {/* Mobile sticky netto bar */}
          <div className="fixed bottom-0 left-0 right-0 z-40 border-t bg-card/95 backdrop-blur px-4 py-3 lg:hidden">
            <div className="flex items-center justify-between max-w-lg mx-auto">
              <span className="text-xs font-medium text-muted-foreground">Neto / {periodLabel}</span>
              <span className="text-lg font-extrabold text-[hsl(var(--success))] tabular-nums">
                {fmt(netto)} €
              </span>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-10 mb-20 lg:mb-10 rounded-xl border border-border bg-muted/40 p-5 max-w-3xl mx-auto">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">
                  {"Dies ist eine Schätzung. Zuständige Stelle kontaktieren."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function DetailRow({ label, amount, bold }: { label: string; amount: number; bold?: boolean }) {
  return (
    <div className={`flex items-center justify-between py-0.5 ${bold ? "font-semibold text-foreground" : "text-muted-foreground"}`}>
      <span className="text-xs">{label}</span>
      <span className="text-xs tabular-nums">{fmt(Math.abs(amount))} €</span>
    </div>
  );
}
