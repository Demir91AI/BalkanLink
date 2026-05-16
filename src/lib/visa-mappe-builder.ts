/**
 * Helper za konstrukciju Bewerbungs-Mappe iz visa form datae.
 * Centralizovano da svaka forma poziva istom jednom linijom.
 */
import { buildBewerbungsMappe, generateAnschreiben } from "@/lib/visa-bewerbungs-mappe-pdf";
import { VISA_MAPPE_META } from "@/lib/visa-mappe-config";
import { VISA_DATENBLATT_META } from "@/lib/visa-datenblatt-config";
import { loadVisaProfile } from "@/lib/visa-shared-profile";

export type VisaFormKey =
  | "visaWork1" | "visaWork2" | "visaBluecard"
  | "visaStudy" | "visaFamily" | "visaPermanent1" | "visaPermanent2";

export function makeMappeBuilder(formKey: VisaFormKey, extras: Record<string, string>) {
  return async () => {
    const dbMeta = VISA_DATENBLATT_META[formKey];
    const mappeMeta = VISA_MAPPE_META[formKey];
    if (!dbMeta || !mappeMeta) {
      throw new Error(`Mappe meta not found for ${formKey}`);
    }
    const profile = loadVisaProfile();
    const anschreiben = generateAnschreiben(profile, mappeMeta.visaType, mappeMeta.paragraphSection);
    return buildBewerbungsMappe({
      formTitle: dbMeta.formTitle,
      formSubtitle: dbMeta.formSubtitle,
      reasonNote: dbMeta.reasonNote,
      usageNote: dbMeta.usageNote,
      officialPdfUrl: dbMeta.officialPdfUrl,
      officialPdfLabel: dbMeta.officialPdfLabel,
      profile,
      sections: dbMeta.mapExtras(extras),
      visaType: mappeMeta.visaType,
      countryOfOrigin: profile.staatsangehoerigkeit,
      paragraphSection: mappeMeta.paragraphSection,
      anschreibenBody: anschreiben,
      checklist: mappeMeta.checklist.map((label) => ({ label, done: false })),
    });
  };
}

export function getMappeFileName(formKey: VisaFormKey): string {
  return VISA_MAPPE_META[formKey]?.fileName ?? "BalkanLink-Bewerbungs-Mappe.pdf";
}
