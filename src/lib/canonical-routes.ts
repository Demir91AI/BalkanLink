/**
 * CANONICAL ROUTE REGISTRY — Single Source of Truth
 *
 * Every navigation system in BalkanLink MUST use this registry:
 * - Sidebar menus
 * - Homepage service cards
 * - Assistant CTA buttons
 * - Premium redirects
 * - Internal cross-links
 * - Search result targets
 *
 * NO duplicate or legacy routes should be used anywhere.
 */

import { getAllFormEntries } from "./form-catalog";

const catalogGuideSlugs = new Set(getAllFormEntries().map(f => f.slug));

export interface CanonicalSection {
  id: string;
  route: string;
  premium: boolean;
  /** Used by assistant to map detected topics → canonical route */
  assistantTopicKeys?: string[];
}

// ── PRIMARY SECTIONS (from left sidebar) ──

export const CANONICAL_SECTIONS: CanonicalSection[] = [
  // Main functions
  { id: "smart-guide", route: "/formulari", premium: true, assistantTopicKeys: ["formular", "formulari", "smart guide", "antrag", "obrazac"] },
  { id: "visa-navigator", route: "/viza", premium: true, assistantTopicKeys: ["viza", "visa", "aufenthalt", "boravišna", "boravisna", "residence", "blue card", "radna dozvola"] },
  { id: "deutsch-trainer", route: "/deutsch-trainer", premium: true, assistantTopicKeys: ["deutsch", "njemački", "njemacki", "german", "sprachkurs", "učenje"] },
  { id: "dokumenten-check", route: "/dokumenten-check", premium: true, assistantTopicKeys: ["dokument", "pismo", "brief", "letter", "analiza", "dokumenten-check"] },
  { id: "nudim-trazim", route: "/nudim-trazim", premium: false, assistantTopicKeys: ["nudim", "tražim", "trazim", "oglas"] },
  
  // Secondary
  { id: "radno-pravo", route: "/radno-pravo", premium: false, assistantTopicKeys: ["radno pravo", "arbeitsrecht", "ugovor", "otkaz", "plata", "bolovanje", "odmor", "minijob", "kündigungsfrist"] },
  { id: "biznis", route: "/biznis", premium: false, assistantTopicKeys: ["biznis", "gewerbe", "samozaposlenje", "selbständig", "freiberufler", "firma", "kleingewerbe", "geschäft", "unternehmen"] },
  { id: "jobs", route: "/stellenangebote", premium: false, assistantTopicKeys: ["posao", "job", "rad", "zaposlenje", "arbeit", "stellenangebot"] },
  { id: "housing", route: "/wohnungen", premium: false, assistantTopicKeys: ["stan", "wohnung", "sobu", "wg", "smještaj"] },
  { id: "calculators", route: "/kalkulatori", premium: false, assistantTopicKeys: ["kalkulator", "brutto", "netto", "plata", "rechner"] },
  { id: "templates", route: "/vorlagen", premium: false, assistantTopicKeys: ["predložak", "predlozak", "vorlage", "template", "pismo"] },
];

// ── GUIDE SLUG → CANONICAL ROUTE ──

/** Builds the canonical route for a specific guide/form topic */
export function getCanonicalGuideRoute(slug: string): string {
  return `/formulari/${slug}`;
}

/** Returns the canonical section route by id */
export function getCanonicalRoute(sectionId: string): string | null {
  const section = CANONICAL_SECTIONS.find(s => s.id === sectionId);
  return section?.route ?? null;
}

// ── LEGACY ROUTE REDIRECTS ──

/** Maps old/legacy routes to their canonical replacements */
export const LEGACY_ROUTE_REDIRECTS: Record<string, string> = {
  "/formulare": "/formulari",
  // /guide/:slug and /smart-guide/:slug are handled via redirect components
};

// ── VALID ROUTES (for assistant link validation) ──

export const VALID_PRODUCTION_ROUTES = new Set([
  "/", "/dolazak", "/pocni-ovdje",
  "/dolazak/prijava-prebivalista", "/dolazak/boravisna-dozvola",
  "/dolazak/steuer-id-i-porezna-klasa", "/dolazak/zdravstveno-osiguranje",
  "/dolazak/bankovni-racun", "/dolazak/prvi-koraci",
  "/dolazak/sozialversicherung", "/dolazak/rundfunkbeitrag",
  "/dolazak/fuehrerschein", "/dolazak/auto-anmelden",
  "/zivot", "/zivot-savjeti", "/probleme", "/trebam-pomoc",
  "/formulari", "/familie", "/foerderungen",
  "/tools", "/brutto-netto-rechner", "/kalkulatori",
  "/wohnungen", "/stellenangebote",
  "/premium", "/paketi",
  "/dokumenten-check", "/viza",
  "/qa", "/directory", "/directory/submit",
  "/ambasade-konzulati", "/ambasade",
  "/login", "/register", "/forgot-password", "/reset-password",
  "/impressum", "/datenschutz", "/disclaimer", "/haftungsausschluss",
  "/ki-hinweis", "/mitgliedschaft", "/agb", "/nutzungsbedingungen",
  "/dsa", "/inhalte-melden", "/cookie-richtlinie",
  "/nudim-trazim", "/nach-deutschland", "/vorlagen",
  "/deutsch-trainer", "/deutsch-trainer/preise", "/deutsch-trainer/faq",
  "/bussgeld", "/generatoren",
  "/radno-pravo",
  "/biznis",
  "/mietrecht",
  "/anerkennung",
  "/porezi", "/steuern",
  "/profil", "/historija-placanja",
  "/dvojno-drzavljanstvo", "/doppelte-staatsbuergerschaft",
]);

export function isValidProductionRoute(path: string): boolean {
  const normalized = path.split(/[?#]/)[0].replace(/^\/(de|hr|sr)(?=\/)/, "");
  if (normalized.startsWith("/formulari/")) {
    return catalogGuideSlugs.has(normalized.slice("/formulari/".length));
  }
  if (VALID_PRODUCTION_ROUTES.has(path)) return true;
  if (path.startsWith("/qa/")) return true;
  if (path.startsWith("/musterformular/")) return true;
  if (path.startsWith("/vorlagen/")) return true;
  if (path.startsWith("/nach-deutschland/")) return true;
  if (path.startsWith("/firma/")) return true;
  if (path.startsWith("/radno-pravo/")) return true;
  if (path.startsWith("/biznis/")) return true;
  if (path.startsWith("/porezi/")) return true;
  if (path.startsWith("/steuern/")) return true;
  if (path.startsWith("/mietrecht/")) return true;
  if (path.startsWith("/anerkennung/")) return true;
  // Localized prefixes (de, hr, sr) — accept any of them as well
  if (/^\/(de|hr|sr)\/(porezi|steuern|formulari|viza|anerkennung|mietrecht|radno-pravo|biznis|nach-deutschland|deutsch-trainer)/.test(path)) return true;
  return false;
}
