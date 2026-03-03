

# Plan: Populate Elterngeld SmartGuide with Detailed Official Content

## Source Data

From the official pages (familienportal.de and zbfs.bayern.de), I've extracted comprehensive information about the Elterngeld application process including: eligibility, three variants (Basiselterngeld, ElterngeldPlus, Partnerschaftsbonus), income calculation, required documents, Lebensmonate system, and application procedure.

## Changes

### File: `src/lib/guide-data.ts`

Replace the current `elterngeld` guide entry (lines ~357-402) with a fully expanded version:

**Updated metadata:**
- `who`: Expanded to explain eligibility (residence in Germany, self-caring for child, max 32h/week, income cap of 175,000€ for births from 01.04.2024)
- `authority`: Elterngeldstelle des jeweiligen Bundeslandes
- `formName`: Antrag auf Elterngeld (landesspezifisch)
- `officialPdf`: leave empty (form varies by Bundesland)
- `onlineLink`: `https://www.elterngeld-digital.de`
- `officialInfoUrl`: `https://familienportal.de/familienportal/familienleistungen/elterngeld`
- `processingTime`: 6-12 Wochen
- `documents`: Expanded with all required Nachweise from official source (Geburtsurkunde, Lohnabrechnungen 12 Monate, Mutterschaftsgeldbescheinigung, Arbeitgeberbescheinigung Elternzeit, Krankenversicherungsnachweis, ggf. Steuerbescheid bei Selbständigen, Arbeitszeitbestätigung)
- `commonMistakes`: Expanded (Antrag zu spät, falsche Lebensmonate, fehlende Partnermonate-Begründung, Mutterschaftsgeld nicht berücksichtigt, Einkommen während Bezug nicht angegeben, Einkommensgrenze übersehen)

**8 steps (bs language) with full cards:**

| Step | Field | Content |
|------|-------|---------|
| 1 | Lični podaci podnosioca (Antragsteller) | Name, Geburtsdatum, Steuer-ID, Anschrift, Staatsangehörigkeit, Familienstand, Steuerklasse |
| 2 | Podaci o djetetu | Name, Geburtsdatum, Geburtsort, Geschlecht, Kindergeld-Nummer |
| 3 | Izbor vrste Elterngeld-a | Basiselterngeld vs ElterngeldPlus vs Partnerschaftsbonus, Lebensmonate planning |
| 4 | Raspodjela mjeseci (Lebensmonate) | Which parent takes which months, Partnermonate, simultaneous months rules |
| 5 | Primanja prije porođaja (Einkommen vor Geburt) | Last 12 months income, self-employment income, Bemessungszeitraum, Steuerklassenwechsel |
| 6 | Zaposlenje tokom primanja (Erwerbstätigkeit) | Planned working hours (max 32h), expected income, Teilzeit details |
| 7 | Bankovni podaci i ostale davanja | IBAN, BIC, Mutterschaftsgeld, other benefits (Bürgergeld, ALG I, Wohngeld) |
| 8 | Izjava, potpis i prilozi | Both parents signature requirement, Anlagen, checklist of attachments |

Each step includes all 6 card types with specific content derived from official sources:
- `whatToWrite`: Exact fields to fill
- `whereToFind`: Where to get the information (e.g., "Na platnim listama", "Iz poreznog rješenja")
- `format`: Required format (dates, IBAN, hours/week)
- `commonMistakes`: Step-specific rejection causes
- `whenToLeaveEmpty`: When fields can/should be left blank
- `example`: Realistic pseudo-examples

**DE and EN steps** updated to 8 matching step titles (field names only, no cards).

No other files need changes.

