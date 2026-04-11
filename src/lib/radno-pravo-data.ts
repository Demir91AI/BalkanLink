import {
  FileText, Clock, AlertTriangle, Euro, Calendar, Shield, Users,
  Briefcase, GraduationCap, HeartPulse, Scale, Ban, LucideIcon,
} from "lucide-react";

export interface RadnoPravoCategory {
  id: string;
  label: string;
  icon: LucideIcon;
  slugs: string[];
}

export interface RadnoPravoGuide {
  slug: string;
  title: string;
  germanTerm: string;
  categoryId: string;
  explanation: string;
  rules: string[];
  examples: string[];
  warnings: string[];
  myths: string[];
  sources: string[];
  lastUpdated: string;
}

export const RADNO_PRAVO_CATEGORIES: RadnoPravoCategory[] = [
  { id: "ugovor", label: "Ugovor o radu", icon: FileText, slugs: ["arbeitsvertrag", "probezeit", "vrste-ugovora"] },
  { id: "plata", label: "Plata i primanja", icon: Euro, slugs: ["minimalna-plata", "lohnabrechnung", "zuschlaege", "kasnjenje-plate", "odbici-sa-plate", "bonusi"] },
  { id: "radno-vrijeme", label: "Radno vrijeme", icon: Clock, slugs: ["radno-vrijeme", "prekovremeni-sati", "nocni-vikend-praznicni-rad"] },
  { id: "odmor-bolovanje", label: "Odmor i bolovanje", icon: Calendar, slugs: ["godisnji-odmor", "bolovanje", "bolovanje-djeteta"] },
  { id: "porodica", label: "Porodica i zaštita", icon: HeartPulse, slugs: ["mutterschutz", "elternzeit", "pflegeurlaub"] },
  { id: "otkaz", label: "Otkaz i prestanak", icon: AlertTriangle, slugs: ["otkazni-rokovi", "otkaz-poslodavac", "otkaz-zaposleni", "fristlose-kuendigung", "abmahnung", "aufhebungsvertrag", "sperrzeit"] },
  { id: "posebni-oblici", label: "Posebni oblici rada", icon: Briefcase, slugs: ["nebenjob-minijob-midijob", "werkstudent", "ausbildung", "praktikum"] },
  { id: "zastita", label: "Zaštita na radu", icon: Shield, slugs: ["mobbing-diskriminacija"] },
];

