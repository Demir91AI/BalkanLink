import type { Lesson } from "./types";

export const lessonsA2: Lesson[] = [
  {
    "id": "a2-01",
    "level": "A2",
    "title": "Arbeitsvertrag",
    "titleDe": "Den Arbeitsvertrag verstehen",
    "icon": "📋",
    "premium": false,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Du liest deinen Arbeitsvertrag.",
            "question": "Was bedeutet Probezeit?",
            "options": [
              "Eine Testphase am Anfang der Arbeit.",
              "Die erste Pause.",
              "Ein extra Gehalt."
            ],
            "answer": 0,
            "explanation": "Die Probezeit dauert meist 6 Monate."
          },
          {
            "type": "fill_blank",
            "situation": "Du fragst nach dem Gehalt.",
            "question": "Wie hoch ist das ___ Gehalt?",
            "options": [
              "monatliche",
              "tägliche",
              "jährliche"
            ],
            "answer": "monatliche",
            "explanation": "Das monatliche Bruttogehalt steht im Vertrag."
          },
          {
            "type": "sort_sentence",
            "situation": "Du fragst nach dem Urlaubsanspruch.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "viele",
              "Wie",
              "habe",
              "Urlaubstage",
              "ich"
            ],
            "answer": [
              1,
              0,
              3,
              2,
              4
            ],
            "explanation": "Richtig: Wie viele Urlaubstage habe ich?"
          },
          {
            "type": "quick_reaction",
            "situation": "Dein Chef sagt: Die Kündigungsfrist beträgt vier Wochen.",
            "question": "Was bedeutet das?",
            "options": [
              "Du musst 4 Wochen vorher kündigen.",
              "Du bekommst 4 Wochen frei.",
              "Du musst 4 Wochen arbeiten."
            ],
            "answer": 0,
            "explanation": "Die Kündigungsfrist gibt an, wie früh man kündigen muss."
          },
          {
            "type": "quick_reaction",
            "situation": "Dein Nachbar beschwert sich über Lärm.",
            "question": "Wie reagierst du?",
            "options": [
              "Es tut mir leid, ich werde leiser sein.",
              "Das ist mir egal.",
              "Rufen Sie die Polizei."
            ],
            "answer": 0,
            "explanation": "Sich entschuldigen löst Konflikte schneller."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Du liest deinen Arbeitsvertrag.",
            "question": "Die Probezeit dauert ___ 6 Monate.",
            "options": [
              "meist",
              "darf",
              "Name"
            ],
            "answer": "meist",
            "explanation": "Die Probezeit dauert meist 6 Monate."
          },
          {
            "type": "sort_sentence",
            "situation": "Du fragst nach dem Gehalt.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "monatliche",
              "Bruttogehalt",
              "Vertrag",
              "steht",
              "im",
              "Das"
            ],
            "answer": [
              5,
              0,
              1,
              3,
              4,
              2
            ],
            "explanation": "Richtig: Das monatliche Bruttogehalt steht im Vertrag."
          },
          {
            "type": "fill_blank",
            "situation": "Du fragst nach dem Urlaubsanspruch.",
            "question": "Wie viele Urlaubstage habe ___?",
            "options": [
              "ich",
              "jetzt",
              "gehe"
            ],
            "answer": "ich",
            "explanation": "Wie viele Urlaubstage habe ich?"
          },
          {
            "type": "sort_sentence",
            "situation": "Dein Chef sagt: Die Kündigungsfrist beträgt vier Wochen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "kündigen",
              "vorher",
              "musst",
              "4",
              "Wochen",
              "Du"
            ],
            "answer": [
              5,
              2,
              3,
              4,
              1,
              0
            ],
            "explanation": "Richtig: Du musst 4 Wochen vorher kündigen."
          },
          {
            "type": "fill_blank",
            "situation": "Dein Nachbar beschwert sich über Lärm.",
            "question": "Sich ___ löst Konflikte schneller.",
            "options": [
              "entschuldigen",
              "Lösung",
              "dort"
            ],
            "answer": "entschuldigen",
            "explanation": "Sich entschuldigen löst Konflikte schneller."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Du liest deinen Arbeitsvertrag.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Eine Testphase am Anfang der Arbeit.",
              "Ich weiß es nicht.",
              "Keine Lust."
            ],
            "answer": 0,
            "explanation": "Die Probezeit dauert meist 6 Monate."
          },
          {
            "type": "quick_reaction",
            "situation": "Du fragst nach dem Gehalt.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "monatliche",
              "Vielleicht später.",
              "Kein Interesse."
            ],
            "answer": 0,
            "explanation": "Das monatliche Bruttogehalt steht im Vertrag."
          },
          {
            "type": "quick_reaction",
            "situation": "Du fragst nach dem Urlaubsanspruch.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Wie viele Urlaubstage habe ich",
              "Geht mich nichts an.",
              "Muss das sein?"
            ],
            "answer": 0,
            "explanation": "Richtig: Wie viele Urlaubstage habe ich?"
          },
          {
            "type": "quick_reaction",
            "situation": "Dein Chef sagt: Die Kündigungsfrist beträgt vier Wochen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Du musst 4 Wochen vorher kündigen.",
              "Ich weiß es nicht.",
              "Das ist nicht mein Problem."
            ],
            "answer": 0,
            "explanation": "Die Kündigungsfrist gibt an, wie früh man kündigen muss."
          },
          {
            "type": "quick_reaction",
            "situation": "Dein Nachbar beschwert sich über Lärm.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Es tut mir leid, ich werde leiser sein.",
              "Das verstehe ich nicht.",
              "Ich habe keine Ahnung."
            ],
            "answer": 0,
            "explanation": "Sich entschuldigen löst Konflikte schneller."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Entschuldigung, können Sie mir helfen?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich verstehe das nicht.",
        "context": "Frage stellen"
      },
      {
        "de": "Können Sie das bitte wiederholen?",
        "context": "Antwort geben"
      },
      {
        "de": "Wie sagt man das auf Deutsch?",
        "context": "Problem lösen"
      },
      {
        "de": "Bitte sprechen Sie langsamer.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Das habe ich nicht verstanden.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Vielen Dank für Ihre Hilfe.",
        "context": "Frage stellen"
      },
      {
        "de": "Wo finde ich Informationen dazu?",
        "context": "Antwort geben"
      },
      {
        "de": "Ich habe eine Frage.",
        "context": "Problem lösen"
      },
      {
        "de": "Können Sie mir das erklären?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich bin neu hier.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Das ist sehr wichtig für mich.",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Alternative?",
        "context": "Antwort geben"
      },
      {
        "de": "Wann kann ich wiederkommen?",
        "context": "Problem lösen"
      },
      {
        "de": "Ist das kostenlos?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich würde gerne einen Termin vereinbaren.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Könnten Sie mir bitte weiterhelfen?",
        "context": "Frage stellen"
      },
      {
        "de": "Das muss ich mir noch überlegen.",
        "context": "Antwort geben"
      },
      {
        "de": "Ich bin damit nicht einverstanden.",
        "context": "Problem lösen"
      },
      {
        "de": "Können wir einen Kompromiss finden?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Das erscheint mir zu teuer.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich hätte gerne eine schriftliche Bestätigung.",
        "context": "Frage stellen"
      },
      {
        "de": "Wann ist der nächste freie Termin?",
        "context": "Antwort geben"
      },
      {
        "de": "Gibt es da Ausnahmen?",
        "context": "Problem lösen"
      },
      {
        "de": "Das war ein Missverständnis.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich möchte mich beschweren.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Können Sie das schriftlich bestätigen?",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es einen Ansprechpartner dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Ich brauche noch etwas Zeit.",
        "context": "Problem lösen"
      },
      {
        "de": "Das ist mir leider nicht möglich.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Welche Unterlagen brauche ich?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich komme aus dem Ausland.",
        "context": "Frage stellen"
      },
      {
        "de": "Mein Deutsch ist noch nicht so gut.",
        "context": "Antwort geben"
      },
      {
        "de": "Können Sie mir das auf Papier geben?",
        "context": "Problem lösen"
      },
      {
        "de": "Wo muss ich unterschreiben?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ist das Formular richtig ausgefüllt?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich habe alles dabei.",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Frist dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Was passiert als nächstes?",
        "context": "Problem lösen"
      },
      {
        "de": "Ich warte auf eine Antwort.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Können Sie mich zurückrufen?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich habe eine Beschwerde.",
        "context": "Frage stellen"
      },
      {
        "de": "Das muss dringend erledigt werden.",
        "context": "Antwort geben"
      },
      {
        "de": "Ich bin seit einem Jahr in Deutschland.",
        "context": "Problem lösen"
      },
      {
        "de": "Meine Adresse hat sich geändert.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich brauche eine Bescheinigung.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Bis wann muss ich das erledigen?",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Beratung dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Wo kann ich mich informieren?",
        "context": "Problem lösen"
      },
      {
        "de": "Ich möchte einen Antrag stellen.",
        "context": "Hilfe bitten"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Die erste Pause.",
        "correct": "Eine Testphase am Anfang der Arbeit.",
        "tip": "Die Probezeit dauert meist 6 Monate."
      },
      {
        "wrong": "tägliche",
        "correct": "monatliche",
        "tip": "Das monatliche Bruttogehalt steht im Vertrag."
      },
      {
        "wrong": "Du bekommst 4 Wochen frei.",
        "correct": "Du musst 4 Wochen vorher kündigen.",
        "tip": "Die Kündigungsfrist gibt an, wie früh man kündigen muss."
      }
    ]
  },
  {
    "id": "a2-02",
    "level": "A2",
    "title": "Versicherung",
    "titleDe": "Versicherungen abschließen",
    "icon": "🛡️",
    "premium": false,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Du willst eine Haftpflichtversicherung.",
            "question": "Was ist das?",
            "options": [
              "Schutz, wenn du etwas beschädigst.",
              "Eine Krankenversicherung.",
              "Eine Autoversicherung."
            ],
            "answer": 0,
            "explanation": "Die Haftpflicht zahlt Schäden, die du anderen zufügst."
          },
          {
            "type": "fill_blank",
            "situation": "Du vergleichst Versicherungen.",
            "question": "Ich möchte verschiedene Angebote ___.",
            "options": [
              "vergleichen",
              "sehen",
              "haben"
            ],
            "answer": "vergleichen",
            "explanation": "Angebote vergleichen hilft, den besten Preis zu finden."
          },
          {
            "type": "sort_sentence",
            "situation": "Du meldest einen Schaden.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "einen",
              "Ich",
              "melden",
              "möchte",
              "Schaden"
            ],
            "answer": [
              1,
              3,
              0,
              4,
              2
            ],
            "explanation": "Richtig: Ich möchte einen Schaden melden."
          },
          {
            "type": "quick_reaction",
            "situation": "Die Versicherung fragt: Wann ist der Schaden passiert?",
            "question": "Wie antwortest du?",
            "options": [
              "Am letzten Freitag, den 15. März.",
              "Vor kurzem.",
              "Ich weiß nicht mehr."
            ],
            "answer": 0,
            "explanation": "Das genaue Datum des Schadens ist wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bekommst eine Rechnung per Post.",
            "question": "Was machst du?",
            "options": [
              "Ich überweise den Betrag bis zum Fälligkeitsdatum.",
              "Ich werfe sie weg.",
              "Ich rufe die Polizei."
            ],
            "answer": 0,
            "explanation": "Rechnungen pünktlich bezahlen ist wichtig."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Du willst eine Haftpflichtversicherung.",
            "question": "Die Haftpflicht ___ Schäden, die du anderen zufügst.",
            "options": [
              "zahlt",
              "gestern",
              "dort"
            ],
            "answer": "zahlt",
            "explanation": "Die Haftpflicht zahlt Schäden, die du anderen zufügst."
          },
          {
            "type": "sort_sentence",
            "situation": "Du vergleichst Versicherungen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "zu",
              "hilft,",
              "finden",
              "den",
              "Angebote",
              "Preis",
              "vergleichen",
              "besten"
            ],
            "answer": [
              4,
              6,
              1,
              3,
              7,
              5,
              0,
              2
            ],
            "explanation": "Richtig: Angebote vergleichen hilft, den besten Preis zu finden."
          },
          {
            "type": "fill_blank",
            "situation": "Du meldest einen Schaden.",
            "question": "Ich möchte einen Schaden ___.",
            "options": [
              "melden",
              "komme",
              "bitte"
            ],
            "answer": "melden",
            "explanation": "Ich möchte einen Schaden melden."
          },
          {
            "type": "sort_sentence",
            "situation": "Die Versicherung fragt: Wann ist der Schaden passiert?",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "des",
              "genaue",
              "Schadens",
              "wichtig",
              "ist",
              "Das",
              "Datum"
            ],
            "answer": [
              5,
              1,
              6,
              0,
              2,
              4,
              3
            ],
            "explanation": "Richtig: Das genaue Datum des Schadens ist wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du bekommst eine Rechnung per Post.",
            "question": "Rechnungen pünktlich bezahlen ___ wichtig.",
            "options": [
              "ist",
              "Zeit",
              "Nummer"
            ],
            "answer": "ist",
            "explanation": "Rechnungen pünktlich bezahlen ist wichtig."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Du willst eine Haftpflichtversicherung.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Schutz, wenn du etwas beschädigst.",
              "Fragen Sie jemand anderen.",
              "Mir egal."
            ],
            "answer": 0,
            "explanation": "Die Haftpflicht zahlt Schäden, die du anderen zufügst."
          },
          {
            "type": "quick_reaction",
            "situation": "Du vergleichst Versicherungen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "vergleichen",
              "Ich weiß es nicht.",
              "Keine Lust."
            ],
            "answer": 0,
            "explanation": "Angebote vergleichen hilft, den besten Preis zu finden."
          },
          {
            "type": "quick_reaction",
            "situation": "Du meldest einen Schaden.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich möchte einen Schaden melden",
              "Das verstehe ich nicht.",
              "Kein Interesse."
            ],
            "answer": 0,
            "explanation": "Richtig: Ich möchte einen Schaden melden."
          },
          {
            "type": "quick_reaction",
            "situation": "Die Versicherung fragt: Wann ist der Schaden passiert?",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Am letzten Freitag, den 15. März.",
              "Fragen Sie jemand anderen.",
              "Geht mich nichts an."
            ],
            "answer": 0,
            "explanation": "Das genaue Datum des Schadens ist wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bekommst eine Rechnung per Post.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich überweise den Betrag bis zum Fälligkeitsdatum.",
              "Fragen Sie jemand anderen.",
              "Ich habe keine Ahnung."
            ],
            "answer": 0,
            "explanation": "Rechnungen pünktlich bezahlen ist wichtig."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Entschuldigung, können Sie mir helfen?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich verstehe das nicht.",
        "context": "Frage stellen"
      },
      {
        "de": "Können Sie das bitte wiederholen?",
        "context": "Antwort geben"
      },
      {
        "de": "Wie sagt man das auf Deutsch?",
        "context": "Problem lösen"
      },
      {
        "de": "Bitte sprechen Sie langsamer.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Das habe ich nicht verstanden.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Vielen Dank für Ihre Hilfe.",
        "context": "Frage stellen"
      },
      {
        "de": "Wo finde ich Informationen dazu?",
        "context": "Antwort geben"
      },
      {
        "de": "Ich habe eine Frage.",
        "context": "Problem lösen"
      },
      {
        "de": "Können Sie mir das erklären?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich bin neu hier.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Das ist sehr wichtig für mich.",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Alternative?",
        "context": "Antwort geben"
      },
      {
        "de": "Wann kann ich wiederkommen?",
        "context": "Problem lösen"
      },
      {
        "de": "Ist das kostenlos?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich würde gerne einen Termin vereinbaren.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Könnten Sie mir bitte weiterhelfen?",
        "context": "Frage stellen"
      },
      {
        "de": "Das muss ich mir noch überlegen.",
        "context": "Antwort geben"
      },
      {
        "de": "Ich bin damit nicht einverstanden.",
        "context": "Problem lösen"
      },
      {
        "de": "Können wir einen Kompromiss finden?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Das erscheint mir zu teuer.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich hätte gerne eine schriftliche Bestätigung.",
        "context": "Frage stellen"
      },
      {
        "de": "Wann ist der nächste freie Termin?",
        "context": "Antwort geben"
      },
      {
        "de": "Gibt es da Ausnahmen?",
        "context": "Problem lösen"
      },
      {
        "de": "Das war ein Missverständnis.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich möchte mich beschweren.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Können Sie das schriftlich bestätigen?",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es einen Ansprechpartner dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Ich brauche noch etwas Zeit.",
        "context": "Problem lösen"
      },
      {
        "de": "Das ist mir leider nicht möglich.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Welche Unterlagen brauche ich?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich komme aus dem Ausland.",
        "context": "Frage stellen"
      },
      {
        "de": "Mein Deutsch ist noch nicht so gut.",
        "context": "Antwort geben"
      },
      {
        "de": "Können Sie mir das auf Papier geben?",
        "context": "Problem lösen"
      },
      {
        "de": "Wo muss ich unterschreiben?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ist das Formular richtig ausgefüllt?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich habe alles dabei.",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Frist dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Was passiert als nächstes?",
        "context": "Problem lösen"
      },
      {
        "de": "Ich warte auf eine Antwort.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Können Sie mich zurückrufen?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich habe eine Beschwerde.",
        "context": "Frage stellen"
      },
      {
        "de": "Das muss dringend erledigt werden.",
        "context": "Antwort geben"
      },
      {
        "de": "Ich bin seit einem Jahr in Deutschland.",
        "context": "Problem lösen"
      },
      {
        "de": "Meine Adresse hat sich geändert.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich brauche eine Bescheinigung.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Bis wann muss ich das erledigen?",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Beratung dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Wo kann ich mich informieren?",
        "context": "Problem lösen"
      },
      {
        "de": "Ich möchte einen Antrag stellen.",
        "context": "Hilfe bitten"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Eine Krankenversicherung.",
        "correct": "Schutz, wenn du etwas beschädigst.",
        "tip": "Die Haftpflicht zahlt Schäden, die du anderen zufügst."
      },
      {
        "wrong": "sehen",
        "correct": "vergleichen",
        "tip": "Angebote vergleichen hilft, den besten Preis zu finden."
      },
      {
        "wrong": "Vor kurzem.",
        "correct": "Am letzten Freitag, den 15. März.",
        "tip": "Das genaue Datum des Schadens ist wichtig."
      }
    ]
  },
  {
    "id": "a2-03",
    "level": "A2",
    "title": "Reklamation",
    "titleDe": "Etwas reklamieren",
    "icon": "📦",
    "premium": false,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Dein neues Gerät funktioniert nicht.",
            "question": "Was sagst du im Laden?",
            "options": [
              "Ich möchte das Gerät reklamieren. Es funktioniert nicht.",
              "Das ist kaputt!",
              "Geld zurück!"
            ],
            "answer": 0,
            "explanation": "Sachlich und höflich reklamieren ist professionell."
          },
          {
            "type": "fill_blank",
            "situation": "Du zeigst den Kassenbon.",
            "question": "Hier ist mein ___ als Beweis.",
            "options": [
              "Kassenbon",
              "Geld",
              "Ticket"
            ],
            "answer": "Kassenbon",
            "explanation": "Den Kassenbon aufbewahren ist wichtig für Reklamationen."
          },
          {
            "type": "sort_sentence",
            "situation": "Du beschreibst das Problem.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "dem",
              "Das",
              "funktioniert",
              "seit",
              "nicht",
              "Gerät",
              "Kauf"
            ],
            "answer": [
              1,
              5,
              2,
              3,
              0,
              6,
              4
            ],
            "explanation": "Richtig: Das Gerät funktioniert seit dem Kauf nicht."
          },
          {
            "type": "quick_reaction",
            "situation": "Der Verkäufer fragt: Möchten Sie Umtausch oder Erstattung?",
            "question": "Wie reagierst du?",
            "options": [
              "Ich hätte gerne eine Erstattung, bitte.",
              "Egal.",
              "Beides."
            ],
            "answer": 0,
            "explanation": "Klar sagen, was man möchte: Umtausch oder Geld zurück."
          },
          {
            "type": "quick_reaction",
            "situation": "Du willst einen Termin absagen.",
            "question": "Was sagst du?",
            "options": [
              "Ich muss den Termin leider absagen.",
              "Ich komme nicht.",
              "Vergessen Sie es."
            ],
            "answer": 0,
            "explanation": "Höfliches Absagen ist im Deutschen wichtig."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Dein neues Gerät funktioniert nicht.",
            "question": "Sachlich und höflich reklamieren ist ___.",
            "options": [
              "professionell",
              "Geld",
              "morgen"
            ],
            "answer": "professionell",
            "explanation": "Sachlich und höflich reklamieren ist professionell."
          },
          {
            "type": "sort_sentence",
            "situation": "Du zeigst den Kassenbon.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "aufbewahren",
              "wichtig",
              "Den",
              "Reklamationen",
              "ist",
              "Kassenbon",
              "für"
            ],
            "answer": [
              2,
              5,
              0,
              4,
              1,
              6,
              3
            ],
            "explanation": "Richtig: Den Kassenbon aufbewahren ist wichtig für Reklamationen."
          },
          {
            "type": "fill_blank",
            "situation": "Du beschreibst das Problem.",
            "question": "Das Gerät funktioniert seit dem Kauf ___.",
            "options": [
              "nicht",
              "suche",
              "gut"
            ],
            "answer": "nicht",
            "explanation": "Das Gerät funktioniert seit dem Kauf nicht."
          },
          {
            "type": "sort_sentence",
            "situation": "Der Verkäufer fragt: Möchten Sie Umtausch oder Erstattung?",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "bitte",
              "Erstattung,",
              "hätte",
              "eine",
              "Ich",
              "gerne"
            ],
            "answer": [
              4,
              2,
              5,
              3,
              1,
              0
            ],
            "explanation": "Richtig: Ich hätte gerne eine Erstattung, bitte."
          },
          {
            "type": "fill_blank",
            "situation": "Du willst einen Termin absagen.",
            "question": "Höfliches ___ ist im Deutschen wichtig.",
            "options": [
              "Absagen",
              "Name",
              "Hilfe"
            ],
            "answer": "Absagen",
            "explanation": "Höfliches Absagen ist im Deutschen wichtig."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Dein neues Gerät funktioniert nicht.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich möchte das Gerät reklamieren. Es funktioniert nicht.",
              "Das verstehe ich nicht.",
              "Das kann ich nicht."
            ],
            "answer": 0,
            "explanation": "Sachlich und höflich reklamieren ist professionell."
          },
          {
            "type": "quick_reaction",
            "situation": "Du zeigst den Kassenbon.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Kassenbon",
              "Kein Interesse.",
              "Keine Lust."
            ],
            "answer": 0,
            "explanation": "Den Kassenbon aufbewahren ist wichtig für Reklamationen."
          },
          {
            "type": "quick_reaction",
            "situation": "Du beschreibst das Problem.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Das Gerät funktioniert seit dem Kauf nicht",
              "Geht mich nichts an.",
              "Das kann ich nicht."
            ],
            "answer": 0,
            "explanation": "Richtig: Das Gerät funktioniert seit dem Kauf nicht."
          },
          {
            "type": "quick_reaction",
            "situation": "Der Verkäufer fragt: Möchten Sie Umtausch oder Erstattung?",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich hätte gerne eine Erstattung, bitte.",
              "Muss das sein?",
              "Das kann ich nicht."
            ],
            "answer": 0,
            "explanation": "Klar sagen, was man möchte: Umtausch oder Geld zurück."
          },
          {
            "type": "quick_reaction",
            "situation": "Du willst einen Termin absagen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich muss den Termin leider absagen.",
              "Mir egal.",
              "Keine Lust."
            ],
            "answer": 0,
            "explanation": "Höfliches Absagen ist im Deutschen wichtig."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Entschuldigung, können Sie mir helfen?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich verstehe das nicht.",
        "context": "Frage stellen"
      },
      {
        "de": "Können Sie das bitte wiederholen?",
        "context": "Antwort geben"
      },
      {
        "de": "Wie sagt man das auf Deutsch?",
        "context": "Problem lösen"
      },
      {
        "de": "Bitte sprechen Sie langsamer.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Das habe ich nicht verstanden.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Vielen Dank für Ihre Hilfe.",
        "context": "Frage stellen"
      },
      {
        "de": "Wo finde ich Informationen dazu?",
        "context": "Antwort geben"
      },
      {
        "de": "Ich habe eine Frage.",
        "context": "Problem lösen"
      },
      {
        "de": "Können Sie mir das erklären?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich bin neu hier.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Das ist sehr wichtig für mich.",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Alternative?",
        "context": "Antwort geben"
      },
      {
        "de": "Wann kann ich wiederkommen?",
        "context": "Problem lösen"
      },
      {
        "de": "Ist das kostenlos?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich würde gerne einen Termin vereinbaren.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Könnten Sie mir bitte weiterhelfen?",
        "context": "Frage stellen"
      },
      {
        "de": "Das muss ich mir noch überlegen.",
        "context": "Antwort geben"
      },
      {
        "de": "Ich bin damit nicht einverstanden.",
        "context": "Problem lösen"
      },
      {
        "de": "Können wir einen Kompromiss finden?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Das erscheint mir zu teuer.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich hätte gerne eine schriftliche Bestätigung.",
        "context": "Frage stellen"
      },
      {
        "de": "Wann ist der nächste freie Termin?",
        "context": "Antwort geben"
      },
      {
        "de": "Gibt es da Ausnahmen?",
        "context": "Problem lösen"
      },
      {
        "de": "Das war ein Missverständnis.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich möchte mich beschweren.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Können Sie das schriftlich bestätigen?",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es einen Ansprechpartner dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Ich brauche noch etwas Zeit.",
        "context": "Problem lösen"
      },
      {
        "de": "Das ist mir leider nicht möglich.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Welche Unterlagen brauche ich?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich komme aus dem Ausland.",
        "context": "Frage stellen"
      },
      {
        "de": "Mein Deutsch ist noch nicht so gut.",
        "context": "Antwort geben"
      },
      {
        "de": "Können Sie mir das auf Papier geben?",
        "context": "Problem lösen"
      },
      {
        "de": "Wo muss ich unterschreiben?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ist das Formular richtig ausgefüllt?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich habe alles dabei.",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Frist dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Was passiert als nächstes?",
        "context": "Problem lösen"
      },
      {
        "de": "Ich warte auf eine Antwort.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Können Sie mich zurückrufen?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich habe eine Beschwerde.",
        "context": "Frage stellen"
      },
      {
        "de": "Das muss dringend erledigt werden.",
        "context": "Antwort geben"
      },
      {
        "de": "Ich bin seit einem Jahr in Deutschland.",
        "context": "Problem lösen"
      },
      {
        "de": "Meine Adresse hat sich geändert.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich brauche eine Bescheinigung.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Bis wann muss ich das erledigen?",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Beratung dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Wo kann ich mich informieren?",
        "context": "Problem lösen"
      },
      {
        "de": "Ich möchte einen Antrag stellen.",
        "context": "Hilfe bitten"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Das ist kaputt!",
        "correct": "Ich möchte das Gerät reklamieren. Es funktioniert nicht.",
        "tip": "Sachlich und höflich reklamieren ist professionell."
      },
      {
        "wrong": "Geld",
        "correct": "Kassenbon",
        "tip": "Den Kassenbon aufbewahren ist wichtig für Reklamationen."
      },
      {
        "wrong": "Egal.",
        "correct": "Ich hätte gerne eine Erstattung, bitte.",
        "tip": "Klar sagen, was man möchte: Umtausch oder Geld zurück."
      }
    ]
  },
  {
    "id": "a2-04",
    "level": "A2",
    "title": "Arztbesuch 2",
    "titleDe": "Beim Facharzt",
    "icon": "🏥",
    "premium": false,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Beim Facharzt.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Nichts sagen.",
              "Einfach weggehen."
            ],
            "answer": 0,
            "explanation": "Bei Beim Facharzt ist klare Kommunikation wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du brauchst Hilfe beim Thema Beim Facharzt.",
            "question": "Könnten Sie mir bitte ___?",
            "options": [
              "helfen",
              "sagen",
              "zeigen"
            ],
            "answer": "helfen",
            "explanation": "Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst eine Frage zum Thema Beim Facharzt.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sie",
              "Könnten",
              "bitte",
              "mir",
              "helfen"
            ],
            "answer": [
              1,
              0,
              3,
              2,
              4
            ],
            "explanation": "Richtig: Könnten Sie mir bitte helfen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand erklärt dir etwas zum Thema Beim Facharzt.",
            "question": "Was sagst du?",
            "options": [
              "Vielen Dank, das hilft mir sehr.",
              "Okay.",
              "Können Sie das wiederholen?"
            ],
            "answer": 0,
            "explanation": "Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "quick_reaction",
            "situation": "Ein Kollege fragt nach deiner Meinung.",
            "question": "Wie antwortest du?",
            "options": [
              "Ich finde, das ist eine gute Idee.",
              "Keine Ahnung.",
              "Mir egal."
            ],
            "answer": 0,
            "explanation": "Eine begründete Meinung zeigt Engagement."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Beim Facharzt.",
            "question": "Bei Beim Facharzt ist ___ Kommunikation wichtig.",
            "options": [
              "klare",
              "darf",
              "brauche"
            ],
            "answer": "klare",
            "explanation": "Bei Beim Facharzt ist klare Kommunikation wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du brauchst Hilfe beim Thema Beim Facharzt.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Höflich",
              "um",
              "richtig",
              "immer",
              "Hilfe",
              "ist",
              "bitten"
            ],
            "answer": [
              0,
              1,
              4,
              6,
              5,
              3,
              2
            ],
            "explanation": "Richtig: Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst eine Frage zum Thema Beim Facharzt.",
            "question": "Könnten ___ mir bitte helfen?",
            "options": [
              "Sie",
              "hier",
              "Arbeit"
            ],
            "answer": "Sie",
            "explanation": "Könnten Sie mir bitte helfen?"
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand erklärt dir etwas zum Thema Beim Facharzt.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "bedanken",
              "Wertschätzung",
              "Sich",
              "zeigt"
            ],
            "answer": [
              2,
              0,
              3,
              1
            ],
            "explanation": "Richtig: Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "fill_blank",
            "situation": "Ein Kollege fragt nach deiner Meinung.",
            "question": "Eine begründete Meinung zeigt ___.",
            "options": [
              "Engagement",
              "Frage",
              "gleich"
            ],
            "answer": "Engagement",
            "explanation": "Eine begründete Meinung zeigt Engagement."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Beim Facharzt.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Mir egal.",
              "Das verstehe ich nicht."
            ],
            "answer": 0,
            "explanation": "Bei Beim Facharzt ist klare Kommunikation wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du brauchst Hilfe beim Thema Beim Facharzt.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "helfen",
              "Vielleicht später.",
              "Mir egal."
            ],
            "answer": 0,
            "explanation": "Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst eine Frage zum Thema Beim Facharzt.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Könnten Sie mir bitte helfen",
              "Kein Interesse.",
              "Mir egal."
            ],
            "answer": 0,
            "explanation": "Richtig: Könnten Sie mir bitte helfen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand erklärt dir etwas zum Thema Beim Facharzt.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Vielen Dank, das hilft mir sehr.",
              "Das verstehe ich nicht.",
              "Das kann ich nicht."
            ],
            "answer": 0,
            "explanation": "Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "quick_reaction",
            "situation": "Ein Kollege fragt nach deiner Meinung.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich finde, das ist eine gute Idee.",
              "Kein Interesse.",
              "Geht mich nichts an."
            ],
            "answer": 0,
            "explanation": "Eine begründete Meinung zeigt Engagement."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Entschuldigung, können Sie mir helfen?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich verstehe das nicht.",
        "context": "Frage stellen"
      },
      {
        "de": "Können Sie das bitte wiederholen?",
        "context": "Antwort geben"
      },
      {
        "de": "Wie sagt man das auf Deutsch?",
        "context": "Problem lösen"
      },
      {
        "de": "Bitte sprechen Sie langsamer.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Das habe ich nicht verstanden.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Vielen Dank für Ihre Hilfe.",
        "context": "Frage stellen"
      },
      {
        "de": "Wo finde ich Informationen dazu?",
        "context": "Antwort geben"
      },
      {
        "de": "Ich habe eine Frage.",
        "context": "Problem lösen"
      },
      {
        "de": "Können Sie mir das erklären?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich bin neu hier.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Das ist sehr wichtig für mich.",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Alternative?",
        "context": "Antwort geben"
      },
      {
        "de": "Wann kann ich wiederkommen?",
        "context": "Problem lösen"
      },
      {
        "de": "Ist das kostenlos?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich würde gerne einen Termin vereinbaren.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Könnten Sie mir bitte weiterhelfen?",
        "context": "Frage stellen"
      },
      {
        "de": "Das muss ich mir noch überlegen.",
        "context": "Antwort geben"
      },
      {
        "de": "Ich bin damit nicht einverstanden.",
        "context": "Problem lösen"
      },
      {
        "de": "Können wir einen Kompromiss finden?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Das erscheint mir zu teuer.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich hätte gerne eine schriftliche Bestätigung.",
        "context": "Frage stellen"
      },
      {
        "de": "Wann ist der nächste freie Termin?",
        "context": "Antwort geben"
      },
      {
        "de": "Gibt es da Ausnahmen?",
        "context": "Problem lösen"
      },
      {
        "de": "Das war ein Missverständnis.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich möchte mich beschweren.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Können Sie das schriftlich bestätigen?",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es einen Ansprechpartner dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Ich brauche noch etwas Zeit.",
        "context": "Problem lösen"
      },
      {
        "de": "Das ist mir leider nicht möglich.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Welche Unterlagen brauche ich?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich komme aus dem Ausland.",
        "context": "Frage stellen"
      },
      {
        "de": "Mein Deutsch ist noch nicht so gut.",
        "context": "Antwort geben"
      },
      {
        "de": "Können Sie mir das auf Papier geben?",
        "context": "Problem lösen"
      },
      {
        "de": "Wo muss ich unterschreiben?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ist das Formular richtig ausgefüllt?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich habe alles dabei.",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Frist dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Was passiert als nächstes?",
        "context": "Problem lösen"
      },
      {
        "de": "Ich warte auf eine Antwort.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Können Sie mich zurückrufen?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich habe eine Beschwerde.",
        "context": "Frage stellen"
      },
      {
        "de": "Das muss dringend erledigt werden.",
        "context": "Antwort geben"
      },
      {
        "de": "Ich bin seit einem Jahr in Deutschland.",
        "context": "Problem lösen"
      },
      {
        "de": "Meine Adresse hat sich geändert.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich brauche eine Bescheinigung.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Bis wann muss ich das erledigen?",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Beratung dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Wo kann ich mich informieren?",
        "context": "Problem lösen"
      },
      {
        "de": "Ich möchte einen Antrag stellen.",
        "context": "Hilfe bitten"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Nichts sagen.",
        "correct": "Höflich und klar antworten.",
        "tip": "Bei Beim Facharzt ist klare Kommunikation wichtig."
      },
      {
        "wrong": "sagen",
        "correct": "helfen",
        "tip": "Höflich um Hilfe bitten ist immer richtig."
      },
      {
        "wrong": "Okay.",
        "correct": "Vielen Dank, das hilft mir sehr.",
        "tip": "Sich bedanken zeigt Wertschätzung."
      }
    ]
  },
  {
    "id": "a2-05",
    "level": "A2",
    "title": "Strom anmelden",
    "titleDe": "Strom und Gas anmelden",
    "icon": "⚡",
    "premium": false,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Strom und Gas anmelden.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Nichts sagen.",
              "Einfach weggehen."
            ],
            "answer": 0,
            "explanation": "Bei Strom und Gas anmelden ist klare Kommunikation wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du brauchst Hilfe beim Thema Strom und Gas anmelden.",
            "question": "Könnten Sie mir bitte ___?",
            "options": [
              "helfen",
              "sagen",
              "zeigen"
            ],
            "answer": "helfen",
            "explanation": "Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst eine Frage zum Thema Strom und Gas anmelden.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sie",
              "Könnten",
              "bitte",
              "mir",
              "helfen"
            ],
            "answer": [
              1,
              0,
              3,
              2,
              4
            ],
            "explanation": "Richtig: Könnten Sie mir bitte helfen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand erklärt dir etwas zum Thema Strom und Gas anmelden.",
            "question": "Was sagst du?",
            "options": [
              "Vielen Dank, das hilft mir sehr.",
              "Okay.",
              "Können Sie das wiederholen?"
            ],
            "answer": 0,
            "explanation": "Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du erhältst ein Paket.",
            "question": "Was machst du?",
            "options": [
              "Ich unterschreibe und bedanke mich.",
              "Ich nehme es ohne Worte.",
              "Ich öffne es vor dem Postboten."
            ],
            "answer": 0,
            "explanation": "Beim Paketempfang unterschreibt man die Zustellung."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Strom und Gas anmelden.",
            "question": "Bei Strom und ___ anmelden ist klare Kommunikation wichtig.",
            "options": [
              "Gas",
              "gestern",
              "darf"
            ],
            "answer": "Gas",
            "explanation": "Bei Strom und Gas anmelden ist klare Kommunikation wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du brauchst Hilfe beim Thema Strom und Gas anmelden.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "bitten",
              "ist",
              "um",
              "Hilfe",
              "Höflich",
              "richtig",
              "immer"
            ],
            "answer": [
              4,
              2,
              3,
              0,
              1,
              6,
              5
            ],
            "explanation": "Richtig: Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst eine Frage zum Thema Strom und Gas anmelden.",
            "question": "Könnten Sie mir ___ helfen?",
            "options": [
              "bitte",
              "gestern",
              "morgen"
            ],
            "answer": "bitte",
            "explanation": "Könnten Sie mir bitte helfen?"
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand erklärt dir etwas zum Thema Strom und Gas anmelden.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sich",
              "Wertschätzung",
              "bedanken",
              "zeigt"
            ],
            "answer": [
              0,
              2,
              3,
              1
            ],
            "explanation": "Richtig: Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "fill_blank",
            "situation": "Du erhältst ein Paket.",
            "question": "Beim Paketempfang ___ man die Zustellung.",
            "options": [
              "unterschreibt",
              "nehme",
              "möchte"
            ],
            "answer": "unterschreibt",
            "explanation": "Beim Paketempfang unterschreibt man die Zustellung."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Strom und Gas anmelden.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Ich weiß es nicht.",
              "Vielleicht später."
            ],
            "answer": 0,
            "explanation": "Bei Strom und Gas anmelden ist klare Kommunikation wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du brauchst Hilfe beim Thema Strom und Gas anmelden.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "helfen",
              "Ich weiß es nicht.",
              "Geht mich nichts an."
            ],
            "answer": 0,
            "explanation": "Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst eine Frage zum Thema Strom und Gas anmelden.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Könnten Sie mir bitte helfen",
              "Das kann ich nicht.",
              "Fragen Sie jemand anderen."
            ],
            "answer": 0,
            "explanation": "Richtig: Könnten Sie mir bitte helfen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand erklärt dir etwas zum Thema Strom und Gas anmelden.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Vielen Dank, das hilft mir sehr.",
              "Das kann ich nicht.",
              "Muss das sein?"
            ],
            "answer": 0,
            "explanation": "Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du erhältst ein Paket.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich unterschreibe und bedanke mich.",
              "Das kann ich nicht.",
              "Vielleicht später."
            ],
            "answer": 0,
            "explanation": "Beim Paketempfang unterschreibt man die Zustellung."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Entschuldigung, können Sie mir helfen?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich verstehe das nicht.",
        "context": "Frage stellen"
      },
      {
        "de": "Können Sie das bitte wiederholen?",
        "context": "Antwort geben"
      },
      {
        "de": "Wie sagt man das auf Deutsch?",
        "context": "Problem lösen"
      },
      {
        "de": "Bitte sprechen Sie langsamer.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Das habe ich nicht verstanden.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Vielen Dank für Ihre Hilfe.",
        "context": "Frage stellen"
      },
      {
        "de": "Wo finde ich Informationen dazu?",
        "context": "Antwort geben"
      },
      {
        "de": "Ich habe eine Frage.",
        "context": "Problem lösen"
      },
      {
        "de": "Können Sie mir das erklären?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich bin neu hier.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Das ist sehr wichtig für mich.",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Alternative?",
        "context": "Antwort geben"
      },
      {
        "de": "Wann kann ich wiederkommen?",
        "context": "Problem lösen"
      },
      {
        "de": "Ist das kostenlos?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich würde gerne einen Termin vereinbaren.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Könnten Sie mir bitte weiterhelfen?",
        "context": "Frage stellen"
      },
      {
        "de": "Das muss ich mir noch überlegen.",
        "context": "Antwort geben"
      },
      {
        "de": "Ich bin damit nicht einverstanden.",
        "context": "Problem lösen"
      },
      {
        "de": "Können wir einen Kompromiss finden?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Das erscheint mir zu teuer.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich hätte gerne eine schriftliche Bestätigung.",
        "context": "Frage stellen"
      },
      {
        "de": "Wann ist der nächste freie Termin?",
        "context": "Antwort geben"
      },
      {
        "de": "Gibt es da Ausnahmen?",
        "context": "Problem lösen"
      },
      {
        "de": "Das war ein Missverständnis.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich möchte mich beschweren.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Können Sie das schriftlich bestätigen?",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es einen Ansprechpartner dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Ich brauche noch etwas Zeit.",
        "context": "Problem lösen"
      },
      {
        "de": "Das ist mir leider nicht möglich.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Welche Unterlagen brauche ich?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich komme aus dem Ausland.",
        "context": "Frage stellen"
      },
      {
        "de": "Mein Deutsch ist noch nicht so gut.",
        "context": "Antwort geben"
      },
      {
        "de": "Können Sie mir das auf Papier geben?",
        "context": "Problem lösen"
      },
      {
        "de": "Wo muss ich unterschreiben?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ist das Formular richtig ausgefüllt?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich habe alles dabei.",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Frist dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Was passiert als nächstes?",
        "context": "Problem lösen"
      },
      {
        "de": "Ich warte auf eine Antwort.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Können Sie mich zurückrufen?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich habe eine Beschwerde.",
        "context": "Frage stellen"
      },
      {
        "de": "Das muss dringend erledigt werden.",
        "context": "Antwort geben"
      },
      {
        "de": "Ich bin seit einem Jahr in Deutschland.",
        "context": "Problem lösen"
      },
      {
        "de": "Meine Adresse hat sich geändert.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich brauche eine Bescheinigung.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Bis wann muss ich das erledigen?",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Beratung dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Wo kann ich mich informieren?",
        "context": "Problem lösen"
      },
      {
        "de": "Ich möchte einen Antrag stellen.",
        "context": "Hilfe bitten"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Nichts sagen.",
        "correct": "Höflich und klar antworten.",
        "tip": "Bei Strom und Gas anmelden ist klare Kommunikation wichtig."
      },
      {
        "wrong": "sagen",
        "correct": "helfen",
        "tip": "Höflich um Hilfe bitten ist immer richtig."
      },
      {
        "wrong": "Okay.",
        "correct": "Vielen Dank, das hilft mir sehr.",
        "tip": "Sich bedanken zeigt Wertschätzung."
      }
    ]
  },
  {
    "id": "a2-06",
    "level": "A2",
    "title": "Bewerbung",
    "titleDe": "Eine Bewerbung schreiben",
    "icon": "✉️",
    "premium": false,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Eine Bewerbung schreiben.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Nichts sagen.",
              "Einfach weggehen."
            ],
            "answer": 0,
            "explanation": "Bei Eine Bewerbung schreiben ist klare Kommunikation wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du brauchst Hilfe beim Thema Eine Bewerbung schreiben.",
            "question": "Könnten Sie mir bitte ___?",
            "options": [
              "helfen",
              "sagen",
              "zeigen"
            ],
            "answer": "helfen",
            "explanation": "Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst eine Frage zum Thema Eine Bewerbung schreiben.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sie",
              "Könnten",
              "bitte",
              "mir",
              "helfen"
            ],
            "answer": [
              1,
              0,
              3,
              2,
              4
            ],
            "explanation": "Richtig: Könnten Sie mir bitte helfen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand erklärt dir etwas zum Thema Eine Bewerbung schreiben.",
            "question": "Was sagst du?",
            "options": [
              "Vielen Dank, das hilft mir sehr.",
              "Okay.",
              "Können Sie das wiederholen?"
            ],
            "answer": 0,
            "explanation": "Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "quick_reaction",
            "situation": "Dein Nachbar beschwert sich über Lärm.",
            "question": "Wie reagierst du?",
            "options": [
              "Es tut mir leid, ich werde leiser sein.",
              "Das ist mir egal.",
              "Rufen Sie die Polizei."
            ],
            "answer": 0,
            "explanation": "Sich entschuldigen löst Konflikte schneller."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Eine Bewerbung schreiben.",
            "question": "Bei Eine Bewerbung schreiben ist klare Kommunikation ___.",
            "options": [
              "wichtig",
              "schlecht",
              "falsch"
            ],
            "answer": "wichtig",
            "explanation": "Bei Eine Bewerbung schreiben ist klare Kommunikation wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du brauchst Hilfe beim Thema Eine Bewerbung schreiben.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "richtig",
              "ist",
              "Hilfe",
              "bitten",
              "immer",
              "um",
              "Höflich"
            ],
            "answer": [
              6,
              5,
              2,
              3,
              1,
              4,
              0
            ],
            "explanation": "Richtig: Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst eine Frage zum Thema Eine Bewerbung schreiben.",
            "question": "Könnten ___ mir bitte helfen?",
            "options": [
              "Sie",
              "Arbeit",
              "habe"
            ],
            "answer": "Sie",
            "explanation": "Könnten Sie mir bitte helfen?"
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand erklärt dir etwas zum Thema Eine Bewerbung schreiben.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "bedanken",
              "Sich",
              "Wertschätzung",
              "zeigt"
            ],
            "answer": [
              1,
              0,
              3,
              2
            ],
            "explanation": "Richtig: Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "fill_blank",
            "situation": "Dein Nachbar beschwert sich über Lärm.",
            "question": "Sich entschuldigen löst Konflikte ___.",
            "options": [
              "schneller",
              "Zeit",
              "dort"
            ],
            "answer": "schneller",
            "explanation": "Sich entschuldigen löst Konflikte schneller."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Eine Bewerbung schreiben.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Geht mich nichts an.",
              "Kein Interesse."
            ],
            "answer": 0,
            "explanation": "Bei Eine Bewerbung schreiben ist klare Kommunikation wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du brauchst Hilfe beim Thema Eine Bewerbung schreiben.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "helfen",
              "Das kann ich nicht.",
              "Das verstehe ich nicht."
            ],
            "answer": 0,
            "explanation": "Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst eine Frage zum Thema Eine Bewerbung schreiben.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Könnten Sie mir bitte helfen",
              "Keine Lust.",
              "Kein Interesse."
            ],
            "answer": 0,
            "explanation": "Richtig: Könnten Sie mir bitte helfen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand erklärt dir etwas zum Thema Eine Bewerbung schreiben.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Vielen Dank, das hilft mir sehr.",
              "Vielleicht später.",
              "Ich habe keine Ahnung."
            ],
            "answer": 0,
            "explanation": "Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "quick_reaction",
            "situation": "Dein Nachbar beschwert sich über Lärm.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Es tut mir leid, ich werde leiser sein.",
              "Kein Interesse.",
              "Mir egal."
            ],
            "answer": 0,
            "explanation": "Sich entschuldigen löst Konflikte schneller."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Entschuldigung, können Sie mir helfen?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich verstehe das nicht.",
        "context": "Frage stellen"
      },
      {
        "de": "Können Sie das bitte wiederholen?",
        "context": "Antwort geben"
      },
      {
        "de": "Wie sagt man das auf Deutsch?",
        "context": "Problem lösen"
      },
      {
        "de": "Bitte sprechen Sie langsamer.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Das habe ich nicht verstanden.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Vielen Dank für Ihre Hilfe.",
        "context": "Frage stellen"
      },
      {
        "de": "Wo finde ich Informationen dazu?",
        "context": "Antwort geben"
      },
      {
        "de": "Ich habe eine Frage.",
        "context": "Problem lösen"
      },
      {
        "de": "Können Sie mir das erklären?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich bin neu hier.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Das ist sehr wichtig für mich.",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Alternative?",
        "context": "Antwort geben"
      },
      {
        "de": "Wann kann ich wiederkommen?",
        "context": "Problem lösen"
      },
      {
        "de": "Ist das kostenlos?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich würde gerne einen Termin vereinbaren.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Könnten Sie mir bitte weiterhelfen?",
        "context": "Frage stellen"
      },
      {
        "de": "Das muss ich mir noch überlegen.",
        "context": "Antwort geben"
      },
      {
        "de": "Ich bin damit nicht einverstanden.",
        "context": "Problem lösen"
      },
      {
        "de": "Können wir einen Kompromiss finden?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Das erscheint mir zu teuer.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich hätte gerne eine schriftliche Bestätigung.",
        "context": "Frage stellen"
      },
      {
        "de": "Wann ist der nächste freie Termin?",
        "context": "Antwort geben"
      },
      {
        "de": "Gibt es da Ausnahmen?",
        "context": "Problem lösen"
      },
      {
        "de": "Das war ein Missverständnis.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich möchte mich beschweren.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Können Sie das schriftlich bestätigen?",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es einen Ansprechpartner dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Ich brauche noch etwas Zeit.",
        "context": "Problem lösen"
      },
      {
        "de": "Das ist mir leider nicht möglich.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Welche Unterlagen brauche ich?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich komme aus dem Ausland.",
        "context": "Frage stellen"
      },
      {
        "de": "Mein Deutsch ist noch nicht so gut.",
        "context": "Antwort geben"
      },
      {
        "de": "Können Sie mir das auf Papier geben?",
        "context": "Problem lösen"
      },
      {
        "de": "Wo muss ich unterschreiben?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ist das Formular richtig ausgefüllt?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich habe alles dabei.",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Frist dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Was passiert als nächstes?",
        "context": "Problem lösen"
      },
      {
        "de": "Ich warte auf eine Antwort.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Können Sie mich zurückrufen?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich habe eine Beschwerde.",
        "context": "Frage stellen"
      },
      {
        "de": "Das muss dringend erledigt werden.",
        "context": "Antwort geben"
      },
      {
        "de": "Ich bin seit einem Jahr in Deutschland.",
        "context": "Problem lösen"
      },
      {
        "de": "Meine Adresse hat sich geändert.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich brauche eine Bescheinigung.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Bis wann muss ich das erledigen?",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Beratung dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Wo kann ich mich informieren?",
        "context": "Problem lösen"
      },
      {
        "de": "Ich möchte einen Antrag stellen.",
        "context": "Hilfe bitten"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Nichts sagen.",
        "correct": "Höflich und klar antworten.",
        "tip": "Bei Eine Bewerbung schreiben ist klare Kommunikation wichtig."
      },
      {
        "wrong": "sagen",
        "correct": "helfen",
        "tip": "Höflich um Hilfe bitten ist immer richtig."
      },
      {
        "wrong": "Okay.",
        "correct": "Vielen Dank, das hilft mir sehr.",
        "tip": "Sich bedanken zeigt Wertschätzung."
      }
    ]
  },
  {
    "id": "a2-07",
    "level": "A2",
    "title": "Umzug",
    "titleDe": "Umzug planen",
    "icon": "📦",
    "premium": false,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Umzug planen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Nichts sagen.",
              "Einfach weggehen."
            ],
            "answer": 0,
            "explanation": "Bei Umzug planen ist klare Kommunikation wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du brauchst Hilfe beim Thema Umzug planen.",
            "question": "Könnten Sie mir bitte ___?",
            "options": [
              "helfen",
              "sagen",
              "zeigen"
            ],
            "answer": "helfen",
            "explanation": "Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst eine Frage zum Thema Umzug planen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sie",
              "Könnten",
              "bitte",
              "mir",
              "helfen"
            ],
            "answer": [
              1,
              0,
              3,
              2,
              4
            ],
            "explanation": "Richtig: Könnten Sie mir bitte helfen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand erklärt dir etwas zum Thema Umzug planen.",
            "question": "Was sagst du?",
            "options": [
              "Vielen Dank, das hilft mir sehr.",
              "Okay.",
              "Können Sie das wiederholen?"
            ],
            "answer": 0,
            "explanation": "Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bekommst eine Rechnung per Post.",
            "question": "Was machst du?",
            "options": [
              "Ich überweise den Betrag bis zum Fälligkeitsdatum.",
              "Ich werfe sie weg.",
              "Ich rufe die Polizei."
            ],
            "answer": 0,
            "explanation": "Rechnungen pünktlich bezahlen ist wichtig."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Umzug planen.",
            "question": "Bei Umzug planen ist ___ Kommunikation wichtig.",
            "options": [
              "klare",
              "bin",
              "morgen"
            ],
            "answer": "klare",
            "explanation": "Bei Umzug planen ist klare Kommunikation wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du brauchst Hilfe beim Thema Umzug planen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "bitten",
              "Höflich",
              "immer",
              "um",
              "richtig",
              "Hilfe",
              "ist"
            ],
            "answer": [
              1,
              3,
              5,
              0,
              6,
              2,
              4
            ],
            "explanation": "Richtig: Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst eine Frage zum Thema Umzug planen.",
            "question": "Könnten Sie mir bitte ___?",
            "options": [
              "helfen",
              "bitte",
              "Antwort"
            ],
            "answer": "helfen",
            "explanation": "Könnten Sie mir bitte helfen?"
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand erklärt dir etwas zum Thema Umzug planen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "bedanken",
              "zeigt",
              "Sich",
              "Wertschätzung"
            ],
            "answer": [
              2,
              0,
              1,
              3
            ],
            "explanation": "Richtig: Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "fill_blank",
            "situation": "Du bekommst eine Rechnung per Post.",
            "question": "Rechnungen ___ bezahlen ist wichtig.",
            "options": [
              "pünktlich",
              "werde",
              "Antwort"
            ],
            "answer": "pünktlich",
            "explanation": "Rechnungen pünktlich bezahlen ist wichtig."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Umzug planen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Muss das sein?",
              "Ich habe keine Ahnung."
            ],
            "answer": 0,
            "explanation": "Bei Umzug planen ist klare Kommunikation wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du brauchst Hilfe beim Thema Umzug planen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "helfen",
              "Ich habe keine Ahnung.",
              "Mir egal."
            ],
            "answer": 0,
            "explanation": "Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst eine Frage zum Thema Umzug planen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Könnten Sie mir bitte helfen",
              "Ich weiß es nicht.",
              "Fragen Sie jemand anderen."
            ],
            "answer": 0,
            "explanation": "Richtig: Könnten Sie mir bitte helfen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand erklärt dir etwas zum Thema Umzug planen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Vielen Dank, das hilft mir sehr.",
              "Keine Lust.",
              "Muss das sein?"
            ],
            "answer": 0,
            "explanation": "Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bekommst eine Rechnung per Post.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich überweise den Betrag bis zum Fälligkeitsdatum.",
              "Vielleicht später.",
              "Kein Interesse."
            ],
            "answer": 0,
            "explanation": "Rechnungen pünktlich bezahlen ist wichtig."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Entschuldigung, können Sie mir helfen?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich verstehe das nicht.",
        "context": "Frage stellen"
      },
      {
        "de": "Können Sie das bitte wiederholen?",
        "context": "Antwort geben"
      },
      {
        "de": "Wie sagt man das auf Deutsch?",
        "context": "Problem lösen"
      },
      {
        "de": "Bitte sprechen Sie langsamer.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Das habe ich nicht verstanden.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Vielen Dank für Ihre Hilfe.",
        "context": "Frage stellen"
      },
      {
        "de": "Wo finde ich Informationen dazu?",
        "context": "Antwort geben"
      },
      {
        "de": "Ich habe eine Frage.",
        "context": "Problem lösen"
      },
      {
        "de": "Können Sie mir das erklären?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich bin neu hier.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Das ist sehr wichtig für mich.",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Alternative?",
        "context": "Antwort geben"
      },
      {
        "de": "Wann kann ich wiederkommen?",
        "context": "Problem lösen"
      },
      {
        "de": "Ist das kostenlos?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich würde gerne einen Termin vereinbaren.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Könnten Sie mir bitte weiterhelfen?",
        "context": "Frage stellen"
      },
      {
        "de": "Das muss ich mir noch überlegen.",
        "context": "Antwort geben"
      },
      {
        "de": "Ich bin damit nicht einverstanden.",
        "context": "Problem lösen"
      },
      {
        "de": "Können wir einen Kompromiss finden?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Das erscheint mir zu teuer.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich hätte gerne eine schriftliche Bestätigung.",
        "context": "Frage stellen"
      },
      {
        "de": "Wann ist der nächste freie Termin?",
        "context": "Antwort geben"
      },
      {
        "de": "Gibt es da Ausnahmen?",
        "context": "Problem lösen"
      },
      {
        "de": "Das war ein Missverständnis.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich möchte mich beschweren.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Können Sie das schriftlich bestätigen?",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es einen Ansprechpartner dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Ich brauche noch etwas Zeit.",
        "context": "Problem lösen"
      },
      {
        "de": "Das ist mir leider nicht möglich.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Welche Unterlagen brauche ich?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich komme aus dem Ausland.",
        "context": "Frage stellen"
      },
      {
        "de": "Mein Deutsch ist noch nicht so gut.",
        "context": "Antwort geben"
      },
      {
        "de": "Können Sie mir das auf Papier geben?",
        "context": "Problem lösen"
      },
      {
        "de": "Wo muss ich unterschreiben?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ist das Formular richtig ausgefüllt?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich habe alles dabei.",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Frist dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Was passiert als nächstes?",
        "context": "Problem lösen"
      },
      {
        "de": "Ich warte auf eine Antwort.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Können Sie mich zurückrufen?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich habe eine Beschwerde.",
        "context": "Frage stellen"
      },
      {
        "de": "Das muss dringend erledigt werden.",
        "context": "Antwort geben"
      },
      {
        "de": "Ich bin seit einem Jahr in Deutschland.",
        "context": "Problem lösen"
      },
      {
        "de": "Meine Adresse hat sich geändert.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich brauche eine Bescheinigung.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Bis wann muss ich das erledigen?",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Beratung dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Wo kann ich mich informieren?",
        "context": "Problem lösen"
      },
      {
        "de": "Ich möchte einen Antrag stellen.",
        "context": "Hilfe bitten"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Nichts sagen.",
        "correct": "Höflich und klar antworten.",
        "tip": "Bei Umzug planen ist klare Kommunikation wichtig."
      },
      {
        "wrong": "sagen",
        "correct": "helfen",
        "tip": "Höflich um Hilfe bitten ist immer richtig."
      },
      {
        "wrong": "Okay.",
        "correct": "Vielen Dank, das hilft mir sehr.",
        "tip": "Sich bedanken zeigt Wertschätzung."
      }
    ]
  },
  {
    "id": "a2-08",
    "level": "A2",
    "title": "Elternsprechtag",
    "titleDe": "Beim Elternsprechtag",
    "icon": "👨‍👩‍👦",
    "premium": false,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Beim Elternsprechtag.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Nichts sagen.",
              "Einfach weggehen."
            ],
            "answer": 0,
            "explanation": "Bei Beim Elternsprechtag ist klare Kommunikation wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du brauchst Hilfe beim Thema Beim Elternsprechtag.",
            "question": "Könnten Sie mir bitte ___?",
            "options": [
              "helfen",
              "sagen",
              "zeigen"
            ],
            "answer": "helfen",
            "explanation": "Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst eine Frage zum Thema Beim Elternsprechtag.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sie",
              "Könnten",
              "bitte",
              "mir",
              "helfen"
            ],
            "answer": [
              1,
              0,
              3,
              2,
              4
            ],
            "explanation": "Richtig: Könnten Sie mir bitte helfen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand erklärt dir etwas zum Thema Beim Elternsprechtag.",
            "question": "Was sagst du?",
            "options": [
              "Vielen Dank, das hilft mir sehr.",
              "Okay.",
              "Können Sie das wiederholen?"
            ],
            "answer": 0,
            "explanation": "Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du willst einen Termin absagen.",
            "question": "Was sagst du?",
            "options": [
              "Ich muss den Termin leider absagen.",
              "Ich komme nicht.",
              "Vergessen Sie es."
            ],
            "answer": 0,
            "explanation": "Höfliches Absagen ist im Deutschen wichtig."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Beim Elternsprechtag.",
            "question": "Bei Beim Elternsprechtag ist klare Kommunikation ___.",
            "options": [
              "wichtig",
              "schnell",
              "nötig"
            ],
            "answer": "wichtig",
            "explanation": "Bei Beim Elternsprechtag ist klare Kommunikation wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du brauchst Hilfe beim Thema Beim Elternsprechtag.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "ist",
              "Höflich",
              "Hilfe",
              "bitten",
              "um",
              "richtig",
              "immer"
            ],
            "answer": [
              1,
              4,
              2,
              3,
              0,
              6,
              5
            ],
            "explanation": "Richtig: Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst eine Frage zum Thema Beim Elternsprechtag.",
            "question": "Könnten Sie mir bitte ___?",
            "options": [
              "helfen",
              "morgen",
              "Adresse"
            ],
            "answer": "helfen",
            "explanation": "Könnten Sie mir bitte helfen?"
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand erklärt dir etwas zum Thema Beim Elternsprechtag.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Wertschätzung",
              "bedanken",
              "Sich",
              "zeigt"
            ],
            "answer": [
              2,
              1,
              3,
              0
            ],
            "explanation": "Richtig: Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "fill_blank",
            "situation": "Du willst einen Termin absagen.",
            "question": "Höfliches Absagen ___ im Deutschen wichtig.",
            "options": [
              "ist",
              "Name",
              "brauche"
            ],
            "answer": "ist",
            "explanation": "Höfliches Absagen ist im Deutschen wichtig."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Beim Elternsprechtag.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Vielleicht später.",
              "Ich habe keine Ahnung."
            ],
            "answer": 0,
            "explanation": "Bei Beim Elternsprechtag ist klare Kommunikation wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du brauchst Hilfe beim Thema Beim Elternsprechtag.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "helfen",
              "Kein Interesse.",
              "Vielleicht später."
            ],
            "answer": 0,
            "explanation": "Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst eine Frage zum Thema Beim Elternsprechtag.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Könnten Sie mir bitte helfen",
              "Ich weiß es nicht.",
              "Kein Interesse."
            ],
            "answer": 0,
            "explanation": "Richtig: Könnten Sie mir bitte helfen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand erklärt dir etwas zum Thema Beim Elternsprechtag.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Vielen Dank, das hilft mir sehr.",
              "Vielleicht später.",
              "Das ist nicht mein Problem."
            ],
            "answer": 0,
            "explanation": "Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du willst einen Termin absagen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich muss den Termin leider absagen.",
              "Keine Lust.",
              "Das kann ich nicht."
            ],
            "answer": 0,
            "explanation": "Höfliches Absagen ist im Deutschen wichtig."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Entschuldigung, können Sie mir helfen?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich verstehe das nicht.",
        "context": "Frage stellen"
      },
      {
        "de": "Können Sie das bitte wiederholen?",
        "context": "Antwort geben"
      },
      {
        "de": "Wie sagt man das auf Deutsch?",
        "context": "Problem lösen"
      },
      {
        "de": "Bitte sprechen Sie langsamer.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Das habe ich nicht verstanden.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Vielen Dank für Ihre Hilfe.",
        "context": "Frage stellen"
      },
      {
        "de": "Wo finde ich Informationen dazu?",
        "context": "Antwort geben"
      },
      {
        "de": "Ich habe eine Frage.",
        "context": "Problem lösen"
      },
      {
        "de": "Können Sie mir das erklären?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich bin neu hier.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Das ist sehr wichtig für mich.",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Alternative?",
        "context": "Antwort geben"
      },
      {
        "de": "Wann kann ich wiederkommen?",
        "context": "Problem lösen"
      },
      {
        "de": "Ist das kostenlos?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich würde gerne einen Termin vereinbaren.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Könnten Sie mir bitte weiterhelfen?",
        "context": "Frage stellen"
      },
      {
        "de": "Das muss ich mir noch überlegen.",
        "context": "Antwort geben"
      },
      {
        "de": "Ich bin damit nicht einverstanden.",
        "context": "Problem lösen"
      },
      {
        "de": "Können wir einen Kompromiss finden?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Das erscheint mir zu teuer.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich hätte gerne eine schriftliche Bestätigung.",
        "context": "Frage stellen"
      },
      {
        "de": "Wann ist der nächste freie Termin?",
        "context": "Antwort geben"
      },
      {
        "de": "Gibt es da Ausnahmen?",
        "context": "Problem lösen"
      },
      {
        "de": "Das war ein Missverständnis.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich möchte mich beschweren.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Können Sie das schriftlich bestätigen?",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es einen Ansprechpartner dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Ich brauche noch etwas Zeit.",
        "context": "Problem lösen"
      },
      {
        "de": "Das ist mir leider nicht möglich.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Welche Unterlagen brauche ich?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich komme aus dem Ausland.",
        "context": "Frage stellen"
      },
      {
        "de": "Mein Deutsch ist noch nicht so gut.",
        "context": "Antwort geben"
      },
      {
        "de": "Können Sie mir das auf Papier geben?",
        "context": "Problem lösen"
      },
      {
        "de": "Wo muss ich unterschreiben?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ist das Formular richtig ausgefüllt?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich habe alles dabei.",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Frist dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Was passiert als nächstes?",
        "context": "Problem lösen"
      },
      {
        "de": "Ich warte auf eine Antwort.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Können Sie mich zurückrufen?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich habe eine Beschwerde.",
        "context": "Frage stellen"
      },
      {
        "de": "Das muss dringend erledigt werden.",
        "context": "Antwort geben"
      },
      {
        "de": "Ich bin seit einem Jahr in Deutschland.",
        "context": "Problem lösen"
      },
      {
        "de": "Meine Adresse hat sich geändert.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich brauche eine Bescheinigung.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Bis wann muss ich das erledigen?",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Beratung dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Wo kann ich mich informieren?",
        "context": "Problem lösen"
      },
      {
        "de": "Ich möchte einen Antrag stellen.",
        "context": "Hilfe bitten"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Nichts sagen.",
        "correct": "Höflich und klar antworten.",
        "tip": "Bei Beim Elternsprechtag ist klare Kommunikation wichtig."
      },
      {
        "wrong": "sagen",
        "correct": "helfen",
        "tip": "Höflich um Hilfe bitten ist immer richtig."
      },
      {
        "wrong": "Okay.",
        "correct": "Vielen Dank, das hilft mir sehr.",
        "tip": "Sich bedanken zeigt Wertschätzung."
      }
    ]
  },
  {
    "id": "a2-09",
    "level": "A2",
    "title": "Verein beitreten",
    "titleDe": "Einem Verein beitreten",
    "icon": "🏅",
    "premium": false,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Einem Verein beitreten.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Nichts sagen.",
              "Einfach weggehen."
            ],
            "answer": 0,
            "explanation": "Bei Einem Verein beitreten ist klare Kommunikation wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du brauchst Hilfe beim Thema Einem Verein beitreten.",
            "question": "Könnten Sie mir bitte ___?",
            "options": [
              "helfen",
              "sagen",
              "zeigen"
            ],
            "answer": "helfen",
            "explanation": "Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst eine Frage zum Thema Einem Verein beitreten.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sie",
              "Könnten",
              "bitte",
              "mir",
              "helfen"
            ],
            "answer": [
              1,
              0,
              3,
              2,
              4
            ],
            "explanation": "Richtig: Könnten Sie mir bitte helfen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand erklärt dir etwas zum Thema Einem Verein beitreten.",
            "question": "Was sagst du?",
            "options": [
              "Vielen Dank, das hilft mir sehr.",
              "Okay.",
              "Können Sie das wiederholen?"
            ],
            "answer": 0,
            "explanation": "Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "quick_reaction",
            "situation": "Ein Kollege fragt nach deiner Meinung.",
            "question": "Wie antwortest du?",
            "options": [
              "Ich finde, das ist eine gute Idee.",
              "Keine Ahnung.",
              "Mir egal."
            ],
            "answer": 0,
            "explanation": "Eine begründete Meinung zeigt Engagement."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Einem Verein beitreten.",
            "question": "Bei Einem ___ beitreten ist klare Kommunikation wichtig.",
            "options": [
              "Verein",
              "will",
              "gut"
            ],
            "answer": "Verein",
            "explanation": "Bei Einem Verein beitreten ist klare Kommunikation wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du brauchst Hilfe beim Thema Einem Verein beitreten.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Hilfe",
              "ist",
              "bitten",
              "richtig",
              "um",
              "immer",
              "Höflich"
            ],
            "answer": [
              6,
              4,
              0,
              2,
              1,
              5,
              3
            ],
            "explanation": "Richtig: Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst eine Frage zum Thema Einem Verein beitreten.",
            "question": "Könnten Sie ___ bitte helfen?",
            "options": [
              "mir",
              "möchte",
              "schnell"
            ],
            "answer": "mir",
            "explanation": "Könnten Sie mir bitte helfen?"
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand erklärt dir etwas zum Thema Einem Verein beitreten.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Wertschätzung",
              "zeigt",
              "Sich",
              "bedanken"
            ],
            "answer": [
              2,
              3,
              1,
              0
            ],
            "explanation": "Richtig: Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "fill_blank",
            "situation": "Ein Kollege fragt nach deiner Meinung.",
            "question": "Eine begründete ___ zeigt Engagement.",
            "options": [
              "Meinung",
              "frage",
              "Lösung"
            ],
            "answer": "Meinung",
            "explanation": "Eine begründete Meinung zeigt Engagement."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Einem Verein beitreten.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Fragen Sie jemand anderen.",
              "Das verstehe ich nicht."
            ],
            "answer": 0,
            "explanation": "Bei Einem Verein beitreten ist klare Kommunikation wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du brauchst Hilfe beim Thema Einem Verein beitreten.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "helfen",
              "Das ist nicht mein Problem.",
              "Das kann ich nicht."
            ],
            "answer": 0,
            "explanation": "Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst eine Frage zum Thema Einem Verein beitreten.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Könnten Sie mir bitte helfen",
              "Fragen Sie jemand anderen.",
              "Geht mich nichts an."
            ],
            "answer": 0,
            "explanation": "Richtig: Könnten Sie mir bitte helfen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand erklärt dir etwas zum Thema Einem Verein beitreten.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Vielen Dank, das hilft mir sehr.",
              "Ich weiß es nicht.",
              "Das kann ich nicht."
            ],
            "answer": 0,
            "explanation": "Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "quick_reaction",
            "situation": "Ein Kollege fragt nach deiner Meinung.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich finde, das ist eine gute Idee.",
              "Fragen Sie jemand anderen.",
              "Ich habe keine Ahnung."
            ],
            "answer": 0,
            "explanation": "Eine begründete Meinung zeigt Engagement."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Entschuldigung, können Sie mir helfen?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich verstehe das nicht.",
        "context": "Frage stellen"
      },
      {
        "de": "Können Sie das bitte wiederholen?",
        "context": "Antwort geben"
      },
      {
        "de": "Wie sagt man das auf Deutsch?",
        "context": "Problem lösen"
      },
      {
        "de": "Bitte sprechen Sie langsamer.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Das habe ich nicht verstanden.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Vielen Dank für Ihre Hilfe.",
        "context": "Frage stellen"
      },
      {
        "de": "Wo finde ich Informationen dazu?",
        "context": "Antwort geben"
      },
      {
        "de": "Ich habe eine Frage.",
        "context": "Problem lösen"
      },
      {
        "de": "Können Sie mir das erklären?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich bin neu hier.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Das ist sehr wichtig für mich.",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Alternative?",
        "context": "Antwort geben"
      },
      {
        "de": "Wann kann ich wiederkommen?",
        "context": "Problem lösen"
      },
      {
        "de": "Ist das kostenlos?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich würde gerne einen Termin vereinbaren.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Könnten Sie mir bitte weiterhelfen?",
        "context": "Frage stellen"
      },
      {
        "de": "Das muss ich mir noch überlegen.",
        "context": "Antwort geben"
      },
      {
        "de": "Ich bin damit nicht einverstanden.",
        "context": "Problem lösen"
      },
      {
        "de": "Können wir einen Kompromiss finden?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Das erscheint mir zu teuer.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich hätte gerne eine schriftliche Bestätigung.",
        "context": "Frage stellen"
      },
      {
        "de": "Wann ist der nächste freie Termin?",
        "context": "Antwort geben"
      },
      {
        "de": "Gibt es da Ausnahmen?",
        "context": "Problem lösen"
      },
      {
        "de": "Das war ein Missverständnis.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich möchte mich beschweren.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Können Sie das schriftlich bestätigen?",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es einen Ansprechpartner dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Ich brauche noch etwas Zeit.",
        "context": "Problem lösen"
      },
      {
        "de": "Das ist mir leider nicht möglich.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Welche Unterlagen brauche ich?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich komme aus dem Ausland.",
        "context": "Frage stellen"
      },
      {
        "de": "Mein Deutsch ist noch nicht so gut.",
        "context": "Antwort geben"
      },
      {
        "de": "Können Sie mir das auf Papier geben?",
        "context": "Problem lösen"
      },
      {
        "de": "Wo muss ich unterschreiben?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ist das Formular richtig ausgefüllt?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich habe alles dabei.",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Frist dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Was passiert als nächstes?",
        "context": "Problem lösen"
      },
      {
        "de": "Ich warte auf eine Antwort.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Können Sie mich zurückrufen?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich habe eine Beschwerde.",
        "context": "Frage stellen"
      },
      {
        "de": "Das muss dringend erledigt werden.",
        "context": "Antwort geben"
      },
      {
        "de": "Ich bin seit einem Jahr in Deutschland.",
        "context": "Problem lösen"
      },
      {
        "de": "Meine Adresse hat sich geändert.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich brauche eine Bescheinigung.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Bis wann muss ich das erledigen?",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Beratung dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Wo kann ich mich informieren?",
        "context": "Problem lösen"
      },
      {
        "de": "Ich möchte einen Antrag stellen.",
        "context": "Hilfe bitten"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Nichts sagen.",
        "correct": "Höflich und klar antworten.",
        "tip": "Bei Einem Verein beitreten ist klare Kommunikation wichtig."
      },
      {
        "wrong": "sagen",
        "correct": "helfen",
        "tip": "Höflich um Hilfe bitten ist immer richtig."
      },
      {
        "wrong": "Okay.",
        "correct": "Vielen Dank, das hilft mir sehr.",
        "tip": "Sich bedanken zeigt Wertschätzung."
      }
    ]
  },
  {
    "id": "a2-10",
    "level": "A2",
    "title": "Nachrichten",
    "titleDe": "Nachrichten verstehen",
    "icon": "📰",
    "premium": false,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Nachrichten verstehen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Nichts sagen.",
              "Einfach weggehen."
            ],
            "answer": 0,
            "explanation": "Bei Nachrichten verstehen ist klare Kommunikation wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du brauchst Hilfe beim Thema Nachrichten verstehen.",
            "question": "Könnten Sie mir bitte ___?",
            "options": [
              "helfen",
              "sagen",
              "zeigen"
            ],
            "answer": "helfen",
            "explanation": "Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst eine Frage zum Thema Nachrichten verstehen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sie",
              "Könnten",
              "bitte",
              "mir",
              "helfen"
            ],
            "answer": [
              1,
              0,
              3,
              2,
              4
            ],
            "explanation": "Richtig: Könnten Sie mir bitte helfen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand erklärt dir etwas zum Thema Nachrichten verstehen.",
            "question": "Was sagst du?",
            "options": [
              "Vielen Dank, das hilft mir sehr.",
              "Okay.",
              "Können Sie das wiederholen?"
            ],
            "answer": 0,
            "explanation": "Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du erhältst ein Paket.",
            "question": "Was machst du?",
            "options": [
              "Ich unterschreibe und bedanke mich.",
              "Ich nehme es ohne Worte.",
              "Ich öffne es vor dem Postboten."
            ],
            "answer": 0,
            "explanation": "Beim Paketempfang unterschreibt man die Zustellung."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Nachrichten verstehen.",
            "question": "Bei Nachrichten verstehen ist klare Kommunikation ___.",
            "options": [
              "wichtig",
              "gut",
              "schlecht"
            ],
            "answer": "wichtig",
            "explanation": "Bei Nachrichten verstehen ist klare Kommunikation wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du brauchst Hilfe beim Thema Nachrichten verstehen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "ist",
              "bitten",
              "richtig",
              "immer",
              "um",
              "Hilfe",
              "Höflich"
            ],
            "answer": [
              6,
              4,
              5,
              1,
              0,
              3,
              2
            ],
            "explanation": "Richtig: Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst eine Frage zum Thema Nachrichten verstehen.",
            "question": "Könnten Sie mir ___ helfen?",
            "options": [
              "bitte",
              "heute",
              "gestern"
            ],
            "answer": "bitte",
            "explanation": "Könnten Sie mir bitte helfen?"
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand erklärt dir etwas zum Thema Nachrichten verstehen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "bedanken",
              "Sich",
              "zeigt",
              "Wertschätzung"
            ],
            "answer": [
              1,
              0,
              2,
              3
            ],
            "explanation": "Richtig: Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "fill_blank",
            "situation": "Du erhältst ein Paket.",
            "question": "Beim ___ unterschreibt man die Zustellung.",
            "options": [
              "Paketempfang",
              "schlecht",
              "Name"
            ],
            "answer": "Paketempfang",
            "explanation": "Beim Paketempfang unterschreibt man die Zustellung."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Nachrichten verstehen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Vielleicht später.",
              "Ich weiß es nicht."
            ],
            "answer": 0,
            "explanation": "Bei Nachrichten verstehen ist klare Kommunikation wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du brauchst Hilfe beim Thema Nachrichten verstehen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "helfen",
              "Das verstehe ich nicht.",
              "Ich habe keine Ahnung."
            ],
            "answer": 0,
            "explanation": "Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst eine Frage zum Thema Nachrichten verstehen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Könnten Sie mir bitte helfen",
              "Muss das sein?",
              "Ich weiß es nicht."
            ],
            "answer": 0,
            "explanation": "Richtig: Könnten Sie mir bitte helfen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand erklärt dir etwas zum Thema Nachrichten verstehen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Vielen Dank, das hilft mir sehr.",
              "Mir egal.",
              "Das verstehe ich nicht."
            ],
            "answer": 0,
            "explanation": "Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du erhältst ein Paket.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich unterschreibe und bedanke mich.",
              "Das ist nicht mein Problem.",
              "Kein Interesse."
            ],
            "answer": 0,
            "explanation": "Beim Paketempfang unterschreibt man die Zustellung."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Entschuldigung, können Sie mir helfen?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich verstehe das nicht.",
        "context": "Frage stellen"
      },
      {
        "de": "Können Sie das bitte wiederholen?",
        "context": "Antwort geben"
      },
      {
        "de": "Wie sagt man das auf Deutsch?",
        "context": "Problem lösen"
      },
      {
        "de": "Bitte sprechen Sie langsamer.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Das habe ich nicht verstanden.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Vielen Dank für Ihre Hilfe.",
        "context": "Frage stellen"
      },
      {
        "de": "Wo finde ich Informationen dazu?",
        "context": "Antwort geben"
      },
      {
        "de": "Ich habe eine Frage.",
        "context": "Problem lösen"
      },
      {
        "de": "Können Sie mir das erklären?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich bin neu hier.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Das ist sehr wichtig für mich.",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Alternative?",
        "context": "Antwort geben"
      },
      {
        "de": "Wann kann ich wiederkommen?",
        "context": "Problem lösen"
      },
      {
        "de": "Ist das kostenlos?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich würde gerne einen Termin vereinbaren.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Könnten Sie mir bitte weiterhelfen?",
        "context": "Frage stellen"
      },
      {
        "de": "Das muss ich mir noch überlegen.",
        "context": "Antwort geben"
      },
      {
        "de": "Ich bin damit nicht einverstanden.",
        "context": "Problem lösen"
      },
      {
        "de": "Können wir einen Kompromiss finden?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Das erscheint mir zu teuer.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich hätte gerne eine schriftliche Bestätigung.",
        "context": "Frage stellen"
      },
      {
        "de": "Wann ist der nächste freie Termin?",
        "context": "Antwort geben"
      },
      {
        "de": "Gibt es da Ausnahmen?",
        "context": "Problem lösen"
      },
      {
        "de": "Das war ein Missverständnis.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich möchte mich beschweren.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Können Sie das schriftlich bestätigen?",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es einen Ansprechpartner dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Ich brauche noch etwas Zeit.",
        "context": "Problem lösen"
      },
      {
        "de": "Das ist mir leider nicht möglich.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Welche Unterlagen brauche ich?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich komme aus dem Ausland.",
        "context": "Frage stellen"
      },
      {
        "de": "Mein Deutsch ist noch nicht so gut.",
        "context": "Antwort geben"
      },
      {
        "de": "Können Sie mir das auf Papier geben?",
        "context": "Problem lösen"
      },
      {
        "de": "Wo muss ich unterschreiben?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ist das Formular richtig ausgefüllt?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich habe alles dabei.",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Frist dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Was passiert als nächstes?",
        "context": "Problem lösen"
      },
      {
        "de": "Ich warte auf eine Antwort.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Können Sie mich zurückrufen?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich habe eine Beschwerde.",
        "context": "Frage stellen"
      },
      {
        "de": "Das muss dringend erledigt werden.",
        "context": "Antwort geben"
      },
      {
        "de": "Ich bin seit einem Jahr in Deutschland.",
        "context": "Problem lösen"
      },
      {
        "de": "Meine Adresse hat sich geändert.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich brauche eine Bescheinigung.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Bis wann muss ich das erledigen?",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Beratung dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Wo kann ich mich informieren?",
        "context": "Problem lösen"
      },
      {
        "de": "Ich möchte einen Antrag stellen.",
        "context": "Hilfe bitten"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Nichts sagen.",
        "correct": "Höflich und klar antworten.",
        "tip": "Bei Nachrichten verstehen ist klare Kommunikation wichtig."
      },
      {
        "wrong": "sagen",
        "correct": "helfen",
        "tip": "Höflich um Hilfe bitten ist immer richtig."
      },
      {
        "wrong": "Okay.",
        "correct": "Vielen Dank, das hilft mir sehr.",
        "tip": "Sich bedanken zeigt Wertschätzung."
      }
    ]
  },
  {
    "id": "a2-11",
    "level": "A2",
    "title": "Vermieter",
    "titleDe": "Mit dem Vermieter sprechen",
    "icon": "🔑",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Mit dem Vermieter sprechen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Nichts sagen.",
              "Einfach weggehen."
            ],
            "answer": 0,
            "explanation": "Bei Mit dem Vermieter sprechen ist klare Kommunikation wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du brauchst Hilfe beim Thema Mit dem Vermieter sprechen.",
            "question": "Könnten Sie mir bitte ___?",
            "options": [
              "helfen",
              "sagen",
              "zeigen"
            ],
            "answer": "helfen",
            "explanation": "Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst eine Frage zum Thema Mit dem Vermieter sprechen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sie",
              "Könnten",
              "bitte",
              "mir",
              "helfen"
            ],
            "answer": [
              1,
              0,
              3,
              2,
              4
            ],
            "explanation": "Richtig: Könnten Sie mir bitte helfen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand erklärt dir etwas zum Thema Mit dem Vermieter sprechen.",
            "question": "Was sagst du?",
            "options": [
              "Vielen Dank, das hilft mir sehr.",
              "Okay.",
              "Können Sie das wiederholen?"
            ],
            "answer": 0,
            "explanation": "Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "quick_reaction",
            "situation": "Dein Nachbar beschwert sich über Lärm.",
            "question": "Wie reagierst du?",
            "options": [
              "Es tut mir leid, ich werde leiser sein.",
              "Das ist mir egal.",
              "Rufen Sie die Polizei."
            ],
            "answer": 0,
            "explanation": "Sich entschuldigen löst Konflikte schneller."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Mit dem Vermieter sprechen.",
            "question": "Bei Mit dem Vermieter sprechen ___ klare Kommunikation wichtig.",
            "options": [
              "ist",
              "gut",
              "jetzt"
            ],
            "answer": "ist",
            "explanation": "Bei Mit dem Vermieter sprechen ist klare Kommunikation wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du brauchst Hilfe beim Thema Mit dem Vermieter sprechen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Hilfe",
              "immer",
              "um",
              "ist",
              "bitten",
              "richtig",
              "Höflich"
            ],
            "answer": [
              6,
              2,
              0,
              4,
              3,
              1,
              5
            ],
            "explanation": "Richtig: Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst eine Frage zum Thema Mit dem Vermieter sprechen.",
            "question": "Könnten Sie mir bitte ___?",
            "options": [
              "helfen",
              "danke",
              "Name"
            ],
            "answer": "helfen",
            "explanation": "Könnten Sie mir bitte helfen?"
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand erklärt dir etwas zum Thema Mit dem Vermieter sprechen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "zeigt",
              "bedanken",
              "Wertschätzung",
              "Sich"
            ],
            "answer": [
              3,
              1,
              0,
              2
            ],
            "explanation": "Richtig: Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "fill_blank",
            "situation": "Dein Nachbar beschwert sich über Lärm.",
            "question": "Sich entschuldigen ___ Konflikte schneller.",
            "options": [
              "löst",
              "muss",
              "möchte"
            ],
            "answer": "löst",
            "explanation": "Sich entschuldigen löst Konflikte schneller."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Mit dem Vermieter sprechen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Das kann ich nicht.",
              "Das verstehe ich nicht."
            ],
            "answer": 0,
            "explanation": "Bei Mit dem Vermieter sprechen ist klare Kommunikation wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du brauchst Hilfe beim Thema Mit dem Vermieter sprechen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "helfen",
              "Kein Interesse.",
              "Das verstehe ich nicht."
            ],
            "answer": 0,
            "explanation": "Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst eine Frage zum Thema Mit dem Vermieter sprechen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Könnten Sie mir bitte helfen",
              "Ich weiß es nicht.",
              "Vielleicht später."
            ],
            "answer": 0,
            "explanation": "Richtig: Könnten Sie mir bitte helfen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand erklärt dir etwas zum Thema Mit dem Vermieter sprechen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Vielen Dank, das hilft mir sehr.",
              "Keine Lust.",
              "Das verstehe ich nicht."
            ],
            "answer": 0,
            "explanation": "Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "quick_reaction",
            "situation": "Dein Nachbar beschwert sich über Lärm.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Es tut mir leid, ich werde leiser sein.",
              "Ich weiß es nicht.",
              "Das kann ich nicht."
            ],
            "answer": 0,
            "explanation": "Sich entschuldigen löst Konflikte schneller."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Entschuldigung, können Sie mir helfen?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich verstehe das nicht.",
        "context": "Frage stellen"
      },
      {
        "de": "Können Sie das bitte wiederholen?",
        "context": "Antwort geben"
      },
      {
        "de": "Wie sagt man das auf Deutsch?",
        "context": "Problem lösen"
      },
      {
        "de": "Bitte sprechen Sie langsamer.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Das habe ich nicht verstanden.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Vielen Dank für Ihre Hilfe.",
        "context": "Frage stellen"
      },
      {
        "de": "Wo finde ich Informationen dazu?",
        "context": "Antwort geben"
      },
      {
        "de": "Ich habe eine Frage.",
        "context": "Problem lösen"
      },
      {
        "de": "Können Sie mir das erklären?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich bin neu hier.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Das ist sehr wichtig für mich.",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Alternative?",
        "context": "Antwort geben"
      },
      {
        "de": "Wann kann ich wiederkommen?",
        "context": "Problem lösen"
      },
      {
        "de": "Ist das kostenlos?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich würde gerne einen Termin vereinbaren.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Könnten Sie mir bitte weiterhelfen?",
        "context": "Frage stellen"
      },
      {
        "de": "Das muss ich mir noch überlegen.",
        "context": "Antwort geben"
      },
      {
        "de": "Ich bin damit nicht einverstanden.",
        "context": "Problem lösen"
      },
      {
        "de": "Können wir einen Kompromiss finden?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Das erscheint mir zu teuer.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich hätte gerne eine schriftliche Bestätigung.",
        "context": "Frage stellen"
      },
      {
        "de": "Wann ist der nächste freie Termin?",
        "context": "Antwort geben"
      },
      {
        "de": "Gibt es da Ausnahmen?",
        "context": "Problem lösen"
      },
      {
        "de": "Das war ein Missverständnis.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich möchte mich beschweren.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Können Sie das schriftlich bestätigen?",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es einen Ansprechpartner dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Ich brauche noch etwas Zeit.",
        "context": "Problem lösen"
      },
      {
        "de": "Das ist mir leider nicht möglich.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Welche Unterlagen brauche ich?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich komme aus dem Ausland.",
        "context": "Frage stellen"
      },
      {
        "de": "Mein Deutsch ist noch nicht so gut.",
        "context": "Antwort geben"
      },
      {
        "de": "Können Sie mir das auf Papier geben?",
        "context": "Problem lösen"
      },
      {
        "de": "Wo muss ich unterschreiben?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ist das Formular richtig ausgefüllt?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich habe alles dabei.",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Frist dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Was passiert als nächstes?",
        "context": "Problem lösen"
      },
      {
        "de": "Ich warte auf eine Antwort.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Können Sie mich zurückrufen?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich habe eine Beschwerde.",
        "context": "Frage stellen"
      },
      {
        "de": "Das muss dringend erledigt werden.",
        "context": "Antwort geben"
      },
      {
        "de": "Ich bin seit einem Jahr in Deutschland.",
        "context": "Problem lösen"
      },
      {
        "de": "Meine Adresse hat sich geändert.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich brauche eine Bescheinigung.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Bis wann muss ich das erledigen?",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Beratung dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Wo kann ich mich informieren?",
        "context": "Problem lösen"
      },
      {
        "de": "Ich möchte einen Antrag stellen.",
        "context": "Hilfe bitten"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Nichts sagen.",
        "correct": "Höflich und klar antworten.",
        "tip": "Bei Mit dem Vermieter sprechen ist klare Kommunikation wichtig."
      },
      {
        "wrong": "sagen",
        "correct": "helfen",
        "tip": "Höflich um Hilfe bitten ist immer richtig."
      },
      {
        "wrong": "Okay.",
        "correct": "Vielen Dank, das hilft mir sehr.",
        "tip": "Sich bedanken zeigt Wertschätzung."
      }
    ]
  },
  {
    "id": "a2-12",
    "level": "A2",
    "title": "Werkstatt",
    "titleDe": "Auto in die Werkstatt bringen",
    "icon": "🔧",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Auto in die Werkstatt bringen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Nichts sagen.",
              "Einfach weggehen."
            ],
            "answer": 0,
            "explanation": "Bei Auto in die Werkstatt bringen ist klare Kommunikation wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du brauchst Hilfe beim Thema Auto in die Werkstatt bringen.",
            "question": "Könnten Sie mir bitte ___?",
            "options": [
              "helfen",
              "sagen",
              "zeigen"
            ],
            "answer": "helfen",
            "explanation": "Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst eine Frage zum Thema Auto in die Werkstatt bringen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sie",
              "Könnten",
              "bitte",
              "mir",
              "helfen"
            ],
            "answer": [
              1,
              0,
              3,
              2,
              4
            ],
            "explanation": "Richtig: Könnten Sie mir bitte helfen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand erklärt dir etwas zum Thema Auto in die Werkstatt bringen.",
            "question": "Was sagst du?",
            "options": [
              "Vielen Dank, das hilft mir sehr.",
              "Okay.",
              "Können Sie das wiederholen?"
            ],
            "answer": 0,
            "explanation": "Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bekommst eine Rechnung per Post.",
            "question": "Was machst du?",
            "options": [
              "Ich überweise den Betrag bis zum Fälligkeitsdatum.",
              "Ich werfe sie weg.",
              "Ich rufe die Polizei."
            ],
            "answer": 0,
            "explanation": "Rechnungen pünktlich bezahlen ist wichtig."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Auto in die Werkstatt bringen.",
            "question": "Bei Auto in die Werkstatt bringen ist klare Kommunikation ___.",
            "options": [
              "wichtig",
              "schnell",
              "gut"
            ],
            "answer": "wichtig",
            "explanation": "Bei Auto in die Werkstatt bringen ist klare Kommunikation wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du brauchst Hilfe beim Thema Auto in die Werkstatt bringen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "ist",
              "Hilfe",
              "bitten",
              "um",
              "Höflich",
              "immer",
              "richtig"
            ],
            "answer": [
              4,
              3,
              1,
              2,
              0,
              5,
              6
            ],
            "explanation": "Richtig: Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst eine Frage zum Thema Auto in die Werkstatt bringen.",
            "question": "Könnten Sie ___ bitte helfen?",
            "options": [
              "mir",
              "Adresse",
              "Lösung"
            ],
            "answer": "mir",
            "explanation": "Könnten Sie mir bitte helfen?"
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand erklärt dir etwas zum Thema Auto in die Werkstatt bringen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sich",
              "zeigt",
              "bedanken",
              "Wertschätzung"
            ],
            "answer": [
              0,
              2,
              1,
              3
            ],
            "explanation": "Richtig: Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "fill_blank",
            "situation": "Du bekommst eine Rechnung per Post.",
            "question": "Rechnungen ___ bezahlen ist wichtig.",
            "options": [
              "pünktlich",
              "Problem",
              "Nummer"
            ],
            "answer": "pünktlich",
            "explanation": "Rechnungen pünktlich bezahlen ist wichtig."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Auto in die Werkstatt bringen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Vielleicht später.",
              "Kein Interesse."
            ],
            "answer": 0,
            "explanation": "Bei Auto in die Werkstatt bringen ist klare Kommunikation wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du brauchst Hilfe beim Thema Auto in die Werkstatt bringen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "helfen",
              "Das kann ich nicht.",
              "Vielleicht später."
            ],
            "answer": 0,
            "explanation": "Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst eine Frage zum Thema Auto in die Werkstatt bringen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Könnten Sie mir bitte helfen",
              "Fragen Sie jemand anderen.",
              "Kein Interesse."
            ],
            "answer": 0,
            "explanation": "Richtig: Könnten Sie mir bitte helfen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand erklärt dir etwas zum Thema Auto in die Werkstatt bringen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Vielen Dank, das hilft mir sehr.",
              "Muss das sein?",
              "Ich habe keine Ahnung."
            ],
            "answer": 0,
            "explanation": "Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bekommst eine Rechnung per Post.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich überweise den Betrag bis zum Fälligkeitsdatum.",
              "Ich habe keine Ahnung.",
              "Geht mich nichts an."
            ],
            "answer": 0,
            "explanation": "Rechnungen pünktlich bezahlen ist wichtig."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Entschuldigung, können Sie mir helfen?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich verstehe das nicht.",
        "context": "Frage stellen"
      },
      {
        "de": "Können Sie das bitte wiederholen?",
        "context": "Antwort geben"
      },
      {
        "de": "Wie sagt man das auf Deutsch?",
        "context": "Problem lösen"
      },
      {
        "de": "Bitte sprechen Sie langsamer.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Das habe ich nicht verstanden.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Vielen Dank für Ihre Hilfe.",
        "context": "Frage stellen"
      },
      {
        "de": "Wo finde ich Informationen dazu?",
        "context": "Antwort geben"
      },
      {
        "de": "Ich habe eine Frage.",
        "context": "Problem lösen"
      },
      {
        "de": "Können Sie mir das erklären?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich bin neu hier.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Das ist sehr wichtig für mich.",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Alternative?",
        "context": "Antwort geben"
      },
      {
        "de": "Wann kann ich wiederkommen?",
        "context": "Problem lösen"
      },
      {
        "de": "Ist das kostenlos?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich würde gerne einen Termin vereinbaren.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Könnten Sie mir bitte weiterhelfen?",
        "context": "Frage stellen"
      },
      {
        "de": "Das muss ich mir noch überlegen.",
        "context": "Antwort geben"
      },
      {
        "de": "Ich bin damit nicht einverstanden.",
        "context": "Problem lösen"
      },
      {
        "de": "Können wir einen Kompromiss finden?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Das erscheint mir zu teuer.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich hätte gerne eine schriftliche Bestätigung.",
        "context": "Frage stellen"
      },
      {
        "de": "Wann ist der nächste freie Termin?",
        "context": "Antwort geben"
      },
      {
        "de": "Gibt es da Ausnahmen?",
        "context": "Problem lösen"
      },
      {
        "de": "Das war ein Missverständnis.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich möchte mich beschweren.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Können Sie das schriftlich bestätigen?",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es einen Ansprechpartner dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Ich brauche noch etwas Zeit.",
        "context": "Problem lösen"
      },
      {
        "de": "Das ist mir leider nicht möglich.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Welche Unterlagen brauche ich?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich komme aus dem Ausland.",
        "context": "Frage stellen"
      },
      {
        "de": "Mein Deutsch ist noch nicht so gut.",
        "context": "Antwort geben"
      },
      {
        "de": "Können Sie mir das auf Papier geben?",
        "context": "Problem lösen"
      },
      {
        "de": "Wo muss ich unterschreiben?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ist das Formular richtig ausgefüllt?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich habe alles dabei.",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Frist dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Was passiert als nächstes?",
        "context": "Problem lösen"
      },
      {
        "de": "Ich warte auf eine Antwort.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Können Sie mich zurückrufen?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich habe eine Beschwerde.",
        "context": "Frage stellen"
      },
      {
        "de": "Das muss dringend erledigt werden.",
        "context": "Antwort geben"
      },
      {
        "de": "Ich bin seit einem Jahr in Deutschland.",
        "context": "Problem lösen"
      },
      {
        "de": "Meine Adresse hat sich geändert.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich brauche eine Bescheinigung.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Bis wann muss ich das erledigen?",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Beratung dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Wo kann ich mich informieren?",
        "context": "Problem lösen"
      },
      {
        "de": "Ich möchte einen Antrag stellen.",
        "context": "Hilfe bitten"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Nichts sagen.",
        "correct": "Höflich und klar antworten.",
        "tip": "Bei Auto in die Werkstatt bringen ist klare Kommunikation wichtig."
      },
      {
        "wrong": "sagen",
        "correct": "helfen",
        "tip": "Höflich um Hilfe bitten ist immer richtig."
      },
      {
        "wrong": "Okay.",
        "correct": "Vielen Dank, das hilft mir sehr.",
        "tip": "Sich bedanken zeigt Wertschätzung."
      }
    ]
  },
  {
    "id": "a2-13",
    "level": "A2",
    "title": "Friseur",
    "titleDe": "Beim Friseur",
    "icon": "💇",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Beim Friseur.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Nichts sagen.",
              "Einfach weggehen."
            ],
            "answer": 0,
            "explanation": "Bei Beim Friseur ist klare Kommunikation wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du brauchst Hilfe beim Thema Beim Friseur.",
            "question": "Könnten Sie mir bitte ___?",
            "options": [
              "helfen",
              "sagen",
              "zeigen"
            ],
            "answer": "helfen",
            "explanation": "Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst eine Frage zum Thema Beim Friseur.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sie",
              "Könnten",
              "bitte",
              "mir",
              "helfen"
            ],
            "answer": [
              1,
              0,
              3,
              2,
              4
            ],
            "explanation": "Richtig: Könnten Sie mir bitte helfen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand erklärt dir etwas zum Thema Beim Friseur.",
            "question": "Was sagst du?",
            "options": [
              "Vielen Dank, das hilft mir sehr.",
              "Okay.",
              "Können Sie das wiederholen?"
            ],
            "answer": 0,
            "explanation": "Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du willst einen Termin absagen.",
            "question": "Was sagst du?",
            "options": [
              "Ich muss den Termin leider absagen.",
              "Ich komme nicht.",
              "Vergessen Sie es."
            ],
            "answer": 0,
            "explanation": "Höfliches Absagen ist im Deutschen wichtig."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Beim Friseur.",
            "question": "Bei ___ Friseur ist klare Kommunikation wichtig.",
            "options": [
              "Beim",
              "Nummer",
              "darf"
            ],
            "answer": "Beim",
            "explanation": "Bei Beim Friseur ist klare Kommunikation wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du brauchst Hilfe beim Thema Beim Friseur.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "bitten",
              "Höflich",
              "ist",
              "um",
              "Hilfe",
              "richtig",
              "immer"
            ],
            "answer": [
              1,
              3,
              4,
              0,
              2,
              6,
              5
            ],
            "explanation": "Richtig: Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst eine Frage zum Thema Beim Friseur.",
            "question": "Könnten Sie mir ___ helfen?",
            "options": [
              "bitte",
              "gleich",
              "morgen"
            ],
            "answer": "bitte",
            "explanation": "Könnten Sie mir bitte helfen?"
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand erklärt dir etwas zum Thema Beim Friseur.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sich",
              "zeigt",
              "bedanken",
              "Wertschätzung"
            ],
            "answer": [
              0,
              2,
              1,
              3
            ],
            "explanation": "Richtig: Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "fill_blank",
            "situation": "Du willst einen Termin absagen.",
            "question": "Höfliches ___ ist im Deutschen wichtig.",
            "options": [
              "Absagen",
              "Frage",
              "heute"
            ],
            "answer": "Absagen",
            "explanation": "Höfliches Absagen ist im Deutschen wichtig."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Beim Friseur.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Das kann ich nicht.",
              "Vielleicht später."
            ],
            "answer": 0,
            "explanation": "Bei Beim Friseur ist klare Kommunikation wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du brauchst Hilfe beim Thema Beim Friseur.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "helfen",
              "Ich habe keine Ahnung.",
              "Das verstehe ich nicht."
            ],
            "answer": 0,
            "explanation": "Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst eine Frage zum Thema Beim Friseur.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Könnten Sie mir bitte helfen",
              "Ich weiß es nicht.",
              "Mir egal."
            ],
            "answer": 0,
            "explanation": "Richtig: Könnten Sie mir bitte helfen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand erklärt dir etwas zum Thema Beim Friseur.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Vielen Dank, das hilft mir sehr.",
              "Fragen Sie jemand anderen.",
              "Kein Interesse."
            ],
            "answer": 0,
            "explanation": "Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du willst einen Termin absagen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich muss den Termin leider absagen.",
              "Muss das sein?",
              "Mir egal."
            ],
            "answer": 0,
            "explanation": "Höfliches Absagen ist im Deutschen wichtig."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Entschuldigung, können Sie mir helfen?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich verstehe das nicht.",
        "context": "Frage stellen"
      },
      {
        "de": "Können Sie das bitte wiederholen?",
        "context": "Antwort geben"
      },
      {
        "de": "Wie sagt man das auf Deutsch?",
        "context": "Problem lösen"
      },
      {
        "de": "Bitte sprechen Sie langsamer.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Das habe ich nicht verstanden.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Vielen Dank für Ihre Hilfe.",
        "context": "Frage stellen"
      },
      {
        "de": "Wo finde ich Informationen dazu?",
        "context": "Antwort geben"
      },
      {
        "de": "Ich habe eine Frage.",
        "context": "Problem lösen"
      },
      {
        "de": "Können Sie mir das erklären?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich bin neu hier.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Das ist sehr wichtig für mich.",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Alternative?",
        "context": "Antwort geben"
      },
      {
        "de": "Wann kann ich wiederkommen?",
        "context": "Problem lösen"
      },
      {
        "de": "Ist das kostenlos?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich würde gerne einen Termin vereinbaren.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Könnten Sie mir bitte weiterhelfen?",
        "context": "Frage stellen"
      },
      {
        "de": "Das muss ich mir noch überlegen.",
        "context": "Antwort geben"
      },
      {
        "de": "Ich bin damit nicht einverstanden.",
        "context": "Problem lösen"
      },
      {
        "de": "Können wir einen Kompromiss finden?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Das erscheint mir zu teuer.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich hätte gerne eine schriftliche Bestätigung.",
        "context": "Frage stellen"
      },
      {
        "de": "Wann ist der nächste freie Termin?",
        "context": "Antwort geben"
      },
      {
        "de": "Gibt es da Ausnahmen?",
        "context": "Problem lösen"
      },
      {
        "de": "Das war ein Missverständnis.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich möchte mich beschweren.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Können Sie das schriftlich bestätigen?",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es einen Ansprechpartner dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Ich brauche noch etwas Zeit.",
        "context": "Problem lösen"
      },
      {
        "de": "Das ist mir leider nicht möglich.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Welche Unterlagen brauche ich?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich komme aus dem Ausland.",
        "context": "Frage stellen"
      },
      {
        "de": "Mein Deutsch ist noch nicht so gut.",
        "context": "Antwort geben"
      },
      {
        "de": "Können Sie mir das auf Papier geben?",
        "context": "Problem lösen"
      },
      {
        "de": "Wo muss ich unterschreiben?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ist das Formular richtig ausgefüllt?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich habe alles dabei.",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Frist dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Was passiert als nächstes?",
        "context": "Problem lösen"
      },
      {
        "de": "Ich warte auf eine Antwort.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Können Sie mich zurückrufen?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich habe eine Beschwerde.",
        "context": "Frage stellen"
      },
      {
        "de": "Das muss dringend erledigt werden.",
        "context": "Antwort geben"
      },
      {
        "de": "Ich bin seit einem Jahr in Deutschland.",
        "context": "Problem lösen"
      },
      {
        "de": "Meine Adresse hat sich geändert.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich brauche eine Bescheinigung.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Bis wann muss ich das erledigen?",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Beratung dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Wo kann ich mich informieren?",
        "context": "Problem lösen"
      },
      {
        "de": "Ich möchte einen Antrag stellen.",
        "context": "Hilfe bitten"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Nichts sagen.",
        "correct": "Höflich und klar antworten.",
        "tip": "Bei Beim Friseur ist klare Kommunikation wichtig."
      },
      {
        "wrong": "sagen",
        "correct": "helfen",
        "tip": "Höflich um Hilfe bitten ist immer richtig."
      },
      {
        "wrong": "Okay.",
        "correct": "Vielen Dank, das hilft mir sehr.",
        "tip": "Sich bedanken zeigt Wertschätzung."
      }
    ]
  },
  {
    "id": "a2-14",
    "level": "A2",
    "title": "Bibliothek",
    "titleDe": "In der Bibliothek",
    "icon": "📚",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: In der Bibliothek.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Nichts sagen.",
              "Einfach weggehen."
            ],
            "answer": 0,
            "explanation": "Bei In der Bibliothek ist klare Kommunikation wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du brauchst Hilfe beim Thema In der Bibliothek.",
            "question": "Könnten Sie mir bitte ___?",
            "options": [
              "helfen",
              "sagen",
              "zeigen"
            ],
            "answer": "helfen",
            "explanation": "Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst eine Frage zum Thema In der Bibliothek.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sie",
              "Könnten",
              "bitte",
              "mir",
              "helfen"
            ],
            "answer": [
              1,
              0,
              3,
              2,
              4
            ],
            "explanation": "Richtig: Könnten Sie mir bitte helfen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand erklärt dir etwas zum Thema In der Bibliothek.",
            "question": "Was sagst du?",
            "options": [
              "Vielen Dank, das hilft mir sehr.",
              "Okay.",
              "Können Sie das wiederholen?"
            ],
            "answer": 0,
            "explanation": "Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "quick_reaction",
            "situation": "Ein Kollege fragt nach deiner Meinung.",
            "question": "Wie antwortest du?",
            "options": [
              "Ich finde, das ist eine gute Idee.",
              "Keine Ahnung.",
              "Mir egal."
            ],
            "answer": 0,
            "explanation": "Eine begründete Meinung zeigt Engagement."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: In der Bibliothek.",
            "question": "Bei In ___ Bibliothek ist klare Kommunikation wichtig.",
            "options": [
              "der",
              "Hilfe",
              "möglich"
            ],
            "answer": "der",
            "explanation": "Bei In der Bibliothek ist klare Kommunikation wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du brauchst Hilfe beim Thema In der Bibliothek.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "ist",
              "immer",
              "bitten",
              "um",
              "richtig",
              "Höflich",
              "Hilfe"
            ],
            "answer": [
              5,
              3,
              6,
              2,
              0,
              1,
              4
            ],
            "explanation": "Richtig: Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst eine Frage zum Thema In der Bibliothek.",
            "question": "Könnten Sie mir ___ helfen?",
            "options": [
              "bitte",
              "heute",
              "gestern"
            ],
            "answer": "bitte",
            "explanation": "Könnten Sie mir bitte helfen?"
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand erklärt dir etwas zum Thema In der Bibliothek.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sich",
              "bedanken",
              "Wertschätzung",
              "zeigt"
            ],
            "answer": [
              0,
              1,
              3,
              2
            ],
            "explanation": "Richtig: Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "fill_blank",
            "situation": "Ein Kollege fragt nach deiner Meinung.",
            "question": "Eine begründete Meinung ___ Engagement.",
            "options": [
              "zeigt",
              "Hilfe",
              "habe"
            ],
            "answer": "zeigt",
            "explanation": "Eine begründete Meinung zeigt Engagement."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: In der Bibliothek.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Fragen Sie jemand anderen.",
              "Geht mich nichts an."
            ],
            "answer": 0,
            "explanation": "Bei In der Bibliothek ist klare Kommunikation wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du brauchst Hilfe beim Thema In der Bibliothek.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "helfen",
              "Das verstehe ich nicht.",
              "Kein Interesse."
            ],
            "answer": 0,
            "explanation": "Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst eine Frage zum Thema In der Bibliothek.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Könnten Sie mir bitte helfen",
              "Keine Lust.",
              "Ich habe keine Ahnung."
            ],
            "answer": 0,
            "explanation": "Richtig: Könnten Sie mir bitte helfen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand erklärt dir etwas zum Thema In der Bibliothek.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Vielen Dank, das hilft mir sehr.",
              "Fragen Sie jemand anderen.",
              "Kein Interesse."
            ],
            "answer": 0,
            "explanation": "Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "quick_reaction",
            "situation": "Ein Kollege fragt nach deiner Meinung.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich finde, das ist eine gute Idee.",
              "Das ist nicht mein Problem.",
              "Ich habe keine Ahnung."
            ],
            "answer": 0,
            "explanation": "Eine begründete Meinung zeigt Engagement."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Entschuldigung, können Sie mir helfen?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich verstehe das nicht.",
        "context": "Frage stellen"
      },
      {
        "de": "Können Sie das bitte wiederholen?",
        "context": "Antwort geben"
      },
      {
        "de": "Wie sagt man das auf Deutsch?",
        "context": "Problem lösen"
      },
      {
        "de": "Bitte sprechen Sie langsamer.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Das habe ich nicht verstanden.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Vielen Dank für Ihre Hilfe.",
        "context": "Frage stellen"
      },
      {
        "de": "Wo finde ich Informationen dazu?",
        "context": "Antwort geben"
      },
      {
        "de": "Ich habe eine Frage.",
        "context": "Problem lösen"
      },
      {
        "de": "Können Sie mir das erklären?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich bin neu hier.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Das ist sehr wichtig für mich.",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Alternative?",
        "context": "Antwort geben"
      },
      {
        "de": "Wann kann ich wiederkommen?",
        "context": "Problem lösen"
      },
      {
        "de": "Ist das kostenlos?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich würde gerne einen Termin vereinbaren.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Könnten Sie mir bitte weiterhelfen?",
        "context": "Frage stellen"
      },
      {
        "de": "Das muss ich mir noch überlegen.",
        "context": "Antwort geben"
      },
      {
        "de": "Ich bin damit nicht einverstanden.",
        "context": "Problem lösen"
      },
      {
        "de": "Können wir einen Kompromiss finden?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Das erscheint mir zu teuer.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich hätte gerne eine schriftliche Bestätigung.",
        "context": "Frage stellen"
      },
      {
        "de": "Wann ist der nächste freie Termin?",
        "context": "Antwort geben"
      },
      {
        "de": "Gibt es da Ausnahmen?",
        "context": "Problem lösen"
      },
      {
        "de": "Das war ein Missverständnis.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich möchte mich beschweren.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Können Sie das schriftlich bestätigen?",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es einen Ansprechpartner dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Ich brauche noch etwas Zeit.",
        "context": "Problem lösen"
      },
      {
        "de": "Das ist mir leider nicht möglich.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Welche Unterlagen brauche ich?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich komme aus dem Ausland.",
        "context": "Frage stellen"
      },
      {
        "de": "Mein Deutsch ist noch nicht so gut.",
        "context": "Antwort geben"
      },
      {
        "de": "Können Sie mir das auf Papier geben?",
        "context": "Problem lösen"
      },
      {
        "de": "Wo muss ich unterschreiben?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ist das Formular richtig ausgefüllt?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich habe alles dabei.",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Frist dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Was passiert als nächstes?",
        "context": "Problem lösen"
      },
      {
        "de": "Ich warte auf eine Antwort.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Können Sie mich zurückrufen?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich habe eine Beschwerde.",
        "context": "Frage stellen"
      },
      {
        "de": "Das muss dringend erledigt werden.",
        "context": "Antwort geben"
      },
      {
        "de": "Ich bin seit einem Jahr in Deutschland.",
        "context": "Problem lösen"
      },
      {
        "de": "Meine Adresse hat sich geändert.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich brauche eine Bescheinigung.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Bis wann muss ich das erledigen?",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Beratung dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Wo kann ich mich informieren?",
        "context": "Problem lösen"
      },
      {
        "de": "Ich möchte einen Antrag stellen.",
        "context": "Hilfe bitten"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Nichts sagen.",
        "correct": "Höflich und klar antworten.",
        "tip": "Bei In der Bibliothek ist klare Kommunikation wichtig."
      },
      {
        "wrong": "sagen",
        "correct": "helfen",
        "tip": "Höflich um Hilfe bitten ist immer richtig."
      },
      {
        "wrong": "Okay.",
        "correct": "Vielen Dank, das hilft mir sehr.",
        "tip": "Sich bedanken zeigt Wertschätzung."
      }
    ]
  },
  {
    "id": "a2-15",
    "level": "A2",
    "title": "Reise buchen",
    "titleDe": "Eine Reise buchen",
    "icon": "✈️",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Eine Reise buchen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Nichts sagen.",
              "Einfach weggehen."
            ],
            "answer": 0,
            "explanation": "Bei Eine Reise buchen ist klare Kommunikation wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du brauchst Hilfe beim Thema Eine Reise buchen.",
            "question": "Könnten Sie mir bitte ___?",
            "options": [
              "helfen",
              "sagen",
              "zeigen"
            ],
            "answer": "helfen",
            "explanation": "Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst eine Frage zum Thema Eine Reise buchen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sie",
              "Könnten",
              "bitte",
              "mir",
              "helfen"
            ],
            "answer": [
              1,
              0,
              3,
              2,
              4
            ],
            "explanation": "Richtig: Könnten Sie mir bitte helfen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand erklärt dir etwas zum Thema Eine Reise buchen.",
            "question": "Was sagst du?",
            "options": [
              "Vielen Dank, das hilft mir sehr.",
              "Okay.",
              "Können Sie das wiederholen?"
            ],
            "answer": 0,
            "explanation": "Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du erhältst ein Paket.",
            "question": "Was machst du?",
            "options": [
              "Ich unterschreibe und bedanke mich.",
              "Ich nehme es ohne Worte.",
              "Ich öffne es vor dem Postboten."
            ],
            "answer": 0,
            "explanation": "Beim Paketempfang unterschreibt man die Zustellung."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Eine Reise buchen.",
            "question": "Bei Eine Reise buchen ist klare ___ wichtig.",
            "options": [
              "Kommunikation",
              "wichtig",
              "sage"
            ],
            "answer": "Kommunikation",
            "explanation": "Bei Eine Reise buchen ist klare Kommunikation wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du brauchst Hilfe beim Thema Eine Reise buchen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "ist",
              "um",
              "Höflich",
              "Hilfe",
              "immer",
              "richtig",
              "bitten"
            ],
            "answer": [
              2,
              1,
              3,
              6,
              0,
              4,
              5
            ],
            "explanation": "Richtig: Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst eine Frage zum Thema Eine Reise buchen.",
            "question": "Könnten Sie mir ___ helfen?",
            "options": [
              "bitte",
              "dort",
              "sofort"
            ],
            "answer": "bitte",
            "explanation": "Könnten Sie mir bitte helfen?"
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand erklärt dir etwas zum Thema Eine Reise buchen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "bedanken",
              "zeigt",
              "Wertschätzung",
              "Sich"
            ],
            "answer": [
              3,
              0,
              1,
              2
            ],
            "explanation": "Richtig: Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "fill_blank",
            "situation": "Du erhältst ein Paket.",
            "question": "Beim Paketempfang ___ man die Zustellung.",
            "options": [
              "unterschreibt",
              "sofort",
              "morgen"
            ],
            "answer": "unterschreibt",
            "explanation": "Beim Paketempfang unterschreibt man die Zustellung."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Eine Reise buchen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Das ist nicht mein Problem.",
              "Kein Interesse."
            ],
            "answer": 0,
            "explanation": "Bei Eine Reise buchen ist klare Kommunikation wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du brauchst Hilfe beim Thema Eine Reise buchen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "helfen",
              "Ich habe keine Ahnung.",
              "Das kann ich nicht."
            ],
            "answer": 0,
            "explanation": "Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst eine Frage zum Thema Eine Reise buchen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Könnten Sie mir bitte helfen",
              "Muss das sein?",
              "Kein Interesse."
            ],
            "answer": 0,
            "explanation": "Richtig: Könnten Sie mir bitte helfen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand erklärt dir etwas zum Thema Eine Reise buchen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Vielen Dank, das hilft mir sehr.",
              "Keine Lust.",
              "Muss das sein?"
            ],
            "answer": 0,
            "explanation": "Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du erhältst ein Paket.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich unterschreibe und bedanke mich.",
              "Das verstehe ich nicht.",
              "Muss das sein?"
            ],
            "answer": 0,
            "explanation": "Beim Paketempfang unterschreibt man die Zustellung."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Entschuldigung, können Sie mir helfen?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich verstehe das nicht.",
        "context": "Frage stellen"
      },
      {
        "de": "Können Sie das bitte wiederholen?",
        "context": "Antwort geben"
      },
      {
        "de": "Wie sagt man das auf Deutsch?",
        "context": "Problem lösen"
      },
      {
        "de": "Bitte sprechen Sie langsamer.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Das habe ich nicht verstanden.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Vielen Dank für Ihre Hilfe.",
        "context": "Frage stellen"
      },
      {
        "de": "Wo finde ich Informationen dazu?",
        "context": "Antwort geben"
      },
      {
        "de": "Ich habe eine Frage.",
        "context": "Problem lösen"
      },
      {
        "de": "Können Sie mir das erklären?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich bin neu hier.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Das ist sehr wichtig für mich.",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Alternative?",
        "context": "Antwort geben"
      },
      {
        "de": "Wann kann ich wiederkommen?",
        "context": "Problem lösen"
      },
      {
        "de": "Ist das kostenlos?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich würde gerne einen Termin vereinbaren.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Könnten Sie mir bitte weiterhelfen?",
        "context": "Frage stellen"
      },
      {
        "de": "Das muss ich mir noch überlegen.",
        "context": "Antwort geben"
      },
      {
        "de": "Ich bin damit nicht einverstanden.",
        "context": "Problem lösen"
      },
      {
        "de": "Können wir einen Kompromiss finden?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Das erscheint mir zu teuer.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich hätte gerne eine schriftliche Bestätigung.",
        "context": "Frage stellen"
      },
      {
        "de": "Wann ist der nächste freie Termin?",
        "context": "Antwort geben"
      },
      {
        "de": "Gibt es da Ausnahmen?",
        "context": "Problem lösen"
      },
      {
        "de": "Das war ein Missverständnis.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich möchte mich beschweren.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Können Sie das schriftlich bestätigen?",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es einen Ansprechpartner dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Ich brauche noch etwas Zeit.",
        "context": "Problem lösen"
      },
      {
        "de": "Das ist mir leider nicht möglich.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Welche Unterlagen brauche ich?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich komme aus dem Ausland.",
        "context": "Frage stellen"
      },
      {
        "de": "Mein Deutsch ist noch nicht so gut.",
        "context": "Antwort geben"
      },
      {
        "de": "Können Sie mir das auf Papier geben?",
        "context": "Problem lösen"
      },
      {
        "de": "Wo muss ich unterschreiben?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ist das Formular richtig ausgefüllt?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich habe alles dabei.",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Frist dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Was passiert als nächstes?",
        "context": "Problem lösen"
      },
      {
        "de": "Ich warte auf eine Antwort.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Können Sie mich zurückrufen?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich habe eine Beschwerde.",
        "context": "Frage stellen"
      },
      {
        "de": "Das muss dringend erledigt werden.",
        "context": "Antwort geben"
      },
      {
        "de": "Ich bin seit einem Jahr in Deutschland.",
        "context": "Problem lösen"
      },
      {
        "de": "Meine Adresse hat sich geändert.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich brauche eine Bescheinigung.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Bis wann muss ich das erledigen?",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Beratung dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Wo kann ich mich informieren?",
        "context": "Problem lösen"
      },
      {
        "de": "Ich möchte einen Antrag stellen.",
        "context": "Hilfe bitten"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Nichts sagen.",
        "correct": "Höflich und klar antworten.",
        "tip": "Bei Eine Reise buchen ist klare Kommunikation wichtig."
      },
      {
        "wrong": "sagen",
        "correct": "helfen",
        "tip": "Höflich um Hilfe bitten ist immer richtig."
      },
      {
        "wrong": "Okay.",
        "correct": "Vielen Dank, das hilft mir sehr.",
        "tip": "Sich bedanken zeigt Wertschätzung."
      }
    ]
  },
  {
    "id": "a2-16",
    "level": "A2",
    "title": "Fitnessstudio",
    "titleDe": "Im Fitnessstudio",
    "icon": "🏃",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Im Fitnessstudio.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Nichts sagen.",
              "Einfach weggehen."
            ],
            "answer": 0,
            "explanation": "Bei Im Fitnessstudio ist klare Kommunikation wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du brauchst Hilfe beim Thema Im Fitnessstudio.",
            "question": "Könnten Sie mir bitte ___?",
            "options": [
              "helfen",
              "sagen",
              "zeigen"
            ],
            "answer": "helfen",
            "explanation": "Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst eine Frage zum Thema Im Fitnessstudio.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sie",
              "Könnten",
              "bitte",
              "mir",
              "helfen"
            ],
            "answer": [
              1,
              0,
              3,
              2,
              4
            ],
            "explanation": "Richtig: Könnten Sie mir bitte helfen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand erklärt dir etwas zum Thema Im Fitnessstudio.",
            "question": "Was sagst du?",
            "options": [
              "Vielen Dank, das hilft mir sehr.",
              "Okay.",
              "Können Sie das wiederholen?"
            ],
            "answer": 0,
            "explanation": "Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "quick_reaction",
            "situation": "Dein Nachbar beschwert sich über Lärm.",
            "question": "Wie reagierst du?",
            "options": [
              "Es tut mir leid, ich werde leiser sein.",
              "Das ist mir egal.",
              "Rufen Sie die Polizei."
            ],
            "answer": 0,
            "explanation": "Sich entschuldigen löst Konflikte schneller."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Im Fitnessstudio.",
            "question": "Bei Im Fitnessstudio ist klare ___ wichtig.",
            "options": [
              "Kommunikation",
              "Termin",
              "sage"
            ],
            "answer": "Kommunikation",
            "explanation": "Bei Im Fitnessstudio ist klare Kommunikation wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du brauchst Hilfe beim Thema Im Fitnessstudio.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "bitten",
              "immer",
              "um",
              "Hilfe",
              "Höflich",
              "ist",
              "richtig"
            ],
            "answer": [
              4,
              2,
              3,
              0,
              5,
              1,
              6
            ],
            "explanation": "Richtig: Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst eine Frage zum Thema Im Fitnessstudio.",
            "question": "Könnten Sie mir ___ helfen?",
            "options": [
              "bitte",
              "gleich",
              "sofort"
            ],
            "answer": "bitte",
            "explanation": "Könnten Sie mir bitte helfen?"
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand erklärt dir etwas zum Thema Im Fitnessstudio.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "zeigt",
              "bedanken",
              "Wertschätzung",
              "Sich"
            ],
            "answer": [
              3,
              1,
              0,
              2
            ],
            "explanation": "Richtig: Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "fill_blank",
            "situation": "Dein Nachbar beschwert sich über Lärm.",
            "question": "Sich ___ löst Konflikte schneller.",
            "options": [
              "entschuldigen",
              "habe",
              "sage"
            ],
            "answer": "entschuldigen",
            "explanation": "Sich entschuldigen löst Konflikte schneller."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Im Fitnessstudio.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Das kann ich nicht.",
              "Mir egal."
            ],
            "answer": 0,
            "explanation": "Bei Im Fitnessstudio ist klare Kommunikation wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du brauchst Hilfe beim Thema Im Fitnessstudio.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "helfen",
              "Fragen Sie jemand anderen.",
              "Das kann ich nicht."
            ],
            "answer": 0,
            "explanation": "Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst eine Frage zum Thema Im Fitnessstudio.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Könnten Sie mir bitte helfen",
              "Das kann ich nicht.",
              "Vielleicht später."
            ],
            "answer": 0,
            "explanation": "Richtig: Könnten Sie mir bitte helfen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand erklärt dir etwas zum Thema Im Fitnessstudio.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Vielen Dank, das hilft mir sehr.",
              "Ich habe keine Ahnung.",
              "Das ist nicht mein Problem."
            ],
            "answer": 0,
            "explanation": "Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "quick_reaction",
            "situation": "Dein Nachbar beschwert sich über Lärm.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Es tut mir leid, ich werde leiser sein.",
              "Muss das sein?",
              "Keine Lust."
            ],
            "answer": 0,
            "explanation": "Sich entschuldigen löst Konflikte schneller."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Entschuldigung, können Sie mir helfen?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich verstehe das nicht.",
        "context": "Frage stellen"
      },
      {
        "de": "Können Sie das bitte wiederholen?",
        "context": "Antwort geben"
      },
      {
        "de": "Wie sagt man das auf Deutsch?",
        "context": "Problem lösen"
      },
      {
        "de": "Bitte sprechen Sie langsamer.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Das habe ich nicht verstanden.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Vielen Dank für Ihre Hilfe.",
        "context": "Frage stellen"
      },
      {
        "de": "Wo finde ich Informationen dazu?",
        "context": "Antwort geben"
      },
      {
        "de": "Ich habe eine Frage.",
        "context": "Problem lösen"
      },
      {
        "de": "Können Sie mir das erklären?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich bin neu hier.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Das ist sehr wichtig für mich.",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Alternative?",
        "context": "Antwort geben"
      },
      {
        "de": "Wann kann ich wiederkommen?",
        "context": "Problem lösen"
      },
      {
        "de": "Ist das kostenlos?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich würde gerne einen Termin vereinbaren.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Könnten Sie mir bitte weiterhelfen?",
        "context": "Frage stellen"
      },
      {
        "de": "Das muss ich mir noch überlegen.",
        "context": "Antwort geben"
      },
      {
        "de": "Ich bin damit nicht einverstanden.",
        "context": "Problem lösen"
      },
      {
        "de": "Können wir einen Kompromiss finden?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Das erscheint mir zu teuer.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich hätte gerne eine schriftliche Bestätigung.",
        "context": "Frage stellen"
      },
      {
        "de": "Wann ist der nächste freie Termin?",
        "context": "Antwort geben"
      },
      {
        "de": "Gibt es da Ausnahmen?",
        "context": "Problem lösen"
      },
      {
        "de": "Das war ein Missverständnis.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich möchte mich beschweren.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Können Sie das schriftlich bestätigen?",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es einen Ansprechpartner dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Ich brauche noch etwas Zeit.",
        "context": "Problem lösen"
      },
      {
        "de": "Das ist mir leider nicht möglich.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Welche Unterlagen brauche ich?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich komme aus dem Ausland.",
        "context": "Frage stellen"
      },
      {
        "de": "Mein Deutsch ist noch nicht so gut.",
        "context": "Antwort geben"
      },
      {
        "de": "Können Sie mir das auf Papier geben?",
        "context": "Problem lösen"
      },
      {
        "de": "Wo muss ich unterschreiben?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ist das Formular richtig ausgefüllt?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich habe alles dabei.",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Frist dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Was passiert als nächstes?",
        "context": "Problem lösen"
      },
      {
        "de": "Ich warte auf eine Antwort.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Können Sie mich zurückrufen?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich habe eine Beschwerde.",
        "context": "Frage stellen"
      },
      {
        "de": "Das muss dringend erledigt werden.",
        "context": "Antwort geben"
      },
      {
        "de": "Ich bin seit einem Jahr in Deutschland.",
        "context": "Problem lösen"
      },
      {
        "de": "Meine Adresse hat sich geändert.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich brauche eine Bescheinigung.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Bis wann muss ich das erledigen?",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Beratung dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Wo kann ich mich informieren?",
        "context": "Problem lösen"
      },
      {
        "de": "Ich möchte einen Antrag stellen.",
        "context": "Hilfe bitten"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Nichts sagen.",
        "correct": "Höflich und klar antworten.",
        "tip": "Bei Im Fitnessstudio ist klare Kommunikation wichtig."
      },
      {
        "wrong": "sagen",
        "correct": "helfen",
        "tip": "Höflich um Hilfe bitten ist immer richtig."
      },
      {
        "wrong": "Okay.",
        "correct": "Vielen Dank, das hilft mir sehr.",
        "tip": "Sich bedanken zeigt Wertschätzung."
      }
    ]
  },
  {
    "id": "a2-17",
    "level": "A2",
    "title": "Beschwerden",
    "titleDe": "Beschwerden äußern",
    "icon": "😤",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Beschwerden äußern.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Nichts sagen.",
              "Einfach weggehen."
            ],
            "answer": 0,
            "explanation": "Bei Beschwerden äußern ist klare Kommunikation wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du brauchst Hilfe beim Thema Beschwerden äußern.",
            "question": "Könnten Sie mir bitte ___?",
            "options": [
              "helfen",
              "sagen",
              "zeigen"
            ],
            "answer": "helfen",
            "explanation": "Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst eine Frage zum Thema Beschwerden äußern.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sie",
              "Könnten",
              "bitte",
              "mir",
              "helfen"
            ],
            "answer": [
              1,
              0,
              3,
              2,
              4
            ],
            "explanation": "Richtig: Könnten Sie mir bitte helfen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand erklärt dir etwas zum Thema Beschwerden äußern.",
            "question": "Was sagst du?",
            "options": [
              "Vielen Dank, das hilft mir sehr.",
              "Okay.",
              "Können Sie das wiederholen?"
            ],
            "answer": 0,
            "explanation": "Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bekommst eine Rechnung per Post.",
            "question": "Was machst du?",
            "options": [
              "Ich überweise den Betrag bis zum Fälligkeitsdatum.",
              "Ich werfe sie weg.",
              "Ich rufe die Polizei."
            ],
            "answer": 0,
            "explanation": "Rechnungen pünktlich bezahlen ist wichtig."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Beschwerden äußern.",
            "question": "Bei Beschwerden ___ ist klare Kommunikation wichtig.",
            "options": [
              "äußern",
              "möchte",
              "Geld"
            ],
            "answer": "äußern",
            "explanation": "Bei Beschwerden äußern ist klare Kommunikation wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du brauchst Hilfe beim Thema Beschwerden äußern.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "bitten",
              "richtig",
              "Höflich",
              "Hilfe",
              "um",
              "immer",
              "ist"
            ],
            "answer": [
              2,
              4,
              3,
              0,
              6,
              5,
              1
            ],
            "explanation": "Richtig: Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst eine Frage zum Thema Beschwerden äußern.",
            "question": "Könnten ___ mir bitte helfen?",
            "options": [
              "Sie",
              "Nummer",
              "bin"
            ],
            "answer": "Sie",
            "explanation": "Könnten Sie mir bitte helfen?"
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand erklärt dir etwas zum Thema Beschwerden äußern.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "zeigt",
              "bedanken",
              "Sich",
              "Wertschätzung"
            ],
            "answer": [
              2,
              1,
              0,
              3
            ],
            "explanation": "Richtig: Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "fill_blank",
            "situation": "Du bekommst eine Rechnung per Post.",
            "question": "Rechnungen pünktlich bezahlen ist ___.",
            "options": [
              "wichtig",
              "schnell",
              "möglich"
            ],
            "answer": "wichtig",
            "explanation": "Rechnungen pünktlich bezahlen ist wichtig."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Beschwerden äußern.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Kein Interesse.",
              "Keine Lust."
            ],
            "answer": 0,
            "explanation": "Bei Beschwerden äußern ist klare Kommunikation wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du brauchst Hilfe beim Thema Beschwerden äußern.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "helfen",
              "Das kann ich nicht.",
              "Ich habe keine Ahnung."
            ],
            "answer": 0,
            "explanation": "Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst eine Frage zum Thema Beschwerden äußern.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Könnten Sie mir bitte helfen",
              "Keine Lust.",
              "Das ist nicht mein Problem."
            ],
            "answer": 0,
            "explanation": "Richtig: Könnten Sie mir bitte helfen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand erklärt dir etwas zum Thema Beschwerden äußern.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Vielen Dank, das hilft mir sehr.",
              "Vielleicht später.",
              "Fragen Sie jemand anderen."
            ],
            "answer": 0,
            "explanation": "Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bekommst eine Rechnung per Post.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich überweise den Betrag bis zum Fälligkeitsdatum.",
              "Das verstehe ich nicht.",
              "Muss das sein?"
            ],
            "answer": 0,
            "explanation": "Rechnungen pünktlich bezahlen ist wichtig."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Entschuldigung, können Sie mir helfen?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich verstehe das nicht.",
        "context": "Frage stellen"
      },
      {
        "de": "Können Sie das bitte wiederholen?",
        "context": "Antwort geben"
      },
      {
        "de": "Wie sagt man das auf Deutsch?",
        "context": "Problem lösen"
      },
      {
        "de": "Bitte sprechen Sie langsamer.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Das habe ich nicht verstanden.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Vielen Dank für Ihre Hilfe.",
        "context": "Frage stellen"
      },
      {
        "de": "Wo finde ich Informationen dazu?",
        "context": "Antwort geben"
      },
      {
        "de": "Ich habe eine Frage.",
        "context": "Problem lösen"
      },
      {
        "de": "Können Sie mir das erklären?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich bin neu hier.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Das ist sehr wichtig für mich.",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Alternative?",
        "context": "Antwort geben"
      },
      {
        "de": "Wann kann ich wiederkommen?",
        "context": "Problem lösen"
      },
      {
        "de": "Ist das kostenlos?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich würde gerne einen Termin vereinbaren.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Könnten Sie mir bitte weiterhelfen?",
        "context": "Frage stellen"
      },
      {
        "de": "Das muss ich mir noch überlegen.",
        "context": "Antwort geben"
      },
      {
        "de": "Ich bin damit nicht einverstanden.",
        "context": "Problem lösen"
      },
      {
        "de": "Können wir einen Kompromiss finden?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Das erscheint mir zu teuer.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich hätte gerne eine schriftliche Bestätigung.",
        "context": "Frage stellen"
      },
      {
        "de": "Wann ist der nächste freie Termin?",
        "context": "Antwort geben"
      },
      {
        "de": "Gibt es da Ausnahmen?",
        "context": "Problem lösen"
      },
      {
        "de": "Das war ein Missverständnis.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich möchte mich beschweren.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Können Sie das schriftlich bestätigen?",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es einen Ansprechpartner dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Ich brauche noch etwas Zeit.",
        "context": "Problem lösen"
      },
      {
        "de": "Das ist mir leider nicht möglich.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Welche Unterlagen brauche ich?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich komme aus dem Ausland.",
        "context": "Frage stellen"
      },
      {
        "de": "Mein Deutsch ist noch nicht so gut.",
        "context": "Antwort geben"
      },
      {
        "de": "Können Sie mir das auf Papier geben?",
        "context": "Problem lösen"
      },
      {
        "de": "Wo muss ich unterschreiben?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ist das Formular richtig ausgefüllt?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich habe alles dabei.",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Frist dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Was passiert als nächstes?",
        "context": "Problem lösen"
      },
      {
        "de": "Ich warte auf eine Antwort.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Können Sie mich zurückrufen?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich habe eine Beschwerde.",
        "context": "Frage stellen"
      },
      {
        "de": "Das muss dringend erledigt werden.",
        "context": "Antwort geben"
      },
      {
        "de": "Ich bin seit einem Jahr in Deutschland.",
        "context": "Problem lösen"
      },
      {
        "de": "Meine Adresse hat sich geändert.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich brauche eine Bescheinigung.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Bis wann muss ich das erledigen?",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Beratung dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Wo kann ich mich informieren?",
        "context": "Problem lösen"
      },
      {
        "de": "Ich möchte einen Antrag stellen.",
        "context": "Hilfe bitten"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Nichts sagen.",
        "correct": "Höflich und klar antworten.",
        "tip": "Bei Beschwerden äußern ist klare Kommunikation wichtig."
      },
      {
        "wrong": "sagen",
        "correct": "helfen",
        "tip": "Höflich um Hilfe bitten ist immer richtig."
      },
      {
        "wrong": "Okay.",
        "correct": "Vielen Dank, das hilft mir sehr.",
        "tip": "Sich bedanken zeigt Wertschätzung."
      }
    ]
  },
  {
    "id": "a2-18",
    "level": "A2",
    "title": "Einladung",
    "titleDe": "Eine Einladung annehmen",
    "icon": "💌",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Eine Einladung annehmen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Nichts sagen.",
              "Einfach weggehen."
            ],
            "answer": 0,
            "explanation": "Bei Eine Einladung annehmen ist klare Kommunikation wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du brauchst Hilfe beim Thema Eine Einladung annehmen.",
            "question": "Könnten Sie mir bitte ___?",
            "options": [
              "helfen",
              "sagen",
              "zeigen"
            ],
            "answer": "helfen",
            "explanation": "Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst eine Frage zum Thema Eine Einladung annehmen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sie",
              "Könnten",
              "bitte",
              "mir",
              "helfen"
            ],
            "answer": [
              1,
              0,
              3,
              2,
              4
            ],
            "explanation": "Richtig: Könnten Sie mir bitte helfen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand erklärt dir etwas zum Thema Eine Einladung annehmen.",
            "question": "Was sagst du?",
            "options": [
              "Vielen Dank, das hilft mir sehr.",
              "Okay.",
              "Können Sie das wiederholen?"
            ],
            "answer": 0,
            "explanation": "Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du willst einen Termin absagen.",
            "question": "Was sagst du?",
            "options": [
              "Ich muss den Termin leider absagen.",
              "Ich komme nicht.",
              "Vergessen Sie es."
            ],
            "answer": 0,
            "explanation": "Höfliches Absagen ist im Deutschen wichtig."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Eine Einladung annehmen.",
            "question": "Bei Eine Einladung annehmen ist klare Kommunikation ___.",
            "options": [
              "wichtig",
              "möglich",
              "gut"
            ],
            "answer": "wichtig",
            "explanation": "Bei Eine Einladung annehmen ist klare Kommunikation wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du brauchst Hilfe beim Thema Eine Einladung annehmen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "immer",
              "ist",
              "Hilfe",
              "richtig",
              "um",
              "Höflich",
              "bitten"
            ],
            "answer": [
              5,
              4,
              2,
              6,
              1,
              0,
              3
            ],
            "explanation": "Richtig: Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst eine Frage zum Thema Eine Einladung annehmen.",
            "question": "Könnten ___ mir bitte helfen?",
            "options": [
              "Sie",
              "Arbeit",
              "Antwort"
            ],
            "answer": "Sie",
            "explanation": "Könnten Sie mir bitte helfen?"
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand erklärt dir etwas zum Thema Eine Einladung annehmen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Wertschätzung",
              "bedanken",
              "Sich",
              "zeigt"
            ],
            "answer": [
              2,
              1,
              3,
              0
            ],
            "explanation": "Richtig: Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "fill_blank",
            "situation": "Du willst einen Termin absagen.",
            "question": "Höfliches Absagen ___ im Deutschen wichtig.",
            "options": [
              "ist",
              "muss",
              "falsch"
            ],
            "answer": "ist",
            "explanation": "Höfliches Absagen ist im Deutschen wichtig."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Eine Einladung annehmen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Kein Interesse.",
              "Ich habe keine Ahnung."
            ],
            "answer": 0,
            "explanation": "Bei Eine Einladung annehmen ist klare Kommunikation wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du brauchst Hilfe beim Thema Eine Einladung annehmen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "helfen",
              "Ich weiß es nicht.",
              "Geht mich nichts an."
            ],
            "answer": 0,
            "explanation": "Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst eine Frage zum Thema Eine Einladung annehmen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Könnten Sie mir bitte helfen",
              "Mir egal.",
              "Vielleicht später."
            ],
            "answer": 0,
            "explanation": "Richtig: Könnten Sie mir bitte helfen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand erklärt dir etwas zum Thema Eine Einladung annehmen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Vielen Dank, das hilft mir sehr.",
              "Vielleicht später.",
              "Kein Interesse."
            ],
            "answer": 0,
            "explanation": "Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du willst einen Termin absagen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich muss den Termin leider absagen.",
              "Fragen Sie jemand anderen.",
              "Mir egal."
            ],
            "answer": 0,
            "explanation": "Höfliches Absagen ist im Deutschen wichtig."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Entschuldigung, können Sie mir helfen?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich verstehe das nicht.",
        "context": "Frage stellen"
      },
      {
        "de": "Können Sie das bitte wiederholen?",
        "context": "Antwort geben"
      },
      {
        "de": "Wie sagt man das auf Deutsch?",
        "context": "Problem lösen"
      },
      {
        "de": "Bitte sprechen Sie langsamer.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Das habe ich nicht verstanden.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Vielen Dank für Ihre Hilfe.",
        "context": "Frage stellen"
      },
      {
        "de": "Wo finde ich Informationen dazu?",
        "context": "Antwort geben"
      },
      {
        "de": "Ich habe eine Frage.",
        "context": "Problem lösen"
      },
      {
        "de": "Können Sie mir das erklären?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich bin neu hier.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Das ist sehr wichtig für mich.",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Alternative?",
        "context": "Antwort geben"
      },
      {
        "de": "Wann kann ich wiederkommen?",
        "context": "Problem lösen"
      },
      {
        "de": "Ist das kostenlos?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich würde gerne einen Termin vereinbaren.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Könnten Sie mir bitte weiterhelfen?",
        "context": "Frage stellen"
      },
      {
        "de": "Das muss ich mir noch überlegen.",
        "context": "Antwort geben"
      },
      {
        "de": "Ich bin damit nicht einverstanden.",
        "context": "Problem lösen"
      },
      {
        "de": "Können wir einen Kompromiss finden?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Das erscheint mir zu teuer.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich hätte gerne eine schriftliche Bestätigung.",
        "context": "Frage stellen"
      },
      {
        "de": "Wann ist der nächste freie Termin?",
        "context": "Antwort geben"
      },
      {
        "de": "Gibt es da Ausnahmen?",
        "context": "Problem lösen"
      },
      {
        "de": "Das war ein Missverständnis.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich möchte mich beschweren.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Können Sie das schriftlich bestätigen?",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es einen Ansprechpartner dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Ich brauche noch etwas Zeit.",
        "context": "Problem lösen"
      },
      {
        "de": "Das ist mir leider nicht möglich.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Welche Unterlagen brauche ich?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich komme aus dem Ausland.",
        "context": "Frage stellen"
      },
      {
        "de": "Mein Deutsch ist noch nicht so gut.",
        "context": "Antwort geben"
      },
      {
        "de": "Können Sie mir das auf Papier geben?",
        "context": "Problem lösen"
      },
      {
        "de": "Wo muss ich unterschreiben?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ist das Formular richtig ausgefüllt?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich habe alles dabei.",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Frist dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Was passiert als nächstes?",
        "context": "Problem lösen"
      },
      {
        "de": "Ich warte auf eine Antwort.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Können Sie mich zurückrufen?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich habe eine Beschwerde.",
        "context": "Frage stellen"
      },
      {
        "de": "Das muss dringend erledigt werden.",
        "context": "Antwort geben"
      },
      {
        "de": "Ich bin seit einem Jahr in Deutschland.",
        "context": "Problem lösen"
      },
      {
        "de": "Meine Adresse hat sich geändert.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich brauche eine Bescheinigung.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Bis wann muss ich das erledigen?",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Beratung dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Wo kann ich mich informieren?",
        "context": "Problem lösen"
      },
      {
        "de": "Ich möchte einen Antrag stellen.",
        "context": "Hilfe bitten"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Nichts sagen.",
        "correct": "Höflich und klar antworten.",
        "tip": "Bei Eine Einladung annehmen ist klare Kommunikation wichtig."
      },
      {
        "wrong": "sagen",
        "correct": "helfen",
        "tip": "Höflich um Hilfe bitten ist immer richtig."
      },
      {
        "wrong": "Okay.",
        "correct": "Vielen Dank, das hilft mir sehr.",
        "tip": "Sich bedanken zeigt Wertschätzung."
      }
    ]
  },
  {
    "id": "a2-19",
    "level": "A2",
    "title": "Haustiere",
    "titleDe": "Über Haustiere sprechen",
    "icon": "🐕",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Über Haustiere sprechen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Nichts sagen.",
              "Einfach weggehen."
            ],
            "answer": 0,
            "explanation": "Bei Über Haustiere sprechen ist klare Kommunikation wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du brauchst Hilfe beim Thema Über Haustiere sprechen.",
            "question": "Könnten Sie mir bitte ___?",
            "options": [
              "helfen",
              "sagen",
              "zeigen"
            ],
            "answer": "helfen",
            "explanation": "Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst eine Frage zum Thema Über Haustiere sprechen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sie",
              "Könnten",
              "bitte",
              "mir",
              "helfen"
            ],
            "answer": [
              1,
              0,
              3,
              2,
              4
            ],
            "explanation": "Richtig: Könnten Sie mir bitte helfen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand erklärt dir etwas zum Thema Über Haustiere sprechen.",
            "question": "Was sagst du?",
            "options": [
              "Vielen Dank, das hilft mir sehr.",
              "Okay.",
              "Können Sie das wiederholen?"
            ],
            "answer": 0,
            "explanation": "Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "quick_reaction",
            "situation": "Ein Kollege fragt nach deiner Meinung.",
            "question": "Wie antwortest du?",
            "options": [
              "Ich finde, das ist eine gute Idee.",
              "Keine Ahnung.",
              "Mir egal."
            ],
            "answer": 0,
            "explanation": "Eine begründete Meinung zeigt Engagement."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Über Haustiere sprechen.",
            "question": "Bei ___ Haustiere sprechen ist klare Kommunikation wichtig.",
            "options": [
              "Über",
              "gehe",
              "suche"
            ],
            "answer": "Über",
            "explanation": "Bei Über Haustiere sprechen ist klare Kommunikation wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du brauchst Hilfe beim Thema Über Haustiere sprechen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "bitten",
              "Höflich",
              "Hilfe",
              "immer",
              "ist",
              "richtig",
              "um"
            ],
            "answer": [
              1,
              6,
              2,
              0,
              4,
              3,
              5
            ],
            "explanation": "Richtig: Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst eine Frage zum Thema Über Haustiere sprechen.",
            "question": "Könnten Sie ___ bitte helfen?",
            "options": [
              "mir",
              "gleich",
              "gestern"
            ],
            "answer": "mir",
            "explanation": "Könnten Sie mir bitte helfen?"
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand erklärt dir etwas zum Thema Über Haustiere sprechen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sich",
              "zeigt",
              "bedanken",
              "Wertschätzung"
            ],
            "answer": [
              0,
              2,
              1,
              3
            ],
            "explanation": "Richtig: Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "fill_blank",
            "situation": "Ein Kollege fragt nach deiner Meinung.",
            "question": "Eine begründete Meinung ___ Engagement.",
            "options": [
              "zeigt",
              "gestern",
              "Problem"
            ],
            "answer": "zeigt",
            "explanation": "Eine begründete Meinung zeigt Engagement."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Über Haustiere sprechen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Fragen Sie jemand anderen.",
              "Muss das sein?"
            ],
            "answer": 0,
            "explanation": "Bei Über Haustiere sprechen ist klare Kommunikation wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du brauchst Hilfe beim Thema Über Haustiere sprechen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "helfen",
              "Ich habe keine Ahnung.",
              "Muss das sein?"
            ],
            "answer": 0,
            "explanation": "Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst eine Frage zum Thema Über Haustiere sprechen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Könnten Sie mir bitte helfen",
              "Muss das sein?",
              "Kein Interesse."
            ],
            "answer": 0,
            "explanation": "Richtig: Könnten Sie mir bitte helfen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand erklärt dir etwas zum Thema Über Haustiere sprechen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Vielen Dank, das hilft mir sehr.",
              "Das kann ich nicht.",
              "Geht mich nichts an."
            ],
            "answer": 0,
            "explanation": "Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "quick_reaction",
            "situation": "Ein Kollege fragt nach deiner Meinung.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich finde, das ist eine gute Idee.",
              "Das verstehe ich nicht.",
              "Das ist nicht mein Problem."
            ],
            "answer": 0,
            "explanation": "Eine begründete Meinung zeigt Engagement."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Entschuldigung, können Sie mir helfen?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich verstehe das nicht.",
        "context": "Frage stellen"
      },
      {
        "de": "Können Sie das bitte wiederholen?",
        "context": "Antwort geben"
      },
      {
        "de": "Wie sagt man das auf Deutsch?",
        "context": "Problem lösen"
      },
      {
        "de": "Bitte sprechen Sie langsamer.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Das habe ich nicht verstanden.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Vielen Dank für Ihre Hilfe.",
        "context": "Frage stellen"
      },
      {
        "de": "Wo finde ich Informationen dazu?",
        "context": "Antwort geben"
      },
      {
        "de": "Ich habe eine Frage.",
        "context": "Problem lösen"
      },
      {
        "de": "Können Sie mir das erklären?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich bin neu hier.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Das ist sehr wichtig für mich.",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Alternative?",
        "context": "Antwort geben"
      },
      {
        "de": "Wann kann ich wiederkommen?",
        "context": "Problem lösen"
      },
      {
        "de": "Ist das kostenlos?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich würde gerne einen Termin vereinbaren.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Könnten Sie mir bitte weiterhelfen?",
        "context": "Frage stellen"
      },
      {
        "de": "Das muss ich mir noch überlegen.",
        "context": "Antwort geben"
      },
      {
        "de": "Ich bin damit nicht einverstanden.",
        "context": "Problem lösen"
      },
      {
        "de": "Können wir einen Kompromiss finden?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Das erscheint mir zu teuer.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich hätte gerne eine schriftliche Bestätigung.",
        "context": "Frage stellen"
      },
      {
        "de": "Wann ist der nächste freie Termin?",
        "context": "Antwort geben"
      },
      {
        "de": "Gibt es da Ausnahmen?",
        "context": "Problem lösen"
      },
      {
        "de": "Das war ein Missverständnis.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich möchte mich beschweren.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Können Sie das schriftlich bestätigen?",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es einen Ansprechpartner dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Ich brauche noch etwas Zeit.",
        "context": "Problem lösen"
      },
      {
        "de": "Das ist mir leider nicht möglich.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Welche Unterlagen brauche ich?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich komme aus dem Ausland.",
        "context": "Frage stellen"
      },
      {
        "de": "Mein Deutsch ist noch nicht so gut.",
        "context": "Antwort geben"
      },
      {
        "de": "Können Sie mir das auf Papier geben?",
        "context": "Problem lösen"
      },
      {
        "de": "Wo muss ich unterschreiben?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ist das Formular richtig ausgefüllt?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich habe alles dabei.",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Frist dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Was passiert als nächstes?",
        "context": "Problem lösen"
      },
      {
        "de": "Ich warte auf eine Antwort.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Können Sie mich zurückrufen?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich habe eine Beschwerde.",
        "context": "Frage stellen"
      },
      {
        "de": "Das muss dringend erledigt werden.",
        "context": "Antwort geben"
      },
      {
        "de": "Ich bin seit einem Jahr in Deutschland.",
        "context": "Problem lösen"
      },
      {
        "de": "Meine Adresse hat sich geändert.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich brauche eine Bescheinigung.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Bis wann muss ich das erledigen?",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Beratung dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Wo kann ich mich informieren?",
        "context": "Problem lösen"
      },
      {
        "de": "Ich möchte einen Antrag stellen.",
        "context": "Hilfe bitten"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Nichts sagen.",
        "correct": "Höflich und klar antworten.",
        "tip": "Bei Über Haustiere sprechen ist klare Kommunikation wichtig."
      },
      {
        "wrong": "sagen",
        "correct": "helfen",
        "tip": "Höflich um Hilfe bitten ist immer richtig."
      },
      {
        "wrong": "Okay.",
        "correct": "Vielen Dank, das hilft mir sehr.",
        "tip": "Sich bedanken zeigt Wertschätzung."
      }
    ]
  },
  {
    "id": "a2-20",
    "level": "A2",
    "title": "Steuererklärung",
    "titleDe": "Steuererklärung einfach",
    "icon": "💰",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Steuererklärung einfach.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Nichts sagen.",
              "Einfach weggehen."
            ],
            "answer": 0,
            "explanation": "Bei Steuererklärung einfach ist klare Kommunikation wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du brauchst Hilfe beim Thema Steuererklärung einfach.",
            "question": "Könnten Sie mir bitte ___?",
            "options": [
              "helfen",
              "sagen",
              "zeigen"
            ],
            "answer": "helfen",
            "explanation": "Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst eine Frage zum Thema Steuererklärung einfach.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sie",
              "Könnten",
              "bitte",
              "mir",
              "helfen"
            ],
            "answer": [
              1,
              0,
              3,
              2,
              4
            ],
            "explanation": "Richtig: Könnten Sie mir bitte helfen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand erklärt dir etwas zum Thema Steuererklärung einfach.",
            "question": "Was sagst du?",
            "options": [
              "Vielen Dank, das hilft mir sehr.",
              "Okay.",
              "Können Sie das wiederholen?"
            ],
            "answer": 0,
            "explanation": "Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du erhältst ein Paket.",
            "question": "Was machst du?",
            "options": [
              "Ich unterschreibe und bedanke mich.",
              "Ich nehme es ohne Worte.",
              "Ich öffne es vor dem Postboten."
            ],
            "answer": 0,
            "explanation": "Beim Paketempfang unterschreibt man die Zustellung."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Steuererklärung einfach.",
            "question": "Bei Steuererklärung einfach ___ klare Kommunikation wichtig.",
            "options": [
              "ist",
              "falsch",
              "muss"
            ],
            "answer": "ist",
            "explanation": "Bei Steuererklärung einfach ist klare Kommunikation wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du brauchst Hilfe beim Thema Steuererklärung einfach.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "richtig",
              "um",
              "ist",
              "Höflich",
              "immer",
              "bitten",
              "Hilfe"
            ],
            "answer": [
              3,
              1,
              6,
              5,
              2,
              4,
              0
            ],
            "explanation": "Richtig: Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst eine Frage zum Thema Steuererklärung einfach.",
            "question": "Könnten Sie mir ___ helfen?",
            "options": [
              "bitte",
              "morgen",
              "gleich"
            ],
            "answer": "bitte",
            "explanation": "Könnten Sie mir bitte helfen?"
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand erklärt dir etwas zum Thema Steuererklärung einfach.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "zeigt",
              "Sich",
              "bedanken",
              "Wertschätzung"
            ],
            "answer": [
              1,
              2,
              0,
              3
            ],
            "explanation": "Richtig: Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "fill_blank",
            "situation": "Du erhältst ein Paket.",
            "question": "Beim Paketempfang unterschreibt man ___ Zustellung.",
            "options": [
              "die",
              "schnell",
              "jetzt"
            ],
            "answer": "die",
            "explanation": "Beim Paketempfang unterschreibt man die Zustellung."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Steuererklärung einfach.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Mir egal.",
              "Vielleicht später."
            ],
            "answer": 0,
            "explanation": "Bei Steuererklärung einfach ist klare Kommunikation wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du brauchst Hilfe beim Thema Steuererklärung einfach.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "helfen",
              "Das verstehe ich nicht.",
              "Muss das sein?"
            ],
            "answer": 0,
            "explanation": "Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst eine Frage zum Thema Steuererklärung einfach.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Könnten Sie mir bitte helfen",
              "Ich weiß es nicht.",
              "Fragen Sie jemand anderen."
            ],
            "answer": 0,
            "explanation": "Richtig: Könnten Sie mir bitte helfen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand erklärt dir etwas zum Thema Steuererklärung einfach.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Vielen Dank, das hilft mir sehr.",
              "Das ist nicht mein Problem.",
              "Muss das sein?"
            ],
            "answer": 0,
            "explanation": "Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du erhältst ein Paket.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich unterschreibe und bedanke mich.",
              "Ich habe keine Ahnung.",
              "Vielleicht später."
            ],
            "answer": 0,
            "explanation": "Beim Paketempfang unterschreibt man die Zustellung."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Entschuldigung, können Sie mir helfen?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich verstehe das nicht.",
        "context": "Frage stellen"
      },
      {
        "de": "Können Sie das bitte wiederholen?",
        "context": "Antwort geben"
      },
      {
        "de": "Wie sagt man das auf Deutsch?",
        "context": "Problem lösen"
      },
      {
        "de": "Bitte sprechen Sie langsamer.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Das habe ich nicht verstanden.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Vielen Dank für Ihre Hilfe.",
        "context": "Frage stellen"
      },
      {
        "de": "Wo finde ich Informationen dazu?",
        "context": "Antwort geben"
      },
      {
        "de": "Ich habe eine Frage.",
        "context": "Problem lösen"
      },
      {
        "de": "Können Sie mir das erklären?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich bin neu hier.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Das ist sehr wichtig für mich.",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Alternative?",
        "context": "Antwort geben"
      },
      {
        "de": "Wann kann ich wiederkommen?",
        "context": "Problem lösen"
      },
      {
        "de": "Ist das kostenlos?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich würde gerne einen Termin vereinbaren.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Könnten Sie mir bitte weiterhelfen?",
        "context": "Frage stellen"
      },
      {
        "de": "Das muss ich mir noch überlegen.",
        "context": "Antwort geben"
      },
      {
        "de": "Ich bin damit nicht einverstanden.",
        "context": "Problem lösen"
      },
      {
        "de": "Können wir einen Kompromiss finden?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Das erscheint mir zu teuer.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich hätte gerne eine schriftliche Bestätigung.",
        "context": "Frage stellen"
      },
      {
        "de": "Wann ist der nächste freie Termin?",
        "context": "Antwort geben"
      },
      {
        "de": "Gibt es da Ausnahmen?",
        "context": "Problem lösen"
      },
      {
        "de": "Das war ein Missverständnis.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich möchte mich beschweren.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Können Sie das schriftlich bestätigen?",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es einen Ansprechpartner dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Ich brauche noch etwas Zeit.",
        "context": "Problem lösen"
      },
      {
        "de": "Das ist mir leider nicht möglich.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Welche Unterlagen brauche ich?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich komme aus dem Ausland.",
        "context": "Frage stellen"
      },
      {
        "de": "Mein Deutsch ist noch nicht so gut.",
        "context": "Antwort geben"
      },
      {
        "de": "Können Sie mir das auf Papier geben?",
        "context": "Problem lösen"
      },
      {
        "de": "Wo muss ich unterschreiben?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ist das Formular richtig ausgefüllt?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich habe alles dabei.",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Frist dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Was passiert als nächstes?",
        "context": "Problem lösen"
      },
      {
        "de": "Ich warte auf eine Antwort.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Können Sie mich zurückrufen?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich habe eine Beschwerde.",
        "context": "Frage stellen"
      },
      {
        "de": "Das muss dringend erledigt werden.",
        "context": "Antwort geben"
      },
      {
        "de": "Ich bin seit einem Jahr in Deutschland.",
        "context": "Problem lösen"
      },
      {
        "de": "Meine Adresse hat sich geändert.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich brauche eine Bescheinigung.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Bis wann muss ich das erledigen?",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Beratung dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Wo kann ich mich informieren?",
        "context": "Problem lösen"
      },
      {
        "de": "Ich möchte einen Antrag stellen.",
        "context": "Hilfe bitten"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Nichts sagen.",
        "correct": "Höflich und klar antworten.",
        "tip": "Bei Steuererklärung einfach ist klare Kommunikation wichtig."
      },
      {
        "wrong": "sagen",
        "correct": "helfen",
        "tip": "Höflich um Hilfe bitten ist immer richtig."
      },
      {
        "wrong": "Okay.",
        "correct": "Vielen Dank, das hilft mir sehr.",
        "tip": "Sich bedanken zeigt Wertschätzung."
      }
    ]
  },
  {
    "id": "a2-21",
    "level": "A2",
    "title": "Handyvertrag",
    "titleDe": "Handyvertrag abschließen",
    "icon": "📱",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Handyvertrag abschließen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Nichts sagen.",
              "Einfach weggehen."
            ],
            "answer": 0,
            "explanation": "Bei Handyvertrag abschließen ist klare Kommunikation wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du brauchst Hilfe beim Thema Handyvertrag abschließen.",
            "question": "Könnten Sie mir bitte ___?",
            "options": [
              "helfen",
              "sagen",
              "zeigen"
            ],
            "answer": "helfen",
            "explanation": "Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst eine Frage zum Thema Handyvertrag abschließen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sie",
              "Könnten",
              "bitte",
              "mir",
              "helfen"
            ],
            "answer": [
              1,
              0,
              3,
              2,
              4
            ],
            "explanation": "Richtig: Könnten Sie mir bitte helfen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand erklärt dir etwas zum Thema Handyvertrag abschließen.",
            "question": "Was sagst du?",
            "options": [
              "Vielen Dank, das hilft mir sehr.",
              "Okay.",
              "Können Sie das wiederholen?"
            ],
            "answer": 0,
            "explanation": "Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "quick_reaction",
            "situation": "Dein Nachbar beschwert sich über Lärm.",
            "question": "Wie reagierst du?",
            "options": [
              "Es tut mir leid, ich werde leiser sein.",
              "Das ist mir egal.",
              "Rufen Sie die Polizei."
            ],
            "answer": 0,
            "explanation": "Sich entschuldigen löst Konflikte schneller."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Handyvertrag abschließen.",
            "question": "Bei Handyvertrag abschließen ist klare Kommunikation ___.",
            "options": [
              "wichtig",
              "schlecht",
              "nötig"
            ],
            "answer": "wichtig",
            "explanation": "Bei Handyvertrag abschließen ist klare Kommunikation wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du brauchst Hilfe beim Thema Handyvertrag abschließen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "ist",
              "bitten",
              "Hilfe",
              "richtig",
              "Höflich",
              "um",
              "immer"
            ],
            "answer": [
              4,
              5,
              2,
              1,
              0,
              6,
              3
            ],
            "explanation": "Richtig: Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst eine Frage zum Thema Handyvertrag abschließen.",
            "question": "Könnten Sie mir bitte ___?",
            "options": [
              "helfen",
              "wichtig",
              "morgen"
            ],
            "answer": "helfen",
            "explanation": "Könnten Sie mir bitte helfen?"
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand erklärt dir etwas zum Thema Handyvertrag abschließen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sich",
              "zeigt",
              "Wertschätzung",
              "bedanken"
            ],
            "answer": [
              0,
              3,
              1,
              2
            ],
            "explanation": "Richtig: Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "fill_blank",
            "situation": "Dein Nachbar beschwert sich über Lärm.",
            "question": "Sich entschuldigen löst ___ schneller.",
            "options": [
              "Konflikte",
              "Geld",
              "Adresse"
            ],
            "answer": "Konflikte",
            "explanation": "Sich entschuldigen löst Konflikte schneller."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Handyvertrag abschließen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Vielleicht später.",
              "Kein Interesse."
            ],
            "answer": 0,
            "explanation": "Bei Handyvertrag abschließen ist klare Kommunikation wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du brauchst Hilfe beim Thema Handyvertrag abschließen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "helfen",
              "Das verstehe ich nicht.",
              "Das ist nicht mein Problem."
            ],
            "answer": 0,
            "explanation": "Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst eine Frage zum Thema Handyvertrag abschließen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Könnten Sie mir bitte helfen",
              "Kein Interesse.",
              "Geht mich nichts an."
            ],
            "answer": 0,
            "explanation": "Richtig: Könnten Sie mir bitte helfen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand erklärt dir etwas zum Thema Handyvertrag abschließen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Vielen Dank, das hilft mir sehr.",
              "Vielleicht später.",
              "Ich habe keine Ahnung."
            ],
            "answer": 0,
            "explanation": "Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "quick_reaction",
            "situation": "Dein Nachbar beschwert sich über Lärm.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Es tut mir leid, ich werde leiser sein.",
              "Vielleicht später.",
              "Ich habe keine Ahnung."
            ],
            "answer": 0,
            "explanation": "Sich entschuldigen löst Konflikte schneller."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Entschuldigung, können Sie mir helfen?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich verstehe das nicht.",
        "context": "Frage stellen"
      },
      {
        "de": "Können Sie das bitte wiederholen?",
        "context": "Antwort geben"
      },
      {
        "de": "Wie sagt man das auf Deutsch?",
        "context": "Problem lösen"
      },
      {
        "de": "Bitte sprechen Sie langsamer.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Das habe ich nicht verstanden.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Vielen Dank für Ihre Hilfe.",
        "context": "Frage stellen"
      },
      {
        "de": "Wo finde ich Informationen dazu?",
        "context": "Antwort geben"
      },
      {
        "de": "Ich habe eine Frage.",
        "context": "Problem lösen"
      },
      {
        "de": "Können Sie mir das erklären?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich bin neu hier.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Das ist sehr wichtig für mich.",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Alternative?",
        "context": "Antwort geben"
      },
      {
        "de": "Wann kann ich wiederkommen?",
        "context": "Problem lösen"
      },
      {
        "de": "Ist das kostenlos?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich würde gerne einen Termin vereinbaren.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Könnten Sie mir bitte weiterhelfen?",
        "context": "Frage stellen"
      },
      {
        "de": "Das muss ich mir noch überlegen.",
        "context": "Antwort geben"
      },
      {
        "de": "Ich bin damit nicht einverstanden.",
        "context": "Problem lösen"
      },
      {
        "de": "Können wir einen Kompromiss finden?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Das erscheint mir zu teuer.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich hätte gerne eine schriftliche Bestätigung.",
        "context": "Frage stellen"
      },
      {
        "de": "Wann ist der nächste freie Termin?",
        "context": "Antwort geben"
      },
      {
        "de": "Gibt es da Ausnahmen?",
        "context": "Problem lösen"
      },
      {
        "de": "Das war ein Missverständnis.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich möchte mich beschweren.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Können Sie das schriftlich bestätigen?",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es einen Ansprechpartner dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Ich brauche noch etwas Zeit.",
        "context": "Problem lösen"
      },
      {
        "de": "Das ist mir leider nicht möglich.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Welche Unterlagen brauche ich?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich komme aus dem Ausland.",
        "context": "Frage stellen"
      },
      {
        "de": "Mein Deutsch ist noch nicht so gut.",
        "context": "Antwort geben"
      },
      {
        "de": "Können Sie mir das auf Papier geben?",
        "context": "Problem lösen"
      },
      {
        "de": "Wo muss ich unterschreiben?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ist das Formular richtig ausgefüllt?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich habe alles dabei.",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Frist dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Was passiert als nächstes?",
        "context": "Problem lösen"
      },
      {
        "de": "Ich warte auf eine Antwort.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Können Sie mich zurückrufen?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich habe eine Beschwerde.",
        "context": "Frage stellen"
      },
      {
        "de": "Das muss dringend erledigt werden.",
        "context": "Antwort geben"
      },
      {
        "de": "Ich bin seit einem Jahr in Deutschland.",
        "context": "Problem lösen"
      },
      {
        "de": "Meine Adresse hat sich geändert.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich brauche eine Bescheinigung.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Bis wann muss ich das erledigen?",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Beratung dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Wo kann ich mich informieren?",
        "context": "Problem lösen"
      },
      {
        "de": "Ich möchte einen Antrag stellen.",
        "context": "Hilfe bitten"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Nichts sagen.",
        "correct": "Höflich und klar antworten.",
        "tip": "Bei Handyvertrag abschließen ist klare Kommunikation wichtig."
      },
      {
        "wrong": "sagen",
        "correct": "helfen",
        "tip": "Höflich um Hilfe bitten ist immer richtig."
      },
      {
        "wrong": "Okay.",
        "correct": "Vielen Dank, das hilft mir sehr.",
        "tip": "Sich bedanken zeigt Wertschätzung."
      }
    ]
  },
  {
    "id": "a2-22",
    "level": "A2",
    "title": "Waschmaschine",
    "titleDe": "Waschmaschine benutzen",
    "icon": "🧺",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Waschmaschine benutzen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Nichts sagen.",
              "Einfach weggehen."
            ],
            "answer": 0,
            "explanation": "Bei Waschmaschine benutzen ist klare Kommunikation wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du brauchst Hilfe beim Thema Waschmaschine benutzen.",
            "question": "Könnten Sie mir bitte ___?",
            "options": [
              "helfen",
              "sagen",
              "zeigen"
            ],
            "answer": "helfen",
            "explanation": "Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst eine Frage zum Thema Waschmaschine benutzen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sie",
              "Könnten",
              "bitte",
              "mir",
              "helfen"
            ],
            "answer": [
              1,
              0,
              3,
              2,
              4
            ],
            "explanation": "Richtig: Könnten Sie mir bitte helfen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand erklärt dir etwas zum Thema Waschmaschine benutzen.",
            "question": "Was sagst du?",
            "options": [
              "Vielen Dank, das hilft mir sehr.",
              "Okay.",
              "Können Sie das wiederholen?"
            ],
            "answer": 0,
            "explanation": "Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bekommst eine Rechnung per Post.",
            "question": "Was machst du?",
            "options": [
              "Ich überweise den Betrag bis zum Fälligkeitsdatum.",
              "Ich werfe sie weg.",
              "Ich rufe die Polizei."
            ],
            "answer": 0,
            "explanation": "Rechnungen pünktlich bezahlen ist wichtig."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Waschmaschine benutzen.",
            "question": "Bei Waschmaschine benutzen ist klare ___ wichtig.",
            "options": [
              "Kommunikation",
              "dort",
              "Geld"
            ],
            "answer": "Kommunikation",
            "explanation": "Bei Waschmaschine benutzen ist klare Kommunikation wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du brauchst Hilfe beim Thema Waschmaschine benutzen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "immer",
              "Höflich",
              "bitten",
              "um",
              "ist",
              "richtig",
              "Hilfe"
            ],
            "answer": [
              1,
              3,
              6,
              2,
              4,
              0,
              5
            ],
            "explanation": "Richtig: Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst eine Frage zum Thema Waschmaschine benutzen.",
            "question": "Könnten Sie ___ bitte helfen?",
            "options": [
              "mir",
              "Hilfe",
              "Antwort"
            ],
            "answer": "mir",
            "explanation": "Könnten Sie mir bitte helfen?"
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand erklärt dir etwas zum Thema Waschmaschine benutzen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "bedanken",
              "zeigt",
              "Sich",
              "Wertschätzung"
            ],
            "answer": [
              2,
              0,
              1,
              3
            ],
            "explanation": "Richtig: Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "fill_blank",
            "situation": "Du bekommst eine Rechnung per Post.",
            "question": "Rechnungen pünktlich bezahlen ___ wichtig.",
            "options": [
              "ist",
              "möglich",
              "Geld"
            ],
            "answer": "ist",
            "explanation": "Rechnungen pünktlich bezahlen ist wichtig."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Waschmaschine benutzen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Kein Interesse.",
              "Vielleicht später."
            ],
            "answer": 0,
            "explanation": "Bei Waschmaschine benutzen ist klare Kommunikation wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du brauchst Hilfe beim Thema Waschmaschine benutzen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "helfen",
              "Fragen Sie jemand anderen.",
              "Kein Interesse."
            ],
            "answer": 0,
            "explanation": "Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst eine Frage zum Thema Waschmaschine benutzen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Könnten Sie mir bitte helfen",
              "Geht mich nichts an.",
              "Kein Interesse."
            ],
            "answer": 0,
            "explanation": "Richtig: Könnten Sie mir bitte helfen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand erklärt dir etwas zum Thema Waschmaschine benutzen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Vielen Dank, das hilft mir sehr.",
              "Ich weiß es nicht.",
              "Ich habe keine Ahnung."
            ],
            "answer": 0,
            "explanation": "Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bekommst eine Rechnung per Post.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich überweise den Betrag bis zum Fälligkeitsdatum.",
              "Kein Interesse.",
              "Geht mich nichts an."
            ],
            "answer": 0,
            "explanation": "Rechnungen pünktlich bezahlen ist wichtig."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Entschuldigung, können Sie mir helfen?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich verstehe das nicht.",
        "context": "Frage stellen"
      },
      {
        "de": "Können Sie das bitte wiederholen?",
        "context": "Antwort geben"
      },
      {
        "de": "Wie sagt man das auf Deutsch?",
        "context": "Problem lösen"
      },
      {
        "de": "Bitte sprechen Sie langsamer.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Das habe ich nicht verstanden.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Vielen Dank für Ihre Hilfe.",
        "context": "Frage stellen"
      },
      {
        "de": "Wo finde ich Informationen dazu?",
        "context": "Antwort geben"
      },
      {
        "de": "Ich habe eine Frage.",
        "context": "Problem lösen"
      },
      {
        "de": "Können Sie mir das erklären?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich bin neu hier.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Das ist sehr wichtig für mich.",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Alternative?",
        "context": "Antwort geben"
      },
      {
        "de": "Wann kann ich wiederkommen?",
        "context": "Problem lösen"
      },
      {
        "de": "Ist das kostenlos?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich würde gerne einen Termin vereinbaren.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Könnten Sie mir bitte weiterhelfen?",
        "context": "Frage stellen"
      },
      {
        "de": "Das muss ich mir noch überlegen.",
        "context": "Antwort geben"
      },
      {
        "de": "Ich bin damit nicht einverstanden.",
        "context": "Problem lösen"
      },
      {
        "de": "Können wir einen Kompromiss finden?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Das erscheint mir zu teuer.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich hätte gerne eine schriftliche Bestätigung.",
        "context": "Frage stellen"
      },
      {
        "de": "Wann ist der nächste freie Termin?",
        "context": "Antwort geben"
      },
      {
        "de": "Gibt es da Ausnahmen?",
        "context": "Problem lösen"
      },
      {
        "de": "Das war ein Missverständnis.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich möchte mich beschweren.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Können Sie das schriftlich bestätigen?",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es einen Ansprechpartner dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Ich brauche noch etwas Zeit.",
        "context": "Problem lösen"
      },
      {
        "de": "Das ist mir leider nicht möglich.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Welche Unterlagen brauche ich?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich komme aus dem Ausland.",
        "context": "Frage stellen"
      },
      {
        "de": "Mein Deutsch ist noch nicht so gut.",
        "context": "Antwort geben"
      },
      {
        "de": "Können Sie mir das auf Papier geben?",
        "context": "Problem lösen"
      },
      {
        "de": "Wo muss ich unterschreiben?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ist das Formular richtig ausgefüllt?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich habe alles dabei.",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Frist dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Was passiert als nächstes?",
        "context": "Problem lösen"
      },
      {
        "de": "Ich warte auf eine Antwort.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Können Sie mich zurückrufen?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich habe eine Beschwerde.",
        "context": "Frage stellen"
      },
      {
        "de": "Das muss dringend erledigt werden.",
        "context": "Antwort geben"
      },
      {
        "de": "Ich bin seit einem Jahr in Deutschland.",
        "context": "Problem lösen"
      },
      {
        "de": "Meine Adresse hat sich geändert.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich brauche eine Bescheinigung.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Bis wann muss ich das erledigen?",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Beratung dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Wo kann ich mich informieren?",
        "context": "Problem lösen"
      },
      {
        "de": "Ich möchte einen Antrag stellen.",
        "context": "Hilfe bitten"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Nichts sagen.",
        "correct": "Höflich und klar antworten.",
        "tip": "Bei Waschmaschine benutzen ist klare Kommunikation wichtig."
      },
      {
        "wrong": "sagen",
        "correct": "helfen",
        "tip": "Höflich um Hilfe bitten ist immer richtig."
      },
      {
        "wrong": "Okay.",
        "correct": "Vielen Dank, das hilft mir sehr.",
        "tip": "Sich bedanken zeigt Wertschätzung."
      }
    ]
  },
  {
    "id": "a2-23",
    "level": "A2",
    "title": "Parkplatz",
    "titleDe": "Einen Parkplatz finden",
    "icon": "🅿️",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Einen Parkplatz finden.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Nichts sagen.",
              "Einfach weggehen."
            ],
            "answer": 0,
            "explanation": "Bei Einen Parkplatz finden ist klare Kommunikation wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du brauchst Hilfe beim Thema Einen Parkplatz finden.",
            "question": "Könnten Sie mir bitte ___?",
            "options": [
              "helfen",
              "sagen",
              "zeigen"
            ],
            "answer": "helfen",
            "explanation": "Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst eine Frage zum Thema Einen Parkplatz finden.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sie",
              "Könnten",
              "bitte",
              "mir",
              "helfen"
            ],
            "answer": [
              1,
              0,
              3,
              2,
              4
            ],
            "explanation": "Richtig: Könnten Sie mir bitte helfen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand erklärt dir etwas zum Thema Einen Parkplatz finden.",
            "question": "Was sagst du?",
            "options": [
              "Vielen Dank, das hilft mir sehr.",
              "Okay.",
              "Können Sie das wiederholen?"
            ],
            "answer": 0,
            "explanation": "Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du willst einen Termin absagen.",
            "question": "Was sagst du?",
            "options": [
              "Ich muss den Termin leider absagen.",
              "Ich komme nicht.",
              "Vergessen Sie es."
            ],
            "answer": 0,
            "explanation": "Höfliches Absagen ist im Deutschen wichtig."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Einen Parkplatz finden.",
            "question": "Bei Einen Parkplatz finden ___ klare Kommunikation wichtig.",
            "options": [
              "ist",
              "falsch",
              "Zeit"
            ],
            "answer": "ist",
            "explanation": "Bei Einen Parkplatz finden ist klare Kommunikation wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du brauchst Hilfe beim Thema Einen Parkplatz finden.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "ist",
              "bitten",
              "richtig",
              "um",
              "immer",
              "Hilfe",
              "Höflich"
            ],
            "answer": [
              6,
              3,
              5,
              1,
              0,
              4,
              2
            ],
            "explanation": "Richtig: Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst eine Frage zum Thema Einen Parkplatz finden.",
            "question": "Könnten Sie mir bitte ___?",
            "options": [
              "helfen",
              "nehme",
              "frage"
            ],
            "answer": "helfen",
            "explanation": "Könnten Sie mir bitte helfen?"
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand erklärt dir etwas zum Thema Einen Parkplatz finden.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Wertschätzung",
              "zeigt",
              "Sich",
              "bedanken"
            ],
            "answer": [
              2,
              3,
              1,
              0
            ],
            "explanation": "Richtig: Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "fill_blank",
            "situation": "Du willst einen Termin absagen.",
            "question": "Höfliches Absagen ist im ___ wichtig.",
            "options": [
              "Deutschen",
              "darf",
              "falsch"
            ],
            "answer": "Deutschen",
            "explanation": "Höfliches Absagen ist im Deutschen wichtig."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Einen Parkplatz finden.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Ich weiß es nicht.",
              "Geht mich nichts an."
            ],
            "answer": 0,
            "explanation": "Bei Einen Parkplatz finden ist klare Kommunikation wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du brauchst Hilfe beim Thema Einen Parkplatz finden.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "helfen",
              "Das ist nicht mein Problem.",
              "Kein Interesse."
            ],
            "answer": 0,
            "explanation": "Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst eine Frage zum Thema Einen Parkplatz finden.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Könnten Sie mir bitte helfen",
              "Vielleicht später.",
              "Das verstehe ich nicht."
            ],
            "answer": 0,
            "explanation": "Richtig: Könnten Sie mir bitte helfen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand erklärt dir etwas zum Thema Einen Parkplatz finden.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Vielen Dank, das hilft mir sehr.",
              "Fragen Sie jemand anderen.",
              "Das verstehe ich nicht."
            ],
            "answer": 0,
            "explanation": "Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du willst einen Termin absagen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich muss den Termin leider absagen.",
              "Keine Lust.",
              "Fragen Sie jemand anderen."
            ],
            "answer": 0,
            "explanation": "Höfliches Absagen ist im Deutschen wichtig."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Entschuldigung, können Sie mir helfen?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich verstehe das nicht.",
        "context": "Frage stellen"
      },
      {
        "de": "Können Sie das bitte wiederholen?",
        "context": "Antwort geben"
      },
      {
        "de": "Wie sagt man das auf Deutsch?",
        "context": "Problem lösen"
      },
      {
        "de": "Bitte sprechen Sie langsamer.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Das habe ich nicht verstanden.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Vielen Dank für Ihre Hilfe.",
        "context": "Frage stellen"
      },
      {
        "de": "Wo finde ich Informationen dazu?",
        "context": "Antwort geben"
      },
      {
        "de": "Ich habe eine Frage.",
        "context": "Problem lösen"
      },
      {
        "de": "Können Sie mir das erklären?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich bin neu hier.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Das ist sehr wichtig für mich.",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Alternative?",
        "context": "Antwort geben"
      },
      {
        "de": "Wann kann ich wiederkommen?",
        "context": "Problem lösen"
      },
      {
        "de": "Ist das kostenlos?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich würde gerne einen Termin vereinbaren.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Könnten Sie mir bitte weiterhelfen?",
        "context": "Frage stellen"
      },
      {
        "de": "Das muss ich mir noch überlegen.",
        "context": "Antwort geben"
      },
      {
        "de": "Ich bin damit nicht einverstanden.",
        "context": "Problem lösen"
      },
      {
        "de": "Können wir einen Kompromiss finden?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Das erscheint mir zu teuer.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich hätte gerne eine schriftliche Bestätigung.",
        "context": "Frage stellen"
      },
      {
        "de": "Wann ist der nächste freie Termin?",
        "context": "Antwort geben"
      },
      {
        "de": "Gibt es da Ausnahmen?",
        "context": "Problem lösen"
      },
      {
        "de": "Das war ein Missverständnis.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich möchte mich beschweren.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Können Sie das schriftlich bestätigen?",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es einen Ansprechpartner dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Ich brauche noch etwas Zeit.",
        "context": "Problem lösen"
      },
      {
        "de": "Das ist mir leider nicht möglich.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Welche Unterlagen brauche ich?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich komme aus dem Ausland.",
        "context": "Frage stellen"
      },
      {
        "de": "Mein Deutsch ist noch nicht so gut.",
        "context": "Antwort geben"
      },
      {
        "de": "Können Sie mir das auf Papier geben?",
        "context": "Problem lösen"
      },
      {
        "de": "Wo muss ich unterschreiben?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ist das Formular richtig ausgefüllt?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich habe alles dabei.",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Frist dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Was passiert als nächstes?",
        "context": "Problem lösen"
      },
      {
        "de": "Ich warte auf eine Antwort.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Können Sie mich zurückrufen?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich habe eine Beschwerde.",
        "context": "Frage stellen"
      },
      {
        "de": "Das muss dringend erledigt werden.",
        "context": "Antwort geben"
      },
      {
        "de": "Ich bin seit einem Jahr in Deutschland.",
        "context": "Problem lösen"
      },
      {
        "de": "Meine Adresse hat sich geändert.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich brauche eine Bescheinigung.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Bis wann muss ich das erledigen?",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Beratung dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Wo kann ich mich informieren?",
        "context": "Problem lösen"
      },
      {
        "de": "Ich möchte einen Antrag stellen.",
        "context": "Hilfe bitten"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Nichts sagen.",
        "correct": "Höflich und klar antworten.",
        "tip": "Bei Einen Parkplatz finden ist klare Kommunikation wichtig."
      },
      {
        "wrong": "sagen",
        "correct": "helfen",
        "tip": "Höflich um Hilfe bitten ist immer richtig."
      },
      {
        "wrong": "Okay.",
        "correct": "Vielen Dank, das hilft mir sehr.",
        "tip": "Sich bedanken zeigt Wertschätzung."
      }
    ]
  },
  {
    "id": "a2-24",
    "level": "A2",
    "title": "Fundbüro",
    "titleDe": "Im Fundbüro",
    "icon": "🔍",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Im Fundbüro.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Nichts sagen.",
              "Einfach weggehen."
            ],
            "answer": 0,
            "explanation": "Bei Im Fundbüro ist klare Kommunikation wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du brauchst Hilfe beim Thema Im Fundbüro.",
            "question": "Könnten Sie mir bitte ___?",
            "options": [
              "helfen",
              "sagen",
              "zeigen"
            ],
            "answer": "helfen",
            "explanation": "Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst eine Frage zum Thema Im Fundbüro.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sie",
              "Könnten",
              "bitte",
              "mir",
              "helfen"
            ],
            "answer": [
              1,
              0,
              3,
              2,
              4
            ],
            "explanation": "Richtig: Könnten Sie mir bitte helfen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand erklärt dir etwas zum Thema Im Fundbüro.",
            "question": "Was sagst du?",
            "options": [
              "Vielen Dank, das hilft mir sehr.",
              "Okay.",
              "Können Sie das wiederholen?"
            ],
            "answer": 0,
            "explanation": "Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "quick_reaction",
            "situation": "Ein Kollege fragt nach deiner Meinung.",
            "question": "Wie antwortest du?",
            "options": [
              "Ich finde, das ist eine gute Idee.",
              "Keine Ahnung.",
              "Mir egal."
            ],
            "answer": 0,
            "explanation": "Eine begründete Meinung zeigt Engagement."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Im Fundbüro.",
            "question": "Bei Im Fundbüro ___ klare Kommunikation wichtig.",
            "options": [
              "ist",
              "mache",
              "bitte"
            ],
            "answer": "ist",
            "explanation": "Bei Im Fundbüro ist klare Kommunikation wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du brauchst Hilfe beim Thema Im Fundbüro.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Hilfe",
              "immer",
              "Höflich",
              "bitten",
              "um",
              "ist",
              "richtig"
            ],
            "answer": [
              2,
              4,
              0,
              3,
              5,
              1,
              6
            ],
            "explanation": "Richtig: Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst eine Frage zum Thema Im Fundbüro.",
            "question": "Könnten Sie mir ___ helfen?",
            "options": [
              "bitte",
              "gleich",
              "jetzt"
            ],
            "answer": "bitte",
            "explanation": "Könnten Sie mir bitte helfen?"
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand erklärt dir etwas zum Thema Im Fundbüro.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "bedanken",
              "zeigt",
              "Sich",
              "Wertschätzung"
            ],
            "answer": [
              2,
              0,
              1,
              3
            ],
            "explanation": "Richtig: Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "fill_blank",
            "situation": "Ein Kollege fragt nach deiner Meinung.",
            "question": "Eine begründete Meinung ___ Engagement.",
            "options": [
              "zeigt",
              "schlecht",
              "nehme"
            ],
            "answer": "zeigt",
            "explanation": "Eine begründete Meinung zeigt Engagement."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Im Fundbüro.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Vielleicht später.",
              "Kein Interesse."
            ],
            "answer": 0,
            "explanation": "Bei Im Fundbüro ist klare Kommunikation wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du brauchst Hilfe beim Thema Im Fundbüro.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "helfen",
              "Das verstehe ich nicht.",
              "Muss das sein?"
            ],
            "answer": 0,
            "explanation": "Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst eine Frage zum Thema Im Fundbüro.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Könnten Sie mir bitte helfen",
              "Muss das sein?",
              "Das kann ich nicht."
            ],
            "answer": 0,
            "explanation": "Richtig: Könnten Sie mir bitte helfen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand erklärt dir etwas zum Thema Im Fundbüro.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Vielen Dank, das hilft mir sehr.",
              "Keine Lust.",
              "Ich weiß es nicht."
            ],
            "answer": 0,
            "explanation": "Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "quick_reaction",
            "situation": "Ein Kollege fragt nach deiner Meinung.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich finde, das ist eine gute Idee.",
              "Ich weiß es nicht.",
              "Keine Lust."
            ],
            "answer": 0,
            "explanation": "Eine begründete Meinung zeigt Engagement."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Entschuldigung, können Sie mir helfen?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich verstehe das nicht.",
        "context": "Frage stellen"
      },
      {
        "de": "Können Sie das bitte wiederholen?",
        "context": "Antwort geben"
      },
      {
        "de": "Wie sagt man das auf Deutsch?",
        "context": "Problem lösen"
      },
      {
        "de": "Bitte sprechen Sie langsamer.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Das habe ich nicht verstanden.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Vielen Dank für Ihre Hilfe.",
        "context": "Frage stellen"
      },
      {
        "de": "Wo finde ich Informationen dazu?",
        "context": "Antwort geben"
      },
      {
        "de": "Ich habe eine Frage.",
        "context": "Problem lösen"
      },
      {
        "de": "Können Sie mir das erklären?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich bin neu hier.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Das ist sehr wichtig für mich.",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Alternative?",
        "context": "Antwort geben"
      },
      {
        "de": "Wann kann ich wiederkommen?",
        "context": "Problem lösen"
      },
      {
        "de": "Ist das kostenlos?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich würde gerne einen Termin vereinbaren.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Könnten Sie mir bitte weiterhelfen?",
        "context": "Frage stellen"
      },
      {
        "de": "Das muss ich mir noch überlegen.",
        "context": "Antwort geben"
      },
      {
        "de": "Ich bin damit nicht einverstanden.",
        "context": "Problem lösen"
      },
      {
        "de": "Können wir einen Kompromiss finden?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Das erscheint mir zu teuer.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich hätte gerne eine schriftliche Bestätigung.",
        "context": "Frage stellen"
      },
      {
        "de": "Wann ist der nächste freie Termin?",
        "context": "Antwort geben"
      },
      {
        "de": "Gibt es da Ausnahmen?",
        "context": "Problem lösen"
      },
      {
        "de": "Das war ein Missverständnis.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich möchte mich beschweren.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Können Sie das schriftlich bestätigen?",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es einen Ansprechpartner dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Ich brauche noch etwas Zeit.",
        "context": "Problem lösen"
      },
      {
        "de": "Das ist mir leider nicht möglich.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Welche Unterlagen brauche ich?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich komme aus dem Ausland.",
        "context": "Frage stellen"
      },
      {
        "de": "Mein Deutsch ist noch nicht so gut.",
        "context": "Antwort geben"
      },
      {
        "de": "Können Sie mir das auf Papier geben?",
        "context": "Problem lösen"
      },
      {
        "de": "Wo muss ich unterschreiben?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ist das Formular richtig ausgefüllt?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich habe alles dabei.",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Frist dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Was passiert als nächstes?",
        "context": "Problem lösen"
      },
      {
        "de": "Ich warte auf eine Antwort.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Können Sie mich zurückrufen?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich habe eine Beschwerde.",
        "context": "Frage stellen"
      },
      {
        "de": "Das muss dringend erledigt werden.",
        "context": "Antwort geben"
      },
      {
        "de": "Ich bin seit einem Jahr in Deutschland.",
        "context": "Problem lösen"
      },
      {
        "de": "Meine Adresse hat sich geändert.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich brauche eine Bescheinigung.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Bis wann muss ich das erledigen?",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Beratung dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Wo kann ich mich informieren?",
        "context": "Problem lösen"
      },
      {
        "de": "Ich möchte einen Antrag stellen.",
        "context": "Hilfe bitten"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Nichts sagen.",
        "correct": "Höflich und klar antworten.",
        "tip": "Bei Im Fundbüro ist klare Kommunikation wichtig."
      },
      {
        "wrong": "sagen",
        "correct": "helfen",
        "tip": "Höflich um Hilfe bitten ist immer richtig."
      },
      {
        "wrong": "Okay.",
        "correct": "Vielen Dank, das hilft mir sehr.",
        "tip": "Sich bedanken zeigt Wertschätzung."
      }
    ]
  },
  {
    "id": "a2-25",
    "level": "A2",
    "title": "Renovierung",
    "titleDe": "Wohnung renovieren",
    "icon": "🪣",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Wohnung renovieren.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Nichts sagen.",
              "Einfach weggehen."
            ],
            "answer": 0,
            "explanation": "Bei Wohnung renovieren ist klare Kommunikation wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du brauchst Hilfe beim Thema Wohnung renovieren.",
            "question": "Könnten Sie mir bitte ___?",
            "options": [
              "helfen",
              "sagen",
              "zeigen"
            ],
            "answer": "helfen",
            "explanation": "Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst eine Frage zum Thema Wohnung renovieren.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sie",
              "Könnten",
              "bitte",
              "mir",
              "helfen"
            ],
            "answer": [
              1,
              0,
              3,
              2,
              4
            ],
            "explanation": "Richtig: Könnten Sie mir bitte helfen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand erklärt dir etwas zum Thema Wohnung renovieren.",
            "question": "Was sagst du?",
            "options": [
              "Vielen Dank, das hilft mir sehr.",
              "Okay.",
              "Können Sie das wiederholen?"
            ],
            "answer": 0,
            "explanation": "Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du erhältst ein Paket.",
            "question": "Was machst du?",
            "options": [
              "Ich unterschreibe und bedanke mich.",
              "Ich nehme es ohne Worte.",
              "Ich öffne es vor dem Postboten."
            ],
            "answer": 0,
            "explanation": "Beim Paketempfang unterschreibt man die Zustellung."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Wohnung renovieren.",
            "question": "Bei Wohnung ___ ist klare Kommunikation wichtig.",
            "options": [
              "renovieren",
              "nehme",
              "heute"
            ],
            "answer": "renovieren",
            "explanation": "Bei Wohnung renovieren ist klare Kommunikation wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du brauchst Hilfe beim Thema Wohnung renovieren.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "immer",
              "ist",
              "richtig",
              "bitten",
              "Höflich",
              "Hilfe",
              "um"
            ],
            "answer": [
              4,
              6,
              5,
              3,
              1,
              0,
              2
            ],
            "explanation": "Richtig: Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst eine Frage zum Thema Wohnung renovieren.",
            "question": "Könnten ___ mir bitte helfen?",
            "options": [
              "Sie",
              "Frage",
              "soll"
            ],
            "answer": "Sie",
            "explanation": "Könnten Sie mir bitte helfen?"
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand erklärt dir etwas zum Thema Wohnung renovieren.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sich",
              "zeigt",
              "Wertschätzung",
              "bedanken"
            ],
            "answer": [
              0,
              3,
              1,
              2
            ],
            "explanation": "Richtig: Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "fill_blank",
            "situation": "Du erhältst ein Paket.",
            "question": "Beim Paketempfang unterschreibt man die ___.",
            "options": [
              "Zustellung",
              "gehe",
              "Nummer"
            ],
            "answer": "Zustellung",
            "explanation": "Beim Paketempfang unterschreibt man die Zustellung."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Wohnung renovieren.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Ich habe keine Ahnung.",
              "Mir egal."
            ],
            "answer": 0,
            "explanation": "Bei Wohnung renovieren ist klare Kommunikation wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du brauchst Hilfe beim Thema Wohnung renovieren.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "helfen",
              "Muss das sein?",
              "Vielleicht später."
            ],
            "answer": 0,
            "explanation": "Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst eine Frage zum Thema Wohnung renovieren.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Könnten Sie mir bitte helfen",
              "Das ist nicht mein Problem.",
              "Keine Lust."
            ],
            "answer": 0,
            "explanation": "Richtig: Könnten Sie mir bitte helfen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand erklärt dir etwas zum Thema Wohnung renovieren.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Vielen Dank, das hilft mir sehr.",
              "Das ist nicht mein Problem.",
              "Keine Lust."
            ],
            "answer": 0,
            "explanation": "Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du erhältst ein Paket.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich unterschreibe und bedanke mich.",
              "Ich weiß es nicht.",
              "Vielleicht später."
            ],
            "answer": 0,
            "explanation": "Beim Paketempfang unterschreibt man die Zustellung."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Entschuldigung, können Sie mir helfen?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich verstehe das nicht.",
        "context": "Frage stellen"
      },
      {
        "de": "Können Sie das bitte wiederholen?",
        "context": "Antwort geben"
      },
      {
        "de": "Wie sagt man das auf Deutsch?",
        "context": "Problem lösen"
      },
      {
        "de": "Bitte sprechen Sie langsamer.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Das habe ich nicht verstanden.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Vielen Dank für Ihre Hilfe.",
        "context": "Frage stellen"
      },
      {
        "de": "Wo finde ich Informationen dazu?",
        "context": "Antwort geben"
      },
      {
        "de": "Ich habe eine Frage.",
        "context": "Problem lösen"
      },
      {
        "de": "Können Sie mir das erklären?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich bin neu hier.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Das ist sehr wichtig für mich.",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Alternative?",
        "context": "Antwort geben"
      },
      {
        "de": "Wann kann ich wiederkommen?",
        "context": "Problem lösen"
      },
      {
        "de": "Ist das kostenlos?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich würde gerne einen Termin vereinbaren.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Könnten Sie mir bitte weiterhelfen?",
        "context": "Frage stellen"
      },
      {
        "de": "Das muss ich mir noch überlegen.",
        "context": "Antwort geben"
      },
      {
        "de": "Ich bin damit nicht einverstanden.",
        "context": "Problem lösen"
      },
      {
        "de": "Können wir einen Kompromiss finden?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Das erscheint mir zu teuer.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich hätte gerne eine schriftliche Bestätigung.",
        "context": "Frage stellen"
      },
      {
        "de": "Wann ist der nächste freie Termin?",
        "context": "Antwort geben"
      },
      {
        "de": "Gibt es da Ausnahmen?",
        "context": "Problem lösen"
      },
      {
        "de": "Das war ein Missverständnis.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich möchte mich beschweren.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Können Sie das schriftlich bestätigen?",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es einen Ansprechpartner dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Ich brauche noch etwas Zeit.",
        "context": "Problem lösen"
      },
      {
        "de": "Das ist mir leider nicht möglich.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Welche Unterlagen brauche ich?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich komme aus dem Ausland.",
        "context": "Frage stellen"
      },
      {
        "de": "Mein Deutsch ist noch nicht so gut.",
        "context": "Antwort geben"
      },
      {
        "de": "Können Sie mir das auf Papier geben?",
        "context": "Problem lösen"
      },
      {
        "de": "Wo muss ich unterschreiben?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ist das Formular richtig ausgefüllt?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich habe alles dabei.",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Frist dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Was passiert als nächstes?",
        "context": "Problem lösen"
      },
      {
        "de": "Ich warte auf eine Antwort.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Können Sie mich zurückrufen?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich habe eine Beschwerde.",
        "context": "Frage stellen"
      },
      {
        "de": "Das muss dringend erledigt werden.",
        "context": "Antwort geben"
      },
      {
        "de": "Ich bin seit einem Jahr in Deutschland.",
        "context": "Problem lösen"
      },
      {
        "de": "Meine Adresse hat sich geändert.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich brauche eine Bescheinigung.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Bis wann muss ich das erledigen?",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Beratung dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Wo kann ich mich informieren?",
        "context": "Problem lösen"
      },
      {
        "de": "Ich möchte einen Antrag stellen.",
        "context": "Hilfe bitten"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Nichts sagen.",
        "correct": "Höflich und klar antworten.",
        "tip": "Bei Wohnung renovieren ist klare Kommunikation wichtig."
      },
      {
        "wrong": "sagen",
        "correct": "helfen",
        "tip": "Höflich um Hilfe bitten ist immer richtig."
      },
      {
        "wrong": "Okay.",
        "correct": "Vielen Dank, das hilft mir sehr.",
        "tip": "Sich bedanken zeigt Wertschätzung."
      }
    ]
  },
  {
    "id": "a2-26",
    "level": "A2",
    "title": "Kindergeld",
    "titleDe": "Kindergeld beantragen",
    "icon": "👶",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Kindergeld beantragen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Nichts sagen.",
              "Einfach weggehen."
            ],
            "answer": 0,
            "explanation": "Bei Kindergeld beantragen ist klare Kommunikation wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du brauchst Hilfe beim Thema Kindergeld beantragen.",
            "question": "Könnten Sie mir bitte ___?",
            "options": [
              "helfen",
              "sagen",
              "zeigen"
            ],
            "answer": "helfen",
            "explanation": "Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst eine Frage zum Thema Kindergeld beantragen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sie",
              "Könnten",
              "bitte",
              "mir",
              "helfen"
            ],
            "answer": [
              1,
              0,
              3,
              2,
              4
            ],
            "explanation": "Richtig: Könnten Sie mir bitte helfen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand erklärt dir etwas zum Thema Kindergeld beantragen.",
            "question": "Was sagst du?",
            "options": [
              "Vielen Dank, das hilft mir sehr.",
              "Okay.",
              "Können Sie das wiederholen?"
            ],
            "answer": 0,
            "explanation": "Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "quick_reaction",
            "situation": "Dein Nachbar beschwert sich über Lärm.",
            "question": "Wie reagierst du?",
            "options": [
              "Es tut mir leid, ich werde leiser sein.",
              "Das ist mir egal.",
              "Rufen Sie die Polizei."
            ],
            "answer": 0,
            "explanation": "Sich entschuldigen löst Konflikte schneller."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Kindergeld beantragen.",
            "question": "Bei Kindergeld ___ ist klare Kommunikation wichtig.",
            "options": [
              "beantragen",
              "Geld",
              "soll"
            ],
            "answer": "beantragen",
            "explanation": "Bei Kindergeld beantragen ist klare Kommunikation wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du brauchst Hilfe beim Thema Kindergeld beantragen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "bitten",
              "immer",
              "ist",
              "richtig",
              "Höflich",
              "um",
              "Hilfe"
            ],
            "answer": [
              4,
              5,
              6,
              0,
              2,
              1,
              3
            ],
            "explanation": "Richtig: Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst eine Frage zum Thema Kindergeld beantragen.",
            "question": "Könnten Sie ___ bitte helfen?",
            "options": [
              "mir",
              "möchte",
              "werde"
            ],
            "answer": "mir",
            "explanation": "Könnten Sie mir bitte helfen?"
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand erklärt dir etwas zum Thema Kindergeld beantragen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Wertschätzung",
              "Sich",
              "bedanken",
              "zeigt"
            ],
            "answer": [
              1,
              2,
              3,
              0
            ],
            "explanation": "Richtig: Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "fill_blank",
            "situation": "Dein Nachbar beschwert sich über Lärm.",
            "question": "Sich entschuldigen löst Konflikte ___.",
            "options": [
              "schneller",
              "Name",
              "morgen"
            ],
            "answer": "schneller",
            "explanation": "Sich entschuldigen löst Konflikte schneller."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Kindergeld beantragen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Das ist nicht mein Problem.",
              "Ich habe keine Ahnung."
            ],
            "answer": 0,
            "explanation": "Bei Kindergeld beantragen ist klare Kommunikation wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du brauchst Hilfe beim Thema Kindergeld beantragen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "helfen",
              "Das ist nicht mein Problem.",
              "Das kann ich nicht."
            ],
            "answer": 0,
            "explanation": "Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst eine Frage zum Thema Kindergeld beantragen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Könnten Sie mir bitte helfen",
              "Mir egal.",
              "Fragen Sie jemand anderen."
            ],
            "answer": 0,
            "explanation": "Richtig: Könnten Sie mir bitte helfen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand erklärt dir etwas zum Thema Kindergeld beantragen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Vielen Dank, das hilft mir sehr.",
              "Ich weiß es nicht.",
              "Das verstehe ich nicht."
            ],
            "answer": 0,
            "explanation": "Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "quick_reaction",
            "situation": "Dein Nachbar beschwert sich über Lärm.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Es tut mir leid, ich werde leiser sein.",
              "Ich weiß es nicht.",
              "Keine Lust."
            ],
            "answer": 0,
            "explanation": "Sich entschuldigen löst Konflikte schneller."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Entschuldigung, können Sie mir helfen?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich verstehe das nicht.",
        "context": "Frage stellen"
      },
      {
        "de": "Können Sie das bitte wiederholen?",
        "context": "Antwort geben"
      },
      {
        "de": "Wie sagt man das auf Deutsch?",
        "context": "Problem lösen"
      },
      {
        "de": "Bitte sprechen Sie langsamer.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Das habe ich nicht verstanden.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Vielen Dank für Ihre Hilfe.",
        "context": "Frage stellen"
      },
      {
        "de": "Wo finde ich Informationen dazu?",
        "context": "Antwort geben"
      },
      {
        "de": "Ich habe eine Frage.",
        "context": "Problem lösen"
      },
      {
        "de": "Können Sie mir das erklären?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich bin neu hier.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Das ist sehr wichtig für mich.",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Alternative?",
        "context": "Antwort geben"
      },
      {
        "de": "Wann kann ich wiederkommen?",
        "context": "Problem lösen"
      },
      {
        "de": "Ist das kostenlos?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich würde gerne einen Termin vereinbaren.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Könnten Sie mir bitte weiterhelfen?",
        "context": "Frage stellen"
      },
      {
        "de": "Das muss ich mir noch überlegen.",
        "context": "Antwort geben"
      },
      {
        "de": "Ich bin damit nicht einverstanden.",
        "context": "Problem lösen"
      },
      {
        "de": "Können wir einen Kompromiss finden?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Das erscheint mir zu teuer.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich hätte gerne eine schriftliche Bestätigung.",
        "context": "Frage stellen"
      },
      {
        "de": "Wann ist der nächste freie Termin?",
        "context": "Antwort geben"
      },
      {
        "de": "Gibt es da Ausnahmen?",
        "context": "Problem lösen"
      },
      {
        "de": "Das war ein Missverständnis.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich möchte mich beschweren.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Können Sie das schriftlich bestätigen?",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es einen Ansprechpartner dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Ich brauche noch etwas Zeit.",
        "context": "Problem lösen"
      },
      {
        "de": "Das ist mir leider nicht möglich.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Welche Unterlagen brauche ich?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich komme aus dem Ausland.",
        "context": "Frage stellen"
      },
      {
        "de": "Mein Deutsch ist noch nicht so gut.",
        "context": "Antwort geben"
      },
      {
        "de": "Können Sie mir das auf Papier geben?",
        "context": "Problem lösen"
      },
      {
        "de": "Wo muss ich unterschreiben?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ist das Formular richtig ausgefüllt?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich habe alles dabei.",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Frist dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Was passiert als nächstes?",
        "context": "Problem lösen"
      },
      {
        "de": "Ich warte auf eine Antwort.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Können Sie mich zurückrufen?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich habe eine Beschwerde.",
        "context": "Frage stellen"
      },
      {
        "de": "Das muss dringend erledigt werden.",
        "context": "Antwort geben"
      },
      {
        "de": "Ich bin seit einem Jahr in Deutschland.",
        "context": "Problem lösen"
      },
      {
        "de": "Meine Adresse hat sich geändert.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich brauche eine Bescheinigung.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Bis wann muss ich das erledigen?",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Beratung dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Wo kann ich mich informieren?",
        "context": "Problem lösen"
      },
      {
        "de": "Ich möchte einen Antrag stellen.",
        "context": "Hilfe bitten"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Nichts sagen.",
        "correct": "Höflich und klar antworten.",
        "tip": "Bei Kindergeld beantragen ist klare Kommunikation wichtig."
      },
      {
        "wrong": "sagen",
        "correct": "helfen",
        "tip": "Höflich um Hilfe bitten ist immer richtig."
      },
      {
        "wrong": "Okay.",
        "correct": "Vielen Dank, das hilft mir sehr.",
        "tip": "Sich bedanken zeigt Wertschätzung."
      }
    ]
  },
  {
    "id": "a2-27",
    "level": "A2",
    "title": "Zahnarzt",
    "titleDe": "Beim Zahnarzt",
    "icon": "🦷",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Beim Zahnarzt.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Nichts sagen.",
              "Einfach weggehen."
            ],
            "answer": 0,
            "explanation": "Bei Beim Zahnarzt ist klare Kommunikation wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du brauchst Hilfe beim Thema Beim Zahnarzt.",
            "question": "Könnten Sie mir bitte ___?",
            "options": [
              "helfen",
              "sagen",
              "zeigen"
            ],
            "answer": "helfen",
            "explanation": "Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst eine Frage zum Thema Beim Zahnarzt.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sie",
              "Könnten",
              "bitte",
              "mir",
              "helfen"
            ],
            "answer": [
              1,
              0,
              3,
              2,
              4
            ],
            "explanation": "Richtig: Könnten Sie mir bitte helfen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand erklärt dir etwas zum Thema Beim Zahnarzt.",
            "question": "Was sagst du?",
            "options": [
              "Vielen Dank, das hilft mir sehr.",
              "Okay.",
              "Können Sie das wiederholen?"
            ],
            "answer": 0,
            "explanation": "Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bekommst eine Rechnung per Post.",
            "question": "Was machst du?",
            "options": [
              "Ich überweise den Betrag bis zum Fälligkeitsdatum.",
              "Ich werfe sie weg.",
              "Ich rufe die Polizei."
            ],
            "answer": 0,
            "explanation": "Rechnungen pünktlich bezahlen ist wichtig."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Beim Zahnarzt.",
            "question": "Bei ___ Zahnarzt ist klare Kommunikation wichtig.",
            "options": [
              "Beim",
              "gleich",
              "Frage"
            ],
            "answer": "Beim",
            "explanation": "Bei Beim Zahnarzt ist klare Kommunikation wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du brauchst Hilfe beim Thema Beim Zahnarzt.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "immer",
              "richtig",
              "bitten",
              "ist",
              "Höflich",
              "Hilfe",
              "um"
            ],
            "answer": [
              4,
              6,
              5,
              2,
              3,
              0,
              1
            ],
            "explanation": "Richtig: Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst eine Frage zum Thema Beim Zahnarzt.",
            "question": "Könnten Sie mir bitte ___?",
            "options": [
              "helfen",
              "muss",
              "will"
            ],
            "answer": "helfen",
            "explanation": "Könnten Sie mir bitte helfen?"
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand erklärt dir etwas zum Thema Beim Zahnarzt.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "bedanken",
              "Sich",
              "zeigt",
              "Wertschätzung"
            ],
            "answer": [
              1,
              0,
              2,
              3
            ],
            "explanation": "Richtig: Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "fill_blank",
            "situation": "Du bekommst eine Rechnung per Post.",
            "question": "Rechnungen pünktlich ___ ist wichtig.",
            "options": [
              "bezahlen",
              "danke",
              "gehe"
            ],
            "answer": "bezahlen",
            "explanation": "Rechnungen pünktlich bezahlen ist wichtig."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Beim Zahnarzt.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Das kann ich nicht.",
              "Keine Lust."
            ],
            "answer": 0,
            "explanation": "Bei Beim Zahnarzt ist klare Kommunikation wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du brauchst Hilfe beim Thema Beim Zahnarzt.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "helfen",
              "Das ist nicht mein Problem.",
              "Das verstehe ich nicht."
            ],
            "answer": 0,
            "explanation": "Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst eine Frage zum Thema Beim Zahnarzt.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Könnten Sie mir bitte helfen",
              "Vielleicht später.",
              "Mir egal."
            ],
            "answer": 0,
            "explanation": "Richtig: Könnten Sie mir bitte helfen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand erklärt dir etwas zum Thema Beim Zahnarzt.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Vielen Dank, das hilft mir sehr.",
              "Das verstehe ich nicht.",
              "Keine Lust."
            ],
            "answer": 0,
            "explanation": "Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bekommst eine Rechnung per Post.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich überweise den Betrag bis zum Fälligkeitsdatum.",
              "Fragen Sie jemand anderen.",
              "Kein Interesse."
            ],
            "answer": 0,
            "explanation": "Rechnungen pünktlich bezahlen ist wichtig."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Entschuldigung, können Sie mir helfen?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich verstehe das nicht.",
        "context": "Frage stellen"
      },
      {
        "de": "Können Sie das bitte wiederholen?",
        "context": "Antwort geben"
      },
      {
        "de": "Wie sagt man das auf Deutsch?",
        "context": "Problem lösen"
      },
      {
        "de": "Bitte sprechen Sie langsamer.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Das habe ich nicht verstanden.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Vielen Dank für Ihre Hilfe.",
        "context": "Frage stellen"
      },
      {
        "de": "Wo finde ich Informationen dazu?",
        "context": "Antwort geben"
      },
      {
        "de": "Ich habe eine Frage.",
        "context": "Problem lösen"
      },
      {
        "de": "Können Sie mir das erklären?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich bin neu hier.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Das ist sehr wichtig für mich.",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Alternative?",
        "context": "Antwort geben"
      },
      {
        "de": "Wann kann ich wiederkommen?",
        "context": "Problem lösen"
      },
      {
        "de": "Ist das kostenlos?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich würde gerne einen Termin vereinbaren.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Könnten Sie mir bitte weiterhelfen?",
        "context": "Frage stellen"
      },
      {
        "de": "Das muss ich mir noch überlegen.",
        "context": "Antwort geben"
      },
      {
        "de": "Ich bin damit nicht einverstanden.",
        "context": "Problem lösen"
      },
      {
        "de": "Können wir einen Kompromiss finden?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Das erscheint mir zu teuer.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich hätte gerne eine schriftliche Bestätigung.",
        "context": "Frage stellen"
      },
      {
        "de": "Wann ist der nächste freie Termin?",
        "context": "Antwort geben"
      },
      {
        "de": "Gibt es da Ausnahmen?",
        "context": "Problem lösen"
      },
      {
        "de": "Das war ein Missverständnis.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich möchte mich beschweren.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Können Sie das schriftlich bestätigen?",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es einen Ansprechpartner dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Ich brauche noch etwas Zeit.",
        "context": "Problem lösen"
      },
      {
        "de": "Das ist mir leider nicht möglich.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Welche Unterlagen brauche ich?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich komme aus dem Ausland.",
        "context": "Frage stellen"
      },
      {
        "de": "Mein Deutsch ist noch nicht so gut.",
        "context": "Antwort geben"
      },
      {
        "de": "Können Sie mir das auf Papier geben?",
        "context": "Problem lösen"
      },
      {
        "de": "Wo muss ich unterschreiben?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ist das Formular richtig ausgefüllt?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich habe alles dabei.",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Frist dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Was passiert als nächstes?",
        "context": "Problem lösen"
      },
      {
        "de": "Ich warte auf eine Antwort.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Können Sie mich zurückrufen?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich habe eine Beschwerde.",
        "context": "Frage stellen"
      },
      {
        "de": "Das muss dringend erledigt werden.",
        "context": "Antwort geben"
      },
      {
        "de": "Ich bin seit einem Jahr in Deutschland.",
        "context": "Problem lösen"
      },
      {
        "de": "Meine Adresse hat sich geändert.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich brauche eine Bescheinigung.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Bis wann muss ich das erledigen?",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Beratung dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Wo kann ich mich informieren?",
        "context": "Problem lösen"
      },
      {
        "de": "Ich möchte einen Antrag stellen.",
        "context": "Hilfe bitten"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Nichts sagen.",
        "correct": "Höflich und klar antworten.",
        "tip": "Bei Beim Zahnarzt ist klare Kommunikation wichtig."
      },
      {
        "wrong": "sagen",
        "correct": "helfen",
        "tip": "Höflich um Hilfe bitten ist immer richtig."
      },
      {
        "wrong": "Okay.",
        "correct": "Vielen Dank, das hilft mir sehr.",
        "tip": "Sich bedanken zeigt Wertschätzung."
      }
    ]
  },
  {
    "id": "a2-28",
    "level": "A2",
    "title": "Sommerfest",
    "titleDe": "Auf einem Sommerfest",
    "icon": "🎉",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Auf einem Sommerfest.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Nichts sagen.",
              "Einfach weggehen."
            ],
            "answer": 0,
            "explanation": "Bei Auf einem Sommerfest ist klare Kommunikation wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du brauchst Hilfe beim Thema Auf einem Sommerfest.",
            "question": "Könnten Sie mir bitte ___?",
            "options": [
              "helfen",
              "sagen",
              "zeigen"
            ],
            "answer": "helfen",
            "explanation": "Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst eine Frage zum Thema Auf einem Sommerfest.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sie",
              "Könnten",
              "bitte",
              "mir",
              "helfen"
            ],
            "answer": [
              1,
              0,
              3,
              2,
              4
            ],
            "explanation": "Richtig: Könnten Sie mir bitte helfen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand erklärt dir etwas zum Thema Auf einem Sommerfest.",
            "question": "Was sagst du?",
            "options": [
              "Vielen Dank, das hilft mir sehr.",
              "Okay.",
              "Können Sie das wiederholen?"
            ],
            "answer": 0,
            "explanation": "Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du willst einen Termin absagen.",
            "question": "Was sagst du?",
            "options": [
              "Ich muss den Termin leider absagen.",
              "Ich komme nicht.",
              "Vergessen Sie es."
            ],
            "answer": 0,
            "explanation": "Höfliches Absagen ist im Deutschen wichtig."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Auf einem Sommerfest.",
            "question": "Bei Auf einem Sommerfest ist klare ___ wichtig.",
            "options": [
              "Kommunikation",
              "soll",
              "wichtig"
            ],
            "answer": "Kommunikation",
            "explanation": "Bei Auf einem Sommerfest ist klare Kommunikation wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du brauchst Hilfe beim Thema Auf einem Sommerfest.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "bitten",
              "richtig",
              "um",
              "immer",
              "ist",
              "Höflich",
              "Hilfe"
            ],
            "answer": [
              5,
              2,
              6,
              0,
              4,
              3,
              1
            ],
            "explanation": "Richtig: Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst eine Frage zum Thema Auf einem Sommerfest.",
            "question": "Könnten ___ mir bitte helfen?",
            "options": [
              "Sie",
              "gestern",
              "Geld"
            ],
            "answer": "Sie",
            "explanation": "Könnten Sie mir bitte helfen?"
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand erklärt dir etwas zum Thema Auf einem Sommerfest.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Wertschätzung",
              "Sich",
              "bedanken",
              "zeigt"
            ],
            "answer": [
              1,
              2,
              3,
              0
            ],
            "explanation": "Richtig: Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "fill_blank",
            "situation": "Du willst einen Termin absagen.",
            "question": "Höfliches Absagen ist im ___ wichtig.",
            "options": [
              "Deutschen",
              "muss",
              "Hilfe"
            ],
            "answer": "Deutschen",
            "explanation": "Höfliches Absagen ist im Deutschen wichtig."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Auf einem Sommerfest.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Mir egal.",
              "Kein Interesse."
            ],
            "answer": 0,
            "explanation": "Bei Auf einem Sommerfest ist klare Kommunikation wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du brauchst Hilfe beim Thema Auf einem Sommerfest.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "helfen",
              "Kein Interesse.",
              "Ich habe keine Ahnung."
            ],
            "answer": 0,
            "explanation": "Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst eine Frage zum Thema Auf einem Sommerfest.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Könnten Sie mir bitte helfen",
              "Das verstehe ich nicht.",
              "Vielleicht später."
            ],
            "answer": 0,
            "explanation": "Richtig: Könnten Sie mir bitte helfen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand erklärt dir etwas zum Thema Auf einem Sommerfest.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Vielen Dank, das hilft mir sehr.",
              "Fragen Sie jemand anderen.",
              "Das ist nicht mein Problem."
            ],
            "answer": 0,
            "explanation": "Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du willst einen Termin absagen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich muss den Termin leider absagen.",
              "Vielleicht später.",
              "Ich weiß es nicht."
            ],
            "answer": 0,
            "explanation": "Höfliches Absagen ist im Deutschen wichtig."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Entschuldigung, können Sie mir helfen?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich verstehe das nicht.",
        "context": "Frage stellen"
      },
      {
        "de": "Können Sie das bitte wiederholen?",
        "context": "Antwort geben"
      },
      {
        "de": "Wie sagt man das auf Deutsch?",
        "context": "Problem lösen"
      },
      {
        "de": "Bitte sprechen Sie langsamer.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Das habe ich nicht verstanden.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Vielen Dank für Ihre Hilfe.",
        "context": "Frage stellen"
      },
      {
        "de": "Wo finde ich Informationen dazu?",
        "context": "Antwort geben"
      },
      {
        "de": "Ich habe eine Frage.",
        "context": "Problem lösen"
      },
      {
        "de": "Können Sie mir das erklären?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich bin neu hier.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Das ist sehr wichtig für mich.",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Alternative?",
        "context": "Antwort geben"
      },
      {
        "de": "Wann kann ich wiederkommen?",
        "context": "Problem lösen"
      },
      {
        "de": "Ist das kostenlos?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich würde gerne einen Termin vereinbaren.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Könnten Sie mir bitte weiterhelfen?",
        "context": "Frage stellen"
      },
      {
        "de": "Das muss ich mir noch überlegen.",
        "context": "Antwort geben"
      },
      {
        "de": "Ich bin damit nicht einverstanden.",
        "context": "Problem lösen"
      },
      {
        "de": "Können wir einen Kompromiss finden?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Das erscheint mir zu teuer.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich hätte gerne eine schriftliche Bestätigung.",
        "context": "Frage stellen"
      },
      {
        "de": "Wann ist der nächste freie Termin?",
        "context": "Antwort geben"
      },
      {
        "de": "Gibt es da Ausnahmen?",
        "context": "Problem lösen"
      },
      {
        "de": "Das war ein Missverständnis.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich möchte mich beschweren.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Können Sie das schriftlich bestätigen?",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es einen Ansprechpartner dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Ich brauche noch etwas Zeit.",
        "context": "Problem lösen"
      },
      {
        "de": "Das ist mir leider nicht möglich.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Welche Unterlagen brauche ich?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich komme aus dem Ausland.",
        "context": "Frage stellen"
      },
      {
        "de": "Mein Deutsch ist noch nicht so gut.",
        "context": "Antwort geben"
      },
      {
        "de": "Können Sie mir das auf Papier geben?",
        "context": "Problem lösen"
      },
      {
        "de": "Wo muss ich unterschreiben?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ist das Formular richtig ausgefüllt?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich habe alles dabei.",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Frist dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Was passiert als nächstes?",
        "context": "Problem lösen"
      },
      {
        "de": "Ich warte auf eine Antwort.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Können Sie mich zurückrufen?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich habe eine Beschwerde.",
        "context": "Frage stellen"
      },
      {
        "de": "Das muss dringend erledigt werden.",
        "context": "Antwort geben"
      },
      {
        "de": "Ich bin seit einem Jahr in Deutschland.",
        "context": "Problem lösen"
      },
      {
        "de": "Meine Adresse hat sich geändert.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich brauche eine Bescheinigung.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Bis wann muss ich das erledigen?",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Beratung dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Wo kann ich mich informieren?",
        "context": "Problem lösen"
      },
      {
        "de": "Ich möchte einen Antrag stellen.",
        "context": "Hilfe bitten"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Nichts sagen.",
        "correct": "Höflich und klar antworten.",
        "tip": "Bei Auf einem Sommerfest ist klare Kommunikation wichtig."
      },
      {
        "wrong": "sagen",
        "correct": "helfen",
        "tip": "Höflich um Hilfe bitten ist immer richtig."
      },
      {
        "wrong": "Okay.",
        "correct": "Vielen Dank, das hilft mir sehr.",
        "tip": "Sich bedanken zeigt Wertschätzung."
      }
    ]
  },
  {
    "id": "a2-29",
    "level": "A2",
    "title": "Zeugnis",
    "titleDe": "Ein Arbeitszeugnis",
    "icon": "📜",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Ein Arbeitszeugnis.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Nichts sagen.",
              "Einfach weggehen."
            ],
            "answer": 0,
            "explanation": "Bei Ein Arbeitszeugnis ist klare Kommunikation wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du brauchst Hilfe beim Thema Ein Arbeitszeugnis.",
            "question": "Könnten Sie mir bitte ___?",
            "options": [
              "helfen",
              "sagen",
              "zeigen"
            ],
            "answer": "helfen",
            "explanation": "Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst eine Frage zum Thema Ein Arbeitszeugnis.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sie",
              "Könnten",
              "bitte",
              "mir",
              "helfen"
            ],
            "answer": [
              1,
              0,
              3,
              2,
              4
            ],
            "explanation": "Richtig: Könnten Sie mir bitte helfen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand erklärt dir etwas zum Thema Ein Arbeitszeugnis.",
            "question": "Was sagst du?",
            "options": [
              "Vielen Dank, das hilft mir sehr.",
              "Okay.",
              "Können Sie das wiederholen?"
            ],
            "answer": 0,
            "explanation": "Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "quick_reaction",
            "situation": "Ein Kollege fragt nach deiner Meinung.",
            "question": "Wie antwortest du?",
            "options": [
              "Ich finde, das ist eine gute Idee.",
              "Keine Ahnung.",
              "Mir egal."
            ],
            "answer": 0,
            "explanation": "Eine begründete Meinung zeigt Engagement."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Ein Arbeitszeugnis.",
            "question": "Bei Ein Arbeitszeugnis ___ klare Kommunikation wichtig.",
            "options": [
              "ist",
              "jetzt",
              "mache"
            ],
            "answer": "ist",
            "explanation": "Bei Ein Arbeitszeugnis ist klare Kommunikation wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du brauchst Hilfe beim Thema Ein Arbeitszeugnis.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "um",
              "Höflich",
              "Hilfe",
              "ist",
              "bitten",
              "immer",
              "richtig"
            ],
            "answer": [
              1,
              0,
              2,
              4,
              3,
              5,
              6
            ],
            "explanation": "Richtig: Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst eine Frage zum Thema Ein Arbeitszeugnis.",
            "question": "Könnten Sie ___ bitte helfen?",
            "options": [
              "mir",
              "muss",
              "danke"
            ],
            "answer": "mir",
            "explanation": "Könnten Sie mir bitte helfen?"
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand erklärt dir etwas zum Thema Ein Arbeitszeugnis.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "zeigt",
              "bedanken",
              "Sich",
              "Wertschätzung"
            ],
            "answer": [
              2,
              1,
              0,
              3
            ],
            "explanation": "Richtig: Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "fill_blank",
            "situation": "Ein Kollege fragt nach deiner Meinung.",
            "question": "Eine begründete ___ zeigt Engagement.",
            "options": [
              "Meinung",
              "werde",
              "nehme"
            ],
            "answer": "Meinung",
            "explanation": "Eine begründete Meinung zeigt Engagement."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Ein Arbeitszeugnis.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Das ist nicht mein Problem.",
              "Vielleicht später."
            ],
            "answer": 0,
            "explanation": "Bei Ein Arbeitszeugnis ist klare Kommunikation wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du brauchst Hilfe beim Thema Ein Arbeitszeugnis.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "helfen",
              "Das kann ich nicht.",
              "Ich weiß es nicht."
            ],
            "answer": 0,
            "explanation": "Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst eine Frage zum Thema Ein Arbeitszeugnis.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Könnten Sie mir bitte helfen",
              "Keine Lust.",
              "Ich weiß es nicht."
            ],
            "answer": 0,
            "explanation": "Richtig: Könnten Sie mir bitte helfen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand erklärt dir etwas zum Thema Ein Arbeitszeugnis.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Vielen Dank, das hilft mir sehr.",
              "Muss das sein?",
              "Das kann ich nicht."
            ],
            "answer": 0,
            "explanation": "Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "quick_reaction",
            "situation": "Ein Kollege fragt nach deiner Meinung.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich finde, das ist eine gute Idee.",
              "Das ist nicht mein Problem.",
              "Kein Interesse."
            ],
            "answer": 0,
            "explanation": "Eine begründete Meinung zeigt Engagement."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Entschuldigung, können Sie mir helfen?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich verstehe das nicht.",
        "context": "Frage stellen"
      },
      {
        "de": "Können Sie das bitte wiederholen?",
        "context": "Antwort geben"
      },
      {
        "de": "Wie sagt man das auf Deutsch?",
        "context": "Problem lösen"
      },
      {
        "de": "Bitte sprechen Sie langsamer.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Das habe ich nicht verstanden.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Vielen Dank für Ihre Hilfe.",
        "context": "Frage stellen"
      },
      {
        "de": "Wo finde ich Informationen dazu?",
        "context": "Antwort geben"
      },
      {
        "de": "Ich habe eine Frage.",
        "context": "Problem lösen"
      },
      {
        "de": "Können Sie mir das erklären?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich bin neu hier.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Das ist sehr wichtig für mich.",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Alternative?",
        "context": "Antwort geben"
      },
      {
        "de": "Wann kann ich wiederkommen?",
        "context": "Problem lösen"
      },
      {
        "de": "Ist das kostenlos?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich würde gerne einen Termin vereinbaren.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Könnten Sie mir bitte weiterhelfen?",
        "context": "Frage stellen"
      },
      {
        "de": "Das muss ich mir noch überlegen.",
        "context": "Antwort geben"
      },
      {
        "de": "Ich bin damit nicht einverstanden.",
        "context": "Problem lösen"
      },
      {
        "de": "Können wir einen Kompromiss finden?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Das erscheint mir zu teuer.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich hätte gerne eine schriftliche Bestätigung.",
        "context": "Frage stellen"
      },
      {
        "de": "Wann ist der nächste freie Termin?",
        "context": "Antwort geben"
      },
      {
        "de": "Gibt es da Ausnahmen?",
        "context": "Problem lösen"
      },
      {
        "de": "Das war ein Missverständnis.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich möchte mich beschweren.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Können Sie das schriftlich bestätigen?",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es einen Ansprechpartner dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Ich brauche noch etwas Zeit.",
        "context": "Problem lösen"
      },
      {
        "de": "Das ist mir leider nicht möglich.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Welche Unterlagen brauche ich?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich komme aus dem Ausland.",
        "context": "Frage stellen"
      },
      {
        "de": "Mein Deutsch ist noch nicht so gut.",
        "context": "Antwort geben"
      },
      {
        "de": "Können Sie mir das auf Papier geben?",
        "context": "Problem lösen"
      },
      {
        "de": "Wo muss ich unterschreiben?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ist das Formular richtig ausgefüllt?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich habe alles dabei.",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Frist dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Was passiert als nächstes?",
        "context": "Problem lösen"
      },
      {
        "de": "Ich warte auf eine Antwort.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Können Sie mich zurückrufen?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich habe eine Beschwerde.",
        "context": "Frage stellen"
      },
      {
        "de": "Das muss dringend erledigt werden.",
        "context": "Antwort geben"
      },
      {
        "de": "Ich bin seit einem Jahr in Deutschland.",
        "context": "Problem lösen"
      },
      {
        "de": "Meine Adresse hat sich geändert.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich brauche eine Bescheinigung.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Bis wann muss ich das erledigen?",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Beratung dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Wo kann ich mich informieren?",
        "context": "Problem lösen"
      },
      {
        "de": "Ich möchte einen Antrag stellen.",
        "context": "Hilfe bitten"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Nichts sagen.",
        "correct": "Höflich und klar antworten.",
        "tip": "Bei Ein Arbeitszeugnis ist klare Kommunikation wichtig."
      },
      {
        "wrong": "sagen",
        "correct": "helfen",
        "tip": "Höflich um Hilfe bitten ist immer richtig."
      },
      {
        "wrong": "Okay.",
        "correct": "Vielen Dank, das hilft mir sehr.",
        "tip": "Sich bedanken zeigt Wertschätzung."
      }
    ]
  },
  {
    "id": "a2-30",
    "level": "A2",
    "title": "Baustelle",
    "titleDe": "Auf der Baustelle",
    "icon": "🏗️",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Auf der Baustelle.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Nichts sagen.",
              "Einfach weggehen."
            ],
            "answer": 0,
            "explanation": "Bei Auf der Baustelle ist klare Kommunikation wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du brauchst Hilfe beim Thema Auf der Baustelle.",
            "question": "Könnten Sie mir bitte ___?",
            "options": [
              "helfen",
              "sagen",
              "zeigen"
            ],
            "answer": "helfen",
            "explanation": "Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst eine Frage zum Thema Auf der Baustelle.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sie",
              "Könnten",
              "bitte",
              "mir",
              "helfen"
            ],
            "answer": [
              1,
              0,
              3,
              2,
              4
            ],
            "explanation": "Richtig: Könnten Sie mir bitte helfen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand erklärt dir etwas zum Thema Auf der Baustelle.",
            "question": "Was sagst du?",
            "options": [
              "Vielen Dank, das hilft mir sehr.",
              "Okay.",
              "Können Sie das wiederholen?"
            ],
            "answer": 0,
            "explanation": "Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du erhältst ein Paket.",
            "question": "Was machst du?",
            "options": [
              "Ich unterschreibe und bedanke mich.",
              "Ich nehme es ohne Worte.",
              "Ich öffne es vor dem Postboten."
            ],
            "answer": 0,
            "explanation": "Beim Paketempfang unterschreibt man die Zustellung."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Auf der Baustelle.",
            "question": "Bei Auf ___ Baustelle ist klare Kommunikation wichtig.",
            "options": [
              "der",
              "Frage",
              "Hilfe"
            ],
            "answer": "der",
            "explanation": "Bei Auf der Baustelle ist klare Kommunikation wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du brauchst Hilfe beim Thema Auf der Baustelle.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "bitten",
              "um",
              "immer",
              "ist",
              "Hilfe",
              "Höflich",
              "richtig"
            ],
            "answer": [
              5,
              1,
              4,
              0,
              3,
              2,
              6
            ],
            "explanation": "Richtig: Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst eine Frage zum Thema Auf der Baustelle.",
            "question": "Könnten Sie mir bitte ___?",
            "options": [
              "helfen",
              "Arbeit",
              "gerne"
            ],
            "answer": "helfen",
            "explanation": "Könnten Sie mir bitte helfen?"
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand erklärt dir etwas zum Thema Auf der Baustelle.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sich",
              "zeigt",
              "bedanken",
              "Wertschätzung"
            ],
            "answer": [
              0,
              2,
              1,
              3
            ],
            "explanation": "Richtig: Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "fill_blank",
            "situation": "Du erhältst ein Paket.",
            "question": "Beim Paketempfang ___ man die Zustellung.",
            "options": [
              "unterschreibt",
              "richtig",
              "bitte"
            ],
            "answer": "unterschreibt",
            "explanation": "Beim Paketempfang unterschreibt man die Zustellung."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Auf der Baustelle.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Muss das sein?",
              "Vielleicht später."
            ],
            "answer": 0,
            "explanation": "Bei Auf der Baustelle ist klare Kommunikation wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du brauchst Hilfe beim Thema Auf der Baustelle.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "helfen",
              "Ich weiß es nicht.",
              "Das kann ich nicht."
            ],
            "answer": 0,
            "explanation": "Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst eine Frage zum Thema Auf der Baustelle.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Könnten Sie mir bitte helfen",
              "Ich habe keine Ahnung.",
              "Keine Lust."
            ],
            "answer": 0,
            "explanation": "Richtig: Könnten Sie mir bitte helfen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand erklärt dir etwas zum Thema Auf der Baustelle.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Vielen Dank, das hilft mir sehr.",
              "Ich habe keine Ahnung.",
              "Keine Lust."
            ],
            "answer": 0,
            "explanation": "Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du erhältst ein Paket.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich unterschreibe und bedanke mich.",
              "Das verstehe ich nicht.",
              "Fragen Sie jemand anderen."
            ],
            "answer": 0,
            "explanation": "Beim Paketempfang unterschreibt man die Zustellung."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Entschuldigung, können Sie mir helfen?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich verstehe das nicht.",
        "context": "Frage stellen"
      },
      {
        "de": "Können Sie das bitte wiederholen?",
        "context": "Antwort geben"
      },
      {
        "de": "Wie sagt man das auf Deutsch?",
        "context": "Problem lösen"
      },
      {
        "de": "Bitte sprechen Sie langsamer.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Das habe ich nicht verstanden.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Vielen Dank für Ihre Hilfe.",
        "context": "Frage stellen"
      },
      {
        "de": "Wo finde ich Informationen dazu?",
        "context": "Antwort geben"
      },
      {
        "de": "Ich habe eine Frage.",
        "context": "Problem lösen"
      },
      {
        "de": "Können Sie mir das erklären?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich bin neu hier.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Das ist sehr wichtig für mich.",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Alternative?",
        "context": "Antwort geben"
      },
      {
        "de": "Wann kann ich wiederkommen?",
        "context": "Problem lösen"
      },
      {
        "de": "Ist das kostenlos?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich würde gerne einen Termin vereinbaren.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Könnten Sie mir bitte weiterhelfen?",
        "context": "Frage stellen"
      },
      {
        "de": "Das muss ich mir noch überlegen.",
        "context": "Antwort geben"
      },
      {
        "de": "Ich bin damit nicht einverstanden.",
        "context": "Problem lösen"
      },
      {
        "de": "Können wir einen Kompromiss finden?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Das erscheint mir zu teuer.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich hätte gerne eine schriftliche Bestätigung.",
        "context": "Frage stellen"
      },
      {
        "de": "Wann ist der nächste freie Termin?",
        "context": "Antwort geben"
      },
      {
        "de": "Gibt es da Ausnahmen?",
        "context": "Problem lösen"
      },
      {
        "de": "Das war ein Missverständnis.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich möchte mich beschweren.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Können Sie das schriftlich bestätigen?",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es einen Ansprechpartner dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Ich brauche noch etwas Zeit.",
        "context": "Problem lösen"
      },
      {
        "de": "Das ist mir leider nicht möglich.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Welche Unterlagen brauche ich?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich komme aus dem Ausland.",
        "context": "Frage stellen"
      },
      {
        "de": "Mein Deutsch ist noch nicht so gut.",
        "context": "Antwort geben"
      },
      {
        "de": "Können Sie mir das auf Papier geben?",
        "context": "Problem lösen"
      },
      {
        "de": "Wo muss ich unterschreiben?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ist das Formular richtig ausgefüllt?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich habe alles dabei.",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Frist dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Was passiert als nächstes?",
        "context": "Problem lösen"
      },
      {
        "de": "Ich warte auf eine Antwort.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Können Sie mich zurückrufen?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich habe eine Beschwerde.",
        "context": "Frage stellen"
      },
      {
        "de": "Das muss dringend erledigt werden.",
        "context": "Antwort geben"
      },
      {
        "de": "Ich bin seit einem Jahr in Deutschland.",
        "context": "Problem lösen"
      },
      {
        "de": "Meine Adresse hat sich geändert.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich brauche eine Bescheinigung.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Bis wann muss ich das erledigen?",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Beratung dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Wo kann ich mich informieren?",
        "context": "Problem lösen"
      },
      {
        "de": "Ich möchte einen Antrag stellen.",
        "context": "Hilfe bitten"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Nichts sagen.",
        "correct": "Höflich und klar antworten.",
        "tip": "Bei Auf der Baustelle ist klare Kommunikation wichtig."
      },
      {
        "wrong": "sagen",
        "correct": "helfen",
        "tip": "Höflich um Hilfe bitten ist immer richtig."
      },
      {
        "wrong": "Okay.",
        "correct": "Vielen Dank, das hilft mir sehr.",
        "tip": "Sich bedanken zeigt Wertschätzung."
      }
    ]
  },
  {
    "id": "a2-31",
    "level": "A2",
    "title": "Tankstelle",
    "titleDe": "An der Tankstelle",
    "icon": "⛽",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: An der Tankstelle.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Nichts sagen.",
              "Einfach weggehen."
            ],
            "answer": 0,
            "explanation": "Bei An der Tankstelle ist klare Kommunikation wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du brauchst Hilfe beim Thema An der Tankstelle.",
            "question": "Könnten Sie mir bitte ___?",
            "options": [
              "helfen",
              "sagen",
              "zeigen"
            ],
            "answer": "helfen",
            "explanation": "Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst eine Frage zum Thema An der Tankstelle.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sie",
              "Könnten",
              "bitte",
              "mir",
              "helfen"
            ],
            "answer": [
              1,
              0,
              3,
              2,
              4
            ],
            "explanation": "Richtig: Könnten Sie mir bitte helfen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand erklärt dir etwas zum Thema An der Tankstelle.",
            "question": "Was sagst du?",
            "options": [
              "Vielen Dank, das hilft mir sehr.",
              "Okay.",
              "Können Sie das wiederholen?"
            ],
            "answer": 0,
            "explanation": "Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "quick_reaction",
            "situation": "Dein Nachbar beschwert sich über Lärm.",
            "question": "Wie reagierst du?",
            "options": [
              "Es tut mir leid, ich werde leiser sein.",
              "Das ist mir egal.",
              "Rufen Sie die Polizei."
            ],
            "answer": 0,
            "explanation": "Sich entschuldigen löst Konflikte schneller."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: An der Tankstelle.",
            "question": "Bei An der Tankstelle ist klare ___ wichtig.",
            "options": [
              "Kommunikation",
              "Frage",
              "Problem"
            ],
            "answer": "Kommunikation",
            "explanation": "Bei An der Tankstelle ist klare Kommunikation wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du brauchst Hilfe beim Thema An der Tankstelle.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "immer",
              "bitten",
              "um",
              "ist",
              "Hilfe",
              "richtig",
              "Höflich"
            ],
            "answer": [
              6,
              2,
              4,
              1,
              3,
              0,
              5
            ],
            "explanation": "Richtig: Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst eine Frage zum Thema An der Tankstelle.",
            "question": "Könnten Sie mir bitte ___?",
            "options": [
              "helfen",
              "komme",
              "bitte"
            ],
            "answer": "helfen",
            "explanation": "Könnten Sie mir bitte helfen?"
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand erklärt dir etwas zum Thema An der Tankstelle.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sich",
              "zeigt",
              "bedanken",
              "Wertschätzung"
            ],
            "answer": [
              0,
              2,
              1,
              3
            ],
            "explanation": "Richtig: Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "fill_blank",
            "situation": "Dein Nachbar beschwert sich über Lärm.",
            "question": "Sich ___ löst Konflikte schneller.",
            "options": [
              "entschuldigen",
              "leider",
              "Hilfe"
            ],
            "answer": "entschuldigen",
            "explanation": "Sich entschuldigen löst Konflikte schneller."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: An der Tankstelle.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Das verstehe ich nicht.",
              "Keine Lust."
            ],
            "answer": 0,
            "explanation": "Bei An der Tankstelle ist klare Kommunikation wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du brauchst Hilfe beim Thema An der Tankstelle.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "helfen",
              "Das kann ich nicht.",
              "Kein Interesse."
            ],
            "answer": 0,
            "explanation": "Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst eine Frage zum Thema An der Tankstelle.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Könnten Sie mir bitte helfen",
              "Das ist nicht mein Problem.",
              "Ich habe keine Ahnung."
            ],
            "answer": 0,
            "explanation": "Richtig: Könnten Sie mir bitte helfen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand erklärt dir etwas zum Thema An der Tankstelle.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Vielen Dank, das hilft mir sehr.",
              "Kein Interesse.",
              "Geht mich nichts an."
            ],
            "answer": 0,
            "explanation": "Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "quick_reaction",
            "situation": "Dein Nachbar beschwert sich über Lärm.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Es tut mir leid, ich werde leiser sein.",
              "Keine Lust.",
              "Vielleicht später."
            ],
            "answer": 0,
            "explanation": "Sich entschuldigen löst Konflikte schneller."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Entschuldigung, können Sie mir helfen?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich verstehe das nicht.",
        "context": "Frage stellen"
      },
      {
        "de": "Können Sie das bitte wiederholen?",
        "context": "Antwort geben"
      },
      {
        "de": "Wie sagt man das auf Deutsch?",
        "context": "Problem lösen"
      },
      {
        "de": "Bitte sprechen Sie langsamer.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Das habe ich nicht verstanden.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Vielen Dank für Ihre Hilfe.",
        "context": "Frage stellen"
      },
      {
        "de": "Wo finde ich Informationen dazu?",
        "context": "Antwort geben"
      },
      {
        "de": "Ich habe eine Frage.",
        "context": "Problem lösen"
      },
      {
        "de": "Können Sie mir das erklären?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich bin neu hier.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Das ist sehr wichtig für mich.",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Alternative?",
        "context": "Antwort geben"
      },
      {
        "de": "Wann kann ich wiederkommen?",
        "context": "Problem lösen"
      },
      {
        "de": "Ist das kostenlos?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich würde gerne einen Termin vereinbaren.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Könnten Sie mir bitte weiterhelfen?",
        "context": "Frage stellen"
      },
      {
        "de": "Das muss ich mir noch überlegen.",
        "context": "Antwort geben"
      },
      {
        "de": "Ich bin damit nicht einverstanden.",
        "context": "Problem lösen"
      },
      {
        "de": "Können wir einen Kompromiss finden?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Das erscheint mir zu teuer.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich hätte gerne eine schriftliche Bestätigung.",
        "context": "Frage stellen"
      },
      {
        "de": "Wann ist der nächste freie Termin?",
        "context": "Antwort geben"
      },
      {
        "de": "Gibt es da Ausnahmen?",
        "context": "Problem lösen"
      },
      {
        "de": "Das war ein Missverständnis.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich möchte mich beschweren.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Können Sie das schriftlich bestätigen?",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es einen Ansprechpartner dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Ich brauche noch etwas Zeit.",
        "context": "Problem lösen"
      },
      {
        "de": "Das ist mir leider nicht möglich.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Welche Unterlagen brauche ich?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich komme aus dem Ausland.",
        "context": "Frage stellen"
      },
      {
        "de": "Mein Deutsch ist noch nicht so gut.",
        "context": "Antwort geben"
      },
      {
        "de": "Können Sie mir das auf Papier geben?",
        "context": "Problem lösen"
      },
      {
        "de": "Wo muss ich unterschreiben?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ist das Formular richtig ausgefüllt?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich habe alles dabei.",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Frist dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Was passiert als nächstes?",
        "context": "Problem lösen"
      },
      {
        "de": "Ich warte auf eine Antwort.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Können Sie mich zurückrufen?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich habe eine Beschwerde.",
        "context": "Frage stellen"
      },
      {
        "de": "Das muss dringend erledigt werden.",
        "context": "Antwort geben"
      },
      {
        "de": "Ich bin seit einem Jahr in Deutschland.",
        "context": "Problem lösen"
      },
      {
        "de": "Meine Adresse hat sich geändert.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich brauche eine Bescheinigung.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Bis wann muss ich das erledigen?",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Beratung dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Wo kann ich mich informieren?",
        "context": "Problem lösen"
      },
      {
        "de": "Ich möchte einen Antrag stellen.",
        "context": "Hilfe bitten"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Nichts sagen.",
        "correct": "Höflich und klar antworten.",
        "tip": "Bei An der Tankstelle ist klare Kommunikation wichtig."
      },
      {
        "wrong": "sagen",
        "correct": "helfen",
        "tip": "Höflich um Hilfe bitten ist immer richtig."
      },
      {
        "wrong": "Okay.",
        "correct": "Vielen Dank, das hilft mir sehr.",
        "tip": "Sich bedanken zeigt Wertschätzung."
      }
    ]
  },
  {
    "id": "a2-32",
    "level": "A2",
    "title": "Reinigung",
    "titleDe": "In der Reinigung",
    "icon": "👔",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: In der Reinigung.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Nichts sagen.",
              "Einfach weggehen."
            ],
            "answer": 0,
            "explanation": "Bei In der Reinigung ist klare Kommunikation wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du brauchst Hilfe beim Thema In der Reinigung.",
            "question": "Könnten Sie mir bitte ___?",
            "options": [
              "helfen",
              "sagen",
              "zeigen"
            ],
            "answer": "helfen",
            "explanation": "Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst eine Frage zum Thema In der Reinigung.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sie",
              "Könnten",
              "bitte",
              "mir",
              "helfen"
            ],
            "answer": [
              1,
              0,
              3,
              2,
              4
            ],
            "explanation": "Richtig: Könnten Sie mir bitte helfen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand erklärt dir etwas zum Thema In der Reinigung.",
            "question": "Was sagst du?",
            "options": [
              "Vielen Dank, das hilft mir sehr.",
              "Okay.",
              "Können Sie das wiederholen?"
            ],
            "answer": 0,
            "explanation": "Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bekommst eine Rechnung per Post.",
            "question": "Was machst du?",
            "options": [
              "Ich überweise den Betrag bis zum Fälligkeitsdatum.",
              "Ich werfe sie weg.",
              "Ich rufe die Polizei."
            ],
            "answer": 0,
            "explanation": "Rechnungen pünktlich bezahlen ist wichtig."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: In der Reinigung.",
            "question": "Bei In der Reinigung ist klare ___ wichtig.",
            "options": [
              "Kommunikation",
              "gerne",
              "dort"
            ],
            "answer": "Kommunikation",
            "explanation": "Bei In der Reinigung ist klare Kommunikation wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du brauchst Hilfe beim Thema In der Reinigung.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "ist",
              "Hilfe",
              "immer",
              "bitten",
              "richtig",
              "Höflich",
              "um"
            ],
            "answer": [
              5,
              6,
              1,
              3,
              0,
              2,
              4
            ],
            "explanation": "Richtig: Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst eine Frage zum Thema In der Reinigung.",
            "question": "Könnten ___ mir bitte helfen?",
            "options": [
              "Sie",
              "brauche",
              "gleich"
            ],
            "answer": "Sie",
            "explanation": "Könnten Sie mir bitte helfen?"
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand erklärt dir etwas zum Thema In der Reinigung.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sich",
              "Wertschätzung",
              "bedanken",
              "zeigt"
            ],
            "answer": [
              0,
              2,
              3,
              1
            ],
            "explanation": "Richtig: Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "fill_blank",
            "situation": "Du bekommst eine Rechnung per Post.",
            "question": "Rechnungen ___ bezahlen ist wichtig.",
            "options": [
              "pünktlich",
              "heute",
              "gehe"
            ],
            "answer": "pünktlich",
            "explanation": "Rechnungen pünktlich bezahlen ist wichtig."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: In der Reinigung.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Kein Interesse.",
              "Muss das sein?"
            ],
            "answer": 0,
            "explanation": "Bei In der Reinigung ist klare Kommunikation wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du brauchst Hilfe beim Thema In der Reinigung.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "helfen",
              "Vielleicht später.",
              "Geht mich nichts an."
            ],
            "answer": 0,
            "explanation": "Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst eine Frage zum Thema In der Reinigung.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Könnten Sie mir bitte helfen",
              "Muss das sein?",
              "Ich habe keine Ahnung."
            ],
            "answer": 0,
            "explanation": "Richtig: Könnten Sie mir bitte helfen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand erklärt dir etwas zum Thema In der Reinigung.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Vielen Dank, das hilft mir sehr.",
              "Das verstehe ich nicht.",
              "Fragen Sie jemand anderen."
            ],
            "answer": 0,
            "explanation": "Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bekommst eine Rechnung per Post.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich überweise den Betrag bis zum Fälligkeitsdatum.",
              "Ich weiß es nicht.",
              "Vielleicht später."
            ],
            "answer": 0,
            "explanation": "Rechnungen pünktlich bezahlen ist wichtig."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Entschuldigung, können Sie mir helfen?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich verstehe das nicht.",
        "context": "Frage stellen"
      },
      {
        "de": "Können Sie das bitte wiederholen?",
        "context": "Antwort geben"
      },
      {
        "de": "Wie sagt man das auf Deutsch?",
        "context": "Problem lösen"
      },
      {
        "de": "Bitte sprechen Sie langsamer.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Das habe ich nicht verstanden.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Vielen Dank für Ihre Hilfe.",
        "context": "Frage stellen"
      },
      {
        "de": "Wo finde ich Informationen dazu?",
        "context": "Antwort geben"
      },
      {
        "de": "Ich habe eine Frage.",
        "context": "Problem lösen"
      },
      {
        "de": "Können Sie mir das erklären?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich bin neu hier.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Das ist sehr wichtig für mich.",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Alternative?",
        "context": "Antwort geben"
      },
      {
        "de": "Wann kann ich wiederkommen?",
        "context": "Problem lösen"
      },
      {
        "de": "Ist das kostenlos?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich würde gerne einen Termin vereinbaren.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Könnten Sie mir bitte weiterhelfen?",
        "context": "Frage stellen"
      },
      {
        "de": "Das muss ich mir noch überlegen.",
        "context": "Antwort geben"
      },
      {
        "de": "Ich bin damit nicht einverstanden.",
        "context": "Problem lösen"
      },
      {
        "de": "Können wir einen Kompromiss finden?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Das erscheint mir zu teuer.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich hätte gerne eine schriftliche Bestätigung.",
        "context": "Frage stellen"
      },
      {
        "de": "Wann ist der nächste freie Termin?",
        "context": "Antwort geben"
      },
      {
        "de": "Gibt es da Ausnahmen?",
        "context": "Problem lösen"
      },
      {
        "de": "Das war ein Missverständnis.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich möchte mich beschweren.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Können Sie das schriftlich bestätigen?",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es einen Ansprechpartner dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Ich brauche noch etwas Zeit.",
        "context": "Problem lösen"
      },
      {
        "de": "Das ist mir leider nicht möglich.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Welche Unterlagen brauche ich?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich komme aus dem Ausland.",
        "context": "Frage stellen"
      },
      {
        "de": "Mein Deutsch ist noch nicht so gut.",
        "context": "Antwort geben"
      },
      {
        "de": "Können Sie mir das auf Papier geben?",
        "context": "Problem lösen"
      },
      {
        "de": "Wo muss ich unterschreiben?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ist das Formular richtig ausgefüllt?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich habe alles dabei.",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Frist dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Was passiert als nächstes?",
        "context": "Problem lösen"
      },
      {
        "de": "Ich warte auf eine Antwort.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Können Sie mich zurückrufen?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich habe eine Beschwerde.",
        "context": "Frage stellen"
      },
      {
        "de": "Das muss dringend erledigt werden.",
        "context": "Antwort geben"
      },
      {
        "de": "Ich bin seit einem Jahr in Deutschland.",
        "context": "Problem lösen"
      },
      {
        "de": "Meine Adresse hat sich geändert.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich brauche eine Bescheinigung.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Bis wann muss ich das erledigen?",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Beratung dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Wo kann ich mich informieren?",
        "context": "Problem lösen"
      },
      {
        "de": "Ich möchte einen Antrag stellen.",
        "context": "Hilfe bitten"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Nichts sagen.",
        "correct": "Höflich und klar antworten.",
        "tip": "Bei In der Reinigung ist klare Kommunikation wichtig."
      },
      {
        "wrong": "sagen",
        "correct": "helfen",
        "tip": "Höflich um Hilfe bitten ist immer richtig."
      },
      {
        "wrong": "Okay.",
        "correct": "Vielen Dank, das hilft mir sehr.",
        "tip": "Sich bedanken zeigt Wertschätzung."
      }
    ]
  },
  {
    "id": "a2-33",
    "level": "A2",
    "title": "Marktplatz",
    "titleDe": "Auf dem Wochenmarkt",
    "icon": "🥦",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Auf dem Wochenmarkt.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Nichts sagen.",
              "Einfach weggehen."
            ],
            "answer": 0,
            "explanation": "Bei Auf dem Wochenmarkt ist klare Kommunikation wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du brauchst Hilfe beim Thema Auf dem Wochenmarkt.",
            "question": "Könnten Sie mir bitte ___?",
            "options": [
              "helfen",
              "sagen",
              "zeigen"
            ],
            "answer": "helfen",
            "explanation": "Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst eine Frage zum Thema Auf dem Wochenmarkt.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sie",
              "Könnten",
              "bitte",
              "mir",
              "helfen"
            ],
            "answer": [
              1,
              0,
              3,
              2,
              4
            ],
            "explanation": "Richtig: Könnten Sie mir bitte helfen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand erklärt dir etwas zum Thema Auf dem Wochenmarkt.",
            "question": "Was sagst du?",
            "options": [
              "Vielen Dank, das hilft mir sehr.",
              "Okay.",
              "Können Sie das wiederholen?"
            ],
            "answer": 0,
            "explanation": "Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du willst einen Termin absagen.",
            "question": "Was sagst du?",
            "options": [
              "Ich muss den Termin leider absagen.",
              "Ich komme nicht.",
              "Vergessen Sie es."
            ],
            "answer": 0,
            "explanation": "Höfliches Absagen ist im Deutschen wichtig."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Auf dem Wochenmarkt.",
            "question": "Bei Auf dem Wochenmarkt ___ klare Kommunikation wichtig.",
            "options": [
              "ist",
              "Problem",
              "jetzt"
            ],
            "answer": "ist",
            "explanation": "Bei Auf dem Wochenmarkt ist klare Kommunikation wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du brauchst Hilfe beim Thema Auf dem Wochenmarkt.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "immer",
              "bitten",
              "richtig",
              "ist",
              "Höflich",
              "um",
              "Hilfe"
            ],
            "answer": [
              4,
              5,
              6,
              1,
              3,
              0,
              2
            ],
            "explanation": "Richtig: Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst eine Frage zum Thema Auf dem Wochenmarkt.",
            "question": "Könnten Sie mir bitte ___?",
            "options": [
              "helfen",
              "wichtig",
              "Geld"
            ],
            "answer": "helfen",
            "explanation": "Könnten Sie mir bitte helfen?"
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand erklärt dir etwas zum Thema Auf dem Wochenmarkt.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Wertschätzung",
              "zeigt",
              "bedanken",
              "Sich"
            ],
            "answer": [
              3,
              2,
              1,
              0
            ],
            "explanation": "Richtig: Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "fill_blank",
            "situation": "Du willst einen Termin absagen.",
            "question": "Höfliches Absagen ist im Deutschen ___.",
            "options": [
              "wichtig",
              "falsch",
              "nötig"
            ],
            "answer": "wichtig",
            "explanation": "Höfliches Absagen ist im Deutschen wichtig."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Auf dem Wochenmarkt.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Das kann ich nicht.",
              "Muss das sein?"
            ],
            "answer": 0,
            "explanation": "Bei Auf dem Wochenmarkt ist klare Kommunikation wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du brauchst Hilfe beim Thema Auf dem Wochenmarkt.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "helfen",
              "Mir egal.",
              "Ich habe keine Ahnung."
            ],
            "answer": 0,
            "explanation": "Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst eine Frage zum Thema Auf dem Wochenmarkt.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Könnten Sie mir bitte helfen",
              "Fragen Sie jemand anderen.",
              "Ich habe keine Ahnung."
            ],
            "answer": 0,
            "explanation": "Richtig: Könnten Sie mir bitte helfen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand erklärt dir etwas zum Thema Auf dem Wochenmarkt.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Vielen Dank, das hilft mir sehr.",
              "Muss das sein?",
              "Fragen Sie jemand anderen."
            ],
            "answer": 0,
            "explanation": "Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du willst einen Termin absagen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich muss den Termin leider absagen.",
              "Geht mich nichts an.",
              "Muss das sein?"
            ],
            "answer": 0,
            "explanation": "Höfliches Absagen ist im Deutschen wichtig."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Entschuldigung, können Sie mir helfen?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich verstehe das nicht.",
        "context": "Frage stellen"
      },
      {
        "de": "Können Sie das bitte wiederholen?",
        "context": "Antwort geben"
      },
      {
        "de": "Wie sagt man das auf Deutsch?",
        "context": "Problem lösen"
      },
      {
        "de": "Bitte sprechen Sie langsamer.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Das habe ich nicht verstanden.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Vielen Dank für Ihre Hilfe.",
        "context": "Frage stellen"
      },
      {
        "de": "Wo finde ich Informationen dazu?",
        "context": "Antwort geben"
      },
      {
        "de": "Ich habe eine Frage.",
        "context": "Problem lösen"
      },
      {
        "de": "Können Sie mir das erklären?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich bin neu hier.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Das ist sehr wichtig für mich.",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Alternative?",
        "context": "Antwort geben"
      },
      {
        "de": "Wann kann ich wiederkommen?",
        "context": "Problem lösen"
      },
      {
        "de": "Ist das kostenlos?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich würde gerne einen Termin vereinbaren.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Könnten Sie mir bitte weiterhelfen?",
        "context": "Frage stellen"
      },
      {
        "de": "Das muss ich mir noch überlegen.",
        "context": "Antwort geben"
      },
      {
        "de": "Ich bin damit nicht einverstanden.",
        "context": "Problem lösen"
      },
      {
        "de": "Können wir einen Kompromiss finden?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Das erscheint mir zu teuer.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich hätte gerne eine schriftliche Bestätigung.",
        "context": "Frage stellen"
      },
      {
        "de": "Wann ist der nächste freie Termin?",
        "context": "Antwort geben"
      },
      {
        "de": "Gibt es da Ausnahmen?",
        "context": "Problem lösen"
      },
      {
        "de": "Das war ein Missverständnis.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich möchte mich beschweren.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Können Sie das schriftlich bestätigen?",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es einen Ansprechpartner dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Ich brauche noch etwas Zeit.",
        "context": "Problem lösen"
      },
      {
        "de": "Das ist mir leider nicht möglich.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Welche Unterlagen brauche ich?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich komme aus dem Ausland.",
        "context": "Frage stellen"
      },
      {
        "de": "Mein Deutsch ist noch nicht so gut.",
        "context": "Antwort geben"
      },
      {
        "de": "Können Sie mir das auf Papier geben?",
        "context": "Problem lösen"
      },
      {
        "de": "Wo muss ich unterschreiben?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ist das Formular richtig ausgefüllt?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich habe alles dabei.",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Frist dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Was passiert als nächstes?",
        "context": "Problem lösen"
      },
      {
        "de": "Ich warte auf eine Antwort.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Können Sie mich zurückrufen?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich habe eine Beschwerde.",
        "context": "Frage stellen"
      },
      {
        "de": "Das muss dringend erledigt werden.",
        "context": "Antwort geben"
      },
      {
        "de": "Ich bin seit einem Jahr in Deutschland.",
        "context": "Problem lösen"
      },
      {
        "de": "Meine Adresse hat sich geändert.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich brauche eine Bescheinigung.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Bis wann muss ich das erledigen?",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Beratung dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Wo kann ich mich informieren?",
        "context": "Problem lösen"
      },
      {
        "de": "Ich möchte einen Antrag stellen.",
        "context": "Hilfe bitten"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Nichts sagen.",
        "correct": "Höflich und klar antworten.",
        "tip": "Bei Auf dem Wochenmarkt ist klare Kommunikation wichtig."
      },
      {
        "wrong": "sagen",
        "correct": "helfen",
        "tip": "Höflich um Hilfe bitten ist immer richtig."
      },
      {
        "wrong": "Okay.",
        "correct": "Vielen Dank, das hilft mir sehr.",
        "tip": "Sich bedanken zeigt Wertschätzung."
      }
    ]
  },
  {
    "id": "a2-34",
    "level": "A2",
    "title": "Nachbarschaftshilfe",
    "titleDe": "Nachbarn helfen",
    "icon": "🤝",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Nachbarn helfen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Nichts sagen.",
              "Einfach weggehen."
            ],
            "answer": 0,
            "explanation": "Bei Nachbarn helfen ist klare Kommunikation wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du brauchst Hilfe beim Thema Nachbarn helfen.",
            "question": "Könnten Sie mir bitte ___?",
            "options": [
              "helfen",
              "sagen",
              "zeigen"
            ],
            "answer": "helfen",
            "explanation": "Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst eine Frage zum Thema Nachbarn helfen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sie",
              "Könnten",
              "bitte",
              "mir",
              "helfen"
            ],
            "answer": [
              1,
              0,
              3,
              2,
              4
            ],
            "explanation": "Richtig: Könnten Sie mir bitte helfen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand erklärt dir etwas zum Thema Nachbarn helfen.",
            "question": "Was sagst du?",
            "options": [
              "Vielen Dank, das hilft mir sehr.",
              "Okay.",
              "Können Sie das wiederholen?"
            ],
            "answer": 0,
            "explanation": "Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "quick_reaction",
            "situation": "Ein Kollege fragt nach deiner Meinung.",
            "question": "Wie antwortest du?",
            "options": [
              "Ich finde, das ist eine gute Idee.",
              "Keine Ahnung.",
              "Mir egal."
            ],
            "answer": 0,
            "explanation": "Eine begründete Meinung zeigt Engagement."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Nachbarn helfen.",
            "question": "Bei ___ helfen ist klare Kommunikation wichtig.",
            "options": [
              "Nachbarn",
              "dort",
              "Problem"
            ],
            "answer": "Nachbarn",
            "explanation": "Bei Nachbarn helfen ist klare Kommunikation wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du brauchst Hilfe beim Thema Nachbarn helfen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "bitten",
              "ist",
              "um",
              "richtig",
              "Höflich",
              "Hilfe",
              "immer"
            ],
            "answer": [
              4,
              2,
              5,
              0,
              1,
              6,
              3
            ],
            "explanation": "Richtig: Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst eine Frage zum Thema Nachbarn helfen.",
            "question": "Könnten Sie ___ bitte helfen?",
            "options": [
              "mir",
              "Zeit",
              "falsch"
            ],
            "answer": "mir",
            "explanation": "Könnten Sie mir bitte helfen?"
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand erklärt dir etwas zum Thema Nachbarn helfen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Wertschätzung",
              "zeigt",
              "Sich",
              "bedanken"
            ],
            "answer": [
              2,
              3,
              1,
              0
            ],
            "explanation": "Richtig: Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "fill_blank",
            "situation": "Ein Kollege fragt nach deiner Meinung.",
            "question": "Eine begründete ___ zeigt Engagement.",
            "options": [
              "Meinung",
              "brauche",
              "richtig"
            ],
            "answer": "Meinung",
            "explanation": "Eine begründete Meinung zeigt Engagement."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Nachbarn helfen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Das ist nicht mein Problem.",
              "Vielleicht später."
            ],
            "answer": 0,
            "explanation": "Bei Nachbarn helfen ist klare Kommunikation wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du brauchst Hilfe beim Thema Nachbarn helfen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "helfen",
              "Ich weiß es nicht.",
              "Das verstehe ich nicht."
            ],
            "answer": 0,
            "explanation": "Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst eine Frage zum Thema Nachbarn helfen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Könnten Sie mir bitte helfen",
              "Vielleicht später.",
              "Muss das sein?"
            ],
            "answer": 0,
            "explanation": "Richtig: Könnten Sie mir bitte helfen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand erklärt dir etwas zum Thema Nachbarn helfen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Vielen Dank, das hilft mir sehr.",
              "Ich weiß es nicht.",
              "Fragen Sie jemand anderen."
            ],
            "answer": 0,
            "explanation": "Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "quick_reaction",
            "situation": "Ein Kollege fragt nach deiner Meinung.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich finde, das ist eine gute Idee.",
              "Das verstehe ich nicht.",
              "Ich habe keine Ahnung."
            ],
            "answer": 0,
            "explanation": "Eine begründete Meinung zeigt Engagement."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Entschuldigung, können Sie mir helfen?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich verstehe das nicht.",
        "context": "Frage stellen"
      },
      {
        "de": "Können Sie das bitte wiederholen?",
        "context": "Antwort geben"
      },
      {
        "de": "Wie sagt man das auf Deutsch?",
        "context": "Problem lösen"
      },
      {
        "de": "Bitte sprechen Sie langsamer.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Das habe ich nicht verstanden.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Vielen Dank für Ihre Hilfe.",
        "context": "Frage stellen"
      },
      {
        "de": "Wo finde ich Informationen dazu?",
        "context": "Antwort geben"
      },
      {
        "de": "Ich habe eine Frage.",
        "context": "Problem lösen"
      },
      {
        "de": "Können Sie mir das erklären?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich bin neu hier.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Das ist sehr wichtig für mich.",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Alternative?",
        "context": "Antwort geben"
      },
      {
        "de": "Wann kann ich wiederkommen?",
        "context": "Problem lösen"
      },
      {
        "de": "Ist das kostenlos?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich würde gerne einen Termin vereinbaren.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Könnten Sie mir bitte weiterhelfen?",
        "context": "Frage stellen"
      },
      {
        "de": "Das muss ich mir noch überlegen.",
        "context": "Antwort geben"
      },
      {
        "de": "Ich bin damit nicht einverstanden.",
        "context": "Problem lösen"
      },
      {
        "de": "Können wir einen Kompromiss finden?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Das erscheint mir zu teuer.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich hätte gerne eine schriftliche Bestätigung.",
        "context": "Frage stellen"
      },
      {
        "de": "Wann ist der nächste freie Termin?",
        "context": "Antwort geben"
      },
      {
        "de": "Gibt es da Ausnahmen?",
        "context": "Problem lösen"
      },
      {
        "de": "Das war ein Missverständnis.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich möchte mich beschweren.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Können Sie das schriftlich bestätigen?",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es einen Ansprechpartner dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Ich brauche noch etwas Zeit.",
        "context": "Problem lösen"
      },
      {
        "de": "Das ist mir leider nicht möglich.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Welche Unterlagen brauche ich?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich komme aus dem Ausland.",
        "context": "Frage stellen"
      },
      {
        "de": "Mein Deutsch ist noch nicht so gut.",
        "context": "Antwort geben"
      },
      {
        "de": "Können Sie mir das auf Papier geben?",
        "context": "Problem lösen"
      },
      {
        "de": "Wo muss ich unterschreiben?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ist das Formular richtig ausgefüllt?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich habe alles dabei.",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Frist dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Was passiert als nächstes?",
        "context": "Problem lösen"
      },
      {
        "de": "Ich warte auf eine Antwort.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Können Sie mich zurückrufen?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich habe eine Beschwerde.",
        "context": "Frage stellen"
      },
      {
        "de": "Das muss dringend erledigt werden.",
        "context": "Antwort geben"
      },
      {
        "de": "Ich bin seit einem Jahr in Deutschland.",
        "context": "Problem lösen"
      },
      {
        "de": "Meine Adresse hat sich geändert.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich brauche eine Bescheinigung.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Bis wann muss ich das erledigen?",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Beratung dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Wo kann ich mich informieren?",
        "context": "Problem lösen"
      },
      {
        "de": "Ich möchte einen Antrag stellen.",
        "context": "Hilfe bitten"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Nichts sagen.",
        "correct": "Höflich und klar antworten.",
        "tip": "Bei Nachbarn helfen ist klare Kommunikation wichtig."
      },
      {
        "wrong": "sagen",
        "correct": "helfen",
        "tip": "Höflich um Hilfe bitten ist immer richtig."
      },
      {
        "wrong": "Okay.",
        "correct": "Vielen Dank, das hilft mir sehr.",
        "tip": "Sich bedanken zeigt Wertschätzung."
      }
    ]
  },
  {
    "id": "a2-35",
    "level": "A2",
    "title": "Spielplatz",
    "titleDe": "Auf dem Spielplatz",
    "icon": "🎠",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Auf dem Spielplatz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Nichts sagen.",
              "Einfach weggehen."
            ],
            "answer": 0,
            "explanation": "Bei Auf dem Spielplatz ist klare Kommunikation wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du brauchst Hilfe beim Thema Auf dem Spielplatz.",
            "question": "Könnten Sie mir bitte ___?",
            "options": [
              "helfen",
              "sagen",
              "zeigen"
            ],
            "answer": "helfen",
            "explanation": "Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst eine Frage zum Thema Auf dem Spielplatz.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sie",
              "Könnten",
              "bitte",
              "mir",
              "helfen"
            ],
            "answer": [
              1,
              0,
              3,
              2,
              4
            ],
            "explanation": "Richtig: Könnten Sie mir bitte helfen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand erklärt dir etwas zum Thema Auf dem Spielplatz.",
            "question": "Was sagst du?",
            "options": [
              "Vielen Dank, das hilft mir sehr.",
              "Okay.",
              "Können Sie das wiederholen?"
            ],
            "answer": 0,
            "explanation": "Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du erhältst ein Paket.",
            "question": "Was machst du?",
            "options": [
              "Ich unterschreibe und bedanke mich.",
              "Ich nehme es ohne Worte.",
              "Ich öffne es vor dem Postboten."
            ],
            "answer": 0,
            "explanation": "Beim Paketempfang unterschreibt man die Zustellung."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Auf dem Spielplatz.",
            "question": "Bei ___ dem Spielplatz ist klare Kommunikation wichtig.",
            "options": [
              "Auf",
              "Antwort",
              "Arbeit"
            ],
            "answer": "Auf",
            "explanation": "Bei Auf dem Spielplatz ist klare Kommunikation wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du brauchst Hilfe beim Thema Auf dem Spielplatz.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Hilfe",
              "Höflich",
              "um",
              "ist",
              "bitten",
              "richtig",
              "immer"
            ],
            "answer": [
              1,
              2,
              0,
              4,
              3,
              6,
              5
            ],
            "explanation": "Richtig: Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst eine Frage zum Thema Auf dem Spielplatz.",
            "question": "Könnten Sie ___ bitte helfen?",
            "options": [
              "mir",
              "Problem",
              "jetzt"
            ],
            "answer": "mir",
            "explanation": "Könnten Sie mir bitte helfen?"
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand erklärt dir etwas zum Thema Auf dem Spielplatz.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Wertschätzung",
              "zeigt",
              "bedanken",
              "Sich"
            ],
            "answer": [
              3,
              2,
              1,
              0
            ],
            "explanation": "Richtig: Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "fill_blank",
            "situation": "Du erhältst ein Paket.",
            "question": "Beim Paketempfang unterschreibt man die ___.",
            "options": [
              "Zustellung",
              "Hilfe",
              "möchte"
            ],
            "answer": "Zustellung",
            "explanation": "Beim Paketempfang unterschreibt man die Zustellung."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Auf dem Spielplatz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Ich weiß es nicht.",
              "Kein Interesse."
            ],
            "answer": 0,
            "explanation": "Bei Auf dem Spielplatz ist klare Kommunikation wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du brauchst Hilfe beim Thema Auf dem Spielplatz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "helfen",
              "Das verstehe ich nicht.",
              "Fragen Sie jemand anderen."
            ],
            "answer": 0,
            "explanation": "Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst eine Frage zum Thema Auf dem Spielplatz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Könnten Sie mir bitte helfen",
              "Fragen Sie jemand anderen.",
              "Keine Lust."
            ],
            "answer": 0,
            "explanation": "Richtig: Könnten Sie mir bitte helfen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand erklärt dir etwas zum Thema Auf dem Spielplatz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Vielen Dank, das hilft mir sehr.",
              "Ich weiß es nicht.",
              "Das ist nicht mein Problem."
            ],
            "answer": 0,
            "explanation": "Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du erhältst ein Paket.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich unterschreibe und bedanke mich.",
              "Ich habe keine Ahnung.",
              "Ich weiß es nicht."
            ],
            "answer": 0,
            "explanation": "Beim Paketempfang unterschreibt man die Zustellung."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Entschuldigung, können Sie mir helfen?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich verstehe das nicht.",
        "context": "Frage stellen"
      },
      {
        "de": "Können Sie das bitte wiederholen?",
        "context": "Antwort geben"
      },
      {
        "de": "Wie sagt man das auf Deutsch?",
        "context": "Problem lösen"
      },
      {
        "de": "Bitte sprechen Sie langsamer.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Das habe ich nicht verstanden.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Vielen Dank für Ihre Hilfe.",
        "context": "Frage stellen"
      },
      {
        "de": "Wo finde ich Informationen dazu?",
        "context": "Antwort geben"
      },
      {
        "de": "Ich habe eine Frage.",
        "context": "Problem lösen"
      },
      {
        "de": "Können Sie mir das erklären?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich bin neu hier.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Das ist sehr wichtig für mich.",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Alternative?",
        "context": "Antwort geben"
      },
      {
        "de": "Wann kann ich wiederkommen?",
        "context": "Problem lösen"
      },
      {
        "de": "Ist das kostenlos?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich würde gerne einen Termin vereinbaren.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Könnten Sie mir bitte weiterhelfen?",
        "context": "Frage stellen"
      },
      {
        "de": "Das muss ich mir noch überlegen.",
        "context": "Antwort geben"
      },
      {
        "de": "Ich bin damit nicht einverstanden.",
        "context": "Problem lösen"
      },
      {
        "de": "Können wir einen Kompromiss finden?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Das erscheint mir zu teuer.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich hätte gerne eine schriftliche Bestätigung.",
        "context": "Frage stellen"
      },
      {
        "de": "Wann ist der nächste freie Termin?",
        "context": "Antwort geben"
      },
      {
        "de": "Gibt es da Ausnahmen?",
        "context": "Problem lösen"
      },
      {
        "de": "Das war ein Missverständnis.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich möchte mich beschweren.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Können Sie das schriftlich bestätigen?",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es einen Ansprechpartner dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Ich brauche noch etwas Zeit.",
        "context": "Problem lösen"
      },
      {
        "de": "Das ist mir leider nicht möglich.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Welche Unterlagen brauche ich?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich komme aus dem Ausland.",
        "context": "Frage stellen"
      },
      {
        "de": "Mein Deutsch ist noch nicht so gut.",
        "context": "Antwort geben"
      },
      {
        "de": "Können Sie mir das auf Papier geben?",
        "context": "Problem lösen"
      },
      {
        "de": "Wo muss ich unterschreiben?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ist das Formular richtig ausgefüllt?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich habe alles dabei.",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Frist dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Was passiert als nächstes?",
        "context": "Problem lösen"
      },
      {
        "de": "Ich warte auf eine Antwort.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Können Sie mich zurückrufen?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich habe eine Beschwerde.",
        "context": "Frage stellen"
      },
      {
        "de": "Das muss dringend erledigt werden.",
        "context": "Antwort geben"
      },
      {
        "de": "Ich bin seit einem Jahr in Deutschland.",
        "context": "Problem lösen"
      },
      {
        "de": "Meine Adresse hat sich geändert.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich brauche eine Bescheinigung.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Bis wann muss ich das erledigen?",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Beratung dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Wo kann ich mich informieren?",
        "context": "Problem lösen"
      },
      {
        "de": "Ich möchte einen Antrag stellen.",
        "context": "Hilfe bitten"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Nichts sagen.",
        "correct": "Höflich und klar antworten.",
        "tip": "Bei Auf dem Spielplatz ist klare Kommunikation wichtig."
      },
      {
        "wrong": "sagen",
        "correct": "helfen",
        "tip": "Höflich um Hilfe bitten ist immer richtig."
      },
      {
        "wrong": "Okay.",
        "correct": "Vielen Dank, das hilft mir sehr.",
        "tip": "Sich bedanken zeigt Wertschätzung."
      }
    ]
  },
  {
    "id": "a2-36",
    "level": "A2",
    "title": "Volkshochschule",
    "titleDe": "An der VHS anmelden",
    "icon": "🎓",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: An der VHS anmelden.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Nichts sagen.",
              "Einfach weggehen."
            ],
            "answer": 0,
            "explanation": "Bei An der VHS anmelden ist klare Kommunikation wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du brauchst Hilfe beim Thema An der VHS anmelden.",
            "question": "Könnten Sie mir bitte ___?",
            "options": [
              "helfen",
              "sagen",
              "zeigen"
            ],
            "answer": "helfen",
            "explanation": "Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst eine Frage zum Thema An der VHS anmelden.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sie",
              "Könnten",
              "bitte",
              "mir",
              "helfen"
            ],
            "answer": [
              1,
              0,
              3,
              2,
              4
            ],
            "explanation": "Richtig: Könnten Sie mir bitte helfen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand erklärt dir etwas zum Thema An der VHS anmelden.",
            "question": "Was sagst du?",
            "options": [
              "Vielen Dank, das hilft mir sehr.",
              "Okay.",
              "Können Sie das wiederholen?"
            ],
            "answer": 0,
            "explanation": "Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "quick_reaction",
            "situation": "Dein Nachbar beschwert sich über Lärm.",
            "question": "Wie reagierst du?",
            "options": [
              "Es tut mir leid, ich werde leiser sein.",
              "Das ist mir egal.",
              "Rufen Sie die Polizei."
            ],
            "answer": 0,
            "explanation": "Sich entschuldigen löst Konflikte schneller."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: An der VHS anmelden.",
            "question": "Bei An der ___ anmelden ist klare Kommunikation wichtig.",
            "options": [
              "VHS",
              "Antwort",
              "komme"
            ],
            "answer": "VHS",
            "explanation": "Bei An der VHS anmelden ist klare Kommunikation wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du brauchst Hilfe beim Thema An der VHS anmelden.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Höflich",
              "ist",
              "bitten",
              "immer",
              "richtig",
              "Hilfe",
              "um"
            ],
            "answer": [
              0,
              6,
              5,
              2,
              1,
              3,
              4
            ],
            "explanation": "Richtig: Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst eine Frage zum Thema An der VHS anmelden.",
            "question": "Könnten ___ mir bitte helfen?",
            "options": [
              "Sie",
              "suche",
              "nehme"
            ],
            "answer": "Sie",
            "explanation": "Könnten Sie mir bitte helfen?"
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand erklärt dir etwas zum Thema An der VHS anmelden.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Wertschätzung",
              "bedanken",
              "Sich",
              "zeigt"
            ],
            "answer": [
              2,
              1,
              3,
              0
            ],
            "explanation": "Richtig: Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "fill_blank",
            "situation": "Dein Nachbar beschwert sich über Lärm.",
            "question": "Sich ___ löst Konflikte schneller.",
            "options": [
              "entschuldigen",
              "falsch",
              "jetzt"
            ],
            "answer": "entschuldigen",
            "explanation": "Sich entschuldigen löst Konflikte schneller."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: An der VHS anmelden.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Fragen Sie jemand anderen.",
              "Das verstehe ich nicht."
            ],
            "answer": 0,
            "explanation": "Bei An der VHS anmelden ist klare Kommunikation wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du brauchst Hilfe beim Thema An der VHS anmelden.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "helfen",
              "Das verstehe ich nicht.",
              "Fragen Sie jemand anderen."
            ],
            "answer": 0,
            "explanation": "Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst eine Frage zum Thema An der VHS anmelden.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Könnten Sie mir bitte helfen",
              "Fragen Sie jemand anderen.",
              "Kein Interesse."
            ],
            "answer": 0,
            "explanation": "Richtig: Könnten Sie mir bitte helfen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand erklärt dir etwas zum Thema An der VHS anmelden.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Vielen Dank, das hilft mir sehr.",
              "Das verstehe ich nicht.",
              "Geht mich nichts an."
            ],
            "answer": 0,
            "explanation": "Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "quick_reaction",
            "situation": "Dein Nachbar beschwert sich über Lärm.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Es tut mir leid, ich werde leiser sein.",
              "Vielleicht später.",
              "Das verstehe ich nicht."
            ],
            "answer": 0,
            "explanation": "Sich entschuldigen löst Konflikte schneller."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Entschuldigung, können Sie mir helfen?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich verstehe das nicht.",
        "context": "Frage stellen"
      },
      {
        "de": "Können Sie das bitte wiederholen?",
        "context": "Antwort geben"
      },
      {
        "de": "Wie sagt man das auf Deutsch?",
        "context": "Problem lösen"
      },
      {
        "de": "Bitte sprechen Sie langsamer.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Das habe ich nicht verstanden.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Vielen Dank für Ihre Hilfe.",
        "context": "Frage stellen"
      },
      {
        "de": "Wo finde ich Informationen dazu?",
        "context": "Antwort geben"
      },
      {
        "de": "Ich habe eine Frage.",
        "context": "Problem lösen"
      },
      {
        "de": "Können Sie mir das erklären?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich bin neu hier.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Das ist sehr wichtig für mich.",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Alternative?",
        "context": "Antwort geben"
      },
      {
        "de": "Wann kann ich wiederkommen?",
        "context": "Problem lösen"
      },
      {
        "de": "Ist das kostenlos?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich würde gerne einen Termin vereinbaren.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Könnten Sie mir bitte weiterhelfen?",
        "context": "Frage stellen"
      },
      {
        "de": "Das muss ich mir noch überlegen.",
        "context": "Antwort geben"
      },
      {
        "de": "Ich bin damit nicht einverstanden.",
        "context": "Problem lösen"
      },
      {
        "de": "Können wir einen Kompromiss finden?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Das erscheint mir zu teuer.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich hätte gerne eine schriftliche Bestätigung.",
        "context": "Frage stellen"
      },
      {
        "de": "Wann ist der nächste freie Termin?",
        "context": "Antwort geben"
      },
      {
        "de": "Gibt es da Ausnahmen?",
        "context": "Problem lösen"
      },
      {
        "de": "Das war ein Missverständnis.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich möchte mich beschweren.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Können Sie das schriftlich bestätigen?",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es einen Ansprechpartner dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Ich brauche noch etwas Zeit.",
        "context": "Problem lösen"
      },
      {
        "de": "Das ist mir leider nicht möglich.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Welche Unterlagen brauche ich?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich komme aus dem Ausland.",
        "context": "Frage stellen"
      },
      {
        "de": "Mein Deutsch ist noch nicht so gut.",
        "context": "Antwort geben"
      },
      {
        "de": "Können Sie mir das auf Papier geben?",
        "context": "Problem lösen"
      },
      {
        "de": "Wo muss ich unterschreiben?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ist das Formular richtig ausgefüllt?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich habe alles dabei.",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Frist dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Was passiert als nächstes?",
        "context": "Problem lösen"
      },
      {
        "de": "Ich warte auf eine Antwort.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Können Sie mich zurückrufen?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich habe eine Beschwerde.",
        "context": "Frage stellen"
      },
      {
        "de": "Das muss dringend erledigt werden.",
        "context": "Antwort geben"
      },
      {
        "de": "Ich bin seit einem Jahr in Deutschland.",
        "context": "Problem lösen"
      },
      {
        "de": "Meine Adresse hat sich geändert.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich brauche eine Bescheinigung.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Bis wann muss ich das erledigen?",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Beratung dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Wo kann ich mich informieren?",
        "context": "Problem lösen"
      },
      {
        "de": "Ich möchte einen Antrag stellen.",
        "context": "Hilfe bitten"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Nichts sagen.",
        "correct": "Höflich und klar antworten.",
        "tip": "Bei An der VHS anmelden ist klare Kommunikation wichtig."
      },
      {
        "wrong": "sagen",
        "correct": "helfen",
        "tip": "Höflich um Hilfe bitten ist immer richtig."
      },
      {
        "wrong": "Okay.",
        "correct": "Vielen Dank, das hilft mir sehr.",
        "tip": "Sich bedanken zeigt Wertschätzung."
      }
    ]
  },
  {
    "id": "a2-37",
    "level": "A2",
    "title": "Nebenjob",
    "titleDe": "Einen Nebenjob suchen",
    "icon": "💼",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Einen Nebenjob suchen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Nichts sagen.",
              "Einfach weggehen."
            ],
            "answer": 0,
            "explanation": "Bei Einen Nebenjob suchen ist klare Kommunikation wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du brauchst Hilfe beim Thema Einen Nebenjob suchen.",
            "question": "Könnten Sie mir bitte ___?",
            "options": [
              "helfen",
              "sagen",
              "zeigen"
            ],
            "answer": "helfen",
            "explanation": "Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst eine Frage zum Thema Einen Nebenjob suchen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sie",
              "Könnten",
              "bitte",
              "mir",
              "helfen"
            ],
            "answer": [
              1,
              0,
              3,
              2,
              4
            ],
            "explanation": "Richtig: Könnten Sie mir bitte helfen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand erklärt dir etwas zum Thema Einen Nebenjob suchen.",
            "question": "Was sagst du?",
            "options": [
              "Vielen Dank, das hilft mir sehr.",
              "Okay.",
              "Können Sie das wiederholen?"
            ],
            "answer": 0,
            "explanation": "Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bekommst eine Rechnung per Post.",
            "question": "Was machst du?",
            "options": [
              "Ich überweise den Betrag bis zum Fälligkeitsdatum.",
              "Ich werfe sie weg.",
              "Ich rufe die Polizei."
            ],
            "answer": 0,
            "explanation": "Rechnungen pünktlich bezahlen ist wichtig."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Einen Nebenjob suchen.",
            "question": "Bei ___ Nebenjob suchen ist klare Kommunikation wichtig.",
            "options": [
              "Einen",
              "bin",
              "soll"
            ],
            "answer": "Einen",
            "explanation": "Bei Einen Nebenjob suchen ist klare Kommunikation wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du brauchst Hilfe beim Thema Einen Nebenjob suchen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "um",
              "richtig",
              "bitten",
              "Hilfe",
              "ist",
              "immer",
              "Höflich"
            ],
            "answer": [
              6,
              0,
              3,
              2,
              4,
              5,
              1
            ],
            "explanation": "Richtig: Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst eine Frage zum Thema Einen Nebenjob suchen.",
            "question": "Könnten Sie mir bitte ___?",
            "options": [
              "helfen",
              "morgen",
              "gestern"
            ],
            "answer": "helfen",
            "explanation": "Könnten Sie mir bitte helfen?"
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand erklärt dir etwas zum Thema Einen Nebenjob suchen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Wertschätzung",
              "zeigt",
              "bedanken",
              "Sich"
            ],
            "answer": [
              3,
              2,
              1,
              0
            ],
            "explanation": "Richtig: Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "fill_blank",
            "situation": "Du bekommst eine Rechnung per Post.",
            "question": "Rechnungen pünktlich bezahlen ___ wichtig.",
            "options": [
              "ist",
              "schlecht",
              "brauche"
            ],
            "answer": "ist",
            "explanation": "Rechnungen pünktlich bezahlen ist wichtig."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Einen Nebenjob suchen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Kein Interesse.",
              "Keine Lust."
            ],
            "answer": 0,
            "explanation": "Bei Einen Nebenjob suchen ist klare Kommunikation wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du brauchst Hilfe beim Thema Einen Nebenjob suchen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "helfen",
              "Das kann ich nicht.",
              "Muss das sein?"
            ],
            "answer": 0,
            "explanation": "Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst eine Frage zum Thema Einen Nebenjob suchen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Könnten Sie mir bitte helfen",
              "Ich habe keine Ahnung.",
              "Das ist nicht mein Problem."
            ],
            "answer": 0,
            "explanation": "Richtig: Könnten Sie mir bitte helfen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand erklärt dir etwas zum Thema Einen Nebenjob suchen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Vielen Dank, das hilft mir sehr.",
              "Fragen Sie jemand anderen.",
              "Muss das sein?"
            ],
            "answer": 0,
            "explanation": "Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bekommst eine Rechnung per Post.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich überweise den Betrag bis zum Fälligkeitsdatum.",
              "Keine Lust.",
              "Muss das sein?"
            ],
            "answer": 0,
            "explanation": "Rechnungen pünktlich bezahlen ist wichtig."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Entschuldigung, können Sie mir helfen?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich verstehe das nicht.",
        "context": "Frage stellen"
      },
      {
        "de": "Können Sie das bitte wiederholen?",
        "context": "Antwort geben"
      },
      {
        "de": "Wie sagt man das auf Deutsch?",
        "context": "Problem lösen"
      },
      {
        "de": "Bitte sprechen Sie langsamer.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Das habe ich nicht verstanden.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Vielen Dank für Ihre Hilfe.",
        "context": "Frage stellen"
      },
      {
        "de": "Wo finde ich Informationen dazu?",
        "context": "Antwort geben"
      },
      {
        "de": "Ich habe eine Frage.",
        "context": "Problem lösen"
      },
      {
        "de": "Können Sie mir das erklären?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich bin neu hier.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Das ist sehr wichtig für mich.",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Alternative?",
        "context": "Antwort geben"
      },
      {
        "de": "Wann kann ich wiederkommen?",
        "context": "Problem lösen"
      },
      {
        "de": "Ist das kostenlos?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich würde gerne einen Termin vereinbaren.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Könnten Sie mir bitte weiterhelfen?",
        "context": "Frage stellen"
      },
      {
        "de": "Das muss ich mir noch überlegen.",
        "context": "Antwort geben"
      },
      {
        "de": "Ich bin damit nicht einverstanden.",
        "context": "Problem lösen"
      },
      {
        "de": "Können wir einen Kompromiss finden?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Das erscheint mir zu teuer.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich hätte gerne eine schriftliche Bestätigung.",
        "context": "Frage stellen"
      },
      {
        "de": "Wann ist der nächste freie Termin?",
        "context": "Antwort geben"
      },
      {
        "de": "Gibt es da Ausnahmen?",
        "context": "Problem lösen"
      },
      {
        "de": "Das war ein Missverständnis.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich möchte mich beschweren.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Können Sie das schriftlich bestätigen?",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es einen Ansprechpartner dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Ich brauche noch etwas Zeit.",
        "context": "Problem lösen"
      },
      {
        "de": "Das ist mir leider nicht möglich.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Welche Unterlagen brauche ich?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich komme aus dem Ausland.",
        "context": "Frage stellen"
      },
      {
        "de": "Mein Deutsch ist noch nicht so gut.",
        "context": "Antwort geben"
      },
      {
        "de": "Können Sie mir das auf Papier geben?",
        "context": "Problem lösen"
      },
      {
        "de": "Wo muss ich unterschreiben?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ist das Formular richtig ausgefüllt?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich habe alles dabei.",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Frist dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Was passiert als nächstes?",
        "context": "Problem lösen"
      },
      {
        "de": "Ich warte auf eine Antwort.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Können Sie mich zurückrufen?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich habe eine Beschwerde.",
        "context": "Frage stellen"
      },
      {
        "de": "Das muss dringend erledigt werden.",
        "context": "Antwort geben"
      },
      {
        "de": "Ich bin seit einem Jahr in Deutschland.",
        "context": "Problem lösen"
      },
      {
        "de": "Meine Adresse hat sich geändert.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich brauche eine Bescheinigung.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Bis wann muss ich das erledigen?",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Beratung dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Wo kann ich mich informieren?",
        "context": "Problem lösen"
      },
      {
        "de": "Ich möchte einen Antrag stellen.",
        "context": "Hilfe bitten"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Nichts sagen.",
        "correct": "Höflich und klar antworten.",
        "tip": "Bei Einen Nebenjob suchen ist klare Kommunikation wichtig."
      },
      {
        "wrong": "sagen",
        "correct": "helfen",
        "tip": "Höflich um Hilfe bitten ist immer richtig."
      },
      {
        "wrong": "Okay.",
        "correct": "Vielen Dank, das hilft mir sehr.",
        "tip": "Sich bedanken zeigt Wertschätzung."
      }
    ]
  },
  {
    "id": "a2-38",
    "level": "A2",
    "title": "Beschwerde schreiben",
    "titleDe": "Eine Beschwerde schreiben",
    "icon": "✍️",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Eine Beschwerde schreiben.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Nichts sagen.",
              "Einfach weggehen."
            ],
            "answer": 0,
            "explanation": "Bei Eine Beschwerde schreiben ist klare Kommunikation wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du brauchst Hilfe beim Thema Eine Beschwerde schreiben.",
            "question": "Könnten Sie mir bitte ___?",
            "options": [
              "helfen",
              "sagen",
              "zeigen"
            ],
            "answer": "helfen",
            "explanation": "Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst eine Frage zum Thema Eine Beschwerde schreiben.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sie",
              "Könnten",
              "bitte",
              "mir",
              "helfen"
            ],
            "answer": [
              1,
              0,
              3,
              2,
              4
            ],
            "explanation": "Richtig: Könnten Sie mir bitte helfen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand erklärt dir etwas zum Thema Eine Beschwerde schreiben.",
            "question": "Was sagst du?",
            "options": [
              "Vielen Dank, das hilft mir sehr.",
              "Okay.",
              "Können Sie das wiederholen?"
            ],
            "answer": 0,
            "explanation": "Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du willst einen Termin absagen.",
            "question": "Was sagst du?",
            "options": [
              "Ich muss den Termin leider absagen.",
              "Ich komme nicht.",
              "Vergessen Sie es."
            ],
            "answer": 0,
            "explanation": "Höfliches Absagen ist im Deutschen wichtig."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Eine Beschwerde schreiben.",
            "question": "Bei Eine Beschwerde schreiben ___ klare Kommunikation wichtig.",
            "options": [
              "ist",
              "sage",
              "Lösung"
            ],
            "answer": "ist",
            "explanation": "Bei Eine Beschwerde schreiben ist klare Kommunikation wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du brauchst Hilfe beim Thema Eine Beschwerde schreiben.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Höflich",
              "immer",
              "bitten",
              "richtig",
              "Hilfe",
              "um",
              "ist"
            ],
            "answer": [
              0,
              5,
              4,
              2,
              6,
              1,
              3
            ],
            "explanation": "Richtig: Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst eine Frage zum Thema Eine Beschwerde schreiben.",
            "question": "Könnten Sie mir bitte ___?",
            "options": [
              "helfen",
              "möchte",
              "sofort"
            ],
            "answer": "helfen",
            "explanation": "Könnten Sie mir bitte helfen?"
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand erklärt dir etwas zum Thema Eine Beschwerde schreiben.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "bedanken",
              "Sich",
              "Wertschätzung",
              "zeigt"
            ],
            "answer": [
              1,
              0,
              3,
              2
            ],
            "explanation": "Richtig: Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "fill_blank",
            "situation": "Du willst einen Termin absagen.",
            "question": "Höfliches Absagen ist im ___ wichtig.",
            "options": [
              "Deutschen",
              "brauche",
              "gut"
            ],
            "answer": "Deutschen",
            "explanation": "Höfliches Absagen ist im Deutschen wichtig."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Eine Beschwerde schreiben.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Ich habe keine Ahnung.",
              "Das kann ich nicht."
            ],
            "answer": 0,
            "explanation": "Bei Eine Beschwerde schreiben ist klare Kommunikation wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du brauchst Hilfe beim Thema Eine Beschwerde schreiben.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "helfen",
              "Muss das sein?",
              "Mir egal."
            ],
            "answer": 0,
            "explanation": "Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst eine Frage zum Thema Eine Beschwerde schreiben.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Könnten Sie mir bitte helfen",
              "Fragen Sie jemand anderen.",
              "Ich habe keine Ahnung."
            ],
            "answer": 0,
            "explanation": "Richtig: Könnten Sie mir bitte helfen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand erklärt dir etwas zum Thema Eine Beschwerde schreiben.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Vielen Dank, das hilft mir sehr.",
              "Das ist nicht mein Problem.",
              "Das kann ich nicht."
            ],
            "answer": 0,
            "explanation": "Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du willst einen Termin absagen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich muss den Termin leider absagen.",
              "Keine Lust.",
              "Das verstehe ich nicht."
            ],
            "answer": 0,
            "explanation": "Höfliches Absagen ist im Deutschen wichtig."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Entschuldigung, können Sie mir helfen?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich verstehe das nicht.",
        "context": "Frage stellen"
      },
      {
        "de": "Können Sie das bitte wiederholen?",
        "context": "Antwort geben"
      },
      {
        "de": "Wie sagt man das auf Deutsch?",
        "context": "Problem lösen"
      },
      {
        "de": "Bitte sprechen Sie langsamer.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Das habe ich nicht verstanden.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Vielen Dank für Ihre Hilfe.",
        "context": "Frage stellen"
      },
      {
        "de": "Wo finde ich Informationen dazu?",
        "context": "Antwort geben"
      },
      {
        "de": "Ich habe eine Frage.",
        "context": "Problem lösen"
      },
      {
        "de": "Können Sie mir das erklären?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich bin neu hier.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Das ist sehr wichtig für mich.",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Alternative?",
        "context": "Antwort geben"
      },
      {
        "de": "Wann kann ich wiederkommen?",
        "context": "Problem lösen"
      },
      {
        "de": "Ist das kostenlos?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich würde gerne einen Termin vereinbaren.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Könnten Sie mir bitte weiterhelfen?",
        "context": "Frage stellen"
      },
      {
        "de": "Das muss ich mir noch überlegen.",
        "context": "Antwort geben"
      },
      {
        "de": "Ich bin damit nicht einverstanden.",
        "context": "Problem lösen"
      },
      {
        "de": "Können wir einen Kompromiss finden?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Das erscheint mir zu teuer.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich hätte gerne eine schriftliche Bestätigung.",
        "context": "Frage stellen"
      },
      {
        "de": "Wann ist der nächste freie Termin?",
        "context": "Antwort geben"
      },
      {
        "de": "Gibt es da Ausnahmen?",
        "context": "Problem lösen"
      },
      {
        "de": "Das war ein Missverständnis.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich möchte mich beschweren.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Können Sie das schriftlich bestätigen?",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es einen Ansprechpartner dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Ich brauche noch etwas Zeit.",
        "context": "Problem lösen"
      },
      {
        "de": "Das ist mir leider nicht möglich.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Welche Unterlagen brauche ich?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich komme aus dem Ausland.",
        "context": "Frage stellen"
      },
      {
        "de": "Mein Deutsch ist noch nicht so gut.",
        "context": "Antwort geben"
      },
      {
        "de": "Können Sie mir das auf Papier geben?",
        "context": "Problem lösen"
      },
      {
        "de": "Wo muss ich unterschreiben?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ist das Formular richtig ausgefüllt?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich habe alles dabei.",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Frist dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Was passiert als nächstes?",
        "context": "Problem lösen"
      },
      {
        "de": "Ich warte auf eine Antwort.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Können Sie mich zurückrufen?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich habe eine Beschwerde.",
        "context": "Frage stellen"
      },
      {
        "de": "Das muss dringend erledigt werden.",
        "context": "Antwort geben"
      },
      {
        "de": "Ich bin seit einem Jahr in Deutschland.",
        "context": "Problem lösen"
      },
      {
        "de": "Meine Adresse hat sich geändert.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich brauche eine Bescheinigung.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Bis wann muss ich das erledigen?",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Beratung dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Wo kann ich mich informieren?",
        "context": "Problem lösen"
      },
      {
        "de": "Ich möchte einen Antrag stellen.",
        "context": "Hilfe bitten"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Nichts sagen.",
        "correct": "Höflich und klar antworten.",
        "tip": "Bei Eine Beschwerde schreiben ist klare Kommunikation wichtig."
      },
      {
        "wrong": "sagen",
        "correct": "helfen",
        "tip": "Höflich um Hilfe bitten ist immer richtig."
      },
      {
        "wrong": "Okay.",
        "correct": "Vielen Dank, das hilft mir sehr.",
        "tip": "Sich bedanken zeigt Wertschätzung."
      }
    ]
  },
  {
    "id": "a2-39",
    "level": "A2",
    "title": "Sprechstunde",
    "titleDe": "In der Sprechstunde",
    "icon": "🗣️",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: In der Sprechstunde.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Nichts sagen.",
              "Einfach weggehen."
            ],
            "answer": 0,
            "explanation": "Bei In der Sprechstunde ist klare Kommunikation wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du brauchst Hilfe beim Thema In der Sprechstunde.",
            "question": "Könnten Sie mir bitte ___?",
            "options": [
              "helfen",
              "sagen",
              "zeigen"
            ],
            "answer": "helfen",
            "explanation": "Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst eine Frage zum Thema In der Sprechstunde.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sie",
              "Könnten",
              "bitte",
              "mir",
              "helfen"
            ],
            "answer": [
              1,
              0,
              3,
              2,
              4
            ],
            "explanation": "Richtig: Könnten Sie mir bitte helfen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand erklärt dir etwas zum Thema In der Sprechstunde.",
            "question": "Was sagst du?",
            "options": [
              "Vielen Dank, das hilft mir sehr.",
              "Okay.",
              "Können Sie das wiederholen?"
            ],
            "answer": 0,
            "explanation": "Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "quick_reaction",
            "situation": "Ein Kollege fragt nach deiner Meinung.",
            "question": "Wie antwortest du?",
            "options": [
              "Ich finde, das ist eine gute Idee.",
              "Keine Ahnung.",
              "Mir egal."
            ],
            "answer": 0,
            "explanation": "Eine begründete Meinung zeigt Engagement."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: In der Sprechstunde.",
            "question": "Bei In der Sprechstunde ist ___ Kommunikation wichtig.",
            "options": [
              "klare",
              "brauche",
              "komme"
            ],
            "answer": "klare",
            "explanation": "Bei In der Sprechstunde ist klare Kommunikation wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du brauchst Hilfe beim Thema In der Sprechstunde.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "um",
              "bitten",
              "Höflich",
              "immer",
              "ist",
              "Hilfe",
              "richtig"
            ],
            "answer": [
              2,
              0,
              5,
              1,
              4,
              3,
              6
            ],
            "explanation": "Richtig: Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst eine Frage zum Thema In der Sprechstunde.",
            "question": "Könnten Sie mir bitte ___?",
            "options": [
              "helfen",
              "falsch",
              "gut"
            ],
            "answer": "helfen",
            "explanation": "Könnten Sie mir bitte helfen?"
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand erklärt dir etwas zum Thema In der Sprechstunde.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sich",
              "zeigt",
              "bedanken",
              "Wertschätzung"
            ],
            "answer": [
              0,
              2,
              1,
              3
            ],
            "explanation": "Richtig: Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "fill_blank",
            "situation": "Ein Kollege fragt nach deiner Meinung.",
            "question": "Eine ___ Meinung zeigt Engagement.",
            "options": [
              "begründete",
              "soll",
              "Arbeit"
            ],
            "answer": "begründete",
            "explanation": "Eine begründete Meinung zeigt Engagement."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: In der Sprechstunde.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Ich weiß es nicht.",
              "Muss das sein?"
            ],
            "answer": 0,
            "explanation": "Bei In der Sprechstunde ist klare Kommunikation wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du brauchst Hilfe beim Thema In der Sprechstunde.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "helfen",
              "Mir egal.",
              "Geht mich nichts an."
            ],
            "answer": 0,
            "explanation": "Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst eine Frage zum Thema In der Sprechstunde.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Könnten Sie mir bitte helfen",
              "Das verstehe ich nicht.",
              "Vielleicht später."
            ],
            "answer": 0,
            "explanation": "Richtig: Könnten Sie mir bitte helfen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand erklärt dir etwas zum Thema In der Sprechstunde.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Vielen Dank, das hilft mir sehr.",
              "Das ist nicht mein Problem.",
              "Geht mich nichts an."
            ],
            "answer": 0,
            "explanation": "Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "quick_reaction",
            "situation": "Ein Kollege fragt nach deiner Meinung.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich finde, das ist eine gute Idee.",
              "Das kann ich nicht.",
              "Muss das sein?"
            ],
            "answer": 0,
            "explanation": "Eine begründete Meinung zeigt Engagement."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Entschuldigung, können Sie mir helfen?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich verstehe das nicht.",
        "context": "Frage stellen"
      },
      {
        "de": "Können Sie das bitte wiederholen?",
        "context": "Antwort geben"
      },
      {
        "de": "Wie sagt man das auf Deutsch?",
        "context": "Problem lösen"
      },
      {
        "de": "Bitte sprechen Sie langsamer.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Das habe ich nicht verstanden.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Vielen Dank für Ihre Hilfe.",
        "context": "Frage stellen"
      },
      {
        "de": "Wo finde ich Informationen dazu?",
        "context": "Antwort geben"
      },
      {
        "de": "Ich habe eine Frage.",
        "context": "Problem lösen"
      },
      {
        "de": "Können Sie mir das erklären?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich bin neu hier.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Das ist sehr wichtig für mich.",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Alternative?",
        "context": "Antwort geben"
      },
      {
        "de": "Wann kann ich wiederkommen?",
        "context": "Problem lösen"
      },
      {
        "de": "Ist das kostenlos?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich würde gerne einen Termin vereinbaren.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Könnten Sie mir bitte weiterhelfen?",
        "context": "Frage stellen"
      },
      {
        "de": "Das muss ich mir noch überlegen.",
        "context": "Antwort geben"
      },
      {
        "de": "Ich bin damit nicht einverstanden.",
        "context": "Problem lösen"
      },
      {
        "de": "Können wir einen Kompromiss finden?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Das erscheint mir zu teuer.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich hätte gerne eine schriftliche Bestätigung.",
        "context": "Frage stellen"
      },
      {
        "de": "Wann ist der nächste freie Termin?",
        "context": "Antwort geben"
      },
      {
        "de": "Gibt es da Ausnahmen?",
        "context": "Problem lösen"
      },
      {
        "de": "Das war ein Missverständnis.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich möchte mich beschweren.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Können Sie das schriftlich bestätigen?",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es einen Ansprechpartner dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Ich brauche noch etwas Zeit.",
        "context": "Problem lösen"
      },
      {
        "de": "Das ist mir leider nicht möglich.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Welche Unterlagen brauche ich?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich komme aus dem Ausland.",
        "context": "Frage stellen"
      },
      {
        "de": "Mein Deutsch ist noch nicht so gut.",
        "context": "Antwort geben"
      },
      {
        "de": "Können Sie mir das auf Papier geben?",
        "context": "Problem lösen"
      },
      {
        "de": "Wo muss ich unterschreiben?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ist das Formular richtig ausgefüllt?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich habe alles dabei.",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Frist dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Was passiert als nächstes?",
        "context": "Problem lösen"
      },
      {
        "de": "Ich warte auf eine Antwort.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Können Sie mich zurückrufen?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich habe eine Beschwerde.",
        "context": "Frage stellen"
      },
      {
        "de": "Das muss dringend erledigt werden.",
        "context": "Antwort geben"
      },
      {
        "de": "Ich bin seit einem Jahr in Deutschland.",
        "context": "Problem lösen"
      },
      {
        "de": "Meine Adresse hat sich geändert.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich brauche eine Bescheinigung.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Bis wann muss ich das erledigen?",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Beratung dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Wo kann ich mich informieren?",
        "context": "Problem lösen"
      },
      {
        "de": "Ich möchte einen Antrag stellen.",
        "context": "Hilfe bitten"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Nichts sagen.",
        "correct": "Höflich und klar antworten.",
        "tip": "Bei In der Sprechstunde ist klare Kommunikation wichtig."
      },
      {
        "wrong": "sagen",
        "correct": "helfen",
        "tip": "Höflich um Hilfe bitten ist immer richtig."
      },
      {
        "wrong": "Okay.",
        "correct": "Vielen Dank, das hilft mir sehr.",
        "tip": "Sich bedanken zeigt Wertschätzung."
      }
    ]
  },
  {
    "id": "a2-40",
    "level": "A2",
    "title": "Urlaub nehmen",
    "titleDe": "Urlaub beantragen",
    "icon": "🏖️",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Urlaub beantragen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Nichts sagen.",
              "Einfach weggehen."
            ],
            "answer": 0,
            "explanation": "Bei Urlaub beantragen ist klare Kommunikation wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du brauchst Hilfe beim Thema Urlaub beantragen.",
            "question": "Könnten Sie mir bitte ___?",
            "options": [
              "helfen",
              "sagen",
              "zeigen"
            ],
            "answer": "helfen",
            "explanation": "Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst eine Frage zum Thema Urlaub beantragen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sie",
              "Könnten",
              "bitte",
              "mir",
              "helfen"
            ],
            "answer": [
              1,
              0,
              3,
              2,
              4
            ],
            "explanation": "Richtig: Könnten Sie mir bitte helfen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand erklärt dir etwas zum Thema Urlaub beantragen.",
            "question": "Was sagst du?",
            "options": [
              "Vielen Dank, das hilft mir sehr.",
              "Okay.",
              "Können Sie das wiederholen?"
            ],
            "answer": 0,
            "explanation": "Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du erhältst ein Paket.",
            "question": "Was machst du?",
            "options": [
              "Ich unterschreibe und bedanke mich.",
              "Ich nehme es ohne Worte.",
              "Ich öffne es vor dem Postboten."
            ],
            "answer": 0,
            "explanation": "Beim Paketempfang unterschreibt man die Zustellung."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Urlaub beantragen.",
            "question": "Bei Urlaub beantragen ist klare ___ wichtig.",
            "options": [
              "Kommunikation",
              "jetzt",
              "dort"
            ],
            "answer": "Kommunikation",
            "explanation": "Bei Urlaub beantragen ist klare Kommunikation wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du brauchst Hilfe beim Thema Urlaub beantragen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "immer",
              "um",
              "richtig",
              "Höflich",
              "ist",
              "Hilfe",
              "bitten"
            ],
            "answer": [
              3,
              1,
              5,
              6,
              4,
              0,
              2
            ],
            "explanation": "Richtig: Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst eine Frage zum Thema Urlaub beantragen.",
            "question": "Könnten Sie ___ bitte helfen?",
            "options": [
              "mir",
              "suche",
              "leider"
            ],
            "answer": "mir",
            "explanation": "Könnten Sie mir bitte helfen?"
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand erklärt dir etwas zum Thema Urlaub beantragen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sich",
              "Wertschätzung",
              "bedanken",
              "zeigt"
            ],
            "answer": [
              0,
              2,
              3,
              1
            ],
            "explanation": "Richtig: Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "fill_blank",
            "situation": "Du erhältst ein Paket.",
            "question": "Beim ___ unterschreibt man die Zustellung.",
            "options": [
              "Paketempfang",
              "Arbeit",
              "kann"
            ],
            "answer": "Paketempfang",
            "explanation": "Beim Paketempfang unterschreibt man die Zustellung."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Urlaub beantragen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Höflich und klar antworten.",
              "Das verstehe ich nicht.",
              "Ich weiß es nicht."
            ],
            "answer": 0,
            "explanation": "Bei Urlaub beantragen ist klare Kommunikation wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du brauchst Hilfe beim Thema Urlaub beantragen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "helfen",
              "Mir egal.",
              "Vielleicht später."
            ],
            "answer": 0,
            "explanation": "Höflich um Hilfe bitten ist immer richtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst eine Frage zum Thema Urlaub beantragen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Könnten Sie mir bitte helfen",
              "Ich weiß es nicht.",
              "Das kann ich nicht."
            ],
            "answer": 0,
            "explanation": "Richtig: Könnten Sie mir bitte helfen?"
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand erklärt dir etwas zum Thema Urlaub beantragen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Vielen Dank, das hilft mir sehr.",
              "Ich habe keine Ahnung.",
              "Keine Lust."
            ],
            "answer": 0,
            "explanation": "Sich bedanken zeigt Wertschätzung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du erhältst ein Paket.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich unterschreibe und bedanke mich.",
              "Ich weiß es nicht.",
              "Muss das sein?"
            ],
            "answer": 0,
            "explanation": "Beim Paketempfang unterschreibt man die Zustellung."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Entschuldigung, können Sie mir helfen?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich verstehe das nicht.",
        "context": "Frage stellen"
      },
      {
        "de": "Können Sie das bitte wiederholen?",
        "context": "Antwort geben"
      },
      {
        "de": "Wie sagt man das auf Deutsch?",
        "context": "Problem lösen"
      },
      {
        "de": "Bitte sprechen Sie langsamer.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Das habe ich nicht verstanden.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Vielen Dank für Ihre Hilfe.",
        "context": "Frage stellen"
      },
      {
        "de": "Wo finde ich Informationen dazu?",
        "context": "Antwort geben"
      },
      {
        "de": "Ich habe eine Frage.",
        "context": "Problem lösen"
      },
      {
        "de": "Können Sie mir das erklären?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich bin neu hier.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Das ist sehr wichtig für mich.",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Alternative?",
        "context": "Antwort geben"
      },
      {
        "de": "Wann kann ich wiederkommen?",
        "context": "Problem lösen"
      },
      {
        "de": "Ist das kostenlos?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich würde gerne einen Termin vereinbaren.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Könnten Sie mir bitte weiterhelfen?",
        "context": "Frage stellen"
      },
      {
        "de": "Das muss ich mir noch überlegen.",
        "context": "Antwort geben"
      },
      {
        "de": "Ich bin damit nicht einverstanden.",
        "context": "Problem lösen"
      },
      {
        "de": "Können wir einen Kompromiss finden?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Das erscheint mir zu teuer.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich hätte gerne eine schriftliche Bestätigung.",
        "context": "Frage stellen"
      },
      {
        "de": "Wann ist der nächste freie Termin?",
        "context": "Antwort geben"
      },
      {
        "de": "Gibt es da Ausnahmen?",
        "context": "Problem lösen"
      },
      {
        "de": "Das war ein Missverständnis.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich möchte mich beschweren.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Können Sie das schriftlich bestätigen?",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es einen Ansprechpartner dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Ich brauche noch etwas Zeit.",
        "context": "Problem lösen"
      },
      {
        "de": "Das ist mir leider nicht möglich.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Welche Unterlagen brauche ich?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich komme aus dem Ausland.",
        "context": "Frage stellen"
      },
      {
        "de": "Mein Deutsch ist noch nicht so gut.",
        "context": "Antwort geben"
      },
      {
        "de": "Können Sie mir das auf Papier geben?",
        "context": "Problem lösen"
      },
      {
        "de": "Wo muss ich unterschreiben?",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ist das Formular richtig ausgefüllt?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich habe alles dabei.",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Frist dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Was passiert als nächstes?",
        "context": "Problem lösen"
      },
      {
        "de": "Ich warte auf eine Antwort.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Können Sie mich zurückrufen?",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Ich habe eine Beschwerde.",
        "context": "Frage stellen"
      },
      {
        "de": "Das muss dringend erledigt werden.",
        "context": "Antwort geben"
      },
      {
        "de": "Ich bin seit einem Jahr in Deutschland.",
        "context": "Problem lösen"
      },
      {
        "de": "Meine Adresse hat sich geändert.",
        "context": "Hilfe bitten"
      },
      {
        "de": "Ich brauche eine Bescheinigung.",
        "context": "Allgemeine Situation"
      },
      {
        "de": "Bis wann muss ich das erledigen?",
        "context": "Frage stellen"
      },
      {
        "de": "Gibt es eine Beratung dafür?",
        "context": "Antwort geben"
      },
      {
        "de": "Wo kann ich mich informieren?",
        "context": "Problem lösen"
      },
      {
        "de": "Ich möchte einen Antrag stellen.",
        "context": "Hilfe bitten"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Nichts sagen.",
        "correct": "Höflich und klar antworten.",
        "tip": "Bei Urlaub beantragen ist klare Kommunikation wichtig."
      },
      {
        "wrong": "sagen",
        "correct": "helfen",
        "tip": "Höflich um Hilfe bitten ist immer richtig."
      },
      {
        "wrong": "Okay.",
        "correct": "Vielen Dank, das hilft mir sehr.",
        "tip": "Sich bedanken zeigt Wertschätzung."
      }
    ]
  }
];
