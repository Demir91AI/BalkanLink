import { describe, expect, it } from "vitest";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { PDFDocument } from "pdf-lib";
import { RESIDENCE_FIELDS, residenceSpec, residenceFills, validateResidenceAnnex, fillResidenceForTesting, type ResidenceAnnexAnswers } from "./elterngeld-anlage-residence";
const today = "2026-11-26";
const fixture = (): ResidenceAnnexAnswers => ({
  parent: { vorname: "Maja", nachname: "Kovač", geburtsdatum: "1992-03-14" }, child: { vorname: "Lana", nachname: "Kovač", geburtsdatum: "2026-09-10" },
  livesOutsideGermany: true, address: { country: "Bosnien und Herzegowina", street: "Musterstraße", houseNumber: "12", addition: "c/o Familie", postalCode: "71000", city: "Sarajevo" },
  stay: { kind: "limited", from: "2026-01", to: "2027-01" }, worksInGermanyOrGermanContract: false, otherWorksInGermanyOrGermanContract: true,
  hasGermanEmployer: true, employerSeat: { postalCode: "20095", city: "Hamburg" }, availablePostingProofsAttached: true,
});
describe("Wohnsitz im Ausland exact printed conditions", () => {
  it("residence trigger explicit, not inferred from nationality or address", () => {
    expect(validateResidenceAnnex(fixture(), today)).toEqual([]);
    expect(validateResidenceAnnex({ ...fixture(), livesOutsideGermany: false }, today)).toContainEqual({ field: "livesOutsideGermany", code: "annex_trigger_required" });
  });
  it("other employment question only after NO; YES skips it and leaves native boxes blank", () => {
    const a = { ...fixture(), worksInGermanyOrGermanContract: true };
    expect(validateResidenceAnnex(a, today)).toContainEqual({ field: "otherWorksInGermanyOrGermanContract", code: "not_applicable" });
    delete a.otherWorksInGermanyOrGermanContract;
    expect(validateResidenceAnnex(a, today)).toEqual([]);
    expect(residenceFills(a).some((f) => ["2cKontrollkästchen5", "2cKontrollkästchen6"].includes(f.name))).toBe(false);
    expect(residenceFills(a)).toContainEqual({ name: "2cKontrollkästchen3", type: "check" });
  });
  it("NO requires explicit other answer, without inferring eligibility", () => {
    const a = fixture(); delete a.otherWorksInGermanyOrGermanContract;
    expect(validateResidenceAnnex(a, today)).toContainEqual({ field: "otherWorksInGermanyOrGermanContract", code: "required" });
    a.otherWorksInGermanyOrGermanContract = false;
    expect(validateResidenceAnnex(a, today)).toEqual([]);
    expect(residenceFills(a)).toContainEqual({ name: "2cKontrollkästchen6", type: "check" });
  });
  it("limited/unlimited stay exclusive and dates filled as months, never invented day", () => {
    expect(residenceFills(fixture())).toContainEqual({ name: "2c Aufenth befristet von", type: "text", value: "01.2026" });
    const a = { ...fixture(), stay: { kind: "unlimited" as const, since: "2020-03" } };
    expect(validateResidenceAnnex(a, today)).toEqual([]);
    expect(residenceFills(a)).toContainEqual({ name: "2c Aufenth unbefristet seit", type: "text", value: "03.2020" });
    expect(residenceFills(a).some((f) => f.name.startsWith("2c Aufenth befristet"))).toBe(false);
    expect(validateResidenceAnnex({ ...a, stay: { ...a.stay, to: "hidden" } } as never, today).map((e) => e.code)).toContain("hidden_answers");
  });
  it("foreign postal code is not constrained as DE; employer seat uses DE5-digit postcode", () => {
    const a = fixture(); a.address.postalCode = "SW1A 1AA";
    expect(validateResidenceAnnex(a, today)).toEqual([]);
    a.employerSeat = { postalCode: "SW1A 1AA", city: "London" };
    expect(validateResidenceAnnex(a, today).map((e) => e.code)).toContain("german_plz_city");
  });
  it("no German employer means no orphaned seat, available proofs acknowledged", () => {
    const a = fixture(); a.hasGermanEmployer = false; a.availablePostingProofsAttached = false;
    expect(validateResidenceAnnex(a, today).map((e) => e.code)).toEqual(["not_applicable", "available_proofs_required"]);
  });
  it("impossible person dates, reversed/future stay starts and unsafe text blocked", () => {
    const a = fixture(); a.parent.geburtsdatum = "1992-02-30"; a.stay = { kind: "limited", from: "2027-02", to: "2027-01" }; a.address.city = "a\nb";
    expect(validateResidenceAnnex(a, today).map((e) => e.code)).toEqual(expect.arrayContaining(["date", "month_range", "required_safe_text"]));
  });
  it("all23 native fields covered with mutually exclusive checkbox groups", () => {
    const seen = new Set<string>();
    for (const unlimited of [false, true]) for (const work of [false, true]) for (const other of [false, true]) {
      const a = fixture(); if (unlimited) a.stay = { kind: "unlimited", since: "2020-03" };
      a.worksInGermanyOrGermanContract = work; if (work) delete a.otherWorksInGermanyOrGermanContract; else a.otherWorksInGermanyOrGermanContract = other;
      expect(validateResidenceAnnex(a, today)).toEqual([]);
      const f = residenceFills(a); f.forEach((x) => seen.add(x.name));
      for (const ns of [[1, 2], [3, 4], [5, 6]]) expect(f.filter((x) => ns.some((n) => x.name === `2cKontrollkästchen${n}`)).length).toBeLessThanOrEqual(1);
    }
    expect(Object.keys(RESIDENCE_FIELDS)).toHaveLength(23); expect([...seen].sort()).toEqual(Object.keys(RESIDENCE_FIELDS).sort());
    expect(residenceSpec("SH")).toBeNull(); expect(residenceSpec("BB")).toBeNull(); expect(residenceSpec("TH")).toBeNull();
  });
});
const dir = process.env.EG_RESIDENCE_DIR;
describe.runIf(Boolean(dir && existsSync(dir)))("authentic HH/RP residence originals (internal only)", () => {
  for (const land of ["HH", "RP"] as const) for (const kind of ["limited", "unlimited"] as const) it(`${land}/${kind}`, async () => {
    if (!dir) throw new Error("EG_RESIDENCE_DIR required");
    const a = fixture(); if (kind === "unlimited") a.stay = { kind, since: "2020-03" };
    const r = await fillResidenceForTesting(land, new Uint8Array(readFileSync(`${dir}/${land}_residence.pdf`)), a, today, { fontBytes: new Uint8Array(readFileSync("src/assets/fonts/liberation-sans/LiberationSans-Regular.ttf")) });
    expect(r.ok ? "ok" : JSON.stringify(r)).toBe("ok"); if (!r.ok || !("bytes" in r)) return;
    const pdf = await PDFDocument.load(r.bytes), f = pdf.getForm();
    expect(pdf.getPageCount()).toBe(2); expect(pdf.isEncrypted).toBe(false); expect(f.hasXFA()).toBe(false); expect(f.getFields()).toHaveLength(23);
    for (const x of residenceFills(a)) { if (x.type === "text") expect(f.getTextField(x.name).getText()).toBe(x.value); else expect(f.getCheckBox(x.name).isChecked()).toBe(true); }
    if (process.env.EG_OUT) writeFileSync(`${process.env.EG_OUT}/${land}-residence-${kind}.pdf`, r.bytes);
  });
  it("wrong-state hash rejected; SH April2025 not silently accepted for August original", async () => {
    if (!dir) throw new Error("EG_RESIDENCE_DIR required");
    const opts = { fontBytes: new Uint8Array(readFileSync("src/assets/fonts/liberation-sans/LiberationSans-Regular.ttf")) };
    const wrong = await fillResidenceForTesting("HH", new Uint8Array(readFileSync(`${dir}/RP_residence.pdf`)), fixture(), today, opts);
    expect(wrong.ok).toBe(false); expect("bytes" in wrong).toBe(false);
    const sh = await fillResidenceForTesting("SH", new Uint8Array(readFileSync(`${dir}/SH_residence.pdf`)), fixture(), today, opts);
    expect(sh).toEqual({ ok: false, code: "ANNEX_UNVERIFIED_FOR_LAND" });
  });
});