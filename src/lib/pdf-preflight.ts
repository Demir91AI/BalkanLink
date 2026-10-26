/**
 * FormularPilot preflight — pure, deterministic check of an approved PDF
 * template BEFORE filling. No network, no guessing of fields.
 *
 * Fail-closed: `allowed` is true only when every check passes.
 * NOT yet wired into legacy fill callers — enable per form once that form
 * has a verified manifest and golden tests.
 *
 * Reports contain only field names, types and hashes — never user data.
 */
import {
  PDFDocument,
  PDFName,
  PDFTextField,
  PDFCheckBox,
  PDFRadioGroup,
  PDFDropdown,
  PDFOptionList,
  PDFButton,
  PDFSignature,
  type PDFField,
} from "pdf-lib";

export type PdfFieldType =
  | "text" | "checkbox" | "radio" | "dropdown" | "optionlist" | "button" | "signature" | "unknown";

export interface PdfTemplateManifest {
  formKey: string;
  version?: string;
  /** Lowercase hex SHA-256 of the approved original template bytes. */
  sha256?: string;
  fields: Record<string, Exclude<PdfFieldType, "unknown">>;
}

export type PreflightIssue =
  | { code: "UNREADABLE_PDF" }
  | { code: "ENCRYPTED_PDF" }
  | { code: "NO_ACROFORM" }
  | { code: "XFA_FORM" }
  | { code: "HASH_MISMATCH"; expected: string; actual: string }
  | { code: "MISSING_FIELD"; field: string; expectedType: PdfFieldType }
  | { code: "WRONG_FIELD_TYPE"; field: string; expectedType: PdfFieldType; actualType: PdfFieldType };

export interface PreflightReport {
  formKey: string;
  version?: string;
  allowed: boolean;
  sha256: string;
  issues: PreflightIssue[];
  /** Fields present in the PDF but not in the manifest (informational only). */
  unexpectedFields: string[];
}

export function fieldTypeOf(f: PDFField): PdfFieldType {
  if (f instanceof PDFTextField) return "text";
  if (f instanceof PDFCheckBox) return "checkbox";
  if (f instanceof PDFRadioGroup) return "radio";
  if (f instanceof PDFDropdown) return "dropdown";
  if (f instanceof PDFOptionList) return "optionlist";
  if (f instanceof PDFButton) return "button";
  if (f instanceof PDFSignature) return "signature";
  return "unknown";
}

export async function sha256Hex(bytes: Uint8Array): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, "0")).join("");
}

export async function preflightPdfTemplate(
  templateBytes: Uint8Array,
  manifest: PdfTemplateManifest,
): Promise<PreflightReport> {
  // Copy so callers' buffers are never mutated or shared.
  const bytes = templateBytes.slice();
  const sha256 = await sha256Hex(bytes);
  const issues: PreflightIssue[] = [];
  const done = (unexpectedFields: string[] = []): PreflightReport => ({
    formKey: manifest.formKey,
    version: manifest.version,
    allowed: issues.length === 0,
    sha256,
    issues,
    unexpectedFields,
  });

  if (manifest.sha256 && manifest.sha256.toLowerCase() !== sha256) {
    issues.push({ code: "HASH_MISMATCH", expected: manifest.sha256.toLowerCase(), actual: sha256 });
  }

  let doc: PDFDocument;
  try {
    doc = await PDFDocument.load(bytes, { ignoreEncryption: true, updateMetadata: false });
  } catch {
    issues.push({ code: "UNREADABLE_PDF" });
    return done();
  }
  if (doc.isEncrypted) issues.push({ code: "ENCRYPTED_PDF" });

  const acro = doc.catalog.lookup(PDFName.of("AcroForm"));
  if (!acro) {
    issues.push({ code: "NO_ACROFORM" });
    return done();
  }
  const form = doc.getForm();
  if (form.acroForm.dict.has(PDFName.of("XFA"))) issues.push({ code: "XFA_FORM" });

  const actual = new Map<string, PdfFieldType>();
  for (const f of form.getFields()) actual.set(f.getName(), fieldTypeOf(f));

  for (const [name, expectedType] of Object.entries(manifest.fields).sort(([a], [b]) => a.localeCompare(b))) {
    const t = actual.get(name);
    if (t === undefined) issues.push({ code: "MISSING_FIELD", field: name, expectedType });
    else if (t !== expectedType) issues.push({ code: "WRONG_FIELD_TYPE", field: name, expectedType, actualType: t });
  }
  const unexpected = [...actual.keys()].filter((n) => !(n in manifest.fields)).sort();
  return done(unexpected);
}
