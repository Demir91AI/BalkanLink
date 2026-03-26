import type { Lesson } from "./types";

export const lessonsB1: Lesson[] = [
  {
    "id": "b1-01",
    "level": "B1",
    "title": "Telefongespräch",
    "titleDe": "Am Telefon (formell)",
    "icon": "📞",
    "premium": false,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Du rufst bei einer Behörde an.",
            "question": "Wie meldest du dich am Telefon?",
            "options": [
              "Guten Tag, mein Name ist Meier. Ich rufe wegen meiner Anmeldung an.",
              "Hallo? Ich brauche Hilfe!",
              "Sprechen Sie Bosnisch?"
            ],
            "answer": 0,
            "explanation": "Formelle Begrüßung + Grund des Anrufs ist Standard."
          },
          {
            "type": "fill_blank",
            "situation": "Du willst einen Termin vereinbaren.",
            "question": "Könnte ich bitte einen Termin ___?",
            "options": [
              "vereinbaren",
              "machen",
              "haben"
            ],
            "answer": "vereinbaren",
            "explanation": "Einen Termin vereinbaren ist die formelle Wendung."
          },
          {
            "type": "sort_sentence",
            "situation": "Du buchstabierst deinen Namen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "buchstabieren",
              "Soll",
              "den",
              "ich",
              "Namen"
            ],
            "answer": [
              1,
              3,
              2,
              4,
              0
            ],
            "explanation": "Richtig: Soll ich den Namen buchstabieren?"
          },
          {
            "type": "quick_reaction",
            "situation": "Die Person sagt: Einen Moment bitte, ich verbinde Sie.",
            "question": "Was sagst du?",
            "options": [
              "Danke, ich warte.",
              "Bitte schnell!",
              "Ich rufe später an."
            ],
            "answer": 0,
            "explanation": "Höflich warten ist die richtige Reaktion."
          },
          {
            "type": "multiple_choice",
            "situation": "Du hast etwas nicht verstanden.",
            "question": "Was sagst du?",
            "options": [
              "Entschuldigung, könnten Sie das bitte wiederholen?",
              "Was? Nochmal!",
              "Ich verstehe kein Deutsch."
            ],
            "answer": 0,
            "explanation": "Höflich um Wiederholung bitten."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Du rufst bei einer Behörde an.",
            "question": "Formelle Begrüßung + Grund des Anrufs ___ Standard.",
            "options": [
              "ist",
              "Termin",
              "morgen"
            ],
            "answer": "ist",
            "explanation": "Formelle Begrüßung + Grund des Anrufs ist Standard."
          },
          {
            "type": "sort_sentence",
            "situation": "Du willst einen Termin vereinbaren.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "vereinbaren",
              "ist",
              "Wendung",
              "Termin",
              "Einen",
              "die",
              "formelle"
            ],
            "answer": [
              4,
              3,
              0,
              1,
              5,
              6,
              2
            ],
            "explanation": "Richtig: Einen Termin vereinbaren ist die formelle Wendung."
          },
          {
            "type": "fill_blank",
            "situation": "Du buchstabierst deinen Namen.",
            "question": "Soll ich den ___ buchstabieren?",
            "options": [
              "Namen",
              "Lösung",
              "möglich"
            ],
            "answer": "Namen",
            "explanation": "Soll ich den Namen buchstabieren?"
          },
          {
            "type": "sort_sentence",
            "situation": "Die Person sagt: Einen Moment bitte, ich verbinde Sie.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Höflich",
              "die",
              "Reaktion",
              "richtige",
              "warten",
              "ist"
            ],
            "answer": [
              0,
              4,
              5,
              1,
              3,
              2
            ],
            "explanation": "Richtig: Höflich warten ist die richtige Reaktion."
          },
          {
            "type": "fill_blank",
            "situation": "Du hast etwas nicht verstanden.",
            "question": "Höflich um ___ bitten.",
            "options": [
              "Wiederholung",
              "werde",
              "möchte"
            ],
            "answer": "Wiederholung",
            "explanation": "Höflich um Wiederholung bitten."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Du rufst bei einer Behörde an.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Guten Tag, mein Name ist Meier. Ich rufe wegen meiner Anmeldung an.",
              "Kein Bedarf.",
              "Das interessiert mich nicht."
            ],
            "answer": 0,
            "explanation": "Formelle Begrüßung + Grund des Anrufs ist Standard."
          },
          {
            "type": "quick_reaction",
            "situation": "Du willst einen Termin vereinbaren.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "vereinbaren",
              "Das sehe ich anders.",
              "Keine Kommentare."
            ],
            "answer": 0,
            "explanation": "Einen Termin vereinbaren ist die formelle Wendung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du buchstabierst deinen Namen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Soll ich den Namen buchstabieren",
              "Das sehe ich anders.",
              "Ich lehne das ab."
            ],
            "answer": 0,
            "explanation": "Richtig: Soll ich den Namen buchstabieren?"
          },
          {
            "type": "quick_reaction",
            "situation": "Die Person sagt: Einen Moment bitte, ich verbinde Sie.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Danke, ich warte.",
              "Das wurde schon besprochen.",
              "Keine Kommentare."
            ],
            "answer": 0,
            "explanation": "Höflich warten ist die richtige Reaktion."
          },
          {
            "type": "quick_reaction",
            "situation": "Du hast etwas nicht verstanden.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Entschuldigung, könnten Sie das bitte wiederholen?",
              "Ich lehne das ab.",
              "Das interessiert mich nicht."
            ],
            "answer": 0,
            "explanation": "Höflich um Wiederholung bitten."
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
        "wrong": "Hallo? Ich brauche Hilfe!",
        "correct": "Guten Tag, mein Name ist Meier. Ich rufe wegen meiner Anmeldung an.",
        "tip": "Formelle Begrüßung + Grund des Anrufs ist Standard."
      },
      {
        "wrong": "machen",
        "correct": "vereinbaren",
        "tip": "Einen Termin vereinbaren ist die formelle Wendung."
      },
      {
        "wrong": "Bitte schnell!",
        "correct": "Danke, ich warte.",
        "tip": "Höflich warten ist die richtige Reaktion."
      }
    ]
  },
  {
    "id": "b1-02",
    "level": "B1",
    "title": "Bewerbungsgespräch",
    "titleDe": "Im Vorstellungsgespräch",
    "icon": "💼",
    "premium": false,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Der Interviewer fragt nach deinen Stärken.",
            "question": "Was ist eine gute Antwort?",
            "options": [
              "Ich bin teamfähig und arbeite zuverlässig.",
              "Ich bin der Beste.",
              "Ich brauche den Job."
            ],
            "answer": 0,
            "explanation": "Konkrete Stärken nennen, ohne zu übertreiben."
          },
          {
            "type": "fill_blank",
            "situation": "Du erzählst von deiner Erfahrung.",
            "question": "In meiner letzten Stelle habe ich als Lagerarbeiter ___.",
            "options": [
              "gearbeitet",
              "gemacht",
              "gewesen"
            ],
            "answer": "gearbeitet",
            "explanation": "Als ... gearbeitet ist die korrekte Formulierung."
          },
          {
            "type": "quick_reaction",
            "situation": "Am Ende fragt der Interviewer: Haben Sie noch Fragen?",
            "question": "Wie reagierst du?",
            "options": [
              "Ja - wie sieht die Einarbeitung aus?",
              "Nein, alles klar.",
              "Wann bekomme ich Urlaub?"
            ],
            "answer": 0,
            "explanation": "Eine relevante Frage zeigt Interesse und Vorbereitung."
          },
          {
            "type": "sort_sentence",
            "situation": "Du bedankst dich nach dem Gespräch.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "für",
              "Vielen",
              "das",
              "Gespräch",
              "Dank"
            ],
            "answer": [
              1,
              4,
              0,
              2,
              3
            ],
            "explanation": "Richtig: Vielen Dank für das Gespräch."
          },
          {
            "type": "multiple_choice",
            "situation": "Du wirst nach deiner Gehaltsvorstellung gefragt.",
            "question": "Was ist eine professionelle Antwort?",
            "options": [
              "Ich orientiere mich am branchenüblichen Gehalt.",
              "So viel wie möglich.",
              "Das ist mir egal."
            ],
            "answer": 0,
            "explanation": "Professionell und sachlich antworten."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Der Interviewer fragt nach deinen Stärken.",
            "question": "Konkrete Stärken nennen, ___ zu übertreiben.",
            "options": [
              "ohne",
              "komme",
              "Arbeit"
            ],
            "answer": "ohne",
            "explanation": "Konkrete Stärken nennen, ohne zu übertreiben."
          },
          {
            "type": "sort_sentence",
            "situation": "Du erzählst von deiner Erfahrung.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Als",
              "...",
              "ist",
              "Formulierung",
              "gearbeitet",
              "korrekte",
              "die"
            ],
            "answer": [
              0,
              1,
              4,
              2,
              6,
              5,
              3
            ],
            "explanation": "Richtig: Als ... gearbeitet ist die korrekte Formulierung."
          },
          {
            "type": "fill_blank",
            "situation": "Am Ende fragt der Interviewer: Haben Sie noch Fragen?",
            "question": "Eine relevante Frage zeigt Interesse und ___.",
            "options": [
              "Vorbereitung",
              "schnell",
              "Antwort"
            ],
            "answer": "Vorbereitung",
            "explanation": "Eine relevante Frage zeigt Interesse und Vorbereitung."
          },
          {
            "type": "sort_sentence",
            "situation": "Du bedankst dich nach dem Gespräch.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Gespräch",
              "für",
              "Dank",
              "Vielen",
              "das"
            ],
            "answer": [
              3,
              2,
              1,
              4,
              0
            ],
            "explanation": "Richtig: Vielen Dank für das Gespräch."
          },
          {
            "type": "fill_blank",
            "situation": "Du wirst nach deiner Gehaltsvorstellung gefragt.",
            "question": "Professionell und sachlich ___.",
            "options": [
              "antworten",
              "will",
              "Adresse"
            ],
            "answer": "antworten",
            "explanation": "Professionell und sachlich antworten."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Der Interviewer fragt nach deinen Stärken.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich bin teamfähig und arbeite zuverlässig.",
              "Das wurde schon besprochen.",
              "Ich bin nicht zuständig."
            ],
            "answer": 0,
            "explanation": "Konkrete Stärken nennen, ohne zu übertreiben."
          },
          {
            "type": "quick_reaction",
            "situation": "Du erzählst von deiner Erfahrung.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "gearbeitet",
              "Kein Bedarf.",
              "Nicht mein Bereich."
            ],
            "answer": 0,
            "explanation": "Als ... gearbeitet ist die korrekte Formulierung."
          },
          {
            "type": "quick_reaction",
            "situation": "Am Ende fragt der Interviewer: Haben Sie noch Fragen?",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ja - wie sieht die Einarbeitung aus?",
              "Das betrifft mich nicht.",
              "Das wurde schon besprochen."
            ],
            "answer": 0,
            "explanation": "Eine relevante Frage zeigt Interesse und Vorbereitung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bedankst dich nach dem Gespräch.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Vielen Dank für das Gespräch",
              "Das sehe ich anders.",
              "Ich bin nicht zuständig."
            ],
            "answer": 0,
            "explanation": "Richtig: Vielen Dank für das Gespräch."
          },
          {
            "type": "quick_reaction",
            "situation": "Du wirst nach deiner Gehaltsvorstellung gefragt.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich orientiere mich am branchenüblichen Gehalt.",
              "Nicht mein Bereich.",
              "Das wurde schon besprochen."
            ],
            "answer": 0,
            "explanation": "Professionell und sachlich antworten."
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
        "wrong": "Ich bin der Beste.",
        "correct": "Ich bin teamfähig und arbeite zuverlässig.",
        "tip": "Konkrete Stärken nennen, ohne zu übertreiben."
      },
      {
        "wrong": "gemacht",
        "correct": "gearbeitet",
        "tip": "Als ... gearbeitet ist die korrekte Formulierung."
      },
      {
        "wrong": "Nein, alles klar.",
        "correct": "Ja - wie sieht die Einarbeitung aus?",
        "tip": "Eine relevante Frage zeigt Interesse und Vorbereitung."
      }
    ]
  },
  {
    "id": "b1-03",
    "level": "B1",
    "title": "Formelle E-Mail",
    "titleDe": "Formelle E-Mail schreiben",
    "icon": "✉️",
    "premium": false,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Du schreibst eine E-Mail an deinen Vermieter.",
            "question": "Wie fängst du an?",
            "options": [
              "Sehr geehrter Herr Müller,",
              "Hey!",
              "Lieber Vermieter,"
            ],
            "answer": 0,
            "explanation": "Formelle Anrede bei offiziellen E-Mails."
          },
          {
            "type": "fill_blank",
            "situation": "Du beschreibst ein Problem.",
            "question": "Ich möchte Sie darauf ___, dass die Heizung defekt ist.",
            "options": [
              "hinweisen",
              "sagen",
              "zeigen"
            ],
            "answer": "hinweisen",
            "explanation": "Darauf hinweisen, dass... ist formelles Deutsch."
          },
          {
            "type": "quick_reaction",
            "situation": "Du beendest die E-Mail.",
            "question": "Welche Grußformel passt?",
            "options": [
              "Mit freundlichen Grüßen",
              "Tschüss",
              "LG"
            ],
            "answer": 0,
            "explanation": "Mit freundlichen Grüßen ist die formelle Schlussformel."
          },
          {
            "type": "sort_sentence",
            "situation": "Du bittest um eine Antwort.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "eine",
              "Ich",
              "baldige",
              "bitte",
              "um",
              "Rückmeldung"
            ],
            "answer": [
              1,
              3,
              4,
              0,
              2,
              5
            ],
            "explanation": "Richtig: Ich bitte um eine baldige Rückmeldung."
          },
          {
            "type": "multiple_choice",
            "situation": "Du willst einen Anhang erwähnen.",
            "question": "Wie formulierst du das?",
            "options": [
              "Im Anhang finden Sie die gewünschten Unterlagen.",
              "Hier sind meine Papiere.",
              "Ich schicke dir was."
            ],
            "answer": 0,
            "explanation": "Formelle Formulierung für Anhänge in E-Mails."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Du schreibst eine E-Mail an deinen Vermieter.",
            "question": "Formelle Anrede ___ offiziellen E-Mails.",
            "options": [
              "bei",
              "leider",
              "kann"
            ],
            "answer": "bei",
            "explanation": "Formelle Anrede bei offiziellen E-Mails."
          },
          {
            "type": "sort_sentence",
            "situation": "Du beschreibst ein Problem.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Darauf",
              "Deutsch",
              "dass...",
              "hinweisen,",
              "ist",
              "formelles"
            ],
            "answer": [
              0,
              3,
              2,
              4,
              5,
              1
            ],
            "explanation": "Richtig: Darauf hinweisen, dass... ist formelles Deutsch."
          },
          {
            "type": "fill_blank",
            "situation": "Du beendest die E-Mail.",
            "question": "Mit freundlichen ___ ist die formelle Schlussformel.",
            "options": [
              "Grüßen",
              "dort",
              "brauche"
            ],
            "answer": "Grüßen",
            "explanation": "Mit freundlichen Grüßen ist die formelle Schlussformel."
          },
          {
            "type": "sort_sentence",
            "situation": "Du bittest um eine Antwort.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "bitte",
              "um",
              "eine",
              "Rückmeldung",
              "baldige",
              "Ich"
            ],
            "answer": [
              5,
              0,
              1,
              2,
              4,
              3
            ],
            "explanation": "Richtig: Ich bitte um eine baldige Rückmeldung."
          },
          {
            "type": "fill_blank",
            "situation": "Du willst einen Anhang erwähnen.",
            "question": "Formelle Formulierung für Anhänge in ___.",
            "options": [
              "E-Mails",
              "Problem",
              "Adresse"
            ],
            "answer": "E-Mails",
            "explanation": "Formelle Formulierung für Anhänge in E-Mails."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Du schreibst eine E-Mail an deinen Vermieter.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Sehr geehrter Herr Müller,",
              "Ich lehne das ab.",
              "Damit habe ich nichts zu tun."
            ],
            "answer": 0,
            "explanation": "Formelle Anrede bei offiziellen E-Mails."
          },
          {
            "type": "quick_reaction",
            "situation": "Du beschreibst ein Problem.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "hinweisen",
              "Kein Bedarf.",
              "Das ist zu kompliziert."
            ],
            "answer": 0,
            "explanation": "Darauf hinweisen, dass... ist formelles Deutsch."
          },
          {
            "type": "quick_reaction",
            "situation": "Du beendest die E-Mail.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Mit freundlichen Grüßen",
              "Damit habe ich nichts zu tun.",
              "Keine Kommentare."
            ],
            "answer": 0,
            "explanation": "Mit freundlichen Grüßen ist die formelle Schlussformel."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bittest um eine Antwort.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich bitte um eine baldige Rückmeldung",
              "Das wurde schon besprochen.",
              "Das sehe ich anders."
            ],
            "answer": 0,
            "explanation": "Richtig: Ich bitte um eine baldige Rückmeldung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du willst einen Anhang erwähnen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Im Anhang finden Sie die gewünschten Unterlagen.",
              "Kein Bedarf.",
              "Das betrifft mich nicht."
            ],
            "answer": 0,
            "explanation": "Formelle Formulierung für Anhänge in E-Mails."
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
        "wrong": "Hey!",
        "correct": "Sehr geehrter Herr Müller,",
        "tip": "Formelle Anrede bei offiziellen E-Mails."
      },
      {
        "wrong": "sagen",
        "correct": "hinweisen",
        "tip": "Darauf hinweisen, dass... ist formelles Deutsch."
      },
      {
        "wrong": "Tschüss",
        "correct": "Mit freundlichen Grüßen",
        "tip": "Mit freundlichen Grüßen ist die formelle Schlussformel."
      }
    ]
  },
  {
    "id": "b1-04",
    "level": "B1",
    "title": "Mietrecht",
    "titleDe": "Mietrecht verstehen",
    "icon": "⚖️",
    "premium": false,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Mietrecht verstehen.",
            "question": "Wie formulierst du das professionell?",
            "options": [
              "Klar, sachlich und höflich.",
              "Kurz und knapp.",
              "Gar nicht."
            ],
            "answer": 0,
            "explanation": "Professionelle Kommunikation ist bei Mietrecht verstehen wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du bereitest dich auf Mietrecht verstehen vor.",
            "question": "Ich würde gerne ___ besprechen.",
            "options": [
              "das",
              "etwas",
              "alles"
            ],
            "answer": "das",
            "explanation": "Konkret und sachlich kommunizieren."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sie",
              "Ich",
              "informieren",
              "möchte",
              "darüber"
            ],
            "answer": [
              1,
              3,
              0,
              4,
              2
            ],
            "explanation": "Richtig: Ich möchte Sie darüber informieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand stellt dir eine Frage zum Thema Mietrecht verstehen.",
            "question": "Wie reagierst du?",
            "options": [
              "Sachlich und professionell antworten.",
              "Kurz nicken.",
              "Die Frage ignorieren."
            ],
            "answer": 0,
            "explanation": "Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Dein Vermieter erhöht die Miete.",
            "question": "Wie reagierst du?",
            "options": [
              "Ich prüfe, ob die Erhöhung rechtlich zulässig ist.",
              "Ich ziehe sofort aus.",
              "Ich bezahle einfach mehr."
            ],
            "answer": 0,
            "explanation": "Mieterhöhungen müssen gesetzlich begründet sein."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Mietrecht verstehen.",
            "question": "Professionelle Kommunikation ist bei Mietrecht verstehen ___.",
            "options": [
              "wichtig",
              "richtig",
              "nötig"
            ],
            "answer": "wichtig",
            "explanation": "Professionelle Kommunikation ist bei Mietrecht verstehen wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du bereitest dich auf Mietrecht verstehen vor.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Konkret",
              "kommunizieren",
              "sachlich",
              "und"
            ],
            "answer": [
              0,
              3,
              2,
              1
            ],
            "explanation": "Richtig: Konkret und sachlich kommunizieren."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Ich möchte Sie darüber ___.",
            "options": [
              "informieren",
              "wichtig",
              "Geld"
            ],
            "answer": "informieren",
            "explanation": "Ich möchte Sie darüber informieren."
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand stellt dir eine Frage zum Thema Mietrecht verstehen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Kompetenz",
              "Antworten",
              "Professionelle",
              "zeigen"
            ],
            "answer": [
              2,
              1,
              3,
              0
            ],
            "explanation": "Richtig: Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "fill_blank",
            "situation": "Dein Vermieter erhöht die Miete.",
            "question": "Mieterhöhungen müssen gesetzlich ___ sein.",
            "options": [
              "begründet",
              "nötig",
              "Hilfe"
            ],
            "answer": "begründet",
            "explanation": "Mieterhöhungen müssen gesetzlich begründet sein."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Mietrecht verstehen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Klar, sachlich und höflich.",
              "Nicht mein Bereich.",
              "Kein Bedarf."
            ],
            "answer": 0,
            "explanation": "Professionelle Kommunikation ist bei Mietrecht verstehen wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bereitest dich auf Mietrecht verstehen vor.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "das",
              "Nicht mein Bereich.",
              "Ich bin nicht zuständig."
            ],
            "answer": 0,
            "explanation": "Konkret und sachlich kommunizieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich möchte Sie darüber informieren",
              "Das wurde schon besprochen.",
              "Das sehe ich anders."
            ],
            "answer": 0,
            "explanation": "Richtig: Ich möchte Sie darüber informieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand stellt dir eine Frage zum Thema Mietrecht verstehen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Sachlich und professionell antworten.",
              "Das ist zu kompliziert.",
              "Kein Bedarf."
            ],
            "answer": 0,
            "explanation": "Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Dein Vermieter erhöht die Miete.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich prüfe, ob die Erhöhung rechtlich zulässig ist.",
              "Ich bin nicht zuständig.",
              "Keine Kommentare."
            ],
            "answer": 0,
            "explanation": "Mieterhöhungen müssen gesetzlich begründet sein."
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
        "wrong": "Kurz und knapp.",
        "correct": "Klar, sachlich und höflich.",
        "tip": "Professionelle Kommunikation ist bei Mietrecht verstehen wichtig."
      },
      {
        "wrong": "etwas",
        "correct": "das",
        "tip": "Konkret und sachlich kommunizieren."
      },
      {
        "wrong": "Kurz nicken.",
        "correct": "Sachlich und professionell antworten.",
        "tip": "Professionelle Antworten zeigen Kompetenz."
      }
    ]
  },
  {
    "id": "b1-05",
    "level": "B1",
    "title": "Gehaltsverhandlung",
    "titleDe": "Gehalt verhandeln",
    "icon": "💶",
    "premium": false,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Gehalt verhandeln.",
            "question": "Wie formulierst du das professionell?",
            "options": [
              "Klar, sachlich und höflich.",
              "Kurz und knapp.",
              "Gar nicht."
            ],
            "answer": 0,
            "explanation": "Professionelle Kommunikation ist bei Gehalt verhandeln wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du bereitest dich auf Gehalt verhandeln vor.",
            "question": "Ich würde gerne ___ besprechen.",
            "options": [
              "das",
              "etwas",
              "alles"
            ],
            "answer": "das",
            "explanation": "Konkret und sachlich kommunizieren."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sie",
              "Ich",
              "informieren",
              "möchte",
              "darüber"
            ],
            "answer": [
              1,
              3,
              0,
              4,
              2
            ],
            "explanation": "Richtig: Ich möchte Sie darüber informieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand stellt dir eine Frage zum Thema Gehalt verhandeln.",
            "question": "Wie reagierst du?",
            "options": [
              "Sachlich und professionell antworten.",
              "Kurz nicken.",
              "Die Frage ignorieren."
            ],
            "answer": 0,
            "explanation": "Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bewirbst dich auf eine Stelle.",
            "question": "Was ist wichtig?",
            "options": [
              "Ein professionelles Anschreiben und Lebenslauf.",
              "Nur meinen Namen schicken.",
              "Anrufen und fragen."
            ],
            "answer": 0,
            "explanation": "Bewerbungsunterlagen müssen vollständig und professionell sein."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Gehalt verhandeln.",
            "question": "Professionelle Kommunikation ist ___ Gehalt verhandeln wichtig.",
            "options": [
              "bei",
              "frage",
              "Antwort"
            ],
            "answer": "bei",
            "explanation": "Professionelle Kommunikation ist bei Gehalt verhandeln wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du bereitest dich auf Gehalt verhandeln vor.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "und",
              "Konkret",
              "kommunizieren",
              "sachlich"
            ],
            "answer": [
              1,
              0,
              3,
              2
            ],
            "explanation": "Richtig: Konkret und sachlich kommunizieren."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Ich möchte Sie darüber ___.",
            "options": [
              "informieren",
              "Problem",
              "schlecht"
            ],
            "answer": "informieren",
            "explanation": "Ich möchte Sie darüber informieren."
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand stellt dir eine Frage zum Thema Gehalt verhandeln.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Professionelle",
              "Antworten",
              "Kompetenz",
              "zeigen"
            ],
            "answer": [
              0,
              1,
              3,
              2
            ],
            "explanation": "Richtig: Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "fill_blank",
            "situation": "Du bewirbst dich auf eine Stelle.",
            "question": "Bewerbungsunterlagen müssen vollständig ___ professionell sein.",
            "options": [
              "und",
              "will",
              "schnell"
            ],
            "answer": "und",
            "explanation": "Bewerbungsunterlagen müssen vollständig und professionell sein."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Gehalt verhandeln.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Klar, sachlich und höflich.",
              "Nicht mein Bereich.",
              "Keine Kommentare."
            ],
            "answer": 0,
            "explanation": "Professionelle Kommunikation ist bei Gehalt verhandeln wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bereitest dich auf Gehalt verhandeln vor.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "das",
              "Damit habe ich nichts zu tun.",
              "Kein Bedarf."
            ],
            "answer": 0,
            "explanation": "Konkret und sachlich kommunizieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich möchte Sie darüber informieren",
              "Das interessiert mich nicht.",
              "Ich lehne das ab."
            ],
            "answer": 0,
            "explanation": "Richtig: Ich möchte Sie darüber informieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand stellt dir eine Frage zum Thema Gehalt verhandeln.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Sachlich und professionell antworten.",
              "Ich bin nicht zuständig.",
              "Das betrifft mich nicht."
            ],
            "answer": 0,
            "explanation": "Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bewirbst dich auf eine Stelle.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ein professionelles Anschreiben und Lebenslauf.",
              "Ich bin nicht zuständig.",
              "Darüber möchte ich nicht sprechen."
            ],
            "answer": 0,
            "explanation": "Bewerbungsunterlagen müssen vollständig und professionell sein."
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
        "wrong": "Kurz und knapp.",
        "correct": "Klar, sachlich und höflich.",
        "tip": "Professionelle Kommunikation ist bei Gehalt verhandeln wichtig."
      },
      {
        "wrong": "etwas",
        "correct": "das",
        "tip": "Konkret und sachlich kommunizieren."
      },
      {
        "wrong": "Kurz nicken.",
        "correct": "Sachlich und professionell antworten.",
        "tip": "Professionelle Antworten zeigen Kompetenz."
      }
    ]
  },
  {
    "id": "b1-06",
    "level": "B1",
    "title": "Arzt Befund",
    "titleDe": "Einen Befund verstehen",
    "icon": "📋",
    "premium": false,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Einen Befund verstehen.",
            "question": "Wie formulierst du das professionell?",
            "options": [
              "Klar, sachlich und höflich.",
              "Kurz und knapp.",
              "Gar nicht."
            ],
            "answer": 0,
            "explanation": "Professionelle Kommunikation ist bei Einen Befund verstehen wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du bereitest dich auf Einen Befund verstehen vor.",
            "question": "Ich würde gerne ___ besprechen.",
            "options": [
              "das",
              "etwas",
              "alles"
            ],
            "answer": "das",
            "explanation": "Konkret und sachlich kommunizieren."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sie",
              "Ich",
              "informieren",
              "möchte",
              "darüber"
            ],
            "answer": [
              1,
              3,
              0,
              4,
              2
            ],
            "explanation": "Richtig: Ich möchte Sie darüber informieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand stellt dir eine Frage zum Thema Einen Befund verstehen.",
            "question": "Wie reagierst du?",
            "options": [
              "Sachlich und professionell antworten.",
              "Kurz nicken.",
              "Die Frage ignorieren."
            ],
            "answer": 0,
            "explanation": "Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du hast eine Frist verpasst.",
            "question": "Was machst du?",
            "options": [
              "Ich kontaktiere die Stelle und bitte um Verlängerung.",
              "Ich ignoriere es.",
              "Ich warte ab."
            ],
            "answer": 0,
            "explanation": "Proaktive Kommunikation hilft bei verpassten Fristen."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Einen Befund verstehen.",
            "question": "Professionelle Kommunikation ist ___ Einen Befund verstehen wichtig.",
            "options": [
              "bei",
              "Name",
              "jetzt"
            ],
            "answer": "bei",
            "explanation": "Professionelle Kommunikation ist bei Einen Befund verstehen wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du bereitest dich auf Einen Befund verstehen vor.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Konkret",
              "und",
              "kommunizieren",
              "sachlich"
            ],
            "answer": [
              0,
              1,
              3,
              2
            ],
            "explanation": "Richtig: Konkret und sachlich kommunizieren."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Ich möchte ___ darüber informieren.",
            "options": [
              "Sie",
              "nehme",
              "nötig"
            ],
            "answer": "Sie",
            "explanation": "Ich möchte Sie darüber informieren."
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand stellt dir eine Frage zum Thema Einen Befund verstehen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Professionelle",
              "Antworten",
              "Kompetenz",
              "zeigen"
            ],
            "answer": [
              0,
              1,
              3,
              2
            ],
            "explanation": "Richtig: Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "fill_blank",
            "situation": "Du hast eine Frist verpasst.",
            "question": "Proaktive Kommunikation ___ bei verpassten Fristen.",
            "options": [
              "hilft",
              "darf",
              "morgen"
            ],
            "answer": "hilft",
            "explanation": "Proaktive Kommunikation hilft bei verpassten Fristen."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Einen Befund verstehen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Klar, sachlich und höflich.",
              "Kein Bedarf.",
              "Das wurde schon besprochen."
            ],
            "answer": 0,
            "explanation": "Professionelle Kommunikation ist bei Einen Befund verstehen wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bereitest dich auf Einen Befund verstehen vor.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "das",
              "Das ist zu kompliziert.",
              "Kein Bedarf."
            ],
            "answer": 0,
            "explanation": "Konkret und sachlich kommunizieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich möchte Sie darüber informieren",
              "Das betrifft mich nicht.",
              "Nicht mein Bereich."
            ],
            "answer": 0,
            "explanation": "Richtig: Ich möchte Sie darüber informieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand stellt dir eine Frage zum Thema Einen Befund verstehen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Sachlich und professionell antworten.",
              "Keine Kommentare.",
              "Das ist zu kompliziert."
            ],
            "answer": 0,
            "explanation": "Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du hast eine Frist verpasst.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich kontaktiere die Stelle und bitte um Verlängerung.",
              "Nicht mein Bereich.",
              "Das ist zu kompliziert."
            ],
            "answer": 0,
            "explanation": "Proaktive Kommunikation hilft bei verpassten Fristen."
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
        "wrong": "Kurz und knapp.",
        "correct": "Klar, sachlich und höflich.",
        "tip": "Professionelle Kommunikation ist bei Einen Befund verstehen wichtig."
      },
      {
        "wrong": "etwas",
        "correct": "das",
        "tip": "Konkret und sachlich kommunizieren."
      },
      {
        "wrong": "Kurz nicken.",
        "correct": "Sachlich und professionell antworten.",
        "tip": "Professionelle Antworten zeigen Kompetenz."
      }
    ]
  },
  {
    "id": "b1-07",
    "level": "B1",
    "title": "Elternabend",
    "titleDe": "Auf dem Elternabend",
    "icon": "👨‍👩‍👧‍👦",
    "premium": false,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Auf dem Elternabend.",
            "question": "Wie formulierst du das professionell?",
            "options": [
              "Klar, sachlich und höflich.",
              "Kurz und knapp.",
              "Gar nicht."
            ],
            "answer": 0,
            "explanation": "Professionelle Kommunikation ist bei Auf dem Elternabend wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du bereitest dich auf Auf dem Elternabend vor.",
            "question": "Ich würde gerne ___ besprechen.",
            "options": [
              "das",
              "etwas",
              "alles"
            ],
            "answer": "das",
            "explanation": "Konkret und sachlich kommunizieren."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sie",
              "Ich",
              "informieren",
              "möchte",
              "darüber"
            ],
            "answer": [
              1,
              3,
              0,
              4,
              2
            ],
            "explanation": "Richtig: Ich möchte Sie darüber informieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand stellt dir eine Frage zum Thema Auf dem Elternabend.",
            "question": "Wie reagierst du?",
            "options": [
              "Sachlich und professionell antworten.",
              "Kurz nicken.",
              "Die Frage ignorieren."
            ],
            "answer": 0,
            "explanation": "Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Ein Freund bittet um einen Gefallen.",
            "question": "Wie lehnst du höflich ab?",
            "options": [
              "Das würde ich gerne, aber leider kann ich nicht.",
              "Nein.",
              "Frag jemand anderen."
            ],
            "answer": 0,
            "explanation": "Höfliches Ablehnen bewahrt die Freundschaft."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Auf dem Elternabend.",
            "question": "Professionelle ___ ist bei Auf dem Elternabend wichtig.",
            "options": [
              "Kommunikation",
              "darf",
              "Adresse"
            ],
            "answer": "Kommunikation",
            "explanation": "Professionelle Kommunikation ist bei Auf dem Elternabend wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du bereitest dich auf Auf dem Elternabend vor.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Konkret",
              "und",
              "kommunizieren",
              "sachlich"
            ],
            "answer": [
              0,
              1,
              3,
              2
            ],
            "explanation": "Richtig: Konkret und sachlich kommunizieren."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Ich ___ Sie darüber informieren.",
            "options": [
              "möchte",
              "muss",
              "habe"
            ],
            "answer": "möchte",
            "explanation": "Ich möchte Sie darüber informieren."
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand stellt dir eine Frage zum Thema Auf dem Elternabend.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Professionelle",
              "zeigen",
              "Kompetenz",
              "Antworten"
            ],
            "answer": [
              0,
              3,
              1,
              2
            ],
            "explanation": "Richtig: Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "fill_blank",
            "situation": "Ein Freund bittet um einen Gefallen.",
            "question": "Höfliches Ablehnen bewahrt die ___.",
            "options": [
              "Freundschaft",
              "jetzt",
              "nehme"
            ],
            "answer": "Freundschaft",
            "explanation": "Höfliches Ablehnen bewahrt die Freundschaft."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Auf dem Elternabend.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Klar, sachlich und höflich.",
              "Ich bin nicht zuständig.",
              "Das interessiert mich nicht."
            ],
            "answer": 0,
            "explanation": "Professionelle Kommunikation ist bei Auf dem Elternabend wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bereitest dich auf Auf dem Elternabend vor.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "das",
              "Ich bin nicht zuständig.",
              "Nicht mein Bereich."
            ],
            "answer": 0,
            "explanation": "Konkret und sachlich kommunizieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich möchte Sie darüber informieren",
              "Das betrifft mich nicht.",
              "Darüber möchte ich nicht sprechen."
            ],
            "answer": 0,
            "explanation": "Richtig: Ich möchte Sie darüber informieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand stellt dir eine Frage zum Thema Auf dem Elternabend.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Sachlich und professionell antworten.",
              "Nicht mein Bereich.",
              "Das wurde schon besprochen."
            ],
            "answer": 0,
            "explanation": "Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Ein Freund bittet um einen Gefallen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Das würde ich gerne, aber leider kann ich nicht.",
              "Das ist zu kompliziert.",
              "Keine Kommentare."
            ],
            "answer": 0,
            "explanation": "Höfliches Ablehnen bewahrt die Freundschaft."
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
        "wrong": "Kurz und knapp.",
        "correct": "Klar, sachlich und höflich.",
        "tip": "Professionelle Kommunikation ist bei Auf dem Elternabend wichtig."
      },
      {
        "wrong": "etwas",
        "correct": "das",
        "tip": "Konkret und sachlich kommunizieren."
      },
      {
        "wrong": "Kurz nicken.",
        "correct": "Sachlich und professionell antworten.",
        "tip": "Professionelle Antworten zeigen Kompetenz."
      }
    ]
  },
  {
    "id": "b1-08",
    "level": "B1",
    "title": "Behördenbrief",
    "titleDe": "Einen Behördenbrief verstehen",
    "icon": "📨",
    "premium": false,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Einen Behördenbrief verstehen.",
            "question": "Wie formulierst du das professionell?",
            "options": [
              "Klar, sachlich und höflich.",
              "Kurz und knapp.",
              "Gar nicht."
            ],
            "answer": 0,
            "explanation": "Professionelle Kommunikation ist bei Einen Behördenbrief verstehen wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du bereitest dich auf Einen Behördenbrief verstehen vor.",
            "question": "Ich würde gerne ___ besprechen.",
            "options": [
              "das",
              "etwas",
              "alles"
            ],
            "answer": "das",
            "explanation": "Konkret und sachlich kommunizieren."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sie",
              "Ich",
              "informieren",
              "möchte",
              "darüber"
            ],
            "answer": [
              1,
              3,
              0,
              4,
              2
            ],
            "explanation": "Richtig: Ich möchte Sie darüber informieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand stellt dir eine Frage zum Thema Einen Behördenbrief verstehen.",
            "question": "Wie reagierst du?",
            "options": [
              "Sachlich und professionell antworten.",
              "Kurz nicken.",
              "Die Frage ignorieren."
            ],
            "answer": 0,
            "explanation": "Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bekommst konstruktive Kritik.",
            "question": "Wie reagierst du?",
            "options": [
              "Danke für das Feedback, ich werde daran arbeiten.",
              "Das stimmt nicht.",
              "Mir egal."
            ],
            "answer": 0,
            "explanation": "Feedback anzunehmen zeigt Professionalität."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Einen Behördenbrief verstehen.",
            "question": "Professionelle Kommunikation ist bei Einen Behördenbrief ___ wichtig.",
            "options": [
              "verstehen",
              "leider",
              "werde"
            ],
            "answer": "verstehen",
            "explanation": "Professionelle Kommunikation ist bei Einen Behördenbrief verstehen wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du bereitest dich auf Einen Behördenbrief verstehen vor.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "sachlich",
              "Konkret",
              "kommunizieren",
              "und"
            ],
            "answer": [
              1,
              3,
              0,
              2
            ],
            "explanation": "Richtig: Konkret und sachlich kommunizieren."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Ich ___ Sie darüber informieren.",
            "options": [
              "möchte",
              "sage",
              "suche"
            ],
            "answer": "möchte",
            "explanation": "Ich möchte Sie darüber informieren."
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand stellt dir eine Frage zum Thema Einen Behördenbrief verstehen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "zeigen",
              "Antworten",
              "Professionelle",
              "Kompetenz"
            ],
            "answer": [
              2,
              1,
              0,
              3
            ],
            "explanation": "Richtig: Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "fill_blank",
            "situation": "Du bekommst konstruktive Kritik.",
            "question": "Feedback ___ zeigt Professionalität.",
            "options": [
              "anzunehmen",
              "habe",
              "Antwort"
            ],
            "answer": "anzunehmen",
            "explanation": "Feedback anzunehmen zeigt Professionalität."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Einen Behördenbrief verstehen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Klar, sachlich und höflich.",
              "Das wurde schon besprochen.",
              "Kein Bedarf."
            ],
            "answer": 0,
            "explanation": "Professionelle Kommunikation ist bei Einen Behördenbrief verstehen wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bereitest dich auf Einen Behördenbrief verstehen vor.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "das",
              "Darüber möchte ich nicht sprechen.",
              "Das interessiert mich nicht."
            ],
            "answer": 0,
            "explanation": "Konkret und sachlich kommunizieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich möchte Sie darüber informieren",
              "Ich bin nicht zuständig.",
              "Das sehe ich anders."
            ],
            "answer": 0,
            "explanation": "Richtig: Ich möchte Sie darüber informieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand stellt dir eine Frage zum Thema Einen Behördenbrief verstehen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Sachlich und professionell antworten.",
              "Nicht mein Bereich.",
              "Keine Kommentare."
            ],
            "answer": 0,
            "explanation": "Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bekommst konstruktive Kritik.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Danke für das Feedback, ich werde daran arbeiten.",
              "Keine Kommentare.",
              "Das sehe ich anders."
            ],
            "answer": 0,
            "explanation": "Feedback anzunehmen zeigt Professionalität."
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
        "wrong": "Kurz und knapp.",
        "correct": "Klar, sachlich und höflich.",
        "tip": "Professionelle Kommunikation ist bei Einen Behördenbrief verstehen wichtig."
      },
      {
        "wrong": "etwas",
        "correct": "das",
        "tip": "Konkret und sachlich kommunizieren."
      },
      {
        "wrong": "Kurz nicken.",
        "correct": "Sachlich und professionell antworten.",
        "tip": "Professionelle Antworten zeigen Kompetenz."
      }
    ]
  },
  {
    "id": "b1-09",
    "level": "B1",
    "title": "Widerspruch",
    "titleDe": "Widerspruch einlegen",
    "icon": "🚫",
    "premium": false,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Widerspruch einlegen.",
            "question": "Wie formulierst du das professionell?",
            "options": [
              "Klar, sachlich und höflich.",
              "Kurz und knapp.",
              "Gar nicht."
            ],
            "answer": 0,
            "explanation": "Professionelle Kommunikation ist bei Widerspruch einlegen wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du bereitest dich auf Widerspruch einlegen vor.",
            "question": "Ich würde gerne ___ besprechen.",
            "options": [
              "das",
              "etwas",
              "alles"
            ],
            "answer": "das",
            "explanation": "Konkret und sachlich kommunizieren."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sie",
              "Ich",
              "informieren",
              "möchte",
              "darüber"
            ],
            "answer": [
              1,
              3,
              0,
              4,
              2
            ],
            "explanation": "Richtig: Ich möchte Sie darüber informieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand stellt dir eine Frage zum Thema Widerspruch einlegen.",
            "question": "Wie reagierst du?",
            "options": [
              "Sachlich und professionell antworten.",
              "Kurz nicken.",
              "Die Frage ignorieren."
            ],
            "answer": 0,
            "explanation": "Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Dein Vermieter erhöht die Miete.",
            "question": "Wie reagierst du?",
            "options": [
              "Ich prüfe, ob die Erhöhung rechtlich zulässig ist.",
              "Ich ziehe sofort aus.",
              "Ich bezahle einfach mehr."
            ],
            "answer": 0,
            "explanation": "Mieterhöhungen müssen gesetzlich begründet sein."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Widerspruch einlegen.",
            "question": "Professionelle Kommunikation ___ bei Widerspruch einlegen wichtig.",
            "options": [
              "ist",
              "falsch",
              "gut"
            ],
            "answer": "ist",
            "explanation": "Professionelle Kommunikation ist bei Widerspruch einlegen wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du bereitest dich auf Widerspruch einlegen vor.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "und",
              "kommunizieren",
              "Konkret",
              "sachlich"
            ],
            "answer": [
              2,
              0,
              3,
              1
            ],
            "explanation": "Richtig: Konkret und sachlich kommunizieren."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Ich möchte Sie ___ informieren.",
            "options": [
              "darüber",
              "komme",
              "leider"
            ],
            "answer": "darüber",
            "explanation": "Ich möchte Sie darüber informieren."
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand stellt dir eine Frage zum Thema Widerspruch einlegen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "zeigen",
              "Kompetenz",
              "Professionelle",
              "Antworten"
            ],
            "answer": [
              2,
              3,
              0,
              1
            ],
            "explanation": "Richtig: Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "fill_blank",
            "situation": "Dein Vermieter erhöht die Miete.",
            "question": "Mieterhöhungen müssen gesetzlich ___ sein.",
            "options": [
              "begründet",
              "schnell",
              "dort"
            ],
            "answer": "begründet",
            "explanation": "Mieterhöhungen müssen gesetzlich begründet sein."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Widerspruch einlegen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Klar, sachlich und höflich.",
              "Das ist zu kompliziert.",
              "Ich lehne das ab."
            ],
            "answer": 0,
            "explanation": "Professionelle Kommunikation ist bei Widerspruch einlegen wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bereitest dich auf Widerspruch einlegen vor.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "das",
              "Das wurde schon besprochen.",
              "Nicht mein Bereich."
            ],
            "answer": 0,
            "explanation": "Konkret und sachlich kommunizieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich möchte Sie darüber informieren",
              "Damit habe ich nichts zu tun.",
              "Kein Bedarf."
            ],
            "answer": 0,
            "explanation": "Richtig: Ich möchte Sie darüber informieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand stellt dir eine Frage zum Thema Widerspruch einlegen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Sachlich und professionell antworten.",
              "Keine Kommentare.",
              "Das interessiert mich nicht."
            ],
            "answer": 0,
            "explanation": "Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Dein Vermieter erhöht die Miete.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich prüfe, ob die Erhöhung rechtlich zulässig ist.",
              "Darüber möchte ich nicht sprechen.",
              "Damit habe ich nichts zu tun."
            ],
            "answer": 0,
            "explanation": "Mieterhöhungen müssen gesetzlich begründet sein."
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
        "wrong": "Kurz und knapp.",
        "correct": "Klar, sachlich und höflich.",
        "tip": "Professionelle Kommunikation ist bei Widerspruch einlegen wichtig."
      },
      {
        "wrong": "etwas",
        "correct": "das",
        "tip": "Konkret und sachlich kommunizieren."
      },
      {
        "wrong": "Kurz nicken.",
        "correct": "Sachlich und professionell antworten.",
        "tip": "Professionelle Antworten zeigen Kompetenz."
      }
    ]
  },
  {
    "id": "b1-10",
    "level": "B1",
    "title": "Teammeeting",
    "titleDe": "Im Teammeeting",
    "icon": "🤝",
    "premium": false,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Im Teammeeting.",
            "question": "Wie formulierst du das professionell?",
            "options": [
              "Klar, sachlich und höflich.",
              "Kurz und knapp.",
              "Gar nicht."
            ],
            "answer": 0,
            "explanation": "Professionelle Kommunikation ist bei Im Teammeeting wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du bereitest dich auf Im Teammeeting vor.",
            "question": "Ich würde gerne ___ besprechen.",
            "options": [
              "das",
              "etwas",
              "alles"
            ],
            "answer": "das",
            "explanation": "Konkret und sachlich kommunizieren."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sie",
              "Ich",
              "informieren",
              "möchte",
              "darüber"
            ],
            "answer": [
              1,
              3,
              0,
              4,
              2
            ],
            "explanation": "Richtig: Ich möchte Sie darüber informieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand stellt dir eine Frage zum Thema Im Teammeeting.",
            "question": "Wie reagierst du?",
            "options": [
              "Sachlich und professionell antworten.",
              "Kurz nicken.",
              "Die Frage ignorieren."
            ],
            "answer": 0,
            "explanation": "Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bewirbst dich auf eine Stelle.",
            "question": "Was ist wichtig?",
            "options": [
              "Ein professionelles Anschreiben und Lebenslauf.",
              "Nur meinen Namen schicken.",
              "Anrufen und fragen."
            ],
            "answer": 0,
            "explanation": "Bewerbungsunterlagen müssen vollständig und professionell sein."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Im Teammeeting.",
            "question": "Professionelle ___ ist bei Im Teammeeting wichtig.",
            "options": [
              "Kommunikation",
              "mache",
              "möchte"
            ],
            "answer": "Kommunikation",
            "explanation": "Professionelle Kommunikation ist bei Im Teammeeting wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du bereitest dich auf Im Teammeeting vor.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "sachlich",
              "Konkret",
              "und",
              "kommunizieren"
            ],
            "answer": [
              1,
              2,
              0,
              3
            ],
            "explanation": "Richtig: Konkret und sachlich kommunizieren."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Ich ___ Sie darüber informieren.",
            "options": [
              "möchte",
              "gehe",
              "darf"
            ],
            "answer": "möchte",
            "explanation": "Ich möchte Sie darüber informieren."
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand stellt dir eine Frage zum Thema Im Teammeeting.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Professionelle",
              "zeigen",
              "Kompetenz",
              "Antworten"
            ],
            "answer": [
              0,
              3,
              1,
              2
            ],
            "explanation": "Richtig: Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "fill_blank",
            "situation": "Du bewirbst dich auf eine Stelle.",
            "question": "Bewerbungsunterlagen müssen vollständig ___ professionell sein.",
            "options": [
              "und",
              "Antwort",
              "langsam"
            ],
            "answer": "und",
            "explanation": "Bewerbungsunterlagen müssen vollständig und professionell sein."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Im Teammeeting.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Klar, sachlich und höflich.",
              "Kein Bedarf.",
              "Das wurde schon besprochen."
            ],
            "answer": 0,
            "explanation": "Professionelle Kommunikation ist bei Im Teammeeting wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bereitest dich auf Im Teammeeting vor.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "das",
              "Das betrifft mich nicht.",
              "Ich bin nicht zuständig."
            ],
            "answer": 0,
            "explanation": "Konkret und sachlich kommunizieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich möchte Sie darüber informieren",
              "Nicht mein Bereich.",
              "Das interessiert mich nicht."
            ],
            "answer": 0,
            "explanation": "Richtig: Ich möchte Sie darüber informieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand stellt dir eine Frage zum Thema Im Teammeeting.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Sachlich und professionell antworten.",
              "Kein Bedarf.",
              "Das ist zu kompliziert."
            ],
            "answer": 0,
            "explanation": "Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bewirbst dich auf eine Stelle.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ein professionelles Anschreiben und Lebenslauf.",
              "Das betrifft mich nicht.",
              "Nicht mein Bereich."
            ],
            "answer": 0,
            "explanation": "Bewerbungsunterlagen müssen vollständig und professionell sein."
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
        "wrong": "Kurz und knapp.",
        "correct": "Klar, sachlich und höflich.",
        "tip": "Professionelle Kommunikation ist bei Im Teammeeting wichtig."
      },
      {
        "wrong": "etwas",
        "correct": "das",
        "tip": "Konkret und sachlich kommunizieren."
      },
      {
        "wrong": "Kurz nicken.",
        "correct": "Sachlich und professionell antworten.",
        "tip": "Professionelle Antworten zeigen Kompetenz."
      }
    ]
  },
  {
    "id": "b1-11",
    "level": "B1",
    "title": "Kündigung",
    "titleDe": "Eine Kündigung schreiben",
    "icon": "📝",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Eine Kündigung schreiben.",
            "question": "Wie formulierst du das professionell?",
            "options": [
              "Klar, sachlich und höflich.",
              "Kurz und knapp.",
              "Gar nicht."
            ],
            "answer": 0,
            "explanation": "Professionelle Kommunikation ist bei Eine Kündigung schreiben wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du bereitest dich auf Eine Kündigung schreiben vor.",
            "question": "Ich würde gerne ___ besprechen.",
            "options": [
              "das",
              "etwas",
              "alles"
            ],
            "answer": "das",
            "explanation": "Konkret und sachlich kommunizieren."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sie",
              "Ich",
              "informieren",
              "möchte",
              "darüber"
            ],
            "answer": [
              1,
              3,
              0,
              4,
              2
            ],
            "explanation": "Richtig: Ich möchte Sie darüber informieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand stellt dir eine Frage zum Thema Eine Kündigung schreiben.",
            "question": "Wie reagierst du?",
            "options": [
              "Sachlich und professionell antworten.",
              "Kurz nicken.",
              "Die Frage ignorieren."
            ],
            "answer": 0,
            "explanation": "Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du hast eine Frist verpasst.",
            "question": "Was machst du?",
            "options": [
              "Ich kontaktiere die Stelle und bitte um Verlängerung.",
              "Ich ignoriere es.",
              "Ich warte ab."
            ],
            "answer": 0,
            "explanation": "Proaktive Kommunikation hilft bei verpassten Fristen."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Eine Kündigung schreiben.",
            "question": "Professionelle ___ ist bei Eine Kündigung schreiben wichtig.",
            "options": [
              "Kommunikation",
              "gut",
              "Antwort"
            ],
            "answer": "Kommunikation",
            "explanation": "Professionelle Kommunikation ist bei Eine Kündigung schreiben wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du bereitest dich auf Eine Kündigung schreiben vor.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Konkret",
              "sachlich",
              "kommunizieren",
              "und"
            ],
            "answer": [
              0,
              3,
              1,
              2
            ],
            "explanation": "Richtig: Konkret und sachlich kommunizieren."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Ich ___ Sie darüber informieren.",
            "options": [
              "möchte",
              "komme",
              "soll"
            ],
            "answer": "möchte",
            "explanation": "Ich möchte Sie darüber informieren."
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand stellt dir eine Frage zum Thema Eine Kündigung schreiben.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Kompetenz",
              "zeigen",
              "Professionelle",
              "Antworten"
            ],
            "answer": [
              2,
              3,
              1,
              0
            ],
            "explanation": "Richtig: Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "fill_blank",
            "situation": "Du hast eine Frist verpasst.",
            "question": "Proaktive Kommunikation hilft bei ___ Fristen.",
            "options": [
              "verpassten",
              "gehe",
              "gut"
            ],
            "answer": "verpassten",
            "explanation": "Proaktive Kommunikation hilft bei verpassten Fristen."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Eine Kündigung schreiben.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Klar, sachlich und höflich.",
              "Kein Bedarf.",
              "Das wurde schon besprochen."
            ],
            "answer": 0,
            "explanation": "Professionelle Kommunikation ist bei Eine Kündigung schreiben wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bereitest dich auf Eine Kündigung schreiben vor.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "das",
              "Das interessiert mich nicht.",
              "Damit habe ich nichts zu tun."
            ],
            "answer": 0,
            "explanation": "Konkret und sachlich kommunizieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich möchte Sie darüber informieren",
              "Kein Bedarf.",
              "Keine Kommentare."
            ],
            "answer": 0,
            "explanation": "Richtig: Ich möchte Sie darüber informieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand stellt dir eine Frage zum Thema Eine Kündigung schreiben.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Sachlich und professionell antworten.",
              "Das sehe ich anders.",
              "Keine Kommentare."
            ],
            "answer": 0,
            "explanation": "Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du hast eine Frist verpasst.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich kontaktiere die Stelle und bitte um Verlängerung.",
              "Nicht mein Bereich.",
              "Das ist zu kompliziert."
            ],
            "answer": 0,
            "explanation": "Proaktive Kommunikation hilft bei verpassten Fristen."
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
        "wrong": "Kurz und knapp.",
        "correct": "Klar, sachlich und höflich.",
        "tip": "Professionelle Kommunikation ist bei Eine Kündigung schreiben wichtig."
      },
      {
        "wrong": "etwas",
        "correct": "das",
        "tip": "Konkret und sachlich kommunizieren."
      },
      {
        "wrong": "Kurz nicken.",
        "correct": "Sachlich und professionell antworten.",
        "tip": "Professionelle Antworten zeigen Kompetenz."
      }
    ]
  },
  {
    "id": "b1-12",
    "level": "B1",
    "title": "Wohnungsübergabe",
    "titleDe": "Wohnungsübergabe",
    "icon": "🔑",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Wohnungsübergabe.",
            "question": "Wie formulierst du das professionell?",
            "options": [
              "Klar, sachlich und höflich.",
              "Kurz und knapp.",
              "Gar nicht."
            ],
            "answer": 0,
            "explanation": "Professionelle Kommunikation ist bei Wohnungsübergabe wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du bereitest dich auf Wohnungsübergabe vor.",
            "question": "Ich würde gerne ___ besprechen.",
            "options": [
              "das",
              "etwas",
              "alles"
            ],
            "answer": "das",
            "explanation": "Konkret und sachlich kommunizieren."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sie",
              "Ich",
              "informieren",
              "möchte",
              "darüber"
            ],
            "answer": [
              1,
              3,
              0,
              4,
              2
            ],
            "explanation": "Richtig: Ich möchte Sie darüber informieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand stellt dir eine Frage zum Thema Wohnungsübergabe.",
            "question": "Wie reagierst du?",
            "options": [
              "Sachlich und professionell antworten.",
              "Kurz nicken.",
              "Die Frage ignorieren."
            ],
            "answer": 0,
            "explanation": "Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Ein Freund bittet um einen Gefallen.",
            "question": "Wie lehnst du höflich ab?",
            "options": [
              "Das würde ich gerne, aber leider kann ich nicht.",
              "Nein.",
              "Frag jemand anderen."
            ],
            "answer": 0,
            "explanation": "Höfliches Ablehnen bewahrt die Freundschaft."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Wohnungsübergabe.",
            "question": "Professionelle Kommunikation ___ bei Wohnungsübergabe wichtig.",
            "options": [
              "ist",
              "dort",
              "sofort"
            ],
            "answer": "ist",
            "explanation": "Professionelle Kommunikation ist bei Wohnungsübergabe wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du bereitest dich auf Wohnungsübergabe vor.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "kommunizieren",
              "und",
              "sachlich",
              "Konkret"
            ],
            "answer": [
              3,
              1,
              2,
              0
            ],
            "explanation": "Richtig: Konkret und sachlich kommunizieren."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Ich möchte Sie ___ informieren.",
            "options": [
              "darüber",
              "muss",
              "schnell"
            ],
            "answer": "darüber",
            "explanation": "Ich möchte Sie darüber informieren."
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand stellt dir eine Frage zum Thema Wohnungsübergabe.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Antworten",
              "zeigen",
              "Kompetenz",
              "Professionelle"
            ],
            "answer": [
              3,
              0,
              1,
              2
            ],
            "explanation": "Richtig: Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "fill_blank",
            "situation": "Ein Freund bittet um einen Gefallen.",
            "question": "Höfliches Ablehnen ___ die Freundschaft.",
            "options": [
              "bewahrt",
              "komme",
              "Problem"
            ],
            "answer": "bewahrt",
            "explanation": "Höfliches Ablehnen bewahrt die Freundschaft."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Wohnungsübergabe.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Klar, sachlich und höflich.",
              "Keine Kommentare.",
              "Das sehe ich anders."
            ],
            "answer": 0,
            "explanation": "Professionelle Kommunikation ist bei Wohnungsübergabe wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bereitest dich auf Wohnungsübergabe vor.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "das",
              "Darüber möchte ich nicht sprechen.",
              "Nicht mein Bereich."
            ],
            "answer": 0,
            "explanation": "Konkret und sachlich kommunizieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich möchte Sie darüber informieren",
              "Das ist zu kompliziert.",
              "Das wurde schon besprochen."
            ],
            "answer": 0,
            "explanation": "Richtig: Ich möchte Sie darüber informieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand stellt dir eine Frage zum Thema Wohnungsübergabe.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Sachlich und professionell antworten.",
              "Das sehe ich anders.",
              "Darüber möchte ich nicht sprechen."
            ],
            "answer": 0,
            "explanation": "Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Ein Freund bittet um einen Gefallen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Das würde ich gerne, aber leider kann ich nicht.",
              "Keine Kommentare.",
              "Das sehe ich anders."
            ],
            "answer": 0,
            "explanation": "Höfliches Ablehnen bewahrt die Freundschaft."
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
        "wrong": "Kurz und knapp.",
        "correct": "Klar, sachlich und höflich.",
        "tip": "Professionelle Kommunikation ist bei Wohnungsübergabe wichtig."
      },
      {
        "wrong": "etwas",
        "correct": "das",
        "tip": "Konkret und sachlich kommunizieren."
      },
      {
        "wrong": "Kurz nicken.",
        "correct": "Sachlich und professionell antworten.",
        "tip": "Professionelle Antworten zeigen Kompetenz."
      }
    ]
  },
  {
    "id": "b1-13",
    "level": "B1",
    "title": "Elterngeld",
    "titleDe": "Elterngeld beantragen",
    "icon": "👶",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Elterngeld beantragen.",
            "question": "Wie formulierst du das professionell?",
            "options": [
              "Klar, sachlich und höflich.",
              "Kurz und knapp.",
              "Gar nicht."
            ],
            "answer": 0,
            "explanation": "Professionelle Kommunikation ist bei Elterngeld beantragen wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du bereitest dich auf Elterngeld beantragen vor.",
            "question": "Ich würde gerne ___ besprechen.",
            "options": [
              "das",
              "etwas",
              "alles"
            ],
            "answer": "das",
            "explanation": "Konkret und sachlich kommunizieren."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sie",
              "Ich",
              "informieren",
              "möchte",
              "darüber"
            ],
            "answer": [
              1,
              3,
              0,
              4,
              2
            ],
            "explanation": "Richtig: Ich möchte Sie darüber informieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand stellt dir eine Frage zum Thema Elterngeld beantragen.",
            "question": "Wie reagierst du?",
            "options": [
              "Sachlich und professionell antworten.",
              "Kurz nicken.",
              "Die Frage ignorieren."
            ],
            "answer": 0,
            "explanation": "Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bekommst konstruktive Kritik.",
            "question": "Wie reagierst du?",
            "options": [
              "Danke für das Feedback, ich werde daran arbeiten.",
              "Das stimmt nicht.",
              "Mir egal."
            ],
            "answer": 0,
            "explanation": "Feedback anzunehmen zeigt Professionalität."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Elterngeld beantragen.",
            "question": "Professionelle ___ ist bei Elterngeld beantragen wichtig.",
            "options": [
              "Kommunikation",
              "gut",
              "möchte"
            ],
            "answer": "Kommunikation",
            "explanation": "Professionelle Kommunikation ist bei Elterngeld beantragen wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du bereitest dich auf Elterngeld beantragen vor.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "sachlich",
              "Konkret",
              "und",
              "kommunizieren"
            ],
            "answer": [
              1,
              2,
              0,
              3
            ],
            "explanation": "Richtig: Konkret und sachlich kommunizieren."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Ich möchte Sie darüber ___.",
            "options": [
              "informieren",
              "dort",
              "Antwort"
            ],
            "answer": "informieren",
            "explanation": "Ich möchte Sie darüber informieren."
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand stellt dir eine Frage zum Thema Elterngeld beantragen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Kompetenz",
              "zeigen",
              "Antworten",
              "Professionelle"
            ],
            "answer": [
              3,
              2,
              1,
              0
            ],
            "explanation": "Richtig: Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "fill_blank",
            "situation": "Du bekommst konstruktive Kritik.",
            "question": "Feedback ___ zeigt Professionalität.",
            "options": [
              "anzunehmen",
              "gerne",
              "sage"
            ],
            "answer": "anzunehmen",
            "explanation": "Feedback anzunehmen zeigt Professionalität."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Elterngeld beantragen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Klar, sachlich und höflich.",
              "Das wurde schon besprochen.",
              "Darüber möchte ich nicht sprechen."
            ],
            "answer": 0,
            "explanation": "Professionelle Kommunikation ist bei Elterngeld beantragen wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bereitest dich auf Elterngeld beantragen vor.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "das",
              "Das betrifft mich nicht.",
              "Damit habe ich nichts zu tun."
            ],
            "answer": 0,
            "explanation": "Konkret und sachlich kommunizieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich möchte Sie darüber informieren",
              "Das interessiert mich nicht.",
              "Darüber möchte ich nicht sprechen."
            ],
            "answer": 0,
            "explanation": "Richtig: Ich möchte Sie darüber informieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand stellt dir eine Frage zum Thema Elterngeld beantragen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Sachlich und professionell antworten.",
              "Keine Kommentare.",
              "Das betrifft mich nicht."
            ],
            "answer": 0,
            "explanation": "Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bekommst konstruktive Kritik.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Danke für das Feedback, ich werde daran arbeiten.",
              "Darüber möchte ich nicht sprechen.",
              "Das sehe ich anders."
            ],
            "answer": 0,
            "explanation": "Feedback anzunehmen zeigt Professionalität."
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
        "wrong": "Kurz und knapp.",
        "correct": "Klar, sachlich und höflich.",
        "tip": "Professionelle Kommunikation ist bei Elterngeld beantragen wichtig."
      },
      {
        "wrong": "etwas",
        "correct": "das",
        "tip": "Konkret und sachlich kommunizieren."
      },
      {
        "wrong": "Kurz nicken.",
        "correct": "Sachlich und professionell antworten.",
        "tip": "Professionelle Antworten zeigen Kompetenz."
      }
    ]
  },
  {
    "id": "b1-14",
    "level": "B1",
    "title": "Arbeitszeugnis",
    "titleDe": "Arbeitszeugnis lesen",
    "icon": "📄",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Arbeitszeugnis lesen.",
            "question": "Wie formulierst du das professionell?",
            "options": [
              "Klar, sachlich und höflich.",
              "Kurz und knapp.",
              "Gar nicht."
            ],
            "answer": 0,
            "explanation": "Professionelle Kommunikation ist bei Arbeitszeugnis lesen wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du bereitest dich auf Arbeitszeugnis lesen vor.",
            "question": "Ich würde gerne ___ besprechen.",
            "options": [
              "das",
              "etwas",
              "alles"
            ],
            "answer": "das",
            "explanation": "Konkret und sachlich kommunizieren."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sie",
              "Ich",
              "informieren",
              "möchte",
              "darüber"
            ],
            "answer": [
              1,
              3,
              0,
              4,
              2
            ],
            "explanation": "Richtig: Ich möchte Sie darüber informieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand stellt dir eine Frage zum Thema Arbeitszeugnis lesen.",
            "question": "Wie reagierst du?",
            "options": [
              "Sachlich und professionell antworten.",
              "Kurz nicken.",
              "Die Frage ignorieren."
            ],
            "answer": 0,
            "explanation": "Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Dein Vermieter erhöht die Miete.",
            "question": "Wie reagierst du?",
            "options": [
              "Ich prüfe, ob die Erhöhung rechtlich zulässig ist.",
              "Ich ziehe sofort aus.",
              "Ich bezahle einfach mehr."
            ],
            "answer": 0,
            "explanation": "Mieterhöhungen müssen gesetzlich begründet sein."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Arbeitszeugnis lesen.",
            "question": "Professionelle ___ ist bei Arbeitszeugnis lesen wichtig.",
            "options": [
              "Kommunikation",
              "Frage",
              "Adresse"
            ],
            "answer": "Kommunikation",
            "explanation": "Professionelle Kommunikation ist bei Arbeitszeugnis lesen wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du bereitest dich auf Arbeitszeugnis lesen vor.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "sachlich",
              "kommunizieren",
              "Konkret",
              "und"
            ],
            "answer": [
              2,
              3,
              0,
              1
            ],
            "explanation": "Richtig: Konkret und sachlich kommunizieren."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Ich möchte Sie ___ informieren.",
            "options": [
              "darüber",
              "Geld",
              "Name"
            ],
            "answer": "darüber",
            "explanation": "Ich möchte Sie darüber informieren."
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand stellt dir eine Frage zum Thema Arbeitszeugnis lesen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "zeigen",
              "Professionelle",
              "Antworten",
              "Kompetenz"
            ],
            "answer": [
              1,
              2,
              0,
              3
            ],
            "explanation": "Richtig: Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "fill_blank",
            "situation": "Dein Vermieter erhöht die Miete.",
            "question": "Mieterhöhungen müssen ___ begründet sein.",
            "options": [
              "gesetzlich",
              "jetzt",
              "Hilfe"
            ],
            "answer": "gesetzlich",
            "explanation": "Mieterhöhungen müssen gesetzlich begründet sein."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Arbeitszeugnis lesen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Klar, sachlich und höflich.",
              "Darüber möchte ich nicht sprechen.",
              "Ich lehne das ab."
            ],
            "answer": 0,
            "explanation": "Professionelle Kommunikation ist bei Arbeitszeugnis lesen wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bereitest dich auf Arbeitszeugnis lesen vor.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "das",
              "Keine Kommentare.",
              "Damit habe ich nichts zu tun."
            ],
            "answer": 0,
            "explanation": "Konkret und sachlich kommunizieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich möchte Sie darüber informieren",
              "Keine Kommentare.",
              "Ich lehne das ab."
            ],
            "answer": 0,
            "explanation": "Richtig: Ich möchte Sie darüber informieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand stellt dir eine Frage zum Thema Arbeitszeugnis lesen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Sachlich und professionell antworten.",
              "Kein Bedarf.",
              "Das ist zu kompliziert."
            ],
            "answer": 0,
            "explanation": "Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Dein Vermieter erhöht die Miete.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich prüfe, ob die Erhöhung rechtlich zulässig ist.",
              "Das betrifft mich nicht.",
              "Kein Bedarf."
            ],
            "answer": 0,
            "explanation": "Mieterhöhungen müssen gesetzlich begründet sein."
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
        "wrong": "Kurz und knapp.",
        "correct": "Klar, sachlich und höflich.",
        "tip": "Professionelle Kommunikation ist bei Arbeitszeugnis lesen wichtig."
      },
      {
        "wrong": "etwas",
        "correct": "das",
        "tip": "Konkret und sachlich kommunizieren."
      },
      {
        "wrong": "Kurz nicken.",
        "correct": "Sachlich und professionell antworten.",
        "tip": "Professionelle Antworten zeigen Kompetenz."
      }
    ]
  },
  {
    "id": "b1-15",
    "level": "B1",
    "title": "Versicherungsfall",
    "titleDe": "Einen Versicherungsfall melden",
    "icon": "🛡️",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Einen Versicherungsfall melden.",
            "question": "Wie formulierst du das professionell?",
            "options": [
              "Klar, sachlich und höflich.",
              "Kurz und knapp.",
              "Gar nicht."
            ],
            "answer": 0,
            "explanation": "Professionelle Kommunikation ist bei Einen Versicherungsfall melden wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du bereitest dich auf Einen Versicherungsfall melden vor.",
            "question": "Ich würde gerne ___ besprechen.",
            "options": [
              "das",
              "etwas",
              "alles"
            ],
            "answer": "das",
            "explanation": "Konkret und sachlich kommunizieren."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sie",
              "Ich",
              "informieren",
              "möchte",
              "darüber"
            ],
            "answer": [
              1,
              3,
              0,
              4,
              2
            ],
            "explanation": "Richtig: Ich möchte Sie darüber informieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand stellt dir eine Frage zum Thema Einen Versicherungsfall melden.",
            "question": "Wie reagierst du?",
            "options": [
              "Sachlich und professionell antworten.",
              "Kurz nicken.",
              "Die Frage ignorieren."
            ],
            "answer": 0,
            "explanation": "Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bewirbst dich auf eine Stelle.",
            "question": "Was ist wichtig?",
            "options": [
              "Ein professionelles Anschreiben und Lebenslauf.",
              "Nur meinen Namen schicken.",
              "Anrufen und fragen."
            ],
            "answer": 0,
            "explanation": "Bewerbungsunterlagen müssen vollständig und professionell sein."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Einen Versicherungsfall melden.",
            "question": "Professionelle Kommunikation ist ___ Einen Versicherungsfall melden wichtig.",
            "options": [
              "bei",
              "gut",
              "dort"
            ],
            "answer": "bei",
            "explanation": "Professionelle Kommunikation ist bei Einen Versicherungsfall melden wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du bereitest dich auf Einen Versicherungsfall melden vor.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "sachlich",
              "kommunizieren",
              "Konkret",
              "und"
            ],
            "answer": [
              2,
              3,
              0,
              1
            ],
            "explanation": "Richtig: Konkret und sachlich kommunizieren."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Ich möchte Sie ___ informieren.",
            "options": [
              "darüber",
              "gehe",
              "Termin"
            ],
            "answer": "darüber",
            "explanation": "Ich möchte Sie darüber informieren."
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand stellt dir eine Frage zum Thema Einen Versicherungsfall melden.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Kompetenz",
              "Professionelle",
              "zeigen",
              "Antworten"
            ],
            "answer": [
              1,
              3,
              2,
              0
            ],
            "explanation": "Richtig: Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "fill_blank",
            "situation": "Du bewirbst dich auf eine Stelle.",
            "question": "Bewerbungsunterlagen ___ vollständig und professionell sein.",
            "options": [
              "müssen",
              "hier",
              "Adresse"
            ],
            "answer": "müssen",
            "explanation": "Bewerbungsunterlagen müssen vollständig und professionell sein."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Einen Versicherungsfall melden.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Klar, sachlich und höflich.",
              "Das wurde schon besprochen.",
              "Das betrifft mich nicht."
            ],
            "answer": 0,
            "explanation": "Professionelle Kommunikation ist bei Einen Versicherungsfall melden wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bereitest dich auf Einen Versicherungsfall melden vor.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "das",
              "Das ist zu kompliziert.",
              "Kein Bedarf."
            ],
            "answer": 0,
            "explanation": "Konkret und sachlich kommunizieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich möchte Sie darüber informieren",
              "Darüber möchte ich nicht sprechen.",
              "Kein Bedarf."
            ],
            "answer": 0,
            "explanation": "Richtig: Ich möchte Sie darüber informieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand stellt dir eine Frage zum Thema Einen Versicherungsfall melden.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Sachlich und professionell antworten.",
              "Das wurde schon besprochen.",
              "Das betrifft mich nicht."
            ],
            "answer": 0,
            "explanation": "Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bewirbst dich auf eine Stelle.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ein professionelles Anschreiben und Lebenslauf.",
              "Das sehe ich anders.",
              "Das wurde schon besprochen."
            ],
            "answer": 0,
            "explanation": "Bewerbungsunterlagen müssen vollständig und professionell sein."
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
        "wrong": "Kurz und knapp.",
        "correct": "Klar, sachlich und höflich.",
        "tip": "Professionelle Kommunikation ist bei Einen Versicherungsfall melden wichtig."
      },
      {
        "wrong": "etwas",
        "correct": "das",
        "tip": "Konkret und sachlich kommunizieren."
      },
      {
        "wrong": "Kurz nicken.",
        "correct": "Sachlich und professionell antworten.",
        "tip": "Professionelle Antworten zeigen Kompetenz."
      }
    ]
  },
  {
    "id": "b1-16",
    "level": "B1",
    "title": "Nachbarschaftsstreit",
    "titleDe": "Nachbarschaftsstreit lösen",
    "icon": "🏘️",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Nachbarschaftsstreit lösen.",
            "question": "Wie formulierst du das professionell?",
            "options": [
              "Klar, sachlich und höflich.",
              "Kurz und knapp.",
              "Gar nicht."
            ],
            "answer": 0,
            "explanation": "Professionelle Kommunikation ist bei Nachbarschaftsstreit lösen wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du bereitest dich auf Nachbarschaftsstreit lösen vor.",
            "question": "Ich würde gerne ___ besprechen.",
            "options": [
              "das",
              "etwas",
              "alles"
            ],
            "answer": "das",
            "explanation": "Konkret und sachlich kommunizieren."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sie",
              "Ich",
              "informieren",
              "möchte",
              "darüber"
            ],
            "answer": [
              1,
              3,
              0,
              4,
              2
            ],
            "explanation": "Richtig: Ich möchte Sie darüber informieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand stellt dir eine Frage zum Thema Nachbarschaftsstreit lösen.",
            "question": "Wie reagierst du?",
            "options": [
              "Sachlich und professionell antworten.",
              "Kurz nicken.",
              "Die Frage ignorieren."
            ],
            "answer": 0,
            "explanation": "Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du hast eine Frist verpasst.",
            "question": "Was machst du?",
            "options": [
              "Ich kontaktiere die Stelle und bitte um Verlängerung.",
              "Ich ignoriere es.",
              "Ich warte ab."
            ],
            "answer": 0,
            "explanation": "Proaktive Kommunikation hilft bei verpassten Fristen."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Nachbarschaftsstreit lösen.",
            "question": "Professionelle Kommunikation ist bei Nachbarschaftsstreit lösen ___.",
            "options": [
              "wichtig",
              "gut",
              "schlecht"
            ],
            "answer": "wichtig",
            "explanation": "Professionelle Kommunikation ist bei Nachbarschaftsstreit lösen wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du bereitest dich auf Nachbarschaftsstreit lösen vor.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "kommunizieren",
              "sachlich",
              "und",
              "Konkret"
            ],
            "answer": [
              3,
              2,
              1,
              0
            ],
            "explanation": "Richtig: Konkret und sachlich kommunizieren."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Ich möchte ___ darüber informieren.",
            "options": [
              "Sie",
              "nötig",
              "sage"
            ],
            "answer": "Sie",
            "explanation": "Ich möchte Sie darüber informieren."
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand stellt dir eine Frage zum Thema Nachbarschaftsstreit lösen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "zeigen",
              "Antworten",
              "Kompetenz",
              "Professionelle"
            ],
            "answer": [
              3,
              1,
              0,
              2
            ],
            "explanation": "Richtig: Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "fill_blank",
            "situation": "Du hast eine Frist verpasst.",
            "question": "Proaktive Kommunikation ___ bei verpassten Fristen.",
            "options": [
              "hilft",
              "leider",
              "schnell"
            ],
            "answer": "hilft",
            "explanation": "Proaktive Kommunikation hilft bei verpassten Fristen."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Nachbarschaftsstreit lösen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Klar, sachlich und höflich.",
              "Das interessiert mich nicht.",
              "Das wurde schon besprochen."
            ],
            "answer": 0,
            "explanation": "Professionelle Kommunikation ist bei Nachbarschaftsstreit lösen wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bereitest dich auf Nachbarschaftsstreit lösen vor.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "das",
              "Das wurde schon besprochen.",
              "Nicht mein Bereich."
            ],
            "answer": 0,
            "explanation": "Konkret und sachlich kommunizieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich möchte Sie darüber informieren",
              "Das interessiert mich nicht.",
              "Das ist zu kompliziert."
            ],
            "answer": 0,
            "explanation": "Richtig: Ich möchte Sie darüber informieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand stellt dir eine Frage zum Thema Nachbarschaftsstreit lösen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Sachlich und professionell antworten.",
              "Ich bin nicht zuständig.",
              "Ich lehne das ab."
            ],
            "answer": 0,
            "explanation": "Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du hast eine Frist verpasst.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich kontaktiere die Stelle und bitte um Verlängerung.",
              "Nicht mein Bereich.",
              "Keine Kommentare."
            ],
            "answer": 0,
            "explanation": "Proaktive Kommunikation hilft bei verpassten Fristen."
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
        "wrong": "Kurz und knapp.",
        "correct": "Klar, sachlich und höflich.",
        "tip": "Professionelle Kommunikation ist bei Nachbarschaftsstreit lösen wichtig."
      },
      {
        "wrong": "etwas",
        "correct": "das",
        "tip": "Konkret und sachlich kommunizieren."
      },
      {
        "wrong": "Kurz nicken.",
        "correct": "Sachlich und professionell antworten.",
        "tip": "Professionelle Antworten zeigen Kompetenz."
      }
    ]
  },
  {
    "id": "b1-17",
    "level": "B1",
    "title": "Beförderung",
    "titleDe": "Um eine Beförderung bitten",
    "icon": "📈",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Um eine Beförderung bitten.",
            "question": "Wie formulierst du das professionell?",
            "options": [
              "Klar, sachlich und höflich.",
              "Kurz und knapp.",
              "Gar nicht."
            ],
            "answer": 0,
            "explanation": "Professionelle Kommunikation ist bei Um eine Beförderung bitten wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du bereitest dich auf Um eine Beförderung bitten vor.",
            "question": "Ich würde gerne ___ besprechen.",
            "options": [
              "das",
              "etwas",
              "alles"
            ],
            "answer": "das",
            "explanation": "Konkret und sachlich kommunizieren."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sie",
              "Ich",
              "informieren",
              "möchte",
              "darüber"
            ],
            "answer": [
              1,
              3,
              0,
              4,
              2
            ],
            "explanation": "Richtig: Ich möchte Sie darüber informieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand stellt dir eine Frage zum Thema Um eine Beförderung bitten.",
            "question": "Wie reagierst du?",
            "options": [
              "Sachlich und professionell antworten.",
              "Kurz nicken.",
              "Die Frage ignorieren."
            ],
            "answer": 0,
            "explanation": "Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Ein Freund bittet um einen Gefallen.",
            "question": "Wie lehnst du höflich ab?",
            "options": [
              "Das würde ich gerne, aber leider kann ich nicht.",
              "Nein.",
              "Frag jemand anderen."
            ],
            "answer": 0,
            "explanation": "Höfliches Ablehnen bewahrt die Freundschaft."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Um eine Beförderung bitten.",
            "question": "Professionelle Kommunikation ___ bei Um eine Beförderung bitten wichtig.",
            "options": [
              "ist",
              "Adresse",
              "Antwort"
            ],
            "answer": "ist",
            "explanation": "Professionelle Kommunikation ist bei Um eine Beförderung bitten wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du bereitest dich auf Um eine Beförderung bitten vor.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "und",
              "kommunizieren",
              "Konkret",
              "sachlich"
            ],
            "answer": [
              2,
              0,
              3,
              1
            ],
            "explanation": "Richtig: Konkret und sachlich kommunizieren."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Ich möchte Sie darüber ___.",
            "options": [
              "informieren",
              "möglich",
              "richtig"
            ],
            "answer": "informieren",
            "explanation": "Ich möchte Sie darüber informieren."
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand stellt dir eine Frage zum Thema Um eine Beförderung bitten.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Kompetenz",
              "zeigen",
              "Antworten",
              "Professionelle"
            ],
            "answer": [
              3,
              2,
              1,
              0
            ],
            "explanation": "Richtig: Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "fill_blank",
            "situation": "Ein Freund bittet um einen Gefallen.",
            "question": "Höfliches Ablehnen bewahrt ___ Freundschaft.",
            "options": [
              "die",
              "bitte",
              "Adresse"
            ],
            "answer": "die",
            "explanation": "Höfliches Ablehnen bewahrt die Freundschaft."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Um eine Beförderung bitten.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Klar, sachlich und höflich.",
              "Damit habe ich nichts zu tun.",
              "Ich lehne das ab."
            ],
            "answer": 0,
            "explanation": "Professionelle Kommunikation ist bei Um eine Beförderung bitten wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bereitest dich auf Um eine Beförderung bitten vor.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "das",
              "Ich bin nicht zuständig.",
              "Damit habe ich nichts zu tun."
            ],
            "answer": 0,
            "explanation": "Konkret und sachlich kommunizieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich möchte Sie darüber informieren",
              "Ich lehne das ab.",
              "Keine Kommentare."
            ],
            "answer": 0,
            "explanation": "Richtig: Ich möchte Sie darüber informieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand stellt dir eine Frage zum Thema Um eine Beförderung bitten.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Sachlich und professionell antworten.",
              "Das sehe ich anders.",
              "Das ist zu kompliziert."
            ],
            "answer": 0,
            "explanation": "Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Ein Freund bittet um einen Gefallen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Das würde ich gerne, aber leider kann ich nicht.",
              "Das ist zu kompliziert.",
              "Ich bin nicht zuständig."
            ],
            "answer": 0,
            "explanation": "Höfliches Ablehnen bewahrt die Freundschaft."
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
        "wrong": "Kurz und knapp.",
        "correct": "Klar, sachlich und höflich.",
        "tip": "Professionelle Kommunikation ist bei Um eine Beförderung bitten wichtig."
      },
      {
        "wrong": "etwas",
        "correct": "das",
        "tip": "Konkret und sachlich kommunizieren."
      },
      {
        "wrong": "Kurz nicken.",
        "correct": "Sachlich und professionell antworten.",
        "tip": "Professionelle Antworten zeigen Kompetenz."
      }
    ]
  },
  {
    "id": "b1-18",
    "level": "B1",
    "title": "Reklamationsbrief",
    "titleDe": "Einen Reklamationsbrief schreiben",
    "icon": "✍️",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Einen Reklamationsbrief schreiben.",
            "question": "Wie formulierst du das professionell?",
            "options": [
              "Klar, sachlich und höflich.",
              "Kurz und knapp.",
              "Gar nicht."
            ],
            "answer": 0,
            "explanation": "Professionelle Kommunikation ist bei Einen Reklamationsbrief schreiben wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du bereitest dich auf Einen Reklamationsbrief schreiben vor.",
            "question": "Ich würde gerne ___ besprechen.",
            "options": [
              "das",
              "etwas",
              "alles"
            ],
            "answer": "das",
            "explanation": "Konkret und sachlich kommunizieren."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sie",
              "Ich",
              "informieren",
              "möchte",
              "darüber"
            ],
            "answer": [
              1,
              3,
              0,
              4,
              2
            ],
            "explanation": "Richtig: Ich möchte Sie darüber informieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand stellt dir eine Frage zum Thema Einen Reklamationsbrief schreiben.",
            "question": "Wie reagierst du?",
            "options": [
              "Sachlich und professionell antworten.",
              "Kurz nicken.",
              "Die Frage ignorieren."
            ],
            "answer": 0,
            "explanation": "Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bekommst konstruktive Kritik.",
            "question": "Wie reagierst du?",
            "options": [
              "Danke für das Feedback, ich werde daran arbeiten.",
              "Das stimmt nicht.",
              "Mir egal."
            ],
            "answer": 0,
            "explanation": "Feedback anzunehmen zeigt Professionalität."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Einen Reklamationsbrief schreiben.",
            "question": "Professionelle Kommunikation ist bei Einen Reklamationsbrief schreiben ___.",
            "options": [
              "wichtig",
              "richtig",
              "schnell"
            ],
            "answer": "wichtig",
            "explanation": "Professionelle Kommunikation ist bei Einen Reklamationsbrief schreiben wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du bereitest dich auf Einen Reklamationsbrief schreiben vor.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "sachlich",
              "und",
              "Konkret",
              "kommunizieren"
            ],
            "answer": [
              2,
              1,
              0,
              3
            ],
            "explanation": "Richtig: Konkret und sachlich kommunizieren."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Ich möchte Sie darüber ___.",
            "options": [
              "informieren",
              "möglich",
              "wichtig"
            ],
            "answer": "informieren",
            "explanation": "Ich möchte Sie darüber informieren."
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand stellt dir eine Frage zum Thema Einen Reklamationsbrief schreiben.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "zeigen",
              "Professionelle",
              "Kompetenz",
              "Antworten"
            ],
            "answer": [
              1,
              3,
              0,
              2
            ],
            "explanation": "Richtig: Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "fill_blank",
            "situation": "Du bekommst konstruktive Kritik.",
            "question": "Feedback anzunehmen ___ Professionalität.",
            "options": [
              "zeigt",
              "sage",
              "Lösung"
            ],
            "answer": "zeigt",
            "explanation": "Feedback anzunehmen zeigt Professionalität."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Einen Reklamationsbrief schreiben.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Klar, sachlich und höflich.",
              "Nicht mein Bereich.",
              "Darüber möchte ich nicht sprechen."
            ],
            "answer": 0,
            "explanation": "Professionelle Kommunikation ist bei Einen Reklamationsbrief schreiben wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bereitest dich auf Einen Reklamationsbrief schreiben vor.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "das",
              "Das sehe ich anders.",
              "Das interessiert mich nicht."
            ],
            "answer": 0,
            "explanation": "Konkret und sachlich kommunizieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich möchte Sie darüber informieren",
              "Darüber möchte ich nicht sprechen.",
              "Keine Kommentare."
            ],
            "answer": 0,
            "explanation": "Richtig: Ich möchte Sie darüber informieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand stellt dir eine Frage zum Thema Einen Reklamationsbrief schreiben.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Sachlich und professionell antworten.",
              "Kein Bedarf.",
              "Das ist zu kompliziert."
            ],
            "answer": 0,
            "explanation": "Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bekommst konstruktive Kritik.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Danke für das Feedback, ich werde daran arbeiten.",
              "Das betrifft mich nicht.",
              "Ich bin nicht zuständig."
            ],
            "answer": 0,
            "explanation": "Feedback anzunehmen zeigt Professionalität."
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
        "wrong": "Kurz und knapp.",
        "correct": "Klar, sachlich und höflich.",
        "tip": "Professionelle Kommunikation ist bei Einen Reklamationsbrief schreiben wichtig."
      },
      {
        "wrong": "etwas",
        "correct": "das",
        "tip": "Konkret und sachlich kommunizieren."
      },
      {
        "wrong": "Kurz nicken.",
        "correct": "Sachlich und professionell antworten.",
        "tip": "Professionelle Antworten zeigen Kompetenz."
      }
    ]
  },
  {
    "id": "b1-19",
    "level": "B1",
    "title": "Bewerbungsunterlagen",
    "titleDe": "Bewerbungsunterlagen vorbereiten",
    "icon": "📁",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Bewerbungsunterlagen vorbereiten.",
            "question": "Wie formulierst du das professionell?",
            "options": [
              "Klar, sachlich und höflich.",
              "Kurz und knapp.",
              "Gar nicht."
            ],
            "answer": 0,
            "explanation": "Professionelle Kommunikation ist bei Bewerbungsunterlagen vorbereiten wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du bereitest dich auf Bewerbungsunterlagen vorbereiten vor.",
            "question": "Ich würde gerne ___ besprechen.",
            "options": [
              "das",
              "etwas",
              "alles"
            ],
            "answer": "das",
            "explanation": "Konkret und sachlich kommunizieren."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sie",
              "Ich",
              "informieren",
              "möchte",
              "darüber"
            ],
            "answer": [
              1,
              3,
              0,
              4,
              2
            ],
            "explanation": "Richtig: Ich möchte Sie darüber informieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand stellt dir eine Frage zum Thema Bewerbungsunterlagen vorbereiten.",
            "question": "Wie reagierst du?",
            "options": [
              "Sachlich und professionell antworten.",
              "Kurz nicken.",
              "Die Frage ignorieren."
            ],
            "answer": 0,
            "explanation": "Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Dein Vermieter erhöht die Miete.",
            "question": "Wie reagierst du?",
            "options": [
              "Ich prüfe, ob die Erhöhung rechtlich zulässig ist.",
              "Ich ziehe sofort aus.",
              "Ich bezahle einfach mehr."
            ],
            "answer": 0,
            "explanation": "Mieterhöhungen müssen gesetzlich begründet sein."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Bewerbungsunterlagen vorbereiten.",
            "question": "Professionelle Kommunikation ist bei ___ vorbereiten wichtig.",
            "options": [
              "Bewerbungsunterlagen",
              "dort",
              "heute"
            ],
            "answer": "Bewerbungsunterlagen",
            "explanation": "Professionelle Kommunikation ist bei Bewerbungsunterlagen vorbereiten wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du bereitest dich auf Bewerbungsunterlagen vorbereiten vor.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "und",
              "sachlich",
              "kommunizieren",
              "Konkret"
            ],
            "answer": [
              3,
              0,
              1,
              2
            ],
            "explanation": "Richtig: Konkret und sachlich kommunizieren."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Ich möchte ___ darüber informieren.",
            "options": [
              "Sie",
              "schlecht",
              "sage"
            ],
            "answer": "Sie",
            "explanation": "Ich möchte Sie darüber informieren."
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand stellt dir eine Frage zum Thema Bewerbungsunterlagen vorbereiten.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Kompetenz",
              "Professionelle",
              "Antworten",
              "zeigen"
            ],
            "answer": [
              1,
              2,
              3,
              0
            ],
            "explanation": "Richtig: Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "fill_blank",
            "situation": "Dein Vermieter erhöht die Miete.",
            "question": "Mieterhöhungen müssen ___ begründet sein.",
            "options": [
              "gesetzlich",
              "nehme",
              "gerne"
            ],
            "answer": "gesetzlich",
            "explanation": "Mieterhöhungen müssen gesetzlich begründet sein."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Bewerbungsunterlagen vorbereiten.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Klar, sachlich und höflich.",
              "Darüber möchte ich nicht sprechen.",
              "Das sehe ich anders."
            ],
            "answer": 0,
            "explanation": "Professionelle Kommunikation ist bei Bewerbungsunterlagen vorbereiten wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bereitest dich auf Bewerbungsunterlagen vorbereiten vor.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "das",
              "Das ist zu kompliziert.",
              "Das wurde schon besprochen."
            ],
            "answer": 0,
            "explanation": "Konkret und sachlich kommunizieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich möchte Sie darüber informieren",
              "Kein Bedarf.",
              "Das ist zu kompliziert."
            ],
            "answer": 0,
            "explanation": "Richtig: Ich möchte Sie darüber informieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand stellt dir eine Frage zum Thema Bewerbungsunterlagen vorbereiten.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Sachlich und professionell antworten.",
              "Damit habe ich nichts zu tun.",
              "Das ist zu kompliziert."
            ],
            "answer": 0,
            "explanation": "Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Dein Vermieter erhöht die Miete.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich prüfe, ob die Erhöhung rechtlich zulässig ist.",
              "Keine Kommentare.",
              "Das interessiert mich nicht."
            ],
            "answer": 0,
            "explanation": "Mieterhöhungen müssen gesetzlich begründet sein."
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
        "wrong": "Kurz und knapp.",
        "correct": "Klar, sachlich und höflich.",
        "tip": "Professionelle Kommunikation ist bei Bewerbungsunterlagen vorbereiten wichtig."
      },
      {
        "wrong": "etwas",
        "correct": "das",
        "tip": "Konkret und sachlich kommunizieren."
      },
      {
        "wrong": "Kurz nicken.",
        "correct": "Sachlich und professionell antworten.",
        "tip": "Professionelle Antworten zeigen Kompetenz."
      }
    ]
  },
  {
    "id": "b1-20",
    "level": "B1",
    "title": "Arbeitsrecht",
    "titleDe": "Arbeitsrecht Grundlagen",
    "icon": "⚖️",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Arbeitsrecht Grundlagen.",
            "question": "Wie formulierst du das professionell?",
            "options": [
              "Klar, sachlich und höflich.",
              "Kurz und knapp.",
              "Gar nicht."
            ],
            "answer": 0,
            "explanation": "Professionelle Kommunikation ist bei Arbeitsrecht Grundlagen wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du bereitest dich auf Arbeitsrecht Grundlagen vor.",
            "question": "Ich würde gerne ___ besprechen.",
            "options": [
              "das",
              "etwas",
              "alles"
            ],
            "answer": "das",
            "explanation": "Konkret und sachlich kommunizieren."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sie",
              "Ich",
              "informieren",
              "möchte",
              "darüber"
            ],
            "answer": [
              1,
              3,
              0,
              4,
              2
            ],
            "explanation": "Richtig: Ich möchte Sie darüber informieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand stellt dir eine Frage zum Thema Arbeitsrecht Grundlagen.",
            "question": "Wie reagierst du?",
            "options": [
              "Sachlich und professionell antworten.",
              "Kurz nicken.",
              "Die Frage ignorieren."
            ],
            "answer": 0,
            "explanation": "Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bewirbst dich auf eine Stelle.",
            "question": "Was ist wichtig?",
            "options": [
              "Ein professionelles Anschreiben und Lebenslauf.",
              "Nur meinen Namen schicken.",
              "Anrufen und fragen."
            ],
            "answer": 0,
            "explanation": "Bewerbungsunterlagen müssen vollständig und professionell sein."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Arbeitsrecht Grundlagen.",
            "question": "Professionelle Kommunikation ist ___ Arbeitsrecht Grundlagen wichtig.",
            "options": [
              "bei",
              "Geld",
              "gut"
            ],
            "answer": "bei",
            "explanation": "Professionelle Kommunikation ist bei Arbeitsrecht Grundlagen wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du bereitest dich auf Arbeitsrecht Grundlagen vor.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Konkret",
              "kommunizieren",
              "und",
              "sachlich"
            ],
            "answer": [
              0,
              2,
              3,
              1
            ],
            "explanation": "Richtig: Konkret und sachlich kommunizieren."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Ich möchte Sie ___ informieren.",
            "options": [
              "darüber",
              "falsch",
              "richtig"
            ],
            "answer": "darüber",
            "explanation": "Ich möchte Sie darüber informieren."
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand stellt dir eine Frage zum Thema Arbeitsrecht Grundlagen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "zeigen",
              "Antworten",
              "Professionelle",
              "Kompetenz"
            ],
            "answer": [
              2,
              1,
              0,
              3
            ],
            "explanation": "Richtig: Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "fill_blank",
            "situation": "Du bewirbst dich auf eine Stelle.",
            "question": "Bewerbungsunterlagen müssen vollständig ___ professionell sein.",
            "options": [
              "und",
              "sage",
              "Zeit"
            ],
            "answer": "und",
            "explanation": "Bewerbungsunterlagen müssen vollständig und professionell sein."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Arbeitsrecht Grundlagen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Klar, sachlich und höflich.",
              "Das interessiert mich nicht.",
              "Damit habe ich nichts zu tun."
            ],
            "answer": 0,
            "explanation": "Professionelle Kommunikation ist bei Arbeitsrecht Grundlagen wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bereitest dich auf Arbeitsrecht Grundlagen vor.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "das",
              "Das betrifft mich nicht.",
              "Das wurde schon besprochen."
            ],
            "answer": 0,
            "explanation": "Konkret und sachlich kommunizieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich möchte Sie darüber informieren",
              "Das ist zu kompliziert.",
              "Ich lehne das ab."
            ],
            "answer": 0,
            "explanation": "Richtig: Ich möchte Sie darüber informieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand stellt dir eine Frage zum Thema Arbeitsrecht Grundlagen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Sachlich und professionell antworten.",
              "Das betrifft mich nicht.",
              "Ich bin nicht zuständig."
            ],
            "answer": 0,
            "explanation": "Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bewirbst dich auf eine Stelle.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ein professionelles Anschreiben und Lebenslauf.",
              "Keine Kommentare.",
              "Das wurde schon besprochen."
            ],
            "answer": 0,
            "explanation": "Bewerbungsunterlagen müssen vollständig und professionell sein."
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
        "wrong": "Kurz und knapp.",
        "correct": "Klar, sachlich und höflich.",
        "tip": "Professionelle Kommunikation ist bei Arbeitsrecht Grundlagen wichtig."
      },
      {
        "wrong": "etwas",
        "correct": "das",
        "tip": "Konkret und sachlich kommunizieren."
      },
      {
        "wrong": "Kurz nicken.",
        "correct": "Sachlich und professionell antworten.",
        "tip": "Professionelle Antworten zeigen Kompetenz."
      }
    ]
  },
  {
    "id": "b1-21",
    "level": "B1",
    "title": "Bankgespräch",
    "titleDe": "Ein Bankgespräch führen",
    "icon": "🏦",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Ein Bankgespräch führen.",
            "question": "Wie formulierst du das professionell?",
            "options": [
              "Klar, sachlich und höflich.",
              "Kurz und knapp.",
              "Gar nicht."
            ],
            "answer": 0,
            "explanation": "Professionelle Kommunikation ist bei Ein Bankgespräch führen wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du bereitest dich auf Ein Bankgespräch führen vor.",
            "question": "Ich würde gerne ___ besprechen.",
            "options": [
              "das",
              "etwas",
              "alles"
            ],
            "answer": "das",
            "explanation": "Konkret und sachlich kommunizieren."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sie",
              "Ich",
              "informieren",
              "möchte",
              "darüber"
            ],
            "answer": [
              1,
              3,
              0,
              4,
              2
            ],
            "explanation": "Richtig: Ich möchte Sie darüber informieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand stellt dir eine Frage zum Thema Ein Bankgespräch führen.",
            "question": "Wie reagierst du?",
            "options": [
              "Sachlich und professionell antworten.",
              "Kurz nicken.",
              "Die Frage ignorieren."
            ],
            "answer": 0,
            "explanation": "Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du hast eine Frist verpasst.",
            "question": "Was machst du?",
            "options": [
              "Ich kontaktiere die Stelle und bitte um Verlängerung.",
              "Ich ignoriere es.",
              "Ich warte ab."
            ],
            "answer": 0,
            "explanation": "Proaktive Kommunikation hilft bei verpassten Fristen."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Ein Bankgespräch führen.",
            "question": "Professionelle Kommunikation ist bei Ein ___ führen wichtig.",
            "options": [
              "Bankgespräch",
              "leider",
              "Adresse"
            ],
            "answer": "Bankgespräch",
            "explanation": "Professionelle Kommunikation ist bei Ein Bankgespräch führen wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du bereitest dich auf Ein Bankgespräch führen vor.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "und",
              "kommunizieren",
              "Konkret",
              "sachlich"
            ],
            "answer": [
              2,
              0,
              3,
              1
            ],
            "explanation": "Richtig: Konkret und sachlich kommunizieren."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Ich möchte Sie ___ informieren.",
            "options": [
              "darüber",
              "frage",
              "Geld"
            ],
            "answer": "darüber",
            "explanation": "Ich möchte Sie darüber informieren."
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand stellt dir eine Frage zum Thema Ein Bankgespräch führen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Professionelle",
              "zeigen",
              "Kompetenz",
              "Antworten"
            ],
            "answer": [
              0,
              3,
              1,
              2
            ],
            "explanation": "Richtig: Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "fill_blank",
            "situation": "Du hast eine Frist verpasst.",
            "question": "Proaktive Kommunikation hilft ___ verpassten Fristen.",
            "options": [
              "bei",
              "sofort",
              "richtig"
            ],
            "answer": "bei",
            "explanation": "Proaktive Kommunikation hilft bei verpassten Fristen."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Ein Bankgespräch führen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Klar, sachlich und höflich.",
              "Kein Bedarf.",
              "Nicht mein Bereich."
            ],
            "answer": 0,
            "explanation": "Professionelle Kommunikation ist bei Ein Bankgespräch führen wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bereitest dich auf Ein Bankgespräch führen vor.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "das",
              "Kein Bedarf.",
              "Das sehe ich anders."
            ],
            "answer": 0,
            "explanation": "Konkret und sachlich kommunizieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich möchte Sie darüber informieren",
              "Das sehe ich anders.",
              "Ich lehne das ab."
            ],
            "answer": 0,
            "explanation": "Richtig: Ich möchte Sie darüber informieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand stellt dir eine Frage zum Thema Ein Bankgespräch führen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Sachlich und professionell antworten.",
              "Kein Bedarf.",
              "Das interessiert mich nicht."
            ],
            "answer": 0,
            "explanation": "Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du hast eine Frist verpasst.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich kontaktiere die Stelle und bitte um Verlängerung.",
              "Ich lehne das ab.",
              "Kein Bedarf."
            ],
            "answer": 0,
            "explanation": "Proaktive Kommunikation hilft bei verpassten Fristen."
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
        "wrong": "Kurz und knapp.",
        "correct": "Klar, sachlich und höflich.",
        "tip": "Professionelle Kommunikation ist bei Ein Bankgespräch führen wichtig."
      },
      {
        "wrong": "etwas",
        "correct": "das",
        "tip": "Konkret und sachlich kommunizieren."
      },
      {
        "wrong": "Kurz nicken.",
        "correct": "Sachlich und professionell antworten.",
        "tip": "Professionelle Antworten zeigen Kompetenz."
      }
    ]
  },
  {
    "id": "b1-22",
    "level": "B1",
    "title": "Mieterhöhung",
    "titleDe": "Auf eine Mieterhöhung reagieren",
    "icon": "📊",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Auf eine Mieterhöhung reagieren.",
            "question": "Wie formulierst du das professionell?",
            "options": [
              "Klar, sachlich und höflich.",
              "Kurz und knapp.",
              "Gar nicht."
            ],
            "answer": 0,
            "explanation": "Professionelle Kommunikation ist bei Auf eine Mieterhöhung reagieren wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du bereitest dich auf Auf eine Mieterhöhung reagieren vor.",
            "question": "Ich würde gerne ___ besprechen.",
            "options": [
              "das",
              "etwas",
              "alles"
            ],
            "answer": "das",
            "explanation": "Konkret und sachlich kommunizieren."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sie",
              "Ich",
              "informieren",
              "möchte",
              "darüber"
            ],
            "answer": [
              1,
              3,
              0,
              4,
              2
            ],
            "explanation": "Richtig: Ich möchte Sie darüber informieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand stellt dir eine Frage zum Thema Auf eine Mieterhöhung reagieren.",
            "question": "Wie reagierst du?",
            "options": [
              "Sachlich und professionell antworten.",
              "Kurz nicken.",
              "Die Frage ignorieren."
            ],
            "answer": 0,
            "explanation": "Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Ein Freund bittet um einen Gefallen.",
            "question": "Wie lehnst du höflich ab?",
            "options": [
              "Das würde ich gerne, aber leider kann ich nicht.",
              "Nein.",
              "Frag jemand anderen."
            ],
            "answer": 0,
            "explanation": "Höfliches Ablehnen bewahrt die Freundschaft."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Auf eine Mieterhöhung reagieren.",
            "question": "Professionelle Kommunikation ist bei Auf eine Mieterhöhung reagieren ___.",
            "options": [
              "wichtig",
              "richtig",
              "nötig"
            ],
            "answer": "wichtig",
            "explanation": "Professionelle Kommunikation ist bei Auf eine Mieterhöhung reagieren wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du bereitest dich auf Auf eine Mieterhöhung reagieren vor.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "und",
              "kommunizieren",
              "sachlich",
              "Konkret"
            ],
            "answer": [
              3,
              0,
              2,
              1
            ],
            "explanation": "Richtig: Konkret und sachlich kommunizieren."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Ich ___ Sie darüber informieren.",
            "options": [
              "möchte",
              "bin",
              "sage"
            ],
            "answer": "möchte",
            "explanation": "Ich möchte Sie darüber informieren."
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand stellt dir eine Frage zum Thema Auf eine Mieterhöhung reagieren.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "zeigen",
              "Kompetenz",
              "Antworten",
              "Professionelle"
            ],
            "answer": [
              3,
              2,
              0,
              1
            ],
            "explanation": "Richtig: Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "fill_blank",
            "situation": "Ein Freund bittet um einen Gefallen.",
            "question": "Höfliches Ablehnen ___ die Freundschaft.",
            "options": [
              "bewahrt",
              "muss",
              "danke"
            ],
            "answer": "bewahrt",
            "explanation": "Höfliches Ablehnen bewahrt die Freundschaft."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Auf eine Mieterhöhung reagieren.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Klar, sachlich und höflich.",
              "Ich lehne das ab.",
              "Das betrifft mich nicht."
            ],
            "answer": 0,
            "explanation": "Professionelle Kommunikation ist bei Auf eine Mieterhöhung reagieren wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bereitest dich auf Auf eine Mieterhöhung reagieren vor.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "das",
              "Das ist zu kompliziert.",
              "Keine Kommentare."
            ],
            "answer": 0,
            "explanation": "Konkret und sachlich kommunizieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich möchte Sie darüber informieren",
              "Das sehe ich anders.",
              "Das interessiert mich nicht."
            ],
            "answer": 0,
            "explanation": "Richtig: Ich möchte Sie darüber informieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand stellt dir eine Frage zum Thema Auf eine Mieterhöhung reagieren.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Sachlich und professionell antworten.",
              "Das betrifft mich nicht.",
              "Das wurde schon besprochen."
            ],
            "answer": 0,
            "explanation": "Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Ein Freund bittet um einen Gefallen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Das würde ich gerne, aber leider kann ich nicht.",
              "Nicht mein Bereich.",
              "Kein Bedarf."
            ],
            "answer": 0,
            "explanation": "Höfliches Ablehnen bewahrt die Freundschaft."
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
        "wrong": "Kurz und knapp.",
        "correct": "Klar, sachlich und höflich.",
        "tip": "Professionelle Kommunikation ist bei Auf eine Mieterhöhung reagieren wichtig."
      },
      {
        "wrong": "etwas",
        "correct": "das",
        "tip": "Konkret und sachlich kommunizieren."
      },
      {
        "wrong": "Kurz nicken.",
        "correct": "Sachlich und professionell antworten.",
        "tip": "Professionelle Antworten zeigen Kompetenz."
      }
    ]
  },
  {
    "id": "b1-23",
    "level": "B1",
    "title": "Schulprobleme",
    "titleDe": "Schulprobleme besprechen",
    "icon": "📚",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Schulprobleme besprechen.",
            "question": "Wie formulierst du das professionell?",
            "options": [
              "Klar, sachlich und höflich.",
              "Kurz und knapp.",
              "Gar nicht."
            ],
            "answer": 0,
            "explanation": "Professionelle Kommunikation ist bei Schulprobleme besprechen wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du bereitest dich auf Schulprobleme besprechen vor.",
            "question": "Ich würde gerne ___ besprechen.",
            "options": [
              "das",
              "etwas",
              "alles"
            ],
            "answer": "das",
            "explanation": "Konkret und sachlich kommunizieren."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sie",
              "Ich",
              "informieren",
              "möchte",
              "darüber"
            ],
            "answer": [
              1,
              3,
              0,
              4,
              2
            ],
            "explanation": "Richtig: Ich möchte Sie darüber informieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand stellt dir eine Frage zum Thema Schulprobleme besprechen.",
            "question": "Wie reagierst du?",
            "options": [
              "Sachlich und professionell antworten.",
              "Kurz nicken.",
              "Die Frage ignorieren."
            ],
            "answer": 0,
            "explanation": "Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bekommst konstruktive Kritik.",
            "question": "Wie reagierst du?",
            "options": [
              "Danke für das Feedback, ich werde daran arbeiten.",
              "Das stimmt nicht.",
              "Mir egal."
            ],
            "answer": 0,
            "explanation": "Feedback anzunehmen zeigt Professionalität."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Schulprobleme besprechen.",
            "question": "Professionelle Kommunikation ist bei Schulprobleme ___ wichtig.",
            "options": [
              "besprechen",
              "schlecht",
              "hier"
            ],
            "answer": "besprechen",
            "explanation": "Professionelle Kommunikation ist bei Schulprobleme besprechen wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du bereitest dich auf Schulprobleme besprechen vor.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "und",
              "sachlich",
              "Konkret",
              "kommunizieren"
            ],
            "answer": [
              2,
              0,
              1,
              3
            ],
            "explanation": "Richtig: Konkret und sachlich kommunizieren."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Ich möchte Sie darüber ___.",
            "options": [
              "informieren",
              "habe",
              "bin"
            ],
            "answer": "informieren",
            "explanation": "Ich möchte Sie darüber informieren."
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand stellt dir eine Frage zum Thema Schulprobleme besprechen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Professionelle",
              "Antworten",
              "Kompetenz",
              "zeigen"
            ],
            "answer": [
              0,
              1,
              3,
              2
            ],
            "explanation": "Richtig: Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "fill_blank",
            "situation": "Du bekommst konstruktive Kritik.",
            "question": "Feedback ___ zeigt Professionalität.",
            "options": [
              "anzunehmen",
              "falsch",
              "bitte"
            ],
            "answer": "anzunehmen",
            "explanation": "Feedback anzunehmen zeigt Professionalität."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Schulprobleme besprechen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Klar, sachlich und höflich.",
              "Nicht mein Bereich.",
              "Damit habe ich nichts zu tun."
            ],
            "answer": 0,
            "explanation": "Professionelle Kommunikation ist bei Schulprobleme besprechen wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bereitest dich auf Schulprobleme besprechen vor.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "das",
              "Ich lehne das ab.",
              "Darüber möchte ich nicht sprechen."
            ],
            "answer": 0,
            "explanation": "Konkret und sachlich kommunizieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich möchte Sie darüber informieren",
              "Darüber möchte ich nicht sprechen.",
              "Keine Kommentare."
            ],
            "answer": 0,
            "explanation": "Richtig: Ich möchte Sie darüber informieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand stellt dir eine Frage zum Thema Schulprobleme besprechen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Sachlich und professionell antworten.",
              "Ich lehne das ab.",
              "Das ist zu kompliziert."
            ],
            "answer": 0,
            "explanation": "Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bekommst konstruktive Kritik.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Danke für das Feedback, ich werde daran arbeiten.",
              "Das ist zu kompliziert.",
              "Das wurde schon besprochen."
            ],
            "answer": 0,
            "explanation": "Feedback anzunehmen zeigt Professionalität."
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
        "wrong": "Kurz und knapp.",
        "correct": "Klar, sachlich und höflich.",
        "tip": "Professionelle Kommunikation ist bei Schulprobleme besprechen wichtig."
      },
      {
        "wrong": "etwas",
        "correct": "das",
        "tip": "Konkret und sachlich kommunizieren."
      },
      {
        "wrong": "Kurz nicken.",
        "correct": "Sachlich und professionell antworten.",
        "tip": "Professionelle Antworten zeigen Kompetenz."
      }
    ]
  },
  {
    "id": "b1-24",
    "level": "B1",
    "title": "Steuererklärung",
    "titleDe": "Steuererklärung machen",
    "icon": "💰",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Steuererklärung machen.",
            "question": "Wie formulierst du das professionell?",
            "options": [
              "Klar, sachlich und höflich.",
              "Kurz und knapp.",
              "Gar nicht."
            ],
            "answer": 0,
            "explanation": "Professionelle Kommunikation ist bei Steuererklärung machen wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du bereitest dich auf Steuererklärung machen vor.",
            "question": "Ich würde gerne ___ besprechen.",
            "options": [
              "das",
              "etwas",
              "alles"
            ],
            "answer": "das",
            "explanation": "Konkret und sachlich kommunizieren."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sie",
              "Ich",
              "informieren",
              "möchte",
              "darüber"
            ],
            "answer": [
              1,
              3,
              0,
              4,
              2
            ],
            "explanation": "Richtig: Ich möchte Sie darüber informieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand stellt dir eine Frage zum Thema Steuererklärung machen.",
            "question": "Wie reagierst du?",
            "options": [
              "Sachlich und professionell antworten.",
              "Kurz nicken.",
              "Die Frage ignorieren."
            ],
            "answer": 0,
            "explanation": "Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Dein Vermieter erhöht die Miete.",
            "question": "Wie reagierst du?",
            "options": [
              "Ich prüfe, ob die Erhöhung rechtlich zulässig ist.",
              "Ich ziehe sofort aus.",
              "Ich bezahle einfach mehr."
            ],
            "answer": 0,
            "explanation": "Mieterhöhungen müssen gesetzlich begründet sein."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Steuererklärung machen.",
            "question": "Professionelle Kommunikation ist bei Steuererklärung ___ wichtig.",
            "options": [
              "machen",
              "suche",
              "Hilfe"
            ],
            "answer": "machen",
            "explanation": "Professionelle Kommunikation ist bei Steuererklärung machen wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du bereitest dich auf Steuererklärung machen vor.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "kommunizieren",
              "Konkret",
              "und",
              "sachlich"
            ],
            "answer": [
              1,
              2,
              3,
              0
            ],
            "explanation": "Richtig: Konkret und sachlich kommunizieren."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Ich möchte Sie ___ informieren.",
            "options": [
              "darüber",
              "Arbeit",
              "gut"
            ],
            "answer": "darüber",
            "explanation": "Ich möchte Sie darüber informieren."
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand stellt dir eine Frage zum Thema Steuererklärung machen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Kompetenz",
              "Professionelle",
              "zeigen",
              "Antworten"
            ],
            "answer": [
              1,
              3,
              2,
              0
            ],
            "explanation": "Richtig: Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "fill_blank",
            "situation": "Dein Vermieter erhöht die Miete.",
            "question": "Mieterhöhungen müssen gesetzlich ___ sein.",
            "options": [
              "begründet",
              "dort",
              "soll"
            ],
            "answer": "begründet",
            "explanation": "Mieterhöhungen müssen gesetzlich begründet sein."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Steuererklärung machen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Klar, sachlich und höflich.",
              "Nicht mein Bereich.",
              "Kein Bedarf."
            ],
            "answer": 0,
            "explanation": "Professionelle Kommunikation ist bei Steuererklärung machen wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bereitest dich auf Steuererklärung machen vor.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "das",
              "Das betrifft mich nicht.",
              "Darüber möchte ich nicht sprechen."
            ],
            "answer": 0,
            "explanation": "Konkret und sachlich kommunizieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich möchte Sie darüber informieren",
              "Damit habe ich nichts zu tun.",
              "Kein Bedarf."
            ],
            "answer": 0,
            "explanation": "Richtig: Ich möchte Sie darüber informieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand stellt dir eine Frage zum Thema Steuererklärung machen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Sachlich und professionell antworten.",
              "Damit habe ich nichts zu tun.",
              "Keine Kommentare."
            ],
            "answer": 0,
            "explanation": "Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Dein Vermieter erhöht die Miete.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich prüfe, ob die Erhöhung rechtlich zulässig ist.",
              "Das sehe ich anders.",
              "Das betrifft mich nicht."
            ],
            "answer": 0,
            "explanation": "Mieterhöhungen müssen gesetzlich begründet sein."
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
        "wrong": "Kurz und knapp.",
        "correct": "Klar, sachlich und höflich.",
        "tip": "Professionelle Kommunikation ist bei Steuererklärung machen wichtig."
      },
      {
        "wrong": "etwas",
        "correct": "das",
        "tip": "Konkret und sachlich kommunizieren."
      },
      {
        "wrong": "Kurz nicken.",
        "correct": "Sachlich und professionell antworten.",
        "tip": "Professionelle Antworten zeigen Kompetenz."
      }
    ]
  },
  {
    "id": "b1-25",
    "level": "B1",
    "title": "Vorsorge",
    "titleDe": "Vorsorge treffen",
    "icon": "🏥",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Vorsorge treffen.",
            "question": "Wie formulierst du das professionell?",
            "options": [
              "Klar, sachlich und höflich.",
              "Kurz und knapp.",
              "Gar nicht."
            ],
            "answer": 0,
            "explanation": "Professionelle Kommunikation ist bei Vorsorge treffen wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du bereitest dich auf Vorsorge treffen vor.",
            "question": "Ich würde gerne ___ besprechen.",
            "options": [
              "das",
              "etwas",
              "alles"
            ],
            "answer": "das",
            "explanation": "Konkret und sachlich kommunizieren."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sie",
              "Ich",
              "informieren",
              "möchte",
              "darüber"
            ],
            "answer": [
              1,
              3,
              0,
              4,
              2
            ],
            "explanation": "Richtig: Ich möchte Sie darüber informieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand stellt dir eine Frage zum Thema Vorsorge treffen.",
            "question": "Wie reagierst du?",
            "options": [
              "Sachlich und professionell antworten.",
              "Kurz nicken.",
              "Die Frage ignorieren."
            ],
            "answer": 0,
            "explanation": "Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bewirbst dich auf eine Stelle.",
            "question": "Was ist wichtig?",
            "options": [
              "Ein professionelles Anschreiben und Lebenslauf.",
              "Nur meinen Namen schicken.",
              "Anrufen und fragen."
            ],
            "answer": 0,
            "explanation": "Bewerbungsunterlagen müssen vollständig und professionell sein."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Vorsorge treffen.",
            "question": "Professionelle Kommunikation ist bei Vorsorge treffen ___.",
            "options": [
              "wichtig",
              "gut",
              "möglich"
            ],
            "answer": "wichtig",
            "explanation": "Professionelle Kommunikation ist bei Vorsorge treffen wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du bereitest dich auf Vorsorge treffen vor.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "sachlich",
              "kommunizieren",
              "Konkret",
              "und"
            ],
            "answer": [
              2,
              3,
              0,
              1
            ],
            "explanation": "Richtig: Konkret und sachlich kommunizieren."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Ich möchte Sie darüber ___.",
            "options": [
              "informieren",
              "jetzt",
              "Lösung"
            ],
            "answer": "informieren",
            "explanation": "Ich möchte Sie darüber informieren."
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand stellt dir eine Frage zum Thema Vorsorge treffen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Antworten",
              "Kompetenz",
              "zeigen",
              "Professionelle"
            ],
            "answer": [
              3,
              0,
              2,
              1
            ],
            "explanation": "Richtig: Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "fill_blank",
            "situation": "Du bewirbst dich auf eine Stelle.",
            "question": "Bewerbungsunterlagen müssen ___ und professionell sein.",
            "options": [
              "vollständig",
              "sage",
              "bitte"
            ],
            "answer": "vollständig",
            "explanation": "Bewerbungsunterlagen müssen vollständig und professionell sein."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Vorsorge treffen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Klar, sachlich und höflich.",
              "Das wurde schon besprochen.",
              "Das sehe ich anders."
            ],
            "answer": 0,
            "explanation": "Professionelle Kommunikation ist bei Vorsorge treffen wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bereitest dich auf Vorsorge treffen vor.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "das",
              "Ich bin nicht zuständig.",
              "Das betrifft mich nicht."
            ],
            "answer": 0,
            "explanation": "Konkret und sachlich kommunizieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich möchte Sie darüber informieren",
              "Darüber möchte ich nicht sprechen.",
              "Nicht mein Bereich."
            ],
            "answer": 0,
            "explanation": "Richtig: Ich möchte Sie darüber informieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand stellt dir eine Frage zum Thema Vorsorge treffen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Sachlich und professionell antworten.",
              "Ich bin nicht zuständig.",
              "Keine Kommentare."
            ],
            "answer": 0,
            "explanation": "Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bewirbst dich auf eine Stelle.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ein professionelles Anschreiben und Lebenslauf.",
              "Das wurde schon besprochen.",
              "Nicht mein Bereich."
            ],
            "answer": 0,
            "explanation": "Bewerbungsunterlagen müssen vollständig und professionell sein."
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
        "wrong": "Kurz und knapp.",
        "correct": "Klar, sachlich und höflich.",
        "tip": "Professionelle Kommunikation ist bei Vorsorge treffen wichtig."
      },
      {
        "wrong": "etwas",
        "correct": "das",
        "tip": "Konkret und sachlich kommunizieren."
      },
      {
        "wrong": "Kurz nicken.",
        "correct": "Sachlich und professionell antworten.",
        "tip": "Professionelle Antworten zeigen Kompetenz."
      }
    ]
  },
  {
    "id": "b1-26",
    "level": "B1",
    "title": "Geschäftsessen",
    "titleDe": "Beim Geschäftsessen",
    "icon": "🍷",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Beim Geschäftsessen.",
            "question": "Wie formulierst du das professionell?",
            "options": [
              "Klar, sachlich und höflich.",
              "Kurz und knapp.",
              "Gar nicht."
            ],
            "answer": 0,
            "explanation": "Professionelle Kommunikation ist bei Beim Geschäftsessen wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du bereitest dich auf Beim Geschäftsessen vor.",
            "question": "Ich würde gerne ___ besprechen.",
            "options": [
              "das",
              "etwas",
              "alles"
            ],
            "answer": "das",
            "explanation": "Konkret und sachlich kommunizieren."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sie",
              "Ich",
              "informieren",
              "möchte",
              "darüber"
            ],
            "answer": [
              1,
              3,
              0,
              4,
              2
            ],
            "explanation": "Richtig: Ich möchte Sie darüber informieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand stellt dir eine Frage zum Thema Beim Geschäftsessen.",
            "question": "Wie reagierst du?",
            "options": [
              "Sachlich und professionell antworten.",
              "Kurz nicken.",
              "Die Frage ignorieren."
            ],
            "answer": 0,
            "explanation": "Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du hast eine Frist verpasst.",
            "question": "Was machst du?",
            "options": [
              "Ich kontaktiere die Stelle und bitte um Verlängerung.",
              "Ich ignoriere es.",
              "Ich warte ab."
            ],
            "answer": 0,
            "explanation": "Proaktive Kommunikation hilft bei verpassten Fristen."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Beim Geschäftsessen.",
            "question": "Professionelle ___ ist bei Beim Geschäftsessen wichtig.",
            "options": [
              "Kommunikation",
              "mache",
              "Problem"
            ],
            "answer": "Kommunikation",
            "explanation": "Professionelle Kommunikation ist bei Beim Geschäftsessen wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du bereitest dich auf Beim Geschäftsessen vor.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "und",
              "sachlich",
              "kommunizieren",
              "Konkret"
            ],
            "answer": [
              3,
              0,
              1,
              2
            ],
            "explanation": "Richtig: Konkret und sachlich kommunizieren."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Ich möchte Sie darüber ___.",
            "options": [
              "informieren",
              "muss",
              "Antwort"
            ],
            "answer": "informieren",
            "explanation": "Ich möchte Sie darüber informieren."
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand stellt dir eine Frage zum Thema Beim Geschäftsessen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Kompetenz",
              "Professionelle",
              "zeigen",
              "Antworten"
            ],
            "answer": [
              1,
              3,
              2,
              0
            ],
            "explanation": "Richtig: Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "fill_blank",
            "situation": "Du hast eine Frist verpasst.",
            "question": "Proaktive Kommunikation hilft bei verpassten ___.",
            "options": [
              "Fristen",
              "Geld",
              "dort"
            ],
            "answer": "Fristen",
            "explanation": "Proaktive Kommunikation hilft bei verpassten Fristen."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Beim Geschäftsessen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Klar, sachlich und höflich.",
              "Keine Kommentare.",
              "Das interessiert mich nicht."
            ],
            "answer": 0,
            "explanation": "Professionelle Kommunikation ist bei Beim Geschäftsessen wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bereitest dich auf Beim Geschäftsessen vor.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "das",
              "Damit habe ich nichts zu tun.",
              "Ich lehne das ab."
            ],
            "answer": 0,
            "explanation": "Konkret und sachlich kommunizieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich möchte Sie darüber informieren",
              "Kein Bedarf.",
              "Darüber möchte ich nicht sprechen."
            ],
            "answer": 0,
            "explanation": "Richtig: Ich möchte Sie darüber informieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand stellt dir eine Frage zum Thema Beim Geschäftsessen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Sachlich und professionell antworten.",
              "Keine Kommentare.",
              "Das interessiert mich nicht."
            ],
            "answer": 0,
            "explanation": "Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du hast eine Frist verpasst.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich kontaktiere die Stelle und bitte um Verlängerung.",
              "Das betrifft mich nicht.",
              "Darüber möchte ich nicht sprechen."
            ],
            "answer": 0,
            "explanation": "Proaktive Kommunikation hilft bei verpassten Fristen."
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
        "wrong": "Kurz und knapp.",
        "correct": "Klar, sachlich und höflich.",
        "tip": "Professionelle Kommunikation ist bei Beim Geschäftsessen wichtig."
      },
      {
        "wrong": "etwas",
        "correct": "das",
        "tip": "Konkret und sachlich kommunizieren."
      },
      {
        "wrong": "Kurz nicken.",
        "correct": "Sachlich und professionell antworten.",
        "tip": "Professionelle Antworten zeigen Kompetenz."
      }
    ]
  },
  {
    "id": "b1-27",
    "level": "B1",
    "title": "Weiterbildung",
    "titleDe": "Weiterbildung beantragen",
    "icon": "🎓",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Weiterbildung beantragen.",
            "question": "Wie formulierst du das professionell?",
            "options": [
              "Klar, sachlich und höflich.",
              "Kurz und knapp.",
              "Gar nicht."
            ],
            "answer": 0,
            "explanation": "Professionelle Kommunikation ist bei Weiterbildung beantragen wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du bereitest dich auf Weiterbildung beantragen vor.",
            "question": "Ich würde gerne ___ besprechen.",
            "options": [
              "das",
              "etwas",
              "alles"
            ],
            "answer": "das",
            "explanation": "Konkret und sachlich kommunizieren."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sie",
              "Ich",
              "informieren",
              "möchte",
              "darüber"
            ],
            "answer": [
              1,
              3,
              0,
              4,
              2
            ],
            "explanation": "Richtig: Ich möchte Sie darüber informieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand stellt dir eine Frage zum Thema Weiterbildung beantragen.",
            "question": "Wie reagierst du?",
            "options": [
              "Sachlich und professionell antworten.",
              "Kurz nicken.",
              "Die Frage ignorieren."
            ],
            "answer": 0,
            "explanation": "Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Ein Freund bittet um einen Gefallen.",
            "question": "Wie lehnst du höflich ab?",
            "options": [
              "Das würde ich gerne, aber leider kann ich nicht.",
              "Nein.",
              "Frag jemand anderen."
            ],
            "answer": 0,
            "explanation": "Höfliches Ablehnen bewahrt die Freundschaft."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Weiterbildung beantragen.",
            "question": "Professionelle Kommunikation ist bei ___ beantragen wichtig.",
            "options": [
              "Weiterbildung",
              "frage",
              "muss"
            ],
            "answer": "Weiterbildung",
            "explanation": "Professionelle Kommunikation ist bei Weiterbildung beantragen wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du bereitest dich auf Weiterbildung beantragen vor.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Konkret",
              "und",
              "kommunizieren",
              "sachlich"
            ],
            "answer": [
              0,
              1,
              3,
              2
            ],
            "explanation": "Richtig: Konkret und sachlich kommunizieren."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Ich möchte Sie ___ informieren.",
            "options": [
              "darüber",
              "bin",
              "gestern"
            ],
            "answer": "darüber",
            "explanation": "Ich möchte Sie darüber informieren."
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand stellt dir eine Frage zum Thema Weiterbildung beantragen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Professionelle",
              "Kompetenz",
              "Antworten",
              "zeigen"
            ],
            "answer": [
              0,
              2,
              3,
              1
            ],
            "explanation": "Richtig: Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "fill_blank",
            "situation": "Ein Freund bittet um einen Gefallen.",
            "question": "Höfliches Ablehnen ___ die Freundschaft.",
            "options": [
              "bewahrt",
              "Hilfe",
              "möglich"
            ],
            "answer": "bewahrt",
            "explanation": "Höfliches Ablehnen bewahrt die Freundschaft."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Weiterbildung beantragen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Klar, sachlich und höflich.",
              "Damit habe ich nichts zu tun.",
              "Kein Bedarf."
            ],
            "answer": 0,
            "explanation": "Professionelle Kommunikation ist bei Weiterbildung beantragen wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bereitest dich auf Weiterbildung beantragen vor.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "das",
              "Ich lehne das ab.",
              "Nicht mein Bereich."
            ],
            "answer": 0,
            "explanation": "Konkret und sachlich kommunizieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich möchte Sie darüber informieren",
              "Das wurde schon besprochen.",
              "Nicht mein Bereich."
            ],
            "answer": 0,
            "explanation": "Richtig: Ich möchte Sie darüber informieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand stellt dir eine Frage zum Thema Weiterbildung beantragen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Sachlich und professionell antworten.",
              "Damit habe ich nichts zu tun.",
              "Darüber möchte ich nicht sprechen."
            ],
            "answer": 0,
            "explanation": "Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Ein Freund bittet um einen Gefallen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Das würde ich gerne, aber leider kann ich nicht.",
              "Das wurde schon besprochen.",
              "Ich bin nicht zuständig."
            ],
            "answer": 0,
            "explanation": "Höfliches Ablehnen bewahrt die Freundschaft."
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
        "wrong": "Kurz und knapp.",
        "correct": "Klar, sachlich und höflich.",
        "tip": "Professionelle Kommunikation ist bei Weiterbildung beantragen wichtig."
      },
      {
        "wrong": "etwas",
        "correct": "das",
        "tip": "Konkret und sachlich kommunizieren."
      },
      {
        "wrong": "Kurz nicken.",
        "correct": "Sachlich und professionell antworten.",
        "tip": "Professionelle Antworten zeigen Kompetenz."
      }
    ]
  },
  {
    "id": "b1-28",
    "level": "B1",
    "title": "Konflikt lösen",
    "titleDe": "Konflikte am Arbeitsplatz",
    "icon": "⚡",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Konflikte am Arbeitsplatz.",
            "question": "Wie formulierst du das professionell?",
            "options": [
              "Klar, sachlich und höflich.",
              "Kurz und knapp.",
              "Gar nicht."
            ],
            "answer": 0,
            "explanation": "Professionelle Kommunikation ist bei Konflikte am Arbeitsplatz wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du bereitest dich auf Konflikte am Arbeitsplatz vor.",
            "question": "Ich würde gerne ___ besprechen.",
            "options": [
              "das",
              "etwas",
              "alles"
            ],
            "answer": "das",
            "explanation": "Konkret und sachlich kommunizieren."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sie",
              "Ich",
              "informieren",
              "möchte",
              "darüber"
            ],
            "answer": [
              1,
              3,
              0,
              4,
              2
            ],
            "explanation": "Richtig: Ich möchte Sie darüber informieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand stellt dir eine Frage zum Thema Konflikte am Arbeitsplatz.",
            "question": "Wie reagierst du?",
            "options": [
              "Sachlich und professionell antworten.",
              "Kurz nicken.",
              "Die Frage ignorieren."
            ],
            "answer": 0,
            "explanation": "Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bekommst konstruktive Kritik.",
            "question": "Wie reagierst du?",
            "options": [
              "Danke für das Feedback, ich werde daran arbeiten.",
              "Das stimmt nicht.",
              "Mir egal."
            ],
            "answer": 0,
            "explanation": "Feedback anzunehmen zeigt Professionalität."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Konflikte am Arbeitsplatz.",
            "question": "Professionelle Kommunikation ___ bei Konflikte am Arbeitsplatz wichtig.",
            "options": [
              "ist",
              "danke",
              "muss"
            ],
            "answer": "ist",
            "explanation": "Professionelle Kommunikation ist bei Konflikte am Arbeitsplatz wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du bereitest dich auf Konflikte am Arbeitsplatz vor.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "sachlich",
              "kommunizieren",
              "und",
              "Konkret"
            ],
            "answer": [
              3,
              2,
              0,
              1
            ],
            "explanation": "Richtig: Konkret und sachlich kommunizieren."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Ich möchte Sie darüber ___.",
            "options": [
              "informieren",
              "danke",
              "gestern"
            ],
            "answer": "informieren",
            "explanation": "Ich möchte Sie darüber informieren."
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand stellt dir eine Frage zum Thema Konflikte am Arbeitsplatz.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Professionelle",
              "Kompetenz",
              "zeigen",
              "Antworten"
            ],
            "answer": [
              0,
              3,
              2,
              1
            ],
            "explanation": "Richtig: Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "fill_blank",
            "situation": "Du bekommst konstruktive Kritik.",
            "question": "Feedback anzunehmen ___ Professionalität.",
            "options": [
              "zeigt",
              "Zeit",
              "darf"
            ],
            "answer": "zeigt",
            "explanation": "Feedback anzunehmen zeigt Professionalität."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Konflikte am Arbeitsplatz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Klar, sachlich und höflich.",
              "Darüber möchte ich nicht sprechen.",
              "Das betrifft mich nicht."
            ],
            "answer": 0,
            "explanation": "Professionelle Kommunikation ist bei Konflikte am Arbeitsplatz wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bereitest dich auf Konflikte am Arbeitsplatz vor.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "das",
              "Ich bin nicht zuständig.",
              "Das sehe ich anders."
            ],
            "answer": 0,
            "explanation": "Konkret und sachlich kommunizieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich möchte Sie darüber informieren",
              "Das interessiert mich nicht.",
              "Ich bin nicht zuständig."
            ],
            "answer": 0,
            "explanation": "Richtig: Ich möchte Sie darüber informieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand stellt dir eine Frage zum Thema Konflikte am Arbeitsplatz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Sachlich und professionell antworten.",
              "Darüber möchte ich nicht sprechen.",
              "Ich lehne das ab."
            ],
            "answer": 0,
            "explanation": "Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bekommst konstruktive Kritik.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Danke für das Feedback, ich werde daran arbeiten.",
              "Darüber möchte ich nicht sprechen.",
              "Ich lehne das ab."
            ],
            "answer": 0,
            "explanation": "Feedback anzunehmen zeigt Professionalität."
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
        "wrong": "Kurz und knapp.",
        "correct": "Klar, sachlich und höflich.",
        "tip": "Professionelle Kommunikation ist bei Konflikte am Arbeitsplatz wichtig."
      },
      {
        "wrong": "etwas",
        "correct": "das",
        "tip": "Konkret und sachlich kommunizieren."
      },
      {
        "wrong": "Kurz nicken.",
        "correct": "Sachlich und professionell antworten.",
        "tip": "Professionelle Antworten zeigen Kompetenz."
      }
    ]
  },
  {
    "id": "b1-29",
    "level": "B1",
    "title": "Mietvertrag kündigen",
    "titleDe": "Mietvertrag kündigen",
    "icon": "📃",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Mietvertrag kündigen.",
            "question": "Wie formulierst du das professionell?",
            "options": [
              "Klar, sachlich und höflich.",
              "Kurz und knapp.",
              "Gar nicht."
            ],
            "answer": 0,
            "explanation": "Professionelle Kommunikation ist bei Mietvertrag kündigen wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du bereitest dich auf Mietvertrag kündigen vor.",
            "question": "Ich würde gerne ___ besprechen.",
            "options": [
              "das",
              "etwas",
              "alles"
            ],
            "answer": "das",
            "explanation": "Konkret und sachlich kommunizieren."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sie",
              "Ich",
              "informieren",
              "möchte",
              "darüber"
            ],
            "answer": [
              1,
              3,
              0,
              4,
              2
            ],
            "explanation": "Richtig: Ich möchte Sie darüber informieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand stellt dir eine Frage zum Thema Mietvertrag kündigen.",
            "question": "Wie reagierst du?",
            "options": [
              "Sachlich und professionell antworten.",
              "Kurz nicken.",
              "Die Frage ignorieren."
            ],
            "answer": 0,
            "explanation": "Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Dein Vermieter erhöht die Miete.",
            "question": "Wie reagierst du?",
            "options": [
              "Ich prüfe, ob die Erhöhung rechtlich zulässig ist.",
              "Ich ziehe sofort aus.",
              "Ich bezahle einfach mehr."
            ],
            "answer": 0,
            "explanation": "Mieterhöhungen müssen gesetzlich begründet sein."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Mietvertrag kündigen.",
            "question": "Professionelle Kommunikation ist bei ___ kündigen wichtig.",
            "options": [
              "Mietvertrag",
              "Name",
              "möglich"
            ],
            "answer": "Mietvertrag",
            "explanation": "Professionelle Kommunikation ist bei Mietvertrag kündigen wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du bereitest dich auf Mietvertrag kündigen vor.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "und",
              "sachlich",
              "Konkret",
              "kommunizieren"
            ],
            "answer": [
              2,
              0,
              1,
              3
            ],
            "explanation": "Richtig: Konkret und sachlich kommunizieren."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Ich ___ Sie darüber informieren.",
            "options": [
              "möchte",
              "nehme",
              "gehe"
            ],
            "answer": "möchte",
            "explanation": "Ich möchte Sie darüber informieren."
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand stellt dir eine Frage zum Thema Mietvertrag kündigen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Kompetenz",
              "Antworten",
              "zeigen",
              "Professionelle"
            ],
            "answer": [
              3,
              1,
              2,
              0
            ],
            "explanation": "Richtig: Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "fill_blank",
            "situation": "Dein Vermieter erhöht die Miete.",
            "question": "Mieterhöhungen müssen gesetzlich begründet ___.",
            "options": [
              "sein",
              "habe",
              "Frage"
            ],
            "answer": "sein",
            "explanation": "Mieterhöhungen müssen gesetzlich begründet sein."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Mietvertrag kündigen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Klar, sachlich und höflich.",
              "Damit habe ich nichts zu tun.",
              "Kein Bedarf."
            ],
            "answer": 0,
            "explanation": "Professionelle Kommunikation ist bei Mietvertrag kündigen wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bereitest dich auf Mietvertrag kündigen vor.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "das",
              "Darüber möchte ich nicht sprechen.",
              "Keine Kommentare."
            ],
            "answer": 0,
            "explanation": "Konkret und sachlich kommunizieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich möchte Sie darüber informieren",
              "Das ist zu kompliziert.",
              "Das wurde schon besprochen."
            ],
            "answer": 0,
            "explanation": "Richtig: Ich möchte Sie darüber informieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand stellt dir eine Frage zum Thema Mietvertrag kündigen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Sachlich und professionell antworten.",
              "Keine Kommentare.",
              "Ich lehne das ab."
            ],
            "answer": 0,
            "explanation": "Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Dein Vermieter erhöht die Miete.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich prüfe, ob die Erhöhung rechtlich zulässig ist.",
              "Nicht mein Bereich.",
              "Damit habe ich nichts zu tun."
            ],
            "answer": 0,
            "explanation": "Mieterhöhungen müssen gesetzlich begründet sein."
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
        "wrong": "Kurz und knapp.",
        "correct": "Klar, sachlich und höflich.",
        "tip": "Professionelle Kommunikation ist bei Mietvertrag kündigen wichtig."
      },
      {
        "wrong": "etwas",
        "correct": "das",
        "tip": "Konkret und sachlich kommunizieren."
      },
      {
        "wrong": "Kurz nicken.",
        "correct": "Sachlich und professionell antworten.",
        "tip": "Professionelle Antworten zeigen Kompetenz."
      }
    ]
  },
  {
    "id": "b1-30",
    "level": "B1",
    "title": "Anwalt konsultieren",
    "titleDe": "Einen Anwalt aufsuchen",
    "icon": "👨‍⚖️",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Einen Anwalt aufsuchen.",
            "question": "Wie formulierst du das professionell?",
            "options": [
              "Klar, sachlich und höflich.",
              "Kurz und knapp.",
              "Gar nicht."
            ],
            "answer": 0,
            "explanation": "Professionelle Kommunikation ist bei Einen Anwalt aufsuchen wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du bereitest dich auf Einen Anwalt aufsuchen vor.",
            "question": "Ich würde gerne ___ besprechen.",
            "options": [
              "das",
              "etwas",
              "alles"
            ],
            "answer": "das",
            "explanation": "Konkret und sachlich kommunizieren."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sie",
              "Ich",
              "informieren",
              "möchte",
              "darüber"
            ],
            "answer": [
              1,
              3,
              0,
              4,
              2
            ],
            "explanation": "Richtig: Ich möchte Sie darüber informieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand stellt dir eine Frage zum Thema Einen Anwalt aufsuchen.",
            "question": "Wie reagierst du?",
            "options": [
              "Sachlich und professionell antworten.",
              "Kurz nicken.",
              "Die Frage ignorieren."
            ],
            "answer": 0,
            "explanation": "Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bewirbst dich auf eine Stelle.",
            "question": "Was ist wichtig?",
            "options": [
              "Ein professionelles Anschreiben und Lebenslauf.",
              "Nur meinen Namen schicken.",
              "Anrufen und fragen."
            ],
            "answer": 0,
            "explanation": "Bewerbungsunterlagen müssen vollständig und professionell sein."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Einen Anwalt aufsuchen.",
            "question": "Professionelle Kommunikation ___ bei Einen Anwalt aufsuchen wichtig.",
            "options": [
              "ist",
              "möchte",
              "Termin"
            ],
            "answer": "ist",
            "explanation": "Professionelle Kommunikation ist bei Einen Anwalt aufsuchen wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du bereitest dich auf Einen Anwalt aufsuchen vor.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Konkret",
              "kommunizieren",
              "und",
              "sachlich"
            ],
            "answer": [
              0,
              2,
              3,
              1
            ],
            "explanation": "Richtig: Konkret und sachlich kommunizieren."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Ich möchte ___ darüber informieren.",
            "options": [
              "Sie",
              "muss",
              "komme"
            ],
            "answer": "Sie",
            "explanation": "Ich möchte Sie darüber informieren."
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand stellt dir eine Frage zum Thema Einen Anwalt aufsuchen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Professionelle",
              "zeigen",
              "Antworten",
              "Kompetenz"
            ],
            "answer": [
              0,
              2,
              1,
              3
            ],
            "explanation": "Richtig: Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "fill_blank",
            "situation": "Du bewirbst dich auf eine Stelle.",
            "question": "Bewerbungsunterlagen müssen vollständig ___ professionell sein.",
            "options": [
              "und",
              "schlecht",
              "muss"
            ],
            "answer": "und",
            "explanation": "Bewerbungsunterlagen müssen vollständig und professionell sein."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Einen Anwalt aufsuchen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Klar, sachlich und höflich.",
              "Das interessiert mich nicht.",
              "Ich bin nicht zuständig."
            ],
            "answer": 0,
            "explanation": "Professionelle Kommunikation ist bei Einen Anwalt aufsuchen wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bereitest dich auf Einen Anwalt aufsuchen vor.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "das",
              "Das ist zu kompliziert.",
              "Nicht mein Bereich."
            ],
            "answer": 0,
            "explanation": "Konkret und sachlich kommunizieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich möchte Sie darüber informieren",
              "Das sehe ich anders.",
              "Das wurde schon besprochen."
            ],
            "answer": 0,
            "explanation": "Richtig: Ich möchte Sie darüber informieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand stellt dir eine Frage zum Thema Einen Anwalt aufsuchen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Sachlich und professionell antworten.",
              "Das wurde schon besprochen.",
              "Das ist zu kompliziert."
            ],
            "answer": 0,
            "explanation": "Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bewirbst dich auf eine Stelle.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ein professionelles Anschreiben und Lebenslauf.",
              "Das sehe ich anders.",
              "Darüber möchte ich nicht sprechen."
            ],
            "answer": 0,
            "explanation": "Bewerbungsunterlagen müssen vollständig und professionell sein."
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
        "wrong": "Kurz und knapp.",
        "correct": "Klar, sachlich und höflich.",
        "tip": "Professionelle Kommunikation ist bei Einen Anwalt aufsuchen wichtig."
      },
      {
        "wrong": "etwas",
        "correct": "das",
        "tip": "Konkret und sachlich kommunizieren."
      },
      {
        "wrong": "Kurz nicken.",
        "correct": "Sachlich und professionell antworten.",
        "tip": "Professionelle Antworten zeigen Kompetenz."
      }
    ]
  },
  {
    "id": "b1-31",
    "level": "B1",
    "title": "Nebenkostenabrechnung",
    "titleDe": "Nebenkostenabrechnung prüfen",
    "icon": "🧾",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Nebenkostenabrechnung prüfen.",
            "question": "Wie formulierst du das professionell?",
            "options": [
              "Klar, sachlich und höflich.",
              "Kurz und knapp.",
              "Gar nicht."
            ],
            "answer": 0,
            "explanation": "Professionelle Kommunikation ist bei Nebenkostenabrechnung prüfen wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du bereitest dich auf Nebenkostenabrechnung prüfen vor.",
            "question": "Ich würde gerne ___ besprechen.",
            "options": [
              "das",
              "etwas",
              "alles"
            ],
            "answer": "das",
            "explanation": "Konkret und sachlich kommunizieren."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sie",
              "Ich",
              "informieren",
              "möchte",
              "darüber"
            ],
            "answer": [
              1,
              3,
              0,
              4,
              2
            ],
            "explanation": "Richtig: Ich möchte Sie darüber informieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand stellt dir eine Frage zum Thema Nebenkostenabrechnung prüfen.",
            "question": "Wie reagierst du?",
            "options": [
              "Sachlich und professionell antworten.",
              "Kurz nicken.",
              "Die Frage ignorieren."
            ],
            "answer": 0,
            "explanation": "Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du hast eine Frist verpasst.",
            "question": "Was machst du?",
            "options": [
              "Ich kontaktiere die Stelle und bitte um Verlängerung.",
              "Ich ignoriere es.",
              "Ich warte ab."
            ],
            "answer": 0,
            "explanation": "Proaktive Kommunikation hilft bei verpassten Fristen."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Nebenkostenabrechnung prüfen.",
            "question": "Professionelle Kommunikation ___ bei Nebenkostenabrechnung prüfen wichtig.",
            "options": [
              "ist",
              "Antwort",
              "habe"
            ],
            "answer": "ist",
            "explanation": "Professionelle Kommunikation ist bei Nebenkostenabrechnung prüfen wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du bereitest dich auf Nebenkostenabrechnung prüfen vor.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Konkret",
              "sachlich",
              "und",
              "kommunizieren"
            ],
            "answer": [
              0,
              2,
              1,
              3
            ],
            "explanation": "Richtig: Konkret und sachlich kommunizieren."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Ich möchte Sie ___ informieren.",
            "options": [
              "darüber",
              "Name",
              "Lösung"
            ],
            "answer": "darüber",
            "explanation": "Ich möchte Sie darüber informieren."
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand stellt dir eine Frage zum Thema Nebenkostenabrechnung prüfen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Antworten",
              "Professionelle",
              "zeigen",
              "Kompetenz"
            ],
            "answer": [
              1,
              0,
              2,
              3
            ],
            "explanation": "Richtig: Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "fill_blank",
            "situation": "Du hast eine Frist verpasst.",
            "question": "Proaktive Kommunikation hilft ___ verpassten Fristen.",
            "options": [
              "bei",
              "Problem",
              "heute"
            ],
            "answer": "bei",
            "explanation": "Proaktive Kommunikation hilft bei verpassten Fristen."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Nebenkostenabrechnung prüfen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Klar, sachlich und höflich.",
              "Kein Bedarf.",
              "Das ist zu kompliziert."
            ],
            "answer": 0,
            "explanation": "Professionelle Kommunikation ist bei Nebenkostenabrechnung prüfen wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bereitest dich auf Nebenkostenabrechnung prüfen vor.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "das",
              "Das sehe ich anders.",
              "Das interessiert mich nicht."
            ],
            "answer": 0,
            "explanation": "Konkret und sachlich kommunizieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich möchte Sie darüber informieren",
              "Ich lehne das ab.",
              "Damit habe ich nichts zu tun."
            ],
            "answer": 0,
            "explanation": "Richtig: Ich möchte Sie darüber informieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand stellt dir eine Frage zum Thema Nebenkostenabrechnung prüfen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Sachlich und professionell antworten.",
              "Das interessiert mich nicht.",
              "Ich bin nicht zuständig."
            ],
            "answer": 0,
            "explanation": "Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du hast eine Frist verpasst.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich kontaktiere die Stelle und bitte um Verlängerung.",
              "Kein Bedarf.",
              "Nicht mein Bereich."
            ],
            "answer": 0,
            "explanation": "Proaktive Kommunikation hilft bei verpassten Fristen."
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
        "wrong": "Kurz und knapp.",
        "correct": "Klar, sachlich und höflich.",
        "tip": "Professionelle Kommunikation ist bei Nebenkostenabrechnung prüfen wichtig."
      },
      {
        "wrong": "etwas",
        "correct": "das",
        "tip": "Konkret und sachlich kommunizieren."
      },
      {
        "wrong": "Kurz nicken.",
        "correct": "Sachlich und professionell antworten.",
        "tip": "Professionelle Antworten zeigen Kompetenz."
      }
    ]
  },
  {
    "id": "b1-32",
    "level": "B1",
    "title": "Firmenpräsentation",
    "titleDe": "Eine Präsentation halten",
    "icon": "📊",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Eine Präsentation halten.",
            "question": "Wie formulierst du das professionell?",
            "options": [
              "Klar, sachlich und höflich.",
              "Kurz und knapp.",
              "Gar nicht."
            ],
            "answer": 0,
            "explanation": "Professionelle Kommunikation ist bei Eine Präsentation halten wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du bereitest dich auf Eine Präsentation halten vor.",
            "question": "Ich würde gerne ___ besprechen.",
            "options": [
              "das",
              "etwas",
              "alles"
            ],
            "answer": "das",
            "explanation": "Konkret und sachlich kommunizieren."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sie",
              "Ich",
              "informieren",
              "möchte",
              "darüber"
            ],
            "answer": [
              1,
              3,
              0,
              4,
              2
            ],
            "explanation": "Richtig: Ich möchte Sie darüber informieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand stellt dir eine Frage zum Thema Eine Präsentation halten.",
            "question": "Wie reagierst du?",
            "options": [
              "Sachlich und professionell antworten.",
              "Kurz nicken.",
              "Die Frage ignorieren."
            ],
            "answer": 0,
            "explanation": "Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Ein Freund bittet um einen Gefallen.",
            "question": "Wie lehnst du höflich ab?",
            "options": [
              "Das würde ich gerne, aber leider kann ich nicht.",
              "Nein.",
              "Frag jemand anderen."
            ],
            "answer": 0,
            "explanation": "Höfliches Ablehnen bewahrt die Freundschaft."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Eine Präsentation halten.",
            "question": "Professionelle Kommunikation ist bei ___ Präsentation halten wichtig.",
            "options": [
              "Eine",
              "schnell",
              "brauche"
            ],
            "answer": "Eine",
            "explanation": "Professionelle Kommunikation ist bei Eine Präsentation halten wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du bereitest dich auf Eine Präsentation halten vor.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Konkret",
              "kommunizieren",
              "und",
              "sachlich"
            ],
            "answer": [
              0,
              2,
              3,
              1
            ],
            "explanation": "Richtig: Konkret und sachlich kommunizieren."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Ich möchte Sie darüber ___.",
            "options": [
              "informieren",
              "Zeit",
              "will"
            ],
            "answer": "informieren",
            "explanation": "Ich möchte Sie darüber informieren."
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand stellt dir eine Frage zum Thema Eine Präsentation halten.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Kompetenz",
              "Professionelle",
              "zeigen",
              "Antworten"
            ],
            "answer": [
              1,
              3,
              2,
              0
            ],
            "explanation": "Richtig: Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "fill_blank",
            "situation": "Ein Freund bittet um einen Gefallen.",
            "question": "Höfliches ___ bewahrt die Freundschaft.",
            "options": [
              "Ablehnen",
              "leider",
              "gut"
            ],
            "answer": "Ablehnen",
            "explanation": "Höfliches Ablehnen bewahrt die Freundschaft."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Eine Präsentation halten.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Klar, sachlich und höflich.",
              "Kein Bedarf.",
              "Das ist zu kompliziert."
            ],
            "answer": 0,
            "explanation": "Professionelle Kommunikation ist bei Eine Präsentation halten wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bereitest dich auf Eine Präsentation halten vor.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "das",
              "Das sehe ich anders.",
              "Ich bin nicht zuständig."
            ],
            "answer": 0,
            "explanation": "Konkret und sachlich kommunizieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich möchte Sie darüber informieren",
              "Kein Bedarf.",
              "Darüber möchte ich nicht sprechen."
            ],
            "answer": 0,
            "explanation": "Richtig: Ich möchte Sie darüber informieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand stellt dir eine Frage zum Thema Eine Präsentation halten.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Sachlich und professionell antworten.",
              "Damit habe ich nichts zu tun.",
              "Nicht mein Bereich."
            ],
            "answer": 0,
            "explanation": "Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Ein Freund bittet um einen Gefallen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Das würde ich gerne, aber leider kann ich nicht.",
              "Das sehe ich anders.",
              "Ich lehne das ab."
            ],
            "answer": 0,
            "explanation": "Höfliches Ablehnen bewahrt die Freundschaft."
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
        "wrong": "Kurz und knapp.",
        "correct": "Klar, sachlich und höflich.",
        "tip": "Professionelle Kommunikation ist bei Eine Präsentation halten wichtig."
      },
      {
        "wrong": "etwas",
        "correct": "das",
        "tip": "Konkret und sachlich kommunizieren."
      },
      {
        "wrong": "Kurz nicken.",
        "correct": "Sachlich und professionell antworten.",
        "tip": "Professionelle Antworten zeigen Kompetenz."
      }
    ]
  },
  {
    "id": "b1-33",
    "level": "B1",
    "title": "Betriebsrat",
    "titleDe": "Mit dem Betriebsrat sprechen",
    "icon": "🏢",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Mit dem Betriebsrat sprechen.",
            "question": "Wie formulierst du das professionell?",
            "options": [
              "Klar, sachlich und höflich.",
              "Kurz und knapp.",
              "Gar nicht."
            ],
            "answer": 0,
            "explanation": "Professionelle Kommunikation ist bei Mit dem Betriebsrat sprechen wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du bereitest dich auf Mit dem Betriebsrat sprechen vor.",
            "question": "Ich würde gerne ___ besprechen.",
            "options": [
              "das",
              "etwas",
              "alles"
            ],
            "answer": "das",
            "explanation": "Konkret und sachlich kommunizieren."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sie",
              "Ich",
              "informieren",
              "möchte",
              "darüber"
            ],
            "answer": [
              1,
              3,
              0,
              4,
              2
            ],
            "explanation": "Richtig: Ich möchte Sie darüber informieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand stellt dir eine Frage zum Thema Mit dem Betriebsrat sprechen.",
            "question": "Wie reagierst du?",
            "options": [
              "Sachlich und professionell antworten.",
              "Kurz nicken.",
              "Die Frage ignorieren."
            ],
            "answer": 0,
            "explanation": "Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bekommst konstruktive Kritik.",
            "question": "Wie reagierst du?",
            "options": [
              "Danke für das Feedback, ich werde daran arbeiten.",
              "Das stimmt nicht.",
              "Mir egal."
            ],
            "answer": 0,
            "explanation": "Feedback anzunehmen zeigt Professionalität."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Mit dem Betriebsrat sprechen.",
            "question": "Professionelle Kommunikation ist bei Mit ___ Betriebsrat sprechen wichtig.",
            "options": [
              "dem",
              "brauche",
              "suche"
            ],
            "answer": "dem",
            "explanation": "Professionelle Kommunikation ist bei Mit dem Betriebsrat sprechen wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du bereitest dich auf Mit dem Betriebsrat sprechen vor.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Konkret",
              "kommunizieren",
              "sachlich",
              "und"
            ],
            "answer": [
              0,
              3,
              2,
              1
            ],
            "explanation": "Richtig: Konkret und sachlich kommunizieren."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Ich möchte Sie darüber ___.",
            "options": [
              "informieren",
              "muss",
              "Name"
            ],
            "answer": "informieren",
            "explanation": "Ich möchte Sie darüber informieren."
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand stellt dir eine Frage zum Thema Mit dem Betriebsrat sprechen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Antworten",
              "Professionelle",
              "zeigen",
              "Kompetenz"
            ],
            "answer": [
              1,
              0,
              2,
              3
            ],
            "explanation": "Richtig: Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "fill_blank",
            "situation": "Du bekommst konstruktive Kritik.",
            "question": "Feedback anzunehmen ___ Professionalität.",
            "options": [
              "zeigt",
              "bitte",
              "nötig"
            ],
            "answer": "zeigt",
            "explanation": "Feedback anzunehmen zeigt Professionalität."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Mit dem Betriebsrat sprechen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Klar, sachlich und höflich.",
              "Das wurde schon besprochen.",
              "Nicht mein Bereich."
            ],
            "answer": 0,
            "explanation": "Professionelle Kommunikation ist bei Mit dem Betriebsrat sprechen wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bereitest dich auf Mit dem Betriebsrat sprechen vor.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "das",
              "Darüber möchte ich nicht sprechen.",
              "Kein Bedarf."
            ],
            "answer": 0,
            "explanation": "Konkret und sachlich kommunizieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich möchte Sie darüber informieren",
              "Das ist zu kompliziert.",
              "Nicht mein Bereich."
            ],
            "answer": 0,
            "explanation": "Richtig: Ich möchte Sie darüber informieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand stellt dir eine Frage zum Thema Mit dem Betriebsrat sprechen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Sachlich und professionell antworten.",
              "Nicht mein Bereich.",
              "Das interessiert mich nicht."
            ],
            "answer": 0,
            "explanation": "Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bekommst konstruktive Kritik.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Danke für das Feedback, ich werde daran arbeiten.",
              "Ich lehne das ab.",
              "Nicht mein Bereich."
            ],
            "answer": 0,
            "explanation": "Feedback anzunehmen zeigt Professionalität."
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
        "wrong": "Kurz und knapp.",
        "correct": "Klar, sachlich und höflich.",
        "tip": "Professionelle Kommunikation ist bei Mit dem Betriebsrat sprechen wichtig."
      },
      {
        "wrong": "etwas",
        "correct": "das",
        "tip": "Konkret und sachlich kommunizieren."
      },
      {
        "wrong": "Kurz nicken.",
        "correct": "Sachlich und professionell antworten.",
        "tip": "Professionelle Antworten zeigen Kompetenz."
      }
    ]
  },
  {
    "id": "b1-34",
    "level": "B1",
    "title": "Maklertermin",
    "titleDe": "Beim Maklertermin",
    "icon": "🏠",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Beim Maklertermin.",
            "question": "Wie formulierst du das professionell?",
            "options": [
              "Klar, sachlich und höflich.",
              "Kurz und knapp.",
              "Gar nicht."
            ],
            "answer": 0,
            "explanation": "Professionelle Kommunikation ist bei Beim Maklertermin wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du bereitest dich auf Beim Maklertermin vor.",
            "question": "Ich würde gerne ___ besprechen.",
            "options": [
              "das",
              "etwas",
              "alles"
            ],
            "answer": "das",
            "explanation": "Konkret und sachlich kommunizieren."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sie",
              "Ich",
              "informieren",
              "möchte",
              "darüber"
            ],
            "answer": [
              1,
              3,
              0,
              4,
              2
            ],
            "explanation": "Richtig: Ich möchte Sie darüber informieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand stellt dir eine Frage zum Thema Beim Maklertermin.",
            "question": "Wie reagierst du?",
            "options": [
              "Sachlich und professionell antworten.",
              "Kurz nicken.",
              "Die Frage ignorieren."
            ],
            "answer": 0,
            "explanation": "Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Dein Vermieter erhöht die Miete.",
            "question": "Wie reagierst du?",
            "options": [
              "Ich prüfe, ob die Erhöhung rechtlich zulässig ist.",
              "Ich ziehe sofort aus.",
              "Ich bezahle einfach mehr."
            ],
            "answer": 0,
            "explanation": "Mieterhöhungen müssen gesetzlich begründet sein."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Beim Maklertermin.",
            "question": "Professionelle Kommunikation ist bei Beim ___ wichtig.",
            "options": [
              "Maklertermin",
              "werde",
              "schnell"
            ],
            "answer": "Maklertermin",
            "explanation": "Professionelle Kommunikation ist bei Beim Maklertermin wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du bereitest dich auf Beim Maklertermin vor.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Konkret",
              "sachlich",
              "und",
              "kommunizieren"
            ],
            "answer": [
              0,
              2,
              1,
              3
            ],
            "explanation": "Richtig: Konkret und sachlich kommunizieren."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Ich ___ Sie darüber informieren.",
            "options": [
              "möchte",
              "habe",
              "bin"
            ],
            "answer": "möchte",
            "explanation": "Ich möchte Sie darüber informieren."
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand stellt dir eine Frage zum Thema Beim Maklertermin.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Antworten",
              "Kompetenz",
              "Professionelle",
              "zeigen"
            ],
            "answer": [
              2,
              0,
              3,
              1
            ],
            "explanation": "Richtig: Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "fill_blank",
            "situation": "Dein Vermieter erhöht die Miete.",
            "question": "Mieterhöhungen müssen gesetzlich begründet ___.",
            "options": [
              "sein",
              "Zeit",
              "Arbeit"
            ],
            "answer": "sein",
            "explanation": "Mieterhöhungen müssen gesetzlich begründet sein."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Beim Maklertermin.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Klar, sachlich und höflich.",
              "Das sehe ich anders.",
              "Nicht mein Bereich."
            ],
            "answer": 0,
            "explanation": "Professionelle Kommunikation ist bei Beim Maklertermin wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bereitest dich auf Beim Maklertermin vor.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "das",
              "Das wurde schon besprochen.",
              "Keine Kommentare."
            ],
            "answer": 0,
            "explanation": "Konkret und sachlich kommunizieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich möchte Sie darüber informieren",
              "Ich lehne das ab.",
              "Das interessiert mich nicht."
            ],
            "answer": 0,
            "explanation": "Richtig: Ich möchte Sie darüber informieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand stellt dir eine Frage zum Thema Beim Maklertermin.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Sachlich und professionell antworten.",
              "Das betrifft mich nicht.",
              "Das sehe ich anders."
            ],
            "answer": 0,
            "explanation": "Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Dein Vermieter erhöht die Miete.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich prüfe, ob die Erhöhung rechtlich zulässig ist.",
              "Darüber möchte ich nicht sprechen.",
              "Ich bin nicht zuständig."
            ],
            "answer": 0,
            "explanation": "Mieterhöhungen müssen gesetzlich begründet sein."
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
        "wrong": "Kurz und knapp.",
        "correct": "Klar, sachlich und höflich.",
        "tip": "Professionelle Kommunikation ist bei Beim Maklertermin wichtig."
      },
      {
        "wrong": "etwas",
        "correct": "das",
        "tip": "Konkret und sachlich kommunizieren."
      },
      {
        "wrong": "Kurz nicken.",
        "correct": "Sachlich und professionell antworten.",
        "tip": "Professionelle Antworten zeigen Kompetenz."
      }
    ]
  },
  {
    "id": "b1-35",
    "level": "B1",
    "title": "Fortbildung",
    "titleDe": "Sich fortbilden",
    "icon": "📖",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Sich fortbilden.",
            "question": "Wie formulierst du das professionell?",
            "options": [
              "Klar, sachlich und höflich.",
              "Kurz und knapp.",
              "Gar nicht."
            ],
            "answer": 0,
            "explanation": "Professionelle Kommunikation ist bei Sich fortbilden wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du bereitest dich auf Sich fortbilden vor.",
            "question": "Ich würde gerne ___ besprechen.",
            "options": [
              "das",
              "etwas",
              "alles"
            ],
            "answer": "das",
            "explanation": "Konkret und sachlich kommunizieren."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sie",
              "Ich",
              "informieren",
              "möchte",
              "darüber"
            ],
            "answer": [
              1,
              3,
              0,
              4,
              2
            ],
            "explanation": "Richtig: Ich möchte Sie darüber informieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand stellt dir eine Frage zum Thema Sich fortbilden.",
            "question": "Wie reagierst du?",
            "options": [
              "Sachlich und professionell antworten.",
              "Kurz nicken.",
              "Die Frage ignorieren."
            ],
            "answer": 0,
            "explanation": "Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bewirbst dich auf eine Stelle.",
            "question": "Was ist wichtig?",
            "options": [
              "Ein professionelles Anschreiben und Lebenslauf.",
              "Nur meinen Namen schicken.",
              "Anrufen und fragen."
            ],
            "answer": 0,
            "explanation": "Bewerbungsunterlagen müssen vollständig und professionell sein."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Sich fortbilden.",
            "question": "Professionelle Kommunikation ist bei ___ fortbilden wichtig.",
            "options": [
              "Sich",
              "soll",
              "will"
            ],
            "answer": "Sich",
            "explanation": "Professionelle Kommunikation ist bei Sich fortbilden wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du bereitest dich auf Sich fortbilden vor.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Konkret",
              "sachlich",
              "kommunizieren",
              "und"
            ],
            "answer": [
              0,
              3,
              1,
              2
            ],
            "explanation": "Richtig: Konkret und sachlich kommunizieren."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Ich möchte Sie ___ informieren.",
            "options": [
              "darüber",
              "gut",
              "sage"
            ],
            "answer": "darüber",
            "explanation": "Ich möchte Sie darüber informieren."
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand stellt dir eine Frage zum Thema Sich fortbilden.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Professionelle",
              "zeigen",
              "Antworten",
              "Kompetenz"
            ],
            "answer": [
              0,
              2,
              1,
              3
            ],
            "explanation": "Richtig: Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "fill_blank",
            "situation": "Du bewirbst dich auf eine Stelle.",
            "question": "Bewerbungsunterlagen ___ vollständig und professionell sein.",
            "options": [
              "müssen",
              "Name",
              "leider"
            ],
            "answer": "müssen",
            "explanation": "Bewerbungsunterlagen müssen vollständig und professionell sein."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Sich fortbilden.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Klar, sachlich und höflich.",
              "Kein Bedarf.",
              "Das sehe ich anders."
            ],
            "answer": 0,
            "explanation": "Professionelle Kommunikation ist bei Sich fortbilden wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bereitest dich auf Sich fortbilden vor.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "das",
              "Das interessiert mich nicht.",
              "Darüber möchte ich nicht sprechen."
            ],
            "answer": 0,
            "explanation": "Konkret und sachlich kommunizieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich möchte Sie darüber informieren",
              "Ich bin nicht zuständig.",
              "Das betrifft mich nicht."
            ],
            "answer": 0,
            "explanation": "Richtig: Ich möchte Sie darüber informieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand stellt dir eine Frage zum Thema Sich fortbilden.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Sachlich und professionell antworten.",
              "Kein Bedarf.",
              "Darüber möchte ich nicht sprechen."
            ],
            "answer": 0,
            "explanation": "Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bewirbst dich auf eine Stelle.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ein professionelles Anschreiben und Lebenslauf.",
              "Das betrifft mich nicht.",
              "Das interessiert mich nicht."
            ],
            "answer": 0,
            "explanation": "Bewerbungsunterlagen müssen vollständig und professionell sein."
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
        "wrong": "Kurz und knapp.",
        "correct": "Klar, sachlich und höflich.",
        "tip": "Professionelle Kommunikation ist bei Sich fortbilden wichtig."
      },
      {
        "wrong": "etwas",
        "correct": "das",
        "tip": "Konkret und sachlich kommunizieren."
      },
      {
        "wrong": "Kurz nicken.",
        "correct": "Sachlich und professionell antworten.",
        "tip": "Professionelle Antworten zeigen Kompetenz."
      }
    ]
  },
  {
    "id": "b1-36",
    "level": "B1",
    "title": "Telefonkonferenz",
    "titleDe": "In einer Telefonkonferenz",
    "icon": "📱",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: In einer Telefonkonferenz.",
            "question": "Wie formulierst du das professionell?",
            "options": [
              "Klar, sachlich und höflich.",
              "Kurz und knapp.",
              "Gar nicht."
            ],
            "answer": 0,
            "explanation": "Professionelle Kommunikation ist bei In einer Telefonkonferenz wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du bereitest dich auf In einer Telefonkonferenz vor.",
            "question": "Ich würde gerne ___ besprechen.",
            "options": [
              "das",
              "etwas",
              "alles"
            ],
            "answer": "das",
            "explanation": "Konkret und sachlich kommunizieren."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sie",
              "Ich",
              "informieren",
              "möchte",
              "darüber"
            ],
            "answer": [
              1,
              3,
              0,
              4,
              2
            ],
            "explanation": "Richtig: Ich möchte Sie darüber informieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand stellt dir eine Frage zum Thema In einer Telefonkonferenz.",
            "question": "Wie reagierst du?",
            "options": [
              "Sachlich und professionell antworten.",
              "Kurz nicken.",
              "Die Frage ignorieren."
            ],
            "answer": 0,
            "explanation": "Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du hast eine Frist verpasst.",
            "question": "Was machst du?",
            "options": [
              "Ich kontaktiere die Stelle und bitte um Verlängerung.",
              "Ich ignoriere es.",
              "Ich warte ab."
            ],
            "answer": 0,
            "explanation": "Proaktive Kommunikation hilft bei verpassten Fristen."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: In einer Telefonkonferenz.",
            "question": "Professionelle Kommunikation ist bei In einer Telefonkonferenz ___.",
            "options": [
              "wichtig",
              "schlecht",
              "möglich"
            ],
            "answer": "wichtig",
            "explanation": "Professionelle Kommunikation ist bei In einer Telefonkonferenz wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du bereitest dich auf In einer Telefonkonferenz vor.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "kommunizieren",
              "Konkret",
              "sachlich",
              "und"
            ],
            "answer": [
              1,
              3,
              2,
              0
            ],
            "explanation": "Richtig: Konkret und sachlich kommunizieren."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Ich möchte ___ darüber informieren.",
            "options": [
              "Sie",
              "möglich",
              "komme"
            ],
            "answer": "Sie",
            "explanation": "Ich möchte Sie darüber informieren."
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand stellt dir eine Frage zum Thema In einer Telefonkonferenz.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Professionelle",
              "Antworten",
              "Kompetenz",
              "zeigen"
            ],
            "answer": [
              0,
              1,
              3,
              2
            ],
            "explanation": "Richtig: Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "fill_blank",
            "situation": "Du hast eine Frist verpasst.",
            "question": "Proaktive Kommunikation hilft bei ___ Fristen.",
            "options": [
              "verpassten",
              "frage",
              "Arbeit"
            ],
            "answer": "verpassten",
            "explanation": "Proaktive Kommunikation hilft bei verpassten Fristen."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: In einer Telefonkonferenz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Klar, sachlich und höflich.",
              "Nicht mein Bereich.",
              "Ich lehne das ab."
            ],
            "answer": 0,
            "explanation": "Professionelle Kommunikation ist bei In einer Telefonkonferenz wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bereitest dich auf In einer Telefonkonferenz vor.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "das",
              "Ich lehne das ab.",
              "Nicht mein Bereich."
            ],
            "answer": 0,
            "explanation": "Konkret und sachlich kommunizieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich möchte Sie darüber informieren",
              "Nicht mein Bereich.",
              "Damit habe ich nichts zu tun."
            ],
            "answer": 0,
            "explanation": "Richtig: Ich möchte Sie darüber informieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand stellt dir eine Frage zum Thema In einer Telefonkonferenz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Sachlich und professionell antworten.",
              "Damit habe ich nichts zu tun.",
              "Das betrifft mich nicht."
            ],
            "answer": 0,
            "explanation": "Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du hast eine Frist verpasst.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich kontaktiere die Stelle und bitte um Verlängerung.",
              "Kein Bedarf.",
              "Das wurde schon besprochen."
            ],
            "answer": 0,
            "explanation": "Proaktive Kommunikation hilft bei verpassten Fristen."
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
        "wrong": "Kurz und knapp.",
        "correct": "Klar, sachlich und höflich.",
        "tip": "Professionelle Kommunikation ist bei In einer Telefonkonferenz wichtig."
      },
      {
        "wrong": "etwas",
        "correct": "das",
        "tip": "Konkret und sachlich kommunizieren."
      },
      {
        "wrong": "Kurz nicken.",
        "correct": "Sachlich und professionell antworten.",
        "tip": "Professionelle Antworten zeigen Kompetenz."
      }
    ]
  },
  {
    "id": "b1-37",
    "level": "B1",
    "title": "Protokoll schreiben",
    "titleDe": "Ein Protokoll schreiben",
    "icon": "📝",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Ein Protokoll schreiben.",
            "question": "Wie formulierst du das professionell?",
            "options": [
              "Klar, sachlich und höflich.",
              "Kurz und knapp.",
              "Gar nicht."
            ],
            "answer": 0,
            "explanation": "Professionelle Kommunikation ist bei Ein Protokoll schreiben wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du bereitest dich auf Ein Protokoll schreiben vor.",
            "question": "Ich würde gerne ___ besprechen.",
            "options": [
              "das",
              "etwas",
              "alles"
            ],
            "answer": "das",
            "explanation": "Konkret und sachlich kommunizieren."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sie",
              "Ich",
              "informieren",
              "möchte",
              "darüber"
            ],
            "answer": [
              1,
              3,
              0,
              4,
              2
            ],
            "explanation": "Richtig: Ich möchte Sie darüber informieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand stellt dir eine Frage zum Thema Ein Protokoll schreiben.",
            "question": "Wie reagierst du?",
            "options": [
              "Sachlich und professionell antworten.",
              "Kurz nicken.",
              "Die Frage ignorieren."
            ],
            "answer": 0,
            "explanation": "Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Ein Freund bittet um einen Gefallen.",
            "question": "Wie lehnst du höflich ab?",
            "options": [
              "Das würde ich gerne, aber leider kann ich nicht.",
              "Nein.",
              "Frag jemand anderen."
            ],
            "answer": 0,
            "explanation": "Höfliches Ablehnen bewahrt die Freundschaft."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Ein Protokoll schreiben.",
            "question": "Professionelle Kommunikation ___ bei Ein Protokoll schreiben wichtig.",
            "options": [
              "ist",
              "Name",
              "langsam"
            ],
            "answer": "ist",
            "explanation": "Professionelle Kommunikation ist bei Ein Protokoll schreiben wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du bereitest dich auf Ein Protokoll schreiben vor.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "sachlich",
              "Konkret",
              "und",
              "kommunizieren"
            ],
            "answer": [
              1,
              2,
              0,
              3
            ],
            "explanation": "Richtig: Konkret und sachlich kommunizieren."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Ich möchte ___ darüber informieren.",
            "options": [
              "Sie",
              "sage",
              "Termin"
            ],
            "answer": "Sie",
            "explanation": "Ich möchte Sie darüber informieren."
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand stellt dir eine Frage zum Thema Ein Protokoll schreiben.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Antworten",
              "Kompetenz",
              "zeigen",
              "Professionelle"
            ],
            "answer": [
              3,
              0,
              2,
              1
            ],
            "explanation": "Richtig: Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "fill_blank",
            "situation": "Ein Freund bittet um einen Gefallen.",
            "question": "Höfliches Ablehnen ___ die Freundschaft.",
            "options": [
              "bewahrt",
              "Zeit",
              "Problem"
            ],
            "answer": "bewahrt",
            "explanation": "Höfliches Ablehnen bewahrt die Freundschaft."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Ein Protokoll schreiben.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Klar, sachlich und höflich.",
              "Das ist zu kompliziert.",
              "Das sehe ich anders."
            ],
            "answer": 0,
            "explanation": "Professionelle Kommunikation ist bei Ein Protokoll schreiben wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bereitest dich auf Ein Protokoll schreiben vor.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "das",
              "Darüber möchte ich nicht sprechen.",
              "Ich bin nicht zuständig."
            ],
            "answer": 0,
            "explanation": "Konkret und sachlich kommunizieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich möchte Sie darüber informieren",
              "Nicht mein Bereich.",
              "Das sehe ich anders."
            ],
            "answer": 0,
            "explanation": "Richtig: Ich möchte Sie darüber informieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand stellt dir eine Frage zum Thema Ein Protokoll schreiben.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Sachlich und professionell antworten.",
              "Keine Kommentare.",
              "Nicht mein Bereich."
            ],
            "answer": 0,
            "explanation": "Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Ein Freund bittet um einen Gefallen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Das würde ich gerne, aber leider kann ich nicht.",
              "Das interessiert mich nicht.",
              "Das wurde schon besprochen."
            ],
            "answer": 0,
            "explanation": "Höfliches Ablehnen bewahrt die Freundschaft."
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
        "wrong": "Kurz und knapp.",
        "correct": "Klar, sachlich und höflich.",
        "tip": "Professionelle Kommunikation ist bei Ein Protokoll schreiben wichtig."
      },
      {
        "wrong": "etwas",
        "correct": "das",
        "tip": "Konkret und sachlich kommunizieren."
      },
      {
        "wrong": "Kurz nicken.",
        "correct": "Sachlich und professionell antworten.",
        "tip": "Professionelle Antworten zeigen Kompetenz."
      }
    ]
  },
  {
    "id": "b1-38",
    "level": "B1",
    "title": "Büroalltag",
    "titleDe": "Büroalltag meistern",
    "icon": "🖥️",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Büroalltag meistern.",
            "question": "Wie formulierst du das professionell?",
            "options": [
              "Klar, sachlich und höflich.",
              "Kurz und knapp.",
              "Gar nicht."
            ],
            "answer": 0,
            "explanation": "Professionelle Kommunikation ist bei Büroalltag meistern wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du bereitest dich auf Büroalltag meistern vor.",
            "question": "Ich würde gerne ___ besprechen.",
            "options": [
              "das",
              "etwas",
              "alles"
            ],
            "answer": "das",
            "explanation": "Konkret und sachlich kommunizieren."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sie",
              "Ich",
              "informieren",
              "möchte",
              "darüber"
            ],
            "answer": [
              1,
              3,
              0,
              4,
              2
            ],
            "explanation": "Richtig: Ich möchte Sie darüber informieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand stellt dir eine Frage zum Thema Büroalltag meistern.",
            "question": "Wie reagierst du?",
            "options": [
              "Sachlich und professionell antworten.",
              "Kurz nicken.",
              "Die Frage ignorieren."
            ],
            "answer": 0,
            "explanation": "Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bekommst konstruktive Kritik.",
            "question": "Wie reagierst du?",
            "options": [
              "Danke für das Feedback, ich werde daran arbeiten.",
              "Das stimmt nicht.",
              "Mir egal."
            ],
            "answer": 0,
            "explanation": "Feedback anzunehmen zeigt Professionalität."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Büroalltag meistern.",
            "question": "Professionelle Kommunikation ist bei ___ meistern wichtig.",
            "options": [
              "Büroalltag",
              "morgen",
              "Arbeit"
            ],
            "answer": "Büroalltag",
            "explanation": "Professionelle Kommunikation ist bei Büroalltag meistern wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du bereitest dich auf Büroalltag meistern vor.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "kommunizieren",
              "sachlich",
              "und",
              "Konkret"
            ],
            "answer": [
              3,
              2,
              1,
              0
            ],
            "explanation": "Richtig: Konkret und sachlich kommunizieren."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Ich möchte Sie darüber ___.",
            "options": [
              "informieren",
              "morgen",
              "mache"
            ],
            "answer": "informieren",
            "explanation": "Ich möchte Sie darüber informieren."
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand stellt dir eine Frage zum Thema Büroalltag meistern.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Antworten",
              "Professionelle",
              "Kompetenz",
              "zeigen"
            ],
            "answer": [
              1,
              0,
              3,
              2
            ],
            "explanation": "Richtig: Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "fill_blank",
            "situation": "Du bekommst konstruktive Kritik.",
            "question": "Feedback anzunehmen zeigt ___.",
            "options": [
              "Professionalität",
              "möchte",
              "Problem"
            ],
            "answer": "Professionalität",
            "explanation": "Feedback anzunehmen zeigt Professionalität."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Büroalltag meistern.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Klar, sachlich und höflich.",
              "Darüber möchte ich nicht sprechen.",
              "Das ist zu kompliziert."
            ],
            "answer": 0,
            "explanation": "Professionelle Kommunikation ist bei Büroalltag meistern wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bereitest dich auf Büroalltag meistern vor.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "das",
              "Ich bin nicht zuständig.",
              "Darüber möchte ich nicht sprechen."
            ],
            "answer": 0,
            "explanation": "Konkret und sachlich kommunizieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich möchte Sie darüber informieren",
              "Ich lehne das ab.",
              "Das interessiert mich nicht."
            ],
            "answer": 0,
            "explanation": "Richtig: Ich möchte Sie darüber informieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand stellt dir eine Frage zum Thema Büroalltag meistern.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Sachlich und professionell antworten.",
              "Kein Bedarf.",
              "Ich lehne das ab."
            ],
            "answer": 0,
            "explanation": "Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bekommst konstruktive Kritik.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Danke für das Feedback, ich werde daran arbeiten.",
              "Keine Kommentare.",
              "Damit habe ich nichts zu tun."
            ],
            "answer": 0,
            "explanation": "Feedback anzunehmen zeigt Professionalität."
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
        "wrong": "Kurz und knapp.",
        "correct": "Klar, sachlich und höflich.",
        "tip": "Professionelle Kommunikation ist bei Büroalltag meistern wichtig."
      },
      {
        "wrong": "etwas",
        "correct": "das",
        "tip": "Konkret und sachlich kommunizieren."
      },
      {
        "wrong": "Kurz nicken.",
        "correct": "Sachlich und professionell antworten.",
        "tip": "Professionelle Antworten zeigen Kompetenz."
      }
    ]
  },
  {
    "id": "b1-39",
    "level": "B1",
    "title": "Geschäftsbrief",
    "titleDe": "Einen Geschäftsbrief schreiben",
    "icon": "💌",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Einen Geschäftsbrief schreiben.",
            "question": "Wie formulierst du das professionell?",
            "options": [
              "Klar, sachlich und höflich.",
              "Kurz und knapp.",
              "Gar nicht."
            ],
            "answer": 0,
            "explanation": "Professionelle Kommunikation ist bei Einen Geschäftsbrief schreiben wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du bereitest dich auf Einen Geschäftsbrief schreiben vor.",
            "question": "Ich würde gerne ___ besprechen.",
            "options": [
              "das",
              "etwas",
              "alles"
            ],
            "answer": "das",
            "explanation": "Konkret und sachlich kommunizieren."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sie",
              "Ich",
              "informieren",
              "möchte",
              "darüber"
            ],
            "answer": [
              1,
              3,
              0,
              4,
              2
            ],
            "explanation": "Richtig: Ich möchte Sie darüber informieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand stellt dir eine Frage zum Thema Einen Geschäftsbrief schreiben.",
            "question": "Wie reagierst du?",
            "options": [
              "Sachlich und professionell antworten.",
              "Kurz nicken.",
              "Die Frage ignorieren."
            ],
            "answer": 0,
            "explanation": "Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Dein Vermieter erhöht die Miete.",
            "question": "Wie reagierst du?",
            "options": [
              "Ich prüfe, ob die Erhöhung rechtlich zulässig ist.",
              "Ich ziehe sofort aus.",
              "Ich bezahle einfach mehr."
            ],
            "answer": 0,
            "explanation": "Mieterhöhungen müssen gesetzlich begründet sein."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Einen Geschäftsbrief schreiben.",
            "question": "Professionelle Kommunikation ist bei ___ Geschäftsbrief schreiben wichtig.",
            "options": [
              "Einen",
              "heute",
              "möchte"
            ],
            "answer": "Einen",
            "explanation": "Professionelle Kommunikation ist bei Einen Geschäftsbrief schreiben wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du bereitest dich auf Einen Geschäftsbrief schreiben vor.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "sachlich",
              "Konkret",
              "und",
              "kommunizieren"
            ],
            "answer": [
              1,
              2,
              0,
              3
            ],
            "explanation": "Richtig: Konkret und sachlich kommunizieren."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Ich möchte Sie darüber ___.",
            "options": [
              "informieren",
              "gestern",
              "nötig"
            ],
            "answer": "informieren",
            "explanation": "Ich möchte Sie darüber informieren."
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand stellt dir eine Frage zum Thema Einen Geschäftsbrief schreiben.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Kompetenz",
              "Professionelle",
              "zeigen",
              "Antworten"
            ],
            "answer": [
              1,
              3,
              2,
              0
            ],
            "explanation": "Richtig: Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "fill_blank",
            "situation": "Dein Vermieter erhöht die Miete.",
            "question": "Mieterhöhungen müssen gesetzlich begründet ___.",
            "options": [
              "sein",
              "Frage",
              "möchte"
            ],
            "answer": "sein",
            "explanation": "Mieterhöhungen müssen gesetzlich begründet sein."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Einen Geschäftsbrief schreiben.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Klar, sachlich und höflich.",
              "Ich lehne das ab.",
              "Das interessiert mich nicht."
            ],
            "answer": 0,
            "explanation": "Professionelle Kommunikation ist bei Einen Geschäftsbrief schreiben wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bereitest dich auf Einen Geschäftsbrief schreiben vor.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "das",
              "Das sehe ich anders.",
              "Das wurde schon besprochen."
            ],
            "answer": 0,
            "explanation": "Konkret und sachlich kommunizieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich möchte Sie darüber informieren",
              "Das betrifft mich nicht.",
              "Das interessiert mich nicht."
            ],
            "answer": 0,
            "explanation": "Richtig: Ich möchte Sie darüber informieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand stellt dir eine Frage zum Thema Einen Geschäftsbrief schreiben.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Sachlich und professionell antworten.",
              "Das betrifft mich nicht.",
              "Das sehe ich anders."
            ],
            "answer": 0,
            "explanation": "Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Dein Vermieter erhöht die Miete.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich prüfe, ob die Erhöhung rechtlich zulässig ist.",
              "Ich lehne das ab.",
              "Das ist zu kompliziert."
            ],
            "answer": 0,
            "explanation": "Mieterhöhungen müssen gesetzlich begründet sein."
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
        "wrong": "Kurz und knapp.",
        "correct": "Klar, sachlich und höflich.",
        "tip": "Professionelle Kommunikation ist bei Einen Geschäftsbrief schreiben wichtig."
      },
      {
        "wrong": "etwas",
        "correct": "das",
        "tip": "Konkret und sachlich kommunizieren."
      },
      {
        "wrong": "Kurz nicken.",
        "correct": "Sachlich und professionell antworten.",
        "tip": "Professionelle Antworten zeigen Kompetenz."
      }
    ]
  },
  {
    "id": "b1-40",
    "level": "B1",
    "title": "Abschlussgespräch",
    "titleDe": "Ein Abschlussgespräch führen",
    "icon": "🎯",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Situation: Ein Abschlussgespräch führen.",
            "question": "Wie formulierst du das professionell?",
            "options": [
              "Klar, sachlich und höflich.",
              "Kurz und knapp.",
              "Gar nicht."
            ],
            "answer": 0,
            "explanation": "Professionelle Kommunikation ist bei Ein Abschlussgespräch führen wichtig."
          },
          {
            "type": "fill_blank",
            "situation": "Du bereitest dich auf Ein Abschlussgespräch führen vor.",
            "question": "Ich würde gerne ___ besprechen.",
            "options": [
              "das",
              "etwas",
              "alles"
            ],
            "answer": "das",
            "explanation": "Konkret und sachlich kommunizieren."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sie",
              "Ich",
              "informieren",
              "möchte",
              "darüber"
            ],
            "answer": [
              1,
              3,
              0,
              4,
              2
            ],
            "explanation": "Richtig: Ich möchte Sie darüber informieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand stellt dir eine Frage zum Thema Ein Abschlussgespräch führen.",
            "question": "Wie reagierst du?",
            "options": [
              "Sachlich und professionell antworten.",
              "Kurz nicken.",
              "Die Frage ignorieren."
            ],
            "answer": 0,
            "explanation": "Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bewirbst dich auf eine Stelle.",
            "question": "Was ist wichtig?",
            "options": [
              "Ein professionelles Anschreiben und Lebenslauf.",
              "Nur meinen Namen schicken.",
              "Anrufen und fragen."
            ],
            "answer": 0,
            "explanation": "Bewerbungsunterlagen müssen vollständig und professionell sein."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Situation: Ein Abschlussgespräch führen.",
            "question": "Professionelle Kommunikation ist bei Ein Abschlussgespräch führen ___.",
            "options": [
              "wichtig",
              "schnell",
              "nötig"
            ],
            "answer": "wichtig",
            "explanation": "Professionelle Kommunikation ist bei Ein Abschlussgespräch führen wichtig."
          },
          {
            "type": "sort_sentence",
            "situation": "Du bereitest dich auf Ein Abschlussgespräch führen vor.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Konkret",
              "sachlich",
              "und",
              "kommunizieren"
            ],
            "answer": [
              0,
              2,
              1,
              3
            ],
            "explanation": "Richtig: Konkret und sachlich kommunizieren."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Ich möchte Sie darüber ___.",
            "options": [
              "informieren",
              "danke",
              "Name"
            ],
            "answer": "informieren",
            "explanation": "Ich möchte Sie darüber informieren."
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand stellt dir eine Frage zum Thema Ein Abschlussgespräch führen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Antworten",
              "zeigen",
              "Professionelle",
              "Kompetenz"
            ],
            "answer": [
              2,
              0,
              1,
              3
            ],
            "explanation": "Richtig: Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "fill_blank",
            "situation": "Du bewirbst dich auf eine Stelle.",
            "question": "Bewerbungsunterlagen müssen vollständig und professionell ___.",
            "options": [
              "sein",
              "bin",
              "sofort"
            ],
            "answer": "sein",
            "explanation": "Bewerbungsunterlagen müssen vollständig und professionell sein."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Situation: Ein Abschlussgespräch führen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Klar, sachlich und höflich.",
              "Das ist zu kompliziert.",
              "Ich bin nicht zuständig."
            ],
            "answer": 0,
            "explanation": "Professionelle Kommunikation ist bei Ein Abschlussgespräch führen wichtig."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bereitest dich auf Ein Abschlussgespräch führen vor.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "das",
              "Das betrifft mich nicht.",
              "Ich bin nicht zuständig."
            ],
            "answer": 0,
            "explanation": "Konkret und sachlich kommunizieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst einen formellen Satz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich möchte Sie darüber informieren",
              "Das ist zu kompliziert.",
              "Keine Kommentare."
            ],
            "answer": 0,
            "explanation": "Richtig: Ich möchte Sie darüber informieren."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand stellt dir eine Frage zum Thema Ein Abschlussgespräch führen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Sachlich und professionell antworten.",
              "Ich bin nicht zuständig.",
              "Ich lehne das ab."
            ],
            "answer": 0,
            "explanation": "Professionelle Antworten zeigen Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du bewirbst dich auf eine Stelle.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ein professionelles Anschreiben und Lebenslauf.",
              "Das sehe ich anders.",
              "Das wurde schon besprochen."
            ],
            "answer": 0,
            "explanation": "Bewerbungsunterlagen müssen vollständig und professionell sein."
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
        "wrong": "Kurz und knapp.",
        "correct": "Klar, sachlich und höflich.",
        "tip": "Professionelle Kommunikation ist bei Ein Abschlussgespräch führen wichtig."
      },
      {
        "wrong": "etwas",
        "correct": "das",
        "tip": "Konkret und sachlich kommunizieren."
      },
      {
        "wrong": "Kurz nicken.",
        "correct": "Sachlich und professionell antworten.",
        "tip": "Professionelle Antworten zeigen Kompetenz."
      }
    ]
  }
];
