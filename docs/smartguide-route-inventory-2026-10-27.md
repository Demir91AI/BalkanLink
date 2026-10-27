# SmartGuide route inventory — before changes

Baseline: `5f9ce98eae44ee15724b5e1942c9d89d09d7ed66`. All route declarations, locale layouts, sidebar destinations and legacy aliases remain unchanged.

## FormCenter services

| Route | Existing renderer | Parity gap before migration |
|---|---|---|
| `/formulari/anmeldung` | AnmeldungGuideContent | bespoke/fallback; needs procedure-specific content and source review |
| `/formulari/steuer-id` | SteuerIdGuideContent | bespoke/fallback; needs procedure-specific content and source review |
| `/formulari/fuehrerschein` | FuehrerscheinGuideContent | bespoke/fallback; needs procedure-specific content and source review |
| `/formulari/fahrzeugzulassung` | FahrzeugzulassungGuide | bespoke/fallback; needs procedure-specific content and source review |
| `/formulari/kindergeld` | KindergeldGuideContent | online/paper 20 mapped records; process lacks shared step navigation |
| `/formulari/elterngeld` | ElterngeldGuideContent | legacy shared wizard; field labels not distinguished from informational content |
| `/formulari/mutterschaftsgeld` | MutterschaftsgeldGuideContent | legacy shared wizard; field labels not distinguished from informational content |
| `/formulari/kinderzuschlag` | KinderzuschlagGuideContent | legacy shared wizard; field labels not distinguished from informational content |
| `/formulari/krippengeld-bayern` | KrippengeldBayernGuideContent | bespoke/fallback; needs procedure-specific content and source review |
| `/formulari/wirtschaftliche-jugendhilfe` | WirtschaftlicheJugendhilfeGuideContent | bespoke/fallback; needs procedure-specific content and source review |
| `/formulari/hauptantrag` | HauptantragGuideContent | legacy shared wizard; field labels not distinguished from informational content |
| `/formulari/weiterbewilligung` | WeiterbewilligungGuideContent | legacy shared wizard; field labels not distinguished from informational content |
| `/formulari/anlage-kdu` | AnlageKDUGuideContent | bespoke/fallback; needs procedure-specific content and source review |
| `/formulari/anlage-ek` | AnlageEKGuideContent | bespoke/fallback; needs procedure-specific content and source review |
| `/formulari/anlage-eks` | AnlageEKSGuideContent | bespoke/fallback; needs procedure-specific content and source review |
| `/formulari/anlage-vm` | AnlageVMGuideContent | bespoke/fallback; needs procedure-specific content and source review |
| `/formulari/anlage-wep` | AnlageWEPGuideContent | bespoke/fallback; needs procedure-specific content and source review |
| `/formulari/anlage-ki` | AnlageKIGuideContent | bespoke/fallback; needs procedure-specific content and source review |
| `/formulari/anlage-sv` | AnlageSVGuideContent | bespoke/fallback; needs procedure-specific content and source review |
| `/formulari/anlage-bb` | AnlageBBGuideContent | bespoke/fallback; needs procedure-specific content and source review |
| `/formulari/anlage-ve` | AnlageVEGuideContent | bespoke/fallback; needs procedure-specific content and source review |
| `/formulari/anlage-hg` | AnlageHGGuideContent | bespoke/fallback; needs procedure-specific content and source review |
| `/formulari/anlage-meb` | AnlageMEBGuideContent | bespoke/fallback; needs procedure-specific content and source review |
| `/formulari/anlage-uf` | AnlageUFGuideContent | bespoke/fallback; needs procedure-specific content and source review |
| `/formulari/anlage-se` | AnlageSEGuideContent | bespoke/fallback; needs procedure-specific content and source review |
| `/formulari/anlage-uh1` | AnlageUH1GuideContent | bespoke/fallback; needs procedure-specific content and source review |
| `/formulari/anlage-uh2` | AnlageUH2GuideContent | bespoke/fallback; needs procedure-specific content and source review |
| `/formulari/anlage-uh3` | AnlageUH3GuideContent | bespoke/fallback; needs procedure-specific content and source review |
| `/formulari/nichterreichbarkeit` | AnfrageNichterreichbarkeitGuideContent | bespoke/fallback; needs procedure-specific content and source review |
| `/formulari/arbeitsbescheinigung` | ArbeitsbescheinigungGuideContent | legacy shared wizard; field labels not distinguished from informational content |
| `/formulari/antragsruecknahme` | AntragsruecknahmeGuideContent | legacy shared wizard; field labels not distinguished from informational content |
| `/formulari/wohngeld` | WohngeldGuideContent | legacy shared wizard; field labels not distinguished from informational content |
| `/formulari/arbeitslosengeld` | guide-data fallback / verify host | bespoke/fallback; needs procedure-specific content and source review |
| `/formulari/krankenkasse` | KrankenkasseGuideContent | legacy shared wizard; field labels not distinguished from informational content |
| `/formulari/steuerklassenwechsel` | guide-data fallback / verify host | bespoke/fallback; needs procedure-specific content and source review |
| `/formulari/anerkennung-navigator` | guide-data fallback / verify host | catalog selection navigates to /anerkennung-navigator; profession/state-specific flow remains separate |
| `/formulari/bafoeg` | guide-data fallback / verify host | bespoke/fallback; needs procedure-specific content and source review |
| `/formulari/schueler-bafoeg` | guide-data fallback / verify host | bespoke/fallback; needs procedure-specific content and source review |
| `/formulari/integrationskurs` | guide-data fallback / verify host | bespoke/fallback; needs procedure-specific content and source review |
| `/formulari/grundsicherung` | guide-data fallback / verify host | bespoke/fallback; needs procedure-specific content and source review |
| `/formulari/fuehrungszeugnis` | guide-data fallback / verify host | bespoke/fallback; needs procedure-specific content and source review |
| `/formulari/kirchenaustritt` | guide-data fallback / verify host | bespoke/fallback; needs procedure-specific content and source review |
| `/formulari/nationalvisum` | guide-data fallback / verify host | bespoke/fallback; needs procedure-specific content and source review |
| `/formulari/aufenthaltstitel` | guide-data fallback / verify host | existing route redirects to /formulari; preserve this behavior, not a live detail guide |
| `/formulari/niederlassungserlaubnis` | guide-data fallback / verify host | bespoke/fallback; needs procedure-specific content and source review |
| `/formulari/verpflichtungserklaerung` | guide-data fallback / verify host | bespoke/fallback; needs procedure-specific content and source review |

