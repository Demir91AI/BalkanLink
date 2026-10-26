# BalkanLink 2.0 — Phase 1 No-Downgrade Baseline (2026-10-26)

Development only. Nothing published; no data, payment, access, route or copy changes.

## What is pinned (`src/test/phase1/baseline.json`)
| Item | Count | Rule |
|---|---|---|
| Route paths in `App.tsx` | 200 | may grow, never shrink |
| Redirects (path → target) | 31 | target must stay identical |
| Route → page component | 169 | same page per path |
| Admin routes behind `AdminGuard` | 6 | any `admin*` route must be guarded |
| Browser-storage keys (saved form entries etc.) | 54 | never renamed/removed |
| Hub files with pinned imports | 10 | imports may be added, not removed |
| Language prefixes | de / hr / sr + bs root `/*` | exact |
| Family PDF field mappings (snapshots) | KG1, KiZ1, Mutterschaftsgeld, Elterngeld ×11 states | any mapping change must be reviewed |
| Payment contract | one `plus` 19,90 € one-time product; 2 legacy monthly prices recognised; webhook renewals; lifetime never downgraded; no cancel calls | exact |
| Label rule | `outputLabelFor()` — no current form can be "verified official" | new 2.0 UI must use it |

To accept an approved change: regenerate `baseline.json` / snapshots (`bunx vitest run -u src/test/phase1`) only with owner sign-off.

## Assumptions (not verified by these tests)
- Static code checks: they prove routes/keys/contracts exist in code, not that pages render correctly in a browser.
- Payment checks are text-level; real Stripe behaviour and database access rules are not exercised.
- Snapshots record field names/types written by our builders, not that the bundled PDFs are official or current (see FormularPilot inventory).
- Storage-key detection covers `LS_*KEY` constants and literal `localStorage` calls in pages/components/hooks; dynamically built keys are not captured.

## Regression checklist (manual, before any 2.0 release)
1. Landing `/` → guides → a guide page opens in bs, /hr, /sr, /de.
2. `/familie` → Kindergeld card → `/musterformular/kindergeld` → fill → "Preuzmi" downloads a PDF; reload keeps entries.
3. `/musterformular/elterngeld` → change state → download for Bayern and one other state.
4. `/ai-asistent` (and old `/asistent`) opens, signed-out and signed-in.
5. `/dokumenten-check` upload flow works for a full-access user, no separate payment prompt.
6. `/paketi` (and old `/pricing`) shows the single offer; checkout opens; legacy subscriber still has access.
7. `/admin` blocked for normal users; admin sees dashboard, forms, Stripe sync.
8. Old deep links: `/formulari/kindergeld/muster`, `/formulare`, `/guide/:slug`, `/deutsch`.

## Next tiny recommended UI improvement
Translate the hardcoded `/familie` hub title and subtitle (currently always Bosnian) into the 4 locale files — copy only, no layout change, needs approval.
