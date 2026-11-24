# BalkanLink — Rollback runbook (00.06)

Stand: 2026-11-24. Documentation only. Nothing here has been executed. "Verified" below means read-only evidence seen on 2026-11-24.

## 1. Known state and uncertainty
- **Live frontend (balkanlink.de):** `/version.json` = `{"version":"1793282528100-ur1tz7","builtAt":"2026-10-29T14:02:38.134Z"}`. It contains no commit, so **the exact production commit is UNKNOWN**. Closest by time is `917aeb24cfb11c91c56e79df322d4e7f9eec20d9` (2026-10-29T14:00:24Z), but that is only a time match, not proof.
- **Future builds:** `version.json` contains `commit`/`commitSource` (task 00.03). Value is `unknown` when the tree is dirty or the sources disagree.
- **Safe source baseline for this runbook:** `524d4583b94fe1f5a0ab09361ddfc76f9f67af03` (2026-11-24, test isolation 00.05). It is unpublished and reflects the working version, not production.
- **Shared backend:** preview, drafts and balkanlink.de use ONE backend (database, auth, storage, Edge Functions, Stripe and email secrets). No staging; the owner declined one. Every backend change is a production change.

## 2. Rollback types (do not confuse them)
| Type | What it reverts | What it does NOT revert |
| - | - | - |
| Source revert (Git / Lovable history "restore") | Repository files | Live site, database, functions already running, storage, Stripe, sent emails |
| Deployment rollback | Live frontend files (republish an earlier version) | Backend and any data |
| Database restore | Whole database (schema + data) to a daily snapshot | Storage files, function code, secrets; data written after the snapshot is LOST |
| Edge Function rollback | Function code (redeploy an earlier version from source) | Data already written, emails sent, Stripe events |
| Storage | Nothing automatic | Files must be re-uploaded manually; NEVER touch `tts-audio` |

### 2.1 Source revert
- Use Lovable version history (restore an earlier version) or a new forward commit. Do not use force-push or reset.
- Note: restoring source can change `supabase/functions/**`, and backend code may then activate on the shared backend. Check the diff for `supabase/` before restoring.

### 2.2 Deployment rollback (frontend)
- Restore the known-good source version, then republish. Republishing needs explicit owner approval.
- Afterwards compare `https://balkanlink.de/version.json` (`builtAt`, `commit`) with the expected values.
- The PWA/service worker may serve old files until the update prompt appears (it polls `version.json` every 5 min). Do not change `sw.js` during a rollback unless required.

### 2.3 Database
- Lovable Cloud docs: one automatic daily backup, up to about 14 days, database only. There is **no point-in-time recovery**. A restore is in place and permanent, and the schema reverts too.
- **Backup availability: NOT verified.** No tool reads the backup list. Before any release, the owner must open *More → Database → Manage → Backups* and write down the newest UTC timestamp here: `____________`.
- Migration history (read-only, 2026-11-24): Drizzle journal is consistent, 5 entries (`0000_editorial_articles` … `0004_annual_subscription_staging`), no findings. There are also 121 legacy files in `supabase/migrations/` (newest `20260930173739`).
- Prefer a **forward-fix migration** over a restore. Use a restore only for data corruption, and only with owner approval, after weighing the data loss.
- A full export (*Settings → Export project data*) contains personal data and password hashes. Take one only with owner approval, and store it outside the repository.

### 2.4 Edge Functions
- 26 functions exist in `supabase/functions/`. The deployed version is not recorded (logs have no version or commit).
- Rollback = redeploy the function from a known-good source commit (needs owner approval). Then check its logs and do one test call that does not write data, where that is possible.

### 2.5 Side effects that no rollback undoes
- **Stripe:** charges, subscriptions and webhooks already processed stay. Correct them only in Stripe (refund or cancel) with owner approval. Never cancel or downgrade the two grandfathered €9.99 subscriptions or lifetime users. Annual checkout stays off unless `annual_checkout_enabled` and `annual_live_mode_allowed` are set.
- **Email:** sent emails cannot be recalled. Queued emails are in `pgmq` (`auth_emails`, `transactional_emails`). If a bad template is found, pause sending and fix it forward.
- **Usage/quota ledger:** `usage_events` rows are not rewritten by a frontend rollback.

## 3. Pre-release checklist
1. Owner approval for the release recorded (Release Rule 2.0).
2. Working tree clean; the release commit SHA is written down.
3. Full test suite run, results noted (known 5 s timeouts must be re-run in isolation).
4. Release browser tests run with the network guard on (`tests/release/`).
5. List the backend parts the release changes: migrations, functions, secrets, flags. Each needs separate approval.
6. Newest backup timestamp read by the owner and entered in 2.3.
7. Current live `version.json` saved, as the rollback reference.
8. Rollback target named: the source version plus, where relevant, the function versions.

## 4. Recovery verification (after any rollback)
- `version.json` shows the expected `builtAt`/`commit` (or `unknown`, plus the time match).
- Home page, sign-in, Asistent and one SmartGuide work in BS/HR/SR/DE (no write tests on real accounts).
- Backend function logs show no new 5xx errors.
- Entitlements unchanged: admin, lifetime, legacy €9.99 users and trials keep their access (read-only check).
- No unexpected Stripe events or email bursts since the rollback.
- Record the outcome, time and remaining risks in this file.

## 5. Open blockers
- The exact production commit is unknown until a build with provenance is published.
- Backup existence and timestamp have not been confirmed by the owner.
- The deployed Edge Function versions are unknown.
- There is no staging, so every backend test touches production.
