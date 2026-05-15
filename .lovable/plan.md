## Cilj

Generisati **pixel-perfect kopiju** službenih obrazaca (BAMF / BA / VIDEX / §68) — sa zaglavljem, sekcijama, brojevima polja, checkbox-ovima i okvirima — i u njih ucrtati korisnikove podatke. Princip identičan kao postojeća **Elterngeld Bayern** 1:1 rekonstrukcija (`src/lib/pdf-fill-elterngeld.ts`) i **Bürgergeld Anlagen** (`src/lib/pdf-fill-buergergeld-anlagen.ts`).

## Zašto fazirano, a ne sve 7 odjednom

Svaki obrazac ima 4–10 stranica i 80–250 polja. 1:1 reprodukcija = ručno mjerenje svake X/Y koordinate iz originala, custom layout engine, embedded Unicode font, QA renderom svake stranice. Realistično: **3–5h po obrascu** kvalitetne implementacije. Ako pokušamo 7 odjednom dobiće se površan/loš rezultat na svima. Krećemo od najvažnijeg (Aufenthaltstitel — koristi 5 od 7 visa rute) i iteriramo.

## Faza 1 — Infrastruktura (zajednička)

Kreira se jednom, koristi svi obrasci:

1. `src/lib/pdf-recon/font-loader.ts` — embed Unicode TTF (`Noto Sans` Regular + Bold) iz `/public/fonts/` da pdf-lib može crtati `š č đ ž ć ä ö ü ß`.
2. `src/lib/pdf-recon/layout-primitives.ts` — pomoćnici: `box()`, `checkbox(checked)`, `field(label, value, x, y, w)`, `sectionHeader(num, title)`, `signLine()`, `pageHeader(formCode, page, total)`, `footer()`.
3. `src/lib/pdf-recon/index.ts` — `renderForm(spec, data)` orchestrator + `downloadFilledOriginal(bytes, fileName)`.

## Faza 2 — Aufenthaltstitel 1:1 (BAMF stil)

Najvažniji obrazac — koristi se za 5 od 7 visa rute (Work1, Bluecard, Family, Study, Permanent1).

- `src/lib/pdf-recon/forms/aufenthaltstitel.ts` — kompletan layout (~8 stranica): zaglavlje „Antrag auf Erteilung eines Aufenthaltstitels", sekcije 1–9, BAMF logo placeholder, broj polja, sva 180+ polja sa koordinatama.
- Integracija: u `VisaWorkForm1`, `VisaBluecardForm`, `VisaFamilyForm`, `VisaStudyForm`, `VisaPermanentForm1` dodaje se **plavo dugme** „📄 Preuzmi popunjen službeni obrazac (1:1)" pored postojećih.
- Datenblatt + Musterformular ostaju kao fallback.

## Faza 3 — EzB 1:1 (BA 146206 stil)

- `src/lib/pdf-recon/forms/ezb.ts` — 2 stranice, ~60 polja, BA logo placeholder.
- Integracija u `VisaWorkForm2`.

## Faza 4 — Niederlassungserlaubnis 1:1 (§ 9 + § 9a)

- Sličan layout kao Aufenthaltstitel + sekcije za 5-godišnji rok, integraciju, penzijsko.
- Integracija u `VisaPermanentForm1`, `VisaPermanentForm2`.

## Faza 5 — Verpflichtungserklärung §68 (informativna kopija)

- Bundesdruckerei serijski obrazac se **ne smije reproducirati legalno**. Umjesto toga generišemo „**Vorbereitungs-Bogen** (priprema za §68 obrazac)" — ista polja, jasno označeno *„Informativni primjerak — original se kupuje na šalteru Ausländerbehörde za 29 EUR"*.

## Faza 6 — Nationalvisum (VIDEX export)

- VIDEX je online — nema PDF formata. Generišemo „**VIDEX Eingabe-Hilfe**" PDF: lista polja redosljedom kako se pojavljuju u VIDEX portalu sa BHS labelama da korisnik samo unosi.

## QA proces (svaka faza)

1. Render PDF → konvert u JPG (`pdftoppm -r 150`) → inspekcija svake stranice
2. Provjera: ne sječe se tekst, checkboxovi tačno označeni, dijakritike rade, fontovi konzistentni, brojevi polja odgovaraju originalu
3. Side-by-side sa originalom (screenshot)
4. Tek nakon clean QA-a se faza zatvara

## Šta SAD radim u ovom turnu

**Faza 1 (infrastruktura)** + **Faza 2 (Aufenthaltstitel 1:1, prva stranica kao proof-of-concept)** sa renderom i QA-om. Tek kad potvrdiš da prva stranica izgleda kako treba — gradimo ostale stranice i ostale obrasce.

Tehnički detalji:
- Noto Sans TTF (~400KB) ide u `public/fonts/` i učitava se asinhrono pri prvom kliku na „1:1 PDF" da ne usporava initial load
- pdf-lib `embedFont(uint8array)` sa `subset: true` da finalni PDF bude ~50KB umjesto ~500KB
- Koordinate iz originalnog BAMF PDF-a izmjerene pomoću pdfplumber `page.chars` ekstrakcije
- Sva 4 jezika: dugme „1:1 PDF" labela u `forms.json` × bs/hr/sr/de

## Šta ostaje van scope-a (za sada)

- BAMF logo (autorsko pravo) — koristimo neutralan tekst „Antrag — Formular der zuständigen Ausländerbehörde"
- Različite Ausländerbehörde varijante (Berlin/München/Düsseldorf) — koristimo „generic BAMF" layout koji svaka ABH prihvata
- Verpflichtungserklärung sa pravim serijskim brojem (ne smijemo)

Hoću li krenuti od Faze 1 + 2 (proof-of-concept Aufenthaltstitel prva stranica)?
