import type { Lesson } from "./types";

export const lessonsB1: Lesson[] = [
  {
    "id": "b1-01",
    "level": "B1",
    "title": "Telefongespräch",
    "titleDe": "Am Telefon (formell)",
    "icon": "📞",
    "premium": false,
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
    "id": "b1-02",
    "level": "B1",
    "title": "Bewerbungsgespräch",
    "titleDe": "Im Vorstellungsgespräch",
    "icon": "💼",
    "premium": false,
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
    "id": "b1-03",
    "level": "B1",
    "title": "Formelle E-Mail",
    "titleDe": "Formelle E-Mail schreiben",
    "icon": "✉️",
    "premium": false,
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
    "id": "b1-04",
    "level": "B1",
    "title": "Mietrecht",
    "titleDe": "Mietrecht verstehen",
    "icon": "⚖️",
    "premium": false,
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
      }
    ]
  }
];
