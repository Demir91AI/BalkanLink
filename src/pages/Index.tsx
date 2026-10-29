import MembershipOffer from "@/components/membership/MembershipOffer";
import { SEO } from "@/components/SEO";
import { useTranslation } from "react-i18next";

import HeroSection from "@/components/home/HeroSection";
import CommunityHighlights from "@/components/home/CommunityHighlights";

/*
 * Homepage Phase 1 (owner-approved 2026-10-29): focused task-first start.
 * ProcessSection, WhatIsWhat, TrustSection, FlowBanner, FeatureCards and the
 * share strip are no longer shown here but stay in the app (not deleted).
 */
export default function Index() {
  const { t } = useTranslation("pages");

  return (
    <div className="relative" style={{ background: "hsl(215 55% 4%)" }}>
      <SEO path="/" />
      <HeroSection />
      <CommunityHighlights />
      <section className="px-4 py-8 sm:py-10" style={{ background: "hsl(220 50% 5%)", borderTop: "1px solid rgba(255,255,255,0.06)" }} aria-labelledby="home-membership">
        <h2 id="home-membership" className="mb-4 text-center text-[13px] font-semibold uppercase tracking-[0.14em] text-white/55">
          {t("home.v2.membershipHeading")}
        </h2>
        <div className="dark"><MembershipOffer variant="compact" /></div>
      </section>
    </div>
  );
}
