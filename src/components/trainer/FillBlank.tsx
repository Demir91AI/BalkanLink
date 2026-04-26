import { useState } from "react";
import { Check, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { Exercise } from "@/lib/deutsch-trainer-data";

interface Props {
  exercise: Exercise;
  onAnswer: (correct: boolean) => void;
  answered?: boolean;
}

export default function FillBlank({ exercise, onAnswer }: Props) {
  const { t } = useTranslation("pages");
  const [selected, setSelected] = useState<string | null>(null);
  const isAnswered = selected !== null;
  const isCorrect = selected === exercise.answer;
  const parts = exercise.question.split("___");

  const handleSelect = (opt: string) => {
    if (isAnswered) return;
    setSelected(opt);
    onAnswer(opt === exercise.answer);
  };

  return (
    <div className="flex flex-col gap-5">
      <p className="text-lg font-semibold leading-relaxed text-white">
        {parts[0]}
        <span className={`inline-block min-w-[100px] rounded-lg border-b-2 
          px-2 py-0.5 text-center font-bold mx-1 ${
          !isAnswered
            ? "border-white/40 text-white/30 bg-white/5"
            : isCorrect
            ? "border-emerald-400 text-emerald-300 bg-emerald-500/15"
            : "border-red-400 text-red-300 bg-red-500/10"
        }`}>
          {selected ?? "___"}
        </span>
        {parts[1]}
      </p>

      <div className="flex flex-wrap gap-3">
        {exercise.options.map((opt) => {
          let cls = "border-white/20 bg-white/[0.07] text-white hover:border-blue-400/60 hover:bg-white/[0.12]";
          if (isAnswered && opt === exercise.answer)
            cls = "border-emerald-400 bg-emerald-500/20 text-emerald-200";
          else if (isAnswered && opt === selected && opt !== exercise.answer)
            cls = "border-red-400 bg-red-500/15 text-red-300";

          return (
            <button
              key={opt}
              onClick={() => handleSelect(opt)}
              disabled={isAnswered}
              className={`rounded-2xl border-2 px-6 py-3 text-sm 
                font-bold transition-all active:scale-[0.97] ${cls}`}
            >
              {opt}
              {isAnswered && opt === exercise.answer && 
                <Check className="ml-2 inline h-4 w-4" />}
              {isAnswered && opt === selected && opt !== exercise.answer && 
                <X className="ml-2 inline h-4 w-4" />}
            </button>
          );
        })}
      </div>

      {isAnswered && (
        <div className={`rounded-2xl p-4 ${
          isCorrect 
            ? "bg-emerald-500/15 border-2 border-emerald-400/40" 
            : "bg-red-500/15 border-2 border-red-400/40"
        }`}>
          <p className={`text-sm font-black mb-1 ${
            isCorrect ? "text-emerald-300" : "text-red-300"
          }`}>
            {isCorrect ? t("deutschTrainer.exercise.correct") : t("deutschTrainer.exercise.incorrectWithAnswer", { answer: exercise.answer })}
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
