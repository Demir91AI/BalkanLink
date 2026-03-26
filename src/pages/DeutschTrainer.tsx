import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Trophy, Flame, Star, Lock, GraduationCap, CheckCircle2, ChevronRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { LEVELS, LEVEL_COLORS, getLessonsForLevel, FREE_LESSONS_PER_LEVEL, type Level, type Lesson } from "@/lib/deutsch-trainer-data";
import { useTrainerProgress } from "@/hooks/useTrainerProgress";
import { usePremiumAccess } from "@/hooks/usePremiumAccess";
import TrainerLesson from "@/components/trainer/TrainerLesson";
import { navigateBackOrHome } from "@/lib/navigation";

const PAGE_SIZE = 8;

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
  const [page, setPage] = useState(0);

  const { progress } = useTrainerProgress();
  const { isPremium } = usePremiumAccess();

  const levelLessons = getLessonsForLevel(selectedLevel);
  const xpForNextLevel = progress.level * 100;
  const xpInLevel = progress.xp % 100;

  const completedInLevel = levelLessons.filter((l) =>
    progress.completedLessons.includes(l.id)
  ).length;

  // Pagination
  const totalPages = Math.ceil(levelLessons.length / PAGE_SIZE);
  const visibleLessons = levelLessons.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  // Reset page when level changes
  const handleLevelChange = (lvl: Level) => {
    setSelectedLevel(lvl);
    setPage(0);
  };

  if (activeLesson) {
    return <TrainerLesson lesson={activeLesson} onBack={() => setActiveLesson(null)} />;
  }

  return (
    <>
      {/* Header */}
      <section className="border-b bg-primary py-6">
        <div className="container max-w-2xl">
          <button onClick={() => navigateBackOrHome(navigate)} className="mb-3 flex items-center gap-1.5 text-sm text-primary-foreground/60 hover:text-primary-foreground">
            <ArrowLeft className="h-4 w-4" /> Zurück
          </button>
          <div className="flex items-center gap-3">
            <GraduationCap className="h-7 w-7 text-gold" />
            <div>
              <h1 className="text-lg font-black text-primary-foreground sm:text-xl">Deutsch Trainer</h1>
              <p className="text-xs text-primary-foreground/70">Deutsch für das echte Leben</p>
            </div>
          </div>
        </div>
      </section>

      <div className="container max-w-2xl py-5">
        {/* Stats row */}
        <div className="mb-4 grid grid-cols-3 gap-2">
          {[
            { icon: <Trophy className="h-5 w-5 text-gold" />, value: progress.xp, label: "XP" },
            { icon: <Flame className="h-5 w-5 text-destructive" />, value: progress.streak, label: "Streak" },
            { icon: <Star className="h-5 w-5 text-primary" />, value: `Lvl ${progress.level}`, label: "Level" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-0.5 rounded-xl border bg-card px-3 py-3">
              {s.icon}
              <span className="text-base font-black">{s.value}</span>
              <span className="text-[10px] text-muted-foreground">{s.label}</span>
            </div>
          ))}
        </div>

        {/* XP bar */}
        <div className="mb-5">
          <div className="mb-1 flex justify-between text-[11px] text-muted-foreground">
            <span>Level {progress.level}</span>
            <span>{xpInLevel}/{xpForNextLevel} XP</span>
          </div>
          <Progress value={(xpInLevel / xpForNextLevel) * 100} className="h-2.5 rounded-full" />
        </div>

        {/* Level tabs */}
        <div className="mb-3 flex gap-1.5 overflow-x-auto pb-1">
          {LEVELS.map((lvl) => (
            <button
              key={lvl}
              onClick={() => handleLevelChange(lvl)}
              className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
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

        {/* Level progress */}
        <div className="mb-4 rounded-xl border bg-card px-4 py-3">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold">{selectedLevel} Fortschritt</span>
            <span className="text-[11px] text-muted-foreground">
              {completedInLevel}/{levelLessons.length} Lektionen
            </span>
          </div>
          <Progress
            value={levelLessons.length > 0 ? (completedInLevel / levelLessons.length) * 100 : 0}
            className="h-2 rounded-full"
          />
        </div>

        {/* Lessons – compact cards, max PAGE_SIZE visible */}
        <div className="flex flex-col gap-2">
          {visibleLessons.map((lesson, idx) => {
            const globalIdx = page * PAGE_SIZE + idx;
            const completed = progress.completedLessons.includes(lesson.id);
            const locked = globalIdx >= FREE_LESSONS_PER_LEVEL && !isPremium;

            return (
              <motion.button
                key={lesson.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(idx * 0.025, 0.2) }}
                onClick={() => !locked && setActiveLesson(lesson)}
                disabled={locked}
                className={`group flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all ${
                  locked
                    ? "cursor-not-allowed border-border bg-muted/50 opacity-60"
                    : completed
                    ? "border-[hsl(var(--success)/0.3)] bg-[hsl(var(--success)/0.03)] hover:shadow-sm"
                    : "border-border bg-card hover:border-primary/30 hover:shadow-sm"
                }`}
              >
                <span className="text-2xl leading-none">{lesson.icon}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-xs font-bold leading-tight">{lesson.titleDe}</h3>
                    {completed && <CheckCircle2 className="h-3.5 w-3.5 text-[hsl(var(--success))]" />}
                    {locked && <Lock className="h-3 w-3 text-muted-foreground" />}
                  </div>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">
                    {lesson.title} · {lesson.exercises.length} Aufgaben
                  </p>
                </div>
                {locked && (
                  <span className="shrink-0 rounded-full bg-muted px-2.5 py-0.5 text-[9px] font-bold text-muted-foreground">
                    Gesperrt
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-3 flex items-center justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`h-7 w-7 rounded-full text-xs font-bold transition-all ${
                  page === i
                    ? "bg-primary text-primary-foreground shadow"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}

        {/* Upgrade CTA for locked lessons */}
        {levelLessons.some((_, i) => i >= FREE_LESSONS_PER_LEVEL) && !isPremium && (
          <div className="mt-5 rounded-xl border border-gold/20 bg-gold/5 p-5 text-center">
            <p className="text-sm font-bold mb-0.5">🔓 Upgrade erforderlich</p>
            <p className="text-xs text-muted-foreground mb-3">
              Schalte alle {levelLessons.length} Lektionen frei
            </p>
            <Button
              onClick={() => navigate("/deutsch-trainer/preise")}
              className="h-10 rounded-full bg-gold px-6 text-xs font-bold text-gold-foreground shadow-[0_4px_20px_rgba(255,204,0,0.3)] hover:bg-gold-light"
            >
              Paket wählen
            </Button>
          </div>
        )}

        {/* Daily exercise CTA */}
        <div className="mt-4">
          <Button
            onClick={() => {
              const available = levelLessons.filter((_, i) => i < FREE_LESSONS_PER_LEVEL || isPremium);
              const incomplete = available.find((l) => !progress.completedLessons.includes(l.id));
              if (incomplete) setActiveLesson(incomplete);
              else if (available[0]) setActiveLesson(available[0]);
            }}
            className="h-11 w-full rounded-xl bg-gold text-xs font-bold text-gold-foreground shadow-[0_4px_20px_rgba(255,204,0,0.3)] hover:bg-gold-light"
          >
            🎯 Tägliche Übung starten
          </Button>
        </div>
      </div>
    </>
  );
}
