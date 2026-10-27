import MembershipOffer from "@/components/membership/MembershipOffer";
import { useState, useEffect, useCallback, useRef } from "react";
import { SEO } from "@/components/SEO";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CheckCircle2, Star, ExternalLink,
  ChevronLeft, ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

import { premiumShowcaseFirms } from "@/components/home/premium-showcase-data";

import HeroSection from "@/components/home/HeroSection";
import FeatureCards from "@/components/home/FeatureCards";
import BeforeAfterSection from "@/components/home/BeforeAfterSection";
import ProcessSection from "@/components/home/ProcessSection";
import TrustSection from "@/components/home/TrustSection";
import PricingWarning from "@/components/home/PricingWarning";
import WhatIsWhat from "@/components/home/WhatIsWhat";
import FlowBanner from "@/components/home/FlowBanner";
import PitchSection from "@/components/home/PitchSection";
import CollapsibleSection from "@/components/home/CollapsibleSection";
import CommunityHighlights from "@/components/home/CommunityHighlights";
import ShareButton from "@/components/share/ShareButton";
import LetterReplyTask from "@/components/letter-reply/LetterReplyTask";
import { isLetterReplyVisible } from "@/lib/letter-reply/visibility";
import { useSubscription } from "@/hooks/useSubscription";

function HomeLetterReplyEntry() {
  const { isPremium } = useSubscription();
  return <LetterReplyTask canAccess={isPremium} />;
}

function CarouselArrows({ onLeft, onRight }: { onLeft: () => void; onRight: () => void }) {
  return (
    <>
      <button onClick={onLeft} className="flex absolute left-2 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 shadow-md items-center justify-center hover:bg-white/15 transition-all text-white/60 hover:text-white" aria-label="Previous">
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button onClick={onRight} className="flex absolute right-2 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 shadow-md items-center justify-center hover:bg-white/15 transition-all text-white/60 hover:text-white" aria-label="Next">
        <ChevronRight className="h-5 w-5" />
      </button>
    </>
  );
}

/* ─── Showcase Carousel ─── */
function ShowcaseCarousel() {
  const { t } = useTranslation("pages");
  const tView = t("home.pricing.partnerView");
  const tContact = t("home.pricing.partnerContact");
  const tRecommended = t("home.pricing.partnerRecommended");
  const { ref, pause, scheduleResume, scrollByCard, onTouchStart, onTouchMove, onTouchEnd, onMouseDown, onMouseMove, onMouseUp, onMouseLeave } = useInfiniteScroll(0.7, 3000);

  type CardItem = { type: "firm"; firm: typeof premiumShowcaseFirms[0] };
  const items: CardItem[] = premiumShowcaseFirms.map((firm) => ({ type: "firm" as const, firm }));
  const doubled = [...items, ...items];

  return (
    <div className="relative overflow-hidden" onMouseEnter={pause} onMouseLeave={scheduleResume}>
      <CarouselArrows onLeft={() => scrollByCard("left")} onRight={() => scrollByCard("right")} />
      <div ref={ref} className="flex gap-6 px-4 overflow-x-hidden scrollbar-hide cursor-grab select-none" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd} onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseLeave={onMouseLeave}>
        {doubled.map((item, i) => {
          if (item.type === "firm") {
            const firm = item.firm;
            return (
              <article key={`${firm.slug}-${i}`} className="min-w-[340px] max-w-[380px] shrink-0 rounded-2xl overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-1" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="relative h-[180px] w-full overflow-hidden">
                  <img src={firm.images[0]} alt={firm.name} className="h-full w-full object-cover" style={{ filter: "brightness(0.85) saturate(1.1)" }} loading="lazy" decoding="async" width="380" height="180" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                   <div className="absolute left-3 top-3 flex items-center rounded-xl border border-white/20 bg-white/90 px-3 py-1.5 backdrop-blur-md">
                     <img src={firm.logoUrl} alt={firm.logoAlt} className="h-6 max-w-[90px] object-contain drop-shadow-sm" loading="lazy" decoding="async" />
                  </div>
                  <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider" style={{ background: "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--gold-dark)))", color: "#000" }}>
                    <Star className="h-2.5 w-2.5 fill-current" /> {tRecommended}
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-3 p-5" style={{ borderTop: "2px solid hsl(var(--gold))" }}>
                  <div>
                    <h3 className="text-base font-bold text-white">{firm.name}</h3>
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-white/50">{firm.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {firm.highlights.map((h) => (
                      <span key={h} className="rounded-full border border-white/10 px-2.5 py-0.5 text-[10px] font-semibold text-white/50 bg-white/5">{h}</span>
                    ))}
                  </div>
                  <div className="mt-auto flex gap-2 pt-2">
                    <Button asChild size="sm" className="h-8 rounded-lg px-4 text-xs font-bold text-black" style={{ background: "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--gold-dark)))" }}>
                      {firm.website ? (
                        <a href={firm.website} target="_blank" rel="noopener noreferrer">{tView} <ExternalLink className="ml-1 h-3 w-3" /></a>
                      ) : (
                        <Link to={`/firma/${firm.slug}`}>{tView} <ExternalLink className="ml-1 h-3 w-3" /></Link>
                      )}
                    </Button>
                    <Button asChild variant="outline" size="sm" className="h-8 rounded-lg border-white/20 bg-white/10 px-4 text-xs font-semibold text-white hover:bg-white/20">
                      {firm.contactUrl ? (
                        <a href={firm.contactUrl} target="_blank" rel="noopener noreferrer">{tContact}</a>
                      ) : firm.phone ? (
                        <a href={`tel:${firm.phone}`}>{tContact}</a>
                      ) : (
                        <Link to={`/firma/${firm.slug}`}>{tContact}</Link>
                      )}
                    </Button>
                  </div>
                </div>
              </article>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}


