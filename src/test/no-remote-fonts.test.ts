import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

// Privacy guard: fonts must be self-hosted, never loaded from third-party font CDNs.
const BANNED = [/fonts\.googleapis\.com/, /fonts\.gstatic\.com/, /use\.typekit\.net/, /fonts\.bunny\.net/];

function files(dir: string): string[] {
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    if (statSync(p).isDirectory()) return files(p);
    return /\.(tsx?|css|html|json)$/.test(n) && !n.endsWith("no-remote-fonts.test.ts") ? [p] : [];
  });
}

describe("no remote font URLs", () => {
  const targets = [...files("src"), "index.html", ...files("public").filter((f) => /\.(html|json|css)$/.test(f))];
  it.each(targets)("%s", (f) => {
    const text = readFileSync(f, "utf8");
    for (const re of BANNED) expect(text, `${f} contains ${re}`).not.toMatch(re);
  });
});
