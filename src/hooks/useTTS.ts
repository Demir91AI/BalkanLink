import { useCallback, useRef, useEffect, useState } from "react";
import { toast } from "sonner";
import { TTS_CONFIG, type TtsSpeed } from "@/config/ttsConfig";
import { getAudio, getCachedAudioUrl, getDirectAudioUrl, type TTSSentence } from "@/services/ttsProvider";

/* ── helpers ── */

function getSynth(): SpeechSynthesis | null {
  try { return window.speechSynthesis ?? null; } catch { return null; }
}

let _cachedVoice: SpeechSynthesisVoice | null = null;

function selectBestVoice(synth: SpeechSynthesis): SpeechSynthesisVoice | null {
  const voices = synth.getVoices();
  const de = voices.filter((v) => v.lang.startsWith("de"));
  if (!de.length) return null;

  if (TTS_CONFIG.PREFERRED_VOICE_NAME) {
    const pref = de.find((v) => v.name === TTS_CONFIG.PREFERRED_VOICE_NAME);
    if (pref) return pref;
  }

  const preferred = [
    "Google Deutsch", "Microsoft Conrad", "Microsoft Hedda",
    "Anna", "Helena", "Markus", "Google German",
  ];
  for (const name of preferred) {
    const v = de.find((voice) => voice.name.includes(name));
    if (v) return v;
  }

  const tests: ((v: SpeechSynthesisVoice) => boolean)[] = [
    (v) => /neural|wavenet/i.test(v.name),
    (v) => /enhanced|premium/i.test(v.name),
    (v) => /natural/i.test(v.name),
    (v) => v.lang === TTS_CONFIG.VOICE_LANG && !v.name.toLowerCase().includes("google"),
    (v) => v.localService,
  ];
  for (const fn of tests) { const m = de.find(fn); if (m) return m; }
  return de[0];
}

function preprocessGerman(text: string): string {
  return text
    .replace(/z\.B\./gi, "zum Beispiel")
    .replace(/bzw\./gi, "beziehungsweise")
    .replace(/ca\./gi, "circa")
    .replace(/d\.h\./gi, "das heißt")
    .replace(/u\.a\./gi, "unter anderem")
    .replace(/usw\./gi, "und so weiter")
    .replace(/ggf\./gi, "gegebenenfalls")
    .replace(/inkl\./gi, "inklusive")
    .replace(/Nr\./gi, "Nummer")
    .replace(/Dr\./gi, "Doktor")
    .replace(/Prof\./gi, "Professor")
    .replace(/€/g, " Euro ")
    .replace(/%/g, " Prozent ")
    .replace(/\s+/g, " ")
    .trim();
}

type PlayState = "idle" | "loading" | "playing" | "paused";

function getPersistedSpeed(): number {
  try {
    const saved = localStorage.getItem(TTS_CONFIG.STORAGE_KEY);
    if (saved) {
      const parsed = parseFloat(saved);
      if (!isNaN(parsed) && parsed >= 0.5 && parsed <= 1.5) return parsed;
    }
  } catch { /* */ }
  return TTS_CONFIG.DEFAULT_SPEED;
}

function applyAudioTuning(audio: HTMLAudioElement, playbackRate: number) {
  audio.playbackRate = playbackRate;
  const tunedAudio = audio as HTMLAudioElement & {
    mozPreservesPitch?: boolean;
    preservesPitch?: boolean;
    webkitPreservesPitch?: boolean;
  };
  tunedAudio.preservesPitch = true;
  tunedAudio.mozPreservesPitch = true;
  tunedAudio.webkitPreservesPitch = true;
}

export type SpeechRate = TtsSpeed;

function resetAudioElement(audio: HTMLAudioElement | null) {
  if (!audio) return;
  audio.onplay = null;
  audio.onplaying = null;
  audio.onended = null;
  audio.onerror = null;
  try { audio.pause(); } catch { /* */ }
  try { audio.removeAttribute("src"); audio.load(); } catch { /* */ }
}

