
## Problem
Trenutni PDF-like preview u `AntragGenericMuster.tsx` ne stane na mali ekran (384px viewport) — fiksna A4 širina (794px) izaziva pomjeranje (verschoben/versetzt) jer se polja apsolutno/grid pozicionirana ne skaliraju ispod A4 širine.

## Rješenje
Otvoriti novi Musterformular u **zasebnom prozoru/tabu** (`/muster/kindergeld/preview`) — standalone ruta bez sidebara/headera, samo dokument + toolbar. Korisnik koristi **native browser zoom** (Ctrl/+, pinch na mobitelu) za zoom in/out, popunjava polja, čuva u localStorage, downloaduje PDF.

## Šta gradimo

### 1. Nova standalone ruta `/muster/kindergeld/preview`
- Nova stranica `src/pages/muster/KindergeldPreviewWindow.tsx`
- Bez `MusterFormBase`, bez sidebara, bez glavne navigacije — čisto kao dokument
- Renderuje **isti PDF-like layout** koji je već u `AntragGenericMuster.tsx` (preuzimamo JSX strukturu i stilove)
- Fiksna A4 širina 794px, centrirano, bijela pozadina, `min-width: 794px` da se native browser horizontal scroll + pinch zoom ponašaju kao kod pravog PDF-a
- Dijeli isti `LS_KEY = "kg1-muster-data"` → korisnikovi unosi se sinhronizuju između stranica

### 2. Sticky toolbar na vrhu standalone prozora
Mali fiksirani bar (top, full width, ~44px):

```text
[← Nazad]   Musterformular Kindergeld — PRIMJER   [⬇ PDF]  [🖨 Print]
```

- **Nazad** — `window.close()` ako je popup, inače `history.back()`
- **PDF** — `window.print()` sa `@media print` CSS koji sakriva toolbar i renderuje samo dokument (browser nudi "Save as PDF"); dugme oznaceno "⬇ Preuzmi kao PDF"
- **Print** — direktno `window.print()`

### 3. Prominentan disclaimer banner
Žuta traka odmah ispod toolbara, **uvijek vidljiva** (ne sticky, dio dokumenta na vrhu):

```text
⚠️ SAMO PRIMJER (Musterformular) — Ovaj dokument je edukativni primjer.
NE MOŽE se poslati u Behörde. Za zvaničan zahtjev koristite originalni
PDF od Familienkasse: [Preuzmi originalni Kindergeld PDF →]
```

- U print verziji ostaje vidljiv (watermark efekat) tako da i odštampani/PDF dokument jasno kaže da je primjer
- Dodatno suptilan dijagonalni watermark "PRIMJER • BalkanLink" preko cijele stranice (CSS `::before`, low opacity)

### 4. Postojeća stranica `/musterformular/kindergeld`
Ostaje kao trenutno — ali umjesto pokušaja inline PDF preview-a, prikazuje:
- Kratak opis šta je Musterformular
- Veliko CTA dugme: **"📄 Otvori Musterformular u novom prozoru"** → `window.open('/muster/kindergeld/preview', '_blank', 'width=900,height=1100')`
- Link na originalni Kindergeld PDF (ostaje gdje je bio)
- Napomena o localStorage čuvanju

Time se rješava problem da se PDF-like layout ne pokušava ugurati u uski mobilni viewport sa svim okolnim UI elementima.

### 5. Mobilno ponašanje
- Na mobitelu `window.open` najčešće otvori novi tab umjesto popupa — to je OK
- `<meta name="viewport" content="width=794, initial-scale=0.45">` u standalone stranici → dokument se inicijalno vidi cijeli, korisnik pinch-zoomuje da popuni polja
- Standalone ruta dobija svoj `<head>` viewport override kroz `react-helmet-async`

### 6. PDF download
Dvije opcije, biramo **window.print()** jer:
- Već je standard u projektu (memory: "Musterformular Print — PDF generation via window.print()")
- Browser native dialog sa "Save as PDF" radi na svim uređajima
- Disclaimer i watermark idu u PDF kroz `@media print` stilove
- Nema dodatne dependency

Dugme labela: **"⬇ Preuzmi kao PDF"**

## Tehnički detalji

**Nove datoteke:**
- `src/pages/muster/KindergeldPreviewWindow.tsx` — standalone stranica
- `src/components/muster/KindergeldDocument.tsx` — izdvojen JSX dokumenta (reuse iz `AntragGenericMuster.tsx`)

**Izmjene:**
- `src/App.tsx` — dodati rutu `/muster/kindergeld/preview` (bez Layouta/Sidebara — vlastiti minimal wrapper)
- `src/pages/muster/AntragGenericMuster.tsx` — pojednostaviti na launcher karticu (CTA + originalni PDF link + opis); ukloniti pokušaj inline A4 preview-a koji ne stane na ekran
- Dodati `@media print` CSS koji sakriva toolbar, `body { margin: 0 }`, dokument na full A4

**i18n:** Sve nove stringove dodati u `bs/de/hr/sr` u `forms.json` namespace (toolbar, disclaimer, dugmad).

**Zadržavamo:**
- `LS_KEY = "kg1-muster-data"` (iste localStorage key)
- Svu logiku polja, IBAN/BIC, IdBoxes, child tabele, signature
- Originalni Kindergeld PDF link (`PDF_URL`)
- Memory pravilo: ovo je samo Kindergeld preview, ostali Musterformulari ostaju nepromijenjeni

## Verifikacija nakon implementacije
1. `/musterformular/kindergeld` → vidi launcher karticu sa CTA dugmetom i originalnim PDF linkom
2. Klik "Otvori Musterformular" → otvara se `/muster/kindergeld/preview` u novom prozoru/tabu
3. U novom prozoru: vidljiv toolbar, žuti disclaimer banner, PDF-like dokument, watermark
4. Pinch-zoom na mobitelu radi, polja se popunjavaju, localStorage čuva
5. Klik "Preuzmi kao PDF" → otvara se browser print dialog, "Save as PDF" čuva dokument sa disclaimerom i watermarkom
6. Refresh standalone prozora → unosi ostaju (localStorage)
