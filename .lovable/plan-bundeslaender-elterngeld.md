# Plan — Elterngeld po Bundesländerima (BalkanLink)

**Cilj:** korisnik bira svoj Bundesland i dobija (a) auto-popunjavanje službenog PDF-a ako je podržano, ili (b) profesionalan Smart Guide sa BHS objašnjenjima i njemačkim terminima + linkovi na sve 3 puta predaje (online portal, PDF, lično/poštom).

**Ključni uvid:** Elterngeld je SAVEZNA naknada (BEEG — Bundeselterngeld- und Elternzeitgesetz). Sve pokrajinske formulare imaju IDENTIČNU strukturu sekcija (1. Kind, 2. Eltern, 3. Familienverhältnisse, 4. Bezugszeitraum, 5. Einkommen vor, 6. Einkommen während, 7. weitere Leistungen, 8. Bankverbindung, 9. Anlagen). Razlikuje se SAMO nadležna služba i način predaje.

**Zato:** umjesto manualnog 1:1 PDF mapiranja za svih 16 pokrajina (svaka ~250 polja), pravimo **univerzalni Smart Guide** koji pokriva sve sekcije BHS objašnjenjima + njemačkim terminima — radi za SVE pokrajine osim Bayerna (gdje već imamo full 1:1 auto-fill).

## Status implementacije

| # | Bundesland | Služba | Smart Guide | Auto-fill | Digitalni portal |
|---|---|---|---|---|---|
| 1 | Baden-Württemberg | L-Bank | ✅ | ❌ | ElterngeldDigital |
| 2 | **Bayern** | ZBFS | n/a | ✅ **Full 1:1** | ElterngeldDigital |
| 3 | Berlin | Bezirksamt (12) | ✅ | ❌ | ElterngeldDigital |
| 4 | Brandenburg | LASV | ✅ | ❌ | ElterngeldDigital |
| 5 | Bremen | Amt für Soziale Dienste | ✅ | ❌ | ElterngeldDigital |
| 6 | Hamburg | BAGSFI | ✅ | ❌ | ElterngeldDigital |
| 7 | Hessen | HAVS | ✅ | ❌ | ElterngeldDigital |
| 8 | Mecklenburg-V. | LAGuS | ✅ | ❌ | ElterngeldDigital |
| 9 | Niedersachsen | Landesamt SJF | ✅ | ❌ | ElterngeldDigital |
| 10 | Nordrhein-Westfalen | Kreis + ELFE | ✅ | ❌ | **ELFE NRW** (vlastiti) |
| 11 | Rheinland-Pfalz | Landesamt SJV | ✅ | ❌ | ElterngeldDigital |
| 12 | Saarland | Landesamt Soziales | ✅ | ❌ | ElterngeldDigital |
| 13 | Sachsen | KSV | ✅ | ❌ | **Amt24 Sachsen** (vlastiti) |
| 14 | Sachsen-Anhalt | LVwA | ✅ | ❌ | ElterngeldDigital |
| 15 | Schleswig-H. | LSD | ✅ | ❌ | ElterngeldDigital |
| 16 | Thüringen | TLVwA | ✅ | ❌ | ElterngeldDigital |

## Što Smart Guide pruža

Za svaku od 10 BEEG sekcija:
- **BHS naziv** + **njemački službeni naziv** u zagradi
- **Opis sekcije** — što tačno tu pripada, koje su zamke
- **Tipična polja** — popis polja koja se traže (npr. Steuer-ID, IBAN, Lebensmonate)
- **Praktični savjet** — npr. promjena Steuerklasse 7 mj prije rođenja, granica 32h za partnere

## 3 puta predaje (univerzalno)

1. **Online** — savezni portal `elterngeld-digital.de` (13 pokrajina) ili pokrajinski (ELFE NRW, Amt24 Sachsen)
2. **PDF** — link na zvanični formular pokrajine (gdje postoji jedinstveni)
3. **Lično/poštom** — adresa nadležne službe sa telefonom

## Faza 1+2 (DONE — ovaj prompt)

- [x] Registry svih 16 Bundesländer + digitalni portali
- [x] Bundesland selector
- [x] Bayern → ostaje full auto-fill (1:1 ZBFS PDF)
- [x] Ostale 15 → univerzalni Smart Guide sa 10 BEEG sekcija u 4 jezika (bs/hr/sr/de)
- [x] Posebnosti označene (NRW koristi ELFE, Sachsen koristi Amt24)
- [x] Hero sa 3 puta predaje za svaku pokrajinu

## Buduća proširenja (opciono, nije hitno)

- Dodati 1:1 auto-fill za Berlin (jedan PDF za svih 12 Bezirka)
- L-Bank BW PDF auto-fill
- Hamburg BAGSFI PDF auto-fill
- Cron za detekciju verzija PDF-ova ostalih pokrajina (već postoji za Bayern)
