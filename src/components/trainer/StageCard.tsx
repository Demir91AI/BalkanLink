import { motion } from "framer-motion";
import { ArrowRight, Lock } from "lucide-react";

interface Props {
  label: string;
  index: number;
  freeCount: number;
  lockedCount: number;
  isPremium: boolean;
  onSelect: () => void;
  onUpgrade: () => void;
}

const STAGE_COLORS = [
  "bg-[hsl(var(--success))]",
  "bg-gold",
  "bg-primary",
];

export default function StageCard({ label, index, freeCount, lockedCount, isPremium, onSelect, onUpgrade }: Props) {
  const totalCount = isPremium ? freeCount + lockedCount : freeCount;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="rounded-xl border bg-card overflow-hidden"
    >
      {/* Clickable main area */}
      <button
        onClick={onSelect}
        className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-all hover:bg-muted/30"
      >
        <span className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm font-black text-primary-foreground ${STAGE_COLORS[index]}`}>
          {index + 1}
        </span>
        <div className="flex-1">
          <h3 className="text-sm font-bold">{label}</h3>
          <p className="text-[11px] text-muted-foreground">
            {isPremium ? `${freeCount + lockedCount} Aufgaben` : `${freeCount} Aufgaben`}
          </p>
        </div>
        <ArrowRight className="h-4 w-4 text-muted-foreground" />
      </button>

      {/* Locked indicator for free users */}
      {!isPremium && lockedCount > 0 && (
        <div className="border-t border-dashed border-border/50 px-4 py-2.5 bg-muted/20">
          <div className="flex items-center gap-2">
            <Lock className="h-3.5 w-3.5 text-gold" />
            <span className="text-[11px] font-semibold text-muted-foreground">
              🔒 +{lockedCount} weitere Aufgaben
            </span>
            <button
              onClick={onUpgrade}
              className="ml-auto text-[10px] font-bold text-gold hover:text-gold-dark transition-colors"
            >
              Freischalten →
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
