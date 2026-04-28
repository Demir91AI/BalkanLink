import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const STORAGE_KEY = "balkanlink:recent-pages";
const MAX_RECENT = 3;

// Stranice koje ne želimo u "Nedavno"
const EXCLUDED_PATHS = ["/", "/login", "/register", "/reset-password", "/auth"];

export type RecentPage = {
  path: string;
  visitedAt: number;
};

export function useRecentPages(): RecentPage[] {
  const location = useLocation();
  const [recent, setRecent] = useState<RecentPage[]>([]);

  // Učitaj iz localStorage na mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setRecent(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  // Snimi promjenu rute
  useEffect(() => {
    const path = location.pathname.replace(/^\/(de|hr|sr)(?=\/|$)/, "") || "/";
    if (EXCLUDED_PATHS.some((p) => path === p || path.startsWith(p + "/"))) return;

    setRecent((prev) => {
      const filtered = prev.filter((r) => r.path !== path);
      const next = [{ path, visitedAt: Date.now() }, ...filtered].slice(0, MAX_RECENT);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, [location.pathname]);

  return recent;
}
