/**
 * FormularPilot — Kinderzuschlag KiZ1 (Bundesagentur für Arbeit / Familienkasse).
 * Status: BLOCKED. Checked 2026-10-26 against the official BA download page.
 * The official file is XFA + AES-encrypted with "change: no"; it must not be decrypted
 * or re-mapped. The bundled copy is an unencrypted derivative with a different hash.
 */
export const KIZ1_MANIFEST = {
  formKey: "ba-kiz1",
  status: "blocked" as const,
  checkedAt: "2026-10-26",
  officialPage: "https://www.arbeitsagentur.de/familie-und-kinder/downloads-familie-und-kinder/formulare-kinderzuschlag",
  official: {
    url: "https://www.arbeitsagentur.de/datei/kiz1-antrag_ba036540.pdf",
    sha256: "79b4523234c0f1d62f1d81a1ece268d234c26fdadcbee1f1105e242c03756582",
    producer: "Designer 6.5",
    modDate: "2025-10-13",
    pages: 3,
    technology: "xfa" as const,
    encrypted: "AES; print yes, copy no, change no",
  },
  bundled: {
    file: "kiz1-antrag-2026.pdf",
    sha256: "9bf8c0133084c771a49392a1bfd6b76ff965a19cbe5fa68571002db60d8fed0a",
    note: "same producer/modDate as official, not encrypted, different hash → modified derivative, 74 AcroForm fields + XFA",
  },
  relatedOfficialAnnexes: [
    "https://www.arbeitsagentur.de/datei/kiz1-ana_ba034980.pdf",
    "https://www.arbeitsagentur.de/datei/kiz1-ank_ba035005.pdf",
    "https://www.arbeitsagentur.de/datei/kiz1-k_ba034985.pdf",
    "https://www.arbeitsagentur.de/datei/kiz1-hinweise_ba036545.pdf",
  ],
  blockers: [
    "official form is XFA + encrypted (change not permitted) — no legal AcroForm mapping possible",
    "bundled copy is a derivative of a no-change file — legal review needed before any further use",
    "annex technology (AnA, AnK, K) not yet checked",
  ],
  safeAlternative:
    "guided questionnaire → printable answer sheet with German field labels + link to official KiZ1 / online application (BundID); user fills, signs, sends",
};
