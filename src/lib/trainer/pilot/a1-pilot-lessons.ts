/**
 * A1 pilot lessons (original content, 2026-10-28). Explanations in BS/HR/SR/DE.
 * Deterministic exercises only; no AI scoring. Names/addresses/numbers are fictional.
 */
export type PilotLocale = "bs" | "hr" | "sr" | "de";
export type L = Record<PilotLocale, string>;
const l = (bs: string, hr: string, sr: string, de: string): L => ({ bs, hr, sr, de });

export interface PilotVocab { de: string; article?: "der" | "die" | "das"; plural?: string; tr: L }
export interface PilotLine { speaker: string; de: string; tr: L }
export type PilotExercise =
  | { id: string; kind: "match"; pairs: { de: string; tr: L }[]; hint: L }
  | { id: string; kind: "gap"; sentence: string; options: string[]; answer: string; hint: L; explain: L }
  | { id: string; kind: "choice"; prompt: L; promptDe?: string; options: string[]; answer: number; hint: L; explain: L }
  | { id: string; kind: "order"; words: string[]; answer: string; hint: L; explain: L };

export interface PilotLesson {
  id: string; level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2"; icon: string; minutes: number;
  /** Legacy course lesson this authored core content standardizes (keeps IDs/progress). */
  legacyId?: string;
  titleDe: string; title: L; scenario: L; objectives: L[];
  vocab: PilotVocab[]; dialogue: PilotLine[];
  grammar: { title: L; body: L; examples: { de: string; tr: L }[] };
  exercises: PilotExercise[];
}

