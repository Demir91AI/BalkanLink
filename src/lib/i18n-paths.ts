import type { SupportedLanguage } from "@/i18n";

/** All non-default language URL prefixes. BS is implicit (root). */
const PREFIXES = ["de", "hr", "sr"] as const;
const PREFIX_RE = /^\/(de|hr|sr)(?=\/|$)/;

/** True if the pathname currently belongs to any non-BS language tree. */
export function hasLangPrefix(pathname: string): boolean {
  return PREFIX_RE.test(pathname);
}

/**
 * Strip any /de, /hr, /sr prefix from the pathname, returning the canonical
 * Bosnian (root) version. Trailing slash is preserved when present.
 *
 *   '/hr/foo'  → '/foo'
 *   '/de'      → '/'
 *   '/sr'      → '/'
 *   '/foo'     → '/foo'
 */
export function stripLangPrefix(pathname: string): string {
  const stripped = pathname.replace(PREFIX_RE, "");
  return stripped === "" ? "/" : stripped;
}

/**
 * Backwards-compat alias — the original helper only handled `/de`. Now it
 * strips any supported prefix. Existing callers (SEO.tsx, etc.) keep working.
 */
export const stripGermanPrefix = stripLangPrefix;

/**
 * Compute the mirror pathname for the target language.
 *
 *   mirrorPath('/foo',     'de') → '/de/foo'
 *   mirrorPath('/de/foo',  'bs') → '/foo'
 *   mirrorPath('/de',      'bs') → '/'
 *   mirrorPath('/',        'hr') → '/hr'
 *   mirrorPath('/sr/porezi','de') → '/de/porezi'
 */
export function mirrorPath(
  pathname: string,
  target: SupportedLanguage,
): string {
  const bsPath = stripLangPrefix(pathname);
  if (target === "bs") return bsPath;
  if (bsPath === "/") return `/${target}`;
  return `/${target}${bsPath}`;
}

/** Detect language purely from a pathname. Falls back to 'bs'. */
export function langFromPath(pathname: string): SupportedLanguage {
  const m = pathname.match(PREFIX_RE);
  if (m && (PREFIXES as readonly string[]).includes(m[1])) {
    return m[1] as SupportedLanguage;
  }
  return "bs";
}

/** True only for /de paths — kept for the few legacy call sites. */
export function isGermanPath(pathname: string): boolean {
  return langFromPath(pathname) === "de";
}
