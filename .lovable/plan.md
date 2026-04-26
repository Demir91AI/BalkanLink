## Plan: Wirtschaftliche Jugendhilfe — Smart Guide + Musterformular

Dodajemo novu temu **Wirtschaftliche Jugendhilfe (WiJuHi / Hilfe zur Erziehung po SGB VIII)** u kategoriju "Porodica i djeca" — kompletan vodič na bosanskom + interaktivni Musterformular (Antrag auf Hilfe zur Erziehung, primjer Maja Kovač / Adis Kovač).

Pratimo postojeće obrasce (Kindergeld, Elterngeld) — bez UI redizajna, samo registracija u postojeće strukture.

---

### 1. Smart Guide vodič (sadržaj na bosanskom)

**Novi fajl:** `src/components/guides/WirtschaftlicheJugendhilfeGuideContent.tsx`

Komponenta koristi postojeći `GuideInfoHeader` + `SmartGuideWizardShared` (kao `ElterngeldGuideContent.tsx`). Sadržaj iz korisničkog inputa, podijeljen u korake:

- Šta je WiJuHi (uvod + napomena: nije zasebna pomoć, već finansijski dio mjera SGB VIII)
- Za koga je pomoć (roditelji, hraniteljske porodice, mladi punoljetni 18–21, § 35a)
- Kada predati zahtjev (ne djeluje retroaktivno!)
- Decision tree (koja vrsta pomoći — §§ 28–35a, 41, 42)
- Dokumenti za pripremu (lični, finansijski, vezano za dijete)
- Postupak (Hilfeplanverfahren po § 36 — 7 koraka: ASD kontakt → Antrag → Bedarfsfeststellung → Hilfeplangespräch → Hilfeplan → Bescheid → revizija)
- Pflegegeld iznosi 2026 (Sachaufwand 0–6/6–12/12–18 + Erziehungsbeitrag 439 €)
- Kostenheranziehung (kad roditelji moraju doplatiti, §§ 91–94)
- Najčešće greške (7 stavki)
- Specifičnosti za balkansku dijasporu (strah od Jugendamt-a, Verwandtenpflege, razdvojeno stanovanje)
- Widerspruch postupak (1 mjesec rok)
- Besplatne savjetovaonice (Caritas, Diakonie, AWO, Pro Familia)

Dvojezična logika: bosanska objašnjenja + njemački oficijelni termini (po memoriji `mem://ux/language-standard/bilingual-content-rule`). Stand 2026.

---

### 2. Interaktivni Musterformular

**Novi fajl:** `src/pages/muster/WirtschaftlicheJugendhilfeMuster.tsx`

Koristi `MusterFormBase` arhitekturu (po memoriji `mem://features/muster-form-base`) — prati obrazac `KindergeldMuster.tsx`. Sekcije iz korisničkog primjera:

1. Podaci o podnositelju (Antragsteller — Maja Kovač default placeholder)
2. Pravo roditeljske brige (Personensorge — radio: alleinige / gemeinsame / drugo)
3. Podaci o djetetu (Adis Kovač)
4. Podaci o drugom roditelju (Damir Novak)
5. Tip pomoći — checkbox lista §§ 28, 30, 31, 29, 32, 33, 34, 35, 35a, 41 + drugo
6. Detaljno obrazloženje (textarea — školski problemi, kućna situacija, već poduzeto, cilj)
7. Prilozi (checkbox lista 9 dokumenata)
8. Saglasnost (DS-GVO + § 91 SGB VIII)
9. Potpis (mjesto, datum, oba potpisa — podnositelja i djeteta od 15+)

Lokalno čuvanje u `localStorage` (`wijuhi-muster-data`), print preko `window.print()` (po `mem://tech/pdf-preview-musterformular`). Defaultni primjer = Maja Kovač / Adis Kovač / München (po `mem://constraints/demo-data-naming-preference`).

---

### 3. Registracija u postojeće strukture (4 fajla)

**`src/lib/form-catalog.ts`** — dodaj u "porodica" sekciju (linija ~62):
```ts
{ slug: "wirtschaftliche-jugendhilfe", label: "Wirtschaftliche Jugendhilfe",
  desc: "Finansijska pomoć Jugendamt-a za odgoj djeteta (SGB VIII).",
  includes: "Smart Guide + Antrag auf Hilfe zur Erziehung" }
```
I u `MUSTER_SLUG_MAP`:
```ts
"wirtschaftliche-jugendhilfe": "wirtschaftliche-jugendhilfe",
```

**`src/lib/guide-data.ts`** — dodaj `Guide` entry u `guides` array sa `category: "familie"` (potrebno da se pojavi na `/familie` stranici i kao Smart Guide kartica). Polja: title/who/authority/formName, steps, documents, processingTime, commonMistakes, `officialInfoUrl: "https://www.gesetze-im-internet.de/sgb_8/"` (officialPdf prazan jer ne postoji jedinstveni federalni PDF).

**`src/pages/FormCenter.tsx`** — dodaj import i case (oko linije 186):
```tsx
import WirtschaftlicheJugendhilfeGuideContent from "@/components/guides/WirtschaftlicheJugendhilfeGuideContent";
...
if (slug === "wirtschaftliche-jugendhilfe") return <><WirtschaftlicheJugendhilfeGuideContent />{MusterButton}</>;
```

**`src/App.tsx`** — registruj muster rutu uz ostale (oko linije 170):
```tsx
const WirtschaftlicheJugendhilfeMuster = lazy(() => import("./pages/muster/WirtschaftlicheJugendhilfeMuster"));
...
<Route path="/musterformular/wirtschaftliche-jugendhilfe" element={<WirtschaftlicheJugendhilfeMuster />} />
```

**`src/pages/Familie.tsx`** — dodaj `Scale` ili `HelpingHand` ikonu u `iconMap`:
```ts
"wirtschaftliche-jugendhilfe": HelpingHand,
```
(Kartica će se automatski pojaviti jer `getGuidesByCategory("familie")` čita iz `guide-data.ts`.)

---

### 4. Pristup (gating)

Po memoriji `mem://monetization/access-gating`: kategorija "Porodica i djeca" NIJE besplatna zona ("Dolazak u Njemačku" je freemium hook). Wirtschaftliche Jugendhilfe će automatski naslijediti Premium gating preko `SmartGuideWizardShared` komponente (free=false default → koraci 1–2 besplatno, ostalo Premium).

---

### Pravna napomena u sadržaju

Vodič i Musterformular eksplicitno označavaju "Stand 2026" i pravni osnov (SGB VIII), naglašavaju da ovo nije pravni savjet (po `mem://constraints/temporal-context-2026` i `LegalDisclaimer`).

**Šta NEĆE biti dirano:** dizajn, layout, postojeće rute, sidebar, navigacija, drugi guide-i.