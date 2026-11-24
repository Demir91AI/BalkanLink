import { describe, it, expect } from "vitest";
import { normalizeCommitSha, resolveCommitSha, buildVersionPayload } from "../../build/build-provenance";

const SHA = "917aeb24c0ffee1234567890abcdef1234567890";
describe("build provenance", () => {
  it("accepts valid hex SHA, rejects others", () => {
    expect(normalizeCommitSha(SHA.toUpperCase())).toBe(SHA);
    expect(normalizeCommitSha("abc")).toBeNull();
    expect(normalizeCommitSha("not-a-sha-value")).toBeNull();
    expect(normalizeCommitSha("a".repeat(41))).toBeNull();
    expect(normalizeCommitSha(undefined)).toBeNull();
  });
  it("prefers trusted env, then git, else unknown", () => {
    expect(resolveCommitSha({ GITHUB_SHA: SHA }, () => "1234567")).toEqual({ commit: SHA, commitSource: "env:GITHUB_SHA" });
    expect(resolveCommitSha({ GITHUB_SHA: "bad" }, () => "1234567")).toEqual({ commit: "1234567", commitSource: "git" });
    expect(resolveCommitSha({}, () => { throw new Error("no git"); })).toEqual({ commit: null, commitSource: "unknown" });
    expect(resolveCommitSha({ SECRET: SHA }, () => null)).toEqual({ commit: null, commitSource: "unknown" });
  });
  it("keeps version/builtAt compatible with AppUpdatePrompt", () => {
    const p = buildVersionPayload("1-abc", "2026-11-24T00:00:00.000Z", { commit: null, commitSource: "unknown" });
    const j = JSON.parse(JSON.stringify(p));
    expect(typeof j.version === "string" ? j.version : null).toBe("1-abc");
    expect(j.builtAt).toBe("2026-11-24T00:00:00.000Z");
    expect(Object.keys(j).sort()).toEqual(["builtAt", "commit", "commitSource", "version"]);
  });
});
