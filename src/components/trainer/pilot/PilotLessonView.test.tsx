import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@/i18n";
import i18n from "i18next";
import { A1_PILOT_LESSONS } from "@/lib/trainer/pilot/a1-pilot-lessons";

const completeLesson = vi.fn();
vi.mock("@/hooks/useTTS", () => ({ useTTS: () => ({ toggle: vi.fn(), stop: vi.fn(), activeId: null, playState: "idle", rate: 1, setRate: vi.fn(), usingFallback: false, audioError: false }) }));
vi.mock("@/hooks/useTrainerProgress", () => ({ useTrainerProgress: () => ({ completeLesson }) }));
import PilotLessonView from "./PilotLessonView";

function solve(ex: any) {
  if (ex.kind === "gap") fireEvent.click(screen.getByRole("button", { name: ex.answer }));
  if (ex.kind === "choice") fireEvent.click(screen.getByRole("button", { name: ex.options[ex.answer] }));
  if (ex.kind === "order") for (const w of ex.answer.split(" ")) fireEvent.click(screen.getByRole("button", { name: w }));
  if (ex.kind === "match") ex.pairs.forEach((p: any, i: number) => fireEvent.click(screen.getAllByRole("button", { name: p.de })[i]));
}

describe("PilotLessonView", () => {
  it("walks through learn → practice → review of a mistake → saved completion (Croatian UI)", async () => {
    await i18n.changeLanguage("hr");
    const lesson = A1_PILOT_LESSONS[0];
    render(<PilotLessonView lesson={lesson} onBack={() => {}} />);
    expect(screen.getByText("der Vorname")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Na vježbe" }));
    const n = lesson.exercises.length;
    for (let i = 0; i < n; i++) {
      const ex = lesson.exercises[i];
      if (i === 1) fireEvent.click(screen.getByRole("button", { name: "heißt" })); // deliberate mistake on g1
      else solve(ex);
      fireEvent.click(screen.getByRole("button", { name: "Provjeri" }));
      expect(screen.getByText(i === 1 ? "Nije točno." : "Točno!")).toBeTruthy();
      fireEvent.click(screen.getByRole("button", { name: "Dalje" }));
    }
    expect(screen.getByText(/Ponavljanje/)).toBeTruthy();
    solve(lesson.exercises[1]);
    fireEvent.click(screen.getByRole("button", { name: "Provjeri" }));
    fireEvent.click(screen.getByRole("button", { name: "Dalje" }));
    expect(screen.getByText("Lekcija završena")).toBeTruthy();
    expect(screen.getByText(new RegExp(`${n - 1} od ${n}`))).toBeTruthy();
    expect(completeLesson).toHaveBeenCalledWith("a1-pilot-01");
  });
});
