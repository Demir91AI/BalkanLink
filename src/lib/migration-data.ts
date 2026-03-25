import type { Language } from "./translations";
import { localizeMigrationCountries } from "./migration-localization";

// Data for "Nach Deutschland kommen" section — per country, per category

export interface MigrationCategory {
  key: string;
  icon: string; // lucide icon name
  visaRequired: boolean | "conditional";
  legalBasis: string;
  requirements: string[];
  steps: string[];
  officialLinks: { label: string; url: string }[];
  notes?: string[];
}

export interface CountryMigrationData {
  code: string;
  flag: string;
  isEU: boolean;
  categories: MigrationCategory[];
}

const WORK_EU: MigrationCategory = {
  key: "work",
  icon: "Briefcase",
  visaRequired: false,
  legalBasis: "EU-Freizügigkeitsgesetz (FreizügG/EU)",
  requirements: [
    "Gültiger Reisepass oder Personalausweis",
    "Kein Visum erforderlich",
    "Freizügigkeit innerhalb der EU",
    "Anmeldung beim Einwohnermeldeamt innerhalb von 14 Tagen",
  ],
  steps: [
    "Einreise nach Deutschland mit gültigem Ausweis",
    "Wohnung finden und Mietvertrag abschließen",
    "Anmeldung beim Einwohnermeldeamt (Bürgerbüro)",
    "Steuer-ID wird automatisch zugesandt",
    "Arbeit aufnehmen – keine Arbeitserlaubnis nötig",
    "Krankenversicherung über den Arbeitgeber",
  ],
  officialLinks: [
    { label: "Freizügigkeitsgesetz – EU-Bürger", url: "https://www.auswaertiges-amt.de/de/service/visa-und-aufenthalt" },
  ],
};

const WORK_WESTBALKAN = (country: string): MigrationCategory => ({
  key: "work",
  icon: "Briefcase",
  visaRequired: true,
  legalBasis: "Westbalkanregelung (§ 26 Abs. 2 BeschV)",
  requirements: [
    "Konkretes Jobangebot eines deutschen Arbeitgebers",
    "Zustimmung der Bundesagentur für Arbeit",
    "Keine Anerkennung der Qualifikation zwingend nötig",
    "Kein Bezug von Leistungen nach dem SGB II in den letzten 24 Monaten",
    "Gültiger Reisepass",
    "Visum bei der deutschen Botschaft beantragen",
  ],
  steps: [
    "Arbeitsvertrag oder verbindliches Jobangebot erhalten",
    "Arbeitgeber stellt Antrag bei der Bundesagentur für Arbeit",
    "Nach Zustimmung: Visum bei der deutschen Botschaft beantragen",
    "Einreise nach Deutschland",
    "Anmeldung beim Einwohnermeldeamt",
    "Aufenthaltserlaubnis bei der Ausländerbehörde beantragen",
  ],
  officialLinks: [
    { label: "Westbalkanregelung – Bundesagentur für Arbeit", url: "https://www.arbeitsagentur.de/unternehmen/fachkraefte-ausland/westbalkanregelung" },
    { label: "Auswärtiges Amt – Visa & Aufenthalt", url: "https://www.auswaertiges-amt.de/de/service/visa-und-aufenthalt" },
  ],
});

const EDUCATION_EU: MigrationCategory = {
  key: "education",
  icon: "GraduationCap",
  visaRequired: false,
  legalBasis: "EU-Freizügigkeitsgesetz",
  requirements: [
    "Ausbildungsvertrag mit einem deutschen Betrieb",
    "Kein Visum erforderlich (EU-Bürger)",
    "Sprachkenntnisse empfohlen (B1/B2)",
    "Anmeldung beim Einwohnermeldeamt",
  ],
  steps: [
    "Ausbildungsplatz finden und Vertrag abschließen",
    "Einreise nach Deutschland",
    "Anmeldung beim Einwohnermeldeamt",
    "Berufsschule und Betrieb beginnen",
  ],
  officialLinks: [
    { label: "Make it in Germany – Ausbildung", url: "https://www.make-it-in-germany.com/de/visum-aufenthalt/arten/ausbildung" },
  ],
};

