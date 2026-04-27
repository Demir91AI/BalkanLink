import { Receipt } from "lucide-react";
import { PoreziModuleTemplate } from "@/components/porezi/PoreziModuleTemplate";

export default function PoreziElster() {
  return (
    <PoreziModuleTemplate
      config={{
        id: "elsterGuide", icon: Receipt, seoPath: "/porezi/elster-vodic",
        counts: { intro: 2, amounts: 5, steps: 8, example: true, exampleRows: 4, proofs: 5, mistakes: 5, faq: 4 },
        externalLink: { href: "https://mein.elster.de/" },
      }}
    />
  );
}
