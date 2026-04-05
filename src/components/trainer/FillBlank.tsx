import { useState } from "react";
import { Check, X } from "lucide-react";
import type { Exercise } from "@/lib/deutsch-trainer-data";

interface Props {
  exercise: Exercise;
  onAnswer: (correct: boolean) => void;
}

export default function FillBlank({ exercise, onAnswer }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const answered = selected !== null;
  const correct = selected === exercise.answer;

  const handleSelect = (opt: string) => {
    if (answered) return;
    setSelected(opt);
    onAnswer(opt === exercise.answer);
  };

  const parts = exercise.question.split("___");

  return (
    <div className="flex flex-col gap-4">
      <p className="text-base font-semibold leading-relaxed text-white/90">
        {parts[0]}
        <span className={`inline-block min-w-[80px] border-b-2 px-1 text-center font-bold ${
          !answered
            ? "border-white/60 text-white/30 bg-white/5"
            : correct
            ? "border-[hsl(var(--success))] text-[hsl(var(--success))] bg-[hsl(var(--success)/0.1)]"
            : "border-destructive text-destructive bg-destructive/10"
        }`}>
          {selected ?? "___"}
        </span>
        {parts[1]}
      </p>

      <div className="flex flex-wrap gap-2">
        {exercise.options.map((opt) => {
          let cls = "border-white/20 bg-white/[0.07] text-white hover:border-blue-400/60 hover:bg-white/[0.12]";
          if (answered && opt === exercise.answer) cls = "border-emerald-400 bg-emerald-500/15 text-emerald-300";
          else if (answered && opt === selected) cls = "border-red-400 bg-red-500/10 text-red-300";

          return (
            <button
              key={opt}
              onClick={() => handleSelect(opt)}
              disabled={answered}
              className={`rounded-xl border-2 px-5 py-3 text-sm font-semibold transition-all ${cls}`}
            >
              {opt}
              {answered && opt === exercise.answer && <Check className="ml-2 inline h-4 w-4" />}
              {answered && opt === selected && opt !== exercise.answer && <X className="ml-2 inline h-4 w-4" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
