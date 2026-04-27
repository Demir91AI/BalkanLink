import { BIZNIS_GUIDES, type BiznisGuide } from "@/lib/biznis-data";
import { applyOverlay } from "@/lib/i18n-overlay";
import { overlay as deOverlay } from "./guides.de";
import { overlay as hrOverlay } from "./guides.hr";
import { overlay as srOverlay } from "./guides.sr";

export function getLocalizedBiznisGuides(lang: string): BiznisGuide[] {
  switch (lang) {
    case "de": return applyOverlay(BIZNIS_GUIDES, deOverlay);
    case "hr": return applyOverlay(BIZNIS_GUIDES, hrOverlay);
    case "sr": return applyOverlay(BIZNIS_GUIDES, srOverlay);
    default:   return BIZNIS_GUIDES;
  }
}
