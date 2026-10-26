/**
 * FormularPilot — Mutterschaftsgeld (Bundesamt für Soziale Sicherung, Mutterschaftsgeldstelle).
 * Status: needs_review. Checked 2026-10-26. No golden test yet.
 */
export const MUTTERSCHAFTSGELD_MANIFEST = {
  formKey: "bas-mutterschaftsgeld",
  status: "needs_review" as const,
  checkedAt: "2026-10-26",
  officialPage: "https://www.bundesamtsozialesicherung.de/de/mutterschaftsgeld/antrag-stellen/",
  official: {
    url: "https://www.bundesamtsozialesicherung.de/fileadmin/redaktion/Mutterschaftsgeld/2026_Antragsformular.pdf",
    sha256: "6f7d1e47fcd04bdfdfa95663d869100fea739c38a95b7095463990c033d9ecf3",
    bytes: 427111, pages: 9, modDate: "2025-12-19", technology: "acroform" as const, encrypted: false, fieldCount: 129,
  },
  bundled: {
    file: "mutterschaftsgeld-bas-2026.pdf",
    sha256: "808f038949e6ab725e5c871492e6686683fc64ee465c9592aa51c902bd353098",
    note: "same 129 field names/types and same extracted text as official, but 10.7 KB larger with different hash → re-saved copy, not byte-authentic",
  },
  scope: "agency (BAS, nationwide) — only for women NOT themselves members of a statutory health insurer; others apply to their Krankenkasse",
  attachments: ["Bescheinigung über eine Beschäftigung (employer, signed + stamped, at the earliest at start of Schutzfrist)", "Zeugnis über den voraussichtlichen Entbindungstermin or Geburtsbescheinigung"],
  blockers: [
    "bundled copy is not byte-identical to official 2026 file",
    "official file not committed: hosting/reuse rights of BAS form unknown",
    "eligibility gate (not in statutory health insurance + employment) must be asked before any fill",
    "field mapping of existing pdf-fill-mutterschaftsgeld.ts not yet verified against official",
  ],
  nextStep: "pin official hash, map native fields, golden read-back test using the official file fetched at test time or a rights-cleared fixture",
};
