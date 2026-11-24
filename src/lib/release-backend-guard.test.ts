import { describe, it, expect } from "vitest";
import { backendHosts, classifyRequest, syntheticBackendResponse } from "../../tests/release/network-policy";

const B = "https://example123.supabase.co";
describe("release network policy", () => {
  it("allows only local hosts for real", () => {
    expect(classifyRequest("http://localhost:8080/")).toBe("local");
    expect(classifyRequest("http://127.0.0.1:4173/a.js")).toBe("local");
    expect(classifyRequest("data:image/png;base64,AA")).toBe("local");
  });
  it("mocks backend incl. websocket and configured custom host", () => {
    expect(classifyRequest(`${B}/rest/v1/x`)).toBe("backend-mock");
    expect(classifyRequest("wss://example123.supabase.co/realtime/v1/websocket")).toBe("backend-mock");
    const extra = backendHosts({ VITE_SUPABASE_URL: "https://api.balkanlink.de" });
    expect(classifyRequest("https://api.balkanlink.de/rest/v1/x", extra)).toBe("backend-mock");
  });
  it("fails closed on anything else", () => {
    expect(classifyRequest("https://supabase.co.evil.com/")).toBe("abort-unexpected");
    expect(classifyRequest("https://api.stripe.com/v1/x")).toBe("abort-unexpected");
    expect(classifyRequest("https://balkanlink.de/")).toBe("abort-unexpected");
    expect(classifyRequest("not a url")).toBe("abort-unexpected");
    expect(classifyRequest("https://flagcdn.com/ba.svg")).toBe("abort-tolerated");
  });
  it("never allows writes, functions, auth or storage", () => {
    expect(syntheticBackendResponse("GET", `${B}/rest/v1/profiles`)).toEqual({ status: 200, body: [] });
    expect(syntheticBackendResponse("POST", `${B}/rest/v1/profiles`).status).toBe(403);
    expect(syntheticBackendResponse("POST", `${B}/functions/v1/chat-assistant`).status).toBe(503);
    expect(syntheticBackendResponse("GET", `${B}/auth/v1/user`).status).toBe(401);
    expect(syntheticBackendResponse("GET", `${B}/storage/v1/object/tts-audio/a.mp3`).status).toBe(404);
  });
  it("unit-test fetch to external hosts is blocked", async () => {
    await expect(fetch("https://example.com/")).rejects.toThrow(/Network blocked/);
    expect(() => new WebSocket("wss://example.com")).toThrow(/blocked/);
  });
});
