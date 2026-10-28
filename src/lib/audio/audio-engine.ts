/**
 * Shared audio engine helpers for BalkanLink Deutsch (legacy + pilot lessons).
 * Pure functions + one module-level "current playback" registry so that only one
 * sound plays at a time across all useTTS instances.
 */
import { TTS_CONFIG } from "@/config/ttsConfig";

/** Existing configured voice (Laura). Used for every line unless a lesson maps a speaker. */
export const DEFAULT_VOICE_ID = TTS_CONFIG.voiceId;

/**
 * Second voice for dialogue speaker separation. ElevenLabs premade "George".
 * NOT verified by listening; generated lazily only when a user taps a mapped line.
 */
export const SECOND_VOICE_ID = "JBFqnCBsd6RMkjVDRZzb";

/** Client allowlist — the app never requests any other voice. */
export const ALLOWED_VOICE_IDS = [DEFAULT_VOICE_ID, SECOND_VOICE_ID] as const;

export type SpeedMode = "normal" | "slow";
/** Client-side playback rates; no extra generation for slow mode. */
export const SPEED_RATES: Record<SpeedMode, number> = { normal: 1.0, slow: 0.75 };

export function resolveVoice(voiceId?: string): string {
  return voiceId && (ALLOWED_VOICE_IDS as readonly string[]).includes(voiceId) ? voiceId : DEFAULT_VOICE_ID;
}

/** Exact identity mirrored from the server cache (text|voice|model); settings are fixed in config. */
export function audioCacheIdentity(text: string, voiceId?: string): string {
  return `${text.trim().slice(0, TTS_CONFIG.maxTextLength)}|${resolveVoice(voiceId)}|${TTS_CONFIG.modelId}`;
}

/**
 * Guard: never send personal-looking content to the TTS service / public cache.
 * Lesson texts are static and fictional; this blocks e-mails, IBANs and long digit runs
 * in case a caller ever passes user-typed text.
 */
export function looksPersonal(text: string): boolean {
  const t = text.replace(/\s+/g, " ");
  if (/[^\s@]+@[^\s@]+\.[a-z]{2,}/i.test(t)) return true;
  if (/\b[A-Z]{2}\d{2}(?: ?[A-Z0-9]{4}){3,}/.test(t)) return true; // IBAN-like
  if (/\d[\d ./-]{8,}\d/.test(t.replace(/\b\d{1,3}(\.\d{3})+\b/g, ""))) return true; // phone/ID-like (ignores 1.300)
  return false;
}

/** Map dialogue speakers to voices: first speaker → default, second → second voice. */
export function speakerVoices(speakers: string[]): Record<string, string> {
  const unique = [...new Set(speakers)];
  return Object.fromEntries(unique.map((s, i) => [s, i % 2 === 0 ? DEFAULT_VOICE_ID : SECOND_VOICE_ID]));
}

/* ── single-playback registry ── */
let currentStop: (() => void) | null = null;
export function claimPlayback(stop: () => void) {
  if (currentStop && currentStop !== stop) currentStop();
  currentStop = stop;
}
export function releasePlayback(stop: () => void) {
  if (currentStop === stop) currentStop = null;
}
export function stopAllPlayback() {
  const s = currentStop; currentStop = null; s?.();
}
