# BalkanLink 2.0 — No-Downgrade Baseline Audit and Family-First Plan

This step is read-only. No code, data, packages, migrations or publishing change.
**V** means verified in the code this turn or in earlier tests. **A** means an assumption that still needs checking.

## 1. Family feature baseline matrix

| Feature | Page / route | Input / UX | Output | Data saved | What works (V) | Known defects (V) |
|---|---|---|---|---|---|---|
| Kindergeld KG1 | `/musterformular/kindergeld` (old `/formulari/kindergeld/muster` redirects there), preview at `/muster/kindergeld/preview` in all 4 languages | Paper-style sample form covering 6 sections and 5 children; Kindergeld guide below it | Fills the bundled KG1 PDF (`pdf-fill-kindergeld.ts`) and downloads it | Browser storage (`kg1-muster-data`) | Download works; delivery options shown | Bundled KG1 is a modified copy (hash differs from official, encrypted XFA). Anlage Kind file is a 9-byte "not found" placeholder. Mailing text is hardcoded Bosnian, not translated. Says "1:1 original", which is false |
| Elterngeld (16 states) | `/musterformular/elterngeld` | State picker, Elterngeld SmartGuide, state-specific notes (BY, HH, NI, HB, MV, BE, BB…) | `fillElterngeldPdf(data, bundesland)` for 11 bundled state PDFs; other states link out (A: exact list in inventory `forms.ts`) | Browser storage (form data + chosen state) | State picker and guide work | Bayern copy is outdated and wrong edition for older birth dates. Four states use identical PDFs. MV PDF is encrypted. BW has no fillable fields. No edition is chosen by birth date. All `needs_review` |
| Kinderzuschlag KiZ1 | `/musterformular/kinderzuschlag` | Sample form | `fillKinderzuschlagPdf` on bundled `kiz1-antrag-2026.pdf` | Browser storage | Download works | Official form is encrypted XFA and does not allow changes; bundled copy is a modified copy. KiZ1-AnA / AnK not covered. A non-official answer sheet exists in FormularPilot but is not shown on any page |
| Mutterschaftsgeld (BAS) | `/musterformular/mutterschaftsgeld` | Sample form | `fillMutterschaftsgeldPdf` | Browser storage | Download works | Same 129 fields as official, but hash differs. Rights not verified. No golden test |
| Krippengeld Bayern | `/musterformular/krippengeld-bayern` | Sample form | Print/sample only (A) | Browser storage (A) | Page loads | Bavaria only; not checked |
| Wirtschaftliche Jugendhilfe | `/musterformular/wirtschaftliche-jugendhilfe` | Sample form | Print/sample (A) | Browser storage (A) | — | Local office rules not modelled |
| Elternzeit, Mutterschutz, Unterhalt, Unterhaltsvorschuss, Bildung und Teilhabe | `/familie` hub cards leading to guides (`guide-data.ts`, 14 family-category entries) | Guides / SmartGuide | Text and official links only | none | Guides render | No form workflow at all. The `/familie` hub hardcodes `getLangKey("bs")`, so its title and subtitle are Bosnian in every language, and part of its text is not in the translation files |
| Family taxes | `/porezi/porodica-i-klase` (alias `/steuern/familie-und-steuerklassen`) | Guide | Text | none | Works | — |
| Family check lists | `/check-liste/:slug` (Kindergeld pilot) | Check list | Print-to-PDF | none / saved list | Works | — |

Not implemented anywhere (V): edition picked by birth date, verified postal-address routing (address list is empty on purpose), annex completeness checks, a family option inside the Asistent.

## 2. Whole-platform inventory (high level, from about 200 routes in `src/App.tsx`)

- Content: guides and SmartGuide V1/V2 (`/guide`, `/smart-guide` redirect via `LegacyGuideRedirect`), Viza Navigator, Anerkennung navigator and university list, Porezi hub with 10 pages and a tax wizard, Dolazak pages, Biznis guides, Radno pravo, Mietrecht, Einbürgerung.
- Tools: FormCenter `/formulari` and `/formulari/:slug`, 37 sample-form pages, Vorlagen letter generator, check lists, Anmeldung simulator, Schufa simulator, Brutto-Netto calculator, Bußgeld helper, Nebenkosten scan, DeutschTrainer.
- Asistent: `/ai-asistent` (`/asistent` redirects there); `chat-assistant` edge function. Document check: `/dokumenten-check` with `document-check` function. Both are separate flows. The public route still contains "ai".
- Community: Pitaj dijasporu, Q&A, Nudim/Tražim, Stellenangebote, Wohnungen, firm pages.
- Money: `/paketi` (`/pricing` redirects there), Stripe checkout, webhook, verify-payment, `has_full_access()`, legacy monthly subscribers protected, trials.
- Admin: `/admin`, forms, field mapper, trials, questions, Stripe sync.
- Editorial: database tables only. News and blog pages, editor and sitemap entries do not exist.
- Languages: bs (default) plus /hr, /sr, /de through `LanguageRouter`. Many sample-form pages hold hardcoded German and Bosnian text.
- Tests: 685 unit tests (mostly PDF engine and FormularPilot), one visual test (flag). No page-level regression tests.

