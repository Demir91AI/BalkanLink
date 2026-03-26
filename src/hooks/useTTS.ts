import { useCallback, useRef } from "react";

export function useTTS() {
  const speaking = useRef(false);

  const speak = useCallback((text: string) => {
    if (!("speechSynthesis" in window)) return;
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "de-DE";
    utterance.rate = 0.85;
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
