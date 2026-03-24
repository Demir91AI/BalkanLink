import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { HeroAdBanner } from "@/components/home/AdSections";
import { AdCarousel } from "@/components/home/AdCarousel";
import { AdFlowBanner } from "@/components/home/AdFlowBanner";
import { WowSection } from "@/components/home/WowSection";
import heroBerlin from "@/assets/hero-berlin.jpg";
import heroMuenchen from "@/assets/hero-muenchen.jpg";
import heroFrankfurt from "@/assets/hero-frankfurt.jpg";
import heroHamburg from "@/assets/hero-hamburg.jpg";
import heroKoeln from "@/assets/hero-koeln.jpg";
import heroStuttgart from "@/assets/hero-stuttgart.jpg";
import heroDuesseldorf from "@/assets/hero-duesseldorf.jpg";
import heroNuernberg from "@/assets/hero-nuernberg.jpg";

/* ── Sidebar navigation items ── */
const sidebarNav = [
  { label: "Prvi koraci u Njemačkoj", icon: Footprints, to: "/dolazak/prvi-koraci" },
  { label: "Formulari", icon: FileText, to: "/formulari" },
  { label: "Pretraga poslova", icon: Briefcase, to: "/stellenangebote" },
  { label: "Pretraga stanova", icon: Building2, to: "/wohnungen" },
  { label: "Dokumenten-Check", icon: ShieldCheck, to: "/dokumenten-check" },
  { label: "Viza Navigator", icon: Compass, to: "/dolazak/boravisna-dozvola" },
  { label: "Alati i kalkulatori", icon: Wrench, to: "/tools" },
  { label: "Nudim / Tražim", icon: Megaphone, to: "/nudim-trazim" },
];

/* ── Quick-entry cards ── */
const quickEntries = [
  {
    title: "Prvi koraci",
    desc: "Sve što trebaš znati kad dođeš u Njemačku",
    icon: Footprints,
    to: "/dolazak/prvi-koraci",
    accent: true,
  },
  {
    title: "Formulari & Smart Guide",
    desc: "Popuni njemačke formulare uz objašnjenja korak po korak",
    icon: FileText,
    to: "/formulari",
    accent: false,
  },
  {
    title: "Pretraga poslova",
    desc: "Pronađi posao u svojoj regiji",
    icon: Briefcase,
    to: "/stellenangebote",
    accent: false,
  },
  {
    title: "Dokumenten-Check",
    desc: "Provjeri da li ti nedostaje neki dokument",
    icon: ShieldCheck,
    to: "/dokumenten-check",
    accent: false,
  },
];

export default function Index() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const { t } = useLanguage();
  const navigate = useNavigate();

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/qa?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <>
      {/* ─── HERO — FULL WIDTH, DOMINANT ─── */}
      <section className="relative h-[62vh] min-h-[440px] max-h-[680px] overflow-hidden bg-[hsl(var(--primary))]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].city}
              className="h-full w-full object-cover"
              style={{ filter: "brightness(0.85) saturate(1.15) contrast(1.08)" }}
              loading="eager"
            />
          </motion.div>
        </AnimatePresence>

        {/* Multi-layer cinematic overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(215,68%,6%/0.75)] via-[hsl(215,60%,8%/0.45)] to-[hsl(215,68%,4%/0.97)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(215,68%,4%/0.4)] via-transparent to-[hsl(215,68%,4%/0.4)]" />

        {/* Subtle cinematic glow */}
        <div className="absolute left-1/2 top-1/3 h-64 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[hsl(var(--gold)/0.06)]" style={{ filter: "blur(100px)" }} />

        <div className="container relative z-10 flex h-full flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="w-full max-w-2xl"
          >
            {/* Headline — large, bold, dominant */}
            <h1 className="font-heading text-3xl font-black leading-[1.15] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.5rem]">
              {t("home.hero.title")}
              <br />
              <span className="text-gold drop-shadow-[0_0_24px_hsl(var(--gold)/0.35)]">{t("home.hero.highlight")}</span>
            </h1>

            {/* Subtitle */}
            <p className="mx-auto mt-4 max-w-md text-base font-medium text-white/45 sm:text-lg">
              {t("home.hero.subtitle")}
            </p>

            {/* Premium Search Bar */}
            <form onSubmit={handleSearch} className="mx-auto mt-8 flex max-w-lg items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/35" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t("home.search.placeholder")}
                  className="h-14 rounded-2xl border-white/15 bg-white/[0.07] pl-12 pr-4 text-base text-white placeholder:text-white/30 shadow-[inset_0_1px_0_hsl(0,0%,100%/0.06),0_4px_24px_hsl(215,68%,4%/0.5)] backdrop-blur-xl focus-visible:ring-[hsl(var(--gold)/0.4)] focus-visible:border-[hsl(var(--gold)/0.3)] transition-all"
                />
              </div>
              <Button
                type="submit"
                className="h-14 rounded-2xl bg-[hsl(var(--gold))] px-7 text-base font-bold text-[hsl(var(--gold-foreground))] shadow-[0_4px_20px_hsl(var(--gold)/0.3)] hover:bg-[hsl(var(--gold-light))] hover:shadow-[0_6px_28px_hsl(var(--gold)/0.4)] transition-all duration-300"
              >
                <Search className="h-5 w-5" />
              </Button>
            </form>
          </motion.div>

          {/* Slide dots */}
          <div className="absolute bottom-6 flex gap-1.5">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`rounded-full transition-all duration-500 ${
                  idx === currentSlide
                    ? "h-1.5 w-7 bg-gold shadow-[0_0_8px_hsl(var(--gold)/0.5)]"
                    : "h-1.5 w-1.5 bg-white/20 hover:bg-white/35"
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Bottom neon accent */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--gold)/0.3)] to-transparent" />
      </section>

      {/* ─── HERO AD BANNER ─── */}
      <HeroAdBanner />

      {/* ─── WOW SECTION ─── */}
      <WowSection />

      {/* ─── PREMIUM AD CAROUSEL ─── */}
      <AdCarousel />

      {/* ─── FLOW AD BANNERS ─── */}
      <AdFlowBanner />
    </>
  );
}
