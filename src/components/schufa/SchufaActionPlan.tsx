import { Calendar, Flame, ArrowRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ActionItem } from "@/lib/schufa-simulator";

interface Props {
  actionPlan: ActionItem[];
  onContinue: () => void;
}

const PRIORITY_META = {
  high: { label: "Visok prioritet", color: "hsl(0, 70%, 55%)", icon: Flame },
  medium: { label: "Srednji prioritet", color: "hsl(45, 80%, 55%)", icon: Calendar },
  low: { label: "Nizak prioritet", color: "hsl(200, 60%, 55%)", icon: Calendar },
} as const;

export default function SchufaActionPlan({ actionPlan, onContinue }: Props) {
  return (
    <div className="space-y-5">
      <div
        className="rounded-2xl border border-[hsl(var(--gold))]/30 p-6"
        style={{
          background: "linear-gradient(160deg, hsl(220,50%,10%,0.95), hsl(225,45%,7%,0.97))",
        }}
      >
        <h2 className="text-2xl font-black text-white mb-2">Tvoj 6-mjesečni plan poboljšanja</h2>
        <p className="text-sm text-white/60 leading-relaxed">
          Personalizirani koraci na osnovu tvojih odgovora. Sortirani po prioritetu — počni od vrha.
        </p>
      </div>

      <div className="space-y-3">
        {actionPlan.map((item, i) => {
          const meta = PRIORITY_META[item.priority];
          const Icon = meta.icon;
          return (
            <div
              key={i}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all hover:border-white/20"
            >
              <div className="flex items-start gap-4">
                <div
                  className="shrink-0 h-10 w-10 rounded-xl flex items-center justify-center font-black text-sm"
                  style={{
                    background: `${meta.color}15`,
                    color: meta.color,
                    border: `1px solid ${meta.color}30`,
                  }}
                >
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span
                      className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md"
                      style={{ background: `${meta.color}20`, color: meta.color }}
                    >
                      <Icon className="h-3 w-3" />
                      {meta.label}
                    </span>
                    <span className="text-[10px] text-white/40 uppercase tracking-wider">
                      Efekat: <strong className="text-white/70">{item.estimatedImpact}</strong>
                    </span>
                    {item.timeframeMonths > 0 && (
                      <span className="text-[10px] text-white/40 uppercase tracking-wider">
                        · Rok: <strong className="text-white/70">{item.timeframeMonths} mj</strong>
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-white mb-1.5 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/65 leading-relaxed">{item.detail}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5">
        <div className="flex gap-3">
          <FileText className="h-5 w-5 shrink-0 text-amber-300 mt-0.5" />
          <div className="text-sm text-amber-100 leading-relaxed">
            <p className="font-bold text-amber-200 mb-1">Sljedeći važan korak: Zvanični Schufa Datenkopie</p>
            <p>
              Po §15 DSGVO imaš pravo na <strong>BESPLATAN</strong> izvod tvog Schufa profila 1× godišnje.
              Tek tu vidiš stvarne podatke i možeš provjeriti netačne unose.
            </p>
          </div>
        </div>
      </div>

      <Button
        onClick={onContinue}
        className="w-full h-14 font-bold text-base text-[hsl(225,45%,6%)] transition-all hover:scale-[1.01]"
        style={{
          background: "linear-gradient(135deg, hsl(43,70%,53%), hsl(38,65%,45%))",
          boxShadow: "0 4px 24px hsla(43,70%,53%,0.35)",
        }}
      >
        Kako zatražiti zvanični Schufa Auskunft →
        <ArrowRight className="h-5 w-5 ml-2" />
      </Button>
    </div>
  );
}
