import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Footprints, Briefcase, ShieldCheck, Compass, Wrench, Plane,
  ClipboardList, Home, HandshakeIcon, CheckCircle2, ArrowRight,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

import { HeroAdBanner } from "@/components/home/AdSections";
import { AdCarousel } from "@/components/home/AdCarousel";
import { AdFlowBanner } from "@/components/home/AdFlowBanner";
import { WowSection } from "@/components/home/WowSection";
import TrainerHeroSection from "@/components/trainer/TrainerHeroSection";
import heroBerlin from "@/assets/hero-berlin.jpg";
import heroMuenchen from "@/assets/hero-muenchen.jpg";
import heroFrankfurt from "@/assets/hero-frankfurt.jpg";
import heroHamburg from "@/assets/hero-hamburg.jpg";
import heroKoeln from "@/assets/hero-koeln.jpg";
import heroStuttgart from "@/assets/hero-stuttgart.jpg";
import heroDuesseldorf from "@/assets/hero-duesseldorf.jpg";
import heroNuernberg from "@/assets/hero-nuernberg.jpg";
import heroLeipzig from "@/assets/hero-leipzig.jpg";
import heroFreilassing from "@/assets/hero-freilassing-real.jpg";

const sidebarNav = [
  { labelKey: "index.nav.firstSteps", icon: Footprints, to: "/dolazak/prvi-koraci" },
  { labelKey: "index.nav.forms", icon: ClipboardList, to: "/formulari" },
  { labelKey: "index.nav.jobSearch", icon: Briefcase, to: "/stellenangebote" },
  { labelKey: "index.nav.housingSearch", icon: Home, to: "/wohnungen" },
  { labelKey: "index.nav.offerSeek", icon: HandshakeIcon, to: "/nudim-trazim" },
  { labelKey: "index.nav.tools", icon: Wrench, to: "/tools" },
  { labelKey: "index.nav.docCheck", icon: ShieldCheck, to: "/dokumenten-check" },
  { labelKey: "index.nav.visaNav", icon: Compass, to: "/dolazak/boravisna-dozvola" },
  { labelKey: "migration.sidebarTitle", icon: Plane, to: "/nach-deutschland" },
];

const slides = [
  { image: heroFrankfurt, city: "FRANKFURT" },
  { image: heroBerlin, city: "BERLIN" },
  { image: heroMuenchen, city: "MÜNCHEN" },
  { image: heroHamburg, city: "HAMBURG" },
  { image: heroKoeln, city: "KÖLN" },
  { image: heroFreilassing, city: "FREILASSING" },
  { image: heroStuttgart, city: "STUTTGART" },
  { image: heroDuesseldorf, city: "DÜSSELDORF" },
  { image: heroNuernberg, city: "NÜRNBERG" },
  { image: heroLeipzig, city: "LEIPZIG" },
];

const trustBadgeKeys = ["hero.bullet.simple", "hero.bullet.language", "hero.bullet.verified"];

export default function Index() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { t } = useLanguage();
  const navigate = useNavigate();

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  useEffect(() => {
    slides.forEach((s) => {
      const img = new Image();
      img.src = s.image;
    });
  }, []);

  return (
    <>
      {/* ─── HERO — HIGH CONVERSION ─── */}
      <section className="relative min-h-[92vh] overflow-hidden bg-[hsl(215,68%,6%)]">
        {/* Background slideshow with heavy blur */}
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className="absolute inset-0 transition-opacity duration-[1200ms] ease-in-out"
            style={{
              opacity: idx === currentSlide ? 1 : 0,
              zIndex: idx === currentSlide ? 1 : 0,
            }}
          >
            <img
              src={slide.image}
              alt={slide.city}
              className="h-full w-full object-cover transition-transform duration-[5000ms] ease-out"
              style={{
                filter: "brightness(0.75) saturate(1.15) contrast(1.05)",
                transform: idx === currentSlide ? "scale(1.04)" : "scale(1)",
              }}
              loading="eager"
            />
          </div>
        ))}

        {/* Gradient overlays — no blur, image stays vivid */}
        <div className="absolute inset-0 z-[2] bg-gradient-to-b from-black/60 via-black/30 to-black/50" />

        {/* Content */}
        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-5 py-16 lg:py-20">
          <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="flex flex-col items-center text-center"
            >
               <h1
                className="font-heading text-[1.65rem] font-black leading-[1.15] tracking-tight text-white sm:text-3xl md:text-4xl lg:text-[3.4rem]"
                style={{ textShadow: "0 4px 30px rgba(0,0,0,0.5)" }}
              >
                {t("hero.title")}{" "}
                <span className="text-gold drop-shadow-[0_0_24px_rgba(255,204,0,0.45)]">
                  {t("hero.titleHighlight")}
                </span>
              </h1>

              <p
                className="mt-5 max-w-xl text-sm font-medium leading-relaxed text-white/80 sm:text-base md:text-lg lg:mt-6"
                style={{ textShadow: "0 2px 12px rgba(0,0,0,0.4)" }}
              >
                {t("hero.subtitle")}
              </p>

              {/* Primary CTA */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-8 flex flex-col items-center gap-3"
              >
                <Button
                  onClick={() => navigate("/formulari")}
                  className="h-12 rounded-full bg-gold px-8 text-base font-bold text-gold-foreground shadow-[0_4px_24px_rgba(255,204,0,0.4)] hover:bg-gold-light hover:shadow-[0_8px_36px_rgba(255,204,0,0.55)] hover:scale-[1.03] transition-all duration-300 sm:h-14 sm:px-10 sm:text-lg"
                >
                  {t("hero.ctaPrimary")}
                  <ArrowRight className="ml-1 h-4 w-4 sm:h-5 sm:w-5" />
                </Button>

                {/* Secondary CTA */}
                <Link
                  to="/qa"
                  className="group flex items-center gap-1.5 text-sm font-medium text-white/50 transition-colors hover:text-gold"
                >
                  {t("hero.ctaSecondary")}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>

              {/* Trust badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 lg:mt-10"
              >
                {trustBadgeKeys.map((key) => (
                  <span key={key} className="flex items-center gap-1.5 text-xs font-medium text-white/60 sm:text-sm">
                    <CheckCircle2 className="h-3.5 w-3.5 text-gold sm:h-4 sm:w-4" />
                    {t(key)}
                  </span>
                ))}
              </motion.div>
            </motion.div>

          </div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`rounded-full transition-all duration-500 ${
                idx === currentSlide
                  ? "h-1.5 w-6 bg-gold shadow-[0_0_8px_rgba(255,204,0,0.5)]"
                  : "h-1.5 w-1.5 bg-white/15 hover:bg-white/30"
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-10 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      </section>

      <HeroAdBanner />

      <div className="flex">
        {/* Desktop sidebar */}
        <nav className="hidden md:flex w-[260px] shrink-0 flex-col border-r border-border/40 bg-[hsl(215,55%,7%)] sticky top-0 self-start h-screen py-6 px-3">
          <p className="mb-4 px-3 text-[11px] font-semibold uppercase tracking-widest text-white/30">
            {t("index.navLabel")}
          </p>
          <ul className="space-y-1">
            {sidebarNav.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="group flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-white/55 transition-all duration-200 hover:bg-white/5 hover:text-white"
                >
                  <item.icon className="h-[18px] w-[18px] shrink-0 text-white/35 transition-colors group-hover:text-gold" />
                  <span>{t(item.labelKey)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex-1 min-w-0">
          <TrainerHeroSection />
          <WowSection />
          <AdCarousel />
          <AdFlowBanner />
        </div>
      </div>
    </>
  );
}
