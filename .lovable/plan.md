

## Plan: Standardizacija PageNavBar na Radno pravo stranicama

### Problem
- `/radno-pravo` nema nikakvu navigacijsku traku (Nazad + Početna)
- `/radno-pravo/:slug` ima custom `← Radno pravo` button umjesto standardnog `PageNavBar`
- Vizualna nedosljednost s ostalim sekcijama (npr. Formulari koji koriste `PageNavBar`)

### Promjene

**1. `src/pages/RadnoPravo.tsx`**
- Importati `PageNavBar` iz `@/components/navigation/PageNavBar`
- Dodati `<PageNavBar />` na vrh sadržaja (unutar container diva, prije Hero sekcije)

**2. `src/pages/RadnoPravoGuide.tsx`**
- Importati `PageNavBar` iz `@/components/navigation/PageNavBar`
- Zamijeniti custom back button (linija 33-39) sa `<PageNavBar />`
- Na fallback "not found" stranici također dodati `PageNavBar` umjesto custom linka

Obje stranice će dobiti identičan `< Nazad` + `🏠 Početna` bar kao na Formulari stranici. Postojeći `PageNavBar` komponent je već reusable i ne zahtijeva nikakve izmjene.

