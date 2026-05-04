import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { SEO } from "@/components/SEO";
import AuthGate from "@/components/AuthGate";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, GraduationCap, CheckCircle2, X, Crown, ChevronLeft, ChevronRight, Save, RotateCcw } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { LEVELS, LEVEL_COLORS, getLessonsForLevel, loadLessonsForLevel, FREE_LESSONS_PER_LEVEL, MAX_LEVEL, type Level, type Lesson } from "@/lib/deutsch-trainer-data";
import { useTrainerProgress } from "@/hooks/useTrainerProgress";
import { useSubscription } from "@/hooks/useSubscription";
import TrainerLesson from "@/components/trainer/TrainerLesson";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";
const LESSONS_PER_PAGE = 9;

const INDIVIDUAL_PRICES: Record<string, string> = {
  "A1": "9,99 €", "A2": "14,99 €",
  "B1": "14,99 €", "B2": "19,99 €",
  "C1": "19,99 €", "C2": "24,99 €",
};

export default function DeutschTrainer() {
  const { t } = useTranslation("pages");
  const navigate = useNavigate();
  const [params, setSearchParams] = useSearchParams();
  const demo = params.get("demo") === "1";
  const lessonIdParam = params.get("lesson");
  const stageParam = params.get("stage");
  const stageFromUrl = stageParam !== null ? Number(stageParam) : null;

  const [selectedLevel, setSelectedLevel] = useState<Level>("A1");
  const [levelLoading, setLevelLoading] = useState(true);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [showPaywall, setShowPaywall] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const { progress, resetProgress } = useTrainerProgress();
  const { isPremium } = useSubscription();

  // Resolve lesson from URL param across all levels (so refresh works)
  useEffect(() => {
    let cancelled = false;
    if (!lessonIdParam) {
      setActiveLesson(null);
      return;
    }
    // Try current level first
    const inCurrent = getLessonsForLevel(selectedLevel).find((l) => l.id === lessonIdParam);
    if (inCurrent) {
      setActiveLesson(inCurrent);
      return;
    }
    // Otherwise scan all levels
    (async () => {
      for (const lvl of LEVELS) {
        const lessons = await loadLessonsForLevel(lvl);
        if (cancelled) return;
        const found = lessons.find((l) => l.id === lessonIdParam);
        if (found) {
          if (lvl !== selectedLevel) setSelectedLevel(lvl);
          setActiveLesson(found);
          return;
        }
      }
      // Not found → clear param
      if (!cancelled) {
        setSearchParams((prev) => {
          const n = new URLSearchParams(prev);
          n.delete("lesson");
          n.delete("stage");
          return n;
        }, { replace: true });
      }
    })();
    return () => { cancelled = true; };
  }, [lessonIdParam]);

  useEffect(() => {
    setLevelLoading(true);
    loadLessonsForLevel(selectedLevel).then((loaded) => {
      setLevelLoading(false);
      if (demo && selectedLevel === "A1" && loaded.length > 0 && !activeLesson && !lessonIdParam) {
        // Open demo lesson via URL so back/refresh work
        setSearchParams((prev) => {
          const n = new URLSearchParams(prev);
          n.set("lesson", loaded[0].id);
          return n;
        }, { replace: true });
      }
    });
  }, [selectedLevel]);

  const levelLessons = getLessonsForLevel(selectedLevel);
  const dataReady = !levelLoading && levelLessons.length > 0;

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

  const openLesson = (lesson: Lesson) => {
    setSearchParams((prev) => {
      const n = new URLSearchParams(prev);
      n.set("lesson", lesson.id);
      n.delete("stage");
      return n;
    });
  };

  const closeLesson = () => {
    setSearchParams((prev) => {
      const n = new URLSearchParams(prev);
      n.delete("lesson");
      n.delete("stage");
      return n;
    });
  };

  const setStageInUrl = (stage: number | null) => {
    setSearchParams((prev) => {
      const n = new URLSearchParams(prev);
      if (stage === null) n.delete("stage");
      else n.set("stage", String(stage));
      return n;
    });
  };

  const handleLessonClick = (lesson: Lesson, isLocked: boolean) => {
    if (isLocked && !isPremium) {
      setShowPaywall(true);
    } else {
      openLesson(lesson);
    }
  };

  if (activeLesson) {
    return (
      <AuthGate>
        <TrainerLesson
          lesson={activeLesson}
          onBack={closeLesson}
          stage={stageFromUrl}
          onStageChange={setStageInUrl}
        />
      </AuthGate>
    );
  }

  return (
    <>
      <SEO title={t("deutschTrainer.seoTitle")} description={t("deutschTrainer.seoDescription")} path="/deutsch-trainer" />
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
          <Breadcrumbs variant="dark" className="mb-8" />

          {/* Hero content */}
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-3 inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/[0.08] px-4 py-1.5"
            >
              <GraduationCap className="h-4 w-4 text-gold" />
              <span className="text-xs font-bold text-gold">{t("deutschTrainer.brand")}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="text-3xl font-black leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl"
            >
              {t("deutschTrainer.heroHeadline")}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="mt-4 max-w-lg text-sm leading-relaxed text-white/50 sm:text-base"
            >
              {t("deutschTrainer.heroSubline")}
            </motion.p>


            {/* Feature pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-6 flex flex-wrap gap-2"
            >
              {[
                t("deutschTrainer.tags.doctor"),
                t("deutschTrainer.tags.authorities"),
                t("deutschTrainer.tags.jobcenter"),
                t("deutschTrainer.tags.buergergeld"),
                t("deutschTrainer.tags.sprachassistent"),
                t("deutschTrainer.tags.levelRange"),
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
              <span className="text-sm font-bold text-white/80">{selectedLevel} {t("deutschTrainer.progress.label")}</span>
              <span className="text-xs text-white/40">
                {completedInLevel}/{levelLessons.length} {t("deutschTrainer.progress.lessons")}
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
                        {t("deutschTrainer.lesson.free")}
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
                        {lesson.title}{!isPremium && ` · ${t("deutschTrainer.lesson.freeSuffix")}`}
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
              <h3 className="text-base font-black text-white">{t("deutschTrainer.upgradeCta.title")}</h3>
              <p style={{ fontSize: 13, color: "#9CA3AF", marginBottom: 8 }}>
                {t("deutschTrainer.upgradeCta.subtitle")}
              </p>
              <div className="mt-2 flex flex-wrap justify-center gap-2">
                <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold text-white/70">✓ {t("deutschTrainer.upgradeCta.noSubscription")}</span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold text-white/70">✓ {t("deutschTrainer.upgradeCta.payOnce")}</span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold text-white/70">✓ {t("deutschTrainer.upgradeCta.wertgutschein")}</span>
              </div>
              <Button
                onClick={() => navigate("/deutsch-trainer/preise")}
                className="mt-5 h-12 w-full max-w-xs rounded-xl bg-gold text-sm font-bold text-gold-foreground shadow-[0_4px_20px_rgba(255,204,0,0.3)] hover:bg-gold-light"
              >
                {t("deutschTrainer.upgradeCta.unlockAll")}
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
                <h2 className="text-base font-black">{t("deutschTrainer.paywallModal.title")}</h2>
                <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                  {t("deutschTrainer.paywallModal.body")}
                </p>
                <p className="mt-3 text-2xl font-black text-gold-dark">
                  {t("deutschTrainer.paywallModal.from")} {INDIVIDUAL_PRICES[selectedLevel]}
                  <span className="ml-1 text-xs font-normal text-muted-foreground">{t("deutschTrainer.paywallModal.perOneTime")}</span>
                </p>
                <Button
                  onClick={() => { setShowPaywall(false); navigate("/deutsch-trainer/preise"); }}
                  className="mt-4 h-11 w-full rounded-xl bg-gold text-sm font-bold text-gold-foreground shadow-[0_4px_20px_rgba(255,204,0,0.3)] hover:bg-gold-light"
                >
                  {t("deutschTrainer.paywallModal.unlockNow")}
                </Button>
                <button
                  onClick={() => setShowPaywall(false)}
                  className="mt-2 text-xs text-muted-foreground hover:underline"
                >
                  {t("deutschTrainer.paywallModal.decideLater")}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
