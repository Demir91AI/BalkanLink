/**
 * Apply a translation overlay (array of {path, text}) onto a deeply-cloned data tree.
 * Path format: dot-separated with numeric indices for arrays, e.g. "0.routes.0.steps.3".
 * Skips writes when the path target is missing or not a string.
 */
export type Overlay = ReadonlyArray<{ path: string; text: string }>;

export function applyOverlay<T>(data: T, overlay: Overlay | undefined): T {
  if (!overlay || overlay.length === 0) return data;
  // structuredClone is supported in modern browsers + node ≥17
  const cloned: any = typeof structuredClone === "function"
    ? structuredClone(data)
    : JSON.parse(JSON.stringify(data));
  for (const { path, text } of overlay) {
    const parts = path.split(".");
    let cur: any = cloned;
    for (let i = 0; i < parts.length - 1; i++) {
      const k = parts[i];
      const idx = /^\d+$/.test(k) ? Number(k) : k;
      if (cur == null) break;
      cur = cur[idx as any];
    }
    if (cur == null) continue;
    const last = parts[parts.length - 1];
    const lastKey = /^\d+$/.test(last) ? Number(last) : last;
    if (typeof cur[lastKey as any] === "string") {
      cur[lastKey as any] = text;
    }
  }
  return cloned as T;
}
