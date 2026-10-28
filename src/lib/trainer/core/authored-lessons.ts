/**
 * Authored, standardized core lessons A2–C2 (original content, 2026-10-28).
 * Same format and pedagogy as the A1 pilots. Each one replaces nothing: it is the
 * "core lesson" for an existing legacy lesson ID (legacyId), whose old exercises
 * remain available as optional extra practice. Names/places/numbers are fictional.
 */
import type { L, PilotLesson, PilotLocale } from "@/lib/trainer/pilot/a1-pilot-lessons";
import { A1_PILOT_LESSONS } from "@/lib/trainer/pilot/a1-pilot-lessons";

const l = (bs: string, hr: string, sr: string, de: string): L => ({ bs, hr, sr, de });
const same = (x: string, de: string) => l(x, x, x, de);

// ───────────────────────── A2 ─────────────────────────
const landlord: PilotLesson = {
  id: "a2-core-11", legacyId: "a2-11", level: "A2", icon: "🔧", minutes: 13,
  titleDe: "Mit dem Vermieter sprechen",
  title: l("Razgovor sa stanodavcem", "Razgovor s najmodavcem", "Razgovor sa stanodavcem", "Mit dem Vermieter sprechen"),
  scenario: l(
    "U kupatilu Maje Kovač curi slavina već tri dana. Ona zove stanodavca, gospodina Lehmanna, i dogovara termin za majstora.",
    "U kupaonici Maje Kovač curi slavina već tri dana. Ona zove najmodavca, gospodina Lehmanna, i dogovara termin za majstora.",
    "U kupatilu Maje Kovač curi slavina već tri dana. Ona zove stanodavca, gospodina Lehmana, i dogovara termin za majstora.",
    "Im Bad von Maja Kovač tropft seit drei Tagen der Wasserhahn. Sie ruft ihren Vermieter, Herrn Lehmann, an und vereinbart einen Termin für den Handwerker.",
  ),
  objectives: [
    l("Opisati kvar u stanu jednostavnim rečenicama", "Opisati kvar u stanu jednostavnim rečenicama", "Opisati kvar u stanu jednostavnim rečenicama", "Einen Schaden in der Wohnung einfach beschreiben"),
    l("Obrazložiti nešto rečenicom sa weil", "Obrazložiti nešto rečenicom s weil", "Obrazložiti nešto rečenicom sa weil", "Etwas mit einem weil-Satz begründen"),
    l("Dogovoriti termin (Wann passt es Ihnen?)", "Dogovoriti termin (Wann passt es Ihnen?)", "Dogovoriti termin (Wann passt es Ihnen?)", "Einen Termin vereinbaren (Wann passt es Ihnen?)"),
  ],
  vocab: [
    { de: "Vermieter", article: "der", plural: "die Vermieter", tr: l("stanodavac", "najmodavac", "stanodavac", "Person, der die Wohnung gehört") },
    { de: "Wasserhahn", article: "der", plural: "die Wasserhähne", tr: l("slavina", "slavina", "slavina", "dort kommt das Wasser heraus") },
    { de: "Heizung", article: "die", plural: "die Heizungen", tr: l("grijanje", "grijanje", "grejanje", "macht die Wohnung warm") },
    { de: "Schaden", article: "der", plural: "die Schäden", tr: l("šteta, kvar", "šteta, kvar", "šteta, kvar", "etwas ist kaputt") },
    { de: "Handwerker", article: "der", plural: "die Handwerker", tr: l("majstor", "majstor", "majstor", "repariert etwas") },
    { de: "Termin", article: "der", plural: "die Termine", tr: l("termin", "termin", "termin", "Datum und Uhrzeit") },
    { de: "kaputt", tr: l("pokvaren", "pokvaren", "pokvaren", "funktioniert nicht") },
    { de: "tropfen", tr: l("kapati, curiti", "kapati, curiti", "kapati, curiti", "Wasser kommt in Tropfen") },
    { de: "reparieren", tr: l("popraviti", "popraviti", "popraviti", "wieder ganz machen") },
  ],
  dialogue: [
    { speaker: "Herr Lehmann", de: "Lehmann, guten Tag.", tr: same("Lehmann, dobar dan.", "Er meldet sich mit Namen.") },
    { speaker: "Maja", de: "Guten Tag, Herr Lehmann. Hier ist Maja Kovač aus der Gartenstraße 5.", tr: l("Dobar dan, gospodine Lehmann. Ovdje Maja Kovač iz Gartenstraße 5.", "Dobar dan, gospodine Lehmann. Ovdje Maja Kovač iz Gartenstraße 5.", "Dobar dan, gospodine Lehman. Ovde Maja Kovač iz Gartenstraße 5.", "Maja nennt Namen und Adresse.") },
    { speaker: "Maja", de: "Ich rufe an, weil der Wasserhahn im Bad tropft.", tr: l("Zovem jer slavina u kupatilu curi.", "Zovem jer slavina u kupaonici curi.", "Zovem jer slavina u kupatilu curi.", "Grund des Anrufs mit weil") },
    { speaker: "Herr Lehmann", de: "Seit wann ist das so?", tr: same("Od kada je to tako?", "Frage nach dem Zeitpunkt") },
    { speaker: "Maja", de: "Seit Montag. Ich habe schon ein Foto gemacht.", tr: l("Od ponedjeljka. Već sam napravila fotografiju.", "Od ponedjeljka. Već sam napravila fotografiju.", "Od ponedeljka. Već sam napravila fotografiju.", "Perfekt: habe … gemacht") },
    { speaker: "Herr Lehmann", de: "Gut. Ich schicke Ihnen einen Handwerker. Wann passt es Ihnen?", tr: l("Dobro. Poslaću Vam majstora. Kada Vam odgovara?", "Dobro. Poslat ću Vam majstora. Kada Vam odgovara?", "Dobro. Poslaću Vam majstora. Kada Vam odgovara?", "Terminfrage") },
    { speaker: "Maja", de: "Am Donnerstag ab 15 Uhr bin ich zu Hause.", tr: l("U četvrtak od 15 sati sam kod kuće.", "U četvrtak od 15 sati sam kod kuće.", "U četvrtak od 15 časova sam kod kuće.", "Zeitangabe: am + Tag, ab + Uhrzeit") },
    { speaker: "Herr Lehmann", de: "Donnerstag um 16 Uhr? Dann kommt Herr Weber.", tr: same("Četvrtak u 16? Onda dolazi gospodin Weber.", "Bestätigung des Termins") },
  ],
  grammar: {
    title: l("Rečenica sa weil: glagol ide na kraj", "Rečenica s weil: glagol ide na kraj", "Rečenica sa weil: glagol ide na kraj", "weil-Sätze: Verb am Ende"),
    body: l(
      "weil znači „jer“. Poslije weil počinje zavisna rečenica i lični glagol ide na SAMI KRAJ: „Der Hahn tropft.“ → „…, weil der Hahn tropft.“ Ispred weil uvijek stoji zarez. Kod perfekta na kraj ide pomoćni glagol: „…, weil ich ein Foto gemacht habe.“",
      "weil znači „jer“. Nakon weil počinje zavisna rečenica i osobni glagol ide na SAM KRAJ: „Der Hahn tropft.“ → „…, weil der Hahn tropft.“ Ispred weil uvijek stoji zarez. Kod perfekta na kraj ide pomoćni glagol: „…, weil ich ein Foto gemacht habe.“",
      "weil znači „jer“. Posle weil počinje zavisna rečenica i lični glagol ide na SAM KRAJ: „Der Hahn tropft.“ → „…, weil der Hahn tropft.“ Ispred weil uvek stoji zarez. Kod perfekta na kraj ide pomoćni glagol: „…, weil ich ein Foto gemacht habe.“",
      "Nach weil beginnt ein Nebensatz: Das konjugierte Verb steht ganz am Ende. „Der Hahn tropft.“ → „…, weil der Hahn tropft.“ Vor weil steht immer ein Komma. Im Perfekt steht das Hilfsverb am Ende: „…, weil ich ein Foto gemacht habe.“",
    ),
    examples: [
      { de: "Ich rufe an, weil die Heizung kaputt ist.", tr: l("Zovem jer je grijanje pokvareno.", "Zovem jer je grijanje pokvareno.", "Zovem jer je grejanje pokvareno.", "ist → Ende") },
      { de: "Ich bin zu Hause, weil der Handwerker kommt.", tr: same("Kod kuće sam jer dolazi majstor.", "kommt → Ende") },
      { de: "Ich schreibe Ihnen, weil ich ein Problem habe.", tr: same("Pišem Vam jer imam problem.", "habe → Ende") },
    ],
  },
  exercises: [
    { id: "m1", kind: "match", hint: l("Pogledaj riječi gore.", "Pogledaj riječi gore.", "Pogledaj reči gore.", "Schau in die Wortliste."), pairs: [
      { de: "der Wasserhahn", tr: same("slavina", "Wasser kommt heraus") },
      { de: "die Heizung", tr: l("grijanje", "grijanje", "grejanje", "macht warm") },
      { de: "der Handwerker", tr: same("majstor", "repariert") },
      { de: "der Vermieter", tr: l("stanodavac", "najmodavac", "stanodavac", "Wohnung gehört ihm") },
    ] },
    { id: "g1", kind: "gap", sentence: "Ich rufe an, weil die Heizung kaputt ___.", options: ["ist", "sind", "bin"], answer: "ist",
      hint: l("Subjekt je die Heizung (ona).", "Subjekt je die Heizung (ono).", "Subjekat je die Heizung (ono).", "Subjekt: die Heizung (sie)."),
      explain: l("die Heizung → ist, i to na kraju rečenice poslije weil.", "die Heizung → ist, i to na kraju rečenice nakon weil.", "die Heizung → ist, i to na kraju rečenice posle weil.", "die Heizung → ist, am Ende des weil-Satzes.") },
    { id: "o1", kind: "order", words: ["Ich", "bin", "zu", "Hause,", "weil", "der", "Handwerker", "kommt."], answer: "Ich bin zu Hause, weil der Handwerker kommt.",
      hint: l("Poslije weil glagol ide na kraj.", "Nakon weil glagol ide na kraj.", "Posle weil glagol ide na kraj.", "Nach weil: Verb ans Ende."),
      explain: l("„kommt“ stoji na kraju jer je to weil-rečenica.", "„kommt“ stoji na kraju jer je to weil-rečenica.", "„kommt“ stoji na kraju jer je to weil-rečenica.", "„kommt“ steht am Ende, weil es ein weil-Satz ist.") },
    { id: "c1", kind: "choice", promptDe: "Wann passt es Ihnen?",
      prompt: l("Stanodavac pita. Koji odgovor odgovara?", "Najmodavac pita. Koji odgovor odgovara?", "Stanodavac pita. Koji odgovor odgovara?", "Der Vermieter fragt. Welche Antwort passt?"),
      options: ["Am Donnerstag ab 15 Uhr.", "Der Wasserhahn tropft.", "Ich wohne in der Gartenstraße."], answer: 0,
      hint: l("Pitanje je o vremenu.", "Pitanje je o vremenu.", "Pitanje je o vremenu.", "Die Frage ist nach der Zeit."),
      explain: l("Wann passt es Ihnen? = Kada Vam odgovara? → navodi dan i sat.", "Wann passt es Ihnen? = Kada Vam odgovara? → navodi dan i sat.", "Wann passt es Ihnen? = Kada Vam odgovara? → navodi dan i sat.", "Antwort mit Tag und Uhrzeit.") },
    { id: "g2", kind: "gap", sentence: "Ich habe schon ein Foto ___.", options: ["gemacht", "machen", "macht"], answer: "gemacht",
      hint: l("Perfekt: haben + particip (ge-…-t).", "Perfekt: haben + particip (ge-…-t).", "Perfekt: haben + particip (ge-…-t).", "Perfekt: haben + Partizip II."),
      explain: l("machen → gemacht. Particip ide na kraj.", "machen → gemacht. Particip ide na kraj.", "machen → gemacht. Particip ide na kraj.", "machen → gemacht; das Partizip steht am Ende.") },
    { id: "c2", kind: "choice",
      prompt: l("Šta je najbolji prvi korak kada nešto u iznajmljenom stanu pokvari?", "Što je najbolji prvi korak kada se nešto u unajmljenom stanu pokvari?", "Šta je najbolji prvi korak kada se nešto u iznajmljenom stanu pokvari?", "Was ist ein guter erster Schritt bei einem Schaden in der Mietwohnung?"),
      options: ["Den Vermieter informieren und den Schaden beschreiben.", "Nichts sagen.", "Sofort ausziehen."], answer: 0,
      hint: l("Stanodavac mora znati za kvar.", "Najmodavac mora znati za kvar.", "Stanodavac mora znati za kvar.", "Der Vermieter muss es wissen."),
      explain: l("Javi kvar stanodavcu i opiši ga (fotografija pomaže). Ovo je jezička vježba, ne pravni savjet.", "Javi kvar najmodavcu i opiši ga (fotografija pomaže). Ovo je jezična vježba, ne pravni savjet.", "Javi kvar stanodavcu i opiši ga (fotografija pomaže). Ovo je jezička vežba, ne pravni savet.", "Schaden melden und beschreiben (ein Foto hilft). Sprachübung, keine Rechtsberatung.") },
  ],
};

