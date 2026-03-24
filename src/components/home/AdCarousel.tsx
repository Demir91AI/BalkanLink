import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ExternalLink, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";

import adAluHome from "@/assets/ad-alu-home.jpg";
import adVreboBau from "@/assets/ad-vrebo-bau.jpg";
import adPlaceholder1 from "@/assets/ad-placeholder-1.jpg";
import adPlaceholder2 from "@/assets/ad-placeholder-2.jpg";

const MAILTO_AD = `mailto:info@balkanlink.de?subject=${encodeURIComponent("Oglašavanje na BalkanLink")}&body=${encodeURIComponent(
  "Pozdrav,\n\nZanima me oglašavanje na BalkanLink platformi.\n\nNaziv firme:\nVrsta usluge:\nGrad:\nBudžet:\n"
)}`;

interface AdSlide {
  image: string;
  title: string;
  text: string;
  cta: string;
  link: string;
  isExternal: boolean;
}

const slides: AdSlide[] = [
  {
    image: adAluHome,
    title: "Alu Home – moderne alu konstrukcije",
    text: "Pergole, stakleni sistemi i vrhunska rješenja za vaš dom.",
    cta: "Posjeti stranicu",
    link: "https://www.alu-home.de/",
    isExternal: true,
  },
  {
    image: adVreboBau,
    title: "Vrebo Bau – gradnja i renoviranje",
    text: "Pouzdani građevinski radovi širom Njemačke.",
    cta: "Posjeti stranicu",
    link: "https://vrebo-bau.de/",
    isExternal: true,
  },
  {
    image: adPlaceholder1,
    title: "Mjesto za vašu reklamu",
    text: "Pozicionirajte svoj biznis pred hiljadama ljudi u Njemačkoj.",
    cta: "Oglašavaj se",
    link: MAILTO_AD,
    isExternal: false,
  },
  {
    image: adPlaceholder2,
    title: "Dosegnite prave klijente",
    text: "Vaša usluga pred ljudima koji je aktivno traže.",
    cta: "Oglašavaj se",
    link: MAILTO_AD,
    isExternal: false,
  },
];

export function AdCarousel() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((p) => (p + 1) % slides.length);
  }, []);

  useEffect(() => {
    const t = setInterval(next, 4000);
    return () => clearInterval(t);
  }, [next]);

  const slide = slides[current];

  return (
    <section className="relative h-[280px] sm:h-[320px] w-full overflow-hidden">
      {/* Background images with zoom */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="h-full w-full object-cover"
            style={{ filter: "brightness(0.35) saturate(1.1)" }}
            loading="lazy"
            width={1920}
            height={800}
          />
        </motion.div>
      </AnimatePresence>

      {/* Dark overlay + gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(215,68%,4%/0.85)] via-[hsl(215,55%,6%/0.6)] to-[hsl(215,68%,4%/0.85)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[hsl(215,68%,4%/0.7)] to-transparent" />

      {/* Gold glow */}
      <div
        className="absolute left-1/2 top-1/2 h-40 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[hsl(var(--gold)/0.06)]"
        style={{ filter: "blur(80px)" }}
      />

      {/* Content */}
      <div className="container relative z-10 flex h-full flex-col items-center justify-center text-center">
        {/* Label */}
        <motion.div
          key={`label-${current}`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-3 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--gold)/0.2)] bg-[hsl(var(--gold)/0.08)] px-3 py-1"
        >
          <Megaphone className="h-3 w-3 text-[hsl(var(--gold))]" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-[hsl(var(--gold))]">
            {slide.isExternal ? "Sponzorisano" : "Oglašavanje"}
          </span>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`content-${current}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <h2 className="font-heading text-xl font-extrabold text-white sm:text-2xl md:text-3xl">
              {slide.title}
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-white/45 sm:text-base">
              {slide.text}
            </p>
            <Button
              asChild
              className="mt-5 gap-2 rounded-xl bg-[hsl(var(--gold))] px-6 font-bold text-[hsl(var(--gold-foreground))] shadow-[0_4px_20px_hsl(var(--gold)/0.3)] hover:bg-[hsl(var(--gold-light))] hover:shadow-[0_6px_28px_hsl(var(--gold)/0.4)] transition-all"
            >
              <a
                href={slide.link}
                target={slide.isExternal ? "_blank" : undefined}
                rel={slide.isExternal ? "noopener noreferrer" : undefined}
              >
                {slide.cta}
                {slide.isExternal ? (
                  <ExternalLink className="h-3.5 w-3.5" />
                ) : (
                  <ArrowRight className="h-3.5 w-3.5" />
                )}
              </a>
            </Button>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div className="absolute bottom-5 flex gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`rounded-full transition-all duration-500 ${
                idx === current
                  ? "h-2 w-7 bg-[hsl(var(--gold))] shadow-[0_0_8px_hsl(var(--gold)/0.5)]"
                  : "h-2 w-2 bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Ad slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Top & bottom separators */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--gold)/0.15)] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--gold)/0.25)] to-transparent" />
    </section>
  );
}
