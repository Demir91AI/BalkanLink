import { Lock, Crown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { initiateCheckout } from "@/lib/stripe";
import PlusCtaLabel from "@/components/paywall/PlusCtaLabel";
import { useNavigate } from "react-router-dom";
type Trigger = "formular" | "guide" | "ai" | "kurs" | "viza";

const TRIGGER_TEXT: Record<Trigger, { title: string; subtitle: string }> = {
  formular: {
    title: "Otključaj sve formulare uz BalkanLink Plus",
    subtitle: "Pristup svim Musterformularima, korak-po-korak vodičima i BalkanLink asistentu.",
  },
  guide: {
    title: "Nastavi korak po korak uz BalkanLink Plus",
    subtitle: "Kompletni vodiči sa detaljnim uputstvima za svaki korak.",
  },
  ai: {
    title: "BalkanLink Plus — jednokratno",
    subtitle: "Trajan pristup premium vodičima i formularima. Dokumenten-Check se plaća 1,99€ po provjeri.",
  },
  kurs: {
    title: "Nastavi učiti uz BalkanLink Plus",
    subtitle: "Otključaj sve lekcije i modula Deutsch kursa.",
  },
  viza: {
    title: "Detaljni Viza Navigator uz BalkanLink Plus",
    subtitle: "Kompletni vodič sa svim dokumentima, koracima i rokovima.",
  },
};

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
  trigger: Trigger;
  /** If trigger is "formular", pass formularId for single purchase */
  formularId?: string;
}

export default function PremiumModal({ isOpen, onClose, trigger, formularId }: PremiumModalProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const content = TRIGGER_TEXT[trigger];

  if (!isOpen) return null;

  const handlePremium = () => {
    if (!user) {
      onClose();
      navigate("/login");
      return;
    }
    initiateCheckout("plus");
  };

  const handlePricing = () => {
    onClose();
    navigate("/paketi");
  };

  return (
    <>
      <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <div className="relative w-full max-w-md rounded-2xl border border-border bg-background p-6 shadow-2xl">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-3 top-3 rounded-lg p-1 text-muted-foreground hover:bg-muted transition-colors"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Icon */}
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[hsl(var(--gold))]/10 ring-1 ring-[hsl(var(--gold))]/20">
            <Lock className="h-6 w-6 text-[hsl(var(--gold))]" />
          </div>

          {/* Text */}
          <h3 className="mb-1 text-center text-base font-bold">{content.title}</h3>
          <p className="mb-6 text-center text-sm text-muted-foreground">{content.subtitle}</p>

          {/* CTAs */}
          <div className="flex flex-col gap-3">
            {/* Premium CTA */}
            <Button
              onClick={handlePremium}
              className="h-12 w-full rounded-xl bg-[hsl(var(--gold))] text-sm font-bold text-white shadow-lg hover:bg-[hsl(var(--gold-light))]"
            >
              <Crown className="mr-2 h-4 w-4" />
              <PlusCtaLabel />
            </Button>

            {/* View pricing */}
            <button
              onClick={handlePricing}
              className="text-xs text-muted-foreground underline hover:text-foreground transition-colors"
            >
              Pogledaj sve planove i cijene
            </button>

            {/* Login CTA */}
            {!user && (
              <button
                onClick={() => { onClose(); navigate("/login"); }}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Već imam pristup — Prijavi se
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
