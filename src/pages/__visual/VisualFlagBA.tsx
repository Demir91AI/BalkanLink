/**
 * /__visual/flag-ba — dev/preview-only fixture page used by Playwright visual
 * regression tests. Renders the BiH flag at multiple widths in both light and
 * dark themes side-by-side, with stable IDs so screenshots can be taken per
 * element.
 *
 * Excluded from production via a guard in App.tsx (only mounted when
 * import.meta.env.PROD === false).
 */
import { useEffect } from "react";
import { FlagBA } from "@/components/flags/FlagBA";

const WIDTHS = [14, 16, 18, 20, 24, 32, 36, 48, 64, 96, 200];
const THEMES: Array<"light" | "dark"> = ["light", "dark"];

export default function VisualFlagBA() {
  // Stable layout: no fonts, no animations, no scrolling.
  useEffect(() => {
    const prev = document.documentElement.classList.contains("dark");
    return () => {
      if (prev) document.documentElement.classList.add("dark");
      else document.documentElement.classList.remove("dark");
    };
  }, []);

  return (
    <div
      data-testid="flag-ba-visual-root"
      style={{
        padding: 24,
        display: "flex",
        flexDirection: "column",
        gap: 32,
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {THEMES.map((theme) => (
        <section
          key={theme}
          data-testid={`theme-block-${theme}`}
          style={{
            background: theme === "dark" ? "#020617" : "#ffffff",
            color: theme === "dark" ? "#ffffff" : "#0f172a",
            padding: 24,
            borderRadius: 8,
            border: "1px solid #cbd5e1",
          }}
        >
          <h2 style={{ margin: 0, marginBottom: 16, fontSize: 14 }}>
            theme: {theme}
          </h2>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 24 }}>
            {WIDTHS.map((w) => (
              <div
                key={w}
                data-testid={`flag-cell-${theme}-${w}`}
                style={{ display: "flex", flexDirection: "column", gap: 6 }}
              >
                <FlagBA width={w} />
                <span style={{ fontSize: 10, opacity: 0.7 }}>{w}px</span>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
