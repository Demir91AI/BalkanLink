/**
 * /porezi/prihodi-od-izdavanja · /hr/porezi/prihodi-od-najma
 * /de/steuern/mieteinkuenfte
 *
 * Educational module: rental income (Anlage V), deductible costs,
 * AfA basics, repair vs improvement, vacancy. References § 21 EStG,
 * § 7 EStG (AfA), BMF on Anschaffungsnaher Aufwand.
 */
import { Building2 } from "lucide-react";
import { PoreziModuleTemplate } from "@/components/porezi/PoreziModuleTemplate";

export default function PoreziRental() {
  return (
    <PoreziModuleTemplate
      config={{
        id: "rentalIncome",
        icon: Building2,
        seoPath: "/porezi/prihodi-od-izdavanja",
        counts: { intro: 2, criteria: 5, costs: 6, proofs: 5, mistakes: 5, faq: 4 },
      }}
    />
  );
}
