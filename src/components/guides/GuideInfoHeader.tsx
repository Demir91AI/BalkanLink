import { AlertTriangle, ClipboardList, PenLine, Clock } from "lucide-react";
import { type ReactNode } from "react";

interface Props {
  title: string;
  source: string;
  formName: string;
  whoCanApply: string;
  processingTime: string;
  requirements: string[];
  commonMistakes: string[];
}

export default function GuideInfoHeader({ title, source, formName, whoCanApply, processingTime, requirements, commonMistakes }: Props) {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-heading text-xl font-extrabold sm:text-2xl">{title}</h1>
        <p className="mt-1 text-xs text-muted-foreground">Izvor: {source}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">Formular: {formName}</p>
      </div>

      <div className="rounded-2xl border border-border/60 bg-card p-4">
        <h3 className="mb-2 flex items-center gap-1.5 text-xs font-bold">
          <PenLine className="h-3.5 w-3.5 text-primary" /> Ko može podnijeti zahtjev
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed">{whoCanApply}</p>
        <p className="mt-3 text-xs">
          <span className="font-semibold flex items-center gap-1">
            <Clock className="h-3 w-3" /> Vrijeme obrade:
          </span>
          <span className="text-muted-foreground">{processingTime}</span>
        </p>
      </div>

      <div className="rounded-2xl border border-border/60 bg-card p-4">
        <h3 className="mb-2 flex items-center gap-1.5 text-xs font-bold">
          <ClipboardList className="h-3.5 w-3.5 text-primary" /> Šta treba pripremiti
        </h3>
        <ul className="space-y-1 pl-4 list-disc">
          {requirements.map((r, i) => (
            <li key={i} className="text-xs text-muted-foreground">{r}</li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-red-200 bg-red-50 p-4 dark:border-red-900/40 dark:bg-red-950/20">
        <h3 className="mb-2 flex items-center gap-1.5 text-xs font-bold text-red-700 dark:text-red-400">
          <AlertTriangle className="h-3.5 w-3.5" /> Najčešće greške
        </h3>
        <ul className="space-y-1 pl-4 list-disc">
          {commonMistakes.map((m, i) => (
            <li key={i} className="text-xs text-red-600 dark:text-red-300">{m}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
