import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Trophy, Flame, Star, Lock, GraduationCap } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { LEVELS, LEVEL_COLORS, getLessonsForLevel, getLessonById, type Level, type Lesson } from "@/lib/deutsch-trainer-data";
import { useTrainerProgress } from "@/hooks/useTrainerProgress";
import { usePremiumAccess } from "@/hooks/usePremiumAccess";
import TrainerLesson from "@/components/trainer/TrainerLesson";
import { navigateBackOrHome } from "@/lib/navigation";

export default function DeutschTrainer() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const demo = params.get("demo") === "1";

  const [selectedLevel, setSelectedLevel] = useState<Level>("A1");
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(() => {
    if (demo) {
      const first = getLessonsForLevel("A1")[0];
      return first ?? null;
    }
    return null;
  });

  const { progress } = useTrainerProgress();
  const { isPremium } = usePremiumAccess();

  const levelLessons = getLessonsForLevel(selectedLevel);
  const xpForNextLevel = progress.level * 100;
  const xpInLevel = progress.xp % 100;

  if (activeLesson) {
    return <TrainerLesson lesson={activeLesson} onBack={() => setActiveLesson(null)} />;
  }

  return (
    <>
      {/* Header */}
      <section className="border-b bg-primary py-8">
        <div className="container max-w-2xl">
          <button onClick={() => navigateBackOrHome(navigate)} className="mb-4 flex items-center gap-1.5 text-sm text-primary-foreground/60 hover:text-primary-foreground">
            <ArrowLeft className="h-4 w-4" /> Zurück
          </button>
          <div className="flex items-center gap-3">
            <GraduationCap className="h-8 w-8 text-gold" />
            <div>
              <h1 className="text-xl font-black text-primary-foreground sm:text-2xl">Deutsch Trainer</h1>
              <p className="text-sm text-primary-foreground/70">Deutsch für das echte Leben</p>
            </div>
          </div>
        </div>
      </section>

      <div className="container max-w-2xl py-6">
        {/* Stats */}
        <div className="mb-6 grid grid-cols-3 gap-3">
          <div className="flex flex-col items-center gap-1 rounded-xl border bg-card p-4">
            <Trophy className="h-6 w-6 text-gold" />
            <span className="text-lg font-black">{progress.xp}</span>
            <span className="text-[11px] text-muted-foreground">XP</span>
          </div>
          <div className="flex flex-col items-center gap-1 rounded-xl border bg-card p-4">
            <Flame className="h-6 w-6 text-destructive" />
            <span className="text-lg font-black">{progress.streak}</span>
            <span className="text-[11px] text-muted-foreground">Streak</span>
          </div>
          <div className="flex flex-col items-center gap-1 rounded-xl border bg-card p-4">
            <Star className="h-6 w-6 text-primary" />
            <span className="text-lg font-black">Lvl {progress.level}</span>
            <span className="text-[11px] text-muted-foreground">Level</span>
          </div>
        </div>

        {/* XP Progress */}
        <div className="mb-8">
          <div className="mb-1.5 flex justify-between text-xs text-muted-foreground">
            <span>Level {progress.level}</span>
            <span>{xpInLevel}/{xpForNextLevel} XP</span>
          </div>
          <Progress value={(xpInLevel / xpForNextLevel) * 100} className="h-3 rounded-full" />
        </div>

        {/* Level tabs */}
        <div className="mb-6 flex gap-2 overflow-x-auto pb-1">
          {LEVELS.map((lvl) => (
            <button
              key={lvl}
              onClick={() => setSelectedLevel(lvl)}
              className={`shrink-0 rounded-full px-5 py-2 text-sm font-bold transition-all ${
                selectedLevel === lvl
                  ? "text-primary-foreground shadow-md"
                  : "border border-border bg-card text-muted-foreground hover:bg-muted"
              }`}
              style={selectedLevel === lvl ? { backgroundColor: LEVEL_COLORS[lvl] } : undefined}
            >
              {lvl}
            </button>
          ))}
        </div>

        {/* Lessons */}
        <div className="flex flex-col gap-3">
          {levelLessons.length === 0 && (
            <p className="py-10 text-center text-sm text-muted-foreground">
              Lektionen für {selectedLevel} kommen bald! 🚧
            </p>
          )}
          {levelLessons.map((lesson) => {
            const completed = progress.completedLessons.includes(lesson.id);
            const locked = lesson.premium && !isPremium;

            return (
              <motion.button
                key={lesson.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => !locked && setActiveLesson(lesson)}
                disabled={locked}
                className={`group flex items-center gap-4 rounded-2xl border p-5 text-left transition-all ${
                  locked
                    ? "cursor-not-allowed border-border bg-muted/50 opacity-60"
                    : "border-border bg-card hover:border-primary/30 hover:shadow-md"
                }`}
              >
                <span className="text-3xl">{lesson.icon}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold">{lesson.titleDe}</h3>
                    {completed && (
                      <span className="rounded-full bg-[hsl(var(--success)/0.1)] px-2 py-0.5 text-[10px] font-bold text-[hsl(var(--success))]">✓</span>
                    )}
                    {locked && <Lock className="h-3.5 w-3.5 text-muted-foreground" />}
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">{lesson.title} · 5 Aufgaben</p>
                </div>
                {locked && (
                  <span className="rounded-full bg-gold/10 px-3 py-1 text-[10px] font-bold text-gold-dark">Premium</span>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Daily exercise CTA */}
        <div className="mt-8">
          <Button
            onClick={() => {
              const free = levelLessons.find((l) => !l.premium || isPremium);
              if (free) setActiveLesson(free);
            }}
            className="h-12 w-full rounded-xl bg-gold text-sm font-bold text-gold-foreground shadow-[0_4px_20px_rgba(255,204,0,0.3)] hover:bg-gold-light"
          >
            🎯 Tägliche Übung starten
          </Button>
        </div>
      </div>
    </>
  );
}
