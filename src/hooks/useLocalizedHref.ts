/**
 * useLocalizedHref / useLocalizedNavigate
 *
 * Helpers that prefix internal paths with the active language segment
 * so links and navigations stay on the user's current language tree.
 *
 *   bs (default) → '/viza'
 *   de           → '/de/viza'
 *   hr           → '/hr/viza'
 *   sr           → '/sr/viza'
 *
 * External URLs (http/https/mailto/tel/#) and already-prefixed paths
 * (e.g. '/de/...', '/hr/...', '/sr/...') are returned as-is.
 */
import { useCallback } from "react";
import { useLocation, useNavigate, type NavigateOptions } from "react-router-dom";
import { langFromPath } from "@/lib/i18n-paths";
import type { SupportedLanguage } from "@/i18n";

const PREFIXED_RE = /^\/(de|hr|sr)(?=\/|$)/;

function isExternal(path: string): boolean {
  return (
    /^([a-z]+:)?\/\//i.test(path) ||
    path.startsWith("mailto:") ||
    path.startsWith("tel:") ||
    path.startsWith("#")
  );
}

export function localizeHref(path: string, lang: SupportedLanguage): string {
  if (!path) return path;
  if (isExternal(path)) return path;
  if (!path.startsWith("/")) return path; // relative, leave alone
  if (lang === "bs") return path;
  if (PREFIXED_RE.test(path)) return path; // already prefixed
  const prefix = `/${lang}`;
  if (path === "/") return prefix;
  return `${prefix}${path}`;
}

/** Returns a function that converts an internal path to the current language. */
export function useLocalizedHref() {
  const { pathname } = useLocation();
  const lang = langFromPath(pathname);
  return useCallback((path: string) => localizeHref(path, lang), [lang]);
}

/** Drop-in replacement for `useNavigate()` that respects the current language. */
export function useLocalizedNavigate() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const lang = langFromPath(pathname);
  return useCallback(
    (to: string | number, options?: NavigateOptions) => {
      if (typeof to === "number") return navigate(to);
      return navigate(localizeHref(to, lang), options);
    },
    [navigate, lang],
  );
}
