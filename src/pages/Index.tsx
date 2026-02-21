import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText, Briefcase, Building2, HeartPulse, GraduationCap, HelpCircle,
  ClipboardList, Landmark, Users, Trophy, Calendar, Bus,
  UtensilsCrossed, ShoppingBag, CakeSlice, Beef, Coffee, Store,
  ArrowRight, Star,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";

import heroBerlin from "@/assets/hero-berlin.jpg";
import heroMuenchen from "@/assets/hero-muenchen.jpg";
import heroFrankfurt from "@/assets/hero-frankfurt.jpg";
import heroHamburg from "@/assets/hero-hamburg.jpg";
import heroKoeln from "@/assets/hero-koeln.jpg";
import heroStuttgart from "@/assets/hero-stuttgart.jpg";
import heroDuesseldorf from "@/assets/hero-duesseldorf.jpg";
import heroNuernberg from "@/assets/hero-nuernberg.jpg";

/* ── Section configs ── */
const startItems = [
  { label: "Formulari & Objašnjenja", icon: FileText, to: "/formulare" },
  { label: "Tražim posao", icon: Briefcase, to: "/stellenangebote" },
  { label: "Tražim stan", icon: Building2, to: "/wohnungen" },
  { label: "Prijava boravka", icon: ClipboardList, to: "/dolazak/prijava-prebivalista" },
  { label: "Zdravstvo & Osiguranje", icon: HeartPulse, to: "/dolazak/zdravstveno-osiguranje" },
  { label: "Djeca & Škola", icon: GraduationCap, to: "/familie" },
  { label: "Administrativna pomoć", icon: HelpCircle, to: "/trebam-pomoc" },
];

const communityItems = [
  { label: "Džemati & Vjerske zajednice", icon: Landmark, to: "/dzamije" },
  { label: "Kulturna udruženja", icon: Users, to: "/community" },
  { label: "Sport & Klubovi", icon: Trophy, to: "/sport" },
  { label: "Događaji", icon: Calendar, to: "/community" },
  { label: "Balkan Ride", icon: Bus, to: "/putovanja" },
];

const lifestyleItems = [
  { label: "Balkan restorani", icon: UtensilsCrossed, to: "/restorani" },
  { label: "Prodavnice", icon: ShoppingBag, to: "/prodavnice" },
  { label: "Pekare", icon: CakeSlice, to: "/prodavnice" },
  { label: "Mesnice", icon: Beef, to: "/prodavnice" },
  { label: "Kafići", icon: Coffee, to: "/restorani" },
  { label: "Marketi", icon: Store, to: "/prodavnice" },
];

const reviews = [
  { name: "Amina H.", city: "München", key: "home.review1.text" as const },
  { name: "Emir K.", city: "Frankfurt", key: "home.review2.text" as const },
  { name: "Lejla M.", city: "Berlin", key: "home.review3.text" as const },
  { name: "Darko S.", city: "Stuttgart", key: "home.review4.text" as const },
];

