/**
 * /porezi/sta-mogu-odbiti · /hr/porezi/sto-mogu-odbiti
 * /de/steuern/was-kann-ich-absetzen
 *
 * Educational module: Werbungskosten, Sonderausgaben, außergewöhnliche
 * Belastungen — sa praktičnim ELSTER walkthrough-om i primjerom računa.
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
        counts: {
          intro: 2, amounts: 8, costs: 6, steps: 7,
          example: true, exampleRows: 7,
          proofs: 5, mistakes: 5, faq: 4,
        },
        externalLink: { href: "https://www.elster.de/eportal/formulare-leistungen/alleformulare/est" },
      }}
    />
  );
}
