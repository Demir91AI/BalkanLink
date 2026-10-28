import MembershipOffer from "@/components/membership/MembershipOffer";
import { SEO } from "@/components/SEO";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import HeroSection from "@/components/home/HeroSection";
import FeatureCards from "@/components/home/FeatureCards";
import ProcessSection from "@/components/home/ProcessSection";
import TrustSection from "@/components/home/TrustSection";
import WhatIsWhat from "@/components/home/WhatIsWhat";
import FlowBanner from "@/components/home/FlowBanner";
import CollapsibleSection from "@/components/home/CollapsibleSection";
import CommunityHighlights from "@/components/home/CommunityHighlights";
import ShareButton from "@/components/share/ShareButton";



/* ─── Main Page ─── */
export default function Index() {
  const { t } = useTranslation("pages");

  return (
    <div className="relative" style={{ background: "hsl(215 55% 4%)" }}>
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

      {/* ─── FLOW BANNER CAROUSEL ─── */}
      <FlowBanner />

      {/* ─── COLLAPSIBLE: TRUST — "Zašto korisnici vjeruju BalkanLink-u?" ─── */}
      <CollapsibleSection title={t("home.trust.heading")} background="hsl(215 55% 4%)">
        <TrustSection />
      </CollapsibleSection>

      {/* ─── COMMUNITY HIGHLIGHTS — Pitaj dijasporu ─── */}
      <CommunityHighlights />


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
