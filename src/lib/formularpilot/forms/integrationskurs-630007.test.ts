import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { PDFDocument, PDFTextField, PDFCheckBox, PDFName, PDFDict } from "pdf-lib";
import {
  prepareIk630007, validateIkAnswers, buildIkFills, IK_F, IK_MANIFEST, IK_EDITIONS, type IkAnswers,
} from "./integrationskurs-630007";

const TEMPLATE = new Uint8Array(readFileSync(join(process.cwd(), "public/muster/integrationskurs-bamf-630007.pdf")));
const today = "2026-10-26";
const TEST = { today, allowNonCurrentEditionForTesting: true };

// Synthetic people only.
const maja: IkAnswers = {
  familienname: "Šuster", vorname: "Lea", geburtsname: "Žagar", geburtsdatum: "1990-03-15", geschlecht: "w",
  strasse: "Müllerstraße 12a", plz: "80331", ort: "München", staatsangehoerigkeit: "bosnisch-herzegowinisch",
  einreiseJahr: "2023", email: "maja.test@example.org", status: "sonstig",
  declKeineSchulischeAusbildung: true, declAngabenRichtig: true, declEinwilligung: true,
  unterschriftOrt: "München", unterschriftDatum: "2026-10-20",
};
const damir: IkAnswers = {
  ...maja, familienname: "Novak", vorname: "Damir", geburtsname: undefined, geschlecht: "m", email: undefined,
  einreiseJahr: undefined, status: "eu", staatsangehoerigkeit: "kroatisch", strasse: "Großer Weg 3", plz: "01067", ort: "Dresden",
  unterschriftOrt: "Dresden",
  kostenbefreiung: { grund: "beschaeftigt", kinderAnzahl: "2", declAngabenRichtig: true },
};

async function readBack(bytes: Uint8Array) {
  const f = (await PDFDocument.load(bytes)).getForm();
  const out: Record<string, string | boolean> = {};
  for (const x of f.getFields()) {
    if (x instanceof PDFTextField) out[x.getName()] = x.getText() ?? "";
    else if (x instanceof PDFCheckBox) out[x.getName()] = x.isChecked();
  }
  return out;
}

describe("BAMF 630.007 — golden fill (bundled 01/2026, test-only edition override)", () => {
  it("Lea: all mapped fields read back exactly, incl. Š/ž/ü/ß; page 2 untouched", async () => {
    const r = await prepareIk630007(TEMPLATE, maja, TEST);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    const v = await readBack(r.bytes);
    expect(v[IK_F.name]).toBe("Šuster");
    expect(v[IK_F.geburtsname]).toBe("Žagar");
    expect(v[IK_F.geburtsdatum]).toBe("15.03.1990");
    expect(v[IK_F.strasse]).toBe("Müllerstraße 12a");
    expect(v[IK_F.ort]).toBe("München");
    expect(v[IK_F.w]).toBe(true);
    expect(v[IK_F.m]).toBe(false);
    expect(v[IK_F.stSonstig]).toBe(true);
    expect(v[IK_F.ortDatum1]).toBe("München, 20.10.2026");
    expect(v[IK_F.ortDatum2]).toBe("");
    expect(v[IK_F.kbSgb2]).toBe(false);
    expect(v[IK_F.co]).toBe("");
    expect(r.instructions.signatures).toEqual(["page1_signature"]);
    expect(r.instructions.delivery.status).toBe("requires_official_lookup");
  });

  it("Damir: cost exemption branch fills page 2 + child count, adds proof + second signature", async () => {
    const r = await prepareIk630007(TEMPLATE, damir, TEST);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    const v = await readBack(r.bytes);
    expect(v[IK_F.stEu]).toBe(true);
    expect(v[IK_F.kbBeschaeftigt]).toBe(true);
    expect(v[IK_F.kbKinder]).toBe("2");
    expect(v[IK_F.ortDatum2]).toBe("Dresden, 20.10.2026");
    expect(v[IK_F.email]).toBe("");
    expect(r.instructions.signatures).toEqual(["page1_signature", "page2_signature"]);
    expect(r.instructions.attachments).toContain("copy_current_payslip_or_contract_and_child_allowance_proof");
  });

  it("§24 and §25(5) both tick the same native box; only §25(5) blocks exemption", async () => {
    expect(buildIkFills({ ...maja, status: "ae_24" }).some((f) => f.name === IK_F.stAe24_25)).toBe(true);
    expect(validateIkAnswers({ ...maja, status: "ae_24", kostenbefreiung: { grund: "sgb2_3", declAngabenRichtig: true } }, today)).toEqual([]);
    expect(validateIkAnswers({ ...maja, status: "ae_25_5", kostenbefreiung: { grund: "sgb2_3", declAngabenRichtig: true } }, today))
      .toContainEqual({ field: "kostenbefreiung", code: "COST_EXEMPTION_NOT_NEEDED" });
  });

  it("printable: every filled text field has an appearance stream; ticked boxes show /On", async () => {
    const r = await prepareIk630007(TEMPLATE, damir, TEST);
    if (r.ok === false) throw new Error(r.code);
    const form = (await PDFDocument.load(r.bytes)).getForm();
    for (const f of buildIkFills(damir)) {
      const w = form.getField(f.name).acroField.getWidgets()[0];
      const ap = w.dict.lookup(PDFName.of("AP"));
      expect(ap instanceof PDFDict && ap.has(PDFName.of("N")), f.name).toBe(true);
      if (f.type === "check") expect(String(w.dict.get(PDFName.of("AS"))), f.name).toBe("/On");
    }
  });

  it("concurrent prepares never mix data", async () => {
    const [a, b] = await Promise.all([prepareIk630007(TEMPLATE, maja, TEST), prepareIk630007(TEMPLATE, damir, TEST)]);
    if (!a.ok || !b.ok) throw new Error("expected ok");
    expect((await readBack(a.bytes))[IK_F.name]).toBe("Šuster");
    expect((await readBack(b.bytes))[IK_F.name]).toBe("Novak");
  });

  it("template bytes are not mutated", async () => {
    const copy = TEMPLATE.slice();
    await prepareIk630007(TEMPLATE, maja, TEST);
    expect(Buffer.compare(Buffer.from(copy), Buffer.from(TEMPLATE))).toBe(0);
  });
});

