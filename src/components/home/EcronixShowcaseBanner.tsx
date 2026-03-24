import { useEffect, useState } from "react";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoEcronix from "@/assets/logo-ecronix.jpg";
import slide1 from "@/assets/ecronix-slide-1.jpg";
import slide2 from "@/assets/ecronix-slide-2.jpg";
import slide3 from "@/assets/ecronix-slide-3.jpg";

const slides = [
  {
    image: slide1,
    headline: "Digital Solutions That Drive Growth",
    sub: "Strateško planiranje i digitalna transformacija za vaš biznis.",
  },
  {
    image: slide2,
    headline: "Razvijamo web i mobilna rješenja",
    sub: "Moderan kod, čist dizajn i fokus na korisničko iskustvo.",
  },
  {
    image: slide3,
    headline: "Pokrenite svoj projekat danas",
    sub: "Od ideje do realizacije — sa partnerom kojem možete vjerovati.",
  },
];

export function EcronixShowcaseBanner() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((c) => (c + 1) % slides.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <article className="relative overflow-hidden rounded-[2rem] border border-primary-foreground/10 shadow-[0_24px_80px_-36px_hsl(var(--primary)/0.85)]">
      {/* Background slideshow */}
      <div className="absolute inset-0">
        {slides.map((s, i) => (
          <img
            key={s.image}
            src={s.image}
            alt=""
            aria-hidden="true"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ease-in-out ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
            loading={i === 0 ? "eager" : "lazy"}
            width={1920}
            height={1080}
          />
        ))}
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/65 to-black/40" />
        {/* Bottom vignette */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-[420px] flex-col justify-between p-6 sm:min-h-[460px] sm:p-8 lg:max-w-[60%] lg:p-10 xl:p-12">
        <div>
          {/* Badge */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[hsl(45_93%_49%/0.2)] bg-[hsl(45_93%_49%/0.08)] px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.24em] text-gold">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            Premium partner
          </div>

          {/* Logo */}
          <div className="mb-6 w-[10rem] sm:w-[12rem]">
            <img
              src={logoEcronix}
              alt="Ecronix logo"
              className="h-auto w-full object-contain"
              loading="lazy"
              width={480}
              height={160}
            />
          </div>

          {/* Per-slide headline + sub with fade */}
          <div className="relative min-h-[120px] sm:min-h-[130px]">
            {slides.map((s, i) => (
              <div
                key={s.headline}
                className={`absolute inset-0 transition-opacity duration-[1000ms] ease-in-out ${
                  i === active ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                <h3 className="text-2xl font-black leading-[1.15] tracking-tight text-white sm:text-[2rem] lg:text-[2.25rem]">
                  {s.headline.split(" ").map((word, wi, arr) =>
                    wi >= arr.length - 2 ? (
                      <span key={wi} className="text-gold">
                        {wi === arr.length - 2 ? " " : ""}
                        {word}{" "}
                      </span>
                    ) : (
                      <span key={wi}>{word} </span>
                    )
                  )}
                </h3>
                <p className="mt-3 max-w-lg text-sm leading-7 text-white/60 sm:text-[0.95rem]">
                  {s.sub}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTAs + dots */}
        <div className="mt-8">
          <div className="flex flex-wrap gap-3">
            <Button
              asChild
              className="rounded-xl bg-[hsl(45_93%_49%)] px-6 font-bold text-black hover:bg-[hsl(45_93%_55%)] hover:shadow-[0_8px_32px_-8px_hsl(45_93%_49%/0.5)]"
            >
              <a href="https://www.ecronix.com/#contact" target="_blank" rel="noopener noreferrer">
                Zatraži ponudu <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-xl border-white/15 bg-white/5 px-6 font-semibold text-white hover:bg-white/10 hover:text-white"
            >
              <a href="https://www.ecronix.com/" target="_blank" rel="noopener noreferrer">
                Posjeti stranicu <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>

          {/* Slide indicator dots */}
          <div className="mt-5 flex items-center gap-3">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Slide ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-500 ${
                  i === active ? "w-8 bg-gold" : "w-2 bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
            <span className="ml-2 text-xs text-white/40">
              {active + 1} / {slides.length}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
