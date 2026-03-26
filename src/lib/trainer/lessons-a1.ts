import type { Lesson } from "./types";

export const lessonsA1: Lesson[] = [
  {
    "id": "a1-01",
    "level": "A1",
    "title": "Arzttermin",
    "titleDe": "Beim Arzt",
    "icon": "🩺",
    "premium": false,
    "stages": [
      {
        "label": "Grundlagen",
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
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Du bist beim Arzt. Die Sprechstundenhilfe fragt dich etwas.",
            "question": "Die ___ brauchst du bei jedem Arztbesuch.",
            "options": [
              "Versichertenkarte",
              "bin",
              "gerne"
            ],
            "answer": "Versichertenkarte",
            "explanation": "Die Versichertenkarte brauchst du bei jedem Arztbesuch."
          },
          {
            "type": "sort_sentence",
            "situation": "Du beschreibst dem Arzt dein Problem.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "gestern",
              "Kopfschmerzen",
              "Ich",
              "habe",
              "seit"
            ],
            "answer": [
              2,
              3,
              4,
              0,
              1
            ],
            "explanation": "Richtig: Ich habe seit gestern Kopfschmerzen."
          },
          {
            "type": "fill_blank",
            "situation": "Der Arzt fragt nach deinen Beschwerden.",
            "question": "Mir tut ... weh ist die korrekte ___.",
            "options": [
              "Formulierung",
              "darf",
              "dort"
            ],
            "answer": "Formulierung",
            "explanation": "Mir tut ... weh ist die korrekte Formulierung."
          },
          {
            "type": "sort_sentence",
            "situation": "Der Arzt sagt: Bitte machen Sie den Oberkörper frei.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "=",
              "frei",
              "machen",
              "Oberkörper",
              "T-Shirt/Hemd",
              "ausziehen"
            ],
            "answer": [
              3,
              1,
              2,
              0,
              4,
              5
            ],
            "explanation": "Richtig: Oberkörper frei machen = T-Shirt/Hemd ausziehen."
          },
          {
            "type": "fill_blank",
            "situation": "Du brauchst ein Rezept.",
            "question": "Höfliche ___ mit Können Sie... ist korrekt.",
            "options": [
              "Frage",
              "habe",
              "bin"
            ],
            "answer": "Frage",
            "explanation": "Höfliche Frage mit Können Sie... ist korrekt."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Du bist beim Arzt. Die Sprechstundenhilfe fragt dich etwas.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ja, hier bitte.",
              "Das ist mir egal.",
              "Bis morgen."
            ],
            "answer": 0,
            "explanation": "Die Versichertenkarte brauchst du bei jedem Arztbesuch."
          },
          {
            "type": "quick_reaction",
            "situation": "Du beschreibst dem Arzt dein Problem.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich habe seit gestern Kopfschmerzen",
              "Das geht nicht.",
              "Ich bin müde."
            ],
            "answer": 0,
            "explanation": "Richtig: Ich habe seit gestern Kopfschmerzen."
          },
          {
            "type": "quick_reaction",
            "situation": "Der Arzt fragt nach deinen Beschwerden.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "tut",
              "Das weiß ich nicht.",
              "Das geht nicht."
            ],
            "answer": 0,
            "explanation": "Mir tut ... weh ist die korrekte Formulierung."
          },
          {
            "type": "quick_reaction",
            "situation": "Der Arzt sagt: Bitte machen Sie den Oberkörper frei.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "T-Shirt ausziehen",
              "Das ist mir egal.",
              "Keine Ahnung."
            ],
            "answer": 0,
            "explanation": "Oberkörper frei machen = T-Shirt/Hemd ausziehen."
          },
          {
            "type": "quick_reaction",
            "situation": "Du brauchst ein Rezept.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Können Sie mir ein Rezept schreiben?",
              "Bis morgen.",
              "Das geht nicht."
            ],
            "answer": 0,
            "explanation": "Höfliche Frage mit Können Sie... ist korrekt."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Ja, hier bitte.",
        "context": "Du bist beim Arzt"
      },
      {
        "de": "Ich habe seit gestern Kopfschmerzen",
        "context": "Du beschreibst dem Arzt dein Problem"
      },
      {
        "de": "T-Shirt ausziehen",
        "context": "Der Arzt sagt: Bitte machen Sie den Oberkörper frei"
      },
      {
        "de": "Können Sie mir ein Rezept schreiben?",
        "context": "Du brauchst ein Rezept"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Ich bin krank.",
        "correct": "Ja, hier bitte.",
        "tip": "Die Versichertenkarte brauchst du bei jedem Arztbesuch."
      },
      {
        "wrong": "macht",
        "correct": "tut",
        "tip": "Mir tut ... weh ist die korrekte Formulierung."
      },
      {
        "wrong": "Schuhe ausziehen",
        "correct": "T-Shirt ausziehen",
        "tip": "Oberkörper frei machen = T-Shirt/Hemd ausziehen."
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
    "stages": [
      {
        "label": "Grundlagen",
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
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Du bist an der Kasse.",
            "question": "Ja, bitte ist die passende Antwort auf ___ Frage.",
            "options": [
              "die",
              "frage",
              "Name"
            ],
            "answer": "die",
            "explanation": "Ja, bitte ist die passende Antwort auf die Frage."
          },
          {
            "type": "fill_blank",
            "situation": "Du suchst etwas im Supermarkt.",
            "question": "Wo finde ich...? ist die ___ Frage im Supermarkt.",
            "options": [
              "übliche",
              "Termin",
              "habe"
            ],
            "answer": "übliche",
            "explanation": "Wo finde ich...? ist die übliche Frage im Supermarkt."
          },
          {
            "type": "fill_blank",
            "situation": "Du fragst nach dem Preis.",
            "question": "Wie ___ kostet das?",
            "options": [
              "viel",
              "bitte",
              "Nummer"
            ],
            "answer": "viel",
            "explanation": "Wie viel kostet das?"
          },
          {
            "type": "sort_sentence",
            "situation": "Die Kassiererin sagt: Das macht 7,50 Euro.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "bezahlst",
              "genannten",
              "Du",
              "Betrag",
              "den"
            ],
            "answer": [
              2,
              0,
              4,
              1,
              3
            ],
            "explanation": "Richtig: Du bezahlst den genannten Betrag."
          },
          {
            "type": "fill_blank",
            "situation": "Du willst mit Karte bezahlen.",
            "question": "Höflich fragen, ob Kartenzahlung ___ ist.",
            "options": [
              "möglich",
              "schlecht",
              "gut"
            ],
            "answer": "möglich",
            "explanation": "Höflich fragen, ob Kartenzahlung möglich ist."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Du bist an der Kasse.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ja, bitte.",
              "Ich habe keine Zeit.",
              "Ich spreche kein Deutsch."
            ],
            "answer": 0,
            "explanation": "Ja, bitte ist die passende Antwort auf die Frage."
          },
          {
            "type": "quick_reaction",
            "situation": "Du suchst etwas im Supermarkt.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "finde",
              "Nein, danke.",
              "Bis morgen."
            ],
            "answer": 0,
            "explanation": "Wo finde ich...? ist die übliche Frage im Supermarkt."
          },
          {
            "type": "quick_reaction",
            "situation": "Du fragst nach dem Preis.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Wie viel kostet das",
              "Ich bin müde.",
              "Ich verstehe nicht."
            ],
            "answer": 0,
            "explanation": "Richtig: Wie viel kostet das?"
          },
          {
            "type": "quick_reaction",
            "situation": "Die Kassiererin sagt: Das macht 7,50 Euro.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Bezahlen",
              "Das weiß ich nicht.",
              "Warum?"
            ],
            "answer": 0,
            "explanation": "Du bezahlst den genannten Betrag."
          },
          {
            "type": "quick_reaction",
            "situation": "Du willst mit Karte bezahlen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Kann ich mit Karte zahlen?",
              "Das geht nicht.",
              "Ich spreche kein Deutsch."
            ],
            "answer": 0,
            "explanation": "Höflich fragen, ob Kartenzahlung möglich ist."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Ja, bitte.",
        "context": "Du bist an der Kasse"
      },
      {
        "de": "Wie viel kostet das",
        "context": "Du fragst nach dem Preis"
      },
      {
        "de": "Bezahlen",
        "context": "Die Kassiererin sagt: Das macht 7,50 Euro"
      },
      {
        "de": "Kann ich mit Karte zahlen?",
        "context": "Du willst mit Karte bezahlen"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Ich zahle mit Karte.",
        "correct": "Ja, bitte.",
        "tip": "Ja, bitte ist die passende Antwort auf die Frage."
      },
      {
        "wrong": "kaufe",
        "correct": "finde",
        "tip": "Wo finde ich...? ist die übliche Frage im Supermarkt."
      },
      {
        "wrong": "Fragen: Ist das teuer?",
        "correct": "Bezahlen",
        "tip": "Du bezahlst den genannten Betrag."
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
    "stages": [
      {
        "label": "Grundlagen",
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
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Du triffst deinen neuen Nachbarn.",
            "question": "Sich zuerst vorstellen ist ___.",
            "options": [
              "höflich",
              "soll",
              "möglich"
            ],
            "answer": "höflich",
            "explanation": "Sich zuerst vorstellen ist höflich."
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand fragt: Woher kommst du?",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "komme",
              "Ich",
              "ist",
              "Standard-Formulierung",
              "die",
              "aus..."
            ],
            "answer": [
              1,
              0,
              5,
              2,
              4,
              3
            ],
            "explanation": "Richtig: Ich komme aus... ist die Standard-Formulierung."
          },
          {
            "type": "fill_blank",
            "situation": "Du stellst dich bei der Arbeit vor.",
            "question": "Ich ___ der neue Kollege.",
            "options": [
              "bin",
              "werde",
              "mache"
            ],
            "answer": "bin",
            "explanation": "Ich bin der neue Kollege."
          },
          {
            "type": "fill_blank",
            "situation": "Jemand sagt: Freut mich!",
            "question": "Mich auch! oder Freut ___ auch! ist die übliche Antwort.",
            "options": [
              "mich",
              "gleich",
              "Frage"
            ],
            "answer": "mich",
            "explanation": "Mich auch! oder Freut mich auch! ist die übliche Antwort."
          },
          {
            "type": "fill_blank",
            "situation": "Du musst deinen Beruf nennen.",
            "question": "Ich ___ als... nennt den Beruf korrekt.",
            "options": [
              "arbeite",
              "frage",
              "darf"
            ],
            "answer": "arbeite",
            "explanation": "Ich arbeite als... nennt den Beruf korrekt."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Du triffst deinen neuen Nachbarn.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Hallo, ich bin Max. Ich wohne nebenan.",
              "Ich habe keine Zeit.",
              "Ich verstehe nicht."
            ],
            "answer": 0,
            "explanation": "Sich zuerst vorstellen ist höflich."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand fragt: Woher kommst du?",
            "question": "Wie reagierst du richtig?",
            "options": [
              "komme",
              "Warum?",
              "Keine Ahnung."
            ],
            "answer": 0,
            "explanation": "Ich komme aus... ist die Standard-Formulierung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du stellst dich bei der Arbeit vor.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich bin der neue Kollege",
              "Nein, danke.",
              "Tschüss!"
            ],
            "answer": 0,
            "explanation": "Richtig: Ich bin der neue Kollege."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand sagt: Freut mich!",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Mich auch!",
              "Nein, danke.",
              "Bis morgen."
            ],
            "answer": 0,
            "explanation": "Mich auch! oder Freut mich auch! ist die übliche Antwort."
          },
          {
            "type": "quick_reaction",
            "situation": "Du musst deinen Beruf nennen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich arbeite als Elektriker.",
              "Das ist mir egal.",
              "Keine Ahnung."
            ],
            "answer": 0,
            "explanation": "Ich arbeite als... nennt den Beruf korrekt."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Hallo, ich bin Max. Ich wohne nebenan.",
        "context": "Du triffst deinen neuen Nachbarn"
      },
      {
        "de": "Ich bin der neue Kollege",
        "context": "Du stellst dich bei der Arbeit vor"
      },
      {
        "de": "Mich auch!",
        "context": "Jemand sagt: Freut mich!"
      },
      {
        "de": "Ich arbeite als Elektriker.",
        "context": "Du musst deinen Beruf nennen"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Wie ist die Miete hier?",
        "correct": "Hallo, ich bin Max. Ich wohne nebenan.",
        "tip": "Sich zuerst vorstellen ist höflich."
      },
      {
        "wrong": "bin",
        "correct": "komme",
        "tip": "Ich komme aus... ist die Standard-Formulierung."
      },
      {
        "wrong": "Danke!",
        "correct": "Mich auch!",
        "tip": "Mich auch! oder Freut mich auch! ist die übliche Antwort."
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
    "stages": [
      {
        "label": "Grundlagen",
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
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Du liest eine Wohnungsanzeige.",
            "question": "ZKB steht für ___, Küche, Bad.",
            "options": [
              "Zimmer",
              "bitte",
              "dort"
            ],
            "answer": "Zimmer",
            "explanation": "ZKB steht für Zimmer, Küche, Bad."
          },
          {
            "type": "sort_sentence",
            "situation": "Du rufst wegen einer Wohnung an.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "mich",
              "für...",
              "Ich",
              "passende",
              "Formulierung",
              "die",
              "ist",
              "interessiere"
            ],
            "answer": [
              2,
              7,
              0,
              1,
              6,
              5,
              3,
              4
            ],
            "explanation": "Richtig: Ich interessiere mich für... ist die passende Formulierung."
          },
          {
            "type": "fill_blank",
            "situation": "Du fragst nach der Miete.",
            "question": "Wie hoch ist die ___?",
            "options": [
              "Miete",
              "Termin",
              "gestern"
            ],
            "answer": "Miete",
            "explanation": "Wie hoch ist die Miete?"
          },
          {
            "type": "sort_sentence",
            "situation": "Der Vermieter fragt: Wann möchten Sie einziehen?",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Ein",
              "nennen",
              "Datum",
              "konkretes",
              "ist",
              "professionell"
            ],
            "answer": [
              0,
              3,
              2,
              1,
              4,
              5
            ],
            "explanation": "Richtig: Ein konkretes Datum nennen ist professionell."
          },
          {
            "type": "fill_blank",
            "situation": "Du besichtigst eine Wohnung.",
            "question": "Nebenkosten sind eine wichtige Frage bei der ___.",
            "options": [
              "Besichtigung",
              "gleich",
              "kann"
            ],
            "answer": "Besichtigung",
            "explanation": "Nebenkosten sind eine wichtige Frage bei der Besichtigung."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Du liest eine Wohnungsanzeige.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "2 Zimmer, Küche, Bad",
              "Das ist mir egal.",
              "Das weiß ich nicht."
            ],
            "answer": 0,
            "explanation": "ZKB steht für Zimmer, Küche, Bad."
          },
          {
            "type": "quick_reaction",
            "situation": "Du rufst wegen einer Wohnung an.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "interessiere",
              "Nein, danke.",
              "Ich habe keine Zeit."
            ],
            "answer": 0,
            "explanation": "Ich interessiere mich für... ist die passende Formulierung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du fragst nach der Miete.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Wie hoch ist die Miete",
              "Ich verstehe nicht.",
              "Ich spreche kein Deutsch."
            ],
            "answer": 0,
            "explanation": "Richtig: Wie hoch ist die Miete?"
          },
          {
            "type": "quick_reaction",
            "situation": "Der Vermieter fragt: Wann möchten Sie einziehen?",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ab dem 1. nächsten Monat.",
              "Das ist mir egal.",
              "Ich bin müde."
            ],
            "answer": 0,
            "explanation": "Ein konkretes Datum nennen ist professionell."
          },
          {
            "type": "quick_reaction",
            "situation": "Du besichtigst eine Wohnung.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Sind die Nebenkosten inklusive?",
              "Bis morgen.",
              "Nein, danke."
            ],
            "answer": 0,
            "explanation": "Nebenkosten sind eine wichtige Frage bei der Besichtigung."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "2 Zimmer, Küche, Bad",
        "context": "Du liest eine Wohnungsanzeige"
      },
      {
        "de": "interessiere",
        "context": "Du rufst wegen einer Wohnung an"
      },
      {
        "de": "Wie hoch ist die Miete",
        "context": "Du fragst nach der Miete"
      },
      {
        "de": "Ab dem 1. nächsten Monat.",
        "context": "Der Vermieter fragt: Wann möchten Sie einziehen?"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "2 Zimmer, kein Balkon",
        "correct": "2 Zimmer, Küche, Bad",
        "tip": "ZKB steht für Zimmer, Küche, Bad."
      },
      {
        "wrong": "frage",
        "correct": "interessiere",
        "tip": "Ich interessiere mich für... ist die passende Formulierung."
      },
      {
        "wrong": "Sofort, jetzt!",
        "correct": "Ab dem 1. nächsten Monat.",
        "tip": "Ein konkretes Datum nennen ist professionell."
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
    "stages": [
      {
        "label": "Grundlagen",
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
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Du bist beim Bürgeramt.",
            "question": "Für die Anmeldung brauchst du ___ Ausweis und den Mietvertrag.",
            "options": [
              "einen",
              "jetzt",
              "richtig"
            ],
            "answer": "einen",
            "explanation": "Für die Anmeldung brauchst du einen Ausweis und den Mietvertrag."
          },
          {
            "type": "sort_sentence",
            "situation": "Du stehst am Empfang.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "korrekte",
              "Bürgeramt",
              "Sich",
              "ist",
              "anmelden",
              "der",
              "Begriff",
              "beim"
            ],
            "answer": [
              2,
              4,
              3,
              5,
              0,
              6,
              7,
              1
            ],
            "explanation": "Richtig: Sich anmelden ist der korrekte Begriff beim Bürgeramt."
          },
          {
            "type": "fill_blank",
            "situation": "Du fragst nach einem Formular.",
            "question": "Können Sie mir ein Formular ___?",
            "options": [
              "geben",
              "nötig",
              "suche"
            ],
            "answer": "geben",
            "explanation": "Können Sie mir ein Formular geben?"
          },
          {
            "type": "sort_sentence",
            "situation": "Der Beamte sagt: Bitte nehmen Sie im Wartebereich Platz.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "wartest",
              "Wartebereich",
              "Du",
              "setzt",
              "dich",
              "in",
              "den",
              "und"
            ],
            "answer": [
              2,
              3,
              4,
              5,
              6,
              1,
              7,
              0
            ],
            "explanation": "Richtig: Du setzt dich in den Wartebereich und wartest."
          },
          {
            "type": "fill_blank",
            "situation": "Du brauchst eine Bescheinigung.",
            "question": "Höflich ___ konkret fragen ist am besten.",
            "options": [
              "und",
              "sofort",
              "kann"
            ],
            "answer": "und",
            "explanation": "Höflich und konkret fragen ist am besten."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Du bist beim Bürgeramt.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Personalausweis und Mietvertrag",
              "Ich spreche kein Deutsch.",
              "Tschüss!"
            ],
            "answer": 0,
            "explanation": "Für die Anmeldung brauchst du einen Ausweis und den Mietvertrag."
          },
          {
            "type": "quick_reaction",
            "situation": "Du stehst am Empfang.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "anmelden",
              "Keine Ahnung.",
              "Tschüss!"
            ],
            "answer": 0,
            "explanation": "Sich anmelden ist der korrekte Begriff beim Bürgeramt."
          },
          {
            "type": "quick_reaction",
            "situation": "Du fragst nach einem Formular.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Können Sie mir ein Formular geben",
              "Keine Ahnung.",
              "Ich habe keine Zeit."
            ],
            "answer": 0,
            "explanation": "Richtig: Können Sie mir ein Formular geben?"
          },
          {
            "type": "quick_reaction",
            "situation": "Der Beamte sagt: Bitte nehmen Sie im Wartebereich Platz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Im Wartebereich hinsetzen",
              "Ich bin müde.",
              "Ich spreche kein Deutsch."
            ],
            "answer": 0,
            "explanation": "Du setzt dich in den Wartebereich und wartest."
          },
          {
            "type": "quick_reaction",
            "situation": "Du brauchst eine Bescheinigung.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Könnte ich bitte eine Meldebescheinigung bekommen?",
              "Ich habe keine Zeit.",
              "Bis morgen."
            ],
            "answer": 0,
            "explanation": "Höflich und konkret fragen ist am besten."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Personalausweis und Mietvertrag",
        "context": "Du bist beim Bürgeramt"
      },
      {
        "de": "anmelden",
        "context": "Du stehst am Empfang"
      },
      {
        "de": "Können Sie mir ein Formular geben",
        "context": "Du fragst nach einem Formular"
      },
      {
        "de": "Im Wartebereich hinsetzen",
        "context": "Der Beamte sagt: Bitte nehmen Sie im Wartebereich Platz"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Nur meinen Namen",
        "correct": "Personalausweis und Mietvertrag",
        "tip": "Für die Anmeldung brauchst du einen Ausweis und den Mietvertrag."
      },
      {
        "wrong": "melden",
        "correct": "anmelden",
        "tip": "Sich anmelden ist der korrekte Begriff beim Bürgeramt."
      },
      {
        "wrong": "Sofort zum Schalter gehen",
        "correct": "Im Wartebereich hinsetzen",
        "tip": "Du setzt dich in den Wartebereich und wartest."
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
    "stages": [
      {
        "label": "Grundlagen",
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
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Du möchtest bestellen.",
            "question": "Ich hätte gerne... ist die ___ Bestellform.",
            "options": [
              "höfliche",
              "gut",
              "wichtig"
            ],
            "answer": "höfliche",
            "explanation": "Ich hätte gerne... ist die höfliche Bestellform."
          },
          {
            "type": "fill_blank",
            "situation": "Du möchtest bezahlen.",
            "question": "Man fragt nach der Rechnung, ___ man bezahlen möchte.",
            "options": [
              "wenn",
              "möglich",
              "habe"
            ],
            "answer": "wenn",
            "explanation": "Man fragt nach der Rechnung, wenn man bezahlen möchte."
          },
          {
            "type": "fill_blank",
            "situation": "Du fragst nach der Empfehlung.",
            "question": "Was ___ Sie mir empfehlen?",
            "options": [
              "können",
              "dort",
              "nötig"
            ],
            "answer": "können",
            "explanation": "Was können Sie mir empfehlen?"
          },
          {
            "type": "sort_sentence",
            "situation": "Der Kellner fragt: Möchten Sie noch etwas trinken?",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "gibt",
              "dem",
              "klare",
              "Eine",
              "Kellner",
              "Antwort",
              "Bescheid"
            ],
            "answer": [
              3,
              2,
              5,
              0,
              1,
              4,
              6
            ],
            "explanation": "Richtig: Eine klare Antwort gibt dem Kellner Bescheid."
          },
          {
            "type": "fill_blank",
            "situation": "Das Essen ist kalt.",
            "question": "Höflich und ___ reklamieren ist professionell.",
            "options": [
              "sachlich",
              "gut",
              "habe"
            ],
            "answer": "sachlich",
            "explanation": "Höflich und sachlich reklamieren ist professionell."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Du möchtest bestellen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich hätte gerne eine Suppe, bitte.",
              "Bis morgen.",
              "Ich verstehe nicht."
            ],
            "answer": 0,
            "explanation": "Ich hätte gerne... ist die höfliche Bestellform."
          },
          {
            "type": "quick_reaction",
            "situation": "Du möchtest bezahlen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Rechnung",
              "Das geht nicht.",
              "Tschüss!"
            ],
            "answer": 0,
            "explanation": "Man fragt nach der Rechnung, wenn man bezahlen möchte."
          },
          {
            "type": "quick_reaction",
            "situation": "Du fragst nach der Empfehlung.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Was können Sie mir empfehlen",
              "Das geht nicht.",
              "Ich spreche kein Deutsch."
            ],
            "answer": 0,
            "explanation": "Richtig: Was können Sie mir empfehlen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Der Kellner fragt: Möchten Sie noch etwas trinken?",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Nein, danke. Das war alles.",
              "Keine Ahnung.",
              "Ich verstehe nicht."
            ],
            "answer": 0,
            "explanation": "Eine klare Antwort gibt dem Kellner Bescheid."
          },
          {
            "type": "quick_reaction",
            "situation": "Das Essen ist kalt.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Entschuldigung, das Essen ist leider kalt.",
              "Keine Ahnung.",
              "Das geht nicht."
            ],
            "answer": 0,
            "explanation": "Höflich und sachlich reklamieren ist professionell."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Ich hätte gerne eine Suppe, bitte.",
        "context": "Du möchtest bestellen"
      },
      {
        "de": "Rechnung",
        "context": "Du möchtest bezahlen"
      },
      {
        "de": "Was können Sie mir empfehlen",
        "context": "Du fragst nach der Empfehlung"
      },
      {
        "de": "Nein, danke. Das war alles.",
        "context": "Der Kellner fragt: Möchten Sie noch etwas trinken?"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Essen! Schnell!",
        "correct": "Ich hätte gerne eine Suppe, bitte.",
        "tip": "Ich hätte gerne... ist die höfliche Bestellform."
      },
      {
        "wrong": "Karte",
        "correct": "Rechnung",
        "tip": "Man fragt nach der Rechnung, wenn man bezahlen möchte."
      },
      {
        "wrong": "Vielleicht.",
        "correct": "Nein, danke. Das war alles.",
        "tip": "Eine klare Antwort gibt dem Kellner Bescheid."
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
    "stages": [
      {
        "label": "Grundlagen",
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
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Du bist in einer fremden Stadt.",
            "question": "Wie komme ich zum/zur...? ist ___ Standardfrage.",
            "options": [
              "die",
              "nehme",
              "gehe"
            ],
            "answer": "die",
            "explanation": "Wie komme ich zum/zur...? ist die Standardfrage."
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand erklärt dir den Weg.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "du",
              "weitergehen",
              "sollst",
              "Geradeaus",
              "einfach",
              "bedeutet,",
              "dass"
            ],
            "answer": [
              3,
              5,
              6,
              0,
              4,
              1,
              2
            ],
            "explanation": "Richtig: Geradeaus bedeutet, dass du einfach weitergehen sollst."
          },
          {
            "type": "fill_blank",
            "situation": "Du fragst nach der nächsten Apotheke.",
            "question": "Wo ist die nächste ___?",
            "options": [
              "Apotheke",
              "bin",
              "will"
            ],
            "answer": "Apotheke",
            "explanation": "Wo ist die nächste Apotheke?"
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand sagt: Es ist gleich um die Ecke.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "bedeutet",
              "sehr",
              "Ecke",
              "Gleich",
              "um",
              "nah",
              "die"
            ],
            "answer": [
              3,
              4,
              6,
              2,
              0,
              1,
              5
            ],
            "explanation": "Richtig: Gleich um die Ecke bedeutet sehr nah."
          },
          {
            "type": "fill_blank",
            "situation": "Du bedankst dich für die Hilfe.",
            "question": "Sich ___ bedanken gehört zum guten Umgangston.",
            "options": [
              "höflich",
              "leider",
              "richtig"
            ],
            "answer": "höflich",
            "explanation": "Sich höflich bedanken gehört zum guten Umgangston."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Du bist in einer fremden Stadt.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Entschuldigung, wie komme ich zum Bahnhof?",
              "Ich spreche kein Deutsch.",
              "Das geht nicht."
            ],
            "answer": 0,
            "explanation": "Wie komme ich zum/zur...? ist die Standardfrage."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand erklärt dir den Weg.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "geradeaus",
              "Tschüss!",
              "Bis morgen."
            ],
            "answer": 0,
            "explanation": "Geradeaus bedeutet, dass du einfach weitergehen sollst."
          },
          {
            "type": "quick_reaction",
            "situation": "Du fragst nach der nächsten Apotheke.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Wo ist die nächste Apotheke",
              "Keine Ahnung.",
              "Warum?"
            ],
            "answer": 0,
            "explanation": "Richtig: Wo ist die nächste Apotheke?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand sagt: Es ist gleich um die Ecke.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Es ist ganz in der Nähe.",
              "Das geht nicht.",
              "Tschüss!"
            ],
            "answer": 0,
            "explanation": "Gleich um die Ecke bedeutet sehr nah."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bedankst dich für die Hilfe.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Vielen Dank für Ihre Hilfe!",
              "Ich verstehe nicht.",
              "Das geht nicht."
            ],
            "answer": 0,
            "explanation": "Sich höflich bedanken gehört zum guten Umgangston."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Entschuldigung, wie komme ich zum Bahnhof?",
        "context": "Du bist in einer fremden Stadt"
      },
      {
        "de": "geradeaus",
        "context": "Jemand erklärt dir den Weg"
      },
      {
        "de": "Wo ist die nächste Apotheke",
        "context": "Du fragst nach der nächsten Apotheke"
      },
      {
        "de": "Es ist ganz in der Nähe.",
        "context": "Jemand sagt: Es ist gleich um die Ecke"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Wo bin ich?",
        "correct": "Entschuldigung, wie komme ich zum Bahnhof?",
        "tip": "Wie komme ich zum/zur...? ist die Standardfrage."
      },
      {
        "wrong": "zurück",
        "correct": "geradeaus",
        "tip": "Geradeaus bedeutet, dass du einfach weitergehen sollst."
      },
      {
        "wrong": "Es ist weit weg.",
        "correct": "Es ist ganz in der Nähe.",
        "tip": "Gleich um die Ecke bedeutet sehr nah."
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
    "stages": [
      {
        "label": "Grundlagen",
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
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Du willst ein Ticket kaufen.",
            "question": "Eine Einzelfahrkarte nach... ist die ___ Bestellung.",
            "options": [
              "korrekte",
              "Nummer",
              "sage"
            ],
            "answer": "korrekte",
            "explanation": "Eine Einzelfahrkarte nach... ist die korrekte Bestellung."
          },
          {
            "type": "sort_sentence",
            "situation": "Du fragst nach der Abfahrtszeit.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Züge",
              "fahren,",
              "gehen",
              "Busse",
              "und",
              "nicht"
            ],
            "answer": [
              0,
              4,
              3,
              1,
              5,
              2
            ],
            "explanation": "Richtig: Züge und Busse fahren, nicht gehen."
          },
          {
            "type": "fill_blank",
            "situation": "Du fragst nach dem Gleis.",
            "question": "Von welchem Gleis fährt ___ Zug?",
            "options": [
              "der",
              "wichtig",
              "Name"
            ],
            "answer": "der",
            "explanation": "Von welchem Gleis fährt der Zug?"
          },
          {
            "type": "sort_sentence",
            "situation": "Die Durchsage sagt: Bitte Türen freihalten!",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "der",
              "Nicht",
              "an",
              "bedeutet:",
              "Türen",
              "Tür",
              "stehen",
              "freihalten"
            ],
            "answer": [
              4,
              7,
              3,
              1,
              2,
              0,
              5,
              6
            ],
            "explanation": "Richtig: Türen freihalten bedeutet: Nicht an der Tür stehen."
          },
          {
            "type": "fill_blank",
            "situation": "Du hast den falschen Zug genommen.",
            "question": "Ruhig und klar den Fehler ___.",
            "options": [
              "erklären",
              "frage",
              "habe"
            ],
            "answer": "erklären",
            "explanation": "Ruhig und klar den Fehler erklären."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Du willst ein Ticket kaufen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Eine Einzelfahrkarte nach Berlin, bitte.",
              "Ich spreche kein Deutsch.",
              "Keine Ahnung."
            ],
            "answer": 0,
            "explanation": "Eine Einzelfahrkarte nach... ist die korrekte Bestellung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du fragst nach der Abfahrtszeit.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "fährt",
              "Das weiß ich nicht.",
              "Das ist mir egal."
            ],
            "answer": 0,
            "explanation": "Züge und Busse fahren, nicht gehen."
          },
          {
            "type": "quick_reaction",
            "situation": "Du fragst nach dem Gleis.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Von welchem Gleis fährt der Zug",
              "Ich spreche kein Deutsch.",
              "Das weiß ich nicht."
            ],
            "answer": 0,
            "explanation": "Richtig: Von welchem Gleis fährt der Zug?"
          },
          {
            "type": "quick_reaction",
            "situation": "Die Durchsage sagt: Bitte Türen freihalten!",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Von der Tür weggehen",
              "Nein, danke.",
              "Ich spreche kein Deutsch."
            ],
            "answer": 0,
            "explanation": "Türen freihalten bedeutet: Nicht an der Tür stehen."
          },
          {
            "type": "quick_reaction",
            "situation": "Du hast den falschen Zug genommen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Entschuldigung, ich bin im falschen Zug.",
              "Das geht nicht.",
              "Das ist mir egal."
            ],
            "answer": 0,
            "explanation": "Ruhig und klar den Fehler erklären."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Eine Einzelfahrkarte nach Berlin, bitte.",
        "context": "Du willst ein Ticket kaufen"
      },
      {
        "de": "Von welchem Gleis fährt der Zug",
        "context": "Du fragst nach dem Gleis"
      },
      {
        "de": "Von der Tür weggehen",
        "context": "Die Durchsage sagt: Bitte Türen freihalten!"
      },
      {
        "de": "Entschuldigung, ich bin im falschen Zug.",
        "context": "Du hast den falschen Zug genommen"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Ich will fahren.",
        "correct": "Eine Einzelfahrkarte nach Berlin, bitte.",
        "tip": "Eine Einzelfahrkarte nach... ist die korrekte Bestellung."
      },
      {
        "wrong": "geht",
        "correct": "fährt",
        "tip": "Züge und Busse fahren, nicht gehen."
      },
      {
        "wrong": "Die Tür festhalten",
        "correct": "Von der Tür weggehen",
        "tip": "Türen freihalten bedeutet: Nicht an der Tür stehen."
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
    "stages": [
      {
        "label": "Grundlagen",
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
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Jemand fragt: Wie spät ist es?",
            "question": "Halb drei ist ___ umgangssprachliche Form für 14:30.",
            "options": [
              "die",
              "hier",
              "richtig"
            ],
            "answer": "die",
            "explanation": "Halb drei ist die umgangssprachliche Form für 14:30."
          },
          {
            "type": "sort_sentence",
            "situation": "Du sagst deine Telefonnummer.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "einzeln",
              "Zweiergruppen",
              "Telefonnummern",
              "oder",
              "gesprochen",
              "in",
              "werden"
            ],
            "answer": [
              2,
              6,
              0,
              3,
              5,
              1,
              4
            ],
            "explanation": "Richtig: Telefonnummern werden einzeln oder in Zweiergruppen gesprochen."
          },
          {
            "type": "fill_blank",
            "situation": "Du vereinbarst eine Uhrzeit.",
            "question": "Treffen wir ___ um acht?",
            "options": [
              "uns",
              "nehme",
              "darf"
            ],
            "answer": "uns",
            "explanation": "Treffen wir uns um acht?"
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand sagt: Viertel vor zehn.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Uhr",
              "9:45",
              "vor",
              "zehn",
              "=",
              "Viertel"
            ],
            "answer": [
              5,
              2,
              3,
              4,
              1,
              0
            ],
            "explanation": "Richtig: Viertel vor zehn = 9:45 Uhr."
          },
          {
            "type": "fill_blank",
            "situation": "Du nennst dein Geburtsdatum.",
            "question": "Ich bin am ... geboren ist ___ korrekte Formulierung.",
            "options": [
              "die",
              "leider",
              "kann"
            ],
            "answer": "die",
            "explanation": "Ich bin am ... geboren ist die korrekte Formulierung."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Jemand fragt: Wie spät ist es?",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Es ist halb drei.",
              "Keine Ahnung.",
              "Bis morgen."
            ],
            "answer": 0,
            "explanation": "Halb drei ist die umgangssprachliche Form für 14:30."
          },
          {
            "type": "quick_reaction",
            "situation": "Du sagst deine Telefonnummer.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "drei-vier",
              "Keine Ahnung.",
              "Ich spreche kein Deutsch."
            ],
            "answer": 0,
            "explanation": "Telefonnummern werden einzeln oder in Zweiergruppen gesprochen."
          },
          {
            "type": "quick_reaction",
            "situation": "Du vereinbarst eine Uhrzeit.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Treffen wir uns um acht",
              "Das weiß ich nicht.",
              "Ich habe keine Zeit."
            ],
            "answer": 0,
            "explanation": "Richtig: Treffen wir uns um acht?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand sagt: Viertel vor zehn.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "9:45",
              "Bis morgen.",
              "Nein, danke."
            ],
            "answer": 0,
            "explanation": "Viertel vor zehn = 9:45 Uhr."
          },
          {
            "type": "quick_reaction",
            "situation": "Du nennst dein Geburtsdatum.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich bin am fünfzehnten März geboren.",
              "Ich spreche kein Deutsch.",
              "Das ist mir egal."
            ],
            "answer": 0,
            "explanation": "Ich bin am ... geboren ist die korrekte Formulierung."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Es ist halb drei.",
        "context": "Jemand fragt: Wie spät ist es?"
      },
      {
        "de": "drei-vier",
        "context": "Du sagst deine Telefonnummer"
      },
      {
        "de": "Treffen wir uns um acht",
        "context": "Du vereinbarst eine Uhrzeit"
      },
      {
        "de": "Ich bin am fünfzehnten März geboren.",
        "context": "Du nennst dein Geburtsdatum"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Es ist zwei Uhr dreißig.",
        "correct": "Es ist halb drei.",
        "tip": "Halb drei ist die umgangssprachliche Form für 14:30."
      },
      {
        "wrong": "dreivierundfünf",
        "correct": "drei-vier",
        "tip": "Telefonnummern werden einzeln oder in Zweiergruppen gesprochen."
      },
      {
        "wrong": "10:15",
        "correct": "9:45",
        "tip": "Viertel vor zehn = 9:45 Uhr."
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
    "stages": [
      {
        "label": "Grundlagen",
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
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Jemand fragt dich nach deiner Familie.",
            "question": "Konkret antworten: ___ und Familienmitglieder nennen.",
            "options": [
              "Anzahl",
              "nehme",
              "nötig"
            ],
            "answer": "Anzahl",
            "explanation": "Konkret antworten: Anzahl und Familienmitglieder nennen."
          },
          {
            "type": "sort_sentence",
            "situation": "Du erzählst von deinen Eltern.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Mein",
              "arbeitet",
              "beschreibt",
              "den",
              "Beruf",
              "Vater",
              "als..."
            ],
            "answer": [
              0,
              5,
              1,
              6,
              2,
              3,
              4
            ],
            "explanation": "Richtig: Mein Vater arbeitet als... beschreibt den Beruf."
          },
          {
            "type": "fill_blank",
            "situation": "Du stellst deine Familie vor.",
            "question": "Ich bin ___ und habe zwei Kinder.",
            "options": [
              "verheiratet",
              "muss",
              "Name"
            ],
            "answer": "verheiratet",
            "explanation": "Ich bin verheiratet und habe zwei Kinder."
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand fragt: Haben Sie Kinder?",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "antworten",
              "Anzahl",
              "mit",
              "Geschlecht",
              "Konkret",
              "und"
            ],
            "answer": [
              4,
              0,
              2,
              1,
              5,
              3
            ],
            "explanation": "Richtig: Konkret antworten mit Anzahl und Geschlecht."
          },
          {
            "type": "fill_blank",
            "situation": "Du sprichst über deine Schwester.",
            "question": "Vollständige ___ mit Artikel und Verb verwenden.",
            "options": [
              "Sätze",
              "sofort",
              "brauche"
            ],
            "answer": "Sätze",
            "explanation": "Vollständige Sätze mit Artikel und Verb verwenden."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Jemand fragt dich nach deiner Familie.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich habe zwei Geschwister.",
              "Tschüss!",
              "Ich habe keine Zeit."
            ],
            "answer": 0,
            "explanation": "Konkret antworten: Anzahl und Familienmitglieder nennen."
          },
          {
            "type": "quick_reaction",
            "situation": "Du erzählst von deinen Eltern.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "arbeitet",
              "Warum?",
              "Bis morgen."
            ],
            "answer": 0,
            "explanation": "Mein Vater arbeitet als... beschreibt den Beruf."
          },
          {
            "type": "quick_reaction",
            "situation": "Du stellst deine Familie vor.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich bin verheiratet und habe zwei Kinder",
              "Das ist mir egal.",
              "Ich habe keine Zeit."
            ],
            "answer": 0,
            "explanation": "Richtig: Ich bin verheiratet und habe zwei Kinder."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand fragt: Haben Sie Kinder?",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ja, einen Sohn und eine Tochter.",
              "Das weiß ich nicht.",
              "Tschüss!"
            ],
            "answer": 0,
            "explanation": "Konkret antworten mit Anzahl und Geschlecht."
          },
          {
            "type": "quick_reaction",
            "situation": "Du sprichst über deine Schwester.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Meine Schwester ist jünger als ich.",
              "Ich habe keine Zeit.",
              "Das weiß ich nicht."
            ],
            "answer": 0,
            "explanation": "Vollständige Sätze mit Artikel und Verb verwenden."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Ich habe zwei Geschwister.",
        "context": "Jemand fragt dich nach deiner Familie"
      },
      {
        "de": "arbeitet",
        "context": "Du erzählst von deinen Eltern"
      },
      {
        "de": "Ich bin verheiratet und habe zwei Kinder",
        "context": "Du stellst deine Familie vor"
      },
      {
        "de": "Ja, einen Sohn und eine Tochter.",
        "context": "Jemand fragt: Haben Sie Kinder?"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Familie ist wichtig.",
        "correct": "Ich habe zwei Geschwister.",
        "tip": "Konkret antworten: Anzahl und Familienmitglieder nennen."
      },
      {
        "wrong": "macht",
        "correct": "arbeitet",
        "tip": "Mein Vater arbeitet als... beschreibt den Beruf."
      },
      {
        "wrong": "Kinder sind schön.",
        "correct": "Ja, einen Sohn und eine Tochter.",
        "tip": "Konkret antworten mit Anzahl und Geschlecht."
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
    "stages": [
      {
        "label": "Grundlagen",
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
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand grüßt dich.",
            "question": "Wie antwortest du?",
            "options": [
              "Hallo, wie geht es Ihnen?",
              "Ich bin müde.",
              "Tschüss!"
            ],
            "answer": 0,
            "explanation": "Eine freundliche Begrüßung ist immer passend."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Du bist in einem Bekleidungsgeschäft.",
            "question": "Nach der Größe fragen ___ beim Kleidungskauf üblich.",
            "options": [
              "ist",
              "suche",
              "gut"
            ],
            "answer": "ist",
            "explanation": "Nach der Größe fragen ist beim Kleidungskauf üblich."
          },
          {
            "type": "sort_sentence",
            "situation": "Du möchtest etwas anprobieren.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "bedeutet,",
              "testen",
              "Anprobieren",
              "zu",
              "Kleidung",
              "die"
            ],
            "answer": [
              2,
              0,
              5,
              4,
              3,
              1
            ],
            "explanation": "Richtig: Anprobieren bedeutet, die Kleidung zu testen."
          },
          {
            "type": "fill_blank",
            "situation": "Du sagst, was du suchst.",
            "question": "Ich suche eine ___ Jacke.",
            "options": [
              "warme",
              "sage",
              "kann"
            ],
            "answer": "warme",
            "explanation": "Ich suche eine warme Jacke."
          },
          {
            "type": "sort_sentence",
            "situation": "Die Verkäuferin fragt: Passt es?",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "die",
              "Antwort,",
              "ob",
              "Klare",
              "passt",
              "Kleidung"
            ],
            "answer": [
              3,
              1,
              2,
              0,
              5,
              4
            ],
            "explanation": "Richtig: Klare Antwort, ob die Kleidung passt."
          },
          {
            "type": "fill_blank",
            "situation": "Jemand grüßt dich.",
            "question": "Eine ___ Begrüßung ist immer passend.",
            "options": [
              "freundliche",
              "kann",
              "langsam"
            ],
            "answer": "freundliche",
            "explanation": "Eine freundliche Begrüßung ist immer passend."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Du bist in einem Bekleidungsgeschäft.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Haben Sie das in Größe M?",
              "Warum?",
              "Das geht nicht."
            ],
            "answer": 0,
            "explanation": "Nach der Größe fragen ist beim Kleidungskauf üblich."
          },
          {
            "type": "quick_reaction",
            "situation": "Du möchtest etwas anprobieren.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "anprobieren",
              "Das geht nicht.",
              "Tschüss!"
            ],
            "answer": 0,
            "explanation": "Anprobieren bedeutet, die Kleidung zu testen."
          },
          {
            "type": "quick_reaction",
            "situation": "Du sagst, was du suchst.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich suche eine warme Jacke",
              "Das weiß ich nicht.",
              "Das geht nicht."
            ],
            "answer": 0,
            "explanation": "Richtig: Ich suche eine warme Jacke."
          },
          {
            "type": "quick_reaction",
            "situation": "Die Verkäuferin fragt: Passt es?",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ja, es passt gut. Ich nehme es.",
              "Ich spreche kein Deutsch.",
              "Tschüss!"
            ],
            "answer": 0,
            "explanation": "Klare Antwort, ob die Kleidung passt."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand grüßt dich.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Hallo, wie geht es Ihnen?",
              "Ich spreche kein Deutsch.",
              "Ich bin müde."
            ],
            "answer": 0,
            "explanation": "Eine freundliche Begrüßung ist immer passend."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Haben Sie das in Größe M?",
        "context": "Du bist in einem Bekleidungsgeschäft"
      },
      {
        "de": "anprobieren",
        "context": "Du möchtest etwas anprobieren"
      },
      {
        "de": "Ich suche eine warme Jacke",
        "context": "Du sagst, was du suchst"
      },
      {
        "de": "Ja, es passt gut. Ich nehme es.",
        "context": "Die Verkäuferin fragt: Passt es?"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Ich will ein T-Shirt.",
        "correct": "Haben Sie das in Größe M?",
        "tip": "Nach der Größe fragen ist beim Kleidungskauf üblich."
      },
      {
        "wrong": "kaufen",
        "correct": "anprobieren",
        "tip": "Anprobieren bedeutet, die Kleidung zu testen."
      },
      {
        "wrong": "Vielleicht.",
        "correct": "Ja, es passt gut. Ich nehme es.",
        "tip": "Klare Antwort, ob die Kleidung passt."
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
    "stages": [
      {
        "label": "Grundlagen",
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
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Du hast Kopfschmerzen.",
            "question": "Konkret ___ Symptom nennen hilft dem Apotheker.",
            "options": [
              "das",
              "dort",
              "brauche"
            ],
            "answer": "das",
            "explanation": "Konkret das Symptom nennen hilft dem Apotheker."
          },
          {
            "type": "fill_blank",
            "situation": "Du fragst nach der Dosierung.",
            "question": "Wie oft? fragt nach ___ Häufigkeit der Einnahme.",
            "options": [
              "der",
              "will",
              "schnell"
            ],
            "answer": "der",
            "explanation": "Wie oft? fragt nach der Häufigkeit der Einnahme."
          },
          {
            "type": "fill_blank",
            "situation": "Du beschreibst deine Symptome.",
            "question": "Ich habe ___ zwei Tagen Halsschmerzen.",
            "options": [
              "seit",
              "langsam",
              "heute"
            ],
            "answer": "seit",
            "explanation": "Ich habe seit zwei Tagen Halsschmerzen."
          },
          {
            "type": "sort_sentence",
            "situation": "Der Apotheker sagt: Nehmen Sie dreimal täglich eine Tablette.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "morgens,",
              "=",
              "täglich",
              "abends",
              "mittags,",
              "Dreimal"
            ],
            "answer": [
              5,
              2,
              1,
              0,
              4,
              3
            ],
            "explanation": "Richtig: Dreimal täglich = morgens, mittags, abends."
          },
          {
            "type": "fill_blank",
            "situation": "Du brauchst ein verschreibungspflichtiges Medikament.",
            "question": "Bestimmte Medikamente gibt es ___ mit ärztlichem Rezept.",
            "options": [
              "nur",
              "sage",
              "hier"
            ],
            "answer": "nur",
            "explanation": "Bestimmte Medikamente gibt es nur mit ärztlichem Rezept."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Du hast Kopfschmerzen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich hätte gerne etwas gegen Kopfschmerzen.",
              "Bis morgen.",
              "Nein, danke."
            ],
            "answer": 0,
            "explanation": "Konkret das Symptom nennen hilft dem Apotheker."
          },
          {
            "type": "quick_reaction",
            "situation": "Du fragst nach der Dosierung.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "oft",
              "Das ist mir egal.",
              "Ich verstehe nicht."
            ],
            "answer": 0,
            "explanation": "Wie oft? fragt nach der Häufigkeit der Einnahme."
          },
          {
            "type": "quick_reaction",
            "situation": "Du beschreibst deine Symptome.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich habe seit zwei Tagen Halsschmerzen",
              "Ich habe keine Zeit.",
              "Tschüss!"
            ],
            "answer": 0,
            "explanation": "Richtig: Ich habe seit zwei Tagen Halsschmerzen."
          },
          {
            "type": "quick_reaction",
            "situation": "Der Apotheker sagt: Nehmen Sie dreimal täglich eine Tablette.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "3 Mal am Tag",
              "Keine Ahnung.",
              "Bis morgen."
            ],
            "answer": 0,
            "explanation": "Dreimal täglich = morgens, mittags, abends."
          },
          {
            "type": "quick_reaction",
            "situation": "Du brauchst ein verschreibungspflichtiges Medikament.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Dafür brauche ich ein Rezept vom Arzt.",
              "Ich verstehe nicht.",
              "Warum?"
            ],
            "answer": 0,
            "explanation": "Bestimmte Medikamente gibt es nur mit ärztlichem Rezept."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Ich hätte gerne etwas gegen Kopfschmerzen.",
        "context": "Du hast Kopfschmerzen"
      },
      {
        "de": "Ich habe seit zwei Tagen Halsschmerzen",
        "context": "Du beschreibst deine Symptome"
      },
      {
        "de": "3 Mal am Tag",
        "context": "Der Apotheker sagt: Nehmen Sie dreimal täglich eine Tablette"
      },
      {
        "de": "Dafür brauche ich ein Rezept vom Arzt.",
        "context": "Du brauchst ein verschreibungspflichtiges Medikament"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Ich bin krank.",
        "correct": "Ich hätte gerne etwas gegen Kopfschmerzen.",
        "tip": "Konkret das Symptom nennen hilft dem Apotheker."
      },
      {
        "wrong": "viel",
        "correct": "oft",
        "tip": "Wie oft? fragt nach der Häufigkeit der Einnahme."
      },
      {
        "wrong": "3 Tabletten auf einmal",
        "correct": "3 Mal am Tag",
        "tip": "Dreimal täglich = morgens, mittags, abends."
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
    "stages": [
      {
        "label": "Grundlagen",
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
          },
          {
            "type": "quick_reaction",
            "situation": "Du verstehst etwas nicht.",
            "question": "Was sagst du?",
            "options": [
              "Können Sie das bitte wiederholen?",
              "Das ist mir egal.",
              "Ich gehe jetzt."
            ],
            "answer": 0,
            "explanation": "Nachfragen zeigt Interesse und hilft beim Verstehen."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Dein Nachbar spricht dich an.",
            "question": "Über das Wetter reden ist typischer ___ Talk in Deutschland.",
            "options": [
              "Small",
              "sofort",
              "muss"
            ],
            "answer": "Small",
            "explanation": "Über das Wetter reden ist typischer Small Talk in Deutschland."
          },
          {
            "type": "fill_blank",
            "situation": "Du beschreibst das Wetter.",
            "question": "Es ___ kalt/warm/heiß ist die korrekte Wetterbeschreibung.",
            "options": [
              "ist",
              "gut",
              "morgen"
            ],
            "answer": "ist",
            "explanation": "Es ist kalt/warm/heiß ist die korrekte Wetterbeschreibung."
          },
          {
            "type": "fill_blank",
            "situation": "Du sagst, was du anziehen sollst.",
            "question": "Ich ___ eine Regenjacke mit.",
            "options": [
              "nehme",
              "werde",
              "möchte"
            ],
            "answer": "nehme",
            "explanation": "Ich nehme eine Regenjacke mit."
          },
          {
            "type": "sort_sentence",
            "situation": "Es regnet stark. Ein Kollege fragt: Hast du einen Regenschirm?",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "nach",
              "fragen",
              "Höflich",
              "und",
              "Hilfe",
              "antworten"
            ],
            "answer": [
              2,
              5,
              3,
              0,
              4,
              1
            ],
            "explanation": "Richtig: Höflich antworten und nach Hilfe fragen."
          },
          {
            "type": "fill_blank",
            "situation": "Du verstehst etwas nicht.",
            "question": "Nachfragen ___ Interesse und hilft beim Verstehen.",
            "options": [
              "zeigt",
              "brauche",
              "Zeit"
            ],
            "answer": "zeigt",
            "explanation": "Nachfragen zeigt Interesse und hilft beim Verstehen."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Dein Nachbar spricht dich an.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Schönes Wetter heute, oder?",
              "Ich verstehe nicht.",
              "Tschüss!"
            ],
            "answer": 0,
            "explanation": "Über das Wetter reden ist typischer Small Talk in Deutschland."
          },
          {
            "type": "quick_reaction",
            "situation": "Du beschreibst das Wetter.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "ist",
              "Warum?",
              "Das geht nicht."
            ],
            "answer": 0,
            "explanation": "Es ist kalt/warm/heiß ist die korrekte Wetterbeschreibung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du sagst, was du anziehen sollst.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich nehme eine Regenjacke mit",
              "Bis morgen.",
              "Ich verstehe nicht."
            ],
            "answer": 0,
            "explanation": "Richtig: Ich nehme eine Regenjacke mit."
          },
          {
            "type": "quick_reaction",
            "situation": "Es regnet stark. Ein Kollege fragt: Hast du einen Regenschirm?",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Nein, leider nicht.",
              "Ich bin müde.",
              "Keine Ahnung."
            ],
            "answer": 0,
            "explanation": "Höflich antworten und nach Hilfe fragen."
          },
          {
            "type": "quick_reaction",
            "situation": "Du verstehst etwas nicht.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Können Sie das bitte wiederholen?",
              "Das geht nicht.",
              "Das weiß ich nicht."
            ],
            "answer": 0,
            "explanation": "Nachfragen zeigt Interesse und hilft beim Verstehen."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Schönes Wetter heute, oder?",
        "context": "Dein Nachbar spricht dich an"
      },
      {
        "de": "Ich nehme eine Regenjacke mit",
        "context": "Du sagst, was du anziehen sollst"
      },
      {
        "de": "Nein, leider nicht.",
        "context": "Es regnet stark"
      },
      {
        "de": "Können Sie das bitte wiederholen?",
        "context": "Du verstehst etwas nicht"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Ich mag kein Wetter.",
        "correct": "Schönes Wetter heute, oder?",
        "tip": "Über das Wetter reden ist typischer Small Talk in Deutschland."
      },
      {
        "wrong": "hat",
        "correct": "ist",
        "tip": "Es ist kalt/warm/heiß ist die korrekte Wetterbeschreibung."
      },
      {
        "wrong": "Regen ist okay.",
        "correct": "Nein, leider nicht.",
        "tip": "Höflich antworten und nach Hilfe fragen."
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
    "stages": [
      {
        "label": "Grundlagen",
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
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Jemand fragt: Was machst du in deiner Freizeit?",
            "question": "Konkrete Hobbys nennen mit ich ... ___.",
            "options": [
              "gerne",
              "hier",
              "morgen"
            ],
            "answer": "gerne",
            "explanation": "Konkrete Hobbys nennen mit ich ... gerne."
          },
          {
            "type": "sort_sentence",
            "situation": "Du erzählst von deinem Hobby.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Hobby",
              "beschreibt",
              "konkretes",
              "ein",
              "Ich",
              "gerne",
              "koche"
            ],
            "answer": [
              4,
              6,
              5,
              1,
              3,
              2,
              0
            ],
            "explanation": "Richtig: Ich koche gerne beschreibt ein konkretes Hobby."
          },
          {
            "type": "fill_blank",
            "situation": "Du fragst nach dem Hobby.",
            "question": "Was ist ___ Hobby?",
            "options": [
              "dein",
              "Frage",
              "heute"
            ],
            "answer": "dein",
            "explanation": "Was ist dein Hobby?"
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand fragt: Möchtest du mitspielen?",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Ja,",
              "Interesse",
              "und",
              "Freundlichkeit",
              "zeigt",
              "gerne!"
            ],
            "answer": [
              0,
              5,
              4,
              1,
              2,
              3
            ],
            "explanation": "Richtig: Ja, gerne! zeigt Interesse und Freundlichkeit."
          },
          {
            "type": "fill_blank",
            "situation": "Du lädst jemanden ein.",
            "question": "Hast du Lust, ... zu gehen? ist eine ___ Einladung.",
            "options": [
              "höfliche",
              "richtig",
              "suche"
            ],
            "answer": "höfliche",
            "explanation": "Hast du Lust, ... zu gehen? ist eine höfliche Einladung."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Jemand fragt: Was machst du in deiner Freizeit?",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich spiele gerne Fußball und lese Bücher.",
              "Das weiß ich nicht.",
              "Ich spreche kein Deutsch."
            ],
            "answer": 0,
            "explanation": "Konkrete Hobbys nennen mit ich ... gerne."
          },
          {
            "type": "quick_reaction",
            "situation": "Du erzählst von deinem Hobby.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "koche",
              "Keine Ahnung.",
              "Ich habe keine Zeit."
            ],
            "answer": 0,
            "explanation": "Ich koche gerne beschreibt ein konkretes Hobby."
          },
          {
            "type": "quick_reaction",
            "situation": "Du fragst nach dem Hobby.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Was ist dein Hobby",
              "Ich verstehe nicht.",
              "Das weiß ich nicht."
            ],
            "answer": 0,
            "explanation": "Richtig: Was ist dein Hobby?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand fragt: Möchtest du mitspielen?",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ja, sehr gerne!",
              "Das weiß ich nicht.",
              "Nein, danke."
            ],
            "answer": 0,
            "explanation": "Ja, gerne! zeigt Interesse und Freundlichkeit."
          },
          {
            "type": "quick_reaction",
            "situation": "Du lädst jemanden ein.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Hast du Lust, am Samstag schwimmen zu gehen?",
              "Tschüss!",
              "Keine Ahnung."
            ],
            "answer": 0,
            "explanation": "Hast du Lust, ... zu gehen? ist eine höfliche Einladung."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Ich spiele gerne Fußball und lese Bücher.",
        "context": "Jemand fragt: Was machst du in deiner Freizeit?"
      },
      {
        "de": "Was ist dein Hobby",
        "context": "Du fragst nach dem Hobby"
      },
      {
        "de": "Ja, sehr gerne!",
        "context": "Jemand fragt: Möchtest du mitspielen?"
      },
      {
        "de": "Hast du Lust, am Samstag schwimmen zu gehen?",
        "context": "Du lädst jemanden ein"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Freizeit ist gut.",
        "correct": "Ich spiele gerne Fußball und lese Bücher.",
        "tip": "Konkrete Hobbys nennen mit ich ... gerne."
      },
      {
        "wrong": "esse",
        "correct": "koche",
        "tip": "Ich koche gerne beschreibt ein konkretes Hobby."
      },
      {
        "wrong": "Sport ist anstrengend.",
        "correct": "Ja, sehr gerne!",
        "tip": "Ja, gerne! zeigt Interesse und Freundlichkeit."
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
    "stages": [
      {
        "label": "Grundlagen",
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
          },
          {
            "type": "quick_reaction",
            "situation": "Du bedankst dich.",
            "question": "Was ist höflich?",
            "options": [
              "Vielen Dank, das ist sehr nett.",
              "Okay.",
              "Warum?"
            ],
            "answer": 0,
            "explanation": "Sich zu bedanken gehört zur Höflichkeit."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Dein Telefon klingelt.",
            "question": "Sich mit Namen ___ ist in Deutschland üblich.",
            "options": [
              "melden",
              "komme",
              "gerne"
            ],
            "answer": "melden",
            "explanation": "Sich mit Namen melden ist in Deutschland üblich."
          },
          {
            "type": "fill_blank",
            "situation": "Du möchtest jemanden sprechen.",
            "question": "Könnte ich bitte ... sprechen? ___ die höfliche Form.",
            "options": [
              "ist",
              "möglich",
              "danke"
            ],
            "answer": "ist",
            "explanation": "Könnte ich bitte ... sprechen? ist die höfliche Form."
          },
          {
            "type": "fill_blank",
            "situation": "Du hinterlässt eine Nachricht.",
            "question": "Können Sie bitte etwas ___?",
            "options": [
              "ausrichten",
              "möglich",
              "habe"
            ],
            "answer": "ausrichten",
            "explanation": "Können Sie bitte etwas ausrichten?"
          },
          {
            "type": "sort_sentence",
            "situation": "Die Person sagt: Einen Moment, ich verbinde Sie.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "die",
              "richtige",
              "ist",
              "warten",
              "Reaktion",
              "Höflich"
            ],
            "answer": [
              5,
              3,
              2,
              0,
              1,
              4
            ],
            "explanation": "Richtig: Höflich warten ist die richtige Reaktion."
          },
          {
            "type": "fill_blank",
            "situation": "Du bedankst dich.",
            "question": "Sich zu bedanken gehört ___ Höflichkeit.",
            "options": [
              "zur",
              "langsam",
              "möglich"
            ],
            "answer": "zur",
            "explanation": "Sich zu bedanken gehört zur Höflichkeit."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Dein Telefon klingelt.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Hallo, hier ist Meier.",
              "Tschüss!",
              "Ich habe keine Zeit."
            ],
            "answer": 0,
            "explanation": "Sich mit Namen melden ist in Deutschland üblich."
          },
          {
            "type": "quick_reaction",
            "situation": "Du möchtest jemanden sprechen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "sprechen",
              "Tschüss!",
              "Das weiß ich nicht."
            ],
            "answer": 0,
            "explanation": "Könnte ich bitte ... sprechen? ist die höfliche Form."
          },
          {
            "type": "quick_reaction",
            "situation": "Du hinterlässt eine Nachricht.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Können Sie bitte etwas ausrichten",
              "Ich verstehe nicht.",
              "Nein, danke."
            ],
            "answer": 0,
            "explanation": "Richtig: Können Sie bitte etwas ausrichten?"
          },
          {
            "type": "quick_reaction",
            "situation": "Die Person sagt: Einen Moment, ich verbinde Sie.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Danke, ich warte.",
              "Das weiß ich nicht.",
              "Nein, danke."
            ],
            "answer": 0,
            "explanation": "Höflich warten ist die richtige Reaktion."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bedankst dich.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Vielen Dank, das ist sehr nett.",
              "Das ist mir egal.",
              "Keine Ahnung."
            ],
            "answer": 0,
            "explanation": "Sich zu bedanken gehört zur Höflichkeit."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Hallo, hier ist Meier.",
        "context": "Dein Telefon klingelt"
      },
      {
        "de": "sprechen",
        "context": "Du möchtest jemanden sprechen"
      },
      {
        "de": "Können Sie bitte etwas ausrichten",
        "context": "Du hinterlässt eine Nachricht"
      },
      {
        "de": "Danke, ich warte.",
        "context": "Die Person sagt: Einen Moment, ich verbinde Sie"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Wer ist da?",
        "correct": "Hallo, hier ist Meier.",
        "tip": "Sich mit Namen melden ist in Deutschland üblich."
      },
      {
        "wrong": "sehen",
        "correct": "sprechen",
        "tip": "Könnte ich bitte ... sprechen? ist die höfliche Form."
      },
      {
        "wrong": "Schneller, bitte!",
        "correct": "Danke, ich warte.",
        "tip": "Höflich warten ist die richtige Reaktion."
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
    "stages": [
      {
        "label": "Grundlagen",
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
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand fragt nach dem Weg.",
            "question": "Wie hilfst du?",
            "options": [
              "Gehen Sie geradeaus und dann links.",
              "Ich weiß nicht.",
              "Fragen Sie jemand anderen."
            ],
            "answer": 0,
            "explanation": "Wegbeschreibungen helfen im Alltag."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Du möchtest ein Paket verschicken.",
            "question": "Klar sagen, ___ das Paket gehen soll.",
            "options": [
              "wohin",
              "hier",
              "darf"
            ],
            "answer": "wohin",
            "explanation": "Klar sagen, wohin das Paket gehen soll."
          },
          {
            "type": "sort_sentence",
            "situation": "Du fragst nach dem Porto.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "kostet...?",
              "Was",
              "Preis",
              "nach",
              "dem",
              "fragt"
            ],
            "answer": [
              1,
              0,
              5,
              3,
              4,
              2
            ],
            "explanation": "Richtig: Was kostet...? fragt nach dem Preis."
          },
          {
            "type": "fill_blank",
            "situation": "Du willst ein Einschreiben versenden.",
            "question": "Ich möchte ___ Brief als Einschreiben schicken.",
            "options": [
              "den",
              "komme",
              "mache"
            ],
            "answer": "den",
            "explanation": "Ich möchte den Brief als Einschreiben schicken."
          },
          {
            "type": "sort_sentence",
            "situation": "Der Postmitarbeiter fragt: Möchten Sie eine Sendungsverfolgung?",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Paket",
              "verfolgen",
              "das",
              "du",
              "kannst",
              "Sendungsverfolgung",
              "Mit",
              "online"
            ],
            "answer": [
              6,
              5,
              4,
              3,
              2,
              0,
              7,
              1
            ],
            "explanation": "Richtig: Mit Sendungsverfolgung kannst du das Paket online verfolgen."
          },
          {
            "type": "fill_blank",
            "situation": "Jemand fragt nach dem Weg.",
            "question": "Wegbeschreibungen helfen im ___.",
            "options": [
              "Alltag",
              "komme",
              "bitte"
            ],
            "answer": "Alltag",
            "explanation": "Wegbeschreibungen helfen im Alltag."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Du möchtest ein Paket verschicken.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich möchte dieses Paket nach Sarajevo schicken.",
              "Ich spreche kein Deutsch.",
              "Ich habe keine Zeit."
            ],
            "answer": 0,
            "explanation": "Klar sagen, wohin das Paket gehen soll."
          },
          {
            "type": "quick_reaction",
            "situation": "Du fragst nach dem Porto.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "kostet",
              "Das weiß ich nicht.",
              "Warum?"
            ],
            "answer": 0,
            "explanation": "Was kostet...? fragt nach dem Preis."
          },
          {
            "type": "quick_reaction",
            "situation": "Du willst ein Einschreiben versenden.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich möchte den Brief als Einschreiben schicken",
              "Das ist mir egal.",
              "Bis morgen."
            ],
            "answer": 0,
            "explanation": "Richtig: Ich möchte den Brief als Einschreiben schicken."
          },
          {
            "type": "quick_reaction",
            "situation": "Der Postmitarbeiter fragt: Möchten Sie eine Sendungsverfolgung?",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ja, bitte.",
              "Warum?",
              "Nein, danke."
            ],
            "answer": 0,
            "explanation": "Mit Sendungsverfolgung kannst du das Paket online verfolgen."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand fragt nach dem Weg.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Gehen Sie geradeaus und dann links.",
              "Ich verstehe nicht.",
              "Das ist mir egal."
            ],
            "answer": 0,
            "explanation": "Wegbeschreibungen helfen im Alltag."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Ich möchte dieses Paket nach Sarajevo schicken.",
        "context": "Du möchtest ein Paket verschicken"
      },
      {
        "de": "kostet",
        "context": "Du fragst nach dem Porto"
      },
      {
        "de": "Ich möchte den Brief als Einschreiben schicken",
        "context": "Du willst ein Einschreiben versenden"
      },
      {
        "de": "Ja, bitte.",
        "context": "Der Postmitarbeiter fragt: Möchten Sie eine Sendungsverfolgu"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Paket weg.",
        "correct": "Ich möchte dieses Paket nach Sarajevo schicken.",
        "tip": "Klar sagen, wohin das Paket gehen soll."
      },
      {
        "wrong": "macht",
        "correct": "kostet",
        "tip": "Was kostet...? fragt nach dem Preis."
      },
      {
        "wrong": "Was ist das?",
        "correct": "Ja, bitte.",
        "tip": "Mit Sendungsverfolgung kannst du das Paket online verfolgen."
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
    "stages": [
      {
        "label": "Grundlagen",
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
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Du möchtest ein Konto eröffnen.",
            "question": "Ein Girokonto ___ ist der Fachbegriff.",
            "options": [
              "eröffnen",
              "bin",
              "hier"
            ],
            "answer": "eröffnen",
            "explanation": "Ein Girokonto eröffnen ist der Fachbegriff."
          },
          {
            "type": "sort_sentence",
            "situation": "Du fragst nach den Gebühren.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "von",
              "Bei",
              "Kontogebühren",
              "spricht",
              "man",
              "Banken"
            ],
            "answer": [
              1,
              5,
              3,
              4,
              0,
              2
            ],
            "explanation": "Richtig: Bei Banken spricht man von Kontogebühren."
          },
          {
            "type": "fill_blank",
            "situation": "Du brauchst eine neue Karte.",
            "question": "Ich brauche eine ___ Bankkarte.",
            "options": [
              "neue",
              "Hilfe",
              "jetzt"
            ],
            "answer": "neue",
            "explanation": "Ich brauche eine neue Bankkarte."
          },
          {
            "type": "sort_sentence",
            "situation": "Der Bankmitarbeiter fragt: Haben Sie Ihren Ausweis dabei?",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "oder",
              "Reisepass",
              "Personalausweis",
              "vorzeigen",
              "Den"
            ],
            "answer": [
              4,
              2,
              0,
              1,
              3
            ],
            "explanation": "Richtig: Den Personalausweis oder Reisepass vorzeigen."
          },
          {
            "type": "fill_blank",
            "situation": "Du willst Geld überweisen.",
            "question": "Für Überweisungen braucht man die ___.",
            "options": [
              "IBAN",
              "suche",
              "werde"
            ],
            "answer": "IBAN",
            "explanation": "Für Überweisungen braucht man die IBAN."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Du möchtest ein Konto eröffnen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich möchte gerne ein Girokonto eröffnen.",
              "Ich spreche kein Deutsch.",
              "Ich bin müde."
            ],
            "answer": 0,
            "explanation": "Ein Girokonto eröffnen ist der Fachbegriff."
          },
          {
            "type": "quick_reaction",
            "situation": "Du fragst nach den Gebühren.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Gebühren",
              "Ich habe keine Zeit.",
              "Nein, danke."
            ],
            "answer": 0,
            "explanation": "Bei Banken spricht man von Kontogebühren."
          },
          {
            "type": "quick_reaction",
            "situation": "Du brauchst eine neue Karte.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich brauche eine neue Bankkarte",
              "Bis morgen.",
              "Nein, danke."
            ],
            "answer": 0,
            "explanation": "Richtig: Ich brauche eine neue Bankkarte."
          },
          {
            "type": "quick_reaction",
            "situation": "Der Bankmitarbeiter fragt: Haben Sie Ihren Ausweis dabei?",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Den Ausweis zeigen.",
              "Ich habe keine Zeit.",
              "Ich bin müde."
            ],
            "answer": 0,
            "explanation": "Den Personalausweis oder Reisepass vorzeigen."
          },
          {
            "type": "quick_reaction",
            "situation": "Du willst Geld überweisen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Die IBAN des Empfängers.",
              "Das geht nicht.",
              "Ich spreche kein Deutsch."
            ],
            "answer": 0,
            "explanation": "Für Überweisungen braucht man die IBAN."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Ich möchte gerne ein Girokonto eröffnen.",
        "context": "Du möchtest ein Konto eröffnen"
      },
      {
        "de": "Gebühren",
        "context": "Du fragst nach den Gebühren"
      },
      {
        "de": "Ich brauche eine neue Bankkarte",
        "context": "Du brauchst eine neue Karte"
      },
      {
        "de": "Den Ausweis zeigen.",
        "context": "Der Bankmitarbeiter fragt: Haben Sie Ihren Ausweis dabei?"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Geben Sie mir Geld.",
        "correct": "Ich möchte gerne ein Girokonto eröffnen.",
        "tip": "Ein Girokonto eröffnen ist der Fachbegriff."
      },
      {
        "wrong": "Kosten",
        "correct": "Gebühren",
        "tip": "Bei Banken spricht man von Kontogebühren."
      },
      {
        "wrong": "Nach Hause gehen.",
        "correct": "Den Ausweis zeigen.",
        "tip": "Den Personalausweis oder Reisepass vorzeigen."
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
    "stages": [
      {
        "label": "Grundlagen",
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
          },
          {
            "type": "quick_reaction",
            "situation": "Du bist im Supermarkt.",
            "question": "Was sagst du an der Kasse?",
            "options": [
              "Kann ich mit Karte zahlen?",
              "Ich kaufe nichts.",
              "Das ist teuer."
            ],
            "answer": 0,
            "explanation": "An der Kasse fragt man nach der Zahlungsmethode."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Du hast einen Notfall.",
            "question": "112 ist die Notrufnummer in ___.",
            "options": [
              "Deutschland",
              "schnell",
              "nehme"
            ],
            "answer": "Deutschland",
            "explanation": "112 ist die Notrufnummer in Deutschland."
          },
          {
            "type": "sort_sentence",
            "situation": "Du rufst den Notruf an.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Verletzungen",
              "einen",
              "an",
              "Krankenwagen",
              "man",
              "Bei",
              "fordert"
            ],
            "answer": [
              5,
              0,
              6,
              4,
              1,
              3,
              2
            ],
            "explanation": "Richtig: Bei Verletzungen fordert man einen Krankenwagen an."
          },
          {
            "type": "fill_blank",
            "situation": "Du beschreibst den Notfall.",
            "question": "Es hat einen ___ gegeben.",
            "options": [
              "Unfall",
              "Nummer",
              "muss"
            ],
            "answer": "Unfall",
            "explanation": "Es hat einen Unfall gegeben."
          },
          {
            "type": "sort_sentence",
            "situation": "Die Leitstelle fragt: Wo genau sind Sie?",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "genaue",
              "Die",
              "angeben",
              "ist",
              "Adresse",
              "lebenswichtig"
            ],
            "answer": [
              1,
              0,
              4,
              2,
              3,
              5
            ],
            "explanation": "Richtig: Die genaue Adresse angeben ist lebenswichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du bist im Supermarkt.",
            "question": "An der Kasse fragt man nach ___ Zahlungsmethode.",
            "options": [
              "der",
              "Antwort",
              "falsch"
            ],
            "answer": "der",
            "explanation": "An der Kasse fragt man nach der Zahlungsmethode."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Du hast einen Notfall.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "112",
              "Ich verstehe nicht.",
              "Keine Ahnung."
            ],
            "answer": 0,
            "explanation": "112 ist die Notrufnummer in Deutschland."
          },
          {
            "type": "quick_reaction",
            "situation": "Du rufst den Notruf an.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Krankenwagen",
              "Ich habe keine Zeit.",
              "Nein, danke."
            ],
            "answer": 0,
            "explanation": "Bei Verletzungen fordert man einen Krankenwagen an."
          },
          {
            "type": "quick_reaction",
            "situation": "Du beschreibst den Notfall.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Es hat einen Unfall gegeben",
              "Ich habe keine Zeit.",
              "Ich verstehe nicht."
            ],
            "answer": 0,
            "explanation": "Richtig: Es hat einen Unfall gegeben."
          },
          {
            "type": "quick_reaction",
            "situation": "Die Leitstelle fragt: Wo genau sind Sie?",
            "question": "Wie reagierst du richtig?",
            "options": [
              "In der Hauptstraße 15, Berlin.",
              "Das geht nicht.",
              "Tschüss!"
            ],
            "answer": 0,
            "explanation": "Die genaue Adresse angeben ist lebenswichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bist im Supermarkt.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Kann ich mit Karte zahlen?",
              "Das ist mir egal.",
              "Ich habe keine Zeit."
            ],
            "answer": 0,
            "explanation": "An der Kasse fragt man nach der Zahlungsmethode."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Krankenwagen",
        "context": "Du rufst den Notruf an"
      },
      {
        "de": "Es hat einen Unfall gegeben",
        "context": "Du beschreibst den Notfall"
      },
      {
        "de": "In der Hauptstraße 15, Berlin.",
        "context": "Die Leitstelle fragt: Wo genau sind Sie?"
      },
      {
        "de": "Kann ich mit Karte zahlen?",
        "context": "Du bist im Supermarkt"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "110",
        "correct": "112",
        "tip": "112 ist die Notrufnummer in Deutschland."
      },
      {
        "wrong": "Arzt",
        "correct": "Krankenwagen",
        "tip": "Bei Verletzungen fordert man einen Krankenwagen an."
      },
      {
        "wrong": "Draußen.",
        "correct": "In der Hauptstraße 15, Berlin.",
        "tip": "Die genaue Adresse angeben ist lebenswichtig."
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
    "stages": [
      {
        "label": "Grundlagen",
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
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand grüßt dich.",
            "question": "Wie antwortest du?",
            "options": [
              "Hallo, wie geht es Ihnen?",
              "Ich bin müde.",
              "Tschüss!"
            ],
            "answer": 0,
            "explanation": "Eine freundliche Begrüßung ist immer passend."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Du meldest dein Kind in der Schule an.",
            "question": "Klar sagen, für welche Klasse man ___ möchte.",
            "options": [
              "anmelden",
              "Geld",
              "dort"
            ],
            "answer": "anmelden",
            "explanation": "Klar sagen, für welche Klasse man anmelden möchte."
          },
          {
            "type": "sort_sentence",
            "situation": "Du fragst nach den Schulsachen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "korrekte",
              "Schulmaterialien",
              "Begriff",
              "der",
              "ist"
            ],
            "answer": [
              1,
              4,
              3,
              0,
              2
            ],
            "explanation": "Richtig: Schulmaterialien ist der korrekte Begriff."
          },
          {
            "type": "fill_blank",
            "situation": "Du schreibst eine Entschuldigung.",
            "question": "Mein Kind war ___ krank.",
            "options": [
              "gestern",
              "dort",
              "hier"
            ],
            "answer": "gestern",
            "explanation": "Mein Kind war gestern krank."
          },
          {
            "type": "sort_sentence",
            "situation": "Die Lehrerin sagt: Ihr Kind macht gute Fortschritte.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sich",
              "Wertschätzung",
              "freuen",
              "und",
              "zeigt",
              "bedanken"
            ],
            "answer": [
              0,
              2,
              3,
              5,
              4,
              1
            ],
            "explanation": "Richtig: Sich freuen und bedanken zeigt Wertschätzung."
          },
          {
            "type": "fill_blank",
            "situation": "Jemand grüßt dich.",
            "question": "Eine freundliche Begrüßung ist ___ passend.",
            "options": [
              "immer",
              "dort",
              "sage"
            ],
            "answer": "immer",
            "explanation": "Eine freundliche Begrüßung ist immer passend."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Du meldest dein Kind in der Schule an.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich möchte mein Kind für die erste Klasse anmelden.",
              "Das geht nicht.",
              "Warum?"
            ],
            "answer": 0,
            "explanation": "Klar sagen, für welche Klasse man anmelden möchte."
          },
          {
            "type": "quick_reaction",
            "situation": "Du fragst nach den Schulsachen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Schulmaterialien",
              "Bis morgen.",
              "Tschüss!"
            ],
            "answer": 0,
            "explanation": "Schulmaterialien ist der korrekte Begriff."
          },
          {
            "type": "quick_reaction",
            "situation": "Du schreibst eine Entschuldigung.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Mein Kind war gestern krank",
              "Keine Ahnung.",
              "Ich spreche kein Deutsch."
            ],
            "answer": 0,
            "explanation": "Richtig: Mein Kind war gestern krank."
          },
          {
            "type": "quick_reaction",
            "situation": "Die Lehrerin sagt: Ihr Kind macht gute Fortschritte.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Das freut mich sehr, vielen Dank!",
              "Ich verstehe nicht.",
              "Das geht nicht."
            ],
            "answer": 0,
            "explanation": "Sich freuen und bedanken zeigt Wertschätzung."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand grüßt dich.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Hallo, wie geht es Ihnen?",
              "Keine Ahnung.",
              "Bis morgen."
            ],
            "answer": 0,
            "explanation": "Eine freundliche Begrüßung ist immer passend."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Ich möchte mein Kind für die erste Klasse anmelden.",
        "context": "Du meldest dein Kind in der Schule an"
      },
      {
        "de": "Schulmaterialien",
        "context": "Du fragst nach den Schulsachen"
      },
      {
        "de": "Mein Kind war gestern krank",
        "context": "Du schreibst eine Entschuldigung"
      },
      {
        "de": "Das freut mich sehr, vielen Dank!",
        "context": "Die Lehrerin sagt: Ihr Kind macht gute Fortschritte"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Mein Kind will lernen.",
        "correct": "Ich möchte mein Kind für die erste Klasse anmelden.",
        "tip": "Klar sagen, für welche Klasse man anmelden möchte."
      },
      {
        "wrong": "Sachen",
        "correct": "Schulmaterialien",
        "tip": "Schulmaterialien ist der korrekte Begriff."
      },
      {
        "wrong": "Okay.",
        "correct": "Das freut mich sehr, vielen Dank!",
        "tip": "Sich freuen und bedanken zeigt Wertschätzung."
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
    "stages": [
      {
        "label": "Grundlagen",
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
          },
          {
            "type": "quick_reaction",
            "situation": "Du verstehst etwas nicht.",
            "question": "Was sagst du?",
            "options": [
              "Können Sie das bitte wiederholen?",
              "Das ist mir egal.",
              "Ich gehe jetzt."
            ],
            "answer": 0,
            "explanation": "Nachfragen zeigt Interesse und hilft beim Verstehen."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Du bist neu eingezogen.",
            "question": "Sich freundlich vorstellen ist ein ___ erster Eindruck.",
            "options": [
              "guter",
              "Lösung",
              "soll"
            ],
            "answer": "guter",
            "explanation": "Sich freundlich vorstellen ist ein guter erster Eindruck."
          },
          {
            "type": "fill_blank",
            "situation": "Du bittest um Hilfe.",
            "question": "Nachbarn nehmen oft Pakete an, wenn man nicht da ___.",
            "options": [
              "ist",
              "sofort",
              "brauche"
            ],
            "answer": "ist",
            "explanation": "Nachbarn nehmen oft Pakete an, wenn man nicht da ist."
          },
          {
            "type": "fill_blank",
            "situation": "Du entschuldigst dich für Lärm.",
            "question": "Entschuldigung für den ___ gestern.",
            "options": [
              "Lärm",
              "frage",
              "nehme"
            ],
            "answer": "Lärm",
            "explanation": "Entschuldigung für den Lärm gestern."
          },
          {
            "type": "sort_sentence",
            "situation": "Dein Nachbar lädt dich zum Kaffee ein.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "annehmen",
              "freundlich",
              "Die",
              "Einladung"
            ],
            "answer": [
              2,
              3,
              1,
              0
            ],
            "explanation": "Richtig: Die Einladung freundlich annehmen."
          },
          {
            "type": "fill_blank",
            "situation": "Du verstehst etwas nicht.",
            "question": "Nachfragen zeigt ___ und hilft beim Verstehen.",
            "options": [
              "Interesse",
              "schlecht",
              "morgen"
            ],
            "answer": "Interesse",
            "explanation": "Nachfragen zeigt Interesse und hilft beim Verstehen."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Du bist neu eingezogen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Hallo, ich bin neu hier. Ich wohne nebenan.",
              "Ich spreche kein Deutsch.",
              "Warum?"
            ],
            "answer": 0,
            "explanation": "Sich freundlich vorstellen ist ein guter erster Eindruck."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bittest um Hilfe.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "annehmen",
              "Ich habe keine Zeit.",
              "Keine Ahnung."
            ],
            "answer": 0,
            "explanation": "Nachbarn nehmen oft Pakete an, wenn man nicht da ist."
          },
          {
            "type": "quick_reaction",
            "situation": "Du entschuldigst dich für Lärm.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Entschuldigung für den Lärm gestern",
              "Ich bin müde.",
              "Das ist mir egal."
            ],
            "answer": 0,
            "explanation": "Richtig: Entschuldigung für den Lärm gestern."
          },
          {
            "type": "quick_reaction",
            "situation": "Dein Nachbar lädt dich zum Kaffee ein.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Sehr gerne, das ist nett von Ihnen!",
              "Bis morgen.",
              "Ich habe keine Zeit."
            ],
            "answer": 0,
            "explanation": "Die Einladung freundlich annehmen."
          },
          {
            "type": "quick_reaction",
            "situation": "Du verstehst etwas nicht.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Können Sie das bitte wiederholen?",
              "Warum?",
              "Ich habe keine Zeit."
            ],
            "answer": 0,
            "explanation": "Nachfragen zeigt Interesse und hilft beim Verstehen."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Hallo, ich bin neu hier. Ich wohne nebenan.",
        "context": "Du bist neu eingezogen"
      },
      {
        "de": "annehmen",
        "context": "Du bittest um Hilfe"
      },
      {
        "de": "Entschuldigung für den Lärm gestern",
        "context": "Du entschuldigst dich für Lärm"
      },
      {
        "de": "Sehr gerne, das ist nett von Ihnen!",
        "context": "Dein Nachbar lädt dich zum Kaffee ein"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Wer sind Sie?",
        "correct": "Hallo, ich bin neu hier. Ich wohne nebenan.",
        "tip": "Sich freundlich vorstellen ist ein guter erster Eindruck."
      },
      {
        "wrong": "geben",
        "correct": "annehmen",
        "tip": "Nachbarn nehmen oft Pakete an, wenn man nicht da ist."
      },
      {
        "wrong": "Ich trinke keinen Kaffee.",
        "correct": "Sehr gerne, das ist nett von Ihnen!",
        "tip": "Die Einladung freundlich annehmen."
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
    "stages": [
      {
        "label": "Grundlagen",
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
          },
          {
            "type": "quick_reaction",
            "situation": "Du bedankst dich.",
            "question": "Was ist höflich?",
            "options": [
              "Vielen Dank, das ist sehr nett.",
              "Okay.",
              "Warum?"
            ],
            "answer": 0,
            "explanation": "Sich zu bedanken gehört zur Höflichkeit."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Du bist in einer Situation zum Thema: Einen Termin machen.",
            "question": "In der Situation Einen ___ machen ist klare Kommunikation wichtig.",
            "options": [
              "Termin",
              "Problem",
              "Frage"
            ],
            "answer": "Termin",
            "explanation": "In der Situation Einen Termin machen ist klare Kommunikation wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du brauchst Hilfe zum Thema Einen Termin machen.",
            "question": "Können Sie ___ bitte helfen? ist immer eine gute Frage.",
            "options": [
              "mir",
              "gleich",
              "Nummer"
            ],
            "answer": "mir",
            "explanation": "Können Sie mir bitte helfen? ist immer eine gute Frage."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen Satz zum Thema Einen Termin machen.",
            "question": "Kann Sie ___ bitte fragen?",
            "options": [
              "ich",
              "mache",
              "bitte"
            ],
            "answer": "ich",
            "explanation": "Kann Sie ich bitte fragen?"
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand gibt dir eine Antwort zum Thema Einen Termin machen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "ist",
              "beste",
              "Reaktion",
              "bedanken",
              "Sich",
              "immer",
              "die"
            ],
            "answer": [
              4,
              3,
              0,
              5,
              6,
              1,
              2
            ],
            "explanation": "Richtig: Sich bedanken ist immer die beste Reaktion."
          },
          {
            "type": "fill_blank",
            "situation": "Du bedankst dich.",
            "question": "Sich zu bedanken ___ zur Höflichkeit.",
            "options": [
              "gehört",
              "gut",
              "hier"
            ],
            "answer": "gehört",
            "explanation": "Sich zu bedanken gehört zur Höflichkeit."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Du bist in einer Situation zum Thema: Einen Termin machen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Das geht nicht.",
              "Bis morgen."
            ],
            "answer": 0,
            "explanation": "In der Situation Einen Termin machen ist klare Kommunikation wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du brauchst Hilfe zum Thema Einen Termin machen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "helfen",
              "Ich bin müde.",
              "Nein, danke."
            ],
            "answer": 0,
            "explanation": "Können Sie mir bitte helfen? ist immer eine gute Frage."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen Satz zum Thema Einen Termin machen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Kann Sie ich bitte fragen",
              "Warum?",
              "Ich bin müde."
            ],
            "answer": 0,
            "explanation": "Richtig: Kann Sie ich bitte fragen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand gibt dir eine Antwort zum Thema Einen Termin machen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Vielen Dank für die Information.",
              "Bis morgen.",
              "Das geht nicht."
            ],
            "answer": 0,
            "explanation": "Sich bedanken ist immer die beste Reaktion."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bedankst dich.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Vielen Dank, das ist sehr nett.",
              "Ich habe keine Zeit.",
              "Das geht nicht."
            ],
            "answer": 0,
            "explanation": "Sich zu bedanken gehört zur Höflichkeit."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Höflich und klar antworten.",
        "context": "Du bist in einer Situation zum Thema: Einen Termin machen"
      },
      {
        "de": "helfen",
        "context": "Du brauchst Hilfe zum Thema Einen Termin machen"
      },
      {
        "de": "Kann Sie ich bitte fragen",
        "context": "Du formulierst einen Satz zum Thema Einen Termin machen"
      },
      {
        "de": "Vielen Dank für die Information.",
        "context": "Jemand gibt dir eine Antwort zum Thema Einen Termin machen"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Nichts sagen.",
        "correct": "Höflich und klar antworten.",
        "tip": "In der Situation Einen Termin machen ist klare Kommunikation wichtig."
      },
      {
        "wrong": "sagen",
        "correct": "helfen",
        "tip": "Können Sie mir bitte helfen? ist immer eine gute Frage."
      },
      {
        "wrong": "Okay.",
        "correct": "Vielen Dank für die Information.",
        "tip": "Sich bedanken ist immer die beste Reaktion."
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
    "stages": [
      {
        "label": "Grundlagen",
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
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand fragt nach dem Weg.",
            "question": "Wie hilfst du?",
            "options": [
              "Gehen Sie geradeaus und dann links.",
              "Ich weiß nicht.",
              "Fragen Sie jemand anderen."
            ],
            "answer": 0,
            "explanation": "Wegbeschreibungen helfen im Alltag."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Du bist in einer Situation zum Thema: Taxi fahren.",
            "question": "In der Situation Taxi fahren ist klare Kommunikation ___.",
            "options": [
              "wichtig",
              "richtig",
              "möglich"
            ],
            "answer": "wichtig",
            "explanation": "In der Situation Taxi fahren ist klare Kommunikation wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du brauchst Hilfe zum Thema Taxi fahren.",
            "question": "Können Sie mir bitte helfen? ist immer eine ___ Frage.",
            "options": [
              "gute",
              "Name",
              "suche"
            ],
            "answer": "gute",
            "explanation": "Können Sie mir bitte helfen? ist immer eine gute Frage."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen Satz zum Thema Taxi fahren.",
            "question": "Kann Sie ___ bitte fragen?",
            "options": [
              "ich",
              "gestern",
              "Termin"
            ],
            "answer": "ich",
            "explanation": "Kann Sie ich bitte fragen?"
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand gibt dir eine Antwort zum Thema Taxi fahren.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sich",
              "ist",
              "beste",
              "bedanken",
              "immer",
              "die",
              "Reaktion"
            ],
            "answer": [
              0,
              3,
              1,
              4,
              5,
              2,
              6
            ],
            "explanation": "Richtig: Sich bedanken ist immer die beste Reaktion."
          },
          {
            "type": "fill_blank",
            "situation": "Jemand fragt nach dem Weg.",
            "question": "Wegbeschreibungen ___ im Alltag.",
            "options": [
              "helfen",
              "danke",
              "Frage"
            ],
            "answer": "helfen",
            "explanation": "Wegbeschreibungen helfen im Alltag."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Du bist in einer Situation zum Thema: Taxi fahren.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Das ist mir egal.",
              "Ich verstehe nicht."
            ],
            "answer": 0,
            "explanation": "In der Situation Taxi fahren ist klare Kommunikation wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du brauchst Hilfe zum Thema Taxi fahren.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "helfen",
              "Nein, danke.",
              "Bis morgen."
            ],
            "answer": 0,
            "explanation": "Können Sie mir bitte helfen? ist immer eine gute Frage."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen Satz zum Thema Taxi fahren.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Kann Sie ich bitte fragen",
              "Das geht nicht.",
              "Ich spreche kein Deutsch."
            ],
            "answer": 0,
            "explanation": "Richtig: Kann Sie ich bitte fragen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand gibt dir eine Antwort zum Thema Taxi fahren.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Vielen Dank für die Information.",
              "Tschüss!",
              "Bis morgen."
            ],
            "answer": 0,
            "explanation": "Sich bedanken ist immer die beste Reaktion."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand fragt nach dem Weg.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Gehen Sie geradeaus und dann links.",
              "Das ist mir egal.",
              "Ich habe keine Zeit."
            ],
            "answer": 0,
            "explanation": "Wegbeschreibungen helfen im Alltag."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Höflich und klar antworten.",
        "context": "Du bist in einer Situation zum Thema: Taxi fahren"
      },
      {
        "de": "helfen",
        "context": "Du brauchst Hilfe zum Thema Taxi fahren"
      },
      {
        "de": "Kann Sie ich bitte fragen",
        "context": "Du formulierst einen Satz zum Thema Taxi fahren"
      },
      {
        "de": "Vielen Dank für die Information.",
        "context": "Jemand gibt dir eine Antwort zum Thema Taxi fahren"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Nichts sagen.",
        "correct": "Höflich und klar antworten.",
        "tip": "In der Situation Taxi fahren ist klare Kommunikation wichtig."
      },
      {
        "wrong": "sagen",
        "correct": "helfen",
        "tip": "Können Sie mir bitte helfen? ist immer eine gute Frage."
      },
      {
        "wrong": "Okay.",
        "correct": "Vielen Dank für die Information.",
        "tip": "Sich bedanken ist immer die beste Reaktion."
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
    "stages": [
      {
        "label": "Grundlagen",
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
          },
          {
            "type": "quick_reaction",
            "situation": "Du bist im Supermarkt.",
            "question": "Was sagst du an der Kasse?",
            "options": [
              "Kann ich mit Karte zahlen?",
              "Ich kaufe nichts.",
              "Das ist teuer."
            ],
            "answer": 0,
            "explanation": "An der Kasse fragt man nach der Zahlungsmethode."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Du bist in einer Situation zum Thema: Farben und Kleidung.",
            "question": "In der Situation ___ und Kleidung ist klare Kommunikation wichtig.",
            "options": [
              "Farben",
              "danke",
              "sage"
            ],
            "answer": "Farben",
            "explanation": "In der Situation Farben und Kleidung ist klare Kommunikation wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du brauchst Hilfe zum Thema Farben und Kleidung.",
            "question": "Können Sie ___ bitte helfen? ist immer eine gute Frage.",
            "options": [
              "mir",
              "Adresse",
              "Lösung"
            ],
            "answer": "mir",
            "explanation": "Können Sie mir bitte helfen? ist immer eine gute Frage."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen Satz zum Thema Farben und Kleidung.",
            "question": "Kann Sie ich bitte ___?",
            "options": [
              "fragen",
              "Adresse",
              "kann"
            ],
            "answer": "fragen",
            "explanation": "Kann Sie ich bitte fragen?"
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand gibt dir eine Antwort zum Thema Farben und Kleidung.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "die",
              "Reaktion",
              "ist",
              "Sich",
              "beste",
              "immer",
              "bedanken"
            ],
            "answer": [
              3,
              6,
              2,
              5,
              0,
              4,
              1
            ],
            "explanation": "Richtig: Sich bedanken ist immer die beste Reaktion."
          },
          {
            "type": "fill_blank",
            "situation": "Du bist im Supermarkt.",
            "question": "An der Kasse fragt ___ nach der Zahlungsmethode.",
            "options": [
              "man",
              "habe",
              "Hilfe"
            ],
            "answer": "man",
            "explanation": "An der Kasse fragt man nach der Zahlungsmethode."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Du bist in einer Situation zum Thema: Farben und Kleidung.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Ich verstehe nicht.",
              "Ich habe keine Zeit."
            ],
            "answer": 0,
            "explanation": "In der Situation Farben und Kleidung ist klare Kommunikation wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du brauchst Hilfe zum Thema Farben und Kleidung.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "helfen",
              "Ich habe keine Zeit.",
              "Das geht nicht."
            ],
            "answer": 0,
            "explanation": "Können Sie mir bitte helfen? ist immer eine gute Frage."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen Satz zum Thema Farben und Kleidung.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Kann Sie ich bitte fragen",
              "Bis morgen.",
              "Das geht nicht."
            ],
            "answer": 0,
            "explanation": "Richtig: Kann Sie ich bitte fragen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand gibt dir eine Antwort zum Thema Farben und Kleidung.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Vielen Dank für die Information.",
              "Ich bin müde.",
              "Das ist mir egal."
            ],
            "answer": 0,
            "explanation": "Sich bedanken ist immer die beste Reaktion."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bist im Supermarkt.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Kann ich mit Karte zahlen?",
              "Warum?",
              "Das ist mir egal."
            ],
            "answer": 0,
            "explanation": "An der Kasse fragt man nach der Zahlungsmethode."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Höflich und klar antworten.",
        "context": "Du bist in einer Situation zum Thema: Farben und Kleidung"
      },
      {
        "de": "helfen",
        "context": "Du brauchst Hilfe zum Thema Farben und Kleidung"
      },
      {
        "de": "Kann Sie ich bitte fragen",
        "context": "Du formulierst einen Satz zum Thema Farben und Kleidung"
      },
      {
        "de": "Vielen Dank für die Information.",
        "context": "Jemand gibt dir eine Antwort zum Thema Farben und Kleidung"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Nichts sagen.",
        "correct": "Höflich und klar antworten.",
        "tip": "In der Situation Farben und Kleidung ist klare Kommunikation wichtig."
      },
      {
        "wrong": "sagen",
        "correct": "helfen",
        "tip": "Können Sie mir bitte helfen? ist immer eine gute Frage."
      },
      {
        "wrong": "Okay.",
        "correct": "Vielen Dank für die Information.",
        "tip": "Sich bedanken ist immer die beste Reaktion."
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
    "stages": [
      {
        "label": "Grundlagen",
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
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand grüßt dich.",
            "question": "Wie antwortest du?",
            "options": [
              "Hallo, wie geht es Ihnen?",
              "Ich bin müde.",
              "Tschüss!"
            ],
            "answer": 0,
            "explanation": "Eine freundliche Begrüßung ist immer passend."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Du bist in einer Situation zum Thema: Essen und Trinken bestellen.",
            "question": "In der Situation Essen und ___ bestellen ist klare Kommunikation wichtig.",
            "options": [
              "Trinken",
              "Nummer",
              "richtig"
            ],
            "answer": "Trinken",
            "explanation": "In der Situation Essen und Trinken bestellen ist klare Kommunikation wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du brauchst Hilfe zum Thema Essen und Trinken bestellen.",
            "question": "Können ___ mir bitte helfen? ist immer eine gute Frage.",
            "options": [
              "Sie",
              "Geld",
              "Lösung"
            ],
            "answer": "Sie",
            "explanation": "Können Sie mir bitte helfen? ist immer eine gute Frage."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen Satz zum Thema Essen und Trinken bestellen.",
            "question": "Kann Sie ich bitte ___?",
            "options": [
              "fragen",
              "leider",
              "komme"
            ],
            "answer": "fragen",
            "explanation": "Kann Sie ich bitte fragen?"
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand gibt dir eine Antwort zum Thema Essen und Trinken bestellen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "ist",
              "beste",
              "die",
              "Sich",
              "bedanken",
              "immer",
              "Reaktion"
            ],
            "answer": [
              3,
              4,
              0,
              5,
              2,
              1,
              6
            ],
            "explanation": "Richtig: Sich bedanken ist immer die beste Reaktion."
          },
          {
            "type": "fill_blank",
            "situation": "Jemand grüßt dich.",
            "question": "Eine ___ Begrüßung ist immer passend.",
            "options": [
              "freundliche",
              "jetzt",
              "Nummer"
            ],
            "answer": "freundliche",
            "explanation": "Eine freundliche Begrüßung ist immer passend."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Du bist in einer Situation zum Thema: Essen und Trinken bestellen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Tschüss!",
              "Warum?"
            ],
            "answer": 0,
            "explanation": "In der Situation Essen und Trinken bestellen ist klare Kommunikation wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du brauchst Hilfe zum Thema Essen und Trinken bestellen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "helfen",
              "Tschüss!",
              "Das weiß ich nicht."
            ],
            "answer": 0,
            "explanation": "Können Sie mir bitte helfen? ist immer eine gute Frage."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen Satz zum Thema Essen und Trinken bestellen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Kann Sie ich bitte fragen",
              "Ich verstehe nicht.",
              "Ich habe keine Zeit."
            ],
            "answer": 0,
            "explanation": "Richtig: Kann Sie ich bitte fragen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand gibt dir eine Antwort zum Thema Essen und Trinken bestellen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Vielen Dank für die Information.",
              "Nein, danke.",
              "Das ist mir egal."
            ],
            "answer": 0,
            "explanation": "Sich bedanken ist immer die beste Reaktion."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand grüßt dich.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Hallo, wie geht es Ihnen?",
              "Warum?",
              "Nein, danke."
            ],
            "answer": 0,
            "explanation": "Eine freundliche Begrüßung ist immer passend."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Höflich und klar antworten.",
        "context": "Du bist in einer Situation zum Thema: Essen und Trinken best"
      },
      {
        "de": "helfen",
        "context": "Du brauchst Hilfe zum Thema Essen und Trinken bestellen"
      },
      {
        "de": "Kann Sie ich bitte fragen",
        "context": "Du formulierst einen Satz zum Thema Essen und Trinken bestel"
      },
      {
        "de": "Vielen Dank für die Information.",
        "context": "Jemand gibt dir eine Antwort zum Thema Essen und Trinken bes"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Nichts sagen.",
        "correct": "Höflich und klar antworten.",
        "tip": "In der Situation Essen und Trinken bestellen ist klare Kommunikation wichtig."
      },
      {
        "wrong": "sagen",
        "correct": "helfen",
        "tip": "Können Sie mir bitte helfen? ist immer eine gute Frage."
      },
      {
        "wrong": "Okay.",
        "correct": "Vielen Dank für die Information.",
        "tip": "Sich bedanken ist immer die beste Reaktion."
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
    "stages": [
      {
        "label": "Grundlagen",
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
          },
          {
            "type": "quick_reaction",
            "situation": "Du verstehst etwas nicht.",
            "question": "Was sagst du?",
            "options": [
              "Können Sie das bitte wiederholen?",
              "Das ist mir egal.",
              "Ich gehe jetzt."
            ],
            "answer": 0,
            "explanation": "Nachfragen zeigt Interesse und hilft beim Verstehen."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Du bist in einer Situation zum Thema: Wochentage und Termine.",
            "question": "In der Situation Wochentage und Termine ___ klare Kommunikation wichtig.",
            "options": [
              "ist",
              "sofort",
              "Geld"
            ],
            "answer": "ist",
            "explanation": "In der Situation Wochentage und Termine ist klare Kommunikation wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du brauchst Hilfe zum Thema Wochentage und Termine.",
            "question": "Können Sie mir bitte helfen? ___ immer eine gute Frage.",
            "options": [
              "ist",
              "sofort",
              "Adresse"
            ],
            "answer": "ist",
            "explanation": "Können Sie mir bitte helfen? ist immer eine gute Frage."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen Satz zum Thema Wochentage und Termine.",
            "question": "Kann Sie ich ___ fragen?",
            "options": [
              "bitte",
              "morgen",
              "leider"
            ],
            "answer": "bitte",
            "explanation": "Kann Sie ich bitte fragen?"
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand gibt dir eine Antwort zum Thema Wochentage und Termine.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "ist",
              "immer",
              "bedanken",
              "Reaktion",
              "die",
              "beste",
              "Sich"
            ],
            "answer": [
              6,
              2,
              0,
              1,
              4,
              5,
              3
            ],
            "explanation": "Richtig: Sich bedanken ist immer die beste Reaktion."
          },
          {
            "type": "fill_blank",
            "situation": "Du verstehst etwas nicht.",
            "question": "Nachfragen zeigt Interesse und hilft beim ___.",
            "options": [
              "Verstehen",
              "muss",
              "gleich"
            ],
            "answer": "Verstehen",
            "explanation": "Nachfragen zeigt Interesse und hilft beim Verstehen."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Du bist in einer Situation zum Thema: Wochentage und Termine.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Keine Ahnung.",
              "Das weiß ich nicht."
            ],
            "answer": 0,
            "explanation": "In der Situation Wochentage und Termine ist klare Kommunikation wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du brauchst Hilfe zum Thema Wochentage und Termine.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "helfen",
              "Das weiß ich nicht.",
              "Das ist mir egal."
            ],
            "answer": 0,
            "explanation": "Können Sie mir bitte helfen? ist immer eine gute Frage."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen Satz zum Thema Wochentage und Termine.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Kann Sie ich bitte fragen",
              "Das ist mir egal.",
              "Das weiß ich nicht."
            ],
            "answer": 0,
            "explanation": "Richtig: Kann Sie ich bitte fragen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand gibt dir eine Antwort zum Thema Wochentage und Termine.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Vielen Dank für die Information.",
              "Ich bin müde.",
              "Tschüss!"
            ],
            "answer": 0,
            "explanation": "Sich bedanken ist immer die beste Reaktion."
          },
          {
            "type": "quick_reaction",
            "situation": "Du verstehst etwas nicht.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Können Sie das bitte wiederholen?",
              "Das ist mir egal.",
              "Tschüss!"
            ],
            "answer": 0,
            "explanation": "Nachfragen zeigt Interesse und hilft beim Verstehen."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Höflich und klar antworten.",
        "context": "Du bist in einer Situation zum Thema: Wochentage und Termine"
      },
      {
        "de": "helfen",
        "context": "Du brauchst Hilfe zum Thema Wochentage und Termine"
      },
      {
        "de": "Kann Sie ich bitte fragen",
        "context": "Du formulierst einen Satz zum Thema Wochentage und Termine"
      },
      {
        "de": "Vielen Dank für die Information.",
        "context": "Jemand gibt dir eine Antwort zum Thema Wochentage und Termin"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Nichts sagen.",
        "correct": "Höflich und klar antworten.",
        "tip": "In der Situation Wochentage und Termine ist klare Kommunikation wichtig."
      },
      {
        "wrong": "sagen",
        "correct": "helfen",
        "tip": "Können Sie mir bitte helfen? ist immer eine gute Frage."
      },
      {
        "wrong": "Okay.",
        "correct": "Vielen Dank für die Information.",
        "tip": "Sich bedanken ist immer die beste Reaktion."
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
    "stages": [
      {
        "label": "Grundlagen",
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
          },
          {
            "type": "quick_reaction",
            "situation": "Du bedankst dich.",
            "question": "Was ist höflich?",
            "options": [
              "Vielen Dank, das ist sehr nett.",
              "Okay.",
              "Warum?"
            ],
            "answer": 0,
            "explanation": "Sich zu bedanken gehört zur Höflichkeit."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Du bist in einer Situation zum Thema: Den Mietvertrag verstehen.",
            "question": "In der Situation Den Mietvertrag verstehen ist klare ___ wichtig.",
            "options": [
              "Kommunikation",
              "hier",
              "will"
            ],
            "answer": "Kommunikation",
            "explanation": "In der Situation Den Mietvertrag verstehen ist klare Kommunikation wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du brauchst Hilfe zum Thema Den Mietvertrag verstehen.",
            "question": "Können Sie mir bitte ___? ist immer eine gute Frage.",
            "options": [
              "helfen",
              "gut",
              "bitte"
            ],
            "answer": "helfen",
            "explanation": "Können Sie mir bitte helfen? ist immer eine gute Frage."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen Satz zum Thema Den Mietvertrag verstehen.",
            "question": "Kann Sie ich ___ fragen?",
            "options": [
              "bitte",
              "dort",
              "gestern"
            ],
            "answer": "bitte",
            "explanation": "Kann Sie ich bitte fragen?"
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand gibt dir eine Antwort zum Thema Den Mietvertrag verstehen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "ist",
              "beste",
              "immer",
              "bedanken",
              "Sich",
              "Reaktion",
              "die"
            ],
            "answer": [
              4,
              3,
              0,
              2,
              6,
              1,
              5
            ],
            "explanation": "Richtig: Sich bedanken ist immer die beste Reaktion."
          },
          {
            "type": "fill_blank",
            "situation": "Du bedankst dich.",
            "question": "Sich zu ___ gehört zur Höflichkeit.",
            "options": [
              "bedanken",
              "Antwort",
              "schnell"
            ],
            "answer": "bedanken",
            "explanation": "Sich zu bedanken gehört zur Höflichkeit."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Du bist in einer Situation zum Thema: Den Mietvertrag verstehen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Keine Ahnung.",
              "Ich habe keine Zeit."
            ],
            "answer": 0,
            "explanation": "In der Situation Den Mietvertrag verstehen ist klare Kommunikation wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du brauchst Hilfe zum Thema Den Mietvertrag verstehen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "helfen",
              "Ich habe keine Zeit.",
              "Das ist mir egal."
            ],
            "answer": 0,
            "explanation": "Können Sie mir bitte helfen? ist immer eine gute Frage."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen Satz zum Thema Den Mietvertrag verstehen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Kann Sie ich bitte fragen",
              "Ich spreche kein Deutsch.",
              "Ich bin müde."
            ],
            "answer": 0,
            "explanation": "Richtig: Kann Sie ich bitte fragen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand gibt dir eine Antwort zum Thema Den Mietvertrag verstehen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Vielen Dank für die Information.",
              "Bis morgen.",
              "Keine Ahnung."
            ],
            "answer": 0,
            "explanation": "Sich bedanken ist immer die beste Reaktion."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bedankst dich.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Vielen Dank, das ist sehr nett.",
              "Das ist mir egal.",
              "Ich spreche kein Deutsch."
            ],
            "answer": 0,
            "explanation": "Sich zu bedanken gehört zur Höflichkeit."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Höflich und klar antworten.",
        "context": "Du bist in einer Situation zum Thema: Den Mietvertrag verste"
      },
      {
        "de": "helfen",
        "context": "Du brauchst Hilfe zum Thema Den Mietvertrag verstehen"
      },
      {
        "de": "Kann Sie ich bitte fragen",
        "context": "Du formulierst einen Satz zum Thema Den Mietvertrag verstehe"
      },
      {
        "de": "Vielen Dank für die Information.",
        "context": "Jemand gibt dir eine Antwort zum Thema Den Mietvertrag verst"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Nichts sagen.",
        "correct": "Höflich und klar antworten.",
        "tip": "In der Situation Den Mietvertrag verstehen ist klare Kommunikation wichtig."
      },
      {
        "wrong": "sagen",
        "correct": "helfen",
        "tip": "Können Sie mir bitte helfen? ist immer eine gute Frage."
      },
      {
        "wrong": "Okay.",
        "correct": "Vielen Dank für die Information.",
        "tip": "Sich bedanken ist immer die beste Reaktion."
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
    "stages": [
      {
        "label": "Grundlagen",
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
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand fragt nach dem Weg.",
            "question": "Wie hilfst du?",
            "options": [
              "Gehen Sie geradeaus und dann links.",
              "Ich weiß nicht.",
              "Fragen Sie jemand anderen."
            ],
            "answer": 0,
            "explanation": "Wegbeschreibungen helfen im Alltag."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Du bist in einer Situation zum Thema: Im Haushalt.",
            "question": "In der Situation Im Haushalt ist klare ___ wichtig.",
            "options": [
              "Kommunikation",
              "gleich",
              "Antwort"
            ],
            "answer": "Kommunikation",
            "explanation": "In der Situation Im Haushalt ist klare Kommunikation wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du brauchst Hilfe zum Thema Im Haushalt.",
            "question": "Können Sie ___ bitte helfen? ist immer eine gute Frage.",
            "options": [
              "mir",
              "schnell",
              "werde"
            ],
            "answer": "mir",
            "explanation": "Können Sie mir bitte helfen? ist immer eine gute Frage."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen Satz zum Thema Im Haushalt.",
            "question": "Kann Sie ich ___ fragen?",
            "options": [
              "bitte",
              "gerne",
              "danke"
            ],
            "answer": "bitte",
            "explanation": "Kann Sie ich bitte fragen?"
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand gibt dir eine Antwort zum Thema Im Haushalt.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "immer",
              "bedanken",
              "die",
              "Reaktion",
              "Sich",
              "ist",
              "beste"
            ],
            "answer": [
              4,
              1,
              5,
              0,
              2,
              6,
              3
            ],
            "explanation": "Richtig: Sich bedanken ist immer die beste Reaktion."
          },
          {
            "type": "fill_blank",
            "situation": "Jemand fragt nach dem Weg.",
            "question": "Wegbeschreibungen helfen im ___.",
            "options": [
              "Alltag",
              "darf",
              "Nummer"
            ],
            "answer": "Alltag",
            "explanation": "Wegbeschreibungen helfen im Alltag."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Du bist in einer Situation zum Thema: Im Haushalt.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Nein, danke.",
              "Keine Ahnung."
            ],
            "answer": 0,
            "explanation": "In der Situation Im Haushalt ist klare Kommunikation wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du brauchst Hilfe zum Thema Im Haushalt.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "helfen",
              "Warum?",
              "Tschüss!"
            ],
            "answer": 0,
            "explanation": "Können Sie mir bitte helfen? ist immer eine gute Frage."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen Satz zum Thema Im Haushalt.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Kann Sie ich bitte fragen",
              "Ich habe keine Zeit.",
              "Tschüss!"
            ],
            "answer": 0,
            "explanation": "Richtig: Kann Sie ich bitte fragen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand gibt dir eine Antwort zum Thema Im Haushalt.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Vielen Dank für die Information.",
              "Bis morgen.",
              "Das geht nicht."
            ],
            "answer": 0,
            "explanation": "Sich bedanken ist immer die beste Reaktion."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand fragt nach dem Weg.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Gehen Sie geradeaus und dann links.",
              "Keine Ahnung.",
              "Ich verstehe nicht."
            ],
            "answer": 0,
            "explanation": "Wegbeschreibungen helfen im Alltag."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Höflich und klar antworten.",
        "context": "Du bist in einer Situation zum Thema: Im Haushalt"
      },
      {
        "de": "helfen",
        "context": "Du brauchst Hilfe zum Thema Im Haushalt"
      },
      {
        "de": "Kann Sie ich bitte fragen",
        "context": "Du formulierst einen Satz zum Thema Im Haushalt"
      },
      {
        "de": "Vielen Dank für die Information.",
        "context": "Jemand gibt dir eine Antwort zum Thema Im Haushalt"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Nichts sagen.",
        "correct": "Höflich und klar antworten.",
        "tip": "In der Situation Im Haushalt ist klare Kommunikation wichtig."
      },
      {
        "wrong": "sagen",
        "correct": "helfen",
        "tip": "Können Sie mir bitte helfen? ist immer eine gute Frage."
      },
      {
        "wrong": "Okay.",
        "correct": "Vielen Dank für die Information.",
        "tip": "Sich bedanken ist immer die beste Reaktion."
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
    "stages": [
      {
        "label": "Grundlagen",
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
          },
          {
            "type": "quick_reaction",
            "situation": "Du bist im Supermarkt.",
            "question": "Was sagst du an der Kasse?",
            "options": [
              "Kann ich mit Karte zahlen?",
              "Ich kaufe nichts.",
              "Das ist teuer."
            ],
            "answer": 0,
            "explanation": "An der Kasse fragt man nach der Zahlungsmethode."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Du bist in einer Situation zum Thema: Geburtstag feiern.",
            "question": "In der Situation Geburtstag feiern ist klare Kommunikation ___.",
            "options": [
              "wichtig",
              "langsam",
              "falsch"
            ],
            "answer": "wichtig",
            "explanation": "In der Situation Geburtstag feiern ist klare Kommunikation wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du brauchst Hilfe zum Thema Geburtstag feiern.",
            "question": "Können Sie mir bitte helfen? ___ immer eine gute Frage.",
            "options": [
              "ist",
              "Problem",
              "brauche"
            ],
            "answer": "ist",
            "explanation": "Können Sie mir bitte helfen? ist immer eine gute Frage."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen Satz zum Thema Geburtstag feiern.",
            "question": "Kann ___ ich bitte fragen?",
            "options": [
              "Sie",
              "Termin",
              "Name"
            ],
            "answer": "Sie",
            "explanation": "Kann Sie ich bitte fragen?"
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand gibt dir eine Antwort zum Thema Geburtstag feiern.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "ist",
              "Sich",
              "Reaktion",
              "beste",
              "die",
              "immer",
              "bedanken"
            ],
            "answer": [
              1,
              6,
              0,
              5,
              4,
              3,
              2
            ],
            "explanation": "Richtig: Sich bedanken ist immer die beste Reaktion."
          },
          {
            "type": "fill_blank",
            "situation": "Du bist im Supermarkt.",
            "question": "An der Kasse fragt ___ nach der Zahlungsmethode.",
            "options": [
              "man",
              "Problem",
              "mache"
            ],
            "answer": "man",
            "explanation": "An der Kasse fragt man nach der Zahlungsmethode."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Du bist in einer Situation zum Thema: Geburtstag feiern.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Warum?",
              "Das ist mir egal."
            ],
            "answer": 0,
            "explanation": "In der Situation Geburtstag feiern ist klare Kommunikation wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du brauchst Hilfe zum Thema Geburtstag feiern.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "helfen",
              "Nein, danke.",
              "Ich verstehe nicht."
            ],
            "answer": 0,
            "explanation": "Können Sie mir bitte helfen? ist immer eine gute Frage."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen Satz zum Thema Geburtstag feiern.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Kann Sie ich bitte fragen",
              "Nein, danke.",
              "Ich verstehe nicht."
            ],
            "answer": 0,
            "explanation": "Richtig: Kann Sie ich bitte fragen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand gibt dir eine Antwort zum Thema Geburtstag feiern.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Vielen Dank für die Information.",
              "Ich bin müde.",
              "Ich verstehe nicht."
            ],
            "answer": 0,
            "explanation": "Sich bedanken ist immer die beste Reaktion."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bist im Supermarkt.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Kann ich mit Karte zahlen?",
              "Das geht nicht.",
              "Das weiß ich nicht."
            ],
            "answer": 0,
            "explanation": "An der Kasse fragt man nach der Zahlungsmethode."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Höflich und klar antworten.",
        "context": "Du bist in einer Situation zum Thema: Geburtstag feiern"
      },
      {
        "de": "helfen",
        "context": "Du brauchst Hilfe zum Thema Geburtstag feiern"
      },
      {
        "de": "Kann Sie ich bitte fragen",
        "context": "Du formulierst einen Satz zum Thema Geburtstag feiern"
      },
      {
        "de": "Vielen Dank für die Information.",
        "context": "Jemand gibt dir eine Antwort zum Thema Geburtstag feiern"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Nichts sagen.",
        "correct": "Höflich und klar antworten.",
        "tip": "In der Situation Geburtstag feiern ist klare Kommunikation wichtig."
      },
      {
        "wrong": "sagen",
        "correct": "helfen",
        "tip": "Können Sie mir bitte helfen? ist immer eine gute Frage."
      },
      {
        "wrong": "Okay.",
        "correct": "Vielen Dank für die Information.",
        "tip": "Sich bedanken ist immer die beste Reaktion."
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
    "stages": [
      {
        "label": "Grundlagen",
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
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand grüßt dich.",
            "question": "Wie antwortest du?",
            "options": [
              "Hallo, wie geht es Ihnen?",
              "Ich bin müde.",
              "Tschüss!"
            ],
            "answer": 0,
            "explanation": "Eine freundliche Begrüßung ist immer passend."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Du bist in einer Situation zum Thema: Sportverein.",
            "question": "In der Situation Sportverein ist ___ Kommunikation wichtig.",
            "options": [
              "klare",
              "nehme",
              "soll"
            ],
            "answer": "klare",
            "explanation": "In der Situation Sportverein ist klare Kommunikation wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du brauchst Hilfe zum Thema Sportverein.",
            "question": "Können Sie mir bitte ___? ist immer eine gute Frage.",
            "options": [
              "helfen",
              "leider",
              "Adresse"
            ],
            "answer": "helfen",
            "explanation": "Können Sie mir bitte helfen? ist immer eine gute Frage."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen Satz zum Thema Sportverein.",
            "question": "Kann Sie ich bitte ___?",
            "options": [
              "fragen",
              "möglich",
              "sofort"
            ],
            "answer": "fragen",
            "explanation": "Kann Sie ich bitte fragen?"
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand gibt dir eine Antwort zum Thema Sportverein.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "ist",
              "Sich",
              "Reaktion",
              "die",
              "immer",
              "beste",
              "bedanken"
            ],
            "answer": [
              1,
              6,
              0,
              4,
              3,
              5,
              2
            ],
            "explanation": "Richtig: Sich bedanken ist immer die beste Reaktion."
          },
          {
            "type": "fill_blank",
            "situation": "Jemand grüßt dich.",
            "question": "Eine ___ Begrüßung ist immer passend.",
            "options": [
              "freundliche",
              "Frage",
              "frage"
            ],
            "answer": "freundliche",
            "explanation": "Eine freundliche Begrüßung ist immer passend."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Du bist in einer Situation zum Thema: Sportverein.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Ich habe keine Zeit.",
              "Das ist mir egal."
            ],
            "answer": 0,
            "explanation": "In der Situation Sportverein ist klare Kommunikation wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du brauchst Hilfe zum Thema Sportverein.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "helfen",
              "Ich verstehe nicht.",
              "Keine Ahnung."
            ],
            "answer": 0,
            "explanation": "Können Sie mir bitte helfen? ist immer eine gute Frage."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen Satz zum Thema Sportverein.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Kann Sie ich bitte fragen",
              "Ich bin müde.",
              "Nein, danke."
            ],
            "answer": 0,
            "explanation": "Richtig: Kann Sie ich bitte fragen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand gibt dir eine Antwort zum Thema Sportverein.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Vielen Dank für die Information.",
              "Warum?",
              "Das geht nicht."
            ],
            "answer": 0,
            "explanation": "Sich bedanken ist immer die beste Reaktion."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand grüßt dich.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Hallo, wie geht es Ihnen?",
              "Das geht nicht.",
              "Nein, danke."
            ],
            "answer": 0,
            "explanation": "Eine freundliche Begrüßung ist immer passend."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Höflich und klar antworten.",
        "context": "Du bist in einer Situation zum Thema: Sportverein"
      },
      {
        "de": "helfen",
        "context": "Du brauchst Hilfe zum Thema Sportverein"
      },
      {
        "de": "Kann Sie ich bitte fragen",
        "context": "Du formulierst einen Satz zum Thema Sportverein"
      },
      {
        "de": "Vielen Dank für die Information.",
        "context": "Jemand gibt dir eine Antwort zum Thema Sportverein"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Nichts sagen.",
        "correct": "Höflich und klar antworten.",
        "tip": "In der Situation Sportverein ist klare Kommunikation wichtig."
      },
      {
        "wrong": "sagen",
        "correct": "helfen",
        "tip": "Können Sie mir bitte helfen? ist immer eine gute Frage."
      },
      {
        "wrong": "Okay.",
        "correct": "Vielen Dank für die Information.",
        "tip": "Sich bedanken ist immer die beste Reaktion."
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
    "stages": [
      {
        "label": "Grundlagen",
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
          },
          {
            "type": "quick_reaction",
            "situation": "Du verstehst etwas nicht.",
            "question": "Was sagst du?",
            "options": [
              "Können Sie das bitte wiederholen?",
              "Das ist mir egal.",
              "Ich gehe jetzt."
            ],
            "answer": 0,
            "explanation": "Nachfragen zeigt Interesse und hilft beim Verstehen."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Du bist in einer Situation zum Thema: Eine Einkaufsliste schreiben.",
            "question": "In der Situation Eine Einkaufsliste schreiben ist ___ Kommunikation wichtig.",
            "options": [
              "klare",
              "gerne",
              "möglich"
            ],
            "answer": "klare",
            "explanation": "In der Situation Eine Einkaufsliste schreiben ist klare Kommunikation wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du brauchst Hilfe zum Thema Eine Einkaufsliste schreiben.",
            "question": "Können Sie mir bitte helfen? ist ___ eine gute Frage.",
            "options": [
              "immer",
              "Hilfe",
              "bitte"
            ],
            "answer": "immer",
            "explanation": "Können Sie mir bitte helfen? ist immer eine gute Frage."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen Satz zum Thema Eine Einkaufsliste schreiben.",
            "question": "Kann Sie ich bitte ___?",
            "options": [
              "fragen",
              "Termin",
              "Antwort"
            ],
            "answer": "fragen",
            "explanation": "Kann Sie ich bitte fragen?"
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand gibt dir eine Antwort zum Thema Eine Einkaufsliste schreiben.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Reaktion",
              "die",
              "immer",
              "beste",
              "Sich",
              "bedanken",
              "ist"
            ],
            "answer": [
              4,
              5,
              6,
              2,
              1,
              3,
              0
            ],
            "explanation": "Richtig: Sich bedanken ist immer die beste Reaktion."
          },
          {
            "type": "fill_blank",
            "situation": "Du verstehst etwas nicht.",
            "question": "Nachfragen zeigt Interesse und hilft beim ___.",
            "options": [
              "Verstehen",
              "nötig",
              "sofort"
            ],
            "answer": "Verstehen",
            "explanation": "Nachfragen zeigt Interesse und hilft beim Verstehen."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Du bist in einer Situation zum Thema: Eine Einkaufsliste schreiben.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Bis morgen.",
              "Tschüss!"
            ],
            "answer": 0,
            "explanation": "In der Situation Eine Einkaufsliste schreiben ist klare Kommunikation wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du brauchst Hilfe zum Thema Eine Einkaufsliste schreiben.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "helfen",
              "Das ist mir egal.",
              "Bis morgen."
            ],
            "answer": 0,
            "explanation": "Können Sie mir bitte helfen? ist immer eine gute Frage."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen Satz zum Thema Eine Einkaufsliste schreiben.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Kann Sie ich bitte fragen",
              "Bis morgen.",
              "Warum?"
            ],
            "answer": 0,
            "explanation": "Richtig: Kann Sie ich bitte fragen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand gibt dir eine Antwort zum Thema Eine Einkaufsliste schreiben.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Vielen Dank für die Information.",
              "Ich verstehe nicht.",
              "Ich bin müde."
            ],
            "answer": 0,
            "explanation": "Sich bedanken ist immer die beste Reaktion."
          },
          {
            "type": "quick_reaction",
            "situation": "Du verstehst etwas nicht.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Können Sie das bitte wiederholen?",
              "Das geht nicht.",
              "Ich bin müde."
            ],
            "answer": 0,
            "explanation": "Nachfragen zeigt Interesse und hilft beim Verstehen."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Höflich und klar antworten.",
        "context": "Du bist in einer Situation zum Thema: Eine Einkaufsliste sch"
      },
      {
        "de": "helfen",
        "context": "Du brauchst Hilfe zum Thema Eine Einkaufsliste schreiben"
      },
      {
        "de": "Kann Sie ich bitte fragen",
        "context": "Du formulierst einen Satz zum Thema Eine Einkaufsliste schre"
      },
      {
        "de": "Vielen Dank für die Information.",
        "context": "Jemand gibt dir eine Antwort zum Thema Eine Einkaufsliste sc"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Nichts sagen.",
        "correct": "Höflich und klar antworten.",
        "tip": "In der Situation Eine Einkaufsliste schreiben ist klare Kommunikation wichtig."
      },
      {
        "wrong": "sagen",
        "correct": "helfen",
        "tip": "Können Sie mir bitte helfen? ist immer eine gute Frage."
      },
      {
        "wrong": "Okay.",
        "correct": "Vielen Dank für die Information.",
        "tip": "Sich bedanken ist immer die beste Reaktion."
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
    "stages": [
      {
        "label": "Grundlagen",
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
          },
          {
            "type": "quick_reaction",
            "situation": "Du bedankst dich.",
            "question": "Was ist höflich?",
            "options": [
              "Vielen Dank, das ist sehr nett.",
              "Okay.",
              "Warum?"
            ],
            "answer": 0,
            "explanation": "Sich zu bedanken gehört zur Höflichkeit."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Du bist in einer Situation zum Thema: Handwerker rufen.",
            "question": "In der Situation Handwerker rufen ___ klare Kommunikation wichtig.",
            "options": [
              "ist",
              "darf",
              "nehme"
            ],
            "answer": "ist",
            "explanation": "In der Situation Handwerker rufen ist klare Kommunikation wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du brauchst Hilfe zum Thema Handwerker rufen.",
            "question": "Können Sie mir bitte helfen? ___ immer eine gute Frage.",
            "options": [
              "ist",
              "frage",
              "Zeit"
            ],
            "answer": "ist",
            "explanation": "Können Sie mir bitte helfen? ist immer eine gute Frage."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen Satz zum Thema Handwerker rufen.",
            "question": "Kann Sie ___ bitte fragen?",
            "options": [
              "ich",
              "Antwort",
              "habe"
            ],
            "answer": "ich",
            "explanation": "Kann Sie ich bitte fragen?"
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand gibt dir eine Antwort zum Thema Handwerker rufen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Reaktion",
              "immer",
              "Sich",
              "ist",
              "bedanken",
              "die",
              "beste"
            ],
            "answer": [
              2,
              4,
              3,
              1,
              5,
              6,
              0
            ],
            "explanation": "Richtig: Sich bedanken ist immer die beste Reaktion."
          },
          {
            "type": "fill_blank",
            "situation": "Du bedankst dich.",
            "question": "Sich zu bedanken gehört ___ Höflichkeit.",
            "options": [
              "zur",
              "bitte",
              "möchte"
            ],
            "answer": "zur",
            "explanation": "Sich zu bedanken gehört zur Höflichkeit."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Du bist in einer Situation zum Thema: Handwerker rufen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Keine Ahnung.",
              "Warum?"
            ],
            "answer": 0,
            "explanation": "In der Situation Handwerker rufen ist klare Kommunikation wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du brauchst Hilfe zum Thema Handwerker rufen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "helfen",
              "Ich spreche kein Deutsch.",
              "Das weiß ich nicht."
            ],
            "answer": 0,
            "explanation": "Können Sie mir bitte helfen? ist immer eine gute Frage."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen Satz zum Thema Handwerker rufen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Kann Sie ich bitte fragen",
              "Ich bin müde.",
              "Ich verstehe nicht."
            ],
            "answer": 0,
            "explanation": "Richtig: Kann Sie ich bitte fragen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand gibt dir eine Antwort zum Thema Handwerker rufen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Vielen Dank für die Information.",
              "Warum?",
              "Bis morgen."
            ],
            "answer": 0,
            "explanation": "Sich bedanken ist immer die beste Reaktion."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bedankst dich.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Vielen Dank, das ist sehr nett.",
              "Warum?",
              "Nein, danke."
            ],
            "answer": 0,
            "explanation": "Sich zu bedanken gehört zur Höflichkeit."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Höflich und klar antworten.",
        "context": "Du bist in einer Situation zum Thema: Handwerker rufen"
      },
      {
        "de": "helfen",
        "context": "Du brauchst Hilfe zum Thema Handwerker rufen"
      },
      {
        "de": "Kann Sie ich bitte fragen",
        "context": "Du formulierst einen Satz zum Thema Handwerker rufen"
      },
      {
        "de": "Vielen Dank für die Information.",
        "context": "Jemand gibt dir eine Antwort zum Thema Handwerker rufen"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Nichts sagen.",
        "correct": "Höflich und klar antworten.",
        "tip": "In der Situation Handwerker rufen ist klare Kommunikation wichtig."
      },
      {
        "wrong": "sagen",
        "correct": "helfen",
        "tip": "Können Sie mir bitte helfen? ist immer eine gute Frage."
      },
      {
        "wrong": "Okay.",
        "correct": "Vielen Dank für die Information.",
        "tip": "Sich bedanken ist immer die beste Reaktion."
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
    "stages": [
      {
        "label": "Grundlagen",
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
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand fragt nach dem Weg.",
            "question": "Wie hilfst du?",
            "options": [
              "Gehen Sie geradeaus und dann links.",
              "Ich weiß nicht.",
              "Fragen Sie jemand anderen."
            ],
            "answer": 0,
            "explanation": "Wegbeschreibungen helfen im Alltag."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Du bist in einer Situation zum Thema: Sich krank melden.",
            "question": "In der Situation ___ krank melden ist klare Kommunikation wichtig.",
            "options": [
              "Sich",
              "kann",
              "suche"
            ],
            "answer": "Sich",
            "explanation": "In der Situation Sich krank melden ist klare Kommunikation wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du brauchst Hilfe zum Thema Sich krank melden.",
            "question": "Können Sie mir bitte helfen? ist immer eine ___ Frage.",
            "options": [
              "gute",
              "will",
              "muss"
            ],
            "answer": "gute",
            "explanation": "Können Sie mir bitte helfen? ist immer eine gute Frage."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen Satz zum Thema Sich krank melden.",
            "question": "Kann Sie ich bitte ___?",
            "options": [
              "fragen",
              "richtig",
              "muss"
            ],
            "answer": "fragen",
            "explanation": "Kann Sie ich bitte fragen?"
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand gibt dir eine Antwort zum Thema Sich krank melden.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "ist",
              "immer",
              "Reaktion",
              "bedanken",
              "Sich",
              "beste",
              "die"
            ],
            "answer": [
              4,
              3,
              0,
              1,
              6,
              5,
              2
            ],
            "explanation": "Richtig: Sich bedanken ist immer die beste Reaktion."
          },
          {
            "type": "fill_blank",
            "situation": "Jemand fragt nach dem Weg.",
            "question": "Wegbeschreibungen ___ im Alltag.",
            "options": [
              "helfen",
              "brauche",
              "will"
            ],
            "answer": "helfen",
            "explanation": "Wegbeschreibungen helfen im Alltag."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Du bist in einer Situation zum Thema: Sich krank melden.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Das geht nicht.",
              "Ich habe keine Zeit."
            ],
            "answer": 0,
            "explanation": "In der Situation Sich krank melden ist klare Kommunikation wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du brauchst Hilfe zum Thema Sich krank melden.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "helfen",
              "Ich bin müde.",
              "Bis morgen."
            ],
            "answer": 0,
            "explanation": "Können Sie mir bitte helfen? ist immer eine gute Frage."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen Satz zum Thema Sich krank melden.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Kann Sie ich bitte fragen",
              "Ich bin müde.",
              "Das ist mir egal."
            ],
            "answer": 0,
            "explanation": "Richtig: Kann Sie ich bitte fragen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand gibt dir eine Antwort zum Thema Sich krank melden.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Vielen Dank für die Information.",
              "Das geht nicht.",
              "Ich habe keine Zeit."
            ],
            "answer": 0,
            "explanation": "Sich bedanken ist immer die beste Reaktion."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand fragt nach dem Weg.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Gehen Sie geradeaus und dann links.",
              "Warum?",
              "Bis morgen."
            ],
            "answer": 0,
            "explanation": "Wegbeschreibungen helfen im Alltag."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Höflich und klar antworten.",
        "context": "Du bist in einer Situation zum Thema: Sich krank melden"
      },
      {
        "de": "helfen",
        "context": "Du brauchst Hilfe zum Thema Sich krank melden"
      },
      {
        "de": "Kann Sie ich bitte fragen",
        "context": "Du formulierst einen Satz zum Thema Sich krank melden"
      },
      {
        "de": "Vielen Dank für die Information.",
        "context": "Jemand gibt dir eine Antwort zum Thema Sich krank melden"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Nichts sagen.",
        "correct": "Höflich und klar antworten.",
        "tip": "In der Situation Sich krank melden ist klare Kommunikation wichtig."
      },
      {
        "wrong": "sagen",
        "correct": "helfen",
        "tip": "Können Sie mir bitte helfen? ist immer eine gute Frage."
      },
      {
        "wrong": "Okay.",
        "correct": "Vielen Dank für die Information.",
        "tip": "Sich bedanken ist immer die beste Reaktion."
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
    "stages": [
      {
        "label": "Grundlagen",
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
          },
          {
            "type": "quick_reaction",
            "situation": "Du bist im Supermarkt.",
            "question": "Was sagst du an der Kasse?",
            "options": [
              "Kann ich mit Karte zahlen?",
              "Ich kaufe nichts.",
              "Das ist teuer."
            ],
            "answer": 0,
            "explanation": "An der Kasse fragt man nach der Zahlungsmethode."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Du bist in einer Situation zum Thema: Sich entschuldigen.",
            "question": "In der Situation Sich entschuldigen ___ klare Kommunikation wichtig.",
            "options": [
              "ist",
              "langsam",
              "Nummer"
            ],
            "answer": "ist",
            "explanation": "In der Situation Sich entschuldigen ist klare Kommunikation wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du brauchst Hilfe zum Thema Sich entschuldigen.",
            "question": "Können Sie mir bitte helfen? ___ immer eine gute Frage.",
            "options": [
              "ist",
              "schnell",
              "morgen"
            ],
            "answer": "ist",
            "explanation": "Können Sie mir bitte helfen? ist immer eine gute Frage."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen Satz zum Thema Sich entschuldigen.",
            "question": "Kann ___ ich bitte fragen?",
            "options": [
              "Sie",
              "morgen",
              "gerne"
            ],
            "answer": "Sie",
            "explanation": "Kann Sie ich bitte fragen?"
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand gibt dir eine Antwort zum Thema Sich entschuldigen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "die",
              "Reaktion",
              "immer",
              "ist",
              "beste",
              "bedanken",
              "Sich"
            ],
            "answer": [
              6,
              5,
              3,
              2,
              0,
              4,
              1
            ],
            "explanation": "Richtig: Sich bedanken ist immer die beste Reaktion."
          },
          {
            "type": "fill_blank",
            "situation": "Du bist im Supermarkt.",
            "question": "An der ___ fragt man nach der Zahlungsmethode.",
            "options": [
              "Kasse",
              "brauche",
              "mache"
            ],
            "answer": "Kasse",
            "explanation": "An der Kasse fragt man nach der Zahlungsmethode."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Du bist in einer Situation zum Thema: Sich entschuldigen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Das geht nicht.",
              "Ich spreche kein Deutsch."
            ],
            "answer": 0,
            "explanation": "In der Situation Sich entschuldigen ist klare Kommunikation wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du brauchst Hilfe zum Thema Sich entschuldigen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "helfen",
              "Tschüss!",
              "Das weiß ich nicht."
            ],
            "answer": 0,
            "explanation": "Können Sie mir bitte helfen? ist immer eine gute Frage."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen Satz zum Thema Sich entschuldigen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Kann Sie ich bitte fragen",
              "Ich habe keine Zeit.",
              "Warum?"
            ],
            "answer": 0,
            "explanation": "Richtig: Kann Sie ich bitte fragen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand gibt dir eine Antwort zum Thema Sich entschuldigen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Vielen Dank für die Information.",
              "Bis morgen.",
              "Ich bin müde."
            ],
            "answer": 0,
            "explanation": "Sich bedanken ist immer die beste Reaktion."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bist im Supermarkt.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Kann ich mit Karte zahlen?",
              "Warum?",
              "Ich verstehe nicht."
            ],
            "answer": 0,
            "explanation": "An der Kasse fragt man nach der Zahlungsmethode."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Höflich und klar antworten.",
        "context": "Du bist in einer Situation zum Thema: Sich entschuldigen"
      },
      {
        "de": "helfen",
        "context": "Du brauchst Hilfe zum Thema Sich entschuldigen"
      },
      {
        "de": "Kann Sie ich bitte fragen",
        "context": "Du formulierst einen Satz zum Thema Sich entschuldigen"
      },
      {
        "de": "Vielen Dank für die Information.",
        "context": "Jemand gibt dir eine Antwort zum Thema Sich entschuldigen"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Nichts sagen.",
        "correct": "Höflich und klar antworten.",
        "tip": "In der Situation Sich entschuldigen ist klare Kommunikation wichtig."
      },
      {
        "wrong": "sagen",
        "correct": "helfen",
        "tip": "Können Sie mir bitte helfen? ist immer eine gute Frage."
      },
      {
        "wrong": "Okay.",
        "correct": "Vielen Dank für die Information.",
        "tip": "Sich bedanken ist immer die beste Reaktion."
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
    "stages": [
      {
        "label": "Grundlagen",
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
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand grüßt dich.",
            "question": "Wie antwortest du?",
            "options": [
              "Hallo, wie geht es Ihnen?",
              "Ich bin müde.",
              "Tschüss!"
            ],
            "answer": 0,
            "explanation": "Eine freundliche Begrüßung ist immer passend."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Du bist in einer Situation zum Thema: Auf der Ausländerbehörde.",
            "question": "In ___ Situation Auf der Ausländerbehörde ist klare Kommunikation wichtig.",
            "options": [
              "der",
              "frage",
              "Frage"
            ],
            "answer": "der",
            "explanation": "In der Situation Auf der Ausländerbehörde ist klare Kommunikation wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du brauchst Hilfe zum Thema Auf der Ausländerbehörde.",
            "question": "Können Sie mir bitte helfen? ___ immer eine gute Frage.",
            "options": [
              "ist",
              "bitte",
              "gut"
            ],
            "answer": "ist",
            "explanation": "Können Sie mir bitte helfen? ist immer eine gute Frage."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen Satz zum Thema Auf der Ausländerbehörde.",
            "question": "Kann ___ ich bitte fragen?",
            "options": [
              "Sie",
              "dort",
              "frage"
            ],
            "answer": "Sie",
            "explanation": "Kann Sie ich bitte fragen?"
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand gibt dir eine Antwort zum Thema Auf der Ausländerbehörde.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Reaktion",
              "Sich",
              "immer",
              "bedanken",
              "die",
              "beste",
              "ist"
            ],
            "answer": [
              1,
              3,
              6,
              2,
              4,
              5,
              0
            ],
            "explanation": "Richtig: Sich bedanken ist immer die beste Reaktion."
          },
          {
            "type": "fill_blank",
            "situation": "Jemand grüßt dich.",
            "question": "Eine freundliche Begrüßung ist immer ___.",
            "options": [
              "passend",
              "frage",
              "jetzt"
            ],
            "answer": "passend",
            "explanation": "Eine freundliche Begrüßung ist immer passend."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Du bist in einer Situation zum Thema: Auf der Ausländerbehörde.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Tschüss!",
              "Ich verstehe nicht."
            ],
            "answer": 0,
            "explanation": "In der Situation Auf der Ausländerbehörde ist klare Kommunikation wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du brauchst Hilfe zum Thema Auf der Ausländerbehörde.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "helfen",
              "Tschüss!",
              "Ich spreche kein Deutsch."
            ],
            "answer": 0,
            "explanation": "Können Sie mir bitte helfen? ist immer eine gute Frage."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen Satz zum Thema Auf der Ausländerbehörde.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Kann Sie ich bitte fragen",
              "Das weiß ich nicht.",
              "Tschüss!"
            ],
            "answer": 0,
            "explanation": "Richtig: Kann Sie ich bitte fragen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand gibt dir eine Antwort zum Thema Auf der Ausländerbehörde.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Vielen Dank für die Information.",
              "Ich verstehe nicht.",
              "Ich bin müde."
            ],
            "answer": 0,
            "explanation": "Sich bedanken ist immer die beste Reaktion."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand grüßt dich.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Hallo, wie geht es Ihnen?",
              "Bis morgen.",
              "Ich bin müde."
            ],
            "answer": 0,
            "explanation": "Eine freundliche Begrüßung ist immer passend."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Höflich und klar antworten.",
        "context": "Du bist in einer Situation zum Thema: Auf der Ausländerbehör"
      },
      {
        "de": "helfen",
        "context": "Du brauchst Hilfe zum Thema Auf der Ausländerbehörde"
      },
      {
        "de": "Kann Sie ich bitte fragen",
        "context": "Du formulierst einen Satz zum Thema Auf der Ausländerbehörde"
      },
      {
        "de": "Vielen Dank für die Information.",
        "context": "Jemand gibt dir eine Antwort zum Thema Auf der Ausländerbehö"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Nichts sagen.",
        "correct": "Höflich und klar antworten.",
        "tip": "In der Situation Auf der Ausländerbehörde ist klare Kommunikation wichtig."
      },
      {
        "wrong": "sagen",
        "correct": "helfen",
        "tip": "Können Sie mir bitte helfen? ist immer eine gute Frage."
      },
      {
        "wrong": "Okay.",
        "correct": "Vielen Dank für die Information.",
        "tip": "Sich bedanken ist immer die beste Reaktion."
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
    "stages": [
      {
        "label": "Grundlagen",
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
          },
          {
            "type": "quick_reaction",
            "situation": "Du verstehst etwas nicht.",
            "question": "Was sagst du?",
            "options": [
              "Können Sie das bitte wiederholen?",
              "Das ist mir egal.",
              "Ich gehe jetzt."
            ],
            "answer": 0,
            "explanation": "Nachfragen zeigt Interesse und hilft beim Verstehen."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Du bist in einer Situation zum Thema: Symptome beschreiben.",
            "question": "In der Situation Symptome beschreiben ___ klare Kommunikation wichtig.",
            "options": [
              "ist",
              "Name",
              "will"
            ],
            "answer": "ist",
            "explanation": "In der Situation Symptome beschreiben ist klare Kommunikation wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du brauchst Hilfe zum Thema Symptome beschreiben.",
            "question": "Können Sie mir bitte helfen? ist immer eine ___ Frage.",
            "options": [
              "gute",
              "bitte",
              "Antwort"
            ],
            "answer": "gute",
            "explanation": "Können Sie mir bitte helfen? ist immer eine gute Frage."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen Satz zum Thema Symptome beschreiben.",
            "question": "Kann Sie ich bitte ___?",
            "options": [
              "fragen",
              "Termin",
              "falsch"
            ],
            "answer": "fragen",
            "explanation": "Kann Sie ich bitte fragen?"
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand gibt dir eine Antwort zum Thema Symptome beschreiben.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "bedanken",
              "Reaktion",
              "ist",
              "Sich",
              "beste",
              "immer",
              "die"
            ],
            "answer": [
              3,
              0,
              2,
              5,
              6,
              4,
              1
            ],
            "explanation": "Richtig: Sich bedanken ist immer die beste Reaktion."
          },
          {
            "type": "fill_blank",
            "situation": "Du verstehst etwas nicht.",
            "question": "Nachfragen zeigt Interesse und ___ beim Verstehen.",
            "options": [
              "hilft",
              "gerne",
              "Problem"
            ],
            "answer": "hilft",
            "explanation": "Nachfragen zeigt Interesse und hilft beim Verstehen."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Du bist in einer Situation zum Thema: Symptome beschreiben.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Ich bin müde.",
              "Ich verstehe nicht."
            ],
            "answer": 0,
            "explanation": "In der Situation Symptome beschreiben ist klare Kommunikation wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du brauchst Hilfe zum Thema Symptome beschreiben.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "helfen",
              "Das weiß ich nicht.",
              "Ich spreche kein Deutsch."
            ],
            "answer": 0,
            "explanation": "Können Sie mir bitte helfen? ist immer eine gute Frage."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen Satz zum Thema Symptome beschreiben.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Kann Sie ich bitte fragen",
              "Das ist mir egal.",
              "Keine Ahnung."
            ],
            "answer": 0,
            "explanation": "Richtig: Kann Sie ich bitte fragen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand gibt dir eine Antwort zum Thema Symptome beschreiben.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Vielen Dank für die Information.",
              "Ich bin müde.",
              "Bis morgen."
            ],
            "answer": 0,
            "explanation": "Sich bedanken ist immer die beste Reaktion."
          },
          {
            "type": "quick_reaction",
            "situation": "Du verstehst etwas nicht.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Können Sie das bitte wiederholen?",
              "Das weiß ich nicht.",
              "Keine Ahnung."
            ],
            "answer": 0,
            "explanation": "Nachfragen zeigt Interesse und hilft beim Verstehen."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Höflich und klar antworten.",
        "context": "Du bist in einer Situation zum Thema: Symptome beschreiben"
      },
      {
        "de": "helfen",
        "context": "Du brauchst Hilfe zum Thema Symptome beschreiben"
      },
      {
        "de": "Kann Sie ich bitte fragen",
        "context": "Du formulierst einen Satz zum Thema Symptome beschreiben"
      },
      {
        "de": "Vielen Dank für die Information.",
        "context": "Jemand gibt dir eine Antwort zum Thema Symptome beschreiben"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Nichts sagen.",
        "correct": "Höflich und klar antworten.",
        "tip": "In der Situation Symptome beschreiben ist klare Kommunikation wichtig."
      },
      {
        "wrong": "sagen",
        "correct": "helfen",
        "tip": "Können Sie mir bitte helfen? ist immer eine gute Frage."
      },
      {
        "wrong": "Okay.",
        "correct": "Vielen Dank für die Information.",
        "tip": "Sich bedanken ist immer die beste Reaktion."
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
    "stages": [
      {
        "label": "Grundlagen",
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
          },
          {
            "type": "quick_reaction",
            "situation": "Du bedankst dich.",
            "question": "Was ist höflich?",
            "options": [
              "Vielen Dank, das ist sehr nett.",
              "Okay.",
              "Warum?"
            ],
            "answer": 0,
            "explanation": "Sich zu bedanken gehört zur Höflichkeit."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Du bist in einer Situation zum Thema: Internet und Handy.",
            "question": "In der Situation Internet und ___ ist klare Kommunikation wichtig.",
            "options": [
              "Handy",
              "schnell",
              "werde"
            ],
            "answer": "Handy",
            "explanation": "In der Situation Internet und Handy ist klare Kommunikation wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du brauchst Hilfe zum Thema Internet und Handy.",
            "question": "Können Sie mir ___ helfen? ist immer eine gute Frage.",
            "options": [
              "bitte",
              "leider",
              "gerne"
            ],
            "answer": "bitte",
            "explanation": "Können Sie mir bitte helfen? ist immer eine gute Frage."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen Satz zum Thema Internet und Handy.",
            "question": "Kann Sie ich bitte ___?",
            "options": [
              "fragen",
              "Termin",
              "mache"
            ],
            "answer": "fragen",
            "explanation": "Kann Sie ich bitte fragen?"
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand gibt dir eine Antwort zum Thema Internet und Handy.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Reaktion",
              "ist",
              "bedanken",
              "Sich",
              "beste",
              "immer",
              "die"
            ],
            "answer": [
              3,
              2,
              1,
              5,
              6,
              4,
              0
            ],
            "explanation": "Richtig: Sich bedanken ist immer die beste Reaktion."
          },
          {
            "type": "fill_blank",
            "situation": "Du bedankst dich.",
            "question": "Sich zu bedanken gehört zur ___.",
            "options": [
              "Höflichkeit",
              "Lösung",
              "Problem"
            ],
            "answer": "Höflichkeit",
            "explanation": "Sich zu bedanken gehört zur Höflichkeit."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Du bist in einer Situation zum Thema: Internet und Handy.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Keine Ahnung.",
              "Ich spreche kein Deutsch."
            ],
            "answer": 0,
            "explanation": "In der Situation Internet und Handy ist klare Kommunikation wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du brauchst Hilfe zum Thema Internet und Handy.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "helfen",
              "Tschüss!",
              "Nein, danke."
            ],
            "answer": 0,
            "explanation": "Können Sie mir bitte helfen? ist immer eine gute Frage."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen Satz zum Thema Internet und Handy.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Kann Sie ich bitte fragen",
              "Ich habe keine Zeit.",
              "Warum?"
            ],
            "answer": 0,
            "explanation": "Richtig: Kann Sie ich bitte fragen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand gibt dir eine Antwort zum Thema Internet und Handy.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Vielen Dank für die Information.",
              "Ich verstehe nicht.",
              "Keine Ahnung."
            ],
            "answer": 0,
            "explanation": "Sich bedanken ist immer die beste Reaktion."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bedankst dich.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Vielen Dank, das ist sehr nett.",
              "Ich habe keine Zeit.",
              "Das geht nicht."
            ],
            "answer": 0,
            "explanation": "Sich zu bedanken gehört zur Höflichkeit."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Höflich und klar antworten.",
        "context": "Du bist in einer Situation zum Thema: Internet und Handy"
      },
      {
        "de": "helfen",
        "context": "Du brauchst Hilfe zum Thema Internet und Handy"
      },
      {
        "de": "Kann Sie ich bitte fragen",
        "context": "Du formulierst einen Satz zum Thema Internet und Handy"
      },
      {
        "de": "Vielen Dank für die Information.",
        "context": "Jemand gibt dir eine Antwort zum Thema Internet und Handy"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Nichts sagen.",
        "correct": "Höflich und klar antworten.",
        "tip": "In der Situation Internet und Handy ist klare Kommunikation wichtig."
      },
      {
        "wrong": "sagen",
        "correct": "helfen",
        "tip": "Können Sie mir bitte helfen? ist immer eine gute Frage."
      },
      {
        "wrong": "Okay.",
        "correct": "Vielen Dank für die Information.",
        "tip": "Sich bedanken ist immer die beste Reaktion."
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
    "stages": [
      {
        "label": "Grundlagen",
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
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand fragt nach dem Weg.",
            "question": "Wie hilfst du?",
            "options": [
              "Gehen Sie geradeaus und dann links.",
              "Ich weiß nicht.",
              "Fragen Sie jemand anderen."
            ],
            "answer": 0,
            "explanation": "Wegbeschreibungen helfen im Alltag."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Du bist in einer Situation zum Thema: Müll richtig trennen.",
            "question": "In ___ Situation Müll richtig trennen ist klare Kommunikation wichtig.",
            "options": [
              "der",
              "gut",
              "soll"
            ],
            "answer": "der",
            "explanation": "In der Situation Müll richtig trennen ist klare Kommunikation wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du brauchst Hilfe zum Thema Müll richtig trennen.",
            "question": "Können Sie mir bitte helfen? ist ___ eine gute Frage.",
            "options": [
              "immer",
              "suche",
              "Problem"
            ],
            "answer": "immer",
            "explanation": "Können Sie mir bitte helfen? ist immer eine gute Frage."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen Satz zum Thema Müll richtig trennen.",
            "question": "Kann ___ ich bitte fragen?",
            "options": [
              "Sie",
              "gleich",
              "Arbeit"
            ],
            "answer": "Sie",
            "explanation": "Kann Sie ich bitte fragen?"
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand gibt dir eine Antwort zum Thema Müll richtig trennen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "ist",
              "beste",
              "bedanken",
              "immer",
              "Sich",
              "die",
              "Reaktion"
            ],
            "answer": [
              4,
              2,
              0,
              3,
              5,
              1,
              6
            ],
            "explanation": "Richtig: Sich bedanken ist immer die beste Reaktion."
          },
          {
            "type": "fill_blank",
            "situation": "Jemand fragt nach dem Weg.",
            "question": "Wegbeschreibungen ___ im Alltag.",
            "options": [
              "helfen",
              "wichtig",
              "Zeit"
            ],
            "answer": "helfen",
            "explanation": "Wegbeschreibungen helfen im Alltag."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Du bist in einer Situation zum Thema: Müll richtig trennen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Ich bin müde.",
              "Warum?"
            ],
            "answer": 0,
            "explanation": "In der Situation Müll richtig trennen ist klare Kommunikation wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du brauchst Hilfe zum Thema Müll richtig trennen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "helfen",
              "Keine Ahnung.",
              "Warum?"
            ],
            "answer": 0,
            "explanation": "Können Sie mir bitte helfen? ist immer eine gute Frage."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen Satz zum Thema Müll richtig trennen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Kann Sie ich bitte fragen",
              "Das weiß ich nicht.",
              "Das ist mir egal."
            ],
            "answer": 0,
            "explanation": "Richtig: Kann Sie ich bitte fragen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand gibt dir eine Antwort zum Thema Müll richtig trennen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Vielen Dank für die Information.",
              "Ich verstehe nicht.",
              "Das geht nicht."
            ],
            "answer": 0,
            "explanation": "Sich bedanken ist immer die beste Reaktion."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand fragt nach dem Weg.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Gehen Sie geradeaus und dann links.",
              "Tschüss!",
              "Ich verstehe nicht."
            ],
            "answer": 0,
            "explanation": "Wegbeschreibungen helfen im Alltag."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Höflich und klar antworten.",
        "context": "Du bist in einer Situation zum Thema: Müll richtig trennen"
      },
      {
        "de": "helfen",
        "context": "Du brauchst Hilfe zum Thema Müll richtig trennen"
      },
      {
        "de": "Kann Sie ich bitte fragen",
        "context": "Du formulierst einen Satz zum Thema Müll richtig trennen"
      },
      {
        "de": "Vielen Dank für die Information.",
        "context": "Jemand gibt dir eine Antwort zum Thema Müll richtig trennen"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Nichts sagen.",
        "correct": "Höflich und klar antworten.",
        "tip": "In der Situation Müll richtig trennen ist klare Kommunikation wichtig."
      },
      {
        "wrong": "sagen",
        "correct": "helfen",
        "tip": "Können Sie mir bitte helfen? ist immer eine gute Frage."
      },
      {
        "wrong": "Okay.",
        "correct": "Vielen Dank für die Information.",
        "tip": "Sich bedanken ist immer die beste Reaktion."
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
    "stages": [
      {
        "label": "Grundlagen",
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
          },
          {
            "type": "quick_reaction",
            "situation": "Du bist im Supermarkt.",
            "question": "Was sagst du an der Kasse?",
            "options": [
              "Kann ich mit Karte zahlen?",
              "Ich kaufe nichts.",
              "Das ist teuer."
            ],
            "answer": 0,
            "explanation": "An der Kasse fragt man nach der Zahlungsmethode."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Du bist in einer Situation zum Thema: Datum und Monate.",
            "question": "In der Situation Datum und Monate ist klare ___ wichtig.",
            "options": [
              "Kommunikation",
              "bitte",
              "richtig"
            ],
            "answer": "Kommunikation",
            "explanation": "In der Situation Datum und Monate ist klare Kommunikation wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du brauchst Hilfe zum Thema Datum und Monate.",
            "question": "Können Sie ___ bitte helfen? ist immer eine gute Frage.",
            "options": [
              "mir",
              "bin",
              "gestern"
            ],
            "answer": "mir",
            "explanation": "Können Sie mir bitte helfen? ist immer eine gute Frage."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen Satz zum Thema Datum und Monate.",
            "question": "Kann Sie ___ bitte fragen?",
            "options": [
              "ich",
              "danke",
              "komme"
            ],
            "answer": "ich",
            "explanation": "Kann Sie ich bitte fragen?"
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand gibt dir eine Antwort zum Thema Datum und Monate.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "bedanken",
              "Reaktion",
              "beste",
              "immer",
              "Sich",
              "die",
              "ist"
            ],
            "answer": [
              4,
              0,
              6,
              3,
              5,
              2,
              1
            ],
            "explanation": "Richtig: Sich bedanken ist immer die beste Reaktion."
          },
          {
            "type": "fill_blank",
            "situation": "Du bist im Supermarkt.",
            "question": "An der Kasse fragt man nach der ___.",
            "options": [
              "Zahlungsmethode",
              "will",
              "gut"
            ],
            "answer": "Zahlungsmethode",
            "explanation": "An der Kasse fragt man nach der Zahlungsmethode."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Du bist in einer Situation zum Thema: Datum und Monate.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Ich spreche kein Deutsch.",
              "Keine Ahnung."
            ],
            "answer": 0,
            "explanation": "In der Situation Datum und Monate ist klare Kommunikation wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du brauchst Hilfe zum Thema Datum und Monate.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "helfen",
              "Tschüss!",
              "Warum?"
            ],
            "answer": 0,
            "explanation": "Können Sie mir bitte helfen? ist immer eine gute Frage."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen Satz zum Thema Datum und Monate.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Kann Sie ich bitte fragen",
              "Bis morgen.",
              "Ich verstehe nicht."
            ],
            "answer": 0,
            "explanation": "Richtig: Kann Sie ich bitte fragen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand gibt dir eine Antwort zum Thema Datum und Monate.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Vielen Dank für die Information.",
              "Das geht nicht.",
              "Ich verstehe nicht."
            ],
            "answer": 0,
            "explanation": "Sich bedanken ist immer die beste Reaktion."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bist im Supermarkt.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Kann ich mit Karte zahlen?",
              "Ich habe keine Zeit.",
              "Warum?"
            ],
            "answer": 0,
            "explanation": "An der Kasse fragt man nach der Zahlungsmethode."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Höflich und klar antworten.",
        "context": "Du bist in einer Situation zum Thema: Datum und Monate"
      },
      {
        "de": "helfen",
        "context": "Du brauchst Hilfe zum Thema Datum und Monate"
      },
      {
        "de": "Kann Sie ich bitte fragen",
        "context": "Du formulierst einen Satz zum Thema Datum und Monate"
      },
      {
        "de": "Vielen Dank für die Information.",
        "context": "Jemand gibt dir eine Antwort zum Thema Datum und Monate"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Nichts sagen.",
        "correct": "Höflich und klar antworten.",
        "tip": "In der Situation Datum und Monate ist klare Kommunikation wichtig."
      },
      {
        "wrong": "sagen",
        "correct": "helfen",
        "tip": "Können Sie mir bitte helfen? ist immer eine gute Frage."
      },
      {
        "wrong": "Okay.",
        "correct": "Vielen Dank für die Information.",
        "tip": "Sich bedanken ist immer die beste Reaktion."
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
    "stages": [
      {
        "label": "Grundlagen",
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
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand grüßt dich.",
            "question": "Wie antwortest du?",
            "options": [
              "Hallo, wie geht es Ihnen?",
              "Ich bin müde.",
              "Tschüss!"
            ],
            "answer": 0,
            "explanation": "Eine freundliche Begrüßung ist immer passend."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Du bist in einer Situation zum Thema: Danke und Bitte.",
            "question": "In der Situation Danke und Bitte ist klare ___ wichtig.",
            "options": [
              "Kommunikation",
              "brauche",
              "gut"
            ],
            "answer": "Kommunikation",
            "explanation": "In der Situation Danke und Bitte ist klare Kommunikation wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du brauchst Hilfe zum Thema Danke und Bitte.",
            "question": "Können Sie mir bitte helfen? ist immer eine gute ___.",
            "options": [
              "Frage",
              "muss",
              "darf"
            ],
            "answer": "Frage",
            "explanation": "Können Sie mir bitte helfen? ist immer eine gute Frage."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen Satz zum Thema Danke und Bitte.",
            "question": "Kann Sie ___ bitte fragen?",
            "options": [
              "ich",
              "heute",
              "falsch"
            ],
            "answer": "ich",
            "explanation": "Kann Sie ich bitte fragen?"
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand gibt dir eine Antwort zum Thema Danke und Bitte.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "die",
              "immer",
              "Reaktion",
              "ist",
              "Sich",
              "bedanken",
              "beste"
            ],
            "answer": [
              4,
              5,
              3,
              1,
              0,
              6,
              2
            ],
            "explanation": "Richtig: Sich bedanken ist immer die beste Reaktion."
          },
          {
            "type": "fill_blank",
            "situation": "Jemand grüßt dich.",
            "question": "Eine freundliche Begrüßung ist immer ___.",
            "options": [
              "passend",
              "Termin",
              "habe"
            ],
            "answer": "passend",
            "explanation": "Eine freundliche Begrüßung ist immer passend."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Du bist in einer Situation zum Thema: Danke und Bitte.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Ich verstehe nicht.",
              "Bis morgen."
            ],
            "answer": 0,
            "explanation": "In der Situation Danke und Bitte ist klare Kommunikation wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du brauchst Hilfe zum Thema Danke und Bitte.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "helfen",
              "Ich bin müde.",
              "Bis morgen."
            ],
            "answer": 0,
            "explanation": "Können Sie mir bitte helfen? ist immer eine gute Frage."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen Satz zum Thema Danke und Bitte.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Kann Sie ich bitte fragen",
              "Keine Ahnung.",
              "Warum?"
            ],
            "answer": 0,
            "explanation": "Richtig: Kann Sie ich bitte fragen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand gibt dir eine Antwort zum Thema Danke und Bitte.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Vielen Dank für die Information.",
              "Tschüss!",
              "Warum?"
            ],
            "answer": 0,
            "explanation": "Sich bedanken ist immer die beste Reaktion."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand grüßt dich.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Hallo, wie geht es Ihnen?",
              "Das geht nicht.",
              "Warum?"
            ],
            "answer": 0,
            "explanation": "Eine freundliche Begrüßung ist immer passend."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Höflich und klar antworten.",
        "context": "Du bist in einer Situation zum Thema: Danke und Bitte"
      },
      {
        "de": "helfen",
        "context": "Du brauchst Hilfe zum Thema Danke und Bitte"
      },
      {
        "de": "Kann Sie ich bitte fragen",
        "context": "Du formulierst einen Satz zum Thema Danke und Bitte"
      },
      {
        "de": "Vielen Dank für die Information.",
        "context": "Jemand gibt dir eine Antwort zum Thema Danke und Bitte"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Nichts sagen.",
        "correct": "Höflich und klar antworten.",
        "tip": "In der Situation Danke und Bitte ist klare Kommunikation wichtig."
      },
      {
        "wrong": "sagen",
        "correct": "helfen",
        "tip": "Können Sie mir bitte helfen? ist immer eine gute Frage."
      },
      {
        "wrong": "Okay.",
        "correct": "Vielen Dank für die Information.",
        "tip": "Sich bedanken ist immer die beste Reaktion."
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
    "stages": [
      {
        "label": "Grundlagen",
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
          },
          {
            "type": "quick_reaction",
            "situation": "Du verstehst etwas nicht.",
            "question": "Was sagst du?",
            "options": [
              "Können Sie das bitte wiederholen?",
              "Das ist mir egal.",
              "Ich gehe jetzt."
            ],
            "answer": 0,
            "explanation": "Nachfragen zeigt Interesse und hilft beim Verstehen."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Du bist in einer Situation zum Thema: Sich verabschieden.",
            "question": "In der Situation Sich verabschieden ist ___ Kommunikation wichtig.",
            "options": [
              "klare",
              "Lösung",
              "möglich"
            ],
            "answer": "klare",
            "explanation": "In der Situation Sich verabschieden ist klare Kommunikation wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du brauchst Hilfe zum Thema Sich verabschieden.",
            "question": "Können Sie mir bitte helfen? ist immer eine gute ___.",
            "options": [
              "Frage",
              "nehme",
              "will"
            ],
            "answer": "Frage",
            "explanation": "Können Sie mir bitte helfen? ist immer eine gute Frage."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen Satz zum Thema Sich verabschieden.",
            "question": "Kann Sie ich ___ fragen?",
            "options": [
              "bitte",
              "jetzt",
              "gleich"
            ],
            "answer": "bitte",
            "explanation": "Kann Sie ich bitte fragen?"
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand gibt dir eine Antwort zum Thema Sich verabschieden.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "ist",
              "Reaktion",
              "Sich",
              "beste",
              "bedanken",
              "immer",
              "die"
            ],
            "answer": [
              2,
              4,
              0,
              5,
              6,
              3,
              1
            ],
            "explanation": "Richtig: Sich bedanken ist immer die beste Reaktion."
          },
          {
            "type": "fill_blank",
            "situation": "Du verstehst etwas nicht.",
            "question": "Nachfragen zeigt Interesse und hilft beim ___.",
            "options": [
              "Verstehen",
              "schlecht",
              "danke"
            ],
            "answer": "Verstehen",
            "explanation": "Nachfragen zeigt Interesse und hilft beim Verstehen."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Du bist in einer Situation zum Thema: Sich verabschieden.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Ich habe keine Zeit.",
              "Bis morgen."
            ],
            "answer": 0,
            "explanation": "In der Situation Sich verabschieden ist klare Kommunikation wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du brauchst Hilfe zum Thema Sich verabschieden.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "helfen",
              "Keine Ahnung.",
              "Bis morgen."
            ],
            "answer": 0,
            "explanation": "Können Sie mir bitte helfen? ist immer eine gute Frage."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen Satz zum Thema Sich verabschieden.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Kann Sie ich bitte fragen",
              "Tschüss!",
              "Warum?"
            ],
            "answer": 0,
            "explanation": "Richtig: Kann Sie ich bitte fragen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand gibt dir eine Antwort zum Thema Sich verabschieden.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Vielen Dank für die Information.",
              "Das weiß ich nicht.",
              "Tschüss!"
            ],
            "answer": 0,
            "explanation": "Sich bedanken ist immer die beste Reaktion."
          },
          {
            "type": "quick_reaction",
            "situation": "Du verstehst etwas nicht.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Können Sie das bitte wiederholen?",
              "Das geht nicht.",
              "Ich bin müde."
            ],
            "answer": 0,
            "explanation": "Nachfragen zeigt Interesse und hilft beim Verstehen."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Höflich und klar antworten.",
        "context": "Du bist in einer Situation zum Thema: Sich verabschieden"
      },
      {
        "de": "helfen",
        "context": "Du brauchst Hilfe zum Thema Sich verabschieden"
      },
      {
        "de": "Kann Sie ich bitte fragen",
        "context": "Du formulierst einen Satz zum Thema Sich verabschieden"
      },
      {
        "de": "Vielen Dank für die Information.",
        "context": "Jemand gibt dir eine Antwort zum Thema Sich verabschieden"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Nichts sagen.",
        "correct": "Höflich und klar antworten.",
        "tip": "In der Situation Sich verabschieden ist klare Kommunikation wichtig."
      },
      {
        "wrong": "sagen",
        "correct": "helfen",
        "tip": "Können Sie mir bitte helfen? ist immer eine gute Frage."
      },
      {
        "wrong": "Okay.",
        "correct": "Vielen Dank für die Information.",
        "tip": "Sich bedanken ist immer die beste Reaktion."
      }
    ]
  }
];
