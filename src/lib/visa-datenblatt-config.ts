/**
 * Per-form configuration for visa Datenblatt PDF generation.
 *
 * Svaka forma ima:
 *  - reasonNote — zašto ne pravimo 1:1 popunjen službeni PDF
 *  - usageNote  — kako korisnik koristi Datenblatt
 *  - mapExtras  — pretvara form-specific podatke u DatenblattSection[]
 *  - officialPdfUrl — link na original (ako postoji)
 *  - fileName   — preuzimanje
 */
import type { DatenblattSection } from "@/lib/visa-datenblatt-pdf";

type AnyExtras = Record<string, string>;

export interface VisaDatenblattMeta {
  formTitle: string;
  formSubtitle?: string;
  reasonNote: string;
  usageNote: string;
  fileName: string;
  officialPdfUrl?: string;
  officialPdfLabel?: string;
  mapExtras: (f: AnyExtras) => DatenblattSection[];
}

const REASON_BAMF =
  "Službeni BAMF obrazac „Antrag auf Erteilung eines Aufenthaltstitels“ je XFA forma " +
  "(svaka Ausländerbehörde koristi vlastitu varijantu — Düsseldorf, Berlin, München…). " +
  "XFA forme se ne mogu pouzdano popuniti u browseru. Zato BalkanLink generiše Datenblatt sa svim " +
  "tvojim podacima koje samo prepišeš u službeni obrazac na šalteru ili odštampaš i ponesiš sa sobom.";

const USAGE_DEFAULT =
  "Odštampaj Datenblatt i ponesi ga na šalter Ausländerbehörde. Tamo službenik diktira polja službenog obrasca — " +
  "ti samo čitaš sa Datenblatta. Brže, bez panike, bez prevodioca.";

