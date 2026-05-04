# Plan — Elterngeld po Bundesländerima (BalkanLink)

**Cilj:** korisnik bira svoj Bundesland i dobija (a) auto-popunjavanje službenog PDF-a ako je podržano, ili (b) profesionalnu info-karticu sa službenom adresom + linkom na zvanični PDF + Smart Guide u 4 jezika.

**Princip:** nema "uskoro", nema poluinformacija. Svaki Bundesland mora imati tačno: naziv službe, adresu, telefon, službeni link, status.

## Status implementacije

| # | Bundesland | Služba | Auto-fill | Status |
|---|---|---|---|---|
| 1 | Baden-Württemberg | L-Bank | ❌ | Info-kartica + službeni link |
| 2 | **Bayern** | ZBFS | ✅ **DONE** | 1:1 PDF (verzija 05/2025), 7 Außenstellen |
| 3 | Berlin | Bezirksamt — Jugendamt (12 Bezirke) | ❌ | Info-kartica + službeni link |
| 4 | Brandenburg | LASV — Landesamt für Soziales und Versorgung | ❌ | Info-kartica + službeni link |
| 5 | Bremen | Amt für Soziale Dienste | ❌ | Info-kartica + službeni link |
| 6 | Hamburg | Behörde für Arbeit, Gesundheit, Soziales, Familie und Integration (BAGSFI) | ❌ | Info-kartica + službeni link |
| 7 | Hessen | Hessisches Amt für Versorgung und Soziales (HAVS) | ❌ | Info-kartica + službeni link |
| 8 | Mecklenburg-Vorpommern | LAGuS — Landesamt für Gesundheit und Soziales | ❌ | Info-kartica + službeni link |
| 9 | Niedersachsen | Landesamt für Soziales, Jugend und Familie | ❌ | Info-kartica + službeni link |
| 10 | Nordrhein-Westfalen | ELFE online portal + Kreis Elterngeldkassen | ❌ | Info-kartica + ELFE link (nema PDF) |
| 11 | Rheinland-Pfalz | Landesamt für Soziales, Jugend und Versorgung | ❌ | Info-kartica + službeni link |
| 12 | Saarland | Landesamt für Soziales | ❌ | Info-kartica + službeni link |
| 13 | Sachsen | KSV Sachsen — Kommunaler Sozialverband | ❌ | Info-kartica + službeni link |
| 14 | Sachsen-Anhalt | Landesverwaltungsamt | ❌ | Info-kartica + službeni link |
| 15 | Schleswig-Holstein | Landesamt für soziale Dienste | ❌ | Info-kartica + službeni link |
| 16 | Thüringen | Thüringer Landesverwaltungsamt | ❌ | Info-kartica + službeni link |

## Prioritet za buduće prompte (po veličini BHS dijaspore)

1. **Berlin** — najveća dijaspora; jedinstven Berlin-PDF (svih 12 Bezirka koristi isti)
2. **Baden-Württemberg** — L-Bank, jedan PDF za cijelu pokrajinu
3. **Hessen** — HAVS, jedan PDF
4. **Hamburg** — BAGSFI, jedan PDF
5. **NRW** — specijalan slučaj (ELFE online portal, ne PDF — možda preusmjerenje + Smart Guide)
6. Ostale po redu

## Tehnička procjena po Bundeslandu

Svaki novi BL zahtijeva:
1. Preuzimanje službenog PDF-a sa zvanične stranice
2. Inspekciju AcroForm polja (`pdftk dump_data_fields` ili pdf-lib `getFields()`)
3. Manualno mapiranje polja → `ElterngeldFormData` (~150-250 polja po PDF-u)
4. Cron za detekciju verzije (već postoji za Bayern, treba proširiti)
5. Test
6. Prevod section labela u 4 jezika
7. Konfiguracija Versand picker-a (lokalne službe)

**Prosječno vrijeme po BL:** 1-2 prompta s detaljnim radom. Ne forsirati paralelno.

## Faza 1 (DONE — ovaj prompt)

- [x] Registry svih 16 Bundesländer (`src/lib/elterngeld-bundeslaender.ts`)
- [x] Bundesland selector na vrhu Elterngeld forme
- [x] Bayern → ostaje full auto-fill (1:1 ZBFS PDF)
- [x] Ostale → profesionalna info-kartica (služba, adresa, telefon, link)
- [x] Profesionalniji tekst "1:1 originalni formular" → konkretno za Bayern
- [x] i18n u 4 jezika (bs/hr/sr/de)

## Faza 2+ (sljedeći prompti — jedan po jedan)

Svaki sljedeći prompt = jedan Bundesland, full auto-fill. Pristup:
1. Skinem zvanični PDF
2. Mapiram polja
3. Dodam u `bayernFieldFills` ekvivalent za taj BL
4. Test, dokumentacija
5. Update plana
