import { Building2 } from "lucide-react";
import { PoreziModuleTemplate } from "@/components/porezi/PoreziModuleTemplate";

export default function PoreziRental() {
  return (
    <PoreziModuleTemplate
      config={{
        id: "rentalIncome", icon: Building2, seoPath: "/porezi/prihodi-od-izdavanja",
        counts: { intro: 2, amounts: 7, steps: 7, example: true, exampleRows: 6, proofs: 5, mistakes: 5, faq: 4 },
        externalLink: { href: "https://www.elster.de/eportal/formulare-leistungen/alleformulare/est" },
      }}
    />
  );
}
