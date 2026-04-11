

## Plan: Integracija Biznis u Njemačkoj sekcije

Tri fajla treba ažurirati da se nove stranice povežu s ostatkom aplikacije.

### 1. `src/App.tsx` — Dodaj lazy imports i rute
- Dodaj lazy importove za `BiznisNjemacka` i `BiznisGuide`
- Dodaj rute `/biznis` i `/biznis/:slug` (pored postojećih radno-pravo ruta)

### 2. `src/components/layout/AppSidebar.tsx` — Dodaj sidebar stavku
- Importuj `Store` ikonu iz lucide-react
- Dodaj novu stavku u `secondaryItems` niz:
  `{ titleKey: "sidebar.biznis", url: "/biznis", icon: Store }`
- Pozicioniraj odmah ispod "Radno pravo"

### 3. `src/lib/canonical-routes.ts` — Registruj kanonske rute
- Dodaj novi `CanonicalSection` entry za biznis sa assistant topic keys (gewerbe, biznis, samozaposlenje, selbständig, freiberufler)
- Dodaj `/biznis` u `VALID_PRODUCTION_ROUTES` set
- Dodaj `path.startsWith("/biznis/")` provjeru u `isValidProductionRoute`

### 4. `src/i18n/bs.ts` + `src/lib/de-labels.ts` — Lokalizacija
- BS: `"sidebar.biznis": "Biznis u Njemačkoj"`
- DE: `"sidebar.biznis": "Business in Deutschland"`

