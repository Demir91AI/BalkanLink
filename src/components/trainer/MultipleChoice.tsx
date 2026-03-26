import { useState } from "react";
import { Check, X } from "lucide-react";
import type { Exercise } from "@/lib/deutsch-trainer-data";

interface Props {
  exercise: Exercise;
  onAnswer: (correct: boolean) => void;
}

export default function MultipleChoice({ exercise, onAnswer }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const answered = selected !== null;
  const correct = selected === exercise.answer;

  const handleSelect = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    onAnswer(idx === exercise.answer);
  };

  return (
    <div className="flex flex-col gap-3">
      {exercise.options.map((opt, idx) => {
        let cls = "border-border bg-card hover:border-primary/40";
        if (answered && idx === exercise.answer) cls = "border-[hsl(var(--success))] bg-[hsl(var(--success)/0.08)]";
        else if (answered && idx === selected) cls = "border-destructive bg-destructive/5";

        return (
          <button
            key={idx}
            onClick={() => handleSelect(idx)}
            disabled={answered}
            className={`flex items-center gap-3 rounded-xl border-2 px-5 py-4 text-left text-sm font-medium transition-all ${cls}`}
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold">
              {String.fromCharCode(65 + idx)}
            </span>
            <span className="flex-1">{opt}</span>
            {answered && idx === exercise.answer && <Check className="h-5 w-5 text-[hsl(var(--success))]" />}
            {answered && idx === selected && idx !== exercise.answer && <X className="h-5 w-5 text-destructive" />}
          </button>
        );
      })}
    </div>
  );
}
