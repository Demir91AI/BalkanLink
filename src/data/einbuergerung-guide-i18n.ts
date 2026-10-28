import type { StepData } from "@/components/guides/SmartGuideWizardShared";

/**
 * Naturalization (Einbürgerung) guide content in BS/HR/SR/DE.
 * Legal basis checked 28.10.2026 against StAG (gesetze-im-internet.de) and the
 * Federal Government notice on the abolition of the 3-year route (in force 30.10.2025).
 * All names and numbers in examples are fictional.
 */
export type EinbLocale = "bs" | "hr" | "sr" | "de";

export interface EinbGuideLocale {
  labels: { who: string; time: string; prepare: string; mistakes: string };
  header: {
    title: string; source: string; formName: string; whoCanApply: string;
    processingTime: string; requirements: string[]; commonMistakes: string[];
  };
  steps: StepData[];
}

const DE_FIELDS = [
  "Persönliche Angaben — Name, Geburtsdatum, Geburtsort, Staatsangehörigkeit",
  "Aufenthaltsstatus und Einreisedatum",
  "Aufenthaltsdauer — in der Regel 5 Jahre (§ 10 StAG)",
  "Sprachkenntnisse — Deutsch B1 (§ 10 Abs. 1 Nr. 6 StAG)",
  "Einbürgerungstest — Kenntnisse der Rechts- und Gesellschaftsordnung",
  "Lebensunterhalt — Sicherung ohne Leistungen nach SGB II/XII",
  "Bekenntnis zur freiheitlichen demokratischen Grundordnung",
  "Mehrstaatigkeit — bisherige Staatsangehörigkeit",
  "Erforderliche Unterlagen",
  "Antrag stellen — Einbürgerungsbehörde",
  "Gebühr — 255 € (§ 38 StAG)",
  "Aushändigung der Einbürgerungsurkunde",
];

type Raw = Omit<StepData, "deField">[];
const withDe = (raw: Raw): StepData[] => raw.map((s, i) => ({ deField: DE_FIELDS[i], ...s }));

