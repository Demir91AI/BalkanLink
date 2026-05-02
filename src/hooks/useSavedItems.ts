/**
 * useSavedItems — "Sačuvaj za kasnije" hook (Instant Value pattern)
 *
 * - Bez registracije: sve u localStorage
 * - Cross-tab sync preko `storage` event-a + custom event-a
 * - Tipovi stavki: form (Vorlagen/Musterformular), checklist, qa
 * - Limit 100 stavki (FIFO) da se ne nabuca storage
 * - Bezbedno na SSR-u (window guard)
 */
import { useCallback, useEffect, useSyncExternalStore } from "react";

export type SavedItemType =
  | "form"        // Vorlagen ili Musterformular
  | "checklist"   // /check-liste/:slug
  | "qa";         // /pitaj-dijasporu pitanje

export interface SavedItem {
  /** stabilan ključ unutar tipa (npr. slug) */
  id: string;
  type: SavedItemType;
  /** prikazni naslov (lokalizovan, prema jeziku u trenutku spremanja) */
  title: string;
  /** apsolutni in-app path (bez jezičkog prefiksa, useLocalizedHref dodaje) */
  path: string;
  /** ISO timestamp */
  savedAt: string;
  /** opcionalno — npr. premium, kratak opis */
  meta?: Record<string, string | boolean | number>;
}

const STORAGE_KEY = "balkanlink-saved-items";
const MAX_ITEMS = 100;
const CHANGE_EVENT = "balkanlink:saved-items-changed";

// ---- low-level storage helpers (defensive, never throw) ----

function readAll(): SavedItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (it): it is SavedItem =>
        !!it &&
        typeof it.id === "string" &&
        typeof it.type === "string" &&
        typeof it.path === "string" &&
        typeof it.title === "string",
    );
  } catch {
    return [];
  }
}

function writeAll(items: SavedItem[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent(CHANGE_EVENT));
  } catch {
    /* quota / private mode — silent fail */
  }
}

function makeKey(type: SavedItemType, id: string): string {
  return `${type}:${id}`;
}

// ---- React subscription store ----

let cachedSnapshot: SavedItem[] | null = null;

function getSnapshot(): SavedItem[] {
  if (cachedSnapshot === null) cachedSnapshot = readAll();
  return cachedSnapshot;
}

function invalidate(): void {
  cachedSnapshot = readAll();
}

function subscribe(cb: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const handler = () => {
    invalidate();
    cb();
  };
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) handler();
  };
  window.addEventListener(CHANGE_EVENT, handler);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(CHANGE_EVENT, handler);
    window.removeEventListener("storage", onStorage);
  };
}

// ---- public API ----

export function useSavedItems() {
  const items = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  // initial hydration in case first read happened before mount
  useEffect(() => {
    invalidate();
  }, []);

  const isSaved = useCallback(
    (type: SavedItemType, id: string): boolean => {
      const key = makeKey(type, id);
      return items.some((it) => makeKey(it.type, it.id) === key);
    },
    [items],
  );

  const save = useCallback((item: Omit<SavedItem, "savedAt">) => {
    const all = readAll();
    const key = makeKey(item.type, item.id);
    const without = all.filter((it) => makeKey(it.type, it.id) !== key);
    const next: SavedItem[] = [
      { ...item, savedAt: new Date().toISOString() },
      ...without,
    ].slice(0, MAX_ITEMS);
    writeAll(next);
  }, []);

  const remove = useCallback((type: SavedItemType, id: string) => {
    const all = readAll();
    const key = makeKey(type, id);
    writeAll(all.filter((it) => makeKey(it.type, it.id) !== key));
  }, []);

  const toggle = useCallback(
    (item: Omit<SavedItem, "savedAt">): boolean => {
      const key = makeKey(item.type, item.id);
      const all = readAll();
      const exists = all.some((it) => makeKey(it.type, it.id) === key);
      if (exists) {
        writeAll(all.filter((it) => makeKey(it.type, it.id) !== key));
        return false;
      }
      const next: SavedItem[] = [
        { ...item, savedAt: new Date().toISOString() },
        ...all,
      ].slice(0, MAX_ITEMS);
      writeAll(next);
      return true;
    },
    [],
  );

  const clear = useCallback(() => writeAll([]), []);

  return { items, isSaved, save, remove, toggle, clear };
}
