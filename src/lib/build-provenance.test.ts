import { describe, it, expect } from "vitest";
import { normalizeCommitSha, resolveCommitSha, buildVersionPayload } from "../../scripts/build-provenance";

const A = "917aeb24c0ffee1234567890abcdef1234567890";
const B = "4271a87c1fbb1684abc6c07822ea1e4f084f1497";
const clean = (head: string | null) => () => ({ head, dirty: false });

describe("build provenance", () => {
  it("requires a full 40-hex SHA", () => {
    expect(normalizeCommitSha(A.toUpperCase())).toBe(A);
    expect(normalizeCommitSha("917aeb2")).toBeNull();
    expect(normalizeCommitSha("g".repeat(40))).toBeNull();
    expect(normalizeCommitSha("a".repeat(41))).toBeNull();
    expect(normalizeCommitSha(undefined)).toBeNull();
  });
  it("uses clean git HEAD", () => {
    expect(resolveCommitSha({}, clean(B + "\n"))).toEqual({ commit: B, commitSource: "git" });
  });
  it("dirty or unknown tracked tree gives unknown", () => {
    expect(resolveCommitSha({}, () => ({ head: B, dirty: true }))).toEqual({ commit: null, commitSource: "unknown" });
    expect(resolveCommitSha({}, () => ({ head: B, dirty: null }))).toEqual({ commit: null, commitSource: "unknown" });
  });
  it("conflicting sources give unknown", () => {
    expect(resolveCommitSha({ GITHUB_SHA: A }, clean(B))).toEqual({ commit: null, commitSource: "unknown" });
    expect(resolveCommitSha({ GITHUB_SHA: A, COMMIT_SHA: B }, () => { throw new Error("no git"); })).toEqual({ commit: null, commitSource: "unknown" });
  });
  it("agreeing env and git, or env only", () => {
    expect(resolveCommitSha({ GITHUB_SHA: B }, clean(B))).toEqual({ commit: B, commitSource: "env+git" });
    expect(resolveCommitSha({ GITHUB_SHA: A }, () => { throw new Error("no git"); })).toEqual({ commit: A, commitSource: "env:GITHUB_SHA" });
  });
  it("ignores unrelated env and short SHAs", () => {
    expect(resolveCommitSha({ SECRET: A, GITHUB_SHA: "917aeb2" }, () => ({ head: null, dirty: null }))).toEqual({ commit: null, commitSource: "unknown" });
  });
  it("keeps version/builtAt compatible with AppUpdatePrompt", () => {
    const j = JSON.parse(JSON.stringify(buildVersionPayload("1-abc", "2026-11-24T00:00:00.000Z", { commit: null, commitSource: "unknown" })));
    expect(typeof j.version === "string" ? j.version : null).toBe("1-abc");
    expect(j.builtAt).toBe("2026-11-24T00:00:00.000Z");
    expect(Object.keys(j).sort()).toEqual(["builtAt", "commit", "commitSource", "version"]);
  });
});
