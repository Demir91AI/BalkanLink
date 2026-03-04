

# Plan: Add "Bayerisches Krippengeld" Guide to Socijalna pomoć

## Summary
Add a new comprehensive guide for Bayerisches Krippengeld (Bavaria's childcare subsidy) under the "Socijalna pomoć" category, based on official ZBFS data and the uploaded application form.

## Key Facts (from ZBFS sources)
- Up to **100€/month** per child, ages 1-3 (until Aug 31 of year child turns 3)
- Income limit: **60,000€** + 5,000€ per additional child receiving Kindergeld
- Child must be in **BayKiBiG-funded** childcare
- Parents must **pay fees themselves** (not covered by Jugendamt etc.)
- Child must be **born before 01.01.2025**
- Application: written (paper or online) to ZBFS
- Same form for all 3 regions, different postal addresses
- Both parents must sign (unless single parent)
- Required docs: ID copy, childcare contract (Betreuungsvertrag)
- Can be combined with Elterngeld and Familiengeld
- NOT for recipients of Bürgergeld, Wohngeld, Kinderzuschlag, Asylbewerberleistungen (those should apply for Jugendhilfe instead)

## Changes

### 1. `src/lib/guide-data.ts` — Add new guide entry

New guide object with slug `"krippengeld-bayern"`, category `"familie"` (since it's a family benefit related to childcare).

**Steps based on the application form (8 steps):**
1. Angaben zum Kind (child's data: name, DOB, gender, Steuer-ID)
2. Angaben zur Betreuung (childcare facility: name, BayKiBiG status, start date, monthly fee)
3. Angaben zur antragstellenden Person (applicant: name, DOB, address, nationality, Steuer-ID)
4. Angaben zum anderen Elternteil / Partner (other parent/partner data)
5. Einkommensgrenze (income declaration: confirm under 60,000€ + 5,000€ per child)
6. Bankverbindung (IBAN, account holder)
7. Weitere Kinder im Kindergeldbezug (additional children for income threshold calculation)
8. Unterschrift (signature — both parents required)

Each BS step gets full 6-card layout (whatToWrite, whereToFind, format, commonMistakes, whenToLeaveEmpty, example). DE and EN steps get basic field+instruction.

**Regional postal addresses** included in `authority` field:
- Schwaben & Oberbayern → ZBFS Region Schwaben, 86135 Augsburg
- Niederbayern & Mittelfranken → ZBFS Region Niederbayern, 84026 Landshut
- Oberfranken, Unterfranken & Oberpfalz → ZBFS Region Unterfranken, 97025 Würzburg

### 2. `src/pages/FormCenter.tsx` — Add slug to socijalna category

Add `"krippengeld-bayern"` to the `socijalna` slugs array:
```
slugs: ["buergergeld", "wohngeld", "bafoeg", "krippengeld-bayern"]
```

### 3. No icon changes needed (per user's previous instruction)

## No other files affected
Routing handles `/formulari/krippengeld-bayern` automatically via existing dynamic route.

