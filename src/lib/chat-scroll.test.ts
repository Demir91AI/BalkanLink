import { describe, it, expect } from "vitest";
import { chatScrollAction, isNearBottom } from "./chat-scroll";

describe("chat scroll rules", () => {
  it("scrolled up by user while streaming → view is not moved", () => {
    expect(chatScrollAction({ justSent: false, following: false, streaming: true })).toBe("none");
  });
  it("at bottom while streaming → follows output", () => {
    expect(chatScrollAction({ justSent: false, following: true, streaming: true })).toBe("bottom");
  });
  it("own sent message → always shown, even if scrolled up", () => {
    expect(chatScrollAction({ justSent: true, following: false, streaming: false })).toBe("user-top");
  });
  it("finished answer / other updates → no jump", () => {
    expect(chatScrollAction({ justSent: false, following: true, streaming: false })).toBe("none");
  });
  it("near-bottom threshold", () => {
    expect(isNearBottom({ scrollTop: 900, scrollHeight: 1500, clientHeight: 550 })).toBe(true);
    expect(isNearBottom({ scrollTop: 500, scrollHeight: 1500, clientHeight: 550 })).toBe(false);
  });
});
