import type { Lesson } from "./types";

export const lessonsB2: Lesson[] = [
  {
    "id": "b2-01",
    "level": "B2",
    "title": "Arbeit Gespräch",
    "titleDe": "Gespräch mit dem Chef",
    "icon": "🏢",
    "premium": false,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Dein Chef fragt nach dem Projektstand.",
            "question": "Wie antwortest du professionell?",
            "options": [
              "Das Projekt liegt im Zeitplan. Ich informiere Sie, sobald es Neuigkeiten gibt.",
              "Läuft.",
              "Keine Ahnung, ich muss nachschauen."
            ],
            "answer": 0,
            "explanation": "Kurz, klar und professionell kommunizieren."
          },
          {
            "type": "fill_blank",
            "situation": "Du schlägst eine Lösung vor.",
            "question": "Ich ___ vorschlagen, dass wir das Vorgehen ändern.",
            "options": [
              "würde",
              "will",
              "kann"
            ],
            "answer": "würde",
            "explanation": "Konjunktiv II (würde) klingt höflicher und professioneller."
          },
          {
            "type": "quick_reaction",
            "situation": "Ein Kollege bittet dich um Hilfe.",
            "question": "Wie reagierst du?",
            "options": [
              "Klar, lass uns das zusammen anschauen.",
              "Das ist nicht mein Problem.",
              "Frag jemand anderen."
            ],
            "answer": 0,
            "explanation": "Teamarbeit und Hilfsbereitschaft zeigen."
          },
          {
            "type": "sort_sentence",
            "situation": "Du präsentierst Ergebnisse.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "möchte",
              "Ich",
              "die",
              "Ergebnisse",
              "Ihnen",
              "vorstellen"
            ],
            "answer": [
              1,
              0,
              4,
              2,
              3,
              5
            ],
            "explanation": "Richtig: Ich möchte Ihnen die Ergebnisse vorstellen."
          },
          {
            "type": "multiple_choice",
            "situation": "Du willst einen freien Tag beantragen.",
            "question": "Wie formulierst du das?",
            "options": [
              "Wäre es möglich, am Freitag einen Tag frei zu nehmen?",
              "Ich komme Freitag nicht.",
              "Ich brauche frei."
            ],
            "answer": 0,
            "explanation": "Höfliche Frage mit Konjunktiv zeigt Respekt."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Dein Chef fragt nach dem Projektstand.",
            "question": "Kurz, klar und professionell ___.",
            "options": [
              "kommunizieren",
              "möglich",
              "falsch"
            ],
            "answer": "kommunizieren",
            "explanation": "Kurz, klar und professionell kommunizieren."
          },
          {
            "type": "sort_sentence",
            "situation": "Du schlägst eine Lösung vor.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "und",
              "II",
              "klingt",
              "(würde)",
              "professioneller",
              "höflicher",
              "Konjunktiv"
            ],
            "answer": [
              6,
              1,
              3,
              2,
              5,
              0,
              4
            ],
            "explanation": "Richtig: Konjunktiv II (würde) klingt höflicher und professioneller."
          },
          {
            "type": "fill_blank",
            "situation": "Ein Kollege bittet dich um Hilfe.",
            "question": "Teamarbeit und Hilfsbereitschaft ___.",
            "options": [
              "zeigen",
              "sofort",
              "werde"
            ],
            "answer": "zeigen",
            "explanation": "Teamarbeit und Hilfsbereitschaft zeigen."
          },
          {
            "type": "sort_sentence",
            "situation": "Du präsentierst Ergebnisse.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Ihnen",
              "Ich",
              "Ergebnisse",
              "möchte",
              "die",
              "vorstellen"
            ],
            "answer": [
              1,
              3,
              0,
              4,
              2,
              5
            ],
            "explanation": "Richtig: Ich möchte Ihnen die Ergebnisse vorstellen."
          },
          {
            "type": "fill_blank",
            "situation": "Du willst einen freien Tag beantragen.",
            "question": "Höfliche Frage ___ Konjunktiv zeigt Respekt.",
            "options": [
              "mit",
              "Antwort",
              "werde"
            ],
            "answer": "mit",
            "explanation": "Höfliche Frage mit Konjunktiv zeigt Respekt."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Dein Chef fragt nach dem Projektstand.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Das Projekt liegt im Zeitplan. Ich informiere Sie, sobald es Neuigkeiten gibt.",
              "Das liegt nicht in meinem Bereich.",
              "Das wurde bereits besprochen."
            ],
            "answer": 0,
            "explanation": "Kurz, klar und professionell kommunizieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Du schlägst eine Lösung vor.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "würde",
              "Das bedarf keiner Diskussion.",
              "Darauf möchte ich nicht eingehen."
            ],
            "answer": 0,
            "explanation": "Konjunktiv II (würde) klingt höflicher und professioneller."
          },
          {
            "type": "quick_reaction",
            "situation": "Ein Kollege bittet dich um Hilfe.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Klar, lass uns das zusammen anschauen.",
              "Das liegt nicht in meinem Bereich.",
              "Darauf möchte ich nicht eingehen."
            ],
            "answer": 0,
            "explanation": "Teamarbeit und Hilfsbereitschaft zeigen."
          },
          {
            "type": "quick_reaction",
            "situation": "Du präsentierst Ergebnisse.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich möchte Ihnen die Ergebnisse vorstellen",
              "Ich sehe darin keinen Mehrwert.",
              "Das wäre kontraproduktiv."
            ],
            "answer": 0,
            "explanation": "Richtig: Ich möchte Ihnen die Ergebnisse vorstellen."
          },
          {
            "type": "quick_reaction",
            "situation": "Du willst einen freien Tag beantragen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Wäre es möglich, am Freitag einen Tag frei zu nehmen?",
              "Das wäre kontraproduktiv.",
              "Das ist nicht zielführend."
            ],
            "answer": 0,
            "explanation": "Höfliche Frage mit Konjunktiv zeigt Respekt."
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
        "wrong": "Läuft.",
        "correct": "Das Projekt liegt im Zeitplan. Ich informiere Sie, sobald es Neuigkeiten gibt.",
        "tip": "Kurz, klar und professionell kommunizieren."
      },
      {
        "wrong": "will",
        "correct": "würde",
        "tip": "Konjunktiv II (würde) klingt höflicher und professioneller."
      },
      {
        "wrong": "Das ist nicht mein Problem.",
        "correct": "Klar, lass uns das zusammen anschauen.",
        "tip": "Teamarbeit und Hilfsbereitschaft zeigen."
      }
    ]
  },
  {
    "id": "b2-02",
    "level": "B2",
    "title": "Problem schildern",
    "titleDe": "Ein Problem schildern",
    "icon": "⚠️",
    "premium": false,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "In deiner Wohnung funktioniert die Heizung nicht.",
            "question": "Wie meldest du das dem Vermieter?",
            "options": [
              "Ich möchte melden, dass die Heizung seit zwei Tagen nicht funktioniert.",
              "Heizung kaputt!",
              "Es ist kalt bei mir."
            ],
            "answer": 0,
            "explanation": "Klar das Problem + Zeitraum benennen."
          },
          {
            "type": "fill_blank",
            "situation": "Du reklamierst bei einem Unternehmen.",
            "question": "Ich möchte eine ___ einreichen.",
            "options": [
              "Beschwerde",
              "Frage",
              "Meinung"
            ],
            "answer": "Beschwerde",
            "explanation": "Eine Beschwerde einreichen ist die formelle Wendung."
          },
          {
            "type": "sort_sentence",
            "situation": "Du erklärst das Problem sachlich.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Problem",
              "Das",
              "besteht",
              "seit",
              "letzter",
              "Woche"
            ],
            "answer": [
              1,
              0,
              2,
              3,
              4,
              5
            ],
            "explanation": "Richtig: Das Problem besteht seit letzter Woche."
          },
          {
            "type": "quick_reaction",
            "situation": "Der Kundenservice sagt: Wir kümmern uns darum.",
            "question": "Wie reagierst du?",
            "options": [
              "Danke. Bis wann kann ich mit einer Lösung rechnen?",
              "Okay.",
              "Das glaube ich nicht."
            ],
            "answer": 0,
            "explanation": "Höflich nachfragen zeigt, dass du eine konkrete Antwort erwartest."
          },
          {
            "type": "multiple_choice",
            "situation": "Du willst den Stand deiner Beschwerde erfragen.",
            "question": "Was sagst du?",
            "options": [
              "Könnten Sie mir den aktuellen Stand meiner Anfrage mitteilen?",
              "Was ist mit meinem Fall?",
              "Antworten Sie endlich!"
            ],
            "answer": 0,
            "explanation": "Höfliche, formelle Nachfrage ist professionell."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "In deiner Wohnung funktioniert die Heizung nicht.",
            "question": "Klar das Problem + ___ benennen.",
            "options": [
              "Zeitraum",
              "danke",
              "morgen"
            ],
            "answer": "Zeitraum",
            "explanation": "Klar das Problem + Zeitraum benennen."
          },
          {
            "type": "sort_sentence",
            "situation": "Du reklamierst bei einem Unternehmen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Wendung",
              "einreichen",
              "Eine",
              "die",
              "Beschwerde",
              "ist",
              "formelle"
            ],
            "answer": [
              2,
              4,
              1,
              5,
              3,
              6,
              0
            ],
            "explanation": "Richtig: Eine Beschwerde einreichen ist die formelle Wendung."
          },
          {
            "type": "fill_blank",
            "situation": "Du erklärst das Problem sachlich.",
            "question": "Das ___ besteht seit letzter Woche.",
            "options": [
              "Problem",
              "Nummer",
              "Zeit"
            ],
            "answer": "Problem",
            "explanation": "Das Problem besteht seit letzter Woche."
          },
          {
            "type": "fill_blank",
            "situation": "Der Kundenservice sagt: Wir kümmern uns darum.",
            "question": "Höflich nachfragen zeigt, dass du eine ___ Antwort erwartest.",
            "options": [
              "konkrete",
              "Termin",
              "heute"
            ],
            "answer": "konkrete",
            "explanation": "Höflich nachfragen zeigt, dass du eine konkrete Antwort erwartest."
          },
          {
            "type": "fill_blank",
            "situation": "Du willst den Stand deiner Beschwerde erfragen.",
            "question": "Höfliche, formelle ___ ist professionell.",
            "options": [
              "Nachfrage",
              "Problem",
              "danke"
            ],
            "answer": "Nachfrage",
            "explanation": "Höfliche, formelle Nachfrage ist professionell."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "In deiner Wohnung funktioniert die Heizung nicht.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich möchte melden, dass die Heizung seit zwei Tagen nicht funktioniert.",
              "Das wurde bereits besprochen.",
              "Das wäre kontraproduktiv."
            ],
            "answer": 0,
            "explanation": "Klar das Problem + Zeitraum benennen."
          },
          {
            "type": "quick_reaction",
            "situation": "Du reklamierst bei einem Unternehmen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Beschwerde",
              "Das ist nicht zielführend.",
              "Das wurde bereits besprochen."
            ],
            "answer": 0,
            "explanation": "Eine Beschwerde einreichen ist die formelle Wendung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du erklärst das Problem sachlich.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Das Problem besteht seit letzter Woche",
              "Ohne Informationen sage ich nichts.",
              "Damit befasse ich mich nicht."
            ],
            "answer": 0,
            "explanation": "Richtig: Das Problem besteht seit letzter Woche."
          },
          {
            "type": "quick_reaction",
            "situation": "Der Kundenservice sagt: Wir kümmern uns darum.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Danke. Bis wann kann ich mit einer Lösung rechnen?",
              "Darauf möchte ich nicht eingehen.",
              "Das übersteigt meine Kompetenzen."
            ],
            "answer": 0,
            "explanation": "Höflich nachfragen zeigt, dass du eine konkrete Antwort erwartest."
          },
          {
            "type": "quick_reaction",
            "situation": "Du willst den Stand deiner Beschwerde erfragen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Könnten Sie mir den aktuellen Stand meiner Anfrage mitteilen?",
              "Ich bin anderer Meinung.",
              "Das halte ich für irrelevant."
            ],
            "answer": 0,
            "explanation": "Höfliche, formelle Nachfrage ist professionell."
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
        "wrong": "Heizung kaputt!",
        "correct": "Ich möchte melden, dass die Heizung seit zwei Tagen nicht funktioniert.",
        "tip": "Klar das Problem + Zeitraum benennen."
      },
      {
        "wrong": "Frage",
        "correct": "Beschwerde",
        "tip": "Eine Beschwerde einreichen ist die formelle Wendung."
      },
      {
        "wrong": "Okay.",
        "correct": "Danke. Bis wann kann ich mit einer Lösung rechnen?",
        "tip": "Höflich nachfragen zeigt, dass du eine konkrete Antwort erwartest."
      }
    ]
  },
  {
    "id": "b2-03",
    "level": "B2",
    "title": "Verhandlung",
    "titleDe": "Eine Verhandlung führen",
    "icon": "🤝",
    "premium": false,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Eine Verhandlung führen.",
            "question": "Wie gehst du professionell vor?",
            "options": [
              "Strukturiert und sachlich argumentieren.",
              "Einfach machen.",
              "Abwarten."
            ],
            "answer": 0,
            "explanation": "Bei Eine Verhandlung führen ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du bereitest dich auf Eine Verhandlung führen vor.",
            "question": "Ich würde vorschlagen, dass wir ___ vorgehen.",
            "options": [
              "systematisch",
              "schnell",
              "einfach"
            ],
            "answer": "systematisch",
            "explanation": "Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "dass",
              "Ich",
              "bin",
              "überzeugt",
              "richtig",
              "wir",
              "handeln"
            ],
            "answer": [
              1,
              2,
              3,
              0,
              5,
              4,
              6
            ],
            "explanation": "Richtig: Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "quick_reaction",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Eine Verhandlung führen.",
            "question": "Wie reagierst du?",
            "options": [
              "Sachlich argumentieren und Beispiele nennen.",
              "Ausweichen.",
              "Die Frage zurückgeben."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "quick_reaction",
            "situation": "In einem Meeting gibt es Meinungsverschiedenheiten.",
            "question": "Wie vermittelst du?",
            "options": [
              "Ich verstehe beide Seiten. Lassen Sie uns einen Kompromiss finden.",
              "Ich sage nichts.",
              "Einer hat recht, der andere nicht."
            ],
            "answer": 0,
            "explanation": "Vermittlung ist eine wichtige Soft Skill im Beruf."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Eine Verhandlung führen.",
            "question": "Bei Eine Verhandlung ___ ist strukturiertes Vorgehen wichtig.",
            "options": [
              "führen",
              "jetzt",
              "möchte"
            ],
            "answer": "führen",
            "explanation": "Bei Eine Verhandlung führen ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du bereitest dich auf Eine Verhandlung führen vor.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Professionalität",
              "zeigt",
              "Systematisches",
              "Vorgehen"
            ],
            "answer": [
              2,
              3,
              1,
              0
            ],
            "explanation": "Richtig: Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Ich bin überzeugt, dass wir richtig ___.",
            "options": [
              "handeln",
              "Problem",
              "brauche"
            ],
            "answer": "handeln",
            "explanation": "Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "sort_sentence",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Eine Verhandlung führen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "mit",
              "Argumentation",
              "Sachliche",
              "überzeugt",
              "Beispielen"
            ],
            "answer": [
              2,
              1,
              0,
              4,
              3
            ],
            "explanation": "Richtig: Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "fill_blank",
            "situation": "In einem Meeting gibt es Meinungsverschiedenheiten.",
            "question": "Vermittlung ist eine wichtige Soft Skill im ___.",
            "options": [
              "Beruf",
              "Adresse",
              "Geld"
            ],
            "answer": "Beruf",
            "explanation": "Vermittlung ist eine wichtige Soft Skill im Beruf."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Eine Verhandlung führen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Strukturiert und sachlich argumentieren.",
              "Das liegt nicht in meinem Bereich.",
              "Darauf möchte ich nicht eingehen."
            ],
            "answer": 0,
            "explanation": "Bei Eine Verhandlung führen ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bereitest dich auf Eine Verhandlung führen vor.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "systematisch",
              "Damit befasse ich mich nicht.",
              "Darauf möchte ich nicht eingehen."
            ],
            "answer": 0,
            "explanation": "Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich bin überzeugt dass wir richtig handeln",
              "Ich bin anderer Meinung.",
              "Ohne Informationen sage ich nichts."
            ],
            "answer": 0,
            "explanation": "Richtig: Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "quick_reaction",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Eine Verhandlung führen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Sachlich argumentieren und Beispiele nennen.",
              "Das wäre kontraproduktiv.",
              "Das wurde bereits besprochen."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "quick_reaction",
            "situation": "In einem Meeting gibt es Meinungsverschiedenheiten.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich verstehe beide Seiten. Lassen Sie uns einen Kompromiss finden.",
              "Das wäre kontraproduktiv.",
              "Das bedarf keiner Diskussion."
            ],
            "answer": 0,
            "explanation": "Vermittlung ist eine wichtige Soft Skill im Beruf."
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
        "wrong": "Einfach machen.",
        "correct": "Strukturiert und sachlich argumentieren.",
        "tip": "Bei Eine Verhandlung führen ist strukturiertes Vorgehen wichtig."
      },
      {
        "wrong": "schnell",
        "correct": "systematisch",
        "tip": "Systematisches Vorgehen zeigt Professionalität."
      },
      {
        "wrong": "Ausweichen.",
        "correct": "Sachlich argumentieren und Beispiele nennen.",
        "tip": "Sachliche Argumentation mit Beispielen überzeugt."
      }
    ]
  },
  {
    "id": "b2-04",
    "level": "B2",
    "title": "Projektleitung",
    "titleDe": "Ein Projekt leiten",
    "icon": "📊",
    "premium": false,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Ein Projekt leiten.",
            "question": "Wie gehst du professionell vor?",
            "options": [
              "Strukturiert und sachlich argumentieren.",
              "Einfach machen.",
              "Abwarten."
            ],
            "answer": 0,
            "explanation": "Bei Ein Projekt leiten ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du bereitest dich auf Ein Projekt leiten vor.",
            "question": "Ich würde vorschlagen, dass wir ___ vorgehen.",
            "options": [
              "systematisch",
              "schnell",
              "einfach"
            ],
            "answer": "systematisch",
            "explanation": "Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "dass",
              "Ich",
              "bin",
              "überzeugt",
              "richtig",
              "wir",
              "handeln"
            ],
            "answer": [
              1,
              2,
              3,
              0,
              5,
              4,
              6
            ],
            "explanation": "Richtig: Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "quick_reaction",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Ein Projekt leiten.",
            "question": "Wie reagierst du?",
            "options": [
              "Sachlich argumentieren und Beispiele nennen.",
              "Ausweichen.",
              "Die Frage zurückgeben."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "quick_reaction",
            "situation": "Du sollst eine Präsentation halten.",
            "question": "Wie bereitest du dich vor?",
            "options": [
              "Ich strukturiere die Inhalte klar und übe den Vortrag.",
              "Ich improvisiere.",
              "Ich lese alles ab."
            ],
            "answer": 0,
            "explanation": "Gute Vorbereitung ist der Schlüssel zu einer gelungenen Präsentation."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Ein Projekt leiten.",
            "question": "Bei Ein Projekt leiten ___ strukturiertes Vorgehen wichtig.",
            "options": [
              "ist",
              "richtig",
              "Problem"
            ],
            "answer": "ist",
            "explanation": "Bei Ein Projekt leiten ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du bereitest dich auf Ein Projekt leiten vor.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Vorgehen",
              "Professionalität",
              "zeigt",
              "Systematisches"
            ],
            "answer": [
              3,
              0,
              2,
              1
            ],
            "explanation": "Richtig: Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Ich bin überzeugt, dass wir richtig ___.",
            "options": [
              "handeln",
              "gut",
              "gestern"
            ],
            "answer": "handeln",
            "explanation": "Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "sort_sentence",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Ein Projekt leiten.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Beispielen",
              "Argumentation",
              "überzeugt",
              "Sachliche",
              "mit"
            ],
            "answer": [
              3,
              1,
              4,
              0,
              2
            ],
            "explanation": "Richtig: Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "fill_blank",
            "situation": "Du sollst eine Präsentation halten.",
            "question": "Gute Vorbereitung ___ der Schlüssel zu einer gelungenen Präsentation.",
            "options": [
              "ist",
              "Nummer",
              "sage"
            ],
            "answer": "ist",
            "explanation": "Gute Vorbereitung ist der Schlüssel zu einer gelungenen Präsentation."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Ein Projekt leiten.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Strukturiert und sachlich argumentieren.",
              "Das liegt nicht in meinem Bereich.",
              "Das wurde bereits besprochen."
            ],
            "answer": 0,
            "explanation": "Bei Ein Projekt leiten ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bereitest dich auf Ein Projekt leiten vor.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "systematisch",
              "Das bedarf keiner Diskussion.",
              "Das wurde bereits besprochen."
            ],
            "answer": 0,
            "explanation": "Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich bin überzeugt dass wir richtig handeln",
              "Das bedarf keiner Diskussion.",
              "Ohne Informationen sage ich nichts."
            ],
            "answer": 0,
            "explanation": "Richtig: Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "quick_reaction",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Ein Projekt leiten.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Sachlich argumentieren und Beispiele nennen.",
              "Das ist nicht zielführend.",
              "Das übersteigt meine Kompetenzen."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "quick_reaction",
            "situation": "Du sollst eine Präsentation halten.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich strukturiere die Inhalte klar und übe den Vortrag.",
              "Das ist nicht zielführend.",
              "Das liegt nicht in meinem Bereich."
            ],
            "answer": 0,
            "explanation": "Gute Vorbereitung ist der Schlüssel zu einer gelungenen Präsentation."
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
        "wrong": "Einfach machen.",
        "correct": "Strukturiert und sachlich argumentieren.",
        "tip": "Bei Ein Projekt leiten ist strukturiertes Vorgehen wichtig."
      },
      {
        "wrong": "schnell",
        "correct": "systematisch",
        "tip": "Systematisches Vorgehen zeigt Professionalität."
      },
      {
        "wrong": "Ausweichen.",
        "correct": "Sachlich argumentieren und Beispiele nennen.",
        "tip": "Sachliche Argumentation mit Beispielen überzeugt."
      }
    ]
  },
  {
    "id": "b2-05",
    "level": "B2",
    "title": "Diskussion",
    "titleDe": "An einer Diskussion teilnehmen",
    "icon": "💬",
    "premium": false,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: An einer Diskussion teilnehmen.",
            "question": "Wie gehst du professionell vor?",
            "options": [
              "Strukturiert und sachlich argumentieren.",
              "Einfach machen.",
              "Abwarten."
            ],
            "answer": 0,
            "explanation": "Bei An einer Diskussion teilnehmen ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du bereitest dich auf An einer Diskussion teilnehmen vor.",
            "question": "Ich würde vorschlagen, dass wir ___ vorgehen.",
            "options": [
              "systematisch",
              "schnell",
              "einfach"
            ],
            "answer": "systematisch",
            "explanation": "Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "dass",
              "Ich",
              "bin",
              "überzeugt",
              "richtig",
              "wir",
              "handeln"
            ],
            "answer": [
              1,
              2,
              3,
              0,
              5,
              4,
              6
            ],
            "explanation": "Richtig: Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "quick_reaction",
            "situation": "Man stellt dir eine schwierige Frage zum Thema An einer Diskussion teilnehmen.",
            "question": "Wie reagierst du?",
            "options": [
              "Sachlich argumentieren und Beispiele nennen.",
              "Ausweichen.",
              "Die Frage zurückgeben."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "quick_reaction",
            "situation": "Ein Kunde beschwert sich.",
            "question": "Wie reagierst du professionell?",
            "options": [
              "Ich entschuldige mich und biete eine Lösung an.",
              "Das ist nicht mein Problem.",
              "Ich leite die Beschwerde weiter."
            ],
            "answer": 0,
            "explanation": "Professioneller Umgang mit Beschwerden stärkt die Kundenbindung."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: An einer Diskussion teilnehmen.",
            "question": "Bei An einer Diskussion teilnehmen ist strukturiertes Vorgehen ___.",
            "options": [
              "wichtig",
              "möglich",
              "langsam"
            ],
            "answer": "wichtig",
            "explanation": "Bei An einer Diskussion teilnehmen ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du bereitest dich auf An einer Diskussion teilnehmen vor.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Vorgehen",
              "zeigt",
              "Professionalität",
              "Systematisches"
            ],
            "answer": [
              3,
              0,
              1,
              2
            ],
            "explanation": "Richtig: Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Ich bin überzeugt, dass wir richtig ___.",
            "options": [
              "handeln",
              "gut",
              "bin"
            ],
            "answer": "handeln",
            "explanation": "Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "sort_sentence",
            "situation": "Man stellt dir eine schwierige Frage zum Thema An einer Diskussion teilnehmen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "überzeugt",
              "mit",
              "Beispielen",
              "Argumentation",
              "Sachliche"
            ],
            "answer": [
              4,
              3,
              1,
              2,
              0
            ],
            "explanation": "Richtig: Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "fill_blank",
            "situation": "Ein Kunde beschwert sich.",
            "question": "Professioneller ___ mit Beschwerden stärkt die Kundenbindung.",
            "options": [
              "Umgang",
              "Nummer",
              "nehme"
            ],
            "answer": "Umgang",
            "explanation": "Professioneller Umgang mit Beschwerden stärkt die Kundenbindung."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: An einer Diskussion teilnehmen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Strukturiert und sachlich argumentieren.",
              "Das wäre kontraproduktiv.",
              "Das übersteigt meine Kompetenzen."
            ],
            "answer": 0,
            "explanation": "Bei An einer Diskussion teilnehmen ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bereitest dich auf An einer Diskussion teilnehmen vor.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "systematisch",
              "Damit befasse ich mich nicht.",
              "Das wurde bereits besprochen."
            ],
            "answer": 0,
            "explanation": "Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich bin überzeugt dass wir richtig handeln",
              "Das übersteigt meine Kompetenzen.",
              "Das wurde bereits besprochen."
            ],
            "answer": 0,
            "explanation": "Richtig: Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "quick_reaction",
            "situation": "Man stellt dir eine schwierige Frage zum Thema An einer Diskussion teilnehmen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Sachlich argumentieren und Beispiele nennen.",
              "Darauf möchte ich nicht eingehen.",
              "Damit befasse ich mich nicht."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "quick_reaction",
            "situation": "Ein Kunde beschwert sich.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich entschuldige mich und biete eine Lösung an.",
              "Das bedarf keiner Diskussion.",
              "Das wurde bereits besprochen."
            ],
            "answer": 0,
            "explanation": "Professioneller Umgang mit Beschwerden stärkt die Kundenbindung."
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
        "wrong": "Einfach machen.",
        "correct": "Strukturiert und sachlich argumentieren.",
        "tip": "Bei An einer Diskussion teilnehmen ist strukturiertes Vorgehen wichtig."
      },
      {
        "wrong": "schnell",
        "correct": "systematisch",
        "tip": "Systematisches Vorgehen zeigt Professionalität."
      },
      {
        "wrong": "Ausweichen.",
        "correct": "Sachlich argumentieren und Beispiele nennen.",
        "tip": "Sachliche Argumentation mit Beispielen überzeugt."
      }
    ]
  },
  {
    "id": "b2-06",
    "level": "B2",
    "title": "Gutachten",
    "titleDe": "Ein Gutachten verstehen",
    "icon": "📋",
    "premium": false,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Ein Gutachten verstehen.",
            "question": "Wie gehst du professionell vor?",
            "options": [
              "Strukturiert und sachlich argumentieren.",
              "Einfach machen.",
              "Abwarten."
            ],
            "answer": 0,
            "explanation": "Bei Ein Gutachten verstehen ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du bereitest dich auf Ein Gutachten verstehen vor.",
            "question": "Ich würde vorschlagen, dass wir ___ vorgehen.",
            "options": [
              "systematisch",
              "schnell",
              "einfach"
            ],
            "answer": "systematisch",
            "explanation": "Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "dass",
              "Ich",
              "bin",
              "überzeugt",
              "richtig",
              "wir",
              "handeln"
            ],
            "answer": [
              1,
              2,
              3,
              0,
              5,
              4,
              6
            ],
            "explanation": "Richtig: Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "quick_reaction",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Ein Gutachten verstehen.",
            "question": "Wie reagierst du?",
            "options": [
              "Sachlich argumentieren und Beispiele nennen.",
              "Ausweichen.",
              "Die Frage zurückgeben."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "quick_reaction",
            "situation": "Du wirst zu einem Vorstellungsgespräch eingeladen.",
            "question": "Was bereitest du vor?",
            "options": [
              "Ich recherchiere das Unternehmen und bereite Antworten vor.",
              "Ich gehe einfach hin.",
              "Ich frage nach dem Gehalt."
            ],
            "answer": 0,
            "explanation": "Vorbereitung zeigt Interesse und Professionalität."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Ein Gutachten verstehen.",
            "question": "Bei ___ Gutachten verstehen ist strukturiertes Vorgehen wichtig.",
            "options": [
              "Ein",
              "Zeit",
              "hier"
            ],
            "answer": "Ein",
            "explanation": "Bei Ein Gutachten verstehen ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du bereitest dich auf Ein Gutachten verstehen vor.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "zeigt",
              "Professionalität",
              "Systematisches",
              "Vorgehen"
            ],
            "answer": [
              2,
              3,
              0,
              1
            ],
            "explanation": "Richtig: Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Ich bin überzeugt, dass wir richtig ___.",
            "options": [
              "handeln",
              "Antwort",
              "leider"
            ],
            "answer": "handeln",
            "explanation": "Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "sort_sentence",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Ein Gutachten verstehen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "überzeugt",
              "Sachliche",
              "mit",
              "Beispielen",
              "Argumentation"
            ],
            "answer": [
              1,
              4,
              2,
              3,
              0
            ],
            "explanation": "Richtig: Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "fill_blank",
            "situation": "Du wirst zu einem Vorstellungsgespräch eingeladen.",
            "question": "Vorbereitung ___ Interesse und Professionalität.",
            "options": [
              "zeigt",
              "habe",
              "sage"
            ],
            "answer": "zeigt",
            "explanation": "Vorbereitung zeigt Interesse und Professionalität."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Ein Gutachten verstehen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Strukturiert und sachlich argumentieren.",
              "Das liegt nicht in meinem Bereich.",
              "Darauf möchte ich nicht eingehen."
            ],
            "answer": 0,
            "explanation": "Bei Ein Gutachten verstehen ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bereitest dich auf Ein Gutachten verstehen vor.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "systematisch",
              "Das übersteigt meine Kompetenzen.",
              "Das ist nicht zielführend."
            ],
            "answer": 0,
            "explanation": "Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich bin überzeugt dass wir richtig handeln",
              "Ich sehe darin keinen Mehrwert.",
              "Ohne Informationen sage ich nichts."
            ],
            "answer": 0,
            "explanation": "Richtig: Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "quick_reaction",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Ein Gutachten verstehen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Sachlich argumentieren und Beispiele nennen.",
              "Damit befasse ich mich nicht.",
              "Das liegt nicht in meinem Bereich."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "quick_reaction",
            "situation": "Du wirst zu einem Vorstellungsgespräch eingeladen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich recherchiere das Unternehmen und bereite Antworten vor.",
              "Das halte ich für irrelevant.",
              "Das wäre kontraproduktiv."
            ],
            "answer": 0,
            "explanation": "Vorbereitung zeigt Interesse und Professionalität."
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
        "wrong": "Einfach machen.",
        "correct": "Strukturiert und sachlich argumentieren.",
        "tip": "Bei Ein Gutachten verstehen ist strukturiertes Vorgehen wichtig."
      },
      {
        "wrong": "schnell",
        "correct": "systematisch",
        "tip": "Systematisches Vorgehen zeigt Professionalität."
      },
      {
        "wrong": "Ausweichen.",
        "correct": "Sachlich argumentieren und Beispiele nennen.",
        "tip": "Sachliche Argumentation mit Beispielen überzeugt."
      }
    ]
  },
  {
    "id": "b2-07",
    "level": "B2",
    "title": "Mediation",
    "titleDe": "An einer Mediation teilnehmen",
    "icon": "⚖️",
    "premium": false,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: An einer Mediation teilnehmen.",
            "question": "Wie gehst du professionell vor?",
            "options": [
              "Strukturiert und sachlich argumentieren.",
              "Einfach machen.",
              "Abwarten."
            ],
            "answer": 0,
            "explanation": "Bei An einer Mediation teilnehmen ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du bereitest dich auf An einer Mediation teilnehmen vor.",
            "question": "Ich würde vorschlagen, dass wir ___ vorgehen.",
            "options": [
              "systematisch",
              "schnell",
              "einfach"
            ],
            "answer": "systematisch",
            "explanation": "Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "dass",
              "Ich",
              "bin",
              "überzeugt",
              "richtig",
              "wir",
              "handeln"
            ],
            "answer": [
              1,
              2,
              3,
              0,
              5,
              4,
              6
            ],
            "explanation": "Richtig: Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "quick_reaction",
            "situation": "Man stellt dir eine schwierige Frage zum Thema An einer Mediation teilnehmen.",
            "question": "Wie reagierst du?",
            "options": [
              "Sachlich argumentieren und Beispiele nennen.",
              "Ausweichen.",
              "Die Frage zurückgeben."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "quick_reaction",
            "situation": "Du musst Überstunden machen.",
            "question": "Wie klärst du das?",
            "options": [
              "Ich frage, ob die Überstunden vergütet oder ausgeglichen werden.",
              "Ich mache sie einfach.",
              "Ich lehne ab."
            ],
            "answer": 0,
            "explanation": "Klare Kommunikation über Arbeitsbedingungen ist wichtig."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: An einer Mediation teilnehmen.",
            "question": "Bei An einer Mediation teilnehmen ist strukturiertes ___ wichtig.",
            "options": [
              "Vorgehen",
              "Lösung",
              "will"
            ],
            "answer": "Vorgehen",
            "explanation": "Bei An einer Mediation teilnehmen ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du bereitest dich auf An einer Mediation teilnehmen vor.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Vorgehen",
              "Systematisches",
              "zeigt",
              "Professionalität"
            ],
            "answer": [
              1,
              0,
              2,
              3
            ],
            "explanation": "Richtig: Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Ich bin überzeugt, dass ___ richtig handeln.",
            "options": [
              "wir",
              "muss",
              "frage"
            ],
            "answer": "wir",
            "explanation": "Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "sort_sentence",
            "situation": "Man stellt dir eine schwierige Frage zum Thema An einer Mediation teilnehmen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Argumentation",
              "überzeugt",
              "mit",
              "Sachliche",
              "Beispielen"
            ],
            "answer": [
              3,
              0,
              2,
              4,
              1
            ],
            "explanation": "Richtig: Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "fill_blank",
            "situation": "Du musst Überstunden machen.",
            "question": "Klare ___ über Arbeitsbedingungen ist wichtig.",
            "options": [
              "Kommunikation",
              "Problem",
              "Zeit"
            ],
            "answer": "Kommunikation",
            "explanation": "Klare Kommunikation über Arbeitsbedingungen ist wichtig."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: An einer Mediation teilnehmen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Strukturiert und sachlich argumentieren.",
              "Das wurde bereits besprochen.",
              "Das übersteigt meine Kompetenzen."
            ],
            "answer": 0,
            "explanation": "Bei An einer Mediation teilnehmen ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bereitest dich auf An einer Mediation teilnehmen vor.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "systematisch",
              "Ich bin anderer Meinung.",
              "Das übersteigt meine Kompetenzen."
            ],
            "answer": 0,
            "explanation": "Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich bin überzeugt dass wir richtig handeln",
              "Damit befasse ich mich nicht.",
              "Das wäre kontraproduktiv."
            ],
            "answer": 0,
            "explanation": "Richtig: Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "quick_reaction",
            "situation": "Man stellt dir eine schwierige Frage zum Thema An einer Mediation teilnehmen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Sachlich argumentieren und Beispiele nennen.",
              "Das übersteigt meine Kompetenzen.",
              "Darauf möchte ich nicht eingehen."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "quick_reaction",
            "situation": "Du musst Überstunden machen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich frage, ob die Überstunden vergütet oder ausgeglichen werden.",
              "Ohne Informationen sage ich nichts.",
              "Das ist nicht zielführend."
            ],
            "answer": 0,
            "explanation": "Klare Kommunikation über Arbeitsbedingungen ist wichtig."
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
        "wrong": "Einfach machen.",
        "correct": "Strukturiert und sachlich argumentieren.",
        "tip": "Bei An einer Mediation teilnehmen ist strukturiertes Vorgehen wichtig."
      },
      {
        "wrong": "schnell",
        "correct": "systematisch",
        "tip": "Systematisches Vorgehen zeigt Professionalität."
      },
      {
        "wrong": "Ausweichen.",
        "correct": "Sachlich argumentieren und Beispiele nennen.",
        "tip": "Sachliche Argumentation mit Beispielen überzeugt."
      }
    ]
  },
  {
    "id": "b2-08",
    "level": "B2",
    "title": "Geschäftsverhandlung",
    "titleDe": "Geschäftsverhandlung führen",
    "icon": "💼",
    "premium": false,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Geschäftsverhandlung führen.",
            "question": "Wie gehst du professionell vor?",
            "options": [
              "Strukturiert und sachlich argumentieren.",
              "Einfach machen.",
              "Abwarten."
            ],
            "answer": 0,
            "explanation": "Bei Geschäftsverhandlung führen ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du bereitest dich auf Geschäftsverhandlung führen vor.",
            "question": "Ich würde vorschlagen, dass wir ___ vorgehen.",
            "options": [
              "systematisch",
              "schnell",
              "einfach"
            ],
            "answer": "systematisch",
            "explanation": "Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "dass",
              "Ich",
              "bin",
              "überzeugt",
              "richtig",
              "wir",
              "handeln"
            ],
            "answer": [
              1,
              2,
              3,
              0,
              5,
              4,
              6
            ],
            "explanation": "Richtig: Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "quick_reaction",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Geschäftsverhandlung führen.",
            "question": "Wie reagierst du?",
            "options": [
              "Sachlich argumentieren und Beispiele nennen.",
              "Ausweichen.",
              "Die Frage zurückgeben."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "quick_reaction",
            "situation": "In einem Meeting gibt es Meinungsverschiedenheiten.",
            "question": "Wie vermittelst du?",
            "options": [
              "Ich verstehe beide Seiten. Lassen Sie uns einen Kompromiss finden.",
              "Ich sage nichts.",
              "Einer hat recht, der andere nicht."
            ],
            "answer": 0,
            "explanation": "Vermittlung ist eine wichtige Soft Skill im Beruf."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Geschäftsverhandlung führen.",
            "question": "Bei ___ führen ist strukturiertes Vorgehen wichtig.",
            "options": [
              "Geschäftsverhandlung",
              "morgen",
              "jetzt"
            ],
            "answer": "Geschäftsverhandlung",
            "explanation": "Bei Geschäftsverhandlung führen ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du bereitest dich auf Geschäftsverhandlung führen vor.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Systematisches",
              "zeigt",
              "Professionalität",
              "Vorgehen"
            ],
            "answer": [
              0,
              3,
              1,
              2
            ],
            "explanation": "Richtig: Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Ich bin überzeugt, dass wir richtig ___.",
            "options": [
              "handeln",
              "sage",
              "gestern"
            ],
            "answer": "handeln",
            "explanation": "Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "sort_sentence",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Geschäftsverhandlung führen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sachliche",
              "überzeugt",
              "mit",
              "Beispielen",
              "Argumentation"
            ],
            "answer": [
              0,
              4,
              2,
              3,
              1
            ],
            "explanation": "Richtig: Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "fill_blank",
            "situation": "In einem Meeting gibt es Meinungsverschiedenheiten.",
            "question": "Vermittlung ist ___ wichtige Soft Skill im Beruf.",
            "options": [
              "eine",
              "soll",
              "darf"
            ],
            "answer": "eine",
            "explanation": "Vermittlung ist eine wichtige Soft Skill im Beruf."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Geschäftsverhandlung führen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Strukturiert und sachlich argumentieren.",
              "Das übersteigt meine Kompetenzen.",
              "Darauf möchte ich nicht eingehen."
            ],
            "answer": 0,
            "explanation": "Bei Geschäftsverhandlung führen ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bereitest dich auf Geschäftsverhandlung führen vor.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "systematisch",
              "Das ist nicht zielführend.",
              "Ich bin anderer Meinung."
            ],
            "answer": 0,
            "explanation": "Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich bin überzeugt dass wir richtig handeln",
              "Das bedarf keiner Diskussion.",
              "Ich bin anderer Meinung."
            ],
            "answer": 0,
            "explanation": "Richtig: Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "quick_reaction",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Geschäftsverhandlung führen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Sachlich argumentieren und Beispiele nennen.",
              "Das bedarf keiner Diskussion.",
              "Das übersteigt meine Kompetenzen."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "quick_reaction",
            "situation": "In einem Meeting gibt es Meinungsverschiedenheiten.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich verstehe beide Seiten. Lassen Sie uns einen Kompromiss finden.",
              "Ich sehe darin keinen Mehrwert.",
              "Das wurde bereits besprochen."
            ],
            "answer": 0,
            "explanation": "Vermittlung ist eine wichtige Soft Skill im Beruf."
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
        "wrong": "Einfach machen.",
        "correct": "Strukturiert und sachlich argumentieren.",
        "tip": "Bei Geschäftsverhandlung führen ist strukturiertes Vorgehen wichtig."
      },
      {
        "wrong": "schnell",
        "correct": "systematisch",
        "tip": "Systematisches Vorgehen zeigt Professionalität."
      },
      {
        "wrong": "Ausweichen.",
        "correct": "Sachlich argumentieren und Beispiele nennen.",
        "tip": "Sachliche Argumentation mit Beispielen überzeugt."
      }
    ]
  },
  {
    "id": "b2-09",
    "level": "B2",
    "title": "Fachvortrag",
    "titleDe": "Einen Fachvortrag halten",
    "icon": "🎤",
    "premium": false,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Einen Fachvortrag halten.",
            "question": "Wie gehst du professionell vor?",
            "options": [
              "Strukturiert und sachlich argumentieren.",
              "Einfach machen.",
              "Abwarten."
            ],
            "answer": 0,
            "explanation": "Bei Einen Fachvortrag halten ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du bereitest dich auf Einen Fachvortrag halten vor.",
            "question": "Ich würde vorschlagen, dass wir ___ vorgehen.",
            "options": [
              "systematisch",
              "schnell",
              "einfach"
            ],
            "answer": "systematisch",
            "explanation": "Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "dass",
              "Ich",
              "bin",
              "überzeugt",
              "richtig",
              "wir",
              "handeln"
            ],
            "answer": [
              1,
              2,
              3,
              0,
              5,
              4,
              6
            ],
            "explanation": "Richtig: Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "quick_reaction",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Einen Fachvortrag halten.",
            "question": "Wie reagierst du?",
            "options": [
              "Sachlich argumentieren und Beispiele nennen.",
              "Ausweichen.",
              "Die Frage zurückgeben."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "quick_reaction",
            "situation": "Du sollst eine Präsentation halten.",
            "question": "Wie bereitest du dich vor?",
            "options": [
              "Ich strukturiere die Inhalte klar und übe den Vortrag.",
              "Ich improvisiere.",
              "Ich lese alles ab."
            ],
            "answer": 0,
            "explanation": "Gute Vorbereitung ist der Schlüssel zu einer gelungenen Präsentation."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Einen Fachvortrag halten.",
            "question": "Bei Einen Fachvortrag halten ist strukturiertes ___ wichtig.",
            "options": [
              "Vorgehen",
              "soll",
              "brauche"
            ],
            "answer": "Vorgehen",
            "explanation": "Bei Einen Fachvortrag halten ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du bereitest dich auf Einen Fachvortrag halten vor.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Vorgehen",
              "Systematisches",
              "Professionalität",
              "zeigt"
            ],
            "answer": [
              1,
              0,
              3,
              2
            ],
            "explanation": "Richtig: Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Ich bin überzeugt, dass wir richtig ___.",
            "options": [
              "handeln",
              "Antwort",
              "sage"
            ],
            "answer": "handeln",
            "explanation": "Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "sort_sentence",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Einen Fachvortrag halten.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sachliche",
              "Beispielen",
              "mit",
              "Argumentation",
              "überzeugt"
            ],
            "answer": [
              0,
              3,
              2,
              1,
              4
            ],
            "explanation": "Richtig: Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "fill_blank",
            "situation": "Du sollst eine Präsentation halten.",
            "question": "Gute Vorbereitung ist ___ Schlüssel zu einer gelungenen Präsentation.",
            "options": [
              "der",
              "jetzt",
              "kann"
            ],
            "answer": "der",
            "explanation": "Gute Vorbereitung ist der Schlüssel zu einer gelungenen Präsentation."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Einen Fachvortrag halten.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Strukturiert und sachlich argumentieren.",
              "Ich sehe darin keinen Mehrwert.",
              "Das liegt nicht in meinem Bereich."
            ],
            "answer": 0,
            "explanation": "Bei Einen Fachvortrag halten ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bereitest dich auf Einen Fachvortrag halten vor.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "systematisch",
              "Ich bin anderer Meinung.",
              "Darauf möchte ich nicht eingehen."
            ],
            "answer": 0,
            "explanation": "Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich bin überzeugt dass wir richtig handeln",
              "Ich sehe darin keinen Mehrwert.",
              "Das liegt nicht in meinem Bereich."
            ],
            "answer": 0,
            "explanation": "Richtig: Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "quick_reaction",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Einen Fachvortrag halten.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Sachlich argumentieren und Beispiele nennen.",
              "Damit befasse ich mich nicht.",
              "Das ist nicht zielführend."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "quick_reaction",
            "situation": "Du sollst eine Präsentation halten.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich strukturiere die Inhalte klar und übe den Vortrag.",
              "Darauf möchte ich nicht eingehen.",
              "Ohne Informationen sage ich nichts."
            ],
            "answer": 0,
            "explanation": "Gute Vorbereitung ist der Schlüssel zu einer gelungenen Präsentation."
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
        "wrong": "Einfach machen.",
        "correct": "Strukturiert und sachlich argumentieren.",
        "tip": "Bei Einen Fachvortrag halten ist strukturiertes Vorgehen wichtig."
      },
      {
        "wrong": "schnell",
        "correct": "systematisch",
        "tip": "Systematisches Vorgehen zeigt Professionalität."
      },
      {
        "wrong": "Ausweichen.",
        "correct": "Sachlich argumentieren und Beispiele nennen.",
        "tip": "Sachliche Argumentation mit Beispielen überzeugt."
      }
    ]
  },
  {
    "id": "b2-10",
    "level": "B2",
    "title": "Kritikgespräch",
    "titleDe": "Ein Kritikgespräch führen",
    "icon": "🗣️",
    "premium": false,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Ein Kritikgespräch führen.",
            "question": "Wie gehst du professionell vor?",
            "options": [
              "Strukturiert und sachlich argumentieren.",
              "Einfach machen.",
              "Abwarten."
            ],
            "answer": 0,
            "explanation": "Bei Ein Kritikgespräch führen ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du bereitest dich auf Ein Kritikgespräch führen vor.",
            "question": "Ich würde vorschlagen, dass wir ___ vorgehen.",
            "options": [
              "systematisch",
              "schnell",
              "einfach"
            ],
            "answer": "systematisch",
            "explanation": "Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "dass",
              "Ich",
              "bin",
              "überzeugt",
              "richtig",
              "wir",
              "handeln"
            ],
            "answer": [
              1,
              2,
              3,
              0,
              5,
              4,
              6
            ],
            "explanation": "Richtig: Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "quick_reaction",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Ein Kritikgespräch führen.",
            "question": "Wie reagierst du?",
            "options": [
              "Sachlich argumentieren und Beispiele nennen.",
              "Ausweichen.",
              "Die Frage zurückgeben."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "quick_reaction",
            "situation": "Ein Kunde beschwert sich.",
            "question": "Wie reagierst du professionell?",
            "options": [
              "Ich entschuldige mich und biete eine Lösung an.",
              "Das ist nicht mein Problem.",
              "Ich leite die Beschwerde weiter."
            ],
            "answer": 0,
            "explanation": "Professioneller Umgang mit Beschwerden stärkt die Kundenbindung."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Ein Kritikgespräch führen.",
            "question": "Bei ___ Kritikgespräch führen ist strukturiertes Vorgehen wichtig.",
            "options": [
              "Ein",
              "Zeit",
              "Problem"
            ],
            "answer": "Ein",
            "explanation": "Bei Ein Kritikgespräch führen ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du bereitest dich auf Ein Kritikgespräch führen vor.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Systematisches",
              "zeigt",
              "Professionalität",
              "Vorgehen"
            ],
            "answer": [
              0,
              3,
              1,
              2
            ],
            "explanation": "Richtig: Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Ich bin überzeugt, ___ wir richtig handeln.",
            "options": [
              "dass",
              "nötig",
              "dort"
            ],
            "answer": "dass",
            "explanation": "Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "sort_sentence",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Ein Kritikgespräch führen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "überzeugt",
              "mit",
              "Sachliche",
              "Beispielen",
              "Argumentation"
            ],
            "answer": [
              2,
              4,
              1,
              3,
              0
            ],
            "explanation": "Richtig: Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "fill_blank",
            "situation": "Ein Kunde beschwert sich.",
            "question": "Professioneller Umgang mit Beschwerden stärkt ___ Kundenbindung.",
            "options": [
              "die",
              "muss",
              "habe"
            ],
            "answer": "die",
            "explanation": "Professioneller Umgang mit Beschwerden stärkt die Kundenbindung."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Ein Kritikgespräch führen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Strukturiert und sachlich argumentieren.",
              "Das wurde bereits besprochen.",
              "Ich sehe darin keinen Mehrwert."
            ],
            "answer": 0,
            "explanation": "Bei Ein Kritikgespräch führen ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bereitest dich auf Ein Kritikgespräch führen vor.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "systematisch",
              "Das halte ich für irrelevant.",
              "Das wäre kontraproduktiv."
            ],
            "answer": 0,
            "explanation": "Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich bin überzeugt dass wir richtig handeln",
              "Ich bin anderer Meinung.",
              "Ohne Informationen sage ich nichts."
            ],
            "answer": 0,
            "explanation": "Richtig: Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "quick_reaction",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Ein Kritikgespräch führen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Sachlich argumentieren und Beispiele nennen.",
              "Das wurde bereits besprochen.",
              "Damit befasse ich mich nicht."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "quick_reaction",
            "situation": "Ein Kunde beschwert sich.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich entschuldige mich und biete eine Lösung an.",
              "Das wäre kontraproduktiv.",
              "Ohne Informationen sage ich nichts."
            ],
            "answer": 0,
            "explanation": "Professioneller Umgang mit Beschwerden stärkt die Kundenbindung."
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
        "wrong": "Einfach machen.",
        "correct": "Strukturiert und sachlich argumentieren.",
        "tip": "Bei Ein Kritikgespräch führen ist strukturiertes Vorgehen wichtig."
      },
      {
        "wrong": "schnell",
        "correct": "systematisch",
        "tip": "Systematisches Vorgehen zeigt Professionalität."
      },
      {
        "wrong": "Ausweichen.",
        "correct": "Sachlich argumentieren und Beispiele nennen.",
        "tip": "Sachliche Argumentation mit Beispielen überzeugt."
      }
    ]
  },
  {
    "id": "b2-11",
    "level": "B2",
    "title": "Budgetplanung",
    "titleDe": "Budget planen und präsentieren",
    "icon": "📈",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Budget planen und präsentieren.",
            "question": "Wie gehst du professionell vor?",
            "options": [
              "Strukturiert und sachlich argumentieren.",
              "Einfach machen.",
              "Abwarten."
            ],
            "answer": 0,
            "explanation": "Bei Budget planen und präsentieren ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du bereitest dich auf Budget planen und präsentieren vor.",
            "question": "Ich würde vorschlagen, dass wir ___ vorgehen.",
            "options": [
              "systematisch",
              "schnell",
              "einfach"
            ],
            "answer": "systematisch",
            "explanation": "Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "dass",
              "Ich",
              "bin",
              "überzeugt",
              "richtig",
              "wir",
              "handeln"
            ],
            "answer": [
              1,
              2,
              3,
              0,
              5,
              4,
              6
            ],
            "explanation": "Richtig: Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "quick_reaction",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Budget planen und präsentieren.",
            "question": "Wie reagierst du?",
            "options": [
              "Sachlich argumentieren und Beispiele nennen.",
              "Ausweichen.",
              "Die Frage zurückgeben."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "quick_reaction",
            "situation": "Du wirst zu einem Vorstellungsgespräch eingeladen.",
            "question": "Was bereitest du vor?",
            "options": [
              "Ich recherchiere das Unternehmen und bereite Antworten vor.",
              "Ich gehe einfach hin.",
              "Ich frage nach dem Gehalt."
            ],
            "answer": 0,
            "explanation": "Vorbereitung zeigt Interesse und Professionalität."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Budget planen und präsentieren.",
            "question": "Bei Budget planen und präsentieren ist strukturiertes ___ wichtig.",
            "options": [
              "Vorgehen",
              "Nummer",
              "bitte"
            ],
            "answer": "Vorgehen",
            "explanation": "Bei Budget planen und präsentieren ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du bereitest dich auf Budget planen und präsentieren vor.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Vorgehen",
              "zeigt",
              "Systematisches",
              "Professionalität"
            ],
            "answer": [
              2,
              0,
              1,
              3
            ],
            "explanation": "Richtig: Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Ich bin überzeugt, ___ wir richtig handeln.",
            "options": [
              "dass",
              "soll",
              "Antwort"
            ],
            "answer": "dass",
            "explanation": "Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "sort_sentence",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Budget planen und präsentieren.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "mit",
              "Beispielen",
              "überzeugt",
              "Argumentation",
              "Sachliche"
            ],
            "answer": [
              4,
              3,
              0,
              1,
              2
            ],
            "explanation": "Richtig: Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "fill_blank",
            "situation": "Du wirst zu einem Vorstellungsgespräch eingeladen.",
            "question": "Vorbereitung zeigt Interesse und ___.",
            "options": [
              "Professionalität",
              "langsam",
              "gestern"
            ],
            "answer": "Professionalität",
            "explanation": "Vorbereitung zeigt Interesse und Professionalität."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Budget planen und präsentieren.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Strukturiert und sachlich argumentieren.",
              "Damit befasse ich mich nicht.",
              "Das wäre kontraproduktiv."
            ],
            "answer": 0,
            "explanation": "Bei Budget planen und präsentieren ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bereitest dich auf Budget planen und präsentieren vor.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "systematisch",
              "Damit befasse ich mich nicht.",
              "Darauf möchte ich nicht eingehen."
            ],
            "answer": 0,
            "explanation": "Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich bin überzeugt dass wir richtig handeln",
              "Das wurde bereits besprochen.",
              "Ich bin anderer Meinung."
            ],
            "answer": 0,
            "explanation": "Richtig: Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "quick_reaction",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Budget planen und präsentieren.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Sachlich argumentieren und Beispiele nennen.",
              "Das wäre kontraproduktiv.",
              "Ich sehe darin keinen Mehrwert."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "quick_reaction",
            "situation": "Du wirst zu einem Vorstellungsgespräch eingeladen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich recherchiere das Unternehmen und bereite Antworten vor.",
              "Das halte ich für irrelevant.",
              "Ich sehe darin keinen Mehrwert."
            ],
            "answer": 0,
            "explanation": "Vorbereitung zeigt Interesse und Professionalität."
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
        "wrong": "Einfach machen.",
        "correct": "Strukturiert und sachlich argumentieren.",
        "tip": "Bei Budget planen und präsentieren ist strukturiertes Vorgehen wichtig."
      },
      {
        "wrong": "schnell",
        "correct": "systematisch",
        "tip": "Systematisches Vorgehen zeigt Professionalität."
      },
      {
        "wrong": "Ausweichen.",
        "correct": "Sachlich argumentieren und Beispiele nennen.",
        "tip": "Sachliche Argumentation mit Beispielen überzeugt."
      }
    ]
  },
  {
    "id": "b2-12",
    "level": "B2",
    "title": "Fachdiskussion",
    "titleDe": "An einer Fachdiskussion teilnehmen",
    "icon": "🎯",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: An einer Fachdiskussion teilnehmen.",
            "question": "Wie gehst du professionell vor?",
            "options": [
              "Strukturiert und sachlich argumentieren.",
              "Einfach machen.",
              "Abwarten."
            ],
            "answer": 0,
            "explanation": "Bei An einer Fachdiskussion teilnehmen ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du bereitest dich auf An einer Fachdiskussion teilnehmen vor.",
            "question": "Ich würde vorschlagen, dass wir ___ vorgehen.",
            "options": [
              "systematisch",
              "schnell",
              "einfach"
            ],
            "answer": "systematisch",
            "explanation": "Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "dass",
              "Ich",
              "bin",
              "überzeugt",
              "richtig",
              "wir",
              "handeln"
            ],
            "answer": [
              1,
              2,
              3,
              0,
              5,
              4,
              6
            ],
            "explanation": "Richtig: Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "quick_reaction",
            "situation": "Man stellt dir eine schwierige Frage zum Thema An einer Fachdiskussion teilnehmen.",
            "question": "Wie reagierst du?",
            "options": [
              "Sachlich argumentieren und Beispiele nennen.",
              "Ausweichen.",
              "Die Frage zurückgeben."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "quick_reaction",
            "situation": "Du musst Überstunden machen.",
            "question": "Wie klärst du das?",
            "options": [
              "Ich frage, ob die Überstunden vergütet oder ausgeglichen werden.",
              "Ich mache sie einfach.",
              "Ich lehne ab."
            ],
            "answer": 0,
            "explanation": "Klare Kommunikation über Arbeitsbedingungen ist wichtig."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: An einer Fachdiskussion teilnehmen.",
            "question": "Bei An ___ Fachdiskussion teilnehmen ist strukturiertes Vorgehen wichtig.",
            "options": [
              "einer",
              "Nummer",
              "will"
            ],
            "answer": "einer",
            "explanation": "Bei An einer Fachdiskussion teilnehmen ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du bereitest dich auf An einer Fachdiskussion teilnehmen vor.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Vorgehen",
              "Systematisches",
              "zeigt",
              "Professionalität"
            ],
            "answer": [
              1,
              0,
              2,
              3
            ],
            "explanation": "Richtig: Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Ich bin überzeugt, ___ wir richtig handeln.",
            "options": [
              "dass",
              "hier",
              "gerne"
            ],
            "answer": "dass",
            "explanation": "Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "sort_sentence",
            "situation": "Man stellt dir eine schwierige Frage zum Thema An einer Fachdiskussion teilnehmen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "überzeugt",
              "mit",
              "Beispielen",
              "Sachliche",
              "Argumentation"
            ],
            "answer": [
              3,
              4,
              1,
              2,
              0
            ],
            "explanation": "Richtig: Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "fill_blank",
            "situation": "Du musst Überstunden machen.",
            "question": "Klare ___ über Arbeitsbedingungen ist wichtig.",
            "options": [
              "Kommunikation",
              "komme",
              "richtig"
            ],
            "answer": "Kommunikation",
            "explanation": "Klare Kommunikation über Arbeitsbedingungen ist wichtig."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: An einer Fachdiskussion teilnehmen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Strukturiert und sachlich argumentieren.",
              "Das bedarf keiner Diskussion.",
              "Ohne Informationen sage ich nichts."
            ],
            "answer": 0,
            "explanation": "Bei An einer Fachdiskussion teilnehmen ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bereitest dich auf An einer Fachdiskussion teilnehmen vor.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "systematisch",
              "Ohne Informationen sage ich nichts.",
              "Das wurde bereits besprochen."
            ],
            "answer": 0,
            "explanation": "Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich bin überzeugt dass wir richtig handeln",
              "Das übersteigt meine Kompetenzen.",
              "Das bedarf keiner Diskussion."
            ],
            "answer": 0,
            "explanation": "Richtig: Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "quick_reaction",
            "situation": "Man stellt dir eine schwierige Frage zum Thema An einer Fachdiskussion teilnehmen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Sachlich argumentieren und Beispiele nennen.",
              "Das übersteigt meine Kompetenzen.",
              "Das wurde bereits besprochen."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "quick_reaction",
            "situation": "Du musst Überstunden machen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich frage, ob die Überstunden vergütet oder ausgeglichen werden.",
              "Das wäre kontraproduktiv.",
              "Darauf möchte ich nicht eingehen."
            ],
            "answer": 0,
            "explanation": "Klare Kommunikation über Arbeitsbedingungen ist wichtig."
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
        "wrong": "Einfach machen.",
        "correct": "Strukturiert und sachlich argumentieren.",
        "tip": "Bei An einer Fachdiskussion teilnehmen ist strukturiertes Vorgehen wichtig."
      },
      {
        "wrong": "schnell",
        "correct": "systematisch",
        "tip": "Systematisches Vorgehen zeigt Professionalität."
      },
      {
        "wrong": "Ausweichen.",
        "correct": "Sachlich argumentieren und Beispiele nennen.",
        "tip": "Sachliche Argumentation mit Beispielen überzeugt."
      }
    ]
  },
  {
    "id": "b2-13",
    "level": "B2",
    "title": "Vertragsverhandlung",
    "titleDe": "Verträge verhandeln",
    "icon": "📝",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Verträge verhandeln.",
            "question": "Wie gehst du professionell vor?",
            "options": [
              "Strukturiert und sachlich argumentieren.",
              "Einfach machen.",
              "Abwarten."
            ],
            "answer": 0,
            "explanation": "Bei Verträge verhandeln ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du bereitest dich auf Verträge verhandeln vor.",
            "question": "Ich würde vorschlagen, dass wir ___ vorgehen.",
            "options": [
              "systematisch",
              "schnell",
              "einfach"
            ],
            "answer": "systematisch",
            "explanation": "Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "dass",
              "Ich",
              "bin",
              "überzeugt",
              "richtig",
              "wir",
              "handeln"
            ],
            "answer": [
              1,
              2,
              3,
              0,
              5,
              4,
              6
            ],
            "explanation": "Richtig: Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "quick_reaction",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Verträge verhandeln.",
            "question": "Wie reagierst du?",
            "options": [
              "Sachlich argumentieren und Beispiele nennen.",
              "Ausweichen.",
              "Die Frage zurückgeben."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "quick_reaction",
            "situation": "In einem Meeting gibt es Meinungsverschiedenheiten.",
            "question": "Wie vermittelst du?",
            "options": [
              "Ich verstehe beide Seiten. Lassen Sie uns einen Kompromiss finden.",
              "Ich sage nichts.",
              "Einer hat recht, der andere nicht."
            ],
            "answer": 0,
            "explanation": "Vermittlung ist eine wichtige Soft Skill im Beruf."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Verträge verhandeln.",
            "question": "Bei ___ verhandeln ist strukturiertes Vorgehen wichtig.",
            "options": [
              "Verträge",
              "Lösung",
              "Nummer"
            ],
            "answer": "Verträge",
            "explanation": "Bei Verträge verhandeln ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du bereitest dich auf Verträge verhandeln vor.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Vorgehen",
              "Systematisches",
              "Professionalität",
              "zeigt"
            ],
            "answer": [
              1,
              0,
              3,
              2
            ],
            "explanation": "Richtig: Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Ich bin überzeugt, ___ wir richtig handeln.",
            "options": [
              "dass",
              "danke",
              "schnell"
            ],
            "answer": "dass",
            "explanation": "Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "sort_sentence",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Verträge verhandeln.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "überzeugt",
              "mit",
              "Argumentation",
              "Beispielen",
              "Sachliche"
            ],
            "answer": [
              4,
              2,
              1,
              3,
              0
            ],
            "explanation": "Richtig: Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "fill_blank",
            "situation": "In einem Meeting gibt es Meinungsverschiedenheiten.",
            "question": "Vermittlung ___ eine wichtige Soft Skill im Beruf.",
            "options": [
              "ist",
              "richtig",
              "schnell"
            ],
            "answer": "ist",
            "explanation": "Vermittlung ist eine wichtige Soft Skill im Beruf."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Verträge verhandeln.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Strukturiert und sachlich argumentieren.",
              "Das übersteigt meine Kompetenzen.",
              "Das bedarf keiner Diskussion."
            ],
            "answer": 0,
            "explanation": "Bei Verträge verhandeln ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bereitest dich auf Verträge verhandeln vor.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "systematisch",
              "Das übersteigt meine Kompetenzen.",
              "Das wurde bereits besprochen."
            ],
            "answer": 0,
            "explanation": "Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich bin überzeugt dass wir richtig handeln",
              "Darauf möchte ich nicht eingehen.",
              "Das ist nicht zielführend."
            ],
            "answer": 0,
            "explanation": "Richtig: Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "quick_reaction",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Verträge verhandeln.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Sachlich argumentieren und Beispiele nennen.",
              "Damit befasse ich mich nicht.",
              "Darauf möchte ich nicht eingehen."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "quick_reaction",
            "situation": "In einem Meeting gibt es Meinungsverschiedenheiten.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich verstehe beide Seiten. Lassen Sie uns einen Kompromiss finden.",
              "Ich sehe darin keinen Mehrwert.",
              "Ohne Informationen sage ich nichts."
            ],
            "answer": 0,
            "explanation": "Vermittlung ist eine wichtige Soft Skill im Beruf."
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
        "wrong": "Einfach machen.",
        "correct": "Strukturiert und sachlich argumentieren.",
        "tip": "Bei Verträge verhandeln ist strukturiertes Vorgehen wichtig."
      },
      {
        "wrong": "schnell",
        "correct": "systematisch",
        "tip": "Systematisches Vorgehen zeigt Professionalität."
      },
      {
        "wrong": "Ausweichen.",
        "correct": "Sachlich argumentieren und Beispiele nennen.",
        "tip": "Sachliche Argumentation mit Beispielen überzeugt."
      }
    ]
  },
  {
    "id": "b2-14",
    "level": "B2",
    "title": "Teamkonflikt",
    "titleDe": "Teamkonflikte moderieren",
    "icon": "👥",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Teamkonflikte moderieren.",
            "question": "Wie gehst du professionell vor?",
            "options": [
              "Strukturiert und sachlich argumentieren.",
              "Einfach machen.",
              "Abwarten."
            ],
            "answer": 0,
            "explanation": "Bei Teamkonflikte moderieren ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du bereitest dich auf Teamkonflikte moderieren vor.",
            "question": "Ich würde vorschlagen, dass wir ___ vorgehen.",
            "options": [
              "systematisch",
              "schnell",
              "einfach"
            ],
            "answer": "systematisch",
            "explanation": "Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "dass",
              "Ich",
              "bin",
              "überzeugt",
              "richtig",
              "wir",
              "handeln"
            ],
            "answer": [
              1,
              2,
              3,
              0,
              5,
              4,
              6
            ],
            "explanation": "Richtig: Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "quick_reaction",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Teamkonflikte moderieren.",
            "question": "Wie reagierst du?",
            "options": [
              "Sachlich argumentieren und Beispiele nennen.",
              "Ausweichen.",
              "Die Frage zurückgeben."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "quick_reaction",
            "situation": "Du sollst eine Präsentation halten.",
            "question": "Wie bereitest du dich vor?",
            "options": [
              "Ich strukturiere die Inhalte klar und übe den Vortrag.",
              "Ich improvisiere.",
              "Ich lese alles ab."
            ],
            "answer": 0,
            "explanation": "Gute Vorbereitung ist der Schlüssel zu einer gelungenen Präsentation."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Teamkonflikte moderieren.",
            "question": "Bei ___ moderieren ist strukturiertes Vorgehen wichtig.",
            "options": [
              "Teamkonflikte",
              "werde",
              "habe"
            ],
            "answer": "Teamkonflikte",
            "explanation": "Bei Teamkonflikte moderieren ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du bereitest dich auf Teamkonflikte moderieren vor.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "zeigt",
              "Professionalität",
              "Systematisches",
              "Vorgehen"
            ],
            "answer": [
              2,
              3,
              0,
              1
            ],
            "explanation": "Richtig: Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Ich bin überzeugt, ___ wir richtig handeln.",
            "options": [
              "dass",
              "Geld",
              "gehe"
            ],
            "answer": "dass",
            "explanation": "Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "sort_sentence",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Teamkonflikte moderieren.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Beispielen",
              "überzeugt",
              "mit",
              "Sachliche",
              "Argumentation"
            ],
            "answer": [
              3,
              4,
              2,
              0,
              1
            ],
            "explanation": "Richtig: Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "fill_blank",
            "situation": "Du sollst eine Präsentation halten.",
            "question": "Gute Vorbereitung ___ der Schlüssel zu einer gelungenen Präsentation.",
            "options": [
              "ist",
              "Problem",
              "brauche"
            ],
            "answer": "ist",
            "explanation": "Gute Vorbereitung ist der Schlüssel zu einer gelungenen Präsentation."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Teamkonflikte moderieren.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Strukturiert und sachlich argumentieren.",
              "Ich bin anderer Meinung.",
              "Das bedarf keiner Diskussion."
            ],
            "answer": 0,
            "explanation": "Bei Teamkonflikte moderieren ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bereitest dich auf Teamkonflikte moderieren vor.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "systematisch",
              "Das wurde bereits besprochen.",
              "Darauf möchte ich nicht eingehen."
            ],
            "answer": 0,
            "explanation": "Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich bin überzeugt dass wir richtig handeln",
              "Das ist nicht zielführend.",
              "Das bedarf keiner Diskussion."
            ],
            "answer": 0,
            "explanation": "Richtig: Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "quick_reaction",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Teamkonflikte moderieren.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Sachlich argumentieren und Beispiele nennen.",
              "Darauf möchte ich nicht eingehen.",
              "Ohne Informationen sage ich nichts."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "quick_reaction",
            "situation": "Du sollst eine Präsentation halten.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich strukturiere die Inhalte klar und übe den Vortrag.",
              "Damit befasse ich mich nicht.",
              "Das halte ich für irrelevant."
            ],
            "answer": 0,
            "explanation": "Gute Vorbereitung ist der Schlüssel zu einer gelungenen Präsentation."
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
        "wrong": "Einfach machen.",
        "correct": "Strukturiert und sachlich argumentieren.",
        "tip": "Bei Teamkonflikte moderieren ist strukturiertes Vorgehen wichtig."
      },
      {
        "wrong": "schnell",
        "correct": "systematisch",
        "tip": "Systematisches Vorgehen zeigt Professionalität."
      },
      {
        "wrong": "Ausweichen.",
        "correct": "Sachlich argumentieren und Beispiele nennen.",
        "tip": "Sachliche Argumentation mit Beispielen überzeugt."
      }
    ]
  },
  {
    "id": "b2-15",
    "level": "B2",
    "title": "Jahresgespräch",
    "titleDe": "Das Jahresgespräch führen",
    "icon": "📆",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Das Jahresgespräch führen.",
            "question": "Wie gehst du professionell vor?",
            "options": [
              "Strukturiert und sachlich argumentieren.",
              "Einfach machen.",
              "Abwarten."
            ],
            "answer": 0,
            "explanation": "Bei Das Jahresgespräch führen ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du bereitest dich auf Das Jahresgespräch führen vor.",
            "question": "Ich würde vorschlagen, dass wir ___ vorgehen.",
            "options": [
              "systematisch",
              "schnell",
              "einfach"
            ],
            "answer": "systematisch",
            "explanation": "Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "dass",
              "Ich",
              "bin",
              "überzeugt",
              "richtig",
              "wir",
              "handeln"
            ],
            "answer": [
              1,
              2,
              3,
              0,
              5,
              4,
              6
            ],
            "explanation": "Richtig: Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "quick_reaction",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Das Jahresgespräch führen.",
            "question": "Wie reagierst du?",
            "options": [
              "Sachlich argumentieren und Beispiele nennen.",
              "Ausweichen.",
              "Die Frage zurückgeben."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "quick_reaction",
            "situation": "Ein Kunde beschwert sich.",
            "question": "Wie reagierst du professionell?",
            "options": [
              "Ich entschuldige mich und biete eine Lösung an.",
              "Das ist nicht mein Problem.",
              "Ich leite die Beschwerde weiter."
            ],
            "answer": 0,
            "explanation": "Professioneller Umgang mit Beschwerden stärkt die Kundenbindung."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Das Jahresgespräch führen.",
            "question": "Bei Das ___ führen ist strukturiertes Vorgehen wichtig.",
            "options": [
              "Jahresgespräch",
              "frage",
              "wichtig"
            ],
            "answer": "Jahresgespräch",
            "explanation": "Bei Das Jahresgespräch führen ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du bereitest dich auf Das Jahresgespräch führen vor.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "zeigt",
              "Professionalität",
              "Vorgehen",
              "Systematisches"
            ],
            "answer": [
              3,
              2,
              0,
              1
            ],
            "explanation": "Richtig: Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Ich bin überzeugt, dass ___ richtig handeln.",
            "options": [
              "wir",
              "Frage",
              "gleich"
            ],
            "answer": "wir",
            "explanation": "Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "sort_sentence",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Das Jahresgespräch führen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Beispielen",
              "Argumentation",
              "Sachliche",
              "überzeugt",
              "mit"
            ],
            "answer": [
              2,
              1,
              4,
              0,
              3
            ],
            "explanation": "Richtig: Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "fill_blank",
            "situation": "Ein Kunde beschwert sich.",
            "question": "Professioneller ___ mit Beschwerden stärkt die Kundenbindung.",
            "options": [
              "Umgang",
              "Zeit",
              "nehme"
            ],
            "answer": "Umgang",
            "explanation": "Professioneller Umgang mit Beschwerden stärkt die Kundenbindung."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Das Jahresgespräch führen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Strukturiert und sachlich argumentieren.",
              "Das wurde bereits besprochen.",
              "Das ist nicht zielführend."
            ],
            "answer": 0,
            "explanation": "Bei Das Jahresgespräch führen ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bereitest dich auf Das Jahresgespräch führen vor.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "systematisch",
              "Das wurde bereits besprochen.",
              "Das ist nicht zielführend."
            ],
            "answer": 0,
            "explanation": "Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich bin überzeugt dass wir richtig handeln",
              "Ich sehe darin keinen Mehrwert.",
              "Das liegt nicht in meinem Bereich."
            ],
            "answer": 0,
            "explanation": "Richtig: Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "quick_reaction",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Das Jahresgespräch führen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Sachlich argumentieren und Beispiele nennen.",
              "Das bedarf keiner Diskussion.",
              "Das ist nicht zielführend."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "quick_reaction",
            "situation": "Ein Kunde beschwert sich.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich entschuldige mich und biete eine Lösung an.",
              "Das liegt nicht in meinem Bereich.",
              "Ich sehe darin keinen Mehrwert."
            ],
            "answer": 0,
            "explanation": "Professioneller Umgang mit Beschwerden stärkt die Kundenbindung."
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
        "wrong": "Einfach machen.",
        "correct": "Strukturiert und sachlich argumentieren.",
        "tip": "Bei Das Jahresgespräch führen ist strukturiertes Vorgehen wichtig."
      },
      {
        "wrong": "schnell",
        "correct": "systematisch",
        "tip": "Systematisches Vorgehen zeigt Professionalität."
      },
      {
        "wrong": "Ausweichen.",
        "correct": "Sachlich argumentieren und Beispiele nennen.",
        "tip": "Sachliche Argumentation mit Beispielen überzeugt."
      }
    ]
  },
  {
    "id": "b2-16",
    "level": "B2",
    "title": "Strategieplanung",
    "titleDe": "Strategien entwickeln",
    "icon": "🎯",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Strategien entwickeln.",
            "question": "Wie gehst du professionell vor?",
            "options": [
              "Strukturiert und sachlich argumentieren.",
              "Einfach machen.",
              "Abwarten."
            ],
            "answer": 0,
            "explanation": "Bei Strategien entwickeln ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du bereitest dich auf Strategien entwickeln vor.",
            "question": "Ich würde vorschlagen, dass wir ___ vorgehen.",
            "options": [
              "systematisch",
              "schnell",
              "einfach"
            ],
            "answer": "systematisch",
            "explanation": "Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "dass",
              "Ich",
              "bin",
              "überzeugt",
              "richtig",
              "wir",
              "handeln"
            ],
            "answer": [
              1,
              2,
              3,
              0,
              5,
              4,
              6
            ],
            "explanation": "Richtig: Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "quick_reaction",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Strategien entwickeln.",
            "question": "Wie reagierst du?",
            "options": [
              "Sachlich argumentieren und Beispiele nennen.",
              "Ausweichen.",
              "Die Frage zurückgeben."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "quick_reaction",
            "situation": "Du wirst zu einem Vorstellungsgespräch eingeladen.",
            "question": "Was bereitest du vor?",
            "options": [
              "Ich recherchiere das Unternehmen und bereite Antworten vor.",
              "Ich gehe einfach hin.",
              "Ich frage nach dem Gehalt."
            ],
            "answer": 0,
            "explanation": "Vorbereitung zeigt Interesse und Professionalität."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Strategien entwickeln.",
            "question": "Bei Strategien entwickeln ist strukturiertes Vorgehen ___.",
            "options": [
              "wichtig",
              "falsch",
              "schlecht"
            ],
            "answer": "wichtig",
            "explanation": "Bei Strategien entwickeln ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du bereitest dich auf Strategien entwickeln vor.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "zeigt",
              "Professionalität",
              "Vorgehen",
              "Systematisches"
            ],
            "answer": [
              3,
              2,
              0,
              1
            ],
            "explanation": "Richtig: Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Ich bin ___, dass wir richtig handeln.",
            "options": [
              "überzeugt",
              "nötig",
              "Hilfe"
            ],
            "answer": "überzeugt",
            "explanation": "Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "sort_sentence",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Strategien entwickeln.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Beispielen",
              "Argumentation",
              "überzeugt",
              "mit",
              "Sachliche"
            ],
            "answer": [
              4,
              1,
              3,
              0,
              2
            ],
            "explanation": "Richtig: Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "fill_blank",
            "situation": "Du wirst zu einem Vorstellungsgespräch eingeladen.",
            "question": "Vorbereitung zeigt Interesse ___ Professionalität.",
            "options": [
              "und",
              "darf",
              "sage"
            ],
            "answer": "und",
            "explanation": "Vorbereitung zeigt Interesse und Professionalität."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Strategien entwickeln.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Strukturiert und sachlich argumentieren.",
              "Ohne Informationen sage ich nichts.",
              "Ich sehe darin keinen Mehrwert."
            ],
            "answer": 0,
            "explanation": "Bei Strategien entwickeln ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bereitest dich auf Strategien entwickeln vor.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "systematisch",
              "Ich bin anderer Meinung.",
              "Das liegt nicht in meinem Bereich."
            ],
            "answer": 0,
            "explanation": "Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich bin überzeugt dass wir richtig handeln",
              "Das halte ich für irrelevant.",
              "Das übersteigt meine Kompetenzen."
            ],
            "answer": 0,
            "explanation": "Richtig: Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "quick_reaction",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Strategien entwickeln.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Sachlich argumentieren und Beispiele nennen.",
              "Das wäre kontraproduktiv.",
              "Das wurde bereits besprochen."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "quick_reaction",
            "situation": "Du wirst zu einem Vorstellungsgespräch eingeladen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich recherchiere das Unternehmen und bereite Antworten vor.",
              "Darauf möchte ich nicht eingehen.",
              "Das halte ich für irrelevant."
            ],
            "answer": 0,
            "explanation": "Vorbereitung zeigt Interesse und Professionalität."
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
        "wrong": "Einfach machen.",
        "correct": "Strukturiert und sachlich argumentieren.",
        "tip": "Bei Strategien entwickeln ist strukturiertes Vorgehen wichtig."
      },
      {
        "wrong": "schnell",
        "correct": "systematisch",
        "tip": "Systematisches Vorgehen zeigt Professionalität."
      },
      {
        "wrong": "Ausweichen.",
        "correct": "Sachlich argumentieren und Beispiele nennen.",
        "tip": "Sachliche Argumentation mit Beispielen überzeugt."
      }
    ]
  },
  {
    "id": "b2-17",
    "level": "B2",
    "title": "Kundenreklamation",
    "titleDe": "Kundenreklamation bearbeiten",
    "icon": "📞",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Kundenreklamation bearbeiten.",
            "question": "Wie gehst du professionell vor?",
            "options": [
              "Strukturiert und sachlich argumentieren.",
              "Einfach machen.",
              "Abwarten."
            ],
            "answer": 0,
            "explanation": "Bei Kundenreklamation bearbeiten ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du bereitest dich auf Kundenreklamation bearbeiten vor.",
            "question": "Ich würde vorschlagen, dass wir ___ vorgehen.",
            "options": [
              "systematisch",
              "schnell",
              "einfach"
            ],
            "answer": "systematisch",
            "explanation": "Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "dass",
              "Ich",
              "bin",
              "überzeugt",
              "richtig",
              "wir",
              "handeln"
            ],
            "answer": [
              1,
              2,
              3,
              0,
              5,
              4,
              6
            ],
            "explanation": "Richtig: Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "quick_reaction",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Kundenreklamation bearbeiten.",
            "question": "Wie reagierst du?",
            "options": [
              "Sachlich argumentieren und Beispiele nennen.",
              "Ausweichen.",
              "Die Frage zurückgeben."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "quick_reaction",
            "situation": "Du musst Überstunden machen.",
            "question": "Wie klärst du das?",
            "options": [
              "Ich frage, ob die Überstunden vergütet oder ausgeglichen werden.",
              "Ich mache sie einfach.",
              "Ich lehne ab."
            ],
            "answer": 0,
            "explanation": "Klare Kommunikation über Arbeitsbedingungen ist wichtig."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Kundenreklamation bearbeiten.",
            "question": "Bei Kundenreklamation ___ ist strukturiertes Vorgehen wichtig.",
            "options": [
              "bearbeiten",
              "wichtig",
              "Adresse"
            ],
            "answer": "bearbeiten",
            "explanation": "Bei Kundenreklamation bearbeiten ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du bereitest dich auf Kundenreklamation bearbeiten vor.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Professionalität",
              "Systematisches",
              "Vorgehen",
              "zeigt"
            ],
            "answer": [
              1,
              2,
              3,
              0
            ],
            "explanation": "Richtig: Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Ich bin überzeugt, dass wir ___ handeln.",
            "options": [
              "richtig",
              "schlecht",
              "nötig"
            ],
            "answer": "richtig",
            "explanation": "Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "sort_sentence",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Kundenreklamation bearbeiten.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "überzeugt",
              "mit",
              "Sachliche",
              "Beispielen",
              "Argumentation"
            ],
            "answer": [
              2,
              4,
              1,
              3,
              0
            ],
            "explanation": "Richtig: Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "fill_blank",
            "situation": "Du musst Überstunden machen.",
            "question": "Klare Kommunikation über Arbeitsbedingungen ___ wichtig.",
            "options": [
              "ist",
              "hier",
              "möchte"
            ],
            "answer": "ist",
            "explanation": "Klare Kommunikation über Arbeitsbedingungen ist wichtig."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Kundenreklamation bearbeiten.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Strukturiert und sachlich argumentieren.",
              "Ich sehe darin keinen Mehrwert.",
              "Das wurde bereits besprochen."
            ],
            "answer": 0,
            "explanation": "Bei Kundenreklamation bearbeiten ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bereitest dich auf Kundenreklamation bearbeiten vor.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "systematisch",
              "Das wurde bereits besprochen.",
              "Das bedarf keiner Diskussion."
            ],
            "answer": 0,
            "explanation": "Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich bin überzeugt dass wir richtig handeln",
              "Ich bin anderer Meinung.",
              "Das bedarf keiner Diskussion."
            ],
            "answer": 0,
            "explanation": "Richtig: Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "quick_reaction",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Kundenreklamation bearbeiten.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Sachlich argumentieren und Beispiele nennen.",
              "Das bedarf keiner Diskussion.",
              "Das liegt nicht in meinem Bereich."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "quick_reaction",
            "situation": "Du musst Überstunden machen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich frage, ob die Überstunden vergütet oder ausgeglichen werden.",
              "Das wurde bereits besprochen.",
              "Ich sehe darin keinen Mehrwert."
            ],
            "answer": 0,
            "explanation": "Klare Kommunikation über Arbeitsbedingungen ist wichtig."
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
        "wrong": "Einfach machen.",
        "correct": "Strukturiert und sachlich argumentieren.",
        "tip": "Bei Kundenreklamation bearbeiten ist strukturiertes Vorgehen wichtig."
      },
      {
        "wrong": "schnell",
        "correct": "systematisch",
        "tip": "Systematisches Vorgehen zeigt Professionalität."
      },
      {
        "wrong": "Ausweichen.",
        "correct": "Sachlich argumentieren und Beispiele nennen.",
        "tip": "Sachliche Argumentation mit Beispielen überzeugt."
      }
    ]
  },
  {
    "id": "b2-18",
    "level": "B2",
    "title": "Geschäftsbericht",
    "titleDe": "Geschäftsbericht verstehen",
    "icon": "📊",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Geschäftsbericht verstehen.",
            "question": "Wie gehst du professionell vor?",
            "options": [
              "Strukturiert und sachlich argumentieren.",
              "Einfach machen.",
              "Abwarten."
            ],
            "answer": 0,
            "explanation": "Bei Geschäftsbericht verstehen ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du bereitest dich auf Geschäftsbericht verstehen vor.",
            "question": "Ich würde vorschlagen, dass wir ___ vorgehen.",
            "options": [
              "systematisch",
              "schnell",
              "einfach"
            ],
            "answer": "systematisch",
            "explanation": "Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "dass",
              "Ich",
              "bin",
              "überzeugt",
              "richtig",
              "wir",
              "handeln"
            ],
            "answer": [
              1,
              2,
              3,
              0,
              5,
              4,
              6
            ],
            "explanation": "Richtig: Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "quick_reaction",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Geschäftsbericht verstehen.",
            "question": "Wie reagierst du?",
            "options": [
              "Sachlich argumentieren und Beispiele nennen.",
              "Ausweichen.",
              "Die Frage zurückgeben."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "quick_reaction",
            "situation": "In einem Meeting gibt es Meinungsverschiedenheiten.",
            "question": "Wie vermittelst du?",
            "options": [
              "Ich verstehe beide Seiten. Lassen Sie uns einen Kompromiss finden.",
              "Ich sage nichts.",
              "Einer hat recht, der andere nicht."
            ],
            "answer": 0,
            "explanation": "Vermittlung ist eine wichtige Soft Skill im Beruf."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Geschäftsbericht verstehen.",
            "question": "Bei ___ verstehen ist strukturiertes Vorgehen wichtig.",
            "options": [
              "Geschäftsbericht",
              "nehme",
              "möchte"
            ],
            "answer": "Geschäftsbericht",
            "explanation": "Bei Geschäftsbericht verstehen ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du bereitest dich auf Geschäftsbericht verstehen vor.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Vorgehen",
              "zeigt",
              "Professionalität",
              "Systematisches"
            ],
            "answer": [
              3,
              0,
              1,
              2
            ],
            "explanation": "Richtig: Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Ich bin ___, dass wir richtig handeln.",
            "options": [
              "überzeugt",
              "Name",
              "gut"
            ],
            "answer": "überzeugt",
            "explanation": "Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "sort_sentence",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Geschäftsbericht verstehen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "überzeugt",
              "Argumentation",
              "Sachliche",
              "Beispielen",
              "mit"
            ],
            "answer": [
              2,
              1,
              4,
              3,
              0
            ],
            "explanation": "Richtig: Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "fill_blank",
            "situation": "In einem Meeting gibt es Meinungsverschiedenheiten.",
            "question": "Vermittlung ist ___ wichtige Soft Skill im Beruf.",
            "options": [
              "eine",
              "Name",
              "Antwort"
            ],
            "answer": "eine",
            "explanation": "Vermittlung ist eine wichtige Soft Skill im Beruf."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Geschäftsbericht verstehen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Strukturiert und sachlich argumentieren.",
              "Das liegt nicht in meinem Bereich.",
              "Das wurde bereits besprochen."
            ],
            "answer": 0,
            "explanation": "Bei Geschäftsbericht verstehen ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bereitest dich auf Geschäftsbericht verstehen vor.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "systematisch",
              "Darauf möchte ich nicht eingehen.",
              "Das wäre kontraproduktiv."
            ],
            "answer": 0,
            "explanation": "Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich bin überzeugt dass wir richtig handeln",
              "Das übersteigt meine Kompetenzen.",
              "Damit befasse ich mich nicht."
            ],
            "answer": 0,
            "explanation": "Richtig: Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "quick_reaction",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Geschäftsbericht verstehen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Sachlich argumentieren und Beispiele nennen.",
              "Das wurde bereits besprochen.",
              "Das ist nicht zielführend."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "quick_reaction",
            "situation": "In einem Meeting gibt es Meinungsverschiedenheiten.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich verstehe beide Seiten. Lassen Sie uns einen Kompromiss finden.",
              "Das halte ich für irrelevant.",
              "Ich sehe darin keinen Mehrwert."
            ],
            "answer": 0,
            "explanation": "Vermittlung ist eine wichtige Soft Skill im Beruf."
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
        "wrong": "Einfach machen.",
        "correct": "Strukturiert und sachlich argumentieren.",
        "tip": "Bei Geschäftsbericht verstehen ist strukturiertes Vorgehen wichtig."
      },
      {
        "wrong": "schnell",
        "correct": "systematisch",
        "tip": "Systematisches Vorgehen zeigt Professionalität."
      },
      {
        "wrong": "Ausweichen.",
        "correct": "Sachlich argumentieren und Beispiele nennen.",
        "tip": "Sachliche Argumentation mit Beispielen überzeugt."
      }
    ]
  },
  {
    "id": "b2-19",
    "level": "B2",
    "title": "Arbeitsorganisation",
    "titleDe": "Arbeit effizient organisieren",
    "icon": "🗂️",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Arbeit effizient organisieren.",
            "question": "Wie gehst du professionell vor?",
            "options": [
              "Strukturiert und sachlich argumentieren.",
              "Einfach machen.",
              "Abwarten."
            ],
            "answer": 0,
            "explanation": "Bei Arbeit effizient organisieren ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du bereitest dich auf Arbeit effizient organisieren vor.",
            "question": "Ich würde vorschlagen, dass wir ___ vorgehen.",
            "options": [
              "systematisch",
              "schnell",
              "einfach"
            ],
            "answer": "systematisch",
            "explanation": "Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "dass",
              "Ich",
              "bin",
              "überzeugt",
              "richtig",
              "wir",
              "handeln"
            ],
            "answer": [
              1,
              2,
              3,
              0,
              5,
              4,
              6
            ],
            "explanation": "Richtig: Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "quick_reaction",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Arbeit effizient organisieren.",
            "question": "Wie reagierst du?",
            "options": [
              "Sachlich argumentieren und Beispiele nennen.",
              "Ausweichen.",
              "Die Frage zurückgeben."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "quick_reaction",
            "situation": "Du sollst eine Präsentation halten.",
            "question": "Wie bereitest du dich vor?",
            "options": [
              "Ich strukturiere die Inhalte klar und übe den Vortrag.",
              "Ich improvisiere.",
              "Ich lese alles ab."
            ],
            "answer": 0,
            "explanation": "Gute Vorbereitung ist der Schlüssel zu einer gelungenen Präsentation."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Arbeit effizient organisieren.",
            "question": "Bei Arbeit effizient organisieren ist strukturiertes Vorgehen ___.",
            "options": [
              "wichtig",
              "möglich",
              "schlecht"
            ],
            "answer": "wichtig",
            "explanation": "Bei Arbeit effizient organisieren ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du bereitest dich auf Arbeit effizient organisieren vor.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Vorgehen",
              "Professionalität",
              "zeigt",
              "Systematisches"
            ],
            "answer": [
              3,
              0,
              2,
              1
            ],
            "explanation": "Richtig: Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Ich bin überzeugt, ___ wir richtig handeln.",
            "options": [
              "dass",
              "Arbeit",
              "falsch"
            ],
            "answer": "dass",
            "explanation": "Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "sort_sentence",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Arbeit effizient organisieren.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Beispielen",
              "überzeugt",
              "Argumentation",
              "mit",
              "Sachliche"
            ],
            "answer": [
              4,
              2,
              3,
              0,
              1
            ],
            "explanation": "Richtig: Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "fill_blank",
            "situation": "Du sollst eine Präsentation halten.",
            "question": "Gute ___ ist der Schlüssel zu einer gelungenen Präsentation.",
            "options": [
              "Vorbereitung",
              "Arbeit",
              "Name"
            ],
            "answer": "Vorbereitung",
            "explanation": "Gute Vorbereitung ist der Schlüssel zu einer gelungenen Präsentation."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Arbeit effizient organisieren.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Strukturiert und sachlich argumentieren.",
              "Ohne Informationen sage ich nichts.",
              "Das wäre kontraproduktiv."
            ],
            "answer": 0,
            "explanation": "Bei Arbeit effizient organisieren ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bereitest dich auf Arbeit effizient organisieren vor.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "systematisch",
              "Ich sehe darin keinen Mehrwert.",
              "Darauf möchte ich nicht eingehen."
            ],
            "answer": 0,
            "explanation": "Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich bin überzeugt dass wir richtig handeln",
              "Das liegt nicht in meinem Bereich.",
              "Darauf möchte ich nicht eingehen."
            ],
            "answer": 0,
            "explanation": "Richtig: Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "quick_reaction",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Arbeit effizient organisieren.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Sachlich argumentieren und Beispiele nennen.",
              "Das übersteigt meine Kompetenzen.",
              "Darauf möchte ich nicht eingehen."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "quick_reaction",
            "situation": "Du sollst eine Präsentation halten.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich strukturiere die Inhalte klar und übe den Vortrag.",
              "Das halte ich für irrelevant.",
              "Das wäre kontraproduktiv."
            ],
            "answer": 0,
            "explanation": "Gute Vorbereitung ist der Schlüssel zu einer gelungenen Präsentation."
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
        "wrong": "Einfach machen.",
        "correct": "Strukturiert und sachlich argumentieren.",
        "tip": "Bei Arbeit effizient organisieren ist strukturiertes Vorgehen wichtig."
      },
      {
        "wrong": "schnell",
        "correct": "systematisch",
        "tip": "Systematisches Vorgehen zeigt Professionalität."
      },
      {
        "wrong": "Ausweichen.",
        "correct": "Sachlich argumentieren und Beispiele nennen.",
        "tip": "Sachliche Argumentation mit Beispielen überzeugt."
      }
    ]
  },
  {
    "id": "b2-20",
    "level": "B2",
    "title": "Verbesserungsvorschlag",
    "titleDe": "Verbesserungen vorschlagen",
    "icon": "💡",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Verbesserungen vorschlagen.",
            "question": "Wie gehst du professionell vor?",
            "options": [
              "Strukturiert und sachlich argumentieren.",
              "Einfach machen.",
              "Abwarten."
            ],
            "answer": 0,
            "explanation": "Bei Verbesserungen vorschlagen ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du bereitest dich auf Verbesserungen vorschlagen vor.",
            "question": "Ich würde vorschlagen, dass wir ___ vorgehen.",
            "options": [
              "systematisch",
              "schnell",
              "einfach"
            ],
            "answer": "systematisch",
            "explanation": "Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "dass",
              "Ich",
              "bin",
              "überzeugt",
              "richtig",
              "wir",
              "handeln"
            ],
            "answer": [
              1,
              2,
              3,
              0,
              5,
              4,
              6
            ],
            "explanation": "Richtig: Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "quick_reaction",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Verbesserungen vorschlagen.",
            "question": "Wie reagierst du?",
            "options": [
              "Sachlich argumentieren und Beispiele nennen.",
              "Ausweichen.",
              "Die Frage zurückgeben."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "quick_reaction",
            "situation": "Ein Kunde beschwert sich.",
            "question": "Wie reagierst du professionell?",
            "options": [
              "Ich entschuldige mich und biete eine Lösung an.",
              "Das ist nicht mein Problem.",
              "Ich leite die Beschwerde weiter."
            ],
            "answer": 0,
            "explanation": "Professioneller Umgang mit Beschwerden stärkt die Kundenbindung."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Verbesserungen vorschlagen.",
            "question": "Bei Verbesserungen ___ ist strukturiertes Vorgehen wichtig.",
            "options": [
              "vorschlagen",
              "möchte",
              "nehme"
            ],
            "answer": "vorschlagen",
            "explanation": "Bei Verbesserungen vorschlagen ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du bereitest dich auf Verbesserungen vorschlagen vor.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "zeigt",
              "Systematisches",
              "Vorgehen",
              "Professionalität"
            ],
            "answer": [
              1,
              2,
              0,
              3
            ],
            "explanation": "Richtig: Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Ich bin überzeugt, dass wir ___ handeln.",
            "options": [
              "richtig",
              "nötig",
              "schnell"
            ],
            "answer": "richtig",
            "explanation": "Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "sort_sentence",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Verbesserungen vorschlagen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Argumentation",
              "mit",
              "Beispielen",
              "überzeugt",
              "Sachliche"
            ],
            "answer": [
              4,
              0,
              1,
              2,
              3
            ],
            "explanation": "Richtig: Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "fill_blank",
            "situation": "Ein Kunde beschwert sich.",
            "question": "Professioneller Umgang mit Beschwerden stärkt die ___.",
            "options": [
              "Kundenbindung",
              "Name",
              "möchte"
            ],
            "answer": "Kundenbindung",
            "explanation": "Professioneller Umgang mit Beschwerden stärkt die Kundenbindung."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Verbesserungen vorschlagen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Strukturiert und sachlich argumentieren.",
              "Darauf möchte ich nicht eingehen.",
              "Das bedarf keiner Diskussion."
            ],
            "answer": 0,
            "explanation": "Bei Verbesserungen vorschlagen ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bereitest dich auf Verbesserungen vorschlagen vor.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "systematisch",
              "Darauf möchte ich nicht eingehen.",
              "Das halte ich für irrelevant."
            ],
            "answer": 0,
            "explanation": "Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich bin überzeugt dass wir richtig handeln",
              "Das liegt nicht in meinem Bereich.",
              "Das halte ich für irrelevant."
            ],
            "answer": 0,
            "explanation": "Richtig: Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "quick_reaction",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Verbesserungen vorschlagen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Sachlich argumentieren und Beispiele nennen.",
              "Das übersteigt meine Kompetenzen.",
              "Das ist nicht zielführend."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "quick_reaction",
            "situation": "Ein Kunde beschwert sich.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich entschuldige mich und biete eine Lösung an.",
              "Ich bin anderer Meinung.",
              "Das wäre kontraproduktiv."
            ],
            "answer": 0,
            "explanation": "Professioneller Umgang mit Beschwerden stärkt die Kundenbindung."
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
        "wrong": "Einfach machen.",
        "correct": "Strukturiert und sachlich argumentieren.",
        "tip": "Bei Verbesserungen vorschlagen ist strukturiertes Vorgehen wichtig."
      },
      {
        "wrong": "schnell",
        "correct": "systematisch",
        "tip": "Systematisches Vorgehen zeigt Professionalität."
      },
      {
        "wrong": "Ausweichen.",
        "correct": "Sachlich argumentieren und Beispiele nennen.",
        "tip": "Sachliche Argumentation mit Beispielen überzeugt."
      }
    ]
  },
  {
    "id": "b2-21",
    "level": "B2",
    "title": "Mentoring",
    "titleDe": "Als Mentor agieren",
    "icon": "🧑‍🏫",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Als Mentor agieren.",
            "question": "Wie gehst du professionell vor?",
            "options": [
              "Strukturiert und sachlich argumentieren.",
              "Einfach machen.",
              "Abwarten."
            ],
            "answer": 0,
            "explanation": "Bei Als Mentor agieren ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du bereitest dich auf Als Mentor agieren vor.",
            "question": "Ich würde vorschlagen, dass wir ___ vorgehen.",
            "options": [
              "systematisch",
              "schnell",
              "einfach"
            ],
            "answer": "systematisch",
            "explanation": "Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "dass",
              "Ich",
              "bin",
              "überzeugt",
              "richtig",
              "wir",
              "handeln"
            ],
            "answer": [
              1,
              2,
              3,
              0,
              5,
              4,
              6
            ],
            "explanation": "Richtig: Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "quick_reaction",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Als Mentor agieren.",
            "question": "Wie reagierst du?",
            "options": [
              "Sachlich argumentieren und Beispiele nennen.",
              "Ausweichen.",
              "Die Frage zurückgeben."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "quick_reaction",
            "situation": "Du wirst zu einem Vorstellungsgespräch eingeladen.",
            "question": "Was bereitest du vor?",
            "options": [
              "Ich recherchiere das Unternehmen und bereite Antworten vor.",
              "Ich gehe einfach hin.",
              "Ich frage nach dem Gehalt."
            ],
            "answer": 0,
            "explanation": "Vorbereitung zeigt Interesse und Professionalität."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Als Mentor agieren.",
            "question": "Bei Als Mentor agieren ___ strukturiertes Vorgehen wichtig.",
            "options": [
              "ist",
              "bin",
              "Geld"
            ],
            "answer": "ist",
            "explanation": "Bei Als Mentor agieren ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du bereitest dich auf Als Mentor agieren vor.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "zeigt",
              "Vorgehen",
              "Systematisches",
              "Professionalität"
            ],
            "answer": [
              2,
              1,
              0,
              3
            ],
            "explanation": "Richtig: Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Ich bin ___, dass wir richtig handeln.",
            "options": [
              "überzeugt",
              "mache",
              "Termin"
            ],
            "answer": "überzeugt",
            "explanation": "Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "sort_sentence",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Als Mentor agieren.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Argumentation",
              "überzeugt",
              "Sachliche",
              "Beispielen",
              "mit"
            ],
            "answer": [
              2,
              0,
              4,
              3,
              1
            ],
            "explanation": "Richtig: Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "fill_blank",
            "situation": "Du wirst zu einem Vorstellungsgespräch eingeladen.",
            "question": "Vorbereitung zeigt ___ und Professionalität.",
            "options": [
              "Interesse",
              "jetzt",
              "Frage"
            ],
            "answer": "Interesse",
            "explanation": "Vorbereitung zeigt Interesse und Professionalität."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Als Mentor agieren.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Strukturiert und sachlich argumentieren.",
              "Das liegt nicht in meinem Bereich.",
              "Ich bin anderer Meinung."
            ],
            "answer": 0,
            "explanation": "Bei Als Mentor agieren ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bereitest dich auf Als Mentor agieren vor.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "systematisch",
              "Ohne Informationen sage ich nichts.",
              "Das liegt nicht in meinem Bereich."
            ],
            "answer": 0,
            "explanation": "Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich bin überzeugt dass wir richtig handeln",
              "Das halte ich für irrelevant.",
              "Darauf möchte ich nicht eingehen."
            ],
            "answer": 0,
            "explanation": "Richtig: Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "quick_reaction",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Als Mentor agieren.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Sachlich argumentieren und Beispiele nennen.",
              "Das wurde bereits besprochen.",
              "Ich bin anderer Meinung."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "quick_reaction",
            "situation": "Du wirst zu einem Vorstellungsgespräch eingeladen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich recherchiere das Unternehmen und bereite Antworten vor.",
              "Das übersteigt meine Kompetenzen.",
              "Ich bin anderer Meinung."
            ],
            "answer": 0,
            "explanation": "Vorbereitung zeigt Interesse und Professionalität."
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
        "wrong": "Einfach machen.",
        "correct": "Strukturiert und sachlich argumentieren.",
        "tip": "Bei Als Mentor agieren ist strukturiertes Vorgehen wichtig."
      },
      {
        "wrong": "schnell",
        "correct": "systematisch",
        "tip": "Systematisches Vorgehen zeigt Professionalität."
      },
      {
        "wrong": "Ausweichen.",
        "correct": "Sachlich argumentieren und Beispiele nennen.",
        "tip": "Sachliche Argumentation mit Beispielen überzeugt."
      }
    ]
  },
  {
    "id": "b2-22",
    "level": "B2",
    "title": "Compliance",
    "titleDe": "Compliance verstehen",
    "icon": "📜",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Compliance verstehen.",
            "question": "Wie gehst du professionell vor?",
            "options": [
              "Strukturiert und sachlich argumentieren.",
              "Einfach machen.",
              "Abwarten."
            ],
            "answer": 0,
            "explanation": "Bei Compliance verstehen ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du bereitest dich auf Compliance verstehen vor.",
            "question": "Ich würde vorschlagen, dass wir ___ vorgehen.",
            "options": [
              "systematisch",
              "schnell",
              "einfach"
            ],
            "answer": "systematisch",
            "explanation": "Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "dass",
              "Ich",
              "bin",
              "überzeugt",
              "richtig",
              "wir",
              "handeln"
            ],
            "answer": [
              1,
              2,
              3,
              0,
              5,
              4,
              6
            ],
            "explanation": "Richtig: Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "quick_reaction",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Compliance verstehen.",
            "question": "Wie reagierst du?",
            "options": [
              "Sachlich argumentieren und Beispiele nennen.",
              "Ausweichen.",
              "Die Frage zurückgeben."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "quick_reaction",
            "situation": "Du musst Überstunden machen.",
            "question": "Wie klärst du das?",
            "options": [
              "Ich frage, ob die Überstunden vergütet oder ausgeglichen werden.",
              "Ich mache sie einfach.",
              "Ich lehne ab."
            ],
            "answer": 0,
            "explanation": "Klare Kommunikation über Arbeitsbedingungen ist wichtig."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Compliance verstehen.",
            "question": "Bei Compliance ___ ist strukturiertes Vorgehen wichtig.",
            "options": [
              "verstehen",
              "jetzt",
              "wichtig"
            ],
            "answer": "verstehen",
            "explanation": "Bei Compliance verstehen ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du bereitest dich auf Compliance verstehen vor.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Professionalität",
              "Systematisches",
              "zeigt",
              "Vorgehen"
            ],
            "answer": [
              1,
              3,
              2,
              0
            ],
            "explanation": "Richtig: Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Ich bin überzeugt, dass ___ richtig handeln.",
            "options": [
              "wir",
              "danke",
              "Hilfe"
            ],
            "answer": "wir",
            "explanation": "Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "sort_sentence",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Compliance verstehen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sachliche",
              "mit",
              "Argumentation",
              "überzeugt",
              "Beispielen"
            ],
            "answer": [
              0,
              2,
              1,
              4,
              3
            ],
            "explanation": "Richtig: Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "fill_blank",
            "situation": "Du musst Überstunden machen.",
            "question": "Klare Kommunikation über Arbeitsbedingungen ___ wichtig.",
            "options": [
              "ist",
              "Termin",
              "mache"
            ],
            "answer": "ist",
            "explanation": "Klare Kommunikation über Arbeitsbedingungen ist wichtig."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Compliance verstehen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Strukturiert und sachlich argumentieren.",
              "Das halte ich für irrelevant.",
              "Das bedarf keiner Diskussion."
            ],
            "answer": 0,
            "explanation": "Bei Compliance verstehen ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bereitest dich auf Compliance verstehen vor.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "systematisch",
              "Das ist nicht zielführend.",
              "Ich sehe darin keinen Mehrwert."
            ],
            "answer": 0,
            "explanation": "Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich bin überzeugt dass wir richtig handeln",
              "Das halte ich für irrelevant.",
              "Das wurde bereits besprochen."
            ],
            "answer": 0,
            "explanation": "Richtig: Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "quick_reaction",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Compliance verstehen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Sachlich argumentieren und Beispiele nennen.",
              "Das halte ich für irrelevant.",
              "Das liegt nicht in meinem Bereich."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "quick_reaction",
            "situation": "Du musst Überstunden machen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich frage, ob die Überstunden vergütet oder ausgeglichen werden.",
              "Ohne Informationen sage ich nichts.",
              "Das bedarf keiner Diskussion."
            ],
            "answer": 0,
            "explanation": "Klare Kommunikation über Arbeitsbedingungen ist wichtig."
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
        "wrong": "Einfach machen.",
        "correct": "Strukturiert und sachlich argumentieren.",
        "tip": "Bei Compliance verstehen ist strukturiertes Vorgehen wichtig."
      },
      {
        "wrong": "schnell",
        "correct": "systematisch",
        "tip": "Systematisches Vorgehen zeigt Professionalität."
      },
      {
        "wrong": "Ausweichen.",
        "correct": "Sachlich argumentieren und Beispiele nennen.",
        "tip": "Sachliche Argumentation mit Beispielen überzeugt."
      }
    ]
  },
  {
    "id": "b2-23",
    "level": "B2",
    "title": "Onboarding",
    "titleDe": "Neue Mitarbeiter einarbeiten",
    "icon": "👋",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Neue Mitarbeiter einarbeiten.",
            "question": "Wie gehst du professionell vor?",
            "options": [
              "Strukturiert und sachlich argumentieren.",
              "Einfach machen.",
              "Abwarten."
            ],
            "answer": 0,
            "explanation": "Bei Neue Mitarbeiter einarbeiten ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du bereitest dich auf Neue Mitarbeiter einarbeiten vor.",
            "question": "Ich würde vorschlagen, dass wir ___ vorgehen.",
            "options": [
              "systematisch",
              "schnell",
              "einfach"
            ],
            "answer": "systematisch",
            "explanation": "Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "dass",
              "Ich",
              "bin",
              "überzeugt",
              "richtig",
              "wir",
              "handeln"
            ],
            "answer": [
              1,
              2,
              3,
              0,
              5,
              4,
              6
            ],
            "explanation": "Richtig: Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "quick_reaction",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Neue Mitarbeiter einarbeiten.",
            "question": "Wie reagierst du?",
            "options": [
              "Sachlich argumentieren und Beispiele nennen.",
              "Ausweichen.",
              "Die Frage zurückgeben."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "quick_reaction",
            "situation": "In einem Meeting gibt es Meinungsverschiedenheiten.",
            "question": "Wie vermittelst du?",
            "options": [
              "Ich verstehe beide Seiten. Lassen Sie uns einen Kompromiss finden.",
              "Ich sage nichts.",
              "Einer hat recht, der andere nicht."
            ],
            "answer": 0,
            "explanation": "Vermittlung ist eine wichtige Soft Skill im Beruf."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Neue Mitarbeiter einarbeiten.",
            "question": "Bei Neue Mitarbeiter einarbeiten ist strukturiertes Vorgehen ___.",
            "options": [
              "wichtig",
              "falsch",
              "schlecht"
            ],
            "answer": "wichtig",
            "explanation": "Bei Neue Mitarbeiter einarbeiten ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du bereitest dich auf Neue Mitarbeiter einarbeiten vor.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Vorgehen",
              "zeigt",
              "Professionalität",
              "Systematisches"
            ],
            "answer": [
              3,
              0,
              1,
              2
            ],
            "explanation": "Richtig: Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Ich bin überzeugt, ___ wir richtig handeln.",
            "options": [
              "dass",
              "nötig",
              "gerne"
            ],
            "answer": "dass",
            "explanation": "Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "sort_sentence",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Neue Mitarbeiter einarbeiten.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "überzeugt",
              "Beispielen",
              "mit",
              "Argumentation",
              "Sachliche"
            ],
            "answer": [
              4,
              3,
              2,
              1,
              0
            ],
            "explanation": "Richtig: Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "fill_blank",
            "situation": "In einem Meeting gibt es Meinungsverschiedenheiten.",
            "question": "Vermittlung ist eine ___ Soft Skill im Beruf.",
            "options": [
              "wichtige",
              "mache",
              "brauche"
            ],
            "answer": "wichtige",
            "explanation": "Vermittlung ist eine wichtige Soft Skill im Beruf."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Neue Mitarbeiter einarbeiten.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Strukturiert und sachlich argumentieren.",
              "Das ist nicht zielführend.",
              "Das bedarf keiner Diskussion."
            ],
            "answer": 0,
            "explanation": "Bei Neue Mitarbeiter einarbeiten ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bereitest dich auf Neue Mitarbeiter einarbeiten vor.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "systematisch",
              "Das wäre kontraproduktiv.",
              "Das bedarf keiner Diskussion."
            ],
            "answer": 0,
            "explanation": "Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich bin überzeugt dass wir richtig handeln",
              "Das ist nicht zielführend.",
              "Das halte ich für irrelevant."
            ],
            "answer": 0,
            "explanation": "Richtig: Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "quick_reaction",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Neue Mitarbeiter einarbeiten.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Sachlich argumentieren und Beispiele nennen.",
              "Das wäre kontraproduktiv.",
              "Das bedarf keiner Diskussion."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "quick_reaction",
            "situation": "In einem Meeting gibt es Meinungsverschiedenheiten.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich verstehe beide Seiten. Lassen Sie uns einen Kompromiss finden.",
              "Das ist nicht zielführend.",
              "Das wäre kontraproduktiv."
            ],
            "answer": 0,
            "explanation": "Vermittlung ist eine wichtige Soft Skill im Beruf."
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
        "wrong": "Einfach machen.",
        "correct": "Strukturiert und sachlich argumentieren.",
        "tip": "Bei Neue Mitarbeiter einarbeiten ist strukturiertes Vorgehen wichtig."
      },
      {
        "wrong": "schnell",
        "correct": "systematisch",
        "tip": "Systematisches Vorgehen zeigt Professionalität."
      },
      {
        "wrong": "Ausweichen.",
        "correct": "Sachlich argumentieren und Beispiele nennen.",
        "tip": "Sachliche Argumentation mit Beispielen überzeugt."
      }
    ]
  },
  {
    "id": "b2-24",
    "level": "B2",
    "title": "Risikomanagement",
    "titleDe": "Risiken bewerten",
    "icon": "⚡",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Risiken bewerten.",
            "question": "Wie gehst du professionell vor?",
            "options": [
              "Strukturiert und sachlich argumentieren.",
              "Einfach machen.",
              "Abwarten."
            ],
            "answer": 0,
            "explanation": "Bei Risiken bewerten ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du bereitest dich auf Risiken bewerten vor.",
            "question": "Ich würde vorschlagen, dass wir ___ vorgehen.",
            "options": [
              "systematisch",
              "schnell",
              "einfach"
            ],
            "answer": "systematisch",
            "explanation": "Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "dass",
              "Ich",
              "bin",
              "überzeugt",
              "richtig",
              "wir",
              "handeln"
            ],
            "answer": [
              1,
              2,
              3,
              0,
              5,
              4,
              6
            ],
            "explanation": "Richtig: Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "quick_reaction",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Risiken bewerten.",
            "question": "Wie reagierst du?",
            "options": [
              "Sachlich argumentieren und Beispiele nennen.",
              "Ausweichen.",
              "Die Frage zurückgeben."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "quick_reaction",
            "situation": "Du sollst eine Präsentation halten.",
            "question": "Wie bereitest du dich vor?",
            "options": [
              "Ich strukturiere die Inhalte klar und übe den Vortrag.",
              "Ich improvisiere.",
              "Ich lese alles ab."
            ],
            "answer": 0,
            "explanation": "Gute Vorbereitung ist der Schlüssel zu einer gelungenen Präsentation."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Risiken bewerten.",
            "question": "Bei Risiken ___ ist strukturiertes Vorgehen wichtig.",
            "options": [
              "bewerten",
              "schnell",
              "nehme"
            ],
            "answer": "bewerten",
            "explanation": "Bei Risiken bewerten ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du bereitest dich auf Risiken bewerten vor.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "zeigt",
              "Systematisches",
              "Professionalität",
              "Vorgehen"
            ],
            "answer": [
              1,
              3,
              0,
              2
            ],
            "explanation": "Richtig: Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Ich ___ überzeugt, dass wir richtig handeln.",
            "options": [
              "bin",
              "werde",
              "muss"
            ],
            "answer": "bin",
            "explanation": "Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "sort_sentence",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Risiken bewerten.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "mit",
              "Beispielen",
              "Sachliche",
              "Argumentation",
              "überzeugt"
            ],
            "answer": [
              2,
              3,
              0,
              1,
              4
            ],
            "explanation": "Richtig: Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "fill_blank",
            "situation": "Du sollst eine Präsentation halten.",
            "question": "Gute ___ ist der Schlüssel zu einer gelungenen Präsentation.",
            "options": [
              "Vorbereitung",
              "Lösung",
              "morgen"
            ],
            "answer": "Vorbereitung",
            "explanation": "Gute Vorbereitung ist der Schlüssel zu einer gelungenen Präsentation."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Risiken bewerten.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Strukturiert und sachlich argumentieren.",
              "Ich sehe darin keinen Mehrwert.",
              "Das übersteigt meine Kompetenzen."
            ],
            "answer": 0,
            "explanation": "Bei Risiken bewerten ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bereitest dich auf Risiken bewerten vor.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "systematisch",
              "Das bedarf keiner Diskussion.",
              "Das übersteigt meine Kompetenzen."
            ],
            "answer": 0,
            "explanation": "Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich bin überzeugt dass wir richtig handeln",
              "Das bedarf keiner Diskussion.",
              "Das halte ich für irrelevant."
            ],
            "answer": 0,
            "explanation": "Richtig: Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "quick_reaction",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Risiken bewerten.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Sachlich argumentieren und Beispiele nennen.",
              "Das halte ich für irrelevant.",
              "Das übersteigt meine Kompetenzen."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "quick_reaction",
            "situation": "Du sollst eine Präsentation halten.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich strukturiere die Inhalte klar und übe den Vortrag.",
              "Das ist nicht zielführend.",
              "Das übersteigt meine Kompetenzen."
            ],
            "answer": 0,
            "explanation": "Gute Vorbereitung ist der Schlüssel zu einer gelungenen Präsentation."
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
        "wrong": "Einfach machen.",
        "correct": "Strukturiert und sachlich argumentieren.",
        "tip": "Bei Risiken bewerten ist strukturiertes Vorgehen wichtig."
      },
      {
        "wrong": "schnell",
        "correct": "systematisch",
        "tip": "Systematisches Vorgehen zeigt Professionalität."
      },
      {
        "wrong": "Ausweichen.",
        "correct": "Sachlich argumentieren und Beispiele nennen.",
        "tip": "Sachliche Argumentation mit Beispielen überzeugt."
      }
    ]
  },
  {
    "id": "b2-25",
    "level": "B2",
    "title": "Prozessoptimierung",
    "titleDe": "Prozesse optimieren",
    "icon": "⚙️",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Prozesse optimieren.",
            "question": "Wie gehst du professionell vor?",
            "options": [
              "Strukturiert und sachlich argumentieren.",
              "Einfach machen.",
              "Abwarten."
            ],
            "answer": 0,
            "explanation": "Bei Prozesse optimieren ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du bereitest dich auf Prozesse optimieren vor.",
            "question": "Ich würde vorschlagen, dass wir ___ vorgehen.",
            "options": [
              "systematisch",
              "schnell",
              "einfach"
            ],
            "answer": "systematisch",
            "explanation": "Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "dass",
              "Ich",
              "bin",
              "überzeugt",
              "richtig",
              "wir",
              "handeln"
            ],
            "answer": [
              1,
              2,
              3,
              0,
              5,
              4,
              6
            ],
            "explanation": "Richtig: Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "quick_reaction",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Prozesse optimieren.",
            "question": "Wie reagierst du?",
            "options": [
              "Sachlich argumentieren und Beispiele nennen.",
              "Ausweichen.",
              "Die Frage zurückgeben."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "quick_reaction",
            "situation": "Ein Kunde beschwert sich.",
            "question": "Wie reagierst du professionell?",
            "options": [
              "Ich entschuldige mich und biete eine Lösung an.",
              "Das ist nicht mein Problem.",
              "Ich leite die Beschwerde weiter."
            ],
            "answer": 0,
            "explanation": "Professioneller Umgang mit Beschwerden stärkt die Kundenbindung."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Prozesse optimieren.",
            "question": "Bei ___ optimieren ist strukturiertes Vorgehen wichtig.",
            "options": [
              "Prozesse",
              "wichtig",
              "Zeit"
            ],
            "answer": "Prozesse",
            "explanation": "Bei Prozesse optimieren ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du bereitest dich auf Prozesse optimieren vor.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Professionalität",
              "zeigt",
              "Vorgehen",
              "Systematisches"
            ],
            "answer": [
              3,
              2,
              1,
              0
            ],
            "explanation": "Richtig: Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Ich bin überzeugt, dass wir ___ handeln.",
            "options": [
              "richtig",
              "schlecht",
              "falsch"
            ],
            "answer": "richtig",
            "explanation": "Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "sort_sentence",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Prozesse optimieren.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Argumentation",
              "Beispielen",
              "Sachliche",
              "überzeugt",
              "mit"
            ],
            "answer": [
              2,
              0,
              4,
              1,
              3
            ],
            "explanation": "Richtig: Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "fill_blank",
            "situation": "Ein Kunde beschwert sich.",
            "question": "Professioneller Umgang mit Beschwerden stärkt die ___.",
            "options": [
              "Kundenbindung",
              "Nummer",
              "gestern"
            ],
            "answer": "Kundenbindung",
            "explanation": "Professioneller Umgang mit Beschwerden stärkt die Kundenbindung."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Prozesse optimieren.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Strukturiert und sachlich argumentieren.",
              "Das liegt nicht in meinem Bereich.",
              "Damit befasse ich mich nicht."
            ],
            "answer": 0,
            "explanation": "Bei Prozesse optimieren ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bereitest dich auf Prozesse optimieren vor.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "systematisch",
              "Das bedarf keiner Diskussion.",
              "Das übersteigt meine Kompetenzen."
            ],
            "answer": 0,
            "explanation": "Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich bin überzeugt dass wir richtig handeln",
              "Das wäre kontraproduktiv.",
              "Ohne Informationen sage ich nichts."
            ],
            "answer": 0,
            "explanation": "Richtig: Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "quick_reaction",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Prozesse optimieren.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Sachlich argumentieren und Beispiele nennen.",
              "Das wäre kontraproduktiv.",
              "Das ist nicht zielführend."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "quick_reaction",
            "situation": "Ein Kunde beschwert sich.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich entschuldige mich und biete eine Lösung an.",
              "Das bedarf keiner Diskussion.",
              "Ich sehe darin keinen Mehrwert."
            ],
            "answer": 0,
            "explanation": "Professioneller Umgang mit Beschwerden stärkt die Kundenbindung."
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
        "wrong": "Einfach machen.",
        "correct": "Strukturiert und sachlich argumentieren.",
        "tip": "Bei Prozesse optimieren ist strukturiertes Vorgehen wichtig."
      },
      {
        "wrong": "schnell",
        "correct": "systematisch",
        "tip": "Systematisches Vorgehen zeigt Professionalität."
      },
      {
        "wrong": "Ausweichen.",
        "correct": "Sachlich argumentieren und Beispiele nennen.",
        "tip": "Sachliche Argumentation mit Beispielen überzeugt."
      }
    ]
  },
  {
    "id": "b2-26",
    "level": "B2",
    "title": "Stakeholder",
    "titleDe": "Mit Stakeholdern kommunizieren",
    "icon": "🏛️",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Mit Stakeholdern kommunizieren.",
            "question": "Wie gehst du professionell vor?",
            "options": [
              "Strukturiert und sachlich argumentieren.",
              "Einfach machen.",
              "Abwarten."
            ],
            "answer": 0,
            "explanation": "Bei Mit Stakeholdern kommunizieren ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du bereitest dich auf Mit Stakeholdern kommunizieren vor.",
            "question": "Ich würde vorschlagen, dass wir ___ vorgehen.",
            "options": [
              "systematisch",
              "schnell",
              "einfach"
            ],
            "answer": "systematisch",
            "explanation": "Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "dass",
              "Ich",
              "bin",
              "überzeugt",
              "richtig",
              "wir",
              "handeln"
            ],
            "answer": [
              1,
              2,
              3,
              0,
              5,
              4,
              6
            ],
            "explanation": "Richtig: Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "quick_reaction",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Mit Stakeholdern kommunizieren.",
            "question": "Wie reagierst du?",
            "options": [
              "Sachlich argumentieren und Beispiele nennen.",
              "Ausweichen.",
              "Die Frage zurückgeben."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "quick_reaction",
            "situation": "Du wirst zu einem Vorstellungsgespräch eingeladen.",
            "question": "Was bereitest du vor?",
            "options": [
              "Ich recherchiere das Unternehmen und bereite Antworten vor.",
              "Ich gehe einfach hin.",
              "Ich frage nach dem Gehalt."
            ],
            "answer": 0,
            "explanation": "Vorbereitung zeigt Interesse und Professionalität."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Mit Stakeholdern kommunizieren.",
            "question": "Bei Mit Stakeholdern kommunizieren ist strukturiertes ___ wichtig.",
            "options": [
              "Vorgehen",
              "langsam",
              "mache"
            ],
            "answer": "Vorgehen",
            "explanation": "Bei Mit Stakeholdern kommunizieren ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du bereitest dich auf Mit Stakeholdern kommunizieren vor.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Systematisches",
              "zeigt",
              "Vorgehen",
              "Professionalität"
            ],
            "answer": [
              0,
              2,
              1,
              3
            ],
            "explanation": "Richtig: Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Ich bin ___, dass wir richtig handeln.",
            "options": [
              "überzeugt",
              "mache",
              "leider"
            ],
            "answer": "überzeugt",
            "explanation": "Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "sort_sentence",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Mit Stakeholdern kommunizieren.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Argumentation",
              "überzeugt",
              "mit",
              "Beispielen",
              "Sachliche"
            ],
            "answer": [
              4,
              0,
              2,
              3,
              1
            ],
            "explanation": "Richtig: Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "fill_blank",
            "situation": "Du wirst zu einem Vorstellungsgespräch eingeladen.",
            "question": "Vorbereitung zeigt ___ und Professionalität.",
            "options": [
              "Interesse",
              "heute",
              "Problem"
            ],
            "answer": "Interesse",
            "explanation": "Vorbereitung zeigt Interesse und Professionalität."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Mit Stakeholdern kommunizieren.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Strukturiert und sachlich argumentieren.",
              "Das ist nicht zielführend.",
              "Ich sehe darin keinen Mehrwert."
            ],
            "answer": 0,
            "explanation": "Bei Mit Stakeholdern kommunizieren ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bereitest dich auf Mit Stakeholdern kommunizieren vor.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "systematisch",
              "Damit befasse ich mich nicht.",
              "Das ist nicht zielführend."
            ],
            "answer": 0,
            "explanation": "Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich bin überzeugt dass wir richtig handeln",
              "Darauf möchte ich nicht eingehen.",
              "Das liegt nicht in meinem Bereich."
            ],
            "answer": 0,
            "explanation": "Richtig: Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "quick_reaction",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Mit Stakeholdern kommunizieren.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Sachlich argumentieren und Beispiele nennen.",
              "Das übersteigt meine Kompetenzen.",
              "Das bedarf keiner Diskussion."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "quick_reaction",
            "situation": "Du wirst zu einem Vorstellungsgespräch eingeladen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich recherchiere das Unternehmen und bereite Antworten vor.",
              "Das wäre kontraproduktiv.",
              "Darauf möchte ich nicht eingehen."
            ],
            "answer": 0,
            "explanation": "Vorbereitung zeigt Interesse und Professionalität."
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
        "wrong": "Einfach machen.",
        "correct": "Strukturiert und sachlich argumentieren.",
        "tip": "Bei Mit Stakeholdern kommunizieren ist strukturiertes Vorgehen wichtig."
      },
      {
        "wrong": "schnell",
        "correct": "systematisch",
        "tip": "Systematisches Vorgehen zeigt Professionalität."
      },
      {
        "wrong": "Ausweichen.",
        "correct": "Sachlich argumentieren und Beispiele nennen.",
        "tip": "Sachliche Argumentation mit Beispielen überzeugt."
      }
    ]
  },
  {
    "id": "b2-27",
    "level": "B2",
    "title": "Dokumentation",
    "titleDe": "Dokumentation erstellen",
    "icon": "📁",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Dokumentation erstellen.",
            "question": "Wie gehst du professionell vor?",
            "options": [
              "Strukturiert und sachlich argumentieren.",
              "Einfach machen.",
              "Abwarten."
            ],
            "answer": 0,
            "explanation": "Bei Dokumentation erstellen ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du bereitest dich auf Dokumentation erstellen vor.",
            "question": "Ich würde vorschlagen, dass wir ___ vorgehen.",
            "options": [
              "systematisch",
              "schnell",
              "einfach"
            ],
            "answer": "systematisch",
            "explanation": "Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "dass",
              "Ich",
              "bin",
              "überzeugt",
              "richtig",
              "wir",
              "handeln"
            ],
            "answer": [
              1,
              2,
              3,
              0,
              5,
              4,
              6
            ],
            "explanation": "Richtig: Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "quick_reaction",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Dokumentation erstellen.",
            "question": "Wie reagierst du?",
            "options": [
              "Sachlich argumentieren und Beispiele nennen.",
              "Ausweichen.",
              "Die Frage zurückgeben."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "quick_reaction",
            "situation": "Du musst Überstunden machen.",
            "question": "Wie klärst du das?",
            "options": [
              "Ich frage, ob die Überstunden vergütet oder ausgeglichen werden.",
              "Ich mache sie einfach.",
              "Ich lehne ab."
            ],
            "answer": 0,
            "explanation": "Klare Kommunikation über Arbeitsbedingungen ist wichtig."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Dokumentation erstellen.",
            "question": "Bei Dokumentation ___ ist strukturiertes Vorgehen wichtig.",
            "options": [
              "erstellen",
              "Hilfe",
              "Problem"
            ],
            "answer": "erstellen",
            "explanation": "Bei Dokumentation erstellen ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du bereitest dich auf Dokumentation erstellen vor.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Professionalität",
              "Systematisches",
              "zeigt",
              "Vorgehen"
            ],
            "answer": [
              1,
              3,
              2,
              0
            ],
            "explanation": "Richtig: Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Ich bin überzeugt, dass wir richtig ___.",
            "options": [
              "handeln",
              "hier",
              "gestern"
            ],
            "answer": "handeln",
            "explanation": "Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "sort_sentence",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Dokumentation erstellen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "überzeugt",
              "Argumentation",
              "Sachliche",
              "Beispielen",
              "mit"
            ],
            "answer": [
              2,
              1,
              4,
              3,
              0
            ],
            "explanation": "Richtig: Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "fill_blank",
            "situation": "Du musst Überstunden machen.",
            "question": "Klare Kommunikation ___ Arbeitsbedingungen ist wichtig.",
            "options": [
              "über",
              "brauche",
              "bitte"
            ],
            "answer": "über",
            "explanation": "Klare Kommunikation über Arbeitsbedingungen ist wichtig."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Dokumentation erstellen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Strukturiert und sachlich argumentieren.",
              "Darauf möchte ich nicht eingehen.",
              "Das bedarf keiner Diskussion."
            ],
            "answer": 0,
            "explanation": "Bei Dokumentation erstellen ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bereitest dich auf Dokumentation erstellen vor.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "systematisch",
              "Das wurde bereits besprochen.",
              "Darauf möchte ich nicht eingehen."
            ],
            "answer": 0,
            "explanation": "Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich bin überzeugt dass wir richtig handeln",
              "Das wäre kontraproduktiv.",
              "Das halte ich für irrelevant."
            ],
            "answer": 0,
            "explanation": "Richtig: Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "quick_reaction",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Dokumentation erstellen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Sachlich argumentieren und Beispiele nennen.",
              "Das halte ich für irrelevant.",
              "Ich bin anderer Meinung."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "quick_reaction",
            "situation": "Du musst Überstunden machen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich frage, ob die Überstunden vergütet oder ausgeglichen werden.",
              "Das liegt nicht in meinem Bereich.",
              "Ich bin anderer Meinung."
            ],
            "answer": 0,
            "explanation": "Klare Kommunikation über Arbeitsbedingungen ist wichtig."
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
        "wrong": "Einfach machen.",
        "correct": "Strukturiert und sachlich argumentieren.",
        "tip": "Bei Dokumentation erstellen ist strukturiertes Vorgehen wichtig."
      },
      {
        "wrong": "schnell",
        "correct": "systematisch",
        "tip": "Systematisches Vorgehen zeigt Professionalität."
      },
      {
        "wrong": "Ausweichen.",
        "correct": "Sachlich argumentieren und Beispiele nennen.",
        "tip": "Sachliche Argumentation mit Beispielen überzeugt."
      }
    ]
  },
  {
    "id": "b2-28",
    "level": "B2",
    "title": "Qualitätsmanagement",
    "titleDe": "Qualität sichern",
    "icon": "✅",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Qualität sichern.",
            "question": "Wie gehst du professionell vor?",
            "options": [
              "Strukturiert und sachlich argumentieren.",
              "Einfach machen.",
              "Abwarten."
            ],
            "answer": 0,
            "explanation": "Bei Qualität sichern ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du bereitest dich auf Qualität sichern vor.",
            "question": "Ich würde vorschlagen, dass wir ___ vorgehen.",
            "options": [
              "systematisch",
              "schnell",
              "einfach"
            ],
            "answer": "systematisch",
            "explanation": "Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "dass",
              "Ich",
              "bin",
              "überzeugt",
              "richtig",
              "wir",
              "handeln"
            ],
            "answer": [
              1,
              2,
              3,
              0,
              5,
              4,
              6
            ],
            "explanation": "Richtig: Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "quick_reaction",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Qualität sichern.",
            "question": "Wie reagierst du?",
            "options": [
              "Sachlich argumentieren und Beispiele nennen.",
              "Ausweichen.",
              "Die Frage zurückgeben."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "quick_reaction",
            "situation": "In einem Meeting gibt es Meinungsverschiedenheiten.",
            "question": "Wie vermittelst du?",
            "options": [
              "Ich verstehe beide Seiten. Lassen Sie uns einen Kompromiss finden.",
              "Ich sage nichts.",
              "Einer hat recht, der andere nicht."
            ],
            "answer": 0,
            "explanation": "Vermittlung ist eine wichtige Soft Skill im Beruf."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Qualität sichern.",
            "question": "Bei Qualität ___ ist strukturiertes Vorgehen wichtig.",
            "options": [
              "sichern",
              "Adresse",
              "richtig"
            ],
            "answer": "sichern",
            "explanation": "Bei Qualität sichern ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du bereitest dich auf Qualität sichern vor.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Systematisches",
              "zeigt",
              "Vorgehen",
              "Professionalität"
            ],
            "answer": [
              0,
              2,
              1,
              3
            ],
            "explanation": "Richtig: Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Ich ___ überzeugt, dass wir richtig handeln.",
            "options": [
              "bin",
              "suche",
              "sage"
            ],
            "answer": "bin",
            "explanation": "Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "sort_sentence",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Qualität sichern.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "mit",
              "Beispielen",
              "Sachliche",
              "Argumentation",
              "überzeugt"
            ],
            "answer": [
              2,
              3,
              0,
              1,
              4
            ],
            "explanation": "Richtig: Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "fill_blank",
            "situation": "In einem Meeting gibt es Meinungsverschiedenheiten.",
            "question": "Vermittlung ___ eine wichtige Soft Skill im Beruf.",
            "options": [
              "ist",
              "werde",
              "Frage"
            ],
            "answer": "ist",
            "explanation": "Vermittlung ist eine wichtige Soft Skill im Beruf."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Qualität sichern.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Strukturiert und sachlich argumentieren.",
              "Das halte ich für irrelevant.",
              "Das bedarf keiner Diskussion."
            ],
            "answer": 0,
            "explanation": "Bei Qualität sichern ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bereitest dich auf Qualität sichern vor.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "systematisch",
              "Das wurde bereits besprochen.",
              "Darauf möchte ich nicht eingehen."
            ],
            "answer": 0,
            "explanation": "Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich bin überzeugt dass wir richtig handeln",
              "Darauf möchte ich nicht eingehen.",
              "Das bedarf keiner Diskussion."
            ],
            "answer": 0,
            "explanation": "Richtig: Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "quick_reaction",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Qualität sichern.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Sachlich argumentieren und Beispiele nennen.",
              "Das übersteigt meine Kompetenzen.",
              "Ich bin anderer Meinung."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "quick_reaction",
            "situation": "In einem Meeting gibt es Meinungsverschiedenheiten.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich verstehe beide Seiten. Lassen Sie uns einen Kompromiss finden.",
              "Das übersteigt meine Kompetenzen.",
              "Darauf möchte ich nicht eingehen."
            ],
            "answer": 0,
            "explanation": "Vermittlung ist eine wichtige Soft Skill im Beruf."
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
        "wrong": "Einfach machen.",
        "correct": "Strukturiert und sachlich argumentieren.",
        "tip": "Bei Qualität sichern ist strukturiertes Vorgehen wichtig."
      },
      {
        "wrong": "schnell",
        "correct": "systematisch",
        "tip": "Systematisches Vorgehen zeigt Professionalität."
      },
      {
        "wrong": "Ausweichen.",
        "correct": "Sachlich argumentieren und Beispiele nennen.",
        "tip": "Sachliche Argumentation mit Beispielen überzeugt."
      }
    ]
  },
  {
    "id": "b2-29",
    "level": "B2",
    "title": "Change Management",
    "titleDe": "Veränderungen begleiten",
    "icon": "🔄",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Veränderungen begleiten.",
            "question": "Wie gehst du professionell vor?",
            "options": [
              "Strukturiert und sachlich argumentieren.",
              "Einfach machen.",
              "Abwarten."
            ],
            "answer": 0,
            "explanation": "Bei Veränderungen begleiten ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du bereitest dich auf Veränderungen begleiten vor.",
            "question": "Ich würde vorschlagen, dass wir ___ vorgehen.",
            "options": [
              "systematisch",
              "schnell",
              "einfach"
            ],
            "answer": "systematisch",
            "explanation": "Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "dass",
              "Ich",
              "bin",
              "überzeugt",
              "richtig",
              "wir",
              "handeln"
            ],
            "answer": [
              1,
              2,
              3,
              0,
              5,
              4,
              6
            ],
            "explanation": "Richtig: Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "quick_reaction",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Veränderungen begleiten.",
            "question": "Wie reagierst du?",
            "options": [
              "Sachlich argumentieren und Beispiele nennen.",
              "Ausweichen.",
              "Die Frage zurückgeben."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "quick_reaction",
            "situation": "Du sollst eine Präsentation halten.",
            "question": "Wie bereitest du dich vor?",
            "options": [
              "Ich strukturiere die Inhalte klar und übe den Vortrag.",
              "Ich improvisiere.",
              "Ich lese alles ab."
            ],
            "answer": 0,
            "explanation": "Gute Vorbereitung ist der Schlüssel zu einer gelungenen Präsentation."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Veränderungen begleiten.",
            "question": "Bei Veränderungen begleiten ist strukturiertes ___ wichtig.",
            "options": [
              "Vorgehen",
              "soll",
              "Lösung"
            ],
            "answer": "Vorgehen",
            "explanation": "Bei Veränderungen begleiten ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du bereitest dich auf Veränderungen begleiten vor.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Vorgehen",
              "Systematisches",
              "zeigt",
              "Professionalität"
            ],
            "answer": [
              1,
              0,
              2,
              3
            ],
            "explanation": "Richtig: Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Ich bin überzeugt, dass ___ richtig handeln.",
            "options": [
              "wir",
              "jetzt",
              "komme"
            ],
            "answer": "wir",
            "explanation": "Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "sort_sentence",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Veränderungen begleiten.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Argumentation",
              "mit",
              "Sachliche",
              "Beispielen",
              "überzeugt"
            ],
            "answer": [
              2,
              0,
              1,
              3,
              4
            ],
            "explanation": "Richtig: Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "fill_blank",
            "situation": "Du sollst eine Präsentation halten.",
            "question": "Gute ___ ist der Schlüssel zu einer gelungenen Präsentation.",
            "options": [
              "Vorbereitung",
              "Lösung",
              "sage"
            ],
            "answer": "Vorbereitung",
            "explanation": "Gute Vorbereitung ist der Schlüssel zu einer gelungenen Präsentation."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Veränderungen begleiten.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Strukturiert und sachlich argumentieren.",
              "Ich sehe darin keinen Mehrwert.",
              "Ich bin anderer Meinung."
            ],
            "answer": 0,
            "explanation": "Bei Veränderungen begleiten ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bereitest dich auf Veränderungen begleiten vor.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "systematisch",
              "Das wäre kontraproduktiv.",
              "Ohne Informationen sage ich nichts."
            ],
            "answer": 0,
            "explanation": "Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich bin überzeugt dass wir richtig handeln",
              "Das wäre kontraproduktiv.",
              "Ohne Informationen sage ich nichts."
            ],
            "answer": 0,
            "explanation": "Richtig: Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "quick_reaction",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Veränderungen begleiten.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Sachlich argumentieren und Beispiele nennen.",
              "Das wurde bereits besprochen.",
              "Damit befasse ich mich nicht."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "quick_reaction",
            "situation": "Du sollst eine Präsentation halten.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich strukturiere die Inhalte klar und übe den Vortrag.",
              "Das wurde bereits besprochen.",
              "Das wäre kontraproduktiv."
            ],
            "answer": 0,
            "explanation": "Gute Vorbereitung ist der Schlüssel zu einer gelungenen Präsentation."
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
        "wrong": "Einfach machen.",
        "correct": "Strukturiert und sachlich argumentieren.",
        "tip": "Bei Veränderungen begleiten ist strukturiertes Vorgehen wichtig."
      },
      {
        "wrong": "schnell",
        "correct": "systematisch",
        "tip": "Systematisches Vorgehen zeigt Professionalität."
      },
      {
        "wrong": "Ausweichen.",
        "correct": "Sachlich argumentieren und Beispiele nennen.",
        "tip": "Sachliche Argumentation mit Beispielen überzeugt."
      }
    ]
  },
  {
    "id": "b2-30",
    "level": "B2",
    "title": "Abschlussbericht",
    "titleDe": "Einen Abschlussbericht schreiben",
    "icon": "📄",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Einen Abschlussbericht schreiben.",
            "question": "Wie gehst du professionell vor?",
            "options": [
              "Strukturiert und sachlich argumentieren.",
              "Einfach machen.",
              "Abwarten."
            ],
            "answer": 0,
            "explanation": "Bei Einen Abschlussbericht schreiben ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du bereitest dich auf Einen Abschlussbericht schreiben vor.",
            "question": "Ich würde vorschlagen, dass wir ___ vorgehen.",
            "options": [
              "systematisch",
              "schnell",
              "einfach"
            ],
            "answer": "systematisch",
            "explanation": "Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "dass",
              "Ich",
              "bin",
              "überzeugt",
              "richtig",
              "wir",
              "handeln"
            ],
            "answer": [
              1,
              2,
              3,
              0,
              5,
              4,
              6
            ],
            "explanation": "Richtig: Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "quick_reaction",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Einen Abschlussbericht schreiben.",
            "question": "Wie reagierst du?",
            "options": [
              "Sachlich argumentieren und Beispiele nennen.",
              "Ausweichen.",
              "Die Frage zurückgeben."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "quick_reaction",
            "situation": "Ein Kunde beschwert sich.",
            "question": "Wie reagierst du professionell?",
            "options": [
              "Ich entschuldige mich und biete eine Lösung an.",
              "Das ist nicht mein Problem.",
              "Ich leite die Beschwerde weiter."
            ],
            "answer": 0,
            "explanation": "Professioneller Umgang mit Beschwerden stärkt die Kundenbindung."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Einen Abschlussbericht schreiben.",
            "question": "Bei Einen ___ schreiben ist strukturiertes Vorgehen wichtig.",
            "options": [
              "Abschlussbericht",
              "darf",
              "kann"
            ],
            "answer": "Abschlussbericht",
            "explanation": "Bei Einen Abschlussbericht schreiben ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du bereitest dich auf Einen Abschlussbericht schreiben vor.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "zeigt",
              "Professionalität",
              "Systematisches",
              "Vorgehen"
            ],
            "answer": [
              2,
              3,
              0,
              1
            ],
            "explanation": "Richtig: Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Ich ___ überzeugt, dass wir richtig handeln.",
            "options": [
              "bin",
              "frage",
              "werde"
            ],
            "answer": "bin",
            "explanation": "Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "sort_sentence",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Einen Abschlussbericht schreiben.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Argumentation",
              "überzeugt",
              "Sachliche",
              "Beispielen",
              "mit"
            ],
            "answer": [
              2,
              0,
              4,
              3,
              1
            ],
            "explanation": "Richtig: Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "fill_blank",
            "situation": "Ein Kunde beschwert sich.",
            "question": "Professioneller ___ mit Beschwerden stärkt die Kundenbindung.",
            "options": [
              "Umgang",
              "sage",
              "komme"
            ],
            "answer": "Umgang",
            "explanation": "Professioneller Umgang mit Beschwerden stärkt die Kundenbindung."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Einen Abschlussbericht schreiben.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Strukturiert und sachlich argumentieren.",
              "Damit befasse ich mich nicht.",
              "Das wurde bereits besprochen."
            ],
            "answer": 0,
            "explanation": "Bei Einen Abschlussbericht schreiben ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bereitest dich auf Einen Abschlussbericht schreiben vor.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "systematisch",
              "Darauf möchte ich nicht eingehen.",
              "Das liegt nicht in meinem Bereich."
            ],
            "answer": 0,
            "explanation": "Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich bin überzeugt dass wir richtig handeln",
              "Darauf möchte ich nicht eingehen.",
              "Das wurde bereits besprochen."
            ],
            "answer": 0,
            "explanation": "Richtig: Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "quick_reaction",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Einen Abschlussbericht schreiben.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Sachlich argumentieren und Beispiele nennen.",
              "Ich bin anderer Meinung.",
              "Das liegt nicht in meinem Bereich."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "quick_reaction",
            "situation": "Ein Kunde beschwert sich.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich entschuldige mich und biete eine Lösung an.",
              "Das liegt nicht in meinem Bereich.",
              "Damit befasse ich mich nicht."
            ],
            "answer": 0,
            "explanation": "Professioneller Umgang mit Beschwerden stärkt die Kundenbindung."
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
        "wrong": "Einfach machen.",
        "correct": "Strukturiert und sachlich argumentieren.",
        "tip": "Bei Einen Abschlussbericht schreiben ist strukturiertes Vorgehen wichtig."
      },
      {
        "wrong": "schnell",
        "correct": "systematisch",
        "tip": "Systematisches Vorgehen zeigt Professionalität."
      },
      {
        "wrong": "Ausweichen.",
        "correct": "Sachlich argumentieren und Beispiele nennen.",
        "tip": "Sachliche Argumentation mit Beispielen überzeugt."
      }
    ]
  },
  {
    "id": "b2-31",
    "level": "B2",
    "title": "Interkulturalität",
    "titleDe": "Interkulturell kommunizieren",
    "icon": "🌍",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Interkulturell kommunizieren.",
            "question": "Wie gehst du professionell vor?",
            "options": [
              "Strukturiert und sachlich argumentieren.",
              "Einfach machen.",
              "Abwarten."
            ],
            "answer": 0,
            "explanation": "Bei Interkulturell kommunizieren ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du bereitest dich auf Interkulturell kommunizieren vor.",
            "question": "Ich würde vorschlagen, dass wir ___ vorgehen.",
            "options": [
              "systematisch",
              "schnell",
              "einfach"
            ],
            "answer": "systematisch",
            "explanation": "Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "dass",
              "Ich",
              "bin",
              "überzeugt",
              "richtig",
              "wir",
              "handeln"
            ],
            "answer": [
              1,
              2,
              3,
              0,
              5,
              4,
              6
            ],
            "explanation": "Richtig: Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "quick_reaction",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Interkulturell kommunizieren.",
            "question": "Wie reagierst du?",
            "options": [
              "Sachlich argumentieren und Beispiele nennen.",
              "Ausweichen.",
              "Die Frage zurückgeben."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "quick_reaction",
            "situation": "Du wirst zu einem Vorstellungsgespräch eingeladen.",
            "question": "Was bereitest du vor?",
            "options": [
              "Ich recherchiere das Unternehmen und bereite Antworten vor.",
              "Ich gehe einfach hin.",
              "Ich frage nach dem Gehalt."
            ],
            "answer": 0,
            "explanation": "Vorbereitung zeigt Interesse und Professionalität."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Interkulturell kommunizieren.",
            "question": "Bei Interkulturell kommunizieren ___ strukturiertes Vorgehen wichtig.",
            "options": [
              "ist",
              "soll",
              "jetzt"
            ],
            "answer": "ist",
            "explanation": "Bei Interkulturell kommunizieren ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du bereitest dich auf Interkulturell kommunizieren vor.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "zeigt",
              "Vorgehen",
              "Systematisches",
              "Professionalität"
            ],
            "answer": [
              2,
              1,
              0,
              3
            ],
            "explanation": "Richtig: Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Ich bin überzeugt, dass ___ richtig handeln.",
            "options": [
              "wir",
              "Zeit",
              "mache"
            ],
            "answer": "wir",
            "explanation": "Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "sort_sentence",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Interkulturell kommunizieren.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "überzeugt",
              "mit",
              "Argumentation",
              "Sachliche",
              "Beispielen"
            ],
            "answer": [
              3,
              2,
              1,
              4,
              0
            ],
            "explanation": "Richtig: Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "fill_blank",
            "situation": "Du wirst zu einem Vorstellungsgespräch eingeladen.",
            "question": "Vorbereitung zeigt Interesse und ___.",
            "options": [
              "Professionalität",
              "suche",
              "frage"
            ],
            "answer": "Professionalität",
            "explanation": "Vorbereitung zeigt Interesse und Professionalität."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Interkulturell kommunizieren.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Strukturiert und sachlich argumentieren.",
              "Das wurde bereits besprochen.",
              "Das ist nicht zielführend."
            ],
            "answer": 0,
            "explanation": "Bei Interkulturell kommunizieren ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bereitest dich auf Interkulturell kommunizieren vor.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "systematisch",
              "Das halte ich für irrelevant.",
              "Das übersteigt meine Kompetenzen."
            ],
            "answer": 0,
            "explanation": "Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich bin überzeugt dass wir richtig handeln",
              "Das wäre kontraproduktiv.",
              "Damit befasse ich mich nicht."
            ],
            "answer": 0,
            "explanation": "Richtig: Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "quick_reaction",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Interkulturell kommunizieren.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Sachlich argumentieren und Beispiele nennen.",
              "Darauf möchte ich nicht eingehen.",
              "Das wäre kontraproduktiv."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "quick_reaction",
            "situation": "Du wirst zu einem Vorstellungsgespräch eingeladen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich recherchiere das Unternehmen und bereite Antworten vor.",
              "Damit befasse ich mich nicht.",
              "Das bedarf keiner Diskussion."
            ],
            "answer": 0,
            "explanation": "Vorbereitung zeigt Interesse und Professionalität."
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
        "wrong": "Einfach machen.",
        "correct": "Strukturiert und sachlich argumentieren.",
        "tip": "Bei Interkulturell kommunizieren ist strukturiertes Vorgehen wichtig."
      },
      {
        "wrong": "schnell",
        "correct": "systematisch",
        "tip": "Systematisches Vorgehen zeigt Professionalität."
      },
      {
        "wrong": "Ausweichen.",
        "correct": "Sachlich argumentieren und Beispiele nennen.",
        "tip": "Sachliche Argumentation mit Beispielen überzeugt."
      }
    ]
  },
  {
    "id": "b2-32",
    "level": "B2",
    "title": "Datenschutz",
    "titleDe": "Datenschutz am Arbeitsplatz",
    "icon": "🔒",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Datenschutz am Arbeitsplatz.",
            "question": "Wie gehst du professionell vor?",
            "options": [
              "Strukturiert und sachlich argumentieren.",
              "Einfach machen.",
              "Abwarten."
            ],
            "answer": 0,
            "explanation": "Bei Datenschutz am Arbeitsplatz ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du bereitest dich auf Datenschutz am Arbeitsplatz vor.",
            "question": "Ich würde vorschlagen, dass wir ___ vorgehen.",
            "options": [
              "systematisch",
              "schnell",
              "einfach"
            ],
            "answer": "systematisch",
            "explanation": "Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "dass",
              "Ich",
              "bin",
              "überzeugt",
              "richtig",
              "wir",
              "handeln"
            ],
            "answer": [
              1,
              2,
              3,
              0,
              5,
              4,
              6
            ],
            "explanation": "Richtig: Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "quick_reaction",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Datenschutz am Arbeitsplatz.",
            "question": "Wie reagierst du?",
            "options": [
              "Sachlich argumentieren und Beispiele nennen.",
              "Ausweichen.",
              "Die Frage zurückgeben."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "quick_reaction",
            "situation": "Du musst Überstunden machen.",
            "question": "Wie klärst du das?",
            "options": [
              "Ich frage, ob die Überstunden vergütet oder ausgeglichen werden.",
              "Ich mache sie einfach.",
              "Ich lehne ab."
            ],
            "answer": 0,
            "explanation": "Klare Kommunikation über Arbeitsbedingungen ist wichtig."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Datenschutz am Arbeitsplatz.",
            "question": "Bei Datenschutz am Arbeitsplatz ist strukturiertes ___ wichtig.",
            "options": [
              "Vorgehen",
              "Adresse",
              "sofort"
            ],
            "answer": "Vorgehen",
            "explanation": "Bei Datenschutz am Arbeitsplatz ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du bereitest dich auf Datenschutz am Arbeitsplatz vor.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Professionalität",
              "Systematisches",
              "zeigt",
              "Vorgehen"
            ],
            "answer": [
              1,
              3,
              2,
              0
            ],
            "explanation": "Richtig: Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Ich bin überzeugt, dass ___ richtig handeln.",
            "options": [
              "wir",
              "wichtig",
              "Adresse"
            ],
            "answer": "wir",
            "explanation": "Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "sort_sentence",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Datenschutz am Arbeitsplatz.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Argumentation",
              "Sachliche",
              "mit",
              "Beispielen",
              "überzeugt"
            ],
            "answer": [
              1,
              0,
              2,
              3,
              4
            ],
            "explanation": "Richtig: Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "fill_blank",
            "situation": "Du musst Überstunden machen.",
            "question": "Klare Kommunikation über Arbeitsbedingungen ___ wichtig.",
            "options": [
              "ist",
              "Antwort",
              "soll"
            ],
            "answer": "ist",
            "explanation": "Klare Kommunikation über Arbeitsbedingungen ist wichtig."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Datenschutz am Arbeitsplatz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Strukturiert und sachlich argumentieren.",
              "Ich bin anderer Meinung.",
              "Das halte ich für irrelevant."
            ],
            "answer": 0,
            "explanation": "Bei Datenschutz am Arbeitsplatz ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bereitest dich auf Datenschutz am Arbeitsplatz vor.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "systematisch",
              "Ohne Informationen sage ich nichts.",
              "Das ist nicht zielführend."
            ],
            "answer": 0,
            "explanation": "Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich bin überzeugt dass wir richtig handeln",
              "Ohne Informationen sage ich nichts.",
              "Das ist nicht zielführend."
            ],
            "answer": 0,
            "explanation": "Richtig: Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "quick_reaction",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Datenschutz am Arbeitsplatz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Sachlich argumentieren und Beispiele nennen.",
              "Damit befasse ich mich nicht.",
              "Das ist nicht zielführend."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "quick_reaction",
            "situation": "Du musst Überstunden machen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich frage, ob die Überstunden vergütet oder ausgeglichen werden.",
              "Das übersteigt meine Kompetenzen.",
              "Darauf möchte ich nicht eingehen."
            ],
            "answer": 0,
            "explanation": "Klare Kommunikation über Arbeitsbedingungen ist wichtig."
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
        "wrong": "Einfach machen.",
        "correct": "Strukturiert und sachlich argumentieren.",
        "tip": "Bei Datenschutz am Arbeitsplatz ist strukturiertes Vorgehen wichtig."
      },
      {
        "wrong": "schnell",
        "correct": "systematisch",
        "tip": "Systematisches Vorgehen zeigt Professionalität."
      },
      {
        "wrong": "Ausweichen.",
        "correct": "Sachlich argumentieren und Beispiele nennen.",
        "tip": "Sachliche Argumentation mit Beispielen überzeugt."
      }
    ]
  },
  {
    "id": "b2-33",
    "level": "B2",
    "title": "Feedback geben",
    "titleDe": "Konstruktives Feedback geben",
    "icon": "💬",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Konstruktives Feedback geben.",
            "question": "Wie gehst du professionell vor?",
            "options": [
              "Strukturiert und sachlich argumentieren.",
              "Einfach machen.",
              "Abwarten."
            ],
            "answer": 0,
            "explanation": "Bei Konstruktives Feedback geben ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du bereitest dich auf Konstruktives Feedback geben vor.",
            "question": "Ich würde vorschlagen, dass wir ___ vorgehen.",
            "options": [
              "systematisch",
              "schnell",
              "einfach"
            ],
            "answer": "systematisch",
            "explanation": "Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "dass",
              "Ich",
              "bin",
              "überzeugt",
              "richtig",
              "wir",
              "handeln"
            ],
            "answer": [
              1,
              2,
              3,
              0,
              5,
              4,
              6
            ],
            "explanation": "Richtig: Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "quick_reaction",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Konstruktives Feedback geben.",
            "question": "Wie reagierst du?",
            "options": [
              "Sachlich argumentieren und Beispiele nennen.",
              "Ausweichen.",
              "Die Frage zurückgeben."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "quick_reaction",
            "situation": "In einem Meeting gibt es Meinungsverschiedenheiten.",
            "question": "Wie vermittelst du?",
            "options": [
              "Ich verstehe beide Seiten. Lassen Sie uns einen Kompromiss finden.",
              "Ich sage nichts.",
              "Einer hat recht, der andere nicht."
            ],
            "answer": 0,
            "explanation": "Vermittlung ist eine wichtige Soft Skill im Beruf."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Konstruktives Feedback geben.",
            "question": "Bei Konstruktives Feedback geben ist strukturiertes Vorgehen ___.",
            "options": [
              "wichtig",
              "langsam",
              "schlecht"
            ],
            "answer": "wichtig",
            "explanation": "Bei Konstruktives Feedback geben ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du bereitest dich auf Konstruktives Feedback geben vor.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Professionalität",
              "zeigt",
              "Systematisches",
              "Vorgehen"
            ],
            "answer": [
              2,
              3,
              1,
              0
            ],
            "explanation": "Richtig: Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Ich bin ___, dass wir richtig handeln.",
            "options": [
              "überzeugt",
              "werde",
              "Nummer"
            ],
            "answer": "überzeugt",
            "explanation": "Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "sort_sentence",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Konstruktives Feedback geben.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Argumentation",
              "mit",
              "überzeugt",
              "Beispielen",
              "Sachliche"
            ],
            "answer": [
              4,
              0,
              1,
              3,
              2
            ],
            "explanation": "Richtig: Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "fill_blank",
            "situation": "In einem Meeting gibt es Meinungsverschiedenheiten.",
            "question": "Vermittlung ist eine wichtige Soft ___ im Beruf.",
            "options": [
              "Skill",
              "suche",
              "Problem"
            ],
            "answer": "Skill",
            "explanation": "Vermittlung ist eine wichtige Soft Skill im Beruf."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Konstruktives Feedback geben.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Strukturiert und sachlich argumentieren.",
              "Das wäre kontraproduktiv.",
              "Darauf möchte ich nicht eingehen."
            ],
            "answer": 0,
            "explanation": "Bei Konstruktives Feedback geben ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bereitest dich auf Konstruktives Feedback geben vor.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "systematisch",
              "Darauf möchte ich nicht eingehen.",
              "Ich bin anderer Meinung."
            ],
            "answer": 0,
            "explanation": "Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich bin überzeugt dass wir richtig handeln",
              "Ohne Informationen sage ich nichts.",
              "Ich bin anderer Meinung."
            ],
            "answer": 0,
            "explanation": "Richtig: Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "quick_reaction",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Konstruktives Feedback geben.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Sachlich argumentieren und Beispiele nennen.",
              "Ohne Informationen sage ich nichts.",
              "Das bedarf keiner Diskussion."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "quick_reaction",
            "situation": "In einem Meeting gibt es Meinungsverschiedenheiten.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich verstehe beide Seiten. Lassen Sie uns einen Kompromiss finden.",
              "Das wurde bereits besprochen.",
              "Ohne Informationen sage ich nichts."
            ],
            "answer": 0,
            "explanation": "Vermittlung ist eine wichtige Soft Skill im Beruf."
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
        "wrong": "Einfach machen.",
        "correct": "Strukturiert und sachlich argumentieren.",
        "tip": "Bei Konstruktives Feedback geben ist strukturiertes Vorgehen wichtig."
      },
      {
        "wrong": "schnell",
        "correct": "systematisch",
        "tip": "Systematisches Vorgehen zeigt Professionalität."
      },
      {
        "wrong": "Ausweichen.",
        "correct": "Sachlich argumentieren und Beispiele nennen.",
        "tip": "Sachliche Argumentation mit Beispielen überzeugt."
      }
    ]
  },
  {
    "id": "b2-34",
    "level": "B2",
    "title": "Zeitmanagement",
    "titleDe": "Zeit effektiv managen",
    "icon": "⏰",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Zeit effektiv managen.",
            "question": "Wie gehst du professionell vor?",
            "options": [
              "Strukturiert und sachlich argumentieren.",
              "Einfach machen.",
              "Abwarten."
            ],
            "answer": 0,
            "explanation": "Bei Zeit effektiv managen ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du bereitest dich auf Zeit effektiv managen vor.",
            "question": "Ich würde vorschlagen, dass wir ___ vorgehen.",
            "options": [
              "systematisch",
              "schnell",
              "einfach"
            ],
            "answer": "systematisch",
            "explanation": "Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "dass",
              "Ich",
              "bin",
              "überzeugt",
              "richtig",
              "wir",
              "handeln"
            ],
            "answer": [
              1,
              2,
              3,
              0,
              5,
              4,
              6
            ],
            "explanation": "Richtig: Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "quick_reaction",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Zeit effektiv managen.",
            "question": "Wie reagierst du?",
            "options": [
              "Sachlich argumentieren und Beispiele nennen.",
              "Ausweichen.",
              "Die Frage zurückgeben."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "quick_reaction",
            "situation": "Du sollst eine Präsentation halten.",
            "question": "Wie bereitest du dich vor?",
            "options": [
              "Ich strukturiere die Inhalte klar und übe den Vortrag.",
              "Ich improvisiere.",
              "Ich lese alles ab."
            ],
            "answer": 0,
            "explanation": "Gute Vorbereitung ist der Schlüssel zu einer gelungenen Präsentation."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Zeit effektiv managen.",
            "question": "Bei Zeit effektiv managen ___ strukturiertes Vorgehen wichtig.",
            "options": [
              "ist",
              "habe",
              "bitte"
            ],
            "answer": "ist",
            "explanation": "Bei Zeit effektiv managen ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du bereitest dich auf Zeit effektiv managen vor.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "zeigt",
              "Vorgehen",
              "Systematisches",
              "Professionalität"
            ],
            "answer": [
              2,
              1,
              0,
              3
            ],
            "explanation": "Richtig: Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Ich bin ___, dass wir richtig handeln.",
            "options": [
              "überzeugt",
              "gehe",
              "schnell"
            ],
            "answer": "überzeugt",
            "explanation": "Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "sort_sentence",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Zeit effektiv managen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Argumentation",
              "mit",
              "Beispielen",
              "Sachliche",
              "überzeugt"
            ],
            "answer": [
              3,
              0,
              1,
              2,
              4
            ],
            "explanation": "Richtig: Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "fill_blank",
            "situation": "Du sollst eine Präsentation halten.",
            "question": "Gute Vorbereitung ist der Schlüssel zu einer gelungenen ___.",
            "options": [
              "Präsentation",
              "Frage",
              "nötig"
            ],
            "answer": "Präsentation",
            "explanation": "Gute Vorbereitung ist der Schlüssel zu einer gelungenen Präsentation."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Zeit effektiv managen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Strukturiert und sachlich argumentieren.",
              "Das bedarf keiner Diskussion.",
              "Ich bin anderer Meinung."
            ],
            "answer": 0,
            "explanation": "Bei Zeit effektiv managen ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bereitest dich auf Zeit effektiv managen vor.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "systematisch",
              "Das wurde bereits besprochen.",
              "Ich bin anderer Meinung."
            ],
            "answer": 0,
            "explanation": "Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich bin überzeugt dass wir richtig handeln",
              "Damit befasse ich mich nicht.",
              "Das liegt nicht in meinem Bereich."
            ],
            "answer": 0,
            "explanation": "Richtig: Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "quick_reaction",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Zeit effektiv managen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Sachlich argumentieren und Beispiele nennen.",
              "Das ist nicht zielführend.",
              "Das wäre kontraproduktiv."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "quick_reaction",
            "situation": "Du sollst eine Präsentation halten.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich strukturiere die Inhalte klar und übe den Vortrag.",
              "Das liegt nicht in meinem Bereich.",
              "Das halte ich für irrelevant."
            ],
            "answer": 0,
            "explanation": "Gute Vorbereitung ist der Schlüssel zu einer gelungenen Präsentation."
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
        "wrong": "Einfach machen.",
        "correct": "Strukturiert und sachlich argumentieren.",
        "tip": "Bei Zeit effektiv managen ist strukturiertes Vorgehen wichtig."
      },
      {
        "wrong": "schnell",
        "correct": "systematisch",
        "tip": "Systematisches Vorgehen zeigt Professionalität."
      },
      {
        "wrong": "Ausweichen.",
        "correct": "Sachlich argumentieren und Beispiele nennen.",
        "tip": "Sachliche Argumentation mit Beispielen überzeugt."
      }
    ]
  },
  {
    "id": "b2-35",
    "level": "B2",
    "title": "Konfliktlösung",
    "titleDe": "Konflikte professionell lösen",
    "icon": "🕊️",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Konflikte professionell lösen.",
            "question": "Wie gehst du professionell vor?",
            "options": [
              "Strukturiert und sachlich argumentieren.",
              "Einfach machen.",
              "Abwarten."
            ],
            "answer": 0,
            "explanation": "Bei Konflikte professionell lösen ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du bereitest dich auf Konflikte professionell lösen vor.",
            "question": "Ich würde vorschlagen, dass wir ___ vorgehen.",
            "options": [
              "systematisch",
              "schnell",
              "einfach"
            ],
            "answer": "systematisch",
            "explanation": "Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "dass",
              "Ich",
              "bin",
              "überzeugt",
              "richtig",
              "wir",
              "handeln"
            ],
            "answer": [
              1,
              2,
              3,
              0,
              5,
              4,
              6
            ],
            "explanation": "Richtig: Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "quick_reaction",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Konflikte professionell lösen.",
            "question": "Wie reagierst du?",
            "options": [
              "Sachlich argumentieren und Beispiele nennen.",
              "Ausweichen.",
              "Die Frage zurückgeben."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "quick_reaction",
            "situation": "Ein Kunde beschwert sich.",
            "question": "Wie reagierst du professionell?",
            "options": [
              "Ich entschuldige mich und biete eine Lösung an.",
              "Das ist nicht mein Problem.",
              "Ich leite die Beschwerde weiter."
            ],
            "answer": 0,
            "explanation": "Professioneller Umgang mit Beschwerden stärkt die Kundenbindung."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Konflikte professionell lösen.",
            "question": "Bei Konflikte ___ lösen ist strukturiertes Vorgehen wichtig.",
            "options": [
              "professionell",
              "Termin",
              "Arbeit"
            ],
            "answer": "professionell",
            "explanation": "Bei Konflikte professionell lösen ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du bereitest dich auf Konflikte professionell lösen vor.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Systematisches",
              "Professionalität",
              "zeigt",
              "Vorgehen"
            ],
            "answer": [
              0,
              3,
              2,
              1
            ],
            "explanation": "Richtig: Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Ich ___ überzeugt, dass wir richtig handeln.",
            "options": [
              "bin",
              "sage",
              "brauche"
            ],
            "answer": "bin",
            "explanation": "Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "sort_sentence",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Konflikte professionell lösen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "überzeugt",
              "Beispielen",
              "Sachliche",
              "Argumentation",
              "mit"
            ],
            "answer": [
              2,
              3,
              4,
              1,
              0
            ],
            "explanation": "Richtig: Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "fill_blank",
            "situation": "Ein Kunde beschwert sich.",
            "question": "Professioneller Umgang mit ___ stärkt die Kundenbindung.",
            "options": [
              "Beschwerden",
              "Zeit",
              "bin"
            ],
            "answer": "Beschwerden",
            "explanation": "Professioneller Umgang mit Beschwerden stärkt die Kundenbindung."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Konflikte professionell lösen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Strukturiert und sachlich argumentieren.",
              "Das bedarf keiner Diskussion.",
              "Das wurde bereits besprochen."
            ],
            "answer": 0,
            "explanation": "Bei Konflikte professionell lösen ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bereitest dich auf Konflikte professionell lösen vor.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "systematisch",
              "Das wurde bereits besprochen.",
              "Das wäre kontraproduktiv."
            ],
            "answer": 0,
            "explanation": "Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich bin überzeugt dass wir richtig handeln",
              "Das liegt nicht in meinem Bereich.",
              "Damit befasse ich mich nicht."
            ],
            "answer": 0,
            "explanation": "Richtig: Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "quick_reaction",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Konflikte professionell lösen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Sachlich argumentieren und Beispiele nennen.",
              "Darauf möchte ich nicht eingehen.",
              "Ich sehe darin keinen Mehrwert."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "quick_reaction",
            "situation": "Ein Kunde beschwert sich.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich entschuldige mich und biete eine Lösung an.",
              "Das übersteigt meine Kompetenzen.",
              "Das wurde bereits besprochen."
            ],
            "answer": 0,
            "explanation": "Professioneller Umgang mit Beschwerden stärkt die Kundenbindung."
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
        "wrong": "Einfach machen.",
        "correct": "Strukturiert und sachlich argumentieren.",
        "tip": "Bei Konflikte professionell lösen ist strukturiertes Vorgehen wichtig."
      },
      {
        "wrong": "schnell",
        "correct": "systematisch",
        "tip": "Systematisches Vorgehen zeigt Professionalität."
      },
      {
        "wrong": "Ausweichen.",
        "correct": "Sachlich argumentieren und Beispiele nennen.",
        "tip": "Sachliche Argumentation mit Beispielen überzeugt."
      }
    ]
  },
  {
    "id": "b2-36",
    "level": "B2",
    "title": "Geschäftsreise",
    "titleDe": "Eine Geschäftsreise planen",
    "icon": "🧳",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Eine Geschäftsreise planen.",
            "question": "Wie gehst du professionell vor?",
            "options": [
              "Strukturiert und sachlich argumentieren.",
              "Einfach machen.",
              "Abwarten."
            ],
            "answer": 0,
            "explanation": "Bei Eine Geschäftsreise planen ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du bereitest dich auf Eine Geschäftsreise planen vor.",
            "question": "Ich würde vorschlagen, dass wir ___ vorgehen.",
            "options": [
              "systematisch",
              "schnell",
              "einfach"
            ],
            "answer": "systematisch",
            "explanation": "Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "dass",
              "Ich",
              "bin",
              "überzeugt",
              "richtig",
              "wir",
              "handeln"
            ],
            "answer": [
              1,
              2,
              3,
              0,
              5,
              4,
              6
            ],
            "explanation": "Richtig: Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "quick_reaction",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Eine Geschäftsreise planen.",
            "question": "Wie reagierst du?",
            "options": [
              "Sachlich argumentieren und Beispiele nennen.",
              "Ausweichen.",
              "Die Frage zurückgeben."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "quick_reaction",
            "situation": "Du wirst zu einem Vorstellungsgespräch eingeladen.",
            "question": "Was bereitest du vor?",
            "options": [
              "Ich recherchiere das Unternehmen und bereite Antworten vor.",
              "Ich gehe einfach hin.",
              "Ich frage nach dem Gehalt."
            ],
            "answer": 0,
            "explanation": "Vorbereitung zeigt Interesse und Professionalität."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Eine Geschäftsreise planen.",
            "question": "Bei Eine Geschäftsreise planen ist strukturiertes ___ wichtig.",
            "options": [
              "Vorgehen",
              "Name",
              "gleich"
            ],
            "answer": "Vorgehen",
            "explanation": "Bei Eine Geschäftsreise planen ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du bereitest dich auf Eine Geschäftsreise planen vor.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Systematisches",
              "Professionalität",
              "Vorgehen",
              "zeigt"
            ],
            "answer": [
              0,
              2,
              3,
              1
            ],
            "explanation": "Richtig: Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Ich bin überzeugt, dass wir ___ handeln.",
            "options": [
              "richtig",
              "schlecht",
              "langsam"
            ],
            "answer": "richtig",
            "explanation": "Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "sort_sentence",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Eine Geschäftsreise planen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sachliche",
              "mit",
              "überzeugt",
              "Argumentation",
              "Beispielen"
            ],
            "answer": [
              0,
              3,
              1,
              4,
              2
            ],
            "explanation": "Richtig: Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "fill_blank",
            "situation": "Du wirst zu einem Vorstellungsgespräch eingeladen.",
            "question": "Vorbereitung zeigt Interesse ___ Professionalität.",
            "options": [
              "und",
              "kann",
              "falsch"
            ],
            "answer": "und",
            "explanation": "Vorbereitung zeigt Interesse und Professionalität."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Eine Geschäftsreise planen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Strukturiert und sachlich argumentieren.",
              "Das übersteigt meine Kompetenzen.",
              "Darauf möchte ich nicht eingehen."
            ],
            "answer": 0,
            "explanation": "Bei Eine Geschäftsreise planen ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bereitest dich auf Eine Geschäftsreise planen vor.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "systematisch",
              "Das wurde bereits besprochen.",
              "Ohne Informationen sage ich nichts."
            ],
            "answer": 0,
            "explanation": "Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich bin überzeugt dass wir richtig handeln",
              "Ich bin anderer Meinung.",
              "Das übersteigt meine Kompetenzen."
            ],
            "answer": 0,
            "explanation": "Richtig: Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "quick_reaction",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Eine Geschäftsreise planen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Sachlich argumentieren und Beispiele nennen.",
              "Ohne Informationen sage ich nichts.",
              "Das ist nicht zielführend."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "quick_reaction",
            "situation": "Du wirst zu einem Vorstellungsgespräch eingeladen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich recherchiere das Unternehmen und bereite Antworten vor.",
              "Das halte ich für irrelevant.",
              "Das übersteigt meine Kompetenzen."
            ],
            "answer": 0,
            "explanation": "Vorbereitung zeigt Interesse und Professionalität."
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
        "wrong": "Einfach machen.",
        "correct": "Strukturiert und sachlich argumentieren.",
        "tip": "Bei Eine Geschäftsreise planen ist strukturiertes Vorgehen wichtig."
      },
      {
        "wrong": "schnell",
        "correct": "systematisch",
        "tip": "Systematisches Vorgehen zeigt Professionalität."
      },
      {
        "wrong": "Ausweichen.",
        "correct": "Sachlich argumentieren und Beispiele nennen.",
        "tip": "Sachliche Argumentation mit Beispielen überzeugt."
      }
    ]
  },
  {
    "id": "b2-37",
    "level": "B2",
    "title": "Digitalisierung",
    "titleDe": "Digitalisierung im Büro",
    "icon": "💻",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Digitalisierung im Büro.",
            "question": "Wie gehst du professionell vor?",
            "options": [
              "Strukturiert und sachlich argumentieren.",
              "Einfach machen.",
              "Abwarten."
            ],
            "answer": 0,
            "explanation": "Bei Digitalisierung im Büro ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du bereitest dich auf Digitalisierung im Büro vor.",
            "question": "Ich würde vorschlagen, dass wir ___ vorgehen.",
            "options": [
              "systematisch",
              "schnell",
              "einfach"
            ],
            "answer": "systematisch",
            "explanation": "Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "dass",
              "Ich",
              "bin",
              "überzeugt",
              "richtig",
              "wir",
              "handeln"
            ],
            "answer": [
              1,
              2,
              3,
              0,
              5,
              4,
              6
            ],
            "explanation": "Richtig: Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "quick_reaction",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Digitalisierung im Büro.",
            "question": "Wie reagierst du?",
            "options": [
              "Sachlich argumentieren und Beispiele nennen.",
              "Ausweichen.",
              "Die Frage zurückgeben."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "quick_reaction",
            "situation": "Du musst Überstunden machen.",
            "question": "Wie klärst du das?",
            "options": [
              "Ich frage, ob die Überstunden vergütet oder ausgeglichen werden.",
              "Ich mache sie einfach.",
              "Ich lehne ab."
            ],
            "answer": 0,
            "explanation": "Klare Kommunikation über Arbeitsbedingungen ist wichtig."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Digitalisierung im Büro.",
            "question": "Bei Digitalisierung im ___ ist strukturiertes Vorgehen wichtig.",
            "options": [
              "Büro",
              "nehme",
              "kann"
            ],
            "answer": "Büro",
            "explanation": "Bei Digitalisierung im Büro ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du bereitest dich auf Digitalisierung im Büro vor.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "zeigt",
              "Professionalität",
              "Systematisches",
              "Vorgehen"
            ],
            "answer": [
              2,
              3,
              0,
              1
            ],
            "explanation": "Richtig: Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Ich ___ überzeugt, dass wir richtig handeln.",
            "options": [
              "bin",
              "nehme",
              "suche"
            ],
            "answer": "bin",
            "explanation": "Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "sort_sentence",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Digitalisierung im Büro.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sachliche",
              "Beispielen",
              "überzeugt",
              "mit",
              "Argumentation"
            ],
            "answer": [
              0,
              4,
              3,
              1,
              2
            ],
            "explanation": "Richtig: Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "fill_blank",
            "situation": "Du musst Überstunden machen.",
            "question": "Klare Kommunikation über Arbeitsbedingungen ist ___.",
            "options": [
              "wichtig",
              "schnell",
              "möglich"
            ],
            "answer": "wichtig",
            "explanation": "Klare Kommunikation über Arbeitsbedingungen ist wichtig."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Digitalisierung im Büro.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Strukturiert und sachlich argumentieren.",
              "Darauf möchte ich nicht eingehen.",
              "Damit befasse ich mich nicht."
            ],
            "answer": 0,
            "explanation": "Bei Digitalisierung im Büro ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bereitest dich auf Digitalisierung im Büro vor.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "systematisch",
              "Das halte ich für irrelevant.",
              "Ich sehe darin keinen Mehrwert."
            ],
            "answer": 0,
            "explanation": "Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich bin überzeugt dass wir richtig handeln",
              "Das bedarf keiner Diskussion.",
              "Das liegt nicht in meinem Bereich."
            ],
            "answer": 0,
            "explanation": "Richtig: Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "quick_reaction",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Digitalisierung im Büro.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Sachlich argumentieren und Beispiele nennen.",
              "Das ist nicht zielführend.",
              "Das liegt nicht in meinem Bereich."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "quick_reaction",
            "situation": "Du musst Überstunden machen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich frage, ob die Überstunden vergütet oder ausgeglichen werden.",
              "Das übersteigt meine Kompetenzen.",
              "Das liegt nicht in meinem Bereich."
            ],
            "answer": 0,
            "explanation": "Klare Kommunikation über Arbeitsbedingungen ist wichtig."
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
        "wrong": "Einfach machen.",
        "correct": "Strukturiert und sachlich argumentieren.",
        "tip": "Bei Digitalisierung im Büro ist strukturiertes Vorgehen wichtig."
      },
      {
        "wrong": "schnell",
        "correct": "systematisch",
        "tip": "Systematisches Vorgehen zeigt Professionalität."
      },
      {
        "wrong": "Ausweichen.",
        "correct": "Sachlich argumentieren und Beispiele nennen.",
        "tip": "Sachliche Argumentation mit Beispielen überzeugt."
      }
    ]
  },
  {
    "id": "b2-38",
    "level": "B2",
    "title": "Nachhaltigkeit",
    "titleDe": "Nachhaltigkeit im Unternehmen",
    "icon": "🌱",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Nachhaltigkeit im Unternehmen.",
            "question": "Wie gehst du professionell vor?",
            "options": [
              "Strukturiert und sachlich argumentieren.",
              "Einfach machen.",
              "Abwarten."
            ],
            "answer": 0,
            "explanation": "Bei Nachhaltigkeit im Unternehmen ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du bereitest dich auf Nachhaltigkeit im Unternehmen vor.",
            "question": "Ich würde vorschlagen, dass wir ___ vorgehen.",
            "options": [
              "systematisch",
              "schnell",
              "einfach"
            ],
            "answer": "systematisch",
            "explanation": "Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "dass",
              "Ich",
              "bin",
              "überzeugt",
              "richtig",
              "wir",
              "handeln"
            ],
            "answer": [
              1,
              2,
              3,
              0,
              5,
              4,
              6
            ],
            "explanation": "Richtig: Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "quick_reaction",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Nachhaltigkeit im Unternehmen.",
            "question": "Wie reagierst du?",
            "options": [
              "Sachlich argumentieren und Beispiele nennen.",
              "Ausweichen.",
              "Die Frage zurückgeben."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "quick_reaction",
            "situation": "In einem Meeting gibt es Meinungsverschiedenheiten.",
            "question": "Wie vermittelst du?",
            "options": [
              "Ich verstehe beide Seiten. Lassen Sie uns einen Kompromiss finden.",
              "Ich sage nichts.",
              "Einer hat recht, der andere nicht."
            ],
            "answer": 0,
            "explanation": "Vermittlung ist eine wichtige Soft Skill im Beruf."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Nachhaltigkeit im Unternehmen.",
            "question": "Bei Nachhaltigkeit im Unternehmen ist strukturiertes ___ wichtig.",
            "options": [
              "Vorgehen",
              "möglich",
              "Hilfe"
            ],
            "answer": "Vorgehen",
            "explanation": "Bei Nachhaltigkeit im Unternehmen ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du bereitest dich auf Nachhaltigkeit im Unternehmen vor.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Professionalität",
              "Vorgehen",
              "Systematisches",
              "zeigt"
            ],
            "answer": [
              2,
              1,
              3,
              0
            ],
            "explanation": "Richtig: Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Ich bin überzeugt, dass wir richtig ___.",
            "options": [
              "handeln",
              "bitte",
              "soll"
            ],
            "answer": "handeln",
            "explanation": "Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "sort_sentence",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Nachhaltigkeit im Unternehmen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "überzeugt",
              "Beispielen",
              "Argumentation",
              "Sachliche",
              "mit"
            ],
            "answer": [
              3,
              2,
              4,
              1,
              0
            ],
            "explanation": "Richtig: Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "fill_blank",
            "situation": "In einem Meeting gibt es Meinungsverschiedenheiten.",
            "question": "Vermittlung ist ___ wichtige Soft Skill im Beruf.",
            "options": [
              "eine",
              "schnell",
              "gleich"
            ],
            "answer": "eine",
            "explanation": "Vermittlung ist eine wichtige Soft Skill im Beruf."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Nachhaltigkeit im Unternehmen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Strukturiert und sachlich argumentieren.",
              "Ich sehe darin keinen Mehrwert.",
              "Das wäre kontraproduktiv."
            ],
            "answer": 0,
            "explanation": "Bei Nachhaltigkeit im Unternehmen ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bereitest dich auf Nachhaltigkeit im Unternehmen vor.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "systematisch",
              "Damit befasse ich mich nicht.",
              "Ich sehe darin keinen Mehrwert."
            ],
            "answer": 0,
            "explanation": "Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich bin überzeugt dass wir richtig handeln",
              "Damit befasse ich mich nicht.",
              "Ich sehe darin keinen Mehrwert."
            ],
            "answer": 0,
            "explanation": "Richtig: Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "quick_reaction",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Nachhaltigkeit im Unternehmen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Sachlich argumentieren und Beispiele nennen.",
              "Das wurde bereits besprochen.",
              "Damit befasse ich mich nicht."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "quick_reaction",
            "situation": "In einem Meeting gibt es Meinungsverschiedenheiten.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich verstehe beide Seiten. Lassen Sie uns einen Kompromiss finden.",
              "Ich bin anderer Meinung.",
              "Ohne Informationen sage ich nichts."
            ],
            "answer": 0,
            "explanation": "Vermittlung ist eine wichtige Soft Skill im Beruf."
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
        "wrong": "Einfach machen.",
        "correct": "Strukturiert und sachlich argumentieren.",
        "tip": "Bei Nachhaltigkeit im Unternehmen ist strukturiertes Vorgehen wichtig."
      },
      {
        "wrong": "schnell",
        "correct": "systematisch",
        "tip": "Systematisches Vorgehen zeigt Professionalität."
      },
      {
        "wrong": "Ausweichen.",
        "correct": "Sachlich argumentieren und Beispiele nennen.",
        "tip": "Sachliche Argumentation mit Beispielen überzeugt."
      }
    ]
  },
  {
    "id": "b2-39",
    "level": "B2",
    "title": "Unternehmenskultur",
    "titleDe": "Unternehmenskultur verstehen",
    "icon": "🏢",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Unternehmenskultur verstehen.",
            "question": "Wie gehst du professionell vor?",
            "options": [
              "Strukturiert und sachlich argumentieren.",
              "Einfach machen.",
              "Abwarten."
            ],
            "answer": 0,
            "explanation": "Bei Unternehmenskultur verstehen ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du bereitest dich auf Unternehmenskultur verstehen vor.",
            "question": "Ich würde vorschlagen, dass wir ___ vorgehen.",
            "options": [
              "systematisch",
              "schnell",
              "einfach"
            ],
            "answer": "systematisch",
            "explanation": "Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "dass",
              "Ich",
              "bin",
              "überzeugt",
              "richtig",
              "wir",
              "handeln"
            ],
            "answer": [
              1,
              2,
              3,
              0,
              5,
              4,
              6
            ],
            "explanation": "Richtig: Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "quick_reaction",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Unternehmenskultur verstehen.",
            "question": "Wie reagierst du?",
            "options": [
              "Sachlich argumentieren und Beispiele nennen.",
              "Ausweichen.",
              "Die Frage zurückgeben."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "quick_reaction",
            "situation": "Du sollst eine Präsentation halten.",
            "question": "Wie bereitest du dich vor?",
            "options": [
              "Ich strukturiere die Inhalte klar und übe den Vortrag.",
              "Ich improvisiere.",
              "Ich lese alles ab."
            ],
            "answer": 0,
            "explanation": "Gute Vorbereitung ist der Schlüssel zu einer gelungenen Präsentation."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Unternehmenskultur verstehen.",
            "question": "Bei ___ verstehen ist strukturiertes Vorgehen wichtig.",
            "options": [
              "Unternehmenskultur",
              "gleich",
              "dort"
            ],
            "answer": "Unternehmenskultur",
            "explanation": "Bei Unternehmenskultur verstehen ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du bereitest dich auf Unternehmenskultur verstehen vor.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "zeigt",
              "Professionalität",
              "Vorgehen",
              "Systematisches"
            ],
            "answer": [
              3,
              2,
              0,
              1
            ],
            "explanation": "Richtig: Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Ich bin überzeugt, dass wir richtig ___.",
            "options": [
              "handeln",
              "mache",
              "heute"
            ],
            "answer": "handeln",
            "explanation": "Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "sort_sentence",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Unternehmenskultur verstehen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "überzeugt",
              "mit",
              "Beispielen",
              "Argumentation",
              "Sachliche"
            ],
            "answer": [
              4,
              3,
              1,
              2,
              0
            ],
            "explanation": "Richtig: Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "fill_blank",
            "situation": "Du sollst eine Präsentation halten.",
            "question": "Gute Vorbereitung ist der Schlüssel zu einer ___ Präsentation.",
            "options": [
              "gelungenen",
              "danke",
              "jetzt"
            ],
            "answer": "gelungenen",
            "explanation": "Gute Vorbereitung ist der Schlüssel zu einer gelungenen Präsentation."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Unternehmenskultur verstehen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Strukturiert und sachlich argumentieren.",
              "Das wurde bereits besprochen.",
              "Ich bin anderer Meinung."
            ],
            "answer": 0,
            "explanation": "Bei Unternehmenskultur verstehen ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bereitest dich auf Unternehmenskultur verstehen vor.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "systematisch",
              "Ich bin anderer Meinung.",
              "Das bedarf keiner Diskussion."
            ],
            "answer": 0,
            "explanation": "Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich bin überzeugt dass wir richtig handeln",
              "Das liegt nicht in meinem Bereich.",
              "Das wurde bereits besprochen."
            ],
            "answer": 0,
            "explanation": "Richtig: Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "quick_reaction",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Unternehmenskultur verstehen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Sachlich argumentieren und Beispiele nennen.",
              "Ich sehe darin keinen Mehrwert.",
              "Das liegt nicht in meinem Bereich."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "quick_reaction",
            "situation": "Du sollst eine Präsentation halten.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich strukturiere die Inhalte klar und übe den Vortrag.",
              "Das wurde bereits besprochen.",
              "Damit befasse ich mich nicht."
            ],
            "answer": 0,
            "explanation": "Gute Vorbereitung ist der Schlüssel zu einer gelungenen Präsentation."
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
        "wrong": "Einfach machen.",
        "correct": "Strukturiert und sachlich argumentieren.",
        "tip": "Bei Unternehmenskultur verstehen ist strukturiertes Vorgehen wichtig."
      },
      {
        "wrong": "schnell",
        "correct": "systematisch",
        "tip": "Systematisches Vorgehen zeigt Professionalität."
      },
      {
        "wrong": "Ausweichen.",
        "correct": "Sachlich argumentieren und Beispiele nennen.",
        "tip": "Sachliche Argumentation mit Beispielen überzeugt."
      }
    ]
  },
  {
    "id": "b2-40",
    "level": "B2",
    "title": "Karriereplanung",
    "titleDe": "Karriere planen",
    "icon": "🎯",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Karriere planen.",
            "question": "Wie gehst du professionell vor?",
            "options": [
              "Strukturiert und sachlich argumentieren.",
              "Einfach machen.",
              "Abwarten."
            ],
            "answer": 0,
            "explanation": "Bei Karriere planen ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du bereitest dich auf Karriere planen vor.",
            "question": "Ich würde vorschlagen, dass wir ___ vorgehen.",
            "options": [
              "systematisch",
              "schnell",
              "einfach"
            ],
            "answer": "systematisch",
            "explanation": "Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "dass",
              "Ich",
              "bin",
              "überzeugt",
              "richtig",
              "wir",
              "handeln"
            ],
            "answer": [
              1,
              2,
              3,
              0,
              5,
              4,
              6
            ],
            "explanation": "Richtig: Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "quick_reaction",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Karriere planen.",
            "question": "Wie reagierst du?",
            "options": [
              "Sachlich argumentieren und Beispiele nennen.",
              "Ausweichen.",
              "Die Frage zurückgeben."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "quick_reaction",
            "situation": "Ein Kunde beschwert sich.",
            "question": "Wie reagierst du professionell?",
            "options": [
              "Ich entschuldige mich und biete eine Lösung an.",
              "Das ist nicht mein Problem.",
              "Ich leite die Beschwerde weiter."
            ],
            "answer": 0,
            "explanation": "Professioneller Umgang mit Beschwerden stärkt die Kundenbindung."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Karriere planen.",
            "question": "Bei Karriere planen ist strukturiertes ___ wichtig.",
            "options": [
              "Vorgehen",
              "morgen",
              "Arbeit"
            ],
            "answer": "Vorgehen",
            "explanation": "Bei Karriere planen ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du bereitest dich auf Karriere planen vor.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "zeigt",
              "Vorgehen",
              "Professionalität",
              "Systematisches"
            ],
            "answer": [
              3,
              1,
              0,
              2
            ],
            "explanation": "Richtig: Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Ich bin überzeugt, dass wir ___ handeln.",
            "options": [
              "richtig",
              "nötig",
              "falsch"
            ],
            "answer": "richtig",
            "explanation": "Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "sort_sentence",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Karriere planen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "mit",
              "Argumentation",
              "überzeugt",
              "Beispielen",
              "Sachliche"
            ],
            "answer": [
              4,
              1,
              0,
              3,
              2
            ],
            "explanation": "Richtig: Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "fill_blank",
            "situation": "Ein Kunde beschwert sich.",
            "question": "Professioneller Umgang mit ___ stärkt die Kundenbindung.",
            "options": [
              "Beschwerden",
              "gestern",
              "Problem"
            ],
            "answer": "Beschwerden",
            "explanation": "Professioneller Umgang mit Beschwerden stärkt die Kundenbindung."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Karriere planen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Strukturiert und sachlich argumentieren.",
              "Das wurde bereits besprochen.",
              "Das wäre kontraproduktiv."
            ],
            "answer": 0,
            "explanation": "Bei Karriere planen ist strukturiertes Vorgehen wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bereitest dich auf Karriere planen vor.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "systematisch",
              "Damit befasse ich mich nicht.",
              "Das wäre kontraproduktiv."
            ],
            "answer": 0,
            "explanation": "Systematisches Vorgehen zeigt Professionalität."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen komplexen Satz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich bin überzeugt dass wir richtig handeln",
              "Das wurde bereits besprochen.",
              "Ich sehe darin keinen Mehrwert."
            ],
            "answer": 0,
            "explanation": "Richtig: Ich bin überzeugt, dass wir richtig handeln."
          },
          {
            "type": "quick_reaction",
            "situation": "Man stellt dir eine schwierige Frage zum Thema Karriere planen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Sachlich argumentieren und Beispiele nennen.",
              "Das übersteigt meine Kompetenzen.",
              "Ohne Informationen sage ich nichts."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation mit Beispielen überzeugt."
          },
          {
            "type": "quick_reaction",
            "situation": "Ein Kunde beschwert sich.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich entschuldige mich und biete eine Lösung an.",
              "Ich sehe darin keinen Mehrwert.",
              "Das halte ich für irrelevant."
            ],
            "answer": 0,
            "explanation": "Professioneller Umgang mit Beschwerden stärkt die Kundenbindung."
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
        "wrong": "Einfach machen.",
        "correct": "Strukturiert und sachlich argumentieren.",
        "tip": "Bei Karriere planen ist strukturiertes Vorgehen wichtig."
      },
      {
        "wrong": "schnell",
        "correct": "systematisch",
        "tip": "Systematisches Vorgehen zeigt Professionalität."
      },
      {
        "wrong": "Ausweichen.",
        "correct": "Sachlich argumentieren und Beispiele nennen.",
        "tip": "Sachliche Argumentation mit Beispielen überzeugt."
      }
    ]
  }
];
