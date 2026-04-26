import { useState } from "react";
import { Check, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { Exercise } from "@/lib/deutsch-trainer-data";

interface Props {
  exercise: Exercise;
  onAnswer: (correct: boolean) => void;
  answered?: boolean;
}

export default function QuickReaction({ exercise, onAnswer }: Props) {
  const { t } = useTranslation("pages");
  const [selected, setSelected] = useState<number | null>(null);
  const isAnswered = selected !== null;
  const isCorrect = selected === exercise.answer;

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelected(idx);
    onAnswer(idx === exercise.answer);
  };

  return (
    <div className="flex flex-col gap-3">
      {exercise.options.map((opt, idx) => {
        let cls = "border-white/15 bg-white/[0.06] text-white hover:border-white/30 hover:bg-white/[0.1]";
        if (isAnswered && idx === exercise.answer)
          cls = "border-emerald-400 bg-emerald-500/20 text-white";
        else if (isAnswered && idx === selected && idx !== exercise.answer)
          cls = "border-red-400 bg-red-500/15 text-white/70";

        return (
          <button
            key={idx}
            onClick={() => handleSelect(idx)}
            disabled={isAnswered}
            className={`rounded-2xl border-2 px-5 py-4 text-left 
              text-sm font-medium transition-all active:scale-[0.98] ${cls}`}
          >
            <span className="flex items-center gap-3">
              <span className="flex-1 leading-snug">{opt}</span>
              {isAnswered && idx === exercise.answer && 
                <Check className="h-5 w-5 text-emerald-400 shrink-0" />}
              {isAnswered && idx === selected && idx !== exercise.answer && 
                <X className="h-5 w-5 text-red-400 shrink-0" />}
            </span>
          </button>
        );
      })}

      {isAnswered && (
        <div className={`rounded-2xl p-4 mt-1 ${
          isCorrect 
            ? "bg-emerald-500/15 border-2 border-emerald-400/40" 
            : "bg-red-500/15 border-2 border-red-400/40"
        }`}>
          <p className={`text-sm font-black mb-1 ${
            isCorrect ? "text-emerald-300" : "text-red-300"
          }`}>
            {isCorrect ? t("deutschTrainer.exercise.correct") : t("deutschTrainer.exercise.incorrect")}
          </p>
          <p className={`text-sm leading-relaxed ${
            isCorrect ? "text-emerald-100/90" : "text-red-100/90"
          }`}>
            {exercise.explanation}
          </p>
        </div>
      )}
    </div>
  );
}
