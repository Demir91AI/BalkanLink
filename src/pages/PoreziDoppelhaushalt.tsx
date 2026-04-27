import { Home } from "lucide-react";
import { PoreziModuleTemplate } from "@/components/porezi/PoreziModuleTemplate";

export default function PoreziDoppelhaushalt() {
  return (
    <PoreziModuleTemplate
      config={{
        id: "dhf", icon: Home, seoPath: "/porezi/dvostruko-domacinstvo",
        counts: { intro: 2, amounts: 5, steps: 6, example: true, exampleRows: 4, proofs: 5, mistakes: 5, faq: 4 },
        externalLink: { href: "https://www.elster.de/eportal/formulare-leistungen/alleformulare/est" },
      }}
    />
  );
}
