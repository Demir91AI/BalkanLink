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
    onlineLink: "https://www.arbeitsagentur.de/familie-und-kinder/kindergeld",
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
      de: 'Antrag auf Elterngeld (landesspezifisch) – Zuständige Elterngeldstelle über die Suche „Beratung vor Ort" auf familienportal.de ermitteln. Antragsformulare des jeweiligen Bundeslandes auf familienportal.de (Rubrik „Antragsformulare") herunterladen. Formulare auch erhältlich bei: Elterngeldstelle, Gemeindeverwaltungen, Krankenkassen, Krankenhäuser mit Geburtenstation. WICHTIG: Antrag erst NACH der Geburt möglich, max. 3 Monate rückwirkend. Pro Elternteil nur EIN Antrag pro Kind (auch bei Mehrlingen). Anderer Elternteil muss mitunterschreiben. Einreichung: Per Post an die zuständige Dienststelle ODER digital über den Service ElterngeldDigital (in allen Bundesländern verfügbar). Online mit Registrierung: schnellere Bearbeitung, weniger Rückfragen, gezielte Antragsführung, individuelle Checkliste, Dokumentenupload, Vorabausfüllen 6 Monate vor Geburt, Speicherfunktion, Druckservice, Sachstandsauskunft & Zahlungsinfo, Änderungsmitteilungen online, elektronische Unterschrift. Online ohne Registrierung: schnellere Bearbeitung, gezielte Antragsführung, individuelle Checkliste, Druckservice, Hilfefunktionen.',
      bs: 'Zahtjev za roditeljski dodatak (zavisi od savezne države) – Nadležnu Elterngeldstelle pronaći putem pretrage „Beratung vor Ort" na familienportal.de. Formulare savezne države preuzeti na familienportal.de (rubrika „Antragsformulare"). Formulari dostupni i na: Elterngeldstelle, općinskim upravama (Gemeindeverwaltungen), zdravstvenim kasama (Krankenkassen), bolnicama sa porodilištem. VAŽNO: Zahtjev moguć tek NAKON porođaja, retroaktivno max. 3 mjeseca. Jedan zahtjev po roditelju po djetetu (i kod blizanaca). Drugi roditelj mora supotpisati. Podnošenje: poštom na adresu nadležne službe ILI digitalno putem servisa ElterngeldDigital (dostupan u svim saveznim državama). Online sa registracijom: brža obrada, manje pitanja, pametno vođenje, checklista, upload dokumenata, popunjavanje 6 mj. prije porođaja, čuvanje/nastavak, print-servis, uvid u status i isplate, online prijava promjena, elektronski potpis. Online bez registracije: brža obrada, pametno vođenje, checklista, print-servis, pomoćne funkcije.',
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
    authority: {
      de: "Dezentral organisiert – zuständig ist je nach Grundleistung: Jobcenter (bei Bürgergeld), Kommune/Kreisverwaltung/Sozialamt (bei Wohngeld oder Kinderzuschlag) oder Sozialamt (bei Asylbewerberleistungen). Die zuständige Anlaufstelle für Ihr Bundesland finden Sie über den BMAS-Anlaufstellen-Finder: bmas.de → Bildungspaket → Anlaufstellen.",
      bs: "Decentralno organizovano – nadležna služba zavisi od osnovne naknade: Jobcenter (za Bürgergeld), općina/okrug/Sozialamt (za Wohngeld ili Kinderzuschlag) ili Sozialamt (za primaoce pomoći za azilante). Nadležnu službu za vašu saveznu zemlju možete pronaći na BMAS stranici: bmas.de → Bildungspaket → Anlaufstellen.",
      en: "Decentrally organized – the responsible office depends on the base benefit: Jobcenter (for Bürgergeld), municipality/county/social welfare office (for Wohngeld or Kinderzuschlag), or social welfare office (for asylum seeker benefits). Find your local office via the BMAS Anlaufstellen-Finder: bmas.de → Bildungspaket → Anlaufstellen.",
    },
    formName: {
      de: "Antrag auf Leistungen für Bildung und Teilhabe – kein einheitliches Bundesformular, variiert je nach Kommune/Bundesland. Formulare und Online-Anträge finden Sie über die BMAS-Anlaufstellen-Seite (bmas.de/bildungspaket → Anlaufstellen → Bundesland wählen). Beim Jobcenter wird der Schulbedarf teilweise automatisch mit dem Bürgergeld-Bescheid bewilligt.",
      bs: "Zahtjev za obrazovanje i učešće (BuT) – ne postoji jedinstven federalni formular, razlikuje se po općini/saveznoj zemlji. Formulare i online zahtjeve možete pronaći na BMAS stranici (bmas.de/bildungspaket → Anlaufstellen → izaberite saveznu zemlju). Kod Jobcentera se školski materijal ponekad automatski odobrava uz Bürgergeld rješenje.",
      en: "Application for Education and Participation Benefits – no single federal form, varies by municipality/state. Find forms and online applications via the BMAS Anlaufstellen page (bmas.de/bildungspaket → Anlaufstellen → select state). At the Jobcenter, school supplies may be approved automatically with the Bürgergeld decision.",
    },
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
    authority: {
      de: "Unterhaltsvorschussstelle (Unterhaltsvorschusskasse) – in der Regel beim Jugendamt Ihres Wohnorts angesiedelt. Zuständig ist das Jugendamt der Stadt- oder Gemeindeverwaltung, in deren Bezirk das Kind wohnt.",
      bs: "Unterhaltsvorschussstelle (Unterhaltsvorschusskasse) – po pravilu pri Jugendamtu vašeg mjesta stanovanja. Nadležan je Jugendamt grada ili općine u čijem području dijete živi.",
      en: "Unterhaltsvorschussstelle (Maintenance Advance Office) – usually located at the Youth Welfare Office (Jugendamt) of your place of residence. The Jugendamt of the city or municipality where the child lives is responsible.",
    },
    formName: {
      de: 'Antrag auf Unterhaltsvorschuss \u2013 Der Antrag muss schriftlich oder in elektronischer Form gestellt werden. Das offizielle Antragsformular erhalten Sie bei Ihrer Stadt-, Gemeinde- oder Kreisverwaltung. Immer h\u00e4ufiger kann der Unterhaltsvorschuss auch online beantragt werden \u2013 \u00fcber die \u201eBeratung vor Ort\u201c-Suche auf bmfsfj.de finden Sie den Link zum Online-Antrag Ihrer Unterhaltsvorschussstelle, sofern dieser Service bereits verf\u00fcgbar ist.',
      bs: 'Zahtjev za alimentacijski predujam (Unterhaltsvorschuss) \u2013 Zahtjev se podnosi pismeno ili elektronski. Slu\u017ebeni obrazac mo\u017eete dobiti u gradskoj, op\u0107inskoj ili okru\u017enoj upravi. Sve \u010de\u0161\u0107e je mogu\u0107e podnijeti zahtjev i online \u2013 putem pretrage \u201eBeratung vor Ort\u201c na bmfsfj.de mo\u017eete prona\u0107i link za online zahtjev kod va\u0161e lokalne Unterhaltsvorschussstelle, ako je ta usluga ve\u0107 dostupna.',
      en: "Application for Maintenance Advance (Unterhaltsvorschuss) – The application must be submitted in writing or electronically. The official application form is available at your city, municipal, or district administration. Increasingly, online applications are also possible – use the 'Beratung vor Ort' search on bmfsfj.de to find the online application link at your local Unterhaltsvorschussstelle, if this service is already available.",
    },
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
  // ----------- ELTERNZEIT -----------
  {
    slug: "elternzeit",
    category: "familie",
    title: { de: "Elternzeit", bs: "Roditeljsko odsustvo (Elternzeit)", en: "Parental Leave (Elternzeit)" },
    who: {
      de: "Arbeitnehmer/innen, die mit ihrem Kind in einem gemeinsamen Haushalt leben und es selbst betreuen. Gilt für alle Arbeitsverhältnisse (Vollzeit, Teilzeit, Minijob, Ausbildung, befristete Verträge). Auch Adoptiveltern. Max. 32 Stunden/Woche Teilzeitarbeit während Elternzeit erlaubt. Selbständige, Studierende und Arbeitslose haben KEINEN Anspruch auf Elternzeit (aber ggf. auf Elterngeld). Jeder Elternteil hat einen eigenständigen Anspruch – unabhängig vom anderen.",
      bs: "Zaposlenici koji žive sa djetetom u zajedničkom domaćinstvu i sami ga odgajaju. Važi za sve oblike zaposlenja (puno radno vrijeme, nepuno, minijob, obuka, ugovori na određeno). Također za usvojitelje. Max. 32 sata/sedmično rada tokom Elternzeit-a. Samozaposleni, studenti i nezaposleni NEMAJU pravo na Elternzeit (ali eventualno na Elterngeld). Svaki roditelj ima samostalno pravo – nezavisno od drugog.",
      en: "Employees living with their child in a shared household and caring for the child themselves. Applies to all employment types (full-time, part-time, minijob, training, fixed-term). Also for adoptive parents. Max. 32h/week part-time work allowed during parental leave. Self-employed, students, and unemployed do NOT have Elternzeit entitlement (but may qualify for Elterngeld). Each parent has an independent entitlement.",
    },
    authority: { de: "Arbeitgeber (schriftlicher Antrag)", bs: "Poslodavac (pismeni zahtjev)", en: "Employer (written application)" },
    formName: {
      de: "Kein offizielles Formular — formloses Schreiben an den Arbeitgeber mit verbindlicher Festlegung der Elternzeit-Zeiträume. Muss Name, Geburtsdatum des Kindes, gewünschte Zeiträume, geplante Teilzeit (falls gewünscht) enthalten. Fristen: 7 Wochen vor Beginn (für Elternzeit bis zum 3. Geburtstag), 13 Wochen vor Beginn (für Elternzeit zwischen 3. und 8. Geburtstag). Formlose Mitteilung reicht, aber Schriftform (handschriftliche Unterschrift) ist gesetzlich vorgeschrieben – E-Mail oder Fax genügen NICHT.",
      bs: "Nema službenog formulara — neformalno pismo poslodavcu sa obavezujućim navođenjem perioda Elternzeit-a. Mora sadržavati ime, datum rođenja djeteta, željene periode, planiranu Teilzeit (ako je željena). Rokovi: 7 sedmica prije početka (za Elternzeit do 3. rođendana), 13 sedmica prije početka (za Elternzeit između 3. i 8. rođendana). Dovoljno je neformalno pismo, ali pisana forma (vlastoručni potpis) je zakonski obavezna – email ili fax NIJE dovoljno.",
      en: "No official form — informal written letter to employer with binding specification of parental leave periods. Must include name, child's date of birth, desired periods, planned part-time (if any). Deadlines: 7 weeks before start (for leave until 3rd birthday), 13 weeks before start (for leave between 3rd and 8th birthday). Informal letter suffices, but written form (handwritten signature) is legally required – email or fax is NOT enough.",
    },
    steps: {
      de: [
        { field: "Voraussetzungen prüfen", instruction: "Arbeitsverhältnis muss bestehen. Kind muss im gemeinsamen Haushalt leben. Max. 32h Teilzeit während Elternzeit." },
        { field: "Zeitraum planen", instruction: "Bis zu 3 Jahre Elternzeit pro Kind. Davon max. 24 Monate zwischen dem 3. und 8. Geburtstag übertragbar (mit Zustimmung des AG). Max. 3 Zeitabschnitte ohne AG-Zustimmung." },
        { field: "Antrag beim Arbeitgeber", instruction: "Schriftlich (handschriftliche Unterschrift!). Frist: 7 Wochen vor Beginn (bis 3. Geburtstag) oder 13 Wochen (3.–8. Geburtstag). Bei Frühgeburten: verkürzte Frist möglich." },
        { field: "Teilzeitarbeit klären", instruction: "Falls gewünscht: Antrag auf Teilzeit (15–32h/Woche) beim AG stellen. AG kann nur aus dringenden betrieblichen Gründen ablehnen (Betriebe >15 Mitarbeiter)." },
        { field: "Kündigungsschutz", instruction: "Besonderer Kündigungsschutz ab Anmeldung der Elternzeit (frühestens 8 Wochen vor Beginn bis zum Ende). Kündigung nur mit Zustimmung der Landesbehörde möglich." },
        { field: "Versicherung und Rückkehr", instruction: "Krankenversicherung: beitragsfrei in GKV während Elternzeit ohne Einkommen. Rückkehrrecht auf gleichwertigen Arbeitsplatz nach Elternzeit." },
      ],
      bs: [
        {
          field: "Provjera uslova",
          instruction: "Mora postojati radni odnos. Dijete mora živjeti u zajedničkom domaćinstvu. Max. 32 sata Teilzeit tokom Elternzeit-a.",
          cards: [
            { whatToWrite: "Nema formulara – pismeno potvrđujete da ispunjavate uslove.", whereToFind: "Ugovor o radu, prijava prebivališta djeteta.", format: "Slobodna forma.", commonMistakes: "Zahtjev poslan emailom – zakonski se traži vlastoručni potpis.", whenToLeaveEmpty: "", example: "" },
          ],
        },
        {
          field: "Planiranje perioda",
          instruction: "Do 3 godine Elternzeit-a po djetetu. Max. 24 mjeseca prenosivo između 3. i 8. rođendana (uz saglasnost poslodavca). Max. 3 vremenska odsječka bez saglasnosti poslodavca.",
          cards: [
            { whatToWrite: "Tačne datume početka i kraja Elternzeit-a. Ako prenosite mjesece: navesti koliko i u kojem periodu.", whereToFind: "Rodni list djeteta za izračun perioda.", format: "DD.MM.GGGG – DD.MM.GGGG za svaki odsječak.", commonMistakes: "Navesti više od 3 odsječka bez saglasnosti poslodavca. Prekoračiti 24 mjeseca za period 3.–8. godina.", whenToLeaveEmpty: "", example: "Elternzeit 1: 01.08.2025 – 31.07.2026. Elternzeit 2: 01.09.2028 – 28.02.2029." },
          ],
        },
        {
          field: "Podnošenje zahtjeva poslodavcu",
          instruction: "Pismeno sa vlastoručnim potpisom. Rok: 7 sedmica prije početka (do 3. rođendana) ili 13 sedmica (3.–8. rođendan). Kod prijevremenih porođaja: skraćeni rok.",
          cards: [
            { whatToWrite: "Ime, datum rođenja djeteta, željeni periodi Elternzeit-a, eventualni Teilzeit (sati/sedmično).", whereToFind: "Rodni list djeteta.", format: "Pismo sa datumom i vlastoručnim potpisom – email/fax NIJE validan.", commonMistakes: "Propušten rok od 7/13 sedmica. Poslano emailom. Nije navedena obavezujuća raspodjela.", whenToLeaveEmpty: "", example: "Poštovani, prijavljujem Elternzeit za dijete [ime], rođeno [datum], za period od [datum] do [datum]. S poštovanjem, [potpis]." },
          ],
        },
        {
          field: "Teilzeitarbeit tokom Elternzeit-a",
          instruction: "Opciono: zahtjev za rad 15–32 sata/sedmično. Poslodavac može odbiti samo iz hitnih poslovnih razloga (firme >15 zaposlenih).",
          cards: [
            { whatToWrite: "Željeni obim sati i raspodjela po danima.", whereToFind: "Dogovor sa poslodavcem.", format: "Pismeni zahtjev najmanje 7 sedmica prije željenog početka.", commonMistakes: "Zahtjev za više od 32 sata. Ne podnijeti zahtjev na vrijeme.", whenToLeaveEmpty: "Ako ne planirate raditi tokom Elternzeit-a.", example: "Želim raditi 20 sati sedmično (ponedjeljak–četvrtak, po 5 sati) od 01.01.2026." },
          ],
        },
        {
          field: "Zaštita od otkaza",
          instruction: "Posebna zaštita od otkaza od prijave Elternzeit-a (najranije 8 sedmica prije početka) do kraja. Otkaz moguć samo uz odobrenje nadležnog državnog organa.",
        },
        {
          field: "Osiguranje i povratak",
          instruction: "Zdravstveno osiguranje: besplatno u GKV tokom Elternzeit-a bez prihoda. Pravo povratka na ekvivalentno radno mjesto nakon Elternzeit-a.",
        },
      ],
      en: [
        { field: "Check eligibility", instruction: "Employment must exist. Child must live in shared household. Max. 32h part-time during parental leave." },
        { field: "Plan period", instruction: "Up to 3 years per child. Max. 24 months transferable between 3rd and 8th birthday (with employer consent). Max. 3 time segments without consent." },
        { field: "Apply to employer", instruction: "Written with handwritten signature. Deadline: 7 weeks before start (until 3rd birthday) or 13 weeks (3rd–8th birthday)." },
        { field: "Part-time work", instruction: "Optional: apply for 15–32h/week. Employer can only refuse for urgent operational reasons (companies >15 employees)." },
        { field: "Dismissal protection", instruction: "Special protection from notification of parental leave (earliest 8 weeks before start) until end. Dismissal only with state authority approval." },
        { field: "Insurance and return", instruction: "Health insurance: contribution-free in GKV during parental leave without income. Right to return to equivalent position." },
      ],
    },
    documents: {
      de: ["Geburtsurkunde des Kindes", "Schriftlicher Antrag mit Unterschrift", "Arbeitgeberbescheinigung (falls Teilzeit gewünscht)"],
      bs: ["Rodni list djeteta", "Pismeni zahtjev sa potpisom", "Potvrda poslodavca (ako se želi Teilzeit)"],
      en: ["Child's birth certificate", "Written application with signature", "Employer certificate (if part-time desired)"],
    },
    processingTime: { de: "Keine Genehmigung nötig — Rechtsanspruch", bs: "Odobrenje nije potrebno — zakonsko pravo", en: "No approval needed — legal entitlement" },
    commonMistakes: {
      de: ["Antrag per E-Mail statt schriftlich (Schriftform = handschriftliche Unterschrift!)", "Frist verpasst (7 bzw. 13 Wochen)", "Mehr als 3 Zeitabschnitte ohne AG-Zustimmung", "Teilzeit über 32h geplant", "Elternzeit nicht verbindlich festgelegt (nur 'voraussichtlich')"],
      bs: ["Zahtjev poslan emailom umjesto pismeno (vlastoručni potpis!)", "Propušten rok (7 ili 13 sedmica)", "Više od 3 odsječka bez saglasnosti poslodavca", "Teilzeit preko 32 sata", "Elternzeit nije obavezujuće naveden (samo 'okvirno')"],
      en: ["Application by email instead of written (handwritten signature required!)", "Missed deadline (7 or 13 weeks)", "More than 3 segments without employer consent", "Part-time over 32h planned", "Parental leave not bindingly specified"],
    },
    officialPdf: "",
    onlineLink: "",
    officialInfoUrl: "https://familienportal.de/familienportal/familienleistungen/elternzeit",
  },
  // ----------- MUTTERSCHUTZ -----------
  {
    slug: "mutterschutz",
    category: "familie",
    title: { de: "Mutterschutz", bs: "Zaštita majki (Mutterschutz)", en: "Maternity Protection (Mutterschutz)" },
    who: {
      de: "Alle schwangeren und stillenden Beschäftigten — unabhängig von Staatsangehörigkeit, Familienstand oder Art des Arbeitsverhältnisses (Vollzeit, Teilzeit, Minijob, Ausbildung, Praktikum, BFD/FSJ). Auch bei befristeten Verträgen. NICHT für Selbständige, Hausfrauen, Beamtinnen (eigene Regelung: Mutterschutzverordnung). Gilt ab dem ersten Tag der Schwangerschaft bis mind. 8 Wochen nach der Entbindung (12 Wochen bei Frühgeburten, Mehrlingsgeburten, Behinderung des Kindes).",
      bs: "Sve trudne i dojilje u radnom odnosu — bez obzira na državljanstvo, bračni status ili vrstu zaposlenja (puno, nepuno, minijob, obuka, praktikum, BFD/FSJ). I kod ugovora na određeno. NE važi za samozaposlene, domaćice, državne službenice (posebna pravila: Mutterschutzverordnung). Važi od prvog dana trudnoće do min. 8 sedmica nakon porođaja (12 sedmica kod prijevremenog, višestrukog porođaja ili invaliditeta djeteta).",
      en: "All pregnant and breastfeeding employees — regardless of nationality, marital status, or employment type (full-time, part-time, minijob, training, internship, voluntary service). Also for fixed-term contracts. NOT for self-employed, homemakers, civil servants (separate rules). Applies from first day of pregnancy until at least 8 weeks after birth (12 weeks for premature, multiple births, or child disability).",
    },
    authority: { de: "Arbeitgeber + zuständige Aufsichtsbehörde des Bundeslandes", bs: "Poslodavac + nadležni nadzorni organ savezne države", en: "Employer + responsible supervisory authority of the federal state" },
    formName: {
      de: "Kein Antragsformular — Mutterschutz gilt automatisch kraft Gesetz (MuSchG). Arbeitgeber muss nach Mitteilung der Schwangerschaft informiert werden. Arbeitgeber meldet die Schwangerschaft an die zuständige Aufsichtsbehörde. Ärztliches Zeugnis über den mutmaßlichen Entbindungstermin ist dem Arbeitgeber vorzulegen.",
      bs: "Nema formulara za zahtjev — Mutterschutz važi automatski po zakonu (MuSchG). Poslodavac mora biti obaviješten o trudnoći. Poslodavac prijavljuje trudnoću nadležnom nadzornom organu. Ljekarska potvrda o predviđenom terminu porođaja se predaje poslodavcu.",
      en: "No application form — maternity protection applies automatically by law (MuSchG). Employer must be informed of pregnancy. Employer reports pregnancy to supervisory authority. Medical certificate of expected due date must be submitted to employer.",
    },
    steps: {
      de: [
        { field: "Arbeitgeber informieren", instruction: "Schwangerschaft und voraussichtlichen Entbindungstermin mitteilen. Keine Frist, aber je früher desto besser (Schutzmaßnahmen greifen erst nach Mitteilung). Ärztliches Zeugnis mit ET vorlegen." },
        { field: "Schutzfristen kennen", instruction: "Mutterschutzfrist: 6 Wochen VOR dem errechneten ET (freiwillig, kann auf eigenen Wunsch weiterarbeiten) + 8 Wochen NACH der Geburt (verpflichtend, Beschäftigungsverbot). Bei Frühgeburten: Tage vor ET addieren sich zu den 8 Wochen. Bei Mehrlingsgeburten/Behinderung: 12 Wochen nach Geburt." },
        { field: "Beschäftigungsverbote prüfen", instruction: "Generelles Verbot: schwere körperliche Arbeit, Gefahrstoffe, Nachtarbeit (20–6 Uhr), Sonn-/Feiertagsarbeit, Akkordarbeit. Individuelles Verbot: ärztliches Attest bei gesundheitlicher Gefährdung." },
        { field: "Arbeitsplatzgestaltung", instruction: "AG muss Gefährdungsbeurteilung durchführen und ggf. Arbeitsbedingungen anpassen. Recht auf Freistellung für Vorsorgeuntersuchungen ohne Entgeltausfall." },
        { field: "Kündigungsschutz", instruction: "Absoluter Kündigungsschutz während der Schwangerschaft und bis 4 Monate nach der Entbindung. Auch bei befristeten Verträgen: Kündigung unwirksam." },
        { field: "Nach Mutterschutz planen", instruction: "Elternzeit und/oder Elterngeld beantragen. Elternzeit kann direkt an Mutterschutz anschließen." },
      ],
      bs: [
        {
          field: "Obavijestiti poslodavca",
          instruction: "Priopćiti trudnoću i predviđeni termin porođaja. Nema roka, ali što prije to bolje (zaštitne mjere važe tek od obavijesti). Predati ljekarsku potvrdu sa terminom.",
          cards: [
            { whatToWrite: "Obavijest o trudnoći sa predviđenim terminom porođaja.", whereToFind: "Ljekarska potvrda (Zeugnis über den mutmaßlichen Entbindungstag) od ginekologa.", format: "Slobodna forma, pismeno ili usmeno. Preporuka: pismeno radi dokumentacije.", commonMistakes: "Kasno obavještavanje – zaštita važi tek od obavijesti!", whenToLeaveEmpty: "", example: "Poštovani, obavještavam Vas da sam trudna. Predviđeni termin porođaja je 15.03.2026. Ljekarsku potvrdu prilažem. S poštovanjem, [ime]." },
          ],
        },
        {
          field: "Zaštitni rokovi (Schutzfristen)",
          instruction: "6 sedmica PRIJE predviđenog termina (dobrovoljno – možete nastaviti raditi ako želite) + 8 sedmica NAKON porođaja (obavezna zabrana rada). Kod prijevremenog porođaja: dani prije termina se dodaju na 8 sedmica. Kod blizanaca/invaliditeta: 12 sedmica nakon porođaja.",
        },
        {
          field: "Zabrane zapošljavanja",
          instruction: "Opća zabrana: težak fizički rad, opasne materije, noćni rad (20–6h), rad nedjeljom/praznicima, rad u akordnom tempu. Individualna zabrana: ljekarski atest pri zdravstvenom riziku.",
        },
        {
          field: "Prilagodba radnog mjesta",
          instruction: "Poslodavac mora provesti procjenu rizika i prilagoditi radne uslove. Pravo na oslobađanje za preventivne preglede bez gubitka plate.",
        },
        {
          field: "Zaštita od otkaza",
          instruction: "Apsolutna zaštita od otkaza tokom trudnoće i do 4 mjeseca nakon porođaja. I kod ugovora na određeno: otkaz je nevažeći.",
        },
        {
          field: "Planiranje nakon Mutterschutz-a",
          instruction: "Podnijeti zahtjev za Elternzeit i/ili Elterngeld. Elternzeit može direktno slijediti nakon Mutterschutz-a.",
        },
      ],
      en: [
        { field: "Inform employer", instruction: "Communicate pregnancy and expected due date. No deadline, but the sooner the better. Submit medical certificate." },
        { field: "Protection periods", instruction: "6 weeks BEFORE due date (voluntary) + 8 weeks AFTER birth (mandatory). Premature: days before due date added. Multiples/disability: 12 weeks after." },
        { field: "Employment bans", instruction: "General: heavy physical work, hazardous substances, night work (8pm–6am), Sundays/holidays. Individual: medical certificate for health risk." },
        { field: "Workplace adaptation", instruction: "Employer must conduct risk assessment and adapt conditions. Right to time off for checkups without pay loss." },
        { field: "Dismissal protection", instruction: "Absolute protection during pregnancy and up to 4 months after birth. Even for fixed-term contracts." },
        { field: "Plan after maternity protection", instruction: "Apply for Elternzeit and/or Elterngeld. Parental leave can directly follow maternity protection." },
      ],
    },
    documents: {
      de: ["Ärztliches Zeugnis über den mutmaßlichen Entbindungstag", "Geburtsurkunde des Kindes (nach Geburt)", "Ggf. Bescheinigung über Frühgeburt"],
      bs: ["Ljekarska potvrda o predviđenom terminu porođaja", "Rodni list djeteta (nakon porođaja)", "Eventualno potvrda o prijevremenom porođaju"],
      en: ["Medical certificate of expected due date", "Child's birth certificate (after birth)", "Certificate of premature birth if applicable"],
    },
    processingTime: { de: "Automatisch — kein Antrag nötig", bs: "Automatski — zahtjev nije potreban", en: "Automatic — no application needed" },
    commonMistakes: {
      de: ["Arbeitgeber nicht rechtzeitig informiert", "Während der Schutzfrist nach Geburt gearbeitet (verboten!)", "Individuelles Beschäftigungsverbot nicht ärztlich attestiert", "Kündigungsschutz nicht geltend gemacht"],
      bs: ["Poslodavac nije pravovremeno obaviješten", "Rad tokom zaštitnog perioda nakon porođaja (zabranjeno!)", "Individualna zabrana rada nije potkrijepljena ljekarskim atestom", "Zaštita od otkaza nije zatražena"],
      en: ["Employer not informed in time", "Worked during post-birth protection period (forbidden!)", "Individual employment ban not medically certified", "Dismissal protection not claimed"],
    },
    officialPdf: "",
    onlineLink: "",
    officialInfoUrl: "https://familienportal.de/familienportal/familienleistungen/mutterschutz",
  },
  // ----------- MUTTERSCHAFTSLEISTUNGEN -----------
  {
    slug: "mutterschaftsleistungen",
    category: "familie",
    title: { de: "Mutterschaftsleistungen", bs: "Naknade za majčinstvo (Mutterschaftsleistungen)", en: "Maternity Benefits (Mutterschaftsleistungen)" },
    who: {
      de: "Berufstätige Frauen während der Mutterschutzfristen. (1) GKV-Mitglieder mit Anspruch auf Krankengeld: Mutterschaftsgeld der Krankenkasse (max. 13 €/Tag) + Arbeitgeberzuschuss (Differenz zum Nettolohn). (2) Privat oder familienversicherte Frauen / geringfügig Beschäftigte: max. 210 € gesamt vom Bundesamt für Soziale Sicherung. (3) Selbständige: kein Mutterschaftsgeld, aber ggf. Krankentagegeld je nach Versicherungstarif.",
      bs: "Zaposlene žene tokom Mutterschutz perioda. (1) GKV-članice sa pravom na bolovanje: Mutterschaftsgeld od zdravstvene kase (max. 13 €/dan) + dodatak poslodavca (razlika do neto plate). (2) Privatno ili porodično osigurane / minijob: max. 210 € ukupno od Bundesamt für Soziale Sicherung. (3) Samozaposlene: nema Mutterschaftsgeld-a, ali eventualno Krankentagegeld zavisno od tarife osiguranja.",
      en: "Employed women during maternity protection periods. (1) Public health insurance members with sick pay entitlement: maternity pay from health insurer (max. €13/day) + employer supplement (difference to net salary). (2) Privately or family-insured / mini-jobbers: max. €210 total from Federal Office of Social Security. (3) Self-employed: no maternity pay, but possibly daily sickness allowance depending on insurance tariff.",
    },
    authority: { de: "Krankenkasse + Arbeitgeber (+ ggf. Bundesamt für Soziale Sicherung)", bs: "Zdravstvena kasa + poslodavac (+ eventualno Bundesamt für Soziale Sicherung)", en: "Health insurer + employer (+ possibly Federal Office of Social Security)" },
    formName: {
      de: "Antrag auf Mutterschaftsgeld bei der Krankenkasse (GKV-Versicherte) bzw. beim Bundesamt für Soziale Sicherung (privat/familienversichert). Ärztliches Zeugnis über den mutmaßlichen Entbindungstag ist beizufügen. Arbeitgeberzuschuss: formloser Antrag oder automatische Berechnung durch den Arbeitgeber.",
      bs: "Zahtjev za Mutterschaftsgeld kod zdravstvene kase (GKV-osiguranice) ili kod Bundesamt für Soziale Sicherung (privatno/porodično osigurane). Priložiti ljekarsku potvrdu o predviđenom terminu porođaja. Dodatak poslodavca: neformalni zahtjev ili automatski obračun od strane poslodavca.",
      en: "Application for maternity pay at health insurer (GKV-insured) or Federal Office of Social Security (privately/family insured). Medical certificate of expected due date must be attached. Employer supplement: informal request or automatic calculation by employer.",
    },
    steps: {
      de: [
        { field: "Mutterschaftsgeld bei Krankenkasse beantragen", instruction: "GKV-Versicherte: Antrag bei der Krankenkasse stellen. Ärztliches Zeugnis über den mutmaßlichen Entbindungstag beifügen. Krankenkasse zahlt max. 13 €/Tag während der Schutzfristen." },
        { field: "Arbeitgeberzuschuss", instruction: "Differenz zwischen Nettolohn und 13 €/Tag zahlt der Arbeitgeber als Zuschuss. Berechnung basiert auf den letzten 3 Nettogehältern vor Beginn der Schutzfrist. Kein gesonderter Antrag nötig — AG berechnet automatisch." },
        { field: "Bundesamt für Soziale Sicherung (falls zutreffend)", instruction: "Privat oder familienversicherte Frauen: max. 210 € gesamt. Antrag online unter mutterschaftsgeld.de oder per Post. Ärztliches Zeugnis und Arbeitgeberbescheinigung beifügen." },
        { field: "Nach Geburt: Geburtsurkunde einreichen", instruction: "Geburtsurkunde an Krankenkasse und Arbeitgeber senden. Erst dann wird Mutterschaftsgeld für die Nachschutzfrist berechnet." },
        { field: "Mutterschutzlohn bei Beschäftigungsverbot", instruction: "Bei ärztlichem Beschäftigungsverbot VOR der Schutzfrist: Anspruch auf Mutterschutzlohn (voller Durchschnittslohn) vom Arbeitgeber. AG erhält Erstattung über das U2-Umlageverfahren." },
        { field: "Steuerliche Pflichten", instruction: "Mutterschaftsgeld + AG-Zuschuss sind steuerfrei, unterliegen aber dem Progressionsvorbehalt. Bei Gesamtbetrag >410 € im Jahr: Steuererklärung ist Pflicht." },
      ],
      bs: [
        {
          field: "Zahtjev za Mutterschaftsgeld kod zdravstvene kase",
          instruction: "GKV-osiguranice: podnijeti zahtjev kod zdravstvene kase. Priložiti ljekarsku potvrdu o predviđenom terminu porođaja. Kasa isplaćuje max. 13 €/dan tokom zaštitnih rokova.",
          cards: [
            { whatToWrite: "Zahtjev za Mutterschaftsgeld sa ljekarskom potvrdom.", whereToFind: "Obrazac na web stranici vaše zdravstvene kase ili zatražiti u poslovnici.", format: "Formular kase + ljekarska potvrda u originalu.", commonMistakes: "Prekasno podnošenje – zahtjev podnijeti čim dobijete ljekarsku potvrdu (najranije 7 sedmica prije ET).", whenToLeaveEmpty: "", example: "" },
          ],
        },
        {
          field: "Dodatak poslodavca (Arbeitgeberzuschuss)",
          instruction: "Razliku između neto plate i 13 €/dan plaća poslodavac. Izračun na osnovu posljednje 3 neto plate prije zaštitnog roka. Poseban zahtjev nije potreban — poslodavac obračunava automatski.",
        },
        {
          field: "Bundesamt für Soziale Sicherung (ako se odnosi)",
          instruction: "Privatno ili porodično osigurane žene: max. 210 € ukupno. Zahtjev online na mutterschaftsgeld.de ili poštom. Priložiti ljekarsku potvrdu i potvrdu poslodavca.",
        },
        {
          field: "Nakon porođaja: predati rodni list",
          instruction: "Poslati rodni list zdravstvenoj kasi i poslodavcu. Tek tada se obračunava Mutterschaftsgeld za period nakon porođaja.",
        },
        {
          field: "Mutterschutzlohn kod zabrane zapošljavanja",
          instruction: "Kod ljekarske zabrane rada PRIJE zaštitnog roka: pravo na punu prosječnu platu od poslodavca. Poslodavac dobija refundaciju preko U2-postupka.",
        },
        {
          field: "Porezne obaveze",
          instruction: "Mutterschaftsgeld + dodatak poslodavca su oslobođeni poreza, ali podliježu Progressionsvorbehalt. Ako ukupni iznos >410 € godišnje: Steuererklärung je obavezna.",
        },
      ],
      en: [
        { field: "Apply for maternity pay at health insurer", instruction: "Public insured: apply at health insurer with medical certificate. Max. €13/day during protection periods." },
        { field: "Employer supplement", instruction: "Employer pays difference between net salary and €13/day. Based on last 3 net salaries. No separate application needed." },
        { field: "Federal Office (if applicable)", instruction: "Privately or family-insured: max. €210 total. Apply online at mutterschaftsgeld.de or by post." },
        { field: "After birth: submit birth certificate", instruction: "Send birth certificate to insurer and employer for post-birth benefit calculation." },
        { field: "Maternity protection pay for employment ban", instruction: "Medical employment ban BEFORE protection period: full average salary from employer (reimbursed via U2)." },
        { field: "Tax obligations", instruction: "Maternity pay + supplement are tax-free but subject to Progressionsvorbehalt. If total >€410/year: tax return mandatory." },
      ],
    },
    documents: {
      de: ["Ärztliches Zeugnis über den mutmaßlichen Entbindungstag", "Geburtsurkunde (nach Geburt)", "Arbeitgeberbescheinigung über Nettolohn", "Ggf. Bescheid des Bundesamtes für Soziale Sicherung"],
      bs: ["Ljekarska potvrda o predviđenom terminu porođaja", "Rodni list (nakon porođaja)", "Potvrda poslodavca o neto plati", "Eventualno rješenje Bundesamt für Soziale Sicherung"],
      en: ["Medical certificate of expected due date", "Birth certificate (after birth)", "Employer certificate of net salary", "Federal Office decision if applicable"],
    },
    processingTime: { de: "2–4 Wochen (Krankenkasse), sofort (AG-Zuschuss)", bs: "2–4 sedmice (zdravstvena kasa), odmah (dodatak poslodavca)", en: "2–4 weeks (health insurer), immediate (employer supplement)" },
    commonMistakes: {
      de: ["Ärztliches Zeugnis nicht rechtzeitig eingereicht", "Antrag beim falschen Träger gestellt (KK vs. Bundesamt)", "Geburtsurkunde nicht nachgereicht — Nachschutzfrist-Zahlung verzögert", "Steuerliche Pflicht bei Progressionsvorbehalt übersehen"],
      bs: ["Ljekarska potvrda nije predana na vrijeme", "Zahtjev podnesen pogrešnom nosiocu (kasa vs. Bundesamt)", "Rodni list nije naknadno dostavljen — kašnjenje isplate za period nakon porođaja", "Propuštena porezna obaveza (Progressionsvorbehalt)"],
      en: ["Medical certificate not submitted in time", "Application filed with wrong institution (insurer vs. Federal Office)", "Birth certificate not submitted — post-birth payment delayed", "Tax obligation for Progressionsvorbehalt overlooked"],
    },
    officialPdf: "",
    onlineLink: "",
    officialInfoUrl: "https://familienportal.de/familienportal/familienleistungen/mutterschaftsleistungen",
  },
  // ----------- UNTERHALT -----------
  {
    slug: "unterhalt",
    category: "familie",
    title: { de: "Unterhalt", bs: "Alimentacija (Unterhalt)", en: "Maintenance / Child Support (Unterhalt)" },
    who: {
      de: "Kinder haben Anspruch auf Barunterhalt vom getrennt lebenden Elternteil. Geschiedene oder getrennt lebende Ehepartner können Anspruch auf Trennungsunterhalt oder nachehelichen Unterhalt haben. Nichteheliche betreuende Elternteile haben Betreuungsunterhalt für mind. 3 Jahre nach Geburt. Höhe richtet sich nach der Düsseldorfer Tabelle (aktualisiert jährlich) und dem bereinigten Nettoeinkommen des Unterhaltspflichtigen.",
      bs: "Djeca imaju pravo na alimentaciju od roditelja koji živi odvojeno. Razvedeni ili razdvojeni supružnici mogu imati pravo na alimentaciju (Trennungsunterhalt ili nachehelicher Unterhalt). Nevjenčani roditelji koji brinu o djetetu imaju pravo na Betreuungsunterhalt min. 3 godine nakon porođaja. Iznos se određuje prema Düsseldorfer Tabelle (ažurira se godišnje) i neto prihodima obveznika.",
      en: "Children are entitled to maintenance from the non-resident parent. Divorced or separated spouses may claim separation or post-marital maintenance. Unmarried caregiving parents have maintenance entitlement for at least 3 years after birth. Amount based on Düsseldorf Table (updated annually) and obligor's adjusted net income.",
    },
    authority: { de: "Jugendamt (Beratung + Beistandschaft) + Familiengericht", bs: "Jugendamt (savjetovanje + zastupanje) + Porodični sud", en: "Youth Welfare Office (Jugendamt) + Family Court" },
    formName: {
      de: "Kein einheitliches Antragsformular. Unterhalt wird privatrechtlich geregelt: (1) Einvernehmliche Vereinbarung zwischen den Eltern (am besten schriftlich, ggf. notariell). (2) Jugendamt-Beistandschaft: kostenlos, Jugendamt vertritt das Kind bei der Geltendmachung (Antrag beim Jugendamt). (3) Gerichtliches Verfahren: Antrag beim Familiengericht auf Unterhaltsfestsetzung (vereinfachtes Verfahren für Kindesunterhalt bis 120% des Mindestunterhalts). Düsseldorfer Tabelle als Orientierung: familienportal.de.",
      bs: "Nema jedinstvenog formulara. Alimentacija se reguliše privatnopravno: (1) Sporazum između roditelja (poželjno pismeno, eventualno notarski). (2) Zastupanje Jugendamt-a (Beistandschaft): besplatno, Jugendamt zastupa dijete u ostvarivanju alimentacije (zahtjev kod Jugendamt-a). (3) Sudski postupak: zahtjev kod Porodičnog suda za utvrđivanje alimentacije (pojednostavljeni postupak za dječju alimentaciju do 120% minimalnog iznosa). Düsseldorfer Tabelle kao orijentir: familienportal.de.",
      en: "No unified application form. Maintenance is regulated under private law: (1) Mutual agreement between parents (preferably written, possibly notarized). (2) Jugendamt representation (Beistandschaft): free, Jugendamt represents child in claiming maintenance (apply at Jugendamt). (3) Court proceedings: application at Family Court for maintenance determination (simplified procedure for child maintenance up to 120% of minimum). Düsseldorf Table as guide: familienportal.de.",
    },
    steps: {
      de: [
        { field: "Art des Unterhalts klären", instruction: "Kindesunterhalt (Barunterhalt des nicht betreuenden Elternteils), Trennungsunterhalt (ab Trennung bis Scheidung), nachehelicher Unterhalt (nach Scheidung, nur unter bestimmten Voraussetzungen), Betreuungsunterhalt (für nichteheliche Betreuende, mind. 3 Jahre)." },
        { field: "Höhe berechnen", instruction: "Düsseldorfer Tabelle: Einteilung nach bereinigtem Nettoeinkommen und Altersstufe des Kindes. Mindestunterhalt 2024: 0–5 Jahre: 480 €, 6–11: 551 €, 12–17: 645 €. Kindergeld wird zur Hälfte angerechnet (bei Minderjährigen). Selbstbehalt des Pflichtigen beachten: 1.450 € (erwerbstätig) / 1.200 € (nicht erwerbstätig)." },
        { field: "Jugendamt-Beratung nutzen", instruction: "Kostenlose Beratung beim Jugendamt. Beistandschaft beantragen: Jugendamt wird gesetzlicher Vertreter des Kindes für Unterhaltsangelegenheiten. Kostenlos und kann jederzeit beendet werden." },
        { field: "Unterhalt einfordern", instruction: "Schriftliche Aufforderung an den Unterhaltspflichtigen mit Fristsetzung. Bei Nichtzahlung: Jugendamt-Beistandschaft oder Anwalt einschalten. Unterhalt kann ab dem Monat der Aufforderung rückwirkend geltend gemacht werden." },
        { field: "Gerichtliches Verfahren", instruction: "Antrag beim Familiengericht. Vereinfachtes Verfahren für Kindesunterhalt bis 120% des Mindestunterhalts. Titel (Urteil/Beschluss) ermöglicht Zwangsvollstreckung bei Nichtzahlung." },
        { field: "Steuerliche Absetzbarkeit prüfen", instruction: "Unterhaltszahlungen: als außergewöhnliche Belastung (§ 33a EStG) bis zu 11.784 € absetzbar. Ehegattenunterhalt: alternativ als Sonderausgabe (Realsplitting, § 10 Abs. 1a EStG) bis 13.805 € — Empfänger muss versteuern (Anlage U)." },
      ],
      bs: [
        {
          field: "Vrsta alimentacije",
          instruction: "Dječja alimentacija (Barunterhalt roditelja koji ne živi sa djetetom), alimentacija tokom razdvojenosti (Trennungsunterhalt – od razdvajanja do razvoda), alimentacija nakon razvoda (nachehelicher Unterhalt – samo pod određenim uslovima), alimentacija za brigu o djetetu (Betreuungsunterhalt – za nevjenčane roditelje, min. 3 godine).",
        },
        {
          field: "Izračun iznosa",
          instruction: "Düsseldorfer Tabelle: podjela prema neto prihodima obveznika i starosnoj grupi djeteta. Minimalna alimentacija 2024: 0–5 godina: 480 €, 6–11: 551 €, 12–17: 645 €. Kindergeld se uračunava na pola (kod maloljetnika). Minimalni iznos koji ostaje obvezniku (Selbstbehalt): 1.450 € (zaposlen) / 1.200 € (nezaposlen).",
          cards: [
            { whatToWrite: "Neto prihod obveznika alimentacije za izračun po Düsseldorfer Tabelle.", whereToFind: "Düsseldorfer Tabelle: familienportal.de ili olg-duesseldorf.nrw.de. Mindestunterhaltsverordnung za minimalne iznose.", format: "Iznos u eurima mjesečno. Starosna grupa djeteta: 0–5, 6–11, 12–17, 18+.", commonMistakes: "Ne oduzeti polovinu Kindergeld-a. Koristiti zastarjelu tabelu (ažurira se 01.01. svake godine). Zaboraviti Selbstbehalt obveznika.", whenToLeaveEmpty: "", example: "Obveznik: neto 2.500 €. Dijete 4 godine → Stufe 2: 530 € minus 1/2 Kindergeld (125 €) = 405 € mjesečno." },
          ],
        },
        {
          field: "Savjetovanje kod Jugendamt-a",
          instruction: "Besplatno savjetovanje. Beistandschaft: Jugendamt postaje zakonski zastupnik djeteta za alimentacijske poslove. Besplatno i može se prekinuti u bilo kojem trenutku.",
        },
        {
          field: "Potraživanje alimentacije",
          instruction: "Pismena opomena obvezniku sa rokom. Kod neplaćanja: Jugendamt-Beistandschaft ili advokat. Alimentacija se može tražiti retroaktivno od mjeseca opomene.",
        },
        {
          field: "Sudski postupak",
          instruction: "Zahtjev kod Porodičnog suda. Pojednostavljeni postupak za dječju alimentaciju do 120% minimalnog iznosa. Presuda/rješenje omogućava prisilno izvršenje kod neplaćanja.",
        },
        {
          field: "Porezna umanjenja",
          instruction: "Plaćanja alimentacije: kao izvanredni teret (§ 33a EStG) do 11.784 € odbitno. Bračna alimentacija: alternativno kao posebni rashod (Realsplitting, § 10 Abs. 1a EStG) do 13.805 € — primatelj mora oporezovati (Anlage U).",
        },
      ],
      en: [
        { field: "Type of maintenance", instruction: "Child maintenance, separation maintenance, post-marital maintenance, or caregiving maintenance (for unmarried parents, min. 3 years)." },
        { field: "Calculate amount", instruction: "Düsseldorf Table: categorized by net income and child's age group. Minimum 2024: 0–5: €480, 6–11: €551, 12–17: €645. Half of Kindergeld deducted. Self-retention: €1,450 (employed) / €1,200 (unemployed)." },
        { field: "Jugendamt consultation", instruction: "Free advice. Beistandschaft: Jugendamt becomes child's legal representative for maintenance matters. Free, can be terminated anytime." },
        { field: "Claim maintenance", instruction: "Written demand with deadline. If unpaid: Jugendamt or lawyer. Maintenance claimable retroactively from month of demand." },
        { field: "Court proceedings", instruction: "Apply at Family Court. Simplified procedure for child maintenance up to 120% of minimum. Court order enables enforcement." },
        { field: "Tax deductibility", instruction: "Maintenance payments: deductible as extraordinary burden (§ 33a) up to €11,784. Spousal: alternatively as Sonderausgabe (Realsplitting) up to €13,805 — recipient must pay tax." },
      ],
    },
    documents: {
      de: ["Einkommensnachweise des Unterhaltspflichtigen (Gehaltsabrechnungen, Steuerbescheid)", "Geburtsurkunde des Kindes", "Scheidungsurteil oder Trennungsnachweis (falls zutreffend)", "Düsseldorfer Tabelle (aktuelles Jahr)", "Ggf. Sorgerechtsvereinbarung oder -beschluss"],
      bs: ["Dokazi o prihodima obveznika (platne liste, porezno rješenje)", "Rodni list djeteta", "Presuda o razvodu ili dokaz o razdvajanju (ako je primjenjivo)", "Düsseldorfer Tabelle (tekuća godina)", "Eventualno sporazum ili odluka o starateljstvu"],
      en: ["Income proof of obligor (payslips, tax assessment)", "Child's birth certificate", "Divorce decree or separation proof (if applicable)", "Düsseldorf Table (current year)", "Custody agreement or court order if applicable"],
    },
    processingTime: { de: "Einvernehmlich: sofort. Jugendamt: 2–6 Wochen. Gericht: 2–6 Monate.", bs: "Sporazumno: odmah. Jugendamt: 2–6 sedmica. Sud: 2–6 mjeseci.", en: "Consensual: immediate. Jugendamt: 2–6 weeks. Court: 2–6 months." },
    commonMistakes: {
      de: ["Unterhalt nur mündlich vereinbart (keine Durchsetzbarkeit)", "Düsseldorfer Tabelle nicht aktuell", "Kindergeld-Anrechnung vergessen", "Selbstbehalt des Pflichtigen nicht berücksichtigt", "Unterhalt erst ab Gerichtsurteil statt ab Aufforderung verlangt"],
      bs: ["Alimentacija dogovorena samo usmeno (nema mogućnosti izvršenja)", "Düsseldorfer Tabelle nije aktuelna", "Zaboravljeno uračunavanje Kindergeld-a", "Selbstbehalt obveznika nije uzet u obzir", "Alimentacija tražena tek od presude umjesto od opomene"],
      en: ["Maintenance only agreed verbally (not enforceable)", "Düsseldorf Table not current", "Kindergeld credit forgotten", "Obligor's self-retention not considered", "Maintenance claimed from court ruling instead of from demand letter"],
    },
    officialPdf: "",
    onlineLink: "",
    officialInfoUrl: "https://familienportal.de/familienportal/familienleistungen/unterhalt",
  },
  // ===================== WOHNEN =====================
  {
    slug: "wohngeld",
    category: "wohnen",
    title: { de: "Wohngeld", bs: "Stambeni dodatak (Wohngeld)", en: "Housing Benefit (Wohngeld)" },
    who: {
      de: "Familien und Personen mit geringem Einkommen, die Miete zahlen (Mietzuschuss) oder Kosten für selbst genutztes Wohneigentum tragen (Lastenzuschuss). Kein Anspruch, wenn bereits andere Sozialleistungen die Wohnkosten berücksichtigen (z.\u00A0B. Bürgergeld, Sozialgeld, BAföG, Berufsausbildungsbeihilfe).",
      bs: "Porodice i osobe sa niskim primanjima koje plaćaju kiriju (Mietzuschuss) ili troškove vlastitog stana/kuće (Lastenzuschuss). Nema prava ako već primate naknade koje pokrivaju troškove stanovanja (npr. Bürgergeld, Sozialgeld, BAföG, Berufsausbildungsbeihilfe).",
      en: "Families and individuals with low income who pay rent (Mietzuschuss) or bear costs for owner-occupied housing (Lastenzuschuss). No entitlement if other social benefits already cover housing costs (e.g. Bürgergeld, Sozialgeld, BAföG, vocational training allowance).",
    },
    authority: {
      de: "Wohngeldstelle der Gemeinde oder Stadt. Den Antrag müssen Sie schriftlich bei Ihrer örtlichen Wohngeldbehörde stellen — dort erhalten Sie auch die Antragsformulare und persönliche Beratung. In einigen Regionen können Sie Wohngeld auch online über das Verwaltungsportal des Bundes beantragen (verwaltung.bund.de).",
      bs: "Služba za Wohngeld vaše općine ili grada. Zahtjev se podnosi pismeno kod lokalne Wohngeldbehörde — tamo dobijete i formulare i savjetovanje. U nekim regijama možete Wohngeld aplicirati i online putem Verwaltungsportal des Bundes (verwaltung.bund.de).",
      en: "Housing benefit office of your municipality or city. The application must be submitted in writing to your local Wohngeldbehörde — they also provide forms and counseling. In some regions you can apply online via the Federal Administration Portal (verwaltung.bund.de).",
    },
    formName: {
      de: "Wohngeldantrag (Mietzuschuss oder Lastenzuschuss). Formulare erhalten Sie bei Ihrer Wohngeldbehörde oder online. Wichtig: Wohngeld wird nicht rückwirkend gewährt, sondern ab dem Monat der Antragstellung.",
      bs: "Zahtjev za Wohngeld (Mietzuschuss za kiriju ili Lastenzuschuss za vlasništvo). Formulare dobijete kod Wohngeldbehörde ili online. Važno: Wohngeld se ne dodjeljuje retroaktivno, nego od mjeseca u kojem je zahtjev podnesen.",
      en: "Housing benefit application (Mietzuschuss for rent or Lastenzuschuss for owner-occupied). Forms available at Wohngeldbehörde or online. Important: Wohngeld is not granted retroactively — it starts from the month the application is filed.",
    },
    steps: {
      de: [
        { field: "Antragsteller", instruction: "Persönliche Daten eintragen: Name, Geburtsdatum, Steuer-ID, Familienstand. Antragsteller muss der Hauptmieter sein." },
        { field: "Haushaltsmitglieder", instruction: "Alle im Haushalt lebenden Personen mit Name, Geburtsdatum und monatlichem Bruttoeinkommen auflisten. Auch Kinder und nicht verwandte Mitbewohner angeben." },
        { field: "Wohnung", instruction: "Vollständige Adresse, Wohnfläche in m², Kaltmiete, Nebenkosten (ohne Strom) und Heizkosten getrennt eintragen. Beträge aus dem Mietvertrag übernehmen." },
        { field: "Einkommen", instruction: "Bruttoeinkommen aller Haushaltsmitglieder der letzten 12 Monate. Dazu zählen: Lohn, Rente, Kindergeld, Unterhalt, BAföG, Einkünfte aus Vermietung. Die Höhe des Wohngelds hängt ab von: Anzahl der Haushaltsmitglieder, Gesamteinkommen und Höhe der Miete. Berechnung vorab möglich mit dem Wohngeldrechner des BMWSB: https://www.bmwsb.bund.de/DE/wohnen/wohngeld/wohngeldrechner/wohngeldrechner-2025_node.html" },
      ],
      bs: [
        {
          field: "Podnosilac zahtjeva",
          instruction: "Lični podaci: ime, datum rođenja, porezni ID, bračni status. Podnosilac mora biti glavni zakupac (Hauptmieter) stana.",
          cards: [
            {
              whatToWrite: "Ime i prezime (kao u pasošu), datum rođenja (DD.MM.GGGG), Steuer-ID (11 cifara), bračni status (ledig, verheiratet, geschieden, verwitwet), državljanstvo, adresa stanovanja.",
              whereToFind: "Ime/prezime: pasoš ili lična karta. Steuer-ID: pismo od Finanzamt-a ili Elster portal. Bračni status: vjenčani list ili rodni list. Adresa: Meldebescheinigung.",
              format: "Datum: DD.MM.GGGG. Steuer-ID: 11 cifara. PLZ: 5 cifara. Ime: tačno kao u pasošu, bez nadimaka.",
              commonMistakes: "Podnosilac nije glavni zakupac — zahtjev se odbija. Steuer-ID zamijenjen sa Steuernummer. Adresa se ne poklapa s Meldebescheinigung.",
              whenToLeaveEmpty: "Sva polja su obavezna. Ne ostavljati ništa prazno.",
              example: "Familienname: Hodžić | Vorname: Marko | Geb.: 15.03.1990 | Steuer-ID: 12 345 678 901 | Familienstand: verheiratet | PLZ/Ort: 80336 München",
            },
          ],
        },
        {
          field: "Članovi domaćinstva",
          instruction: "Sve osobe koje žive u stanu — uključujući djecu, partnera i necimere. Za svaku osobu navesti ime, datum rođenja i mjesečna bruto primanja.",
          cards: [
            {
              whatToWrite: "Ime, prezime, datum rođenja, srodstvo (Ehepartner, Kind, Mitbewohner) i mjesečna bruto primanja svake osobe. Uključiti i djecu bez prihoda (navesti 0 €).",
              whereToFind: "Primanja: platna lista (Lohnabrechnung), rješenje o Kindergeld-u, potvrda o alimentaciji, rješenje o penziji. Za djecu: rodni list.",
              format: "Svaka osoba u zasebnom redu. Primanja u eurima mjesečno (bruto). Datum: DD.MM.GGGG.",
              commonMistakes: "Nepotpun popis članova — zaboravljena djeca ili cimer. Navedena neto umjesto bruto primanja. Osoba koja je prijavljena ali ne živi tu (ili obrnuto).",
              whenToLeaveEmpty: "Nikad — čak i bebe bez prihoda moraju biti navedene sa 0 € primanja.",
              example: "1) Hodžić Ana, 22.07.1992, Ehepartnerin, 1.800 € bruto | 2) Hodžić Emina, 10.05.2018, Kind, 0 € | 3) Hodžić Amar, 03.11.2021, Kind, 0 €",
            },
          ],
        },
        {
          field: "Podaci o stanu",
          instruction: "Adresa stana, veličina u m², hladna kirija, režije (bez struje) i grijanje odvojeno. Sve podatke preuzeti iz ugovora o najmu.",
          cards: [
            {
              whatToWrite: "Puna adresa (ulica, broj, PLZ, grad), ukupna stambena površina u m², Kaltmiete (hladna kirija bez režija), Nebenkosten (režije bez struje) i Heizkosten (grijanje) — svaki iznos posebno.",
              whereToFind: "Adresa i kirija: ugovor o najmu (Mietvertrag). Režije: posljednji obračun režija (Nebenkostenabrechnung). Veličina stana: ugovor o najmu ili energetski certifikat.",
              format: "Površina: u m² (npr. 65 m²). Iznosi: u eurima mjesečno bez centima. Adresa: ulica + kućni broj, PLZ + grad.",
              commonMistakes: "Grijanje i režije nisu odvojeni (moraju biti zasebno). Navedena ukupna kirija (Warmmiete) umjesto hladne kirije (Kaltmiete). Površina stana ne odgovara ugovoru.",
              whenToLeaveEmpty: "Sva polja obavezna. Ako nemate Nebenkostenabrechnung, navesti procjenu iz ugovora.",
              example: "Adresse: Schillerstraße 12, 80336 München | Wohnfläche: 65 m² | Kaltmiete: 750 € | Nebenkosten: 120 € | Heizkosten: 80 €",
            },
          ],
        },
        {
          field: "Primanja svih članova",
          instruction: "Bruto primanja svih članova domaćinstva za zadnjih 12 mjeseci. Visina Wohngeld-a zavisi od: broja članova, ukupnih primanja i visine kirije. Možete unaprijed izračunati sa Wohngeldrechner-om: https://www.bmwsb.bund.de/DE/wohnen/wohngeld/wohngeldrechner/wohngeldrechner-2025_node.html",
          cards: [
            {
              whatToWrite: "Bruto primanja (Bruttoeinkommen) svih članova: plata, penzija, Kindergeld, alimentacija (Unterhalt), BAföG, prihodi od izdavanja nekretnina. Za svakog člana navesti vrstu i iznos primanja.",
              whereToFind: "Plata: platne liste zadnjih 12 mjeseci (Lohnabrechnungen). Penzija: rješenje o penziji (Rentenbescheid). Kindergeld: rješenje Familienkasse. Unterhalt: sporazum o alimentaciji ili sudska presuda.",
              format: "Iznosi u eurima mjesečno (bruto). Navesti vrstu primanja za svaku osobu. Ako nema primanja: upisati 0 €.",
              commonMistakes: "Navedena primanja nisu aktuelna (trebaju zadnjih 12 mjeseci). Zaboravljen Kindergeld ili alimentacija. Navedena neto umjesto bruto primanja. Prihodi od minijoba nisu prijavljeni.",
              whenToLeaveEmpty: "Ako član nema nikakva primanja, upisati 0 €. Ne ostavljati prazno.",
              example: "Marko: Lohn 2.200 € bruto + Kindergeld 250 € × 2 = 500 € | Ana: Lohn 1.800 € bruto | Djeca: 0 €",
            },
          ],
        },
      ],
      en: [
        { field: "Applicant", instruction: "Personal data. Applicant must be the main tenant." },
        { field: "Household members", instruction: "All persons in household with income." },
        { field: "Apartment", instruction: "Address, size in m², cold rent, utilities (excl. electricity), heating separately." },
        { field: "Income", instruction: "Gross income of all members (12 months). Amount depends on: number of household members, total income, and rent. Calculate in advance with the Wohngeldrechner: https://www.bmwsb.bund.de/DE/wohnen/wohngeld/wohngeldrechner/wohngeldrechner-2025_node.html" },
      ],
    },
    documents: {
      de: ["Mietvertrag (vollständig)", "Einkommensnachweise aller Haushaltsmitglieder (12 Monate)", "Meldebescheinigung", "Kontoauszüge (3 Monate)", "Letzte Nebenkostenabrechnung"],
      bs: ["Ugovor o najmu (kompletno)", "Dokazi o primanjima svih članova (12 mjeseci)", "Potvrda o prijavi prebivališta (Meldebescheinigung)", "Izvodi iz računa (3 mjeseca)", "Zadnji obračun režija (Nebenkostenabrechnung)"],
      en: ["Rental contract (complete)", "Income proof of all members (12 months)", "Registration certificate", "Bank statements (3 months)", "Last utility bill"],
    },
    processingTime: { de: "3–6 Wochen", bs: "3–6 sedmica", en: "3–6 weeks" },
    commonMistakes: {
      de: ["Haushaltsmitglieder nicht vollständig angegeben", "Einkommen nicht aktuell (letzte 12 Monate nötig)", "Mietvertrag fehlt oder ist unvollständig", "Heizkosten und Nebenkosten nicht getrennt", "Antrag zu spät gestellt — Wohngeld wird nicht rückwirkend gewährt"],
      bs: ["Članovi domaćinstva nepotpuno navedeni", "Primanja nisu aktuelna (trebaju zadnjih 12 mjeseci)", "Nedostaje ili je nepotpun ugovor o najmu", "Grijanje i režije nisu odvojeni", "Zahtjev podnesen prekasno — Wohngeld se ne isplaćuje retroaktivno"],
      en: ["Household members incomplete", "Income not current (last 12 months needed)", "Missing/incomplete rental contract", "Heating and utilities not separated", "Application filed too late — Wohngeld is not granted retroactively"],
    },
    officialPdf: "https://www.bmwsb.bund.de/DE/wohnen/wohngeld/wohngeldrechner/wohngeldrechner-2025_node.html",
    onlineLink: "https://verwaltung.bund.de/leistungsverzeichnis/DE/leistung/99107023037900/herausgeber/BE-L100108_120665/region/110000000000",
    officialInfoUrl: "https://www.bmwsb.bund.de",
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
    officialInfoUrl: "https://www.bmwsb.bund.de",
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
      de: "Studierende und Schüler/innen, deren Eltern die Ausbildung nicht finanzieren können. Ob BAföG gewährt wird, hängt von persönlichen Voraussetzungen ab: Staatsangehörigkeit bzw. aufenthaltsrechtlicher Status, Alter, Eignung für die gewünschte Ausbildung sowie privates Einkommen und Vermögen. Gefördert wird die erste Ausbildung an berufsbildenden Schulen, Kollegs, Akademien, Hochschulen und seit 2019 auch an privaten Berufsakademien.",
      bs: "Studenti i učenici čiji roditelji ne mogu finansirati školovanje/studij. Pravo na BAföG zavisi od: državljanstva ili boravišnog statusa, starosti, pogodnosti za željeno obrazovanje te ličnih primanja i imovine. Finansira se prva naobrazba na stručnim školama, akademijama, visokim školama i od 2019. i na privatnim Berufsakademien.",
      en: "Students and pupils whose parents cannot finance their education. Eligibility depends on: nationality or residence status, age, suitability for the desired training, and personal income/assets. Funding covers first training at vocational schools, academies, universities, and since 2019 also private Berufsakademien.",
    },
    authority: {
      de: "Das zuständige Amt für Ausbildungsförderung (BAföG-Amt). Bei Studium: beim Studierendenwerk der Hochschule. Bei schulischer Ausbildung: beim kommunalen Amt (Stadt/Kreis). Bei Auslandsausbildung: spezielles Auslandsförderungsamt. Zuständiges Amt finden: über bafoeg-digital.de \u2192 \u201eJetzt Amt finden\u201c oder über bafög.de \u2192 Antragstellung.",
      bs: "Nadležni ured za podršku obrazovanju (BAföG-Amt). Za studij: pri Studierendenwerk-u visoke škole. Za školsko obrazovanje: općinski/gradski ured. Za obrazovanje u inostranstvu: poseban Auslandsförderungsamt. Pronađite nadležni ured: na bafoeg-digital.de \u2192 \u201eJetzt Amt finden\u201c ili na bafög.de \u2192 Antragstellung.",
      en: "The responsible student financial aid office (BAföG-Amt). For university: at the Studierendenwerk. For school education: municipal office. For study abroad: special Auslandsförderungsamt. Find your office: via bafoeg-digital.de \u2192 'Jetzt Amt finden' or bafög.de \u2192 Antragstellung.",
    },
    formName: {
      de: "BAföG-Antrag (Formblätter 1\u20138). Der Antrag kann digital über das offizielle Portal bafoeg-digital.de gestellt werden (offiziell, sicher, kostenlos) oder schriftlich mit den Formblättern. Über BAföG Digital können auch Eltern und Partner/innen ihre Einkommenserklärung online ergänzen. Vorab-Berechnung möglich mit dem BAföG-Rechner auf bafoeg-digital.de/rechner. Wichtig: Auch bei Auslandsstudium/-praktikum muss ein gesonderter Antrag beim Auslandsförderungsamt gestellt werden.",
      bs: "BAföG zahtjev (Formblätter 1\u20138). Zahtjev se može podnijeti digitalno putem oficijelnog portala bafoeg-digital.de (službeno, sigurno, besplatno) ili pismeno na formularima. Preko BAföG Digital i roditelji/partneri mogu online dopuniti izjavu o primanjima. Prethodni izračun moguć na bafoeg-digital.de/rechner. Važno: Za studij/praksu u inostranstvu potreban je poseban zahtjev kod Auslandsförderungsamt-a.",
      en: "BAföG application (Formblätter 1\u20138). Can be filed digitally via the official portal bafoeg-digital.de (official, secure, free) or in writing. Parents/partners can supplement their income declaration online via BAföG Digital. Pre-calculation available at bafoeg-digital.de/rechner. Important: Study/internship abroad requires a separate application to the Auslandsförderungsamt.",
    },
    steps: {
      de: [
        { field: "FormBlatt 1 (Hauptantrag)", instruction: "Persönliche Daten, Ausbildungsstätte (Name + Adresse der Hochschule/Schule), eigene Wohnung oder bei Eltern, Familienstand. Digital: bafoeg-digital.de führt Schritt für Schritt durch den Antrag." },
        { field: "FormBlatt 3 (Elterneinkommen)", instruction: "Wird von Ihren Eltern ausgefüllt! Einkommen der Eltern aus dem vorletzten Kalenderjahr. Steuerbescheid der Eltern beifügen. Digital: Eltern können über bafoeg-digital.de/einkommenserklaerung separat online ausfüllen." },
        { field: "FormBlatt 5 (Leistungsnachweis)", instruction: "Ab dem 5. Semester: Nachweis über ausreichende Studienleistungen (von der Hochschule ausstellen lassen)." },
        { field: "Vermögenserklärung", instruction: "Eigenes Vermögen angeben: Konten, Sparverträge, Aktien, Kfz. Freibetrag: 15.000 € (unter 30 Jahre). Nachweise können bei digitaler Antragstellung später nachgereicht werden, um Fristen zu wahren." },
      ],
      bs: [
        {
          field: "FormBlatt 1 (glavni zahtjev)",
          instruction: "Lični podaci, obrazovna ustanova, stambena situacija, bračni status. Digitalno: bafoeg-digital.de vodi korak po korak kroz zahtjev.",
          cards: [
            {
              whatToWrite: "Ime, prezime, datum rođenja, adresa, državljanstvo, Steuer-ID, bračni status. Naziv i adresa obrazovne ustanove (univerzitet/škola). Da li živiš sam/a ili kod roditelja. Studijski program i semestar.",
              whereToFind: "Lični podaci: pasoš/lična karta. Steuer-ID: pismo od Finanzamt-a. Podaci o ustanovi: Immatrikulationsbescheinigung (potvrda o upisu). Adresa: Meldebescheinigung.",
              format: "Datum: DD.MM.GGGG. Steuer-ID: 11 cifara. Adresa ustanove: puni naziv + ulica + PLZ + grad.",
              commonMistakes: "Pogrešan naziv obrazovne ustanove. Nije navedeno da li živiš sam/a (bitan podatak za visinu BAföG-a!). Zahtjev podnesen prekasno — BAföG se NE dodjeljuje retroaktivno!",
              whenToLeaveEmpty: "Sva polja obavezna. Ako nemaš Steuer-ID, navedi to u napomeni.",
              example: "Familienname: Hodžić | Vorname: Marko | Geb.: 15.03.2000 | Hochschule: LMU München, Geschwister-Scholl-Platz 1, 80539 München | Eigene Wohnung: Ja",
            },
          ],
        },
        {
          field: "FormBlatt 3 (primanja roditelja)",
          instruction: "Popunjavaju RODITELJI! Primanja iz pretprošle kalendarske godine. Porezno rješenje roditelja priložiti. Digitalno: roditelji mogu popuniti na bafoeg-digital.de/einkommenserklaerung.",
          cards: [
            {
              whatToWrite: "Bruto primanja oba roditelja iz pretprošle kalendarske godine (npr. za zahtjev 2026. \u2192 primanja iz 2024.). Vrsta zaposlenja, porezna klasa, socijalni doprinosi.",
              whereToFind: "Porezno rješenje roditelja (Steuerbescheid) za pretprošlu godinu. Platne liste roditelja. Ako su roditelji u inostranstvu: potvrda o primanjima od nadležne službe.",
              format: "Iznosi u eurima godišnje (bruto). Porezna klasa: rimski broj (I-VI). Ako roditelji žive odvojeno, svaki popunjava zasebno.",
              commonMistakes: "NAJČEŠĆA GREŠKA: FormBlatt 3 uopće ne dostave! Pogrešna godina — traže se primanja iz pretprošle, ne prošle godine. Roditelji ne potpišu formular.",
              whenToLeaveEmpty: "Ako nemaš kontakt s roditeljima, možeš tražiti BAföG bez FormBlatt 3 — ali moraš to obrazložiti i navesti u zahtjevu (tzv. Vorausleistung nach § 36 BAföG).",
              example: "Vater: Bruttoeinkommen 2024: 42.000 \u20AC | Steuerklasse: III | Mutter: Bruttoeinkommen 2024: 28.000 \u20AC | Steuerklasse: V",
            },
          ],
        },
        {
          field: "FormBlatt 5 (dokaz o uspjehu)",
          instruction: "Od 5. semestra: dokaz o dovoljnom studijskom uspjehu. Izdaje ga fakultet/visoka škola.",
          cards: [
            {
              whatToWrite: "Potvrda fakulteta da si postigao/la dovoljno ECTS bodova do kraja 4. semestra. Obično: minimalan broj bodova koji fakultet zahtijeva.",
              whereToFind: "Studierendensekretariat ili Prüfungsamt tvog fakulteta. Neki fakulteti šalju automatski, kod nekih moraš zatražiti.",
              format: "Formular popunjava fakultet — ti samo predaš BAföG-Amt-u. Datum i pečat fakulteta obavezni.",
              commonMistakes: "Zaboravljeno zatražiti na vrijeme (treba PRIJE početka 5. semestra!). Predano bez pečata/potpisa fakulteta.",
              whenToLeaveEmpty: "Nije potrebno za prva 4 semestra. Ako ponavljaš semestar iz opravdanih razloga, priloži obrazloženje.",
              example: "Leistungsnachweis LMU München: Student Marko Hodžić, Matrikelnr. 12345678, hat bis Ende des 4. Fachsemesters die üblichen Leistungen erbracht. [Pečat + potpis]",
            },
          ],
        },
        {
          field: "Izjava o imovini",
          instruction: "Vlastita imovina: računi, štednja, dionice, automobil. Freibetrag: 15.000 \u20AC (do 30 godina). Kod digitalne prijave dokumenti se mogu naknadno dostaviti.",
          cards: [
            {
              whatToWrite: "Svi bankovni računi (IBAN + stanje), štedni ugovori, dionice/fondovi, vrijednost automobila, nekretnine, gotovina. Ukupna imovina ne smije prelaziti 15.000 \u20AC (ako si mlađi od 30).",
              whereToFind: "Stanje računa: online-banking ili izvod na dan podnošenja zahtjeva. Štednja: ugovor sa bankom. Automobil: procjena vrijednosti (Schwacke-Liste ili ADAC). Dionice: depot-izvod.",
              format: "Svi iznosi u eurima. IBAN: 22 znaka. Navesti datum stanja (dan podnošenja zahtjeva). Svaki račun zasebno.",
              commonMistakes: "Imovina iznad 15.000 \u20AC nije prijavljena — to je prevara i može imati pravne posljedice! Zaboravljeni računi u inostranstvu. Kripto-valute nisu navedene (računaju se kao imovina!).",
              whenToLeaveEmpty: "Ako nemaš nikakvu imovinu, upiši 0 \u20AC — ne ostavljaj prazno.",
              example: "Girokonto (N26): DE89 3704 0044 0532 0130 00 — Stanje: 1.200 \u20AC | Sparkonto: 3.500 \u20AC | Kfz: keines | Gesamt: 4.700 \u20AC (unter Freibetrag)",
            },
          ],
        },
      ],
      en: [
        { field: "Form 1 (main)", instruction: "Personal data, educational institution, housing. Digital: bafoeg-digital.de guides you step by step." },
        { field: "Form 3 (parental income)", instruction: "Filled by parents! Income from two calendar years prior. Parents can fill in online at bafoeg-digital.de/einkommenserklaerung." },
        { field: "Form 5 (performance)", instruction: "From 5th semester: proof of sufficient academic performance from the university." },
        { field: "Asset declaration", instruction: "Own assets. Exemption: €15,000 (under 30). Documents can be submitted later when filing digitally." },
      ],
    },
    documents: {
      de: ["Immatrikulationsbescheinigung", "Steuerbescheid der Eltern (vorletztes Kalenderjahr)", "Mietvertrag (bei eigener Wohnung)", "Kontoauszüge aller eigenen Konten (Stichtag = Antragsdatum)", "Aufenthaltstitel (bei Nicht-EU-Staatsangehörigen)"],
      bs: ["Potvrda o upisu (Immatrikulationsbescheinigung)", "Porezno rješenje roditelja (pretprošla kalendarska godina)", "Ugovor o najmu (ako živiš sam/a)", "Izvodi iz svih ličnih računa (na dan podnošenja zahtjeva)", "Boravišna dozvola (za državljane izvan EU)"],
      en: ["Enrollment certificate", "Parents' tax notice (two calendar years prior)", "Rental contract (if living independently)", "Bank statements of all own accounts (as of application date)", "Residence permit (non-EU citizens)"],
    },
    processingTime: { de: "6–10 Wochen (Antrag frühzeitig stellen! Nachweise können bei digitaler Antragstellung nachgereicht werden, um Fristen zu wahren.)", bs: "6–10 sedmica (podnijeti zahtjev na vrijeme! Kod digitalne prijave dokumenti se mogu naknadno dostaviti da se ispoštuju rokovi.)", en: "6–10 weeks (apply early! When filing digitally, documents can be submitted later to meet deadlines.)" },
    commonMistakes: {
      de: ["Antrag zu spät gestellt – BAföG gibt es nicht rückwirkend, sondern erst ab Antragsmonat!", "FormBlatt 3 der Eltern fehlt (häufigster Fehler!)", "Vermögen über Freibetrag nicht angegeben", "Leistungsnachweis ab 5. Semester vergessen", "Bei Auslandsstudium keinen separaten Antrag beim Auslandsförderungsamt gestellt"],
      bs: ["Zahtjev podnesen prekasno — BAföG se NE isplaćuje retroaktivno, nego tek od mjeseca podnošenja!", "FormBlatt 3 roditelja nedostaje (najčešća greška!)", "Imovina iznad limita nije navedena", "Zaboravljen dokaz o uspjehu od 5. semestra", "Za studij u inostranstvu nije podnesen poseban zahtjev kod Auslandsförderungsamt-a"],
      en: ["Application too late – no retroactive BAföG, only from month of application!", "Parents' Form 3 missing (most common error!)", "Assets above exemption not declared", "Performance certificate from 5th semester forgotten", "No separate application filed for study abroad"],
    },
    officialPdf: "",
    onlineLink: "https://bafoeg-digital.de",
    officialInfoUrl: "https://www.xn--bafg-7qa.de/bafoeg/de/das-bafoeg-alle-infos-auf-einen-blick/das-bafoeg-alle-infos-auf-einen-blick_node.html",
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
    officialInfoUrl: "https://www.bamf.de/DE/Startseite/startseite_node.html",
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
    onlineLink: "https://www.bundesjustizamt.de",
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
    officialInfoUrl: "https://www.bmi.bund.de",
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
    officialInfoUrl: "https://www.bmwsb.bund.de",
  },
  // ===================== KRIPPENGELD BAYERN =====================
  {
    slug: "krippengeld-bayern",
    category: "familie",
    title: {
      de: "Bayerisches Krippengeld",
      bs: "Bavarsko Krippengeld (naknada za jaslice)",
      en: "Bavarian Childcare Subsidy (Krippengeld)",
    },
    who: {
      de: "Eltern mit Wohnsitz in Bayern, deren Kind eine nach BayKiBiG geförderte Kindertageseinrichtung oder Kindertagespflege besucht. Das Kind muss zwischen dem 1. und 3. Lebensjahr sein. Die Einkommensgrenze beträgt 60.000 € (plus 5.000 € für jedes weitere kindergeldberechtigte Kind). Nicht anspruchsberechtigt bei Bezug von Bürgergeld, Wohngeld, Kinderzuschlag oder Leistungen nach dem Asylbewerberleistungsgesetz.",
      bs: "Roditelji sa prebivalištem u Bavarskoj čije dijete pohađa ustanovu za dnevnu njegu (Kita/Kindertagespflege) koja je financirana po BayKiBiG-u. Dijete mora imati između 1 i 3 godine. Granica prihoda: 60.000 € (+ 5.000 € za svako dodatno dijete koje prima Kindergeld). Pravo NEMAJU primaoci Bürgergeld-a, Wohngeld-a, Kinderzuschlag-a ili pomoći za azilante — oni mogu zatražiti preuzimanje troškova preko Jugendhilfe.",
      en: "Parents residing in Bavaria whose child attends a BayKiBiG-funded childcare facility. The child must be between 1 and 3 years old. Income limit: €60,000 (+ €5,000 per additional child receiving Kindergeld). Not eligible if receiving Bürgergeld, Wohngeld, Kinderzuschlag, or asylum seeker benefits.",
    },
    authority: {
      de: "Zentrum Bayern Familie und Soziales (ZBFS). Zuständig je nach Regierungsbezirk: Schwaben & Oberbayern → ZBFS Region Schwaben, 86135 Augsburg; Niederbayern & Mittelfranken → ZBFS Region Niederbayern, 84026 Landshut; Oberfranken, Unterfranken & Oberpfalz → ZBFS Region Unterfranken, 97025 Würzburg.",
      bs: "Zentrum Bayern Familie und Soziales (ZBFS). Nadležna regionalna služba zavisi od okruga: Schwaben i Oberbayern → ZBFS Region Schwaben, 86135 Augsburg; Niederbayern i Mittelfranken → ZBFS Region Niederbayern, 84026 Landshut; Oberfranken, Unterfranken i Oberpfalz → ZBFS Region Unterfranken, 97025 Würzburg.",
      en: "Zentrum Bayern Familie und Soziales (ZBFS). Regional office depends on district: Schwaben & Oberbayern → Augsburg; Niederbayern & Mittelfranken → Landshut; Oberfranken, Unterfranken & Oberpfalz → Würzburg.",
    },
    formName: {
      de: "Antrag auf Bayerisches Krippengeld — schriftlich per Post oder online über den BayernPortal-Antrag. Das Antragsformular ist bei allen drei ZBFS-Regionaldienststellen identisch.",
      bs: "Zahtjev za Bavarsko Krippengeld — pismeno poštom ili online putem BayernPortal-a. Formular je identičan za sve tri ZBFS regionalne službe.",
      en: "Application for Bavarian Krippengeld — in writing by mail or online via BayernPortal. The form is identical for all three ZBFS regional offices.",
    },
    steps: {
      de: [
        { field: "Angaben zum Kind", instruction: "Name, Geburtsdatum, Geschlecht und Steuer-ID des Kindes eintragen." },
        { field: "Angaben zur Betreuung", instruction: "Name und Anschrift der Kindertageseinrichtung/Tagespflege, BayKiBiG-Förderung bestätigen, Betreuungsbeginn und monatlicher Elternbeitrag." },
        { field: "Angaben zur antragstellenden Person", instruction: "Persönliche Daten, Anschrift, Staatsangehörigkeit, Steuer-ID." },
        { field: "Angaben zum anderen Elternteil / Partner", instruction: "Daten des anderen Elternteils oder Partners, Steuer-ID." },
        { field: "Einkommensgrenze", instruction: "Erklärung, dass das Einkommen unter 60.000 € liegt (+ 5.000 € je weiteres kindergeldberechtigtes Kind)." },
        { field: "Bankverbindung", instruction: "IBAN und Kontoinhaber für die Auszahlung." },
        { field: "Weitere Kinder im Kindergeldbezug", instruction: "Alle Kinder auflisten, für die Kindergeld bezogen wird (relevant für die Einkommensgrenze)." },
        { field: "Unterschrift", instruction: "Antrag unterschreiben. Bei gemeinsamer Sorge müssen beide Elternteile unterschreiben." },
      ],
      bs: [
        {
          field: "Podaci o djetetu (Angaben zum Kind)",
          instruction: "Unesite ime, prezime, datum rođenja, spol i porezni ID (Steuer-ID) djeteta za koje se podnosi zahtjev.",
          cards: [
            {
              whatToWrite: "Prezime (Familienname), ime (Vorname), datum rođenja, spol (männlich/weiblich/divers) i 11-cifreni Steuer-ID djeteta.",
              whereToFind: "Rodni list djeteta (Geburtsurkunde) i pismo sa Steuer-ID koje dolazi automatski nakon prijave prebivališta djeteta.",
              format: "Ime i prezime kao na rodnom listu. Datum: DD.MM.YYYY. Steuer-ID: 11 cifara bez razmaka.",
              commonMistakes: "Upisivanje Steuer-ID roditelja umjesto djeteta. Pogrešan datum rođenja. Ime drugačije od onoga na rodnom listu.",
              whenToLeaveEmpty: "Steuer-ID ostavite prazno samo ako dijete još nije dobilo Steuer-ID (napišite 'noch nicht vergeben').",
              example: "Familienname: Hodžić | Vorname: Hana | Geb.: 05.06.2023 | Geschlecht: weiblich | Steuer-ID: 98 765 432 109",
            },
          ],
        },
        {
          field: "Podaci o čuvanju djeteta (Angaben zur Betreuung)",
          instruction: "Unesite podatke o ustanovi za dnevnu njegu ili dnevnom roditelju (Tagespflege) kod kojeg je dijete.",
          cards: [
            {
              whatToWrite: "Naziv ustanove (Kindertageseinrichtung) ili ime dnevnog roditelja (Tagespflegeperson), adresa, datum početka čuvanja, mjesečni iznos koji plaćate (Elternbeitrag).",
              whereToFind: "Ugovor o čuvanju (Betreuungsvertrag) koji ste potpisali sa ustanovom/dnevnim roditeljem. Iznos naknade stoji na fakturi ili ugovoru.",
              format: "Puni naziv ustanove, kompletna adresa. Datum: DD.MM.YYYY. Iznos u EUR bez centi (npr. 250).",
              commonMistakes: "Nenavođenje da je ustanova financirana po BayKiBiG-u (obavezno zaokružiti 'Ja'). Pogrešan iznos (upisati ono što VI plaćate, ne ukupni trošak). Zaboravljen datum početka.",
              whenToLeaveEmpty: "Polje za Tagespflege ostavite prazno ako dijete ide u Kita, i obrnuto — popunite samo relevantni dio.",
              example: "Einrichtung: Kita Sonnenschein | Adresse: Musterstr. 12, 80331 München | Beginn: 01.09.2024 | Elternbeitrag: 250 €/Monat | BayKiBiG gefördert: Ja",
            },
          ],
        },
        {
          field: "Podaci o podnosiocu zahtjeva (Antragstellende Person)",
          instruction: "Unesite svoje lične podatke — ime, adresu, državljanstvo i Steuer-ID.",
          cards: [
            {
              whatToWrite: "Prezime, ime, datum rođenja, adresa u Bavarskoj, državljanstvo, Steuer-ID, telefon/email za kontakt.",
              whereToFind: "Pasoš ili lična karta za lične podatke. Steuer-ID: pismo od Bundeszentralamt für Steuern ili platna lista.",
              format: "Ime kao u pasošu. Datum: DD.MM.YYYY. Steuer-ID: 11 cifara. Adresa: ulica, kućni broj, PLZ, grad.",
              commonMistakes: "Adresa se ne poklapa sa prijavom prebivališta (Meldebestätigung). Zaboravljen Steuer-ID. Državljanstvo napisano pogrešno.",
              whenToLeaveEmpty: "Sva polja su obavezna. Ako nemate Steuer-ID, napišite 'noch nicht vergeben'.",
              example: "Familienname: Hodžić | Vorname: Emir | Geb.: 12.04.1989 | Adresse: Maximilianstr. 5, 80539 München | Staatsangehörigkeit: Bosnien und Herzegowina | Steuer-ID: 12 345 678 901",
            },
          ],
        },
        {
          field: "Podaci o drugom roditelju / partneru",
          instruction: "Unesite podatke o drugom roditelju djeteta ili vašem bračnom/životnom partneru.",
          cards: [
            {
              whatToWrite: "Prezime, ime, datum rođenja, adresa (ako se razlikuje), državljanstvo, Steuer-ID partnera/drugog roditelja.",
              whereToFind: "Pasoš ili lična karta drugog roditelja/partnera.",
              format: "Isti format kao za podnosioca zahtjeva. Steuer-ID: 11 cifara.",
              commonMistakes: "Pogrešan Steuer-ID partnera. Nedostaje adresa ako partner živi na drugoj adresi. Polje ostavljeno prazno iako postoji drugi roditelj.",
              whenToLeaveEmpty: "Samo ako ste samohrani roditelj bez partnera (alleinerziehend). U tom slučaju zaokružite odgovarajuću opciju.",
              example: "Familienname: Hodžić | Vorname: Amra | Geb.: 22.08.1991 | Steuer-ID: 98 765 432 101",
            },
          ],
        },
        {
          field: "Granica prihoda (Einkommensgrenze)",
          instruction: "Potvrdite da vaš ukupni godišnji prihod ne prelazi 60.000 € (+ 5.000 € za svako dodatno dijete koje prima Kindergeld).",
          cards: [
            {
              whatToWrite: "Zaokružite izjavu da vaš prihod (Einkünfte) u smislu §2 EStG ne prelazi granicu. Ako imate npr. 2 djece sa Kindergeldom, granica je 65.000 €.",
              whereToFind: "Porezno rješenje (Einkommensteuerbescheid) za relevantnu godinu. Ako ga nemate, provjerite platne liste — zbrojite bruto godišnje prihode oba roditelja.",
              format: "Samo zaokružiti — nije potrebno upisivati tačan iznos prihoda.",
              commonMistakes: "Zaboravljeno da se granica odnosi na ZAJEDNIČKE prihode oba roditelja/partnera. Primaoci Bürgergeld-a, Wohngeld-a ili Kinderzuschlag-a nemaju pravo na Krippengeld (trebaju tražiti Jugendhilfe).",
              whenToLeaveEmpty: "Ne ostavljajte prazno — morate potvrditi ili negirati.",
              example: "Izjava: ✓ 'Hiermit erkläre ich, dass die Einkommensgrenze nicht überschritten wird.' (2 djece → granica 65.000 €)",
            },
          ],
        },
        {
          field: "Bankovni podaci (Bankverbindung)",
          instruction: "Unesite IBAN i ime vlasnika računa na koji želite primati isplatu (100 €/mjesečno).",
          cards: [
            {
              whatToWrite: "IBAN (DE + 20 cifara), naziv banke i ime vlasnika računa (Kontoinhaber).",
              whereToFind: "Bankovska kartica, online banking aplikacija ili izvod.",
              format: "IBAN: DE + 20 cifara, bez razmaka u formularu. Vlasnik računa: ime i prezime kao kod banke.",
              commonMistakes: "Pogrešan IBAN (provjerite svaku cifru). Račun nije na ime podnosioca zahtjeva (može biti zajednički račun). Upisivanje BIC-a — ovdje nije potreban.",
              whenToLeaveEmpty: "Nikada ne ostavljajte prazno — bez IBAN-a nema isplate.",
              example: "IBAN: DE89 3704 0044 0532 0130 00 | Kontoinhaber: Emir Hodžić",
            },
          ],
        },
        {
          field: "Dodatna djeca sa Kindergeldom (Weitere Kinder)",
          instruction: "Navedite svu djecu za koja primate Kindergeld — ovo utiče na izračun granice prihoda.",
          cards: [
            {
              whatToWrite: "Za svako dijete: ime, prezime, datum rođenja. Ovo uključuje i dijete za koje se traži Krippengeld.",
              whereToFind: "Rješenje o Kindergeldu (Kindergeldbescheid) ili podaci iz Familienkasse.",
              format: "Lista djece sa imenom i datumom rođenja. Upisujte po redu, počevši od najstarijeg.",
              commonMistakes: "Zaboravljeno dijete za koje se traži Krippengeld. Djeca koja ne primaju Kindergeld se ne upisuju ovdje.",
              whenToLeaveEmpty: "Nikada — uvijek unesite barem dijete za koje podnosite zahtjev.",
              example: "1. Hana Hodžić, geb. 05.06.2023 | 2. Amir Hodžić, geb. 10.01.2020",
            },
          ],
        },
        {
          field: "Potpis (Unterschrift)",
          instruction: "Potpišite zahtjev. Ako dijete ima dva roditelja sa zajedničkim starateljstvom, OBOJE moraju potpisati.",
          cards: [
            {
              whatToWrite: "Datum i vlastoručni potpis. Ako postoji drugi roditelj/partner — i njegov potpis na predviđenom mjestu.",
              whereToFind: "N/A — potpis dajete lično.",
              format: "Datum: DD.MM.YYYY. Potpis: vlastoručno, čitko. Oba roditelja na predviđenim mjestima.",
              commonMistakes: "Nedostaje potpis drugog roditelja (zahtjev se odbija!). Zaboravljen datum uz potpis. Potpis ne odgovara imenu na zahtjevu.",
              whenToLeaveEmpty: "Potpis drugog roditelja samo ako ste samohrani roditelj (alleinerziehend) — u tom slučaju potpišite samo vi.",
              example: "Datum: 15.03.2025 | Unterschrift Antragsteller: [potpis] | Unterschrift anderer Elternteil: [potpis]",
            },
          ],
        },
      ],
      en: [
        { field: "Child Information", instruction: "Enter the child's name, date of birth, gender, and tax ID (Steuer-ID)." },
        { field: "Childcare Details", instruction: "Enter details of the childcare facility: name, address, BayKiBiG funding status, start date, and monthly parental fee." },
        { field: "Applicant Information", instruction: "Your personal details: name, address in Bavaria, nationality, and Steuer-ID." },
        { field: "Other Parent / Partner", instruction: "Details of the other parent or your partner, including their Steuer-ID." },
        { field: "Income Limit Declaration", instruction: "Confirm that your combined annual income does not exceed €60,000 (+ €5,000 per additional child receiving Kindergeld)." },
        { field: "Bank Details", instruction: "Enter your IBAN and account holder name for the monthly €100 payment." },
        { field: "Additional Children Receiving Kindergeld", instruction: "List all children for whom you receive Kindergeld (affects the income threshold calculation)." },
        { field: "Signature", instruction: "Sign the application. Both parents must sign if they share custody." },
      ],
    },
    documents: {
      de: [
        "Personalausweis oder Reisepass (Kopie)",
        "Geburtsurkunde des Kindes",
        "Betreuungsvertrag mit der Kindertageseinrichtung/Tagespflege",
        "Nachweis über BayKiBiG-Förderung der Einrichtung",
        "Einkommensteuerbescheid (bei Bedarf zur Prüfung der Einkommensgrenze)",
        "Kindergeldbescheid",
      ],
      bs: [
        "Pasoš ili lična karta (kopija)",
        "Rodni list djeteta (Geburtsurkunde)",
        "Ugovor o čuvanju djeteta (Betreuungsvertrag) sa Kita/Tagespflege",
        "Dokaz da je ustanova financirana po BayKiBiG-u",
        "Porezno rješenje (Einkommensteuerbescheid) — po potrebi za provjeru prihoda",
        "Rješenje o Kindergeldu (Kindergeldbescheid)",
      ],
      en: [
        "ID or passport (copy)",
        "Child's birth certificate",
        "Childcare contract (Betreuungsvertrag)",
        "Proof of BayKiBiG funding for the facility",
        "Income tax assessment (Einkommensteuerbescheid) if needed",
        "Kindergeld notification (Kindergeldbescheid)",
      ],
    },
    processingTime: {
      de: "ca. 4–8 Wochen",
      bs: "oko 4–8 sedmica",
      en: "approx. 4–8 weeks",
    },
    commonMistakes: {
      de: [
        "Antrag wird gestellt, obwohl Bürgergeld/Wohngeld/Kinderzuschlag bezogen wird (kein Anspruch!)",
        "Fehlende Unterschrift des zweiten Elternteils bei gemeinsamer Sorge",
        "Betreuungseinrichtung ist nicht nach BayKiBiG gefördert",
        "Einkommensgrenze nicht korrekt berechnet (beide Elternteile zusammen!)",
        "Kind hat das 3. Lebensjahr bereits vollendet (Leistung endet am 31.08. des Jahres)",
      ],
      bs: [
        "Zahtjev podnesen iako primate Bürgergeld/Wohngeld/Kinderzuschlag (nemate pravo!)",
        "Nedostaje potpis drugog roditelja kod zajedničkog starateljstva",
        "Ustanova za čuvanje nije financirana po BayKiBiG-u",
        "Granica prihoda pogrešno izračunata (moraju se zbrojiti prihodi OBA roditelja!)",
        "Dijete je već napunilo 3 godine (isplata prestaje 31.08. te godine)",
      ],
      en: [
        "Application filed while receiving Bürgergeld/Wohngeld/Kinderzuschlag (not eligible!)",
        "Missing signature of second parent in shared custody cases",
        "Childcare facility is not BayKiBiG-funded",
        "Income limit incorrectly calculated (both parents' income combined!)",
        "Child has already turned 3 (benefit ends Aug 31 of that year)",
      ],
    },
    officialPdf: "https://www.zbfs.bayern.de/dam/jcr:cfe8cb4c-d7c1-4b97-a269-a97e3b42098f/Antrag_Krippengeld.pdf",
    onlineLink: "https://www.zbfs.bayern.de/familienleistungen/krippengeld/",
    officialInfoUrl: "https://www.zbfs.bayern.de/familienleistungen/krippengeld/",
  },
  // ===================== SOZIALHILFE =====================
  {
    slug: "sozialhilfe",
    category: "wohnen",
    title: {
      de: "Sozialhilfe (Grundsicherung)",
      bs: "Socijalna pomoć (Sozialhilfe / Grundsicherung)",
      en: "Social Assistance (Sozialhilfe / Grundsicherung)",
    },
    who: {
      de: "Personen, die ihren Lebensunterhalt nicht aus eigenen Mitteln bestreiten können und keinen Anspruch auf Bürgergeld haben. Es gibt drei Hauptleistungen: 1) Hilfe zum Lebensunterhalt (SGB XII, Kap. 3) – für vorübergehend nicht erwerbsfähige Personen, 2) Grundsicherung im Alter und bei Erwerbsminderung (SGB XII, Kap. 4) – für Personen ab Rentenalter oder bei dauerhafter voller Erwerbsminderung, 3) Bürgergeld (SGB II) – für erwerbsfähige Personen (siehe separater Guide). Sozialhilfe ist das letzte \u201eAuffangnetz\u201c für ein menschenwürdiges Leben und gesellschaftliche Teilhabe.",
      bs: "Osobe koje ne mogu pokriti životne troškove iz vlastitih sredstava i nemaju pravo na Bürgergeld. Tri glavne naknade: 1) Hilfe zum Lebensunterhalt (SGB XII, pogl. 3) \u2013 za privremeno radno nesposobne osobe, 2) Grundsicherung im Alter und bei Erwerbsminderung (SGB XII, pogl. 4) \u2013 za osobe u penzijskom dobu ili trajno potpuno radno nesposobne, 3) Bürgergeld (SGB II) \u2013 za radno sposobne (vidi poseban vodič). Sozialhilfe je posljednja \u201esigurnosna mreža\u201c za dostojanstven život i učešće u društvu.",
      en: "Persons who cannot cover their living expenses from own means and have no claim to Bürgergeld. Three main benefits: 1) Hilfe zum Lebensunterhalt (SGB XII, Ch. 3) – for temporarily non-employable persons, 2) Grundsicherung im Alter und bei Erwerbsminderung (SGB XII, Ch. 4) – for persons at retirement age or with permanent full disability, 3) Bürgergeld (SGB II) – for employable persons (see separate guide). Sozialhilfe is the last 'safety net' for a dignified life and social participation.",
    },
    authority: {
      de: "Sozialamt der Gemeinde oder des Kreises am Wohnort. Bei Hilfe zum Lebensunterhalt und Grundsicherung im Alter: örtliches Sozialamt. Die zuständige Stelle finden Sie über die Sozialplattform des Bundes: sozialplattform.de. Antrag formlos oder mit Antragsformular des Sozialamts möglich.",
      bs: "Sozialamt (služba za socijalnu pomoć) općine ili okruga prema mjestu stanovanja. Za Hilfe zum Lebensunterhalt i Grundsicherung im Alter: lokalni Sozialamt. Nadležnu službu možete pronaći putem savezne Sozialplattform: sozialplattform.de. Zahtjev se može podnijeti neformalno ili na formularu Sozialamt-a.",
      en: "Social welfare office (Sozialamt) of the municipality or district at your place of residence. For Hilfe zum Lebensunterhalt and Grundsicherung im Alter: local Sozialamt. Find the responsible office via the federal Sozialplattform: sozialplattform.de. Application can be informal or using the Sozialamt's form.",
    },
    formName: {
      de: "Antrag auf Sozialhilfe / Grundsicherung (SGB XII). Je nach Leistungsart unterschiedliche Formulare: Antrag auf Hilfe zum Lebensunterhalt oder Antrag auf Grundsicherung im Alter und bei Erwerbsminderung. Formulare beim örtlichen Sozialamt erhältlich. Teilweise auch online über sozialplattform.de beantragbar.",
      bs: "Zahtjev za socijalnu pomoć / Grundsicherung (SGB XII). Ovisno o vrsti naknade različiti formulari: zahtjev za Hilfe zum Lebensunterhalt ili zahtjev za Grundsicherung im Alter und bei Erwerbsminderung. Formulare dobijete kod lokalnog Sozialamt-a. Djelimično dostupno i online putem sozialplattform.de.",
      en: "Application for social assistance / Grundsicherung (SGB XII). Different forms depending on benefit type: Hilfe zum Lebensunterhalt or Grundsicherung im Alter und bei Erwerbsminderung. Forms available at local Sozialamt. Partially available online via sozialplattform.de.",
    },
    steps: {
      de: [
        { field: "Persönliche Daten", instruction: "Name, Geburtsdatum, Familienstand, Staatsangehörigkeit, Aufenthaltsstatus, Steuer-ID, Sozialversicherungsnummer eintragen." },
        { field: "Haushaltssituation", instruction: "Alle im Haushalt lebenden Personen angeben: Name, Geburtsdatum, Verwandtschaftsverhältnis. Ehegatten/Partner und minderjährige Kinder bilden eine Einsatzgemeinschaft." },
        { field: "Wohnsituation", instruction: "Adresse, Wohnform (Miete/Eigentum), Kaltmiete, Nebenkosten, Heizkosten. Mietvertrag beifügen." },
        { field: "Einkommen", instruction: "Alle Einkommensarten: Rente, Pension, Unterhalt, Kindergeld, Wohngeld, Krankengeld, Zinsen. Auch Einkommen des Partners/Ehegatten und der Kinder angeben." },
        { field: "Vermögen", instruction: "Bargeld, Konten, Sparbücher, Lebensversicherungen, Immobilien, Kfz. Schonvermögen beachten (variiert je nach Leistungsart). Kontoauszüge der letzten 3 Monate beifügen." },
        { field: "Erwerbsfähigkeit / Gesundheit", instruction: "Ärztliche Bescheinigung über Erwerbsminderung beifügen (bei Grundsicherung bei Erwerbsminderung). Rentenbescheid (bei Grundsicherung im Alter). Angabe, ob und wie viele Stunden täglich arbeitsfähig." },
        { field: "Besondere Bedarfe", instruction: "Mehrbedarf ankreuzen falls zutreffend: Schwangerschaft, Alleinerziehend, Behinderung (Merkzeichen G), kostenaufwändige Ernährung. Einmalige Bedarfe: Erstausstattung Wohnung, Schwangerschaftsbekleidung, Klassenfahrten." },
        { field: "Unterschrift und Anlagen", instruction: "Antrag unterschreiben (bei Einsatzgemeinschaft: alle volljährigen Mitglieder). Alle Nachweise beifügen: Mietvertrag, Kontoauszüge, Einkommensnachweise, Rentenbescheid, ärztliche Atteste." },
      ],
      bs: [
        {
          field: "Lični podaci",
          instruction: "Ime, datum rođenja, bračni status, državljanstvo, boravišni status, Steuer-ID, broj socijalnog osiguranja.",
          cards: [
            {
              whatToWrite: "Ime i prezime, datum rođenja (DD.MM.GGGG), mjesto rođenja, državljanstvo, bračni status (ledig/verheiratet/geschieden/verwitwet), Steuer-ID (11 cifara), Sozialversicherungsnummer, boravišni status i vrsta dozvole.",
              whereToFind: "Pasoš/lična karta, Aufenthaltstitel, pismo od Finanzamt-a (Steuer-ID), Sozialversicherungsausweis, Meldebescheinigung.",
              format: "Datum: DD.MM.GGGG. Steuer-ID: 11 cifara. Sozialversicherungsnummer: format XX DDMMYY X XXX X.",
              commonMistakes: "Zaboravljen boravišni status (obavezan za strance!). Steuer-ID zamijenjen sa Steuernummer. Nepotpuni podaci o državljanstvu.",
              whenToLeaveEmpty: "Sva polja obavezna. Ako nemaš Steuer-ID ili SV-broj, navedi to u napomeni.",
              example: "Familienname: Hodžić | Vorname: Marko | Geb.: 15.03.1958 | Staatsangehörigkeit: Bosnien und Herzegowina | Familienstand: verheiratet | Steuer-ID: 12 345 678 901",
            },
          ],
        },
        {
          field: "Situacija u domaćinstvu",
          instruction: "Sve osobe u domaćinstvu: ime, datum rođenja, srodstvo. Supružnici/partneri i maloljetna djeca čine Einsatzgemeinschaft (zajednicu za obračun).",
          cards: [
            {
              whatToWrite: "Za svaku osobu: ime, prezime, datum rođenja, srodstvo (Ehegatte/Partner, Kind, Elternteil, sonstige). Navesti da li osoba ostvaruje vlastita primanja.",
              whereToFind: "Lični dokumenti članova domaćinstva. Vjenčani list (za bračni status). Rodni listovi djece. Meldebescheinigung (ko je prijavljen na adresi).",
              format: "Svaka osoba u zasebnom redu. Srodstvo na njemačkom: Ehegatte (suprug/a), Kind (dijete), Elternteil (roditelj).",
              commonMistakes: "Nepotpun popis članova — zaboravljena djeca ili partner. Osoba koja živi na adresi ali nije navedena. Ne navođenje primanja članova domaćinstva.",
              whenToLeaveEmpty: "Ako živiš sam/a, navedi samo sebe. Ne ostavljaj prazno — napiši \u201eEinpersonenhaushalt\u201c.",
              example: "1) Hodžić Marko, 15.03.1958, Antragsteller | 2) Hodžić Ana, 22.07.1960, Ehegattin | 3) Hodžić Emina, 10.05.2005, Kind",
            },
          ],
        },
        {
          field: "Stambena situacija",
          instruction: "Adresa, vrsta stanovanja (kirija/vlasništvo), hladna kirija, režije, grijanje. Priložiti ugovor o najmu.",
          cards: [
            {
              whatToWrite: "Puna adresa, vrsta stanovanja (Miete = kirija, Eigentum = vlasništvo), Kaltmiete (hladna kirija), Nebenkosten (režije bez struje), Heizkosten (grijanje) — sve odvojeno.",
              whereToFind: "Ugovor o najmu (Mietvertrag), posljednji obračun režija (Nebenkostenabrechnung), račun za grijanje.",
              format: "Iznosi u eurima mjesečno. Površina u m². Adresa: ulica + broj, PLZ + grad.",
              commonMistakes: "Grijanje i režije nisu odvojeni. Navedena Warmmiete umjesto Kaltmiete. Nedostaje ugovor o najmu kao prilog.",
              whenToLeaveEmpty: "Ako si beskućnik/ca, navedi trenutnu adresu (npr. Obdachlosenunterkunft) ili adresu kontakt-osobe.",
              example: "Adresse: Schillerstr. 12, 80336 München | Miete | Kaltmiete: 650 \u20AC | Nebenkosten: 100 \u20AC | Heizkosten: 70 \u20AC | Wohnfläche: 55 m²",
            },
          ],
        },
        {
          field: "Primanja",
          instruction: "Sva primanja: penzija, alimentacija, Kindergeld, Wohngeld, Krankengeld, kamate. I primanja partnera/djece.",
          cards: [
            {
              whatToWrite: "Vrsta i iznos svih primanja svih članova domaćinstva: penzija (Rente), alimentacija (Unterhalt), Kindergeld, Wohngeld, Krankengeld, kamate na štednju, prihodi od najma.",
              whereToFind: "Rentenbescheid (rješenje o penziji), platne liste, rješenja o Kindergeld/Wohngeld, potvrde o alimentaciji, bankovni izvodi.",
              format: "Iznosi u eurima mjesečno (bruto). Za svaki prihod navesti vrstu i osobu koja ga prima.",
              commonMistakes: "Zaboravljen Kindergeld ili alimentacija. Navedena neto umjesto bruto primanja. Primanja partnera nisu navedena (obavezna su!).",
              whenToLeaveEmpty: "Ako član nema primanja, upisati 0 \u20AC. Ne ostavljati prazno.",
              example: "Marko: Rente 580 \u20AC | Ana: kein Einkommen 0 \u20AC | Kindergeld: 250 \u20AC (za Eminu)",
            },
          ],
        },
        {
          field: "Imovina",
          instruction: "Gotovina, računi, štednja, osiguranja, nekretnine, automobil. Zaštićena imovina (Schonvermögen) zavisi od vrste naknade. Izvodi iz računa za zadnja 3 mjeseca.",
          cards: [
            {
              whatToWrite: "Svi bankovni računi (IBAN + stanje), štedne knjižice, životna osiguranja (Lebensversicherung), nekretnine, automobil (marka, godište, vrijednost), gotovina.",
              whereToFind: "Bankovni izvodi (zadnja 3 mjeseca, kompletni!), ugovori o osiguranju, procjena vrijednosti automobila, katastarski izvod za nekretnine.",
              format: "Iznosi u eurima. IBAN: 22 znaka. Za automobil: marka + model + godište + procijenjena vrijednost. Izvodi: kompletni, bez praznina!",
              commonMistakes: "Izvodi iz računa nisu kompletni (sve stranice potrebne!). Prešućena imovina \u2014 to je prevara! Zaboravljeni računi u inostranstvu. Životno osiguranje nije navedeno.",
              whenToLeaveEmpty: "Ako nemaš imovinu, upiši 0 \u20AC za svaku kategoriju. Nikad ne ostavljaj prazno.",
              example: "Girokonto: DE89 3704 0044... \u2014 850 \u20AC | Sparbuch: 1.200 \u20AC | Kfz: VW Golf 2015, ca. 4.000 \u20AC | Lebensversicherung: keine",
            },
          ],
        },
        {
          field: "Radna sposobnost / zdravlje",
          instruction: "Ljekarski nalaz o radnoj nesposobnosti (za Grundsicherung bei Erwerbsminderung). Rješenje o penziji (za Grundsicherung im Alter). Navesti koliko sati dnevno možeš raditi.",
          cards: [
            {
              whatToWrite: "Da li si radno sposoban/a i koliko sati dnevno. Vrsta zdravstvenog ograničenja. Da li primaš penziju i od kada.",
              whereToFind: "Ljekarski nalaz (ärztliches Attest), rješenje o penziji (Rentenbescheid), nalaz Deutsche Rentenversicherung o erwerbsminderung.",
              format: "Sati: broj dnevno (npr. \u201eunter 3 Stunden\u201c za punu erwerbsminderung). Datum nalaza: DD.MM.GGGG.",
              commonMistakes: "Nedostaje ljekarski nalaz (obavezan za Grundsicherung bei Erwerbsminderung!). Zastarjeli nalaz (ne stariji od 6 mjeseci). Nije navedeno da li je erwerbsminderung trajna ili privremena.",
              whenToLeaveEmpty: "Ako podnosiš zahtjev za Grundsicherung im Alter (penzijski staž), ovo polje se odnosi samo na Rentenbescheid \u2014 ljekarski nalaz nije potreban.",
              example: "Erwerbsminderung: voll, dauerhaft | Ärztliches Attest vom 15.01.2026 | Rentenbescheid seit 01.04.2025 | Arbeitsfähigkeit: unter 3 Stunden/Tag",
            },
          ],
        },
        {
          field: "Posebne potrebe (Mehrbedarf)",
          instruction: "Označiti dodatne potrebe: trudnoća, samohrani roditelj, invaliditet (Merkzeichen G), posebna prehrana. Jednokratne potrebe: oprema za stan, odjeća za trudnice, školski izleti.",
          cards: [
            {
              whatToWrite: "Označiti koje posebne potrebe imaš: Schwangerschaft (trudnoća), Alleinerziehend (samohrani roditelj), Behinderung sa Merkzeichen G, kostenaufwändige Ernährung (posebna prehrana po ljekarskom nalazu). Jednokratne: Erstausstattung Wohnung (oprema za stan), Schwangerschaftsbekleidung, Klassenfahrten.",
              whereToFind: "Trudnoća: Mutterpass. Invaliditet: Schwerbehindertenausweis sa Merkzeichen G. Posebna prehrana: ljekarski nalaz. Školski izleti: potvrda škole.",
              format: "Označiti kvačicom (ankreuzen) na formularu. Za jednokratne potrebe: navesti vrstu i procijenjeni iznos.",
              commonMistakes: "Mehrbedarf nije zatražen iako postoji pravo! Nedostaje dokaz (npr. Mutterpass ili Schwerbehindertenausweis). Jednokratne potrebe zaboravljene \u2014 mogu se tražiti zasebno.",
              whenToLeaveEmpty: "Ako nemaš posebne potrebe, ostavi prazno. Ali provjeri sve opcije \u2014 mnogi ne znaju da imaju pravo na Mehrbedarf!",
              example: "Mehrbedarf: Alleinerziehend \u2713 (1 Kind) | Einmalige Bedarfe: Erstausstattung Wohnung (Umzug aus Heimatland)",
            },
          ],
        },
        {
          field: "Potpis i prilozi",
          instruction: "Potpisati zahtjev (kod Einsatzgemeinschaft: svi punoljetni članovi). Priložiti sve dokaze: ugovor o najmu, izvode, dokaze o primanjima, rješenje o penziji, ljekarske nalaze.",
          cards: [
            {
              whatToWrite: "Datum podnošenja i potpis. Kod zajedničkog domaćinstva: potpisi svih punoljetnih članova. Lista priloga (Anlagen) sa brojem stranica.",
              whereToFind: "Datum: danas. Potpis: lično, rukom. Provjeri da li su SVI prilozi kompletni prije predaje.",
              format: "Datum: DD.MM.GGGG. Potpis: čitko, rukom. Lista priloga: numerisana.",
              commonMistakes: "Zaboravljen potpis (najčešći razlog za odbijanje!). Nedostaje potpis partnera/supružnika. Prilozi nisu kompletni (posebno izvodi iz računa!). Zastarjeli dokumenti.",
              whenToLeaveEmpty: "NIKAD \u2014 potpis i datum su uvijek obavezni. Bez potpisa zahtjev je nevažeći.",
              example: "Datum: 04.03.2026 | Unterschrift: [Marko Hodžić] | Unterschrift Ehegattin: [Ana Hodžić] | Anlagen: Mietvertrag, 3 Mon. Kontoauszüge, Rentenbescheid, Meldebescheinigung",
            },
          ],
        },
      ],
      en: [
        { field: "Personal data", instruction: "Name, date of birth, marital status, nationality, residence status, tax ID, social insurance number." },
        { field: "Household situation", instruction: "All persons in household with relationship and income." },
        { field: "Housing situation", instruction: "Address, type (rent/own), cold rent, utilities, heating. Attach rental contract." },
        { field: "Income", instruction: "All income sources of all household members: pension, maintenance, Kindergeld, housing benefit, sick pay, interest." },
        { field: "Assets", instruction: "Cash, accounts, savings, life insurance, property, car. Protected assets vary by benefit type. Bank statements (3 months)." },
        { field: "Employability / health", instruction: "Medical certificate for disability. Pension notice for old age. State daily work capacity." },
        { field: "Special needs (Mehrbedarf)", instruction: "Mark: pregnancy, single parent, disability (Merkzeichen G), special diet. One-time needs: furniture, maternity clothing, school trips." },
        { field: "Signature and attachments", instruction: "Sign (all adult members). Attach: rental contract, bank statements, income proof, pension notice, medical certificates." },
      ],
    },
    documents: {
      de: ["Personalausweis/Reisepass", "Aufenthaltstitel (bei Nicht-EU)", "Mietvertrag (vollständig)", "Kontoauszüge aller Konten (lückenlos, 3 Monate)", "Einkommensnachweise (Rentenbescheid, Unterhaltsbeschluss etc.)", "Meldebescheinigung", "Ärztliches Attest / Bescheid über Erwerbsminderung (falls zutreffend)", "Schwerbehindertenausweis (falls vorhanden)", "Nachweise über Vermögen (Sparbücher, Versicherungen, Kfz-Brief)"],
      bs: ["Lična karta/pasoš", "Boravišna dozvola (za državljane izvan EU)", "Ugovor o najmu (kompletno)", "Izvodi iz svih računa (kompletni, 3 mjeseca)", "Dokazi o primanjima (rješenje o penziji, alimentacija itd.)", "Potvrda o prijavi prebivališta (Meldebescheinigung)", "Ljekarski nalaz / rješenje o radnoj nesposobnosti (ako je primjenjivo)", "Schwerbehindertenausweis (ako postoji)", "Dokazi o imovini (štedne knjižice, osiguranja, saobraćajna dozvola)"],
      en: ["ID/passport", "Residence permit (non-EU)", "Rental contract (complete)", "Bank statements all accounts (complete, 3 months)", "Income proof (pension notice, maintenance decree etc.)", "Registration certificate", "Medical certificate / disability notice (if applicable)", "Disability ID (if available)", "Asset proof (savings books, insurance, vehicle registration)"],
    },
    processingTime: { de: "2–6 Wochen", bs: "2–6 sedmica", en: "2–6 weeks" },
    commonMistakes: {
      de: ["Kontoauszüge nicht lückenlos (alle Seiten aller Konten!)", "Vermögen verschwiegen oder unterschätzt", "Einkommen des Partners nicht angegeben", "Mehrbedarf nicht beantragt obwohl Anspruch besteht", "Ärztliches Attest fehlt oder ist veraltet", "Verwechslung: Bürgergeld (erwerbsfähig, SGB II) vs. Sozialhilfe (nicht erwerbsfähig, SGB XII)"],
      bs: ["Izvodi iz računa nisu kompletni (sve stranice svih računa!)", "Prešućena ili podcijenjena imovina", "Primanja partnera nisu navedena", "Mehrbedarf nije zatražen iako postoji pravo", "Ljekarski nalaz nedostaje ili je zastario", "Zabuna: Bürgergeld (radno sposobni, SGB II) vs. Sozialhilfe (radno nesposobni, SGB XII)"],
      en: ["Bank statements not complete (all pages of all accounts!)", "Assets concealed or underestimated", "Partner's income not declared", "Mehrbedarf not claimed despite entitlement", "Medical certificate missing or outdated", "Confusion: Bürgergeld (employable, SGB II) vs. Sozialhilfe (non-employable, SGB XII)"],
    },
    officialPdf: "",
    onlineLink: "https://sozialplattform.de/inhalt/sozialhilfe-grundsicherung",
    officialInfoUrl: "https://www.bmas.de/DE/Soziales/Sozialhilfe/sozialhilfe.html",
  },
];

