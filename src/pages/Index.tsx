import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Footprints, FileText, Briefcase, Building2,
  ShieldCheck, Compass, Wrench, Megaphone,
} from "lucide-react";
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
import heroLeipzig from "@/assets/hero-leipzig.jpg";
import heroFreilassing from "@/assets/hero-freilassing.jpg";

const sidebarNav = [
  { label: "Početak u Njemačkoj", icon: Footprints, to: "/dolazak/prvi-koraci" },
  { label: "Formulari", icon: FileText, to: "/formulari" },
  { label: "Pretraga poslova", icon: Briefcase, to: "/stellenangebote" },
  { label: "Pretraga stanova", icon: Building2, to: "/wohnungen" },
  { label: "Nudim / Tražim", icon: Megaphone, to: "/nudim-trazim" },
  { label: "Alati i kalkulatori", icon: Wrench, to: "/tools" },
  { label: "Dokumenten-Check", icon: ShieldCheck, to: "/dokumenten-check" },
  { label: "Viza Navigator", icon: Compass, to: "/dolazak/boravisna-dozvola" },
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
    { image: heroLeipzig, city: "LEIPZIG" },
    { image: heroFreilassing, city: "FREILASSING" },
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 4000);
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
      {/* ─── HERO — FULL WIDTH, 85-90vh ─── */}
      <section className="relative h-[88vh] min-h-[560px] max-h-[960px] overflow-hidden bg-[hsl(var(--primary))]">
        {/* Preload next slide to avoid flash */}
        <div className="hidden">
          <img src={slides[(currentSlide + 1) % slides.length].image} alt="" />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].city}
              className="h-full w-full object-cover"
              style={{ filter: "brightness(0.82) saturate(1.2) contrast(1.08)" }}
              loading="eager"
            />
          </motion.div>
        </AnimatePresence>

        {/* Overlays — dark gradient + blue tint + subtle blur zone */}
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(215,68%,6%/0.7)] via-[hsl(215,60%,10%/0.4)] to-[hsl(215,68%,4%/0.95)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(215,68%,4%/0.35)] via-transparent to-[hsl(215,68%,4%/0.35)]" />
        <div className="absolute inset-0 bg-[hsl(215,70%,20%/0.08)]" />
        <div className="absolute left-1/2 top-[40%] h-80 w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[hsl(var(--gold)/0.05)]" style={{ filter: "blur(120px)" }} />

        {/* Content */}
        <div className="container relative z-10 flex h-full flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="w-full max-w-2xl"
          >
            <h1 className="font-heading text-3xl font-black leading-[1.12] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.6rem]">
              Sve za život u Njemačkoj.
            </h1>

            <p className="mx-auto mt-5 max-w-lg text-base font-medium text-white/60 sm:text-lg">
              Jedna platforma za dokumente, posao, stan – All-in-One za lakši početak.
            </p>

            <p className="mx-auto mt-2 text-sm font-semibold uppercase tracking-widest text-gold drop-shadow-[0_0_16px_hsl(var(--gold)/0.4)]">
              Bez lutanja. Bez komplikacija.
            </p>

            <motion.form
              onSubmit={handleSearch}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mx-auto mt-9 flex max-w-lg items-center gap-2"
            >
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/35" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Pretraži: Kindergeld, Anmeldung, posao, stan..."
                  className="h-14 rounded-full border-white/15 bg-white/[0.07] pl-12 pr-4 text-base text-white placeholder:text-white/30 shadow-[inset_0_1px_0_hsl(0,0%,100%/0.06),0_4px_24px_hsl(215,68%,4%/0.5)] backdrop-blur-xl focus-visible:ring-[hsl(var(--gold)/0.4)] focus-visible:border-[hsl(var(--gold)/0.3)] transition-all"
                />
              </div>
              <Button
                type="submit"
                className="h-14 rounded-full bg-[hsl(var(--gold))] px-7 text-base font-bold text-[hsl(var(--gold-foreground))] shadow-[0_4px_20px_hsl(var(--gold)/0.35)] hover:bg-[hsl(var(--gold-light))] hover:shadow-[0_8px_32px_hsl(var(--gold)/0.5)] transition-all duration-300"
              >
                <Search className="h-5 w-5" />
              </Button>
            </motion.form>
          </motion.div>

          {/* Slide dots */}
          <div className="absolute bottom-7 flex gap-1.5">
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

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--gold)/0.3)] to-transparent" />
      </section>

      {/* ─── HERO AD BANNER ─── */}
      <HeroAdBanner />

      {/* ─── DASHBOARD: SIDEBAR + CONTENT ─── */}
      <div className="flex">
        {/* Left sidebar — desktop only, sticky */}
        <nav className="hidden md:flex w-[260px] shrink-0 flex-col border-r border-border/40 bg-[hsl(215,55%,7%)] sticky top-0 self-start h-screen py-6 px-3">
          <p className="mb-4 px-3 text-[11px] font-semibold uppercase tracking-widest text-white/30">
            Navigacija
          </p>
          <ul className="space-y-1">
            {sidebarNav.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="group flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-white/55 transition-all duration-200 hover:bg-white/5 hover:text-white"
                >
                  <item.icon className="h-[18px] w-[18px] shrink-0 text-white/35 transition-colors group-hover:text-gold" />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right content */}
        <div className="flex-1 min-w-0">
          {/* WOW Section */}
          <WowSection />

          {/* Mobile nav */}
          <div className="md:hidden bg-background px-4 py-6">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Navigacija
            </p>
            <div className="grid grid-cols-2 gap-2">
              {sidebarNav.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="flex items-center gap-2.5 rounded-lg border border-border/40 bg-card p-3 text-sm font-medium transition-all hover:border-border hover:shadow-sm"
                >
                  <item.icon className="h-4 w-4 shrink-0 text-gold" />
                  <span className="truncate text-xs">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Premium Ad Carousel */}
          <AdCarousel />

          {/* Flow Ad Banners */}
          <AdFlowBanner />
        </div>
      </div>
    </>
  );
}
