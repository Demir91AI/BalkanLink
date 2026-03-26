import type { Lesson } from "./types";

export const lessonsC1: Lesson[] = [
  {
    "id": "c1-01",
    "level": "C1",
    "title": "Verhandlungstechnik",
    "titleDe": "Verhandlungstechniken anwenden",
    "icon": "🎯",
    "premium": false,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Du führst eine schwierige Verhandlung.",
            "question": "Wie eröffnest du?",
            "options": [
              "Ich würde gerne unsere Positionen klären, bevor wir ins Detail gehen.",
              "Was wollen Sie?",
              "Fangen wir an."
            ],
            "answer": 0,
            "explanation": "Eine professionelle Eröffnung schafft eine gute Verhandlungsbasis."
          },
          {
            "type": "fill_blank",
            "situation": "Du machst ein Zugeständnis.",
            "question": "Unter der ___, dass Sie uns entgegenkommen, können wir zustimmen.",
            "options": [
              "Voraussetzung",
              "Bedingung",
              "Annahme"
            ],
            "answer": "Voraussetzung",
            "explanation": "Unter der Voraussetzung, dass... ist die formelle Formulierung."
          },
          {
            "type": "sort_sentence",
            "situation": "Du fasst ein Ergebnis zusammen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Ergebnisse",
              "Lassen",
              "die",
              "uns",
              "zusammenfassen",
              "Sie"
            ],
            "answer": [
              1,
              5,
              3,
              2,
              0,
              4
            ],
            "explanation": "Richtig: Lassen Sie uns die Ergebnisse zusammenfassen."
          },
          {
            "type": "quick_reaction",
            "situation": "Die Gegenseite lehnt deinen Vorschlag ab.",
            "question": "Wie reagierst du?",
            "options": [
              "Ich verstehe Ihre Position. Welche Alternative würden Sie vorschlagen?",
              "Das ist inakzeptabel.",
              "Dann ist das Gespräch beendet."
            ],
            "answer": 0,
            "explanation": "Nach Alternativen fragen hält die Verhandlung offen."
          },
          {
            "type": "quick_reaction",
            "situation": "Du verhandelst über dein Gehalt.",
            "question": "Wie argumentierst du?",
            "options": [
              "Ich begründe meine Forderung mit Leistung und Marktwert.",
              "Ich sage, ich brauche mehr Geld.",
              "Ich drohe mit Kündigung."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation ist bei Gehaltsverhandlungen entscheidend."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Du führst eine schwierige Verhandlung.",
            "question": "Eine professionelle Eröffnung schafft eine ___ Verhandlungsbasis.",
            "options": [
              "gute",
              "Arbeit",
              "hier"
            ],
            "answer": "gute",
            "explanation": "Eine professionelle Eröffnung schafft eine gute Verhandlungsbasis."
          },
          {
            "type": "sort_sentence",
            "situation": "Du machst ein Zugeständnis.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "ist",
              "Voraussetzung,",
              "formelle",
              "dass...",
              "Unter",
              "der",
              "Formulierung",
              "die"
            ],
            "answer": [
              4,
              5,
              1,
              3,
              0,
              7,
              2,
              6
            ],
            "explanation": "Richtig: Unter der Voraussetzung, dass... ist die formelle Formulierung."
          },
          {
            "type": "fill_blank",
            "situation": "Du fasst ein Ergebnis zusammen.",
            "question": "Lassen Sie uns die ___ zusammenfassen.",
            "options": [
              "Ergebnisse",
              "Arbeit",
              "Geld"
            ],
            "answer": "Ergebnisse",
            "explanation": "Lassen Sie uns die Ergebnisse zusammenfassen."
          },
          {
            "type": "sort_sentence",
            "situation": "Die Gegenseite lehnt deinen Vorschlag ab.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "fragen",
              "offen",
              "hält",
              "Alternativen",
              "die",
              "Nach",
              "Verhandlung"
            ],
            "answer": [
              5,
              3,
              0,
              2,
              4,
              6,
              1
            ],
            "explanation": "Richtig: Nach Alternativen fragen hält die Verhandlung offen."
          },
          {
            "type": "fill_blank",
            "situation": "Du verhandelst über dein Gehalt.",
            "question": "Sachliche Argumentation ist bei Gehaltsverhandlungen ___.",
            "options": [
              "entscheidend",
              "gestern",
              "schlecht"
            ],
            "answer": "entscheidend",
            "explanation": "Sachliche Argumentation ist bei Gehaltsverhandlungen entscheidend."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Du führst eine schwierige Verhandlung.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich würde gerne unsere Positionen klären, bevor wir ins Detail gehen.",
              "Das kann man so nicht sagen.",
              "Darüber lässt sich streiten."
            ],
            "answer": 0,
            "explanation": "Eine professionelle Eröffnung schafft eine gute Verhandlungsbasis."
          },
          {
            "type": "quick_reaction",
            "situation": "Du machst ein Zugeständnis.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Voraussetzung",
              "Das greift zu kurz.",
              "Das ist vereinfacht dargestellt."
            ],
            "answer": 0,
            "explanation": "Unter der Voraussetzung, dass... ist die formelle Formulierung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du fasst ein Ergebnis zusammen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Lassen Sie uns die Ergebnisse zusammenfassen",
              "Das bedarf einer Analyse.",
              "Das kann man so nicht sagen."
            ],
            "answer": 0,
            "explanation": "Richtig: Lassen Sie uns die Ergebnisse zusammenfassen."
          },
          {
            "type": "quick_reaction",
            "situation": "Die Gegenseite lehnt deinen Vorschlag ab.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich verstehe Ihre Position. Welche Alternative würden Sie vorschlagen?",
              "Das greift zu kurz.",
              "Das bedarf einer Analyse."
            ],
            "answer": 0,
            "explanation": "Nach Alternativen fragen hält die Verhandlung offen."
          },
          {
            "type": "quick_reaction",
            "situation": "Du verhandelst über dein Gehalt.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich begründe meine Forderung mit Leistung und Marktwert.",
              "Das ist vereinfacht dargestellt.",
              "Ich sehe mich außerstande dazu."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation ist bei Gehaltsverhandlungen entscheidend."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Ich würde gerne unsere Positionen klären, bevor wir ins Detail gehen.",
        "context": "Du führst eine schwierige Verhandlung"
      },
      {
        "de": "Voraussetzung",
        "context": "Du machst ein Zugeständnis"
      },
      {
        "de": "Lassen Sie uns die Ergebnisse zusammenfassen",
        "context": "Du fasst ein Ergebnis zusammen"
      },
      {
        "de": "Ich verstehe Ihre Position. Welche Alternative würden Sie vorschlagen?",
        "context": "Die Gegenseite lehnt deinen Vorschlag ab"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Was wollen Sie?",
        "correct": "Ich würde gerne unsere Positionen klären, bevor wir ins Detail gehen.",
        "tip": "Eine professionelle Eröffnung schafft eine gute Verhandlungsbasis."
      },
      {
        "wrong": "Bedingung",
        "correct": "Voraussetzung",
        "tip": "Unter der Voraussetzung, dass... ist die formelle Formulierung."
      },
      {
        "wrong": "Das ist inakzeptabel.",
        "correct": "Ich verstehe Ihre Position. Welche Alternative würden Sie vorschlagen?",
        "tip": "Nach Alternativen fragen hält die Verhandlung offen."
      }
    ]
  },
  {
    "id": "c1-02",
    "level": "C1",
    "title": "Fachpräsentation",
    "titleDe": "Eine Fachpräsentation halten",
    "icon": "📊",
    "premium": false,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Kontext: Eine Fachpräsentation halten.",
            "question": "Wie drückst du dich angemessen aus?",
            "options": [
              "Differenziert und nuanciert argumentieren.",
              "Einfach formulieren.",
              "Nichts sagen."
            ],
            "answer": 0,
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "fill_blank",
            "situation": "Du diskutierst über Eine Fachpräsentation halten.",
            "question": "Man muss in Betracht ___, dass verschiedene Perspektiven existieren.",
            "options": [
              "ziehen",
              "nehmen",
              "bringen"
            ],
            "answer": "ziehen",
            "explanation": "In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "dass",
              "Es",
              "sei",
              "darauf",
              "hingewiesen"
            ],
            "answer": [
              1,
              3,
              4,
              0,
              2
            ],
            "explanation": "Richtig: Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Wie reagierst du?",
            "options": [
              "Ihren Einwand kann ich nachvollziehen, dennoch...",
              "Das stimmt nicht.",
              "Lassen Sie mich ausreden."
            ],
            "answer": 0,
            "explanation": "Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du leitest ein Projektmeeting.",
            "question": "Wie eröffnest du?",
            "options": [
              "Ich begrüße alle und gebe einen Überblick über die Agenda.",
              "Fangen wir an.",
              "Hat jemand Fragen?"
            ],
            "answer": 0,
            "explanation": "Eine strukturierte Eröffnung gibt dem Meeting Richtung."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Kontext: Eine Fachpräsentation halten.",
            "question": "Auf C1-Niveau wird differenzierte ___ erwartet.",
            "options": [
              "Ausdrucksweise",
              "möchte",
              "gerne"
            ],
            "answer": "Ausdrucksweise",
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "sort_sentence",
            "situation": "Du diskutierst über Eine Fachpräsentation halten.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "In",
              "ist",
              "Wendung",
              "Betracht",
              "die",
              "korrekte",
              "ziehen"
            ],
            "answer": [
              0,
              3,
              6,
              1,
              4,
              5,
              2
            ],
            "explanation": "Richtig: In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Es ___ darauf hingewiesen, dass...",
            "options": [
              "sei",
              "frage",
              "Hilfe"
            ],
            "answer": "sei",
            "explanation": "Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sachlich",
              "zeigt",
              "Kompetenz",
              "eingehen",
              "Einwände",
              "auf"
            ],
            "answer": [
              0,
              5,
              4,
              3,
              1,
              2
            ],
            "explanation": "Richtig: Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "fill_blank",
            "situation": "Du leitest ein Projektmeeting.",
            "question": "Eine strukturierte Eröffnung ___ dem Meeting Richtung.",
            "options": [
              "gibt",
              "langsam",
              "Frage"
            ],
            "answer": "gibt",
            "explanation": "Eine strukturierte Eröffnung gibt dem Meeting Richtung."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Kontext: Eine Fachpräsentation halten.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Differenziert und nuanciert argumentieren.",
              "Ich halte das für nicht zielführend.",
              "Ich sehe mich außerstande dazu."
            ],
            "answer": 0,
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "quick_reaction",
            "situation": "Du diskutierst über Eine Fachpräsentation halten.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "ziehen",
              "Ich halte das für nicht zielführend.",
              "Das entzieht sich meiner Kenntnis."
            ],
            "answer": 0,
            "explanation": "In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Es darauf hingewiesen dass sei",
              "Das kann man so nicht sagen.",
              "Eine pauschale Aussage ist schwierig."
            ],
            "answer": 0,
            "explanation": "Richtig: Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ihren Einwand kann ich nachvollziehen, dennoch...",
              "Eine pauschale Aussage ist schwierig.",
              "Das würde den Rahmen sprengen."
            ],
            "answer": 0,
            "explanation": "Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du leitest ein Projektmeeting.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich begrüße alle und gebe einen Überblick über die Agenda.",
              "Ich sehe mich außerstande dazu.",
              "Ich halte das für nicht zielführend."
            ],
            "answer": 0,
            "explanation": "Eine strukturierte Eröffnung gibt dem Meeting Richtung."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Differenziert und nuanciert argumentieren.",
        "context": "Kontext: Eine Fachpräsentation halten"
      },
      {
        "de": "ziehen",
        "context": "Du diskutierst über Eine Fachpräsentation halten"
      },
      {
        "de": "Es darauf hingewiesen dass sei",
        "context": "Du formulierst eine differenzierte Aussage"
      },
      {
        "de": "Ihren Einwand kann ich nachvollziehen, dennoch...",
        "context": "Jemand widerspricht deiner These"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Einfach formulieren.",
        "correct": "Differenziert und nuanciert argumentieren.",
        "tip": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
      },
      {
        "wrong": "nehmen",
        "correct": "ziehen",
        "tip": "In Betracht ziehen ist die korrekte Wendung."
      },
      {
        "wrong": "Das stimmt nicht.",
        "correct": "Ihren Einwand kann ich nachvollziehen, dennoch...",
        "tip": "Sachlich auf Einwände eingehen zeigt Kompetenz."
      }
    ]
  },
  {
    "id": "c1-03",
    "level": "C1",
    "title": "Wissenschaftlicher Text",
    "titleDe": "Wissenschaftliche Texte verstehen",
    "icon": "📖",
    "premium": false,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Kontext: Wissenschaftliche Texte verstehen.",
            "question": "Wie drückst du dich angemessen aus?",
            "options": [
              "Differenziert und nuanciert argumentieren.",
              "Einfach formulieren.",
              "Nichts sagen."
            ],
            "answer": 0,
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "fill_blank",
            "situation": "Du diskutierst über Wissenschaftliche Texte verstehen.",
            "question": "Man muss in Betracht ___, dass verschiedene Perspektiven existieren.",
            "options": [
              "ziehen",
              "nehmen",
              "bringen"
            ],
            "answer": "ziehen",
            "explanation": "In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "dass",
              "Es",
              "sei",
              "darauf",
              "hingewiesen"
            ],
            "answer": [
              1,
              3,
              4,
              0,
              2
            ],
            "explanation": "Richtig: Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Wie reagierst du?",
            "options": [
              "Ihren Einwand kann ich nachvollziehen, dennoch...",
              "Das stimmt nicht.",
              "Lassen Sie mich ausreden."
            ],
            "answer": 0,
            "explanation": "Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Ein Konflikt im Team eskaliert.",
            "question": "Was tust du?",
            "options": [
              "Ich führe Einzelgespräche und vermittle neutral.",
              "Ich ignoriere es.",
              "Ich beschwere mich beim Chef."
            ],
            "answer": 0,
            "explanation": "Konfliktlösung erfordert Einfühlungsvermögen und Neutralität."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Kontext: Wissenschaftliche Texte verstehen.",
            "question": "Auf C1-Niveau ___ differenzierte Ausdrucksweise erwartet.",
            "options": [
              "wird",
              "falsch",
              "will"
            ],
            "answer": "wird",
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "sort_sentence",
            "situation": "Du diskutierst über Wissenschaftliche Texte verstehen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "die",
              "In",
              "Betracht",
              "ziehen",
              "ist",
              "korrekte",
              "Wendung"
            ],
            "answer": [
              1,
              2,
              3,
              4,
              0,
              5,
              6
            ],
            "explanation": "Richtig: In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Es sei ___ hingewiesen, dass...",
            "options": [
              "darauf",
              "möchte",
              "nehme"
            ],
            "answer": "darauf",
            "explanation": "Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Kompetenz",
              "auf",
              "Sachlich",
              "zeigt",
              "eingehen",
              "Einwände"
            ],
            "answer": [
              2,
              1,
              5,
              4,
              3,
              0
            ],
            "explanation": "Richtig: Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "fill_blank",
            "situation": "Ein Konflikt im Team eskaliert.",
            "question": "Konfliktlösung erfordert ___ und Neutralität.",
            "options": [
              "Einfühlungsvermögen",
              "gleich",
              "soll"
            ],
            "answer": "Einfühlungsvermögen",
            "explanation": "Konfliktlösung erfordert Einfühlungsvermögen und Neutralität."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Kontext: Wissenschaftliche Texte verstehen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Differenziert und nuanciert argumentieren.",
              "Ich halte das für nicht zielführend.",
              "Darüber lässt sich streiten."
            ],
            "answer": 0,
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "quick_reaction",
            "situation": "Du diskutierst über Wissenschaftliche Texte verstehen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "ziehen",
              "Das kann man so nicht sagen.",
              "Das bedarf einer Analyse."
            ],
            "answer": 0,
            "explanation": "In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Es darauf hingewiesen dass sei",
              "Darüber lässt sich streiten.",
              "Das kann man so nicht sagen."
            ],
            "answer": 0,
            "explanation": "Richtig: Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ihren Einwand kann ich nachvollziehen, dennoch...",
              "Das entzieht sich meiner Kenntnis.",
              "Das würde den Rahmen sprengen."
            ],
            "answer": 0,
            "explanation": "Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Ein Konflikt im Team eskaliert.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich führe Einzelgespräche und vermittle neutral.",
              "Ich halte das für nicht zielführend.",
              "Das ist vereinfacht dargestellt."
            ],
            "answer": 0,
            "explanation": "Konfliktlösung erfordert Einfühlungsvermögen und Neutralität."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Differenziert und nuanciert argumentieren.",
        "context": "Kontext: Wissenschaftliche Texte verstehen"
      },
      {
        "de": "ziehen",
        "context": "Du diskutierst über Wissenschaftliche Texte verstehen"
      },
      {
        "de": "Es darauf hingewiesen dass sei",
        "context": "Du formulierst eine differenzierte Aussage"
      },
      {
        "de": "Ihren Einwand kann ich nachvollziehen, dennoch...",
        "context": "Jemand widerspricht deiner These"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Einfach formulieren.",
        "correct": "Differenziert und nuanciert argumentieren.",
        "tip": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
      },
      {
        "wrong": "nehmen",
        "correct": "ziehen",
        "tip": "In Betracht ziehen ist die korrekte Wendung."
      },
      {
        "wrong": "Das stimmt nicht.",
        "correct": "Ihren Einwand kann ich nachvollziehen, dennoch...",
        "tip": "Sachlich auf Einwände eingehen zeigt Kompetenz."
      }
    ]
  },
  {
    "id": "c1-04",
    "level": "C1",
    "title": "Medienanalyse",
    "titleDe": "Medienberichte analysieren",
    "icon": "📰",
    "premium": false,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Kontext: Medienberichte analysieren.",
            "question": "Wie drückst du dich angemessen aus?",
            "options": [
              "Differenziert und nuanciert argumentieren.",
              "Einfach formulieren.",
              "Nichts sagen."
            ],
            "answer": 0,
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "fill_blank",
            "situation": "Du diskutierst über Medienberichte analysieren.",
            "question": "Man muss in Betracht ___, dass verschiedene Perspektiven existieren.",
            "options": [
              "ziehen",
              "nehmen",
              "bringen"
            ],
            "answer": "ziehen",
            "explanation": "In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "dass",
              "Es",
              "sei",
              "darauf",
              "hingewiesen"
            ],
            "answer": [
              1,
              3,
              4,
              0,
              2
            ],
            "explanation": "Richtig: Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Wie reagierst du?",
            "options": [
              "Ihren Einwand kann ich nachvollziehen, dennoch...",
              "Das stimmt nicht.",
              "Lassen Sie mich ausreden."
            ],
            "answer": 0,
            "explanation": "Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du musst eine kritische E-Mail schreiben.",
            "question": "Worauf achtest du?",
            "options": [
              "Sachlich bleiben und konstruktive Lösungen vorschlagen.",
              "Meine Frustration ausdrücken.",
              "Kurz und direkt schreiben."
            ],
            "answer": 0,
            "explanation": "Professionelle E-Mails sind sachlich und lösungsorientiert."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Kontext: Medienberichte analysieren.",
            "question": "Auf C1-Niveau ___ differenzierte Ausdrucksweise erwartet.",
            "options": [
              "wird",
              "sofort",
              "gleich"
            ],
            "answer": "wird",
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "sort_sentence",
            "situation": "Du diskutierst über Medienberichte analysieren.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "korrekte",
              "ziehen",
              "In",
              "ist",
              "Wendung",
              "die",
              "Betracht"
            ],
            "answer": [
              2,
              6,
              1,
              3,
              5,
              0,
              4
            ],
            "explanation": "Richtig: In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Es sei darauf hingewiesen, ___...",
            "options": [
              "dass",
              "gestern",
              "Nummer"
            ],
            "answer": "dass",
            "explanation": "Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Einwände",
              "Sachlich",
              "auf",
              "zeigt",
              "Kompetenz",
              "eingehen"
            ],
            "answer": [
              1,
              2,
              0,
              5,
              3,
              4
            ],
            "explanation": "Richtig: Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "fill_blank",
            "situation": "Du musst eine kritische E-Mail schreiben.",
            "question": "Professionelle ___ sind sachlich und lösungsorientiert.",
            "options": [
              "E-Mails",
              "nötig",
              "nehme"
            ],
            "answer": "E-Mails",
            "explanation": "Professionelle E-Mails sind sachlich und lösungsorientiert."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Kontext: Medienberichte analysieren.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Differenziert und nuanciert argumentieren.",
              "Das würde den Rahmen sprengen.",
              "Darüber lässt sich streiten."
            ],
            "answer": 0,
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "quick_reaction",
            "situation": "Du diskutierst über Medienberichte analysieren.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "ziehen",
              "Das entzieht sich meiner Kenntnis.",
              "Darüber lässt sich streiten."
            ],
            "answer": 0,
            "explanation": "In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Es darauf hingewiesen dass sei",
              "Das greift zu kurz.",
              "Ich möchte mich nicht äußern."
            ],
            "answer": 0,
            "explanation": "Richtig: Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ihren Einwand kann ich nachvollziehen, dennoch...",
              "Das entzieht sich meiner Kenntnis.",
              "Das kann man so nicht sagen."
            ],
            "answer": 0,
            "explanation": "Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du musst eine kritische E-Mail schreiben.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Sachlich bleiben und konstruktive Lösungen vorschlagen.",
              "Das entzieht sich meiner Kenntnis.",
              "Das kann man so nicht sagen."
            ],
            "answer": 0,
            "explanation": "Professionelle E-Mails sind sachlich und lösungsorientiert."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Differenziert und nuanciert argumentieren.",
        "context": "Kontext: Medienberichte analysieren"
      },
      {
        "de": "ziehen",
        "context": "Du diskutierst über Medienberichte analysieren"
      },
      {
        "de": "Es darauf hingewiesen dass sei",
        "context": "Du formulierst eine differenzierte Aussage"
      },
      {
        "de": "Ihren Einwand kann ich nachvollziehen, dennoch...",
        "context": "Jemand widerspricht deiner These"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Einfach formulieren.",
        "correct": "Differenziert und nuanciert argumentieren.",
        "tip": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
      },
      {
        "wrong": "nehmen",
        "correct": "ziehen",
        "tip": "In Betracht ziehen ist die korrekte Wendung."
      },
      {
        "wrong": "Das stimmt nicht.",
        "correct": "Ihren Einwand kann ich nachvollziehen, dennoch...",
        "tip": "Sachlich auf Einwände eingehen zeigt Kompetenz."
      }
    ]
  },
  {
    "id": "c1-05",
    "level": "C1",
    "title": "Debatte",
    "titleDe": "An einer Debatte teilnehmen",
    "icon": "🗣️",
    "premium": false,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Kontext: An einer Debatte teilnehmen.",
            "question": "Wie drückst du dich angemessen aus?",
            "options": [
              "Differenziert und nuanciert argumentieren.",
              "Einfach formulieren.",
              "Nichts sagen."
            ],
            "answer": 0,
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "fill_blank",
            "situation": "Du diskutierst über An einer Debatte teilnehmen.",
            "question": "Man muss in Betracht ___, dass verschiedene Perspektiven existieren.",
            "options": [
              "ziehen",
              "nehmen",
              "bringen"
            ],
            "answer": "ziehen",
            "explanation": "In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "dass",
              "Es",
              "sei",
              "darauf",
              "hingewiesen"
            ],
            "answer": [
              1,
              3,
              4,
              0,
              2
            ],
            "explanation": "Richtig: Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Wie reagierst du?",
            "options": [
              "Ihren Einwand kann ich nachvollziehen, dennoch...",
              "Das stimmt nicht.",
              "Lassen Sie mich ausreden."
            ],
            "answer": 0,
            "explanation": "Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du wirst um eine Einschätzung gebeten.",
            "question": "Wie formulierst du diplomatisch?",
            "options": [
              "Meiner Einschätzung nach wäre es ratsam, alternative Ansätze zu prüfen.",
              "Das ist falsch.",
              "Mir fehlt die Zeit dafür."
            ],
            "answer": 0,
            "explanation": "Diplomatische Formulierungen sind auf C1-Niveau essentiell."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Kontext: An einer Debatte teilnehmen.",
            "question": "Auf C1-Niveau ___ differenzierte Ausdrucksweise erwartet.",
            "options": [
              "wird",
              "frage",
              "bitte"
            ],
            "answer": "wird",
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "sort_sentence",
            "situation": "Du diskutierst über An einer Debatte teilnehmen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "ist",
              "korrekte",
              "die",
              "In",
              "Betracht",
              "Wendung",
              "ziehen"
            ],
            "answer": [
              3,
              4,
              6,
              0,
              2,
              1,
              5
            ],
            "explanation": "Richtig: In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Es sei ___ hingewiesen, dass...",
            "options": [
              "darauf",
              "muss",
              "werde"
            ],
            "answer": "darauf",
            "explanation": "Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sachlich",
              "auf",
              "zeigt",
              "eingehen",
              "Kompetenz",
              "Einwände"
            ],
            "answer": [
              0,
              1,
              5,
              3,
              2,
              4
            ],
            "explanation": "Richtig: Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "fill_blank",
            "situation": "Du wirst um eine Einschätzung gebeten.",
            "question": "Diplomatische Formulierungen sind auf ___ essentiell.",
            "options": [
              "C1-Niveau",
              "dort",
              "möchte"
            ],
            "answer": "C1-Niveau",
            "explanation": "Diplomatische Formulierungen sind auf C1-Niveau essentiell."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Kontext: An einer Debatte teilnehmen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Differenziert und nuanciert argumentieren.",
              "Darüber lässt sich streiten.",
              "Ich halte das für nicht zielführend."
            ],
            "answer": 0,
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "quick_reaction",
            "situation": "Du diskutierst über An einer Debatte teilnehmen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "ziehen",
              "Darüber lässt sich streiten.",
              "Ich möchte mich nicht äußern."
            ],
            "answer": 0,
            "explanation": "In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Es darauf hingewiesen dass sei",
              "Das bedarf einer Analyse.",
              "Das wäre kontraproduktiv."
            ],
            "answer": 0,
            "explanation": "Richtig: Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ihren Einwand kann ich nachvollziehen, dennoch...",
              "Das entzieht sich meiner Kenntnis.",
              "Ich möchte mich nicht äußern."
            ],
            "answer": 0,
            "explanation": "Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du wirst um eine Einschätzung gebeten.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Meiner Einschätzung nach wäre es ratsam, alternative Ansätze zu prüfen.",
              "Ich möchte mich nicht äußern.",
              "Das bedarf einer Analyse."
            ],
            "answer": 0,
            "explanation": "Diplomatische Formulierungen sind auf C1-Niveau essentiell."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Differenziert und nuanciert argumentieren.",
        "context": "Kontext: An einer Debatte teilnehmen"
      },
      {
        "de": "ziehen",
        "context": "Du diskutierst über An einer Debatte teilnehmen"
      },
      {
        "de": "Es darauf hingewiesen dass sei",
        "context": "Du formulierst eine differenzierte Aussage"
      },
      {
        "de": "Ihren Einwand kann ich nachvollziehen, dennoch...",
        "context": "Jemand widerspricht deiner These"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Einfach formulieren.",
        "correct": "Differenziert und nuanciert argumentieren.",
        "tip": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
      },
      {
        "wrong": "nehmen",
        "correct": "ziehen",
        "tip": "In Betracht ziehen ist die korrekte Wendung."
      },
      {
        "wrong": "Das stimmt nicht.",
        "correct": "Ihren Einwand kann ich nachvollziehen, dennoch...",
        "tip": "Sachlich auf Einwände eingehen zeigt Kompetenz."
      }
    ]
  },
  {
    "id": "c1-06",
    "level": "C1",
    "title": "Gutachten erstellen",
    "titleDe": "Ein Gutachten erstellen",
    "icon": "📋",
    "premium": false,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Kontext: Ein Gutachten erstellen.",
            "question": "Wie drückst du dich angemessen aus?",
            "options": [
              "Differenziert und nuanciert argumentieren.",
              "Einfach formulieren.",
              "Nichts sagen."
            ],
            "answer": 0,
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "fill_blank",
            "situation": "Du diskutierst über Ein Gutachten erstellen.",
            "question": "Man muss in Betracht ___, dass verschiedene Perspektiven existieren.",
            "options": [
              "ziehen",
              "nehmen",
              "bringen"
            ],
            "answer": "ziehen",
            "explanation": "In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "dass",
              "Es",
              "sei",
              "darauf",
              "hingewiesen"
            ],
            "answer": [
              1,
              3,
              4,
              0,
              2
            ],
            "explanation": "Richtig: Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Wie reagierst du?",
            "options": [
              "Ihren Einwand kann ich nachvollziehen, dennoch...",
              "Das stimmt nicht.",
              "Lassen Sie mich ausreden."
            ],
            "answer": 0,
            "explanation": "Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du verhandelst über dein Gehalt.",
            "question": "Wie argumentierst du?",
            "options": [
              "Ich begründe meine Forderung mit Leistung und Marktwert.",
              "Ich sage, ich brauche mehr Geld.",
              "Ich drohe mit Kündigung."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation ist bei Gehaltsverhandlungen entscheidend."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Kontext: Ein Gutachten erstellen.",
            "question": "Auf C1-Niveau ___ differenzierte Ausdrucksweise erwartet.",
            "options": [
              "wird",
              "leider",
              "bin"
            ],
            "answer": "wird",
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "sort_sentence",
            "situation": "Du diskutierst über Ein Gutachten erstellen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "ziehen",
              "ist",
              "korrekte",
              "In",
              "Betracht",
              "Wendung",
              "die"
            ],
            "answer": [
              3,
              4,
              0,
              1,
              6,
              2,
              5
            ],
            "explanation": "Richtig: In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Es sei darauf hingewiesen, ___...",
            "options": [
              "dass",
              "gestern",
              "suche"
            ],
            "answer": "dass",
            "explanation": "Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "auf",
              "eingehen",
              "Einwände",
              "Sachlich",
              "Kompetenz",
              "zeigt"
            ],
            "answer": [
              3,
              0,
              2,
              1,
              5,
              4
            ],
            "explanation": "Richtig: Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "fill_blank",
            "situation": "Du verhandelst über dein Gehalt.",
            "question": "Sachliche ___ ist bei Gehaltsverhandlungen entscheidend.",
            "options": [
              "Argumentation",
              "jetzt",
              "bin"
            ],
            "answer": "Argumentation",
            "explanation": "Sachliche Argumentation ist bei Gehaltsverhandlungen entscheidend."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Kontext: Ein Gutachten erstellen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Differenziert und nuanciert argumentieren.",
              "Das entzieht sich meiner Kenntnis.",
              "Ich sehe mich außerstande dazu."
            ],
            "answer": 0,
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "quick_reaction",
            "situation": "Du diskutierst über Ein Gutachten erstellen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "ziehen",
              "Das wäre kontraproduktiv.",
              "Ich halte das für nicht zielführend."
            ],
            "answer": 0,
            "explanation": "In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Es darauf hingewiesen dass sei",
              "Das wäre kontraproduktiv.",
              "Ich sehe mich außerstande dazu."
            ],
            "answer": 0,
            "explanation": "Richtig: Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ihren Einwand kann ich nachvollziehen, dennoch...",
              "Das greift zu kurz.",
              "Das ist vereinfacht dargestellt."
            ],
            "answer": 0,
            "explanation": "Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du verhandelst über dein Gehalt.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich begründe meine Forderung mit Leistung und Marktwert.",
              "Ich halte das für nicht zielführend.",
              "Das bedarf einer Analyse."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation ist bei Gehaltsverhandlungen entscheidend."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Differenziert und nuanciert argumentieren.",
        "context": "Kontext: Ein Gutachten erstellen"
      },
      {
        "de": "ziehen",
        "context": "Du diskutierst über Ein Gutachten erstellen"
      },
      {
        "de": "Es darauf hingewiesen dass sei",
        "context": "Du formulierst eine differenzierte Aussage"
      },
      {
        "de": "Ihren Einwand kann ich nachvollziehen, dennoch...",
        "context": "Jemand widerspricht deiner These"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Einfach formulieren.",
        "correct": "Differenziert und nuanciert argumentieren.",
        "tip": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
      },
      {
        "wrong": "nehmen",
        "correct": "ziehen",
        "tip": "In Betracht ziehen ist die korrekte Wendung."
      },
      {
        "wrong": "Das stimmt nicht.",
        "correct": "Ihren Einwand kann ich nachvollziehen, dennoch...",
        "tip": "Sachlich auf Einwände eingehen zeigt Kompetenz."
      }
    ]
  },
  {
    "id": "c1-07",
    "level": "C1",
    "title": "Vertragsrecht",
    "titleDe": "Vertragsrecht verstehen",
    "icon": "⚖️",
    "premium": false,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Kontext: Vertragsrecht verstehen.",
            "question": "Wie drückst du dich angemessen aus?",
            "options": [
              "Differenziert und nuanciert argumentieren.",
              "Einfach formulieren.",
              "Nichts sagen."
            ],
            "answer": 0,
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "fill_blank",
            "situation": "Du diskutierst über Vertragsrecht verstehen.",
            "question": "Man muss in Betracht ___, dass verschiedene Perspektiven existieren.",
            "options": [
              "ziehen",
              "nehmen",
              "bringen"
            ],
            "answer": "ziehen",
            "explanation": "In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "dass",
              "Es",
              "sei",
              "darauf",
              "hingewiesen"
            ],
            "answer": [
              1,
              3,
              4,
              0,
              2
            ],
            "explanation": "Richtig: Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Wie reagierst du?",
            "options": [
              "Ihren Einwand kann ich nachvollziehen, dennoch...",
              "Das stimmt nicht.",
              "Lassen Sie mich ausreden."
            ],
            "answer": 0,
            "explanation": "Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du leitest ein Projektmeeting.",
            "question": "Wie eröffnest du?",
            "options": [
              "Ich begrüße alle und gebe einen Überblick über die Agenda.",
              "Fangen wir an.",
              "Hat jemand Fragen?"
            ],
            "answer": 0,
            "explanation": "Eine strukturierte Eröffnung gibt dem Meeting Richtung."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Kontext: Vertragsrecht verstehen.",
            "question": "Auf C1-Niveau ___ differenzierte Ausdrucksweise erwartet.",
            "options": [
              "wird",
              "bitte",
              "dort"
            ],
            "answer": "wird",
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "sort_sentence",
            "situation": "Du diskutierst über Vertragsrecht verstehen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Betracht",
              "Wendung",
              "die",
              "ist",
              "ziehen",
              "In",
              "korrekte"
            ],
            "answer": [
              5,
              0,
              4,
              3,
              2,
              6,
              1
            ],
            "explanation": "Richtig: In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Es sei darauf ___, dass...",
            "options": [
              "hingewiesen",
              "morgen",
              "heute"
            ],
            "answer": "hingewiesen",
            "explanation": "Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "zeigt",
              "Einwände",
              "Sachlich",
              "eingehen",
              "auf",
              "Kompetenz"
            ],
            "answer": [
              2,
              4,
              1,
              3,
              0,
              5
            ],
            "explanation": "Richtig: Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "fill_blank",
            "situation": "Du leitest ein Projektmeeting.",
            "question": "Eine strukturierte Eröffnung ___ dem Meeting Richtung.",
            "options": [
              "gibt",
              "will",
              "darf"
            ],
            "answer": "gibt",
            "explanation": "Eine strukturierte Eröffnung gibt dem Meeting Richtung."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Kontext: Vertragsrecht verstehen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Differenziert und nuanciert argumentieren.",
              "Ich halte das für nicht zielführend.",
              "Ich möchte mich nicht äußern."
            ],
            "answer": 0,
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "quick_reaction",
            "situation": "Du diskutierst über Vertragsrecht verstehen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "ziehen",
              "Eine pauschale Aussage ist schwierig.",
              "Ich möchte mich nicht äußern."
            ],
            "answer": 0,
            "explanation": "In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Es darauf hingewiesen dass sei",
              "Das ist vereinfacht dargestellt.",
              "Das greift zu kurz."
            ],
            "answer": 0,
            "explanation": "Richtig: Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ihren Einwand kann ich nachvollziehen, dennoch...",
              "Ich möchte mich nicht äußern.",
              "Darüber lässt sich streiten."
            ],
            "answer": 0,
            "explanation": "Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du leitest ein Projektmeeting.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich begrüße alle und gebe einen Überblick über die Agenda.",
              "Das würde den Rahmen sprengen.",
              "Das wäre kontraproduktiv."
            ],
            "answer": 0,
            "explanation": "Eine strukturierte Eröffnung gibt dem Meeting Richtung."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Differenziert und nuanciert argumentieren.",
        "context": "Kontext: Vertragsrecht verstehen"
      },
      {
        "de": "ziehen",
        "context": "Du diskutierst über Vertragsrecht verstehen"
      },
      {
        "de": "Es darauf hingewiesen dass sei",
        "context": "Du formulierst eine differenzierte Aussage"
      },
      {
        "de": "Ihren Einwand kann ich nachvollziehen, dennoch...",
        "context": "Jemand widerspricht deiner These"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Einfach formulieren.",
        "correct": "Differenziert und nuanciert argumentieren.",
        "tip": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
      },
      {
        "wrong": "nehmen",
        "correct": "ziehen",
        "tip": "In Betracht ziehen ist die korrekte Wendung."
      },
      {
        "wrong": "Das stimmt nicht.",
        "correct": "Ihren Einwand kann ich nachvollziehen, dennoch...",
        "tip": "Sachlich auf Einwände eingehen zeigt Kompetenz."
      }
    ]
  },
  {
    "id": "c1-08",
    "level": "C1",
    "title": "Strategiegespräch",
    "titleDe": "Ein Strategiegespräch führen",
    "icon": "🧩",
    "premium": false,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Kontext: Ein Strategiegespräch führen.",
            "question": "Wie drückst du dich angemessen aus?",
            "options": [
              "Differenziert und nuanciert argumentieren.",
              "Einfach formulieren.",
              "Nichts sagen."
            ],
            "answer": 0,
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "fill_blank",
            "situation": "Du diskutierst über Ein Strategiegespräch führen.",
            "question": "Man muss in Betracht ___, dass verschiedene Perspektiven existieren.",
            "options": [
              "ziehen",
              "nehmen",
              "bringen"
            ],
            "answer": "ziehen",
            "explanation": "In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "dass",
              "Es",
              "sei",
              "darauf",
              "hingewiesen"
            ],
            "answer": [
              1,
              3,
              4,
              0,
              2
            ],
            "explanation": "Richtig: Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Wie reagierst du?",
            "options": [
              "Ihren Einwand kann ich nachvollziehen, dennoch...",
              "Das stimmt nicht.",
              "Lassen Sie mich ausreden."
            ],
            "answer": 0,
            "explanation": "Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Ein Konflikt im Team eskaliert.",
            "question": "Was tust du?",
            "options": [
              "Ich führe Einzelgespräche und vermittle neutral.",
              "Ich ignoriere es.",
              "Ich beschwere mich beim Chef."
            ],
            "answer": 0,
            "explanation": "Konfliktlösung erfordert Einfühlungsvermögen und Neutralität."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Kontext: Ein Strategiegespräch führen.",
            "question": "Auf C1-Niveau wird ___ Ausdrucksweise erwartet.",
            "options": [
              "differenzierte",
              "komme",
              "werde"
            ],
            "answer": "differenzierte",
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "sort_sentence",
            "situation": "Du diskutierst über Ein Strategiegespräch führen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "ziehen",
              "In",
              "Wendung",
              "korrekte",
              "Betracht",
              "ist",
              "die"
            ],
            "answer": [
              1,
              4,
              0,
              5,
              6,
              3,
              2
            ],
            "explanation": "Richtig: In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Es ___ darauf hingewiesen, dass...",
            "options": [
              "sei",
              "habe",
              "hier"
            ],
            "answer": "sei",
            "explanation": "Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "auf",
              "Einwände",
              "zeigt",
              "eingehen",
              "Kompetenz",
              "Sachlich"
            ],
            "answer": [
              5,
              0,
              1,
              3,
              2,
              4
            ],
            "explanation": "Richtig: Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "fill_blank",
            "situation": "Ein Konflikt im Team eskaliert.",
            "question": "Konfliktlösung ___ Einfühlungsvermögen und Neutralität.",
            "options": [
              "erfordert",
              "leider",
              "darf"
            ],
            "answer": "erfordert",
            "explanation": "Konfliktlösung erfordert Einfühlungsvermögen und Neutralität."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Kontext: Ein Strategiegespräch führen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Differenziert und nuanciert argumentieren.",
              "Das ist vereinfacht dargestellt.",
              "Das kann man so nicht sagen."
            ],
            "answer": 0,
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "quick_reaction",
            "situation": "Du diskutierst über Ein Strategiegespräch führen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "ziehen",
              "Ich möchte mich nicht äußern.",
              "Ich halte das für nicht zielführend."
            ],
            "answer": 0,
            "explanation": "In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Es darauf hingewiesen dass sei",
              "Das ist vereinfacht dargestellt.",
              "Das würde den Rahmen sprengen."
            ],
            "answer": 0,
            "explanation": "Richtig: Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ihren Einwand kann ich nachvollziehen, dennoch...",
              "Ich halte das für nicht zielführend.",
              "Das entzieht sich meiner Kenntnis."
            ],
            "answer": 0,
            "explanation": "Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Ein Konflikt im Team eskaliert.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich führe Einzelgespräche und vermittle neutral.",
              "Ich sehe mich außerstande dazu.",
              "Das bedarf einer Analyse."
            ],
            "answer": 0,
            "explanation": "Konfliktlösung erfordert Einfühlungsvermögen und Neutralität."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Differenziert und nuanciert argumentieren.",
        "context": "Kontext: Ein Strategiegespräch führen"
      },
      {
        "de": "ziehen",
        "context": "Du diskutierst über Ein Strategiegespräch führen"
      },
      {
        "de": "Es darauf hingewiesen dass sei",
        "context": "Du formulierst eine differenzierte Aussage"
      },
      {
        "de": "Ihren Einwand kann ich nachvollziehen, dennoch...",
        "context": "Jemand widerspricht deiner These"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Einfach formulieren.",
        "correct": "Differenziert und nuanciert argumentieren.",
        "tip": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
      },
      {
        "wrong": "nehmen",
        "correct": "ziehen",
        "tip": "In Betracht ziehen ist die korrekte Wendung."
      },
      {
        "wrong": "Das stimmt nicht.",
        "correct": "Ihren Einwand kann ich nachvollziehen, dennoch...",
        "tip": "Sachlich auf Einwände eingehen zeigt Kompetenz."
      }
    ]
  },
  {
    "id": "c1-09",
    "level": "C1",
    "title": "Krisenmanagement",
    "titleDe": "In Krisensituationen kommunizieren",
    "icon": "🚨",
    "premium": false,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Kontext: In Krisensituationen kommunizieren.",
            "question": "Wie drückst du dich angemessen aus?",
            "options": [
              "Differenziert und nuanciert argumentieren.",
              "Einfach formulieren.",
              "Nichts sagen."
            ],
            "answer": 0,
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "fill_blank",
            "situation": "Du diskutierst über In Krisensituationen kommunizieren.",
            "question": "Man muss in Betracht ___, dass verschiedene Perspektiven existieren.",
            "options": [
              "ziehen",
              "nehmen",
              "bringen"
            ],
            "answer": "ziehen",
            "explanation": "In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "dass",
              "Es",
              "sei",
              "darauf",
              "hingewiesen"
            ],
            "answer": [
              1,
              3,
              4,
              0,
              2
            ],
            "explanation": "Richtig: Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Wie reagierst du?",
            "options": [
              "Ihren Einwand kann ich nachvollziehen, dennoch...",
              "Das stimmt nicht.",
              "Lassen Sie mich ausreden."
            ],
            "answer": 0,
            "explanation": "Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du musst eine kritische E-Mail schreiben.",
            "question": "Worauf achtest du?",
            "options": [
              "Sachlich bleiben und konstruktive Lösungen vorschlagen.",
              "Meine Frustration ausdrücken.",
              "Kurz und direkt schreiben."
            ],
            "answer": 0,
            "explanation": "Professionelle E-Mails sind sachlich und lösungsorientiert."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Kontext: In Krisensituationen kommunizieren.",
            "question": "Auf ___ wird differenzierte Ausdrucksweise erwartet.",
            "options": [
              "C1-Niveau",
              "Frage",
              "Zeit"
            ],
            "answer": "C1-Niveau",
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "sort_sentence",
            "situation": "Du diskutierst über In Krisensituationen kommunizieren.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Betracht",
              "In",
              "die",
              "ist",
              "ziehen",
              "korrekte",
              "Wendung"
            ],
            "answer": [
              1,
              0,
              4,
              3,
              2,
              5,
              6
            ],
            "explanation": "Richtig: In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Es ___ darauf hingewiesen, dass...",
            "options": [
              "sei",
              "sofort",
              "werde"
            ],
            "answer": "sei",
            "explanation": "Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Kompetenz",
              "Einwände",
              "eingehen",
              "zeigt",
              "auf",
              "Sachlich"
            ],
            "answer": [
              5,
              4,
              1,
              2,
              3,
              0
            ],
            "explanation": "Richtig: Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "fill_blank",
            "situation": "Du musst eine kritische E-Mail schreiben.",
            "question": "Professionelle E-Mails sind sachlich ___ lösungsorientiert.",
            "options": [
              "und",
              "morgen",
              "Termin"
            ],
            "answer": "und",
            "explanation": "Professionelle E-Mails sind sachlich und lösungsorientiert."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Kontext: In Krisensituationen kommunizieren.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Differenziert und nuanciert argumentieren.",
              "Das würde den Rahmen sprengen.",
              "Ich sehe mich außerstande dazu."
            ],
            "answer": 0,
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "quick_reaction",
            "situation": "Du diskutierst über In Krisensituationen kommunizieren.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "ziehen",
              "Darüber lässt sich streiten.",
              "Das würde den Rahmen sprengen."
            ],
            "answer": 0,
            "explanation": "In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Es darauf hingewiesen dass sei",
              "Das bedarf einer Analyse.",
              "Ich sehe mich außerstande dazu."
            ],
            "answer": 0,
            "explanation": "Richtig: Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ihren Einwand kann ich nachvollziehen, dennoch...",
              "Das wäre kontraproduktiv.",
              "Das würde den Rahmen sprengen."
            ],
            "answer": 0,
            "explanation": "Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du musst eine kritische E-Mail schreiben.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Sachlich bleiben und konstruktive Lösungen vorschlagen.",
              "Ich halte das für nicht zielführend.",
              "Das ist vereinfacht dargestellt."
            ],
            "answer": 0,
            "explanation": "Professionelle E-Mails sind sachlich und lösungsorientiert."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Differenziert und nuanciert argumentieren.",
        "context": "Kontext: In Krisensituationen kommunizieren"
      },
      {
        "de": "ziehen",
        "context": "Du diskutierst über In Krisensituationen kommunizieren"
      },
      {
        "de": "Es darauf hingewiesen dass sei",
        "context": "Du formulierst eine differenzierte Aussage"
      },
      {
        "de": "Ihren Einwand kann ich nachvollziehen, dennoch...",
        "context": "Jemand widerspricht deiner These"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Einfach formulieren.",
        "correct": "Differenziert und nuanciert argumentieren.",
        "tip": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
      },
      {
        "wrong": "nehmen",
        "correct": "ziehen",
        "tip": "In Betracht ziehen ist die korrekte Wendung."
      },
      {
        "wrong": "Das stimmt nicht.",
        "correct": "Ihren Einwand kann ich nachvollziehen, dennoch...",
        "tip": "Sachlich auf Einwände eingehen zeigt Kompetenz."
      }
    ]
  },
  {
    "id": "c1-10",
    "level": "C1",
    "title": "Kulturelle Nuancen",
    "titleDe": "Kulturelle Nuancen verstehen",
    "icon": "🌍",
    "premium": false,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Kontext: Kulturelle Nuancen verstehen.",
            "question": "Wie drückst du dich angemessen aus?",
            "options": [
              "Differenziert und nuanciert argumentieren.",
              "Einfach formulieren.",
              "Nichts sagen."
            ],
            "answer": 0,
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "fill_blank",
            "situation": "Du diskutierst über Kulturelle Nuancen verstehen.",
            "question": "Man muss in Betracht ___, dass verschiedene Perspektiven existieren.",
            "options": [
              "ziehen",
              "nehmen",
              "bringen"
            ],
            "answer": "ziehen",
            "explanation": "In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "dass",
              "Es",
              "sei",
              "darauf",
              "hingewiesen"
            ],
            "answer": [
              1,
              3,
              4,
              0,
              2
            ],
            "explanation": "Richtig: Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Wie reagierst du?",
            "options": [
              "Ihren Einwand kann ich nachvollziehen, dennoch...",
              "Das stimmt nicht.",
              "Lassen Sie mich ausreden."
            ],
            "answer": 0,
            "explanation": "Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du wirst um eine Einschätzung gebeten.",
            "question": "Wie formulierst du diplomatisch?",
            "options": [
              "Meiner Einschätzung nach wäre es ratsam, alternative Ansätze zu prüfen.",
              "Das ist falsch.",
              "Mir fehlt die Zeit dafür."
            ],
            "answer": 0,
            "explanation": "Diplomatische Formulierungen sind auf C1-Niveau essentiell."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Kontext: Kulturelle Nuancen verstehen.",
            "question": "Auf C1-Niveau wird differenzierte ___ erwartet.",
            "options": [
              "Ausdrucksweise",
              "bitte",
              "schlecht"
            ],
            "answer": "Ausdrucksweise",
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "sort_sentence",
            "situation": "Du diskutierst über Kulturelle Nuancen verstehen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "die",
              "ziehen",
              "korrekte",
              "In",
              "Betracht",
              "ist",
              "Wendung"
            ],
            "answer": [
              3,
              4,
              1,
              5,
              0,
              2,
              6
            ],
            "explanation": "Richtig: In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Es sei ___ hingewiesen, dass...",
            "options": [
              "darauf",
              "darf",
              "Adresse"
            ],
            "answer": "darauf",
            "explanation": "Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Einwände",
              "auf",
              "Sachlich",
              "Kompetenz",
              "eingehen",
              "zeigt"
            ],
            "answer": [
              2,
              1,
              0,
              4,
              5,
              3
            ],
            "explanation": "Richtig: Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "fill_blank",
            "situation": "Du wirst um eine Einschätzung gebeten.",
            "question": "Diplomatische Formulierungen sind ___ C1-Niveau essentiell.",
            "options": [
              "auf",
              "morgen",
              "bin"
            ],
            "answer": "auf",
            "explanation": "Diplomatische Formulierungen sind auf C1-Niveau essentiell."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Kontext: Kulturelle Nuancen verstehen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Differenziert und nuanciert argumentieren.",
              "Das kann man so nicht sagen.",
              "Das bedarf einer Analyse."
            ],
            "answer": 0,
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "quick_reaction",
            "situation": "Du diskutierst über Kulturelle Nuancen verstehen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "ziehen",
              "Ich halte das für nicht zielführend.",
              "Das würde den Rahmen sprengen."
            ],
            "answer": 0,
            "explanation": "In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Es darauf hingewiesen dass sei",
              "Ich sehe mich außerstande dazu.",
              "Das wäre kontraproduktiv."
            ],
            "answer": 0,
            "explanation": "Richtig: Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ihren Einwand kann ich nachvollziehen, dennoch...",
              "Ich halte das für nicht zielführend.",
              "Das entzieht sich meiner Kenntnis."
            ],
            "answer": 0,
            "explanation": "Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du wirst um eine Einschätzung gebeten.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Meiner Einschätzung nach wäre es ratsam, alternative Ansätze zu prüfen.",
              "Ich sehe mich außerstande dazu.",
              "Das ist vereinfacht dargestellt."
            ],
            "answer": 0,
            "explanation": "Diplomatische Formulierungen sind auf C1-Niveau essentiell."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Differenziert und nuanciert argumentieren.",
        "context": "Kontext: Kulturelle Nuancen verstehen"
      },
      {
        "de": "ziehen",
        "context": "Du diskutierst über Kulturelle Nuancen verstehen"
      },
      {
        "de": "Es darauf hingewiesen dass sei",
        "context": "Du formulierst eine differenzierte Aussage"
      },
      {
        "de": "Ihren Einwand kann ich nachvollziehen, dennoch...",
        "context": "Jemand widerspricht deiner These"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Einfach formulieren.",
        "correct": "Differenziert und nuanciert argumentieren.",
        "tip": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
      },
      {
        "wrong": "nehmen",
        "correct": "ziehen",
        "tip": "In Betracht ziehen ist die korrekte Wendung."
      },
      {
        "wrong": "Das stimmt nicht.",
        "correct": "Ihren Einwand kann ich nachvollziehen, dennoch...",
        "tip": "Sachlich auf Einwände eingehen zeigt Kompetenz."
      }
    ]
  },
  {
    "id": "c1-11",
    "level": "C1",
    "title": "Rhetorik",
    "titleDe": "Rhetorische Mittel einsetzen",
    "icon": "🎤",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Kontext: Rhetorische Mittel einsetzen.",
            "question": "Wie drückst du dich angemessen aus?",
            "options": [
              "Differenziert und nuanciert argumentieren.",
              "Einfach formulieren.",
              "Nichts sagen."
            ],
            "answer": 0,
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "fill_blank",
            "situation": "Du diskutierst über Rhetorische Mittel einsetzen.",
            "question": "Man muss in Betracht ___, dass verschiedene Perspektiven existieren.",
            "options": [
              "ziehen",
              "nehmen",
              "bringen"
            ],
            "answer": "ziehen",
            "explanation": "In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "dass",
              "Es",
              "sei",
              "darauf",
              "hingewiesen"
            ],
            "answer": [
              1,
              3,
              4,
              0,
              2
            ],
            "explanation": "Richtig: Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Wie reagierst du?",
            "options": [
              "Ihren Einwand kann ich nachvollziehen, dennoch...",
              "Das stimmt nicht.",
              "Lassen Sie mich ausreden."
            ],
            "answer": 0,
            "explanation": "Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du verhandelst über dein Gehalt.",
            "question": "Wie argumentierst du?",
            "options": [
              "Ich begründe meine Forderung mit Leistung und Marktwert.",
              "Ich sage, ich brauche mehr Geld.",
              "Ich drohe mit Kündigung."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation ist bei Gehaltsverhandlungen entscheidend."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Kontext: Rhetorische Mittel einsetzen.",
            "question": "Auf C1-Niveau wird ___ Ausdrucksweise erwartet.",
            "options": [
              "differenzierte",
              "habe",
              "danke"
            ],
            "answer": "differenzierte",
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "sort_sentence",
            "situation": "Du diskutierst über Rhetorische Mittel einsetzen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "In",
              "ist",
              "ziehen",
              "Betracht",
              "die",
              "korrekte",
              "Wendung"
            ],
            "answer": [
              0,
              3,
              2,
              1,
              4,
              5,
              6
            ],
            "explanation": "Richtig: In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Es ___ darauf hingewiesen, dass...",
            "options": [
              "sei",
              "Nummer",
              "hier"
            ],
            "answer": "sei",
            "explanation": "Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sachlich",
              "Einwände",
              "zeigt",
              "eingehen",
              "auf",
              "Kompetenz"
            ],
            "answer": [
              0,
              4,
              1,
              3,
              2,
              5
            ],
            "explanation": "Richtig: Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "fill_blank",
            "situation": "Du verhandelst über dein Gehalt.",
            "question": "Sachliche Argumentation ___ bei Gehaltsverhandlungen entscheidend.",
            "options": [
              "ist",
              "möglich",
              "morgen"
            ],
            "answer": "ist",
            "explanation": "Sachliche Argumentation ist bei Gehaltsverhandlungen entscheidend."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Kontext: Rhetorische Mittel einsetzen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Differenziert und nuanciert argumentieren.",
              "Das entzieht sich meiner Kenntnis.",
              "Das würde den Rahmen sprengen."
            ],
            "answer": 0,
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "quick_reaction",
            "situation": "Du diskutierst über Rhetorische Mittel einsetzen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "ziehen",
              "Das kann man so nicht sagen.",
              "Das bedarf einer Analyse."
            ],
            "answer": 0,
            "explanation": "In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Es darauf hingewiesen dass sei",
              "Das greift zu kurz.",
              "Ich halte das für nicht zielführend."
            ],
            "answer": 0,
            "explanation": "Richtig: Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ihren Einwand kann ich nachvollziehen, dennoch...",
              "Ich halte das für nicht zielführend.",
              "Das bedarf einer Analyse."
            ],
            "answer": 0,
            "explanation": "Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du verhandelst über dein Gehalt.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich begründe meine Forderung mit Leistung und Marktwert.",
              "Ich sehe mich außerstande dazu.",
              "Ich halte das für nicht zielführend."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation ist bei Gehaltsverhandlungen entscheidend."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Differenziert und nuanciert argumentieren.",
        "context": "Kontext: Rhetorische Mittel einsetzen"
      },
      {
        "de": "ziehen",
        "context": "Du diskutierst über Rhetorische Mittel einsetzen"
      },
      {
        "de": "Es darauf hingewiesen dass sei",
        "context": "Du formulierst eine differenzierte Aussage"
      },
      {
        "de": "Ihren Einwand kann ich nachvollziehen, dennoch...",
        "context": "Jemand widerspricht deiner These"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Einfach formulieren.",
        "correct": "Differenziert und nuanciert argumentieren.",
        "tip": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
      },
      {
        "wrong": "nehmen",
        "correct": "ziehen",
        "tip": "In Betracht ziehen ist die korrekte Wendung."
      },
      {
        "wrong": "Das stimmt nicht.",
        "correct": "Ihren Einwand kann ich nachvollziehen, dennoch...",
        "tip": "Sachlich auf Einwände eingehen zeigt Kompetenz."
      }
    ]
  },
  {
    "id": "c1-12",
    "level": "C1",
    "title": "Fachjargon",
    "titleDe": "Fachjargon angemessen verwenden",
    "icon": "📚",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Kontext: Fachjargon angemessen verwenden.",
            "question": "Wie drückst du dich angemessen aus?",
            "options": [
              "Differenziert und nuanciert argumentieren.",
              "Einfach formulieren.",
              "Nichts sagen."
            ],
            "answer": 0,
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "fill_blank",
            "situation": "Du diskutierst über Fachjargon angemessen verwenden.",
            "question": "Man muss in Betracht ___, dass verschiedene Perspektiven existieren.",
            "options": [
              "ziehen",
              "nehmen",
              "bringen"
            ],
            "answer": "ziehen",
            "explanation": "In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "dass",
              "Es",
              "sei",
              "darauf",
              "hingewiesen"
            ],
            "answer": [
              1,
              3,
              4,
              0,
              2
            ],
            "explanation": "Richtig: Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Wie reagierst du?",
            "options": [
              "Ihren Einwand kann ich nachvollziehen, dennoch...",
              "Das stimmt nicht.",
              "Lassen Sie mich ausreden."
            ],
            "answer": 0,
            "explanation": "Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du leitest ein Projektmeeting.",
            "question": "Wie eröffnest du?",
            "options": [
              "Ich begrüße alle und gebe einen Überblick über die Agenda.",
              "Fangen wir an.",
              "Hat jemand Fragen?"
            ],
            "answer": 0,
            "explanation": "Eine strukturierte Eröffnung gibt dem Meeting Richtung."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Kontext: Fachjargon angemessen verwenden.",
            "question": "Auf C1-Niveau wird ___ Ausdrucksweise erwartet.",
            "options": [
              "differenzierte",
              "brauche",
              "Lösung"
            ],
            "answer": "differenzierte",
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "sort_sentence",
            "situation": "Du diskutierst über Fachjargon angemessen verwenden.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "korrekte",
              "ist",
              "Wendung",
              "Betracht",
              "die",
              "In",
              "ziehen"
            ],
            "answer": [
              5,
              3,
              6,
              1,
              4,
              0,
              2
            ],
            "explanation": "Richtig: In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Es sei darauf hingewiesen, ___...",
            "options": [
              "dass",
              "brauche",
              "soll"
            ],
            "answer": "dass",
            "explanation": "Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Einwände",
              "auf",
              "Sachlich",
              "zeigt",
              "Kompetenz",
              "eingehen"
            ],
            "answer": [
              2,
              1,
              0,
              5,
              3,
              4
            ],
            "explanation": "Richtig: Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "fill_blank",
            "situation": "Du leitest ein Projektmeeting.",
            "question": "Eine strukturierte Eröffnung gibt ___ Meeting Richtung.",
            "options": [
              "dem",
              "Problem",
              "will"
            ],
            "answer": "dem",
            "explanation": "Eine strukturierte Eröffnung gibt dem Meeting Richtung."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Kontext: Fachjargon angemessen verwenden.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Differenziert und nuanciert argumentieren.",
              "Ich halte das für nicht zielführend.",
              "Das kann man so nicht sagen."
            ],
            "answer": 0,
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "quick_reaction",
            "situation": "Du diskutierst über Fachjargon angemessen verwenden.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "ziehen",
              "Das entzieht sich meiner Kenntnis.",
              "Ich sehe mich außerstande dazu."
            ],
            "answer": 0,
            "explanation": "In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Es darauf hingewiesen dass sei",
              "Das wäre kontraproduktiv.",
              "Das würde den Rahmen sprengen."
            ],
            "answer": 0,
            "explanation": "Richtig: Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ihren Einwand kann ich nachvollziehen, dennoch...",
              "Das entzieht sich meiner Kenntnis.",
              "Das greift zu kurz."
            ],
            "answer": 0,
            "explanation": "Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du leitest ein Projektmeeting.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich begrüße alle und gebe einen Überblick über die Agenda.",
              "Das greift zu kurz.",
              "Das entzieht sich meiner Kenntnis."
            ],
            "answer": 0,
            "explanation": "Eine strukturierte Eröffnung gibt dem Meeting Richtung."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Differenziert und nuanciert argumentieren.",
        "context": "Kontext: Fachjargon angemessen verwenden"
      },
      {
        "de": "ziehen",
        "context": "Du diskutierst über Fachjargon angemessen verwenden"
      },
      {
        "de": "Es darauf hingewiesen dass sei",
        "context": "Du formulierst eine differenzierte Aussage"
      },
      {
        "de": "Ihren Einwand kann ich nachvollziehen, dennoch...",
        "context": "Jemand widerspricht deiner These"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Einfach formulieren.",
        "correct": "Differenziert und nuanciert argumentieren.",
        "tip": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
      },
      {
        "wrong": "nehmen",
        "correct": "ziehen",
        "tip": "In Betracht ziehen ist die korrekte Wendung."
      },
      {
        "wrong": "Das stimmt nicht.",
        "correct": "Ihren Einwand kann ich nachvollziehen, dennoch...",
        "tip": "Sachlich auf Einwände eingehen zeigt Kompetenz."
      }
    ]
  },
  {
    "id": "c1-13",
    "level": "C1",
    "title": "Analyse",
    "titleDe": "Komplexe Analysen präsentieren",
    "icon": "🔬",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Kontext: Komplexe Analysen präsentieren.",
            "question": "Wie drückst du dich angemessen aus?",
            "options": [
              "Differenziert und nuanciert argumentieren.",
              "Einfach formulieren.",
              "Nichts sagen."
            ],
            "answer": 0,
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "fill_blank",
            "situation": "Du diskutierst über Komplexe Analysen präsentieren.",
            "question": "Man muss in Betracht ___, dass verschiedene Perspektiven existieren.",
            "options": [
              "ziehen",
              "nehmen",
              "bringen"
            ],
            "answer": "ziehen",
            "explanation": "In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "dass",
              "Es",
              "sei",
              "darauf",
              "hingewiesen"
            ],
            "answer": [
              1,
              3,
              4,
              0,
              2
            ],
            "explanation": "Richtig: Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Wie reagierst du?",
            "options": [
              "Ihren Einwand kann ich nachvollziehen, dennoch...",
              "Das stimmt nicht.",
              "Lassen Sie mich ausreden."
            ],
            "answer": 0,
            "explanation": "Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Ein Konflikt im Team eskaliert.",
            "question": "Was tust du?",
            "options": [
              "Ich führe Einzelgespräche und vermittle neutral.",
              "Ich ignoriere es.",
              "Ich beschwere mich beim Chef."
            ],
            "answer": 0,
            "explanation": "Konfliktlösung erfordert Einfühlungsvermögen und Neutralität."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Kontext: Komplexe Analysen präsentieren.",
            "question": "Auf ___ wird differenzierte Ausdrucksweise erwartet.",
            "options": [
              "C1-Niveau",
              "heute",
              "morgen"
            ],
            "answer": "C1-Niveau",
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "sort_sentence",
            "situation": "Du diskutierst über Komplexe Analysen präsentieren.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "In",
              "ist",
              "Wendung",
              "Betracht",
              "die",
              "ziehen",
              "korrekte"
            ],
            "answer": [
              0,
              3,
              5,
              1,
              4,
              6,
              2
            ],
            "explanation": "Richtig: In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Es sei darauf ___, dass...",
            "options": [
              "hingewiesen",
              "Zeit",
              "kann"
            ],
            "answer": "hingewiesen",
            "explanation": "Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sachlich",
              "Kompetenz",
              "zeigt",
              "Einwände",
              "eingehen",
              "auf"
            ],
            "answer": [
              0,
              5,
              3,
              4,
              2,
              1
            ],
            "explanation": "Richtig: Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "fill_blank",
            "situation": "Ein Konflikt im Team eskaliert.",
            "question": "Konfliktlösung erfordert Einfühlungsvermögen ___ Neutralität.",
            "options": [
              "und",
              "danke",
              "Name"
            ],
            "answer": "und",
            "explanation": "Konfliktlösung erfordert Einfühlungsvermögen und Neutralität."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Kontext: Komplexe Analysen präsentieren.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Differenziert und nuanciert argumentieren.",
              "Ich sehe mich außerstande dazu.",
              "Das würde den Rahmen sprengen."
            ],
            "answer": 0,
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "quick_reaction",
            "situation": "Du diskutierst über Komplexe Analysen präsentieren.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "ziehen",
              "Das kann man so nicht sagen.",
              "Ich möchte mich nicht äußern."
            ],
            "answer": 0,
            "explanation": "In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Es darauf hingewiesen dass sei",
              "Das entzieht sich meiner Kenntnis.",
              "Darüber lässt sich streiten."
            ],
            "answer": 0,
            "explanation": "Richtig: Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ihren Einwand kann ich nachvollziehen, dennoch...",
              "Darüber lässt sich streiten.",
              "Das kann man so nicht sagen."
            ],
            "answer": 0,
            "explanation": "Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Ein Konflikt im Team eskaliert.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich führe Einzelgespräche und vermittle neutral.",
              "Das ist vereinfacht dargestellt.",
              "Das greift zu kurz."
            ],
            "answer": 0,
            "explanation": "Konfliktlösung erfordert Einfühlungsvermögen und Neutralität."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Differenziert und nuanciert argumentieren.",
        "context": "Kontext: Komplexe Analysen präsentieren"
      },
      {
        "de": "ziehen",
        "context": "Du diskutierst über Komplexe Analysen präsentieren"
      },
      {
        "de": "Es darauf hingewiesen dass sei",
        "context": "Du formulierst eine differenzierte Aussage"
      },
      {
        "de": "Ihren Einwand kann ich nachvollziehen, dennoch...",
        "context": "Jemand widerspricht deiner These"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Einfach formulieren.",
        "correct": "Differenziert und nuanciert argumentieren.",
        "tip": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
      },
      {
        "wrong": "nehmen",
        "correct": "ziehen",
        "tip": "In Betracht ziehen ist die korrekte Wendung."
      },
      {
        "wrong": "Das stimmt nicht.",
        "correct": "Ihren Einwand kann ich nachvollziehen, dennoch...",
        "tip": "Sachlich auf Einwände eingehen zeigt Kompetenz."
      }
    ]
  },
  {
    "id": "c1-14",
    "level": "C1",
    "title": "Ethische Fragen",
    "titleDe": "Ethische Fragen diskutieren",
    "icon": "🤔",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Kontext: Ethische Fragen diskutieren.",
            "question": "Wie drückst du dich angemessen aus?",
            "options": [
              "Differenziert und nuanciert argumentieren.",
              "Einfach formulieren.",
              "Nichts sagen."
            ],
            "answer": 0,
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "fill_blank",
            "situation": "Du diskutierst über Ethische Fragen diskutieren.",
            "question": "Man muss in Betracht ___, dass verschiedene Perspektiven existieren.",
            "options": [
              "ziehen",
              "nehmen",
              "bringen"
            ],
            "answer": "ziehen",
            "explanation": "In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "dass",
              "Es",
              "sei",
              "darauf",
              "hingewiesen"
            ],
            "answer": [
              1,
              3,
              4,
              0,
              2
            ],
            "explanation": "Richtig: Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Wie reagierst du?",
            "options": [
              "Ihren Einwand kann ich nachvollziehen, dennoch...",
              "Das stimmt nicht.",
              "Lassen Sie mich ausreden."
            ],
            "answer": 0,
            "explanation": "Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du musst eine kritische E-Mail schreiben.",
            "question": "Worauf achtest du?",
            "options": [
              "Sachlich bleiben und konstruktive Lösungen vorschlagen.",
              "Meine Frustration ausdrücken.",
              "Kurz und direkt schreiben."
            ],
            "answer": 0,
            "explanation": "Professionelle E-Mails sind sachlich und lösungsorientiert."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Kontext: Ethische Fragen diskutieren.",
            "question": "Auf C1-Niveau wird differenzierte Ausdrucksweise ___.",
            "options": [
              "erwartet",
              "Zeit",
              "bitte"
            ],
            "answer": "erwartet",
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "sort_sentence",
            "situation": "Du diskutierst über Ethische Fragen diskutieren.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "ziehen",
              "die",
              "korrekte",
              "ist",
              "Betracht",
              "Wendung",
              "In"
            ],
            "answer": [
              6,
              4,
              0,
              3,
              1,
              2,
              5
            ],
            "explanation": "Richtig: In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Es ___ darauf hingewiesen, dass...",
            "options": [
              "sei",
              "suche",
              "morgen"
            ],
            "answer": "sei",
            "explanation": "Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Einwände",
              "eingehen",
              "zeigt",
              "Sachlich",
              "Kompetenz",
              "auf"
            ],
            "answer": [
              3,
              5,
              0,
              1,
              2,
              4
            ],
            "explanation": "Richtig: Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "fill_blank",
            "situation": "Du musst eine kritische E-Mail schreiben.",
            "question": "Professionelle E-Mails sind sachlich ___ lösungsorientiert.",
            "options": [
              "und",
              "nehme",
              "danke"
            ],
            "answer": "und",
            "explanation": "Professionelle E-Mails sind sachlich und lösungsorientiert."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Kontext: Ethische Fragen diskutieren.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Differenziert und nuanciert argumentieren.",
              "Darüber lässt sich streiten.",
              "Ich sehe mich außerstande dazu."
            ],
            "answer": 0,
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "quick_reaction",
            "situation": "Du diskutierst über Ethische Fragen diskutieren.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "ziehen",
              "Das wäre kontraproduktiv.",
              "Das entzieht sich meiner Kenntnis."
            ],
            "answer": 0,
            "explanation": "In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Es darauf hingewiesen dass sei",
              "Das kann man so nicht sagen.",
              "Das würde den Rahmen sprengen."
            ],
            "answer": 0,
            "explanation": "Richtig: Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ihren Einwand kann ich nachvollziehen, dennoch...",
              "Eine pauschale Aussage ist schwierig.",
              "Ich sehe mich außerstande dazu."
            ],
            "answer": 0,
            "explanation": "Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du musst eine kritische E-Mail schreiben.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Sachlich bleiben und konstruktive Lösungen vorschlagen.",
              "Ich halte das für nicht zielführend.",
              "Das würde den Rahmen sprengen."
            ],
            "answer": 0,
            "explanation": "Professionelle E-Mails sind sachlich und lösungsorientiert."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Differenziert und nuanciert argumentieren.",
        "context": "Kontext: Ethische Fragen diskutieren"
      },
      {
        "de": "ziehen",
        "context": "Du diskutierst über Ethische Fragen diskutieren"
      },
      {
        "de": "Es darauf hingewiesen dass sei",
        "context": "Du formulierst eine differenzierte Aussage"
      },
      {
        "de": "Ihren Einwand kann ich nachvollziehen, dennoch...",
        "context": "Jemand widerspricht deiner These"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Einfach formulieren.",
        "correct": "Differenziert und nuanciert argumentieren.",
        "tip": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
      },
      {
        "wrong": "nehmen",
        "correct": "ziehen",
        "tip": "In Betracht ziehen ist die korrekte Wendung."
      },
      {
        "wrong": "Das stimmt nicht.",
        "correct": "Ihren Einwand kann ich nachvollziehen, dennoch...",
        "tip": "Sachlich auf Einwände eingehen zeigt Kompetenz."
      }
    ]
  },
  {
    "id": "c1-15",
    "level": "C1",
    "title": "Führungskommunikation",
    "titleDe": "Als Führungskraft kommunizieren",
    "icon": "👔",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Kontext: Als Führungskraft kommunizieren.",
            "question": "Wie drückst du dich angemessen aus?",
            "options": [
              "Differenziert und nuanciert argumentieren.",
              "Einfach formulieren.",
              "Nichts sagen."
            ],
            "answer": 0,
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "fill_blank",
            "situation": "Du diskutierst über Als Führungskraft kommunizieren.",
            "question": "Man muss in Betracht ___, dass verschiedene Perspektiven existieren.",
            "options": [
              "ziehen",
              "nehmen",
              "bringen"
            ],
            "answer": "ziehen",
            "explanation": "In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "dass",
              "Es",
              "sei",
              "darauf",
              "hingewiesen"
            ],
            "answer": [
              1,
              3,
              4,
              0,
              2
            ],
            "explanation": "Richtig: Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Wie reagierst du?",
            "options": [
              "Ihren Einwand kann ich nachvollziehen, dennoch...",
              "Das stimmt nicht.",
              "Lassen Sie mich ausreden."
            ],
            "answer": 0,
            "explanation": "Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du wirst um eine Einschätzung gebeten.",
            "question": "Wie formulierst du diplomatisch?",
            "options": [
              "Meiner Einschätzung nach wäre es ratsam, alternative Ansätze zu prüfen.",
              "Das ist falsch.",
              "Mir fehlt die Zeit dafür."
            ],
            "answer": 0,
            "explanation": "Diplomatische Formulierungen sind auf C1-Niveau essentiell."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Kontext: Als Führungskraft kommunizieren.",
            "question": "Auf C1-Niveau wird differenzierte Ausdrucksweise ___.",
            "options": [
              "erwartet",
              "falsch",
              "möchte"
            ],
            "answer": "erwartet",
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "sort_sentence",
            "situation": "Du diskutierst über Als Führungskraft kommunizieren.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Wendung",
              "Betracht",
              "ziehen",
              "korrekte",
              "die",
              "In",
              "ist"
            ],
            "answer": [
              5,
              1,
              2,
              6,
              4,
              3,
              0
            ],
            "explanation": "Richtig: In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Es sei darauf hingewiesen, ___...",
            "options": [
              "dass",
              "falsch",
              "gleich"
            ],
            "answer": "dass",
            "explanation": "Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "eingehen",
              "Sachlich",
              "Einwände",
              "Kompetenz",
              "zeigt",
              "auf"
            ],
            "answer": [
              1,
              5,
              2,
              0,
              4,
              3
            ],
            "explanation": "Richtig: Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "fill_blank",
            "situation": "Du wirst um eine Einschätzung gebeten.",
            "question": "Diplomatische ___ sind auf C1-Niveau essentiell.",
            "options": [
              "Formulierungen",
              "Geld",
              "hier"
            ],
            "answer": "Formulierungen",
            "explanation": "Diplomatische Formulierungen sind auf C1-Niveau essentiell."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Kontext: Als Führungskraft kommunizieren.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Differenziert und nuanciert argumentieren.",
              "Eine pauschale Aussage ist schwierig.",
              "Das würde den Rahmen sprengen."
            ],
            "answer": 0,
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "quick_reaction",
            "situation": "Du diskutierst über Als Führungskraft kommunizieren.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "ziehen",
              "Darüber lässt sich streiten.",
              "Das greift zu kurz."
            ],
            "answer": 0,
            "explanation": "In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Es darauf hingewiesen dass sei",
              "Das wäre kontraproduktiv.",
              "Das würde den Rahmen sprengen."
            ],
            "answer": 0,
            "explanation": "Richtig: Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ihren Einwand kann ich nachvollziehen, dennoch...",
              "Eine pauschale Aussage ist schwierig.",
              "Ich möchte mich nicht äußern."
            ],
            "answer": 0,
            "explanation": "Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du wirst um eine Einschätzung gebeten.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Meiner Einschätzung nach wäre es ratsam, alternative Ansätze zu prüfen.",
              "Das ist vereinfacht dargestellt.",
              "Das wäre kontraproduktiv."
            ],
            "answer": 0,
            "explanation": "Diplomatische Formulierungen sind auf C1-Niveau essentiell."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Differenziert und nuanciert argumentieren.",
        "context": "Kontext: Als Führungskraft kommunizieren"
      },
      {
        "de": "ziehen",
        "context": "Du diskutierst über Als Führungskraft kommunizieren"
      },
      {
        "de": "Es darauf hingewiesen dass sei",
        "context": "Du formulierst eine differenzierte Aussage"
      },
      {
        "de": "Ihren Einwand kann ich nachvollziehen, dennoch...",
        "context": "Jemand widerspricht deiner These"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Einfach formulieren.",
        "correct": "Differenziert und nuanciert argumentieren.",
        "tip": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
      },
      {
        "wrong": "nehmen",
        "correct": "ziehen",
        "tip": "In Betracht ziehen ist die korrekte Wendung."
      },
      {
        "wrong": "Das stimmt nicht.",
        "correct": "Ihren Einwand kann ich nachvollziehen, dennoch...",
        "tip": "Sachlich auf Einwände eingehen zeigt Kompetenz."
      }
    ]
  },
  {
    "id": "c1-16",
    "level": "C1",
    "title": "Akademische Diskussion",
    "titleDe": "Akademisch diskutieren",
    "icon": "🎓",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Kontext: Akademisch diskutieren.",
            "question": "Wie drückst du dich angemessen aus?",
            "options": [
              "Differenziert und nuanciert argumentieren.",
              "Einfach formulieren.",
              "Nichts sagen."
            ],
            "answer": 0,
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "fill_blank",
            "situation": "Du diskutierst über Akademisch diskutieren.",
            "question": "Man muss in Betracht ___, dass verschiedene Perspektiven existieren.",
            "options": [
              "ziehen",
              "nehmen",
              "bringen"
            ],
            "answer": "ziehen",
            "explanation": "In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "dass",
              "Es",
              "sei",
              "darauf",
              "hingewiesen"
            ],
            "answer": [
              1,
              3,
              4,
              0,
              2
            ],
            "explanation": "Richtig: Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Wie reagierst du?",
            "options": [
              "Ihren Einwand kann ich nachvollziehen, dennoch...",
              "Das stimmt nicht.",
              "Lassen Sie mich ausreden."
            ],
            "answer": 0,
            "explanation": "Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du verhandelst über dein Gehalt.",
            "question": "Wie argumentierst du?",
            "options": [
              "Ich begründe meine Forderung mit Leistung und Marktwert.",
              "Ich sage, ich brauche mehr Geld.",
              "Ich drohe mit Kündigung."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation ist bei Gehaltsverhandlungen entscheidend."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Kontext: Akademisch diskutieren.",
            "question": "Auf C1-Niveau wird ___ Ausdrucksweise erwartet.",
            "options": [
              "differenzierte",
              "Frage",
              "Name"
            ],
            "answer": "differenzierte",
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "sort_sentence",
            "situation": "Du diskutierst über Akademisch diskutieren.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "In",
              "die",
              "ziehen",
              "ist",
              "korrekte",
              "Betracht",
              "Wendung"
            ],
            "answer": [
              0,
              5,
              2,
              3,
              1,
              4,
              6
            ],
            "explanation": "Richtig: In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Es sei darauf ___, dass...",
            "options": [
              "hingewiesen",
              "danke",
              "gerne"
            ],
            "answer": "hingewiesen",
            "explanation": "Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Einwände",
              "eingehen",
              "Sachlich",
              "Kompetenz",
              "auf",
              "zeigt"
            ],
            "answer": [
              2,
              4,
              0,
              1,
              5,
              3
            ],
            "explanation": "Richtig: Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "fill_blank",
            "situation": "Du verhandelst über dein Gehalt.",
            "question": "Sachliche Argumentation ist ___ Gehaltsverhandlungen entscheidend.",
            "options": [
              "bei",
              "dort",
              "möchte"
            ],
            "answer": "bei",
            "explanation": "Sachliche Argumentation ist bei Gehaltsverhandlungen entscheidend."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Kontext: Akademisch diskutieren.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Differenziert und nuanciert argumentieren.",
              "Das würde den Rahmen sprengen.",
              "Das kann man so nicht sagen."
            ],
            "answer": 0,
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "quick_reaction",
            "situation": "Du diskutierst über Akademisch diskutieren.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "ziehen",
              "Das bedarf einer Analyse.",
              "Das greift zu kurz."
            ],
            "answer": 0,
            "explanation": "In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Es darauf hingewiesen dass sei",
              "Das greift zu kurz.",
              "Das kann man so nicht sagen."
            ],
            "answer": 0,
            "explanation": "Richtig: Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ihren Einwand kann ich nachvollziehen, dennoch...",
              "Darüber lässt sich streiten.",
              "Ich sehe mich außerstande dazu."
            ],
            "answer": 0,
            "explanation": "Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du verhandelst über dein Gehalt.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich begründe meine Forderung mit Leistung und Marktwert.",
              "Darüber lässt sich streiten.",
              "Das greift zu kurz."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation ist bei Gehaltsverhandlungen entscheidend."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Differenziert und nuanciert argumentieren.",
        "context": "Kontext: Akademisch diskutieren"
      },
      {
        "de": "ziehen",
        "context": "Du diskutierst über Akademisch diskutieren"
      },
      {
        "de": "Es darauf hingewiesen dass sei",
        "context": "Du formulierst eine differenzierte Aussage"
      },
      {
        "de": "Ihren Einwand kann ich nachvollziehen, dennoch...",
        "context": "Jemand widerspricht deiner These"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Einfach formulieren.",
        "correct": "Differenziert und nuanciert argumentieren.",
        "tip": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
      },
      {
        "wrong": "nehmen",
        "correct": "ziehen",
        "tip": "In Betracht ziehen ist die korrekte Wendung."
      },
      {
        "wrong": "Das stimmt nicht.",
        "correct": "Ihren Einwand kann ich nachvollziehen, dennoch...",
        "tip": "Sachlich auf Einwände eingehen zeigt Kompetenz."
      }
    ]
  },
  {
    "id": "c1-17",
    "level": "C1",
    "title": "Politische Analyse",
    "titleDe": "Politische Themen analysieren",
    "icon": "🏛️",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Kontext: Politische Themen analysieren.",
            "question": "Wie drückst du dich angemessen aus?",
            "options": [
              "Differenziert und nuanciert argumentieren.",
              "Einfach formulieren.",
              "Nichts sagen."
            ],
            "answer": 0,
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "fill_blank",
            "situation": "Du diskutierst über Politische Themen analysieren.",
            "question": "Man muss in Betracht ___, dass verschiedene Perspektiven existieren.",
            "options": [
              "ziehen",
              "nehmen",
              "bringen"
            ],
            "answer": "ziehen",
            "explanation": "In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "dass",
              "Es",
              "sei",
              "darauf",
              "hingewiesen"
            ],
            "answer": [
              1,
              3,
              4,
              0,
              2
            ],
            "explanation": "Richtig: Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Wie reagierst du?",
            "options": [
              "Ihren Einwand kann ich nachvollziehen, dennoch...",
              "Das stimmt nicht.",
              "Lassen Sie mich ausreden."
            ],
            "answer": 0,
            "explanation": "Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du leitest ein Projektmeeting.",
            "question": "Wie eröffnest du?",
            "options": [
              "Ich begrüße alle und gebe einen Überblick über die Agenda.",
              "Fangen wir an.",
              "Hat jemand Fragen?"
            ],
            "answer": 0,
            "explanation": "Eine strukturierte Eröffnung gibt dem Meeting Richtung."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Kontext: Politische Themen analysieren.",
            "question": "Auf C1-Niveau wird differenzierte ___ erwartet.",
            "options": [
              "Ausdrucksweise",
              "langsam",
              "schnell"
            ],
            "answer": "Ausdrucksweise",
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "sort_sentence",
            "situation": "Du diskutierst über Politische Themen analysieren.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "die",
              "In",
              "Betracht",
              "ziehen",
              "ist",
              "Wendung",
              "korrekte"
            ],
            "answer": [
              1,
              2,
              3,
              4,
              0,
              6,
              5
            ],
            "explanation": "Richtig: In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Es ___ darauf hingewiesen, dass...",
            "options": [
              "sei",
              "bin",
              "Geld"
            ],
            "answer": "sei",
            "explanation": "Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Einwände",
              "Kompetenz",
              "eingehen",
              "zeigt",
              "Sachlich",
              "auf"
            ],
            "answer": [
              4,
              5,
              0,
              2,
              3,
              1
            ],
            "explanation": "Richtig: Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "fill_blank",
            "situation": "Du leitest ein Projektmeeting.",
            "question": "Eine strukturierte ___ gibt dem Meeting Richtung.",
            "options": [
              "Eröffnung",
              "Frage",
              "dort"
            ],
            "answer": "Eröffnung",
            "explanation": "Eine strukturierte Eröffnung gibt dem Meeting Richtung."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Kontext: Politische Themen analysieren.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Differenziert und nuanciert argumentieren.",
              "Das ist vereinfacht dargestellt.",
              "Das bedarf einer Analyse."
            ],
            "answer": 0,
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "quick_reaction",
            "situation": "Du diskutierst über Politische Themen analysieren.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "ziehen",
              "Das entzieht sich meiner Kenntnis.",
              "Das ist vereinfacht dargestellt."
            ],
            "answer": 0,
            "explanation": "In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Es darauf hingewiesen dass sei",
              "Ich möchte mich nicht äußern.",
              "Das greift zu kurz."
            ],
            "answer": 0,
            "explanation": "Richtig: Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ihren Einwand kann ich nachvollziehen, dennoch...",
              "Das entzieht sich meiner Kenntnis.",
              "Darüber lässt sich streiten."
            ],
            "answer": 0,
            "explanation": "Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du leitest ein Projektmeeting.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich begrüße alle und gebe einen Überblick über die Agenda.",
              "Ich halte das für nicht zielführend.",
              "Ich sehe mich außerstande dazu."
            ],
            "answer": 0,
            "explanation": "Eine strukturierte Eröffnung gibt dem Meeting Richtung."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Differenziert und nuanciert argumentieren.",
        "context": "Kontext: Politische Themen analysieren"
      },
      {
        "de": "ziehen",
        "context": "Du diskutierst über Politische Themen analysieren"
      },
      {
        "de": "Es darauf hingewiesen dass sei",
        "context": "Du formulierst eine differenzierte Aussage"
      },
      {
        "de": "Ihren Einwand kann ich nachvollziehen, dennoch...",
        "context": "Jemand widerspricht deiner These"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Einfach formulieren.",
        "correct": "Differenziert und nuanciert argumentieren.",
        "tip": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
      },
      {
        "wrong": "nehmen",
        "correct": "ziehen",
        "tip": "In Betracht ziehen ist die korrekte Wendung."
      },
      {
        "wrong": "Das stimmt nicht.",
        "correct": "Ihren Einwand kann ich nachvollziehen, dennoch...",
        "tip": "Sachlich auf Einwände eingehen zeigt Kompetenz."
      }
    ]
  },
  {
    "id": "c1-18",
    "level": "C1",
    "title": "Mediation führen",
    "titleDe": "Eine Mediation leiten",
    "icon": "⚖️",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Kontext: Eine Mediation leiten.",
            "question": "Wie drückst du dich angemessen aus?",
            "options": [
              "Differenziert und nuanciert argumentieren.",
              "Einfach formulieren.",
              "Nichts sagen."
            ],
            "answer": 0,
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "fill_blank",
            "situation": "Du diskutierst über Eine Mediation leiten.",
            "question": "Man muss in Betracht ___, dass verschiedene Perspektiven existieren.",
            "options": [
              "ziehen",
              "nehmen",
              "bringen"
            ],
            "answer": "ziehen",
            "explanation": "In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "dass",
              "Es",
              "sei",
              "darauf",
              "hingewiesen"
            ],
            "answer": [
              1,
              3,
              4,
              0,
              2
            ],
            "explanation": "Richtig: Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Wie reagierst du?",
            "options": [
              "Ihren Einwand kann ich nachvollziehen, dennoch...",
              "Das stimmt nicht.",
              "Lassen Sie mich ausreden."
            ],
            "answer": 0,
            "explanation": "Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Ein Konflikt im Team eskaliert.",
            "question": "Was tust du?",
            "options": [
              "Ich führe Einzelgespräche und vermittle neutral.",
              "Ich ignoriere es.",
              "Ich beschwere mich beim Chef."
            ],
            "answer": 0,
            "explanation": "Konfliktlösung erfordert Einfühlungsvermögen und Neutralität."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Kontext: Eine Mediation leiten.",
            "question": "Auf C1-Niveau wird differenzierte Ausdrucksweise ___.",
            "options": [
              "erwartet",
              "dort",
              "gerne"
            ],
            "answer": "erwartet",
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "sort_sentence",
            "situation": "Du diskutierst über Eine Mediation leiten.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "ziehen",
              "korrekte",
              "In",
              "ist",
              "Wendung",
              "Betracht",
              "die"
            ],
            "answer": [
              2,
              5,
              0,
              3,
              6,
              1,
              4
            ],
            "explanation": "Richtig: In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Es ___ darauf hingewiesen, dass...",
            "options": [
              "sei",
              "Geld",
              "Adresse"
            ],
            "answer": "sei",
            "explanation": "Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "zeigt",
              "auf",
              "eingehen",
              "Sachlich",
              "Einwände",
              "Kompetenz"
            ],
            "answer": [
              3,
              1,
              4,
              2,
              0,
              5
            ],
            "explanation": "Richtig: Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "fill_blank",
            "situation": "Ein Konflikt im Team eskaliert.",
            "question": "Konfliktlösung erfordert ___ und Neutralität.",
            "options": [
              "Einfühlungsvermögen",
              "morgen",
              "gleich"
            ],
            "answer": "Einfühlungsvermögen",
            "explanation": "Konfliktlösung erfordert Einfühlungsvermögen und Neutralität."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Kontext: Eine Mediation leiten.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Differenziert und nuanciert argumentieren.",
              "Ich halte das für nicht zielführend.",
              "Ich möchte mich nicht äußern."
            ],
            "answer": 0,
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "quick_reaction",
            "situation": "Du diskutierst über Eine Mediation leiten.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "ziehen",
              "Das kann man so nicht sagen.",
              "Das würde den Rahmen sprengen."
            ],
            "answer": 0,
            "explanation": "In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Es darauf hingewiesen dass sei",
              "Darüber lässt sich streiten.",
              "Eine pauschale Aussage ist schwierig."
            ],
            "answer": 0,
            "explanation": "Richtig: Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ihren Einwand kann ich nachvollziehen, dennoch...",
              "Das greift zu kurz.",
              "Eine pauschale Aussage ist schwierig."
            ],
            "answer": 0,
            "explanation": "Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Ein Konflikt im Team eskaliert.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich führe Einzelgespräche und vermittle neutral.",
              "Ich möchte mich nicht äußern.",
              "Das würde den Rahmen sprengen."
            ],
            "answer": 0,
            "explanation": "Konfliktlösung erfordert Einfühlungsvermögen und Neutralität."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Differenziert und nuanciert argumentieren.",
        "context": "Kontext: Eine Mediation leiten"
      },
      {
        "de": "ziehen",
        "context": "Du diskutierst über Eine Mediation leiten"
      },
      {
        "de": "Es darauf hingewiesen dass sei",
        "context": "Du formulierst eine differenzierte Aussage"
      },
      {
        "de": "Ihren Einwand kann ich nachvollziehen, dennoch...",
        "context": "Jemand widerspricht deiner These"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Einfach formulieren.",
        "correct": "Differenziert und nuanciert argumentieren.",
        "tip": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
      },
      {
        "wrong": "nehmen",
        "correct": "ziehen",
        "tip": "In Betracht ziehen ist die korrekte Wendung."
      },
      {
        "wrong": "Das stimmt nicht.",
        "correct": "Ihren Einwand kann ich nachvollziehen, dennoch...",
        "tip": "Sachlich auf Einwände eingehen zeigt Kompetenz."
      }
    ]
  },
  {
    "id": "c1-19",
    "level": "C1",
    "title": "Wirtschaftsnachrichten",
    "titleDe": "Wirtschaftsnachrichten verstehen",
    "icon": "📈",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Kontext: Wirtschaftsnachrichten verstehen.",
            "question": "Wie drückst du dich angemessen aus?",
            "options": [
              "Differenziert und nuanciert argumentieren.",
              "Einfach formulieren.",
              "Nichts sagen."
            ],
            "answer": 0,
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "fill_blank",
            "situation": "Du diskutierst über Wirtschaftsnachrichten verstehen.",
            "question": "Man muss in Betracht ___, dass verschiedene Perspektiven existieren.",
            "options": [
              "ziehen",
              "nehmen",
              "bringen"
            ],
            "answer": "ziehen",
            "explanation": "In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "dass",
              "Es",
              "sei",
              "darauf",
              "hingewiesen"
            ],
            "answer": [
              1,
              3,
              4,
              0,
              2
            ],
            "explanation": "Richtig: Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Wie reagierst du?",
            "options": [
              "Ihren Einwand kann ich nachvollziehen, dennoch...",
              "Das stimmt nicht.",
              "Lassen Sie mich ausreden."
            ],
            "answer": 0,
            "explanation": "Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du musst eine kritische E-Mail schreiben.",
            "question": "Worauf achtest du?",
            "options": [
              "Sachlich bleiben und konstruktive Lösungen vorschlagen.",
              "Meine Frustration ausdrücken.",
              "Kurz und direkt schreiben."
            ],
            "answer": 0,
            "explanation": "Professionelle E-Mails sind sachlich und lösungsorientiert."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Kontext: Wirtschaftsnachrichten verstehen.",
            "question": "Auf C1-Niveau wird ___ Ausdrucksweise erwartet.",
            "options": [
              "differenzierte",
              "Name",
              "mache"
            ],
            "answer": "differenzierte",
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "sort_sentence",
            "situation": "Du diskutierst über Wirtschaftsnachrichten verstehen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "ist",
              "Wendung",
              "ziehen",
              "die",
              "Betracht",
              "In",
              "korrekte"
            ],
            "answer": [
              5,
              4,
              2,
              0,
              3,
              6,
              1
            ],
            "explanation": "Richtig: In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Es sei darauf hingewiesen, ___...",
            "options": [
              "dass",
              "werde",
              "Nummer"
            ],
            "answer": "dass",
            "explanation": "Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "auf",
              "eingehen",
              "Sachlich",
              "Kompetenz",
              "zeigt",
              "Einwände"
            ],
            "answer": [
              2,
              0,
              5,
              1,
              4,
              3
            ],
            "explanation": "Richtig: Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "fill_blank",
            "situation": "Du musst eine kritische E-Mail schreiben.",
            "question": "Professionelle E-Mails sind sachlich und ___.",
            "options": [
              "lösungsorientiert",
              "suche",
              "habe"
            ],
            "answer": "lösungsorientiert",
            "explanation": "Professionelle E-Mails sind sachlich und lösungsorientiert."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Kontext: Wirtschaftsnachrichten verstehen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Differenziert und nuanciert argumentieren.",
              "Darüber lässt sich streiten.",
              "Ich halte das für nicht zielführend."
            ],
            "answer": 0,
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "quick_reaction",
            "situation": "Du diskutierst über Wirtschaftsnachrichten verstehen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "ziehen",
              "Das würde den Rahmen sprengen.",
              "Das bedarf einer Analyse."
            ],
            "answer": 0,
            "explanation": "In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Es darauf hingewiesen dass sei",
              "Das entzieht sich meiner Kenntnis.",
              "Das bedarf einer Analyse."
            ],
            "answer": 0,
            "explanation": "Richtig: Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ihren Einwand kann ich nachvollziehen, dennoch...",
              "Darüber lässt sich streiten.",
              "Eine pauschale Aussage ist schwierig."
            ],
            "answer": 0,
            "explanation": "Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du musst eine kritische E-Mail schreiben.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Sachlich bleiben und konstruktive Lösungen vorschlagen.",
              "Das entzieht sich meiner Kenntnis.",
              "Das kann man so nicht sagen."
            ],
            "answer": 0,
            "explanation": "Professionelle E-Mails sind sachlich und lösungsorientiert."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Differenziert und nuanciert argumentieren.",
        "context": "Kontext: Wirtschaftsnachrichten verstehen"
      },
      {
        "de": "ziehen",
        "context": "Du diskutierst über Wirtschaftsnachrichten verstehen"
      },
      {
        "de": "Es darauf hingewiesen dass sei",
        "context": "Du formulierst eine differenzierte Aussage"
      },
      {
        "de": "Ihren Einwand kann ich nachvollziehen, dennoch...",
        "context": "Jemand widerspricht deiner These"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Einfach formulieren.",
        "correct": "Differenziert und nuanciert argumentieren.",
        "tip": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
      },
      {
        "wrong": "nehmen",
        "correct": "ziehen",
        "tip": "In Betracht ziehen ist die korrekte Wendung."
      },
      {
        "wrong": "Das stimmt nicht.",
        "correct": "Ihren Einwand kann ich nachvollziehen, dennoch...",
        "tip": "Sachlich auf Einwände eingehen zeigt Kompetenz."
      }
    ]
  },
  {
    "id": "c1-20",
    "level": "C1",
    "title": "Satireverständnis",
    "titleDe": "Satire und Ironie verstehen",
    "icon": "😏",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Kontext: Satire und Ironie verstehen.",
            "question": "Wie drückst du dich angemessen aus?",
            "options": [
              "Differenziert und nuanciert argumentieren.",
              "Einfach formulieren.",
              "Nichts sagen."
            ],
            "answer": 0,
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "fill_blank",
            "situation": "Du diskutierst über Satire und Ironie verstehen.",
            "question": "Man muss in Betracht ___, dass verschiedene Perspektiven existieren.",
            "options": [
              "ziehen",
              "nehmen",
              "bringen"
            ],
            "answer": "ziehen",
            "explanation": "In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "dass",
              "Es",
              "sei",
              "darauf",
              "hingewiesen"
            ],
            "answer": [
              1,
              3,
              4,
              0,
              2
            ],
            "explanation": "Richtig: Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Wie reagierst du?",
            "options": [
              "Ihren Einwand kann ich nachvollziehen, dennoch...",
              "Das stimmt nicht.",
              "Lassen Sie mich ausreden."
            ],
            "answer": 0,
            "explanation": "Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du wirst um eine Einschätzung gebeten.",
            "question": "Wie formulierst du diplomatisch?",
            "options": [
              "Meiner Einschätzung nach wäre es ratsam, alternative Ansätze zu prüfen.",
              "Das ist falsch.",
              "Mir fehlt die Zeit dafür."
            ],
            "answer": 0,
            "explanation": "Diplomatische Formulierungen sind auf C1-Niveau essentiell."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Kontext: Satire und Ironie verstehen.",
            "question": "Auf C1-Niveau wird differenzierte Ausdrucksweise ___.",
            "options": [
              "erwartet",
              "hier",
              "Antwort"
            ],
            "answer": "erwartet",
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "sort_sentence",
            "situation": "Du diskutierst über Satire und Ironie verstehen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Wendung",
              "Betracht",
              "In",
              "ziehen",
              "korrekte",
              "die",
              "ist"
            ],
            "answer": [
              2,
              1,
              3,
              6,
              5,
              4,
              0
            ],
            "explanation": "Richtig: In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Es sei ___ hingewiesen, dass...",
            "options": [
              "darauf",
              "mache",
              "wichtig"
            ],
            "answer": "darauf",
            "explanation": "Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Kompetenz",
              "Einwände",
              "eingehen",
              "auf",
              "zeigt",
              "Sachlich"
            ],
            "answer": [
              5,
              3,
              1,
              2,
              4,
              0
            ],
            "explanation": "Richtig: Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "fill_blank",
            "situation": "Du wirst um eine Einschätzung gebeten.",
            "question": "Diplomatische ___ sind auf C1-Niveau essentiell.",
            "options": [
              "Formulierungen",
              "Hilfe",
              "frage"
            ],
            "answer": "Formulierungen",
            "explanation": "Diplomatische Formulierungen sind auf C1-Niveau essentiell."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Kontext: Satire und Ironie verstehen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Differenziert und nuanciert argumentieren.",
              "Ich möchte mich nicht äußern.",
              "Das kann man so nicht sagen."
            ],
            "answer": 0,
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "quick_reaction",
            "situation": "Du diskutierst über Satire und Ironie verstehen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "ziehen",
              "Darüber lässt sich streiten.",
              "Das würde den Rahmen sprengen."
            ],
            "answer": 0,
            "explanation": "In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Es darauf hingewiesen dass sei",
              "Darüber lässt sich streiten.",
              "Das ist vereinfacht dargestellt."
            ],
            "answer": 0,
            "explanation": "Richtig: Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ihren Einwand kann ich nachvollziehen, dennoch...",
              "Ich möchte mich nicht äußern.",
              "Eine pauschale Aussage ist schwierig."
            ],
            "answer": 0,
            "explanation": "Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du wirst um eine Einschätzung gebeten.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Meiner Einschätzung nach wäre es ratsam, alternative Ansätze zu prüfen.",
              "Das greift zu kurz.",
              "Ich halte das für nicht zielführend."
            ],
            "answer": 0,
            "explanation": "Diplomatische Formulierungen sind auf C1-Niveau essentiell."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Differenziert und nuanciert argumentieren.",
        "context": "Kontext: Satire und Ironie verstehen"
      },
      {
        "de": "ziehen",
        "context": "Du diskutierst über Satire und Ironie verstehen"
      },
      {
        "de": "Es darauf hingewiesen dass sei",
        "context": "Du formulierst eine differenzierte Aussage"
      },
      {
        "de": "Ihren Einwand kann ich nachvollziehen, dennoch...",
        "context": "Jemand widerspricht deiner These"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Einfach formulieren.",
        "correct": "Differenziert und nuanciert argumentieren.",
        "tip": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
      },
      {
        "wrong": "nehmen",
        "correct": "ziehen",
        "tip": "In Betracht ziehen ist die korrekte Wendung."
      },
      {
        "wrong": "Das stimmt nicht.",
        "correct": "Ihren Einwand kann ich nachvollziehen, dennoch...",
        "tip": "Sachlich auf Einwände eingehen zeigt Kompetenz."
      }
    ]
  },
  {
    "id": "c1-21",
    "level": "C1",
    "title": "Juristische Texte",
    "titleDe": "Juristische Texte lesen",
    "icon": "📜",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Kontext: Juristische Texte lesen.",
            "question": "Wie drückst du dich angemessen aus?",
            "options": [
              "Differenziert und nuanciert argumentieren.",
              "Einfach formulieren.",
              "Nichts sagen."
            ],
            "answer": 0,
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "fill_blank",
            "situation": "Du diskutierst über Juristische Texte lesen.",
            "question": "Man muss in Betracht ___, dass verschiedene Perspektiven existieren.",
            "options": [
              "ziehen",
              "nehmen",
              "bringen"
            ],
            "answer": "ziehen",
            "explanation": "In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "dass",
              "Es",
              "sei",
              "darauf",
              "hingewiesen"
            ],
            "answer": [
              1,
              3,
              4,
              0,
              2
            ],
            "explanation": "Richtig: Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Wie reagierst du?",
            "options": [
              "Ihren Einwand kann ich nachvollziehen, dennoch...",
              "Das stimmt nicht.",
              "Lassen Sie mich ausreden."
            ],
            "answer": 0,
            "explanation": "Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du verhandelst über dein Gehalt.",
            "question": "Wie argumentierst du?",
            "options": [
              "Ich begründe meine Forderung mit Leistung und Marktwert.",
              "Ich sage, ich brauche mehr Geld.",
              "Ich drohe mit Kündigung."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation ist bei Gehaltsverhandlungen entscheidend."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Kontext: Juristische Texte lesen.",
            "question": "Auf C1-Niveau wird differenzierte Ausdrucksweise ___.",
            "options": [
              "erwartet",
              "sofort",
              "jetzt"
            ],
            "answer": "erwartet",
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "sort_sentence",
            "situation": "Du diskutierst über Juristische Texte lesen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Betracht",
              "die",
              "korrekte",
              "ist",
              "ziehen",
              "Wendung",
              "In"
            ],
            "answer": [
              6,
              0,
              4,
              3,
              1,
              2,
              5
            ],
            "explanation": "Richtig: In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Es ___ darauf hingewiesen, dass...",
            "options": [
              "sei",
              "dort",
              "Problem"
            ],
            "answer": "sei",
            "explanation": "Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "zeigt",
              "Einwände",
              "auf",
              "Kompetenz",
              "Sachlich",
              "eingehen"
            ],
            "answer": [
              4,
              2,
              1,
              5,
              0,
              3
            ],
            "explanation": "Richtig: Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "fill_blank",
            "situation": "Du verhandelst über dein Gehalt.",
            "question": "Sachliche ___ ist bei Gehaltsverhandlungen entscheidend.",
            "options": [
              "Argumentation",
              "wichtig",
              "gleich"
            ],
            "answer": "Argumentation",
            "explanation": "Sachliche Argumentation ist bei Gehaltsverhandlungen entscheidend."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Kontext: Juristische Texte lesen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Differenziert und nuanciert argumentieren.",
              "Darüber lässt sich streiten.",
              "Das greift zu kurz."
            ],
            "answer": 0,
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "quick_reaction",
            "situation": "Du diskutierst über Juristische Texte lesen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "ziehen",
              "Das greift zu kurz.",
              "Ich halte das für nicht zielführend."
            ],
            "answer": 0,
            "explanation": "In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Es darauf hingewiesen dass sei",
              "Ich halte das für nicht zielführend.",
              "Das entzieht sich meiner Kenntnis."
            ],
            "answer": 0,
            "explanation": "Richtig: Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ihren Einwand kann ich nachvollziehen, dennoch...",
              "Das ist vereinfacht dargestellt.",
              "Das kann man so nicht sagen."
            ],
            "answer": 0,
            "explanation": "Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du verhandelst über dein Gehalt.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich begründe meine Forderung mit Leistung und Marktwert.",
              "Ich möchte mich nicht äußern.",
              "Darüber lässt sich streiten."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation ist bei Gehaltsverhandlungen entscheidend."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Differenziert und nuanciert argumentieren.",
        "context": "Kontext: Juristische Texte lesen"
      },
      {
        "de": "ziehen",
        "context": "Du diskutierst über Juristische Texte lesen"
      },
      {
        "de": "Es darauf hingewiesen dass sei",
        "context": "Du formulierst eine differenzierte Aussage"
      },
      {
        "de": "Ihren Einwand kann ich nachvollziehen, dennoch...",
        "context": "Jemand widerspricht deiner These"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Einfach formulieren.",
        "correct": "Differenziert und nuanciert argumentieren.",
        "tip": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
      },
      {
        "wrong": "nehmen",
        "correct": "ziehen",
        "tip": "In Betracht ziehen ist die korrekte Wendung."
      },
      {
        "wrong": "Das stimmt nicht.",
        "correct": "Ihren Einwand kann ich nachvollziehen, dennoch...",
        "tip": "Sachlich auf Einwände eingehen zeigt Kompetenz."
      }
    ]
  },
  {
    "id": "c1-22",
    "level": "C1",
    "title": "Technikberichte",
    "titleDe": "Technische Berichte verfassen",
    "icon": "⚙️",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Kontext: Technische Berichte verfassen.",
            "question": "Wie drückst du dich angemessen aus?",
            "options": [
              "Differenziert und nuanciert argumentieren.",
              "Einfach formulieren.",
              "Nichts sagen."
            ],
            "answer": 0,
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "fill_blank",
            "situation": "Du diskutierst über Technische Berichte verfassen.",
            "question": "Man muss in Betracht ___, dass verschiedene Perspektiven existieren.",
            "options": [
              "ziehen",
              "nehmen",
              "bringen"
            ],
            "answer": "ziehen",
            "explanation": "In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "dass",
              "Es",
              "sei",
              "darauf",
              "hingewiesen"
            ],
            "answer": [
              1,
              3,
              4,
              0,
              2
            ],
            "explanation": "Richtig: Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Wie reagierst du?",
            "options": [
              "Ihren Einwand kann ich nachvollziehen, dennoch...",
              "Das stimmt nicht.",
              "Lassen Sie mich ausreden."
            ],
            "answer": 0,
            "explanation": "Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du leitest ein Projektmeeting.",
            "question": "Wie eröffnest du?",
            "options": [
              "Ich begrüße alle und gebe einen Überblick über die Agenda.",
              "Fangen wir an.",
              "Hat jemand Fragen?"
            ],
            "answer": 0,
            "explanation": "Eine strukturierte Eröffnung gibt dem Meeting Richtung."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Kontext: Technische Berichte verfassen.",
            "question": "Auf C1-Niveau wird differenzierte Ausdrucksweise ___.",
            "options": [
              "erwartet",
              "soll",
              "darf"
            ],
            "answer": "erwartet",
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "sort_sentence",
            "situation": "Du diskutierst über Technische Berichte verfassen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Wendung",
              "ist",
              "ziehen",
              "In",
              "korrekte",
              "die",
              "Betracht"
            ],
            "answer": [
              3,
              6,
              2,
              1,
              5,
              4,
              0
            ],
            "explanation": "Richtig: In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Es sei ___ hingewiesen, dass...",
            "options": [
              "darauf",
              "hier",
              "gestern"
            ],
            "answer": "darauf",
            "explanation": "Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Einwände",
              "Kompetenz",
              "zeigt",
              "Sachlich",
              "eingehen",
              "auf"
            ],
            "answer": [
              3,
              5,
              0,
              4,
              2,
              1
            ],
            "explanation": "Richtig: Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "fill_blank",
            "situation": "Du leitest ein Projektmeeting.",
            "question": "Eine strukturierte Eröffnung gibt dem Meeting ___.",
            "options": [
              "Richtung",
              "muss",
              "gerne"
            ],
            "answer": "Richtung",
            "explanation": "Eine strukturierte Eröffnung gibt dem Meeting Richtung."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Kontext: Technische Berichte verfassen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Differenziert und nuanciert argumentieren.",
              "Das kann man so nicht sagen.",
              "Das bedarf einer Analyse."
            ],
            "answer": 0,
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "quick_reaction",
            "situation": "Du diskutierst über Technische Berichte verfassen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "ziehen",
              "Das entzieht sich meiner Kenntnis.",
              "Ich halte das für nicht zielführend."
            ],
            "answer": 0,
            "explanation": "In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Es darauf hingewiesen dass sei",
              "Das würde den Rahmen sprengen.",
              "Darüber lässt sich streiten."
            ],
            "answer": 0,
            "explanation": "Richtig: Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ihren Einwand kann ich nachvollziehen, dennoch...",
              "Das entzieht sich meiner Kenntnis.",
              "Ich sehe mich außerstande dazu."
            ],
            "answer": 0,
            "explanation": "Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du leitest ein Projektmeeting.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich begrüße alle und gebe einen Überblick über die Agenda.",
              "Ich sehe mich außerstande dazu.",
              "Das entzieht sich meiner Kenntnis."
            ],
            "answer": 0,
            "explanation": "Eine strukturierte Eröffnung gibt dem Meeting Richtung."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Differenziert und nuanciert argumentieren.",
        "context": "Kontext: Technische Berichte verfassen"
      },
      {
        "de": "ziehen",
        "context": "Du diskutierst über Technische Berichte verfassen"
      },
      {
        "de": "Es darauf hingewiesen dass sei",
        "context": "Du formulierst eine differenzierte Aussage"
      },
      {
        "de": "Ihren Einwand kann ich nachvollziehen, dennoch...",
        "context": "Jemand widerspricht deiner These"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Einfach formulieren.",
        "correct": "Differenziert und nuanciert argumentieren.",
        "tip": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
      },
      {
        "wrong": "nehmen",
        "correct": "ziehen",
        "tip": "In Betracht ziehen ist die korrekte Wendung."
      },
      {
        "wrong": "Das stimmt nicht.",
        "correct": "Ihren Einwand kann ich nachvollziehen, dennoch...",
        "tip": "Sachlich auf Einwände eingehen zeigt Kompetenz."
      }
    ]
  },
  {
    "id": "c1-23",
    "level": "C1",
    "title": "Philosophie",
    "titleDe": "Philosophische Texte diskutieren",
    "icon": "🤔",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Kontext: Philosophische Texte diskutieren.",
            "question": "Wie drückst du dich angemessen aus?",
            "options": [
              "Differenziert und nuanciert argumentieren.",
              "Einfach formulieren.",
              "Nichts sagen."
            ],
            "answer": 0,
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "fill_blank",
            "situation": "Du diskutierst über Philosophische Texte diskutieren.",
            "question": "Man muss in Betracht ___, dass verschiedene Perspektiven existieren.",
            "options": [
              "ziehen",
              "nehmen",
              "bringen"
            ],
            "answer": "ziehen",
            "explanation": "In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "dass",
              "Es",
              "sei",
              "darauf",
              "hingewiesen"
            ],
            "answer": [
              1,
              3,
              4,
              0,
              2
            ],
            "explanation": "Richtig: Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Wie reagierst du?",
            "options": [
              "Ihren Einwand kann ich nachvollziehen, dennoch...",
              "Das stimmt nicht.",
              "Lassen Sie mich ausreden."
            ],
            "answer": 0,
            "explanation": "Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Ein Konflikt im Team eskaliert.",
            "question": "Was tust du?",
            "options": [
              "Ich führe Einzelgespräche und vermittle neutral.",
              "Ich ignoriere es.",
              "Ich beschwere mich beim Chef."
            ],
            "answer": 0,
            "explanation": "Konfliktlösung erfordert Einfühlungsvermögen und Neutralität."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Kontext: Philosophische Texte diskutieren.",
            "question": "Auf C1-Niveau ___ differenzierte Ausdrucksweise erwartet.",
            "options": [
              "wird",
              "suche",
              "möglich"
            ],
            "answer": "wird",
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "sort_sentence",
            "situation": "Du diskutierst über Philosophische Texte diskutieren.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Wendung",
              "ist",
              "korrekte",
              "ziehen",
              "Betracht",
              "die",
              "In"
            ],
            "answer": [
              6,
              4,
              3,
              1,
              5,
              2,
              0
            ],
            "explanation": "Richtig: In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Es sei darauf hingewiesen, ___...",
            "options": [
              "dass",
              "gestern",
              "Arbeit"
            ],
            "answer": "dass",
            "explanation": "Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "zeigt",
              "Kompetenz",
              "auf",
              "Sachlich",
              "Einwände",
              "eingehen"
            ],
            "answer": [
              3,
              2,
              4,
              5,
              0,
              1
            ],
            "explanation": "Richtig: Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "fill_blank",
            "situation": "Ein Konflikt im Team eskaliert.",
            "question": "Konfliktlösung ___ Einfühlungsvermögen und Neutralität.",
            "options": [
              "erfordert",
              "jetzt",
              "leider"
            ],
            "answer": "erfordert",
            "explanation": "Konfliktlösung erfordert Einfühlungsvermögen und Neutralität."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Kontext: Philosophische Texte diskutieren.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Differenziert und nuanciert argumentieren.",
              "Eine pauschale Aussage ist schwierig.",
              "Ich sehe mich außerstande dazu."
            ],
            "answer": 0,
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "quick_reaction",
            "situation": "Du diskutierst über Philosophische Texte diskutieren.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "ziehen",
              "Das würde den Rahmen sprengen.",
              "Eine pauschale Aussage ist schwierig."
            ],
            "answer": 0,
            "explanation": "In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Es darauf hingewiesen dass sei",
              "Das entzieht sich meiner Kenntnis.",
              "Ich sehe mich außerstande dazu."
            ],
            "answer": 0,
            "explanation": "Richtig: Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ihren Einwand kann ich nachvollziehen, dennoch...",
              "Darüber lässt sich streiten.",
              "Das greift zu kurz."
            ],
            "answer": 0,
            "explanation": "Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Ein Konflikt im Team eskaliert.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich führe Einzelgespräche und vermittle neutral.",
              "Ich sehe mich außerstande dazu.",
              "Das ist vereinfacht dargestellt."
            ],
            "answer": 0,
            "explanation": "Konfliktlösung erfordert Einfühlungsvermögen und Neutralität."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Differenziert und nuanciert argumentieren.",
        "context": "Kontext: Philosophische Texte diskutieren"
      },
      {
        "de": "ziehen",
        "context": "Du diskutierst über Philosophische Texte diskutieren"
      },
      {
        "de": "Es darauf hingewiesen dass sei",
        "context": "Du formulierst eine differenzierte Aussage"
      },
      {
        "de": "Ihren Einwand kann ich nachvollziehen, dennoch...",
        "context": "Jemand widerspricht deiner These"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Einfach formulieren.",
        "correct": "Differenziert und nuanciert argumentieren.",
        "tip": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
      },
      {
        "wrong": "nehmen",
        "correct": "ziehen",
        "tip": "In Betracht ziehen ist die korrekte Wendung."
      },
      {
        "wrong": "Das stimmt nicht.",
        "correct": "Ihren Einwand kann ich nachvollziehen, dennoch...",
        "tip": "Sachlich auf Einwände eingehen zeigt Kompetenz."
      }
    ]
  },
  {
    "id": "c1-24",
    "level": "C1",
    "title": "Projektbewertung",
    "titleDe": "Projekte bewerten",
    "icon": "✅",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Kontext: Projekte bewerten.",
            "question": "Wie drückst du dich angemessen aus?",
            "options": [
              "Differenziert und nuanciert argumentieren.",
              "Einfach formulieren.",
              "Nichts sagen."
            ],
            "answer": 0,
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "fill_blank",
            "situation": "Du diskutierst über Projekte bewerten.",
            "question": "Man muss in Betracht ___, dass verschiedene Perspektiven existieren.",
            "options": [
              "ziehen",
              "nehmen",
              "bringen"
            ],
            "answer": "ziehen",
            "explanation": "In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "dass",
              "Es",
              "sei",
              "darauf",
              "hingewiesen"
            ],
            "answer": [
              1,
              3,
              4,
              0,
              2
            ],
            "explanation": "Richtig: Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Wie reagierst du?",
            "options": [
              "Ihren Einwand kann ich nachvollziehen, dennoch...",
              "Das stimmt nicht.",
              "Lassen Sie mich ausreden."
            ],
            "answer": 0,
            "explanation": "Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du musst eine kritische E-Mail schreiben.",
            "question": "Worauf achtest du?",
            "options": [
              "Sachlich bleiben und konstruktive Lösungen vorschlagen.",
              "Meine Frustration ausdrücken.",
              "Kurz und direkt schreiben."
            ],
            "answer": 0,
            "explanation": "Professionelle E-Mails sind sachlich und lösungsorientiert."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Kontext: Projekte bewerten.",
            "question": "Auf C1-Niveau wird ___ Ausdrucksweise erwartet.",
            "options": [
              "differenzierte",
              "heute",
              "soll"
            ],
            "answer": "differenzierte",
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "sort_sentence",
            "situation": "Du diskutierst über Projekte bewerten.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Betracht",
              "In",
              "Wendung",
              "die",
              "korrekte",
              "ist",
              "ziehen"
            ],
            "answer": [
              1,
              0,
              6,
              5,
              3,
              4,
              2
            ],
            "explanation": "Richtig: In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Es sei darauf hingewiesen, ___...",
            "options": [
              "dass",
              "komme",
              "nötig"
            ],
            "answer": "dass",
            "explanation": "Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sachlich",
              "zeigt",
              "Einwände",
              "eingehen",
              "Kompetenz",
              "auf"
            ],
            "answer": [
              0,
              5,
              2,
              3,
              1,
              4
            ],
            "explanation": "Richtig: Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "fill_blank",
            "situation": "Du musst eine kritische E-Mail schreiben.",
            "question": "Professionelle E-Mails ___ sachlich und lösungsorientiert.",
            "options": [
              "sind",
              "Antwort",
              "dort"
            ],
            "answer": "sind",
            "explanation": "Professionelle E-Mails sind sachlich und lösungsorientiert."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Kontext: Projekte bewerten.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Differenziert und nuanciert argumentieren.",
              "Das würde den Rahmen sprengen.",
              "Das kann man so nicht sagen."
            ],
            "answer": 0,
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "quick_reaction",
            "situation": "Du diskutierst über Projekte bewerten.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "ziehen",
              "Darüber lässt sich streiten.",
              "Das entzieht sich meiner Kenntnis."
            ],
            "answer": 0,
            "explanation": "In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Es darauf hingewiesen dass sei",
              "Das greift zu kurz.",
              "Das würde den Rahmen sprengen."
            ],
            "answer": 0,
            "explanation": "Richtig: Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ihren Einwand kann ich nachvollziehen, dennoch...",
              "Das bedarf einer Analyse.",
              "Ich sehe mich außerstande dazu."
            ],
            "answer": 0,
            "explanation": "Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du musst eine kritische E-Mail schreiben.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Sachlich bleiben und konstruktive Lösungen vorschlagen.",
              "Das entzieht sich meiner Kenntnis.",
              "Das würde den Rahmen sprengen."
            ],
            "answer": 0,
            "explanation": "Professionelle E-Mails sind sachlich und lösungsorientiert."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Differenziert und nuanciert argumentieren.",
        "context": "Kontext: Projekte bewerten"
      },
      {
        "de": "ziehen",
        "context": "Du diskutierst über Projekte bewerten"
      },
      {
        "de": "Es darauf hingewiesen dass sei",
        "context": "Du formulierst eine differenzierte Aussage"
      },
      {
        "de": "Ihren Einwand kann ich nachvollziehen, dennoch...",
        "context": "Jemand widerspricht deiner These"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Einfach formulieren.",
        "correct": "Differenziert und nuanciert argumentieren.",
        "tip": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
      },
      {
        "wrong": "nehmen",
        "correct": "ziehen",
        "tip": "In Betracht ziehen ist die korrekte Wendung."
      },
      {
        "wrong": "Das stimmt nicht.",
        "correct": "Ihren Einwand kann ich nachvollziehen, dennoch...",
        "tip": "Sachlich auf Einwände eingehen zeigt Kompetenz."
      }
    ]
  },
  {
    "id": "c1-25",
    "level": "C1",
    "title": "Interkulturelles Training",
    "titleDe": "Interkulturelle Kompetenz",
    "icon": "🌐",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Kontext: Interkulturelle Kompetenz.",
            "question": "Wie drückst du dich angemessen aus?",
            "options": [
              "Differenziert und nuanciert argumentieren.",
              "Einfach formulieren.",
              "Nichts sagen."
            ],
            "answer": 0,
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "fill_blank",
            "situation": "Du diskutierst über Interkulturelle Kompetenz.",
            "question": "Man muss in Betracht ___, dass verschiedene Perspektiven existieren.",
            "options": [
              "ziehen",
              "nehmen",
              "bringen"
            ],
            "answer": "ziehen",
            "explanation": "In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "dass",
              "Es",
              "sei",
              "darauf",
              "hingewiesen"
            ],
            "answer": [
              1,
              3,
              4,
              0,
              2
            ],
            "explanation": "Richtig: Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Wie reagierst du?",
            "options": [
              "Ihren Einwand kann ich nachvollziehen, dennoch...",
              "Das stimmt nicht.",
              "Lassen Sie mich ausreden."
            ],
            "answer": 0,
            "explanation": "Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du wirst um eine Einschätzung gebeten.",
            "question": "Wie formulierst du diplomatisch?",
            "options": [
              "Meiner Einschätzung nach wäre es ratsam, alternative Ansätze zu prüfen.",
              "Das ist falsch.",
              "Mir fehlt die Zeit dafür."
            ],
            "answer": 0,
            "explanation": "Diplomatische Formulierungen sind auf C1-Niveau essentiell."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Kontext: Interkulturelle Kompetenz.",
            "question": "Auf C1-Niveau wird differenzierte Ausdrucksweise ___.",
            "options": [
              "erwartet",
              "heute",
              "Arbeit"
            ],
            "answer": "erwartet",
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "sort_sentence",
            "situation": "Du diskutierst über Interkulturelle Kompetenz.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "ist",
              "Betracht",
              "korrekte",
              "ziehen",
              "In",
              "Wendung",
              "die"
            ],
            "answer": [
              4,
              1,
              3,
              0,
              6,
              2,
              5
            ],
            "explanation": "Richtig: In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Es sei ___ hingewiesen, dass...",
            "options": [
              "darauf",
              "Adresse",
              "jetzt"
            ],
            "answer": "darauf",
            "explanation": "Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "eingehen",
              "Einwände",
              "Sachlich",
              "Kompetenz",
              "auf",
              "zeigt"
            ],
            "answer": [
              2,
              4,
              1,
              0,
              5,
              3
            ],
            "explanation": "Richtig: Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "fill_blank",
            "situation": "Du wirst um eine Einschätzung gebeten.",
            "question": "Diplomatische Formulierungen sind auf C1-Niveau ___.",
            "options": [
              "essentiell",
              "suche",
              "nehme"
            ],
            "answer": "essentiell",
            "explanation": "Diplomatische Formulierungen sind auf C1-Niveau essentiell."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Kontext: Interkulturelle Kompetenz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Differenziert und nuanciert argumentieren.",
              "Ich sehe mich außerstande dazu.",
              "Das bedarf einer Analyse."
            ],
            "answer": 0,
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "quick_reaction",
            "situation": "Du diskutierst über Interkulturelle Kompetenz.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "ziehen",
              "Das kann man so nicht sagen.",
              "Eine pauschale Aussage ist schwierig."
            ],
            "answer": 0,
            "explanation": "In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Es darauf hingewiesen dass sei",
              "Das entzieht sich meiner Kenntnis.",
              "Das greift zu kurz."
            ],
            "answer": 0,
            "explanation": "Richtig: Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ihren Einwand kann ich nachvollziehen, dennoch...",
              "Ich halte das für nicht zielführend.",
              "Das kann man so nicht sagen."
            ],
            "answer": 0,
            "explanation": "Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du wirst um eine Einschätzung gebeten.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Meiner Einschätzung nach wäre es ratsam, alternative Ansätze zu prüfen.",
              "Das greift zu kurz.",
              "Ich sehe mich außerstande dazu."
            ],
            "answer": 0,
            "explanation": "Diplomatische Formulierungen sind auf C1-Niveau essentiell."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Differenziert und nuanciert argumentieren.",
        "context": "Kontext: Interkulturelle Kompetenz"
      },
      {
        "de": "ziehen",
        "context": "Du diskutierst über Interkulturelle Kompetenz"
      },
      {
        "de": "Es darauf hingewiesen dass sei",
        "context": "Du formulierst eine differenzierte Aussage"
      },
      {
        "de": "Ihren Einwand kann ich nachvollziehen, dennoch...",
        "context": "Jemand widerspricht deiner These"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Einfach formulieren.",
        "correct": "Differenziert und nuanciert argumentieren.",
        "tip": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
      },
      {
        "wrong": "nehmen",
        "correct": "ziehen",
        "tip": "In Betracht ziehen ist die korrekte Wendung."
      },
      {
        "wrong": "Das stimmt nicht.",
        "correct": "Ihren Einwand kann ich nachvollziehen, dennoch...",
        "tip": "Sachlich auf Einwände eingehen zeigt Kompetenz."
      }
    ]
  },
  {
    "id": "c1-26",
    "level": "C1",
    "title": "Umweltpolitik",
    "titleDe": "Umweltthemen diskutieren",
    "icon": "🌱",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Kontext: Umweltthemen diskutieren.",
            "question": "Wie drückst du dich angemessen aus?",
            "options": [
              "Differenziert und nuanciert argumentieren.",
              "Einfach formulieren.",
              "Nichts sagen."
            ],
            "answer": 0,
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "fill_blank",
            "situation": "Du diskutierst über Umweltthemen diskutieren.",
            "question": "Man muss in Betracht ___, dass verschiedene Perspektiven existieren.",
            "options": [
              "ziehen",
              "nehmen",
              "bringen"
            ],
            "answer": "ziehen",
            "explanation": "In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "dass",
              "Es",
              "sei",
              "darauf",
              "hingewiesen"
            ],
            "answer": [
              1,
              3,
              4,
              0,
              2
            ],
            "explanation": "Richtig: Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Wie reagierst du?",
            "options": [
              "Ihren Einwand kann ich nachvollziehen, dennoch...",
              "Das stimmt nicht.",
              "Lassen Sie mich ausreden."
            ],
            "answer": 0,
            "explanation": "Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du verhandelst über dein Gehalt.",
            "question": "Wie argumentierst du?",
            "options": [
              "Ich begründe meine Forderung mit Leistung und Marktwert.",
              "Ich sage, ich brauche mehr Geld.",
              "Ich drohe mit Kündigung."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation ist bei Gehaltsverhandlungen entscheidend."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Kontext: Umweltthemen diskutieren.",
            "question": "Auf C1-Niveau wird ___ Ausdrucksweise erwartet.",
            "options": [
              "differenzierte",
              "hier",
              "muss"
            ],
            "answer": "differenzierte",
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "sort_sentence",
            "situation": "Du diskutierst über Umweltthemen diskutieren.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "korrekte",
              "Wendung",
              "die",
              "ist",
              "Betracht",
              "In",
              "ziehen"
            ],
            "answer": [
              5,
              4,
              6,
              3,
              2,
              0,
              1
            ],
            "explanation": "Richtig: In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Es sei ___ hingewiesen, dass...",
            "options": [
              "darauf",
              "hier",
              "jetzt"
            ],
            "answer": "darauf",
            "explanation": "Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Kompetenz",
              "zeigt",
              "eingehen",
              "Einwände",
              "Sachlich",
              "auf"
            ],
            "answer": [
              4,
              5,
              3,
              2,
              1,
              0
            ],
            "explanation": "Richtig: Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "fill_blank",
            "situation": "Du verhandelst über dein Gehalt.",
            "question": "Sachliche Argumentation ___ bei Gehaltsverhandlungen entscheidend.",
            "options": [
              "ist",
              "Problem",
              "richtig"
            ],
            "answer": "ist",
            "explanation": "Sachliche Argumentation ist bei Gehaltsverhandlungen entscheidend."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Kontext: Umweltthemen diskutieren.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Differenziert und nuanciert argumentieren.",
              "Ich halte das für nicht zielführend.",
              "Darüber lässt sich streiten."
            ],
            "answer": 0,
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "quick_reaction",
            "situation": "Du diskutierst über Umweltthemen diskutieren.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "ziehen",
              "Eine pauschale Aussage ist schwierig.",
              "Das kann man so nicht sagen."
            ],
            "answer": 0,
            "explanation": "In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Es darauf hingewiesen dass sei",
              "Das ist vereinfacht dargestellt.",
              "Eine pauschale Aussage ist schwierig."
            ],
            "answer": 0,
            "explanation": "Richtig: Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ihren Einwand kann ich nachvollziehen, dennoch...",
              "Das bedarf einer Analyse.",
              "Eine pauschale Aussage ist schwierig."
            ],
            "answer": 0,
            "explanation": "Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du verhandelst über dein Gehalt.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich begründe meine Forderung mit Leistung und Marktwert.",
              "Eine pauschale Aussage ist schwierig.",
              "Darüber lässt sich streiten."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation ist bei Gehaltsverhandlungen entscheidend."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Differenziert und nuanciert argumentieren.",
        "context": "Kontext: Umweltthemen diskutieren"
      },
      {
        "de": "ziehen",
        "context": "Du diskutierst über Umweltthemen diskutieren"
      },
      {
        "de": "Es darauf hingewiesen dass sei",
        "context": "Du formulierst eine differenzierte Aussage"
      },
      {
        "de": "Ihren Einwand kann ich nachvollziehen, dennoch...",
        "context": "Jemand widerspricht deiner These"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Einfach formulieren.",
        "correct": "Differenziert und nuanciert argumentieren.",
        "tip": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
      },
      {
        "wrong": "nehmen",
        "correct": "ziehen",
        "tip": "In Betracht ziehen ist die korrekte Wendung."
      },
      {
        "wrong": "Das stimmt nicht.",
        "correct": "Ihren Einwand kann ich nachvollziehen, dennoch...",
        "tip": "Sachlich auf Einwände eingehen zeigt Kompetenz."
      }
    ]
  },
  {
    "id": "c1-27",
    "level": "C1",
    "title": "Bildungspolitik",
    "titleDe": "Bildungsthemen erörtern",
    "icon": "📚",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Kontext: Bildungsthemen erörtern.",
            "question": "Wie drückst du dich angemessen aus?",
            "options": [
              "Differenziert und nuanciert argumentieren.",
              "Einfach formulieren.",
              "Nichts sagen."
            ],
            "answer": 0,
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "fill_blank",
            "situation": "Du diskutierst über Bildungsthemen erörtern.",
            "question": "Man muss in Betracht ___, dass verschiedene Perspektiven existieren.",
            "options": [
              "ziehen",
              "nehmen",
              "bringen"
            ],
            "answer": "ziehen",
            "explanation": "In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "dass",
              "Es",
              "sei",
              "darauf",
              "hingewiesen"
            ],
            "answer": [
              1,
              3,
              4,
              0,
              2
            ],
            "explanation": "Richtig: Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Wie reagierst du?",
            "options": [
              "Ihren Einwand kann ich nachvollziehen, dennoch...",
              "Das stimmt nicht.",
              "Lassen Sie mich ausreden."
            ],
            "answer": 0,
            "explanation": "Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du leitest ein Projektmeeting.",
            "question": "Wie eröffnest du?",
            "options": [
              "Ich begrüße alle und gebe einen Überblick über die Agenda.",
              "Fangen wir an.",
              "Hat jemand Fragen?"
            ],
            "answer": 0,
            "explanation": "Eine strukturierte Eröffnung gibt dem Meeting Richtung."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Kontext: Bildungsthemen erörtern.",
            "question": "Auf C1-Niveau wird ___ Ausdrucksweise erwartet.",
            "options": [
              "differenzierte",
              "Nummer",
              "komme"
            ],
            "answer": "differenzierte",
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "sort_sentence",
            "situation": "Du diskutierst über Bildungsthemen erörtern.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Wendung",
              "ist",
              "korrekte",
              "die",
              "Betracht",
              "ziehen",
              "In"
            ],
            "answer": [
              6,
              4,
              5,
              1,
              3,
              2,
              0
            ],
            "explanation": "Richtig: In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Es sei darauf ___, dass...",
            "options": [
              "hingewiesen",
              "Zeit",
              "möchte"
            ],
            "answer": "hingewiesen",
            "explanation": "Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sachlich",
              "zeigt",
              "auf",
              "eingehen",
              "Einwände",
              "Kompetenz"
            ],
            "answer": [
              0,
              2,
              4,
              3,
              1,
              5
            ],
            "explanation": "Richtig: Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "fill_blank",
            "situation": "Du leitest ein Projektmeeting.",
            "question": "Eine strukturierte Eröffnung ___ dem Meeting Richtung.",
            "options": [
              "gibt",
              "gleich",
              "Antwort"
            ],
            "answer": "gibt",
            "explanation": "Eine strukturierte Eröffnung gibt dem Meeting Richtung."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Kontext: Bildungsthemen erörtern.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Differenziert und nuanciert argumentieren.",
              "Ich halte das für nicht zielführend.",
              "Das greift zu kurz."
            ],
            "answer": 0,
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "quick_reaction",
            "situation": "Du diskutierst über Bildungsthemen erörtern.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "ziehen",
              "Ich sehe mich außerstande dazu.",
              "Das bedarf einer Analyse."
            ],
            "answer": 0,
            "explanation": "In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Es darauf hingewiesen dass sei",
              "Das kann man so nicht sagen.",
              "Eine pauschale Aussage ist schwierig."
            ],
            "answer": 0,
            "explanation": "Richtig: Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ihren Einwand kann ich nachvollziehen, dennoch...",
              "Ich sehe mich außerstande dazu.",
              "Das ist vereinfacht dargestellt."
            ],
            "answer": 0,
            "explanation": "Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du leitest ein Projektmeeting.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich begrüße alle und gebe einen Überblick über die Agenda.",
              "Das bedarf einer Analyse.",
              "Das greift zu kurz."
            ],
            "answer": 0,
            "explanation": "Eine strukturierte Eröffnung gibt dem Meeting Richtung."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Differenziert und nuanciert argumentieren.",
        "context": "Kontext: Bildungsthemen erörtern"
      },
      {
        "de": "ziehen",
        "context": "Du diskutierst über Bildungsthemen erörtern"
      },
      {
        "de": "Es darauf hingewiesen dass sei",
        "context": "Du formulierst eine differenzierte Aussage"
      },
      {
        "de": "Ihren Einwand kann ich nachvollziehen, dennoch...",
        "context": "Jemand widerspricht deiner These"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Einfach formulieren.",
        "correct": "Differenziert und nuanciert argumentieren.",
        "tip": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
      },
      {
        "wrong": "nehmen",
        "correct": "ziehen",
        "tip": "In Betracht ziehen ist die korrekte Wendung."
      },
      {
        "wrong": "Das stimmt nicht.",
        "correct": "Ihren Einwand kann ich nachvollziehen, dennoch...",
        "tip": "Sachlich auf Einwände eingehen zeigt Kompetenz."
      }
    ]
  },
  {
    "id": "c1-28",
    "level": "C1",
    "title": "Sozialpolitik",
    "titleDe": "Soziale Themen analysieren",
    "icon": "🤝",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Kontext: Soziale Themen analysieren.",
            "question": "Wie drückst du dich angemessen aus?",
            "options": [
              "Differenziert und nuanciert argumentieren.",
              "Einfach formulieren.",
              "Nichts sagen."
            ],
            "answer": 0,
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "fill_blank",
            "situation": "Du diskutierst über Soziale Themen analysieren.",
            "question": "Man muss in Betracht ___, dass verschiedene Perspektiven existieren.",
            "options": [
              "ziehen",
              "nehmen",
              "bringen"
            ],
            "answer": "ziehen",
            "explanation": "In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "dass",
              "Es",
              "sei",
              "darauf",
              "hingewiesen"
            ],
            "answer": [
              1,
              3,
              4,
              0,
              2
            ],
            "explanation": "Richtig: Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Wie reagierst du?",
            "options": [
              "Ihren Einwand kann ich nachvollziehen, dennoch...",
              "Das stimmt nicht.",
              "Lassen Sie mich ausreden."
            ],
            "answer": 0,
            "explanation": "Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Ein Konflikt im Team eskaliert.",
            "question": "Was tust du?",
            "options": [
              "Ich führe Einzelgespräche und vermittle neutral.",
              "Ich ignoriere es.",
              "Ich beschwere mich beim Chef."
            ],
            "answer": 0,
            "explanation": "Konfliktlösung erfordert Einfühlungsvermögen und Neutralität."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Kontext: Soziale Themen analysieren.",
            "question": "Auf C1-Niveau ___ differenzierte Ausdrucksweise erwartet.",
            "options": [
              "wird",
              "suche",
              "leider"
            ],
            "answer": "wird",
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "sort_sentence",
            "situation": "Du diskutierst über Soziale Themen analysieren.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Betracht",
              "ist",
              "ziehen",
              "die",
              "Wendung",
              "In",
              "korrekte"
            ],
            "answer": [
              5,
              0,
              2,
              1,
              3,
              6,
              4
            ],
            "explanation": "Richtig: In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Es sei darauf hingewiesen, ___...",
            "options": [
              "dass",
              "gleich",
              "langsam"
            ],
            "answer": "dass",
            "explanation": "Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "zeigt",
              "Kompetenz",
              "eingehen",
              "Einwände",
              "Sachlich",
              "auf"
            ],
            "answer": [
              4,
              5,
              3,
              2,
              0,
              1
            ],
            "explanation": "Richtig: Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "fill_blank",
            "situation": "Ein Konflikt im Team eskaliert.",
            "question": "Konfliktlösung erfordert ___ und Neutralität.",
            "options": [
              "Einfühlungsvermögen",
              "Zeit",
              "Arbeit"
            ],
            "answer": "Einfühlungsvermögen",
            "explanation": "Konfliktlösung erfordert Einfühlungsvermögen und Neutralität."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Kontext: Soziale Themen analysieren.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Differenziert und nuanciert argumentieren.",
              "Ich möchte mich nicht äußern.",
              "Eine pauschale Aussage ist schwierig."
            ],
            "answer": 0,
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "quick_reaction",
            "situation": "Du diskutierst über Soziale Themen analysieren.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "ziehen",
              "Das würde den Rahmen sprengen.",
              "Das ist vereinfacht dargestellt."
            ],
            "answer": 0,
            "explanation": "In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Es darauf hingewiesen dass sei",
              "Das bedarf einer Analyse.",
              "Ich halte das für nicht zielführend."
            ],
            "answer": 0,
            "explanation": "Richtig: Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ihren Einwand kann ich nachvollziehen, dennoch...",
              "Das greift zu kurz.",
              "Das würde den Rahmen sprengen."
            ],
            "answer": 0,
            "explanation": "Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Ein Konflikt im Team eskaliert.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich führe Einzelgespräche und vermittle neutral.",
              "Ich sehe mich außerstande dazu.",
              "Das wäre kontraproduktiv."
            ],
            "answer": 0,
            "explanation": "Konfliktlösung erfordert Einfühlungsvermögen und Neutralität."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Differenziert und nuanciert argumentieren.",
        "context": "Kontext: Soziale Themen analysieren"
      },
      {
        "de": "ziehen",
        "context": "Du diskutierst über Soziale Themen analysieren"
      },
      {
        "de": "Es darauf hingewiesen dass sei",
        "context": "Du formulierst eine differenzierte Aussage"
      },
      {
        "de": "Ihren Einwand kann ich nachvollziehen, dennoch...",
        "context": "Jemand widerspricht deiner These"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Einfach formulieren.",
        "correct": "Differenziert und nuanciert argumentieren.",
        "tip": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
      },
      {
        "wrong": "nehmen",
        "correct": "ziehen",
        "tip": "In Betracht ziehen ist die korrekte Wendung."
      },
      {
        "wrong": "Das stimmt nicht.",
        "correct": "Ihren Einwand kann ich nachvollziehen, dennoch...",
        "tip": "Sachlich auf Einwände eingehen zeigt Kompetenz."
      }
    ]
  },
  {
    "id": "c1-29",
    "level": "C1",
    "title": "Technologieethik",
    "titleDe": "Technologie-Ethik diskutieren",
    "icon": "💻",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Kontext: Technologie-Ethik diskutieren.",
            "question": "Wie drückst du dich angemessen aus?",
            "options": [
              "Differenziert und nuanciert argumentieren.",
              "Einfach formulieren.",
              "Nichts sagen."
            ],
            "answer": 0,
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "fill_blank",
            "situation": "Du diskutierst über Technologie-Ethik diskutieren.",
            "question": "Man muss in Betracht ___, dass verschiedene Perspektiven existieren.",
            "options": [
              "ziehen",
              "nehmen",
              "bringen"
            ],
            "answer": "ziehen",
            "explanation": "In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "dass",
              "Es",
              "sei",
              "darauf",
              "hingewiesen"
            ],
            "answer": [
              1,
              3,
              4,
              0,
              2
            ],
            "explanation": "Richtig: Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Wie reagierst du?",
            "options": [
              "Ihren Einwand kann ich nachvollziehen, dennoch...",
              "Das stimmt nicht.",
              "Lassen Sie mich ausreden."
            ],
            "answer": 0,
            "explanation": "Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du musst eine kritische E-Mail schreiben.",
            "question": "Worauf achtest du?",
            "options": [
              "Sachlich bleiben und konstruktive Lösungen vorschlagen.",
              "Meine Frustration ausdrücken.",
              "Kurz und direkt schreiben."
            ],
            "answer": 0,
            "explanation": "Professionelle E-Mails sind sachlich und lösungsorientiert."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Kontext: Technologie-Ethik diskutieren.",
            "question": "Auf C1-Niveau wird ___ Ausdrucksweise erwartet.",
            "options": [
              "differenzierte",
              "falsch",
              "habe"
            ],
            "answer": "differenzierte",
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "sort_sentence",
            "situation": "Du diskutierst über Technologie-Ethik diskutieren.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "ist",
              "In",
              "ziehen",
              "Wendung",
              "die",
              "Betracht",
              "korrekte"
            ],
            "answer": [
              1,
              5,
              2,
              0,
              4,
              6,
              3
            ],
            "explanation": "Richtig: In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Es sei darauf hingewiesen, ___...",
            "options": [
              "dass",
              "komme",
              "mache"
            ],
            "answer": "dass",
            "explanation": "Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sachlich",
              "eingehen",
              "Einwände",
              "auf",
              "Kompetenz",
              "zeigt"
            ],
            "answer": [
              0,
              3,
              2,
              1,
              5,
              4
            ],
            "explanation": "Richtig: Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "fill_blank",
            "situation": "Du musst eine kritische E-Mail schreiben.",
            "question": "Professionelle E-Mails sind ___ und lösungsorientiert.",
            "options": [
              "sachlich",
              "werde",
              "frage"
            ],
            "answer": "sachlich",
            "explanation": "Professionelle E-Mails sind sachlich und lösungsorientiert."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Kontext: Technologie-Ethik diskutieren.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Differenziert und nuanciert argumentieren.",
              "Ich halte das für nicht zielführend.",
              "Ich möchte mich nicht äußern."
            ],
            "answer": 0,
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "quick_reaction",
            "situation": "Du diskutierst über Technologie-Ethik diskutieren.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "ziehen",
              "Ich sehe mich außerstande dazu.",
              "Das ist vereinfacht dargestellt."
            ],
            "answer": 0,
            "explanation": "In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Es darauf hingewiesen dass sei",
              "Darüber lässt sich streiten.",
              "Ich möchte mich nicht äußern."
            ],
            "answer": 0,
            "explanation": "Richtig: Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ihren Einwand kann ich nachvollziehen, dennoch...",
              "Das entzieht sich meiner Kenntnis.",
              "Das kann man so nicht sagen."
            ],
            "answer": 0,
            "explanation": "Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du musst eine kritische E-Mail schreiben.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Sachlich bleiben und konstruktive Lösungen vorschlagen.",
              "Ich möchte mich nicht äußern.",
              "Das greift zu kurz."
            ],
            "answer": 0,
            "explanation": "Professionelle E-Mails sind sachlich und lösungsorientiert."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Differenziert und nuanciert argumentieren.",
        "context": "Kontext: Technologie-Ethik diskutieren"
      },
      {
        "de": "ziehen",
        "context": "Du diskutierst über Technologie-Ethik diskutieren"
      },
      {
        "de": "Es darauf hingewiesen dass sei",
        "context": "Du formulierst eine differenzierte Aussage"
      },
      {
        "de": "Ihren Einwand kann ich nachvollziehen, dennoch...",
        "context": "Jemand widerspricht deiner These"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Einfach formulieren.",
        "correct": "Differenziert und nuanciert argumentieren.",
        "tip": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
      },
      {
        "wrong": "nehmen",
        "correct": "ziehen",
        "tip": "In Betracht ziehen ist die korrekte Wendung."
      },
      {
        "wrong": "Das stimmt nicht.",
        "correct": "Ihren Einwand kann ich nachvollziehen, dennoch...",
        "tip": "Sachlich auf Einwände eingehen zeigt Kompetenz."
      }
    ]
  },
  {
    "id": "c1-30",
    "level": "C1",
    "title": "Literaturkritik",
    "titleDe": "Literatur kritisch analysieren",
    "icon": "📕",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Kontext: Literatur kritisch analysieren.",
            "question": "Wie drückst du dich angemessen aus?",
            "options": [
              "Differenziert und nuanciert argumentieren.",
              "Einfach formulieren.",
              "Nichts sagen."
            ],
            "answer": 0,
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "fill_blank",
            "situation": "Du diskutierst über Literatur kritisch analysieren.",
            "question": "Man muss in Betracht ___, dass verschiedene Perspektiven existieren.",
            "options": [
              "ziehen",
              "nehmen",
              "bringen"
            ],
            "answer": "ziehen",
            "explanation": "In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "dass",
              "Es",
              "sei",
              "darauf",
              "hingewiesen"
            ],
            "answer": [
              1,
              3,
              4,
              0,
              2
            ],
            "explanation": "Richtig: Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Wie reagierst du?",
            "options": [
              "Ihren Einwand kann ich nachvollziehen, dennoch...",
              "Das stimmt nicht.",
              "Lassen Sie mich ausreden."
            ],
            "answer": 0,
            "explanation": "Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du wirst um eine Einschätzung gebeten.",
            "question": "Wie formulierst du diplomatisch?",
            "options": [
              "Meiner Einschätzung nach wäre es ratsam, alternative Ansätze zu prüfen.",
              "Das ist falsch.",
              "Mir fehlt die Zeit dafür."
            ],
            "answer": 0,
            "explanation": "Diplomatische Formulierungen sind auf C1-Niveau essentiell."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Kontext: Literatur kritisch analysieren.",
            "question": "Auf C1-Niveau wird ___ Ausdrucksweise erwartet.",
            "options": [
              "differenzierte",
              "Geld",
              "schlecht"
            ],
            "answer": "differenzierte",
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "sort_sentence",
            "situation": "Du diskutierst über Literatur kritisch analysieren.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Wendung",
              "Betracht",
              "die",
              "ziehen",
              "korrekte",
              "In",
              "ist"
            ],
            "answer": [
              5,
              1,
              3,
              6,
              2,
              4,
              0
            ],
            "explanation": "Richtig: In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Es sei darauf ___, dass...",
            "options": [
              "hingewiesen",
              "langsam",
              "nötig"
            ],
            "answer": "hingewiesen",
            "explanation": "Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sachlich",
              "Kompetenz",
              "Einwände",
              "eingehen",
              "auf",
              "zeigt"
            ],
            "answer": [
              0,
              4,
              2,
              3,
              5,
              1
            ],
            "explanation": "Richtig: Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "fill_blank",
            "situation": "Du wirst um eine Einschätzung gebeten.",
            "question": "Diplomatische Formulierungen sind ___ C1-Niveau essentiell.",
            "options": [
              "auf",
              "langsam",
              "jetzt"
            ],
            "answer": "auf",
            "explanation": "Diplomatische Formulierungen sind auf C1-Niveau essentiell."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Kontext: Literatur kritisch analysieren.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Differenziert und nuanciert argumentieren.",
              "Ich sehe mich außerstande dazu.",
              "Das greift zu kurz."
            ],
            "answer": 0,
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "quick_reaction",
            "situation": "Du diskutierst über Literatur kritisch analysieren.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "ziehen",
              "Das ist vereinfacht dargestellt.",
              "Das wäre kontraproduktiv."
            ],
            "answer": 0,
            "explanation": "In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Es darauf hingewiesen dass sei",
              "Ich möchte mich nicht äußern.",
              "Das greift zu kurz."
            ],
            "answer": 0,
            "explanation": "Richtig: Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ihren Einwand kann ich nachvollziehen, dennoch...",
              "Das wäre kontraproduktiv.",
              "Darüber lässt sich streiten."
            ],
            "answer": 0,
            "explanation": "Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du wirst um eine Einschätzung gebeten.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Meiner Einschätzung nach wäre es ratsam, alternative Ansätze zu prüfen.",
              "Darüber lässt sich streiten.",
              "Ich halte das für nicht zielführend."
            ],
            "answer": 0,
            "explanation": "Diplomatische Formulierungen sind auf C1-Niveau essentiell."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Differenziert und nuanciert argumentieren.",
        "context": "Kontext: Literatur kritisch analysieren"
      },
      {
        "de": "ziehen",
        "context": "Du diskutierst über Literatur kritisch analysieren"
      },
      {
        "de": "Es darauf hingewiesen dass sei",
        "context": "Du formulierst eine differenzierte Aussage"
      },
      {
        "de": "Ihren Einwand kann ich nachvollziehen, dennoch...",
        "context": "Jemand widerspricht deiner These"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Einfach formulieren.",
        "correct": "Differenziert und nuanciert argumentieren.",
        "tip": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
      },
      {
        "wrong": "nehmen",
        "correct": "ziehen",
        "tip": "In Betracht ziehen ist die korrekte Wendung."
      },
      {
        "wrong": "Das stimmt nicht.",
        "correct": "Ihren Einwand kann ich nachvollziehen, dennoch...",
        "tip": "Sachlich auf Einwände eingehen zeigt Kompetenz."
      }
    ]
  },
  {
    "id": "c1-31",
    "level": "C1",
    "title": "Medienkompetenz",
    "titleDe": "Medienkompetenz entwickeln",
    "icon": "📱",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Kontext: Medienkompetenz entwickeln.",
            "question": "Wie drückst du dich angemessen aus?",
            "options": [
              "Differenziert und nuanciert argumentieren.",
              "Einfach formulieren.",
              "Nichts sagen."
            ],
            "answer": 0,
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "fill_blank",
            "situation": "Du diskutierst über Medienkompetenz entwickeln.",
            "question": "Man muss in Betracht ___, dass verschiedene Perspektiven existieren.",
            "options": [
              "ziehen",
              "nehmen",
              "bringen"
            ],
            "answer": "ziehen",
            "explanation": "In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "dass",
              "Es",
              "sei",
              "darauf",
              "hingewiesen"
            ],
            "answer": [
              1,
              3,
              4,
              0,
              2
            ],
            "explanation": "Richtig: Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Wie reagierst du?",
            "options": [
              "Ihren Einwand kann ich nachvollziehen, dennoch...",
              "Das stimmt nicht.",
              "Lassen Sie mich ausreden."
            ],
            "answer": 0,
            "explanation": "Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du verhandelst über dein Gehalt.",
            "question": "Wie argumentierst du?",
            "options": [
              "Ich begründe meine Forderung mit Leistung und Marktwert.",
              "Ich sage, ich brauche mehr Geld.",
              "Ich drohe mit Kündigung."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation ist bei Gehaltsverhandlungen entscheidend."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Kontext: Medienkompetenz entwickeln.",
            "question": "Auf C1-Niveau wird differenzierte ___ erwartet.",
            "options": [
              "Ausdrucksweise",
              "heute",
              "habe"
            ],
            "answer": "Ausdrucksweise",
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "sort_sentence",
            "situation": "Du diskutierst über Medienkompetenz entwickeln.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Wendung",
              "ziehen",
              "In",
              "korrekte",
              "ist",
              "Betracht",
              "die"
            ],
            "answer": [
              2,
              5,
              1,
              4,
              6,
              3,
              0
            ],
            "explanation": "Richtig: In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Es sei darauf ___, dass...",
            "options": [
              "hingewiesen",
              "sage",
              "gehe"
            ],
            "answer": "hingewiesen",
            "explanation": "Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "zeigt",
              "Sachlich",
              "eingehen",
              "Einwände",
              "Kompetenz",
              "auf"
            ],
            "answer": [
              1,
              5,
              3,
              2,
              0,
              4
            ],
            "explanation": "Richtig: Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "fill_blank",
            "situation": "Du verhandelst über dein Gehalt.",
            "question": "Sachliche Argumentation ___ bei Gehaltsverhandlungen entscheidend.",
            "options": [
              "ist",
              "Adresse",
              "Lösung"
            ],
            "answer": "ist",
            "explanation": "Sachliche Argumentation ist bei Gehaltsverhandlungen entscheidend."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Kontext: Medienkompetenz entwickeln.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Differenziert und nuanciert argumentieren.",
              "Das würde den Rahmen sprengen.",
              "Ich sehe mich außerstande dazu."
            ],
            "answer": 0,
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "quick_reaction",
            "situation": "Du diskutierst über Medienkompetenz entwickeln.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "ziehen",
              "Ich halte das für nicht zielführend.",
              "Das kann man so nicht sagen."
            ],
            "answer": 0,
            "explanation": "In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Es darauf hingewiesen dass sei",
              "Ich halte das für nicht zielführend.",
              "Das würde den Rahmen sprengen."
            ],
            "answer": 0,
            "explanation": "Richtig: Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ihren Einwand kann ich nachvollziehen, dennoch...",
              "Ich möchte mich nicht äußern.",
              "Eine pauschale Aussage ist schwierig."
            ],
            "answer": 0,
            "explanation": "Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du verhandelst über dein Gehalt.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich begründe meine Forderung mit Leistung und Marktwert.",
              "Das bedarf einer Analyse.",
              "Das kann man so nicht sagen."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation ist bei Gehaltsverhandlungen entscheidend."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Differenziert und nuanciert argumentieren.",
        "context": "Kontext: Medienkompetenz entwickeln"
      },
      {
        "de": "ziehen",
        "context": "Du diskutierst über Medienkompetenz entwickeln"
      },
      {
        "de": "Es darauf hingewiesen dass sei",
        "context": "Du formulierst eine differenzierte Aussage"
      },
      {
        "de": "Ihren Einwand kann ich nachvollziehen, dennoch...",
        "context": "Jemand widerspricht deiner These"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Einfach formulieren.",
        "correct": "Differenziert und nuanciert argumentieren.",
        "tip": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
      },
      {
        "wrong": "nehmen",
        "correct": "ziehen",
        "tip": "In Betracht ziehen ist die korrekte Wendung."
      },
      {
        "wrong": "Das stimmt nicht.",
        "correct": "Ihren Einwand kann ich nachvollziehen, dennoch...",
        "tip": "Sachlich auf Einwände eingehen zeigt Kompetenz."
      }
    ]
  },
  {
    "id": "c1-32",
    "level": "C1",
    "title": "Argumentationsstrategien",
    "titleDe": "Argumentationsstrategien",
    "icon": "💡",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Kontext: Argumentationsstrategien.",
            "question": "Wie drückst du dich angemessen aus?",
            "options": [
              "Differenziert und nuanciert argumentieren.",
              "Einfach formulieren.",
              "Nichts sagen."
            ],
            "answer": 0,
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "fill_blank",
            "situation": "Du diskutierst über Argumentationsstrategien.",
            "question": "Man muss in Betracht ___, dass verschiedene Perspektiven existieren.",
            "options": [
              "ziehen",
              "nehmen",
              "bringen"
            ],
            "answer": "ziehen",
            "explanation": "In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "dass",
              "Es",
              "sei",
              "darauf",
              "hingewiesen"
            ],
            "answer": [
              1,
              3,
              4,
              0,
              2
            ],
            "explanation": "Richtig: Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Wie reagierst du?",
            "options": [
              "Ihren Einwand kann ich nachvollziehen, dennoch...",
              "Das stimmt nicht.",
              "Lassen Sie mich ausreden."
            ],
            "answer": 0,
            "explanation": "Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du leitest ein Projektmeeting.",
            "question": "Wie eröffnest du?",
            "options": [
              "Ich begrüße alle und gebe einen Überblick über die Agenda.",
              "Fangen wir an.",
              "Hat jemand Fragen?"
            ],
            "answer": 0,
            "explanation": "Eine strukturierte Eröffnung gibt dem Meeting Richtung."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Kontext: Argumentationsstrategien.",
            "question": "Auf C1-Niveau wird differenzierte ___ erwartet.",
            "options": [
              "Ausdrucksweise",
              "bin",
              "brauche"
            ],
            "answer": "Ausdrucksweise",
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "sort_sentence",
            "situation": "Du diskutierst über Argumentationsstrategien.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "ist",
              "ziehen",
              "Wendung",
              "korrekte",
              "die",
              "Betracht",
              "In"
            ],
            "answer": [
              6,
              5,
              1,
              0,
              4,
              3,
              2
            ],
            "explanation": "Richtig: In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Es sei ___ hingewiesen, dass...",
            "options": [
              "darauf",
              "kann",
              "komme"
            ],
            "answer": "darauf",
            "explanation": "Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "zeigt",
              "Sachlich",
              "Kompetenz",
              "eingehen",
              "auf",
              "Einwände"
            ],
            "answer": [
              1,
              4,
              5,
              3,
              0,
              2
            ],
            "explanation": "Richtig: Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "fill_blank",
            "situation": "Du leitest ein Projektmeeting.",
            "question": "Eine strukturierte Eröffnung gibt dem Meeting ___.",
            "options": [
              "Richtung",
              "leider",
              "hier"
            ],
            "answer": "Richtung",
            "explanation": "Eine strukturierte Eröffnung gibt dem Meeting Richtung."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Kontext: Argumentationsstrategien.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Differenziert und nuanciert argumentieren.",
              "Das ist vereinfacht dargestellt.",
              "Ich sehe mich außerstande dazu."
            ],
            "answer": 0,
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "quick_reaction",
            "situation": "Du diskutierst über Argumentationsstrategien.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "ziehen",
              "Ich möchte mich nicht äußern.",
              "Ich halte das für nicht zielführend."
            ],
            "answer": 0,
            "explanation": "In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Es darauf hingewiesen dass sei",
              "Eine pauschale Aussage ist schwierig.",
              "Ich halte das für nicht zielführend."
            ],
            "answer": 0,
            "explanation": "Richtig: Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ihren Einwand kann ich nachvollziehen, dennoch...",
              "Ich halte das für nicht zielführend.",
              "Das bedarf einer Analyse."
            ],
            "answer": 0,
            "explanation": "Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du leitest ein Projektmeeting.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich begrüße alle und gebe einen Überblick über die Agenda.",
              "Ich möchte mich nicht äußern.",
              "Das wäre kontraproduktiv."
            ],
            "answer": 0,
            "explanation": "Eine strukturierte Eröffnung gibt dem Meeting Richtung."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Differenziert und nuanciert argumentieren.",
        "context": "Kontext: Argumentationsstrategien"
      },
      {
        "de": "ziehen",
        "context": "Du diskutierst über Argumentationsstrategien"
      },
      {
        "de": "Es darauf hingewiesen dass sei",
        "context": "Du formulierst eine differenzierte Aussage"
      },
      {
        "de": "Ihren Einwand kann ich nachvollziehen, dennoch...",
        "context": "Jemand widerspricht deiner These"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Einfach formulieren.",
        "correct": "Differenziert und nuanciert argumentieren.",
        "tip": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
      },
      {
        "wrong": "nehmen",
        "correct": "ziehen",
        "tip": "In Betracht ziehen ist die korrekte Wendung."
      },
      {
        "wrong": "Das stimmt nicht.",
        "correct": "Ihren Einwand kann ich nachvollziehen, dennoch...",
        "tip": "Sachlich auf Einwände eingehen zeigt Kompetenz."
      }
    ]
  },
  {
    "id": "c1-33",
    "level": "C1",
    "title": "Sprachstile",
    "titleDe": "Verschiedene Sprachstile beherrschen",
    "icon": "✍️",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Kontext: Verschiedene Sprachstile beherrschen.",
            "question": "Wie drückst du dich angemessen aus?",
            "options": [
              "Differenziert und nuanciert argumentieren.",
              "Einfach formulieren.",
              "Nichts sagen."
            ],
            "answer": 0,
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "fill_blank",
            "situation": "Du diskutierst über Verschiedene Sprachstile beherrschen.",
            "question": "Man muss in Betracht ___, dass verschiedene Perspektiven existieren.",
            "options": [
              "ziehen",
              "nehmen",
              "bringen"
            ],
            "answer": "ziehen",
            "explanation": "In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "dass",
              "Es",
              "sei",
              "darauf",
              "hingewiesen"
            ],
            "answer": [
              1,
              3,
              4,
              0,
              2
            ],
            "explanation": "Richtig: Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Wie reagierst du?",
            "options": [
              "Ihren Einwand kann ich nachvollziehen, dennoch...",
              "Das stimmt nicht.",
              "Lassen Sie mich ausreden."
            ],
            "answer": 0,
            "explanation": "Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Ein Konflikt im Team eskaliert.",
            "question": "Was tust du?",
            "options": [
              "Ich führe Einzelgespräche und vermittle neutral.",
              "Ich ignoriere es.",
              "Ich beschwere mich beim Chef."
            ],
            "answer": 0,
            "explanation": "Konfliktlösung erfordert Einfühlungsvermögen und Neutralität."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Kontext: Verschiedene Sprachstile beherrschen.",
            "question": "Auf C1-Niveau wird differenzierte Ausdrucksweise ___.",
            "options": [
              "erwartet",
              "gehe",
              "langsam"
            ],
            "answer": "erwartet",
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "sort_sentence",
            "situation": "Du diskutierst über Verschiedene Sprachstile beherrschen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "ist",
              "korrekte",
              "In",
              "ziehen",
              "die",
              "Betracht",
              "Wendung"
            ],
            "answer": [
              2,
              5,
              3,
              0,
              4,
              1,
              6
            ],
            "explanation": "Richtig: In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Es sei darauf hingewiesen, ___...",
            "options": [
              "dass",
              "heute",
              "langsam"
            ],
            "answer": "dass",
            "explanation": "Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Einwände",
              "Kompetenz",
              "zeigt",
              "eingehen",
              "auf",
              "Sachlich"
            ],
            "answer": [
              5,
              4,
              0,
              3,
              2,
              1
            ],
            "explanation": "Richtig: Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "fill_blank",
            "situation": "Ein Konflikt im Team eskaliert.",
            "question": "Konfliktlösung ___ Einfühlungsvermögen und Neutralität.",
            "options": [
              "erfordert",
              "bin",
              "nehme"
            ],
            "answer": "erfordert",
            "explanation": "Konfliktlösung erfordert Einfühlungsvermögen und Neutralität."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Kontext: Verschiedene Sprachstile beherrschen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Differenziert und nuanciert argumentieren.",
              "Das greift zu kurz.",
              "Das würde den Rahmen sprengen."
            ],
            "answer": 0,
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "quick_reaction",
            "situation": "Du diskutierst über Verschiedene Sprachstile beherrschen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "ziehen",
              "Das kann man so nicht sagen.",
              "Das wäre kontraproduktiv."
            ],
            "answer": 0,
            "explanation": "In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Es darauf hingewiesen dass sei",
              "Das bedarf einer Analyse.",
              "Eine pauschale Aussage ist schwierig."
            ],
            "answer": 0,
            "explanation": "Richtig: Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ihren Einwand kann ich nachvollziehen, dennoch...",
              "Ich sehe mich außerstande dazu.",
              "Das bedarf einer Analyse."
            ],
            "answer": 0,
            "explanation": "Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Ein Konflikt im Team eskaliert.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich führe Einzelgespräche und vermittle neutral.",
              "Ich halte das für nicht zielführend.",
              "Eine pauschale Aussage ist schwierig."
            ],
            "answer": 0,
            "explanation": "Konfliktlösung erfordert Einfühlungsvermögen und Neutralität."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Differenziert und nuanciert argumentieren.",
        "context": "Kontext: Verschiedene Sprachstile beherrschen"
      },
      {
        "de": "ziehen",
        "context": "Du diskutierst über Verschiedene Sprachstile beherrschen"
      },
      {
        "de": "Es darauf hingewiesen dass sei",
        "context": "Du formulierst eine differenzierte Aussage"
      },
      {
        "de": "Ihren Einwand kann ich nachvollziehen, dennoch...",
        "context": "Jemand widerspricht deiner These"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Einfach formulieren.",
        "correct": "Differenziert und nuanciert argumentieren.",
        "tip": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
      },
      {
        "wrong": "nehmen",
        "correct": "ziehen",
        "tip": "In Betracht ziehen ist die korrekte Wendung."
      },
      {
        "wrong": "Das stimmt nicht.",
        "correct": "Ihren Einwand kann ich nachvollziehen, dennoch...",
        "tip": "Sachlich auf Einwände eingehen zeigt Kompetenz."
      }
    ]
  },
  {
    "id": "c1-34",
    "level": "C1",
    "title": "Kulturkritik",
    "titleDe": "Kulturelle Phänomene analysieren",
    "icon": "🎭",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Kontext: Kulturelle Phänomene analysieren.",
            "question": "Wie drückst du dich angemessen aus?",
            "options": [
              "Differenziert und nuanciert argumentieren.",
              "Einfach formulieren.",
              "Nichts sagen."
            ],
            "answer": 0,
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "fill_blank",
            "situation": "Du diskutierst über Kulturelle Phänomene analysieren.",
            "question": "Man muss in Betracht ___, dass verschiedene Perspektiven existieren.",
            "options": [
              "ziehen",
              "nehmen",
              "bringen"
            ],
            "answer": "ziehen",
            "explanation": "In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "dass",
              "Es",
              "sei",
              "darauf",
              "hingewiesen"
            ],
            "answer": [
              1,
              3,
              4,
              0,
              2
            ],
            "explanation": "Richtig: Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Wie reagierst du?",
            "options": [
              "Ihren Einwand kann ich nachvollziehen, dennoch...",
              "Das stimmt nicht.",
              "Lassen Sie mich ausreden."
            ],
            "answer": 0,
            "explanation": "Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du musst eine kritische E-Mail schreiben.",
            "question": "Worauf achtest du?",
            "options": [
              "Sachlich bleiben und konstruktive Lösungen vorschlagen.",
              "Meine Frustration ausdrücken.",
              "Kurz und direkt schreiben."
            ],
            "answer": 0,
            "explanation": "Professionelle E-Mails sind sachlich und lösungsorientiert."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Kontext: Kulturelle Phänomene analysieren.",
            "question": "Auf C1-Niveau wird differenzierte Ausdrucksweise ___.",
            "options": [
              "erwartet",
              "werde",
              "nötig"
            ],
            "answer": "erwartet",
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "sort_sentence",
            "situation": "Du diskutierst über Kulturelle Phänomene analysieren.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Betracht",
              "Wendung",
              "ziehen",
              "ist",
              "korrekte",
              "In",
              "die"
            ],
            "answer": [
              5,
              0,
              2,
              3,
              6,
              4,
              1
            ],
            "explanation": "Richtig: In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Es ___ darauf hingewiesen, dass...",
            "options": [
              "sei",
              "gleich",
              "dort"
            ],
            "answer": "sei",
            "explanation": "Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Einwände",
              "Sachlich",
              "auf",
              "zeigt",
              "eingehen",
              "Kompetenz"
            ],
            "answer": [
              1,
              2,
              0,
              4,
              3,
              5
            ],
            "explanation": "Richtig: Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "fill_blank",
            "situation": "Du musst eine kritische E-Mail schreiben.",
            "question": "Professionelle E-Mails sind sachlich und ___.",
            "options": [
              "lösungsorientiert",
              "Nummer",
              "frage"
            ],
            "answer": "lösungsorientiert",
            "explanation": "Professionelle E-Mails sind sachlich und lösungsorientiert."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Kontext: Kulturelle Phänomene analysieren.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Differenziert und nuanciert argumentieren.",
              "Ich halte das für nicht zielführend.",
              "Das wäre kontraproduktiv."
            ],
            "answer": 0,
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "quick_reaction",
            "situation": "Du diskutierst über Kulturelle Phänomene analysieren.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "ziehen",
              "Darüber lässt sich streiten.",
              "Eine pauschale Aussage ist schwierig."
            ],
            "answer": 0,
            "explanation": "In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Es darauf hingewiesen dass sei",
              "Das würde den Rahmen sprengen.",
              "Eine pauschale Aussage ist schwierig."
            ],
            "answer": 0,
            "explanation": "Richtig: Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ihren Einwand kann ich nachvollziehen, dennoch...",
              "Ich sehe mich außerstande dazu.",
              "Das wäre kontraproduktiv."
            ],
            "answer": 0,
            "explanation": "Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du musst eine kritische E-Mail schreiben.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Sachlich bleiben und konstruktive Lösungen vorschlagen.",
              "Das bedarf einer Analyse.",
              "Das ist vereinfacht dargestellt."
            ],
            "answer": 0,
            "explanation": "Professionelle E-Mails sind sachlich und lösungsorientiert."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Differenziert und nuanciert argumentieren.",
        "context": "Kontext: Kulturelle Phänomene analysieren"
      },
      {
        "de": "ziehen",
        "context": "Du diskutierst über Kulturelle Phänomene analysieren"
      },
      {
        "de": "Es darauf hingewiesen dass sei",
        "context": "Du formulierst eine differenzierte Aussage"
      },
      {
        "de": "Ihren Einwand kann ich nachvollziehen, dennoch...",
        "context": "Jemand widerspricht deiner These"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Einfach formulieren.",
        "correct": "Differenziert und nuanciert argumentieren.",
        "tip": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
      },
      {
        "wrong": "nehmen",
        "correct": "ziehen",
        "tip": "In Betracht ziehen ist die korrekte Wendung."
      },
      {
        "wrong": "Das stimmt nicht.",
        "correct": "Ihren Einwand kann ich nachvollziehen, dennoch...",
        "tip": "Sachlich auf Einwände eingehen zeigt Kompetenz."
      }
    ]
  },
  {
    "id": "c1-35",
    "level": "C1",
    "title": "Wirtschaftstheorie",
    "titleDe": "Wirtschaftstheorien verstehen",
    "icon": "📊",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Kontext: Wirtschaftstheorien verstehen.",
            "question": "Wie drückst du dich angemessen aus?",
            "options": [
              "Differenziert und nuanciert argumentieren.",
              "Einfach formulieren.",
              "Nichts sagen."
            ],
            "answer": 0,
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "fill_blank",
            "situation": "Du diskutierst über Wirtschaftstheorien verstehen.",
            "question": "Man muss in Betracht ___, dass verschiedene Perspektiven existieren.",
            "options": [
              "ziehen",
              "nehmen",
              "bringen"
            ],
            "answer": "ziehen",
            "explanation": "In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "dass",
              "Es",
              "sei",
              "darauf",
              "hingewiesen"
            ],
            "answer": [
              1,
              3,
              4,
              0,
              2
            ],
            "explanation": "Richtig: Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Wie reagierst du?",
            "options": [
              "Ihren Einwand kann ich nachvollziehen, dennoch...",
              "Das stimmt nicht.",
              "Lassen Sie mich ausreden."
            ],
            "answer": 0,
            "explanation": "Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du wirst um eine Einschätzung gebeten.",
            "question": "Wie formulierst du diplomatisch?",
            "options": [
              "Meiner Einschätzung nach wäre es ratsam, alternative Ansätze zu prüfen.",
              "Das ist falsch.",
              "Mir fehlt die Zeit dafür."
            ],
            "answer": 0,
            "explanation": "Diplomatische Formulierungen sind auf C1-Niveau essentiell."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Kontext: Wirtschaftstheorien verstehen.",
            "question": "Auf C1-Niveau wird differenzierte ___ erwartet.",
            "options": [
              "Ausdrucksweise",
              "gleich",
              "frage"
            ],
            "answer": "Ausdrucksweise",
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "sort_sentence",
            "situation": "Du diskutierst über Wirtschaftstheorien verstehen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "die",
              "korrekte",
              "Betracht",
              "ist",
              "ziehen",
              "In",
              "Wendung"
            ],
            "answer": [
              5,
              2,
              4,
              3,
              0,
              1,
              6
            ],
            "explanation": "Richtig: In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Es ___ darauf hingewiesen, dass...",
            "options": [
              "sei",
              "danke",
              "gerne"
            ],
            "answer": "sei",
            "explanation": "Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "auf",
              "eingehen",
              "Einwände",
              "Kompetenz",
              "zeigt",
              "Sachlich"
            ],
            "answer": [
              5,
              0,
              2,
              1,
              4,
              3
            ],
            "explanation": "Richtig: Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "fill_blank",
            "situation": "Du wirst um eine Einschätzung gebeten.",
            "question": "Diplomatische Formulierungen sind auf ___ essentiell.",
            "options": [
              "C1-Niveau",
              "jetzt",
              "sage"
            ],
            "answer": "C1-Niveau",
            "explanation": "Diplomatische Formulierungen sind auf C1-Niveau essentiell."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Kontext: Wirtschaftstheorien verstehen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Differenziert und nuanciert argumentieren.",
              "Das würde den Rahmen sprengen.",
              "Darüber lässt sich streiten."
            ],
            "answer": 0,
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "quick_reaction",
            "situation": "Du diskutierst über Wirtschaftstheorien verstehen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "ziehen",
              "Das wäre kontraproduktiv.",
              "Darüber lässt sich streiten."
            ],
            "answer": 0,
            "explanation": "In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Es darauf hingewiesen dass sei",
              "Ich sehe mich außerstande dazu.",
              "Das bedarf einer Analyse."
            ],
            "answer": 0,
            "explanation": "Richtig: Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ihren Einwand kann ich nachvollziehen, dennoch...",
              "Das wäre kontraproduktiv.",
              "Das kann man so nicht sagen."
            ],
            "answer": 0,
            "explanation": "Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du wirst um eine Einschätzung gebeten.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Meiner Einschätzung nach wäre es ratsam, alternative Ansätze zu prüfen.",
              "Eine pauschale Aussage ist schwierig.",
              "Das ist vereinfacht dargestellt."
            ],
            "answer": 0,
            "explanation": "Diplomatische Formulierungen sind auf C1-Niveau essentiell."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Differenziert und nuanciert argumentieren.",
        "context": "Kontext: Wirtschaftstheorien verstehen"
      },
      {
        "de": "ziehen",
        "context": "Du diskutierst über Wirtschaftstheorien verstehen"
      },
      {
        "de": "Es darauf hingewiesen dass sei",
        "context": "Du formulierst eine differenzierte Aussage"
      },
      {
        "de": "Ihren Einwand kann ich nachvollziehen, dennoch...",
        "context": "Jemand widerspricht deiner These"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Einfach formulieren.",
        "correct": "Differenziert und nuanciert argumentieren.",
        "tip": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
      },
      {
        "wrong": "nehmen",
        "correct": "ziehen",
        "tip": "In Betracht ziehen ist die korrekte Wendung."
      },
      {
        "wrong": "Das stimmt nicht.",
        "correct": "Ihren Einwand kann ich nachvollziehen, dennoch...",
        "tip": "Sachlich auf Einwände eingehen zeigt Kompetenz."
      }
    ]
  },
  {
    "id": "c1-36",
    "level": "C1",
    "title": "Globalisierung",
    "titleDe": "Globalisierung diskutieren",
    "icon": "🌍",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Kontext: Globalisierung diskutieren.",
            "question": "Wie drückst du dich angemessen aus?",
            "options": [
              "Differenziert und nuanciert argumentieren.",
              "Einfach formulieren.",
              "Nichts sagen."
            ],
            "answer": 0,
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "fill_blank",
            "situation": "Du diskutierst über Globalisierung diskutieren.",
            "question": "Man muss in Betracht ___, dass verschiedene Perspektiven existieren.",
            "options": [
              "ziehen",
              "nehmen",
              "bringen"
            ],
            "answer": "ziehen",
            "explanation": "In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "dass",
              "Es",
              "sei",
              "darauf",
              "hingewiesen"
            ],
            "answer": [
              1,
              3,
              4,
              0,
              2
            ],
            "explanation": "Richtig: Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Wie reagierst du?",
            "options": [
              "Ihren Einwand kann ich nachvollziehen, dennoch...",
              "Das stimmt nicht.",
              "Lassen Sie mich ausreden."
            ],
            "answer": 0,
            "explanation": "Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du verhandelst über dein Gehalt.",
            "question": "Wie argumentierst du?",
            "options": [
              "Ich begründe meine Forderung mit Leistung und Marktwert.",
              "Ich sage, ich brauche mehr Geld.",
              "Ich drohe mit Kündigung."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation ist bei Gehaltsverhandlungen entscheidend."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Kontext: Globalisierung diskutieren.",
            "question": "Auf C1-Niveau wird ___ Ausdrucksweise erwartet.",
            "options": [
              "differenzierte",
              "nötig",
              "Nummer"
            ],
            "answer": "differenzierte",
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "sort_sentence",
            "situation": "Du diskutierst über Globalisierung diskutieren.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "In",
              "Betracht",
              "ist",
              "korrekte",
              "Wendung",
              "ziehen",
              "die"
            ],
            "answer": [
              0,
              1,
              5,
              2,
              6,
              3,
              4
            ],
            "explanation": "Richtig: In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Es sei ___ hingewiesen, dass...",
            "options": [
              "darauf",
              "Adresse",
              "möglich"
            ],
            "answer": "darauf",
            "explanation": "Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sachlich",
              "Einwände",
              "Kompetenz",
              "auf",
              "eingehen",
              "zeigt"
            ],
            "answer": [
              0,
              3,
              1,
              4,
              5,
              2
            ],
            "explanation": "Richtig: Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "fill_blank",
            "situation": "Du verhandelst über dein Gehalt.",
            "question": "Sachliche Argumentation ist ___ Gehaltsverhandlungen entscheidend.",
            "options": [
              "bei",
              "Antwort",
              "schnell"
            ],
            "answer": "bei",
            "explanation": "Sachliche Argumentation ist bei Gehaltsverhandlungen entscheidend."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Kontext: Globalisierung diskutieren.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Differenziert und nuanciert argumentieren.",
              "Darüber lässt sich streiten.",
              "Das wäre kontraproduktiv."
            ],
            "answer": 0,
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "quick_reaction",
            "situation": "Du diskutierst über Globalisierung diskutieren.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "ziehen",
              "Das würde den Rahmen sprengen.",
              "Das bedarf einer Analyse."
            ],
            "answer": 0,
            "explanation": "In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Es darauf hingewiesen dass sei",
              "Das kann man so nicht sagen.",
              "Ich sehe mich außerstande dazu."
            ],
            "answer": 0,
            "explanation": "Richtig: Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ihren Einwand kann ich nachvollziehen, dennoch...",
              "Das würde den Rahmen sprengen.",
              "Ich möchte mich nicht äußern."
            ],
            "answer": 0,
            "explanation": "Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du verhandelst über dein Gehalt.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich begründe meine Forderung mit Leistung und Marktwert.",
              "Ich halte das für nicht zielführend.",
              "Das bedarf einer Analyse."
            ],
            "answer": 0,
            "explanation": "Sachliche Argumentation ist bei Gehaltsverhandlungen entscheidend."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Differenziert und nuanciert argumentieren.",
        "context": "Kontext: Globalisierung diskutieren"
      },
      {
        "de": "ziehen",
        "context": "Du diskutierst über Globalisierung diskutieren"
      },
      {
        "de": "Es darauf hingewiesen dass sei",
        "context": "Du formulierst eine differenzierte Aussage"
      },
      {
        "de": "Ihren Einwand kann ich nachvollziehen, dennoch...",
        "context": "Jemand widerspricht deiner These"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Einfach formulieren.",
        "correct": "Differenziert und nuanciert argumentieren.",
        "tip": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
      },
      {
        "wrong": "nehmen",
        "correct": "ziehen",
        "tip": "In Betracht ziehen ist die korrekte Wendung."
      },
      {
        "wrong": "Das stimmt nicht.",
        "correct": "Ihren Einwand kann ich nachvollziehen, dennoch...",
        "tip": "Sachlich auf Einwände eingehen zeigt Kompetenz."
      }
    ]
  },
  {
    "id": "c1-37",
    "level": "C1",
    "title": "Rechtsphilosophie",
    "titleDe": "Rechtsphilosophie verstehen",
    "icon": "⚖️",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Kontext: Rechtsphilosophie verstehen.",
            "question": "Wie drückst du dich angemessen aus?",
            "options": [
              "Differenziert und nuanciert argumentieren.",
              "Einfach formulieren.",
              "Nichts sagen."
            ],
            "answer": 0,
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "fill_blank",
            "situation": "Du diskutierst über Rechtsphilosophie verstehen.",
            "question": "Man muss in Betracht ___, dass verschiedene Perspektiven existieren.",
            "options": [
              "ziehen",
              "nehmen",
              "bringen"
            ],
            "answer": "ziehen",
            "explanation": "In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "dass",
              "Es",
              "sei",
              "darauf",
              "hingewiesen"
            ],
            "answer": [
              1,
              3,
              4,
              0,
              2
            ],
            "explanation": "Richtig: Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Wie reagierst du?",
            "options": [
              "Ihren Einwand kann ich nachvollziehen, dennoch...",
              "Das stimmt nicht.",
              "Lassen Sie mich ausreden."
            ],
            "answer": 0,
            "explanation": "Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du leitest ein Projektmeeting.",
            "question": "Wie eröffnest du?",
            "options": [
              "Ich begrüße alle und gebe einen Überblick über die Agenda.",
              "Fangen wir an.",
              "Hat jemand Fragen?"
            ],
            "answer": 0,
            "explanation": "Eine strukturierte Eröffnung gibt dem Meeting Richtung."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Kontext: Rechtsphilosophie verstehen.",
            "question": "Auf ___ wird differenzierte Ausdrucksweise erwartet.",
            "options": [
              "C1-Niveau",
              "sage",
              "falsch"
            ],
            "answer": "C1-Niveau",
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "sort_sentence",
            "situation": "Du diskutierst über Rechtsphilosophie verstehen.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "korrekte",
              "Betracht",
              "Wendung",
              "In",
              "die",
              "ziehen",
              "ist"
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
            "explanation": "Richtig: In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Es ___ darauf hingewiesen, dass...",
            "options": [
              "sei",
              "soll",
              "gehe"
            ],
            "answer": "sei",
            "explanation": "Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "auf",
              "Einwände",
              "Sachlich",
              "Kompetenz",
              "zeigt",
              "eingehen"
            ],
            "answer": [
              2,
              0,
              1,
              5,
              4,
              3
            ],
            "explanation": "Richtig: Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "fill_blank",
            "situation": "Du leitest ein Projektmeeting.",
            "question": "Eine strukturierte Eröffnung ___ dem Meeting Richtung.",
            "options": [
              "gibt",
              "frage",
              "Zeit"
            ],
            "answer": "gibt",
            "explanation": "Eine strukturierte Eröffnung gibt dem Meeting Richtung."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Kontext: Rechtsphilosophie verstehen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Differenziert und nuanciert argumentieren.",
              "Ich sehe mich außerstande dazu.",
              "Eine pauschale Aussage ist schwierig."
            ],
            "answer": 0,
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "quick_reaction",
            "situation": "Du diskutierst über Rechtsphilosophie verstehen.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "ziehen",
              "Das entzieht sich meiner Kenntnis.",
              "Das wäre kontraproduktiv."
            ],
            "answer": 0,
            "explanation": "In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Es darauf hingewiesen dass sei",
              "Das wäre kontraproduktiv.",
              "Eine pauschale Aussage ist schwierig."
            ],
            "answer": 0,
            "explanation": "Richtig: Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ihren Einwand kann ich nachvollziehen, dennoch...",
              "Das kann man so nicht sagen.",
              "Das greift zu kurz."
            ],
            "answer": 0,
            "explanation": "Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du leitest ein Projektmeeting.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich begrüße alle und gebe einen Überblick über die Agenda.",
              "Das ist vereinfacht dargestellt.",
              "Eine pauschale Aussage ist schwierig."
            ],
            "answer": 0,
            "explanation": "Eine strukturierte Eröffnung gibt dem Meeting Richtung."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Differenziert und nuanciert argumentieren.",
        "context": "Kontext: Rechtsphilosophie verstehen"
      },
      {
        "de": "ziehen",
        "context": "Du diskutierst über Rechtsphilosophie verstehen"
      },
      {
        "de": "Es darauf hingewiesen dass sei",
        "context": "Du formulierst eine differenzierte Aussage"
      },
      {
        "de": "Ihren Einwand kann ich nachvollziehen, dennoch...",
        "context": "Jemand widerspricht deiner These"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Einfach formulieren.",
        "correct": "Differenziert und nuanciert argumentieren.",
        "tip": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
      },
      {
        "wrong": "nehmen",
        "correct": "ziehen",
        "tip": "In Betracht ziehen ist die korrekte Wendung."
      },
      {
        "wrong": "Das stimmt nicht.",
        "correct": "Ihren Einwand kann ich nachvollziehen, dennoch...",
        "tip": "Sachlich auf Einwände eingehen zeigt Kompetenz."
      }
    ]
  },
  {
    "id": "c1-38",
    "level": "C1",
    "title": "Innovation",
    "titleDe": "Innovationsprozesse beschreiben",
    "icon": "🚀",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Kontext: Innovationsprozesse beschreiben.",
            "question": "Wie drückst du dich angemessen aus?",
            "options": [
              "Differenziert und nuanciert argumentieren.",
              "Einfach formulieren.",
              "Nichts sagen."
            ],
            "answer": 0,
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "fill_blank",
            "situation": "Du diskutierst über Innovationsprozesse beschreiben.",
            "question": "Man muss in Betracht ___, dass verschiedene Perspektiven existieren.",
            "options": [
              "ziehen",
              "nehmen",
              "bringen"
            ],
            "answer": "ziehen",
            "explanation": "In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "dass",
              "Es",
              "sei",
              "darauf",
              "hingewiesen"
            ],
            "answer": [
              1,
              3,
              4,
              0,
              2
            ],
            "explanation": "Richtig: Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Wie reagierst du?",
            "options": [
              "Ihren Einwand kann ich nachvollziehen, dennoch...",
              "Das stimmt nicht.",
              "Lassen Sie mich ausreden."
            ],
            "answer": 0,
            "explanation": "Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Ein Konflikt im Team eskaliert.",
            "question": "Was tust du?",
            "options": [
              "Ich führe Einzelgespräche und vermittle neutral.",
              "Ich ignoriere es.",
              "Ich beschwere mich beim Chef."
            ],
            "answer": 0,
            "explanation": "Konfliktlösung erfordert Einfühlungsvermögen und Neutralität."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Kontext: Innovationsprozesse beschreiben.",
            "question": "Auf ___ wird differenzierte Ausdrucksweise erwartet.",
            "options": [
              "C1-Niveau",
              "gleich",
              "mache"
            ],
            "answer": "C1-Niveau",
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "sort_sentence",
            "situation": "Du diskutierst über Innovationsprozesse beschreiben.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "ziehen",
              "Betracht",
              "die",
              "In",
              "Wendung",
              "ist",
              "korrekte"
            ],
            "answer": [
              3,
              1,
              0,
              5,
              2,
              6,
              4
            ],
            "explanation": "Richtig: In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Es sei ___ hingewiesen, dass...",
            "options": [
              "darauf",
              "werde",
              "heute"
            ],
            "answer": "darauf",
            "explanation": "Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "eingehen",
              "Sachlich",
              "Einwände",
              "auf",
              "Kompetenz",
              "zeigt"
            ],
            "answer": [
              1,
              3,
              2,
              0,
              5,
              4
            ],
            "explanation": "Richtig: Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "fill_blank",
            "situation": "Ein Konflikt im Team eskaliert.",
            "question": "Konfliktlösung ___ Einfühlungsvermögen und Neutralität.",
            "options": [
              "erfordert",
              "Zeit",
              "brauche"
            ],
            "answer": "erfordert",
            "explanation": "Konfliktlösung erfordert Einfühlungsvermögen und Neutralität."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Kontext: Innovationsprozesse beschreiben.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Differenziert und nuanciert argumentieren.",
              "Das kann man so nicht sagen.",
              "Das entzieht sich meiner Kenntnis."
            ],
            "answer": 0,
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "quick_reaction",
            "situation": "Du diskutierst über Innovationsprozesse beschreiben.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "ziehen",
              "Das bedarf einer Analyse.",
              "Ich sehe mich außerstande dazu."
            ],
            "answer": 0,
            "explanation": "In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Es darauf hingewiesen dass sei",
              "Das ist vereinfacht dargestellt.",
              "Das wäre kontraproduktiv."
            ],
            "answer": 0,
            "explanation": "Richtig: Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ihren Einwand kann ich nachvollziehen, dennoch...",
              "Darüber lässt sich streiten.",
              "Das kann man so nicht sagen."
            ],
            "answer": 0,
            "explanation": "Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Ein Konflikt im Team eskaliert.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ich führe Einzelgespräche und vermittle neutral.",
              "Das wäre kontraproduktiv.",
              "Das würde den Rahmen sprengen."
            ],
            "answer": 0,
            "explanation": "Konfliktlösung erfordert Einfühlungsvermögen und Neutralität."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Differenziert und nuanciert argumentieren.",
        "context": "Kontext: Innovationsprozesse beschreiben"
      },
      {
        "de": "ziehen",
        "context": "Du diskutierst über Innovationsprozesse beschreiben"
      },
      {
        "de": "Es darauf hingewiesen dass sei",
        "context": "Du formulierst eine differenzierte Aussage"
      },
      {
        "de": "Ihren Einwand kann ich nachvollziehen, dennoch...",
        "context": "Jemand widerspricht deiner These"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Einfach formulieren.",
        "correct": "Differenziert und nuanciert argumentieren.",
        "tip": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
      },
      {
        "wrong": "nehmen",
        "correct": "ziehen",
        "tip": "In Betracht ziehen ist die korrekte Wendung."
      },
      {
        "wrong": "Das stimmt nicht.",
        "correct": "Ihren Einwand kann ich nachvollziehen, dennoch...",
        "tip": "Sachlich auf Einwände eingehen zeigt Kompetenz."
      }
    ]
  },
  {
    "id": "c1-39",
    "level": "C1",
    "title": "Gesellschaftskritik",
    "titleDe": "Gesellschaft kritisch betrachten",
    "icon": "🔍",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Kontext: Gesellschaft kritisch betrachten.",
            "question": "Wie drückst du dich angemessen aus?",
            "options": [
              "Differenziert und nuanciert argumentieren.",
              "Einfach formulieren.",
              "Nichts sagen."
            ],
            "answer": 0,
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "fill_blank",
            "situation": "Du diskutierst über Gesellschaft kritisch betrachten.",
            "question": "Man muss in Betracht ___, dass verschiedene Perspektiven existieren.",
            "options": [
              "ziehen",
              "nehmen",
              "bringen"
            ],
            "answer": "ziehen",
            "explanation": "In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "dass",
              "Es",
              "sei",
              "darauf",
              "hingewiesen"
            ],
            "answer": [
              1,
              3,
              4,
              0,
              2
            ],
            "explanation": "Richtig: Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Wie reagierst du?",
            "options": [
              "Ihren Einwand kann ich nachvollziehen, dennoch...",
              "Das stimmt nicht.",
              "Lassen Sie mich ausreden."
            ],
            "answer": 0,
            "explanation": "Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du musst eine kritische E-Mail schreiben.",
            "question": "Worauf achtest du?",
            "options": [
              "Sachlich bleiben und konstruktive Lösungen vorschlagen.",
              "Meine Frustration ausdrücken.",
              "Kurz und direkt schreiben."
            ],
            "answer": 0,
            "explanation": "Professionelle E-Mails sind sachlich und lösungsorientiert."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Kontext: Gesellschaft kritisch betrachten.",
            "question": "Auf C1-Niveau wird differenzierte Ausdrucksweise ___.",
            "options": [
              "erwartet",
              "nehme",
              "wichtig"
            ],
            "answer": "erwartet",
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "sort_sentence",
            "situation": "Du diskutierst über Gesellschaft kritisch betrachten.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "ist",
              "Betracht",
              "ziehen",
              "die",
              "Wendung",
              "korrekte",
              "In"
            ],
            "answer": [
              6,
              1,
              2,
              0,
              3,
              5,
              4
            ],
            "explanation": "Richtig: In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Es sei darauf ___, dass...",
            "options": [
              "hingewiesen",
              "Hilfe",
              "Termin"
            ],
            "answer": "hingewiesen",
            "explanation": "Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Sachlich",
              "Einwände",
              "eingehen",
              "Kompetenz",
              "zeigt",
              "auf"
            ],
            "answer": [
              0,
              5,
              1,
              2,
              4,
              3
            ],
            "explanation": "Richtig: Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "fill_blank",
            "situation": "Du musst eine kritische E-Mail schreiben.",
            "question": "Professionelle E-Mails sind sachlich und ___.",
            "options": [
              "lösungsorientiert",
              "habe",
              "suche"
            ],
            "answer": "lösungsorientiert",
            "explanation": "Professionelle E-Mails sind sachlich und lösungsorientiert."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Kontext: Gesellschaft kritisch betrachten.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Differenziert und nuanciert argumentieren.",
              "Das bedarf einer Analyse.",
              "Das wäre kontraproduktiv."
            ],
            "answer": 0,
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "quick_reaction",
            "situation": "Du diskutierst über Gesellschaft kritisch betrachten.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "ziehen",
              "Das greift zu kurz.",
              "Ich sehe mich außerstande dazu."
            ],
            "answer": 0,
            "explanation": "In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Es darauf hingewiesen dass sei",
              "Das greift zu kurz.",
              "Ich sehe mich außerstande dazu."
            ],
            "answer": 0,
            "explanation": "Richtig: Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ihren Einwand kann ich nachvollziehen, dennoch...",
              "Das greift zu kurz.",
              "Das ist vereinfacht dargestellt."
            ],
            "answer": 0,
            "explanation": "Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du musst eine kritische E-Mail schreiben.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Sachlich bleiben und konstruktive Lösungen vorschlagen.",
              "Darüber lässt sich streiten.",
              "Ich sehe mich außerstande dazu."
            ],
            "answer": 0,
            "explanation": "Professionelle E-Mails sind sachlich und lösungsorientiert."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Differenziert und nuanciert argumentieren.",
        "context": "Kontext: Gesellschaft kritisch betrachten"
      },
      {
        "de": "ziehen",
        "context": "Du diskutierst über Gesellschaft kritisch betrachten"
      },
      {
        "de": "Es darauf hingewiesen dass sei",
        "context": "Du formulierst eine differenzierte Aussage"
      },
      {
        "de": "Ihren Einwand kann ich nachvollziehen, dennoch...",
        "context": "Jemand widerspricht deiner These"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Einfach formulieren.",
        "correct": "Differenziert und nuanciert argumentieren.",
        "tip": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
      },
      {
        "wrong": "nehmen",
        "correct": "ziehen",
        "tip": "In Betracht ziehen ist die korrekte Wendung."
      },
      {
        "wrong": "Das stimmt nicht.",
        "correct": "Ihren Einwand kann ich nachvollziehen, dennoch...",
        "tip": "Sachlich auf Einwände eingehen zeigt Kompetenz."
      }
    ]
  },
  {
    "id": "c1-40",
    "level": "C1",
    "title": "Zukunftsvisionen",
    "titleDe": "Zukunftsvisionen formulieren",
    "icon": "🔮",
    "premium": true,
    "stages": [
      {
        "label": "Grundlagen",
        "exercises": [
          {
            "type": "multiple_choice",
            "situation": "Kontext: Zukunftsvisionen formulieren.",
            "question": "Wie drückst du dich angemessen aus?",
            "options": [
              "Differenziert und nuanciert argumentieren.",
              "Einfach formulieren.",
              "Nichts sagen."
            ],
            "answer": 0,
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "fill_blank",
            "situation": "Du diskutierst über Zukunftsvisionen formulieren.",
            "question": "Man muss in Betracht ___, dass verschiedene Perspektiven existieren.",
            "options": [
              "ziehen",
              "nehmen",
              "bringen"
            ],
            "answer": "ziehen",
            "explanation": "In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "sort_sentence",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "dass",
              "Es",
              "sei",
              "darauf",
              "hingewiesen"
            ],
            "answer": [
              1,
              3,
              4,
              0,
              2
            ],
            "explanation": "Richtig: Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Wie reagierst du?",
            "options": [
              "Ihren Einwand kann ich nachvollziehen, dennoch...",
              "Das stimmt nicht.",
              "Lassen Sie mich ausreden."
            ],
            "answer": 0,
            "explanation": "Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du wirst um eine Einschätzung gebeten.",
            "question": "Wie formulierst du diplomatisch?",
            "options": [
              "Meiner Einschätzung nach wäre es ratsam, alternative Ansätze zu prüfen.",
              "Das ist falsch.",
              "Mir fehlt die Zeit dafür."
            ],
            "answer": 0,
            "explanation": "Diplomatische Formulierungen sind auf C1-Niveau essentiell."
          }
        ]
      },
      {
        "label": "Anwendung",
        "exercises": [
          {
            "type": "fill_blank",
            "situation": "Kontext: Zukunftsvisionen formulieren.",
            "question": "Auf C1-Niveau wird differenzierte Ausdrucksweise ___.",
            "options": [
              "erwartet",
              "suche",
              "nötig"
            ],
            "answer": "erwartet",
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "sort_sentence",
            "situation": "Du diskutierst über Zukunftsvisionen formulieren.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "In",
              "korrekte",
              "Betracht",
              "ist",
              "ziehen",
              "die",
              "Wendung"
            ],
            "answer": [
              0,
              2,
              4,
              3,
              5,
              1,
              6
            ],
            "explanation": "Richtig: In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "fill_blank",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Es sei ___ hingewiesen, dass...",
            "options": [
              "darauf",
              "sofort",
              "Lösung"
            ],
            "answer": "darauf",
            "explanation": "Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "sort_sentence",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Bringe den Satz in die richtige Reihenfolge:",
            "options": [
              "Einwände",
              "zeigt",
              "auf",
              "Sachlich",
              "Kompetenz",
              "eingehen"
            ],
            "answer": [
              3,
              2,
              0,
              5,
              1,
              4
            ],
            "explanation": "Richtig: Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "fill_blank",
            "situation": "Du wirst um eine Einschätzung gebeten.",
            "question": "Diplomatische Formulierungen sind ___ C1-Niveau essentiell.",
            "options": [
              "auf",
              "muss",
              "Geld"
            ],
            "answer": "auf",
            "explanation": "Diplomatische Formulierungen sind auf C1-Niveau essentiell."
          }
        ]
      },
      {
        "label": "Realität",
        "exercises": [
          {
            "type": "quick_reaction",
            "situation": "Kontext: Zukunftsvisionen formulieren.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Differenziert und nuanciert argumentieren.",
              "Das kann man so nicht sagen.",
              "Ich möchte mich nicht äußern."
            ],
            "answer": 0,
            "explanation": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
          },
          {
            "type": "quick_reaction",
            "situation": "Du diskutierst über Zukunftsvisionen formulieren.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "ziehen",
              "Das kann man so nicht sagen.",
              "Ich möchte mich nicht äußern."
            ],
            "answer": 0,
            "explanation": "In Betracht ziehen ist die korrekte Wendung."
          },
          {
            "type": "quick_reaction",
            "situation": "Du formulierst eine differenzierte Aussage.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Es darauf hingewiesen dass sei",
              "Darüber lässt sich streiten.",
              "Das wäre kontraproduktiv."
            ],
            "answer": 0,
            "explanation": "Richtig: Es sei darauf hingewiesen, dass..."
          },
          {
            "type": "quick_reaction",
            "situation": "Jemand widerspricht deiner These.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Ihren Einwand kann ich nachvollziehen, dennoch...",
              "Darüber lässt sich streiten.",
              "Das greift zu kurz."
            ],
            "answer": 0,
            "explanation": "Sachlich auf Einwände eingehen zeigt Kompetenz."
          },
          {
            "type": "quick_reaction",
            "situation": "Du wirst um eine Einschätzung gebeten.",
            "question": "Wie reagierst du richtig?",
            "options": [
              "Meiner Einschätzung nach wäre es ratsam, alternative Ansätze zu prüfen.",
              "Das greift zu kurz.",
              "Das entzieht sich meiner Kenntnis."
            ],
            "answer": 0,
            "explanation": "Diplomatische Formulierungen sind auf C1-Niveau essentiell."
          }
        ]
      }
    ],
    "importantPhrases": [
      {
        "de": "Differenziert und nuanciert argumentieren.",
        "context": "Kontext: Zukunftsvisionen formulieren"
      },
      {
        "de": "ziehen",
        "context": "Du diskutierst über Zukunftsvisionen formulieren"
      },
      {
        "de": "Es darauf hingewiesen dass sei",
        "context": "Du formulierst eine differenzierte Aussage"
      },
      {
        "de": "Ihren Einwand kann ich nachvollziehen, dennoch...",
        "context": "Jemand widerspricht deiner These"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Einfach formulieren.",
        "correct": "Differenziert und nuanciert argumentieren.",
        "tip": "Auf C1-Niveau wird differenzierte Ausdrucksweise erwartet."
      },
      {
        "wrong": "nehmen",
        "correct": "ziehen",
        "tip": "In Betracht ziehen ist die korrekte Wendung."
      },
      {
        "wrong": "Das stimmt nicht.",
        "correct": "Ihren Einwand kann ich nachvollziehen, dennoch...",
        "tip": "Sachlich auf Einwände eingehen zeigt Kompetenz."
      }
    ]
  }
];
