import { useEffect, useState } from "react";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import type { PremiumShowcaseFirm } from "./premium-showcase-data";

interface PremiumShowcaseCardProps {
  firm: PremiumShowcaseFirm;
  priority?: boolean;
}

export function PremiumShowcaseCard({ firm, priority = false }: PremiumShowcaseCardProps) {
  const [activeImage, setActiveImage] = useState(0);
  const { t } = useLanguage();

  useEffect(() => {
    if (firm.images.length <= 1) return;
    const intervalId = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % firm.images.length);
    }, 6500);
    return () => window.clearInterval(intervalId);
  }, [firm.images.length]);

  return (
    <article className="glass-dark overflow-hidden rounded-[2rem] border border-primary-foreground/10 shadow-[0_24px_80px_-36px_hsl(var(--primary)/0.85)]">
      <div className="grid gap-0 lg:grid-cols-[0.94fr_1.06fr]">
        <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10">
          <div>
            <div className="mb-4 inline-flex items-center rounded-full border border-primary-foreground/10 bg-primary-foreground/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.24em] text-gold">
              {t("showcase.badge")}
            </div>
            <div className={`mb-6 flex items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm ${firm.logoWrapperClassName}`}>
              <img src={firm.logoUrl} alt={firm.logoAlt} className="max-h-full max-w-full object-contain object-center" loading="lazy" width={320} height={120} />
            </div>
            <h3 className="text-2xl font-black tracking-tight text-primary-foreground sm:text-[2rem]">{firm.name}</h3>
            <p className="mt-3 max-w-xl text-sm leading-7 text-primary-foreground/70 sm:text-base">{firm.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {firm.highlights.map((highlight) => (
                <span key={highlight} className="rounded-full border border-primary-foreground/10 bg-primary-foreground/5 px-3 py-1 text-xs font-semibold text-primary-foreground/80">{highlight}</span>
              ))}
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild className="btn-gold-gradient rounded-xl px-6 font-bold">
              <a href={firm.website} target="_blank" rel="noopener noreferrer">
                {t("showcase.visit")} <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="outline" className="rounded-xl border-primary-foreground/15 bg-primary-foreground/5 px-6 font-semibold text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
              <a href={firm.contactUrl} target="_blank" rel="noopener noreferrer">
                {t("showcase.contact")} <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
        <div className="p-4 pt-0 sm:p-6 sm:pt-0 lg:p-6">
          <div className="relative min-h-[290px] overflow-hidden rounded-[1.6rem] border border-primary-foreground/10 bg-primary/30 sm:min-h-[360px] lg:min-h-full">
            {firm.images.map((image, index) => (
              <img key={image} src={image} alt={`${firm.name} showcase ${index + 1}`} className={`absolute inset-0 h-full w-full object-cover will-change-transform transition-[opacity,transform] duration-[1400ms] ease-in-out ${index === activeImage ? "opacity-100 scale-[1.02]" : "opacity-0 scale-[1.06]"}`} loading={priority && index === 0 ? "eager" : "lazy"} width={1600} height={1000} />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-primary/10" />
            <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-primary/35 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between gap-4 px-5 py-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">{t("showcase.miniLabel")}</p>
                <p className="mt-1 text-sm text-primary-foreground/80">{activeImage + 1} / {firm.images.length} {t("showcase.imageCount")}</p>
              </div>
              <div className="flex gap-2">
                {firm.images.map((image, index) => (
                  <span key={`${image}-dot`} className={`h-2 rounded-full transition-all duration-500 ${index === activeImage ? "w-7 bg-gold" : "w-2 bg-primary-foreground/30"}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
