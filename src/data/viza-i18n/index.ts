import { COUNTRY_CONTENT, type CountryContent } from "@/data/vizaNavigatorContent";
import { applyOverlay } from "@/lib/i18n-overlay";
import { overlay as deOverlay } from "./de";
import { overlay as hrOverlay } from "./hr";
import { overlay as srOverlay } from "./sr";

export function getLocalizedCountryContent(lang: string): CountryContent[] {
  switch (lang) {
    case "de": return applyOverlay(COUNTRY_CONTENT, deOverlay);
    case "hr": return applyOverlay(COUNTRY_CONTENT, hrOverlay);
    case "sr": return applyOverlay(COUNTRY_CONTENT, srOverlay);
    default:   return COUNTRY_CONTENT;
  }
}
