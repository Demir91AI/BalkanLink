# Anerkennung Navigator — final cleanup QA (28.10.2026)

Base: `b48d01b0`. Scope: the five open items from `docs/anerkennung-results-2026-10-28.md`. All 39 occupations, their IDs and order, the 6 countries, UI layout, gates, auth and payments are unchanged. No new occupations, no new packages. Not published.

## Files changed
- `src/lib/anerkennung-data.ts` — Bosnian base text for 15 occupations rewritten (7 regulated health/teaching + 8 legacy); koch and kfz_mechatroniker descriptions fixed; `sozialpaedagoge` → `regulation: "REG"` and `requiresLanguageExam: true`.
- `src/lib/anerkennung-bundeslaender.ts` — optional `noteKey` field; competent bodies for the 5 unmapped occupations; Bayern Pflege/Physio body corrected; `regulatedLand` note on regulated Land occupations.
- `src/pages/AnerkennungNavigator.tsx` — the office note is shown through `t("authorityNotes.<key>")`, falling back to the old text. No layout change.
- `src/i18n/locales/{bs,hr,sr,de}/anerkennung.json` — 15 occupations in full, `authorityNotes.*` (8 keys), `ui.nregInfo/nregInfoBody`, koch/kfz descriptions.
- `src/lib/anerkennung-final-qa.test.ts` — new, 6 tests.

## Item status
| # | Item | Status |
|---|---|---|
| 1 | Native BS/HR/SR/DE for 8 legacy entries | **Resolved** — all 39 occupations now have entries in every language with the same number of steps and documents (HR ijekavian/HR vocabulary, SR ekavian) |
| 2 | 5 occupations wrongly falling back to ZAB | **Resolved** — MFA → Ärztekammer Westfalen-Lippe (BY/BB/ST: their own Landesärztekammer); Altenpfleger → same Land body as Pflege; Buchhalter and Sozialpädagoge → Anerkennungs-Finder (body depends on reference occupation / Land); Ekonomist → ZAB, now set deliberately because it is correct for a non-regulated academic degree. Berufskraftfahrer: note says FOSA covers only the optional training recognition; licence and code 95 are handled by the Fahrerlaubnisbehörde |
| 3 | Audit of regulated health/teaching entries | **Resolved, with limits below** — Arzt/Zahnarzt/Apotheker: new law from 1.11.2026 (direct Kenntnisprüfung as the rule for third-country degrees); removed the "Anabin H+ required" claim and invented fee ranges; Approbation, language and suitability are shown as separate steps. Pflege/Altenpflege/Physio: Erlaubnis zur Führung der Berufsbezeichnung, option to waive the document check, Bayern LfP. Lehrer/Erzieher/Sozialarbeit: Land-level, staatliche Anerkennung as a separate step, language level set by the Land |
| 4 | Bosnian-only office notes | **Resolved** — all 3 previous notes plus 5 new ones are under `authorityNotes` in 4 languages; a test requires a translation for every note |
| 5 | Generic salary/status claim | **Resolved** — the line now says recognition is not a legal requirement, may still be needed for the visa, and does not guarantee higher pay or a better job. The same claim was also removed from the koch and kfz_mechatroniker texts |

## Primary sources (checked 28.10.2026)
- Health-profession acceleration law, in force 1.11.2026; direct Kenntnisprüfung as the rule for doctors, dentists and pharmacists from third countries: BMG https://www.bundesgesundheitsministerium.de/service/gesetze-und-verordnungen/detail/berufsanerkennung-heilberufe ; press release https://www.bundesgesundheitsministerium.de/presse/pressemitteilungen/berufsanerkennung-heilberufe-bundestag-26-03-26 ; BGBl. 2026 I Nr. 225 https://www.recht.bund.de/bgbl/1/2026/225/VO.html
- PflBG §40 (equivalence, Altenpfleger/in): https://www.gesetze-im-internet.de/pflbg/__40.html
- RP Stuttgart FAQ, Pflege (no work as a Pflegefachkraft without permission; 4 months; Anpassungslehrgang vs. Kenntnisprüfung): https://rp.baden-wuerttemberg.de/fileadmin/RP-Internet/Themenportal/Schule_und_Bildung/Berufliche_Ausbildung/Pflegeberufe_Ausland/Veranstaltungen/LPA_Info_Anerkennung_PfBG_FAQ.pdf
- Bayerisches Landesamt für Pflege FAQ (Pflege since 2023, Physio since 1.7.2025), as of 17.07.2026: https://www.lfp.bayern.de/wp-content/uploads/2025/06/FAQ_GFB.pdf
- Bremen Altenpflege (option to waive the equivalence check): https://www.service.bremen.de/dienstleistungen/anerkennung-als-altenpflegefachperson-mit-berufsqualifikation-aus-drittstaaten-beantragen-209093
- MFA responsibility (ÄKWL for Germany except BY/BB/ST): https://www.aekwl.de/fuer-mfa/nach-der-ausbildung/auslaendische-abschluesse/ ; https://www.aekno.de/mfa/berufsanerkennung ; https://www.laekh.de/fuer-mfa/anerkennung-auslaendischer-berufsabschluesse
- Sozialarbeit is regulated; two procedures; Berlin C1 and €196: https://verwaltung.bund.de/leistungsverzeichnis/DE/leistung/99150079001000/herausgeber/HB-S1000030000270489/region/040000000000 ; Finder result Berlin (downloaded 24.10.2026) https://www.anerkennung-in-deutschland.de/de/interest/finder/result?arrangement=Ja&location=47619&nationality=Drittstaat&nationalityDrittstaat=&pdf=1&profession=377&qualification=&whereabouts=null&zipSearch=0
- General requirements / Qualifikationsanalyse: https://www.anerkennung-in-deutschland.de/html/de/fachkraefte.php
- Sources from the earlier audit (BQFG §6, HwO Anlage A, IHK FOSA fees): `docs/anerkennung-audit-2026-10-28.md`

## QA
- `src/lib/anerkennung-final-qa.test.ts` 6/6 and `anerkennung-data.test.ts` 4/4 pass. They check: 39 IDs; every occupation in 4 languages with equal list lengths; the 8 legacy entries actually translated; a competent body for every occupation × 16 Länder; ZAB only for the economist; MFA/Pflege/Physio bodies; the 1.11.2026 rule and no H+ requirement; Finder step in regulated entries; translations for every note key; no pay/status promise.
- Full Vitest: 47 files, **1,359/1,359** pass. Build log: `build OK`.
- Browser (local, **simulated member, no real sign-in**): BA → occupation → Bayern for 16 occupations (the 15 rewritten + koch) in BS 1280/390, DE 1280/390, HR 1280, SR 390. Checks: first step and translated office note visible, no ZAB office box (except the economist), no sideways overflow, no page errors — 0 failures.

## Remaining uncertainty
- Office lists for the regulated professions (16 Länder × 7 occupations) were not re-verified one by one; only Bayern Pflege/Physio was corrected. Every such office box now says to confirm the body in the Anerkennungs-Finder.
- Whether pending applications fall under the old or new health-law rules after 1.11.2026: the guide tells users to ask the authority.
- Exact Land language levels and fees for Lehrer/Erzieher/Sozialarbeit are given only as examples (Berlin) or ranges.
- Berufskraftfahrer: the 140-hour accelerated basic qualification and the tests needed to convert a third-country licence are stated cautiously ("usually") and should be confirmed per case with the Fahrerlaubnisbehörde.
- The general UI disclaimer and other UI labels still mention Anabin/ZAB as sources (unchanged, out of scope).
- The translations were written by me and have not been proofread by native speakers.
