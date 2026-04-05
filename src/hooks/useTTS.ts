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

type PlayState = "idle" | "playing" | "paused";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

const RATE_OPTIONS = [0.75, 1.0, 1.25, 1.5] as const;
export type SpeechRate = (typeof RATE_OPTIONS)[number];

export function useTTS() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [playState, setPlayState] = useState<PlayState>("idle");
  const [rate, setRate] = useState<SpeechRate>(1.25);
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
        body: JSON.stringify({ text: text.slice(0, 200), lang: "de" }),
      });

      if (!res.ok) return false;

      const blob = await res.blob();
      if (blob.size < 100) return false;

      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audioRef.current = audio;

      audio.onplay = () => { setActiveId(id); setPlayState("playing"); };
      audio.onended = () => { setActiveId(null); setPlayState("idle"); URL.revokeObjectURL(url); };
      audio.onerror = () => { setActiveId(null); setPlayState("idle"); URL.revokeObjectURL(url); };

      await audio.play();
      return true;
    } catch {
      return false;
    }
  }, []);

  /* ── Method 2: Web Speech API fallback ── */
  const playViaSpeechSynth = useCallback((id: string, text: string): boolean => {
    const synth = getSynth();
    if (!synth) return false;

    try { synth.cancel(); } catch { /* */ }

    const u = new SpeechSynthesisUtterance(text);
    u.lang = "de-DE";
    u.rate = 1.25;
    u.pitch = 0.95;
    u.volume = 1;

    const voice = cachedVoice.current;
    if (voice) { u.voice = voice; u.lang = voice.lang; }

    let started = false;
    const timeout = setTimeout(() => {
      if (!started) { setActiveId(null); setPlayState("idle"); }
    }, 2000);

    u.onstart = () => { started = true; clearTimeout(timeout); setActiveId(id); setPlayState("playing"); };
    u.onend = () => { clearTimeout(timeout); setActiveId(null); setPlayState("idle"); };
    u.onerror = (e) => {
      clearTimeout(timeout);
      if (e.error === "interrupted" || e.error === "canceled") return;
      setActiveId(null); setPlayState("idle");
    };

    try {
      synth.speak(u);
      return true;
    } catch {
      return false;
    }
  }, []);

  /* ── Play: try edge first, fallback to browser ── */
  const playNew = useCallback(async (id: string, text: string) => {
    // Stop anything playing
    audioRef.current?.pause();
    try { getSynth()?.cancel(); } catch { /* */ }

    setActiveId(id);
    setPlayState("playing");

    // Try edge function first
    const edgeOk = await playViaEdge(id, text);
    if (edgeOk) return;

    // Fallback to Web Speech API
    const synthOk = playViaSpeechSynth(id, text);
    if (synthOk) return;

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

  return { toggle, stop, activeId, playState };
}
