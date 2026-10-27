import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { createInstance } from 'i18next';
import { emptyReply, renderReply, validateReply, deadlineReviewKey, FAMILY_SERVICE } from './model';
import { createReplyPdf } from './pdf';
import bs from '@/i18n/locales/bs/reply.json';
import de from '@/i18n/locales/de/reply.json';
import hr from '@/i18n/locales/hr/reply.json';
import sr from '@/i18n/locales/sr/reply.json';
import { PDFDocument } from 'pdf-lib';
const i18n = createInstance();
await i18n.init({ lng: 'de', resources: { de: { reply: de } }, defaultNS: 'reply', interpolation: { escapeValue: false } });
const text = (key: string, values?: Record<string,string>) => i18n.t(`document.${key}`, values);
const sample = () => ({ ...emptyReply(), purpose: 'documents' as const, date: '2026-10-27', attachments: 'Geburtsurkunde', sender: 'Maja Čičak Đurić' });
describe('agency reply safety rules', () => {
  it('requires a purpose, valid date and real attachments for documents', () => {
    expect(validateReply(emptyReply())).toContain('purpose');
    expect(validateReply({ ...sample(), attachments: '' })).toContain('attachments');
    expect(validateReply({ ...sample(), date: '2026-02-30' })).toContain('date');
    expect(validateReply(sample())).toEqual([]);
  });
  it('omits blanks and never invents recipient, reference, facts or deadlines', () => {
    const output = renderReply(sample(), text);
    expect(output).toContain('Geburtsurkunde');
    expect(output).toContain('27.10.2026');
    expect(output).not.toContain('Familienkasse');
    expect(output).not.toContain('Aktenzeichen');
    expect(output).not.toContain('{{');
  });
  it('uses only the user-confirmed institution', () => {
    expect(renderReply({ ...sample(), institution: 'familienkasse' },text)).toContain('Familienkasse');
    expect(FAMILY_SERVICE).toBe('https://www.arbeitsagentur.de/familie-und-kinder/veraenderungen-mitteilen');
  });
  it('requires factual German input for a statement', () => {
    expect(validateReply({ ...sample(), purpose: 'statement' })).toContain('facts');
    expect(renderReply({ ...sample(), purpose: 'statement', facts: 'Ich wohne seit dem 01.10.2026 in Berlin.' }, text)).toContain('Ich wohne seit dem 01.10.2026 in Berlin.');
  });
  it('requires a requested extension date and reason, never asserts approval', () => {
    expect(validateReply({ ...sample(), purpose: 'extension', facts: 'Die Unterlagen liegen noch nicht vor.' })).toContain('requestedDate');
    const output = renderReply({ ...sample(), purpose: 'extension', requestedDate: '2026-11-10', facts: 'Die Unterlagen liegen noch nicht vor.' },text);
    expect(output).toContain('bis zum 10.11.2026');
    expect(output).toContain('ob Sie der Fristverlängerung zustimmen');
  });
  it('requires notice date, factual grounds and explicit remedy review for an appeal', () => {
    const data = { ...sample(), purpose: 'appeal' as const, facts: 'Die angeforderten Unterlagen wurden beigefügt.', letterDate: '2026-10-20', remedy: 'Einspruch' as const };
    expect(validateReply(data)).toContain('remedy');
    expect(renderReply({ ...data, legalConfirmed: true },text)).toContain('lege ich Einspruch');
    expect(() => renderReply(data,text)).toThrow('REPLY_INVALID');
  });
  it('isolates drafts and rejects excess/control input', () => {
    const a = sample(), b = sample(); a.sender = 'Damir Novak';
    expect(renderReply(b,text)).not.toContain('Damir');
    expect(validateReply({ ...b, facts: 'a'.repeat(4001) })).toContain('length');
    expect(validateReply({ ...b, facts: '\x00' })).toContain('characters');
  });
  it('never derives confirmed deadlines from analysis text', () => {
    expect(deadlineReviewKey()).toBe('deadlineWarning');
    const source = readFileSync('src/pages/DokumentenCheck.tsx','utf8');
    expect(source).not.toContain('const dateMatch = urgencySection');
    expect(source).toContain('deadlineReviewKey()');
  });
  it('ships matching translation keys and German generated text in all 4 languages', () => {
    const keys = (v: object): string[] => Object.entries(v).flatMap(([k,x]) => typeof x === 'object' ? keys(x).map(p=>`${k}.${p}`) : [k]).sort();
    for (const locale of [hr,sr,de]) expect(keys(locale)).toEqual(keys(bs));
    for (const locale of [bs,hr,sr]) expect(locale.document).toEqual(de.document);
  });
  it('keeps entries visibility-gated, preserves host access and has no new routes or persistence', () => {
    const source = readFileSync('src/components/letter-reply/LetterReplyTask.tsx','utf8');
    expect(source).toContain('if (!isLetterReplyVisible(import.meta.env.DEV, window.location.hostname)) return null');
    expect(source).toContain("canAccess ? setOpen(true) : navigate('/paketi')");
    expect(source).not.toMatch(/localStorage|sessionStorage|supabase|console\./);
    expect(readFileSync('src/pages/Vorlagen.tsx','utf8')).toContain('canAccess={isPremium}');
    expect(readFileSync('src/pages/DokumentenCheck.tsx','utf8')).toContain('canAccess={hasAccess}');
  });
});
describe('local Unicode letter PDF', () => {
  const font = new Uint8Array(readFileSync('src/assets/fonts/liberation-sans/LiberationSans-Regular.ttf'));
  it('creates a real multipage PDF for edited German/BHS text', async () => {
    const output = await createReplyPdf('Čičak Đurić Ćosić Šabić Žunić ÄÖÜß\n'+ 'Ein langer, vom Nutzer geprüfter Text.\n'.repeat(90), font);
    const pdf = await PDFDocument.load(output);
    expect(pdf.getPageCount()).toBeGreaterThan(1);
    expect(output.byteLength).toBeGreaterThan(10000);
  });
  it('fails closed on changed font, unsupported glyphs and oversized output', async () => {
    await expect(createReplyPdf('text', new Uint8Array([1]))).rejects.toThrow('FONT_HASH_MISMATCH');
    await expect(createReplyPdf('😀',font)).rejects.toThrow('UNSUPPORTED_GLYPH');
    await expect(createReplyPdf('a'.repeat(20001),font)).rejects.toThrow('REPLY_TEXT_LIMIT');
  });
});