export const RADNO_PRAVO_GUIDES: RadnoPravoGuide[] = [
  // ─── UGOVOR ───
  {
    slug: "arbeitsvertrag",
    title: "Ugovor o radu",
    germanTerm: "Arbeitsvertrag",
    categoryId: "ugovor",
    explanation: "Ugovor o radu (Arbeitsvertrag) je pravni osnov radnog odnosa u Njemačkoj. Od 1. augusta 2022. godine (reformirani Nachweisgesetz – NachwG), poslodavac je dužan najkasnije prvog radnog dana uručiti pisani ugovor sa svim bitnim uslovima. Ugovor može biti sklopljen usmeno, ali pisana forma je zakonski obavezna za dokumentaciju. Ugovor reguliše prava i obaveze obje strane.",
    rules: [
      "Pisani ugovor mora sadržavati: ime i adresu obje strane, datum početka rada, opis posla, radno mjesto, radno vrijeme, platu (brutto), godišnji odmor, otkazne rokove i upućivanje na primjenjive kolektivne ugovore (Tarifvertrag).",
      "Od 01.08.2022. (NachwG reforma) poslodavac mora dostaviti pisane uslove najkasnije prvog radnog dana.",
      "Kršenje NachwG obaveze može rezultirati novčanom kaznom do 2.000€ po prekršaju za poslodavca.",
      "Ugovor ne smije sadržavati klauzule koje su u suprotnosti sa zakonom – takve klauzule su automatski nevažeće.",
      "Ukoliko postoji Tarifvertrag (kolektivni ugovor), njegove odredbe imaju prednost nad nepovoljnijim individualnim ugovornim klauzulama."
    ],
    examples: [
      "Marko je počeo raditi u firmi bez pisanog ugovora. Nakon reformiranog NachwG, poslodavac mu je dužan uručiti pisane uslove prvog dana.",
      "Amela je potpisala ugovor koji predviđa samo 15 dana godišnjeg odmora. Budući da je zakonski minimum 20 dana (za 5-dnevnu radnu sedmicu), ta klauzula je nevažeća i vrijedi zakonski minimum.",
      "Edin ima ugovor sa klauzulom o zabrani konkurencije nakon prestanka rada. Takva klauzula je validna samo ako uključuje kompenzaciju (Karenzentschädigung) od min. 50% posljednje plate."
    ],
    warnings: [
      "Nikada ne počinji raditi bez pisanog ugovora – čak i ako zakon priznaje usmeni ugovor, bez pisane dokumentacije teško ćeš dokazati svoje uslove.",
      "Pažljivo pročitaj klauzule o Ausschlussfristen (rokovi za potraživanja) – mnogi ugovori predviđaju da neostvarena prava propadaju nakon 3 mjeseca.",
      "Probni rok, prekovremeni sati i bonus moraju biti jasno definisani u ugovoru."
    ],
    myths: [
      "MIT: 'Usmeni ugovor nije validan.' – ČINJENICA: Usmeni ugovor je pravno važeći, ali poslodavac mora dostaviti pisanu dokumentaciju.",
      "MIT: 'Sve što piše u ugovoru je konačno.' – ČINJENICA: Klauzule koje su u suprotnosti sa zakonom ili Tarifvertragom su automatski nevažeće.",
      "MIT: 'Poslodavac može jednostrano mijenjati ugovor.' – ČINJENICA: Promjene zahtijevaju saglasnost ili formalni Änderungskündigung."
    ],
    sources: ["Bundesministerium für Arbeit und Soziales (BMAS)", "Nachweisgesetz (NachwG) – reformiran 01.08.2022", "Bürgerliches Gesetzbuch (BGB) §§ 611a, 622, 626"],
    lastUpdated: "2026-01-15"
  },
  {
    slug: "probezeit",
    title: "Probni rok",
    germanTerm: "Probezeit",
    categoryId: "ugovor",
    explanation: "Probni rok (Probezeit) je ugovoreno razdoblje na početku radnog odnosa tokom kojeg obje strane mogu lakše raskinuti ugovor. Trajanje probnog roka reguliše ugovor, ali zakonski maksimum je 6 mjeseci. Za vrijeme probnog roka važi skraćeni otkazni rok od 2 sedmice (§ 622 Abs. 3 BGB).",
    rules: [
      "Maksimalno trajanje probnog roka: 6 mjeseci (§ 622 Abs. 3 BGB).",
      "Otkazni rok tokom probnog roka: 2 sedmice, bez potrebe za posebnim razlogom.",
      "Probni rok mora biti eksplicitno naveden u ugovoru.",
      "Tokom probnog roka ne postoji opća zaštita od otkaza (Kündigungsschutzgesetz se primjenjuje tek nakon 6 mjeseci rada u firmi sa više od 10 zaposlenih).",
      "Kod befristeten ugovora (na određeno), probni rok ne smije prekoračiti proporcionalnu dužinu ugovora."
    ],
    examples: [
      "Adnan je dobio otkaz u 5. mjesecu probnog roka s otkaznim rokom od 2 sedmice – to je zakonski ispravno.",
      "Lejla ima ugovor na 12 mjeseci sa probnim rokom od 6 mjeseci. Njezin poslodavac želi produžiti probni rok na 8 mjeseci – to nije dozvoljeno.",
      "Semir je u probnom roku i razbolio se. Bolovanje ne produžava automatski probni rok."
    ],
    warnings: [
      "Otkaz u probnom roku ne zahtijeva razlog, ali ne smije biti diskriminatoran (AGG).",
      "Otkaz u probnom roku mora biti u pisanoj formi (§ 623 BGB).",
      "Bolovanje tokom probnog roka ne štiti od otkaza – ali otkaz se ne smije uručiti iz razloga bolesti bez ispunjavanja dodatnih uslova."
    ],
    myths: [
      "MIT: 'U probnom roku te mogu otpustiti bez ikakvog roka.' – ČINJENICA: Minimalni otkazni rok od 2 sedmice i dalje važi.",
      "MIT: 'Probni rok se može produžiti koliko poslodavac želi.' – ČINJENICA: Maksimum je 6 mjeseci.",
      "MIT: 'Ako se razboliš u probnom roku, automatski dobijaš otkaz.' – ČINJENICA: Bolovanje samo po sebi nije razlog za otkaz."
    ],
    sources: ["BGB § 622 Abs. 3", "Kündigungsschutzgesetz (KSchG) § 1", "BAG – Bundesarbeitsgericht sudska praksa"],
    lastUpdated: "2026-01-15"
  },
  {
    slug: "vrste-ugovora",
    title: "Vrste ugovora o radu",
    germanTerm: "Befristet / Unbefristet / Teilzeit",
    categoryId: "ugovor",
    explanation: "U Njemačkoj postoje tri osnovna tipa ugovora: ugovor na neodređeno (unbefristet), ugovor na određeno (befristet) i ugovor na skraćeno radno vrijeme (Teilzeit). Svaki tip ima specifična pravila regulisana zakonima TzBfG (Teilzeit- und Befristungsgesetz) i BGB.",
    rules: [
      "Ugovor na neodređeno (unbefristet) nema krajnji datum i prestaje samo otkazom ili sporazumom.",
      "Ugovor na određeno (befristet) bez sachlichen Grund: max. 2 godine, max. 3 produženja u tom periodu (§ 14 Abs. 2 TzBfG).",
      "Ugovor na određeno sa sachlichen Grund (npr. zamjena, projekat): može trajati duže i biti produžavan.",
      "Teilzeit: Zaposleni u firmama sa >15 zaposlenih imaju pravo na skraćeno radno vrijeme nakon 6 mjeseci rada (§ 8 TzBfG).",
      "Brückenteilzeit: Od 2019. zaposleni u firmama >45 zaposlenih mogu tražiti privremeni prelazak na Teilzeit (1-5 godina) s pravom povratka na puno radno vrijeme.",
      "Befristung mora biti ugovorena PISANO – usmena dogovora nije dovoljna (§ 14 Abs. 4 TzBfG)."
    ],
    examples: [
      "Hana ima befristeten ugovor koji je već produžen 3 puta u 2 godine. Daljnje produženje bez sachlichen Grund nije dozvoljeno – ugovor se automatski smatra unbefristetim.",
      "Mirza radi puno radno vrijeme i želi preći na Teilzeit. U firmi sa 20 zaposlenih ima pravo to zatražiti nakon 6 mjeseci.",
      "Selma traži Brückenteilzeit na 2 godine – njezina firma sa 50 zaposlenih to mora odobriti osim ako postoje operativni razlozi za odbijanje."
    ],
    warnings: [
      "Ako se befristeter ugovor ne produži pisano PRIJE isteka, automatski se smatra raskinutim.",
      "Ako nastaviš raditi nakon isteka befristeten ugovora uz znanje poslodavca, ugovor se automatski pretvara u unbefristeten (§ 15 Abs. 6 TzBfG).",
      "Prelazak na Teilzeit može uticati na visinu socijalnih davanja (Arbeitslosengeld, penzija)."
    ],
    myths: [
      "MIT: 'Befristeter ugovor se može produžavati neograničeno.' – ČINJENICA: Bez sachlichen Grund max. 2 godine / 3 produženja.",
      "MIT: 'Teilzeit znači da imaš manje prava.' – ČINJENICA: Teilzeit zaposlenici imaju ista prava proporcionalno (jednakost prema TzBfG § 4).",
      "MIT: 'Ne možeš se vratiti na puno radno vrijeme.' – ČINJENICA: Brückenteilzeit garantuje pravo povratka."
    ],
    sources: ["Teilzeit- und Befristungsgesetz (TzBfG)", "BGB § 611a", "BMAS – Informationen zur Teilzeit"],
    lastUpdated: "2026-01-15"
  },

  // ─── PLATA ───
  {
    slug: "minimalna-plata",
    title: "Minimalna plata u Njemačkoj",
    germanTerm: "Mindestlohn",
    categoryId: "plata",
    explanation: "Zakonska minimalna plata (Mindestlohn) u Njemačkoj od 01.01.2025. iznosi 12,82€/sat bruto, a od 01.01.2026. iznosi 12,82€/sat bruto (trenutno nije najavljena promjena za 2026. – Mindestlohnkommission je potvrdila isti iznos). Reguliše je Mindestlohngesetz (MiLoG). Ažuriranje: Od 2026. godine Mindestlohn iznosi 13,90€/sat prema preporuci komisije.",
    rules: [
      "Od 01.01.2026: Mindestlohn iznosi 13,90€ bruto/sat.",
      "Minijob-Grenze 2026: 603€ mjesečno (direktno vezana za Mindestlohn × 43,33h).",
      "Primjenjuje se na sve zaposlene starije od 18 godina.",
      "Izuzeci: Auszubildende (učenici), Langzeitarbeitslose (prvih 6 mjeseci), obavezni praktikanti do 3 mjeseca.",
      "Poslodavac je dužan voditi evidenciju radnog vremena za Minijob i određene branše.",
      "Kršenje: Kazna za poslodavca do 500.000€."
    ],
    examples: [
      "Merjem radi 20 sati sedmično. Sa 13,90€/sat, njena minimalna mjesečna brutto plata mora biti najmanje 1.207€.",
      "Amar radi kao Minijobber. Sa Mindestlohn od 13,90€/sat može raditi max. ~43,38h mjesečno da ostane ispod 603€ granice.",
      "Denis je na obaveznom praktikumu tokom studija (3 mjeseca) – za njega ne važi Mindestlohn."
    ],
    warnings: [
      "Napojnice, dodatci za prekovremeni rad i posebni bonusi NE ubrajaju se u Mindestlohn.",
      "Ako primijetiš da je tvoja efektivna satnica ispod Mindestlohn, imaš pravo na razliku – i do 3 godine retroaktivno.",
      "Poslodavac ne smije tražiti neprijavljeni rad ('na crno') kako bi izbjegao Mindestlohn."
    ],
    myths: [
      "MIT: 'Mindestlohn se ne primjenjuje na strance.' – ČINJENICA: Primjenjuje se na SVE zaposlene u Njemačkoj, bez obzira na nacionalnost.",
      "MIT: 'Probni rad ne mora biti plaćen.' – ČINJENICA: Probearbeit do jednog dana može biti neplaćen, ali sve preko toga zahtijeva Mindestlohn.",
      "MIT: 'Minijob ne podliježe Mindestlohn-u.' – ČINJENICA: I za Minijob važi zakonski Mindestlohn."
    ],
    sources: ["Mindestlohngesetz (MiLoG)", "Mindestlohnkommission – Beschluss 2024/2025", "BMAS – Mindestlohn Informationen"],
    lastUpdated: "2026-01-15"
  },
  {
    slug: "lohnabrechnung",
    title: "Obračun plate",
    germanTerm: "Lohnabrechnung / Gehaltsabrechnung",
    categoryId: "plata",
    explanation: "Svaki zaposleni u Njemačkoj ima zakonsko pravo na pisani obračun plate (Lohnabrechnung/Gehaltsabrechnung) prema § 108 Gewerbeordnung. Obračun mora prikazati brutto platu, sve odbitke (poreze, socijalno osiguranje) i neto iznos. Razumijevanje obračuna je ključno za provjeru ispravnosti isplate.",
    rules: [
      "Poslodavac je dužan mjesečno dostavljati pisani obračun plate (§ 108 GewO).",
      "Obračun mora sadržavati: brutto platu, Lohnsteuer, Solidaritätszuschlag (ako primjenjivo), Kirchensteuer (ako primjenjivo), doprinose za zdravstveno, penziono, osiguranje za nezaposlenost i osiguranje za njegu.",
      "Ukupni socijalni doprinosi zaposlenog iznose oko 20-21% brutto plate (2026).",
      "Lohnsteuerklasse utiče na visinu poreza – klase I-VI.",
      "Obračun može biti u papirnom ili elektronskom obliku."
    ],
    examples: [
      "Aida zarađuje 3.000€ brutto. Nakon poreza (~Steuerklasse I: ~370€) i socijalnih doprinosa (~615€), njen neto je oko 2.015€.",
      "Emir primijeti da mu nedostaje Zuschlag za noćni rad na obračunu – ima pravo tražiti korekciju od poslodavca.",
      "Lejla je primila obračun koji ne prikazuje Kirchensteuer, ali je članica crkve – trebala bi to prijaviti kako bi izbjegla naknadnu naplatu."
    ],
    warnings: [
      "Uvijek provjeri da li se brutto iznos poklapa sa ugovorom.",
      "Provjeri da li su svi dodatci (noćni rad, prekovremeni) ispravno obračunati.",
      "Zadrži sve obračune – trebat će ti za Steuererklärung i kao dokaz za socijalna davanja."
    ],
    myths: [
      "MIT: 'Poslodavac ne mora davati obračun.' – ČINJENICA: Zakonska obaveza prema § 108 GewO.",
      "MIT: 'Neto plata je ista za sve sa istom brutto platom.' – ČINJENICA: Ovisi o Steuerklasse, Kirchensteuer, djeci itd.",
      "MIT: 'Socijalni doprinosi su isti u svim firmama.' – ČINJENICA: Stopa zdravstvenog osiguranja varira po osiguravajućem zavodu (Krankenkasse)."
    ],
    sources: ["Gewerbeordnung (GewO) § 108", "BMAS – Lohnabrechnung", "Bundesagentur für Arbeit"],
    lastUpdated: "2026-01-15"
  },
  {
    slug: "zuschlaege",
    title: "Dodaci na platu",
    germanTerm: "Zuschläge und Zulagen",
    categoryId: "plata",
    explanation: "Zuschläge su dodatci na platu za rad u posebnim uslovima (noćni rad, nedjelje, praznici). Zakonom je propisana obaveza samo za noćni rad (§ 6 Abs. 5 ArbZG). Ostali dodaci (vikend, praznik) zavise od ugovora ili Tarifvertraga. Zuschläge za noćni, nedeljni i praznični rad mogu biti oslobođeni poreza do određenih granica prema § 3b EStG.",
    rules: [
      "Noćni rad (23-06h): Zakonska obaveza Zuschlag ili zamjenski slobodni dani (§ 6 Abs. 5 ArbZG). Uobičajeno 25-30% dodatak.",
      "Nedeljni rad: Nema zakonske obaveze za Zuschlag osim ako Tarifvertrag ili ugovor to predviđa.",
      "Praznični rad: Isto kao nedeljni – ovisi o ugovoru/Tarifvertrag-u.",
      "Porezno oslobođenje (§ 3b EStG): noćni rad do 25%, nedjelje do 50%, praznici do 125-150% su oslobođeni poreza i socijalnih doprinosa (do osnovice od 50€/sat).",
      "Schichtzulage, Gefahrenzulage i slični dodaci su ugovorni, ne zakonski."
    ],
    examples: [
      "Jasmin radi noćne smjene u fabrici. Njegov Tarifvertrag predviđa 30% Nachtzuschlag. Prvih 25% je oslobođeno poreza.",
      "Naida radi u trgovini nedjeljom. Njezin ugovor predviđa 50% Zuschlag za nedjelje – taj Zuschlag je u potpunosti oslobođen poreza.",
      "Alen radi na Božić (zakonski praznik). Sa 150% Zuschlagom na osnovnu platu od 20€/sat, oslobođeno poreza."
    ],
    warnings: [
      "Ako radiš noćni rad bez Zuschlag-a, imaš zakonsko pravo na kompenzaciju – poslodavac mora platiti dodatak ILI dati slobodne dane.",
      "Provjeri Tarifvertrag za tvoju branšu – mnogi predviđaju veće Zuschläge od zakonskog minimuma.",
      "Evidentiraj tačno svoje radne sate i smjene za slučaj spora."
    ],
    myths: [
      "MIT: 'Rad nedjeljom mora biti plaćen duplo.' – ČINJENICA: Nema zakonske obaveze za duplu platu – ovisi o ugovoru.",
      "MIT: 'Svi Zuschläge su oslobođeni poreza.' – ČINJENICA: Samo noćni, nedjeljni i praznični do propisanih granica.",
      "MIT: 'Poslodavac odlučuje hoće li platiti Zuschlag ili ne.' – ČINJENICA: Za noćni rad postoji ZAKONSKA obaveza."
    ],
    sources: ["Arbeitszeitgesetz (ArbZG) § 6 Abs. 5", "Einkommensteuergesetz (EStG) § 3b", "BAG sudska praksa o Nachtzuschlag"],
    lastUpdated: "2026-01-15"
  },
  {
    slug: "kasnjenje-plate",
    title: "Kašnjenje ili neisplata plate",
    germanTerm: "Lohnverzug / Lohnrückstand",
    categoryId: "plata",
    explanation: "Ako poslodavac ne isplati platu na ugovoreni datum, automatski pada u zakašnjenje (Verzug) prema § 286 BGB. Zaposleni ima pravo na zateznu kamatu, a u ozbiljnim slučajevima i na obustavu rada (Zurückbehaltungsrecht) ili vanredni otkaz.",
    rules: [
      "Plata dospijeva na ugovoreni datum – ako nije naveden, na kraju mjeseca (§ 614 BGB).",
      "U slučaju kašnjenja, poslodavac duguje zateznu kamatu od 5 procentnih poena iznad bazne kamatne stope (§ 288 BGB).",
      "Zaposleni ima pravo odbiti rad (Zurückbehaltungsrecht) ako poslodavac kasni sa 2+ mjesečnim platama.",
      "U slučaju neisplate, zaposleni može podnijeti tužbu pred Arbeitsgericht – u prvom stepenu svaka strana snosi svoje troškove.",
      "Rok zastare za potraživanja plate: 3 godine (§ 195 BGB), ali pazi na Ausschlussfristen u ugovoru (često 3 mjeseca)!"
    ],
    examples: [
      "Eldin nije primio platu za januar do 15. februara. Poslodavac je u zakašnjenju i Eldin može slati Mahnung (opomenu).",
      "Amra nije primila platu 2 mjeseca. Ima pravo obavijestiti poslodavca da neće raditi dok ne primi zaostale plate (Zurückbehaltungsrecht).",
      "Dženan je tužio poslodavca pred Arbeitsgericht za 3 mjeseca neisplaćene plate – sud je presudio u njegovu korist, plus zatezna kamata."
    ],
    warnings: [
      "PAZI NA AUSSCHLUSSFRISTEN: Ako tvoj ugovor predviđa 3-mjesečni rok za potraživanja, moraš pisano tražiti platu u tom roku – inače gubis pravo!",
      "Prije odbijanja rada (Zurückbehaltungsrecht), obavezno pošalji pisanu opomenu s rokom.",
      "Documentiraj SVE: e-mailove, obračune, datume isplate."
    ],
    myths: [
      "MIT: 'Ako kasni jedan dan, odmah možeš tužiti.' – ČINJENICA: Poslodavac je u Verzug-u, ali tužba obično slijedi nakon opomene i razumnog roka.",
      "MIT: 'Arbeitsgericht je skup.' – ČINJENICA: U prvom stepenu svaka strana snosi svoje troškove, nema naknade troškova advokatu protivne strane.",
      "MIT: 'Nemaš šta poduzeti osim čekati.' – ČINJENICA: Imaš pravo na Zurückbehaltungsrecht, tužbu i eventualno fristlose Kündigung."
    ],
    sources: ["BGB §§ 286, 288, 614", "BGB § 195 – Verjährung", "Arbeitsgerichtsgesetz (ArbGG)"],
    lastUpdated: "2026-01-15"
  },
  {
    slug: "odbici-sa-plate",
    title: "Odbici sa plate",
    germanTerm: "Lohnabzüge / Pfändung",
    categoryId: "plata",
    explanation: "Poslodavac smije odbijati od plate samo zakonom propisane iznose (poreze, socijalne doprinose) te iznose na koje je zaposleni dao saglasnost ili koji su sudski naloženi (Lohnpfändung). Postoji zaštićeni minimum plate koji ne može biti zaplijenjen.",
    rules: [
      "Obavezni odbici: Lohnsteuer, Solidaritätszuschlag, Kirchensteuer, zdravstveno/penziono/osiguranje za nezaposlenost/njegu.",
      "Dobrovoljni odbici: Samo uz pisanu saglasnost zaposlenog (npr. Altersvorsorge, Jobticket).",
      "Lohnpfändung (sudska zapljena): Moguća samo na osnovu sudske odluke. Postoji Pfändungsfreigrenze – zaštićeni minimum.",
      "Pfändungsfreigrenze 2026: oko 1.491€ neto za osobu bez obaveza uzdržavanja (povišava se za svaku izdržavanu osobu).",
      "Poslodavac NE smije samovoljno odbijati od plate (npr. za štetu) bez saglasnosti ili sudske odluke."
    ],
    examples: [
      "Senad ima dugove i dobio je Pfändungsbeschluss. Njegov poslodavac smije zaplijeniti dio plate, ali Senad zadržava minimalno ~1.491€ neto.",
      "Lejla je slučajno oštetila mašinu na poslu. Poslodavac ne smije jednostrano odbiti popravku od njene plate bez njene saglasnosti ili sudske odluke.",
      "Kemal je pristao da mu se odbija 50€ mjesečno za firmensku penziju (betriebliche Altersvorsorge) – to je dozvoljeno jer je dao pisanu saglasnost."
    ],
    warnings: [
      "Ako poslodavac samovoljno odbija od plate, odmah pošalji pisani prigovor.",
      "Provjeri svaki obračun za neovlaštene odbitke.",
      "Pfändungsfreigrenze se redovno ažurira – informiši se o aktuelnom iznosu."
    ],
    myths: [
      "MIT: 'Poslodavac može odbiti od plate za svaku grešku.' – ČINJENICA: Samo uz saglasnost ili sudsku odluku.",
      "MIT: 'Cijela plata može biti zaplijenjena.' – ČINJENICA: Postoji zaštićeni minimum (Pfändungsfreigrenze).",
      "MIT: 'Ako potpišeš ugovor sa klauzulom o odbicima, ništa ne možeš.' – ČINJENICA: Nereasonable klauzule mogu biti pravno nevažeće."
    ],
    sources: ["ZPO §§ 850-850k – Pfändungsschutz", "GewO § 108", "BGB § 394"],
    lastUpdated: "2026-01-15"
  },
  {
    slug: "bonusi",
    title: "Bonusi, provizije i dodatne isplate",
    germanTerm: "Bonus / Provision / Sonderzahlungen",
    categoryId: "plata",
    explanation: "Bonus, Weihnachtsgeld, Urlaubsgeld i provizije su dodatne isplate koje zavise od ugovora, Tarifvertraga ili praksa u firmi (betriebliche Übung). Nema zakonske obaveze za bonus osim ako je ugovorno ili kolektivno dogovorena.",
    rules: [
      "Nema zakonske obaveze za Weihnachtsgeld, Urlaubsgeld ili bonus.",
      "Ako je bonus predviđen ugovorom ili Tarifvertragom, poslodavac ga MORA isplatiti.",
      "Betriebliche Übung: Ako poslodavac 3+ godine redovno isplaćuje bonus bez ograđivanja, nastaje pravno potraživanje.",
      "Freiwilligkeitsvorbehalt: Poslodavac može zadržati pravo da bonus isplaćuje dobrovoljno – time sprječava betriebliche Übung.",
      "Rückzahlungsklausel (klauzula o povratu): Moguća za bonus, ali sa ograničenjima prema sudskoj praksi BAG-a."
    ],
    examples: [
      "Firma isplaćuje Weihnachtsgeld od 2020. do 2024. bez Freiwilligkeitsvorbehalt. Od 2025. zaposleni mogu tražiti isplatu jer je nastala betriebliche Übung.",
      "Adna ima ugovoreni prodajni bonus od 5% na ostvaren promet – poslodavac to mora isplatiti.",
      "Sanel je dobio otkaz u martu, a ugovor predviđa povrat Weihnachtsgeld-a ako ode prije 31.03. – klauzula je validna samo uz razumne uslove."
    ],
    warnings: [
      "Pročitaj da li tvoj ugovor sadrži Freiwilligkeitsvorbehalt ili Widerrufsvorbehalt za bonus.",
      "Rückzahlungsklausel: BAG smatra nerazumnim rok povrata duži od 12 mjeseci za bonus do jedne mjesečne plate.",
      "Ako planiraš dati otkaz, provjeri da li postoji obaveza povrata bonusa."
    ],
    myths: [
      "MIT: 'Svaka firma mora platiti 13. platu.' – ČINJENICA: Nema zakonske obaveze – ovisi o ugovoru.",
      "MIT: 'Bonus je uvijek diskreciono pravo šefa.' – ČINJENICA: Ugovoreni ili ustaljeni bonus stvara pravno potraživanje.",
      "MIT: 'Ako dam otkaz, moram vratiti sav bonus.' – ČINJENICA: Rückzahlungsklausel ima stroga zakonska ograničenja."
    ],
    sources: ["BAG – Betriebliche Übung sudska praksa", "BGB §§ 611a, 307", "Tarifvertragsgesetz (TVG)"],
    lastUpdated: "2026-01-15"
  },

  // ─── RADNO VRIJEME ───
  {
    slug: "radno-vrijeme",
    title: "Radno vrijeme i zakonske pauze",
    germanTerm: "Arbeitszeit und Pausen",
    categoryId: "radno-vrijeme",
    explanation: "Radno vrijeme u Njemačkoj reguliše Arbeitszeitgesetz (ArbZG). Maksimalno dnevno radno vrijeme je 8 sati (može se produžiti do 10h uz kompenzaciju). Zakonske pauze su obavezne. Od odluke BAG-a iz 2022. i presude ECJ, poslodavci su dužni sistematski evidentirati radno vrijeme.",
    rules: [
      "Maksimalno dnevno radno vrijeme: 8 sati (§ 3 ArbZG).",
      "Produženje do 10 sati dnevno moguće ako se prosječno ne prekoračuje 8h unutar 6 mjeseci/24 sedmice.",
      "Pauze: 30 minuta za 6-9h rada, 45 minuta za >9h rada (§ 4 ArbZG).",
      "Minimalni odmor između dva radna dana: 11 sati neprekidno (§ 5 ArbZG).",
      "Nedjelja i zakonski praznici su u pravilu neradni (§ 9 ArbZG) – izuzeci za određene branše.",
      "Evidencija radnog vremena: Obaveza poslodavca od presude BAG 13.09.2022 (1 ABR 22/21)."
    ],
    examples: [
      "Admir radi od 8:00 do 16:30 sa 30 minuta pauze – ukupno 8h rada, potpuno zakonito.",
      "Selma radi 10h ponedjeljak-četvrtak i 6h petkom – prosječno 9,2h/dan, zakonito jer ne prelazi prosjek od 8h u 6 mjeseci.",
      "Emir radiodobije samo 15 minuta pauze na 8h rada – to je kršenje ArbZG i treba to prijaviti."
    ],
    warnings: [
      "Pauze NISU dio radnog vremena – ne plaćaju se osim ako ugovor drugačije predviđa.",
      "Ako redovno radaš >10h dnevno, to je kršenje zakona – informiši se o pravima.",
      "Čuvaj evidenciju svog radnog vremena za slučaj spora."
    ],
    myths: [
      "MIT: 'U Njemačkoj se radi striktno 8 sati.' – ČINJENICA: Moguće do 10h dnevno uz kompenzaciju.",
      "MIT: 'Pauza je stvar dogovora.' – ČINJENICA: Zakonski propisana, ne može se 'preskočiti' po dogovoru.",
      "MIT: 'Šef odlučuje koliko radim.' – ČINJENICA: ArbZG postavlja maksimume koje ni poslodavac ni zaposleni ne mogu prekoračiti."
    ],
    sources: ["Arbeitszeitgesetz (ArbZG) §§ 3, 4, 5, 9", "BAG presuda 13.09.2022 – 1 ABR 22/21", "EuGH C-55/18 (CCOO)"],
    lastUpdated: "2026-01-15"
  },
  {
    slug: "prekovremeni-sati",
    title: "Prekovremeni sati",
    germanTerm: "Überstunden",
    categoryId: "radno-vrijeme",
    explanation: "Prekovremeni rad (Überstunden) nastaje kada zaposleni radi duže od ugovorenog radnog vremena. Nema opće zakonske obaveze za prekovremeni rad – obaveza proizlazi iz ugovora, Tarifvertraga ili izvanrednih situacija. Kompenzacija može biti finansijska ili kroz slobodne dane.",
    rules: [
      "Poslodavac može naložiti prekovremeni rad samo ako je to predviđeno ugovorom ili Tarifvertragom.",
      "U hitnim slučajevima (Notfall), prekovremeni rad može se naložiti i bez ugovorne osnove.",
      "Ukupno radno vrijeme (redovno + prekovremeno) ne smije prekoračiti granice ArbZG (max. 10h/dan).",
      "Kompenzacija: Prema ugovoru – novčani dodatak ili Freizeitausgleich (slobodni dani).",
      "Klauzula 'Überstunden sind mit dem Gehalt abgegolten' (prekovremeni uključeni u platu): Prema BAG sudskoj praksi validna samo ako je jasno definisan obim (npr. max. 10% radnog vremena).",
      "Paušalna klauzula bez ograničenja je nevažeća."
    ],
    examples: [
      "Aldin ima u ugovoru klauzulu 'do 10 sati prekovremenog rada mjesečno uključeno u platu' – BAG smatra ovu klauzulu validnom jer je obim jasan.",
      "Merima nema ugovornu obavezu za prekovremeni rad, ali šef traži da radi vikendom – ona može odbiti.",
      "Damir je radio 200 sati prekovremeno bez kompenzacije. Mora dokazati tačne sate prema BAG pravilima (sekundarna dokazna obaveza poslodavca)."
    ],
    warnings: [
      "Evidentiraj SVE prekovremene sate – datum, početak, kraj, razlog.",
      "Ako tvoj ugovor kaže 'alle Überstunden abgegolten' bez ograničenja, ta klauzula je vjerovatno nevažeća.",
      "Teret dokaza za nalog prekovremenog rada leži na zaposlenom, ali poslodavac mora dostaviti evidenciju ako je vodi."
    ],
    myths: [
      "MIT: 'Šef može uvijek naložiti prekovremeni rad.' – ČINJENICA: Samo ako ugovor, Tarifvertrag ili Notfall to dozvoljavaju.",
      "MIT: 'Prekovremeni sati ne moraju biti plaćeni.' – ČINJENICA: Moraju biti kompenzirani – novčano ili slobodnim danima.",
      "MIT: 'Ako ne prijavim odmah, gubim pravo.' – ČINJENICA: Opći rok zastare je 3 godine, ali pazi na Ausschlussfristen."
    ],
    sources: ["ArbZG §§ 3, 14", "BAG – sudska praksa o Überstundenpauschale", "BGB §§ 611a, 612"],
    lastUpdated: "2026-01-15"
  },
  {
    slug: "nocni-vikend-praznicni-rad",
    title: "Noćni, vikend i praznični rad",
    germanTerm: "Nacht- / Wochenend- / Feiertagsarbeit",
    categoryId: "radno-vrijeme",
    explanation: "Rad noću (20-06h), nedjeljom i na zakonske praznike podliježe posebnim pravilima ArbZG. Noćni radnici imaju pravo na zdravstvene preglede i kompenzaciju. Nedjeljni i praznični rad je načelno zabranjen s brojnim izuzecima za određene djelatnosti.",
    rules: [
      "Noćni rad (23-06h, za pekare od 22h): Radnici imaju pravo na Zuschlag ili kompenzaciju slobodnim danima (§ 6 ArbZG).",
      "Noćni radnici: Pravo na zdravstveni pregled na teret poslodavca svake 3 godine (svake godine za >50 god.).",
      "Nedjelja: Načelno neradni dan (§ 9 ArbZG). Izuzeci: zdravstvo, gastronomija, transport, policija, vatrogasci itd.",
      "Za svaku odrađenu nedjelju, zaposleni mora dobiti zamjenski slobodan dan u roku od 2 sedmice (§ 11 ArbZG).",
      "Minimalno 15 nedjelja godišnje moraju biti slobodne.",
      "Zakonski praznici (Feiertage): Regionalno različiti – obavezno provjeriti za svoju saveznu pokrajinu."
    ],
    examples: [
      "Sanela radi u bolnici i redovno radi nedjeljom. Mora dobiti zamjenski slobodan dan unutar 2 sedmice.",
      "Haris radi noćne smjene u logistici. Ima pravo na Nachtzuschlag i besplatan zdravstveni pregled svake 3 godine.",
      "Amina radi u prodavnici koja ima dozvolu za nedjelju – Verkaufsoffener Sonntag – ali mora dobiti kompenzacijski dan."
    ],
    warnings: [
      "Noćni rad dugoročno utiče na zdravlje – koristi pravo na besplatan pregled.",
      "Provjeri koliko zakonskih praznika ima tvoja savezna pokrajina (Bayern: 13, Berlin: 10).",
      "Ako redovno radiš nedjeljom bez zamjenskih slobodnih dana, to je kršenje zakona."
    ],
    myths: [
      "MIT: 'Noćni rad je uvijek zabranjen.' – ČINJENICA: Nije zabranjen, ali strogo regulisan.",
      "MIT: 'Rad na praznike mora biti plaćen duplo.' – ČINJENICA: Zakon ne propisuje duplu platu – to ovisi o ugovoru/Tarifvertrag-u.",
      "MIT: 'Imam pravo odbiti rad nedjeljom.' – ČINJENICA: Ako tvoj ugovor/branša dozvoljavaju nedjeljni rad, ne možeš ga uvijek odbiti."
    ],
    sources: ["ArbZG §§ 2, 6, 9, 10, 11", "SGB VII – Arbeitsschutz", "Länder-Feiertagsgesetze"],
    lastUpdated: "2026-01-15"
  },

  // ─── ODMOR I BOLOVANJE ───
  {
    slug: "godisnji-odmor",
    title: "Godišnji odmor",
    germanTerm: "Urlaubsanspruch / Erholungsurlaub",
    categoryId: "odmor-bolovanje",
    explanation: "Svaki zaposleni u Njemačkoj ima zakonsko pravo na plaćeni godišnji odmor prema Bundesurlaubsgesetz (BUrlG). Minimalni godišnji odmor je 20 radnih dana za 5-dnevnu radnu sedmicu (24 dana za 6-dnevnu). Mnogi ugovori i Tarifverträge predviđaju više.",
    rules: [
      "Zakonski minimum: 20 radnih dana godišnje (5-dnevna sedmica) ili 24 dana (6-dnevna) – § 3 BUrlG.",
      "Pravo na puni odmor nastaje nakon 6 mjeseci (Wartezeit) – § 4 BUrlG.",
      "Odmor se mora iskoristiti u tekućoj kalendarskoj godini. Prenos u narednu godinu moguć samo iz operativnih ili ličnih razloga – do 31. marta.",
      "Za vrijeme odmora, zaposleni prima punu platu (Urlaubsentgelt – prosjek zadnjih 13 sedmica).",
      "Bolest tokom odmora: Dani bolovanja se NE odbijaju od odmora ako je dostavljen ljekarski nalaz (§ 9 BUrlG).",
      "Neiskorišteni odmor se isplaćuje (Urlaubsabgeltung) samo pri prestanku radnog odnosa (§ 7 Abs. 4 BUrlG)."
    ],
    examples: [
      "Anela ima 30 dana odmora po Tarifvertrag-u i koristi 5 dana u januaru. Ostaje joj 25 dana za ostatak godine.",
      "Mirza se razbolio tokom odmora i dostavio ljekarski nalaz – tih 3 dana mu se vraćaju na konto odmora.",
      "Sanja daje otkaz i ima 10 neiskorištenih dana – poslodavac mora isplatiti Urlaubsabgeltung."
    ],
    warnings: [
      "Od presude BAG/ECJ (2018/2019), poslodavac je dužan upozoriti zaposlene da iskoriste odmor – inače odmor ne propada!",
      "Odmor za Minijob i Teilzeit: Isti broj DANA, ali manje sati po danu.",
      "Odmor ne može biti jednostrano određen od strane poslodavca – potreban dogovor (izuzetak: Betriebsurlaub)."
    ],
    myths: [
      "MIT: 'Neiskorišteni odmor automatski propada 31.12.' – ČINJENICA: Samo ako te je poslodavac na vrijeme upozorio (BAG/ECJ presuda).",
      "MIT: 'Teilzeit zaposleni imaju manje dana odmora.' – ČINJENICA: Isti broj dana, ali proporcionalno sati.",
      "MIT: 'Poslodavac može zabraniti odmor bez razloga.' – ČINJENICA: Može ga odgoditi samo iz hitnih operativnih razloga."
    ],
    sources: ["Bundesurlaubsgesetz (BUrlG) §§ 1-13", "BAG presuda 19.02.2019 – 9 AZR 541/15", "EuGH C-684/16 (Max-Planck)"],
    lastUpdated: "2026-01-15"
  },
  {
    slug: "bolovanje",
    title: "Bolovanje",
    germanTerm: "Krankschreibung / Entgeltfortzahlung",
    categoryId: "odmor-bolovanje",
    explanation: "U slučaju bolesti, zaposleni u Njemačkoj imaju pravo na nastavak isplate plate od strane poslodavca prvih 6 sedmica (Entgeltfortzahlung) prema Entgeltfortzahlungsgesetz (EFZG). Nakon toga, zdravstveno osiguranje isplaćuje Krankengeld.",
    rules: [
      "Entgeltfortzahlung: 100% plate prvih 6 sedmica bolovanja (§ 3 EFZG) – počinje od prvog dana bolesti.",
      "Pravo nastaje nakon 4 sedmice neprekidnog radnog odnosa (§ 3 Abs. 3 EFZG).",
      "Arbeitsunfähigkeitsbescheinigung (AU): Od 01.01.2023. elektronska (eAU) – ljekarski nalaz se automatski šalje poslodavcu i osiguravajućem.",
      "Ako bolovanje traje >6 sedmica za istu bolest, Krankenkasse preuzima i plaća Krankengeld (70% brutto, max. 90% netto).",
      "Krankengeld: Max. 78 sedmica za istu bolest u periodu od 3 godine.",
      "Obaveza javljanja: Zaposleni mora odmah obavijestiti poslodavca o bolesti i očekivanom trajanju.",
      "AU mora biti dostavljena najkasnije 4. radni dan bolesti (ili ranije ako ugovor to predviđa)."
    ],
    examples: [
      "Hana je bolesna 8 sedmica. Prvih 6 sedmica prima punu platu od poslodavca. Od 7. sedmice prima Krankengeld od Krankenkasse.",
      "Edin se razbolio u prvoj sedmici rada – nema pravo na Entgeltfortzahlung jer nije prošao 4-sedmični Wartefrist.",
      "Selma ima gripu, ozdravi nakon 5 dana, a dva mjeseca kasnije dobije istu dijagnozu – ako se radi o istoj bolesti, 6-sedmični rok se nastavlja, ne počinje ispočetka."
    ],
    warnings: [
      "Odmah javi bolest poslodavcu – telefonski ili e-mailom, PRVOG DANA.",
      "Čuvaj kopije svih AU dokumenata.",
      "Bolovanje NE štiti automatski od otkaza – ali otkaz tokom bolovanja podliježe strogim pravilima."
    ],
    myths: [
      "MIT: 'Za prva 3 dana ne treba AU.' – ČINJENICA: Zakonski tek od 4. dana, ali mnogi ugovori traže od prvog dana.",
      "MIT: 'Na bolovanju ne smijem napuštati kuću.' – ČINJENICA: Smiješ – sve što ne ometa oporavak je dozvoljeno.",
      "MIT: 'Poslodavac može provjeriti da li sam stvarno bolestan.' – ČINJENICA: Može zatražiti Medizinischen Dienst provjeru."
    ],
    sources: ["Entgeltfortzahlungsgesetz (EFZG) §§ 3-5", "SGB V §§ 44-51 – Krankengeld", "BMAS – Informationen Entgeltfortzahlung"],
    lastUpdated: "2026-01-15"
  },
  {
    slug: "bolovanje-djeteta",
    title: "Bolovanje djeteta",
    germanTerm: "Kind krank – Kinderkrankengeld",
    categoryId: "odmor-bolovanje",
    explanation: "Kada dijete mlađe od 12 godina (ili dijete s invaliditetom bez dobne granice) oboli, roditelj ima pravo na plaćeno odsustvo. Kinderkrankengeld isplaćuje Krankenkasse. Od 2024/2025. pravila su proširena.",
    rules: [
      "Kinderkrankentage 2025/2026: 15 dana po roditelju po djetetu godišnje (samohrani: 30 dana).",
      "Maksimalno 35 dana po roditelju ukupno za sva djeca (samohrani: 70 dana).",
      "Kinderkrankengeld: ~90% netto plate, isplaćuje Krankenkasse.",
      "Dijete mora biti mlađe od 12 godina (izuzetak: dijete s invaliditetom).",
      "Potrebna je AU za dijete od ljekara (Kinderkrankschreibung).",
      "Privatno osigurani: Nemaju pravo na Kinderkrankengeld – moraju koristiti ugovoreni odmor ili neplaćeno odsustvo."
    ],
    examples: [
      "Aida ima dvoje djece (3 i 7 god.) i oboje se razbole. Ima pravo na 15+15=30 Kinderkrankentage godišnje.",
      "Nermin je samohrani otac sa jednim djetetom – ima 30 dana Kinderkrankengeld godišnje.",
      "Lejla i muž mogu međusobno 'prebaciti' dane ako jedan od njih ima više potrebe."
    ],
    warnings: [
      "Odmah obavijesti poslodavca i dostavi AU za dijete.",
      "Kinderkrankentage su ODVOJENI od tvog ličnog bolovanja.",
      "Pravo važi samo ako je drugi roditelj također zaposlen ili ne može preuzeti brigu."
    ],
    myths: [
      "MIT: 'Kinderkrankentage se odbijaju od mog godišnjeg odmora.' – ČINJENICA: NE – to su posebni zakonski dani.",
      "MIT: 'Samo majke imaju pravo na Kind krank.' – ČINJENICA: Oba roditelja imaju jednako pravo.",
      "MIT: 'Poslodavac plaća Kinderkrankengeld.' – ČINJENICA: Isplaćuje Krankenkasse, ne poslodavac."
    ],
    sources: ["SGB V § 45 – Krankengeld bei Erkrankung des Kindes", "BMAS – Kinderkrankengeld 2025/2026", "BMG – Informationen Kinderkrankentage"],
    lastUpdated: "2026-01-15"
  },

  // ─── PORODICA ───
  {
    slug: "mutterschutz",
    title: "Zaštita trudnica na radu",
    germanTerm: "Mutterschutz",
    categoryId: "porodica",
    explanation: "Mutterschutzgesetz (MuSchG) štiti trudnice i mlade majke na radnom mjestu. Zaštita uključuje zabrane otkaza, zaštitne periode prije i nakon poroda, te posebna pravila o radnim uslovima.",
    rules: [
      "Zaštitni period: 6 sedmica prije očekivanog termina + 8 sedmica nakon poroda (12 sedmica za prijevremeni porod, višestruku trudnoću ili dijete s invaliditetom).",
      "Zabrana otkaza: Od početka trudnoće do 4 mjeseca nakon poroda (§ 17 MuSchG).",
      "Tokom Mutterschutz perioda: Mutterschaftsgeld od Krankenkasse (~13€/dan) + Arbeitgeberzuschuss (razlika do pune netto plate).",
      "Zabrana rada: Apsolutna zabrana 8 sedmica nakon poroda. 6 sedmica prije poroda – trudnica može dobrovoljno raditi.",
      "Posebni radni uslovi: Zabrana noćnog rada (20-06h), zabrana prekovremenog rada, zabrana rada nedjeljom/praznicima.",
      "Individualno radno ograničenje: Ljekar može izdati Beschäftigungsverbot za specifične rizike."
    ],
    examples: [
      "Amra je trudna i njen termin je 15. juna. Mutterschutz počinje 4. maja (6 sedmica prije). Ne mora raditi, ali može ako želi.",
      "Lejla je dobila otkaz u 3. mjesecu trudnoće – otkaz je nevažeći. Ima 2 sedmice da obavijesti poslodavca o trudnoći.",
      "Ljekar je izdao Beschäftigungsverbot za Sanelu jer njen posao uključuje dizanje teških predmeta – prima punu platu."
    ],
    warnings: [
      "Obavijesti poslodavca o trudnoći čim je moguće – zaštita od otkaza retroaktivno važi, ali samo ako u roku od 2 sedmice od saznanja za otkaz obavijesti.",
      "Beschäftigungsverbot ≠ Krankschreibung: Tokom Beschäftigungsverbot primaš PUNU platu.",
      "Mutterschutz važi i za Minijob, Teilzeit i befristete ugovore."
    ],
    myths: [
      "MIT: 'Mutterschutz važi samo za zaposlene na neodređeno.' – ČINJENICA: Važi za SVE zaposlene, uključujući Minijob i befristete.",
      "MIT: 'Trudnica ne može biti premještena na drugo radno mjesto.' – ČINJENICA: Poslodavac može (i mora) prilagoditi radno mjesto.",
      "MIT: 'Otkaz tokom trudnoće je validan ako nisam obavijestila poslodavca.' – ČINJENICA: Imaš 2 sedmice nakon otkaza da obavijesti – otkaz se poništava retroaktivno."
    ],
    sources: ["Mutterschutzgesetz (MuSchG)", "SGB V §§ 24c-24i – Mutterschaftsgeld", "BMAS – Leitfaden Mutterschutz"],
    lastUpdated: "2026-01-15"
  },
  {
    slug: "elternzeit",
    title: "Roditeljsko odsustvo",
    germanTerm: "Elternzeit",
    categoryId: "porodica",
    explanation: "Elternzeit je zakonsko pravo roditelja na neplaćeno odsustvo s posla radi brige o djetetu do 3. godine života (ili djelomično do 8. godine). Reguliše ga Bundeselterngeld- und Elternzeitgesetz (BEEG). Tokom Elternzeit moguće je primati Elterngeld.",
    rules: [
      "Pravo na Elternzeit: Svaki zaposleni roditelj – majka i otac jednako.",
      "Trajanje: Do 3 godine po djetetu. Do 24 mjeseca se može prenijeti između 3. i 8. godine djeteta.",
      "Prijava: Najkasnije 7 sedmica prije početka za Elternzeit do 3. godine; 13 sedmica za Elternzeit između 3-8 godina.",
      "Zaštita od otkaza: Od prijave (najranije 8 sedmica prije početka) do kraja Elternzeit (§ 18 BEEG).",
      "Teilzeit tokom Elternzeit: Dozvoljeno do 32h sedmično (od septembra 2021: povećano sa 30h).",
      "Oba roditelja mogu istovremeno biti na Elternzeit.",
      "Elterngeld: Basiselterngeld (65-67% netto, max. 1.800€/mj, 12+2 mjeseca) ili ElterngeldPlus (max. 900€/mj, duže trajanje)."
    ],
    examples: [
      "Nermin prijavljuje 12 mjeseci Elternzeit počevši od rođenja djeteta. Supruga uzima preostala 2 'Partnermonate'. Ukupno: 14 mjeseci Elterngeld.",
      "Amela želi raditi 25h sedmično tokom Elternzeit – to je dozvoljeno i može primati ElterngeldPlus.",
      "Edin prijavljuje 12 mjeseci Elternzeit za 2. dijete koje ima 5 godina – koristio je prebačene mjesece."
    ],
    warnings: [
      "Prijavi Elternzeit PISANO i u roku – 7 sedmica prije početka. Preporučuje se potvrda prijema.",
      "Plan za Elternzeit se teško može naknadno mijenjati bez saglasnosti poslodavca.",
      "Elterngeld se NE isplaćuje automatski – potrebno je posebno podnijeti zahtjev."
    ],
    myths: [
      "MIT: 'Samo majke imaju pravo na Elternzeit.' – ČINJENICA: Oba roditelja imaju jednako zakonsko pravo.",
      "MIT: 'Za vrijeme Elternzeit moram potpuno prestati raditi.' – ČINJENICA: Moguć rad do 32h sedmično.",
      "MIT: 'Elternzeit automatski produžava ugovor na određeno.' – ČINJENICA: NE – befristeter ugovor ističe na predviđeni datum bez obzira na Elternzeit."
    ],
    sources: ["BEEG – Bundeselterngeld- und Elternzeitgesetz", "BMAS – Elterngeld und Elternzeit", "Familienportal.de"],
    lastUpdated: "2026-01-15"
  },
  {
    slug: "pflegeurlaub",
    title: "Odsustvo za njegu člana porodice",
    germanTerm: "Pflegezeit / Familienpflegezeit",
    categoryId: "porodica",
    explanation: "Zaposleni u Njemačkoj imaju zakonsko pravo na odsustvo radi njege bliskih članova porodice. Pflegezeitgesetz (PflegeZG) i Familienpflegezeitgesetz (FPfZG) regulišu kratkoročno i dugoročno odsustvo.",
    rules: [
      "Kratkoročno odsustvo (§ 2 PflegeZG): Do 10 radnih dana za organiziranje njege u akutnom slučaju. Pravo na Pflegeunterstützungsgeld od Pflegekasse.",
      "Pflegezeit (§ 3 PflegeZG): Do 6 mjeseci potpuno ili djelomično odsustvo za njegu bliskog člana porodice. Firma sa >15 zaposlenih.",
      "Familienpflegezeit (FPfZG): Do 24 mjeseca sa minimalnim radnim vremenom od 15h sedmično. Firma sa >25 zaposlenih.",
      "Zaštita od otkaza tokom Pflegezeit/Familienpflegezeit.",
      "Bliski članovi porodice: Roditelji, supružnik/partner, djeca, djedovi/nane, unuci, braća/sestre, svekrva/tast.",
      "Mogućnost beskamatnog državnog zajma tokom Pflegezeit/Familienpflegezeit."
    ],
    examples: [
      "Adin je saznao da mu je majka iznenada postala teško bolesna. Ima pravo na 10 dana kratkoročnog odsustva odmah, bez prethodne prijave.",
      "Lejla želi 6 mjeseci njegovati oca sa demencijom – koristi pravo na Pflegezeit uz potpuno odsustvo s posla.",
      "Mirza kombinira Familienpflegezeit sa radom 20h sedmično i njegom supruge – ukupno do 24 mjeseca."
    ],
    warnings: [
      "Kratkoročno odsustvo (10 dana): Odmah obavijesti poslodavca i dostavi ljekarski nalaz o stanju člana porodice.",
      "Pflegezeit mora biti najavljena najmanje 10 radnih dana unaprijed.",
      "Familienpflegezeit: Najava 8 sedmica unaprijed. Pisani dogovor s poslodavcem o rasporedu."
    ],
    myths: [
      "MIT: 'Pflegezeit važi samo za roditelje.' – ČINJENICA: Važi za širok krug bliskih članova porodice.",
      "MIT: 'Tokom Pflegezeit ne primam nikakvu naknadu.' – ČINJENICA: Kratkoročno Pflegeunterstützungsgeld + mogućnost beskamatnog zajma.",
      "MIT: 'Male firme moraju odobriti Pflegezeit.' – ČINJENICA: Zakon pravi razliku po veličini firme (>15 za Pflegezeit, >25 za Familienpflegezeit)."
    ],
    sources: ["Pflegezeitgesetz (PflegeZG)", "Familienpflegezeitgesetz (FPfZG)", "BMAS – Vereinbarkeit von Pflege und Beruf"],
    lastUpdated: "2026-01-15"
  },

  // ─── OTKAZ ───
  {
    slug: "otkazni-rokovi",
    title: "Otkazni rokovi",
    germanTerm: "Kündigungsfristen",
    categoryId: "otkaz",
    explanation: "Otkazni rokovi u Njemačkoj su regulisani § 622 BGB i rastu sa dužinom radnog staža kod istog poslodavca. Ugovor ili Tarifvertrag mogu predvidjeti duže rokove, ali nikada kraće od zakonskog minimuma.",
    rules: [
      "Osnovni rok (§ 622 Abs. 1 BGB): 4 sedmice do 15. ili do kraja kalendarskog mjeseca.",
      "Za poslodavca raste sa stažom: 2 god. → 1 mjesec; 5 god. → 2 mj.; 8 god. → 3 mj.; 10 god. → 4 mj.; 12 god. → 5 mj.; 15 god. → 6 mj.; 20 god. → 7 mj.",
      "U probnom roku: 2 sedmice bez obaveze za kraj mjeseca.",
      "Tarifvertrag može predvidjeti kraće ili duže rokove.",
      "Ugovor može predvidjeti duže rokove, ali isti rok mora važiti za obje strane (ili duži za poslodavca).",
      "Otkaz mora biti u PISANOJ formi – e-mail, WhatsApp, SMS nisu dovoljni (§ 623 BGB)."
    ],
    examples: [
      "Merjem radi 6 godina u firmi. Otkazni rok za poslodavca je 2 mjeseca do kraja mjeseca. Za nju vrijedi osnovni rok od 4 sedmice osim ako ugovor ne predviđa duži.",
      "Adnan daje otkaz 10. januara sa osnovnim rokom od 4 sedmice – zadnji radni dan je 7. februar.",
      "Sanel prima otkaz putem WhatsApp poruke – otkaz je NEVAŽEĆI jer nije u pisanoj formi."
    ],
    warnings: [
      "Otkaz mora biti potpisan RUKOM i dostavljen u originalu.",
      "Rok počinje teći od dana kada otkaz STIGNE do druge strane, ne od dana slanja.",
      "Ako planiraš dati otkaz, izračunaj tačan datum odlaska i potvrdi sa poslodavcem."
    ],
    myths: [
      "MIT: 'Mogu dati otkaz od danas za sutra.' – ČINJENICA: Samo u probnom roku (2 sedmice) ili kod fristlose Kündigung.",
      "MIT: 'E-mail otkaz je validan.' – ČINJENICA: Zakon zahtijeva pisanu formu sa originalnim potpisom.",
      "MIT: 'Otkazni rok je uvijek mjesec dana.' – ČINJENICA: Ovisi o dužini staža i ugovoru."
    ],
    sources: ["BGB § 622 – Kündigungsfristen", "BGB § 623 – Schriftform", "BAG sudska praksa"],
    lastUpdated: "2026-01-15"
  },
  {
    slug: "otkaz-poslodavac",
    title: "Otkaz od strane poslodavca",
    germanTerm: "Arbeitgeberkündigung",
    categoryId: "otkaz",
    explanation: "Otkaz od strane poslodavca u Njemačkoj podliježe strogim pravilima Kündigungsschutzgesetz (KSchG) za firme sa >10 zaposlenih i radne odnose duže od 6 mjeseci. Otkaz mora biti socijalno opravdan.",
    rules: [
      "KSchG zaštita: Primjenjuje se na firme sa >10 zaposlenih i radni odnos >6 mjeseci.",
      "Tri razloga za otkaz: 1) Personenbedingt (lični razlozi – npr. dugotrajna bolest), 2) Verhaltensbedingt (ponašanje – npr. krađa, kršenje obaveza), 3) Betriebsbedingt (poslovni razlozi – restrukturiranje, ukidanje pozicije).",
      "Sozialauswahl kod betriebsbedingter Kündigung: Dužina staža, starost, obaveze uzdržavanja, invaliditet.",
      "Betriebsrat (radničko vijeće): Mora biti konsultirano PRIJE otkaza (§ 102 BetrVG) – inače otkaz nevažeći.",
      "Rok za tužbu: 3 sedmice od prijema otkaza pred Arbeitsgericht (§ 4 KSchG)!",
      "Posebna zaštita: Trudnice, teški invalidi (Schwerbehinderung), članovi Betriebsrat-a, zaposleni na Elternzeit."
    ],
    examples: [
      "Firma ukida odjel i daje otkaz Amiru (5 god. staža, 2 djece). Mora provjeriti Sozialauswahl – kolega bez djece sa 2 god. staža bi trebao biti prvi na listi.",
      "Adin kasni svaki dan na posao i dobio je 2 Abmahnung-a. Treća povreda može biti osnova za verhaltensbedingte Kündigung.",
      "Merjem prima otkaz – ima TAČNO 3 sedmice da podnese tužbu pred Arbeitsgericht. Ako propusti rok, otkaz postaje konačan!"
    ],
    warnings: [
      "NIKADA ne ignoriši otkaz – čak i ako misliš da je nepravedan. Rok od 3 sedmice je APSOLUTAN.",
      "Traži pravni savjet ODMAH – mnogi advokati nude besplatnu prvu konsultaciju.",
      "Provjeri da li imaš Rechtsschutzversicherung (pravno osiguranje) sa radnopravnom komponentom."
    ],
    myths: [
      "MIT: 'Na bolovanju ne mogu dobiti otkaz.' – ČINJENICA: Bolovanje NE štiti od otkaza – samo otežava personenbedingte Kündigung.",
      "MIT: 'Otkaz bez Abmahnung-a je uvijek nevažeći.' – ČINJENICA: Betriebsbedingte i neke personenbedingte otpuštanja ne zahtijevaju Abmahnung.",
      "MIT: 'Ako me otpuste, automatski dobijam otpremninu.' – ČINJENICA: Zakon ne propisuje otpremninu – ali je česta u poravnanjima."
    ],
    sources: ["Kündigungsschutzgesetz (KSchG)", "Betriebsverfassungsgesetz (BetrVG) § 102", "BGB § 623"],
    lastUpdated: "2026-01-15"
  },
  {
    slug: "otkaz-zaposleni",
    title: "Otkaz od strane zaposlenog",
    germanTerm: "Eigenkündigung",
    categoryId: "otkaz",
    explanation: "Zaposleni može dati otkaz u bilo kojem trenutku poštujući ugovoreni ili zakonski otkazni rok. Otkaz mora biti u pisanoj formi. Nema obaveze navođenja razloga. Pažnja: Eigenkündigung može izazvati Sperrzeit kod Agentur für Arbeit.",
    rules: [
      "Pisana forma obavezna (§ 623 BGB) – potpisan rukom, dostavljen u originalu.",
      "Nema obaveze navođenja razloga.",
      "Otkazni rok: Prema ugovoru ili zakonski minimum (§ 622 BGB).",
      "Ugovor može predvidjeti isti ili duži rok za zaposlenog kao za poslodavca.",
      "Otkaz je neopoziv nakon prijema – ne može se 'povući' bez saglasnosti poslodavca.",
      "Pažnja na Sperrzeit: Eigenkündigung bez 'wichtiger Grund' vodi u 12-sedmičnu blokadu Arbeitslosengeld-a."
    ],
    examples: [
      "Jasmin želi promijeniti posao. Daje otkaz 1. marta sa 4-sedmičnim rokom – zadnji radni dan je 28. mart.",
      "Selma je potpisala otkaz i predala ga šefu. Sutradan se predomislila – ali otkaz je već primljen i neopoziv.",
      "Haris daje otkaz jer ga šef konstantno maltretira (Mobbing). Uz dokumentaciju, može izbjeći Sperrzeit jer ima 'wichtiger Grund'."
    ],
    warnings: [
      "Prije otkaza: Prijavi se kod Agentur für Arbeit kao tražilac posla (Arbeitssuchendmeldung) najkasnije 3 mjeseca prije kraja radnog odnosa!",
      "Razmisli o Sperrzeit riziku – ako nemaš novi posao, gubis 12 sedmica ALG.",
      "Nikada ne daj otkaz u afektu – to je pravno neopoziv čin."
    ],
    myths: [
      "MIT: 'Mogu dati otkaz e-mailom.' – ČINJENICA: Samo pisano, sa originalnim potpisom.",
      "MIT: 'Mogu povući otkaz ako se predomislim.' – ČINJENICA: Samo uz saglasnost poslodavca.",
      "MIT: 'Ako dam otkaz, odmah gubim sva prava.' – ČINJENICA: Zadržavaš prava do kraja otkaznog roka (odmor, plata, etc.)."
    ],
    sources: ["BGB §§ 622, 623", "SGB III § 159 – Sperrzeit", "Bundesagentur für Arbeit – Arbeitssuchendmeldung"],
    lastUpdated: "2026-01-15"
  },
  {
    slug: "fristlose-kuendigung",
    title: "Vanredni otkaz",
    germanTerm: "Fristlose (außerordentliche) Kündigung",
    categoryId: "otkaz",
    explanation: "Fristlose Kündigung je otkaz bez otkaznog roka iz 'wichtigem Grund' (važnog razloga) prema § 626 BGB. Dopuštena je samo u izuzetno teškim slučajevima kada nastavak radnog odnosa do isteka otkaznog roka nije prihvatljiv.",
    rules: [
      "Mora postojati 'wichtiger Grund' – razlog toliko ozbiljan da je nastavak radnog odnosa nemoguć (§ 626 Abs. 1 BGB).",
      "Rok za davanje: 2 sedmice od saznanja za razlog (§ 626 Abs. 2 BGB).",
      "Primjeri opravdanih razloga: Krađa, nasilje, seksualno uznemiravanje, dugotrajno odbijanje rada, teška povreda povjerenja.",
      "Načelno: Potrebna je prethodna Abmahnung – izuzetak za teške povrede (npr. krađa).",
      "Zaposleni također može dati fristlose Kündigung: Npr. ako poslodavac ne plaća platu 2+ mjeseca, Mobbing, radni uslovi opasni po zdravlje.",
      "Ako Arbeitsgericht utvrdi da fristlose Kündigung nije bila opravdana, pretvara se u ordentliche Kündigung."
    ],
    examples: [
      "Mirza je uhvaćen kako krade iz kase – poslodavac može dati fristlose Kündigung bez prethodne Abmahnung.",
      "Lejla je fizički napadnuta od strane kolege, a poslodavac ne reaguje – Lejla može dati fristlose Kündigung i tražiti odmah izlazak.",
      "Amir koristi firmeni internet za privatne svrhe – nakon Abmahnung-a, ponovljena povreda može opravdati fristlose Kündigung."
    ],
    warnings: [
      "Rok od 2 sedmice je STROG – ako poslodavac kasni, gubi pravo na fristlose Kündigung.",
      "Uvijek provjeri da li je Abmahnung bila potrebna PRIJE fristlose Kündigung.",
      "Zaposleni: Ako daješ fristlose Kündigung, dokumentiraj razlog DETALJNO jer u slučaju spora moraš dokazati 'wichtiger Grund'."
    ],
    myths: [
      "MIT: 'Za krađu od 1€ ne mogu dobiti fristlose Kündigung.' – ČINJENICA: BAG je potvrdio da i mala krađa može opravdati fristlose Kündigung.",
      "MIT: 'Fristlose Kündigung znači odmah bez ičega.' – ČINJENICA: Imaš pravo na preostali odmor i obračun svih potraživanja.",
      "MIT: 'Zaposleni ne mogu dati fristlose Kündigung.' – ČINJENICA: Mogu – uz valjan razlog."
    ],
    sources: ["BGB § 626 – Fristlose Kündigung", "BAG – Emmely-Fall (2 AZR 541/09)", "KSchG § 13 – Umwandlung"],
    lastUpdated: "2026-01-15"
  },
  {
    slug: "abmahnung",
    title: "Opomena pred otkaz",
    germanTerm: "Abmahnung",
    categoryId: "otkaz",
    explanation: "Abmahnung je formalni pisani upozorenje poslodavca zaposlenom o kršenju ugovornih obaveza. Služi kao preduvjet za verhaltensbedingte Kündigung. Mora sadržavati konkretan opis povrede, upozorenje na posljedice i zahtjev za poboljšanje.",
    rules: [
      "Abmahnung mora sadržavati: 1) Konkretan opis ponašanja (datum, vrijeme, okolnosti), 2) Jasnu oznaku da se radi o kršenju ugovora, 3) Upozorenje da ponavljanje može voditi otkazu.",
      "Abmahnung nema zakonski propisanu formu – ali pisana je standard.",
      "Zaposleni ima pravo na Gegendarstellung (protivizjavu) koja se prilaže personalnom dosijeu.",
      "Zastarjevanje: Abmahnung gubi relevantnost nakon određenog vremena (obično 2-3 godine, ovisno o težini).",
      "Jedna Abmahnung je obično dovoljna za istu vrstu povrede.",
      "Abmahnung za nevažnu ili netačnu povredu može se pravno osporiti."
    ],
    examples: [
      "Edin je kasnio na posao 5. januara 30 minuta bez opravdanja. Abmahnung navodi tačan datum, trajanje kašnjenja i upozorenje.",
      "Amela je dobila Abmahnung zbog privatnog korištenja interneta. Podnosi Gegendarstellung jer firma nema jasnu politiku o korištenju interneta.",
      "Haris je dobio 3 Abmahnung-a za isti prekršaj u 2 godine – nakon četvrte povrede, poslodavac mu daje otkaz."
    ],
    warnings: [
      "Ne ignoriši Abmahnung – uvijek pisano reaguj sa Gegendarstellung.",
      "Provjeri da li Abmahnung sadrži SVA 3 obavezna elementa – nepotpuna Abmahnung je nevažeća.",
      "Zadrži kopiju svake Abmahnung i svoje Gegendarstellung."
    ],
    myths: [
      "MIT: 'Trebaju 3 Abmahnung-a prije otkaza.' – ČINJENICA: Jedna je dovoljna za istu vrstu povrede.",
      "MIT: 'Abmahnung ostaje zauvijek u dosijeu.' – ČINJENICA: Nakon 2-3 godine gubi relevantnost.",
      "MIT: 'Ako potpišem prijem, priznao sam krivicu.' – ČINJENICA: Potpis potvrđuje PRIJEM, ne sadržaj. Dodaj Gegendarstellung."
    ],
    sources: ["BAG sudska praksa o Abmahnung", "BGB § 314 Abs. 2", "BetrVG § 83 – Recht auf Einsicht"],
    lastUpdated: "2026-01-15"
  },
  {
    slug: "aufhebungsvertrag",
    title: "Sporazumni raskid ugovora",
    germanTerm: "Aufhebungsvertrag",
    categoryId: "otkaz",
    explanation: "Aufhebungsvertrag je sporazum između poslodavca i zaposlenog o raskidu radnog odnosa. Za razliku od otkaza, zahtijeva saglasnost obje strane. Često uključuje otpremninu (Abfindung). PAŽNJA: Može izazvati Sperrzeit kod Agentur für Arbeit.",
    rules: [
      "Zahtijeva pisanu formu i potpis obje strane (§ 623 BGB).",
      "Nema zaštite od otkaza (KSchG) jer nije otkaz – obje strane dobrovoljno pristaju.",
      "Obično uključuje: Datum prestanka, Abfindung, Freistellung, radno uvjerenje.",
      "Abfindung: Nema zakonskog prava – ali uobičajena formula je 0,5 brutto mjesečnih plata po godini staža.",
      "Sperrzeit rizik: Ako zaposleni pristane na Aufhebungsvertrag bez važnog razloga, Agentur für Arbeit može nametnuti 12-sedmičnu blokadu.",
      "Pravo na razmišljanje: BAG preporučuje da zaposleni dobije najmanje 3 dana za razmišljanje (ali nije zakonski propisano)."
    ],
    examples: [
      "Firma nudi Saneli Aufhebungsvertrag sa 15.000€ Abfindung i Freistellung od 3 mjeseca. Sanela treba provjeriti Sperrzeit rizik.",
      "Damir dobrovoljno pristaje na Aufhebungsvertrag jer je već našao novi posao – u ovom slučaju Sperrzeit ne nastaje.",
      "Amra potpise Aufhebungsvertrag pod pritiskom istog dana – može ga osporiti jer nije imala dovoljno vremena za razmišljanje."
    ],
    warnings: [
      "NIKADA ne potpisuj Aufhebungsvertrag pod pritiskom ili odmah – traži vrijeme za razmišljanje i pravni savjet!",
      "Sperrzeit: Ako nemaš novi posao, Aufhebungsvertrag može koštati 12 sedmica ALG.",
      "Provjeri da li otpremnina kompenzira Sperrzeit gubitak.",
      "Konsultiraj advokat za radno pravo PRIJE potpisivanja."
    ],
    myths: [
      "MIT: 'Moram potpisati Aufhebungsvertrag ako ga šef ponudi.' – ČINJENICA: NE – to je DOBROVOLJNI sporazum.",
      "MIT: 'Aufhebungsvertrag je uvijek bolji od otkaza.' – ČINJENICA: Ne uvijek – Sperrzeit i gubitak KSchG zaštite su ozbiljni nedostaci.",
      "MIT: 'Otpremnina je obavezna.' – ČINJENICA: Nema zakonske obaveze – sve se pregovara."
    ],
    sources: ["BGB § 623", "SGB III § 159 – Sperrzeit", "BAG sudska praksa o Aufhebungsvertrag"],
    lastUpdated: "2026-01-15"
  },
  {
    slug: "sperrzeit",
    title: "Sperrzeit kod Agentur für Arbeit",
    germanTerm: "Sperrzeit beim Arbeitslosengeld",
    categoryId: "otkaz",
    explanation: "Sperrzeit je period tokom kojeg Agentur für Arbeit uskraćuje Arbeitslosengeld (ALG I) jer je zaposleni sam uzrokovao nezaposlenost. Traje obično 12 sedmica i može značajno smanjiti ukupno trajanje ALG I.",
    rules: [
      "Sperrzeit: Obično 12 sedmica (§ 159 SGB III).",
      "Uzroci: Eigenkündigung bez wichtiger Grund, Aufhebungsvertrag, fristlose Kündigung zbog ponašanja zaposlenog.",
      "Smanjenje ALG I: Sperrzeit smanjuje ukupno trajanje ALG I za četvrtinu.",
      "Wichtiger Grund za izbjegavanje Sperrzeita: Mobbing (dokumentirano), zdravstveni razlozi (ljekarsko mišljenje), preseljenje radi partnera, neisplata plate.",
      "Oblava: Arbeitssuchendmeldung najkasnije 3 mjeseca prije kraja radnog odnosa (ili odmah po saznanju).",
      "Sperrzeitdauer se može skratiti u pojedinim slučajevima – npr. 3 sedmice za nepravovremenu prijavu."
    ],
    examples: [
      "Nermin daje otkaz bez novog posla. Prijavljuje se na Arbeitslosengeld – Agentur nameće 12 sedmica Sperrzeit.",
      "Lejla potpisuje Aufhebungsvertrag jer joj prijeti betriebsbedingte Kündigung – sa ljekarskim nalazom o stresu može argumentirati wichtiger Grund.",
      "Amir zaboravlja se prijaviti kod Agentur als arbeitssuchend na vrijeme – dobija 1 sedmicu Sperrzeit za nepravovremenu prijavu."
    ],
    warnings: [
      "Prijavi se KOD AGENTUR als arbeitssuchend 3 MJESECA prije kraja radnog odnosa!",
      "Ako planiraš dati otkaz, razmisli o Sperrzeit – 12 sedmica bez prihoda je ozbiljan udarac.",
      "Documentiraj SVE razloge za otkaz – Agentur može tražiti dokaze za wichtiger Grund."
    ],
    myths: [
      "MIT: 'Sperrzeit znači da uopće ne dobijem ALG.' – ČINJENICA: Samo odgoda 12 sedmica + smanjenje ukupnog trajanja za 25%.",
      "MIT: 'Aufhebungsvertrag uvijek izaziva Sperrzeit.' – ČINJENICA: Ne ako postoji wichtiger Grund ili ako bi i bez toga uslijedio betriebsbedingter Otkaz.",
      "MIT: 'Nema načina da izbjegnem Sperrzeit.' – ČINJENICA: Uz dobru dokumentaciju i pravni savjet, moguće je."
    ],
    sources: ["SGB III §§ 159-159a – Sperrzeit", "Bundesagentur für Arbeit – Merkblatt Sperrzeit", "BSG sudska praksa"],
    lastUpdated: "2026-01-15"
  },

  // ─── POSEBNI OBLICI RADA ───
  {
    slug: "nebenjob-minijob-midijob",
    title: "Nebenjob, Minijob i Midijob",
    germanTerm: "Geringfügige Beschäftigung / Übergangsbereich",
    categoryId: "posebni-oblici",
    explanation: "Nebenjob je svaki posao uz glavni radni odnos. Minijob (do 603€/mj 2026) i Midijob (603,01-2.000€/mj) su posebni oblici zaposlenja sa povoljnijim pravilima za socijalne doprinose.",
    rules: [
      "Minijob 2026: Max. 603€ mjesečno. Zaposleni ne plaća socijalne doprinose (osim dobrovoljnog penzijskog). Poslodavac plaća paušalne doprinose.",
      "Midijob (Übergangsbereich) 2026: 603,01€ – 2.000€. Smanjeni doprinosi za zaposlenog, puni za poslodavca.",
      "Minijob uz hauptjob: Jedan Minijob uz puni posao je oslobođen doprinosa. Drugi Minijob se dodaje na glavni i podliježe punim doprinosima.",
      "Radno pravo: Minijobber imaju ISTA prava kao redovni zaposleni (odmor, Entgeltfortzahlung, zaštita od otkaza).",
      "Poslodavac mora prijaviti Minijob kod Minijob-Zentrale.",
      "Minijobber: Pravo na 4 sedmice plaćenog godišnjeg odmora, Entgeltfortzahlung pri bolesti, Mutterschutz."
    ],
    examples: [
      "Hana radi puni posao (3.500€) i dodatno čisti stan za 400€/mj kao Minijob. Minijob je oslobođen doprinosa.",
      "Edin radi dva Minijoba: jedan 350€, drugi 250€. Ako nema glavni posao, oba su Minijob. Ako ima hauptjob, drugi Minijob se dodaje na glavni.",
      "Selma radi Midijob za 1.200€/mj – plaća smanjene socijalne doprinose (~15% umjesto ~20%)."
    ],
    warnings: [
      "Ne prekorači 603€ granicu kod Minijoba – inače se automatski pretvara u sozialversicherungspflichtige Beschäftigung.",
      "Provjeri svoj ugovor za glavni posao – mnogi zahtijevaju odobrenje poslodavca za Nebenjob.",
      "Nebenjob ne smije biti u konkurenciji sa glavnim poslodavcem."
    ],
    myths: [
      "MIT: 'Minijobber nemaju pravo na odmor.' – ČINJENICA: Imaju ista prava kao svi zaposleni.",
      "MIT: 'Minijob se ne računa za penziju.' – ČINJENICA: Minijob se RAČUNA za penziju (uz mali doprinos zaposlenog od 3,6%).",
      "MIT: 'Mogu raditi koliko Minijoba hoću.' – ČINJENICA: Uz glavni posao, samo JEDAN Minijob je oslobođen doprinosa."
    ],
    sources: ["SGB IV § 8 – Geringfügige Beschäftigung", "SGB IV § 20 Abs. 2 – Übergangsbereich", "Minijob-Zentrale – Informationen 2026"],
    lastUpdated: "2026-01-15"
  },
  {
    slug: "werkstudent",
    title: "Studentski rad",
    germanTerm: "Werkstudent / Studentische Beschäftigung",
    categoryId: "posebni-oblici",
    explanation: "Werkstudent status omogućava studentima rad uz studij sa povoljnijim socijalnim doprinosima. Uvjet: Student mora biti upisan na Hochschule i rad ne smije prelaziti 20h sedmično tokom predavanja.",
    rules: [
      "Max. 20h sedmično tokom predavanja (Vorlesungszeit).",
      "Tokom Semesterferien: Moguć rad do 40h sedmično.",
      "Werkstudentenprivileg: Oslobođen od doprinosa za zdravstveno, njegu i osiguranje za nezaposlenost. Plaća samo penzijski doprinos.",
      "Nema ograničenja zarade (za razliku od Minijoba).",
      "Mora biti immatrikuliran na njemačkom Hochschule – Urlaubssemester obično ukida Werkstudent status.",
      "Kombinacija sa BAföG: Zarada iznad Freibetrag-a (od 2024: 556€/mj za studente) smanjuje BAföG."
    ],
    examples: [
      "Adin studira informatiku i radi 20h sedmično kao Werkstudent za 15€/sat – plaća samo penzijski doprinos (~9,3%).",
      "Merjem radi 40h sedmično tokom ljetnog raspusta – zadržava Werkstudent status jer je Semesterferien.",
      "Haris prekorači 20h granicu tokom predavanja – gubi Werkstudent privileg i plaća pune doprinose."
    ],
    warnings: [
      "STROGO poštuj 20h granicu tokom Vorlesungszeit – inače gubiš Werkstudent status.",
      "Provjeri uticaj zarade na BAföG i studentsko zdravstveno osiguranje (granica ~520€/mj za oslobođenje od doprinosa KV).",
      "Urlaubssemester obično ukida Werkstudent status – informiši se prije."
    ],
    myths: [
      "MIT: 'Werkstudent ne mora plaćati nikakve doprinose.' – ČINJENICA: Penzijski doprinos je obavezan.",
      "MIT: 'Mogu raditi koliko hoću tokom Semesterferien.' – ČINJENICA: Max. 40h i ne smije biti duže od 26 sedmica godišnje >20h.",
      "MIT: 'Werkstudent status je automatski.' – ČINJENICA: Poslodavac mora provjeriti uslove i ispravno prijaviti."
    ],
    sources: ["SGB V § 6 Abs. 1 Nr. 3 – Werkstudentenprivileg", "SGB IV § 8 i § 27 Abs. 4", "BMAS – Informationen studentische Beschäftigung"],
    lastUpdated: "2026-01-15"
  },
  {
    slug: "ausbildung",
    title: "Prava u Ausbildung-u",
    germanTerm: "Berufsausbildung – Rechte und Pflichten",
    categoryId: "posebni-oblici",
    explanation: "Duale Ausbildung (strukovno obrazovanje) u Njemačkoj kombinuje praktični rad u firmi sa teorijom u Berufsschule. Regulisana je Berufsbildungsgesetz (BBiG) i nudi specifična prava za Azubije.",
    rules: [
      "Ausbildungsvertrag mora biti pisani i sadržavati: trajanje, opis zanimanja, radno vrijeme, platu (Ausbildungsvergütung), odmor.",
      "Mindestausbildungsvergütung 2026: 1. godina ~682€/mj (raste godišnje).",
      "Probni rok: Obavezno 1-4 mjeseca (§ 20 BBiG).",
      "Radnovrijeme: Za maloljetne (<18): max. 8h/dan, 40h/sedmica, zabrana noćnog rada (JArbSchG).",
      "Odmor: Min. 25 dana za <16 god., 23 dana za <17, 21 dana za <18, zakonski minimum za >18.",
      "Prekovremeni rad: Mora biti kompenziran slobodnim vremenom ili plaćen.",
      "Berufsschule: Vrijeme u školi se računa kao radno vrijeme.",
      "Otkaz: Nakon probnog roka moguć samo iz 'wichtigem Grund' (obje strane) ili uz 4-sedmični rok od strane Azubija."
    ],
    examples: [
      "Lejla je Azubi u 2. godini i zarađuje 750€/mj. Ima pravo na min. 20 dana odmora (>18 god.) i kompenzaciju prekovremenog rada.",
      "Amir želi napustiti Ausbildung nakon probnog roka – može dati otkaz sa 4 sedmice roka.",
      "Firma šalje Naidu na Berufsschule 2 dana sedmično – tih 16h se računa kao radno vrijeme."
    ],
    warnings: [
      "Ausbildungsvertrag se MORA registrirati kod nadležne Kammer (IHK, HwK).",
      "Ako firma ne pruža adekvatnu obuku, Azubi može to prijaviti Kammer-u.",
      "Preuzimanje (Übernahme) nakon Ausbildung-a: Nema zakonskog prava, ali Tarifvertrag može predvidjeti."
    ],
    myths: [
      "MIT: 'Azubi je jeftina radna snaga.' – ČINJENICA: Azubi ima pravo na obuku, a zadaci moraju biti vezani za zanimanje.",
      "MIT: 'Firma može dati otkaz Azubiju kad želi.' – ČINJENICA: Nakon probnog roka samo iz wichtigem Grund.",
      "MIT: 'Ausbildungsvergütung je ista svugdje.' – ČINJENICA: Ovisi o branši, regionu i Tarifvertrag-u – ali ne smije biti ispod zakonskog minimuma."
    ],
    sources: ["Berufsbildungsgesetz (BBiG)", "Jugendarbeitsschutzgesetz (JArbSchG)", "BMBF – Mindestausbildungsvergütung"],
    lastUpdated: "2026-01-15"
  },
  {
    slug: "praktikum",
    title: "Praktikum i pripravništvo",
    germanTerm: "Praktikum",
    categoryId: "posebni-oblici",
    explanation: "Praktikum u Njemačkoj može biti obavezni (Pflichtpraktikum – propisano studijskim/školskim programom) ili dobrovoljni. Pravila se značajno razlikuju, posebno u pogledu Mindestlohn-a i socijalnih doprinosa.",
    rules: [
      "Pflichtpraktikum (obavezno): Nema prava na Mindestlohn, nema socijalnih doprinosa (ako je u okviru studija).",
      "Dobrovoljni praktikum do 3 mjeseca: Nema prava na Mindestlohn (orientierend/begleitend).",
      "Dobrovoljni praktikum >3 mjeseca: Puno pravo na Mindestlohn (13,90€/sat 2026).",
      "Praktikant ima pravo na pisani ugovor (Praktikumsvertrag) – od NachwG reforme 2022.",
      "Praktikant ima pravo na: Radno uvjerenje (Zeugnis), zaštitu na radu, pauze prema ArbZG.",
      "Scheinselbständigkeit/Scheinpraktikum: Ako praktikant obavlja redovne poslove zaposlenog, može tražiti status zaposlenog i punu platu."
    ],
    examples: [
      "Edin obavlja obavezni praktikum od 3 mjeseca u okviru studija – nema pravo na Mindestlohn.",
      "Amela radi dobrovoljni praktikum 4 mjeseca – od 1. dana ima pravo na min. 13,90€/sat.",
      "Firma koristi Mirzu kao 'praktikanta' ali on radi isti posao kao redovni zaposleni – može tražiti prequalification i punu platu retroaktivno."
    ],
    warnings: [
      "Provjeri da li je tvoj praktikum STVARNO Pflicht ili dobrovoljni – razlika je ogromna za tvoja prava.",
      "Ako obavljaš redovne poslove zaposlenog, nisi praktikant – zatraži prequalification.",
      "Uvijek traži pisani Praktikumsvertrag PRIJE početka."
    ],
    myths: [
      "MIT: 'Praktikum ne mora biti plaćen.' – ČINJENICA: Dobrovoljni praktikum >3 mjeseca MORA biti plaćen Mindestlohn.",
      "MIT: 'Praktikant nema nikakva prava.' – ČINJENICA: Ima pravo na zaštitu na radu, pauze, radno uvjerenje.",
      "MIT: 'Pflichtpraktikum može trajati neograničeno bez plate.' – ČINJENICA: Mora biti u okviru studijskog plana i razumnog trajanja."
    ],
    sources: ["Mindestlohngesetz (MiLoG) § 22", "Nachweisgesetz (NachwG)", "BBiG § 26 – Praktikanten"],
    lastUpdated: "2026-01-15"
  },

  // ─── ZAŠTITA ───
  {
    slug: "mobbing-diskriminacija",
    title: "Mobbing, diskriminacija i nezakoniti zahtjevi",
    germanTerm: "Mobbing / Diskriminierung / AGG",
    categoryId: "zastita",
    explanation: "Allgemeines Gleichbehandlungsgesetz (AGG) zabranjuje diskriminaciju na osnovu rase, etničkog porijekla, spola, religije, invaliditeta, starosti ili seksualne orijentacije. Mobbing (sistematsko zlostavljanje na radnom mjestu) nije eksplicitno regulisan jednim zakonom, ali je zaštićen kroz opću obavezu zaštite poslodavca (Fürsorgepflicht).",
    rules: [
      "AGG zabranjuje: Diskriminaciju pri zapošljavanju, na radnom mjestu, u uslovima rada, kod napredovanja i otkaza.",
      "Zaštićene kategorije: Rasa/etničko porijeklo, spol, religija/uvjerenja, invaliditet, starost, seksualna orijentacija.",
      "Poslodavac ima Fürsorgepflicht: Dužan je zaštititi zaposlene od Mobbinga i diskriminacije.",
      "Rok za tužbu prema AGG: 2 mjeseca od diskriminacijskog čina (§ 15 Abs. 4 AGG).",
      "Pravo na kompenzaciju: Materijalna i nematerijalna šteta prema AGG.",
      "Beschwerdestelle: Svaka firma mora imati kontaktnu tačku za prijave diskriminacije (§ 13 AGG).",
      "Mobbing: Ako poslodavac ne reaguje na prijavu, zaposleni ima pravo na Zurückbehaltungsrecht (odbijanje rada) i potencijalno fristlose Kündigung.",
      "Whistleblower zaštita: Hinweisgeberschutzgesetz (HinSchG) od 2023. štiti prijavitelje nepravilnosti."
    ],
    examples: [
      "Haris ne dobija unapređenje jer je iz BiH – to je diskriminacija po osnovu etničkog porijekla prema AGG.",
      "Kolega konstantno ismijava Lejlu zbog akcenta – sistematsko ponašanje koje predstavlja Mobbing.",
      "Poslodavac traži od Adina da radi bez zaštitne opreme – nezakonit zahtjev koji Adin ima pravo odbiti.",
      "Merjem je na razgovoru za posao pitana planira li trudnoću – nedozvoljeno pitanje prema AGG."
    ],
    warnings: [
      "DOKUMENTIRAJ SVE: Datum, vrijeme, svjedoci, opis incidenta. Vodi 'Mobbing-Tagebuch'.",
      "Rok od 2 mjeseca za AGG tužbu je KRATAK – reaguj brzo.",
      "Obrati se Betriebsrat-u, Beschwerdestelle ili eksternoj Antidiskriminierungsstelle des Bundes.",
      "Ako se situacija ne poboljša, konsultiraj advokata za radno pravo."
    ],
    myths: [
      "MIT: 'Mobbing je normalan dio posla.' – ČINJENICA: Poslodavac je ZAKONSKI dužan zaštititi zaposlene.",
      "MIT: 'Strancima je teže ostvariti zaštitu.' – ČINJENICA: AGG štiti SVE podjednako, bez obzira na nacionalnost.",
      "MIT: 'Moram trpjeti sve što šef traži.' – ČINJENICA: Nezakonite zahtjeve (opasne, diskriminatorne) smiješ i MORAŠ odbiti.",
      "MIT: 'Prijava Mobbinga će mi naškoditi.' – ČINJENICA: Hinweisgeberschutzgesetz štiti prijavitelje od odmazde."
    ],
    sources: ["Allgemeines Gleichbehandlungsgesetz (AGG)", "Hinweisgeberschutzgesetz (HinSchG)", "Antidiskriminierungsstelle des Bundes", "BAG sudska praksa o Mobbing"],
    lastUpdated: "2026-01-15"
  },
];

export function getGuideBySlug(slug: string): RadnoPravoGuide | undefined {
  return RADNO_PRAVO_GUIDES.find((g) => g.slug === slug);
}

export function getGuidesByCategory(categoryId: string): RadnoPravoGuide[] {
  return RADNO_PRAVO_GUIDES.filter((g) => g.categoryId === categoryId);
}
