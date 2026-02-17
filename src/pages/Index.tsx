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
    { image: heroBerlin, headline: t("hero.slide1.title"), subtitle: t("hero.slide1.subtitle"), city: "Berlin" },
    { image: heroMuenchen, headline: t("hero.slide2.title"), subtitle: t("hero.slide2.subtitle"), city: "München" },
    { image: heroFrankfurt, headline: t("hero.slide3.title"), subtitle: t("hero.slide3.subtitle"), city: "Frankfurt" },
    { image: heroHamburg, headline: t("hero.slide1.title"), subtitle: t("hero.slide1.subtitle"), city: "Hamburg" },
    { image: heroKoeln, headline: t("hero.slide2.title"), subtitle: t("hero.slide2.subtitle"), city: "Köln" },
    { image: heroStuttgart, headline: t("hero.slide3.title"), subtitle: t("hero.slide3.subtitle"), city: "Stuttgart" },
    { image: heroDuesseldorf, headline: t("hero.slide1.title"), subtitle: t("hero.slide1.subtitle"), city: "Düsseldorf" },
    { image: heroNuernberg, headline: t("hero.slide2.title"), subtitle: t("hero.slide2.subtitle"), city: "Nürnberg" },
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
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <>
      {/* Hero Slideshow */}
      <section className="relative overflow-hidden bg-foreground">
        <div className="relative min-h-[320px] sm:min-h-[400px] lg:min-h-[480px]">
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

          <div className="container relative z-10 flex h-full min-h-[320px] flex-col justify-end pb-8 pt-16 sm:min-h-[400px] sm:pb-12 lg:min-h-[480px] lg:pb-14">
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
            <div className="mt-5 flex gap-2">
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

      {/* Mobile Register CTA */}
      {!loading && !user && (
        <section className="border-b bg-primary py-3 lg:hidden">
          <div className="container flex justify-center">
            <Button size="lg" variant="secondary" asChild className="w-full max-w-sm font-semibold">
              <Link to="/register">{t("cta.register")}</Link>
            </Button>
          </div>
        </section>
      )}

      {/* Portal Grid */}
      <section className="py-12">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {portalCards.map((card) => (
              <motion.div
                key={card.to}
                variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.3 } } }}
              >
                <Link
                  to={card.to}
                  className="group flex items-start gap-4 rounded-xl border bg-card p-5 shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <card.icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-sm font-semibold">{card.title}</h2>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{card.desc}</p>
                  </div>
                  <ArrowRight className="ml-auto mt-1 h-4 w-4 shrink-0 text-muted-foreground/40 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
