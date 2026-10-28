# Grundsicherung Phase 3C — results (28.10.2026; no release)

Completed ONLY existing `anlage-eks`, `anlage-sv`, `anlage-bb`, `anlage-ve`, each in BS/HR/SR/DE. Existing ProcedureCompanion is reused without implementation changes. Extending the allowlist makes the existing FormCenter branch mount one companion; the HA-only navigator remains unchanged. No new routes, catalog edits, category headings, SGB XII, auth, trial, quota, billing, subscriptions, legal pages, backend, dependencies or publication changes.

## Content and verified originals

All four exact URLs were resolved from the live BA SGB II index, not constructed from old IDs. Printed edition 10/2026: EKS 9 pages, SV/BB/VE 2 pages each. All are unencrypted AcroForms and extraction succeeded with `pdftotext -layout`; no circumvention, modification, PDF generation or serving of copies. Full hashes, metadata-date distinction, copying/source boundary and source limitations: `docs/grundsicherung-phase3c-inventory.md`. All 15 original pages rendered and visually checked against extraction; all six official EKS instruction pages read.

| Form | Ordered heading/number groups | Numbered fields covered exactly once | Printed choices/table-row definitions |
|---|---:|---:|---:|
| EKS | 35 | 60 | 91 |
| SV | 8 | 16 | 10 |
| BB | 10 | 18 | 9 |
| VE | 9 | 17 | 10 |

Total 62 ordered groups, 111 numbered fields, 120 printed choice/table definitions and 17 procedure steps per locale. Tables A/B1/B2/B3/C keep every printed row/column label and separate original field references. Necessary short German source excerpts stay identical across locales; explanations are directly authored, HR/SR dialect-adapted locally without external translation/AI service. No paid AI gateway, Max Mode, new package or other project used. Website-fetch was used only to read the explicitly requested official index; PDFs downloaded directly from BA.

EKS distinguishes estimates/actual receipts, period, applicant/self-employed subject, VAT/net amounts, loan-financed purchases, loan interest/repayment, vehicle rows, personal deductions and two signatures. No tax-deduction/eligibility calculator. BB separates reason/timing/amount/advance, including all five timing choices and one-off loan question. SV preserves the compound age55 question, insurer confirmation and Basistarif evidence without deciding coverage. VE separates all five questions, retains fact-based rebuttal, and never infers partnership from shared address/gender.

## Exact changed files

- `src/lib/guide-first/grundsicherung-model.ts`: four allowlisted slugs and hash/edition metadata only; navigator tail byte-identical.
- `src/lib/guide-first/official-sources.ts`: only four verified-original entries and official supplementary links replace generic entries.
- `src/i18n/locales/{bs,hr,sr,de}/pages.json`: only four added guide objects; all previous locale content structurally identical.
- `src/lib/guide-first/grundsicherung-phase3c.test.tsx`: 18 focused tests for source metadata, complete numbering/options, reference parity, privacy, links/jumps/review/completion.
- `src/lib/guide-first/guide-first.test.tsx`: reviewed-source expectation gains these four verified forms only.
- `src/lib/guide-first/phase5-guides.test.tsx`: unverified count 23→19, reflecting the four checked sources.
- `docs/grundsicherung-phase3c-inventory.md`, `docs/grundsicherung-phase3c-field-inventory.json`, this results document.
- `AGENTS.md`: source-pinned specialist table/no-calculator rule updated.
- `roadmap.md`: batch completion recorded.

Unchanged byte-for-byte: FormCenter, form catalog, ProcedureCompanion; previous HA/WBA/KDU/EK/VM/KI/WEP, Kindergeld and all other locale objects; HA navigator function/questions. Phase1 baselines/snapshots not altered. Legacy components and assets retained. Existing phase5 route/frame/access tests cover the 46 catalog services and redirects.

## Actual QA

- Pre-change full suite: **1219/1219, 42 files**.
- Focused Phase3C: **18/18**.
- Final full `bunx vitest run --maxWorkers=2`: **1254/1254, 43 files**, after final language polish. More tests are counted because the existing per-slug tests automatically include four new companion slugs.
- First focused run exposed an incorrect test count: EKS has 31 B-coded rows, not 33. Rechecked all three tables against originals and corrected the assertion, no source row removed.
- First full run exposed two stale reviewed-source/count expectations; updated only these to account for newly verified sources, then full suite passed twice.
- Dialect review caught malformed Croatian `izvod` substring replacements affecting `proizvodi`/`izvatci`, and residual Serbian ijekavian/gender wording; corrected only new guide objects. Re-ran full suite and all 32 fixtures afterward.
- **32/32** localhost route smoke fixtures: four slugs × four languages × 390/1280 widths, 844/1800 heights. Existing isolated dev-mode response override; no application gate or account edits. Each checked one companion/one procedure wizard, all dropdown groups and printed options, previous/next terms, official new-tab rel, modes, review auto-advance and heading focus, complete/reopen/unmark, back/next, no inputs, overflow or page errors.
- 64 final start/review screenshots plus four detailed field/table screenshots in `/tmp/browser/phase3c/`; fixture evidence `results.json`. Inspected mobile EKS table A, BB timing, VE rebuttal and German desktop EKS vehicle table, plus representative start/review views. Requested companion has readable wrapping and no incoherent text overlap.
- Optional detail screenshot helper initially hit ambiguous global close controls and a broad h4 selector; removed the unrelated consent-close action and narrowed the field heading selector, then all four detail captures passed. No app fix was required.
- Automatic preview build latest available entry: **build OK 2026-10-28T14:24:10Z**. No manual build/typecheck run, no restart or publication.

## Honest limitations and remaining work

Real member authorization remains **untested**; test-only access proves presentation/interaction, not entitlement decisions. No account was chosen/minted/changed. Authenticated jobcenter.digital order/availability, official submission and decisions unverified; guidance explicitly says paper mapping is not online mapping. No applicant input, sensitive storage or transmission; only navigation/review state in mounted component.

Human native-language proofreading and qualified legal/source review remain desirable; direct model translations are not certified translations. Current edition/hash records do not automatically track future publisher replacements. No blanket redistribution/licence/compliance claim; necessary excerpts are attributed, originals open at BA.

The unchanged global consent banner covers a small bottom viewport band in screenshots and the unchanged shared procedure footer sometimes repeats the current title as its next-step hint; controls/workflows passed. Those global/shared issues are outside the strict four-guide scope and were not redesigned.

Remaining specialist annexes outside this batch: **HG, MEB, UF, SE, UH1, UH2, UH3**; non-annex Nichterreichbarkeit/Antragsrücknahme also retain existing content. No claim that their current PDFs/options are audited.

Nothing published or deployed; no Stripe/cloud mutation. Observed revision at results writing: `f4437105e22e8aa3de111c4298acd156e9dbd962` (managed revision, not a manually created commit); requested owner baseline `541a88cce65fba3e9bc7553928a62b6040b58d6b` was not checked out/reset.
