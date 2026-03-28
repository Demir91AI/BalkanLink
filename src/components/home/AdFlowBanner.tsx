import { Megaphone, Mail, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import flowPlaceholder from "@/assets/flow-ad-placeholder.png";
import realcoreLogo from "@/assets/realcore-digital.png";

const MAILTO_AD = `mailto:kontakt@balkanlink.de?subject=${encodeURIComponent("Oglašavanje na BalkanLink")}&body=${encodeURIComponent(
  "Pozdrav,\n\nZanima me oglašavanje na BalkanLink platformi.\n\nNaziv firme:\nVrsta usluge:\nGrad:\nBudžet:\n"
)}`;

const PLACEHOLDER_COUNT = 7;

function RealCoreCard() {
  return (
    <div className="group flex w-48 shrink-0 flex-col overflow-hidden rounded-xl border border-[hsl(200,60%,30%)/0.4] bg-gradient-to-br from-[hsl(215,50%,10%)] to-[hsl(215,55%,6%)] transition-all duration-300 hover:border-[hsl(200,70%,50%)/0.5] hover:shadow-[0_0_20px_hsl(200,70%,50%,0.1)]">
      <div className="flex h-28 items-center justify-center overflow-hidden bg-[hsl(215,50%,8%)]">
        <img
          src={realcoreLogo}
          alt="RealCore Digital"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="eager"
          width={192}
          height={112}
        />
      </div>
      <div className="flex flex-1 flex-col px-2.5 py-2 text-left">
        <p className="text-[11px] font-bold leading-tight text-white">
          RealCore Digital
        </p>
        <p className="mt-0.5 text-[9px] font-medium leading-snug text-[hsl(200,70%,60%)]">
          Webdesign. KI. Lösungen, die funktionieren.
        </p>
        <p className="mt-0.5 text-[8px] text-white/40">
          Professionelle digitale Lösungen
        </p>
        <button
          type="button"
          className="mt-1.5 inline-flex items-center gap-1 self-start rounded-md bg-[hsl(200,70%,50%)]/15 px-2 py-0.5 text-[8px] font-semibold text-[hsl(200,70%,60%)] transition-all duration-200 hover:bg-[hsl(200,70%,50%)]/25 hover:text-[hsl(200,70%,70%)] hover:shadow-[0_0_8px_hsl(200,70%,50%,0.15)]"
        >
          Mehr erfahren
          <ArrowRight className="h-2 w-2" />
        </button>
      </div>
    </div>
  );
}

function PlaceholderCard() {
  return (
    <a
      href={MAILTO_AD}
      className="group flex w-48 shrink-0 flex-col overflow-hidden rounded-xl border border-white/8 bg-white/[0.03] transition-all duration-300 hover:border-[hsl(var(--gold)/0.3)] hover:bg-white/[0.06]"
    >
      <div className="flex h-28 items-center justify-center overflow-hidden bg-[hsl(215,55%,8%)]">
        <img
          src={flowPlaceholder}
          alt="BalkanLink"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          width={192}
          height={112}
        />
      </div>
      <div className="px-2.5 py-2 text-center">
        <p className="text-[10px] font-bold text-white/80 group-hover:text-[hsl(var(--gold))] transition-colors leading-tight">
          Mjesto za vašu reklamu
        </p>
        <p className="mt-0.5 flex items-center justify-center gap-1 text-[9px] text-white/30">
          <Mail className="h-2 w-2" /> Kontaktirajte nas
        </p>
      </div>
    </a>
  );
}

export function AdFlowBanner() {
  const { t } = useLanguage();

  const ITEMS_PER_SET = 1 + PLACEHOLDER_COUNT;
  // Duplicate for seamless loop
  const totalItems = ITEMS_PER_SET * 2;

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

        <div className="overflow-hidden w-full">
          <div className="flex w-fit gap-4 px-4 animate-flow-scroll hover:[animation-play-state:paused] active:[animation-play-state:paused]">
            {Array.from({ length: totalItems }).map((_, i) => {
              const posInSet = i % ITEMS_PER_SET;
              return posInSet === 0 ? (
                <RealCoreCard key={i} />
              ) : (
                <PlaceholderCard key={i} />
              );
            })}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--gold)/0.15)] to-transparent" />
    </section>
  );
}
