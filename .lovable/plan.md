## Šta je problem

1. **Stripe sync greška na profilu** — `check-subscription` edge funkcija vraća HTTP 500. Provjerio sam logove i kod: greška je u `supabaseClient.auth.getClaims(token)` (vjerovatno JWKS verifikacija puca u edge runtime-u). **Bitno**: Premium status već radi preko `stripe-webhook` koji direktno upisuje u `profiles` tabelu — zato vidiš "Premium aktivan" i transakciju u historiji. Greška u UI je kozmetička i nepotrebno alarmira.

2. **GDPR sekcija (`/moji-podaci`) je previše upadljiva** — dvije velike kartice sa crvenim okvirima i ikonama dominiraju stranicom. Funkcija je obavezna po GDPR-u (čl. 15 export, čl. 17 brisanje) ali ne mora biti glavna atrakcija profila.

3. **JSON export kao CTA dugme** — korisnik se s pravom pita: zašto bi ja preuzimao vlastite podatke. To je legalna formalnost, ne feature.

## Šta ću uraditi

### 1. Popravak `check-subscription` 500 greške (`supabase/functions/check-subscription/index.ts`)
- Zamijeniti `auth.getClaims(token)` sa `auth.getUser(token)` — getUser je stabilan i ne zavisi od JWKS endpoint-a koji ponekad puca.
- Dodati strukturisano `console.error` logiranje kako bi se buduće greške vidjele u edge logovima (sad je prazno jer catch samo vraća response).
- Garantovati da se profile ne mijenja u "free" ako Stripe API zakaže (trenutno: ako `customers.list` baci, niko ne update-uje, ali ako prođe sa 0 customera → odmah stavi free što može pogrešno degradirati Premium dok Stripe propagira).

### 2. Smanjiti vizuelni teret greške na profilu (`src/pages/Profil.tsx`)
- Sakriti crvenu "Sinhronizacija sa Stripe-om nije uspjela" alert kutiju **ako profile.is_premium === true** u bazi (jer onda znamo iz webhook-a da je premium aktivan, sync greška je nebitna).
- Inače prikazati kao tihi sivi tekst "Status se osvježava…" umjesto crvenog upozorenja.

### 3. Suptilizacija GDPR pristupa
**Cilj**: brisanje računa i export ostaju funkcionalni, ali nisu vidljivi kao glavni element.

- **Maknuti veliko dugme "Moji podaci (GDPR)" sa profila** (trenutno linija 467-472 u Profil.tsx).
- **Dodati novu disclosure sekciju "Postavke računa"** na dno profila:
  - Ispod glavnih akcija (Nadogradi/Historija/Odjava) jedan diskretan accordion ili `<details>` elemenat sa tekstom *"Postavke računa i privatnost"*.
  - Otvaranjem se prikazuju dva tihana text-link-a (ne dugmad sa ikonama):
    - *"Preuzmi svoje podatke (GDPR čl. 15)"* → trigger export funkcije direktno (bez navigacije na zasebnu stranicu).
    - *"Trajno obriši račun"* → otvara `AlertDialog` sa istom OBRIŠI/email konfirmacijom.
- **Restrukturirati `/moji-podaci`**: stranica ostaje (za direktan link iz Datenschutz dokumenta i SEO), ali kompaktno — jedan small footer-style layout, bez velikih kartica i crvenih boxova. Zadržava cijelu funkcionalnost (export + brisanje sa konfirmacijama) jer je legalno potrebno.

### 4. AlertDialog za brisanje (umjesto inline forme)
Brisanje računa ide kroz shadcn `AlertDialog` koji se otvara iz disclosure linka — sa istom validacijom (email match + tačno "OBRIŠI"), istom backend `delete-account` funkcijom (već je hardened). Nema crvenih okvira na profilu — samo unutar dialoga gdje je primjereno.

## Šta NE diram
- `delete-account` edge funkciju (već radi sa konfirmacijom + Stripe cancel).
- `export-user-data` edge funkciju (ostaje kako jest).
- Webhook + premium logiku (rade ispravno).
- Test fajl `MojiPodaci.test.tsx` ažuriraću samo ako struktura komponente znatno promijeni selektore.

## Fajlovi koje ću mijenjati
- `supabase/functions/check-subscription/index.ts` — getUser umjesto getClaims, bolji error logging
- `src/pages/Profil.tsx` — sakriti sync error ako je premium aktivan, dodati disclosure "Postavke računa", maknuti veliki GDPR link
- `src/pages/MojiPodaci.tsx` — kompaktan layout, bez velikih kartica
- `src/pages/MojiPodaci.test.tsx` — ažurirati selektore ako trebaju (zadržati gating logiku)

Pritisni **Approve** da implementiram.