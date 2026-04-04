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
    embassyUrl: 'https://www.sarajevo.diplo.de',
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
    embassyUrl: 'https://www.belgrad.diplo.de',
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
    embassyUrl: 'https://www.podgorica.diplo.de',
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
    embassyUrl: 'https://www.skopje.diplo.de',
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
    embassyUrl: 'https://www.tirana.diplo.de',
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
    embassyUrl: 'https://www.pristina.diplo.de',
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
    legalBasis: '§ 18 AufenthG',
    documents: [
      'Reisepass (gültig min. 6 Monate)',
      'Biometrisches Lichtbild',
      'Arbeitsvertrag oder verbindliches Stellenangebot',
      'Anerkannte Berufsqualifikation (Zeugnisse, Diplome)',
      'Krankenversicherungsnachweis',
      'Nachweis über gesicherten Lebensunterhalt',
      'Ausgefülltes Antragsformular'
    ],
    warnings: [],
    difficulty: 'medium',
    timeValue: 2,
    timeUnit: 'months',
    ctaUrl: 'https://www.make-it-in-germany.com/de/visum-aufenthalt/arten/arbeit',
    sources: [
      { labelKey: 'source_bamf', url: 'https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/Arbeit/arbeit-node.html' },
      { labelKey: 'source_makeitingermany', url: 'https://www.make-it-in-germany.com/de/visum-aufenthalt/arten/arbeit' }
    ]
  },
  {
    id: 'blue_card',
    titleKey: 'route_blue_card',
    subtitleKey: 'route_bluecard_sub',
    legalBasis: '§ 18g AufenthG',
    documents: [
      'Reisepass (gültig min. 6 Monate)',
      'Biometrisches Lichtbild',
      'Anerkannter Hochschulabschluss',
      'Arbeitsvertrag mit Mindestgehalt (2025: 45.300 € / Mangelberufe: 41.041,80 €)',
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
      'Reisepass (gültig min. 6 Monate)',
      'Biometrisches Lichtbild',
      'Heiratsurkunde oder Geburtsurkunde (beglaubigt + übersetzt)',
      'Nachweis des Aufenthaltstitels des in DE lebenden Familienmitglieds',
      'Nachweis ausreichender Deutschkenntnisse (A1)',
      'Nachweis über gesicherten Lebensunterhalt und ausreichenden Wohnraum',
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
      'Reisepass (gültig min. 6 Monate)',
      'Biometrisches Lichtbild',
      'Zulassungsbescheid einer deutschen Hochschule',
      'Nachweis über Sprachkenntnisse (Deutsch B2/C1 oder Englisch)',
      'Nachweis über gesicherten Lebensunterhalt (Sperrkonto ~11.208 €/Jahr)',
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
      { labelKey: 'source_makeitingermany', url: 'https://www.make-it-in-germany.com/de/visum-aufenthalt/arten/studium' }
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
      'Ausreichende Rentenanwartschaften',
      'Deutschkenntnisse min. B1',
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
      { labelKey: 'source_makeitingermany', url: 'https://www.make-it-in-germany.com/de/visum-aufenthalt/arten/niederlassungserlaubnis' }
    ]
  }
];
