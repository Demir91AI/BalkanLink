# Guide-first cutover — 2026-10-27 (development/preview only, NOT published)

Owner direction: keep every menu item, category and service, but stop asking users to type personal data into
practice forms ("Musterformulare") or download unofficial PDFs. Every service becomes a SmartGuide plus an official next step.

## What changed
- **Old fill-in form links** `/musterformular/*` (all locales) and `/muster/kindergeld/preview` now open the matching
  `/formulari/:slug` guide (`src/lib/guide-first/legacy-muster.ts`, `LegacyMusterGuard` in `Layout`).
  Special cases: `buergergeld` → Hauptantrag with a choice note (Hauptantrag / Weiterbewilligung);
  `einbuergerung` → `/dvojno-drzavljanstvo/einbuergerung-vodic`; `antrag-generic` → `/formulari`.
- **FormCenter**: both mobile "Otvori Musterformular" buttons and the right-panel Muster button removed; every guide ends with
  an "Službena prijava / šta dalje" card (`OfficialNextStep`). SEO and catalogue copy now describe step-by-step guides.
  Elterngeld no longer points to elterngeld.net (now Familienportal, BMFSFJ); Kirchenaustritt no longer points to kirchenaustritt.de.
- **Viza Navigator**: only the Musterformulare gallery was replaced by an official card (Auslandsportal + digital.diplo.de,
  with the note that biometrics/documents/fees may require an in-person visit). Country picker, routes, checklists, sources unchanged.
- **Kindergeld**: `KindergeldGuideContent` rewritten as a newborn SmartGuide (optional case choice, 5 stages, official online CTA,
  BundID vs print/sign/mail, 6-month retroactive limit, sources). Removed the unverified "2027 automatic Kindergeld" claim and
  overbroad requirements (universal birth certificate, universal signature, DE-only IBAN). Facts checked on 27.10.2026 against:
  - https://www.arbeitsagentur.de/familie-und-kinder/infos-rund-um-kindergeld/kindergeld-anspruch-hoehe-dauer
  - https://www.arbeitsagentur.de/familie-und-kinder/infos-rund-um-kindergeld/nachweise-einreichen
  - https://www.arbeitsagentur.de/familie-und-kinder/eservices-fuer-familien
  - https://www.arbeitsagentur.de/familie-und-kinder/downloads-familie-und-kinder/formulare-kindergeld
- Texts in bs/hr/sr/de under `pages.json → guideFirst` and `visa.renderer.officialNext*`.

## Not changed
Routes and route→component mappings in `App.tsx`, all Muster source files, PDFs, storage keys and saved drafts, sidebar,
paywall/access, pricing, Stripe, backend, Vorlagen, letter reply, DocumentCheck, other tools. No new packages. Phase 1 baseline files untouched.

## Reversibility
Remove `LegacyMusterGuard` from `Layout.tsx` and the wrapper in `KindergeldPreviewWindow.tsx` to re-expose the old pages;
restore the buttons/gallery from version history. No data was deleted.

## Tests
- `src/lib/guide-first/guide-first.test.tsx` — redirects for every Muster slug + locale prefixes + special cases, guard behaviour,
  source registry covers all 46 services, only Kindergeld marked verified, no third-party "official" links, 4-language key parity,
  Kindergeld guide has no input fields and a safe official CTA.
- Full suite: 811 tests, all pass (one letter-reply sidebar test timed out once on a cold run and passed on rerun). Type check clean.
- Browser (390×844, signed out): all 46 `/formulari/:slug` pages render; all 36 legacy `/de/musterformular/*` links land on guides;
  preview window redirects; no page errors.

## Not verified
- Signed-in view of guides (signed-out users see the existing paywall); no test account was available to the preview.
- Viza Navigator card visually in the browser (covered by code review only).
- Paywall bullet "Tačno šta upisati u svako polje formulara" still mentions fields; left for owner wording decision.
- The unused visa form loaders and Muster pages remain in code by design.

