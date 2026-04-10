/* ──────────────────────────────────────────────
   Vorlagen / Šabloni – Template Engine Data
   All processing happens client-side (DSGVO).
   ────────────────────────────────────────────── */

export interface TemplateField {
  key: string;
  label: string;       // DE label
  labelBs: string;     // BS label
  placeholder?: string;
  type?: "text" | "textarea" | "date";
  rows?: number;
}

export interface TemplateVariant {
  id: "standard" | "kurz";
  label: string;
  body: string; // with {{PLACEHOLDERS}}
}

export interface TemplateHint {
  title: string;
  items: string[];
}

export interface VorlagenTemplate {
  slug: string;
  titleDe: string;
  titleBs: string;
  section: "work" | "service";
  icon: "briefcase" | "file" | "home" | "wifi" | "star" | "heart";
  fields: TemplateField[];
  variants: TemplateVariant[];
  hints: TemplateHint[];
  checklist: string[];
}

/* ── Helper: today as DD.MM.YYYY ── */
export function todayFormatted(): string {
  const d = new Date();
  return `${String(d.getDate()).padStart(2, "0")}.${String(d.getMonth() + 1).padStart(2, "0")}.${d.getFullYear()}`;
}

/* ─────────── TEMPLATES ─────────── */

export const VORLAGEN_TEMPLATES: VorlagenTemplate[] = [
  /* ── KÜNDIGUNG ── */
  {
    slug: "kuendigung",
    titleDe: "Kündigung (Arbeitsverhältnis)",
    titleBs: "Otkaz (radni odnos)",
    section: "work",
    icon: "briefcase",
    fields: [
      { key: "NAME", label: "Ihr vollständiger Name", labelBs: "Vaše puno ime", placeholder: "Max Mustermann" },
      { key: "ADRESSE", label: "Ihre Adresse", labelBs: "Vaša adresa", placeholder: "Musterstr. 1, 12345 Berlin" },
      { key: "FIRMA", label: "Name des Arbeitgebers", labelBs: "Ime poslodavca", placeholder: "Musterfirma GmbH" },
      { key: "FIRMA_ADRESSE", label: "Adresse des Arbeitgebers", labelBs: "Adresa poslodavca", placeholder: "Firmenstr. 10, 12345 Berlin" },
      { key: "ORT", label: "Ort", labelBs: "Mjesto", placeholder: "Berlin" },
      { key: "DATUM", label: "Datum", labelBs: "Datum", type: "date" },
      { key: "ENDDATUM", label: "Gewünschtes Enddatum", labelBs: "Željeni datum prestanka", type: "date" },
    ],
    variants: [
      {
        id: "standard",
        label: "Standard (professionell)",
        body: `{{NAME}}
{{ADRESSE}}

{{FIRMA}}
{{FIRMA_ADRESSE}}

{{ORT}}, den {{DATUM}}

Betreff: Ordentliche Kündigung meines Arbeitsverhältnisses

Sehr geehrte Damen und Herren,

hiermit kündige ich das zwischen uns bestehende Arbeitsverhältnis ordentlich und fristgerecht zum {{ENDDATUM}}.

Sollte aufgrund vertraglicher oder gesetzlicher Bestimmungen ein anderer Beendigungstermin maßgeblich sein, erkläre ich die Kündigung hilfsweise zum nächstmöglichen Zeitpunkt.

Ich bitte um eine schriftliche Bestätigung dieser Kündigung unter Angabe des konkreten Beendigungsdatums.

Des Weiteren bitte ich um die Ausstellung eines qualifizierten Arbeitszeugnisses sowie die Übersendung sämtlicher relevanter Unterlagen.

Für die bisherige Zusammenarbeit danke ich Ihnen.

Mit freundlichen Grüßen

{{NAME}}`,
      },
      {
        id: "kurz",
        label: "Kurz & kompakt",
        body: `{{NAME}}
{{ADRESSE}}

{{FIRMA}}
{{FIRMA_ADRESSE}}

{{ORT}}, den {{DATUM}}

Betreff: Kündigung

Sehr geehrte Damen und Herren,

hiermit kündige ich mein Arbeitsverhältnis fristgerecht zum {{ENDDATUM}}.

Bitte bestätigen Sie mir die Kündigung schriftlich.

Mit freundlichen Grüßen
{{NAME}}`,
      },
    ],
    hints: [
      {
        title: "Wichtig zu wissen",
        items: [
          "Die gesetzliche Kündigungsfrist beträgt 4 Wochen zum 15. oder zum Ende des Kalendermonats (§ 622 BGB).",
          "Vertragliche Fristen können länger sein — prüfen Sie Ihren Arbeitsvertrag.",
          "Die Kündigung muss schriftlich erfolgen (E-Mail oder Fax genügen nicht).",
        ],
      },
      {
        title: "Versand",
        items: [
          "Per Post: Einschreiben mit Rückschein empfohlen.",
          "Persönlich: Empfangsbestätigung unterschreiben lassen.",
          "E-Mail ist bei Arbeitsverträgen nicht ausreichend.",
        ],
      },
    ],
    checklist: [
      "Datum korrekt eingetragen",
      "Kündigungsfrist geprüft",
      "Eigenhändig unterschrieben",
      "Kopie für eigene Unterlagen",
    ],
  },

  /* ── FRISTLOSE KÜNDIGUNG ── */
  {
    slug: "fristlose-kuendigung",
    titleDe: "Fristlose Kündigung",
    titleBs: "Otkaz bez otkaznog roka",
    section: "work",
    icon: "briefcase",
    fields: [
      { key: "NAME", label: "Ihr vollständiger Name", labelBs: "Vaše puno ime", placeholder: "Max Mustermann" },
      { key: "ADRESSE", label: "Ihre Adresse", labelBs: "Vaša adresa", placeholder: "Musterstr. 1, 12345 Berlin" },
      { key: "FIRMA", label: "Name des Arbeitgebers", labelBs: "Ime poslodavca", placeholder: "Musterfirma GmbH" },
      { key: "FIRMA_ADRESSE", label: "Adresse des Arbeitgebers", labelBs: "Adresa poslodavca", placeholder: "Firmenstr. 10, 12345 Berlin" },
      { key: "ORT", label: "Ort", labelBs: "Mjesto", placeholder: "Berlin" },
      { key: "DATUM", label: "Datum", labelBs: "Datum", type: "date" },
    ],
    variants: [
      {
        id: "standard",
        label: "Standard (professionell)",
        body: `{{NAME}}
{{ADRESSE}}

{{FIRMA}}
{{FIRMA_ADRESSE}}

{{ORT}}, den {{DATUM}}

Betreff: Fristlose Kündigung meines Arbeitsverhältnisses

Sehr geehrte Damen und Herren,

hiermit kündige ich das zwischen uns bestehende Arbeitsverhältnis fristlos aus wichtigem Grund.

Eine Fortsetzung des Arbeitsverhältnisses ist mir nicht mehr zumutbar.

Ich bitte um schriftliche Bestätigung.

Mit freundlichen Grüßen

{{NAME}}`,
      },
    ],
    hints: [
      {
        title: "Wichtig zu wissen",
        items: [
          "Eine fristlose Kündigung erfordert einen \u201Ewichtigen Grund\u201C (§ 626 BGB).",
          "Die Kündigung muss innerhalb von 2 Wochen nach Kenntnis des Grundes erfolgen.",
          "Lassen Sie sich im Zweifel rechtlich beraten.",
        ],
      },
      {
        title: "Versand",
        items: [
          "Einschreiben mit Rückschein oder persönliche Übergabe.",
        ],
      },
    ],
    checklist: [
      "Wichtiger Grund dokumentiert",
      "2-Wochen-Frist beachtet",
      "Eigenhändig unterschrieben",
    ],
  },

  /* ── KÜNDIGUNG PROBEZEIT ── */
  {
    slug: "kuendigung-probezeit",
    titleDe: "Kündigung in der Probezeit",
    titleBs: "Otkaz u probnom roku",
    section: "work",
    icon: "briefcase",
    fields: [
      { key: "NAME", label: "Ihr vollständiger Name", labelBs: "Vaše puno ime", placeholder: "Max Mustermann" },
      { key: "ADRESSE", label: "Ihre Adresse", labelBs: "Vaša adresa", placeholder: "Musterstr. 1, 12345 Berlin" },
      { key: "FIRMA", label: "Name des Arbeitgebers", labelBs: "Ime poslodavca", placeholder: "Musterfirma GmbH" },
      { key: "FIRMA_ADRESSE", label: "Adresse des Arbeitgebers", labelBs: "Adresa poslodavca", placeholder: "Firmenstr. 10, 12345 Berlin" },
      { key: "ORT", label: "Ort", labelBs: "Mjesto", placeholder: "Berlin" },
      { key: "DATUM", label: "Datum", labelBs: "Datum", type: "date" },
      { key: "ENDDATUM", label: "Gewünschtes Enddatum", labelBs: "Željeni datum prestanka", type: "date" },
    ],
    variants: [
      {
        id: "standard",
        label: "Standard (professionell)",
        body: `{{NAME}}
{{ADRESSE}}

{{FIRMA}}
{{FIRMA_ADRESSE}}

{{ORT}}, den {{DATUM}}

Betreff: Kündigung in der Probezeit

Sehr geehrte Damen und Herren,

hiermit kündige ich das Arbeitsverhältnis innerhalb der vereinbarten Probezeit fristgerecht zum {{ENDDATUM}}.

Ich danke für die bisherige Zusammenarbeit.

Mit freundlichen Grüßen

{{NAME}}`,
      },
    ],
    hints: [
      {
        title: "Wichtig zu wissen",
        items: [
          "In der Probezeit gilt eine Kündigungsfrist von 2 Wochen (§ 622 Abs. 3 BGB).",
          "Die Probezeit darf maximal 6 Monate betragen.",
        ],
      },
      { title: "Versand", items: ["Einschreiben oder persönliche Übergabe."] },
    ],
    checklist: ["Probezeit noch aktiv", "2-Wochen-Frist eingehalten", "Eigenhändig unterschrieben"],
  },

  /* ── MIETKÜNDIGUNG ── */
  {
    slug: "mietkuendigung",
    titleDe: "Mietkündigung",
    titleBs: "Otkaz najma stana",
    section: "service",
    icon: "home",
    fields: [
      { key: "NAME", label: "Ihr vollständiger Name", labelBs: "Vaše puno ime", placeholder: "Max Mustermann" },
      { key: "ADRESSE", label: "Adresse der Mietwohnung", labelBs: "Adresa stana", placeholder: "Musterstr. 1, 12345 Berlin" },
      { key: "VERMIETER", label: "Name des Vermieters", labelBs: "Ime stanodavca", placeholder: "Hausverwaltung GmbH" },
      { key: "VERMIETER_ADRESSE", label: "Adresse des Vermieters", labelBs: "Adresa stanodavca", placeholder: "Verwalterstr. 5, 12345 Berlin" },
      { key: "ORT", label: "Ort", labelBs: "Mjesto", placeholder: "Berlin" },
      { key: "DATUM", label: "Datum", labelBs: "Datum", type: "date" },
      { key: "ENDDATUM", label: "Gewünschtes Enddatum", labelBs: "Željeni datum prestanka", type: "date" },
    ],
    variants: [
      {
        id: "standard",
        label: "Standard (professionell)",
        body: `{{NAME}}
{{ADRESSE}}

{{VERMIETER}}
{{VERMIETER_ADRESSE}}

{{ORT}}, den {{DATUM}}

Betreff: Ordentliche Kündigung des Mietvertrages

Sehr geehrte Damen und Herren,

hiermit kündige ich den mit Ihnen bestehenden Mietvertrag für die Wohnung {{ADRESSE}} ordentlich und fristgerecht zum {{ENDDATUM}}.

Bitte bestätigen Sie mir die Kündigung schriftlich sowie den Beendigungszeitpunkt des Mietverhältnisses.

Ich bitte um Mitteilung eines Termins zur Wohnungsübergabe.

Mit freundlichen Grüßen

{{NAME}}`,
      },
    ],
    hints: [
      {
        title: "Wichtig zu wissen",
        items: [
          "Die gesetzliche Kündigungsfrist für Mieter beträgt 3 Monate (§ 573c BGB).",
          "Die Kündigung muss bis zum 3. Werktag eines Monats eingehen.",
          "Alle im Mietvertrag genannten Personen müssen die Kündigung unterschreiben.",
        ],
      },
      { title: "Versand", items: ["Einschreiben mit Rückschein empfohlen.", "Persönliche Übergabe mit Empfangsbestätigung."] },
    ],
    checklist: ["3-Monats-Frist beachtet", "Alle Mieter haben unterschrieben", "Kopie aufbewahrt"],
  },

  /* ── INTERNET / VERTRAGSKÜNDIGUNG ── */
  {
    slug: "vertragskundigung",
    titleDe: "Vertragskündigung (Internet, Handy etc.)",
    titleBs: "Otkaz ugovora (Internet, telefon itd.)",
    section: "service",
    icon: "wifi",
    fields: [
      { key: "NAME", label: "Ihr vollständiger Name", labelBs: "Vaše puno ime", placeholder: "Max Mustermann" },
      { key: "ADRESSE", label: "Ihre Adresse", labelBs: "Vaša adresa", placeholder: "Musterstr. 1, 12345 Berlin" },
      { key: "KUNDENNUMMER", label: "Kundennummer", labelBs: "Broj korisnika", placeholder: "123456789" },
      { key: "ANBIETER", label: "Anbieter / Firma", labelBs: "Provajder / Firma", placeholder: "Telekom / Vodafone / O2" },
      { key: "ANBIETER_ADRESSE", label: "Adresse des Anbieters", labelBs: "Adresa provajdera", placeholder: "Kundenservice, 12345 Bonn" },
      { key: "ORT", label: "Ort", labelBs: "Mjesto", placeholder: "Berlin" },
      { key: "DATUM", label: "Datum", labelBs: "Datum", type: "date" },
    ],
    variants: [
      {
        id: "standard",
        label: "Standard (professionell)",
        body: `{{NAME}}
{{ADRESSE}}

{{ANBIETER}}
{{ANBIETER_ADRESSE}}

{{ORT}}, den {{DATUM}}

Kundennummer: {{KUNDENNUMMER}}

Betreff: Ordentliche Kündigung meines Vertrages

Sehr geehrte Damen und Herren,

hiermit kündige ich den mit Ihnen bestehenden Vertrag fristgerecht zum nächstmöglichen Zeitpunkt.

Bitte bestätigen Sie mir die Kündigung schriftlich unter Angabe des Vertragsendes.

Mit freundlichen Grüßen

{{NAME}}`,
      },
    ],
    hints: [
      {
        title: "Wichtig zu wissen",
        items: [
          "Seit Dezember 2021 gelten neue Regeln: Verträge verlängern sich nur noch um 1 Monat (statt 12).",
          "Die Kündigungsfrist beträgt in der Regel 1 Monat zum Ende der Laufzeit.",
          "Online-Kündigung ist bei vielen Anbietern mittlerweile verpflichtend möglich.",
        ],
      },
      { title: "Versand", items: ["E-Mail, Kundenportal, oder Einschreiben."] },
    ],
    checklist: ["Kundennummer angegeben", "Vertragslaufzeit geprüft", "Bestätigung angefordert"],
  },

  /* ── BEWERBUNG ── */
  {
    slug: "bewerbung",
    titleDe: "Bewerbungsanschreiben",
    titleBs: "Prijava za posao",
    section: "work",
    icon: "star",
    fields: [
      { key: "NAME", label: "Ihr vollständiger Name", labelBs: "Vaše puno ime", placeholder: "Max Mustermann" },
      { key: "ADRESSE", label: "Ihre Adresse", labelBs: "Vaša adresa", placeholder: "Musterstr. 1, 12345 Berlin" },
      { key: "FIRMA", label: "Name des Unternehmens", labelBs: "Ime firme", placeholder: "Musterfirma GmbH" },
      { key: "FIRMA_ADRESSE", label: "Adresse des Unternehmens", labelBs: "Adresa firme", placeholder: "Firmenstr. 10, 12345 Berlin" },
      { key: "POSITION", label: "Position / Stelle", labelBs: "Pozicija", placeholder: "Sachbearbeiter / Lagerist / ..." },
      { key: "ORT", label: "Ort", labelBs: "Mjesto", placeholder: "Berlin" },
      { key: "DATUM", label: "Datum", labelBs: "Datum", type: "date" },
    ],
    variants: [
      {
        id: "standard",
        label: "Standard (professionell)",
        body: `{{NAME}}
{{ADRESSE}}

{{FIRMA}}
{{FIRMA_ADRESSE}}

{{ORT}}, den {{DATUM}}

Betreff: Bewerbung als {{POSITION}}

Sehr geehrte Damen und Herren,

hiermit bewerbe ich mich um die Position als {{POSITION}} in Ihrem Unternehmen.

Durch meine bisherigen Erfahrungen verfüge ich über fundierte Kenntnisse in diesem Bereich und arbeite zuverlässig, strukturiert sowie verantwortungsbewusst.

Teamfähigkeit, Engagement und eine schnelle Auffassungsgabe zählen zu meinen Stärken.

Gerne möchte ich meine Fähigkeiten in Ihrem Unternehmen einbringen und weiterentwickeln.

Über eine Einladung zu einem persönlichen Gespräch freue ich mich sehr.

Mit freundlichen Grüßen

{{NAME}}`,
      },
    ],
    hints: [
      {
        title: "Wichtig zu wissen",
        items: [
          "Passen Sie das Anschreiben individuell an die Stelle an.",
          "Vermeiden Sie allgemeine Floskeln — seien Sie konkret.",
          "Fügen Sie Lebenslauf und relevante Zeugnisse bei.",
        ],
      },
      { title: "Versand", items: ["Per E-Mail (PDF) oder über das Bewerbungsportal.", "Postalisch nur wenn ausdrücklich verlangt."] },
    ],
    checklist: ["Position korrekt angegeben", "Firmenname geprüft", "Anhänge (Lebenslauf, Zeugnisse) beigefügt"],
  },

  /* ── LEBENSLAUF ── */
  {
    slug: "lebenslauf",
    titleDe: "Lebenslauf",
    titleBs: "Biografija (CV)",
    section: "work",
    icon: "file",
    fields: [
      { key: "NAME", label: "Vollständiger Name", labelBs: "Puno ime", placeholder: "Max Mustermann" },
      { key: "ADRESSE", label: "Adresse", labelBs: "Adresa", placeholder: "Musterstr. 1, 12345 Berlin" },
      { key: "GEBURTSDATUM", label: "Geburtsdatum", labelBs: "Datum rođenja", placeholder: "01.01.1990" },
      { key: "ERFAHRUNG", label: "Berufserfahrung", labelBs: "Radno iskustvo", type: "textarea", rows: 4, placeholder: "2020–2024: Firma XY, Position\n2018–2020: Firma AB, Position" },
      { key: "AUSBILDUNG", label: "Ausbildung", labelBs: "Obrazovanje", type: "textarea", rows: 3, placeholder: "2015–2018: Ausbildung zum ...\n2012–2015: Gymnasium XY" },
      { key: "KENNTNISSE", label: "Kenntnisse & Fähigkeiten", labelBs: "Vještine i znanja", type: "textarea", rows: 3, placeholder: "Deutsch (B2), Englisch (A2), MS Office, Führerschein Klasse B" },
    ],
    variants: [
      {
        id: "standard",
        label: "Standard (professionell)",
        body: `LEBENSLAUF

Name: {{NAME}}
Adresse: {{ADRESSE}}
Geburtsdatum: {{GEBURTSDATUM}}

BERUFSERFAHRUNG
{{ERFAHRUNG}}

AUSBILDUNG
{{AUSBILDUNG}}

KENNTNISSE & FÄHIGKEITEN
{{KENNTNISSE}}`,
      },
    ],
    hints: [
      {
        title: "Wichtig zu wissen",
        items: [
          "In Deutschland ist ein tabellarischer Lebenslauf Standard.",
          "Lücken im Lebenslauf sollten erklärt werden können.",
          "Bewerbungsfoto ist optional, aber in Deutschland üblich.",
        ],
      },
    ],
    checklist: ["Chronologisch (aktuellste zuerst)", "Keine Rechtschreibfehler", "Aktuelles Datum"],
  },

  /* ── REKLAMATION ── */
  {
    slug: "reklamation",
    titleDe: "Reklamation",
    titleBs: "Reklamacija",
    section: "service",
    icon: "file",
    fields: [
      { key: "NAME", label: "Ihr vollständiger Name", labelBs: "Vaše puno ime", placeholder: "Max Mustermann" },
      { key: "ADRESSE", label: "Ihre Adresse", labelBs: "Vaša adresa", placeholder: "Musterstr. 1, 12345 Berlin" },
      { key: "FIRMA", label: "Händler / Firma", labelBs: "Prodavac / Firma", placeholder: "Shop GmbH" },
      { key: "FIRMA_ADRESSE", label: "Adresse des Händlers", labelBs: "Adresa prodavca", placeholder: "Shopstr. 5, 12345 Berlin" },
      { key: "ORT", label: "Ort", labelBs: "Mjesto", placeholder: "Berlin" },
      { key: "DATUM", label: "Kaufdatum", labelBs: "Datum kupovine", type: "date" },
      { key: "PROBLEM", label: "Beschreibung des Mangels", labelBs: "Opis problema", type: "textarea", rows: 3, placeholder: "Display zeigt Fehler, Gerät startet nicht, ..." },
    ],
    variants: [
      {
        id: "standard",
        label: "Standard (professionell)",
        body: `{{NAME}}
{{ADRESSE}}

{{FIRMA}}
{{FIRMA_ADRESSE}}

{{ORT}}, den ${todayFormatted()}

Betreff: Reklamation – Kauf vom {{DATUM}}

Sehr geehrte Damen und Herren,

hiermit reklamiere ich den Kauf vom {{DATUM}}.

Der gelieferte Artikel weist folgende Mängel auf: {{PROBLEM}}.

Ich bitte um eine zeitnahe Lösung, entweder in Form eines Austauschs oder einer Rückerstattung.

Mit freundlichen Grüßen

{{NAME}}`,
      },
    ],
    hints: [
      {
        title: "Wichtig zu wissen",
        items: [
          "Gewährleistung: 2 Jahre ab Kaufdatum (§ 438 BGB).",
          "In den ersten 12 Monaten liegt die Beweislast beim Verkäufer.",
          "Kassenbon oder Rechnung aufbewahren.",
        ],
      },
      { title: "Versand", items: ["E-Mail, Brief, oder persönlich im Geschäft."] },
    ],
    checklist: ["Kaufdatum korrekt", "Mangel klar beschrieben", "Kassenbon vorhanden"],
  },

  /* ── WIDERRUF ── */
  {
    slug: "widerruf",
    titleDe: "Widerruf",
    titleBs: "Opoziv ugovora",
    section: "service",
    icon: "file",
    fields: [
      { key: "NAME", label: "Ihr vollständiger Name", labelBs: "Vaše puno ime", placeholder: "Max Mustermann" },
      { key: "ADRESSE", label: "Ihre Adresse", labelBs: "Vaša adresa", placeholder: "Musterstr. 1, 12345 Berlin" },
      { key: "FIRMA", label: "Firma / Anbieter", labelBs: "Firma / Provajder", placeholder: "Online-Shop GmbH" },
      { key: "FIRMA_ADRESSE", label: "Adresse der Firma", labelBs: "Adresa firme", placeholder: "Shopstr. 5, 12345 Berlin" },
      { key: "ORT", label: "Ort", labelBs: "Mjesto", placeholder: "Berlin" },
      { key: "DATUM", label: "Vertragsdatum", labelBs: "Datum ugovora", type: "date" },
    ],
    variants: [
      {
        id: "standard",
        label: "Standard (professionell)",
        body: `{{NAME}}
{{ADRESSE}}

{{FIRMA}}
{{FIRMA_ADRESSE}}

{{ORT}}, den ${todayFormatted()}

Betreff: Widerruf des Vertrages vom {{DATUM}}

Sehr geehrte Damen und Herren,

hiermit widerrufe ich den von mir abgeschlossenen Vertrag vom {{DATUM}} fristgerecht.

Bitte bestätigen Sie mir den Widerruf schriftlich.

Mit freundlichen Grüßen

{{NAME}}`,
      },
    ],
    hints: [
      {
        title: "Wichtig zu wissen",
        items: [
          "Widerrufsfrist: 14 Tage nach Vertragsschluss bzw. Warenerhalt.",
          "Gilt nur bei Fernabsatzverträgen (Online, Telefon).",
          "Kein Grund erforderlich.",
        ],
      },
      { title: "Versand", items: ["E-Mail genügt (Datum nachweisbar halten)."] },
    ],
    checklist: ["14-Tage-Frist eingehalten", "Vertragsdatum korrekt", "Bestätigung angefordert"],
  },

  /* ── ARBEITSZEUGNIS ── */
  {
    slug: "anschreiben",
    titleDe: "Arbeitszeugnis anfordern",
    titleBs: "Zahtjev za radnu potvrdu",
    section: "work",
    icon: "star",
    fields: [
      { key: "NAME", label: "Ihr vollständiger Name", labelBs: "Vaše puno ime", placeholder: "Max Mustermann" },
      { key: "ADRESSE", label: "Ihre Adresse", labelBs: "Vaša adresa", placeholder: "Musterstr. 1, 12345 Berlin" },
      { key: "FIRMA", label: "Name des Arbeitgebers", labelBs: "Ime poslodavca", placeholder: "Musterfirma GmbH" },
      { key: "FIRMA_ADRESSE", label: "Adresse des Arbeitgebers", labelBs: "Adresa poslodavca", placeholder: "Firmenstr. 10, 12345 Berlin" },
      { key: "ORT", label: "Ort", labelBs: "Mjesto", placeholder: "Berlin" },
      { key: "DATUM", label: "Datum", labelBs: "Datum", type: "date" },
    ],
    variants: [
      {
        id: "standard",
        label: "Standard (professionell)",
        body: `{{NAME}}
{{ADRESSE}}

{{FIRMA}}
{{FIRMA_ADRESSE}}

{{ORT}}, den {{DATUM}}

Betreff: Anforderung eines qualifizierten Arbeitszeugnisses

Sehr geehrte Damen und Herren,

hiermit bitte ich um die Ausstellung eines qualifizierten Arbeitszeugnisses.

Ich danke Ihnen im Voraus.

Mit freundlichen Grüßen

{{NAME}}`,
      },
    ],
    hints: [
      {
        title: "Wichtig zu wissen",
        items: [
          "Sie haben Anspruch auf ein qualifiziertes Arbeitszeugnis (§ 109 GewO).",
          "Das Zeugnis muss wohlwollend und wahrheitsgemäß sein.",
        ],
      },
    ],
    checklist: ["Name und Position korrekt", "Qualifiziertes Zeugnis angefordert"],
  },
];

/* ── Lookup helper ── */
export function getTemplate(slug: string): VorlagenTemplate | undefined {
  return VORLAGEN_TEMPLATES.find((t) => t.slug === slug);
}

/* ── Render helper ── */
export function renderTemplate(body: string, values: Record<string, string>): string {
  let result = body;
  for (const [key, val] of Object.entries(values)) {
    result = result.split(`{{${key}}}`).join(val || `[${key}]`);
  }
  // Replace any remaining placeholders
  result = result.replace(/\{\{(\w+)\}\}/g, "[___]");
  return result;
}

/* ── Format date value for display ── */
export function formatDateValue(val: string): string {
  if (!val) return "";
  const d = new Date(val);
  if (isNaN(d.getTime())) return val;
  return `${String(d.getDate()).padStart(2, "0")}.${String(d.getMonth() + 1).padStart(2, "0")}.${d.getFullYear()}`;
}
