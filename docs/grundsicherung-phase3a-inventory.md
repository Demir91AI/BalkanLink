# Grundsicherung Phase 3A — pre-change inventory (28.10.2026)

Existing routes: `/formulari/hauptantrag`, `/formulari/weiterbewilligung`, `/formulari/anlage-kdu`, plus unchanged /hr, /sr, /de variants. Catalog has 46 services (not 42); 7 visible categories, visa data retained. Category ID `buergergeld` and all legacy aliases remain.

FormCenter currently renders LocalizedGuide components HauptantragGuideContent, WeiterbewilligungGuideContent, AnlageKDUGuideContent. Their source registry is jobcenter.digital; old HA claims no retroactivity, forbids later start dates; WBA invents fixed timing/section letters; KDU embeds 2024 Berlin limits. These three obsolete presentations will be replaced with verified companions; sources remain in repository. Other guides unchanged.

Shared ProcedureCompanion provides paper/online clarification, term jump, source links and reviewed-and-advance SmartGuide. Extend only slug/locale selection; Kindergeld uses separate components and remains untouched. Existing access is owned by GuideFrame and remains unchanged.

| PDF | official current URL | Edition | Pages | SHA-256 prefix |
|---|---|---|---|---|
| HA | https://www.arbeitsagentur.de/datei/antrag-sgb2_ba042689.pdf | 10/2026 | 8 | ca83914379b236b2 |
| WBA | https://www.arbeitsagentur.de/datei/weiterbewilligung-sgb2_ba042699.pdf | 10/2026 | 6 | cd1b875257256fb6 |
| KDU | https://www.arbeitsagentur.de/datei/anlagekdu_ba032980.pdf | 10/2026 | 3 | c451fabb6f3110d6 |

All are unencrypted AcroForms, not XFA. KDU URL obtained from https://www.arbeitsagentur.de/arbeitslos-arbeit-finden/downloads-arbeitslos-arbeit-finden. Instructions: https://www.arbeitsagentur.de/grundsicherung/ausfuellhinweise. Source PDFs downloaded/extracted in /tmp/gs only, never hosted or altered; permission for republication not assumed. Short exact field labels are referenced with attribution, explanations are original. BA reform and press pages confirm 01.07.2026 change to Grundsicherungsgeld; transitional legacy PDFs remain usable. No amounts, eligibility guarantee or automated legal determination.

Navigator is memory-only orientation, not applicant intake: no financial sums, names, documents, API or storage; uncertain answers retained as uncertainty. Jobcenter decides the final packet. EK/EKS/VM/KI/WEP remain listed with existing guidance, exact mapping deferred.
