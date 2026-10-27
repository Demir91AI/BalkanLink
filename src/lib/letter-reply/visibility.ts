/** Visibility only; callers retain their existing authorization checks. */
export function isLetterReplyVisible(isDev: boolean, hostname: string): boolean {
  return isDev || hostname === 'id-preview--42558ae9-0b5a-4abf-bab6-f6cb6cf85927.lovable.app';
}