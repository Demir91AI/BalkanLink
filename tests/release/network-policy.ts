// Pure network policy shared by all browser test entrypoints (no Playwright imports,
// so Vitest can test it). Fail-closed: only local hosts may load for real; the
// project backend gets local synthetic answers; everything else is aborted.
// Third-party static asset hosts are aborted too, just not reported as failures.
export type Decision = 'local' | 'backend-mock' | 'abort-tolerated' | 'abort-unexpected';
export type BackendMock = { status: number; body: unknown };

const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1', '[::1]', '::1']);
const TOLERATED_STATIC = [/^flagcdn\.com$/i, /(^|\.)fonts\.(googleapis|gstatic)\.com$/i];

function host(url: string): string | null {
  try { return new URL(url.replace(/^ws(s?):/i, 'http$1:')).hostname.toLowerCase(); } catch { return null; }
}

/** Backend hosts: any *.supabase.co plus explicitly configured custom URLs. */
export function backendHosts(env: Record<string, string | undefined> = {}): string[] {
  const out: string[] = [];
  for (const k of ['VITE_SUPABASE_URL', 'SUPABASE_URL']) { const h = env[k] ? host(env[k]!) : null; if (h) out.push(h); }
  return out;
}

export function classifyRequest(url: string, extraBackendHosts: string[] = []): Decision {
  if (/^(data|blob|about|chrome-extension):/i.test(url)) return 'local';
  const h = host(url);
  if (!h) return 'abort-unexpected';
  if (LOCAL_HOSTS.has(h)) return 'local';
  if (/\.supabase\.(co|in)$/i.test(h) || extraBackendHosts.includes(h)) return 'backend-mock';
  if (TOLERATED_STATIC.some(r => r.test(h))) return 'abort-tolerated';
  return 'abort-unexpected';
}

export function syntheticBackendResponse(method: string, url: string): BackendMock {
  const path = new URL(url).pathname;
  if (path.startsWith('/auth/v1/')) return { status: 401, body: { error: 'synthetic_no_session' } };
  if (path.startsWith('/rest/v1/')) return method === 'GET' ? { status: 200, body: [] } : { status: 403, body: { error: 'synthetic_write_blocked' } };
  if (path.startsWith('/functions/v1/')) return { status: 503, body: { error: 'synthetic_function_blocked' } };
  if (path.startsWith('/storage/v1/')) return { status: 404, body: { error: 'synthetic_storage_blocked' } };
  return { status: 403, body: { error: 'synthetic_blocked' } };
}
