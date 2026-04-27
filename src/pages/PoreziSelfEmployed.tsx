import { Briefcase } from "lucide-react";
import { PoreziModuleTemplate } from "@/components/porezi/PoreziModuleTemplate";

export default function PoreziSelfEmployed() {
  return (
    <PoreziModuleTemplate
      config={{
        id: "selfEmployed", icon: Briefcase, seoPath: "/porezi/samostalni-i-freelancer",
        counts: { intro: 2, amounts: 7, steps: 6, example: true, exampleRows: 8, proofs: 5, mistakes: 5, faq: 4 },
        externalLink: { href: "https://www.elster.de/eportal/formulare-leistungen/alleformulare/est" },
      }}
    />
  );
}
