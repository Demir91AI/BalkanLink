import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Plane, Building2, Briefcase, Users, Scale, FileText, Wrench, Landmark, Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
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

export default function Index() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { t } = useLanguage();
  const { user, loading } = useAuth();

  const slides = [
    { image: heroFrankfurt, city: "Frankfurt" },
    { image: heroBerlin, city: "Berlin" },
    { image: heroMuenchen, city: "München" },
    { image: heroHamburg, city: "Hamburg" },
    { image: heroKoeln, city: "Köln" },
    { image: heroStuttgart, city: "Stuttgart" },
    { image: heroDuesseldorf, city: "Düsseldorf" },
    { image: heroNuernberg, city: "Nürnberg" },
  ];

  const portalCards = [
    { title: t("portal.dolazak"), desc: t("portal.dolazak.desc"), icon: Plane, to: "/dolazak" },
    { title: t("portal.stan"), desc: t("portal.stan.desc"), icon: Building2, to: "/wohnungen" },
    { title: t("portal.jobs"), desc: t("portal.jobs.desc"), icon: Briefcase, to: "/stellenangebote" },
    { title: t("portal.familie"), desc: t("portal.familie.desc"), icon: Users, to: "/familie" },
    { title: t("portal.foerderungen"), desc: t("portal.foerderungen.desc"), icon: Scale, to: "/foerderungen" },
    { title: t("portal.formulare"), desc: t("portal.formulare.desc"), icon: FileText, to: "/formulare" },
    { title: t("portal.tools"), desc: t("portal.tools.desc"), icon: Wrench, to: "/generatoren" },
    { title: t("portal.ambasade"), desc: t("portal.ambasade.desc"), icon: Landmark, to: "/ambasade-konzulati" },
    { title: t("portal.community"), desc: t("portal.community.desc"), icon: Heart, to: "/community" },
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 7000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <>
      {/* Cinematic Hero */}
      <section className="relative h-[85vh] min-h-[500px] overflow-hidden bg-foreground">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].city}
              className="h-full w-full object-cover blur-[2px] scale-105"
              loading="eager"
            />
          </motion.div>
        </AnimatePresence>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />

        {/* Content */}
        <div className="container relative z-10 flex h-full flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-3xl"
          >
            <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
              {t("hero.slide1.title")}
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
              {t("hero.slide1.subtitle")}
            </p>

            {!loading && !user && (
              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Button size="lg" asChild className="bg-gold text-gold-foreground hover:bg-gold/90 font-semibold px-8">
                  <Link to="/register">{t("cta.register")}</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="border-white/30 text-white hover:bg-white/10">
                  <Link to="/dolazak">{t("portal.dolazak")}</Link>
                </Button>
              </div>
            )}
          </motion.div>

          {/* City name */}
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-xs font-medium uppercase tracking-[0.3em] text-white/40"
              >
                {slides[currentSlide].city}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="absolute bottom-8 flex gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1 rounded-full transition-all duration-500 ${
                  idx === currentSlide ? "w-10 bg-gold" : "w-3 bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Portal Grid */}
      <section className="py-16 lg:py-20">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {portalCards.map((card) => (
              <motion.div
                key={card.to}
                variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
              >
                <Link
                  to={card.to}
                  className="group flex items-start gap-4 rounded-xl border bg-card p-6 shadow-sm transition-all duration-300 hover:border-gold/40 hover:shadow-lg hover:-translate-y-0.5"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-gold/10 group-hover:text-gold">
                    <card.icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-sm font-bold">{card.title}</h2>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{card.desc}</p>
                  </div>
                  <ArrowRight className="ml-auto mt-1 h-4 w-4 shrink-0 text-muted-foreground/30 transition-all group-hover:translate-x-0.5 group-hover:text-gold" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
