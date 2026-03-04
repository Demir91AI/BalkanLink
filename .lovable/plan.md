

# Plan: Comprehensive Elterngeld Guide Update from familienportal.de

## Source Data Collected

From 4 official familienportal.de pages, I've extracted complete information:

**Was ist Elterngeld**: 3 variants, tax-free but Progressionsvorbehalt, must file Steuererklärung, Elterngeldrechner available
**Kann ich Elterngeld bekommen**: Eligibility details (also for Adoptivkinder, Enkelkinder in special cases, foreign parents with extra requirements, all employment types including Minijob/students/homemakers, also when child in daycare), income cap 175,000€ for ALL family types
**Wie viel**: 65% of net, Geringverdiener get more (up to 100% for <1,000€), max pre-birth net 2,770€, Basiselterngeld 300-1,800€, ElterngeldPlus 150-900€, Deckelungsbetrag concept
**Wie lange**: Lebensmonate explained, 14 months Basis (min 2 Partnermonate), ElterngeldPlus double, Partnerschaftsbonus +4 each, max 32. Lebensmonat, Frühgeborene +1-4 months, detailed combination examples, after LM14 no interruption allowed

## Changes in `src/lib/guide-data.ts`

### 1. Update `who` field (lines 361-364)
Expand all 3 languages to include:
- Full eligibility list (self-care, shared household, Germany residence, max 32h)
- Also applies to: Adoptivkinder, Stiefkinder, in special cases Enkelkinder (parents disabled/deceased)
- All employment types eligible (employees, civil servants, self-employed, unemployed, students, homemakers, Minijob, mixed income)
- Foreign parents: additional requirements
- Income cap: 200,000€ (births from 01.04.2024), 175,000€ (births from 01.04.2025) — applies equally to Alleinerziehende, Paare, and getrennt Erziehende
- Child can also be in daycare/Tagesmutter — still eligible
- Pflegeeltern are NOT eligible

### 2. Update Step 3 cards (Izbor vrste Elterngeld-a, ~line 413)
Add to instruction and cards:
- Exact calculation: Basiselterngeld = 65% of net income difference, max pre-birth net 2,770€ → max 1,800€
- Geringverdiener rules: 1,200-1,240€ → 65-67%, <1,000€ → up to 100% (0.1% per 2€ below 1,000)
- ElterngeldPlus: Deckelungsbetrag = half of theoretical Basiselterngeld without post-birth income
- ElterngeldPlus can be MORE favorable with Teilzeit (concrete examples from official data)
- Partnerschaftsbonus = calculated like ElterngeldPlus
- Tax: Elterngeld is steuerfrei but Progressionsvorbehalt — must file Steuererklärung
- Elterngeldrechner at familienportal.de for planning

### 3. Update Step 4 cards (Raspodjela mjeseci, ~line 427)
Add comprehensive Lebensmonate rules from official source:
- Basiselterngeld only in first 14 Lebensmonate, after that only ElterngeldPlus/Partnerschaftsbonus
- One parent max 12 Basiselterngeld months
- Min 2 months per parent
- For births from 01.04.2024: simultaneous Basiselterngeld only 1 month in first 12 LM (exceptions: Frühgeborene 6+ weeks, Mehrlinge, Behinderung)
- After LM14: only ElterngeldPlus/Partnerschaftsbonus, max until LM32 (2 years 8 months), NO interruption allowed after LM14
- If simultaneous Basiselterngeld: counts as 2 months consumed
- Mutterschaftsgeld months = Basiselterngeld months (cannot take ElterngeldPlus/Partnerschaftsbonus in those months)
- Frühgeborene bonus: 6w early → +1, 8w → +2, 12w → +3, 16w → +4 additional Basiselterngeld months
- Concrete combination examples from official source

### 4. Update Step 5 cards (Einkommen, ~line 441)
Add:
- Max berücksichtigtes Netto: 2,770€ (even if actual income higher)
- Geringverdiener percentage scale details
- Entgeltersatzleistungen (Krankengeld, ALG) in Bemessungszeitraum rules

### 5. Minor updates to other metadata
- `commonMistakes`: Add "Steuererklärung nicht abgegeben trotz Elterngeldbezug", "Nach LM14 Bezug unterbrochen (danach kein Anspruch mehr)"

No other files affected. All changes within the `elterngeld` entry in `src/lib/guide-data.ts` (lines ~357-575).

