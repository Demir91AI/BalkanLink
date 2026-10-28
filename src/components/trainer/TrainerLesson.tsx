import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import AuthGate from "@/components/AuthGate";
import type { BreadcrumbItem } from "@/components/navigation/SectionHeader";
import { ArrowRight, ArrowLeft, AlertTriangle, Lock, Crown, Loader2, RotateCcw } from "lucide-react";
import type { Lesson, Exercise } from "@/lib/deutsch-trainer-data";
import { shuffleExercise } from "@/lib/deutsch-trainer-data";
import MultipleChoice from "./MultipleChoice";
import SortSentence from "./SortSentence";
import FillBlank from "./FillBlank";
import QuickReaction from "./QuickReaction";
import LessonComplete from "./LessonComplete";
import { useTrainerProgress } from "@/hooks/useTrainerProgress";
import { useTTS } from "@/hooks/useTTS";
import { useSubscription } from "@/hooks/useSubscription";
import AudioButton from "./AudioButton";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useGeneratedExercises } from "@/hooks/useGeneratedExercises";
import LockedContentOverlay from "./LockedContentOverlay";
import StageCard from "./StageCard";
import SprachassistentSection from "./SprachassistentSection";
import SectionHeader from "@/components/navigation/SectionHeader";
import CoreLessonView from "./core/CoreLessonView";
import PilotLessonView from "./pilot/PilotLessonView";
import { buildCorePlan } from "@/lib/trainer/core/core-plan";
import { getStandardizedFor } from "@/lib/trainer/core/authored-lessons";
import { useLearningState } from "@/hooks/useLearningState";

// ─── KONSTANTE ───────────────────────────────────
const EXERCISES_PER_STAGE = 500;
const FREE_EXERCISES_PER_STAGE = 50;
const FREE_PHRASE_LIMIT = 3;
const TOTAL_PHRASES = 500;
const BATCH_SIZE = 15;
const PRELOAD_THRESHOLD = 10;

const FREE_STAGE_COUNTS = [FREE_EXERCISES_PER_STAGE, FREE_EXERCISES_PER_STAGE, FREE_EXERCISES_PER_STAGE] as const;
const LOCKED_STAGE_COUNTS = FREE_STAGE_COUNTS.map(
  (free) => EXERCISES_PER_STAGE - free
) as unknown as readonly [number, number, number];

const STAGE_TYPES = ["Grundlagen", "Anwendung", "Realitaet"] as const;
const STAGE_LABEL_KEYS = ["basics", "application", "reality"] as const;

interface Props {
  lesson: Lesson;
  onBack: () => void;
  /** Controlled stage from URL (null = stage picker view) */
  stage?: number | null;
  /** Called when stage changes — parent should sync URL */
  onStageChange?: (stage: number | null) => void;
  /** Core 10–15 min lesson open (URL `core=1`) */
  core?: boolean;
  onCoreChange?: (open: boolean) => void;
}

// In-progress mid-lesson resume logic intentionally removed.
// Only completed lessons persist (via useTrainerProgress).

