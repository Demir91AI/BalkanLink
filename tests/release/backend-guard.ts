import { test as base, expect } from '@playwright/test';
import { backendHosts, classifyRequest, syntheticBackendResponse } from './network-policy';

export { classifyRequest, syntheticBackendResponse } from './network-policy';
export const isBackendUrl = (url: string) => classifyRequest(url) === 'backend-mock';

// Auto fixture for every browser test: service workers blocked, real network
// limited to localhost, backend answered locally, websockets to non-local hosts
// closed, direct APIRequestContext disabled. Unexpected hosts fail the test.
export const test = base.extend<{ networkGuard: { backend: string[]; unexpected: string[] } }>({
  serviceWorkers: 'block',
  request: async ({}, use) => {
    await use(new Proxy({}, { get: () => { throw new Error('Direct APIRequestContext is disabled in isolated tests'); } }) as never);
  },
  networkGuard: [async ({ context }, use) => {
    const extra = backendHosts(process.env);
    const log = { backend: [] as string[], unexpected: [] as string[] };
    await context.route('**/*', async route => {
      const req = route.request();
      const d = classifyRequest(req.url(), extra);
      if (d === 'local') return route.fallback();
      if (d === 'backend-mock') {
        log.backend.push(`${req.method()} ${new URL(req.url()).pathname}`);
        const m = syntheticBackendResponse(req.method(), req.url());
        return route.fulfill({ status: m.status, contentType: 'application/json', body: JSON.stringify(m.body) });
      }
      if (d === 'abort-unexpected') log.unexpected.push(`${req.method()} ${req.url()}`);
      return route.abort('blockedbyclient');
    });
    await context.routeWebSocket(u => classifyRequest(u.toString(), extra) !== 'local', ws => ws.close());
    await use(log);
    expect(log.unexpected, 'unexpected external requests (blocked)').toEqual([]);
  }, { auto: true }],
});
export { expect };
