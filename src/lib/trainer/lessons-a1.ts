import type { Lesson } from "./types";

export const lessonsA1: Lesson[] = [
  {
    "id": "a1-01",
    "level": "A1",
    "title": "Arzttermin",
    "titleDe": "Beim Arzt",
    "icon": "🩺",
    "premium": false,
    "exercises": [
      {
        "type": "multiple_choice",
        "situation": "Du bist beim Arzt. Die Sprechstundenhilfe fragt dich etwas.",
        "question": "Haben Sie Ihre Versichertenkarte dabei?",
        "options": [
          "Ja, hier bitte.",
          "Ich bin krank.",
          "Nein, ich habe Hunger."
        ],
        "answer": 0,
        "explanation": "Die Versichertenkarte brauchst du bei jedem Arztbesuch."
      },
      {
        "type": "sort_sentence",
        "situation": "Du beschreibst dem Arzt dein Problem.",
        "question": "Bringe den Satz in die richtige Reihenfolge:",
        "options": [
          "habe",
          "Kopfschmerzen",
          "Ich",
          "seit",
          "gestern"
        ],
        "answer": [
          2,
          0,
          3,
          4,
          1
        ],
        "explanation": "Richtig: Ich habe seit gestern Kopfschmerzen."
      },
      {
        "type": "fill_blank",
        "situation": "Der Arzt fragt nach deinen Beschwerden.",
        "question": "Mir ___ der Bauch weh.",
        "options": [
          "tut",
          "macht",
          "ist"
        ],
        "answer": "tut",
        "explanation": "Mir tut ... weh ist die korrekte Formulierung."
      },
      {
        "type": "quick_reaction",
        "situation": "Der Arzt sagt: Bitte machen Sie den Oberkörper frei.",
        "question": "Was machst du?",
        "options": [
          "T-Shirt ausziehen",
          "Schuhe ausziehen",
          "Sich hinsetzen"
        ],
        "answer": 0,
        "explanation": "Oberkörper frei machen = T-Shirt/Hemd ausziehen."
      },
      {
        "type": "multiple_choice",
        "situation": "Du brauchst ein Rezept.",
        "question": "Wie fragst du nach einem Rezept?",
        "options": [
          "Können Sie mir ein Rezept schreiben?",
          "Ich will Tabletten.",
          "Wo ist die Apotheke?"
        ],
        "answer": 0,
        "explanation": "Höfliche Frage mit Können Sie... ist korrekt."
      }
    ]
  },
  {
    "id": "a1-02",
    "level": "A1",
    "title": "Supermarkt",
    "titleDe": "Im Supermarkt",
    "icon": "🛒",
    "premium": false,
    "exercises": [
      {
        "type": "multiple_choice",
        "situation": "Du bist an der Kasse.",
        "question": "Die Kassiererin fragt: Brauchen Sie eine Tüte?",
        "options": [
          "Ja, bitte.",
          "Ich zahle mit Karte.",
          "Wo ist das Brot?"
        ],
        "answer": 0,
        "explanation": "Ja, bitte ist die passende Antwort auf die Frage."
      },
      {
        "type": "fill_blank",
        "situation": "Du suchst etwas im Supermarkt.",
        "question": "Entschuldigung, wo ___ ich Milch?",
        "options": [
          "finde",
          "kaufe",
          "brauche"
        ],
        "answer": "finde",
        "explanation": "Wo finde ich...? ist die übliche Frage im Supermarkt."
      },
      {
        "type": "sort_sentence",
        "situation": "Du fragst nach dem Preis.",
        "question": "Bringe den Satz in die richtige Reihenfolge:",
        "options": [
          "kostet",
          "Wie",
          "das",
          "viel"
        ],
        "answer": [
          1,
          3,
          0,
          2
        ],
        "explanation": "Richtig: Wie viel kostet das?"
      },
      {
        "type": "quick_reaction",
        "situation": "Die Kassiererin sagt: Das macht 7,50 Euro.",
        "question": "Wie reagierst du?",
        "options": [
          "Bezahlen",
          "Fragen: Ist das teuer?",
          "Wegrennen"
        ],
        "answer": 0,
        "explanation": "Du bezahlst den genannten Betrag."
      },
      {
        "type": "multiple_choice",
        "situation": "Du willst mit Karte bezahlen.",
        "question": "Was sagst du?",
        "options": [
          "Kann ich mit Karte zahlen?",
          "Ich habe kein Geld.",
          "Nehmen Sie Dollar?"
        ],
        "answer": 0,
        "explanation": "Höflich fragen, ob Kartenzahlung möglich ist."
      }
    ]
  },
  {
    "id": "a1-03",
    "level": "A1",
    "title": "Vorstellung",
    "titleDe": "Sich vorstellen",
    "icon": "👋",
    "premium": false,
    "exercises": [
      {
        "type": "multiple_choice",
        "situation": "Du triffst deinen neuen Nachbarn.",
        "question": "Was sagst du zuerst?",
        "options": [
          "Hallo, ich bin Max. Ich wohne nebenan.",
          "Wie ist die Miete hier?",
          "Haben Sie WLAN?"
        ],
        "answer": 0,
        "explanation": "Sich zuerst vorstellen ist höflich."
      },
      {
        "type": "fill_blank",
        "situation": "Jemand fragt: Woher kommst du?",
        "question": "Ich ___ aus Bosnien.",
        "options": [
          "komme",
          "bin",
          "gehe"
        ],
        "answer": "komme",
        "explanation": "Ich komme aus... ist die Standard-Formulierung."
      },
      {
        "type": "sort_sentence",
        "situation": "Du stellst dich bei der Arbeit vor.",
        "question": "Bringe den Satz in die richtige Reihenfolge:",
        "options": [
          "bin",
          "Ich",
          "der",
          "neue",
          "Kollege"
        ],
        "answer": [
          1,
          0,
          2,
          3,
          4
        ],
        "explanation": "Richtig: Ich bin der neue Kollege."
      },
      {
        "type": "quick_reaction",
        "situation": "Jemand sagt: Freut mich!",
        "question": "Wie antwortest du?",
        "options": [
          "Mich auch!",
          "Danke!",
          "Tschüss!"
        ],
        "answer": 0,
        "explanation": "Mich auch! oder Freut mich auch! ist die übliche Antwort."
      },
      {
        "type": "multiple_choice",
        "situation": "Du musst deinen Beruf nennen.",
        "question": "Wie sagst du es?",
        "options": [
          "Ich arbeite als Elektriker.",
          "Ich will Geld.",
          "Arbeit ist gut."
        ],
        "answer": 0,
        "explanation": "Ich arbeite als... nennt den Beruf korrekt."
      }
    ]
  },
  {
    "id": "a1-04",
    "level": "A1",
    "title": "Wohnung suchen",
    "titleDe": "Wohnung suchen",
    "icon": "🏠",
    "premium": false,
    "exercises": [
      {
        "type": "multiple_choice",
        "situation": "Du liest eine Wohnungsanzeige.",
        "question": "Was bedeutet 2 ZKB?",
        "options": [
          "2 Zimmer, Küche, Bad",
          "2 Zimmer, kein Balkon",
          "2 Zimmer, Keller, Balkon"
        ],
        "answer": 0,
        "explanation": "ZKB steht für Zimmer, Küche, Bad."
      },
      {
        "type": "fill_blank",
        "situation": "Du rufst wegen einer Wohnung an.",
        "question": "Ich ___ mich für die Wohnung in der Hauptstraße.",
        "options": [
          "interessiere",
          "frage",
          "möchte"
        ],
        "answer": "interessiere",
        "explanation": "Ich interessiere mich für... ist die passende Formulierung."
      },
      {
        "type": "sort_sentence",
        "situation": "Du fragst nach der Miete.",
        "question": "Bringe den Satz in die richtige Reihenfolge:",
        "options": [
          "die",
          "Wie",
          "hoch",
          "Miete",
          "ist"
        ],
        "answer": [
          1,
          2,
          4,
          0,
          3
        ],
        "explanation": "Richtig: Wie hoch ist die Miete?"
      },
      {
        "type": "quick_reaction",
        "situation": "Der Vermieter fragt: Wann möchten Sie einziehen?",
        "question": "Was antwortest du?",
        "options": [
          "Ab dem 1. nächsten Monat.",
          "Sofort, jetzt!",
          "Ich weiß nicht."
        ],
        "answer": 0,
        "explanation": "Ein konkretes Datum nennen ist professionell."
      },
      {
        "type": "multiple_choice",
        "situation": "Du besichtigst eine Wohnung.",
        "question": "Was fragst du?",
        "options": [
          "Sind die Nebenkosten inklusive?",
          "Kann ich die Wand einreißen?",
          "Wohnen hier nette Leute?"
        ],
        "answer": 0,
        "explanation": "Nebenkosten sind eine wichtige Frage bei der Besichtigung."
      }
    ]
  },
  {
    "id": "a1-05",
    "level": "A1",
    "title": "Behörde",
    "titleDe": "Auf der Behörde",
    "icon": "🏛️",
    "premium": false,
    "exercises": [
      {
        "type": "multiple_choice",
        "situation": "Du bist beim Bürgeramt.",
        "question": "Was brauchst du für die Anmeldung?",
        "options": [
          "Personalausweis und Mietvertrag",
          "Nur meinen Namen",
          "Einen Führerschein"
        ],
        "answer": 0,
        "explanation": "Für die Anmeldung brauchst du einen Ausweis und den Mietvertrag."
      },
      {
        "type": "fill_blank",
        "situation": "Du stehst am Empfang.",
        "question": "Ich möchte mich bitte ___.",
        "options": [
          "anmelden",
          "melden",
          "einmelden"
        ],
        "answer": "anmelden",
        "explanation": "Sich anmelden ist der korrekte Begriff beim Bürgeramt."
      },
      {
        "type": "sort_sentence",
        "situation": "Du fragst nach einem Formular.",
        "question": "Bringe den Satz in die richtige Reihenfolge:",
        "options": [
          "mir",
          "Können",
          "ein",
          "Formular",
          "Sie",
          "geben"
        ],
        "answer": [
          1,
          4,
          0,
          2,
          3,
          5
        ],
        "explanation": "Richtig: Können Sie mir ein Formular geben?"
      },
      {
        "type": "quick_reaction",
        "situation": "Der Beamte sagt: Bitte nehmen Sie im Wartebereich Platz.",
        "question": "Was machst du?",
        "options": [
          "Im Wartebereich hinsetzen",
          "Sofort zum Schalter gehen",
          "Das Gebäude verlassen"
        ],
        "answer": 0,
        "explanation": "Du setzt dich in den Wartebereich und wartest."
      },
      {
        "type": "multiple_choice",
        "situation": "Du brauchst eine Bescheinigung.",
        "question": "Wie fragst du danach?",
        "options": [
          "Könnte ich bitte eine Meldebescheinigung bekommen?",
          "Geben Sie mir ein Papier!",
          "Ich brauche irgendwas."
        ],
        "answer": 0,
        "explanation": "Höflich und konkret fragen ist am besten."
      }
    ]
  },
  {
    "id": "a1-06",
    "level": "A1",
    "title": "Restaurant",
    "titleDe": "Im Restaurant",
    "icon": "🍽️",
    "premium": false,
    "exercises": [
      {
        "type": "multiple_choice",
        "situation": "Du möchtest bestellen.",
        "question": "Was sagst du zum Kellner?",
        "options": [
          "Ich hätte gerne eine Suppe, bitte.",
          "Essen! Schnell!",
          "Was gibt es?"
        ],
        "answer": 0,
        "explanation": "Ich hätte gerne... ist die höfliche Bestellform."
      },
      {
        "type": "fill_blank",
        "situation": "Du möchtest bezahlen.",
        "question": "Könnte ich bitte die ___ haben?",
        "options": [
          "Rechnung",
          "Karte",
          "Speise"
        ],
        "answer": "Rechnung",
        "explanation": "Man fragt nach der Rechnung, wenn man bezahlen möchte."
      },
      {
        "type": "sort_sentence",
        "situation": "Du fragst nach der Empfehlung.",
        "question": "Bringe den Satz in die richtige Reihenfolge:",
        "options": [
          "empfehlen",
          "Was",
          "Sie",
          "können",
          "mir"
        ],
        "answer": [
          1,
          3,
          2,
          4,
          0
        ],
        "explanation": "Richtig: Was können Sie mir empfehlen?"
      },
      {
        "type": "quick_reaction",
        "situation": "Der Kellner fragt: Möchten Sie noch etwas trinken?",
        "question": "Wie reagierst du?",
        "options": [
          "Nein, danke. Das war alles.",
          "Vielleicht.",
          "Ich habe Durst."
        ],
        "answer": 0,
        "explanation": "Eine klare Antwort gibt dem Kellner Bescheid."
      },
      {
        "type": "multiple_choice",
        "situation": "Das Essen ist kalt.",
        "question": "Wie beschwerst du dich höflich?",
        "options": [
          "Entschuldigung, das Essen ist leider kalt.",
          "Das Essen ist schlecht!",
          "Ich will den Chef sprechen!"
        ],
        "answer": 0,
        "explanation": "Höflich und sachlich reklamieren ist professionell."
      }
    ]
  },
  {
    "id": "a1-07",
    "level": "A1",
    "title": "Weg fragen",
    "titleDe": "Nach dem Weg fragen",
    "icon": "🗺️",
    "premium": false,
    "exercises": [
      {
        "type": "multiple_choice",
        "situation": "Du bist in einer fremden Stadt.",
        "question": "Wie fragst du nach dem Weg?",
        "options": [
          "Entschuldigung, wie komme ich zum Bahnhof?",
          "Wo bin ich?",
          "Ist das hier schön?"
        ],
        "answer": 0,
        "explanation": "Wie komme ich zum/zur...? ist die Standardfrage."
      },
      {
        "type": "fill_blank",
        "situation": "Jemand erklärt dir den Weg.",
        "question": "Gehen Sie ___ und dann links.",
        "options": [
          "geradeaus",
          "zurück",
          "schnell"
        ],
        "answer": "geradeaus",
        "explanation": "Geradeaus bedeutet, dass du einfach weitergehen sollst."
      },
      {
        "type": "sort_sentence",
        "situation": "Du fragst nach der nächsten Apotheke.",
        "question": "Bringe den Satz in die richtige Reihenfolge:",
        "options": [
          "nächste",
          "Wo",
          "die",
          "ist",
          "Apotheke"
        ],
        "answer": [
          1,
          3,
          2,
          0,
          4
        ],
        "explanation": "Richtig: Wo ist die nächste Apotheke?"
      },
      {
        "type": "quick_reaction",
        "situation": "Jemand sagt: Es ist gleich um die Ecke.",
        "question": "Was bedeutet das?",
        "options": [
          "Es ist ganz in der Nähe.",
          "Es ist weit weg.",
          "Du musst den Bus nehmen."
        ],
        "answer": 0,
        "explanation": "Gleich um die Ecke bedeutet sehr nah."
      },
      {
        "type": "multiple_choice",
        "situation": "Du bedankst dich für die Hilfe.",
        "question": "Was sagst du?",
        "options": [
          "Vielen Dank für Ihre Hilfe!",
          "Okay, tschüss.",
          "Geht so."
        ],
        "answer": 0,
        "explanation": "Sich höflich bedanken gehört zum guten Umgangston."
      }
    ]
  },
  {
    "id": "a1-08",
    "level": "A1",
    "title": "Bus und Bahn",
    "titleDe": "Bus und Bahn",
    "icon": "🚌",
    "premium": false,
    "exercises": [
      {
        "type": "multiple_choice",
        "situation": "Du willst ein Ticket kaufen.",
        "question": "Was sagst du am Schalter?",
        "options": [
          "Eine Einzelfahrkarte nach Berlin, bitte.",
          "Ich will fahren.",
          "Wann kommt der Bus?"
        ],
        "answer": 0,
        "explanation": "Eine Einzelfahrkarte nach... ist die korrekte Bestellung."
      },
      {
        "type": "fill_blank",
        "situation": "Du fragst nach der Abfahrtszeit.",
        "question": "Wann ___ der nächste Zug nach München?",
        "options": [
          "fährt",
          "geht",
          "kommt"
        ],
        "answer": "fährt",
        "explanation": "Züge und Busse fahren, nicht gehen."
      },
      {
        "type": "sort_sentence",
        "situation": "Du fragst nach dem Gleis.",
        "question": "Bringe den Satz in die richtige Reihenfolge:",
        "options": [
          "welchem",
          "Von",
          "fährt",
          "Gleis",
          "der",
          "Zug"
        ],
        "answer": [
          1,
          0,
          3,
          2,
          4,
          5
        ],
        "explanation": "Richtig: Von welchem Gleis fährt der Zug?"
      },
      {
        "type": "quick_reaction",
        "situation": "Die Durchsage sagt: Bitte Türen freihalten!",
        "question": "Was machst du?",
        "options": [
          "Von der Tür weggehen",
          "Die Tür festhalten",
          "Schnell einsteigen"
        ],
        "answer": 0,
        "explanation": "Türen freihalten bedeutet: Nicht an der Tür stehen."
      },
      {
        "type": "multiple_choice",
        "situation": "Du hast den falschen Zug genommen.",
        "question": "Was sagst du zum Schaffner?",
        "options": [
          "Entschuldigung, ich bin im falschen Zug.",
          "Dieser Zug gefällt mir nicht.",
          "Bringen Sie mich nach Hause."
        ],
        "answer": 0,
        "explanation": "Ruhig und klar den Fehler erklären."
      }
    ]
  },
  {
    "id": "a1-09",
    "level": "A1",
    "title": "Zahlen und Uhrzeit",
    "titleDe": "Zahlen und Uhrzeit",
    "icon": "🕐",
    "premium": false,
    "exercises": [
      {
        "type": "multiple_choice",
        "situation": "Jemand fragt: Wie spät ist es?",
        "question": "Die Uhr zeigt 14:30. Was sagst du?",
        "options": [
          "Es ist halb drei.",
          "Es ist zwei Uhr dreißig.",
          "Es ist vierzehn Uhr."
        ],
        "answer": 0,
        "explanation": "Halb drei ist die umgangssprachliche Form für 14:30."
      },
      {
        "type": "fill_blank",
        "situation": "Du sagst deine Telefonnummer.",
        "question": "Meine Nummer ist null-eins-sieben-zwei ___ fünf-sechs.",
        "options": [
          "drei-vier",
          "dreivierundfünf",
          "34"
        ],
        "answer": "drei-vier",
        "explanation": "Telefonnummern werden einzeln oder in Zweiergruppen gesprochen."
      },
      {
        "type": "sort_sentence",
        "situation": "Du vereinbarst eine Uhrzeit.",
        "question": "Bringe den Satz in die richtige Reihenfolge:",
        "options": [
          "um",
          "Treffen",
          "acht",
          "wir",
          "uns"
        ],
        "answer": [
          1,
          3,
          4,
          0,
          2
        ],
        "explanation": "Richtig: Treffen wir uns um acht?"
      },
      {
        "type": "quick_reaction",
        "situation": "Jemand sagt: Viertel vor zehn.",
        "question": "Wie spät ist es?",
        "options": [
          "9:45",
          "10:15",
          "10:45"
        ],
        "answer": 0,
        "explanation": "Viertel vor zehn = 9:45 Uhr."
      },
      {
        "type": "multiple_choice",
        "situation": "Du nennst dein Geburtsdatum.",
        "question": "Wie sagst du es?",
        "options": [
          "Ich bin am fünfzehnten März geboren.",
          "Mein Datum ist 15.3.",
          "Ich bin März."
        ],
        "answer": 0,
        "explanation": "Ich bin am ... geboren ist die korrekte Formulierung."
      }
    ]
  },
  {
    "id": "a1-10",
    "level": "A1",
    "title": "Familie",
    "titleDe": "Meine Familie",
    "icon": "👨‍👩‍👧",
    "premium": false,
    "exercises": [
      {
        "type": "multiple_choice",
        "situation": "Jemand fragt dich nach deiner Familie.",
        "question": "Was sagst du?",
        "options": [
          "Ich habe zwei Geschwister.",
          "Familie ist wichtig.",
          "Meine Eltern wohnen."
        ],
        "answer": 0,
        "explanation": "Konkret antworten: Anzahl und Familienmitglieder nennen."
      },
      {
        "type": "fill_blank",
        "situation": "Du erzählst von deinen Eltern.",
        "question": "Mein Vater ___ als Ingenieur.",
        "options": [
          "arbeitet",
          "macht",
          "geht"
        ],
        "answer": "arbeitet",
        "explanation": "Mein Vater arbeitet als... beschreibt den Beruf."
      },
      {
        "type": "sort_sentence",
        "situation": "Du stellst deine Familie vor.",
        "question": "Bringe den Satz in die richtige Reihenfolge:",
        "options": [
          "und",
          "Ich",
          "verheiratet",
          "bin",
          "habe",
          "zwei",
          "Kinder"
        ],
        "answer": [
          1,
          3,
          2,
          0,
          4,
          5,
          6
        ],
        "explanation": "Richtig: Ich bin verheiratet und habe zwei Kinder."
      },
      {
        "type": "quick_reaction",
        "situation": "Jemand fragt: Haben Sie Kinder?",
        "question": "Wie antwortest du?",
        "options": [
          "Ja, einen Sohn und eine Tochter.",
          "Kinder sind schön.",
          "Vielleicht."
        ],
        "answer": 0,
        "explanation": "Konkret antworten mit Anzahl und Geschlecht."
      },
      {
        "type": "multiple_choice",
        "situation": "Du sprichst über deine Schwester.",
        "question": "Was sagst du?",
        "options": [
          "Meine Schwester ist jünger als ich.",
          "Schwester gut.",
          "Ich habe Schwester."
        ],
        "answer": 0,
        "explanation": "Vollständige Sätze mit Artikel und Verb verwenden."
      }
    ]
  },
  {
    "id": "a1-11",
    "level": "A1",
    "title": "Kleidung kaufen",
    "titleDe": "Kleidung einkaufen",
    "icon": "👕",
    "premium": true,
    "exercises": [
      {
        "type": "multiple_choice",
        "situation": "Du bist in einem Bekleidungsgeschäft.",
        "question": "Was sagst du zur Verkäuferin?",
        "options": [
          "Haben Sie das in Größe M?",
          "Ich will ein T-Shirt.",
          "Ist das neu?"
        ],
        "answer": 0,
        "explanation": "Nach der Größe fragen ist beim Kleidungskauf üblich."
      },
      {
        "type": "fill_blank",
        "situation": "Du möchtest etwas anprobieren.",
        "question": "Kann ich das bitte ___?",
        "options": [
          "anprobieren",
          "kaufen",
          "sehen"
        ],
        "answer": "anprobieren",
        "explanation": "Anprobieren bedeutet, die Kleidung zu testen."
      },
      {
        "type": "sort_sentence",
        "situation": "Du sagst, was du suchst.",
        "question": "Bringe den Satz in die richtige Reihenfolge:",
        "options": [
          "eine",
          "Ich",
          "suche",
          "warme",
          "Jacke"
        ],
        "answer": [
          1,
          2,
          0,
          3,
          4
        ],
        "explanation": "Richtig: Ich suche eine warme Jacke."
      },
      {
        "type": "quick_reaction",
        "situation": "Die Verkäuferin fragt: Passt es?",
        "question": "Wie antwortest du?",
        "options": [
          "Ja, es passt gut. Ich nehme es.",
          "Vielleicht.",
          "Nein, ich mag es nicht."
        ],
        "answer": 0,
        "explanation": "Klare Antwort, ob die Kleidung passt."
      }
    ]
  },
  {
    "id": "a1-12",
    "level": "A1",
    "title": "Apotheke",
    "titleDe": "In der Apotheke",
    "icon": "💊",
    "premium": true,
    "exercises": [
      {
        "type": "multiple_choice",
        "situation": "Du hast Kopfschmerzen.",
        "question": "Was sagst du in der Apotheke?",
        "options": [
          "Ich hätte gerne etwas gegen Kopfschmerzen.",
          "Ich bin krank.",
          "Haben Sie Medikamente?"
        ],
        "answer": 0,
        "explanation": "Konkret das Symptom nennen hilft dem Apotheker."
      },
      {
        "type": "fill_blank",
        "situation": "Du fragst nach der Dosierung.",
        "question": "Wie ___ muss ich die Tabletten nehmen?",
        "options": [
          "oft",
          "viel",
          "lange"
        ],
        "answer": "oft",
        "explanation": "Wie oft? fragt nach der Häufigkeit der Einnahme."
      },
      {
        "type": "sort_sentence",
        "situation": "Du beschreibst deine Symptome.",
        "question": "Bringe den Satz in die richtige Reihenfolge:",
        "options": [
          "habe",
          "Ich",
          "Halsschmerzen",
          "seit",
          "zwei",
          "Tagen"
        ],
        "answer": [
          1,
          0,
          3,
          4,
          5,
          2
        ],
        "explanation": "Richtig: Ich habe seit zwei Tagen Halsschmerzen."
      },
      {
        "type": "quick_reaction",
        "situation": "Der Apotheker sagt: Nehmen Sie dreimal täglich eine Tablette.",
        "question": "Wie oft nimmst du die Tablette?",
        "options": [
          "3 Mal am Tag",
          "3 Tabletten auf einmal",
          "Einmal am Tag"
        ],
        "answer": 0,
        "explanation": "Dreimal täglich = morgens, mittags, abends."
      },
      {
        "type": "multiple_choice",
        "situation": "Du brauchst ein verschreibungspflichtiges Medikament.",
        "question": "Was sagt der Apotheker?",
        "options": [
          "Dafür brauche ich ein Rezept vom Arzt.",
          "Nehmen Sie es einfach.",
          "Das ist zu teuer."
        ],
        "answer": 0,
        "explanation": "Bestimmte Medikamente gibt es nur mit ärztlichem Rezept."
      }
    ]
  },
  {
    "id": "a1-13",
    "level": "A1",
    "title": "Wetter",
    "titleDe": "Über das Wetter sprechen",
    "icon": "🌤️",
    "premium": true,
    "exercises": [
      {
        "type": "multiple_choice",
        "situation": "Dein Nachbar spricht dich an.",
        "question": "Was sagt man oft als Small Talk?",
        "options": [
          "Schönes Wetter heute, oder?",
          "Ich mag kein Wetter.",
          "Wetter ist Wetter."
        ],
        "answer": 0,
        "explanation": "Über das Wetter reden ist typischer Small Talk in Deutschland."
      },
      {
        "type": "fill_blank",
        "situation": "Du beschreibst das Wetter.",
        "question": "Heute ___ es sehr kalt draußen.",
        "options": [
          "ist",
          "hat",
          "macht"
        ],
        "answer": "ist",
        "explanation": "Es ist kalt/warm/heiß ist die korrekte Wetterbeschreibung."
      },
      {
        "type": "sort_sentence",
        "situation": "Du sagst, was du anziehen sollst.",
        "question": "Bringe den Satz in die richtige Reihenfolge:",
        "options": [
          "eine",
          "nehme",
          "Ich",
          "mit",
          "Regenjacke"
        ],
        "answer": [
          2,
          1,
          0,
          4,
          3
        ],
        "explanation": "Richtig: Ich nehme eine Regenjacke mit."
      },
      {
        "type": "quick_reaction",
        "situation": "Es regnet stark. Ein Kollege fragt: Hast du einen Regenschirm?",
        "question": "Wie antwortest du?",
        "options": [
          "Nein, leider nicht.",
          "Regen ist okay.",
          "Ich bleibe hier."
        ],
        "answer": 0,
        "explanation": "Höflich antworten und nach Hilfe fragen."
      }
    ]
  },
  {
    "id": "a1-14",
    "level": "A1",
    "title": "Hobbys",
    "titleDe": "Über Hobbys sprechen",
    "icon": "⚽",
    "premium": true,
    "exercises": [
      {
        "type": "multiple_choice",
        "situation": "Jemand fragt: Was machst du in deiner Freizeit?",
        "question": "Was antwortest du?",
        "options": [
          "Ich spiele gerne Fußball und lese Bücher.",
          "Freizeit ist gut.",
          "Ich weiß nicht."
        ],
        "answer": 0,
        "explanation": "Konkrete Hobbys nennen mit ich ... gerne."
      },
      {
        "type": "fill_blank",
        "situation": "Du erzählst von deinem Hobby.",
        "question": "Am Wochenende ___ ich gerne.",
        "options": [
          "koche",
          "esse",
          "mache"
        ],
        "answer": "koche",
        "explanation": "Ich koche gerne beschreibt ein konkretes Hobby."
      },
      {
        "type": "sort_sentence",
        "situation": "Du fragst nach dem Hobby.",
        "question": "Bringe den Satz in die richtige Reihenfolge:",
        "options": [
          "dein",
          "Was",
          "Hobby",
          "ist"
        ],
        "answer": [
          1,
          3,
          0,
          2
        ],
        "explanation": "Richtig: Was ist dein Hobby?"
      },
      {
        "type": "quick_reaction",
        "situation": "Jemand fragt: Möchtest du mitspielen?",
        "question": "Wie reagierst du?",
        "options": [
          "Ja, sehr gerne!",
          "Sport ist anstrengend.",
          "Vielleicht morgen."
        ],
        "answer": 0,
        "explanation": "Ja, gerne! zeigt Interesse und Freundlichkeit."
      },
      {
        "type": "multiple_choice",
        "situation": "Du lädst jemanden ein.",
        "question": "Was sagst du?",
        "options": [
          "Hast du Lust, am Samstag schwimmen zu gehen?",
          "Komm schwimmen!",
          "Schwimmen ist toll."
        ],
        "answer": 0,
        "explanation": "Hast du Lust, ... zu gehen? ist eine höfliche Einladung."
      }
    ]
  },
  {
    "id": "a1-15",
    "level": "A1",
    "title": "Telefonieren",
    "titleDe": "Am Telefon (einfach)",
    "icon": "📱",
    "premium": true,
    "exercises": [
      {
        "type": "multiple_choice",
        "situation": "Dein Telefon klingelt.",
        "question": "Wie meldest du dich?",
        "options": [
          "Hallo, hier ist Meier.",
          "Wer ist da?",
          "Ja?"
        ],
        "answer": 0,
        "explanation": "Sich mit Namen melden ist in Deutschland üblich."
      },
      {
        "type": "fill_blank",
        "situation": "Du möchtest jemanden sprechen.",
        "question": "Könnte ich bitte Herrn Schmidt ___?",
        "options": [
          "sprechen",
          "sehen",
          "finden"
        ],
        "answer": "sprechen",
        "explanation": "Könnte ich bitte ... sprechen? ist die höfliche Form."
      },
      {
        "type": "sort_sentence",
        "situation": "Du hinterlässt eine Nachricht.",
        "question": "Bringe den Satz in die richtige Reihenfolge:",
        "options": [
          "bitte",
          "Können",
          "ausrichten",
          "Sie",
          "etwas"
        ],
        "answer": [
          1,
          3,
          0,
          4,
          2
        ],
        "explanation": "Richtig: Können Sie bitte etwas ausrichten?"
      },
      {
        "type": "quick_reaction",
        "situation": "Die Person sagt: Einen Moment, ich verbinde Sie.",
        "question": "Was sagst du?",
        "options": [
          "Danke, ich warte.",
          "Schneller, bitte!",
          "Ich rufe später an."
        ],
        "answer": 0,
        "explanation": "Höflich warten ist die richtige Reaktion."
      }
    ]
  },
  {
    "id": "a1-16",
    "level": "A1",
    "title": "Post",
    "titleDe": "Auf der Post",
    "icon": "📮",
    "premium": true,
    "exercises": [
      {
        "type": "multiple_choice",
        "situation": "Du möchtest ein Paket verschicken.",
        "question": "Was sagst du?",
        "options": [
          "Ich möchte dieses Paket nach Sarajevo schicken.",
          "Paket weg.",
          "Haben Sie Pakete?"
        ],
        "answer": 0,
        "explanation": "Klar sagen, wohin das Paket gehen soll."
      },
      {
        "type": "fill_blank",
        "situation": "Du fragst nach dem Porto.",
        "question": "Was ___ ein Brief nach Bosnien?",
        "options": [
          "kostet",
          "macht",
          "braucht"
        ],
        "answer": "kostet",
        "explanation": "Was kostet...? fragt nach dem Preis."
      },
      {
        "type": "sort_sentence",
        "situation": "Du willst ein Einschreiben versenden.",
        "question": "Bringe den Satz in die richtige Reihenfolge:",
        "options": [
          "als",
          "den",
          "Ich",
          "Brief",
          "Einschreiben",
          "möchte",
          "schicken"
        ],
        "answer": [
          2,
          5,
          1,
          3,
          0,
          4,
          6
        ],
        "explanation": "Richtig: Ich möchte den Brief als Einschreiben schicken."
      },
      {
        "type": "quick_reaction",
        "situation": "Der Postmitarbeiter fragt: Möchten Sie eine Sendungsverfolgung?",
        "question": "Was antwortest du?",
        "options": [
          "Ja, bitte.",
          "Was ist das?",
          "Nein, egal."
        ],
        "answer": 0,
        "explanation": "Mit Sendungsverfolgung kannst du das Paket online verfolgen."
      }
    ]
  },
  {
    "id": "a1-17",
    "level": "A1",
    "title": "Bank",
    "titleDe": "Bei der Bank",
    "icon": "🏦",
    "premium": true,
    "exercises": [
      {
        "type": "multiple_choice",
        "situation": "Du möchtest ein Konto eröffnen.",
        "question": "Was sagst du?",
        "options": [
          "Ich möchte gerne ein Girokonto eröffnen.",
          "Geben Sie mir Geld.",
          "Ich brauche eine Bank."
        ],
        "answer": 0,
        "explanation": "Ein Girokonto eröffnen ist der Fachbegriff."
      },
      {
        "type": "fill_blank",
        "situation": "Du fragst nach den Gebühren.",
        "question": "Wie hoch sind die monatlichen ___?",
        "options": [
          "Gebühren",
          "Kosten",
          "Preise"
        ],
        "answer": "Gebühren",
        "explanation": "Bei Banken spricht man von Kontogebühren."
      },
      {
        "type": "sort_sentence",
        "situation": "Du brauchst eine neue Karte.",
        "question": "Bringe den Satz in die richtige Reihenfolge:",
        "options": [
          "neue",
          "eine",
          "brauche",
          "Ich",
          "Bankkarte"
        ],
        "answer": [
          3,
          2,
          1,
          0,
          4
        ],
        "explanation": "Richtig: Ich brauche eine neue Bankkarte."
      },
      {
        "type": "quick_reaction",
        "situation": "Der Bankmitarbeiter fragt: Haben Sie Ihren Ausweis dabei?",
        "question": "Was machst du?",
        "options": [
          "Den Ausweis zeigen.",
          "Nach Hause gehen.",
          "Fragen: Welchen Ausweis?"
        ],
        "answer": 0,
        "explanation": "Den Personalausweis oder Reisepass vorzeigen."
      },
      {
        "type": "multiple_choice",
        "situation": "Du willst Geld überweisen.",
        "question": "Was brauchst du?",
        "options": [
          "Die IBAN des Empfängers.",
          "Die Telefonnummer.",
          "Den Namen des Chefs."
        ],
        "answer": 0,
        "explanation": "Für Überweisungen braucht man die IBAN."
      }
    ]
  },
  {
    "id": "a1-18",
    "level": "A1",
    "title": "Notfall",
    "titleDe": "Im Notfall",
    "icon": "🚨",
    "premium": true,
    "exercises": [
      {
        "type": "multiple_choice",
        "situation": "Du hast einen Notfall.",
        "question": "Welche Nummer rufst du an?",
        "options": [
          "112",
          "110",
          "911"
        ],
        "answer": 0,
        "explanation": "112 ist die Notrufnummer in Deutschland."
      },
      {
        "type": "fill_blank",
        "situation": "Du rufst den Notruf an.",
        "question": "Ich brauche einen ___! Jemand ist verletzt.",
        "options": [
          "Krankenwagen",
          "Arzt",
          "Polizisten"
        ],
        "answer": "Krankenwagen",
        "explanation": "Bei Verletzungen fordert man einen Krankenwagen an."
      },
      {
        "type": "sort_sentence",
        "situation": "Du beschreibst den Notfall.",
        "question": "Bringe den Satz in die richtige Reihenfolge:",
        "options": [
          "einen",
          "Es",
          "hat",
          "Unfall",
          "gegeben"
        ],
        "answer": [
          1,
          2,
          0,
          3,
          4
        ],
        "explanation": "Richtig: Es hat einen Unfall gegeben."
      },
      {
        "type": "quick_reaction",
        "situation": "Die Leitstelle fragt: Wo genau sind Sie?",
        "question": "Was antwortest du?",
        "options": [
          "In der Hauptstraße 15, Berlin.",
          "Draußen.",
          "Ich weiß nicht genau."
        ],
        "answer": 0,
        "explanation": "Die genaue Adresse angeben ist lebenswichtig."
      }
    ]
  },
  {
    "id": "a1-19",
    "level": "A1",
    "title": "Schule",
    "titleDe": "Schule und Kindergarten",
    "icon": "🎒",
    "premium": true,
    "exercises": [
      {
        "type": "multiple_choice",
        "situation": "Du meldest dein Kind in der Schule an.",
        "question": "Was sagst du?",
        "options": [
          "Ich möchte mein Kind für die erste Klasse anmelden.",
          "Mein Kind will lernen.",
          "Haben Sie Platz?"
        ],
        "answer": 0,
        "explanation": "Klar sagen, für welche Klasse man anmelden möchte."
      },
      {
        "type": "fill_blank",
        "situation": "Du fragst nach den Schulsachen.",
        "question": "Welche ___ braucht mein Kind?",
        "options": [
          "Schulmaterialien",
          "Sachen",
          "Dinge"
        ],
        "answer": "Schulmaterialien",
        "explanation": "Schulmaterialien ist der korrekte Begriff."
      },
      {
        "type": "sort_sentence",
        "situation": "Du schreibst eine Entschuldigung.",
        "question": "Bringe den Satz in die richtige Reihenfolge:",
        "options": [
          "Kind",
          "war",
          "Mein",
          "gestern",
          "krank"
        ],
        "answer": [
          2,
          0,
          1,
          3,
          4
        ],
        "explanation": "Richtig: Mein Kind war gestern krank."
      },
      {
        "type": "quick_reaction",
        "situation": "Die Lehrerin sagt: Ihr Kind macht gute Fortschritte.",
        "question": "Wie reagierst du?",
        "options": [
          "Das freut mich sehr, vielen Dank!",
          "Okay.",
          "Ist das gut?"
        ],
        "answer": 0,
        "explanation": "Sich freuen und bedanken zeigt Wertschätzung."
      }
    ]
  },
  {
    "id": "a1-20",
    "level": "A1",
    "title": "Nachbarn",
    "titleDe": "Mit Nachbarn sprechen",
    "icon": "🏘️",
    "premium": true,
    "exercises": [
      {
        "type": "multiple_choice",
        "situation": "Du bist neu eingezogen.",
        "question": "Was sagst du zu den Nachbarn?",
        "options": [
          "Hallo, ich bin neu hier. Ich wohne nebenan.",
          "Wer sind Sie?",
          "Machen Sie keinen Lärm!"
        ],
        "answer": 0,
        "explanation": "Sich freundlich vorstellen ist ein guter erster Eindruck."
      },
      {
        "type": "fill_blank",
        "situation": "Du bittest um Hilfe.",
        "question": "Könnten Sie mir bitte ein Paket ___?",
        "options": [
          "annehmen",
          "geben",
          "bringen"
        ],
        "answer": "annehmen",
        "explanation": "Nachbarn nehmen oft Pakete an, wenn man nicht da ist."
      },
      {
        "type": "sort_sentence",
        "situation": "Du entschuldigst dich für Lärm.",
        "question": "Bringe den Satz in die richtige Reihenfolge:",
        "options": [
          "den",
          "Entschuldigung",
          "Lärm",
          "für",
          "gestern"
        ],
        "answer": [
          1,
          3,
          0,
          2,
          4
        ],
        "explanation": "Richtig: Entschuldigung für den Lärm gestern."
      },
      {
        "type": "quick_reaction",
        "situation": "Dein Nachbar lädt dich zum Kaffee ein.",
        "question": "Wie reagierst du?",
        "options": [
          "Sehr gerne, das ist nett von Ihnen!",
          "Ich trinke keinen Kaffee.",
          "Vielleicht."
        ],
        "answer": 0,
        "explanation": "Die Einladung freundlich annehmen."
      }
    ]
  },
  {
    "id": "a1-21",
    "level": "A1",
    "title": "Termin machen",
    "titleDe": "Einen Termin machen",
    "icon": "📅",
    "premium": true,
    "exercises": [
      {
        "type": "multiple_choice",
        "situation": "Du bist in einer Situation zum Thema: Einen Termin machen.",
        "question": "Was sagst du?",
        "options": [
          "Höflich und klar antworten.",
          "Nichts sagen.",
          "Weggehen."
        ],
        "answer": 0,
        "explanation": "In der Situation Einen Termin machen ist klare Kommunikation wichtig."
      },
      {
        "type": "fill_blank",
        "situation": "Du brauchst Hilfe zum Thema Einen Termin machen.",
        "question": "Können Sie mir bitte ___?",
        "options": [
          "helfen",
          "sagen",
          "geben"
        ],
        "answer": "helfen",
        "explanation": "Können Sie mir bitte helfen? ist immer eine gute Frage."
      },
      {
        "type": "sort_sentence",
        "situation": "Du formulierst einen Satz zum Thema Einen Termin machen.",
        "question": "Bringe den Satz in die richtige Reihenfolge:",
        "options": [
          "ich",
          "Kann",
          "bitte",
          "fragen",
          "Sie"
        ],
        "answer": [
          1,
          4,
          0,
          2,
          3
        ],
        "explanation": "Richtig: Kann Sie ich bitte fragen?"
      },
      {
        "type": "quick_reaction",
        "situation": "Jemand gibt dir eine Antwort zum Thema Einen Termin machen.",
        "question": "Wie reagierst du?",
        "options": [
          "Vielen Dank für die Information.",
          "Okay.",
          "Ist das alles?"
        ],
        "answer": 0,
        "explanation": "Sich bedanken ist immer die beste Reaktion."
      }
    ]
  },
  {
    "id": "a1-22",
    "level": "A1",
    "title": "Taxi",
    "titleDe": "Taxi fahren",
    "icon": "🚕",
    "premium": true,
    "exercises": [
      {
        "type": "multiple_choice",
        "situation": "Du bist in einer Situation zum Thema: Taxi fahren.",
        "question": "Was sagst du?",
        "options": [
          "Höflich und klar antworten.",
          "Nichts sagen.",
          "Weggehen."
        ],
        "answer": 0,
        "explanation": "In der Situation Taxi fahren ist klare Kommunikation wichtig."
      },
      {
        "type": "fill_blank",
        "situation": "Du brauchst Hilfe zum Thema Taxi fahren.",
        "question": "Können Sie mir bitte ___?",
        "options": [
          "helfen",
          "sagen",
          "geben"
        ],
        "answer": "helfen",
        "explanation": "Können Sie mir bitte helfen? ist immer eine gute Frage."
      },
      {
        "type": "sort_sentence",
        "situation": "Du formulierst einen Satz zum Thema Taxi fahren.",
        "question": "Bringe den Satz in die richtige Reihenfolge:",
        "options": [
          "ich",
          "Kann",
          "bitte",
          "fragen",
          "Sie"
        ],
        "answer": [
          1,
          4,
          0,
          2,
          3
        ],
        "explanation": "Richtig: Kann Sie ich bitte fragen?"
      },
      {
        "type": "quick_reaction",
        "situation": "Jemand gibt dir eine Antwort zum Thema Taxi fahren.",
        "question": "Wie reagierst du?",
        "options": [
          "Vielen Dank für die Information.",
          "Okay.",
          "Ist das alles?"
        ],
        "answer": 0,
        "explanation": "Sich bedanken ist immer die beste Reaktion."
      }
    ]
  },
  {
    "id": "a1-23",
    "level": "A1",
    "title": "Farben",
    "titleDe": "Farben und Kleidung",
    "icon": "🎨",
    "premium": true,
    "exercises": [
      {
        "type": "multiple_choice",
        "situation": "Du bist in einer Situation zum Thema: Farben und Kleidung.",
        "question": "Was sagst du?",
        "options": [
          "Höflich und klar antworten.",
          "Nichts sagen.",
          "Weggehen."
        ],
        "answer": 0,
        "explanation": "In der Situation Farben und Kleidung ist klare Kommunikation wichtig."
      },
      {
        "type": "fill_blank",
        "situation": "Du brauchst Hilfe zum Thema Farben und Kleidung.",
        "question": "Können Sie mir bitte ___?",
        "options": [
          "helfen",
          "sagen",
          "geben"
        ],
        "answer": "helfen",
        "explanation": "Können Sie mir bitte helfen? ist immer eine gute Frage."
      },
      {
        "type": "sort_sentence",
        "situation": "Du formulierst einen Satz zum Thema Farben und Kleidung.",
        "question": "Bringe den Satz in die richtige Reihenfolge:",
        "options": [
          "ich",
          "Kann",
          "bitte",
          "fragen",
          "Sie"
        ],
        "answer": [
          1,
          4,
          0,
          2,
          3
        ],
        "explanation": "Richtig: Kann Sie ich bitte fragen?"
      },
      {
        "type": "quick_reaction",
        "situation": "Jemand gibt dir eine Antwort zum Thema Farben und Kleidung.",
        "question": "Wie reagierst du?",
        "options": [
          "Vielen Dank für die Information.",
          "Okay.",
          "Ist das alles?"
        ],
        "answer": 0,
        "explanation": "Sich bedanken ist immer die beste Reaktion."
      }
    ]
  },
  {
    "id": "a1-24",
    "level": "A1",
    "title": "Essen bestellen",
    "titleDe": "Essen und Trinken bestellen",
    "icon": "🍕",
    "premium": true,
    "exercises": [
      {
        "type": "multiple_choice",
        "situation": "Du bist in einer Situation zum Thema: Essen und Trinken bestellen.",
        "question": "Was sagst du?",
        "options": [
          "Höflich und klar antworten.",
          "Nichts sagen.",
          "Weggehen."
        ],
        "answer": 0,
        "explanation": "In der Situation Essen und Trinken bestellen ist klare Kommunikation wichtig."
      },
      {
        "type": "fill_blank",
        "situation": "Du brauchst Hilfe zum Thema Essen und Trinken bestellen.",
        "question": "Können Sie mir bitte ___?",
        "options": [
          "helfen",
          "sagen",
          "geben"
        ],
        "answer": "helfen",
        "explanation": "Können Sie mir bitte helfen? ist immer eine gute Frage."
      },
      {
        "type": "sort_sentence",
        "situation": "Du formulierst einen Satz zum Thema Essen und Trinken bestellen.",
        "question": "Bringe den Satz in die richtige Reihenfolge:",
        "options": [
          "ich",
          "Kann",
          "bitte",
          "fragen",
          "Sie"
        ],
        "answer": [
          1,
          4,
          0,
          2,
          3
        ],
        "explanation": "Richtig: Kann Sie ich bitte fragen?"
      },
      {
        "type": "quick_reaction",
        "situation": "Jemand gibt dir eine Antwort zum Thema Essen und Trinken bestellen.",
        "question": "Wie reagierst du?",
        "options": [
          "Vielen Dank für die Information.",
          "Okay.",
          "Ist das alles?"
        ],
        "answer": 0,
        "explanation": "Sich bedanken ist immer die beste Reaktion."
      }
    ]
  },
  {
    "id": "a1-25",
    "level": "A1",
    "title": "Wochentage",
    "titleDe": "Wochentage und Termine",
    "icon": "📆",
    "premium": true,
    "exercises": [
      {
        "type": "multiple_choice",
        "situation": "Du bist in einer Situation zum Thema: Wochentage und Termine.",
        "question": "Was sagst du?",
        "options": [
          "Höflich und klar antworten.",
          "Nichts sagen.",
          "Weggehen."
        ],
        "answer": 0,
        "explanation": "In der Situation Wochentage und Termine ist klare Kommunikation wichtig."
      },
      {
        "type": "fill_blank",
        "situation": "Du brauchst Hilfe zum Thema Wochentage und Termine.",
        "question": "Können Sie mir bitte ___?",
        "options": [
          "helfen",
          "sagen",
          "geben"
        ],
        "answer": "helfen",
        "explanation": "Können Sie mir bitte helfen? ist immer eine gute Frage."
      },
      {
        "type": "sort_sentence",
        "situation": "Du formulierst einen Satz zum Thema Wochentage und Termine.",
        "question": "Bringe den Satz in die richtige Reihenfolge:",
        "options": [
          "ich",
          "Kann",
          "bitte",
          "fragen",
          "Sie"
        ],
        "answer": [
          1,
          4,
          0,
          2,
          3
        ],
        "explanation": "Richtig: Kann Sie ich bitte fragen?"
      },
      {
        "type": "quick_reaction",
        "situation": "Jemand gibt dir eine Antwort zum Thema Wochentage und Termine.",
        "question": "Wie reagierst du?",
        "options": [
          "Vielen Dank für die Information.",
          "Okay.",
          "Ist das alles?"
        ],
        "answer": 0,
        "explanation": "Sich bedanken ist immer die beste Reaktion."
      }
    ]
  },
  {
    "id": "a1-26",
    "level": "A1",
    "title": "Mietvertrag",
    "titleDe": "Den Mietvertrag verstehen",
    "icon": "📄",
    "premium": true,
    "exercises": [
      {
        "type": "multiple_choice",
        "situation": "Du bist in einer Situation zum Thema: Den Mietvertrag verstehen.",
        "question": "Was sagst du?",
        "options": [
          "Höflich und klar antworten.",
          "Nichts sagen.",
          "Weggehen."
        ],
        "answer": 0,
        "explanation": "In der Situation Den Mietvertrag verstehen ist klare Kommunikation wichtig."
      },
      {
        "type": "fill_blank",
        "situation": "Du brauchst Hilfe zum Thema Den Mietvertrag verstehen.",
        "question": "Können Sie mir bitte ___?",
        "options": [
          "helfen",
          "sagen",
          "geben"
        ],
        "answer": "helfen",
        "explanation": "Können Sie mir bitte helfen? ist immer eine gute Frage."
      },
      {
        "type": "sort_sentence",
        "situation": "Du formulierst einen Satz zum Thema Den Mietvertrag verstehen.",
        "question": "Bringe den Satz in die richtige Reihenfolge:",
        "options": [
          "ich",
          "Kann",
          "bitte",
          "fragen",
          "Sie"
        ],
        "answer": [
          1,
          4,
          0,
          2,
          3
        ],
        "explanation": "Richtig: Kann Sie ich bitte fragen?"
      },
      {
        "type": "quick_reaction",
        "situation": "Jemand gibt dir eine Antwort zum Thema Den Mietvertrag verstehen.",
        "question": "Wie reagierst du?",
        "options": [
          "Vielen Dank für die Information.",
          "Okay.",
          "Ist das alles?"
        ],
        "answer": 0,
        "explanation": "Sich bedanken ist immer die beste Reaktion."
      }
    ]
  },
  {
    "id": "a1-27",
    "level": "A1",
    "title": "Haushalt",
    "titleDe": "Im Haushalt",
    "icon": "🧹",
    "premium": true,
    "exercises": [
      {
        "type": "multiple_choice",
        "situation": "Du bist in einer Situation zum Thema: Im Haushalt.",
        "question": "Was sagst du?",
        "options": [
          "Höflich und klar antworten.",
          "Nichts sagen.",
          "Weggehen."
        ],
        "answer": 0,
        "explanation": "In der Situation Im Haushalt ist klare Kommunikation wichtig."
      },
      {
        "type": "fill_blank",
        "situation": "Du brauchst Hilfe zum Thema Im Haushalt.",
        "question": "Können Sie mir bitte ___?",
        "options": [
          "helfen",
          "sagen",
          "geben"
        ],
        "answer": "helfen",
        "explanation": "Können Sie mir bitte helfen? ist immer eine gute Frage."
      },
      {
        "type": "sort_sentence",
        "situation": "Du formulierst einen Satz zum Thema Im Haushalt.",
        "question": "Bringe den Satz in die richtige Reihenfolge:",
        "options": [
          "ich",
          "Kann",
          "bitte",
          "fragen",
          "Sie"
        ],
        "answer": [
          1,
          4,
          0,
          2,
          3
        ],
        "explanation": "Richtig: Kann Sie ich bitte fragen?"
      },
      {
        "type": "quick_reaction",
        "situation": "Jemand gibt dir eine Antwort zum Thema Im Haushalt.",
        "question": "Wie reagierst du?",
        "options": [
          "Vielen Dank für die Information.",
          "Okay.",
          "Ist das alles?"
        ],
        "answer": 0,
        "explanation": "Sich bedanken ist immer die beste Reaktion."
      }
    ]
  },
  {
    "id": "a1-28",
    "level": "A1",
    "title": "Geburtstag",
    "titleDe": "Geburtstag feiern",
    "icon": "🎂",
    "premium": true,
    "exercises": [
      {
        "type": "multiple_choice",
        "situation": "Du bist in einer Situation zum Thema: Geburtstag feiern.",
        "question": "Was sagst du?",
        "options": [
          "Höflich und klar antworten.",
          "Nichts sagen.",
          "Weggehen."
        ],
        "answer": 0,
        "explanation": "In der Situation Geburtstag feiern ist klare Kommunikation wichtig."
      },
      {
        "type": "fill_blank",
        "situation": "Du brauchst Hilfe zum Thema Geburtstag feiern.",
        "question": "Können Sie mir bitte ___?",
        "options": [
          "helfen",
          "sagen",
          "geben"
        ],
        "answer": "helfen",
        "explanation": "Können Sie mir bitte helfen? ist immer eine gute Frage."
      },
      {
        "type": "sort_sentence",
        "situation": "Du formulierst einen Satz zum Thema Geburtstag feiern.",
        "question": "Bringe den Satz in die richtige Reihenfolge:",
        "options": [
          "ich",
          "Kann",
          "bitte",
          "fragen",
          "Sie"
        ],
        "answer": [
          1,
          4,
          0,
          2,
          3
        ],
        "explanation": "Richtig: Kann Sie ich bitte fragen?"
      },
      {
        "type": "quick_reaction",
        "situation": "Jemand gibt dir eine Antwort zum Thema Geburtstag feiern.",
        "question": "Wie reagierst du?",
        "options": [
          "Vielen Dank für die Information.",
          "Okay.",
          "Ist das alles?"
        ],
        "answer": 0,
        "explanation": "Sich bedanken ist immer die beste Reaktion."
      }
    ]
  },
  {
    "id": "a1-29",
    "level": "A1",
    "title": "Sport",
    "titleDe": "Sportverein",
    "icon": "🏋️",
    "premium": true,
    "exercises": [
      {
        "type": "multiple_choice",
        "situation": "Du bist in einer Situation zum Thema: Sportverein.",
        "question": "Was sagst du?",
        "options": [
          "Höflich und klar antworten.",
          "Nichts sagen.",
          "Weggehen."
        ],
        "answer": 0,
        "explanation": "In der Situation Sportverein ist klare Kommunikation wichtig."
      },
      {
        "type": "fill_blank",
        "situation": "Du brauchst Hilfe zum Thema Sportverein.",
        "question": "Können Sie mir bitte ___?",
        "options": [
          "helfen",
          "sagen",
          "geben"
        ],
        "answer": "helfen",
        "explanation": "Können Sie mir bitte helfen? ist immer eine gute Frage."
      },
      {
        "type": "sort_sentence",
        "situation": "Du formulierst einen Satz zum Thema Sportverein.",
        "question": "Bringe den Satz in die richtige Reihenfolge:",
        "options": [
          "ich",
          "Kann",
          "bitte",
          "fragen",
          "Sie"
        ],
        "answer": [
          1,
          4,
          0,
          2,
          3
        ],
        "explanation": "Richtig: Kann Sie ich bitte fragen?"
      },
      {
        "type": "quick_reaction",
        "situation": "Jemand gibt dir eine Antwort zum Thema Sportverein.",
        "question": "Wie reagierst du?",
        "options": [
          "Vielen Dank für die Information.",
          "Okay.",
          "Ist das alles?"
        ],
        "answer": 0,
        "explanation": "Sich bedanken ist immer die beste Reaktion."
      }
    ]
  },
  {
    "id": "a1-30",
    "level": "A1",
    "title": "Einkaufsliste",
    "titleDe": "Eine Einkaufsliste schreiben",
    "icon": "📝",
    "premium": true,
    "exercises": [
      {
        "type": "multiple_choice",
        "situation": "Du bist in einer Situation zum Thema: Eine Einkaufsliste schreiben.",
        "question": "Was sagst du?",
        "options": [
          "Höflich und klar antworten.",
          "Nichts sagen.",
          "Weggehen."
        ],
        "answer": 0,
        "explanation": "In der Situation Eine Einkaufsliste schreiben ist klare Kommunikation wichtig."
      },
      {
        "type": "fill_blank",
        "situation": "Du brauchst Hilfe zum Thema Eine Einkaufsliste schreiben.",
        "question": "Können Sie mir bitte ___?",
        "options": [
          "helfen",
          "sagen",
          "geben"
        ],
        "answer": "helfen",
        "explanation": "Können Sie mir bitte helfen? ist immer eine gute Frage."
      },
      {
        "type": "sort_sentence",
        "situation": "Du formulierst einen Satz zum Thema Eine Einkaufsliste schreiben.",
        "question": "Bringe den Satz in die richtige Reihenfolge:",
        "options": [
          "ich",
          "Kann",
          "bitte",
          "fragen",
          "Sie"
        ],
        "answer": [
          1,
          4,
          0,
          2,
          3
        ],
        "explanation": "Richtig: Kann Sie ich bitte fragen?"
      },
      {
        "type": "quick_reaction",
        "situation": "Jemand gibt dir eine Antwort zum Thema Eine Einkaufsliste schreiben.",
        "question": "Wie reagierst du?",
        "options": [
          "Vielen Dank für die Information.",
          "Okay.",
          "Ist das alles?"
        ],
        "answer": 0,
        "explanation": "Sich bedanken ist immer die beste Reaktion."
      }
    ]
  },
  {
    "id": "a1-31",
    "level": "A1",
    "title": "Handwerker",
    "titleDe": "Handwerker rufen",
    "icon": "🔧",
    "premium": true,
    "exercises": [
      {
        "type": "multiple_choice",
        "situation": "Du bist in einer Situation zum Thema: Handwerker rufen.",
        "question": "Was sagst du?",
        "options": [
          "Höflich und klar antworten.",
          "Nichts sagen.",
          "Weggehen."
        ],
        "answer": 0,
        "explanation": "In der Situation Handwerker rufen ist klare Kommunikation wichtig."
      },
      {
        "type": "fill_blank",
        "situation": "Du brauchst Hilfe zum Thema Handwerker rufen.",
        "question": "Können Sie mir bitte ___?",
        "options": [
          "helfen",
          "sagen",
          "geben"
        ],
        "answer": "helfen",
        "explanation": "Können Sie mir bitte helfen? ist immer eine gute Frage."
      },
      {
        "type": "sort_sentence",
        "situation": "Du formulierst einen Satz zum Thema Handwerker rufen.",
        "question": "Bringe den Satz in die richtige Reihenfolge:",
        "options": [
          "ich",
          "Kann",
          "bitte",
          "fragen",
          "Sie"
        ],
        "answer": [
          1,
          4,
          0,
          2,
          3
        ],
        "explanation": "Richtig: Kann Sie ich bitte fragen?"
      },
      {
        "type": "quick_reaction",
        "situation": "Jemand gibt dir eine Antwort zum Thema Handwerker rufen.",
        "question": "Wie reagierst du?",
        "options": [
          "Vielen Dank für die Information.",
          "Okay.",
          "Ist das alles?"
        ],
        "answer": 0,
        "explanation": "Sich bedanken ist immer die beste Reaktion."
      }
    ]
  },
  {
    "id": "a1-32",
    "level": "A1",
    "title": "Krankmeldung",
    "titleDe": "Sich krank melden",
    "icon": "🤒",
    "premium": true,
    "exercises": [
      {
        "type": "multiple_choice",
        "situation": "Du bist in einer Situation zum Thema: Sich krank melden.",
        "question": "Was sagst du?",
        "options": [
          "Höflich und klar antworten.",
          "Nichts sagen.",
          "Weggehen."
        ],
        "answer": 0,
        "explanation": "In der Situation Sich krank melden ist klare Kommunikation wichtig."
      },
      {
        "type": "fill_blank",
        "situation": "Du brauchst Hilfe zum Thema Sich krank melden.",
        "question": "Können Sie mir bitte ___?",
        "options": [
          "helfen",
          "sagen",
          "geben"
        ],
        "answer": "helfen",
        "explanation": "Können Sie mir bitte helfen? ist immer eine gute Frage."
      },
      {
        "type": "sort_sentence",
        "situation": "Du formulierst einen Satz zum Thema Sich krank melden.",
        "question": "Bringe den Satz in die richtige Reihenfolge:",
        "options": [
          "ich",
          "Kann",
          "bitte",
          "fragen",
          "Sie"
        ],
        "answer": [
          1,
          4,
          0,
          2,
          3
        ],
        "explanation": "Richtig: Kann Sie ich bitte fragen?"
      },
      {
        "type": "quick_reaction",
        "situation": "Jemand gibt dir eine Antwort zum Thema Sich krank melden.",
        "question": "Wie reagierst du?",
        "options": [
          "Vielen Dank für die Information.",
          "Okay.",
          "Ist das alles?"
        ],
        "answer": 0,
        "explanation": "Sich bedanken ist immer die beste Reaktion."
      }
    ]
  },
  {
    "id": "a1-33",
    "level": "A1",
    "title": "Entschuldigung",
    "titleDe": "Sich entschuldigen",
    "icon": "🙏",
    "premium": true,
    "exercises": [
      {
        "type": "multiple_choice",
        "situation": "Du bist in einer Situation zum Thema: Sich entschuldigen.",
        "question": "Was sagst du?",
        "options": [
          "Höflich und klar antworten.",
          "Nichts sagen.",
          "Weggehen."
        ],
        "answer": 0,
        "explanation": "In der Situation Sich entschuldigen ist klare Kommunikation wichtig."
      },
      {
        "type": "fill_blank",
        "situation": "Du brauchst Hilfe zum Thema Sich entschuldigen.",
        "question": "Können Sie mir bitte ___?",
        "options": [
          "helfen",
          "sagen",
          "geben"
        ],
        "answer": "helfen",
        "explanation": "Können Sie mir bitte helfen? ist immer eine gute Frage."
      },
      {
        "type": "sort_sentence",
        "situation": "Du formulierst einen Satz zum Thema Sich entschuldigen.",
        "question": "Bringe den Satz in die richtige Reihenfolge:",
        "options": [
          "ich",
          "Kann",
          "bitte",
          "fragen",
          "Sie"
        ],
        "answer": [
          1,
          4,
          0,
          2,
          3
        ],
        "explanation": "Richtig: Kann Sie ich bitte fragen?"
      },
      {
        "type": "quick_reaction",
        "situation": "Jemand gibt dir eine Antwort zum Thema Sich entschuldigen.",
        "question": "Wie reagierst du?",
        "options": [
          "Vielen Dank für die Information.",
          "Okay.",
          "Ist das alles?"
        ],
        "answer": 0,
        "explanation": "Sich bedanken ist immer die beste Reaktion."
      }
    ]
  },
  {
    "id": "a1-34",
    "level": "A1",
    "title": "Ausländerbehörde",
    "titleDe": "Auf der Ausländerbehörde",
    "icon": "🛂",
    "premium": true,
    "exercises": [
      {
        "type": "multiple_choice",
        "situation": "Du bist in einer Situation zum Thema: Auf der Ausländerbehörde.",
        "question": "Was sagst du?",
        "options": [
          "Höflich und klar antworten.",
          "Nichts sagen.",
          "Weggehen."
        ],
        "answer": 0,
        "explanation": "In der Situation Auf der Ausländerbehörde ist klare Kommunikation wichtig."
      },
      {
        "type": "fill_blank",
        "situation": "Du brauchst Hilfe zum Thema Auf der Ausländerbehörde.",
        "question": "Können Sie mir bitte ___?",
        "options": [
          "helfen",
          "sagen",
          "geben"
        ],
        "answer": "helfen",
        "explanation": "Können Sie mir bitte helfen? ist immer eine gute Frage."
      },
      {
        "type": "sort_sentence",
        "situation": "Du formulierst einen Satz zum Thema Auf der Ausländerbehörde.",
        "question": "Bringe den Satz in die richtige Reihenfolge:",
        "options": [
          "ich",
          "Kann",
          "bitte",
          "fragen",
          "Sie"
        ],
        "answer": [
          1,
          4,
          0,
          2,
          3
        ],
        "explanation": "Richtig: Kann Sie ich bitte fragen?"
      },
      {
        "type": "quick_reaction",
        "situation": "Jemand gibt dir eine Antwort zum Thema Auf der Ausländerbehörde.",
        "question": "Wie reagierst du?",
        "options": [
          "Vielen Dank für die Information.",
          "Okay.",
          "Ist das alles?"
        ],
        "answer": 0,
        "explanation": "Sich bedanken ist immer die beste Reaktion."
      }
    ]
  },
  {
    "id": "a1-35",
    "level": "A1",
    "title": "Symptome",
    "titleDe": "Symptome beschreiben",
    "icon": "🤧",
    "premium": true,
    "exercises": [
      {
        "type": "multiple_choice",
        "situation": "Du bist in einer Situation zum Thema: Symptome beschreiben.",
        "question": "Was sagst du?",
        "options": [
          "Höflich und klar antworten.",
          "Nichts sagen.",
          "Weggehen."
        ],
        "answer": 0,
        "explanation": "In der Situation Symptome beschreiben ist klare Kommunikation wichtig."
      },
      {
        "type": "fill_blank",
        "situation": "Du brauchst Hilfe zum Thema Symptome beschreiben.",
        "question": "Können Sie mir bitte ___?",
        "options": [
          "helfen",
          "sagen",
          "geben"
        ],
        "answer": "helfen",
        "explanation": "Können Sie mir bitte helfen? ist immer eine gute Frage."
      },
      {
        "type": "sort_sentence",
        "situation": "Du formulierst einen Satz zum Thema Symptome beschreiben.",
        "question": "Bringe den Satz in die richtige Reihenfolge:",
        "options": [
          "ich",
          "Kann",
          "bitte",
          "fragen",
          "Sie"
        ],
        "answer": [
          1,
          4,
          0,
          2,
          3
        ],
        "explanation": "Richtig: Kann Sie ich bitte fragen?"
      },
      {
        "type": "quick_reaction",
        "situation": "Jemand gibt dir eine Antwort zum Thema Symptome beschreiben.",
        "question": "Wie reagierst du?",
        "options": [
          "Vielen Dank für die Information.",
          "Okay.",
          "Ist das alles?"
        ],
        "answer": 0,
        "explanation": "Sich bedanken ist immer die beste Reaktion."
      }
    ]
  },
  {
    "id": "a1-36",
    "level": "A1",
    "title": "Internet",
    "titleDe": "Internet und Handy",
    "icon": "📶",
    "premium": true,
    "exercises": [
      {
        "type": "multiple_choice",
        "situation": "Du bist in einer Situation zum Thema: Internet und Handy.",
        "question": "Was sagst du?",
        "options": [
          "Höflich und klar antworten.",
          "Nichts sagen.",
          "Weggehen."
        ],
        "answer": 0,
        "explanation": "In der Situation Internet und Handy ist klare Kommunikation wichtig."
      },
      {
        "type": "fill_blank",
        "situation": "Du brauchst Hilfe zum Thema Internet und Handy.",
        "question": "Können Sie mir bitte ___?",
        "options": [
          "helfen",
          "sagen",
          "geben"
        ],
        "answer": "helfen",
        "explanation": "Können Sie mir bitte helfen? ist immer eine gute Frage."
      },
      {
        "type": "sort_sentence",
        "situation": "Du formulierst einen Satz zum Thema Internet und Handy.",
        "question": "Bringe den Satz in die richtige Reihenfolge:",
        "options": [
          "ich",
          "Kann",
          "bitte",
          "fragen",
          "Sie"
        ],
        "answer": [
          1,
          4,
          0,
          2,
          3
        ],
        "explanation": "Richtig: Kann Sie ich bitte fragen?"
      },
      {
        "type": "quick_reaction",
        "situation": "Jemand gibt dir eine Antwort zum Thema Internet und Handy.",
        "question": "Wie reagierst du?",
        "options": [
          "Vielen Dank für die Information.",
          "Okay.",
          "Ist das alles?"
        ],
        "answer": 0,
        "explanation": "Sich bedanken ist immer die beste Reaktion."
      }
    ]
  },
  {
    "id": "a1-37",
    "level": "A1",
    "title": "Mülltrennung",
    "titleDe": "Müll richtig trennen",
    "icon": "♻️",
    "premium": true,
    "exercises": [
      {
        "type": "multiple_choice",
        "situation": "Du bist in einer Situation zum Thema: Müll richtig trennen.",
        "question": "Was sagst du?",
        "options": [
          "Höflich und klar antworten.",
          "Nichts sagen.",
          "Weggehen."
        ],
        "answer": 0,
        "explanation": "In der Situation Müll richtig trennen ist klare Kommunikation wichtig."
      },
      {
        "type": "fill_blank",
        "situation": "Du brauchst Hilfe zum Thema Müll richtig trennen.",
        "question": "Können Sie mir bitte ___?",
        "options": [
          "helfen",
          "sagen",
          "geben"
        ],
        "answer": "helfen",
        "explanation": "Können Sie mir bitte helfen? ist immer eine gute Frage."
      },
      {
        "type": "sort_sentence",
        "situation": "Du formulierst einen Satz zum Thema Müll richtig trennen.",
        "question": "Bringe den Satz in die richtige Reihenfolge:",
        "options": [
          "ich",
          "Kann",
          "bitte",
          "fragen",
          "Sie"
        ],
        "answer": [
          1,
          4,
          0,
          2,
          3
        ],
        "explanation": "Richtig: Kann Sie ich bitte fragen?"
      },
      {
        "type": "quick_reaction",
        "situation": "Jemand gibt dir eine Antwort zum Thema Müll richtig trennen.",
        "question": "Wie reagierst du?",
        "options": [
          "Vielen Dank für die Information.",
          "Okay.",
          "Ist das alles?"
        ],
        "answer": 0,
        "explanation": "Sich bedanken ist immer die beste Reaktion."
      }
    ]
  },
  {
    "id": "a1-38",
    "level": "A1",
    "title": "Datum",
    "titleDe": "Datum und Monate",
    "icon": "🗓️",
    "premium": true,
    "exercises": [
      {
        "type": "multiple_choice",
        "situation": "Du bist in einer Situation zum Thema: Datum und Monate.",
        "question": "Was sagst du?",
        "options": [
          "Höflich und klar antworten.",
          "Nichts sagen.",
          "Weggehen."
        ],
        "answer": 0,
        "explanation": "In der Situation Datum und Monate ist klare Kommunikation wichtig."
      },
      {
        "type": "fill_blank",
        "situation": "Du brauchst Hilfe zum Thema Datum und Monate.",
        "question": "Können Sie mir bitte ___?",
        "options": [
          "helfen",
          "sagen",
          "geben"
        ],
        "answer": "helfen",
        "explanation": "Können Sie mir bitte helfen? ist immer eine gute Frage."
      },
      {
        "type": "sort_sentence",
        "situation": "Du formulierst einen Satz zum Thema Datum und Monate.",
        "question": "Bringe den Satz in die richtige Reihenfolge:",
        "options": [
          "ich",
          "Kann",
          "bitte",
          "fragen",
          "Sie"
        ],
        "answer": [
          1,
          4,
          0,
          2,
          3
        ],
        "explanation": "Richtig: Kann Sie ich bitte fragen?"
      },
      {
        "type": "quick_reaction",
        "situation": "Jemand gibt dir eine Antwort zum Thema Datum und Monate.",
        "question": "Wie reagierst du?",
        "options": [
          "Vielen Dank für die Information.",
          "Okay.",
          "Ist das alles?"
        ],
        "answer": 0,
        "explanation": "Sich bedanken ist immer die beste Reaktion."
      }
    ]
  },
  {
    "id": "a1-39",
    "level": "A1",
    "title": "Höflichkeit",
    "titleDe": "Danke und Bitte",
    "icon": "🤝",
    "premium": true,
    "exercises": [
      {
        "type": "multiple_choice",
        "situation": "Du bist in einer Situation zum Thema: Danke und Bitte.",
        "question": "Was sagst du?",
        "options": [
          "Höflich und klar antworten.",
          "Nichts sagen.",
          "Weggehen."
        ],
        "answer": 0,
        "explanation": "In der Situation Danke und Bitte ist klare Kommunikation wichtig."
      },
      {
        "type": "fill_blank",
        "situation": "Du brauchst Hilfe zum Thema Danke und Bitte.",
        "question": "Können Sie mir bitte ___?",
        "options": [
          "helfen",
          "sagen",
          "geben"
        ],
        "answer": "helfen",
        "explanation": "Können Sie mir bitte helfen? ist immer eine gute Frage."
      },
      {
        "type": "sort_sentence",
        "situation": "Du formulierst einen Satz zum Thema Danke und Bitte.",
        "question": "Bringe den Satz in die richtige Reihenfolge:",
        "options": [
          "ich",
          "Kann",
          "bitte",
          "fragen",
          "Sie"
        ],
        "answer": [
          1,
          4,
          0,
          2,
          3
        ],
        "explanation": "Richtig: Kann Sie ich bitte fragen?"
      },
      {
        "type": "quick_reaction",
        "situation": "Jemand gibt dir eine Antwort zum Thema Danke und Bitte.",
        "question": "Wie reagierst du?",
        "options": [
          "Vielen Dank für die Information.",
          "Okay.",
          "Ist das alles?"
        ],
        "answer": 0,
        "explanation": "Sich bedanken ist immer die beste Reaktion."
      }
    ]
  },
  {
    "id": "a1-40",
    "level": "A1",
    "title": "Verabschiedung",
    "titleDe": "Sich verabschieden",
    "icon": "👋",
    "premium": true,
    "exercises": [
      {
        "type": "multiple_choice",
        "situation": "Du bist in einer Situation zum Thema: Sich verabschieden.",
        "question": "Was sagst du?",
        "options": [
          "Höflich und klar antworten.",
          "Nichts sagen.",
          "Weggehen."
        ],
        "answer": 0,
        "explanation": "In der Situation Sich verabschieden ist klare Kommunikation wichtig."
      },
      {
        "type": "fill_blank",
        "situation": "Du brauchst Hilfe zum Thema Sich verabschieden.",
        "question": "Können Sie mir bitte ___?",
        "options": [
          "helfen",
          "sagen",
          "geben"
        ],
        "answer": "helfen",
        "explanation": "Können Sie mir bitte helfen? ist immer eine gute Frage."
      },
      {
        "type": "sort_sentence",
        "situation": "Du formulierst einen Satz zum Thema Sich verabschieden.",
        "question": "Bringe den Satz in die richtige Reihenfolge:",
        "options": [
          "ich",
          "Kann",
          "bitte",
          "fragen",
          "Sie"
        ],
        "answer": [
          1,
          4,
          0,
          2,
          3
        ],
        "explanation": "Richtig: Kann Sie ich bitte fragen?"
      },
      {
        "type": "quick_reaction",
        "situation": "Jemand gibt dir eine Antwort zum Thema Sich verabschieden.",
        "question": "Wie reagierst du?",
        "options": [
          "Vielen Dank für die Information.",
          "Okay.",
          "Ist das alles?"
        ],
        "answer": 0,
        "explanation": "Sich bedanken ist immer die beste Reaktion."
      }
    ]
  }
];
