import { CalendarClock } from "lucide-react";
import { PoreziModuleTemplate } from "@/components/porezi/PoreziModuleTemplate";

export default function PoreziDeadlines() {
  return (
    <PoreziModuleTemplate
      config={{
        id: "deadlines", icon: CalendarClock, seoPath: "/porezi/rokovi-i-kazne",
        counts: { intro: 2, amounts: 5, steps: 5, example: true, exampleRows: 4, mistakes: 5, faq: 4 },
        externalLink: { href: "https://www.elster.de/eportal/formulare-leistungen/alleformulare/est" },
      }}
    />
  );
}
