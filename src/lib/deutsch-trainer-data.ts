export type ExerciseType = "multiple_choice" | "sort_sentence" | "fill_blank" | "quick_reaction";

export interface Exercise {
  type: ExerciseType;
  situation: string;
  question: string;
  options: string[];
  answer: number | number[] | string;
  explanation: string;
}

export interface Lesson {
  id: string;
  level: string;
  title: string;
  titleDe: string;
  icon: string;
  exercises: Exercise[];
  premium: boolean;
}

export const LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;
export type Level = (typeof LEVELS)[number];

export const LEVEL_COLORS: Record<Level, string> = {
  A1: "hsl(var(--success))",
  A2: "hsl(145, 55%, 45%)",
  B1: "hsl(var(--gold))",
  B2: "hsl(38, 91%, 55%)",
  C1: "hsl(215, 68%, 44%)",
  C2: "hsl(280, 60%, 50%)",
};

export const XP_PER_LESSON = 20;
export const XP_PER_CORRECT = 4;

export const lessons: Lesson[] = [
  {
    id: "a1-arzt",
    level: "A1",
    title: "Arzt Termin",
    titleDe: "Beim Arzt",
    icon: "\u{1FA7A}",
    premium: false,
    exercises: [
      {
        type: "multiple_choice",
        situation: "Du bist beim Arzt. Die Sprechstundenhilfe fragt dich etwas.",
        question: "Haben Sie Ihre Versichertenkarte dabei? - Was antwortest du?",
        options: ["Ja, hier bitte.", "Ich bin krank.", "Nein, ich habe Hunger."],
        answer: 0,
        explanation: "Die Versichertenkarte brauchst du bei jedem Arztbesuch.",
      },
      {
        type: "sort_sentence",
        situation: "Du beschreibst dem Arzt dein Problem.",
        question: "Bringe den Satz in die richtige Reihenfolge:",
        options: ["habe", "Kopfschmerzen", "Ich", "seit", "gestern"],
        answer: [2, 0, 3, 4, 1],
        explanation: "Richtig: Ich habe seit gestern Kopfschmerzen.",
      },
      {
        type: "fill_blank",
        situation: "Der Arzt fragt nach deinen Beschwerden.",
        question: "Mir ___ der Bauch weh.",
        options: ["tut", "macht", "ist"],
        answer: "tut",
        explanation: "Mir tut ... weh ist die korrekte Formulierung.",
      },
      {
        type: "quick_reaction",
        situation: "Der Arzt sagt: Bitte machen Sie den Oberkoerper frei.",
        question: "Was machst du?",
        options: ["T-Shirt ausziehen", "Schuhe ausziehen", "Sich hinsetzen"],
        answer: 0,
        explanation: "Oberkoerper frei machen = T-Shirt/Hemd ausziehen.",
      },
      {
        type: "multiple_choice",
        situation: "Du brauchst ein Rezept.",
        question: "Wie fragst du nach einem Rezept?",
        options: ["Koennen Sie mir ein Rezept schreiben?", "Ich will Tabletten.", "Wo ist die Apotheke?"],
        answer: 0,
        explanation: "Hoefliche Frage mit Koennen Sie... ist korrekt.",
      },
    ],
  },
  {
    id: "a1-supermarkt",
    level: "A1",
    title: "Supermarkt",
    titleDe: "Im Supermarkt",
    icon: "\u{1F6D2}",
    premium: false,
    exercises: [
      {
        type: "multiple_choice",
        situation: "Du bist an der Kasse.",
        question: "Die Kassiererin fragt: Brauchen Sie eine Tuete? - Was sagst du?",
        options: ["Ja, bitte.", "Ich zahle mit Karte.", "Wo ist das Brot?"],
        answer: 0,
        explanation: "Ja, bitte ist die passende Antwort auf die Frage.",
      },
      {
        type: "fill_blank",
        situation: "Du suchst etwas im Supermarkt.",
        question: "Entschuldigung, wo ___ ich Milch?",
        options: ["finde", "kaufe", "brauche"],
        answer: "finde",
        explanation: "Wo finde ich...? ist die uebliche Frage im Supermarkt.",
      },
      {
        type: "sort_sentence",
        situation: "Du fragst nach dem Preis.",
        question: "Bringe den Satz in die richtige Reihenfolge:",
        options: ["kostet", "Wie", "das", "viel"],
        answer: [1, 3, 0, 2],
        explanation: "Richtig: Wie viel kostet das?",
      },
      {
        type: "quick_reaction",
        situation: "Die Kassiererin sagt: Das macht 7,50 Euro.",
        question: "Wie reagierst du?",
        options: ["Bezahlen", "Fragen: Ist das teuer?", "Wegrennen"],
        answer: 0,
        explanation: "Du bezahlst den genannten Betrag.",
      },
      {
        type: "multiple_choice",
        situation: "Du willst mit Karte bezahlen.",
        question: "Was sagst du?",
        options: ["Kann ich mit Karte zahlen?", "Ich habe kein Geld.", "Nehmen Sie Dollar?"],
        answer: 0,
        explanation: "Hoeflich fragen, ob Kartenzahlung moeglich ist.",
      },
    ],
  },
  {
    id: "a1-vorstellung",
    level: "A1",
    title: "Vorstellung",
    titleDe: "Sich vorstellen",
    icon: "\u{1F44B}",
    premium: true,
    exercises: [
      {
        type: "multiple_choice",
        situation: "Du triffst deinen neuen Nachbarn.",
        question: "Was sagst du zuerst?",
        options: ["Hallo, ich bin Max. Ich wohne nebenan.", "Wie ist die Miete hier?", "Haben Sie WLAN?"],
        answer: 0,
        explanation: "Sich zuerst vorstellen ist hoeflich.",
      },
      {
        type: "fill_blank",
        situation: "Jemand fragt: Woher kommst du?",
        question: "Ich ___ aus Bosnien.",
        options: ["komme", "bin", "gehe"],
        answer: "komme",
        explanation: "Ich komme aus... ist die Standard-Formulierung.",
      },
      {
        type: "sort_sentence",
        situation: "Du stellst dich bei der Arbeit vor.",
        question: "Bringe den Satz in die richtige Reihenfolge:",
        options: ["bin", "Ich", "der", "neue", "Kollege"],
        answer: [1, 0, 2, 3, 4],
        explanation: "Richtig: Ich bin der neue Kollege.",
      },
      {
        type: "quick_reaction",
        situation: "Jemand sagt: Freut mich! nach der Vorstellung.",
        question: "Wie antwortest du?",
        options: ["Mich auch!", "Danke!", "Tschuess!"],
        answer: 0,
        explanation: "Mich auch! oder Freut mich auch! ist die uebliche Antwort.",
      },
      {
        type: "multiple_choice",
        situation: "Du musst deinen Beruf nennen.",
        question: "Wie sagst du es?",
        options: ["Ich arbeite als Elektriker.", "Ich will Geld.", "Arbeit ist gut."],
        answer: 0,
        explanation: "Ich arbeite als... nennt den Beruf korrekt.",
      },
    ],
  },
  {
    id: "b1-telefon",
    level: "B1",
    title: "Telefongespraech",
    titleDe: "Am Telefon",
    icon: "\u{1F4DE}",
    premium: false,
    exercises: [
      {
        type: "multiple_choice",
        situation: "Du rufst bei einer Behoerde an.",
        question: "Wie meldest du dich am Telefon?",
        options: [
          "Guten Tag, mein Name ist Meier. Ich rufe wegen meiner Anmeldung an.",
          "Hallo? Ich brauche Hilfe!",
          "Sprechen Sie Bosnisch?",
        ],
        answer: 0,
        explanation: "Formelle Begruessung + Grund des Anrufs ist Standard.",
      },
      {
        type: "fill_blank",
        situation: "Du willst einen Termin vereinbaren.",
        question: "Koennte ich bitte einen Termin ___?",
        options: ["vereinbaren", "machen", "haben"],
        answer: "vereinbaren",
        explanation: "Einen Termin vereinbaren ist die formelle Wendung.",
      },
      {
        type: "sort_sentence",
        situation: "Du buchstabierst deinen Namen.",
        question: "Bringe den Satz in die richtige Reihenfolge:",
        options: ["buchstabieren", "Soll", "den", "ich", "Namen"],
        answer: [1, 3, 2, 4, 0],
        explanation: "Richtig: Soll ich den Namen buchstabieren?",
      },
      {
        type: "quick_reaction",
        situation: "Die Person sagt: Einen Moment bitte, ich verbinde Sie.",
        question: "Was sagst du?",
        options: ["Danke, ich warte.", "Bitte schnell!", "Ich rufe spaeter an."],
        answer: 0,
        explanation: "Hoeflich warten ist die richtige Reaktion.",
      },
      {
        type: "multiple_choice",
        situation: "Du hast etwas nicht verstanden.",
        question: "Was sagst du?",
        options: [
          "Entschuldigung, koennten Sie das bitte wiederholen?",
          "Was? Nochmal!",
          "Ich verstehe kein Deutsch.",
        ],
        answer: 0,
        explanation: "Hoeflich um Wiederholung bitten.",
      },
    ],
  },
  {
    id: "b1-bewerbung",
    level: "B1",
    title: "Bewerbungsgespraech",
    titleDe: "Im Vorstellungsgespraech",
    icon: "\u{1F4BC}",
    premium: true,
    exercises: [
      {
        type: "multiple_choice",
        situation: "Der Interviewer fragt nach deinen Staerken.",
        question: "Was ist eine gute Antwort?",
        options: [
          "Ich bin teamfaehig und arbeite zuverlaessig.",
          "Ich bin der Beste.",
          "Ich brauche den Job.",
        ],
        answer: 0,
        explanation: "Konkrete Staerken nennen, ohne zu uebertreiben.",
      },
      {
        type: "fill_blank",
        situation: "Du erzaehlst von deiner Erfahrung.",
        question: "In meiner letzten Stelle habe ich als Lagerarbeiter ___.",
        options: ["gearbeitet", "gemacht", "gewesen"],
        answer: "gearbeitet",
        explanation: "Als ... gearbeitet ist die korrekte Formulierung.",
      },
      {
        type: "quick_reaction",
        situation: "Am Ende fragt der Interviewer: Haben Sie noch Fragen?",
        question: "Wie reagierst du?",
        options: [
          "Ja - wie sieht die Einarbeitung aus?",
          "Nein, alles klar.",
          "Wann bekomme ich Urlaub?",
        ],
        answer: 0,
        explanation: "Eine relevante Frage zeigt Interesse und Vorbereitung.",
      },
      {
        type: "sort_sentence",
        situation: "Du bedankst dich nach dem Gespraech.",
        question: "Bringe den Satz in die richtige Reihenfolge:",
        options: ["fuer", "Vielen", "das", "Gespraech", "Dank"],
        answer: [1, 4, 0, 2, 3],
        explanation: "Richtig: Vielen Dank fuer das Gespraech.",
      },
      {
        type: "multiple_choice",
        situation: "Du wirst nach deiner Gehaltsvorstellung gefragt.",
        question: "Was ist eine professionelle Antwort?",
        options: [
          "Ich orientiere mich am branchenueblichen Gehalt.",
          "So viel wie moeglich.",
          "Das ist mir egal.",
        ],
        answer: 0,
        explanation: "Professionell und sachlich antworten.",
      },
    ],
  },
  {
    id: "b1-email",
    level: "B1",
    title: "E-Mail schreiben",
    titleDe: "Formelle E-Mail",
    icon: "\u{2709}\u{FE0F}",
    premium: true,
    exercises: [
      {
        type: "multiple_choice",
        situation: "Du schreibst eine E-Mail an deinen Vermieter.",
        question: "Wie faengst du an?",
        options: ["Sehr geehrter Herr Mueller,", "Hey!", "Lieber Vermieter,"],
        answer: 0,
        explanation: "Formelle Anrede bei offiziellen E-Mails.",
      },
      {
        type: "fill_blank",
        situation: "Du beschreibst ein Problem.",
        question: "Ich moechte Sie darauf ___, dass die Heizung defekt ist.",
        options: ["hinweisen", "sagen", "zeigen"],
        answer: "hinweisen",
        explanation: "Darauf hinweisen, dass... ist formelles Deutsch.",
      },
      {
        type: "quick_reaction",
        situation: "Du beendest die E-Mail.",
        question: "Welche Grussformel passt?",
        options: ["Mit freundlichen Gruessen", "Tschuess", "LG"],
        answer: 0,
        explanation: "Mit freundlichen Gruessen ist die formelle Schlussformel.",
      },
      {
        type: "sort_sentence",
        situation: "Du bittest um eine Antwort.",
        question: "Bringe den Satz in die richtige Reihenfolge:",
        options: ["eine", "Ich", "baldige", "bitte", "um", "Rueckmeldung"],
        answer: [1, 3, 4, 0, 2, 5],
        explanation: "Richtig: Ich bitte um eine baldige Rueckmeldung.",
      },
      {
        type: "multiple_choice",
        situation: "Du willst einen Anhang erwaehnen.",
        question: "Wie formulierst du das?",
        options: [
          "Im Anhang finden Sie die gewuenschten Unterlagen.",
          "Hier sind meine Papiere.",
          "Ich schicke dir was.",
        ],
        answer: 0,
        explanation: "Formelle Formulierung fuer Anhaenge in E-Mails.",
      },
    ],
  },
  {
    id: "b2-arbeit",
    level: "B2",
    title: "Arbeit Gespraech",
    titleDe: "Gespraech mit dem Chef",
    icon: "\u{1F3E2}",
    premium: false,
    exercises: [
      {
        type: "multiple_choice",
        situation: "Dein Chef fragt nach dem Projektstand.",
        question: "Wie antwortest du professionell?",
        options: [
          "Das Projekt liegt im Zeitplan. Ich informiere Sie, sobald es Neuigkeiten gibt.",
          "Laeuft.",
          "Keine Ahnung, ich muss nachschauen.",
        ],
        answer: 0,
        explanation: "Kurz, klar und professionell kommunizieren.",
      },
      {
        type: "fill_blank",
        situation: "Du schlaegst eine Loesung vor.",
        question: "Ich ___ vorschlagen, dass wir das Vorgehen aendern.",
        options: ["wuerde", "will", "kann"],
        answer: "wuerde",
        explanation: "Konjunktiv II (wuerde) klingt hoeflicher und professioneller.",
      },
      {
        type: "quick_reaction",
        situation: "Ein Kollege bittet dich um Hilfe bei einer Aufgabe.",
        question: "Wie reagierst du?",
        options: [
          "Klar, lass uns das zusammen anschauen.",
          "Das ist nicht mein Problem.",
          "Frag jemand anderen.",
        ],
        answer: 0,
        explanation: "Teamarbeit und Hilfsbereitschaft zeigen.",
      },
      {
        type: "sort_sentence",
        situation: "Du praesentierst Ergebnisse.",
        question: "Bringe den Satz in die richtige Reihenfolge:",
        options: ["moechte", "Ich", "die", "Ergebnisse", "Ihnen", "vorstellen"],
        answer: [1, 0, 4, 2, 3, 5],
        explanation: "Richtig: Ich moechte Ihnen die Ergebnisse vorstellen.",
      },
      {
        type: "multiple_choice",
        situation: "Du willst einen freien Tag beantragen.",
        question: "Wie formulierst du das?",
        options: [
          "Waere es moeglich, am Freitag einen Tag frei zu nehmen?",
          "Ich komme Freitag nicht.",
          "Ich brauche frei.",
        ],
        answer: 0,
        explanation: "Hoefliche Frage mit Konjunktiv zeigt Respekt.",
      },
    ],
  },
  {
    id: "b2-problem",
    level: "B2",
    title: "Problem erklaeren",
    titleDe: "Ein Problem schildern",
    icon: "\u{26A0}\u{FE0F}",
    premium: true,
    exercises: [
      {
        type: "multiple_choice",
        situation: "In deiner Wohnung funktioniert die Heizung nicht.",
        question: "Wie meldest du das dem Vermieter?",
        options: [
          "Ich moechte melden, dass die Heizung seit zwei Tagen nicht funktioniert.",
          "Heizung kaputt!",
          "Es ist kalt bei mir.",
        ],
        answer: 0,
        explanation: "Klar das Problem + Zeitraum benennen.",
      },
      {
        type: "fill_blank",
        situation: "Du reklamierst bei einem Unternehmen.",
        question: "Ich moechte eine ___ einreichen.",
        options: ["Beschwerde", "Frage", "Meinung"],
        answer: "Beschwerde",
        explanation: "Eine Beschwerde einreichen ist die formelle Wendung.",
      },
      {
        type: "sort_sentence",
        situation: "Du erklaerst das Problem sachlich.",
        question: "Bringe den Satz in die richtige Reihenfolge:",
        options: ["Problem", "Das", "besteht", "seit", "letzter", "Woche"],
        answer: [1, 0, 2, 3, 4, 5],
        explanation: "Richtig: Das Problem besteht seit letzter Woche.",
      },
      {
        type: "quick_reaction",
        situation: "Der Kundenservice sagt: Wir kuemmern uns darum.",
        question: "Wie reagierst du?",
        options: [
          "Danke. Bis wann kann ich mit einer Loesung rechnen?",
          "Okay.",
          "Das glaube ich nicht.",
        ],
        answer: 0,
        explanation: "Hoeflich nachfragen zeigt, dass du eine konkrete Antwort erwartest.",
      },
      {
        type: "multiple_choice",
        situation: "Du willst den Stand deiner Beschwerde erfragen.",
        question: "Was sagst du?",
        options: [
          "Koennten Sie mir den aktuellen Stand meiner Anfrage mitteilen?",
          "Was ist mit meinem Fall?",
          "Antworten Sie endlich!",
        ],
        answer: 0,
        explanation: "Hoefliche, formelle Nachfrage ist professionell.",
      },
    ],
  },
];

export function getLessonsForLevel(level: string): Lesson[] {
  return lessons.filter((l) => l.level === level);
}

export function getLessonById(id: string): Lesson | undefined {
  return lessons.find((l) => l.id === id);
}
