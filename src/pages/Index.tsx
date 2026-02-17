import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, MapPin, LifeBuoy, Search, ArrowRight, Globe, Landmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CATEGORIES } from "@/lib/categories";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { LANGUAGES } from "@/lib/translations";

import heroArrival from "@/assets/hero-arrival.jpg";
import heroLiving from "@/assets/hero-living.jpg";
import heroWork from "@/assets/hero-work.jpg";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export default function Index() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { t } = useLanguage();
  const { user, loading } = useAuth();

  const slides = [
    { image: heroArrival, headline: t("hero.slide1.title"), subtitle: t("hero.slide1.subtitle") },
    { image: heroLiving, headline: t("hero.slide2.title"), subtitle: t("hero.slide2.subtitle") },
    { image: heroWork, headline: t("hero.slide3.title"), subtitle: t("hero.slide3.subtitle") },
  ];

  const heroCards = [
    { title: t("cta.new.title"), description: t("cta.new.desc"), icon: Compass, to: "/dolazak" },
    { title: t("cta.daily.title"), description: t("cta.daily.desc"), icon: MapPin, to: "/zivot" },
    { title: t("cta.help.title"), description: t("cta.help.desc"), icon: LifeBuoy, to: "/probleme" },
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
      {/* Hero — Slideshow */}
      <section className="relative overflow-hidden bg-foreground">
        <div className="relative min-h-[360px] sm:min-h-[420px] lg:min-h-[520px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0"
            >
              <img
                src={slides[currentSlide].image}
                alt={slides[currentSlide].headline}
                className="h-full w-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/10" />
            </motion.div>
          </AnimatePresence>

          <div className="container relative z-10 flex h-full min-h-[360px] flex-col justify-end pb-10 pt-20 sm:min-h-[420px] sm:pb-14 lg:min-h-[520px] lg:pb-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="max-w-2xl text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-5xl">
                  {slides[currentSlide].headline}
                </h1>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/80 sm:text-base lg:text-lg">
                  {slides[currentSlide].subtitle}
                </p>
              </motion.div>
            </AnimatePresence>
            <div className="mt-6 flex gap-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    idx === currentSlide ? "w-10 bg-white" : "w-4 bg-white/40 hover:bg-white/60"
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile CTA — Register */}
      {!loading && !user && (
        <section className="border-b bg-primary py-4 lg:hidden">
          <div className="container flex justify-center">
            <Button size="lg" variant="secondary" asChild className="w-full max-w-sm font-semibold">
              <Link to="/register">Jetzt registrieren</Link>
            </Button>
          </div>
        </section>
      )}

      {/* Quick-Access Cards */}
      <section className="border-b bg-background py-10">
        <div className="container">
          <div className="grid gap-4 sm:grid-cols-3">
            {heroCards.map((card, idx) => (
              <Link
                key={idx}
                to={card.to}
                className="group flex items-start gap-4 rounded-lg border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <card.icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <div className="min-w-0">
                  <h2 className="text-sm font-semibold">{card.title}</h2>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{card.description}</p>
                </div>
                <ArrowRight className="ml-auto mt-1 h-4 w-4 shrink-0 text-muted-foreground/40 transition-transform group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — Embassies & Consulates */}
      <section className="border-b bg-secondary py-12">
        <div className="container flex flex-col items-center gap-4 text-center">
          <Landmark className="h-7 w-7 text-primary" />
          <h2 className="text-xl font-bold md:text-2xl">Traži ambasadu ili konzulat?</h2>
          <p className="max-w-md text-sm text-muted-foreground">
            Pronađi adresu, grad i tip misije za svoju državu u Njemačkoj.
          </p>
          <Button size="lg" asChild>
            <Link to="/ambasade-konzulati">Pregledaj ambasade</Link>
          </Button>
        </div>
      </section>

      {/* Balkan Countries */}
      <section className="border-b py-10">
        <div className="container">
          <div className="mb-6 flex items-center justify-center gap-2 text-center">
            <Globe className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold md:text-xl">{t("countries.title")}</h2>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {LANGUAGES.filter((l) => !["de", "en"].includes(l.code)).map((lang) => (
              <motion.div
                key={lang.code}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25 }}
                className="flex items-center gap-2 rounded-md border bg-card px-4 py-2 text-sm font-medium shadow-sm"
              >
                <span className="text-lg leading-none">{lang.flag}</span>
                <span>{lang.country}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-14">
        <div className="container">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold md:text-3xl">{t("categories.title")}</h2>
            <p className="mt-2 text-muted-foreground">{t("categories.subtitle")}</p>
          </div>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-3 gap-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9"
          >
            {CATEGORIES.map((cat) => (
              <motion.div key={cat.label} variants={item}>
                <Link
                  to={`/qa?filter=${cat.slug}`}
                  className="group flex flex-col items-center gap-2 rounded-lg border bg-card p-4 text-center shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
                >
                  <cat.icon className="h-6 w-6 text-primary" />
                  <span className="text-xs font-medium">{cat.label}</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA — Business Directory */}
      <section className="border-t bg-secondary py-14">
        <div className="container flex flex-col items-center gap-5 text-center">
          <h2 className="text-2xl font-bold md:text-3xl">{t("business.title")}</h2>
          <p className="max-w-md text-muted-foreground">{t("business.subtitle")}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button size="lg" asChild>
              <Link to="/directory">
                <Search className="mr-2 h-4 w-4" />
                {t("business.search")}
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/directory/submit">{t("business.add")}</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