export default function Index() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { t } = useLanguage();
  const { user, loading } = useAuth();

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
      <section className="relative h-[70vh] min-h-[420px] max-h-[640px] overflow-hidden bg-[#0B1F3A]">
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

        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1F3A]/60 via-[#0B1F3A]/40 to-[#0B1F3A]/90" />

        <div className="container relative z-10 flex h-full flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-xl"
          >
            <h1 className="font-heading text-2xl font-black leading-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
              {t("home.hero.title")}
              <br />
              <span className="text-gold">{t("home.hero.highlight")}</span>
            </h1>
            <p className="mx-auto mt-3 max-w-sm text-sm text-white/45 sm:text-base">
              {t("home.hero.subtitle")}
            </p>

            {!loading && !user && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="mt-6"
              >
                <Link
                  to="/register"
                  className="btn-gold-gradient inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm font-bold tracking-wide"
                >
                  {t("home.hero.cta")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            )}
          </motion.div>

          {/* City label + dots */}
          <div className="absolute bottom-14 left-1/2 -translate-x-1/2">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-[10px] font-semibold uppercase tracking-[0.5em] text-white/20"
              >
                {slides[currentSlide].city}
              </motion.span>
            </AnimatePresence>
          </div>
          <div className="absolute bottom-6 flex gap-1.5">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`rounded-full transition-all duration-500 ${
                  idx === currentSlide ? "h-1.5 w-6 bg-gold" : "h-1.5 w-1.5 bg-white/20"
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 1: START U NJEMAČKOJ ─── */}
      <section className="py-12 sm:py-16">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="rounded-2xl border border-border/60 bg-card p-6 sm:p-8 shadow-sm">
              <div className="mb-6">
                <h2 className="font-heading text-xl font-extrabold uppercase tracking-wide sm:text-2xl">
                  Start u Njemačkoj
                </h2>
                <p className="mt-1 text-xs text-muted-foreground tracking-wide">
                  Formulari • Posao • Stan • Pomoć • Integracija
                </p>
              </div>

              <div className="grid gap-1">
                {startItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.to}
                    className="group flex items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-muted/60"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/6 text-primary transition-colors group-hover:bg-primary/10">
                      <item.icon className="h-[18px] w-[18px]" strokeWidth={1.6} />
                    </div>
                    <span className="text-sm font-medium">{item.label}</span>
                    <ArrowRight className="ml-auto h-3.5 w-3.5 text-muted-foreground/40 transition-transform group-hover:translate-x-0.5 group-hover:text-foreground/60" />
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="section-separator" />

      {/* ─── SECTION 2: COMMUNITY ─── */}
      <section className="py-12 sm:py-16">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="rounded-2xl border border-border/60 bg-card p-6 sm:p-8 shadow-sm">
              <div className="mb-6">
                <h2 className="font-heading text-xl font-extrabold uppercase tracking-wide sm:text-2xl">
                  Community
                </h2>
                <p className="mt-1 text-xs text-muted-foreground tracking-wide">
                  Zajednica Balkana u Njemačkoj
                </p>
              </div>

              <div className="grid gap-1">
                {communityItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.to}
                    className="group flex items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-muted/60"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/6 text-primary transition-colors group-hover:bg-primary/10">
                      <item.icon className="h-[18px] w-[18px]" strokeWidth={1.6} />
                    </div>
                    <span className="text-sm font-medium">{item.label}</span>
                    <ArrowRight className="ml-auto h-3.5 w-3.5 text-muted-foreground/40 transition-transform group-hover:translate-x-0.5 group-hover:text-foreground/60" />
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="section-separator" />

      {/* ─── SECTION 3: LIFESTYLE ─── */}
      <section className="py-12 sm:py-16">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="rounded-2xl border border-border/60 bg-card p-6 sm:p-8 shadow-sm">
              <div className="mb-6">
                <h2 className="font-heading text-xl font-extrabold uppercase tracking-wide sm:text-2xl">
                  Lifestyle
                </h2>
                <p className="mt-1 text-xs text-muted-foreground tracking-wide">
                  Gastronomija • Kupovina • Svakodnevica
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {lifestyleItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.to}
                    className="group flex flex-col items-center gap-2 rounded-xl border border-border/40 bg-background p-4 text-center transition-all hover:border-border hover:shadow-sm"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/6 text-primary transition-colors group-hover:bg-primary/10">
                      <item.icon className="h-[18px] w-[18px]" strokeWidth={1.6} />
                    </div>
                    <span className="text-xs font-medium leading-tight">{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="section-separator" />

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-12 sm:py-16">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="font-heading text-xl font-extrabold sm:text-2xl">
              {t("home.testimonials.title")}
            </h2>
          </motion.div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {reviews.map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-xl border border-border/50 bg-card p-5"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted font-heading text-xs font-bold text-foreground">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{review.name}</p>
                    <p className="text-[11px] text-muted-foreground">{review.city}</p>
                  </div>
                  <div className="ml-auto flex gap-0.5 text-gold">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="h-3 w-3 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-[13px] leading-relaxed text-muted-foreground">
                  „{t(review.key)}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
