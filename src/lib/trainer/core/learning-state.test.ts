import { beforeEach, describe, expect, it } from "vitest";
import {
  LEARNING_KEY, REVIEW_INTERVALS, clearResume, dueKeys, emptyState, gradeReview, loadState,
  parseState, saveResume, scheduleWrong, storeState,
} from "./learning-state";

const DAY = 86_400_000;
const T0 = Date.UTC(2026, 9, 28, 12);

describe("learning state (resume + spaced review)", () => {
  beforeEach(() => localStorage.clear());

  it("uses its own key and never touches the legacy progress record", () => {
    expect(LEARNING_KEY).not.toBe("balkanlink_trainer");
    const legacy = JSON.stringify({ xp: 40, streak: 2, lastDate: "", completedLessons: ["a1-01"], level: 1, _v3: true });
    localStorage.setItem("balkanlink_trainer", legacy);
    storeState(saveResume(emptyState(), "a1-02", { step: 3, correct: 2, answered: 3 }, T0));
    expect(localStorage.getItem("balkanlink_trainer")).toBe(legacy);
    expect(loadState().resume["a1-02"]).toEqual({ step: 3, correct: 2, answered: 3, updatedAt: T0 });
    expect(loadState().lastLessonId).toBe("a1-02");
  });

  it("tolerates missing, corrupt or foreign data", () => {
    expect(loadState()).toEqual(emptyState());
    localStorage.setItem(LEARNING_KEY, "{not json");
    expect(loadState()).toEqual(emptyState());
    expect(parseState({ resume: { x: { step: -1 } }, review: { y: { lessonId: 1, box: 9 } } })).toEqual(emptyState());
  });

  it("clears a resume point after completion", () => {
    const s = clearResume(saveResume(emptyState(), "b1-01", { step: 2, correct: 1, answered: 2 }, T0), "b1-01");
    expect(s.resume["b1-01"]).toBeUndefined();
  });

  it("schedules wrong answers for tomorrow and advances 1 → 3 → 7 → 14 days, then retires", () => {
    expect([...REVIEW_INTERVALS]).toEqual([1, 3, 7, 14]);
    let s = scheduleWrong(emptyState(), "a1-01:s0:e1", "a1-01", T0);
    expect(s.review["a1-01:s0:e1"]).toEqual({ lessonId: "a1-01", box: 1, due: T0 + DAY });
    expect(dueKeys(s, T0)).toEqual([]);
    expect(dueKeys(s, T0 + DAY)).toEqual(["a1-01:s0:e1"]);
    s = gradeReview(s, "a1-01:s0:e1", true, T0 + DAY);
    expect(s.review["a1-01:s0:e1"]).toMatchObject({ box: 2, due: T0 + 4 * DAY });
    s = gradeReview(s, "a1-01:s0:e1", true, T0 + 4 * DAY);
    expect(s.review["a1-01:s0:e1"]).toMatchObject({ box: 3, due: T0 + 11 * DAY });
    s = gradeReview(s, "a1-01:s0:e1", true, T0 + 11 * DAY);
    expect(s.review["a1-01:s0:e1"]).toMatchObject({ box: 4, due: T0 + 25 * DAY });
    s = gradeReview(s, "a1-01:s0:e1", true, T0 + 25 * DAY);
    expect(s.review["a1-01:s0:e1"]).toBeUndefined();
  });

  it("sends a wrong review answer back to box 1", () => {
    let s = scheduleWrong(emptyState(), "k", "a1-01", T0);
    s = gradeReview(s, "k", true, T0 + DAY);
    s = gradeReview(s, "k", false, T0 + 4 * DAY);
    expect(s.review.k).toEqual({ lessonId: "a1-01", box: 1, due: T0 + 5 * DAY });
  });
});