const bs: EinbGuideLocale = {
  labels: { who: "Ko može podnijeti zahtjev", time: "Vrijeme obrade:", prepare: "Šta treba pripremiti", mistakes: "Najčešće greške" },
  header: {
    title: "Njemačko državljanstvo (Einbürgerung)",
    source: "StAG (aktuelna verzija) + nadležna Einbürgerungsbehörde",
    formName: "Antrag auf Einbürgerung (obrazac tvoje Einbürgerungsbehörde)",
    whoCanApply: "U pravilu stranci s najmanje 5 godina zakonitog i uobičajenog boravka u Njemačkoj (§ 10 StAG). Kraći rok samo u zakonom predviđenim slučajevima, npr. supružnici njemačkih državljana: u pravilu 3 godine boravka i 2 godine braka (§ 9 StAG). Ubrzani put nakon 3 godine ukinut je 30.10.2025. Od 27.06.2024. Njemačka ne traži odricanje od dosadašnjeg državljanstva — da li ga zadržavaš, odlučuje pravo tvoje zemlje porijekla. Ispunjenje uslova ne znači zagarantovan ishod; odlučuje nadležna ustanova.",
    processingTime: "Zavisi od nadležne Einbürgerungsbehörde — tačan rok javlja ustanova",
    requirements: [
      "U pravilu najmanje 5 godina zakonitog boravka (ubrzani put nakon 3 godine ukinut 30.10.2025.)",
      "Odgovarajući boravišni status (npr. Niederlassungserlaubnis ili drugi Aufenthaltstitel prema § 10 StAG)",
      "Izdržavanje bez Bürgergelda/Grundsicherungsgelda ili socijalne pomoći, osim zakonskih izuzetaka",
      "Njemački jezik najmanje B1 ili zakonom priznat dokaz (npr. njemačka školska diploma)",
      "Položen Einbürgerungstest ili zakonsko oslobađanje (npr. njemačka školska diploma)",
      "Bez relevantnih krivičnih osuda (bagatelne kazne prema § 12a StAG se u pravilu ne računaju)",
      "Izjava o priznavanju slobodnog demokratskog poretka",
      "Taksa 255 € po odrasloj osobi; 51 € za maloljetno dijete koje se naturalizira zajedno s roditeljem",
    ],
    commonMistakes: [
      "Oslanjati se na stari ubrzani put od 3 godine — ukinut je 30.10.2025.",
      "Odreći se državljanstva zemlje porijekla prije nego što provjeriš njena pravila",
      "Platiti test ili prevode prije nego što pitaš Einbürgerungsbehörde koje dokaze tačno traži",
    ],
  },
  steps: withDe([
    { bhsField: "Lični podaci", whatToWrite: "Prezime, ime, datum i mjesto rođenja i sadašnje državljanstvo, tačno kao u pasošu. Ako imaš drugo rođeno prezime (Geburtsname), navedi i njega.", whereToFind: "Pasoš, lična karta, izvod iz matične knjige rođenih (koje prevode ili ovjere traži tvoja ustanova, provjeri kod nje).", format: "Ime sa dijakritikama kao u pasošu (č, ć, š, đ, ž). Datum: DD.MM.GGGG.", commonMistake: "Pisati ime bez dijakritika ili drugačije nego u pasošu — neslaganja usporavaju obradu.", example: "Izmišljeno: Familienname: Kovač | Vorname: Maja | Geburtsdatum: 15.03.1990 | Geburtsort: Tuzla" },
    { bhsField: "Boravišni status i datum dolaska", whatToWrite: "Sadašnji Aufenthaltstitel i datum prvog dolaska radi zakonitog boravka.", whereToFind: "Kartica boravišne dozvole, Meldebescheinigung, stari pasoši.", format: "Naziv statusa tačno kao na kartici. Datum: DD.MM.GGGG.", commonMistake: "Računati i turističke boravke — računa se zakoniti uobičajeni boravak.", example: "Izmišljeno: Niederlassungserlaubnis seit 12.04.2023 | Einreise: 03.09.2019" },
    { bhsField: "Trajanje boravka — u pravilu 5 godina", whatToWrite: "Ukupno trajanje zakonitog uobičajenog boravka. Duže odsutnosti navedi iskreno; ustanova procjenjuje da li prekidaju boravak.", whereToFind: "Meldebescheinigungen, stare i sadašnje dozvole boravka.", format: "Godine i mjeseci, npr. „5 Jahre 7 Monate“.", commonMistake: "Oslanjati se na ukinuti put od 3 godine. Od 30.10.2025. pravilo je najmanje 5 godina; kraći rok samo u zakonskim izuzecima (npr. § 9 StAG za supružnike).", example: "Izmišljeno: seit 03.09.2019 rechtmäßiger gewöhnlicher Aufenthalt", note: "Ubrzana naturalizacija nakon 3 godine („besondere Integrationsleistungen“) ukinuta je 30.10.2025. Supružnici njemačkih državljana: u pravilu 3 godine boravka i 2 godine braka (§ 9 StAG)." },
    { bhsField: "Znanje njemačkog — najmanje B1", whatToWrite: "Naziv dokaza, nivo i datum (npr. certifikat B1).", whereToFind: "Originalni certifikat o jeziku ili njemačka školska/stručna diploma, ako ih ustanova priznaje kao dokaz.", format: "Naziv + nivo + datum.", commonMistake: "Priložiti potvrdu o pohađanju kursa umjesto ispitnog certifikata.", example: "Izmišljeno: Zertifikat Deutsch B1 — bestanden am 22.06.2025", note: "Koji dokazi zamjenjuju certifikat (npr. njemački školski završetak), potvrđuje tvoja Einbürgerungsbehörde. Za neke osobe zakon predviđa olakšice (§ 10 StAG)." },
    { bhsField: "Einbürgerungstest", whatToWrite: "Datum i rezultat testa ili razlog oslobađanja.", whereToFind: "Potvrda BAMF-a o rezultatu testa.", format: "Datum + potvrda.", commonMistake: "Platiti test bez provjere da li te njemačka školska diploma već oslobađa.", example: "Izmišljeno: Einbürgerungstest bestanden am 18.03.2025", note: "Oslobađanje je moguće npr. uz njemački školski završetak; da li tvoj dokument ispunjava uslov, provjeri kod ustanove." },
    { bhsField: "Izdržavanje", whatToWrite: "Izvor prihoda (posao, samostalna djelatnost, penzija) i da li primaš davanja prema SGB II/XII.", whereToFind: "Ugovor o radu, platne liste, porezno rješenje, rješenje o penziji.", format: "Kopije dokumenata koje ustanova traži.", commonMistake: "Pretpostaviti da svako davanje isključuje naturalizaciju — zakon ima izuzetke; odlučuje ustanova.", example: "Izmišljeno: unbefristete Vollzeitstelle seit 01.06.2022", note: "Primanje Bürgergelda/Grundsicherungsgelda ili socijalne pomoći u pravilu je prepreka, osim zakonskih izuzetaka (§ 10 Abs. 1 Nr. 3 StAG)." },
    { bhsField: "Izjava o demokratskom poretku", whatToWrite: "Pročitaj i vlastoručno potpiši izjavu iz obrasca.", whereToFind: "Dio zahtjeva ili poseban list tvoje ustanove.", format: "Mjesto, datum, potpis.", commonMistake: "Potpisati bez čitanja — izjava je pravno obavezujuća.", example: "Izmišljeno: Ort, Datum, Unterschrift", note: "Od 27.06.2024. StAG izričito traži i priznavanje posebne historijske odgovornosti Njemačke (§ 10 Abs. 1 Nr. 1a StAG)." },
    { bhsField: "Dosadašnje državljanstvo", whatToWrite: "Navedi sva državljanstva koja imaš. Njemačka od 27.06.2024. ne traži odricanje.", whereToFind: "Pasoši svih država čiji si državljanin.", format: "Prema obrascu tvoje ustanove.", commonMistake: "Misliti da njemački zakon odlučuje i o državljanstvu BiH ili druge zemlje — o tome odlučuje pravo te zemlje.", example: "Izmišljeno: Staatsangehörigkeit: bosnisch-herzegowinisch", note: "BiH: sticanje drugog državljanstva ne dovodi samo po sebi do gubitka BiH državljanstva, ali ponovno sticanje nakon ranijeg odricanja ima posebne uslove. Pogledaj stranicu „Dvojno državljanstvo“." },
    { bhsField: "Potrebni dokumenti", whatToWrite: "Napravi listu dokumenata koje traži tvoja ustanova.", whereToFind: "Spisak na stranici tvoje Einbürgerungsbehörde.", format: "Kopije uredno poredane prema spisku.", commonMistake: "Predati nepotpun zahtjev — ustanova traži dopunu i obrada se odgađa.", example: "Izmišljeno: 1) Pasoš 2) Izvod iz MKR 3) Aufenthaltstitel 4) Meldebescheinigung 5) B1 6) Test 7) Dokazi o prihodima", note: "Spisak se razlikuje po ustanovi — koristi njihov." },
    { bhsField: "Predaja zahtjeva", whatToWrite: "Predaj zahtjev nadležnoj Einbürgerungsbehörde na način koji ona nudi (lično, poštom ili online gdje postoji).", whereToFind: "Stranica tvog grada ili okruga.", format: "Sačuvaj potvrdu o predaji.", commonMistake: "Ne sačuvati dokaz o predaji ili broj predmeta.", example: "Izmišljeno: Eingangsbestätigung Nr. 2026/0000", note: "Rok obrade zavisi od ustanove; ne postoji zagarantovan rok." },
    { bhsField: "Taksa — 255 €", whatToWrite: "Uplati taksu prema uputi ustanove, s navedenim brojem predmeta.", whereToFind: "Poziv na uplatu tvoje ustanove.", format: "Tačna svrha uplate prema uputi.", commonMistake: "Uplatiti bez broja predmeta, pa se uplata ne može pripisati.", example: "Izmišljeno: Verwendungszweck: Einbürgerung M. Kovač AZ 0000", note: "Prema § 38 StAG: 255 € po osobi; 51 € za maloljetno dijete koje se naturalizira zajedno s roditeljem. Dodatni troškovi (test, prevodi) mogući su." },
    { bhsField: "Uručenje Einbürgerungsurkunde", whatToWrite: "Dođi na termin uručenja s ličnim dokumentom i pozivom.", whereToFind: "Poziv ustanove.", format: "Lični dolazak prema pozivu.", commonMistake: "Propustiti termin bez otkazivanja.", example: "Izmišljeno: Aushändigung am 14.10.2026", note: "Njemačko državljanstvo stičeš uručenjem isprave. Njemački pasoš ili ličnu kartu tražiš posebno. Šta to znači za tvoje dosadašnje državljanstvo, provjeri kod predstavništva svoje zemlje." },
  ]),
};

