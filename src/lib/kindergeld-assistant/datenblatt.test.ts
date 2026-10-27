import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { PDFDocument } from "pdf-lib";
import { inflateSync } from "node:zlib";
import { KG_OFFICIAL, buildKindergeldDatenblatt, ibanValid, planKg, validateKg, sheetLines, type KgData, type KgFlags } from "./datenblatt";
import { KG1_MANIFEST_STATUS } from "@/lib/formularpilot/manifests/kindergeld-kg1";
import { outputLabelFor } from "@/lib/formularpilot/output-label";
import bs from "@/i18n/locales/bs/forms.json";
import hr from "@/i18n/locales/hr/forms.json";
import sr from "@/i18n/locales/sr/forms.json";
import de from "@/i18n/locales/de/forms.json";

const font = new Uint8Array(readFileSync("src/assets/fonts/liberation-sans/LiberationSans-Regular.ttf"));
const TODAY = "2026-10-27";
const kid = (vorname = "", geburtsdatum = "") => ({ vorname, geburtsdatum, geschlecht: "", familienkasse: "" });
const base = (): KgData => ({
  steuerId1: "12345678901", familienname: "Đurić-Čičak", vorname: "Šejla Žana", geburtsdatum: "1990-05-01",
  staatsangehoerigkeit: "bosnisch-herzegowinisch", strasse: "Müllerstraße 5", plz: "80331", wohnort: "München", staat: "Deutschland",
  iban: "DE89370400440532013000", kontoinhaber: "self",
  kinder: [kid("Ćamil", "2020-01-15"), kid(), kid(), kid(), kid()],
});
const flags = (o: Partial<KgFlags> = {}): KgFlags => ({ crossBorder: "no", hasPartner: "no", ...o });

async function pdfText(bytes: Uint8Array) {
  // Read raw content streams; text is hex glyph ids with Identity-H, so assert via metadata + page count.
  const doc = await PDFDocument.load(bytes);
  return { pages: doc.getPageCount(), title: doc.getTitle(), fields: doc.getForm().getFields().length };
}

