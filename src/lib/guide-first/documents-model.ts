/** Local procedures and certificate vocabulary only; no exact field indices. */
export const DOCUMENTS_SLUGS = ["grundsicherung", "fuehrungszeugnis", "kirchenaustritt"] as const;
export type DocumentsSlug = typeof DOCUMENTS_SLUGS[number];
export function isDocumentsSlug(slug: string): slug is DocumentsSlug {
  return DOCUMENTS_SLUGS.some(item => item === slug);
}
export const DOCUMENTS_VERIFIED_ON = "28.10.2026";
export const DOCUMENTS_LINKS: Record<DocumentsSlug, { key: string; url: string }[]> = {
  grundsicherung: [
    { key: "bmas", url: "https://www.bmas.de/DE/Soziales/Sozialhilfe/Leistungen-fuer-den-Lebensunterhalt/Rundschreiben-zur-Grundsicherung/rundschreiben-zur-grundsicherung-art.html" },
    { key: "berlin", url: "https://service.berlin.de/dienstleistung/324394/" },
  ],
  fuehrungszeugnis: [
    { key: "faq", url: "https://www.bundesjustizamt.de/DE/Themen/ZentraleRegister/Fuehrungszeugnis/Fragen/Fragen_node.html?docId=259056" },
    { key: "portal", url: "https://www.fuehrungszeugnis.bund.de/" },
    { key: "digital", url: "https://www.bundesjustizamt.de/DE/Themen/ZentraleRegister/Fuehrungszeugnis/DigitalesFuehrungszeugnis/Digitales_Fuehrungszeugnis_node.html" },
  ],
  kirchenaustritt: [
    { key: "bund", url: "https://verwaltung.bund.de/leistungsverzeichnis/de/leistung/99073001022000" },
    { key: "bayern", url: "https://www.bayernportal.de/dokumente/leistung/99775446502" },
    { key: "nrw", url: "https://www.justiz.nrw.de/BS/recht_a_z/K/Kirchenaustritt" },
  ],
};