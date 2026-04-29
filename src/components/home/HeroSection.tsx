import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ChevronLeft, ChevronRight, ArrowRight, Sparkles } from "lucide-react";
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
  const [askFocused, setAskFocused] = useState(false);

  const trustBadges = [
    t("home.trustBadges.officialSources"),
    t("home.trustBadges.updated"),
    t("home.trustBadges.stepByStep"),
  ];

  const askPlaceholdersRaw = t("home.assistantCta.examples", { returnObjects: true }) as string[];
  const askPlaceholdersKey = Array.isArray(askPlaceholdersRaw) ? askPlaceholdersRaw.join("|") : "";
  const askPlaceholders = useMemo(
    () => (Array.isArray(askPlaceholdersRaw) ? askPlaceholdersRaw : []),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [askPlaceholdersKey],
  );

  // Typewriter: type full phrase → hold → fade-out → switch to next
  useEffect(() => {
    if (askPlaceholders.length === 0) return;
    // Pause animation when input is focused or has user content
    if (askFocused || askValue.length > 0) {
      setTyped("");
      setPhraseVisible(false);
      return;
    }
    setPhraseVisible(true);
    let i = 0;
    let charIdx = 0;
    let mode: "typing" | "holding" | "swapping" = "typing";
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const current = askPlaceholders[i];
      if (mode === "typing") {
        charIdx++;
        setTyped(current.slice(0, charIdx));
        if (charIdx >= current.length) {
          mode = "holding";
          timer = setTimeout(tick, 2400); // hold full phrase
          return;
        }
        timer = setTimeout(tick, 42 + Math.random() * 32);
      } else if (mode === "holding") {
        // fade-out current
        setPhraseVisible(false);
        mode = "swapping";
        timer = setTimeout(tick, 350);
      } else {
        // swap to next + fade-in fresh typing
        i = (i + 1) % askPlaceholders.length;
        charIdx = 0;
        setTyped("");
        setPhraseKey((k) => k + 1);
        setPhraseVisible(true);
        mode = "typing";
        timer = setTimeout(tick, 180);
      }
    };
    timer = setTimeout(tick, 600);
    return () => clearTimeout(timer);
  }, [askPlaceholders, askFocused, askValue.length === 0 ? 0 : 1]);

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


          {/* ─── Asistent — interactive ask bar ─── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.0, ease }}
            className="mt-7 w-full max-w-xl"
          >
            {/* Brand name above bar */}
            <div className="mb-3.5 flex items-center justify-center gap-2.5">
              <Sparkles
                className="h-3.5 w-3.5 text-[hsl(var(--gold))]"
                style={{
                  filter: "drop-shadow(0 0 6px hsla(43,70%,55%,0.7))",
                  animation: "blSparkleA 3.6s ease-in-out infinite",
                }}
              />
              <h2
                className="text-[15px] font-extrabold tracking-[0.04em] sm:text-[16px]"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, hsl(var(--gold-light)) 0%, #fff 35%, hsl(var(--gold)) 65%, hsl(var(--gold-light)) 100%)",
                  backgroundSize: "220% 100%",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  animation: "blChipShine 5s ease-in-out infinite",
                  textShadow: "0 0 24px hsla(43,70%,55%,0.25)",
                }}
              >
                BalkanLink Asistent
              </h2>
              <Sparkles
                className="h-3.5 w-3.5 text-[hsl(var(--gold))]"
                style={{
                  filter: "drop-shadow(0 0 6px hsla(43,70%,55%,0.7))",
                  animation: "blSparkleB 3.6s ease-in-out infinite",
                }}
              />
            </div>

            {/* Ask bar — premium dual-glow */}
            <form
              onSubmit={(e) => { e.preventDefault(); submitAsk(); }}
              className="group relative rounded-[20px] transition-all duration-300 focus-within:-translate-y-0.5"
            >
              {/* Rotating conic gold ring (always-on subtle, intensifies on focus) */}
              <span
                aria-hidden
                className="pointer-events-none absolute -inset-[2px] rounded-[22px] opacity-60 blur-[6px] transition-opacity duration-500 group-hover:opacity-95 group-focus-within:opacity-100"
                style={{
                  background:
                    "conic-gradient(from var(--bl-angle, 0deg), hsla(43,70%,55%,0.0) 0deg, hsla(43,70%,55%,0.75) 60deg, hsla(220,80%,60%,0.0) 140deg, hsla(43,70%,55%,0.0) 220deg, hsla(43,70%,55%,0.75) 300deg, hsla(43,70%,55%,0.0) 360deg)",
                  animation: "blRingSpin 7s linear infinite",
                }}
              />
              {/* Soft outer halo */}
              <span
                aria-hidden
                className="pointer-events-none absolute -inset-[10px] rounded-[28px] opacity-40 blur-2xl transition-opacity duration-500 group-focus-within:opacity-70"
                style={{
                  background:
                    "radial-gradient(60% 60% at 50% 50%, hsla(43,70%,55%,0.35) 0%, hsla(43,70%,55%,0) 70%)",
                }}
              />
              {/* Bar surface */}
              <div
                className="relative overflow-hidden rounded-[18px]"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(22,30,52,0.92) 0%, rgba(8,12,24,0.92) 100%)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  boxShadow:
                    "0 22px 70px -22px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.08)",
                }}
              >
                {/* Continuous slow sheen sweep */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 skew-x-12"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)",
                    animation: "blSheen 5.5s ease-in-out infinite",
                  }}
                />
                {/* Top inner highlight */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-3 top-0 h-px"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)",
                  }}
                />

                <div className="relative flex items-center gap-2.5 p-2 sm:gap-3 sm:p-2.5">
                  {/* Brand avatar — real BL logo with pulsing gold ring */}
                  <span className="relative flex h-11 w-11 shrink-0 items-center justify-center">
                    <span
                      aria-hidden
                      className="absolute inset-0 rounded-xl opacity-70"
                      style={{
                        background:
                          "linear-gradient(135deg, hsla(43,70%,55%,0.35), hsla(43,70%,55%,0.05))",
                        animation: "blAvatarPulse 3.2s ease-in-out infinite",
                      }}
                    />
                    <span
                      className="relative flex h-11 w-11 items-center justify-center rounded-xl ring-1 ring-[hsla(43,70%,55%,0.35)]"
                      style={{
                        boxShadow:
                          "0 6px 22px -6px rgba(0,0,0,0.75), inset 0 1px 0 rgba(255,255,255,0.10)",
                        background:
                          "linear-gradient(135deg, rgba(20,28,48,0.9), rgba(8,12,24,0.9))",
                      }}
                    >
                      <BLIcon size={36} />
                    </span>
                  </span>

                  {/* Input */}
                  <div className="relative min-w-0 flex-1 overflow-hidden">
                    <input
                      type="text"
                      value={askValue}
                      onChange={(e) => setAskValue(e.target.value)}
                      onFocus={() => setAskFocused(true)}
                      onBlur={() => setAskFocused(false)}
                      placeholder=" "
                      aria-label={t("home.assistantCta.title")}
                      className="peer w-full bg-transparent py-2.5 pr-1 text-[14px] sm:text-[15px] font-medium text-white placeholder-transparent caret-[hsl(var(--gold))] outline-none"
                    />
                    {/* Typewriter placeholder (only when input is empty AND not focused) */}
                    {askValue.length === 0 && !askFocused && (
                      <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center text-[14px] sm:text-[15px] text-white/60">
                        <div
                          className="flex w-full items-center justify-end overflow-hidden whitespace-nowrap"
                          style={{ direction: "rtl" }}
                        >
                          <span
                            aria-hidden
                            className="ml-1 inline-block h-[1.1em] w-[2.5px] shrink-0 rounded-[1px] bg-[hsl(var(--gold))]"
                            style={{
                              animation: "blCaret 1s steps(2) infinite",
                              direction: "ltr",
                              boxShadow: "0 0 8px hsla(43,70%,55%,0.7)",
                            }}
                          />
                          <span
                            key={phraseKey}
                            className="inline-block transition-all duration-300 ease-out"
                            style={{
                              direction: "ltr",
                              opacity: phraseVisible ? 1 : 0,
                              transform: phraseVisible ? "translateY(0)" : "translateY(-6px)",
                            }}
                          >
                            {typed}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    aria-label={t("home.assistantCta.send")}
                    className="group/btn relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl text-[#0a0a0a] transition-all duration-200 hover:scale-[1.07] active:scale-95"
                    style={{
                      background:
                        "linear-gradient(135deg, hsl(var(--gold)) 0%, hsl(var(--gold-light)) 100%)",
                      boxShadow:
                        "0 10px 28px -6px hsla(43,70%,55%,0.7), inset 0 1px 0 rgba(255,255,255,0.55)",
                    }}
                  >
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full"
                    />
                    <ArrowRight className="relative h-5 w-5" strokeWidth={2.7} />
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes blCaret { 0%, 49% { opacity: 1 } 50%, 100% { opacity: 0 } }
        @keyframes blRingSpin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }
        @keyframes blSheen {
          0% { transform: translateX(0) skewX(12deg); opacity: 0 }
          15% { opacity: 1 }
          60% { transform: translateX(450%) skewX(12deg); opacity: 0.8 }
          100% { transform: translateX(450%) skewX(12deg); opacity: 0 }
        }
        @keyframes blAvatarPulse {
          0%, 100% { transform: scale(1); opacity: 0.55 }
          50% { transform: scale(1.08); opacity: 0.85 }
        }
        @keyframes blChipPulse {
          0%, 100% { transform: scale(1); opacity: 0.5 }
          50% { transform: scale(1.6); opacity: 0 }
        }
        @keyframes blChipShine {
          0%, 100% { background-position: 0% 50% }
          50% { background-position: 100% 50% }
        }
        @keyframes blSparkleA {
          0%, 100% { opacity: 0.55; transform: scale(1) rotate(0deg) }
          50% { opacity: 1; transform: scale(1.2) rotate(15deg) }
        }
        @keyframes blSparkleB {
          0%, 100% { opacity: 1; transform: scale(1.2) rotate(-15deg) }
          50% { opacity: 0.55; transform: scale(1) rotate(0deg) }
        }
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
