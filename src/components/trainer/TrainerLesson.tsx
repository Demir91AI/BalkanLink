import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import type { Lesson } from "@/lib/deutsch-trainer-data";
import { XP_PER_CORRECT } from "@/lib/deutsch-trainer-data";
import MultipleChoice from "./MultipleChoice";
import SortSentence from "./SortSentence";
import FillBlank from "./FillBlank";
import QuickReaction from "./QuickReaction";
import LessonComplete from "./LessonComplete";
import { useTrainerProgress } from "@/hooks/useTrainerProgress";
import { Button } from "@/components/ui/button";

interface Props {
  lesson: Lesson;
  onBack: () => void;
}

export default function TrainerLesson({ lesson, onBack }: Props) {
  const [step, setStep] = useState(0);
  const [results, setResults] = useState<boolean[]>([]);
  const [answered, setAnswered] = useState(false);
  const { progress, addXp, completeLesson } = useTrainerProgress();

  const total = lesson.exercises.length;
  const done = step >= total;
  const exercise = !done ? lesson.exercises[step] : null;
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
      // Go back to previous exercise (re-do it)
      setStep((s) => s - 1);
      setResults((r) => r.slice(0, -1));
    } else {
      onBack();
    }
  };

  const handleRestart = () => {
    setStep(0);
    setResults([]);
    setAnswered(false);
  };

  if (done) {
    return (
      <div className="mx-auto w-full max-w-lg px-4 py-6">
        <LessonComplete
          correctCount={correctCount}
          totalCount={total}
          xpEarned={correctCount * XP_PER_CORRECT}
          streak={progress.streak}
          onRestart={handleRestart}
          onBack={onBack}
        />
      </div>
    );
  }

  const renderExercise = () => {
    if (!exercise) return null;
    const key = `${lesson.id}-${step}`;
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
      <div className="mb-6 flex items-center gap-3">
        <button onClick={handleBack} className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-5 w-5" />
        </button>
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
