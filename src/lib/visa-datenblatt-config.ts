/**
 * Per-form configuration for visa Datenblatt PDF generation.
 *
 * Svaka forma:
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

const join = (...parts: Array<string | undefined>) =>
  parts.filter((p) => p && String(p).trim()).join(" — ");

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
    officialPdfUrl: "https://service.berlin.de/dienstleistung/305249/",
    officialPdfLabel: "Original (BAMF)",
    mapExtras: (f) => [
      {
        title: "D. Beschäftigung (Posao)",
        rows: [
          { label: "Arbeitgeber (Poslodavac)", value: f.arbeitgeber },
          { label: "Anschrift Arbeitgeber", value: f.arbeitgeberAdresse },
          { label: "Position / Tätigkeit", value: join(f.position, f.taetigkeit) },
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
          { label: "Telefon / E-Mail", value: join(f.agTelefon, f.agEmail) },
          { label: "Branche / Betriebsgröße", value: join(f.branche, f.betriebsgroesse) },
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
    officialPdfUrl: "https://service.berlin.de/dienstleistung/305249/",
    officialPdfLabel: "Original (BAMF)",
    mapExtras: (f) => [
      {
        title: "D. Hochschulabschluss (Diploma)",
        rows: [
          { label: "Hochschule / Univerzitet", value: f.hochschuleName },
          { label: "Studienfach", value: f.studienfach },
          { label: "Hochschulabschluss (Bachelor/Master)", value: f.hochschulabschluss },
          { label: "Abschlussjahr", value: f.abschlussJahr },
          { label: "Anabin / ZAB", value: join(f.anabinId, f.anerkennungArt, f.zabBescheinigung) },
        ],
      },
      {
        title: "E. Beschäftigung",
        rows: [
          { label: "Arbeitgeber", value: f.arbeitgeber },
          { label: "Anschrift Arbeitgeber", value: f.arbeitgeberAdresse },
          { label: "Tätigkeit", value: f.taetigkeit },
          { label: "Brutto Jahresgehalt (EUR)", value: f.jahresgehalt },
          { label: "Brutto Monatsgehalt (EUR)", value: f.monatsgehalt },
          { label: "Mangelberuf (MINT/IT/Med)", value: f.mangelberuf },
          { label: "IT-Erfahrung (godina)", value: f.itBerufErfahrungJahre },
        ],
      },
      {
        title: "F. Vertrag & Versicherung",
        rows: [
          { label: "Vertragsbeginn", value: f.vertragsbeginn },
          { label: "Vertragsdauer", value: f.vertragsdauer },
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
    officialPdfUrl: "https://service.berlin.de/dienstleistung/305249/",
    officialPdfLabel: "Original (BAMF)",
    mapExtras: (f) => [
      {
        title: "D. Bezugsperson (član porodice u DE)",
        rows: [
          { label: "Name (Ime i prezime)", value: f.bezugspersonName },
          { label: "Geburtsdatum", value: f.bezugspersonGeburtsdatum },
          { label: "Staatsangehörigkeit", value: f.bezugspersonStaat },
          { label: "Aufenthaltsart (vrsta titula)", value: f.bezugspersonAufenthaltsart },
          { label: "Aufenthalt gültig bis", value: f.bezugspersonAufenthaltGueltigBis },
          { label: "Anschrift in DE", value: f.bezugspersonAdresseDE },
          { label: "Verwandtschaft", value: f.verwandtschaft },
        ],
      },
      {
        title: "E. Eheschließung",
        rows: [
          { label: "Heiratsdatum / Ort", value: join(f.heiratsdatum, f.heiratsort) },
          { label: "A1 Sprachzertifikat", value: join(f.a1Zertifikat, f.a1Datum, f.a1Institut) },
          { label: "Kinder", value: f.kinder },
        ],
      },
      {
        title: "F. Wohnung & Lebensunterhalt",
        rows: [
          { label: "Wohnraum (m²)", value: f.wohnraumQm },
          { label: "Anzahl Personen im Haushalt", value: f.anzahlPersonen },
          { label: "Lebensunterhalt — Nachweis", value: f.lebensunterhaltNachweis },
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
    officialPdfUrl: "https://service.berlin.de/dienstleistung/305249/",
    officialPdfLabel: "Original (BAMF)",
    mapExtras: (f) => [
      {
        title: "D. Hochschule (Univerzitet u DE)",
        rows: [
          { label: "Hochschule", value: f.hochschule },
          { label: "Studiengang", value: f.studiengang },
          { label: "Abschlussziel (Bachelor/Master)", value: f.abschlussZiel },
          { label: "Zulassungsbescheid Nr.", value: f.zulassungsbescheidNr },
          { label: "Zulassungsbescheid — Datum", value: f.zulassungsbescheidDatum },
          { label: "Semesterstart", value: f.semesterStart },
          { label: "Studienkolleg (falls)", value: f.studienkolleg },
        ],
      },
      {
        title: "E. Finanzierung (Sperrkonto / Bürgschaft)",
        rows: [
          { label: "Sperrkonto Bank", value: f.sperrkontoBank },
          { label: "Sperrkonto IBAN", value: f.sperrkontoIban },
          { label: "Sperrkonto Betrag (EUR)", value: f.sperrkontoBetrag },
          { label: "Stipendium", value: f.stipendium },
          { label: "Verpflichtungserklärung", value: f.verpflichtungserklaerung },
        ],
      },
      {
        title: "F. Sprachkenntnisse & Vorbildung",
        rows: [
          { label: "Sprachzertifikat / Niveau", value: join(f.sprachzertifikat, f.sprachnivo) },
          { label: "Datum zertifikata", value: f.sprachDatum },
          { label: "Vorbildung", value: f.vorbildung },
          { label: "Krankenversicherung", value: f.krankenversicherung },
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
    officialPdfUrl: "https://service.berlin.de/dienstleistung/305249/",
    officialPdfLabel: "Original (BAMF)",
    mapExtras: (f) => [
      {
        title: "D. Aktueller Aufenthaltstitel",
        rows: [
          { label: "Aktuelle boravišna dozvola (vrsta)", value: f.aktBoravisnaDozvola },
          { label: "Vrijedi do", value: f.aktDozvolaGueltigBis },
          { label: "Erste Einreise nach DE", value: f.einreiseDatum },
          { label: "Boravak od (datum)", value: f.boravakOd },
        ],
      },
      {
        title: "E. Beschäftigung & Rente",
        rows: [
          { label: "Arbeitgeber", value: f.arbeitgeber },
          { label: "Beruf", value: f.beruf },
          { label: "Brutto Monatsgehalt (EUR)", value: f.monatsbruttoEinkommen },
          { label: "Rentenversicherung — Monate", value: f.rentenversicherungMonate },
        ],
      },
      {
        title: "F. Integration & Wohnen",
        rows: [
          { label: "Sprachzertifikat / Niveau", value: join(f.sprachzertifikat, f.sprachnivo) },
          { label: "Integrationskurs", value: f.integrationskurs },
          { label: "Einbürgerungstest / LiD", value: f.einbuergerungstest },
          { label: "Wohnraum (m²)", value: f.wohnraumQm },
        ],
      },
      {
        title: "G. Familie",
        rows: [
          { label: "Ehepartner", value: f.ehepartnerName },
          { label: "Kinder", value: f.kinder },
        ],
      },
      { title: "H. Bemerkungen", rows: [{ label: "Bemerkungen", value: f.bemerkungen }] },
    ],
  },

  visaPermanent2: {
    formTitle: "Daueraufenthalt-EU (§ 9a AufenthG)",
    formSubtitle: "Datenblatt za EU dugotrajni boravak",
    reasonNote: REASON_BAMF,
    usageNote: USAGE_DEFAULT,
    fileName: "BalkanLink-Datenblatt-DaueraufenthaltEU.pdf",
    officialPdfUrl: "https://service.berlin.de/dienstleistung/305249/",
    officialPdfLabel: "Original (BAMF)",
    mapExtras: (f) => [
      {
        title: "D. Aufenthaltsdauer (5 godina pravilo)",
        rows: [
          { label: "Aktuelle boravišna dozvola", value: f.aktBoravisnaDozvola },
          { label: "Vrijedi do", value: f.aktDozvolaGueltigBis },
          { label: "Erste Einreise nach DE", value: f.einreiseDatum },
          { label: "Boravak od (datum)", value: f.boravakOd },
          { label: "Langfristige Beschäftigung (ja/nein)", value: f.langfristigeBeschaeftigung },
          { label: "Abwesenheiten in EU", value: f.abwesenheitenEU },
        ],
      },
      {
        title: "E. Lebensunterhalt",
        rows: [
          { label: "Arbeitgeber", value: f.arbeitgeber },
          { label: "Beruf", value: f.beruf },
          { label: "Brutto Monatsgehalt (EUR)", value: f.monatsbruttoEinkommen },
          { label: "Rentenversicherung — Monate", value: f.rentenversicherungMonate },
          { label: "Krankenversicherung (Art)", value: f.krankenversicherungArt },
        ],
      },
      {
        title: "F. Integration",
        rows: [
          { label: "Sprachzertifikat / Niveau", value: join(f.sprachzertifikat, f.sprachnivo) },
          { label: "EU Blaue Karte (gehabt?)", value: f.euBlaueKarte },
        ],
      },
      { title: "G. Bemerkungen", rows: [{ label: "Bemerkungen", value: f.bemerkungen }] },
    ],
  },
};
