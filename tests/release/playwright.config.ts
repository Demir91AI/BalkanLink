import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: '.', testMatch: '*.spec.ts', workers: 1,
  outputDir: '/tmp/browser/release-readiness/playwright',
  use: { viewport: { width: 1280, height: 1800 }, headless: true },
});