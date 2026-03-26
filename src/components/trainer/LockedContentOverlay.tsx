import { Lock, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  lockedCount: number;
  label?: string;
  onUpgrade: () => void;
}

export default function LockedContentOverlay({ lockedCount, label, onUpgrade }: Props) {
  return (
    <div className="mt-3 rounded-xl border border-gold/20 bg-gradient-to-b from-gold/5 to-gold/10 p-4 text-center">
      <Lock className="mx-auto mb-1.5 h-5 w-5 text-gold" />
      <p className="text-xs font-bold">
        🔒 +{lockedCount} weitere {label || "Inhalte"} freischalten
      </p>
      <p className="mt-0.5 text-[11px] text-muted-foreground">
        Nur mit Ultimate freigeschaltet
      </p>
      <Button
        onClick={onUpgrade}
        className="mt-3 h-9 w-full rounded-xl bg-gold text-xs font-bold text-gold-foreground shadow-[0_4px_20px_rgba(255,204,0,0.3)] hover:bg-gold-light"
      >
        <Crown className="mr-1.5 h-3.5 w-3.5" /> Ultimate freischalten
      </Button>
    </div>
  );
}
