import { describe, expect, it, vi } from "vitest";
import { TTS_CONFIG } from "@/config/ttsConfig";
import {
  ALLOWED_VOICE_IDS, DEFAULT_VOICE_ID, SECOND_VOICE_ID, SPEED_RATES, audioCacheIdentity, claimPlayback,
  looksPersonal, releasePlayback, resolveVoice, speakerVoices, stopAllPlayback,
} from "./audio-engine";
import { A1_PILOT_LESSONS } from "@/lib/trainer/pilot/a1-pilot-lessons";

describe("audio engine", () => {
  it("keeps the existing configured voice/model as default", () => {
    expect(DEFAULT_VOICE_ID).toBe("FGY2WhTYpPnrIDTdsKH5");
    expect(TTS_CONFIG.modelId).toBe("eleven_multilingual_v2");
    expect(ALLOWED_VOICE_IDS).toHaveLength(2);
  });
  it("only allowlisted voices are ever requested", () => {
    expect(resolveVoice("evil-voice")).toBe(DEFAULT_VOICE_ID);
    expect(resolveVoice(SECOND_VOICE_ID)).toBe(SECOND_VOICE_ID);
    expect(resolveVoice(undefined)).toBe(DEFAULT_VOICE_ID);
  });
  it("cache identity = exact text|voice|model; slow speed does not change it", () => {
    const a = audioCacheIdentity(" Wie heißen Sie? ");
    expect(a).toBe(`Wie heißen Sie?|${DEFAULT_VOICE_ID}|eleven_multilingual_v2`);
    expect(audioCacheIdentity("Wie heißen Sie?", SECOND_VOICE_ID)).not.toBe(a);
    expect(SPEED_RATES).toEqual({ normal: 1, slow: 0.75 });
  });
  it("blocks personal-looking text but allows all pilot lesson lines", () => {
    expect(looksPersonal("maja@example.com")).toBe(true);
    expect(looksPersonal("DE89 3704 0044 0532 0130 00")).toBe(true);
    expect(looksPersonal("Meine Nummer ist 0151 23456789")).toBe(true);
    for (const l of A1_PILOT_LESSONS) for (const t of [...l.dialogue.map((d) => d.de), ...l.vocab.map((v) => v.de)]) expect(looksPersonal(t)).toBe(false);
  });
  it("assigns two distinct voices to the two speakers of each pilot dialogue", () => {
    for (const l of A1_PILOT_LESSONS) {
      const v = speakerVoices(l.dialogue.map((d) => d.speaker));
      expect(Object.keys(v)).toHaveLength(2);
      expect(new Set(Object.values(v)).size).toBe(2);
    }
  });
  it("only one playback at a time: a new claim stops the previous one", () => {
    const a = vi.fn(), b = vi.fn();
    claimPlayback(a); claimPlayback(b);
    expect(a).toHaveBeenCalledTimes(1); expect(b).not.toHaveBeenCalled();
    stopAllPlayback(); expect(b).toHaveBeenCalledTimes(1);
    releasePlayback(b);
  });
});
