import type { Lesson, Level } from "./trainer/types";
export type { Exercise, ExerciseType, Lesson, Level, LessonStage, ImportantPhrase, CommonMistake } from "./trainer/types";
export { LEVELS, LEVEL_COLORS, STAGE_LABELS, XP_PER_LESSON, XP_PER_CORRECT, FREE_LESSONS_PER_LEVEL, MAX_LEVEL } from "./trainer/types";

export const INDIVIDUAL_PRICES: Record<string, string> = {
  "A1": "9,99 €", "A2": "14,99 €",
  "B1": "16,99 €", "B2": "22,99 €",
  "C1": "26,99 €", "C2": "32,99 €",
};

const levelLoaders: Record<string, () => Promise<Lesson[]>> = {
  A1: () => import("./trainer/lessons-a1").then(m => m.lessonsA1),
  A2: () => import("./trainer/lessons-a2").then(m => m.lessonsA2),
  B1: () => import("./trainer/lessons-b1").then(m => m.lessonsB1),
  B2: () => import("./trainer/lessons-b2").then(m => m.lessonsB2),
  C1: () => import("./trainer/lessons-c1").then(m => m.lessonsC1),
  C2: () => import("./trainer/lessons-c2").then(m => m.lessonsC2),
};

export async function getLessonsForLevelAsync(level: string): Promise<Lesson[]> {
  const loader = levelLoaders[level];
  if (!loader) return [];
  return loader();
}

// Backward compat — returns [] synchronously, consumers migrate to Async version
export function getLessonsForLevel(_level: string): Lesson[] {
  return [];
}

export function getLessonById(id: string): Lesson | undefined {
  return undefined; // use async version
}

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
