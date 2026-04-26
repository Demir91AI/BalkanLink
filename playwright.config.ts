import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright config — visual regression for the BiH flag.
 *
 * Boots `vite preview` on port 4173 (built once via `bun run build`) and runs
 * the visual specs in `tests/visual/`. Snapshots are stored next to each spec
 * in `__snapshots__/` and committed for regression diffing.
 */
export default defineConfig({
  testDir: "./tests/visual",
  snapshotPathTemplate:
    "{testDir}/__snapshots__/{testFilePath}/{arg}{ext}",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  reporter: [["list"]],
  use: {
    baseURL: "http://127.0.0.1:4173",
    trace: "off",
    // Lock device pixel ratio so screenshots are byte-stable across machines
    // (still allows multi-DPR coverage via the `projects` array below).
    viewport: { width: 1280, height: 800 },
  },
  expect: {
    toHaveScreenshot: {
      // Tiny anti-aliasing differences are tolerated; geometry/color drift is not.
      maxDiffPixelRatio: 0.01,
      threshold: 0.1,
    },
  },
  projects: [
    {
      name: "chromium-1x",
      use: { ...devices["Desktop Chrome"], deviceScaleFactor: 1 },
    },
    {
      name: "chromium-2x",
      use: { ...devices["Desktop Chrome"], deviceScaleFactor: 2 },
    },
  ],
  webServer: {
    command: "bun run build && bunx vite preview --port 4173 --strictPort",
    url: "http://127.0.0.1:4173",
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
