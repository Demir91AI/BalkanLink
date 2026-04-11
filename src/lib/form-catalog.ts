/** Grouped form catalog – ordered by user priority, not alphabet */

export interface FormEntry {
  slug: string;
  label: string;
  desc: string;
}

export interface FormGroup {
  id: string;
  icon: string; // emoji
  title: string;
  items: FormEntry[];
  /** Sub-groups within a group (e.g. Bürgergeld Anlagen) */
  subGroups?: {
    id: string;
    title: string;
    items: FormEntry[];
  }[];
}

export const formCatalog: FormGroup[] = [
  {
    id: "dolazak",
    icon: "🏠",
    title: "Ankunft in Deutschland",
    items: [
      { slug: "anmeldung", label: "Anmeldung / Ummeldung", desc: "Anmeldung oder Änderung der Wohnadresse in Deutschland." },
      { slug: "steuer-id", label: "Steuer-ID", desc: "Steuerliche Identifikationsnummer für Arbeit und Anmeldung." },
      { slug: "fuehrerschein", label: "Führerschein", desc: "Umschreibung und Anerkennung des Führerscheins in Deutschland." },
      { slug: "fahrzeugzulassung", label: "Fahrzeugzulassung", desc: "Anmeldung von Kraftfahrzeugen in Deutschland." },
    ],
  },
  {
    id: "porodica",
    icon: "👨‍👩‍👧",
    title: "Familie & Kinder",
    items: [
      { slug: "kindergeld", label: "Kindergeld", desc: "Monatliche staatliche Leistung für Kinder." },
      { slug: "elterngeld", label: "Elterngeld", desc: "Einkommensersatzleistung für Eltern nach der Geburt eines Kindes." },
      { slug: "mutterschaftsgeld", label: "Mutterschaftsgeld", desc: "Leistung während der Schutzfrist vor und nach der Entbindung." },
      { slug: "kinderzuschlag", label: "Kinderzuschlag", desc: "Zusätzliche Unterstützung für Familien mit geringem Einkommen." },
      { slug: "krippengeld-bayern", label: "Krippengeld (Bayern)", desc: "Zuschuss zu Kita-Kosten in Bayern für Kinder bis 3 Jahre." },
    ],
  },
  {
    id: "buergergeld",
    icon: "💰",
    title: "Bürgergeld",
    items: [
      { slug: "hauptantrag", label: "Bürgergeld Hauptantrag", desc: "Zentrales Formular zur Beantragung von Bürgergeld." },
      { slug: "weiterbewilligung", label: "Weiterbewilligungsantrag", desc: "Verlängerung des Bürgergeldes nach Ablauf des Bewilligungszeitraums." },
    ],
    subGroups: [
      {
        id: "buergergeld-anlagen",
        title: "Anlagen",
        items: [
          { slug: "anlage-kdu", label: "Anlage KDU — Unterkunft und Heizung", desc: "Anlage für Kosten der Unterkunft und Heizung." },
          { slug: "anlage-ek", label: "Anlage EK — Einkommen", desc: "Einkommen jeder Person ab 15 in der Bedarfsgemeinschaft." },
          { slug: "anlage-eks", label: "Anlage EKS — Selbständige", desc: "Einkommen und Ausgaben von Selbständigen." },
          { slug: "anlage-vm", label: "Anlage VM — Vermögen", desc: "Vermögen aller Personen in der Bedarfsgemeinschaft." },
          { slug: "anlage-wep", label: "Anlage WEP — Partner/Kinder", desc: "Angaben zu Partner/Kindern 15–24 Jahre." },
          { slug: "anlage-ki", label: "Anlage KI — Kind unter 15", desc: "Angaben zu Kindern unter 15 Jahren." },
          { slug: "anlage-sv", label: "Anlage SV — Sozialversicherung", desc: "Status der Krankenversicherung." },
          { slug: "anlage-bb", label: "Anlage BB — Besonderer Bedarf", desc: "Antrag auf einmaligen Sonderbedarf." },
          { slug: "anlage-ve", label: "Anlage VE — Verantwortungsgemeinschaft", desc: "Prüfung einer eheähnlichen Gemeinschaft." },
          { slug: "anlage-hg", label: "Anlage HG — Haushaltsgemeinschaft", desc: "Zusammenleben mit Verwandten." },
          { slug: "anlage-meb", label: "Anlage MEB — Mehrbedarf Ernährung", desc: "Mehrbedarf für kostenaufwändige Ernährung." },
          { slug: "anlage-uf", label: "Anlage UF — Unfallfragebogen", desc: "Fragebogen zu Unfall/Schaden durch Dritte." },
          { slug: "anlage-se", label: "Anlage SE — Schweigepflichtentbindung", desc: "Entbindung von der ärztlichen Schweigepflicht." },
          { slug: "anlage-uh1", label: "Anlage UH1 — Unterhalt nach Trennung", desc: "Unterhalt nach Trennung/Scheidung." },
          { slug: "anlage-uh2", label: "Anlage UH2 — Unterhalt Schwangere", desc: "Unterhalt für schwangere Personen." },
          { slug: "anlage-uh3", label: "Anlage UH3 — Kindesunterhalt", desc: "Kindesunterhalt vom abwesenden Elternteil." },
          { slug: "nichterreichbarkeit", label: "Nichterreichbarkeit", desc: "Meldung vorübergehender Abwesenheit beim Jobcenter." },
          { slug: "arbeitsbescheinigung", label: "Arbeitsbescheinigung", desc: "Bescheinigung des Arbeitgebers — wird NUR vom Arbeitgeber ausgefüllt." },
          { slug: "antragsruecknahme", label: "Antragsrücknahme", desc: "Rücknahme eines eingereichten Bürgergeld-Antrags." },
        ],
      },
    ],
  },
  {
    id: "wohngeld",
    icon: "🏡",
    title: "Wohngeld",
    items: [
      { slug: "wohngeld", label: "Wohngeld", desc: "Finanzielle Unterstützung für Wohnkosten." },
    ],
  },
  {
    id: "posao",
    icon: "💼",
    title: "Arbeit & Karriere",
    items: [
      { slug: "krankenkasse", label: "Krankenkasse", desc: "Anmeldung zur Krankenversicherung in Deutschland." },
      { slug: "steuerklassenwechsel", label: "Steuerklassenwechsel", desc: "Änderung der Steuerklasse, z. B. nach Heirat." },
      { slug: "arbeitslosengeld", label: "Arbeitslosengeld I", desc: "Leistung bei Arbeitslosigkeit, wenn Voraussetzungen erfüllt sind." },
    ],
  },
  {
    id: "obrazovanje",
    icon: "🎓",
    title: "Bildung",
    items: [
      { slug: "bafoeg", label: "BAföG", desc: "Finanzielle Förderung für Studium oder Schule." },
      { slug: "schueler-bafoeg", label: "Schüler-BAföG", desc: "Finanzielle Förderung für Schüler, die getrennt von den Eltern leben." },
      { slug: "integrationskurs", label: "Integrationskurs", desc: "Sprach- und Orientierungskurs." },
    ],
  },
  {
    id: "dokumenti",
    icon: "📋",
    title: "Dokumente & Nachweise",
    items: [
      { slug: "grundsicherung", label: "Grundsicherung im Alter", desc: "Grundlegende Hilfe für ältere Menschen und Menschen mit Behinderung." },
      { slug: "fuehrungszeugnis", label: "Führungszeugnis", desc: "Bescheinigung über Vorstrafen." },
      { slug: "kirchenaustritt", label: "Kirchenaustritt", desc: "Austritt aus der Kirche zur Beendigung der Kirchensteuer." },
    ],
  },
];
/** Flat list of all unique slugs for search */
export function getAllFormEntries(): FormEntry[] {
  const seen = new Set<string>();
  const result: FormEntry[] = [];
  for (const group of formCatalog) {
    for (const item of group.items) {
      if (!seen.has(item.slug)) {
        seen.add(item.slug);
        result.push(item);
      }
    }
    if (group.subGroups) {
      for (const sub of group.subGroups) {
        for (const item of sub.items) {
          if (!seen.has(item.slug)) {
            seen.add(item.slug);
            result.push(item);
          }
        }
      }
    }
  }
  return result;
}
