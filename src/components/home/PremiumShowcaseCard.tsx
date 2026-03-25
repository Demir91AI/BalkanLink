import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { PremiumShowcaseFirm } from "./premium-showcase-data";

interface PremiumShowcaseCardProps {
  firm: PremiumShowcaseFirm;
  priority?: boolean;
}

function getInitials(name: string) {
  return name.split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();
}

export function PremiumShowcaseCard({ firm, priority = false }: PremiumShowcaseCardProps) {
  const [logoError, setLogoError] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = useCallback(() => {
    setCurrentImage((prev) => (prev + 1) % firm.images.length);
  }, [firm.images.length]);

  useEffect(() => {
    if (firm.images.length <= 1) return;
    const timer = setInterval(nextImage, 5500);
    return () => clearInterval(timer);
  }, [nextImage, firm.images.length]);

  return (
    <article className="group/card overflow-hidden rounded-2xl border border-border/30 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10">
      {/* ── SLIDESHOW + LOGO OVERLAY ── */}
      <div className="relative h-[220px] w-full overflow-hidden sm:h-[260px]">
        {/* Image slideshow */}
        {firm.images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`${firm.name} ${idx + 1}`}
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-in-out"
            style={{
              opacity: idx === currentImage ? 1 : 0,
              filter: "brightness(0.88) saturate(1.1)",
            }}
            loading={priority && idx === 0 ? "eager" : "lazy"}
          />
        ))}

        {/* Bottom gradient for text readability */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/60 via-transparent to-black/10" />

        {/* Logo overlay — top-left */}
        <div className="absolute left-3 top-3 z-[2] flex items-center gap-2 rounded-xl border border-white/25 bg-white/20 px-3 py-2 backdrop-blur-md sm:left-4 sm:top-4 sm:px-4 sm:py-2.5">
          {!logoError && firm.logoUrl ? (
            <img
              src={firm.logoUrl}
              alt={firm.logoAlt}
              onError={() => setLogoError(true)}
              className="h-7 max-w-[100px] object-contain sm:h-8 sm:max-w-[120px]"
            />
          ) : (
            <span className="text-sm font-black tracking-tight text-white">
              {getInitials(firm.name)}
            </span>
          )}
        </div>

        {/* Premium badge — top-right */}
        <span className="absolute right-3 top-3 z-[2] inline-flex items-center gap-1 rounded-full border border-white/20 bg-gold/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-gold-foreground shadow-lg sm:right-4 sm:top-4">
          <Star className="h-3 w-3 fill-current" />
          Preporučeno
        </span>

        {/* Slide indicators */}
        {firm.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 z-[2] flex -translate-x-1/2 gap-1.5">
            {firm.images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImage(idx)}
                className={`rounded-full transition-all duration-500 ${
                  idx === currentImage
                    ? "h-1.5 w-5 bg-white shadow-sm"
                    : "h-1.5 w-1.5 bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Slika ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── INFO ZONE ── */}
      <div className="flex flex-col gap-3.5 p-5 sm:p-6">
        <div>
          <h3 className="text-lg font-black tracking-tight text-foreground sm:text-xl">
            {firm.name}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {firm.description}
          </p>
        </div>

        {/* Highlights */}
        <div className="flex flex-wrap gap-1.5">
          {firm.highlights.map((h) => (
            <span
              key={h}
              className="rounded-full border border-border/40 bg-muted/50 px-2.5 py-0.5 text-[11px] font-semibold text-foreground/70"
            >
              {h}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-wrap gap-2.5 pt-1">
          <Button asChild size="sm" className="btn-gold-gradient rounded-xl px-5 text-xs font-bold">
            {firm.website ? (
              <a href={firm.website} target="_blank" rel="noopener noreferrer">
                Pogledaj više <ExternalLink className="ml-1 h-3.5 w-3.5" />
              </a>
            ) : (
              <Link to={`/firma/${firm.slug}`}>
                Pogledaj više <ExternalLink className="ml-1 h-3.5 w-3.5" />
              </Link>
            )}
          </Button>
          <Button asChild variant="outline" size="sm" className="rounded-xl border-border/40 px-5 text-xs font-semibold hover:bg-muted/60">
            {firm.contactUrl ? (
              <a href={firm.contactUrl} target="_blank" rel="noopener noreferrer">
                Kontakt <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </a>
            ) : firm.phone ? (
              <a href={`tel:${firm.phone}`}>
                Kontakt <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </a>
            ) : (
              <Link to={`/firma/${firm.slug}`}>
                Kontakt <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </Link>
            )}
          </Button>
        </div>
      </div>
    </article>
  );
}
