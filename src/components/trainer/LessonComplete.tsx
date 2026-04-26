import { motion } from "framer-motion";
import { ArrowRight, RotateCcw } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

interface Props {
  correctCount: number;
  totalCount: number;
  onRestart: () => void;
  onBack: () => void;
  nextStageLabel?: string;
  onNextStage?: () => void;
}

export default function LessonComplete({ 
  correctCount, totalCount, onRestart, onBack,
  nextStageLabel, onNextStage 
}: Props) {
  const { t } = useTranslation("pages");
  const pct = Math.round((correctCount / totalCount) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center gap-6 py-10 text-center px-4"
    >
      <div className="text-6xl">
        {pct === 100 ? "🏆" : pct >= 80 ? "⭐" : pct >= 60 ? "👍" : "📚"}
      </div>

      <div>
        <h2 className="text-2xl font-black text-white">
          {pct === 100
            ? t("deutschTrainer.complete.perfect")
            : pct >= 80
              ? t("deutschTrainer.complete.great")
              : pct >= 60
                ? t("deutschTrainer.complete.good")
                : t("deutschTrainer.complete.keepGoing")}
        </h2>
        <p className="text-white/60 mt-2">
          {t("deutschTrainer.lessonView.answerStats", { correct: correctCount, total: totalCount, pct })}
        </p>
      </div>

      <div className="w-full max-w-xs">
        <div className="h-3 w-full rounded-full bg-white/10">
          <div 
            className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <div className="flex w-full max-w-xs flex-col gap-3 pt-2">
        {onNextStage && nextStageLabel && (
          <Button 
            onClick={onNextStage}
            className="h-12 rounded-2xl bg-[hsl(var(--gold))] 
              text-white font-bold"
          >
            {t("deutschTrainer.complete.next")} {nextStageLabel} 
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
        <Button 
          onClick={onBack} 
          className="h-12 rounded-2xl bg-primary 
            text-primary-foreground font-bold"
        >
          {t("deutschTrainer.complete.continueLearning")}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          onClick={onRestart} 
          className="h-12 rounded-2xl font-bold border-white/20 
            text-white/70 hover:text-white"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          {t("deutschTrainer.complete.restart")}
        </Button>
      </div>
    </motion.div>
  );
}
