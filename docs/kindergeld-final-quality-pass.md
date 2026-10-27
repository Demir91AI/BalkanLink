# Kindergeld final quality acceptance matrix

Baseline: `2ba2f7b3cd63a44504c0a4bea66e780ddcf1348e`. Inventory written before implementation.

Expected: 30 unchanged groups, 174 inline definitions/options in every locale. All seven marital statuses; three relationship rows × five choices; §4/§5/§6 and §7a/b/c separate conditional yes/no.

Sources: https://www.arbeitsagentur.de/datei/kg1-antrag-kindergeld_ba036550.pdf · https://www.arbeitsagentur.de/datei/kg1-anlagekind_ba033765.pdf

Edition: 01.25 / Stand September 2025. Visually checked 27.10.2026. KG1 printed pages 1–2 = PDF pages 2–3; remarks = PDF pages 4–5. Anlage Kind printed pages 1–4 = PDF pages 1–4.

Originals are linked, never hosted, modified, filled or submitted. Short field phrases identify source locations; explanations are original plain-language companion text, not a derivative form. No blanket 2026 eligibility promise.

Before: marital-status group only said to choose a suitable status; compound fields and public-service questions lacked individually explained choices. After target: visible ordered inline definitions, no glossary hunting; contextual help remains available.

Important corrections: permanent separation includes intention to remain separated; KG1 §2 must not be reduced to an automatic shared-address rule; consent follows the remarks; public service excludes church/free-welfare institutions described in remarks, includes beurlaubte public employees working privately; foreign benefits ask entitlement, not merely receipt; §7 uses the five-year pre-application window and covers diplomatic/consular work.

Adult §3: newborn skip from §3 to §4 is visible; headings and evidence-status terms explained. Exhaustive adult subquestions are deliberately not covered by this newborn pilot. Online authenticated screen order remains unverified and is explicitly not claimed.

| Group | Position | Form / printed page | Expected visible lines |
|---|---:|---|---:|
| kg1-0 | 1 | KG1 / 1 | 1 |
| phone | 2 | KG1 / 1 | 1 |
| count | 3 | KG1 / 1 | 1 |
| kg1-1 | 4 | KG1 / 1 | 1 |
| kg1-2 | 5 | KG1 / 1 | 8 |
| kg1-3 | 6 | KG1 / 1 | 5 |
| status | 7 | KG1 / 1 | 8 |
| kg1-4 | 8 | KG1 / 1 | 8 |
| partnerAddress | 9 | KG1 / 1 | 5 |
| kg1-5 | 10 | KG1 / 1 | 3 |
| owner | 11 | KG1 / 1 | 3 |
| kg1-6 | 12 | KG1 / 2 | 7 |
| kg1-7 | 13 | KG1 / 2 | 5 |
| kg1-8 | 14 | KG1 / 2 | 6 |
| kg1-9 | 15 | KG1 / 2 | 2 |
| consent | 16 | KG1 / 2 | 2 |
| ank-0 | 17 | Anlage Kind / 1 | 4 |
| ank-1 | 18 | Anlage Kind / 1 | 1 |
| ank-2 | 19 | Anlage Kind / 1 | 8 |
| childAddress | 20 | Anlage Kind / 1 | 6 |
| ank-3 | 21 | Anlage Kind / 1 | 18 |
| otherParent | 22 | Anlage Kind / 1 | 8 |
| ank-4 | 23 | Anlage Kind / 2 | 5 |
| ank-5 | 24 | Anlage Kind / 3 | 8 |
| ank-6 | 25 | Anlage Kind / 3 | 11 |
| ank-7 | 26 | Anlage Kind / 3 | 10 |
| ank-8 | 27 | Anlage Kind / 4 | 9 |
| stateWork | 28 | Anlage Kind / 4 | 9 |
| posting | 29 | Anlage Kind / 4 | 9 |
| ank-9 | 30 | Anlage Kind / 4 | 2 |

The machine-readable JSON lists every German source phrase, stable line ID and per-line DOM acceptance condition. Runtime input widgets are prohibited; these are explanatory text only.

## QA results
- Implemented 174 visible inline definitions/options per locale across the unchanged 30 numbered groups. These are explanatory rows (including repeated relationship options and shared follow-up fields), **not 174 distinct official input fields**.
- DOM tests visit every correct numbered group in BS/HR/SR/DE and check the inventory's exact German phrase, localized meaning and condition in visible non-disclosure content. All seven family-status choices and all three relationship rows × five options are pinned separately; conditional yes/no for §4, §5 main/a/b, §6, §7a/b/c are pinned.
- Full suite: **1025 tests passed, 33 files**, 27.10.2026 21:23 UTC. After final newborn-date/nationality explanation polish: **32 focused tests passed, 2 files**, 21:24 UTC. Latest observed automatic build: **build OK, 21:24:31 UTC**. No manual build/typecheck was run (automatic harness owns those).
- Browser: **8 route content fixtures passed**, four locales × 1280×1800 / 390×844. Existing-child/adult/cross branches, no data-entry fields, 30 groups, seven-step advancement/completion/reopening, visible statuses and 18 relationship rows/options, no horizontal overflow; no runtime errors. Existing card text contrast minimum 9.5:1. Actual public route preserves the existing access prompt. Fixture testing bypasses that prompt only by intercepting a browser response; no app gate/config/account is changed.
- Screenshots visually inspected: `/tmp/browser/kg-final/bs-390-statuses.png`, `/tmp/browser/kg-final/de-1280-statuses.png`. The existing fixed mobile navigation/cookie bar can cover content at a given scroll position; every status remains scroll-reachable. No global layout changes were made.
- **Uncovered:** adult §3 full individual employment/education/benefit subquestions are intentionally out of this newborn pilot; headings, evidence statuses and explicit newborn skip are covered. Authenticated BA online screens/order remain unverified. Authorized entitled-account end-to-end QA remains unavailable; content fixtures are not an authenticated-account claim. No uncovered item in the owner's newborn field/choice acceptance matrix.

## Exact changed project files
- `src/components/kindergeld/pilot-model.ts`
- `src/components/kindergeld/FieldWalkthrough.tsx`
- `src/components/kindergeld/KindergeldFieldGuide.tsx`
- `src/i18n/locales/bs/pages.json`
- `src/i18n/locales/hr/pages.json`
- `src/i18n/locales/sr/pages.json`
- `src/i18n/locales/de/pages.json`
- `src/lib/guide-first/kindergeld-field-guide.test.tsx`
- `docs/kindergeld-final-field-inventory.json`
- `docs/kindergeld-final-quality-pass.md`
- `AGENTS.md`
- `roadmap.md`

Shared SmartGuide and other guide content were not edited. No Stripe, pricing, auth, paywall, subscriptions, account data, PDF handling, deployment or publication changes. Original forms stay outbound links. Baseline is recorded above; report the latest automatically managed commit SHA in the closing reply (the report itself necessarily creates a later revision).
