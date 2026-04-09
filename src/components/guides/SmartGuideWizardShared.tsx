import { Pencil, MapPin, Hash, XCircle, MinusCircle, FileCheck, Info, CheckCircle } from "lucide-react";
import { useSectionT } from "@/hooks/useSectionT";
import { useSubscription } from "@/hooks/useSubscription";
import SmartGuideLock from "@/components/paywall/SmartGuideLock";

export interface StepData {
  deField: string;
  bhsField: string;
  whatToWrite: string;
  whereToFind?: string;
  format?: string;
  commonMistake: string;
  whenToLeaveEmpty?: string;
  example?: string;
  note?: string;
}

interface Props {
  steps: StepData[];
  /** When true, all steps are shown without paywall */
  free?: boolean;
  finishLabel?: string;
  onFinish?: () => void;
}

const GOLD = '#C9A84C';

export default function SmartGuideWizardShared({ steps, free = false }: Props) {
  const st = useSectionT();
  const { canAccessStep } = useSubscription();

  const cardConfig = [
    { key: "whatToWrite" as const,      label: st("guide.card.whatToWrite"),    icon: <Pencil className="h-3.5 w-3.5" />,      color: "border-blue-200 bg-blue-50" },
    { key: "whereToFind" as const,      label: st("guide.card.whereToFind"),    icon: <MapPin className="h-3.5 w-3.5" />,       color: "border-emerald-200 bg-emerald-50" },
    { key: "format" as const,           label: st("guide.card.format"),          icon: <Hash className="h-3.5 w-3.5" />,         color: "border-violet-200 bg-violet-50" },
    { key: "commonMistake" as const,    label: st("guide.card.commonMistakes"), icon: <XCircle className="h-3.5 w-3.5" />,      color: "border-red-200 bg-red-50" },
    { key: "whenToLeaveEmpty" as const, label: st("guide.card.whenToLeaveEmpty"), icon: <MinusCircle className="h-3.5 w-3.5" />, color: "border-amber-200 bg-amber-50" },
    { key: "example" as const,          label: st("guide.card.example"),         icon: <FileCheck className="h-3.5 w-3.5" />,    color: "border-cyan-200 bg-cyan-50" },
  ];

  return (
    <div className="space-y-6">
      {/* Section header */}
      <div className="flex items-start gap-3 rounded-xl border border-[#C9A84C]/20 bg-[#C9A84C]/5 p-4">
        <CheckCircle className="h-5 w-5 mt-0.5 shrink-0" style={{ color: GOLD }} />
        <div>
          <h2 className="text-base font-bold text-[#2D2D2D]">Korak-po-korak vodič</h2>
          <p className="text-xs text-[#6B6B6B] mt-0.5">Svako polje objašnjeno — šta upisati, gdje naći, format i česte greške</p>
        </div>
      </div>

      {/* Step 1 always free */}
      {steps.length > 0 && (
        <StepCard step={steps[0]} index={0} cardConfig={cardConfig} st={st} />
      )}

      {/* Steps 2+ gated */}
      {steps.length > 1 && (
        <SmartGuideLock locked={!free && !canAccessStep(1)}>
          {steps.slice(1).map((step, i) => (
            <StepCard key={i + 1} step={step} index={i + 1} cardConfig={cardConfig} st={st} />
          ))}
        </SmartGuideLock>
      )}
    </div>
  );
}

function StepCard({ step, index, cardConfig, st }: {
  step: StepData;
  index: number;
  cardConfig: { key: keyof StepData; label: string; icon: React.ReactNode; color: string }[];
  st: (k: string) => string;
}) {
  return (
    <div className="rounded-xl border border-[#E5DCC8] bg-white p-5 space-y-3">
      <div className="flex items-start gap-3">
        <div
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
          style={{ background: '#C9A84C' }}
        >
          {index + 1}
        </div>
        <div>
          <h3 className="font-bold text-sm text-[#2D2D2D]">{step.deField}</h3>
          <p className="text-xs text-[#6B6B6B] mt-0.5">{step.bhsField}</p>
        </div>
      </div>

      <div className="grid gap-2.5 grid-cols-1 sm:grid-cols-2">
        {cardConfig.map(({ key, label, icon, color }) => {
          const value = step[key];
          if (!value) return null;
          return (
            <div key={key} className={`rounded-lg border p-3 ${color}`}>
              <h4 className="mb-1 flex items-center gap-1.5 text-[11px] font-bold">
                {icon} {label}
              </h4>
              <p className="text-xs leading-relaxed text-[#2D2D2D]/80 whitespace-pre-line">{value}</p>
            </div>
          );
        })}
        {step.note && (
          <div className="rounded-lg border p-3 border-gray-200 bg-gray-50 sm:col-span-2">
            <h4 className="mb-1 flex items-center gap-1.5 text-[11px] font-bold">
              <Info className="h-3.5 w-3.5" /> {st("guide.note")}
            </h4>
            <p className="text-xs leading-relaxed text-[#2D2D2D]/80 whitespace-pre-line">{step.note}</p>
          </div>
        )}
      </div>
    </div>
  );
}
