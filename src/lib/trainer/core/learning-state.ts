/**
 * Device-local learning state: partial lesson resume + spaced review of wrong answers.
 *
 * Stored under its OWN key so the legacy progress record (`balkanlink_trainer`:
 * XP/streak/completed IDs, synced to the server) is never rewritten or migrated
 * destructively. Contains only exercise keys, counters and dates — no typed
 * answers or personal data. Server sync of this state needs a schema change and
 * owner approval, so it is intentionally local-only for now.
 */
export const LEARNING_KEY = "balkanlink_trainer_learning_v1";
const DAY = 86_400_000;
/** Leitner intervals in days for boxes 1..4; after box 4 the item is retired. */
export const REVIEW_INTERVALS = [1, 3, 7, 14] as const;
export const MAX_REVIEW_ITEMS = 200;

export interface ResumePoint { step: number; correct: number; answered: number; updatedAt: number }
export interface ReviewItem { lessonId: string; box: number; due: number }
export interface LearningState {
  v: 1;
  resume: Record<string, ResumePoint>;
  review: Record<string, ReviewItem>;
  lastLessonId?: string;
}

export const emptyState = (): LearningState => ({ v: 1, resume: {}, review: {} });

/** Accepts unknown input (old/corrupt/foreign) and returns a safe, valid state. */
export function parseState(raw: unknown): LearningState {
  const s = emptyState();
  if (!raw || typeof raw !== "object") return s;
  const r = raw as Partial<LearningState>;
  if (r.resume && typeof r.resume === "object") {
    for (const [k, p] of Object.entries(r.resume)) {
      if (p && Number.isInteger(p.step) && p.step >= 0 && Number.isFinite(p.updatedAt))
        s.resume[k] = { step: p.step, correct: Math.max(0, p.correct | 0), answered: Math.max(0, p.answered | 0), updatedAt: p.updatedAt };
    }
  }
  if (r.review && typeof r.review === "object") {
    for (const [k, it] of Object.entries(r.review)) {
      if (it && typeof it.lessonId === "string" && it.box >= 1 && it.box <= REVIEW_INTERVALS.length && Number.isFinite(it.due))
        s.review[k] = { lessonId: it.lessonId, box: it.box, due: it.due };
    }
  }
  if (typeof r.lastLessonId === "string") s.lastLessonId = r.lastLessonId;
  return s;
}

export function saveResume(s: LearningState, lessonId: string, p: Omit<ResumePoint, "updatedAt">, now = Date.now()): LearningState {
  return { ...s, lastLessonId: lessonId, resume: { ...s.resume, [lessonId]: { ...p, updatedAt: now } } };
}

export function clearResume(s: LearningState, lessonId: string): LearningState {
  const resume = { ...s.resume }; delete resume[lessonId];
  return { ...s, resume };
}

/** Wrong answer → (re)enter box 1, due tomorrow. */
export function scheduleWrong(s: LearningState, key: string, lessonId: string, now = Date.now()): LearningState {
  const review = { ...s.review, [key]: { lessonId, box: 1, due: now + REVIEW_INTERVALS[0] * DAY } };
  const keys = Object.keys(review);
  if (keys.length > MAX_REVIEW_ITEMS) {
    keys.sort((a, b) => review[a].due - review[b].due).slice(0, keys.length - MAX_REVIEW_ITEMS).forEach((k) => delete review[k]);
  }
  return { ...s, review };
}

/** Review answer: correct → next box (retire after last); wrong → back to box 1. */
export function gradeReview(s: LearningState, key: string, correct: boolean, now = Date.now()): LearningState {
  const it = s.review[key];
  if (!it) return s;
  const review = { ...s.review };
  if (!correct) review[key] = { ...it, box: 1, due: now + REVIEW_INTERVALS[0] * DAY };
  else if (it.box >= REVIEW_INTERVALS.length) delete review[key];
  else review[key] = { ...it, box: it.box + 1, due: now + REVIEW_INTERVALS[it.box] * DAY };
  return { ...s, review };
}

export function dueKeys(s: LearningState, now = Date.now()): string[] {
  return Object.entries(s.review).filter(([, it]) => it.due <= now).sort((a, b) => a[1].due - b[1].due).map(([k]) => k);
}

// ── storage (browser) ──
export function loadState(): LearningState {
  try { return parseState(JSON.parse(localStorage.getItem(LEARNING_KEY) ?? "null")); } catch { return emptyState(); }
}
export function storeState(s: LearningState): void {
  try { localStorage.setItem(LEARNING_KEY, JSON.stringify(s)); } catch { /* storage full/blocked: learning still works in-session */ }
}
export function clearState(): void {
  try { localStorage.removeItem(LEARNING_KEY); } catch { /* ignore */ }
}
