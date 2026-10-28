# Rad i karijera – source inventory (checked 28.10.2026)

Pre-change: `/formulari/arbeitslosengeld` and `/formulari/steuerklassenwechsel` rendered the generic guide fallback; `/formulari/krankenkasse` rendered `KrankenkasseGuideContent` (file + import kept, no longer mounted). All three use `OfficialNextStep`; `official-sources.ts` entries unchanged.

| Slug | Primary sources (HTTP 200 on 28.10.2026) | Facts used |
|---|---|---|
| arbeitslosengeld | BA: …/wie-sie-sich-arbeitslos-melden, …/wie-sie-sich-arbeitsuchend-melden, …/arbeitslosengeld-anspruch-hoehe-dauer | arbeitsuchend ≥3 months before end or within 3 days; Arbeitslosmeldung ≤3 months before, latest first day; separate steps; eID via BundID or in person (ID + Meldebescheinigung); sickness → registration on recovery day; re-register after >6 weeks; Anwartschaft 12 of 30 months; 60/67 % child factor (named, no amounts); Sperrzeit up to 12 weeks, e.g. Eigenkündigung/Aufhebungsvertrag |
| krankenkasse | BMG Wahl/Wechsel; gesund.bund.de/krankenkasse-wechseln (17.12.2025); GKV-Spitzenverband Krankenkassenliste | free choice of kasse types; 12-month binding, 2-month notice, new kasse handles termination; PKV/GKV switch only under conditions |
| steuerklassenwechsel | Bundesportal (Hamburg 21.01.2026, RP 30.01.2025); Finanzamt BW "Folgen der Steuerklassenwahl"; ELSTER form overview; FMS | IV/IV automatic at marriage; III/V; IV/IV with Faktor; change until 30 Nov (BW); effect on wage-replacement benefits; foreign marriage needs certificate |

No exact field mapping: ALG and insurer flows are authenticated/insurer-specific; the FMS "Antrag auf Steuerklassenwechsel bei Ehegatten/Lebenspartnern" PDF was not downloaded/inspected (BW also names the Lohnsteuer-Ermäßigung route), so no field numbers are claimed.
