

# Plan: Populate Kinderzuschlag (KiZ 1) SmartGuide with Real Form Fields

## What the KiZ 1 Form Contains

The official KiZ 1 form has 7 sections plus a declaration/signature:

1. **Angaben zu meiner Person** — Name, Geburtsdatum, Geburtsname, Adresse, Geschlecht, Staatsangehörigkeit, Telefon, Familienstand
2. **Angaben zum Partner** — Name, Geburtsname, Staatsangehörigkeit, Geburtsdatum
3. **Kontoverbindung** — IBAN, BIC, Kontoinhaber
4. **Kinder im Haushalt** — List of children (Name + Geburtsdatum) for whom KiZ is requested
5. **Kinder nicht ständig im Haushalt** — Children from point 4 who don't permanently live in the household (name, reason, duration)
6. **Weitere Kinder unter 25** — Additional children under 25 not receiving Kindergeld, with presence details
7. **Weitere Personen im Haushalt** — Other household members (relatives, step-children etc.)
8. **Erklärung & Unterschrift** — Declaration, signature, optional second applicant signature

**Note:** The form also requires two mandatory attachments: *Anlage Antragsteller/Partner (KiZ 1-AnA)* for income/housing/assets, and *Anlage Kind (KiZ 1-AnK)* per child.

## Changes

### File: `src/lib/guide-data.ts`

Replace the current `kinderzuschlag` guide entry (lines ~157-201) with a fully populated version containing:

- **8 steps** (bs language) with full `cards` arrays matching the real form sections above
- Each step gets all 6 card types: `whatToWrite`, `whereToFind`, `format`, `commonMistakes`, `whenToLeaveEmpty`, `example`
- Updated `documents`, `commonMistakes`, `officialPdf` fields
- `officialPdf` set to `https://www.arbeitsagentur.de/datei/kiz1-antrag_ba036540.pdf`

### Step-by-step content (bs language):

| Step | Field | Key Content |
|------|-------|-------------|
| 1 | Lični podaci podnosioca | Prezime, ime, datum rođenja, djevojačko prezime, adresa, spol, državljanstvo, telefon, bračni status |
| 2 | Podaci o partneru/partnerici | Prezime, djevojačko prezime, ime, državljanstvo, datum rođenja |
| 3 | Bankovni podaci (Kontoverbindung) | IBAN, BIC, vlasnik računa |
| 4 | Djeca u domaćinstvu za koju se traži KiZ | Lista djece: ime + datum rođenja |
| 5 | Djeca koja ne žive stalno u domaćinstvu | Ime, razlog i trajanje odsustva |
| 6 | Ostala djeca do 25 godina | Djeca bez Kindergelda, prisutnost u domaćinstvu |
| 7 | Ostale osobe u domaćinstvu | Ime, datum rođenja, srodstvo |
| 8 | Izjava i potpis | Potpis, datum, drugi podnosilac |

### DE and EN steps

Will also be updated to 8 steps (field names only, no cards) to match the structure.

### Updated metadata

- `officialPdf`: `"https://www.arbeitsagentur.de/datei/kiz1-antrag_ba036540.pdf"`
- `documents` updated to include: Anlage Antragsteller/Partner (KiZ 1-AnA), Anlage Kind (KiZ 1-AnK), income proofs, rental contract, bank statements, Kindergeld-Bescheid
- `commonMistakes` updated with form-specific rejection reasons (missing Anlage, incomplete children list, wrong IBAN, missing partner data)

No other files need changes — the SmartGuide page template already renders cards dynamically.

