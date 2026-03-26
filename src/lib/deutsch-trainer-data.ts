import type { Lesson, Level } from "./trainer/types";
export type { Exercise, ExerciseType, Lesson, Level, LessonStage, ImportantPhrase, CommonMistake } from "./trainer/types";
export { LEVELS, LEVEL_COLORS, STAGE_LABELS, XP_PER_LESSON, XP_PER_CORRECT, FREE_LESSONS_PER_LEVEL } from "./trainer/types";

import { lessonsA1 } from "./trainer/lessons-a1";
import { lessonsA2 } from "./trainer/lessons-a2";
import { lessonsB1 } from "./trainer/lessons-b1";
import { lessonsB2 } from "./trainer/lessons-b2";
import { lessonsC1 } from "./trainer/lessons-c1";
import { lessonsC2 } from "./trainer/lessons-c2";

export const lessons: Lesson[] = [
  ...lessonsA1,
  ...lessonsA2,
  ...lessonsB1,
  ...lessonsB2,
  ...lessonsC1,
  ...lessonsC2,
];

export function getLessonsForLevel(level: string): Lesson[] {
  return lessons.filter((l) => l.level === level);
}

export function getLessonById(id: string): Lesson | undefined {
  return lessons.find((l) => l.id === id);
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
