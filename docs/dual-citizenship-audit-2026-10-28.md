# Dual citizenship ("Dvojno državljanstvo") — audit (28.10.2026)

Content corrections within the existing structure plus removal of the NEW/NOVO badge. Routes (`/dvojno-drzavljanstvo`, `/dvojno-drzavljanstvo/einbuergerung-vodic`, redirect `/doppelte-staatsbuergerschaft`), country IDs, gates (`premium: true, isFree: false`), auth, payments and design are unchanged. Not published.

## Inventory
- Page `src/pages/DvojnoDrzavljanstvo.tsx`: country tabs, old-vs-new comparison table (`COMPARISON_I18N` hardcoded for bs/hr/sr/de), link to the naturalization guide.
- Data `src/data/dvojnoDrzavljanstvoContent.ts`: 7 countries (bih, srbija, kosovo, hrvatska, crnaGora, albanija, sjevernaMakedonija), with status and section keys.
- Text `src/i18n/locales/{bs,hr,sr,de}/dvojnoDrzavljanstvo.json` (131 lines each).
- Sub-guide `src/components/guides/EinbuergerungGuideContent.tsx` (Bosnian only, as before), via `EinbuergerungVodic.tsx`.
- Related checklist line `checklists.json` (naturalization list, 4 languages).
- Badge: the only NEW marker for this feature is `AppSidebar.tsx` line 99, `isNew: true`. Desktop sidebar and mobile drawer render the same list, so one change covers both. No NOVO/NEW text exists in the dual-citizenship locale files.

## Changes (before → after)
| Where | Before | After |
|---|---|---|
| Sidebar | `isNew: true` (NEW badge) | `isNew: false`; other NEW badges (letter reply, passport renewal, saved items) unchanged |
| Banner (4 languages) | "previous citizenship no longer has to be renounced" | Germany no longer requires renunciation; **only the origin country's law** decides whether you keep it |
| Status label "warning" | "requires a bilateral treaty" | "special rules — check the origin country's law" |
| BiH bihLaw | "Constitution Art. I/7.d: dual citizenship only with a bilateral treaty" | No DE–BiH treaty (MCP); after the Constitutional Court ruling, acquiring another nationality does **not** cause loss of BiH citizenship by law |
| BiH practical | "not formally recognised, BiH can't register it" | Explicit **retention vs. reacquisition**: someone who previously renounced BiH citizenship and now holds German citizenship can reacquire BiH citizenship only on the mandatory condition of renouncing German citizenship (MCP FAQ) |
| BiH germanLaw | — | Clarifies that German law does not decide the BiH consequence |
| Montenegro | "allows dual citizenship, no obstacles", status ok | Status **warning**: Art. 24 — adults with another nationality lose Montenegrin citizenship (exception: acquired before 3.6.2006, or treaty); amendment of Aug 2026 noted, check with the consulate |
| Serbia / Croatia / N. Macedonia / Albania / Kosovo | "no formal obstacles" | Loss only through release/renunciation/treaty, not automatically; advice to check with the consulate; no blanket guarantee |
| Comparison table: home nationality | "✅ You keep it automatically" | "Germany no longer requires renunciation — keeping it depends on origin-country law"; "before" changed to "as a rule" |
| Comparison table: turbo row | "introduced 2024, abolished 30.10.2025" | "introduced 27.06.2024, abolished 30.10.2025 — today at least 5 years" |
| Comparison note | — | Shorter residence only in cases set by law, e.g. spouses of Germans: as a rule 3 years' residence + 2 years of marriage (§ 9 StAG) |
| Naturalization guide | "or 3 years with special integration", "B2 for turbo", "keeping BiH citizenship is no longer a problem", processing times "Bayern 6–9, Berlin/NRW 12–18" | 5 years; 3-year route abolished 30.10.2025; spouse exception § 9; origin-country law decides; processing time "depends on the authority" (invented figures removed) |
| Checklist (4 languages) | "some Länder require C1 for the fast track (3 yrs)" | fast track abolished 30.10.2025, at least 5 years, exceptions e.g. spouses |

## Official sources
- StAG (current): https://www.gesetze-im-internet.de/stag/BJNR005830913.html — § 10 (5 years, B1, Gastarbeiter oral, Abs. 3 repealed): https://www.gesetze-im-internet.de/stag/__10.html ; § 9 (spouses): https://www.gesetze-im-internet.de/stag/__9.html
- German Foreign Office (multiple nationality since 27.06.2024; origin-country acceptance must be checked; spouses shorter; § 13 reacquisition for former Germans): https://www.auswaertiges-amt.de/de/staatsangehoerigkeitsrecht/2088844
- German Federal Government (3-year route abolished, in force 30.10.2025; 5 years the rule): https://www.bundesregierung.de/breg-de/suche/kabinett-einbuergerung-2350620
- BiH Ministry of Civil Affairs FAQ (no treaty; Constitutional Court; reacquisition requires renouncing German citizenship): https://mcp.gov.ba/bs/cesto-postavljana-pitanja-u-sektoru-za-drzavljanstvo-i-putne-isprave
- Montenegro government (Art. 24 loss): https://www.gov.me/clanak/drzavljanstvo ; amendment SL CG 119/2026: https://www.sluzbenilist.me/cyr/propisi/397079
- Serbia, Law on Citizenship (MUP): https://www.mup.gov.rs/wps/wcm/connect/735c0577-9c4b-46ee-9527-2e7401b14017/pdf_lat_Zakon+o+drzavljanstvu.pdf?CVID=mtru77c&MOD=AJPERES
- Croatia MUP (holding another nationality): https://mup.gov.hr/drzavljanstvo-281594/moze-li-se-uz-hrvatsko-imati-i-neko-drugo-drzavljanstvo/281910
- North Macedonia, consolidated Law on Citizenship: https://portal.mdt.gov.mk/post-body-files/zakoni-mvr-file-Bh91.pdf
- No new links were added to the page; existing link targets were not changed.

## Tests
- New `src/test/dual-citizenship-audit.test.ts` (5 tests): badge off on this item only; 7 IDs unchanged and BiH/Montenegro marked as special cases; BiH retention vs. reacquisition and no "bilateral only" claim in 4 languages; no active 3-year route in page/guide/checklists, § 9 note in 4 languages; origin-country notice in 4 banners. 5/5 pass.
- Full Vitest: 9 tests in 4 files hit the existing 5-second timeout when run in parallel. Run on their own one file at a time: 4 files, 66/66 pass. Build log: `build OK`.
- No browser check and no real sign-in test (by request; the page is members-only).

## Remaining risk
- **Montenegro**: the August 2026 amendment (SL CG 119/2026) could not be read in full; the text tells users to check with the consulate.
- **Kosovo and Albania**: not checked against a government source; the wording is cautious and tells users to check with the consulate.
- The BiH–Serbia and BiH–Croatia treaties are kept from the existing text; their texts were not re-read. The previous mention of Sweden was removed.
- The BiH Constitutional Court decision is cited as described in the MCP FAQ; the case number is not stated.
- The naturalization guide is still Bosnian only (existing pattern); the €255 fee and the 90-day-sentence rule were not re-checked.
- Translations were written without native-speaker proofreading.
