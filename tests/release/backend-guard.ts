import { test as base, expect } from '@playwright/test';

// Release browser checks must never reach the shared real backend (preview and
// balkanlink.de use the same one). Every backend request is answered locally
// with a synthetic, empty response; no request is ever forwarded.
export type BackendMock = { status: number; body: unknown };

export function isBackendUrl(url: string): boolean {
  try { return /\.supabase\.co$/i.test(new URL(url).hostname); } catch { return false; }
}

export function syntheticBackendResponse(method: string, url: string): BackendMock {
  const path = new URL(url).pathname;
  if (path.startsWith('/auth/v1/')) return { status: 401, body: { error: 'synthetic_no_session' } };
  if (path.startsWith('/rest/v1/')) return method === 'GET' ? { status: 200, body: [] } : { status: 403, body: { error: 'synthetic_write_blocked' } };
  if (path.startsWith('/functions/v1/')) return { status: 503, body: { error: 'synthetic_function_blocked' } };
  if (path.startsWith('/storage/v1/')) return { status: 404, body: { error: 'synthetic_storage_blocked' } };
  return { status: 403, body: { error: 'synthetic_blocked' } };
}

export const test = base.extend<{ backendRequests: string[] }>({
  backendRequests: [async ({ context }, use) => {
    const seen: string[] = [];
    await context.route(u => isBackendUrl(u.toString()), async route => {
      const req = route.request();
      seen.push(`${req.method()} ${new URL(req.url()).pathname}`);
      const mock = syntheticBackendResponse(req.method(), req.url());
      await route.fulfill({ status: mock.status, contentType: 'application/json', body: JSON.stringify(mock.body) });
    });
    // Websocket (realtime) connections are refused outright.
    await context.routeWebSocket(u => isBackendUrl(u.toString().replace(/^ws/, 'http')), ws => ws.close());
    await use(seen);
  }, { auto: true }],
});
export { expect };
