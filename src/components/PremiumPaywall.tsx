import { Link } from "react-router-dom";
import { Crown, Lock, FileText, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type PaywallVariant = "smart-guide" | "doc-generator" | "ai-limit" | "generic";

interface PremiumPaywallProps {
  variant?: PaywallVariant;
  /** For inline overlay on top of content */
  overlay?: boolean;
  className?: string;
}

const CONTENT: Record<PaywallVariant, { icon: typeof Lock; title: string; subtitle: string; cta: string; previewCta?: string }> = {
  "smart-guide": {
    icon: Lock,
    title: "Popuni zahtjev korektno i bez grešaka.",
    subtitle: "Otključaj Premium i dobij kompletno uputstvo korak po korak.",
    cta: "Aktiviraj Premium",
    previewCta: "Pogledaj primjer",
  },
  "doc-generator": {
    icon: FileText,
    title: "Kreiraj gotove dokumente u sekundama.",
    subtitle: "Profesionalni DIN 5008 dokumenti za Njemačku — samo sa Premium.",
    cta: "Aktiviraj Premium",
  },
  "ai-limit": {
    icon: Zap,
    title: "Dostigao/la si dnevni limit.",
    subtitle: "Sa Premium dobijaš neograničenu pomoć i personalizirane odgovore.",
    cta: "Aktiviraj Premium",
  },
  generic: {
    icon: Crown,
    title: "Ovaj sadržaj je dio BalkanLink Premium.",
    subtitle: "Otključaj kompletne upute, formulare i ličnu podršku.",
    cta: "Otključaj Premium",
  },
};

export default function PremiumPaywall({ variant = "generic", overlay = false, className }: PremiumPaywallProps) {
  const { user } = useAuth();
  const c = CONTENT[variant];
  const Icon = c.icon;

  const inner = (
    <div className={cn(
      "flex flex-col items-center justify-center text-center px-6 py-10",
      overlay && "rounded-2xl border border-[hsl(var(--gold))]/20 bg-gradient-to-b from-background/95 to-muted/80 backdrop-blur-md shadow-xl",
      !overlay && "rounded-2xl border border-[hsl(var(--gold))]/15 bg-gradient-to-b from-muted/60 to-muted/30 backdrop-blur-sm",
      className
    )}>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[hsl(var(--gold))]/10 ring-1 ring-[hsl(var(--gold))]/20"
      >
        <Icon className="h-7 w-7 text-[hsl(var(--gold))]" />
      </motion.div>

      <motion.p
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mb-1.5 text-sm font-bold leading-snug"
      >
        {c.title}
      </motion.p>

      <motion.p
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="mb-6 max-w-xs text-xs text-muted-foreground leading-relaxed"
      >
        {c.subtitle}
      </motion.p>

      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col items-center gap-2"
      >
        <Button className="btn-gold-gradient rounded-xl px-6 shadow-md" asChild>
          <Link to={user ? "/premium" : "/login"}>
            <Crown className="mr-2 h-4 w-4" />
            {c.cta}
          </Link>
        </Button>
        <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-300">
          🎁 7 dana besplatno — samo danas
        </span>
      </motion.div>
    </div>
  );

  if (overlay) {
    return (
      <div className="relative">
        {/* Overlay covering locked content */}
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-background/60 backdrop-blur-[6px] rounded-2xl">
          {inner}
        </div>
      </div>
    );
  }

  return inner;
}

/**
 * Wraps content and shows a blur overlay + paywall after N visible children.
 * Used for Smart Guide steps.
 */
export function StepLockOverlay({
  locked,
  children,
}: {
  locked: boolean;
  children: React.ReactNode;
}) {
  if (!locked) return <>{children}</>;

  return (
    <div className="relative">
      {/* Blurred teaser of actual content */}
      <div className="pointer-events-none select-none blur-[6px] opacity-30 max-h-64 overflow-hidden" aria-hidden="true">
        {children}
      </div>
      {/* Overlay */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <PremiumPaywall variant="smart-guide" overlay />
      </div>
    </div>
  );
}
