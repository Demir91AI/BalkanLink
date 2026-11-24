import "@testing-library/jest-dom";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

// Test isolation: unit tests never reach a real network host. Tests that need
// fetch must mock it (vi.stubGlobal / assignment overrides this guard).
const realFetch = globalThis.fetch;
globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
  const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
  const host = (() => { try { return new URL(url, "http://localhost").hostname; } catch { return ""; } })();
  if (host !== "localhost" && host !== "127.0.0.1") throw new Error(`Network blocked in unit tests: ${host}`);
  return realFetch(input, init);
}) as typeof fetch;
class BlockedWebSocket { constructor() { throw new Error("WebSocket blocked in unit tests"); } }
Object.defineProperty(globalThis, "WebSocket", { writable: true, configurable: true, value: BlockedWebSocket });
