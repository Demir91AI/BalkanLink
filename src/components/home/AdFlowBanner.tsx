import { Megaphone, Mail, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import flowPlaceholder from "@/assets/flow-ad-placeholder.png";
import realcoreLogo from "@/assets/realcore-digital.png";

const MAILTO_AD = `mailto:kontakt@balkanlink.de?subject=${encodeURIComponent("Oglašavanje na BalkanLink")}&body=${encodeURIComponent(
  "Pozdrav,\n\nZanima me oglašavanje na BalkanLink platformi.\n\nNaziv firme:\nVrsta usluge:\nGrad:\nBudžet:\n"
)}`;

const PLACEHOLDER_VARIATIONS = [
  { title: "Oglasni prostor", subtitle: "Vaša firma ovdje" },
  { title: "Slobodno mjesto", subtitle: "Vaša firma ovdje" },
  { title: "Oglasni prostor", subtitle: "Vaša firma ovdje" },
  { title: "Slobodno mjesto", subtitle: "Vaša firma ovdje" },
  { title: "Oglasni prostor", subtitle: "Vaša firma ovdje" },
  { title: "Slobodno mjesto", subtitle: "Vaša firma ovdje" },
  { title: "Oglasni prostor", subtitle: "Vaša firma ovdje" },
];

function RealCoreCard() {
  return (
    <div className="group relative w-48 shrink-0 overflow-hidden rounded-xl border border-white/10 transition-all duration-300 hover:border-white/20 hover:shadow-md">
      <img
        src={realcoreLogo}
        alt="RealCore Digital"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="eager"
        width={192}
        height={160}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-2.5">
        <p className="text-[11px] font-bold leading-tight text-white">
          RealCore Digital
        </p>
        <p className="mt-0.5 text-[9px] leading-snug text-white/60">
          Webdesign · KI · Lösungen
        </p>
        <a
          href="https://realcore.digital"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1.5 inline-flex items-center gap-1 rounded-md bg-white/10 px-2 py-0.5 text-[8px] font-semibold text-white/70 transition-colors hover:bg-white/20 hover:text-white"
        >
          Kontakt
          <ArrowRight className="h-2 w-2" />
        </a>
      </div>
    </div>
  );
}

function PlaceholderCard({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <a
      href={MAILTO_AD}
      className="group relative flex h-40 w-48 shrink-0 overflow-hidden rounded-xl border border-white/[0.06] transition-all duration-300 hover:border-white/15"
    >
      <img
        src={flowPlaceholder}
        alt="BalkanLink"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
        width={192}
        height={160}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
      <div className="absolute bottom-0 left-0 right-0 p-2.5">
        <p className="text-[10px] font-semibold text-white/70 group-hover:text-white/90 transition-colors leading-tight">
          {title}
        </p>
        <p className="mt-0.5 text-[9px] text-white/40">
          {subtitle}
        </p>
        <span className="mt-1.5 inline-flex items-center gap-1 rounded-md bg-white/10 px-2 py-0.5 text-[8px] font-semibold text-white/50 transition-colors group-hover:bg-white/15 group-hover:text-white/70">
          <Mail className="h-2 w-2" />
          Kontakt
        </span>
      </div>
    </a>
  );
}

export function AdFlowBanner() {
  const { t } = useLanguage();
  const { ref, onTouchStart, onTouchMove, onTouchEnd, onMouseDown, onMouseMove, onMouseUp, onMouseLeave } = useInfiniteScroll(0.7, 3500);

  const ITEMS_PER_SET = 1 + PLACEHOLDER_VARIATIONS.length;
  const totalItems = ITEMS_PER_SET * 4;

  return (
    <section className="relative overflow-hidden border-y border-white/[0.06] bg-gradient-to-b from-[hsl(215,55%,5%)] to-[hsl(215,55%,7%)]">
      <div className="container relative z-10 pt-8 pb-4 text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--gold)/0.2)] bg-[hsl(var(--gold)/0.06)] px-3 py-1">
          <Megaphone className="h-3 w-3 text-[hsl(var(--gold))]" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-[hsl(var(--gold))]">
            {t("ad.flowLabel")}
          </span>
        </div>
        <h3 className="font-heading text-lg font-extrabold text-white sm:text-xl">
          {t("ad.flowTitle")}
        </h3>
        <p className="mx-auto mt-1 max-w-md text-sm text-white/35">
          {t("ad.flowSubtitle")}
        </p>
      </div>

      <div className="relative py-5">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-[hsl(215,55%,5%)] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-[hsl(215,55%,7%)] to-transparent" />

        <div
          ref={ref}
          className="overflow-x-scroll scrollbar-hide w-full cursor-grab select-none"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseLeave}
        >
          <div className="flex w-fit gap-4 px-4">
            {Array.from({ length: totalItems }).map((_, i) => {
              const posInSet = i % ITEMS_PER_SET;
              if (posInSet === 0) return <RealCoreCard key={i} />;
              const variation = PLACEHOLDER_VARIATIONS[(posInSet - 1) % PLACEHOLDER_VARIATIONS.length];
              return <PlaceholderCard key={i} title={variation.title} subtitle={variation.subtitle} />;
            })}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--gold)/0.15)] to-transparent" />
    </section>
  );
}
