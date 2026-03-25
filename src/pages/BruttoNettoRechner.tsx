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
import { useLanguage } from "@/contexts/LanguageContext";

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
function SegmentedBar({ result, t }: { result: BruttoNettoResult; t: (k: string) => string }) {
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
          title={`${t("calc.legendTax")}: ${fmt(steuern)} €`}
        />
        <div
          className="bg-[hsl(var(--gold))] transition-all"
          style={{ width: `${seg(sozial)}%` }}
          title={`${t("calc.legendSocial")}: ${fmt(sozial)} €`}
        />
        <div
          className="bg-[hsl(var(--success))] transition-all"
          style={{ width: `${seg(netto)}%` }}
          title={`${t("calc.legendNet")}: ${fmt(netto)} €`}
        />
      </div>
      <div className="flex flex-wrap gap-3 text-[11px] text-muted-foreground">
        <span className="flex items-center gap-1"><span className="inline-block h-2.5 w-2.5 rounded-full bg-destructive/80" /> {t("calc.legendTax")}</span>
        <span className="flex items-center gap-1"><span className="inline-block h-2.5 w-2.5 rounded-full bg-[hsl(var(--gold))]" /> {t("calc.legendSocial")}</span>
        <span className="flex items-center gap-1"><span className="inline-block h-2.5 w-2.5 rounded-full bg-[hsl(var(--success))]" /> {t("calc.legendNet")}</span>
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
  const { t } = useLanguage();
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
    toast.success(t("calc.resetSuccess"));
  };

  const handleShare = () => {
    const { brutto, period, steuerklasse, bundesland, kirchensteuer, steuerjahr, alter, kinderfreibetrag, kinderlos, kinderUnter25, kvType, zusatzbeitrag } = inputs;
    const shareData = { brutto, period, steuerklasse, bundesland, kirchensteuer, steuerjahr, alter, kinderfreibetrag, kinderlos, kinderUnter25, kvType, zusatzbeitrag };
    const encoded = btoa(JSON.stringify(shareData));
    const url = `${window.location.origin}/brutto-netto-rechner?b=${encoded}`;
    navigator.clipboard.writeText(url).then(() => toast.success(t("calc.shareSuccess")));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b bg-card">
        <div className="container flex items-center gap-1.5 py-3 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">BalkanLink</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/tools" className="hover:text-foreground transition-colors">{t("calc.breadcrumbTools")}</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground font-medium">{t("calc.breadcrumbCalc")}</span>
        </div>
      </div>

      {/* Header */}
      <section className="border-b bg-primary py-8 md:py-10">
        <div className="container text-center">
          <div className="mx-auto flex items-center justify-center gap-2 mb-3">
            <Euro className="h-6 w-6 text-[hsl(var(--gold))]" />
          </div>
          <h1 className="text-xl font-bold text-primary-foreground md:text-2xl">
            {t("calc.pageTitle")}
          </h1>
          <p className="mt-2 text-sm text-primary-foreground/80">
            {t("calc.pageSubtitle")}
          </p>
          <p className="mt-1 text-xs text-primary-foreground/50">
            {t("calc.pageNote")}
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
                  <Euro className="h-4 w-4 text-primary" /> {t("calc.inputsTitle")}
                </h2>

                {/* A) Salary basics */}
                <div className="space-y-3">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{t("calc.sectionSalary")}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label className="text-xs">
                        {t("calc.grossSalary")}
                        <InfoTip text={t("calc.grossSalaryTip")} />
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
                      <Label className="text-xs">{t("calc.period")}</Label>
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
                            {p === "monatlich" ? t("calc.monthly") : t("calc.yearly")}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* B) Tax basics */}
                <div className="space-y-3">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{t("calc.sectionTax")}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label className="text-xs">
                        {t("calc.taxClass")}
                        <InfoTip text={t("calc.taxClassTip")} />
                      </Label>
                      <Select value={String(inputs.steuerklasse)} onValueChange={v => update({ steuerklasse: Number(v) })}>
                        <SelectTrigger className="text-xs"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6].map(k => (
                            <SelectItem key={k} value={String(k)} className="text-xs">
                              {t("calc.taxClass")} {k}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs">
                        {t("calc.federalState")}
                        <InfoTip text={t("calc.federalStateTip")} />
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
                      <Label className="text-xs">{t("calc.taxYear")}</Label>
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
                        {t("calc.churchTax")} ({kirchensteuerSatz}%)
                        <InfoTip text={t("calc.churchTaxTip")} />
                      </Label>
                    </div>
                  </div>
                </div>

                {/* C) Personal */}
                <div className="space-y-3">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{t("calc.sectionPersonal")}</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="space-y-1.5">
                      <Label className="text-xs">
                        {t("calc.age")}
                        <InfoTip text={t("calc.ageTip")} />
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
                        {t("calc.childAllowance")}
                        <InfoTip text={t("calc.childAllowanceTip")} />
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
                        {t("calc.childrenUnder25")}
                        <InfoTip text={t("calc.childrenUnder25Tip")} />
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
                      <Label className="text-xs">{t("calc.childless")}</Label>
                    </div>
                  </div>
                </div>

                {/* D) Health insurance */}
                <div className="space-y-3">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{t("calc.sectionHealth")}</h3>
                  <div className="flex rounded-lg border overflow-hidden mb-3">
                    {(["gesetzlich", "privat"] as const).map(kvt => (
                      <button
                        key={kvt}
                        onClick={() => update({ kvType: kvt })}
                        className={`flex-1 px-3 py-2 text-xs font-medium transition-colors ${
                          inputs.kvType === kvt
                            ? "bg-primary text-primary-foreground"
                            : "bg-card text-muted-foreground hover:bg-muted"
                        }`}
                      >
                        {kvt === "gesetzlich" ? t("calc.statutory") : t("calc.private")}
                      </button>
                    ))}
                  </div>
                  {inputs.kvType === "gesetzlich" ? (
                    <div className="space-y-1.5">
                      <Label className="text-xs">
                        {t("calc.additionalContribution")}
                        <InfoTip text={t("calc.additionalContributionTip")} />
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
                        {t("calc.pkvAmount")}
                        <InfoTip text={t("calc.pkvAmountTip")} />
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
                  {t("calc.socialDetails")}
                </button>
                {showSozialDetails && (
                  <div className="grid grid-cols-2 gap-3 rounded-lg border bg-muted/30 p-4">
                    {([
                      { key: "rvEnabled" as const, labelKey: "calc.pension" },
                      { key: "avEnabled" as const, labelKey: "calc.unemployment" },
                      { key: "pvEnabled" as const, labelKey: "calc.nursingCare" },
                      { key: "kvEnabled" as const, labelKey: "calc.healthInsurance" },
                    ]).map(({ key, labelKey }) => (
                      <div key={key} className="flex items-center gap-2">
                        <Switch
                          checked={inputs[key]}
                          onCheckedChange={v => update({ [key]: v })}
                          disabled={key === "kvEnabled" && inputs.kvType === "privat"}
                        />
                        <Label className="text-xs">{t(labelKey)}</Label>
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
                  {t("calc.advanced")}
                </button>
                {showAdvanced && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 rounded-lg border bg-muted/30 p-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs">
                        {t("calc.allowance")}
                        <InfoTip text={t("calc.allowanceTip")} />
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
                        {t("calc.oneTimePayment")}
                        <InfoTip text={t("calc.oneTimePaymentTip")} />
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
                          {t("calc.churchTaxOverride")}
                          <InfoTip text={t("calc.churchTaxOverrideTip")} />
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
                    <RotateCcw className="h-3.5 w-3.5" /> {t("calc.reset")}
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleShare} className="gap-1.5 text-xs">
                    <Share2 className="h-3.5 w-3.5" /> {t("calc.share")}
                  </Button>
                </div>
              </div>
            </div>

            {/* ═══ RIGHT: RESULTS ═══ */}
            <div className="space-y-5 lg:sticky lg:top-6 lg:self-start">
              {/* Big numbers */}
              <div className="rounded-xl border bg-card p-5 shadow-sm space-y-4">
                <h2 className="flex items-center gap-2 text-sm font-bold">
                  <Euro className="h-4 w-4 text-[hsl(var(--success))]" /> {t("calc.resultTitle")}
                </h2>

                <div className="text-center space-y-1">
                  <p className="text-xs text-muted-foreground">{t("calc.netPerMonth")}</p>
                  <p className="text-3xl font-extrabold text-[hsl(var(--success))] tabular-nums">
                    {fmt(Math.max(0, result.nettoMonat))} €
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="rounded-lg bg-muted/50 p-3">
                    <p className="text-[10px] text-muted-foreground">{t("calc.netPerYear")}</p>
                    <p className="text-sm font-bold tabular-nums">{fmt(Math.max(0, result.nettoJahr))} €</p>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-3">
                    <p className="text-[10px] text-muted-foreground">{t("calc.grossPerMonth")}</p>
                    <p className="text-sm font-bold tabular-nums">{fmt(result.bruttoMonat)} €</p>
                  </div>
                </div>

                {/* Segmented bar */}
                <SegmentedBar result={result} t={t} />

                {/* Steuern breakdown */}
                <div className="space-y-1">
                  <h3 className="text-xs font-semibold text-foreground">{t("calc.legendTax")}</h3>
                  <Row label={t("calc.incomeTax")} amount={result.lohnsteuerMonat} percent={pct(result.lohnsteuerMonat, result.bruttoMonat)} indent />
                  <Row label={t("calc.soliSurcharge")} amount={result.soliMonat} indent />
                  {inputs.kirchensteuer && (
                    <Row label={`${t("calc.churchTax")} (${kirchensteuerSatz}%)`} amount={result.kirchensteuerMonat} indent />
                  )}
                  <div className="border-t my-1" />
                  <Row label={t("calc.totalTax")} amount={result.steuernGesamt} bold />
                </div>

                {/* Sozialabgaben breakdown */}
                <div className="space-y-1">
                  <h3 className="text-xs font-semibold text-foreground">{t("calc.socialAN")}</h3>
                  {inputs.rvEnabled && <Row label={`${t("calc.pension")} (9,3%)`} amount={result.rvAN} indent />}
                  {inputs.avEnabled && <Row label={`${t("calc.unemployment")} (1,3%)`} amount={result.avAN} indent />}
                  {inputs.kvType === "gesetzlich" && inputs.kvEnabled && (
                    <Row label={`${t("calc.healthInsurance")} (${t("calc.inclZB")} ${inputs.zusatzbeitrag}%)`} amount={result.kvAN} indent />
                  )}
                  {inputs.kvType === "privat" && (
                    <Row label={t("calc.pkvLabel")} amount={result.pkvBeitragMonat} indent />
                  )}
                  {inputs.pvEnabled && (
                    <Row
                      label={`${t("calc.nursingCare")}${inputs.kinderlos && inputs.alter >= 23 ? ` (${t("calc.inclSurcharge")})` : ""}`}
                      amount={result.pvAN}
                      indent
                    />
                  )}
                  <div className="border-t my-1" />
                  <Row label={t("calc.totalSocial")} amount={result.sozialabgabenGesamt} bold />
                </div>

                <div className="border-t pt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-[hsl(var(--success))]">{t("calc.legendNet")}</span>
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
                  {t("calc.infoNote")}
                </p>
              </div>

              {/* AG Kosten */}
              <div className="rounded-xl border bg-card p-5 shadow-sm space-y-2">
                <h3 className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                  <Building2 className="h-3.5 w-3.5" /> {t("calc.employerTitle")}
                </h3>
                {inputs.rvEnabled && <Row label={`${t("calc.pension")} (AG)`} amount={result.rvAG} indent />}
                {inputs.avEnabled && <Row label={`${t("calc.unemployment")} (AG)`} amount={result.avAG} indent />}
                {inputs.kvType === "gesetzlich" && inputs.kvEnabled && <Row label={`${t("calc.healthInsurance")} (AG)`} amount={result.kvAG} indent />}
                {inputs.pvEnabled && <Row label={`${t("calc.nursingCare")} (AG)`} amount={result.pvAG} indent />}
                <div className="border-t my-1" />
                <Row label={t("calc.totalEmployer")} amount={result.agKostenGesamt} bold />
                <p className="text-[10px] text-muted-foreground">{t("calc.employerNote")}</p>
              </div>

              <p className="text-[10px] text-muted-foreground text-center">
                {t("calc.disclaimerShort")}
              </p>
            </div>
          </div>

          {/* Mobile sticky netto bar */}
          <div className="fixed bottom-0 left-0 right-0 z-40 border-t bg-card/95 backdrop-blur px-4 py-3 lg:hidden">
            <div className="flex items-center justify-between max-w-lg mx-auto">
              <span className="text-xs font-medium text-muted-foreground">{t("calc.netPerMonth")}</span>
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
                  {t("calc.disclaimerFull")}
                </p>
                <p className="text-xs text-muted-foreground/70">
                  {t("calc.disclaimerAdvice")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
