import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ExternalLink, Megaphone, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import adAluHome from "@/assets/ad-alu-home.jpg";
import adAluHome2 from "@/assets/ad-alu-home-2.jpg";
import adAluHome3 from "@/assets/ad-alu-home-3.jpg";
import adVreboBau from "@/assets/ad-vrebo-bau.jpg";
import adVreboBau2 from "@/assets/ad-vrebo-bau-2.jpg";
import adVreboBau3 from "@/assets/ad-vrebo-bau-3.jpg";

const MAILTO_AD = `mailto:info@balkanlink.de?subject=${encodeURIComponent("Oglašavanje na BalkanLink")}&body=${encodeURIComponent(
  "Pozdrav,\n\nZanima me oglašavanje na BalkanLink platformi.\n\nNaziv firme:\nVrsta usluge:\nGrad:\nBudžet:\n"
)}`;

interface PremiumFirm {
  name: string;
  description: string;
  images: string[];
  website: string;
  contactEmail: string;
  logoUrl: string;
}

const firms: PremiumFirm[] = [
  {
    name: "Alu Home",
    description: "Moderne aluminijske konstrukcije, pergole i stakleni sistemi.",
    images: [adAluHome, adAluHome2, adAluHome3],
    website: "https://www.alu-home.de/",
    contactEmail: "mailto:info@alu-home.de",
    logoUrl: "https://www.alu-home.de/favicon.ico",
  },
  {
    name: "Vrebo Bau",
    description: "Građevinski radovi, renoviranje i pouzdana rješenja širom Njemačke.",
    images: [adVreboBau, adVreboBau2, adVreboBau3],
    website: "https://vrebo-bau.de/",
    contactEmail: "mailto:info@vrebo-bau.de",
    logoUrl: "https://vrebo-bau.de/favicon.ico",
  },
];

/* Inner image slideshow for each firm */
function ImageSlideshow({ images }: { images: string[] }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((p) => (p + 1) % images.length), 3500);
    return () => clearInterval(t);
  }, [images.length]);

  return (
    <AnimatePresence mode="wait">
      <motion.img
        key={idx}
        src={images[idx]}
        alt=""
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ filter: "brightness(0.3) saturate(1.15)" }}
        loading="lazy"
        width={1280}
        height={720}
      />
    </AnimatePresence>
  );
}

export function AdCarousel() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((p) => (p + 1) % firms.length), []);
  const prev = useCallback(() => setCurrent((p) => (p - 1 + firms.length) % firms.length), []);

  useEffect(() => {
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [next]);

  const firm = firms[current];

  return (
    <section className="relative h-[340px] sm:h-[380px] w-full overflow-hidden">
      {/* Background slideshow */}
      <ImageSlideshow images={firm.images} />

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(215,68%,4%/0.92)] via-[hsl(215,55%,6%/0.7)] to-[hsl(215,68%,4%/0.92)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[hsl(215,68%,4%/0.8)] to-transparent" />

      {/* Gold glow */}
      <div className="absolute left-1/2 top-1/2 h-40 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[hsl(var(--gold)/0.05)]" style={{ filter: "blur(80px)" }} />

      {/* Content */}
      <div className="container relative z-10 flex h-full items-center">
        <div className="mx-auto flex w-full max-w-4xl items-center gap-8 md:gap-12">
          {/* Left: firm info */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
              className="flex-1"
            >
              {/* Sponsored label */}
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--gold)/0.2)] bg-[hsl(var(--gold)/0.08)] px-3 py-1">
                <Megaphone className="h-3 w-3 text-[hsl(var(--gold))]" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-[hsl(var(--gold))]">
                  Premium Partner
                </span>
              </div>

              {/* Logo + Name */}
              <div className="mb-2 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm overflow-hidden">
                  <img
                    src={firm.logoUrl}
                    alt={firm.name}
                    className="h-6 w-6 object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
                <h2 className="font-heading text-2xl font-extrabold text-white sm:text-3xl">
                  {firm.name}
                </h2>
              </div>

              <p className="mb-6 max-w-md text-sm leading-relaxed text-white/50 sm:text-base">
                {firm.description}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3">
                <Button
                  asChild
                  className="gap-2 rounded-xl bg-[hsl(var(--gold))] px-6 font-bold text-[hsl(var(--gold-foreground))] shadow-[0_4px_20px_hsl(var(--gold)/0.3)] hover:bg-[hsl(var(--gold-light))] hover:shadow-[0_6px_28px_hsl(var(--gold)/0.4)] transition-all"
                >
                  <a href={firm.website} target="_blank" rel="noopener noreferrer">
                    Posjeti stranicu <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="gap-2 rounded-xl border-white/15 bg-white/5 px-6 font-semibold text-white hover:bg-white/10 hover:border-white/25 transition-all"
                >
                  <a href={firm.contactEmail}>
                    Kontakt <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Right: thumbnail strip (desktop) */}
          <div className="hidden md:flex flex-col gap-2">
            {firm.images.map((img, i) => (
              <div
                key={i}
                className="h-20 w-32 overflow-hidden rounded-lg border border-white/10 shadow-lg"
              >
                <img
                  src={img}
                  alt=""
                  className="h-full w-full object-cover"
                  style={{ filter: "brightness(0.6)" }}
                  loading="lazy"
                  width={128}
                  height={80}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Nav arrows */}
      {firms.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/10 bg-white/5 p-2 text-white/50 backdrop-blur-sm hover:bg-white/10 hover:text-white transition-all"
            aria-label="Previous"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/10 bg-white/5 p-2 text-white/50 backdrop-blur-sm hover:bg-white/10 hover:text-white transition-all"
            aria-label="Next"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {firms.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`rounded-full transition-all duration-500 ${
              idx === current
                ? "h-2 w-7 bg-[hsl(var(--gold))] shadow-[0_0_8px_hsl(var(--gold)/0.5)]"
                : "h-2 w-2 bg-white/20 hover:bg-white/40"
            }`}
            aria-label={`Firm ${idx + 1}`}
          />
        ))}
      </div>

      {/* Separators */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--gold)/0.15)] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--gold)/0.25)] to-transparent" />
    </section>
  );
}
