export interface GuideStepCard {
  whatToWrite: string;
  whereToFind: string;
  format: string;
  commonMistakes: string;
  whenToLeaveEmpty: string;
  example: string;
}

export interface GuideStep {
  field: string;
  instruction: string;
  cards?: GuideStepCard[];
}

export interface Guide {
  slug: string;
  category: "familie" | "wohnen" | "arbeit" | "gesundheit" | "bildung";
  title: { de: string; bs: string; en: string };
  who: { de: string; bs: string; en: string };
  authority: { de: string; bs: string; en: string };
  formName: { de: string; bs: string; en: string };
  steps: { de: GuideStep[]; bs: GuideStep[]; en: GuideStep[] };
  documents: { de: string[]; bs: string[]; en: string[] };
  processingTime: { de: string; bs: string; en: string };
  commonMistakes: { de: string[]; bs: string[]; en: string[] };
  /** URL to official PDF form. Empty string if no real PDF exists. */
  officialPdf: string;
  /** URL to official online portal for digital application. Empty string if none exists. */
  onlineLink: string;
  /** URL to official info page (used when neither PDF nor portal exist). */
  officialInfoUrl?: string;
}

export const guides: Guide[] = [
  // ===================== FAMILIE =====================
  {
    slug: "kindergeld",
    category: "familie",
    title: { de: "Kindergeld", bs: "Dječji dodatak (Kindergeld)", en: "Child Benefit (Kindergeld)" },
    who: {
      de: "Eltern mit Wohnsitz in Deutschland, für jedes Kind unter 18 (bis 25 bei Ausbildung/Studium).",
      bs: "Roditelji sa prebivalištem u Njemačkoj, za svako dijete do 18. godine (do 25. uz školovanje).",
      en: "Parents residing in Germany, for each child under 18 (up to 25 if in education).",
    },
    authority: {
      de: "Familienkasse der Bundesagentur für Arbeit",
      bs: "Familienkasse pri Saveznoj agenciji za rad",
      en: "Family Benefits Office (Familienkasse)",
    },
    formName: {
      de: "Antrag auf Kindergeld (KG1)",
      bs: "Zahtjev za dječji dodatak (KG1)",
      en: "Application for Child Benefit (KG1)",
    },
    steps: {
      de: [
        { field: "Steuerliche Identifikationsnummer", instruction: "11-stellige Steuer-ID der antragstellenden Person eintragen." },
        { field: "Personalien der antragstellenden Person", instruction: "Familienname, Vorname, Geburtsdatum, Geburtsort, Geschlecht, Staatsangehörigkeit." },
        { field: "Anschrift", instruction: "Vollständige Meldeadresse (Straße, Hausnummer, PLZ, Wohnort, Staat)." },
        { field: "Familienstand", instruction: "Aktuellen Familienstand ankreuzen." },
        { field: "Angaben zum Ehepartner / Lebenspartner", instruction: "Steuer-ID, Name, Geburtsdatum, Staatsangehörigkeit, Geschlecht, ggf. abweichende Anschrift." },
        { field: "Angaben zum Zahlungsweg", instruction: "IBAN, BIC und Kontoinhaber eintragen." },
        { field: "Angaben zu Kindern", instruction: "Alle Kinder auflisten, für die bereits Kindergeld bezogen wird, sowie weitere eigene Kinder." },
        { field: "Unterschrift & Erklärung", instruction: "Antrag unterschreiben. Bei Ehepaaren: auch Ehepartner unterschreiben lassen." },
      ],
      bs: [
        {
          field: "Porezni identifikacioni broj (Steuer-ID)",
          instruction: "Unesite 11-cifreni porezni identifikacioni broj podnosioca zahtjeva.",
          cards: [
            { whatToWrite: "Vaš lični 11-cifreni porezni ID (Steuerliche Identifikationsnummer). To NIJE porezni broj (Steuernummer) — to su dva različita broja.", whereToFind: "Pismo od Bundeszentralamt für Steuern koje ste dobili po prijavi prebivališta u Njemačkoj. Također na platnoj listi (Lohnsteuerbescheinigung) ili poreznom rješenju (Einkommensteuerbescheid).", format: "Tačno 11 cifara, bez razmaka i crtica. Primjer: 12345678901", commonMistakes: "Upisivanje Steuernummer umjesto Steuer-ID. Steuernummer ima drugačiji format (npr. 12/345/67890). Familienkasse traži isključivo Steuer-ID.", whenToLeaveEmpty: "Samo ako vam Steuer-ID još nije dodijeljen (npr. tek ste se prijavili). Napišite napomenu 'noch nicht vergeben'. Familienkasse može obraditi zahtjev i bez toga, ali će tražiti naknadno.", example: "Steuerliche Identifikationsnummer: 65 929 310 054" },
          ],
        },
        {
          field: "Lični podaci podnosioca zahtjeva",
          instruction: "Prezime, ime, datum rođenja, mjesto rođenja, spol, državljanstvo.",
          cards: [
            { whatToWrite: "Prezime (Familienname), ime (Vorname), eventualno akademski naslov (Titel), datum rođenja, mjesto rođenja, spol, državljanstvo.", whereToFind: "Pasoš ili lična karta. Državljanstvo mora odgovarati onome u pasošu.", format: "Prezime i ime — kao u pasošu/ličnoj karti. Datum rođenja: DD.MM.YYYY (npr. 15.03.1990). Spol: zaokružiti M/W/D.", commonMistakes: "Ime napisano drugačije nego u pasošu (dijakritički znakovi: č, ž, š — koristite kako piše u dokumentu). Pogrešan format datuma. Zaboravljen djevojačko prezime ako je relevantno.", whenToLeaveEmpty: "Sva polja su obavezna. Nijednu stavku ne ostavljajte praznom.", example: "Familienname: Hadžić | Vorname: Amina | Geburtsdatum: 15.03.1990 | Geburtsort: Sarajevo | Geschlecht: W | Staatsangehörigkeit: Bosnien und Herzegowina" },
          ],
        },
        {
          field: "Adresa (Anschrift)",
          instruction: "Unesite potpunu prijavljenu adresu u Njemačkoj.",
          cards: [
            { whatToWrite: "Ulica, kućni broj, poštanski broj, grad/mjesto, država (Deutschland). Mora se poklapati sa prijavom prebivališta (Meldebescheinigung).", whereToFind: "Potvrda o prijavi prebivališta (Anmeldebestätigung) koju ste dobili na Bürgeramt-u.", format: "Ulica i broj u jednom redu. PLZ (5 cifara) + grad. Primjer: Musterstraße 12, 10115 Berlin, Deutschland", commonMistakes: "Adresa ne odgovara prijavi — ako ste se preselili, prvo ažurirajte prijavu na Bürgeramt, pa tek onda podnosite zahtjev. Zaboravljen kućni broj ili poštanski broj.", whenToLeaveEmpty: "Nikada. Adresa je obavezna.", example: "Anschrift: Berliner Str. 42, 60311 Frankfurt am Main, Deutschland" },
          ],
        },
        {
          field: "Bračni status (Familienstand)",
          instruction: "Označite trenutni bračni status zaokruživanjem odgovarajuće opcije.",
          cards: [
            { whatToWrite: "Zaokružite jednu opciju: ledig (neoženjen/neudata), verheiratet (u braku), geschieden (razveden/a), verwitwet (udovac/udovica), dauernd getrennt lebend (trajno razdvojeni), eingetragene Lebenspartnerschaft (registrovano partnerstvo).", whereToFind: "Vaš lični status. Ako ste u braku — vjenčani list. Ako ste razvedeni — presuda o razvodu.", format: "Zaokružiti ili označiti X pored tačne opcije. Samo jedna opcija.", commonMistakes: "Označavanje 'dauernd getrennt lebend' ako ste samo privremeno na različitim adresama (npr. zbog posla). To se odnosi samo na trajnu namjeru razdvajanja. Neoznačavanje statusa uopšte.", whenToLeaveEmpty: "Nikada. Obavezno polje.", example: "☒ verheiratet" },
          ],
        },
        {
          field: "Podaci o bračnom partneru / životnom partneru",
          instruction: "Steuer-ID, ime, datum rođenja, državljanstvo, spol i eventualno druga adresa partnera.",
          cards: [
            { whatToWrite: "Steuer-ID partnera (11 cifara), prezime, ime, datum rođenja, državljanstvo, spol, djevojačko prezime. Ako partner živi na drugoj adresi — navesti i tu adresu.", whereToFind: "Partnerov/partneričin pasoš + Steuer-ID pismo. Ako ima drugu adresu — iz prijave prebivališta.", format: "Isti format kao za podnosioca: prezime i ime kao u pasošu, datum DD.MM.YYYY, Steuer-ID 11 cifara.", commonMistakes: "Neupisivanje podataka o partneru kada živite zajedno — čak i ako niste u braku, ako je partner biološki roditelj djeteta, podatke treba unijeti. Zaboravljen Steuer-ID partnera.", whenToLeaveEmpty: "Ostavite prazno SAMO ako: nemate partnera (ledig), ste razvedeni i ne živite sa drugim roditeljem djeteta, ili nema drugog poznatog roditelja.", example: "Steuer-ID: 82 716 054 321 | Familienname: Hadžić | Vorname: Emir | Geburtsdatum: 22.07.1988 | Staatsangehörigkeit: Bosnien und Herzegowina | Geschlecht: M" },
          ],
        },
        {
          field: "Način isplate (Zahlungsweg)",
          instruction: "Unesite IBAN, BIC i ko je vlasnik računa.",
          cards: [
            { whatToWrite: "IBAN (DE + 20 cifara), BIC banke, i označiti da li je vlasnik računa podnosilac zahtjeva ili druga osoba. Ako druga osoba — upisati njeno ime.", whereToFind: "Izvod iz banke, banking aplikacija, ili kartica računa. IBAN počinje sa DE za njemačke račune.", format: "IBAN: DE89 3704 0044 0532 0130 00 (s razmacima ili bez). BIC: 8 ili 11 znakova (npr. COBADEFFXXX).", commonMistakes: "Upisivanje računa treće osobe koja NIJE podnosilac i nije partner — Kindergeld se može isplatiti samo na račun podnosioca ili na račun za koji postoji ovlaštenje. Pogrešan IBAN (jedna cifra pogrešno = isplata neuspješna).", whenToLeaveEmpty: "Nikada. Bez bankovnih podataka nema isplate.", example: "IBAN: DE89 3704 0044 0532 0130 00 | BIC: COBADEFFXXX | Kontoinhaber: ☒ antragstellende Person" },
          ],
        },
        {
          field: "Podaci o djeci",
          instruction: "Navedite svu djecu za koju već primate Kindergeld i drugu djecu koja žive u drugom domaćinstvu.",
          cards: [
            { whatToWrite: "Za svako dijete: ime, prezime (ako je različito od vašeg), datum rođenja, spol, kod koje Familienkasse i koji Kindergeldnummer. Za djecu za koju druga osoba prima Kindergeld: ime te osobe i njena Familienkasse.", whereToFind: "Postojeće rješenje o Kindergeld-u (Kindergeldbescheid) za djecu za koju već primate. Kindergeldnummer je na tom rješenju (format: xxxFKxxxxxx).", format: "Ime i prezime djeteta, datum DD.MM.YYYY, spol M/W/D, Kindergeldnummer.", commonMistakes: "Neupisivanje djece za koju DRUGA osoba prima Kindergeld — ovo je bitno jer redoslijed djece utiče na visinu. Zaboravljanje unijeti svu djecu.", whenToLeaveEmpty: "Ostavite prazno samo ako nemate drugu djecu osim one za koju sada podnosite zahtjev i za koju prilažete Anlage Kind.", example: "Vorname: Lejla | Geburtsdatum: 10.05.2020 | Geschlecht: W | Familienkasse: Familienkasse Bayern Süd | KG-Nr: 123FK456789" },
          ],
        },
        {
          field: "Potpis i izjava (Unterschrift)",
          instruction: "Potpišite zahtjev. Ako ste u braku/partnerstvu, neka i partner potpiše saglasnost.",
          cards: [
            { whatToWrite: "Datum i vlastoručni potpis podnosioca. Na drugom mjestu: datum i potpis bračnog partnera/životnog partnera koji se slaže da VI primate Kindergeld.", whereToFind: "Nije potreban nikakav dokument — samo vaš potpis.", format: "Datum u formatu DD.MM.YYYY + čitljiv potpis. Oba potpisa ako ste u braku.", commonMistakes: "Zaboravljen potpis — najčešći razlog za vraćanje zahtjeva! Potpis partnera nedostaje, a živite zajedno. Potpis ne odgovara imenu (npr. potpisan nadimak).", whenToLeaveEmpty: "Potpis podnosioca je UVIJEK obavezan. Potpis partnera ostaviti prazno samo ako: niste u braku/partnerstvu, ili partner ne živi u istom domaćinstvu, ili se ne možete dogovoriti (u tom slučaju obavijestite Familienkasse).", example: "Datum: 15.01.2025 | Unterschrift: [Amina Hadžić] | Datum Ehepartner: 15.01.2025 | Unterschrift: [Emir Hadžić]" },
          ],
        },
      ],
      en: [
        { field: "Tax ID (Steuer-ID)", instruction: "Enter your 11-digit tax identification number." },
        { field: "Personal details", instruction: "Last name, first name, date of birth, place of birth, gender, nationality." },
        { field: "Address", instruction: "Full registered address in Germany." },
        { field: "Marital status", instruction: "Check your current marital status." },
        { field: "Spouse / partner details", instruction: "Tax ID, name, date of birth, nationality of spouse/partner." },
        { field: "Payment details", instruction: "IBAN, BIC, and account holder." },
        { field: "Children information", instruction: "List all children for whom you already receive Kindergeld and other own children." },
        { field: "Signature", instruction: "Sign the application. If married, spouse should also sign." },
      ],
    },
    documents: {
      de: ["Geburtsurkunde des Kindes", "Meldebescheinigung", "Steuer-ID (Antragsteller + Kind)", "Aufenthaltstitel (bei Nicht-EU-Bürgern)", "Ggf. Schulbescheinigung (ab 18 Jahre)", "Anlage Kind (KG1-AnlKi) für jedes Kind"],
      bs: ["Rodni list djeteta (Geburtsurkunde)", "Potvrda o prijavi prebivališta (Meldebescheinigung)", "Porezni ID podnosioca i djeteta (Steuer-ID)", "Boravišna dozvola (za ne-EU državljane)", "Potvrda škole/fakulteta (ako dijete ima 18+ godina)", "Prilog Dijete (Anlage Kind KG1-AnlKi) — za svako dijete posebno"],
      en: ["Child's birth certificate", "Registration certificate", "Tax ID (applicant + child)", "Residence permit (non-EU citizens)", "School/university certificate (if child 18+)", "Child Attachment (Anlage Kind) for each child"],
    },
    processingTime: { de: "4–6 Wochen", bs: "4–6 sedmica", en: "4–6 weeks" },
    commonMistakes: {
      de: ["Steuer-ID des Kindes vergessen", "Anlage Kind nicht beigefügt", "Unterschrift fehlt", "Bankverbindung eines Dritten angegeben", "Steuernummer statt Steuer-ID eingetragen"],
      bs: [
        "Zaboravljen porezni ID djeteta (Steuer-ID) — bez toga zahtjev ne može biti obrađen",
        "Prilog Dijete (Anlage Kind) nije priložen — za SVAKO dijete mora biti poseban prilog",
        "Nedostaje potpis podnosioca ili bračnog partnera",
        "Navedeni bankovni podaci treće osobe umjesto vlastiti račun",
        "Upisan Steuernummer umjesto Steuer-ID (različiti brojevi!)",
        "Adresa ne odgovara prijavi prebivališta",
      ],
      en: ["Missing child's tax ID", "Child attachment not included", "Missing signature", "Third-party bank details provided", "Tax number instead of tax ID entered"],
    },
    officialPdf: "https://www.arbeitsagentur.de/datei/kg1-antrag-kindergeld_ba036550.pdf",
    onlineLink: "https://www.arbeitsagentur.de/familie-und-kinder/kindergeld-beantragen",
  },
  {
    slug: "kinderzuschlag",
    category: "familie",
    title: { de: "Kinderzuschlag", bs: "Dodatak za djecu (Kinderzuschlag)", en: "Child Supplement (Kinderzuschlag)" },
    who: {
      de: "Eltern mit niedrigem Einkommen, die Kindergeld beziehen und nicht auf Bürgergeld angewiesen sind.",
      bs: "Roditelji sa niskim primanjima koji primaju Kindergeld i ne zavise od Bürgergeld-a.",
      en: "Low-income parents receiving child benefit who don't depend on Bürgergeld.",
    },
    authority: { de: "Familienkasse", bs: "Familienkasse", en: "Family Benefits Office" },
    formName: { de: "Antrag auf Kinderzuschlag (KiZ 1)", bs: "Zahtjev za Kinderzuschlag (KiZ 1)", en: "Application for Child Supplement (KiZ 1)" },
    steps: {
      de: [
        { field: "Angaben zu meiner Person", instruction: "Persönliche Daten des Antragstellers: Name, Geburtsdatum, Geburtsname, Adresse, Geschlecht, Staatsangehörigkeit, Telefon, Familienstand." },
        { field: "Angaben zum Partner", instruction: "Daten des Partners/der Partnerin: Name, Geburtsname, Staatsangehörigkeit, Geburtsdatum." },
        { field: "Kontoverbindung", instruction: "IBAN, BIC und Kontoinhaber angeben." },
        { field: "Kinder im Haushalt", instruction: "Liste aller Kinder im Haushalt, für die KiZ beantragt wird: Name und Geburtsdatum." },
        { field: "Kinder nicht ständig im Haushalt", instruction: "Kinder aus Punkt 4 die nicht dauerhaft im Haushalt leben: Name, Grund und Dauer der Abwesenheit." },
        { field: "Weitere Kinder unter 25", instruction: "Zusätzliche Kinder unter 25 ohne Kindergeld, Angaben zur Anwesenheit im Haushalt." },
        { field: "Weitere Personen im Haushalt", instruction: "Andere Haushaltsmitglieder: Name, Geburtsdatum, Verwandtschaftsverhältnis." },
        { field: "Erklärung und Unterschrift", instruction: "Unterschrift, Datum, ggf. Unterschrift des zweiten Antragstellers." },
      ],
      bs: [
        {
          field: "Lični podaci podnosioca zahtjeva",
          instruction: "Unesite sve lične podatke: prezime, ime, datum rođenja, djevojačko prezime, adresu, spol, državljanstvo, telefon i bračni status.",
          cards: [
            {
              whatToWrite: "Prezime, ime, datum rođenja (dan, mjesec, godina), djevojačko prezime (Geburtsname), ulica i kućni broj, poštanski broj i grad, spol (muški/ženski/diverse), državljanstvo, broj telefona/mobitela, bračni status (ledig, verheiratet, geschieden, verwitwet, getrennt lebend, eingetragene Lebenspartnerschaft).",
              whereToFind: "Lična karta ili pasoš za ime i datum rođenja. Prijava prebivališta (Meldebescheinigung) za adresu. Za državljanstvo — pasoš. Za bračni status — vjenčani list ili sudska presuda o razvodu.",
              format: "Datum: DD.MM.YYYY. Prezime velikim ili malim štampanim slovima. Adresa: ulica + kućni broj u jedno polje, PLZ + grad u drugo. Telefon sa pozivnim brojem (npr. 0170 1234567).",
              commonMistakes: "Pogrešan ili nepotpun datum rođenja. Djevojačko prezime izostavljeno iako je promijenjeno nakon braka. Stara adresa umjesto trenutne. Bračni status ne odgovara stvarnom stanju (npr. razdvojeni ali ne prijavljen kao 'getrennt lebend').",
              whenToLeaveEmpty: "Djevojačko prezime (Geburtsname) ostaviti prazno samo ako nikada nije mijenjano prezime. Polje za telefon je dobrovoljno ali preporučljivo.",
              example: "Prezime: Hadžić | Ime: Amina | Rođena: 15.03.1990 | Geburtsname: Delić | Adresa: Berliner Str. 42, 80331 München | Spol: weiblich | Državljanstvo: bosnisch-herzegowinisch | Tel: 0176 9876543 | Status: verheiratet",
            },
          ],
        },
        {
          field: "Podaci o partneru/partnerici",
          instruction: "Unesite podatke o bračnom/životnom partneru. Ovaj dio se popunjava samo ako imate partnera u zajedničkom domaćinstvu.",
          cards: [
            {
              whatToWrite: "Prezime, djevojačko prezime (Geburtsname), ime, državljanstvo i datum rođenja partnera/partnerice.",
              whereToFind: "Lična karta ili pasoš partnera za ime i datum. Vjenčani list za djevojačko prezime. Pasoš za državljanstvo.",
              format: "Datum rođenja: DD.MM.YYYY. Državljanstvo na njemačkom (npr. kroatisch, serbisch, bosnisch-herzegowinisch).",
              commonMistakes: "Prezime partnera ne odgovara onome u dokumentima. Državljanstvo napisano na bosanskom umjesto na njemačkom. Partner nije prijavljen na istoj adresi — mora biti ista adresa.",
              whenToLeaveEmpty: "Kompletno ostaviti prazno ako niste u braku, registrovanom partnerstvu ili zajedničkom domaćinstvu sa partnerom.",
              example: "Prezime: Hadžić | Geburtsname: Kovačević | Ime: Edin | Državljanstvo: bosnisch-herzegowinisch | Rođen: 22.07.1988",
            },
          ],
        },
        {
          field: "Bankovni podaci (Kontoverbindung)",
          instruction: "Unesite IBAN, BIC i ime vlasnika računa na koji će se uplaćivati Kinderzuschlag.",
          cards: [
            {
              whatToWrite: "IBAN (International Bank Account Number), BIC (Bank Identifier Code) i puno ime vlasnika računa (Kontoinhaber).",
              whereToFind: "IBAN i BIC nalaze se na bankovnoj kartici, u online bankingu ili na izvodu iz banke. Ime vlasnika mora odgovarati osobi na čije ime je račun otvoren.",
              format: "IBAN: DE + 20 cifara (ukupno 22 znaka), bez razmaka. BIC: 8 ili 11 znakova (slova i brojevi). Ime: onako kako je registrovano u banci.",
              commonMistakes: "IBAN sa greškom u jednoj cifri — isplata ne prolazi. BIC izostavljen za strane banke. Ime vlasnika računa ne odgovara podnosiocu ili partneru — račun mora pripadati jednom od njih.",
              whenToLeaveEmpty: "Nijedno polje ne smije ostati prazno. Bez bankovnih podataka zahtjev neće biti obrađen.",
              example: "IBAN: DE89370400440532013000 | BIC: COBADEFFXXX | Kontoinhaber: Amina Hadžić",
            },
          ],
        },
        {
          field: "Djeca u domaćinstvu za koja se traži KiZ",
          instruction: "Navedite svu djecu koja žive u vašem domaćinstvu i za koju tražite Kinderzuschlag. Za svako dijete morate priložiti Anlage Kind (KiZ 1-AnK).",
          cards: [
            {
              whatToWrite: "Za svako dijete: prezime, ime i datum rođenja. Ovo se odnosi na svu djecu za koju primite ili ste podnijeli zahtjev za Kindergeld.",
              whereToFind: "Rodni list djeteta (Geburtsurkunde) za ime i datum rođenja. Rješenje o Kindergeldu (Kindergeld-Bescheid) za provjeru broja djece.",
              format: "Datum rođenja: DD.MM.YYYY. Ako je više djece, svako se navodi u zasebni red tabele na formularu.",
              commonMistakes: "Izostavljen jedno ili više djece — sva djeca u domaćinstvu moraju biti navedena. Datum rođenja djeteta pogrešan. Priložen Anlage Kind samo za neku djecu, a ne za svu.",
              whenToLeaveEmpty: "Ako imate samo jedno dijete, preostale redove ostaviti praznim. Nikad ne izostavljajte dijete koje živi s vama.",
              example: "1. Hadžić, Lejla, 10.05.2015 | 2. Hadžić, Amar, 23.11.2018 | 3. (prazno)",
            },
          ],
        },
        {
          field: "Djeca koja ne žive stalno u domaćinstvu",
          instruction: "Ako neko od djece iz prethodnog koraka ne živi stalno kod vas, ovdje navedite razlog i trajanje odsustva.",
          cards: [
            {
              whatToWrite: "Ime djeteta, razlog zašto ne živi stalno u domaćinstvu (npr. živi kod drugog roditelja, internat, bolnički tretman) i period odsustva (od – do).",
              whereToFind: "Sudska odluka o skrbništvu, potvrda internata ili bolnička dokumentacija.",
              format: "Ime djeteta iz prethodnog koraka. Razlog: slobodan tekst. Period: DD.MM.YYYY – DD.MM.YYYY ili 'od DD.MM.YYYY do daljnjeg'.",
              commonMistakes: "Dijete nije navedeno u koraku 4 ali je navedeno ovdje. Period odsustva nije preciziran. Razlog nije dovoljno jasan — navedite konkretan razlog.",
              whenToLeaveEmpty: "Kompletno prazno ako sva djeca iz koraka 4 žive stalno u vašem domaćinstvu.",
              example: "Lejla Hadžić — živi kod oca vikendom, svaki drugi vikend od 01.01.2024 do daljnjeg.",
            },
          ],
        },
        {
          field: "Ostala djeca do 25 godina",
          instruction: "Navedite djecu mlađu od 25 godina za koju NE primate Kindergeld, ali žive u vašem domaćinstvu ili su vaša biološka/usvojena djeca.",
          cards: [
            {
              whatToWrite: "Ime, datum rođenja, da li dijete živi u domaćinstvu (ja/nein), i razlog zašto ne primate Kindergeld za to dijete.",
              whereToFind: "Rodni list djeteta. Eventualno rješenje o obustavi Kindergelda ili potvrda o zaposlenju djeteta.",
              format: "Ime i datum u isti format kao korak 4. Razlog: slobodan tekst (npr. 'dijete zaposleno na puno radno vrijeme', 'Kindergeld odobren drugom roditelju').",
              commonMistakes: "Zaboravljeno dijete iz prethodnog braka/partnerstva. Pogrešno navedeno da dijete živi u domaćinstvu kad zapravo ne živi.",
              whenToLeaveEmpty: "Prazno ako nemate drugu djecu do 25 godina osim onih iz koraka 4.",
              example: "Kovačević, Mirza, 03.08.2001, živi u domaćinstvu: ja, razlog bez KG: zaposlen na puno radno vrijeme",
            },
          ],
        },
        {
          field: "Ostale osobe u domaćinstvu",
          instruction: "Navedite sve ostale osobe koje žive u vašem domaćinstvu (osim vas, partnera i djece već navedenih).",
          cards: [
            {
              whatToWrite: "Ime, datum rođenja i srodstvo (Verwandtschaftsverhältnis) svake osobe — npr. roditelj podnosioca, punoljetno dijete koje ne studira, cimerka itd.",
              whereToFind: "Prijava prebivališta (Meldebescheinigung) za provjeru ko je prijavljen na adresi. Lični dokumenti osoba.",
              format: "Ime i datum: standardno. Srodstvo: njemački termin — npr. Mutter, Schwiegervater, Mitbewohner, erwachsenes Kind.",
              commonMistakes: "Osoba prijavljena na istoj adresi ali nije navedena — Familienkasse provjerava prijavu. Netačno srodstvo navedeno.",
              whenToLeaveEmpty: "Prazno ako u domaćinstvu žive samo vi, partner i djeca koja su već navedena.",
              example: "Delić, Fatima, 12.04.1958, Mutter der Antragstellerin",
            },
          ],
        },
        {
          field: "Izjava i potpis (Erklärung und Unterschrift)",
          instruction: "Pročitajte izjavu, potpišite i upišite datum. Ako je zahtjev zajednički (oba roditelja), potpisuju oboje.",
          cards: [
            {
              whatToWrite: "Datum i potpis podnosioca. Ako postoji drugi podnosilac (partner), i on/ona potpisuje u predviđeno polje.",
              whereToFind: "Ništa ne treba tražiti — potpis je vaš lični. Datum je dan potpisivanja.",
              format: "Datum: DD.MM.YYYY. Potpis: ručno, čitko, plavom ili crnom olovkom.",
              commonMistakes: "Nedostaje potpis — nepotpisan formular se automatski odbija. Potpisan samo jedan roditelj kad su oba navedena kao podnosioci. Datum potpisa stariji od 3 mjeseca.",
              whenToLeaveEmpty: "Polje za drugog podnosioca ostaviti prazno samo ako zahtjev podnosi jedan roditelj bez partnera.",
              example: "Datum: 15.03.2025 | Potpis: Amina Hadžić | Drugi podnosilac: Edin Hadžić",
            },
          ],
        },
      ],
      en: [
        { field: "Personal data of applicant", instruction: "Full personal details: surname, first name, date of birth, birth name, address, gender, nationality, phone, marital status." },
        { field: "Partner details", instruction: "Surname, birth name, first name, nationality, date of birth of the partner." },
        { field: "Bank details", instruction: "IBAN, BIC, and account holder name." },
        { field: "Children in household", instruction: "List all children in the household for whom KiZ is requested: name and date of birth." },
        { field: "Children not permanently in household", instruction: "Children from step 4 not living permanently in the household: name, reason, and duration." },
        { field: "Other children under 25", instruction: "Additional children under 25 without Kindergeld, household presence details." },
        { field: "Other household members", instruction: "Other persons in the household: name, date of birth, relationship." },
        { field: "Declaration and signature", instruction: "Signature, date, optional second applicant signature." },
      ],
    },
    documents: {
      de: [
        "Anlage Antragsteller/Partner (KiZ 1-AnA) — Pflicht",
        "Anlage Kind (KiZ 1-AnK) — für jedes Kind",
        "Einkommensnachweise (letzte 6 Monate)",
        "Mietvertrag + letzte Nebenkostenabrechnung",
        "Kontoauszüge (3 Monate)",
        "Kindergeld-Bescheid",
      ],
      bs: [
        "Anlage Antragsteller/Partner (KiZ 1-AnA) — obavezno",
        "Anlage Kind (KiZ 1-AnK) — za svako dijete",
        "Dokaz o primanjima (zadnjih 6 mjeseci)",
        "Ugovor o najmu + zadnji obračun režija",
        "Izvodi iz banke (3 mjeseca)",
        "Rješenje o Kindergeld-u",
      ],
      en: [
        "Anlage Antragsteller/Partner (KiZ 1-AnA) — mandatory",
        "Anlage Kind (KiZ 1-AnK) — for each child",
        "Income proof (last 6 months)",
        "Rental contract + last utility bill",
        "Bank statements (3 months)",
        "Kindergeld notice",
      ],
    },
    processingTime: { de: "6–8 Wochen", bs: "6–8 sedmica", en: "6–8 weeks" },
    commonMistakes: {
      de: [
        "Anlage Antragsteller/Partner (KiZ 1-AnA) fehlt",
        "Anlage Kind nicht für jedes Kind beigefügt",
        "Einkommensnachweise unvollständig (alle 6 Monate nötig)",
        "Falsche IBAN angegeben",
        "Partnerdaten fehlen obwohl Partner im Haushalt lebt",
      ],
      bs: [
        "Nedostaje Anlage Antragsteller/Partner (KiZ 1-AnA)",
        "Anlage Kind nije priložen za svako dijete",
        "Nepotpuni dokazi o primanjima (svih 6 mjeseci potrebno)",
        "Pogrešan IBAN",
        "Podaci o partneru nedostaju iako partner živi u domaćinstvu",
      ],
      en: [
        "Missing Anlage Antragsteller/Partner (KiZ 1-AnA)",
        "Anlage Kind not attached for every child",
        "Incomplete income proof (all 6 months needed)",
        "Wrong IBAN",
        "Partner data missing although partner lives in household",
      ],
    },
    officialPdf: "https://www.arbeitsagentur.de/datei/kiz1-antrag_ba036540.pdf",
    onlineLink: "https://www.arbeitsagentur.de/familie-und-kinder/kinderzuschlag",
  },
  {
    slug: "elterngeld",
    category: "familie",
    title: { de: "Elterngeld", bs: "Roditeljski dodatak (Elterngeld)", en: "Parental Allowance (Elterngeld)" },
    who: {
      de: "Anspruch haben Eltern, die: (1) ihr Kind nach der Geburt selbst betreuen und erziehen, (2) mit dem Kind in einem gemeinsamen Haushalt leben, (3) ihren Wohnsitz oder gewöhnlichen Aufenthalt in Deutschland haben, (4) nicht mehr als 32 Stunden pro Woche arbeiten. Gilt für alle Erwerbsformen: Arbeitnehmer, Beamte, Selbständige, Arbeitslose, Studierende, Hausfrauen/-männer, Minijobber, gemischte Einkünfte. Auch für Adoptivkinder, Stiefkinder (in Ausnahmefällen Enkelkinder bei Behinderung/Tod der Eltern). Pflegeeltern sind NICHT berechtigt. Ausländische Eltern: je nach Aufenthaltstitel ggf. zusätzliche Voraussetzungen. Kind darf auch eine Kita/Tagesmutter besuchen – Anspruch bleibt bestehen. Einkommensgrenze: 200.000 € zu versteuerndes Einkommen im Kalenderjahr vor der Geburt (Geburten ab 01.04.2024), 175.000 € (Geburten ab 01.04.2025) – gilt einheitlich für Paare, Alleinerziehende und getrennt Erziehende. Gesetzliche Änderungen ab 01.04.2024: Gleichzeitiger Bezug von BasisElterngeld beider Elternteile ist nur noch in einem der ersten 12 Lebensmonate möglich (Ausnahmen: Mehrlingsgeburten, Frühgeburten mind. 6 Wochen vor ET, Behinderung des Kindes/Geschwisterkindes). Lebensmonate mit Mutterschaftsleistungen gelten als BasisElterngeld-Monate.",
      bs: "Pravo imaju roditelji koji: (1) nakon porođaja sami brinu o djetetu i odgajaju ga, (2) žive s djetetom u zajedničkom domaćinstvu, (3) imaju prebivalište ili uobičajeni boravak u Njemačkoj, (4) rade maksimalno 32 sata sedmično. Važi za sve oblike zaposlenja: zaposlenici, državni službenici, samozaposleni, nezaposleni, studenti, domaćice/domaćini, minijobberi, mješoviti prihodi. Također za usvojenu djecu, pastorčad (u izuzetnim slučajevima unučad ako su roditelji invalidi/umrli). Hranitelji (Pflegeeltern) NEMAJU pravo. Strani roditelji: dodatni uslovi zavisno od boravišne dozvole. Dijete može ići u vrtić/Tagesmutter – pravo ostaje. Granica prihoda: 200.000 € oporezivih prihoda u kalendarskoj godini prije porođaja (porođaji od 01.04.2024), 175.000 € (porođaji od 01.04.2025) – jednako za parove, samohrane roditelje i odvojeno živeće roditelje. Zakonske promjene od 01.04.2024: Istovremeno primanje BasisElterngeld-a oba roditelja moguće samo u jednom od prvih 12 mjeseci života (izuzeci: višestruki porođaj, prijevremeni porođaj min. 6 sedmica prije termina, invaliditet djeteta/brata/sestre). Mjeseci sa Mutterschaftsleistungen računaju se kao BasisElterngeld mjeseci.",
      en: "Eligible parents must: (1) care for and raise their child after birth, (2) live with the child in a shared household, (3) reside in Germany, (4) work max. 32h/week. Applies to all employment types: employees, civil servants, self-employed, unemployed, students, homemakers, minijobbers, mixed income. Also for adopted children, stepchildren (in exceptional cases grandchildren if parents are disabled/deceased). Foster parents are NOT eligible. Foreign parents: additional requirements depending on residence permit. Child may attend daycare – eligibility remains. Income cap: €200,000 taxable income in calendar year before birth (births from 01.04.2024), €175,000 (births from 01.04.2025) – applies equally to couples, single parents, and separated parents. From 01.04.2024: simultaneous BasisElterngeld for both parents only in one of first 12 life months (exceptions: multiple births, premature births 6+ weeks early, disability of child/sibling). Months with maternity benefits count as BasisElterngeld months.",
    },
    authority: { de: "Elterngeldstelle des jeweiligen Bundeslandes", bs: "Služba za roditeljski dodatak savezne države (Elterngeldstelle)", en: "Parental Allowance Office of the respective federal state" },
    formName: {
      de: "Antrag auf Elterngeld (landesspezifisch) – Zuständige Elterngeldstelle über die Suche „Beratung vor Ort" auf familienportal.de ermitteln. Antragsformulare des jeweiligen Bundeslandes auf familienportal.de (Rubrik „Antragsformulare") herunterladen. Formulare auch erhältlich bei: Elterngeldstelle, Gemeindeverwaltungen, Krankenkassen, Krankenhäuser mit Geburtenstation. WICHTIG: Antrag erst NACH der Geburt möglich, max. 3 Monate rückwirkend. Pro Elternteil nur EIN Antrag pro Kind (auch bei Mehrlingen). Anderer Elternteil muss mitunterschreiben. Einreichung: Per Post an die zuständige Dienststelle ODER digital über den Service ElterngeldDigital (in allen Bundesländern verfügbar). Online mit Registrierung: schnellere Bearbeitung, weniger Rückfragen, gezielte Antragsführung, individuelle Checkliste, Dokumentenupload, Vorabausfüllen 6 Monate vor Geburt, Speicherfunktion, Druckservice, Sachstandsauskunft & Zahlungsinfo, Änderungsmitteilungen online, elektronische Unterschrift. Online ohne Registrierung: schnellere Bearbeitung, gezielte Antragsführung, individuelle Checkliste, Druckservice, Hilfefunktionen.",
      bs: "Zahtjev za roditeljski dodatak (zavisi od savezne države) – Nadležnu Elterngeldstelle pronaći putem pretrage „Beratung vor Ort" na familienportal.de. Formulare savezne države preuzeti na familienportal.de (rubrika „Antragsformulare"). Formulari dostupni i na: Elterngeldstelle, općinskim upravama (Gemeindeverwaltungen), zdravstvenim kasama (Krankenkassen), bolnicama sa porodilištem. VAŽNO: Zahtjev moguć tek NAKON porođaja, retroaktivno max. 3 mjeseca. Jedan zahtjev po roditelju po djetetu (i kod blizanaca). Drugi roditelj mora supotpisati. Podnošenje: poštom na adresu nadležne službe ILI digitalno putem servisa ElterngeldDigital (dostupan u svim saveznim državama). Online sa registracijom: brža obrada, manje pitanja, pametno vođenje, checklista, upload dokumenata, popunjavanje 6 mj. prije porođaja, čuvanje/nastavak, print-servis, uvid u status i isplate, online prijava promjena, elektronski potpis. Online bez registracije: brža obrada, pametno vođenje, checklista, print-servis, pomoćne funkcije.",
      en: "Application for Parental Allowance (state-specific) – Find your responsible Elterngeldstelle via the 'Beratung vor Ort' search on familienportal.de. Download your state's application forms on familienportal.de ('Antragsformulare' section). Forms also available at: Elterngeldstelle, municipal offices, health insurance offices, hospitals with maternity wards. IMPORTANT: Application only possible AFTER birth, max. 3 months retroactive. Only ONE application per parent per child (even for multiples). Other parent must co-sign. Submission: By post OR digitally via ElterngeldDigital service (available in all federal states). Online with registration: faster processing, fewer queries, guided application, checklist, document upload, pre-filling 6 months before birth, save & resume, print service, status tracking, online change notifications, electronic signature. Online without registration: faster processing, guided application, checklist, print service, help functions.",
    },
    steps: {
      de: [
        { field: "Angaben zum Antragsteller", instruction: "Persönliche Daten: Name, Geburtsdatum, Steuer-ID, Anschrift, Staatsangehörigkeit, Familienstand, Steuerklasse eintragen." },
        { field: "Angaben zum Kind", instruction: "Name, Geburtsdatum, Geburtsort, Geschlecht des Kindes. Kindergeld-Nummer angeben falls vorhanden." },
        { field: "Wahl der Elterngeld-Variante", instruction: "Basiselterngeld (65% Netto, max. 1.800 €/Monat, max. 14 Monate), ElterngeldPlus (halber Betrag, doppelte Dauer, max. 900 €) oder Partnerschaftsbonus (4 Monate extra bei 24-32h/Woche) wählen. Elterngeld ist steuerfrei, unterliegt aber dem Progressionsvorbehalt – Steuererklärung ist Pflicht!" },
        { field: "Lebensmonate planen", instruction: "Bezugsmonate auf beide Elternteile verteilen. Mindestens 2 Partnermonate. Basiselterngeld nur in ersten 14 Lebensmonaten. Danach nur ElterngeldPlus/Partnerschaftsbonus bis max. 32. Lebensmonat. Nach LM14 keine Unterbrechung mehr erlaubt!" },
        { field: "Einkommen vor Geburt", instruction: "Einkommensnachweise der letzten 12 Monate vor Geburt. Max. berücksichtigtes Netto: 2.770 €. Geringverdiener: unter 1.240 € → 65-67%, unter 1.000 € → bis 100%. Bei Selbständigen: letzter Steuerbescheid." },
        { field: "Erwerbstätigkeit während Bezug", instruction: "Geplante Arbeitszeit (max. 32h/Woche) und voraussichtliches Einkommen während des Bezugszeitraums angeben." },
        { field: "Bankverbindung und andere Leistungen", instruction: "IBAN, BIC eintragen. Mutterschaftsgeld, Bürgergeld, ALG I, Wohngeld angeben falls bezogen." },
        { field: "Erklärung und Unterschrift", instruction: "Beide Elternteile unterschreiben. Alle Anlagen beifügen. Nach Bescheid: Widerspruch innerhalb 1 Monat möglich. Änderungen für zukünftige Monate jederzeit, für vergangene Monate max. 3 Monate rückwirkend." },
      ],
      bs: [
        {
          field: "Lični podaci podnosioca zahtjeva",
          instruction: "Unesite sve lične podatke: prezime, ime, datum rođenja, Steuer-ID (porezni identifikacioni broj), adresu, državljanstvo, bračni status i poreznu klasu (Steuerklasse). Ovi podaci moraju odgovarati onima u poreznoj evidenciji.",
          cards: [
            {
              whatToWrite: "Prezime i ime (kao na ličnom dokumentu), datum rođenja (DD.MM.GGGG), Steuer-ID (11 cifara), adresa (ulica, kućni broj, poštanski broj, grad), državljanstvo, bračno stanje (ledig/verheiratet/geschieden/verwitwet), Steuerklasse (I-VI).",
              whereToFind: "Steuer-ID: Na poreskom rješenju (Steuerbescheid), platnim listama, ili zatražiti od Finanzamt. Steuerklasse: Na platnoj listi pod 'Steuerklasse'. Adresa: Mora odgovarati prijavljenoj adresi kod Einwohnermeldeamt.",
              format: "Ime: kako piše na ličnom dokumentu. Datum: DD.MM.GGGG. Steuer-ID: tačno 11 cifara bez razmaka. Steuerklasse: rimski ili arapski broj (I-VI ili 1-6).",
              commonMistakes: "Steuer-ID zamijenjen sa Steuernummer (to su dva različita broja). Steuerklasse ne odgovara platnoj listi. Prezime se razlikuje od onog u poreznoj evidenciji (npr. nakon vjenčanja nije ažurirano).",
              whenToLeaveEmpty: "Sva polja su obavezna. Steuerklase možete izostaviti samo ako niste bili zaposleni u posljednjih 12 mjeseci.",
              example: "Prezime: Hodžić. Ime: Amina. Datum rođenja: 15.03.1990. Steuer-ID: 12345678901. Adresa: Musterstraße 5, 80331 München. Državljanstvo: bosansko-hercegovačko. Bračno stanje: verheiratet. Steuerklasse: IV.",
            },
          ],
        },
        {
          field: "Podaci o djetetu",
          instruction: "Unesite podatke o djetetu za koje se traži Elterngeld: ime, datum i mjesto rođenja, spol. Ako već primate Kindergeld, upišite i Kindergeld-Nummer.",
          cards: [
            {
              whatToWrite: "Ime i prezime djeteta, datum rođenja (DD.MM.GGGG), mjesto rođenja, spol (männlich/weiblich/divers), Kindergeld-Nummer (ako postoji), redoslijed rođenja (ako blizanci).",
              whereToFind: "Svi podaci su na rodnom listu djeteta (Geburtsurkunde). Kindergeld-Nummer: Na rješenju o Kindergeldu (Kindergeldbescheid) ili na pismu Familienkasse.",
              format: "Datum: DD.MM.GGGG. Kindergeld-Nummer: format XXXFKxxxxx. Ime: tačno kao na rodnom listu.",
              commonMistakes: "Ime djeteta se razlikuje od onoga na rodnom listu. Kindergeld-Nummer izostavljen – to može usporiti obradu. Kod blizanaca: ne upisati redoslijed rođenja.",
              whenToLeaveEmpty: "Kindergeld-Nummer možete ostaviti prazno ako još niste podnijeli zahtjev za Kindergeld. Redoslijed rođenja samo kod višestrukih porođaja.",
              example: "Ime: Hodžić, Lana. Datum rođenja: 01.06.2025. Mjesto: München. Spol: weiblich. Kindergeld-Nr: 500FK12345.",
            },
          ],
        },
        {
          field: "Izbor vrste Elterngeld-a",
          instruction: "Postoje tri varijante Elterngeld-a. BasisElterngeld: 65% razlike neto prihoda prije i nakon porođaja, min. 300 €, max. 1.800 €/mjesec, max. u prvih 14 Lebensmonate. ElterngeldPlus: polovina BasisElterngeld-a ali duplo trajanje, min. 150 €, max. 900 €/mjesec – često povoljniji uz Teilzeit jer je 'Deckelungsbetrag' niži. Partnerschaftsbonus: 4 dodatna ElterngeldPlus-mjeseca za svakog roditelja ako oba rade 24-32h sedmično. Varijante se mogu kombinovati po mjesecima. VAŽNO: Elterngeld je oslobođen poreza ALI podliježe Progressionsvorbehalt – morate podnijeti Steuererklärung! Koristite Elterngeldrechner na familienportal.de za planiranje.",
          cards: [
            {
              whatToWrite: "Označite željenu varijantu za svaki Lebensmonat: BasisElterngeld (B), ElterngeldPlus (P), ili Partnerschaftsbonus (PB). Obratite pažnju na Geringverdiener-pravila: neto ispod 1.240 € → 65-67%, ispod 1.000 € → do 100% (raste 0,1% za svaka 2 € ispod 1.000). Maksimalni neto prihod koji se uzima u obzir: 2.770 € (čak i ako zarađujete više).",
              whereToFind: "Informacije o varijantama: familienportal.de ili elterngeld-digital.de. Elterngeldrechner na familienportal.de izračunava koja opcija je finansijski najpovoljnija za vašu situaciju. Besplatno savjetovanje: Elterngeldstelle.",
              format: "Označiti kućicu za odabranu varijantu. Kod kombinacije: za svaki Lebensmonat posebno navesti tip (B = Basis, P = Plus, PB = Partnerschaftsbonus).",
              commonMistakes: "Odabrati Basiselterngeld a planirati Teilzeit – ElterngeldPlus je tada često povoljniji (Deckelungsbetrag = pola teorijskog BasisElterngeld-a BEZ zarade → manji gubitak). Ne znati da se varijante mogu kombinovati. Partnerschaftsbonus: OBA roditelja moraju raditi 24-32h – ako jedan ne ispuni, gubi se bonus za oboje. Zaboraviti da je Steuererklärung obavezna zbog Progressionsvorbehalt.",
              whenToLeaveEmpty: "Nikad – morate odabrati barem jednu varijantu. ElterngeldPlus se uvijek može naknadno promijeniti u BasisElterngeld (retroaktivno), ali NE obrnuto za već isplaćene mjesece.",
              example: "Mjeseci 1-6: BasisElterngeld (majka, 1.200 €). Mjeseci 7-8: BasisElterngeld (otac – Partnermonate, 1.500 €). Mjeseci 9-14: ElterngeldPlus (majka, radi 20h, 600 €). Mjeseci 15-18: Partnerschaftsbonus (oba roditelja rade 28h, po 450 €).",
            },
          ],
        },
        {
          field: "Raspodjela mjeseci (Lebensmonate)",
          instruction: "Lebensmonate se računaju od dana rođenja djeteta, NE kalendarskih mjeseci (npr. rođen 15.06. → LM1 = 15.06.-14.07.). BasisElterngeld: samo u prvih 14 Lebensmonate, jedan roditelj max. 12 mjeseci, min. 2 Partnermonate. Nakon LM14: samo ElterngeldPlus ili Partnerschaftsbonus, max. do 32. Lebensmonat (2 godine i 8 mjeseci) – ali NEMA prekida nakon LM14 (ako prekinete, gubite preostale mjesece)! Istovremeni BasisElterngeld oba roditelja: računa se kao 2 potrošena mjeseca. Za porođaje od 01.04.2024: istovremeni BasisElterngeld samo u jednom od prvih 12 LM (izuzeci: Frühgeborene 6+ sedmica, blizanci, invaliditet). Mjeseci Mutterschaftsgeld = BasisElterngeld mjeseci (ne mogu se zamijeniti za ElterngeldPlus/Partnerschaftsbonus). Frühgeborene bonus: 6 sedmica ranije → +1, 8 sedmica → +2, 12 sedmica → +3, 16 sedmica → +4 dodatna BasisElterngeld mjeseca.",
          cards: [
            {
              whatToWrite: "Za svaki Lebensmonat (1-14 za Basis, do 32 za Plus/Bonus) upisati koji roditelj ga koristi i koju varijantu. Navesti od-do datum. Označiti Partnermonate. Kod Frühgeborenih: navesti koliko sedmica prije termina i zatražiti dodatne mjesece.",
              whereToFind: "Kalkulator Lebensmonate: familienportal.de. Lebensmonate se automatski računaju od datuma rođenja. Poslodavac mora potvrditi planirani period Elternzeit (Arbeitgeberbescheinigung). Mutterschaftsgeld period: potvrda od Krankenkasse.",
              format: "Period: DD.MM.GGGG – DD.MM.GGGG za svakog roditelja. Tabela po mjesecima (LM1, LM2... LM14 za Basis, do LM32 za Plus/Bonus). Svaki mjesec označen sa B/P/PB i imenom roditelja.",
              commonMistakes: "Brkanje Lebensmonate sa kalendarskim mjesecima – Lebensmonat počinje na dan rođenja! Zaboraviti Partnermonate (min. 2) – bez njih gubite 2 mjeseca. Planirati prekid nakon LM14 – nakon LM14 NEMA više pauze! Istovremeni BasisElterngeld od 01.04.2024 u više od 1 mjeseca (osim izuzetaka). Ne znati da se istovremeni BasisElterngeld računa kao 2 mjeseca.",
              whenToLeaveEmpty: "Ako samo jedan roditelj koristi Elterngeld, upisujete samo za njega (max. 12 Basismonate bez Partnermonate).",
              example: "Majka: LM1-LM8 BasisElterngeld (15.06.-14.02., LM1-2 su Mutterschaftsgeld-mjeseci). Otac: LM3 BasisElterngeld istovremeno (dozvoljeno 1 mjesec). Otac: LM9-LM10 Partnermonate. Majka: LM11-LM18 ElterngeldPlus. LM19-LM22: Partnerschaftsbonus (oba roditelja 28h). Frühgeborenes 8 sedmica ranije: +2 dodatna BasisElterngeld mjeseca.",
            },
          ],
        },
        {
          field: "Primanja prije porođaja (Einkommen vor Geburt)",
          instruction: "Navedite sva primanja iz 12 mjeseci prije porođaja (Bemessungszeitraum). Maksimalni neto prihod koji se uzima u obzir za izračun: 2.770 € (čak i ako zarađujete više → max. BasisElterngeld = 1.800 €). Geringverdiener pravila: neto 1.200-1.240 € → 65-67%, neto ispod 1.000 € → do 100% (procenat raste za 0,1% za svaka 2 € ispod 1.000). Entgeltersatzleistungen (Krankengeld, ALG I) u Bemessungszeitraum: ti mjeseci se izuzimaju i zamjenjuju ranijim mjesecima. Zaposlene majke: 12 platnih listi PRIJE početka Mutterschutz-a. Zaposleni očevi: 12 platnih listi prije porođaja. Samozaposleni: posljednji Steuerbescheid. Državni službenici/vojnici: potvrde o Dienstbezüge. Privatno osigurane majke: potvrda o Krankentagegeld.",
          cards: [
            {
              whatToWrite: "Bruto i neto mjesečna primanja za 12 mjeseci. Majke-zaposlenice: 12 mjeseci PRIJE Mutterschutz-a. Očevi-zaposlenici: 12 mjeseci prije porođaja. Samozaposleni: godišnji prihod iz Steuerbescheida. Državni službenici: Dienstbezüge + Zuschüsse. Ako ste mijenjali Steuerklasse: datum promjene (min. 7 mjeseci prije porođaja).",
              whereToFind: "Platne liste (Gehaltsabrechnungen) – razlikujte period za majke (prije Mutterschutz) i očeve (prije porođaja). Steuerbescheid za samozaposlene. Potvrda o Mutterschaftsgeld od Krankenkasse. Potvrda o Arbeitgeberzuschuss od poslodavca. Krankentagegeld potvrda za privatno osigurane.",
              format: "Iznosi u eurima sa dva decimalna mjesta (npr. 2.450,00 €). Datumi: DD.MM.GGGG. Radni sati: sedmično (npr. 40h/Woche).",
              commonMistakes: "Priložiti manje od 12 platnih listi. Majka prilaže platne liste do porođaja umjesto do Mutterschutz-a. Zaboraviti Mutterschaftsgeld (oduzima se od Elterngeld-a!). Koristiti bruto umjesto neto. Steuerklasse promijenjena manje od 7 mjeseci prije porođaja – neće se priznati. Ne navesti Krankengeld/ALG I u Bemessungszeitraum.",
              whenToLeaveEmpty: "Ako niste bili zaposleni 12 mjeseci prije, i dalje dobijate minimum (300 € Basis / 150 € Plus). Popunite 'nicht erwerbstätig'.",
              example: "Zaposlena: Firma GmbH, neodređeno, 40h. Neto: Jan-Dez 2024 po 2.100 €. Mutterschutz od 04.05.2025 → platne liste: maj 2024 – april 2025. Steuerklasse promjena: 01.09.2024 (V→III). Privatno osigurana: Krankentagegeld potvrda priložena.",
            },
          ],
        },
        {
          field: "Zaposlenje tokom primanja Elterngeld-a",
          instruction: "Ako planirate raditi tokom Elterngeld-a (max. 32h sedmično), navedite planirane sate i očekivana primanja. Zarada umanjuje Elterngeld! ElterngeldPlus je povoljniji uz Teilzeit: 'Deckelungsbetrag' je polovina teorijskog BasisElterngeld-a BEZ zarade, pa je umanjenje proporcionalno manje. Zaposlenici: potvrda poslodavca o radnim satima. Samozaposleni: vlastita izjava + opis mjera za smanjenje obima posla (Entlastungserklärung).",
          cards: [
            {
              whatToWrite: "Da li planirate raditi: Ja/Nein. Ako da: sati sedmično, period, poslodavac, očekivani neto. Samozaposleni: vlastita izjava o planiranim satima + opis konkretnih mjera za smanjenje posla (npr. zamjena, smanjenje klijenata, pauziranje projekata).",
              whereToFind: "Dogovorite s poslodavcem. Planirani sati moraju odgovarati Elternzeit prijavi. Teilzeitvertrag ili pisana potvrda poslodavca. Samozaposleni: pripremite Entlastungserklärung sa konkretnim mjerama.",
              format: "Sati: broj sedmično (npr. 20h/Woche). Zarada: neto mjesečno u eurima. Period: DD.MM.GGGG – DD.MM.GGGG.",
              commonMistakes: "Više od 32 sata – zahtjev se odbija! Neprijavljen rad – smatra se prevarom, mora se vratiti. Ne znati da zarada umanjuje iznos. Samozaposleni: nema Entlastungserklärung.",
              whenToLeaveEmpty: "Ako ne planirate raditi, označite 'Nein' i ostavite ostala polja prazna.",
              example: "Planiram rad: Ja. 20h/Woche. Period: 15.02.-14.08.2026. Firma GmbH (isti poslodavac). Neto: 1.100 €/mj. Samozaposleni primjer: 15h/Woche, smanjenje broja klijenata sa 20 na 8, asistent preuzima hitne slučajeve.",
            },
          ],
        },
        {
          field: "Bankovni podaci i ostala primanja",
          instruction: "Unesite IBAN i BIC za isplatu. Obavezno navedite sva druga primanja: Mutterschaftsgeld, Arbeitgeberzuschuss zum Mutterschaftsgeld, Bürgergeld, ALG I, Wohngeld, Kinderzuschlag – ona se uzimaju u obzir pri izračunu i mogu umanjiti Elterngeld.",
          cards: [
            {
              whatToWrite: "IBAN (22 znaka, počinje sa DE), BIC (8 ili 11 znakova), ime vlasnika računa. Zatim: Mutterschaftsgeld (iznos i period), Arbeitgeberzuschuss, Bürgergeld, ALG I, Wohngeld, Kinderzuschlag.",
              whereToFind: "IBAN/BIC: bankovska kartica, online-banking, izvod. Mutterschaftsgeld: potvrda od Krankenkasse. Arbeitgeberzuschuss: potvrda od poslodavca. Ostale naknade: rješenja od Jobcenter/Familienkasse.",
              format: "IBAN: DE + 20 cifara, bez razmaka. BIC: 8 ili 11 znakova. Iznosi naknada: u eurima mjesečno ili dnevno (kako piše na potvrdi).",
              commonMistakes: "IBAN pogrešno prepisan. Mutterschaftsgeld + Arbeitgeberzuschuss nije naveden – oduzima se od Elterngeld-a i traži se povrat! Račun na koji podnosilac nema pristup.",
              whenToLeaveEmpty: "BIC za njemačke banke (automatski iz IBAN). Polja za naknade prazna samo ako zaista ne primate nijednu.",
              example: "IBAN: DE89370400440532013000. BIC: COBADEFFXXX. Vlasnik: Amina Hodžić. Mutterschaftsgeld: 13,00 €/dan, 04.05.-10.08.2025. Arbeitgeberzuschuss: 38,00 €/dan. Ostalo: Nein.",
            },
          ],
        },
        {
          field: "Izjava, potpis i prilozi",
          instruction: "OBA roditelja moraju potpisati, čak i ako samo jedan koristi Elterngeld. Potpis drugog roditelja potvrđuje saglasnost. Nakon dobijanja rješenja (Bescheid): imate 1 mjesec za Widerspruch (prigovor). Promjene za buduće mjesece moguće u bilo kom trenutku. Za prošle mjesece: promjena max. 3 mjeseca unazad, već isplaćeni mjeseci samo u slučaju teškoća (Härtefall). Izuzetak: ElterngeldPlus se uvijek može retroaktivno promijeniti u BasisElterngeld.",
          cards: [
            {
              whatToWrite: "Datum potpisa, potpis oba roditelja. Checklista priloga: Geburtsurkunde ✓, Lohnabrechnungen ✓, Arbeitgeberbescheinigung ✓, Mutterschaftsgeldbescheinigung ✓, Krankenversicherungsnachweis ✓, Steuerbescheid (samozaposleni) ✓, Krankentagegeld-Bescheinigung (privatno osigurani) ✓.",
              whereToFind: "Checklista na posljednjoj stranici formulara ili na web stranici Elterngeldstelle. Dokumenta prikupite unaprijed – potvrdu poslodavca zatražite 7+ sedmica ranije. Formulari dostupni i na: općini, Krankenkasse, bolnici sa porodilištem.",
              format: "Datum: DD.MM.GGGG. Potpis: vlastoručni (ili elektronski na ElterngeldDigital portalu). Checklista: kvačica ili X.",
              commonMistakes: "Nedostaje potpis drugog roditelja – zahtjev se vraća! Geburtsurkunde nije original. Antrag podnesen PRIJE porođaja (nije moguće!). Više od jednog zahtjeva po roditelju. Rok za Widerspruch propušten (1 mjesec od primitka Bescheida). Steuererklärung nije podnesena (obavezna zbog Progressionsvorbehalt!).",
              whenToLeaveEmpty: "Potpis drugog roditelja samo ako ste samohrani (priložiti Sorgerechtsbeschluss ili Negativbescheinigung od Jugendamt).",
              example: "Datum: 20.06.2025. Potpis 1: Amina Hodžić. Potpis 2: Emir Hodžić. Prilozi: Geburtsurkunde (Original) ✓, 12x Gehaltsabrechnung ✓, Arbeitgeberbescheinigung ✓, Mutterschaftsgeldbescheinigung ✓, Krankenversicherungsnachweis ✓.",
            },
          ],
        },
      ],
      en: [
        { field: "Applicant details", instruction: "Personal data: name, date of birth, tax ID, address, nationality, marital status, tax class." },
        { field: "Child details", instruction: "Child's name, date of birth, place of birth, gender, Kindergeld number." },
        { field: "Elterngeld variant selection", instruction: "Choose: Basiselterngeld (65% net, max €1,800, 14 months), ElterngeldPlus (half amount, double duration, max €900), or Partnerschaftsbonus (4 extra months at 24-32h/week). Tax-free but Progressionsvorbehalt – tax return mandatory!" },
        { field: "Benefit months (Lebensmonate)", instruction: "Life months from birth date, NOT calendar months. Basiselterngeld only in first 14 life months. After LM14: only ElterngeldPlus/Partnerschaftsbonus up to LM32, no interruption allowed!" },
        { field: "Pre-birth income", instruction: "12 months before birth (mothers: before Mutterschutz). Max considered net: €2,770. Low earners: below €1,000 → up to 100%." },
        { field: "Employment during benefit period", instruction: "Planned working hours (max. 32h/week) and expected income. Self-employed need Entlastungserklärung." },
        { field: "Bank details and other benefits", instruction: "IBAN, BIC. Declare maternity pay, employer supplement, Bürgergeld, ALG I, housing benefit." },
        { field: "Declaration and signature", instruction: "Both parents sign. After decision: 1 month appeal period. Changes: future months anytime, past months max 3 months back. ElterngeldPlus → Basiselterngeld always retroactively possible." },
      ],
    },
    documents: {
      de: [
        "Geburtsurkunde des Kindes (Original oder beglaubigte Kopie)",
        "Gehaltsabrechnungen – Mütter: 12 Monate vor Beginn des Mutterschutzes, Väter: 12 Monate vor Geburt",
        "Arbeitgeberbescheinigung über Elternzeit und Arbeitszeit",
        "Mutterschaftsgeldbescheinigung der Krankenkasse",
        "Bescheinigung über Arbeitgeberzuschuss zum Mutterschaftsgeld",
        "Krankenversicherungsnachweis",
        "Steuerbescheid (bei Selbständigen)",
        "Dienstbezüge-Bescheinigung (bei Beamten/Soldaten)",
        "Krankentagegeld-Bescheinigung (bei privat versicherten Müttern)",
        "Bescheinigung über Teilzeitarbeit / Entlastungserklärung bei Selbständigen (falls geplant)",
        "Sorgerechtsbeschluss oder Negativbescheinigung vom Jugendamt (bei Alleinerziehenden)",
      ],
      bs: [
        "Rodni list djeteta (original ili ovjerena kopija)",
        "Platne liste – majke: 12 mjeseci prije početka Mutterschutz-a, očevi: 12 mjeseci prije porođaja",
        "Potvrda poslodavca o roditeljskom odsustvu i radnom vremenu (Arbeitgeberbescheinigung)",
        "Potvrda o porodiljskom dodatku od zdravstvene kase (Mutterschaftsgeldbescheinigung)",
        "Potvrda o dodatku poslodavca na porodiljski dodatak (Arbeitgeberzuschuss)",
        "Dokaz o zdravstvenom osiguranju",
        "Porezno rješenje – Steuerbescheid (za samozaposlene)",
        "Potvrda o Dienstbezüge (za državne službenike/vojnike)",
        "Potvrda o Krankentagegeld (za privatno osigurane majke)",
        "Potvrda o radu u nepunom radnom vremenu / Entlastungserklärung za samozaposlene (ako planirate raditi)",
        "Odluka o starateljstvu ili Negativbescheinigung od Jugendamt (za samohrane roditelje)",
      ],
      en: [
        "Child's birth certificate (original or certified copy)",
        "Salary slips – mothers: 12 months before Mutterschutz, fathers: 12 months before birth",
        "Employer certificate for parental leave and working hours",
        "Maternity benefit certificate from health insurance",
        "Employer supplement to maternity benefit certificate",
        "Health insurance proof",
        "Tax assessment (for self-employed)",
        "Service pay certificate (for civil servants/soldiers)",
        "Krankentagegeld certificate (for privately insured mothers)",
        "Part-time work confirmation / Entlastungserklärung for self-employed (if planned)",
        "Custody decision or Negativbescheinigung from Jugendamt (for single parents)",
      ],
    },
    processingTime: { de: "6–12 Wochen", bs: "6–12 sedmica", en: "6–12 weeks" },
    commonMistakes: {
      de: [
        "Antrag VOR der Geburt gestellt (nicht möglich!)",
        "Antrag zu spät gestellt – max. 3 Monate rückwirkend!",
        "Mehr als ein Antrag pro Elternteil pro Kind",
        "Falsche Lebensmonate gewählt (Kalender- statt Lebensmonate)",
        "Fehlende Partnermonate-Begründung",
        "Mutterschaftsgeld nicht berücksichtigt (wird vom Elterngeld abgezogen)",
        "Einkommen während Bezug nicht angegeben",
        "Einkommensgrenze übersehen (200.000 € ab 01.04.2024, 175.000 € ab 01.04.2025)",
        "Fehlender Unterschrift des zweiten Elternteils",
        "Arbeitgeberbescheinigung nicht beigefügt",
        "Steuererklärung nicht abgegeben trotz Elterngeldbezug (Progressionsvorbehalt!)",
        "Nach LM14 den Bezug unterbrochen (danach kein Anspruch mehr)",
      ],
      bs: [
        "Zahtjev podnesen PRIJE porođaja (nije moguće!)",
        "Zahtjev predan prekasno – retroaktivno max. 3 mjeseca!",
        "Više od jednog zahtjeva po roditelju po djetetu",
        "Pogrešni Lebensmonate (brkanje sa kalendarskim mjesecima)",
        "Partnermonate nisu obrazloženi ili nedostaju",
        "Mutterschaftsgeld nije naveden (oduzima se od Elterngeld-a!)",
        "Primanja tokom korištenja nisu prijavljena",
        "Granica prihoda prekoračena (200.000 € od 01.04.2024, 175.000 € od 01.04.2025)",
        "Nedostaje potpis drugog roditelja",
        "Potvrda poslodavca nije priložena",
        "Steuererklärung nije podnesena (obavezna zbog Progressionsvorbehalt!)",
        "Prekid primanja nakon LM14 (nema više prava na nastavak)",
      ],
      en: [
        "Application submitted BEFORE birth (not possible!)",
        "Application too late – max. 3 months retroactive!",
        "More than one application per parent per child",
        "Wrong Lebensmonate (calendar vs. life months confusion)",
        "Missing partner months justification",
        "Maternity benefit not declared (deducted from Elterngeld!)",
        "Income during benefit not reported",
        "Income cap exceeded (€200,000 from 01.04.2024, €175,000 from 01.04.2025)",
        "Missing second parent's signature",
        "Employer certificate not attached",
        "Tax return not filed despite receiving Elterngeld (Progressionsvorbehalt!)",
        "Benefit interrupted after LM14 (no further entitlement)",
      ],
    },
    officialPdf: "",
    onlineLink: "https://www.elterngeld-digital.de",
    officialInfoUrl: "https://familienportal.de/familienportal/familienleistungen/elterngeld",
  },
  {
    slug: "bildung-teilhabe",
    category: "familie",
    title: { de: "Bildungs- und Teilhabepaket", bs: "Paket obrazovanja i učešća (BuT)", en: "Education & Participation Package (BuT)" },
    who: {
      de: "Familien, die Bürgergeld, Wohngeld, Kinderzuschlag oder Asylbewerberleistungen erhalten.",
      bs: "Porodice koje primaju Bürgergeld, Wohngeld, Kinderzuschlag ili pomoć za azilante.",
      en: "Families receiving Bürgergeld, housing benefit, child supplement, or asylum benefits.",
    },
    authority: { de: "Jobcenter oder Kommune (je nach Grundleistung)", bs: "Jobcenter ili općina (zavisno od osnovne naknade)", en: "Jobcenter or municipality (depending on base benefit)" },
    formName: { de: "Antrag auf Leistungen für Bildung und Teilhabe", bs: "Zahtjev za obrazovne i participativne usluge", en: "Application for Education and Participation Benefits" },
    steps: {
      de: [
        { field: "Leistungsart ankreuzen", instruction: "Gewünschte Leistung ankreuzen: Schulbedarf (195 € pro Jahr), Lernförderung/Nachhilfe, Mittagessen in Schule/Kita, Schülerbeförderung, Klassenfahrten/Ausflüge, Sport-/Kultur-/Freizeitaktivitäten (15 €/Monat)." },
        { field: "Kind", instruction: "Name, Geburtsdatum und Schule/Kita des Kindes angeben. Klasse und Schulform eintragen." },
        { field: "Grundleistung nachweisen", instruction: "Aktuellen Bescheid über Bürgergeld, Wohngeld oder Kinderzuschlag beifügen – dieser ist der Nachweis für die BuT-Berechtigung." },
        { field: "Bestätigungen einholen", instruction: "Je nach Leistung: Bestätigung der Schule über Klassenfahrt, Bestätigung des Vereins über Mitgliedschaft, Bestätigung des Nachhilfeanbieters." },
      ],
      bs: [
        { field: "Označiti vrstu usluge", instruction: "Označiti: školski materijal, dopunska nastava, ručak, prijevoz, izleti, sport/kultura." },
        { field: "Dijete", instruction: "Ime, datum rođenja, škola/vrtić, razred." },
        { field: "Dokazati osnovu", instruction: "Priložiti aktuelno rješenje o Bürgergeld, Wohngeld ili Kinderzuschlag." },
        { field: "Pribaviti potvrde", instruction: "Potvrda škole o izletu, potvrda kluba o članstvu itd." },
      ],
      en: [
        { field: "Check benefit type", instruction: "Check desired benefit: school supplies, tutoring, school lunch, transport, trips, sports/culture." },
        { field: "Child", instruction: "Name, date of birth, school/daycare, grade." },
        { field: "Prove base benefit", instruction: "Attach current Bürgergeld, Wohngeld, or Kinderzuschlag notice." },
        { field: "Obtain confirmations", instruction: "School confirmation for trips, club confirmation for membership, etc." },
      ],
    },
    documents: {
      de: ["Aktueller Leistungsbescheid (Bürgergeld/Wohngeld/KiZ)", "Schulbescheinigung", "Bestätigung des Vereins/der Schule", "Ggf. Kostenvoranschlag für Nachhilfe"],
      bs: ["Aktuelno rješenje (Bürgergeld/Wohngeld/KiZ)", "Potvrda škole", "Potvrda kluba/škole", "Eventualno ponuda za instrukcije"],
      en: ["Current benefit notice", "School certificate", "Club/school confirmation", "Quote for tutoring if applicable"],
    },
    processingTime: { de: "2–4 Wochen", bs: "2–4 sedmice", en: "2–4 weeks" },
    commonMistakes: {
      de: ["Keine Schulbescheinigung beigefügt", "Falsche Leistungsart angekreuzt", "Leistungsbescheid abgelaufen – aktuellen Bescheid beifügen", "Antrag erst nach der Klassenfahrt gestellt"],
      bs: ["Nije priložena potvrda škole", "Pogrešna vrsta usluge označena", "Isteklo rješenje", "Zahtjev podnesen nakon izleta"],
      en: ["No school certificate attached", "Wrong benefit type checked", "Expired benefit notice", "Application filed after the trip"],
    },
    officialPdf: "",
    onlineLink: "",
    officialInfoUrl: "https://www.bmas.de/DE/Arbeit/Grundsicherung-Buergergeld/Bildungspaket/bildungspaket.html",
  },
  {
    slug: "unterhaltsvorschuss",
    category: "familie",
    title: { de: "Unterhaltsvorschuss", bs: "Alimentacijski predujam (Unterhaltsvorschuss)", en: "Maintenance Advance (Unterhaltsvorschuss)" },
    who: {
      de: "Alleinerziehende, deren Kind keinen oder unregelmäßigen Unterhalt vom anderen Elternteil erhält.",
      bs: "Samohrani roditelji čije dijete ne prima ili neredovno prima alimentaciju.",
      en: "Single parents whose child receives no or irregular maintenance from the other parent.",
    },
    authority: { de: "Jugendamt der Stadt/Gemeinde", bs: "Jugendamt grada/općine", en: "Youth Welfare Office (Jugendamt)" },
    formName: { de: "Antrag auf Unterhaltsvorschuss", bs: "Zahtjev za alimentacijski predujam", en: "Application for Maintenance Advance" },
    steps: {
      de: [
        { field: "Antragsteller", instruction: "Daten des alleinerziehenden Elternteils: Name, Anschrift, Geburtsdatum, Familienstand (ledig/geschieden/getrennt lebend)." },
        { field: "Kind", instruction: "Name, Geburtsdatum, bei wem das Kind lebt. Wichtig: Das Kind muss beim Antragsteller gemeldet sein." },
        { field: "Unterhaltspflichtiger", instruction: "Name, letzte bekannte Anschrift, Arbeitgeber des anderen Elternteils – soweit bekannt. Auch 'unbekannt' ist möglich, muss aber begründet werden." },
        { field: "Bemühungen um Unterhalt", instruction: "Angeben, welche Schritte unternommen wurden, um Unterhalt zu erhalten (z.B. Anwalt, Jugendamt-Beistandschaft, Vollstreckung)." },
      ],
      bs: [
        { field: "Podnosilac", instruction: "Podaci samohranog roditelja: ime, adresa, datum rođenja, bračni status." },
        { field: "Dijete", instruction: "Ime, datum rođenja, kod koga dijete živi. Dijete mora biti prijavljeno kod podnosioca." },
        { field: "Obveznik alimentacije", instruction: "Ime, zadnja poznata adresa, poslodavac drugog roditelja. Može biti i 'nepoznato' uz obrazloženje." },
        { field: "Pokušaji ostvarivanja alimentacije", instruction: "Navesti poduzete korake za dobijanje alimentacije." },
      ],
      en: [
        { field: "Applicant", instruction: "Single parent's data: name, address, date of birth, marital status." },
        { field: "Child", instruction: "Name, date of birth, who the child lives with. Child must be registered with applicant." },
        { field: "Liable parent", instruction: "Name, last known address, employer of other parent. 'Unknown' is possible but must be justified." },
        { field: "Efforts to obtain maintenance", instruction: "State what steps were taken to obtain maintenance." },
      ],
    },
    documents: {
      de: ["Geburtsurkunde des Kindes", "Meldebescheinigung (Kind beim Antragsteller)", "Negativbescheinigung über Unterhalt oder Urteil", "Vaterschaftsanerkennung oder -feststellung"],
      bs: ["Rodni list djeteta", "Potvrda o prijavi (dijete kod podnosioca)", "Dokaz o neplaćanju alimentacije ili presuda", "Priznanje ili utvrđivanje očinstva"],
      en: ["Birth certificate", "Registration (child with applicant)", "Proof of non-payment or court ruling", "Paternity acknowledgment or determination"],
    },
    processingTime: { de: "4–8 Wochen", bs: "4–8 sedmica", en: "4–8 weeks" },
    commonMistakes: {
      de: ["Angaben zum unterhaltspflichtigen Elternteil fehlen komplett", "Kind nicht beim Antragsteller gemeldet", "Keine Nachweise über Bemühungen um Unterhalt", "Antrag nicht beim zuständigen Jugendamt gestellt"],
      bs: ["Potpuno nedostaju podaci o obvezniku alimentacije", "Dijete nije prijavljeno kod podnosioca", "Nema dokaza o pokušajima dobijanja alimentacije", "Zahtjev podnesen pogrešnom Jugendamt-u"],
      en: ["Missing liable parent data entirely", "Child not registered with applicant", "No proof of maintenance efforts", "Application filed at wrong Jugendamt"],
    },
    officialPdf: "",
    onlineLink: "",
    officialInfoUrl: "https://www.bmfsfj.de/bmfsfj/themen/familie/familienleistungen/unterhaltsvorschuss",
  },
  // ===================== WOHNEN =====================
  {
    slug: "wohngeld",
    category: "wohnen",
    title: { de: "Wohngeld", bs: "Stambeni dodatak (Wohngeld)", en: "Housing Benefit (Wohngeld)" },
    who: {
      de: "Personen mit geringem Einkommen, die Miete oder Eigentumslast tragen und kein Bürgergeld erhalten.",
      bs: "Osobe sa niskim primanjima koje plaćaju kiriju i ne primaju Bürgergeld.",
      en: "Low-income individuals paying rent who don't receive Bürgergeld.",
    },
    authority: { de: "Wohngeldstelle der Gemeinde oder Stadt", bs: "Služba za Wohngeld općine/grada", en: "Housing Benefit Office of municipality" },
    formName: { de: "Wohngeldantrag (Mietzuschuss oder Lastenzuschuss)", bs: "Zahtjev za Wohngeld", en: "Housing Benefit Application" },
    steps: {
      de: [
        { field: "Antragsteller", instruction: "Persönliche Daten eintragen: Name, Geburtsdatum, Steuer-ID, Familienstand. Antragsteller muss der Hauptmieter sein." },
        { field: "Haushaltsmitglieder", instruction: "Alle im Haushalt lebenden Personen mit Name, Geburtsdatum und monatlichem Bruttoeinkommen auflisten. Auch Kinder und nicht verwandte Mitbewohner angeben." },
        { field: "Wohnung", instruction: "Vollständige Adresse, Wohnfläche in m², Kaltmiete, Nebenkosten (ohne Strom) und Heizkosten getrennt eintragen. Beträge aus dem Mietvertrag übernehmen." },
        { field: "Einkommen", instruction: "Bruttoeinkommen aller Haushaltsmitglieder der letzten 12 Monate. Dazu zählen: Lohn, Rente, Kindergeld, Unterhalt, BAföG, Einkünfte aus Vermietung." },
      ],
      bs: [
        { field: "Podnosilac", instruction: "Lični podaci: ime, datum rođenja, porezni ID. Podnosilac mora biti glavni zakupac." },
        { field: "Članovi domaćinstva", instruction: "Sve osobe u domaćinstvu sa primanjima." },
        { field: "Stan", instruction: "Adresa, veličina u m², hladna kirija, režije (bez struje) i grijanje odvojeno." },
        { field: "Primanja", instruction: "Bruto primanja svih članova (12 mjeseci)." },
      ],
      en: [
        { field: "Applicant", instruction: "Personal data. Applicant must be the main tenant." },
        { field: "Household members", instruction: "All persons in household with income." },
        { field: "Apartment", instruction: "Address, size in m², cold rent, utilities (excl. electricity), heating separately." },
        { field: "Income", instruction: "Gross income of all members (12 months)." },
      ],
    },
    documents: {
      de: ["Mietvertrag (vollständig)", "Einkommensnachweise aller Haushaltsmitglieder", "Meldebescheinigung", "Kontoauszüge (3 Monate)", "Letzte Nebenkostenabrechnung"],
      bs: ["Ugovor o najmu (kompletno)", "Dokazi o primanjima svih članova", "Potvrda o prijavi", "Izvodi iz računa (3 mjeseca)", "Zadnji obračun režija"],
      en: ["Rental contract (complete)", "Income proof of all members", "Registration certificate", "Bank statements (3 months)", "Last utility bill"],
    },
    processingTime: { de: "3–6 Wochen", bs: "3–6 sedmica", en: "3–6 weeks" },
    commonMistakes: {
      de: ["Haushaltsmitglieder nicht vollständig angegeben", "Einkommen nicht aktuell (letzte 12 Monate nötig)", "Mietvertrag fehlt oder ist unvollständig", "Heizkosten und Nebenkosten nicht getrennt"],
      bs: ["Članovi domaćinstva nepotpuno navedeni", "Primanja nisu aktuelna", "Nedostaje ugovor o najmu", "Grijanje i režije nisu odvojeni"],
      en: ["Household members incomplete", "Income not current", "Missing/incomplete rental contract", "Heating and utilities not separated"],
    },
    officialPdf: "",
    onlineLink: "",
    officialInfoUrl: "https://www.bmwsb.bund.de/Webs/BMWSB/DE/themen/stadt-wohnen/wohnraumfoerderung/wohngeld/wohngeld-node.html",
  },
  {
    slug: "buergergeld",
    category: "wohnen",
    title: { de: "Bürgergeld", bs: "Građanski novac (Bürgergeld)", en: "Citizens' Benefit (Bürgergeld)" },
    who: {
      de: "Erwerbsfähige Personen (15–67 Jahre), die ihren Lebensunterhalt nicht aus eigenem Einkommen bestreiten können.",
      bs: "Radno sposobne osobe (15–67 godina) koje ne mogu pokriti životne troškove vlastitim primanjima.",
      en: "Employable persons (15–67) unable to cover living expenses from own income.",
    },
    authority: { de: "Jobcenter (zuständig nach Wohnort)", bs: "Jobcenter (nadležan prema mjestu stanovanja)", en: "Jobcenter (based on place of residence)" },
    formName: { de: "Hauptantrag Bürgergeld (SGB II)", bs: "Glavni zahtjev za Bürgergeld (SGB II)", en: "Main Application Bürgergeld (SGB II)" },
    steps: {
      de: [
        { field: "Persönliche Daten", instruction: "Name, Geburtsdatum, Familienstand, Staatsangehörigkeit, Steuer-ID eintragen." },
        { field: "Bedarfsgemeinschaft", instruction: "Alle Personen im Haushalt erfassen: Partner, Kinder unter 25, die im Haushalt leben. Für jede Person Einkommen und Vermögen angeben." },
        { field: "Einkommen & Vermögen", instruction: "Alle Einkommensquellen: Lohn, Kindergeld, Unterhalt, Rente. Vermögenswerte: Bargeld, Konten, Wertpapiere, Kfz, Immobilien. Freibetrag: 15.000 € pro Person." },
        { field: "Kosten der Unterkunft (KdU)", instruction: "Mietvertrag beifügen. Kaltmiete, Nebenkosten und Heizkosten getrennt eintragen. Das Jobcenter übernimmt angemessene Kosten – ggf. Kostensenkungsaufforderung beachten." },
      ],
      bs: [
        { field: "Lični podaci", instruction: "Ime, datum rođenja, bračni status, državljanstvo, porezni ID." },
        { field: "Zajednica potreba", instruction: "Sve osobe u domaćinstvu: partner, djeca do 25 godina." },
        { field: "Primanja & imovina", instruction: "Svi izvori prihoda i imovina. Freibetrag: 15.000 € po osobi." },
        { field: "Troškovi stanovanja", instruction: "Ugovor o najmu priložiti. Kirija, režije i grijanje odvojeno." },
      ],
      en: [
        { field: "Personal data", instruction: "Name, date of birth, marital status, nationality, tax ID." },
        { field: "Needs community", instruction: "All persons in household: partner, children under 25." },
        { field: "Income & assets", instruction: "All income sources and assets. Exemption: €15,000 per person." },
        { field: "Housing costs", instruction: "Attach rental contract. Cold rent, utilities, heating separately." },
      ],
    },
    documents: {
      de: ["Personalausweis/Reisepass", "Mietvertrag (vollständig)", "Einkommensnachweise (letzte 3 Monate)", "Kontoauszüge (3 Monate, lückenlos)", "Aufenthaltstitel (bei Nicht-EU)", "Kündigungsschreiben oder Arbeitsvertrag"],
      bs: ["Lična karta/pasoš", "Ugovor o najmu", "Dokazi o primanjima (3 mjeseca)", "Izvodi iz računa (3 mjeseca, bez praznina)", "Boravišna dozvola", "Otkaz ili ugovor o radu"],
      en: ["ID/passport", "Rental contract", "Income proof (3 months)", "Bank statements (3 months, complete)", "Residence permit (non-EU)", "Termination or employment contract"],
    },
    processingTime: { de: "2–4 Wochen", bs: "2–4 sedmice", en: "2–4 weeks" },
    commonMistakes: {
      de: ["Kontoauszüge nicht lückenlos (alle Seiten nötig!)", "Bedarfsgemeinschaft falsch angegeben", "Vermögen verschwiegen oder unterschätzt", "Fehlende Unterschrift beider Partner"],
      bs: ["Izvodi iz računa nisu kompletni", "Zajednica potreba pogrešno navedena", "Prešućena imovina", "Nedostaje potpis oba partnera"],
      en: ["Bank statements not complete", "Needs community incorrectly stated", "Undisclosed assets", "Missing signature of both partners"],
    },
    officialPdf: "",
    onlineLink: "https://www.jobcenter.digital",
    officialInfoUrl: "https://www.arbeitsagentur.de/arbeitslos-arbeit-finden/buergergeld",
  },
  {
    slug: "heizkostenzuschuss",
    category: "wohnen",
    title: { de: "Heizkostenzuschuss", bs: "Dodatak za grijanje", en: "Heating Cost Subsidy" },
    who: {
      de: "Wohngeldempfänger, BAföG-/AFBG-Empfänger – wird automatisch mit dem Wohngeld gewährt.",
      bs: "Primaoci Wohngeld-a, BAföG-a ili AFBG-a – dodjeljuje se automatski uz Wohngeld.",
      en: "Recipients of housing benefit, BAföG, or AFBG – granted automatically with housing benefit.",
    },
    authority: { de: "Wohngeldstelle (wird automatisch gewährt)", bs: "Služba za Wohngeld (automatski)", en: "Housing Benefit Office (automatic)" },
    formName: { de: "Kein separater Antrag – automatisch mit Wohngeld", bs: "Nema posebnog zahtjeva – automatski uz Wohngeld", en: "No separate application – automatic with housing benefit" },
    steps: {
      de: [
        { field: "Kein separater Antrag nötig", instruction: "Der Heizkostenzuschuss wird automatisch mit dem Wohngeldbescheid berechnet und ausgezahlt. Sie müssen lediglich einen regulären Wohngeldantrag stellen." },
        { field: "Wohngeldantrag stellen", instruction: "Stellen Sie den normalen Wohngeldantrag (siehe Wohngeld-Guide). Im Bescheid wird der Heizkostenzuschuss separat ausgewiesen." },
      ],
      bs: [
        { field: "Nema posebnog zahtjeva", instruction: "Dodatak za grijanje se automatski obračunava i isplaćuje sa Wohngeld rješenjem." },
        { field: "Podnijeti Wohngeld zahtjev", instruction: "Podnijeti redovni Wohngeld zahtjev." },
      ],
      en: [
        { field: "No separate application", instruction: "Heating subsidy is automatically calculated and paid with the housing benefit notice." },
        { field: "File housing benefit application", instruction: "File the regular housing benefit application." },
      ],
    },
    documents: {
      de: ["Wohngeldantrag (regulär)", "Letzte Heizkostenabrechnung"],
      bs: ["Wohngeld zahtjev (redovni)", "Zadnji obračun grijanja"],
      en: ["Housing benefit application (regular)", "Last heating cost bill"],
    },
    processingTime: { de: "Zusammen mit Wohngeldbescheid", bs: "Zajedno sa Wohngeld rješenjem", en: "Together with housing benefit notice" },
    commonMistakes: {
      de: ["Heizkostenabrechnung nicht eingereicht", "Separaten Antrag gesucht (gibt es nicht)"],
      bs: ["Obračun grijanja nije dostavljen", "Tražen poseban zahtjev (ne postoji)"],
      en: ["Heating cost bill not submitted", "Looked for separate application (doesn't exist)"],
    },
    officialPdf: "",
    onlineLink: "",
    officialInfoUrl: "https://www.bmwsb.bund.de/Webs/BMWSB/DE/themen/stadt-wohnen/wohnraumfoerderung/wohngeld/wohngeld-node.html",
  },
  // ===================== ARBEIT =====================
  {
    slug: "arbeitslosengeld",
    category: "arbeit",
    title: { de: "Arbeitslosengeld I", bs: "Naknada za nezaposlenost I (ALG I)", en: "Unemployment Benefit I (ALG I)" },
    who: {
      de: "Arbeitnehmer, die in den letzten 30 Monaten mindestens 12 Monate sozialversicherungspflichtig beschäftigt waren.",
      bs: "Zaposlenici koji su u zadnjih 30 mjeseci bili najmanje 12 mjeseci socijalno osigurani.",
      en: "Employees employed for at least 12 months in the last 30 months with social insurance.",
    },
    authority: { de: "Agentur für Arbeit (persönliche Meldung erforderlich)", bs: "Agencija za rad (potrebna lična prijava)", en: "Employment Agency (personal registration required)" },
    formName: { de: "Antrag auf Arbeitslosengeld", bs: "Zahtjev za naknadu za nezaposlenost", en: "Application for Unemployment Benefit" },
    steps: {
      de: [
        { field: "Arbeitssuchend melden", instruction: "Spätestens 3 Monate vor Ende des Arbeitsverhältnisses online oder telefonisch als arbeitssuchend melden. Bei kurzfristiger Kündigung: innerhalb von 3 Tagen." },
        { field: "Arbeitslos melden", instruction: "Am ersten Tag der Arbeitslosigkeit persönlich bei der Agentur für Arbeit erscheinen. Ohne persönliche Meldung kein Anspruch!" },
        { field: "Persönliche Daten", instruction: "Name, Anschrift, Steuer-ID, Bankverbindung, Sozialversicherungsnummer eintragen." },
        { field: "Beschäftigungshistorie", instruction: "Letzte Arbeitgeber, Beschäftigungszeiträume und Kündigungsgrund angeben. Arbeitsbescheinigung vom Arbeitgeber beifügen." },
      ],
      bs: [
        { field: "Prijava traženja posla", instruction: "Najkasnije 3 mjeseca prije kraja radnog odnosa prijaviti traženje posla online ili telefonski." },
        { field: "Prijava nezaposlenosti", instruction: "Prvog dana nezaposlenosti lično se prijaviti u Agenciji za rad." },
        { field: "Lični podaci", instruction: "Ime, adresa, porezni ID, bankovni podaci, broj socijalnog osiguranja." },
        { field: "Radna istorija", instruction: "Posljednji poslodavci, periodi zaposlenja i razlog otkaza." },
      ],
      en: [
        { field: "Register as job-seeking", instruction: "Register at least 3 months before end of employment, online or by phone." },
        { field: "Register as unemployed", instruction: "Appear in person on the first day of unemployment. No claim without personal registration!" },
        { field: "Personal data", instruction: "Name, address, tax ID, bank details, social insurance number." },
        { field: "Employment history", instruction: "Previous employers, periods, and reason for termination." },
      ],
    },
    documents: {
      de: ["Arbeitsbescheinigung (vom Arbeitgeber – Pflicht!)", "Personalausweis/Reisepass", "Sozialversicherungsausweis", "Kündigungsschreiben oder Aufhebungsvertrag", "Lebenslauf"],
      bs: ["Potvrda o zaposlenju (od poslodavca – obavezno!)", "Lična karta/pasoš", "Socijalno osiguranje", "Otkaz ili sporazumni raskid", "Biografija"],
      en: ["Employment certificate (from employer – mandatory!)", "ID/passport", "Social insurance card", "Termination letter or agreement", "CV"],
    },
    processingTime: { de: "2–3 Wochen", bs: "2–3 sedmice", en: "2–3 weeks" },
    commonMistakes: {
      de: ["Zu spät arbeitslos gemeldet → Sperrzeit!", "Arbeitssuchend-Meldung versäumt (1 Woche Sperrzeit)", "Arbeitsbescheinigung vom Arbeitgeber fehlt", "Aufhebungsvertrag unterschrieben → mögliche Sperrzeit prüfen"],
      bs: ["Prekasno prijavljena nezaposlenost → Sperrzeit!", "Propuštena prijava traženja posla", "Nedostaje potvrda od poslodavca", "Potpisan sporazumni raskid → moguća Sperrzeit"],
      en: ["Late registration → blocking period!", "Missed job-seeking registration", "Missing employer certificate", "Signed mutual termination → possible blocking period"],
    },
    officialPdf: "",
    onlineLink: "https://www.arbeitsagentur.de/arbeitslos-arbeit-finden/arbeitslosengeld",
  },
  {
    slug: "kurzarbeitergeld",
    category: "arbeit",
    title: { de: "Kurzarbeitergeld", bs: "Naknada za skraćeno radno vrijeme", en: "Short-Time Work Benefit" },
    who: {
      de: "Arbeitnehmer, deren Arbeitszeit vorübergehend reduziert wird. Der Antrag wird durch den Arbeitgeber gestellt.",
      bs: "Zaposlenici kojima je privremeno skraćeno radno vrijeme. Zahtjev podnosi poslodavac.",
      en: "Employees with temporarily reduced working hours. Applied by employer.",
    },
    authority: { de: "Agentur für Arbeit (Arbeitgeber stellt Antrag)", bs: "Agencija za rad (poslodavac podnosi zahtjev)", en: "Employment Agency (employer applies)" },
    formName: { de: "Anzeige über Arbeitsausfall / Antrag auf Kurzarbeitergeld (KUG)", bs: "Prijava gubitka rada / zahtjev za KUG", en: "Report of work loss / Short-time work application" },
    steps: {
      de: [
        { field: "Anzeige des Arbeitsausfalls", instruction: "Der Arbeitgeber zeigt erheblichen Arbeitsausfall bei der Agentur für Arbeit an. Mindestens 10% der Beschäftigten müssen betroffen sein." },
        { field: "Monatlicher Antrag", instruction: "Der Arbeitgeber beantragt KuG monatlich für die betroffenen Arbeitnehmer nach Ablauf des Monats." },
        { field: "Für Arbeitnehmer", instruction: "Sie müssen keinen eigenen Antrag stellen. Das KuG wird über den Arbeitgeber mit der Lohnabrechnung ausgezahlt (ca. 60% bzw. 67% mit Kind)." },
      ],
      bs: [
        { field: "Prijava gubitka rada", instruction: "Poslodavac prijavljuje značajan gubitak rada Agenciji. Min. 10% zaposlenika mora biti pogođeno." },
        { field: "Mjesečni zahtjev", instruction: "Poslodavac mjesečno podnosi zahtjev za pogođene zaposlenike." },
        { field: "Za zaposlenike", instruction: "Ne morate sami podnositi zahtjev. Isplata ide preko poslodavca (oko 60% ili 67% sa djetetom)." },
      ],
      en: [
        { field: "Report work loss", instruction: "Employer reports significant work loss. At least 10% of employees must be affected." },
        { field: "Monthly application", instruction: "Employer applies monthly for affected employees." },
        { field: "For employees", instruction: "No own application needed. Paid through employer (approx. 60% or 67% with children)." },
      ],
    },
    documents: {
      de: ["Arbeitsvertrag", "Lohnabrechnungen (letzte 3 Monate)", "Ggf. Vereinbarung über Kurzarbeit"],
      bs: ["Ugovor o radu", "Platne liste (zadnja 3 mjeseca)", "Sporazum o skraćenom radnom vremenu"],
      en: ["Employment contract", "Pay slips (last 3 months)", "Short-time work agreement if applicable"],
    },
    processingTime: { de: "Monatliche Abrechnung durch Arbeitgeber", bs: "Mjesečni obračun od strane poslodavca", en: "Monthly settlement by employer" },
    commonMistakes: {
      de: ["Arbeitnehmer denkt, er muss selbst beantragen (nein!)", "Arbeitgeber versäumt die Anzeige des Arbeitsausfalls"],
      bs: ["Zaposlenik misli da sam mora podnijeti zahtjev (ne!)", "Poslodavac propusti prijavu gubitka rada"],
      en: ["Employee thinks they need to apply (no!)", "Employer misses the work loss report"],
    },
    officialPdf: "",
    onlineLink: "",
    officialInfoUrl: "https://www.arbeitsagentur.de/unternehmen/finanziell/kurzarbeitergeld",
  },
  // ===================== GESUNDHEIT =====================
  {
    slug: "krankengeld",
    category: "gesundheit",
    title: { de: "Krankengeld", bs: "Naknada za bolovanje (Krankengeld)", en: "Sick Pay (Krankengeld)" },
    who: {
      de: "Gesetzlich Krankenversicherte, die länger als 6 Wochen arbeitsunfähig sind (nach Lohnfortzahlung durch Arbeitgeber).",
      bs: "Zakonski zdravstveno osigurani koji su duže od 6 sedmica nesposobni za rad.",
      en: "Statutory health insurance members unable to work for more than 6 weeks.",
    },
    authority: { de: "Gesetzliche Krankenkasse (z.B. AOK, TK, Barmer)", bs: "Zakonska zdravstvena osiguravajuća kuća", en: "Statutory Health Insurance (e.g. AOK, TK, Barmer)" },
    formName: { de: "Antrag auf Krankengeld (Auszahlschein der Krankenkasse)", bs: "Zahtjev za Krankengeld (obrazac za isplatu)", en: "Sick Pay Application (payment form from insurance)" },
    steps: {
      de: [
        { field: "AU-Bescheinigung", instruction: "Ihr Arzt stellt die Arbeitsunfähigkeitsbescheinigung (AU) aus. Seit 2023 wird die eAU digital an die Krankenkasse übermittelt – Sie müssen nichts einreichen." },
        { field: "Auszahlschein ausfüllen", instruction: "Nach 6 Wochen sendet Ihnen die Krankenkasse einen Auszahlschein. Diesen ausfüllen: Zeitraum der Arbeitsunfähigkeit, ob Reha beantragt wurde, aktuelle Bankverbindung." },
        { field: "Arbeitgeberbescheinigung", instruction: "Der Arbeitgeber muss der Krankenkasse das Nettogehalt und den letzten Tag der Lohnfortzahlung mitteilen." },
      ],
      bs: [
        { field: "Ljekarsko uvjerenje", instruction: "Ljekar izdaje potvrdu o nesposobnosti (eAU) – od 2023. šalje se digitalno." },
        { field: "Obrazac za isplatu", instruction: "Nakon 6 sedmica osiguravajuća kuća šalje obrazac – popuniti i vratiti." },
        { field: "Potvrda poslodavca", instruction: "Poslodavac mora dostaviti neto platu i zadnji dan isplate." },
      ],
      en: [
        { field: "Medical certificate", instruction: "Doctor issues incapacity certificate (eAU) – sent digitally since 2023." },
        { field: "Payment form", instruction: "After 6 weeks, insurance sends payment form – fill out and return." },
        { field: "Employer certificate", instruction: "Employer must report net salary and last day of continued pay." },
      ],
    },
    documents: {
      de: ["AU-Bescheinigung (elektronisch seit 2023)", "Auszahlschein der Krankenkasse", "Arbeitgeberbescheinigung über Entgeltfortzahlung"],
      bs: ["Ljekarsko uvjerenje (elektronski od 2023.)", "Obrazac za isplatu", "Potvrda poslodavca"],
      en: ["Medical certificate (electronic since 2023)", "Insurance payment form", "Employer pay continuation certificate"],
    },
    processingTime: { de: "1–2 Wochen nach Eingang des Auszahlscheins", bs: "1–2 sedmice po prijemu obrasca", en: "1–2 weeks after form receipt" },
    commonMistakes: {
      de: ["Auszahlschein nicht rechtzeitig zurückgesendet", "AU-Bescheinigung hat Lücke (jeder Tag muss abgedeckt sein!)", "Arbeitgeberbescheinigung fehlt → Verzögerung"],
      bs: ["Obrazac nije vraćen na vrijeme", "Uvjerenje ima prazninu", "Nedostaje potvrda poslodavca"],
      en: ["Payment form not returned on time", "Medical certificate has a gap", "Missing employer certificate"],
    },
    officialPdf: "",
    onlineLink: "",
    officialInfoUrl: "https://www.bundesgesundheitsministerium.de/themen/krankenversicherung",
  },
  {
    slug: "pflegegrad",
    category: "gesundheit",
    title: { de: "Pflegegrad", bs: "Stepen njege (Pflegegrad)", en: "Care Level (Pflegegrad)" },
    who: {
      de: "Personen, die aufgrund von Krankheit oder Behinderung dauerhaft auf Pflege angewiesen sind.",
      bs: "Osobe koje su zbog bolesti ili invaliditeta trajno ovisne o njezi.",
      en: "Persons permanently dependent on care due to illness or disability.",
    },
    authority: { de: "Pflegekasse (bei Ihrer Krankenkasse)", bs: "Kasa za njegu (pri zdravstvenom osiguranju)", en: "Care Fund (at your health insurance)" },
    formName: { de: "Antrag auf Pflegeleistungen (formlos möglich)", bs: "Zahtjev za usluge njege (moguć neformalno)", en: "Application for Care Benefits (informal possible)" },
    steps: {
      de: [
        { field: "Antrag stellen", instruction: "Rufen Sie Ihre Pflegekasse an oder schreiben Sie formlos: 'Ich beantrage Leistungen der Pflegeversicherung für [Name, geb. am...]'. Kein spezielles Formular nötig." },
        { field: "Begutachtung vorbereiten", instruction: "Der MD (Medizinischer Dienst) kommt zur Begutachtung nach Hause. Führen Sie ein Pflegetagebuch: Wann braucht die Person Hilfe? Wie oft? Bei welchen Tätigkeiten?" },
        { field: "Begutachtungstermin", instruction: "Beim Termin alle Einschränkungen ehrlich zeigen – nichts beschönigen. Arztbriefe, Medikamentenliste und Pflegetagebuch bereithalten." },
        { field: "Bescheid prüfen", instruction: "Nach ca. 5 Wochen erhalten Sie den Bescheid mit dem Pflegegrad (1–5). Bei zu niedrigem Pflegegrad: Widerspruch innerhalb von 4 Wochen möglich." },
      ],
      bs: [
        { field: "Podnijeti zahtjev", instruction: "Pozovite kasu za njegu ili pišite neformalno." },
        { field: "Priprema za procjenu", instruction: "MD dolazi kući – vodite dnevnik njege." },
        { field: "Termin procjene", instruction: "Pokažite sve ograničenja – ne umanjujte." },
        { field: "Provjera rješenja", instruction: "Nakon ~5 sedmica dobijate rješenje. Prigovor u roku od 4 sedmice." },
      ],
      en: [
        { field: "Apply", instruction: "Call your care fund or write informally." },
        { field: "Prepare assessment", instruction: "MD visits home – keep a care diary." },
        { field: "Assessment appointment", instruction: "Show all limitations honestly." },
        { field: "Check decision", instruction: "After ~5 weeks you receive the decision. Appeal within 4 weeks." },
      ],
    },
    documents: {
      de: ["Ärztliche Unterlagen und Arztbriefe", "Aktuelle Medikamentenliste", "Pflegetagebuch (dringend empfohlen!)", "Ggf. Schwerbehindertenausweis"],
      bs: ["Ljekarska dokumentacija", "Lista lijekova", "Dnevnik njege (preporučeno!)", "Eventualno invalidska iskaznica"],
      en: ["Medical records", "Current medication list", "Care diary (strongly recommended!)", "Disability ID if applicable"],
    },
    processingTime: { de: "Max. 5 Wochen (gesetzliche Frist)", bs: "Max. 5 sedmica (zakonski rok)", en: "Max. 5 weeks (legal deadline)" },
    commonMistakes: {
      de: ["Pflegebedarf bei der Begutachtung heruntergespielt – ehrlich sein!", "Kein Pflegetagebuch geführt (wichtigstes Beweismittel)", "Arztbriefe nicht bereitgehalten", "Widerspruchsfrist verpasst (4 Wochen)"],
      bs: ["Potreba za njegom umanjivana – budite iskreni!", "Nije vođen dnevnik njege", "Ljekarski dopisi nisu pripremljeni", "Propušten rok za prigovor"],
      en: ["Care needs downplayed – be honest!", "No care diary kept", "Medical records not prepared", "Appeal deadline missed (4 weeks)"],
    },
    officialPdf: "",
    onlineLink: "",
    officialInfoUrl: "https://www.bundesgesundheitsministerium.de/themen/pflege",
  },
  {
    slug: "reha",
    category: "gesundheit",
    title: { de: "Reha-Antrag", bs: "Zahtjev za rehabilitaciju (Reha)", en: "Rehabilitation Application" },
    who: {
      de: "Versicherte, deren Erwerbsfähigkeit gefährdet ist und die medizinische Rehabilitation benötigen.",
      bs: "Osigurane osobe čija je radna sposobnost ugrožena i koje trebaju medicinsku rehabilitaciju.",
      en: "Insured persons whose employability is at risk and need medical rehabilitation.",
    },
    authority: { de: "Deutsche Rentenversicherung oder Krankenkasse", bs: "Njemačko penziono osiguranje ili zdravstveno osiguranje", en: "German Pension Insurance or Health Insurance" },
    formName: { de: "Antrag auf Leistungen zur medizinischen Rehabilitation (G0100)", bs: "Zahtjev za medicinsku rehabilitaciju (G0100)", en: "Application for Medical Rehabilitation (G0100)" },
    steps: {
      de: [
        { field: "Selbsteinschätzungsbogen (G0110)", instruction: "Gesundheitszustand detailliert beschreiben: Welche Beschwerden? Seit wann? Welche Einschränkungen im Alltag und Beruf?" },
        { field: "Ärztlicher Befundbericht (G0160)", instruction: "Ihr Hausarzt erstellt den Befundbericht. Wichtig: Arzt muss Rehabilitationsbedarf klar begründen und alle Diagnosen auflisten." },
        { field: "Arbeitgeberbescheinigung", instruction: "Aktuelle Beschäftigungssituation bestätigen lassen. Bei Arbeitslosigkeit: Bescheinigung der Agentur für Arbeit." },
      ],
      bs: [
        { field: "Samoprocjena (G0110)", instruction: "Detaljno opisati zdravstveno stanje i ograničenja." },
        { field: "Ljekarski nalaz (G0160)", instruction: "Porodični ljekar sastavlja nalaz sa svim dijagnozama." },
        { field: "Potvrda poslodavca", instruction: "Potvrditi trenutnu radnu situaciju." },
      ],
      en: [
        { field: "Self-assessment (G0110)", instruction: "Describe health status and limitations in detail." },
        { field: "Medical report (G0160)", instruction: "Family doctor creates report with all diagnoses." },
        { field: "Employer certificate", instruction: "Confirm current employment situation." },
      ],
    },
    documents: {
      de: ["Befundbericht G0160 (vom Hausarzt)", "Selbsteinschätzung G0110", "Arztbriefe und Befunde", "Medikamentenplan", "Arbeitgeberbescheinigung"],
      bs: ["Ljekarski nalaz G0160", "Samoprocjena G0110", "Ljekarski dopisi", "Plan lijekova", "Potvrda poslodavca"],
      en: ["Medical report G0160", "Self-assessment G0110", "Doctor's letters", "Medication plan", "Employer certificate"],
    },
    processingTime: { de: "3–6 Wochen", bs: "3–6 sedmica", en: "3–6 weeks" },
    commonMistakes: {
      de: ["Befundbericht unvollständig oder nicht detailliert genug", "Antrag bei falscher Stelle eingereicht (Rente vs. Krankenkasse)", "Selbsteinschätzung zu knapp ausgefüllt"],
      bs: ["Nepotpun ljekarski nalaz", "Zahtjev podnesen na pogrešnom mjestu", "Samoprocjena preskromno popunjena"],
      en: ["Incomplete medical report", "Application filed at wrong office", "Self-assessment too brief"],
    },
    officialPdf: "",
    onlineLink: "https://www.eservice-drv.de/SelfServiceWeb/",
    officialInfoUrl: "https://www.deutsche-rentenversicherung.de/DRV/DE/Reha/reha_node.html",
  },
  // ===================== BILDUNG =====================
  {
    slug: "bafoeg",
    category: "bildung",
    title: { de: "BAföG", bs: "BAföG (studentska potpora)", en: "BAföG (Student Aid)" },
    who: {
      de: "Studierende und Schüler, deren Eltern das Studium/die Ausbildung nicht finanzieren können.",
      bs: "Studenti i učenici čiji roditelji ne mogu finansirati studij/školovanje.",
      en: "Students whose parents cannot finance their education.",
    },
    authority: { de: "BAföG-Amt beim Studierendenwerk der Hochschule", bs: "BAföG-ured pri Studierendenwerk-u", en: "BAföG Office at Student Services" },
    formName: { de: "BAföG-Antrag (FormBlatt 1–8)", bs: "BAföG zahtjev (FormBlatt 1–8)", en: "BAföG Application (Form 1–8)" },
    steps: {
      de: [
        { field: "FormBlatt 1 (Hauptantrag)", instruction: "Persönliche Daten, Ausbildungsstätte (Name + Adresse der Hochschule), eigene Wohnung oder bei Eltern, Familienstand." },
        { field: "FormBlatt 3 (Elterneinkommen)", instruction: "Wird von Ihren Eltern ausgefüllt! Einkommen der Eltern aus dem vorletzten Kalenderjahr. Steuerbescheid der Eltern beifügen." },
        { field: "FormBlatt 5 (Leistungsnachweis)", instruction: "Ab dem 5. Semester: Nachweis über ausreichende Studienleistungen (von der Hochschule ausstellen lassen)." },
        { field: "Vermögenserklärung", instruction: "Eigenes Vermögen angeben: Konten, Sparverträge, Aktien, Kfz. Freibetrag: 15.000 € (unter 30 Jahre)." },
      ],
      bs: [
        { field: "FormBlatt 1", instruction: "Lični podaci, obrazovna ustanova, stan." },
        { field: "FormBlatt 3", instruction: "Popunjavaju roditelji! Primanja iz pretprošle kalendarske godine." },
        { field: "FormBlatt 5", instruction: "Od 5. semestra: dokaz o studijskom uspjehu." },
        { field: "Izjava o imovini", instruction: "Vlastita imovina. Freibetrag: 15.000 € (do 30 godina)." },
      ],
      en: [
        { field: "Form 1 (main)", instruction: "Personal data, educational institution, housing." },
        { field: "Form 3 (parental income)", instruction: "Filled by parents! Income from two years prior." },
        { field: "Form 5 (performance)", instruction: "From 5th semester: proof of sufficient academic performance." },
        { field: "Asset declaration", instruction: "Own assets. Exemption: €15,000 (under 30)." },
      ],
    },
    documents: {
      de: ["Immatrikulationsbescheinigung", "Steuerbescheid der Eltern (vorletztes Jahr)", "Mietvertrag (bei eigener Wohnung)", "Kontoauszüge (eigene Konten)", "Aufenthaltstitel (bei Nicht-EU)"],
      bs: ["Potvrda o upisu", "Porezno rješenje roditelja", "Ugovor o najmu", "Izvodi iz računa", "Boravišna dozvola"],
      en: ["Enrollment certificate", "Parents' tax notice (year before last)", "Rental contract", "Bank statements", "Residence permit (non-EU)"],
    },
    processingTime: { de: "6–10 Wochen (Antrag frühzeitig stellen!)", bs: "6–10 sedmica (podnijeti zahtjev na vrijeme!)", en: "6–10 weeks (apply early!)" },
    commonMistakes: {
      de: ["Antrag zu spät gestellt – BAföG gibt es nicht rückwirkend!", "FormBlatt 3 der Eltern fehlt (häufigster Fehler)", "Vermögen über Freibetrag nicht angegeben", "Leistungsnachweis ab 5. Semester vergessen"],
      bs: ["Zahtjev predan prekasno – BAföG nije retroaktivan!", "FormBlatt 3 roditelja nedostaje", "Imovina iznad limita nije navedena", "Zaboravljen dokaz o uspjehu od 5. semestra"],
      en: ["Application too late – no retroactive BAföG!", "Parents' Form 3 missing (most common error)", "Assets above exemption not declared", "Performance certificate from 5th semester forgotten"],
    },
    officialPdf: "",
    onlineLink: "https://www.bafoeg-digital.de",
    officialInfoUrl: "https://www.bafög.de",
  },
  {
    slug: "schueler-bafoeg",
    category: "bildung",
    title: { de: "Schüler-BAföG", bs: "Učenički BAföG", en: "Student BAföG (School)" },
    who: {
      de: "Schüler ab Klasse 10 an weiterführenden Schulen, Berufsfachschulen, Fachoberschulen – wenn sie nicht bei den Eltern wohnen können.",
      bs: "Učenici od 10. razreda na srednjim školama, stručnim školama – ako ne mogu živjeti kod roditelja.",
      en: "Students from grade 10 at secondary/vocational schools – if they cannot live with parents.",
    },
    authority: { de: "Amt für Ausbildungsförderung der Stadt oder des Kreises", bs: "Ured za obrazovnu potporu grada/okruga", en: "Training Support Office of city/county" },
    formName: { de: "BAföG-Antrag für Schüler (FormBlatt 1 + 3)", bs: "BAföG zahtjev za učenike", en: "BAföG Application for School Students" },
    steps: {
      de: [
        { field: "Schulbescheinigung", instruction: "Aktuelle Schulbescheinigung von der Schule ausstellen lassen und beifügen." },
        { field: "FormBlatt 3 (Elterneinkommen)", instruction: "Von den Eltern ausfüllen lassen: Einkommen aus dem vorletzten Kalenderjahr + Steuerbescheid beifügen." },
        { field: "Wohnsituation", instruction: "Angeben, ob Sie bei den Eltern oder in eigener Wohnung wohnen. Schüler-BAföG gibt es nur in bestimmten Fällen (z.B. Schule zu weit weg)." },
      ],
      bs: [
        { field: "Potvrda škole", instruction: "Priložiti aktuelnu potvrdu škole." },
        { field: "Primanja roditelja", instruction: "FormBlatt 3 dati roditeljima + porezno rješenje." },
        { field: "Stambena situacija", instruction: "Navesti da li živite kod roditelja ili samostalno." },
      ],
      en: [
        { field: "School certificate", instruction: "Attach current school certificate." },
        { field: "Parental income", instruction: "Have parents fill Form 3 + attach tax notice." },
        { field: "Living situation", instruction: "State whether living with parents or alone." },
      ],
    },
    documents: {
      de: ["Schulbescheinigung", "Steuerbescheid der Eltern", "Mietvertrag (bei eigener Wohnung)", "Kontoauszüge"],
      bs: ["Potvrda škole", "Porezno rješenje roditelja", "Ugovor o najmu", "Izvodi iz računa"],
      en: ["School certificate", "Parents' tax notice", "Rental contract", "Bank statements"],
    },
    processingTime: { de: "4–8 Wochen", bs: "4–8 sedmica", en: "4–8 weeks" },
    commonMistakes: {
      de: ["Schulbescheinigung fehlt", "Wichtig: Schüler-BAföG muss NICHT zurückgezahlt werden (Vollzuschuss!)", "Antrag nicht beim zuständigen Amt gestellt (Stadt/Kreis, nicht Studierendenwerk)"],
      bs: ["Nedostaje potvrda škole", "Učenički BAföG se NE mora vraćati!", "Zahtjev podnesen pogrešnom uredu"],
      en: ["Missing school certificate", "School BAföG does NOT need to be repaid!", "Application filed at wrong office"],
    },
    officialPdf: "",
    onlineLink: "https://www.bafoeg-digital.de",
    officialInfoUrl: "https://www.bafög.de",
  },
  {
    slug: "lernfoerderung",
    category: "bildung",
    title: { de: "Lernförderung", bs: "Dopunska nastava (Lernförderung)", en: "Learning Support" },
    who: {
      de: "Kinder aus Familien mit Bürgergeld, Wohngeld oder Kinderzuschlag, deren Lernziele gefährdet sind.",
      bs: "Djeca iz porodica sa Bürgergeld-om, Wohngeld-om ili Kinderzuschlag-om čiji su obrazovni ciljevi ugroženi.",
      en: "Children from families with Bürgergeld, Wohngeld, or Kinderzuschlag whose learning goals are at risk.",
    },
    authority: { de: "Jobcenter oder Kommune (BuT-Stelle)", bs: "Jobcenter ili općina (BuT-služba)", en: "Jobcenter or municipality (BuT office)" },
    formName: { de: "Antrag auf Lernförderung (Teil des Bildungs- und Teilhabepakets)", bs: "Zahtjev za dopunsku nastavu (dio BuT)", en: "Learning Support Application (part of BuT)" },
    steps: {
      de: [
        { field: "Bestätigung der Schule", instruction: "Der Lehrer oder die Schule bestätigt schriftlich, dass das Lernziel (Versetzung) gefährdet ist und Nachhilfe notwendig ist." },
        { field: "Nachhilfeanbieter benennen", instruction: "Nachhilfeanbieter (z.B. Schülerhilfe, Studienkreis oder privater Nachhilfelehrer) benennen. Kosten und Umfang der Nachhilfe angeben." },
        { field: "Antrag vor Beginn stellen", instruction: "Wichtig: Der Antrag muss VOR Beginn der Nachhilfe bewilligt werden. Rückwirkende Erstattung ist nicht möglich!" },
      ],
      bs: [
        { field: "Potvrda škole", instruction: "Nastavnik potvrđuje da je obrazovni cilj ugrožen." },
        { field: "Ponuđač instrukcija", instruction: "Navesti ponuđača i troškove instrukcija." },
        { field: "Zahtjev prije početka", instruction: "Zahtjev mora biti odobren PRIJE početka instrukcija!" },
      ],
      en: [
        { field: "School confirmation", instruction: "Teacher confirms learning goals are at risk." },
        { field: "Tutoring provider", instruction: "Name provider and state costs." },
        { field: "Apply before starting", instruction: "Application must be approved BEFORE tutoring starts!" },
      ],
    },
    documents: {
      de: ["Schulbestätigung über gefährdetes Lernziel", "Aktueller Leistungsbescheid (Bürgergeld/Wohngeld/KiZ)", "Kostenvoranschlag des Nachhilfeanbieters"],
      bs: ["Potvrda škole o ugroženom cilju", "Aktuelno rješenje", "Ponuda troškova instrukcija"],
      en: ["School confirmation of at-risk goals", "Current benefit notice", "Tutoring cost quote"],
    },
    processingTime: { de: "2–4 Wochen", bs: "2–4 sedmice", en: "2–4 weeks" },
    commonMistakes: {
      de: ["Schulbestätigung nicht eingereicht", "Nachhilfe vor Bewilligung begonnen (keine Erstattung!)", "Kostenvoranschlag des Anbieters fehlt"],
      bs: ["Potvrda škole nije dostavljena", "Instrukcije počele prije odobrenja", "Nedostaje ponuda troškova"],
      en: ["School confirmation not submitted", "Tutoring started before approval", "Missing cost quote"],
    },
    officialPdf: "",
    onlineLink: "",
    officialInfoUrl: "https://www.bmas.de/DE/Arbeit/Grundsicherung-Buergergeld/Bildungspaket/bildungspaket.html",
  },
  {
    slug: "kita-zuschuss",
    category: "bildung",
    title: { de: "Kita-Zuschuss", bs: "Subvencija za vrtić (Kita-Zuschuss)", en: "Daycare Subsidy" },
    who: {
      de: "Eltern mit geringem Einkommen, die die Kita-Gebühren nicht vollständig tragen können.",
      bs: "Roditelji sa niskim primanjima koji ne mogu u potpunosti pokriti troškove vrtića.",
      en: "Low-income parents unable to fully cover daycare fees.",
    },
    authority: { de: "Jugendamt der Stadt oder Gemeinde", bs: "Jugendamt grada ili općine", en: "Youth Welfare Office (Jugendamt)" },
    formName: { de: "Antrag auf Übernahme/Ermäßigung der Kita-Kosten", bs: "Zahtjev za pokrivanje/smanjenje troškova vrtića", en: "Application for Daycare Cost Coverage/Reduction" },
    steps: {
      de: [
        { field: "Kita-Vertrag", instruction: "Betreuungsvertrag mit der Kita beifügen. Daraus müssen die monatlichen Kosten und die Betreuungszeiten hervorgehen." },
        { field: "Einkommensnachweise", instruction: "Einkommensnachweise beider Eltern: Lohnabrechnungen (3 Monate), ggf. Bürgergeld-Bescheid, Kindergeld-Bescheid, Unterhalt." },
        { field: "Leistungsbescheid beifügen", instruction: "Falls Sie Bürgergeld, Wohngeld oder Kinderzuschlag erhalten: aktuellen Bescheid beifügen – in vielen Kommunen erhalten Sie dann automatisch volle Kostenübernahme." },
      ],
      bs: [
        { field: "Ugovor sa vrtićem", instruction: "Priložiti ugovor sa mjesečnim troškovima i satnicom." },
        { field: "Dokazi o primanjima", instruction: "Primanja oba roditelja: platne liste, rješenja." },
        { field: "Rješenje o naknadi", instruction: "Ako primate Bürgergeld/Wohngeld/KiZ: priložiti rješenje." },
      ],
      en: [
        { field: "Daycare contract", instruction: "Attach contract showing monthly costs and hours." },
        { field: "Income proof", instruction: "Both parents' income: pay slips, benefit notices." },
        { field: "Benefit notice", instruction: "If receiving Bürgergeld/Wohngeld/KiZ: attach notice." },
      ],
    },
    documents: {
      de: ["Kita-Betreuungsvertrag", "Einkommensnachweise beider Eltern (3 Monate)", "Geburtsurkunde des Kindes", "Ggf. Leistungsbescheid (Bürgergeld/Wohngeld/KiZ)"],
      bs: ["Ugovor sa vrtićem", "Dokazi o primanjima (3 mjeseca)", "Rodni list djeteta", "Eventualno rješenje o naknadi"],
      en: ["Daycare contract", "Income proof of both parents (3 months)", "Birth certificate", "Benefit notice if applicable"],
    },
    processingTime: { de: "4–6 Wochen", bs: "4–6 sedmica", en: "4–6 weeks" },
    commonMistakes: {
      de: ["Antrag zu spät gestellt – keine rückwirkende Erstattung!", "Kita-Vertrag fehlt", "Einkommensnachweise nicht vollständig (beide Eltern nötig)", "Falsches Jugendamt kontaktiert (zuständig ist das Jugendamt am Wohnort)"],
      bs: ["Zahtjev predan prekasno – nema retroaktivne naknade!", "Nedostaje ugovor sa vrtićem", "Nepotpuni dokazi o primanjima", "Kontaktiran pogrešan Jugendamt"],
      en: ["Application too late – no retroactive refund!", "Missing daycare contract", "Incomplete income proof (both parents needed)", "Wrong Jugendamt contacted"],
    },
    officialPdf: "",
    onlineLink: "",
    officialInfoUrl: "https://www.bmfsfj.de/bmfsfj/themen/familie/kinderbetreuung",
  },
  // ===================== FAMILIE (additional) =====================
  {
    slug: "mutterschaftsgeld",
    category: "familie",
    title: { de: "Mutterschaftsgeld", bs: "Porodiljski dodatak (Mutterschaftsgeld)", en: "Maternity Benefit" },
    who: {
      de: "Schwangere Arbeitnehmerinnen mit gesetzlicher Krankenversicherung während der Mutterschutzfristen.",
      bs: "Trudne zaposlenice sa zakonskim zdravstvenim osiguranjem tokom porodiljskog odsustva.",
      en: "Pregnant employees with statutory health insurance during maternity protection periods.",
    },
    authority: { de: "Krankenkasse + Arbeitgeber", bs: "Zdravstvena kasa + poslodavac", en: "Health Insurance + Employer" },
    formName: { de: "Antrag auf Mutterschaftsgeld", bs: "Zahtjev za porodiljski dodatak", en: "Maternity Benefit Application" },
    steps: {
      de: [
        { field: "Ärztliches Zeugnis", instruction: "Arzt oder Hebamme stellt Zeugnis über voraussichtlichen Entbindungstermin aus. Dieses wird bei Krankenkasse und Arbeitgeber eingereicht." },
        { field: "Antrag bei Krankenkasse", instruction: "Mutterschaftsgeld bei Ihrer Krankenkasse beantragen (online oder telefonisch). Die Kasse zahlt max. 13 €/Tag." },
        { field: "Arbeitgeberzuschuss", instruction: "Differenz zwischen 13 € und Ihrem Netto-Tageslohn zahlt der Arbeitgeber automatisch als Zuschuss." },
        { field: "Geburtsurkunde nachreichen", instruction: "Nach der Geburt: Geburtsurkunde an Krankenkasse senden für die Zeit nach der Entbindung." },
      ],
      bs: [
        { field: "Ljekarsko uvjerenje", instruction: "Ljekar izdaje uvjerenje o očekivanom terminu porođaja." },
        { field: "Zahtjev kod kase", instruction: "Podnijeti zahtjev kod zdravstvene kase. Kasa plaća max. 13 €/dan." },
        { field: "Dodatak poslodavca", instruction: "Razliku do neto dnevne plate plaća poslodavac." },
        { field: "Rodni list naknadno", instruction: "Nakon porođaja: dostaviti rodni list kasi." },
      ],
      en: [
        { field: "Medical certificate", instruction: "Doctor issues certificate of expected delivery date." },
        { field: "Apply at insurance", instruction: "Apply for maternity benefit. Insurance pays max. €13/day." },
        { field: "Employer supplement", instruction: "Employer pays the difference to your net daily wage." },
        { field: "Submit birth certificate", instruction: "After birth: send birth certificate to insurance." },
      ],
    },
    documents: {
      de: ["Ärztliches Zeugnis über Entbindungstermin", "Geburtsurkunde (nach Geburt)", "Lohnbescheinigung des Arbeitgebers"],
      bs: ["Ljekarsko uvjerenje o terminu porođaja", "Rodni list (nakon porođaja)", "Potvrda o plati od poslodavca"],
      en: ["Medical certificate of delivery date", "Birth certificate (after birth)", "Employer salary certificate"],
    },
    processingTime: { de: "1–2 Wochen", bs: "1–2 sedmice", en: "1–2 weeks" },
    commonMistakes: {
      de: ["Zu spät beantragt (spätestens 7 Wochen vor ET)", "Ärztliches Zeugnis nicht eingereicht", "Geburtsurkunde nach Geburt vergessen"],
      bs: ["Prekasno podneseno (najkasnije 7 sedmica prije termina)", "Ljekarsko uvjerenje nije dostavljeno", "Zaboravljen rodni list"],
      en: ["Applied too late (7 weeks before due date)", "Medical certificate not submitted", "Birth certificate forgotten after birth"],
    },
    officialPdf: "",
    onlineLink: "",
    officialInfoUrl: "https://www.bmfsfj.de/bmfsfj/themen/familie/familienleistungen/mutterschaftsleistungen",
  },
  {
    slug: "familienversicherung",
    category: "gesundheit",
    title: { de: "Familienversicherung", bs: "Porodično osiguranje (Familienversicherung)", en: "Family Insurance (co-insurance)" },
    who: {
      de: "Ehepartner und Kinder ohne eigenes Einkommen (über 520 €/Monat) können kostenlos über den Hauptversicherten mitversichert werden.",
      bs: "Supružnici i djeca bez vlastitih primanja (preko 520 €/mjesečno) mogu besplatno biti osigurani preko glavnog osiguranika.",
      en: "Spouses and children without own income (over €520/month) can be co-insured free of charge.",
    },
    authority: { de: "Gesetzliche Krankenkasse des Hauptversicherten", bs: "Zdravstvena kasa glavnog osiguranika", en: "Main insured's statutory health insurance" },
    formName: { de: "Antrag auf Familienversicherung", bs: "Zahtjev za porodično osiguranje", en: "Family Insurance Application" },
    steps: {
      de: [
        { field: "Antragsteller", instruction: "Das hauptversicherte Familienmitglied stellt den Antrag. Persönliche Daten und Versicherungsnummer angeben." },
        { field: "Familienangehörige", instruction: "Name, Geburtsdatum, Verwandtschaftsgrad (Ehepartner/Kind) des mitzuversichernden Angehörigen." },
        { field: "Einkommenserklärung", instruction: "Nachweis, dass der Angehörige kein oder geringes Einkommen hat (unter 520 €/Monat, bzw. 538 € bei Minijob)." },
        { field: "Heiratsurkunde/Geburtsurkunde", instruction: "Nachweis der Familienbeziehung: Heiratsurkunde oder Geburtsurkunde des Kindes." },
      ],
      bs: [
        { field: "Podnosilac", instruction: "Glavni osiguranik podnosi zahtjev sa ličnim podacima." },
        { field: "Član porodice", instruction: "Ime, datum rođenja, srodstvo (supružnik/dijete)." },
        { field: "Izjava o primanjima", instruction: "Dokaz da član nema ili ima mala primanja (ispod 520 €)." },
        { field: "Vjenčani/rodni list", instruction: "Dokaz o porodičnoj vezi." },
      ],
      en: [
        { field: "Applicant", instruction: "Main insured person applies with personal details." },
        { field: "Family member", instruction: "Name, date of birth, relation (spouse/child)." },
        { field: "Income declaration", instruction: "Proof of no/low income (under €520/month)." },
        { field: "Marriage/birth certificate", instruction: "Proof of family relationship." },
      ],
    },
    documents: {
      de: ["Heiratsurkunde oder Geburtsurkunde", "Einkommenserklärung/Einkommensnachweis", "Versicherungskarte des Hauptversicherten", "Ggf. Aufenthaltstitel"],
      bs: ["Vjenčani list ili rodni list", "Izjava/dokaz o primanjima", "Kartica osiguranja glavnog člana", "Eventualno boravišna dozvola"],
      en: ["Marriage or birth certificate", "Income declaration/proof", "Main member's insurance card", "Residence permit if applicable"],
    },
    processingTime: { de: "1–3 Wochen", bs: "1–3 sedmice", en: "1–3 weeks" },
    commonMistakes: {
      de: ["Einkommen des Angehörigen überschreitet die Grenze", "Heiratsurkunde nicht übersetzt/apostilliert", "Antrag nicht bei der richtigen Kasse gestellt"],
      bs: ["Primanja člana prelaze granicu", "Vjenčani list nije preveden/apostiliran", "Zahtjev podnesen kod pogrešne kase"],
      en: ["Family member's income exceeds limit", "Marriage certificate not translated/apostilled", "Application at wrong insurance"],
    },
    officialPdf: "",
    onlineLink: "",
    officialInfoUrl: "https://www.bundesgesundheitsministerium.de/themen/krankenversicherung",
  },
  {
    slug: "steuerklassenwechsel",
    category: "arbeit",
    title: { de: "Steuerklassenwechsel", bs: "Promjena porezne klase", en: "Tax Class Change" },
    who: {
      de: "Verheiratete Arbeitnehmer, die ihre Steuerklassenkombination optimieren möchten (z.B. III/V oder IV/IV).",
      bs: "Vjenčani zaposlenici koji žele optimizirati kombinaciju poreznih klasa.",
      en: "Married employees wanting to optimize their tax class combination.",
    },
    authority: { de: "Finanzamt (über Mein ELSTER)", bs: "Finanzamt (putem Mein ELSTER)", en: "Tax Office (via Mein ELSTER)" },
    formName: { de: "Antrag auf Steuerklassenwechsel bei Ehegatten/Lebenspartnern", bs: "Zahtjev za promjenu porezne klase", en: "Tax Class Change Application for Spouses" },
    steps: {
      de: [
        { field: "Kombination wählen", instruction: "Klasse III/V: Wenn ein Partner deutlich mehr verdient (III für den Mehrverdiener). Klasse IV/IV: Wenn beide ähnlich verdienen. IV/IV mit Faktor: Genaueste Verteilung." },
        { field: "Online über Mein ELSTER", instruction: "Auf elster.de einloggen → 'Formulare & Leistungen' → 'Antrag auf Steuerklassenwechsel'. Beide Partner müssen unterschreiben." },
        { field: "Alternativ: Beim Finanzamt", instruction: "Formular persönlich beim zuständigen Finanzamt abgeben. Beide Ehepartner müssen erscheinen oder Vollmacht mitbringen." },
        { field: "Arbeitgeber informieren", instruction: "Der Arbeitgeber wird automatisch über ELStAM informiert. Die neue Klasse gilt ab dem Folgemonat." },
      ],
      bs: [
        { field: "Odaberi kombinaciju", instruction: "III/V: Ako jedan partner znatno više zarađuje. IV/IV: Ako su plate slične." },
        { field: "Online putem Mein ELSTER", instruction: "Prijavite se na elster.de i podnesi zahtjev. Oba partnera moraju potpisati." },
        { field: "Alternativno: U Finanzamt-u", instruction: "Predati lično. Oba supružnika moraju doći ili donijeti punomoć." },
        { field: "Obavijestiti poslodavca", instruction: "Poslodavac se automatski obavještava putem ELStAM sistema." },
      ],
      en: [
        { field: "Choose combination", instruction: "III/V: One partner earns significantly more. IV/IV: Similar earnings." },
        { field: "Online via Mein ELSTER", instruction: "Log in at elster.de and submit application. Both must sign." },
        { field: "Alternative: At tax office", instruction: "Submit in person. Both spouses must appear or bring authorization." },
        { field: "Inform employer", instruction: "Employer is automatically notified via ELStAM." },
      ],
    },
    documents: {
      de: ["Personalausweis/Reisepass beider Ehepartner", "Steuer-ID beider Partner", "Heiratsurkunde (bei Erstwechsel)", "Ggf. Vollmacht (wenn nur ein Partner erscheint)"],
      bs: ["Lična karta/pasoš oba partnera", "Porezni ID oba partnera", "Vjenčani list (prvi put)", "Punomoć (ako dolazi samo jedan)"],
      en: ["ID of both spouses", "Tax ID of both", "Marriage certificate (first change)", "Authorization if only one appears"],
    },
    processingTime: { de: "1–4 Wochen", bs: "1–4 sedmice", en: "1–4 weeks" },
    commonMistakes: {
      de: ["Nur ein Partner unterschreibt (beide müssen!)", "Falsche Kombination gewählt — vorher Steuerrechner nutzen", "Vergessen den Arbeitgeber zu prüfen ob ELStAM aktualisiert wurde"],
      bs: ["Samo jedan partner potpisuje (moraju oba!)", "Pogrešna kombinacija — koristi kalkulator", "Zaboraviti provjeriti ELStAM kod poslodavca"],
      en: ["Only one spouse signs (both must!)", "Wrong combination — use tax calculator first", "Forgot to verify ELStAM update with employer"],
    },
    officialPdf: "",
    onlineLink: "https://www.elster.de/eportal/start",
    officialInfoUrl: "https://www.bundesfinanzministerium.de/Web/DE/Themen/Steuern/Steuerarten/Lohnsteuer/lohnsteuer.html",
  },
  {
    slug: "kirchenaustritt",
    category: "arbeit",
    title: { de: "Kirchenaustritt", bs: "Istupanje iz crkve (Kirchenaustritt)", en: "Church Exit (Kirchenaustritt)" },
    who: {
      de: "Personen, die in Deutschland Kirchensteuer zahlen und aus der Kirche austreten möchten.",
      bs: "Osobe koje u Njemačkoj plaćaju crkveni porez i žele istupiti iz crkve.",
      en: "Persons paying church tax in Germany who wish to leave the church.",
    },
    authority: { de: "Standesamt oder Amtsgericht (je nach Bundesland)", bs: "Standesamt ili Amtsgericht (zavisno od savezne države)", en: "Civil Registry Office or District Court" },
    formName: { de: "Erklärung des Kirchenaustritts", bs: "Izjava o istupanju iz crkve", en: "Church Exit Declaration" },
    steps: {
      de: [
        { field: "Zuständige Stelle finden", instruction: "Je nach Bundesland: Standesamt (z.B. NRW, Bayern) oder Amtsgericht (z.B. Hessen, Berlin). Online beim Bürgeramt nachsehen." },
        { field: "Termin vereinbaren", instruction: "Persönliches Erscheinen mit Personalausweis. In manchen Städten online-Termin möglich." },
        { field: "Erklärung unterschreiben", instruction: "Vor Ort die Austrittserklärung unterzeichnen. Wird sofort wirksam." },
        { field: "Bescheinigung aufbewahren", instruction: "Sie erhalten eine Austrittsbescheinigung. Diese für die Steuererklärung aufbewahren. Kirchensteuer entfällt ab dem Folgemonat." },
      ],
      bs: [
        { field: "Naći nadležnu instituciju", instruction: "Zavisno od savezne države: Standesamt ili Amtsgericht." },
        { field: "Zakazati termin", instruction: "Lično doći sa ličnom kartom." },
        { field: "Potpisati izjavu", instruction: "Na licu mjesta potpisati izjavu – odmah stupa na snagu." },
        { field: "Sačuvati potvrdu", instruction: "Dobijate potvrdu – čuvati za poreznu prijavu." },
      ],
      en: [
        { field: "Find responsible office", instruction: "Depends on state: civil registry or district court." },
        { field: "Make appointment", instruction: "Appear in person with ID." },
        { field: "Sign declaration", instruction: "Sign the exit declaration on-site — effective immediately." },
        { field: "Keep certificate", instruction: "You receive a certificate — keep for tax purposes." },
      ],
    },
    documents: {
      de: ["Personalausweis oder Reisepass", "Meldebescheinigung (manchmal)", "Ggf. Taufurkunde"],
      bs: ["Lična karta ili pasoš", "Potvrda o prijavi (ponekad)", "Eventualno krsni list"],
      en: ["ID or passport", "Registration certificate (sometimes)", "Baptism certificate (possibly)"],
    },
    processingTime: { de: "Sofort wirksam, Kirchensteuer entfällt ab Folgemonat", bs: "Odmah na snazi, crkveni porez otpada od sljedećeg mjeseca", en: "Effective immediately, church tax stops next month" },
    commonMistakes: {
      de: ["Per Brief oder E-Mail erklären (in den meisten Ländern nur persönlich möglich)", "Bescheinigung verlieren (braucht man für Steuererklärung)", "Kirchensteuer wird trotzdem noch einen Monat abgebucht"],
      bs: ["Pokušati pismom ili e-mailom (većinom samo lično)", "Izgubiti potvrdu", "Porez se još jedan mjesec naplaćuje"],
      en: ["Trying by letter or email (most states require in-person)", "Losing the certificate", "Tax still charged for one more month"],
    },
    officialPdf: "",
    onlineLink: "",
    officialInfoUrl: "https://www.kirchenaustritt.de",
  },
  {
    slug: "gez-anmeldung",
    category: "wohnen",
    title: { de: "GEZ / Rundfunkbeitrag Anmeldung", bs: "Prijava Rundfunkbeitrag (GEZ)", en: "Broadcasting Fee Registration (GEZ)" },
    who: {
      de: "Jeder Haushalt in Deutschland muss den Rundfunkbeitrag (18,36 €/Monat) zahlen.",
      bs: "Svako domaćinstvo u Njemačkoj mora plaćati Rundfunkbeitrag (18,36 €/mjesečno).",
      en: "Every household in Germany must pay the broadcasting fee (€18.36/month).",
    },
    authority: { de: "ARD ZDF Deutschlandradio Beitragsservice", bs: "ARD ZDF Deutschlandradio Beitragsservice", en: "ARD ZDF Deutschlandradio Beitragsservice" },
    formName: { de: "Anmeldung zum Rundfunkbeitrag", bs: "Prijava za Rundfunkbeitrag", en: "Broadcasting Fee Registration" },
    steps: {
      de: [
        { field: "Online anmelden", instruction: "Auf rundfunkbeitrag.de → 'Wohnung anmelden'. Name, Adresse und Einzugsdatum eingeben." },
        { field: "Zahlungsart wählen", instruction: "SEPA-Lastschrift (empfohlen), Überweisung oder Dauerauftrag. Zahlung monatlich, vierteljährlich, halbjährlich oder jährlich möglich." },
        { field: "Beitragsnummer erhalten", instruction: "Nach Anmeldung erhalten Sie Ihre Beitragsnummer per Post. Diese für alle Korrespondenz aufbewahren." },
        { field: "Befreiung prüfen", instruction: "Empfänger von Bürgergeld, BAföG oder Grundsicherung können sich befreien lassen. Antrag mit aktuellem Bescheid online stellen." },
      ],
      bs: [
        { field: "Online prijava", instruction: "Na rundfunkbeitrag.de prijaviti stan. Unijeti ime, adresu i datum useljenja." },
        { field: "Način plaćanja", instruction: "SEPA (preporučeno), uplata ili trajni nalog." },
        { field: "Beitragsnummer", instruction: "Dolazi poštom – čuvati za svu komunikaciju." },
        { field: "Oslobođenje", instruction: "Primaoci Bürgergeld-a, BAföG-a mogu se osloboditi." },
      ],
      en: [
        { field: "Register online", instruction: "At rundfunkbeitrag.de register your apartment." },
        { field: "Choose payment method", instruction: "SEPA direct debit (recommended), transfer, or standing order." },
        { field: "Receive number", instruction: "Contribution number arrives by mail — keep it." },
        { field: "Check exemption", instruction: "Bürgergeld, BAföG recipients can be exempt." },
      ],
    },
    documents: {
      de: ["Meldebescheinigung (zur Info)", "Ggf. Leistungsbescheid für Befreiung"],
      bs: ["Potvrda o prijavi (za informaciju)", "Eventualno rješenje za oslobođenje"],
      en: ["Registration certificate (for info)", "Benefit notice for exemption if applicable"],
    },
    processingTime: { de: "Sofort nach Online-Anmeldung aktiv", bs: "Odmah nakon online prijave", en: "Active immediately after online registration" },
    commonMistakes: {
      de: ["Anmeldung ignoriert — Schulden kumulieren sich!", "In WG doppelt angemeldet (nur einmal pro Wohnung)", "Befreiungsantrag ohne aktuellen Bescheid"],
      bs: ["Ignorisana prijava — dugovi rastu!", "U WG dupla prijava (samo jednom po stanu)", "Zahtjev za oslobođenje bez aktuelnog rješenja"],
      en: ["Ignoring registration — debts accumulate!", "Double registration in shared apartment", "Exemption request without current notice"],
    },
    officialPdf: "",
    onlineLink: "https://www.rundfunkbeitrag.de",
  },
  // ===================== BILDUNG (additional) =====================
  {
    slug: "bildungsgutschein",
    category: "bildung",
    title: { de: "Bildungsgutschein", bs: "Obrazovni vaučer (Bildungsgutschein)", en: "Education Voucher" },
    who: {
      de: "Arbeitslose, von Arbeitslosigkeit bedrohte Personen oder Beschäftigte, die eine berufliche Weiterbildung benötigen.",
      bs: "Nezaposleni, osobe kojima prijeti nezaposlenost ili zaposleni koji trebaju stručno usavršavanje.",
      en: "Unemployed, at-risk of unemployment, or employees needing professional development.",
    },
    authority: { de: "Agentur für Arbeit oder Jobcenter", bs: "Agencija za rad ili Jobcenter", en: "Employment Agency or Jobcenter" },
    formName: { de: "Antrag auf Bildungsgutschein", bs: "Zahtjev za obrazovni vaučer", en: "Education Voucher Application" },
    steps: {
      de: [
        { field: "Beratungsgespräch", instruction: "Termin beim Arbeitsberater vereinbaren. Dort werden Ihre berufliche Situation und Weiterbildungsmöglichkeiten besprochen." },
        { field: "Weiterbildung auswählen", instruction: "Kurs muss AZAV-zertifiziert sein. Anbieter: z.B. IHK, Volkshochschule, private Bildungsträger. Die Maßnahme muss zur beruflichen Eingliederung beitragen." },
        { field: "Bildungsgutschein beantragen", instruction: "Nach positivem Gespräch erhalten Sie den Gutschein. Dieser ist zeitlich begrenzt (3 Monate gültig) und zweckgebunden." },
        { field: "Bei Bildungsträger einlösen", instruction: "Bildungsgutschein beim gewählten Anbieter einreichen und Kurs beginnen." },
      ],
      bs: [
        { field: "Savjetodavni razgovor", instruction: "Zakazati termin kod savjetnika za zapošljavanje." },
        { field: "Odabrati kurs", instruction: "Kurs mora biti AZAV-certificiran." },
        { field: "Zatražiti vaučer", instruction: "Vaučer je vremenski ograničen (3 mjeseca) i namjenski vezan." },
        { field: "Iskoristiti kod ponuđača", instruction: "Predati vaučer kod izabranog ponuđača i početi kurs." },
      ],
      en: [
        { field: "Counseling appointment", instruction: "Schedule appointment with employment counselor." },
        { field: "Choose course", instruction: "Course must be AZAV-certified." },
        { field: "Request voucher", instruction: "Voucher is time-limited (3 months) and purpose-bound." },
        { field: "Redeem at provider", instruction: "Submit voucher to chosen provider and start course." },
      ],
    },
    documents: {
      de: ["Lebenslauf", "Zeugnisse und Qualifikationsnachweise", "Ggf. Kündigungsschreiben", "Kostenvoranschlag des Bildungsträgers"],
      bs: ["Biografija", "Svjedočanstva i kvalifikacije", "Eventualno otkaz", "Ponuda troškova ponuđača"],
      en: ["CV", "Certificates and qualifications", "Termination letter if applicable", "Cost quote from provider"],
    },
    processingTime: { de: "2–4 Wochen", bs: "2–4 sedmice", en: "2–4 weeks" },
    commonMistakes: {
      de: ["Kurs ohne Bildungsgutschein begonnen (keine nachträgliche Kostenübernahme!)", "Nicht AZAV-zertifizierten Kurs gewählt", "Gutschein verfallen lassen (3 Monate Gültigkeit)"],
      bs: ["Kurs počet bez vaučera (nema retroaktivnog pokrivanja!)", "Kurs nije AZAV-certificiran", "Vaučer istekao (3 mjeseca)"],
      en: ["Started course without voucher (no retroactive coverage!)", "Chose non-AZAV-certified course", "Let voucher expire (3 months)"],
    },
    officialPdf: "",
    onlineLink: "",
    officialInfoUrl: "https://www.arbeitsagentur.de/karriere-und-weiterbildung/bildungsgutschein",
  },
  {
    slug: "integrationskurs",
    category: "bildung",
    title: { de: "Integrationskurs", bs: "Integracijski kurs", en: "Integration Course" },
    who: {
      de: "Neuzuwanderer mit Aufenthaltstitel, EU-Bürger und deutsche Staatsangehörige mit Migrationshintergrund, die Deutsch lernen möchten/müssen.",
      bs: "Novopridošli sa boravišnom dozvolom, EU građani i njemački državljani sa migrantskim porijeklom.",
      en: "New immigrants with residence permits, EU citizens, and German nationals with migration background.",
    },
    authority: { de: "BAMF (Bundesamt für Migration und Flüchtlinge)", bs: "BAMF (Savezni ured za migracije)", en: "BAMF (Federal Office for Migration and Refugees)" },
    formName: { de: "Antrag auf Zulassung zu einem Integrationskurs", bs: "Zahtjev za pristup integracijskom kursu", en: "Application for Integration Course Admission" },
    steps: {
      de: [
        { field: "Berechtigung prüfen", instruction: "Ausländerbehörde teilt mit, ob Kurs verpflichtend ist. Freiwillige Teilnahme möglich bei EU-Bürgern oder Deutschen mit Bedarf." },
        { field: "Antrag beim BAMF", instruction: "Antrag auf Zulassung online oder per Post beim BAMF stellen. Berechtigungsschein wird ausgestellt." },
        { field: "Kursträger auswählen", instruction: "Auf bamf.de nach Kursträgern in Ihrer Stadt suchen. Einstufungstest beim Kursträger (bestimmt Startniveau)." },
        { field: "Kurs absolvieren", instruction: "600 Stunden Sprachkurs (A1-B1) + 100 Stunden Orientierungskurs (Leben in Deutschland). Abschlusstest: DTZ (Deutsch-Test für Zuwanderer)." },
      ],
      bs: [
        { field: "Provjera prava", instruction: "Ausländerbehörde javlja da li je kurs obavezan." },
        { field: "Zahtjev kod BAMF-a", instruction: "Podnijeti zahtjev za pristup online ili poštom." },
        { field: "Odabrati ponuđača", instruction: "Na bamf.de pronaći ponuđače u svom gradu." },
        { field: "Pohađati kurs", instruction: "600 sati jezika (A1-B1) + 100 sati orijentacije. Ispit: DTZ." },
      ],
      en: [
        { field: "Check eligibility", instruction: "Immigration office informs if course is mandatory." },
        { field: "Apply at BAMF", instruction: "Submit application online or by mail." },
        { field: "Choose provider", instruction: "Search for providers on bamf.de." },
        { field: "Complete course", instruction: "600 hours language (A1-B1) + 100 hours orientation. Final test: DTZ." },
      ],
    },
    documents: {
      de: ["Berechtigungsschein vom BAMF oder Verpflichtung der Ausländerbehörde", "Aufenthaltstitel oder Meldebescheinigung", "Personalausweis/Reisepass"],
      bs: ["Potvrda od BAMF-a ili obaveza od Ausländerbehörde", "Boravišna dozvola ili potvrda o prijavi", "Lična karta/pasoš"],
      en: ["BAMF authorization or immigration office obligation", "Residence permit or registration certificate", "ID/passport"],
    },
    processingTime: { de: "2–4 Wochen bis zum Kursbeginn", bs: "2–4 sedmice do početka kursa", en: "2–4 weeks until course start" },
    commonMistakes: {
      de: ["Verpflichtenden Kurs nicht besucht → Sanktionen möglich!", "Zu spät angemeldet (lange Wartelisten)", "Einstufungstest versäumt → falsches Niveau"],
      bs: ["Obavezni kurs neposjećen → moguće sankcije!", "Prekasno prijavljen (duge liste čekanja)", "Propušten test razvrstavanja"],
      en: ["Mandatory course skipped → sanctions possible!", "Registered too late (long waiting lists)", "Missed placement test → wrong level"],
    },
    officialPdf: "",
    onlineLink: "",
    officialInfoUrl: "https://www.bamf.de/DE/Themen/Integration/ZuijAndInDeutschl/Integrationskurse/integrationskurse-node.html",
  },
  // ===================== DOKUMENTE =====================
  {
    slug: "fuehrungszeugnis",
    category: "arbeit",
    title: { de: "Führungszeugnis", bs: "Potvrda o nekažnjavanju (Führungszeugnis)", en: "Certificate of Good Conduct" },
    who: {
      de: "Jede Person ab 14 Jahren mit Wohnsitz in Deutschland kann ein Führungszeugnis beantragen.",
      bs: "Svaka osoba starija od 14 godina sa prebivalištem u Njemačkoj može zatražiti potvrdu o nekažnjavanju.",
      en: "Anyone aged 14+ residing in Germany can apply for a certificate of good conduct.",
    },
    authority: { de: "Bürgeramt / Bundesamt für Justiz", bs: "Bürgeramt / Savezni ured za pravosuđe", en: "Citizens' Office / Federal Office of Justice" },
    formName: { de: "Antrag auf Erteilung eines Führungszeugnisses", bs: "Zahtjev za izdavanje potvrde o nekažnjavanju", en: "Application for Certificate of Good Conduct" },
    steps: {
      de: [
        { field: "Persönliche Daten", instruction: "Name, Geburtsdatum, Geburtsort, aktuelle Anschrift angeben. Personalausweis oder Reisepass mitbringen." },
        { field: "Art des Zeugnisses", instruction: "Privates Führungszeugnis (Belegart N) für persönliche Zwecke oder erweitertes Führungszeugnis (Belegart NE) für Arbeit mit Kindern/Jugendlichen." },
        { field: "Antragstellung", instruction: "Online über bundesjustizamt.de mit neuem Personalausweis (eID) oder persönlich beim Bürgeramt. Gebühr: 13 €." },
        { field: "Zustellung", instruction: "Wird per Post an Ihre Meldeadresse geschickt. Bearbeitungszeit ca. 1–2 Wochen." },
      ],
      bs: [
        { field: "Lični podaci", instruction: "Ime, datum rođenja, mjesto rođenja, adresa. Ponijeti ličnu kartu ili pasoš." },
        { field: "Vrsta potvrde", instruction: "Privatna (Belegart N) ili proširena (Belegart NE) za rad sa djecom." },
        { field: "Podnošenje zahtjeva", instruction: "Online putem bundesjustizamt.de sa eID ili lično u Bürgeramt-u. Cijena: 13 €." },
        { field: "Dostava", instruction: "Šalje se poštom na prijavljenu adresu. Obrada: 1–2 sedmice." },
      ],
      en: [
        { field: "Personal data", instruction: "Name, date of birth, place of birth, address. Bring ID or passport." },
        { field: "Type of certificate", instruction: "Private (type N) or extended (type NE) for work with children." },
        { field: "Application", instruction: "Online at bundesjustizamt.de with eID or in person at citizens' office. Fee: €13." },
        { field: "Delivery", instruction: "Sent by mail to registered address. Processing: 1–2 weeks." },
      ],
    },
    documents: {
      de: ["Personalausweis oder Reisepass", "13 € Gebühr", "Ggf. Aufforderung des Arbeitgebers (für erweitertes Zeugnis)"],
      bs: ["Lična karta ili pasoš", "13 € naknada", "Eventualno zahtjev poslodavca (za proširenu potvrdu)"],
      en: ["ID or passport", "€13 fee", "Employer request if applicable (for extended certificate)"],
    },
    processingTime: { de: "1–2 Wochen", bs: "1–2 sedmice", en: "1–2 weeks" },
    commonMistakes: {
      de: ["Falsche Belegart gewählt (N vs. NE)", "Online-Antrag ohne eID-Funktion versucht", "Adresse stimmt nicht mit Meldebescheinigung überein"],
      bs: ["Pogrešna vrsta potvrde (N vs. NE)", "Online zahtjev bez eID funkcije", "Adresa se ne poklapa sa prijavom"],
      en: ["Wrong certificate type (N vs. NE)", "Online application without eID", "Address doesn't match registration"],
    },
    officialPdf: "",
    onlineLink: "https://www.bundesjustizamt.de/DE/Themen/Buergerdienste/BZR/FZ_node.html",
  },
  {
    slug: "aufenthaltstitel-verlaengerung",
    category: "arbeit",
    title: { de: "Aufenthaltstitel Verlängerung", bs: "Produženje boravišne dozvole", en: "Residence Permit Extension" },
    who: {
      de: "Nicht-EU-Bürger mit befristetem Aufenthaltstitel, der vor Ablauf verlängert werden muss.",
      bs: "Državljani koji nisu iz EU sa privremenom boravišnom dozvolom koja se mora produžiti prije isteka.",
      en: "Non-EU citizens with a temporary residence permit that must be extended before expiry.",
    },
    authority: { de: "Ausländerbehörde (ABH) der Stadt", bs: "Ausländerbehörde (ABH) grada", en: "Immigration Office (ABH)" },
    formName: { de: "Antrag auf Verlängerung des Aufenthaltstitels", bs: "Zahtjev za produženje boravišne dozvole", en: "Application for Residence Permit Extension" },
    steps: {
      de: [
        { field: "Frühzeitig beantragen", instruction: "Antrag mindestens 6–8 Wochen vor Ablauf stellen. Bei rechtzeitigem Antrag gilt eine Fiktionsbescheinigung." },
        { field: "Persönliche Daten", instruction: "Name, Geburtsdatum, Staatsangehörigkeit, Passnummer, aktuelle Adresse, Aufenthaltszweck." },
        { field: "Nachweise beifügen", instruction: "Arbeitsvertrag, Mietvertrag, Krankenversicherungsnachweis, Gehaltsabrechnungen, ggf. Sprachzertifikat." },
        { field: "Termin vereinbaren", instruction: "Bei der Ausländerbehörde online Termin buchen. Alle Originale und Kopien mitbringen." },
      ],
      bs: [
        { field: "Pravovremeno podnijeti", instruction: "Zahtjev podnijeti najmanje 6–8 sedmica prije isteka. Uz pravovremeni zahtjev važi fiktivna dozvola." },
        { field: "Lični podaci", instruction: "Ime, datum rođenja, državljanstvo, broj pasoša, adresa, svrha boravka." },
        { field: "Priložiti dokaze", instruction: "Ugovor o radu, ugovor o najmu, zdravstveno osiguranje, platne liste, jezički certifikat." },
        { field: "Zakazati termin", instruction: "Online zakazati termin kod Ausländerbehörde. Ponijeti sve originale i kopije." },
      ],
      en: [
        { field: "Apply early", instruction: "Apply at least 6–8 weeks before expiry. Timely application triggers a fiction certificate." },
        { field: "Personal data", instruction: "Name, date of birth, nationality, passport number, address, purpose of stay." },
        { field: "Attach proof", instruction: "Employment contract, rental contract, health insurance, pay slips, language certificate." },
        { field: "Book appointment", instruction: "Book appointment online at immigration office. Bring all originals and copies." },
      ],
    },
    documents: {
      de: ["Gültiger Reisepass", "Aktueller Aufenthaltstitel", "Biometrisches Passfoto", "Arbeitsvertrag + Gehaltsabrechnungen", "Mietvertrag", "Krankenversicherungsnachweis", "Ggf. Sprachzertifikat (A1/B1)"],
      bs: ["Važeći pasoš", "Aktuelna boravišna dozvola", "Biometrijska fotografija", "Ugovor o radu + platne liste", "Ugovor o najmu", "Zdravstveno osiguranje", "Jezički certifikat (A1/B1)"],
      en: ["Valid passport", "Current residence permit", "Biometric photo", "Employment contract + pay slips", "Rental contract", "Health insurance proof", "Language certificate (A1/B1)"],
    },
    processingTime: { de: "4–12 Wochen (je nach ABH)", bs: "4–12 sedmica (zavisno od ABH)", en: "4–12 weeks (depends on ABH)" },
    commonMistakes: {
      de: ["Antrag zu spät gestellt — Aufenthalt wird illegal!", "Reisepass abgelaufen", "Keine Krankenversicherung nachgewiesen", "Fehlende Gehaltsabrechnungen"],
      bs: ["Zahtjev predan prekasno — boravak postaje nelegalan!", "Pasoš istekao", "Nema dokaza o zdravstvenom osiguranju", "Nedostaju platne liste"],
      en: ["Applied too late — stay becomes illegal!", "Passport expired", "No health insurance proof", "Missing pay slips"],
    },
    officialPdf: "",
    onlineLink: "",
    officialInfoUrl: "https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwijAndInDeutschl/Aufenthaltstitel/aufenthaltstitel-node.html",
  },
  {
    slug: "anmeldung",
    category: "wohnen",
    title: { de: "Anmeldung (Wohnsitz)", bs: "Prijava prebivališta (Anmeldung)", en: "Residence Registration (Anmeldung)" },
    who: {
      de: "Jede Person, die in Deutschland eine Wohnung bezieht – innerhalb von 14 Tagen nach Einzug.",
      bs: "Svaka osoba koja se useljava u stan u Njemačkoj — u roku od 14 dana od useljenja.",
      en: "Anyone moving into an apartment in Germany — within 14 days of moving in.",
    },
    authority: { de: "Bürgeramt / Einwohnermeldeamt", bs: "Bürgeramt / Einwohnermeldeamt", en: "Citizens' Office / Registration Office" },
    formName: { de: "Anmeldung einer Wohnung", bs: "Prijava stana", en: "Residence Registration Form" },
    steps: {
      de: [
        { field: "Termin buchen", instruction: "Online-Termin beim Bürgeramt buchen. In Großstädten oft wochenlange Wartezeit — sofort nach Einzug buchen!" },
        { field: "Wohnungsgeberbestätigung", instruction: "Vermieter muss die Wohnungsgeberbestätigung ausfüllen und unterschreiben. Ohne dieses Dokument keine Anmeldung möglich." },
        { field: "Persönliche Daten", instruction: "Name, Geburtsdatum, Staatsangehörigkeit, bisherige Adresse, neue Adresse, Einzugsdatum angeben." },
        { field: "Anmeldung abschließen", instruction: "Meldebescheinigung sofort mitnehmen. Diese brauchen Sie für: Bankkonto, Steuer-ID, Krankenversicherung, Arbeitsvertrag." },
      ],
      bs: [
        { field: "Zakazati termin", instruction: "Online rezervisati termin u Bürgeramt-u. U velikim gradovima čekanje sedmicama — odmah rezervisati!" },
        { field: "Potvrda stanodavca", instruction: "Stanodavac mora popuniti i potpisati Wohnungsgeberbestätigung. Bez ovog dokumenta prijava nije moguća." },
        { field: "Lični podaci", instruction: "Ime, datum rođenja, državljanstvo, prethodna adresa, nova adresa, datum useljenja." },
        { field: "Završetak prijave", instruction: "Odmah preuzeti Meldebescheinigung. Treba vam za: banku, porezni ID, osiguranje, posao." },
      ],
      en: [
        { field: "Book appointment", instruction: "Book online at citizens' office. In big cities, weeks of waiting — book immediately!" },
        { field: "Landlord confirmation", instruction: "Landlord must fill out and sign the Wohnungsgeberbestätigung. No registration without it." },
        { field: "Personal data", instruction: "Name, date of birth, nationality, previous address, new address, move-in date." },
        { field: "Complete registration", instruction: "Take the Meldebescheinigung immediately. Needed for: bank, tax ID, insurance, work." },
      ],
    },
    documents: {
      de: ["Personalausweis oder Reisepass", "Wohnungsgeberbestätigung (vom Vermieter)", "Mietvertrag (empfohlen)", "Ggf. Heiratsurkunde / Geburtsurkunde"],
      bs: ["Lična karta ili pasoš", "Potvrda stanodavca (Wohnungsgeberbestätigung)", "Ugovor o najmu (preporučeno)", "Eventualno vjenčani list / rodni list"],
      en: ["ID or passport", "Landlord confirmation (Wohnungsgeberbestätigung)", "Rental contract (recommended)", "Marriage/birth certificate if applicable"],
    },
    processingTime: { de: "Sofort (Meldebescheinigung wird vor Ort ausgestellt)", bs: "Odmah (Meldebescheinigung se izdaje na licu mjesta)", en: "Immediately (certificate issued on-site)" },
    commonMistakes: {
      de: ["Frist von 14 Tagen verpasst (Bußgeld möglich!)", "Wohnungsgeberbestätigung fehlt", "Termin zu spät gebucht (Wartezeiten!)", "Alte Adresse nicht abgemeldet bei Umzug aus dem Ausland"],
      bs: ["Propušten rok od 14 dana (moguća kazna!)", "Nedostaje potvrda stanodavca", "Termin prekasno rezervisan", "Stara adresa nije odjavljena pri dolasku iz inostranstva"],
      en: ["14-day deadline missed (fine possible!)", "Missing landlord confirmation", "Appointment booked too late", "Old address not deregistered when moving from abroad"],
    },
    officialPdf: "",
    onlineLink: "",
    officialInfoUrl: "https://www.bmi.bund.de/DE/themen/moderne-verwaltung/verwaltungsrecht/meldewesen/meldewesen-node.html",
  },
  {
    slug: "wbs",
    category: "wohnen",
    title: { de: "Wohnberechtigungsschein (WBS)", bs: "Potvrda o pravu na stan (WBS)", en: "Housing Entitlement Certificate (WBS)" },
    who: {
      de: "Personen mit geringem Einkommen, die eine Sozialwohnung (geförderte Wohnung) suchen.",
      bs: "Osobe sa niskim primanjima koje traže socijalni stan (subvencionirani stan).",
      en: "Low-income individuals looking for social/subsidized housing.",
    },
    authority: { de: "Wohnungsamt der Stadt oder Gemeinde", bs: "Stambeni ured grada ili općine", en: "Housing Office of city or municipality" },
    formName: { de: "Antrag auf Wohnberechtigungsschein", bs: "Zahtjev za WBS", en: "WBS Application" },
    steps: {
      de: [
        { field: "Einkommensgrenzen prüfen", instruction: "WBS wird nur erteilt, wenn das Jahreseinkommen unter der Einkommensgrenze liegt. Diese variiert je nach Bundesland und Haushaltsgröße." },
        { field: "Persönliche Daten", instruction: "Name, Anschrift, Haushaltsgröße, aktuelle Wohnsituation, Anzahl der benötigten Zimmer." },
        { field: "Einkommensnachweise", instruction: "Brutto-Jahreseinkommen aller Haushaltsmitglieder: Gehaltsabrechnungen, Steuerbescheid, Kindergeld, Unterhalt." },
        { field: "WBS erhalten", instruction: "Bei Bewilligung erhalten Sie den WBS für 1 Jahr. Damit können Sie sich auf geförderte Wohnungen bewerben." },
      ],
      bs: [
        { field: "Provjera granica primanja", instruction: "WBS se izdaje samo ako su godišnja primanja ispod limita. Limiti variraju po saveznoj državi i veličini domaćinstva." },
        { field: "Lični podaci", instruction: "Ime, adresa, veličina domaćinstva, trenutna stambena situacija, broj potrebnih soba." },
        { field: "Dokazi o primanjima", instruction: "Bruto godišnja primanja svih članova: platne liste, porezno rješenje, Kindergeld, alimentacija." },
        { field: "Dobijanje WBS-a", instruction: "Po odobrenju dobijate WBS na 1 godinu. Sa njim se možete prijaviti za subvencionirane stanove." },
      ],
      en: [
        { field: "Check income limits", instruction: "WBS only issued if annual income is below the limit. Limits vary by state and household size." },
        { field: "Personal data", instruction: "Name, address, household size, current housing situation, number of rooms needed." },
        { field: "Income proof", instruction: "Gross annual income of all household members: pay slips, tax notice, child benefit, maintenance." },
        { field: "Receive WBS", instruction: "If approved, you receive the WBS for 1 year. Use it to apply for subsidized housing." },
      ],
    },
    documents: {
      de: ["Einkommensnachweise (12 Monate)", "Meldebescheinigung", "Mietvertrag (aktuell)", "Personalausweis/Reisepass", "Ggf. Schwangerschaftsnachweis oder Schwerbehindertenausweis"],
      bs: ["Dokazi o primanjima (12 mjeseci)", "Potvrda o prijavi", "Ugovor o najmu (aktuelni)", "Lična karta/pasoš", "Eventualno potvrda o trudnoći ili invalidska iskaznica"],
      en: ["Income proof (12 months)", "Registration certificate", "Rental contract (current)", "ID/passport", "Pregnancy or disability certificate if applicable"],
    },
    processingTime: { de: "2–6 Wochen", bs: "2–6 sedmica", en: "2–6 weeks" },
    commonMistakes: {
      de: ["Einkommensgrenze knapp überschritten — Freibeträge vergessen!", "Nicht alle Haushaltsmitglieder angegeben", "WBS abgelaufen und nicht rechtzeitig erneuert"],
      bs: ["Primanja malo iznad granice — zaboravljeni odbitci!", "Nisu navedeni svi članovi domaćinstva", "WBS istekao i nije obnovljen na vrijeme"],
      en: ["Income slightly over limit — forgot deductions!", "Not all household members listed", "WBS expired and not renewed on time"],
    },
    officialPdf: "",
    onlineLink: "",
    officialInfoUrl: "https://www.bmwsb.bund.de/Webs/BMWSB/DE/themen/stadt-wohnen/wohnraumfoerderung/wohnraumfoerderung-node.html",
  },
];

export function getGuidesByCategory(category: Guide["category"]) {
  return guides.filter((g) => g.category === category);
}

export function getGuideBySlug(slug: string) {
  return guides.find((g) => g.slug === slug);
}
