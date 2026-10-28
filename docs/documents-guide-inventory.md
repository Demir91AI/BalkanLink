# Dokumenti i potvrde — inventory before wiring (28.10.2026)

Baseline: `04a80e22a7bcace71420bb5b87a609389c8aa83d`. Scope is only `grundsicherung`, `fuehrungszeugnis`, `kirchenaustritt` in the unchanged `dokumenti` catalog group (46 total services).

## Existing behavior
- All three use FormCenter's generic guide-data fallback; no bespoke companion branch. Existing route/access decisions belong to the host and stay untouched.
- `FREE_FORM_SLUGS` explicitly includes `fuehrungszeugnis`; no auth/premium required for it. `grundsicherung` and `kirchenaustritt` are not in that set; no access changes.
- `grundsicherung` here means SGB XII, not the separate BA/Jobcenter SGB II HA/WBA/annex companions. Those models, sources, navigator and locales stay unchanged.
- The old Kirchenaustritt fallback incorrectly gives NRW as Standesamt, an immediate nationwide effective date, and a non-government source. It will not render on this slug; its underlying legacy data is preserved.
- Old Führungszeugnis fallback gives only two types, a fixed price/time and generic BfJ URL. It will not render alongside the new companion. No prices or guaranteed durations will be carried into the new guide.

## Primary sources checked this batch
Original explanatory summaries and brief attributed German terminology only; link to publishers, no hosted forms/assets. No form reproduction or blanket reuse-permission claim.

### Sozialamt / SGB XII
- BMAS national implementation and Länder responsibility: https://www.bmas.de/DE/Soziales/Sozialhilfe/Leistungen-fuer-den-Lebensunterhalt/Rundschreiben-zur-Grundsicherung/rundschreiben-zur-grundsicherung-art.html
- BMAS social-assistance overview: https://www.bmas.de/DE/Soziales/Sozialhilfe/Allgemeines-zur-Sozialhilfe/allgemeines-zur-sozialhilfe.html
- Berlin municipal application/evidence example: https://service.berlin.de/dienstleistung/324394/
- Landshut municipal evidence example: https://landshut.de/leben/soziales/sozialhilfe-grundsicherung-im-alter-und-bei-erwerbsminderung
- Stuttgart municipal service example: https://www.stuttgart.de/organigramm/leistungen/grundsicherung-im-alter-und-bei-erwerbsminderung-beantragen

BMAS confirms Fourth Chapter SGB XII, Länder execution/local providers. Municipality examples confirm age threshold or age 18+ with medically established permanent full incapacity; needs/resources/housing and possible additional needs assessed individually. No uniform municipal PDF edition or field map verified. Pension and SGB XII assistance are distinct. Evidence lists are examples, not universal requirements.

### Führungszeugnis
- BfJ FAQ: https://www.bundesjustizamt.de/DE/Themen/ZentraleRegister/Fuehrungszeugnis/Fragen/Fragen_node.html?docId=259056
- Application portal: https://www.fuehrungszeugnis.bund.de/
- Digital delivery information: https://www.bundesjustizamt.de/DE/Themen/ZentraleRegister/Fuehrungszeugnis/DigitalesFuehrungszeugnis/Digitales_Fuehrungszeugnis_node.html

**Important distinction:** online application is NOT limited to private certificates; portal lists private, authority and extended applications. BfJ's *digital certificate delivery* information describes the private-person option. BundID is specified for that digital option; it does not replace the portal's eID identity requirements. European certificates are linked to EU/UK nationality, not a freely selected extra service. Extended certificates require the requesting body's written confirmation of the legal purpose. No authenticated 2026 screen order verified.

### Kirchenaustritt
- BayernPortal declaration: https://www.bayernportal.de/dokumente/leistung/99775446502
- NRW Justice declaration: https://www.justiz.nrw.de/BS/recht_a_z/K/Kirchenaustritt
- Bundesportal, select locality: https://verwaltung.bund.de/leistungsverzeichnis/de/leistung/99073001022000
- BayernPortal church-tax information: https://www.bayernportal.de/dokumente/leistung/8684332320241

Bayern: Standesamt, personal declaration or written declaration with notarized signature. NRW: competent Amtsgericht, oral record or publicly certified written declaration. Plain email/letter is not equivalent. NRW source has a state-specific effective date/fee; not generalized. Local proof requirements, fees and tax timing may vary. Guide is neutral and does not ask for or store religious membership.

## Evidence limits
Check date means primary procedure pages checked on 28.10.2026, not a versioned form, nationwide legal opinion or authenticated portal audit. Publication dates are not consistently exposed by these sources. No field/page positions, national form editions, monetary eligibility limits, blanket entitlement or processing-time guarantees are claimed. Regional links are explicitly labeled examples; locality must be confirmed on official pages.