import { describe, it, expect, vi } from "vitest";
import { PDFDocument } from "pdf-lib";
import { fillPdfBytes, fillPdfForm, type PdfFormConfig } from "./pdf-form-engine";

/** Synthetic template: text fields "Name", "Ort" and checkbox "ja". No real user data. */
async function makeTemplate(): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const page = doc.addPage([400, 400]);
  const form = doc.getForm();
  form.createTextField("Name").addToPage(page, { x: 20, y: 300, width: 200, height: 20 });
  form.createTextField("Ort").addToPage(page, { x: 20, y: 250, width: 200, height: 20 });
  form.createCheckBox("ja").addToPage(page, { x: 20, y: 200, width: 12, height: 12 });
  return doc.save();
}

type D = { name: string; ort?: string; extra?: boolean };
const cfg: PdfFormConfig<D> = {
  url: "/synthetic.pdf",
  label: "Synthetic",
  builder: (d) => [
    { name: "Name", type: "text", value: d.name },
    ...(d.ort ? [{ name: "Ort", type: "text" as const, value: d.ort }] : []),
    { name: "ja", type: "check" },
    ...(d.extra ? [{ name: "DoesNotExist", type: "text" as const, value: "x" }] : []),
  ],
};

describe("pdf-form-engine", () => {
  it("fills known fields and reads them back", async () => {
    const tpl = await makeTemplate();
    const { bytes, report } = await fillPdfBytes(cfg, { name: "Maja Kovač", ort: "Berlin" }, tpl);
    const form = (await PDFDocument.load(bytes)).getForm();
    expect(form.getTextField("Name").getText()).toBe("Maja Kovač");
    expect(form.getTextField("Ort").getText()).toBe("Berlin");
    expect(form.getCheckBox("ja").isChecked()).toBe(true);
    expect(report).toMatchObject({ requestedFields: 3, filledFields: 3, missingFields: [] });
  });

  it("reports missing fields without throwing", async () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
    const { report } = await fillPdfBytes(cfg, { name: "A", extra: true }, await makeTemplate());
    expect(report.missingFields).toEqual(["text:DoesNotExist"]);
    expect(report.filledFields).toBe(2);
  });

  it("does not leak reports between concurrent calls", async () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
    const tpl = await makeTemplate();
    const [a, b] = await Promise.all([
      fillPdfBytes(cfg, { name: "Damir Novak", extra: true }, tpl),
      fillPdfBytes(cfg, { name: "Maja Kovač" }, tpl),
    ]);
    expect(a.report.missingFields).toEqual(["text:DoesNotExist"]);
    expect(b.report.missingFields).toEqual([]);
    const bName = (await PDFDocument.load(b.bytes)).getForm().getTextField("Name").getText();
    expect(bName).toBe("Maja Kovač");
  });

  it("fillPdfForm keeps returning a PDF Blob for existing callers", async () => {
    const tpl = await makeTemplate();
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true, status: 200, arrayBuffer: async () => tpl.slice().buffer })));
    const blob = await fillPdfForm(cfg, { name: "A" });
    expect(blob).toBeInstanceOf(Blob);
    expect(blob.type).toBe("application/pdf");
    vi.unstubAllGlobals();
  });

  it("throws when the template cannot be fetched", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 404 })));
    await expect(fillPdfForm(cfg, { name: "A" })).rejects.toThrow("404");
    vi.unstubAllGlobals();
  });
});
