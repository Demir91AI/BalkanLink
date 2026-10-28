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

const BA_INDEX = "https://www.arbeitsagentur.de/arbeitslos-arbeit-finden/downloads-arbeitslos-arbeit-finden";
const FINAL_BA_LINKS = [{ url: BA_INDEX, label: "BA · SGB II · Formulare / Hinweise" }, { url: "https://jobcenter.digital", label: "jobcenter.digital" }];

export const GUIDE_SOURCES: Record<string, GuideSource> = {
  anmeldung: { kind: "local", url: "https://verwaltung.bund.de/leistungsverzeichnis/DE/leistung/99115005104000/herausgeber/BB-108321434/region/120000000000", label: "Bundesportal — Brandenburg · Anmeldung", verifiedOn: "27.10.2026", extraLinks: [
    { url: "https://www.gesetze-im-internet.de/bmg/__19.html", label: "BMG §19 — Wohnungsgeberbestätigung" },
    { url: "https://www.gesetze-im-internet.de/bmg/__21.html", label: "BMG §21 — Hauptwohnung / Nebenwohnung" },
  ] },
  "steuer-id": { kind: "official", url: "https://online.portal.bzst.de/SharedDocs/Leistungsbeschreibung/DE/erneute_mitteilung_der_ID-Nr.html", label: "BZSt — IdNr", verifiedOn: "27.10.2026", extraLinks: [
    { url: "https://www.bzst.de/DE/Privatpersonen/SteuerlicheIdentifikationsnummer/FAQ/faq_node.html", label: "BZSt — IdNr FAQ" },
    { url: "https://www.elster.de/bportal/formulare-leistungen/alleformulare/idnr", label: "BOP / ELSTER — IdNr" },
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
    verifiedOn: "27.10.2026",
    extraLinks: [{ url: "https://familienportal.de/familienportal/familienleistungen/elterngeld/faq/wie-kann-ich-elterngeld-beantragen--124762", label: "Familienportal (BMFSFJ) — Elterngeld beantragen" }],
  },
  mutterschaftsgeld: { kind: "official", url: "https://familienportal.de/familienportal/familienleistungen/mutterschaftsleistungen/wie-kann-ich-mutterschaftsgeld-der-gesetzlichen-krankenkasse-berechnen-und-beantragen--125038", label: "Familienportal — Mutterschaftsgeld der gesetzlichen Krankenkasse", verifiedOn: "27.10.2026", extraLinks: [
    { url: "https://familienportal.de/familienportal/familienleistungen/mutterschaftsleistungen/kann-ich-mutterschaftsgeld-des-bundesamtes-fuer-soziale-sicherung-bekommen--125020", label: "Familienportal — Mutterschaftsgeld des Bundesamtes für Soziale Sicherung" },
    { url: "https://www.mutterschaftsgeld.de", label: "Mutterschaftsgeldstelle (Bundesamt für Soziale Sicherung)" },
  ] },
  kinderzuschlag: { kind: "official", url: "https://www.arbeitsagentur.de/familie-und-kinder/downloads-familie-und-kinder/formulare-kinderzuschlag", label: "Familienkasse — Formulare Kinderzuschlag", verifiedOn: "27.10.2026", extraLinks: [
    { url: "https://www.arbeitsagentur.de/datei/kiz1-antrag_ba036540.pdf", label: "KiZ 1 — Antrag auf Kinderzuschlag (PDF)" },
    { url: "https://www.arbeitsagentur.de/datei/kiz1-ank_ba035005.pdf", label: "KiZ 1-AnK — Anlage Kind (PDF)" },
    { url: "https://www.arbeitsagentur.de/datei/kiz1-ana_ba034980.pdf", label: "KiZ 1-AnA — Anlage Antragsteller(in) und Partner(in) (PDF)" },
    { url: "https://www.arbeitsagentur.de/datei/kiz1-hinweise_ba036545.pdf", label: "KiZ 1-H — Ausfüllhinweise (PDF)" },
    { url: "https://www.arbeitsagentur.de/familie-und-kinder/kinderzuschlag-verstehen/kiz-lotse", label: "Familienkasse — KiZ-Lotse" },
    { url: "https://www.arbeitsagentur.de/familie-und-kinder/eservices-fuer-familien", label: "Familienkasse — eServices" },
  ] },
  "krippengeld-bayern": { kind: "official", url: "https://www.zbfs.bayern.de/familienleistungen/krippengeld/", label: "ZBFS Bayern — Krippengeld", verifiedOn: "27.10.2026", extraLinks: [
    { url: "https://www.zbfs.bayern.de/familienleistungen/krippengeld/papierantrag/", label: "ZBFS Bayern — Krippengeld Papierantrag" },
  ] },
  "wirtschaftliche-jugendhilfe": { kind: "local", url: "https://verwaltung.bund.de/leistungsverzeichnis/de/leistung/99107007010000", label: "Verwaltungsportal des Bundes — Leistungsbeschreibung (Kostenbeitrag Kindertagesbetreuung)" },
  hauptantrag: { kind: "official", url: "https://www.arbeitsagentur.de/datei/antrag-sgb2_ba042689.pdf", label: "BA · HA · 10/2026 (PDF)", verifiedOn: "28.10.2026", extraLinks: [
    { url: "https://www.arbeitsagentur.de/grundsicherung/ausfuellhinweise", label: "BA · Ausfüllhinweise" },
    { url: "https://jobcenter.digital", label: "jobcenter.digital" },
    { url: "https://www.arbeitsagentur.de/grundsicherung-loest-buergergeld-ab", label: "BA · Grundsicherungsgeld / Bürgergeld" },
  ] },
  weiterbewilligung: { kind: "official", url: "https://www.arbeitsagentur.de/datei/weiterbewilligung-sgb2_ba042699.pdf", label: "BA · WBA · 10/2026 (PDF)", verifiedOn: "28.10.2026", extraLinks: [
    { url: "https://www.arbeitsagentur.de/grundsicherung/ausfuellhinweise", label: "BA · Ausfüllhinweise" },
    { url: "https://jobcenter.digital/weiterbewilligungsantrag", label: "jobcenter.digital · WBA" },
  ] },
  "anlage-kdu": { kind: "official", url: "https://www.arbeitsagentur.de/datei/anlagekdu_ba032980.pdf", label: "BA · KDU · 10/2026 (PDF)", verifiedOn: "28.10.2026", extraLinks: [
    { url: "https://www.arbeitsagentur.de/grundsicherung/ausfuellhinweise", label: "BA · Ausfüllhinweise" },
    { url: "https://jobcenter.digital", label: "jobcenter.digital" },
  ] },
  "anlage-ek": { kind: "official", url: "https://www.arbeitsagentur.de/datei/anlageek_ba032960.pdf", label: "BA · EK · 10/2026 (PDF)", verifiedOn: "28.10.2026", extraLinks: [{ url: "https://www.arbeitsagentur.de/grundsicherung/ausfuellhinweise", label: "BA · Ausfüllhinweise" }, { url: "https://jobcenter.digital", label: "jobcenter.digital" }] },
  "anlage-vm": { kind: "official", url: "https://www.arbeitsagentur.de/datei/anlagevm_ba033055.pdf", label: "BA · VM · 10/2026 (PDF)", verifiedOn: "28.10.2026", extraLinks: [{ url: "https://www.arbeitsagentur.de/grundsicherung/ausfuellhinweise", label: "BA · Ausfüllhinweise" }, { url: "https://jobcenter.digital", label: "jobcenter.digital" }] },
  "anlage-ki": { kind: "official", url: "https://www.arbeitsagentur.de/datei/anlageki_ba033000.pdf", label: "BA · KI · 10/2026 (PDF)", verifiedOn: "28.10.2026", extraLinks: [{ url: "https://www.arbeitsagentur.de/grundsicherung/ausfuellhinweise", label: "BA · Ausfüllhinweise" }, { url: "https://jobcenter.digital", label: "jobcenter.digital" }] },
  "anlage-wep": { kind: "official", url: "https://www.arbeitsagentur.de/datei/anlagewep_ba033100.pdf", label: "BA · WEP · 10/2026 (PDF)", verifiedOn: "28.10.2026", extraLinks: [{ url: "https://www.arbeitsagentur.de/grundsicherung/ausfuellhinweise", label: "BA · Ausfüllhinweise" }, { url: "https://jobcenter.digital", label: "jobcenter.digital" }] },
  "anlage-eks": { kind: "official", url: "https://www.arbeitsagentur.de/datei/anlageeks_ba033540.pdf", label: "BA · EKS · 10/2026 (PDF)", verifiedOn: "28.10.2026", extraLinks: [{ url: "https://www.arbeitsagentur.de/datei/hinweis-selbstaendige_ba033025.pdf", label: "BA · Ausfüllhinweise EKS · 10/2026 (PDF)" }, { url: "https://jobcenter.digital", label: "jobcenter.digital" }] },
  "anlage-sv": { kind: "official", url: "https://www.arbeitsagentur.de/datei/anlagesv_ba033005.pdf", label: "BA · SV · 10/2026 (PDF)", verifiedOn: "28.10.2026", extraLinks: [{ url: "https://www.arbeitsagentur.de/arbeitslos-arbeit-finden/downloads-arbeitslos-arbeit-finden", label: "BA · SGB II · Formulare / Merkblätter" }, { url: "https://jobcenter.digital", label: "jobcenter.digital" }] },
  "anlage-bb": { kind: "official", url: "https://www.arbeitsagentur.de/datei/anlagebb_ba032985.pdf", label: "BA · BB · 10/2026 (PDF)", verifiedOn: "28.10.2026", extraLinks: [{ url: "https://www.arbeitsagentur.de/arbeitslos-arbeit-finden/downloads-arbeitslos-arbeit-finden", label: "BA · SGB II · Formulare / Hinweise" }, { url: "https://jobcenter.digital", label: "jobcenter.digital" }] },
  "anlage-ve": { kind: "official", url: "https://www.arbeitsagentur.de/datei/anlageve_ba033130.pdf", label: "BA · VE · 10/2026 (PDF)", verifiedOn: "28.10.2026", extraLinks: [{ url: "https://www.arbeitsagentur.de/arbeitslos-arbeit-finden/downloads-arbeitslos-arbeit-finden", label: "BA · SGB II · Formulare / Hinweise" }, { url: "https://jobcenter.digital", label: "jobcenter.digital" }] },
  "anlage-hg": { kind: "official", url: "https://www.arbeitsagentur.de/datei/anlagehg_ba032950.pdf", label: "BA · HG · 10/2026 (PDF)", verifiedOn: "28.10.2026", extraLinks: FINAL_BA_LINKS },
  "anlage-meb": { kind: "official", url: "https://www.arbeitsagentur.de/datei/anlagemeb_ba032955.pdf", label: "BA · MEB / Ärztliche Bescheinigung · 10/2026 (PDF)", verifiedOn: "28.10.2026", extraLinks: FINAL_BA_LINKS },
  "anlage-uf": { kind: "official", url: "https://www.arbeitsagentur.de/datei/anlageuf_ba032970.pdf", label: "BA · UF · 10/2026 (PDF)", verifiedOn: "28.10.2026", extraLinks: [...FINAL_BA_LINKS, { url: "https://www.arbeitsagentur.de/datei/anlagese_ba032975.pdf", label: "BA · SE · 10/2026 (PDF)" }] },
  "anlage-se": { kind: "official", url: "https://www.arbeitsagentur.de/datei/anlagese_ba032975.pdf", label: "BA · SE / UF · 10/2026 (PDF)", verifiedOn: "28.10.2026", extraLinks: FINAL_BA_LINKS },
  "anlage-uh1": { kind: "official", url: "https://www.arbeitsagentur.de/datei/anlageuh1_ba032990.pdf", label: "BA · UH1 · 10/2026 (PDF)", verifiedOn: "28.10.2026", extraLinks: FINAL_BA_LINKS },
  "anlage-uh2": { kind: "official", url: "https://www.arbeitsagentur.de/datei/anlageuh2_ba032995.pdf", label: "BA · UH2 · 10/2026 (PDF)", verifiedOn: "28.10.2026", extraLinks: FINAL_BA_LINKS },
  "anlage-uh3": { kind: "official", url: "https://www.arbeitsagentur.de/datei/anlageuh3_ba033050.pdf", label: "BA · UH3 · 10/2026 (PDF)", verifiedOn: "28.10.2026", extraLinks: FINAL_BA_LINKS },
  nichterreichbarkeit: { kind: "official", url: "https://www.arbeitsagentur.de/datei/anfrage-ortsabwesenheit_ba147389.pdf", label: "BA · ANE · 05/2026 (PDF)", verifiedOn: "28.10.2026", extraLinks: [{ url: "https://www.arbeitsagentur.de/grundsicherung/pflichten-verstehen-und-beachten/abwesenheit-erreichbarkeit", label: "BA · Erreichbarkeit" }, ...FINAL_BA_LINKS] },
  antragsruecknahme: { kind: "official", url: "https://www.arbeitsagentur.de/datei/erklaerung-der-antragsruecknahme_ba053139.pdf", label: "BA · Antragsrücknahme · 07/2026 (PDF)", verifiedOn: "28.10.2026", extraLinks: FINAL_BA_LINKS },
  arbeitsbescheinigung: { kind: "official", url: "https://www.arbeitsagentur.de/datei/arbeitsbescheinigung_ba013140.pdf", label: "BA · Arbeitsbescheinigung §312 SGB III · 08/2023 (PDF)", verifiedOn: "28.10.2026", extraLinks: [{ url: "https://www.arbeitsagentur.de/unternehmen/personalfragen/bea", label: "BA · BEA · Arbeitgeber" }, { url: "https://www.arbeitsagentur.de/datei/einkommensbescheinigung_ba032965.pdf", label: "BA · Einkommensbescheinigung SGB II · 10/2026 (PDF)" }, { url: BA_INDEX, label: "BA · Formulare / Hinweise" }] },
  wohngeld: { kind: "local" },
  arbeitslosengeld: { kind: "official", url: "https://www.arbeitsagentur.de", label: "Bundesagentur für Arbeit" },
  krankenkasse: { kind: "local" },
  steuerklassenwechsel: { kind: "official", url: "https://www.elster.de", label: "ELSTER (Finanzverwaltung)" },
  "anerkennung-navigator": { kind: "local" },
  bafoeg: { kind: "official", url: "https://www.xn--bafg-7qa.de/bafoeg/de/antrag-stellen/alle-antragsformulare/alle-antragsformulare_node.html", label: "BAföG.de · Formblätter", verifiedOn: "28.10.2026" },
  "schueler-bafoeg": { kind: "official", url: "https://www.xn--bafg-7qa.de/bafoeg/de/antrag-stellen/alle-antragsformulare/alle-antragsformulare_node.html", label: "BAföG.de · Formblätter", verifiedOn: "28.10.2026" },
  integrationskurs: { kind: "official", url: "https://www.bamf.de/SharedDocs/Anlagen/DE/Integration/Integrationskurse/Kursteilnehmer/AntraegeAlle/630-007_antrag-zulassung-integrationskurs-ausl_pdf.html", label: "BAMF · 630.007", verifiedOn: "28.10.2026" },
  grundsicherung: { kind: "local", url: "https://www.bmas.de/DE/Soziales/Sozialhilfe/Leistungen-fuer-den-Lebensunterhalt/Rundschreiben-zur-Grundsicherung/rundschreiben-zur-grundsicherung-art.html", verifiedOn: "28.10.2026" },
  fuehrungszeugnis: { kind: "official", url: "https://www.fuehrungszeugnis.bund.de/", label: "Bundesamt für Justiz", verifiedOn: "28.10.2026" },
  kirchenaustritt: { kind: "local", url: "https://verwaltung.bund.de/leistungsverzeichnis/de/leistung/99073001022000", verifiedOn: "28.10.2026" },
  nationalvisum: { kind: "official", url: "https://www.auswaertiges-amt.de/de/service/visa-und-aufenthalt/auslandsportal", label: "Auslandsportal (Auswärtiges Amt)" },
  aufenthaltstitel: { kind: "local" },
  niederlassungserlaubnis: { kind: "local" },
  verpflichtungserklaerung: { kind: "local" },
};

export function getGuideSource(slug: string): GuideSource {
  return GUIDE_SOURCES[slug] ?? { kind: "local" };
}
