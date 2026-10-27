import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import i18n from "i18next";
import KindergeldGuideContent from "@/components/KindergeldGuideContent";
import { paperGroups, KINDERGELD_PDFS } from "@/components/kindergeld/pilot-model";
import bs from "@/i18n/locales/bs/pages.json";
import hr from "@/i18n/locales/hr/pages.json";
import sr from "@/i18n/locales/sr/pages.json";
import de from "@/i18n/locales/de/pages.json";
import inventory from "../../../docs/kindergeld-final-field-inventory.json";
const setup = async (lang = "bs", locale = bs) => {
  const instance = i18n.createInstance();
  await instance.init({ lng: lang, resources: { [lang]: { pages: locale } }, interpolation: { escapeValue: false } });
  return render(<I18nextProvider i18n={instance}><KindergeldGuideContent /></I18nextProvider>);
};
const F = bs.guideFirst.kindergeld.fields;
const P = bs.guideFirst.kindergeld.pilot;
const openFields = () => fireEvent.click(screen.getByRole("button", { name: /Korak 5:/ }));
const paper = () => fireEvent.mouseDown(screen.getByRole("tab", { name: F.mode.paper }), { button: 0, ctrlKey: false });
const groups = paperGroups(F.kg1, F.ank, P.details, P.extras);

