import { useRef, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const flowItems = [
  { icon: "📄", title: "Formulari", text: "Popuni bez greške — korak po korak", badge: "premium", to: "/formulari", primary: true },
  { icon: "🌍", title: "Viza", text: "Pronađi pravi put za dolazak u Njemačku", badge: "premium", to: "/dolazak/boravisna-dozvola" },
  { icon: "🇩🇪", title: "Njemački", text: "Uči kroz stvarne situacije (A1–C2)", badge: "premium", to: "/deutsch-trainer" },
  { icon: "📑", title: "Dokumenti", text: "Provjeri pisma i dokumente iz Njemačke", badge: "premium", to: "/dokumenten-check" },
  { icon: "💶", title: "Novčana pomoć", text: "Bürgergeld, Wohngeld i dodaci", badge: null, to: "/formulari" },
  { icon: "🧮", title: "Kalkulatori", text: "Izračunaj platu, poreze i više", badge: null, to: "/kalkulatori" },
  { icon: "💼", title: "Oglasi", text: "Nađi posao ili objavi oglas", badge: "free", to: "/nudim-trazim" },
];

export default function FlowBanner() {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalItems = flowItems.length;
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef(0);

  const goTo = useCallback((index: number) => {
    setActiveIndex(((index % totalItems) + totalItems) % totalItems);
  }, [totalItems]);

  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  // Autoplay
  useEffect(() => {
    autoplayRef.current = setInterval(next, 4000);
    return () => { if (autoplayRef.current) clearInterval(autoplayRef.current); };
  }, [next]);

  const resetAutoplay = useCallback(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(next, 4000);
  }, [next]);

  const handlePrev = () => { prev(); resetAutoplay(); };
  const handleNext = () => { next(); resetAutoplay(); };

  // Touch/swipe
  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) handleNext(); else handlePrev();
    }
  };

  // Keyboard
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [activeIndex]);

  // Get position relative to center: -3..0..+3
  const getOffset = (index: number) => {
    let diff = index - activeIndex;
    if (diff > totalItems / 2) diff -= totalItems;
    if (diff < -totalItems / 2) diff += totalItems;
    return diff;
  };

  // Visible range: show 5 cards max
  const visibleRange = 3;

  return (
    <section
      className="relative overflow-hidden"
      style={{
        minHeight: "clamp(520px, 72vh, 780px)",
        background: "radial-gradient(ellipse 120% 80% at 50% 40%, hsl(220 50% 12%) 0%, hsl(220 55% 6%) 70%, hsl(220 60% 4%) 100%)",
      }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Ambient glow behind center card */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px] opacity-30"
        style={{
          width: 500,
          height: 400,
          background: flowItems[activeIndex].badge === "premium"
            ? "radial-gradient(circle, hsla(43,70%,55%,0.4) 0%, transparent 70%)"
            : "radial-gradient(circle, hsla(220,60%,40%,0.25) 0%, transparent 70%)",
        }}
      />

      {/* Headline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 pt-14 sm:pt-20 pb-6 sm:pb-10 text-center px-4"
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
          Šta želiš riješiti danas?
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-white/50 mt-3 leading-relaxed max-w-lg mx-auto">
          Riješi papirologiju bez stresa — bez lutanja i bez grešaka
        </p>
        <div className="mx-auto mt-5 h-[3px] w-20 rounded-full bg-gradient-to-r from-[hsl(var(--gold))] to-[hsl(var(--brand-orange))]" />
      </motion.div>

      {/* Carousel */}
      <div className="relative z-10 flex items-center justify-center" style={{ height: "clamp(280px, 42vh, 420px)" }}>
        {/* Nav arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-2 sm:left-6 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 backdrop-blur-sm transition hover:bg-white/10 hover:text-white"
          aria-label="Prethodni"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-2 sm:right-6 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 backdrop-blur-sm transition hover:bg-white/10 hover:text-white"
          aria-label="Sljedeći"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Cards */}
        <div className="relative w-full flex items-center justify-center" style={{ perspective: 1200 }}>
          {flowItems.map((item, i) => {
            const offset = getOffset(i);
            if (Math.abs(offset) > visibleRange) return null;

            const isCenter = offset === 0;
            const isPremium = item.badge === "premium";
            const absOffset = Math.abs(offset);

            // Sizing & positioning
            const scale = isCenter ? 1.12 : Math.max(0.65, 1 - absOffset * 0.15);
            const translateX = offset * (isCenter ? 0 : 280);
            const zIndex = 20 - absOffset;
            const opacity = isCenter ? 1 : Math.max(0.3, 1 - absOffset * 0.3);
            const blur = isCenter ? 0 : absOffset * 1.5;

            // Card dimensions
            const cardW = isCenter ? 300 : 260;
            const cardH = isCenter ? 320 : 260;

            return (
              <motion.div
                key={item.title}
                animate={{
                  x: translateX,
                  scale,
                  opacity,
                  filter: `blur(${blur}px)`,
                }}
                transition={{ type: "spring", stiffness: 260, damping: 28 }}
                className="absolute cursor-pointer"
                style={{ zIndex, width: cardW }}
                onClick={() => {
                  if (!isCenter) { goTo(i); resetAutoplay(); }
                }}
              >
                <Link
                  to={isCenter ? item.to : "#"}
                  onClick={(e) => { if (!isCenter) e.preventDefault(); }}
                  className={`group relative flex flex-col overflow-hidden rounded-[24px] p-6 transition-all duration-300 border ${
                    isCenter && isPremium
                      ? "border-[hsla(43,70%,55%,0.6)] shadow-[0_20px_60px_rgba(0,0,0,0.4),0_0_40px_hsla(43,70%,55%,0.2)]"
                      : isCenter
                        ? "border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
                        : isPremium
                          ? "border-[hsla(43,70%,53%,0.25)] shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
                          : "border-white/8 shadow-[0_8px_24px_rgba(0,0,0,0.2)]"
                  } ${isCenter ? "hover:-translate-y-2" : ""}`}
                  style={{
                    minHeight: cardH,
                    background: isPremium
                      ? isCenter
                        ? "linear-gradient(160deg, hsl(220,50%,12%) 0%, hsl(225,48%,8%) 100%)"
                        : "linear-gradient(160deg, hsl(220,50%,10%) 0%, hsl(225,45%,7%) 100%)"
                      : "linear-gradient(180deg, rgba(18,30,58,0.9) 0%, rgba(20,35,65,0.85) 100%)",
                  }}
                >
                  {/* Premium glow */}
                  {isPremium && isCenter && (
                    <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[hsla(43,70%,53%,0.1)] blur-3xl pointer-events-none" />
                  )}
                  <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-white/[0.015] blur-2xl pointer-events-none" />

                  {/* Badge */}
                  {isPremium && (
                    <span
                      className={`absolute top-4 right-4 rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wider ${
                        isCenter ? "text-[hsl(220,50%,8%)]" : "text-[hsl(220,50%,10%)]"
                      }`}
                      style={{
                        background: isCenter
                          ? "linear-gradient(135deg, #FFD700 0%, #FFB800 100%)"
                          : "linear-gradient(135deg, #C9A84C 0%, #B8942E 100%)",
                        boxShadow: isCenter
                          ? "0 6px 20px rgba(255,200,0,0.35)"
                          : "0 4px 12px rgba(200,168,76,0.2)",
                      }}
                    >
                      ⭐ PREMIUM
                    </span>
                  )}
                  {item.badge === "free" && (
                    <span className="absolute top-4 right-4 rounded-full border border-white/10 bg-white/[0.08] px-2.5 py-1 text-[10px] font-bold text-white/60">
                      Free
                    </span>
                  )}

                  {/* Content */}
                  <span className={`mb-3 ${isCenter ? "text-[40px]" : isPremium ? "text-[30px]" : "text-[26px]"}`}>
                    {item.icon}
                  </span>
                  <span className={`font-bold text-white mb-1.5 ${
                    isCenter ? "text-[22px]" : isPremium ? "text-[17px]" : "text-[15px] text-white/85"
                  }`}>
                    {item.title}
                  </span>
                  <span className={`leading-[1.5] max-w-[92%] ${
                    isCenter ? "text-[15px] text-white/70" : isPremium ? "text-[13px] text-white/60" : "text-[12px] text-white/45"
                  }`}>
                    {item.text}
                  </span>

                  {/* CTA */}
                  {isCenter && (
                    <span className={`mt-auto pt-4 font-bold flex items-center gap-1.5 transition-transform duration-200 group-hover:translate-x-1 ${
                      isPremium ? "text-[15px] text-[hsl(var(--gold))]" : "text-[14px] text-white/60"
                    }`}>
                      {isPremium ? "Započni" : "Otvori"} <ArrowRight className="h-4 w-4" />
                    </span>
                  )}
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Dot indicators */}
      <div className="relative z-10 flex justify-center gap-2 pt-6 pb-4">
        {flowItems.map((item, i) => (
          <button
            key={i}
            onClick={() => { goTo(i); resetAutoplay(); }}
            className={`rounded-full transition-all duration-400 ${
              i === activeIndex
                ? item.badge === "premium"
                  ? "h-2 w-7 bg-[hsl(var(--gold))] shadow-[0_0_8px_hsla(43,70%,55%,0.5)]"
                  : "h-2 w-7 bg-white/80"
                : "h-2 w-2 bg-white/20 hover:bg-white/35"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* CTA below */}
      <div className="relative z-10 text-center pb-14 sm:pb-20">
        <p className="text-sm text-white/35 mb-3">Ne znaš odakle početi?</p>
        <Link
          to="/formulari"
          className="inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-extrabold text-[hsl(220,50%,8%)] transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.03] active:scale-[0.985]"
          style={{
            background: "linear-gradient(135deg, hsl(var(--gold)) 0%, hsl(var(--brand-orange)) 100%)",
            boxShadow: "0 10px 30px hsla(43,70%,55%,0.3)",
          }}
        >
          Vodi me korak po korak
          <ArrowRight className="h-4 w-4" />
        </Link>
        <p className="text-xs text-white/25 mt-2.5">Počni od formulara i vodiča koji ti najviše trebaju</p>
      </div>

      {/* Bottom edge fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[hsl(220,55%,5%)] to-transparent pointer-events-none" />
    </section>
  );
}
