# Elterngeld — kontrolni korak 26.11.2026

**Nije završeno. Kindergeld nije započet.** Odobrenje tehničkih podfaza ostaje važeće; ovaj korak se zaustavlja zbog trajanja izvršavanja, ne zbog traženja novog odobrenja.

## Završeno i provjereno

- Ponovo preuzet HH glavni original: SHA256 `e3735fd8516188073377c7b931dfc096e26c76ffdf385db5c68cb0c11ab0feff`, 23 stranice/531 polje, bez enkripcije/XFA. Nije proširena lista prihvaćenih glavnih izdanja.
- Odjeljak13: 27 nativnih polja izvan zabranjenih potpisa/mjesta/datuma mapirano kroz sintetičke kombinacije; bankovne opcije po stvarnim koordinatama, dobrovoljni kontakti, zakonska zastupanja s potvrdom dokaza. Strani računi ostaju blokirani do odgovarajuće validacije. Višelinijski tekst ostaje odbijen jer engine trenutno provjerava jednolinijsku širinu.
- Četiri autentična interna upisa odjeljaka1–13: samohrani roditelj, zajednički račun, tuđi račun i majka s GKV/employer naknadama. Engine ponovno čita svih531 polja; potpisi/mjesta/datumi potpisa prazni. Ovo nisu potpuni korisnički zahtjevi s prilozima.
- Mutterschaftsleistungen: potvrđena §4(4) i §3(1)1–3 BEEG pravila; čak dio životnog mjeseca zahtijeva Basis u korisničkom planu. Identitet majke je eksplicitan, ne zaključuje se iz pola; plan se nikad automatski mijenja. Rođenja29–31, majka koja ne podnosi i strani slučajevi ostaju blokirani. Primjeri 10.09.–09.11.→mjeseci1,2; do10.11.→1,2,3 testirani.
- Višestruko rođenje ili potvrđena invalidnost djeteta dopušta istovremeni Basis prema §4(6), bez povećavanja ukupnog budžeta. Invalidnost starijeg djeteta sama ne dokazuje Geschwisterbonus; taj slučaj ostaje blokiran.
- Ispravljena ranija semantička greška: odjeljak4.a broji **svu drugu djecu do18 u domaćinstvu**; odjeljak4.b je zasebna lista do3 relevantne djece. Broj se više ne izvodi iz liste; nepoznate enum vrijednosti odbijaju se prije mapiranja.
- Prilog prihoda: sva35 polja, eksplicitne wage/profit/loss grane, do2 reda po vrsti, minus gubitaka, pasivni prihodi s0 sati, dobrovoljni zahtjev stvarnih troškova, tax-free izbori, Tagespflege i dokazi. Tri autentična izdanja pojedinačno provjerena; pogrešan Land hash odbijen. Glavni generator ostaje blokiran dok nema potpune orkestracije priloga.
- Wohnsitz im Ausland: sva23 polja HH/RP, ograničen/neograničen boravak, uslovno pitanje o drugom roditelju, zaseban njemački poslodavac. Četiri autentična upisa i pogrešan hash testirani. SH služi April2025 izdanje: kompatibilnost s August2025 nije pretpostavljena.
- Ponovo preuzeta Staatsangehörigkeit HH/SH/RP: prethodni puni hash potvrđen; prethodni autentični testovi izvršeni.
- Model službenog fallbacka sadrži svih16 Länder iz upravo provjerenog federalnog imenika; testiran eksplicitan izbor i nepodržano izdanje. **Nije povezan s UI; pojedinačne Land stranice nisu ponovo nezavisno provjerene.** HTTP linkovi BE/MV sigurno vraćaju HTTPS federalni imenik, bez izmišljanja HTTPS zamjene.

## Tačni izvori i prilog-izdanja

Samo privremeni `/tmp/elterngeld-final` downloads, bez korisničkih podataka i bez bundlinga. Potpuni URL-ovi, hash, native inventory i datum evidentirani u modulima `elterngeld-anlage-income.ts`, `.fields.ts`, `elterngeld-anlage-residence.ts`, `elterngeld-jurisdiction.ts`. Prava ostaju unresolved.

