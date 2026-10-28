import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowLeft, CheckCircle2, Lightbulb, RotateCcw, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import AudioButton from "@/components/trainer/AudioButton";
import { useTTS } from "@/hooks/useTTS";
import { AudioStatusNotice, DialoguePlayer, SpeedToggle } from "@/components/trainer/audio/AudioPlayerParts";
import { useTrainerProgress } from "@/hooks/useTrainerProgress";
import {
  buildQueue, checkAnswer, pilotLocale,
  type PilotExercise, type PilotLesson,
} from "@/lib/trainer/pilot/a1-pilot-lessons";

/** Deterministic shuffle (stable per id) so options never reveal the answer by position. */
function stableShuffle<T>(arr: T[], seed: string): T[] {
  let h = 0; for (const c of seed) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { h = (h * 1103515245 + 12345) >>> 0; const j = h % (i + 1); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

const card = "rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5";
const h2 = "mb-3 text-lg font-bold text-white";
const chip = "rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors";

export default function PilotLessonView({ lesson, onBack }: { lesson: PilotLesson; onBack: () => void }) {
  const { t, i18n } = useTranslation("pages");
  const loc = pilotLocale(i18n.language);
  const p = (k: string, o?: Record<string, unknown>) => t(`deutschTrainer.pilot.${k}`, o);
  const { toggle, stop, activeId, playState, rate, setRate, usingFallback, audioError } = useTTS();
  const { completeLesson } = useTrainerProgress();

  const [phase, setPhase] = useState<"learn" | "practice" | "done">("learn");
  const [missed, setMissed] = useState<string[]>([]);
  const queue = useMemo(() => buildQueue(lesson.exercises, missed), [lesson, missed]);
  const [idx, setIdx] = useState(0);
  const [value, setValue] = useState<unknown>(undefined);
  const [result, setResult] = useState<null | boolean>(null);
  const [showHint, setShowHint] = useState(false);
  const [firstTry, setFirstTry] = useState(0);

  const ex = queue[idx];
  const isReview = ex?.id.endsWith("#review");

  const reset = () => { setValue(undefined); setResult(null); setShowHint(false); };
  const check = () => {
    const ok = checkAnswer(ex, value);
    setResult(ok);
    if (!isReview) { if (ok) setFirstTry((n) => n + 1); else setMissed((m) => [...m, ex.id]); }
  };
  const next = () => {
    if (idx + 1 >= queue.length) { completeLesson(lesson.id); setPhase("done"); return; }
    setIdx(idx + 1); reset();
  };
  const restart = () => { setMissed([]); setIdx(0); setFirstTry(0); reset(); setPhase("learn"); };

  const audio = (id: string, text: string) => (
    <AudioButton id={`${lesson.id}-${id}`} text={text} toggle={toggle} activeId={activeId} playState={playState} className={activeId === `${lesson.id}-${id}` ? undefined : "bg-gold/15 text-gold hover:bg-gold/25"} />
  );

  return (
    <div className="min-h-screen px-5 py-8 sm:px-10 lg:px-20" style={{ background: "linear-gradient(180deg, #0f172a 0%, #020617 100%)" }}>
      <div className="mx-auto max-w-3xl space-y-6">
        <button onClick={onBack} className="inline-flex items-center gap-2 text-sm font-semibold text-white/70 hover:text-white">
          <ArrowLeft className="h-4 w-4" /> {p("back")}
        </button>
        <header>
          <p className="text-xs font-bold text-gold">A1 · {p("minutes", { n: lesson.minutes })}</p>
          <h1 className="mt-1 text-2xl font-black text-white sm:text-3xl">{lesson.icon} {lesson.titleDe}</h1>
          {loc !== "de" && <p className="text-white/70">{lesson.title[loc]}</p>}
          <p className="mt-3 text-sm leading-relaxed text-white/75">{lesson.scenario[loc]}</p>
        </header>

        {phase === "learn" && (
          <>
            <div className="flex flex-wrap items-center gap-3">
              <SpeedToggle rate={rate} setRate={setRate} />
            </div>
            <AudioStatusNotice usingFallback={usingFallback} audioError={audioError} />
            <section className={card} aria-labelledby="obj">
              <h2 id="obj" className={h2}>{p("objectives")}</h2>
              <ul className="space-y-1.5">
                {lesson.objectives.map((o, i) => <li key={i} className="flex gap-2 text-sm text-white/85"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" />{o[loc]}</li>)}
              </ul>
            </section>

            <section className={card} aria-labelledby="voc">
              <h2 id="voc" className={h2}>{p("vocab")}</h2>
              <ul className="divide-y divide-white/[0.06]">
                {lesson.vocab.map((v, i) => {
                  const word = v.article ? `${v.article} ${v.de}` : v.de;
                  return (
                    <li key={i} className="flex items-center gap-3 py-2.5">
                      {audio(`v${i}`, word)}
                      <div className="min-w-0">
                        <p className="font-semibold text-white">{word}</p>
                        <p className="text-xs text-white/65">{v.tr[loc]}{v.plural && ` · ${p("plural")}: ${v.plural}`}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>

            <section className={card} aria-labelledby="dia">
              <h2 id="dia" className={h2}>{p("dialogue")}</h2>
              <DialoguePlayer idPrefix={lesson.id} lines={lesson.dialogue.map((d) => ({ speaker: d.speaker, de: d.de, tr: d.tr[loc] }))}
                toggle={toggle} stop={stop} activeId={activeId} playState={playState} />
              <p className="mt-4 text-[11px] text-white/50">{p("translationNote")}</p>
            </section>

            <section className={card} aria-labelledby="gr">
              <h2 id="gr" className={h2}>{p("grammar")}: {lesson.grammar.title[loc]}</h2>
              <p className="text-sm leading-relaxed text-white/85">{lesson.grammar.body[loc]}</p>
              <ul className="mt-3 space-y-1.5">
                {lesson.grammar.examples.map((e, i) => (
                  <li key={i} className="text-sm"><span className="font-semibold text-white" lang="de">{e.de}</span> <span className="text-white/60">— {e.tr[loc]}</span></li>
                ))}
              </ul>
            </section>

            <Button className="w-full sm:w-auto" onClick={() => setPhase("practice")}>{p("startExercises")}</Button>
          </>
        )}

        {phase === "practice" && ex && (
          <section className={card} aria-live="polite">
            <p className="mb-3 text-xs font-bold text-white/60">
              {isReview ? `${p("review")} · ` : ""}{p("exercise", { i: idx + 1, n: queue.length })}
            </p>
            <ExerciseBody ex={ex} loc={loc} value={value} setValue={setValue} locked={result !== null} p={p} />
            {showHint && <p className="mt-3 flex gap-2 text-sm text-gold"><Lightbulb className="h-4 w-4 shrink-0" />{ex.hint[loc]}</p>}
            {result !== null && (
              <div className={`mt-4 rounded-xl border p-3 text-sm ${result ? "border-emerald-400/40 bg-emerald-500/10 text-emerald-200" : "border-red-400/40 bg-red-500/10 text-red-200"}`}>
                <p className="flex items-center gap-2 font-bold">{result ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}{result ? p("correct") : p("wrong")}</p>
                {!result && <p className="mt-1">{p("answerIs", { a: answerText(ex) })}</p>}
                {"explain" in ex && <p className="mt-1 text-white/80">{ex.explain[loc]}</p>}
              </div>
            )}
            <div className="mt-4 flex flex-wrap gap-2">
              {result === null ? (
                <>
                  <Button onClick={check} disabled={!isReady(ex, value)}>{p("check")}</Button>
                  {!showHint && <Button variant="outline" onClick={() => setShowHint(true)}>{p("hint")}</Button>}
                  <Button variant="ghost" onClick={() => setValue(undefined)}>{p("reset")}</Button>
                </>
              ) : <Button onClick={next}>{p("next")}</Button>}
            </div>
          </section>
        )}

        {phase === "done" && (
          <section className={card}>
            <h2 className={h2}>{p("finishTitle")}</h2>
            <p className="text-sm text-white/85">{p("finishBody", { c: firstTry, n: lesson.exercises.length })}</p>
            <p className="mt-2 text-xs text-emerald-300">{p("saved")}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button onClick={restart} variant="outline"><RotateCcw className="mr-1 h-4 w-4" />{p("retry")}</Button>
              <Button onClick={onBack}>{p("back")}</Button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export function isReady(ex: PilotExercise, value: unknown): boolean {
  if (value === undefined) return false;
  if (ex.kind === "order") return (value as string[]).length === ex.words.length;
  if (ex.kind === "match") return ex.pairs.every((x) => (value as Record<string, string>)[x.de]);
  return true;
}

function answerText(ex: PilotExercise): string {
  if (ex.kind === "gap") return ex.sentence.replace("___", ex.answer);
  if (ex.kind === "choice") return ex.options[ex.answer];
  if (ex.kind === "order") return ex.answer;
  return ex.pairs.map((x) => x.de).join(", ");
}

function ExerciseBody({ ex, loc, value, setValue, locked, p }: {
  ex: PilotExercise; loc: ReturnType<typeof pilotLocale>; value: unknown; setValue: (v: unknown) => void; locked: boolean;
  p: (k: string) => string;
}) {
  const sel = (on: boolean) => `${chip} ${on ? "border-gold bg-gold/20 text-white" : "border-white/15 bg-white/[0.04] text-white/85 hover:border-white/30"}`;
  if (ex.kind === "gap") return (
    <div>
      <p className="mb-3 text-lg font-semibold text-white" lang="de">{ex.sentence.replace("___", (value as string) ?? "___")}</p>
      <div className="flex flex-wrap gap-2">{stableShuffle(ex.options, ex.id).map((o) => <button key={o} disabled={locked} aria-pressed={value === o} className={sel(value === o)} onClick={() => setValue(o)} lang="de">{o}</button>)}</div>
    </div>
  );
  if (ex.kind === "choice") return (
    <div>
      {ex.promptDe && <p className="mb-1 text-lg font-semibold text-white" lang="de">„{ex.promptDe}“</p>}
      <p className="mb-3 text-sm text-white/80">{ex.prompt[loc]}</p>
      <div className="flex flex-col gap-2">{ex.options.map((o, i) => <button key={o} disabled={locked} aria-pressed={value === i} className={`${sel(value === i)} text-left`} onClick={() => setValue(i)} lang="de">{o}</button>)}</div>
    </div>
  );
  if (ex.kind === "order") {
    const picked = (value as string[] | undefined) ?? [];
    return (
      <div>
        <p className="mb-2 text-sm text-white/70">{p("orderHelp")}</p>
        <p className="mb-3 min-h-[2rem] rounded-lg border border-dashed border-white/20 px-3 py-2 text-lg font-semibold text-white" lang="de">{picked.join(" ") || "…"}</p>
        <div className="flex flex-wrap gap-2">{ex.words.map((w) => (
          <button key={w} disabled={locked || picked.includes(w)} className={sel(false) + " disabled:opacity-30"} lang="de"
            onClick={() => setValue([...picked, w])}>{w}</button>
        ))}</div>
      </div>
    );
  }
  // match: value = Record<pairDe, chosenDe>
  const m = (value as Record<string, string> | undefined) ?? {};
  const choices = stableShuffle(ex.pairs.map((x) => x.de), ex.id);
  return (
    <div>
      <p className="mb-3 text-sm text-white/70">{p("matchHelp")}</p>
      <ul className="space-y-3">{ex.pairs.map((pair) => (
        <li key={pair.de}>
          <p className="mb-1 text-sm font-semibold text-white/90">{pair.tr[loc]}</p>
          <div className="flex flex-wrap gap-1.5">{choices.map((c) => (
            <button key={c} disabled={locked} aria-pressed={m[pair.de] === c} className={sel(m[pair.de] === c)} lang="de"
              onClick={() => setValue({ ...m, [pair.de]: c })}>{c}</button>
          ))}</div>
        </li>
      ))}</ul>
    </div>
  );
}
