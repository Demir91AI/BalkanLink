# Kindergeld SmartGuide 2.0 pilot — 27 October 2026

## Scope and baseline
- Started at the exact owner baseline `4630a36910cf17a9826321e3028ea521887ab071`.
- Only Kindergeld content/presentation and an opt-in shared review flow changed. No other procedural content, route, SEO, gates, Stripe, subscriptions, accounts, backend, legal pages or release settings changed.
- Code revision before this report/roadmap bookkeeping: `6edba140686b3606a44017f3e72c73289580694f`. Final HEAD is reported in chat after bookkeeping.
- Preview: https://id-preview--42558ae9-0b5a-4abf-bab6-f6cb6cf85927.lovable.app/formulari/kindergeld
- Nothing published or deployed. These changes were not sent to the published site; its currently served revision was not independently inspected.

## Implemented coverage
- Prominent existing seven-step procedure; each step now has concrete contextual explanation. Preparation versus required attachments, applicant choice, existing-other-child case, missing tax ID, BundID versus print/sign/post, final verification, submission, incoming correspondence and follow-up are explained.
- All 20 original locale records retained. The pilot adapts misleading compound labels/instructions and adds ten localized subgroups: phone, attachment count, marital status, partner address, account holder, separate consent, child address/reason, other person, work for another state/NATO, foreign-employer posting.
- **30 paper groups**, in KG1 then Anlage Kind original printed order. Header comes first; adult §3 stays in its physical location with explicit newborn skip and official adult-source referral. This is 30 editorial field groups, not a claim that the official form contains exactly 30 fields.
- Numbered field index, always-visible selected detailed card, previous/next, direct jumps, visible reading progress, mark-and-advance and unmark. Every group shows German label, plain-language meaning, concrete instruction, where/how, imaginary example, pitfall and missing/unclear-data help. Original BA PDF link follows the current form.
- Four distinct online assistance topics and navigation; visible notice explicitly says authenticated portal categories/order were not verified. No paper numbering masquerades as portal order.
- Newborn/existing-child no-data choices retain walkthrough; adult/cross-border choices retain separate official-source panels. Eight glossary entries; BS/HR/SR/DE parity.
- Kindergeld-only review action marks and advances, announces next step and focuses/scrolls heading. Last step shows an actual reviewed-step summary, incomplete markers, official next actions and reopen/unmark. It explicitly does **not** confirm correct completion, eligibility or submission.
- Nested reading/case state is memory-only. Existing explicit outer save persists only version/step/completion markers; no added sensitive input or automatic storage.

## Official-source verification / provenance
Primary-source read-only check on **27.10.2026**. Text is original instructional paraphrase; short German field labels identify the official fields. Only outbound links are served; no publisher PDF is copied into the application, hosted, altered, decrypted or filled. Reuse permission for modified official forms was not assumed.

Current BA forms index:
https://www.arbeitsagentur.de/familie-und-kinder/downloads-familie-und-kinder/formulare-kindergeld

Currently linked German originals, printed **Stand September 2025 / 01.25**:
- KG1: https://www.arbeitsagentur.de/datei/kg1-antrag-kindergeld_ba036550.pdf
  - SHA-256 `53651bbe336039b6ca3852f1fa7288b4841349afd1978a4b91469fea15eaec43`
  - Five physical PDF pages: cover, two application pages, two instruction pages. Printed KG1 page 1 = PDF page 2; printed page 2 = PDF page 3.
- Anlage Kind: https://www.arbeitsagentur.de/datei/kg1-anlagekind_ba033765.pdf
  - SHA-256 `baf78a8dbaa84490964772b5f37a6a9b2ff3e5c4683b9ef3d678b3d638926f6f`
  - Four printed/PDF pages. §3.3 is on page 3, not page 2.

