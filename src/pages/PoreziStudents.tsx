/**
 * /porezi/studenti-i-pripravnici · /hr/porezi/studenti-i-naucnici
 * /de/steuern/studenten-und-azubis
 *
 * Educational module: when filing pays for students, Verlustvortrag,
 * Werbungskostenpauschale, dual study programmes. References
 * § 9 Abs. 6, § 10b EStG and BFH on Erststudium vs Zweitausbildung.
 */
import { GraduationCap } from "lucide-react";
import { PoreziModuleTemplate } from "@/components/porezi/PoreziModuleTemplate";

export default function PoreziStudents() {
  return (
    <PoreziModuleTemplate
      config={{
        id: "studentsTrainees",
        icon: GraduationCap,
        seoPath: "/porezi/studenti-i-pripravnici",
        counts: { intro: 2, criteria: 5, costs: 6, mistakes: 5, faq: 4 },
      }}
    />
  );
}
