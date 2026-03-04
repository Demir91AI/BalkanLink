import { useState, useMemo, useEffect, useCallback } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  ChevronRight, Info, RotateCcw, Share2, Euro, AlertTriangle,
  ChevronDown, ChevronUp, Building2
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Tooltip, TooltipContent, TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import {
  BUNDESLAENDER, TAX_YEARS, DEFAULT_INPUTS,
  computeBruttoNetto,
  type BruttoNettoInputs, type BruttoNettoResult, type TaxYear,
} from "@/lib/brutto-netto-config";

/* ─── Helpers ─── */
const fmt = (n: number) =>
  n.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const pct = (part: number, whole: number) =>
  whole > 0 ? ((part / whole) * 100).toFixed(1) : "0.0";

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

/* ─── Segmented Bar ─── */
function SegmentedBar({ result }: { result: BruttoNettoResult }) {
  const brutto = result.bruttoMonat;
  if (brutto <= 0) return null;
  const steuern = result.steuernGesamt;
  const sozial = result.sozialabgabenGesamt;
  const netto = Math.max(0, result.nettoMonat);
  const total = steuern + sozial + netto;

  const seg = (val: number) => Math.max(0, (val / total) * 100);

  return (
    <div className="space-y-2">
      <div className="flex h-5 w-full overflow-hidden rounded-full">
        <div
          className="bg-destructive/80 transition-all"
          style={{ width: `${seg(steuern)}%` }}
          title={`Steuern: ${fmt(steuern)} €`}
        />
        <div
          className="bg-[hsl(var(--gold))] transition-all"
          style={{ width: `${seg(sozial)}%` }}
          title={`Sozialabgaben: ${fmt(sozial)} €`}
        />
        <div
          className="bg-[hsl(var(--success))] transition-all"
          style={{ width: `${seg(netto)}%` }}
          title={`Netto: ${fmt(netto)} €`}
        />
      </div>
      <div className="flex flex-wrap gap-3 text-[11px] text-muted-foreground">
        <span className="flex items-center gap-1"><span className="inline-block h-2.5 w-2.5 rounded-full bg-destructive/80" /> Steuern</span>
        <span className="flex items-center gap-1"><span className="inline-block h-2.5 w-2.5 rounded-full bg-[hsl(var(--gold))]" /> Sozialabgaben</span>
        <span className="flex items-center gap-1"><span className="inline-block h-2.5 w-2.5 rounded-full bg-[hsl(var(--success))]" /> Netto</span>
      </div>
    </div>
  );
}

/* ─── Breakdown Row ─── */
function Row({ label, amount, percent, indent, bold }: {
  label: string; amount: number; percent?: string; indent?: boolean; bold?: boolean;
}) {
  return (
    <div className={`flex items-center justify-between py-1 ${indent ? "pl-3" : ""} ${bold ? "font-semibold" : "text-muted-foreground"}`}>
      <span className={`text-xs ${bold ? "text-foreground" : ""}`}>{label}</span>
      <span className={`text-xs tabular-nums ${bold ? "text-foreground" : ""}`}>
        {amount >= 0 ? "" : ""}{bold ? "" : "-"}{fmt(Math.abs(amount))} €
        {percent && <span className="ml-1 text-muted-foreground/60">({percent}%)</span>}
      </span>
    </div>
  );
}

/* ════════════════════════════════════════════════
   MAIN COMPONENT
   ════════════════════════════════════════════════ */
