# Anerkennung Navigator — accuracy audit (28.10.2026)

Base revision: after Visa fix `ea7a1ad3`. Scope: occupation data and its translations only. UI, gates, auth and payments were not changed.

## 1. Inventory before
- `src/lib/anerkennung-data.ts`: 6 countries (BA, HR, RS, ME, MK, XK), **22 occupations**.
- `src/i18n/locales/{bs,hr,sr,de}/anerkennung.json`: translations exist for **14** of the 22. Eight legacy occupations (medizinische_fachangestellte, altenpfleger, berufskraftfahrer, ekonomist_bachelor, dachdecker, anlagenmechaniker_shk, buchhalter, sozialpaedagoge) show Bosnian text in every language. This gap existed before and is still open.
- `src/lib/anerkennung-bundeslaender.ts`: competent bodies for **14** occupations. The other 8 fell back to "ZAB Zeugnisbewertung". That fallback is wrong for crafts (Dachdecker, SHK) and for Berufskraftfahrer.
- The UI has no search or filter field: occupations appear as a grid of cards, and categories are labels only. Country → occupation → Bundesland → result.

## 2. Primary sources checked (28.10.2026)
- BQFG §6 — 3-month decision period after complete documents, extendable once: https://www.gesetze-im-internet.de/bqfg/__6.html
- HwO Anlage A — list of 53 licensed crafts (BGBl. I 2020): https://www.gesetze-im-internet.de/hwo/anlage_a.html
- IHK FOSA — central body for foreign qualifications comparable to IHK occupations, for 76 IHKs: https://www.ihk-fosa.de/
- IHK FOSA fees €100–600 depending on effort; tariff PDF: https://www.ihk-fosa.de/verfahren/informationen-zu-gebuehren-und-foerderung/ , https://www.ihk-fosa.de/fileadmin/Dateien/Gesetze_und_Offizielles/IHK_FOSA_Gebuehrentarif.pdf
- IHK Frankfurt — about 350 occupations handled by FOSA; required documents: https://www.frankfurt-main.ihk.de/aus-und-weiterbildung/ausbildung/ausbildungsberatung/auslandsaufenthalte-in-der-ausbildung/anerkennungsgesetz-5183972
- IHK Schleswig-Holstein — recognition only for completed, state-recognised training; possible from abroad: https://www.ihk.de/schleswig-holstein/bildung/ausbildung/ausland-berufsabschluesse-1372002
- Validierungsverfahren since January 2025 (§§50b ff. BBiG / §§41b ff. HwO), for experience without a formal qualification: https://www.ihk.de/schleswig-holstein/bildung/fachkraeftesicherung/fachkraefte-qualifizieren/validierung2-6167742 , https://www.hwk-ulm.de/berufsvalidierung/
- §19c(2) AufenthG + §6 BeschV (experienced workers) — needs a qualification state-recognised abroad (at least 2 years of training) plus ZAB confirmation; applies only to non-regulated jobs: https://www.make-it-in-germany.com/de/visum-aufenthalt/arten/visum-berufserfahrene ; BA: https://www.arbeitsagentur.de/vor-ort/zav/working-and-living-in-germany/newsletter-iss/04-2026/berufserfahrene ; 2026 minimum salary €45,630 (BAnz AT 18.12.2025 B1).
- Anerkennungs-Finder: https://www.anerkennung-in-deutschland.de/de/interest/finder/profession (the old `/de/interest/finder` link still redirects there).