// ===================== ARBEIT – EU Blue Card =====================
guides.push({
  slug: "eu-blue-card",
  category: "arbeit",
  title: {
    de: "EU Blue Card – Aufenthaltserlaubnis",
    bs: "EU Blue Card – Boravišna dozvola",
    en: "EU Blue Card – Residence Permit",
  },
  who: {
    de: "Hochqualifizierte Fachkräfte mit Arbeitsvertrag und anerkanntem Hochschulabschluss.",
    bs: "Visokokvalificirani radnici sa ugovorom o radu i priznatom fakultetskom diplomom.",
    en: "Highly qualified workers with an employment contract and a recognised university degree.",
  },
  authority: {
    de: "Ausländerbehörde",
    bs: "Ured za strance (Ausländerbehörde)",
    en: "Foreigners Authority (Ausländerbehörde)",
  },
  formName: {
    de: "Antrag auf Erteilung / Verlängerung einer Aufenthaltserlaubnis",
    bs: "Zahtjev za izdavanje / produženje boravišne dozvole",
    en: "Application for Issuance / Extension of a Residence Permit",
  },
  steps: {
    de: [],
    en: [],
    bs: [
      // KORAK 1 – Zweck (Svrha zahtjeva)
      {
        field: "Svrha zahtjeva (Zweck)",
        instruction: "Na vrhu formulara označavaš zašto podnosiš zahtjev. Za Blue Card odaberi 'Erteilung' (izdavanje) ako tražiš prvi put, ili 'Verlängerung' (produženje) ako već imaš Blue Card. Zatim označiš 'Aufenthaltserlaubnis'.",
        cards: [
          {
            whatToWrite: "Označi 'Erteilung' ako tražiš Blue Card prvi put. Označi 'Verlängerung' ako produžavaš. U odjelu ispod označi 'Aufenthaltserlaubnis'.",
            whereToFind: "Pogledaj da li ti je ovo prvi zahtjev ili produženje postojeće dozvole.",
            format: "Kvačica (☑) na odgovarajućem polju",
            commonMistakes: "Označavanje pogrešnog polja (npr. Niederlassungserlaubnis umjesto Aufenthaltserlaubnis). Blue Card spada pod Aufenthaltserlaubnis!",
            whenToLeaveEmpty: "Nikada – ovo polje je obavezno.",
            example: "☑ Erteilung + ☑ Aufenthaltserlaubnis",
          },
        ],
      },
      // KORAK 2 – Zweck des Aufenthalts
      {
        field: "Svrha boravka (Zweck des Aufenthalts)",
        instruction: "Polje 1 formulara. Ovdje upisuješ razlog boravka. Za Blue Card upiši 'Blaue Karte EU – Beschäftigung' ili 'Erwerbstätigkeit (Blaue Karte EU)'.",
        cards: [
          {
            whatToWrite: "Upiši tačan razlog: 'Blaue Karte EU' ili 'Beschäftigung als Fachkraft (Blaue Karte EU §18g AufenthG)'.",
            whereToFind: "Ovo je tvoja namjera – piši na osnovu ugovora o radu.",
            format: "Slobodan tekst, poželjno na njemačkom",
            commonMistakes: "Pisanje samo 'Arbeit' ili 'Beschäftigung' bez pominjanja Blue Card. Ured može obraditi kao običnu radnu dozvolu!",
            whenToLeaveEmpty: "Nikada – obavezno polje.",
            example: "Blaue Karte EU – Beschäftigung als Softwareentwickler",
          },
        ],
      },
      // KORAK 3 – Lični podaci
      {
        field: "Lični podaci (Persönliche Angaben)",
        instruction: "Polja 2–6: Prezime, djevojačko prezime, ime, datum rođenja, mjesto rođenja i državljanstvo. Upiši tačno kako piše u pasošu – svako odstupanje može izazvati probleme.",
        cards: [
          {
            whatToWrite: "Prezime (Familienname): kako piše u pasošu. Djevojačko prezime (Geburtsname): samo ako se razlikuje. Ime (Vorname): sva imena iz pasoša. Datum rođenja: dan.mjesec.godina. Mjesto rođenja: grad i država. Državljanstvo: tvoje trenutno.",
            whereToFind: "Sve podatke nađeš u svom pasošu na stranici sa fotografijom.",
            format: "Prezime: tekst. Datum: DD.MM.GGGG. Državljanstvo: puni naziv države.",
            commonMistakes: "Pogrešan format datuma (američki MM/DD umjesto DD.MM.GGGG). Pisanje samo jednog imena ako ih imaš više u pasošu. Skraćivanje imena.",
            whenToLeaveEmpty: "Djevojačko prezime ostavi prazno ako se nikada nisi prezivao/la drugačije.",
            example: "Familienname: Hadžić\nGeburtsname: (prazno)\nVorname: Amir\nGeburtsdatum: 12.05.1990\nGeburtsort: Sarajevo, Bosnien und Herzegowina\nStaatsangehörigkeit: bosnisch-herzegowinisch",
          },
        ],
      },
      // KORAK 4 – Adresa i bračni status
      {
        field: "Adresa i bračni status (Anschrift & Familienstand)",
        instruction: "Polja 7–9: Trenutna adresa u Njemačkoj, bračni status i spol. Adresa mora odgovarati tvojoj Anmeldung prijavi!",
        cards: [
          {
            whatToWrite: "Adresa: ulica, kućni broj, poštanski broj, grad. Bračni status: označi odgovarajuće polje. Spol: männlich ili weiblich.",
            whereToFind: "Adresa: pogledaj svoju Meldebescheinigung (potvrda o prijavi prebivališta). Bračni status: vjenčani list.",
            format: "Adresa: ulica + br., PLZ + grad. Status: kvačica.",
            commonMistakes: "Adresa ne odgovara prijavi prebivališta. Ovo je čest razlog za odbijanje! Ne označiti bračni status.",
            whenToLeaveEmpty: "Nikada – sva polja su obavezna.",
            example: "Musterstraße 15, 10115 Berlin\n☑ ledig (samac)\n☑ männlich",
          },
        ],
      },
      // KORAK 5 – Supružnik/Partner
      {
        field: "Podaci o supružniku (Ehegatte)",
        instruction: "Polje 10: Ako si u braku, upiši podatke o supružniku – ime, prezime, datum i mjesto rođenja, adresu i državljanstvo.",
        cards: [
          {
            whatToWrite: "Ime i prezime supružnika, datum i mjesto rođenja, trenutna adresa, državljanstvo.",
            whereToFind: "Pasoš supružnika i vjenčani list.",
            format: "Tekst polja. Datum: DD.MM.GGGG.",
            commonMistakes: "Zaboraviti upisati supružnika ako si u braku. Neodgovarajući podaci u odnosu na vjenčani list.",
            whenToLeaveEmpty: "Ako nisi u braku / registrovanom partnerstvu, ostavi prazno.",
            example: "Name: Hadžić\nVorname: Amina\nGeburtsdatum und Geburtsort: 23.08.1992, Tuzla\nAnschrift: Musterstraße 15, 10115 Berlin\nStaatsangehörigkeit: bosnisch-herzegowinisch",
          },
        ],
      },
      // KORAK 6 – Djeca
      {
        field: "Podaci o djeci (Kinder)",
        instruction: "Polje 11: Upiši podatke o djeci – ime, prezime, datum i mjesto rođenja. Formular ima prostor za troje djece.",
        cards: [
          {
            whatToWrite: "Za svako dijete: prezime, ime, datum i mjesto rođenja.",
            whereToFind: "Rodni listovi djece i njihovi pasoši.",
            format: "Tekst. Datum: DD.MM.GGGG.",
            commonMistakes: "Ne upisati svu djecu. Pogrešan datum rođenja djeteta.",
            whenToLeaveEmpty: "Ako nemaš djece, ostavi prazno.",
            example: "1.: Name: Hadžić, Vorname: Kenan\nGeburtsdatum und Ort: 15.03.2018, Berlin",
          },
        ],
      },
      // KORAK 7 – Porodica koja dolazi
      {
        field: "Dolazak porodice (Familienangehörige mit einreisen)",
        instruction: "Polje 12: Da li članovi porodice dolaze s tobom ili naknadno? Ako da, navedi ko.",
        cards: [
          {
            whatToWrite: "Označi 'ja' ili 'nein'. Ako da – navedi imena i odnos (supružnik, dijete).",
            whereToFind: "Tvoja porodična situacija i planovi.",
            format: "Kvačica + slobodan tekst.",
            commonMistakes: "Označiti 'nein' a zatim naknadno tražiti spajanje porodice – bolje odmah navesti plan.",
            whenToLeaveEmpty: "Ako niko ne dolazi, označi 'nein'.",
            example: "☑ ja – Ehefrau Amina Hadžić, Kind Kenan Hadžić",
          },
        ],
      },
      // KORAK 8 – Roditelji
      {
        field: "Podaci o roditeljima (Vater / Mutter)",
        instruction: "Polja 13–14: Ime i prezime oca i majke. Ovo je standardno polje za identifikaciju.",
        cards: [
          {
            whatToWrite: "Puno ime i prezime oca i majke.",
            whereToFind: "Rodni list ili pasoš.",
            format: "Tekst: Prezime, Ime.",
            commonMistakes: "Pisanje nadimaka umjesto punih imena. Izostavljanje djevojačkog prezimena majke.",
            whenToLeaveEmpty: "Nikada – obavezno polje.",
            example: "Vater: Hadžić, Mujo\nMutter: Hadžić geb. Begović, Fatima",
          },
        ],
      },
      // KORAK 9 – Pasoš
      {
        field: "Putna isprava (Reiseausweis / Pass)",
        instruction: "Polje 15: Podaci o tvom pasošu – broj, datum izdavanja, ko ga je izdao i do kad važi.",
        cards: [
          {
            whatToWrite: "Vrsta dokumenta, broj pasoša, datum izdavanja, mjesto izdavanja, datum isteka.",
            whereToFind: "Tvoj pasoš – stranica sa fotografijom.",
            format: "Broj: alfanumerički. Datumi: DD.MM.GGGG.",
            commonMistakes: "Pasoš ističe za manje od 6 mjeseci – mora biti važeći tokom cijelog boravka! Pogrešno prepisivanje broja pasoša.",
            whenToLeaveEmpty: "Nikada – obavezno.",
            example: "Reisepass\nNr.: B1234567\nausgestellt am: 01.03.2022\nausgestellt von: MUP BiH, Sarajevo\ngültig bis: 01.03.2032",
          },
        ],
      },
      // KORAK 10 – Prethodni boravak
      {
        field: "Prethodni boravak u Njemačkoj/EU (Frühere Aufenthalte)",
        instruction: "Polja 18–20: Kada si ušao/la u Njemačku, da li si ranije boravio/la u Njemačkoj ili EU, i podaci o trenutnoj boravišnoj dozvoli (ako imaš).",
        cards: [
          {
            whatToWrite: "Datum ulaska u Njemačku. Da li si ranije boravio/la – ako da, navedi periode i mjesta. Podaci o trenutnoj boravišnoj dozvoli.",
            whereToFind: "Pečati u pasošu, prethodne boravišne dozvole, eAT kartica.",
            format: "Datumi: DD.MM.GGGG. Slobodan tekst za periode.",
            commonMistakes: "Zaboraviti navesti prethodne boravke – ured ima pristup podacima i lako provjeri! Pogrešan datum ulaska.",
            whenToLeaveEmpty: "Ako nikada nisi bio/la u Njemačkoj/EU ranije, označi 'nein'.",
            example: "Eingereist am: 15.01.2024\nFrühere Aufenthalte: ☑ ja\nvom 01.09.2019 bis 30.06.2023 in München (Studium)",
          },
        ],
      },
      // KORAK 11 – Trajanje boravka
      {
        field: "Planirano trajanje boravka (Dauer des Aufenthalts)",
        instruction: "Polje 21: Koliko dugo planiraš ostati. Za Blue Card, upiši trajanje ugovora o radu ili 'unbefristet' ako je ugovor na neodređeno.",
        cards: [
          {
            whatToWrite: "Planirano trajanje boravka u godinama ili 'unbefristet'.",
            whereToFind: "Tvoj ugovor o radu – pogledaj trajanje.",
            format: "Slobodan tekst ili broj godina/mjeseci.",
            commonMistakes: "Pisanje prekratkog perioda može dovesti do kraće dozvole. Blue Card se obično daje na 4 godine ili trajanje ugovora + 3 mjeseca.",
            whenToLeaveEmpty: "Nikada – obavezno.",
            example: "Unbefristet (neograničeno) ili 3 Jahre",
          },
        ],
      },
      // KORAK 12 – Zaposlenje (KLJUČNO!)
      {
        field: "Zaposlenje – Poslodavac i plata (Arbeitgeber)",
        instruction: "Polje 22: OVO JE NAJVAŽNIJI DIO ZA BLUE CARD! Upiši naziv firme, adresu, i tvoju poziciju. Bruto godišnja plata MORA biti iznad minimuma (43.800€ za deficitarna zanimanja, 45.300€ za ostala).",
        cards: [
          {
            whatToWrite: "Naziv firme, adresa firme (ulica, grad), tvoja pozicija / radno mjesto.",
            whereToFind: "Ugovor o radu – prva stranica. Ako nemaš adresu napamet, pogledaj ugovor ili web stranicu firme.",
            format: "Tekst: Naziv firme, puna adresa.",
            commonMistakes: "Ne navesti punu adresu firme. Pisanje skraćenog naziva firme. Plata u ugovoru ispod minimalnog praga – ured će ODBITI zahtjev!",
            whenToLeaveEmpty: "Nikada – bez ovog polja nema Blue Card.",
            example: "Arbeitgeber: Siemens AG\nin: Werner-von-Siemens-Straße 1, 80333 München\nPosition: Softwareentwickler",
          },
          {
            whatToWrite: "PROVJERI PLATU: Bruto godišnja plata mora biti min. 43.800€ (IT, inženjeri, ljekari – deficitarna zanimanja) ili 45.300€ (ostala zanimanja). Ovo je za 2024. – iznosi se ažuriraju godišnje!",
            whereToFind: "Ugovor o radu – sekcija o plati (Vergütung / Gehalt). Pogledaj bruto (Brutto), ne neto!",
            format: "Broj u EUR, godišnji bruto iznos.",
            commonMistakes: "Navesti neto umjesto bruto plate. Plata ispod praga. Ako radiš nepuno radno vrijeme, plata se računa za puno – ali ugovor mora biti puno radno vrijeme!",
            whenToLeaveEmpty: "Nikada.",
            example: "Bruttojahresgehalt: 55.000 € (bruto godišnja plata)",
          },
        ],
      },
      // KORAK 13 – Izvor prihoda
      {
        field: "Izvor prihoda (Einkünfte / Lebensunterhalt)",
        instruction: "Polje 23: Iz kojih izvora pokrivati troškove života. Za Blue Card, tvoja plata je glavni izvor.",
        cards: [
          {
            whatToWrite: "Navedi izvor prihoda: plata iz zaposlenja.",
            whereToFind: "Ugovor o radu.",
            format: "Slobodan tekst.",
            commonMistakes: "Pisanje 'od roditelja' ili 'ušteđevina' kao primarni izvor – za Blue Card mora biti plata!",
            whenToLeaveEmpty: "Nikada.",
            example: "Erwerbstätigkeit (zaposlenje) – Gehalt lt. Arbeitsvertrag",
          },
        ],
      },
      // KORAK 14 – Socijalna davanja
      {
        field: "Socijalna davanja (Sozialleistungen)",
        instruction: "Polje 24: Da li primaš ili je neko u tvojoj porodici primao socijalna davanja (ALG II, Sozialhilfe, Wohngeld).",
        cards: [
          {
            whatToWrite: "Označi 'nein' ako ne primaš nikakva socijalna davanja.",
            whereToFind: "Tvoja lična situacija.",
            format: "Kvačica: ja/nein.",
            commonMistakes: "Označiti 'ja' ako primaš Kindergeld – Kindergeld NIJE socijalna pomoć i ne utiče na Blue Card!",
            whenToLeaveEmpty: "Nikada – označi jedno od dva.",
            example: "☑ nein",
          },
        ],
      },
      // KORAK 15 – Zdravstveno osiguranje
      {
        field: "Zdravstveno osiguranje (Krankenversicherung)",
        instruction: "Polje 25: Da li imaš zdravstveno osiguranje u Njemačkoj. Za Blue Card – OBAVEZNO.",
        cards: [
          {
            whatToWrite: "Označi 'ja' i upiši naziv osiguravajućeg društva.",
            whereToFind: "Kartica zdravstvenog osiguranja ili potvrda od osiguravajućeg društva.",
            format: "Kvačica + naziv firme.",
            commonMistakes: "Putno osiguranje NIJE dovoljno – mora biti njemačko zdravstveno osiguranje (gesetzlich ili privat). Nemati osiguranje prilikom podnošenja zahtjeva.",
            whenToLeaveEmpty: "Nikada.",
            example: "☑ ja\nVersicherung: Techniker Krankenkasse (TK)",
          },
        ],
      },
      // KORAK 16 – Kaznena evidencija
      {
        field: "Kaznena evidencija (Vorbestraft?)",
        instruction: "Polje 26: Da li si ikada bio/la kažnjavan/a. Budi iskren/a – lažna izjava je krivično djelo!",
        cards: [
          {
            whatToWrite: "Označi 'nein' ako nemaš kaznenu evidenciju. Ako imaš – navedi sud, razlog i kaznu.",
            whereToFind: "Tvoja lična situacija. Ako nisi siguran/na, traži uvjerenje o nekažnjavanju iz zemlje porijekla.",
            format: "Kvačica + tekst ako 'ja'.",
            commonMistakes: "Laganje! Ured provjerava evidenciju. Lažna izjava može dovesti do trajnog odbijanja i zabrane ulaska.",
            whenToLeaveEmpty: "Nikada – obavezno odgovoriti.",
            example: "☑ nein",
          },
        ],
      },
      // KORAK 17 – Prethodno odbijanje/deportacija
      {
        field: "Prethodno odbijanje ili deportacija (Ausweisung / Abschiebung)",
        instruction: "Polje 27: Da li ti je ikada odbijen zahtjev za boravak ili si bio/la deportovan/a iz Njemačke.",
        cards: [
          {
            whatToWrite: "Označi 'nein' ako nikada nisi bio/la deportovan/a ili odbijen/a. Ako jesi – navedi razlog.",
            whereToFind: "Tvoja lična istorija. Provjeri stare odluke ureda za strance.",
            format: "Kvačica + tekst.",
            commonMistakes: "Sakriti prethodno odbijanje – ured ima pristup centralnoj bazi podataka (AZR) i UVIJEK provjeri!",
            whenToLeaveEmpty: "Nikada.",
            example: "☑ nein",
          },
        ],
      },
      // KORAK 18 – Potpis i predaja
      {
        field: "Potpis i predaja zahtjeva (Unterschrift)",
        instruction: "Posljednji dio: Potpiši formular i predaj ga lično kod Ausländerbehörde. Potpis mora biti istovjetan potpisu u pasošu.",
        cards: [
          {
            whatToWrite: "Mjesto, datum i tvoj potpis (prezime, ime).",
            whereToFind: "Ne treba nikakav dokument – potpiši se!",
            format: "Mjesto + datum + potpis rukom.",
            commonMistakes: "Zaboraviti se potpisati. Potpis ne odgovara pasošu. Slanje formulara poštom umjesto lične predaje (većina ureda zahtijeva lični dolazak!).",
            whenToLeaveEmpty: "Nikada – nepotpisan formular je nevažeći!",
            example: "Berlin, den 15.03.2024\n(potpis) Hadžić, Amir\n\n💡 Savjeti za predaju:\n• Zakaži termin online (termin.berlin.de ili slično za tvoj grad)\n• Donesi SVE originale + kopije\n• Dođi 15 min ranije\n• Blue Card se obično izdaje za 4 godine ili trajanje ugovora + 3 mjeseca",
          },
        ],
      },
    ],
  },
  documents: {
    de: [
      "Gültiger Reisepass",
      "Biometrisches Passfoto",
      "Anerkannter Hochschulabschluss",
      "Arbeitsvertrag mit Gehaltsangabe",
      "Krankenversicherungsnachweis",
      "Meldebescheinigung",
      "Lebenslauf",
    ],
    bs: [
      "Važeći pasoš (min. 6 mjeseci)",
      "Biometrijska fotografija (35x45mm)",
      "Priznata visokoškolska diploma (provjeri na anabin.kmk.org)",
      "Ugovor o radu sa navedenom bruto platom",
      "Potvrda zdravstvenog osiguranja",
      "Potvrda o prijavi prebivališta (Meldebescheinigung)",
      "CV / životopis",
    ],
    en: [
      "Valid passport (min. 6 months)",
      "Biometric photo (35x45mm)",
      "Recognised university degree",
      "Employment contract with salary",
      "Health insurance certificate",
      "Registration certificate (Meldebescheinigung)",
      "CV / résumé",
    ],
  },
  processingTime: {
    de: "2–8 Wochen (je nach Ausländerbehörde)",
    bs: "2–8 sedmica (zavisi od ureda za strance)",
    en: "2–8 weeks (varies by foreigners authority)",
  },
  commonMistakes: {
    de: [
      "Gehalt unter der Mindestgrenze",
      "Hochschulabschluss nicht anerkannt",
      "Keine Krankenversicherung",
    ],
    bs: [
      "Plata ispod minimalnog praga (43.800€ / 45.300€ bruto godišnje)",
      "Diploma nije priznata – obavezno provjeri na anabin.kmk.org PRIJE predaje zahtjeva",
      "Označavanje pogrešne vrste dozvole na formularu (mora biti Aufenthaltserlaubnis, ne Niederlassungserlaubnis)",
      "Ugovor o radu ne navodi jasno bruto platu",
      "Zdravstveno osiguranje nije njemačko (putno osiguranje NE važi)",
      "Kasno zakazivanje termina – čekanje može biti 4–8 sedmica",
    ],
    en: [
      "Salary below minimum threshold",
      "University degree not recognised",
      "No German health insurance",
    ],
  },
  officialPdf: "",
  onlineLink: "",
  officialInfoUrl: "https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwsendererErsteSchritte/Aufenthaltstitel/aufenthaltstitel-node.html",
});

