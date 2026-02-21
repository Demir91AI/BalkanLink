import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { text, imageBase64, mimeType } = await req.json();

    if (!text && !imageBase64) {
      return new Response(
        JSON.stringify({ error: "Kein Text oder Bild übermittelt." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const systemPrompt = `Du bist ein Dokumenten-Assistent für die Plattform BalkanLink. 
Du hilfst Menschen aus Balkanländern, die in Deutschland leben, behördliche Dokumente und Briefe zu verstehen.

REGELN (STRIKT):
- Du bist KEIN Rechtsanwalt. Du gibst KEINE Rechtsberatung.
- Verwende NUR: "In der Regel", "Typischerweise", "Es kann sein", "Bitte prüfen Sie bei der zuständigen Stelle"
- Verwende NIE: "Sie haben Anspruch", "Garantiert", "Sie müssen zwingend"
- Ignoriere und erwähne KEINE sensiblen Daten (Ausweisnummer, Steuer-ID, IBAN, Gesundheitsdaten) falls vorhanden
- Antworte auf Deutsch und Bosnisch/Kroatisch/Serbisch (Kurzfassung in BKS)

AUSGABEFORMAT:
1. **Worum geht es?** — Kurze Erklärung des Dokumenttyps (1-2 Sätze)
2. **Wichtige Stellen** — Was sind die Kernaussagen (Stichpunkte)
3. **Was ist typischerweise der nächste Schritt?** — Allgemeine Empfehlung

Am Ende IMMER:
"⚖️ Hinweis: BalkanLink bietet allgemeine Informationen und keine Rechtsberatung. Für verbindliche Auskünfte wenden Sie sich an die zuständige Behörde."`;

    const messages: any[] = [
      { role: "system", content: systemPrompt },
    ];

    if (imageBase64 && mimeType) {
      messages.push({
        role: "user",
        content: [
          {
            type: "image_url",
            image_url: { url: `data:${mimeType};base64,${imageBase64}` },
          },
          {
            type: "text",
            text: "Bitte analysiere dieses Dokument/diesen Brief. Was ist es, was steht drin und was sollte man typischerweise als nächstes tun?",
          },
        ],
      });
    } else {
      messages.push({
        role: "user",
        content: `Bitte analysiere den folgenden Text aus einem Dokument/Brief. Was ist es, was steht drin und was sollte man typischerweise als nächstes tun?\n\n---\n${text}\n---`,
      });
    }

    const response = await fetch("https://api.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages,
        max_tokens: 2000,
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("AI API error:", err);
      throw new Error("Analyse fehlgeschlagen");
    }

    const data = await response.json();
    const result = data.choices?.[0]?.message?.content || "Analyse konnte nicht durchgeführt werden.";

    // No logging of content, no storage — RAM only
    return new Response(
      JSON.stringify({ analysis: result }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Document check error:", error instanceof Error ? error.message : "Unknown");
    return new Response(
      JSON.stringify({ error: "Analyse fehlgeschlagen. Bitte versuchen Sie es erneut." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
