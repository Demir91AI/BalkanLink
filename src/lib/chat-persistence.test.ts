import { describe, it, expect, beforeEach } from "vitest";
import { GUEST_CHAT_KEY, chatKeyFor, loadUserChat, purgeAllChats, saveUserChat } from "./chat-persistence";

function mem(): Storage {
  const m = new Map<string, string>();
  return {
    get length() { return m.size; },
    key: (i: number) => [...m.keys()][i] ?? null,
    getItem: (k: string) => m.get(k) ?? null,
    setItem: (k: string, v: string) => void m.set(k, v),
    removeItem: (k: string) => void m.delete(k),
    clear: () => m.clear(),
  } as Storage;
}

describe("chat persistence per user and sign-in", () => {
  let s: Storage;
  const msgs = [{ role: "user", content: "Kindergeld?" }];
  beforeEach(() => { s = mem(); });

  it("same sign-in: chat survives refresh / app restart", () => {
    saveUserChat(s, "A", "2026-10-29T10:00:00Z", msgs);
    expect(loadUserChat(s, "A", "2026-10-29T10:00:00Z")).toEqual(msgs);
  });
  it("new login of the SAME user → completely empty chat", () => {
    saveUserChat(s, "A", "2026-10-29T10:00:00Z", msgs);
    expect(loadUserChat(s, "A", "2026-10-29T12:00:00Z")).toEqual([]);
    expect(s.getItem(chatKeyFor("A"))).toBeNull();
  });
  it("another account never sees user A's messages", () => {
    saveUserChat(s, "A", "t1", msgs);
    expect(loadUserChat(s, "B", "t1")).toEqual([]);
  });
  it("logout purge removes every user and guest chat key", () => {
    saveUserChat(s, "A", "t1", msgs);
    saveUserChat(s, "B", "t2", msgs);
    s.setItem(GUEST_CHAT_KEY, "[]");
    s.setItem("bl-lang", "de");
    purgeAllChats(s);
    expect(s.getItem(chatKeyFor("A"))).toBeNull();
    expect(s.getItem(chatKeyFor("B"))).toBeNull();
    expect(s.getItem(GUEST_CHAT_KEY)).toBeNull();
    expect(s.getItem("bl-lang")).toBe("de");
  });
  it("corrupted cache is discarded", () => {
    s.setItem(chatKeyFor("A"), "{bad");
    expect(loadUserChat(s, "A", "t1")).toEqual([]);
  });
});