// ===================== ARBEIT – Radna viza =====================
guides.push({
  slug: "radna-viza",
  category: "arbeit",
  title: {
    de: "Arbeitsvisum – Aufenthaltserlaubnis zur Beschäftigung",
    bs: "Radna viza – Dozvola boravka radi zaposlenja",
    en: "Work Visa – Residence Permit for Employment",
  },
  who: {
    de: "Drittstaatsangehörige mit Arbeitsvertrag und anerkannter Qualifikation.",
    bs: "Državljani izvan EU sa ugovorom o radu i priznatom kvalifikacijom.",
    en: "Non-EU nationals with an employment contract and recognised qualification.",
  },
  authority: {
    de: "Ausländerbehörde",
    bs: "Ured za strance (Ausländerbehörde)",
    en: "Foreigners Authority (Ausländerbehörde)",
  },
  formName: {
    de: "Antrag auf Erteilung / Verlängerung einer Aufenthaltserlaubnis",
    bs: "Zahtjev za izdavanje / produženje boravišne dozvole",
    en: "Application for Issuance / Extension of a Residence Permit",
  },
  steps: {
    de: [], en: [],
    bs: [
      {
        field: "Svrha zahtjeva (Zweck)",
        instruction: "Na vrhu formulara označi 'Erteilung' (izdavanje) za prvu radnu vizu ili 'Verlängerung' (produženje). Označi 'Aufenthaltserlaubnis'.",
        cards: [{
          whatToWrite: "Označi 'Erteilung' + 'Aufenthaltserlaubnis'.",
          whereToFind: "Zavisi od toga da li tražiš prvi put ili produžavaš.",
          format: "Kvačica (☑)",
          commonMistakes: "Označavanje 'Niederlassungserlaubnis' umjesto 'Aufenthaltserlaubnis'. Radna viza je uvijek Aufenthaltserlaubnis!",
          whenToLeaveEmpty: "Nikada.",
          example: "☑ Erteilung + ☑ Aufenthaltserlaubnis",
        }],
      },
      {
        field: "Svrha boravka (Zweck des Aufenthalts)",
        instruction: "Polje 1: Upiši razlog boravka. Za radnu vizu piši 'Beschäftigung als Fachkraft' i navedi poziciju.",
        cards: [{
          whatToWrite: "Beschäftigung als Fachkraft (§18a ili §18b AufenthG) + tvoja pozicija.",
          whereToFind: "Ugovor o radu – naziv pozicije.",
          format: "Slobodan tekst na njemačkom.",
          commonMistakes: "Pisanje samo 'Arbeit' bez specifikacije. Navedi tačan paragraf ako znaš (§18a za stručnu kvalifikaciju, §18b za akademsku).",
          whenToLeaveEmpty: "Nikada.",
          example: "Beschäftigung als Fachkraft – Elektriker (§18a AufenthG)",
        }],
      },
      {
        field: "Lični podaci (Persönliche Angaben)",
        instruction: "Polja 2–6: Prezime, ime, datum rođenja, mjesto rođenja, državljanstvo. Sve tačno kako piše u pasošu!",
        cards: [{
          whatToWrite: "Prezime, djevojačko prezime (ako se razlikuje), sva imena iz pasoša, datum rođenja, mjesto rođenja + država, državljanstvo.",
          whereToFind: "Pasoš – stranica sa fotografijom.",
          format: "Tekst. Datum: DD.MM.GGGG.",
          commonMistakes: "Pogrešan format datuma. Izostavljanje drugog imena koje stoji u pasošu.",
          whenToLeaveEmpty: "Djevojačko prezime – samo ako se razlikuje od trenutnog.",
          example: "Familienname: Mujanović\nVorname: Edin\nGeburtsdatum: 22.09.1988\nGeburtsort: Zenica, Bosnien und Herzegowina\nStaatsangehörigkeit: bosnisch-herzegowinisch",
        }],
      },
      {
        field: "Adresa i bračni status (Anschrift & Familienstand)",
        instruction: "Polja 7–9: Trenutna adresa u Njemačkoj (mora odgovarati Anmeldung prijavi!), bračni status, spol.",
        cards: [{
          whatToWrite: "Ulica + kućni broj, PLZ + grad. Označi bračni status i spol.",
          whereToFind: "Meldebescheinigung (potvrda o prijavi prebivališta).",
          format: "Adresa: tekst. Status: kvačica.",
          commonMistakes: "Adresa ne odgovara Anmeldung prijavi – čest razlog za probleme!",
          whenToLeaveEmpty: "Nikada.",
          example: "Hauptstraße 42, 70173 Stuttgart\n☑ ledig\n☑ männlich",
        }],
      },
      {
        field: "Porodični podaci (Ehegatte / Kinder)",
        instruction: "Polja 10–12: Podaci o supružniku i djeci. Ako si samac bez djece, ostavi prazno.",
        cards: [{
          whatToWrite: "Supružnik: ime, prezime, datum i mjesto rođenja, adresa, državljanstvo. Djeca: ime, datum i mjesto rođenja.",
          whereToFind: "Pasoš supružnika, vjenčani list, rodni listovi djece.",
          format: "Tekst + datumi DD.MM.GGGG.",
          commonMistakes: "Zaboraviti upisati djecu. Ne navesti da porodica planira doći (polje 12).",
          whenToLeaveEmpty: "Ako nisi u braku i nemaš djece.",
          example: "Ehegatte: Mujanović, Lejla, geb. 15.04.1990, Zenica\nKinder: (prazno)",
        }],
      },
      {
        field: "Roditelji (Vater / Mutter)",
        instruction: "Polja 13–14: Puno ime oca i majke.",
        cards: [{
          whatToWrite: "Prezime i ime oca. Prezime (uključujući djevojačko) i ime majke.",
          whereToFind: "Rodni list.",
          format: "Tekst: Prezime, Ime.",
          commonMistakes: "Izostavljanje djevojačkog prezimena majke.",
          whenToLeaveEmpty: "Nikada.",
          example: "Vater: Mujanović, Halid\nMutter: Mujanović geb. Karić, Senada",
        }],
      },
      {
        field: "Putna isprava (Pass / Reiseausweis)",
        instruction: "Polje 15: Broj pasoša, datum izdavanja, ko ga je izdao, datum isteka.",
        cards: [{
          whatToWrite: "Vrsta dokumenta, broj, datum izdavanja, izdavalac, datum isteka.",
          whereToFind: "Pasoš – stranica sa fotografijom.",
          format: "Alfanumerički broj. Datumi: DD.MM.GGGG.",
          commonMistakes: "Pasoš ističe za manje od 6 mjeseci! Pogrešno prepisivanje broja.",
          whenToLeaveEmpty: "Nikada.",
          example: "Reisepass Nr.: B9876543\nausgestellt am: 10.06.2021\nausgestellt von: MUP BiH\ngültig bis: 10.06.2031",
        }],
      },
      {
        field: "Prethodni boravak u Njemačkoj/EU",
        instruction: "Polja 18–20: Datum ulaska, prethodni boravci, trenutna dozvola (ako imaš).",
        cards: [{
          whatToWrite: "Datum ulaska. Prethodni boravci: da/ne + periodi. Trenutna dozvola: vrsta i važnost.",
          whereToFind: "Pečati u pasošu, prethodne eAT kartice.",
          format: "Datumi DD.MM.GGGG.",
          commonMistakes: "Zaboraviti navesti prethodne boravke – ured provjerava u bazi podataka!",
          whenToLeaveEmpty: "Ako nikada nisi bio/la u Njemačkoj, označi 'nein'.",
          example: "Eingereist am: 01.03.2024\nFrühere Aufenthalte: ☑ nein",
        }],
      },
      {
        field: "Zaposlenje – Poslodavac (Arbeitgeber)",
        instruction: "Polje 22: NAJVAŽNIJI DIO! Naziv firme, adresa, tvoja pozicija. Mora odgovarati ugovoru o radu.",
        cards: [{
          whatToWrite: "Puni naziv firme, adresa (ulica, PLZ, grad), tvoja pozicija.",
          whereToFind: "Ugovor o radu – prva stranica.",
          format: "Tekst.",
          commonMistakes: "Nepotpuna adresa firme. Pozicija ne odgovara priznatoj kvalifikaciji – ovo je ključno za radnu vizu!",
          whenToLeaveEmpty: "Nikada – bez ovoga nema radne vize.",
          example: "Arbeitgeber: Bosch GmbH\nin: Robert-Bosch-Straße 1, 70469 Stuttgart\nPosition: Industrieelektriker",
        }, {
          whatToWrite: "VAŽNO: Kvalifikacija mora biti PRIZNATA u Njemačkoj (Anerkennung). Bez priznate diplome ili stručne kvalifikacije, radna viza neće biti odobrena!",
          whereToFind: "Rješenje o priznavanju (Anerkennungsbescheid) od nadležne komore.",
          format: "Priloži kopiju rješenja o priznavanju.",
          commonMistakes: "Podnijeti zahtjev bez završenog postupka priznavanja. Čekanje može trajati 3–6 mjeseci – pokreni na vrijeme!",
          whenToLeaveEmpty: "Nikada.",
          example: "Anerkennung: Handwerkskammer Stuttgart, Bescheid vom 15.01.2024",
        }],
      },
      {
        field: "Izvor prihoda i socijalna davanja",
        instruction: "Polja 23–24: Odakle pokrivate troškove života. Za radnu vizu – plata iz zaposlenja.",
        cards: [{
          whatToWrite: "Izvor: Erwerbstätigkeit (zaposlenje). Socijalna davanja: 'nein'.",
          whereToFind: "Ugovor o radu.",
          format: "Tekst + kvačica.",
          commonMistakes: "Primanje socijalne pomoći može ugroziti produženje radne vize!",
          whenToLeaveEmpty: "Nikada.",
          example: "Einkünfte: Erwerbstätigkeit\nSozialleistungen: ☑ nein",
        }],
      },
      {
        field: "Zdravstveno osiguranje (Krankenversicherung)",
        instruction: "Polje 25: Obavezno njemačko zdravstveno osiguranje.",
        cards: [{
          whatToWrite: "Označi 'ja' + naziv osiguravajućeg društva.",
          whereToFind: "Kartica zdravstvenog osiguranja.",
          format: "Kvačica + tekst.",
          commonMistakes: "Putno osiguranje NIJE dovoljno!",
          whenToLeaveEmpty: "Nikada.",
          example: "☑ ja, Versicherung: AOK Baden-Württemberg",
        }],
      },
      {
        field: "Kaznena evidencija i prethodni odbijci",
        instruction: "Polja 26–27: Da li si kažnjavan/a, da li ti je ranije odbijen boravak ili si deportovan/a.",
        cards: [{
          whatToWrite: "Označi 'nein' za oba ako nemaš evidenciju. BUDI ISKREN – laganje je krivično djelo!",
          whereToFind: "Lična situacija. Uvjerenje o nekažnjavanju iz zemlje porijekla.",
          format: "Kvačica.",
          commonMistakes: "Laganje! Ured ima pristup centralnoj bazi podataka i UVIJEK provjeri.",
          whenToLeaveEmpty: "Nikada – obavezno odgovoriti.",
          example: "Vorbestraft: ☑ nein\nAusweisung/Abschiebung: ☑ nein",
        }],
      },
      {
        field: "Potpis i predaja zahtjeva",
        instruction: "Potpiši formular i predaj lično na Ausländerbehörde. Donesi SVE originale + kopije!",
        cards: [{
          whatToWrite: "Mjesto, datum, potpis (prezime, ime).",
          whereToFind: "—",
          format: "Rukom: mjesto + datum + potpis.",
          commonMistakes: "Nepotpisan formular je nevažeći! Slanje poštom umjesto lične predaje.",
          whenToLeaveEmpty: "Nikada.",
          example: "Stuttgart, den 20.03.2024\n(potpis) Mujanović, Edin\n\n💡 Savjeti:\n• Zakazi termin online\n• Donesi originale + kopije svih dokumenata\n• Rješenje o priznavanju kvalifikacije je OBAVEZNO",
        }],
      },
    ],
  },
  documents: {
    de: ["Reisepass", "Biometrisches Foto", "Arbeitsvertrag", "Anerkennungsbescheid", "Krankenversicherung", "Meldebescheinigung"],
    bs: [
      "Važeći pasoš (min. 6 mjeseci)",
      "Biometrijska fotografija (35x45mm)",
      "Ugovor o radu",
      "Rješenje o priznavanju kvalifikacije (Anerkennungsbescheid)",
      "Potvrda zdravstvenog osiguranja",
      "Potvrda o prijavi prebivališta (Meldebescheinigung)",
      "CV / životopis",
    ],
    en: ["Valid passport", "Biometric photo", "Employment contract", "Qualification recognition", "Health insurance", "Registration certificate"],
  },
  processingTime: { de: "4–12 Wochen", bs: "4–12 sedmica", en: "4–12 weeks" },
  commonMistakes: {
    de: ["Qualifikation nicht anerkannt", "Kein Arbeitsvertrag"],
    bs: [
      "Kvalifikacija nije priznata – postupak priznavanja traje 3–6 mjeseci!",
      "Podnošenje zahtjeva bez ugovora o radu",
      "Pogrešan tip vize (turistička NE dozvoljava rad!)",
      "Kasno zakazivanje termina na ambasadi/Ausländerbehörde",
    ],
    en: ["Qualification not recognised", "No employment contract"],
  },
  officialPdf: "",
  onlineLink: "",
  officialInfoUrl: "https://www.auswaertiges-amt.de/de/service/visa-und-aufenthalt",
});

