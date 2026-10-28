# Formulari final inventory — audit + completed implementation 28.10.2026

Actual catalog: **46 unique entries, 8 stored categories**. Vault hides `vize` (4 entries): **42 visible entries across 7 categories**. Grundsicherung group has **21**, not 19, including Arbeitsbescheinigung and Antragsrücknahme. Catalog/IDs/free flags/routes remain unchanged. Anerkennung redirects to the separate rich `/anerkennung-navigator`; no standard companion replacement.

Dates distinguish registry metadata from wrapper overrides. A checked procedure is not an exact form map.

|Category|Slug|Actual implementation after final batch|Source / date|
|---|---|---|---|
|dolazak|`anmeldung`|ProcedureCompanion (arrival)|https://verwaltung.bund.de/leistungsverzeichnis/DE/leistung/99115005104000/herausgeber/BB-108321434/region/120000000000 · 27.10.2026|
|dolazak|`steuer-id`|ProcedureCompanion (arrival)|https://online.portal.bzst.de/SharedDocs/Leistungsbeschreibung/DE/erneute_mitteilung_der_ID-Nr.html · 27.10.2026|
|dolazak|`fuehrerschein`|ProcedureCompanion (arrival)|https://verwaltung.bund.de/leistungsverzeichnis/de/leistung/99108047050002/herausgeber/HB-S1000030000009309/region/040000000000 · 27.10.2026|
|dolazak|`fahrzeugzulassung`|ProcedureCompanion (arrival)|https://verwaltung.bund.de/leistungsverzeichnis/de/leistung/99036020001000/herausgeber/HB-S1000030000018506/region/040000000000 · 27.10.2026|
|porodica|`kindergeld`|KindergeldGuideContent + KindergeldFieldGuide|https://www.arbeitsagentur.de/familie-und-kinder/eservices-fuer-familien · 27.10.2026|
|porodica|`elterngeld`|ProcedureCompanion (family), retained host explanations|https://familienportal.de/familienportal/rechner-antraege/elterngeld-digital · 27.10.2026|
|porodica|`mutterschaftsgeld`|ProcedureCompanion (family), retained host explanations|https://familienportal.de/familienportal/familienleistungen/mutterschaftsleistungen/wie-kann-ich-mutterschaftsgeld-der-gesetzlichen-krankenkasse-berechnen-und-beantragen--125038 · 27.10.2026|
|porodica|`kinderzuschlag`|ProcedureCompanion (family), retained host explanations|https://www.arbeitsagentur.de/familie-und-kinder/downloads-familie-und-kinder/formulare-kinderzuschlag · 27.10.2026|
|porodica|`krippengeld-bayern`|ProcedureCompanion (family), retained host explanations|https://www.zbfs.bayern.de/familienleistungen/krippengeld/ · 27.10.2026|
|porodica|`wirtschaftliche-jugendhilfe`|ProcedureCompanion (family), retained host explanations|https://verwaltung.bund.de/leistungsverzeichnis/de/leistung/99107007010000 · not marked verified in registry|
|buergergeld|`hauptantrag`|ProcedureCompanion (Grundsicherung; HA navigator unchanged)|https://www.arbeitsagentur.de/datei/antrag-sgb2_ba042689.pdf · 28.10.2026|
|buergergeld|`weiterbewilligung`|ProcedureCompanion (Grundsicherung; HA navigator unchanged)|https://www.arbeitsagentur.de/datei/weiterbewilligung-sgb2_ba042699.pdf · 28.10.2026|
|buergergeld|`anlage-kdu`|ProcedureCompanion (Grundsicherung; HA navigator unchanged)|https://www.arbeitsagentur.de/datei/anlagekdu_ba032980.pdf · 28.10.2026|
|buergergeld|`anlage-ek`|ProcedureCompanion (Grundsicherung; HA navigator unchanged)|https://www.arbeitsagentur.de/datei/anlageek_ba032960.pdf · 28.10.2026|
|buergergeld|`anlage-eks`|ProcedureCompanion (Grundsicherung; HA navigator unchanged)|https://www.arbeitsagentur.de/datei/anlageeks_ba033540.pdf · 28.10.2026|
|buergergeld|`anlage-vm`|ProcedureCompanion (Grundsicherung; HA navigator unchanged)|https://www.arbeitsagentur.de/datei/anlagevm_ba033055.pdf · 28.10.2026|
|buergergeld|`anlage-wep`|ProcedureCompanion (Grundsicherung; HA navigator unchanged)|https://www.arbeitsagentur.de/datei/anlagewep_ba033100.pdf · 28.10.2026|
|buergergeld|`anlage-ki`|ProcedureCompanion (Grundsicherung; HA navigator unchanged)|https://www.arbeitsagentur.de/datei/anlageki_ba033000.pdf · 28.10.2026|
|buergergeld|`anlage-sv`|ProcedureCompanion (Grundsicherung; HA navigator unchanged)|https://www.arbeitsagentur.de/datei/anlagesv_ba033005.pdf · 28.10.2026|
|buergergeld|`anlage-bb`|ProcedureCompanion (Grundsicherung; HA navigator unchanged)|https://www.arbeitsagentur.de/datei/anlagebb_ba032985.pdf · 28.10.2026|
|buergergeld|`anlage-ve`|ProcedureCompanion (Grundsicherung; HA navigator unchanged)|https://www.arbeitsagentur.de/datei/anlageve_ba033130.pdf · 28.10.2026|
|buergergeld|`anlage-hg`|ProcedureCompanion (verified original; employer/clinical roles labelled)|https://www.arbeitsagentur.de/datei/anlagehg_ba032950.pdf · 28.10.2026|
|buergergeld|`anlage-meb`|ProcedureCompanion (verified original; employer/clinical roles labelled)|https://www.arbeitsagentur.de/datei/anlagemeb_ba032955.pdf · 28.10.2026|
|buergergeld|`anlage-uf`|ProcedureCompanion (verified original; employer/clinical roles labelled)|https://www.arbeitsagentur.de/datei/anlageuf_ba032970.pdf · 28.10.2026|
|buergergeld|`anlage-se`|ProcedureCompanion (verified original; employer/clinical roles labelled)|https://www.arbeitsagentur.de/datei/anlagese_ba032975.pdf · 28.10.2026|
|buergergeld|`anlage-uh1`|ProcedureCompanion (verified original; employer/clinical roles labelled)|https://www.arbeitsagentur.de/datei/anlageuh1_ba032990.pdf · 28.10.2026|
|buergergeld|`anlage-uh2`|ProcedureCompanion (verified original; employer/clinical roles labelled)|https://www.arbeitsagentur.de/datei/anlageuh2_ba032995.pdf · 28.10.2026|
|buergergeld|`anlage-uh3`|ProcedureCompanion (verified original; employer/clinical roles labelled)|https://www.arbeitsagentur.de/datei/anlageuh3_ba033050.pdf · 28.10.2026|
|buergergeld|`nichterreichbarkeit`|ProcedureCompanion (verified original; employer/clinical roles labelled)|https://www.arbeitsagentur.de/datei/anfrage-ortsabwesenheit_ba147389.pdf · 28.10.2026|
|buergergeld|`arbeitsbescheinigung`|ProcedureCompanion (verified original; employer/clinical roles labelled)|https://www.arbeitsagentur.de/datei/arbeitsbescheinigung_ba013140.pdf · 28.10.2026|
|buergergeld|`antragsruecknahme`|ProcedureCompanion (verified original; employer/clinical roles labelled)|https://www.arbeitsagentur.de/datei/erklaerung-der-antragsruecknahme_ba053139.pdf · 28.10.2026|
|wohngeld|`wohngeld`|WohngeldCompanion → ProcedureCompanion|local authority / wrapper-specific links · not marked verified in registry; wrapper source check 28.10.2026|
|posao|`arbeitslosengeld`|CareerCompanion → ProcedureCompanion|https://www.arbeitsagentur.de · not marked verified in registry; wrapper source check 28.10.2026|
|posao|`krankenkasse`|CareerCompanion → ProcedureCompanion|local authority / wrapper-specific links · not marked verified in registry; wrapper source check 28.10.2026|
|posao|`steuerklassenwechsel`|CareerCompanion → ProcedureCompanion|https://www.elster.de · not marked verified in registry; wrapper source check 28.10.2026|
|obrazovanje|`anerkennung-navigator`|Separate Anerkennung Navigator|local authority / wrapper-specific links · not marked verified in registry|
|obrazovanje|`bafoeg`|EducationCompanion → ProcedureCompanion|https://www.xn--bafg-7qa.de/bafoeg/de/antrag-stellen/alle-antragsformulare/alle-antragsformulare_node.html · 28.10.2026|
|obrazovanje|`schueler-bafoeg`|EducationCompanion → ProcedureCompanion|https://www.xn--bafg-7qa.de/bafoeg/de/antrag-stellen/alle-antragsformulare/alle-antragsformulare_node.html · 28.10.2026|
|obrazovanje|`integrationskurs`|EducationCompanion → ProcedureCompanion|https://www.bamf.de/SharedDocs/Anlagen/DE/Integration/Integrationskurse/Kursteilnehmer/AntraegeAlle/630-007_antrag-zulassung-integrationskurs-ausl_pdf.html · 28.10.2026|
|dokumenti|`grundsicherung`|DocumentsCompanion → ProcedureCompanion|https://www.bmas.de/DE/Soziales/Sozialhilfe/Leistungen-fuer-den-Lebensunterhalt/Rundschreiben-zur-Grundsicherung/rundschreiben-zur-grundsicherung-art.html · 28.10.2026|
|dokumenti|`fuehrungszeugnis`|DocumentsCompanion → ProcedureCompanion|https://www.fuehrungszeugnis.bund.de/ · 28.10.2026|
|dokumenti|`kirchenaustritt`|DocumentsCompanion → ProcedureCompanion|https://verwaltung.bund.de/leistungsverzeichnis/de/leistung/99073001022000 · 28.10.2026|
|vize|`nationalvisum`|Legacy FormFreeContent/FormSmartGuide (hidden category)|https://www.auswaertiges-amt.de/de/service/visa-und-aufenthalt/auslandsportal · not marked verified in registry|
|vize|`aufenthaltstitel`|Legacy FormFreeContent/FormSmartGuide (hidden category)|local authority / wrapper-specific links · not marked verified in registry|
|vize|`niederlassungserlaubnis`|Legacy FormFreeContent/FormSmartGuide (hidden category)|local authority / wrapper-specific links · not marked verified in registry|
|vize|`verpflichtungserklaerung`|Legacy FormFreeContent/FormSmartGuide (hidden category)|local authority / wrapper-specific links · not marked verified in registry|

