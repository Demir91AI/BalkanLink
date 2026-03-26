import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Volume2, BookOpen, AlertTriangle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import type { Lesson } from "@/lib/deutsch-trainer-data";
import { XP_PER_CORRECT, STAGE_LABELS, shuffleExercise } from "@/lib/deutsch-trainer-data";
import MultipleChoice from "./MultipleChoice";
import SortSentence from "./SortSentence";
import FillBlank from "./FillBlank";
import QuickReaction from "./QuickReaction";
import LessonComplete from "./LessonComplete";
import { useTrainerProgress } from "@/hooks/useTrainerProgress";
import { useTTS } from "@/hooks/useTTS";
import AudioButton from "./AudioButton";
import { Button } from "@/components/ui/button";

interface Props {
  lesson: Lesson;
  onBack: () => void;
}

export default function TrainerLesson({ lesson, onBack }: Props) {
  const [selectedStage, setSelectedStage] = useState<number | null>(null);
  const [step, setStep] = useState(0);
  const [results, setResults] = useState<boolean[]>([]);
  const [answered, setAnswered] = useState(false);
  const { progress, addXp, completeLesson } = useTrainerProgress();
  const { speak } = useTTS();

  const stage = selectedStage !== null ? lesson.stages[selectedStage] : null;
  const exercises = useMemo(
    () => stage?.exercises.map((ex) => shuffleExercise(ex)) ?? [],
    [stage]
  );
  const total = exercises.length;
  const done = step >= total;
  const exercise = !done ? exercises[step] : null;
  const correctCount = results.filter(Boolean).length;

  const handleAnswer = useCallback((correct: boolean) => {
    setResults((r) => [...r, correct]);
    setAnswered(true);
    if (correct) addXp(XP_PER_CORRECT);
  }, [addXp]);

  const handleNext = () => {
    setAnswered(false);
    if (step + 1 >= total) {
      completeLesson(lesson.id);
    }
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

        {/* Stage buttons */}
        <div className="mb-6 flex flex-col gap-2">
          {lesson.stages.map((s, idx) => (
            <motion.button
              key={idx}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => setSelectedStage(idx)}
              className="flex items-center gap-3 rounded-xl border bg-card px-4 py-3.5 text-left transition-all hover:border-primary/30 hover:shadow-sm"
            >
              <span className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm font-black text-primary-foreground ${
                idx === 0 ? "bg-[hsl(var(--success))]" : idx === 1 ? "bg-gold" : "bg-primary"
              }`}>
                {idx + 1}
              </span>
              <div className="flex-1">
                <h3 className="text-sm font-bold">{s.label}</h3>
                <p className="text-[11px] text-muted-foreground">{s.exercises.length} Aufgaben</p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </motion.button>
          ))}
        </div>

        {/* Important Phrases */}
        {lesson.importantPhrases.length > 0 && (
          <div className="mb-4 rounded-xl border bg-card p-4">
            <div className="mb-2 flex items-center gap-1.5">
              <BookOpen className="h-4 w-4 text-primary" />
              <h3 className="text-xs font-bold">Wichtige Sätze</h3>
            </div>
            <div className="flex flex-col gap-2">
              {lesson.importantPhrases.map((phrase, i) => (
                <div key={i} className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2">
                  <button
                    onClick={() => speak(phrase.de)}
                    className="shrink-0 rounded-full bg-primary/10 p-1.5 text-primary hover:bg-primary/20"
                  >
                    <Volume2 className="h-3.5 w-3.5" />
                  </button>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold">{phrase.de}</p>
                    <p className="text-[10px] text-muted-foreground">{phrase.context}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

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
      {/* Header */}
      <div className="mb-2 flex items-center gap-2">
        <button onClick={handleBack} className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold text-primary-foreground ${
          selectedStage === 0 ? "bg-[hsl(var(--success))]" : selectedStage === 1 ? "bg-gold" : "bg-primary"
        }`}>
          {stage!.label}
        </span>
        <div className="flex-1">
          <Progress value={((step + 1) / total) * 100} className="h-2.5 rounded-full" />
        </div>
        <span className="text-xs font-bold text-muted-foreground">{step + 1}/{total}</span>
      </div>

      {/* Situation badge */}
      <div className="mb-3 rounded-lg bg-primary/5 px-4 py-2.5 border border-primary/10">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary/70">Situation</p>
        <p className="mt-0.5 text-sm font-medium">{exercise!.situation}</p>
      </div>

      {/* Question */}
      <h3 className="mb-5 text-base font-bold leading-snug">{exercise!.question}</h3>

      {/* Exercise */}
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

      {/* Feedback + Next */}
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
