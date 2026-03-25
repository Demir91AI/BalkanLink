import { useRef, useEffect, useCallback } from "react";
import { Megaphone, Mail, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import flowPlaceholder from "@/assets/flow-ad-placeholder.png";

const MAILTO_AD = `mailto:kontakt@balkanlink.de?subject=${encodeURIComponent("Oglašavanje na BalkanLink")}&body=${encodeURIComponent(
  "Pozdrav,\n\nZanima me oglašavanje na BalkanLink platformi.\n\nNaziv firme:\nVrsta usluge:\nGrad:\nBudžet:\n"
)}`;

const SLIDE_COUNT = 8;
const ITEM_WIDTH = 208; // w-52 = 208px

export function AdFlowBanner() {
  const { t } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const autoTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const userInteractedRef = useRef(false);

  const scroll = useCallback((dir: number) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * ITEM_WIDTH, behavior: "smooth" });
  }, []);

  // Pause auto-scroll on user interaction, resume after 6s idle
  const onUserInteract = useCallback(() => {
    userInteractedRef.current = true;
    if (autoTimerRef.current) {
      clearInterval(autoTimerRef.current);
      autoTimerRef.current = null;
    }
    // Resume auto after 6s
    setTimeout(() => {
      userInteractedRef.current = false;
      startAuto();
    }, 6000);
  }, []);

  const startAuto = useCallback(() => {
    if (autoTimerRef.current) return;
    autoTimerRef.current = setInterval(() => {
      if (userInteractedRef.current) return;
      const el = scrollRef.current;
      if (!el) return;
      // If near end, loop back
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 20) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: ITEM_WIDTH, behavior: "smooth" });
      }
    }, 4000);
  }, []);

  useEffect(() => {
    startAuto();
    return () => {
      if (autoTimerRef.current) clearInterval(autoTimerRef.current);
    };
  }, [startAuto]);

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
        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-[hsl(215,55%,5%)] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-[hsl(215,55%,7%)] to-transparent" />

        {/* Nav buttons */}
        <button
          onClick={() => { onUserInteract(); scroll(-1); }}
          className="absolute left-1 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-1.5 text-white/60 backdrop-blur-sm transition hover:bg-white/20 hover:text-white"
          aria-label="Previous"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          onClick={() => { onUserInteract(); scroll(1); }}
          className="absolute right-1 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-1.5 text-white/60 backdrop-blur-sm transition hover:bg-white/20 hover:text-white"
          aria-label="Next"
        >
          <ChevronRight className="h-4 w-4" />
        </button>

        {/* Scrollable container */}
        <div
          ref={scrollRef}
          onTouchStart={onUserInteract}
          onMouseDown={onUserInteract}
          onWheel={onUserInteract}
          className="flex gap-4 overflow-x-auto px-10 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollBehavior: "smooth", WebkitOverflowScrolling: "touch" }}
        >
          {Array.from({ length: SLIDE_COUNT }).map((_, i) => (
            <a
              key={i}
              href={MAILTO_AD}
              className="group flex w-52 shrink-0 snap-start flex-col overflow-hidden rounded-xl border border-white/8 bg-white/[0.03] transition-all duration-300 hover:border-[hsl(var(--gold)/0.3)] hover:bg-white/[0.06]"
            >
              <div className="flex h-28 items-center justify-center overflow-hidden bg-[hsl(215,55%,8%)]">
                <img
                  src={flowPlaceholder}
                  alt="BalkanLink"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  width={208}
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