## Ten old-page mismatches and replacement boundary

All ten existing dedicated components stay in source but final allowlist dispatch supersedes them exactly once. Old Arbeitsbescheinigung title wrongly combines Arbeitsbescheinigung with §57 SGB II: distinguish SGB III §312 BEA vs SGB II Einkommensbescheinigung. Old UF unconditional SE wording and old SE recommendation for broad consent are not retained. MEB medical numbering restarts; patient and doctor roles must stay separate. Withdrawal original says no signature required. ANE has no invented signature field. Prior guides, navigator, catalogue, permissions and assets stay unchanged.

## Primary original inspection

All PDF copies/extractions are temporary `/tmp/formulari-final-sources`; no PDF in project. Live BA downloads index was read before content editing. All originals unencrypted AcroForms; no circumvention. Necessary short printed labels/options attributed to BA; explanations original and link-only, no redistribution licence asserted.

|Original|Edition|Physical pages|SHA-256|
|---|---|---:|---|
|anfrage-ortsabwesenheit_ba147389.pdf|05/2026|3|`d923daa62b74de65ff01187fa0f5c5cecbf384b14f46e09ab982a88a41f06863`|
|anlagehg_ba032950.pdf|10/2026|2|`40f602a40f07d86d9e46a3c2e73af633d6f22e876063183efe210035d7e3fbf8`|
|anlagemeb_ba032955.pdf|10/2026|4|`99f63a4bc79ed28634455eb012ab831c6dcb5ebf957afd585ca3d730378c3937`|
|anlagese_ba032975.pdf|10/2026|3|`621c1240f1776efe43bdfa8edc3152c1c4973232733ee5a2964857480224f6db`|
|anlageuf_ba032970.pdf|10/2026|7|`0a68d2af8621cc514ef24472821e394edf21bc1e1c9befe9fd9c9d2794cd261c`|
|anlageuh1_ba032990.pdf|10/2026|3|`3bc7d4141d154fc4d3b1b3966bb2e88387c68e9198be08d89007fe16c398feb0`|
|anlageuh2_ba032995.pdf|10/2026|3|`94c26600242f8f52820a7b920a6aaac2e0344f909f8c1d3a19cb12550c026b87`|
|anlageuh3_ba033050.pdf|10/2026|4|`73b0d29ad99cf64da52ed917e8aead4c4827e903d202dc43736310985a1c5bab`|
|arbeitsbescheinigung_ba013140.pdf|08/2023|9|`df7833909444b0e741d9f6f78cc429927bbe8e31bb0f63b7c462af23a15e8798`|
|einkommensbescheinigung_ba032965.pdf|10/2026|6|`ef8fcd427a526e1cb530618cb44c109058a8af430a11ea714037b9260113463f`|
|erklaerung-der-antragsruecknahme_ba053139.pdf|07/2026|1|`dac24aea00365bad6a3031884655360ae470c6ab9fb1fcdc3e7ca32520182fcd`|

MEB physical pages 2–4 have separate printed medical page numbers 1–3 and independent fields 1–21. Arbeitsbescheinigung SGB III live-linked PDF remains 08/2023; mandatory modern employer BEA is not that paper screen order. ANE 05/2026 and withdrawal 07/2026 are not falsely retitled 10/2026. Exact mapping will reference actual editions only.
