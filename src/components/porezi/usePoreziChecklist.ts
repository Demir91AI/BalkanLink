import { useCallback, useEffect, useState } from "react";

/**
 * Persistent per-module checklist state.
 *
 * Stored in localStorage under `porezi:checklist:<moduleId>`. Pure
 * client-side, no PII transmitted, safe to use without auth.
 */
const STORAGE_PREFIX = "porezi:checklist:";

export function usePoreziChecklist(moduleId: string) {
  const storageKey = `${STORAGE_PREFIX}${moduleId}`;
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setChecked(JSON.parse(raw));
    } catch {
      // ignore quota / parse errors
    }
    setHydrated(true);
  }, [storageKey]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(checked));
    } catch {
      // ignore
    }
  }, [checked, hydrated, storageKey]);

  const toggle = useCallback((id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const reset = useCallback(() => setChecked({}), []);

  const completedCount = (ids: string[]) =>
    ids.reduce((n, id) => (checked[id] ? n + 1 : n), 0);

  return { checked, toggle, reset, completedCount, hydrated };
}
