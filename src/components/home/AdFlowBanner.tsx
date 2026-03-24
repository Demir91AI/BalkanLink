import { Megaphone, ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

import flowAd1 from "@/assets/flow-ad-1.jpg";
import flowAd2 from "@/assets/flow-ad-2.jpg";
import flowAd3 from "@/assets/flow-ad-3.jpg";
import flowAd4 from "@/assets/flow-ad-4.jpg";

const MAILTO_AD = `mailto:info@balkanlink.de?subject=${encodeURIComponent("Oglašavanje na BalkanLink")}&body=${encodeURIComponent(
  "Pozdrav,\n\nZanima me oglašavanje na BalkanLink platformi.\n\nNaziv firme:\nVrsta usluge:\nGrad:\nBudžet:\n"
)}`;

interface FlowAd {
  image: string;
  name: string;
  location?: string;
}

const flowAds: FlowAd[] = [
  { image: flowAd1, name: "Vaša firma", location: "Berlin" },
  { image: flowAd2, name: "Selidbe Express", location: "München" },
  { image: flowAd3, name: "Frizerski salon", location: "Frankfurt" },
  { image: flowAd4, name: "Auto servis", location: "Hamburg" },
  { image: flowAd1, name: "Handwerk usluge", location: "Köln" },
  { image: flowAd2, name: "Transport", location: "Stuttgart" },
  { image: flowAd3, name: "Beauty salon", location: "Düsseldorf" },
  { image: flowAd4, name: "KFZ Werkstatt", location: "Nürnberg" },
];

const doubled = [...flowAds, ...flowAds];

export function AdFlowBanner() {
  const { t } = useLanguage();

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
        <div className="flex animate-scroll-x gap-4 px-4" style={{ width: "max-content" }}>
          {doubled.map((ad, i) => (
            <a key={i} href={MAILTO_AD} className="group flex w-44 shrink-0 flex-col overflow-hidden rounded-xl border border-white/8 bg-white/[0.03] transition-all duration-300 hover:border-[hsl(var(--gold)/0.3)] hover:bg-white/[0.06]">
              <div className="relative h-24 overflow-hidden">
                <img src={ad.image} alt={ad.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" style={{ filter: "brightness(0.7) saturate(1.1)" }} loading="lazy" width={176} height={96} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              <div className="p-2.5">
                <p className="text-xs font-bold text-white/80 group-hover:text-[hsl(var(--gold))] transition-colors truncate">{ad.name}</p>
                {ad.location && (
                  <p className="mt-0.5 flex items-center gap-1 text-[10px] text-white/30">
                    <MapPin className="h-2.5 w-2.5" /> {ad.location}
                  </p>
                )}
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="container relative z-10 pb-7 text-center">
        <Button asChild size="sm" className="gap-2 rounded-lg bg-[hsl(var(--gold))] text-xs font-semibold text-[hsl(var(--gold-foreground))] hover:bg-[hsl(var(--gold-light))] shadow-sm hover:shadow-md transition-all">
          <a href={MAILTO_AD}>
            {t("ad.flowCta")} <ArrowRight className="h-3 w-3" />
          </a>
        </Button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--gold)/0.15)] to-transparent" />
    </section>
  );
}
