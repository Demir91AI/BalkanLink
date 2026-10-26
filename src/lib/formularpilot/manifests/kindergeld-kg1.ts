/**
 * FormularPilot manifest — Kindergeld KG1 + KG1-AnK.
 * STATUS: BLOCKED. Strict preflight must NOT be enabled for these forms.
 *
 * Verified 2026-10-26 against the official Bundesagentur für Arbeit page:
 * https://www.arbeitsagentur.de/familie-und-kinder/downloads-familie-und-kinder/formulare-kindergeld
 *
 * Blockers:
 *  - Official KG1 and KG1-AnK are XFA forms (Adobe Designer 6.5), AES-encrypted,
 *    permissions "change: no". pdf-lib cannot read their fields (0 fields).
 *  - Bundled KG1 has the same creation/modification dates as the official file
 *    but a different hash and no encryption => a modified/decrypted derivative,
 *    not the authentic official file. Its 95 AcroForm fields are not an
 *    approved source for mappings.
 *  - Bundled KG1-AnK is not a PDF (9 bytes, text "not found").
 *  - Whether we may host the forms at all remains unresolved (compliance register).
 * Safe path for users: link/download from the official URLs below.
 */
export const KG1_MANIFEST_STATUS = {
  formKey: "kindergeld-kg1",
  status: "blocked" as const,
  verifiedAt: "2026-10-26",
  officialPage:
    "https://www.arbeitsagentur.de/familie-und-kinder/downloads-familie-und-kinder/formulare-kindergeld",
  forms: {
    kg1: {
      officialUrl: "https://www.arbeitsagentur.de/datei/kg1-antrag-kindergeld_ba036550.pdf",
      officialSha256: "53651bbe336039b6ca3852f1fa7288b4841349afd1978a4b91469fea15eaac43",
      officialModDate: "2025-10-15",
      bundledPath: "public/muster/kg1-antrag-kindergeld-2026.pdf",
      bundledSha256: "06bc1704b74a3db8f06df0586011126232b1dbfed1a528813e05c9510afada8a",
      blockers: ["XFA_FORM", "OFFICIAL_ENCRYPTED", "BUNDLED_NOT_AUTHENTIC"],
    },
    kg1Ank: {
      officialUrl: "https://www.arbeitsagentur.de/datei/kg1-anlagekind_ba033765.pdf",
      officialSha256: "baf78a8dbaa84490964772b5f37a6a9b2ff3e5c4683b9ef3d678b3d638926f6f",
      officialModDate: "2025-11-05",
      bundledPath: "public/muster/kg1-anlage-kind-2026.pdf",
      bundledSha256: "907ba78b4545338d3539683e63ecb51cf51c10adc9dabd86e92bd52339f298b9",
      blockers: ["XFA_FORM", "OFFICIAL_ENCRYPTED", "BUNDLED_NOT_A_PDF"],
    },
  },
};