const introduce: PilotLesson = {
  legacyId: "a1-03",
  id: "a1-pilot-01", level: "A1", icon: "👋", minutes: 12,
  titleDe: "Sich vorstellen",
  title: l("Predstaviti se", "Predstaviti se", "Predstaviti se", "Sich vorstellen"),
  scenario: l(
    "Maja se prijavljuje na kurs njemačkog u jezičkoj školi u Augsburgu. Službenica uzima njene podatke.",
    "Maja se prijavljuje na tečaj njemačkoga u jezičnoj školi u Augsburgu. Službenica uzima njezine podatke.",
    "Maja se prijavljuje na kurs nemačkog u školi jezika u Augsburgu. Službenica uzima njene podatke.",
    "Maja meldet sich in einer Sprachschule in Augsburg für einen Deutschkurs an. Die Mitarbeiterin nimmt ihre Daten auf.",
  ),
  objectives: [
    l("Reći ime, porijeklo i mjesto stanovanja", "Reći ime, podrijetlo i mjesto stanovanja", "Reći ime, poreklo i mesto stanovanja", "Name, Herkunft und Wohnort nennen"),
    l("Postaviti i razumjeti pitanja Wie? Woher? Wo?", "Postaviti i razumjeti pitanja Wie? Woher? Wo?", "Postaviti i razumeti pitanja Wie? Woher? Wo?", "W-Fragen (Wie? Woher? Wo?) stellen und verstehen"),
    l("Razlikovati du i Sie", "Razlikovati du i Sie", "Razlikovati du i Sie", "du und Sie unterscheiden"),
  ],
  vocab: [
    { de: "Name", article: "der", plural: "die Namen", tr: l("ime (općenito)", "ime (općenito)", "ime (uopšte)", "wie man heißt") },
    { de: "Vorname", article: "der", plural: "die Vornamen", tr: l("ime", "ime", "ime", "z. B. Maja") },
    { de: "Nachname", article: "der", plural: "die Nachnamen", tr: l("prezime", "prezime", "prezime", "Familienname, z. B. Kovač") },
    { de: "Land", article: "das", plural: "die Länder", tr: l("zemlja, država", "zemlja, država", "zemlja, država", "Staat, z. B. Kroatien") },
    { de: "Stadt", article: "die", plural: "die Städte", tr: l("grad", "grad", "grad", "z. B. Augsburg") },
    { de: "Sprache", article: "die", plural: "die Sprachen", tr: l("jezik", "jezik", "jezik", "z. B. Deutsch, Englisch") },
    { de: "Beruf", article: "der", plural: "die Berufe", tr: l("zanimanje", "zanimanje", "zanimanje", "Arbeit, z. B. Krankenpflegerin") },
    { de: "Adresse", article: "die", plural: "die Adressen", tr: l("adresa", "adresa", "adresa", "Straße, Hausnummer, Ort") },
    { de: "Telefonnummer", article: "die", plural: "die Telefonnummern", tr: l("broj telefona", "broj telefona", "broj telefona", "z. B. 0151 …") },
    { de: "heißen", tr: l("zvati se", "zvati se", "zvati se", "einen Namen haben") },
    { de: "kommen aus", tr: l("dolaziti iz, biti porijeklom iz", "dolaziti iz, biti podrijetlom iz", "dolaziti iz, biti poreklom iz", "die Herkunft nennen") },
    { de: "wohnen", tr: l("stanovati, živjeti (negdje)", "stanovati, živjeti (negdje)", "stanovati, živeti (negde)", "an einem Ort leben") },
  ],
  dialogue: [
    { speaker: "Frau Berger", de: "Guten Tag! Wie heißen Sie?", tr: l("Dobar dan! Kako se zovete?", "Dobar dan! Kako se zovete?", "Dobar dan! Kako se zovete?", "Begrüßung und Frage nach dem Namen") },
    { speaker: "Maja", de: "Guten Tag. Ich heiße Maja Kovač.", tr: l("Dobar dan. Zovem se Maja Kovač.", "Dobar dan. Zovem se Maja Kovač.", "Dobar dan. Zovem se Maja Kovač.", "Maja nennt ihren Namen.") },
    { speaker: "Frau Berger", de: "Wie schreibt man Ihren Nachnamen?", tr: l("Kako se piše Vaše prezime?", "Kako se piše Vaše prezime?", "Kako se piše Vaše prezime?", "Frage nach der Schreibweise") },
    { speaker: "Maja", de: "K – O – V – A – C, das C mit Häkchen.", tr: l("K – O – V – A – C, C sa kvačicom.", "K – O – V – A – C, C s kvačicom.", "K – O – V – A – C, C sa kvačicom.", "Maja buchstabiert: Č = C mit Häkchen.") },
    { speaker: "Frau Berger", de: "Danke. Woher kommen Sie?", tr: l("Hvala. Odakle ste?", "Hvala. Odakle ste?", "Hvala. Odakle ste?", "Frage nach der Herkunft") },
    { speaker: "Maja", de: "Ich komme aus Bosnien und Herzegowina.", tr: l("Ja sam iz Bosne i Hercegovine.", "Ja sam iz Bosne i Hercegovine.", "Ja sam iz Bosne i Hercegovine.", "Maja nennt ihr Herkunftsland.") },
    { speaker: "Frau Berger", de: "Und wo wohnen Sie?", tr: l("A gdje stanujete?", "A gdje stanujete?", "A gde stanujete?", "Frage nach dem Wohnort") },
    { speaker: "Maja", de: "Ich wohne in Augsburg, in der Lindenstraße 12.", tr: l("Stanujem u Augsburgu, u Lindenstraße 12.", "Stanujem u Augsburgu, u Lindenstraße 12.", "Stanujem u Augsburgu, u Lindenstraße 12.", "Maja nennt Stadt und Adresse.") },
    { speaker: "Frau Berger", de: "Welche Sprachen sprechen Sie?", tr: l("Koje jezike govorite?", "Koje jezike govorite?", "Koje jezike govorite?", "Frage nach den Sprachen") },
    { speaker: "Maja", de: "Ich spreche Bosnisch, Englisch und ein bisschen Deutsch.", tr: l("Govorim bosanski, engleski i malo njemački.", "Govorim bosanski, engleski i malo njemački.", "Govorim bosanski, engleski i malo nemački.", "Maja nennt ihre Sprachen.") },
  ],
  grammar: {
    title: l("Glagol u sadašnjem vremenu + W-pitanja", "Glagol u sadašnjem vremenu + W-pitanja", "Glagol u sadašnjem vremenu + W-pitanja", "Verben im Präsens + W-Fragen"),
    body: l(
      "Njemački glagol mijenja nastavak prema osobi: ich heiße, du heißt, Sie heißen (formalno). U pitanju sa upitnom riječi (Wie, Woher, Wo) glagol stoji na DRUGOM mjestu. Sa službenicima, ljekarima i nepoznatim odraslim osobama koristi Sie; du koristi s prijateljima, porodicom i djecom.",
      "Njemački glagol mijenja nastavak prema osobi: ich heiße, du heißt, Sie heißen (formalno). U pitanju s upitnom riječi (Wie, Woher, Wo) glagol stoji na DRUGOM mjestu. Sa službenicima, liječnicima i nepoznatim odraslim osobama koristi Sie; du koristi s prijateljima, obitelji i djecom.",
      "Nemački glagol menja nastavak prema licu: ich heiße, du heißt, Sie heißen (formalno). U pitanju sa upitnom rečju (Wie, Woher, Wo) glagol stoji na DRUGOM mestu. Sa službenicima, lekarima i nepoznatim odraslim osobama koristi Sie; du koristi sa prijateljima, porodicom i decom.",
      "Das Verb hat je nach Person eine andere Endung: ich heiße, du heißt, Sie heißen (formell). In W-Fragen (Wie, Woher, Wo) steht das Verb auf Position 2. Bei Behörden, in der Praxis und mit unbekannten Erwachsenen benutzt man Sie; du mit Freunden, Familie und Kindern.",
    ),
    examples: [
      { de: "Ich heiße Maja.", tr: l("Zovem se Maja.", "Zovem se Maja.", "Zovem se Maja.", "ich → -e") },
      { de: "Wie heißt du?", tr: l("Kako se zoveš? (neformalno)", "Kako se zoveš? (neformalno)", "Kako se zoveš? (neformalno)", "du → -st / -t") },
      { de: "Woher kommen Sie?", tr: l("Odakle ste? (formalno)", "Odakle ste? (formalno)", "Odakle ste? (formalno)", "Sie → -en") },
      { de: "Ich wohne in Augsburg.", tr: l("Stanujem u Augsburgu.", "Stanujem u Augsburgu.", "Stanujem u Augsburgu.", "wohnen + in + Stadt") },
    ],
  },
  exercises: [
    { id: "m1", kind: "match", hint: l("Pogledaj listu riječi gore.", "Pogledaj popis riječi gore.", "Pogledaj listu reči gore.", "Schau in die Wortliste oben."), pairs: [
      { de: "der Vorname", tr: l("ime", "ime", "ime", "z. B. Maja") },
      { de: "der Nachname", tr: l("prezime", "prezime", "prezime", "z. B. Kovač") },
      { de: "das Land", tr: l("zemlja", "zemlja", "zemlja", "z. B. Kroatien") },
      { de: "die Sprache", tr: l("jezik", "jezik", "jezik", "z. B. Englisch") },
      { de: "der Beruf", tr: l("zanimanje", "zanimanje", "zanimanje", "z. B. Koch") },
    ] },
    { id: "g1", kind: "gap", sentence: "Ich ___ Maja Kovač.", options: ["heiße", "heißt", "heißen"], answer: "heiße",
      hint: l("Osoba je ich.", "Osoba je ich.", "Lice je ich.", "Die Person ist ich."),
      explain: l("ich → nastavak -e: ich heiße.", "ich → nastavak -e: ich heiße.", "ich → nastavak -e: ich heiße.", "ich → Endung -e: ich heiße.") },
    { id: "g2", kind: "gap", sentence: "Woher ___ du?", options: ["komme", "kommst", "kommen"], answer: "kommst",
      hint: l("Osoba je du.", "Osoba je du.", "Lice je du.", "Die Person ist du."),
      explain: l("du → nastavak -st: du kommst.", "du → nastavak -st: du kommst.", "du → nastavak -st: du kommst.", "du → Endung -st: du kommst.") },
    { id: "c1", kind: "choice", promptDe: "Wie heißen Sie?",
      prompt: l("Službenica pita. Šta odgovaraš?", "Službenica pita. Što odgovaraš?", "Službenica pita. Šta odgovaraš?", "Die Mitarbeiterin fragt. Was antwortest du?"),
      options: ["Ich heiße Maja Kovač.", "Ich wohne in Augsburg.", "Ich komme aus Tuzla."], answer: 0,
      hint: l("Pitanje je o imenu.", "Pitanje je o imenu.", "Pitanje je o imenu.", "Die Frage ist nach dem Namen."),
      explain: l("Wie heißen Sie? = Kako se zovete? → Ich heiße …", "Wie heißen Sie? = Kako se zovete? → Ich heiße …", "Wie heißen Sie? = Kako se zovete? → Ich heiße …", "Wie heißen Sie? → Ich heiße …") },
    { id: "o1", kind: "order", words: ["in", "wohne", "Augsburg", "Ich"], answer: "Ich wohne in Augsburg",
      hint: l("Počni sa Ich; glagol je na 2. mjestu.", "Počni s Ich; glagol je na 2. mjestu.", "Počni sa Ich; glagol je na 2. mestu.", "Beginne mit Ich; das Verb steht auf Position 2."),
      explain: l("Izjavna rečenica: glagol na 2. mjestu.", "Izjavna rečenica: glagol na 2. mjestu.", "Izjavna rečenica: glagol na 2. mestu.", "Aussagesatz: Verb auf Position 2.") },
    { id: "o2", kind: "order", words: ["Sie", "kommen", "Woher"], answer: "Woher kommen Sie",
      hint: l("Upitna riječ ide prva.", "Upitna riječ ide prva.", "Upitna reč ide prva.", "Das Fragewort steht vorne."),
      explain: l("W-pitanje: upitna riječ – glagol – osoba.", "W-pitanje: upitna riječ – glagol – osoba.", "W-pitanje: upitna reč – glagol – lice.", "W-Frage: Fragewort – Verb – Person.") },
    { id: "g3", kind: "gap", sentence: "___ Adresse", options: ["der", "die", "das"], answer: "die",
      hint: l("Pogledaj listu riječi: Adresse je ženskog roda.", "Pogledaj popis riječi: Adresse je ženskog roda.", "Pogledaj listu reči: Adresse je ženskog roda.", "Schau in die Wortliste."),
      explain: l("die Adresse, množina die Adressen.", "die Adresse, množina die Adressen.", "die Adresse, množina die Adressen.", "die Adresse, Plural die Adressen.") },
    { id: "c2", kind: "choice",
      prompt: l("Prvi put si u Ausländerbehörde. Kako pitaš službenika za ime?", "Prvi put si u Ausländerbehörde. Kako pitaš službenika za ime?", "Prvi put si u Ausländerbehörde. Kako pitaš službenika za ime?", "Du bist zum ersten Mal in der Ausländerbehörde. Wie fragst du nach dem Namen?"),
      options: ["Wie heißt du?", "Wie heißen Sie?", "Wo wohnst du?"], answer: 1,
      hint: l("Nepoznata odrasla osoba na poslu.", "Nepoznata odrasla osoba na poslu.", "Nepoznata odrasla osoba na poslu.", "Unbekannter Erwachsener im Amt."),
      explain: l("U ustanovi koristiš formalno Sie.", "U ustanovi koristiš formalno Sie.", "U ustanovi koristiš formalno Sie.", "Im Amt benutzt man Sie.") },
  ],
};

