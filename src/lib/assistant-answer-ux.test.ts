import { describe, it, expect } from "vitest";
import { consumeAssistantStream } from "./assistant-stream";
import { streamFollowTop, chatScrollAction } from "./chat-scroll";
import { guideReplyStream } from "../../supabase/functions/chat-assistant/guide-context";

const enc = (t: string) => new TextEncoder().encode(t);
const ev = (t: string) => `data: ${JSON.stringify({ choices: [{ delta: { content: t } }] })}\n\n`;

describe("assistant answer UX", () => {
  it("delivers each chunk as it arrives, before the stream ends (loader → first chunk)", async () => {
    let ctrl!: ReadableStreamDefaultController<Uint8Array>;
    const body = new ReadableStream<Uint8Array>({ start(c) { ctrl = c; } });
    const seen: string[] = [];
    const done = consumeAssistantStream(body, t => seen.push(t));
    ctrl.enqueue(enc(ev("Prvi ")));
    await new Promise(r => setTimeout(r, 0));
    expect(seen).toEqual(["Prvi "]); // first chunk visible while stream still open
    ctrl.enqueue(enc(ev("drugi").slice(0, 10))); ctrl.enqueue(enc(ev("drugi").slice(10)));
    await new Promise(r => setTimeout(r, 0));
    expect(seen).toEqual(["Prvi ", "drugi"]);
    ctrl.enqueue(enc("data: [DONE]\n\n")); ctrl.close();
    await done;
  });

  it("long markdown arrives intact", async () => {
    const md = "## Koraci\n\n" + Array.from({ length: 60 }, (_, i) => `${i + 1}. Korak **${i}**`).join("\n");
    const body = new ReadableStream<Uint8Array>({ start(c) { for (const p of md.match(/[\s\S]{1,37}/g)!) c.enqueue(enc(ev(p))); c.enqueue(enc("data: [DONE]\n\n")); c.close(); } });
    let out = ""; await consumeAssistantStream(body, t => { out += t; });
    expect(out).toBe(md);
  });

  it("zero chunks without DONE is an error, not an empty success", async () => {
    const body = new ReadableStream<Uint8Array>({ start(c) { c.close(); } });
    await expect(consumeAssistantStream(body, () => {})).rejects.toThrow("ASSISTANT_STREAM_INTERRUPTED");
  });

  it("server error event surfaces as error", async () => {
    const body = new ReadableStream<Uint8Array>({ start(c) { c.enqueue(enc('data: {"error":"x"}\n\n')); c.close(); } });
    await expect(consumeAssistantStream(body, () => {})).rejects.toThrow("ASSISTANT_STREAM_ERROR");
  });

  it("documents that prepared guide answers are sent by the server as one chunk", async () => {
    const parts: string[] = [];
    await consumeAssistantStream(guideReplyStream("A\n\nB"), t => parts.push(t));
    expect(parts).toEqual(["A\n\nB"]);
  });

  it.each([[360, 640], [390, 700]])("at %ipx a big chunk keeps the answer start in view instead of jumping to bottom", (_w, h) => {
    const r = streamFollowTop({ scrollHeight: 5000, clientHeight: h, answerTop: 1200 });
    expect(r).toEqual({ top: 1188, capped: true });
  });

  it("small streaming growth keeps following the bottom", () => {
    expect(streamFollowTop({ scrollHeight: 1500, clientHeight: 640, answerTop: 1200 })).toEqual({ top: 860, capped: false });
  });

  it("reader scrolled up during streaming is never moved", () => {
    expect(chatScrollAction({ justSent: false, following: false, streaming: true })).toBe("none");
    expect(chatScrollAction({ justSent: false, following: true, streaming: true, touching: true })).toBe("none");
  });
});
