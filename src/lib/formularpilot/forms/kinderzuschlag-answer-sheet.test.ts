// @vitest-environment node
import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { buildKizAnswerSheet, planKizDocuments, validateKiz, KIZ_LINKS, KIZ_SHEET_BANNER, type KizAnswers } from "./kinderzuschlag-answer-sheet";

const FONT = new Uint8Array(readFileSync(join(process.cwd(), "src/assets/fonts/liberation-sans/LiberationSans-Regular.ttf")));
const today = "2026-10-26";

// Synthetic family only.
const family: KizAnswers = {
  antragsteller: { familienname: "Kovač", vorname: "Maja", geburtsdatum: "1990-03-15" },
  partner: { familienname: "Novak", vorname: "Damir", geburtsdatum: "1988-11-02" },
  strasse: "Šumska Straße 4", plz: "70173", ort: "Stuttgart",
  kinder: [
    { familienname: "Novak", vorname: "Đorđe", geburtsdatum: "2018-05-01", lebtImHaushalt: true },
    { familienname: "Novak", vorname: "Ćamila", geburtsdatum: "2021-09-30", lebtImHaushalt: true },
    { familienname: "Kovač", vorname: "Žana", geburtsdatum: "2000-01-01", lebtImHaushalt: true }, // 26 → no AnK
  ],
};

async function pdfText(bytes: Uint8Array): Promise<string> {
  const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
  const doc = await pdfjs.getDocument({ data: bytes.slice(), disableFontFace: true }).promise;
  let out = "";
  for (let i = 1; i <= doc.numPages; i++) {
    const c = await (await doc.getPage(i)).getTextContent();
    out += c.items.map((x) => ("str" in x ? x.str : "")).join("\n") + "\n";
  }
  return out;
}

describe("Kinderzuschlag answer sheet (non-official)", () => {
  it("plans 1× KiZ1, 1× AnA, one AnK per child under 25 in household; both sign", () => {
    const plan = planKizDocuments(family, today);
    expect(plan.documents.map((d) => [d.key, d.count])).toEqual([["KiZ1", 1], ["KiZ1-AnA", 1], ["KiZ1-AnK", 2]]);
    expect(plan.documents[2].forChildIndexes).toEqual([0, 1]);
    expect(plan.signatures).toEqual(["antragsteller", "partner"]);
    expect(plan.notes).toContain("child_25_or_older_no_ank");
    expect(plan.delivery).toEqual({ status: "requires_official_lookup", locatorUrl: KIZ_LINKS.familienkasseLocator, onlineAlternative: KIZ_LINKS.online });
  });

  it("child turning 25 tomorrow still needs AnK; not in household → none", () => {
    const a = { ...family, kinder: [{ ...family.kinder[0], geburtsdatum: "2001-10-27" }, { ...family.kinder[1], lebtImHaushalt: false }] };
    const plan = planKizDocuments(a, today);
    expect(plan.documents[2].forChildIndexes).toEqual([0]);
    expect(plan.notes).toContain("child_not_in_household_no_ank");
  });

  it("single parent: only applicant signs", () => {
    expect(planKizDocuments({ ...family, partner: null }, today).signatures).toEqual(["antragsteller"]);
  });

  it("sheet is labelled non-official, contains BHS names, links and no postal address", async () => {
    const r = await buildKizAnswerSheet(family, { today, fontBytes: FONT });
    if (r.ok === false) throw new Error(r.code);
    const text = await pdfText(r.bytes);
    expect(text).toContain(KIZ_SHEET_BANNER[0]);
    expect(text).toContain("KEIN Antrag");
    for (const s of ["Kovač", "Đorđe", "Ćamila", "Žana", "Šumska Straße 4", "15.03.1990"]) expect(text).toContain(s);
    expect(text).toContain(KIZ_LINKS.kiz1);
    expect(text).toContain(KIZ_LINKS.ank);
    expect(text).toContain("2 × KiZ1-AnK");
    expect(text).not.toMatch(/Postfach|\b\d{5}\s+Nürnberg/);
  });

  it("validation: unanswered partner/household, no children, bad dates and PLZ", () => {
    const codes = validateKiz({
      antragsteller: { familienname: "", vorname: "Maja", geburtsdatum: "2027-01-01" },
      partner: undefined, strasse: "", plz: "123", ort: "Ulm",
      kinder: [{ familienname: "X", vorname: "Y", geburtsdatum: "2020-02-30", lebtImHaushalt: null }],
    }, today).map((e) => `${e.path}:${e.code}`);
    expect(codes).toEqual(expect.arrayContaining([
      "antragsteller.familienname:REQUIRED", "antragsteller.geburtsdatum:DATE_IN_FUTURE", "partner:UNANSWERED",
      "strasse:REQUIRED", "plz:INVALID_PLZ", "kinder.0.geburtsdatum:INVALID_DATE", "kinder.0.lebtImHaushalt:UNANSWERED",
    ]));
    expect(validateKiz({ ...family, kinder: [] }, today).map((e) => e.code)).toContain("NO_CHILDREN");
  });

  it("invalid answers or altered font never produce a sheet", async () => {
    expect((await buildKizAnswerSheet({ ...family, plz: "" }, { today, fontBytes: FONT })).ok).toBe(false);
    const bad = FONT.slice(); bad[10] ^= 1;
    expect(await buildKizAnswerSheet(family, { today, fontBytes: bad })).toEqual({ ok: false, code: "FONT_UNAVAILABLE" });
  });
});
