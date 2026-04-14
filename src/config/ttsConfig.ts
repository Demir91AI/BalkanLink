/**
 * Centralized TTS configuration for the Sprachassistent.
 *
 * AUDIT FINDINGS:
 * - Provider: Web Speech API (primary), Google Translate TTS edge function (fallback)
 * - Speed values were hardcoded in: src/hooks/useTTS.ts (UNIFIED_RATE, RATE_OPTIONS, UNIFIED_PITCH)
 * - Voice selection logic was in: src/hooks/useTTS.ts (getBestGermanVoice)
 * - SprachassistentSection.tsx consumed rate/setRate/RATE_OPTIONS from useTTS hook
 * - No other TTS providers (ElevenLabs/Azure) are in use
 */

export const TTS_CONFIG = {
  /** Standard playback speed — clear and slightly brisk */
  DEFAULT_SPEED: 1.0,
  /** Slow / natural playback speed */
  SLOW_SPEED: 0.95,
  /** All available speed options for the selector UI */
  SPEED_OPTIONS: [0.5, 0.75, 1.0, 1.25, 1.5] as const,
  /** BCP-47 voice language tag */
  VOICE_LANG: "de-DE",
  /** Preferred voice name (empty = auto-select best German voice) */
  PREFERRED_VOICE_NAME: "",
  /** Pitch — 1.0 is natural */
  PITCH: 1.0,
  /** localStorage key for persisted speed preference */
  STORAGE_KEY: "balkanlink_tts_speed",
} as const;

export type TtsSpeed = (typeof TTS_CONFIG.SPEED_OPTIONS)[number] | typeof TTS_CONFIG.DEFAULT_SPEED | typeof TTS_CONFIG.SLOW_SPEED;
