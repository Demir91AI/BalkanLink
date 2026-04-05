import { useCallback, useRef, useEffect, useState } from "react";

function getBestGermanVoice(): SpeechSynthesisVoice | null {
  if (typeof speechSynthesis === "undefined") return null;
  const voices = speechSynthesis.getVoices();
  const german = voices.filter((v) => v.lang.startsWith("de"));
  if (german.length === 0) return null;

  // Priority order: neural/wavenet > enhanced/premium > natural > local > any German
  const priority = [
    (v: SpeechSynthesisVoice) => /neural|wavenet/i.test(v.name),
    (v: SpeechSynthesisVoice) => /enhanced|premium/i.test(v.name),
    (v: SpeechSynthesisVoice) => /natural/i.test(v.name),
    // Prefer specific known good voices
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

// Preprocess text for more natural German TTS pronunciation
function preprocessGerman(text: string): string {
  return text
    // Add slight pause after comma and semicolon via SSML-like approach (not supported, but spacing helps)
    .replace(/,/g, ", ")
    .replace(/;/g, "; ")
    // Common German abbreviations that TTS mispronounces
    .replace(/\bz\.B\./g, "zum Beispiel")
    .replace(/\bca\./g, "circa")
    .replace(/\bggf\./g, "gegebenenfalls")
    .replace(/\bbzw\./g, "beziehungsweise")
    .replace(/\bu\.a\./g, "unter anderem")
    .replace(/\bd\.h\./g, "das heißt")
    .replace(/\busw\./g, "und so weiter")
    .replace(/\binkl\./g, "inklusive")
    .replace(/\bExkl\./g, "exklusive")
    // Numbers with units
    .replace(/(\d+)€/g, "$1 Euro")
    .replace(/(\d+)%/g, "$1 Prozent");
}

type PlayState = "idle" | "playing" | "paused";

export function useTTS() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [playState, setPlayState] = useState<PlayState>("idle");
  const cachedVoice = useRef<SpeechSynthesisVoice | null>(null);

  const hasTTS = typeof speechSynthesis !== "undefined";

  useEffect(() => {
    if (!hasTTS) return;
    const load = () => {
      cachedVoice.current = getBestGermanVoice();
    };
    load();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = load;
    }
  }, [hasTTS]);

  const playNew = useCallback((id: string, text: string) => {
    if (!hasTTS) return;
    speechSynthesis.cancel();

    const processed = preprocessGerman(text);
    const utterance = new SpeechSynthesisUtterance(processed);
    utterance.lang = "de-DE";
    utterance.rate = 1.0;
    utterance.pitch = 0.92;
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
  }, [hasTTS]);

  const toggle = useCallback(
    (id: string, text: string) => {
      if (!hasTTS) return;
      if (activeId === id && playState === "playing") {
        speechSynthesis.pause();
        setPlayState("paused");
        return;
      }

      if (activeId === id && playState === "paused") {
        speechSynthesis.resume();
        setPlayState("playing");
        return;
      }

      playNew(id, text);
    },
    [activeId, playState, playNew, hasTTS]
  );

  const stop = useCallback(() => {
    if (!hasTTS) return;
    speechSynthesis.cancel();
    setActiveId(null);
    setPlayState("idle");
  }, [hasTTS]);

  return { toggle, stop, activeId, playState };
}
