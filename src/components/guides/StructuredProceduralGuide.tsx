import { useTranslation } from "react-i18next";
import SmartGuideWizardShared from "./SmartGuideWizardShared";
import type { SmartGuideStep } from "@/components/guide-first/SmartGuide";
import { getGuideSource } from "@/lib/guide-first/official-sources";

/** Data-driven reviewed workflows retain the shared host's legacy access policy. */
export default function StructuredProceduralGuide({ workflow, slug, free = false }: { workflow: "kinderzuschlag" | "steuerId"; slug: string; free?: boolean }) {
  const { t } = useTranslation("pages");
  const key = `proceduralGuides.${workflow}`;
  return <SmartGuideWizardShared steps={[]} guideId={workflow} free={free}
    title={t(`${key}.title`)} subtitle={t(`${key}.subtitle`)}
    structuredSteps={t(`${key}.steps`, { returnObjects: true }) as SmartGuideStep[]}
    summary={t(`${key}.summary`, { returnObjects: true }) as string[]}
    source={getGuideSource(slug)} />;
}