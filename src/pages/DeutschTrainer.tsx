import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Trophy, Flame, Star, Lock, GraduationCap, CheckCircle2, X, Crown, ChevronLeft, ChevronRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { LEVELS, LEVEL_COLORS, getLessonsForLevel, FREE_LESSONS_PER_LEVEL, type Level, type Lesson } from "@/lib/deutsch-trainer-data";
import { useTrainerProgress } from "@/hooks/useTrainerProgress";
import { usePremiumAccess } from "@/hooks/usePremiumAccess";
import TrainerLesson from "@/components/trainer/TrainerLesson";
import { navigateBackOrHome } from "@/lib/navigation";

const LESSONS_PER_PAGE = 5;

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
  const [currentPage, setCurrentPage] = useState(0);

  const { progress } = useTrainerProgress();
  const { isPremium } = usePremiumAccess();

  const levelLessons = getLessonsForLevel(selectedLevel);
  const xpForNextLevel = progress.level * 100;
  const xpInLevel = progress.xp % 100;

  const completedInLevel = levelLessons.filter((l) =>
    progress.completedLessons.includes(l.id)
  ).length;

  const totalPages = Math.ceil(levelLessons.length / LESSONS_PER_PAGE);
  const paginatedLessons = levelLessons.slice(
    currentPage * LESSONS_PER_PAGE,
    (currentPage + 1) * LESSONS_PER_PAGE
  );

  const handleLevelChange = (lvl: Level) => {
    setSelectedLevel(lvl);
    setCurrentPage(0);
  };

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
              <h1 className="text-lg font-black text-primary-foreground sm:text-xl">BalkanLink Deutsch</h1>
              <p className="text-xs text-primary-foreground/70">Effektives Deutschlernen für das echte Leben</p>
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

        {/* ── PAGINATED LESSONS ── */}
        <div className="mb-4">
          <div className="flex flex-col gap-2">
            {paginatedLessons.map((lesson, idx) => {
              const globalIdx = currentPage * LESSONS_PER_PAGE + idx;
              const isFree = globalIdx < FREE_LESSONS_PER_LEVEL;
              const isLocked = !isFree && !isPremium;
              const completed = progress.completedLessons.includes(lesson.id);

              return (
                <motion.button
                  key={lesson.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(idx * 0.03, 0.15) }}
                  onClick={() => handleLessonClick(lesson, isLocked)}
                  className={`group flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all ${
                    isLocked
                      ? "border-border/50 bg-muted/40 opacity-60 hover:opacity-80"
                      : completed
                        ? "border-[hsl(var(--success)/0.3)] bg-[hsl(var(--success)/0.03)] hover:shadow-sm"
                        : "border-border bg-card hover:border-primary/30 hover:shadow-sm"
                  }`}
                >
                  <span className={`text-2xl leading-none ${isLocked ? "grayscale" : ""}`}>
                    {lesson.icon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <h3 className={`text-xs font-bold leading-tight ${isLocked ? "text-muted-foreground" : ""}`}>
                        {lesson.titleDe}
                      </h3>
                      {completed && <CheckCircle2 className="h-3.5 w-3.5 text-[hsl(var(--success))]" />}
                      {isLocked && <Lock className="h-3 w-3 text-muted-foreground/60" />}
                    </div>
                    <p className={`mt-0.5 text-[11px] ${isLocked ? "text-muted-foreground/60" : "text-muted-foreground"}`}>
                      {lesson.title} · {lesson.exercises.length} Aufgaben
                    </p>
                  </div>
                  {isFree && !completed && (
                    <span className="shrink-0 rounded-full bg-[hsl(var(--success)/0.1)] px-2 py-0.5 text-[9px] font-bold text-[hsl(var(--success))]">
                      Free
                    </span>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mb-6 flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
              disabled={currentPage === 0}
              className="flex h-8 w-8 items-center justify-center rounded-lg border bg-card text-muted-foreground transition-colors hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold transition-all ${
                  currentPage === i
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "border bg-card text-muted-foreground hover:bg-muted"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={currentPage === totalPages - 1}
              className="flex h-8 w-8 items-center justify-center rounded-lg border bg-card text-muted-foreground transition-colors hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* ── UPGRADE CTA (no price, just action) ── */}
        {!isPremium && (
          <div className="mb-6 rounded-2xl border-2 border-gold/30 bg-gradient-to-b from-gold/5 to-gold/10 p-6 text-center">
            <Crown className="mx-auto mb-2 h-7 w-7 text-gold" />
            <h3 className="text-base font-black">Weiter lernen</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Schalte alle Lektionen frei und lerne ohne Einschränkungen weiter
            </p>
            <Button
              onClick={() => navigate("/deutsch-trainer/preise")}
              className="mt-4 h-11 w-full rounded-xl bg-gold text-sm font-bold text-gold-foreground shadow-[0_4px_20px_rgba(255,204,0,0.3)] hover:bg-gold-light"
            >
              Alle Lektionen freischalten
            </Button>
            <div className="mt-3 flex items-center justify-center gap-3 text-[10px] text-muted-foreground">
              <span>✓ Kein Abo</span>
              <span>✓ Einmal zahlen</span>
              <span>✓ Alle Niveaus</span>
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
