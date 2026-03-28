import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ClipboardList, BookOpen, Calculator, Megaphone,
  CheckCircle2, ArrowRight, Star,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

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

const highlights = [
  { icon: ClipboardList, titleKey: "Formulari", descKey: "Svi formulari na jednom mjestu", to: "/formulari" },
  { icon: BookOpen, titleKey: "Deutsch", descKey: "Nauči njemački kroz praksu", to: "/deutsch-trainer" },
  { icon: Calculator, titleKey: "Kalkulatori", descKey: "Brutto-Netto i više", to: "/tools" },
  { icon: Megaphone, titleKey: "Oglasi", descKey: "Nudim / Tražim oglasi", to: "/nudim-trazim" },
];

const steps = [
  { num: "01", title: "Odaberi temu", desc: "Pronađi ono što ti treba – formulari, jezik ili kalkulatori." },
  { num: "02", title: "Prati vodič", desc: "Svaki korak je objašnjen jednostavno, na tvom jeziku." },
  { num: "03", title: "Završi bez grešaka", desc: "Kompletno i tačno – bez skupih grešaka." },
];

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
    <div className="bg-[#0B0F1A]">
      {/* ─── HERO ─── */}
      <section className="relative min-h-[92vh] overflow-hidden">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className="absolute inset-0 transition-opacity duration-[1200ms] ease-in-out"
            style={{ opacity: idx === currentSlide ? 1 : 0, zIndex: idx === currentSlide ? 1 : 0 }}
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

        <div className="absolute inset-0 z-[2] bg-gradient-to-b from-black/60 via-black/30 to-[#0B0F1A]" />

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

                <Link
                  to="/qa"
                  className="group flex items-center gap-1.5 text-sm font-medium text-white/50 transition-colors hover:text-gold"
                >
                  {t("hero.ctaSecondary")}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>

                {/* Disclaimer */}
                <p className="mt-2 max-w-sm text-[10px] leading-relaxed text-white/30">
                  BalkanLink je edukativna platforma. Sadržaj nije pravni savjet.
                </p>
              </motion.div>

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
      </section>

      {/* ─── HIGHLIGHTS (4 cards) ─── */}
      <section className="py-16 sm:py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="font-heading text-2xl font-extrabold text-white sm:text-3xl lg:text-4xl">
              Sve što ti treba —{" "}
              <span className="text-gold">na jednom mjestu</span>
            </h2>
            <div className="mx-auto mt-3 h-[3px] w-16 rounded-full bg-gradient-to-r from-[#3B82F6] to-gold" />
          </motion.div>

          <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5">
            {highlights.map((h, i) => (
              <motion.div
                key={h.to}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
              >
                <Link
                  to={h.to}
                  className="group flex flex-col items-center rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-7 text-center transition-all duration-300 hover:-translate-y-1 hover:border-gold/30 hover:bg-white/[0.06] hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)]"
                >
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#0B1F3A] to-[#163057] border border-gold/25 shadow-[0_4px_16px_rgba(11,31,58,0.3)] transition-transform duration-300 group-hover:scale-105">
                    <h.icon className="h-5 w-5 text-[#F5A623]" strokeWidth={1.8} />
                  </div>
                  <h3 className="text-sm font-bold text-white group-hover:text-gold transition-colors">{h.titleKey}</h3>
                  <p className="mt-1 text-xs text-white/40 line-clamp-2">{h.descKey}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── KAKO FUNKCIONIŠE (3 steps) ─── */}
      <section className="py-16 sm:py-20 border-t border-white/[0.05]">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="font-heading text-2xl font-extrabold text-white sm:text-3xl">
              Kako funkcioniše?
            </h2>
            <p className="mt-2 text-sm text-white/40">Tri jednostavna koraka do cilja.</p>
          </motion.div>

          <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-3">
            {steps.map((s, i) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.12 }}
                className="flex flex-col items-center rounded-2xl border border-white/8 bg-white/[0.03] px-5 py-8 text-center"
              >
                <span className="mb-3 text-3xl font-black text-gold/30">{s.num}</span>
                <h3 className="text-base font-bold text-white">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/40">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PREMIUM CTA ─── */}
      <section className="py-16 sm:py-20 border-t border-white/[0.05]">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-xl text-center"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/[0.06] px-3 py-1">
              <Star className="h-3 w-3 text-gold" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-gold">Premium</span>
            </div>
            <h2 className="font-heading text-2xl font-extrabold text-white sm:text-3xl">
              Otključaj sve mogućnosti
            </h2>
            <p className="mt-3 text-sm text-white/40">
              Premium pristup svim formularima, kursu njemačkog i ekskluzivnim alatima.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button
                onClick={() => navigate("/premium")}
                className="h-12 rounded-full bg-gold px-8 text-base font-bold text-gold-foreground shadow-[0_4px_24px_rgba(255,204,0,0.35)] hover:bg-gold-light hover:shadow-[0_8px_36px_rgba(255,204,0,0.5)] hover:scale-[1.03] transition-all duration-300"
              >
                Pogledaj Premium
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/mitgliedschaft")}
                className="h-12 rounded-full border-white/12 bg-white/5 px-8 text-sm font-semibold text-white hover:bg-white/10 transition-all"
              >
                Uporedi planove
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
