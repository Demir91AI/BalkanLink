import { RADNO_PRAVO_GUIDES, type RadnoPravoGuide } from "@/lib/radno-pravo-data";
import { applyOverlay } from "@/lib/i18n-overlay";
import { overlay as deOverlay } from "./guides.de";
import { overlay as hrOverlay } from "./guides.hr";
import { overlay as srOverlay } from "./guides.sr";

export function getLocalizedRadnoPravoGuides(lang: string): RadnoPravoGuide[] {
  switch (lang) {
    case "de": return applyOverlay(RADNO_PRAVO_GUIDES, deOverlay);
    case "hr": return applyOverlay(RADNO_PRAVO_GUIDES, hrOverlay);
    case "sr": return applyOverlay(RADNO_PRAVO_GUIDES, srOverlay);
    default:   return RADNO_PRAVO_GUIDES;
  }
}
