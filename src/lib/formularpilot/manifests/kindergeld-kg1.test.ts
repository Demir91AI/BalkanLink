import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { preflightPdfTemplate, sha256Hex } from "@/lib/pdf-preflight";
import { KG1_MANIFEST_STATUS as M } from "./kindergeld-kg1";

// Golden guard: these bundled Kindergeld files must stay blocked until an
// authentic, fillable official source exists.
describe("Kindergeld KG1 manifest (blocked)", () => {
  it("is marked blocked", () => {
    expect(M.status).toBe("blocked");
  });

  it("bundled KG1 is not the official file and fails preflight (XFA + hash)", async () => {
    const bytes = new Uint8Array(readFileSync(M.forms.kg1.bundledPath));
    expect(await sha256Hex(bytes)).toBe(M.forms.kg1.bundledSha256);
    const r = await preflightPdfTemplate(bytes, {
      formKey: M.formKey,
      sha256: M.forms.kg1.officialSha256,
      fields: {},
    });
    expect(r.allowed).toBe(false);
    expect(r.issues.map((i) => i.code).sort()).toEqual(["HASH_MISMATCH", "XFA_FORM"]);
  });

  it("bundled KG1-AnK is unreadable and fails preflight", async () => {
    const bytes = new Uint8Array(readFileSync(M.forms.kg1Ank.bundledPath));
    expect(await sha256Hex(bytes)).toBe(M.forms.kg1Ank.bundledSha256);
    const r = await preflightPdfTemplate(bytes, { formKey: M.formKey, fields: {} });
    expect(r.allowed).toBe(false);
    expect(r.issues.map((i) => i.code)).toContain("UNREADABLE_PDF");
  });
});