export function useTTS() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [playState, setPlayState] = useState<PlayState>("idle");
  const [rate, setRateState] = useState<number>(getPersistedSpeed);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const requestSeqRef = useRef(0);

  const setRate = useCallback((r: number) => {
    setRateState(r);
    try { localStorage.setItem(TTS_CONFIG.STORAGE_KEY, r.toString()); } catch { /* */ }
    // Apply to current audio immediately
    if (audioRef.current) {
      applyAudioTuning(audioRef.current, r);
    }
  }, []);

  // Init browser voice once (for fallback)
  useEffect(() => {
    const synth = getSynth();
    if (!synth) return;
    const load = () => { _cachedVoice = selectBestVoice(synth); };
    load();
    synth.addEventListener?.("voiceschanged", load);
    return () => synth.removeEventListener?.("voiceschanged", load);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      resetAudioElement(audioRef.current);
      audioRef.current = null;
      getSynth()?.cancel();
    };
  }, []);

  /* ── Browser fallback (emergency only) — declared first to avoid TDZ in provider ── */
  const playViaBrowserFallback = useCallback((requestId: number, id: string, text: string): boolean => {
    if (!TTS_CONFIG.fallbackEnabled) return false;

    const synth = getSynth();
    if (!synth) return false;

    console.warn("[TTS] Using browser fallback — ElevenLabs unavailable");

    try { synth.cancel(); } catch { /* */ }

    const processedText = preprocessGerman(text);
    const u = new SpeechSynthesisUtterance(processedText);
    u.lang = TTS_CONFIG.VOICE_LANG;

    const voice = _cachedVoice ?? selectBestVoice(synth);
    if (voice) { u.voice = voice; u.lang = voice.lang; _cachedVoice = voice; }
    u.rate = rate;
    u.pitch = TTS_CONFIG.PITCH;
    u.volume = 1.0;

    let started = false;
    const isCurrent = () => requestSeqRef.current === requestId;
    const timeout = setTimeout(() => {
      if (!started && isCurrent()) { setActiveId(null); setPlayState("idle"); }
    }, 2000);

    u.onstart = () => { if (!isCurrent()) return; started = true; clearTimeout(timeout); setActiveId(id); setPlayState("playing"); };
    u.onend = () => { clearTimeout(timeout); setTimeout(() => { if (isCurrent()) { setActiveId(null); setPlayState("idle"); } }, 100); };
    u.onerror = (e) => {
      clearTimeout(timeout);
      if (e.error === "interrupted" || e.error === "canceled") return;
      if (isCurrent()) { setActiveId(null); setPlayState("idle"); }
    };

    try { synth.speak(u); } catch { return false; }
    return true;
  }, [rate]);

  /* ── Play via ElevenLabs (Audio URL) ──
   * IMPORTANT for iOS PWA: <audio> must be created synchronously inside the
   * tap handler, BEFORE any await — otherwise WebKit drops user activation.
   * Note: NO crossOrigin="anonymous" — it forces strict CORS that mobile
   * browsers reject for our edge function, causing silent playback failures.
   */
  const playViaProvider = useCallback((requestId: number, id: string, text: string): boolean => {
    const sentence: TTSSentence = { id, text: preprocessGerman(text) };
    const cachedUrl = getCachedAudioUrl(sentence);
    const directUrl = cachedUrl ?? getDirectAudioUrl(sentence);
    if (!directUrl) return false;

    const audio = new Audio();
    audio.preload = "auto";
    applyAudioTuning(audio, rate);
    audioRef.current = audio;

    const isCurrent = () => requestSeqRef.current === requestId && audioRef.current === audio;

    audio.onplay = () => { if (isCurrent()) { setActiveId(id); setPlayState("playing"); } };
    audio.onplaying = () => { if (isCurrent()) { setActiveId(id); setPlayState("playing"); } };
    audio.onended = () => {
      setTimeout(() => { if (isCurrent()) { setActiveId(null); setPlayState("idle"); } }, 100);
    };
    audio.onerror = () => {
      if (!isCurrent()) return;
      console.error(`[TTS] Playback error for ${id}, falling back`);
      // Try browser TTS as last-resort
      const ok = playViaBrowserFallback(requestId, id, text);
      if (!ok && isCurrent()) {
        setActiveId(null);
        setPlayState("idle");
        toast.error("Audio konnte nicht abgespielt werden.");
      }
    };

    try {
      audio.src = directUrl;
      audio.load();
      const playPromise = audio.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch((err) => {
          if (!isCurrent()) return;
          console.error("[TTS] play() rejected:", err);
          // Fall back to browser TTS instead of just toasting
          const ok = playViaBrowserFallback(requestId, id, text);
          if (!ok && isCurrent()) {
            setActiveId(null);
            setPlayState("idle");
            toast.error("Audio konnte nicht abgespielt werden.");
          }
        });
      }
      return true;
    } catch (err) {
      console.error("[TTS] Direct audio setup error:", err);
      return false;
    }
  }, [rate, playViaBrowserFallback]);

  /* ── Play: ElevenLabs first, browser fallback ── */
  const playNew = useCallback((id: string, text: string) => {
    const requestId = requestSeqRef.current + 1;
    requestSeqRef.current = requestId;

    resetAudioElement(audioRef.current);
    try { getSynth()?.cancel(); } catch { /* */ }

    setActiveId(id);
    setPlayState("loading");

    const providerOk = playViaProvider(requestId, id, text);
    if (providerOk) return;

    // Browser fallback (robotic system voice — last resort)
    const fallbackOk = playViaBrowserFallback(requestId, id, text);
    if (fallbackOk) return;

    setActiveId(null);
    setPlayState("idle");
    toast.error("Audio konnte nicht abgespielt werden.");
  }, [playViaProvider, playViaBrowserFallback]);

  const toggle = useCallback(
    (id: string, text: string) => {
      if (activeId === id && playState === "loading") {
        requestSeqRef.current += 1;
        resetAudioElement(audioRef.current);
        audioRef.current = null;
        try { getSynth()?.cancel(); } catch { /* */ }
        setActiveId(null);
        setPlayState("idle");
        return;
      }

      if (activeId === id && (playState === "playing" || playState === "loading")) {
        if (audioRef.current && !audioRef.current.paused) {
          audioRef.current.pause();
          setPlayState("paused");
          return;
        }
        try { getSynth()?.pause(); } catch { /* */ }
        setPlayState("paused");
        return;
      }
      if (activeId === id && playState === "paused") {
        if (audioRef.current?.paused && audioRef.current.currentTime > 0) {
          audioRef.current.play();
          setPlayState("playing");
          return;
        }
        try { getSynth()?.resume(); } catch { /* */ }
        setPlayState("playing");
        return;
      }
      playNew(id, text);
    },
    [activeId, playState, playNew]
  );

  const stop = useCallback(() => {
    requestSeqRef.current += 1;
    resetAudioElement(audioRef.current);
    audioRef.current = null;
    try { getSynth()?.cancel(); } catch { /* */ }
    setActiveId(null);
    setPlayState("idle");
  }, []);

  return { toggle, stop, activeId, playState, rate, setRate, SPEED_OPTIONS: TTS_CONFIG.SPEED_OPTIONS };
}
