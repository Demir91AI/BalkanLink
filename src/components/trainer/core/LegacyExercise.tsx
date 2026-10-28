import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import type { Exercise } from "@/lib/trainer/types";
import { shuffleExercise } from "@/lib/deutsch-trainer-data";
import MultipleChoice from "../MultipleChoice";
import SortSentence from "../SortSentence";
import FillBlank from "../FillBlank";
import QuickReaction from "../QuickReaction";

/** Renders one legacy exercise with the existing deterministic widgets. */
export default function LegacyExercise({ id, exercise, onAnswer }: { id: string; exercise: Exercise; onAnswer: (correct: boolean) => void }) {
  const { t } = useTranslation("pages");
  // Shuffle once per exercise instance; widgets compare against the shuffled answer index.
  const ex = useMemo(() => shuffleExercise(exercise), [id]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div>
      {ex.situation && (
        <div className="mb-3 rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-sky-300">{t("deutschTrainer.lessonView.situation")}</p>
          <p className="mt-0.5 text-sm font-medium text-white/85" lang="de">{ex.situation}</p>
        </div>
      )}
      <h3 className="mb-4 text-base font-bold leading-snug text-white" lang="de">{ex.question}</h3>
      {ex.type === "multiple_choice" && <MultipleChoice key={id} exercise={ex} onAnswer={onAnswer} />}
      {ex.type === "quick_reaction" && <QuickReaction key={id} exercise={ex} onAnswer={onAnswer} />}
      {ex.type === "fill_blank" && <FillBlank key={id} exercise={ex} onAnswer={onAnswer} />}
      {ex.type === "sort_sentence" && <SortSentence key={id} exercise={ex} onAnswer={onAnswer} />}
    </div>
  );
}
