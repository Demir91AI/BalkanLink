import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText, Briefcase, Building2, HeartPulse, ScanSearch,
  ClipboardList, Wallet, Search,
  ArrowRight, Car, Banknote, Calculator, Users, Receipt,
  Home, ShieldCheck, Footprints, CreditCard,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import heroBerlin from "@/assets/hero-berlin.jpg";
import heroMuenchen from "@/assets/hero-muenchen.jpg";
import heroFrankfurt from "@/assets/hero-frankfurt.jpg";
import heroHamburg from "@/assets/hero-hamburg.jpg";
import heroKoeln from "@/assets/hero-koeln.jpg";
import heroStuttgart from "@/assets/hero-stuttgart.jpg";
import heroDuesseldorf from "@/assets/hero-duesseldorf.jpg";
import heroNuernberg from "@/assets/hero-nuernberg.jpg";

/* ── Formulare categories ── */
const formulareCategories = [
  { labelKey: "home.cat.familie", icon: Users, to: "/familie" },
  { labelKey: "home.cat.finanzen", icon: Receipt, to: "/foerderungen" },
  { labelKey: "home.cat.wohnen", icon: Building2, to: "/formulari" },
  { labelKey: "home.cat.arbeit", icon: Briefcase, to: "/stellenangebote" },
  { labelKey: "home.cat.dokumente", icon: FileText, to: "/formulari" },
  { labelKey: "home.cat.fahrzeuge", icon: Car, to: "/dolazak/auto-anmelden" },
  { labelKey: "home.cat.gesundheit", icon: HeartPulse, to: "/dolazak/zdravstveno-osiguranje" },
];

/* ── Schnellzugriff ── */
const schnellzugriffItems = [
  { labelKey: "home.schnellzugriff.wohnung", icon: Home, to: "/wohnungen" },
  { labelKey: "home.schnellzugriff.job", icon: Briefcase, to: "/stellenangebote" },
  { labelKey: "home.schnellzugriff.biete", icon: ClipboardList, to: "/nudim-trazim" },
];

/* ── Tools ── */
const toolItems = [
  { labelKey: "home.item.rechner", icon: Calculator, to: "/tools" },
  { labelKey: "home.item.prijava", icon: ClipboardList, to: "/dolazak/prijava-prebivalista" },
  { labelKey: "home.item.banka", icon: Wallet, to: "/dolazak/bankovni-racun" },
  { labelKey: "home.item.foerderungen", icon: Banknote, to: "/foerderungen" },
];

/* ── Aufenthalt ── */
const aufenthaltItems = [
  { labelKey: "home.aufenthalt.boravak", icon: ShieldCheck, to: "/dolazak/boravisna-dozvola" },
  { labelKey: "home.aufenthalt.koraci", icon: Footprints, to: "/dolazak/prvi-koraci" },
  { labelKey: "home.aufenthalt.dozvola", icon: CreditCard, to: "/dolazak/fuehrerschein" },
];

/* ── Ad Banner placeholder ── */
function AdBanner({ id, t }: { id: number; t: (k: string) => string }) {
  return (
    <div className="rounded-xl border border-dashed border-border/40 bg-muted/30 py-6 text-center text-xs text-muted-foreground">
      {t("home.ad.placeholder")} #{id}
    </div>
  );
}

