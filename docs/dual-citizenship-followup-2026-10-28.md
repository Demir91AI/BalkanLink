# Dual citizenship — follow-up corrections (28.10.2026)

Content-only. Routes, IDs, gates (`premium: true`), auth, payments, layout and guide sections/navigation unchanged. Not published.

## (A) Montenegro
- Source: Official Gazette (Službeni list CG) 119/2026, https://www.sluzbenilist.me/propisi/397079 ; full text (invero.me): adopted 31.07.2026, published 11.08.2026, in force 19.08.2026.
- Verified text: Art. 1 amends only **Art. 11** (naturalization of a spouse; "druga" → "supružnika"; new paragraph extends paras 1–2 to same-sex life partners of Montenegrin citizens). Art. 11 itself refers to Art. 8 para 1 items 1, 4, 5, 7.
- Underlying rule: Art. 8 (general naturalization) requires release from the other citizenship; the Art. 24 loss rule is kept as previously sourced from gov.me.
- Change: all 4 languages now say the amendment is **not** a general permission for dual citizenship and does not change the loss rules.
- Limitation: Art. 24 could not be re-read in the consolidated text (page truncated); the wording relies on the gov.me summary.

## (B) Kosovo
- Source: Law No. 10/L-023 on Citizenship of the Republic of Kosovo, Official Gazette 7/2026, published 06.05.2026; gazette page shows it repeals Law No. 04/L-215 — https://gzk.rks-gov.net/ActDetail.aspx?ActID=119612 ; text read from the Assembly PDF.
- Verified: Art. 4 (multiple citizenship allowed; acquiring/keeping another citizenship does not cause loss); Art. 18 (loss only through release, deprivation, or international agreement); Art. 22 (deprivation possible for people with another citizenship who endanger national security).
- Change: old generic text replaced in 4 languages, citing 10/L-023 and its replacement of 04/L-215.

## (C) Albania
- Source: Ministry of Foreign Affairs, https://punetejashtme.gov.al/ceshtjet-e-shtetesise/ — "Ligji nr. 113/2020 … lejon marrjen e shtetësive të tjera"; renunciation not allowed if it would cause statelessness; renunciation/reacquisition by Presidential decree.
- Consolidated 2026 version URL (qbz.gov.al) recorded in `src/data/dual-citizenship-sources.ts`; **our fetch returned "page not found"**, so the consolidated text itself was not read. The page text relies on the MFA statement.

## (D) BiH treaties — Sweden restored
- Sources: MCP list (Croatia, **Sweden**, Serbia) https://www.mcp.gov.ba/bs/medjunarodni-ugovori-sektora-za-drzavljanstvo-i-putne-isprave ; FMUP (Serbia — Službeni glasnik BiH MU 4/03; Sweden — 2/06; Croatia — 10/11) https://www.fmup.gov.ba/v2/stranica.php?idmeni=20&idstranica=68
- Change: BiH "bihLaw" in 4 languages now lists exactly these three treaties and says they apply only to those states; Germany–BiH still has no treaty. The previous audit removing Sweden was wrong.

## (E) Naturalization guide in 4 languages
- New `src/data/einbuergerung-guide-i18n.ts` (BS/HR/SR/DE, 12 steps each, same German field references); `EinbuergerungGuideContent.tsx` picks the active language (falls back to BS). `GuideInfoHeader` got optional localized labels; other guides keep their old defaults.
- Content corrected while localizing: 3-year route abolished 30.10.2025; 5 years as a rule; § 9 StAG spouse exception; § 10 Abs. 1 Nr. 1a; § 12a; fee 255 €/51 € (§ 38 StAG); no guaranteed outcome or processing time.
- Removed claims we could not verify: Bavarian test-exemption practice, "191 countries", "24 → 6 months", regional processing times, Verfassungsschutz only in Bavaria, invented checkbox wording, instalment option, the real-sounding name/employer. Examples use fictional Maja Kovač.

## Tests
- `src/test/dual-citizenship-followup.test.ts` (8 tests): BiH three treaties; Kosovo 10/L-023 / 04/L-215 / Art. 4 / Art. 18; Montenegro 119/2026 / 19.08.2026 / Art. 11 / not general / Art. 24; Albania 113/2020 / statelessness; official source URLs; guide 4-language structural parity; no Bosnian fallback text in HR/SR/DE; 30.10.2025, 5 years, § 9, no guarantee.
- `src/test/dual-citizenship-audit.test.ts` now reads the guide data file. Focused 13/13 pass.
- Full Vitest (2 workers): 49 files, 1,376/1,376 pass.
- No browser check and no real sign-in (members-only page). Not published.

## Remaining limitations
- No native-speaker proofreading of HR/SR/DE.
- Albania consolidated 2026 law and Montenegro Art. 24 not read in full text.
- Treaty texts (BiH–Serbia/Croatia/Sweden) not analysed in detail; only their existence is stated.
