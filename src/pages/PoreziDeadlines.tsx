/**
 * /porezi/rokovi-i-kazne · /sr same · /hr/porezi/rokovi-i-kazne
 * /de/steuern/fristen-und-strafen
 *
 * Educational module: filing deadlines, late filing consequences,
 * Verspätungszuschlag basics, exceptions. References § 149 AO,
 * § 152 AO, BMF letters on deadline extensions.
 */
import { CalendarClock } from "lucide-react";
import { PoreziModuleTemplate } from "@/components/porezi/PoreziModuleTemplate";

export default function PoreziDeadlines() {
  return (
    <PoreziModuleTemplate
      config={{
        id: "deadlines",
        icon: CalendarClock,
        seoPath: "/porezi/rokovi-i-kazne",
        counts: { intro: 2, criteria: 5, mistakes: 5, faq: 4, proofs: 5 },
      }}
    />
  );
}