### Dependency map (family forms)

```text
FormCenter / Familie hub / guides --> /musterformular/* page --> MusterFormBase (save, print, share)
                                                       \--> pdf-fill-*.ts --> pdf-form-engine.ts --> /public/muster/*.pdf
FormularPilot (src/lib/formularpilot/*) --> NOT imported by any page (verified)
```

### Highest regression risk

1. `MusterFormBase` is shared by 37 pages. Any redesign of it affects all of them.
2. `pdf-form-engine.ts` feeds every PDF download.
3. Browser storage keys (`kg1-muster-data`, `elterngeld-bundesland-v1`, …). Renaming a key silently loses what users entered.
4. Redirects and deep links (`/formulari/*/muster`, `/muster/kindergeld/preview`, language prefixes, `/guide`, `/pricing`).
5. Access rules (`has_full_access`, protected legacy subscribers) around premium sample forms.

## 3. FormularPilot development work (not wired to any page)

Finished pieces: per-request fill report, template preflight check, 16-state routing, service coverage list, authority routing with an empty address list, form inventory and hashes, Unicode font for č ć đ š ž, Integrationskurs pipeline (blocked: superseded edition), KiZ answer sheet (not translated), blocked manifests for KG1 and Elterngeld pilot, Mutterschaftsgeld manifest (`needs_review`).
Unfinished overlaps: half-done Elterngeld edition logic, Mutterschaftsgeld golden test, editorial pages, Asistent unification. Nothing is marked ready.

## 4. No-downgrade strategy

- Keep every route, redirect, storage key and current download working. New screens sit beside the old ones behind a feature flag (`src/lib/formularpilot/flags.ts`, off by default). The old page stays reachable until the owner approves.
- Label each output honestly, with one of three labels: "Službeni PDF – provjeren" (only after the golden test and rights proof), "Pomoćni list – nije službeni obrazac", or "Uputstvo + službeni link".
- Immediately (copy fix only, needs approval): remove the "1:1 originalni" claim from the KG1, KiZ and Elterngeld pages.
- Family comes first, then all other forms as SmartGuide pages with official links and check lists that depend on state and city.

## 5. Top 5 family workflows: feasible vs blocked

| # | Workflow | Status | Why |
|---|---|---|---|
| 1 | Mutterschaftsgeld (BAS) automatic PDF | **Feasible** | Real fillable fields that match the official form; needs the official file, golden test and rights check |
| 2 | Elterngeld for states with fillable official PDFs (A: e.g. Berlin, Hamburg, Niedersachsen after verification) | **Feasible per state** | Each needs its own official file, edition-by-birth-date check and golden test |
| 3 | Kindergeld guided answer sheet + official BA online/PDF link | **Feasible (non-official)** | Official KG1 is encrypted XFA, so an automatic fill is **blocked** |
| 4 | Kinderzuschlag answer sheet (KiZ1 + AnA + AnK per child) | **Feasible (non-official)** | Already built; needs translation into 4 languages and wiring behind the flag. Automatic PDF is **blocked** |
| 5 | Elternzeit request letter (to the employer) | **Feasible** | No official form exists; the existing letter generator can produce it |

Blocked: automatic KG1 / KG1-AnK and KiZ1 PDFs, MV Elterngeld (encrypted), BW (flat PDF, uses L-Bank online), Bayern until the current editions are fetched, any postal address until officially verified.

## 6. Prioritized implementation plan (each step separate, reversible, not published)

1. **Baseline safety net:** Playwright test that opens every family route in all 4 languages and checks nothing crashes; check every old link still lands on the right page; snapshot today's PDF field values for each family fill (old output stays the reference).
2. **Honest labels:** copy fix for false "official 1:1" claims, plus translation of the KG1 mailing text and the `/familie` titles.
3. **Feature flag + new family hub** next to the old one; reads the inventory status to show each label.
4. **Mutterschaftsgeld verified pipeline:** official file, hash, golden fill/read-back, fail-closed. Shown only behind the flag.
5. **KG1 and KiZ answer sheets** in 4 languages, behind the flag.
6. **Elterngeld per state:** verify one state at a time, choose edition by birth date, golden test.
7. **Elternzeit letter**; then SmartGuide pages for the remaining family topics.
8. Then other categories, Asistent unification, news/blog.

## 7. Tests to compare old vs new

- Route list snapshot: every `path` in `App.tsx` still exists, and every redirect still points to the same target.
- Storage keys: a test that fails if a known key is renamed; a test that old saved data still loads.
- PDF parity: the same input gives the same field values in the old fill and the new one (for forms that are allowed).
- Fail-closed: a changed or encrypted template is refused.
- Translations: every new key exists in bs/hr/sr/de (`scripts/validate-i18n.mjs`).
- Labels: a non-verified form can never show "official".
- Access: guest, free and full-access users plus a legacy subscriber see the same access as today.

## Assumptions to verify first

- Output type and saving behaviour of Krippengeld Bayern and Wirtschaftliche Jugendhilfe.
- Which Elterngeld states download a PDF and which only link out (check `pdf-fill-elterngeld.ts`).
- The publisher's permission to host the bundled PDFs.
