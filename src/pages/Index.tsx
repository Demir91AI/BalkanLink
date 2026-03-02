import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText, Briefcase, Building2, HeartPulse, ScanSearch,
  ClipboardList, Wallet,
  ArrowRight, Car, Banknote, Calculator,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

import heroBerlin from "@/assets/hero-berlin.jpg";
import heroMuenchen from "@/assets/hero-muenchen.jpg";
import heroFrankfurt from "@/assets/hero-frankfurt.jpg";
import heroHamburg from "@/assets/hero-hamburg.jpg";
import heroKoeln from "@/assets/hero-koeln.jpg";
import heroStuttgart from "@/assets/hero-stuttgart.jpg";
import heroDuesseldorf from "@/assets/hero-duesseldorf.jpg";
import heroNuernberg from "@/assets/hero-nuernberg.jpg";

const pomocItems = [
  { labelKey: "home.item.posao", icon: Briefcase, to: "/stellenangebote" },
  { labelKey: "home.item.stan", icon: Building2, to: "/wohnungen" },
  { labelKey: "home.item.formulari", icon: FileText, to: "/formulari" },
  { labelKey: "home.item.rechner", icon: Calculator, to: "/tools" },
  { labelKey: "home.item.prijava", icon: ClipboardList, to: "/dolazak/prijava-prebivalista" },
  { labelKey: "home.item.zdravstvo", icon: HeartPulse, to: "/dolazak/zdravstveno-osiguranje" },
  { labelKey: "home.item.banka", icon: Wallet, to: "/dolazak/bankovni-racun" },
  { labelKey: "home.item.auto", icon: Car, to: "/dolazak/auto-anmelden" },
  { labelKey: "home.item.foerderungen", icon: Banknote, to: "/foerderungen" },
  { labelKey: "home.item.dokumentenCheck", icon: ScanSearch, to: "/dokumenten-check" },
];

export default function Index() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { t } = useLanguage();

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

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative h-[50vh] min-h-[320px] max-h-[480px] overflow-hidden bg-[#0B1F3A]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <img src={slides[currentSlide].image} alt={slides[currentSlide].city} className="h-full w-full object-cover" loading="eager" />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1F3A]/70 via-[#0B1F3A]/40 to-[#0B1F3A]/95" />
        {/* HUD tech frame overlay */}
        <div className="absolute inset-3 sm:inset-5 z-[1] pointer-events-none" aria-hidden="true">
          {/* Top-left bracket */}
          <div className="absolute top-0 left-0">
            <div className="hud-line w-10 sm:w-16 h-[2px]" />
            <div className="hud-line w-[2px] h-10 sm:h-16" />
          </div>
          {/* Top-right bracket */}
          <div className="absolute top-0 right-0">
            <div className="hud-line w-10 sm:w-16 h-[2px] ml-auto" />
            <div className="hud-line w-[2px] h-10 sm:h-16 ml-auto" />
          </div>
          {/* Bottom-left bracket */}
          <div className="absolute bottom-0 left-0">
            <div className="hud-line w-[2px] h-10 sm:h-16" style={{ marginTop: 'auto', position: 'absolute', bottom: 0 }} />
            <div className="hud-line w-10 sm:w-16 h-[2px] absolute bottom-0" />
          </div>
          {/* Bottom-right bracket */}
          <div className="absolute bottom-0 right-0">
            <div className="hud-line w-[2px] h-10 sm:h-16 ml-auto absolute bottom-0 right-0" />
            <div className="hud-line w-10 sm:w-16 h-[2px] absolute bottom-0 right-0" />
          </div>
          {/* Bottom center line */}
          <div className="absolute bottom-0 left-[10%] right-[10%] h-[2px] hud-line" />
          {/* Glow dots at bottom line ends */}
          <div className="absolute bottom-[-2px] left-[10%] h-2 w-2 rounded-full bg-cyan-400/50 blur-[4px]" />
          <div className="absolute bottom-[-2px] right-[10%] h-2 w-2 rounded-full bg-emerald-400/50 blur-[4px]" />
        </div>
        <div className="container relative z-10 flex h-full flex-col items-center justify-center text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="max-w-lg">
            <h1 className="font-heading text-2xl font-black leading-tight text-white sm:text-3xl md:text-4xl">
              {t("home.hero.title")}<br />
              <span className="text-gold">{t("home.hero.highlight")}</span>
            </h1>
            {/* ECG pulse line */}
            <svg viewBox="0 0 400 40" className="mx-auto mt-3 h-6 w-64 sm:w-80" preserveAspectRatio="none">
              <polyline
                points="0,20 80,20 100,20 110,8 120,32 130,4 140,36 150,20 170,20 400,20"
                fill="none"
                stroke="hsl(var(--gold))"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-ecg-draw"
              />
            </svg>
            <p className="mx-auto mt-2 max-w-sm text-sm text-white/40">{t("home.hero.subtitle")}</p>
          </motion.div>
          <div className="absolute bottom-5 flex gap-1.5">
            {slides.map((_, idx) => (
              <button key={idx} onClick={() => setCurrentSlide(idx)}
                className={`rounded-full transition-all duration-500 ${idx === currentSlide ? "h-1.5 w-6 bg-gold" : "h-1.5 w-1.5 bg-white/20"}`}
                aria-label={`Slide ${idx + 1}`} />
            ))}
          </div>
        </div>
      </section>

      <div className="container max-w-4xl space-y-6 py-10 sm:py-14">
        {/* ─── POMOĆ U NJEMAČKOJ ─── */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
          <div className="rounded-2xl border border-border/60 bg-card p-5 sm:p-7 shadow-sm">
            <div className="mb-1">
              <h2 className="font-heading text-lg font-extrabold uppercase tracking-wide sm:text-xl">{t("home.section.title")}</h2>
              <p className="text-xs text-muted-foreground">{t("home.section.subtitle")}</p>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {pomocItems.map((item) => (
                <Link key={item.labelKey} to={item.to}
                  className="group flex flex-col items-center gap-2 rounded-xl border border-border/40 bg-background p-4 text-center transition-all hover:border-border hover:shadow-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/8 text-primary transition-colors group-hover:bg-primary/14">
                    <item.icon className="h-[18px] w-[18px]" strokeWidth={1.6} />
                  </div>
                  <span className="text-xs font-medium leading-tight">{t(item.labelKey)}</span>
                </Link>
              ))}
            </div>
          </div>
        </motion.section>
      </div>
    </>
  );
}
