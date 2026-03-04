

# Plan: Add Online Application Info to Elterngeld Guide

## Change

Update the `formName` field for the `elterngeld` entry in `src/lib/guide-data.ts` (line 367) to append information about the two online application options (with and without registration) and the postal submission alternative.

### Content to add (bs language):

After the existing Dienststelle finder text, add:

**Način podnošenja:** Zahtjev se može poslati poštom na adresu nadležne službe ILI popuniti online na elterngeld-digital.de / ifsg.bayern.de.

**Online sa registracijom** — brža obrada, manje dodatnih pitanja, pametno vođenje kroz formular, individualna checklista dokumenata, upload dokumenata, mogućnost popunjavanja 6 mjeseci prije porođaja, funkcija čuvanja i nastavka kasnije, print-servis (nije potreban vlastiti printer), uvid u status obrade i informacije o isplatama, online prijava promjena (adresa, ime, bankovni podaci, Steuer-ID), elektronski potpis.

**Online bez registracije** — brža obrada, pametno vođenje, individualna checklista, print-servis, pomoćne funkcije.

Similarly for DE and EN languages with equivalent content.

### File: `src/lib/guide-data.ts` — line 367

Only the `formName` property changes. No other files affected.

