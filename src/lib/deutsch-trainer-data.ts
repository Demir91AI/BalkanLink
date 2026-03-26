import type { Lesson, Level } from "./types";
export type { Exercise, ExerciseType, Lesson, Level } from "./types";
export { LEVELS, LEVEL_COLORS, XP_PER_LESSON, XP_PER_CORRECT, FREE_LESSONS_PER_LEVEL } from "./types";

import { lessonsA1 } from "./lessons-a1";
import { lessonsA2 } from "./lessons-a2";
import { lessonsB1 } from "./lessons-b1";
import { lessonsB2 } from "./lessons-b2";
import { lessonsC1 } from "./lessons-c1";
import { lessonsC2 } from "./lessons-c2";

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
