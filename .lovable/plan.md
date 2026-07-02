# BalkanLink — Health Check (Stand: 02.07.2026)

Ovo je **read-only izvještaj**. Nisu vršene nikakve izmjene. Ako želiš da popravim neki od nalaza, javi mi koji i prebacit ću se u build mode.

---

## 1) Rute i stranice

- **199 registrovanih ruta** u `src/App.tsx` (uključujući BS default, `/de/*`, `/hr/*`, `/sr/*` overlay-e i alijase).
- Sve `lazy(() => import(...))` reference postoje kao fajlovi (`src/pages/**` i `src/pages/muster/**` — svih ~37 Muster stranica, 11 `dolazak/*`, kompletan `porezi/*` + `steuern/*` mirror, admin sekcija, legal sekcija).
- Layout arhitektura: `HomeLayout` (home) + `Layout` (ostale rute) — obje sa `AppSidebar`, `Header`, `Footer`, `MobileBottomNav`, cookie banner, PWA prompts.
- Multi-jezično: `LanguageRouter` prisilno sinhronizuje i18next s URL-om (`/de`, `/hr`, `/sr`, default `bs`).

**Rizične tačke (samo za pregled, nisu greške):**
- Admin rute (`admin`, `admin/forms`, `admin/pitanja`, `admin/trialovi`) su zaštićene `AdminGuard`-om ✅.
- Legacy alijasi (`/premium` → `/paketi`, `sabloni` → `vorlagen`, itd.) rade preko `<Navigate>` — OK.

## 2) Build / TypeScript / lint

| Provjera | Rezultat |
|---|---|
| `tsgo --noEmit` (TypeScript) | ✅ 0 grešaka |
| Vite dev server | ✅ Radi (`http://localhost:8080`) bez grešaka pri startu |
| Console (browser snapshot) | ✅ Nema grešaka |
| Network snapshot | ✅ Nema failed request-ova |
| Runtime errors | ✅ Nema |
| Tailwind warning | ⚠️ `duration-[1500ms]` je ambiguous — samo warning, ne blokira build |
| Browserslist | ⚠️ `caniuse-lite` je 13 mj. star — samo warning |

## 3) Navigacija / linkovi

- `PageNavBar` + `Breadcrumbs` su standard kroz projekat.
- Sve lazy import putanje se poklapaju sa postojećim fajlovima (provjereno kroz `ls src/pages` + import specifiere).
- Nema mrtvih linkova detektovanih preko konzole/network snapshot-a.
- Postoji nekoliko dupliranih ruta sa raznim jezičkim alijasima (`porezi` ↔ `steuern`, `sacuvano`/`gespeichert`/`spremljeno`, `sabloni`/`vorlagen`) — namjerno, radi SEO/UX.

## 4) Supabase / backend

- Env varijable prisutne (`VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`) ✅.
- Klijent u `src/integrations/supabase/client.ts` konfigurisan s auto-refresh, persistSession ✅.
- Sve tabele (31) + funkcije (25+) postoje i koriste se od strane frontenda / edge funkcija.

**DB error log (posljednjih 24h):**
- `permission denied for function get_daily_chat_count` — **2 puta**. Funkcija postoji, ali nedostaje `GRANT EXECUTE ... TO authenticated` (ili se poziva iz konteksta bez sesije). Sve ostale RPC pozivi rade.

**Supabase linter (19 upozorenja, sve WARN — ni jedan ERROR):**
- 1× *Extension in Public* — jedno proširenje instalirano u `public` schemi (standardno kod Lovable Cloud template-a).
- ~15× *Public/Signed-In Users Can Execute SECURITY DEFINER Function* — funkcije poput `has_role`, `get_admin_*`, `redeem_trial_code` su namjerno pozivane preko RPC-a i imaju interne `has_role()` provjere, pa je ovo prihvatljivo. Preporuka: `REVOKE EXECUTE ... FROM anon` na onima koje ne trebaju biti javne (npr. `grant_premium_access`, `deactivate_expired_*`).
- Sitne stavke za lint hardening — ne blokiraju rad aplikacije.

**Edge funkcije:** sve postoje na disku (`supabase/functions/**`), status pojedinačnih runtime pozive nije provjeravan u ovom snapshotu (nema instant signala o padu).

## 5) Sažetak

### ✅ Radi
- Kompletna aplikacija se kompilira i pokreće bez TS/build grešaka
- Sve 199 ruta imaju validne komponente
- Auth, i18n, PWA, cookie consent, admin guard — svi mount-ovani ispravno
- Nema aktivnih runtime/console/network grešaka u trenutnom snapshotu
- Supabase konekcija zdrava, RLS aktivan na svim tabelama

### ⚠️ Treba pažnje (nije blokirajuće)
1. **`get_daily_chat_count` permission denied** (2 recent DB errora) — dodati `GRANT EXECUTE ... TO authenticated;` ili prebaciti u SECURITY DEFINER s internom auth provjerom.
2. **19 Supabase linter WARN-ova** — pretežno SECURITY DEFINER funkcije izložene `anon`/`authenticated` ulozi. Preporučeno: `REVOKE EXECUTE FROM anon` na admin-only funkcijama.
3. **Tailwind ambiguous class** `duration-[1500ms]` — cosmetic warning, escape ili prebaci u `transition-duration:1500ms` inline.
4. **Browserslist DB 13 mjeseci star** — pokrenuti `bunx update-browserslist-db@latest` (jedan komit).

### ❌ Slomljeno
- **Ništa kritično nije slomljeno.** Aplikacija je u zdravom stanju.

---

### Predloženi sljedeći koraci (odaberi ako želiš da radim)
- [ ] Popraviti `get_daily_chat_count` GRANT
- [ ] Očistiti `REVOKE EXECUTE FROM anon` na admin RPC funkcijama koje flag-uje linter
- [ ] Popraviti Tailwind `duration-[1500ms]` warning
- [ ] Update `browserslist-db`

Samo reci koji od ovih da uradim i prebacit ću se u build mode.
