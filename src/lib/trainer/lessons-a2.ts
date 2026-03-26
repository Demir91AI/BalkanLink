import type { Lesson } from "./types";

export const lessonsA2: Lesson[] = [
  {
    "id": "a2-01",
    "level": "A2",
    "title": "Arbeitsvertrag",
    "titleDe": "Den Arbeitsvertrag verstehen",
    "icon": "📋",
    "premium": false,
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
    "id": "a2-02",
    "level": "A2",
    "title": "Versicherung",
    "titleDe": "Versicherungen abschließen",
    "icon": "🛡️",
    "premium": false,
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
    "id": "a2-03",
    "level": "A2",
    "title": "Reklamation",
    "titleDe": "Etwas reklamieren",
    "icon": "📦",
    "premium": false,
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
    "id": "a2-04",
    "level": "A2",
    "title": "Arztbesuch 2",
    "titleDe": "Beim Facharzt",
    "icon": "🏥",
    "premium": false,
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
    "id": "a2-05",
    "level": "A2",
    "title": "Strom anmelden",
    "titleDe": "Strom und Gas anmelden",
    "icon": "⚡",
    "premium": false,
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
    "id": "a2-06",
    "level": "A2",
    "title": "Bewerbung",
    "titleDe": "Eine Bewerbung schreiben",
    "icon": "✉️",
    "premium": false,
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
    "id": "a2-07",
    "level": "A2",
    "title": "Umzug",
    "titleDe": "Umzug planen",
    "icon": "📦",
    "premium": false,
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
    "id": "a2-08",
    "level": "A2",
    "title": "Elternsprechtag",
    "titleDe": "Beim Elternsprechtag",
    "icon": "👨‍👩‍👦",
    "premium": false,
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
    "id": "a2-09",
    "level": "A2",
    "title": "Verein beitreten",
    "titleDe": "Einem Verein beitreten",
    "icon": "🏅",
    "premium": false,
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
    "id": "a2-10",
    "level": "A2",
    "title": "Nachrichten",
    "titleDe": "Nachrichten verstehen",
    "icon": "📰",
    "premium": false,
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
    "id": "a2-11",
    "level": "A2",
    "title": "Vermieter",
    "titleDe": "Mit dem Vermieter sprechen",
    "icon": "🔑",
    "premium": true,
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
    "id": "a2-12",
    "level": "A2",
    "title": "Werkstatt",
    "titleDe": "Auto in die Werkstatt bringen",
    "icon": "🔧",
    "premium": true,
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
    "id": "a2-13",
    "level": "A2",
    "title": "Friseur",
    "titleDe": "Beim Friseur",
    "icon": "💇",
    "premium": true,
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
    "id": "a2-14",
    "level": "A2",
    "title": "Bibliothek",
    "titleDe": "In der Bibliothek",
    "icon": "📚",
    "premium": true,
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
    "id": "a2-15",
    "level": "A2",
    "title": "Reise buchen",
    "titleDe": "Eine Reise buchen",
    "icon": "✈️",
    "premium": true,
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
    "id": "a2-16",
    "level": "A2",
    "title": "Fitnessstudio",
    "titleDe": "Im Fitnessstudio",
    "icon": "🏃",
    "premium": true,
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
    "id": "a2-17",
    "level": "A2",
    "title": "Beschwerden",
    "titleDe": "Beschwerden äußern",
    "icon": "😤",
    "premium": true,
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
    "id": "a2-18",
    "level": "A2",
    "title": "Einladung",
    "titleDe": "Eine Einladung annehmen",
    "icon": "💌",
    "premium": true,
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
    "id": "a2-19",
    "level": "A2",
    "title": "Haustiere",
    "titleDe": "Über Haustiere sprechen",
    "icon": "🐕",
    "premium": true,
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
    "id": "a2-20",
    "level": "A2",
    "title": "Steuererklärung",
    "titleDe": "Steuererklärung einfach",
    "icon": "💰",
    "premium": true,
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
    "id": "a2-21",
    "level": "A2",
    "title": "Handyvertrag",
    "titleDe": "Handyvertrag abschließen",
    "icon": "📱",
    "premium": true,
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
    "id": "a2-22",
    "level": "A2",
    "title": "Waschmaschine",
    "titleDe": "Waschmaschine benutzen",
    "icon": "🧺",
    "premium": true,
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
    "id": "a2-23",
    "level": "A2",
    "title": "Parkplatz",
    "titleDe": "Einen Parkplatz finden",
    "icon": "🅿️",
    "premium": true,
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
    "id": "a2-24",
    "level": "A2",
    "title": "Fundbüro",
    "titleDe": "Im Fundbüro",
    "icon": "🔍",
    "premium": true,
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
    "id": "a2-25",
    "level": "A2",
    "title": "Renovierung",
    "titleDe": "Wohnung renovieren",
    "icon": "🪣",
    "premium": true,
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
    "id": "a2-26",
    "level": "A2",
    "title": "Kindergeld",
    "titleDe": "Kindergeld beantragen",
    "icon": "👶",
    "premium": true,
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
    "id": "a2-27",
    "level": "A2",
    "title": "Zahnarzt",
    "titleDe": "Beim Zahnarzt",
    "icon": "🦷",
    "premium": true,
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
    "id": "a2-28",
    "level": "A2",
    "title": "Sommerfest",
    "titleDe": "Auf einem Sommerfest",
    "icon": "🎉",
    "premium": true,
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
    "id": "a2-29",
    "level": "A2",
    "title": "Zeugnis",
    "titleDe": "Ein Arbeitszeugnis",
    "icon": "📜",
    "premium": true,
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
    "id": "a2-30",
    "level": "A2",
    "title": "Baustelle",
    "titleDe": "Auf der Baustelle",
    "icon": "🏗️",
    "premium": true,
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
    "id": "a2-31",
    "level": "A2",
    "title": "Tankstelle",
    "titleDe": "An der Tankstelle",
    "icon": "⛽",
    "premium": true,
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
    "id": "a2-32",
    "level": "A2",
    "title": "Reinigung",
    "titleDe": "In der Reinigung",
    "icon": "👔",
    "premium": true,
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
    "id": "a2-33",
    "level": "A2",
    "title": "Marktplatz",
    "titleDe": "Auf dem Wochenmarkt",
    "icon": "🥦",
    "premium": true,
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
    "id": "a2-34",
    "level": "A2",
    "title": "Nachbarschaftshilfe",
    "titleDe": "Nachbarn helfen",
    "icon": "🤝",
    "premium": true,
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
    "id": "a2-35",
    "level": "A2",
    "title": "Spielplatz",
    "titleDe": "Auf dem Spielplatz",
    "icon": "🎠",
    "premium": true,
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
    "id": "a2-36",
    "level": "A2",
    "title": "Volkshochschule",
    "titleDe": "An der VHS anmelden",
    "icon": "🎓",
    "premium": true,
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
    "id": "a2-37",
    "level": "A2",
    "title": "Nebenjob",
    "titleDe": "Einen Nebenjob suchen",
    "icon": "💼",
    "premium": true,
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
    "id": "a2-38",
    "level": "A2",
    "title": "Beschwerde schreiben",
    "titleDe": "Eine Beschwerde schreiben",
    "icon": "✍️",
    "premium": true,
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
    "id": "a2-39",
    "level": "A2",
    "title": "Sprechstunde",
    "titleDe": "In der Sprechstunde",
    "icon": "🗣️",
    "premium": true,
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
    "id": "a2-40",
    "level": "A2",
    "title": "Urlaub nehmen",
    "titleDe": "Urlaub beantragen",
    "icon": "🏖️",
    "premium": true,
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
  }
];
