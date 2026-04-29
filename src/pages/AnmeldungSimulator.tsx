/**
 * Anmeldung Simulator page.
 *
 * Three internal views:
 *   1. "intro"  — landing/start screen with rules
 *   2. "play"   — one question at a time, immediate feedback
 *   3. "result" — score, mistakes, recommended next steps
 *
 * State is local — no backend required. Free for everyone.
 *
 * All copy from i18n namespace `simulator.anmeldung.*`.
 */
import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  Mic2,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowRight,
  RotateCcw,
  Trophy,
  ListChecks,
  FileText,
  Lightbulb,
} from "lucide-react";

import { SEO } from "@/components/SEO";
import PageNavBar from "@/components/navigation/PageNavBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useLocalizedNavigate } from "@/hooks/useLocalizedHref";
import type { SimQuestion, SimQuestionOption } from "@/lib/simulator-types";

type View = "intro" | "play" | "result";

interface Answer {
  questionIdx: number;
  optionIdx: number;
  score: 0 | 5 | 10;
}

export default function AnmeldungSimulator() {
  const { t } = useTranslation("simulator");
  const navigate = useLocalizedNavigate();

  const questions = useMemo(
    () => (t("anmeldung.questions", { returnObjects: true }) as SimQuestion[]) || [],
    [t]
  );
  const totalMax = questions.length * 10;

  const [view, setView] = useState<View>("intro");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [pickedIdx, setPickedIdx] = useState<number | null>(null);

  const currentQ = questions[currentIdx];
  const totalScore = answers.reduce((sum, a) => sum + a.score, 0);

  const start = () => {
    setView("play");
    setCurrentIdx(0);
    setAnswers([]);
    setPickedIdx(null);
  };

  const handlePick = (optionIdx: number) => {
    if (pickedIdx !== null) return;
    setPickedIdx(optionIdx);
    const score = currentQ.options[optionIdx].score;
    setAnswers((prev) => [...prev, { questionIdx: currentIdx, optionIdx, score }]);
  };

  const handleNext = () => {
    if (currentIdx + 1 >= questions.length) {
      setView("result");
    } else {
      setCurrentIdx((i) => i + 1);
      setPickedIdx(null);
    }
  };

  const restart = () => {
    setCurrentIdx(0);
    setAnswers([]);
    setPickedIdx(null);
    setView("play");
  };

  /* ─────────── INTRO ─────────── */
  if (view === "intro") {
    const introItems = (t("anmeldung.hub.intro.items", { returnObjects: true }) as string[]) || [];
    return (
      <>
        <SEO
          title={t("anmeldung.seo.title")}
          description={t("anmeldung.seo.description")}
          path="/anmeldung-simulator"
        />
        <div className="mx-auto max-w-2xl px-4 py-6 pb-28">
          <PageNavBar showShare shareTitle={t("anmeldung.hub.title")} />

          <div className="mt-4 mb-6 rounded-2xl border border-orange-500/30 bg-orange-500/10 p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500 shadow-sm">
                <Mic2 className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col gap-1">
                <Badge variant="outline" className="border-emerald-500/40 text-emerald-600 text-xs w-fit">
                  {t("anmeldung.hub.free")}
                </Badge>
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">{t("anmeldung.hub.title")}</h1>
            <p className="text-sm sm:text-base text-foreground/80 leading-relaxed">
              {t("anmeldung.hub.subtitle")}
            </p>

            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full border border-border bg-background px-3 py-1">
                {t("anmeldung.hub.stats.questions")}
              </span>
              <span className="rounded-full border border-border bg-background px-3 py-1">
                {t("anmeldung.hub.stats.duration")}
              </span>
              <span className="rounded-full border border-border bg-background px-3 py-1">
                {t("anmeldung.hub.stats.topics")}
              </span>
            </div>
          </div>

          {/* How it works */}
          <Card className="rounded-2xl border border-border mb-6">
            <CardContent className="p-5">
              <h2 className="text-base font-bold mb-3 flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-[hsl(var(--gold))]" />
                {t("anmeldung.hub.intro.title")}
              </h2>
              <ol className="space-y-2">
                {introItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white">
                      {idx + 1}
                    </div>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>

          <Button onClick={start} className="w-full btn-gold-gradient rounded-xl py-6 text-base">
            <Mic2 className="mr-2 h-5 w-5" />
            {t("anmeldung.hub.ctaStart")}
          </Button>

          <p className="mt-4 text-[11px] text-muted-foreground italic text-center">
            {t("anmeldung.hub.officialNote")}
          </p>
        </div>
      </>
    );
  }

  /* ─────────── PLAY ─────────── */
  if (view === "play" && currentQ) {
    const pickedOption = pickedIdx !== null ? currentQ.options[pickedIdx] : null;
    return (
      <>
        <SEO title={t("anmeldung.seo.title")} description={t("anmeldung.seo.description")} path="/anmeldung-simulator" />
        <div className="mx-auto max-w-2xl px-4 py-6 pb-28">
          <PageNavBar />

          {/* Progress header */}
          <div className="mt-4 mb-6">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-medium text-muted-foreground">
                {t("anmeldung.ui.questionOf", { current: currentIdx + 1, total: questions.length })}
              </span>
              <span className="font-bold">{totalScore} / {totalMax}</span>
            </div>
            <Progress value={((currentIdx + (pickedIdx !== null ? 1 : 0)) / questions.length) * 100} className="h-1.5" />
          </div>

          {/* Beamte prompt */}
          <Card className="rounded-2xl border-2 border-orange-500/40 bg-orange-500/5 mb-4">
            <CardContent className="p-5">
              <div className="flex items-start gap-3 mb-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-500 shadow-sm">
                  <Mic2 className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-[11px] font-medium text-orange-700 dark:text-orange-400 uppercase tracking-wide mb-1">
                    {t("anmeldung.ui.beamtePrompt")}
                  </div>
                  <p className="text-base font-bold text-foreground leading-snug">"{currentQ.de}"</p>
                </div>
              </div>

              <div className="rounded-lg bg-background border border-border p-3 mt-3">
                <div className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide mb-1">
                  {t("anmeldung.ui.translationLabel")}
                </div>
                <p className="text-sm text-foreground/85 leading-relaxed">{currentQ.context}</p>
              </div>

              {currentQ.tip && pickedIdx === null && (
                <div className="mt-3 rounded-lg border border-[hsl(var(--gold))]/30 bg-[hsl(var(--gold))]/5 p-3">
                  <div className="text-[11px] font-medium text-[hsl(var(--gold))] uppercase tracking-wide mb-1">
                    {t("anmeldung.ui.tipLabel")}
                  </div>
                  <p className="text-sm text-foreground/85 leading-relaxed">{currentQ.tip}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Options */}
          <div className="mb-4">
            <div className="text-xs font-medium text-muted-foreground mb-2">{t("anmeldung.ui.yourAnswer")}</div>
            <div className="space-y-2">
              {currentQ.options.map((opt, idx) => {
                const isPicked = pickedIdx === idx;
                const showResult = pickedIdx !== null;
                const isCorrect = opt.score === 10;
                const isPartial = opt.score === 5;
                return (
                  <button
                    key={idx}
                    onClick={() => handlePick(idx)}
                    disabled={pickedIdx !== null}
                    className={cn(
                      "w-full text-left rounded-xl border p-3 transition-all",
                      pickedIdx === null && "border-border bg-background hover:border-orange-500/50 hover:bg-orange-500/5 cursor-pointer",
                      showResult && !isPicked && "border-border bg-background opacity-50 cursor-default",
                      showResult && isPicked && isCorrect && "border-emerald-500 bg-emerald-500/10",
                      showResult && isPicked && isPartial && "border-amber-500 bg-amber-500/10",
                      showResult && isPicked && opt.score === 0 && "border-rose-500 bg-rose-500/10"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      {showResult && isPicked && (
                        <div className="shrink-0 mt-0.5">
                          {isCorrect && <CheckCircle2 className="h-5 w-5 text-emerald-600" />}
                          {isPartial && <AlertCircle className="h-5 w-5 text-amber-600" />}
                          {opt.score === 0 && <XCircle className="h-5 w-5 text-rose-600" />}
                        </div>
                      )}
                      <span className="text-sm leading-relaxed flex-1">{opt.text}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback */}
          {pickedOption && (
            <Card
              className={cn(
                "rounded-2xl border-2 mb-4 animate-in fade-in slide-in-from-bottom-2 duration-300",
                pickedOption.score === 10 && "border-emerald-500/50 bg-emerald-500/5",
                pickedOption.score === 5 && "border-amber-500/50 bg-amber-500/5",
                pickedOption.score === 0 && "border-rose-500/50 bg-rose-500/5"
              )}
            >
              <CardContent className="p-4">
                <div className="text-sm font-bold mb-1.5">
                  {pickedOption.score === 10 && t("anmeldung.ui.feedbackCorrect")}
                  {pickedOption.score === 5 && t("anmeldung.ui.feedbackPartial")}
                  {pickedOption.score === 0 && t("anmeldung.ui.feedbackWrong")}
                </div>
                <p className="text-sm text-foreground/85 leading-relaxed">{pickedOption.feedback}</p>
              </CardContent>
            </Card>
          )}

          {/* Next button */}
          {pickedIdx !== null && (
            <Button onClick={handleNext} className="w-full btn-gold-gradient rounded-xl py-5">
              {currentIdx + 1 >= questions.length ? t("anmeldung.ui.finish") : t("anmeldung.ui.next")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </>
    );
  }

  /* ─────────── RESULT ─────────── */
  if (view === "result") {
    const percent = (totalScore / totalMax) * 100;
    const mistakes = answers
      .map((a, i) => ({ ...a, q: questions[a.questionIdx] }))
      .filter((a) => a.score < 10);

    let scoreMsg = "";
    let scoreColor = "text-emerald-600";
    if (percent >= 85) {
      scoreMsg = t("anmeldung.ui.scoreExcellent");
      scoreColor = "text-emerald-600";
    } else if (percent >= 60) {
      scoreMsg = t("anmeldung.ui.scoreGood");
      scoreColor = "text-amber-600";
    } else {
      scoreMsg = t("anmeldung.ui.scorePoor");
      scoreColor = "text-rose-600";
    }

    return (
      <>
        <SEO title={t("anmeldung.seo.title")} description={t("anmeldung.seo.description")} path="/anmeldung-simulator" />
        <div className="mx-auto max-w-2xl px-4 py-6 pb-28">
          <PageNavBar showShare shareTitle={t("anmeldung.hub.title")} />

          <div className="mt-4 mb-6 rounded-2xl border-2 border-[hsl(var(--gold))]/40 bg-gradient-to-br from-[hsl(var(--gold))]/10 to-orange-500/10 p-6 text-center">
            <Trophy className="mx-auto h-12 w-12 text-[hsl(var(--gold))] mb-3" />
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
              {t("anmeldung.ui.score")}
            </div>
            <div className="text-4xl font-bold mb-1">
              {t("anmeldung.ui.scoreOf", { score: totalScore, max: totalMax })}
            </div>
            <div className="mb-3">
              <Progress value={percent} className="h-2" />
            </div>
            <p className={cn("text-sm font-medium", scoreColor)}>{scoreMsg}</p>
          </div>

          {/* Mistakes */}
          <Card className="rounded-2xl border border-border mb-4">
            <CardContent className="p-5">
              <h2 className="text-base font-bold mb-3 flex items-center gap-2">
                <ListChecks className="h-4 w-4 text-rose-600" />
                {t("anmeldung.ui.yourMistakes")}
              </h2>
              {mistakes.length === 0 ? (
                <p className="text-sm text-emerald-700 dark:text-emerald-400 font-medium">
                  ✨ {t("anmeldung.ui.noMistakes")}
                </p>
              ) : (
                <ul className="space-y-3">
                  {mistakes.map((m, idx) => (
                    <li key={idx} className="rounded-lg border border-rose-500/20 bg-rose-500/5 p-3">
                      <div className="text-xs font-medium text-rose-700 dark:text-rose-400 mb-1">
                        "{m.q.de}"
                      </div>
                      <p className="text-sm text-foreground/85 leading-relaxed">
                        {m.q.options[m.optionIdx].feedback}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          {/* CTAs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
            <Button
              onClick={() => navigate("/check-liste/anmeldung")}
              variant="outline"
              className="rounded-xl py-5"
            >
              <ListChecks className="mr-2 h-4 w-4" />
              {t("anmeldung.ui.ctaChecklist")}
            </Button>
            <Button
              onClick={() => navigate("/musterformular/anmeldung")}
              variant="outline"
              className="rounded-xl py-5"
            >
              <FileText className="mr-2 h-4 w-4" />
              {t("anmeldung.ui.ctaForm")}
            </Button>
          </div>

          <Button onClick={restart} variant="ghost" className="w-full rounded-xl">
            <RotateCcw className="mr-2 h-4 w-4" />
            {t("anmeldung.ui.ctaRestart")}
          </Button>
        </div>
      </>
    );
  }

  return null;
}
