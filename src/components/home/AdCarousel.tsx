import { PremiumShowcaseCard } from "./PremiumShowcaseCard";
import { premiumShowcaseFirms } from "./premium-showcase-data";
import { useLanguage } from "@/contexts/LanguageContext";

export function AdCarousel() {
  const { t } = useLanguage();

  // Duplicate firms for seamless infinite scroll
  const doubled = [...premiumShowcaseFirms, ...premiumShowcaseFirms];

  return (
    <section className="bg-navy py-10 sm:py-12">
      <div className="container">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 sm:mb-8">
            <p className="text-xs font-bold uppercase tracking-[0.26em] text-gold">{t("showcase.label")}</p>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-primary-foreground sm:text-3xl">
              {t("showcase.title")}
            </h2>
          </div>

          <div className="overflow-hidden w-full">
            <div className="flex w-fit gap-6 sm:gap-8 animate-carousel-scroll hover:[animation-play-state:paused] active:[animation-play-state:paused]">
              {doubled.map((firm, index) => (
                <div key={`${firm.name}-${index}`} className="w-[85vw] sm:w-[420px] shrink-0">
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
