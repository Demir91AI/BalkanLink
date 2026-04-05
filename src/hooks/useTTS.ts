import { useCallback, useRef, useEffect, useState } from "react";
import { toast } from "sonner";

function getSpeechSynthesis(): SpeechSynthesis | null {
  if (typeof window === "undefined") return null;
  try {
    return window.speechSynthesis ?? null;
  } catch {
    return null;
  }
}

function getBestGermanVoice(synth: SpeechSynthesis): SpeechSynthesisVoice | null {
  const voices = synth.getVoices();
  const german = voices.filter((v) => v.lang.startsWith("de"));
  if (german.length === 0) return null;

  const priority = [
    (v: SpeechSynthesisVoice) => /neural|wavenet/i.test(v.name),
    (v: SpeechSynthesisVoice) => /enhanced|premium/i.test(v.name),
    (v: SpeechSynthesisVoice) => /natural/i.test(v.name),
    (v: SpeechSynthesisVoice) => v.name === "Anna" || v.name === "Markus" || v.name === "Petra",
    (v: SpeechSynthesisVoice) => /google/i.test(v.name),
    (v: SpeechSynthesisVoice) => v.localService === true,
  ];

  for (const fn of priority) {
    const match = german.find(fn);
    if (match) return match;
  }
  return german[0];
}

type PlayState = "idle" | "playing" | "paused";

export function useTTS() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [playState, setPlayState] = useState<PlayState>("idle");
  const cachedVoice = useRef<SpeechSynthesisVoice | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const voicesReady = useRef(false);
  const initDone = useRef(false);

  // Initialize once in effect (safe for SSR & iframes)
  useEffect(() => {
    const synth = getSpeechSynthesis();
    synthRef.current = synth;
    if (!synth) return;

    const loadVoices = () => {
      const v = getBestGermanVoice(synth);
      cachedVoice.current = v;
      voicesReady.current = synth.getVoices().length > 0;
    };

    loadVoices();
    synth.addEventListener?.("voiceschanged", loadVoices);
    return () => {
      synth.removeEventListener?.("voiceschanged", loadVoices);
    };
  }, []);

  // Chrome requires the very first speechSynthesis.speak() to happen in a
  // trusted user-gesture context. We "prime" it on the first click anywhere.
  useEffect(() => {
    if (initDone.current) return;
    const prime = () => {
      const synth = synthRef.current;
      if (!synth) return;
      try {
        const u = new SpeechSynthesisUtterance("");
        u.volume = 0;
        u.rate = 10;
        synth.speak(u);
        synth.cancel();
      } catch { /* ignore */ }
      initDone.current = true;
      document.removeEventListener("click", prime, true);
    };
    document.addEventListener("click", prime, true);
    return () => document.removeEventListener("click", prime, true);
  }, []);

  const playNew = useCallback((id: string, text: string) => {
    const synth = synthRef.current;
    if (!synth) {
      toast.error("Dein Browser unterstützt keine Sprachausgabe.");
      return;
    }

    try {
      synth.cancel();
    } catch { /* ignore */ }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "de-DE";
    utterance.rate = 1.0;
    utterance.pitch = 0.95;
    utterance.volume = 1;

    // Try to use cached voice, otherwise let browser pick
    const voice = cachedVoice.current ?? getBestGermanVoice(synth);
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    }

    // Timeout fallback: if onstart doesn't fire within 2s, something is wrong
    let startFired = false;
    const timeout = setTimeout(() => {
      if (!startFired) {
        console.warn("[TTS] onstart did not fire within 2s — speech likely blocked");
        setActiveId(null);
        setPlayState("idle");
        toast.error("Audio konnte nicht gestartet werden. Versuche es erneut.");
      }
    }, 2000);

    utterance.onstart = () => {
      startFired = true;
      clearTimeout(timeout);
      setActiveId(id);
      setPlayState("playing");
    };

    utterance.onend = () => {
      clearTimeout(timeout);
      setActiveId(null);
      setPlayState("idle");
    };

    utterance.onerror = (e) => {
      clearTimeout(timeout);
      if (e.error === "interrupted" || e.error === "canceled") return;
      console.error("[TTS] error:", e.error);
      setActiveId(null);
      setPlayState("idle");
      toast.error("Sprachausgabe fehlgeschlagen.");
    };

    // Optimistically show playing state
    setActiveId(id);
    setPlayState("playing");

    // Android Chrome fix: needs small delay after cancel()
    const isAndroid = /android/i.test(navigator.userAgent);
    if (isAndroid) {
      setTimeout(() => {
        try { synth.speak(utterance); } catch {
          setActiveId(null);
          setPlayState("idle");
        }
      }, 150);
    } else {
      try {
        synth.speak(utterance);
      } catch {
        setActiveId(null);
        setPlayState("idle");
        toast.error("Sprachausgabe nicht verfügbar.");
      }
    }
  }, []);

  const toggle = useCallback(
    (id: string, text: string) => {
      const synth = synthRef.current;
      if (!synth) {
        toast.error("Dein Browser unterstützt keine Sprachausgabe.");
        return;
      }

      if (activeId === id && playState === "playing") {
        try { synth.pause(); } catch { /* ignore */ }
        setPlayState("paused");
        return;
      }

      if (activeId === id && playState === "paused") {
        try { synth.resume(); } catch { /* ignore */ }
        setPlayState("playing");
        return;
      }

      playNew(id, text);
    },
    [activeId, playState, playNew]
  );

  const stop = useCallback(() => {
    const synth = synthRef.current;
    if (synth) {
      try { synth.cancel(); } catch { /* ignore */ }
    }
    setActiveId(null);
    setPlayState("idle");
  }, []);

  return { toggle, stop, activeId, playState };
}
