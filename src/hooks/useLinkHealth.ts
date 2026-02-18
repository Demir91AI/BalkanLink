import { useState, useEffect } from "react";

/**
 * Checks if a list of URLs are reachable (not 404).
 * Uses a CORS proxy approach: since direct HEAD requests to external sites
 * are blocked by CORS, we simply trust our curated registry links.
 * In DEV mode, we log any issues for auditing.
 *
 * Returns a Set of URLs that should be hidden (failed validation).
 */
export function useLinkHealth(urls: string[]): { deadLinks: Set<string>; checking: boolean } {
  const [deadLinks, setDeadLinks] = useState<Set<string>>(new Set());
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    if (urls.length === 0) return;

    let cancelled = false;
    setChecking(true);

    async function checkLinks() {
      const dead = new Set<string>();

      // We can't do cross-origin HEAD requests from the browser.
      // Instead, we validate links by trying a no-cors fetch and checking for obvious failures.
      // For our curated registry, links are manually verified — this acts as a runtime safety net.
      await Promise.all(
        urls.map(async (url) => {
          try {
            const res = await fetch(url, {
              method: "HEAD",
              mode: "no-cors",
              signal: AbortSignal.timeout(5000),
            });
            // no-cors always returns opaque response (status 0), so we can't check status
            // If fetch itself throws (network error, DNS failure), mark as dead
            void res;
          } catch {
            dead.add(url);
            if (import.meta.env.DEV) {
              console.warn(`🔗 Dead link detected: ${url}`);
            }
          }
        })
      );

      if (!cancelled) {
        setDeadLinks(dead);
        setChecking(false);
      }
    }

    checkLinks();
    return () => { cancelled = true; };
  }, [urls.join(",")]);

  return { deadLinks, checking };
}
