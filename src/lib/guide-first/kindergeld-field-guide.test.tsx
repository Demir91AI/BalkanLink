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
const trig = (de: string) => screen.getAllByText((_, el) => el?.tagName === "SPAN" && !!el.textContent?.endsWith(de) && el.textContent.includes(":"))[0];

describe("Kindergeld field-by-field guide", () => {
  it("newborn branch shows KG1 and Anlage Kind sections with readable field content", async () => {
    await setup();
    expect(screen.getByTestId("kg-field-guide")).toBeTruthy();
    expect(screen.getByText(F.kg1Title)).toBeTruthy();
    expect(screen.getByText(F.ankTitle)).toBeTruthy();
    fireEvent.click(trig(F.kg1[1].de));
    expect(screen.getByText(F.kg1[1].what)).toBeTruthy();
    fireEvent.click(trig(F.ank[1].de));
    expect(screen.getByText(F.ank[1].where)).toBeTruthy();
  });

  it("maps KG1 rows to the official numbered sections 1-6 on the right pages", () => {
    const sec = (n: string) => F.kg1.filter((r) => r.sec === n);
    expect(sec("1").every((r) => r.page === 1)).toBe(true);
    expect(sec("3")[0].de).toMatch(/Zahlungsweg – IBAN/);
    for (const n of ["4", "5", "6"]) expect(sec(n)[0]).toMatchObject({ page: 2, only: true });
    expect(sec("2")[0].de).toMatch(/gemeinsamen Haushalt/);
    expect(sec("2")[0].only).toBe(true);
    expect(sec("1")[0].where).toMatch(/elektronische Lohnsteuerbescheinigung/);
    expect(JSON.stringify(F.kg1)).not.toMatch(/Leistungen im Ausland/);
  });

  it("maps Anlage Kind sections 4-7 to pages 3-4 and skips section 3 for newborns", () => {
    const sec = (n: string) => F.ank.find((r) => r.sec === n)!;
    expect(sec("3")).toMatchObject({ page: 2, only: true });
    expect(sec("3").what).toMatch(/preskoči/);
    expect(sec("4")).toMatchObject({ page: 3 });
    expect(sec("5").de).toMatch(/öffentlichen Dienst/);
    expect(sec("6")).toMatchObject({ page: 3 });
    expect(sec("6").de).toMatch(/Geldleistungen aus dem Ausland/);
    expect(sec("7")).toMatchObject({ page: 4 });
    expect(sec("7").what).toMatch(/NATO/);
  });

  it("does not demand a DE IBAN, blanket partner tax ID or school proof for babies", () => {
    const all = JSON.stringify(F);
    expect(all).not.toMatch(/isključivo na njemački/);
    expect(all).not.toMatch(/sličnu davanje/);
    expect(F.kg1.find((r) => r.sec === "2")!.what).toMatch(/^Samo ako/);
  });

  it("renders the official location label in the accordion", async () => {
    await setup();
    expect(trig(F.kg1.find((r) => r.sec === "3")!.de).textContent).toMatch(/^KG1 · str\. 1 · tačka 3:/);
    expect(trig(F.ank.find((r) => r.sec === "6")!.de).textContent).toMatch(/^Anlage Kind · str\. 3 · tačka 6:/);
  });

  it.each(["adult", "cross"] as const)("%s branch hides the newborn field guide", async (c) => {
    await setup();
    fireEvent.click(screen.getByText(bs.guideFirst.kindergeld.case[c]));
    expect(screen.queryByTestId("kg-field-guide")).toBeNull();
  });

  it("contains no data-entry fields", async () => {
    const { container } = await setup();
    fireEvent.click(trig(F.kg1[1].de));
    expect(container.querySelectorAll("input, textarea, select").length).toBe(0);
  });

  it("all four locales have the same number of field rows", () => {
    for (const l of [hr, sr, de]) {
      expect(l.guideFirst.kindergeld.fields.kg1.length).toBe(F.kg1.length);
      expect(l.guideFirst.kindergeld.fields.ank.length).toBe(F.ank.length);
      const strip = (rows: typeof F.kg1) => rows.map(({ form, page, sec, de, only }) => ({ form, page, sec, de, only }));
      expect(strip(l.guideFirst.kindergeld.fields.kg1)).toEqual(strip(F.kg1));
      expect(strip(l.guideFirst.kindergeld.fields.ank)).toEqual(strip(F.ank));
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
