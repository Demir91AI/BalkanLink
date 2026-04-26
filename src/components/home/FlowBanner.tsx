import { useRef, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import imgFormulari from "@/assets/carousel/formulari.jpg";
import imgVisa from "@/assets/carousel/visa.jpg";
import imgDeutsch from "@/assets/carousel/deutsch.jpg";
import imgDokumente from "@/assets/carousel/dokumente.jpg";
import imgGeld from "@/assets/carousel/geld.jpg";
import imgKalkulatori from "@/assets/carousel/kalkulatori.jpg";
import imgOglasi from "@/assets/carousel/oglasi.jpg";

const flowItemsBase = [
  { icon: "📄", key: "forms", badge: "premium" as const, to: "/formulari", image: imgFormulari },
  { icon: "🌍", key: "visa", badge: "premium" as const, to: "/viza", image: imgVisa },
  { icon: "🇩🇪", key: "german", badge: "premium" as const, to: "/deutsch-trainer", image: imgDeutsch },
  { icon: "📑", key: "docs", badge: "premium" as const, to: "/dokumenten-check", image: imgDokumente },
  { icon: "💶", key: "money", badge: null, to: "/formulari", image: imgGeld },
  { icon: "🧮", key: "calc", badge: null, to: "/kalkulatori", image: imgKalkulatori },
  { icon: "💼", key: "ads", badge: "free" as const, to: "/nudim-trazim", image: imgOglasi },
];

export default function FlowBanner() {
  const { t } = useTranslation("pages");
  const flowItems = flowItemsBase.map((it) => ({
    ...it,
    title: t(`home.flowBanner.items.${it.key}.title`),
    text: t(`home.flowBanner.items.${it.key}.text`),
  }));
  const [activeIndex, setActiveIndex] = useState(0);
  const totalItems = flowItems.length;
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef(0);

  const goTo = useCallback((index: number) => {
    setActiveIndex(((index % totalItems) + totalItems) % totalItems);
  }, [totalItems]);

  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  useEffect(() => {
    autoplayRef.current = setInterval(next, 4500);
    return () => { if (autoplayRef.current) clearInterval(autoplayRef.current); };
  }, [next]);

  const resetAutoplay = useCallback(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(next, 4500);
  }, [next]);

  const handlePrev = () => { prev(); resetAutoplay(); };
  const handleNext = () => { next(); resetAutoplay(); };

  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { diff > 0 ? handleNext() : handlePrev(); }
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [activeIndex]);

  const getOffset = (index: number) => {
    let diff = index - activeIndex;
    if (diff > totalItems / 2) diff -= totalItems;
    if (diff < -totalItems / 2) diff += totalItems;
    return diff;
  };

  const visibleRange = 3;

  return (
    <section
      className="relative overflow-hidden"
      style={{
        minHeight: "clamp(520px, 90vh, 960px)",
        background: "radial-gradient(ellipse 130% 90% at 50% 35%, hsl(220 50% 11%) 0%, hsl(220 55% 5%) 65%, hsl(220 60% 3%) 100%)",
      }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px] opacity-25"
        style={{
          width: 600,
          height: 500,
          background: flowItems[activeIndex].badge === "premium"
            ? "radial-gradient(circle, hsla(43,70%,55%,0.45) 0%, transparent 70%)"
            : "radial-gradient(circle, hsla(220,60%,40%,0.25) 0%, transparent 70%)",
        }}
      />

      {/* Headline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 pt-16 sm:pt-24 pb-8 sm:pb-12 text-center px-4"
      >
        <h2 className="text-2xl sm:text-4xl lg:text-6xl font-black text-white tracking-tight leading-tight px-2">
          {t("home.flowBanner.heading")}
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-white/45 mt-4 leading-relaxed max-w-xl mx-auto">
          {t("home.flowBanner.subline")}
        </p>
        <div className="mx-auto mt-6 h-[3px] w-24 rounded-full bg-gradient-to-r from-[hsl(var(--gold))] to-[hsl(var(--brand-orange))]" />
      </motion.div>

      {/* Carousel */}
      <div className="relative z-10 flex items-center justify-center" style={{ height: "clamp(360px, 50vh, 520px)" }}>
        {/* Nav arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-2 sm:left-8 z-30 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 backdrop-blur-sm transition hover:bg-white/10 hover:text-white"
          aria-label={t("home.flowBanner.prev")}
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-2 sm:right-8 z-30 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 backdrop-blur-sm transition hover:bg-white/10 hover:text-white"
          aria-label={t("home.flowBanner.next")}
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Cards */}
        <div className="relative w-full flex items-center justify-center" style={{ perspective: 1400 }}>
          {flowItems.map((item, i) => {
            const offset = getOffset(i);
            const isMob = typeof window !== 'undefined' && window.innerWidth < 640;
            if (isMob && Math.abs(offset) > 0) return null;
            if (!isMob && Math.abs(offset) > visibleRange) return null;

            const isCenter = offset === 0;
            const isPremium = item.badge === "premium";
            const absOffset = Math.abs(offset);

            const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
            const scale = isCenter ? 1.2 : Math.max(0.6, 1 - absOffset * 0.18);
            const translateX = offset * (isCenter ? 0 : (isMobile ? 400 : 320));
            const zIndex = 20 - absOffset;
            const opacity = isCenter ? 1 : Math.max(0.25, 1 - absOffset * 0.35);
            const blur = isCenter ? 0 : absOffset * 2;

            const cardW = isCenter ? (isMobile ? Math.min(window.innerWidth - 32, 340) : 420) : (isMobile ? 0 : 340);
            const cardH = isCenter ? (isMobile ? 380 : 440) : (isMobile ? 340 : 340);

            return (
              <motion.div
                key={item.title}
                animate={{
                  x: translateX,
                  scale,
                  opacity,
                  filter: `blur(${blur}px)`,
                }}
                transition={{ type: "spring", stiffness: 240, damping: 26 }}
                className="absolute cursor-pointer"
                style={{ zIndex, width: cardW, maxWidth: '100vw' }}
                onClick={() => {
                  if (!isCenter) { goTo(i); resetAutoplay(); }
                }}
              >
                <Link
                  to={isCenter ? item.to : "#"}
                  onClick={(e) => { if (!isCenter) e.preventDefault(); }}
                  className={`group relative flex flex-col justify-end overflow-hidden rounded-[28px] transition-all duration-300 border ${
                    isCenter && isPremium
                      ? "border-[hsla(43,70%,55%,0.7)] shadow-[0_24px_80px_rgba(0,0,0,0.5),0_0_60px_hsla(43,70%,55%,0.25)]"
                      : isCenter
                        ? "border-white/20 shadow-[0_24px_60px_rgba(0,0,0,0.4)]"
                        : isPremium
                          ? "border-[hsla(43,70%,53%,0.2)] shadow-[0_12px_40px_rgba(0,0,0,0.3)]"
                          : "border-white/8 shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
                  } ${isCenter ? "hover:-translate-y-3" : ""}`}
                  style={{ minHeight: cardH }}
                >
                  {/* Background image */}
                  <div className="absolute inset-0">
                    <img
                      src={item.image}
                      alt=""
                      className="h-full w-full object-cover"
                      loading={i === 0 ? undefined : "lazy"}
                      width={960}
                      height={640}
                    />
                    {/* Dark gradient overlay */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: isPremium
                          ? "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.15) 100%)"
                          : "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.1) 100%)",
                      }}
                    />
                  </div>

                  {/* Premium glow */}
                  {isPremium && isCenter && (
                    <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[hsla(43,70%,53%,0.15)] blur-3xl pointer-events-none" />
                  )}

                  {/* Badge */}
                  {isPremium && (
                    <span
                      className={`absolute top-5 right-5 rounded-full px-3 py-1.5 text-[11px] font-black uppercase tracking-wider z-10 ${
                        isCenter ? "text-[hsl(220,50%,8%)]" : "text-[hsl(220,50%,10%)]"
                      }`}
                      style={{
                        background: isCenter
                          ? "linear-gradient(135deg, #FFD700 0%, #FFB800 100%)"
                          : "linear-gradient(135deg, #C9A84C 0%, #B8942E 100%)",
                        boxShadow: isCenter
                          ? "0 8px 24px rgba(255,200,0,0.4)"
                          : "0 4px 12px rgba(200,168,76,0.2)",
                      }}
                    >
                      ⭐ {t("home.flowBanner.premium").replace("⭐ ", "")}
                    </span>
                  )}
                  {item.badge === "free" && (
                    <span className="absolute top-5 right-5 z-10 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[11px] font-bold text-white/70 backdrop-blur-sm">
                      {t("home.flowBanner.free")}
                    </span>
                  )}

                  {/* Content — bottom-left */}
                  <div className="relative z-10 p-5 sm:p-8">
                    <span className={`block mb-2 ${isCenter ? "text-[44px]" : "text-[32px]"}`}>
                      {item.icon}
                    </span>
                    <h3 className={`font-black text-white mb-2 leading-tight ${
                      isCenter ? "text-[26px] sm:text-[28px]" : "text-[18px] sm:text-[20px] text-white/90"
                    }`}>
                      {item.title}
                    </h3>
                    <p className={`leading-relaxed max-w-[85%] ${
                      isCenter ? "text-[16px] text-white/75" : "text-[13px] text-white/55"
                    }`}>
                      {item.text}
                    </p>

                    {/* CTA */}
                    {isCenter && (
                      <span
                        className={`mt-5 inline-flex items-center gap-2 rounded-full px-6 py-3 font-extrabold text-[15px] transition-all duration-200 group-hover:translate-x-1 group-hover:shadow-lg ${
                          isPremium
                            ? "text-[hsl(220,50%,8%)]"
                            : "text-white bg-white/10 border border-white/15"
                        }`}
                        style={isPremium ? {
                          background: "linear-gradient(135deg, #FFD700 0%, #FFB800 100%)",
                          boxShadow: "0 8px 28px rgba(255,200,0,0.35)",
                        } : undefined}
                      >
                        {isPremium ? t("home.flowBanner.ctaPremium") : t("home.flowBanner.ctaOpen")} <ArrowRight className="h-4 w-4" />
                      </span>
                    )}
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Dot indicators */}
      <div className="relative z-10 flex justify-center gap-2.5 pt-8 pb-6">
        {flowItems.map((item, i) => (
          <button
            key={i}
            onClick={() => { goTo(i); resetAutoplay(); }}
            className={`rounded-full transition-all duration-400 ${
              i === activeIndex
                ? item.badge === "premium"
                  ? "h-2.5 w-8 bg-[hsl(var(--gold))] shadow-[0_0_10px_hsla(43,70%,55%,0.5)]"
                  : "h-2.5 w-8 bg-white/80"
                : "h-2.5 w-2.5 bg-white/20 hover:bg-white/35"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* CTA below */}
      <div className="relative z-10 text-center pb-16 sm:pb-24">
        <Link
          to="/formulari"
          className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-[15px] font-extrabold text-[hsl(220,50%,8%)] transition-all duration-200 hover:-translate-y-1 hover:scale-[1.04] active:scale-[0.98]"
          style={{
            background: "linear-gradient(135deg, hsl(var(--gold)) 0%, hsl(var(--brand-orange)) 100%)",
            boxShadow: "0 12px 40px hsla(43,70%,55%,0.35)",
          }}
        >
          {t("home.flowBanner.ctaStart")}
          <ArrowRight className="h-4 w-4" />
        </Link>
        <p className="text-xs text-white/40 mt-3">{t("home.flowBanner.registerNote")}</p>
      </div>

      {/* Bottom edge fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[hsl(220,55%,5%)] to-transparent pointer-events-none" />
    </section>
  );
}
