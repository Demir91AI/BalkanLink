import { useEffect, useState } from "react";
import { ArrowRight, ExternalLink, Globe, Smartphone, Cpu, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoEcronix from "@/assets/logo-ecronix.jpg";
import slide1 from "@/assets/ecronix-slide-1.jpg";
import slide2 from "@/assets/ecronix-slide-2.jpg";
import slide3 from "@/assets/ecronix-slide-3.jpg";

const services = [
  { icon: Globe, label: "Web aplikacije" },
  { icon: Smartphone, label: "Mobilne aplikacije" },
  { icon: Cpu, label: "AI integracija" },
  { icon: Palette, label: "UI/UX dizajn" },
];

const slideImages = [slide1, slide2, slide3];

export function EcronixShowcaseBanner() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((c) => (c + 1) % slideImages.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <article
      className="overflow-hidden rounded-[2rem] border border-primary-foreground/10"
      style={{
        background:
          "linear-gradient(135deg, hsl(0 0% 4%) 0%, hsl(220 20% 8%) 40%, hsl(30 30% 8%) 100%)",
      }}
    >
      {/* ── SECTION 1: STATIC INFO BLOCK ── */}
      <div className="grid gap-4 p-6 sm:grid-cols-[1fr_auto] sm:items-start sm:gap-6 sm:p-8 lg:p-10">
        {/* Left: logo + text + service chips */}
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[hsl(45_93%_49%/0.2)] bg-[hsl(45_93%_49%/0.08)] px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.24em] text-gold">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            Premium partner
          </div>

          <div className="mb-4 w-[10rem] sm:w-[12rem]">
            <img
              src={logoEcronix}
              alt="Ecronix logo"
              className="h-auto w-full object-contain"
              loading="lazy"
              width={480}
              height={160}
            />
          </div>

          <h3 className="text-xl font-black leading-tight tracking-tight text-white sm:text-2xl lg:text-[1.75rem]">
            Digitalna rješenja{" "}
            <span className="text-gold">koja pokreću rast</span>
          </h3>

          <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/55">
            Od modernih web platformi do mobilnih aplikacija — pretvaramo vaše
            ideje u digitalnu stvarnost sa sveobuhvatnom podrškom.
          </p>

          {/* Service chips */}
          <div className="mt-4 flex flex-wrap gap-2">
            {services.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.03] px-2.5 py-1.5 text-[11px] font-semibold text-white/70"
              >
                <Icon className="h-3 w-3 text-gold" />
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Right: CTA buttons (stack on mobile) */}
        <div className="flex flex-row gap-2.5 sm:flex-col sm:pt-8">
          <Button
            asChild
            className="rounded-xl bg-[hsl(45_93%_49%)] px-5 font-bold text-black hover:bg-[hsl(45_93%_55%)] hover:shadow-[0_8px_32px_-8px_hsl(45_93%_49%/0.5)]"
          >
            <a
              href="https://www.ecronix.com/#contact"
              target="_blank"
              rel="noopener noreferrer"
            >
              Zatraži ponudu <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="rounded-xl border-white/15 bg-white/5 px-5 font-semibold text-white hover:bg-white/10 hover:text-white"
          >
            <a
              href="https://www.ecronix.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Posjeti stranicu <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-6 h-px bg-white/[0.06] sm:mx-8 lg:mx-10" />

      {/* ── SECTION 2: IMAGE SLIDER ── */}
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="relative aspect-[16/7] overflow-hidden rounded-2xl border border-white/[0.06] sm:aspect-[16/6]">
          {/* Stacked images with crossfade */}
          {slideImages.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={`Ecronix showcase ${i + 1}`}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ease-in-out ${
                i === active ? "opacity-100" : "opacity-0"
              }`}
              loading={i === 0 ? "eager" : "lazy"}
              width={1920}
              height={1080}
            />
          ))}

          {/* Subtle dark overlay */}
          <div className="absolute inset-0 bg-black/20" />

          {/* Bottom fade into card bg */}
          <div
            className="absolute inset-x-0 bottom-0 h-1/4"
            style={{
              background: "linear-gradient(to top, hsl(0 0% 4%), transparent)",
            }}
          />

          {/* Slide dots */}
          <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
            {slideImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === active
                    ? "w-6 bg-gold"
                    : "w-1.5 bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