export const VISA_DATENBLATT_META: Record<string, VisaDatenblattMeta> = {
  visaWork1: {
    formTitle: "Antrag auf Aufenthaltserlaubnis — Beschäftigung (§ 18 AufenthG)",
    formSubtitle: "Datenblatt za radnu dozvolu (Westbalkan & opšti režim)",
    reasonNote: REASON_BAMF,
    usageNote: USAGE_DEFAULT,
    fileName: "BalkanLink-Datenblatt-Aufenthaltstitel-Beschaeftigung.pdf",
    officialPdfUrl: "https://www.bamf.de/SharedDocs/Anlagen/DE/AufenthaltAsyl/Aufenthaltstitel/antrag-aufenthaltstitel.pdf",
    officialPdfLabel: "Original (BAMF)",
    mapExtras: (f) => [
      {
        title: "D. Beschäftigung (Posao)",
        rows: [
          { label: "Arbeitgeber (Poslodavac)", value: f.arbeitgeber },
          { label: "Anschrift Arbeitgeber", value: f.arbeitgeberAdresse },
          { label: "Position / Tätigkeit", value: [f.position, f.taetigkeit].filter(Boolean).join(" — ") },
          { label: "Brutto Jahresgehalt (EUR)", value: f.jahresgehalt },
          { label: "Brutto Monatsgehalt (EUR)", value: f.monatsgehalt },
          { label: "Wochenstunden", value: f.wochenstunden },
        ],
      },
      {
        title: "E. Vorabzustimmung BA & Anerkennung",
        rows: [
          { label: "Vorabzustimmung BA — Kundennr.", value: f.vorabzustimmungAA },
          { label: "Datum Vorabzustimmung", value: f.vorabzustimmungDatum },
          { label: "Anerkennung / Anabin-ID", value: f.anerkennung },
          { label: "Westbalkan-Regelung (§ 26 BeschV)", value: f.westbalkanRegelung },
        ],
      },
      {
        title: "F. Einreise & Versicherung",
        rows: [
          { label: "Erste Einreise nach DE", value: f.erstesEinreiseDatum },
          { label: "Geplanter Arbeitsbeginn", value: f.einreiseDatum },
          { label: "Krankenkasse", value: f.krankenversicherung },
          { label: "Versicherten-Nr.", value: f.krankenversicherungNr },
        ],
      },
      { title: "G. Bemerkungen", rows: [{ label: "Bemerkungen", value: f.bemerkungen }] },
    ],
  },

  visaWork2: {
    formTitle: "Erklärung zum Beschäftigungsverhältnis (EzB) — § 39 AufenthG",
    formSubtitle: "Datenblatt — popunjava poslodavac u Njemačkoj",
    reasonNote:
      "BA obrazac „Erklärung zum Beschäftigungsverhältnis“ (146206) je flat printable PDF — nema interaktivnih " +
      "polja koja bi pdf-lib mogao popuniti. Zato BalkanLink generiše Datenblatt koji poslodavac koristi kao " +
      "predložak za prepisivanje u službeni obrazac (i potpis + pečat firme).",
    usageNote:
      "Pošalji Datenblatt poslodavcu (mejlom). On prepisuje podatke u službeni EzB obrazac, potpiše i ovjeri pečatom firme. " +
      "Ti onda predaješ EzB ambasadi uz zahtjev za vizu.",
    fileName: "BalkanLink-Datenblatt-EzB.pdf",
    officialPdfUrl: "https://www.arbeitsagentur.de/datei/erklaerung-zum-beschaeftigungsverhaeltnis_ba017345.pdf",
    officialPdfLabel: "Original EzB (BA)",
    mapExtras: (f) => [
      {
        title: "D. Arbeitgeber",
        rows: [
          { label: "Firma / Arbeitgeber", value: f.agName },
          { label: "Anschrift", value: f.agAdresse },
          { label: "Ansprechpartner", value: f.agAnsprechpartner },
          { label: "Telefon / E-Mail", value: [f.agTelefon, f.agEmail].filter(Boolean).join(" • ") },
          { label: "Branche / Betriebsgröße", value: [f.branche, f.betriebsgroesse].filter(Boolean).join(" — ") },
        ],
      },
      {
        title: "E. Tätigkeit & Arbeitsort",
        rows: [
          { label: "Tätigkeit", value: f.taetigkeit },
          { label: "Arbeitsort", value: f.arbeitsort },
        ],
      },
      {
        title: "F. Arbeitsverhältnis",
        rows: [
          { label: "Vertragsbeginn", value: f.vertragsbeginn },
          { label: "Vertragsende (befristet)", value: f.vertragsende },
          { label: "Befristet (ja/nein)", value: f.befristet },
          { label: "Wochenstunden", value: f.wochenstunden },
          { label: "Schichtarbeit (ja/nein)", value: f.schichtarbeit },
        ],
      },
      {
        title: "G. Vergütung",
        rows: [
          { label: "Brutto Monatsgehalt (EUR)", value: f.bruttoMonat },
          { label: "Brutto Stundenlohn (EUR)", value: f.bruttoStunde },
          { label: "Urlaubstage / Jahr", value: f.urlaubstage },
          { label: "Tarifvertrag", value: f.tarifvertrag },
        ],
      },
      { title: "H. Ort, Datum", rows: [{ label: "Ort, Datum", value: f.ortDatum }] },
    ],
  },

  visaBluecard: {
    formTitle: "Antrag — Blaue Karte EU (§ 18g AufenthG)",
    formSubtitle: "Datenblatt za EU Plavu kartu (visokokvalifikovani radnici)",
    reasonNote: REASON_BAMF,
    usageNote: USAGE_DEFAULT,
    fileName: "BalkanLink-Datenblatt-BlaueKarte.pdf",
    officialPdfUrl: "https://www.bamf.de/SharedDocs/Anlagen/DE/AufenthaltAsyl/Aufenthaltstitel/antrag-aufenthaltstitel.pdf",
    officialPdfLabel: "Original (BAMF)",
    mapExtras: (f) => [
      {
        title: "D. Hochschulabschluss (Diploma)",
        rows: [
          { label: "Hochschule / Univerzitet", value: f.hochschule },
          { label: "Studiengang", value: f.studiengang },
          { label: "Abschlussdatum", value: f.abschlussdatum },
          { label: "Anabin-Bewertung", value: f.anabinBewertung },
        ],
      },
      {
        title: "E. Beschäftigung",
        rows: [
          { label: "Arbeitgeber", value: f.arbeitgeber },
          { label: "Anschrift Arbeitgeber", value: f.arbeitgeberAdresse },
          { label: "Position", value: f.position },
          { label: "Brutto Jahresgehalt (EUR)", value: f.jahresgehalt },
          { label: "Mangelberuf (MINT/IT/Med)", value: f.mangelberuf },
        ],
      },
      {
        title: "F. Einreise & Versicherung",
        rows: [
          { label: "Geplanter Arbeitsbeginn", value: f.einreiseDatum },
          { label: "Krankenversicherung", value: f.krankenversicherung },
        ],
      },
      { title: "G. Bemerkungen", rows: [{ label: "Bemerkungen", value: f.bemerkungen }] },
    ],
  },

  visaFamily: {
    formTitle: "Antrag — Familiennachzug (§§ 27-36 AufenthG)",
    formSubtitle: "Datenblatt za spajanje porodice",
    reasonNote: REASON_BAMF,
    usageNote: USAGE_DEFAULT,
    fileName: "BalkanLink-Datenblatt-Familiennachzug.pdf",
    officialPdfUrl: "https://www.bamf.de/SharedDocs/Anlagen/DE/AufenthaltAsyl/Aufenthaltstitel/antrag-aufenthaltstitel.pdf",
    officialPdfLabel: "Original (BAMF)",
    mapExtras: (f) => [
      {
        title: "D. Stammberechtigte Person (član porodice u DE)",
        rows: [
          { label: "Name, Vornamen", value: [f.stammName, f.stammVornamen].filter(Boolean).join(" ") },
          { label: "Geburtsdatum", value: f.stammGeburtsdatum },
          { label: "Staatsangehörigkeit", value: f.stammStaats },
          { label: "Aufenthaltstitel (vrsta)", value: f.stammTitel },
          { label: "Anschrift in DE", value: f.stammAdresse },
          { label: "Verhältnis (Ehepartner/Kind/Eltern)", value: f.verhaeltnis },
        ],
      },
      {
        title: "E. Eheschließung / Geburt",
        rows: [
          { label: "Eheschließung — Datum / Ort", value: [f.eheDatum, f.eheOrt].filter(Boolean).join(" — ") },
          { label: "A1 Sprachzeugnis (Datum/Inst.)", value: f.a1Zeugnis },
        ],
      },
      {
        title: "F. Lebensunterhalt",
        rows: [
          { label: "Einkommen Stammberechtigter (EUR/Monat)", value: f.einkommenStamm },
          { label: "Wohnung — m² / Anzahl Räume", value: [f.wohnflaeche, f.zimmer].filter(Boolean).join(" m² / ") },
          { label: "Krankenversicherung", value: f.krankenversicherung },
        ],
      },
      { title: "G. Bemerkungen", rows: [{ label: "Bemerkungen", value: f.bemerkungen }] },
    ],
  },

  visaStudy: {
    formTitle: "Antrag — Aufenthaltserlaubnis Studium (§ 16b AufenthG)",
    formSubtitle: "Datenblatt za studentsku vizu",
    reasonNote: REASON_BAMF,
    usageNote: USAGE_DEFAULT,
    fileName: "BalkanLink-Datenblatt-Studium.pdf",
    officialPdfUrl: "https://www.bamf.de/SharedDocs/Anlagen/DE/AufenthaltAsyl/Aufenthaltstitel/antrag-aufenthaltstitel.pdf",
    officialPdfLabel: "Original (BAMF)",
    mapExtras: (f) => [
      {
        title: "D. Hochschule (Univerzitet u DE)",
        rows: [
          { label: "Hochschule", value: f.hochschule },
          { label: "Studiengang", value: f.studiengang },
          { label: "Zulassungsbescheid — Datum", value: f.zulassungDatum },
          { label: "Studienbeginn", value: f.studienbeginn },
          { label: "Studiendauer (Sem.)", value: f.studiendauer },
        ],
      },
      {
        title: "E. Finanzierung (Sperrkonto / Bürgschaft)",
        rows: [
          { label: "Sperrkonto Bank", value: f.sperrkontoBank },
          { label: "Sperrkonto Betrag (EUR)", value: f.sperrkontoBetrag },
          { label: "Bürge (Name, Adresse)", value: f.buerge },
          { label: "Stipendium (falls)", value: f.stipendium },
        ],
      },
      {
        title: "F. Sprachkenntnisse",
        rows: [
          { label: "Deutschzertifikat (DSH/TestDaF)", value: f.deutschzertifikat },
          { label: "Englischzertifikat (TOEFL/IELTS)", value: f.englischzertifikat },
        ],
      },
      { title: "G. Bemerkungen", rows: [{ label: "Bemerkungen", value: f.bemerkungen }] },
    ],
  },

  visaPermanent1: {
    formTitle: "Niederlassungserlaubnis (§ 9 AufenthG)",
    formSubtitle: "Datenblatt za stalni boravak",
    reasonNote: REASON_BAMF,
    usageNote: USAGE_DEFAULT,
    fileName: "BalkanLink-Datenblatt-Niederlassungserlaubnis.pdf",
    officialPdfUrl: "https://www.bamf.de/SharedDocs/Anlagen/DE/AufenthaltAsyl/Aufenthaltstitel/antrag-aufenthaltstitel.pdf",
    officialPdfLabel: "Original (BAMF)",
    mapExtras: (f) => [
      {
        title: "D. Aufenthaltsdauer & Titel",
        rows: [
          { label: "Erste Einreise nach DE", value: f.ersteEinreise },
          { label: "Aktueller Aufenthaltstitel", value: f.aktuellerTitel },
          { label: "Gültig seit", value: f.titelSeit },
          { label: "Ununterbrochene Jahre in DE", value: f.jahreInDe },
        ],
      },
      {
        title: "E. Lebensunterhalt & Rente",
        rows: [
          { label: "Beschäftigung — Arbeitgeber", value: f.arbeitgeber },
          { label: "Brutto Monatsgehalt (EUR)", value: f.bruttoMonat },
          { label: "Rentenversicherung — Monate eingezahlt", value: f.rentenmonate },
        ],
      },
      {
        title: "F. Integration",
        rows: [
          { label: "Deutschzertifikat (B1)", value: f.deutschzertifikat },
          { label: "Einbürgerungstest / LiD", value: f.lidTest },
          { label: "Wohnung — m²", value: f.wohnflaeche },
        ],
      },
      { title: "G. Bemerkungen", rows: [{ label: "Bemerkungen", value: f.bemerkungen }] },
    ],
  },

  visaPermanent2: {
    formTitle: "Daueraufenthalt-EU (§ 9a AufenthG)",
    formSubtitle: "Datenblatt za EU dugotrajni boravak",
    reasonNote: REASON_BAMF,
    usageNote: USAGE_DEFAULT,
    fileName: "BalkanLink-Datenblatt-DaueraufenthaltEU.pdf",
    officialPdfUrl: "https://www.bamf.de/SharedDocs/Anlagen/DE/AufenthaltAsyl/Aufenthaltstitel/antrag-aufenthaltstitel.pdf",
    officialPdfLabel: "Original (BAMF)",
    mapExtras: (f) => [
      {
        title: "D. Aufenthaltsdauer (5 godina pravilo)",
        rows: [
          { label: "Erste Einreise nach DE", value: f.ersteEinreise },
          { label: "Aktueller Aufenthaltstitel", value: f.aktuellerTitel },
          { label: "Ununterbrochene Jahre", value: f.jahreInDe },
          { label: "Auslandsaufenthalte > 6 Monate?", value: f.auslandLang },
        ],
      },
      {
        title: "E. Lebensunterhalt",
        rows: [
          { label: "Arbeitgeber", value: f.arbeitgeber },
          { label: "Brutto Monatsgehalt (EUR)", value: f.bruttoMonat },
          { label: "Krankenversicherung", value: f.krankenversicherung },
        ],
      },
      {
        title: "F. Integration",
        rows: [
          { label: "Deutschzertifikat (B1)", value: f.deutschzertifikat },
          { label: "LiD-Test", value: f.lidTest },
          { label: "Wohnung — m²", value: f.wohnflaeche },
        ],
      },
      { title: "G. Bemerkungen", rows: [{ label: "Bemerkungen", value: f.bemerkungen }] },
    ],
  },
};