const hr: EinbGuideLocale = {
  labels: { who: "Tko može podnijeti zahtjev", time: "Vrijeme obrade:", prepare: "Što treba pripremiti", mistakes: "Najčešće pogreške" },
  header: {
    title: "Njemačko državljanstvo (Einbürgerung)",
    source: "StAG (važeća verzija) + nadležna Einbürgerungsbehörde",
    formName: "Antrag auf Einbürgerung (obrazac tvoje Einbürgerungsbehörde)",
    whoCanApply: "U pravilu stranci s najmanje 5 godina zakonitog i uobičajenog boravka u Njemačkoj (§ 10 StAG). Kraći rok samo u zakonom predviđenim slučajevima, npr. bračni drugovi njemačkih državljana: u pravilu 3 godine boravka i 2 godine braka (§ 9 StAG). Ubrzani put nakon 3 godine ukinut je 30. 10. 2025. Od 27. 6. 2024. Njemačka ne traži odricanje od dosadašnjeg državljanstva — zadržavaš li ga, odlučuje pravo tvoje zemlje podrijetla. Ispunjavanje uvjeta ne znači zajamčen ishod; odlučuje nadležno tijelo.",
    processingTime: "Ovisi o nadležnoj Einbürgerungsbehörde — točan rok javlja tijelo",
    requirements: [
      "U pravilu najmanje 5 godina zakonitog boravka (ubrzani put nakon 3 godine ukinut 30. 10. 2025.)",
      "Odgovarajući boravišni status (npr. Niederlassungserlaubnis ili drugi Aufenthaltstitel prema § 10 StAG)",
      "Uzdržavanje bez Bürgergelda/Grundsicherungsgelda ili socijalne pomoći, osim zakonskih iznimaka",
      "Njemački jezik najmanje B1 ili zakonom priznat dokaz (npr. njemačka školska svjedodžba)",
      "Položen Einbürgerungstest ili zakonsko oslobođenje (npr. njemačka školska svjedodžba)",
      "Bez relevantnih kaznenih osuda (bagatelne kazne prema § 12a StAG u pravilu se ne računaju)",
      "Izjava o priznavanju slobodnog demokratskog poretka",
      "Pristojba 255 € po odrasloj osobi; 51 € za maloljetno dijete koje se naturalizira zajedno s roditeljem",
    ],
    commonMistakes: [
      "Oslanjati se na stari ubrzani put od 3 godine — ukinut je 30. 10. 2025.",
      "Odreći se državljanstva zemlje podrijetla prije nego što provjeriš njezina pravila",
      "Platiti test ili prijevode prije nego što pitaš Einbürgerungsbehörde koje dokaze točno traži",
    ],
  },
  steps: withDe([
    { bhsField: "Osobni podaci", whatToWrite: "Prezime, ime, datum i mjesto rođenja te sadašnje državljanstvo, točno kao u putovnici. Ako imaš drugo rođeno prezime (Geburtsname), navedi i njega.", whereToFind: "Putovnica, osobna iskaznica, izvadak iz matice rođenih (koje prijevode ili ovjere traži tvoje tijelo, provjeri kod njega).", format: "Ime s dijakriticima kao u putovnici (č, ć, š, đ, ž). Datum: DD.MM.GGGG.", commonMistake: "Pisati ime bez dijakritika ili drukčije nego u putovnici — neslaganja usporavaju obradu.", example: "Izmišljeno: Familienname: Kovač | Vorname: Maja | Geburtsdatum: 15.03.1990 | Geburtsort: Tuzla" },
    { bhsField: "Boravišni status i datum dolaska", whatToWrite: "Sadašnji Aufenthaltstitel i datum prvog dolaska radi zakonitog boravka.", whereToFind: "Kartica boravišne dozvole, Meldebescheinigung, stare putovnice.", format: "Naziv statusa točno kao na kartici. Datum: DD.MM.GGGG.", commonMistake: "Računati i turističke boravke — računa se zakoniti uobičajeni boravak.", example: "Izmišljeno: Niederlassungserlaubnis seit 12.04.2023 | Einreise: 03.09.2019" },
    { bhsField: "Trajanje boravka — u pravilu 5 godina", whatToWrite: "Ukupno trajanje zakonitog uobičajenog boravka. Dulje odsutnosti navedi iskreno; tijelo procjenjuje prekidaju li boravak.", whereToFind: "Meldebescheinigungen, stare i sadašnje boravišne dozvole.", format: "Godine i mjeseci, npr. „5 Jahre 7 Monate”.", commonMistake: "Oslanjati se na ukinuti put od 3 godine. Od 30. 10. 2025. pravilo je najmanje 5 godina; kraći rok samo u zakonskim iznimkama (npr. § 9 StAG za bračne drugove).", example: "Izmišljeno: seit 03.09.2019 rechtmäßiger gewöhnlicher Aufenthalt", note: "Ubrzana naturalizacija nakon 3 godine („besondere Integrationsleistungen”) ukinuta je 30. 10. 2025. Bračni drugovi njemačkih državljana: u pravilu 3 godine boravka i 2 godine braka (§ 9 StAG)." },
    { bhsField: "Znanje njemačkoga — najmanje B1", whatToWrite: "Naziv dokaza, razina i datum (npr. certifikat B1).", whereToFind: "Izvorni certifikat o jeziku ili njemačka školska/stručna svjedodžba, ako ih tijelo priznaje kao dokaz.", format: "Naziv + razina + datum.", commonMistake: "Priložiti potvrdu o pohađanju tečaja umjesto ispitnog certifikata.", example: "Izmišljeno: Zertifikat Deutsch B1 — bestanden am 22.06.2025", note: "Koji dokazi zamjenjuju certifikat (npr. njemački školski završetak), potvrđuje tvoja Einbürgerungsbehörde. Za neke osobe zakon predviđa olakšice (§ 10 StAG)." },
    { bhsField: "Einbürgerungstest", whatToWrite: "Datum i rezultat testa ili razlog oslobođenja.", whereToFind: "Potvrda BAMF-a o rezultatu testa.", format: "Datum + potvrda.", commonMistake: "Platiti test bez provjere oslobađa li te već njemačka školska svjedodžba.", example: "Izmišljeno: Einbürgerungstest bestanden am 18.03.2025", note: "Oslobođenje je moguće npr. uz njemački školski završetak; ispunjava li tvoj dokument uvjet, provjeri kod tijela." },
    { bhsField: "Uzdržavanje", whatToWrite: "Izvor prihoda (posao, samostalna djelatnost, mirovina) i primaš li davanja prema SGB II/XII.", whereToFind: "Ugovor o radu, platne liste, porezno rješenje, rješenje o mirovini.", format: "Preslike dokumenata koje tijelo traži.", commonMistake: "Pretpostaviti da svako davanje isključuje naturalizaciju — zakon ima iznimke; odlučuje tijelo.", example: "Izmišljeno: unbefristete Vollzeitstelle seit 01.06.2022", note: "Primanje Bürgergelda/Grundsicherungsgelda ili socijalne pomoći u pravilu je prepreka, osim zakonskih iznimaka (§ 10 Abs. 1 Nr. 3 StAG)." },
    { bhsField: "Izjava o demokratskom poretku", whatToWrite: "Pročitaj i vlastoručno potpiši izjavu iz obrasca.", whereToFind: "Dio zahtjeva ili poseban list tvojeg tijela.", format: "Mjesto, datum, potpis.", commonMistake: "Potpisati bez čitanja — izjava je pravno obvezujuća.", example: "Izmišljeno: Ort, Datum, Unterschrift", note: "Od 27. 6. 2024. StAG izričito traži i priznavanje posebne povijesne odgovornosti Njemačke (§ 10 Abs. 1 Nr. 1a StAG)." },
    { bhsField: "Dosadašnje državljanstvo", whatToWrite: "Navedi sva državljanstva koja imaš. Njemačka od 27. 6. 2024. ne traži odricanje.", whereToFind: "Putovnice svih država čiji si državljanin.", format: "Prema obrascu tvojeg tijela.", commonMistake: "Misliti da njemački zakon odlučuje i o državljanstvu BiH ili druge zemlje — o tome odlučuje pravo te zemlje.", example: "Izmišljeno: Staatsangehörigkeit: bosnisch-herzegowinisch", note: "BiH: stjecanje drugog državljanstva ne dovodi samo po sebi do gubitka državljanstva BiH, ali ponovno stjecanje nakon ranijeg odricanja ima posebne uvjete. Pogledaj stranicu „Dvojno državljanstvo”." },
    { bhsField: "Potrebni dokumenti", whatToWrite: "Napravi popis dokumenata koje traži tvoje tijelo.", whereToFind: "Popis na stranici tvoje Einbürgerungsbehörde.", format: "Preslike uredno složene prema popisu.", commonMistake: "Predati nepotpun zahtjev — tijelo traži dopunu i obrada se odgađa.", example: "Izmišljeno: 1) Putovnica 2) Izvadak iz matice rođenih 3) Aufenthaltstitel 4) Meldebescheinigung 5) B1 6) Test 7) Dokazi o prihodima", note: "Popis se razlikuje po tijelu — koristi njihov." },
    { bhsField: "Predaja zahtjeva", whatToWrite: "Predaj zahtjev nadležnoj Einbürgerungsbehörde na način koji ona nudi (osobno, poštom ili online gdje postoji).", whereToFind: "Stranica tvojeg grada ili okruga.", format: "Sačuvaj potvrdu o predaji.", commonMistake: "Ne sačuvati dokaz o predaji ili broj predmeta.", example: "Izmišljeno: Eingangsbestätigung Nr. 2026/0000", note: "Rok obrade ovisi o tijelu; ne postoji zajamčen rok." },
    { bhsField: "Pristojba — 255 €", whatToWrite: "Uplati pristojbu prema uputi tijela, s navedenim brojem predmeta.", whereToFind: "Poziv na uplatu tvojeg tijela.", format: "Točna svrha uplate prema uputi.", commonMistake: "Uplatiti bez broja predmeta, pa se uplata ne može pripisati.", example: "Izmišljeno: Verwendungszweck: Einbürgerung M. Kovač AZ 0000", note: "Prema § 38 StAG: 255 € po osobi; 51 € za maloljetno dijete koje se naturalizira zajedno s roditeljem. Mogući su dodatni troškovi (test, prijevodi)." },
    { bhsField: "Uručenje Einbürgerungsurkunde", whatToWrite: "Dođi na termin uručenja s osobnom ispravom i pozivom.", whereToFind: "Poziv tijela.", format: "Osobni dolazak prema pozivu.", commonMistake: "Propustiti termin bez otkazivanja.", example: "Izmišljeno: Aushändigung am 14.10.2026", note: "Njemačko državljanstvo stječeš uručenjem isprave. Njemačku putovnicu ili osobnu iskaznicu tražiš zasebno. Što to znači za tvoje dosadašnje državljanstvo, provjeri kod predstavništva svoje zemlje." },
  ]),
};

