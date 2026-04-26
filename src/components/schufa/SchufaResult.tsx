import { useTranslation } from "react-i18next";
import { TrendingUp, TrendingDown, RefreshCw, Building, CreditCard, Car, Home, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RISK_CLASS_COLORS, type SimResult } from "@/lib/schufa-simulator";

interface Props {
  result: SimResult;
  onRestart: () => void;
  onContinue: () => void;
}

export default function SchufaResult({ result, onRestart, onContinue }: Props) {
  const { t } = useTranslation("schufa");
  const classColor = RISK_CLASS_COLORS[result.riskClass];
  const classLabel = t(`riskClass.${result.riskClass}`);

  return (
    <div className="space-y-6">
      <div
        className="rounded-2xl border border-white/10 p-6 sm:p-8 text-center"
        style={{
          background: "linear-gradient(160deg, hsl(220,50%,10%,0.95), hsl(225,45%,7%,0.97))",
        }}
      >
        <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-2">
          {t("result.label")}
        </p>
        <div className="flex items-baseline justify-center gap-3">
          <span className="text-6xl sm:text-7xl font-black text-white leading-none">
            {result.rangeLow}–{result.rangeHigh}
          </span>
          <span className="text-3xl font-bold text-white/40">%</span>
        </div>

        <div
          className="inline-flex items-center gap-3 mt-5 px-5 py-2.5 rounded-full font-bold"
          style={{
            background: `${classColor}20`,
            border: `1px solid ${classColor}50`,
            color: classColor,
          }}
        >
          <span className="text-2xl">{result.riskClass}</span>
          <span className="text-sm uppercase tracking-wide">{classLabel}</span>
        </div>

        <p className="mt-5 text-xs text-white/50 max-w-md mx-auto leading-relaxed">
          ⚠️ <strong className="text-white/80">{t("result.warningStrong")}</strong>{" "}
          {t("result.warningBody")}{" "}
          <a href="https://www.meineschufa.de/de/datenkopie" target="_blank" rel="noopener noreferrer" className="text-[hsl(var(--gold))] underline">
            {t("result.warningLink")}
          </a>{" "}
          {t("result.warningAfter")}
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
        <h3 className="text-base font-bold text-white mb-4">{t("result.chancesTitle")}</h3>
        <div className="grid grid-cols-2 gap-3">
          <ChanceCard icon={Building} label={t("result.chanceRent")} level={result.chances.rentMunich} t={t} />
          <ChanceCard icon={CreditCard} label={t("result.chanceLoan")} level={result.chances.consumerLoan} t={t} />
          <ChanceCard icon={CreditCard} label={t("result.chanceCard")} level={result.chances.creditCard} t={t} />
          <ChanceCard icon={Car} label={t("result.chanceLeasing")} level={result.chances.carLeasing} t={t} />
        </div>
        <p className="mt-3 text-xs text-white/40 italic">{t("result.chancesNote")}</p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
        <h3 className="text-base font-bold text-white mb-4">{t("result.factorsTitle")}</h3>
        <div className="space-y-2.5">
          {result.factors.map((f, i) => {
            const positive = f.delta >= 0;
            return (
              <div
                key={i}
                className="flex gap-3 p-3 rounded-xl border"
                style={{
                  background: positive ? "hsla(140,55%,45%,0.08)" : "hsla(0,70%,55%,0.08)",
                  borderColor: positive ? "hsla(140,55%,45%,0.25)" : "hsla(0,70%,55%,0.25)",
                }}
              >
                <div
                  className="shrink-0 h-9 w-9 rounded-lg flex items-center justify-center"
                  style={{
                    background: positive ? "hsla(140,55%,45%,0.15)" : "hsla(0,70%,55%,0.15)",
                  }}
                >
                  {positive ? (
                    <TrendingUp className="h-4 w-4 text-emerald-400" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-bold text-white">
                      {t(`factors.${f.key}.label`, f.params ?? {})}
                    </p>
                    <span
                      className={`text-xs font-black shrink-0 ${
                        positive ? "text-emerald-400" : "text-red-400"
                      }`}
                    >
                      {positive ? "+" : ""}
                      {f.delta}%
                    </span>
                  </div>
                  <p className="text-xs text-white/60 mt-1 leading-relaxed">
                    {t(`factors.${f.key}.detail`, f.params ?? {})}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="rounded-2xl border border-blue-500/30 bg-blue-500/10 p-5">
        <div className="flex gap-3">
          <AlertCircle className="h-5 w-5 shrink-0 text-blue-300 mt-0.5" />
          <div className="text-sm text-blue-100 leading-relaxed">
            <p className="font-bold text-blue-200 mb-1">{t("result.mythTitle")}</p>
            <p>
              Schufa <strong>{t("result.mythSeesLabel")}</strong>: {t("result.mythSeesBody")}
              <br />
              Schufa <strong>{t("result.mythHiddenLabel")}</strong>: {t("result.mythHiddenBody")}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <Button
          onClick={onContinue}
          className="flex-1 h-12 font-bold text-[hsl(225,45%,6%)] transition-all hover:scale-[1.01]"
          style={{
            background: "linear-gradient(135deg, hsl(43,70%,53%), hsl(38,65%,45%))",
            boxShadow: "0 4px 20px hsla(43,70%,53%,0.35)",
          }}
        >
          {t("result.ctaContinue")}
        </Button>
        <Button
          variant="ghost"
          onClick={onRestart}
          className="h-12 text-white/70 hover:text-white hover:bg-white/5 border border-white/10"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          {t("result.ctaRestart")}
        </Button>
      </div>
    </div>
  );
}

function ChanceCard({
  icon: Icon,
  label,
  level,
  t,
}: {
  icon: typeof Home;
  label: string;
  level: "low" | "medium" | "high";
  t: (key: string) => string;
}) {
  const meta = {
    high: { color: "hsl(140, 60%, 50%)", textKey: "result.chanceHigh", emoji: "✅" },
    medium: { color: "hsl(45, 80%, 55%)", textKey: "result.chanceMedium", emoji: "⚠️" },
    low: { color: "hsl(0, 70%, 55%)", textKey: "result.chanceLow", emoji: "❌" },
  }[level];

  return (
    <div
      className="rounded-xl p-3.5 border"
      style={{
        background: `${meta.color}10`,
        borderColor: `${meta.color}30`,
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <Icon className="h-4 w-4 text-white/60" />
        <span className="text-xs text-white/70 leading-tight">{label}</span>
      </div>
      <div className="flex items-baseline gap-1.5">
        <span style={{ color: meta.color }} className="text-base font-black">
          {meta.emoji} {t(meta.textKey)}
        </span>
      </div>
    </div>
  );
}