/* ─── Main Page ─── */
export default function Index() {
  const navigate = useNavigate();
  const { t } = useTranslation("pages");

  return (
    <div className="relative" style={{ background: "hsl(215 55% 4%)" }}>
      <SEO path="/" />

      {/* ─── HERO ─── */}
      <HeroSection />

      {isLetterReplyVisible(import.meta.env.DEV, window.location.hostname) && (
        <section className="dark px-4 py-4 sm:py-6">
          <div className="container mx-auto max-w-[1100px]">
            <HomeLetterReplyEntry />
          </div>
        </section>
      )}

      {/* ─── SHARE STRIP (ispod Asistenta u Heru) ─── */}
      <section className="px-4 py-3" style={{ background: "linear-gradient(90deg, hsl(220 50% 7%), hsl(220 55% 9%), hsl(220 50% 7%))", borderTop: "1px solid hsla(43,52%,54%,0.18)", borderBottom: "1px solid hsla(43,52%,54%,0.18)" }}>
        <div className="container max-w-[1100px] mx-auto flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center">
          <span className="text-[12.5px] sm:text-[13.5px] text-white/85 leading-tight">
            <span className="mr-1">📣</span>
            <span className="text-[hsl(var(--gold))] font-bold">{t("home.share.heading")}</span>
            <span className="hidden sm:inline text-white/55"> — {t("home.share.subline")}</span>
          </span>
          <ShareButton variant="compact" />
        </div>
      </section>

      {/* PitchSection removed per user request */}

      {/* ─── COLLAPSIBLE: PROCESS — "Kako funkcioniše?" ─── */}
      <CollapsibleSection title={t("home.process.heading")} background="hsl(215 55% 4%)">
        <ProcessSection />
      </CollapsibleSection>

      {/* ─── COLLAPSIBLE: "ŠTA JE ŠTA?" ─── */}
      <CollapsibleSection title={t("home.whatIsWhat.heading")} background="hsl(220 50% 6%)">
        <WhatIsWhat />
      </CollapsibleSection>

      {/* ─── COLLAPSIBLE: FEATURE CARDS — "Šta ti danas treba?" ─── */}
      <CollapsibleSection title={t("home.featureCards.heading")} background="hsl(215 55% 4%)">
        <FeatureCards />
      </CollapsibleSection>

      {/* ─── BEFORE / AFTER ─── */}
      <BeforeAfterSection />

      {/* ─── FLOW BANNER CAROUSEL ─── */}
      <FlowBanner />

      {/* ─── COLLAPSIBLE: TRUST — "Zašto korisnici vjeruju BalkanLink-u?" ─── */}
      <CollapsibleSection title={t("home.trust.heading")} background="hsl(215 55% 4%)">
        <TrustSection />
      </CollapsibleSection>

      {/* ─── COMMUNITY HIGHLIGHTS — Pitaj dijasporu ─── */}
      <CommunityHighlights />

      {/* ─── PARTNERS / SHOWCASE ─── */}
      <section className="py-10 sm:py-12" style={{ background: "hsl(215 55% 4%)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="container max-w-[1200px] mx-auto mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="text-xs font-bold uppercase tracking-[0.26em] text-[hsl(var(--gold))]">{t("home.pricing.partnersLabel")}</p>
            <h2 className="mt-2 font-heading text-2xl font-extrabold text-white">
              {t("home.pricing.partnersHeading")}
            </h2>
          </motion.div>
        </div>
        <ShowcaseCarousel />
      </section>

      {/* ─── PRICING SECTION ─── */}
      <section className="py-10 sm:py-12" style={{ background: "hsl(220 50% 5%)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="container max-w-[1200px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="text-center mb-10">
              <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl">
                {t("home.pricing.heading")}
              </h2>
              <p className="mt-3 text-base text-white/50 max-w-xl mx-auto">
                {t("home.pricing.subline")}
              </p>
            </div>

            {/* Pricing Warning */}
            <PricingWarning />

            <div className="dark"><MembershipOffer variant="full" /></div>
            <div className="mt-8 text-center">
              <p className="text-xs text-white/30">{t("home.pricing.footer")}</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
