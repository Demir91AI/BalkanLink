/**
 * /porezi/elster-vodic · /hr same · /sr same
 * /de/steuern/elster-anleitung
 *
 * Educational module: how to register on ELSTER, certificate types,
 * step-by-step electronic submission. References § 87a AO and ELSTER
 * official documentation.
 */
import { Receipt } from "lucide-react";
import { PoreziModuleTemplate } from "@/components/porezi/PoreziModuleTemplate";

export default function PoreziElster() {
  return (
    <PoreziModuleTemplate
      config={{
        id: "elsterGuide",
        icon: Receipt,
        seoPath: "/porezi/elster-vodic",
        counts: { intro: 2, criteria: 5, proofs: 5, mistakes: 5, faq: 4 },
        externalLink: { href: "https://www.elster.de/eportal/start" },
      }}
    />
  );
}
