/**
 * Per-visa Bewerbungs-Mappe konfiguracija.
 * Mapira VISA_DATENBLATT_META ključeve na (visaType, paragraph, checklist).
 */

export interface VisaMappeMeta {
  visaType: string;        // za naslovnicu
  paragraphSection: string; // npr "§ 18g"
  /** Lista dokumenata koji se nose na termin */
  checklist: string[];
  fileName: string;
}

const COMMON_DOCS = [
  "Reisepass (Pasos) — original + kopija (vazi min. 1 godinu)",
  "2 biometrijske fotografije (35x45 mm, max 6 mjeseci stare)",
  "Antragsformular potpisan (popunjen na ovom Datenblattu kao podsjetnik)",
  "Lebenslauf (CV) na njemackom, tabelarno",
  "Krankenversicherung — dokaz o zdravstvenom osiguranju za period boravka",
  "Wohnraumnachweis — dokaz o stanu u DE (Mietvertrag ili Bestaetigung)",
  "Taksa za vizu (75 EUR — uplata na licu mjesta ili unaprijed)",
];

export const VISA_MAPPE_META: Record<string, VisaMappeMeta> = {
  visaWork1: {
    visaType: "Aufenthaltserlaubnis - Beschaeftigung",
    paragraphSection: "§ 18 / § 18a / § 18b",
    fileName: "BalkanLink-Bewerbungs-Mappe-Beschaeftigung.pdf",
    checklist: [
      ...COMMON_DOCS,
      "Arbeitsvertrag (radni ugovor) potpisan od poslodavca",
      "EzB (Erklaerung zum Beschaeftigungsverhaeltnis) — popunjen od poslodavca",
      "Anerkennung der Berufsqualifikation (Anabin / ZAB) — za §18a/§18b",
      "Vorabzustimmung der Bundesagentur fuer Arbeit (ako trazena)",
      "Diplome i prevodi sudski ovjereni (Berufsausbildung / Studij)",
      "Westbalkan §26.2 BeschV: bez priznavanja, ali EzB obavezna",
    ],
  },
  visaWork2: {
    visaType: "Aufenthaltserlaubnis - Beschaeftigung (EzB)",
    paragraphSection: "§ 18 / § 18a / § 18b",
    fileName: "BalkanLink-Bewerbungs-Mappe-EzB.pdf",
    checklist: [
      ...COMMON_DOCS,
      "Arbeitsvertrag potpisan",
      "EzB popunjen od poslodavca (preuzeo si vec popunjen iz BalkanLink-a)",
      "Anabin / ZAB potvrda o priznavanju kvalifikacija",
      "Posljednji platni listici poslodavca (3 mjeseca)",
      "Lohnbescheinigung — potvrda o zaradi",
    ],
  },
  visaBluecard: {
    visaType: "Blaue Karte EU",
    paragraphSection: "§ 18g",
    fileName: "BalkanLink-Bewerbungs-Mappe-BlueCard.pdf",
    checklist: [
      ...COMMON_DOCS,
      "Hochschulabschluss (Diploma) — ovjeren prevod + Apostille",
      "Anabin-ID (provjera diplome u nemackoj bazi)",
      "ZAB Zeugnisbewertung (ako diploma nije H+ priznata)",
      "Arbeitsvertrag — bruto godisnje min. 45.300 EUR (2026) ili 41.041,80 EUR (Mangelberuf)",
      "EzB popunjen od poslodavca",
      "Za IT bez diplome: dokaz o 3+ godine relevantnog iskustva",
    ],
  },
  visaStudy: {
    visaType: "Studium",
    paragraphSection: "§ 16b",
    fileName: "BalkanLink-Bewerbungs-Mappe-Studium.pdf",
    checklist: [
      ...COMMON_DOCS,
      "Zulassungsbescheid (prijem na fakultet) — original + prevod",
      "Sperrkonto potvrda — min. 11.904 EUR (2026, 992 EUR/mj)",
      "Hochschulreife (Diploma SS) + prevod, ako trazeno",
      "Sprachzertifikat (TestDaF B2/C1, DSH, IELTS, TOEFL)",
      "Studienkolleg potvrda (ako diploma nije H+ direktno)",
      "Stipendije / Verpflichtungserklaerung — ako nema Sperrkonta",
      "Motivationsschreiben (motivaciono pismo — vec u ovoj Mappi)",
    ],
  },
  visaFamily: {
    visaType: "Familienzusammenfuehrung",
    paragraphSection: "§ 28 / § 29 / § 30 / § 32",
    fileName: "BalkanLink-Bewerbungs-Mappe-Familie.pdf",
    checklist: [
      ...COMMON_DOCS,
      "Heiratsurkunde (Vjencani list) — original + prevod + Apostille",
      "Geburtsurkunde djece (rodni list) — original + prevod + Apostille",
      "Pasos i Aufenthaltstitel partnera/roditelja u DE (kopija)",
      "Meldebescheinigung partnera (prijava prebivalista u DE)",
      "Dokaz o sredstvima za izdrzavanje (Gehaltsbescheinigung, 3 mjeseca)",
      "Sprachzertifikat A1 Goethe (za supruznika, ako trazeno)",
      "Wohnraumnachweis — stan dovoljan za sve clanove porodice",
    ],
  },
  visaPermanent1: {
    visaType: "Niederlassungserlaubnis",
    paragraphSection: "§ 9 / § 9a / § 9c",
    fileName: "BalkanLink-Bewerbungs-Mappe-Niederlassung.pdf",
    checklist: [
      ...COMMON_DOCS,
      "Aufenthaltstitel posljednjih 5 (ili 3 za §9a) godina — kopije",
      "Rentenversicherung Nachweis — 60 mjeseci uplate (ili 36 za §9a)",
      "B1 Sprachzertifikat (Goethe / telc) — Allgemein",
      "Einbuergerungstest ILI Leben in Deutschland test (33+ poena)",
      "Gehaltsbescheinigungen posljednjih 6 mjeseci",
      "Steuerbescheid posljednjih 3 godine",
      "Wohnraumnachweis (Mietvertrag + Groesse stana)",
      "Ako Fachkraft sa Hochschulabschluss: §9a - 21 mjesec ekstra",
    ],
  },
  visaPermanent2: {
    visaType: "Niederlassungserlaubnis - Blue Card / Fachkraft",
    paragraphSection: "§ 18c / § 9a",
    fileName: "BalkanLink-Bewerbungs-Mappe-Niederlassung-Fachkraft.pdf",
    checklist: [
      ...COMMON_DOCS,
      "Blue Card / §18b Aufenthaltstitel — min. 21 mjesec (B1) ili 27 mj (A1)",
      "Hochschulabschluss + Anabin/ZAB",
      "Arbeitsvertrag (jos uvijek aktivan, kvalifikovano radno mjesto)",
      "B1 Sprachzertifikat (za 21 mj varijantu) ILI A1 (za 27 mj)",
      "Rentenversicherung Nachweis — min. 21 / 27 mjeseci",
      "Gehaltsbescheinigungen posljednjih 6 mjeseci",
      "Steuerbescheid (posljednji)",
    ],
  },
};
