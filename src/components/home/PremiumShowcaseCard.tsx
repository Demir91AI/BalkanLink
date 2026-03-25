import { useState } from "react";
import { ExternalLink, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import type { PremiumShowcaseFirm } from "./premium-showcase-data";

interface PremiumShowcaseCardProps {
  firm: PremiumShowcaseFirm;
  priority?: boolean;
}

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function PremiumShowcaseCard({ firm, priority = false }: PremiumShowcaseCardProps) {
  const [logoError, setLogoError] = useState(false);
  const { t } = useLanguage();

  return (
    <article className="group/card overflow-hidden rounded-2xl border border-border/30 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10">
      {/* ── TOP: Logo Zone ── */}
      <div className="relative flex h-[140px] w-full items-center justify-center border-b border-border/20 bg-white px-4 py-4">
        {/* Premium badge */}
        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-gold/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
          <Star className="h-3 w-3 fill-gold" />
          Preporučeno
        </span>

        {!logoError && firm.logoUrl ? (
          <img
            src={firm.logoUrl}
            alt={firm.logoAlt}
            onError={() => setLogoError(true)}
            className="max-h-[70%] max-w-[70%] object-contain transition-transform duration-300 group-hover/card:scale-105"
            loading={priority ? "eager" : "lazy"}
            width={320}
            height={120}
          />
        ) : (
          <span className="text-3xl font-black tracking-tight text-muted-foreground/50">
            {getInitials(firm.name)}
          </span>
        )}
      </div>

      {/* ── BOTTOM: Info + Image ── */}
      <div className="relative">
        {/* Background image with overlay */}
        {firm.images[0] && (
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={firm.images[0]}
              alt=""
              className="h-full w-full object-cover"
              loading="lazy"
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-white/75 backdrop-blur-[2px]" />
          </div>
        )}

        <div className="relative flex flex-col gap-4 p-5 sm:p-6">
          <div>
            <h3 className="text-lg font-black tracking-tight text-foreground sm:text-xl">
              {firm.name}
            </h3>
            <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
              {firm.description}
            </p>
          </div>

          {/* Highlights */}
          <div className="flex flex-wrap gap-1.5">
            {firm.highlights.map((h) => (
              <span
                key={h}
                className="rounded-full border border-border/40 bg-background/60 px-2.5 py-0.5 text-[11px] font-semibold text-foreground/70"
              >
                {h}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-wrap gap-2.5 pt-1">
            <Button asChild size="sm" className="btn-gold-gradient rounded-xl px-5 text-xs font-bold">
              <a href={firm.website} target="_blank" rel="noopener noreferrer">
                Pogledaj više <ExternalLink className="ml-1 h-3.5 w-3.5" />
              </a>
            </Button>
            <Button asChild variant="outline" size="sm" className="rounded-xl border-border/40 px-5 text-xs font-semibold hover:bg-muted/60">
              <a href={firm.contactUrl} target="_blank" rel="noopener noreferrer">
                Kontakt <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
