import { useEffect, useRef, useState } from "react";
import { touchMayPullToRefresh } from "@/lib/pull-to-refresh-guard";

const TRIGGER_DISTANCE = 96;
const MAX_VISUAL_DISTANCE = 92;

export function usePullToRefresh() {
  const [distance, setDistance] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const distanceRef = useRef(0);
  const refreshingRef = useRef(false);

  useEffect(() => {
    let startY: number | null = null;
    let active = false;

    const onTouchStart = (event: TouchEvent) => {
      // Never refresh from inside the assistant chat, dialogs, inner scroll areas or a scroll-locked page.
      if (!touchMayPullToRefresh(event.target, refreshingRef.current)) {
        startY = null;
        active = false;
        return;
      }
      startY = event.touches[0]?.clientY ?? null;
      active = true;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (!active || startY == null || window.scrollY > 0) return;
      const delta = (event.touches[0]?.clientY ?? startY) - startY;
      if (delta <= 0) {
        distanceRef.current = 0;
        setDistance(0);
        return;
      }
      const nextDistance = Math.min(MAX_VISUAL_DISTANCE, delta * 0.55);
      distanceRef.current = nextDistance;
      setDistance(nextDistance);
    };

    const onTouchEnd = () => {
      if (!active) return;
      const shouldRefresh = distanceRef.current >= TRIGGER_DISTANCE * 0.55;
      active = false;
      startY = null;

      if (shouldRefresh) {
        setRefreshing(true);
        refreshingRef.current = true;
        distanceRef.current = 56;
        setDistance(56);
        window.location.reload();
      } else {
        distanceRef.current = 0;
        setDistance(0);
      }
    };

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
    };
  }, []);

  return { distance, refreshing };
}
