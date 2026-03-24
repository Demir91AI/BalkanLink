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

  return (
    <>
      {/* ─── HERO — FULL WIDTH ─── */}
      <section className="relative h-[50vh] min-h-[320px] max-h-[480px] overflow-hidden bg-[hsl(var(--primary))]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].city}
              className="h-full w-full object-cover"
              loading="eager"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--primary)/0.7)] via-[hsl(var(--primary)/0.4)] to-[hsl(var(--primary)/0.95)]" />

        <div className="container relative z-10 flex h-full flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-lg"
          >
            <h1 className="font-heading text-2xl font-black leading-tight text-white sm:text-3xl md:text-4xl">
              {t("home.hero.title")}
              <br />
              <span className="text-gold">{t("home.hero.highlight")}</span>
            </h1>
            <p className="mx-auto mt-2 max-w-sm text-sm text-white/40">
              {t("home.hero.subtitle")}
            </p>

            <form onSubmit={handleSearch} className="mx-auto mt-5 flex max-w-md items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t("home.search.placeholder")}
                  className="h-11 rounded-xl border-white/20 bg-white/10 pl-10 text-white placeholder:text-white/40 backdrop-blur-sm focus-visible:ring-gold"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="rounded-xl bg-gold text-primary-foreground hover:bg-gold/90 font-bold shadow-lg"
              >
                <Search className="h-4 w-4" />
              </Button>
            </form>
          </motion.div>

          <div className="absolute bottom-5 flex gap-1.5">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`rounded-full transition-all duration-500 ${
                  idx === currentSlide
                    ? "h-1.5 w-6 bg-gold"
                    : "h-1.5 w-1.5 bg-white/20"
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
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
    </>
  );
}