describe("official provenance", () => {
  it("links match the verified BA manifest", () => {
    expect(KG_OFFICIAL.kg1).toBe(KG1_MANIFEST_STATUS.forms.kg1.officialUrl);
    expect(KG_OFFICIAL.ank).toBe(KG1_MANIFEST_STATUS.forms.kg1Ank.officialUrl);
    expect(KG_OFFICIAL.formsPage).toBe(KG1_MANIFEST_STATUS.officialPage);
    for (const u of Object.values(KG_OFFICIAL)) if (u.startsWith("http")) expect(u.startsWith("https://www.arbeitsagentur.de/")).toBe(true);
  });
  it("KG1 stays blocked and is never labelled verified official", () => {
    expect(KG1_MANIFEST_STATUS.status).toBe("blocked");
    expect(KG1_MANIFEST_STATUS.forms.kg1.blockers).toContain("BUNDLED_NOT_AUTHENTIC");
    expect(outputLabelFor({ status: "blocked", authentic: false, tested: false, rightsCleared: false, blockers: ["x"] } as never)).not.toBe("verified_official");
  });
  it("live page no longer links or fills the bundled derivative/placeholder", () => {
    const page = readFileSync("src/pages/muster/KindergeldMuster.tsx", "utf8");
    expect(page).not.toMatch(/\/muster\/kg1-/);
    expect(page).not.toMatch(/fillKindergeldPdf\(/);
    expect(page).toContain("KindergeldAssistent");
  });
});

describe("validation", () => {
  it("valid single-child case passes", () => expect(validateKg(base(), flags(), TODAY)).toEqual([]));
  it("empty data reports required fields, unanswered flags and no children", () => {
    const d = { ...base(), familienname: "", steuerId1: "", iban: "", kinder: [kid(), kid()] };
    const codes = validateKg(d, { crossBorder: "", hasPartner: "" }, TODAY).map((e) => `${e.path}:${e.code}`);
    expect(codes).toEqual(expect.arrayContaining(["crossBorder:UNANSWERED", "hasPartner:UNANSWERED", "familienname:REQUIRED", "steuerId1:REQUIRED", "iban:REQUIRED", "kinder:NO_CHILDREN"]));
  });
  it("rejects bad Steuer-ID, PLZ, IBAN, future dates and partial child", () => {
    const d = { ...base(), steuerId1: "123", plz: "123", iban: "DE89370400440532013001", kinder: [kid("A", "2030-01-01"), kid("", "2019-01-01")] };
    const codes = validateKg(d, flags(), TODAY).map((e) => `${e.path}:${e.code}`);
    expect(codes).toEqual(expect.arrayContaining(["steuerId1:INVALID_STEUER_ID", "plz:INVALID_PLZ", "iban:INVALID_IBAN", "kinder.0.geburtsdatum:DATE_IN_FUTURE", "kinder.1.vorname:REQUIRED"]));
  });
  it("partner questions only required when a partner is declared", () => {
    expect(validateKg(base(), flags({ hasPartner: "yes" }), TODAY).map((e) => e.path)).toEqual(expect.arrayContaining(["eFamilienname", "eVorname", "eGeburtsdatum"]));
  });
  it("IBAN checksum", () => { expect(ibanValid("DE89 3704 0044 0532 0130 00")).toBe(true); expect(ibanValid("DE00370400440532013000")).toBe(false); });
});

describe("branching", () => {
  it("multiple children → one Anlage Kind each", () => {
    const d = { ...base(), kinder: [kid("A", "2020-01-01"), kid("B", "2022-02-02"), kid("C", "2024-03-03"), kid(), kid()] };
    expect(planKg(d, flags(), TODAY).documents).toEqual([
      { key: "KG1", count: 1, url: KG_OFFICIAL.kg1 }, { key: "KG1-AnK", count: 3, url: KG_OFFICIAL.ank },
    ]);
  });
  it("cross-border is flagged as not fully covered, no annex is auto-selected", () => {
    const p = planKg(base(), flags({ crossBorder: "yes" }), TODAY);
    expect(p.coveredBySheet).toBe(false);
    expect(p.notes).toContain("cross_border_official_check");
    expect(p.documents.map((x) => x.key)).toEqual(["KG1", "KG1-AnK"]);
  });
  it("adult child (18+) is flagged; child turning 18 tomorrow is not", () => {
    expect(planKg({ ...base(), kinder: [kid("A", "2008-10-27")] }, flags(), TODAY).notes).toContain("adult_child_official_check");
    expect(planKg({ ...base(), kinder: [kid("A", "2008-10-28")] }, flags(), TODAY).coveredBySheet).toBe(true);
  });
});

describe("non-official PDF sheet", () => {
  it("builds a flat, non-form PDF with Unicode names and banner", async () => {
    const r = await buildKindergeldDatenblatt(base(), flags(), { today: TODAY, fontBytes: font });
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    const info = await pdfText(r.bytes);
    expect(info.fields).toBe(0);
    expect(info.title).toMatch(/nicht amtlich/);
    expect(r.text).toContain("NICHT AMTLICH");
    expect(r.text).toContain("Familienname: Đurić-Čičak");
    expect(r.text).toContain("Vorname: Šejla Žana");
    expect(r.text).toContain("Vorname: Ćamil");
    expect(r.text).toContain("IBAN: DE89 3704 0044 0532 0130 00");
    expect(r.text).toContain(KG_OFFICIAL.kg1);
    expect(r.text).not.toMatch(/garantiert(?! keinen)|amtlich geprüft|verifiziert/i);
  });
  it("is deterministic and contains only entered data (no unused partner data)", async () => {
    const d = { ...base(), eFamilienname: "Novak", eVorname: "Damir" };
    const a = await buildKindergeldDatenblatt(d, flags(), { today: TODAY, fontBytes: font });
    const b = await buildKindergeldDatenblatt(d, flags(), { today: TODAY, fontBytes: font });
    expect(a.ok && b.ok && Buffer.from(a.bytes).equals(Buffer.from(b.bytes))).toBe(true);
    if (a.ok) expect(a.text).not.toContain("Novak");
  });
  it("refuses invalid data and a changed font", async () => {
    expect((await buildKindergeldDatenblatt({ ...base(), iban: "" }, flags(), { today: TODAY, fontBytes: font })).ok).toBe(false);
    const bad = font.slice(); bad[100] ^= 1;
    const r = await buildKindergeldDatenblatt(base(), flags(), { today: TODAY, fontBytes: bad });
    expect(r).toEqual({ ok: false, code: "FONT_UNAVAILABLE" });
  });
  it("cross-border sheet states it is not complete", () => {
    const lines = sheetLines(base(), flags({ crossBorder: "yes" }), planKg(base(), flags({ crossBorder: "yes" }), TODAY)).map((l) => l.text).join("\n");
    expect(lines).toMatch(/NICHT vollständig/);
  });
  it("module has no network/storage/AI calls", () => {
    const src = readFileSync("src/lib/kindergeld-assistant/datenblatt.ts", "utf8") + readFileSync("src/components/kindergeld/KindergeldAssistent.tsx", "utf8");
    expect(src).not.toMatch(/localStorage|sessionStorage|supabase|functions\.invoke|XMLHttpRequest/);
    expect([...src.matchAll(/fetch\(([^)]*)\)/g)].map((m) => m[1])).toEqual(["fontUrl"]);
  });
});

describe("i18n", () => {
  const flat = (o: Record<string, unknown>, p = ""): string[] => Object.entries(o).flatMap(([k, v]) => (v && typeof v === "object" ? flat(v as Record<string, unknown>, `${p}${k}.`) : [`${p}${k}`]));
  const get = (j: unknown) => (j as { musterFlow: { kindergeld: Record<string, unknown> } }).musterFlow.kindergeld;
  it("assistant keys identical in bs/hr/sr/de and legacy 1:1 claims removed", () => {
    const keys = flat(get(bs)).sort();
    for (const j of [hr, sr, de]) expect(flat(get(j)).sort()).toEqual(keys);
    for (const j of [bs, hr, sr, de]) {
      const s = JSON.stringify(get(j));
      expect(s).not.toMatch(/1:1|autofillTitle/);
      expect(keys).toContain("assistant.errors.INVALID_IBAN");
    }
  });
  it("every code used by the component has a translation", () => {
    const src = readFileSync("src/components/kindergeld/KindergeldAssistent.tsx", "utf8");
    const used = [...src.matchAll(/k\("([^"]+)"\)/g)].map((m) => `assistant.${m[1]}`);
    const keys = flat(get(bs));
    for (const u of used) expect(keys).toContain(u);
  });
});
