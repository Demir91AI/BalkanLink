import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { render, screen, fireEvent } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import i18n from "i18next";
import KindergeldGuideContent from "@/components/KindergeldGuideContent";
import bs from "@/i18n/locales/bs/pages.json";
import hr from "@/i18n/locales/hr/pages.json";
import sr from "@/i18n/locales/sr/pages.json";
import de from "@/i18n/locales/de/pages.json";

const setup = async () => {
  await i18n.init({ lng: "bs", resources: { bs: { pages: bs } }, interpolation: { escapeValue: false } });
  return render(<I18nextProvider i18n={i18n}><KindergeldGuideContent /></I18nextProvider>);
};
const F = bs.guideFirst.kindergeld.fields;

describe("Kindergeld field-by-field guide", () => {
  it("newborn branch shows KG1 and Anlage Kind sections with readable field content", async () => {
    await setup();
    expect(screen.getByTestId("kg-field-guide")).toBeTruthy();
    expect(screen.getByText(F.kg1Title)).toBeTruthy();
    expect(screen.getByText(F.ankTitle)).toBeTruthy();
    fireEvent.click(screen.getByText(F.kg1[0].de));
    expect(screen.getByText(F.kg1[0].what)).toBeTruthy();
    fireEvent.click(screen.getByText(F.ank[0].de));
    expect(screen.getByText(F.ank[0].where)).toBeTruthy();
  });

  it("covers parent and child Steuer-ID, IBAN, signature and per-child Anlage Kind", () => {
    const kg1 = F.kg1.map((r) => r.de).join(" ");
    expect(kg1).toMatch(/Identifikationsnummer/);
    expect(kg1).toMatch(/IBAN/);
    expect(kg1).toMatch(/Unterschrift/);
    expect(F.ank[0].de).toMatch(/des Kindes/);
    expect(F.ankNote).toMatch(/svako dijete/);
  });

  it("does not demand a DE IBAN or always the partner tax ID", () => {
    const all = JSON.stringify(F);
    expect(all).not.toMatch(/isključivo na njemački/);
    expect(F.kg1[5].what).toMatch(/Samo kada/);
  });

  it.each(["adult", "cross"] as const)("%s branch hides the newborn field guide", async (c) => {
    await setup();
    fireEvent.click(screen.getByText(bs.guideFirst.kindergeld.case[c]));
    expect(screen.queryByTestId("kg-field-guide")).toBeNull();
  });

  it("contains no data-entry fields", async () => {
    const { container } = await setup();
    fireEvent.click(screen.getByText(F.kg1[0].de));
    expect(container.querySelectorAll("input, textarea, select").length).toBe(0);
  });

  it("all four locales have the same number of field rows", () => {
    for (const l of [hr, sr, de]) {
      expect(l.guideFirst.kindergeld.fields.kg1.length).toBe(F.kg1.length);
      expect(l.guideFirst.kindergeld.fields.ank.length).toBe(F.ank.length);
    }
  });

  it("guide components avoid translucent text colours and FormCenter scopes the dark surface", () => {
    for (const p of ["src/components/KindergeldGuideContent.tsx", "src/components/kindergeld/KindergeldFieldGuide.tsx", "src/components/guide-first/OfficialNextStep.tsx"]) {
      expect(readFileSync(p, "utf8")).not.toMatch(/text-foreground\/\d+/);
    }
    expect((readFileSync("src/pages/FormCenter.tsx", "utf8").match(/data-testid="guide-dark-surface"/g) || []).length).toBeGreaterThanOrEqual(2);
    expect(readFileSync("src/index.css", "utf8")).toMatch(/\.guide-dark-surface :where\(h1/);
  });
});
