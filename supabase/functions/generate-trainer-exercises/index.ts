import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const EXERCISE_TYPES = [
  "multiple_choice",
  "sort_sentence",
  "fill_blank",
  "quick_reaction",
];

const MAX_PER_REQUEST = 15;

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function extractJsonArray(raw: string): unknown[] {
  let cleaned = raw
    .replace(/```json\s*/gi, "")
    .replace(/```\s*/g, "")
    .trim();

  const start = cleaned.indexOf("[");
  if (start === -1) {
    throw new Error("No JSON array found in response");
  }

  cleaned = cleaned.substring(start);

  cleaned = cleaned
    .replace(/,\s*}/g, "}")
    .replace(/,\s*]/g, "]")
    .replace(/[\x00-\x1F\x7F]/g, (ch) => (ch === "\n" || ch === "\t" ? ch : ""));

  try {
    const parsed = JSON.parse(cleaned);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    // Response likely truncated - try to repair.
  }

  const lastCompleteObj = cleaned.lastIndexOf("}");
  if (lastCompleteObj === -1) {
    throw new Error("No complete JSON object found");
  }

  let repaired = cleaned.substring(0, lastCompleteObj + 1);
  repaired = repaired.replace(/,\s*$/, "");

  if (!repaired.endsWith("]")) {
    repaired += "]";
  }

  try {
    const parsed = JSON.parse(repaired);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    const objects: unknown[] = [];
    const objRegex = /\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}/g;
    let match;

    while ((match = objRegex.exec(cleaned)) !== null) {
      try {
        objects.push(JSON.parse(match[0]));
      } catch {
        // Skip malformed object.
      }
    }

    if (objects.length > 0) return objects;
    throw new Error("Could not extract any valid exercises from response");
  }
}

function buildSystemPrompt(level: string, stageType: string): string {
  const levelGuide: Record<string, string> = {
    A1: "Sehr einfache Saetze, Grundwortschatz, kurze Strukturen. Themen: Begruessungen, Zahlen, Familie, Essen, Uhrzeit.",
    A2: "Einfache Alltagssaetze, etwas laengere Strukturen, haeufige Ausdruecke. Themen: Einkaufen, Reisen, Wohnung, Freizeit.",
    B1: "Mittlere Komplexitaet, zusammenhaengende Saetze, Konjunktiv II einfach, Nebensaetze. Echte Alltagssprache.",
    B2: "Komplexere Strukturen, Passiv, indirekte Rede, differenzierter Wortschatz. Berufliche und gesellschaftliche Themen.",
    C1: "Anspruchsvolle Sprache, idiomatische Wendungen, professionelle Formulierungen, Nuancen.",
    C2: "Muttersprachliches Niveau, Fachsprache, Redewendungen, praezise und stilistisch anspruchsvolle Ausdruecke.",
  };

  const stageGuide: Record<string, string> = {
    Grundlagen:
      "Basis-Verstaendnis: Vokabeln erkennen, einfache Saetze verstehen, Grundstrukturen ueben.",
    Anwendung:
      "Praktische Nutzung: Saetze bilden, Varianten ueben, Wissen anwenden in realistischen Kontexten.",
    Realitaet:
      "Echte Alltagssituationen: Dialoge, spontane Reaktionen, realistische Szenarien aus dem Leben in Deutschland.",
  };

  return `Du bist ein Deutsch-Uebungsgenerator fuer Niveau ${level}.
Sprachniveau: ${levelGuide[level] || levelGuide.B1}
Stufe: ${stageGuide[stageType] || stageGuide.Grundlagen}

Generiere Uebungen im JSON-Format. Jede Uebung hat:
- type: "multiple_choice" | "sort_sentence" | "fill_blank" | "quick_reaction"
- situation: Kontext auf Deutsch (1-2 Saetze)
- question: Frage auf Deutsch
- options: Array von Antwortmoeglichkeiten (3 Optionen fuer MC/QR/FB, 4-6 Woerter fuer sort_sentence)
- answer: Index (number) fuer MC/QR, Array von Indizes fuer sort_sentence, String fuer fill_blank
- explanation: Kurze Erklaerung auf Deutsch

Regeln:
- Mische die 4 Aufgabentypen gleichmaessig
- Fuer sort_sentence: options sind einzelne Woerter, answer ist Array der korrekten Reihenfolge als Indizes
- Fuer fill_blank: question enthaelt ___ als Luecke, answer ist der korrekte String aus options
- Fuer multiple_choice/quick_reaction: answer ist der Index (0-basiert) der korrekten Option
- Alle Inhalte muessen dem Niveau ${level} entsprechen
- Situationen muessen realistisch und relevant fuer das Leben in Deutschland sein
- Keine Wiederholungen

WICHTIG: Antworte NUR mit einem JSON-Array. Kein erklarender Text, keine Kommentare, nur das Array.`;
}

