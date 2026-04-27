/**
 * /porezi/najcesce-greske · /hr/porezi/najceste-pogreske
 * /de/steuern/haeufigste-fehler
 *
 * Educational module: top mistakes that lead to rejected deductions,
 * audits, or back-taxes. Synthesises the Bundessteuerberaterkammer
 * recommendations and BFH case patterns.
 */
import { AlertTriangle } from "lucide-react";
import { PoreziModuleTemplate } from "@/components/porezi/PoreziModuleTemplate";

export default function PoreziMistakes() {
  return (
    <PoreziModuleTemplate
      config={{
        id: "mistakes",
        icon: AlertTriangle,
        seoPath: "/porezi/najcesce-greske",
        counts: { intro: 2, mistakes: 8, proofs: 5, faq: 4 },
      }}
    />
  );
}
