## Cilj

Kindergeld (KG1) Musterformular — kompletna nadogradnja po Elterngeld Bayern šablonu: 1:1 PDF auto-fill originalnog Familienkasse KG1 PDF-a + Anlage Kind, lokalno u browseru (privatnost), bilingvalne labele, 4 jezika, Premium-gated, moderan dark UX.

## Kontekst

- **Centralizirano**: Familienkasse pri Saveznoj agenciji za rad pokriva cijelu Njemačku — **NEMA Bundesland selektora** (za razliku od Elterngeld).
- Trenutni `KindergeldMuster.tsx` koristi `MusterFormBase` sa `window.print()` PDF — bez auto-fill, bez i18n, bez bilingvalnih labela, bez Premium gate.
- `KindergeldGuideContent.tsx` već postoji (BHS Smart Guide) — koristit ću ga kao fallback ispod auto-fill forme.

## Plan implementacije

### 1. PDF assets (originalni Familienkasse PDF-ovi)
Skinuti i pohraniti u `public/muster/`:
- `kg1-antrag-kindergeld-2026.pdf` — glavni obrazac (Antragsteller, Ehepartner, Zahlungsweg, max 4 djeteta zbirno)
- `kg1-anlage-kind-2026.pdf` — dodatni obrazac za 5+ dijete (1 PDF po djetetu)

Izvor: `https://www.arbeitsagentur.de/datei/kg1-antrag-kindergeld_ba017202.pdf` + `anlage-kind`.

### 2. Field mapping (`src/lib/kindergeld-fields.ts`)
Skripta inspektuje AcroForm fields PDF-a (`pdf-lib` getFields) → mapira njemačka imena polja na `KindergeldFormData` ključeve. Struktura:
- `s1_*` Antragsteller (Steuer-ID, Familienname, Vorname, Geburtsname, Geburtsdatum, Geburtsort, Geschlecht, Staatsangehörigkeit, adresa, Familienstand)
- `s2_*` Ehepartner/Lebenspartner (uvjetno, isti set polja)
- `s3_*` Zahlungsweg (IBAN, BIC, Bank, Kontoinhaber)
- `s4_*` Bescheid an dritte Person (uvjetno)
- `s5_kinder[]` lista djece (vorname, geburtsdatum, geschlecht, geburtsort, staatsangehörigkeit, kindesverhältnis, lebt im Haushalt, andere Familienkasse)
- `s6_*` Datum + Ort (potpis fizički)

`initialData()` factory + `KindergeldFormData` type interface.

### 3. PDF fill helper (`src/lib/pdf-fill-kindergeld.ts`)
Po uzoru na `pdf-fill-elterngeld.ts`:
- `fillKindergeldPdf(data)` → fetcha PDF iz `/muster/kg1-antrag-kindergeld-2026.pdf`, koristi `pdf-lib` da popuni AcroForm polja, vraća `Blob`.
- Posebna funkcija `fillAnlageKindPdf(kind, parent)` za 5+ dijete (jedan Anlage Kind PDF po dodatnom djetetu).
- Glavni handler ako ima >4 djece: spaja sve u jedan PDF preko `mergePdfs()` (pypdf style, ali u pdf-lib `copyPages`).
- PDF ostaje **NEFLATTANED** (editable) da klijent može potpisati i dodati ručno.
- Privatnost: nikad ne šalje na server.

### 4. Premium gating + UI overhaul (`src/pages/muster/KindergeldMuster.tsx`)
Prepisati po Elterngeld šablonu:
- `useTranslation("forms")` + sve stringove preko `t()`
- `MusterDisclaimer formKey="kindergeld"` na vrhu
- `PrivacyGuarantee` (lokalno generiranje)
- **3-koraka dostave** info kartica: Online (BundID na familienkasse.de) | PDF popunjen + ispis + potpis | Pošta/lično u nadležnu Familienkasse (link na lokator: `arbeitsagentur.de/familienkasse-finden`)
- Sekcije sa `<Field>` + `<Select>` koje koriste `tLabel()`/`TOpt` (npr. "Familienname (Prezime)") — bilingvalne automatski preko postojećeg `de-labels.ts` rječnika
- Dinamička lista djece (Add/Remove kind)
- "Preuzmi popunjeni PDF" zeleno dugme → `fillKindergeldPdf(data)` → `downloadBlob`
- Loading + error state + reset confirm
- Premium overlay: koristim postojeći `PremiumPaywall` mehanizam (`usePremiumAccess` hook); ako nije Premium, prikaz prvih 2 sekcije + blurred ostatak + paywall CTA. Free preview: Steuer-ID + Antragsteller. Iza paywalla: ostalo + download.
- Ispod auto-fill forme: `<KindergeldGuideContent />` Smart Guide (BHS) kao referenca (već postoji).
- `MUSTER_SLUG_MAP` već routira `/muster/kindergeld` na ovaj page — provjeriti.
- Auto-scroll, ShareButton, Save-for-later — naslijeđuju se iz `MusterFormBase`.