const sr: EinbGuideLocale = {
  labels: { who: "Ko može da podnese zahtev", time: "Vreme obrade:", prepare: "Šta treba pripremiti", mistakes: "Najčešće greške" },
  header: {
    title: "Nemačko državljanstvo (Einbürgerung)",
    source: "StAG (aktuelna verzija) + nadležna Einbürgerungsbehörde",
    formName: "Antrag auf Einbürgerung (obrazac tvoje Einbürgerungsbehörde)",
    whoCanApply: "Po pravilu stranci sa najmanje 5 godina zakonitog i uobičajenog boravka u Nemačkoj (§ 10 StAG). Kraći rok samo u zakonom predviđenim slučajevima, npr. supružnici nemačkih državljana: po pravilu 3 godine boravka i 2 godine braka (§ 9 StAG). Ubrzani put nakon 3 godine ukinut je 30.10.2025. Od 27.06.2024. Nemačka ne traži odricanje od dosadašnjeg državljanstva — da li ga zadržavaš, odlučuje pravo tvoje zemlje porekla. Ispunjenje uslova ne znači zagarantovan ishod; odlučuje nadležni organ.",
    processingTime: "Zavisi od nadležne Einbürgerungsbehörde — tačan rok javlja organ",
    requirements: [
      "Po pravilu najmanje 5 godina zakonitog boravka (ubrzani put nakon 3 godine ukinut 30.10.2025.)",
      "Odgovarajući boravišni status (npr. Niederlassungserlaubnis ili drugi Aufenthaltstitel prema § 10 StAG)",
      "Izdržavanje bez Bürgergelda/Grundsicherungsgelda ili socijalne pomoći, osim zakonskih izuzetaka",
      "Nemački jezik najmanje B1 ili zakonom priznat dokaz (npr. nemačka školska diploma)",
      "Položen Einbürgerungstest ili zakonsko oslobađanje (npr. nemačka školska diploma)",
      "Bez relevantnih krivičnih osuda (bagatelne kazne prema § 12a StAG se po pravilu ne računaju)",
      "Izjava o priznavanju slobodnog demokratskog poretka",
      "Taksa 255 € po odrasloj osobi; 51 € za maloletno dete koje se naturalizuje zajedno sa roditeljem",
    ],
    commonMistakes: [
      "Oslanjati se na stari ubrzani put od 3 godine — ukinut je 30.10.2025.",
      "Odreći se državljanstva zemlje porekla pre nego što proveriš njena pravila",
      "Platiti test ili prevode pre nego što pitaš Einbürgerungsbehörde koje dokaze tačno traži",
    ],
  },
  steps: withDe([
    { bhsField: "Lični podaci", whatToWrite: "Prezime, ime, datum i mesto rođenja i sadašnje državljanstvo, tačno kao u pasošu. Ako imaš drugo rođeno prezime (Geburtsname), navedi i njega.", whereToFind: "Pasoš, lična karta, izvod iz matične knjige rođenih (koje prevode ili overe traži tvoj organ, proveri kod njega).", format: "Ime sa dijakriticima kao u pasošu (č, ć, š, đ, ž). Datum: DD.MM.GGGG.", commonMistake: "Pisati ime bez dijakritika ili drugačije nego u pasošu — neslaganja usporavaju obradu.", example: "Izmišljeno: Familienname: Kovač | Vorname: Maja | Geburtsdatum: 15.03.1990 | Geburtsort: Tuzla" },
    { bhsField: "Boravišni status i datum dolaska", whatToWrite: "Sadašnji Aufenthaltstitel i datum prvog dolaska radi zakonitog boravka.", whereToFind: "Kartica boravišne dozvole, Meldebescheinigung, stari pasoši.", format: "Naziv statusa tačno kao na kartici. Datum: DD.MM.GGGG.", commonMistake: "Računati i turističke boravke — računa se zakoniti uobičajeni boravak.", example: "Izmišljeno: Niederlassungserlaubnis seit 12.04.2023 | Einreise: 03.09.2019" },
    { bhsField: "Trajanje boravka — po pravilu 5 godina", whatToWrite: "Ukupno trajanje zakonitog uobičajenog boravka. Duža odsustva navedi iskreno; organ procenjuje da li prekidaju boravak.", whereToFind: "Meldebescheinigungen, stare i sadašnje boravišne dozvole.", format: "Godine i meseci, npr. „5 Jahre 7 Monate“.", commonMistake: "Oslanjati se na ukinuti put od 3 godine. Od 30.10.2025. pravilo je najmanje 5 godina; kraći rok samo u zakonskim izuzecima (npr. § 9 StAG za supružnike).", example: "Izmišljeno: seit 03.09.2019 rechtmäßiger gewöhnlicher Aufenthalt", note: "Ubrzana naturalizacija nakon 3 godine („besondere Integrationsleistungen“) ukinuta je 30.10.2025. Supružnici nemačkih državljana: po pravilu 3 godine boravka i 2 godine braka (§ 9 StAG)." },
    { bhsField: "Znanje nemačkog — najmanje B1", whatToWrite: "Naziv dokaza, nivo i datum (npr. sertifikat B1).", whereToFind: "Originalni sertifikat o jeziku ili nemačka školska/stručna diploma, ako ih organ priznaje kao dokaz.", format: "Naziv + nivo + datum.", commonMistake: "Priložiti potvrdu o pohađanju kursa umesto ispitnog sertifikata.", example: "Izmišljeno: Zertifikat Deutsch B1 — bestanden am 22.06.2025", note: "Koji dokazi zamenjuju sertifikat (npr. nemački školski završetak), potvrđuje tvoja Einbürgerungsbehörde. Za neke osobe zakon predviđa olakšice (§ 10 StAG)." },
    { bhsField: "Einbürgerungstest", whatToWrite: "Datum i rezultat testa ili razlog oslobađanja.", whereToFind: "Potvrda BAMF-a o rezultatu testa.", format: "Datum + potvrda.", commonMistake: "Platiti test bez provere da li te nemačka školska diploma već oslobađa.", example: "Izmišljeno: Einbürgerungstest bestanden am 18.03.2025", note: "Oslobađanje je moguće npr. uz nemački školski završetak; da li tvoj dokument ispunjava uslov, proveri kod organa." },
    { bhsField: "Izdržavanje", whatToWrite: "Izvor prihoda (posao, samostalna delatnost, penzija) i da li primaš davanja prema SGB II/XII.", whereToFind: "Ugovor o radu, platni listići, poresko rešenje, rešenje o penziji.", format: "Kopije dokumenata koje organ traži.", commonMistake: "Pretpostaviti da svako davanje isključuje naturalizaciju — zakon ima izuzetke; odlučuje organ.", example: "Izmišljeno: unbefristete Vollzeitstelle seit 01.06.2022", note: "Primanje Bürgergelda/Grundsicherungsgelda ili socijalne pomoći po pravilu je prepreka, osim zakonskih izuzetaka (§ 10 Abs. 1 Nr. 3 StAG)." },
    { bhsField: "Izjava o demokratskom poretku", whatToWrite: "Pročitaj i svojeručno potpiši izjavu iz obrasca.", whereToFind: "Deo zahteva ili poseban list tvog organa.", format: "Mesto, datum, potpis.", commonMistake: "Potpisati bez čitanja — izjava je pravno obavezujuća.", example: "Izmišljeno: Ort, Datum, Unterschrift", note: "Od 27.06.2024. StAG izričito traži i priznavanje posebne istorijske odgovornosti Nemačke (§ 10 Abs. 1 Nr. 1a StAG)." },
    { bhsField: "Dosadašnje državljanstvo", whatToWrite: "Navedi sva državljanstva koja imaš. Nemačka od 27.06.2024. ne traži odricanje.", whereToFind: "Pasoši svih država čiji si državljanin.", format: "Prema obrascu tvog organa.", commonMistake: "Misliti da nemački zakon odlučuje i o državljanstvu BiH ili druge zemlje — o tome odlučuje pravo te zemlje.", example: "Izmišljeno: Staatsangehörigkeit: bosnisch-herzegowinisch", note: "BiH: sticanje drugog državljanstva ne dovodi samo po sebi do gubitka državljanstva BiH, ali ponovno sticanje nakon ranijeg odricanja ima posebne uslove. Pogledaj stranicu „Dvojno državljanstvo“." },
    { bhsField: "Potrebni dokumenti", whatToWrite: "Napravi spisak dokumenata koje traži tvoj organ.", whereToFind: "Spisak na stranici tvoje Einbürgerungsbehörde.", format: "Kopije uredno poređane prema spisku.", commonMistake: "Predati nepotpun zahtev — organ traži dopunu i obrada se odlaže.", example: "Izmišljeno: 1) Pasoš 2) Izvod iz MKR 3) Aufenthaltstitel 4) Meldebescheinigung 5) B1 6) Test 7) Dokazi o prihodima", note: "Spisak se razlikuje po organu — koristi njihov." },
    { bhsField: "Predaja zahteva", whatToWrite: "Predaj zahtev nadležnoj Einbürgerungsbehörde na način koji ona nudi (lično, poštom ili onlajn gde postoji).", whereToFind: "Stranica tvog grada ili okruga.", format: "Sačuvaj potvrdu o predaji.", commonMistake: "Ne sačuvati dokaz o predaji ili broj predmeta.", example: "Izmišljeno: Eingangsbestätigung Nr. 2026/0000", note: "Rok obrade zavisi od organa; ne postoji zagarantovan rok." },
    { bhsField: "Taksa — 255 €", whatToWrite: "Uplati taksu prema uputstvu organa, sa navedenim brojem predmeta.", whereToFind: "Poziv na uplatu tvog organa.", format: "Tačna svrha uplate prema uputstvu.", commonMistake: "Uplatiti bez broja predmeta, pa se uplata ne može pripisati.", example: "Izmišljeno: Verwendungszweck: Einbürgerung M. Kovač AZ 0000", note: "Prema § 38 StAG: 255 € po osobi; 51 € za maloletno dete koje se naturalizuje zajedno sa roditeljem. Mogući su dodatni troškovi (test, prevodi)." },
    { bhsField: "Uručenje Einbürgerungsurkunde", whatToWrite: "Dođi na termin uručenja sa ličnim dokumentom i pozivom.", whereToFind: "Poziv organa.", format: "Lični dolazak prema pozivu.", commonMistake: "Propustiti termin bez otkazivanja.", example: "Izmišljeno: Aushändigung am 14.10.2026", note: "Nemačko državljanstvo stičeš uručenjem isprave. Nemački pasoš ili ličnu kartu tražiš posebno. Šta to znači za tvoje dosadašnje državljanstvo, proveri kod predstavništva svoje zemlje." },
  ]),
};

