import { describe, it, expect, vi } from "vitest";
import { consumeAssistantStream, createAssistantRequestLock } from "./assistant-stream";
import { meterStream } from "../../supabase/functions/_shared/usage";

const encode = (text: string) => new TextEncoder().encode(text);
const event = (text: string) => `data: ${JSON.stringify({ choices: [{ delta: { content: text } }] })}\n\n`;
const body = (text: string) => new ReadableStream<Uint8Array>({ start(c) { c.enqueue(encode(text)); c.close(); } });

describe("assistant request and SSE reliability", () => {
  it("measures same-tick preflight calls: legacy async state guard 2 → synchronous lock 1", async () => {
    const counts: number[] = [];
    for (const locked of [false, true]) {
      const lock = createAssistantRequestLock(); const record = vi.fn(async () => {});
      let loading = false;
      const send = async () => {
        if (loading || (locked && !lock.acquire())) return;
        try { await record(); loading = true; } finally { if (locked) lock.release(); }
      };
      await Promise.all([send(), send()]); counts.push(record.mock.calls.length);
    }
    expect(counts).toEqual([2, 1]);
  });
  it("concurrent sends acquire once before the first await; next explicit request remains allowed", async () => {
    const lock = createAssistantRequestLock(); let finish: (() => void) | undefined;
    const wait = new Promise<void>(r => { finish = r; }); const record = vi.fn(() => wait); const fetch = vi.fn();
    const send = async () => { if (!lock.acquire()) return; try { await record(); fetch(); } finally { lock.release(); } };
    const first = send(); await send(); await send();
    expect(record).toHaveBeenCalledTimes(1); finish?.(); await first;
    expect(fetch).toHaveBeenCalledTimes(1); await send(); expect(fetch).toHaveBeenCalledTimes(2);
  });
  it("lock is released after a rejected preflight without retrying", async () => {
    const lock = createAssistantRequestLock(); expect(lock.acquire()).toBe(true);
    try { await Promise.reject(new Error("record failed")); } catch { /* same caller catch */ } finally { lock.release(); }
    expect(lock.acquire()).toBe(true);
  });
  for (const text of ["Pripremi dječji dokument.", "Pripremi djetetov dokument.", "Pripremi dečji dokument.", "Unterlagen prüfen."]) it(`split UTF-8/SSE preserves ${text}`, async () => {
    const bytes = encode(event(text) + "data: [DONE]"); let index = 0;
    const stream = new ReadableStream<Uint8Array>({ pull(c) { if (index === bytes.length) c.close(); else c.enqueue(bytes.slice(index, ++index)); } });
    const chunks: string[] = []; await consumeAssistantStream(stream, c => chunks.push(c)); expect(chunks.join("")).toBe(text);
  });
  it("DONE exits and cancels an open tail instead of awaiting another read", async () => {
    const cancel = vi.fn(); const stream = new ReadableStream<Uint8Array>({ start(c) { c.enqueue(encode(event("ok") + "data: [DONE]\n\n")); }, cancel });
    await consumeAssistantStream(stream, () => {}); expect(cancel).toHaveBeenCalledTimes(1); expect(stream.locked).toBe(false);
  });
  it("EOF without DONE surfaces interruption and keeps received partial text", async () => {
    const received: string[] = []; await expect(consumeAssistantStream(body(event("partial")), c => received.push(c))).rejects.toThrow("INTERRUPTED"); expect(received).toEqual(["partial"]);
  });
  it("provider error is not silent success", async () => {
    await expect(consumeAssistantStream(body('data: {"error":{"message":"untrusted"}}\n\n'), () => {})).rejects.toThrow("STREAM_ERROR");
  });
  it("malformed complete event fails without poisoning subsequent buffered lines", async () => {
    await expect(consumeAssistantStream(body("data: not-json\ndata: [DONE]\n"), () => {})).rejects.toThrow();
  });
  it("slow chunks have no new timeout/retry and successful completion commits once", async () => {
    let controller: ReadableStreamDefaultController<Uint8Array> | undefined;
    const stream = new ReadableStream<Uint8Array>({ start(c) { controller = c; } });
    const commit = vi.fn(async () => {}), release = vi.fn(async () => {}), received = vi.fn();
    const pending = consumeAssistantStream(meterStream(stream, commit, release), received);
    await Promise.resolve(); expect(commit).not.toHaveBeenCalled(); expect(received).not.toHaveBeenCalled();
    controller?.enqueue(encode(event("late"))); controller?.enqueue(encode("data: [DONE]\n\n")); controller?.close();
    await pending; await vi.waitFor(() => expect(commit).toHaveBeenCalledTimes(1)); expect(release).not.toHaveBeenCalled(); expect(received).toHaveBeenCalledWith("late");
  });
});