import { useState } from "react";
import { ChevronLeft, ChevronRight, Pencil, MapPin, Hash, XCircle, MinusCircle, FileCheck, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

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

const cardConfig = [
  { key: "whatToWrite" as const, label: "Šta tačno upisuješ", icon: <Pencil className="h-3.5 w-3.5" />, color: "border-blue-200 bg-blue-50 dark:border-blue-900/40 dark:bg-blue-950/20" },
  { key: "whereToFind" as const, label: "Gdje to nađeš", icon: <MapPin className="h-3.5 w-3.5" />, color: "border-emerald-200 bg-emerald-50 dark:border-emerald-900/40 dark:bg-emerald-950/20" },
  { key: "format" as const, label: "Format", icon: <Hash className="h-3.5 w-3.5" />, color: "border-violet-200 bg-violet-50 dark:border-violet-900/40 dark:bg-violet-950/20" },
  { key: "commonMistake" as const, label: "Česte greške", icon: <XCircle className="h-3.5 w-3.5" />, color: "border-red-200 bg-red-50 dark:border-red-900/40 dark:bg-red-950/20" },
  { key: "whenToLeaveEmpty" as const, label: "Kada ostaviti prazno", icon: <MinusCircle className="h-3.5 w-3.5" />, color: "border-amber-200 bg-amber-50 dark:border-amber-900/40 dark:bg-amber-950/20" },
  { key: "example" as const, label: "Primjer popunjenog", icon: <FileCheck className="h-3.5 w-3.5" />, color: "border-cyan-200 bg-cyan-50 dark:border-cyan-900/40 dark:bg-cyan-950/20" },
];

type CardKey = "whatToWrite" | "whereToFind" | "format" | "commonMistake" | "whenToLeaveEmpty" | "example";

interface Props {
  steps: StepData[];
  finishLabel?: string;
  onFinish?: () => void;
}

export default function SmartGuideWizardShared({ steps, finishLabel = "✅ Završeno", onFinish }: Props) {
  const [step, setStep] = useState(0);
  const current = steps[step];
  const progress = ((step + 1) / steps.length) * 100;
  const isLast = step === steps.length - 1;

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h2 className="text-lg font-bold text-foreground">Smart Guide — korak po korak</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Svako polje objašnjeno — šta upisati, gdje naći, format i česte greške
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Progress value={progress} className="h-2 flex-1" />
        <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">
          Korak {step + 1} / {steps.length}
        </span>
      </div>

      <div className="flex items-center gap-1 overflow-x-auto pb-2">
        {steps.map((_, i) => (
          <button
            key={i}
            onClick={() => setStep(i)}
            className={
              "shrink-0 rounded-full px-3 py-1 text-[10px] font-medium transition " +
              (i === step
                ? "bg-primary text-primary-foreground"
                : i < step
                ? "bg-primary/20 text-primary"
                : "bg-muted text-muted-foreground hover:bg-muted/80")
            }
          >
            {i + 1}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-border/60 bg-card p-5">
        <p className="text-[10px] font-medium text-muted-foreground mb-1">Korak {step + 1}</p>
        <h3 className="font-bold text-sm">{current.deField}</h3>
        <p className="text-xs text-muted-foreground mt-0.5">{current.bhsField}</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {cardConfig.map(({ key, label, icon, color }) => {
          const value = current[key as CardKey];
          if (!value) return null;
          return (
            <div key={key} className={`rounded-xl border p-4 ${color}`}>
              <h4 className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold">
                {icon} {label}
              </h4>
              <p className="text-xs leading-relaxed text-foreground/80">{value}</p>
            </div>
          );
        })}
        {current.note && (
          <div className="rounded-xl border p-4 border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900/30 sm:col-span-2">
            <h4 className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold">
              <Info className="h-3.5 w-3.5" /> Napomena
            </h4>
            <p className="text-xs leading-relaxed text-foreground/80">{current.note}</p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" disabled={step === 0} onClick={() => setStep(step - 1)}>
          <ChevronLeft className="mr-1 h-4 w-4" /> Nazad
        </Button>
        {isLast ? (
          <Button size="sm" className="font-bold" style={{ backgroundColor: "#EAB308", color: "#000" }} onClick={onFinish}>
            {finishLabel}
          </Button>
        ) : (
          <Button
            size="sm"
            className="font-bold"
            style={{ backgroundColor: "#EAB308", color: "#000" }}
            onClick={() => setStep(step + 1)}
          >
            Dalje <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
