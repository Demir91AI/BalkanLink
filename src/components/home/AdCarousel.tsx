import { PremiumShowcaseCard } from "./PremiumShowcaseCard";
import { premiumShowcaseFirms } from "./premium-showcase-data";
import { useLanguage } from "@/contexts/LanguageContext";

export function AdCarousel() {
  const { t } = useLanguage();

  // Duplicate firms for seamless infinite scroll
  const doubled = [...premiumShowcaseFirms, ...premiumShowcaseFirms];

  return (
    <section className="bg-navy py-7 sm:py-8">
      <div className="container">
        <div className="mx-auto max-w-5xl">
          <div className="mb-4 sm:mb-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-gold/70">{t("showcase.label")}</p>
            <h2 className="mt-1.5 text-xl font-black tracking-tight text-primary-foreground/80 sm:text-2xl">
              {t("showcase.title")}
            </h2>
          </div>

          <div className="overflow-hidden w-full">
            <div className="flex w-fit gap-5 sm:gap-6 animate-carousel-scroll hover:[animation-play-state:paused] active:[animation-play-state:paused]">
              {doubled.map((firm, index) => (
                <div key={`${firm.name}-${index}`} className="w-[75vw] sm:w-[350px] shrink-0">
                  <PremiumShowcaseCard firm={firm} priority={index === 0} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
