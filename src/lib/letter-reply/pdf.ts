import { PDFDocument } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import fontUrl from '@/assets/fonts/liberation-sans/LiberationSans-Regular.ttf?url';

/** Uses existing pdf-lib/fontkit and the provenance-recorded local OFL font. No official PDFs. */
export async function createReplyPdf(text: string, suppliedFont?: Uint8Array): Promise<Uint8Array> {
  if (!text.trim() || text.length > 20000) throw new Error('REPLY_TEXT_LIMIT');
  if (/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/.test(text)) throw new Error('UNSUPPORTED_CONTROL');
  let bytes = suppliedFont;
  if (!bytes) {
    const response = await fetch(fontUrl);
    if (!response.ok) throw new Error('LOCAL_FONT_UNAVAILABLE');
    bytes = new Uint8Array(await response.arrayBuffer());
  }
  const digest = await crypto.subtle.digest('SHA-256', Uint8Array.from(bytes));
  const hash = Array.from(new Uint8Array(digest), v => v.toString(16).padStart(2, '0')).join('');
  if (hash !== '76d04c18ea243f426b7de1f3ad208e927008f961dc5945e5aad352d0dfde8ee8') throw new Error('FONT_HASH_MISMATCH');
  const parsed = fontkit.create(bytes as unknown as Buffer);
  if ([...text].some(c => c.trim() && !parsed.hasGlyphForCodePoint(c.codePointAt(0) ?? 0))) throw new Error('UNSUPPORTED_GLYPH');
  const doc = await PDFDocument.create();
  doc.registerFontkit(fontkit);
  const font = await doc.embedFont(bytes, { subset: false });
  const size = 11, lineHeight = 16, width = 481;
  let page = doc.addPage([595.28, 841.89]), y = 785;
  const draw = (line: string) => {
    if (y < 57) { page = doc.addPage([595.28, 841.89]); y = 785; }
    if (line) page.drawText(line, { x: 57, y, size, font });
    y -= lineHeight;
  };
  for (const paragraph of text.replace(/\r\n?/g, '\n').split('\n')) {
    if (!paragraph.trim()) { draw(''); continue; }
    let line = '';
    for (const word of paragraph.split(/\s+/)) {
      const candidate = line ? `${line} ${word}` : word;
      if (font.widthOfTextAtSize(candidate, size) <= width) { line = candidate; continue; }
      if (line) { draw(line); line = ''; }
      // Only split an oversized single token; normal words wrap intact.
      for (const char of word) {
        if (font.widthOfTextAtSize(line + char, size) > width) { draw(line); line = ''; }
        line += char;
      }
    }
    draw(line);
  }
  return doc.save();
}
