// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { isScrollableArea, shouldStartPullToRefresh, touchMayPullToRefresh } from "./pull-to-refresh-guard";

const base = { refreshing: false, windowScrollY: 0, pageScrollLocked: false, insideBlockedArea: false, insideScrollableArea: false };

describe("pull-to-refresh guard", () => {
  afterEach(() => { document.body.innerHTML = ""; document.body.style.overflow = ""; });

  it("allows a pull only on the page itself at its top", () => {
    expect(shouldStartPullToRefresh(base)).toBe(true);
    expect(shouldStartPullToRefresh({ ...base, windowScrollY: 1 })).toBe(false);
  });

  it("never refreshes while the page is scroll-locked by an open overlay (assistant open)", () => {
    expect(shouldStartPullToRefresh({ ...base, pageScrollLocked: true })).toBe(false);
  });

  it("never refreshes from inside an inner scroll area such as the chat list", () => {
    expect(shouldStartPullToRefresh({ ...base, insideScrollableArea: true })).toBe(false);
    expect(isScrollableArea({ overflowY: "auto", scrollHeight: 5000, clientHeight: 600 })).toBe(true);
    expect(isScrollableArea({ overflowY: "visible", scrollHeight: 5000, clientHeight: 600 })).toBe(false);
  });

  it("blocks touches inside the assistant panel marker even when the page is unlocked", () => {
    document.body.innerHTML = `<div data-pull-refresh="off"><div><p id="msg">older message</p></div></div><p id="page">page</p>`;
    expect(touchMayPullToRefresh(document.getElementById("msg"), false)).toBe(false);
    expect(touchMayPullToRefresh(document.getElementById("page"), false)).toBe(true);
  });

  it("blocks touches anywhere while body overflow is hidden, and on text inputs", () => {
    document.body.innerHTML = `<p id="page">page</p><textarea id="t"></textarea>`;
    expect(touchMayPullToRefresh(document.getElementById("t"), false)).toBe(false);
    document.body.style.overflow = "hidden";
    expect(touchMayPullToRefresh(document.getElementById("page"), false)).toBe(false);
  });
});
