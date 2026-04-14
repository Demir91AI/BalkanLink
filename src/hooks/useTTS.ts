import { useCallback, useRef, useEffect, useState } from "react";
import { toast } from "sonner";
import { TTS_CONFIG, type TtsSpeed } from "@/config/ttsConfig";

/* ── helpers ── */

function getSynth(): SpeechSynthesis | null {
  try { return window.speechSynthesis ?? null; } catch { return null; }
}

/** Cached voice ref — selected once, reused everywhere */
let _cachedVoice: SpeechSynthesisVoice | null = null;

function selectBestVoice(synth: SpeechSynthesis): SpeechSynthesisVoice | null {
  const voices = synth.getVoices();
  const de = voices.filter((v) => v.lang.startsWith("de"));
  if (!de.length) return null;

  // 1. User-preferred voice
  if (TTS_CONFIG.PREFERRED_VOICE_NAME) {
    const pref = de.find((v) => v.name === TTS_CONFIG.PREFERRED_VOICE_NAME);
    if (pref) return pref;
  }

  // 2. Known high-quality names
  const preferred = [
    "Google Deutsch", "Microsoft Conrad", "Microsoft Hedda",
    "Anna", "Helena", "Markus", "Google German",
  ];
  for (const name of preferred) {
    const v = de.find((voice) => voice.name.includes(name));
    if (v) return v;
  }

  // 3. Tiered fallback — prefer non-Google for naturalness
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

/** Preprocess German text for better TTS pronunciation */
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

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

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

/** Read persisted speed from localStorage */
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

export type SpeechRate = TtsSpeed;

export function useTTS() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [playState, setPlayState] = useState<PlayState>("idle");
  const [rate, setRateState] = useState<number>(getPersistedSpeed);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const setRate = useCallback((r: number) => {
    setRateState(r);
    try { localStorage.setItem(TTS_CONFIG.STORAGE_KEY, r.toString()); } catch { /* */ }
  }, []);

  // Init voice once
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
      audioRef.current?.pause();
      getSynth()?.cancel();
    };
  }, []);

  /* ── Method 1: Edge function (fallback) ── */
  const playViaEdge = useCallback(async (id: string, text: string): Promise<boolean> => {
    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/tts-speak`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
        },
        body: JSON.stringify({ text: preprocessGerman(text).slice(0, 200), lang: "de" }),
      });
      if (!res.ok) return false;
      const blob = await res.blob();
      if (blob.size < 100) return false;
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      applyAudioTuning(audio, rate);
      audioRef.current = audio;
      audio.onplay = () => { setActiveId(id); setPlayState("playing"); };
      audio.onended = () => {
        setTimeout(() => { setActiveId(null); setPlayState("idle"); URL.revokeObjectURL(url); }, 100);
      };
      audio.onerror = () => { setActiveId(null); setPlayState("idle"); URL.revokeObjectURL(url); };
      await new Promise((r) => setTimeout(r, 120));
      await audio.play();
      return true;
    } catch { return false; }
  }, [rate]);

  /* ── Method 2: Web Speech API (primary) ── */
  const playViaSpeechSynth = useCallback((id: string, text: string): boolean => {
    const synth = getSynth();
    if (!synth) return false;
    try { synth.cancel(); } catch { /* */ }

    const processedText = preprocessGerman(text);
    const u = new SpeechSynthesisUtterance(processedText);
    u.lang = TTS_CONFIG.VOICE_LANG;

    const applyVoiceAndSpeak = () => {
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

      const doSpeak = () => { try { synth.speak(u); } catch { /* */ } };
      setTimeout(doSpeak, 120);
    };

    if (synth.getVoices().length === 0) {
      synth.addEventListener("voiceschanged", applyVoiceAndSpeak, { once: true });
    } else {
      applyVoiceAndSpeak();
    }
    return true;
  }, [rate]);

  /* ── Play: Web Speech first, edge fallback ── */
  const playNew = useCallback(async (id: string, text: string) => {
    audioRef.current?.pause();
    try { getSynth()?.cancel(); } catch { /* */ }
    setActiveId(id);
    setPlayState("playing");

    const synthOk = playViaSpeechSynth(id, text);
    if (synthOk) return;

    const edgeOk = await playViaEdge(id, text);
    if (edgeOk) return;

    setActiveId(null);
    setPlayState("idle");
    toast.error("Audio konnte nicht abgespielt werden.");
  }, [playViaEdge, playViaSpeechSynth]);

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
    audioRef.current?.pause();
    try { getSynth()?.cancel(); } catch { /* */ }
    setActiveId(null);
    setPlayState("idle");
  }, []);

  return { toggle, stop, activeId, playState, rate, setRate, SPEED_OPTIONS: TTS_CONFIG.SPEED_OPTIONS };
}
