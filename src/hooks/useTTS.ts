import { useCallback, useRef, useEffect, useState } from "react";

function getBestGermanVoice(): SpeechSynthesisVoice | null {
  const voices = speechSynthesis.getVoices();
  const german = voices.filter((v) => v.lang.startsWith("de"));
  if (german.length === 0) return null;

  const preferred = german.find(
    (v) =>
      v.name.toLowerCase().includes("enhanced") ||
      v.name.toLowerCase().includes("premium") ||
      v.name.toLowerCase().includes("natural") ||
      v.name.toLowerCase().includes("neural") ||
      v.name.toLowerCase().includes("wavenet")
  );
  if (preferred) return preferred;

  const local = german.find((v) => v.localService);
  if (local) return local;

  return german[0];
}

type PlayState = "idle" | "playing" | "paused";

export function useTTS() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [playState, setPlayState] = useState<PlayState>("idle");
  const cachedVoice = useRef<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    const load = () => {
      cachedVoice.current = getBestGermanVoice();
    };
    load();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = load;
    }
  }, []);

  const playNew = useCallback((id: string, text: string) => {
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "de-DE";
    utterance.rate = 1.25;
    utterance.pitch = 1.0;
    utterance.volume = 1;

    const voice = cachedVoice.current ?? getBestGermanVoice();
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    }

    utterance.onstart = () => {
      setActiveId(id);
      setPlayState("playing");
    };
    utterance.onend = () => {
      setActiveId(null);
      setPlayState("idle");
    };
    utterance.onerror = () => {
      setActiveId(null);
      setPlayState("idle");
    };

    speechSynthesis.speak(utterance);
  }, []);

  const toggle = useCallback(
    (id: string, text: string) => {
      // Same sentence playing → pause
      if (activeId === id && playState === "playing") {
        speechSynthesis.pause();
        setPlayState("paused");
        return;
      }

      // Same sentence paused → resume
      if (activeId === id && playState === "paused") {
        speechSynthesis.resume();
        setPlayState("playing");
        return;
      }

      // Different sentence or idle → play new
      playNew(id, text);
    },
    [activeId, playState, playNew]
  );

  const stop = useCallback(() => {
    speechSynthesis.cancel();
    setActiveId(null);
    setPlayState("idle");
  }, []);

  return { toggle, stop, activeId, playState };
}
