import { TrendingUp, TrendingDown, RefreshCw, Building, CreditCard, Car, Home, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RISK_CLASS_LABELS, type SimResult } from "@/lib/schufa-simulator";

interface Props {
  result: SimResult;
  onRestart: () => void;
  onContinue: () => void;
}

export default function SchufaResult({ result, onRestart, onContinue }: Props) {
  const classMeta = RISK_CLASS_LABELS[result.riskClass];

  return (
    <div className="space-y-6">
      {/* Glavna procjena */}
      <div
        className="rounded-2xl border border-white/10 p-6 sm:p-8 text-center"
        style={{
          background: "linear-gradient(160deg, hsl(220,50%,10%,0.95), hsl(225,45%,7%,0.97))",
        }}
      >
        <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-2">
          Indikativna orijentaciona procjena
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
            background: `${classMeta.color}20`,
            border: `1px solid ${classMeta.color}50`,
            color: classMeta.color,
          }}
        >
          <span className="text-2xl">{result.riskClass}</span>
          <span className="text-sm uppercase tracking-wide">{classMeta.label}</span>
        </div>

        <p className="mt-5 text-xs text-white/50 max-w-md mx-auto leading-relaxed">
          ⚠️ <strong className="text-white/80">Ovo NIJE zvanični Schufa Score.</strong> Stvarni Score
          možeš dobiti samo besplatnim <a href="https://www.meineschufa.de/de/datenkopie" target="_blank" rel="noopener noreferrer" className="text-[hsl(var(--gold))] underline">Datenkopie</a> zahtjevom (§15 DSGVO).
        </p>
      </div>

      {/* Šanse za scenarije */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
        <h3 className="text-base font-bold text-white mb-4">Procijenjene šanse za uspjeh</h3>
        <div className="grid grid-cols-2 gap-3">
          <ChanceCard icon={Building} label="Stan u Münchenu/Berlinu" level={result.chances.rentMunich} />
          <ChanceCard icon={CreditCard} label="Potrošački kredit (~50.000€)" level={result.chances.consumerLoan} />
          <ChanceCard icon={CreditCard} label="Kreditna kartica" level={result.chances.creditCard} />
          <ChanceCard icon={Car} label="Auto leasing" level={result.chances.carLeasing} />
        </div>
        <p className="mt-3 text-xs text-white/40 italic">
          Procjena na osnovu javnih kriterija banaka i stanodavaca. Stvarne odluke zavise i od plate, ugovora o radu i drugih faktora.
        </p>
      </div>

      {/* Top faktori */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
        <h3 className="text-base font-bold text-white mb-4">Šta najviše utječe na tvoju procjenu</h3>
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
                    <p className="text-sm font-bold text-white">{f.label}</p>
                    <span
                      className={`text-xs font-black shrink-0 ${
                        positive ? "text-emerald-400" : "text-red-400"
                      }`}
                    >
                      {positive ? "+" : ""}
                      {f.delta}%
                    </span>
                  </div>
                  <p className="text-xs text-white/60 mt-1 leading-relaxed">{f.detail}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mit/Istina edukativni box */}
      <div className="rounded-2xl border border-blue-500/30 bg-blue-500/10 p-5">
        <div className="flex gap-3">
          <AlertCircle className="h-5 w-5 shrink-0 text-blue-300 mt-0.5" />
          <div className="text-sm text-blue-100 leading-relaxed">
            <p className="font-bold text-blue-200 mb-1">Šta Schufa stvarno vidi?</p>
            <p>
              Schufa <strong>VIDI</strong>: kredite, kreditne kartice, otkazane Dispo, Mahnunge, Inkasso, insolvencije, broj prijava (upita), adresne podatke.<br />
              Schufa <strong>NE VIDI</strong>: tvoju platu, saldo na računu, koliko trošiš, da li si u Dispo minusu (dok te ne pošalju na Mahnung).
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
          Vidi 6-mjesečni plan poboljšanja →
        </Button>
        <Button
          variant="ghost"
          onClick={onRestart}
          className="h-12 text-white/70 hover:text-white hover:bg-white/5 border border-white/10"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Promijeni odgovore
        </Button>
      </div>
    </div>
  );
}

function ChanceCard({
  icon: Icon,
  label,
  level,
}: {
  icon: typeof Home;
  label: string;
  level: "low" | "medium" | "high";
}) {
  const meta = {
    high: { color: "hsl(140, 60%, 50%)", text: "Velike", emoji: "✅" },
    medium: { color: "hsl(45, 80%, 55%)", text: "Srednje", emoji: "⚠️" },
    low: { color: "hsl(0, 70%, 55%)", text: "Male", emoji: "❌" },
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
          {meta.emoji} {meta.text}
        </span>
      </div>
    </div>
  );
}
