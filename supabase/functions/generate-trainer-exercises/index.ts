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

  // Fix common issues before parsing
  cleaned = cleaned
    .replace(/,\s*}/g, "}")
    .replace(/,\s*]/g, "]")
    .replace(/[\x00-\x1F\x7F]/g, (ch) => ch === "\n" || ch === "\t" ? ch : "");

  // Try direct parse first
  try {
    const parsed = JSON.parse(cleaned);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    // Response likely truncated - try to repair
  }

  // Attempt to repair truncated JSON by closing open structures
  // Find the last complete object (ends with })
  const lastCompleteObj = cleaned.lastIndexOf("}");
  if (lastCompleteObj === -1) {
    throw new Error("No complete JSON object found");
  }

  // Take everything up to and including the last complete }
  let repaired = cleaned.substring(0, lastCompleteObj + 1);

  // Remove any trailing comma after last object
  repaired = repaired.replace(/,\s*$/, "");

  // Close the array
  if (!repaired.endsWith("]")) {
    repaired += "]";
  }

  try {
    const parsed = JSON.parse(repaired);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    // Last resort: extract individual objects with regex
    const objects: unknown[] = [];
    const objRegex = /\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}/g;
    let match;
    while ((match = objRegex.exec(cleaned)) !== null) {
      try {
        objects.push(JSON.parse(match[0]));
      } catch {
        // skip malformed object
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

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { level, topic, stageType, count = 10 } = await req.json();

    if (!level || !topic || !stageType) {
      return new Response(
        JSON.stringify({ error: "level, topic, and stageType are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(
        JSON.stringify({ error: "LOVABLE_API_KEY is not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const actualCount = Math.min(count, MAX_PER_REQUEST);

    const userPrompt = `Generiere genau ${actualCount} Uebungen zum Thema "${topic}" fuer Niveau ${level}, Stufe "${stageType}".
Mische die Typen: multiple_choice, sort_sentence, fill_blank, quick_reaction.
Antworte NUR mit einem JSON-Array, KEIN anderer Text.`;

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            { role: "system", content: buildSystemPrompt(level, stageType) },
            { role: "user", content: userPrompt },
          ],
        }),
      }
    );

    if (!response.ok) {
      const status = response.status;
      if (status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required. Please add credits." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errText = await response.text();
      console.error("AI gateway error:", status, errText);
      return new Response(
        JSON.stringify({ error: "AI generation failed" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "[]";

    let exercises;
    try {
      exercises = extractJsonArray(content);
    } catch (e) {
      console.error("Failed to parse exercises JSON:", content.substring(0, 300));
      return new Response(
        JSON.stringify({ error: "Failed to parse generated exercises" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
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

    return new Response(JSON.stringify({ exercises: validated }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-trainer-exercises error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
