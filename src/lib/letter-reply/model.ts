/** Original BalkanLink correspondence templates, not official forms. No I/O or persistence. */
export const PURPOSES = ['documents', 'extension', 'statement', 'appeal'] as const;
export type Purpose = typeof PURPOSES[number];
export interface ReplyData {
  purpose: Purpose | ''; institution: 'other' | 'familienkasse'; sender: string; senderAddress: string;
  recipient: string; recipientAddress: string; reference: string; date: string; letterDate: string;
  facts: string; attachments: string; requestedDate: string; remedy: '' | 'Widerspruch' | 'Einspruch'; legalConfirmed: boolean;
}
export const emptyReply = (): ReplyData => ({ purpose: '', institution: 'other', sender: '', senderAddress: '', recipient: '', recipientAddress: '', reference: '', date: '', letterDate: '', facts: '', attachments: '', requestedDate: '', remedy: '', legalConfirmed: false });
export function validDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T12:00:00Z`);
  return !Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === value;
}
export const formatDate = (value: string) => value.split('-').reverse().join('.');
export const attachmentLines = (value: string) => value.split('\n').map(s => s.trim()).filter(Boolean);
export function validateReply(data: ReplyData): string[] {
  const errors: string[] = [];
  if (!PURPOSES.some(p => p === data.purpose)) errors.push('purpose');
  if (!validDate(data.date)) errors.push('date');
  if ((data.letterDate || data.purpose === 'appeal') && !validDate(data.letterDate)) errors.push('letterDate');
  if (data.purpose !== 'documents' && !data.facts.trim()) errors.push('facts');
  if (data.purpose === 'documents' && !attachmentLines(data.attachments).length) errors.push('attachments');
  if (data.purpose === 'extension' && (!validDate(data.requestedDate) || data.requestedDate < data.date)) errors.push('requestedDate');
  if (data.purpose === 'appeal' && (!['Widerspruch','Einspruch'].includes(data.remedy) || !data.legalConfirmed)) errors.push('remedy');
  const values = Object.values(data).filter((v): v is string => typeof v === 'string');
  if (values.some(v => v.length > 4000) || values.join('').length > 16000) errors.push('length');
  if (values.some(v => /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/.test(v))) errors.push('characters');
  return errors;
}
export type TextLookup = (key: string, values?: Record<string, string>) => string;
export function renderReply(data: ReplyData, text: TextLookup): string {
  if (validateReply(data).length) throw new Error('REPLY_INVALID');
  const line = (key: string, value: string) => value.trim() ? text(key, { value: value.trim() }) : '';
  const paragraphs: string[] = [];
  paragraphs.push([data.sender.trim(), data.senderAddress.trim()].filter(Boolean).join('\n'));
  paragraphs.push([data.recipient.trim() || (data.institution === 'familienkasse' ? 'Familienkasse' : ''), data.recipientAddress.trim()].filter(Boolean).join('\n'));
  paragraphs.push(line('date', formatDate(data.date)));
  paragraphs.push([line('reference', data.reference), line('letterDate', data.letterDate ? formatDate(data.letterDate) : '')].filter(Boolean).join('\n'));
  const subject = text(`subjects.${data.purpose}`, { remedy: data.remedy });
  paragraphs.push(line('subject', subject), text('salutation'));
  if (data.purpose === 'documents') paragraphs.push(text('documents'), data.facts.trim());
  if (data.purpose === 'extension') paragraphs.push(text('extension', { value: formatDate(data.requestedDate) }), data.facts.trim(), text('extensionEnd'));
  if (data.purpose === 'statement') paragraphs.push(text('statement'), data.facts.trim());
  if (data.purpose === 'appeal') paragraphs.push(text('appeal', { remedy: data.remedy, value: formatDate(data.letterDate) }), data.facts.trim());
  paragraphs.push(text('closing'), data.sender.trim(), text('signature'));
  const attachments = attachmentLines(data.attachments);
  if (attachments.length) paragraphs.push(text('attachments') + '\n' + attachments.map(s => `- ${s}`).join('\n'));
  return paragraphs.filter(p => p.trim()).join('\n\n');
}
/** No dates extracted from generated analysis are evidence of a deadline. */
export const deadlineReviewKey = () => 'deadlineWarning' as const;
export const FAMILY_SERVICE = 'https://www.arbeitsagentur.de/familie-und-kinder/veraenderungen-mitteilen';
export const FAMILY_PORTAL = 'https://www.arbeitsagentur.de/familie-und-kinder';
