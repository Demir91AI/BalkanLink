/**
 * Phase 1 NO-DOWNGRADE extractors. Pure static reads of the repository —
 * shared by the baseline generator and the regression tests.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

export const ROOT = join(__dirname, "..", "..", "..");
const read = (p: string) => readFileSync(join(ROOT, p), "utf8");

export function walk(dir: string, exts = [".ts", ".tsx"]): string[] {
  const out: string[] = [];
  for (const name of readdirSync(join(ROOT, dir))) {
    const rel = join(dir, name);
    const st = statSync(join(ROOT, rel));
    if (st.isDirectory()) out.push(...walk(rel, exts));
    else if (exts.some((e) => name.endsWith(e))) out.push(rel);
  }
  return out;
}

/** All `<Route path="...">` values in App.tsx (unique, sorted). */
export function routePaths(): string[] {
  const src = read("src/App.tsx");
  return [...new Set([...src.matchAll(/<Route\s+path="([^"]+)"/g)].map((m) => m[1]))].sort();
}

/** path -> Navigate target for every redirect route in App.tsx. */
export function redirects(): Record<string, string> {
  const src = read("src/App.tsx");
  const out: Record<string, string> = {};
  for (const m of src.matchAll(/<Route\s+path="([^"]+)"\s+element=\{<Navigate\s+to="([^"]+)"/g)) out[m[1]] = m[2];
  return out;
}

/** path -> element component name for non-redirect routes. */
export function routeElements(): Record<string, string> {
  const src = read("src/App.tsx");
  const out: Record<string, string> = {};
  for (const m of src.matchAll(/<Route\s+path="([^"]+)"\s+element=\{<([A-Z][A-Za-z0-9]*)/g)) {
    if (m[2] !== "Navigate") out[m[1]] = m[2];
  }
  return out;
}

/** Routes nested inside the <AdminGuard> block. */
export function adminGuardedPaths(): string[] {
  const src = read("src/App.tsx");
  const start = src.indexOf("<Route element={<AdminGuard />}>");
  if (start < 0) return [];
  const end = src.indexOf("</Route>", start);
  return [...src.slice(start, end).matchAll(/path="([^"]+)"/g)].map((m) => m[1]).sort();
}

/** Language prefixes routed to LocalizedRoutes. */
export function languagePrefixes(): string[] {
  const src = read("src/App.tsx");
  return [...src.matchAll(/<Route\s+path="\/([a-z]{2})\/\*"\s+element=\{<LocalizedRoutes/g)].map((m) => m[1]).sort();
}

/** Literal browser-storage keys used by form pages / components. */
export function storageKeys(): string[] {
  const keys = new Set<string>();
  for (const f of [...walk("src/pages"), ...walk("src/components"), ...walk("src/hooks")]) {
    if (/\.test\.tsx?$/.test(f)) continue;
    const s = read(f);
    for (const m of s.matchAll(/const\s+LS_[A-Z_]*KEY\s*=\s*["'`]([^"'`$]+)["'`]/g)) keys.add(m[1]);
    for (const m of s.matchAll(/localStorage\.(?:getItem|setItem|removeItem)\(\s*["']([^"']+)["']/g)) keys.add(m[1]);
  }
  return [...keys].sort();
}

/** Relative import specifiers of a source file. */
export function importsOf(file: string): string[] {
  const s = read(file);
  return [...new Set([...s.matchAll(/from\s+["']([^"']+)["']/g)].map((m) => m[1]))].sort();
}

export const fileText = read;
export const rel = (p: string) => relative(ROOT, p);
