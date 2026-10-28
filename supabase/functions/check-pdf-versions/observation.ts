export interface HeadersSnapshot { etag: string | null; last_modified: string | null; content_length: number | null }
export function observedLength(headers: Headers): number | null {
  const range = headers.get('content-range');
  const total = range?.match(/\/(\d+)$/)?.[1];
  const raw = total ?? headers.get('content-length');
  if (raw == null) return null;
  const value = Number(raw);
  return Number.isSafeInteger(value) && value >= 0 ? value : null;
}
export function versionChanged(old: HeadersSnapshot, next: HeadersSnapshot): boolean {
  return (['etag','last_modified','content_length'] as const).some(key => old[key] != null && next[key] != null && old[key] !== next[key]);
}
export function trustedSource(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:' && !parsed.username && !parsed.password && (!parsed.port || parsed.port === '443') &&
      ['arbeitsagentur.de','www.arbeitsagentur.de','web.arbeitsagentur.de','zbfs.bayern.de','www.zbfs.bayern.de','formularserver.bayern.de','www.formularserver.bayern.de','bafög.de','www.bafög.de','xn--bafg-7qa.de','www.xn--bafg-7qa.de','bamf.de','www.bamf.de','bundesfinanzministerium.de','www.bundesfinanzministerium.de'].includes(parsed.hostname);
  } catch { return false; }
}
export async function checkedObservation(call: () => PromiseLike<{ data: unknown; error: unknown }>): Promise<boolean> {
  const result = await call();
  if (result.error || !(result.data && typeof result.data === 'object' && (result.data as { success?: boolean }).success === true)) throw new Error('OBSERVATION_NOT_COMMITTED');
  return (result.data as { changed?: boolean }).changed === true;
}