// ───────────────────────── B1 ─────────────────────────
const letter: PilotLesson = {
  id: "b1-core-08", legacyId: "b1-08", level: "B1", icon: "✉️", minutes: 14,
  titleDe: "Einen Behördenbrief verstehen",
  title: l("Razumjeti pismo od ureda", "Razumjeti dopis od ureda", "Razumeti pismo od službe", "Einen Behördenbrief verstehen"),
  scenario: l(
    "Damir Novak dobija izmišljeno pismo od ureda: „Ihr Antrag wird bearbeitet. Bitte reichen Sie die fehlenden Unterlagen bis zum 15. März ein.“ Uči kako da pronađe ključne informacije.",
    "Damir Novak dobiva izmišljeni dopis od ureda: „Ihr Antrag wird bearbeitet. Bitte reichen Sie die fehlenden Unterlagen bis zum 15. März ein.“ Uči kako pronaći ključne informacije.",
    "Damir Novak dobija izmišljeno pismo od službe: „Ihr Antrag wird bearbeitet. Bitte reichen Sie die fehlenden Unterlagen bis zum 15. März ein.“ Uči kako da pronađe ključne informacije.",
    "Damir Novak erhält einen erfundenen Brief: „Ihr Antrag wird bearbeitet. Bitte reichen Sie die fehlenden Unterlagen bis zum 15. März ein.“ Er lernt, die wichtigsten Informationen zu finden.",
  ),
  objectives: [
    l("Pronaći u pismu: ko piše, šta se traži i do kada", "Pronaći u dopisu: tko piše, što se traži i do kada", "Pronaći u pismu: ko piše, šta se traži i do kada", "Im Brief finden: Wer schreibt, was wird verlangt, bis wann?"),
    l("Razumjeti pasiv prezenta (wird bearbeitet)", "Razumjeti pasiv prezenta (wird bearbeitet)", "Razumeti pasiv prezenta (wird bearbeitet)", "Das Passiv im Präsens verstehen (wird bearbeitet)"),
    l("Razlikovati Frist, Aktenzeichen i Unterlagen", "Razlikovati Frist, Aktenzeichen i Unterlagen", "Razlikovati Frist, Aktenzeichen i Unterlagen", "Frist, Aktenzeichen und Unterlagen unterscheiden"),
  ],
  vocab: [
    { de: "Antrag", article: "der", plural: "die Anträge", tr: same("zahtjev", "formelle Bitte an ein Amt") },
    { de: "Frist", article: "die", plural: "die Fristen", tr: same("rok", "Zeitpunkt, bis wann etwas passieren muss") },
    { de: "Aktenzeichen", article: "das", plural: "die Aktenzeichen", tr: l("broj predmeta", "broj predmeta", "broj predmeta", "Nummer Ihres Vorgangs") },
    { de: "Unterlagen", plural: "(nur Plural)", tr: l("dokumenti, papiri", "dokumenti, papiri", "dokumenti, papiri", "Dokumente, Nachweise") },
    { de: "Nachweis", article: "der", plural: "die Nachweise", tr: same("dokaz", "Dokument als Beleg") },
    { de: "Bescheid", article: "der", plural: "die Bescheide", tr: same("rješenje (službena odluka)", "offizielle Entscheidung") },
    { de: "einreichen", tr: l("predati", "predati", "predati", "abgeben, schicken") },
    { de: "bearbeiten", tr: l("obrađivati", "obrađivati", "obrađivati", "prüfen und erledigen") },
  ],
  dialogue: [
    { speaker: "Damir", de: "Ich habe einen Brief bekommen und verstehe nicht alles.", tr: l("Dobio sam pismo i ne razumijem sve.", "Dobio sam dopis i ne razumijem sve.", "Dobio sam pismo i ne razumem sve.", "Damir bittet um Hilfe.") },
    { speaker: "Beraterin", de: "Schauen wir zuerst oben rechts: Dort steht das Aktenzeichen.", tr: same("Pogledajmo prvo gore desno: tu stoji broj predmeta.", "Aufbau des Briefs") },
    { speaker: "Damir", de: "Und was bedeutet „Ihr Antrag wird bearbeitet“?", tr: same("A šta znači „Ihr Antrag wird bearbeitet“?", "Frage nach dem Passiv") },
    { speaker: "Beraterin", de: "Das heißt: Das Amt prüft Ihren Antrag gerade.", tr: same("To znači: ured upravo provjerava Vaš zahtjev.", "Passiv → aktive Erklärung") },
    { speaker: "Damir", de: "Hier steht: bis zum 15. März. Ist das die Frist?", tr: same("Ovdje piše: do 15. marta. Je li to rok?", "Frist erkennen") },
    { speaker: "Beraterin", de: "Genau. Bis dahin sollen die fehlenden Unterlagen beim Amt sein.", tr: same("Tačno. Do tada nedostajući dokumenti treba da budu u uredu.", "Frist erklären") },
    { speaker: "Damir", de: "Was mache ich, wenn ich nicht alles rechtzeitig habe?", tr: l("Šta da radim ako nemam sve na vrijeme?", "Što učiniti ako nemam sve na vrijeme?", "Šta da radim ako nemam sve na vreme?", "Frage nach Optionen") },
    { speaker: "Beraterin", de: "Rufen Sie die Stelle im Brief an und fragen Sie mit dem Aktenzeichen nach.", tr: l("Nazovite službu iz pisma i pitajte navodeći broj predmeta.", "Nazovite službu iz dopisa i pitajte navodeći broj predmeta.", "Pozovite službu iz pisma i pitajte navodeći broj predmeta.", "Nachfragen mit Aktenzeichen") },
  ],
  grammar: {
    title: l("Pasiv prezenta: werden + particip", "Pasiv prezenta: werden + particip", "Pasiv prezenta: werden + particip", "Passiv Präsens: werden + Partizip II"),
    body: l(
      "Službena pisma često ne kažu KO radi, nego ŠTA se dešava: „Ihr Antrag wird bearbeitet“ (Vaš zahtjev se obrađuje). Oblik: werden (wird/werden) na drugom mjestu + particip na kraju. Ako trebaš znati ko, to je obično ured koji je potpisao pismo.",
      "Službeni dopisi često ne kažu TKO radi, nego ŠTO se događa: „Ihr Antrag wird bearbeitet“ (Vaš se zahtjev obrađuje). Oblik: werden (wird/werden) na drugom mjestu + particip na kraju. Ako trebaš znati tko, to je obično ured koji je potpisao dopis.",
      "Službena pisma često ne kažu KO radi, nego ŠTA se dešava: „Ihr Antrag wird bearbeitet“ (Vaš zahtev se obrađuje). Oblik: werden (wird/werden) na drugom mestu + particip na kraju. Ako treba da znaš ko, to je obično služba koja je potpisala pismo.",
      "Amtsbriefe nennen oft nicht, WER handelt, sondern WAS passiert: „Ihr Antrag wird bearbeitet.“ Form: werden (wird/werden) auf Position 2 + Partizip II am Ende. Wer handelt, ist meist die Stelle, die den Brief unterschrieben hat.",
    ),
    examples: [
      { de: "Ihr Antrag wird geprüft.", tr: same("Vaš zahtjev se provjerava.", "wird + geprüft") },
      { de: "Die Unterlagen werden nachgereicht.", tr: same("Dokumenti se naknadno dostavljaju.", "Plural: werden") },
      { de: "Der Bescheid wird Ihnen per Post zugeschickt.", tr: same("Rješenje će Vam biti poslano poštom.", "Dativ Ihnen") },
    ],
  },
  exercises: [
    { id: "m1", kind: "match", hint: l("Pogledaj riječi gore.", "Pogledaj riječi gore.", "Pogledaj reči gore.", "Schau in die Wortliste."), pairs: [
      { de: "die Frist", tr: same("rok", "bis wann") },
      { de: "das Aktenzeichen", tr: same("broj predmeta", "Nummer des Vorgangs") },
      { de: "der Bescheid", tr: same("rješenje", "Entscheidung") },
      { de: "der Antrag", tr: same("zahtjev", "formelle Bitte") },
    ] },
    { id: "g1", kind: "gap", sentence: "Ihr Antrag ___ bearbeitet.", options: ["wird", "werden", "ist"], answer: "wird",
      hint: l("Jedan zahtjev → jednina.", "Jedan zahtjev → jednina.", "Jedan zahtev → jednina.", "Ein Antrag → Singular."),
      explain: l("Pasiv prezenta: der Antrag → wird + bearbeitet.", "Pasiv prezenta: der Antrag → wird + bearbeitet.", "Pasiv prezenta: der Antrag → wird + bearbeitet.", "Passiv Präsens: der Antrag → wird + bearbeitet.") },
    { id: "g2", kind: "gap", sentence: "Die Unterlagen ___ geprüft.", options: ["werden", "wird", "wurde"], answer: "werden",
      hint: l("die Unterlagen je množina.", "die Unterlagen je množina.", "die Unterlagen je množina.", "die Unterlagen = Plural."),
      explain: l("Množina → werden.", "Množina → werden.", "Množina → werden.", "Plural → werden.") },
    { id: "c1", kind: "choice", promptDe: "Bitte reichen Sie die Unterlagen bis zum 15. März ein.",
      prompt: l("Šta je ovdje rok?", "Što je ovdje rok?", "Šta je ovde rok?", "Was ist hier die Frist?"),
      options: ["der 15. März", "die Unterlagen", "das Aktenzeichen"], answer: 0,
      hint: l("Rok odgovara na pitanje „do kada?“.", "Rok odgovara na pitanje „do kada?“.", "Rok odgovara na pitanje „do kada?“.", "Frist = bis wann?"),
      explain: l("„bis zum 15. März“ = do 15. marta. Uvijek pažljivo provjeri tačan datum u svom originalnom pismu.", "„bis zum 15. März“ = do 15. ožujka. Uvijek pažljivo provjeri točan datum u svom izvornom dopisu.", "„bis zum 15. März“ = do 15. marta. Uvek pažljivo proveri tačan datum u svom originalnom pismu.", "„bis zum 15. März“. Prüfe das genaue Datum immer im eigenen Originalbrief.") },
    { id: "o1", kind: "order", words: ["Der", "Bescheid", "wird", "per", "Post", "geschickt."], answer: "Der Bescheid wird per Post geschickt.",
      hint: l("wird na drugom mjestu, particip na kraju.", "wird na drugom mjestu, particip na kraju.", "wird na drugom mestu, particip na kraju.", "wird auf Position 2, Partizip am Ende."),
      explain: l("Pasiv: Der Bescheid (1) wird (2) … geschickt (kraj).", "Pasiv: Der Bescheid (1) wird (2) … geschickt (kraj).", "Pasiv: Der Bescheid (1) wird (2) … geschickt (kraj).", "Passiv: Der Bescheid (1) wird (2) … geschickt (Ende).") },
    { id: "c2", kind: "choice",
      prompt: l("Šta navodiš kad zoveš ured zbog pisma?", "Što navodiš kad zoveš ured zbog dopisa?", "Šta navodiš kad zoveš službu zbog pisma?", "Was nennst du am Telefon zuerst?"),
      options: ["das Aktenzeichen", "meine Lieblingsfarbe", "den Namen meines Nachbarn"], answer: 0,
      hint: l("Broj pomoću kojeg ured pronalazi tvoj predmet.", "Broj pomoću kojeg ured pronalazi tvoj predmet.", "Broj pomoću kojeg služba pronalazi tvoj predmet.", "Damit findet das Amt deinen Vorgang."),
      explain: l("Sa Aktenzeichen službenik brzo pronalazi tvoj predmet.", "S Aktenzeichen službenik brzo pronalazi tvoj predmet.", "Sa Aktenzeichen službenik brzo pronalazi tvoj predmet.", "Mit dem Aktenzeichen findet die Stelle deinen Vorgang schnell.") },
  ],
};

