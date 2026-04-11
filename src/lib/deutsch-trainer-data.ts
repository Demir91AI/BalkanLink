import type { Lesson, Level } from "./trainer/types";
export type { Exercise, ExerciseType, Lesson, Level, LessonStage, ImportantPhrase, CommonMistake } from "./trainer/types";
export { LEVELS, LEVEL_COLORS, STAGE_LABELS, XP_PER_LESSON, XP_PER_CORRECT, FREE_LESSONS_PER_LEVEL, MAX_LEVEL } from "./trainer/types";

export const INDIVIDUAL_PRICES: Record<string, string> = {
  "A1": "9,99 €", "A2": "14,99 €",
  "B1": "16,99 €", "B2": "22,99 €",
  "C1": "26,99 €", "C2": "32,99 €",
};

const levelModules: Record<string, () => Promise<{ default?: Lesson[]; [key: string]: any }>> = {
  A1: () => import("./trainer/lessons-a1"),
  A2: () => import("./trainer/lessons-a2"),
  B1: () => import("./trainer/lessons-b1"),
  B2: () => import("./trainer/lessons-b2"),
  C1: () => import("./trainer/lessons-c1"),
  C2: () => import("./trainer/lessons-c2"),
};

const loadedLevels: Partial<Record<string, Lesson[]>> = {};

export async function loadLessonsForLevel(level: string): Promise<Lesson[]> {
  if (loadedLevels[level]) return loadedLevels[level]!;
  const mod = await levelModules[level]?.();
  if (!mod) return [];
  const key = `lessons${level}` as string;
  const data = (mod[key] ?? mod.default ?? []) as Lesson[];
  loadedLevels[level] = data;
  return data;
}

export function getLessonsForLevel(level: string): Lesson[] {
  return loadedLevels[level] ?? [];
}

export async function getLessonsForLevelAsync(level: string): Promise<Lesson[]> {
  return loadLessonsForLevel(level);
}

export function getLessonById(id: string): Lesson | undefined {
  for (const lessons of Object.values(loadedLevels)) {
    const found = lessons?.find(l => l.id === id);
    if (found) return found;
  }
  return undefined;
}

export const lessons: Lesson[] = [];

/** Shuffle MC/QR options at runtime for variety */
export function shuffleExercise(exercise: import("./trainer/types").Exercise): import("./trainer/types").Exercise {
  if (
    (exercise.type === "multiple_choice" || exercise.type === "quick_reaction") &&
    typeof exercise.answer === "number"
  ) {
    const indices = exercise.options.map((_, i) => i);
    const shuffled = [...indices].sort(() => Math.random() - 0.5);
    return {
      ...exercise,
      options: shuffled.map((i) => exercise.options[i]),
      answer: shuffled.indexOf(exercise.answer),
    };
  }
  if (exercise.type === "fill_blank") {
    const opts = [...exercise.options].sort(() => Math.random() - 0.5);
    return { ...exercise, options: opts };
  }
  return exercise;
}
