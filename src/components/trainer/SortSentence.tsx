import { useState } from "react";
import { Check, X, RotateCcw } from "lucide-react";
import type { Exercise } from "@/lib/deutsch-trainer-data";

interface Props {
  exercise: Exercise;
  onAnswer: (correct: boolean) => void;
}

export default function SortSentence({ exercise, onAnswer }: Props) {
  const [placed, setPlaced] = useState<number[]>([]);
  const [checked, setChecked] = useState(false);
  const correctOrder = exercise.answer as number[];

  const available = exercise.options.map((_, i) => i).filter((i) => !placed.includes(i));

  const addWord = (idx: number) => {
    if (checked) return;
    setPlaced((p) => [...p, idx]);
  };

  const removeWord = (pos: number) => {
    if (checked) return;
    setPlaced((p) => p.filter((_, i) => i !== pos));
  };

  const handleCheck = () => {
    const isCorrect = placed.length === correctOrder.length && placed.every((v, i) => v === correctOrder[i]);
    setChecked(true);
    onAnswer(isCorrect);
  };

  const isCorrect = checked && placed.every((v, i) => v === correctOrder[i]);

  return (
    <div className="flex flex-col gap-4">
      {/* Placed words */}
      <div className="min-h-[56px] flex flex-wrap gap-2 rounded-xl border-2 border-dashed border-white/25 bg-white/[0.06] p-3">
        {placed.length === 0 && <span className="text-sm text-white/40">Tippe auf die Wörter…</span>}
        {placed.map((wordIdx, pos) => (
          <button
            key={pos}
            onClick={() => removeWord(pos)}
            className={`rounded-lg border px-3 py-2 text-sm font-medium transition-all ${
              checked
                ? wordIdx === correctOrder[pos]
                  ? "border-[hsl(var(--success))] bg-[hsl(var(--success)/0.1)] text-[hsl(var(--success))]"
                  : "border-destructive bg-destructive/5 text-destructive"
                : "border-blue-400/50 bg-blue-500/10 text-white"
            }`}
          >
            {exercise.options[wordIdx]}
          </button>
        ))}
      </div>

      {/* Available words */}
      <div className="flex flex-wrap gap-2">
        {available.map((idx) => (
          <button
            key={idx}
            onClick={() => addWord(idx)}
            className="rounded-lg border border-white/20 bg-white/[0.08] text-white px-3 py-2 text-sm font-medium transition-all hover:border-blue-400/60 hover:bg-white/[0.15]"
          >
            {exercise.options[idx]}
          </button>
        ))}
      </div>

      {!checked && placed.length === exercise.options.length && (
        <button
          onClick={handleCheck}
          className="mt-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground"
        >
          Prüfen
        </button>
      )}

      {checked && (
        <div className={`flex items-center gap-2 rounded-lg p-3 text-sm font-medium ${isCorrect ? "bg-[hsl(var(--success)/0.08)] text-[hsl(var(--success))]" : "bg-destructive/5 text-destructive"}`}>
          {isCorrect ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
          {exercise.explanation}
        </div>
      )}
    </div>
  );
}
