/**
 * Visual regression tests for the BiH flag (FlagBA).
 *
 * Renders /__visual/flag-ba (a dev/preview-only fixture page) and snapshots:
 *  - each width (16, 20, 32, 48, 96, 200) per theme
 *  - the entire light-theme block
 *  - the entire dark-theme block
 *
 * Snapshots run at 1x and 2x DPR via the `chromium-1x` and `chromium-2x`
 * projects in `playwright.config.ts`, so any drift in geometry, colours,
 * star count, or anti-aliasing is caught immediately.
 *
 * To accept legitimate visual changes, run:
 *   bunx playwright test --update-snapshots
 */
import { test, expect } from "@playwright/test";

const WIDTHS = [16, 20, 32, 48, 96, 200] as const;
const THEMES = ["light", "dark"] as const;

test.beforeEach(async ({ page }) => {
  await page.goto("/__visual/flag-ba");
  await page.waitForSelector('[data-testid="flag-ba-visual-root"]');
  // Wait one frame so the SVG has definitely committed.
  await page.evaluate(
    () => new Promise((r) => requestAnimationFrame(() => r(null))),
  );
});

for (const theme of THEMES) {
  test.describe(`FlagBA visual — ${theme} theme`, () => {
    for (const width of WIDTHS) {
      test(`renders correctly at ${width}px`, async ({ page }) => {
        const cell = page.getByTestId(`flag-cell-${theme}-${width}`);
        await expect(cell).toBeVisible();
        await expect(cell).toHaveScreenshot(`flag-${theme}-${width}.png`);
      });
    }

    test(`full ${theme} block matches snapshot`, async ({ page }) => {
      const block = page.getByTestId(`theme-block-${theme}`);
      await expect(block).toHaveScreenshot(`block-${theme}.png`);
    });
  });
}