## Per-service verification backlog
| Slug | Service | Next-step source | Content status |
|---|---|---|---|
| `anmeldung` | Anmeldung / Ummeldung | local | Pending source re-check |
| `steuer-id` | Steuer-ID | official | Pending source re-check |
| `fuehrerschein` | Führerschein | local | Pending source re-check |
| `fahrzeugzulassung` | Fahrzeugzulassung | local | Pending source re-check |
| `kindergeld` | Kindergeld | official | Verified 27.10.2026 (newborn SmartGuide) |
| `elterngeld` | Elterngeld | info | Pending source re-check |
| `mutterschaftsgeld` | Mutterschaftsgeld | official | Pending source re-check |
| `kinderzuschlag` | Kinderzuschlag | official | Pending source re-check |
| `krippengeld-bayern` | Krippengeld (Bayern) | official | Pending source re-check |
| `wirtschaftliche-jugendhilfe` | Wirtschaftliche Jugendhilfe | local | Pending source re-check |
| `hauptantrag` | Bürgergeld Hauptantrag | official (Jobcenter) | Pending source re-check |
| `weiterbewilligung` | Weiterbewilligungsantrag | official (Jobcenter) | Pending source re-check |
| `anlage-kdu` | Anlage KDU — Stanovanje i grijanje | official (Jobcenter) | Pending source re-check |
| `anlage-ek` | Anlage EK — Prihodi | official (Jobcenter) | Pending source re-check |
| `anlage-eks` | Anlage EKS — Samozaposleni | official (Jobcenter) | Pending source re-check |
| `anlage-vm` | Anlage VM — Imovina | official (Jobcenter) | Pending source re-check |
| `anlage-wep` | Anlage WEP — Partner/Djeca | official (Jobcenter) | Pending source re-check |
| `anlage-ki` | Anlage KI — Dijete ispod 15 | official (Jobcenter) | Pending source re-check |
| `anlage-sv` | Anlage SV — Socijalno osiguranje | official (Jobcenter) | Pending source re-check |
| `anlage-bb` | Anlage BB — Posebne potrebe | official (Jobcenter) | Pending source re-check |
| `anlage-ve` | Anlage VE — Zajednica odgovornosti | official (Jobcenter) | Pending source re-check |
| `anlage-hg` | Anlage HG — Zajednica domaćinstva | official (Jobcenter) | Pending source re-check |
| `anlage-meb` | Anlage MEB — Dodatna ishrana | official (Jobcenter) | Pending source re-check |
| `anlage-uf` | Anlage UF — Upitnik o nesreći | official (Jobcenter) | Pending source re-check |
| `anlage-se` | Anlage SE — Oslobađanje tajnosti | official (Jobcenter) | Pending source re-check |
| `anlage-uh1` | Anlage UH1 — Izdržavanje nakon razvoda | official (Jobcenter) | Pending source re-check |
| `anlage-uh2` | Anlage UH2 — Izdržavanje trudnice | official (Jobcenter) | Pending source re-check |
| `anlage-uh3` | Anlage UH3 — Dječije izdržavanje | official (Jobcenter) | Pending source re-check |
| `nichterreichbarkeit` | Nichterreichbarkeit | official (Jobcenter) | Pending source re-check |
| `arbeitsbescheinigung` | Arbeitsbescheinigung | official | Pending source re-check |
| `antragsruecknahme` | Antragsrücknahme | official (Jobcenter) | Pending source re-check |
| `wohngeld` | Wohngeld | local | Pending source re-check |
| `arbeitslosengeld` | Arbeitslosengeld I | official | Pending source re-check |
| `krankenkasse` | Krankenkasse | local | Pending source re-check |
| `steuerklassenwechsel` | Steuerklassenwechsel | official | Pending source re-check |
| `anerkennung-navigator` | Anerkennung Navigator | local | Pending source re-check |
| `bafoeg` | BAföG | official | Pending source re-check |
| `schueler-bafoeg` | Schüler-BAföG | official | Pending source re-check |
| `integrationskurs` | Integrationskurs | official | Pending source re-check |
| `grundsicherung` | Grundsicherung im Alter | local | Pending source re-check |
| `fuehrungszeugnis` | Führungszeugnis | official | Pending source re-check |
| `kirchenaustritt` | Kirchenaustritt | local | Pending source re-check |
| `nationalvisum` | Nationales Visum (D-Visum) | official | Pending source re-check |
| `aufenthaltstitel` | Aufenthaltstitel — Antrag | local | Pending source re-check |
| `niederlassungserlaubnis` | Niederlassungserlaubnis | local | Pending source re-check |
| `verpflichtungserklaerung` | Verpflichtungserklärung | local | Pending source re-check |

`local` = neutral "check your local authority" note, no official badge. Re-check each guide against primary sources one at a time, then set `verifiedOn` in `official-sources.ts`.
