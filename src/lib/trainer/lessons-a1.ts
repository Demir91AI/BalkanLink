import type { Lesson } from "./types";

export const lessonsA1: Lesson[] = [
  {
    id: "a1-01-arzt", level: "A1", title: "Arzttermin", titleDe: "Beim Arzt", icon: "🩺", premium: false,
    exercises: [
      { type: "multiple_choice", situation: "Du bist beim Arzt. Die Sprechstundenhilfe fragt dich etwas.", question: "Haben Sie Ihre Versichertenkarte dabei?", options: ["Ja, hier bitte.", "Ich bin krank.", "Nein, ich habe Hunger."], answer: 0, explanation: "Die Versichertenkarte brauchst du bei jedem Arztbesuch." },
      { type: "sort_sentence", situation: "Du beschreibst dem Arzt dein Problem.", question: "Bringe den Satz in die richtige Reihenfolge:", options: ["habe", "Kopfschmerzen", "Ich", "seit", "gestern"], answer: [2, 0, 3, 4, 1], explanation: "Richtig: Ich habe seit gestern Kopfschmerzen." },
      { type: "fill_blank", situation: "Der Arzt fragt nach deinen Beschwerden.", question: "Mir ___ der Bauch weh.", options: ["tut", "macht", "ist"], answer: "tut", explanation: "„Mir tut … weh" ist die korrekte Formulierung." },
      { type: "quick_reaction", situation: "Der Arzt sagt: Bitte machen Sie den Oberkörper frei.", question: "Was machst du?", options: ["T-Shirt ausziehen", "Schuhe ausziehen", "Sich hinsetzen"], answer: 0, explanation: "Oberkörper frei machen = T-Shirt/Hemd ausziehen." },
      { type: "multiple_choice", situation: "Du brauchst ein Rezept.", question: "Wie fragst du nach einem Rezept?", options: ["Können Sie mir ein Rezept schreiben?", "Ich will Tabletten.", "Wo ist die Apotheke?"], answer: 0, explanation: "Höfliche Frage mit „Können Sie…" ist korrekt." },
    ],
  },
  {
    id: "a1-02-supermarkt", level: "A1", title: "Supermarkt", titleDe: "Im Supermarkt", icon: "🛒", premium: false,
    exercises: [
      { type: "multiple_choice", situation: "Du bist an der Kasse.", question: "Die Kassiererin fragt: Brauchen Sie eine Tüte?", options: ["Ja, bitte.", "Ich zahle mit Karte.", "Wo ist das Brot?"], answer: 0, explanation: "„Ja, bitte" ist die passende Antwort auf die Frage." },
      { type: "fill_blank", situation: "Du suchst etwas im Supermarkt.", question: "Entschuldigung, wo ___ ich Milch?", options: ["finde", "kaufe", "brauche"], answer: "finde", explanation: "„Wo finde ich…?" ist die übliche Frage im Supermarkt." },
      { type: "sort_sentence", situation: "Du fragst nach dem Preis.", question: "Bringe den Satz in die richtige Reihenfolge:", options: ["kostet", "Wie", "das", "viel"], answer: [1, 3, 0, 2], explanation: "Richtig: Wie viel kostet das?" },
      { type: "quick_reaction", situation: "Die Kassiererin sagt: Das macht 7,50 Euro.", question: "Wie reagierst du?", options: ["Bezahlen", "Fragen: Ist das teuer?", "Wegrennen"], answer: 0, explanation: "Du bezahlst den genannten Betrag." },
      { type: "multiple_choice", situation: "Du willst mit Karte bezahlen.", question: "Was sagst du?", options: ["Kann ich mit Karte zahlen?", "Ich habe kein Geld.", "Nehmen Sie Dollar?"], answer: 0, explanation: "Höflich fragen, ob Kartenzahlung möglich ist." },
    ],
  },
  {
    id: "a1-03-vorstellung", level: "A1", title: "Vorstellung", titleDe: "Sich vorstellen", icon: "👋", premium: false,
    exercises: [
      { type: "multiple_choice", situation: "Du triffst deinen neuen Nachbarn.", question: "Was sagst du zuerst?", options: ["Hallo, ich bin Max. Ich wohne nebenan.", "Wie ist die Miete hier?", "Haben Sie WLAN?"], answer: 0, explanation: "Sich zuerst vorstellen ist höflich." },
      { type: "fill_blank", situation: "Jemand fragt: Woher kommst du?", question: "Ich ___ aus Bosnien.", options: ["komme", "bin", "gehe"], answer: "komme", explanation: "„Ich komme aus…" ist die Standard-Formulierung." },
      { type: "sort_sentence", situation: "Du stellst dich bei der Arbeit vor.", question: "Bringe den Satz in die richtige Reihenfolge:", options: ["bin", "Ich", "der", "neue", "Kollege"], answer: [1, 0, 2, 3, 4], explanation: "Richtig: Ich bin der neue Kollege." },
      { type: "quick_reaction", situation: "Jemand sagt: Freut mich!", question: "Wie antwortest du?", options: ["Mich auch!", "Danke!", "Tschüss!"], answer: 0, explanation: "„Mich auch!" oder „Freut mich auch!" ist die übliche Antwort." },
      { type: "multiple_choice", situation: "Du musst deinen Beruf nennen.", question: "Wie sagst du es?", options: ["Ich arbeite als Elektriker.", "Ich will Geld.", "Arbeit ist gut."], answer: 0, explanation: "„Ich arbeite als…" nennt den Beruf korrekt." },
    ],
  },
  {
    id: "a1-04-wohnung", level: "A1", title: "Wohnung suchen", titleDe: "Wohnung suchen", icon: "🏠", premium: false,
    exercises: [
      { type: "multiple_choice", situation: "Du liest eine Wohnungsanzeige.", question: "Was bedeutet „2 ZKB"?", options: ["2 Zimmer, Küche, Bad", "2 Zimmer, kein Balkon", "2 Zimmer, Keller, Balkon"], answer: 0, explanation: "ZKB steht für Zimmer, Küche, Bad." },
      { type: "fill_blank", situation: "Du rufst wegen einer Wohnung an.", question: "Ich ___ mich für die Wohnung in der Hauptstraße.", options: ["interessiere", "frage", "möchte"], answer: "interessiere", explanation: "„Ich interessiere mich für…" ist die passende Formulierung." },
      { type: "sort_sentence", situation: "Du fragst nach der Miete.", question: "Bringe den Satz in die richtige Reihenfolge:", options: ["die", "Wie", "hoch", "Miete", "ist"], answer: [1, 2, 4, 0, 3], explanation: "Richtig: Wie hoch ist die Miete?" },
      { type: "quick_reaction", situation: "Der Vermieter fragt: Wann möchten Sie einziehen?", question: "Was antwortest du?", options: ["Ab dem 1. nächsten Monat.", "Sofort, jetzt!", "Ich weiß nicht."], answer: 0, explanation: "Ein konkretes Datum nennen ist professionell." },
      { type: "multiple_choice", situation: "Du besichtigst eine Wohnung.", question: "Was fragst du?", options: ["Sind die Nebenkosten inklusive?", "Kann ich die Wand einreißen?", "Wohnen hier nette Leute?"], answer: 0, explanation: "Nebenkosten sind eine wichtige Frage bei der Besichtigung." },
    ],
  },
  {
    id: "a1-05-behoerde", level: "A1", title: "Behörde", titleDe: "Auf der Behörde", icon: "🏛️", premium: false,
    exercises: [
      { type: "multiple_choice", situation: "Du bist beim Bürgeramt.", question: "Was brauchst du für die Anmeldung?", options: ["Personalausweis und Mietvertrag", "Nur meinen Namen", "Einen Führerschein"], answer: 0, explanation: "Für die Anmeldung brauchst du einen Ausweis und den Mietvertrag." },
      { type: "fill_blank", situation: "Du stehst am Empfang.", question: "Ich möchte mich bitte ___.", options: ["anmelden", "melden", "einmelden"], answer: "anmelden", explanation: "„Sich anmelden" ist der korrekte Begriff beim Bürgeramt." },
      { type: "sort_sentence", situation: "Du fragst nach einem Formular.", question: "Bringe den Satz in die richtige Reihenfolge:", options: ["mir", "Können", "ein", "Formular", "Sie", "geben"], answer: [1, 4, 0, 2, 3, 5], explanation: "Richtig: Können Sie mir ein Formular geben?" },
      { type: "quick_reaction", situation: "Der Beamte sagt: Bitte nehmen Sie im Wartebereich Platz.", question: "Was machst du?", options: ["Im Wartebereich hinsetzen", "Sofort zum Schalter gehen", "Das Gebäude verlassen"], answer: 0, explanation: "Du setzt dich in den Wartebereich und wartest." },
      { type: "multiple_choice", situation: "Du brauchst eine Bescheinigung.", question: "Wie fragst du danach?", options: ["Könnte ich bitte eine Meldebescheinigung bekommen?", "Geben Sie mir ein Papier!", "Ich brauche irgendwas."], answer: 0, explanation: "Höflich und konkret fragen ist am besten." },
    ],
  },
  {
    id: "a1-06-restaurant", level: "A1", title: "Restaurant", titleDe: "Im Restaurant", icon: "🍽️", premium: false,
    exercises: [
      { type: "multiple_choice", situation: "Du möchtest bestellen.", question: "Was sagst du zum Kellner?", options: ["Ich hätte gerne eine Suppe, bitte.", "Essen! Schnell!", "Was gibt es?"], answer: 0, explanation: "„Ich hätte gerne…" ist die höfliche Bestellform." },
      { type: "fill_blank", situation: "Du möchtest bezahlen.", question: "Könnte ich bitte die ___ haben?", options: ["Rechnung", "Karte", "Speise"], answer: "Rechnung", explanation: "Man fragt nach der Rechnung, wenn man bezahlen möchte." },
      { type: "sort_sentence", situation: "Du fragst nach der Empfehlung.", question: "Bringe den Satz in die richtige Reihenfolge:", options: ["empfehlen", "Was", "Sie", "können", "mir"], answer: [1, 3, 2, 4, 0], explanation: "Richtig: Was können Sie mir empfehlen?" },
      { type: "quick_reaction", situation: "Der Kellner fragt: Möchten Sie noch etwas trinken?", question: "Wie reagierst du?", options: ["Nein, danke. Das war alles.", "Vielleicht.", "Ich habe Durst."], answer: 0, explanation: "Eine klare Antwort gibt dem Kellner Bescheid." },
      { type: "multiple_choice", situation: "Das Essen ist kalt.", question: "Wie beschwerst du dich höflich?", options: ["Entschuldigung, das Essen ist leider kalt.", "Das Essen ist schlecht!", "Ich will den Chef sprechen!"], answer: 0, explanation: "Höflich und sachlich reklamieren ist professionell." },
    ],
  },
  {
    id: "a1-07-wegbeschreibung", level: "A1", title: "Weg fragen", titleDe: "Nach dem Weg fragen", icon: "🗺️", premium: false,
    exercises: [
      { type: "multiple_choice", situation: "Du bist in einer fremden Stadt.", question: "Wie fragst du nach dem Weg?", options: ["Entschuldigung, wie komme ich zum Bahnhof?", "Wo bin ich?", "Ist das hier schön?"], answer: 0, explanation: "„Wie komme ich zum/zur…?" ist die Standardfrage." },
      { type: "fill_blank", situation: "Jemand erklärt dir den Weg.", question: "Gehen Sie ___ und dann links.", options: ["geradeaus", "zurück", "schnell"], answer: "geradeaus", explanation: "„Geradeaus" bedeutet, dass du einfach weitergehen sollst." },
      { type: "sort_sentence", situation: "Du fragst nach der nächsten Apotheke.", question: "Bringe den Satz in die richtige Reihenfolge:", options: ["nächste", "Wo", "die", "ist", "Apotheke"], answer: [1, 3, 2, 0, 4], explanation: "Richtig: Wo ist die nächste Apotheke?" },
      { type: "quick_reaction", situation: "Jemand sagt: Es ist gleich um die Ecke.", question: "Was bedeutet das?", options: ["Es ist ganz in der Nähe.", "Es ist weit weg.", "Du musst den Bus nehmen."], answer: 0, explanation: "„Gleich um die Ecke" bedeutet sehr nah." },
      { type: "multiple_choice", situation: "Du bedankst dich für die Hilfe.", question: "Was sagst du?", options: ["Vielen Dank für Ihre Hilfe!", "Okay, tschüss.", "Geht so."], answer: 0, explanation: "Sich höflich bedanken gehört zum guten Umgangston." },
    ],
  },
  {
    id: "a1-08-bus-bahn", level: "A1", title: "Bus und Bahn", titleDe: "Bus und Bahn", icon: "🚌", premium: false,
    exercises: [
      { type: "multiple_choice", situation: "Du willst ein Ticket kaufen.", question: "Was sagst du am Schalter?", options: ["Eine Einzelfahrkarte nach Berlin, bitte.", "Ich will fahren.", "Wann kommt der Bus?"], answer: 0, explanation: "„Eine Einzelfahrkarte nach…" ist die korrekte Bestellung." },
      { type: "fill_blank", situation: "Du fragst nach der Abfahrtszeit.", question: "Wann ___ der nächste Zug nach München?", options: ["fährt", "geht", "kommt"], answer: "fährt", explanation: "Züge und Busse „fahren" – nicht „gehen"." },
      { type: "sort_sentence", situation: "Du fragst nach dem Gleis.", question: "Bringe den Satz in die richtige Reihenfolge:", options: ["welchem", "Von", "fährt", "Gleis", "der", "Zug"], answer: [1, 0, 3, 2, 4, 5], explanation: "Richtig: Von welchem Gleis fährt der Zug?" },
      { type: "quick_reaction", situation: "Die Durchsage sagt: Bitte Türen freihalten!", question: "Was machst du?", options: ["Von der Tür weggehen", "Die Tür festhalten", "Schnell einsteigen"], answer: 0, explanation: "„Türen freihalten" bedeutet: Nicht an der Tür stehen." },
      { type: "multiple_choice", situation: "Du hast den falschen Zug genommen.", question: "Was sagst du zum Schaffner?", options: ["Entschuldigung, ich bin im falschen Zug.", "Dieser Zug gefällt mir nicht.", "Bringen Sie mich nach Hause."], answer: 0, explanation: "Ruhig und klar den Fehler erklären." },
    ],
  },
  {
    id: "a1-09-zahlen-uhrzeit", level: "A1", title: "Zahlen & Uhrzeit", titleDe: "Zahlen und Uhrzeit", icon: "🕐", premium: false,
    exercises: [
      { type: "multiple_choice", situation: "Jemand fragt: Wie spät ist es?", question: "Die Uhr zeigt 14:30. Was sagst du?", options: ["Es ist halb drei.", "Es ist zwei Uhr dreißig.", "Es ist vierzehn Uhr."], answer: 0, explanation: "„Halb drei" ist die umgangssprachliche Form für 14:30." },
      { type: "fill_blank", situation: "Du sagst deine Telefonnummer.", question: "Meine Nummer ist null-eins-sieben-zwei ___ fünf-sechs.", options: ["drei-vier", "dreivierundfünf", "34"], answer: "drei-vier", explanation: "Telefonnummern werden einzeln oder in Zweiergruppen gesprochen." },
      { type: "sort_sentence", situation: "Du vereinbarst eine Uhrzeit.", question: "Bringe den Satz in die richtige Reihenfolge:", options: ["um", "Treffen", "acht", "wir", "uns"], answer: [1, 3, 4, 0, 2], explanation: "Richtig: Treffen wir uns um acht?" },
      { type: "quick_reaction", situation: "Jemand sagt: Viertel vor zehn.", question: "Wie spät ist es?", options: ["9:45", "10:15", "10:45"], answer: 0, explanation: "„Viertel vor zehn" = 9:45 Uhr." },
      { type: "multiple_choice", situation: "Du nennst dein Geburtsdatum.", question: "Wie sagst du es?", options: ["Ich bin am fünfzehnten März geboren.", "Mein Datum ist 15.3.", "Ich bin März."], answer: 0, explanation: "„Ich bin am … geboren" ist die korrekte Formulierung." },
    ],
  },
  {
    id: "a1-10-familie", level: "A1", title: "Familie", titleDe: "Meine Familie", icon: "👨‍👩‍👧", premium: false,
    exercises: [
      { type: "multiple_choice", situation: "Jemand fragt dich nach deiner Familie.", question: "Was sagst du?", options: ["Ich habe zwei Geschwister – einen Bruder und eine Schwester.", "Familie ist wichtig.", "Meine Eltern wohnen."], answer: 0, explanation: "Konkret antworten: Anzahl und Familienmitglieder nennen." },
      { type: "fill_blank", situation: "Du erzählst von deinen Eltern.", question: "Mein Vater ___ als Ingenieur.", options: ["arbeitet", "macht", "geht"], answer: "arbeitet", explanation: "„Mein Vater arbeitet als…" beschreibt den Beruf." },
      { type: "sort_sentence", situation: "Du stellst deine Familie vor.", question: "Bringe den Satz in die richtige Reihenfolge:", options: ["und", "Ich", "verheiratet", "bin", "habe", "zwei", "Kinder"], answer: [1, 3, 2, 0, 4, 5, 6], explanation: "Richtig: Ich bin verheiratet und habe zwei Kinder." },
      { type: "quick_reaction", situation: "Jemand fragt: Haben Sie Kinder?", question: "Wie antwortest du?", options: ["Ja, einen Sohn und eine Tochter.", "Kinder sind schön.", "Vielleicht."], answer: 0, explanation: "Konkret antworten mit Anzahl und Geschlecht." },
      { type: "multiple_choice", situation: "Du sprichst über deine Schwester.", question: "Was sagst du?", options: ["Meine Schwester ist jünger als ich.", "Schwester gut.", "Ich habe Schwester."], answer: 0, explanation: "Vollständige Sätze mit Artikel und Verb verwenden." },
    ],
  },
  // Lessons 11-40+ (premium starts after 10)
  {
    id: "a1-11-einkaufen", level: "A1", title: "Kleidung kaufen", titleDe: "Kleidung einkaufen", icon: "👕", premium: true,
    exercises: [
      { type: "multiple_choice", situation: "Du bist in einem Bekleidungsgeschäft.", question: "Was sagst du zur Verkäuferin?", options: ["Haben Sie das in Größe M?", "Ich will ein T-Shirt.", "Ist das neu?"], answer: 0, explanation: "Nach der Größe fragen ist beim Kleidungskauf üblich." },
      { type: "fill_blank", situation: "Du möchtest etwas anprobieren.", question: "Kann ich das bitte ___?", options: ["anprobieren", "kaufen", "sehen"], answer: "anprobieren", explanation: "„Anprobieren" bedeutet, die Kleidung zu testen." },
      { type: "sort_sentence", situation: "Du sagst, was du suchst.", question: "Bringe den Satz in die richtige Reihenfolge:", options: ["eine", "Ich", "suche", "warme", "Jacke"], answer: [1, 2, 0, 3, 4], explanation: "Richtig: Ich suche eine warme Jacke." },
      { type: "quick_reaction", situation: "Die Verkäuferin fragt: Passt es?", question: "Wie antwortest du?", options: ["Ja, es passt gut. Ich nehme es.", "Vielleicht.", "Nein, ich mag es nicht."], answer: 0, explanation: "Klare Antwort, ob die Kleidung passt." },
    ],
  },
  {
    id: "a1-12-apotheke", level: "A1", title: "Apotheke", titleDe: "In der Apotheke", icon: "💊", premium: true,
    exercises: [
      { type: "multiple_choice", situation: "Du hast Kopfschmerzen.", question: "Was sagst du in der Apotheke?", options: ["Ich hätte gerne etwas gegen Kopfschmerzen.", "Ich bin krank.", "Haben Sie Medikamente?"], answer: 0, explanation: "Konkret das Symptom nennen hilft dem Apotheker." },
      { type: "fill_blank", situation: "Du fragst nach der Dosierung.", question: "Wie ___ muss ich die Tabletten nehmen?", options: ["oft", "viel", "lange"], answer: "oft", explanation: "„Wie oft?" fragt nach der Häufigkeit der Einnahme." },
      { type: "sort_sentence", situation: "Du beschreibst deine Symptome.", question: "Bringe den Satz in die richtige Reihenfolge:", options: ["habe", "Ich", "Halsschmerzen", "seit", "zwei", "Tagen"], answer: [1, 0, 3, 4, 5, 2], explanation: "Richtig: Ich habe seit zwei Tagen Halsschmerzen." },
      { type: "quick_reaction", situation: "Der Apotheker sagt: Nehmen Sie dreimal täglich eine Tablette.", question: "Wie oft nimmst du die Tablette?", options: ["3 Mal am Tag", "3 Tabletten auf einmal", "Einmal am Tag"], answer: 0, explanation: "Dreimal täglich = morgens, mittags, abends." },
      { type: "multiple_choice", situation: "Du brauchst ein verschreibungspflichtiges Medikament.", question: "Was sagt der Apotheker?", options: ["Dafür brauche ich ein Rezept vom Arzt.", "Nehmen Sie es einfach.", "Das ist zu teuer."], answer: 0, explanation: "Bestimmte Medikamente gibt es nur mit ärztlichem Rezept." },
    ],
  },
  {
    id: "a1-13-wetter", level: "A1", title: "Wetter", titleDe: "Über das Wetter sprechen", icon: "🌤️", premium: true,
    exercises: [
      { type: "multiple_choice", situation: "Dein Nachbar spricht dich an.", question: "Was sagt man oft als Small Talk?", options: ["Schönes Wetter heute, oder?", "Ich mag kein Wetter.", "Wetter ist Wetter."], answer: 0, explanation: "Über das Wetter reden ist typischer Small Talk in Deutschland." },
      { type: "fill_blank", situation: "Du beschreibst das Wetter.", question: "Heute ___ es sehr kalt draußen.", options: ["ist", "hat", "macht"], answer: "ist", explanation: "„Es ist kalt/warm/heiß" ist die korrekte Wetterbeschreibung." },
      { type: "sort_sentence", situation: "Du sagst, was du anziehen sollst.", question: "Bringe den Satz in die richtige Reihenfolge:", options: ["eine", "nehme", "Ich", "mit", "Regenjacke"], answer: [2, 1, 0, 4, 3], explanation: "Richtig: Ich nehme eine Regenjacke mit." },
      { type: "quick_reaction", situation: "Es regnet stark. Ein Kollege fragt: Hast du einen Regenschirm?", question: "Wie antwortest du?", options: ["Nein, leider nicht. Hast du einen für mich?", "Regen ist okay.", "Ich bleibe hier."], answer: 0, explanation: "Höflich antworten und nach Hilfe fragen." },
    ],
  },
  {
    id: "a1-14-hobby", level: "A1", title: "Hobbys", titleDe: "Über Hobbys sprechen", icon: "⚽", premium: true,
    exercises: [
      { type: "multiple_choice", situation: "Jemand fragt: Was machst du in deiner Freizeit?", question: "Was antwortest du?", options: ["Ich spiele gerne Fußball und lese Bücher.", "Freizeit ist gut.", "Ich weiß nicht."], answer: 0, explanation: "Konkrete Hobbys nennen mit „Ich … gerne"." },
      { type: "fill_blank", situation: "Du erzählst von deinem Hobby.", question: "Am Wochenende ___ ich gerne.", options: ["koche", "esse", "mache"], answer: "koche", explanation: "„Ich koche gerne" beschreibt ein konkretes Hobby." },
      { type: "sort_sentence", situation: "Du fragst nach dem Hobby.", question: "Bringe den Satz in die richtige Reihenfolge:", options: ["dein", "Was", "Hobby", "ist"], answer: [1, 3, 0, 2], explanation: "Richtig: Was ist dein Hobby?" },
      { type: "quick_reaction", situation: "Jemand fragt: Möchtest du mitspielen?", question: "Wie reagierst du?", options: ["Ja, sehr gerne!", "Sport ist anstrengend.", "Vielleicht morgen."], answer: 0, explanation: "„Ja, gerne!" zeigt Interesse und Freundlichkeit." },
      { type: "multiple_choice", situation: "Du lädst jemanden ein.", question: "Was sagst du?", options: ["Hast du Lust, am Samstag schwimmen zu gehen?", "Komm schwimmen!", "Schwimmen ist toll."], answer: 0, explanation: "„Hast du Lust, … zu gehen?" ist eine höfliche Einladung." },
    ],
  },
  {
    id: "a1-15-telefon", level: "A1", title: "Telefonieren", titleDe: "Am Telefon (einfach)", icon: "📱", premium: true,
    exercises: [
      { type: "multiple_choice", situation: "Dein Telefon klingelt.", question: "Wie meldest du dich?", options: ["Hallo, hier ist Meier.", "Wer ist da?", "Ja?"], answer: 0, explanation: "Sich mit Namen melden ist in Deutschland üblich." },
      { type: "fill_blank", situation: "Du möchtest jemanden sprechen.", question: "Könnte ich bitte Herrn Schmidt ___?", options: ["sprechen", "sehen", "finden"], answer: "sprechen", explanation: "„Könnte ich bitte … sprechen?" ist die höfliche Form." },
      { type: "sort_sentence", situation: "Du hinterlässt eine Nachricht.", question: "Bringe den Satz in die richtige Reihenfolge:", options: ["bitte", "Können", "ausrichten", "Sie", "etwas"], answer: [1, 3, 0, 4, 2], explanation: "Richtig: Können Sie bitte etwas ausrichten?" },
      { type: "quick_reaction", situation: "Die Person sagt: Einen Moment, ich verbinde Sie.", question: "Was sagst du?", options: ["Danke, ich warte.", "Schneller, bitte!", "Ich rufe später an."], answer: 0, explanation: "Höflich warten ist die richtige Reaktion." },
    ],
  },
  {
    id: "a1-16-post", level: "A1", title: "Post", titleDe: "Auf der Post", icon: "📮", premium: true,
    exercises: [
      { type: "multiple_choice", situation: "Du möchtest ein Paket verschicken.", question: "Was sagst du?", options: ["Ich möchte dieses Paket nach Sarajevo schicken.", "Paket weg.", "Haben Sie Pakete?"], answer: 0, explanation: "Klar sagen, wohin das Paket gehen soll." },
      { type: "fill_blank", situation: "Du fragst nach dem Porto.", question: "Was ___ ein Brief nach Bosnien?", options: ["kostet", "macht", "braucht"], answer: "kostet", explanation: "„Was kostet…?" fragt nach dem Preis." },
      { type: "sort_sentence", situation: "Du willst ein Einschreiben versenden.", question: "Bringe den Satz in die richtige Reihenfolge:", options: ["als", "den", "Ich", "Brief", "Einschreiben", "möchte", "schicken"], answer: [2, 5, 1, 3, 0, 4, 6], explanation: "Richtig: Ich möchte den Brief als Einschreiben schicken." },
      { type: "quick_reaction", situation: "Der Postmitarbeiter sagt: Möchten Sie eine Sendungsverfolgung?", question: "Was antwortest du?", options: ["Ja, bitte.", "Was ist das?", "Nein, egal."], answer: 0, explanation: "Mit Sendungsverfolgung kannst du das Paket online verfolgen." },
    ],
  },
  {
    id: "a1-17-bank", level: "A1", title: "Bank", titleDe: "Bei der Bank", icon: "🏦", premium: true,
    exercises: [
      { type: "multiple_choice", situation: "Du möchtest ein Konto eröffnen.", question: "Was sagst du?", options: ["Ich möchte gerne ein Girokonto eröffnen.", "Geben Sie mir Geld.", "Ich brauche eine Bank."], answer: 0, explanation: "„Ein Girokonto eröffnen" ist der Fachbegriff." },
      { type: "fill_blank", situation: "Du fragst nach den Gebühren.", question: "Wie hoch sind die monatlichen ___?", options: ["Gebühren", "Kosten", "Preise"], answer: "Gebühren", explanation: "Bei Banken spricht man von „Kontogebühren"." },
      { type: "sort_sentence", situation: "Du brauchst eine neue Karte.", question: "Bringe den Satz in die richtige Reihenfolge:", options: ["neue", "eine", "brauche", "Ich", "Bankkarte"], answer: [3, 2, 1, 0, 4], explanation: "Richtig: Ich brauche eine neue Bankkarte." },
      { type: "quick_reaction", situation: "Der Bankmitarbeiter fragt: Haben Sie Ihren Ausweis dabei?", question: "Was machst du?", options: ["Den Ausweis zeigen.", "Nach Hause gehen.", "Fragen: Welchen Ausweis?"], answer: 0, explanation: "Den Personalausweis oder Reisepass vorzeigen." },
      { type: "multiple_choice", situation: "Du willst Geld überweisen.", question: "Was brauchst du?", options: ["Die IBAN des Empfängers.", "Die Telefonnummer.", "Den Namen des Chefs."], answer: 0, explanation: "Für Überweisungen braucht man die IBAN." },
    ],
  },
  {
    id: "a1-18-notfall", level: "A1", title: "Notfall", titleDe: "Im Notfall", icon: "🚨", premium: true,
    exercises: [
      { type: "multiple_choice", situation: "Du hast einen Notfall.", question: "Welche Nummer rufst du an?", options: ["112", "110", "911"], answer: 0, explanation: "112 ist die Notrufnummer in Deutschland (Feuerwehr/Rettung)." },
      { type: "fill_blank", situation: "Du rufst den Notruf an.", question: "Ich brauche einen ___! Jemand ist verletzt.", options: ["Krankenwagen", "Arzt", "Polizisten"], answer: "Krankenwagen", explanation: "Bei Verletzungen fordert man einen Krankenwagen an." },
      { type: "sort_sentence", situation: "Du beschreibst den Notfall.", question: "Bringe den Satz in die richtige Reihenfolge:", options: ["einen", "Es", "hat", "Unfall", "gegeben"], answer: [1, 2, 0, 3, 4], explanation: "Richtig: Es hat einen Unfall gegeben." },
      { type: "quick_reaction", situation: "Die Leitstelle fragt: Wo genau sind Sie?", question: "Was antwortest du?", options: ["In der Hauptstraße 15, Berlin.", "Draußen.", "Ich weiß nicht genau."], answer: 0, explanation: "Die genaue Adresse angeben ist lebenswichtig." },
    ],
  },
  {
    id: "a1-19-schule", level: "A1", title: "Schule/Kita", titleDe: "Schule und Kindergarten", icon: "🎒", premium: true,
    exercises: [
      { type: "multiple_choice", situation: "Du meldest dein Kind in der Schule an.", question: "Was sagst du?", options: ["Ich möchte mein Kind für die erste Klasse anmelden.", "Mein Kind will lernen.", "Haben Sie Platz?"], answer: 0, explanation: "Klar sagen, für welche Klasse man anmelden möchte." },
      { type: "fill_blank", situation: "Du fragst nach den Schulsachen.", question: "Welche ___ braucht mein Kind?", options: ["Schulmaterialien", "Sachen", "Dinge"], answer: "Schulmaterialien", explanation: "„Schulmaterialien" ist der korrekte Begriff für Hefte, Stifte etc." },
      { type: "sort_sentence", situation: "Du schreibst eine Entschuldigung.", question: "Bringe den Satz in die richtige Reihenfolge:", options: ["Kind", "war", "Mein", "gestern", "krank"], answer: [2, 0, 1, 3, 4], explanation: "Richtig: Mein Kind war gestern krank." },
      { type: "quick_reaction", situation: "Die Lehrerin sagt: Ihr Kind macht gute Fortschritte.", question: "Wie reagierst du?", options: ["Das freut mich sehr, vielen Dank!", "Okay.", "Ist das gut?"], answer: 0, explanation: "Sich freuen und bedanken zeigt Wertschätzung." },
      { type: "multiple_choice", situation: "Du fragst nach den Schulzeiten.", question: "Wie fragst du?", options: ["Wann beginnt der Unterricht?", "Wie lange ist Schule?", "Ist Schule lang?"], answer: 0, explanation: "„Wann beginnt der Unterricht?" ist die konkrete Frage." },
    ],
  },
  {
    id: "a1-20-nachbar", level: "A1", title: "Nachbarn", titleDe: "Mit Nachbarn sprechen", icon: "🏘️", premium: true,
    exercises: [
      { type: "multiple_choice", situation: "Du bist neu eingezogen.", question: "Was sagst du zu den Nachbarn?", options: ["Hallo, ich bin neu hier. Ich wohne nebenan.", "Wer sind Sie?", "Machen Sie keinen Lärm!"], answer: 0, explanation: "Sich freundlich vorstellen ist ein guter erster Eindruck." },
      { type: "fill_blank", situation: "Du bittest um Hilfe.", question: "Könnten Sie mir bitte ein Paket ___?", options: ["annehmen", "geben", "bringen"], answer: "annehmen", explanation: "Nachbarn nehmen oft Pakete an, wenn man nicht da ist." },
      { type: "sort_sentence", situation: "Du entschuldigst dich für Lärm.", question: "Bringe den Satz in die richtige Reihenfolge:", options: ["den", "Entschuldigung", "Lärm", "für", "gestern"], answer: [1, 3, 0, 2, 4], explanation: "Richtig: Entschuldigung für den Lärm gestern." },
      { type: "quick_reaction", situation: "Dein Nachbar lädt dich zum Kaffee ein.", question: "Wie reagierst du?", options: ["Sehr gerne, das ist nett von Ihnen!", "Ich trinke keinen Kaffee.", "Vielleicht."], answer: 0, explanation: "Die Einladung freundlich annehmen stärkt die Nachbarschaft." },
    ],
  },
  // Continue with more A1 lessons
  {
    id: "a1-21-arztpraxis2", level: "A1", title: "Termin machen", titleDe: "Einen Termin machen", icon: "📅", premium: true,
    exercises: [
      { type: "multiple_choice", situation: "Du rufst bei einer Arztpraxis an.", question: "Wie fragst du nach einem Termin?", options: ["Kann ich bitte einen Termin vereinbaren?", "Ich brauche einen Arzt!", "Wann haben Sie auf?"], answer: 0, explanation: "„Einen Termin vereinbaren" ist die korrekte Formulierung." },
      { type: "fill_blank", situation: "Du nennst den Grund.", question: "Ich brauche einen Termin für eine ___.", options: ["Vorsorgeuntersuchung", "Kontrolle", "Sache"], answer: "Vorsorgeuntersuchung", explanation: "Eine Vorsorgeuntersuchung ist eine regelmäßige Gesundheitskontrolle." },
      { type: "sort_sentence", situation: "Du nennst deine Versicherung.", question: "Bringe den Satz in die richtige Reihenfolge:", options: ["bin", "Ich", "bei", "der", "AOK", "versichert"], answer: [1, 0, 2, 3, 4, 5], explanation: "Richtig: Ich bin bei der AOK versichert." },
      { type: "quick_reaction", situation: "Die Sprechstundenhilfe fragt: Passt Ihnen Montag um 10 Uhr?", question: "Wie antwortest du?", options: ["Ja, das passt gut.", "Montag ist ein schlechter Tag.", "Ich weiß nicht."], answer: 0, explanation: "Einen vorgeschlagenen Termin bestätigen." },
    ],
  },
  {
    id: "a1-22-taxi", level: "A1", title: "Taxi", titleDe: "Taxi fahren", icon: "🚕", premium: true,
    exercises: [
      { type: "multiple_choice", situation: "Du steigst ins Taxi.", question: "Was sagst du?", options: ["Zum Hauptbahnhof, bitte.", "Fahren Sie!", "Wohin fahren Sie?"], answer: 0, explanation: "Das Ziel klar und höflich nennen." },
      { type: "fill_blank", situation: "Du fragst nach dem Preis.", question: "Was ___ die Fahrt ungefähr?", options: ["kostet", "macht", "braucht"], answer: "kostet", explanation: "„Was kostet die Fahrt?" fragt nach dem Preis." },
      { type: "sort_sentence", situation: "Du gibst die Adresse an.", question: "Bringe den Satz in die richtige Reihenfolge:", options: ["bitte", "Bringen", "mich", "zur", "Mozartstraße", "Sie"], answer: [1, 5, 2, 3, 4, 0], explanation: "Richtig: Bringen Sie mich zur Mozartstraße, bitte." },
      { type: "quick_reaction", situation: "Der Taxifahrer fragt: Möchten Sie eine Quittung?", question: "Wie antwortest du?", options: ["Ja, bitte. Ich brauche sie für die Firma.", "Was ist eine Quittung?", "Nein, egal."], answer: 0, explanation: "Quittungen sind wichtig für Abrechnungen." },
    ],
  },
  {
    id: "a1-23-farben-kleidung", level: "A1", title: "Farben", titleDe: "Farben und Kleidung", icon: "🎨", premium: true,
    exercises: [
      { type: "multiple_choice", situation: "Du beschreibst, was du trägst.", question: "Was sagst du?", options: ["Ich trage eine blaue Jacke und schwarze Schuhe.", "Ich bin blau.", "Kleidung ist bunt."], answer: 0, explanation: "Farbe + Kleidungsstück nennen ist die korrekte Beschreibung." },
      { type: "fill_blank", situation: "Du suchst etwas Bestimmtes.", question: "Haben Sie dieses Hemd auch in ___?", options: ["Weiß", "hell", "schön"], answer: "Weiß", explanation: "Man fragt nach der gewünschten Farbe." },
      { type: "sort_sentence", situation: "Du beschreibst eine Person.", question: "Bringe den Satz in die richtige Reihenfolge:", options: ["roten", "Er", "eine", "Mütze", "trägt"], answer: [1, 4, 2, 0, 3], explanation: "Richtig: Er trägt eine roten Mütze." },
      { type: "quick_reaction", situation: "Die Verkäuferin fragt: Welche Farbe möchten Sie?", question: "Wie antwortest du?", options: ["Dunkelblau, bitte.", "Eine schöne Farbe.", "Ich mag Farben."], answer: 0, explanation: "Konkret die gewünschte Farbe nennen." },
    ],
  },
  {
    id: "a1-24-essen-trinken", level: "A1", title: "Essen bestellen", titleDe: "Essen und Trinken bestellen", icon: "🍕", premium: true,
    exercises: [
      { type: "multiple_choice", situation: "Du bist in einem Imbiss.", question: "Was sagst du?", options: ["Einmal Döner mit allem, bitte.", "Ich habe Hunger.", "Essen!"], answer: 0, explanation: "„Einmal … bitte" ist die übliche Bestellung am Imbiss." },
      { type: "fill_blank", situation: "Du bestellst ein Getränk.", question: "Ich ___ gerne ein Wasser, bitte.", options: ["hätte", "will", "brauche"], answer: "hätte", explanation: "„Ich hätte gerne…" ist die höfliche Bestellform." },
      { type: "sort_sentence", situation: "Du fragst nach der Karte.", question: "Bringe den Satz in die richtige Reihenfolge:", options: ["die", "Könnte", "Speisekarte", "ich", "sehen"], answer: [1, 3, 0, 2, 4], explanation: "Richtig: Könnte ich die Speisekarte sehen?" },
      { type: "quick_reaction", situation: "Der Kellner fragt: Mit oder ohne Soße?", question: "Wie antwortest du?", options: ["Mit Soße, bitte.", "Soße ist gut.", "Was für Soße?"], answer: 0, explanation: "Klare Antwort geben: mit oder ohne." },
      { type: "multiple_choice", situation: "Du hast eine Allergie.", question: "Was sagst du?", options: ["Ist das Gericht glutenfrei?", "Ich mag kein Gluten.", "Was ist da drin?"], answer: 0, explanation: "Direkt nach Allergenen fragen ist wichtig." },
    ],
  },
  {
    id: "a1-25-wochentage", level: "A1", title: "Wochentage", titleDe: "Wochentage und Termine", icon: "📆", premium: true,
    exercises: [
      { type: "multiple_choice", situation: "Jemand fragt: Welcher Tag ist heute?", question: "Es ist Mittwoch. Was sagst du?", options: ["Heute ist Mittwoch.", "Mittwoch.", "Der dritte Tag."], answer: 0, explanation: "„Heute ist…" mit dem Wochentag antworten." },
      { type: "fill_blank", situation: "Du sagst, wann du frei hast.", question: "Ich habe am ___ frei.", options: ["Freitag", "fünften Tag", "Ende"], answer: "Freitag", explanation: "Wochentage werden ohne Artikel nach „am" verwendet." },
      { type: "sort_sentence", situation: "Du verabredest dich.", question: "Bringe den Satz in die richtige Reihenfolge:", options: ["wir", "Am", "uns", "treffen", "Samstag"], answer: [1, 4, 3, 0, 2], explanation: "Richtig: Am Samstag treffen wir uns." },
      { type: "quick_reaction", situation: "Dein Chef fragt: Können Sie am Dienstag Überstunden machen?", question: "Wie antwortest du?", options: ["Ja, das geht. Bis wann?", "Dienstag ist schlecht.", "Ich arbeite nicht gerne."], answer: 0, explanation: "Zusagen und nach Details fragen." },
    ],
  },
  // A few more to fill out
  {
    id: "a1-26-mietvertrag", level: "A1", title: "Mietvertrag", titleDe: "Den Mietvertrag verstehen", icon: "📄", premium: true,
    exercises: [
      { type: "multiple_choice", situation: "Du liest deinen Mietvertrag.", question: "Was bedeutet „Kaltmiete"?", options: ["Miete ohne Nebenkosten", "Miete mit Heizung", "Miete für den Winter"], answer: 0, explanation: "Kaltmiete ist die reine Miete ohne Nebenkosten." },
      { type: "fill_blank", situation: "Du fragst nach der Kaution.", question: "Wie hoch ist die ___?", options: ["Kaution", "Miete", "Gebühr"], answer: "Kaution", explanation: "Die Kaution ist die Sicherheitsleistung beim Einzug." },
      { type: "sort_sentence", situation: "Du fragst nach der Kündigungsfrist.", question: "Bringe den Satz in die richtige Reihenfolge:", options: ["die", "Wie", "ist", "lang", "Kündigungsfrist"], answer: [1, 3, 2, 0, 4], explanation: "Richtig: Wie lang ist die Kündigungsfrist?" },
      { type: "quick_reaction", situation: "Der Vermieter sagt: Die Kaution beträgt drei Monatsmieten.", question: "Was bedeutet das?", options: ["Du zahlst 3 Monate Miete als Sicherheit.", "Du zahlst 3 Monate im Voraus.", "Die Miete ist 3 Mal teurer."], answer: 0, explanation: "Drei Monatsmieten Kaution sind in Deutschland üblich." },
    ],
  },
  {
    id: "a1-27-haushalt", level: "A1", title: "Haushalt", titleDe: "Im Haushalt", icon: "🧹", premium: true,
    exercises: [
      { type: "multiple_choice", situation: "Du sprichst mit deinem Mitbewohner.", question: "Was sagst du?", options: ["Wer ist diese Woche mit dem Abwasch dran?", "Mach sauber!", "Ist die Küche dreckig?"], answer: 0, explanation: "Höflich nach der Zuständigkeit fragen." },
      { type: "fill_blank", situation: "Du beschreibst Hausarbeit.", question: "Ich muss noch die Wäsche ___.", options: ["waschen", "machen", "putzen"], answer: "waschen", explanation: "Man „wäscht" die Wäsche." },
      { type: "sort_sentence", situation: "Du teilst die Aufgaben auf.", question: "Bringe den Satz in die richtige Reihenfolge:", options: ["den", "Du", "Müll", "rausbringen", "kannst"], answer: [1, 4, 0, 2, 3], explanation: "Richtig: Du kannst den Müll rausbringen." },
      { type: "quick_reaction", situation: "Dein Mitbewohner fragt: Hast du den Herd ausgemacht?", question: "Wie antwortest du?", options: ["Ja, habe ich. Danke für die Erinnerung!", "Vielleicht.", "Ist das wichtig?"], answer: 0, explanation: "Sicherheit in der Küche ist sehr wichtig." },
    ],
  },
  {
    id: "a1-28-geburtstag", level: "A1", title: "Geburtstag", titleDe: "Geburtstag feiern", icon: "🎂", premium: true,
    exercises: [
      { type: "multiple_choice", situation: "Du gratulierst einem Kollegen.", question: "Was sagst du?", options: ["Herzlichen Glückwunsch zum Geburtstag!", "Alles Gute.", "Du bist alt."], answer: 0, explanation: "„Herzlichen Glückwunsch zum Geburtstag!" ist die vollständige Gratulation." },
      { type: "fill_blank", situation: "Du lädst jemanden ein.", question: "Ich ___ dich gerne zu meiner Feier ein.", options: ["lade", "bringe", "nehme"], answer: "lade", explanation: "„Ich lade dich ein" ist die korrekte Einladung." },
      { type: "sort_sentence", situation: "Du bedankst dich für ein Geschenk.", question: "Bringe den Satz in die richtige Reihenfolge:", options: ["das", "Vielen", "Geschenk", "Dank", "schöne", "für"], answer: [1, 3, 5, 0, 4, 2], explanation: "Richtig: Vielen Dank für das schöne Geschenk." },
      { type: "quick_reaction", situation: "Jemand fragt: Wann hast du Geburtstag?", question: "Wie antwortest du?", options: ["Am 15. Mai.", "Im Frühling.", "Bald."], answer: 0, explanation: "Das genaue Datum nennen: Am + Tag + Monat." },
    ],
  },
  {
    id: "a1-29-sport", level: "A1", title: "Sport", titleDe: "Sportverein", icon: "🏋️", premium: true,
    exercises: [
      { type: "multiple_choice", situation: "Du möchtest einem Sportverein beitreten.", question: "Was fragst du?", options: ["Wie kann ich Mitglied werden?", "Kann ich mitspielen?", "Sport ist gesund."], answer: 0, explanation: "Nach der Mitgliedschaft fragen ist der erste Schritt." },
      { type: "fill_blank", situation: "Du fragst nach dem Training.", question: "Wann ___ das Training statt?", options: ["findet", "ist", "macht"], answer: "findet", explanation: "„Wann findet … statt?" fragt nach dem Zeitpunkt." },
      { type: "sort_sentence", situation: "Du meldest dich an.", question: "Bringe den Satz in die richtige Reihenfolge:", options: ["mich", "möchte", "Ich", "anmelden", "gerne"], answer: [2, 1, 0, 4, 3], explanation: "Richtig: Ich möchte mich gerne anmelden." },
      { type: "quick_reaction", situation: "Der Trainer fragt: Haben Sie Sporterfahrung?", question: "Wie antwortest du?", options: ["Ja, ich habe früher Fußball gespielt.", "Sport ist toll.", "Ich bin stark."], answer: 0, explanation: "Konkret die eigene Erfahrung nennen." },
    ],
  },
  {
    id: "a1-30-einkaufsliste", level: "A1", title: "Einkaufsliste", titleDe: "Eine Einkaufsliste schreiben", icon: "📝", premium: true,
    exercises: [
      { type: "multiple_choice", situation: "Du schreibst eine Einkaufsliste.", question: "Was gehört auf die Liste?", options: ["Brot, Milch, Eier, Butter", "Alles", "Essen und Trinken"], answer: 0, explanation: "Konkrete Lebensmittel aufschreiben hilft beim Einkaufen." },
      { type: "fill_blank", situation: "Du fragst nach einer Menge.", question: "Ich brauche ein ___ Mehl.", options: ["Kilo", "Stück", "Glas"], answer: "Kilo", explanation: "Mehl wird in Kilogramm gemessen." },
      { type: "sort_sentence", situation: "Du sagst, was du brauchst.", question: "Bringe den Satz in die richtige Reihenfolge:", options: ["noch", "Wir", "brauchen", "Tomaten", "frische"], answer: [1, 2, 0, 4, 3], explanation: "Richtig: Wir brauchen noch frische Tomaten." },
      { type: "quick_reaction", situation: "Dein Partner fragt: Haben wir noch Reis?", question: "Wie antwortest du?", options: ["Nein, ich schreibe es auf die Liste.", "Vielleicht.", "Reis ist langweilig."], answer: 0, explanation: "Fehlende Dinge direkt auf die Liste setzen." },
    ],
  },
  // More A1 lessons to reach 40
  {
    id: "a1-31-handwerker", level: "A1", title: "Handwerker", titleDe: "Handwerker rufen", icon: "🔧", premium: true,
    exercises: [
      { type: "multiple_choice", situation: "Der Wasserhahn tropft.", question: "Wen rufst du an?", options: ["Einen Klempner", "Einen Elektriker", "Die Polizei"], answer: 0, explanation: "Ein Klempner repariert Wasser- und Rohrleitungen." },
      { type: "fill_blank", situation: "Du beschreibst das Problem.", question: "Der Wasserhahn ___ seit gestern.", options: ["tropft", "läuft", "geht"], answer: "tropft", explanation: "Ein Wasserhahn „tropft", wenn er undicht ist." },
      { type: "sort_sentence", situation: "Du vereinbarst einen Termin.", question: "Bringe den Satz in die richtige Reihenfolge:", options: ["Sie", "Könnten", "morgen", "vorbeikommen"], answer: [1, 0, 2, 3], explanation: "Richtig: Könnten Sie morgen vorbeikommen?" },
      { type: "quick_reaction", situation: "Der Handwerker sagt: Das kostet ungefähr 80 Euro.", question: "Wie reagierst du?", options: ["In Ordnung, machen Sie das bitte.", "Das ist zu teuer!", "Ich mache es selbst."], answer: 0, explanation: "Den Auftrag bestätigen, wenn der Preis fair ist." },
    ],
  },
  {
    id: "a1-32-krank-melden", level: "A1", title: "Krankmeldung", titleDe: "Sich krank melden", icon: "🤒", premium: true,
    exercises: [
      { type: "multiple_choice", situation: "Du bist krank und kannst nicht arbeiten.", question: "Was sagst du deinem Chef?", options: ["Guten Morgen, ich bin leider krank und kann heute nicht kommen.", "Ich komme nicht.", "Mir geht es schlecht."], answer: 0, explanation: "Höflich und klar den Grund nennen." },
      { type: "fill_blank", situation: "Du brauchst eine Krankmeldung.", question: "Ich brauche eine ___ vom Arzt.", options: ["Arbeitsunfähigkeitsbescheinigung", "Bestätigung", "Entschuldigung"], answer: "Arbeitsunfähigkeitsbescheinigung", explanation: "Die AU-Bescheinigung (Arbeitsunfähigkeitsbescheinigung) braucht der Arbeitgeber." },
      { type: "sort_sentence", situation: "Du informierst die Arbeit.", question: "Bringe den Satz in die richtige Reihenfolge:", options: ["voraussichtlich", "Ich", "bin", "bis", "Freitag", "krank"], answer: [1, 2, 3, 0, 4, 5], explanation: "Richtig: Ich bin bis voraussichtlich Freitag krank." },
      { type: "quick_reaction", situation: "Dein Chef fragt: Haben Sie schon einen Arzttermin?", question: "Wie antwortest du?", options: ["Ja, ich gehe heute noch zum Arzt.", "Nein.", "Brauche ich das?"], answer: 0, explanation: "Ab dem dritten Krankheitstag braucht man eine AU." },
    ],
  },
  {
    id: "a1-33-entschuldigung", level: "A1", title: "Entschuldigung", titleDe: "Sich entschuldigen", icon: "🙏", premium: true,
    exercises: [
      { type: "multiple_choice", situation: "Du hast dich verspätet.", question: "Was sagst du?", options: ["Entschuldigung für die Verspätung!", "Ich bin da.", "War nicht meine Schuld."], answer: 0, explanation: "Sich direkt entschuldigen zeigt Respekt." },
      { type: "fill_blank", situation: "Du hast einen Fehler gemacht.", question: "Das tut mir wirklich ___.", options: ["leid", "schlecht", "weh"], answer: "leid", explanation: "„Das tut mir leid" ist die Standard-Entschuldigung." },
      { type: "sort_sentence", situation: "Du bittest um Verständnis.", question: "Bringe den Satz in die richtige Reihenfolge:", options: ["mir", "Bitte", "Sie", "verzeihen"], answer: [1, 3, 2, 0], explanation: "Richtig: Bitte verzeihen Sie mir." },
      { type: "quick_reaction", situation: "Jemand sagt: Das macht nichts, kein Problem!", question: "Wie reagierst du?", options: ["Danke für Ihr Verständnis.", "Okay.", "Gut so."], answer: 0, explanation: "Sich bedanken zeigt, dass man die Entschuldigung ernst meint." },
    ],
  },
  {
    id: "a1-34-auslaenderbehoerde", level: "A1", title: "Ausländerbehörde", titleDe: "Auf der Ausländerbehörde", icon: "🛂", premium: true,
    exercises: [
      { type: "multiple_choice", situation: "Du brauchst eine Aufenthaltserlaubnis.", question: "Was sagst du?", options: ["Ich möchte meine Aufenthaltserlaubnis verlängern.", "Ich will hier bleiben.", "Können Sie mir helfen?"], answer: 0, explanation: "Den konkreten Grund des Besuchs nennen." },
      { type: "fill_blank", situation: "Du zeigst deine Dokumente.", question: "Hier sind mein Reisepass und mein ___.", options: ["Arbeitsvertrag", "Buch", "Telefon"], answer: "Arbeitsvertrag", explanation: "Für die Aufenthaltserlaubnis braucht man oft einen Arbeitsvertrag." },
      { type: "sort_sentence", situation: "Du fragst nach dem Status.", question: "Bringe den Satz in die richtige Reihenfolge:", options: ["mein", "Wie", "ist", "Antrag", "Status", "der", "von"], answer: [1, 2, 5, 4, 6, 0, 3], explanation: "Richtig: Wie ist der Status von meinem Antrag?" },
      { type: "quick_reaction", situation: "Der Beamte sagt: Sie brauchen noch ein Passfoto.", question: "Was machst du?", options: ["Okay, wo kann ich eines machen lassen?", "Ich habe keins.", "Ist das wichtig?"], answer: 0, explanation: "Nach einer Lösung fragen, um den Termin nicht zu verlieren." },
    ],
  },
  {
    id: "a1-35-arzt-symptome", level: "A1", title: "Symptome", titleDe: "Symptome beschreiben", icon: "🤧", premium: true,
    exercises: [
      { type: "multiple_choice", situation: "Du hast Fieber und Husten.", question: "Wie beschreibst du das dem Arzt?", options: ["Ich habe Fieber und Husten seit zwei Tagen.", "Mir geht es nicht gut.", "Ich fühle mich komisch."], answer: 0, explanation: "Symptome und Zeitraum konkret beschreiben." },
      { type: "fill_blank", situation: "Der Arzt untersucht dich.", question: "Wo genau ___ es weh?", options: ["tut", "macht", "ist"], answer: "tut", explanation: "„Wo tut es weh?" ist die Standardfrage des Arztes." },
      { type: "sort_sentence", situation: "Du beschreibst Schmerzen.", question: "Bringe den Satz in die richtige Reihenfolge:", options: ["Schmerzen", "Ich", "im", "Rücken", "habe"], answer: [1, 4, 0, 2, 3], explanation: "Richtig: Ich habe Schmerzen im Rücken." },
      { type: "quick_reaction", situation: "Der Arzt fragt: Nehmen Sie regelmäßig Medikamente?", question: "Wie antwortest du?", options: ["Ja, ich nehme Blutdrucktabletten.", "Nein.", "Medikamente sind teuer."], answer: 0, explanation: "Ehrlich über Medikamente informieren ist wichtig für die Behandlung." },
    ],
  },
  {
    id: "a1-36-internet", level: "A1", title: "Internet", titleDe: "Internet und Handy", icon: "📶", premium: true,
    exercises: [
      { type: "multiple_choice", situation: "Du brauchst einen Handyvertrag.", question: "Was fragst du im Laden?", options: ["Welche Tarife haben Sie?", "Ich will ein Handy.", "Haben Sie WLAN?"], answer: 0, explanation: "Nach den Tarifen fragen ist der erste Schritt." },
      { type: "fill_blank", situation: "Du hast ein Problem mit dem Internet.", question: "Mein Internet ___ nicht.", options: ["funktioniert", "geht", "macht"], answer: "funktioniert", explanation: "„Funktioniert nicht" ist die technisch korrekte Beschreibung." },
      { type: "sort_sentence", situation: "Du rufst die Hotline an.", question: "Bringe den Satz in die richtige Reihenfolge:", options: ["eine", "Ich", "habe", "Verbindung", "keine"], answer: [1, 2, 4, 0, 3], explanation: "Richtig: Ich habe keine Verbindung." },
      { type: "quick_reaction", situation: "Der Support fragt: Haben Sie den Router neu gestartet?", question: "Was machst du?", options: ["Ja, aber es hilft nicht.", "Was ist ein Router?", "Nein, warum?"], answer: 0, explanation: "Den Router neustarten ist der erste Schritt bei Internetproblemen." },
    ],
  },
  {
    id: "a1-37-muell", level: "A1", title: "Mülltrennung", titleDe: "Müll richtig trennen", icon: "♻️", premium: true,
    exercises: [
      { type: "multiple_choice", situation: "Du weißt nicht, in welche Tonne der Müll kommt.", question: "Wohin kommt eine Plastikflasche?", options: ["In den Gelben Sack", "In die Biotonne", "In den Restmüll"], answer: 0, explanation: "Plastik und Verpackungen kommen in den Gelben Sack." },
      { type: "fill_blank", situation: "Du fragst deinen Nachbarn.", question: "In welche Tonne kommt ___?", options: ["Papier", "alles", "Essen"], answer: "Papier", explanation: "Papier kommt in die blaue Papiertonne." },
      { type: "sort_sentence", situation: "Du erklärst die Mülltrennung.", question: "Bringe den Satz in die richtige Reihenfolge:", options: ["muss", "In", "man", "Deutschland", "Müll", "trennen"], answer: [1, 3, 0, 2, 4, 5], explanation: "Richtig: In Deutschland muss man Müll trennen." },
      { type: "quick_reaction", situation: "Dein Mitbewohner wirft alles in eine Tonne.", question: "Was sagst du?", options: ["Wir müssen den Müll trennen. Ich zeige dir, wie.", "Das ist falsch!", "Mir egal."], answer: 0, explanation: "Freundlich erklären und helfen." },
    ],
  },
  {
    id: "a1-38-datum", level: "A1", title: "Datum", titleDe: "Datum und Monate", icon: "🗓️", premium: true,
    exercises: [
      { type: "multiple_choice", situation: "Jemand fragt: Welches Datum haben wir heute?", question: "Es ist der 23. Oktober. Was sagst du?", options: ["Heute ist der dreiundzwanzigste Oktober.", "23.10.", "Oktober."], answer: 0, explanation: "Das Datum wird als Ordnungszahl gesprochen." },
      { type: "fill_blank", situation: "Du trägst ein Datum in ein Formular ein.", question: "Mein Geburtstag ist am 5. ___.", options: ["Januar", "1. Monat", "Neujahr"], answer: "Januar", explanation: "Den Monatsnamen ausschreiben oder das Datum als Zahl." },
      { type: "sort_sentence", situation: "Du sagst, wann du angefangen hast.", question: "Bringe den Satz in die richtige Reihenfolge:", options: ["habe", "Ich", "im", "März", "angefangen"], answer: [1, 0, 2, 3, 4], explanation: "Richtig: Ich habe im März angefangen." },
      { type: "quick_reaction", situation: "Dein Chef fragt: Bis wann brauchen Sie Urlaub?", question: "Wie antwortest du?", options: ["Vom 1. bis zum 15. August.", "Zwei Wochen.", "Im Sommer."], answer: 0, explanation: "Genaue Daten für Urlaubsanträge angeben." },
    ],
  },
  {
    id: "a1-39-danke-bitte", level: "A1", title: "Höflichkeit", titleDe: "Danke und Bitte", icon: "🤝", premium: true,
    exercises: [
      { type: "multiple_choice", situation: "Jemand hält dir die Tür auf.", question: "Was sagst du?", options: ["Danke schön!", "Okay.", "Das ist normal."], answer: 0, explanation: "Immer „Danke" sagen, wenn jemand dir hilft." },
      { type: "fill_blank", situation: "Du bittest um etwas.", question: "Könnten Sie mir ___ helfen?", options: ["bitte", "mal", "schnell"], answer: "bitte", explanation: "„Bitte" macht jede Frage höflicher." },
      { type: "sort_sentence", situation: "Du bedankst dich.", question: "Bringe den Satz in die richtige Reihenfolge:", options: ["sehr", "Ich", "nett", "das", "finde"], answer: [1, 4, 3, 0, 2], explanation: "Richtig: Ich finde das sehr nett." },
      { type: "quick_reaction", situation: "Jemand sagt: Gern geschehen!", question: "Was bedeutet das?", options: ["Kein Problem, ich helfe gerne.", "Du bist willkommen.", "Auf Wiedersehen."], answer: 0, explanation: "„Gern geschehen" ist die Antwort auf „Danke"." },
    ],
  },
  {
    id: "a1-40-verabschiedung", level: "A1", title: "Verabschiedung", titleDe: "Sich verabschieden", icon: "👋", premium: true,
    exercises: [
      { type: "multiple_choice", situation: "Du gehst aus dem Büro.", question: "Was sagst du zu den Kollegen?", options: ["Schönen Feierabend! Bis morgen!", "Tschüss.", "Ich gehe jetzt."], answer: 0, explanation: "„Schönen Feierabend" wünscht man nach der Arbeit." },
      { type: "fill_blank", situation: "Du verabschiedest dich am Telefon.", question: "Vielen Dank für das Gespräch. Auf ___!", options: ["Wiederhören", "Wiedersehen", "bald"], answer: "Wiederhören", explanation: "Am Telefon sagt man „Auf Wiederhören" statt „Auf Wiedersehen"." },
      { type: "sort_sentence", situation: "Du verabschiedest dich von Freunden.", question: "Bringe den Satz in die richtige Reihenfolge:", options: ["schönes", "Euch", "ein", "Wochenende", "Wünsche"], answer: [4, 1, 2, 0, 3], explanation: "Richtig: Wünsche Euch ein schönes Wochenende." },
      { type: "quick_reaction", situation: "Jemand sagt: Wir sehen uns!", question: "Wie antwortest du?", options: ["Ja, bis bald! Mach's gut!", "Okay, tschüss.", "Wann?"], answer: 0, explanation: "Freundlich verabschieden mit „Bis bald" oder „Mach's gut"." },
    ],
  },
];
