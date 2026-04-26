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
    expect(screen.getByLabelText(/ukucaj svoj email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/ukucaj.*velikim slovima/i)).toBeInTheDocument();
  });

  it("disables 'Trajno obriši' when both fields are empty", () => {
    openConfirm();
    const submit = screen.getByRole("button", { name: /trajno obriši/i });
    expect(submit).toBeDisabled();
  });

  it("disables submit when only email matches", () => {
    openConfirm();
    fireEvent.change(screen.getByLabelText(/ukucaj svoj email/i), {
      target: { value: "test@example.com" },
    });
    expect(screen.getByRole("button", { name: /trajno obriši/i })).toBeDisabled();
  });

  it("disables submit when only OBRIŠI is typed", () => {
    openConfirm();
    fireEvent.change(screen.getByLabelText(/ukucaj.*velikim slovima/i), {
      target: { value: "OBRIŠI" },
    });
    expect(screen.getByRole("button", { name: /trajno obriši/i })).toBeDisabled();
  });

  it("disables submit when OBRIŠI casing is wrong", () => {
    openConfirm();
    fireEvent.change(screen.getByLabelText(/ukucaj svoj email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/ukucaj.*velikim slovima/i), {
      target: { value: "obriši" },
    });
    expect(screen.getByRole("button", { name: /trajno obriši/i })).toBeDisabled();
  });

  it("disables submit when email does not match", () => {
    openConfirm();
    fireEvent.change(screen.getByLabelText(/ukucaj svoj email/i), {
      target: { value: "wrong@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/ukucaj.*velikim slovima/i), {
      target: { value: "OBRIŠI" },
    });
    expect(screen.getByRole("button", { name: /trajno obriši/i })).toBeDisabled();
  });

  it("enables submit when email matches (case-insensitive) AND text is exactly OBRIŠI", () => {
    openConfirm();
    fireEvent.change(screen.getByLabelText(/ukucaj svoj email/i), {
      target: { value: "TEST@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/ukucaj.*velikim slovima/i), {
      target: { value: "OBRIŠI" },
    });
    expect(screen.getByRole("button", { name: /trajno obriši/i })).toBeEnabled();
  });
});
