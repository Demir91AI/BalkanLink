import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText, Briefcase, Building2, HeartPulse, ScanSearch,
  ClipboardList, Landmark, Users, Trophy, Bus, Wallet,
  UtensilsCrossed, ShoppingBag, CakeSlice, Beef, Coffee, Store,
  ArrowRight, Car, Banknote,
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

/* ── Section configs ── */
const pomocItems = [
  { label: "Posao", icon: Briefcase, to: "/stellenangebote" },
  { label: "Stan", icon: Building2, to: "/wohnungen" },
  { label: "Formulari & Zahtjevi", icon: FileText, to: "/formulare" },
  { label: "Prijava boravka", icon: ClipboardList, to: "/dolazak/prijava-prebivalista" },
  { label: "Zdravstvo & Osiguranje", icon: HeartPulse, to: "/dolazak/zdravstveno-osiguranje" },
  { label: "Banka & Konto", icon: Wallet, to: "/dolazak/bankovni-racun" },
  { label: "Auto & Registracija", icon: Car, to: "/dolazak/auto-anmelden" },
  { label: "Förderungen & Pomoć države", icon: Banknote, to: "/foerderungen" },
  { label: "Dokumenten-Check", icon: ScanSearch, to: "/dokumenten-check" },
];

const zajednicaItems = [
  { label: "Bosna i Hercegovina", icon: Landmark, to: "/community/bih" },
  { label: "Hrvatska", icon: Landmark, to: "/community/hr" },
  { label: "Srbija", icon: Landmark, to: "/community/srb" },
  { label: "Crna Gora", icon: Landmark, to: "/community/me" },
  { label: "Sjeverna Makedonija", icon: Landmark, to: "/community/mk" },
  { label: "Kosovo", icon: Landmark, to: "/community/xk" },
  { label: "Albanija", icon: Landmark, to: "/community/al" },
];

const lifestyleItems = [
  { label: "Restorani", icon: UtensilsCrossed, to: "/restorani" },
  { label: "Pekare", icon: CakeSlice, to: "/prodavnice" },
  { label: "Mesnice", icon: Beef, to: "/prodavnice" },
  { label: "Balkan prodavnice", icon: Store, to: "/prodavnice" },
  { label: "Kafići & Slastičarne", icon: Coffee, to: "/restorani" },
  { label: "Marketi", icon: ShoppingBag, to: "/prodavnice" },
];

const SectionItem = ({ item }: { item: { label: string; icon: any; to: string } }) => (
  <Link
    to={item.to}
    className="group flex items-center gap-3 rounded-lg px-3 py-3 transition-colors hover:bg-muted/60"
  >
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/8 text-primary transition-colors group-hover:bg-primary/14">
      <item.icon className="h-[18px] w-[18px]" strokeWidth={1.6} />
    </div>
    <span className="text-sm font-medium text-foreground">{item.label}</span>
    <ArrowRight className="ml-auto h-3.5 w-3.5 text-muted-foreground/40 transition-transform group-hover:translate-x-0.5 group-hover:text-foreground/60" />
  </Link>
);

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
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1F3A]/60 via-[#0B1F3A]/40 to-[#0B1F3A]/90" />
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
        {/* ─── 1. POMOĆ U NJEMAČKOJ ─── */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
          <div className="rounded-2xl border border-border/60 bg-card p-5 sm:p-7 shadow-sm">
            <div className="mb-1">
              <h2 className="font-heading text-lg font-extrabold uppercase tracking-wide sm:text-xl">Pomoć u Njemačkoj</h2>
              <p className="text-xs text-muted-foreground">Posao • Stan • Formulari • Zdravstvo • Förderungen</p>
            </div>
            <div className="mt-4 grid gap-0.5">
              {pomocItems.map((item) => <SectionItem key={item.label} item={item} />)}
            </div>
          </div>
        </motion.section>

        <div className="section-separator" />

        {/* ─── 2. ZAJEDNICA ─── */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
          <div className="rounded-2xl border border-border/60 bg-card p-5 sm:p-7 shadow-sm">
            <div className="mb-1">
              <h2 className="font-heading text-lg font-extrabold uppercase tracking-wide sm:text-xl">Zajednica</h2>
              <p className="text-xs text-muted-foreground">Vjerske zajednice • Kultura • Sport • Folklor</p>
            </div>
            <div className="mt-4 grid gap-0.5">
              {zajednicaItems.map((item) => <SectionItem key={item.label} item={item} />)}
            </div>
          </div>
        </motion.section>

        <div className="section-separator" />

        {/* ─── 3. LIFESTYLE ─── */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
          <div className="rounded-2xl border border-border/60 bg-card p-5 sm:p-7 shadow-sm">
            <div className="mb-1">
              <h2 className="font-heading text-lg font-extrabold uppercase tracking-wide sm:text-xl">Lifestyle</h2>
              <p className="text-xs text-muted-foreground">Balkanska gastronomija & kupovina u Njemačkoj</p>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {lifestyleItems.map((item) => (
                <Link key={item.label} to={item.to}
                  className="group flex flex-col items-center gap-2 rounded-xl border border-border/40 bg-background p-4 text-center transition-all hover:border-border hover:shadow-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/8 text-primary transition-colors group-hover:bg-primary/14">
                    <item.icon className="h-[18px] w-[18px]" strokeWidth={1.6} />
                  </div>
                  <span className="text-xs font-medium leading-tight">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </motion.section>

        <div className="section-separator" />

        {/* ─── 4. BALKAN RIDE ─── */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
          <div className="rounded-2xl border border-border/60 bg-card p-5 sm:p-7 shadow-sm">
            <div className="mb-1">
              <h2 className="font-heading text-lg font-extrabold uppercase tracking-wide sm:text-xl">Balkan Ride</h2>
              <p className="text-xs text-muted-foreground">Nudim prijevoz • Tražim prijevoz • Putujem na Balkan</p>
            </div>
            <div className="mt-4">
              <Link to="/putovanja"
                className="group flex items-center gap-3 rounded-lg px-3 py-3 transition-colors hover:bg-muted/60">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/8 text-primary transition-colors group-hover:bg-primary/14">
                  <Bus className="h-[18px] w-[18px]" strokeWidth={1.6} />
                </div>
                <div>
                  <span className="text-sm font-medium text-foreground">Objavi ili pronađi vožnju</span>
                  <p className="text-xs text-muted-foreground">Datum • Broj mjesta • Kontakt</p>
                </div>
                <ArrowRight className="ml-auto h-3.5 w-3.5 text-muted-foreground/40 transition-transform group-hover:translate-x-0.5 group-hover:text-foreground/60" />
              </Link>
            </div>
          </div>
        </motion.section>
      </div>
    </>
  );
}
