import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { reserveUsage, commitUsage, releaseUsage, type Reservation } from "../_shared/usage.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

async function sha256(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(hash)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function requestToPayload(req: Request) {
  if (req.method === "GET") {
    const url = new URL(req.url);
    return {
      text: url.searchParams.get("text") ?? "",
      voiceId: url.searchParams.get("voiceId") ?? undefined,
      stability: Number(url.searchParams.get("stability")) || undefined,
      similarityBoost: Number(url.searchParams.get("similarityBoost")) || undefined,
      format: url.searchParams.get("format") ?? undefined,
    };
  }

  return await req.json();
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // ── AUTH: require a valid user JWT (Authorization header or access_token query param) ──
    const reqUrl = new URL(req.url);
    const authHeader = req.headers.get("Authorization") || "";
    let token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
    if (!token) {
      token = reqUrl.searchParams.get("access_token") || "";
    }
    if (!token) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    let ttsUserId = "";
    {
      const supabaseUrlEnv = Deno.env.get("SUPABASE_URL")!;
      const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
      const authClient = createClient(supabaseUrlEnv, anonKey, {
        global: { headers: { Authorization: `Bearer ${token}` } },
      });
      const { data: claimsData, error: claimsErr } = await authClient.auth.getClaims(token);
      if (claimsErr || !claimsData?.claims?.sub) {
        return new Response(
          JSON.stringify({ error: "Unauthorized" }),
          { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      ttsUserId = claimsData.claims.sub as string;
    }

    const { text, voiceId, stability, similarityBoost, format } = await requestToPayload(req);

    // Validate input
    if (!text || typeof text !== "string" || text.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: "Text is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const cleanText = text.trim().slice(0, 500);
    const voice = voiceId || "pNInz6obpgDQGcFmaJgB"; // Adam
    const modelId = "eleven_multilingual_v2";
    const stab = stability ?? 0.5;
    const simBoost = similarityBoost ?? 0.75;

    // Generate cache key
    const cacheKey = await sha256(`${cleanText}|${voice}|${modelId}`);
    const storagePath = `tts/${cacheKey}.mp3`;

    // Init Supabase client with service role
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Check storage cache
    const { data: existingFile } = await supabase.storage
      .from("tts-audio")
      .createSignedUrl(storagePath, 86400);

    if (existingFile?.signedUrl) {
      // Verify the file actually exists by checking list
      const { data: listData } = await supabase.storage
        .from("tts-audio")
        .list("tts", { search: `${cacheKey}.mp3`, limit: 1 });

      if (listData && listData.length > 0) {
        if (format === "audio") {
          const { data: downloadData, error: downloadError } = await supabase.storage
            .from("tts-audio")
            .download(storagePath);

          if (!downloadError && downloadData) {
            return new Response(downloadData, {
              headers: {
                ...corsHeaders,
                "Content-Type": "audio/mpeg",
                "Cache-Control": "public, max-age=31536000, immutable",
              },
            });
          }
        }

        const { data: publicUrl } = supabase.storage
          .from("tts-audio")
          .getPublicUrl(storagePath);

        console.log(`[TTS] Storage cache hit: ${cacheKey}`);
        return new Response(
          JSON.stringify({ audioUrl: publicUrl.publicUrl, fromCache: true }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    // Call ElevenLabs API
    const apiKey = Deno.env.get("ELEVENLABS_API_KEY");
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "ElevenLabs API key not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Protective cap applies only to NEW generations; cached audio is always served.
    let ttsReservation: Reservation | null = null;
    try {
      ttsReservation = await reserveUsage(supabase, ttsUserId, "tts_generation");
    } catch (e) {
      console.error("[TTS] usage reserve error", e instanceof Error ? e.message : "unknown");
    }
    if (ttsReservation && !ttsReservation.ok) {
      return new Response(
        JSON.stringify({ error: "Daily audio limit reached", errorCode: "DAILY_CAP" }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`[TTS] Generating via ElevenLabs: ${cacheKey}`);
    const startTime = Date.now();

    const ttsResponse = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voice}?output_format=mp3_44100_128`,
      {
        method: "POST",
        headers: {
          "xi-api-key": apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: cleanText,
          model_id: modelId,
          voice_settings: {
            stability: stab,
            similarity_boost: simBoost,
            style: 0.0,
            use_speaker_boost: true,
          },
        }),
      }
    );

    if (!ttsResponse.ok) {
      await releaseUsage(supabase, ttsReservation);
      const errText = await ttsResponse.text();
      console.error(`[TTS] ElevenLabs error: ${ttsResponse.status} ${errText}`);
      return new Response(
        JSON.stringify({ error: "TTS generation failed", status: ttsResponse.status }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const audioBuffer = await ttsResponse.arrayBuffer();
    await commitUsage(supabase, ttsReservation);
    const elapsed = Date.now() - startTime;
    console.log(`[TTS] Generated in ${elapsed}ms: ${cacheKey}`);

    if (format === "audio") {
      supabase.storage
        .from("tts-audio")
        .upload(storagePath, audioBuffer.slice(0), {
          contentType: "audio/mpeg",
          upsert: true,
        })
        .then(({ error }) => {
          if (error) console.error(`[TTS] Upload error:`, error);
        });

      return new Response(audioBuffer, {
        headers: {
          ...corsHeaders,
          "Content-Type": "audio/mpeg",
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    }

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from("tts-audio")
      .upload(storagePath, audioBuffer, {
        contentType: "audio/mpeg",
        upsert: true,
      });

    if (uploadError) {
      console.error(`[TTS] Upload error:`, uploadError);
      // Still return the audio even if caching fails
    }

    const { data: publicUrl } = supabase.storage
      .from("tts-audio")
      .getPublicUrl(storagePath);

    return new Response(
      JSON.stringify({ audioUrl: publicUrl.publicUrl, fromCache: false }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("[TTS] Error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
