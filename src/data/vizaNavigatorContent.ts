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
    embassyName: 'Njemačka ambasada Zagreb',
    embassyUrl: 'https://zagreb.diplo.de',
    embassyNote: 'Kao građanin EU ne trebaš vizu za Njemačku.',
    routes: [{
      id: 'eu_info',
      title: 'EU sloboda kretanja — FreizügG/EU',
      legalBasis: 'FreizügG/EU + § 4a FreizügG/EU',
      subtitle: 'Kao hrvatski državljanin imaš pravo na slobodno kretanje u cijeloj EU. Bez vize, bez posebnih dozvola.',
      steps: [
        'Ulazak u Njemačku — bez vize, bez posebnih dozvola. Samo važeća lična karta ili pasoš.',
        'Anmeldung (prijava boravišta) — u roku od 14 dana od useljenja u lokalnom Einwohnermeldeamt. Potrebno: Wohnungsgeberbestätigung od stanodavca.',
        'Zdravstveno osiguranje — zakonsko (GKV: TK, AOK, DAK) ili privatno. Obavezno za sve.',
        'Bankovni račun — otvori tekući račun (DKB, N26, Commerzbank, Sparkasse).',
        'Steuer-ID — automatski se dodjeljuje nakon Anmeldunga, stiže poštom za 2–4 sedmice.',
        'Zaposlenje — ne treba ti radna dozvola. Direktna prijava kod poslodavca ili registracija na Jobcenter-u.',
        "Daueraufenthaltsrecht — nakon 5 godina neprekidnog zakonitog boravka nastaje pravo stalnog boravka po §4a FreizügG/EU; potvrdu možeš zatražiti. To nije Niederlassungserlaubnis za državljane trećih zemalja."
      ],
      documents: [
        'Važeća lična karta ili pasoš',
        'Za Anmeldung: Wohnungsgeberbestätigung od stanodavca (obavezno!)',
        'Za zaposlenje: biografija (CV), diplome, certifikati',
        "Za potvrdu Daueraufenthaltsrecht: dokazi 5 godina zakonitog boravka (npr. rad, studij ili sredstva i osiguranje); B1 i 60 mjeseci doprinosa nisu uvjeti ovog EU prava."
      ],
      costs: [
        'Ulazak: besplatno',
        'Anmeldung: besplatno',
        "Zdravstveno osiguranje: doprinos zavisi od osiguranja, statusa i prihoda; iznos provjeri kod osiguravatelja.",
        "Potvrda Daueraufenthaltsrecht: lokalnu taksu provjeri kod Ausländerbehörde; taksa 113 € za Niederlassungserlaubnis nije primjenjiva."
      ],
      errors: [
        'Ne prijaviti boravište (Anmeldung) u roku od 14 dana — kazna do 1.000 €!',
        'Zaboraviti zdravstveno osiguranje — obavezno za sve, bez izuzetka',
        'Misliti da ti kao građaninu EU ne treba ništa — Anmeldung je OBAVEZNA!'
      ],
      sources: [
        { label: 'Your Europe — EU Freizügigkeit', url: 'https://europa.eu/youreurope/citizens/travel/entry-exit/eu-citizens/index_de.htm' },
        { label: 'Make it in Germany — EU Bürger', url: 'https://www.make-it-in-germany.com/de/visum-aufenthalt' },
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
    embassyName: 'Njemačka ambasada Ljubljana',
    embassyUrl: 'https://laibach.diplo.de',
    embassyNote: 'Kao građanin EU ne trebaš vizu za Njemačku.',
    routes: [{
      id: 'eu_info',
      title: 'EU sloboda kretanja — FreizügG/EU',
      legalBasis: 'FreizügG/EU + § 4a FreizügG/EU',
      subtitle: 'Kao slovenski državljanin imaš pravo na slobodno kretanje u cijeloj EU. Bez vize, bez posebnih dozvola.',
      steps: [
        'Ulazak u Njemačku — bez vize, samo važeća lična karta ili pasoš.',
        'Anmeldung — u roku od 14 dana od useljenja u lokalnom Einwohnermeldeamt. Potrebno: Wohnungsgeberbestätigung od stanodavca.',
        'Zdravstveno osiguranje — zakonsko (GKV) ili privatno. Obavezno za sve.',
        'Bankovni račun — otvori tekući račun (DKB, N26, Commerzbank).',
        'Steuer-ID — automatski se dodjeljuje nakon Anmeldunga, stiže poštom za 2–4 sedmice.',
        'Zaposlenje — ne treba ti radna dozvola.',
        "Daueraufenthaltsrecht — nakon 5 godina neprekidnog zakonitog boravka nastaje pravo stalnog boravka po §4a FreizügG/EU; potvrdu možeš zatražiti. To nije Niederlassungserlaubnis za državljane trećih zemalja."
      ],
      documents: [
        'Važeća lična karta ili pasoš',
        'Za Anmeldung: Wohnungsgeberbestätigung',
        'Za zaposlenje: biografija (CV), diplome, certifikati'
      ],
      costs: [
        'Ulazak: besplatno',
        'Anmeldung: besplatno',
        "Potvrda Daueraufenthaltsrecht: lokalnu taksu provjeri kod Ausländerbehörde; taksa 113 € za Niederlassungserlaubnis nije primjenjiva."
      ],
      errors: [
        'Zaboraviti Anmeldung u roku od 14 dana — kazna do 1.000 €!',
        'Zaboraviti zdravstveno osiguranje — obavezno!'
      ],
      sources: [
        { label: 'Your Europe — EU Freizügigkeit', url: 'https://europa.eu/youreurope/citizens/travel/entry-exit/eu-citizens/index_de.htm' },
        { label: 'Make it in Germany', url: 'https://www.make-it-in-germany.com/de/visum-aufenthalt' }
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
    embassyUrl: 'https://sarajevo.diplo.de',
    embassyNote: "Termin i predaja — otvori službenu stranicu nadležne ambasade za svoju kategoriju; tamo provjeri Auslandsportal, VisaMetric ili termin u ambasadi. Dostupnost i rokovi nisu garantovani.",
    schengenFree: true,
    schengenNote: "S biometrijskim pasošem: bezvizni kratki boravak do 90 dana u bilo kojih 180 dana u Schengenu, ne za zaposlenje; za rad/duži boravak provjeri odgovarajuću nacionalnu vizu.",
    routes: [
      {
        id: 'work',
        title: "Radna viza — Westbalkan §19c(1) AufenthG",
        legalBasis: "§ 19c Abs. 1 AufenthG + § 26 Abs. 2 BeschV",
        subtitle: 'Boravišna dozvola za zaposlenje. BiH je dio Westbalkan-Regelung — možeš raditi bez priznatih kvalifikacija.',
        westbalkanNote: "Westbalkan-Regelung: do 50.000 saglasnosti BA godišnje za svih šest zemalja zajedno, raspoređeno po mjesecu i državljanstvu — ne 50.000 viza. U pravilu bez priznavanja kvalifikacije, ali regulisana zanimanja traže odgovarajuće priznanje/dozvolu. BA provjerava zaposlenje i uvjete; potrebni su ponuda posla, saglasnost i ostali vizni uvjeti (uključujući pravilo o AsylbLG davanjima u posljednja 24 mjeseca). Kod prvog BA odobrenja za osobe starije od 45 godina: 2026 bruto 55.770 €/god. ili odgovarajuće starosno osiguranje; provjeri puni popis BA uvjeta.",
        steps: [
          'Pronađi posao — Traži njemackog poslodavca koji ti daje obavezujuću ponudu posla ili ugovor o radu. Bez ponude posla nema Westbalkan vize.',
          'Poslodavac pribavlja Vorabzustimmung — Tvoj njemacki poslodavac podnosi zahtjev za Vorabzustimmung (prethodnu saglasnost) Bundesagentur für Arbeit na: arbeitsagentur.de/westbalkanregelung. S Vorabzustimmung dobijaš Kundennummer za zakazivanje termina.',
          "Termin i predaja — otvori službenu stranicu nadležne ambasade za svoju kategoriju; tamo provjeri Auslandsportal, VisaMetric ili termin u ambasadi. Dostupnost i rokovi nisu garantovani.",
          "Pripremi dokumentaciju — pasoš prema listi ambasade, EzB koju popunjava i potpisuje poslodavac, ugovor/ponudu i Vorabzustimmung; fotografije i kopije po pravilima tvoje ambasade.",
          'Apliciraj za vizu — Lično se javi u ambasadu Sarajevo. Uzimaju se otisci prstiju i fotografija. Naknada: 75 €.',
          "D-viza — datum važenja, broj ulazaka i dozvoljeno zaposlenje provjeri na izdanoj vizi; rok nije jednak za sve kategorije.",
          'Anmeldung — U roku 14 dana od useljenja prijavi boravište u Einwohnermeldeamt. Dobijaš Meldebescheinigung.',
          "Pripremi dokumente — važeći pasoš prema listi ambasade, ugovor, EzB od poslodavca i saglasnost ako se traži; fotografije i kopije prema aktuelnoj listi."
        ],
        documents: [
          "Sarajevo: pasoš još najmanje 18 mjeseci važeći + kopija ID stranice, prema sadašnjoj listi; ponovo provjeri prije termina.",
          "Biometrijska fotografija — broj, format i način predaje prema aktuelnoj listi ambasade; za eAT u Njemačkoj važe posebna pravila digitalne fotografije.",
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
          "Obrada i čekanje — zavise od ambasade, Ausländerbehörde, kategorije i kompletnosti; službenu trenutnu procjenu provjeri, bez garantovanog roka.",
          "Obrada i čekanje — zavise od ambasade, Ausländerbehörde, kategorije i kompletnosti; službenu trenutnu procjenu provjeri, bez garantovanog roka."
        ],
        errors: [
          "Termin i predaja — otvori službenu stranicu nadležne ambasade za svoju kategoriju; tamo provjeri Auslandsportal, VisaMetric ili termin u ambasadi. Dostupnost i rokovi nisu garantovani.",
          'EzB nepopunjena ili bez potpisa i pečata poslodavca — najčešći razlog odbijanja',
          "Biometrijska fotografija — broj, format i način predaje prema aktuelnoj listi ambasade; za eAT u Njemačkoj važe posebna pravila digitalne fotografije.",
          "Rad je dozvoljen samo u obimu koji piše na važećoj D-vizi/boravišnoj dozvoli i dodatnom listu. D-viza može već dozvoljavati rad; ne čekaj istek za zahtjev Ausländerbehörde.",
          'Prekasno apliciranje za produženje — uvijek 6–8 sedmica PRIJE isteka'
        ],
        sources: [
          { label: 'Ambasada Sarajevo — Westbalkan termini', url: 'https://sarajevo.diplo.de' },
          { label: 'Bundesagentur für Arbeit — Westbalkanregelung', url: 'https://www.arbeitsagentur.de/unternehmen/fachkraefte-ausland/westbalkanregelung' },
          { label: 'Make it in Germany — Westbalkan', url: 'https://www.make-it-in-germany.com/de/visum-aufenthalt' },
          { label: 'BAMF — Arbeit §18', url: 'https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/Arbeit/arbeit-node.html' },
          { label: 'Auswärtiges Amt — Westbalkan', url: 'https://sarajewo.diplo.de/ba-de/service/westbalkanregelung-2550504' }
        ],
        musterformulare: [
          { title: 'Musterformular 1: Antrag auf Aufenthaltserlaubnis', subtitle: "Popunjen primjer za radnu vizu §19c(1) AufenthG", formKey: 'VisaWorkForm1', downloadUrl: 'https://www.bamf.de' },
          { title: 'Musterformular 2: Erklärung zum Beschäftigungsverhältnis (EzB)', subtitle: 'Formular koji popunjava POSLODAVAC — primjer popunjavanja', formKey: 'VisaWorkForm2', downloadUrl: 'https://www.arbeitsagentur.de/unternehmen/fachkraefte-ausland/westbalkanregelung' }
        ]
      },
      {
        id: 'bluecard',
        title: 'EU Plava karta §18g AufenthG',
        legalBasis: '§ 18g AufenthG + EU direktiva 2021/1883',
        subtitle: 'Najbrži put do stalnog boravka za visokokvalificirane s diplomom i ponudom posla min. 45.300 €/god.',
        steps: [
          "Provjeri kvalifikaciju — za visokoškolsku diplomu anabin ili ZAB; postoje posebni putevi za određene IT stručnjake bez diplome uz dokaz iskustva. Provjeri konkretne uvjete §18g.",
          "Osiguraj ugovor o radu s platom — min. 50.700 €/god. (standard) ili 45.934,20 €/god. (MINT, IT, medicina, njega = Mangelberufe 2026).",
          "EU Plava karta — BA saglasnost se u pravilu ne traži na standardnom pragu; na nižem pragu i posebnim putevima može biti potrebna. Prati kategoriju ambasade; važenje do 4 godine ili ugovor + 3 mjeseca.",
          'Apliciraj za vizu — Lično u ambasadu. Kompletna dokumentacija uključujući AUFENTHG-034.',
          'Ulazak u Njemačku s D-vizom.',
          'Anmeldung — 14 dana od useljenja.',
          "EU Plava karta — BA saglasnost se u pravilu ne traži na standardnom pragu; na nižem pragu i posebnim putevima može biti potrebna. Prati kategoriju ambasade; važenje do 4 godine ili ugovor + 3 mjeseca.",
          "Niederlassungserlaubnis za EU Plavu kartu: uz ostale uvjete nakon 27 mjeseci zaposlenja i doprinosa s A1, ili 21 mjesec s B1; ne automatski i ne bez jezičnog dokaza."
        ],
        documents: [
          "Sarajevo: pasoš još najmanje 18 mjeseci važeći + kopija ID stranice, prema sadašnjoj listi; ponovo provjeri prije termina.",
          "Biometrijska fotografija — broj, format i način predaje prema aktuelnoj listi ambasade; za eAT u Njemačkoj važe posebna pravila digitalne fotografije.",
          'AUFENTHG-034 (Antrag Blaue Karte EU) — popunjen',
          'Diploma — original + ovjereni prijevod na njemacki',
          'Dokaz o priznavanju diplome (anabin.kmk.org ispis ili ZAB potvrda)',
          "Ugovor o radu s navedenom godišnjom platom (min. 50.700 € ili 45.934,20 € za Mangelberufe)",
          'Dokaz o zdravstvenom osiguranju važećem za Njemačku',
          'Mietvertrag ili potvrda o stanovanju'
        ],
        costs: [
          'D-Viza: 75 €',
          'EU Plava karta (Ausländerbehörde, Ersterteilung): 100–110 €',
          'Produženje: 96 €',
          'Anerkennungsverfahren ZAB (ako je potrebno): ca. 200 €',
          "Obrada i čekanje — zavise od ambasade, Ausländerbehörde, kategorije i kompletnosti; službenu trenutnu procjenu provjeri, bez garantovanog roka."
        ],
        errors: [
          'Diploma nije provjerna na anabin.kmk.org PRIJE aplikacije — najčešći problem!',
          'Plata u ugovoru ispod minimuma — zahtjev automatski odbijen',
          "Promjena poslodavca — u prvih 12 mjeseci obavijesti Ausländerbehörde; provjeri ograničenja i uslove svoje EU Plave karte.",
          'Brkanje s Westbalkan-Regelung — ta vrijedi za §18, NE za Blue Card §18g'
        ],
        sources: [
          { label: 'Ambasada Sarajevo', url: 'https://sarajevo.diplo.de' },
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
          "A1 za supružnike — često se traži prije ulaska, ali postoje zakonski izuzeci, uključujući određene stručne radnike i EU Plavu kartu; provjeri svoj slučaj i prihvaćene certifikate kod ambasade.",
          "Isprave i prijevod — provjeri traženi original, kopije, ovjereni prijevod i treba li Apostille/legalizacija baš za tu ispravu; međunarodni izvodi mogu imati izuzetke.",
          "Termin i predaja — otvori službenu stranicu nadležne ambasade za svoju kategoriju; tamo provjeri Auslandsportal, VisaMetric ili termin u ambasadi. Dostupnost i rokovi nisu garantovani.",
          'Apliciraj za vizu — Lično u ambasadu sa svom dokumentacijom.',
          'Ulazak u Njemačku s D-vizom (Familiennachzug).',
          'Anmeldung — Prijavi cijelu porodicu unutar 14 dana.',
          'Ausländerbehörde — Zatraži Aufenthaltserlaubnis §30 (supružnik) ili §32 (djeca) PRIJE isteka vize.'
        ],
        documents: [
          "Sarajevo: pasoš još najmanje 12 mjeseci važeći + kopija ID stranice, prema sadašnjoj listi; ponovo provjeri prije termina.",
          "Biometrijska fotografija — broj, format i način predaje prema aktuelnoj listi ambasade; za eAT u Njemačkoj važe posebna pravila digitalne fotografije.",
          'Antrag auf Aufenthaltserlaubnis',
          "Isprave i prijevod — provjeri traženi original, kopije, ovjereni prijevod i treba li Apostille/legalizacija baš za tu ispravu; međunarodni izvodi mogu imati izuzetke.",
          "Isprave i prijevod — provjeri traženi original, kopije, ovjereni prijevod i treba li Apostille/legalizacija baš za tu ispravu; međunarodni izvodi mogu imati izuzetke.",
          "A1 za supružnike — često se traži prije ulaska, ali postoje zakonski izuzeci, uključujući određene stručne radnike i EU Plavu kartu; provjeri svoj slučaj i prihvaćene certifikate kod ambasade.",
          'Kopija Aufenthaltstitel osobe u Njemačkoj',
          'Gehaltsabrechnungen posljednja 3 mj. osobe u Njemačkoj',
          "Stanovanje i prihodi — da li se traže i koji dokazi trebaju zavisi od porodične rute i statusa osobe u Njemačkoj; nema jedinstvenog minimuma 12 m² za svaki slučaj.",
          'Zdravstveno osiguranje za sve ukućane'
        ],
        costs: [
          'D-Viza: 75 € (djeca do 18 g.: 37,50 €)',
          'A1 kurs (Goethe-Institut Sarajevo/Mostar): 200–400 €',
          'Goethe-Zertifikat A1 ispit: 70–120 €',
          "Isprave i prijevod — provjeri traženi original, kopije, ovjereni prijevod i treba li Apostille/legalizacija baš za tu ispravu; međunarodni izvodi mogu imati izuzetke.",
          'Ovjereni prijevod: 50–120 € po dokumentu',
          'Aufenthaltserlaubnis (Ausländerbehörde): 100–110 € (djeca: 50–55 €)'
        ],
        errors: [
          "A1 za supružnike — često se traži prije ulaska, ali postoje zakonski izuzeci, uključujući određene stručne radnike i EU Plavu kartu; provjeri svoj slučaj i prihvaćene certifikate kod ambasade.",
          "Isprave i prijevod — provjeri traženi original, kopije, ovjereni prijevod i treba li Apostille/legalizacija baš za tu ispravu; međunarodni izvodi mogu imati izuzetke.",
          'Prijevod nije od sudskog tumača — neovjereni prijevodi se NE primaju',
          "Stanovanje i prihodi — da li se traže i koji dokazi trebaju zavisi od porodične rute i statusa osobe u Njemačkoj; nema jedinstvenog minimuma 12 m² za svaki slučaj.",
          "Termin i predaja — otvori službenu stranicu nadležne ambasade za svoju kategoriju; tamo provjeri Auslandsportal, VisaMetric ili termin u ambasadi. Dostupnost i rokovi nisu garantovani."
        ],
        sources: [
          { label: 'Ambasada Sarajevo', url: 'https://sarajevo.diplo.de' },
          { label: 'BAMF — Familiennachzug', url: 'https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/Familie/familie-node.html' },
          { label: 'Goethe-Institut Sarajevo', url: 'https://www.goethe.de/ins/ba/bs/index.html' },
          { label: 'Make it in Germany — Familiennachzug', url: 'https://www.make-it-in-germany.com/de/visum-aufenthalt/familiennachzug' }
        ],
        musterformulare: [
          { title: 'Musterformular: Antrag auf Aufenthaltserlaubnis (Spajanje porodice)', subtitle: 'Popunjen primjer §§27-36 AufenthG za BiH', formKey: 'VisaFamilyForm', downloadUrl: 'https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/Familie/familie-node.html' }
        ]
      },
      {
        id: 'study',
        title: 'Studentska viza §16b AufenthG',
        legalBasis: '§ 16b AufenthG',
        subtitle: "Boravišna dozvola za studij u Njemačkoj; doprinosi i moguće školarine zavise od fakulteta i programa.",
        steps: [
          'Prijava na sveučilište — Apliciraj direktno ili uni-assist.de. Potrebna Zulassung (potvrda o prijemu). Rokovi: zimski semestar (juli), ljetni (januar).',
          'Jezični ispit — TestDaF ili DSH za njemacki (B2/C1) ili IELTS/TOEFL za engleskojezične programe.',
          "Finansiranje studija — 2026: 11.904 €/god. (992 €/mjesec) putem Sperrkonto; moguć je i drugi prihvaćeni dokaz, npr. stipendija ili Verpflichtungserklärung. Provjeri ambasadinu aktuelnu listu prije uplate.",
          "Termin i predaja — otvori službenu stranicu nadležne ambasade za svoju kategoriju; tamo provjeri Auslandsportal, VisaMetric ili termin u ambasadi. Dostupnost i rokovi nisu garantovani.",
          'Apliciraj za vizu — Zulassung + Sperrkonto potvrda + jezični certifikat = minimum.',
          "D-viza — datum važenja, broj ulazaka i dozvoljeno zaposlenje provjeri na izdanoj vizi; rok nije jednak za sve kategorije.",
          'Immatrikulacija — Upiši se na sveučilištu. Dobiješ Immatrikulationsbescheinigung.',
          'Anmeldung — 14 dana od useljenja.',
          'Ausländerbehörde — Aufenthaltserlaubnis §16b s Immatrikulationsbescheinigung + Sperrkonto potvrdom PRIJE isteka vize.'
        ],
        documents: [
          "Sarajevo: pasoš još najmanje 18 mjeseci važeći + kopija ID stranice, prema sadašnjoj listi; ponovo provjeri prije termina.",
          "Biometrijska fotografija — broj, format i način predaje prema aktuelnoj listi ambasade; za eAT u Njemačkoj važe posebna pravila digitalne fotografije.",
          'Antrag auf Aufenthaltserlaubnis',
          'Zulassungsbescheid njemackog sveučilišta (potvrda o prijemu)',
          'TestDaF/DSH (B2/C1) ILI IELTS/TOEFL potvrda',
          "Sperrkonto potvrda — min. 11.904 €/god. (992 €/mj.), Stand 2026",
          'Matura ili ekvivalent + ovjereni prijevod',
          'Zdravstveno osiguranje za Njemačku'
        ],
        costs: [
          'Sperrkonto otvaranje: 50–200 € (Fintiba ca. 89 €)',
          "Sperrkonto iznos: min. 11.904 €/god. (oslobađa se 992 €/mj.)",
          'TestDaF: ca. 175–200 €',
          'D-Viza: 75 €',
          'Aufenthaltserlaubnis: 100–110 €',
          "Semestralni doprinos i moguće školarine — zavise od pokrajine, ustanove i programa; provjeri službeni cjenovnik fakulteta."
        ],
        errors: [
          'Sperrkonto otvoren prekasno — otvaranje traje 2–4 sedmice, uplata još 1–2 sedmice!',
          "Prekid studija/Exmatrikulation — može uticati na svrhu boravka; odmah provjeri sa Ausländerbehörde važenje, rokove i moguće promjene, ne pretpostavljaj automatsko gašenje.",
          'Prekoračenje limita rada — 140 dana ili 280 pola-dana godišnje',
          'Promjena studijskog programa bez obavještavanja Ausländerbehörde'
        ],
        sources: [
          { label: 'BAMF — Studium §16b', url: 'https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/Studium/studium-node.html' },
          { label: 'DAAD — Stipendije', url: 'https://www.daad.de/de/studieren-und-forschen-in-deutschland/stipendien/daad-stipendien/' },
          { label: 'Fintiba Sperrkonto', url: 'https://www.fintiba.com' },
          { label: 'Ambasada Sarajevo', url: 'https://sarajevo.diplo.de' }
        ],
        musterformulare: [
          { title: 'Musterformular: Antrag auf Aufenthaltserlaubnis (Studij)', subtitle: 'Popunjen primjer za studentsku vizu §16b za BiH', formKey: 'VisaStudyForm', downloadUrl: 'https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/Studium/studium-node.html' }
        ]
      },
      {
        id: 'permanent',
        title: 'Stalni boravak §9 + Daueraufenthalt-EU §9a',
        legalBasis: '§ 9 AufenthG (NE) + § 9a AufenthG (Daueraufenthalt-EU)',
        subtitle: "Niederlassungserlaubnis i Daueraufenthalt-EU imaju različite uvjete i posljedice. S Ausländerbehörde provjeri koji zahtjev odgovara tvojoj situaciji i zasebne takse; zajednička predaja nije obavezna.",
        steps: [
          "Opći put §9: u pravilu 5 godina, 60 mjeseci doprinosa, B1 i drugi uvjeti; postoje posebni putevi i izuzeci. Za §9a se uvjeti provjeravaju zasebno kod Ausländerbehörde.",
          'Zatraži Rentenversicherungsverlauf — Besplatno na drv.de ili osobno u DRV uredu. Prikazuje sve njemacke penzijske doprinose.',
          "Opći put §9: u pravilu 5 godina, 60 mjeseci doprinosa, B1 i drugi uvjeti; postoje posebni putevi i izuzeci. Za §9a se uvjeti provjeravaju zasebno kod Ausländerbehörde.",
          'Pripremi kompletnu dokumentaciju — Sve boravišne dozvole posljednjih 5 god., platne liste, ugovor najma, Rentenversicherungsverlauf.',
          'Zakaži termin u Ausländerbehörde — Čekanje 2–6 mj.! Zakaži idealnog 6 mj. PRIJE isteka sadašnje dozvole.',
          "Niederlassungserlaubnis i Daueraufenthalt-EU imaju različite uvjete i posljedice. S Ausländerbehörde provjeri koji zahtjev odgovara tvojoj situaciji i zasebne takse; zajednička predaja nije obavezna.",
          "Nakon odobrenja — dozvola je neograničena, ali može prestati u zakonskim slučajevima. Daueraufenthalt-EU olakšava preseljenje u određene EU države uz njihove uvjete, ne daje automatsko pravo rada svugdje."
        ],
        documents: [
          "Sarajevo: pasoš još najmanje 18 mjeseci važeći + kopija ID stranice, prema sadašnjoj listi; ponovo provjeri prije termina.",
          "Biometrijska fotografija — broj, format i način predaje prema aktuelnoj listi ambasade; za eAT u Njemačkoj važe posebna pravila digitalne fotografije.",
          'Antrag Niederlassungserlaubnis (AUFENTHG-009)',
          "Niederlassungserlaubnis i Daueraufenthalt-EU imaju različite uvjete i posljedice. S Ausländerbehörde provjeri koji zahtjev odgovara tvojoj situaciji i zasebne takse; zajednička predaja nije obavezna.",
          "Opći put §9: u pravilu 5 godina, 60 mjeseci doprinosa, B1 i drugi uvjeti; postoje posebni putevi i izuzeci. Za §9a se uvjeti provjeravaju zasebno kod Ausländerbehörde.",
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
          "Niederlassungserlaubnis i Daueraufenthalt-EU imaju različite uvjete i posljedice. S Ausländerbehörde provjeri koji zahtjev odgovara tvojoj situaciji i zasebne takse; zajednička predaja nije obavezna.",
          'B1 ispit (eksterni): 100–200 €',
          "Obrada i čekanje — zavise od ambasade, Ausländerbehörde, kategorije i kompletnosti; službenu trenutnu procjenu provjeri, bez garantovanog roka."
        ],
        errors: [
          "Opći put §9: u pravilu 5 godina, 60 mjeseci doprinosa, B1 i drugi uvjeti; postoje posebni putevi i izuzeci. Za §9a se uvjeti provjeravaju zasebno kod Ausländerbehörde.",
          'Korišćenje socijalnih davanja (ALG II) — može voditi odbijanju',
          "Opći put §9: u pravilu 5 godina, 60 mjeseci doprinosa, B1 i drugi uvjeti; postoje posebni putevi i izuzeci. Za §9a se uvjeti provjeravaju zasebno kod Ausländerbehörde.",
          "Opći put §9: u pravilu 5 godina, 60 mjeseci doprinosa, B1 i drugi uvjeti; postoje posebni putevi i izuzeci. Za §9a se uvjeti provjeravaju zasebno kod Ausländerbehörde.",
          "Niederlassungserlaubnis i Daueraufenthalt-EU imaju različite uvjete i posljedice. S Ausländerbehörde provjeri koji zahtjev odgovara tvojoj situaciji i zasebne takse; zajednička predaja nije obavezna."
        ],
        sources: [
          { label: 'BAMF — Niederlassungserlaubnis', url: 'https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/DauerhafterAufenthalt/dauerhafter-aufenthalt-node.html' },
          { label: 'Deutsche Rentenversicherung (DRV)', url: 'https://www.drv.de' },
          { label: 'Make it in Germany — NE', url: 'https://www.make-it-in-germany.com/de/visum-aufenthalt/dauerhaft-in-deutschland/niederlassungserlaubnis' }
        ],
        musterformulare: [
          { title: 'Musterformular 1: Niederlassungserlaubnis §9', subtitle: 'Popunjen primjer — AUFENTHG-009 za BiH', formKey: 'VisaPermanentForm1', downloadUrl: 'https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/DauerhafterAufenthalt/dauerhafter-aufenthalt-node.html' },
          { title: 'Musterformular 2: Daueraufenthalt-EU §9a', subtitle: 'Popunjen primjer — AUFENTHG-014 za BiH', formKey: 'VisaPermanentForm2', downloadUrl: 'https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/DauerhafterAufenthalt/dauerhafter-aufenthalt-node.html' }
        ]
      }
,
      {
        id: 'ausbildung',
        title: 'Ausbildung viza §16a AufenthG',
        legalBasis: '§ 16a AufenthG',
        subtitle: 'Aufenthaltserlaubnis zur Berufsausbildung — Dozvola boravka za stručno osposobljavanje (Ausbildung) u Njemačkoj.',
        ausbildungHighlight: [
          '✅ Možeš aplicirati direktno iz domovine',
          "Školski dokazi — firma/škola određuje uvjete upisa i eventualno priznavanje; ne pretpostavljaj da priznavanje nikad nije potrebno.",
          '✅ Firma mora prijaviti Ausbildungsvertrag kod Kammer (IHK/HWK)',
          "Za betriebliche Ausbildung BA u pravilu provjerava uvjete kroz postupak; saglasnost nije automatsko obećanje vize.",
          '✅ Nakon završetka: mogućnost ostanka 18 mjeseci za traženje posla (§20 AufenthG)',
          '⚠️ Važno: Ausbildung ≠ Studij — ne miješati sa §16b AufenthG (Studium)'
        ],
        countryNotes: [
          '💰 Taksa: 150 KM (NE 75€ — plaća se u KM, preferira se bezgotovinska uplata, Visa/Mastercard prihvataju se)',
          '📅 Termin: Zakaži putem VisaMetric ili Auslandsportal (ovisno o kategoriji vize) — sarajewo.diplo.de',
          '📄 Dokumenti: Original + 1 crno-bijela kopija — NE tackerisar, NE spajati spajalicama',
          "Isprave i prijevod — provjeri traženi original, kopije, ovjereni prijevod i treba li Apostille/legalizacija baš za tu ispravu; međunarodni izvodi mogu imati izuzetke.",
          "Aufenthaltserlaubnis §16a — podnesi zahtjev prije isteka D-vize; trajanje i produženje zavise od Ausbildung programa i odluke Ausländerbehörde, ne uvijek jednu godinu.",
          '🏦 Sperrkonto: ako je finansijsko pokriće kroz Sperrkonto — mora biti otvoreno PRIJE termina'
        ],
        countryBadge: "Upute nadležne ambasade",
        steps: [
          'Pronađi Ausbildung mjesto — Moraš imati potpisan Ausbildungsvertrag PRIJE podnošenja zahtjeva za vizu. Koristi: bundesagentur.de, ausbildung.de, make-it-in-germany.com',
          "Njemački za Ausbildung — u pravilu B1 ako ustanova nije već provjerila jezik ili nije predviđen pripremni kurs; zanimanje može tražiti više. Ambasada navodi priznate certifikate, starost i ispitna mjesta.",
          'Pripremi dokumentaciju — Pripremi svu dokumentaciju. Ambasada Sarajevo traži original + 1 crno-bijelu kopiju. NE tackerisar!',
          'Zakaži termin u ambasadi Sarajevo — Na sarajewo.diplo.de ili putem VisaMetric. Rokovi: 4–12 sedmica — apliciraj rano!',
          'Podnesi zahtjev za D-vizu — Lično u ambasadi. Donesite originale i kopije svih dokumenata. Taksa: 150 KM (gotovina ili kartica).',
          "D-viza — datum važenja, broj ulazaka i dozvoljeno zaposlenje provjeri na izdanoj vizi; rok nije jednak za sve kategorije.",
          'Dolazak u Njemačku — Obavezno uradi Anmeldung (prijava adrese) u roku 14 dana od doseljenja.',
          "Aufenthaltserlaubnis §16a — podnesi zahtjev prije isteka D-vize; trajanje i produženje zavise od Ausbildung programa i odluke Ausländerbehörde, ne uvijek jednu godinu."
        ],
        documents: [
          "Sarajevo: pasoš još najmanje 18 mjeseci važeći + kopija ID stranice, prema sadašnjoj listi; ponovo provjeri prije termina.",
          'Potpisan Ausbildungsvertrag (original + crno-bijela kopija)',
          'Potvrda IHK/HWK registracije Ausbildungsvertrag (ako postoji)',
          'Lebenslauf / CV (na njemačkom jeziku)',
          "Isprave i prijevod — provjeri traženi original, kopije, ovjereni prijevod i treba li Apostille/legalizacija baš za tu ispravu; međunarodni izvodi mogu imati izuzetke.",
          "Aufenthaltserlaubnis §16a — podnesi zahtjev prije isteka D-vize; trajanje i produženje zavise od Ausbildung programa i odluke Ausländerbehörde, ne uvijek jednu godinu.",
          'Dokaz o smještaju u Njemačkoj (Wohnungsangebot ili Bestätigung)',
          'Zdravstveno osiguranje (do početka Ausbildunga)',
          'Finansijski dokaz: platna lista iz ugovora ILI Sperrkonto (otvoreno PRIJE termina!) ILI Verpflichtungserklärung',
          'VIDEX — online viza formular (popunjen, potpisan)',
          'Biometrijska fotografija (45x35mm, bijela pozadina)',
          'Potpisani merkblatt ambasade',
          'Taksa: 150 KM gotovina ili kartica'
        ],
        costs: [
          'D-Viza taksa (Ambasada Sarajevo): 150 KM (ne 75€!)',
          'Aufenthaltstitel taksa (Ausländerbehörde): 100–110 €',
          "Obrada i čekanje — zavise od ambasade, Ausländerbehörde, kategorije i kompletnosti; službenu trenutnu procjenu provjeri, bez garantovanog roka.",
          "Obrada i čekanje — zavise od ambasade, Ausländerbehörde, kategorije i kompletnosti; službenu trenutnu procjenu provjeri, bez garantovanog roka.",
          "Finansiranje Ausbildung (2026): školska najmanje 959 € neto/mjesec; betriebliche najmanje 1.048 € bruto ili 822 € neto plate/mjesec. Manjak se može pokriti Sperrkonto/Verpflichtungserklärung. Neke liste ambasada imaju drugačije/starije iznose — provjeri prije uplate.",
          "D-viza — datum važenja, broj ulazaka i dozvoljeno zaposlenje provjeri na izdanoj vizi; rok nije jednak za sve kategorije.",
          "Aufenthaltserlaubnis §16a — podnesi zahtjev prije isteka D-vize; trajanje i produženje zavise od Ausbildung programa i odluke Ausländerbehörde, ne uvijek jednu godinu.",
          'Jobsuche nakon Ausbildung: 18 mjeseci (§20 AufenthG)'
        ],
        errors: [
          'Nema Ausbildungsvertrag → automatsko odbijanje',
          "Njemački za Ausbildung — u pravilu B1 ako ustanova nije već provjerila jezik ili nije predviđen pripremni kurs; zanimanje može tražiti više. Ambasada navodi priznate certifikate, starost i ispitna mjesta.",
          "Njemački za Ausbildung — u pravilu B1 ako ustanova nije već provjerila jezik ili nije predviđen pripremni kurs; zanimanje može tražiti više. Ambasada navodi priznate certifikate, starost i ispitna mjesta.",
          'Nepotpuni ili neprevedeni dokumenti',
          'Pogrešan tip vize (§16b Studium umjesto §16a Ausbildung)',
          'Kasno apliciranje — ambasada Sarajevo ima duge čekaonice',
          'Nema dokaza o smještaju',
          'Dokumenti tackerisani ili spojeni spajalicama — ODBIJANJE!',
          'Kasno podnošenje Anmeldung po dolasku (rok 14 dana)',
          "Rad je dozvoljen samo u obimu koji piše na važećoj D-vizi/boravišnoj dozvoli i dodatnom listu. D-viza može već dozvoljavati rad; ne čekaj istek za zahtjev Ausländerbehörde."
        ],
        sources: [
          { label: 'Ambasada Sarajevo — termini', url: 'https://sarajewo.diplo.de' },
          { label: 'Make it in Germany — Berufsausbildung', url: 'https://www.make-it-in-germany.com/de/visum/arten/berufsausbildung' },
          { label: 'BAMF — §16a AufenthG', url: 'https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/Bildung/Berufsausbildung/berufsausbildung-node.html' },
          { label: 'Bundesagentur für Arbeit — Ausbildung', url: 'https://www.arbeitsagentur.de/bildung/ausbildung' },
          { label: 'Gesetze im Internet — §16a AufenthG', url: 'https://www.gesetze-im-internet.de/aufenthg_2004/__16a.html' }
        ],
        musterformulare: [
          { title: 'VIDEX — Viza aplikacioni formular (Ausbildung)', subtitle: 'Isti formular za sve zemlje — popunjava se online na digital.diplo.de', formKey: 'VisaAusbildungVidex', downloadUrl: 'https://digital.diplo.de' },
          { title: 'Antrag auf Aufenthaltstitel §16a AufenthG', subtitle: 'Podnosi se u Njemačkoj pri Ausländerbehörde — demo/preview', formKey: 'VisaAusbildungAufenthalt', downloadUrl: 'https://www.bamf.de' },
          { title: 'Lebenslauf (CV) — Template za Ausbildung', subtitle: 'Editable predložak životopisa na njemačkom jeziku', formKey: 'VisaAusbildungCV', downloadUrl: 'https://www.make-it-in-germany.com' }
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
    embassyUrl: 'https://belgrad.diplo.de',
    embassyNote: "Termin i predaja — otvori službenu stranicu nadležne ambasade za svoju kategoriju; tamo provjeri Auslandsportal, VisaMetric ili termin u ambasadi. Dostupnost i rokovi nisu garantovani.",
    schengenFree: true,
    schengenNote: "S biometrijskim pasošem: bezvizni kratki boravak do 90 dana u bilo kojih 180 dana u Schengenu, ne za zaposlenje; za rad/duži boravak provjeri odgovarajuću nacionalnu vizu.",
    routes: [
      {
        id: 'work',
        title: "Radna viza — Westbalkan §19c(1) AufenthG",
        legalBasis: "§ 19c Abs. 1 AufenthG + § 26 Abs. 2 BeschV",
        subtitle: 'Boravišna dozvola za zaposlenje. Srbija je deo Westbalkan-Regelung.',
        westbalkanNote: "Westbalkan-Regelung: do 50.000 saglasnosti BA godišnje za svih šest zemalja zajedno, raspoređeno po mjesecu i državljanstvu — ne 50.000 viza. U pravilu bez priznavanja kvalifikacije, ali regulisana zanimanja traže odgovarajuće priznanje/dozvolu. BA provjerava zaposlenje i uvjete; potrebni su ponuda posla, saglasnost i ostali vizni uvjeti (uključujući pravilo o AsylbLG davanjima u posljednja 24 mjeseca). Kod prvog BA odobrenja za osobe starije od 45 godina: 2026 bruto 55.770 €/god. ili odgovarajuće starosno osiguranje; provjeri puni popis BA uvjeta.",
        steps: [
          'Pronađi posao — Nađi nemačkog poslodavca koji ti daje obavezujuću ponudu posla.',
          'Vorabzustimmung — Poslodavac podnosi zahtjev Bundesagentur für Arbeit. S Vorabzustimmung + Kundennummer zakazuješ termin brže.',
          "Termin i predaja — otvori službenu stranicu nadležne ambasade za svoju kategoriju; tamo provjeri Auslandsportal, VisaMetric ili termin u ambasadi. Dostupnost i rokovi nisu garantovani.",
          "Pripremi dokumentaciju — pasoš prema listi ambasade, EzB koju popunjava i potpisuje poslodavac, ugovor/ponudu i Vorabzustimmung; fotografije i kopije po pravilima tvoje ambasade.",
          'Apliciraj lično u ambasadu Beograd. Naknada: 75 €.',
          'Ulazak u Nemačku s D-vizom.',
          'Anmeldung — 14 dana od useljenja.',
          "Ausländerbehörde — Aufenthaltserlaubnis §19c(1) PRE isteka D-vize."
        ],
        documents: [
          "Važeći pasoš — trajanje važenja i potrebne kopije provjeri u aktuelnoj listi nadležne ambasade za svoju kategoriju vize.",
          "Biometrijska fotografija — broj, format i način predaje prema aktuelnoj listi ambasade; za eAT u Njemačkoj važe posebna pravila digitalne fotografije.",
          'EzB — popunjava i potpisuje POSLODAVAC',
          'Vorabzustimmung Bundesagentur für Arbeit',
          'Ugovor o radu ili obavezujuća ponuda posla',
          'Zdravstveno osiguranje',
          'Dokaz o stanovanju'
        ],
        costs: ['D-Viza: 75 €', 'Aufenthaltserlaubnis: 100–110 €', "Obrada i čekanje — zavise od ambasade, Ausländerbehörde, kategorije i kompletnosti; službenu trenutnu procjenu provjeri, bez garantovanog roka."],
        errors: ['EzB nije potpisana od poslodavca', "Biometrijska fotografija — broj, format i način predaje prema aktuelnoj listi ambasade; za eAT u Njemačkoj važe posebna pravila digitalne fotografije.", "Rad je dozvoljen samo u obimu koji piše na važećoj D-vizi/boravišnoj dozvoli i dodatnom listu. D-viza može već dozvoljavati rad; ne čekaj istek za zahtjev Ausländerbehörde."],
        sources: [
          { label: 'Ambasada Beograd', url: 'https://belgrad.diplo.de' },
          { label: 'Bundesagentur für Arbeit — Westbalkan', url: 'https://www.arbeitsagentur.de/unternehmen/fachkraefte-ausland/westbalkanregelung' },
          { label: 'Make it in Germany', url: 'https://www.make-it-in-germany.com/de/visum-aufenthalt' }
        ],
        musterformulare: [
          { title: 'Musterformular 1: Antrag auf Aufenthaltserlaubnis', subtitle: "Popunjen primer za §19c(1) Srbija", formKey: 'VisaWorkForm1', downloadUrl: 'https://www.bamf.de' },
          { title: 'Musterformular 2: EzB — Erklärung zum Beschäftigungsverhältnis', subtitle: 'Formular koji popunjava POSLODAVAC', formKey: 'VisaWorkForm2', downloadUrl: 'https://www.arbeitsagentur.de/unternehmen/fachkraefte-ausland/westbalkanregelung' }
        ]
      },
      {
        id: 'bluecard',
        title: 'EU Plava karta §18g AufenthG',
        legalBasis: '§ 18g AufenthG',
        subtitle: 'Za visokokvalifikovane sa priznatom diplomom i ugovorom min. 45.300 €/god.',
        steps: [
          "Provjeri kvalifikaciju — za visokoškolsku diplomu anabin ili ZAB; postoje posebni putevi za određene IT stručnjake bez diplome uz dokaz iskustva. Provjeri konkretne uvjete §18g.",
          "Ugovor o radu — min. 50.700 €/god. standard ili 45.934,20 € za Mangelberufe.",
          "EU Plava karta — BA saglasnost se u pravilu ne traži na standardnom pragu; na nižem pragu i posebnim putevima može biti potrebna. Prati kategoriju ambasade; važenje do 4 godine ili ugovor + 3 mjeseca.",
          'Apliciraj za vizu s AUFENTHG-034.',
          'Ulaz u Nemačku, Anmeldung, Ausländerbehörde — EU Plava karta §18g.'
        ],
        documents: ['Pasoš', "Biometrijska fotografija — broj, format i način predaje prema aktuelnoj listi ambasade; za eAT u Njemačkoj važe posebna pravila digitalne fotografije.", 'AUFENTHG-034', 'Diploma + overen prevod', "Ugovor o radu (min. 50.700 €)", 'Zdravstveno osiguranje'],
        costs: ['D-Viza: 75 €', 'EU Plava karta: 100–110 €', "Obrada i čekanje — zavise od ambasade, Ausländerbehörde, kategorije i kompletnosti; službenu trenutnu procjenu provjeri, bez garantovanog roka."],
        errors: ['Diploma nije proverena na anabin pre aplikacije!', 'Plata ispod minimuma — zahtev odbijen'],
        sources: [
          { label: 'Ambasada Beograd', url: 'https://belgrad.diplo.de' },
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
          "A1 za supružnike — često se traži prije ulaska, ali postoje zakonski izuzeci, uključujući određene stručne radnike i EU Plavu kartu; provjeri svoj slučaj i prihvaćene certifikate kod ambasade.",
          "Isprave i prijevod — provjeri traženi original, kopije, ovjereni prijevod i treba li Apostille/legalizacija baš za tu ispravu; međunarodni izvodi mogu imati izuzetke.",
          'Overen prevod — sudski prevodilac na nemački.',
          'Termin u ambasadi Beograd — belgrad.diplo.de.',
          'Apliciraj za vizu. Ulazak. Anmeldung. Ausländerbehörde §30/§32.'
        ],
        documents: [
          'Pasoš', "Biometrijska fotografija — broj, format i način predaje prema aktuelnoj listi ambasade; za eAT u Njemačkoj važe posebna pravila digitalne fotografije.",
          'Antrag auf Aufenthaltserlaubnis',
          "Isprave i prijevod — provjeri traženi original, kopije, ovjereni prijevod i treba li Apostille/legalizacija baš za tu ispravu; međunarodni izvodi mogu imati izuzetke.",
          "Isprave i prijevod — provjeri traženi original, kopije, ovjereni prijevod i treba li Apostille/legalizacija baš za tu ispravu; međunarodni izvodi mogu imati izuzetke.",
          "A1 za supružnike — često se traži prije ulaska, ali postoje zakonski izuzeci, uključujući određene stručne radnike i EU Plavu kartu; provjeri svoj slučaj i prihvaćene certifikate kod ambasade.",
          'Platni listići (3 mes.) osobe u Nemačkoj',
          "Stanovanje i prihodi — da li se traže i koji dokazi trebaju zavisi od porodične rute i statusa osobe u Njemačkoj; nema jedinstvenog minimuma 12 m² za svaki slučaj."
        ],
        costs: ['D-Viza: 75 € (deca: 37,50 €)', 'A1 kurs + ispit: 150–400 €', "Isprave i prijevod — provjeri traženi original, kopije, ovjereni prijevod i treba li Apostille/legalizacija baš za tu ispravu; međunarodni izvodi mogu imati izuzetke.", 'Overen prevod: 50–120 € po doc.'],
        errors: ["A1 za supružnike — često se traži prije ulaska, ali postoje zakonski izuzeci, uključujući određene stručne radnike i EU Plavu kartu; provjeri svoj slučaj i prihvaćene certifikate kod ambasade.", "Isprave i prijevod — provjeri traženi original, kopije, ovjereni prijevod i treba li Apostille/legalizacija baš za tu ispravu; međunarodni izvodi mogu imati izuzetke.", "Stanovanje i prihodi — da li se traže i koji dokazi trebaju zavisi od porodične rute i statusa osobe u Njemačkoj; nema jedinstvenog minimuma 12 m² za svaki slučaj."],
        sources: [
          { label: 'Ambasada Beograd', url: 'https://belgrad.diplo.de' },
          { label: 'Goethe-Institut Serbien', url: 'https://www.goethe.de/ins/cs/sr/index.html' },
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
          "Finansiranje studija — 2026: 11.904 €/god. (992 €/mjesec) putem Sperrkonto; moguć je i drugi prihvaćeni dokaz, npr. stipendija ili Verpflichtungserklärung. Provjeri ambasadinu aktuelnu listu prije uplate.",
          'Termin ambasada Beograd. Apliciraj. Ulaz. Immatrikulacija. Anmeldung. Ausländerbehörde §16b.'
        ],
        documents: ['Pasoš', "Biometrijska fotografija — broj, format i način predaje prema aktuelnoj listi ambasade; za eAT u Njemačkoj važe posebna pravila digitalne fotografije.", 'Zulassungsbescheid sveučilišta', 'TestDaF/IELTS potvrda', "Sperrkonto potvrda (11.904 €)", 'Matura + overen prevod'],
        costs: ["Sperrkonto: 11.904 €/god.", 'D-Viza: 75 €', 'Aufenthaltserlaubnis: 100–110 €'],
        errors: ['Sperrkonto prekasno otvoren — traje 2–4 nedelje!', "Prekid studija/Exmatrikulation — može uticati na svrhu boravka; odmah provjeri sa Ausländerbehörde važenje, rokove i moguće promjene, ne pretpostavljaj automatsko gašenje."],
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
        subtitle: "Niederlassungserlaubnis i Daueraufenthalt-EU imaju različite uvjete i posljedice. S Ausländerbehörde provjeri koji zahtjev odgovara tvojoj situaciji i zasebne takse; zajednička predaja nije obavezna.",
        steps: ['5 god. zakonit boravak', 'B1 nemački — Integracioni kurs ili B1 ispit', "Opći put §9: u pravilu 5 godina, 60 mjeseci doprinosa, B1 i drugi uvjeti; postoje posebni putevi i izuzeci. Za §9a se uvjeti provjeravaju zasebno kod Ausländerbehörde.", 'Termin Ausländerbehörde (2–6 mes. čekanja!)', "Niederlassungserlaubnis i Daueraufenthalt-EU imaju različite uvjete i posljedice. S Ausländerbehörde provjeri koji zahtjev odgovara tvojoj situaciji i zasebne takse; zajednička predaja nije obavezna."],
        documents: ['Pasoš + kopije svih stranica', "Niederlassungserlaubnis i Daueraufenthalt-EU imaju različite uvjete i posljedice. S Ausländerbehörde provjeri koji zahtjev odgovara tvojoj situaciji i zasebne takse; zajednička predaja nije obavezna.", "Opći put §9: u pravilu 5 godina, 60 mjeseci doprinosa, B1 i drugi uvjeti; postoje posebni putevi i izuzeci. Za §9a se uvjeti provjeravaju zasebno kod Ausländerbehörde.", 'B1 certifikat', 'Platni listići 3 mes.', 'Sve dosadašnje dozvole 5 god.'],
        costs: ['NE: 113 €', "Niederlassungserlaubnis i Daueraufenthalt-EU imaju različite uvjete i posljedice. S Ausländerbehörde provjeri koji zahtjev odgovara tvojoj situaciji i zasebne takse; zajednička predaja nije obavezna."],
        errors: ["Opći put §9: u pravilu 5 godina, 60 mjeseci doprinosa, B1 i drugi uvjeti; postoje posebni putevi i izuzeci. Za §9a se uvjeti provjeravaju zasebno kod Ausländerbehörde.", "Opći put §9: u pravilu 5 godina, 60 mjeseci doprinosa, B1 i drugi uvjeti; postoje posebni putevi i izuzeci. Za §9a se uvjeti provjeravaju zasebno kod Ausländerbehörde.", "Niederlassungserlaubnis i Daueraufenthalt-EU imaju različite uvjete i posljedice. S Ausländerbehörde provjeri koji zahtjev odgovara tvojoj situaciji i zasebne takse; zajednička predaja nije obavezna."],
        sources: [
          { label: 'BAMF — Niederlassungserlaubnis', url: 'https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/DauerhafterAufenthalt/dauerhafter-aufenthalt-node.html' },
          { label: 'Deutsche Rentenversicherung', url: 'https://www.drv.de' }
        ],
        musterformulare: [
          { title: 'Musterformular 1: Niederlassungserlaubnis', subtitle: 'AUFENTHG-009 primer Srbija', formKey: 'VisaPermanentForm1', downloadUrl: 'https://www.bamf.de' },
          { title: 'Musterformular 2: Daueraufenthalt-EU', subtitle: 'AUFENTHG-014 primer Srbija', formKey: 'VisaPermanentForm2', downloadUrl: 'https://www.bamf.de' }
        ]
      }
,
      {
        id: 'ausbildung',
        title: 'Ausbildung viza §16a AufenthG',
        legalBasis: '§ 16a AufenthG',
        subtitle: 'Aufenthaltserlaubnis zur Berufsausbildung — Dozvola boravka za stručno osposobljavanje (Ausbildung) u Nemačkoj.',
        ausbildungHighlight: [
          '✅ Možeš aplicirati direktno iz Srbije',
          "Školski dokazi — firma/škola određuje uvjete upisa i eventualno priznavanje; ne pretpostavljaj da priznavanje nikad nije potrebno.",
          '✅ Firma mora prijaviti Ausbildungsvertrag kod Kammer (IHK/HWK)',
          "Za betriebliche Ausbildung BA u pravilu provjerava uvjete kroz postupak; saglasnost nije automatsko obećanje vize.",
          '✅ Nakon završetka: mogućnost ostanka 18 meseci za traženje posla (§20 AufenthG)',
          '⚠️ Važno: Ausbildung ≠ Studij — ne mešati sa §16b AufenthG (Studium)'
        ],
        countryNotes: [
          '💰 Taksa: 75€ — plaća se u RSD, gotovina (kurs ambasade)',
          '📋 Formular: VIDEX (ne standardni Schengen) — online popunjava se, štampa, potpisuje rukom',
          '📄 Dokumenti: Original + 1 kopija (A4) — NIJE tackerisati, NIJE spajati, sortirati redosledom s merkblata',
          "Biometrijska fotografija — broj, format i način predaje prema aktuelnoj listi ambasade; za eAT u Njemačkoj važe posebna pravila digitalne fotografije.",
          "Isprave i prijevod — provjeri traženi original, kopije, ovjereni prijevod i treba li Apostille/legalizacija baš za tu ispravu; međunarodni izvodi mogu imati izuzetke.",
          "Njemački za Ausbildung — u pravilu B1 ako ustanova nije već provjerila jezik ili nije predviđen pripremni kurs; zanimanje može tražiti više. Ambasada navodi priznate certifikate, starost i ispitna mjesta.",
          '⚠️ Nepotpuni zahtevi se ODBIJAJU uz naplatu takse',
          '🔄 Vorabzustimmung (preporučeno): Poslodavac može unapred dobiti saglasnost BA — ubrzava postupak'
        ],
        countryBadge: "Upute nadležne ambasade",
        steps: [
          'Pronađi Ausbildung mesto — Moraš imati potpisan Ausbildungsvertrag PRE podnošenja zahteva za vizu. Koristi: bundesagentur.de, ausbildung.de, make-it-in-germany.com',
          "Njemački za Ausbildung — u pravilu B1 ako ustanova nije već provjerila jezik ili nije predviđen pripremni kurs; zanimanje može tražiti više. Ambasada navodi priznate certifikate, starost i ispitna mjesta.",
          "Biometrijska fotografija — broj, format i način predaje prema aktuelnoj listi ambasade; za eAT u Njemačkoj važe posebna pravila digitalne fotografije.",
          'Zakaži termin u ambasadi Beograd — Na belgrad.diplo.de. Rokovi: 4–12 nedelja — apliciraj rano!',
          'Podnesi zahtev za D-vizu — Lično u ambasadi Beograd. Taksa: 75€ (u RSD, gotovina).',
          "D-viza — datum važenja, broj ulazaka i dozvoljeno zaposlenje provjeri na izdanoj vizi; rok nije jednak za sve kategorije.",
          'Dolazak u Nemačku — Obavezno uradi Anmeldung u roku 14 dana od doseljenja.',
          "Aufenthaltserlaubnis §16a — podnesi zahtjev prije isteka D-vize; trajanje i produženje zavise od Ausbildung programa i odluke Ausländerbehörde, ne uvijek jednu godinu."
        ],
        documents: [
          "Važeći pasoš — trajanje važenja i potrebne kopije provjeri u aktuelnoj listi nadležne ambasade za svoju kategoriju vize.",
          'Potpisan Ausbildungsvertrag (original + kopija)',
          'Potvrda IHK/HWK registracije Ausbildungsvertrag',
          'Lebenslauf / CV (na nemačkom jeziku)',
          "Isprave i prijevod — provjeri traženi original, kopije, ovjereni prijevod i treba li Apostille/legalizacija baš za tu ispravu; međunarodni izvodi mogu imati izuzetke.",
          "Njemački za Ausbildung — u pravilu B1 ako ustanova nije već provjerila jezik ili nije predviđen pripremni kurs; zanimanje može tražiti više. Ambasada navodi priznate certifikate, starost i ispitna mjesta.",
          'Dokaz o smeštaju u Nemačkoj',
          'Zdravstveno osiguranje',
          'Finansijski dokaz: platna lista ILI Sperrkonto ILI Verpflichtungserklärung',
          'VIDEX formular (online popunjen, odštampan, potpisan)',
          "Biometrijska fotografija — broj, format i način predaje prema aktuelnoj listi ambasade; za eAT u Njemačkoj važe posebna pravila digitalne fotografije.",
          'Potpisani merkblatt ambasade',
          'Taksa: 75€ u RSD gotovinom'
        ],
        costs: [
          'D-Viza taksa: 75€ (u RSD, gotovina)',
          'Aufenthaltstitel taksa: 100–110 €',
          "Obrada i čekanje — zavise od ambasade, Ausländerbehörde, kategorije i kompletnosti; službenu trenutnu procjenu provjeri, bez garantovanog roka.",
          "Obrada i čekanje — zavise od ambasade, Ausländerbehörde, kategorije i kompletnosti; službenu trenutnu procjenu provjeri, bez garantovanog roka.",
          "Finansiranje Ausbildung (2026): školska najmanje 959 € neto/mjesec; betriebliche najmanje 1.048 € bruto ili 822 € neto plate/mjesec. Manjak se može pokriti Sperrkonto/Verpflichtungserklärung. Neke liste ambasada imaju drugačije/starije iznose — provjeri prije uplate.",
          "D-viza — datum važenja, broj ulazaka i dozvoljeno zaposlenje provjeri na izdanoj vizi; rok nije jednak za sve kategorije.",
          "Aufenthaltserlaubnis §16a — podnesi zahtjev prije isteka D-vize; trajanje i produženje zavise od Ausbildung programa i odluke Ausländerbehörde, ne uvijek jednu godinu.",
          'Jobsuche nakon Ausbildung: 18 meseci (§20 AufenthG)'
        ],
        errors: [
          'Nema Ausbildungsvertrag → automatsko odbijanje',
          "Njemački za Ausbildung — u pravilu B1 ako ustanova nije već provjerila jezik ili nije predviđen pripremni kurs; zanimanje može tražiti više. Ambasada navodi priznate certifikate, starost i ispitna mjesta.",
          "Njemački za Ausbildung — u pravilu B1 ako ustanova nije već provjerila jezik ili nije predviđen pripremni kurs; zanimanje može tražiti više. Ambasada navodi priznate certifikate, starost i ispitna mjesta.",
          'Nepotpuni ili neprevedeni dokumenti — zahtev se ODBIJA uz naplatu takse!',
          'Pogrešan tip vize (§16b Studium umjesto §16a Ausbildung)',
          'Kasno apliciranje — ambasada Beograd ima duge čekaonice',
          "Biometrijska fotografija — broj, format i način predaje prema aktuelnoj listi ambasade; za eAT u Njemačkoj važe posebna pravila digitalne fotografije.",
          'Dokumenti nisu sortirani po merkblatu',
          'Kasno podnošenje Anmeldung po dolasku (rok 14 dana)',
          "Rad je dozvoljen samo u obimu koji piše na važećoj D-vizi/boravišnoj dozvoli i dodatnom listu. D-viza može već dozvoljavati rad; ne čekaj istek za zahtjev Ausländerbehörde."
        ],
        sources: [
          { label: 'Ambasada Beograd — termini', url: 'https://belgrad.diplo.de' },
          { label: 'Make it in Germany — Berufsausbildung', url: 'https://www.make-it-in-germany.com/de/visum/arten/berufsausbildung' },
          { label: 'BAMF — §16a AufenthG', url: 'https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/Bildung/Berufsausbildung/berufsausbildung-node.html' },
          { label: 'Bundesagentur für Arbeit — Ausbildung', url: 'https://www.arbeitsagentur.de/bildung/ausbildung' },
          { label: 'Gesetze im Internet — §16a AufenthG', url: 'https://www.gesetze-im-internet.de/aufenthg_2004/__16a.html' }
        ],
        musterformulare: [
          { title: 'VIDEX — Viza aplikacioni formular (Ausbildung)', subtitle: 'Online popuniti, odštampati, potpisati — OBAVEZNO za Srbiju', formKey: 'VisaAusbildungVidex', downloadUrl: 'https://digital.diplo.de' },
          { title: 'Antrag auf Aufenthaltstitel §16a AufenthG', subtitle: 'Podnosi se u Nemačkoj pri Ausländerbehörde — demo/preview', formKey: 'VisaAusbildungAufenthalt', downloadUrl: 'https://www.bamf.de' },
          { title: 'Lebenslauf (CV) — Template za Ausbildung', subtitle: 'Editable predložak životopisa na nemačkom jeziku', formKey: 'VisaAusbildungCV', downloadUrl: 'https://www.make-it-in-germany.com' }
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
    embassyUrl: 'https://podgorica.diplo.de',
    embassyNote: "Termin i predaja — otvori službenu stranicu nadležne ambasade za svoju kategoriju; tamo provjeri Auslandsportal, VisaMetric ili termin u ambasadi. Dostupnost i rokovi nisu garantovani.",
    schengenFree: true,
    schengenNote: "S biometrijskim pasošem: bezvizni kratki boravak do 90 dana u bilo kojih 180 dana u Schengenu, ne za zaposlenje; za rad/duži boravak provjeri odgovarajuću nacionalnu vizu.",
    routes: [
      {
        id: 'work',
        title: "Radna viza — Westbalkan §19c(1) AufenthG",
        legalBasis: "§ 19c Abs. 1 AufenthG + § 26 Abs. 2 BeschV",
        subtitle: 'Boravišna dozvola za zaposlenje. Crna Gora je dio Westbalkan-Regelung.',
        westbalkanNote: "Westbalkan-Regelung: do 50.000 saglasnosti BA godišnje za svih šest zemalja zajedno, raspoređeno po mjesecu i državljanstvu — ne 50.000 viza. U pravilu bez priznavanja kvalifikacije, ali regulisana zanimanja traže odgovarajuće priznanje/dozvolu. BA provjerava zaposlenje i uvjete; potrebni su ponuda posla, saglasnost i ostali vizni uvjeti (uključujući pravilo o AsylbLG davanjima u posljednja 24 mjeseca). Kod prvog BA odobrenja za osobe starije od 45 godina: 2026 bruto 55.770 €/god. ili odgovarajuće starosno osiguranje; provjeri puni popis BA uvjeta.",
        steps: [
          'Pronađi posao — Njemacki poslodavac s obavezujućom ponudom posla.',
          'Vorabzustimmung — Poslodavac pribavlja od Bundesagentur für Arbeit.',
          "Termin i predaja — otvori službenu stranicu nadležne ambasade za svoju kategoriju; tamo provjeri Auslandsportal, VisaMetric ili termin u ambasadi. Dostupnost i rokovi nisu garantovani.",
          "Pripremi dokumentaciju — pasoš prema listi ambasade, EzB koju popunjava i potpisuje poslodavac, ugovor/ponudu i Vorabzustimmung; fotografije i kopije po pravilima tvoje ambasade.",
          'Apliciraj lično. Ulazak s D-vizom.',
          "Anmeldung — 14 dana. Ausländerbehörde §19c(1) PRE isteka vize."
        ],
        documents: ["Važeći pasoš — trajanje važenja i potrebne kopije provjeri u aktuelnoj listi nadležne ambasade za svoju kategoriju vize.", "Biometrijska fotografija — broj, format i način predaje prema aktuelnoj listi ambasade; za eAT u Njemačkoj važe posebna pravila digitalne fotografije.", 'EzB — potpisuje POSLODAVAC', 'Vorabzustimmung BA', 'Ugovor o radu', 'Zdravstveno osiguranje'],
        costs: ['D-Viza: 75 €', 'Aufenthaltserlaubnis: 100–110 €'],
        errors: ['EzB nepotpuna ili bez potpisa', "Termin i predaja — otvori službenu stranicu nadležne ambasade za svoju kategoriju; tamo provjeri Auslandsportal, VisaMetric ili termin u ambasadi. Dostupnost i rokovi nisu garantovani."],
        sources: [
          { label: 'Ambasada Podgorica', url: 'https://podgorica.diplo.de' },
          { label: 'Westbalkan-Regelung', url: 'https://www.make-it-in-germany.com/de/visum-aufenthalt' }
        ],
        musterformulare: [
          { title: "Musterformular 1: Antrag Aufenthaltserlaubnis §19c(1)", subtitle: 'Primjer za Crnu Goru', formKey: 'VisaWorkForm1', downloadUrl: 'https://www.bamf.de' },
          { title: 'Musterformular 2: EzB', subtitle: 'Formular poslodavca', formKey: 'VisaWorkForm2', downloadUrl: 'https://www.arbeitsagentur.de/unternehmen/fachkraefte-ausland/westbalkanregelung' }
        ]
      },
      {
        id: 'family',
        title: 'Spajanje porodice §§27-36 AufenthG',
        legalBasis: '§ 30 + § 32 AufenthG',
        subtitle: 'Supružnici i djeca mogu doći k osobi koja živi u Njemačkoj.',
        steps: [
          "A1 za supružnike — često se traži prije ulaska, ali postoje zakonski izuzeci, uključujući određene stručne radnike i EU Plavu kartu; provjeri svoj slučaj i prihvaćene certifikate kod ambasade.",
          "Isprave i prijevod — provjeri traženi original, kopije, ovjereni prijevod i treba li Apostille/legalizacija baš za tu ispravu; međunarodni izvodi mogu imati izuzetke.",
          'Ovjereni prijevod od sudskog tumača.',
          'Termin ambasada Podgorica. Apliciraj. Ulazak. Anmeldung. Ausländerbehörde §30/§32.'
        ],
        documents: ['Pasoš', "Biometrijska fotografija — broj, format i način predaje prema aktuelnoj listi ambasade; za eAT u Njemačkoj važe posebna pravila digitalne fotografije.", "Isprave i prijevod — provjeri traženi original, kopije, ovjereni prijevod i treba li Apostille/legalizacija baš za tu ispravu; međunarodni izvodi mogu imati izuzetke.", "A1 za supružnike — često se traži prije ulaska, ali postoje zakonski izuzeci, uključujući određene stručne radnike i EU Plavu kartu; provjeri svoj slučaj i prihvaćene certifikate kod ambasade.", 'Platne liste (3 mj.) osobe u Njemačkoj', 'Ugovor o najmu'],
        costs: ['D-Viza: 75 €', 'A1 kurs + ispit: 150–400 €'],
        errors: ["A1 za supružnike — često se traži prije ulaska, ali postoje zakonski izuzeci, uključujući određene stručne radnike i EU Plavu kartu; provjeri svoj slučaj i prihvaćene certifikate kod ambasade.", "Isprave i prijevod — provjeri traženi original, kopije, ovjereni prijevod i treba li Apostille/legalizacija baš za tu ispravu; međunarodni izvodi mogu imati izuzetke."],
        sources: [{ label: 'Ambasada Podgorica', url: 'https://podgorica.diplo.de' }],
        musterformulare: [
          { title: 'Musterformular: Antrag Aufenthaltserlaubnis (Spajanje)', subtitle: '§§27-36 primjer Crna Gora', formKey: 'VisaFamilyForm', downloadUrl: 'https://www.bamf.de' }
        ]
      },
      {
        id: 'permanent',
        title: 'Stalni boravak §9 + Daueraufenthalt-EU §9a',
        legalBasis: '§ 9 + § 9a AufenthG',
        subtitle: "Niederlassungserlaubnis i Daueraufenthalt-EU imaju različite uvjete i posljedice. S Ausländerbehörde provjeri koji zahtjev odgovara tvojoj situaciji i zasebne takse; zajednička predaja nije obavezna.",
        steps: ['5 god. zakonit boravak', 'B1 njemacki', "Opći put §9: u pravilu 5 godina, 60 mjeseci doprinosa, B1 i drugi uvjeti; postoje posebni putevi i izuzeci. Za §9a se uvjeti provjeravaju zasebno kod Ausländerbehörde.", 'Termin Ausländerbehörde', "Niederlassungserlaubnis i Daueraufenthalt-EU imaju različite uvjete i posljedice. S Ausländerbehörde provjeri koji zahtjev odgovara tvojoj situaciji i zasebne takse; zajednička predaja nije obavezna."],
        documents: ['Pasoš', 'AUFENTHG-009 + AUFENTHG-014', 'Rentenversicherungsverlauf', 'B1 certifikat'],
        costs: ["Niederlassungserlaubnis i Daueraufenthalt-EU imaju različite uvjete i posljedice. S Ausländerbehörde provjeri koji zahtjev odgovara tvojoj situaciji i zasebne takse; zajednička predaja nije obavezna."],
        errors: ["Opći put §9: u pravilu 5 godina, 60 mjeseci doprinosa, B1 i drugi uvjeti; postoje posebni putevi i izuzeci. Za §9a se uvjeti provjeravaju zasebno kod Ausländerbehörde.", "Opći put §9: u pravilu 5 godina, 60 mjeseci doprinosa, B1 i drugi uvjeti; postoje posebni putevi i izuzeci. Za §9a se uvjeti provjeravaju zasebno kod Ausländerbehörde."],
        sources: [{ label: 'BAMF', url: 'https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/DauerhafterAufenthalt/dauerhafter-aufenthalt-node.html' }],
        musterformulare: [
          { title: 'Musterformular 1: Niederlassungserlaubnis', subtitle: 'AUFENTHG-009', formKey: 'VisaPermanentForm1', downloadUrl: 'https://www.bamf.de' },
          { title: 'Musterformular 2: Daueraufenthalt-EU', subtitle: 'AUFENTHG-014', formKey: 'VisaPermanentForm2', downloadUrl: 'https://www.bamf.de' }
        ]
      }
,
      {
        id: 'ausbildung',
        title: 'Ausbildung viza §16a AufenthG',
        legalBasis: '§ 16a AufenthG',
        subtitle: 'Aufenthaltserlaubnis zur Berufsausbildung — Dozvola boravka za stručno osposobljavanje (Ausbildung) u Njemačkoj.',
        ausbildungHighlight: [
          '✅ Možeš aplicirati direktno iz Crne Gore',
          "Školski dokazi — firma/škola određuje uvjete upisa i eventualno priznavanje; ne pretpostavljaj da priznavanje nikad nije potrebno.",
          '✅ Firma mora prijaviti Ausbildungsvertrag kod Kammer (IHK/HWK)',
          "Za betriebliche Ausbildung BA u pravilu provjerava uvjete kroz postupak; saglasnost nije automatsko obećanje vize.",
          '✅ Nakon završetka: mogućnost ostanka 18 mjeseci za traženje posla (§20 AufenthG)',
          '⚠️ Važno: Ausbildung ≠ Studij — ne miješati sa §16b AufenthG (Studium)'
        ],
        countryNotes: [
          '💰 Taksa: 75€',
          '📅 Termin: podgorica.diplo.de',
          "Isprave i prijevod — provjeri traženi original, kopije, ovjereni prijevod i treba li Apostille/legalizacija baš za tu ispravu; međunarodni izvodi mogu imati izuzetke.",
          "Aufenthaltserlaubnis §16a — podnesi zahtjev prije isteka D-vize; trajanje i produženje zavise od Ausbildung programa i odluke Ausländerbehörde, ne uvijek jednu godinu."
        ],
        countryBadge: "Upute nadležne ambasade",
        steps: [
          'Pronađi Ausbildung mjesto — Potpisan Ausbildungsvertrag PRIJE zahtjeva za vizu. Koristi: bundesagentur.de, ausbildung.de, make-it-in-germany.com',
          "Aufenthaltserlaubnis §16a — podnesi zahtjev prije isteka D-vize; trajanje i produženje zavise od Ausbildung programa i odluke Ausländerbehörde, ne uvijek jednu godinu.",
          "Isprave i prijevod — provjeri traženi original, kopije, ovjereni prijevod i treba li Apostille/legalizacija baš za tu ispravu; međunarodni izvodi mogu imati izuzetke.",
          'Zakaži termin u ambasadi Podgorica — podgorica.diplo.de. Rokovi: 4–12 sedmica.',
          'Podnesi zahtjev za D-vizu — Lično u ambasadi. Taksa: 75 €.',
          "D-viza — datum važenja, broj ulazaka i dozvoljeno zaposlenje provjeri na izdanoj vizi; rok nije jednak za sve kategorije.",
          'Dolazak u Njemačku — Anmeldung u roku 14 dana.',
          "Aufenthaltserlaubnis §16a — podnesi zahtjev prije isteka D-vize; trajanje i produženje zavise od Ausbildung programa i odluke Ausländerbehörde, ne uvijek jednu godinu."
        ],
        documents: [
          "Važeći pasoš — trajanje važenja i potrebne kopije provjeri u aktuelnoj listi nadležne ambasade za svoju kategoriju vize.",
          'Potpisan Ausbildungsvertrag (original + kopija)',
          'Potvrda IHK/HWK registracije',
          'Lebenslauf / CV (na njemačkom)',
          "Isprave i prijevod — provjeri traženi original, kopije, ovjereni prijevod i treba li Apostille/legalizacija baš za tu ispravu; međunarodni izvodi mogu imati izuzetke.",
          "Aufenthaltserlaubnis §16a — podnesi zahtjev prije isteka D-vize; trajanje i produženje zavise od Ausbildung programa i odluke Ausländerbehörde, ne uvijek jednu godinu.",
          'Dokaz o smještaju u Njemačkoj',
          'Zdravstveno osiguranje',
          'Finansijski dokaz: platna lista ILI Sperrkonto ILI Verpflichtungserklärung',
          'Viza formulari (popunjeni, potpisani)',
          'Biometrijska fotografija (45x35mm)',
          'Taksa: 75 €'
        ],
        costs: [
          'D-Viza taksa: 75 €',
          'Aufenthaltstitel: 100–110 €',
          "Obrada i čekanje — zavise od ambasade, Ausländerbehörde, kategorije i kompletnosti; službenu trenutnu procjenu provjeri, bez garantovanog roka.",
          "Obrada i čekanje — zavise od ambasade, Ausländerbehörde, kategorije i kompletnosti; službenu trenutnu procjenu provjeri, bez garantovanog roka.",
          "Finansiranje Ausbildung (2026): školska najmanje 959 € neto/mjesec; betriebliche najmanje 1.048 € bruto ili 822 € neto plate/mjesec. Manjak se može pokriti Sperrkonto/Verpflichtungserklärung. Neke liste ambasada imaju drugačije/starije iznose — provjeri prije uplate.",
          "D-viza — datum važenja, broj ulazaka i dozvoljeno zaposlenje provjeri na izdanoj vizi; rok nije jednak za sve kategorije.",
          "Aufenthaltserlaubnis §16a — podnesi zahtjev prije isteka D-vize; trajanje i produženje zavise od Ausbildung programa i odluke Ausländerbehörde, ne uvijek jednu godinu.",
          'Jobsuche: 18 mjeseci (§20 AufenthG)'
        ],
        errors: [
          'Nema Ausbildungsvertrag → automatsko odbijanje',
          "Njemački za Ausbildung — u pravilu B1 ako ustanova nije već provjerila jezik ili nije predviđen pripremni kurs; zanimanje može tražiti više. Ambasada navodi priznate certifikate, starost i ispitna mjesta.",
          'Nepotpuni ili neprevedeni dokumenti',
          'Pogrešan tip vize (§16b umjesto §16a)',
          'Kasno apliciranje',
          'Nema dokaza o smještaju',
          'Kasno podnošenje Anmeldung (rok 14 dana)',
          "Rad je dozvoljen samo u obimu koji piše na važećoj D-vizi/boravišnoj dozvoli i dodatnom listu. D-viza može već dozvoljavati rad; ne čekaj istek za zahtjev Ausländerbehörde."
        ],
        sources: [
          { label: 'Ambasada Podgorica', url: 'https://podgorica.diplo.de' },
          { label: 'Make it in Germany — Berufsausbildung', url: 'https://www.make-it-in-germany.com/de/visum/arten/berufsausbildung' },
          { label: 'BAMF — §16a AufenthG', url: 'https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/Bildung/Berufsausbildung/berufsausbildung-node.html' },
          { label: 'Gesetze im Internet — §16a', url: 'https://www.gesetze-im-internet.de/aufenthg_2004/__16a.html' }
        ],
        musterformulare: [
          { title: 'VIDEX — Viza aplikacioni formular (Ausbildung)', subtitle: 'Universal formular — popunjava se online', formKey: 'VisaAusbildungVidex', downloadUrl: 'https://digital.diplo.de' },
          { title: 'Antrag auf Aufenthaltstitel §16a', subtitle: 'Demo/preview — podnosi se u Njemačkoj', formKey: 'VisaAusbildungAufenthalt', downloadUrl: 'https://www.bamf.de' },
          { title: 'Lebenslauf (CV) — Template', subtitle: 'Predložak životopisa za Ausbildung', formKey: 'VisaAusbildungCV', downloadUrl: 'https://www.make-it-in-germany.com' }
        ]
      }
    ]
  },
  {
    code: 'mk',
    name: 'Sjeverna Makedonija',
    flag: 'https://flagcdn.com/h24/mk.png',
    isEU: false,
    embassyName: 'Njemačka ambasada Skoplje',
    embassyUrl: 'https://skopje.diplo.de',
    embassyNote: "Termin i predaja — otvori službenu stranicu nadležne ambasade za svoju kategoriju; tamo provjeri Auslandsportal, VisaMetric ili termin u ambasadi. Dostupnost i rokovi nisu garantovani.",
    schengenFree: true,
    schengenNote: "S biometrijskim pasošem: bezvizni kratki boravak do 90 dana u bilo kojih 180 dana u Schengenu, ne za zaposlenje; za rad/duži boravak provjeri odgovarajuću nacionalnu vizu.",
    routes: [
      {
        id: 'work',
        title: "Radna viza — Westbalkan §19c(1) AufenthG",
        legalBasis: "§ 19c Abs. 1 AufenthG + § 26 Abs. 2 BeschV",
        subtitle: 'Boravišna dozvola za zaposlenje. Makedonija je dio Westbalkan-Regelung. Ambasada u Skoplju koristi §19c AufenthG.',
        westbalkanNote: "Westbalkan-Regelung: do 50.000 saglasnosti BA godišnje za svih šest zemalja zajedno, raspoređeno po mjesecu i državljanstvu — ne 50.000 viza. U pravilu bez priznavanja kvalifikacije, ali regulisana zanimanja traže odgovarajuće priznanje/dozvolu. BA provjerava zaposlenje i uvjete; potrebni su ponuda posla, saglasnost i ostali vizni uvjeti (uključujući pravilo o AsylbLG davanjima u posljednja 24 mjeseca). Kod prvog BA odobrenja za osobe starije od 45 godina: 2026 bruto 55.770 €/god. ili odgovarajuće starosno osiguranje; provjeri puni popis BA uvjeta.",
        steps: [
          'Pronađi posao kod njemačkog poslodavca.',
          'Vorabzustimmung — Poslodavac traži Vorabzustimmung od Bundesagentur für Arbeit.',
          "Termin i predaja — otvori službenu stranicu nadležne ambasade za svoju kategoriju; tamo provjeri Auslandsportal, VisaMetric ili termin u ambasadi. Dostupnost i rokovi nisu garantovani.",
          "Pripremi dokumentaciju — pasoš prema listi ambasade, EzB koju popunjava i potpisuje poslodavac, ugovor/ponudu i Vorabzustimmung; fotografije i kopije po pravilima tvoje ambasade.",
          "Apliciraj lično. Ulazak s D-vizom. Anmeldung. Ausländerbehörde §19c(1)."
        ],
        documents: ["Važeći pasoš — trajanje važenja i potrebne kopije provjeri u aktuelnoj listi nadležne ambasade za svoju kategoriju vize.", "Biometrijska fotografija — broj, format i način predaje prema aktuelnoj listi ambasade; za eAT u Njemačkoj važe posebna pravila digitalne fotografije.", 'EzB — potpisuje POSLODAVAC', 'Vorabzustimmung BA', 'Ugovor o radu', 'Zdravstveno osiguranje'],
        costs: ['D-Viza: 75 €', 'Aufenthaltserlaubnis: 100–110 €'],
        errors: ['EzB nepotpuna ili bez potpisa', "Biometrijska fotografija — broj, format i način predaje prema aktuelnoj listi ambasade; za eAT u Njemačkoj važe posebna pravila digitalne fotografije."],
        sources: [
          { label: 'Ambasada Skoplje', url: 'https://skopje.diplo.de' },
          { label: 'Westbalkan-Regelung', url: 'https://www.make-it-in-germany.com/de/visum-aufenthalt' }
        ],
        musterformulare: [
          { title: "Musterformular 1: Antrag Aufenthaltserlaubnis §19c(1)", subtitle: 'Primjer za Makedoniju', formKey: 'VisaWorkForm1', downloadUrl: 'https://www.bamf.de' },
          { title: 'Musterformular 2: EzB', subtitle: 'Formular poslodavca', formKey: 'VisaWorkForm2', downloadUrl: 'https://www.arbeitsagentur.de/unternehmen/fachkraefte-ausland/westbalkanregelung' }
        ]
      },
      {
        id: 'family',
        title: 'Spajanje porodice §§27-36 AufenthG',
        legalBasis: '§ 30 + § 32 AufenthG',
        subtitle: 'Supružnici i djeca mogu doći k osobi koja živi u Njemačkoj.',
        steps: [
          "A1 za supružnike — često se traži prije ulaska, ali postoje zakonski izuzeci, uključujući određene stručne radnike i EU Plavu kartu; provjeri svoj slučaj i prihvaćene certifikate kod ambasade.",
          "Isprave i prijevod — provjeri traženi original, kopije, ovjereni prijevod i treba li Apostille/legalizacija baš za tu ispravu; međunarodni izvodi mogu imati izuzetke.",
          'Ovjereni prijevod na njemački.',
          'Termin u ambasadi Skoplje. Apliciraj. Ulazak. Anmeldung. Ausländerbehörde §30/§32.'
        ],
        documents: ['Pasoš', "Biometrijska fotografija — broj, format i način predaje prema aktuelnoj listi ambasade; za eAT u Njemačkoj važe posebna pravila digitalne fotografije.", "Isprave i prijevod — provjeri traženi original, kopije, ovjereni prijevod i treba li Apostille/legalizacija baš za tu ispravu; međunarodni izvodi mogu imati izuzetke.", "A1 za supružnike — često se traži prije ulaska, ali postoje zakonski izuzeci, uključujući određene stručne radnike i EU Plavu kartu; provjeri svoj slučaj i prihvaćene certifikate kod ambasade.", 'Platne liste (3 mj.) osobe u Njemačkoj', 'Ugovor o najmu'],
        costs: ['D-Viza: 75 €', 'A1 kurs + ispit: 150–400 €'],
        errors: ["A1 za supružnike — često se traži prije ulaska, ali postoje zakonski izuzeci, uključujući određene stručne radnike i EU Plavu kartu; provjeri svoj slučaj i prihvaćene certifikate kod ambasade.", "Isprave i prijevod — provjeri traženi original, kopije, ovjereni prijevod i treba li Apostille/legalizacija baš za tu ispravu; međunarodni izvodi mogu imati izuzetke."],
        sources: [{ label: 'Ambasada Skoplje', url: 'https://skopje.diplo.de' }],
        musterformulare: [
          { title: 'Musterformular: Antrag Aufenthaltserlaubnis (Spajanje)', subtitle: '§§27-36 primjer za Makedoniju', formKey: 'VisaFamilyForm', downloadUrl: 'https://www.bamf.de' }
        ]
      },
      {
        id: 'permanent',
        title: 'Stalni boravak §9 + Daueraufenthalt-EU §9a',
        legalBasis: '§ 9 + § 9a AufenthG',
        subtitle: "Niederlassungserlaubnis i Daueraufenthalt-EU imaju različite uvjete i posljedice. S Ausländerbehörde provjeri koji zahtjev odgovara tvojoj situaciji i zasebne takse; zajednička predaja nije obavezna.",
        steps: ['5 god. zakonit boravak', 'B1 njemački', "Opći put §9: u pravilu 5 godina, 60 mjeseci doprinosa, B1 i drugi uvjeti; postoje posebni putevi i izuzeci. Za §9a se uvjeti provjeravaju zasebno kod Ausländerbehörde.", 'Termin Ausländerbehörde', "Niederlassungserlaubnis i Daueraufenthalt-EU imaju različite uvjete i posljedice. S Ausländerbehörde provjeri koji zahtjev odgovara tvojoj situaciji i zasebne takse; zajednička predaja nije obavezna."],
        documents: ['Pasoš', 'AUFENTHG-009 + AUFENTHG-014', 'Rentenversicherungsverlauf', 'B1 certifikat'],
        costs: ["Niederlassungserlaubnis i Daueraufenthalt-EU imaju različite uvjete i posljedice. S Ausländerbehörde provjeri koji zahtjev odgovara tvojoj situaciji i zasebne takse; zajednička predaja nije obavezna."],
        errors: ["Opći put §9: u pravilu 5 godina, 60 mjeseci doprinosa, B1 i drugi uvjeti; postoje posebni putevi i izuzeci. Za §9a se uvjeti provjeravaju zasebno kod Ausländerbehörde.", "Opći put §9: u pravilu 5 godina, 60 mjeseci doprinosa, B1 i drugi uvjeti; postoje posebni putevi i izuzeci. Za §9a se uvjeti provjeravaju zasebno kod Ausländerbehörde."],
        sources: [{ label: 'BAMF', url: 'https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/DauerhafterAufenthalt/dauerhafter-aufenthalt-node.html' }],
        musterformulare: [
          { title: 'Musterformular 1: Niederlassungserlaubnis', subtitle: 'AUFENTHG-009 primjer MK', formKey: 'VisaPermanentForm1', downloadUrl: 'https://www.bamf.de' },
          { title: 'Musterformular 2: Daueraufenthalt-EU', subtitle: 'AUFENTHG-014 primjer MK', formKey: 'VisaPermanentForm2', downloadUrl: 'https://www.bamf.de' }
        ]
      }
,
      {
        id: 'ausbildung',
        title: 'Ausbildung viza §16a AufenthG',
        legalBasis: '§ 16a AufenthG',
        subtitle: 'Aufenthaltserlaubnis zur Berufsausbildung — Dozvola boravka za stručno osposobljavanje (Ausbildung) u Njemačkoj.',
        ausbildungHighlight: [
          '✅ Možeš aplicirati direktno iz Makedonije',
          "Školski dokazi — firma/škola određuje uvjete upisa i eventualno priznavanje; ne pretpostavljaj da priznavanje nikad nije potrebno.",
          '✅ Firma mora prijaviti Ausbildungsvertrag kod Kammer (IHK/HWK)',
          "Za betriebliche Ausbildung BA u pravilu provjerava uvjete kroz postupak; saglasnost nije automatsko obećanje vize.",
          '✅ Nakon završetka: mogućnost ostanka 18 mjeseci za traženje posla (§20 AufenthG)',
          '⚠️ Važno: Ausbildung ≠ Studij — ne miješaj sa §16b AufenthG (Studium)'
        ],
        countryNotes: [
          '💰 Taksa: 75€',
          '📅 Termin: skopje.diplo.de',
          "Isprave i prijevod — provjeri traženi original, kopije, ovjereni prijevod i treba li Apostille/legalizacija baš za tu ispravu; međunarodni izvodi mogu imati izuzetke.",
          "Njemački za Ausbildung — u pravilu B1 ako ustanova nije već provjerila jezik ili nije predviđen pripremni kurs; zanimanje može tražiti više. Ambasada navodi priznate certifikate, starost i ispitna mjesta."
        ],
        countryBadge: "Upute nadležne ambasade",
        steps: [
          'Pronađi Ausbildung mjesto — Potpisan Ausbildungsvertrag PRIJE apliciranja. Koristi: bundesagentur.de, ausbildung.de, make-it-in-germany.com',
          "Njemački za Ausbildung — u pravilu B1 ako ustanova nije već provjerila jezik ili nije predviđen pripremni kurs; zanimanje može tražiti više. Ambasada navodi priznate certifikate, starost i ispitna mjesta.",
          "Isprave i prijevod — provjeri traženi original, kopije, ovjereni prijevod i treba li Apostille/legalizacija baš za tu ispravu; međunarodni izvodi mogu imati izuzetke.",
          'Zakaži termin u ambasadi Skoplje — skopje.diplo.de. Rokovi: 4–12 sedmica.',
          'Podnesi zahtjev za D-vizu — Lično. Taksa: 75 €.',
          "D-viza — datum važenja, broj ulazaka i dozvoljeno zaposlenje provjeri na izdanoj vizi; rok nije jednak za sve kategorije.",
          'Dolazak u Njemačku — Anmeldung u roku 14 dana.',
          "Aufenthaltserlaubnis §16a — podnesi zahtjev prije isteka D-vize; trajanje i produženje zavise od Ausbildung programa i odluke Ausländerbehörde, ne uvijek jednu godinu."
        ],
        documents: [
          "Važeći pasoš — trajanje važenja i potrebne kopije provjeri u aktuelnoj listi nadležne ambasade za svoju kategoriju vize.",
          'Potpisan Ausbildungsvertrag (original + kopija)',
          'Potvrda IHK/HWK registracije',
          'Lebenslauf / CV (na njemačkom)',
          "Isprave i prijevod — provjeri traženi original, kopije, ovjereni prijevod i treba li Apostille/legalizacija baš za tu ispravu; međunarodni izvodi mogu imati izuzetke.",
          "Njemački za Ausbildung — u pravilu B1 ako ustanova nije već provjerila jezik ili nije predviđen pripremni kurs; zanimanje može tražiti više. Ambasada navodi priznate certifikate, starost i ispitna mjesta.",
          'Dokaz o smještaju u Njemačkoj',
          'Zdravstveno osiguranje',
          'Finansijski dokaz: plata ILI Sperrkonto ILI Verpflichtungserklärung',
          'Viza formulari (popunjeni, potpisani)',
          'Biometrijska fotografija (45x35mm)',
          'Taksa: 75 €'
        ],
        costs: [
          'D-Viza taksa: 75 €',
          'Aufenthaltstitel: 100–110 €',
          "Obrada i čekanje — zavise od ambasade, Ausländerbehörde, kategorije i kompletnosti; službenu trenutnu procjenu provjeri, bez garantovanog roka.",
          "Obrada i čekanje — zavise od ambasade, Ausländerbehörde, kategorije i kompletnosti; službenu trenutnu procjenu provjeri, bez garantovanog roka.",
          "Finansiranje Ausbildung (2026): školska najmanje 959 € neto/mjesec; betriebliche najmanje 1.048 € bruto ili 822 € neto plate/mjesec. Manjak se može pokriti Sperrkonto/Verpflichtungserklärung. Neke liste ambasada imaju drugačije/starije iznose — provjeri prije uplate.",
          "D-viza — datum važenja, broj ulazaka i dozvoljeno zaposlenje provjeri na izdanoj vizi; rok nije jednak za sve kategorije.",
          "Aufenthaltserlaubnis §16a — podnesi zahtjev prije isteka D-vize; trajanje i produženje zavise od Ausbildung programa i odluke Ausländerbehörde, ne uvijek jednu godinu.",
          'Jobsuche: 18 mjeseci (§20 AufenthG)'
        ],
        errors: [
          'Nema Ausbildungsvertrag → automatsko odbijanje',
          "Njemački za Ausbildung — u pravilu B1 ako ustanova nije već provjerila jezik ili nije predviđen pripremni kurs; zanimanje može tražiti više. Ambasada navodi priznate certifikate, starost i ispitna mjesta.",
          'Nepotpuni ili neprevedeni dokumenti',
          'Pogrešan tip vize (§16b umjesto §16a)',
          'Kasno apliciranje',
          'Nema dokaza o smještaju',
          'Kasno Anmeldung (rok 14 dana)',
          "Rad je dozvoljen samo u obimu koji piše na važećoj D-vizi/boravišnoj dozvoli i dodatnom listu. D-viza može već dozvoljavati rad; ne čekaj istek za zahtjev Ausländerbehörde."
        ],
        sources: [
          { label: 'Ambasada Skoplje', url: 'https://skopje.diplo.de' },
          { label: 'Make it in Germany — Berufsausbildung', url: 'https://www.make-it-in-germany.com/de/visum/arten/berufsausbildung' },
          { label: 'BAMF — §16a AufenthG', url: 'https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/Bildung/Berufsausbildung/berufsausbildung-node.html' },
          { label: 'Gesetze im Internet — §16a', url: 'https://www.gesetze-im-internet.de/aufenthg_2004/__16a.html' }
        ],
        musterformulare: [
          { title: 'VIDEX — Viza formular (Ausbildung)', subtitle: 'Univerzalni formular — popunjava se online', formKey: 'VisaAusbildungVidex', downloadUrl: 'https://digital.diplo.de' },
          { title: 'Antrag auf Aufenthaltstitel §16a', subtitle: 'Demo/preview — podnosi se u Njemačkoj', formKey: 'VisaAusbildungAufenthalt', downloadUrl: 'https://www.bamf.de' },
          { title: 'Lebenslauf (CV) — Template', subtitle: 'Predložak biografije za Ausbildung', formKey: 'VisaAusbildungCV', downloadUrl: 'https://www.make-it-in-germany.com' }
        ]
      }
    ]
  },
  {
    code: 'al',
    name: 'Albanija',
    flag: 'https://flagcdn.com/h24/al.png',
    isEU: false,
    embassyName: 'Njemačka ambasada Tirana',
    embassyUrl: 'https://tirana.diplo.de',
    embassyNote: "Termin i predaja — otvori službenu stranicu nadležne ambasade za svoju kategoriju; tamo provjeri Auslandsportal, VisaMetric ili termin u ambasadi. Dostupnost i rokovi nisu garantovani.",
    schengenFree: true,
    schengenNote: "S biometrijskim pasošem: bezvizni kratki boravak do 90 dana u bilo kojih 180 dana u Schengenu, ne za zaposlenje; za rad/duži boravak provjeri odgovarajuću nacionalnu vizu.",
    routes: [
      {
        id: 'work',
        title: "Radna viza — Westbalkan §19c(1) AufenthG",
        legalBasis: "§ 19c Abs. 1 AufenthG + § 26 Abs. 2 BeschV",
        subtitle: 'Boravišna dozvola za zaposlenje. Albanija je dio Westbalkan-Regelung.',
        westbalkanNote: "Westbalkan-Regelung: do 50.000 saglasnosti BA godišnje za svih šest zemalja zajedno, raspoređeno po mjesecu i državljanstvu — ne 50.000 viza. U pravilu bez priznavanja kvalifikacije, ali regulisana zanimanja traže odgovarajuće priznanje/dozvolu. BA provjerava zaposlenje i uvjete; potrebni su ponuda posla, saglasnost i ostali vizni uvjeti (uključujući pravilo o AsylbLG davanjima u posljednja 24 mjeseca). Kod prvog BA odobrenja za osobe starije od 45 godina: 2026 bruto 55.770 €/god. ili odgovarajuće starosno osiguranje; provjeri puni popis BA uvjeta.",
        steps: [
          'Pronađi posao kod njemačkog poslodavca — s obavezujućom ponudom posla.',
          'Vorabzustimmung — Poslodavac traži od Bundesagentur für Arbeit.',
          "Termin i predaja — otvori službenu stranicu nadležne ambasade za svoju kategoriju; tamo provjeri Auslandsportal, VisaMetric ili termin u ambasadi. Dostupnost i rokovi nisu garantovani.",
          "Pripremi dokumentaciju — pasoš prema listi ambasade, EzB koju popunjava i potpisuje poslodavac, ugovor/ponudu i Vorabzustimmung; fotografije i kopije po pravilima tvoje ambasade.",
          "Apliciraj lično. Ulazak s D-vizom. Anmeldung. Ausländerbehörde §19c(1)."
        ],
        documents: ["Važeći pasoš — trajanje važenja i potrebne kopije provjeri u aktuelnoj listi nadležne ambasade za svoju kategoriju vize.", "Biometrijska fotografija — broj, format i način predaje prema aktuelnoj listi ambasade; za eAT u Njemačkoj važe posebna pravila digitalne fotografije.", 'EzB — potpisuje POSLODAVAC', 'Vorabzustimmung BA', 'Ugovor o radu', 'Zdravstveno osiguranje'],
        costs: ['D-Viza: 75 €', 'Aufenthaltserlaubnis: 100–110 €'],
        errors: ['EzB nepotpuna ili bez potpisa', "Biometrijska fotografija — broj, format i način predaje prema aktuelnoj listi ambasade; za eAT u Njemačkoj važe posebna pravila digitalne fotografije."],
        sources: [
          { label: 'Ambasada Tirana', url: 'https://tirana.diplo.de' },
          { label: 'Westbalkan-Regelung', url: 'https://www.make-it-in-germany.com/de/visum-aufenthalt' }
        ],
        musterformulare: [
          { title: "Musterformular 1: Antrag Aufenthaltserlaubnis §19c(1)", subtitle: 'Primjer za Albaniju', formKey: 'VisaWorkForm1', downloadUrl: 'https://www.bamf.de' },
          { title: 'Musterformular 2: EzB', subtitle: 'Formular poslodavca', formKey: 'VisaWorkForm2', downloadUrl: 'https://www.arbeitsagentur.de/unternehmen/fachkraefte-ausland/westbalkanregelung' }
        ]
      },
      {
        id: 'family',
        title: 'Spajanje porodice §§27-36 AufenthG',
        legalBasis: '§ 30 + § 32 AufenthG',
        subtitle: 'Supružnici i djeca mogu doći k osobi koja živi u Njemačkoj.',
        steps: [
          "A1 za supružnike — često se traži prije ulaska, ali postoje zakonski izuzeci, uključujući određene stručne radnike i EU Plavu kartu; provjeri svoj slučaj i prihvaćene certifikate kod ambasade.",
          "Isprave i prijevod — provjeri traženi original, kopije, ovjereni prijevod i treba li Apostille/legalizacija baš za tu ispravu; međunarodni izvodi mogu imati izuzetke.",
          'Ovjereni prijevod od sudskog tumača.',
          'Termin u ambasadi Tirana. Apliciraj. Ulazak. Anmeldung. Ausländerbehörde §30/§32.'
        ],
        documents: ['Pasoš', "Biometrijska fotografija — broj, format i način predaje prema aktuelnoj listi ambasade; za eAT u Njemačkoj važe posebna pravila digitalne fotografije.", "Isprave i prijevod — provjeri traženi original, kopije, ovjereni prijevod i treba li Apostille/legalizacija baš za tu ispravu; međunarodni izvodi mogu imati izuzetke.", "A1 za supružnike — često se traži prije ulaska, ali postoje zakonski izuzeci, uključujući određene stručne radnike i EU Plavu kartu; provjeri svoj slučaj i prihvaćene certifikate kod ambasade.", 'Platne liste (3 mj.) osobe u Njemačkoj', 'Ugovor o najmu'],
        costs: ['D-Viza: 75 €', 'Kurs + ispit A1: 150–400 €'],
        errors: ["A1 za supružnike — često se traži prije ulaska, ali postoje zakonski izuzeci, uključujući određene stručne radnike i EU Plavu kartu; provjeri svoj slučaj i prihvaćene certifikate kod ambasade.", "Isprave i prijevod — provjeri traženi original, kopije, ovjereni prijevod i treba li Apostille/legalizacija baš za tu ispravu; međunarodni izvodi mogu imati izuzetke."],
        sources: [
          { label: 'Ambasada Tirana', url: 'https://tirana.diplo.de' },
          { label: 'Goethe-Institut Albanija', url: 'https://www.goethe.de/de/index.html' }
        ],
        musterformulare: [
          { title: 'Musterformular: Antrag Aufenthaltserlaubnis (Spajanje)', subtitle: '§§27-36 primjer Albanija', formKey: 'VisaFamilyForm', downloadUrl: 'https://www.bamf.de' }
        ]
      },
      {
        id: 'permanent',
        title: 'Stalni boravak §9 + §9a AufenthG',
        legalBasis: '§ 9 + § 9a AufenthG',
        subtitle: "Niederlassungserlaubnis i Daueraufenthalt-EU imaju različite uvjete i posljedice. S Ausländerbehörde provjeri koji zahtjev odgovara tvojoj situaciji i zasebne takse; zajednička predaja nije obavezna.",
        steps: ['5 godina zakonitog boravka', 'Njemački B1', "Opći put §9: u pravilu 5 godina, 60 mjeseci doprinosa, B1 i drugi uvjeti; postoje posebni putevi i izuzeci. Za §9a se uvjeti provjeravaju zasebno kod Ausländerbehörde.", 'Termin Ausländerbehörde', "Niederlassungserlaubnis i Daueraufenthalt-EU imaju različite uvjete i posljedice. S Ausländerbehörde provjeri koji zahtjev odgovara tvojoj situaciji i zasebne takse; zajednička predaja nije obavezna."],
        documents: ['Pasoš', 'AUFENTHG-009 + AUFENTHG-014', 'Rentenversicherungsverlauf', 'B1 certifikat'],
        costs: ["Niederlassungserlaubnis i Daueraufenthalt-EU imaju različite uvjete i posljedice. S Ausländerbehörde provjeri koji zahtjev odgovara tvojoj situaciji i zasebne takse; zajednička predaja nije obavezna."],
        errors: ["Opći put §9: u pravilu 5 godina, 60 mjeseci doprinosa, B1 i drugi uvjeti; postoje posebni putevi i izuzeci. Za §9a se uvjeti provjeravaju zasebno kod Ausländerbehörde.", "Opći put §9: u pravilu 5 godina, 60 mjeseci doprinosa, B1 i drugi uvjeti; postoje posebni putevi i izuzeci. Za §9a se uvjeti provjeravaju zasebno kod Ausländerbehörde."],
        sources: [{ label: 'BAMF', url: 'https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/DauerhafterAufenthalt/dauerhafter-aufenthalt-node.html' }],
        musterformulare: [
          { title: 'Musterformular 1: Niederlassungserlaubnis', subtitle: 'AUFENTHG-009 Albanija', formKey: 'VisaPermanentForm1', downloadUrl: 'https://www.bamf.de' },
          { title: 'Musterformular 2: Daueraufenthalt-EU', subtitle: 'AUFENTHG-014 Albanija', formKey: 'VisaPermanentForm2', downloadUrl: 'https://www.bamf.de' }
        ]
      }
,
      {
        id: 'ausbildung',
        title: 'Ausbildung viza §16a AufenthG',
        legalBasis: '§ 16a AufenthG',
        subtitle: 'Aufenthaltserlaubnis zur Berufsausbildung — Dozvola boravka za stručno osposobljavanje (Ausbildung) u Njemačkoj.',
        ausbildungHighlight: [
          '✅ Možeš aplicirati direktno iz Albanije',
          "Školski dokazi — firma/škola određuje uvjete upisa i eventualno priznavanje; ne pretpostavljaj da priznavanje nikad nije potrebno.",
          '✅ Firma mora prijaviti Ausbildungsvertrag kod Kammer (IHK/HWK)',
          "Za betriebliche Ausbildung BA u pravilu provjerava uvjete kroz postupak; saglasnost nije automatsko obećanje vize.",
          '✅ Nakon završetka: mogućnost ostanka 18 mjeseci za traženje posla (§20 AufenthG)',
          '⚠️ Važno: Ausbildung ≠ Studij — ne miješaj sa §16b AufenthG (Studium)'
        ],
        countryNotes: [
          '💰 Taksa: 75€',
          '📅 Termin: tirana.diplo.de',
          "Isprave i prijevod — provjeri traženi original, kopije, ovjereni prijevod i treba li Apostille/legalizacija baš za tu ispravu; međunarodni izvodi mogu imati izuzetke.",
          "Aufenthaltserlaubnis §16a — podnesi zahtjev prije isteka D-vize; trajanje i produženje zavise od Ausbildung programa i odluke Ausländerbehörde, ne uvijek jednu godinu."
        ],
        countryBadge: "Upute nadležne ambasade",
        steps: [
          'Pronađi Ausbildung mjesto — Potpisan Ausbildungsvertrag PRIJE apliciranja. Koristi: bundesagentur.de, ausbildung.de, make-it-in-germany.com',
          "Aufenthaltserlaubnis §16a — podnesi zahtjev prije isteka D-vize; trajanje i produženje zavise od Ausbildung programa i odluke Ausländerbehörde, ne uvijek jednu godinu.",
          "Isprave i prijevod — provjeri traženi original, kopije, ovjereni prijevod i treba li Apostille/legalizacija baš za tu ispravu; međunarodni izvodi mogu imati izuzetke.",
          'Zakaži termin u ambasadi Tirana — tirana.diplo.de. Rokovi: 4–12 sedmica.',
          'Podnesi zahtjev za D-vizu — Lično. Taksa: 75 €.',
          "D-viza — datum važenja, broj ulazaka i dozvoljeno zaposlenje provjeri na izdanoj vizi; rok nije jednak za sve kategorije.",
          'Dolazak u Njemačku — Anmeldung u roku 14 dana.',
          "Aufenthaltserlaubnis §16a — podnesi zahtjev prije isteka D-vize; trajanje i produženje zavise od Ausbildung programa i odluke Ausländerbehörde, ne uvijek jednu godinu."
        ],
        documents: [
          "Važeći pasoš — trajanje važenja i potrebne kopije provjeri u aktuelnoj listi nadležne ambasade za svoju kategoriju vize.",
          'Potpisan Ausbildungsvertrag (original + kopija)',
          'Potvrda IHK/HWK registracije',
          'Lebenslauf / CV (na njemačkom)',
          "Isprave i prijevod — provjeri traženi original, kopije, ovjereni prijevod i treba li Apostille/legalizacija baš za tu ispravu; međunarodni izvodi mogu imati izuzetke.",
          "Aufenthaltserlaubnis §16a — podnesi zahtjev prije isteka D-vize; trajanje i produženje zavise od Ausbildung programa i odluke Ausländerbehörde, ne uvijek jednu godinu.",
          'Dokaz o smještaju u Njemačkoj',
          'Zdravstveno osiguranje',
          'Finansijski dokaz: plata ILI Sperrkonto ILI Verpflichtungserklärung',
          'Viza formulari (popunjeni, potpisani)',
          'Biometrijska fotografija (45x35mm)',
          'Taksa: 75 €'
        ],
        costs: [
          'D-Viza: 75 €',
          'Aufenthaltstitel: 100–110 €',
          "Obrada i čekanje — zavise od ambasade, Ausländerbehörde, kategorije i kompletnosti; službenu trenutnu procjenu provjeri, bez garantovanog roka.",
          "Obrada i čekanje — zavise od ambasade, Ausländerbehörde, kategorije i kompletnosti; službenu trenutnu procjenu provjeri, bez garantovanog roka.",
          "Finansiranje Ausbildung (2026): školska najmanje 959 € neto/mjesec; betriebliche najmanje 1.048 € bruto ili 822 € neto plate/mjesec. Manjak se može pokriti Sperrkonto/Verpflichtungserklärung. Neke liste ambasada imaju drugačije/starije iznose — provjeri prije uplate.",
          "D-viza — datum važenja, broj ulazaka i dozvoljeno zaposlenje provjeri na izdanoj vizi; rok nije jednak za sve kategorije.",
          "Aufenthaltserlaubnis §16a — podnesi zahtjev prije isteka D-vize; trajanje i produženje zavise od Ausbildung programa i odluke Ausländerbehörde, ne uvijek jednu godinu.",
          'Jobsuche: 18 mjeseci (§20 AufenthG)'
        ],
        errors: [
          'Nema Ausbildungsvertrag → automatsko odbijanje',
          "Njemački za Ausbildung — u pravilu B1 ako ustanova nije već provjerila jezik ili nije predviđen pripremni kurs; zanimanje može tražiti više. Ambasada navodi priznate certifikate, starost i ispitna mjesta.",
          'Nepotpuni ili neprevedeni dokumenti',
          'Pogrešan tip vize (§16b umjesto §16a)',
          'Kasno apliciranje',
          'Nema dokaza o smještaju',
          'Kasno Anmeldung (rok 14 dana)',
          "Rad je dozvoljen samo u obimu koji piše na važećoj D-vizi/boravišnoj dozvoli i dodatnom listu. D-viza može već dozvoljavati rad; ne čekaj istek za zahtjev Ausländerbehörde."
        ],
        sources: [
          { label: 'Ambasada Tirana', url: 'https://tirana.diplo.de' },
          { label: 'Make it in Germany — Berufsausbildung', url: 'https://www.make-it-in-germany.com/de/visum/arten/berufsausbildung' },
          { label: 'BAMF — §16a AufenthG', url: 'https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/Bildung/Berufsausbildung/berufsausbildung-node.html' },
          { label: 'Gesetze im Internet — §16a', url: 'https://www.gesetze-im-internet.de/aufenthg_2004/__16a.html' }
        ],
        musterformulare: [
          { title: 'VIDEX — Viza formular (Ausbildung)', subtitle: 'Univerzalni formular — popunjava se online', formKey: 'VisaAusbildungVidex', downloadUrl: 'https://digital.diplo.de' },
          { title: 'Antrag auf Aufenthaltstitel §16a', subtitle: 'Demo/preview — podnosi se u Njemačkoj', formKey: 'VisaAusbildungAufenthalt', downloadUrl: 'https://www.bamf.de' },
          { title: 'Lebenslauf (CV) — Template', subtitle: 'Predložak CV-a za Ausbildung', formKey: 'VisaAusbildungCV', downloadUrl: 'https://www.make-it-in-germany.com' }
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
    embassyNote: "Termin i predaja — otvori službenu stranicu nadležne ambasade za svoju kategoriju; tamo provjeri Auslandsportal, VisaMetric ili termin u ambasadi. Dostupnost i rokovi nisu garantovani.",
    kosovoNote: "Od 01.01.2024 za biometrijske pasoše Kosova važi bezvizni kratki boravak 90/180 dana, ne dozvola rada. Za nacionalnu vizu slijedi kanal koji navodi Ambasada Priština za tvoju kategoriju.",
    routes: [
      {
        id: 'work',
        title: "Radna viza — Westbalkan §19c(1) AufenthG",
        legalBasis: "§ 19c Abs. 1 AufenthG + § 26 Abs. 2 BeschV",
        subtitle: 'Boravišna dozvola za zaposlenje. Kosovo je u Westbalkan-Regelung. Vize ISKLJUČIVO kroz VisaMetric!',
        westbalkanNote: "Westbalkan-Regelung: do 50.000 saglasnosti BA godišnje za svih šest zemalja zajedno, raspoređeno po mjesecu i državljanstvu — ne 50.000 viza. U pravilu bez priznavanja kvalifikacije, ali regulisana zanimanja traže odgovarajuće priznanje/dozvolu. BA provjerava zaposlenje i uvjete; potrebni su ponuda posla, saglasnost i ostali vizni uvjeti (uključujući pravilo o AsylbLG davanjima u posljednja 24 mjeseca). Kod prvog BA odobrenja za osobe starije od 45 godina: 2026 bruto 55.770 €/god. ili odgovarajuće starosno osiguranje; provjeri puni popis BA uvjeta.",
        kosovoNote: "Termin i predaja — otvori službenu stranicu nadležne ambasade za svoju kategoriju; tamo provjeri Auslandsportal, VisaMetric ili termin u ambasadi. Dostupnost i rokovi nisu garantovani.",
        steps: [
          'Pronađi posao — Njemacki poslodavac s obavezujućom ponudom posla ili ugovorom o radu.',
          'Vorabzustimmung — Poslodavac pribavlja od Bundesagentur für Arbeit. S Vorabzustimmung + Kundennummer apliciraš brže.',
          "Termin i predaja — otvori službenu stranicu nadležne ambasade za svoju kategoriju; tamo provjeri Auslandsportal, VisaMetric ili termin u ambasadi. Dostupnost i rokovi nisu garantovani.",
          "Termin i predaja — otvori službenu stranicu nadležne ambasade za svoju kategoriju; tamo provjeri Auslandsportal, VisaMetric ili termin u ambasadi. Dostupnost i rokovi nisu garantovani.",
          "Termin i predaja — otvori službenu stranicu nadležne ambasade za svoju kategoriju; tamo provjeri Auslandsportal, VisaMetric ili termin u ambasadi. Dostupnost i rokovi nisu garantovani.",
          'Ulazak u Njemačku s D-vizom.',
          'Anmeldung — 14 dana.',
          "Ausländerbehörde — Aufenthaltserlaubnis §19c(1) PRE isteka vize."
        ],
        documents: [
          "Važeći pasoš — trajanje važenja i potrebne kopije provjeri u aktuelnoj listi nadležne ambasade za svoju kategoriju vize.",
          "Biometrijska fotografija — broj, format i način predaje prema aktuelnoj listi ambasade; za eAT u Njemačkoj važe posebna pravila digitalne fotografije.",
          'EzB — popunjava POSLODAVAC (ne ti!)',
          'Vorabzustimmung Bundesagentur für Arbeit',
          'Ugovor o radu',
          'Zdravstveno osiguranje',
          'Dokaz o stanovanju',
          'NAPOMENA: TELC certifikati s ispitnih mjesta u Srbiji se NE prihvaćaju!'
        ],
        costs: [
          'D-Viza: 75 €',
          "Termin i predaja — otvori službenu stranicu nadležne ambasade za svoju kategoriju; tamo provjeri Auslandsportal, VisaMetric ili termin u ambasadi. Dostupnost i rokovi nisu garantovani.",
          'Aufenthaltserlaubnis: 100–110 €',
          "Obrada i čekanje — zavise od ambasade, Ausländerbehörde, kategorije i kompletnosti; službenu trenutnu procjenu provjeri, bez garantovanog roka."
        ],
        errors: [
          'Apliciranje direktno u ambasadu Priština — NE! Samo VisaMetric!',
          'TELC certifikat s ispitnog mjesta u Srbiji — NE prihvaća se u Prištini!',
          'EzB nepotpuna ili bez potpisa poslodavca',
          "Biometrijska fotografija — broj, format i način predaje prema aktuelnoj listi ambasade; za eAT u Njemačkoj važe posebna pravila digitalne fotografije.",
          "Termin i predaja — otvori službenu stranicu nadležne ambasade za svoju kategoriju; tamo provjeri Auslandsportal, VisaMetric ili termin u ambasadi. Dostupnost i rokovi nisu garantovani."
        ],
        sources: [
          { label: 'Ambasada Priština', url: 'https://pristina.diplo.de' },
          { label: 'VisaMetric Kosovo — termini', url: 'https://www.visametric.com/Kosovo/Germany/de' },
          { label: 'Westbalkan-Regelung', url: 'https://www.make-it-in-germany.com/de/visum-aufenthalt' },
          { label: 'Ambasada Priština — Westbalkan', url: 'https://pristina.diplo.de/xk-de/service/visa-einreise/willkommen-in-deutschland-2433504' }
        ],
        musterformulare: [
          { title: "Musterformular 1: Antrag Aufenthaltserlaubnis §19c(1)", subtitle: 'Primjer za Kosovo — VisaMetric procedura', formKey: 'VisaWorkForm1', downloadUrl: 'https://www.bamf.de' },
          { title: 'Musterformular 2: EzB', subtitle: 'Formular koji popunjava poslodavac', formKey: 'VisaWorkForm2', downloadUrl: 'https://www.arbeitsagentur.de/unternehmen/fachkraefte-ausland/westbalkanregelung' }
        ]
      },
      {
        id: 'bluecard',
        title: 'EU Plava karta §18g AufenthG',
        legalBasis: '§ 18g AufenthG',
        subtitle: 'Za visokokvalificirane. Online apliciranje DOSTUPNO za Kosovo!',
        kosovoNote: "Termin i predaja — otvori službenu stranicu nadležne ambasade za svoju kategoriju; tamo provjeri Auslandsportal, VisaMetric ili termin u ambasadi. Dostupnost i rokovi nisu garantovani.",
        steps: [
          'Provjeri diplomu na anabin.kmk.org.',
          "Ugovor o radu min. 50.700 €/god.",
          "Termin i predaja — otvori službenu stranicu nadležne ambasade za svoju kategoriju; tamo provjeri Auslandsportal, VisaMetric ili termin u ambasadi. Dostupnost i rokovi nisu garantovani.",
          'Uplodi dokumentaciju online ILI predaj u VisaMetric.',
          'Ulazak s D-vizom. Anmeldung. Ausländerbehörde §18g.'
        ],
        documents: ['Biometrijski pasoš', "Biometrijska fotografija — broj, format i način predaje prema aktuelnoj listi ambasade; za eAT u Njemačkoj važe posebna pravila digitalne fotografije.", 'AUFENTHG-034', 'Diploma + ovjereni prijevod', "Ugovor o radu (min. 50.700 €)", 'Zdravstveno osiguranje'],
        costs: ['D-Viza: 75 €', "Termin i predaja — otvori službenu stranicu nadležne ambasade za svoju kategoriju; tamo provjeri Auslandsportal, VisaMetric ili termin u ambasadi. Dostupnost i rokovi nisu garantovani.", 'EU Plava karta: 100–110 €'],
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
        kosovoNote: "Termin i predaja — otvori službenu stranicu nadležne ambasade za svoju kategoriju; tamo provjeri Auslandsportal, VisaMetric ili termin u ambasadi. Dostupnost i rokovi nisu garantovani.",
        steps: [
          "A1 za supružnike — često se traži prije ulaska, ali postoje zakonski izuzeci, uključujući određene stručne radnike i EU Plavu kartu; provjeri svoj slučaj i prihvaćene certifikate kod ambasade.",
          "Isprave i prijevod — provjeri traženi original, kopije, ovjereni prijevod i treba li Apostille/legalizacija baš za tu ispravu; međunarodni izvodi mogu imati izuzetke.",
          "Termin i predaja — otvori službenu stranicu nadležne ambasade za svoju kategoriju; tamo provjeri Auslandsportal, VisaMetric ili termin u ambasadi. Dostupnost i rokovi nisu garantovani.",
          "Termin i predaja — otvori službenu stranicu nadležne ambasade za svoju kategoriju; tamo provjeri Auslandsportal, VisaMetric ili termin u ambasadi. Dostupnost i rokovi nisu garantovani.",
          'Predaj u VisaMetric centru Priština. Ulazak. Anmeldung. Ausländerbehörde §30/§32.'
        ],
        documents: ['Biometrijski pasoš', "Biometrijska fotografija — broj, format i način predaje prema aktuelnoj listi ambasade; za eAT u Njemačkoj važe posebna pravila digitalne fotografije.", 'Potvrda o braku + ovjereni prijevod', "A1 za supružnike — često se traži prije ulaska, ali postoje zakonski izuzeci, uključujući određene stručne radnike i EU Plavu kartu; provjeri svoj slučaj i prihvaćene certifikate kod ambasade.", 'Platne liste (3 mj.) osobe u Njemačkoj', 'Ugovor o najmu'],
        costs: ['D-Viza: 75 €', "Termin i predaja — otvori službenu stranicu nadležne ambasade za svoju kategoriju; tamo provjeri Auslandsportal, VisaMetric ili termin u ambasadi. Dostupnost i rokovi nisu garantovani.", 'Goethe A1: 100–200 €'],
        errors: ["Termin i predaja — otvori službenu stranicu nadležne ambasade za svoju kategoriju; tamo provjeri Auslandsportal, VisaMetric ili termin u ambasadi. Dostupnost i rokovi nisu garantovani.", 'TELC iz Srbije NE prihvaća se!', "A1 za supružnike — često se traži prije ulaska, ali postoje zakonski izuzeci, uključujući određene stručne radnike i EU Plavu kartu; provjeri svoj slučaj i prihvaćene certifikate kod ambasade."],
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
        subtitle: "Niederlassungserlaubnis i Daueraufenthalt-EU imaju različite uvjete i posljedice. S Ausländerbehörde provjeri koji zahtjev odgovara tvojoj situaciji i zasebne takse; zajednička predaja nije obavezna.",
        kosovoNote: "Niederlassungserlaubnis i Daueraufenthalt-EU imaju različite uvjete i posljedice. S Ausländerbehörde provjeri koji zahtjev odgovara tvojoj situaciji i zasebne takse; zajednička predaja nije obavezna.",
        steps: ['5 god. zakonit boravak', 'B1 njemacki', "Penzijski dokazi iz Kosova — ne pretpostavljaj prihvatanje ili odbijanje; Ausländerbehörde provjerava odgovarajuće osiguranje i priznate dokaze za tvoju rutu.", 'Termin Ausländerbehörde', "Niederlassungserlaubnis i Daueraufenthalt-EU imaju različite uvjete i posljedice. S Ausländerbehörde provjeri koji zahtjev odgovara tvojoj situaciji i zasebne takse; zajednička predaja nije obavezna."],
        documents: ['Pasoš', 'AUFENTHG-009 + AUFENTHG-014', "Penzijski dokazi iz Kosova — ne pretpostavljaj prihvatanje ili odbijanje; Ausländerbehörde provjerava odgovarajuće osiguranje i priznate dokaze za tvoju rutu.", 'B1 certifikat'],
        costs: ["Niederlassungserlaubnis i Daueraufenthalt-EU imaju različite uvjete i posljedice. S Ausländerbehörde provjeri koji zahtjev odgovara tvojoj situaciji i zasebne takse; zajednička predaja nije obavezna."],
        errors: ["Penzijski dokazi iz Kosova — ne pretpostavljaj prihvatanje ili odbijanje; Ausländerbehörde provjerava odgovarajuće osiguranje i priznate dokaze za tvoju rutu.", "Opći put §9: u pravilu 5 godina, 60 mjeseci doprinosa, B1 i drugi uvjeti; postoje posebni putevi i izuzeci. Za §9a se uvjeti provjeravaju zasebno kod Ausländerbehörde.", "Opći put §9: u pravilu 5 godina, 60 mjeseci doprinosa, B1 i drugi uvjeti; postoje posebni putevi i izuzeci. Za §9a se uvjeti provjeravaju zasebno kod Ausländerbehörde."],
        sources: [
          { label: 'Ambasada Priština', url: 'https://pristina.diplo.de/xk-de/service/visa-einreise/fachkraft-mit-berufsausbildung-2310256' },
          { label: 'BAMF', url: 'https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/DauerhafterAufenthalt/dauerhafter-aufenthalt-node.html' }
        ],
        musterformulare: [
          { title: 'Musterformular 1: Niederlassungserlaubnis', subtitle: 'AUFENTHG-009 Kosovo', formKey: 'VisaPermanentForm1', downloadUrl: 'https://www.bamf.de' },
          { title: 'Musterformular 2: Daueraufenthalt-EU', subtitle: 'AUFENTHG-014 Kosovo', formKey: 'VisaPermanentForm2', downloadUrl: 'https://www.bamf.de' }
        ]
      }
,
      {
        id: 'ausbildung',
        title: 'Ausbildung viza §16a AufenthG',
        legalBasis: '§ 16a AufenthG',
        subtitle: 'Aufenthaltserlaubnis zur Berufsausbildung — Dozvola boravka za stručno osposobljavanje (Ausbildung) u Njemačkoj.',
        ausbildungHighlight: [
          '✅ Možeš aplicirati direktno iz Kosova',
          "Školski dokazi — firma/škola određuje uvjete upisa i eventualno priznavanje; ne pretpostavljaj da priznavanje nikad nije potrebno.",
          '✅ Firma mora prijaviti Ausbildungsvertrag kod Kammer (IHK/HWK)',
          "Za betriebliche Ausbildung BA u pravilu provjerava uvjete kroz postupak; saglasnost nije automatsko obećanje vize.",
          '✅ Nakon završetka: mogućnost ostanka 18 mjeseci za traženje posla (§20 AufenthG)',
          '⚠️ Važno: Ausbildung ≠ Studij — ne miješati sa §16b AufenthG (Studium)'
        ],
        kosovoNote: "Termin i predaja — otvori službenu stranicu nadležne ambasade za svoju kategoriju; tamo provjeri Auslandsportal, VisaMetric ili termin u ambasadi. Dostupnost i rokovi nisu garantovani.",
        countryNotes: [
          '💰 Taksa: 75€',
          '📅 Termin: Auslandsportal Auswärtiges Amt — pristina.diplo.de',
          "Isprave i prijevod — provjeri traženi original, kopije, ovjereni prijevod i treba li Apostille/legalizacija baš za tu ispravu; međunarodni izvodi mogu imati izuzetke.",
          "Termin i predaja — otvori službenu stranicu nadležne ambasade za svoju kategoriju; tamo provjeri Auslandsportal, VisaMetric ili termin u ambasadi. Dostupnost i rokovi nisu garantovani.",
          '🔄 Vorabzustimmung (preporučeno za ubrzanje postupka)'
        ],
        countryBadge: "Upute nadležne ambasade",
        steps: [
          'Pronađi Ausbildung mjesto — Potpisan Ausbildungsvertrag PRIJE zahtjeva za vizu. Koristi: bundesagentur.de, ausbildung.de, make-it-in-germany.com',
          "Njemački za Ausbildung — u pravilu B1 ako ustanova nije već provjerila jezik ili nije predviđen pripremni kurs; zanimanje može tražiti više. Ambasada navodi priznate certifikate, starost i ispitna mjesta.",
          "Termin i predaja — otvori službenu stranicu nadležne ambasade za svoju kategoriju; tamo provjeri Auslandsportal, VisaMetric ili termin u ambasadi. Dostupnost i rokovi nisu garantovani.",
          'Zakaži termin — Auslandsportal ili VisaMetric (pristina.diplo.de). Rokovi: 4–12 sedmica.',
          "Termin i predaja — otvori službenu stranicu nadležne ambasade za svoju kategoriju; tamo provjeri Auslandsportal, VisaMetric ili termin u ambasadi. Dostupnost i rokovi nisu garantovani.",
          "D-viza — datum važenja, broj ulazaka i dozvoljeno zaposlenje provjeri na izdanoj vizi; rok nije jednak za sve kategorije.",
          'Dolazak u Njemačku — Anmeldung u roku 14 dana.',
          "Aufenthaltserlaubnis §16a — podnesi zahtjev prije isteka D-vize; trajanje i produženje zavise od Ausbildung programa i odluke Ausländerbehörde, ne uvijek jednu godinu."
        ],
        documents: [
          "Važeći pasoš — trajanje važenja i potrebne kopije provjeri u aktuelnoj listi nadležne ambasade za svoju kategoriju vize.",
          'Potpisan Ausbildungsvertrag (original + kopija)',
          'Potvrda IHK/HWK registracije',
          'Lebenslauf / CV (na njemačkom)',
          "Isprave i prijevod — provjeri traženi original, kopije, ovjereni prijevod i treba li Apostille/legalizacija baš za tu ispravu; međunarodni izvodi mogu imati izuzetke.",
          "Njemački za Ausbildung — u pravilu B1 ako ustanova nije već provjerila jezik ili nije predviđen pripremni kurs; zanimanje može tražiti više. Ambasada navodi priznate certifikate, starost i ispitna mjesta.",
          'Dokaz o smještaju u Njemačkoj',
          'Zdravstveno osiguranje',
          'Finansijski dokaz: platna lista ILI Sperrkonto ILI Verpflichtungserklärung',
          'Viza formulari (popunjeni, potpisani)',
          'Biometrijska fotografija (45x35mm)',
          "Termin i predaja — otvori službenu stranicu nadležne ambasade za svoju kategoriju; tamo provjeri Auslandsportal, VisaMetric ili termin u ambasadi. Dostupnost i rokovi nisu garantovani.",
          'Taksa: 75 €'
        ],
        costs: [
          'D-Viza taksa: 75 €',
          "Termin i predaja — otvori službenu stranicu nadležne ambasade za svoju kategoriju; tamo provjeri Auslandsportal, VisaMetric ili termin u ambasadi. Dostupnost i rokovi nisu garantovani.",
          'Aufenthaltstitel: 100–110 €',
          "Obrada i čekanje — zavise od ambasade, Ausländerbehörde, kategorije i kompletnosti; službenu trenutnu procjenu provjeri, bez garantovanog roka.",
          "Finansiranje Ausbildung (2026): školska najmanje 959 € neto/mjesec; betriebliche najmanje 1.048 € bruto ili 822 € neto plate/mjesec. Manjak se može pokriti Sperrkonto/Verpflichtungserklärung. Neke liste ambasada imaju drugačije/starije iznose — provjeri prije uplate.",
          "D-viza — datum važenja, broj ulazaka i dozvoljeno zaposlenje provjeri na izdanoj vizi; rok nije jednak za sve kategorije.",
          "Aufenthaltserlaubnis §16a — podnesi zahtjev prije isteka D-vize; trajanje i produženje zavise od Ausbildung programa i odluke Ausländerbehörde, ne uvijek jednu godinu.",
          'Jobsuche: 18 mjeseci (§20 AufenthG)'
        ],
        errors: [
          'Nema Ausbildungsvertrag → automatsko odbijanje',
          "Njemački za Ausbildung — u pravilu B1 ako ustanova nije već provjerila jezik ili nije predviđen pripremni kurs; zanimanje može tražiti više. Ambasada navodi priznate certifikate, starost i ispitna mjesta.",
          'Nepotpuni ili neprevedeni dokumenti',
          'Pogrešan tip vize (§16b umjesto §16a)',
          "Termin i predaja — otvori službenu stranicu nadležne ambasade za svoju kategoriju; tamo provjeri Auslandsportal, VisaMetric ili termin u ambasadi. Dostupnost i rokovi nisu garantovani.",
          'Kasno apliciranje',
          'Kasno Anmeldung (rok 14 dana)',
          "Rad je dozvoljen samo u obimu koji piše na važećoj D-vizi/boravišnoj dozvoli i dodatnom listu. D-viza može već dozvoljavati rad; ne čekaj istek za zahtjev Ausländerbehörde."
        ],
        sources: [
          { label: 'Ambasada Priština', url: 'https://pristina.diplo.de' },
          { label: 'VisaMetric Kosovo', url: 'https://www.visametric.com/Kosovo/Germany/de' },
          { label: 'Make it in Germany — Berufsausbildung', url: 'https://www.make-it-in-germany.com/de/visum/arten/berufsausbildung' },
          { label: 'BAMF — §16a AufenthG', url: 'https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/Bildung/Berufsausbildung/berufsausbildung-node.html' },
          { label: 'Gesetze im Internet — §16a', url: 'https://www.gesetze-im-internet.de/aufenthg_2004/__16a.html' }
        ],
        musterformulare: [
          { title: 'VIDEX — Viza formular (Ausbildung)', subtitle: 'Universal formular — online ili VisaMetric', formKey: 'VisaAusbildungVidex', downloadUrl: 'https://digital.diplo.de' },
          { title: 'Antrag auf Aufenthaltstitel §16a', subtitle: 'Demo/preview — podnosi se u Njemačkoj', formKey: 'VisaAusbildungAufenthalt', downloadUrl: 'https://www.bamf.de' },
          { title: 'Lebenslauf (CV) — Template', subtitle: 'Predložak životopisa za Ausbildung', formKey: 'VisaAusbildungCV', downloadUrl: 'https://www.make-it-in-germany.com' }
        ]
      }
    ]
  }
];
