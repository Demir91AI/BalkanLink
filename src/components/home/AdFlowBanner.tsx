import { useRef, useEffect, useCallback, useState } from "react";
import { Megaphone, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import flowPlaceholder from "@/assets/flow-ad-placeholder.png";

const MAILTO_AD = `mailto:kontakt@balkanlink.de?subject=${encodeURIComponent("Oglašavanje na BalkanLink")}&body=${encodeURIComponent(
  "Pozdrav,\n\nZanima me oglašavanje na BalkanLink platformi.\n\nNaziv firme:\nVrsta usluge:\nGrad:\nBudžet:\n"
)}`;

const SLIDE_COUNT = 8;
const AUTO_SPEED = 0.5; // px per frame
const RESUME_DELAY = 4000;

export function AdFlowBanner() {
  const { t } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const pausedRef = useRef(false);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Duplicate items for infinite loop illusion
  const items = Array.from({ length: SLIDE_COUNT * 3 });

  // Auto-scroll animation loop
  const animate = useCallback(() => {
    const el = scrollRef.current;
    if (el && !pausedRef.current) {
      el.scrollLeft += AUTO_SPEED;
      // Loop: when past 2/3, jump back by 1/3 seamlessly
      const third = el.scrollWidth / 3;
      if (el.scrollLeft >= third * 2) {
        el.scrollLeft -= third;
      }
    }
    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    // Start scrolled at 1/3 so we can loop both directions
    const el = scrollRef.current;
    if (el) {
      el.scrollLeft = el.scrollWidth / 3;
    }
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [animate]);

  const pauseAuto = useCallback(() => {
    pausedRef.current = true;
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      pausedRef.current = false;
    }, RESUME_DELAY);
  }, []);

  return (
    <section className="relative overflow-hidden border-y border-white/[0.06] bg-gradient-to-b from-[hsl(215,55%,5%)] to-[hsl(215,55%,7%)]">
      <div className="container relative z-10 pt-8 pb-4 text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--gold)/0.2)] bg-[hsl(var(--gold)/0.06)] px-3 py-1">
          <Megaphone className="h-3 w-3 text-[hsl(var(--gold))]" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-[hsl(var(--gold))]">
            {t("ad.flowLabel")}
          </span>
        </div>
        <h3 className="font-heading text-lg font-extrabold text-white sm:text-xl">
          {t("ad.flowTitle")}
        </h3>
        <p className="mx-auto mt-1 max-w-md text-sm text-white/35">
          {t("ad.flowSubtitle")}
        </p>
      </div>

      <div className="relative py-5">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-[hsl(215,55%,5%)] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-[hsl(215,55%,7%)] to-transparent" />

        <div
          ref={scrollRef}
          onTouchStart={pauseAuto}
          onMouseDown={pauseAuto}
          className="flex gap-4 overflow-x-auto px-4 scrollbar-hide"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {items.map((_, i) => (
            <a
              key={i}
              href={MAILTO_AD}
              className="group flex w-48 shrink-0 flex-col overflow-hidden rounded-xl border border-white/8 bg-white/[0.03] transition-all duration-300 hover:border-[hsl(var(--gold)/0.3)] hover:bg-white/[0.06]"
            >
              <div className="flex h-28 items-center justify-center overflow-hidden bg-[hsl(215,55%,8%)]">
                <img
                  src={flowPlaceholder}
                  alt="BalkanLink"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  width={192}
                  height={112}
                />
              </div>
              <div className="px-2.5 py-2 text-center">
                <p className="text-[10px] font-bold text-white/80 group-hover:text-[hsl(var(--gold))] transition-colors leading-tight">
                  Mjesto za vašu reklamu
                </p>
                <p className="mt-0.5 flex items-center justify-center gap-1 text-[9px] text-white/30">
                  <Mail className="h-2 w-2" /> Kontaktirajte nas
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--gold)/0.15)] to-transparent" />
    </section>
  );
}
