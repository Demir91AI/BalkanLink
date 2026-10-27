import MembershipOffer from "@/components/membership/MembershipOffer";
import { cn } from "@/lib/utils";

type PaywallVariant = "smart-guide" | "doc-generator" | "ai-limit" | "generic";

interface PremiumPaywallProps {
  variant?: PaywallVariant;
  /** For inline overlay on top of content */
  overlay?: boolean;
  className?: string;
}

export default function PremiumPaywall({ overlay = false, className }: PremiumPaywallProps) {
  const inner = <MembershipOffer variant="compact" className={cn(overlay && "shadow-xl", className)} />;
  if (overlay) {
    return (
      <div className="relative">
        <div className="absolute inset-0 z-20 flex items-center justify-center rounded-2xl bg-background/60 backdrop-blur-[6px]">{inner}</div>
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
