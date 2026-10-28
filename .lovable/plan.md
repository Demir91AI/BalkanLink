# Provjera dokumenata (Dokumenten-Check): audit i plan

Ovo je samo audit. Kod nije mijenjan. Dio A navodi samo ono što je potvrđeno čitanjem koda (`src/pages/DokumentenCheck.tsx`, `supabase/functions/document-check/index.ts`, `src/hooks/usePremiumAccess.ts`, locale fajlovi). Dio B su prijedlozi.

## A. Potvrđeni nalazi iz koda

### Tok korisnika (šta danas radi)
1. Stranica `/dokumenten-check` je iza prijave (AuthGate). Neprijavljeni vide samo zaglavlje.
2. Redoslijed: kartica članstva, napomena o privatnosti, upload (3 koraka + savjet za više stranica), kvačica za potvrdu, dugme "Provjeri", primjer analize (sklopljen), rezultati, pravna napomena.
3. Upload: do 10 datoteka, ukupno 25 MB, kamera (`capture=environment`). Slike se u pregledniku smanjuju na 1600 px i JPEG; PDF ide neizmijenjen.
4. Jedan poziv serveru → provjera prijave → rezervacija kvote → jedan model (`google/gemini-2.5-flash`, max 8000 tokena) → markdown sa 11 fiksnih bosanskih naslova → stranica ga dijeli u obojene kartice.
5. Kvota se rezerviše prije analize, a vraća ako analiza ne uspije. Prema komentaru u kodu: probni period ukupno 2, godišnje članstvo 5 mjesečno, legacy bez ograničenja. Stvarne vrijednosti u bazi u ovom auditu nisu provjerene.

### Greške i nedosljednosti
- **Jezik:** server ne prima jezik korisnika, a upute modelu traže bosanske naslove i "Sažetak na našem jeziku" uz 🇧🇦. Korisnici HR/SR/DE dobijaju analizu na bosanskom. Raspoznavanje sekcija vezano je za bosanske naslove bez kvačica.
- **Formati:** polje za upload nudi WEBP/HEIC/HEIF, ali provjera dozvoljava samo PDF/JPG/PNG. iPhone HEIC fotografija biva odbijena tek nakon odabira.
- **Ograničenje veličine:** limit je 25 MB, ali se šalje base64 (+33%) u JSON-u. Veliki PDF ili 10 slika mogu probiti limit zahtjeva prema serveru ili modelu, a to se korisniku prikaže samo kao opšta greška.
- **Kvota:** kad je kvota potrošena (`QUOTA_EXHAUSTED`, 429), stranica ne pokazuje posebnu poruku ni kada se kvota obnavlja. Prikazuje se tekst servera ili "server error". `ACCESS_REQUIRED` otvara paywall, ali uz tekst o "5 analiza mjesečno" koji ne objašnjava probni period.
- **Pristup:** stranica koristi stari `usePremiumAccess` (DEV_MODE/isAdmin/isPremium), a ne centralni `useEntitlement`. Korisnik u probnom periodu ili s novim članstvom na klijentu može dobiti paywall iako bi ga server pustio, ili obrnuto.
- **Mrtav kod:** `locked = false` sa cijelim blur/lock overlayem, `isPremium` po sekcijama, varijabla `isPremium = false` na serveru "radi logova", te polje `text` koje stranica nikad ne šalje.
- **Sažetak:** "tip dokumenta", "hitnost" i "iznos" izvlače se regexom i emojijima iz slobodnog teksta, pa su krhki. Rok je uvijek fiksno "Rok nije potvrđen" (namjerno, nema izmišljenih rokova).
- **Greške modela:** kodovi 429/402 vraćaju njemačke/bosanske poruke direktno sa servera, neprevedene za HR/SR/DE.
- **Natpisi:** SEO naslov glasi "AI Analiza Njemačkih Pisama" i hardkodiran je samo na bosanskom. To krši pravilo "bez AI/KI" i pravilo 4 jezika. Uputa modelu naziva ovo "Premium-Feature, plaćeni feature".
- **Zbunjujuće:** dvije gold kartice članstva (gornja + paywall) sa istim CTA, marquee od 18 primjera, grid sa 3 koraka sa tekstom od 10–11 px na mobitelu, primjer analize ispod dugmeta, 11 sekcija s dugim tekstom ("minimum 3–5 rečenica po sekciji").

