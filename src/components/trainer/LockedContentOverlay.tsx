import { useState } from "react";
import { Lock, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import PremiumModal from "@/components/paywall/PremiumModal";

interface Props {
  lockedCount: number;
  label?: string;
  onUpgrade?: () => void;
}

export default function LockedContentOverlay({ lockedCount, label, onUpgrade }: Props) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleClick = () => {
    if (onUpgrade) {
      onUpgrade();
    } else {
      setModalOpen(true);
    }
  };

  return (
    <>
      <div className="mt-3 rounded-xl border border-[hsl(var(--gold))]/20 bg-gradient-to-b from-[hsl(var(--gold))]/5 to-[hsl(var(--gold))]/10 p-4 text-center">
        <Lock className="mx-auto mb-1.5 h-5 w-5 text-[hsl(var(--gold))]" />
        <p className="text-xs font-bold">
          🔒 +{lockedCount} {label || "sadržaja"} zaključano
        </p>
        <p className="mt-0.5 text-[11px] text-muted-foreground">
          Dostupno sa Premium pretplatom
        </p>
        <Button
          onClick={handleClick}
          className="mt-3 h-9 w-full rounded-xl bg-[hsl(var(--gold))] text-xs font-bold text-white shadow-[0_4px_20px_hsl(var(--gold)/0.3)] hover:bg-[hsl(var(--gold-light))]"
        >
          <Crown className="mr-1.5 h-3.5 w-3.5" /> Otključaj Premium
        </Button>
      </div>
      <PremiumModal isOpen={modalOpen} onClose={() => setModalOpen(false)} trigger="kurs" />
    </>
  );
}
