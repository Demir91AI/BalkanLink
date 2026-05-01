import { useEffect, useState } from "react";

const TRIGGER_DISTANCE = 96;
const MAX_VISUAL_DISTANCE = 92;

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  return !!target.closest("input, textarea, select, [contenteditable='true']");
}

export function usePullToRefresh() {
  const [distance, setDistance] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    let startY: number | null = null;
    let active = false;

    const onTouchStart = (event: TouchEvent) => {
      if (refreshing || isEditableTarget(event.target) || window.scrollY > 0) {
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
        setDistance(0);
        return;
      }
      setDistance(Math.min(MAX_VISUAL_DISTANCE, delta * 0.55));
    };

    const onTouchEnd = () => {
      if (!active) return;
      const shouldRefresh = distance >= TRIGGER_DISTANCE * 0.55;
      active = false;
      startY = null;

      if (shouldRefresh) {
        setRefreshing(true);
        setDistance(56);
        window.location.reload();
      } else {
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
  }, [distance, refreshing]);

  return { distance, refreshing };
}
