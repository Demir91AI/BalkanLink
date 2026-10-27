import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';

// Isolated VISUAL fixture only, NOT proof of authenticated/entitlement access.
// It exercises the real route without mutating any user, setting, or app file.
test.use({ serviceWorkers: 'block' });
for (const lang of ['bs', 'hr', 'sr', 'de']) {
  const locale = JSON.parse(readFileSync(`src/i18n/locales/${lang}/pages.json`, 'utf8'));
  for (const width of [1280, 390]) {
    for (const slug of ['kindergeld', 'kinderzuschlag', 'steuer-id']) {
      test(`${lang} ${width} ${slug}: primary wizard and semantic navigation`, async ({ page }, testInfo) => {
        await page.setViewportSize({ width, height: width === 1280 ? 1800 : 844 });
        await page.route('**/src/lib/dev-mode.ts*', async route => {
          const response = await route.fetch();
          await route.fulfill({ response, body: (await response.text()).replace('export const DEV_MODE = IS_ADMIN_PREVIEW', 'export const DEV_MODE = true') });
        });
        const prefix = lang === 'bs' ? '' : `/${lang}`;
        await page.goto(`http://localhost:8080${prefix}/formulari/${slug}`);
        const guide = page.getByTestId('smartguide-template');
        await expect(guide).toBeVisible();
        expect(await guide.evaluate(e => !!e.closest('details'))).toBe(false);
        await guide.getByRole('button', { name: locale.smartGuideStandard.next, exact: true }).click();
        await expect(guide.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '2');
        await guide.getByRole('button', { name: locale.smartGuideStandard.previous, exact: true }).click();
        await expect(guide.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '1');
        await guide.scrollIntoViewIfNeeded();
        await testInfo.attach('primary-wizard', { body: await guide.screenshot(), contentType: 'image/png' });
        const jumps = guide.locator('nav button');
        if (slug === 'kindergeld') {
          await expect(jumps).toHaveCount(7);
          await jumps.nth(4).click();
          await page.getByTestId('kg-field-guide').getByRole('tab', { name: locale.guideFirst.kindergeld.fields.mode.paper, exact: true }).click();
          await expect(page.getByTestId('kg-paper-details').locator('button[aria-expanded]')).toHaveCount(20);
          await jumps.last().click();
          await expect(guide.getByText(locale.smartGuideStandard.summary, { exact: true })).toBeVisible();
        }
        expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
      });
    }
  }
}