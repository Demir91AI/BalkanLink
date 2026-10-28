import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowLeft, CheckCircle2, RotateCcw, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import AudioButton from "@/components/trainer/AudioButton";
import { useTTS } from "@/hooks/useTTS";
import { useTrainerProgress } from "@/hooks/useTrainerProgress";
import { useLearningState } from "@/hooks/useLearningState";
import type { Lesson } from "@/lib/trainer/types";
import type { CorePlan, ExerciseRef } from "@/lib/trainer/core/core-plan";
import { clearResume, saveResume, scheduleWrong } from "@/lib/trainer/core/learning-state";
import LegacyExercise from "./LegacyExercise";

const card = "rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5";
const h2 = "mb-3 text-lg font-bold text-white";

type Phase = "intro" | "run" | "done";

/**
 * 10–15 minute core flow for a legacy (not yet standardized) lesson:
 * goals → key phrases & typical mistakes → capped practice → mini checkpoint →
 * one repeat of missed items → completion. Resume point and missed items are
 * stored device-locally; completion uses the existing progress record.
 */
export default function CoreLessonView({ lesson, plan, onBack, onExtra }: {
  lesson: Lesson; plan: CorePlan; onBack: () => void; onExtra: () => void;
}) {
  const { t } = useTranslation("pages");
  const c = (k: string, o?: Record<string, unknown>) => t(`deutschTrainer.core.${k}`, o);
  const { toggle, activeId, playState } = useTTS();
  const { completeLesson } = useTrainerProgress();
  const { state, update } = useLearningState();

  const main: { ref: ExerciseRef; part: "practice" | "checkpoint" }[] = useMemo(() => [
    ...plan.practice.map((ref) => ({ ref, part: "practice" as const })),
    ...plan.checkpoint.map((ref) => ({ ref, part: "checkpoint" as const })),
  ], [plan]);

  const saved = state.resume[lesson.id];
  const canResume = !!saved && saved.step > 0 && saved.step < main.length;

  const [phase, setPhase] = useState<Phase>("intro");
  const [idx, setIdx] = useState(0);
  const [answered, setAnswered] = useState<null | boolean>(null);
  const [correct, setCorrect] = useState(0);
  const [missed, setMissed] = useState<ExerciseRef[]>([]);
  const queue = useMemo(() => [...main, ...missed.map((ref) => ({ ref, part: "review" as const }))], [main, missed]);
  const item = queue[idx];

  const start = (from: number, base = 0) => { setIdx(from); setCorrect(base); setMissed([]); setAnswered(null); setPhase("run"); };

  const onAnswer = (ok: boolean) => {
    if (answered !== null || !item) return;
    setAnswered(ok);
    if (item.part === "review") return;
    if (ok) setCorrect((n) => n + 1);
    else {
      setMissed((m) => [...m, item.ref]);
      update((s) => scheduleWrong(s, item.ref.key, lesson.id));
    }
  };

  const next = () => {
    const n = idx + 1;
    if (n < main.length) update((s) => saveResume(s, lesson.id, { step: n, correct: correct, answered: n }));
    if (n >= queue.length) {
      completeLesson(lesson.id);
      update((s) => clearResume(s, lesson.id));
      setPhase("done");
      return;
    }
    setIdx(n); setAnswered(null);
  };

  const partLabel = item ? c(item.part) : "";
  const partCount = item ? queue.filter((q) => q.part === item.part).length : 0;
  const partIndex = item ? queue.slice(0, idx + 1).filter((q) => q.part === item.part).length : 0;

  return (
    <div className="min-h-screen px-5 py-8 sm:px-10 lg:px-20" style={{ background: "linear-gradient(180deg, #0f172a 0%, #020617 100%)" }}>
      <div className="mx-auto max-w-3xl space-y-6">
        <button onClick={onBack} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-white/75 hover:text-white">
          <ArrowLeft className="h-4 w-4" /> {c("backToLesson")}
        </button>
        <header>
          <p className="text-xs font-bold text-gold">{lesson.level} · {c("coreTitle")}</p>
          <h1 className="mt-1 text-2xl font-black text-white sm:text-3xl" lang="de">{lesson.icon} {lesson.titleDe}</h1>
          <p className="text-white/70">{lesson.title}</p>
          <p className="mt-3 rounded-xl border border-amber-300/25 bg-amber-400/[0.06] p-3 text-xs leading-relaxed text-amber-100">{c("statusLegacy")}</p>
        </header>

        {phase === "intro" && (
          <>
            <section className={card} aria-labelledby="core-goals">
              <h2 id="core-goals" className={h2}>{c("goals")}</h2>
              <ul className="space-y-1.5 text-sm text-white/85">
                <li className="flex gap-2"><Target className="mt-0.5 h-4 w-4 shrink-0 text-gold" />{c("goalPhrases", { topic: lesson.titleDe })}</li>
                <li className="flex gap-2"><Target className="mt-0.5 h-4 w-4 shrink-0 text-gold" />{c("goalPractice", { n: plan.practice.length, k: plan.checkpoint.length })}</li>
                {plan.mistakes.length > 0 && <li className="flex gap-2"><Target className="mt-0.5 h-4 w-4 shrink-0 text-gold" />{c("goalMistakes")}</li>}
              </ul>
            </section>

            {plan.phrases.length > 0 && (
              <section className={card} aria-labelledby="core-phrases">
                <h2 id="core-phrases" className={h2}>{c("phrases")}</h2>
                <ul className="divide-y divide-white/[0.06]">
                  {plan.phrases.map((ph, i) => (
                    <li key={i} className="flex items-center gap-3 py-2.5">
                      <AudioButton id={`${lesson.id}-core-p${i}`} text={ph.de} toggle={toggle} activeId={activeId} playState={playState} />
                      <p className="font-semibold text-white" lang="de">{ph.de}</p>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {plan.mistakes.length > 0 && (
              <section className={card} aria-labelledby="core-mistakes">
                <h2 id="core-mistakes" className={h2}>{t("deutschTrainer.lessonView.commonMistakes")}</h2>
                <ul className="space-y-2">
                  {plan.mistakes.map((m, i) => (
                    <li key={i} className="rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3 text-sm" lang="de">
                      <p className="text-red-300"><span aria-hidden>✗ </span><span className="sr-only">{c("wrongForm")}: </span>{m.wrong}</p>
                      <p className="mt-0.5 text-emerald-300"><span aria-hidden>✓ </span><span className="sr-only">{c("rightForm")}: </span>{m.correct}</p>
                      <p className="mt-1 text-xs text-white/65">{m.tip}</p>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <div className="flex flex-wrap gap-2">
              {canResume ? (
                <>
                  <Button className="min-h-11" onClick={() => start(saved!.step, saved!.correct)}>{c("continue", { i: saved!.step + 1, n: main.length })}</Button>
                  <Button className="min-h-11" variant="outline" onClick={() => { update((s) => clearResume(s, lesson.id)); start(0); }}>{c("restart")}</Button>
                </>
              ) : (
                <Button className="min-h-11" onClick={() => start(0)} disabled={main.length === 0}>{c("startPractice")}</Button>
              )}
            </div>
            <p className="text-[11px] text-white/55">{c("localNote")}</p>
          </>
        )}

        {phase === "run" && item && (
          <section className={card} aria-live="polite">
            <div className="mb-4">
              <p className="mb-2 text-xs font-bold text-white/70">{c("step", { label: partLabel, i: partIndex, n: partCount })}</p>
              <div className="h-2 w-full overflow-hidden rounded-full bg-white/[0.08]" role="progressbar" aria-valuemin={0} aria-valuemax={queue.length} aria-valuenow={idx + 1} aria-label={c("progressLabel")}>
                <div className="h-full rounded-full bg-gold transition-all" style={{ width: `${((idx + 1) / queue.length) * 100}%` }} />
              </div>
            </div>
            <LegacyExercise key={`${item.part}-${item.ref.key}`} id={`${item.part}-${item.ref.key}`} exercise={item.ref.exercise} onAnswer={onAnswer} />
            {answered !== null && (
              <Button className="mt-4 min-h-11 w-full sm:w-auto" onClick={next}>{idx + 1 >= queue.length ? c("finish") : t("deutschTrainer.lessonView.next")}</Button>
            )}
          </section>
        )}

        {phase === "done" && (
          <section className={card}>
            <h2 className={`${h2} flex items-center gap-2`}><CheckCircle2 className="h-5 w-5 text-emerald-300" />{c("doneTitle")}</h2>
            <p className="text-sm text-white/85">{c("doneBody", { c: correct, n: main.length })}</p>
            <p className="mt-2 text-sm text-white/75">{missed.length > 0 ? c("reviewScheduled", { n: missed.length }) : c("noneScheduled")}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button className="min-h-11" onClick={onExtra}>{c("toExtra")}</Button>
              <Button className="min-h-11" variant="outline" onClick={() => start(0)}><RotateCcw className="mr-1 h-4 w-4" />{c("restart")}</Button>
              <Button className="min-h-11" variant="ghost" onClick={onBack}>{c("backToLesson")}</Button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
