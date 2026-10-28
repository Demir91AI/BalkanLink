import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import "@/i18n";
import i18n from "i18next";
import { lessonsB1 } from "@/lib/trainer/lessons-b1";
import { buildCorePlan, type ExerciseRef } from "@/lib/trainer/core/core-plan";
import { LEARNING_KEY } from "@/lib/trainer/core/learning-state";

const completeLesson = vi.fn();
vi.mock("@/hooks/useTTS", () => ({ useTTS: () => ({ toggle: vi.fn(), activeId: null, playState: "idle" }) }));
vi.mock("@/hooks/useTrainerProgress", () => ({ useTrainerProgress: () => ({ completeLesson }) }));
import CoreLessonView from "./CoreLessonView";

function answer(ref: ExerciseRef, right: boolean) {
  const e = ref.exercise;
  const region = screen.getByRole("heading", { level: 3 }).parentElement!;
  const q = within(region);
  if (e.type === "sort_sentence") {
    const order = right ? (e.answer as number[]) : [...(e.answer as number[])].reverse();
    for (const i of order) q.getAllByRole("button", { name: e.options[i] }).find((b) => !(b as HTMLButtonElement).disabled)!.click();
    fireEvent.click(q.getByRole("button", { name: /Proveri|Provjeri/ }));
    return;
  }
  const correctText = e.type === "fill_blank" ? (e.answer as string) : e.options[e.answer as number];
  const text = right ? correctText : e.options.find((o) => o !== correctText)!;
  fireEvent.click(q.getAllByRole("button", { name: text })[0]);
}

describe("CoreLessonView (legacy-adapted B1 lesson, Serbian UI)", () => {
  beforeEach(() => { localStorage.clear(); completeLesson.mockReset(); });

  it("runs capped practice + checkpoint, repeats a miss, schedules review and completes the legacy ID", async () => {
    await i18n.changeLanguage("sr");
    const lesson = lessonsB1[0];
    const plan = buildCorePlan(lesson);
    const main = [...plan.practice, ...plan.checkpoint];
    render(<CoreLessonView lesson={lesson} plan={plan} onBack={() => {}} onExtra={() => {}} />);
    expect(screen.getByText(/Prilagođena postojeća lekcija/)).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Na vežbe" }));

    main.forEach((ref, i) => {
      answer(ref, i !== 0);
      // resume point is saved after each step (except the last)
      fireEvent.click(screen.getByRole("button", { name: i + 1 === main.length ? "Dalje" : "Dalje" }));
      if (i === 0) expect(JSON.parse(localStorage.getItem(LEARNING_KEY)!).resume[lesson.id].step).toBe(1);
    });
    // one missed item is repeated
    expect(screen.getByText(/Ponavljanje grešaka/)).toBeTruthy();
    answer(main[0], true);
    fireEvent.click(screen.getByRole("button", { name: "Završi lekciju" }));

    expect(screen.getByText("Osnovna lekcija završena")).toBeTruthy();
    expect(screen.getByText(`Tačno iz prvog pokušaja: ${main.length - 1} od ${main.length}.`)).toBeTruthy();
    expect(completeLesson).toHaveBeenCalledWith(lesson.id);
    const stored = JSON.parse(localStorage.getItem(LEARNING_KEY)!);
    expect(stored.resume[lesson.id]).toBeUndefined();
    expect(stored.review[main[0].key]).toMatchObject({ lessonId: lesson.id, box: 1 });
  });

  it("offers to continue from a saved resume point", async () => {
    await i18n.changeLanguage("de");
    const lesson = lessonsB1[1];
    const plan = buildCorePlan(lesson);
    const n = plan.practice.length + plan.checkpoint.length;
    localStorage.setItem(LEARNING_KEY, JSON.stringify({ v: 1, resume: { [lesson.id]: { step: 2, correct: 2, answered: 2, updatedAt: 1 } }, review: {} }));
    render(<CoreLessonView lesson={lesson} plan={plan} onBack={() => {}} onExtra={() => {}} />);
    fireEvent.click(screen.getByRole("button", { name: `Fortsetzen (Übung 3 von ${n})` }));
    expect(screen.getByText(`Übungen · 3 von ${plan.practice.length}`)).toBeTruthy();
  });
});
