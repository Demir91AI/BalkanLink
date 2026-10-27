/** Only navigational markers, never answers, branches, files or personal facts. */
export interface GuideProgress { version: 1; step: number; completed: number[] }
export function normalizeProgress(value: unknown, count: number): GuideProgress | null {
  if (!value || typeof value !== "object" || count < 1) return null;
  const v = value as Record<string, unknown>;
  if (v.version !== 1 || !Number.isInteger(v.step) || typeof v.step !== "number" || !Array.isArray(v.completed)) return null;
  if (v.step < 0 || v.step >= count) return null;
  return { version: 1, step: v.step, completed: [...new Set(v.completed.filter((n): n is number => typeof n === "number" && Number.isInteger(n) && n >= 0 && n < count))] };
}
export function progressKey(id: string): string | null {
  return /^[a-z0-9-]{1,80}$/.test(id) ? `bl-guide-progress-v1:${id}` : null;
}