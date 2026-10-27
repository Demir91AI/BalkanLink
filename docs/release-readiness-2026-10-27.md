# BalkanLink — release preparation, 2026-10-27

**No publish/deploy performed. This is source preparation, not release approval.**

Starting HEAD: `094f0832c7cd1a5d3497a28ce6c1eb6a4d21d098`. The sandbox manages subsequent commits automatically; no git commit was created by the agent. Consult current HEAD for the final source revision.

## What a future manual Publish would expose
- The shared `isLetterReplyVisible` policy now returns true in every build/domain. Existing callers and access checks remain intact.
- Desktop/mobile sidebar entry directly after DokumentenCheck: BS/SR “Odgovor na pismo / NOVO”, HR “Odgovor na dopis / NOVO”, DE “Behördenbrief beantworten / NEU”.
- Existing homepage and Vorlagen CTAs, overview-only `/vorlagen?task=reply` and `/hr`, `/sr`, `/de` equivalents; existing DocumentenCheck result CTA also inherits the policy.
- Existing subscription authorization is unchanged. Visibility does not grant permission. Access denied redirects to localized `/paketi`; loading waits; close replaces only `task`, preserves other query/fragment, unmounts draft state.
- Four purposes, deterministic German correspondence, two mandatory reviews, editable output, local PDF/copy, and no draft persistence/external processing/automatic submission are unchanged.

**WARNING: a manual Publish can include ALL staged/current project changes, not solely this feature. Review the entire 2.0 source and any pending Cloud/function changes first. No claim that all other staged work is ready.**

## Exact changed files
- `src/lib/letter-reply/visibility.ts` — unconditional visibility, compatible signature; no entitlement change.
- `src/lib/letter-reply/visibility.test.ts`, `sidebar-integration.test.tsx`, `home-integration.test.tsx`, `model.test.ts` — revised future production visibility assertions, real visibility policy in host integrations, preserved gates/privacy.
- `src/lib/letter-reply/release-review.test.tsx` — production-mode wizard review/edit invalidation and draft discard regression.
- `src/components/AppUpdatePrompt.tsx`, `AppUpdatePrompt.test.tsx` — minimal version-baseline recovery; no service worker, manifest, storage, reload or cache behavior changed.
- `tests/release/letter-reply.spec.ts`, `tests/release/playwright.config.ts` — repeatable four-language desktop/mobile signed-out click/deep-link/hit-target geometry tests against existing localhost server; no build/deploy.
- `AGENTS.md`, `roadmap.md`, this report — contract and checklist. Owner preference saved in project memory.

## PWA read-only inspection and minimal correction
- Existing `/sw.js` uses network-first navigation, cache-first hashed assets; `/version.json` normally reaches the network. The current HTML shell reloads from network when online. A currently open document does not become new code merely because Publish completes.
- Vite production builds emit a fresh version; AppUpdatePrompt polls every 5 minutes while mounted in Layout, checks worker every 30 minutes, and offers an existing **user-clicked** reload. Browser timer throttling/offline delays detection; pages outside Layout have no such prompt. First reopen/reload online is the reliable way to request the new shell. Saving/downloading a draft before choosing reload is necessary; drafts are intentionally not retained.
- Concrete fixed bug: if the first version fetch failed, later successful polls never established the baseline. Polling now establishes it on the next successful request and detects subsequent version changes. No new polling, cache busting, forced reload, service-worker registration/unregistration, cache deletion, login invalidation, manifest changes or packages introduced.
- Existing risks remain: `main.tsx` lacks an explicit DEV registration exclusion on localhost and unregisters all workers in its preview/iframe branch; `sw.js` activation deletes every cache except its current cache; non-hashed assets remain cache-first. These were **not changed or activated**, and no installed-PWA cache cleanup was attempted. A separately approved guarded PWA remediation is needed before claiming installation/update safety. Do not bump cache/version or clear storage as a workaround.
- Installed-app metadata (`id`, `start_url`, `scope`, display) was not changed; no reinstall required specifically by this patch. Actual existing iOS/Android app update behavior is not verified.

## Verification
- `bunx vitest run`: **782 passed, 22 files**; all Phase 1 baseline/snapshots unchanged. Includes DEV=false visibility, four-language actual sidebar→Vorlagen integration with mocked subscription outcomes, denied/loading/history/query cleanup, reviews/edit invalidation/draft discard and polling recovery.
- `bun run i18n:check`: **fails with 428 existing missing-key findings**, checks only bs/de and selected namespaces. No new UI text was added. Reply namespace key parity and German document text across bs/hr/sr/de pass existing tests; sidebar titles/NEW badges tested in all four.
- Automatic preview compilation: latest observed `build OK`. Manual production build and separate TypeScript checker are forbidden by sandbox harness, so neither is claimed. DEV=false component/policy tests are **not** a separately built production-bundle browser run.
- Playwright actual localhost app: BS/HR/SR/DE at 1280×1800 and 340×900; homepage CTA visible, sidebar title/badge fits, click and direct task URL go to correct localized `/paketi`; zero page runtime errors in these signed-out flows. Screenshots inspected.
- Isolated browser component fixture (not an authenticated host): all four languages, desktop/mobile, real LetterReplyTask + MobileBottomNav, both review gates, PDF download and close passed. Close center remains clickable; screenshots show mobile navbar does not cover the initial wizard controls. Document screen is scrollable; screenshot may reflect scroll position, not missing content. No all-step safe-area/rotation/accessibility certification.
- `bunx playwright test --config tests/release/playwright.config.ts`: eight tests discovered, **could not launch** because the installed Node Playwright expects a Chromium revision absent from the sandbox. No browser/package installed to work around it. Equivalent Python Playwright checks above passed using the provided browser; the committed Node runner remains unverified until its expected browser is available.
- Managed owner session mint `lovable auth-session --json --self` failed: no matching app account. **Signed-in premium/admin host E2E remains untested.** No alternative account chosen/modified. Isolated `canAccess=true` and mocked subscription tests are not proof of real user entitlements.

## Release blockers / owner checklist
- [ ] Complete and approve all BalkanLink 2.0 work before any release; inspect every staged change, not only these files.
- [ ] Qualified legal review of Widerspruch/Einspruch: exact remedy, notice/service deadlines, delivery channels and appropriate case boundaries. Existing confirmation/warnings are not legal certification; generic letters never guarantee success or deadline preservation.
- [ ] Signed-in authorized, signed-in unauthorized, legacy payer and admin end-to-end via real host; completed DocumentenCheck→reply CTA; no entitlement mutations.
- [ ] Production bundle/browser test on published-equivalent origin, without publishing; actual installed iOS/Android update/offline/reopen checks after authorized release.
- [ ] Separately resolve existing PWA guard/cache-ownership risks without indiscriminate user-cache deletion.
- [ ] Keyboard-only/screen-reader focus, Escape/outside-close, focus return, zoom/large text, contrast, safe-area and all wizard steps at short mobile heights; bottom-nav rotation alongside dialogs.
- [ ] Review global i18n checker backlog/coverage; all four reply languages human-reviewed.
- [ ] Confirm consent/privacy/source/font notices and legal copy with owner/legal review; no blanket compliance claim.
- [ ] Owner alone chooses Publish once all blockers are resolved; finish/download open drafts before eventual manual reload.

No DB/Stripe/auth/account writes, pricing/payment changes, packages, routes, storage keys, PDF engine or legal-page changes; no external messages, marketing or visibility-setting actions.