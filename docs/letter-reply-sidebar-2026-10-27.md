# Preview-only sidebar letter reply

Starting commit: `047770b00afa5c4d9a22385819e421af236cfbb6`.

## Exact changes
- `src/components/layout/AppSidebar.tsx`: FilePenLine entry immediately after DocumentenCheck, existing exact-preview/DEV visibility guard, localized NEW labels in both sections, constrained wrapping only for the new title.
- `src/pages/Vorlagen.tsx`: overview passes existing subscription access/loading and enables deep-link handling; detail templates unchanged.
- `src/components/letter-reply/LetterReplyTask.tsx`: optional overview-only `?task=reply` handling; waits for existing subscription resolution, unauthorized redirect uses localized `/paketi`. Dialog follows the task URL. Close/Escape/outside dismiss replace only `task`, retaining other parameters, prefix and fragment. Back exits an intentional open task; Forward restores it unless it was closed and cleaned. Wizard unmount discards draft state.
- `src/i18n/locales/{bs,hr,sr,de}/common.json`: `sidebar.items.letterReply` and `sidebar.newBadge`.
- `src/lib/letter-reply/sidebar-integration.test.tsx`: 12 integration cases covering actual sidebar click, all languages, both NEW sections, modal close/history/query preservation, access denial/loading, hidden production behavior.
- `src/lib/letter-reply/model.test.ts`: existing visibility source assertion updated for the equivalent named guard; no safety rule weakened.
- `AGENTS.md`, `roadmap.md`, this report: documented contract and outcome.

## Verification
- Complete `bunx vitest run`: **778 passed, 20 files**, including unchanged Phase 1 baseline and family PDF parity tests.
- Automatic preview compiler: latest `/tmp/observability/build-errors.log` reports **build OK**. No manual build or separate TypeScript checker was run, per sandbox harness rules; a separate TypeScript result is not claimed.
- Playwright against the actual running app at `http://localhost:8080`: desktop 1280×1800 and mobile 340×900; each of bs/hr/sr/de renders the translated entry and badge without title/badge overlap or item overflow. All eight signed-out clicks reach the correct localized access page, with zero page runtime errors. Screenshots inspected.
- `bun run i18n:check`: fails on existing unrelated missing keys (including Schufa gate and Trainer speed); the two added keys are present in all four locales and integration-tested. No unrelated translation cleanup performed.
- Managed owner-session mint with `--self` failed because no app account matches the requesting owner email. Therefore authorized wizard opening/closing/history was tested with the real components in Vitest using a mocked existing subscription result, **not authenticated end-to-end in the live preview**. Sign in through Preview to exercise that final account-specific check; no credentials/accounts modified.

## Preview location and limits
Open the sidebar in Lovable Preview and select the new item, or use `/vorlagen?task=reply`, `/hr/vorlagen?task=reply`, `/sr/vorlagen?task=reply`, `/de/vorlagen?task=reply` on the exact project Preview host. Access remains required. The existing visibility helper denies the public production domains; it is unchanged.

No new routes, packages, draft storage, external processing, payment/auth/access edits, production writes, publishing or deployment. Four letter purposes and PDF generation are unchanged.