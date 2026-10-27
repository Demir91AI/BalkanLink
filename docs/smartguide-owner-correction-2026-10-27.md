# Owner SmartGuide correction — 27 October 2026

## Revision and scope
- Started at exact requested baseline `ff722e5acb1a9d464c5313db81d94fde40f3b30e`.
- Implementation revision before this report: `b409e17915ba50ea42cf9df5ba877c8008883b83`. Final report-only revision is recorded in the closing chat; Git state is managed by the platform.
- No publish/deploy, Stripe, subscription, account, auth configuration, legal, database or feature-switch changes.
- Production was not updated by this task. Its served commit was not independently verified, so an exact published revision is unknown.
- Preview: https://id-preview--42558ae9-0b5a-4abf-bab6-f6cb6cf85927.lovable.app/formulari/kindergeld

## Diagnosis before correction
Both real routes use FormCenter → GuideContent → GuideFrame. Kindergeld placed its five-stage newborn wizard inside a closed native disclosure, after its field guide. Kinderzuschlag used an always-mounted shared wizard. This was the presentation mismatch. Route access remained unchanged: signed-out users currently see the existing access prompt for both routes.

## Implemented coverage (not a platform-wide completion claim)
- **3 of 46 FormCenter services** received procedure-specific semantic content review: Kindergeld (7 stages), Kinderzuschlag (7 stages), Steuer-ID (3 stages).
- **43 of 46** still require complete semantic/source/content review. Existing shared presentation improvements also reach legacy shared-wizard hosts, but that does not verify their facts or count as migrated content.
- Kindergeld is a primary always-visible wizard in the newborn branch, no disclosure ancestor. Online/paper explanations live in step 5: four online groups and all 10 KG1 + 10 Anlage Kind records, one paper accordion open at a time. Adult/cross-border panels and return control remain.
- Shared template: numbered circles, progress indicator, previous/next/jump, focus handling, semantic meaning/action/where/example/mistake/next schema, optional reference-required verified-field instruction, checklists, final summary, workflow sources and opt-in marker-only progress.
- KiZ no longer displays unverified 297-euro/195-euro claims, fixed 4–6-week processing, blanket evidence requirements or unconditional extended-access assertions. Its separate application and child-income considerations remain.
- Steuer-ID corrects BZSt issuer, fixed delivery promises, blanket ELSTER exclusion and unofficial re-request destination; explains permanent 11-digit identity, document lookup and official postal re-notification.

## Source evidence
Checked primary pages through website-fetch during this task:
- https://www.arbeitsagentur.de/familie-und-kinder/eservices-fuer-familien
- https://www.arbeitsagentur.de/familie-und-kinder/infos-rund-um-kindergeld/kindergeld-anspruch-hoehe-dauer
- https://www.arbeitsagentur.de/familie-und-kinder/infos-rund-um-kindergeld/nachweise-einreichen
- https://www.arbeitsagentur.de/familie-und-kinder/downloads-familie-und-kinder/formulare-kindergeld
- https://www.arbeitsagentur.de/familie-und-kinder/kinderzuschlag-verstehen/kinderzuschlag-anspruch-hoehe-dauer
- https://www.arbeitsagentur.de/familie-und-kinder/kinderzuschlag-verstehen/kiz-lotse
- https://www.arbeitsagentur.de/familie-und-kinder/downloads-familie-und-kinder/formulare-kinderzuschlag
- https://www.bzst.de/DE/Privatpersonen/SteuerlicheIdentifikationsnummer/steuerlicheidentifikationsnummer
- https://www.bzst.de/DE/Privatpersonen/SteuerlicheIdentifikationsnummer/FAQ/faq_node.html
- https://karriere.bzst.de/SiteGlobals/Kontaktformulare/DE/IdNr/Mitteilung_IdNr/mitteilung_IdNr_node.html

Primary sources are linked, not republished as official forms; source-derived guidance is original explanatory copy. No new media, PDFs or third-party assets were added. Existing native-field references and encrypted KG1/XFA restrictions remain unchanged. No personal inputs or cases persisted.

## QA evidence and limits
- **1018 tests / 33 files passed** (`bunx vitest run`), including route/no-downgrade, 20-record retrieval, locale structure, progress privacy, semantic labels, seven-step newborn visibility, navigation, special branches and summaries.
- Automatic preview build: latest checked entry **build OK, 20:23:20 UTC**. No manual build/typecheck invoked.
- Python Playwright: **24 actual-route visual fixtures passed**, BS/HR/SR/DE × desktop 1280×1800/mobile 390×844 × Kindergeld/Kinderzuschlag/Steuer-ID. Next/back, jump, counts, no disclosure ancestor, no horizontal overflow; newborn paper 20-row retrieval, cross-border/return and final summary; zero runtime errors.
- These visual fixtures intercepted the existing development bypass **in the browser response only**, with service workers blocked. They did not alter application files, accounts or access decisions and are **not authenticated entitlement E2E proof**.
- Real signed-out routes were checked before edits and showed existing access prompts. Owner-session mint failed: no matching owner account. No other account was selected or modified. Authenticated checks require the owner to sign in to preview.
- Screenshots inspected: `/tmp/browser/kindergeld-correction/390-bs-kindergeld-wizard.png`, `1280-bs-kindergeld-start.png`, `390-bs-kinderzuschlag-wizard.png`, `390-de-paper.png`, `1280-de-steuer-id-wizard.png`.
- Measured visible dark-panel text/title contrast minimum **9.50:1**. Scoped light tokens exist, but attempted light-mode probe retained the dark canvas; independent light-mode evidence is not claimed.
- Committed `tests/release/smartguide.spec.ts` captures named screenshot attachments and interactive assertions, not owner-approved golden snapshots. JS Playwright runner could not launch its missing Chromium 1217; all its 24 tests stopped before execution. Equivalent Python checks used the preinstalled browser and passed. Do not report JS tests as passed.

## Exact edited files
- `AGENTS.md`, `roadmap.md`, this report
- `src/components/KindergeldGuideContent.tsx`
- `src/components/guide-first/SmartGuide.tsx`
- `src/components/guides/{KinderzuschlagGuideContent,SteuerIdGuideContent,SmartGuideWizardShared,StructuredProceduralGuide}.tsx`
- `src/i18n/locales/{bs,hr,sr,de}/pages.json`
- `src/index.css`
- `src/lib/guide-first/{official-sources.ts,guide-first.test.tsx,kindergeld-field-guide.test.tsx,smartguide-standard.test.tsx,structured-procedures.test.tsx}`
- `tests/release/smartguide.spec.ts`

## Remaining gaps
- Bespoke Visa Navigator, Anerkennung and citizenship remain unmigrated; jurisdiction/profession-specific and German/BiH source review required. Other 43 FormCenter content reviews pending, including misleading amounts still visible in untouched Krankenkasse content.
- Legacy KiZ/Steuer-ID overlay records in `src/lib/guide-i18n/overlay.{de,hr,sr}.ts` retain old copy but are no longer consumed by the migrated components. Other overlays remain active and need factual review; no blanket cleanup was attempted.
- Existing entitlement-only versus inner legacy shared-wizard gate mismatch remains: preserve owner access policy rather than silently change it during presentation correction.
- Independent light-theme rendering, authentic signed-in access and JS runner execution remain unverified. No claim of full-site migration or legal compliance.