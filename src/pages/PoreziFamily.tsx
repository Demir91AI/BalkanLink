/**
 * /porezi/porodica-i-klase · /hr/porezi/obitelj-i-klase · /sr same as bs
 * /de/steuern/familie-und-steuerklassen
 *
 * Educational module: Steuerklassen, Ehegattensplitting,
 * Kinderfreibetrag vs Kindergeld, Günstigerprüfung.
 * References § 26, § 32, § 38b EStG.
 */
import { Heart } from "lucide-react";
import { PoreziModuleTemplate } from "@/components/porezi/PoreziModuleTemplate";

export default function PoreziFamily() {
  return (
    <PoreziModuleTemplate
      config={{
        id: "family",
        icon: Heart,
        seoPath: "/porezi/porodica-i-klase",
        counts: { intro: 2, criteria: 5, costs: 6, mistakes: 5, faq: 4 },
      }}
    />
  );
}