const de: EinbGuideLocale = {
  labels: { who: "Wer einen Antrag stellen kann", time: "Bearbeitungszeit:", prepare: "Was du vorbereiten solltest", mistakes: "Häufige Fehler" },
  header: {
    title: "Deutsche Staatsangehörigkeit (Einbürgerung)",
    source: "StAG (aktuelle Fassung) + zuständige Einbürgerungsbehörde",
    formName: "Antrag auf Einbürgerung (Formular deiner Einbürgerungsbehörde)",
    whoCanApply: "In der Regel Ausländerinnen und Ausländer mit mindestens 5 Jahren rechtmäßigem gewöhnlichem Aufenthalt in Deutschland (§ 10 StAG). Kürzere Fristen nur in gesetzlich geregelten Fällen, z. B. Ehegatten Deutscher: in der Regel 3 Jahre Aufenthalt und 2 Jahre Ehe (§ 9 StAG). Die beschleunigte Einbürgerung nach 3 Jahren wurde am 30.10.2025 abgeschafft. Seit 27.06.2024 verlangt Deutschland keinen Verzicht auf die bisherige Staatsangehörigkeit — ob du sie behältst, regelt das Recht deines Herkunftslandes. Erfüllte Voraussetzungen garantieren kein Ergebnis; es entscheidet die Behörde.",
    processingTime: "Abhängig von der zuständigen Einbürgerungsbehörde — die genaue Dauer nennt die Behörde",
    requirements: [
      "In der Regel mindestens 5 Jahre rechtmäßiger Aufenthalt (beschleunigter Weg nach 3 Jahren seit 30.10.2025 abgeschafft)",
      "Passender Aufenthaltsstatus (z. B. Niederlassungserlaubnis oder anderer Aufenthaltstitel nach § 10 StAG)",
      "Lebensunterhalt ohne Bürgergeld/Grundsicherungsgeld oder Sozialhilfe, außer gesetzliche Ausnahmen",
      "Deutschkenntnisse mindestens B1 oder ein gesetzlich anerkannter Nachweis (z. B. deutscher Schulabschluss)",
      "Bestandener Einbürgerungstest oder gesetzliche Befreiung (z. B. deutscher Schulabschluss)",
      "Keine relevanten Verurteilungen (Bagatellstrafen nach § 12a StAG bleiben in der Regel außer Betracht)",
      "Bekenntnis zur freiheitlichen demokratischen Grundordnung",
      "Gebühr 255 € pro Erwachsenem; 51 € für ein minderjähriges Kind, das mit einem Elternteil eingebürgert wird",
    ],
    commonMistakes: [
      "Auf den alten beschleunigten Weg nach 3 Jahren setzen — er wurde am 30.10.2025 abgeschafft",
      "Auf die Herkunftsstaatsangehörigkeit verzichten, bevor du deren Regeln geprüft hast",
      "Test oder Übersetzungen bezahlen, bevor du die Behörde gefragt hast, welche Nachweise sie genau verlangt",
    ],
  },
  steps: withDe([
    { bhsField: "Persönliche Angaben", whatToWrite: "Familienname, Vorname, Geburtsdatum und -ort sowie aktuelle Staatsangehörigkeit genau wie im Pass. Falls abweichend, auch den Geburtsnamen.", whereToFind: "Pass, Ausweis, Geburtsurkunde (welche Übersetzungen oder Beglaubigungen nötig sind, sagt deine Behörde).", format: "Name mit diakritischen Zeichen wie im Pass (č, ć, š, đ, ž). Datum: TT.MM.JJJJ.", commonMistake: "Den Namen ohne Sonderzeichen oder abweichend vom Pass schreiben — Abweichungen verzögern die Bearbeitung.", example: "Fiktiv: Familienname: Kovač | Vorname: Maja | Geburtsdatum: 15.03.1990 | Geburtsort: Tuzla" },
    { bhsField: "Aufenthaltsstatus und Einreise", whatToWrite: "Aktueller Aufenthaltstitel und Datum der ersten Einreise zum rechtmäßigen Aufenthalt.", whereToFind: "Aufenthaltstitel-Karte, Meldebescheinigung, alte Pässe.", format: "Status genau wie auf der Karte. Datum: TT.MM.JJJJ.", commonMistake: "Touristische Aufenthalte mitzählen — es zählt der rechtmäßige gewöhnliche Aufenthalt.", example: "Fiktiv: Niederlassungserlaubnis seit 12.04.2023 | Einreise: 03.09.2019" },
    { bhsField: "Aufenthaltsdauer — in der Regel 5 Jahre", whatToWrite: "Gesamtdauer des rechtmäßigen gewöhnlichen Aufenthalts. Längere Abwesenheiten ehrlich angeben; die Behörde prüft, ob sie den Aufenthalt unterbrechen.", whereToFind: "Meldebescheinigungen, alte und aktuelle Aufenthaltstitel.", format: "Jahre und Monate, z. B. „5 Jahre 7 Monate“.", commonMistake: "Auf den abgeschafften 3-Jahres-Weg setzen. Seit 30.10.2025 gelten mindestens 5 Jahre; kürzer nur in gesetzlichen Ausnahmen (z. B. § 9 StAG für Ehegatten).", example: "Fiktiv: seit 03.09.2019 rechtmäßiger gewöhnlicher Aufenthalt", note: "Die beschleunigte Einbürgerung nach 3 Jahren („besondere Integrationsleistungen“) wurde am 30.10.2025 abgeschafft. Ehegatten Deutscher: in der Regel 3 Jahre Aufenthalt und 2 Jahre Ehe (§ 9 StAG)." },
    { bhsField: "Deutschkenntnisse — mindestens B1", whatToWrite: "Art des Nachweises, Niveau und Datum (z. B. Zertifikat B1).", whereToFind: "Original-Sprachzertifikat oder deutscher Schul-/Berufsabschluss, sofern die Behörde ihn als Nachweis anerkennt.", format: "Bezeichnung + Niveau + Datum.", commonMistake: "Eine Kursteilnahmebestätigung statt eines Prüfungszertifikats einreichen.", example: "Fiktiv: Zertifikat Deutsch B1 — bestanden am 22.06.2025", note: "Welche Nachweise das Zertifikat ersetzen (z. B. deutscher Schulabschluss), bestätigt deine Einbürgerungsbehörde. Für manche Personen sieht das Gesetz Erleichterungen vor (§ 10 StAG)." },
    { bhsField: "Einbürgerungstest", whatToWrite: "Datum und Ergebnis des Tests oder Grund der Befreiung.", whereToFind: "BAMF-Bescheinigung über das Testergebnis.", format: "Datum + Bescheinigung.", commonMistake: "Den Test bezahlen, ohne zu prüfen, ob ein deutscher Schulabschluss bereits befreit.", example: "Fiktiv: Einbürgerungstest bestanden am 18.03.2025", note: "Eine Befreiung ist z. B. mit deutschem Schulabschluss möglich; ob dein Dokument genügt, prüft die Behörde." },
    { bhsField: "Lebensunterhalt", whatToWrite: "Einkommensquelle (Arbeit, Selbstständigkeit, Rente) und ob du Leistungen nach SGB II/XII beziehst.", whereToFind: "Arbeitsvertrag, Gehaltsabrechnungen, Steuerbescheid, Rentenbescheid.", format: "Kopien der Unterlagen, die die Behörde verlangt.", commonMistake: "Annehmen, jede Leistung schließe die Einbürgerung aus — das Gesetz kennt Ausnahmen; es entscheidet die Behörde.", example: "Fiktiv: unbefristete Vollzeitstelle seit 01.06.2022", note: "Der Bezug von Bürgergeld/Grundsicherungsgeld oder Sozialhilfe ist in der Regel ein Hindernis, außer gesetzliche Ausnahmen (§ 10 Abs. 1 Nr. 3 StAG)." },
    { bhsField: "Bekenntnis zur Grundordnung", whatToWrite: "Erklärung im Formular lesen und eigenhändig unterschreiben.", whereToFind: "Teil des Antrags oder gesondertes Blatt deiner Behörde.", format: "Ort, Datum, Unterschrift.", commonMistake: "Ohne Lesen unterschreiben — die Erklärung ist rechtlich verbindlich.", example: "Fiktiv: Ort, Datum, Unterschrift", note: "Seit 27.06.2024 verlangt das StAG ausdrücklich auch das Bekenntnis zur besonderen historischen Verantwortung Deutschlands (§ 10 Abs. 1 Nr. 1a StAG)." },
    { bhsField: "Bisherige Staatsangehörigkeit", whatToWrite: "Alle Staatsangehörigkeiten angeben. Deutschland verlangt seit 27.06.2024 keinen Verzicht.", whereToFind: "Pässe aller Staaten, deren Staatsangehörigkeit du besitzt.", format: "Nach dem Formular deiner Behörde.", commonMistake: "Glauben, deutsches Recht entscheide auch über die Staatsangehörigkeit von BiH oder einem anderen Land — das regelt dessen Recht.", example: "Fiktiv: Staatsangehörigkeit: bosnisch-herzegowinisch", note: "BiH: Der Erwerb einer weiteren Staatsangehörigkeit führt nicht von selbst zum Verlust der BiH-Staatsangehörigkeit; der Wiedererwerb nach früherem Verzicht hat aber besondere Bedingungen. Siehe Seite „Doppelte Staatsangehörigkeit“." },
    { bhsField: "Erforderliche Unterlagen", whatToWrite: "Liste der Unterlagen erstellen, die deine Behörde verlangt.", whereToFind: "Liste auf der Website deiner Einbürgerungsbehörde.", format: "Kopien geordnet nach der Liste.", commonMistake: "Einen unvollständigen Antrag einreichen — die Behörde fordert nach und die Bearbeitung verzögert sich.", example: "Fiktiv: 1) Pass 2) Geburtsurkunde 3) Aufenthaltstitel 4) Meldebescheinigung 5) B1 6) Test 7) Einkommensnachweise", note: "Die Liste unterscheidet sich je nach Behörde — nutze deren Liste." },
    { bhsField: "Antrag stellen", whatToWrite: "Antrag bei der zuständigen Einbürgerungsbehörde so einreichen, wie sie es anbietet (persönlich, per Post oder online, wo vorhanden).", whereToFind: "Website deiner Stadt oder deines Kreises.", format: "Eingangsbestätigung aufbewahren.", commonMistake: "Keinen Nachweis über die Einreichung oder das Aktenzeichen aufbewahren.", example: "Fiktiv: Eingangsbestätigung Nr. 2026/0000", note: "Die Bearbeitungsdauer hängt von der Behörde ab; es gibt keine garantierte Frist." },
    { bhsField: "Gebühr — 255 €", whatToWrite: "Gebühr nach Anweisung der Behörde mit Aktenzeichen bezahlen.", whereToFind: "Zahlungsaufforderung deiner Behörde.", format: "Verwendungszweck genau nach Anweisung.", commonMistake: "Ohne Aktenzeichen überweisen, sodass die Zahlung nicht zugeordnet werden kann.", example: "Fiktiv: Verwendungszweck: Einbürgerung M. Kovač AZ 0000", note: "Nach § 38 StAG: 255 € pro Person; 51 € für ein minderjähriges Kind, das mit einem Elternteil eingebürgert wird. Zusätzliche Kosten (Test, Übersetzungen) sind möglich." },
    { bhsField: "Aushändigung der Urkunde", whatToWrite: "Zum Aushändigungstermin mit Ausweisdokument und Einladung erscheinen.", whereToFind: "Einladung der Behörde.", format: "Persönliches Erscheinen laut Einladung.", commonMistake: "Den Termin ohne Absage verpassen.", example: "Fiktiv: Aushändigung am 14.10.2026", note: "Die deutsche Staatsangehörigkeit erwirbst du mit Aushändigung der Urkunde. Pass oder Personalausweis beantragst du gesondert. Was das für deine bisherige Staatsangehörigkeit bedeutet, klärst du mit der Vertretung deines Landes." },
  ]),
};

export const EINBUERGERUNG_GUIDE: Record<EinbLocale, EinbGuideLocale> = { bs, hr, sr, de };

export function getEinbuergerungGuide(lang: string | undefined): EinbGuideLocale {
  const key = (lang ?? "bs").slice(0, 2) as EinbLocale;
  return EINBUERGERUNG_GUIDE[key] ?? bs;
}
