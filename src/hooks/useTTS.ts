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

export function useTTS() {
  const [state, setState] = useState<"idle" | "playing" | "paused">("idle");
  const cachedVoice = useRef<SpeechSynthesisVoice | null>(null);
  const currentText = useRef<string>("");

  useEffect(() => {
    const load = () => {
      cachedVoice.current = getBestGermanVoice();
    };
    load();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = load;
    }
  }, []);

  const play = useCallback((text: string) => {
    if (!("speechSynthesis" in window)) return;
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

    currentText.current = text;
    utterance.onstart = () => setState("playing");
    utterance.onend = () => setState("idle");
    utterance.onerror = () => setState("idle");
    speechSynthesis.speak(utterance);
  }, []);

  const pause = useCallback(() => {
    speechSynthesis.pause();
    setState("paused");
  }, []);

  const resume = useCallback(() => {
    speechSynthesis.resume();
    setState("playing");
  }, []);

  const toggle = useCallback((text: string) => {
    if (state === "playing") {
      pause();
    } else if (state === "paused") {
      resume();
    } else {
      play(text);
    }
  }, [state, play, pause, resume]);

  const stop = useCallback(() => {
    speechSynthesis.cancel();
    setState("idle");
  }, []);

  return { toggle, stop, state };
}
