import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText, Briefcase, Search, ArrowRight,
  Footprints, ShieldCheck, Compass, Wrench,
  Megaphone, Building2, Home,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { HeroAdBanner, VideoAdSection, InlineAdBanner } from "@/components/home/AdSections";
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

  const MAILTO_AD = `mailto:info@balkanlink.de?subject=${encodeURIComponent("Oglašavanje na BalkanLink")}&body=${encodeURIComponent(
    "Pozdrav,\n\nZanima me oglašavanje na BalkanLink platformi.\n\nNaziv firme:\nVrsta usluge:\nGrad:\nBudžet:\n"
  )}`;

  const MAILTO_QUOTE = `mailto:info@balkanlink.de?subject=${encodeURIComponent("Upit za reklamu")}&body=${encodeURIComponent(
    "Pozdrav,\n\nZanima me ponuda za oglašavanje.\n\nNaziv firme:\nŠta nudite:\nGrad:\n"
  )}`;

  const valuePoints = [
    { icon: FileText, text: "Popuni formular bez greške" },
    { icon: Briefcase, text: "Nađi posao ili stan brže" },
    { icon: ShieldCheck, text: "Razumij sistem kao da si ovdje rođen" },
  ];

  return (
    <>
      {/* ─── HERO — FULL WIDTH, DOMINANT ─── */}
      <section className="relative min-h-[85vh] overflow-hidden bg-[hsl(var(--primary))]">
        {/* Background slider with blur */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].city}
              className="h-full w-full object-cover"
              style={{ filter: "brightness(0.7) saturate(1.2) contrast(1.1) blur(2px)" }}
              loading="eager"
            />
          </motion.div>
        </AnimatePresence>

        {/* Multi-layer cinematic overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(215,68%,4%/0.85)] via-[hsl(215,60%,6%/0.6)] to-[hsl(215,68%,4%/0.97)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(215,68%,4%/0.5)] via-transparent to-[hsl(215,68%,4%/0.5)]" />

        {/* Decorative glows */}
        <div className="absolute left-1/4 top-1/3 h-80 w-80 rounded-full bg-[hsl(var(--gold)/0.06)]" style={{ filter: "blur(120px)" }} />
        <div className="absolute right-1/4 bottom-1/3 h-64 w-64 rounded-full bg-[hsl(215,68%,30%/0.08)]" style={{ filter: "blur(100px)" }} />

        <div className="container relative z-10 flex min-h-[85vh] items-center py-20">
          <div className="grid w-full items-center gap-12 lg:grid-cols-[1fr_auto]">
            {/* Left — Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="max-w-2xl"
            >
              {/* Headline */}
              <h1 className="font-heading text-4xl font-black leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[4rem]">
                Snalaženje u Njemačkoj –
                <br />
                <span className="text-gold drop-shadow-[0_0_32px_hsl(var(--gold)/0.4)]">bez lutanja, bez grešaka.</span>
              </h1>

              {/* Subheadline */}
              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/50 sm:text-lg">
                BalkanLink je tvoj digitalni vodič kroz Njemačku – formulari, posao, stan, dokumenti i realan život na jednom mjestu. Bez komplikacija. Bez gubljenja vremena.
              </p>

              {/* Value points */}
              <ul className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-6">
                {valuePoints.map((vp) => (
                  <li key={vp.text} className="flex items-center gap-2.5 text-sm font-medium text-white/60">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[hsl(var(--gold)/0.12)]">
                      <vp.icon className="h-3.5 w-3.5 text-[hsl(var(--gold))]" />
                    </span>
                    {vp.text}
                  </li>
                ))}
              </ul>

              {/* Trust text */}
              <p className="mt-6 text-sm font-medium italic text-white/30">
                "Ovo nije još jedna informativna stranica. Ovo je platforma koja ti rješava problem."
              </p>

              {/* CTA Buttons */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <Button
                  onClick={() => navigate("/qa")}
                  className="h-14 rounded-2xl bg-[hsl(var(--gold))] px-8 text-base font-bold text-[hsl(var(--gold-foreground))] shadow-[0_4px_24px_hsl(var(--gold)/0.35)] hover:bg-[hsl(var(--gold-light))] hover:shadow-[0_6px_32px_hsl(var(--gold)/0.45)] transition-all duration-300"
                >
                  Pronađi rješenje
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  asChild
                  className="h-14 rounded-2xl border-2 border-[hsl(var(--gold)/0.3)] bg-[hsl(var(--gold)/0.08)] px-8 text-base font-semibold text-[hsl(var(--gold))] hover:bg-[hsl(var(--gold)/0.15)] hover:border-[hsl(var(--gold)/0.5)] transition-all duration-300"
                >
                  <a href={MAILTO_AD}>Oglasi se</a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-14 rounded-2xl border-white/15 bg-transparent px-8 text-base font-semibold text-white/70 hover:bg-white/5 hover:text-white hover:border-white/25 transition-all duration-300"
                >
                  <a href={MAILTO_QUOTE}>Zatraži ponudu</a>
                </Button>
              </div>

              {/* Extra text */}
              <p className="mt-5 text-xs font-medium text-white/25">
                Više od 100+ praktičnih vodiča i alata na jednom mjestu.
              </p>
            </motion.div>

            {/* Right — Abstract glow visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="hidden lg:block"
            >
              <div className="relative h-80 w-80">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[hsl(var(--gold)/0.15)] via-[hsl(215,68%,20%/0.1)] to-transparent" style={{ filter: "blur(60px)" }} />
                <div className="absolute left-8 top-8 h-48 w-48 rounded-full bg-[hsl(var(--gold)/0.08)]" style={{ filter: "blur(40px)" }} />
                <div className="absolute bottom-4 right-4 h-32 w-32 rounded-full bg-[hsl(215,68%,40%/0.1)]" style={{ filter: "blur(30px)" }} />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Search bar — floating at bottom */}
        <div className="absolute bottom-16 left-0 right-0 z-20">
          <form onSubmit={handleSearch} className="container">
            <div className="mx-auto flex max-w-xl items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/35" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t("home.search.placeholder")}
                  className="h-14 rounded-2xl border-white/10 bg-white/[0.06] pl-12 pr-4 text-base text-white placeholder:text-white/25 shadow-[inset_0_1px_0_hsl(0,0%,100%/0.05),0_8px_32px_hsl(215,68%,4%/0.6)] backdrop-blur-2xl focus-visible:ring-[hsl(var(--gold)/0.4)] focus-visible:border-[hsl(var(--gold)/0.3)] transition-all"
                />
              </div>
              <Button
                type="submit"
                className="h-14 rounded-2xl bg-[hsl(var(--gold))] px-7 text-base font-bold text-[hsl(var(--gold-foreground))] shadow-[0_4px_20px_hsl(var(--gold)/0.3)] hover:bg-[hsl(var(--gold-light))] hover:shadow-[0_6px_28px_hsl(var(--gold)/0.4)] transition-all duration-300"
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </form>
        </div>

        {/* Slide dots */}
        <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-1.5">
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

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--gold)/0.3)] to-transparent" />
      </section>

      {/* ─── HERO AD BANNER ─── */}
      <HeroAdBanner />

      {/* ─── DASHBOARD AREA: SIDEBAR + CONTENT ─── */}
      <div className="flex min-h-[60vh]">
        {/* Left sidebar */}
        <nav className="hidden md:flex w-[260px] shrink-0 flex-col border-r border-white/8 bg-[hsl(215,55%,7%)] py-6 px-3">
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

        {/* Right content area */}
        <div className="flex-1 bg-background">
          <div className="mx-auto max-w-4xl px-6 py-10 sm:py-14">
            {/* Welcome */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <h2 className="font-heading text-xl font-extrabold sm:text-2xl">
                Dobrodošli na <span className="text-gold">BalkanLink</span>
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Tvoja platforma za snalaženje u Njemačkoj — formulari, posao, stan, dokumenti i zajednica na jednom mjestu.
              </p>
            </motion.div>


            {/* Mobile nav (shown below cards on small screens) */}
            <div className="mt-8 md:hidden">
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
          </div>
        </div>
      </div>

      {/* ─── INLINE AD BANNER 1 ─── */}
      <InlineAdBanner />

      {/* ─── VIDEO AD SECTION ─── */}
      <VideoAdSection />

      {/* ─── INLINE AD BANNER 2 ─── */}
      <InlineAdBanner variant="alt" />
    </>
  );
}