export default function BruttoNettoRechner() {
  const [searchParams] = useSearchParams();
  const [inputs, setInputs] = useState<BruttoNettoInputs>(() => {
    // Check URL params first, then localStorage
    const fromUrl = searchParams.get("b");
    if (fromUrl) {
      try {
        const parsed = JSON.parse(atob(fromUrl));
        return { ...DEFAULT_INPUTS, ...parsed };
      } catch { /* ignore */ }
    }
    return loadInputs();
  });
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showSozialDetails, setShowSozialDetails] = useState(false);

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

  const handleReset = () => {
    setInputs({ ...DEFAULT_INPUTS });
    saveInputs({ ...DEFAULT_INPUTS });
    toast.success("Eingaben zurückgesetzt");
  };

  const handleShare = () => {
    const { brutto, period, steuerklasse, bundesland, kirchensteuer, steuerjahr, alter, kinderfreibetrag, kinderlos, kinderUnter25, kvType, zusatzbeitrag } = inputs;
    const shareData = { brutto, period, steuerklasse, bundesland, kirchensteuer, steuerjahr, alter, kinderfreibetrag, kinderlos, kinderUnter25, kvType, zusatzbeitrag };
    const encoded = btoa(JSON.stringify(shareData));
    const url = `${window.location.origin}/brutto-netto-rechner?b=${encoded}`;
    navigator.clipboard.writeText(url).then(() => toast.success("Link kopiert!"));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b bg-card">
        <div className="container flex items-center gap-1.5 py-3 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">BalkanLink</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/tools" className="hover:text-foreground transition-colors">Tools</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground font-medium">Brutto-Netto Rechner</span>
        </div>
      </div>

      {/* Header */}
      <section className="border-b bg-primary py-8 md:py-10">
        <div className="container text-center">
          <div className="mx-auto flex items-center justify-center gap-2 mb-3">
            <Euro className="h-6 w-6 text-[hsl(var(--gold))]" />
          </div>
          <h1 className="text-xl font-bold text-primary-foreground md:text-2xl">
            Brutto-Netto Rechner Deutschland
          </h1>
          <p className="mt-2 text-sm text-primary-foreground/80">
            Berechne dein Netto-Gehalt schnell – alle Angaben ohne Gewähr.
          </p>
          <p className="mt-1 text-xs text-primary-foreground/50">
            Ergebnis ist eine Orientierung. Abweichungen zur echten Abrechnung möglich.
          </p>
        </div>
      </section>

      {/* Main content – two column */}
      <section className="py-6 md:py-10">
        <div className="container max-w-6xl">
          <div className="grid gap-6 lg:grid-cols-[1fr_420px]">

            {/* ═══ LEFT: INPUTS ═══ */}
            <div className="space-y-5">
              <div className="rounded-xl border bg-card p-5 shadow-sm space-y-5">
                <h2 className="flex items-center gap-2 text-sm font-bold">
                  <Euro className="h-4 w-4 text-primary" /> Eingaben
                </h2>

                {/* A) Salary basics */}
                <div className="space-y-3">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Gehalt</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label className="text-xs">
                        Bruttogehalt (€)
                        <InfoTip text="Dein monatliches oder jährliches Bruttogehalt vor allen Abzügen." />
                      </Label>
                      <Input
                        type="number"
                        min={0}
                        step={100}
                        value={inputs.brutto || ""}
                        onChange={e => update({ brutto: Number(e.target.value) })}
                        placeholder="3500"
                        className="tabular-nums"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs">Zeitraum</Label>
                      <div className="flex rounded-lg border overflow-hidden">
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
                  </div>
                </div>

                {/* B) Tax basics */}
                <div className="space-y-3">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Steuer</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label className="text-xs">
                        Steuerklasse
                        <InfoTip text="Steuerklasse bestimmt deine Lohnsteuer. 1=ledig, 2=alleinerziehend, 3=verheiratet (Alleinverdiener), 4=verheiratet (beide verdienen), 5=Partner von Kl.3, 6=Zweitjob." />
                      </Label>
                      <Select value={String(inputs.steuerklasse)} onValueChange={v => update({ steuerklasse: Number(v) })}>
                        <SelectTrigger className="text-xs"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6].map(k => (
                            <SelectItem key={k} value={String(k)} className="text-xs">
                              Steuerklasse {k}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs">
                        Bundesland
                        <InfoTip text="Dein Bundesland bestimmt den Kirchensteuersatz (8% in BW/BY, 9% sonst)." />
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
                    <div className="space-y-1.5">
                      <Label className="text-xs">Steuerjahr</Label>
                      <Select value={String(inputs.steuerjahr)} onValueChange={v => update({ steuerjahr: Number(v) as TaxYear })}>
                        <SelectTrigger className="text-xs"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {TAX_YEARS.map(y => (
                            <SelectItem key={y} value={String(y)} className="text-xs">{y}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center gap-3 pt-5">
                      <Switch checked={inputs.kirchensteuer} onCheckedChange={v => update({ kirchensteuer: v })} />
                      <Label className="text-xs">
                        Kirchensteuer ({kirchensteuerSatz}%)
                        <InfoTip text="Kirchensteuer wird von der Lohnsteuer berechnet: 8% in BW/BY, 9% in anderen Bundesländern." />
                      </Label>
                    </div>
                  </div>
                </div>

                {/* C) Personal */}
                <div className="space-y-3">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Persönlich</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="space-y-1.5">
                      <Label className="text-xs">
                        Alter
                        <InfoTip text="Ab 23 Jahren ohne Kinder: Zuschlag zur Pflegeversicherung." />
                      </Label>
                      <Input
                        type="number"
                        min={16}
                        max={70}
                        value={inputs.alter || ""}
                        onChange={e => update({ alter: Number(e.target.value) })}
                        className="tabular-nums text-xs"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs">
                        Kinderfreibetrag
                        <InfoTip text="0.5 pro Kind, 1.0 bei alleinigem Anspruch. Wird bei der Steuer berücksichtigt (Günstigerprüfung)." />
                      </Label>
                      <Input
                        type="number"
                        min={0}
                        max={10}
                        step={0.5}
                        value={inputs.kinderfreibetrag}
                        onChange={e => update({ kinderfreibetrag: Number(e.target.value) })}
                        className="tabular-nums text-xs"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs">
                        Kinder &lt;25
                        <InfoTip text="Anzahl leiblicher Kinder unter 25: reduziert den PV-Beitrag ab dem 2. Kind." />
                      </Label>
                      <Input
                        type="number"
                        min={0}
                        max={10}
                        value={inputs.kinderUnter25}
                        onChange={e => {
                          const v = Number(e.target.value);
                          update({ kinderUnter25: v, kinderlos: v === 0 });
                        }}
                        className="tabular-nums text-xs"
                      />
                    </div>
                    <div className="flex items-center gap-2 pt-5">
                      <Switch checked={inputs.kinderlos} onCheckedChange={v => update({ kinderlos: v, kinderUnter25: v ? 0 : inputs.kinderUnter25 })} />
                      <Label className="text-xs">Kinderlos</Label>
                    </div>
                  </div>
                </div>

                {/* D) Health insurance */}
                <div className="space-y-3">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Krankenversicherung</h3>
                  <div className="flex rounded-lg border overflow-hidden mb-3">
                    {(["gesetzlich", "privat"] as const).map(t => (
                      <button
                        key={t}
                        onClick={() => update({ kvType: t })}
                        className={`flex-1 px-3 py-2 text-xs font-medium transition-colors ${
                          inputs.kvType === t
                            ? "bg-primary text-primary-foreground"
                            : "bg-card text-muted-foreground hover:bg-muted"
                        }`}
                      >
                        {t === "gesetzlich" ? "Gesetzlich (GKV)" : "Privat (PKV)"}
                      </button>
                    ))}
                  </div>
                  {inputs.kvType === "gesetzlich" ? (
                    <div className="space-y-1.5">
                      <Label className="text-xs">
                        Zusatzbeitrag (%)
                        <InfoTip text="Kassenindividueller Zusatzbeitrag (Gesamtsatz). AN zahlt die Hälfte. Durchschnitt 2025: ca. 2,5%." />
                      </Label>
                      <Input
                        type="number"
                        min={0}
                        max={5}
                        step={0.1}
                        value={inputs.zusatzbeitrag}
                        onChange={e => update({ zusatzbeitrag: Number(e.target.value) })}
                        className="tabular-nums text-xs w-32"
                      />
                    </div>
                  ) : (
                    <div className="space-y-1.5">
                      <Label className="text-xs">
                        PKV-Beitrag (€/Monat)
                        <InfoTip text="Dein monatlicher PKV-Beitrag wird als direkte Abzugsposition behandelt." />
                      </Label>
                      <Input
                        type="number"
                        min={0}
                        step={10}
                        value={inputs.pkvBeitrag || ""}
                        onChange={e => update({ pkvBeitrag: Number(e.target.value) })}
                        className="tabular-nums text-xs w-40"
                      />
                    </div>
                  )}
                </div>

                {/* E) Sozialversicherung details */}
                <button
                  onClick={() => setShowSozialDetails(!showSozialDetails)}
                  className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showSozialDetails ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                  Sozialversicherung (Details)
                </button>
                {showSozialDetails && (
                  <div className="grid grid-cols-2 gap-3 rounded-lg border bg-muted/30 p-4">
                    {([
                      { key: "rvEnabled" as const, label: "Rentenversicherung" },
                      { key: "avEnabled" as const, label: "Arbeitslosenversicherung" },
                      { key: "pvEnabled" as const, label: "Pflegeversicherung" },
                      { key: "kvEnabled" as const, label: "Krankenversicherung" },
                    ]).map(({ key, label }) => (
                      <div key={key} className="flex items-center gap-2">
                        <Switch
                          checked={inputs[key]}
                          onCheckedChange={v => update({ [key]: v })}
                          disabled={key === "kvEnabled" && inputs.kvType === "privat"}
                        />
                        <Label className="text-xs">{label}</Label>
                      </div>
                    ))}
                  </div>
                )}

                {/* F) Advanced */}
                <button
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showAdvanced ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                  Erweitert
                </button>
                {showAdvanced && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 rounded-lg border bg-muted/30 p-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs">
                        Freibetrag (€/Jahr)
                        <InfoTip text="Jährlicher Steuerfreibetrag, z.B. Werbungskosten über Pauschbetrag, Sonderausgaben." />
                      </Label>
                      <Input
                        type="number"
                        min={0}
                        step={100}
                        value={inputs.freibetrag || ""}
                        onChange={e => update({ freibetrag: Number(e.target.value) })}
                        className="tabular-nums text-xs"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs">
                        Einmalzahlung (€)
                        <InfoTip text="Einmalige Sonderzahlung/Bonus im Jahr." />
                      </Label>
                      <Input
                        type="number"
                        min={0}
                        step={100}
                        value={inputs.einmalzahlung || ""}
                        onChange={e => update({ einmalzahlung: Number(e.target.value) })}
                        className="tabular-nums text-xs"
                      />
                    </div>
                    {inputs.kirchensteuer && (
                      <div className="space-y-1.5">
                        <Label className="text-xs">
                          Kirchensteuersatz (%) Override
                          <InfoTip text="Manuelle Überschreibung des Kirchensteuersatzes." />
                        </Label>
                        <Input
                          type="number"
                          min={0}
                          max={15}
                          step={0.5}
                          value={inputs.kirchensteuerSatzOverride ?? kirchensteuerSatz}
                          onChange={e => update({ kirchensteuerSatzOverride: Number(e.target.value) })}
                          className="tabular-nums text-xs"
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Buttons */}
                <div className="flex gap-3 pt-2">
                  <Button variant="outline" size="sm" onClick={handleReset} className="gap-1.5 text-xs">
                    <RotateCcw className="h-3.5 w-3.5" /> Zurücksetzen
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleShare} className="gap-1.5 text-xs">
                    <Share2 className="h-3.5 w-3.5" /> Teilen
                  </Button>
                </div>
              </div>
            </div>

            {/* ═══ RIGHT: RESULTS ═══ */}
            <div className="space-y-5 lg:sticky lg:top-6 lg:self-start">
              {/* Big numbers */}
              <div className="rounded-xl border bg-card p-5 shadow-sm space-y-4">
                <h2 className="flex items-center gap-2 text-sm font-bold">
                  <Euro className="h-4 w-4 text-[hsl(var(--success))]" /> Dein Ergebnis
                </h2>

                <div className="text-center space-y-1">
                  <p className="text-xs text-muted-foreground">Netto / Monat</p>
                  <p className="text-3xl font-extrabold text-[hsl(var(--success))] tabular-nums">
                    {fmt(Math.max(0, result.nettoMonat))} €
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="rounded-lg bg-muted/50 p-3">
                    <p className="text-[10px] text-muted-foreground">Netto / Jahr</p>
                    <p className="text-sm font-bold tabular-nums">{fmt(Math.max(0, result.nettoJahr))} €</p>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-3">
                    <p className="text-[10px] text-muted-foreground">Brutto / Monat</p>
                    <p className="text-sm font-bold tabular-nums">{fmt(result.bruttoMonat)} €</p>
                  </div>
                </div>

                {/* Segmented bar */}
                <SegmentedBar result={result} />

                {/* Steuern breakdown */}
                <div className="space-y-1">
                  <h3 className="text-xs font-semibold text-foreground">Steuern</h3>
                  <Row label="Lohnsteuer" amount={result.lohnsteuerMonat} percent={pct(result.lohnsteuerMonat, result.bruttoMonat)} indent />
                  <Row label="Solidaritätszuschlag" amount={result.soliMonat} indent />
                  {inputs.kirchensteuer && (
                    <Row label={`Kirchensteuer (${kirchensteuerSatz}%)`} amount={result.kirchensteuerMonat} indent />
                  )}
                  <div className="border-t my-1" />
                  <Row label="Steuern gesamt" amount={result.steuernGesamt} bold />
                </div>

                {/* Sozialabgaben breakdown */}
                <div className="space-y-1">
                  <h3 className="text-xs font-semibold text-foreground">Sozialabgaben (AN)</h3>
                  {inputs.rvEnabled && <Row label="Rentenversicherung (9,3%)" amount={result.rvAN} indent />}
                  {inputs.avEnabled && <Row label="Arbeitslosenversicherung (1,3%)" amount={result.avAN} indent />}
                  {inputs.kvType === "gesetzlich" && inputs.kvEnabled && (
                    <Row label={`Krankenversicherung (inkl. ${inputs.zusatzbeitrag}% ZB)`} amount={result.kvAN} indent />
                  )}
                  {inputs.kvType === "privat" && (
                    <Row label="PKV-Beitrag" amount={result.pkvBeitragMonat} indent />
                  )}
                  {inputs.pvEnabled && (
                    <Row
                      label={`Pflegeversicherung${inputs.kinderlos && inputs.alter >= 23 ? " (inkl. Zuschlag)" : ""}`}
                      amount={result.pvAN}
                      indent
                    />
                  )}
                  <div className="border-t my-1" />
                  <Row label="Sozialabgaben gesamt" amount={result.sozialabgabenGesamt} bold />
                </div>

                <div className="border-t pt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-[hsl(var(--success))]">Netto</span>
                    <span className="text-lg font-extrabold text-[hsl(var(--success))] tabular-nums">
                      {fmt(Math.max(0, result.nettoMonat))} €
                    </span>
                  </div>
                </div>
              </div>

              {/* Info note */}
              <div className="flex items-start gap-2 px-1 py-2">
                <Info className="h-3.5 w-3.5 text-muted-foreground/60 mt-0.5 shrink-0" />
                <p className="text-xs text-muted-foreground/60 leading-relaxed">
                  Procjena neto plate u Njemačkoj.
                  <br />
                  Rezultat može varirati ovisno o zdravstvenom osiguranju, bonusima i dodatnim odbicima.
                </p>
              </div>

              {/* AG Kosten */}
              <div className="rounded-xl border bg-card p-5 shadow-sm space-y-2">
                <h3 className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                  <Building2 className="h-3.5 w-3.5" /> Arbeitgeberkosten
                </h3>
                {inputs.rvEnabled && <Row label="RV (AG)" amount={result.rvAG} indent />}
                {inputs.avEnabled && <Row label="AV (AG)" amount={result.avAG} indent />}
                {inputs.kvType === "gesetzlich" && inputs.kvEnabled && <Row label="KV (AG)" amount={result.kvAG} indent />}
                {inputs.pvEnabled && <Row label="PV (AG)" amount={result.pvAG} indent />}
                <div className="border-t my-1" />
                <Row label="Gesamt AG-Kosten" amount={result.agKostenGesamt} bold />
                <p className="text-[10px] text-muted-foreground">Brutto + AG-Anteile Sozialversicherung</p>
              </div>

              <p className="text-[10px] text-muted-foreground text-center">
                Das Ergebnis ist eine Näherung und kann von deiner Lohnabrechnung abweichen.
              </p>
            </div>
          </div>

          {/* Mobile sticky netto bar */}
          <div className="fixed bottom-0 left-0 right-0 z-40 border-t bg-card/95 backdrop-blur px-4 py-3 lg:hidden">
            <div className="flex items-center justify-between max-w-lg mx-auto">
              <span className="text-xs font-medium text-muted-foreground">Netto / Monat</span>
              <span className="text-lg font-extrabold text-[hsl(var(--success))] tabular-nums">
                {fmt(Math.max(0, result.nettoMonat))} €
              </span>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-10 mb-20 lg:mb-10 rounded-xl border border-border bg-muted/40 p-5 max-w-3xl mx-auto">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">
                  Dieser Brutto-Netto-Rechner dient nur zur unverbindlichen Orientierung.
                  Alle Angaben ohne Gewähr.
                  Es können Abweichungen zur tatsächlichen Gehaltsabrechnung auftreten.
                </p>
                <p className="text-xs text-muted-foreground/70">
                  Für verbindliche Auskünfte wende dich an Steuerberater/in oder Finanzamt.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
