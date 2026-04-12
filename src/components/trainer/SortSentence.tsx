import { useState, useMemo } from "react";
import { Check, X } from "lucide-react";
import type { Exercise } from "@/lib/deutsch-trainer-data";

interface Props {
  exercise: Exercise;
  onAnswer: (correct: boolean) => void;
  answered?: boolean;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function SortSentence({ exercise, onAnswer }: Props) {
  const correctOrder = exercise.answer as number[];

  const shuffledIndices = useMemo(
    () => shuffle(exercise.options.map((_, i) => i)),
    [exercise]
  );

  const [placed, setPlaced] = useState<number[]>([]);
  const [checked, setChecked] = useState(false);

  const available = shuffledIndices.filter(i => !placed.includes(i));

  const addWord = (idx: number) => {
    if (checked) return;
    setPlaced(p => [...p, idx]);
  };

  const removeWord = (pos: number) => {
    if (checked) return;
    setPlaced(p => p.filter((_, i) => i !== pos));
  };

  const handleCheck = () => {
    const isCorrect = placed.length === correctOrder.length && 
      placed.every((v, i) => v === correctOrder[i]);
    setChecked(true);
    onAnswer(isCorrect);
  };

  const isCorrect = checked && placed.every((v, i) => v === correctOrder[i]);

  return (
    <div className="flex flex-col gap-4">
      <div className="min-h-[64px] flex flex-wrap gap-2 rounded-2xl 
        border-2 border-dashed border-white/20 bg-white/[0.04] p-3">
        {placed.length === 0 && (
          <span className="text-sm text-white/30 self-center px-1">
            Klikni na riječi u ispravnom redoslijedu...
          </span>
        )}
        {placed.map((wordIdx, pos) => (
          <button
            key={pos}
            onClick={() => removeWord(pos)}
            disabled={checked}
            className={`rounded-xl border-2 px-4 py-2.5 text-[15px] 
              font-semibold min-h-[44px] transition-all ${
              checked
                ? wordIdx === correctOrder[pos]
                  ? "border-emerald-400 bg-emerald-500/20 text-emerald-200"
                  : "border-red-400 bg-red-500/15 text-red-300"
                : "border-blue-400/60 bg-blue-500/15 text-white hover:bg-blue-500/25"
            }`}
          >
            {exercise.options[wordIdx]}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {available.map(idx => (
          <button
            key={idx}
            onClick={() => addWord(idx)}
            disabled={checked}
            className="rounded-xl border-2 border-white/20 bg-white/[0.08] 
              text-white px-4 py-2.5 text-[15px] font-semibold min-h-[44px]
              transition-all hover:border-white/40 hover:bg-white/[0.14]
              active:scale-[0.97]"
          >
            {exercise.options[idx]}
          </button>
        ))}
      </div>

      {!checked && placed.length === exercise.options.length && (
        <button
          onClick={handleCheck}
          className="mt-1 rounded-2xl px-6 py-3.5 text-sm font-bold 
            text-white w-full"
          style={{ background: "linear-gradient(135deg, #3b82f6, #06b6d4)" }}
        >
          Provjeri
        </button>
      )}

      {checked && (
        <div className={`rounded-2xl p-4 ${
          isCorrect 
            ? "bg-emerald-500/15 border-2 border-emerald-400/40" 
            : "bg-red-500/15 border-2 border-red-400/40"
        }`}>
          <p className={`text-sm font-black mb-1 ${
            isCorrect ? "text-emerald-300" : "text-red-300"
          }`}>
            {isCorrect ? "✓ Tačno!" : "✗ Netačno."}
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
