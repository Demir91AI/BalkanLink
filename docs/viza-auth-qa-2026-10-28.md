# Viza Navigator — QA behind login (28.10.2026)

QA only. No app code, content, design, billing, auth or data changed. Nothing published. Full tests/build not re-run (no code changes).

## 1. Real login — BLOCKED
- Preview auth status: `signed_out`.
- `lovable auth-session --json` → refused: project has several auth users.
- `lovable auth-session --json --self` → refused: no account matches the requesting owner email.
- No test account was named, so none was picked. **Real end-to-end login was NOT tested.**

## 2. What was used instead — isolated MOCK member (local only)
- Playwright on `http://localhost:8080`, fake session for `mock.qa@example.invalid` (id `00000000-0000-4000-8000-0000000000aa`) placed only in that origin's storage.
- **Every** backend request in mock runs was answered locally by Playwright and **never forwarded** (profile row, roles, `get_entitlement`, `check-subscription`, `track-page-view`). Live accounts/subscriptions/data could not be touched.
- States: `anon` (real signed-out, requests forwarded — read-only plus the existing anonymous page-view call), `trial` (tier `trial`, ends 03.11.2026), `paid` (tier `premium`, ends 28.10.2027), `expired` (tier `premium`, ended 01.10.2026).
- Note: the Viza gate uses `useSubscription` (`profiles` tier/expiry), not `get_entitlement`.

Scripts/results: `/tmp/browser/vizaqa/` (`vizaqa.py`, `results_*.json`, `recheck.py`, `nav.py`, `url.py`, `lid.ts`, `bdup.ts`). Screenshots: `/tmp/browser/vizaqa/shots/` (82 files).

## 3. Coverage
8 countries, **32** routes (the code has 32, not 31): hr 1, si 1, ba 6, rs 6, me 4, mk 4, al 4, xk 5.
Mock paid member: 8 country pages + 32 routes × 4 languages × 2 widths (390/1280) = 312 page loads.

## 4. Results
| Check | Result |
|---|---|
| Gate: signed-out | PASS — 8/8 show offer card (7 days free, then €19.99/year), details hidden |
| Gate: trial / paid | PASS — 16/16 full content, no offer card (~6–7.7k chars vs ~2.2–2.8k) |
| Gate: expired | PASS — 8/8 offer card again |
| Horizontal overflow 390/1280 | PASS — 0 of 312 |
| Page language attribute matches BS/HR/SR/DE | PASS — 312/312 |
| Outside links open in new tab | PASS — 0 without `_blank`; 0 placeholder/`javascript:` links |
| Country switching by click (390 + 1280) | PASS — all 8 set `?country=` correctly |
| Runtime page errors | PASS — none; only existing React dev warnings (`forwardRef`, unknown DOM prop) |
| Empty loads | 69 empty in the first parallel run were load-timing; all 69 re-checked sequentially → content present |

Sample screenshots: `shots/gate_{anon,trial,paid,expired}_<country>_<route>.png`, `shots/final_paid_bs_390_ba_work.png`, `shots/final_trial_de_1280_xk_work.png`, `shots/final_paid_hr_390_hr_eu_info.png`, `shots/final_paid_sr_390_rs_family.png`.

## 5. FAILURES found (not fixed — QA-only instruction)
**F1 — Route links broken in some languages (existed before 28.10).** Translation files translate route ids, so direct/shared route links (and route selection) show the country page instead of the route:
- DE: mk `family`, mk `ausbildung`, al `ausbildung`, xk `work`, xk `family`, xk `ausbildung` (6)
- HR: mk `permanent`, xk `ausbildung` (2)
- SR: al `ausbildung`, xk `ausbildung` (2)
Shown in `final_trial_de_1280_xk_work.png`. Fix: put the original ids back for those 10 `routes.N.id` entries in `src/data/viza-i18n/{de,hr,sr}.ts`.

**F2 — Repeated lines from the 28.10 accuracy update (regression).** In 23 route lists per language (BS/HR/SR/DE), some entries were replaced with copies of another entry in the same list: 25 duplicates per language; before the update there were 0. Example (DE ba work): steps 3 and 7 say almost the same thing; costs 2 and 3 are identical. Affected: ba work/bluecard/family/permanent/ausbildung, rs family/permanent/ausbildung, me permanent/ausbildung, mk permanent/ausbildung, al permanent/ausbildung, xk work/family/permanent/ausbildung. The original distinct lines were lost; needs a content repair pass.

**F3 — Minor:** on 1280 the cookie banner text is squeezed into a very narrow column (visible in `final_trial_de_1280_xk_work.png`). Not Viza-specific.

## 6. NOT tested
- Real sign-in, real trial/paid/expired accounts, real membership check from the server.
- Payments/checkout (not touched by design).
- Each route clicked through by hand — routes were opened by URL; my automated route-card click was unreliable.
- Native-speaker wording; accuracy of facts (done in the 28.10 audit).
- Outside sites being reachable (only link form/new tab were checked).
- Other widths, Safari/Firefox, the installed app version.