// ===================== FAMILIE – Spajanje porodice =====================
guides.push({
  slug: "spajanje-porodice",
  category: "familie",
  title: {
    de: "Familiennachzug – Aufenthaltserlaubnis",
    bs: "Spajanje porodice – Boravišna dozvola",
    en: "Family Reunification – Residence Permit",
  },
  who: {
    de: "Ehepartner und minderjährige Kinder von in Deutschland lebenden Personen.",
    bs: "Supružnici i maloljetna djeca osoba koje žive u Njemačkoj sa boravišnom dozvolom.",
    en: "Spouses and minor children of persons living in Germany with a residence permit.",
  },
  authority: {
    de: "Ausländerbehörde / Deutsche Botschaft",
    bs: "Ured za strance (Ausländerbehörde) / Njemačka ambasada",
    en: "Foreigners Authority / German Embassy",
  },
  formName: {
    de: "Antrag auf Erteilung / Verlängerung einer Aufenthaltserlaubnis",
    bs: "Zahtjev za izdavanje / produženje boravišne dozvole",
    en: "Application for Issuance / Extension of a Residence Permit",
  },
  steps: {
    de: [], en: [],
    bs: [
      {
        field: "Svrha zahtjeva (Zweck)",
        instruction: "Označi 'Erteilung' + 'Aufenthaltserlaubnis'. Za spajanje porodice tražiš NOVU dozvolu.",
        cards: [{
          whatToWrite: "☑ Erteilung + ☑ Aufenthaltserlaubnis.",
          whereToFind: "—",
          format: "Kvačica.",
          commonMistakes: "Označavanje 'Verlängerung' ako je ovo tvoj prvi zahtjev.",
          whenToLeaveEmpty: "Nikada.",
          example: "☑ Erteilung + ☑ Aufenthaltserlaubnis",
        }],
      },
      {
        field: "Svrha boravka (Zweck des Aufenthalts)",
        instruction: "Polje 1: Navedi razlog – spajanje porodice. Navedi ko je referentna osoba (supružnik/roditelj u Njemačkoj).",
        cards: [{
          whatToWrite: "'Familiennachzug zum Ehepartner' (za supružnika) ili 'Kindernachzug' (za dijete).",
          whereToFind: "Tvoja porodična situacija i dokumenti.",
          format: "Slobodan tekst na njemačkom.",
          commonMistakes: "Ne navesti tačno ko je referentna osoba u Njemačkoj. Ne specificirati vrstu spajanja (supružnik vs. dijete).",
          whenToLeaveEmpty: "Nikada.",
          example: "Familiennachzug zum Ehemann – Amir Hadžić, wohnhaft in Berlin",
        }],
      },
      {
        field: "Lični podaci (Persönliche Angaben)",
        instruction: "Polja 2–6: TVOJI podaci (osoba koja dolazi u Njemačku). Sve tačno kao u pasošu!",
        cards: [{
          whatToWrite: "Prezime, ime, datum rođenja, mjesto rođenja, državljanstvo – sve iz tvog pasoša.",
          whereToFind: "Tvoj pasoš.",
          format: "Tekst. Datum: DD.MM.GGGG.",
          commonMistakes: "Pisanje podataka partnera umjesto svojih. Pogrešan format datuma.",
          whenToLeaveEmpty: "Djevojačko prezime – ako se ne razlikuje.",
          example: "Familienname: Hadžić geb. Begović\nVorname: Amina\nGeburtsdatum: 23.08.1992\nGeburtsort: Tuzla, Bosnien und Herzegowina\nStaatsangehörigkeit: bosnisch-herzegowinisch",
        }],
      },
      {
        field: "Adresa u Njemačkoj",
        instruction: "Polje 7: Adresa na kojoj ćeš živjeti u Njemačkoj – mora biti ista kao adresa referentne osobe. Stan mora imati dovoljno prostora (min. 12m² po osobi)!",
        cards: [{
          whatToWrite: "Ulica, kućni broj, PLZ, grad – adresa partnera/roditelja u Njemačkoj.",
          whereToFind: "Meldebescheinigung referentne osobe ili ugovor o najmu.",
          format: "Tekst.",
          commonMistakes: "Stan je premalen! Min. 12m² po osobi. Ured može provjeriti veličinu stana.",
          whenToLeaveEmpty: "Nikada.",
          example: "Musterstraße 15, 10115 Berlin",
        }],
      },
      {
        field: "Bračni status i podaci o supružniku",
        instruction: "Polja 8–10: Označi 'verheiratet' (u braku) i upiši podatke o supružniku koji živi u Njemačkoj.",
        cards: [{
          whatToWrite: "Status: verheiratet seit (u braku od) + datum vjenčanja. Supružnik: puno ime, datum rođenja, adresa u Njemačkoj, državljanstvo.",
          whereToFind: "Vjenčani list (ovjeren i preveden!), pasoš supružnika.",
          format: "Kvačica + tekst. Datum: DD.MM.GGGG.",
          commonMistakes: "Vjenčani list nije preveden od ovlaštenog prevodioca. Nije apostiliran. Datum vjenčanja ne odgovara dokumentu.",
          whenToLeaveEmpty: "Nikada ako tražiš spajanje sa supružnikom.",
          example: "☑ verheiratet seit: 10.06.2020\nEhegatte: Hadžić, Amir\ngeb. 12.05.1990, Sarajevo\nAnschrift: Musterstraße 15, 10115 Berlin",
        }],
      },
      {
        field: "Djeca (Kinder)",
        instruction: "Polja 11–12: Upiši podatke o djeci ako dolaze s tobom. Ako djeca ostaju, navedi to u polju 12.",
        cards: [{
          whatToWrite: "Imena, datumi i mjesta rođenja djece. U polju 12: da li dolaze s tobom.",
          whereToFind: "Rodni listovi djece (ovjereni + prevedeni).",
          format: "Tekst + datumi.",
          commonMistakes: "Ne priložiti rodni list djeteta. Ne navesti da dijete dolazi naknadno.",
          whenToLeaveEmpty: "Ako nemaš djece.",
          example: "1.: Hadžić, Kenan, geb. 15.03.2021, Sarajevo\n☑ ja, Kind reist mit ein",
        }],
      },
      {
        field: "Putna isprava (Pass)",
        instruction: "Polje 15: Podaci o tvom pasošu. Mora biti važeći min. 6 mjeseci NAKON planiranog ulaska!",
        cards: [{
          whatToWrite: "Broj pasoša, datum izdavanja, izdavalac, datum isteka.",
          whereToFind: "Tvoj pasoš.",
          format: "Alfanumerički + datumi DD.MM.GGGG.",
          commonMistakes: "Pasoš ističe uskoro – obavezno obnoviti PRIJE podnošenja zahtjeva!",
          whenToLeaveEmpty: "Nikada.",
          example: "Reisepass Nr.: B2345678\nausgestellt am: 05.01.2023\nausgestellt von: MUP BiH, Tuzla\ngültig bis: 05.01.2033",
        }],
      },
      {
        field: "Jezički certifikat – A1 (KLJUČNO!)",
        instruction: "Za spajanje supružnika OBAVEZNO je A1 certifikat njemačkog jezika! Ovo je jedan od najčešćih razloga za odbijanje.",
        cards: [{
          whatToWrite: "Ovo polje ne postoji direktno na formularu, ali A1 certifikat MORAŠ priložiti. Navedi u svrsi boravka ili priloži kao dokument.",
          whereToFind: "Goethe-Institut ili ÖSD certifikat – polaganje u zemlji porijekla.",
          format: "Prilog – kopija certifikata.",
          commonMistakes: "NE POLAGATI A1 na vrijeme! Polaganje traje mjesecima. Neke institucije ne priznaju online certifikate. Certifikat mora biti Goethe, ÖSD ili telc.",
          whenToLeaveEmpty: "Izuzetak: visokokvalificirani supružnici (npr. partneri nosilaca Blue Card) mogu biti oslobođeni – provjeriti!",
          example: "Goethe-Zertifikat A1: Start Deutsch 1\nPoložen: 15.12.2023, Goethe-Institut Sarajevo",
        }],
      },
      {
        field: "Finansijska sredstva (Lebensunterhalt)",
        instruction: "Polje 23: Referentna osoba u Njemačkoj mora dokazati da može finansijski izdržavati porodicu. Ili: Verpflichtungserklärung (garancija izdržavanja).",
        cards: [{
          whatToWrite: "Navedi izvor: 'Unterhalt durch Ehepartner' (izdržavanje od supružnika) + njegovi/njeni prihodi.",
          whereToFind: "Platne liste referentne osobe (zadnja 3 mjeseca), ugovor o radu.",
          format: "Tekst.",
          commonMistakes: "Nedovoljni prihodi. Referentna osoba prima socijalnu pomoć – ovo može biti razlog za odbijanje!",
          whenToLeaveEmpty: "Nikada.",
          example: "Lebensunterhalt: Unterhalt durch Ehemann (Erwerbstätigkeit, Nettoeinkommen ca. 2.800€)",
        }],
      },
      {
        field: "Zdravstveno osiguranje",
        instruction: "Polje 25: Moraš imati zdravstveno osiguranje. Obično se osiguravaš preko supružnika (Familienversicherung) nakon dolaska.",
        cards: [{
          whatToWrite: "Označi 'ja' ako već imaš, ili navedi plan za Familienversicherung nakon dolaska.",
          whereToFind: "Potvrda osiguranja ili plan.",
          format: "Kvačica + tekst.",
          commonMistakes: "Nemati nikakav plan za osiguranje. Putno osiguranje važi samo privremeno!",
          whenToLeaveEmpty: "Nikada.",
          example: "☑ ja – Familienversicherung über Ehepartner bei TK (nach Einreise)",
        }],
      },
      {
        field: "Potpis i predaja zahtjeva",
        instruction: "Potpiši i predaj na njemačkoj ambasadi u zemlji porijekla (za prvi ulazak) ili Ausländerbehörde (ako si već u Njemačkoj).",
        cards: [{
          whatToWrite: "Mjesto, datum, potpis.",
          whereToFind: "—",
          format: "Rukom.",
          commonMistakes: "Predati nepotpisan formular. Ne zakazati termin na ambasadi na vrijeme – čekanje može biti 3–6 mjeseci!",
          whenToLeaveEmpty: "Nikada.",
          example: "Sarajevo, den 01.02.2024\n(potpis) Hadžić, Amina\n\n💡 Savjeti:\n• Zakaži termin na ambasadi ŠTO PRIJE\n• A1 certifikat položi PRIJE zakazivanja\n• SVE dokumente ovjeriti i prevesti\n• Obrada traje 2–6 mjeseci",
        }],
      },
    ],
  },
  documents: {
    de: ["Reisepass", "Biometrisches Foto", "Heiratsurkunde", "A1-Zertifikat", "Krankenversicherung", "Einkommensnachweis"],
    bs: [
      "Važeći pasoš (min. 6 mjeseci)",
      "Biometrijska fotografija (35x45mm)",
      "Vjenčani list (apostiliran + preveden od ovlaštenog prevodioca)",
      "A1 certifikat njemačkog jezika (Goethe/ÖSD/telc)",
      "Potvrda zdravstvenog osiguranja",
      "Dokaz o prihodima referentne osobe (platne liste)",
      "Dokaz o stambenom prostoru (ugovor o najmu + veličina)",
      "Kopija boravišne dozvole supružnika u Njemačkoj",
    ],
    en: ["Passport", "Biometric photo", "Marriage certificate", "A1 certificate", "Health insurance", "Income proof"],
  },
  processingTime: { de: "2–6 Monate", bs: "2–6 mjeseci (ambasada) / 4–8 sedmica (Ausländerbehörde)", en: "2–6 months" },
  commonMistakes: {
    de: ["Kein A1-Zertifikat", "Unzureichender Wohnraum"],
    bs: [
      "A1 certifikat nije položen prije podnošenja zahtjeva",
      "Stambeni prostor premalen (min. 12m² po osobi)",
      "Dokumenti nisu prevedeni od ovlaštenog prevodioca",
      "Prihodi referentne osobe nedovoljni",
      "Vjenčani list nije apostiliran",
      "Kasno zakazivanje termina na ambasadi (3–6 mjeseci čekanja!)",
    ],
    en: ["No A1 certificate", "Insufficient living space"],
  },
  officialPdf: "",
  onlineLink: "",
  officialInfoUrl: "https://www.auswaertiges-amt.de/de/service/visa-und-aufenthalt",
});

