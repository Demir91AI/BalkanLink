import type { SupportedLanguage } from "@/i18n";

const DE_PREFIX = "/de";

/** True if the pathname currently belongs to the German tree. */
export function isGermanPath(pathname: string): boolean {
  return pathname === DE_PREFIX || pathname.startsWith(`${DE_PREFIX}/`);
}

/** Strip the /de prefix from a pathname, returning the Bosnian (root) version. */
export function stripGermanPrefix(pathname: string): string {
  if (pathname === DE_PREFIX) return "/";
  if (pathname.startsWith(`${DE_PREFIX}/`)) return pathname.slice(DE_PREFIX.length);
  return pathname;
}

/**
 * Compute the mirror pathname for the target language.
 * Examples:
 *   mirrorPath('/foo', 'de')      => '/de/foo'
 *   mirrorPath('/de/foo', 'bs')   => '/foo'
 *   mirrorPath('/de', 'bs')       => '/'
 *   mirrorPath('/', 'de')         => '/de'
 */
export function mirrorPath(pathname: string, target: SupportedLanguage): string {
  const bsPath = stripGermanPrefix(pathname);
  if (target === "bs") return bsPath;
  if (bsPath === "/") return DE_PREFIX;
  return `${DE_PREFIX}${bsPath}`;
}

/** Detect language purely from a pathname. */
export function langFromPath(pathname: string): SupportedLanguage {
  return isGermanPath(pathname) ? "de" : "bs";
}