// ───────────────────────── B2 ─────────────────────────
const problem: PilotLesson = {
  id: "b2-core-02", legacyId: "b2-02", level: "B2", icon: "🧩", minutes: 15,
  titleDe: "Ein Problem schildern",
  title: l("Opisati problem", "Opisati problem", "Opisati problem", "Ein Problem schildern"),
  scenario: l(
    "Maja Kovač radi u logistici. Isporuka kasni drugi put zaredom i ona na sastanku objašnjava šefici uzrok, posljedice i prijedlog rješenja.",
    "Maja Kovač radi u logistici. Isporuka kasni drugi put zaredom i ona na sastanku objašnjava šefici uzrok, posljedice i prijedlog rješenja.",
    "Maja Kovač radi u logistici. Isporuka kasni drugi put zaredom i ona na sastanku objašnjava šefici uzrok, posledice i predlog rešenja.",
    "Maja Kovač arbeitet in der Logistik. Eine Lieferung ist zum zweiten Mal verspätet; im Meeting erklärt sie ihrer Chefin Ursache, Folgen und einen Lösungsvorschlag.",
  ),
  objectives: [
    l("Problem strukturirati: uzrok → posljedica → prijedlog", "Problem strukturirati: uzrok → posljedica → prijedlog", "Problem strukturirati: uzrok → posledica → predlog", "Ein Problem strukturieren: Ursache → Folge → Vorschlag"),
    l("Koristiti veznike obwohl, trotzdem, deshalb", "Koristiti veznike obwohl, trotzdem, deshalb", "Koristiti veznike obwohl, trotzdem, deshalb", "Konnektoren obwohl, trotzdem, deshalb sicher verwenden"),
    l("Diplomatski predložiti rješenje (Konjunktiv II)", "Diplomatski predložiti rješenje (Konjunktiv II)", "Diplomatski predložiti rešenje (Konjunktiv II)", "Diplomatisch vorschlagen (Konjunktiv II)"),
  ],
  vocab: [
    { de: "Ursache", article: "die", plural: "die Ursachen", tr: same("uzrok", "Grund eines Problems") },
    { de: "Folge", article: "die", plural: "die Folgen", tr: l("posljedica", "posljedica", "posledica", "Ergebnis, Wirkung") },
    { de: "Lieferung", article: "die", plural: "die Lieferungen", tr: same("isporuka", "Ware kommt an") },
    { de: "Verzögerung", article: "die", plural: "die Verzögerungen", tr: same("kašnjenje", "etwas kommt später") },
    { de: "Lösungsvorschlag", article: "der", plural: "die Lösungsvorschläge", tr: l("prijedlog rješenja", "prijedlog rješenja", "predlog rešenja", "Idee, wie man es löst") },
    { de: "Engpass", article: "der", plural: "die Engpässe", tr: l("usko grlo, nestašica", "usko grlo, nestašica", "usko grlo, nestašica", "es fehlt Kapazität") },
    { de: "sich auswirken auf", tr: same("uticati na", "Folgen haben für") },
    { de: "rechtzeitig", tr: l("na vrijeme", "na vrijeme", "na vreme", "pünktlich, nicht zu spät") },
  ],
  dialogue: [
    { speaker: "Frau Schulte", de: "Frau Kovač, was ist mit der Lieferung aus Hamburg los?", tr: same("Gospođo Kovač, šta je s isporukom iz Hamburga?", "Frage nach dem Problem") },
    { speaker: "Maja", de: "Sie verzögert sich um drei Tage. Die Ursache ist ein Engpass beim Spediteur.", tr: same("Kasni tri dana. Uzrok je usko grlo kod špeditera.", "Ursache nennen") },
    { speaker: "Frau Schulte", de: "Wie wirkt sich das auf unsere Kunden aus?", tr: same("Kako to utiče na naše kupce?", "Frage nach Folgen") },
    { speaker: "Maja", de: "Zwei Aufträge können wir nicht rechtzeitig ausliefern. Deshalb habe ich die Kunden schon informiert.", tr: l("Dvije narudžbe ne možemo isporučiti na vrijeme. Zato sam već obavijestila kupce.", "Dvije narudžbe ne možemo isporučiti na vrijeme. Zato sam već obavijestila kupce.", "Dve porudžbine ne možemo da isporučimo na vreme. Zato sam već obavestila kupce.", "deshalb + Verb auf Position 2") },
    { speaker: "Frau Schulte", de: "Das ist schon das zweite Mal.", tr: same("To je već drugi put.", "Kritik") },
    { speaker: "Maja", de: "Richtig. Obwohl wir früh bestellt haben, kam die Ware zu spät.", tr: same("Tačno. Iako smo rano naručili, roba je stigla prekasno.", "obwohl + Verb am Ende") },
    { speaker: "Maja", de: "Ich würde vorschlagen, dass wir einen zweiten Spediteur testen.", tr: l("Predložila bih da testiramo drugog špeditera.", "Predložila bih da testiramo drugog špeditera.", "Predložila bih da testiramo drugog špeditera.", "Konjunktiv II: höflicher Vorschlag") },
    { speaker: "Frau Schulte", de: "Gut, bereiten Sie bitte bis Freitag einen Vergleich vor.", tr: l("Dobro, pripremite molim Vas poređenje do petka.", "Dobro, pripremite molim Vas usporedbu do petka.", "Dobro, pripremite molim Vas poređenje do petka.", "Auftrag mit Frist") },
  ],
  grammar: {
    title: l("obwohl, trotzdem, deshalb: gdje stoji glagol?", "obwohl, trotzdem, deshalb: gdje stoji glagol?", "obwohl, trotzdem, deshalb: gde stoji glagol?", "obwohl, trotzdem, deshalb: Wo steht das Verb?"),
    body: l(
      "obwohl (iako) uvodi ZAVISNU rečenicu → glagol na kraj: „…, obwohl wir früh bestellt haben.“ trotzdem (ipak) i deshalb (zato) su PRILOZI: zauzimaju prvo mjesto, a glagol odmah slijedi na drugom mjestu: „Deshalb habe ich …“, „Trotzdem kam die Ware zu spät.“ Za uljudan prijedlog koristi Konjunktiv II: „Ich würde vorschlagen …“, „Wäre es möglich, …?“",
      "obwohl (iako) uvodi ZAVISNU rečenicu → glagol na kraj: „…, obwohl wir früh bestellt haben.“ trotzdem (ipak) i deshalb (zato) su PRILOZI: zauzimaju prvo mjesto, a glagol odmah slijedi na drugom mjestu: „Deshalb habe ich …“, „Trotzdem kam die Ware zu spät.“ Za uljudan prijedlog koristi Konjunktiv II: „Ich würde vorschlagen …“, „Wäre es möglich, …?“",
      "obwohl (iako) uvodi ZAVISNU rečenicu → glagol na kraj: „…, obwohl wir früh bestellt haben.“ trotzdem (ipak) i deshalb (zato) su PRILOZI: zauzimaju prvo mesto, a glagol odmah sledi na drugom mestu: „Deshalb habe ich …“, „Trotzdem kam die Ware zu spät.“ Za učtiv predlog koristi Konjunktiv II: „Ich würde vorschlagen …“, „Wäre es möglich, …?“",
      "obwohl leitet einen Nebensatz ein → Verb am Ende: „…, obwohl wir früh bestellt haben.“ trotzdem und deshalb sind Adverbien: Sie stehen auf Position 1, das Verb direkt danach auf Position 2: „Deshalb habe ich …“, „Trotzdem kam die Ware zu spät.“ Höfliche Vorschläge mit Konjunktiv II: „Ich würde vorschlagen …“, „Wäre es möglich, …?“",
    ),
    examples: [
      { de: "Obwohl wir früh bestellt haben, kam die Ware zu spät.", tr: same("Iako smo rano naručili, roba je stigla prekasno.", "obwohl → Verb Ende") },
      { de: "Wir haben früh bestellt. Trotzdem kam die Ware zu spät.", tr: same("Rano smo naručili. Ipak je roba stigla prekasno.", "trotzdem + Verb Pos. 2") },
      { de: "Der Spediteur hat einen Engpass. Deshalb verzögert sich die Lieferung.", tr: same("Špediter ima usko grlo. Zato isporuka kasni.", "deshalb + Verb Pos. 2") },
    ],
  },
  exercises: [
    { id: "m1", kind: "match", hint: l("Pogledaj riječi gore.", "Pogledaj riječi gore.", "Pogledaj reči gore.", "Schau in die Wortliste."), pairs: [
      { de: "die Ursache", tr: same("uzrok", "Grund") },
      { de: "die Folge", tr: l("posljedica", "posljedica", "posledica", "Wirkung") },
      { de: "die Verzögerung", tr: same("kašnjenje", "später") },
      { de: "der Engpass", tr: same("usko grlo", "Kapazität fehlt") },
    ] },
    { id: "g1", kind: "gap", sentence: "Wir haben früh bestellt. ___ kam die Ware zu spät.", options: ["Trotzdem", "Obwohl", "Weil"], answer: "Trotzdem",
      hint: l("Poslije praznine glagol odmah slijedi (kam).", "Nakon praznine glagol odmah slijedi (kam).", "Posle praznine glagol odmah sledi (kam).", "Nach der Lücke folgt direkt das Verb."),
      explain: l("Glagol „kam“ je na drugom mjestu → treba prilog trotzdem. obwohl/weil bi tražili glagol na kraju.", "Glagol „kam“ je na drugom mjestu → treba prilog trotzdem. obwohl/weil bi tražili glagol na kraju.", "Glagol „kam“ je na drugom mestu → treba prilog trotzdem. obwohl/weil bi tražili glagol na kraju.", "Verb auf Position 2 → Adverb trotzdem; obwohl/weil verlangen Verb-Endstellung.") },
    { id: "g2", kind: "gap", sentence: "Die Lieferung ist verspätet, ___ der Spediteur einen Engpass hat.", options: ["weil", "deshalb", "trotzdem"], answer: "weil",
      hint: l("Glagol „hat“ stoji na kraju.", "Glagol „hat“ stoji na kraju.", "Glagol „hat“ stoji na kraju.", "Das Verb „hat“ steht am Ende."),
      explain: l("Glagol na kraju → veznik zavisne rečenice (weil = jer).", "Glagol na kraju → veznik zavisne rečenice (weil = jer).", "Glagol na kraju → veznik zavisne rečenice (weil = jer).", "Verb am Ende → Subjunktion weil.") },
    { id: "o1", kind: "order", words: ["Deshalb", "habe", "ich", "die", "Kunden", "informiert."], answer: "Deshalb habe ich die Kunden informiert.",
      hint: l("Deshalb na prvo mjesto, glagol odmah poslije.", "Deshalb na prvo mjesto, glagol odmah nakon.", "Deshalb na prvo mesto, glagol odmah posle.", "Deshalb auf Pos. 1, dann das Verb."),
      explain: l("Deshalb (1) habe (2) ich … informiert (kraj).", "Deshalb (1) habe (2) ich … informiert (kraj).", "Deshalb (1) habe (2) ich … informiert (kraj).", "Deshalb (1) habe (2) ich … informiert (Ende).") },
    { id: "c1", kind: "choice",
      prompt: l("Koja formulacija prijedloga je najdiplomatskija?", "Koja formulacija prijedloga je najdiplomatskija?", "Koja formulacija predloga je najdiplomatskija?", "Welcher Vorschlag klingt am diplomatischsten?"),
      options: ["Ich würde vorschlagen, dass wir einen zweiten Spediteur testen.", "Wir nehmen jetzt einen anderen Spediteur.", "Der Spediteur ist schlecht."], answer: 0,
      hint: l("Traži Konjunktiv II.", "Traži Konjunktiv II.", "Traži Konjunktiv II.", "Suche den Konjunktiv II."),
      explain: l("„Ich würde vorschlagen …“ ublažava prijedlog i ostavlja prostor za odluku šefice.", "„Ich würde vorschlagen …“ ublažava prijedlog i ostavlja prostor za odluku šefice.", "„Ich würde vorschlagen …“ ublažava predlog i ostavlja prostor za odluku šefice.", "„Ich würde vorschlagen …“ ist höflich und lässt Raum für die Entscheidung.") },
    { id: "c2", kind: "choice",
      prompt: l("Koji redoslijed čini opis problema jasnim?", "Koji redoslijed čini opis problema jasnim?", "Koji redosled čini opis problema jasnim?", "Welche Reihenfolge macht die Schilderung klar?"),
      options: ["Ursache → Folge → Vorschlag", "Vorschlag → Kritik → Ende", "Folge → Entschuldigung → Ende"], answer: 0,
      hint: l("Prvo zašto, zatim šta to znači, onda šta raditi.", "Prvo zašto, zatim što to znači, onda što učiniti.", "Prvo zašto, zatim šta to znači, onda šta raditi.", "Erst warum, dann was es bedeutet, dann was tun."),
      explain: l("Na B2 nivou se očekuje strukturiran opis: uzrok, posljedica, prijedlog.", "Na razini B2 očekuje se strukturiran opis: uzrok, posljedica, prijedlog.", "Na nivou B2 očekuje se strukturiran opis: uzrok, posledica, predlog.", "Auf B2 erwartet man eine strukturierte Darstellung.") },
  ],
};

