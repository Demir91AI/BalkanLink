/**
 * FormularPilot — locally bundled Unicode font for PDF field appearances.
 * Liberation Sans Regular 2.1.5 (SIL OFL 1.1), see src/assets/fonts/liberation-sans/NOTICE.md.
 * Metric-compatible with Helvetica, so official field layouts keep their spacing.
 * Never fetched from a remote server. The bytes are hash-pinned: a changed font is refused.
 */
import fontkit from "@pdf-lib/fontkit";
import type { PDFDocument, PDFFont } from "pdf-lib";
import { sha256Hex } from "@/lib/pdf-preflight";

export const UNICODE_FONT = {
  name: "Liberation Sans Regular",
  version: "2.1.5",
  license: "SIL Open Font License 1.1",
  sha256: "76d04c18ea243f426b7de1f3ad208e927008f961dc5945e5aad352d0dfde8ee8",
  path: "src/assets/fonts/liberation-sans/LiberationSans-Regular.ttf",
} as const;

export interface EmbeddedUnicodeFont {
  font: PDFFont;
  /** Characters of `text` the font cannot draw (empty = fully supported). */
  missingGlyphs(text: string): string[];
}

export async function embedUnicodeFont(doc: PDFDocument, fontBytes: Uint8Array): Promise<EmbeddedUnicodeFont> {
  const hash = await sha256Hex(fontBytes);
  if (hash !== UNICODE_FONT.sha256) throw new Error("UNICODE_FONT_HASH_MISMATCH");
  doc.registerFontkit(fontkit);
  // Full embed (no subsetting): avoids known glyph loss when appearances are regenerated later.
  const font = await doc.embedFont(fontBytes, { subset: false });
  const fk = fontkit.create(fontBytes as unknown as Buffer);
  return {
    font,
    missingGlyphs: (text) =>
      [...new Set([...text].filter((c) => c.trim() && !fk.hasGlyphForCodePoint(c.codePointAt(0)!)))],
  };
}
