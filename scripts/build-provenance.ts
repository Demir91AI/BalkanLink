// Pure helpers for build provenance in /version.json. Only the named commit
// variables below are read; values must be full 40-hex SHAs. Conflicting
// sources or a dirty tracked working tree yield "unknown" instead of a
// potentially misleading commit.
export const COMMIT_ENV_KEYS = ["GITHUB_SHA", "COMMIT_SHA", "SOURCE_COMMIT", "VERCEL_GIT_COMMIT_SHA", "CF_PAGES_COMMIT_SHA"] as const;

const SHA_RE = /^[0-9a-f]{40}$/;

export function normalizeCommitSha(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const v = value.trim().toLowerCase();
  return SHA_RE.test(v) ? v : null;
}

export interface GitInfo {
  /** Output of `git rev-parse HEAD`, or null when unavailable. */
  head: string | null;
  /** True when tracked files differ from HEAD; null when unknown. */
  dirty: boolean | null;
}

export type Provenance = { commit: string | null; commitSource: string };

const UNKNOWN: Provenance = { commit: null, commitSource: "unknown" };

export function resolveCommitSha(env: Record<string, string | undefined>, readGit: () => GitInfo): Provenance {
  const envShas = new Map<string, string>();
  for (const key of COMMIT_ENV_KEYS) {
    const sha = normalizeCommitSha(env[key]);
    if (sha) envShas.set(key, sha);
  }
  let git: GitInfo = { head: null, dirty: null };
  try { git = readGit(); } catch { git = { head: null, dirty: null }; }
  const gitSha = normalizeCommitSha(git.head);

  const distinct = new Set<string>(envShas.values());
  if (gitSha) distinct.add(gitSha);
  if (distinct.size !== 1) return UNKNOWN; // none, or conflicting sources
  const [commit] = distinct;

  if (gitSha) {
    if (git.dirty !== false) return UNKNOWN; // dirty or unverifiable tree
    return { commit, commitSource: envShas.size ? "env+git" : "git" };
  }
  const [firstKey] = envShas.keys();
  return { commit, commitSource: `env:${firstKey}` };
}

export function buildVersionPayload(version: string, builtAt: string, c: Provenance) {
  return { version, builtAt, commit: c.commit, commitSource: c.commitSource };
}
