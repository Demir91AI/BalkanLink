import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLearningState } from "@/hooks/useLearningState";
import { loadLessonsForLevel } from "@/lib/deutsch-trainer-data";
import type { Exercise } from "@/lib/trainer/types";
import { dueKeys, gradeReview } from "@/lib/trainer/core/learning-state";
import LegacyExercise from "./LegacyExercise";

const MAX_PER_SESSION = 10;

/** Resolve `${lessonId}:s${stage}:e${index}` keys to exercises (lazy level loading). */
export async function resolveKeys(keys: string[]): Promise<{ key: string; exercise: Exercise; lessonTitle: string }[]> {
  const out: { key: string; exercise: Exercise; lessonTitle: string }[] = [];
  for (const key of keys) {
    const m = /^(([a-c][12])-\d+):s(\d+):e(\d+)$/.exec(key);
    if (!m) continue;
    const lessons = await loadLessonsForLevel(m[2].toUpperCase());
    const lesson = lessons.find((l) => l.id === m[1]);
    const exercise = lesson?.stages[Number(m[3])]?.exercises[Number(m[4])];
    if (lesson && exercise) out.push({ key, exercise, lessonTitle: lesson.titleDe });
  }
  return out;
}

/** Spaced review of previously missed exercises (Leitner boxes 1→3→7→14 days). */
export default function ReviewSession({ onBack }: { onBack: () => void }) {
  const { t } = useTranslation("pages");
  const c = (k: string, o?: Record<string, unknown>) => t(`deutschTrainer.core.${k}`, o);
  const { state, update } = useLearningState();
  const initialKeys = useMemo(() => dueKeys(state).slice(0, MAX_PER_SESSION), []); // eslint-disable-line react-hooks/exhaustive-deps
  const [items, setItems] = useState<Awaited<ReturnType<typeof resolveKeys>> | null>(null);
  const [idx, setIdx] = useState(0);
  const [answered, setAnswered] = useState<null | boolean>(null);
  const [correct, setCorrect] = useState(0);

  useEffect(() => { let off = false; resolveKeys(initialKeys).then((r) => { if (!off) setItems(r); }); return () => { off = true; }; }, [initialKeys]);

  const item = items?.[idx];
  const finished = items !== null && idx >= items.length;

  const onAnswer = (ok: boolean) => {
    if (answered !== null || !item) return;
    setAnswered(ok);
    if (ok) setCorrect((n) => n + 1);
    update((s) => gradeReview(s, item.key, ok));
  };

  return (
    <div className="min-h-screen px-5 py-8 sm:px-10 lg:px-20" style={{ background: "linear-gradient(180deg, #0f172a 0%, #020617 100%)" }}>
      <div className="mx-auto max-w-3xl space-y-6">
        <button onClick={onBack} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-white/75 hover:text-white">
          <ArrowLeft className="h-4 w-4" /> {t("deutschTrainer.pilot.back")}
        </button>
        <header>
          <h1 className="text-2xl font-black text-white">{c("reviewTitle")}</h1>
          <p className="mt-1 text-sm text-white/75">{c("reviewIntro")}</p>
        </header>
        <section className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5" aria-live="polite">
          {items === null && <p className="flex items-center gap-2 text-white/70"><Loader2 className="h-4 w-4 animate-spin" />{c("loading")}</p>}
          {items !== null && items.length === 0 && <p className="text-white/80">{c("reviewEmpty")}</p>}
          {item && (
            <>
              <p className="mb-3 text-xs font-bold text-white/70">{c("step", { label: item.lessonTitle, i: idx + 1, n: items!.length })}</p>
              <LegacyExercise key={item.key} id={`review-${item.key}`} exercise={item.exercise} onAnswer={onAnswer} />
              {answered !== null && <Button className="mt-4 min-h-11" onClick={() => { setIdx(idx + 1); setAnswered(null); }}>{t("deutschTrainer.lessonView.next")}</Button>}
            </>
          )}
          {finished && items!.length > 0 && (
            <p className="flex items-center gap-2 font-semibold text-white"><CheckCircle2 className="h-5 w-5 text-emerald-300" />{c("reviewDone", { c: correct, n: items!.length })}</p>
          )}
        </section>
      </div>
    </div>
  );
}