### 5. i18n — `src/i18n/locales/{bs,de,hr,sr}/forms.json`
Novi blok `musterFlow.kindergeld.*`:
- `title`, `subtitle`, `originalLink`, `footerNote`, `confirmReset`, `downloadButton`, `generatingPdf`, `pdfError`
- `delivery.online.{title,desc,cta}`, `delivery.pdf.*`, `delivery.post.*`
- `s1.title` + `s1.steuerId{,Hint}`, `s1.familienname`, ... (kompletni labeli — fallback se generira automatski iz `de-labels.ts` ako labela nije eksplicitna)
- `s2.title`, `s2.hasPartner`, `s3.title`, `s4.title`, `s4.hasOther`, `s5.title`, `s5.addKind`, `s5.removeKind`, `s5.kindNum`, `s6.title`, `s6.ort`, `s6.datum`
- BS = primarni (ijekavica), HR (ijekavica), SR (ekavica), DE (njemački UI tekst).
- Svaki ključ u SVA 4 fajla odmah (po memoriji).

### 6. Cron za PDF verziju
- Dodati `kg1-antrag-kindergeld` u `supabase/functions/check-pdf-versions/index.ts` registry da admin dobije email kad Familienkasse objavi novu verziju PDF-a.

### 7. UX dodatci (po prošloj diskusiji — uključujem najjeftinije)
- "Šta nakon slanja?" timeline kartica (Familienkasse odgovara 4–6 sedmica; Widerspruch rok 1 mjesec).
- "Top 5 grešaka koje uzrokuju odbijanje" kartica (već imamo content u `KindergeldGuideContent` → izvuci u sekciju iznad forme).
- "Pitaj Asistenta o Kindergeld" deeplink dugme (otvara chat sa preset query).

## Tehnički detalji

```text
src/
├─ lib/
│  ├─ kindergeld-fields.ts        # NEW: field map + KindergeldFormData type + initialData()
│  └─ pdf-fill-kindergeld.ts      # NEW: fillKindergeldPdf() + fillAnlageKindPdf() + merge
├─ pages/muster/
│  └─ KindergeldMuster.tsx        # REWRITE: Elterngeld pattern + Premium gate
├─ i18n/locales/{bs,de,hr,sr}/
│  └─ forms.json                  # +musterFlow.kindergeld.* (~80 ključeva × 4 jezika)
public/muster/
├─ kg1-antrag-kindergeld-2026.pdf # NEW: official Familienkasse PDF
└─ kg1-anlage-kind-2026.pdf       # NEW: official Anlage Kind PDF
supabase/functions/check-pdf-versions/index.ts  # +KG1 entry
```

**Validacija**: nakon implementacije skinem PDF, izvučem AcroForm imena polja sa pdf-lib skriptom u `/tmp/`, pa popunim mapping, pa testiram download lokalno (mock data) — ako koje polje fali, dopisem.

**Bez izmjena na**: `MusterFormBase`, `MusterDisclaimer`, `PrivacyGuarantee`, `KindergeldGuideContent`, `MUSTER_SLUG_MAP` (već postoji), Stripe/payments (Premium već radi).

## Šta NIJE u opsegu

- Bundesland selektor (Kindergeld je centralizovan).
- Promjena ostalih Musterformulara — Kinderzuschlag/Bürgergeld/etc. dolaze sljedećim korakom nakon tvoje provjere.
- Smart Guide content prepravke — već je BHS i odličan, ostaje kakav jest.
- `LocalizedGuide` integracija za Smart Guide u DE/HR/SR — Kindergeld guide je trenutno samo BHS, prevod guide-a kasnije ako želiš.

## Validacija prije isporuke

1. Build prolazi (TS + Vite).
2. Manual test: popuniti formu sa demo podacima → preuzeti PDF → otvoriti u Adobe → polja vidljiva i ispravna.
3. Premium gate: u inkognito (bez Premium) prvih 2 sekcije vidljive, ostatak blurred + paywall.
4. i18n: prebaciti na DE/HR/SR → svi labeli prevedeni, niti jedan hardkodiran string.
5. Mobilni viewport: forma se uredno slaže (auto-fit grid).

Javljam kad je gotovo, sa screenshotima i instrukcijama za testiranje.
