import { useCallback, useRef, useEffect, useState } from "react";
import { toast } from "sonner";

/* ── helpers ── */

function getSynth(): SpeechSynthesis | null {
  try { return window.speechSynthesis ?? null; } catch { return null; }
}

function getBestGermanVoice(synth: SpeechSynthesis): SpeechSynthesisVoice | null {
  const voices = synth.getVoices();
  const de = voices.filter((v) => v.lang.startsWith("de"));
  if (!de.length) return null;
  // Prefer known high-quality German voices by name
  const preferred = [
    'Google Deutsch', 'Microsoft Conrad', 'Microsoft Hedda',
    'Anna', 'Helena', 'Markus', 'Google German',
  ];
  for (const name of preferred) {
    const v = de.find((voice) => voice.name.includes(name));
    if (v) return v;
  }
  // Fallback tiers
  const tests: ((v: SpeechSynthesisVoice) => boolean)[] = [
    (v) => /neural|wavenet/i.test(v.name),
    (v) => /enhanced|premium/i.test(v.name),
    (v) => /natural/i.test(v.name),
    (v) => /google/i.test(v.name),
    (v) => v.localService,
  ];
  for (const fn of tests) { const m = de.find(fn); if (m) return m; }
  return de[0];
}

/** Preprocess German text for better TTS pronunciation */
function preprocessGerman(text: string): string {
  return text
    .replace(/z\.B\./gi, 'zum Beispiel')
    .replace(/bzw\./gi, 'beziehungsweise')
    .replace(/ca\./gi, 'circa')
    .replace(/d\.h\./gi, 'das heißt')
    .replace(/u\.a\./gi, 'unter anderem')
    .replace(/usw\./gi, 'und so weiter')
    .replace(/ggf\./gi, 'gegebenenfalls')
    .replace(/inkl\./gi, 'inklusive')
    .replace(/Nr\./gi, 'Nummer')
    .replace(/Dr\./gi, 'Doktor')
    .replace(/Prof\./gi, 'Professor')
    .replace(/€/g, ' Euro ')
    .replace(/%/g, ' Prozent ')
    .replace(/\s+/g, ' ')
    .trim();
}

type PlayState = "idle" | "playing" | "paused";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

const DEFAULT_RATE = 1.15;
const UNIFIED_PITCH = 0.95;

const RATE_OPTIONS = [0.75, 1, 1.25, 1.5] as const;
export type SpeechRate = (typeof RATE_OPTIONS)[number] | typeof DEFAULT_RATE;

function applyAudioTuning(audio: HTMLAudioElement, rate: number = DEFAULT_RATE) {
  audio.playbackRate = rate;

  const tunedAudio = audio as HTMLAudioElement & {
    mozPreservesPitch?: boolean;
    preservesPitch?: boolean;
    webkitPreservesPitch?: boolean;
  };

  tunedAudio.preservesPitch = true;
  tunedAudio.mozPreservesPitch = true;
  tunedAudio.webkitPreservesPitch = true;
}

export function useTTS() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [playState, setPlayState] = useState<PlayState>("idle");
  const [rate, setRate] = useState<SpeechRate>(DEFAULT_RATE);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const cachedVoice = useRef<SpeechSynthesisVoice | null>(null);

  // Cache voices
  useEffect(() => {
    const synth = getSynth();
    if (!synth) return;
    const load = () => { cachedVoice.current = getBestGermanVoice(synth); };
    load();
    synth.addEventListener?.("voiceschanged", load);
    return () => synth.removeEventListener?.("voiceschanged", load);
  }, []);

  // Stop any playing audio on unmount
  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      getSynth()?.cancel();
    };
  }, []);

  /* ── Method 1: Edge function (reliable, works everywhere) ── */
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
    } catch {
      return false;
    }
  }, [rate]);

  /* ── Method 2: Web Speech API fallback ── */
  const playViaSpeechSynth = useCallback((id: string, text: string): boolean => {
    const synth = getSynth();
    if (!synth) return false;

    try { synth.cancel(); } catch { /* */ }

    // Android Chrome fix: small delay after cancel() for stability
    const isAndroid = /android/i.test(navigator.userAgent);

    const processedText = preprocessGerman(text);
    const u = new SpeechSynthesisUtterance(processedText);
    u.lang = "de-DE";

    const applyVoiceAndSpeak = () => {
      const voice = cachedVoice.current ?? getBestGermanVoice(synth);
      if (voice) { u.voice = voice; u.lang = voice.lang; cachedVoice.current = voice; }
      u.rate = rate;
      u.pitch = UNIFIED_PITCH;
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
      // 120ms delay before playback to prevent harsh start
      setTimeout(doSpeak, 120);
    };

    // Fix mobile voice loading: voices load async on iOS/Android
    if (synth.getVoices().length === 0) {
      synth.addEventListener("voiceschanged", applyVoiceAndSpeak, { once: true });
    } else {
      applyVoiceAndSpeak();
    }

    return true;
  }, []);

  /* ── Play: try browser first so rate/pitch stay identical on desktop and mobile ── */
  const playNew = useCallback(async (id: string, text: string) => {
    // Stop anything playing
    audioRef.current?.pause();
    try { getSynth()?.cancel(); } catch { /* */ }

    setActiveId(id);
    setPlayState("playing");

    // Use Web Speech first because it supports explicit pitch tuning
    const synthOk = playViaSpeechSynth(id, text);
    if (synthOk) return;

    // Fallback to edge audio if browser speech is unavailable
    const edgeOk = await playViaEdge(id, text);
    if (edgeOk) return;

    // Both failed
    setActiveId(null);
    setPlayState("idle");
    toast.error("Audio konnte nicht abgespielt werden.");
  }, [playViaEdge, playViaSpeechSynth]);

  const toggle = useCallback(
    (id: string, text: string) => {
      // If same id is playing via Audio element, pause/resume it
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

  return { toggle, stop, activeId, playState, rate, setRate, RATE_OPTIONS };
}
