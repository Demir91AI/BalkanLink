import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Trophy, Flame, Star, Lock, GraduationCap, CheckCircle2, X, Crown } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { LEVELS, LEVEL_COLORS, getLessonsForLevel, FREE_LESSONS_PER_LEVEL, type Level, type Lesson } from "@/lib/deutsch-trainer-data";
import { useTrainerProgress } from "@/hooks/useTrainerProgress";
import { usePremiumAccess } from "@/hooks/usePremiumAccess";
import TrainerLesson from "@/components/trainer/TrainerLesson";
import { navigateBackOrHome } from "@/lib/navigation";

const ULTIMATE_PRICES: Record<string, string> = {
  "A1": "19,99 €", "A2": "19,99 €",
  "B1": "29,99 €", "B2": "29,99 €",
  "C1": "39,99 €", "C2": "39,99 €",
};

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
  const [showPaywall, setShowPaywall] = useState(false);

  const { progress } = useTrainerProgress();
  const { isPremium } = usePremiumAccess();

  const levelLessons = getLessonsForLevel(selectedLevel);
  const xpForNextLevel = progress.level * 100;
  const xpInLevel = progress.xp % 100;

  const completedInLevel = levelLessons.filter((l) =>
    progress.completedLessons.includes(l.id)
  ).length;

  const freeLessons = levelLessons.slice(0, FREE_LESSONS_PER_LEVEL);
  const lockedLessons = levelLessons.slice(FREE_LESSONS_PER_LEVEL);

  const handleLessonClick = (lesson: Lesson, isLocked: boolean) => {
    if (isLocked && !isPremium) {
      setShowPaywall(true);
    } else {
      setActiveLesson(lesson);
    }
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
        {/* Stats */}
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
              onClick={() => setSelectedLevel(lvl)}
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
        <div className="mb-5 rounded-xl border bg-card px-4 py-3">
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

        {/* ── FREE SECTION ── */}
        <div className="mb-6">
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded-full bg-[hsl(var(--success)/0.1)] px-3 py-0.5 text-[11px] font-bold text-[hsl(var(--success))]">
              Kostenlos
            </span>
            <span className="text-[11px] text-muted-foreground">{freeLessons.length} Lektionen</span>
          </div>
          <div className="flex flex-col gap-2">
            {freeLessons.map((lesson, idx) => {
              const completed = progress.completedLessons.includes(lesson.id);
              return (
                <motion.button
                  key={lesson.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(idx * 0.025, 0.2) }}
                  onClick={() => handleLessonClick(lesson, false)}
                  className={`group flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all ${
                    completed
                      ? "border-[hsl(var(--success)/0.3)] bg-[hsl(var(--success)/0.03)] hover:shadow-sm"
                      : "border-border bg-card hover:border-primary/30 hover:shadow-sm"
                  }`}
                >
                  <span className="text-2xl leading-none">{lesson.icon}</span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-xs font-bold leading-tight">{lesson.titleDe}</h3>
                      {completed && <CheckCircle2 className="h-3.5 w-3.5 text-[hsl(var(--success))]" />}
                    </div>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">
                      {lesson.title} · {lesson.exercises.length} Aufgaben
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* ── LOCKED SECTION ── */}
        {lockedLessons.length > 0 && (
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="rounded-full bg-muted px-3 py-0.5 text-[11px] font-bold text-muted-foreground">
                <Lock className="mr-1 inline h-3 w-3" />
                Gesperrt
              </span>
              <span className="text-[11px] text-muted-foreground">{lockedLessons.length} Lektionen</span>
            </div>
            <div className="flex flex-col gap-2">
              {lockedLessons.slice(0, 6).map((lesson, idx) => (
                <motion.button
                  key={lesson.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(idx * 0.025, 0.15) }}
                  onClick={() => handleLessonClick(lesson, true)}
                  className="group flex items-center gap-3 rounded-xl border border-border/50 bg-muted/40 px-4 py-3 text-left opacity-60 transition-all hover:opacity-80"
                >
                  <span className="text-2xl leading-none grayscale">{lesson.icon}</span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-xs font-bold leading-tight text-muted-foreground">{lesson.titleDe}</h3>
                      <Lock className="h-3 w-3 text-muted-foreground/60" />
                    </div>
                    <p className="mt-0.5 text-[11px] text-muted-foreground/60">
                      {lesson.title} · {lesson.exercises.length} Aufgaben
                    </p>
                  </div>
                </motion.button>
              ))}
              {lockedLessons.length > 6 && (
                <p className="py-2 text-center text-[11px] text-muted-foreground">
                  + {lockedLessons.length - 6} weitere Lektionen
                </p>
              )}
            </div>

            {/* Upgrade CTA */}
            <div className="mt-4 rounded-xl border border-gold/20 bg-gold/5 p-5 text-center">
              <Crown className="mx-auto mb-1.5 h-6 w-6 text-gold" />
              <p className="text-xl font-black">Einmalig ab 19,99 €</p>
              <p className="mt-1 text-xs font-medium text-foreground/80">
                Dauerhafter Zugriff auf alle Lektionen
              </p>
              <p className="mt-0.5 text-[10px] text-muted-foreground">
                Kein Abo – keine monatlichen Kosten
              </p>
              <Button
                onClick={() => navigate("/deutsch-trainer/preise")}
                className="mt-3 h-10 rounded-full bg-gold px-6 text-xs font-bold text-gold-foreground shadow-[0_4px_20px_rgba(255,204,0,0.3)] hover:bg-gold-light"
              >
                Jetzt freischalten
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Paywall Modal */}
      <AnimatePresence>
        {showPaywall && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={() => setShowPaywall(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-sm rounded-2xl border-2 border-gold/30 bg-card p-6 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowPaywall(false)}
                className="absolute right-3 top-3 rounded-full p-1 text-muted-foreground hover:bg-muted"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="text-center">
                <Crown className="mx-auto mb-3 h-10 w-10 text-gold" />
                <h2 className="text-base font-black">Weitere Lektionen freischalten</h2>
                <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                  Du hast die kostenlosen Lektionen abgeschlossen. Schalte jetzt alle Inhalte frei und trainiere Deutsch für echte Situationen.
                </p>
                <p className="mt-3 text-2xl font-black text-gold-dark">
                  {ULTIMATE_PRICES[selectedLevel]}
                  <span className="ml-1 text-xs font-normal text-muted-foreground">/ einmalig</span>
                </p>
                <Button
                  onClick={() => { setShowPaywall(false); navigate("/deutsch-trainer/preise"); }}
                  className="mt-4 h-11 w-full rounded-xl bg-gold text-sm font-bold text-gold-foreground shadow-[0_4px_20px_rgba(255,204,0,0.3)] hover:bg-gold-light"
                >
                  Jetzt freischalten
                </Button>
                <button
                  onClick={() => setShowPaywall(false)}
                  className="mt-2 text-xs text-muted-foreground hover:underline"
                >
                  Später entscheiden
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
