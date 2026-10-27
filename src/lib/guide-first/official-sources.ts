/**
 * Guide-first source registry for the 46 FormCenter services.
 * kind:
 *  - "official": operated by a German public authority; link opened as the next step.
 *  - "info": authoritative information (law text, federal portal), not an application.
 *  - "local": no single exact federal URL → neutral "check your local authority" note.
 * verifiedOn is set ONLY when the guide content was checked against the source.
 */
export type SourceKind = "official" | "info" | "local";

export interface GuideSource {
  kind: SourceKind;
  url?: string;
  label?: string;
  verifiedOn?: string;
  /** Additional official outbound links (never generated/filled PDFs). */
  extraLinks?: { url: string; label: string }[];
}

const JC: GuideSource = { kind: "official", url: "https://jobcenter.digital", label: "jobcenter.digital (BA / Jobcenter)" };

export const GUIDE_SOURCES: Record<string, GuideSource> = {
  anmeldung: { kind: "local", url: "https://verwaltung.bund.de/leistungsverzeichnis/DE/leistung/99115005104000/herausgeber/BB-108321434/region/120000000000", label: "Bundesportal — Brandenburg · Anmeldung", verifiedOn: "27.10.2026", extraLinks: [
    { url: "https://www.gesetze-im-internet.de/bmg/__19.html", label: "BMG §19 — Wohnungsgeberbestätigung" },
    { url: "https://www.gesetze-im-internet.de/bmg/__21.html", label: "BMG §21 — Hauptwohnung / Nebenwohnung" },
  ] },
  "steuer-id": { kind: "official", url: "https://online.portal.bzst.de/SharedDocs/Leistungsbeschreibung/DE/erneute_mitteilung_der_ID-Nr.html", label: "BZSt — IdNr", verifiedOn: "27.10.2026", extraLinks: [
    { url: "https://www.bzst.de/DE/Privatpersonen/SteuerlicheIdentifikationsnummer/FAQ/faq_node.html", label: "BZSt — IdNr FAQ" },
    { url: "https://karriere.bzst.de/SiteGlobals/Kontaktformulare/DE/IdNr/Mitteilung_IdNr/mitteilung_IdNr_node.html", label: "BZSt — Mitteilung IdNr" },
  ] },
  fuehrerschein: { kind: "local", url: "https://verwaltung.bund.de/leistungsverzeichnis/de/leistung/99108047050002/herausgeber/HB-S1000030000009309/region/040000000000", label: "Bundesportal — Bremen · Führerschein", verifiedOn: "27.10.2026", extraLinks: [
    { url: "https://www.gesetze-im-internet.de/fev_2010/__28.html", label: "FeV §28 — EU / EWR" },
    { url: "https://www.gesetze-im-internet.de/fev_2010/__29.html", label: "FeV §29 — Drittstaat" },
    { url: "https://www.gesetze-im-internet.de/fev_2010/anlage_11.html", label: "FeV — Anlage 11" },
  ] },
  fahrzeugzulassung: { kind: "local", url: "https://verwaltung.bund.de/leistungsverzeichnis/de/leistung/99036020001000/herausgeber/HB-S1000030000018506/region/040000000000", label: "Bundesportal — Bremen · Fahrzeugzulassung", verifiedOn: "27.10.2026", extraLinks: [
    { url: "https://www.service.bremen.de/dienstleistungen/kraftfahrzeug-umschreiben-mit-halterwechsel-und-ohne-kennzeichenmitnahme-126635", label: "Bremen — Halterwechsel" },
    { url: "https://www.bmv.de/SharedDocs/DE/Artikel/StV/Strassenverkehr/internetbasierte-fahrzeugzulassung.html", label: "BMV — i-Kfz" },
  ] },
  kindergeld: {
    kind: "official",
    url: "https://www.arbeitsagentur.de/familie-und-kinder/eservices-fuer-familien",
    label: "Familienkasse — eServices (BA)",
    verifiedOn: "27.10.2026",
    extraLinks: [
      { url: "https://www.arbeitsagentur.de/familie-und-kinder/downloads-familie-und-kinder/formulare-kindergeld", label: "Familienkasse — Formulare Kindergeld (BA)" },
    ],
  },
  elterngeld: {
    kind: "info",
    url: "https://familienportal.de/familienportal/rechner-antraege/elterngeld-digital",
    label: "ElterngeldDigital — Familienportal (BMFSFJ)",
    extraLinks: [{ url: "https://familienportal.de", label: "Familienportal (BMFSFJ) — Elterngeldstellen je Bundesland" }],
  },
  mutterschaftsgeld: { kind: "official", url: "https://www.mutterschaftsgeld.de", label: "Mutterschaftsgeldstelle (Bundesamt für Soziale Sicherung)" },
  kinderzuschlag: { kind: "official", url: "https://www.arbeitsagentur.de/familie-und-kinder/kinderzuschlag-verstehen/kinderzuschlag-anspruch-hoehe-dauer", label: "Familienkasse — Kinderzuschlag (BA)", verifiedOn: "27.10.2026", extraLinks: [
    { url: "https://www.arbeitsagentur.de/familie-und-kinder/kinderzuschlag-verstehen/kiz-lotse", label: "Familienkasse — KiZ-Lotse" },
    { url: "https://www.arbeitsagentur.de/familie-und-kinder/downloads-familie-und-kinder/formulare-kinderzuschlag", label: "Familienkasse — Formulare Kinderzuschlag" },
    { url: "https://www.arbeitsagentur.de/familie-und-kinder/eservices-fuer-familien", label: "Familienkasse — eServices" },
  ] },
  "krippengeld-bayern": { kind: "official", url: "https://www.zbfs.bayern.de/familie/krippengeld/", label: "ZBFS Bayern — Krippengeld" },
  "wirtschaftliche-jugendhilfe": { kind: "local" },
  hauptantrag: JC,
  weiterbewilligung: JC,
  "anlage-kdu": JC, "anlage-ek": JC, "anlage-eks": JC, "anlage-vm": JC, "anlage-wep": JC,
  "anlage-ki": JC, "anlage-sv": JC, "anlage-bb": JC, "anlage-ve": JC, "anlage-hg": JC,
  "anlage-meb": JC, "anlage-uf": JC, "anlage-se": JC, "anlage-uh1": JC, "anlage-uh2": JC,
  "anlage-uh3": JC, nichterreichbarkeit: JC, antragsruecknahme: JC,
  arbeitsbescheinigung: { kind: "official", url: "https://www.arbeitsagentur.de", label: "Bundesagentur für Arbeit" },
  wohngeld: { kind: "local" },
  arbeitslosengeld: { kind: "official", url: "https://www.arbeitsagentur.de", label: "Bundesagentur für Arbeit" },
  krankenkasse: { kind: "local" },
  steuerklassenwechsel: { kind: "official", url: "https://www.elster.de", label: "ELSTER (Finanzverwaltung)" },
  "anerkennung-navigator": { kind: "local" },
  bafoeg: { kind: "official", url: "https://www.bafoeg.de", label: "BAföG.de (BMBF)" },
  "schueler-bafoeg": { kind: "official", url: "https://www.bafoeg.de", label: "BAföG.de (BMBF)" },
  integrationskurs: { kind: "official", url: "https://www.bamf.de", label: "BAMF" },
  grundsicherung: { kind: "local" },
  fuehrungszeugnis: { kind: "official", url: "https://www.bundesjustizamt.de", label: "Bundesamt für Justiz" },
  kirchenaustritt: { kind: "local" },
  nationalvisum: { kind: "official", url: "https://www.auswaertiges-amt.de/de/service/visa-und-aufenthalt/auslandsportal", label: "Auslandsportal (Auswärtiges Amt)" },
  aufenthaltstitel: { kind: "local" },
  niederlassungserlaubnis: { kind: "local" },
  verpflichtungserklaerung: { kind: "local" },
};

export function getGuideSource(slug: string): GuideSource {
  return GUIDE_SOURCES[slug] ?? { kind: "local" };
}