describe("BAMF 630.007 — fail-closed gates", () => {
  it("production gate refuses the bundled edition (superseded by 07/2026)", async () => {
    const r = await prepareIk630007(TEMPLATE, maja, { today });
    expect(r).toEqual({ ok: false, code: "EDITION_NOT_CURRENT" });
    expect(IK_EDITIONS.some((e) => e.status === "current_verified")).toBe(false);
  });

  it("changed bytes → hash mismatch", async () => {
    const doc = await PDFDocument.load(TEMPLATE);
    doc.setTitle("tampered");
    const r = await prepareIk630007(await doc.save(), maja, TEST);
    expect(r.ok).toBe(false);
    if (r.ok === false) {
      expect(r.code).toBe("PREFLIGHT_FAILED");
      expect(r.preflight?.some((i) => i.code === "HASH_MISMATCH")).toBe(true);
    }
  });

  it("renamed field in a look-alike PDF → MISSING_FIELD (no guessing)", async () => {
    const doc = await PDFDocument.create();
    const form = doc.getForm();
    const page = doc.addPage();
    for (const [n, t] of Object.entries(IK_MANIFEST.fields)) {
      const name = n === IK_F.name ? "Familienname" : n;
      if (t === "checkbox") form.createCheckBox(name).addToPage(page);
      else form.createTextField(name).addToPage(page);
    }
    const r = await prepareIk630007(await doc.save(), maja, { ...TEST });
    expect(r.ok).toBe(false);
    if (r.ok === false) expect(r.preflight).toContainEqual(expect.objectContaining({ code: "MISSING_FIELD", field: IK_F.name }));
  });

  it("č/ć/đ cannot be drawn by the form font → UNSUPPORTED_GLYPHS (never invisible/garbled print)", async () => {
    const r = await prepareIk630007(TEMPLATE, { ...maja, familienname: "Kovač", geburtsname: "Đurić" }, TEST);
    expect(r).toEqual({ ok: false, code: "UNSUPPORTED_GLYPHS", fields: [IK_F.geburtsname, IK_F.name].sort() });
  });

  it("long text that would be cut off → TEXT_OVERFLOW", async () => {
    const r = await prepareIk630007(TEMPLATE, { ...maja, strasse: "Sehr-lange-Straßenbezeichnung-für-Testzwecke-ohne-Ende 123456789 Hinterhaus links" }, TEST);
    expect(r).toEqual({ ok: false, code: "TEXT_OVERFLOW", fields: [IK_F.strasse] });
  });

  it("garbage bytes → PREFLIGHT_FAILED", async () => {
    const r = await prepareIk630007(new TextEncoder().encode("not found"), maja, TEST);
    expect(r.ok === false && r.code).toBe("PREFLIGHT_FAILED");
  });
});

