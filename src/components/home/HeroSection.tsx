import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLocalizedNavigate } from "@/hooks/useLocalizedHref";
import { BLIcon } from "@/components/BrandLogo";

const slides = [
  { image: "/assets/hero-frankfurt.jpg", city: "FRANKFURT" },
  { image: "/assets/hero-berlin.jpg", city: "BERLIN" },
  { image: "/assets/hero-muenchen.jpg", city: "MÜNCHEN" },
  { image: "/assets/hero-hamburg.jpg", city: "HAMBURG" },
  { image: "/assets/hero-koeln.jpg", city: "KÖLN" },
  { image: "/assets/hero-freilassing-real.jpg", city: "FREILASSING" },
  { image: "/assets/hero-stuttgart.jpg", city: "STUTTGART" },
  { image: "/assets/hero-duesseldorf.jpg", city: "DÜSSELDORF" },
  { image: "/assets/hero-nuernberg.jpg", city: "NÜRNBERG" },
  { image: "/assets/hero-leipzig.jpg", city: "LEIPZIG" },
];

const ease = [0.16, 1, 0.3, 1] as const;

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useLocalizedNavigate();
  const { t } = useTranslation("pages");
  const btnRef = useRef<HTMLButtonElement>(null);
  const [askValue, setAskValue] = useState("");
  const [placeholderIdx, setPlaceholderIdx] = useState(0);

  const trustBadges = [
    t("home.trustBadges.officialSources"),
    t("home.trustBadges.updated"),
    t("home.trustBadges.stepByStep"),
  ];

  const askPlaceholders = t("home.assistantCta.examples", { returnObjects: true }) as string[];

  // Rotate placeholder examples
  useEffect(() => {
    if (!Array.isArray(askPlaceholders) || askPlaceholders.length < 2) return;
    const id = setInterval(() => {
      setPlaceholderIdx((i) => (i + 1) % askPlaceholders.length);
    }, 2800);
    return () => clearInterval(id);
  }, [askPlaceholders]);

  const submitAsk = (prefill?: string) => {
    const value = (prefill ?? askValue).trim();
    window.dispatchEvent(new CustomEvent("open-assistant", { detail: { prefill: value || undefined } }));
    setAskValue("");
  };

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  /* Magnetic hover effect */
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 120) {
      const pull = (1 - dist / 120) * 8;
      btnRef.current.style.transform = `translate(${dx * pull / 120}px, ${dy * pull / 120}px)`;
    } else {
      btnRef.current.style.transform = "";
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (btnRef.current) btnRef.current.style.transform = "";
  }, []);

  return (
    <section
      className="relative min-h-[92vh] overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background slides with slow zoom */}
      {slides.map((slide, idx) => (
        <div
          key={idx}
          className="absolute inset-0 transition-opacity duration-[1500ms] ease-in-out"
          style={{ opacity: idx === currentSlide ? 1 : 0, zIndex: idx === currentSlide ? 1 : 0 }}
        >
          <img
            src={slide.image}
            alt={slide.city}
            className="h-full w-full object-cover"
            style={{
              filter: "brightness(0.55) saturate(1.15) contrast(1.05)",
              animation: idx === currentSlide ? "heroZoom 18s ease-in-out infinite alternate" : "none",
            }}
            loading={idx === 0 ? "eager" : "lazy"}
            fetchPriority={idx === 0 ? "high" : "auto"}
          />
        </div>
      ))}

      {/* Radial glow behind text area */}
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background: "radial-gradient(ellipse 70% 60% at 50% 45%, rgba(0,0,0,0.65) 0%, transparent 70%)",
        }}
      />

      {/* Bottom fade for depth */}
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background: "linear-gradient(to bottom, transparent 50%, rgba(2,6,23,0.85) 100%)",
        }}
      />

      {/* Side vignette */}
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background: "linear-gradient(90deg, rgba(2,6,23,0.5) 0%, transparent 25%, transparent 75%, rgba(2,6,23,0.5) 100%)",
        }}
      />

      {/* Noise texture */}
      <div
        className="absolute inset-0 z-[3] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
          opacity: 0.05,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-5 py-16 lg:py-20">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
          {/* Headline - staggered */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="font-heading font-[900] leading-[1.08] sm:whitespace-nowrap"
            style={{
              fontSize: "clamp(1.6rem, 4.2vw, 3.8rem)",
              background: "linear-gradient(135deg, #ffffff 20%, #D4AF37 60%, #F5D76E 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 4px 20px rgba(0,0,0,0.5))",
            }}
          >
            {t("home.heroHeadlineBeforeAccent")}{t("home.heroHeadlineAccent")}{t("home.heroHeadlineAfterAccent")}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease }}
            className="mx-auto mt-7 max-w-xl text-white/80 leading-relaxed"
            style={{ fontSize: "clamp(0.95rem, 1.8vw, 1.15rem)" }}
          >
            {t("home.heroSubline")}
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5, ease }}
            className="mt-10 flex flex-col sm:flex-row items-center gap-4"
          >
            <button
              ref={btnRef}
              onClick={() => navigate("/formulari")}
              className="relative group transition-all duration-200 will-change-transform active:scale-[0.97]"
              style={{
                background: "linear-gradient(135deg, hsl(var(--gold)) 0%, hsl(var(--gold-light)) 100%)",
                color: "#000",
                fontWeight: 800,
                padding: "15px 44px",
                borderRadius: 10,
                fontSize: "1rem",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              <span className="absolute inset-0 rounded-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ boxShadow: "0 0 30px hsla(43,70%,55%,0.5), 0 0 60px hsla(43,70%,55%,0.2)" }} />
              <span className="relative">{t("home.ctaPrimary")}</span>
            </button>
            <button
              onClick={() => navigate("/paketi")}
              className="transition-all duration-200 hover:bg-white/10 active:scale-[0.97]"
              style={{
                background: "transparent",
                border: "1.5px solid rgba(255,255,255,0.25)",
                color: "white",
                fontWeight: 600,
                padding: "15px 44px",
                borderRadius: 10,
                backdropFilter: "blur(8px)",
              }}
            >
              {t("home.ctaSecondary")}
            </button>
          </motion.div>

          {/* Disclaimer */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-10 text-white/40 text-[0.72rem]"
          >
            {t("home.disclaimer")}
          </motion.p>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-5 flex flex-wrap items-center justify-center gap-4"
          >
            {trustBadges.map((badge) => (
              <span
                key={badge}
                className="flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[0.8rem] font-medium text-white/90"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(212,175,55,0.25)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-[#D4AF37]" />
                {badge}
              </span>
            ))}
          </motion.div>

          {/* ─── Asistent CTA — premium glassmorphism card ─── */}
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.0, ease }}
            onClick={() => window.dispatchEvent(new CustomEvent("open-assistant"))}
            className="group relative mt-7 w-full max-w-md overflow-hidden rounded-2xl text-left transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--gold))]/60"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
              border: "1px solid rgba(212,175,55,0.22)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              boxShadow: "0 10px 40px -10px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
            aria-label={t("home.assistantCta.title")}
          >
            {/* subtle gold sheen sweep on hover */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[hsla(43,70%,55%,0.10)] to-transparent transition-transform duration-700 group-hover:translate-x-full"
            />
            {/* soft gold glow on hover */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{ boxShadow: "0 0 0 1px rgba(212,175,55,0.35), 0 0 40px -8px rgba(212,175,55,0.35)" }}
            />

            <div className="relative flex items-center gap-3.5 p-3.5 sm:gap-4 sm:p-4">
              {/* Icon orb */}
              <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                style={{
                  background: "linear-gradient(135deg, hsl(var(--gold)) 0%, hsl(var(--gold-dark)) 100%)",
                  boxShadow: "0 6px 20px -6px hsla(43,70%,55%,0.55)",
                }}
              >
                <Sparkles className="h-[18px] w-[18px] text-[#0a0a0a]" strokeWidth={2.4} />
                {/* pulsing live dot */}
                <span className="absolute -right-0.5 -top-0.5 flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-[hsl(215_55%_4%)]" />
                </span>
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[hsl(var(--gold))]">
                    📋 {t("home.assistantCta.badge")}
                  </span>
                </div>
                <p className="mt-0.5 truncate text-sm font-semibold text-white sm:text-[15px]">
                  {t("home.assistantCta.title")}
                </p>
                <p className="mt-0.5 truncate text-[11px] text-white/55 sm:text-xs">
                  {t("home.assistantCta.subtitle")}
                </p>
              </div>

              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition-all duration-300 group-hover:border-[hsl(var(--gold))]/40 group-hover:bg-[hsl(var(--gold))]/15 group-hover:text-[hsl(var(--gold))]">
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </div>
          </motion.button>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`rounded-full transition-all duration-500 ${
              idx === currentSlide
                ? "h-1.5 w-6 bg-[hsl(var(--gold))] shadow-[0_0_8px_hsla(43,52%,54%,0.5)]"
                : "h-1.5 w-1.5 bg-white/20 hover:bg-white/40"
            }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
