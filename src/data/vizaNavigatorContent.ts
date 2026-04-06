export interface RouteContent {
  id: string;
  title: string;
  legalBasis: string;
  subtitle: string;
  westbalkanNote?: string;
  kosovoNote?: string;
  /** Highlight box shown below subtitle for ausbildung routes */
  ausbildungHighlight?: string[];
  /** Country-specific embassy notes for ausbildung */
  countryNotes?: string[];
  /** Country-specific badge label */
  countryBadge?: string;
  steps: string[];
  documents: string[];
  costs: string[];
  errors: string[];
  sources: { label: string; url: string }[];
  musterformulare: { title: string; subtitle: string; formKey: string; downloadUrl?: string }[];
}

export interface CountryContent {
  code: string;
  name: string;
  flag: string;
  isEU: boolean;
  embassyName: string;
  embassyUrl: string;
  embassyNote: string;
  schengenFree?: boolean;
  schengenNote?: string;
  kosovoNote?: string;
  routes: RouteContent[];
}

export const COUNTRY_CONTENT: CountryContent[] = [
  {
    code: 'hr',
    name: 'Hrvatska',
    flag: 'https://flagcdn.com/h24/hr.png',
    isEU: true,
    embassyName: 'Deutsche Botschaft Zagreb',
    embassyUrl: 'https://zagreb.diplo.de',
    embassyNote: 'Kao EU građanin ne trebaš vizu za Njemačku.',
    routes: [{
      id: 'eu_info',
      title: 'EU Sloboda kretanja — FreizügG/EU',
      legalBasis: 'FreizügG/EU + § 4a FreizügG/EU',
      subtitle: 'Kao hrvatski državljanin imaš pravo slobodnog kretanja u cijeloj EU. Nema vize, nema posebnih dozvola.',
      steps: [
        'Ulazak u Njemačku — bez vize, bez posebnih dozvola. Samo važeća osobna iskaznica ili putovnica.',
        'Anmeldung (Prijava boravišta) — unutar 14 dana od useljenja kod lokalnog Einwohnermeldeamt. Potrebna: Wohnungsgeberbestätigung od stanodavca.',
        'Zdravstveno osiguranje — zaključi zakonsko (GKV: TK, AOK, DAK) ili privatno zdravstveno osiguranje. Obavezno za sve.',
        'Bankovni račun — otvori tekući račun (DKB, N26, Commerzbank, Sparkasse).',
        'Steuer-ID — automatski se dodjeljuje nakon Anmeldung, stiže poštom za 2–4 tjedna.',
        'Zaposlenje — ne trebaš radnu dozvolu. Direktna prijava kod poslodavca ili registracija kod Jobcenter-a.',
        'Stalni boravak — nakon 5 godina kontinuiranog boravka apliciraj za Niederlassungserlaubnis (§ 4a FreizügG/EU) kod lokalne Ausländerbehörde.'
      ],
      documents: [
        'Važeća osobna iskaznica ili putovnica',
        'Za Anmeldung: Wohnungsgeberbestätigung od stanodavca (obavezno!)',
        'Za zaposlenje: životopis, diplome, certifikati',
        'Za Niederlassungserlaubnis (nakon 5 god.): dokaz kontinuiranog boravka, B1 njemacki, penzijsko osiguranje'
      ],
      costs: [
        'Ulazak: besplatno',
        'Anmeldung: besplatno',
        'Zdravstveno osiguranje: od 110 €/mj. (GKV studenti) do 200+ €/mj.',
        'Niederlassungserlaubnis (nakon 5 god.): 113 €'
      ],
      errors: [
        'Ne prijaviti boravište (Anmeldung) unutar 14 dana — kazna do 1.000 €!',
        'Zaboraviti zdravstveno osiguranje — obavezno za sve, bez iznimke',
        'Misliti da ti kao EU građanin ne treba ništa — Anmeldung je OBAVEZNA!'
      ],
      sources: [
        { label: 'Your Europe — EU Freizügigkeit', url: 'https://europa.eu/youreurope/citizens/travel/entry-exit/eu-citizens/index_de.htm' },
        { label: 'Make it in Germany — EU Bürger', url: 'https://www.make-it-in-germany.com/de/visum-aufenthalt/arten/eu-buerger' },
        { label: 'BAMF — EU Freizügigkeit', url: 'https://www.bamf.de/DE/Themen/MigrationAufenthalt/FreizuegigkeitEU/freizuegigkeiteu-node.html' }
      ],
      musterformulare: []
    }]
  },
  {
    code: 'si',
    name: 'Slovenija',
    flag: 'https://flagcdn.com/h24/si.png',
    isEU: true,
    embassyName: 'Deutsche Botschaft Ljubljana',
    embassyUrl: 'https://laibach.diplo.de',
    embassyNote: 'Kot EU državljan ne potrebuješ vizuma za Nemčijo.',
    routes: [{
      id: 'eu_info',
      title: 'EU Svoboda gibanja — FreizügG/EU',
      legalBasis: 'FreizügG/EU + § 4a FreizügG/EU',
      subtitle: 'Kot slovenski državljan imaš pravico do prostega gibanja v celotni EU. Brez vizuma, brez posebnih dovoljenj.',
      steps: [
        'Vstop v Nemčijo — brez vizuma, samo veljavna osebna izkaznica ali potni list.',
        'Anmeldung — v 14 dneh po vselitvi pri lokalnem Einwohnermeldeamt. Potrebuješ: Wohnungsgeberbestätigung od najemodajalca.',
        'Zdravstveno zavarovanje — zakonsko (GKV) ali zasebno. Obvezno za vse.',
        'Bančni račun — odpri tekoči račun (DKB, N26, Commerzbank).',
        'Steuer-ID — samodejno dodeljena po Anmeldung, prispe po pošti v 2–4 tednih.',
        'Zaposlitev — ni potrebno delovno dovoljenje.',
        'Stalno bivanje — po 5 letih zveznega bivanja (§ 4a FreizügG/EU).'
      ],
      documents: [
        'Veljavna osebna izkaznica ali potni list',
        'Za Anmeldung: Wohnungsgeberbestätigung',
        'Za zaposlitev: življenjepis, diplome, certifikati'
      ],
      costs: [
        'Vstop: brezplačno',
        'Anmeldung: brezplačno',
        'Stalno bivanje (po 5 letih): 113 €'
      ],
      errors: [
        'Pozabiti Anmeldung v 14 dneh — kazen do 1.000 €!',
        'Pozabiti zdravstveno zavarovanje — obvezno!'
      ],
      sources: [
        { label: 'Your Europe — EU Freizügigkeit', url: 'https://europa.eu/youreurope/citizens/travel/entry-exit/eu-citizens/index_de.htm' },
        { label: 'Make it in Germany', url: 'https://www.make-it-in-germany.com/de/visum-aufenthalt/arten/eu-buerger' }
      ],
      musterformulare: []
    }]
  },
  {
    code: 'ba',
    name: 'Bosna i Hercegovina',
    flag: 'https://flagcdn.com/h24/ba.png',
    isEU: false,
    embassyName: 'Njemacka ambasada Sarajevo',
    embassyUrl: 'https://www.sarajevo.diplo.de',
    embassyNote: 'Termini TAGESAKTUELL — svaki dan objavljuju nove termine. Provjeri svako jutro na sarajevo.diplo.de!',
    schengenFree: true,
    schengenNote: 'Državljani BiH s biometrijskim pasošem mogu bez vize u Schengen do 90 dana (turizam, poslovni posjeti). Za rad i duži boravak OBAVEZNA viza!',
    routes: [
      {
        id: 'work',
        title: 'Radna viza §18 AufenthG',
        legalBasis: '§ 18 AufenthG + § 26 Abs. 2 BeschV (Westbalkan-Regelung)',
        subtitle: 'Boravišna dozvola za zaposlenje. BiH je dio Westbalkan-Regelung — možeš raditi bez priznatih kvalifikacija.',
        westbalkanNote: 'WESTBALKAN-REGELUNG AKTIVAN: Kao državljanin BiH možeš raditi u Njemačkoj bez provjere prioriteta i BEZ dokaza o kvalifikaciji (§ 26 Abs. 2 BeschV). Kontingent: 50.000 viza godišnje. Vrijedi trajno (bez roka isteka). NOVO od juna 2024: Vorabzustimmung od Bundesagentur für Arbeit ubrzava postupak — poslodavac je pribavlja PRIJE nego ti zakažeš termin. Termini u Sarajevu: TAGESAKTUELL — provjeri svako jutro!',
        steps: [
          'Pronađi posao — Traži njemackog poslodavca koji ti daje obavezujuću ponudu posla ili ugovor o radu. Bez ponude posla nema Westbalkan vize.',
          'Poslodavac pribavlja Vorabzustimmung — Tvoj njemacki poslodavac podnosi zahtjev za Vorabzustimmung (prethodnu saglasnost) Bundesagentur für Arbeit na: arbeitsagentur.de/westbalkanregelung. S Vorabzustimmung dobijaš Kundennummer za zakazivanje termina.',
          'Zakaži termin u ambasadi Sarajevo — Na sarajevo.diplo.de provjeri svako jutro (tagesaktuell). S Vorabzustimmung imaš prednost i bržu obradu. Bez Vorabzustimmung moraš čekati losverfahren.',
          'Pripremi dokumentaciju — Pasoš (min. 18 mj. važenja), EzB popunjena i potpisana od poslodavca, Vorabzustimmung, 2 digitalne biometrijske fotografije, ugovor o radu.',
          'Apliciraj za vizu — Lično se javi u ambasadu Sarajevo. Uzimaju se otisci prstiju i fotografija. Naknada: 75 €.',
          'Ulazak u Njemačku — S D-vizom (nacionalna viza) uđi u Njemačku. Viza uglavnom vrijedi 6 mj.',
          'Anmeldung — U roku 14 dana od useljenja prijavi boravište u Einwohnermeldeamt. Dobijaš Meldebescheinigung.',
          'Ausländerbehörde — Podnesi zahtjev za Aufenthaltserlaubnis §18 AufenthG PRIJE isteka D-vize. Donesi: pasoš, Meldebescheinigung, ugovor o radu, zdravstveno osiguranje, fotografije.'
        ],
        documents: [
          'Pasoš — važeći min. 18 mjeseci od planiranog ulaska',
          '2 digitalne biometrijske fotografije (od 01.05.2025 ISKLJUČIVO digitalne — ne analogno!)',
          'Erklärung zum Beschäftigungsverhältnis (EzB) — popunjava i potpisuje POSLODAVAC, ne ti',
          'Vorabzustimmung Bundesagentur für Arbeit (Kundennummer)',
          'Ugovor o radu ili obavezujuća ponuda posla',
          'Meldebescheinigung (nakon Anmeldung u Njemačkoj)',
          'Dokaz o zdravstvenom osiguranju (GKV ili PKV)',
          'Dokaz o stanovanju (ugovor o najmu ili Wohnraumbestätigung)'
        ],
        costs: [
          'D-Viza (Ambasada Sarajevo): 75 €',
          'Aufenthaltserlaubnis (Ausländerbehörde, Njemačka): 100–110 €',
          'Rok obrade ambasade Sarajevo: 4–8 sedmica',
          'Rok obrade Ausländerbehörde: 4–8 sedmica'
        ],
        errors: [
          'Ne čekati na Vorabzustimmung — bez nje termini su rijetki (losverfahren)!',
          'EzB nepopunjena ili bez potpisa i pečata poslodavca — najčešći razlog odbijanja',
          'Nedigitalne fotografije (od 01.05.2025 SAMO digitalne biometrijske!)',
          'Rad prije nego što je Aufenthaltserlaubnis izdat — krivično djelo!',
          'Prekasno apliciranje za produženje — uvijek 6–8 sedmica PRIJE isteka'
        ],
        sources: [
          { label: 'Ambasada Sarajevo — Westbalkan termini', url: 'https://www.sarajevo.diplo.de' },
          { label: 'Bundesagentur für Arbeit — Westbalkanregelung', url: 'https://www.arbeitsagentur.de/unternehmen/fachkraefte-ausland/westbalkanregelung' },
          { label: 'Make it in Germany — Westbalkan', url: 'https://www.make-it-in-germany.com/de/visum-aufenthalt/arten/arbeit/westbalkan-regelung' },
          { label: 'BAMF — Arbeit §18', url: 'https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/Arbeit/arbeit-node.html' },
          { label: 'Auswärtiges Amt — Westbalkan', url: 'https://sarajewo.diplo.de/ba-de/service/westbalkanregelung-2550504' }
        ],
        musterformulare: [
          { title: 'Musterformular 1: Antrag auf Aufenthaltserlaubnis', subtitle: 'Popunjen primjer za radnu vizu §18 AufenthG', formKey: 'VisaWorkForm1', downloadUrl: 'https://www.bamf.de' },
          { title: 'Musterformular 2: Erklärung zum Beschäftigungsverhältnis (EzB)', subtitle: 'Formular koji popunjava POSLODAVAC — primjer popunjavanja', formKey: 'VisaWorkForm2', downloadUrl: 'https://www.arbeitsagentur.de/datei/ezb_ba047549.pdf' }
        ]
      },
      {
        id: 'bluecard',
        title: 'EU Plava karta §18g AufenthG',
        legalBasis: '§ 18g AufenthG + EU direktiva 2021/1883',
        subtitle: 'Najbrži put do stalnog boravka za visokokvalificirane s diplomom i ponudom posla min. 45.300 €/god.',
        steps: [
          'Provjeri diplomu na anabin.kmk.org — mora biti "H+" i "entspricht/gleichwertig". Bez ovoga Blue Card nije moguća.',
          'Osiguraj ugovor o radu s platom — min. 45.300 €/god. (standard) ili 41.041,80 €/god. (MINT, IT, medicina, njega = Mangelberufe 2025).',
          'Zakaži termin u ambasadi Sarajevo — sarajevo.diplo.de. Tagesaktuell. Blue Card NE zahtijeva Vorabzustimmung Bundesagentur für Arbeit — to je velika prednost!',
          'Apliciraj za vizu — Lično u ambasadu. Kompletna dokumentacija uključujući AUFENTHG-034.',
          'Ulazak u Njemačku s D-vizom.',
          'Anmeldung — 14 dana od useljenja.',
          'Ausländerbehörde — Zatraži EU Plavu kartu §18g. Bez saglasnosti Bundesagentur für Arbeit! Karta vrijedi: trajanje ugovora + 3 mj., max. 4 god.',
          'NE nakon 21/33 mj. — s B1 njemackim nakon 21 mj., bez jezičnog dokaza nakon 33 mj. možeš aplicirati za Niederlassungserlaubnis.'
        ],
        documents: [
          'Pasoš — min. 18 mj. važenja',
          '2 digitalne biometrijske fotografije',
          'AUFENTHG-034 (Antrag Blaue Karte EU) — popunjen',
          'Diploma — original + ovjereni prijevod na njemacki',
          'Dokaz o priznavanju diplome (anabin.kmk.org ispis ili ZAB potvrda)',
          'Ugovor o radu s navedenom godišnjom platom (min. 45.300 € ili 41.041,80 € za Mangelberufe)',
          'Dokaz o zdravstvenom osiguranju važećem za Njemačku',
          'Mietvertrag ili potvrda o stanovanju'
        ],
        costs: [
          'D-Viza: 75 €',
          'EU Plava karta (Ausländerbehörde, Ersterteilung): 100–110 €',
          'Produženje: 96 €',
          'Anerkennungsverfahren ZAB (ako je potrebno): ca. 200 €',
          'Rok obrade: 4–8 sedmica'
        ],
        errors: [
          'Diploma nije provjerna na anabin.kmk.org PRIJE aplikacije — najčešći problem!',
          'Plata u ugovoru ispod minimuma — zahtjev automatski odbijen',
          'Promjena poslodavca bez obavještavanja Ausländerbehörde (obavezno u prvih 2 god.)',
          'Brkanje s Westbalkan-Regelung — ta vrijedi za §18, NE za Blue Card §18g'
        ],
        sources: [
          { label: 'Ambasada Sarajevo', url: 'https://www.sarajevo.diplo.de' },
          { label: 'BAMF — Blaue Karte EU', url: 'https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/Arbeit/BlaueKarte/blaue-karte-node.html' },
          { label: 'Make it in Germany — Blue Card', url: 'https://www.make-it-in-germany.com/de/visum-aufenthalt/arten/blaue-karte-eu' },
          { label: 'anabin — provjera diploma', url: 'https://anabin.kmk.org' }
        ],
        musterformulare: [
          { title: 'Musterformular: Antrag Blaue Karte EU (AUFENTHG-034)', subtitle: 'Popunjen primjer za EU Plavu kartu za BiH', formKey: 'VisaBluecardForm', downloadUrl: 'https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/Arbeit/BlaueKarte/blaue-karte-node.html' }
        ]
      },
      {
        id: 'family',
        title: 'Spajanje porodice §§27-36 AufenthG',
        legalBasis: '§ 30 AufenthG (supružnici) + § 32 AufenthG (djeca)',
        subtitle: 'Supružnici, djeca i roditelji mogu doći k osobi koja ima važeću boravišnu dozvolu u Njemačkoj.',
        steps: [
          'Pohađaj tečaj njemackog A1 u BiH — Goethe-Institut Sarajevo ili Mostar nudi A1 kurseve. Supružnik mora položiti A1 ispit PRIJE ulaska. Iznimke: Blue Card supružnici, dokazana nemogućnost, djeca do 16 god.',
          'Pribavi i prevedi dokumente — Vjenčani list i rodni list djece: APOSTILLE OBAVEZNA za BiH javne isprave! Ovjereni prijevod od sudskog tumača na njemacki.',
          'Provjeri termin u ambasadi Sarajevo — Termini tagesaktuell. Rokovi aplikacije mogu biti dugi!',
          'Apliciraj za vizu — Lično u ambasadu sa svom dokumentacijom.',
          'Ulazak u Njemačku s D-vizom (Familiennachzug).',
          'Anmeldung — Prijavi cijelu porodicu unutar 14 dana.',
          'Ausländerbehörde — Zatraži Aufenthaltserlaubnis §30 (supružnik) ili §32 (djeca) PRIJE isteka vize.'
        ],
        documents: [
          'Pasoš (min. 18 mj. važenja)',
          '2 digitalne biometrijske fotografije',
          'Antrag auf Aufenthaltserlaubnis',
          'Vjenčani list s APOSTILLE + ovjereni prijevod na njemacki (OBAVEZNO za BiH!)',
          'Rodni list djece s APOSTILLE + ovjereni prijevod',
          'Goethe-Zertifikat A1 ili ÖSD A1 (za supružnike — iznimke postoje!)',
          'Kopija Aufenthaltstitel osobe u Njemačkoj',
          'Gehaltsabrechnungen posljednja 3 mj. osobe u Njemačkoj',
          'Ugovor o najmu (min. 12 m² po osobi u domaćinstvu)',
          'Zdravstveno osiguranje za sve ukućane'
        ],
        costs: [
          'D-Viza: 75 € (djeca do 18 g.: 37,50 €)',
          'A1 kurs (Goethe-Institut Sarajevo/Mostar): 200–400 €',
          'Goethe-Zertifikat A1 ispit: 70–120 €',
          'Apostille za BiH isprave: 20–50 € po dokumentu',
          'Ovjereni prijevod: 50–120 € po dokumentu',
          'Aufenthaltserlaubnis (Ausländerbehörde): 100–110 € (djeca: 50–55 €)'
        ],
        errors: [
          'A1 ispit nije položen PRIJE dolaska — bez njega viza odbijena (iznimke za Blue Card supružnike)',
          'NEMA APOSTILLE na BiH ispravama — obavezna za SVA javna dokumenta iz BiH!',
          'Prijevod nije od sudskog tumača — neovjereni prijevodi se NE primaju',
          'Stambeni prostor premali — min. 12 m² po osobi u domaćinstvu',
          'Termini tagesaktuell — provjeri sarajevo.diplo.de svako jutro!'
        ],
        sources: [
          { label: 'Ambasada Sarajevo', url: 'https://www.sarajevo.diplo.de' },
          { label: 'BAMF — Familiennachzug', url: 'https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/Familie/familie-node.html' },
          { label: 'Goethe-Institut Sarajevo', url: 'https://www.goethe.de/ins/ba/bs/index.html' },
          { label: 'Make it in Germany — Familiennachzug', url: 'https://www.make-it-in-germany.com/de/visum-aufenthalt/arten/familiennachzug' }
        ],
        musterformulare: [
          { title: 'Musterformular: Antrag auf Aufenthaltserlaubnis (Spajanje porodice)', subtitle: 'Popunjen primjer §§27-36 AufenthG za BiH', formKey: 'VisaFamilyForm', downloadUrl: 'https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/Familie/familie-node.html' }
        ]
      },
      {
        id: 'study',
        title: 'Studentska viza §16b AufenthG',
        legalBasis: '§ 16b AufenthG',
        subtitle: 'Boravišna dozvola za studij na njemackom sveučilištu. Bez školarine na državnim fakultetima!',
        steps: [
          'Prijava na sveučilište — Apliciraj direktno ili uni-assist.de. Potrebna Zulassung (potvrda o prijemu). Rokovi: zimski semestar (juli), ljetni (januar).',
          'Jezični ispit — TestDaF ili DSH za njemacki (B2/C1) ili IELTS/TOEFL za engleskojezične programe.',
          'Otvori Sperrkonto — Fintiba, Expatrio, Coracle ili Deutsche Bank. Uplati min. 11.208 € (2025). Potvrda je OBAVEZNA za vizu.',
          'Zakaži termin u ambasadi Sarajevo — sarajevo.diplo.de. Tagesaktuell.',
          'Apliciraj za vizu — Zulassung + Sperrkonto potvrda + jezični certifikat = minimum.',
          'Ulazak s D-vizom (Studium). Obično vrijedi 6 mj.',
          'Immatrikulacija — Upiši se na sveučilištu. Dobiješ Immatrikulationsbescheinigung.',
          'Anmeldung — 14 dana od useljenja.',
          'Ausländerbehörde — Aufenthaltserlaubnis §16b s Immatrikulationsbescheinigung + Sperrkonto potvrdom PRIJE isteka vize.'
        ],
        documents: [
          'Pasoš (min. 18 mj.)',
          '2 digitalne biometrijske fotografije',
          'Antrag auf Aufenthaltserlaubnis',
          'Zulassungsbescheid njemackog sveučilišta (potvrda o prijemu)',
          'TestDaF/DSH (B2/C1) ILI IELTS/TOEFL potvrda',
          'Sperrkonto potvrda — min. 11.208 €/god. (934 €/mj.), Stand 2025',
          'Matura ili ekvivalent + ovjereni prijevod',
          'Zdravstveno osiguranje za Njemačku'
        ],
        costs: [
          'Sperrkonto otvaranje: 50–200 € (Fintiba ca. 89 €)',
          'Sperrkonto iznos: min. 11.208 €/god. (oslobađa se 934 €/mj.)',
          'TestDaF: ca. 175–200 €',
          'D-Viza: 75 €',
          'Aufenthaltserlaubnis: 100–110 €',
          'Semestralni doprinos: 50–350 € (BEZ školarine na državnim!)'
        ],
        errors: [
          'Sperrkonto otvoren prekasno — otvaranje traje 2–4 sedmice, uplata još 1–2 sedmice!',
          'Eksmatrikulacija (ispisivanje) — automatski gasi boravišnu dozvolu!',
          'Prekoračenje limita rada — 140 dana ili 280 pola-dana godišnje',
          'Promjena studijskog programa bez obavještavanja Ausländerbehörde'
        ],
        sources: [
          { label: 'BAMF — Studium §16b', url: 'https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/Studium/studium-node.html' },
          { label: 'DAAD — Stipendije', url: 'https://www.daad.de/de/studieren-und-forschen-in-deutschland/stipendien/daad-stipendien/' },
          { label: 'Fintiba Sperrkonto', url: 'https://www.fintiba.com' },
          { label: 'Ambasada Sarajevo', url: 'https://www.sarajevo.diplo.de' }
        ],
        musterformulare: [
          { title: 'Musterformular: Antrag auf Aufenthaltserlaubnis (Studij)', subtitle: 'Popunjen primjer za studentsku vizu §16b za BiH', formKey: 'VisaStudyForm', downloadUrl: 'https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/Studium/studium-node.html' }
        ]
      },
      {
        id: 'permanent',
        title: 'Stalni boravak §9 + Daueraufenthalt-EU §9a',
        legalBasis: '§ 9 AufenthG (NE) + § 9a AufenthG (Daueraufenthalt-EU)',
        subtitle: 'Neograničena dozvola boravka. UVIJEK apliciraj za OBA zahtjeva istovremeno — ista cijena, dvostruka korist!',
        steps: [
          'Provjeri uvjete — Min. 5 god. zakonitog boravka, B1 njemacki, min. 60 mj. penzijskog osiguranja, osigurana egzistencija bez socijalne pomoći.',
          'Zatraži Rentenversicherungsverlauf — Besplatno na drv.de ili osobno u DRV uredu. Prikazuje sve njemacke penzijske doprinose.',
          'B1 njemacki — Integracijski kurs (Goethe B1 + Orientierungskurs) ili vanjski B1 ispit. Bez B1 nema NE!',
          'Pripremi kompletnu dokumentaciju — Sve boravišne dozvole posljednjih 5 god., platne liste, ugovor najma, Rentenversicherungsverlauf.',
          'Zakaži termin u Ausländerbehörde — Čekanje 2–6 mj.! Zakaži idealnog 6 mj. PRIJE isteka sadašnje dozvole.',
          'Predaj OBA zahtjeva zajedno — Antrag NE (AUFENTHG-009) + Antrag Daueraufenthalt-EU (AUFENTHG-014). Ista cijena (113 €), dvostruka korist!',
          'Issued! — NE je NEOGRANIČENA. Daueraufenthalt-EU: nakon 18 mj. pravo rada i boravka u drugim EU državama.'
        ],
        documents: [
          'Pasoš + kopije SVIH stranica s vizama i dozvolama',
          '2 digitalne biometrijske fotografije',
          'Antrag Niederlassungserlaubnis (AUFENTHG-009)',
          'Antrag Daueraufenthalt-EU (AUFENTHG-014) — OBAVEZNO predaj zajedno!',
          'Rentenversicherungsverlauf — min. 60 mj. doprinosa (DRV, besplatno)',
          'B1 certifikat (Integrationskurs ili Goethe/telc B1)',
          'Gehaltsabrechnungen posljednja 3 mj.',
          'Sve dosadašnje Aufenthaltserlaubnisse 5 god.',
          'Meldebescheinigung (ne starija od 3 mj.)',
          'Ugovor o najmu/Wohnraumbestätigung',
          'Potvrda Finanzamt — nema poreznih dugova',
          'Zdravstveno osiguranje (za Daueraufenthalt-EU: NEOGRANIČENO!)'
        ],
        costs: [
          'Niederlassungserlaubnis: 113 €',
          'Daueraufenthalt-EU: 113 € (PREDAJ OBA — ista naknada!)',
          'B1 ispit (eksterni): 100–200 €',
          'Rok obrade Ausländerbehörde: 4–12 sedmica'
        ],
        errors: [
          'Penzijski doprinosi ispod 60 mj. — NAJČEŠĆI razlog odbijanja!',
          'Korišćenje socijalnih davanja (ALG II) — može voditi odbijanju',
          'Nema B1 certifikata — bez njega NE se ne može izdati',
          'Boravak u inostranstvu duži od 6 mj. — PREKIDA rok od 5 god.!',
          'Aplicirano samo za NE, zaboravljen Daueraufenthalt-EU — UVIJEK predaj OBA!'
        ],
        sources: [
          { label: 'BAMF — Niederlassungserlaubnis', url: 'https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/DauerhafterAufenthalt/dauerhafter-aufenthalt-node.html' },
          { label: 'Deutsche Rentenversicherung (DRV)', url: 'https://www.drv.de' },
          { label: 'Make it in Germany — NE', url: 'https://www.make-it-in-germany.com/de/visum-aufenthalt/arten/niederlassungserlaubnis' }
        ],
        musterformulare: [
          { title: 'Musterformular 1: Niederlassungserlaubnis §9', subtitle: 'Popunjen primjer — AUFENTHG-009 za BiH', formKey: 'VisaPermanentForm1', downloadUrl: 'https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/DauerhafterAufenthalt/dauerhafter-aufenthalt-node.html' },
          { title: 'Musterformular 2: Daueraufenthalt-EU §9a', subtitle: 'Popunjen primjer — AUFENTHG-014 za BiH', formKey: 'VisaPermanentForm2', downloadUrl: 'https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/DauerhafterAufenthalt/dauerhafter-aufenthalt-node.html' }
        ]
      }
    ]
  },
  {
    code: 'rs',
    name: 'Srbija',
    flag: 'https://flagcdn.com/h24/rs.png',
    isEU: false,
    embassyName: 'Nemačka ambasada Beograd',
    embassyUrl: 'https://www.belgrad.diplo.de',
    embassyNote: 'Poslednje ažuriranje termina: 23.01.2026. Redovno proveravajte belgrad.diplo.de.',
    schengenFree: true,
    schengenNote: 'Srpski državljani s biometrijskim pasošem mogu bez vize u Schengen do 90 dana — samo turizam. Za rad obavezna viza!',
    routes: [
      {
        id: 'work',
        title: 'Radna viza §18 AufenthG',
        legalBasis: '§ 18 AufenthG + § 26 Abs. 2 BeschV (Westbalkan-Regelung)',
        subtitle: 'Boravišna dozvola za zaposlenje. Srbija je deo Westbalkan-Regelung.',
        westbalkanNote: 'WESTBALKAN-REGELUNG: Kao srpski državljanin možeš raditi u Nemačkoj bez provere prioriteta i BEZ dokaza o kvalifikaciji. 50.000 viza godišnje. Poslednje ažuriranje termina Beograd: 23.01.2026. NOVO: Vorabzustimmung od Bundesagentur für Arbeit ubrzava postupak od juna 2024.',
        steps: [
          'Pronađi posao — Nađi nemačkog poslodavca koji ti daje obavezujuću ponudu posla.',
          'Vorabzustimmung — Poslodavac podnosi zahtjev Bundesagentur für Arbeit. S Vorabzustimmung + Kundennummer zakazuješ termin brže.',
          'Termin u ambasadi Beograd — belgrad.diplo.de. Poslednje ažuriranje: 23.01.2026. Redovno proveravaj.',
          'Dokumentacija — Pasoš, EzB (popunjava poslodavac), Vorabzustimmung, 2 digitalne biometrijske fotografije, ugovor o radu.',
          'Apliciraj lično u ambasadu Beograd. Naknada: 75 €.',
          'Ulazak u Nemačku s D-vizom.',
          'Anmeldung — 14 dana od useljenja.',
          'Ausländerbehörde — Aufenthaltserlaubnis §18 PRE isteka D-vize.'
        ],
        documents: [
          'Pasoš — min. 18 mes. važenja',
          '2 digitalne biometrijske fotografije (od 01.05.2025 ISKLJUČIVO digitalne!)',
          'EzB — popunjava i potpisuje POSLODAVAC',
          'Vorabzustimmung Bundesagentur für Arbeit',
          'Ugovor o radu ili obavezujuća ponuda posla',
          'Zdravstveno osiguranje',
          'Dokaz o stanovanju'
        ],
        costs: ['D-Viza: 75 €', 'Aufenthaltserlaubnis: 100–110 €', 'Rok obrade: 4–8 nedelja'],
        errors: ['EzB nije potpisana od poslodavca', 'Nedigitalne fotografije!', 'Rad pre izdavanja Aufenthaltserlaubnis — krivično delo'],
        sources: [
          { label: 'Ambasada Beograd', url: 'https://www.belgrad.diplo.de' },
          { label: 'Bundesagentur für Arbeit — Westbalkan', url: 'https://www.arbeitsagentur.de/unternehmen/fachkraefte-ausland/westbalkanregelung' },
          { label: 'Make it in Germany', url: 'https://www.make-it-in-germany.com/de/visum-aufenthalt/arten/arbeit/westbalkan-regelung' }
        ],
        musterformulare: [
          { title: 'Musterformular 1: Antrag auf Aufenthaltserlaubnis', subtitle: 'Popunjen primer za §18 Srbija', formKey: 'VisaWorkForm1', downloadUrl: 'https://www.bamf.de' },
          { title: 'Musterformular 2: EzB — Erklärung zum Beschäftigungsverhältnis', subtitle: 'Formular koji popunjava POSLODAVAC', formKey: 'VisaWorkForm2', downloadUrl: 'https://www.arbeitsagentur.de/datei/ezb_ba047549.pdf' }
        ]
      },
      {
        id: 'bluecard',
        title: 'EU Plava karta §18g AufenthG',
        legalBasis: '§ 18g AufenthG',
        subtitle: 'Za visokokvalifikovane sa priznatom diplomom i ugovorom min. 45.300 €/god.',
        steps: [
          'Proveri diplomu na anabin.kmk.org — mora biti H+ i entspricht/gleichwertig.',
          'Ugovor o radu — min. 45.300 €/god. standard ili 41.041,80 € za Mangelberufe.',
          'Termin u ambasadi Beograd — belgrad.diplo.de. Bez Vorabzustimmung BA — prednost Blue Card!',
          'Apliciraj za vizu s AUFENTHG-034.',
          'Ulaz u Nemačku, Anmeldung, Ausländerbehörde — EU Plava karta §18g.'
        ],
        documents: ['Pasoš', '2 digitalne biometrijske fotografije', 'AUFENTHG-034', 'Diploma + overen prevod', 'Ugovor o radu (min. 45.300 €)', 'Zdravstveno osiguranje'],
        costs: ['D-Viza: 75 €', 'EU Plava karta: 100–110 €', 'Rok obrade: 4–8 nedelja'],
        errors: ['Diploma nije proverena na anabin pre aplikacije!', 'Plata ispod minimuma — zahtev odbijen'],
        sources: [
          { label: 'Ambasada Beograd', url: 'https://www.belgrad.diplo.de' },
          { label: 'BAMF — Blue Card', url: 'https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/Arbeit/BlaueKarte/blaue-karte-node.html' },
          { label: 'anabin', url: 'https://anabin.kmk.org' }
        ],
        musterformulare: [
          { title: 'Musterformular: Antrag Blaue Karte EU (AUFENTHG-034)', subtitle: 'Popunjen primer za EU Plavu kartu za Srbiju', formKey: 'VisaBluecardForm', downloadUrl: 'https://www.bamf.de' }
        ]
      },
      {
        id: 'family',
        title: 'Spajanje porodice §§27-36 AufenthG',
        legalBasis: '§ 30 + § 32 AufenthG',
        subtitle: 'Supružnici i deca mogu doći k osobi koja živi u Nemačkoj.',
        steps: [
          'A1 nemački — Goethe-Institut Srbija (Beograd, Novi Sad) PRE dolaska. OBAVEZNO!',
          'Apostille na srpskim ispravama — venčanica, rodni list: APOSTILLE OBAVEZNA!',
          'Overen prevod — sudski prevodilac na nemački.',
          'Termin u ambasadi Beograd — belgrad.diplo.de.',
          'Apliciraj za vizu. Ulazak. Anmeldung. Ausländerbehörde §30/§32.'
        ],
        documents: [
          'Pasoš', '2 digitalne biometrijske fotografije',
          'Antrag auf Aufenthaltserlaubnis',
          'Venčanica s Apostille + overen prevod',
          'Rodni list dece s Apostille + overen prevod',
          'Goethe-Zertifikat A1 ili ÖSD A1',
          'Platni listići (3 mes.) osobe u Nemačkoj',
          'Ugovor o zakupu (min. 12 m² po osobi)'
        ],
        costs: ['D-Viza: 75 € (deca: 37,50 €)', 'A1 kurs + ispit: 150–400 €', 'Apostille: varijabilno', 'Overen prevod: 50–120 € po doc.'],
        errors: ['Bez A1 viza odbijena!', 'Apostille obavezna za srpska dokumenta!', 'Min. 12 m² po osobi u stanu'],
        sources: [
          { label: 'Ambasada Beograd', url: 'https://www.belgrad.diplo.de' },
          { label: 'Goethe-Institut Serbien', url: 'https://www.goethe.de/ins/rs/sr/index.html' },
          { label: 'BAMF — Familiennachzug', url: 'https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/Familie/familie-node.html' }
        ],
        musterformulare: [
          { title: 'Musterformular: Antrag Aufenthaltserlaubnis (Spajanje)', subtitle: '§§27-36 primer za Srbiju', formKey: 'VisaFamilyForm', downloadUrl: 'https://www.bamf.de' }
        ]
      },
      {
        id: 'study',
        title: 'Studentska viza §16b AufenthG',
        legalBasis: '§ 16b AufenthG',
        subtitle: 'Boravišna dozvola za studiranje u Nemačkoj.',
        steps: [
          'Apliciraj na sveučilište (uni-assist.de ili direktno). Rokovi: zimski jul, letnji januar.',
          'TestDaF/DSH (B2/C1) ili IELTS/TOEFL za engleski program.',
          'Sperrkonto — Fintiba/Expatrio/Coracle. Min. 11.208 €/god. (934 €/mes.).',
          'Termin ambasada Beograd. Apliciraj. Ulaz. Immatrikulacija. Anmeldung. Ausländerbehörde §16b.'
        ],
        documents: ['Pasoš', '2 digitalne biometrijske fotografije', 'Zulassungsbescheid sveučilišta', 'TestDaF/IELTS potvrda', 'Sperrkonto potvrda (11.208 €)', 'Matura + overen prevod'],
        costs: ['Sperrkonto: 11.208 €/god.', 'D-Viza: 75 €', 'Aufenthaltserlaubnis: 100–110 €'],
        errors: ['Sperrkonto prekasno otvoren — traje 2–4 nedelje!', 'Eksmatrikulacija = gasi dozvolu!'],
        sources: [
          { label: 'BAMF — Studium', url: 'https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/Studium/studium-node.html' },
          { label: 'Fintiba', url: 'https://www.fintiba.com' }
        ],
        musterformulare: [
          { title: 'Musterformular: Antrag Aufenthaltserlaubnis (Studiranje)', subtitle: '§16b primer za Srbiju', formKey: 'VisaStudyForm', downloadUrl: 'https://www.bamf.de' }
        ]
      },
      {
        id: 'permanent',
        title: 'Stalni boravak §9 + Daueraufenthalt-EU §9a',
        legalBasis: '§ 9 + § 9a AufenthG',
        subtitle: 'Neograničena dozvola boravka. Apliciraj za OBA istovremeno!',
        steps: ['5 god. zakonit boravak', 'B1 nemački — Integracioni kurs ili B1 ispit', '60 mes. penzijskog (drv.de)', 'Termin Ausländerbehörde (2–6 mes. čekanja!)', 'OBA zahtjeva zajedno (AUFENTHG-009 + AUFENTHG-014)'],
        documents: ['Pasoš + kopije svih stranica', 'AUFENTHG-009 + AUFENTHG-014 (OBA!)', 'Rentenversicherungsverlauf (60 mes.)', 'B1 certifikat', 'Platni listići 3 mes.', 'Sve dosadašnje dozvole 5 god.'],
        costs: ['NE: 113 €', 'Daueraufenthalt-EU: 113 € (OBA = ista cena!)'],
        errors: ['Penzijski doprinosi < 60 mes. — najčešći razlog!', 'Nema B1!', 'Samo NE, zaboravljen Daueraufenthalt-EU — uvek OBA!'],
        sources: [
          { label: 'BAMF — Niederlassungserlaubnis', url: 'https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/DauerhafterAufenthalt/dauerhafter-aufenthalt-node.html' },
          { label: 'Deutsche Rentenversicherung', url: 'https://www.drv.de' }
        ],
        musterformulare: [
          { title: 'Musterformular 1: Niederlassungserlaubnis', subtitle: 'AUFENTHG-009 primer Srbija', formKey: 'VisaPermanentForm1', downloadUrl: 'https://www.bamf.de' },
          { title: 'Musterformular 2: Daueraufenthalt-EU', subtitle: 'AUFENTHG-014 primer Srbija', formKey: 'VisaPermanentForm2', downloadUrl: 'https://www.bamf.de' }
        ]
      }
    ]
  },
  {
    code: 'me',
    name: 'Crna Gora',
    flag: 'https://flagcdn.com/h24/me.png',
    isEU: false,
    embassyName: 'Njemacka ambasada Podgorica',
    embassyUrl: 'https://www.podgorica.diplo.de',
    embassyNote: 'Termini TAGESAKTUELL — provjeri svako jutro na podgorica.diplo.de.',
    schengenFree: true,
    schengenNote: 'Crnogorski državljani s biometrijskim pasošem mogu bez vize u Schengen do 90 dana. Za rad obavezna viza!',
    routes: [
      {
        id: 'work',
        title: 'Radna viza §18 AufenthG',
        legalBasis: '§ 18 AufenthG + § 26 Abs. 2 BeschV (Westbalkan)',
        subtitle: 'Boravišna dozvola za zaposlenje. Crna Gora je dio Westbalkan-Regelung.',
        westbalkanNote: 'WESTBALKAN-REGELUNG: Kao crnogorski državljanin možeš raditi u Njemačkoj bez provjere prioriteta i BEZ dokaza o kvalifikaciji. 50.000 viza godišnje. Termini u Podgorici: TAGESAKTUELL. Vorabzustimmung od BA ubrzava proceduru.',
        steps: [
          'Pronađi posao — Njemacki poslodavac s obavezujućom ponudom posla.',
          'Vorabzustimmung — Poslodavac pribavlja od Bundesagentur für Arbeit.',
          'Termin u ambasadi Podgorica — podgorica.diplo.de tagesaktuell.',
          'Dokumentacija — EzB, Vorabzustimmung, pasoš, 2 digitalne biometrijske fotografije.',
          'Apliciraj lično. Ulazak s D-vizom.',
          'Anmeldung — 14 dana. Ausländerbehörde §18 PRE isteka vize.'
        ],
        documents: ['Pasoš (min. 18 mj.)', '2 digitalne biometrijske fotografije', 'EzB — potpisuje POSLODAVAC', 'Vorabzustimmung BA', 'Ugovor o radu', 'Zdravstveno osiguranje'],
        costs: ['D-Viza: 75 €', 'Aufenthaltserlaubnis: 100–110 €'],
        errors: ['EzB nepotpuna ili bez potpisa', 'Termini tagesaktuell — provjeri svako jutro!'],
        sources: [
          { label: 'Ambasada Podgorica', url: 'https://www.podgorica.diplo.de' },
          { label: 'Westbalkan-Regelung', url: 'https://www.make-it-in-germany.com/de/visum-aufenthalt/arten/arbeit/westbalkan-regelung' }
        ],
        musterformulare: [
          { title: 'Musterformular 1: Antrag Aufenthaltserlaubnis §18', subtitle: 'Primjer za Crnu Goru', formKey: 'VisaWorkForm1', downloadUrl: 'https://www.bamf.de' },
          { title: 'Musterformular 2: EzB', subtitle: 'Formular poslodavca', formKey: 'VisaWorkForm2', downloadUrl: 'https://www.arbeitsagentur.de/datei/ezb_ba047549.pdf' }
        ]
      },
      {
        id: 'family',
        title: 'Spajanje porodice §§27-36 AufenthG',
        legalBasis: '§ 30 + § 32 AufenthG',
        subtitle: 'Supružnici i djeca mogu doći k osobi koja živi u Njemačkoj.',
        steps: [
          'A1 njemacki — Goethe-Institut Crna Gora ili ÖSD PRE dolaska.',
          'Apostille na crnogorskim ispravama — OBAVEZNA.',
          'Ovjereni prijevod od sudskog tumača.',
          'Termin ambasada Podgorica. Apliciraj. Ulazak. Anmeldung. Ausländerbehörde §30/§32.'
        ],
        documents: ['Pasoš', '2 digitalne biometrijske fotografije', 'Vjenčani list s Apostille + prijevod', 'Goethe A1 ili ÖSD A1', 'Platne liste (3 mj.) osobe u Njemačkoj', 'Ugovor o najmu'],
        costs: ['D-Viza: 75 €', 'A1 kurs + ispit: 150–400 €'],
        errors: ['Bez A1 viza odbijena!', 'Apostille obavezna za MNE isprave!'],
        sources: [{ label: 'Ambasada Podgorica', url: 'https://www.podgorica.diplo.de' }],
        musterformulare: [
          { title: 'Musterformular: Antrag Aufenthaltserlaubnis (Spajanje)', subtitle: '§§27-36 primjer Crna Gora', formKey: 'VisaFamilyForm', downloadUrl: 'https://www.bamf.de' }
        ]
      },
      {
        id: 'permanent',
        title: 'Stalni boravak §9 + Daueraufenthalt-EU §9a',
        legalBasis: '§ 9 + § 9a AufenthG',
        subtitle: 'Neograničeno pravo boravka. Apliciraj za OBA istovremeno!',
        steps: ['5 god. zakonit boravak', 'B1 njemacki', '60 mj. penzijskog (drv.de)', 'Termin Ausländerbehörde', 'OBA zahtjeva zajedno'],
        documents: ['Pasoš', 'AUFENTHG-009 + AUFENTHG-014', 'Rentenversicherungsverlauf', 'B1 certifikat'],
        costs: ['113 € (oba zajedno)'],
        errors: ['< 60 mj. penzijskog — najčešći razlog!', 'Nema B1!'],
        sources: [{ label: 'BAMF', url: 'https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/DauerhafterAufenthalt/dauerhafter-aufenthalt-node.html' }],
        musterformulare: [
          { title: 'Musterformular 1: Niederlassungserlaubnis', subtitle: 'AUFENTHG-009', formKey: 'VisaPermanentForm1', downloadUrl: 'https://www.bamf.de' },
          { title: 'Musterformular 2: Daueraufenthalt-EU', subtitle: 'AUFENTHG-014', formKey: 'VisaPermanentForm2', downloadUrl: 'https://www.bamf.de' }
        ]
      }
    ]
  },
  {
    code: 'mk',
    name: 'Sjeverna Makedonija',
    flag: 'https://flagcdn.com/h24/mk.png',
    isEU: false,
    embassyName: 'Германска амбасада Скопје',
    embassyUrl: 'https://www.skopje.diplo.de',
    embassyNote: 'Термини TAGESAKTUELL — проверувај секое утро на skopje.diplo.de. Амбасадата го нарекува §19c AufenthG + §26 Abs. 2 BeschV.',
    schengenFree: true,
    schengenNote: 'Македонски државјани со биометриски пасош може без виза во Шенген до 90 дена. За работа обавезна виза!',
    routes: [
      {
        id: 'work',
        title: 'Работна виза §18/§19c AufenthG',
        legalBasis: '§ 19c AufenthG + § 26 Abs. 2 BeschV (Westbalkan)',
        subtitle: 'Дозвола за престој за вработување. Македонија е дел на Westbalkan-Regelung. Амбасадата во Скопје го нарекува §19c AufenthG.',
        westbalkanNote: 'WESTBALKAN-REGELUNG: Македонски државјани можат да работат во Германија без проверка на приоритет и БЕЗ признаена квалификација. 50.000 визи годишно. ВАЖНО: Амбасадата Скопје го наведува §19c AufenthG + §26 Abs. 2 BeschV — тоа е исто, само поинакво именување. Термини: TAGESAKTUELL.',
        steps: [
          'Најди работа кај германски работодавач.',
          'Vorabzustimmung — Работодавачот ја бара Vorabzustimmung од Bundesagentur für Arbeit.',
          'Термин кај амбасадата Скопје — skopje.diplo.de, TAGESAKTUELL.',
          'Документација — EzB (пополнува работодавачот), Vorabzustimmung, пасош, 2 дигитални биометриски фотографии.',
          'Аплицирај лично. Влез со Д-виза. Anmeldung. Ausländerbehörde §18/§19c.'
        ],
        documents: ['Пасош (мин. 18 мес.)', '2 дигитални биометриски фотографии', 'EzB — потпишува РАБОТОДАВАЧОТ', 'Vorabzustimmung BA', 'Договор за работа', 'Здравствено осигурување'],
        costs: ['Д-Виза: 75 €', 'Aufenthaltserlaubnis: 100–110 €'],
        errors: ['EzB непотполна или без потпис', 'Недигитални фотографии!'],
        sources: [
          { label: 'Амбасада Скопје', url: 'https://www.skopje.diplo.de' },
          { label: 'Westbalkan-Regelung', url: 'https://www.make-it-in-germany.com/de/visum-aufenthalt/arten/arbeit/westbalkan-regelung' }
        ],
        musterformulare: [
          { title: 'Musterformular 1: Antrag Aufenthaltserlaubnis §18/§19c', subtitle: 'Пример за Македонија', formKey: 'VisaWorkForm1', downloadUrl: 'https://www.bamf.de' },
          { title: 'Musterformular 2: EzB', subtitle: 'Формулар на работодавачот', formKey: 'VisaWorkForm2', downloadUrl: 'https://www.arbeitsagentur.de/datei/ezb_ba047549.pdf' }
        ]
      },
      {
        id: 'family',
        title: 'Спојување на семејство §§27-36 AufenthG',
        legalBasis: '§ 30 + § 32 AufenthG',
        subtitle: 'Сопружници и деца можат да дојдат кај лице кое живее во Германија.',
        steps: [
          'A1 германски — Гете-Институт или ÖSD во Македонија ПРЕД доаѓање.',
          'Апостил на македонски документи — ЗАДОЛЖИТЕЛЕН.',
          'Овластен превод на германски.',
          'Термин амбасада Скопје. Аплицирај. Влез. Anmeldung. Ausländerbehörde §30/§32.'
        ],
        documents: ['Пасош', '2 дигитални биометриски фотографии', 'Венчаница со Апостил + превод', 'Гете А1 или ÖSD А1', 'Платни листови (3 мес.) на лицето во Германија', 'Договор за кирија'],
        costs: ['Д-Виза: 75 €', 'А1 курс + испит: 150–400 €'],
        errors: ['Без А1 виза одбиена!', 'Апостил задолжителен за МК документи!'],
        sources: [{ label: 'Амбасада Скопје', url: 'https://www.skopje.diplo.de' }],
        musterformulare: [
          { title: 'Musterformular: Antrag Aufenthaltserlaubnis (Спојување)', subtitle: '§§27-36 пример за Македонија', formKey: 'VisaFamilyForm', downloadUrl: 'https://www.bamf.de' }
        ]
      },
      {
        id: 'permanent',
        title: 'Постојан престој §9 + Daueraufenthalt-EU §9a',
        legalBasis: '§ 9 + § 9a AufenthG',
        subtitle: 'Неограничено право на престој. Аплицирај за ДВЕТЕ истовремено!',
        steps: ['5 год. законит престој', 'B1 германски', '60 мес. пензиски (drv.de)', 'Термин Ausländerbehörde', 'ДВАТА барања заедно'],
        documents: ['Пасош', 'AUFENTHG-009 + AUFENTHG-014', 'Rentenversicherungsverlauf', 'B1 сертификат'],
        costs: ['113 € (двете заедно)'],
        errors: ['< 60 мес. пензиски!', 'Нема B1!'],
        sources: [{ label: 'BAMF', url: 'https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/DauerhafterAufenthalt/dauerhafter-aufenthalt-node.html' }],
        musterformulare: [
          { title: 'Musterformular 1: Niederlassungserlaubnis', subtitle: 'AUFENTHG-009 пример МК', formKey: 'VisaPermanentForm1', downloadUrl: 'https://www.bamf.de' },
          { title: 'Musterformular 2: Daueraufenthalt-EU', subtitle: 'AUFENTHG-014 пример МК', formKey: 'VisaPermanentForm2', downloadUrl: 'https://www.bamf.de' }
        ]
      }
    ]
  },
  {
    code: 'al',
    name: 'Albanija',
    flag: 'https://flagcdn.com/h24/al.png',
    isEU: false,
    embassyName: 'Ambasada gjermane Tiranë',
    embassyUrl: 'https://www.tirana.diplo.de',
    embassyNote: 'Terminet TAGESAKTUELL — kontrolloni çdo ditë faqen tirana.diplo.de.',
    schengenFree: true,
    schengenNote: 'Shtetasit shqiptarë me pasaportë biometrike mund të hyjnë pa vizë në zonën Shengen deri 90 ditë. Për punë nevojitet viza!',
    routes: [
      {
        id: 'work',
        title: 'Viza e punës §18 AufenthG',
        legalBasis: '§ 18 AufenthG + § 26 Abs. 2 BeschV (Westbalkan)',
        subtitle: 'Leja e qëndrimit për punësim. Shqipëria është pjesë e Westbalkan-Regelung.',
        westbalkanNote: 'WESTBALKAN-REGELUNG: Si shtetas shqiptar mund të punosh në Gjermani pa kontroll prioriteti dhe PA provë kualifikimi. 50.000 viza në vit. Termina Tiranë: TAGESAKTUELL. Vorabzustimmung nga BA e shpejton procesin.',
        steps: [
          'Gjej punë tek punëdhënësi gjerman — me ofertë pune të detyrueshme.',
          'Vorabzustimmung — Punëdhënësi kërkon nga Bundesagentur für Arbeit.',
          'Termin kaq ambasadën Tiranë — tirana.diplo.de, TAGESAKTUELL.',
          'Dokumentacion — EzB (plotëson punëdhënësi), Vorabzustimmung, pasaportë, 2 foto biometrike dixhitale.',
          'Apliko personalisht. Hyj me vizë D. Anmeldung. Ausländerbehörde §18.'
        ],
        documents: ['Pasaportë (min. 18 muj)', '2 foto biometrike dixhitale', 'EzB — nënshkruan PUNËDHËNËSI', 'Vorabzustimmung BA', 'Kontratë pune', 'Sigurimi shëndetësor'],
        costs: ['Vizë D: 75 €', 'Aufenthaltserlaubnis: 100–110 €'],
        errors: ['EzB jo e plotë ose pa nënshkrim', 'Foto jo dixhitale!'],
        sources: [
          { label: 'Ambasada Tiranë', url: 'https://www.tirana.diplo.de' },
          { label: 'Westbalkan-Regelung', url: 'https://www.make-it-in-germany.com/de/visum-aufenthalt/arten/arbeit/westbalkan-regelung' }
        ],
        musterformulare: [
          { title: 'Musterformular 1: Antrag Aufenthaltserlaubnis §18', subtitle: 'Shembull për Shqipërinë', formKey: 'VisaWorkForm1', downloadUrl: 'https://www.bamf.de' },
          { title: 'Musterformular 2: EzB', subtitle: 'Formulari i punëdhënësit', formKey: 'VisaWorkForm2', downloadUrl: 'https://www.arbeitsagentur.de/datei/ezb_ba047549.pdf' }
        ]
      },
      {
        id: 'family',
        title: 'Ribashkim familjar §§27-36 AufenthG',
        legalBasis: '§ 30 + § 32 AufenthG',
        subtitle: 'Bashkëshortët dhe fëmijët mund të vijnë tek personi që jeton në Gjermani.',
        steps: [
          'Provim A1 gjermanisht — Instituti Goethe Tiranë PARA ardhjes.',
          'Apostilë në dokumente shqiptare — E DETYRUESHME.',
          'Përkthim i besuar nga përkthyes i betuar.',
          'Termin ambasada Tiranë. Apliko. Hyrja. Anmeldung. Ausländerbehörde §30/§32.'
        ],
        documents: ['Pasaportë', '2 foto biometrike dixhitale', 'Certifikatë martese me Apostilë + përkthim', 'Goethe A1 ose ÖSD A1', 'Listëpagesa (3 muj) e personit në Gjermani', 'Kontratë qiraje'],
        costs: ['Vizë D: 75 €', 'Kurs + provim A1: 150–400 €'],
        errors: ['Pa A1 viza refuzohet!', 'Apostilë e detyrueshme!'],
        sources: [
          { label: 'Ambasada Tiranë', url: 'https://www.tirana.diplo.de' },
          { label: 'Goethe-Institut Shqipëri', url: 'https://www.goethe.de/ins/al/sq/index.html' }
        ],
        musterformulare: [
          { title: 'Musterformular: Antrag Aufenthaltserlaubnis (Ribashkim)', subtitle: '§§27-36 shembull Shqipëria', formKey: 'VisaFamilyForm', downloadUrl: 'https://www.bamf.de' }
        ]
      },
      {
        id: 'permanent',
        title: 'Qëndrimi i përhershëm §9 + §9a AufenthG',
        legalBasis: '§ 9 + § 9a AufenthG',
        subtitle: 'E drejta e qëndrimit të pakufizuar. Apliko për TË DY njëkohësisht!',
        steps: ['5 vjet qëndrim ligjor', 'Gjermanisht B1', '60 muj pensioni (drv.de)', 'Termin Ausländerbehörde', 'TË DY kërkesat bashkë'],
        documents: ['Pasaportë', 'AUFENTHG-009 + AUFENTHG-014', 'Rentenversicherungsverlauf', 'Certifikatë B1'],
        costs: ['113 € (të dy bashkë)'],
        errors: ['< 60 muj pensioni!', 'Pa B1!'],
        sources: [{ label: 'BAMF', url: 'https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/DauerhafterAufenthalt/dauerhafter-aufenthalt-node.html' }],
        musterformulare: [
          { title: 'Musterformular 1: Niederlassungserlaubnis', subtitle: 'AUFENTHG-009 Shqipëria', formKey: 'VisaPermanentForm1', downloadUrl: 'https://www.bamf.de' },
          { title: 'Musterformular 2: Daueraufenthalt-EU', subtitle: 'AUFENTHG-014 Shqipëria', formKey: 'VisaPermanentForm2', downloadUrl: 'https://www.bamf.de' }
        ]
      }
    ]
  },
  {
    code: 'xk',
    name: 'Kosovo',
    flag: 'https://flagcdn.com/h24/xk.png',
    isEU: false,
    embassyName: 'Ambasada gjermane Prishtinë (VisaMetric)',
    embassyUrl: 'https://pristina.diplo.de',
    embassyNote: 'KRITIČNO: Sve vize ISKLJUČIVO preko VisaMetric (visametric.com/Kosovo/Germany) — NE direktno u ambasadi! Naknada VisaMetric: 30 € + 30 € dostava pasoša.',
    kosovoNote: 'NOVO od 01.01.2024: Svi državljani Kosova s BIOMETRIJSKIM pasošem mogu bez vize u Schengen prostor do 90 dana (turizam, poslovni posjeti — NE za rad!). Za rad i duži boravak i dalje OBAVEZNA viza kroz VisaMetric.',
    routes: [
      {
        id: 'work',
        title: 'Radna viza §18 AufenthG',
        legalBasis: '§ 18 AufenthG + § 26 Abs. 2 BeschV (Westbalkan)',
        subtitle: 'Boravišna dozvola za zaposlenje. Kosovo je u Westbalkan-Regelung. Vize ISKLJUČIVO kroz VisaMetric!',
        westbalkanNote: 'WESTBALKAN-REGELUNG: Kao kosovski državljanin možeš raditi u Njemačkoj bez provjere prioriteta i BEZ dokaza o kvalifikaciji. 50.000 viza godišnje.',
        kosovoNote: 'POSEBNO ZA KOSOVO: Sve vize se apliciraju ISKLJUČIVO kroz VisaMetric centar u Prištini — nikako direktno u ambasadu! VisaMetric naknada: 30 € + 30 € dostava pasoša. Od 01.07.2025 nema više Remonstration — odbijanje se može osporiti samo tužbom na Verwaltungsgericht Berlin. TELC jezični certifikati s ispitnim mjestima u SRBIJI se NE prihvaćaju u Prištini!',
        steps: [
          'Pronađi posao — Njemacki poslodavac s obavezujućom ponudom posla ili ugovorom o radu.',
          'Vorabzustimmung — Poslodavac pribavlja od Bundesagentur für Arbeit. S Vorabzustimmung + Kundennummer apliciraš brže.',
          'VisaMetric termin — Zakaži ISKLJUČIVO na visametric.com/Kosovo/Germany. NE u ambasadu direktno!',
          'Plati VisaMetric naknadu: 30 € (+ 30 € za dostavu pasoša poštom).',
          'Predaj dokumentaciju u VisaMetric centru Priština. VisaMetric prosljeđuje ambasadi (rok do 15 radnih dana).',
          'Ulazak u Njemačku s D-vizom.',
          'Anmeldung — 14 dana.',
          'Ausländerbehörde — Aufenthaltserlaubnis §18 PRE isteka vize.'
        ],
        documents: [
          'Biometrijski pasoš Kosovo (min. 18 mj.)',
          '2 digitalne biometrijske fotografije',
          'EzB — popunjava POSLODAVAC (ne ti!)',
          'Vorabzustimmung Bundesagentur für Arbeit',
          'Ugovor o radu',
          'Zdravstveno osiguranje',
          'Dokaz o stanovanju',
          'NAPOMENA: TELC certifikati s ispitnih mjesta u Srbiji se NE prihvaćaju!'
        ],
        costs: [
          'D-Viza: 75 €',
          'VisaMetric usluga: 30 € (+ 30 € dostava pasoša)',
          'Aufenthaltserlaubnis: 100–110 €',
          'Rok obrade VisaMetric → ambasada: do 15 radnih dana + dostava'
        ],
        errors: [
          'Apliciranje direktno u ambasadu Priština — NE! Samo VisaMetric!',
          'TELC certifikat s ispitnog mjesta u Srbiji — NE prihvaća se u Prištini!',
          'EzB nepotpuna ili bez potpisa poslodavca',
          'Nedigitalne fotografije!',
          'Od 01.07.2025: nema Remonstration — samo tužba na sudu u Berlinu!'
        ],
        sources: [
          { label: 'Ambasada Priština', url: 'https://pristina.diplo.de' },
          { label: 'VisaMetric Kosovo — termini', url: 'https://www.visametric.com/Kosovo/Germany/de' },
          { label: 'Westbalkan-Regelung', url: 'https://www.make-it-in-germany.com/de/visum-aufenthalt/arten/arbeit/westbalkan-regelung' },
          { label: 'Ambasada Priština — Westbalkan', url: 'https://pristina.diplo.de/xk-de/service/visa-einreise/willkommen-in-deutschland-2433504' }
        ],
        musterformulare: [
          { title: 'Musterformular 1: Antrag Aufenthaltserlaubnis §18', subtitle: 'Primjer za Kosovo — VisaMetric procedura', formKey: 'VisaWorkForm1', downloadUrl: 'https://www.bamf.de' },
          { title: 'Musterformular 2: EzB', subtitle: 'Formular koji popunjava poslodavac', formKey: 'VisaWorkForm2', downloadUrl: 'https://www.arbeitsagentur.de/datei/ezb_ba047549.pdf' }
        ]
      },
      {
        id: 'bluecard',
        title: 'EU Plava karta §18g AufenthG',
        legalBasis: '§ 18g AufenthG',
        subtitle: 'Za visokokvalificirane. Online apliciranje DOSTUPNO za Kosovo!',
        kosovoNote: 'POSEBNO ZA KOSOVO: Dostupno online apliciranje (Auslandsportal) za Blue Card, studijske vize i Chancenkarte. Provjeri pristina.diplo.de za aktuelne informacije. Vize kroz VisaMetric ILI Auslandsportal.',
        steps: [
          'Provjeri diplomu na anabin.kmk.org.',
          'Ugovor o radu min. 45.300 €/god.',
          'Online apliciraj na Auslandsportal ILI VisaMetric termin.',
          'Uplodi dokumentaciju online ILI predaj u VisaMetric.',
          'Ulazak s D-vizom. Anmeldung. Ausländerbehörde §18g.'
        ],
        documents: ['Biometrijski pasoš', '2 digitalne biometrijske fotografije', 'AUFENTHG-034', 'Diploma + ovjereni prijevod', 'Ugovor o radu (min. 45.300 €)', 'Zdravstveno osiguranje'],
        costs: ['D-Viza: 75 €', 'VisaMetric: 30 € (ako nije online)', 'EU Plava karta: 100–110 €'],
        errors: ['Diploma nije provjerna na anabin!', 'Plata ispod minimuma'],
        sources: [
          { label: 'Ambasada Priština — Nationale Visa', url: 'https://pristina.diplo.de/xk-de/service/visa-einreise/artikel-nationale-visa-1752574' },
          { label: 'BAMF — Blue Card', url: 'https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/Arbeit/BlaueKarte/blaue-karte-node.html' }
        ],
        musterformulare: [
          { title: 'Musterformular: Antrag Blaue Karte EU (AUFENTHG-034)', subtitle: 'Primjer za Kosovo — online ili VisaMetric', formKey: 'VisaBluecardForm', downloadUrl: 'https://www.bamf.de' }
        ]
      },
      {
        id: 'family',
        title: 'Spajanje porodice §§27-36 AufenthG',
        legalBasis: '§ 30 + § 32 AufenthG',
        subtitle: 'Supružnici i djeca mogu doći k osobi koja živi u Njemačkoj. Sve vize isključivo VisaMetric!',
        kosovoNote: 'POSEBNO ZA KOSOVO: Vize ISKLJUČIVO VisaMetric. TELC iz Srbije NE prihvaća se! Koristiti Goethe-Institut Kosovo ili ÖSD. Naknada VisaMetric: 30 € + 30 € dostava.',
        steps: [
          'A1 njemacki — Goethe-Institut Kosovo ili ÖSD PRE dolaska. TELC iz Srbije se NE prihvaća!',
          'Dokumenta — potvrda o braku, rodni list s ovjerenim prijevodom. Provjeri treba li Apostille.',
          'VisaMetric termin — visametric.com/Kosovo/Germany.',
          'Plati: 30 € + 30 € dostava.',
          'Predaj u VisaMetric centru Priština. Ulazak. Anmeldung. Ausländerbehörde §30/§32.'
        ],
        documents: ['Biometrijski pasoš', '2 digitalne biometrijske fotografije', 'Potvrda o braku + ovjereni prijevod', 'Goethe A1 Kosovo ili ÖSD (NE TELC iz Srbije!)', 'Platne liste (3 mj.) osobe u Njemačkoj', 'Ugovor o najmu'],
        costs: ['D-Viza: 75 €', 'VisaMetric: 30 € + 30 €', 'Goethe A1: 100–200 €'],
        errors: ['Vize samo VisaMetric — ne direktno u ambasadu!', 'TELC iz Srbije NE prihvaća se!', 'Bez A1 viza odbijena'],
        sources: [
          { label: 'Ambasada Priština', url: 'https://pristina.diplo.de' },
          { label: 'VisaMetric Kosovo', url: 'https://www.visametric.com/Kosovo/Germany/de' }
        ],
        musterformulare: [
          { title: 'Musterformular: Antrag Aufenthaltserlaubnis (Spajanje)', subtitle: '§§27-36 primjer Kosovo', formKey: 'VisaFamilyForm', downloadUrl: 'https://www.bamf.de' }
        ]
      },
      {
        id: 'permanent',
        title: 'Stalni boravak §9 + Daueraufenthalt-EU §9a',
        legalBasis: '§ 9 + § 9a AufenthG',
        subtitle: 'Neograničeno pravo boravka. Apliciraj za OBA istovremeno!',
        kosovoNote: 'POSEBNO ZA KOSOVO: Kosovske penzijske anuitete (Trusti) NE mogu se koristiti kao dokaz penzijskog osiguranja za NE! Samo njemacki ili međunarodni penzijski doprinosi.',
        steps: ['5 god. zakonit boravak', 'B1 njemacki', '60 mj. penzijskog — Kosovo Trusti NE vrijedi!', 'Termin Ausländerbehörde', 'OBA zahtjeva zajedno'],
        documents: ['Pasoš', 'AUFENTHG-009 + AUFENTHG-014', 'Rentenversicherungsverlauf (Trusti Kosovo NE!)', 'B1 certifikat'],
        costs: ['113 € (oba zajedno)'],
        errors: ['Kosovo Trusti penzija NE prihvaća se za NE!', '< 60 mj. penzijskog!', 'Nema B1!'],
        sources: [
          { label: 'Ambasada Priština', url: 'https://pristina.diplo.de/xk-de/service/visa-einreise/fachkraft-mit-berufsausbildung-2310256' },
          { label: 'BAMF', url: 'https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/DauerhafterAufenthalt/dauerhafter-aufenthalt-node.html' }
        ],
        musterformulare: [
          { title: 'Musterformular 1: Niederlassungserlaubnis', subtitle: 'AUFENTHG-009 Kosovo', formKey: 'VisaPermanentForm1', downloadUrl: 'https://www.bamf.de' },
          { title: 'Musterformular 2: Daueraufenthalt-EU', subtitle: 'AUFENTHG-014 Kosovo', formKey: 'VisaPermanentForm2', downloadUrl: 'https://www.bamf.de' }
        ]
      }
    ]
  }
];
