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
import PromoPopupBanner from "@/components/home/PromoPopupBanner";

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
      <PromoPopupBanner />
      <SEO path="/" />

      {/* ─── HERO ─── */}
      <HeroSection />

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

            {/* ── Mobile: Accordion layout — premium polish ── */}
            <div className="sm:hidden mb-8">
              <Accordion type="single" collapsible className="space-y-3">

                {/* ── 1. FREE ── */}
                <AccordionItem
                  value="free"
                  className="rounded-2xl overflow-hidden"
                  style={{
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.015))",
                  }}
                >
                  <AccordionTrigger className="px-4 py-4 hover:no-underline [&>svg]:text-white/40">
                    <span className="flex items-center gap-3 text-left w-full">
                      <span
                        aria-hidden
                        className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-base font-black"
                        style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)" }}
                      >
                        FREE
                      </span>
                      <span className="flex flex-col min-w-0">
                        <span className="font-black text-white text-base leading-tight">{t("home.pricing.free.title")}</span>
                        <span className="text-[11px] font-medium text-white/50 mt-0.5">{t("home.pricing.free.tagline")}</span>
                      </span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-5">
                    <p className="text-xs text-white/50 mb-4">{t("home.pricing.free.subtitle")}</p>
                    <ul className="space-y-2.5 text-sm text-white/75 mb-5">
                      <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-white/50 shrink-0" /> {t("home.pricing.free.f1")}</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-white/50 shrink-0" /> {t("home.pricing.free.f2")}</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-white/50 shrink-0" /> {t("home.pricing.free.f3")}</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-white/50 shrink-0" /> {t("home.pricing.free.f4")}</li>
                    </ul>
                    <Button
                      variant="outline"
                      className="w-full h-11 rounded-full border-white/20 bg-white/5 text-white font-bold hover:bg-white/10 hover:text-white"
                      onClick={() => navigate("/formulari")}
                    >
                      {t("home.pricing.free.cta")} →
                    </Button>
                  </AccordionContent>
                </AccordionItem>

                {/* ── 2. PREMIUM — hero card ── */}
                <AccordionItem
                  value="premium"
                  className="rounded-2xl overflow-hidden relative"
                  style={{
                    border: "2px solid hsla(43,72%,58%,0.65)",
                    background: "linear-gradient(135deg, hsla(43,52%,54%,0.22) 0%, hsla(43,52%,54%,0.06) 55%, rgba(255,255,255,0.02) 100%)",
                    boxShadow: "0 12px 40px hsla(43,52%,54%,0.32), inset 0 1px 0 hsla(43,72%,70%,0.18)",
                  }}
                >
                  {/* Glow accent top edge */}
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg, transparent, hsla(43,72%,75%,0.7), transparent)" }} />

                  <AccordionTrigger className="px-4 py-4 hover:no-underline [&>svg]:text-[hsl(var(--gold))]">
                    <span className="flex items-center gap-3 text-left w-full">
                      <span
                        aria-hidden
                        className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-lg"
                        style={{ background: "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--gold-dark)))", boxShadow: "0 4px 12px hsla(43,52%,54%,0.5)" }}
                      >
                        <Star className="h-5 w-5 text-black" fill="currentColor" />
                      </span>
                      <span className="flex flex-col min-w-0 flex-1">
                        <span className="flex items-center gap-2 flex-wrap">
                          <span className="font-black text-white text-base leading-tight">{t("home.pricing.premium.title")}</span>
                          <span
                            className="rounded-full px-2 py-0.5 text-[9px] font-black uppercase tracking-wider shrink-0"
                            style={{ background: "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--gold-light)))", color: "#000" }}
                          >
                            {t("home.pricing.premium.recommended")}
                          </span>
                        </span>
                        <span className="text-[11px] font-semibold text-[hsl(var(--gold))]/95 mt-1">{t("home.pricing.premium.trialHint")}</span>
                      </span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-5">
                    <p className="text-xs text-white/55 mb-4">{t("home.pricing.premium.subtitle")}</p>
                    <ul className="space-y-2.5 text-sm text-white/90 mb-5">
                      <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[hsl(var(--gold))] shrink-0" /> {t("home.pricing.premium.f1")}</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[hsl(var(--gold))] shrink-0" /> {t("home.pricing.premium.f2")}</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[hsl(var(--gold))] shrink-0" /> {t("home.pricing.premium.f3")}</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[hsl(var(--gold))] shrink-0" /> {t("home.pricing.premium.f4")}</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[hsl(var(--gold))] shrink-0" /> {t("home.pricing.premium.f5")}</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[hsl(var(--gold))] shrink-0" /> {t("home.pricing.premium.f6")}</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[hsl(var(--gold))] shrink-0" /> {t("home.pricing.premium.f7")}</li>
                    </ul>
                    <Button
                      className="w-full rounded-full font-black text-black h-12 text-[15px] tracking-tight"
                      style={{
                        background: "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--gold-light)))",
                        boxShadow: "0 6px 28px hsla(43,52%,54%,0.55), inset 0 1px 0 rgba(255,255,255,0.45)",
                      }}
                      onClick={() => navigate("/paketi")}
                    >
                      {t("home.pricing.premium.cta")} →
                    </Button>
                    <p className="text-center text-[10px] text-white/45 mt-2.5">{t("home.pricing.premium.trustline")}</p>
                  </AccordionContent>
                </AccordionItem>

                {/* ── 3. DOKUMENTEN-CHECK ── */}
                <AccordionItem
                  value="doc-check"
                  className="rounded-2xl overflow-hidden"
                  style={{
                    border: "1px solid hsla(200,80%,60%,0.25)",
                    background: "linear-gradient(135deg, hsla(200,80%,55%,0.08), rgba(255,255,255,0.02))",
                  }}
                >
                  <AccordionTrigger className="px-4 py-4 hover:no-underline [&>svg]:text-sky-300/70">
                    <span className="flex items-center gap-3 text-left w-full">
                      <span
                        aria-hidden
                        className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-lg"
                        style={{ background: "hsla(200,80%,55%,0.18)", border: "1px solid hsla(200,80%,60%,0.3)" }}
                      >
                        🔍
                      </span>
                      <span className="flex flex-col min-w-0">
                        <span className="font-black text-white text-base leading-tight">{t("home.pricing.docCheck.title")}</span>
                        <span className="text-[11px] font-semibold text-sky-200/80 mt-0.5">{t("home.pricing.docCheck.tagline")}</span>
                      </span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-5">
                    <p className="text-xs text-white/55 mb-4">{t("home.pricing.docCheck.subtitle")}</p>
                    <ul className="space-y-2.5 text-sm text-white/80 mb-5">
                      <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-sky-300 shrink-0" /> {t("home.pricing.docCheck.f1")}</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-sky-300 shrink-0" /> {t("home.pricing.docCheck.f2")}</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-sky-300 shrink-0" /> {t("home.pricing.docCheck.f3")}</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-sky-300 shrink-0" /> {t("home.pricing.docCheck.f4")}</li>
                    </ul>
                    <Button
                      className="w-full h-11 rounded-full font-bold text-white"
                      style={{ background: "linear-gradient(135deg, hsl(200, 80%, 50%), hsl(210, 85%, 55%))", boxShadow: "0 4px 20px hsla(200,80%,55%,0.4)" }}
                      onClick={() => navigate("/dokumenten-check")}
                    >
                      {t("home.pricing.docCheck.cta")} →
                    </Button>
                  </AccordionContent>
                </AccordionItem>

                {/* ── 4. COMPARISON ── */}
                <AccordionItem
                  value="comparison"
                  className="rounded-2xl overflow-hidden"
                  style={{
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "linear-gradient(135deg, rgba(255,255,255,0.035), rgba(255,255,255,0.01))",
                  }}
                >
                  <AccordionTrigger className="px-4 py-4 hover:no-underline [&>svg]:text-white/40">
                    <span className="flex items-center gap-3 text-left w-full">
                      <span
                        aria-hidden
                        className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-lg"
                        style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
                      >
                        📊
                      </span>
                      <span className="flex flex-col min-w-0">
                        <span className="font-black text-white text-base leading-tight">{t("home.pricing.compare.title")}</span>
                        <span className="text-[11px] font-medium text-white/50 mt-0.5">{t("home.pricing.compare.tagline")}</span>
                      </span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-0 pb-0">
                    <div className="grid grid-cols-3 px-4 py-2.5 text-[10px] font-black uppercase tracking-wider border-y border-white/10 bg-white/[0.02]">
                      <span className="text-white/50">{t("home.pricing.compare.feature")}</span>
                      <span className="text-center text-white/60">{t("home.pricing.compare.free")}</span>
                      <span className="text-center text-[hsl(var(--gold))]">{t("home.pricing.compare.premium")}</span>
                    </div>
                    <div className="divide-y divide-white/5">
                      {["muster","guides","visa","doc","templates","assistant","trainer","calc","proAds","arrival","voucher"].map((key) => (
                        <div key={key} className="grid grid-cols-3 px-4 py-2.5 text-xs items-center">
                          <span className="font-medium text-white/75">{t(`home.pricing.compare.rows.${key}.feature`)}</span>
                          <span className="text-center text-white/40">{t(`home.pricing.compare.rows.${key}.freeShort`)}</span>
                          <span className="text-center font-semibold text-[hsl(var(--gold))]">{t(`home.pricing.compare.rows.${key}.premiumShort`)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="px-4 py-4 border-t border-white/10">
                      <Button
                        className="w-full h-11 rounded-full font-black text-black"
                        style={{ background: "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--gold-light)))", boxShadow: "0 4px 20px hsla(43,52%,54%,0.4)" }}
                        onClick={() => navigate("/paketi")}
                      >
                        {t("home.pricing.premium.cta")} →
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* ── Desktop: Card grid ── */}
            <div className="hidden sm:grid grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
              {/* Free */}
              <motion.div whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(0,0,0,0.4)" }} className="rounded-2xl p-6 flex flex-col transition-all" style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)" }}>
                <p className="text-sm font-bold text-white/50 uppercase tracking-wider mb-2">{t("home.pricing.free.label")}</p>
                <p className="text-3xl font-black text-white mb-1">{t("home.pricing.free.price")}</p>
                <p className="text-xs text-white/40 mb-6">{t("home.pricing.free.subtitle")}</p>
                <ul className="space-y-2 text-sm text-white/60 flex-1">
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[hsl(var(--gold))] shrink-0" /> {t("home.pricing.free.f1")}</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[hsl(var(--gold))] shrink-0" /> {t("home.pricing.free.f2")}</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[hsl(var(--gold))] shrink-0" /> {t("home.pricing.free.f3")}</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[hsl(var(--gold))] shrink-0" /> {t("home.pricing.free.f4")}</li>
                </ul>
                <Button variant="outline" className="mt-6 w-full rounded-full border-[hsl(var(--gold))]/40 text-[hsl(var(--gold))] font-semibold hover:bg-[hsl(var(--gold))]/10" onClick={() => navigate("/formulari")}>
                  {t("home.pricing.free.cta")}
                </Button>
              </motion.div>

              {/* Premium */}
              <motion.div
                whileHover={{ y: -4 }}
                className="relative rounded-2xl p-6 flex flex-col"
                style={{
                  border: "1.5px solid hsla(43,52%,54%,0.4)",
                  background: "rgba(255,255,255,0.04)",
                  boxShadow: "0 8px 32px hsla(43,52%,54%,0.12)",
                }}
              >
                {/* Pulsing ring */}
                <div className="absolute inset-0 rounded-2xl pointer-events-none animate-glow-pulse" style={{ boxShadow: "0 0 30px hsla(43,52%,54%,0.15), inset 0 0 30px hsla(43,52%,54%,0.05)" }} />
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-[10px] font-bold uppercase tracking-wider" style={{ background: "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--gold-dark)))", color: "#000" }}>{t("home.pricing.premium.recommended")}</span>
                <p className="text-sm font-bold text-[hsl(var(--gold))] uppercase tracking-wider mb-2">{t("home.pricing.premium.label")}</p>
                <p className="text-3xl font-black text-white mb-1">{t("home.pricing.premium.price")}<span className="text-base font-normal text-white/40">{t("home.pricing.premium.perMonth")}</span></p>
                <p className="text-xs text-white/40 mb-6">{t("home.pricing.premium.subtitle")}</p>
                <ul className="space-y-2 text-sm text-white/80 flex-1">
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[hsl(var(--gold))] shrink-0" /> {t("home.pricing.premium.f1")}</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[hsl(var(--gold))] shrink-0" /> {t("home.pricing.premium.f2")}</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[hsl(var(--gold))] shrink-0" /> {t("home.pricing.premium.f3")}</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[hsl(var(--gold))] shrink-0" /> {t("home.pricing.premium.f4")}</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[hsl(var(--gold))] shrink-0" /> {t("home.pricing.premium.f5")}</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[hsl(var(--gold))] shrink-0" /> {t("home.pricing.premium.f6")}</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[hsl(var(--gold))] shrink-0" /> {t("home.pricing.premium.f7")}</li>
                </ul>
                <Button className="mt-6 w-full rounded-full font-bold text-black" style={{ background: "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--gold-light)))", boxShadow: "0 4px 20px hsla(43,52%,54%,0.35)" }} onClick={() => navigate("/paketi")}>
                  {t("home.pricing.premium.cta")}
                </Button>
              </motion.div>

              {/* Dokumenten-Check */}
              <motion.div whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(0,0,0,0.4)" }} className="rounded-2xl p-6 flex flex-col transition-all" style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)" }}>
                <p className="text-sm font-bold text-white/50 uppercase tracking-wider mb-2">{t("home.pricing.docCheck.label")}</p>
                <p className="text-3xl font-black text-white mb-1">{t("home.pricing.docCheck.price")}</p>
                <p className="text-xs text-white/40 mb-6">{t("home.pricing.docCheck.subtitle")}</p>
                <ul className="space-y-2 text-sm text-white/60 flex-1">
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[hsl(var(--gold))] shrink-0" /> {t("home.pricing.docCheck.f1")}</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[hsl(var(--gold))] shrink-0" /> {t("home.pricing.docCheck.f2")}</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[hsl(var(--gold))] shrink-0" /> {t("home.pricing.docCheck.f3")}</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[hsl(var(--gold))] shrink-0" /> {t("home.pricing.docCheck.f4")}</li>
                </ul>
                <Button variant="outline" className="mt-6 w-full rounded-full border-[hsl(var(--gold))]/40 text-[hsl(var(--gold))] font-semibold hover:bg-[hsl(var(--gold))]/10" onClick={() => navigate("/dokumenten-check")}>
                  {t("home.pricing.docCheck.cta")}
                </Button>
              </motion.div>
            </div>

            {/* ── Comparison Table (desktop) ── */}
            <div className="hidden sm:block max-w-3xl mx-auto rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="px-6 py-4 border-b border-white/10" style={{ background: "rgba(255,255,255,0.03)" }}>
                <h3 className="font-bold text-white text-lg">{t("home.pricing.compare.title")}</h3>
              </div>
              <div className="grid grid-cols-3 px-6 py-3 text-xs font-bold uppercase tracking-wider border-b border-white/10" style={{ background: "rgba(255,255,255,0.02)" }}>
                <span className="text-white/40">{t("home.pricing.compare.feature")}</span>
                <span className="text-center text-white/60">{t("home.pricing.compare.free")} <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px]">{t("home.pricing.free.price")}</span></span>
                <span className="text-center text-[hsl(var(--gold))]">{t("home.pricing.compare.premium")} <span className="rounded-full bg-[hsl(var(--gold))]/10 px-2 py-0.5 text-[10px]">{t("home.pricing.premium.price")}{t("home.pricing.premium.perMonth")}</span></span>
              </div>
              <div className="divide-y divide-white/5">
                {["muster","guides","visa","doc","templates","assistant","trainer","calc","proAds","arrival","voucher"].map((key) => (
                  <div key={key} className="grid grid-cols-3 px-6 py-3 text-sm">
                    <span className="font-medium text-white/70">{t(`home.pricing.compare.rows.${key}.feature`)}</span>
                    <span className="text-center text-white/40">{t(`home.pricing.compare.rows.${key}.free`)}</span>
                    <span className="text-center font-semibold text-[hsl(var(--gold))]">{t(`home.pricing.compare.rows.${key}.premium`)}</span>
                  </div>
                ))}
              </div>
              <div className="px-6 py-5 border-t border-white/10 text-center">
                <Button className="rounded-full font-bold text-black px-8" style={{ background: "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--gold-light)))" }} onClick={() => navigate("/paketi")}>
                  {t("home.pricing.premium.cta")}
                </Button>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-xs text-white/30">{t("home.pricing.footer")}</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
