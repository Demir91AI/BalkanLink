import { useCallback, useRef, useEffect, useState } from "react";

/** Pick the best German voice available in the browser */
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
  const [isSpeaking, setIsSpeaking] = useState(false);
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

  const speak = useCallback((text: string) => {
    if (!("speechSynthesis" in window)) return;
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "de-DE";
    utterance.rate = 1.2;
    utterance.pitch = 1.0;
    utterance.volume = 1;

    const voice = cachedVoice.current ?? getBestGermanVoice();
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    speechSynthesis.speak(utterance);
  }, []);

  const stop = useCallback(() => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  return { speak, stop, isSpeaking };
}
