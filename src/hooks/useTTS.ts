import { useCallback, useRef, useEffect } from "react";

/** Pick the best German voice available in the browser */
function getBestGermanVoice(): SpeechSynthesisVoice | null {
  const voices = speechSynthesis.getVoices();
  const german = voices.filter((v) => v.lang.startsWith("de"));
  if (german.length === 0) return null;

  // Prefer high-quality / natural voices (often contain these keywords)
  const preferred = german.find(
    (v) =>
      v.name.toLowerCase().includes("enhanced") ||
      v.name.toLowerCase().includes("premium") ||
      v.name.toLowerCase().includes("natural") ||
      v.name.toLowerCase().includes("neural") ||
      v.name.toLowerCase().includes("wavenet")
  );
  if (preferred) return preferred;

  // Prefer local (offline) voices – they tend to sound better
  const local = german.find((v) => v.localService);
  if (local) return local;

  return german[0];
}

export function useTTS() {
  const speaking = useRef(false);
  const cachedVoice = useRef<SpeechSynthesisVoice | null>(null);

  // Pre-load voices (some browsers load them async)
  useEffect(() => {
    const load = () => {
      cachedVoice.current = getBestGermanVoice();
    };
    load();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = load;
    }
  }, []);

  const speak = useCallback((text: string) => {
    if (!("speechSynthesis" in window)) return;
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "de-DE";
    utterance.rate = 0.88;
    utterance.pitch = 1.05;
    utterance.volume = 1;

    // Use best available German voice
    const voice = cachedVoice.current ?? getBestGermanVoice();
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang; // match voice lang exactly
    }

    utterance.onstart = () => { speaking.current = true; };
    utterance.onend = () => { speaking.current = false; };
    speechSynthesis.speak(utterance);
  }, []);

  const stop = useCallback(() => {
    speechSynthesis.cancel();
    speaking.current = false;
  }, []);

  return { speak, stop };
}
