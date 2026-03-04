

# Plan: Update Elterngeld formName to Federal Level (Bundesebene)

## Problem
The current `formName` text references Bavaria-specific resources (`ifsg.bayern.de`) for finding the responsible office and online submission. This should be updated to use federal-level resources from `familienportal.de`.

## Changes

### File: `src/lib/guide-data.ts` (lines 367-371)

Replace the `formName` object for `elterngeld` in all 3 languages. Key corrections based on the official familienportal.de FAQ:

**What changes:**
- **Behördenfinder**: Replace `ifsg.bayern.de` with the federal "Beratung vor Ort" search at `familienportal.de/dynamic/action/familienportal/125008/suche`
- **Formulare finden**: Link to federal forms page at `familienportal.de/familienportal/rechner-antraege/antragsformulare-126232`
- **Online-Antrag**: Replace `ifsg.bayern.de` with `ElterngeldDigital` service available in all states, linked at `familienportal.de/familienportal/rechner-antraege/elterngelddigital-127692`
- **Keep**: All other info (postal submission, registration benefits, 3-month retroactive rule, one application per parent, co-signing requirement) remains

**Updated text structure (bs example):**
> Zahtjev za roditeljski dodatak (zavisi od savezne države) – Nadležnu Elterngeldstelle pronaći putem pretrage „Beratung vor Ort" na familienportal.de. Formulare savezne države preuzeti na familienportal.de (Antragsformulare). Formulari dostupni i na: Elterngeldstelle, općinskim upravama, zdravstvenim kasama, bolnicama sa porodilištem. VAŽNO: Zahtjev moguć tek NAKON porođaja, retroaktivno max. 3 mjeseca. Jedan zahtjev po roditelju po djetetu (i kod blizanaca). Drugi roditelj mora supotpisati. Podnošenje: poštom na adresu nadležne službe ILI digitalno putem servisa ElterngeldDigital (dostupan u svim saveznim državama). Online sa registracijom: brža obrada, manje pitanja, pametno vođenje, checklista, upload dokumenata, popunjavanje 6 mj. prije porođaja, čuvanje/nastavak, print-servis, uvid u status i isplate, online prijava promjena, elektronski potpis. Online bez registracije: brža obrada, pametno vođenje, checklista, print-servis, pomoćne funkcije.

Equivalent updates for DE and EN languages.

No other files affected.

