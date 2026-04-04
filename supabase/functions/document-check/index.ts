const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { text, imageBase64, mimeType } = await req.json();

    console.log("Request received:", {
      hasText: !!text,
      textLength: text?.length || 0,
      hasImage: !!imageBase64,
      mimeType: mimeType || "none",
      imageSize: imageBase64 ? Math.round(imageBase64.length / 1024) + "KB" : "none",
    });

    if (!text && !imageBase64) {
      return new Response(
        JSON.stringify({ success: false, errorCode: "EMPTY_INPUT", message: "Kein Text oder Bild uebermittelt." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY not configured");
      return new Response(
        JSON.stringify({ success: false, errorCode: "SERVER_ERROR", message: "Server-Konfigurationsfehler." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const systemPrompt = `Du bist ein Dokumenten-Assistent fuer die Plattform BalkanLink. 
Du hilfst Menschen aus Balkanlaendern, die in Deutschland leben, behoerdliche Dokumente und Briefe zu verstehen.

REGELN (STRIKT):
- Du bist KEIN Rechtsanwalt. Du gibst KEINE Rechtsberatung.
- Verwende NUR: "In der Regel", "Typischerweise", "Es kann sein", "Bitte pruefen Sie bei der zustaendigen Stelle"
- Verwende NIE: "Sie haben Anspruch", "Garantiert", "Sie muessen zwingend"
- Ignoriere und erwaehne KEINE sensiblen Daten (Ausweisnummer, Steuer-ID, IBAN, Gesundheitsdaten) falls vorhanden
- Antworte auf Deutsch und Bosnisch/Kroatisch/Serbisch (Kurzfassung in BKS)

AUSGABEFORMAT (verwende exakt diese Ueberschriften):
1. **Worum geht es?** -- Kurze Erklaerung des Dokumenttyps (1-2 Saetze)
2. **Wichtige Stellen** -- Was sind die Kernaussagen (Stichpunkte)
3. **Was ist typischerweise der naechste Schritt?** -- Allgemeine Empfehlung
4. **Kratki sazetak (BKS)** -- Kratko objasnjenje na bosanskom/hrvatskom/srpskom

Am Ende IMMER:
"Hinweis: BalkanLink bietet allgemeine Informationen und keine Rechtsberatung. Fuer verbindliche Auskuenfte wenden Sie sich an die zustaendige Behoerde."`;

    const messages: Array<{ role: string; content: string | Array<{ type: string; text?: string; image_url?: { url: string } }> }> = [
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
            text: "Bitte analysiere dieses Dokument/diesen Brief. Was ist es, was steht drin und was sollte man typischerweise als naechstes tun?",
          },
        ],
      });
    } else {
      messages.push({
        role: "user",
        content: `Bitte analysiere den folgenden Text aus einem Dokument/Brief. Was ist es, was steht drin und was sollte man typischerweise als naechstes tun?\n\n---\n${text}\n---`,
      });
    }

    console.log("Calling AI API...");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
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
      const errText = await response.text();
      console.error("AI API error:", response.status, errText);
      return new Response(
        JSON.stringify({ success: false, errorCode: "SERVER_ERROR", message: "Analyse fehlgeschlagen. Bitte versuchen Sie es erneut." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const result = data.choices?.[0]?.message?.content || "";

    if (!result) {
      console.error("Empty AI response");
      return new Response(
        JSON.stringify({ success: false, errorCode: "PARSING_FAILED", message: "Analyse konnte nicht durchgefuehrt werden." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Analysis completed successfully, length:", result.length);

    return new Response(
      JSON.stringify({ success: true, analysis: result }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Document check error:", error instanceof Error ? error.message : "Unknown");
    return new Response(
      JSON.stringify({ success: false, errorCode: "SERVER_ERROR", message: "Analyse fehlgeschlagen. Bitte versuchen Sie es erneut." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
