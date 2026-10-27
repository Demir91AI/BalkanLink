import { beforeAll, describe, expect, it } from "vitest";
import { fireEvent, render, screen, within, cleanup } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import i18n from "i18next";
import { readFileSync } from "node:fs";
import SmartGuide, { sectionBlocks } from "@/components/guide-first/SmartGuide";
import KindergeldGuideContent from "@/components/KindergeldGuideContent";
import { normalizeProgress, progressKey } from "./progress";
import bs from "@/i18n/locales/bs/pages.json";
import hr from "@/i18n/locales/hr/pages.json";
import sr from "@/i18n/locales/sr/pages.json";
import de from "@/i18n/locales/de/pages.json";

const steps = [
  { id: "prepare", title: "Priprema", blocks: [{ kind: "action" as const, text: "Pronađi Steuer-ID u BZSt pismu." }] },
  { id: "submit", title: "Predaja", blocks: [{ kind: "field" as const, text: "IBAN upiši prema izvodu računa." }] },
];
beforeAll(async () => { await i18n.init({ lng: "bs", resources: { bs: { pages: bs } }, interpolation: { escapeValue: false } }); });
const show = () => render(<I18nextProvider i18n={i18n}><SmartGuide id="fixture" steps={steps} /></I18nextProvider>);

describe("minimal opt-in navigation persistence", () => {
  it("keeps only version, step and completed markers, strips sensitive extras", () => {
    expect(normalizeProgress({ version: 1, step: 1, completed: [0, 0, -1, 9, "name"], passport: "secret", child: "private" }, 2)).toEqual({ version: 1, step: 1, completed: [0] });
  });
  it("rejects stale/out-of-range states and unsafe workflow identifiers", () => {
    expect(normalizeProgress({ version: 1, step: 10, completed: [] }, 2)).toBeNull();
    expect(normalizeProgress({ version: 2, step: 0, completed: [] }, 2)).toBeNull();
    expect(progressKey("../user@example.com")).toBeNull();
    expect(progressKey("kindergeld-newborn")).toBe("bl-guide-progress-v1:kindergeld-newborn");
  });
  it("does not save automatically; explicit save/restore/delete retains no answer state", () => {
    localStorage.removeItem("bl-guide-progress-v1:fixture");
    show();
    fireEvent.click(screen.getByText(bs.smartGuideStandard.next));
    expect(localStorage.getItem("bl-guide-progress-v1:fixture")).toBeNull();
    fireEvent.click(screen.getByText(bs.smartGuideStandard.reviewed));
    fireEvent.click(screen.getByText(bs.smartGuideStandard.save));
    expect(JSON.parse(localStorage.getItem("bl-guide-progress-v1:fixture") ?? "null")).toEqual({ version: 1, step: 1, completed: [1] });
    cleanup(); show();
    fireEvent.click(screen.getByText(bs.smartGuideStandard.restore));
    expect(screen.getByRole("heading", { level: 3 }).textContent).toBe("Predaja");
    fireEvent.click(screen.getByText(bs.smartGuideStandard.forget));
    expect(localStorage.getItem("bl-guide-progress-v1:fixture")).toBeNull();
  });
});