| Prilog/Land | SHA256 | Stranice/polja | ModDate/izdanje |
|---|---|---|---|
| Income HH | `cd43a9c04ec4d07b907368ce0806131b9f19176510eafc580d43aa5847f44712` |3/35|09.09.2025; August2025|
| Income SH | `cd07a894e1755b7452365adc60ce7bbe3c38aacbbaaa517873abd06280179aa2` |3/35|24.09.2025; August2025|
| Income RP | `993b443842d02d765f60fd8ac6ce8a8653f3b99ba71d2c9cfa3e6dfce15f1706` |3/35|27.02.2026; August2025|
| Residence HH | `86b3868cb12b2aea1c90136f4cee50cf8adb99aee73522ae6e164b692c7518c4` |2/23|09.09.2025; August2025|
| Residence RP | `2d152dfc16359c58ee134221b9cc74c03b5386bc194c2db83ddca2642e2be59a` |2/23|05.08.2025; August2025|
| Residence SH **nije prihvaćen** | `e8d6bfd2d5526b0d7cf8d4da1369132d9c163ba83b37b3067de8169327bf97bd` |2/23|21.02.2025; April2025|

Svi pregledani prilozi bez enkripcije/XFA. Income21 text/14checkbox; Residence17text/6checkbox. HH druga wage linija ima pogrešan proof tekst o Gewinneinkünfte; SH/RP ga ispravljaju. Isti nazivi polja nisu dokaz istih bajtova niti istog izdanja.

Primarni izvori pravila:
- https://www.gesetze-im-internet.de/beeg/__4.html
- https://www.gesetze-im-internet.de/beeg/__3.html
- https://familienportal.de/familienportal/rechner-antraege/antragsformulare-126232
- https://familienportal.de/familienportal/familienleistungen/elterngeld/faq/wie-kann-ich-elterngeld-beantragen--124762
- SH Residence: https://www.schleswig-holstein.de/DE/landesregierung/ministerien-behoerden/LASG/Aufgaben/KinderUndEltern/Download/2_2c_WohnsitzImAusland.pdf?__blob=publicationFile&v=6

## Provjere i granice

- Posljednji FormularPilot paket: **255 prošlo,5 preskočeno,0 neuspješnih**,18 datoteka. Autentične EG/STA/income/residence varijable postavljene. Preostalih5 nisu dokaz prolaza (drugi autentični originali nisu bili dostupni).
- Cijeli izolovani paket: **1931 prošlo,11 preskočeno,0 neuspješnih**,80 datoteka; izvršen prije posljednja2 posebna planner testa. Nakon njih ponovo je izvršen gore navedeni FormularPilot paket. Ne predstavljati1933 kao izvršen full-suite rezultat.
- Vizuelno pregledane renderirane završne stranice21/23, Income3 i Residence2: tekst/checkboxes u svojim poljima, potpisi prazni. Nije pregled svih stranica/svih slučajeva.
- Automatski build/typecheck posljednji `build OK`. Ručna build/typecheck naredba nije pokretana.
- Dvije testne greške tokom rada ispravljene: pogrešno ručno prebrojena section13 polja (stvarno27); sintetički prilog dijelio isti objekat datuma među redovima, sada zasebne kopije. Privremeni `Object.hasOwn` TS-target problem zamijenjen kompatibilnim provjerenim pozivom.
- Nema korisničkog UI toka niti mobilnog/desktop četverojezičnog E2E u ovom koraku. Nema tvrdnje da je Elterngeld završen. UI/stringovi postojeće platforme nisu mijenjani.
- `EG_MAPPING_COMPLETE=false`, `EG_PRODUCTION_ENABLED=false`, javna priprema uvijek blokira; moduli i dalje nisu povezani s live stranicama. Nema deploy/publish/backend/billing/users/storage promjena, novih paketa, plaćenih vanjskih servisa ili agenta.

## Sljedeći korak (već odobren)

1. Završiti orkestraciju glavnog+državljanstvo+prihodi+stanovanje s međudokumentnim provjerama, bez tihog izostavljanja priloga; potvrditi BB priloge i SH residence kompatibilnost ili službeni fallback.
2. Riješiti day29–31 maternity mjesece, prijevremene/adoptivne/prethodne/odvojene planove i promijenjeni period+under35; nepotvrđeni slučajevi ostaju eksplicitno blokirani/fallback, bez pravnih odluka.
3. Provjeriti individualnu nadležnost/izdanja/upute slanja16 Länder, uključujući privatnost/listu dokaza i potpise; ne prebacivati kompatibilnost iz zajedničkih bajtova.
4. Četverojezični memory-only development UI i autentični izolovani mobile/desktop E2E svih podržanih tokova; konačna objedinjena531-field coverage i regresije. Tek nakon provjerenog Elterngeld završetka početi Kindergeld.

Krediti: alat je pri kraju koraka pokazao **659,70 preostalih**; to nije izolovani konačni trošak ove poruke. Pravna provjera/prava i buduća objava ostaju zasebno neodobreni.