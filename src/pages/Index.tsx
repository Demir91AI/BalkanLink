import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, MapPin, LifeBuoy, Search, ArrowRight, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CATEGORIES } from "@/lib/categories";

import heroArrival from "@/assets/hero-arrival.jpg";
import heroLiving from "@/assets/hero-living.jpg";
import heroWork from "@/assets/hero-work.jpg";

const slides = [
  {
    image: heroArrival,
    headline: "Tvoj vodič za život u Njemačkoj",
    subtitle: "Provjerene informacije, korak po korak — na tvom jeziku.",
  },
  {
    image: heroLiving,
    headline: "Dom daleko od doma",
    subtitle: "Stan, prijava, ugovori — vodimo te kroz svaki korak.",
  },
  {
    image: heroWork,
    headline: "Karijera bez granica",
    subtitle: "Posao, CV, intervju i radna prava — sve na jednom mjestu.",
  },
];

const heroCards = [
  {
    title: "Novi u Njemačkoj",
    description: "Prvi koraci, dokumenti, registracija.",
    icon: Compass,
    to: "/qa?filter=dolazak",
    gradient: "from-primary to-primary/80",
  },
  {
    title: "Svakodnevnica",
    description: "Stan, posao, porezi, zdravstvo.",
    icon: MapPin,
    to: "/qa",
    gradient: "from-balkan-green to-balkan-green/80",
  },
  {
    title: "Hitna pomoć",
    description: "Brza rješenja za probleme.",
    icon: LifeBuoy,
    to: "/qa?filter=problemi",
    gradient: "from-balkan-red to-balkan-red/80",
  },
];

const balkanCountries = [
  { name: "Bosna i Hercegovina", flag: "🇧🇦" },
  { name: "Hrvatska", flag: "🇭🇷" },
  { name: "Srbija", flag: "🇷🇸" },
  { name: "Kosovo", flag: "🇽🇰" },
  { name: "Albanija", flag: "🇦🇱" },
  { name: "Makedonija", flag: "🇲🇰" },
  { name: "Crna Gora", flag: "🇲🇪" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Index() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <>
      {/* Hero — Slideshow + Side Cards */}
      <section className="relative overflow-hidden bg-foreground">
        <div className="container relative flex flex-col lg:flex-row lg:items-stretch lg:gap-0">
          {/* Slideshow */}
          <div className="relative min-h-[320px] flex-1 sm:min-h-[400px] lg:min-h-[520px]">
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              </motion.div>
            </AnimatePresence>

            {/* Text overlay */}
            <div className="relative z-10 flex h-full min-h-[320px] flex-col justify-end p-6 sm:min-h-[400px] sm:p-10 lg:min-h-[520px] lg:p-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                >
                  <h1 className="max-w-lg text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-5xl">
                    {slides[currentSlide].headline}
                  </h1>
                  <p className="mt-2 max-w-md text-sm text-white/80 sm:mt-3 sm:text-lg">
                    {slides[currentSlide].subtitle}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Slide indicators */}
              <div className="mt-5 flex gap-2">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      idx === currentSlide
                        ? "w-8 bg-white"
                        : "w-4 bg-white/40 hover:bg-white/60"
                    }`}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Side CTA Cards — compact, professional */}
          <div className="flex flex-row gap-0 lg:w-72 lg:flex-col">
            {heroCards.map((card, idx) => (
              <Link
                key={card.title}
                to={card.to}
                className={`group relative flex flex-1 flex-col items-center justify-center gap-1.5 bg-gradient-to-br p-4 text-center text-white transition-all hover:brightness-110 lg:items-start lg:justify-center lg:gap-2 lg:p-5 lg:text-left ${card.gradient} ${
                  idx < heroCards.length - 1 ? "border-r border-white/10 lg:border-b lg:border-r-0" : ""
                }`}
              >
                <card.icon className="h-5 w-5 lg:h-6 lg:w-6" strokeWidth={1.5} />
                <h2 className="text-xs font-semibold sm:text-sm lg:text-base">{card.title}</h2>
                <p className="hidden text-xs text-white/70 lg:block">
                  {card.description}
                </p>
                <ArrowRight className="hidden h-3.5 w-3.5 text-white/50 transition-transform group-hover:translate-x-1 lg:block" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Balkan Countries */}
      <section className="border-b bg-secondary/40 py-10">
        <div className="container">
          <div className="mb-6 flex items-center justify-center gap-2 text-center">
            <Globe className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold md:text-xl">Za cijeli Balkan</h2>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {balkanCountries.map((country) => (
              <motion.div
                key={country.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-2 rounded-full border bg-card px-4 py-2 shadow-sm transition-shadow hover:shadow-md"
              >
                <span className="text-xl leading-none">{country.flag}</span>
                <span className="text-sm font-medium">{country.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold md:text-3xl">Kategorije</h2>
            <p className="mt-2 text-muted-foreground">
              Izaberi temu i pronađi odgovor za par sekundi.
            </p>
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
                  className="group flex flex-col items-center gap-2 rounded-xl border bg-card p-4 text-center transition-all hover:border-primary/40 hover:bg-secondary hover:shadow-md"
                >
                  <cat.icon className="h-7 w-7 text-primary transition-transform group-hover:scale-110" />
                  <span className="text-xs font-medium">{cat.label}</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA — Business Directory */}
      <section className="border-t bg-muted/30 py-16">
        <div className="container flex flex-col items-center gap-6 text-center">
          <h2 className="text-2xl font-bold md:text-3xl">Imaš biznis?</h2>
          <p className="max-w-md text-muted-foreground">
            Dodaj svoj biznis u naš imenik i budi vidljiv za cijelu zajednicu.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button size="lg" asChild>
              <Link to="/directory">
                <Search className="mr-2 h-4 w-4" />
                Pretraži imenik
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/directory/submit">Dodaj svoj biznis</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
