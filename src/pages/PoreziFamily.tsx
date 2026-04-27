import { Heart } from "lucide-react";
import { PoreziModuleTemplate } from "@/components/porezi/PoreziModuleTemplate";

export default function PoreziFamily() {
  return (
    <PoreziModuleTemplate
      config={{
        id: "family", icon: Heart, seoPath: "/porezi/porodica-i-klase",
        counts: { intro: 2, amounts: 6, steps: 6, example: true, exampleRows: 5, proofs: 5, mistakes: 5, faq: 4 },
        externalLink: { href: "https://www.elster.de/eportal/formulare-leistungen/alleformulare/est" },
      }}
    />
  );
}
