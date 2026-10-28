/** Source snapshot from the saved education inventory; no portal screen mappings. */
export const EDUCATION_SLUGS = ["bafoeg", "schueler-bafoeg", "integrationskurs"] as const;
export type EducationSlug = typeof EDUCATION_SLUGS[number];
export function isEducationSlug(slug: string): slug is EducationSlug {
  return EDUCATION_SLUGS.some((item) => item === slug);
}
export const EDUCATION_VERIFIED_ON = "28.10.2026";
const forms = "https://www.xn--bafg-7qa.de/bafoeg/de/antrag-stellen/alle-antragsformulare/alle-antragsformulare_node.html";
const bamf = "https://www.bamf.de/SharedDocs/Anlagen/DE/Integration/Integrationskurse/Kursteilnehmer/AntraegeAlle/";
// Link to the verified publisher index rather than reconstructing missing PDF blob URLs.
const bafoegLinks = [
  { key: "bafoegDigital", url: "https://www.bafoeg-digital.de" },
  { key: "fbAll", url: forms },
];
export const EDUCATION_LINKS: Record<EducationSlug, { key: string; url: string }[]> = {
  bafoeg: bafoegLinks,
  "schueler-bafoeg": bafoegLinks,
  integrationskurs: [
    { key: "ikForm", url: `${bamf}630-007_antrag-zulassung-integrationskurs-ausl_pdf.html` },
    { key: "ikCost", url: "https://www.bamf.de/DE/Themen/Integration/ZugewanderteTeilnehmende/Integrationskurse/TeilnahmeKosten/teilnahmekosten-node.html" },
    { key: "navi", url: "https://bamf-navi.bamf.de" },
  ],
};