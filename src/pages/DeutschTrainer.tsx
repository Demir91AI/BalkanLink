import { useState, useEffect } from "react";
import { SEO } from "@/components/SEO";
import AuthGate from "@/components/AuthGate";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Flame, Star, Lock, GraduationCap, CheckCircle2, X, Crown, ChevronLeft, ChevronRight, ArrowLeft, Home } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { LEVELS, LEVEL_COLORS, getLessonsForLevel, loadLessonsForLevel, FREE_LESSONS_PER_LEVEL, MAX_LEVEL, type Level, type Lesson } from "@/lib/deutsch-trainer-data";
import { useTrainerProgress } from "@/hooks/useTrainerProgress";
import { useSubscription } from "@/hooks/useSubscription";
import TrainerLesson from "@/components/trainer/TrainerLesson";
import { navigateBackOrHome } from "@/lib/navigation";
const LESSONS_PER_PAGE = 9;

const INDIVIDUAL_PRICES: Record<string, string> = {
  "A1": "9,99 €", "A2": "14,99 €",
  "B1": "14,99 €", "B2": "19,99 €",
  "C1": "19,99 €", "C2": "24,99 €",
};

export default function DeutschTrainer() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const demo = params.get("demo") === "1";

  const [selectedLevel, setSelectedLevel] = useState<Level>("A1");
  const [levelLoading, setLevelLoading] = useState(true);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [showPaywall, setShowPaywall] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const { progress } = useTrainerProgress();
  const { isPremium } = useSubscription();

  useEffect(() => {
    setLevelLoading(true);
    loadLessonsForLevel(selectedLevel).then((loaded) => {
      setLevelLoading(false);
      if (demo && selectedLevel === "A1" && loaded.length > 0 && !activeLesson) {
        setActiveLesson(loaded[0]);
      }
    });
  }, [selectedLevel]);

  const levelLessons = getLessonsForLevel(selectedLevel);
  const dataReady = !levelLoading && levelLessons.length > 0;
  const maxXpForLevel = MAX_LEVEL * 100;
  const xpForNextLevel = Math.min(progress.level * 100, maxXpForLevel);
  const xpInLevel = progress.level >= MAX_LEVEL ? 100 : progress.xp % 100;

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
    return <AuthGate><TrainerLesson lesson={activeLesson} onBack={() => setActiveLesson(null)} /></AuthGate>;
  }

  return (
    <>
      <SEO title="Deutsch Trainer — Uči Njemački A1 do C2" description="Online kurs njemačkog jezika za Balkance — 48 lekcija, vježbe, TTS izgovor." path="/deutsch-trainer" />
      {/* Hero Banner */}
      <section
        className="relative overflow-hidden border-b border-white/[0.06] pb-12 pt-6 sm:pb-16 sm:pt-8"
        style={{ background: "linear-gradient(145deg, #0f172a 0%, #020617 50%, #0c1a3d 100%)" }}
      >
        {/* Animated background dots */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(59,130,246,0.08) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        {/* Radial glow behind hero */}
        <div
          className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2"
          style={{
            width: "120%",
            height: "100%",
            background: "radial-gradient(ellipse 60% 70% at 50% 20%, rgba(59,130,246,0.18) 0%, rgba(6,182,212,0.06) 40%, transparent 80%)",
          }}
        />

        <div className="relative z-10 px-5 sm:px-10 lg:px-20">
          {/* Nav */}
          <div className="mb-8 flex items-center gap-4">
            <button
              onClick={() => navigateBackOrHome(navigate)}
              className="flex items-center gap-1.5 text-[13px] font-medium text-white/50 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Nazad
            </button>
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-1.5 text-[13px] font-medium text-white/50 hover:text-white transition-colors"
            >
              <Home className="h-4 w-4" /> Početna
            </button>
          </div>

          {/* Hero content */}
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-3 inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/[0.08] px-4 py-1.5"
            >
              <GraduationCap className="h-4 w-4 text-gold" />
              <span className="text-xs font-bold text-gold">{"BalkanLink Deutsch"}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="text-3xl font-black leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl"
            >
              {"Effektives Deutschlernen für das echte Leben"}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="mt-4 max-w-lg text-sm leading-relaxed text-white/50 sm:text-base"
            >
              {"Effektives Deutschlernen für das echte Leben"}
            </motion.p>


            {/* Feature pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-6 flex flex-wrap gap-2"
            >
              {[
                "🏥 Beim Arzt",
                "🏛️ Behörden",
                "💼 Jobcenter",
                "📋 Bürgergeld",
                "🗣️ Sprachassistent",
                "🏆 A1 → C2",
              ].map(tag => (
                <span
                  key={tag}
                  className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-[11px] font-semibold text-white/60"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main course area */}
      <div
        className="relative min-h-screen"
        style={{
          background: "linear-gradient(180deg, #0f172a 0%, #020617 100%)",
        }}
      >
        {/* Subtle radial glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(59,130,246,0.12) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 px-5 sm:px-10 lg:px-20 py-10">

          {/* ── STATS ROW ── */}
          <div className="mb-8 grid grid-cols-3 gap-3 sm:gap-4 max-w-3xl">
            {[
              { icon: <Trophy className="h-6 w-6 text-gold" />, value: progress.xp, label: "XP" },
              { icon: <Flame className="h-6 w-6 text-orange-400" />, value: progress.streak, label: "Streak" },
              { icon: <Star className="h-6 w-6 text-blue-400" />, value: `Lvl ${progress.level}`, label: `${"Level"} (max ${MAX_LEVEL})` },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="group flex flex-col items-center gap-1 rounded-2xl border border-white/[0.06] bg-white/[0.03] px-4 py-4 backdrop-blur-sm transition-all duration-200 hover:scale-[1.02] hover:border-white/[0.12] hover:shadow-[0_8px_30px_rgba(59,130,246,0.08)]"
              >
                {s.icon}
                <span className="text-lg font-black text-white sm:text-xl">{s.value}</span>
                <span className="text-[10px] font-medium text-white/40">{s.label}</span>
              </motion.div>
            ))}
          </div>

          {/* ── XP PROGRESS BAR ── */}
          <div className="mb-10 max-w-3xl">
            <div className="mb-2 flex justify-between text-xs text-white/40">
              <span className="font-semibold">{"Level"} {progress.level}{progress.level >= MAX_LEVEL ? ` (${"Max. Level"})` : ""}</span>
              <span>{progress.level >= MAX_LEVEL ? "Maksimalni level dostignut" : `${xpInLevel}/${xpForNextLevel} XP`}</span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
              <motion.div
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, #3b82f6, #06b6d4)" }}
                initial={{ width: 0 }}
                animate={{ width: `${progress.level >= MAX_LEVEL ? 100 : (xpInLevel / xpForNextLevel) * 100}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* ── LEVEL PILLS ── */}
          <div className="mb-4 flex flex-nowrap gap-2.5 sm:gap-3 overflow-x-auto pb-1 scrollbar-hide">
            {LEVELS.map((lvl) => {
              const active = selectedLevel === lvl;
              return (
                <motion.button
                  key={lvl}
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleLevelChange(lvl)}
                  className={`shrink-0 rounded-full px-5 py-2 text-xs font-bold transition-all duration-200 ${
                    active
                      ? "text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                      : "border border-white/[0.08] text-white/50 hover:border-white/[0.18] hover:bg-white/[0.04] hover:text-white/70"
                  }`}
                  style={active ? { background: "linear-gradient(135deg, #3b82f6, #06b6d4)" } : undefined}
                >
                  {lvl}
                </motion.button>
              );
            })}
          </div>

          {/* ── LEVEL PROGRESS ── */}
          <div className="mb-10 max-w-3xl rounded-2xl border border-white/[0.06] bg-white/[0.02] px-5 py-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-white/80">{selectedLevel} {"Napredak"}</span>
              <span className="text-xs text-white/40">
                {completedInLevel}/{levelLessons.length} {"lekcija"}
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-white/[0.06]">
              <motion.div
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, #3b82f6, #06b6d4)" }}
                initial={{ width: 0 }}
                animate={{ width: `${levelLessons.length > 0 ? (completedInLevel / levelLessons.length) * 100 : 0}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* ── LESSON GRID ── */}
          <div className="mb-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {paginatedLessons.map((lesson, idx) => {
                const globalIdx = currentPage * LESSONS_PER_PAGE + idx;
                const isFree = globalIdx < FREE_LESSONS_PER_LEVEL;
                const isLocked = !isFree && !isPremium;
                const completed = progress.completedLessons.includes(lesson.id);

                return (
                  <motion.button
                    key={lesson.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(idx * 0.05, 0.3), duration: 0.4 }}
                    whileHover={!isLocked ? { y: -4, transition: { duration: 0.2 } } : undefined}
                    onClick={() => handleLessonClick(lesson, isLocked)}
                    className={`relative flex flex-col items-start gap-3 rounded-[18px] border p-5 text-left transition-all duration-200 ${
                      isLocked
                        ? "border-white/[0.04] bg-white/[0.015] opacity-50 cursor-default"
                        : completed
                          ? "border-[hsl(var(--success)/0.2)] bg-[hsl(var(--success)/0.03)] hover:shadow-[0_8px_30px_rgba(34,197,94,0.1)] hover:border-[hsl(var(--success)/0.3)]"
                          : "border-white/[0.06] bg-white/[0.03] hover:shadow-[0_8px_30px_rgba(59,130,246,0.1)] hover:border-white/[0.12]"
                    }`}
                  >
                    {/* Free badge */}
                    {isFree && !completed && (
                      <span className="absolute right-4 top-4 rounded-full bg-[hsl(var(--success)/0.12)] px-2.5 py-0.5 text-[10px] font-bold text-[hsl(var(--success))]">
                        {"Besplatno"}
                      </span>
                    )}

                    {/* Icon */}
                    <span className={`text-3xl leading-none ${isLocked ? "grayscale" : ""}`}>
                      {lesson.icon}
                    </span>

                    {/* Text */}
                    <div className="min-w-0 w-full">
                      <div className="flex items-center gap-2">
                        <h3 className={`text-sm font-bold leading-tight ${isLocked ? "text-white/30" : "text-white/90"}`}>
                          {lesson.titleDe}
                        </h3>
                        {completed && <CheckCircle2 className="h-4 w-4 shrink-0 text-[hsl(var(--success))]" />}
                        {isLocked && <Lock className="h-3.5 w-3.5 shrink-0 text-white/20" />}
                      </div>
                      <p className={`mt-1 text-xs leading-relaxed ${isLocked ? "text-white/15" : "text-white/40"}`}>
                        {lesson.title}{!isPremium && ` · ${"frei verfügbar"}`}
                      </p>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* ── PAGINATION ── */}
          {totalPages > 1 && (
            <div className="mb-12 flex items-center justify-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
                disabled={currentPage === 0}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-white/40 transition-colors hover:bg-white/[0.06] disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={`flex h-9 w-9 items-center justify-center rounded-xl text-xs font-bold transition-all ${
                    currentPage === i
                      ? "text-white shadow-[0_0_16px_rgba(59,130,246,0.25)]"
                      : "border border-white/[0.08] bg-white/[0.03] text-white/40 hover:bg-white/[0.06]"
                  }`}
                  style={currentPage === i ? { background: "linear-gradient(135deg, #3b82f6, #06b6d4)" } : undefined}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={currentPage === totalPages - 1}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-white/40 transition-colors hover:bg-white/[0.06] disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* ── UPGRADE CTA ── */}
          {!isPremium && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-12 max-w-2xl rounded-2xl border-2 border-gold/20 p-8 text-center"
              style={{ background: "linear-gradient(135deg, rgba(255,204,0,0.06) 0%, rgba(255,204,0,0.02) 100%)" }}
            >
              <Crown className="mx-auto mb-3 h-8 w-8 text-gold" />
              <h3 className="text-base font-black text-white">{"Weiter lernen"}</h3>
              <p style={{ fontSize: 13, color: "#9CA3AF", marginBottom: 8 }}>
                {"Schalte alle Lektionen & den vollen Sprachassistent frei"}
              </p>
              <div className="mt-2 flex flex-wrap justify-center gap-2">
                <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold text-white/70">✓ {"Kein Abo"}</span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold text-white/70">✓ {"Einmal zahlen"}</span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold text-white/70">✓ {"Wertgutschein für Premium"}</span>
              </div>
              <Button
                onClick={() => navigate("/deutsch-trainer/preise")}
                className="mt-5 h-12 w-full max-w-xs rounded-xl bg-gold text-sm font-bold text-gold-foreground shadow-[0_4px_20px_rgba(255,204,0,0.3)] hover:bg-gold-light"
              >
                {"Alle Lektionen freischalten"}
              </Button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Paywall Modal */}
      <AnimatePresence>
        {showPaywall && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
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
                <h2 className="text-base font-black">{"Otključaj dodatne lekcije"}</h2>
                <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                  {"Otključaj sve sadržaje i vježbaj njemački za stvarne situacije."}
                </p>
                <p className="mt-3 text-2xl font-black text-gold-dark">
                  {"od"} {INDIVIDUAL_PRICES[selectedLevel]}
                  <span className="ml-1 text-xs font-normal text-muted-foreground">{"/ jednokratno"}</span>
                </p>
                <Button
                  onClick={() => { setShowPaywall(false); navigate("/deutsch-trainer/preise"); }}
                  className="mt-4 h-11 w-full rounded-xl bg-gold text-sm font-bold text-gold-foreground shadow-[0_4px_20px_rgba(255,204,0,0.3)] hover:bg-gold-light"
                >
                  {"Otključaj sada"}
                </Button>
                <button
                  onClick={() => setShowPaywall(false)}
                  className="mt-2 text-xs text-muted-foreground hover:underline"
                >
                  {"Odluči kasnije"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
