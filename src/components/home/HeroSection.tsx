import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLocalizedNavigate } from "@/hooks/useLocalizedHref";

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

  const trustBadges = [
    t("home.trustBadges.officialSources"),
    t("home.trustBadges.updated"),
    t("home.trustBadges.stepByStep"),
  ];

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
