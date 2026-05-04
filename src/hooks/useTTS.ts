import { useCallback, useRef, useEffect, useState } from "react";
import { toast } from "sonner";
import { TTS_CONFIG, type TtsSpeed } from "@/config/ttsConfig";
import { getAudio, getDirectAudioUrl, type TTSSentence } from "@/services/ttsProvider";

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

type PlayState = "idle" | "playing" | "paused";

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

function isMobileStandalonePlayback(): boolean {
  // Only use the synchronous direct-stream path for true PWA standalone
  // installs (iOS home-screen / Android installed PWA). Regular mobile
  // browsers handle the async fetch → play() path fine and benefit from
  // the cached/processed audio URL → guarantees ElevenLabs voice instead
  // of falling back to the browser's Google/system voice.
  try {
    const standaloneMQ = window.matchMedia?.("(display-mode: standalone)")?.matches === true;
    const iosStandalone = "standalone" in navigator &&
      Boolean((navigator as Navigator & { standalone?: boolean }).standalone);
    return standaloneMQ || iosStandalone;
  } catch {
    return false;
  }
}

export type SpeechRate = TtsSpeed;

export function useTTS() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [playState, setPlayState] = useState<PlayState>("idle");
  const [rate, setRateState] = useState<number>(getPersistedSpeed);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current = null;
      }
      getSynth()?.cancel();
    };
  }, []);

  /* ── Play via ElevenLabs (Audio URL) ──
   * IMPORTANT for iOS PWA (standalone): the <audio> element MUST be created
   * synchronously inside the user gesture (the click), BEFORE any `await`.
   * Otherwise iOS WebKit drops the gesture activation and `play()` is rejected,
   * which silently falls back to the robotic browser speechSynthesis voice.
   */
  const playViaProvider = useCallback(async (id: string, text: string, forceFetch = false): Promise<boolean> => {
    // Stop any existing audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
    }

    // Create the Audio element NOW (still inside user gesture)
    const audio = new Audio();
    audio.preload = "auto";
    audio.crossOrigin = "anonymous";
    applyAudioTuning(audio, rate);
    audioRef.current = audio;

    audio.onplay = () => { setActiveId(id); setPlayState("playing"); };
    audio.onended = () => {
      setTimeout(() => { setActiveId(null); setPlayState("idle"); }, 100);
    };
    audio.onerror = () => {
      console.error(`[TTS] Playback error for ${id}`);
      setActiveId(null);
      setPlayState("idle");
    };

    const sentence: TTSSentence = { id, text: preprocessGerman(text) };
    if (!forceFetch && isMobileStandalonePlayback()) {
      const directUrl = getDirectAudioUrl(sentence);
      if (!directUrl) return false;

      try {
        // Assign src SYNCHRONOUSLY inside the user gesture, then call play().
        audio.src = directUrl;
        audio.load();
        const playPromise = audio.play();
        if (playPromise && typeof playPromise.then === "function") {
          await playPromise;
        }
        return true;
      } catch (err) {
        console.error("[TTS] Direct audio play error:", err);
        return false;
      }
    }

    // Prime the element with a silent play() call to keep the gesture alive on iOS PWA.
    const primingPlay = audio.play().catch(() => { /* expected — no source yet */ });

    // Now fetch the real audio URL (this is the async part)
    const audioUrl = await getAudio(sentence);

    // Wait for the priming attempt to settle so we don't race with .src assignment
    await primingPlay;

    if (!audioUrl) return false;
    if (audioRef.current !== audio) return false; // superseded by another play

    try {
      audio.src = audioUrl;
      audio.load();
      await audio.play();
      return true;
    } catch (err) {
      console.error("[TTS] Audio play error:", err);
      return false;
    }
  }, [rate]);

  /* ── Browser fallback (emergency only) ── */
  const playViaBrowserFallback = useCallback((id: string, text: string): boolean => {
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
    const timeout = setTimeout(() => {
      if (!started) { setActiveId(null); setPlayState("idle"); }
    }, 2000);

    u.onstart = () => { started = true; clearTimeout(timeout); setActiveId(id); setPlayState("playing"); };
    u.onend = () => { clearTimeout(timeout); setTimeout(() => { setActiveId(null); setPlayState("idle"); }, 100); };
    u.onerror = (e) => {
      clearTimeout(timeout);
      if (e.error === "interrupted" || e.error === "canceled") return;
      setActiveId(null); setPlayState("idle");
    };

    setTimeout(() => { try { synth.speak(u); } catch { /* */ } }, 120);
    return true;
  }, [rate]);

  /* ── Play: ElevenLabs first, browser fallback ── */
  const playNew = useCallback(async (id: string, text: string) => {
    // Stop everything
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
    }
    try { getSynth()?.cancel(); } catch { /* */ }

    setActiveId(id);
    setPlayState("playing");

    // Try ElevenLabs first (direct stream on PWA, fetched URL elsewhere)
    let providerOk = await playViaProvider(id, text);
    if (providerOk) return;

    // If direct-stream failed (PWA only), retry once with the regular fetched
    // URL path before falling back to the robotic browser/Google voice.
    if (isMobileStandalonePlayback()) {
      providerOk = await playViaProvider(id, text, true);
      if (providerOk) return;
    }

    // Browser fallback (robotic system voice — last resort)
    const fallbackOk = playViaBrowserFallback(id, text);
    if (fallbackOk) return;

    setActiveId(null);
    setPlayState("idle");
    toast.error("Audio konnte nicht abgespielt werden.");
  }, [playViaProvider, playViaBrowserFallback]);

  const toggle = useCallback(
    (id: string, text: string) => {
      if (activeId === id && playState === "playing") {
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
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
      audioRef.current = null;
    }
    try { getSynth()?.cancel(); } catch { /* */ }
    setActiveId(null);
    setPlayState("idle");
  }, []);

  return { toggle, stop, activeId, playState, rate, setRate, SPEED_OPTIONS: TTS_CONFIG.SPEED_OPTIONS };
}