const flat: PilotLesson = {
  legacyId: "a1-04",
  id: "a1-pilot-02", level: "A1", icon: "🏠", minutes: 14,
  titleDe: "Eine Wohnung besichtigen",
  title: l("Razgledanje stana", "Razgledavanje stana", "Razgledanje stana", "Eine Wohnung besichtigen"),
  scenario: l(
    "Damir razgleda stan. Stanodavac mu govori o sobama, kiriji i adresi.",
    "Damir razgledava stan. Najmodavac mu govori o sobama, najamnini i adresi.",
    "Damir razgleda stan. Stanodavac mu govori o sobama, kiriji i adresi.",
    "Damir besichtigt eine Wohnung. Der Vermieter erklärt Zimmer, Miete und Adresse.",
  ),
  objectives: [
    l("Imenovati prostorije stana sa članom", "Imenovati prostorije stana s članom", "Imenovati prostorije stana sa članom", "Räume mit Artikel benennen"),
    l("Pitati za kiriju, režije i depozit", "Pitati za najamninu, režije i polog", "Pitati za kiriju, režije i depozit", "Nach Miete, Nebenkosten und Kaution fragen"),
    l("Koristiti der/die/das i ein/eine", "Koristiti der/die/das i ein/eine", "Koristiti der/die/das i ein/eine", "der/die/das und ein/eine benutzen"),
  ],
  vocab: [
    { de: "Wohnung", article: "die", plural: "die Wohnungen", tr: l("stan", "stan", "stan", "Ort zum Wohnen in einem Haus") },
    { de: "Zimmer", article: "das", plural: "die Zimmer", tr: l("soba", "soba", "soba", "Raum, z. B. Schlafzimmer") },
    { de: "Küche", article: "die", plural: "die Küchen", tr: l("kuhinja", "kuhinja", "kuhinja", "Raum zum Kochen") },
    { de: "Bad", article: "das", plural: "die Bäder", tr: l("kupatilo", "kupaonica", "kupatilo", "Raum mit Dusche/Toilette") },
    { de: "Balkon", article: "der", plural: "die Balkone", tr: l("balkon", "balkon", "balkon", "draußen an der Wohnung") },
    { de: "Miete", article: "die", plural: "die Mieten", tr: l("kirija", "najamnina", "kirija", "Geld für die Wohnung pro Monat") },
    { de: "Kaltmiete", article: "die", plural: "die Kaltmieten", tr: l("kirija bez režija", "najamnina bez režija", "kirija bez režija", "Miete ohne Nebenkosten") },
    { de: "Nebenkosten", plural: "nur Plural: die Nebenkosten", tr: l("režijski troškovi", "režijski troškovi", "režijski troškovi", "z. B. Wasser, Heizung, Müll") },
    { de: "Kaution", article: "die", plural: "die Kautionen", tr: l("depozit (kaucija)", "polog (jamčevina)", "depozit", "Sicherheit für den Vermieter") },
    { de: "Vermieter", article: "der", plural: "die Vermieter", tr: l("stanodavac", "najmodavac", "stanodavac", "Person, die die Wohnung vermietet") },
    { de: "Straße", article: "die", plural: "die Straßen", tr: l("ulica", "ulica", "ulica", "Teil der Adresse") },
  ],
  dialogue: [
    { speaker: "Damir", de: "Guten Tag, ich bin Damir Novak. Ich habe einen Termin.", tr: l("Dobar dan, ja sam Damir Novak. Imam termin.", "Dobar dan, ja sam Damir Novak. Imam termin.", "Dobar dan, ja sam Damir Novak. Imam termin.", "Damir stellt sich vor.") },
    { speaker: "Herr Wagner", de: "Guten Tag, Herr Novak. Kommen Sie bitte herein.", tr: l("Dobar dan, gospodine Novak. Izvolite, uđite.", "Dobar dan, gospodine Novak. Izvolite, uđite.", "Dobar dan, gospodine Novak. Izvolite, uđite.", "Der Vermieter bittet ihn herein.") },
    { speaker: "Damir", de: "Wie groß ist die Wohnung?", tr: l("Koliko je stan velik?", "Koliko je stan velik?", "Koliko je stan veliki?", "Frage nach der Größe") },
    { speaker: "Herr Wagner", de: "Sie hat zwei Zimmer, eine Küche und ein Bad. Sie ist 55 Quadratmeter groß.", tr: l("Ima dvije sobe, kuhinju i kupatilo. Ima 55 kvadratnih metara.", "Ima dvije sobe, kuhinju i kupaonicu. Ima 55 četvornih metara.", "Ima dve sobe, kuhinju i kupatilo. Ima 55 kvadratnih metara.", "Räume und Größe") },
    { speaker: "Damir", de: "Wie hoch ist die Miete?", tr: l("Kolika je kirija?", "Kolika je najamnina?", "Kolika je kirija?", "Frage nach der Miete") },
    { speaker: "Herr Wagner", de: "Die Kaltmiete ist 650 Euro. Die Nebenkosten sind 180 Euro.", tr: l("Kirija bez režija je 650 eura. Režije su 180 eura.", "Najamnina bez režija je 650 eura. Režije su 180 eura.", "Kirija bez režija je 650 evra. Režije su 180 evra.", "Kaltmiete und Nebenkosten") },
    { speaker: "Damir", de: "Und wie hoch ist die Kaution?", tr: l("A koliki je depozit?", "A koliki je polog?", "A koliki je depozit?", "Frage nach der Kaution") },
    { speaker: "Herr Wagner", de: "Die Kaution ist 1.300 Euro.", tr: l("Depozit je 1.300 eura.", "Polog je 1.300 eura.", "Depozit je 1.300 evra.", "Höhe der Kaution") },
    { speaker: "Damir", de: "Wie ist die Adresse genau?", tr: l("Koja je tačna adresa?", "Koja je točna adresa?", "Koja je tačna adresa?", "Frage nach der Adresse") },
    { speaker: "Herr Wagner", de: "Lindenweg 7, im zweiten Stock.", tr: l("Lindenweg 7, na drugom spratu.", "Lindenweg 7, na drugom katu.", "Lindenweg 7, na drugom spratu.", "Straße, Hausnummer, Stockwerk") },
  ],
  grammar: {
    title: l("Član: der / die / das i ein / eine", "Član: der / die / das i ein / eine", "Član: der / die / das i ein / eine", "Artikel: der / die / das und ein / eine"),
    body: l(
      "Svaka imenica ima član: der (muški), die (ženski), das (srednji). Rod se često ne poklapa s našim jezikom (das Zimmer, ali „soba“ je ženskog roda), zato uči riječ uvijek sa članom. Neodređeni član: ein (der/das) i eine (die). U množini je određeni član uvijek die: die Zimmer.",
      "Svaka imenica ima član: der (muški), die (ženski), das (srednji). Rod se često ne poklapa s našim jezikom (das Zimmer, ali „soba” je ženskog roda), zato uči riječ uvijek s članom. Neodređeni član: ein (der/das) i eine (die). U množini je određeni član uvijek die: die Zimmer.",
      "Svaka imenica ima član: der (muški), die (ženski), das (srednji). Rod se često ne poklapa sa našim jezikom (das Zimmer, ali „soba“ je ženskog roda), zato uči reč uvek sa članom. Neodređeni član: ein (der/das) i eine (die). U množini je određeni član uvek die: die Zimmer.",
      "Jedes Nomen hat einen Artikel: der (maskulin), die (feminin), das (neutral). Lerne jedes Wort mit Artikel. Unbestimmter Artikel: ein (der/das) und eine (die). Im Plural ist der bestimmte Artikel immer die: die Zimmer.",
    ),
    examples: [
      { de: "Das ist ein Balkon. Der Balkon ist groß.", tr: l("Ovo je balkon. Balkon je velik.", "Ovo je balkon. Balkon je velik.", "Ovo je balkon. Balkon je veliki.", "der → ein") },
      { de: "Das ist eine Küche. Die Küche ist neu.", tr: l("Ovo je kuhinja. Kuhinja je nova.", "Ovo je kuhinja. Kuhinja je nova.", "Ovo je kuhinja. Kuhinja je nova.", "die → eine") },
      { de: "Das ist ein Zimmer. Das Zimmer ist hell.", tr: l("Ovo je soba. Soba je svijetla.", "Ovo je soba. Soba je svijetla.", "Ovo je soba. Soba je svetla.", "das → ein") },
      { de: "Die Wohnung hat zwei Zimmer.", tr: l("Stan ima dvije sobe.", "Stan ima dvije sobe.", "Stan ima dve sobe.", "Plural: die Zimmer") },
    ],
  },
  exercises: [
    { id: "m1", kind: "match", hint: l("Pogledaj listu riječi gore.", "Pogledaj popis riječi gore.", "Pogledaj listu reči gore.", "Schau in die Wortliste oben."), pairs: [
      { de: "die Küche", tr: l("kuhinja", "kuhinja", "kuhinja", "Raum zum Kochen") },
      { de: "das Bad", tr: l("kupatilo", "kupaonica", "kupatilo", "Dusche/Toilette") },
      { de: "die Miete", tr: l("kirija", "najamnina", "kirija", "Geld pro Monat") },
      { de: "die Kaution", tr: l("depozit", "polog", "depozit", "Sicherheit") },
      { de: "der Vermieter", tr: l("stanodavac", "najmodavac", "stanodavac", "vermietet die Wohnung") },
    ] },
    { id: "g1", kind: "gap", sentence: "___ Küche ist klein.", options: ["Der", "Die", "Das"], answer: "Die",
      hint: l("Küche je ženskog roda.", "Küche je ženskog roda.", "Küche je ženskog roda.", "Küche ist feminin."),
      explain: l("die Küche → Die Küche ist klein.", "die Küche → Die Küche ist klein.", "die Küche → Die Küche ist klein.", "die Küche → Die Küche ist klein.") },
    { id: "g2", kind: "gap", sentence: "___ Zimmer ist hell.", options: ["Der", "Die", "Das"], answer: "Das",
      hint: l("Pažnja: nije kao „soba“.", "Pozor: nije kao „soba”.", "Pažnja: nije kao „soba“.", "Achtung: neutral."),
      explain: l("das Zimmer je srednjeg roda.", "das Zimmer je srednjeg roda.", "das Zimmer je srednjeg roda.", "das Zimmer ist neutral.") },
    { id: "g3", kind: "gap", sentence: "Das ist ___ Balkon.", options: ["ein", "eine"], answer: "ein",
      hint: l("der Balkon → neodređeni član?", "der Balkon → neodređeni član?", "der Balkon → neodređeni član?", "der Balkon → unbestimmter Artikel?"),
      explain: l("der → ein: ein Balkon.", "der → ein: ein Balkon.", "der → ein: ein Balkon.", "der → ein: ein Balkon.") },
    { id: "g4", kind: "gap", sentence: "Die Wohnung hat zwei ___.", options: ["Zimmer", "Zimmers", "Zimmern"], answer: "Zimmer",
      hint: l("Pogledaj množinu u listi riječi.", "Pogledaj množinu u popisu riječi.", "Pogledaj množinu u listi reči.", "Schau den Plural in der Wortliste an."),
      explain: l("Množina: die Zimmer (bez nastavka).", "Množina: die Zimmer (bez nastavka).", "Množina: die Zimmer (bez nastavka).", "Plural: die Zimmer (ohne Endung).") },
    { id: "o1", kind: "order", words: ["die", "ist", "Miete", "hoch", "Wie"], answer: "Wie hoch ist die Miete",
      hint: l("Počni sa Wie hoch …", "Počni s Wie hoch …", "Počni sa Wie hoch …", "Beginne mit Wie hoch …"),
      explain: l("Wie hoch ist …? = Koliko iznosi …?", "Wie hoch ist …? = Koliko iznosi …?", "Wie hoch ist …? = Koliko iznosi …?", "Wie hoch ist …? fragt nach einem Betrag.") },
    { id: "c1", kind: "choice",
      prompt: l("Kaltmiete 650 €, Nebenkosten 180 €. Koliko Damir plaća mjesečno ukupno?", "Kaltmiete 650 €, Nebenkosten 180 €. Koliko Damir plaća mjesečno ukupno?", "Kaltmiete 650 €, Nebenkosten 180 €. Koliko Damir plaća mesečno ukupno?", "Kaltmiete 650 €, Nebenkosten 180 €. Wie viel zahlt Damir pro Monat insgesamt?"),
      options: ["650 Euro", "830 Euro", "1.300 Euro"], answer: 1,
      hint: l("Saberi kiriju i režije.", "Zbroji najamninu i režije.", "Saberi kiriju i režije.", "Addiere Miete und Nebenkosten."),
      explain: l("650 + 180 = 830 € (tzv. Warmmiete). Depozit se plaća jednom, ne mjesečno.", "650 + 180 = 830 € (tzv. Warmmiete). Polog se plaća jednom, ne mjesečno.", "650 + 180 = 830 € (tzv. Warmmiete). Depozit se plaća jednom, ne mesečno.", "650 + 180 = 830 € (Warmmiete). Die Kaution zahlt man einmal, nicht monatlich.") },
    { id: "c2", kind: "choice",
      prompt: l("Šta su Nebenkosten?", "Što su Nebenkosten?", "Šta su Nebenkosten?", "Was sind Nebenkosten?"),
      options: ["Wasser, Heizung, Müll", "die Kaution", "ein Zimmer"], answer: 0,
      hint: l("Troškovi uz kiriju.", "Troškovi uz najamninu.", "Troškovi uz kiriju.", "Kosten zusätzlich zur Miete."),
      explain: l("Nebenkosten = režije, npr. voda, grijanje, smeće.", "Nebenkosten = režije, npr. voda, grijanje, smeće.", "Nebenkosten = režije, npr. voda, grejanje, smeće.", "Nebenkosten: z. B. Wasser, Heizung, Müll.") },
  ],
};

export const A1_PILOT_LESSONS: PilotLesson[] = [introduce, flat];
export const getPilotLesson = (id: string | null) => A1_PILOT_LESSONS.find((x) => x.id === id);
export const pilotLocale = (lang?: string): PilotLocale => {
  const k = (lang ?? "bs").slice(0, 2);
  return (["bs", "hr", "sr", "de"] as const).includes(k as PilotLocale) ? (k as PilotLocale) : "bs";
};

/** Pure checker used by UI and tests. */
export function checkAnswer(ex: PilotExercise, value: unknown): boolean {
  switch (ex.kind) {
    case "gap": return value === ex.answer;
    case "choice": return value === ex.answer;
    case "order": return Array.isArray(value) && value.join(" ") === ex.answer;
    case "match": {
      const m = value as Record<string, string> | undefined;
      return !!m && ex.pairs.every((p) => m[p.de] === p.de);
    }
  }
}

/** Session review queue: missed exercises are repeated once at the end. */
export function buildQueue(exercises: PilotExercise[], missed: string[]): PilotExercise[] {
  return [...exercises, ...exercises.filter((e) => missed.includes(e.id)).map((e) => ({ ...e, id: `${e.id}#review` }))];
}
