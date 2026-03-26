export type ExerciseType = "multiple_choice" | "sort_sentence" | "fill_blank" | "quick_reaction";

export interface Exercise {
  type: ExerciseType;
  situation: string;
  question: string;
  options: string[];
  answer: number | number[] | string;
  explanation: string;
}

export interface Lesson {
  id: string;
  level: string;
  title: string;
  titleDe: string;
  icon: string;
  exercises: Exercise[];
  premium: boolean;
}

export const LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;
export type Level = (typeof LEVELS)[number];

export const LEVEL_COLORS: Record<Level, string> = {
  A1: "hsl(var(--success))",
  A2: "hsl(145, 55%, 45%)",
  B1: "hsl(var(--gold))",
  B2: "hsl(38, 91%, 55%)",
  C1: "hsl(215, 68%, 44%)",
  C2: "hsl(280, 60%, 50%)",
};

export const XP_PER_LESSON = 20;
export const XP_PER_CORRECT = 4;
export const FREE_LESSONS_PER_LEVEL = 5;
