/**
 * Core-lesson plan for every legacy lesson (A1–C2).
 *
 * Legacy lessons keep all their data. A core plan is a deterministic, capped
 * selection from that data (no generation, no AI): validated, de-duplicated
 * exercises for a 10–15 minute session, plus a short checkpoint. Lessons with an
 * authored standardized lesson are marked "standardized"; all others are
 * "legacy-adapted" and flagged for curriculum completion.
 */
import type { Exercise, Lesson } from "@/lib/trainer/types";
import { getStandardizedFor } from "./authored-lessons";

export const CORE_PRACTICE_CAP = 6;
export const CORE_CHECKPOINT_CAP = 3;
export const CORE_PHRASE_CAP = 6;
export const CORE_MISTAKE_CAP = 3;

export type CoreStatus = "standardized" | "legacy-adapted";

export interface ExerciseRef {
  /** Stable key: `${lessonId}:s${stage}:e${index}` — used for resume and review. */
  key: string;
  exercise: Exercise;
}

export interface CorePlan {
  lessonId: string;
  status: CoreStatus;
  standardizedId?: string;
  practice: ExerciseRef[];
  checkpoint: ExerciseRef[];
  phrases: { de: string; context: string }[];
  mistakes: { wrong: string; correct: string; tip: string }[];
  /** Exercises not in the core: available as optional extra practice. */
  extraCount: number;
}

/** Structural validity of a legacy exercise (answer must be reachable). */
export function isValidExercise(e: Exercise): boolean {
  if (!e || !Array.isArray(e.options) || e.options.length < 2 || !e.question) return false;
  switch (e.type) {
    case "multiple_choice":
    case "quick_reaction":
      return typeof e.answer === "number" && Number.isInteger(e.answer) && e.answer >= 0 && e.answer < e.options.length;
    case "fill_blank":
      return typeof e.answer === "string" && e.options.includes(e.answer) && e.question.includes("___");
    case "sort_sentence": {
      const a = e.answer;
      return Array.isArray(a) && a.length === e.options.length && new Set(a).size === a.length && a.every((i) => i >= 0 && i < e.options.length);
    }
    default:
      return false;
  }
}

function signature(e: Exercise): string {
  const ans = Array.isArray(e.answer) ? e.answer.map((i) => e.options[i]).join(" ") : typeof e.answer === "number" ? e.options[e.answer] : e.answer;
  return `${e.question.trim()}|${String(ans).trim()}`;
}

/** Unique, valid exercises of given stages, in original order, with stable keys. */
export function uniqueRefs(lesson: Lesson, stages: number[], seen = new Set<string>()): ExerciseRef[] {
  const out: ExerciseRef[] = [];
  for (const si of stages) {
    (lesson.stages[si]?.exercises ?? []).forEach((exercise, ei) => {
      if (!isValidExercise(exercise)) return;
      const sig = signature(exercise);
      if (seen.has(sig)) return;
      seen.add(sig);
      out.push({ key: `${lesson.id}:s${si}:e${ei}`, exercise });
    });
  }
  return out;
}

/** Pick up to `cap` refs maximizing exercise-type variety (round-robin by type, stable). */
export function pickVaried(refs: ExerciseRef[], cap: number): ExerciseRef[] {
  const byType = new Map<string, ExerciseRef[]>();
  for (const r of refs) { const k = r.exercise.type; if (!byType.has(k)) byType.set(k, []); byType.get(k)!.push(r); }
  const lists = [...byType.values()];
  const picked: ExerciseRef[] = [];
  for (let round = 0; picked.length < cap && lists.some((l) => l.length > round); round++) {
    for (const l of lists) { if (picked.length >= cap) break; if (l[round]) picked.push(l[round]); }
  }
  const order = new Map(refs.map((r, i) => [r.key, i]));
  return picked.sort((a, b) => order.get(a.key)! - order.get(b.key)!);
}

export function buildCorePlan(lesson: Lesson): CorePlan {
  const seen = new Set<string>();
  const basics = uniqueRefs(lesson, [0, 1], seen);
  const practice = pickVaried(basics, CORE_PRACTICE_CAP);
  const used = new Set(practice.map((p) => p.key));
  // Checkpoint prefers the "Realität" stage; falls back to unused basics.
  const reality = uniqueRefs(lesson, [2], seen);
  const checkpoint = pickVaried([...reality, ...basics.filter((b) => !used.has(b.key))], CORE_CHECKPOINT_CAP);

  const phraseSeen = new Set<string>();
  const phrases = lesson.importantPhrases.filter((p) => {
    const k = p.de.trim(); if (!k || phraseSeen.has(k)) return false; phraseSeen.add(k); return true;
  }).slice(0, CORE_PHRASE_CAP);

  const total = lesson.stages.reduce((n, s) => n + s.exercises.length, 0);
  const std = getStandardizedFor(lesson.id);
  return {
    lessonId: lesson.id,
    status: std ? "standardized" : "legacy-adapted",
    standardizedId: std?.id,
    practice,
    checkpoint,
    phrases,
    mistakes: lesson.commonMistakes.slice(0, CORE_MISTAKE_CAP),
    extraCount: Math.max(0, total - practice.length - checkpoint.length),
  };
}

/** Deterministic correctness check for legacy exercise answers (used by review). */
export function isCorrectLegacy(e: Exercise, value: number | string | number[]): boolean {
  if (Array.isArray(e.answer)) return Array.isArray(value) && value.length === e.answer.length && value.every((v, i) => v === (e.answer as number[])[i]);
  return value === e.answer;
}
