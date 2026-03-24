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
import heroFreilassing from "@/assets/hero-freilassing-real.jpg";

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

export default function Index() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const { t } = useLanguage();
  const navigate = useNavigate();

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 4000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  // Preload all images on mount
  useEffect(() => {
    slides.forEach((s) => {
      const img = new Image();
      img.src = s.image;
    });
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/qa?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <>
      {/* ─── HERO — FULL WIDTH, 88vh ─── */}
      <section className="relative h-[88vh] min-h-[560px] max-h-[960px] overflow-hidden bg-[hsl(215,68%,6%)]">
        {/* Crossfade slider — all images stacked, only current one visible */}
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className="absolute inset-0 transition-opacity duration-[800ms] ease-in-out"
            style={{
              opacity: idx === currentSlide ? 1 : 0,
              zIndex: idx === currentSlide ? 1 : 0,
            }}
          >
            <img
              src={slide.image}
              alt={slide.city}
              className="h-full w-full object-cover transition-transform duration-[4000ms] ease-out"
              style={{
                filter: "brightness(0.82) saturate(1.2) contrast(1.08)",
                transform: idx === currentSlide ? "scale(1.05)" : "scale(1)",
              }}
              loading="eager"
            />
          </div>
        ))}

        {/* Overlays — stronger for text readability */}
        <div className="absolute inset-0 z-[2] bg-black/40" />
        <div className="absolute inset-0 z-[2] bg-gradient-to-b from-black/30 via-transparent to-black/70" />

        {/* Content — always on top, stable */}
        <div className="container relative z-10 flex h-full flex-col items-center justify-center text-center px-5">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="w-full max-w-3xl"
          >
            {/* H1 */}
            <h1
              className="font-heading whitespace-nowrap text-xl font-black leading-[1.15] tracking-tight text-white sm:text-2xl md:text-3xl lg:text-[3.2rem]"
              style={{ textShadow: "0 4px 30px rgba(0,0,0,0.5)" }}
            >
              BalkanLink – Tvoj put do uspjeha u{" "}
              <span className="text-[#FFCC00] drop-shadow-[0_0_24px_rgba(255,204,0,0.45)]">
                Njemačkoj.
              </span>
            </h1>

            {/* H2 */}
            <p
              className="mx-auto mt-5 max-w-xl text-sm font-semibold leading-relaxed sm:text-base md:text-lg"
              style={{ color: "#F0F0F0", textShadow: "0 2px 12px rgba(0,0,0,0.4)" }}
            >
              Sve što ti treba za uspješan start na jednom, provjerenom mjestu.
              <br className="hidden sm:block" />{" "}
              Dokumenti, stanovi i poslovi – na tvom jeziku i bez suvišne birokratije.
            </p>

            {/* Search bar */}
            <motion.form
              onSubmit={handleSearch}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mx-auto mt-8 flex max-w-lg items-center gap-2"
            >
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#FFCC00]" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Pretraži: Kindergeld, Anmeldung, posao, stan..."
                  className="h-14 rounded-full border-none bg-white pl-12 pr-4 text-base text-foreground placeholder:text-muted-foreground shadow-[0_8px_32px_rgba(0,0,0,0.25)] focus-visible:ring-2 focus-visible:ring-[#FFCC00]/50 transition-all"
                />
              </div>
              <Button
                type="submit"
                className="h-14 rounded-full bg-[#FFCC00] px-7 text-base font-bold text-[hsl(var(--gold-foreground))] shadow-[0_4px_20px_rgba(255,204,0,0.35)] hover:bg-[#FFD633] hover:shadow-[0_8px_32px_rgba(255,204,0,0.5)] transition-all duration-300"
              >
                <Search className="h-5 w-5" />
              </Button>
            </motion.form>

            {/* Quick-link tags */}
            <div className="mx-auto mt-5 flex flex-wrap justify-center gap-2 max-w-lg">
              {[
                { label: "Prvi koraci", to: "/dolazak/prvi-koraci" },
                { label: "Formulari", to: "/formulari" },
                { label: "Poslovi", to: "/stellenangebote" },
                { label: "Vize", to: "/dolazak/boravisna-dozvola" },
              ].map((tag) => (
                <Link
                  key={tag.to}
                  to={tag.to}
                  className="rounded-full border border-white/40 px-4 py-1.5 text-xs font-medium text-white/80 backdrop-blur-sm transition-all duration-200 hover:border-white hover:bg-white/10 hover:text-white sm:text-sm"
                >
                  {tag.label}
                </Link>
              ))}
            </div>

            {/* Bottom slogan */}
            <p
              className="mx-auto mt-6 max-w-lg text-xs font-light italic leading-relaxed sm:text-sm"
              style={{ color: "#E0E0E0", textShadow: "0 2px 10px rgba(0,0,0,0.4)" }}
            >
              Jedna platforma za sve tvoje potrebe. Kompletan vodič kroz život, rad i administraciju.
              <br className="hidden sm:block" />{" "}
              Rješavaj stvari pametnije, a ne teže.
            </p>
          </motion.div>

          {/* Slide dots */}
          <div className="absolute bottom-7 flex gap-1.5">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`rounded-full transition-all duration-500 ${
                  idx === currentSlide
                    ? "h-1.5 w-7 bg-[#FFCC00] shadow-[0_0_8px_rgba(255,204,0,0.5)]"
                    : "h-1.5 w-1.5 bg-white/20 hover:bg-white/35"
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-10 h-px bg-gradient-to-r from-transparent via-[hsl(var(--gold)/0.3)] to-transparent" />
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
