import { PremiumShowcaseCard } from "./PremiumShowcaseCard";
import { premiumShowcaseFirms } from "./premium-showcase-data";

export function AdCarousel() {
  return (
    <section className="bg-navy py-10 sm:py-12">
      <div className="container">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 sm:mb-8">
            <p className="text-xs font-bold uppercase tracking-[0.26em] text-gold">Premium showcase</p>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-primary-foreground sm:text-3xl">
              Izdvojene firme na BalkanLink
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-primary-foreground/60 sm:text-base">
              Svaka firma je odvojena, pregledna i prikazana kao mini prezentacija sa logotipom, opisom i stabilnim vizualima.
            </p>
          </div>

          <div className="space-y-6 sm:space-y-8">
            {premiumShowcaseFirms.map((firm, index) => (
              <PremiumShowcaseCard key={firm.name} firm={firm} priority={index === 0} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
