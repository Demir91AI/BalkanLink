/**
 * Device-local chat cache, scoped to ONE user AND ONE sign-in.
 * - Survives closing the chat, navigation, refresh and app restart while the same sign-in lasts.
 * - A new sign-in (even the same account) has a different `last_sign_in_at` → cache is ignored.
 * - Logout purges every chat cache key.
 */
export const GUEST_CHAT_KEY = "bl-chat-current";
const USER_PREFIX = "bl-chat-";

type StorageLike = Pick<Storage, "getItem" | "setItem" | "removeItem" | "key" | "length">;

export function chatKeyFor(userId: string): string {
  return `${USER_PREFIX}${userId}`;
}

interface StoredChat<M> { v: 2; signInAt: string | null; messages: M[] }

export function loadUserChat<M>(storage: StorageLike, userId: string, signInAt: string | null): M[] {
  const key = chatKeyFor(userId);
  try {
    const raw = storage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as StoredChat<M> | M[];
    if (Array.isArray(parsed)) return applyLocalRetention(parsed as unknown as object[]) as M[]; // legacy format from the current device session
    if (parsed && parsed.v === 2 && Array.isArray(parsed.messages)) {
      if (parsed.signInAt === signInAt) return applyLocalRetention(parsed.messages as unknown as object[]) as M[];
      storage.removeItem(key); // belongs to an earlier sign-in
    }
  } catch {
    try { storage.removeItem(key); } catch { /* ignore */ }
  }
  return [];
}

export function saveUserChat<M>(storage: StorageLike, userId: string, signInAt: string | null, messages: M[]): void {
  try {
    if (messages.length === 0) { storage.removeItem(chatKeyFor(userId)); return; }
    const value: StoredChat<M> = { v: 2, signInAt, messages: applyLocalRetention(messages as unknown as object[]) as M[] };
    storage.setItem(chatKeyFor(userId), JSON.stringify(value));
  } catch { /* quota/private mode */ }
}

/** Remove every chat cache key (all users, and the guest chat unless `keepGuest`). */
export function purgeAllChats(storage: StorageLike, opts: { keepGuest?: boolean } = {}): void {
  const keys: string[] = [];
  for (let i = 0; i < storage.length; i++) {
    const k = storage.key(i);
    if (k && k.startsWith(USER_PREFIX) && !(opts.keepGuest && k === GUEST_CHAT_KEY)) keys.push(k);
  }
  keys.forEach((k) => { try { storage.removeItem(k); } catch { /* ignore */ } });
}

/** Device-local copies follow the same 30-day retention as server chat history. */
export const LOCAL_CHAT_RETENTION_MS = 30 * 24 * 60 * 60 * 1000;

type Stamped = { at?: number };

/** Stamp unstamped messages with `now` and drop messages older than 30 days. */
export function applyLocalRetention<M extends object>(messages: M[], now = Date.now()): M[] {
  return messages
    .map((m) => (typeof (m as Stamped).at === "number" ? m : ({ ...m, at: now } as M)))
    .filter((m) => now - ((m as Stamped).at as number) < LOCAL_CHAT_RETENTION_MS);
}
