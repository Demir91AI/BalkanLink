/** Distance (px) from the bottom within which the chat counts as "following" new output. */
export const CHAT_STICK_THRESHOLD = 80;
/** A user's own scroll re-attaches to live output only when it really reaches the bottom. */
export const CHAT_REATTACH_THRESHOLD = 24;
/** Scroll events this long after a touch/wheel/key gesture still count as the user's (momentum). */
export const USER_GESTURE_WINDOW_MS = 1200;

type Metrics = { scrollTop: number; scrollHeight: number; clientHeight: number };

export function isNearBottom(el: Metrics, threshold = CHAT_STICK_THRESHOLD): boolean {
  return el.scrollHeight - el.scrollTop - el.clientHeight <= threshold;
}

/**
 * Decide what the chat should do after a render.
 * - "user-top": the user just sent a message → show it once.
 * - "bottom": new output while the user is following and not touching the chat.
 * - "none": user scrolled up or is mid-gesture → never move the view.
 */
export function chatScrollAction(opts: { justSent: boolean; following: boolean; streaming: boolean; touching?: boolean }): "user-top" | "bottom" | "none" {
  if (opts.justSent) return "user-top";
  if (opts.following && !opts.touching) return "bottom";
  return "none";
}

/**
 * New "following" state after a scroll event. Only the user's own scrolling changes it;
 * scrolls caused by new content, keyboard resize or our own scrollTop writes never do.
 */
export function followAfterScroll(opts: { wasFollowing: boolean; userInitiated: boolean; metrics: Metrics }): boolean {
  if (!opts.userInitiated) return opts.wasFollowing;
  return isNearBottom(opts.metrics, CHAT_REATTACH_THRESHOLD);
}

/** Whether a resize (e.g. mobile keyboard via visualViewport) may pin the view to the bottom. */
export function mayPinOnResize(opts: { following: boolean; touching: boolean }): boolean {
  return opts.following && !opts.touching;
}

/**
 * Where to scroll while an answer streams and the reader is following.
 * Follows the newest text, but never past the start of the answer being written: a large chunk
 * (or a prepared answer that arrives in one piece) keeps its first line in view instead of
 * jumping to its end. `capped` means the answer start was reached → stop following.
 */
export function streamFollowTop(opts: { scrollHeight: number; clientHeight: number; answerTop: number; margin?: number }): { top: number; capped: boolean } {
  const bottom = Math.max(0, opts.scrollHeight - opts.clientHeight);
  const limit = Math.max(0, opts.answerTop - (opts.margin ?? 12));
  return limit < bottom ? { top: limit, capped: true } : { top: bottom, capped: false };
}