## Other procedural/navigation candidates

| Declared route | Review needed |
|---|---|
| `/dolazak` | Preserve host/branch/locale/access; audit content before workflow migration |
| `/dolazak/prijava-prebivalista` | Preserve host/branch/locale/access; audit content before workflow migration |
| `/dolazak/boravisna-dozvola` | Preserve host/branch/locale/access; audit content before workflow migration |
| `/dolazak/steuer-id-i-porezna-klasa` | Preserve host/branch/locale/access; audit content before workflow migration |
| `/dolazak/zdravstveno-osiguranje` | Preserve host/branch/locale/access; audit content before workflow migration |
| `/dolazak/bankovni-racun` | Preserve host/branch/locale/access; audit content before workflow migration |
| `/dolazak/prvi-koraci` | Preserve host/branch/locale/access; audit content before workflow migration |
| `/dolazak/sozialversicherung` | Preserve host/branch/locale/access; audit content before workflow migration |
| `/dolazak/rundfunkbeitrag` | Preserve host/branch/locale/access; audit content before workflow migration |
| `/dolazak/fuehrerschein` | Preserve host/branch/locale/access; audit content before workflow migration |
| `/dolazak/auto-anmelden` | Preserve host/branch/locale/access; audit content before workflow migration |
| `/zivot` | Preserve host/branch/locale/access; audit content before workflow migration |
| `/formulari/anmeldung/muster` | Preserve host/branch/locale/access; audit content before workflow migration |
| `/musterformular/anmeldung` | Preserve host/branch/locale/access; audit content before workflow migration |
| `/musterformular/einbuergerung` | Preserve host/branch/locale/access; audit content before workflow migration |
| `/familie` | Preserve host/branch/locale/access; audit content before workflow migration |
| `/foerderungen` | Preserve host/branch/locale/access; audit content before workflow migration |
| `/schufa-simulator` | Preserve host/branch/locale/access; audit content before workflow migration |
| `/anerkennung-navigator` | Preserve host/branch/locale/access; audit content before workflow migration |
| `/anerkennung-fakulteti` | Preserve host/branch/locale/access; audit content before workflow migration |
| `/anerkennung-hochschulen` | Preserve host/branch/locale/access; audit content before workflow migration |
| `/porezi` | Preserve host/branch/locale/access; audit content before workflow migration |
| `/porezi/da-li-moram` | Preserve host/branch/locale/access; audit content before workflow migration |
| `/porezi/moram-li-uopce` | Preserve host/branch/locale/access; audit content before workflow migration |
| `/porezi/dvostruko-domacinstvo` | Preserve host/branch/locale/access; audit content before workflow migration |
| `/porezi/dvostruko-kucanstvo` | Preserve host/branch/locale/access; audit content before workflow migration |
| `/porezi/rokovi-i-kazne` | Preserve host/branch/locale/access; audit content before workflow migration |
| `/porezi/sta-mogu-odbiti` | Preserve host/branch/locale/access; audit content before workflow migration |
| `/porezi/sto-mogu-odbiti` | Preserve host/branch/locale/access; audit content before workflow migration |
| `/porezi/elster-vodic` | Preserve host/branch/locale/access; audit content before workflow migration |
| `/porezi/porodica-i-klase` | Preserve host/branch/locale/access; audit content before workflow migration |
| `/porezi/obitelj-i-klase` | Preserve host/branch/locale/access; audit content before workflow migration |
| `/steuern/familie-und-steuerklassen` | Preserve host/branch/locale/access; audit content before workflow migration |
| `/porezi/studenti-i-pripravnici` | Preserve host/branch/locale/access; audit content before workflow migration |
| `/porezi/studenti-i-naucnici` | Preserve host/branch/locale/access; audit content before workflow migration |
| `/porezi/samostalni-i-freelancer` | Preserve host/branch/locale/access; audit content before workflow migration |
| `/porezi/prihodi-od-izdavanja` | Preserve host/branch/locale/access; audit content before workflow migration |
| `/porezi/prihodi-od-najma` | Preserve host/branch/locale/access; audit content before workflow migration |
| `/porezi/najcesce-greske` | Preserve host/branch/locale/access; audit content before workflow migration |
| `/check-liste` | Preserve host/branch/locale/access; audit content before workflow migration |
| `/check-liste/:slug` | Preserve host/branch/locale/access; audit content before workflow migration |
| `/anmeldung-simulator` | Preserve host/branch/locale/access; audit content before workflow migration |
| `/anmeldung-simulation` | Preserve host/branch/locale/access; audit content before workflow migration |
| `/porezi/najceste-pogreske` | Preserve host/branch/locale/access; audit content before workflow migration |
| `/nach-deutschland` | Preserve host/branch/locale/access; audit content before workflow migration |
| `/nach-deutschland/:countryCode` | Preserve host/branch/locale/access; audit content before workflow migration |
| `/nach-deutschland/:countryCode/:categoryKey` | Preserve host/branch/locale/access; audit content before workflow migration |
| `/zivot-u-njemackoj` | Preserve host/branch/locale/access; audit content before workflow migration |
| `/viza` | Preserve host/branch/locale/access; audit content before workflow migration |
| `/dvojno-drzavljanstvo` | Preserve host/branch/locale/access; audit content before workflow migration |
| `/dvojno-drzavljanstvo/einbuergerung-vodic` | Preserve host/branch/locale/access; audit content before workflow migration |
| `/radno-pravo` | Preserve host/branch/locale/access; audit content before workflow migration |
| `/radno-pravo/:slug` | Preserve host/branch/locale/access; audit content before workflow migration |
| `/biznis` | Preserve host/branch/locale/access; audit content before workflow migration |
| `/biznis/:slug` | Preserve host/branch/locale/access; audit content before workflow migration |
| `/zivot-savjeti` | Preserve host/branch/locale/access; audit content before workflow migration |

