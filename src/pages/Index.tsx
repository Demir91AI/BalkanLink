import { useState, useEffect, useCallback, useRef } from "react";
import { SEO } from "@/components/SEO";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CheckCircle2, Star, ExternalLink,
  ChevronLeft, ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
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
                  <img src={firm.images[0]} alt={firm.name} className="h-full w-full object-cover" style={{ filter: "brightness(0.85) saturate(1.1)" }} loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute left-3 top-3 flex items-center rounded-xl border border-white/20 bg-black/40 px-3 py-1.5 backdrop-blur-md">
                    <img src={firm.logoUrl} alt={firm.logoAlt} className="h-6 max-w-[90px] object-contain brightness-0 invert" />
                  </div>
                  <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider" style={{ background: "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--gold-dark)))", color: "#000" }}>
                    <Star className="h-2.5 w-2.5 fill-current" /> Preporučeno
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
                        <a href={firm.website} target="_blank" rel="noopener noreferrer">Pogledaj <ExternalLink className="ml-1 h-3 w-3" /></a>
                      ) : (
                        <Link to={`/firma/${firm.slug}`}>Pogledaj <ExternalLink className="ml-1 h-3 w-3" /></Link>
                      )}
                    </Button>
                    <Button asChild variant="outline" size="sm" className="h-8 rounded-lg border-white/15 px-4 text-xs font-semibold text-white/70 hover:bg-white/10 hover:text-white">
                      {firm.contactUrl ? (
                        <a href={firm.contactUrl} target="_blank" rel="noopener noreferrer">Kontakt</a>
                      ) : firm.phone ? (
                        <a href={`tel:${firm.phone}`}>Kontakt</a>
                      ) : (
                        <Link to={`/firma/${firm.slug}`}>Kontakt</Link>
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
  const { t } = useLanguage();

  return (
    <div className="relative" style={{ background: "hsl(215 55% 4%)" }}>
      <SEO path="/" />

      {/* ─── HERO ─── */}
      <HeroSection />

      {/* ─── FEATURE CARDS ─── */}
      <FeatureCards />

      {/* ─── BEFORE / AFTER ─── */}
      <BeforeAfterSection />

      {/* ─── FLOW BANNER CAROUSEL ─── */}
      <FlowBanner />

      {/* ─── PROCESS ─── */}
      <ProcessSection />

      {/* ─── TRUST ─── */}
      <TrustSection />

      {/* ─── "ŠTA JE ŠTA?" EXPLAINER ─── */}
      <section className="py-14 px-4" style={{ background: "hsl(220 50% 6%)" }}>
        <WhatIsWhat />
      </section>

      {/* ─── PARTNERS / SHOWCASE ─── */}
      <section className="py-16" style={{ background: "hsl(215 55% 4%)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="container max-w-[1200px] mx-auto mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="text-xs font-bold uppercase tracking-[0.26em] text-[hsl(var(--gold))]">NAŠI PARTNERI</p>
            <h2 className="mt-2 font-heading text-2xl font-extrabold text-white">
              Preporučene usluge
            </h2>
          </motion.div>
        </div>
        <ShowcaseCarousel />
      </section>

      {/* ─── PRICING SECTION ─── */}
      <section className="py-16" style={{ background: "hsl(220 50% 5%)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="container max-w-[1200px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="text-center mb-10">
              <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl">
                Odaberi plan koji ti odgovara
              </h2>
              <p className="mt-3 text-base text-white/50 max-w-xl mx-auto">
                Počni besplatno — nadogradi kad trebaš više. Bez ugovora, otkaži kad hoćeš.
              </p>
            </div>

            {/* Pricing Warning */}
            <PricingWarning />

            {/* ── Mobile: Accordion layout ── */}
            <div className="sm:hidden mb-8">
              <Accordion type="single" collapsible className="space-y-2">
                {/* Free */}
                <AccordionItem value="free" className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)" }}>
                  <AccordionTrigger className="px-4 py-3.5 hover:no-underline [&>svg]:text-[hsl(var(--gold))]">
                    <span className="flex items-center gap-3 text-left">
                      <span className="text-lg">🆓</span>
                      <span className="font-bold text-white">Besplatno — 0€</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <ul className="space-y-2 text-sm text-white/60 mb-4">
                      <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[hsl(var(--gold))] shrink-0" /> Osnovni vodič</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[hsl(var(--gold))] shrink-0" /> Pregled formulara</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[hsl(var(--gold))] shrink-0" /> Brutto-Netto kalkulator</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[hsl(var(--gold))] shrink-0" /> Oglasi (besplatno)</li>
                    </ul>
                    <Button variant="outline" className="w-full rounded-full border-white/15 text-white font-semibold hover:bg-white/10" onClick={() => navigate("/formulari")}>
                      Počni besplatno
                    </Button>
                  </AccordionContent>
                </AccordionItem>

                {/* Premium */}
                <AccordionItem value="premium" className="rounded-xl overflow-hidden" style={{ border: "1.5px solid hsla(43,52%,54%,0.4)", background: "rgba(255,255,255,0.04)", boxShadow: "0 4px 24px hsla(43,52%,54%,0.1)" }}>
                  <AccordionTrigger className="px-4 py-3.5 hover:no-underline [&>svg]:text-[hsl(var(--gold))]">
                    <span className="flex items-center gap-3 text-left">
                      <span className="text-lg">⭐</span>
                      <span className="font-bold text-white">Premium — 9,99€/mj.</span>
                      <span className="ml-auto mr-2 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase" style={{ background: "hsl(var(--gold))", color: "#000" }}>Preporučeno</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <p className="text-xs text-white/40 mb-3">ili 99,90€/godišnje (uštedi 17%)</p>
                    <ul className="space-y-2 text-sm text-white/80 mb-4">
                      <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[hsl(var(--gold))] shrink-0" /> Svi Musterformulari</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[hsl(var(--gold))] shrink-0" /> Smart Guides (svi koraci)</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[hsl(var(--gold))] shrink-0" /> Viza Navigator</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[hsl(var(--gold))] shrink-0" /> 1x Dokumenten-Check/dan</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[hsl(var(--gold))] shrink-0" /> Šabloni (PDF download)</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[hsl(var(--gold))] shrink-0" /> BalkanLink Asistent neograničeno</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[hsl(var(--gold))] shrink-0" /> 2 Pro oglasa/mjesečno</li>
                    </ul>
                    <Button className="w-full rounded-full font-bold text-black" style={{ background: "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--gold-light)))", boxShadow: "0 4px 20px hsla(43,52%,54%,0.35)" }} onClick={() => navigate("/paketi")}>
                      Postani Premium →
                    </Button>
                  </AccordionContent>
                </AccordionItem>

                {/* Dokumenten-Check */}
                <AccordionItem value="doc-check" className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)" }}>
                  <AccordionTrigger className="px-4 py-3.5 hover:no-underline [&>svg]:text-[hsl(var(--gold))]">
                    <span className="flex items-center gap-3 text-left">
                      <span className="text-lg">🔍</span>
                      <span className="font-bold text-white">Dokumenten-Check — 2,99€</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <p className="text-xs text-white/40 mb-3">Po dokumentu (bez pretplate)</p>
                    <ul className="space-y-2 text-sm text-white/60 mb-4">
                      <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[hsl(var(--gold))] shrink-0" /> Detaljna analiza dokumenta</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[hsl(var(--gold))] shrink-0" /> 11 sekcija objašnjenja</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[hsl(var(--gold))] shrink-0" /> Rokovi i finansijski uticaj</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[hsl(var(--gold))] shrink-0" /> PDF, JPG, PNG do 10 MB</li>
                    </ul>
                    <Button variant="outline" className="w-full rounded-full border-white/15 text-white font-semibold hover:bg-white/10" onClick={() => navigate("/dokumenten-check")}>
                      Provjeri dokument
                    </Button>
                  </AccordionContent>
                </AccordionItem>

                {/* Comparison */}
                <AccordionItem value="comparison" className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)" }}>
                  <AccordionTrigger className="px-4 py-3.5 hover:no-underline [&>svg]:text-[hsl(var(--gold))]">
                    <span className="flex items-center gap-3 text-left">
                      <span className="text-lg">📊</span>
                      <span className="font-bold text-white">Besplatno vs. Premium</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-0 pb-0">
                    <div className="grid grid-cols-3 px-4 py-2 text-[10px] font-bold uppercase tracking-wider border-b border-white/10">
                      <span className="text-white/40">Funkcija</span>
                      <span className="text-center text-white/60">Besplatno</span>
                      <span className="text-center text-[hsl(var(--gold))]">Premium</span>
                    </div>
                    <div className="divide-y divide-white/5">
                      {[
                        { feature: "Musterformulari", free: "❌", premium: "✅ Svi formulari" },
                        { feature: "Smart Guides", free: "❌", premium: "✅ Korak-po-korak" },
                        { feature: "Viza Navigator", free: "Osnovna info", premium: "✅ Kompletni vodič" },
                        { feature: "Dokumenten-Check", free: "2,99€", premium: "✅ 1x dnevno" },
                        { feature: "Šabloni", free: "✅ Kündigung", premium: "✅ Svi + PDF" },
                        { feature: "Asistent", free: "5/dan", premium: "✅ Neograničeno" },
                        { feature: "DeutschTrainer", free: "❌", premium: "✅ A1–C2" },
                        { feature: "Kalkulator", free: "✅", premium: "✅" },
                        { feature: "Pro oglasi", free: "2,99€", premium: "✅ 2/mj." },
                        { feature: "Vodiči", free: "✅", premium: "✅" },
                        { feature: "Wertgutschein", free: "❌", premium: "✅ do 30€" },
                      ].map((row) => (
                        <div key={row.feature} className="grid grid-cols-3 px-4 py-2.5 text-xs">
                          <span className="font-medium text-white/70">{row.feature}</span>
                          <span className="text-center text-white/40">{row.free}</span>
                          <span className="text-center font-semibold text-[hsl(var(--gold))]">{row.premium}</span>
                        </div>
                      ))}
                    </div>
                    <div className="px-4 py-4 border-t border-white/10">
                      <Button className="w-full rounded-full font-bold text-black" style={{ background: "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--gold-light)))" }} onClick={() => navigate("/paketi")}>
                        Postani Premium →
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
                <p className="text-sm font-bold text-white/50 uppercase tracking-wider mb-2">Besplatno</p>
                <p className="text-3xl font-black text-white mb-1">0€</p>
                <p className="text-xs text-white/40 mb-6">Zauvijek besplatno</p>
                <ul className="space-y-2 text-sm text-white/60 flex-1">
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[hsl(var(--gold))] shrink-0" /> Osnovni vodič</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[hsl(var(--gold))] shrink-0" /> Pregled formulara</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[hsl(var(--gold))] shrink-0" /> Brutto-Netto kalkulator</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[hsl(var(--gold))] shrink-0" /> Oglasi (besplatno)</li>
                </ul>
                <Button variant="outline" className="mt-6 w-full rounded-full border-white/15 text-white font-semibold hover:bg-white/10" onClick={() => navigate("/formulari")}>
                  Počni besplatno
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
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-[10px] font-bold uppercase tracking-wider" style={{ background: "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--gold-dark)))", color: "#000" }}>Preporučeno</span>
                <p className="text-sm font-bold text-[hsl(var(--gold))] uppercase tracking-wider mb-2">Premium</p>
                <p className="text-3xl font-black text-white mb-1">9,99€<span className="text-base font-normal text-white/40">/mj.</span></p>
                <p className="text-xs text-white/40 mb-6">ili 99,90€/godišnje (uštedi 17%)</p>
                <ul className="space-y-2 text-sm text-white/80 flex-1">
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[hsl(var(--gold))] shrink-0" /> Svi Musterformulari</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[hsl(var(--gold))] shrink-0" /> Smart Guides (svi koraci)</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[hsl(var(--gold))] shrink-0" /> Viza Navigator</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[hsl(var(--gold))] shrink-0" /> 1x Dokumenten-Check/dan</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[hsl(var(--gold))] shrink-0" /> Šabloni (PDF download)</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[hsl(var(--gold))] shrink-0" /> BalkanLink Asistent neograničeno</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[hsl(var(--gold))] shrink-0" /> 2 Pro oglasa/mjesečno</li>
                </ul>
                <Button className="mt-6 w-full rounded-full font-bold text-black" style={{ background: "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--gold-light)))", boxShadow: "0 4px 20px hsla(43,52%,54%,0.35)" }} onClick={() => navigate("/paketi")}>
                  Postani Premium →
                </Button>
              </motion.div>

              {/* Dokumenten-Check */}
              <motion.div whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(0,0,0,0.4)" }} className="rounded-2xl p-6 flex flex-col transition-all" style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)" }}>
                <p className="text-sm font-bold text-white/50 uppercase tracking-wider mb-2">Dokumenten-Check</p>
                <p className="text-3xl font-black text-white mb-1">2,99€</p>
                <p className="text-xs text-white/40 mb-6">Po dokumentu (bez pretplate)</p>
                <ul className="space-y-2 text-sm text-white/60 flex-1">
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[hsl(var(--gold))] shrink-0" /> Detaljna analiza dokumenta</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[hsl(var(--gold))] shrink-0" /> 11 sekcija objašnjenja</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[hsl(var(--gold))] shrink-0" /> Rokovi i finansijski uticaj</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[hsl(var(--gold))] shrink-0" /> PDF, JPG, PNG do 10 MB</li>
                </ul>
                <Button variant="outline" className="mt-6 w-full rounded-full border-white/15 text-white font-semibold hover:bg-white/10" onClick={() => navigate("/dokumenten-check")}>
                  Provjeri dokument
                </Button>
              </motion.div>
            </div>

            {/* ── Comparison Table (desktop) ── */}
            <div className="hidden sm:block max-w-3xl mx-auto rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="px-6 py-4 border-b border-white/10" style={{ background: "rgba(255,255,255,0.03)" }}>
                <h3 className="font-bold text-white text-lg">Besplatno vs. Premium</h3>
              </div>
              <div className="grid grid-cols-3 px-6 py-3 text-xs font-bold uppercase tracking-wider border-b border-white/10" style={{ background: "rgba(255,255,255,0.02)" }}>
                <span className="text-white/40">Funkcija</span>
                <span className="text-center text-white/60">Besplatno <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px]">0€</span></span>
                <span className="text-center text-[hsl(var(--gold))]">Premium <span className="rounded-full bg-[hsl(var(--gold))]/10 px-2 py-0.5 text-[10px]">9,99€/mj.</span></span>
              </div>
              <div className="divide-y divide-white/5">
                {[
                  { feature: "Musterformulari", free: "❌ Nije dostupno", premium: "✅ Svi formulari + primjeri" },
                  { feature: "Smart Guides", free: "❌ Nije dostupno", premium: "✅ Korak-po-korak vodič" },
                  { feature: "Viza Navigator", free: "Osnovna info", premium: "✅ Kompletni vodič + dokumenti" },
                  { feature: "Dokumenten-Check", free: "2,99€ po provjeri", premium: "✅ 1x dnevno gratis" },
                  { feature: "Šabloni / Vorlagen", free: "✅ Kündigung gratis", premium: "✅ Svi šabloni + PDF download" },
                  { feature: "BalkanLink Asistent", free: "⚠️ 5 pitanja/dan", premium: "✅ Neograničeno" },
                  { feature: "DeutschTrainer", free: "❌ Nije dostupno", premium: "✅ A1–C2 kompletni kurs" },
                  { feature: "Brutto-Netto kalkulator", free: "✅ Dostupno", premium: "✅ Dostupno" },
                  { feature: "Pro oglasi", free: "2,99€/oglas", premium: "✅ 2 uključena/mj." },
                  { feature: "Dolazak u Njemačku vodiči", free: "✅ Potpun pristup", premium: "✅ Potpun pristup" },
                  { feature: "Wertgutschein program", free: "❌ Nije dostupno", premium: "✅ Amazon vaučer do 30€" },
                ].map((row) => (
                  <div key={row.feature} className="grid grid-cols-3 px-6 py-3 text-sm">
                    <span className="font-medium text-white/70">{row.feature}</span>
                    <span className="text-center text-white/40">{row.free}</span>
                    <span className="text-center font-semibold text-[hsl(var(--gold))]">{row.premium}</span>
                  </div>
                ))}
              </div>
              <div className="px-6 py-5 border-t border-white/10 text-center">
                <Button className="rounded-full font-bold text-black px-8" style={{ background: "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--gold-light)))" }} onClick={() => navigate("/paketi")}>
                  Postani Premium →
                </Button>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-xs text-white/30">Prema § 19 UStG ne obračunava se PDV · Otkaži kad hoćeš · Bez ugovora</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