describe("guide navigation and four-language standard", () => {
  it("Kindergeld review marks and automatically advances, final completion is not submission and can reopen/unmark", () => {
    render(<I18nextProvider i18n={i18n}><KindergeldGuideContent /></I18nextProvider>);
    const p = bs.guideFirst.kindergeld.pilot;
    fireEvent.click(screen.getByText(p.advance));
    expect(within(screen.getByTestId("smartguide-template")).getByRole("progressbar").getAttribute("aria-valuenow")).toBe("2");
    expect(screen.getByTestId("guide-reviewed-count").textContent).toBe("Pregledano 1 od 7 koraka");
    expect(screen.getByRole("button", {name:/Korak 1:.*Pregledano/}).getAttribute("data-reviewed")).toBe("true");
    for (let i=1; i<6; i++) fireEvent.click(screen.getByText(p.advance));
    fireEvent.click(screen.getByText(p.finish));
    expect(screen.getByTestId("guide-completion").textContent).toContain(p.completionBody);
    expect(screen.getByTestId("guide-reviewed-count").textContent).toBe("Pregledano 7 od 7 koraka");
    fireEvent.click(screen.getByText(p.reopen));
    expect(screen.queryByTestId("guide-completion")).toBeNull();
    fireEvent.click(screen.getByText(p.unmark));
    expect(screen.getByTestId("guide-reviewed-count").textContent).toBe("Pregledano 6 od 7 koraka");
  });
  it("non-pilot guides keep review toggling without advancing and locked steps cannot review", () => {
    show();
    fireEvent.click(screen.getByText(bs.smartGuideStandard.reviewed));
    expect(within(screen.getByTestId("smartguide-template")).getByRole("progressbar").getAttribute("aria-valuenow")).toBe("1");
    expect(screen.getByText(bs.smartGuideStandard.reviewed).closest("button")?.getAttribute("aria-pressed")).toBe("true");
    cleanup();
    render(<I18nextProvider i18n={i18n}><SmartGuide steps={steps} isLocked={() => true} lockedContent={<p>locked fixture</p>} /></I18nextProvider>);
    expect(screen.queryByText(bs.smartGuideStandard.reviewed)).toBeNull();
    expect(screen.queryByText(bs.smartGuideStandard.next)).toBeNull();
  });
  it("existing-child choice provides exact section distinctions without taking personal answers", () => {
    const {container} = render(<I18nextProvider i18n={i18n}><KindergeldGuideContent /></I18nextProvider>);
    fireEvent.click(screen.getByText(bs.guideFirst.kindergeld.pilot.existingCase));
    expect(screen.getByTestId("kg-existing").textContent).toContain("KG1 tački 5");
    expect(screen.getByTestId("kg-existing").textContent).toContain("Anlage Kind tačka 4");
    expect(screen.getByTestId("smartguide-template")).toBeTruthy();
    expect(container.querySelectorAll("input:not([type=checkbox]), textarea, select:not([data-nav])")).toHaveLength(0);
  });
  it("newborn wizard is primary without a disclosure and navigates seven actual submission steps", () => {
    render(<I18nextProvider i18n={i18n}><KindergeldGuideContent /></I18nextProvider>);
    const wizard = screen.getByTestId("smartguide-template");
    expect(wizard.closest("details")).toBeNull();
    expect(within(screen.getByTestId("smartguide-template")).getByRole("progressbar").getAttribute("aria-valuemax")).toBe("7");
    expect(screen.getByTestId("kg-field-guide")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: /Korak 5:/ }));
    expect(screen.getByTestId("kg-step-pointer")).toBeTruthy();
    expect(screen.getAllByTestId("kg-field-guide")).toHaveLength(1);
    fireEvent.click(screen.getByRole("button", { name: /Korak 7:/ }));
    expect(screen.getByText(bs.smartGuideStandard.summary)).toBeTruthy();
  });
  it("semantic content labels only field instructions with an explicit verified reference", () => {
    expect(sectionBlocks({ meaning: "Meaning", action: "Act", next: "Next" }).map((b) => b.kind)).toEqual(["meaning", "action", "next"]);
    expect(sectionBlocks({ verifiedField: { instruction: "Enter ID", reference: "" } })).toEqual([]);
    expect(sectionBlocks({ verifiedField: { instruction: "Enter ID", reference: "KG1 · 1", format: "11" } }).map((b) => b.kind)).toEqual(["field", "format"]);
  });
  it("previous/next/jump change the actual step and respect boundaries", () => {
    show();
    expect((screen.getByText(bs.smartGuideStandard.previous).closest("button") as HTMLButtonElement).disabled).toBe(true);
    fireEvent.click(screen.getByText(bs.smartGuideStandard.next));
    expect(screen.getByRole("heading", { level: 3 }).textContent).toBe("Predaja");
    fireEvent.click(screen.getByText(bs.smartGuideStandard.previous));
    fireEvent.click(screen.getByRole("button", { name: "Korak 2: Predaja" }));
    expect(screen.getByRole("heading", { level: 3 }).textContent).toBe("Predaja");
  });
  it("new standard has identical key shapes and concrete newborn checklists in all locales", () => {
    const shape = (v: unknown): unknown => v && typeof v === "object" ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, shape(x)])) : typeof v;
    for (const locale of [hr, sr, de]) expect(shape(locale.smartGuideStandard)).toEqual(shape(bs.smartGuideStandard));
    for (const locale of [hr, sr, de]) expect(shape(locale.guideFirst.kindergeld.pilot)).toEqual(shape(bs.guideFirst.kindergeld.pilot));
    for (const locale of [bs, hr, sr, de]) {
      expect(locale.smartGuideStandard.kindergeldChecks.prepare).toHaveLength(3);
      expect(locale.smartGuideStandard.kindergeldChecks.prepare.join(" ")).toContain("Steuer-ID");
      expect(locale.smartGuideStandard.kindergeldChecks.after.join(" ")).toContain("Familienkasse");
    }
  });
  it("shared presentation does not replace routes or inherited access checks", () => {
    const shared = readFileSync("src/components/guides/SmartGuideWizardShared.tsx", "utf8");
    const fallback = readFileSync("src/components/FormSmartGuide.tsx", "utf8");
    expect(shared).toContain("<SmartGuide");
    expect(shared).toContain("<AuthGate>");
    expect(shared).toContain("!free && !isPremium && i >= FREE_STEPS");
    expect(fallback).toContain("<SmartGuide");
    expect(fallback).toContain('hasManagedBackHistory("blGuideStep")');
  });
});