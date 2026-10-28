/**
 * Wohngeld decision guide. Memory-only: answers live in component state and are never stored or sent.
 * Bavarian originals are print-only encrypted PDFs, so no field/page indices are claimed anywhere;
 * Bavarian links appear only when the user selects Bayern plus renting or owning.
 */
export type WgState = "bayern" | "other" | "unsure";
export type WgHousing = "rent" | "own" | "unsure";
export type WgKind = "first" | "renewal" | "unsure";
export type WgVariant = "bayernMiete" | "bayernLasten" | "general";
export interface WgAnswers { state: WgState | null; housing: WgHousing | null; kind: WgKind | null }

const STMB = "https://www.stmb.bayern.de/assets/stmi/wohnen/wohngeld/";
export const WOHNGELD_LINKS = {
  bpPage: "https://www.bayernportal.de/dokumente/leistung/978091781416",
  bpOnline: "https://www.bayernportal.de/dokumente/onlineservice/41887779239",
  mzForm: `${STMB}35_mz_antrag_bildschirm.pdf`,
  mzErl: `${STMB}35_mz_erl%C3%A4uterungen.pdf`,
  mzHin: `${STMB}hinweisblatt_nachweise_f%C3%BCr_mietzuschuss.pdf`,
  lzForm: `${STMB}35_lz_antrag_bildschirm.pdf`,
  lzErl: `${STMB}35_lz_erl%C3%A4uterungen.pdf`,
  lzHin: `${STMB}hinweisblatt_nachweise_f%C3%BCr_lastenzuschuss.pdf`,
  verdienst: `${STMB}verdienstbescheinigung_zum_ausf%C3%BCllen.pdf`,
  bund: "https://verwaltung.bund.de/leistungsverzeichnis/DE/leistung/99107023037000",
} as const;
export type WgLinkKey = keyof typeof WOHNGELD_LINKS;
export const WOHNGELD_VERIFIED_ON = "28.10.2026";

export function wohngeldVariant(a: WgAnswers): WgVariant {
  if (a.state === "bayern" && a.housing === "rent") return "bayernMiete";
  if (a.state === "bayern" && a.housing === "own") return "bayernLasten";
  return "general";
}

export function wohngeldResultKey(a: WgAnswers): string {
  if (a.state === "bayern") return a.housing === "rent" ? "resultBayernMiete" : a.housing === "own" ? "resultBayernLasten" : "resultBayernUnsure";
  if (a.state === "other") return "resultOther";
  if (a.state === "unsure") return "resultUnsureState";
  return "prompt";
}

export function wohngeldLinks(variant: WgVariant): WgLinkKey[] {
  if (variant === "bayernMiete") return ["mzForm", "mzErl", "mzHin", "verdienst", "bpPage", "bpOnline"];
  if (variant === "bayernLasten") return ["lzForm", "lzErl", "lzHin", "verdienst", "bpPage", "bpOnline"];
  return ["bund"];
}
