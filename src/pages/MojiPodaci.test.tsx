import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MojiPodaci from "./MojiPodaci";

// Mock dependencies
vi.mock("@/contexts/AuthContext", () => ({
  useAuth: () => ({
    user: { id: "u-1", email: "test@example.com" },
    signOut: vi.fn(),
  }),
}));

vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    auth: { getSession: vi.fn() },
    functions: { invoke: vi.fn() },
  },
}));

vi.mock("@/hooks/use-toast", () => ({
  toast: vi.fn(),
}));

vi.mock("@/components/SEO", () => ({
  SEO: () => null,
}));

vi.mock("@/components/navigation/PageNav", () => ({
  default: () => null,
}));

const renderPage = () =>
  render(
    <MemoryRouter>
      <MojiPodaci />
    </MemoryRouter>
  );

describe("MojiPodaci — delete confirmation gating", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const openConfirm = () => {
    renderPage();
    fireEvent.click(screen.getByRole("button", { name: /želim obrisati račun/i }));
  };

  it("shows the confirm form after clicking 'Želim obrisati račun'", () => {
    openConfirm();
    expect(screen.getByLabelText(/za potvrdu/i)).toBeInTheDocument();
  });

  it("disables submit when field is empty", () => {
    openConfirm();
    expect(screen.getByRole("button", { name: /trajno obriši/i })).toBeDisabled();
  });

  it("disables submit when wrong text is typed", () => {
    openConfirm();
    fireEvent.change(screen.getByLabelText(/za potvrdu/i), {
      target: { value: "delete" },
    });
    expect(screen.getByRole("button", { name: /trajno obriši/i })).toBeDisabled();
  });

  it("enables submit when OBRIŠI is typed (case-insensitive, trims whitespace)", () => {
    openConfirm();
    fireEvent.change(screen.getByLabelText(/za potvrdu/i), {
      target: { value: " OBRIŠI " },
    });
    expect(screen.getByRole("button", { name: /trajno obriši/i })).toBeEnabled();
  });

  it("accepts lowercase obriši and normalizes to uppercase", () => {
    openConfirm();
    fireEvent.change(screen.getByLabelText(/za potvrdu/i), {
      target: { value: "obriši" },
    });
    expect(screen.getByRole("button", { name: /trajno obriši/i })).toBeEnabled();
  });
});
