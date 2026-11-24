import { describe, it, expect } from "vitest";
import { applyLocalRetention, LOCAL_CHAT_RETENTION_MS } from "./chat-persistence";

describe("local chat 30-day retention", () => {
  const now = 1_800_000_000_000;
  it("drops messages older than 30 days", () => {
    const out = applyLocalRetention([{ c: "old", at: now - LOCAL_CHAT_RETENTION_MS - 1 }, { c: "new", at: now - 1000 }], now);
    expect(out.map((m) => m.c)).toEqual(["new"]);
  });
  it("keeps a message 29 days old", () => {
    expect(applyLocalRetention([{ at: now - 29 * 86400000 }], now)).toHaveLength(1);
  });
  it("stamps unstamped messages so they expire later", () => {
    expect(applyLocalRetention([{ c: "x" }], now)[0]).toMatchObject({ at: now });
  });
  it("retention window is exactly 30 days", () => {
    expect(LOCAL_CHAT_RETENTION_MS).toBe(30 * 86400000);
  });
});