/* ── Section wrapper ── */
function Section({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
    >
      {children}
    </motion.section>
  );
}

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
      {/* ─── HERO ─── */}
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
            <img src={slides[currentSlide].image} alt={slides[currentSlide].city} className="h-full w-full object-cover" loading="eager" />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--primary)/0.7)] via-[hsl(var(--primary)/0.4)] to-[hsl(var(--primary)/0.95)]" />
        <div className="absolute bottom-10 left-[12.5%] right-[12.5%] z-[1] pointer-events-none h-[2px]" aria-hidden="true"
          style={{ background: 'linear-gradient(90deg, rgba(34,211,238,0.5), rgba(56,189,248,0.4), rgba(34,211,238,0.5))', filter: 'drop-shadow(0 0 4px rgba(34,211,238,0.3))' }} />

        <div className="container relative z-10 flex h-full flex-col items-center justify-center text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="w-full max-w-lg">
            <h1 className="font-heading text-2xl font-black leading-tight text-white sm:text-3xl md:text-4xl">
              {t("home.hero.title")}<br />
              <span className="text-gold">{t("home.hero.highlight")}</span>
            </h1>
            <p className="mx-auto mt-2 max-w-sm text-sm text-white/40">{t("home.hero.subtitle")}</p>

            {/* Search bar */}
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
              <Button type="submit" size="lg" className="rounded-xl bg-gold text-primary-foreground hover:bg-gold/90 font-bold shadow-lg">
                <Search className="h-4 w-4" />
              </Button>
            </form>
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

        {/* ─── AD #1 ─── */}
        <AdBanner id={1} t={t} />

        {/* ─── 1. FORMULARE — DOMINANT ─── */}
        <Section>
          <div className="rounded-2xl border-2 border-gold/30 bg-card p-6 sm:p-8 shadow-md">
            <div className="mb-2">
              <h2 className="font-heading text-xl font-extrabold uppercase tracking-wide sm:text-2xl">
                {t("home.formulare.title")}
              </h2>
              <p className="text-sm text-muted-foreground">{t("home.formulare.subtitle")}</p>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {formulareCategories.map((item) => (
                <Link key={item.labelKey} to={item.to}
                  className="group flex flex-col items-center gap-3 rounded-xl border border-border/40 bg-background p-5 text-center transition-all hover:border-gold/40 hover:shadow-md hover:-translate-y-0.5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold transition-colors group-hover:bg-gold/20">
                    <item.icon className="h-5 w-5" strokeWidth={1.6} />
                  </div>
                  <span className="text-sm font-semibold leading-tight">{t(item.labelKey)}</span>
                </Link>
              ))}
            </div>
            <div className="mt-6 flex justify-center">
              <Button asChild variant="outline" className="rounded-xl">
                <Link to="/formulari" className="inline-flex items-center gap-2">
                  {t("home.item.formulari")} <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </Section>

        {/* ─── AD #2 ─── */}
        <AdBanner id={2} t={t} />

        {/* ─── 2. SCHNELLZUGRIFF ─── */}
        <Section delay={0.05}>
          <div className="rounded-2xl border border-border/60 bg-card p-5 sm:p-7 shadow-sm">
            <h2 className="font-heading text-base font-bold uppercase tracking-wide sm:text-lg">{t("home.schnellzugriff.title")}</h2>
            <p className="text-xs text-muted-foreground">{t("home.schnellzugriff.subtitle")}</p>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {schnellzugriffItems.map((item) => (
                <Link key={item.labelKey} to={item.to}
                  className="group flex flex-col items-center gap-2 rounded-xl border border-border/40 bg-background p-4 text-center transition-all hover:border-gold/40 hover:shadow-sm hover:-translate-y-0.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold/10 text-gold transition-colors group-hover:bg-gold/20">
                    <item.icon className="h-[18px] w-[18px]" strokeWidth={1.6} />
                  </div>
                  <span className="text-xs font-medium leading-tight">{t(item.labelKey)}</span>
                </Link>
              ))}
            </div>
          </div>
        </Section>

        {/* ─── 3. TOOLS & RECHNER ─── */}
        <Section delay={0.1}>
          <div className="rounded-2xl border border-border/60 bg-card p-5 sm:p-7 shadow-sm">
            <h2 className="font-heading text-base font-bold uppercase tracking-wide sm:text-lg">{t("home.tools.title")}</h2>
            <p className="text-xs text-muted-foreground">{t("home.tools.subtitle")}</p>
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {toolItems.map((item) => (
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
        </Section>

        {/* ─── AD #3 ─── */}
        <AdBanner id={3} t={t} />

        {/* ─── 4. DOKUMENTEN-CHECK ─── */}
        <Section delay={0.1}>
          <div className="rounded-2xl border border-border/60 bg-card p-5 sm:p-7 shadow-sm">
            <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:text-left">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gold/10 text-gold">
                <ScanSearch className="h-6 w-6" strokeWidth={1.6} />
              </div>
              <div className="flex-1">
                <h2 className="font-heading text-base font-bold uppercase tracking-wide sm:text-lg">{t("home.dokcheck.title")}</h2>
                <p className="text-xs text-muted-foreground">{t("home.dokcheck.subtitle")}</p>
              </div>
              <Button asChild className="rounded-xl bg-gold text-primary-foreground hover:bg-gold/90 font-bold">
                <Link to="/dokumenten-check">
                  {t("home.dokcheck.cta")} <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </Section>

        {/* ─── AD #4 ─── */}
        <AdBanner id={4} t={t} />

        {/* ─── 5. AUFENTHALT & AUFENTHALTSTITEL ─── */}
        <Section delay={0.15}>
          <div className="rounded-2xl border border-border/60 bg-card p-5 sm:p-7 shadow-sm">
            <h2 className="font-heading text-base font-bold uppercase tracking-wide sm:text-lg">{t("home.aufenthalt.title")}</h2>
            <p className="text-xs text-muted-foreground">{t("home.aufenthalt.subtitle")}</p>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {aufenthaltItems.map((item) => (
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
        </Section>

        {/* ─── AD #5 ─── */}
        <AdBanner id={5} t={t} />
      </div>
    </>
  );
}
