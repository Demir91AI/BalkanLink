# Porodica i djeca — Elterngeld kontrolne tačke 3–4

Datum provjere: 25.11.2026. Ovo nije završetak svih šest usluga niti gotov obrazac.

## Original i izvori

Ponovo preuzeti originali samo u privremeni `/tmp`, bez ličnih podataka:

- BB: https://www.brandenburg.de/media_fast/4/1_Einheitlicher_Elterngeldantrag_2025.pdf
- HH: https://fhh1.hamburg.de/Dibis/form/pdf/Antrag_auf_Elterngeld_fuer_Geburten_ab_dem_01.04.2025_Stand_08_25.pdf
- RP: https://mffki.rlp.de/fileadmin/07/Dokumente/Themen/Familie/Gute_Zukunft_fuer_alle_Kinder_und_Eltern/Elterngeld/2025_08_1_Einheitlicher_Elterngeldantrag.pdf
- SH: https://www.schleswig-holstein.de/DE/landesregierung/ministerien-behoerden/LASG/Aufgaben/KinderUndEltern/Download/1_EinheitlicherElterngeldantrag.pdf?__blob=publicationFile&v=3

Svaki preuzeti original: SHA-256 `e3735fd8516188073377c7b931dfc096e26c76ffdf385db5c68cb0c11ab0feff`, 3.345.804 bajta, 23 stranice, 531 polje, bez enkripcije/XFA. Izdanje August 2025, rođenja od 01.04.2025. Izbor Land ostaje eksplicitan; TH nije ponovo potvrđen i ostaje blokiran. Nisu dodani drugi Länder.

## Implementirano u ovoj kontrolnoj tački

- Odjeljci 5–9: minimalni iznos, pitanja o obračunskom periodu, dohodak prije rođenja, zamjenske naknade i Mutterschaftsleistungen. Osam sintetičkih kombinacija obuhvata svih 131 nativnih polja ovih odjeljaka; pravi original prolazi punu provjeru ponovnim čitanjem.
- Odjeljak 9 mora biti odgovoren i kod minimalnog iznosa, za biološku majku bez obzira ko podnosi zahtjev. Više naknada može koegzistirati; saglasnost za Krankenkasse preuzimanje podataka je zaseban, dobrovoljan odgovor, nikad automatski izbor.
- Odjeljci 10–12: transkripcija eksplicitno izabranih 32 životna mjeseca, Basis/Plus/bonus; obična ograničenja iz teksta stranice 17; do dvije Elternzeit linije; pitanja o prihodima i naknadama tokom primanja; plaćeni odmor.
- Minimum grana preskače 12.a–c, ali ne 12.d. Plaćeni odmor ima redoslijed NEIN/JA; njegovi detalji imaju pogrešno imenovan nativni prefiks 12c. Stranica 13 ima nativne `2E1..3` za lijevu kolonu, `2E4..6` za desnu — mapirano po stvarnom položaju.
- Provjerena četiri autentična plana: Basis, Plus, bonus samohranog roditelja i detaljan slučaj s odmorom/naknadama. Potpisi i njihovi datumi/mjesta ostaju prazni.

## Izričito nezavršeno / blokirano

Ovi blokovi su granice trenutne implementacije, ne tvrdnje da osoba nema pravo:

1. Automatska raspodjela mjeseci s Mutterschaftsleistungen: još nije sigurno mapirana; ne prepisivati plan bez odgovarajućeg obračuna životnih mjeseci.
2. Posebni slučajevi prijevremenog rođenja, više djece, invaliditeta, usvojenja te prethodnog/odvojenog zahtjeva: provjeriti posebne službene uslove prije proširenja.
3. Einkünfte neben dem Elterngeld i strani/međuorganizacijski prihodi: zahtijevaju dodatne provjerene priloge. Polja glavnog obrasca postoje, ali validirani izlaz se blokira dok prilog nije kompletan.
4. Povratna grana promijenjenog perioda + zahtjev ispod 35 EUR: ostaje nerazriješena, ne računati niti pogađati.
5. Odjeljak 13, kompletna integracija svih priloga i četverojezični razvojni ekran još nisu implementirani. Zato nema završnog korisničkog PDF-a niti browser E2E tvrdnje.
6. Proširenje na 16 Länder i ostalih pet usluga nije rađeno u ovoj kontrolnoj tački. Prethodni inventari ostaju dokaz, ne dokaz kompletne implementacije.
7. Prava korištenja i pravna provjera ostaju otvoreni.

## Provjere

- Odjeljci 5–9: 31 fokusirani test uspješan.
- Plan/odjeljci 10–12: 22 fokusirana testa uspješna, uključujući četiri prava PDF upisa i blokadu obaveznog nepotpunog priloga.
- Cijeli izolirani paket: **1.854 prošla, 11 preskočeno, 0 neuspješnih**, 76 datoteka. Preskočeni testovi nisu uračunati kao prolaz.
- Automatska provjera projekta: posljednji zapis `build OK`; zasebna ručna naredba za build/typecheck nije ponavljana.
- Vizuelno pregledane renderirane stranice 13, 16, 18 i 21: položaj oznaka i upisanih datuma/mjeseci potvrđen u sintetičkim slučajevima. To nije pregled svih 23 stranice niti mobilnog interfejsa.
- Javna priprema i dalje vraća `MAPPING_INCOMPLETE`; proizvodnja hard-disabled, modul nije povezan sa stranicama. Nema novih UI stringova, skladištenja odgovora, PDF bundlinga, promjena baze/korisnika/naplate ili objave.

## Sljedeća kontrolna tačka

Prvo završiti semantiku mjeseci s Mutterschaftsleistungen i relevantne priloge, zatim odjeljak 13 i objedinjenu provjeru pokrivenosti svih primjenjivih nativnih polja. Tek tada četverojezični razvojni ekran i stvarni lokalni tok na telefonu/računaru; ne nuditi djelimičan zahtjev. Vlasničko odobrenje za ove tehničke podfaze već postoji i nije ponovo potrebno.

## Krediti

Alat za kredite u ovoj kontrolnoj tački prijavio je **671,60 preostalih** i **83,017781382 potrošenih na ovom projektu tokom cijelog 25.11.2026.** To nije izolovana cijena ovog koraka; uključuje raniji današnji rad, a konačan obračun tekućeg odgovora još nije dostupan. Nisu korišteni plaćeni vanjski SDK/servisi.