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
  it("finished answer while following → stays at bottom; scrolled up → no jump", () => {
    expect(chatScrollAction({ justSent: false, following: true, streaming: false })).toBe("bottom");
    expect(chatScrollAction({ justSent: false, following: false, streaming: false })).toBe("none");
  });
  it("near-bottom threshold", () => {
    expect(isNearBottom({ scrollTop: 900, scrollHeight: 1500, clientHeight: 550 })).toBe(true);
    expect(isNearBottom({ scrollTop: 500, scrollHeight: 1500, clientHeight: 550 })).toBe(false);
  });
});

import { followAfterScroll, mayPinOnResize } from "./chat-scroll";

describe("chat scroll — reader is never pulled down", () => {
  const up = { scrollTop: 200, scrollHeight: 3000, clientHeight: 640 };
  const bottom = { scrollTop: 2360, scrollHeight: 3000, clientHeight: 640 };
  it("streaming chunk / typing line while finger is on the chat → no auto-scroll", () => {
    expect(chatScrollAction({ justSent: false, following: true, streaming: true, touching: true })).toBe("none");
  });
  it("user touch-scrolls up → detaches", () => {
    expect(followAfterScroll({ wasFollowing: true, userInitiated: true, metrics: up })).toBe(false);
  });
  it("content growth / keyboard resize scroll events never re-attach a detached reader", () => {
    expect(followAfterScroll({ wasFollowing: false, userInitiated: false, metrics: bottom })).toBe(false);
  });
  it("non-user scroll events never detach a following reader", () => {
    expect(followAfterScroll({ wasFollowing: true, userInitiated: false, metrics: up })).toBe(true);
  });
  it("user scrolls all the way back to the bottom → re-attaches", () => {
    expect(followAfterScroll({ wasFollowing: false, userInitiated: true, metrics: bottom })).toBe(true);
  });
  it("small upward drag of 60px already detaches (stricter than the 80px follow zone)", () => {
    expect(followAfterScroll({ wasFollowing: true, userInitiated: true, metrics: { scrollTop: 2300, scrollHeight: 3000, clientHeight: 640 } })).toBe(false);
  });
  it("keyboard (visualViewport) resize pins only while following and not touching", () => {
    expect(mayPinOnResize({ following: false, touching: false })).toBe(false);
    expect(mayPinOnResize({ following: true, touching: true })).toBe(false);
    expect(mayPinOnResize({ following: true, touching: false })).toBe(true);
  });
});
