

# Plan: Update BuT Guide with BMAS Anlaufstellen Details

## What Changes

### File: `src/lib/guide-data.ts` (bildung-teilhabe entry, lines 602-642)

**1. Update `authority` field (line 607)**
Expand to explain the decentralized structure from BMAS:
- BuT is administered **dezentral** — the responsible office depends on which base benefit the family receives
- **Bürgergeld recipients** → Jobcenter
- **Wohngeld/Kinderzuschlag recipients** → Kommune/Kreisverwaltung/Sozialamt (varies by Bundesland)
- **Asylbewerberleistungen** → Sozialamt
- Add reference to BMAS Anlaufstellen-Finder for finding the correct office by Bundesland

**2. Update `formName` field (line 608)**
Expand to explain:
- Form varies by municipality/Bundesland (no single federal form)
- Find the correct office via BMAS Anlaufstellen page (bmas.de → Bildungspaket → Anlaufstellen → select Bundesland)
- Many municipalities offer online applications or downloadable forms on their website
- Some Jobcenter process BuT automatically with Bürgergeld approval (no separate application needed for school supplies)

**3. Update `officialInfoUrl` (line 642)**
Keep existing BMAS link, but also reference the Anlaufstellen page in the formName text.

All 3 languages (DE, BS, EN) updated accordingly.

