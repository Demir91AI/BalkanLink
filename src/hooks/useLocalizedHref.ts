/**
 * useLocalizedHref / useLocalizedNavigate
 *
 * Helpers that prefix internal paths with the active language segment
 * so links and navigations stay on the user's current language tree.
 *
 * - Bosnian (default): paths are returned untouched (e.g. "/viza").
 * - German: paths are prefixed with "/de" (e.g. "/de/viza").
 *
 * External URLs (http/https/mailto/tel/#) and already-prefixed "/de/..."
 * paths are returned as-is.
 */
import { useCallback } from "react";
import { useLocation, useNavigate, type NavigateOptions } from "react-router-dom";
import { isGermanPath } from "@/lib/i18n-paths";

const DE_PREFIX = "/de";

function isExternal(path: string): boolean {
  return (
    /^([a-z]+:)?\/\//i.test(path) ||
    path.startsWith("mailto:") ||
    path.startsWith("tel:") ||
    path.startsWith("#")
  );
}

export function localizeHref(path: string, isDe: boolean): string {
  if (!path) return path;
  if (isExternal(path)) return path;
  if (!path.startsWith("/")) return path; // relative, leave alone
  if (!isDe) return path;
  if (path === DE_PREFIX || path.startsWith(`${DE_PREFIX}/`)) return path;
  if (path === "/") return DE_PREFIX;
  return `${DE_PREFIX}${path}`;
}

/** Returns a function that converts an internal path to the current language. */
export function useLocalizedHref() {
  const { pathname } = useLocation();
  const isDe = isGermanPath(pathname);
  return useCallback((path: string) => localizeHref(path, isDe), [isDe]);
}

/** Drop-in replacement for `useNavigate()` that respects the current language. */
export function useLocalizedNavigate() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isDe = isGermanPath(pathname);
  return useCallback(
    (to: string | number, options?: NavigateOptions) => {
      if (typeof to === "number") return navigate(to);
      return navigate(localizeHref(to, isDe), options);
    },
    [navigate, isDe],
  );
}