describe("BAMF 630.007 — validation", () => {
  const codes = (a: IkAnswers) => validateIkAnswers(a, today).map((e) => `${e.field}:${e.code}`);

  it("valid profiles pass", () => {
    expect(codes(maja)).toEqual([]);
    expect(codes(damir)).toEqual([]);
  });

  it("blank form lists every required item, nothing defaulted", () => {
    const empty: IkAnswers = {
      familienname: "", vorname: "", geburtsdatum: "", geschlecht: "", strasse: "", plz: "", ort: "",
      staatsangehoerigkeit: "", status: "", declKeineSchulischeAusbildung: false, declAngabenRichtig: false,
      declEinwilligung: false, unterschriftOrt: "", unterschriftDatum: "",
    };
    expect(codes(empty).sort()).toEqual([
      "declAngabenRichtig:DECLARATION_REQUIRED", "declEinwilligung:DECLARATION_REQUIRED",
      "declKeineSchulischeAusbildung:DECLARATION_REQUIRED", "familienname:REQUIRED", "geburtsdatum:REQUIRED",
      "geschlecht:REQUIRED", "ort:REQUIRED", "plz:REQUIRED", "staatsangehoerigkeit:REQUIRED", "status:REQUIRED",
      "strasse:REQUIRED", "unterschriftDatum:REQUIRED", "unterschriftOrt:REQUIRED", "vorname:REQUIRED",
    ]);
  });

  it("rejects impossible/future dates, bad PLZ/email/year", () => {
    expect(codes({ ...maja, geburtsdatum: "1990-02-30" })).toContain("geburtsdatum:INVALID_DATE");
    expect(codes({ ...maja, geburtsdatum: "2027-01-01" })).toContain("geburtsdatum:DATE_IN_FUTURE");
    expect(codes({ ...maja, geburtsdatum: "1890-01-01" })).toContain("geburtsdatum:IMPLAUSIBLE_BIRTHDATE");
    expect(codes({ ...maja, unterschriftDatum: "2026-12-01" })).toContain("unterschriftDatum:DATE_IN_FUTURE");
    expect(codes({ ...maja, plz: "8033" })).toContain("plz:INVALID_PLZ");
    expect(codes({ ...maja, email: "maja@" })).toContain("email:INVALID_EMAIL");
    expect(codes({ ...maja, einreiseJahr: "1985" })).toContain("einreiseJahr:INVALID_YEAR");
  });

  it("exemption branch needs reason, child count only when employed", () => {
    expect(codes({ ...maja, kostenbefreiung: { grund: "", declAngabenRichtig: true } })).toContain("kostenbefreiung.grund:REQUIRED");
    expect(codes({ ...maja, kostenbefreiung: { grund: "beschaeftigt", declAngabenRichtig: true } })).toContain("kostenbefreiung.kinderAnzahl:REQUIRED");
    expect(codes({ ...maja, kostenbefreiung: { grund: "beschaeftigt", kinderAnzahl: "zwei", declAngabenRichtig: true } })).toContain("kostenbefreiung.kinderAnzahl:INVALID_CHILD_COUNT");
    expect(codes({ ...maja, kostenbefreiung: { grund: "sgb12", kinderAnzahl: "1", declAngabenRichtig: true } })).toContain("kostenbefreiung.kinderAnzahl:CHILD_COUNT_NOT_APPLICABLE");
    expect(codes({ ...maja, kostenbefreiung: { grund: "sgb12", declAngabenRichtig: false } })).toContain("kostenbefreiung.declAngabenRichtig:DECLARATION_REQUIRED");
  });

  it("validation failure blocks prepare before touching the PDF", async () => {
    const r = await prepareIk630007(TEMPLATE, { ...maja, plz: "" }, TEST);
    expect(r.ok === false && r.code).toBe("VALIDATION_FAILED");
  });
});