## 3. Rules applied
- **Formal recognition (BQFG/HwO)** is only possible for a completed vocational qualification that is state-recognised in the country of origin. Work experience alone gives no equivalence. Instead, the text names Qualifikationsanalyse (§14 BQFG, when documents are missing) or the Validierungsverfahren, both without a promised outcome.
- **IHK occupations** go to IHK FOSA (for most IHKs). **Crafts** go to the HWK of the place of work. The Anerkennungs-Finder stays the binding lookup.
- **Licensed crafts (Anlage A):** employed work as Geselle is normally allowed without recognition. Running your own business needs entry in the Handwerksrolle (Meister, a qualification recognised as equal to Meister, Ausnahmebewilligung or Ausübungsberechtigung). Gebäudereiniger is Anlage B1 (no licence needed).
- **Schweißer / CNC-Bediener** are activities, not standalone German apprenticeship occupations. The reference occupation is chosen case by case: Konstruktionsmechaniker / Metallbauer, or Zerspanungsmechaniker / Maschinen- und Anlagenführer.
- **Visa:** §18a needs a recognised qualification. Westbalkan, §19c(2) and Anerkennungspartnerschaft are only named as separate routes with their own conditions.

## 4. Corrections to existing entries (BS base + HR/SR/DE)
| Entry | Before | After |
|---|---|---|
| koch notes | "higher pay, often +€300–500/month" (no source) | Pay effect not guaranteed; IHK FOSA |
| koch step 1 | local IHK | IHK FOSA for most IHK occupations |
| elektroniker step 4 | "Kenntnisprüfung" (wrong for a non-regulated occupation) | Anpassungsqualifizierung |
| maurer steps 1/5 | Check in Anabin (database for higher education); "Eignungsprüfung" | Anerkennungs-Finder, reference Maurer or Beton- und Stahlbetonbauer; Anpassungsqualifizierung |
| kfz_mechatroniker steps 1/4 | Anabin; "Eignungsprüfung" | Anerkennungs-Finder + HWK; Anpassungsqualifizierung |
| schweisser description / steps 2+4 / notes | "foreign certificates often accepted directly"; certificate validity of 6 months–3 years | Activity, not an apprenticeship occupation; reference occupation only with completed training; validity of EN ISO 9606 certificates is checked by the issuing/inspection body |
| Competent body: koch, it_fachkraft | Local IHK | IHK FOSA |
| Competent body: schweisser | Local IHK / SLV | Unchanged (mixed; documented risk) |
| Competent body: dachdecker, anlagenmechaniker_shk, berufskraftfahrer | ZAB (wrong) | HWK of the place of work / IHK FOSA |

## 5. Checked list from the request
- Already present (no duplicate added): Elektroniker (craft, HWK), Anlagenmechaniker SHK, Kfz-Mechatroniker, Maurer, Dachdecker, Koch, Berufskraftfahrer, Fachinformatiker (= it_fachkraft), Pflegefachkraft (= pflegefachperson), Erzieher, Schweißer (relabelled).
- Added (17): Elektroniker für Betriebstechnik, Industriemechaniker, Zerspanungsmechaniker, Maschinen- und Anlagenführer, Metallbauer, Konstruktionsmechaniker, Mechatroniker, Tischler/Schreiner (one entry), Zimmerer, Fliesen-/Platten-/Mosaikleger, Maler und Lackierer, Straßenbauer, Beton- und Stahlbetonbauer, Gebäudereiniger, Bäcker, Friseur, Fachkraft für Lagerlogistik.

## 6. Uncertain / left unchanged (risk)
- Which few IHKs run their own procedure outside FOSA: the text says "most IHK occupations" and points to the Anerkennungs-Finder.
- Bau occupations (Zimmerer, Straßenbauer, Beton/Stahlbeton, Maurer) can fall under the IHK in industrial companies; this is marked as variable.
- HWK fees vary and no amount is given. FOSA €100–600 is verified.
- Regulated health and teaching entries (pflegefachperson, arzt, lehrer, …), MFA, altenpfleger, buchhalter, ekonomist, sozialpaedagoge: not re-audited in this pass and unchanged. The 5 occupations without an authority still fall back to ZAB, which needs a separate check per Land.
- berufskraftfahrer text (driving licence and Berufskraftfahrerqualifikation) unchanged.
- Office notes (`AuthorityContact.notes`) are shown in Bosnian in every language. This is the existing pattern; translating them would need UI wiring.
- The general UI line for non-regulated jobs ("better status and pay") is UI copy and was left unchanged.
