import { useTranslation } from "react-i18next";
import GuideInfoHeader from "./GuideInfoHeader";
import SmartGuideWizardShared from "./SmartGuideWizardShared";
import { getEinbuergerungGuide } from "@/data/einbuergerung-guide-i18n";

export default function EinbuergerungGuideContent() {
  const { i18n } = useTranslation();
  const g = getEinbuergerungGuide(i18n.language);
  return (
    <div className="space-y-8">
      <GuideInfoHeader {...g.header} labels={g.labels} />
      <SmartGuideWizardShared steps={g.steps} />
    </div>
  );
}