// ===================== BILDUNG – Studentska viza =====================
guides.push({
  slug: "studentska-viza",
  category: "bildung",
  title: {
    de: "Studienvisum – Aufenthaltserlaubnis zu Studienzwecken",
    bs: "Studentska viza – Boravišna dozvola radi studiranja",
    en: "Student Visa – Residence Permit for Studies",
  },
  who: {
    de: "Drittstaatsangehörige, die an einer deutschen Hochschule zugelassen sind.",
    bs: "Državljani izvan EU koji su primljeni na njemački univerzitet ili Studienkolleg.",
    en: "Non-EU nationals admitted to a German university or Studienkolleg.",
  },
  authority: {
    de: "Ausländerbehörde / Deutsche Botschaft",
    bs: "Ured za strance (Ausländerbehörde) / Njemačka ambasada",
    en: "Foreigners Authority / German Embassy",
  },
  formName: {
    de: "Antrag auf Erteilung / Verlängerung einer Aufenthaltserlaubnis",
    bs: "Zahtjev za izdavanje / produženje boravišne dozvole",
    en: "Application for Issuance / Extension of a Residence Permit",
  },
  steps: {
    de: [], en: [],
    bs: [
      {
        field: "Svrha zahtjeva (Zweck)",
        instruction: "Označi 'Erteilung' + 'Aufenthaltserlaubnis' za prvu studentsku vizu.",
        cards: [{
          whatToWrite: "☑ Erteilung + ☑ Aufenthaltserlaubnis.",
          whereToFind: "—",
          format: "Kvačica.",
          commonMistakes: "Označavanje pogrešnog polja.",
          whenToLeaveEmpty: "Nikada.",
          example: "☑ Erteilung + ☑ Aufenthaltserlaubnis",
        }],
      },
      {
        field: "Svrha boravka (Zweck des Aufenthalts)",
        instruction: "Polje 1: Navedi 'Studium' i naziv studijskog programa.",
        cards: [{
          whatToWrite: "'Studium – [naziv programa] an der [naziv univerziteta]' (§16b AufenthG).",
          whereToFind: "Potvrda o upisu (Zulassungsbescheid).",
          format: "Slobodan tekst na njemačkom.",
          commonMistakes: "Pisanje samo 'Studium' bez naziva univerziteta. Ne navesti §16b.",
          whenToLeaveEmpty: "Nikada.",
          example: "Studium – Informatik (B.Sc.) an der TU München (§16b AufenthG)",
        }],
      },
      {
        field: "Lični podaci (Persönliche Angaben)",
        instruction: "Polja 2–6: Tvoji podaci tačno kao u pasošu.",
        cards: [{
          whatToWrite: "Prezime, ime, datum rođenja, mjesto rođenja, državljanstvo.",
          whereToFind: "Pasoš.",
          format: "Tekst. Datum: DD.MM.GGGG.",
          commonMistakes: "Pogrešan format datuma. Izostavljanje imena iz pasoša.",
          whenToLeaveEmpty: "Djevojačko prezime – samo ako se razlikuje.",
          example: "Familienname: Delić\nVorname: Sara\nGeburtsdatum: 05.11.2000\nGeburtsort: Mostar, Bosnien und Herzegowina\nStaatsangehörigkeit: bosnisch-herzegowinisch",
        }],
      },
      {
        field: "Adresa u Njemačkoj",
        instruction: "Polje 7: Adresa studentskog doma ili stana. Mora odgovarati Anmeldung prijavi!",
        cards: [{
          whatToWrite: "Ulica, kućni broj, PLZ, grad.",
          whereToFind: "Ugovor o najmu ili potvrda studentskog doma (Studentenwerk).",
          format: "Tekst.",
          commonMistakes: "Navesti adresu hotela ili privremeni smještaj. Mora biti stalna adresa!",
          whenToLeaveEmpty: "Nikada.",
          example: "Studentenwohnheim, Arcisstraße 21, 80333 München",
        }],
      },
      {
        field: "Porodični podaci",
        instruction: "Polja 8–14: Bračni status, supružnik (ako imaš), djeca, roditelji.",
        cards: [{
          whatToWrite: "Bračni status (većinom 'ledig' – samac). Roditelji: puno ime oca i majke.",
          whereToFind: "Rodni list, pasoš.",
          format: "Tekst + kvačice.",
          commonMistakes: "Izostavljanje podataka o roditeljima.",
          whenToLeaveEmpty: "Supružnik i djeca – ako nemaš.",
          example: "☑ ledig\nVater: Delić, Mirza\nMutter: Delić geb. Ahmetović, Jasmina",
        }],
      },
      {
        field: "Putna isprava (Pass)",
        instruction: "Polje 15: Podaci o pasošu.",
        cards: [{
          whatToWrite: "Broj, datum izdavanja, izdavalac, datum isteka.",
          whereToFind: "Pasoš.",
          format: "Alfanumerički + DD.MM.GGGG.",
          commonMistakes: "Pasoš ističe tokom studija – obavezno obnoviti!",
          whenToLeaveEmpty: "Nikada.",
          example: "Reisepass Nr.: C1234567\nausgestellt am: 01.09.2023\ngültig bis: 01.09.2033",
        }],
      },
      {
        field: "Prethodni boravci i datum ulaska",
        instruction: "Polja 18–20: Kada si ušao/la u Njemačku i da li si ranije boravio/la.",
        cards: [{
          whatToWrite: "Datum ulaska. Prethodni boravci: da/ne.",
          whereToFind: "Pečati u pasošu.",
          format: "DD.MM.GGGG.",
          commonMistakes: "Zaboraviti navesti Studienkolleg ili jezički kurs kao prethodni boravak.",
          whenToLeaveEmpty: "Ako nikada nisi bio/la – označi 'nein'.",
          example: "Eingereist am: 01.10.2024\nFrühere Aufenthalte: ☑ ja\nvom 01.03.2024 bis 30.09.2024 – Sprachkurs in München",
        }],
      },
      {
        field: "Trajanje boravka",
        instruction: "Polje 21: Planirano trajanje studija.",
        cards: [{
          whatToWrite: "Trajanje studijskog programa u godinama.",
          whereToFind: "Potvrda o upisu – Regelstudienzeit.",
          format: "Tekst ili broj.",
          commonMistakes: "Pisanje prekratkog perioda. Navedi puno trajanje studija!",
          whenToLeaveEmpty: "Nikada.",
          example: "3 Jahre (Bachelor) ili 2 Jahre (Master)",
        }],
      },
      {
        field: "Finansiranje studija – Sperrkonto (KLJUČNO!)",
        instruction: "Polje 23: NAJVAŽNIJI DIO za studentsku vizu! Moraš dokazati da imaš dovoljno novca za život. Standardno: Sperrkonto (blokirani račun) sa min. 11.904€ godišnje (992€ mjesečno).",
        cards: [{
          whatToWrite: "Navedi izvor: 'Sperrkonto' ili 'Stipendium' (stipendija) ili 'Verpflichtungserklärung' (garancija).",
          whereToFind: "Potvrda banke o otvorenom Sperrkonto (npr. Expatrio, Fintiba, Deutsche Bank).",
          format: "Tekst + priloži potvrdu.",
          commonMistakes: "Sperrkonto nije otvoren na vrijeme – otvaranje traje 2–4 sedmice! Iznos manji od 11.904€. Korištenje obične banke umjesto Sperrkonto provajdera.",
          whenToLeaveEmpty: "Nikada – bez finansijskog dokaza nema studentske vize!",
          example: "Sperrkonto bei Expatrio – 11.904€\nili: DAAD-Stipendium, 934€/Monat",
        }],
      },
      {
        field: "Zdravstveno osiguranje",
        instruction: "Polje 25: Obavezno za upis i za boravišnu dozvolu. Studenti do 30 godina mogu koristiti studentsko osiguranje (ca. 110€/mjesec).",
        cards: [{
          whatToWrite: "Označi 'ja' + naziv osiguravajućeg društva.",
          whereToFind: "Potvrda zdravstvenog osiguranja (od AOK, TK, Barmer itd.).",
          format: "Kvačica + tekst.",
          commonMistakes: "Privatno osiguranje iz inostranstva NIJE dovoljno za upis na većinu univerziteta! Mora biti njemačko zakonsko (gesetzlich) osiguranje.",
          whenToLeaveEmpty: "Nikada.",
          example: "☑ ja, Versicherung: AOK (studentische Versicherung, ca. 110€/Monat)",
        }],
      },
      {
        field: "Kaznena evidencija i potpis",
        instruction: "Polja 26–27 + potpis: Odgovori iskreno na pitanja o kažnjavanju i potpiši formular.",
        cards: [{
          whatToWrite: "Označi 'nein' ako nemaš evidenciju. Potpiši se na kraju.",
          whereToFind: "—",
          format: "Kvačice + potpis rukom.",
          commonMistakes: "Nepotpisan formular. Zaboraviti priložiti Zulassungsbescheid!",
          whenToLeaveEmpty: "Nikada.",
          example: "Vorbestraft: ☑ nein\nAusweisung: ☑ nein\n\nMünchen, den 15.09.2024\n(potpis) Delić, Sara\n\n💡 Savjeti:\n• Zakaži termin na ambasadi 3+ mjeseca unaprijed\n• Otvori Sperrkonto odmah nakon prijema na univerzitet\n• Studenti smiju raditi 120 punih ili 240 pola dana godišnje",
        }],
      },
    ],
  },
  documents: {
    de: ["Reisepass", "Biometrisches Foto", "Zulassungsbescheid", "Sperrkonto-Nachweis", "Krankenversicherung"],
    bs: [
      "Važeći pasoš (min. 6 mjeseci)",
      "Biometrijska fotografija (35x45mm)",
      "Potvrda o upisu na univerzitet (Zulassungsbescheid)",
      "Dokaz o finansijama – Sperrkonto (min. 11.904€) ili stipendija",
      "Zdravstveno osiguranje (njemačko zakonsko)",
      "Diplome / svjedodžbe (ovjerene + prevedene)",
      "CV / životopis",
      "Motivaciono pismo (neki univerziteti zahtijevaju)",
    ],
    en: ["Passport", "Biometric photo", "Admission letter", "Blocked account", "Health insurance"],
  },
  processingTime: { de: "4–12 Wochen", bs: "4–12 sedmica (ambasada)", en: "4–12 weeks" },
  commonMistakes: {
    de: ["Sperrkonto nicht rechtzeitig eröffnet", "Dokumente nicht beglaubigt"],
    bs: [
      "Sperrkonto nije otvoren na vrijeme (traje 2–4 sedmice!)",
      "Dokumenti nisu apostilirani ili prevedeni",
      "Zdravstveno osiguranje nije njemačko zakonsko",
      "Prijava za pogrešan tip vize (turistička vs. studentska)",
      "Kasno zakazivanje termina na ambasadi",
    ],
    en: ["Blocked account not opened in time", "Documents not certified"],
  },
  officialPdf: "",
  onlineLink: "",
  officialInfoUrl: "https://www.daad.de/de/",
});

