import { useRef, useCallback, useEffect } from "react";

/** rAF-based infinite auto-scroll with bidirectional swipe/drag support */
export function useInfiniteScroll(speed = 0.5, resumeDelay = 3000) {
  const ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);
  const pausedRef = useRef(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout>>();
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);

  const animate = useCallback(() => {
    const el = ref.current;
    if (el && !pausedRef.current) {
      el.scrollLeft += speed;
      const half = el.scrollWidth / 2;
      if (el.scrollLeft >= half) el.scrollLeft -= half;
      if (el.scrollLeft <= 0) el.scrollLeft += half;
    }
    rafRef.current = requestAnimationFrame(animate);
  }, [speed]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [animate]);

  const pause = useCallback(() => {
    pausedRef.current = true;
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
  }, []);

  const scheduleResume = useCallback(() => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => { pausedRef.current = false; }, resumeDelay);
  }, [resumeDelay]);

  const scrollByCard = useCallback((direction: "left" | "right") => {
    const el = ref.current;
    if (!el || !el.children.length) return;
    const firstCard = el.children[0] as HTMLElement;
    const cardWidth = firstCard.offsetWidth;
    const gap = parseInt(getComputedStyle(el).gap) || 20;
    const amount = (cardWidth + gap) * (direction === "right" ? 1 : -1);
    el.scrollBy({ left: amount, behavior: "smooth" });
    pause();
    scheduleResume();
  }, [pause, scheduleResume]);

  const onTouchStart = useCallback((e: React.TouchEvent) => { pause(); isDragging.current = true; dragStartX.current = e.touches[0].clientX; dragScrollLeft.current = ref.current?.scrollLeft ?? 0; }, [pause]);
  const onTouchMove = useCallback((e: React.TouchEvent) => { if (!isDragging.current || !ref.current) return; ref.current.scrollLeft = dragScrollLeft.current - (e.touches[0].clientX - dragStartX.current); }, []);
  const onTouchEnd = useCallback(() => { isDragging.current = false; scheduleResume(); }, [scheduleResume]);
  const onMouseDown = useCallback((e: React.MouseEvent) => { pause(); isDragging.current = true; dragStartX.current = e.clientX; dragScrollLeft.current = ref.current?.scrollLeft ?? 0; if (ref.current) ref.current.style.cursor = "grabbing"; e.preventDefault(); }, [pause]);
  const onMouseMove = useCallback((e: React.MouseEvent) => { if (!isDragging.current || !ref.current) return; ref.current.scrollLeft = dragScrollLeft.current - (e.clientX - dragStartX.current); }, []);
  const onMouseUp = useCallback(() => { isDragging.current = false; if (ref.current) ref.current.style.cursor = "grab"; scheduleResume(); }, [scheduleResume]);
  const onMouseLeave = useCallback(() => { if (isDragging.current) { isDragging.current = false; if (ref.current) ref.current.style.cursor = "grab"; } scheduleResume(); }, [scheduleResume]);

  return { ref, pause, scheduleResume, scrollByCard, onTouchStart, onTouchMove, onTouchEnd, onMouseDown, onMouseMove, onMouseUp, onMouseLeave };
}
