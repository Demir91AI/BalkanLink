/**
 * /porezi/sta-mogu-odbiti · /hr/porezi/sto-mogu-odbiti
 * /de/steuern/was-kann-ich-absetzen
 *
 * Educational module: Werbungskosten, Sonderausgaben,
 * außergewöhnliche Belastungen — categories, typical items,
 * common pitfalls. References § 9, § 10, § 33 EStG.
 */
import { Wallet } from "lucide-react";
import { PoreziModuleTemplate } from "@/components/porezi/PoreziModuleTemplate";

export default function PoreziDeductions() {
  return (
    <PoreziModuleTemplate
      config={{
        id: "deductions",
        icon: Wallet,
        seoPath: "/porezi/sta-mogu-odbiti",
        counts: { intro: 2, costs: 6, proofs: 5, mistakes: 5, faq: 4 },
      }}
    />
  );
}
