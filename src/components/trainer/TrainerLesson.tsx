import { useState, useCallback, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
import { usePremiumAccess } from "@/hooks/usePremiumAccess";
import AudioButton from "./AudioButton";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useGeneratedExercises } from "@/hooks/useGeneratedExercises";
import LockedContentOverlay from "./LockedContentOverlay";
import StageCard from "./StageCard";
import SprachassistentSection from "./SprachassistentSection";

const FREE_PHRASE_LIMIT = 5;
const TOTAL_PHRASES = 100;

const EXERCISES_PER_STAGE = 100;
/** Free users: 30 per stage, Ultimate: 100 per stage */
const FREE_STAGE_COUNTS = [30, 30, 30] as const;
const LOCKED_STAGE_COUNTS = FREE_STAGE_COUNTS.map(
  (free) => EXERCISES_PER_STAGE - free
) as unknown as readonly [number, number, number];

const STAGE_LABELS_MAP = ["Grundlagen", "Anwendung", "Realität"] as const;
const STAGE_TYPES = ["Grundlagen", "Anwendung", "Realitaet"] as const;

interface Props {
  lesson: Lesson;
  onBack: () => void;
}

export default function TrainerLesson({ lesson, onBack }: Props) {
  const navigate = useNavigate();
  const [selectedStage, setSelectedStage] = useState<number | null>(null);
  const [step, setStep] = useState(0);
  const [results, setResults] = useState<boolean[]>([]);
  const [answered, setAnswered] = useState(false);
  const { progress, addXp, completeLesson } = useTrainerProgress();
  const { toggle, activeId, playState } = useTTS();
  const { isPremium } = usePremiumAccess();
  const { generate, loading: aiLoading } = useGeneratedExercises();

  const [aiExercises, setAiExercises] = useState<Exercise[]>([]);
  const [useAi, setUseAi] = useState(false);

  const exerciseCount = EXERCISES_PER_STAGE;

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

  // ── STAGE PICKER ──
  if (selectedStage === null) {
    return (
      <div className="mx-auto w-full max-w-lg px-4 py-6">
        <button onClick={onBack} className="mb-4 flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Zurück
        </button>

        <div className="mb-5 flex items-center gap-3">
          <span className="text-3xl">{lesson.icon}</span>
          <div>
            <h2 className="text-base font-black">{lesson.titleDe}</h2>
            <p className="text-xs text-muted-foreground">{lesson.title}</p>
          </div>
        </div>

        {/* Stage cards */}
        <div className="mb-6 flex flex-col gap-2">
          {STAGE_LABELS_MAP.map((label, idx) => (
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
        <SprachassistentSection
          lesson={lesson}
          isPremium={isPremium}
          freePhraseLimit={FREE_PHRASE_LIMIT}
          totalPhrases={TOTAL_PHRASES}
          toggle={toggle}
          activeId={activeId}
          playState={playState}
          onUpgrade={() => navigate("/deutsch-trainer/preise")}
        />

        {/* Common Mistakes */}
        {lesson.commonMistakes.length > 0 && (
          <div className="rounded-xl border bg-card p-4">
            <div className="mb-2 flex items-center gap-1.5">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              <h3 className="text-xs font-bold">Typische Fehler</h3>
            </div>
            <div className="flex flex-col gap-2">
              {lesson.commonMistakes.map((m, i) => (
                <div key={i} className="rounded-lg bg-destructive/5 px-3 py-2 text-xs">
                  <p><span className="font-bold text-destructive">✗</span> {m.wrong}</p>
                  <p><span className="font-bold text-[hsl(var(--success))]">✓</span> {m.correct}</p>
                  <p className="mt-0.5 text-[10px] text-muted-foreground">{m.tip}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // ── LOADING AI EXERCISES ──
  if (aiLoading && exercises.length === 0) {
    return (
      <div className="mx-auto flex w-full max-w-lg flex-col items-center justify-center px-4 py-20">
        <Loader2 className="mb-3 h-8 w-8 animate-spin text-primary" />
        <p className="text-sm font-medium text-muted-foreground">Aufgaben werden generiert…</p>
      </div>
    );
  }

  // ── LESSON COMPLETE ──
  if (done) {
    return (
      <div className="mx-auto w-full max-w-lg px-4 py-6">
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
    <div className="mx-auto flex w-full max-w-lg flex-col px-4 py-6">
      <div className="mb-2 flex items-center gap-2">
        <button onClick={handleBack} className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold text-primary-foreground ${
          selectedStage === 0 ? "bg-[hsl(var(--success))]" : selectedStage === 1 ? "bg-gold" : "bg-primary"
        }`}>
          {STAGE_LABELS_MAP[selectedStage]}
        </span>
        <div className="flex-1">
          <Progress value={((step + 1) / total) * 100} className="h-2.5 rounded-full" />
        </div>
        <span className="text-xs font-bold text-muted-foreground">{step + 1}/{total}</span>
      </div>

      <div className="mb-3 rounded-lg bg-primary/5 px-4 py-2.5 border border-primary/10">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary/70">Situation</p>
        <p className="mt-0.5 text-sm font-medium">{exercise!.situation}</p>
      </div>

      <h3 className="mb-5 text-base font-bold leading-snug">{exercise!.question}</h3>

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
              ? "bg-[hsl(var(--success)/0.08)] text-[hsl(var(--success))]"
              : "bg-destructive/5 text-destructive"
          }`}>
            {exercise!.explanation}
          </div>
          <Button onClick={handleNext} className="h-12 rounded-xl bg-primary font-bold text-primary-foreground">
            Weiter <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      )}
    </div>
  );
}
