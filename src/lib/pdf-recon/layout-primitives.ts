/**
 * Layout primitives za 1:1 rekonstrukciju službenih DE obrazaca.
 * Stil: BAMF/BA — sivkasta zaglavlja, tanki crni okviri polja, fields s
 * malim labelom u box-u, checkboxovi 9pt.
 */
import { rgb, type PDFPage, type PDFFont } from "pdf-lib";

export const A4 = { w: 595.28, h: 841.89 };
export const MARGIN = { top: 40, bottom: 40, left: 40, right: 40 };

export const COL = {
  black: rgb(0, 0, 0),
  text: rgb(0.05, 0.05, 0.08),
  muted: rgb(0.42, 0.45, 0.5),
  rule: rgb(0.7, 0.72, 0.75),
  fieldBorder: rgb(0.55, 0.58, 0.62),
  fieldBg: rgb(1, 1, 1),
  sectionBg: rgb(0.92, 0.93, 0.95),
  sectionBgAlt: rgb(0.86, 0.88, 0.91),
  headerBg: rgb(0.94, 0.94, 0.96),
  filled: rgb(0.05, 0.18, 0.55), // tamno-plava boja unesenih podataka (kao kemijska)
};

export interface Ctx {
  page: PDFPage;
  reg: PDFFont;
  bold: PDFFont;
}

/** Truncate string to fit width (single-line). */
export function fit(text: string, font: PDFFont, size: number, maxW: number): string {
  if (!text) return "";
  if (font.widthOfTextAtSize(text, size) <= maxW) return text;
  let lo = 0, hi = text.length;
  while (lo < hi) {
    const mid = Math.ceil((lo + hi) / 2);
    if (font.widthOfTextAtSize(text.slice(0, mid) + "…", size) <= maxW) lo = mid;
    else hi = mid - 1;
  }
  return text.slice(0, lo) + "…";
}

/** Multi-line wrap. */
export function wrap(text: string, font: PDFFont, size: number, maxW: number): string[] {
  const lines: string[] = [];
  for (const para of (text || "").split("\n")) {
    const words = para.split(/\s+/);
    let line = "";
    for (const w of words) {
      const t = line ? line + " " + w : w;
      if (font.widthOfTextAtSize(t, size) > maxW && line) {
        lines.push(line);
        line = w;
      } else line = t;
    }
    if (line) lines.push(line);
  }
  return lines;
}

/** Form-header bar (form code + title + page indicator). */
export function pageHeader(
  c: Ctx,
  opts: { formCode: string; title: string; subtitle?: string; page: number; total: number },
) {
  const { page, reg, bold } = c;
  page.drawRectangle({
    x: 0, y: A4.h - 56, width: A4.w, height: 56, color: COL.headerBg,
  });
  page.drawLine({
    start: { x: 0, y: A4.h - 56 }, end: { x: A4.w, y: A4.h - 56 },
    thickness: 0.6, color: COL.rule,
  });
  // Form code box (left)
  page.drawRectangle({
    x: MARGIN.left, y: A4.h - 44, width: 90, height: 28,
    color: rgb(1, 1, 1), borderColor: COL.black, borderWidth: 0.8,
  });
  page.drawText(opts.formCode, {
    x: MARGIN.left + 6, y: A4.h - 32,
    size: 9, font: bold, color: COL.text,
  });
  // Title
  page.drawText(opts.title, {
    x: MARGIN.left + 105, y: A4.h - 24,
    size: 12, font: bold, color: COL.text,
  });
  if (opts.subtitle) {
    page.drawText(opts.subtitle, {
      x: MARGIN.left + 105, y: A4.h - 39,
      size: 8.5, font: reg, color: COL.muted,
    });
  }
  // Page indicator (right)
  const pg = `Seite ${opts.page} / ${opts.total}`;
  const pw = reg.widthOfTextAtSize(pg, 9);
  page.drawText(pg, {
    x: A4.w - MARGIN.right - pw, y: A4.h - 28,
    size: 9, font: reg, color: COL.muted,
  });
}