// ===================== ARBEIT – Stalni boravak (Niederlassungserlaubnis) =====================
guides.push({
  slug: "stalni-boravak",
  category: "arbeit",
  title: {
    de: "Niederlassungserlaubnis – Unbefristeter Aufenthaltstitel",
    bs: "Stalni boravak (Niederlassungserlaubnis)",
    en: "Permanent Residence Permit (Niederlassungserlaubnis)",
  },
  who: {
    de: "Personen mit mindestens 5 Jahren Aufenthalt (oder kürzer mit Blauer Karte EU).",
    bs: "Osobe sa min. 5 godina boravka u Njemačkoj (ili kraće sa Blue Card).",
    en: "Persons with at least 5 years of residence (or shorter with Blue Card).",
  },
  authority: {
    de: "Ausländerbehörde",
    bs: "Ured za strance (Ausländerbehörde)",
    en: "Foreigners Authority (Ausländerbehörde)",
  },
  formName: {
    de: "Antrag auf Erteilung einer Niederlassungserlaubnis",
    bs: "Zahtjev za izdavanje dozvole stalnog boravka",
    en: "Application for Permanent Residence Permit",
  },
  steps: {
    de: [], en: [],
    bs: [
      {
        field: "Svrha zahtjeva (Zweck)",
        instruction: "Za stalni boravak označi 'Erteilung' + 'Niederlassungserlaubnis'. OVO JE DRUGAČIJE od svih prethodnih viza!",
        cards: [{
          whatToWrite: "☑ Erteilung + ☑ Niederlassungserlaubnis.",
          whereToFind: "—",
          format: "Kvačica.",
          commonMistakes: "Označavanje 'Aufenthaltserlaubnis' umjesto 'Niederlassungserlaubnis'. Ovo je trajna dozvola, ne privremena!",
          whenToLeaveEmpty: "Nikada.",
          example: "☑ Erteilung + ☑ Niederlassungserlaubnis",
        }],
      },
      {
        field: "Svrha boravka",
        instruction: "Polje 1: Navedi osnov za stalni boravak. Zavisi od tvoje situacije.",
        cards: [{
          whatToWrite: "'Niederlassungserlaubnis nach §9 AufenthG' (standardno) ili '§18c' (bivši Blue Card) ili '§26 Abs. 4' (humanitarni).",
          whereToFind: "Tvoja trenutna boravišna dozvola – paragraf je naveden na eAT kartici.",
          format: "Tekst.",
          commonMistakes: "Ne navesti tačan pravni osnov. Ako imaš Blue Card, koristi §18c – daje prednosti (kraći rok: 21 ili 33 mjeseca)!",
          whenToLeaveEmpty: "Nikada.",
          example: "Niederlassungserlaubnis nach §9 AufenthG\nili: Niederlassungserlaubnis für ehemalige Inhaber einer Blauen Karte EU (§18c)",
        }],
      },
      {
        field: "Lični podaci",
        instruction: "Polja 2–6: Standardni lični podaci kao u pasošu.",
        cards: [{
          whatToWrite: "Prezime, ime, datum rođenja, mjesto rođenja, državljanstvo.",
          whereToFind: "Pasoš.",
          format: "Tekst. Datum: DD.MM.GGGG.",
          commonMistakes: "Pogrešan format datuma. Ne navesti sva imena iz pasoša.",
          whenToLeaveEmpty: "Djevojačko prezime – samo ako se razlikuje.",
          example: "Familienname: Kovačević\nVorname: Dragan\nGeburtsdatum: 03.07.1985\nGeburtsort: Banja Luka, Bosnien und Herzegowina\nStaatsangehörigkeit: bosnisch-herzegowinisch",
        }],
      },
      {
        field: "Adresa i bračni status",
        instruction: "Polja 7–9: Adresa, bračni status, spol. Adresa mora odgovarati Meldebescheinigung!",
        cards: [{
          whatToWrite: "Adresa, bračni status, spol.",
          whereToFind: "Meldebescheinigung.",
          format: "Tekst + kvačice.",
          commonMistakes: "Adresa ne odgovara prijavi. Ovo je bitno jer se provjerava 5-godišnji kontinuirani boravak!",
          whenToLeaveEmpty: "Nikada.",
          example: "Berliner Straße 88, 40213 Düsseldorf\n☑ verheiratet seit: 10.06.2018\n☑ männlich",
        }],
      },
      {
        field: "Porodični podaci",
        instruction: "Polja 10–14: Supružnik, djeca, roditelji.",
        cards: [{
          whatToWrite: "Standardni porodični podaci.",
          whereToFind: "Pasoši, vjenčani list, rodni listovi.",
          format: "Tekst + datumi.",
          commonMistakes: "Izostavljanje djece ili supružnika.",
          whenToLeaveEmpty: "Supružnik/djeca – ako ih nemaš.",
          example: "Ehegatte: Kovačević, Jelena, geb. 12.11.1987\nKinder: 1. Kovačević, Luka, geb. 05.04.2015",
        }],
      },
      {
        field: "Putna isprava i prethodni boravci",
        instruction: "Polja 15, 18–20: Pasoš + istorija boravka. Za stalni boravak, tvoja istorija boravka je KLJUČNA!",
        cards: [{
          whatToWrite: "Podaci o pasošu. Svi prethodni boravci u Njemačkoj sa tačnim periodima.",
          whereToFind: "Pasoš, prethodne eAT kartice, Meldebescheinigungen.",
          format: "Datumi DD.MM.GGGG.",
          commonMistakes: "Ne navesti sve periode boravka! Prekidi duži od 6 mjeseci mogu RESETIRATI 5-godišnji period! Odsustva duža od 3 mjeseca godišnje su rizična.",
          whenToLeaveEmpty: "Nikada.",
          example: "Eingereist am: 01.09.2019\nVorhandener Aufenthaltstitel: Aufenthaltserlaubnis §18b\nausgestellt am: 01.09.2019, gültig bis: 31.08.2025",
        }],
      },
      {
        field: "Zaposlenje i prihodi (KLJUČNO!)",
        instruction: "Polja 22–23: Stabilno zaposlenje i dovoljni prihodi su OBAVEZNI za stalni boravak.",
        cards: [{
          whatToWrite: "Naziv firme, adresa, pozicija. Izvor prihoda: zaposlenje.",
          whereToFind: "Ugovor o radu, platne liste.",
          format: "Tekst.",
          commonMistakes: "Nedovoljni prihodi – moraš moći izdržavati sebe i porodicu BEZ socijalne pomoći! Prekidi u zaposlenju mogu biti problem.",
          whenToLeaveEmpty: "Nikada.",
          example: "Arbeitgeber: Deutsche Telekom AG\nPosition: Netzwerktechniker\nEinkünfte: Erwerbstätigkeit (Netto ca. 3.200€)",
        }, {
          whatToWrite: "PENZIJSKO OSIGURANJE: Moraš imati min. 60 mjeseci (5 godina) uplata u penzijsko osiguranje. Za Blue Card nosioce: 21 ili 33 mjeseca.",
          whereToFind: "Rentenversicherungsverlauf od Deutsche Rentenversicherung – zatraži besplatni izvod!",
          format: "Broj mjeseci.",
          commonMistakes: "Nedovoljno mjeseci penzijskog osiguranja. Ako si bio samozaposlen, provjeri da li si uplaćivao!",
          whenToLeaveEmpty: "Nikada.",
          example: "Rentenversicherungsbeiträge: 62 Monate (od 09/2019)",
        }],
      },
      {
        field: "Jezički certifikat – B1 (OBAVEZNO!)",
        instruction: "Za stalni boravak MORAŠ imati minimalno B1 nivo njemačkog jezika. Bez toga – nema stalnog boravka!",
        cards: [{
          whatToWrite: "Priloži B1 certifikat ili potvrdu o završenom Integrationskursu (koji uključuje B1 test).",
          whereToFind: "Goethe-Institut, telc, ÖSD certifikat ili BAMF potvrda o Integrationskursu.",
          format: "Prilog – kopija certifikata.",
          commonMistakes: "A1 ili A2 NIJE dovoljno! Mora biti minimum B1. Neki Ausländerbehörde traže B2 za određene kategorije.",
          whenToLeaveEmpty: "Nikada – obavezno za stalni boravak.",
          example: "Goethe-Zertifikat B1, položen 15.06.2023\nili: Integrationskurs – DTZ Prüfung B1, BAMF",
        }],
      },
      {
        field: "Integrationskurs ili Einbürgerungstest",
        instruction: "Moraš dokazati osnovno znanje pravnog i društvenog sistema Njemačke – ili kroz Integrationskurs (Orientierungskurs dio) ili Einbürgerungstest.",
        cards: [{
          whatToWrite: "Priloži potvrdu o završenom Orientierungskurs (dio Integrationskursa) ili položenom Einbürgerungstest.",
          whereToFind: "BAMF potvrda ili VHS (Volkshochschule) certifikat.",
          format: "Prilog.",
          commonMistakes: "Misliti da samo jezički certifikat dovoljan – trebaš I jezički I društveni/pravni test!",
          whenToLeaveEmpty: "Nikada.",
          example: "Orientierungskurs bestanden am 20.03.2023, VHS Düsseldorf\nili: Einbürgerungstest bestanden am 10.01.2024",
        }],
      },
      {
        field: "Zdravstveno osiguranje",
        instruction: "Polje 25: Obavezno.",
        cards: [{
          whatToWrite: "Označi 'ja' + naziv.",
          whereToFind: "Kartica osiguranja.",
          format: "Kvačica + tekst.",
          commonMistakes: "Neimanji zdravstveno osiguranje.",
          whenToLeaveEmpty: "Nikada.",
          example: "☑ ja, Versicherung: Barmer",
        }],
      },
      {
        field: "Stambeni prostor",
        instruction: "Moraš imati adekvatan stambeni prostor za sebe i porodicu. Ured može tražiti dokaz o veličini stana.",
        cards: [{
          whatToWrite: "Adresa + veličina stana u m². Min. 12m² po osobi.",
          whereToFind: "Ugovor o najmu – obično navodi veličinu.",
          format: "Tekst + m².",
          commonMistakes: "Stan premalen za porodicu. Ne imati ugovor o najmu ili vlasništvo.",
          whenToLeaveEmpty: "Nikada.",
          example: "Wohnung: 75m², 3 Zimmer, Berliner Straße 88, Düsseldorf (za 3 osobe = 25m²/osoba ✓)",
        }],
      },
      {
        field: "Kaznena evidencija i potpis",
        instruction: "Polja 26–27 + potpis. Kaznena evidencija može SPRIJEČITI stalni boravak!",
        cards: [{
          whatToWrite: "Označi iskreno. Potpiši formular.",
          whereToFind: "—",
          format: "Kvačice + potpis rukom.",
          commonMistakes: "Laganje o kaznenoj evidenciji. Bilo kakva osuđujuća presuda može ugroziti zahtjev!",
          whenToLeaveEmpty: "Nikada.",
          example: "Vorbestraft: ☑ nein\nAusweisung: ☑ nein\n\nDüsseldorf, den 01.06.2025\n(potpis) Kovačević, Dragan\n\n💡 Savjeti za Blue Card nosioce:\n• Sa B1 jezikom → stalni boravak nakon 21 mjeseca!\n• Sa A1 jezikom → stalni boravak nakon 33 mjeseca\n• Najbrži put do stalnog boravka u EU!",
        }],
      },
    ],
  },
  documents: {
    de: ["Reisepass", "Biometrisches Foto", "B1-Zertifikat", "Rentenversicherungsnachweis", "Arbeitsvertrag"],
    bs: [
      "Važeći pasoš",
      "Biometrijska fotografija (35x45mm)",
      "Aktuelna boravišna dozvola (eAT kartica)",
      "Jezički certifikat B1 (Goethe/telc/ÖSD)",
      "Potvrda o Integrationskursu ili Einbürgerungstest",
      "Dokaz o penzijskom osiguranju – min. 60 mjeseci (Rentenversicherungsverlauf)",
      "Ugovor o radu + platne liste (zadnja 3 mjeseca)",
      "Ugovor o najmu + veličina stana",
      "Potvrda zdravstvenog osiguranja",
    ],
    en: ["Passport", "Biometric photo", "B1 certificate", "Pension insurance proof", "Employment contract"],
  },
  processingTime: { de: "4–12 Wochen", bs: "4–12 sedmica", en: "4–12 weeks" },
  commonMistakes: {
    de: ["Unzureichende Rentenversicherung", "Kein B1-Zertifikat"],
    bs: [
      "Nedovoljno mjeseci penzijskog osiguranja (min. 60)",
      "Jezički certifikat nije na B1 nivou (A2 NIJE dovoljno!)",
      "Prekidi u boravku duži od 6 mjeseci resetiraju period",
      "Zaboraviti Orientierungskurs/Einbürgerungstest",
      "Primanje socijalne pomoći – može biti razlog za odbijanje",
    ],
    en: ["Insufficient pension contributions", "No B1 certificate"],
  },
  officialPdf: "",
  onlineLink: "",
  officialInfoUrl: "https://www.bamf.de/DE/Themen/MigrationAufenthalt/migrationaufenthalt-node.html",
});

export function getGuidesByCategory(category: Guide["category"]) {
  return guides.filter((g) => g.category === category);
}

export function getGuideBySlug(slug: string) {
  return guides.find((g) => g.slug === slug);
}

/** Returns the single best official URL for a guide (priority: officialInfoUrl > onlineLink > officialPdf). */
export function getOfficialUrl(guide: Guide): string {
  return guide.officialInfoUrl || guide.onlineLink || guide.officialPdf || "";
}
