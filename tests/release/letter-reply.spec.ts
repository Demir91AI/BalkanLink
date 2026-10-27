import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
const locales = Object.fromEntries(['bs', 'hr', 'sr', 'de'].map(lang => [lang,
  JSON.parse(readFileSync(`src/i18n/locales/${lang}/common.json`, 'utf8')),
])) as Record<string, { sidebar: { items: { dokumentenCheck: string; letterReply: string }; newBadge: string } }>;

// Against the existing dev server; no build, deployment, storage writes or login mutation.
for (const [lang, locale] of Object.entries(locales)) {
  for (const viewport of [{ width: 1280, height: 1800 }, { width: 340, height: 900 }]) {
    test(`${lang} ${viewport.width}: sidebar fits and denied deep link preserves language`, async ({ page }) => {
      await page.setViewportSize(viewport);
      const prefix = lang === 'bs' ? '' : `/${lang}`;
      await page.goto(`http://localhost:8080${prefix || '/'}`);
      await page.getByRole('button', { name: locale.sidebar.items.dokumentenCheck, exact: true }).waitFor({ state: 'attached' });
      await page.evaluate(() => window.dispatchEvent(new Event('toggle-sidebar')));
      const item = page.getByRole('button', { name: `${locale.sidebar.items.letterReply} ${locale.sidebar.newBadge}`, exact: true });
      await expect(item).toBeVisible();
      await expect.poll(() => item.evaluate(element => {
        const title = element.children[1]?.getBoundingClientRect();
        const badge = element.children[2]?.getBoundingClientRect();
        return !!title && !!badge && title.right <= badge.left && element.scrollWidth <= element.clientWidth;
      })).toBe(true);
      // Center hit target verifies no navbar/overlay intercepts the new item.
      await expect.poll(() => item.evaluate(element => {
        const rect = element.getBoundingClientRect();
        return element.contains(document.elementFromPoint(rect.x + rect.width / 2, rect.y + rect.height / 2));
      })).toBe(true);
      await item.click();
      await expect(page).toHaveURL(`http://localhost:8080${prefix}/paketi`);
      await page.goto(`http://localhost:8080${prefix}/vorlagen?task=reply`);
      await expect(page).toHaveURL(`http://localhost:8080${prefix}/paketi`);
    });
  }
}