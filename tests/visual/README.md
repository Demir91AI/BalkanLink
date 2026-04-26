# Visual Regression Tests (Playwright)

Vizuelni regresioni testovi za UI komponente koje moraju ostati piksel-stabilne
(npr. zastave, logoi, ikone). Trenutno pokriveno:

- **`flag-ba.spec.ts`** — BiH zastava (`FlagBA`) na 6 širina (16, 20, 32, 48, 96, 200 px),
  u light i dark temi, na 1x i 2x DPR.

## Pokretanje

```bash
# Generiši baseline snapshote (prvi put ili nakon namjernih izmjena dizajna)
bun run test:visual:update

# Pokreni regresione testove (poredi sa committed baseline-om)
bun run test:visual
```

Playwright konfiguracija (`playwright.config.ts`) automatski:

1. Build-uje aplikaciju (`bun run build`).
2. Pokreće `vite preview` na portu 4173.
3. Učitava dev/preview-only fixture rutu `/__visual/flag-ba`
   (definisanu u `src/pages/__visual/VisualFlagBA.tsx`, isključenu iz produkcije
   guardom `import.meta.env.PROD` u `src/App.tsx`).
4. Pravi screenshot per element (`flag-cell-{theme}-{width}`) i poredi sa
   `tests/visual/__snapshots__/`.

## Prag

`maxDiffPixelRatio: 0.01` (toleriše do 1% pixel difference za anti-aliasing).
Geometrijske/boja promjene se odmah hvataju.

## Sistemski preduslovi

Playwright Chromium zahtijeva sistemske libove (libglib, libdbus, libnss, ...).
Na čistom CI runner-u prvo pokreni jednom:

```bash
bunx playwright install --with-deps chromium
```

Na Lovable sandboxu ovi libovi nisu dostupni out-of-the-box, pa baseline treba
generisati lokalno ili na CI-u, ne u Lovable preview okruženju.
