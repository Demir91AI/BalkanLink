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
  const [typed, setTyped] = useState("");
  const [phraseKey, setPhraseKey] = useState(0);
  const [phraseVisible, setPhraseVisible] = useState(true);

  const trustBadges = [
    t("home.trustBadges.officialSources"),
    t("home.trustBadges.updated"),
    t("home.trustBadges.stepByStep"),
  ];

  const askPlaceholders = t("home.assistantCta.examples", { returnObjects: true }) as string[];

  // Typewriter effect for placeholder examples
  useEffect(() => {
    if (!Array.isArray(askPlaceholders) || askPlaceholders.length === 0) return;
    let i = 0;
    let charIdx = 0;
    let mode: "typing" | "pausing" | "deleting" = "typing";
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const current = askPlaceholders[i];
      if (mode === "typing") {
        charIdx++;
        setTyped(current.slice(0, charIdx));
        if (charIdx >= current.length) { mode = "pausing"; timer = setTimeout(tick, 1800); return; }
        timer = setTimeout(tick, 38 + Math.random() * 30);
      } else if (mode === "pausing") {
        mode = "deleting"; timer = setTimeout(tick, 30);
      } else {
        charIdx -= 2;
        if (charIdx <= 0) { charIdx = 0; setTyped(""); i = (i + 1) % askPlaceholders.length; mode = "typing"; timer = setTimeout(tick, 250); return; }
        setTyped(current.slice(0, charIdx));
        timer = setTimeout(tick, 18);
      }
    };
    timer = setTimeout(tick, 600);
    return () => clearTimeout(timer);
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

          {/* ─── Asistent — interactive ask bar ─── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.0, ease }}
            className="mt-7 w-full max-w-xl"
          >
            {/* Brand label above bar */}
            <div className="mb-2.5 flex items-center justify-center">
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.22em]"
                style={{
                  background: "linear-gradient(135deg, hsla(43,70%,55%,0.14), hsla(43,70%,55%,0.04))",
                  border: "1px solid hsla(43,70%,55%,0.30)",
                  color: "hsl(var(--gold))",
                  boxShadow: "0 0 24px -8px hsla(43,70%,55%,0.4)",
                }}
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                BalkanLinkAsistent
              </span>
            </div>

            {/* Ask bar — premium dual-glow */}
            <form
              onSubmit={(e) => { e.preventDefault(); submitAsk(); }}
              className="group relative rounded-[18px] transition-all duration-300 focus-within:-translate-y-0.5"
            >
              {/* Outer ambient gold glow (always visible, intensifies on focus) */}
              <span
                aria-hidden
                className="pointer-events-none absolute -inset-[2px] rounded-[20px] opacity-50 blur-md transition-opacity duration-500 group-hover:opacity-90 group-focus-within:opacity-100"
                style={{
                  background: "linear-gradient(120deg, hsla(43,70%,55%,0.55) 0%, hsla(220,80%,60%,0.0) 35%, hsla(43,70%,55%,0.0) 60%, hsla(43,70%,55%,0.55) 100%)",
                }}
              />
              {/* Bar surface */}
              <div
                className="relative overflow-hidden rounded-[18px]"
                style={{
                  background: "linear-gradient(135deg, rgba(20,28,48,0.85) 0%, rgba(8,12,24,0.85) 100%)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  backdropFilter: "blur(18px)",
                  WebkitBackdropFilter: "blur(18px)",
                  boxShadow: "0 18px 60px -18px rgba(0,0,0,0.75), inset 0 1px 0 rgba(255,255,255,0.07)",
                }}
              >
                {/* Sheen sweep on hover */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent transition-transform duration-1000 group-hover:translate-x-full"
                />

                <div className="relative flex items-center gap-2.5 p-2 sm:gap-3 sm:p-2.5">
                  {/* Brand avatar — real BL logo */}
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ring-1 ring-white/10"
                    style={{ boxShadow: "0 4px 18px -6px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.08)" }}
                  >
                    <BLIcon size={36} />
                  </span>

                  {/* Input */}
                  <div className="relative min-w-0 flex-1">
                    <input
                      type="text"
                      value={askValue}
                      onChange={(e) => setAskValue(e.target.value)}
                      placeholder=" "
                      aria-label={t("home.assistantCta.title")}
                      className="peer w-full bg-transparent py-2.5 pr-1 text-[15px] font-medium text-white placeholder-transparent caret-[hsl(var(--gold))] outline-none"
                    />
                    {/* Typewriter placeholder (only when input is empty) */}
                    {askValue.length === 0 && (
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center text-[15px] text-white/55">
                        <span>{typed}</span>
                        <span
                          aria-hidden
                          className="ml-0.5 inline-block h-[1.05em] w-[2px] bg-[hsl(var(--gold))]"
                          style={{ animation: "blCaret 1s steps(2) infinite" }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    aria-label={t("home.assistantCta.send")}
                    className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-[#0a0a0a] transition-all duration-200 hover:scale-[1.06] active:scale-95"
                    style={{
                      background: "linear-gradient(135deg, hsl(var(--gold)) 0%, hsl(var(--gold-light)) 100%)",
                      boxShadow: "0 8px 26px -6px hsla(43,70%,55%,0.65), inset 0 1px 0 rgba(255,255,255,0.5)",
                    }}
                  >
                    <ArrowRight className="h-5 w-5" strokeWidth={2.6} />
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes blCaret { 0%, 49% { opacity: 1 } 50%, 100% { opacity: 0 } }
      `}</style>

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
