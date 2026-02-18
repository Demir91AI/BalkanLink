import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Plane, Building2, Briefcase, Users, Scale, FileText,
  Wrench, Landmark, Heart, ArrowRight,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";

import heroBerlin from "@/assets/hero-berlin.jpg";
import heroMuenchen from "@/assets/hero-muenchen.jpg";
import heroFrankfurt from "@/assets/hero-frankfurt.jpg";
import heroHamburg from "@/assets/hero-hamburg.jpg";
import heroKoeln from "@/assets/hero-koeln.jpg";
import heroStuttgart from "@/assets/hero-stuttgart.jpg";
import heroDuesseldorf from "@/assets/hero-duesseldorf.jpg";
import heroNuernberg from "@/assets/hero-nuernberg.jpg";

export default function Index() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { t } = useLanguage();
  const { user, loading } = useAuth();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 600], [0, 80]);

  const slides = [
    { image: heroFrankfurt, city: "FRANKFURT" },
    { image: heroBerlin, city: "BERLIN" },
    { image: heroMuenchen, city: "MÜNCHEN" },
    { image: heroHamburg, city: "HAMBURG" },
    { image: heroKoeln, city: "KÖLN" },
    { image: heroStuttgart, city: "STUTTGART" },
    { image: heroDuesseldorf, city: "DÜSSELDORF" },
    { image: heroNuernberg, city: "NÜRNBERG" },
  ];

  const portalCards = [
    { title: t("portal.dolazak"), desc: t("portal.dolazak.desc"), icon: Plane, to: "/dolazak", gradient: "from-blue-500/10 to-blue-600/5" },
    { title: t("portal.stan"), desc: t("portal.stan.desc"), icon: Building2, to: "/wohnungen", gradient: "from-emerald-500/10 to-emerald-600/5" },
    { title: t("portal.jobs"), desc: t("portal.jobs.desc"), icon: Briefcase, to: "/stellenangebote", gradient: "from-amber-500/10 to-amber-600/5" },
    { title: t("portal.familie"), desc: t("portal.familie.desc"), icon: Users, to: "/familie", gradient: "from-rose-500/10 to-rose-600/5" },
    { title: t("portal.foerderungen"), desc: t("portal.foerderungen.desc"), icon: Scale, to: "/foerderungen", gradient: "from-violet-500/10 to-violet-600/5" },
    { title: t("portal.formulare"), desc: t("portal.formulare.desc"), icon: FileText, to: "/formulare", gradient: "from-cyan-500/10 to-cyan-600/5" },
    { title: t("portal.tools"), desc: t("portal.tools.desc"), icon: Wrench, to: "/generatoren", gradient: "from-orange-500/10 to-orange-600/5" },
    { title: t("portal.ambasade"), desc: t("portal.ambasade.desc"), icon: Landmark, to: "/ambasade-konzulati", gradient: "from-indigo-500/10 to-indigo-600/5" },
    { title: t("portal.community"), desc: t("portal.community.desc"), icon: Heart, to: "/community", gradient: "from-pink-500/10 to-pink-600/5" },
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <>
      {/* ─── CINEMATIC HERO ─── */}
      <section ref={heroRef} className="relative h-[85vh] min-h-[480px] max-h-[800px] overflow-hidden bg-primary">
        {/* Parallax image layer */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <motion.img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].city}
              className="h-full w-full object-cover"
              style={{ y: parallaxY }}
              loading="eager"
            />
          </motion.div>
        </AnimatePresence>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent" />

        {/* Content */}
        <div className="container relative z-10 flex h-full flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="max-w-3xl"
          >
            <h1 className="font-heading text-2xl font-black leading-[1.1] text-white sm:text-4xl md:text-5xl lg:text-6xl">
              {t("hero.slide1.title")}
            </h1>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-white/60 sm:text-base md:text-lg">
              {t("hero.slide1.subtitle")}
            </p>

            {!loading && !user && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-6 sm:mt-10 flex flex-col items-center gap-3"
              >
                {/* Primary CTA — Gold gradient button */}
                <Link
                  to="/register"
                  className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full w-full sm:w-auto px-8 py-3.5 sm:px-10 sm:py-4 text-sm sm:text-base font-bold tracking-wide transition-all duration-300"
                  style={{
                    background: "linear-gradient(135deg, #D4AF37 0%, #E8C84A 50%, #D4AF37 100%)",
                    color: "#1a1a1a",
                    boxShadow: "0 4px 24px -4px rgba(212, 175, 55, 0.5), 0 0 40px -12px rgba(212, 175, 55, 0.3)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 8px 32px -4px rgba(212, 175, 55, 0.65), 0 0 60px -12px rgba(212, 175, 55, 0.4)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "0 4px 24px -4px rgba(212, 175, 55, 0.5), 0 0 40px -12px rgba(212, 175, 55, 0.3)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {t("hero.cta.register")}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>

                {/* Secondary CTA — subtle text link, no white box */}
                <Link
                  to="/dolazak"
                  className="group inline-flex items-center gap-1.5 text-sm font-medium text-white/50 transition-colors duration-300 hover:text-gold"
                >
                  {t("hero.cta.firstSteps")}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </motion.div>
            )}
          </motion.div>

          {/* City name */}
          <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentSlide}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5 }}
                className="text-[11px] font-semibold uppercase tracking-[0.4em] text-white/30"
              >
                {slides[currentSlide].city}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="absolute bottom-10 flex gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`rounded-full transition-all duration-500 ${
                  idx === currentSlide
                    ? "h-2 w-8 bg-gold"
                    : "h-2 w-2 bg-white/25 hover:bg-white/40"
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── ANIMATED SEPARATOR ─── */}
      <div className="section-separator" />

      {/* ─── DYNAMIC CATEGORY GRID ─── */}
      <section className="relative py-10 sm:py-16 lg:py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />

        <div className="container relative">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {portalCards.map((card) => (
              <motion.div
                key={card.to}
                variants={{
                  hidden: { opacity: 0, y: 28 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
                }}
              >
                <Link
                  to={card.to}
                  className={`group relative flex items-start gap-3 sm:gap-4 overflow-hidden rounded-xl sm:rounded-2xl border border-border/60 bg-gradient-to-br ${card.gradient} bg-card p-4 sm:p-5 lg:p-6 shadow-sm transition-all duration-400 hover:border-gold/30 hover:shadow-xl hover:shadow-gold/5 hover:-translate-y-1`}
                >
                  <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gold/0 transition-all duration-500 group-hover:bg-gold/10 group-hover:blur-2xl" />

                  <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-primary/8 text-primary transition-all duration-300 group-hover:bg-gold/15 group-hover:text-gold group-hover:scale-110">
                    <card.icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-sm font-bold">{card.title}</h2>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{card.desc}</p>
                  </div>
                  <ArrowRight className="ml-auto mt-1 h-4 w-4 shrink-0 text-muted-foreground/20 transition-all duration-300 group-hover:translate-x-1 group-hover:text-gold" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="section-separator" />
    </>
  );
}
