import { motion } from "framer-motion";
import { Trophy, Flame, ArrowRight, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  correctCount: number;
  totalCount: number;
  xpEarned: number;
  streak: number;
  onRestart: () => void;
  onBack: () => void;
}

export default function LessonComplete({ correctCount, totalCount, xpEarned, streak, onRestart, onBack }: Props) {
  const pct = Math.round((correctCount / totalCount) * 100);
  const perfect = pct === 100;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center gap-6 py-8 text-center"
    >
      <div className="text-6xl">{perfect ? "🏆" : pct >= 60 ? "⭐" : "📚"}</div>

      <h2 className="text-2xl font-black">
        {perfect ? "Perfekt!" : pct >= 60 ? "Gut gemacht!" : "Weiter üben!"}
      </h2>

      <p className="text-muted-foreground">
        {correctCount} von {totalCount} richtig ({pct}%)
      </p>

      <div className="flex gap-6">
        <div className="flex flex-col items-center gap-1">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/10">
            <Trophy className="h-7 w-7 text-gold" />
          </div>
          <span className="text-lg font-bold text-gold">+{xpEarned} XP</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-destructive/10">
            <Flame className="h-7 w-7 text-destructive" />
          </div>
          <span className="text-lg font-bold">{streak} Tage</span>
        </div>
      </div>

      <div className="flex w-full flex-col gap-3 pt-4">
        <Button onClick={onBack} className="h-12 rounded-xl bg-primary text-primary-foreground font-bold">
          Weiter lernen <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        <Button variant="outline" onClick={onRestart} className="h-12 rounded-xl font-bold">
          <RotateCcw className="mr-2 h-4 w-4" /> Nochmal üben
        </Button>
      </div>
    </motion.div>
  );
}
