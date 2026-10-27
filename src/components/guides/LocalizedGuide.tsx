// Wraps a guide's BHS source (header + steps) and renders the localized
// version based on the active i18n language.
import { useTranslation } from "react-i18next";
import GuideInfoHeader from "./GuideInfoHeader";
import SmartGuideWizardShared from "./SmartGuideWizardShared";
import { localizeGuide, type GuideContent } from "@/lib/guide-i18n";

interface Props {
  guideKey: string;
  base: GuideContent;
  /** Optional extra content rendered between header and wizard. */
  children?: React.ReactNode;
  /** Optional content rendered below the wizard. */
  footer?: React.ReactNode;
  /** Forward to wizard. */
  free?: boolean;
}

export default function LocalizedGuide({ guideKey, base, children, footer, free }: Props) {
  const { i18n } = useTranslation();
  const lang = (i18n.language?.split("-")[0] ?? "bs") as "bs" | "de" | "hr" | "sr";
  const safeLang: "bs" | "de" | "hr" | "sr" = ["bs", "de", "hr", "sr"].includes(lang) ? lang : "bs";
  const { header, steps } = localizeGuide(guideKey, base, safeLang);

  return (
    <div className="space-y-8">
      <GuideInfoHeader
        title={header.title}
        source={header.source}
        formName={header.formName}
        whoCanApply={header.whoCanApply}
        processingTime={header.processingTime}
        requirements={header.requirements}
        commonMistakes={header.commonMistakes}
      />
      {children}
      <SmartGuideWizardShared steps={steps} free={free} guideId={guideKey} />
      {footer}
    </div>
  );
}
