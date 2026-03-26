import type { Lesson, Level } from "./trainer/types";
export type { Exercise, ExerciseType, Lesson, Level } from "./trainer/types";
export { LEVELS, LEVEL_COLORS, XP_PER_LESSON, XP_PER_CORRECT, FREE_LESSONS_PER_LEVEL } from "./trainer/types";

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
