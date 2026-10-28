export interface VisaCountry {
  code: string;
  nameKey: string;
  group: 'eu' | 'western_balkans';
  isEU: boolean;
  flagUrl: string;
  embassyUrl: string;
  embassyLabel: string;
  routes: string[];
  notes: string[];
  sources: VisaSource[];
}

export interface VisaRoute {
  id: string;
  titleKey: string;
  subtitleKey: string;
  legalBasis: string;
  documents: string[];
  warnings: string[];
  difficulty: 'low' | 'medium' | 'high';
  timeValue: number;
  timeUnit: 'weeks' | 'months';
  ctaUrl: string;
  sources: VisaSource[];
}

export interface VisaSource {
  labelKey: string;
  url: string;
}

export const VISA_COUNTRIES: VisaCountry[] = [
  {
    code: 'hr',
    nameKey: 'country_hr',
    group: 'eu',
    isEU: true,
    flagUrl: 'https://flagcdn.com/h24/hr.png',
    embassyUrl: 'https://zagreb.diplo.de',
    embassyLabel: 'Deutsche Botschaft Zagreb',
    routes: [],
    notes: [],
    sources: [
      { labelKey: 'source_youreurope', url: 'https://europa.eu/youreurope/citizens/travel/entry-exit/eu-citizens/index_de.htm' }
    ]
  },
  {
    code: 'si',
    nameKey: 'country_si',
    group: 'eu',
    isEU: true,
    flagUrl: 'https://flagcdn.com/h24/si.png',
    embassyUrl: 'https://laibach.diplo.de',
    embassyLabel: 'Deutsche Botschaft Ljubljana',
    routes: [],
    notes: [],
    sources: [
      { labelKey: 'source_youreurope', url: 'https://europa.eu/youreurope/citizens/travel/entry-exit/eu-citizens/index_de.htm' }
    ]
  },
  {
    code: 'ba',
    nameKey: 'country_ba',
    group: 'western_balkans',
    isEU: false,
    flagUrl: 'https://flagcdn.com/h24/ba.png',
    embassyUrl: 'https://sarajevo.diplo.de',
    embassyLabel: 'Deutsche Botschaft Sarajevo',
    routes: ['work', 'blue_card', 'family', 'study', 'extension', 'permanent'],
    notes: [],
    sources: [
      { labelKey: 'source_bamf', url: 'https://www.bamf.de/DE/Themen/MigrationAufenthalt/migrationaufenthalt-node.html' },
      { labelKey: 'source_auswamt', url: 'https://www.auswaertiges-amt.de/de/ReiseUndSicherheit/reise-und-sicherheitshinweise' },
      { labelKey: 'source_makeitingermany', url: 'https://www.make-it-in-germany.com/de/visum-aufenthalt' }
    ]
  },
  {
    code: 'rs',
    nameKey: 'country_rs',
    group: 'western_balkans',
    isEU: false,
    flagUrl: 'https://flagcdn.com/h24/rs.png',
    embassyUrl: 'https://belgrad.diplo.de',
    embassyLabel: 'Deutsche Botschaft Belgrad',
    routes: ['work', 'blue_card', 'family', 'study', 'extension', 'permanent'],
    notes: [],
    sources: [
      { labelKey: 'source_bamf', url: 'https://www.bamf.de/DE/Themen/MigrationAufenthalt/migrationaufenthalt-node.html' },
      { labelKey: 'source_auswamt', url: 'https://www.auswaertiges-amt.de/de/ReiseUndSicherheit/reise-und-sicherheitshinweise' },
      { labelKey: 'source_makeitingermany', url: 'https://www.make-it-in-germany.com/de/visum-aufenthalt' }
    ]
  },
  {
    code: 'me',
    nameKey: 'country_me',
    group: 'western_balkans',
    isEU: false,
    flagUrl: 'https://flagcdn.com/h24/me.png',
    embassyUrl: 'https://podgorica.diplo.de',
    embassyLabel: 'Deutsche Botschaft Podgorica',
    routes: ['work', 'blue_card', 'family', 'study', 'extension', 'permanent'],
    notes: [],
    sources: [
      { labelKey: 'source_bamf', url: 'https://www.bamf.de/DE/Themen/MigrationAufenthalt/migrationaufenthalt-node.html' },
      { labelKey: 'source_auswamt', url: 'https://www.auswaertiges-amt.de/de/ReiseUndSicherheit/reise-und-sicherheitshinweise' },
      { labelKey: 'source_makeitingermany', url: 'https://www.make-it-in-germany.com/de/visum-aufenthalt' }
    ]
  },
  {
    code: 'mk',
    nameKey: 'country_mk',
    group: 'western_balkans',
    isEU: false,
    flagUrl: 'https://flagcdn.com/h24/mk.png',
    embassyUrl: 'https://skopje.diplo.de',
    embassyLabel: 'Deutsche Botschaft Skopje',
    routes: ['work', 'blue_card', 'family', 'study', 'extension', 'permanent'],
    notes: [],
    sources: [
      { labelKey: 'source_bamf', url: 'https://www.bamf.de/DE/Themen/MigrationAufenthalt/migrationaufenthalt-node.html' },
      { labelKey: 'source_auswamt', url: 'https://www.auswaertiges-amt.de/de/ReiseUndSicherheit/reise-und-sicherheitshinweise' },
      { labelKey: 'source_makeitingermany', url: 'https://www.make-it-in-germany.com/de/visum-aufenthalt' }
    ]
  },
  {
    code: 'al',
    nameKey: 'country_al',
    group: 'western_balkans',
    isEU: false,
    flagUrl: 'https://flagcdn.com/h24/al.png',
    embassyUrl: 'https://tirana.diplo.de',
    embassyLabel: 'Deutsche Botschaft Tirana',
    routes: ['work', 'blue_card', 'family', 'study', 'extension', 'permanent'],
    notes: [],
    sources: [
      { labelKey: 'source_bamf', url: 'https://www.bamf.de/DE/Themen/MigrationAufenthalt/migrationaufenthalt-node.html' },
      { labelKey: 'source_auswamt', url: 'https://www.auswaertiges-amt.de/de/ReiseUndSicherheit/reise-und-sicherheitshinweise' },
      { labelKey: 'source_makeitingermany', url: 'https://www.make-it-in-germany.com/de/visum-aufenthalt' }
    ]
  },
  {
    code: 'xk',
    nameKey: 'country_xk',
    group: 'western_balkans',
    isEU: false,
    flagUrl: 'https://flagcdn.com/h24/xk.png',
    embassyUrl: 'https://pristina.diplo.de',
    embassyLabel: 'Deutsche Botschaft Pristina',
    routes: ['work', 'blue_card', 'family', 'study', 'extension', 'permanent'],
    notes: [],
    sources: [
      { labelKey: 'source_bamf', url: 'https://www.bamf.de/DE/Themen/MigrationAufenthalt/migrationaufenthalt-node.html' },
      { labelKey: 'source_auswamt', url: 'https://www.auswaertiges-amt.de/de/ReiseUndSicherheit/reise-und-sicherheitshinweise' },
      { labelKey: 'source_makeitingermany', url: 'https://www.make-it-in-germany.com/de/visum-aufenthalt' }
    ]
  }
];

