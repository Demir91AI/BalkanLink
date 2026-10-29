/**
 * Decides whether a touch may start the page-level pull-to-refresh gesture.
 * A downward swipe inside an overlay (assistant chat, dialogs, sheets), an inner
 * scroll area, or while the page is scroll-locked is the user reading content —
 * never a refresh request. Reloading there throws the reader back to the newest
 * chat message.
 */
export const PULL_REFRESH_OFF_SELECTOR = "[data-pull-refresh='off'], [role='dialog'], [aria-modal='true'], input, textarea, select, [contenteditable='true']";

type ScrollableLike = {
  scrollHeight: number;
  clientHeight: number;
  overflowY: string;
};

export function isScrollableArea(el: ScrollableLike): boolean {
  return (el.overflowY === "auto" || el.overflowY === "scroll" || el.overflowY === "overlay") && el.scrollHeight > el.clientHeight + 1;
}

export function shouldStartPullToRefresh(opts: {
  refreshing: boolean;
  windowScrollY: number;
  pageScrollLocked: boolean;
  insideBlockedArea: boolean;
  insideScrollableArea: boolean;
}): boolean {
  if (opts.refreshing) return false;
  if (opts.windowScrollY > 0) return false;
  if (opts.pageScrollLocked) return false;
  if (opts.insideBlockedArea) return false;
  if (opts.insideScrollableArea) return false;
  return true;
}

/** DOM adapter: walks up from the touch target. */
export function touchMayPullToRefresh(target: EventTarget | null, refreshing: boolean): boolean {
  if (typeof window === "undefined" || typeof document === "undefined") return false;
  const el = target instanceof Element ? target : null;
  let insideScrollableArea = false;
  for (let node: Element | null = el; node && node !== document.body && node !== document.documentElement; node = node.parentElement) {
    const style = window.getComputedStyle(node);
    if (isScrollableArea({ scrollHeight: node.scrollHeight, clientHeight: node.clientHeight, overflowY: style.overflowY })) {
      insideScrollableArea = true;
      break;
    }
  }
  const bodyOverflow = document.body ? window.getComputedStyle(document.body).overflowY : "";
  return shouldStartPullToRefresh({
    refreshing,
    windowScrollY: window.scrollY,
    pageScrollLocked: bodyOverflow === "hidden" || document.body?.style.overflow === "hidden",
    insideBlockedArea: !!el?.closest(PULL_REFRESH_OFF_SELECTOR),
    insideScrollableArea,
  });
}