/** Numbered section header (gray bar). */
export function sectionHeader(c: Ctx, y: number, num: number, title: string): number {
  const { page, bold } = c;
  const H = 22;
  page.drawRectangle({
    x: MARGIN.left, y: y - H, width: A4.w - MARGIN.left - MARGIN.right, height: H,
    color: COL.sectionBg, borderColor: COL.rule, borderWidth: 0.5,
  });
  // num square
  page.drawRectangle({
    x: MARGIN.left + 4, y: y - H + 4, width: 14, height: 14,
    color: COL.sectionBgAlt, borderColor: COL.black, borderWidth: 0.7,
  });
  page.drawText(String(num), {
    x: MARGIN.left + 4 + (num < 10 ? 5 : 2), y: y - H + 7.5,
    size: 9, font: bold, color: COL.text,
  });
  page.drawText(title, {
    x: MARGIN.left + 24, y: y - H + 7,
    size: 10.5, font: bold, color: COL.text,
  });
  return y - H - 4;
}

export interface FieldOpts {
  x: number;
  y: number;
  w: number;
  h?: number;
  label: string;
  value?: string;
  hint?: string;
}

/** Single field cell: thin border, tiny label, value (filled = blue ink). */
export function field(c: Ctx, o: FieldOpts) {
  const { page, reg, bold } = c;
  const h = o.h ?? 26;
  // label (above border)
  page.drawText(fit(o.label, reg, 7.5, o.w - 4), {
    x: o.x + 2, y: o.y + h - 6,
    size: 7.5, font: reg, color: COL.muted,
  });
  // box
  page.drawRectangle({
    x: o.x, y: o.y, width: o.w, height: h - 9,
    color: COL.fieldBg, borderColor: COL.fieldBorder, borderWidth: 0.6,
  });
  // value
  if (o.value) {
    page.drawText(fit(o.value, bold, 9.5, o.w - 6), {
      x: o.x + 4, y: o.y + 4,
      size: 9.5, font: bold, color: COL.filled,
    });
  }
  // hint UNUTAR boxa, desno (ne ispod — sprečava overlap sa sljedećim redom)
  if (o.hint && !o.value) {
    const hw = reg.widthOfTextAtSize(o.hint, 6.5);
    page.drawText(o.hint, {
      x: o.x + o.w - hw - 4, y: o.y + 5,
      size: 6.5, font: reg, color: COL.muted,
    });
  }
}

/** Checkbox 9x9pt + label to the right. */
export function checkbox(
  c: Ctx, x: number, y: number, checked: boolean, label?: string, labelW = 200,
) {
  const { page, reg, bold } = c;
  page.drawRectangle({
    x, y, width: 9, height: 9,
    color: COL.fieldBg, borderColor: COL.black, borderWidth: 0.8,
  });
  if (checked) {
    // X mark
    page.drawLine({
      start: { x: x + 1.5, y: y + 1.5 }, end: { x: x + 7.5, y: y + 7.5 },
      thickness: 1.1, color: COL.filled,
    });
    page.drawLine({
      start: { x: x + 1.5, y: y + 7.5 }, end: { x: x + 7.5, y: y + 1.5 },
      thickness: 1.1, color: COL.filled,
    });
  }
  if (label) {
    page.drawText(fit(label, reg, 8.5, labelW), {
      x: x + 13, y: y + 1,
      size: 8.5, font: checked ? bold : reg, color: checked ? COL.text : COL.muted,
    });
  }
}

/** Page footer: form code + page indicator + small disclaimer. */
export function pageFooter(c: Ctx, formCode: string, page: number, total: number) {
  const { reg } = c;
  c.page.drawLine({
    start: { x: MARGIN.left, y: 28 }, end: { x: A4.w - MARGIN.right, y: 28 },
    thickness: 0.3, color: COL.rule,
  });
  c.page.drawText(formCode, {
    x: MARGIN.left, y: 18, size: 7.5, font: reg, color: COL.muted,
  });
  const pg = `Seite ${page} / ${total}`;
  const pw = reg.widthOfTextAtSize(pg, 7.5);
  c.page.drawText(pg, {
    x: A4.w - MARGIN.right - pw, y: 18,
    size: 7.5, font: reg, color: COL.muted,
  });
  const mid = "Vorausgefüllt durch BalkanLink — Datenquelle: lokaler Browser-Speicher";
  const mw = reg.widthOfTextAtSize(mid, 7);
  c.page.drawText(mid, {
    x: (A4.w - mw) / 2, y: 18,
    size: 7, font: reg, color: COL.muted,
  });
}

/** Signature line: long horizontal rule + label below. */
export function signLine(c: Ctx, x: number, y: number, w: number, label: string) {
  const { page, reg } = c;
  page.drawLine({
    start: { x, y }, end: { x: x + w, y },
    thickness: 0.7, color: COL.black,
  });
  page.drawText(label, {
    x, y: y - 10, size: 8, font: reg, color: COL.muted,
  });
}
