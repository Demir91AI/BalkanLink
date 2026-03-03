import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText, Briefcase, Building2, HeartPulse, ScanSearch,
  ClipboardList, Wallet,
  ArrowRight, Car, Banknote, Calculator, Megaphone,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNewestAds } from "@/hooks/useAds";
import { Badge } from "@/components/ui/badge";

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
        {/* Static neon bottom accent line */}
        <div className="absolute bottom-10 left-[12.5%] right-[12.5%] z-[1] pointer-events-none h-[2px]" aria-hidden="true"
          style={{ background: 'linear-gradient(90deg, rgba(34,211,238,0.5), rgba(56,189,248,0.4), rgba(34,211,238,0.5))', filter: 'drop-shadow(0 0 4px rgba(34,211,238,0.3))' }} />
        <div className="container relative z-10 flex h-full flex-col items-center justify-center text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="max-w-lg">
            <h1 className="font-heading text-2xl font-black leading-tight text-white sm:text-3xl md:text-4xl">
              {t("home.hero.title")}<br />
              <span className="text-gold">{t("home.hero.highlight")}</span>
            </h1>
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
