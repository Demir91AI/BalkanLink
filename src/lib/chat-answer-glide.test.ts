import { describe, expect, it } from "vitest";
import { answerStartTop, easeInOutCubic, glideScrollTop, ANSWER_GLIDE_MS, ANSWER_REVEAL_MS } from "./chat-scroll";

function clock() {
  let t = 0; const q: Array<(n: number) => void> = [];
  return {
    raf: (cb: (n: number) => void) => { q.push(cb); return q.length; },
    caf: () => { q.length = 0; },
    now: () => t,
    tick(ms: number) { t += ms; const cbs = q.splice(0); cbs.forEach((cb) => cb(t)); },
    pending: () => q.length,
  };
}

describe("new answer glide", () => {
  it("one 2000+ char answer at 360px lands on its first line, not the bottom", () => {
    // 360x640 phone, answer 2400px tall starting at 900px in the list.
    const top = answerStartTop({ scrollHeight: 900 + 2400, clientHeight: 520, answerTop: 900 });
    expect(top).toBe(888);
    expect(top).toBeLessThan(900 + 2400 - 520);
  });
  it("at 390px a short answer clamps to the scrollable range", () => {
    expect(answerStartTop({ scrollHeight: 700, clientHeight: 560, answerTop: 600 })).toBe(140);
  });
  it("timing stays within the requested gentle ranges", () => {
    expect(ANSWER_REVEAL_MS).toBeGreaterThanOrEqual(180);
    expect(ANSWER_REVEAL_MS).toBeLessThanOrEqual(300);
    expect(ANSWER_GLIDE_MS).toBeGreaterThan(300);
  });
  it("glides progressively and finishes exactly once", () => {
    const c = clock(); const el = { scrollTop: 0 }; let done = 0;
    glideScrollTop(el, 1000, { raf: c.raf, caf: c.caf, now: c.now, onDone: () => done++ });
    c.tick(ANSWER_GLIDE_MS / 4);
    expect(el.scrollTop).toBeGreaterThan(0);
    expect(el.scrollTop).toBeLessThan(500);
    c.tick(ANSWER_GLIDE_MS);
    expect(el.scrollTop).toBe(1000);
    expect(done).toBe(1);
    expect(c.pending()).toBe(0);
  });
  it("a manual touch cancels the glide where the reader is", () => {
    const c = clock(); const el = { scrollTop: 0 };
    const cancel = glideScrollTop(el, 1000, { raf: c.raf, caf: c.caf, now: c.now });
    c.tick(100);
    const at = el.scrollTop;
    cancel();
    el.scrollTop = 50; // user drags up
    c.tick(500);
    expect(el.scrollTop).toBe(50);
    expect(at).toBeLessThan(1000);
  });
  it("reduced motion jumps without animating", () => {
    const c = clock(); const el = { scrollTop: 0 };
    glideScrollTop(el, 400, { reduced: true, raf: c.raf, caf: c.caf, now: c.now });
    expect(el.scrollTop).toBe(400);
    expect(c.pending()).toBe(0);
  });
  it("easing is monotonic and bounded", () => {
    expect(easeInOutCubic(0)).toBe(0);
    expect(easeInOutCubic(1)).toBe(1);
    expect(easeInOutCubic(0.3)).toBeLessThan(easeInOutCubic(0.6));
  });
});
