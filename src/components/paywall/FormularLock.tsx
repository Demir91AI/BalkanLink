import { useState } from "react";
import { Lock, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import PremiumModal from "./PremiumModal";
import PlusCtaLabel from "@/components/paywall/PlusCtaLabel";

interface FormularLockProps {
  locked: boolean;
  formularId: string;
  children: React.ReactNode;
}

export default function FormularLock({ locked, formularId, children }: FormularLockProps) {
  const [modalOpen, setModalOpen] = useState(false);

  if (!locked) return <>{children}</>;

  return (
    <>
      <div className="relative">
        {/* First visible section (unblurred) + rest blurred */}
        <div className="relative">
          {/* Show some content unblurred then blur */}
          <div className="max-h-48 overflow-hidden">{children}</div>
          <div
            className="pointer-events-none select-none"
            style={{ filter: "blur(4px)" }}
            aria-hidden="true"
          >
            <div className="h-64 overflow-hidden opacity-30">{children}</div>
          </div>
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 top-48 z-10 flex items-start justify-center pt-8 rounded-b-2xl bg-gradient-to-t from-background via-background/95 to-transparent">
          <div className="flex flex-col items-center gap-3 px-6 text-center max-w-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[hsl(var(--gold))]/10 ring-1 ring-[hsl(var(--gold))]/20">
              <Lock className="h-5 w-5 text-[hsl(var(--gold))]" />
            </div>
            <p className="text-sm font-bold">
              Kompletan formular je dostupan uz Premium ili jednokratnu kupovinu
            </p>

            <div className="flex flex-col gap-2 w-full">
              {/* Single purchase */}
              <div>
                <Button
                  onClick={() => setModalOpen(true)}
                  variant="outline"
                  className="h-10 w-full rounded-xl text-xs font-semibold"
                >
                  Otključaj ovaj formular — 3.99€
                </Button>
                <p className="mt-0.5 text-[10px] text-muted-foreground">Jednokratni pristup, zauvijek</p>
              </div>

              {/* Premium */}
              <div className="relative">
                <Button
                  onClick={() => setModalOpen(true)}
                  className="h-10 w-full rounded-xl bg-[hsl(var(--gold))] text-xs font-bold text-white hover:bg-[hsl(var(--gold-light))]"
                >
                  <Crown className="mr-1.5 h-3.5 w-3.5" />
                  <PlusCtaLabel />
                </Button>
                <span className="absolute -top-2 right-2 rounded-full bg-[hsl(var(--gold))] px-2 py-0.5 text-[8px] font-bold text-white">
                  POPULARNO
                </span>
                <p className="mt-0.5 text-[10px] text-muted-foreground">
                  Pristup svim formularima i vodičima
                </p>
              </div>

              {/* Login */}
              <button
                onClick={() => setModalOpen(true)}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Već imam Premium — Prijavi se
              </button>
            </div>
          </div>
        </div>
      </div>
      <PremiumModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        trigger="formular"
        formularId={formularId}
      />
    </>
  );
}
