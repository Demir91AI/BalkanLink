## Scope
Edit only `src/pages/Pricing.tsx` (the page that contains the three cards iz screenshota — `Paketi.tsx` ne sadrži ove sekcije).

Stripe je već povezan i `STRIPE_PRICE_IDS` + `initiateCheckout(...)` funkcija već rade (već se koriste za Premium, DeutschTrainer i Featured Firma). Samo trebamo dodati identičnu logiku na sva tri spomenuta proizvoda.

---

## 1. Istakni oglas (Nudim / Tražim)

Trenutno: čisto informativna kartica, bez dugmeta.

Promjena — dodati po jedno **„Kupi → "** dugme uz svaku cijenu:

- **7 dana — 1,99€** → `initiateCheckout(STRIPE_PRICE_IDS.PRO_AD_7DAY, user.id, "payment")`
- **30 dana — 4,99€** → `initiateCheckout(STRIPE_PRICE_IDS.PRO_AD_30DAY, user.id, "payment")`
- **Premium oglas — Gratis** → ostaje bez dugmeta (besplatno za premium korisnike)

Ako user nije ulogovan → `navigate("/login")` (već postoji `handleCheckout` helper koji to radi).

Stil dugmeta: `variant="outline"`, mali (`h-8`, `text-xs`), zlatni hover, isti pattern kao kod DeutschTrainer „Kupi →" dugmadi da ostane vizuelno konzistentno (UI preservation rule).

---

## 2. Dokumenten-Check

Trenutno: prikazuje cijene bez dugmeta.

Promjena:
- **Jednokratno — 2,99€** → dodati **„Kupi →"** dugme → `initiateCheckout(STRIPE_PRICE_IDS.DOC_CHECK, user.id, "payment")`
- **Premium 1×/dan gratis** → ostaje bez dugmeta

Isti outline stil kao gore.

---

## 3. Reklamiraj svoju firmu — Featured

Već ima dugme „Zatraži Featured →" koje vodi na Stripe (`FEATURED_FIRMA`, mode `"subscription"`). Provjerio sam — radi ispravno.

Promjene:
- **Promijeniti label dugmeta** sa „Zatraži Featured →" u **„Kupi Featured →"** (eksplicitnije, kao što je traženo).
- **Ukloniti red:** `🎉 Promo cijena — prvih 6 mjeseci` (linije 233–235).
- **Ukloniti red ispod cijene:** „Istaknuta kartica + flow banner" ostaje, ali tekst „prvih 6 mjeseci" se nigdje više ne spominje.
- Zadržati cijenu **14,99€/mjes.** kao trajnu (ne promo).

---

## 4. Verifikacija Stripe protoka (odmah nakon edita)

Nakon implementacije, koristiću `supabase--curl_edge_functions` da pozovem `create-checkout` edge funkciju sa svakim od 4 nova price ID-a (PRO_AD_7DAY, PRO_AD_30DAY, DOC_CHECK, FEATURED_FIRMA) i potvrdim da Stripe vraća validan checkout URL — bez stvarnog plaćanja, samo provjera da price ID postoji u Stripe-u i da se sesija uspješno kreira.

Ako neki price ID ne postoji u live Stripe katalogu → javit ću korisniku tačno koji nedostaje umjesto da tiho pukne na klik.

---

## Memory update

Ažurirat ću `mem://monetization/pricing-strategy` — uklanja se „promo cijena prvih 6 mjeseci" za Featured Firma; cijena je trajno 14,99€/mj.

---

## Šta NEĆE biti dirano

- `src/pages/Paketi.tsx` (druga stranica, ne sadrži ove sekcije)
- Layout, boje, ikone, motion animacije (UI preservation)
- Premium subscription flow (već radi)
- Stripe edge funkcija `create-checkout` (već radi za sve mode-ove)
- DeutschTrainer kartice (već imaju Kupi dugmad)