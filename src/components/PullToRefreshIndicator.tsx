import { Loader2, RotateCw } from "lucide-react";
import { usePullToRefresh } from "@/hooks/usePullToRefresh";

interface PullToRefreshIndicatorProps {
  distance?: number;
  refreshing?: boolean;
}

export default function PullToRefreshIndicator(props: PullToRefreshIndicatorProps = {}) {
  const internal = usePullToRefresh();
  const distance = props.distance ?? internal.distance;
  const refreshing = props.refreshing ?? internal.refreshing;

  const visible = distance > 4 || refreshing;
  const progress = Math.min(1, distance / 56);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed left-1/2 top-2 z-[1000] -translate-x-1/2 transition-opacity duration-150 md:hidden"
      style={{ opacity: visible ? 1 : 0, transform: `translate(-50%, ${Math.max(0, distance - 44)}px)` }}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[hsl(var(--gold))]/35 bg-[hsl(var(--popover))]/95 shadow-xl backdrop-blur-md">
        {refreshing ? (
          <Loader2 className="h-5 w-5 animate-spin text-[hsl(var(--gold))]" />
        ) : (
          <RotateCw
            className="h-5 w-5 text-[hsl(var(--gold))] transition-transform"
            style={{ transform: `rotate(${progress * 180}deg)` }}
          />
        )}
      </div>
    </div>
  );
}