// ───────────────────────── C1 ─────────────────────────
const debate: PilotLesson = {
  id: "c1-core-05", legacyId: "c1-05", level: "C1", icon: "🎙️", minutes: 15,
  titleDe: "An einer Debatte teilnehmen",
  title: l("Učestvovati u debati", "Sudjelovati u raspravi", "Učestvovati u debati", "An einer Debatte teilnehmen"),
  scenario: l(
    "Na javnoj tribini u gradskoj biblioteci raspravlja se o pitanju: treba li grad trajno uvesti četverodnevnu radnu sedmicu za gradsku upravu? Damir Novak iznosi stav, priznaje protuargument i reaguje na upadicu.",
    "Na javnoj tribini u gradskoj knjižnici raspravlja se o pitanju: treba li grad trajno uvesti četverodnevni radni tjedan za gradsku upravu? Damir Novak iznosi stav, priznaje protuargument i reagira na upadicu.",
    "Na javnoj tribini u gradskoj biblioteci raspravlja se o pitanju: treba li grad trajno da uvede četvorodnevnu radnu nedelju za gradsku upravu? Damir Novak iznosi stav, priznaje kontraargument i reaguje na upadicu.",
    "Bei einer Podiumsdiskussion in der Stadtbibliothek geht es um die Frage, ob die Stadtverwaltung dauerhaft eine Vier-Tage-Woche einführen soll. Damir Novak bezieht Stellung, räumt ein Gegenargument ein und reagiert auf eine Unterbrechung.",
  ),
  objectives: [
    l("Iznijeti stav i potkrijepiti ga", "Iznijeti stav i potkrijepiti ga", "Izneti stav i potkrepiti ga", "Einen Standpunkt vertreten und begründen"),
    l("Priznati protuargument: zwar … aber, einräumen", "Priznati protuargument: zwar … aber, einräumen", "Priznati kontraargument: zwar … aber, einräumen", "Gegenargumente einräumen: zwar … aber"),
    l("Uljudno preuzeti riječ i vratiti se na temu", "Uljudno preuzeti riječ i vratiti se na temu", "Učtivo preuzeti reč i vratiti se na temu", "Höflich das Wort ergreifen und zum Thema zurückführen"),
  ],
  vocab: [
    { de: "Standpunkt", article: "der", plural: "die Standpunkte", tr: same("stav", "Meinung, Position") },
    { de: "Einwand", article: "der", plural: "die Einwände", tr: l("prigovor", "prigovor", "prigovor", "Gegenargument") },
    { de: "Befürworter", article: "der", plural: "die Befürworter", tr: same("zagovornik", "ist dafür") },
    { de: "Kritiker", article: "der", plural: "die Kritiker", tr: same("kritičar", "ist dagegen") },
    { de: "Stellung beziehen", tr: same("zauzeti stav", "Position nehmen") },
    { de: "einräumen", tr: same("priznati, dopustiti (argument)", "zugeben, dass etwas stimmt") },
    { de: "entkräften", tr: same("oslabiti, opovrgnuti", "ein Argument schwächen") },
    { de: "stichhaltig", tr: l("uvjerljiv, utemeljen", "uvjerljiv, utemeljen", "ubedljiv, utemeljen", "gut begründet") },
  ],
  dialogue: [
    { speaker: "Moderatorin", de: "Herr Novak, wie stehen Sie zur Vier-Tage-Woche in der Verwaltung?", tr: l("Gospodine Novak, kakav je Vaš stav o četverodnevnoj sedmici u upravi?", "Gospodine Novak, kakav je Vaš stav o četverodnevnom tjednu u upravi?", "Gospodine Novak, kakav je Vaš stav o četvorodnevnoj nedelji u upravi?", "Aufforderung zur Stellungnahme") },
    { speaker: "Damir", de: "Ich beziehe klar Stellung dafür, allerdings unter einer Bedingung.", tr: same("Jasno sam za, ali pod jednim uslovom.", "Position + Einschränkung") },
    { speaker: "Damir", de: "Zwar sinkt die Präsenzzeit, aber die Erreichbarkeit für Bürger muss gesichert bleiben.", tr: l("Doduše, smanjuje se vrijeme prisutnosti, ali dostupnost za građane mora ostati osigurana.", "Doduše, smanjuje se vrijeme prisutnosti, ali dostupnost za građane mora ostati osigurana.", "Doduše, smanjuje se vreme prisutnosti, ali dostupnost za građane mora ostati obezbeđena.", "zwar … aber") },
    { speaker: "Kritikerin", de: "Entschuldigung, aber das ist doch reines Wunschdenken!", tr: same("Izvinite, ali to je čisto pusto maštanje!", "Unterbrechung") },
    { speaker: "Damir", de: "Lassen Sie mich bitte kurz ausreden. Ihren Einwand nehme ich gern auf.", tr: l("Dozvolite mi da završim. Vaš prigovor rado preuzimam.", "Dopustite mi da završim. Vaš prigovor rado preuzimam.", "Dozvolite mi da završim. Vaš prigovor rado preuzimam.", "Rederecht sichern") },
    { speaker: "Damir", de: "Ich räume ein, dass Pilotprojekte nicht alles beweisen. Dennoch liefern sie erste Daten.", tr: same("Priznajem da pilot-projekti ne dokazuju sve. Ipak, daju prve podatke.", "einräumen + dennoch") },
    { speaker: "Moderatorin", de: "Wie würden Sie den Einwand der Kritiker entkräften?", tr: same("Kako biste opovrgnuli prigovor kritičara?", "Nachfrage") },
    { speaker: "Damir", de: "Indem man feste Servicezeiten und eine unabhängige Auswertung vereinbart.", tr: same("Tako što se dogovore fiksni termini usluga i nezavisna evaluacija.", "indem = Mittel/Weg") },
  ],
  grammar: {
    title: l("Konsesivne strukture i nominalni stil", "Koncesivne strukture i nominalni stil", "Koncesivne strukture i nominalni stil", "Konzessive Strukturen und Redemittel"),
    body: l(
      "Na C1 nivou ne kažeš samo „da/ne“, nego priznaješ dio protivne strane: „Zwar …, aber …“ (doduše …, ali …) – zwar stoji u prvoj rečenici, aber uvodi tvoju poentu. „Ich räume ein, dass …“ (glagol na kraj) zvuči formalnije. Prilozi dennoch/gleichwohl (ipak) zauzimaju prvo mjesto i traže glagol na drugom. „indem …“ objašnjava NAČIN: „…, indem man … vereinbart.“",
      "Na razini C1 ne kažeš samo „da/ne“, nego priznaješ dio protivne strane: „Zwar …, aber …“ (doduše …, ali …) – zwar stoji u prvoj rečenici, aber uvodi tvoju poantu. „Ich räume ein, dass …“ (glagol na kraj) zvuči formalnije. Prilozi dennoch/gleichwohl (ipak) zauzimaju prvo mjesto i traže glagol na drugom. „indem …“ objašnjava NAČIN: „…, indem man … vereinbart.“",
      "Na nivou C1 ne kažeš samo „da/ne“, nego priznaješ deo suprotne strane: „Zwar …, aber …“ (doduše …, ali …) – zwar stoji u prvoj rečenici, aber uvodi tvoju poentu. „Ich räume ein, dass …“ (glagol na kraj) zvuči formalnije. Prilozi dennoch/gleichwohl (ipak) zauzimaju prvo mesto i traže glagol na drugom. „indem …“ objašnjava NAČIN: „…, indem man … vereinbart.“",
      "Auf C1 räumt man Teile der Gegenposition ein: „Zwar …, aber …“ – zwar im ersten Teil, aber leitet die eigene Pointe ein. „Ich räume ein, dass …“ (Verb am Ende) ist formeller. dennoch/gleichwohl stehen auf Position 1 mit Verb auf Position 2. „indem …“ nennt das Mittel: „…, indem man … vereinbart.“",
    ),
    examples: [
      { de: "Zwar ist das Modell teuer, aber es spart langfristig Kosten.", tr: same("Doduše, model je skup, ali dugoročno štedi troškove.", "zwar … aber") },
      { de: "Ich räume ein, dass die Datenlage dünn ist.", tr: l("Priznajem da je podataka malo.", "Priznajem da je podataka malo.", "Priznajem da je podataka malo.", "dass → Verb Ende") },
      { de: "Dennoch halte ich den Versuch für sinnvoll.", tr: same("Ipak smatram pokušaj smislenim.", "dennoch + Verb Pos. 2") },
    ],
  },
  exercises: [
    { id: "m1", kind: "match", hint: l("Pogledaj riječi gore.", "Pogledaj riječi gore.", "Pogledaj reči gore.", "Schau in die Wortliste."), pairs: [
      { de: "der Einwand", tr: same("prigovor", "Gegenargument") },
      { de: "einräumen", tr: same("priznati", "zugeben") },
      { de: "entkräften", tr: same("opovrgnuti", "schwächen") },
      { de: "stichhaltig", tr: l("uvjerljiv", "uvjerljiv", "ubedljiv", "gut begründet") },
    ] },
    { id: "g1", kind: "gap", sentence: "___ ist das Modell teuer, aber es spart langfristig Kosten.", options: ["Zwar", "Obwohl", "Indem"], answer: "Zwar",
      hint: l("Druga polovina počinje sa aber.", "Druga polovica počinje s aber.", "Druga polovina počinje sa aber.", "Der zweite Teil beginnt mit aber."),
      explain: l("Par zwar … aber. Uz obwohl glagol bi bio na kraju i ne bi bilo aber.", "Par zwar … aber. Uz obwohl glagol bi bio na kraju i ne bi bilo aber.", "Par zwar … aber. Uz obwohl glagol bi bio na kraju i ne bi bilo aber.", "Paar zwar … aber; obwohl hätte Verb-Endstellung ohne aber.") },
    { id: "o1", kind: "order", words: ["Dennoch", "halte", "ich", "den", "Versuch", "für", "sinnvoll."], answer: "Dennoch halte ich den Versuch für sinnvoll.",
      hint: l("Dennoch na prvo mjesto, glagol drugi.", "Dennoch na prvo mjesto, glagol drugi.", "Dennoch na prvo mesto, glagol drugi.", "Dennoch Pos. 1, Verb Pos. 2."),
      explain: l("halten … für = smatrati nečim.", "halten … für = smatrati nečim.", "halten … für = smatrati nečim.", "etwas für sinnvoll halten.") },
    { id: "c1", kind: "choice",
      prompt: l("Neko te prekida. Koja reakcija je uljudna i odlučna?", "Netko te prekida. Koja je reakcija uljudna i odlučna?", "Neko te prekida. Koja reakcija je učtiva i odlučna?", "Jemand unterbricht dich. Welche Reaktion ist höflich und bestimmt?"),
      options: ["Lassen Sie mich bitte kurz ausreden.", "Seien Sie still!", "Das ist mir egal."], answer: 0,
      hint: l("Zadrži riječ bez napada.", "Zadrži riječ bez napada.", "Zadrži reč bez napada.", "Rederecht sichern ohne Angriff."),
      explain: l("Standardna formulacija u debatama; zatim preuzmi prigovor.", "Standardna formulacija u raspravama; zatim preuzmi prigovor.", "Standardna formulacija u debatama; zatim preuzmi prigovor.", "Übliches Redemittel; danach Einwand aufgreifen.") },
    { id: "g2", kind: "gap", sentence: "Man kann den Einwand entkräften, ___ man feste Servicezeiten vereinbart.", options: ["indem", "zwar", "dennoch"], answer: "indem",
      hint: l("Traži se NAČIN, glagol je na kraju.", "Traži se NAČIN, glagol je na kraju.", "Traži se NAČIN, glagol je na kraju.", "Gefragt ist das Mittel; Verb am Ende."),
      explain: l("indem = tako što / time što, uvodi zavisnu rečenicu.", "indem = tako što / time što, uvodi zavisnu rečenicu.", "indem = tako što / time što, uvodi zavisnu rečenicu.", "indem nennt das Mittel und leitet einen Nebensatz ein.") },
    { id: "c2", kind: "choice",
      prompt: l("Koja rečenica priznaje protuargument formalnim registrom?", "Koja rečenica priznaje protuargument formalnim registrom?", "Koja rečenica priznaje kontraargument formalnim registrom?", "Welcher Satz räumt formell ein?"),
      options: ["Ich räume ein, dass Pilotprojekte nicht alles beweisen.", "Ja ja, kann sein.", "Pilotprojekte sind egal."], answer: 0,
      hint: l("Traži glagol einräumen.", "Traži glagol einräumen.", "Traži glagol einräumen.", "Suche einräumen."),
      explain: l("„Ich räume ein, dass …“ je formalno i pokazuje da ozbiljno uzimaš drugu stranu.", "„Ich räume ein, dass …“ je formalno i pokazuje da ozbiljno uzimaš drugu stranu.", "„Ich räume ein, dass …“ je formalno i pokazuje da ozbiljno uzimaš drugu stranu.", "Formell und zeigt, dass man die Gegenseite ernst nimmt.") },
  ],
};

