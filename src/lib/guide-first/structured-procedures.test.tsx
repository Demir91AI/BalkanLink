import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import i18n from "i18next";
import KinderzuschlagGuideContent from "@/components/guides/KinderzuschlagGuideContent";
import SteuerIdGuideContent from "@/components/guides/SteuerIdGuideContent";
import bs from "@/i18n/locales/bs/pages.json";
import hr from "@/i18n/locales/hr/pages.json";
import sr from "@/i18n/locales/sr/pages.json";
import de from "@/i18n/locales/de/pages.json";
vi.mock("@/hooks/useSubscription", () => ({ useSubscription: () => ({ isPremium: true }) }));
vi.mock("@/components/AuthGate", () => ({ default: ({ children }: { children: React.ReactNode }) => children }));
describe("reviewed semantic procedures", () => {
  it.each([bs, hr, sr, de])("keeps seven newborn/KiZ steps, three IdNr steps and no invented field mappings", (locale) => {
    expect(locale.guideFirst.kindergeld.workflow.steps).toHaveLength(7);
    expect(locale.proceduralGuides.kinderzuschlag.steps).toHaveLength(7);
    expect(locale.proceduralGuides.steuerId.steps).toHaveLength(3);
    for (const workflow of Object.values(locale.proceduralGuides)) {
      for (const step of workflow.steps) {
        expect(step.sections.action.trim().length).toBeGreaterThan(30);
        expect(step.sections.next.trim().length).toBeGreaterThan(20);
        expect(step.sections).not.toHaveProperty("verifiedField");
      }
    }
    expect(JSON.stringify(locale.proceduralGuides)).not.toMatch(/297|505|2–4|4–6/);
  });
  it.each([["kinderzuschlag", KinderzuschlagGuideContent, 7], ["steuerId", SteuerIdGuideContent, 3]] as const)("%s navigates real content to its summary", async (id, Component, total) => {
    const instance = i18n.createInstance();
    await instance.init({ lng: "bs", resources: { bs: { pages: bs } }, interpolation: { escapeValue: false } });
    const { container } = render(<I18nextProvider i18n={instance}><Component /></I18nextProvider>);
    expect(screen.getByTestId("smartguide-template").getAttribute("data-workflow")).toBe(id);
    fireEvent.click(screen.getByRole("button", { name: new RegExp(`Korak ${total}:`) }));
    expect(screen.getByText(bs.smartGuideStandard.summary)).toBeTruthy();
    expect(container.querySelectorAll("textarea, select, input:not([type=checkbox])")).toHaveLength(0);
  });
});