const EDUCATION_NONEU: MigrationCategory = {
  key: "education",
  icon: "GraduationCap",
  visaRequired: true,
  legalBasis: "§ 16a AufenthG – Berufsausbildung",
  requirements: [
    "Ausbildungsvertrag mit einem deutschen Betrieb",
    "Visum für Berufsausbildung erforderlich",
    "Sprachkenntnisse (oft B1/B2 Deutsch)",
    "Finanzierungsnachweis (Sperrkonto oder Verpflichtungserklärung)",
    "Gültiger Reisepass",
  ],
  steps: [
    "Ausbildungsplatz finden und Vertrag abschließen",
    "Visum bei der deutschen Botschaft beantragen",
    "Sprachnachweis vorlegen (z. B. Goethe-Zertifikat)",
    "Einreise nach Deutschland",
    "Anmeldung beim Einwohnermeldeamt",
    "Aufenthaltserlaubnis bei der Ausländerbehörde beantragen",
  ],
  officialLinks: [
    { label: "Make it in Germany – Ausbildung", url: "https://www.make-it-in-germany.com/de/visum-aufenthalt/arten/ausbildung" },
  ],
};

const STUDY_EU: MigrationCategory = {
  key: "study",
  icon: "BookOpen",
  visaRequired: false,
  legalBasis: "EU-Freizügigkeitsgesetz",
  requirements: [
    "Zulassung einer deutschen Hochschule",
    "Kein Visum erforderlich (EU-Bürger)",
    "Krankenversicherung",
    "Finanzierungsnachweis empfohlen",
  ],
  steps: [
    "Bewerbung an einer deutschen Hochschule",
    "Zulassungsbescheid erhalten",
    "Einreise und Anmeldung beim Einwohnermeldeamt",
    "Immatrikulation an der Hochschule",
  ],
  officialLinks: [
    { label: "Make it in Germany – Studium", url: "https://www.make-it-in-germany.com/de/visum-aufenthalt/arten/studium" },
  ],
};

const STUDY_NONEU: MigrationCategory = {
  key: "study",
  icon: "BookOpen",
  visaRequired: true,
  legalBasis: "§ 16b AufenthG – Studium",
  requirements: [
    "Zulassung einer deutschen Hochschule",
    "Visum für Studium erforderlich",
    "Finanzierungsnachweis (Sperrkonto: ca. 11.208 € / Jahr)",
    "Krankenversicherung",
    "Gültiger Reisepass",
  ],
  steps: [
    "Bewerbung an einer deutschen Hochschule (oder über uni-assist)",
    "Zulassungsbescheid erhalten",
    "Sperrkonto eröffnen und Finanzierung nachweisen",
    "Visum bei der deutschen Botschaft beantragen",
    "Einreise nach Deutschland",
    "Anmeldung beim Einwohnermeldeamt",
    "Aufenthaltserlaubnis bei der Ausländerbehörde beantragen",
    "Immatrikulation an der Hochschule",
  ],
  officialLinks: [
    { label: "Make it in Germany – Studium", url: "https://www.make-it-in-germany.com/de/visum-aufenthalt/arten/studium" },
  ],
};

const FSJ_EU: MigrationCategory = {
  key: "fsj",
  icon: "Heart",
  visaRequired: false,
  legalBasis: "Bundesfreiwilligendienstgesetz (BFDG) / Jugendfreiwilligendienstegesetz (JFDG)",
  requirements: [
    "Annahme bei einer Einsatzstelle (FSJ oder BFD)",
    "Kein Visum erforderlich (EU-Bürger)",
    "Mindestalter: 16 Jahre (FSJ) bzw. keine Altersgrenze (BFD)",
  ],
  steps: [
    "Einsatzstelle finden (z. B. über freiwilligendienste-kultur-bildung.de)",
    "Vereinbarung mit der Einsatzstelle abschließen",
    "Einreise und Anmeldung beim Einwohnermeldeamt",
    "Freiwilligendienst beginnen",
  ],
  officialLinks: [
    { label: "Bundesfreiwilligendienst", url: "https://www.bundesfreiwilligendienst.de" },
  ],
};

const FSJ_NONEU: MigrationCategory = {
  key: "fsj",
  icon: "Heart",
  visaRequired: true,
  legalBasis: "§ 19e AufenthG i.V.m. BFDG / JFDG",
  requirements: [
    "Annahme bei einer anerkannten Einsatzstelle",
    "Visum/Aufenthaltstitel erforderlich",
    "Gültiger Reisepass",
    "Ggf. Grundkenntnisse Deutsch",
  ],
  steps: [
    "Einsatzstelle finden und Vereinbarung abschließen",
    "Visum bei der deutschen Botschaft beantragen",
    "Einreise nach Deutschland",
    "Anmeldung beim Einwohnermeldeamt",
    "Aufenthaltserlaubnis bei der Ausländerbehörde beantragen",
    "Freiwilligendienst beginnen",
  ],
  officialLinks: [
    { label: "Bundesfreiwilligendienst", url: "https://www.bundesfreiwilligendienst.de" },
  ],
};

