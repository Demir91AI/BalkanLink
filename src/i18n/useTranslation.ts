import { useCallback, useSyncExternalStore } from "react";
import { translations } from "./translations";

const STORAGE_KEY = "bl_language";
const DEFAULT_LANG = "de";

let globalLang = localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
const listeners = new Set<() => void>();

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => { listeners.delete(cb); };
}

function getSnapshot() {
  return globalLang;
}

export const setGlobalLanguage = (lang: string) => {
  globalLang = lang;
  localStorage.setItem(STORAGE_KEY, lang);
  listeners.forEach((fn) => fn());
};

export function useTranslation() {
  const lang = useSyncExternalStore(subscribe, getSnapshot);

  const t = useCallback(
    (key: string): string =>
      translations[lang]?.[key] ?? translations[DEFAULT_LANG]?.[key] ?? key,
    [lang],
  );

  return { t, currentLanguage: lang, setLanguage: setGlobalLanguage };
}
