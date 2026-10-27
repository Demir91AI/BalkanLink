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
  anmeldung: { kind: "local" },
  "steuer-id": { kind: "official", url: "https://www.bzst.de", label: "Bundeszentralamt für Steuern" },
  fuehrerschein: { kind: "local" },
  fahrzeugzulassung: { kind: "local" },
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
  kinderzuschlag: { kind: "official", url: "https://www.arbeitsagentur.de/kinderzuschlag", label: "Familienkasse — Kinderzuschlag (BA)" },
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
