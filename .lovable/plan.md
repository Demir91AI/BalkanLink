## Cilj
Audit + zamjena svih "Kontaktiraj nas / Plaćanje uskoro / aktivacija se priprema" CTA-ova direktnim Stripe checkout buttonima na cijeloj stranici.

## Pronađene lokacije (3 mjesta gdje fali real-checkout)

### 1. `src/pages/DokumentenCheck.tsx` — 2 mjesta
- **Linija 330–335 (pricing kartica "Jednokratno 2,99€")**: trenutno `mailto:kontakt@balkanlink.de` link "Kontaktiraj nas →" (ovo je tačno baner sa screenshota).
  - Zamijeniti sa Stripe button: `initiateCheckout(STRIPE_PRICE_IDS.DOC_CHECK, user.id, "payment")`. Label: **"Kupi za 2,99€ →"**. Ako user nije logiran → redirect na `/login`.
- **Linija 497–502 (post-analysis CTA "Jednokratno — 2,99€")**: isti mailto link.
  - Zamijeniti istom Stripe logikom. Sačuvati postojeći outline styling.

### 2. `src/pages/Paketi.tsx` — glavna premium stranica (KRITIČNO)
- **Linija 9–11**: `handlePurchase` samo prikazuje toast "Plaćanje uskoro dostupno". Ovo je glavni Premium CTA cijelog sajta a ne radi.
  - Zamijeniti sa pravom funkcijom koja zove `initiateCheckout(STRIPE_PRICE_IDS.PREMIUM_YEARLY, user.id, "subscription")` (godišnji 99,90€ je popularniji jer je već označen "uštedi 20%"). Ako nema usera → `/login`.
- **Dodati drugi button** za mjesečnu pretplatu (9,99€/mj `PREMIUM_MONTHLY`) ispod godišnjeg, da user ima izbor — npr. mali tekstualni link "ili 9,99€/mj. mjesečno →".
- **Linija 186–189**: ukloniti rečenicu "Plaćanje uskoro dostupno. Za rani pristup..." — nije više tačno. Zamijeniti kratkom porukom: "Sigurno plaćanje preko Stripe-a. Otkaži bilo kada."

### 3. `src/components/nudim-trazim/NtProModal.tsx` — modal za istakni oglas
- **Linija 17–20 + 125–131**: `handleActivate` samo toast "PRO aktivacija se priprema. Hvala ti!". Modal nudi 3 opcije (Free / Pro 2.99€ / Premium 9.99€) ali nijedna ne ide na checkout.
  - Wire na osnovu `selected`:
    - `"free"` → zatvori modal i pozovi postojeću logiku objave (current behaviour OK; trebam provjeriti da li parent hendlapokretanje submit forme — najsigurnije: ostaviti toast za free i delegirati na `onClose`).
    - `"pro"` → `initiateCheckout(STRIPE_PRICE_IDS.PRO_AD_7DAY, user.id, "payment")` (cijena u modalu je 2.99€ ali Stripe katalog ima `PRO_AD_7DAY = 1.99€` — **PAŽNJA**: ovo je nesklad; ispravljam UI prikaz na **1,99€ / 7 dana** da odgovara stvarnoj Stripe cijeni iz `STRIPE_PRICE_IDS`. Isto i u listi opcija (`"Dodatni 2.99€ nakon toga"` → `"Dodatni 1,99€ nakon toga"`).
    - `"premium"` → `initiateCheckout(STRIPE_PRICE_IDS.PREMIUM_MONTHLY, user.id, "subscription")`.
  - Dodati `useAuth()` import za guard prema `/login`.

## Provjerene lokacije gdje JE već OK
- `src/pages/Pricing.tsx` — već ima Stripe buttone (od prethodnog mesidža).
- `src/pages/DeutschTrainer.tsx` — Premium CTA vodi na `/deutsch-trainer/preise` koja već ima direktne Stripe buttone po nivou.
- `src/pages/TrainerPreise.tsx` — već ima `initiateCheckout` po nivou.
- `src/pages/BiznisNjemacka.tsx` — nema premium banera.
- `src/components/home/WhatIsWhat.tsx`, `src/pages/Index.tsx` — samo informativni tekst (badges, tabele), bez CTA buttona.
- `src/components/pricing/PricingPremiumCard.tsx`, `PricingFreeCard.tsx`, `PricingComparisonTable.tsx` — koristi se na `/pricing` koji već radi.

## Nakon implementacije
Brzo testiranje preko `supabase--curl_edge_functions` na `create-checkout` sa svakim novim price ID-em (`PREMIUM_YEARLY`, `PREMIUM_MONTHLY`, `DOC_CHECK`, `PRO_AD_7DAY`) da potvrdimo da svi vraćaju validan checkout URL (već je verifikovano da su svi price ID-ovi aktivni u Stripe-u — vidi prethodni `list_prices` poziv).

## Ne mijenjamo
- Stripe price IDs u `src/lib/stripe.ts` (već potvrđeni live).
- Postojeći `create-checkout` edge function (već radi).
- UI strukturu ostalih banera (poštujemo `mem://constraints/ui-preservation`).