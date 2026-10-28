/**
 * "Rad i karijera" companions. Topical only: online flows need login and no inspected current PDF
 * exists for exact field order, so no term carries a field/page `reference`. Links are pinned here.
 */
export const CAREER_SLUGS = ["arbeitslosengeld", "krankenkasse", "steuerklassenwechsel"] as const;
export type CareerSlug = typeof CAREER_SLUGS[number];
export function isCareerSlug(slug: string): slug is CareerSlug {
  return CAREER_SLUGS.some((item) => item === slug);
}
export const CAREER_VERIFIED_ON = "28.10.2026";
const BA = "https://www.arbeitsagentur.de/arbeitslos-arbeit-finden/arbeitslosengeld";
export const CAREER_LINKS: Record<CareerSlug, { key: string; url: string }[]> = {
  arbeitslosengeld: [
    { key: "baSteps", url: `${BA}/ihre-schritte-wenn-sie-arbeitslos-werden` },
    { key: "baAs", url: `${BA}/ihre-schritte-wenn-sie-arbeitslos-werden/wie-sie-sich-arbeitsuchend-melden` },
    { key: "baAl", url: `${BA}/ihre-schritte-wenn-sie-arbeitslos-werden/wie-sie-sich-arbeitslos-melden` },
    { key: "baAnspruch", url: `${BA}/finanzielle-hilfen/arbeitslosengeld-anspruch-hoehe-dauer` },
  ],
  krankenkasse: [
    { key: "gkvList", url: "https://www.gkv-spitzenverband.de/service/krankenkassenliste/krankenkassen.jsp" },
    { key: "bmg", url: "https://www.bundesgesundheitsministerium.de/themen/krankenversicherung/online-ratgeber-krankenversicherung/krankenversicherung/wahl-und-wechsel-der-krankenkasse/" },
    { key: "gesund", url: "https://gesund.bund.de/krankenkasse-wechseln" },
  ],
  steuerklassenwechsel: [
    { key: "bundSt", url: "https://verwaltung.bund.de/leistungsverzeichnis/DE/leistung/99102036011007/herausgeber/RP-8965909/region/070000000000" },
    { key: "elster", url: "https://www.elster.de/eportal/formulare-leistungen/alleformulare" },
    { key: "fms", url: "https://www.formulare-bfinv.de" },
    { key: "bwInfo", url: "https://finanzamt-bw.fv-bwl.de/site/pbs-bw-mlr-root/node/5278295/Lde/index.html" },
  ],
};
