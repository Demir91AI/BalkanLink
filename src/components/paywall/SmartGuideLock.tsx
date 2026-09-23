import { useState } from "react";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import PremiumModal from "./PremiumModal";
import PlusCtaLabel from "@/components/paywall/PlusCtaLabel";

interface SmartGuideLockProps {
  locked: boolean;
  children: React.ReactNode;
}

export default function SmartGuideLock({ locked, children }: SmartGuideLockProps) {
  const [modalOpen, setModalOpen] = useState(false);

  if (!locked) return <>{children}</>;

  return (
    <>
      <div className="relative">
        {/* Blurred content */}
        <div
          className="pointer-events-none select-none max-h-72 overflow-hidden"
          style={{ filter: "blur(4px)" }}
          aria-hidden="true"
        >
          {children}
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-background/60 backdrop-blur-[2px]">
          <div className="flex flex-col items-center gap-3 px-6 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[hsl(var(--gold))]/10 ring-1 ring-[hsl(var(--gold))]/20">
              <Lock className="h-5 w-5 text-[hsl(var(--gold))]" />
            </div>
            <p className="text-sm font-bold">Ovaj korak je dostupan Premium korisnicima</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                onClick={() => setModalOpen(true)}
                className="h-9 rounded-xl bg-[hsl(var(--gold))] text-xs font-bold text-white hover:bg-[hsl(var(--gold-light))]"
              >
                <PlusCtaLabel />
              </Button>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" className="h-9 rounded-xl text-xs text-muted-foreground">
                    Nastavi bez Premium →
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="max-w-[220px] text-xs">
                  Besplatni korisnici imaju pristup samo prvom koraku svakog vodiča
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
      <PremiumModal isOpen={modalOpen} onClose={() => setModalOpen(false)} trigger="guide" />
    </>
  );
}
