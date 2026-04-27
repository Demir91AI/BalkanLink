import { AlertTriangle } from "lucide-react";
import { PoreziModuleTemplate } from "@/components/porezi/PoreziModuleTemplate";

export default function PoreziMistakes() {
  return (
    <PoreziModuleTemplate
      config={{
        id: "mistakes", icon: AlertTriangle, seoPath: "/porezi/najcesce-greske",
        counts: { intro: 2, amounts: 6, steps: 6, example: true, exampleRows: 4, mistakes: 5, faq: 4 },
        externalLink: { href: "https://mein.elster.de/" },
      }}
    />
  );
}
