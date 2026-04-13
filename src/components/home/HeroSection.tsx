import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

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

const trustBadges = [
  "Službeni izvori",
  "Ažurirano 2026",
  "Na bosanskom jeziku",
];

const ease = [0.16, 1, 0.3, 1] as const;

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const btnRef = useRef<HTMLButtonElement>(null);

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

      {/* Gradient overlay with shifting hue */}
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background: "linear-gradient(135deg, rgba(10,18,42,0.7) 0%, rgba(0,0,0,0.3) 40%, rgba(10,18,42,0.75) 100%)",
          animation: "heroHueShift 20s ease-in-out infinite alternate",
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
            className="font-heading font-[900] text-white leading-[1.08]"
            style={{ fontSize: "clamp(2.2rem, 5.5vw, 4.2rem)", textShadow: "0 4px 20px rgba(0,0,0,0.5)" }}
          >
            Navigirajte njemački sistem.
            <br />
            <span className="bg-gradient-to-r from-[hsl(var(--gold))] to-[hsl(var(--gold-light))] bg-clip-text text-transparent">
              Bez stresa. Bez greški.
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease }}
            className="mx-auto mt-5 max-w-xl text-white/80 leading-relaxed"
            style={{ fontSize: "clamp(0.95rem, 1.8vw, 1.15rem)" }}
          >
            BalkanLink pretvara kompleksnu njemačku birokratiju u jasne, vođene korake — na bosanskom jeziku.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5, ease }}
            className="mt-9 flex flex-col sm:flex-row items-center gap-4"
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
              <span className="relative">Počni sada</span>
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
              Pogledaj planove
            </button>
          </motion.div>

          {/* Disclaimer */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-6 text-white/40 text-[0.72rem]"
          >
            BalkanLink nije pravni savjetnik. Sadržaj služi isključivo za orijentaciju.
          </motion.p>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-6"
          >
            {trustBadges.map((badge) => (
              <span key={badge} className="flex items-center gap-1.5 text-white/75 text-[0.82rem] font-medium">
                <CheckCircle2 className="h-4 w-4 text-[hsl(var(--gold))]" />
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