Additional inspected primary sources:
- BA eServices: https://www.arbeitsagentur.de/familie-und-kinder/eservices-fuer-familien — public “Familien mit Neugeborenen → Kindergeld beantragen”, not authenticated field screens.
- BA proof requirements: https://www.arbeitsagentur.de/familie-und-kinder/infos-rund-um-kindergeld/nachweise-einreichen
- BA adult/cross-border guidance: existing linked `kindergeld-ab-18-jahren` / `kindergeld-ausland` pages.
- BZSt ID FAQ: https://www.bzst.de/DE/Privatpersonen/SteuerlicheIdentifikationsnummer/FAQ/faq_node.html — child ID after Meldebehörde transmission, no invented fixed delivery guarantee; own-ID re-notification is not a universal child-ID request.

## Exact changed files
1. `AGENTS.md`
2. `roadmap.md`
3. `src/components/KindergeldGuideContent.tsx`
4. `src/components/guide-first/SmartGuide.tsx`
5. `src/components/kindergeld/KindergeldFieldGuide.tsx`
6. `src/components/kindergeld/FieldWalkthrough.tsx` (new)
7. `src/components/kindergeld/pilot-model.ts` (new)
8. `src/i18n/locales/bs/pages.json`
9. `src/i18n/locales/hr/pages.json`
10. `src/i18n/locales/sr/pages.json`
11. `src/i18n/locales/de/pages.json`
12. `src/lib/guide-first/kindergeld-field-guide.test.tsx`
13. `src/lib/guide-first/smartguide-standard.test.tsx`
14. `tests/release/smartguide.spec.ts`
15. This report.

No CSS/root-token changes. Existing semantic dark/gold and colored-card styling retained. Persistent owner preferences also updated outside the repository.

## QA evidence and limits
- Full Vitest: **33 files, 1020 tests passed**, final run 20:59 UTC. Covers 30-group exact sequence/all original identifiers, all six detail sections per group in four locales, links, modes, branches, no personal inputs, review advance/final state/unmark, old shared toggle and locks, localization schema and existing platform regression contracts.
- Automatic harness build: **build OK**, latest checked 20:58:57 UTC. No manual build/typecheck invocation.
- Python Playwright actual-route **visual fixtures**: BS/HR/SR/DE × 1280×1800 / 390×844 = **8 passed**, with 16 card/completion screenshots, no horizontal overflow, zero runtime exceptions and minimum measured normal text contrast **9.5:1** in the sampled field cards.
- Keyboard fixture: Enter on review advances, H3 receives focus; ArrowRight switches online/paper tabs; official link focus succeeds.
- Kinderzuschlag real-route fixture: old reviewed toggle remains on step 1; separate next advances to 2. No Kinderzuschlag content edit.
- Browser fixture scripts/results/screenshots are in `/tmp/browser/kindergeld-pilot/`; representative mobile BS and desktop DE images were visually inspected. Existing cookie/bottom navigation appears over viewport edges; unchanged, scrollable application chrome.
- Node release Playwright suite **could not launch** its expected Chromium headless shell (25 launch failures, no test assertions executed). Python's available bundled Chromium provided the successful checks above; no browser install/config change made.
- Unintercepted signed-out `/formulari/kindergeld` retains the existing membership gate. Real entitled authenticated flow **not verified**: owner-session mint found no matching app account. No account chosen/modified and no gate changed. Visual fixtures intercept only browser `dev-mode.ts` response, explicitly not entitlement proof.

## Remaining gaps — not claimed complete
1. Exact authenticated BA online category/field sequence is unavailable; pilot transparently presents assistance topics, not a verified portal clone.
2. Adult/cross-border case-specific adjudication/mappings remain official referrals, not a complete case-specific application walkthrough.
3. Actual entitled app-account browser check needs an authorized owner session; signed-out gate and unit access regressions verified.
4. Native Node release browser runner needs its expected browser in the execution environment; Python fallback was used and reported.
5. Human-language/legal/source review before any release remains appropriate. No new benefit amount, guaranteed deadline, eligibility or blanket legal compliance claim added.