/** Distance (px) from the bottom within which the chat counts as "following" new output. */
export const CHAT_STICK_THRESHOLD = 80;

export function isNearBottom(
  el: { scrollTop: number; scrollHeight: number; clientHeight: number },
  threshold = CHAT_STICK_THRESHOLD,
): boolean {
  return el.scrollHeight - el.scrollTop - el.clientHeight <= threshold;
}

/**
 * Decide what the chat should do after a render.
 * - "user-top": the user just sent a message → show it at the top once.
 * - "bottom": streaming output while the user is still following at the bottom.
 * - "none": user scrolled up (or nothing streaming) → never move the view.
 */
export function chatScrollAction(opts: { justSent: boolean; following: boolean; streaming: boolean }): "user-top" | "bottom" | "none" {
  if (opts.justSent) return "user-top";
  if (opts.streaming && opts.following) return "bottom";
  return "none";
}
