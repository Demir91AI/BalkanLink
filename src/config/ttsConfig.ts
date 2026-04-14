/**
 * Centralized TTS configuration for the Sprachassistent.
 *
 * Provider: ElevenLabs (primary), Browser speechSynthesis (emergency fallback)
 * Edge Function: generate-tts (proxies ElevenLabs, caches in Supabase Storage)
 */

export const TTS_CONFIG = {
  /* ── Provider ── */
  provider: "elevenlabs" as const,
  fallbackProvider: "browser" as const,

  /* ── ElevenLabs settings ── */
  apiEndpoint: "https://api.elevenlabs.io/v1/text-to-speech",
  modelId: "eleven_multilingual_v2",
  voiceId: "FGY2WhTYpPnrIDTdsKH5", // Laura — warm soft female, natural for German
  stability: 0.5,
  similarityBoost: 0.75,
  style: 0.0,
  useSpeakerBoost: true,
  outputFormat: "mp3_44100_128",

  /* ── Infrastructure ── */
  cacheBucket: "tts-audio",
  edgeFunctionName: "generate-tts",
  fallbackEnabled: true,
  maxTextLength: 500,

  /* ── Playback ── */
  DEFAULT_SPEED: 1.0,
  SLOW_SPEED: 0.95,
  SPEED_OPTIONS: [0.5, 0.75, 1.0, 1.25, 1.5] as const,

  /* ── Browser fallback voice ── */
  VOICE_LANG: "de-DE",
  PREFERRED_VOICE_NAME: "",
  PITCH: 1.0,

  /* ── Storage ── */
  STORAGE_KEY: "balkanlink_tts_speed",
} as const;

export type TtsSpeed =
  | (typeof TTS_CONFIG.SPEED_OPTIONS)[number]
  | typeof TTS_CONFIG.DEFAULT_SPEED
  | typeof TTS_CONFIG.SLOW_SPEED;
