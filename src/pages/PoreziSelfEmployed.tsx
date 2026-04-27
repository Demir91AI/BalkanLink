/**
 * /porezi/samostalni-i-freelancer · /hr/porezi/samostalni-i-freelancer
 * /de/steuern/selbststaendige-und-freelancer
 *
 * Educational module: Gewerbe vs Freiberuf, EÜR, Vorsteuer,
 * Kleinunternehmerregelung, typical mistakes. References § 18 EStG,
 * § 4 Abs. 3 EStG, § 19 UStG.
 */
import { Briefcase } from "lucide-react";
import { PoreziModuleTemplate } from "@/components/porezi/PoreziModuleTemplate";

export default function PoreziSelfEmployed() {
  return (
    <PoreziModuleTemplate
      config={{
        id: "selfEmployed",
        icon: Briefcase,
        seoPath: "/porezi/samostalni-i-freelancer",
        counts: { intro: 2, criteria: 5, costs: 6, proofs: 5, mistakes: 5, faq: 4 },
        externalLink: { href: "https://www.elster.de/eportal/start" },
      }}
    />
  );
}