export default function TrainerLesson({ lesson, onBack, stage: controlledStage, onStageChange, core = false, onCoreChange }: Props) {
  const { t } = useTranslation("pages");
  const navigate = useNavigate();
  const STAGE_LABELS = STAGE_LABEL_KEYS.map(k => t(`deutschTrainer.stages.${k}`)) as readonly string[];
  const [internalStage, setInternalStage] = useState<number | null>(null);
  const isControlled = controlledStage !== undefined;
  const selectedStage = isControlled ? controlledStage : internalStage;
  const setSelectedStage = useCallback((s: number | null | ((prev: number | null) => number | null)) => {
    const next = typeof s === "function" ? s(selectedStage) : s;
    if (isControlled) onStageChange?.(next);
    else setInternalStage(next);
  }, [isControlled, onStageChange, selectedStage]);
  const [step, setStep] = useState(0);
  const [results, setResults] = useState<boolean[]>([]);
  const [answered, setAnswered] = useState(false);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [stageComplete, setStageComplete] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);
  const loadingRef = useRef(false);

  const { completeLesson } = useTrainerProgress();
  const { toggle, activeId, playState, rate, setRate, SPEED_OPTIONS } = useTTS();
  const { isPremium } = useSubscription();
  const { generate, error: aiError } = useGeneratedExercises();

  const maxExercises = isPremium ? EXERCISES_PER_STAGE : FREE_EXERCISES_PER_STAGE;
  const plan = useMemo(() => buildCorePlan(lesson), [lesson]);
  const standardized = useMemo(() => getStandardizedFor(lesson.id), [lesson.id]);
  const { state: learning } = useLearningState();
  const [coreOpenLocal, setCoreOpenLocal] = useState(false);
  const coreOpen = onCoreChange ? core : coreOpenLocal;
  const setCoreOpen = (v: boolean) => (onCoreChange ? onCoreChange(v) : setCoreOpenLocal(v));

  // ─── Učitaj exercises za odabrani stage ──────────
  useEffect(() => {
    if (selectedStage === null) {
      setExercises([]);
      setStep(0);
      setResults([]);
      setAnswered(false);
      setStageComplete(false);
      setInitialLoading(false);
      return;
    }

    const stage = lesson.stages[selectedStage];
    const stageType = STAGE_TYPES[selectedStage] || "Grundlagen";
    const staticEx = (stage?.exercises ?? []).map(shuffleExercise);

    // Always start fresh — no mid-lesson resume
    setExercises(staticEx);
    setStep(0);
    setResults([]);
    setAnswered(false);
    setStageComplete(false);

    if (staticEx.length === 0) setInitialLoading(true);
    loadMore(staticEx, stageType);
  }, [selectedStage, lesson]);


  // ─── Generiši više pitanja ──────────────────────
  const loadMore = useCallback(async (
    current: Exercise[],
    stageType: string
  ) => {
    if (loadingRef.current) return;
    if (current.length >= maxExercises) return;

    loadingRef.current = true;
    setIsLoadingMore(true);

    try {
      const needed = maxExercises - current.length;
      const batchCount = Math.min(BATCH_SIZE, needed);
      const dailySeed = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
      const uniqueKey = `${lesson.title}_${dailySeed}_${current.length}`;

      const generated = await generate(
        lesson.level, uniqueKey, stageType, batchCount
      );

      if (generated.length > 0) {
        setExercises(prev => {
          const combined = [
            ...prev,
            ...generated.map(shuffleExercise)
          ].slice(0, maxExercises);
          return combined;
        });
      }
    } finally {
      loadingRef.current = false;
      setIsLoadingMore(false);
      setInitialLoading(false);
    }
  }, [lesson, generate, maxExercises]);

  // ─── Preload kad se približimo kraju ───────────
  useEffect(() => {
    if (selectedStage === null) return;
    if (exercises.length === 0) return;
    if (exercises.length >= maxExercises) return;

    const remaining = exercises.length - step;
    if (remaining <= PRELOAD_THRESHOLD && !loadingRef.current) {
      const stageType = STAGE_TYPES[selectedStage] || "Grundlagen";
      loadMore(exercises, stageType);
    }
  }, [step, exercises.length, selectedStage, maxExercises]);

  const currentExercise = exercises[step] ?? null;
  const total = Math.min(exercises.length, maxExercises);
  const done = step >= total && total > 0 && !stageComplete;

  const handleAnswer = useCallback((correct: boolean) => {
    setResults(r => [...r, correct]);
    setAnswered(true);
  }, []);

  const handleNext = () => {
    setAnswered(false);

    // Check if this was the last exercise
    if (step + 1 >= maxExercises || step + 1 >= exercises.length) {
      completeLesson(lesson.id);
      setStageComplete(true);
      return;
    }

    setStep(s => s + 1);
  };

  const handleBack = () => {
    if (stageComplete) {
      setSelectedStage(null);
      setStageComplete(false);
      return;
    }
    // Back never rewinds individual questions — always exit the stage.
    if (selectedStage !== null) {
      setSelectedStage(null);
      setStep(0);
      setResults([]);
      setAnswered(false);
    } else {
      onBack();
    }
  };

  const handleRestart = () => {
    setStep(0);
    setResults([]);
    setAnswered(false);
    setStageComplete(false);
    setExercises([]);
    if (selectedStage !== null) {
      const stageType = STAGE_TYPES[selectedStage] || "Grundlagen";
      const stage = lesson.stages[selectedStage];
      const staticEx = (stage?.exercises ?? []).map(shuffleExercise);
      setExercises(staticEx);
      loadMore(staticEx, stageType);
    }
  };

  const correctCount = results.filter(Boolean).length;
  const accuracy = results.length > 0
    ? Math.round((correctCount / results.length) * 100)
    : 0;

  // Build breadcrumbs
  const buildBreadcrumbs = (): BreadcrumbItem[] => {
    const crumbs: BreadcrumbItem[] = [
      { label: t("deutschTrainer.brand"), onClick: () => { onBack(); } },
      { label: lesson.level, onClick: () => { onBack(); } },
    ];
    if (selectedStage === null) {
      crumbs.push({ label: lesson.titleDe });
    } else {
      crumbs.push({
        label: lesson.titleDe, onClick: () => {
          setSelectedStage(null);
          setStep(0);
          setResults([]);
          setAnswered(false);
        }
      });
      crumbs.push({ label: STAGE_LABELS[selectedStage] });
    }
    return crumbs;
  };

  // ── CORE LESSON (10–15 min) ──
  if (selectedStage === null && coreOpen) {
    return standardized
      ? <PilotLessonView key={standardized.id} lesson={standardized} onBack={() => setCoreOpen(false)} />
      : <CoreLessonView key={lesson.id} lesson={lesson} plan={plan} onBack={() => setCoreOpen(false)} onExtra={() => setCoreOpen(false)} />;
  }

  // ── STAGE PICKER ──
  if (selectedStage === null) {
    return (
      <div
        className="relative min-h-screen"
        style={{ background: "linear-gradient(180deg, #0f172a 0%, #020617 100%)" }}
      >
        <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(59,130,246,0.10) 0%, transparent 70%)" }} />
        <div className="relative z-10 px-5 sm:px-10 lg:px-20 py-8">
          <SectionHeader
            onBack={onBack}
            breadcrumbs={buildBreadcrumbs()}
            title={lesson.titleDe}
            subtitle={lesson.title}
            icon={<span className="text-2xl">{lesson.icon}</span>}
          />

          {/* Core lesson */}
          <section aria-labelledby="core-card-title" className="mb-8 max-w-2xl rounded-2xl border border-gold/30 bg-white/[0.04] p-5">
            <p className="text-xs font-bold text-gold">{lesson.level} · {t("deutschTrainer.core.minutes")}</p>
            <h2 id="core-card-title" className="mt-1 text-lg font-bold text-white">{t("deutschTrainer.core.coreTitle")}</h2>
            <p className="mt-1 text-sm text-white/75">{t("deutschTrainer.core.coreIntro")}</p>
            <p className={`mt-3 rounded-lg border p-2.5 text-xs leading-relaxed ${standardized ? "border-emerald-300/30 bg-emerald-400/[0.06] text-emerald-100" : "border-amber-300/25 bg-amber-400/[0.06] text-amber-100"}`}>
              {standardized ? t("deutschTrainer.core.statusStandardized") : t("deutschTrainer.core.statusLegacy")}
            </p>
            <Button className="mt-4 min-h-11 w-full sm:w-auto" onClick={() => setCoreOpen(true)}>
              {!standardized && learning.resume[lesson.id]
                ? t("deutschTrainer.core.continue", { i: learning.resume[lesson.id].step + 1, n: plan.practice.length + plan.checkpoint.length })
                : t("deutschTrainer.core.start")}
            </Button>
          </section>

          <h2 className="mb-1 text-base font-bold text-white">{t("deutschTrainer.core.extraTitle")}</h2>
          <p className="mb-4 max-w-2xl text-sm text-white/65">{t("deutschTrainer.core.extraIntro")}</p>

          {/* Stage cards (optional extra practice — unchanged permissions) */}
          <div className="mb-8 flex flex-col gap-3 max-w-2xl">
            {STAGE_LABELS.map((label, idx) => (
              <StageCard
                key={idx}
                label={label}
                index={idx}
                freeCount={FREE_STAGE_COUNTS[idx]}
                lockedCount={LOCKED_STAGE_COUNTS[idx]}
                isPremium={isPremium}
                onSelect={() => setSelectedStage(idx)}
                onUpgrade={() => navigate("/deutsch-trainer/preise")}
              />
            ))}
          </div>

          {/* Sprachassistent */}
          <div className="max-w-2xl mb-8">
            <SprachassistentSection
              lesson={lesson}
              isPremium={isPremium}
              freePhraseLimit={FREE_PHRASE_LIMIT}
              totalPhrases={TOTAL_PHRASES}
              toggle={toggle}
              activeId={activeId}
              playState={playState}
              onUpgrade={() => navigate("/deutsch-trainer/preise")}
              rate={rate}
              setRate={setRate}
              rateOptions={SPEED_OPTIONS}
            />
          </div>

          {/* Common Mistakes */}
          {lesson.commonMistakes.length > 0 && (
            <div className="max-w-2xl rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5">
              <div className="mb-3 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-orange-400" />
                <h3 className="text-sm font-bold text-white/80">{t("deutschTrainer.lessonView.commonMistakes")}</h3>
              </div>
              <div className="flex flex-col gap-2">
                {lesson.commonMistakes.map((m, i) => (
                  <div key={i} className="rounded-xl bg-white/[0.03] border border-white/[0.05] px-4 py-3 text-xs">
                    <p className="text-red-400"><span className="font-bold">✗</span> {m.wrong}</p>
                    <p className="text-emerald-400 mt-0.5"><span className="font-bold">✓</span> {m.correct}</p>
                    <p className="mt-1 text-[10px] text-white/35">{m.tip}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── STAGE COMPLETE ──
  if (stageComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4"
        style={{ background: "linear-gradient(180deg, #0f172a 0%, #020617 100%)" }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-sm text-center"
        >
          <div className="text-6xl mb-4">
            {accuracy >= 80 ? "🏆" : accuracy >= 60 ? "👍" : "📚"}
          </div>
          <h2 className="text-2xl font-black text-white mb-2">
            {t("deutschTrainer.lessonView.stageCompleted", { stage: STAGE_LABELS[selectedStage] })}
          </h2>
          <p className="text-white/60 mb-6">
            {t("deutschTrainer.lessonView.answerStats", { correct: correctCount, total: results.length, pct: accuracy })}
          </p>

          <div className="space-y-3">
            {selectedStage < 2 && (
              <Button
                className="w-full rounded-xl bg-[hsl(var(--gold))] text-white font-bold h-12"
                onClick={() => {
                  setSelectedStage(selectedStage + 1);
                  setStageComplete(false);
                }}
              >
                {t("deutschTrainer.lessonView.nextStagePrefix")} {STAGE_LABELS[selectedStage + 1]}
              </Button>
            )}

            <Button
              variant="outline"
              className="w-full rounded-xl border-white/20 text-white/70 hover:text-white h-11"
              onClick={() => {
                setSelectedStage(null);
                setStageComplete(false);
              }}
            >
              {t("deutschTrainer.lessonView.backToLesson")}
            </Button>

            <button
              onClick={handleRestart}
              className="text-sm text-white/40 hover:text-white/70 transition-colors"
            >
              <RotateCcw className="inline h-3.5 w-3.5 mr-1" />
              {t("deutschTrainer.lessonView.restart")}
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // ── LOADING ──
  if (initialLoading && exercises.length === 0) {
    return (
      <div
        className="relative min-h-screen flex items-center justify-center"
        style={{ background: "linear-gradient(180deg, #0f172a 0%, #020617 100%)" }}
      >
        <div className="flex flex-col items-center">
          <Loader2 className="mb-3 h-8 w-8 animate-spin text-blue-400" />
          <p className="text-sm font-medium text-white/50">{t("deutschTrainer.lessonView.preparingExercises")}</p>
        </div>
      </div>
    );
  }

  // ── NO EXERCISES ──
  if (!initialLoading && exercises.length === 0) {
    return (
      <div
        className="relative min-h-screen"
        style={{ background: "linear-gradient(180deg, #0f172a 0%, #020617 100%)" }}
      >
        <div className="relative z-10 px-5 sm:px-10 lg:px-20 py-8">
          <SectionHeader
            onBack={handleBack}
            breadcrumbs={buildBreadcrumbs()}
            title={lesson.titleDe}
            subtitle={STAGE_LABELS[selectedStage]}
            icon={<span className="text-2xl">{lesson.icon}</span>}
          />
          <div className="mx-auto max-w-lg rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 text-center">
            <AlertTriangle className="mx-auto mb-3 h-7 w-7 text-orange-400" />
            <h3 className="text-base font-bold text-white">{t("deutschTrainer.lessonView.exercisesUnavailable")}</h3>
            <p className="mt-2 text-sm text-white/60">
              {aiError || t("deutschTrainer.lessonView.exercisesError")}
            </p>
            <Button
              onClick={() => {
                setSelectedStage(null);
                setStep(0);
                setResults([]);
                setAnswered(false);
              }}
              className="mt-4 h-11 rounded-xl font-bold text-white"
              style={{ background: "linear-gradient(135deg, #3b82f6, #06b6d4)" }}
            >
              {t("deutschTrainer.lessonView.backToStages")}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // ── LESSON COMPLETE (all exercises done without stageComplete) ──
  if (done) {
    return (
      <div
        className="relative min-h-screen"
        style={{ background: "linear-gradient(180deg, #0f172a 0%, #020617 100%)" }}
      >
        <div className="relative z-10 px-5 sm:px-10 lg:px-20 py-8">
          <SectionHeader
            onBack={() => {
              setSelectedStage(null);
              setStep(0);
              setResults([]);
              setAnswered(false);
            }}
            breadcrumbs={buildBreadcrumbs()}
            title={lesson.titleDe}
            subtitle={STAGE_LABELS[selectedStage]}
            icon={<span className="text-2xl">{lesson.icon}</span>}
          />
          <div className="max-w-lg mx-auto">
            <LessonComplete
              correctCount={correctCount}
              totalCount={total}
              onRestart={handleRestart}
              onBack={() => {
                setSelectedStage(null);
                setStep(0);
                setResults([]);
                setAnswered(false);
              }}
              nextStageLabel={selectedStage < 2 
                ? STAGE_LABELS[selectedStage + 1] 
                : undefined}
              onNextStage={selectedStage < 2 
                ? () => setSelectedStage(selectedStage + 1) 
                : undefined}
            />
          </div>
        </div>
      </div>
    );
  }

  // ── EXERCISE VIEW ──
  const exercise = currentExercise;
  const renderExercise = () => {
    if (!exercise) return null;
    const key = `${lesson.id}-${selectedStage}-${step}`;
    switch (exercise.type) {
      case "multiple_choice":
        return <MultipleChoice key={key} exercise={exercise} onAnswer={handleAnswer} />;
      case "sort_sentence":
        return <SortSentence key={key} exercise={exercise} onAnswer={handleAnswer} />;
      case "fill_blank":
        return <FillBlank key={key} exercise={exercise} onAnswer={handleAnswer} />;
      case "quick_reaction":
        return <QuickReaction key={key} exercise={exercise} onAnswer={handleAnswer} />;
    }
  };

  return (
    <div
      className="relative min-h-screen"
      style={{ background: "linear-gradient(180deg, #0f172a 0%, #020617 100%)" }}
    >
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(59,130,246,0.08) 0%, transparent 70%)" }} />
      <div className="relative z-10 px-5 sm:px-10 lg:px-20 py-8">
        <SectionHeader
          onBack={handleBack}
          breadcrumbs={buildBreadcrumbs()}
          title={lesson.titleDe}
          subtitle={STAGE_LABELS[selectedStage]}
          icon={<span className="text-2xl">{lesson.icon}</span>}
        />

        {/* Exercise progress bar */}
        <div className="max-w-lg mx-auto">
          <div className="mb-4 flex items-center gap-2">
            <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold text-primary-foreground ${
              selectedStage === 0 ? "bg-[hsl(var(--success))]" : selectedStage === 1 ? "bg-gold" : "bg-primary"
            }`}>
              {STAGE_LABELS[selectedStage]}
            </span>
            <div className="flex-1">
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: "linear-gradient(90deg, #3b82f6, #06b6d4)" }}
                  initial={{ width: 0 }}
                  animate={{ width: `${((step + 1) / maxExercises) * 100}%` }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </div>
            </div>
            <span className="text-xs font-bold text-white/40">
              {step + 1}/{maxExercises}
              {isLoadingMore && (
                <Loader2 className="inline h-3 w-3 ml-1 animate-spin" />
              )}
            </span>
          </div>


          {exercise && (
            <>
              <div className="mb-3 rounded-xl bg-white/[0.04] px-4 py-3 border border-white/[0.06]">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-blue-400/70">{t("deutschTrainer.lessonView.situation")}</p>
                <p className="mt-0.5 text-sm font-medium text-white/80">{exercise.situation}</p>
              </div>

              <h3 className="mb-5 text-base font-bold leading-snug text-white/90">{exercise.question}</h3>

              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.25 }}
                >
                  {renderExercise()}
                </motion.div>
              </AnimatePresence>

              {answered && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 flex flex-col gap-3">
                  <div className={`rounded-xl p-3 text-sm font-medium ${
                    results[results.length - 1]
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : "bg-red-500/10 text-red-400 border border-red-500/20"
                  }`}>
                    {exercise.explanation}
                  </div>
                  <Button
                    onClick={handleNext}
                    className="h-12 rounded-xl font-bold text-white"
                    style={{ background: "linear-gradient(135deg, #3b82f6, #06b6d4)" }}
                  >
                    {step + 1 >= maxExercises || step + 1 >= exercises.length
                      ? t("deutschTrainer.lessonView.finishStage")
                      : t("deutschTrainer.lessonView.next")}
                    {step + 1 < maxExercises && step + 1 < exercises.length && (
                      <ArrowRight className="ml-2 h-4 w-4" />
                    )}
                  </Button>
                </motion.div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
