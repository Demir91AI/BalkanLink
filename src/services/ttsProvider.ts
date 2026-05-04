/**
 * TTS Provider — fetches audio URLs from the generate-tts edge function.
 * In-memory session cache + duplicate request guard.
 * Browser speechSynthesis is NOT handled here — only in useTTS hook as fallback.
 */

import { TTS_CONFIG } from "@/config/ttsConfig";

export interface TTSSentence {
  id: string;
  text: string;
  audioUrl?: string | null;
  audioStatus?: "ready" | "pending" | "failed";
}

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

/** In-memory session cache: sentence identity → audioUrl */
const sessionCache = new Map<string, string>();

/** Pending requests guard: sentence identity → Promise */
const pendingRequests = new Map<string, Promise<string | null>>();

function sentenceCacheKey(sentence: TTSSentence): string {
  return `${sentence.id}|${TTS_CONFIG.voiceId}|${sentence.text.trim()}`;
}

export function getCachedAudioUrl(sentence: TTSSentence): string | null {
  return sessionCache.get(sentenceCacheKey(sentence)) ?? null;
}

/**
 * Fetch audio URL for a sentence.
 * 1. Check session cache
 * 2. If sentence already has audioUrl → cache & return
 * 3. Call edge function → cache & return
 * 4. On error → return null (caller should trigger browser fallback)
 */
export async function getAudio(sentence: TTSSentence): Promise<string | null> {
  const cacheKey = sentenceCacheKey(sentence);

  // 1. Session cache hit
  const cached = sessionCache.get(cacheKey);
  if (cached) {
    console.log(`[TTS] Session cache hit: ${sentence.id}`);
    return cached;
  }

  // 2. Pre-existing audioUrl
  if (sentence.audioUrl && sentence.audioStatus === "ready") {
    sessionCache.set(cacheKey, sentence.audioUrl);
    return sentence.audioUrl;
  }

  // 3. Duplicate request guard
  const pending = pendingRequests.get(cacheKey);
  if (pending) {
    console.log(`[TTS] Reusing pending request: ${sentence.id}`);
    return pending;
  }

  // 4. Fetch from edge function
  const promise = fetchFromEdge(sentence);
  pendingRequests.set(cacheKey, promise);

  try {
    const url = await promise;
    return url;
  } finally {
    pendingRequests.delete(cacheKey);
  }
}

/**
 * Direct audio endpoint for mobile/PWA playback.
 * The URL is assigned to <audio>.src inside the tap handler, so mobile WebViews
 * keep the user gesture while the backend generates/streams the MP3.
 */
export function getDirectAudioUrl(sentence: TTSSentence): string | null {
  const text = sentence.text.trim().slice(0, TTS_CONFIG.maxTextLength);
  if (!text || !SUPABASE_URL) return null;

  const params = new URLSearchParams({
    text,
    voiceId: TTS_CONFIG.voiceId,
    stability: String(TTS_CONFIG.stability),
    similarityBoost: String(TTS_CONFIG.similarityBoost),
    format: "audio",
    // apikey in query — <audio>.src cannot send headers, but Supabase
    // edge functions require either the JWT header or this query param.
    apikey: SUPABASE_KEY,
  });

  return `${SUPABASE_URL}/functions/v1/${TTS_CONFIG.edgeFunctionName}?${params.toString()}`;
}

async function fetchFromEdge(sentence: TTSSentence): Promise<string | null> {
  try {
    const text = sentence.text.trim().slice(0, TTS_CONFIG.maxTextLength);
    if (!text) return null;

    console.log(`[TTS] Requesting from edge function: ${sentence.id}`);
    const startTime = Date.now();

    const res = await fetch(
      `${SUPABASE_URL}/functions/v1/${TTS_CONFIG.edgeFunctionName}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
        },
        body: JSON.stringify({
          text,
          voiceId: TTS_CONFIG.voiceId,
          stability: TTS_CONFIG.stability,
          similarityBoost: TTS_CONFIG.similarityBoost,
        }),
      }
    );

    if (!res.ok) {
      console.error(`[TTS] Edge function error: ${res.status}`);
      return null;
    }

    const data = await res.json();
    const elapsed = Date.now() - startTime;

    if (data.audioUrl) {
      console.log(
        `[TTS] ${data.fromCache ? "Storage cache hit" : "Generated"} in ${elapsed}ms: ${sentence.id}`
      );
      sessionCache.set(sentenceCacheKey(sentence), data.audioUrl);
      return data.audioUrl;
    }

    return null;
  } catch (err) {
    console.error(`[TTS] Fetch error:`, err);
    return null;
  }
}

/**
 * Fire-and-forget preload for upcoming sentences.
 */
export function preload(sentences: TTSSentence[]): void {
  for (const s of sentences.slice(0, 2)) {
    const cacheKey = sentenceCacheKey(s);
    if (!sessionCache.has(cacheKey) && !pendingRequests.has(cacheKey)) {
      getAudio(s).catch(() => {});
    }
  }
}

/**
 * Remove a cached entry (e.g. if audio was corrupt).
 */
export function invalidateCache(sentenceId: string): void {
  for (const key of sessionCache.keys()) {
    if (key.startsWith(`${sentenceId}|`)) sessionCache.delete(key);
  }
}
