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
    A1: `Nivo A1 — odrasli Balkanci koji su NEDAVNO stigli u Njemačku.
Teme: prva posjeta ljekaru, Anmeldung (prijava boravišta), 
otvaranje bankovnog računa, kupovina u supermarketu, 
javni prijevoz, razgovor sa stanodavcem, Apotheke, 
osnove na radnom mjestu, razumijevanje jednostavnih pisama.
Jezik: kratke ali ODRASLE rečenice. 
NIKADA ne pitaj dječija pitanja kao "Wie sagt man Hallo".`,

    A2: `Nivo A2 — Balkanci koji nekoliko mjeseci žive u Njemačkoj.
Teme: Jobcenter razgovor, Krankenkasse prijava, 
razumijevanje pisma od Finanzamt, razgovor s komšijom, 
Nebenkostenabrechnung, traženje posla, Kita, 
reklamacija u prodavnici, razumijevanje ugovora.
Jezik: Perfekt, modalni glagoli, složenije rečenice.`,

    B1: `Nivo B1 — Balkanci koji godinu-dvije žive u Njemačkoj.
Teme: razgovor za posao (Vorstellungsgespräch), 
razumijevanje Arbeitsvertrag, prigovor stanodavcu zbog kvara,
razgovor s Ausländerbehörde, roditeljski sastanak,
telefon s osiguravajućim društvom, Elterngeld/Kindergeld prijava,
Kündigung (otkaz).
Jezik: Konjunktiv II, pasiv, zavisne rečenice.`,

    B2: `Nivo B2 — Balkanci koji nekoliko godina žive u Njemačkoj.
Teme: pregovori o plati, žalba na odluku Jobcentera,
razgovor s advokatom o stanarskom pravu,
Steuererklärung, razgovor s bankom o kreditu,
Betriebsrat, medicinska dokumentacija,
složene birokratske procedure (Niederlassungserlaubnis).
Jezik: pasiv, indirektni govor, složene nominalizacije.`,

    C1: `Nivo C1 — visoko integrirani Balkanci ili profesionalci.
Teme: poslovni pregovori, pravne procedure,
složena medicinska komunikacija, akademski kontekst,
Verwaltungsgericht žalba, ugovorne klauzule,
stručni sastanci, prezentacije.
Jezik: idiomi, stručna terminologija, precizne formulacije.`,

    C2: `Nivo C2 — gotovo maternji nivo.
Teme: pravni dokumenti, medicinska ekspertiza,
politička diskusija, akademsko pisanje, stilistički 
zahtjevna komunikacija.
Jezik: Redewendungen, stilistika, izvornogovorni nivo.`,
  };

  const stageGuide: Record<string, string> = {
    Grundlagen: `OSNOVE: Prepoznavanje i razumijevanje ključnih pojmova.
Fokus: prepoznati ispravnu frazu, razumjeti situaciju, 
naučiti ključni vokabular iz konteksta.`,
    Anwendung: `PRIMJENA: Aktivna upotreba u realnim situacijama.
Fokus: tvoriti rečenice, birati ispravnu gramatičku formu,
primijeniti vokabular u novom kontekstu.`,
    Realitaet: `REALNOST: Spontana komunikacija u nepredviđenim situacijama.
Fokus: brze reakcije, neformalni govor,
snalaženje pod pritiskom komunikacije.`,
  };

  return `Ti si ekspert za podučavanje njemačkog odraslima 
koji dolaze sa Balkana i žive u Njemačkoj.

NIVO: ${level}
${levelGuide[level] || levelGuide.B1}

FAZA: ${stageGuide[stageType] || stageGuide.Grundlagen}

PRAVILA:
1. SVE situacije moraju biti REALNE za odrasle Balkance u Njemačkoj
2. NIKADA nemoj generisati dječija pitanja
3. Svaka situacija mora biti specifična i konkretna
4. Miješaj sva 4 tipa ravnomjerno
5. Objašnjenja trebaju biti korisna i informativna
6. Svaki batch mora imati RAZLIČITE situacije — ne ponavljaj
7. Zadaci moraju biti izazovni za odabrani nivo

FORMAT — striktno JSON array bez Markdown:
[
  {
    "type": "multiple_choice",
    "situation": "Konkretan opis situacije (1-2 rečenice)",
    "question": "Pitanje na njemačkom",
    "options": ["opcija1", "opcija2", "opcija3"],
    "answer": 0,
    "explanation": "Kratko objašnjenje + koristan savjet"
  }
]`;
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

    const randomSeed = Math.floor(Math.random() * 10000);
    const subtopics: Record<string, string[]> = {
      A1: ["Arztbesuch","Anmeldung","Supermarkt","Bank","Bus/Bahn",
           "Apotheke","Standesamt","Post","Nachbarn","Wohnung"],
      A2: ["Jobcenter","Krankenkasse","Finanzamt","Kita","Vertrag",
           "Reklamation","Telefon","Behörden","Wohnungssuche","Alltag"],
      B1: ["Vorstellungsgespräch","Arbeitsvertrag","Ausländerbehörde",
           "Elterngeld","Kündigung","Mietrecht","Versicherung","Schule"],
      B2: ["Gehaltsverhandlung","Steuererklärung","Niederlassungserlaubnis",
           "Rechtsstreit","Betriebsrat","Immobilien","Kredit","Verwaltung"],
      C1: ["Vertragsverhandlung","Medizinische Fachsprache","Verwaltungsgericht",
           "Unternehmensführung","Akademisches Schreiben","Fachkonferenz"],
      C2: ["Rechtsdokumente","Politische Analyse","Medizinische Expertise",
           "Wissenschaftlicher Diskurs","Stilistik","Redekunst"],
    };
    const levelSubtopics = subtopics[level] || subtopics["B1"];
    const randomSubtopic = levelSubtopics[randomSeed % levelSubtopics.length];

    const userPrompt = `Generiere genau ${actualCount} einzigartige Übungen 
zum Thema "${topic}" für Niveau ${level}, Stufe "${stageType}".
Unterthema für diese Batch: ${randomSubtopic} (seed: ${randomSeed}).
Wichtig: KEINE Wiederholungen, realistische Situationen für Erwachsene,
alle 4 Typen gleichmäßig, mindestens 2 sort_sentence.
Antworte NUR mit JSON-Array, ohne Markdown.`;

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