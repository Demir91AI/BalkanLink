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
const openFields = () => fireEvent.click(screen.getByRole("button", { name: /Korak 5: Roditelj/ }));
const paper = () => fireEvent.mouseDown(screen.getByRole("tab", { name: F.mode.paper }), { button: 0, ctrlKey: false });
const trig = (de: string) => screen.getByText((_, el) => el?.tagName === "SPAN" && !!el.textContent?.startsWith(`${de} · `)).closest("button");
const clickRow = (de: string) => { const button = trig(de); if (!button) throw new Error("Missing field trigger"); fireEvent.click(button); };

describe("Kindergeld field-by-field guide", () => {
  it.each([["bs", bs], ["hr", hr], ["sr", sr], ["de", de]] as const)("%s exposes all 20 paper records through localized mode controls", async (lang, locale) => {
    const instance = i18n.createInstance();
    await instance.init({ lng: lang, resources: { [lang]: { pages: locale } }, interpolation: { escapeValue: false } });
    render(<I18nextProvider i18n={instance}><KindergeldGuideContent /></I18nextProvider>);
    fireEvent.click(screen.getByRole("button", { name: new RegExp(locale.guideFirst.kindergeld.workflow.steps[4].title) }));
    const fields = locale.guideFirst.kindergeld.fields;
    expect(fields.short.kg1).toHaveLength(10);
    expect(fields.short.ank).toHaveLength(10);
    expect(fields.onlineGroups).toHaveLength(4);
    expect(fields.paperGroups).toHaveLength(4);
    const helpers = screen.getAllByTestId("kg-online-helper");
    expect(helpers).toHaveLength(4);
    expect(helpers.every((helper) => !helper.hasAttribute("open"))).toBe(true);
    expect(helpers.every((helper) => Boolean(helper.querySelector("p")?.textContent?.trim()))).toBe(true);
    fireEvent.mouseDown(screen.getByRole("tab", { name: fields.mode.paper }), { button: 0, ctrlKey: false });
    expect(screen.getByTestId("kg-paper-details").querySelectorAll("button[aria-expanded]")).toHaveLength(20);
  });
  it("defaults to online and switches both ways without adding a second application CTA", async () => {
    await setup(); openFields();
    expect(screen.getByRole("tab", { name: F.mode.online }).getAttribute("aria-selected")).toBe("true");
    expect(screen.queryByTestId("kg-paper-details")).toBeNull();
    expect(screen.getAllByText(bs.guideFirst.kindergeld.ctaOnline)).toHaveLength(1);
    paper();
    expect(screen.getByTestId("kg-paper-details")).toBeTruthy();
    fireEvent.mouseDown(screen.getByRole("tab", { name: F.mode.online }), { button: 0, ctrlKey: false });
    expect(screen.queryByTestId("kg-paper-details")).toBeNull();
  });

  it("online helpers are independent native disclosures, without user data entry", async () => {
    const { container } = await setup();
    openFields();
    const helpers = screen.getAllByTestId("kg-online-helper");
    helpers[0].setAttribute("open", "");
    expect(helpers[0].hasAttribute("open")).toBe(true);
    expect(helpers.slice(1).every((helper) => !helper.hasAttribute("open"))).toBe(true);
    helpers[0].removeAttribute("open");
    expect(helpers.every((helper) => !helper.hasAttribute("open"))).toBe(true);
    expect(container.querySelectorAll("input:not([type=checkbox]), textarea, select")).toHaveLength(0);
  });

  it("keeps every one of the 10 KG1 and 10 Anlage Kind explanations retrievable", async () => {
    await setup(); openFields(); paper();
    const rows = [...F.kg1, ...F.ank];
    expect(F.kg1).toHaveLength(10); expect(F.ank).toHaveLength(10);
    expect(screen.getByTestId("kg-paper-details").querySelectorAll("button[aria-expanded]")).toHaveLength(20);
    for (const r of rows) {
      clickRow(r.de);
      for (const value of [r.what, r.where, r.example, r.mistake]) expect(screen.getAllByText(value).length).toBeGreaterThan(0);
    }
  });

  it("opens only one field across thematic groups and permits closing it", async () => {
    await setup(); openFields(); paper(); clickRow(F.kg1[1].de); clickRow(F.ank[1].de);
    expect(trig(F.kg1[1].de)?.getAttribute("aria-expanded")).toBe("false");
    expect(trig(F.ank[1].de)?.getAttribute("aria-expanded")).toBe("true");
    expect(screen.getByTestId("kg-paper-details").querySelectorAll('button[aria-expanded="true"]')).toHaveLength(1);
    clickRow(F.ank[1].de);
    expect(screen.getByTestId("kg-paper-details").querySelectorAll('button[aria-expanded="true"]')).toHaveLength(0);
  });

  it("places administrative headers near the end and adult-only details last", async () => {
    await setup(); openFields(); paper();
    const buttons = Array.from(screen.getByTestId("kg-paper-details").querySelectorAll("button[aria-expanded]"));
    expect(buttons[0]).toBe(trig(F.kg1[1].de));
    expect(buttons[17]).toBe(trig(F.kg1[0].de));
    expect(buttons[18]).toBe(trig(F.ank[0].de));
    expect(buttons[19]).toBe(trig(F.ank[4].de));
    clickRow(F.ank[4].de); expect(screen.getByText(F.ank[4].what)).toBeTruthy();
  });

  it("newborn branch shows KG1 and Anlage Kind sections with readable field content", async () => {
    await setup(); openFields();
    expect(screen.getByTestId("kg-field-guide")).toBeTruthy();
    paper();
    clickRow(F.kg1[1].de);
    expect(screen.getByText(F.kg1[1].what)).toBeTruthy();
    clickRow(F.ank[1].de);
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
    const sec = (n: string) => F.ank.find((r) => r.sec === n);
    expect(sec("3")).toMatchObject({ page: 2, only: true });
    expect(sec("3")?.what).toMatch(/preskoči/);
    expect(sec("4")).toMatchObject({ page: 3 });
    expect(sec("5")?.de).toMatch(/öffentlichen Dienst/);
    expect(sec("6")).toMatchObject({ page: 3 });
    expect(sec("6")?.de).toMatch(/Geldleistungen aus dem Ausland/);
    expect(sec("7")).toMatchObject({ page: 4 });
    expect(sec("7")?.what).toMatch(/NATO/);
  });

  it("does not demand a DE IBAN, blanket partner tax ID or school proof for babies", () => {
    const all = JSON.stringify(F);
    expect(all).not.toMatch(/isključivo na njemački/);
    expect(all).not.toMatch(/sličnu davanje/);
    expect(F.kg1.find((r) => r.sec === "2")?.what).toMatch(/^Samo ako/);
  });

  it("renders the official location label in the accordion", async () => {
    await setup(); openFields();
    paper();
    expect(trig(F.kg1[5].de)?.textContent).toContain("KG1 · str. 1 · tačka 3");
    expect(trig(F.ank[7].de)?.textContent).toContain("Anlage Kind · str. 3 · tačka 6");
  });

  it.each(["adult", "cross"] as const)("%s branch hides the newborn field guide", async (c) => {
    await setup();
    fireEvent.click(screen.getByText(bs.guideFirst.kindergeld.case[c]));
    expect(screen.queryByTestId("kg-field-guide")).toBeNull();
  });

  it("contains no data-entry fields", async () => {
    const { container } = await setup();
    openFields();
    paper();
    clickRow(F.kg1[1].de);
    expect(container.querySelectorAll("input:not([type=checkbox]), textarea, select").length).toBe(0);
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