## Complete route declarations (including non-guidance routes)

Not every route is a procedural workflow. Calculators/scanners, blog, templates, legal/auth/admin and payment pages must keep their useful functions. Dynamic routes include their existing parameter names.

- `/dolazak`
- `/dolazak/prijava-prebivalista`
- `/dolazak/boravisna-dozvola`
- `/dolazak/steuer-id-i-porezna-klasa`
- `/dolazak/zdravstveno-osiguranje`
- `/dolazak/bankovni-racun`
- `/dolazak/prvi-koraci`
- `/dolazak/sozialversicherung`
- `/dolazak/rundfunkbeitrag`
- `/dolazak/fuehrerschein`
- `/dolazak/auto-anmelden`
- `/zivot`
- `/probleme`
- `/formulare`
- `/formulari`
- `/formulari/kindergeld/muster`
- `/formulari/anmeldung/muster`
- `/musterformular/elterngeld`
- `/musterformular/anmeldung`
- `/musterformular/buergergeld`
- `/musterformular/wohngeld`
- `/musterformular/steuerklasse`
- `/musterformular/arbeitslosengeld`
- `/musterformular/bafoeg`
- `/musterformular/fuehrungszeugnis`
- `/musterformular/kirchenaustritt`
- `/musterformular/integrationskurs`
- `/musterformular/kinderzuschlag`
- `/musterformular/schueler-bafoeg`
- `/musterformular/grundsicherung`
- `/musterformular/anlage-bb`
- `/musterformular/anlage-sv`
- `/musterformular/anlage-ve`
- `/musterformular/anlage-hg`
- `/musterformular/anlage-meb`
- `/musterformular/anlage-uf`
- `/musterformular/anlage-se`
- `/musterformular/arbeitsbescheinigung`
- `/musterformular/kindergeld`
- `/musterformular/antrag-generic`
- `/musterformular/antragsruecknahme`
- `/musterformular/wirtschaftliche-jugendhilfe`
- `/musterformular/einbuergerung`
- `/musterformular/anlage-uh1`
- `/musterformular/anlage-uh2`
- `/musterformular/anlage-uh3`
- `/musterformular/nichterreichbarkeit`
- `/musterformular/mutterschaftsgeld`
- `/musterformular/krippengeld-bayern`
- `/musterformular/aufenthaltstitel`
- `/musterformular/verpflichtungserklaerung`
- `/musterformular/nationalvisum`
- `/musterformular/niederlassungserlaubnis`
- `/formulari/:slug`
- `/familie`
- `/foerderungen`
- `/tools`
- `/brutto-netto-rechner`
- `/wohnungen`
- `/stellenangebote`
- `/premium`
- `/profil`
- `/moji-podaci`
- `/guide/:slug`
- `/smart-guide/:slug`
- `/dokumenten-check`
- `/nebenkosten-scan`
- `/rezije-skener`
- `/rezije-provjera`
- `/schufa-simulator`
- `/bonitet`
- `/anerkennung-navigator`
- `/priznavanje-diplome`
- `/anerkennung-fakulteti`
- `/priznavanje-fakulteta`
- `/anerkennung-hochschulen`
- `/porezi`
- `/steuern`
- `/porezi/da-li-moram`
- `/porezi/moram-li-uopce`
- `/steuern/muss-ich-ueberhaupt`
- `/porezi/dvostruko-domacinstvo`
- `/porezi/dvostruko-kucanstvo`
- `/steuern/doppelte-haushaltsfuehrung`
- `/porezi/rokovi-i-kazne`
- `/steuern/fristen-und-strafen`
- `/porezi/sta-mogu-odbiti`
- `/porezi/sto-mogu-odbiti`
- `/steuern/was-kann-ich-absetzen`
- `/porezi/elster-vodic`
- `/steuern/elster-anleitung`
- `/porezi/porodica-i-klase`
- `/porezi/obitelj-i-klase`
- `/steuern/familie-und-steuerklassen`
- `/porezi/studenti-i-pripravnici`
- `/porezi/studenti-i-naucnici`
- `/steuern/studenten-und-azubis`
- `/porezi/samostalni-i-freelancer`
- `/steuern/selbststaendige-und-freelancer`
- `/porezi/prihodi-od-izdavanja`
- `/porezi/prihodi-od-najma`
- `/steuern/mieteinkuenfte`
- `/porezi/najcesce-greske`
- `/check-liste`
- `/check-liste/:slug`
- `/checklisten`
- `/checklisten/:slug`
- `/anmeldung-simulator`
- `/anmeldung-simulation`
- `/pitaj-dijasporu`
- `/pitaj-dijasporu/:id`
- `/frag-die-diaspora`
- `/porezi/najceste-pogreske`
- `/steuern/haeufigste-fehler`
- `/admin`
- `/admin/forms`
- `/admin/forms/:slug/mapper`
- `/admin/trialovi`
- `/admin/pitanja`
- `/admin/stripe-sync`
- `/qa`
- `/qa/:id`
- `/ambasade-konzulati`
- `/login`
- `/register`
- `/forgot-password`
- `/reset-password`
- `/impressum`
- `/datenschutz`
- `/disclaimer`
- `/napomena-o-ki`
- `/mitgliedschaft`
- `/agb`
- `/dsa`
- `/cookie-richtlinie`
- `/unsubscribe`
- `/email-preferences/unsubscribe`
- `/nudim-trazim`
- `/nach-deutschland`
- `/nach-deutschland/:countryCode`
- `/nach-deutschland/:countryCode/:categoryKey`
- `/vorlagen`
- `/vorlagen/:slug`
- `/deutsch-trainer`
- `/deutsch-trainer/preise`
- `/deutsch-trainer/faq`
- `/deutsch-trainer/bonusbedingungen`
- `/firma/:slug`
- `/bussgeld`
- `/ai-asistent`
- `/asistent`
- `/assistent`
- `/assistant`
- `/paketi`
- `/pricing`
- `/payment-success`
- `/placanje-uspjesno`
- `/placanje-otkazano`
- `/kalkulatori`
- `/zivot-u-njemackoj`
- `/viza`
- `/dvojno-drzavljanstvo`
- `/dvojno-drzavljanstvo/einbuergerung-vodic`
- `/doppelte-staatsbuergerschaft`
- `/radno-pravo`
- `/radno-pravo/:slug`
- `/biznis`
- `/biznis/:slug`
- `/mietrecht`
- `/obnova-pasosa`
- `/sacuvano`
- `/gespeichert`
- `/spremljeno`
- `/sacuvane-stavke`
- `/pass-erneuern`
- `/oglasi`
- `/deutsch`
- `/sabloni`
- `/pitanja`
- `/zivot-savjeti`
- `/trebam-pomoc`
- `/pocni-ovdje`
- `/ambasade`
- `/nutzungsbedingungen`
- `/uslovi-koristenja`
- `/haftungsausschluss`
- `/odricanje-odgovornosti`
- `/inhalte-melden`
- `/ki-hinweis`
- `/postavke-kolacica`
- `/*`
- `//__visual/flag-ba`
- `//muster/kindergeld/preview`
- `//de/muster/kindergeld/preview`
- `//hr/muster/kindergeld/preview`
- `//sr/muster/kindergeld/preview`
- `//de/*`
- `//hr/*`
- `//sr/*`
- `//*`

## Navigation and parity findings

- Eight FormCenter categories and 46 service entries remain. Sidebar links are a subset, not a full route inventory. See the existing catalog-navigation inventory for every sidebar destination.
- Legacy `/guide/:slug`, `/smart-guide/:slug`, `/formulare` and `/musterformular/*` aliases remain; no PDF-fill resurrection.
- Dedicated recognition navigators, Visa Navigator and dual-citizenship content require jurisdiction/profession-specific review; a generic field wizard would lose their actual branching.
- Most registry records lack verification dates. Never stamp an entire workflow verified merely because its URL responds.
- Legacy guide data contains fixed 2026 benefits/timing claims and incomplete DE/HR/SR overlays; presentation migration is not a claim those facts are verified.
- First implementation prioritizes the existing shared-wizard consumers plus Kindergeld, rather than pretending all bespoke procedures are fully migrated. Full content verification remains explicitly tracked.