const RECOGNITION_EU: MigrationCategory = {
  key: "recognition",
  icon: "Award",
  visaRequired: false,
  legalBasis: "Berufsqualifikationsfeststellungsgesetz (BQFG)",
  requirements: [
    "Kein Visum erforderlich (EU-Bürger)",
    "Abschlussdokumente (beglaubigte Übersetzung)",
    "Antrag bei zuständiger Anerkennungsstelle",
    "Bei reglementierten Berufen (z. B. Arzt, Pflege): Anerkennung Pflicht",
    "Bei nicht-reglementierten Berufen: Anerkennung optional, aber vorteilhaft",
  ],
  steps: [
    "Zuständige Anerkennungsstelle über anabin oder anerkennung-in-deutschland.de finden",
    "Unterlagen zusammenstellen (Diplom, Zeugnisse, Übersetzungen)",
    "Antrag auf Anerkennung stellen",
    "Bescheid abwarten (ca. 3–4 Monate)",
    "Ggf. Anpassungsqualifizierung oder Kenntnisprüfung absolvieren",
  ],
  officialLinks: [
    { label: "Anerkennung in Deutschland", url: "https://www.anerkennung-in-deutschland.de" },
  ],
};

const RECOGNITION_NONEU: MigrationCategory = {
  key: "recognition",
  icon: "Award",
  visaRequired: "conditional",
  legalBasis: "BQFG / § 16d AufenthG (Anerkennung ausländischer Berufsqualifikationen)",
  requirements: [
    "Abschlussdokumente (beglaubigte Übersetzung)",
    "Antrag bei zuständiger Anerkennungsstelle",
    "Für reglementierte Berufe: Anerkennung Pflicht vor Arbeitsaufnahme",
    "Visum zur Anerkennung möglich (§ 16d AufenthG)",
    "Bei Westbalkanregelung: keine Anerkennung zwingend nötig",
  ],
  steps: [
    "Zuständige Stelle über anerkennung-in-deutschland.de ermitteln",
    "Unterlagen zusammenstellen und übersetzen lassen",
    "Antrag auf Anerkennung stellen (auch vom Ausland möglich)",
    "Bescheid abwarten",
    "Bei teilweiser Anerkennung: Anpassungsqualifizierung in Deutschland",
    "Ggf. Visum zur Anerkennung (§ 16d AufenthG) beantragen",
  ],
  officialLinks: [
    { label: "Anerkennung in Deutschland", url: "https://www.anerkennung-in-deutschland.de" },
    { label: "BMBF – Anerkennung", url: "https://www.anerkennung-in-deutschland.de" },
  ],
};

export const COUNTRIES: CountryMigrationData[] = [
  {
    code: "bih",
    flag: "🇧🇦",
    isEU: false,
    categories: [WORK_WESTBALKAN("bih"), EDUCATION_NONEU, STUDY_NONEU, FSJ_NONEU, RECOGNITION_NONEU],
  },
  {
    code: "srb",
    flag: "🇷🇸",
    isEU: false,
    categories: [WORK_WESTBALKAN("srb"), EDUCATION_NONEU, STUDY_NONEU, FSJ_NONEU, RECOGNITION_NONEU],
  },
  {
    code: "hr",
    flag: "🇭🇷",
    isEU: true,
    categories: [WORK_EU, EDUCATION_EU, STUDY_EU, FSJ_EU, RECOGNITION_EU],
  },
  {
    code: "me",
    flag: "🇲🇪",
    isEU: false,
    categories: [WORK_WESTBALKAN("me"), EDUCATION_NONEU, STUDY_NONEU, FSJ_NONEU, RECOGNITION_NONEU],
  },
  {
    code: "al",
    flag: "🇦🇱",
    isEU: false,
    categories: [WORK_WESTBALKAN("al"), EDUCATION_NONEU, STUDY_NONEU, FSJ_NONEU, RECOGNITION_NONEU],
  },
  {
    code: "xk",
    flag: "🇽🇰",
    isEU: false,
    categories: [WORK_WESTBALKAN("xk"), EDUCATION_NONEU, STUDY_NONEU, FSJ_NONEU, RECOGNITION_NONEU],
  },
  {
    code: "mk",
    flag: "🇲🇰",
    isEU: false,
    categories: [WORK_WESTBALKAN("mk"), EDUCATION_NONEU, STUDY_NONEU, FSJ_NONEU, RECOGNITION_NONEU],
  },
];

export const CATEGORY_KEYS = ["work", "education", "study", "fsj", "recognition"] as const;
export type CategoryKey = typeof CATEGORY_KEYS[number];

export function getMigrationCountries(language: Language): CountryMigrationData[] {
  return localizeMigrationCountries(language, COUNTRIES);
}
