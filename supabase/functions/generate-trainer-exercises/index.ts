import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

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
    A1: `ODRASLI POČETNICI — Balkanci koji su NEDAVNO stigli u Njemačku.
Realne situacije: prva posjeta ljekaru, Anmeldung prijava, 
otvaranje bankovnog računa, kupovina u supermarketu, 
javni prijevoz (Bus/S-Bahn), razgovor sa stanodavcem, 
Apotheke, osnove na radnom mjestu, razumijevanje jednostavnih pisama.
Vokabular: Krankenkasse, Versicherungskarte, Rezept, Termin, 
Anmeldung, Personalausweis, IBAN, Gehalt, Miete, Nebenkosten.
ZABRANJENO: Pitanja za djecu, "Wie sagt man Hallo", 
brojevanje, bojanje, abeceda.`,

    A2: `ODRASLI — Balkanci koji nekoliko mjeseci žive u Njemačkoj.
Situacije: Jobcenter razgovor, Krankenkasse pitanja,
razumijevanje pisma od Finanzamt ili Jobcenter,
razgovor s komšijom (buka, parking, müll),
Nebenkostenabrechnung razumijevanje, traženje posla,
Kita prijava, reklamacija u prodavnici, razumijevanje ugovora,
telefon s Hausarztom za termin, prijevoz na posao.
Vokabular: Arbeitslosengeld, Kinderzuschlag, Heizkostenabrechnung,
Mietvertrag, Kündigung, Probezeit, Lebenslauf.`,

    B1: `SREDNJI NIVO — Balkanci godinu-dvije u Njemačkoj.
Situacije: Vorstellungsgespräch (razgovor za posao),
razumijevanje Arbeitsvertrag detalja, prigovor stanodavcu,
razgovor s Ausländerbehörde o produženju Aufenthaltstitel,
roditeljski sastanak u školi na njemačkom,
telefon s Versicherung za štetu, Elterngeld/Kindergeld prijava,
pisanje Kündigung, razumijevanje Abrechnung od Krankenkasse.
Gramatika: Konjunktiv II (würde/könnte/sollte), pasiv, 
Nebensätze, Relativsätze.`,

    B2: `NAPREDNI — Balkanci koji nekoliko godina žive u Njemačkoj.
Situacije: pregovori o Gehaltserhöhung, žalba na Jobcenter odluku,
razgovor s advokatom o Mietrecht, 
priprema Steuererklärung s Werbungskosten,
razgovor s bankom o Kredit ili Baufinanzierung,
Betriebsrat prava i dužnosti, složena medicinska dokumentacija,
Niederlassungserlaubnis procedura.
Gramatika: Passiv (Vorgangs/Zustandspassiv), indirekte Rede,
Nominalisierungen, dvosmislene strukture.`,

    C1: `VISOKI NIVO — Profesionalni Balkanci u Njemačkoj.
Situacije: poslovni pregovori na njemačkom,
Verwaltungsgericht ili Sozialgericht žalba,
stručna medicinska komunikacija, ugovorne klauzule,
akademski ili stručni tekst analiza,
HR razgovor za rukovodeću poziciju,
prezentacija pred klijentima na njemačkom.
Gramatika: idiomi, Genitivkonstruktionen, stručna terminologija,
precizne i nüansirane formulacije.`,

    C2: `MATERNJI NIVO — Bilingvalni ili dugogodišnji Balkanci.
Situacije: pravni dokumenti i tumačenje,
medicinska ekspertiza pisana forma, 
politička ili kulturna diskusija,
akademsko pisanje (Hausarbeit, Exposé),
stilistički zahtjevna korespondencija,
Redewendungen i idiomi u kontekstu,
složene retoričke strukture.`,
  };

  const stageGuide: Record<string, string> = {
    Grundlagen: `OSNOVE: Razumijevanje i prepoznavanje.
Zadaci: prepoznati ispravnu frazu, razumjeti situaciju, 
naučiti ključni vokabular iz konkretnog konteksta.
Težina: jasni scenariji, jedna ispravna opcija koja je 
logično tačna, druge opcije su očito netačne ali 
ne glupe — realistične pogreške koje stvarno radi Balkanci.`,

    Anwendung: `PRIMJENA: Aktivna upotreba u realnim situacijama.
Zadaci: tvoriti rečenice, birati ispravnu gramatičku formu,
primijeniti vokabular u novom kontekstu.
Težina: nekoliko mogućih opcija, zahtijeva razmišljanje 
o gramatici i leksiku istovremeno.`,

    Realitaet: `REALNOST: Spontana komunikacija pod pritiskom.
Zadaci: brze reakcije, razumijevanje neformalnog govora,
snalaženje u neiočekivanim situacijama.
Težina: realistični dijalozi, kulturni aspekti, 
situacije gdje pogrešan odgovor ima posljedice.`,
  };

  return `Ti si profesor njemačkog za odrasle Balkance koji žive u Njemačkoj.

NIVO STUDENTA: ${level}
${levelGuide[level] || levelGuide.B1}

FAZA UČENJA: ${stageGuide[stageType] || stageGuide.Grundlagen}

OBAVEZNA PRAVILA — kršenje nije dopušteno:
1. SVE situacije moraju biti REALNE za odrasle u Njemačkoj
2. NIKAD ne generiraj pitanja za djecu ili početnike (Hallo, Tschüss, Zahlen 1-10)
3. Svaki zadatak mora imati SPECIFIČNU situaciju (ne "Sie befinden sich irgendwo")
4. Pogrešne opcije moraju biti REALISTIČNE GREŠKE — ne apsurdne
5. explanation mora dati KORISTAN SAVJET za život u Njemačkoj
6. Ravnomjerno miješaj sva 4 tipa
7. SVAKI batch mora biti DRUGAČIJI — nikad iste situacije
8. sort_sentence: korisne, realne rečenice koje Balkanci zaista trebaju
9. fill_blank: rečenice iz stvarnih dokumenata ili razgovora
10. quick_reaction: situacije koje zahtijevaju brzu odluku

FORMAT — SAMO JSON array, bez ikakvog Markdowna:
[
  {
    "type": "multiple_choice",
    "situation": "Konkretna situacija u Njemačkoj (1-2 rečenice)",
    "question": "Pitanje na njemačkom",
    "options": ["opcija1", "opcija2", "opcija3"],
    "answer": 0,
    "explanation": "Zašto je ovo tačno + praktičan savjet za Balkance"
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
          question: "Poredaj rečenicu:",
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

    const subtopics: Record<string, string[]> = {
      A1: ["Arzttermin buchen","Krankenversicherung","Apotheke Rezept",
           "Anmeldung Bürgeramt","Bankkonto eröffnen","Supermarkt Reklamation",
           "Bus und Bahn","Wohnungsbesichtigung","Arbeitsvertrag Grundlagen",
           "Standesamt Dokumente","Post und Pakete","Telefon Kundenservice",
           "Jobcenter erste Kontakt","Steuer-ID beantragen","Nachbarn vorstellen"],
      A2: ["Jobcenter Gespräch","Krankenkasse Wechsel","Finanzamt Brief verstehen",
           "Mietvertrag Details","Vorstellungsgespräch vorbereiten",
           "Kita Anmeldung","Nebenkostenabrechnung","Kündigung schreiben",
           "Versicherung Schaden melden","Elterngeld beantragen",
           "Kindergeld Antrag","Schule Elternabend","Arzt Fachbegriffe",
           "Fahrkarte kaufen","Reklamation Kaufvertrag"],
      B1: ["Gehaltsverhandlung","Ausländerbehörde Termin","Aufenthaltstitel verlängern",
           "Betriebsrat Rechte","Arbeitsvertrag Konjunktiv","Mietmängel melden",
           "Steuerklasse wechseln","Krankenhaus Aufnahme","Rentenversicherung",
           "Arbeitslosengeld beantragen","Schule Zeugnis","Wohngeld Antrag",
           "Bürgergeld Anspruch","Sozialversicherung","Pflegeversicherung"],
      B2: ["Niederlassungserlaubnis","Steuererklärung Werbungskosten",
           "Arbeitsrecht Kündigung anfechten","Mietrecht Streit",
           "Kredit Verhandlung","Betriebsvereinbarung","Werkvertrag vs Arbeitsvertrag",
           "Rentenansprüche","Krankentagegeld","Elternzeit berechnen",
           "Schwerbehindertenausweis","Erbrecht Grundlagen","Insolvenz Verfahren",
           "Handelsregister","Gesellschaftsvertrag"],
      C1: ["Verwaltungsgericht Klage","Arbeitsgerichtsverfahren",
           "Unternehmensführung","Medizinische Gutachten","Steuerstrategie",
           "Immobilienkauf Vertrag","Gesellschaftsrecht","Markenschutz",
           "Arbeitsrecht Spezialfälle","Compliance und Datenschutz",
           "Insolvenzrecht","Erbschaftsteuer","Bilanzierung","Tarifvertrag","Betriebsverfassung"],
      C2: ["Rechtsdokumente analysieren","Wirtschaftssprache Nuancen",
           "Politische Rhetorik","Wissenschaftliches Schreiben",
           "Literarische Interpretation","Medizinische Fachsprache präzise",
           "Philosophische Argumentation","Stilistik und Register",
           "Historische Analyse","Journalistische Sprache",
           "Diplomatische Kommunikation","Akademische Debatte",
           "Sprachkritik","Redewendungen im Kontext","Ironie und Subtext"],
    };

    const levelSubs = subtopics[level] || subtopics["B1"];
    const randomSeed = Math.floor(Math.random() * 100000);
    const randomSubtopic = levelSubs[randomSeed % levelSubs.length];
    const variety = ["formal","informal","schriftlich","mündlich","Amt","Alltag"];
    const randomVariety = variety[randomSeed % variety.length];

    const userPrompt = `Generiraj točno ${actualCount} JEDINSTVENIH zadataka.

Tema: "${topic}"
Specifični fokus: ${randomSubtopic} (${randomVariety} kontekst)
Nivo: ${level}, Faza: ${stageType}
Seed za jedinstvenost: ${randomSeed}

VAŽNO:
- Svaki zadatak mora biti potpuno drugačiji scenario
- Situacije moraju biti KONKRETNE i SPECIFIČNE
- Nijedno pitanje za djecu ili trivijalne odgovore
- Sva 4 tipa ravnomjerno (${Math.ceil(actualCount/4)} od svakog)

Odgovori SAMO JSON arrayom bez ikakvog teksta ili Markdowna.`;

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