describe("Kindergeld 2.0 paper walkthrough", () => {
  it.each([["bs", bs], ["hr", hr], ["sr", sr], ["de", de]] as const)("%s exposes every audited subfield and choice in its correct numbered group", async (lang, locale) => {
    await setup(lang, locale);
    fireEvent.click(screen.getByRole("button", { name: new RegExp(locale.guideFirst.kindergeld.workflow.steps[4].title) }));
    fireEvent.mouseDown(screen.getByRole("tab", { name: locale.guideFirst.kindergeld.fields.mode.paper }), { button: 0, ctrlKey: false });
    const panel = screen.getByTestId("kg-paper-details");
    expect(inventory.expectedGroups).toBe(30);
    expect(inventory.expectedLines).toBe(174);
    let count = 0;
    for (const group of inventory.groups) {
      const button = panel.querySelector(`button[data-field-id="${group.id}"]`);
      if (!button) throw new Error(`Missing group ${group.id}`);
      fireEvent.click(button);
      expect(within(panel).getByRole("heading", { level: 3 }).textContent).toMatch(new RegExp(`^${group.position}\\.`));
      const terms = screen.getByTestId("kg-field-terms");
      expect(terms.closest("details")).toBeNull();
      expect(terms.querySelectorAll("li")).toHaveLength(group.expectedLines);
      for (const line of group.lines) {
        const node = terms.querySelector(`[data-term-id="${line.id}"]`);
        if (!node) throw new Error(`Missing ${group.id}/${line.id}`);
        const record = locale.guideFirst.kindergeld.pilot.terms[group.id as keyof typeof locale.guideFirst.kindergeld.pilot.terms].find(r => r.id === line.id);
        if (!record) throw new Error(`Missing translation ${line.id}`);
        expect(record.de).toBe(line.de);
        expect(record.translation.trim().length).toBeGreaterThan(0);
        expect(record.meaning.length).toBeGreaterThan(20);
        expect(node).toBeVisible();
        expect(node.textContent).toContain(line.de);
        expect(node.textContent).toContain(record.translation);
        expect(node.textContent).toContain(record.meaning);
        count++;
      }
    }
    expect(count).toBe(174);
    expect(panel.querySelectorAll("input,textarea,select")).toHaveLength(0);
  });
  it("pins seven statuses, three relationship rows with five choices, and separate conditional questions", () => {
    const terms = P.terms;
    expect(terms.status.slice(0, 7).map(r => r.de)).toEqual(["ledig", "verheiratet", "geschieden", "verwitwet", "in eingetragener Lebenspartnerschaft lebend", "aufgehobene Lebenspartnerschaft", "dauernd getrennt lebend"]);
    expect(terms.status[0].translation).toBe("Neoženjen/neudata");
    expect(terms.status[6].meaning).toContain("namjerava trajno održavati razdvojenost");
    const choices = ["leibliches Kind", "Adoptivkind", "Pflegekind", "Stiefkind", "Enkelkind"];
    expect(terms["ank-3"]).toHaveLength(18);
    for (let row = 0; row < 3; row++) expect(terms["ank-3"].slice(row * 6 + 1, row * 6 + 6).map(r => r.de)).toEqual(choices);
    for (const id of ["ank-5", "ank-6", "ank-7", "ank-8", "stateWork", "posting"] as const) {
      expect(terms[id].filter(r => r.de === "ja").length).toBe(id === "ank-6" ? 3 : 1);
      expect(terms[id].filter(r => r.de === "nein").length).toBe(id === "ank-6" ? 3 : 1);
    }
    expect(terms["ank-6"].some(r => r.de.startsWith("a)"))).toBe(true);
    expect(terms["ank-6"].some(r => r.de.startsWith("b)"))).toBe(true);
    expect(terms["ank-7"][0].meaning).toContain("ne samo stvarno uplaćen novac");
    expect(terms["ank-4"][0].meaning).toContain("preskoči cijelu tačku 3 (3.1–3.3)");
  });
  it.each([["bs", bs], ["hr", hr], ["sr", sr], ["de", de]] as const)("%s has 30 concrete field groups while retaining all original 20 records", async (lang, locale) => {
    await setup(lang, locale);
    fireEvent.click(screen.getByRole("button", { name: new RegExp(locale.guideFirst.kindergeld.workflow.steps[4].title) }));
    fireEvent.mouseDown(screen.getByRole("tab", { name: locale.guideFirst.kindergeld.fields.mode.paper }), { button: 0, ctrlKey: false });
    const panel = screen.getByTestId("kg-paper-details");
    expect(panel.querySelectorAll("[data-field-id]button")).toHaveLength(30);
    const records = paperGroups(locale.guideFirst.kindergeld.fields.kg1, locale.guideFirst.kindergeld.fields.ank, locale.guideFirst.kindergeld.pilot.details, locale.guideFirst.kindergeld.pilot.extras);
    expect(records).toHaveLength(30);
    for (const g of records) {
      const button = panel.querySelector(`button[data-field-id="${g.id}"]`);
      if (!button) throw new Error(g.id);
      fireEvent.click(button);
      const card = screen.getByTestId("kg-field-card");
      for (const key of ["meaning", "what", "where", "example", "mistake", "help"] as const) {
        expect(g[key].trim().length).toBeGreaterThan(5);
        expect(card.textContent).toContain(g[key]);
      }
    }
  });
  it("keeps original form/page/section order and all 20 stable record identifiers", () => {
    expect(groups.map(g => g.id)).toEqual(["kg1-0","phone","count","kg1-1","kg1-2","kg1-3","status","kg1-4","partnerAddress","kg1-5","owner","kg1-6","kg1-7","kg1-8","kg1-9","consent","ank-0","ank-1","ank-2","childAddress","ank-3","otherParent","ank-4","ank-5","ank-6","ank-7","ank-8","stateWork","posting","ank-9"]);
    for (const prefix of ["kg1", "ank"]) for (let i = 0; i < 10; i++) expect(groups.some(g => g.id === `${prefix}-${i}`)).toBe(true);
    expect(groups[22]).toMatchObject({form: "Anlage Kind", page: 2, sec: "3"});
    expect(P.details["ank-4"].meaning).toContain("3.3");
  });
  it("links the currently BA-linked original PDFs, not a generated or hosted substitute", async () => {
    await setup(); openFields(); paper();
    const panel = screen.getByTestId("kg-paper-details");
    expect(within(panel).getByRole("link").getAttribute("href")).toBe(KINDERGELD_PDFS.KG1);
    const b = panel.querySelector('button[data-field-id="ank-0"]'); if (!b) throw new Error("missing"); fireEvent.click(b);
    expect(within(panel).getByRole("link").getAttribute("href")).toBe("https://www.arbeitsagentur.de/datei/kg1-anlagekind_ba033765.pdf");
    expect(screen.getByText(P.pageConvention)).toBeTruthy();
  });
  it("switches online/paper with distinct four-topic navigation and explicit portal-order uncertainty", async () => {
    await setup(); openFields();
    fireEvent.mouseDown(screen.getByRole("tab", {name:F.mode.online}), {button:0,ctrlKey:false});
    expect(screen.getByRole("tab", {name:F.mode.online}).getAttribute("aria-selected")).toBe("true");
    expect(screen.getByTestId("kg-online-details").querySelectorAll("button[data-field-id]")).toHaveLength(4);
    expect(screen.getByText(`${P.onlineOverview} ${P.onlineUnverified}`)).toBeTruthy();
    expect(screen.getAllByTestId("kg-online-helper")).toHaveLength(4);
    expect(screen.getAllByTestId("kg-online-helper").every(e => !e.hasAttribute("open"))).toBe(true);
    paper(); expect(screen.getByTestId("kg-paper-details")).toBeTruthy();
    fireEvent.mouseDown(screen.getByRole("tab", {name:F.mode.online}), {button:0,ctrlKey:false});
    expect(screen.queryByTestId("kg-paper-details")).toBeNull();
  });
  it("field review advances with visible markers and previous/next retain boundaries", async () => {
    await setup(); openFields(); paper();
    const panel=screen.getByTestId("kg-paper-details");
    expect((within(panel).getByText(bs.smartGuideStandard.previous).closest("button") as HTMLButtonElement).disabled).toBe(true);
    fireEvent.click(within(panel).getByText(P.fieldNext));
    expect(screen.getByTestId("kg-field-card").getAttribute("data-field-id")).toBe("phone");
    expect(within(panel).getByRole("progressbar").getAttribute("aria-valuenow")).toBe("1");
    fireEvent.click(within(panel).getByText(bs.smartGuideStandard.previous));
    fireEvent.click(within(panel).getByText(P.unmark));
    expect(within(panel).getByRole("progressbar").getAttribute("aria-valuenow")).toBe("0");
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

  it.each(["adult", "cross"] as const)("%s branch hides the newborn field guide", async (c) => {
    await setup();
    fireEvent.click(screen.getByText(bs.guideFirst.kindergeld.case[c]));
    expect(screen.queryByTestId("kg-field-guide")).toBeNull();
  });

  it("contains no data-entry fields", async () => {
    const { container } = await setup();
    openFields();
    paper();

    expect(container.querySelectorAll("input:not([type=checkbox]), textarea, select:not([data-nav])").length).toBe(0);
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
  it.each([["bs", bs], ["hr", hr], ["sr", sr], ["de", de]] as const)("%s shows the paper companion first, before the wizard, with original links and a 30-field jump list", async (lang, locale) => {
    await setup(lang, locale);
    const L = locale.guideFirst.kindergeld;
    const guide = screen.getByTestId("kg-field-guide");
    expect(guide.compareDocumentPosition(screen.getByTestId("smartguide-template")) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(screen.getByRole("tab", { name: L.fields.mode.paper }).getAttribute("aria-selected")).toBe("true");
    expect(screen.getAllByTestId("kg-field-guide")).toHaveLength(1);
    expect(screen.getByTestId("kg-original-kg1").getAttribute("href")).toBe(KINDERGELD_PDFS.KG1);
    expect(screen.getByTestId("kg-original-ank").getAttribute("href")).toBe(KINDERGELD_PDFS["Anlage Kind"]);
    const jump = screen.getByTestId("kg-paper-jump") as HTMLSelectElement;
    expect(jump.querySelectorAll("option")).toHaveLength(30);
    expect(jump.querySelectorAll("optgroup")).toHaveLength(2);
    const i = groups.findIndex((g) => g.id === "status");
    fireEvent.change(jump, { target: { value: String(i) } });
    expect(screen.getByTestId("kg-field-card").getAttribute("data-field-id")).toBe("status");
    const terms = within(screen.getByTestId("kg-field-terms"));
    for (const term of L.pilot.terms.status) expect(terms.getByText(term.translation)).toBeTruthy();
    expect(L.pilot.terms.status.length).toBeGreaterThanOrEqual(7);
    fireEvent.click(screen.getByText(L.pilot.fieldNext));
    expect(screen.getByTestId("kg-field-card").getAttribute("data-field-id")).toBe(groups[i + 1].id);
  });
});
