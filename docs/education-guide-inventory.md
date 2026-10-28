# Education batch — source inventory (checked 28.10.2026)

Scope: `bafoeg`, `schueler-bafoeg`, `integrationskurs`. `anerkennung-navigator` untouched.

## BAföG / Schüler-BAföG (bafög.de, BMBF)
Index: https://www.xn--bafg-7qa.de/bafoeg/de/antrag-stellen/alle-antragsformulare/alle-antragsformulare_node.html
(`www.bafoeg.de` itself was unreachable from the sandbox; the IDN host worked.)

| Form | Stand | Pages | AcroForm / encrypted | SHA256 prefix |
|---|---|---|---|---|
| Formblatt 01 Antrag | 2025 | 8 | yes / no | db226f6a2357bb20 |
| Formblatt 02 Bescheinigung § 9 | 2025 | 2 | yes / no | e6257c4d5db19684 |
| Formblatt 03 Einkommenserklärung | 2025 | 6 | yes / no | 2f15c8d2827bfa0e |
| Formblatt 04 Kinder | 2025 | 2 | yes / no | 6220f2d8be768cbe |

Formblatt 01 Zeile 1–85 read in full with pdftotext; Familienstand codes 1–5, Geschlecht codes 1–4, Zeile 81–84 "Nur für Schülerinnen und Schüler", signature Zeile 85.
School office competence: inland_node.html (Kreis/kreisfreie Stadt, usually parents' residence; Abendgymnasium/Kolleg/höhere Fachschule/Akademie by school location).
Schüler-BAföG conditions: BMBF school flyer (31558_BAfoeG_Schuelerflyer.pdf) and bafög.de school page (Stand Juli 2024).

## Integrationskurs (BAMF)
- 630.007 page: https://www.bamf.de/SharedDocs/Anlagen/DE/Integration/Integrationskurse/Kursteilnehmer/AntraegeAlle/630-007_antrag-zulassung-integrationskurs-ausl_pdf.html — online via Bundesportal, mentions an "Offline-Version" but **no PDF download offered**; direct blob URL redirects to an error page. Version "630.007v" could NOT be confirmed. Repo bundle 630.007w 01/2026 is already marked superseded. => **No field positions mapped.**
- 630.027 Kostenbefreiung and 630.032 Fahrtkostenzuschuss pages: separate requests, Bundesportal online.
- Teilnahme/Kosten "Titelab2005" page dated 01.07.2026: Berechtigung, Verpflichtung, Kursträger, Kostenbeitrag.
