/** Phase 2 family companions. Kindergeld is intentionally excluded and keeps its own pilot. */
export const FAMILY_SLUGS = ["elterngeld", "mutterschaftsgeld", "kinderzuschlag", "krippengeld-bayern", "wirtschaftliche-jugendhilfe"] as const;
export type FamilySlug = typeof FAMILY_SLUGS[number];
export function isFamilySlug(slug: string): slug is FamilySlug {
  return FAMILY_SLUGS.some((item) => item === slug);
}
/** Slugs whose term `reference` values were checked against one uniform, current federal PDF. */
export const FIELD_MAPPED_FAMILY_SLUGS: readonly FamilySlug[] = ["kinderzuschlag"];
