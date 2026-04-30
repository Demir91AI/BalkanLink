export type DokumentTip = 'pasos' | 'licna';

export interface KonzulatInfo {
  grad: string;
  adresa: string;
  web: string;
  konzularnoPodrucje: string;
}

type L10n = { BA: string; HR: string; SR: string; DE: string };
type L10nList = { BA: string[]; HR: string[]; SR: string[]; DE: string[] };

export interface ObnovaDrzava {
  id: string;
  naziv: L10n;
  zastavica: string;
  konzulati: KonzulatInfo[];
  pasos: {
    rokVazenja: L10n;
    kadPodnjeti: L10n;
    dokumenti: L10nList;
    obrada: L10n;
    cijena: L10n;
    napomena?: L10n;
  };
  licna: {
    moguce: boolean;
    info: L10n;
    dokumenti?: L10nList;
    obrada?: L10n;
    cijena?: L10n;
  };
  opstaNapomena: L10n;
}

export const obnovaPassportContent: ObnovaDrzava[] = [
  {
    id: 'bih',
    naziv: { BA: 'Bosna i Hercegovina', HR: 'Bosna i Hercegovina', SR: 'Bosna i Hercegovina', DE: 'Bosnien und Herzegowina' },
    zastavica: '🇧🇦',
    konzulati: [
      { grad: 'Berlin', adresa: 'Ibsenstraße 14, 10439 Berlin', web: 'https://botschaftbh.de', konzularnoPodrucje: 'Berlin, Brandenburg, Mecklenburg-Vorpommern, Sachsen-Anhalt, Sachsen, Thüringen' },
      { grad: 'Stuttgart', adresa: 'Generalkonsulat Stuttgart', web: 'https://botschaftbh.de', konzularnoPodrucje: 'Baden-Württemberg' },
      { grad: 'Frankfurt', adresa: 'Generalkonsulat Frankfurt', web: 'https://botschaftbh.de', konzularnoPodrucje: 'Hessen, Rheinland-Pfalz, Saarland' },
      { grad: 'Hamburg', adresa: 'Generalkonsulat Hamburg', web: 'https://botschaftbh.de', konzularnoPodrucje: 'Hamburg, Bremen, Schleswig-Holstein, Niedersachsen' },
      { grad: 'München', adresa: 'Generalkonsulat München', web: 'https://botschaftbh.de', konzularnoPodrucje: 'Bayern' },
      { grad: 'Düsseldorf', adresa: 'Generalkonsulat Düsseldorf', web: 'https://botschaftbh.de', konzularnoPodrucje: 'Nordrhein-Westfalen' },
    ],
    pasos: {
      rokVazenja: {
        BA: '10 godina (odrasli), 5 godina (djeca 3–18 god.), 3 godine (djeca do 3 god.)',
        HR: '10 godina (odrasli), 5 godina (djeca 3–18 god.), 3 godine (djeca do 3 god.)',
        SR: '10 godina (odrasli), 5 godina (deca 3–18 god.), 3 godine (deca do 3 god.)',
        DE: '10 Jahre (Erwachsene), 5 Jahre (Kinder 3–18 J.), 3 Jahre (Kinder bis 3 J.)',
      },
      kadPodnjeti: {
        BA: 'Preporučuje se podnijeti zahtjev čim pasoš istekne ili najkasnije nekoliko sedmica prije putovanja. Nema fiksnog roka za obnovu.',
        HR: 'Preporuča se podnijeti zahtjev čim putovnica istekne ili najkasnije nekoliko tjedana prije putovanja. Nema fiksnog roka za obnovu.',
        SR: 'Preporučuje se podneti zahtev čim pasoš istekne ili najkasnije nekoliko nedelja pre putovanja. Nema fiksnog roka za obnovu.',
        DE: 'Es wird empfohlen, den Antrag rechtzeitig vor Ablauf zu stellen — mindestens einige Wochen vor geplanter Reise. Es gibt keine feste Frist zur Erneuerung.',
      },
      dokumenti: {
        BA: [
          'Važeći ili istekli BiH pasoš ili lična karta (ili drugi dokument koji dokazuje identitet i državljanstvo)',
          'Dokaz o zakonitom boravku u Njemačkoj (Aufenthaltstitel ili Niederlassungserlaubnis)',
          'Biometrijski podaci se uzimaju lično na licu mjesta (foto, otisak prsta, potpis)',
          'Dokaz o uplati konzularne takse',
          'Za prvokupce pasoša: izvod iz matičnih knjiga iz BiH (ne stariji od 6 mjeseci)',
        ],
        HR: [
          'Važeća ili istekla BiH putovnica ili osobna iskaznica (ili drugi dokument koji dokazuje identitet i državljanstvo)',
          'Dokaz o zakonitom boravku u Njemačkoj (Aufenthaltstitel ili Niederlassungserlaubnis)',
          'Biometrijski podaci uzimaju se osobno na licu mjesta (foto, otisak prsta, potpis)',
          'Dokaz o uplati konzularne pristojbe',
          'Za prvokupce putovnice: izvadak iz matičnih knjiga iz BiH (ne stariji od 6 mjeseci)',
        ],
        SR: [
          'Važeći ili istekli BiH pasoš ili lična karta (ili drugi dokument koji dokazuje identitet i državljanstvo)',
          'Dokaz o zakonitom boravku u Nemačkoj (Aufenthaltstitel ili Niederlassungserlaubnis)',
          'Biometrijski podaci se uzimaju lično na licu mesta (foto, otisak prsta, potpis)',
          'Dokaz o uplati konzularne takse',
          'Za prvokupce pasoša: izvod iz matičnih knjiga iz BiH (ne stariji od 6 meseci)',
        ],
        DE: [
          'Gültiger oder abgelaufener BiH-Reisepass oder Personalausweis (oder anderes Identitätsdokument)',
          'Nachweis des rechtmäßigen Aufenthalts in Deutschland (Aufenthaltstitel oder Niederlassungserlaubnis)',
          'Biometrische Daten werden persönlich vor Ort erfasst (Foto, Fingerabdruck, Unterschrift)',
          'Nachweis der Zahlung der Konsulargebühr',
          'Bei Erstantrag: Auszug aus den Personenstandsregistern aus BiH (nicht älter als 6 Monate)',
        ],
      },
      obrada: {
        BA: 'Standardna obrada: oko 30 dana. Zakonski maksimum: 60 dana od dana podnošenja. Hitna obrada (express): moguća uz dodatnu naknadu, obično 1–3 radna dana.',
        HR: 'Standardna obrada: oko 30 dana. Zakonski maksimum: 60 dana od dana podnošenja. Hitna obrada (express): moguća uz dodatnu naknadu, obično 1–3 radna dana.',
        SR: 'Standardna obrada: oko 30 dana. Zakonski maksimum: 60 dana od dana podnošenja. Hitna obrada (express): moguća uz dodatnu naknadu, obično 1–3 radna dana.',
        DE: 'Standardbearbeitung: ca. 30 Tage. Gesetzliche Höchstfrist: 60 Tage ab Antragstellung. Eilbearbeitung (Express): möglich gegen Aufpreis, in der Regel 1–3 Werktage.',
      },
      cijena: {
        BA: 'Odrasli: oko 96 €, djeca 3–18 god.: oko 71 €, djeca do 3 god.: oko 56 €. Express naknada se dodaje povrh redovne takse. Provjerite aktuelne cijene na web stranici konzulata.',
        HR: 'Odrasli: oko 96 €, djeca 3–18 god.: oko 71 €, djeca do 3 god.: oko 56 €. Express naknada dodaje se povrh redovne pristojbe. Provjerite aktualne cijene na web stranici konzulata.',
        SR: 'Odrasli: oko 96 €, deca 3–18 god.: oko 71 €, deca do 3 god.: oko 56 €. Express naknada se dodaje povrh redovne takse. Proverite aktuelne cene na web stranici konzulata.',
        DE: 'Erwachsene: ca. 96 €, Kinder 3–18 J.: ca. 71 €, Kinder bis 3 J.: ca. 56 €. Expressgebühr wird zusätzlich erhoben. Bitte aktuelle Gebühren auf der Konsulatswebseite prüfen.',
      },
      napomena: {
        BA: 'Svi podnosioci zahtjeva moraju osobno doći u konzulat (i djeca). Pasoš se ne može obnoviti putem pošte niti putem treće osobe. Gotov pasoš se može podići lično ili biti poslan poštom (uz troškove dostave).',
        HR: 'Svi podnositelji zahtjeva moraju osobno doći u konzulat (i djeca). Putovnica se ne može obnoviti poštom niti posredstvom treće osobe. Gotova putovnica se može preuzeti osobno ili poslati poštom (uz troškove dostave).',
        SR: 'Svi podnosioci zahteva moraju lično doći u konzulat (i deca). Pasoš se ne može obnoviti putem pošte niti putem treće osobe. Gotov pasoš se može podići lično ili biti poslan poštom (uz troškove dostave).',
        DE: 'Alle Antragsteller müssen persönlich im Konsulat erscheinen (auch Kinder). Der Pass kann nicht per Post oder durch Dritte beantragt werden. Der fertige Pass kann persönlich abgeholt oder per Post zugesandt werden (Versandkosten trägt der Antragsteller).',
      },
    },
    licna: {
      moguce: true,
      info: {
        BA: 'Lična karta BiH može se zatražiti u konzulatu pod istim uvjetima kao pasoš. Potrebni su biometrijski podaci i važeći dokument koji dokazuje identitet i državljanstvo BiH.',
        HR: 'Osobna iskaznica BiH može se zatražiti u konzulatu pod istim uvjetima kao putovnica. Potrebni su biometrijski podaci i važeći dokument koji dokazuje identitet i državljanstvo BiH.',
        SR: 'Lična karta BiH može se zatražiti u konzulatu pod istim uslovima kao pasoš. Potrebni su biometrijski podaci i važeći dokument koji dokazuje identitet i državljanstvo BiH.',
        DE: 'Der biometrische Personalausweis von BiH kann im Konsulat unter denselben Bedingungen wie der Reisepass beantragt werden. Biometrische Daten und ein gültiges Identitätsdokument sind erforderlich.',
      },
    },
    opstaNapomena: {
      BA: 'Konzulat BiH radi: Ponedeljak – Petak 08:15 – 13:00 (šaltersko radno vrijeme). Preporuča se zakazati termin unaprijed. Za tačne i aktuelne informacije o terminima i dokumentima, kontaktiraj konzulat koji pokriva tvoj grad boravka.',
      HR: 'Konzulat BiH radi: Ponedjeljak – Petak 08:15 – 13:00 (šaltersko radno vrijeme). Preporuča se zakazati termin unaprijed. Za točne i aktualne informacije o terminima i dokumentima, kontaktiraj konzulat koji pokriva tvoj grad boravka.',
      SR: 'Konzulat BiH radi: Ponedeljak – Petak 08:15 – 13:00 (šaltersko radno vreme). Preporučuje se zakazati termin unapred. Za tačne i aktuelne informacije o terminima i dokumentima, kontaktiraj konzulat koji pokriva tvoj grad boravka.',
      DE: 'Das BiH-Konsulat hat geöffnet: Montag – Freitag 08:15 – 13:00 Uhr (Schalterzeit). Es wird empfohlen, vorab einen Termin zu vereinbaren. Für genaue und aktuelle Informationen wende dich an das für deinen Wohnort zuständige Konsulat.',
    },
  },
  {
    id: 'srbija',
    naziv: { BA: 'Srbija', HR: 'Srbija', SR: 'Srbija', DE: 'Serbien' },
    zastavica: '🇷🇸',
    konzulati: [
      { grad: 'Berlin', adresa: 'Taubertstraße 18, 14193 Berlin', web: 'https://www.konzulati-rs.de', konzularnoPodrucje: 'Berlin, Brandenburg, Mecklenburg-Vorpommern, Sachsen, Sachsen-Anhalt, Thüringen' },
      { grad: 'Frankfurt', adresa: 'Generalkonsulat Frankfurt', web: 'https://frankfurt.mfa.gov.rs', konzularnoPodrucje: 'Hessen, Rheinland-Pfalz, Saarland' },
      { grad: 'Düsseldorf', adresa: 'Generalkonsulat Düsseldorf', web: 'https://duesseldorf.mfa.gov.rs', konzularnoPodrucje: 'Nordrhein-Westfalen' },
      { grad: 'Hamburg', adresa: 'Generalkonsulat Hamburg', web: 'https://www.konzulati-rs.de', konzularnoPodrucje: 'Hamburg, Bremen, Schleswig-Holstein, Niedersachsen' },
      { grad: 'Stuttgart', adresa: 'Generalkonsulat Stuttgart', web: 'https://www.konzulati-rs.de', konzularnoPodrucje: 'Baden-Württemberg' },
      { grad: 'München', adresa: 'Generalkonsulat München', web: 'https://www.konzulati-rs.de', konzularnoPodrucje: 'Bayern' },
    ],
    pasos: {
      rokVazenja: {
        BA: '10 godina (odrasli), 5 godina (djeca 3–14 god.), 3 godine (djeca do 3 god.)',
        HR: '10 godina (odrasli), 5 godina (djeca 3–14 god.), 3 godine (djeca do 3 god.)',
        SR: '10 godina (odrasli), 5 godina (deca 3–14 god.), 3 godine (deca do 3 god.)',
        DE: '10 Jahre (Erwachsene), 5 Jahre (Kinder 3–14 J.), 3 Jahre (Kinder bis 3 J.)',
      },
      kadPodnjeti: {
        BA: 'Pasoš se može obnoviti najranije 7 mjeseci prije isteka. Ako zahtijevaš obnovu ranije iz opravdanog razloga (npr. putovanje, posao), potrebno je priložiti pisani dokaz.',
        HR: 'Putovnica se može obnoviti najranije 7 mjeseci prije isteka. Ako zahtijevaš obnovu ranije iz opravdanog razloga (npr. putovanje, posao), potrebno je priložiti pisani dokaz.',
        SR: 'Pasoš se može obnoviti najranije 7 meseci pre isteka. Ako zahtevaju obnovu ranije iz opravdanog razloga (npr. putovanje, posao), potrebno je priložiti pisani dokaz.',
        DE: 'Der Pass kann frühestens 7 Monate vor Ablauf erneuert werden. Bei begründetem Bedarf früher (z.B. Reise, Arbeit) ist ein schriftlicher Nachweis einzureichen.',
      },
      dokumenti: {
        BA: [
          'Važeći ili istekli srpski pasoš',
          'Za prvi biometrijski pasoš: srpski izvod iz matičnih knjiga (rodni list) + uvjerenje o državljanstvu',
          'Biometrijski podaci se uzimaju lično na licu mjesta (foto, otisak prsta, potpis)',
          'Dokaz o uplati konzularne takse',
          'Za maloljetne: saglasnost oba roditelja (javnobekrečena), a uz nju kopija pasoša odsutnog roditelja',
        ],
        HR: [
          'Važeća ili istekla srpska putovnica',
          'Za prvu biometrijsku putovnicu: srpski izvadak iz matičnih knjiga (rodni list) + uvjerenje o državljanstvu',
          'Biometrijski podaci uzimaju se osobno na licu mjesta (foto, otisak prsta, potpis)',
          'Dokaz o uplati konzularne pristojbe',
          'Za maloljetnike: suglasnost oba roditelja (javnobilježnički ovjerena), a uz nju kopija putovnice odsutnog roditelja',
        ],
        SR: [
          'Važeći ili istekli srpski pasoš',
          'Za prvi biometrijski pasoš: srpski izvod iz matičnih knjiga (rodni list) + uverenje o državljanstvu',
          'Biometrijski podaci se uzimaju lično na licu mesta (foto, otisak prsta, potpis)',
          'Dokaz o uplati konzularne takse',
          'Za maloletnike: saglasnost oba roditelja (javnobekrečena), a uz nju kopija pasoša odsutnog roditelja',
        ],
        DE: [
          'Gültiger oder abgelaufener serbischer Reisepass',
          'Beim ersten biometrischen Pass: serbische Geburtsurkunde + Staatsangehörigkeitsbescheinigung',
          'Biometrische Daten werden persönlich vor Ort erfasst (Foto, Fingerabdruck, Unterschrift)',
          'Nachweis der Zahlung der Konsulargebühr',
          'Für Minderjährige: Einverständniserklärung beider Elternteile (notariell beglaubigt), Kopie des Passes des abwesenden Elternteils',
        ],
      },
      obrada: {
        BA: 'Standardna obrada: oko 30 dana. Hitna obrada: 48 sati (uz odgovarajući pisani dokaz o potrebi). Obrada se može razlikovati od konzulata do konzulata.',
        HR: 'Standardna obrada: oko 30 dana. Hitna obrada: 48 sati (uz odgovarajući pisani dokaz o potrebi). Obrada se može razlikovati od konzulata do konzulata.',
        SR: 'Standardna obrada: oko 30 dana. Hitna obrada: 48 sati (uz odgovarajući pisani dokaz o potrebi). Obrada se može razlikovati od konzulata do konzulata.',
        DE: 'Standardbearbeitung: ca. 30 Tage. Eilbearbeitung: 48 Stunden (mit schriftlichem Nachweis der Dringlichkeit). Bearbeitungszeiten können je nach Konsulat variieren.',
      },
      cijena: {
        BA: 'Konzularna taksa se plaća pri podnošenju zahtjeva. Tačan iznos provjeri na web stranici nadležnog konzulata — plaćanje isključivo EC karticom (ne gotovinom).',
        HR: 'Konzularna pristojba plaća se pri podnošenju zahtjeva. Točan iznos provjeri na web stranici nadležnog konzulata — plaćanje isključivo EC karticom (ne gotovinom).',
        SR: 'Konzularna taksa se plaća pri podnošenju zahteva. Tačan iznos proveri na web stranici nadležnog konzulata — plaćanje isključivo EC karticom (ne gotovinom).',
        DE: 'Die Konsulargebühr wird bei Antragstellung gezahlt. Genaue Beträge bitte auf der Webseite des zuständigen Konsulats prüfen — Zahlung ausschließlich per EC-Karte (kein Bargeld).',
      },
    },
    licna: {
      moguce: false,
      info: {
        BA: '⚠️ Važno: Lična karta i vozačka dozvola Republike Srbije NE mogu se obnoviti putem konzulata u Njemačkoj. Zahtjev se mora podnijeti lično na nadležnoj policijskoj stanici u Srbiji prema mjestu prijave.',
        HR: '⚠️ Važno: Osobna iskaznica i vozačka dozvola Republike Srbije NE mogu se obnoviti putem konzulata u Njemačkoj. Zahtjev se mora podnijeti osobno na nadležnoj policijskoj postaji u Srbiji prema mjestu prijave.',
        SR: '⚠️ Važno: Lična karta i vozačka dozvola Republike Srbije NE mogu se obnoviti putem konzulata u Nemačkoj. Zahtev se mora podneti lično na nadležnoj policijskoj stanici u Srbiji prema mestu prijave.',
        DE: '⚠️ Wichtig: Personalausweis und Führerschein der Republik Serbien können NICHT über das Konsulat in Deutschland erneuert werden. Der Antrag muss persönlich bei der zuständigen Polizeibehörde in Serbien am Wohnmeldeort gestellt werden.',
      },
    },
    opstaNapomena: {
      BA: 'Srpski konzulati rade: Ponedeljak, Utorak, Četvrtak, Petak 09:00–13:00; Srijeda 09:00–13:00 i 15:00–18:00. Termini se zakazuju unaprijed. Za tačan raspored i dokumentaciju kontaktiraj konzulat koji pokriva tvoj grad boravka.',
      HR: 'Srpski konzulati rade: Ponedjeljak, Utorak, Četvrtak, Petak 09:00–13:00; Srijeda 09:00–13:00 i 15:00–18:00. Termini se zakazuju unaprijed. Za točan raspored i dokumentaciju kontaktiraj konzulat koji pokriva tvoj grad boravka.',
      SR: 'Srpski konzulati rade: Ponedeljak, Utorak, Četvrtak, Petak 09:00–13:00; Sreda 09:00–13:00 i 15:00–18:00. Termini se zakazuju unapred. Za tačan raspored i dokumentaciju kontaktiraj konzulat koji pokriva tvoj grad boravka.',
      DE: 'Serbische Konsulate geöffnet: Mo., Di., Do., Fr. 09:00–13:00 Uhr; Mi. 09:00–13:00 und 15:00–18:00 Uhr. Termine werden vorab vereinbart. Für genaue Termine und Unterlagen wende dich an das für deinen Wohnort zuständige Konsulat.',
    },
  },
  {
    id: 'kosovo',
    naziv: { BA: 'Kosovo', HR: 'Kosovo', SR: 'Kosovo', DE: 'Kosovo' },
    zastavica: '🇽🇰',
    konzulati: [
      { grad: 'Berlin', adresa: 'Botschaft der Republik Kosovo, Berlin', web: 'https://ambasada-ks.net/de', konzularnoPodrucje: 'Berlin, Nordostdeutschland' },
      { grad: 'Frankfurt', adresa: 'Generalkonsulat Frankfurt', web: 'https://ambasada-ks.net/de', konzularnoPodrucje: 'Hessen, Bayern, Baden-Württemberg i okolina' },
    ],
    pasos: {
      rokVazenja: {
        BA: '10 godina (odrasli), 5 godina (maloljetni)',
        HR: '10 godina (odrasli), 5 godina (maloljetnici)',
        SR: '10 godina (odrasli), 5 godina (maloletnici)',
        DE: '10 Jahre (Erwachsene), 5 Jahre (Minderjährige)',
      },
      kadPodnjeti: {
        BA: 'Što ranije po isteku pasoša. Nema ograničenja kada se može podnijeti zahtjev za obnovu — preporuča se ne čekati da pasoš istekne.',
        HR: 'Što ranije po isteku putovnice. Nema ograničenja kada se može podnijeti zahtjev za obnovu — preporuča se ne čekati da putovnica istekne.',
        SR: 'Što ranije po isteku pasoša. Nema ograničenja kada se može podneti zahtev za obnovu — preporučuje se ne čekati da pasoš istekne.',
        DE: 'Möglichst rechtzeitig vor oder nach Ablauf. Es gibt keine festgelegte Frist zur Erneuerung — es wird empfohlen, nicht bis zum Ablauf zu warten.',
      },
      dokumenti: {
        BA: [
          'Biometrijska/važeća lična karta Kosova (ili drugi važeći dokument)',
          'Postojeći pasoš (pri obnovi)',
          'Za maloljetne: izvod iz matičnih knjiga iz Kosova, identifikacija oba roditelja, vjenčani list (ako relevantno), sudska odluka o starateljstvu (ako roditelji razvedeni)',
          'Dokaz o uplati takse',
        ],
        HR: [
          'Biometrijska/važeća osobna iskaznica Kosova (ili drugi važeći dokument)',
          'Postojeća putovnica (pri obnovi)',
          'Za maloljetnike: izvadak iz matičnih knjiga iz Kosova, identifikacija oba roditelja, vjenčani list (ako relevantno), sudska odluka o skrbništvu (ako su roditelji razvedeni)',
          'Dokaz o uplati pristojbe',
        ],
        SR: [
          'Biometrijska/važeća lična karta Kosova (ili drugi važeći dokument)',
          'Postojeći pasoš (pri obnovi)',
          'Za maloletnike: izvod iz matičnih knjiga iz Kosova, identifikacija oba roditelja, izvod venčanog lista (ako relevantno), sudska odluka o starateljstvu (ako su roditelji razvedeni)',
          'Dokaz o uplati takse',
        ],
        DE: [
          'Biometrischer/gültiger Personalausweis des Kosovo (oder anderes gültiges Ausweisdokument)',
          'Vorhandener Reisepass (bei Verlängerung)',
          'Für Minderjährige: Personenstandsurkunde aus Kosovo, Ausweise beider Elternteile, Heiratsurkunde (ggf.), Sorgerechtsurteil (bei Scheidung)',
          'Nachweis der Gebührenzahlung',
        ],
      },
      obrada: {
        BA: 'Standardna obrada: nekoliko sedmica. Dokument se šalje diplomatskim putem iz Kosova. Provjeri aktuelne rokove pri zakazivanju termina.',
        HR: 'Standardna obrada: nekoliko tjedana. Dokument se šalje diplomatskim putem iz Kosova. Provjeri aktualne rokove pri zakazivanju termina.',
        SR: 'Standardna obrada: nekoliko nedelja. Dokument se šalje diplomatskim putem iz Kosova. Proveri aktuelne rokove pri zakazivanju termina.',
        DE: 'Standardbearbeitung: einige Wochen. Das Dokument wird auf dem Dienstweg aus Kosovo übermittelt. Aktuelle Bearbeitungszeiten bitte bei Terminvereinbarung erfragen.',
      },
      cijena: {
        BA: 'Pasoš: 100 € (odrasli), 80 € (maloljetni). Lična karta: 100 € (odrasli), 80 € (maloljetni). Provjeri aktuelne cijene na web stranici konzulata.',
        HR: 'Putovnica: 100 € (odrasli), 80 € (maloljetnici). Osobna iskaznica: 100 € (odrasli), 80 € (maloljetnici). Provjeri aktualne cijene na web stranici konzulata.',
        SR: 'Pasoš: 100 € (odrasli), 80 € (maloletni). Lična karta: 100 € (odrasli), 80 € (maloletni). Proveri aktuelne cene na web stranici konzulata.',
        DE: 'Reisepass: 100 € (Erwachsene), 80 € (Minderjährige). Personalausweis: 100 € (Erwachsene), 80 € (Minderjährige). Aktuelle Gebühren bitte auf der Konsulatswebseite prüfen.',
      },
    },
    licna: {
      moguce: true,
      info: {
        BA: 'Lična karta Kosova može se obnoviti putem konzulata pod istim uslovima i uz iste dokumente kao pasoš.',
        HR: 'Osobna iskaznica Kosova može se obnoviti putem konzulata pod istim uvjetima i uz iste dokumente kao putovnica.',
        SR: 'Lična karta Kosova može se obnoviti putem konzulata pod istim uslovima i uz iste dokumente kao pasoš.',
        DE: 'Der kosovarische Personalausweis kann beim Konsulat unter denselben Bedingungen und mit denselben Unterlagen wie der Reisepass erneuert werden.',
      },
    },
    opstaNapomena: {
      BA: 'Kosovo ima manji broj konzulata od ostalih balkanskih zemalja. Provjeri koji konzulat pokriva tvoj grad boravka i obavezno zakaži termin unaprijed. Konzulati imaju ograničen kapacitet.',
      HR: 'Kosovo ima manji broj konzulata od ostalih balkanskih zemalja. Provjeri koji konzulat pokriva tvoj grad boravka i obavezno zakaži termin unaprijed. Konzulati imaju ograničen kapacitet.',
      SR: 'Kosovo ima manji broj konzulata od ostalih balkanskih zemalja. Proveri koji konzulat pokriva tvoj grad boravka i obavezno zakaži termin unapred. Konzulati imaju ograničen kapacitet.',
      DE: 'Kosovo verfügt über weniger Konsulate als andere Balkanstaaten. Bitte prüfen, welches Konsulat für den Wohnort zuständig ist, und unbedingt vorab einen Termin vereinbaren. Die Konsulate haben begrenzte Kapazitäten.',
    },
  },
  {
    id: 'hrvatska',
    naziv: { BA: 'Hrvatska', HR: 'Hrvatska', SR: 'Hrvatska', DE: 'Kroatien' },
    zastavica: '🇭🇷',
    konzulati: [
      { grad: 'Berlin', adresa: 'Botschaft der Republik Kroatien, Berlin', web: 'https://de.mvep.gov.hr', konzularnoPodrucje: 'Berlin, Nordostdeutschland' },
      { grad: 'Frankfurt', adresa: 'Generalkonsulat Frankfurt', web: 'https://de.mvep.gov.hr', konzularnoPodrucje: 'Hessen i okolina' },
      { grad: 'München', adresa: 'Generalkonsulat München', web: 'https://de.mvep.gov.hr', konzularnoPodrucje: 'Bayern' },
      { grad: 'Stuttgart', adresa: 'Generalkonsulat Stuttgart', web: 'https://de.mvep.gov.hr', konzularnoPodrucje: 'Baden-Württemberg' },
      { grad: 'Düsseldorf', adresa: 'Generalkonsulat Düsseldorf', web: 'https://de.mvep.gov.hr', konzularnoPodrucje: 'Nordrhein-Westfalen' },
      { grad: 'Hamburg', adresa: 'Generalkonsulat Hamburg', web: 'https://de.mvep.gov.hr', konzularnoPodrucje: 'Hamburg, Bremen, Schleswig-Holstein, Niedersachsen' },
    ],
    pasos: {
      rokVazenja: {
        BA: '10 godina (odrasli 18+), 5 godina (djeca do 18 god.)',
        HR: '10 godina (odrasli 18+), 5 godina (djeca do 18 god.)',
        SR: '10 godina (odrasli 18+), 5 godina (deca do 18 god.)',
        DE: '10 Jahre (Erwachsene 18+), 5 Jahre (Kinder bis 18 J.)',
      },
      kadPodnjeti: {
        BA: 'Pasoš se može obnoviti i dok je još uvijek važeći. Preporuča se početi postupak 3–6 mjeseci prije isteka, posebno ako planirate putovati.',
        HR: 'Putovnica se može obnoviti i dok je još uvijek važeća. Preporuča se pokrenuti postupak 3–6 mjeseci prije isteka, posebno ako planirate putovati.',
        SR: 'Pasoš se može obnoviti i dok je još uvek važeći. Preporučuje se početi postupak 3–6 meseci pre isteka, posebno ako planirate putovati.',
        DE: 'Der Pass kann auch während der Gültigkeit erneuert werden. Es wird empfohlen, den Vorgang 3–6 Monate vor Ablauf zu beginnen, besonders bei geplanten Reisen.',
      },
      dokumenti: {
        BA: [
          'Važeći ili istekli hrvatski pasoš',
          'Važeća hrvatska lična iskaznica (preporuča se)',
          'Biometrijski podaci (foto, otisak prsta, potpis) uzimaju se lično na licu mjesta',
          'Potvrda o prijavljenom boravištu u Njemačkoj (Meldebescheinigung)',
          'Dokaz o uplati konzularne takse',
          'Za maloljetne: prisutnost oba roditelja ili ovjerena suglasnost odsutnog roditelja',
        ],
        HR: [
          'Važeća ili istekla hrvatska putovnica',
          'Važeća hrvatska osobna iskaznica (preporuča se)',
          'Biometrijski podaci (foto, otisak prsta, potpis) uzimaju se osobno na licu mjesta',
          'Potvrda o prijavljenom boravištu u Njemačkoj (Meldebescheinigung)',
          'Dokaz o uplati konzularne pristojbe',
          'Za maloljetnike: prisutnost oba roditelja ili ovjerena suglasnost odsutnog roditelja',
        ],
        SR: [
          'Važeći ili istekli hrvatski pasoš',
          'Važeća hrvatska lična iskaznica (preporuča se)',
          'Biometrijski podaci (foto, otisak prsta, potpis) uzimaju se lično na licu mesta',
          'Potvrda o prijavljenom boravištu u Nemačkoj (Meldebescheinigung)',
          'Dokaz o uplati konzularne takse',
          'Za maloletnike: prisutnost oba roditelja ili overena saglasnost odsutnog roditelja',
        ],
        DE: [
          'Gültiger oder abgelaufener kroatischer Reisepass',
          'Gültige kroatische Personalausweis (empfohlen)',
          'Biometrische Daten (Foto, Fingerabdruck, Unterschrift) werden persönlich erfasst',
          'Meldebescheinigung des deutschen Wohnorts',
          'Nachweis der Zahlung der Konsulargebühr',
          'Für Minderjährige: Anwesenheit beider Elternteile oder beglaubigte Einverständniserklärung des abwesenden Elternteils',
        ],
      },
      obrada: {
        BA: 'Standardna obrada: 4–6 sedmica. Provjeri aktuelne rokove pri zakazivanju termina.',
        HR: 'Standardna obrada: 4–6 tjedana. Provjeri aktualne rokove pri zakazivanju termina.',
        SR: 'Standardna obrada: 4–6 nedelja. Proveri aktuelne rokove pri zakazivanju termina.',
        DE: 'Standardbearbeitung: 4–6 Wochen. Aktuelle Bearbeitungszeiten bitte bei Terminvereinbarung erfragen.',
      },
      cijena: {
        BA: 'Konzularna taksa zavisi od konzulata i trenutnog cjenovnika. Plaćanje gotovinom ili karticom — provjeri na web stranici konzulata.',
        HR: 'Konzularna pristojba ovisi o konzulatu i aktualnom cjeniku. Plaćanje gotovinom ili karticom — provjeri na web stranici konzulata.',
        SR: 'Konzularna taksa zavisi od konzulata i trenutnog cenovnika. Plaćanje gotovinom ili karticom — proveri na web stranici konzulata.',
        DE: 'Die Konsulargebühr hängt vom jeweiligen Konsulat und der aktuellen Gebührenordnung ab. Zahlung bar oder per Karte — bitte Konsulatswebseite prüfen.',
      },
      napomena: {
        BA: 'Kao EU država, hrvatska konzularna mreža u Njemačkoj je razvijena. Hrvatska lična iskaznica (osobna iskaznica) vrijedi kao putni dokument za putovanje unutar EU/Schengena — može se obnoviti pod istim uvjetima.',
        HR: 'Kao EU država, hrvatska konzularna mreža u Njemačkoj je razvijena. Hrvatska osobna iskaznica vrijedi kao putni dokument za putovanje unutar EU/Schengena — može se obnoviti pod istim uvjetima.',
        SR: 'Kao EU zemlja, hrvatska konzularna mreža u Nemačkoj je razvijena. Hrvatska lična karta (osobna iskaznica) važi kao putni dokument za putovanje unutar EU/Schengena — može se obnoviti pod istim uslovima.',
        DE: 'Als EU-Staat verfügt Kroatien über ein gut ausgebautes Konsulatnetz in Deutschland. Der kroatische Personalausweis gilt als Reisedokument für Reisen innerhalb der EU/des Schengenraums — er kann unter denselben Bedingungen erneuert werden.',
      },
    },
    licna: {
      moguce: true,
      info: {
        BA: 'Hrvatska lična iskaznica (osobna iskaznica) može se obnoviti u konzulatu pod istim uvjetima kao pasoš. Vrijedi kao putni dokument unutar EU.',
        HR: 'Hrvatska osobna iskaznica može se obnoviti u konzulatu pod istim uvjetima kao putovnica. Vrijedi kao putni dokument unutar EU.',
        SR: 'Hrvatska lična karta (osobna iskaznica) može se obnoviti u konzulatu pod istim uslovima kao pasoš. Važi kao putni dokument unutar EU.',
        DE: 'Der kroatische Personalausweis kann beim Konsulat unter denselben Bedingungen wie der Reisepass erneuert werden. Er gilt als Reisedokument innerhalb der EU.',
      },
    },
    opstaNapomena: {
      BA: 'Hrvatska je EU država, pa je konzularna mreža u Njemačkoj posebno dobro razvijena. Termini se zakazuju online. Provjeri koji konzulat pokriva tvoj grad boravka.',
      HR: 'Hrvatska je EU država, pa je konzularna mreža u Njemačkoj posebno dobro razvijena. Termini se zakazuju online. Provjeri koji konzulat pokriva tvoj grad boravka.',
      SR: 'Hrvatska je EU zemlja, pa je konzularna mreža u Nemačkoj posebno dobro razvijena. Termini se zakazuju online. Proveri koji konzulat pokriva tvoj grad boravka.',
      DE: 'Kroatien ist EU-Mitglied, daher ist das Konsulatnetz in Deutschland besonders gut ausgebaut. Termine werden online gebucht. Bitte das für den Wohnort zuständige Konsulat prüfen.',
    },
  },
  {
    id: 'crna-gora',
    naziv: { BA: 'Crna Gora', HR: 'Crna Gora', SR: 'Crna Gora', DE: 'Montenegro' },
    zastavica: '🇲🇪',
    konzulati: [
      { grad: 'Berlin', adresa: 'Botschaft von Montenegro, Berlin', web: 'https://www.mfa.gov.me/de', konzularnoPodrucje: 'Cijela Njemačka (samo ambasada u Berlinu)' },
    ],
    pasos: {
      rokVazenja: {
        BA: '10 godina (odrasli), 5 godina (maloljetni)',
        HR: '10 godina (odrasli), 5 godina (maloljetnici)',
        SR: '10 godina (odrasli), 5 godina (maloletnici)',
        DE: '10 Jahre (Erwachsene), 5 Jahre (Minderjährige)',
      },
      kadPodnjeti: {
        BA: 'Preporuča se podnijeti zahtjev na vrijeme — nekoliko sedmica/mjeseci prije isteka pasoša. Zakaži termin unaprijed jer ambasada ima ograničen kapacitet.',
        HR: 'Preporuča se podnijeti zahtjev na vrijeme — nekoliko tjedana/mjeseci prije isteka putovnice. Zakaži termin unaprijed jer ambasada ima ograničen kapacitet.',
        SR: 'Preporučuje se podneti zahtev na vreme — nekoliko nedelja/meseci pre isteka pasoša. Zakaži termin unapred jer ambasada ima ograničen kapacitet.',
        DE: 'Es wird empfohlen, den Antrag rechtzeitig zu stellen — einige Wochen/Monate vor Ablauf. Termin vorab vereinbaren, da die Botschaft begrenzte Kapazitäten hat.',
      },
      dokumenti: {
        BA: [
          'Važeći ili istekli crnogorski pasoš',
          'Lična karta ili drugi dokument koji dokazuje identitet i državljanstvo',
          'Biometrijski podaci uzimaju se lično na licu mjesta',
          'Dokaz o zakonitom boravku u Njemačkoj',
          'Dokaz o uplati takse',
        ],
        HR: [
          'Važeća ili istekla crnogorska putovnica',
          'Osobna iskaznica ili drugi dokument koji dokazuje identitet i državljanstvo',
          'Biometrijski podaci uzimaju se osobno na licu mjesta',
          'Dokaz o zakonitom boravku u Njemačkoj',
          'Dokaz o uplati pristojbe',
        ],
        SR: [
          'Važeći ili istekli crnogorski pasoš',
          'Lična karta ili drugi dokument koji dokazuje identitet i državljanstvo',
          'Biometrijski podaci uzimaju se lično na licu mesta',
          'Dokaz o zakonitom boravku u Nemačkoj',
          'Dokaz o uplati takse',
        ],
        DE: [
          'Gültiger oder abgelaufener montenegrinischer Reisepass',
          'Personalausweis oder anderes Identitätsdokument',
          'Biometrische Daten werden persönlich vor Ort erfasst',
          'Nachweis des rechtmäßigen Aufenthalts in Deutschland',
          'Nachweis der Gebührenzahlung',
        ],
      },
      obrada: {
        BA: 'Standardna obrada: oko 30 dana. Provjeri aktuelne rokove pri zakazivanju termina.',
        HR: 'Standardna obrada: oko 30 dana. Provjeri aktualne rokove pri zakazivanju termina.',
        SR: 'Standardna obrada: oko 30 dana. Proveri aktuelne rokove pri zakazivanju termina.',
        DE: 'Standardbearbeitung: ca. 30 Tage. Aktuelle Bearbeitungszeiten bitte bei Terminvereinbarung erfragen.',
      },
      cijena: {
        BA: 'Provjeri aktuelne iznose na web stranici ambasade.',
        HR: 'Provjeri aktualne iznose na web stranici ambasade.',
        SR: 'Proveri aktuelne iznose na web stranici ambasade.',
        DE: 'Aktuelle Gebührenbeträge bitte auf der Botschaftswebseite prüfen.',
      },
    },
    licna: {
      moguce: true,
      info: {
        BA: 'Lična karta Crne Gore može se obnoviti putem ambasade u Berlinu uz iste uvjete kao pasoš.',
        HR: 'Osobna iskaznica Crne Gore može se obnoviti putem ambasade u Berlinu uz iste uvjete kao putovnica.',
        SR: 'Lična karta Crne Gore može se obnoviti putem ambasade u Berlinu uz iste uslove kao pasoš.',
        DE: 'Der montenegrinische Personalausweis kann über die Botschaft in Berlin unter denselben Bedingungen wie der Reisepass erneuert werden.',
      },
    },
    opstaNapomena: {
      BA: 'Crna Gora ima samo ambasadu u Berlinu bez generalnih konzulata u drugim gradovima. Ako živiš u Münchenu, Frankfurtu itd., moraš putovati u Berlin za konzularne usluge. Zakaži termin unaprijed.',
      HR: 'Crna Gora ima samo ambasadu u Berlinu bez generalnih konzulata u drugim gradovima. Ako živiš u Münchenu, Frankfurtu itd., moraš putovati u Berlin za konzularne usluge. Zakaži termin unaprijed.',
      SR: 'Crna Gora ima samo ambasadu u Berlinu bez generalnih konzulata u drugim gradovima. Ako živiš u Minhenu, Frankfurtu itd., moraš putovati u Berlin za konzularne usluge. Zakaži termin unapred.',
      DE: 'Montenegro hat nur eine Botschaft in Berlin — keine Generalkonsulate in anderen Städten. Wohnst du in München, Frankfurt usw., musst du für konsularische Dienste nach Berlin reisen. Termin unbedingt vorab vereinbaren.',
    },
  },
  {
    id: 'albanija',
    naziv: { BA: 'Albanija', HR: 'Albanija', SR: 'Albanija', DE: 'Albanien' },
    zastavica: '🇦🇱',
    konzulati: [
      { grad: 'Berlin', adresa: 'Botschaft der Republik Albanien, Berlin', web: 'https://www.ambasadat.gov.al/germany/de', konzularnoPodrucje: 'Berlin i sjeveroistok' },
      { grad: 'Hamburg', adresa: 'Generalkonsulat Hamburg', web: 'https://www.ambasadat.gov.al/germany/de', konzularnoPodrucje: 'Hamburg, Bremen, Schleswig-Holstein, Niedersachsen' },
      { grad: 'München', adresa: 'Generalkonsulat München', web: 'https://www.ambasadat.gov.al/germany/de', konzularnoPodrucje: 'Bayern' },
      { grad: 'Stuttgart', adresa: 'Generalkonsulat Stuttgart', web: 'https://www.ambasadat.gov.al/germany/de', konzularnoPodrucje: 'Baden-Württemberg' },
    ],
    pasos: {
      rokVazenja: {
        BA: '10 godina (odrasli 18+), 5 godina (djeca do 18 god.)',
        HR: '10 godina (odrasli 18+), 5 godina (djeca do 18 god.)',
        SR: '10 godina (odrasli 18+), 5 godina (deca do 18 god.)',
        DE: '10 Jahre (Erwachsene 18+), 5 Jahre (Kinder bis 18 J.)',
      },
      kadPodnjeti: {
        BA: 'Preporuča se podnijeti zahtjev nekoliko sedmica/mjeseci prije isteka. Zakaži termin unaprijed.',
        HR: 'Preporuča se podnijeti zahtjev nekoliko tjedana/mjeseci prije isteka. Zakaži termin unaprijed.',
        SR: 'Preporučuje se podneti zahtev nekoliko nedelja/meseci pre isteka. Zakaži termin unapred.',
        DE: 'Es wird empfohlen, den Antrag einige Wochen/Monate vor Ablauf zu stellen. Termin vorab vereinbaren.',
      },
      dokumenti: {
        BA: [
          'Važeći ili istekli albanski pasoš ili lična karta',
          'Biometrijski podaci uzimaju se lično na licu mjesta',
          'Dokaz o zakonitom boravku u Njemačkoj',
          'Dokaz o uplati takse',
          'Za maloljetne: dokumenti oba roditelja i izvod iz matičnih knjiga',
        ],
        HR: [
          'Važeća ili istekla albanska putovnica ili osobna iskaznica',
          'Biometrijski podaci uzimaju se osobno na licu mjesta',
          'Dokaz o zakonitom boravku u Njemačkoj',
          'Dokaz o uplati pristojbe',
          'Za maloljetnike: dokumenti oba roditelja i izvadak iz matičnih knjiga',
        ],
        SR: [
          'Važeći ili istekli albanski pasoš ili lična karta',
          'Biometrijski podaci uzimaju se lično na licu mesta',
          'Dokaz o zakonitom boravku u Nemačkoj',
          'Dokaz o uplati takse',
          'Za maloletnike: dokumenti oba roditelja i izvod iz matičnih knjiga',
        ],
        DE: [
          'Gültiger oder abgelaufener albanischer Reisepass oder Personalausweis',
          'Biometrische Daten werden persönlich vor Ort erfasst',
          'Nachweis des rechtmäßigen Aufenthalts in Deutschland',
          'Nachweis der Gebührenzahlung',
          'Für Minderjährige: Dokumente beider Elternteile und Personenstandsurkunde',
        ],
      },
      obrada: {
        BA: 'Standardna obrada: oko 4–6 sedmica. Provjeri aktuelne rokove pri zakazivanju termina.',
        HR: 'Standardna obrada: oko 4–6 tjedana. Provjeri aktualne rokove pri zakazivanju termina.',
        SR: 'Standardna obrada: oko 4–6 nedelja. Proveri aktuelne rokove pri zakazivanju termina.',
        DE: 'Standardbearbeitung: ca. 4–6 Wochen. Aktuelle Bearbeitungszeiten bitte bei Terminvereinbarung erfragen.',
      },
      cijena: {
        BA: 'Provjeri aktuelne iznose na web stranici konzulata.',
        HR: 'Provjeri aktualne iznose na web stranici konzulata.',
        SR: 'Proveri aktuelne iznose na web stranici konzulata.',
        DE: 'Aktuelle Gebührenbeträge bitte auf der Konsulatswebseite prüfen.',
      },
    },
    licna: {
      moguce: true,
      info: {
        BA: 'Albanska lična karta može se obnoviti putem konzulata uz iste uvjete kao pasoš.',
        HR: 'Albanska osobna iskaznica može se obnoviti putem konzulata uz iste uvjete kao putovnica.',
        SR: 'Albanska lična karta može se obnoviti putem konzulata uz iste uslove kao pasoš.',
        DE: 'Der albanische Personalausweis kann beim Konsulat unter denselben Bedingungen wie der Reisepass erneuert werden.',
      },
    },
    opstaNapomena: {
      BA: 'Albanski konzulati u Njemačkoj imaju ograničene termine. Preporuča se zakazivanje unaprijed i pravovremena obnova dokumenata.',
      HR: 'Albanski konzulati u Njemačkoj imaju ograničene termine. Preporuča se zakazivanje unaprijed i pravovremena obnova dokumenata.',
      SR: 'Albanski konzulati u Nemačkoj imaju ograničene termine. Preporučuje se zakazivanje unapred i pravovremena obnova dokumenata.',
      DE: 'Albanische Konsulate in Deutschland haben begrenzte Terminkapazitäten. Frühzeitige Terminvereinbarung und rechtzeitige Dokumentenerneuerung werden empfohlen.',
    },
  },
  {
    id: 'sjeverna-makedonija',
    naziv: { BA: 'Sjeverna Makedonija', HR: 'Sjeverna Makedonija', SR: 'Severna Makedonija', DE: 'Nordmazedonien' },
    zastavica: '🇲🇰',
    konzulati: [
      { grad: 'Berlin', adresa: 'Botschaft der Republik Nordmazedonien, Berlin', web: 'https://www.missions.gov.mk/berlin', konzularnoPodrucje: 'Berlin, Nordostdeutschland' },
      { grad: 'München', adresa: 'Generalkonsulat München', web: 'https://www.missions.gov.mk', konzularnoPodrucje: 'Bayern, Baden-Württemberg' },
      { grad: 'Düsseldorf', adresa: 'Generalkonsulat Düsseldorf', web: 'https://www.missions.gov.mk', konzularnoPodrucje: 'Nordrhein-Westfalen' },
    ],
    pasos: {
      rokVazenja: {
        BA: '10 godina (odrasli 18+), 5 godina (djeca do 18 god.)',
        HR: '10 godina (odrasli 18+), 5 godina (djeca do 18 god.)',
        SR: '10 godina (odrasli 18+), 5 godina (deca do 18 god.)',
        DE: '10 Jahre (Erwachsene 18+), 5 Jahre (Kinder bis 18 J.)',
      },
      kadPodnjeti: {
        BA: 'Preporuča se podnijeti zahtjev nekoliko sedmica/mjeseci prije isteka. Zakaži termin unaprijed.',
        HR: 'Preporuča se podnijeti zahtjev nekoliko tjedana/mjeseci prije isteka. Zakaži termin unaprijed.',
        SR: 'Preporučuje se podneti zahtev nekoliko nedelja/meseci pre isteka. Zakaži termin unapred.',
        DE: 'Es wird empfohlen, den Antrag einige Wochen/Monate vor Ablauf zu stellen. Termin vorab vereinbaren.',
      },
      dokumenti: {
        BA: [
          'Važeći ili istekli makedonski pasoš ili lična karta',
          'Biometrijski podaci uzimaju se lično na licu mjesta',
          'Dokaz o zakonitom boravku u Njemačkoj',
          'Dokaz o uplati takse',
          'Za maloljetne: dokumenti oba roditelja i izvod iz matičnih knjiga',
        ],
        HR: [
          'Važeća ili istekla makedonska putovnica ili osobna iskaznica',
          'Biometrijski podaci uzimaju se osobno na licu mjesta',
          'Dokaz o zakonitom boravku u Njemačkoj',
          'Dokaz o uplati pristojbe',
          'Za maloljetnike: dokumenti oba roditelja i izvadak iz matičnih knjiga',
        ],
        SR: [
          'Važeći ili istekli makedonski pasoš ili lična karta',
          'Biometrijski podaci uzimaju se lično na licu mesta',
          'Dokaz o zakonitom boravku u Nemačkoj',
          'Dokaz o uplati takse',
          'Za maloletnike: dokumenti oba roditelja i izvod iz matičnih knjiga',
        ],
        DE: [
          'Gültiger oder abgelaufener nordmazedonischer Reisepass oder Personalausweis',
          'Biometrische Daten werden persönlich vor Ort erfasst',
          'Nachweis des rechtmäßigen Aufenthalts in Deutschland',
          'Nachweis der Gebührenzahlung',
          'Für Minderjährige: Dokumente beider Elternteile und Personenstandsurkunde',
        ],
      },
      obrada: {
        BA: 'Standardna obrada: oko 4–6 sedmica. Provjeri aktuelne rokove pri zakazivanju termina.',
        HR: 'Standardna obrada: oko 4–6 tjedana. Provjeri aktualne rokove pri zakazivanju termina.',
        SR: 'Standardna obrada: oko 4–6 nedelja. Proveri aktuelne rokove pri zakazivanju termina.',
        DE: 'Standardbearbeitung: ca. 4–6 Wochen. Aktuelle Bearbeitungszeiten bitte bei Terminvereinbarung erfragen.',
      },
      cijena: {
        BA: 'Provjeri aktuelne iznose na web stranici konzulata.',
        HR: 'Provjeri aktualne iznose na web stranici konzulata.',
        SR: 'Proveri aktuelne iznose na web stranici konzulata.',
        DE: 'Aktuelle Gebührenbeträge bitte auf der Konsulatswebseite prüfen.',
      },
    },
    licna: {
      moguce: true,
      info: {
        BA: 'Makedonska lična karta može se obnoviti putem konzulata uz iste uvjete kao pasoš.',
        HR: 'Makedonska osobna iskaznica može se obnoviti putem konzulata uz iste uvjete kao putovnica.',
        SR: 'Makedonska lična karta može se obnoviti putem konzulata uz iste uslove kao pasoš.',
        DE: 'Der nordmazedonische Personalausweis kann beim Konsulat unter denselben Bedingungen wie der Reisepass erneuert werden.',
      },
    },
    opstaNapomena: {
      BA: 'Sjeverna Makedonija ima konzulate u Berlinu, Münchenu i Düsseldorfu. Provjeri koji pokriva tvoj grad i zakaži termin unaprijed.',
      HR: 'Sjeverna Makedonija ima konzulate u Berlinu, Münchenu i Düsseldorfu. Provjeri koji pokriva tvoj grad i zakaži termin unaprijed.',
      SR: 'Severna Makedonija ima konzulate u Berlinu, Minhenu i Dizeldorfu. Proveri koji pokriva tvoj grad i zakaži termin unapred.',
      DE: 'Nordmazedonien hat Konsulate in Berlin, München und Düsseldorf. Bitte prüfen, welches für den Wohnort zuständig ist, und Termin vorab vereinbaren.',
    },
  },
];
