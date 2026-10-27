import type { GuideStepSections } from "@/components/guide-first/SmartGuide";

export const ARRIVAL_SLUGS = ["anmeldung", "steuer-id", "fuehrerschein", "fahrzeugzulassung"] as const;
export type ArrivalSlug = typeof ARRIVAL_SLUGS[number];
export function isArrivalSlug(slug: string): slug is ArrivalSlug {
  return ARRIVAL_SLUGS.some((item) => item === slug);
}
export interface ProcedureTerm {
  id: string;
  german: string;
  meaning: string;
  instruction: string;
  where: string;
  example: string;
  mistake: string;
  options?: { german: string; meaning: string }[];
}
export interface ArrivalProcedure {
  title: string;
  introduction: string;
  variation: string;
  modes: { paper: string; online: string };
  steps: { id: string; title: string; sections: GuideStepSections }[];
  terms: ProcedureTerm[];
}