### Sigurnost i GDPR
- Pozitivno: prijava je obavezna, server provjerava token (`getClaims`), kvota je atomska na serveru, dokument se ne sprema (nema upisa u bazu ni storage), u log ide samo `userId` i broj datoteka, bez sadržaja.
- Rizik: tekst na stranici kaže "mi ne čuvamo… odmah izbrišemo", ali ne spominje da se dokument šalje vanjskom pružaocu modela (Lovable AI gateway → Google). To je u suprotnosti s pravilom "bez skrivenog prenosa podataka" i traži reviziju teksta o privatnosti (pravni tekst, potrebno odobrenje).
- Kvačica traži "ne šaljem osjetljive podatke", ali korisnik realno šalje pismo s imenom i adresom. Nema alata za zacrnjivanje, nema provjere.
- Server ne provjerava MIME tipove ni veličinu po datoteci. Broj datoteka reže na 10, ali tiho, bez poruke.

### Veza s asistentom
- Chat asistent samo prepoznaje riječ "Dokumenten-Check" i pretvara je u link. Nema predaje rezultata asistentu (to je dobro za privatnost). Nema ni dugmeta "pitaj asistenta o ovom", niti "sljedeći korak" prema vodičima/FormCenteru.

### Troškovi
- Jedan poziv multimodalnog modela po provjeri, do 8000 tokena izlaza, do 10 slika ulaza. Trošak raste s brojem stranica, a nema keša ni ograničenja broja stranica PDF-a.

### Šta nije provjereno
- Stvarni rad na mobitelu/iPhone HEIC, prijavljeni tok sa stvarnim nalogom, kvalitet analize na pravim pismima, vrijednosti kvota u bazi, ponašanje velikih PDF-ova na gatewayu.

## B. Prijedlozi (prioritizirano)

### P0: ispravnost i povjerenje (malo, sigurno)
1. Slati jezik korisnika serveru i generisati analizu na BS/HR/SR/DE. Sekcije raspoznavati po stabilnim ID markerima, ne po bosanskim naslovima.
2. Uskladiti formate: ili prihvatiti HEIC/WEBP (pretvoriti u JPEG u pregledniku), ili ih ukloniti iz `accept`.
3. Prebaciti provjeru pristupa na `useEntitlement`. Posebne prevedene poruke za: nema pristupa, potrošena kvota (+ datum obnove), prevelika datoteka, model zauzet.
4. SEO naslov/opis prevesti u 4 jezika i ukloniti "AI".
5. Napomena o privatnosti: iskreno navesti da se dokument jednokratno šalje pružaocu analize i ne čuva se. Tekst prije objave pregleda Demir/pravnik.

### P1: jednostavniji tok za BalkanLink publiku
6. Tok u 3 jasna ekrana: **Slikaj/učitaj → Provjeri → Rezultat**. Jedna kartica članstva (samo kad treba), marquee i grid sa 3 koraka zamijeniti jednom rečenicom, primjer prebaciti iznad uploada.
7. Rezultat skratiti na 5 blokova: *Šta je ovo · Šta traže od tebe · Rok (onako kako piše u pismu + "provjeri original") · Novac · Šta sada uraditi*. Detalji i rizici u sklopivim sekcijama.
8. Struktuiran izlaz modela (JSON shema s poljima tip, pošiljalac, rok-kako-piše, iznos, radnje). Bez regex/emoji parsiranja, a rok se nikad ne računa niti izmišlja.
9. Kraj rezultata: "Sljedeći korak" linkovi na postojeće vodiče (Kindergeld, Grundsicherung…) po prepoznatom tipu, plus dugme "Pitaj asistenta" koje otvara chat bez automatskog prenosa dokumenta.

### P2: robusnost i trošak
10. Server: validacija MIME/veličine po datoteci, limit stranica PDF-a, jasna poruka umjesto tihog rezanja.
11. Manji `max_tokens` i kraći prompt za 5-blokni format; razmotriti jeftiniji model za jednu sliku.
12. Ukloniti mrtav kod (lock overlay, `isPremium` po sekcijama, neiskorišteni `text`).
13. Opcionalno "Print/Kopiraj rezultat" (samo lokalno, bez spremanja).

### Van opsega bez posebnog odobrenja
- Promjene cijena, kvota, pravnih stranica, baze/RLS, objave i deploya serverske funkcije.

## Tehnički detalji
- Klijent: `src/pages/DokumentenCheck.tsx` (763 linije, `parseAnalysisSections`, `extractSummaryFromSections`, `fileToCompressedBase64`).
- Server: `supabase/functions/document-check/index.ts` (332 linije; `reserveUsage(..., "document_analysis")`, gateway poziv, `commitUsage`/`releaseUsage` u `finally`).
- Tekstovi: `documentCheck.*` (126 ključeva, paritet BS/HR/SR/DE) + `plus.doc*`.
- Testovi za implementaciju: jezik izlaza po localeu, prihvaćeni formati, mapiranje grešaka kvote, odluka o pristupu iz entitlementa, nema izmišljenog roka.
- Serverske promjene (P0.1, P2.10–11) zahtijevaju deploy funkcije na zajednički backend, pa traže tvoje izričito odobrenje.
