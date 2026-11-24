import { describe, it, expect } from "vitest";
import { isBackendUrl, syntheticBackendResponse } from "../../tests/release/backend-guard";

const B = "https://example123.supabase.co";
describe("release backend guard", () => {
  it("detects only backend hosts", () => {
    expect(isBackendUrl(`${B}/rest/v1/x`)).toBe(true);
    expect(isBackendUrl("http://localhost:8080/")).toBe(false);
    expect(isBackendUrl("https://supabase.co.evil.com/")).toBe(false);
  });
  it("never allows writes, functions, auth or storage", () => {
    expect(syntheticBackendResponse("GET", `${B}/rest/v1/profiles`)).toEqual({ status: 200, body: [] });
    expect(syntheticBackendResponse("POST", `${B}/rest/v1/profiles`).status).toBe(403);
    expect(syntheticBackendResponse("POST", `${B}/functions/v1/chat-assistant`).status).toBe(503);
    expect(syntheticBackendResponse("GET", `${B}/auth/v1/user`).status).toBe(401);
    expect(syntheticBackendResponse("GET", `${B}/storage/v1/object/tts-audio/a.mp3`).status).toBe(404);
  });
});
