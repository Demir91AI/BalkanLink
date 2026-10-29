# Registration/login error localization — 29.10.2026

## Changes
- `src/lib/auth-error.ts`: UI-only classification of known service error codes, bounded compatibility for older uncoded responses, safe generic fallback. No raw service messages are returned.
- `src/pages/Register.tsx`: localized rejection descriptions, narrow duplicate-email classification, localized unexpected request failures; existing form/password validation and signup/profile/trial paths retained.
- `src/pages/Login.tsx`: localized failure title and description, including thrown request failures; existing sign-in and redirect behavior retained.
- `src/i18n/locales/{bs,hr,sr,de}/common.json`: 11 matching new error keys in each language. Bosnian weak-password copy exactly matches the owner's request.
- `src/lib/auth-error.test.ts`, `src/pages/auth-errors.test.tsx`: mapping and isolated failure-flow regression tests.
- `AGENTS.md`, `roadmap.md`: mapper rule and completion record.

## Verified
- Focused tests: 76 passed across four files (26 classifier, eight registration/login locale flows, 42 existing reliability/no-downgrade tests).
- Full suite: 1588 tests passed across 57 files with two workers.
- Playwright against localhost: registration completed through the existing form in BS/HR/SR/DE using a mocked service weak-password rejection. Each displayed its translated message and no raw English error. Representative BS/DE message screenshots inspected.
- Automatic check: build OK after correcting ES target compatibility.
- All 11 new translation keys present and non-empty in four locales. Global i18n checker still reports 420 unrelated legacy missing keys; not modified within this scope.

## Limits and preservation
- Browser service responses were isolated mocks; no account was created and no real password-security configuration was read or changed. The actual service password check remains in the unchanged signup request path; testing does not claim a live HIBP check.
- Password-reset pages were inspected as adjacent paths but are outside this approved registration/login scope and were not changed.
- No design changes, new packages, Cloud configuration, database changes, Edge deployment, publishing, billing or production-data mutation.
- Changes are code/preview-only; production remains unchanged.