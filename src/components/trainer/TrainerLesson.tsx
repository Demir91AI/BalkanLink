import { useState, useCallback, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { BreadcrumbItem } from "@/components/navigation/SectionHeader";
import { ArrowRight, ArrowLeft, AlertTriangle, Lock, Crown, Volume2, Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import type { Lesson, Exercise } from "@/lib/deutsch-trainer-data";
import { XP_PER_CORRECT, shuffleExercise } from "@/lib/deutsch-trainer-data";
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
import { useLanguage } from "@/contexts/LanguageContext";

const FREE_PHRASE_LIMIT = 5;
const TOTAL_PHRASES = 500;

const EXERCISES_PER_STAGE = 100;
const FREE_STAGE_COUNTS = [50, 50, 50] as const;
const LOCKED_STAGE_COUNTS = FREE_STAGE_COUNTS.map(
  (free) => EXERCISES_PER_STAGE - free
) as unknown as readonly [number, number, number];

const STAGE_KEYS = ["stage_grundlagen", "stage_anwendung", "stage_realitaet"] as const;
const STAGE_TYPES = ["Grundlagen", "Anwendung", "Realitaet"] as const;

interface Props {
  lesson: Lesson;
  onBack: () => void;
}

export default function TrainerLesson({ lesson, onBack }: Props) {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [selectedStage, setSelectedStage] = useState<number | null>(null);
  const [step, setStep] = useState(0);
  const [results, setResults] = useState<boolean[]>([]);
  const [answered, setAnswered] = useState(false);
  const { progress, addXp, completeLesson } = useTrainerProgress();
  const { toggle, activeId, playState, rate, setRate, RATE_OPTIONS } = useTTS();
  const { isPremium } = useSubscription();
  const { generate, loading: aiLoading, error: aiError } = useGeneratedExercises();

  const [aiExercises, setAiExercises] = useState<Exercise[]>([]);
  const [useAi, setUseAi] = useState(false);

  const exerciseCount = EXERCISES_PER_STAGE;

  // Translated stage labels
  const stageLabels = STAGE_KEYS.map((key) => t(key));

  useEffect(() => {
    if (selectedStage === null) {
      setAiExercises([]);
      setUseAi(false);
      return;
    }
    const stage = lesson.stages[selectedStage];
    const staticExercises = stage?.exercises ?? [];
    if (staticExercises.length >= exerciseCount) {
      setUseAi(false);
      return;
    }
    setUseAi(true);
    const stageType = STAGE_TYPES[selectedStage] || "Grundlagen";
    generate(lesson.level, lesson.title, stageType, exerciseCount).then((generated) => {
      if (generated.length > 0) {
        setAiExercises([...staticExercises, ...generated].slice(0, exerciseCount));
      } else {
        setAiExercises(staticExercises);
      }
    });
  }, [selectedStage, lesson, exerciseCount, generate]);

  const stage = selectedStage !== null ? lesson.stages[selectedStage] : null;

  const exercises = useMemo(() => {
    if (selectedStage === null) return [];
    if (useAi && aiExercises.length > 0) {
      return aiExercises.map((ex) => shuffleExercise(ex));
    }
    const staticEx = stage?.exercises ?? [];
    return staticEx.map((ex) => shuffleExercise(ex));
  }, [selectedStage, useAi, aiExercises, stage]);

  const total = exercises.length;
  const done = step >= total && total > 0;
  const exercise = !done ? exercises[step] : null;
  const correctCount = results.filter(Boolean).length;

  const handleAnswer = useCallback((correct: boolean) => {
    setResults((r) => [...r, correct]);
    setAnswered(true);
    if (correct) addXp(XP_PER_CORRECT);
  }, [addXp]);

  const handleNext = () => {
    setAnswered(false);
    if (step + 1 >= total) completeLesson(lesson.id);
    setStep((s) => s + 1);
  };

  const handleBack = () => {
    if (step > 0 && !answered) {
      setStep((s) => s - 1);
      setResults((r) => r.slice(0, -1));
    } else if (selectedStage !== null) {
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
  };

  // Build breadcrumbs based on current depth
  const buildBreadcrumbs = (): BreadcrumbItem[] => {
    const crumbs: BreadcrumbItem[] = [
      { label: t("home"), onClick: () => navigate("/") },
      { label: t("title"), onClick: () => { onBack(); } },
      { label: lesson.level, onClick: () => { onBack(); } },
    ];

    if (selectedStage === null) {
      crumbs.push({ label: lesson.titleDe });
    } else {
      crumbs.push({ label: lesson.titleDe, onClick: () => {
        setSelectedStage(null);
        setStep(0);
        setResults([]);
        setAnswered(false);
      }});
      crumbs.push({ label: stageLabels[selectedStage] });
    }

    return crumbs;
  };

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

          {/* Stage cards */}
          <div className="mb-8 flex flex-col gap-3 max-w-2xl">
            {stageLabels.map((label, idx) => (
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
              rateOptions={RATE_OPTIONS}
            />
          </div>

          {/* Common Mistakes */}
          {lesson.commonMistakes.length > 0 && (
            <div className="max-w-2xl rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5">
              <div className="mb-3 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-orange-400" />
                <h3 className="text-sm font-bold text-white/80">{t("typical_mistakes")}</h3>
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

  // ── LOADING AI EXERCISES ──
  if (aiLoading && exercises.length === 0) {
    return (
      <div
        className="relative min-h-screen flex items-center justify-center"
        style={{ background: "linear-gradient(180deg, #0f172a 0%, #020617 100%)" }}
      >
        <div className="flex flex-col items-center">
          <Loader2 className="mb-3 h-8 w-8 animate-spin text-blue-400" />
          <p className="text-sm font-medium text-white/50">{t("generating_tasks")}</p>
        </div>
      </div>
    );
  }

  if (!aiLoading && total === 0) {
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
            subtitle={stageLabels[selectedStage]}
            icon={<span className="text-2xl">{lesson.icon}</span>}
          />
          <div className="mx-auto max-w-lg rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 text-center">
            <AlertTriangle className="mx-auto mb-3 h-7 w-7 text-orange-400" />
            <h3 className="text-base font-bold text-white">Vježbe trenutno nisu dostupne</h3>
            <p className="mt-2 text-sm text-white/60">
              {aiError || "Došlo je do privremenog problema pri generisanju zadataka. Pokušaj ponovo za nekoliko sekundi."}
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
              Nazad na faze
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // ── LESSON COMPLETE ──
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
            subtitle={stageLabels[selectedStage]}
            icon={<span className="text-2xl">{lesson.icon}</span>}
          />
          <div className="max-w-lg mx-auto">
            <LessonComplete
              correctCount={correctCount}
              totalCount={total}
              xpEarned={correctCount * XP_PER_CORRECT}
              streak={progress.streak}
              onRestart={handleRestart}
              onBack={() => {
                setSelectedStage(null);
                setStep(0);
                setResults([]);
                setAnswered(false);
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  // ── EXERCISE VIEW ──
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
          subtitle={stageLabels[selectedStage]}
          icon={<span className="text-2xl">{lesson.icon}</span>}
        />

        {/* Exercise progress bar */}
        <div className="max-w-lg mx-auto">
          <div className="mb-4 flex items-center gap-2">
            <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold text-primary-foreground ${
              selectedStage === 0 ? "bg-[hsl(var(--success))]" : selectedStage === 1 ? "bg-gold" : "bg-primary"
            }`}>
              {stageLabels[selectedStage]}
            </span>
            <div className="flex-1">
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: "linear-gradient(90deg, #3b82f6, #06b6d4)" }}
                  initial={{ width: 0 }}
                  animate={{ width: `${((step + 1) / total) * 100}%` }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </div>
            </div>
            <span className="text-xs font-bold text-white/40">{step + 1}/{total}</span>
          </div>

          <div className="mb-3 rounded-xl bg-white/[0.04] px-4 py-3 border border-white/[0.06]">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-blue-400/70">Situation</p>
            <p className="mt-0.5 text-sm font-medium text-white/80">{exercise!.situation}</p>
          </div>

          <h3 className="mb-5 text-base font-bold leading-snug text-white/90">{exercise!.question}</h3>

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
                {exercise!.explanation}
              </div>
              <Button onClick={handleNext} className="h-12 rounded-xl font-bold text-white" style={{ background: "linear-gradient(135deg, #3b82f6, #06b6d4)" }}>
                {t("next")} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