function buildFallbackExercises(topic: string, stageType: string, count: number) {
  const safeTopic = typeof topic === "string" && topic.trim() ? topic.trim() : "Alltag";
  const safeStage = typeof stageType === "string" && stageType.trim() ? stageType.trim() : "Grundlagen";

  return Array.from({ length: count }, (_, index) => {
    const taskNumber = index + 1;
    const baseSituation = `Thema ${safeTopic}. Aufgabe ${taskNumber}. Stufe ${safeStage}.`;

    switch (index % 4) {
      case 0:
        return {
          type: "multiple_choice",
          situation: `${baseSituation} Sie sprechen in einer alltaeglichen Situation ueber ${safeTopic}.`,
          question: "Welche Antwort passt am besten?",
          options: ["Guten Tag.", "Bis spaeter.", "Keine Ahnung."],
          answer: 0,
          explanation: "Eine einfache und passende Antwort ist 'Guten Tag.'.",
        };
      case 1:
        return {
          type: "sort_sentence",
          situation: `${baseSituation} Sie brauchen Hilfe in einer Situation zu ${safeTopic}.`,
          question: "Ordnen Sie die Woerter zu einem Satz:",
          options: ["Ich", "brauche", "heute", "Hilfe"],
          answer: [0, 1, 2, 3],
          explanation: "Der korrekte Satz ist 'Ich brauche heute Hilfe'.",
        };
      case 2:
        return {
          type: "fill_blank",
          situation: `${baseSituation} Sie antworten kurz und klar.`,
          question: "Ich brauche ____. ",
          options: ["Hilfe", "Schnee", "Ferien"],
          answer: "Hilfe",
          explanation: "In dieser Situation passt 'Hilfe' am besten.",
        };
      default:
        return {
          type: "quick_reaction",
          situation: `${baseSituation} Jemand stellt Ihnen eine einfache Frage.`,
          question: "Wie reagieren Sie passend?",
          options: ["Danke.", "Vielleicht spaeter.", "Ich weiss nicht."],
          answer: 0,
          explanation: "'Danke.' ist eine kurze und passende Reaktion.",
        };
    }
  });
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { level, topic, stageType, count = 10 } = await req.json();

    if (!level || !topic || !stageType) {
      return jsonResponse({ error: "level, topic, and stageType are required" }, 400);
    }

    const actualCount = Math.min(count, MAX_PER_REQUEST);
    const fallbackExercises = buildFallbackExercises(topic, stageType, actualCount);

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY missing, returning fallback exercises");
      return jsonResponse({ exercises: fallbackExercises, fallback: true });
    }

    const userPrompt = `Generiere genau ${actualCount} Uebungen zum Thema "${topic}" fuer Niveau ${level}, Stufe "${stageType}".
Mische die Typen: multiple_choice, sort_sentence, fill_blank, quick_reaction.
Antworte NUR mit einem JSON-Array, KEIN anderer Text.`;

    const models = [
      "google/gemini-2.5-flash",
      "google/gemini-2.5-flash-lite",
      "openai/gpt-5-mini",
    ];

    let response: Response | null = null;
    let lastError = "";

    for (const model of models) {
      for (let attempt = 0; attempt < 2; attempt++) {
        try {
          response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${LOVABLE_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model,
              messages: [
                { role: "system", content: buildSystemPrompt(level, stageType) },
                { role: "user", content: userPrompt },
              ],
            }),
          });

          if (response.ok) break;

          lastError = `${response.status} from ${model}`;
          console.error(`AI attempt failed: ${lastError}`);
          await response.text();
          response = null;

          if (attempt === 0) {
            await new Promise((resolve) => setTimeout(resolve, 1500));
          }
        } catch (err) {
          lastError = `fetch error for ${model}: ${err}`;
          console.error(lastError);
          response = null;
        }
      }

      if (response?.ok) break;
    }

    if (!response || !response.ok) {
      console.error("All AI models failed. Returning fallback exercises. Last error:", lastError);
      return jsonResponse({ exercises: fallbackExercises, fallback: true });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "[]";

    let exercises;
    try {
      exercises = extractJsonArray(content);
    } catch {
      console.error("Failed to parse exercises JSON. Returning fallback exercises.");
      return jsonResponse({ exercises: fallbackExercises, fallback: true });
    }

    const validated = (Array.isArray(exercises) ? exercises : []).filter(
      (ex: any) =>
        EXERCISE_TYPES.includes(ex.type) &&
        typeof ex.situation === "string" &&
        typeof ex.question === "string" &&
        Array.isArray(ex.options) &&
        ex.options.length >= 3 &&
        ex.answer !== undefined &&
        typeof ex.explanation === "string"
    );

    if (validated.length === 0) {
      console.error("AI returned no valid exercises. Returning fallback exercises.");
      return jsonResponse({ exercises: fallbackExercises, fallback: true });
    }

    return jsonResponse({ exercises: validated });
  } catch (e) {
    console.error("generate-trainer-exercises error, returning fallback exercises:", e);
    return jsonResponse({
      exercises: buildFallbackExercises("Alltag", "Grundlagen", Math.min(10, MAX_PER_REQUEST)),
      fallback: true,
    });
  }
});