export const VISA_ROUTES: VisaRoute[] = [
  {
    id: 'work',
    titleKey: 'route_work',
    subtitleKey: 'route_work_sub',
    legalBasis: '§ 18a/§ 18b AufenthG (Fachkräfte); § 19c Abs. 1 AufenthG + § 26 Abs. 2 BeschV (Westbalkan)',
    documents: [
      'Reisepass (Restgültigkeit nach aktueller Botschaftscheckliste)',
      'Biometrisches Lichtbild',
      'Arbeitsvertrag oder verbindliches Stellenangebot',
      'Qualifikationsnachweise je nach Aufenthaltsweg; Westbalkan grundsätzlich ohne Anerkennung, reglementierte Berufe ausgenommen',
      'Krankenversicherungsnachweis',
      'Nachweis über gesicherten Lebensunterhalt',
      'Ausgefülltes Antragsformular'
    ],
    warnings: [],
    difficulty: 'medium',
    timeValue: 2,
    timeUnit: 'months',
    ctaUrl: 'https://www.make-it-in-germany.com/de/visum/arten/arbeiten',
    sources: [
      { labelKey: 'source_bamf', url: 'https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/Arbeit/arbeit-node.html' },
      { labelKey: 'source_makeitingermany', url: 'https://www.make-it-in-germany.com/de/visum/arten/arbeiten' }
    ]
  },
  {
    id: 'blue_card',
    titleKey: 'route_blue_card',
    subtitleKey: 'route_bluecard_sub',
    legalBasis: '§ 18g AufenthG',
    documents: [
      'Reisepass (Restgültigkeit nach aktueller Botschaftscheckliste)',
      'Biometrisches Lichtbild',
      'Anerkannter Hochschulabschluss',
      'Arbeitsvertrag mit Mindestgehalt (2026: 50.700 € / Mangelberufe, Berufseinsteiger und besondere IT-Fälle mit BA-Zustimmung: 45.934,20 €)',
      'Krankenversicherungsnachweis',
      'Ausgefülltes Antragsformular'
    ],
    warnings: [],
    difficulty: 'medium',
    timeValue: 2,
    timeUnit: 'months',
    ctaUrl: 'https://www.make-it-in-germany.com/de/visum-aufenthalt/arten/blaue-karte-eu',
    sources: [
      { labelKey: 'source_bamf', url: 'https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/Arbeit/BlaueKarte/blaue-karte-node.html' },
      { labelKey: 'source_makeitingermany', url: 'https://www.make-it-in-germany.com/de/visum-aufenthalt/arten/blaue-karte-eu' }
    ]
  },
  {
    id: 'family',
    titleKey: 'route_family',
    subtitleKey: 'route_family_sub',
    legalBasis: '§§ 27–36 AufenthG',
    documents: [
      'Reisepass (Restgültigkeit nach aktueller Botschaftscheckliste)',
      'Biometrisches Lichtbild',
      'Heirats-/Geburtsurkunde: Form, Übersetzung und gegebenenfalls Apostille/Legalisation laut zuständiger Botschaft',
      'Nachweis des Aufenthaltstitels des in DE lebenden Familienmitglieds',
      'A1-Nachweis für Ehepartner, soweit erforderlich; gesetzliche Ausnahmen prüfen',
      'Lebensunterhalt/Wohnraum soweit für die konkrete Familiennachzugsroute erforderlich',
      'Krankenversicherungsnachweis'
    ],
    warnings: [],
    difficulty: 'medium',
    timeValue: 3,
    timeUnit: 'months',
    ctaUrl: 'https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/Familie/familie-node.html',
    sources: [
      { labelKey: 'source_bamf', url: 'https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/Familie/familie-node.html' }
    ]
  },
  {
    id: 'study',
    titleKey: 'route_study',
    subtitleKey: 'route_study_sub',
    legalBasis: '§ 16b AufenthG',
    documents: [
      'Reisepass (Restgültigkeit nach aktueller Botschaftscheckliste)',
      'Biometrisches Lichtbild',
      'Zulassungsbescheid einer deutschen Hochschule',
      'Nachweis über Sprachkenntnisse (Deutsch B2/C1 oder Englisch)',
      'Nachweis über gesicherten Lebensunterhalt (2026 z. B. Sperrkonto 11.904 €/Jahr / 992 €/Monat; auch Stipendium oder Verpflichtungserklärung möglich)',
      'Krankenversicherungsnachweis',
      'Schulzeugnisse und Abitur (anerkannt oder Äquivalenz)'
    ],
    warnings: [],
    difficulty: 'medium',
    timeValue: 2,
    timeUnit: 'months',
    ctaUrl: 'https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/Studium/studium-node.html',
    sources: [
      { labelKey: 'source_bamf', url: 'https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/Studium/studium-node.html' },
      { labelKey: 'source_makeitingermany', url: 'https://www.make-it-in-germany.com/de/visum/arten/studieren' }
    ]
  },
  {
    id: 'extension',
    titleKey: 'route_extension',
    subtitleKey: 'route_extension_sub',
    legalBasis: '§ 8 AufenthG',
    documents: [
      'Gültiger Reisepass',
      'Aktuelles biometrisches Lichtbild',
      'Aktueller Aufenthaltstitel (vor Ablauf verlängern!)',
      'Nachweis über gesicherten Lebensunterhalt',
      'Nachweis über Krankenversicherung',
      'Meldebescheinigung'
    ],
    warnings: [],
    difficulty: 'low',
    timeValue: 6,
    timeUnit: 'weeks',
    ctaUrl: 'https://www.bamf.de/DE/Themen/MigrationAufenthalt/migrationaufenthalt-node.html',
    sources: [
      { labelKey: 'source_bamf', url: 'https://www.bamf.de/DE/Themen/MigrationAufenthalt/migrationaufenthalt-node.html' }
    ]
  },
  {
    id: 'permanent',
    titleKey: 'route_permanent',
    subtitleKey: 'route_permanent_sub',
    legalBasis: '§ 9 AufenthG (NE) / § 9a AufenthG (Erlaubnis zum Daueraufenthalt-EU)',
    documents: [
      'Gültiger Reisepass',
      'Aktuelles biometrisches Lichtbild',
      'Nachweis über 5 Jahre rechtmäßigen Aufenthalt in Deutschland',
      'Nachweis über gesicherten Lebensunterhalt (ohne Sozialleistungen)',
      'Angemessene Altersvorsorge nach Aufenthaltsweg; §9 in der Regel 60 Beitragsmonate, §9a separat prüfen',
      'Deutschkenntnisse in der Regel B1 beim allgemeinen §9-Weg; Ausnahmen/Sonderwege prüfen',
      'Grundkenntnisse der Rechts- und Gesellschaftsordnung',
      'Meldebescheinigung',
      'Nachweis über Krankenversicherung'
    ],
    warnings: [],
    difficulty: 'high',
    timeValue: 3,
    timeUnit: 'months',
    ctaUrl: 'https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/DauerhafterAufenthalt/dauerhafter-aufenthalt-node.html',
    sources: [
      { labelKey: 'source_bamf', url: 'https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/DauerhafterAufenthalt/dauerhafter-aufenthalt-node.html' },
      { labelKey: 'source_makeitingermany', url: 'https://www.make-it-in-germany.com/de/visum-aufenthalt/dauerhaft-in-deutschland/niederlassungserlaubnis' }
    ]
  }
];
