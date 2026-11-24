# 00.05 Audit izolacije backenda (samo čitanje) i prijedlog

## Rezultat audita

Provjereno:
- Lokalni `.env`, `supabase/config.toml` i javni JS paket na balkanlink.de pokazuju na isti backend projekat (`cvobntstjmlpozrbleyu`). Preview, nacrti i balkanlink.de dijele istu bazu, prijavu (auth), storage i Edge funkcije.
- Klijent za prijavu u previewu koristi samo poseban način čuvanja sesije u pregledniku (`previewAuthStorage`). Korisnički nalozi su i dalje isti kao na produkciji.
- Stripe i email ključevi postoje samo kao tajne Edge funkcija istog backenda (create-checkout, stripe-webhook, verify-payment, customer-portal, process-email-queue i druge). Sve okoline zato koriste isti Stripe nalog i isti slanje emaila.
- Kod već ima zaštite: checkout za godišnju članarinu blokira live ključ bez posebnog odobrenja (`annual_live_mode_allowed`), a postoji i zajednička blokada novih kupovina.
- Postojeći testovi: unit testovi mockaju backend klijent (4 fajla). `tests/release` (Playwright) radi protiv lokalnog servera, pa kod koji tamo zove backend ide na produkcijski backend.

Nepoznato:
- Da li je Stripe tajna test ili live ključ (vrijednost se ne smije čitati).
- Koja verzija Edge funkcija je trenutno aktivna i da li nacrti imaju ikakav drugi backend. Nema dokaza da imaju.
- Tačna cijena zasebnog staging projekta (zavisi od plana; nije provjereno).

## Prijedlog (čeka odobrenje vlasnika)

1. Mock-testovi bez backenda, odmah i besplatno:
   - Playwright `page.route` presretanje za `*.supabase.co/functions/v1/*` i `/auth/v1/*` u `tests/release`, sa sintetičkim odgovorima.
   - Zaštita u konfiguraciji testova: test pada ako bilo koji neuhvaćeni zahtjev ode na pravi backend.
2. Pravi staging, samo uz zasebno odobrenje:
   - Novi, odvojeni Lovable projekat (remix) sa vlastitim Cloud backendom, Stripe test ključem i isključenim slanjem emaila.
   - Migracije se prenose iz repozitorija. Bez kopiranja pravih korisničkih podataka, samo sintetički nalozi.
3. Do tada važi: nikakav E2E na previewu koji piše podatke, troši kvote ili šalje email.

## Tehnički detalji
- Fajlovi za korak 1: novi `tests/release/backend-guard.ts` (route mock + blokada) i import u postojeće specove. Bez novih paketa.
- Korak 2 ne mijenja ovaj projekat. Traži odluku vlasnika o troškovima i tajnama.
