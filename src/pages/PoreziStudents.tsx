import { GraduationCap } from "lucide-react";
import { PoreziModuleTemplate } from "@/components/porezi/PoreziModuleTemplate";

export default function PoreziStudents() {
  return (
    <PoreziModuleTemplate
      config={{
        id: "studentsTrainees", icon: GraduationCap, seoPath: "/porezi/studenti-i-pripravnici",
        counts: { intro: 2, amounts: 6, steps: 5, example: true, exampleRows: 5, proofs: 5, mistakes: 5, faq: 4 },
        externalLink: { href: "https://www.elster.de/eportal/formulare-leistungen/alleformulare/est" },
      }}
    />
  );
}
