import { useCallback, useEffect, useState } from "react";

const STORAGE_PREFIX = "balkanlink-checklist-";

export function useChecklistProgress(checklistId: string, totalCount: number) {
  const storageKey = `${STORAGE_PREFIX}${checklistId}`;
  const [checkedSet, setCheckedSet] = useState<Set<string>>(new Set());

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const arr = JSON.parse(raw) as string[];
        setCheckedSet(new Set(arr));
      }
    } catch {}
  }, [storageKey]);

  const persist = useCallback(
    (next: Set<string>) => {
      try {
        localStorage.setItem(storageKey, JSON.stringify(Array.from(next)));
      } catch {}
    },
    [storageKey]
  );

  const toggle = useCallback(
    (id: string) => {
      setCheckedSet((prev) => {
        const next = new Set(prev);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        persist(next);
        return next;
      });
    },
    [persist]
  );

  const reset = useCallback(() => {
    setCheckedSet(new Set());
    try {
      localStorage.removeItem(storageKey);
    } catch {}
  }, [storageKey]);

  return { checkedSet, toggle, reset, doneCount: checkedSet.size, totalCount };
}
