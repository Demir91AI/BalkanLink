import { detectMime, LIMITS, MIME_TYPES, type DocumentAnalysis } from '../../../supabase/functions/document-check/contract';
export { LIMITS, MIME_TYPES, parseAnalysis, languageOf, type DocumentAnalysis, type EvidenceItem } from '../../../supabase/functions/document-check/contract';
import type { Entitlement } from '@/lib/entitlement';
export function mayRequestAnalysis(entitlement: Entitlement, preview: boolean) {
  return preview || entitlement.full_access || entitlement.unused_doc_credits > 0;
}
export function guideFor(analysis: DocumentAnalysis): string {
  // Do not trust a model-written type/URL as routing authority. Generic guides are safe.
  void analysis; return '/formulari';
}
export const ERROR_KEYS: Record<string, string> = {
  ACCESS_REQUIRED: 'accessRequired', UNAUTHORIZED: 'accessRequired', QUOTA_EXHAUSTED: 'quotaExhausted',
  RATE_LIMITED: 'rateLimited', CREDITS_EXHAUSTED: 'creditsExhausted', UNREADABLE: 'unreadable',
  TOO_LARGE: 'totalTooLarge', PAYLOAD_TOO_LARGE: 'payloadTooLarge', TOO_MANY_FILES: 'tooManyFiles',
  PDF_TOO_MANY_PAGES: 'pdfTooManyPages', PDF_UNREADABLE: 'pdfUnreadable',
  INVALID_FILE: 'invalidFile', UNSUPPORTED_FORMAT: 'unsupportedFormat', EMPTY_INPUT: 'noFile',
  PARSING_FAILED: 'invalidResult', SERVER_ERROR: 'serverError', PROVIDER_DENIED: 'providerDenied',
};
export async function prepareFiles(files: File[]) {
  const payload = [];
  let totalPages = 0;
  for (const file of files) {
    const bytes = new Uint8Array(await file.arrayBuffer());
    const mimeType = detectMime(bytes);
    if (!mimeType || (file.type && file.type !== mimeType)) throw new Error('INVALID_FILE');
    if (mimeType === 'application/pdf') {
      const { PDFDocument } = await import('pdf-lib');
      try {
        const pdf = await PDFDocument.load(bytes, { updateMetadata: false });
        if (pdf.isEncrypted || pdf.getPageCount() === 0) throw new Error('PDF_UNREADABLE');
        totalPages += pdf.getPageCount();
      } catch { throw new Error('PDF_UNREADABLE'); }
    } else { totalPages += 1; }
    if (totalPages > LIMITS.pdfPages) throw new Error('PDF_TOO_MANY_PAGES');
    const base64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => typeof reader.result === 'string' ? resolve(reader.result.split(',')[1]) : reject(new Error('INVALID_FILE'));
      reader.onerror = () => reject(new Error('INVALID_FILE'));
      reader.readAsDataURL(file);
    });
    // No lossy resizing: small print is evidence, not decoration. Filenames are not sent.
    payload.push({ base64, mimeType });
  }
  return payload;
}
