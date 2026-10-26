import { describe, it, expect } from "vitest";
import { PDFDocument, PDFName, PDFString } from "pdf-lib";
import { preflightPdfTemplate, sha256Hex, type PdfTemplateManifest } from "./pdf-preflight";

async function makePdf(opts: { name?: string; ortAsCheckbox?: boolean; noForm?: boolean; xfa?: boolean } = {}) {
  const doc = await PDFDocument.create();
  const page = doc.addPage([400, 400]);
  if (!opts.noForm) {
    const form = doc.getForm();
    form.createTextField(opts.name ?? "Name").addToPage(page, { x: 10, y: 300, width: 200, height: 20 });
    if (opts.ortAsCheckbox) form.createCheckBox("Ort").addToPage(page, { x: 10, y: 250, width: 15, height: 15 });
    else form.createTextField("Ort").addToPage(page, { x: 10, y: 250, width: 200, height: 20 });
    form.createCheckBox("ja").addToPage(page, { x: 10, y: 200, width: 15, height: 15 });
    if (opts.xfa) form.acroForm.dict.set(PDFName.of("XFA"), PDFString.of("<xdp/>"));
  }
  return doc.save({ updateFieldAppearances: false });
}

const manifest: PdfTemplateManifest = {
  formKey: "synthetic-test",
  version: "2026-01",
  fields: { Name: "text", Ort: "text", ja: "checkbox" },
};

describe("preflightPdfTemplate", () => {
  it("allows a correct template with matching hash", async () => {
    const bytes = await makePdf();
    const r = await preflightPdfTemplate(bytes, { ...manifest, sha256: await sha256Hex(bytes) });
    expect(r.allowed).toBe(true);
    expect(r.issues).toEqual([]);
    expect(r.unexpectedFields).toEqual([]);
  });

  it("blocks when a field is missing (renamed)", async () => {
    const r = await preflightPdfTemplate(await makePdf({ name: "Familienname" }), manifest);
    expect(r.allowed).toBe(false);
    expect(r.issues).toEqual([{ code: "MISSING_FIELD", field: "Name", expectedType: "text" }]);
    expect(r.unexpectedFields).toEqual(["Familienname"]);
  });

  it("blocks on wrong field type", async () => {
    const r = await preflightPdfTemplate(await makePdf({ ortAsCheckbox: true }), manifest);
    expect(r.allowed).toBe(false);
    expect(r.issues).toEqual([{ code: "WRONG_FIELD_TYPE", field: "Ort", expectedType: "text", actualType: "checkbox" }]);
  });

  it("blocks on hash mismatch", async () => {
    const r = await preflightPdfTemplate(await makePdf(), { ...manifest, sha256: "0".repeat(64) });
    expect(r.allowed).toBe(false);
    expect(r.issues[0].code).toBe("HASH_MISMATCH");
  });

  it("blocks XFA, missing AcroForm and unreadable files", async () => {
    expect((await preflightPdfTemplate(await makePdf({ xfa: true }), manifest)).issues.map((i) => i.code)).toEqual(["XFA_FORM"]);
    expect((await preflightPdfTemplate(await makePdf({ noForm: true }), manifest)).issues.map((i) => i.code)).toEqual(["NO_ACROFORM"]);
    const bad = await preflightPdfTemplate(new TextEncoder().encode("not a pdf"), manifest);
    expect(bad.allowed).toBe(false);
    expect(bad.issues.map((i) => i.code)).toEqual(["UNREADABLE_PDF"]);
  });

  it("concurrent checks do not leak results", async () => {
    const [good, renamed, typed] = await Promise.all([
      makePdf(), makePdf({ name: "X" }), makePdf({ ortAsCheckbox: true }),
    ]);
    const rs = await Promise.all([good, renamed, typed, good].map((b) => preflightPdfTemplate(b, manifest)));
    expect(rs.map((r) => r.allowed)).toEqual([true, false, false, true]);
    expect(rs[1].issues[0].code).toBe("MISSING_FIELD");
    expect(rs[2].issues[0].code).toBe("WRONG_FIELD_TYPE");
  });

  it("is deterministic and does not mutate input", async () => {
    const bytes = await makePdf();
    const copy = bytes.slice();
    const a = await preflightPdfTemplate(bytes, manifest);
    const b = await preflightPdfTemplate(bytes, manifest);
    expect(a).toEqual(b);
    expect(bytes).toEqual(copy);
  });
});