// ───────────────────────── C2 ─────────────────────────
const idioms: PilotLesson = {
  id: "c2-core-14", legacyId: "c2-14", level: "C2", icon: "🪶", minutes: 15,
  titleDe: "Metaphern und Idiome analysieren",
  title: l("Analizirati metafore i idiome", "Analizirati metafore i idiome", "Analizirati metafore i idiome", "Metaphern und Idiome analysieren"),
  scenario: l(
    "Maja Kovač čita izmišljeni komentar u novinama: „Die Reform wurde jahrelang auf die lange Bank geschoben; jetzt will der Senat reinen Tisch machen.“ Analizira značenje, registar i efekat idioma.",
    "Maja Kovač čita izmišljeni komentar u novinama: „Die Reform wurde jahrelang auf die lange Bank geschoben; jetzt will der Senat reinen Tisch machen.“ Analizira značenje, registar i učinak idioma.",
    "Maja Kovač čita izmišljeni komentar u novinama: „Die Reform wurde jahrelang auf die lange Bank geschoben; jetzt will der Senat reinen Tisch machen.“ Analizira značenje, registar i efekat idioma.",
    "Maja Kovač liest einen erfundenen Zeitungskommentar: „Die Reform wurde jahrelang auf die lange Bank geschoben; jetzt will der Senat reinen Tisch machen.“ Sie analysiert Bedeutung, Register und Wirkung der Idiome.",
  ),
  objectives: [
    l("Prepoznati prenesena značenja čestih njemačkih idioma", "Prepoznati prenesena značenja čestih njemačkih idioma", "Prepoznati preneta značenja čestih nemačkih idioma", "Übertragene Bedeutungen häufiger Idiome erkennen"),
    l("Procijeniti registar i efekat (ironija, kritika, eufemizam)", "Procijeniti registar i učinak (ironija, kritika, eufemizam)", "Proceniti registar i efekat (ironija, kritika, eufemizam)", "Register und Wirkung beurteilen (Ironie, Kritik, Euphemismus)"),
    l("Izbjeći lažne prijatelje i doslovne prevode", "Izbjeći lažne prijatelje i doslovne prijevode", "Izbeći lažne prijatelje i doslovne prevode", "Falsche Freunde und wörtliche Übersetzungen vermeiden"),
  ],
  vocab: [
    { de: "etwas auf die lange Bank schieben", tr: same("odgađati nešto (doslovno: gurnuti na dugu klupu)", "etwas immer wieder verschieben") },
    { de: "reinen Tisch machen", tr: l("raščistiti stvari", "raščistiti stvari", "raščistiti stvari", "Probleme klären und abschließen") },
    { de: "den Nagel auf den Kopf treffen", tr: l("pogoditi suštinu", "pogoditi bit", "pogoditi suštinu", "genau das Richtige sagen") },
    { de: "auf dem Holzweg sein", tr: l("biti na pogrešnom putu (u razmišljanju)", "biti na krivom putu (u razmišljanju)", "biti na pogrešnom putu (u razmišljanju)", "sich irren") },
    { de: "ins Fettnäpfchen treten", tr: l("napraviti gaf", "napraviti gaf", "napraviti gaf", "ungewollt etwas Peinliches sagen/tun") },
    { de: "Metapher", article: "die", plural: "die Metaphern", tr: same("metafora", "Bild statt wörtlicher Aussage") },
    { de: "Redewendung", article: "die", plural: "die Redewendungen", tr: same("izraz, frazem", "feste Wortverbindung") },
    { de: "Bildspender", article: "der", plural: "die Bildspender", tr: same("izvorni domen slike (odakle dolazi slika)", "Bereich, aus dem das Bild stammt") },
  ],
  dialogue: [
    { speaker: "Dozentin", de: "Was fällt Ihnen an dem Satz über die Reform auf?", tr: l("Šta Vam upada u oči u rečenici o reformi?", "Što Vam upada u oči u rečenici o reformi?", "Šta Vam upada u oči u rečenici o reformi?", "Analysefrage") },
    { speaker: "Maja", de: "Er arbeitet mit zwei Bildern aus dem Alltag: der Bank und dem Tisch.", tr: same("Radi sa dvije slike iz svakodnevice: klupom i stolom.", "Bildspender benennen") },
    { speaker: "Dozentin", de: "Und welche Wirkung hat das?", tr: l("A kakav efekat to ima?", "A kakav učinak to ima?", "A kakav efekat to ima?", "Frage nach Wirkung") },
    { speaker: "Maja", de: "„Auf die lange Bank schieben“ klingt vorwurfsvoll: Man unterstellt bewusste Verzögerung.", tr: l("„Auf die lange Bank schieben“ zvuči prijekorno: podrazumijeva namjerno odgađanje.", "„Auf die lange Bank schieben“ zvuči prijekorno: podrazumijeva namjerno odgađanje.", "„Auf die lange Bank schieben“ zvuči prekorno: podrazumeva namerno odlaganje.", "Wertung erkennen") },
    { speaker: "Dozentin", de: "Könnte man das wörtlich ins Bosnische übertragen?", tr: same("Može li se to doslovno prenijeti na bosanski?", "Übersetzungsfrage") },
    { speaker: "Maja", de: "Kaum. Man müsste ein Bild aus der Zielsprache wählen oder den Sinn paraphrasieren.", tr: same("Teško. Trebalo bi izabrati sliku iz ciljnog jezika ili parafrazirati smisao.", "Konjunktiv II: müsste") },
    { speaker: "Dozentin", de: "Damit treffen Sie den Nagel auf den Kopf.", tr: same("Time ste pogodili suštinu.", "Idiom in Funktion") },
  ],
  grammar: {
    title: l("Idiomi su fiksni: šta se smije mijenjati?", "Idiomi su fiksni: što se smije mijenjati?", "Idiomi su fiksni: šta sme da se menja?", "Idiome sind fest: Was ist variabel?"),
    body: l(
      "Idiom funkcioniše kao cjelina: riječi se ne mijenjaju slobodno („auf die lange Bank“, ne „auf die kurze Bank“). Promjenljivi su glagolsko vrijeme, lice i pasiv: „wurde … geschoben“. Neki idiomi ne podnose pasiv ili negaciju bez gubitka značenja. Kod analize pitaj: (1) doslovna slika, (2) preneseno značenje, (3) vrednovanje/registar, (4) funkcija u tekstu.",
      "Idiom funkcionira kao cjelina: riječi se ne mijenjaju slobodno („auf die lange Bank“, ne „auf die kurze Bank“). Promjenjivi su glagolsko vrijeme, osoba i pasiv: „wurde … geschoben“. Neki idiomi ne podnose pasiv ili negaciju bez gubitka značenja. Kod analize pitaj: (1) doslovna slika, (2) preneseno značenje, (3) vrednovanje/registar, (4) funkcija u tekstu.",
      "Idiom funkcioniše kao celina: reči se ne menjaju slobodno („auf die lange Bank“, ne „auf die kurze Bank“). Promenljivi su glagolsko vreme, lice i pasiv: „wurde … geschoben“. Neki idiomi ne podnose pasiv ili negaciju bez gubitka značenja. Kod analize pitaj: (1) doslovna slika, (2) preneseno značenje, (3) vrednovanje/registar, (4) funkcija u tekstu.",
      "Ein Idiom ist eine feste Einheit: Die Wörter sind nicht frei austauschbar („auf die lange Bank“, nicht „auf die kurze Bank“). Variabel sind Tempus, Person und oft das Passiv: „wurde … geschoben“. Manche Idiome vertragen Passiv oder Negation nicht ohne Bedeutungsverlust. Analysefragen: (1) wörtliches Bild, (2) übertragene Bedeutung, (3) Wertung/Register, (4) Funktion im Text.",
    ),
    examples: [
      { de: "Die Entscheidung wurde auf die lange Bank geschoben.", tr: same("Odluka je odgađana.", "Passiv möglich") },
      { de: "Er ist mit dieser Annahme auf dem Holzweg.", tr: l("S tom pretpostavkom je na pogrešnom putu.", "S tom pretpostavkom je na krivom putu.", "S tom pretpostavkom je na pogrešnom putu.", "Bedeutung: sich irren") },
      { de: "Mit der Bemerkung ist sie ins Fettnäpfchen getreten.", tr: same("Tom primjedbom je napravila gaf.", "Perfekt mit sein") },
    ],
  },
  exercises: [
    { id: "m1", kind: "match", hint: l("Pogledaj izraze gore.", "Pogledaj izraze gore.", "Pogledaj izraze gore.", "Schau in die Liste."), pairs: [
      { de: "auf dem Holzweg sein", tr: l("pogrešno misliti", "krivo misliti", "pogrešno misliti", "sich irren") },
      { de: "reinen Tisch machen", tr: same("raščistiti stvari", "klären") },
      { de: "ins Fettnäpfchen treten", tr: same("napraviti gaf", "peinlich") },
      { de: "den Nagel auf den Kopf treffen", tr: l("pogoditi suštinu", "pogoditi bit", "pogoditi suštinu", "genau richtig") },
    ] },
    { id: "g1", kind: "gap", sentence: "Die Reform wurde jahrelang auf die lange ___ geschoben.", options: ["Bank", "Tisch", "Straße"], answer: "Bank",
      hint: l("Idiom je fiksan.", "Idiom je fiksan.", "Idiom je fiksan.", "Das Idiom ist fest."),
      explain: l("Fiksni izraz: etwas auf die lange Bank schieben = odgađati.", "Fiksni izraz: etwas auf die lange Bank schieben = odgađati.", "Fiksni izraz: etwas auf die lange Bank schieben = odlagati.", "Feste Wendung: auf die lange Bank schieben.") },
    { id: "c1", kind: "choice", promptDe: "Die Reform wurde auf die lange Bank geschoben.",
      prompt: l("Kakav je stav autora?", "Kakav je stav autora?", "Kakav je stav autora?", "Welche Haltung zeigt der Autor?"),
      options: ["kritisch: unnötige Verzögerung", "neutral: Information über den Ort", "lobend: kluge Geduld"], answer: 0,
      hint: l("Da li „duga klupa“ zvuči pozitivno?", "Zvuči li „duga klupa“ pozitivno?", "Da li „duga klupa“ zvuči pozitivno?", "Klingt das positiv?"),
      explain: l("Idiom nosi prijekor: odgađanje se predstavlja kao nepotrebno.", "Idiom nosi prijekor: odgađanje se predstavlja kao nepotrebno.", "Idiom nosi prekor: odlaganje se predstavlja kao nepotrebno.", "Die Wendung enthält einen Vorwurf.") },
    { id: "c2", kind: "choice",
      prompt: l("Najbolji prevod „Er ist auf dem Holzweg“ na bosanski je:", "Najbolji prijevod „Er ist auf dem Holzweg“ na hrvatski je:", "Najbolji prevod „Er ist auf dem Holzweg“ na srpski je:", "Die beste Paraphrase von „Er ist auf dem Holzweg“ ist:"),
      options: [
        "Er irrt sich.",
        "Er geht durch den Wald.",
        "Er arbeitet mit Holz.",
      ], answer: 0,
      hint: l("Ne prevodi doslovno.", "Ne prevodi doslovno.", "Ne prevodi doslovno.", "Nicht wörtlich verstehen."),
      explain: l("Preneseno značenje: griješi (na pogrešnom je putu u razmišljanju).", "Preneseno značenje: griješi (na krivom je putu u razmišljanju).", "Preneseno značenje: greši (na pogrešnom je putu u razmišljanju).", "Übertragen: sich irren.") },
    { id: "o1", kind: "order", words: ["Damit", "treffen", "Sie", "den", "Nagel", "auf", "Kopf."], answer: "Damit treffen Sie den Nagel auf Kopf.",
      hint: l("Pažljivo: provjeri da li izrazu nešto nedostaje.", "Pažljivo: provjeri nedostaje li izrazu nešto.", "Pažljivo: proveri da li izrazu nešto nedostaje.", "Achtung: Fehlt etwas?"),
      explain: l("Ova vježba namjerno pokazuje skraćen redoslijed riječi; potpuni idiom glasi „den Nagel auf DEN Kopf treffen“.", "Ova vježba namjerno pokazuje skraćen redoslijed riječi; potpuni idiom glasi „den Nagel auf DEN Kopf treffen“.", "Ova vežba namerno pokazuje skraćen redosled reči; potpuni idiom glasi „den Nagel auf DEN Kopf treffen“.", "Vollständig: „den Nagel auf den Kopf treffen“.") },
    { id: "g2", kind: "gap", sentence: "Mit dieser Bemerkung ist sie ins ___ getreten.", options: ["Fettnäpfchen", "Wasser", "Holz"], answer: "Fettnäpfchen",
      hint: l("Idiom za gaf.", "Idiom za gaf.", "Idiom za gaf.", "Idiom für eine Peinlichkeit."),
      explain: l("ins Fettnäpfchen treten = napraviti gaf; perfekt sa sein.", "ins Fettnäpfchen treten = napraviti gaf; perfekt sa sein.", "ins Fettnäpfchen treten = napraviti gaf; perfekat sa sein.", "Perfekt mit sein: ist … getreten.") },
  ],
};

export const AUTHORED_CORE_LESSONS: PilotLesson[] = [landlord, letter, problem, debate, idioms];

/** Every standardized (authored) core lesson including the two A1 pilots. */
export const STANDARDIZED_LESSONS: PilotLesson[] = [...A1_PILOT_LESSONS, ...AUTHORED_CORE_LESSONS];

export function getStandardizedFor(legacyId: string | null | undefined): PilotLesson | undefined {
  if (!legacyId) return undefined;
  return STANDARDIZED_LESSONS.find((s) => s.legacyId === legacyId);
}

export type { PilotLocale };
