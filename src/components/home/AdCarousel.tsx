import { Mail, ArrowRight } from "lucide-react";
import { PremiumShowcaseCard } from "./PremiumShowcaseCard";
import { premiumShowcaseFirms } from "./premium-showcase-data";
import { useLanguage } from "@/contexts/LanguageContext";

const MAILTO_AD = `mailto:kontakt@balkanlink.de?subject=${encodeURIComponent("Oglašavanje na BalkanLink")}&body=${encodeURIComponent(
  "Pozdrav,\n\nZanima me oglašavanje na BalkanLink platformi.\n\nNaziv firme:\nVrsta usluge:\nGrad:\nBudžet:\n"
)}`;

const EMPTY_SLOTS = [
  { title: "Oglasni prostor", subtitle: "Vaša firma ovdje" },
  { title: "Slobodno mjesto", subtitle: "Vaša firma ovdje" },
  { title: "Oglasni prostor", subtitle: "Vaša firma ovdje" },
];

function EmptyShowcaseCard({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <a
      href={MAILTO_AD}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/20 bg-card/50 transition-all duration-300 hover:border-border/40 hover:shadow-md"
    >
      <div className="flex h-[220px] items-center justify-center bg-muted/30 sm:h-[260px]">
        <div className="text-center px-6">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-border/30 bg-muted/50">
            <Mail className="h-5 w-5 text-muted-foreground/50" />
          </div>
          <p className="text-sm font-bold text-foreground/60">{title}</p>
          <p className="mt-1 text-xs text-muted-foreground/60">{subtitle}</p>
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-end p-5 sm:p-6">
        <span className="inline-flex items-center gap-1.5 self-start rounded-xl border border-border/30 bg-muted/40 px-4 py-2 text-xs font-semibold text-muted-foreground/70 transition-colors group-hover:border-border/50 group-hover:text-foreground/70">
          Kontakt
          <ArrowRight className="h-3 w-3" />
        </span>
      </div>
    </a>
  );
}

export function AdCarousel() {
  const { t } = useLanguage();

  // Interleave real firms with empty slots
  const items: Array<{ type: "firm"; firm: typeof premiumShowcaseFirms[0] } | { type: "empty"; title: string; subtitle: string }> = [];
  
  premiumShowcaseFirms.forEach((firm) => {
    items.push({ type: "firm", firm });
  });
  
  EMPTY_SLOTS.forEach((slot) => {
    items.push({ type: "empty", ...slot });
  });

  // Duplicate for seamless infinite scroll
  const doubled = [...items, ...items];

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
              {doubled.map((item, index) => (
                <div key={index} className="w-[75vw] sm:w-[350px] shrink-0">
                  {item.type === "firm" ? (
                    <PremiumShowcaseCard firm={item.firm} priority={index === 0} />
                  ) : (
                    <EmptyShowcaseCard title={item.title} subtitle={item.subtitle} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
