## Audit (Step 0)

**Bug 1 root cause:** `src/components/home/HeroSection.tsx` — the hero is rendered by this component, not `Index.tsx`. Every visible string is hardcoded:
- L20–22 — `trustBadges` array (Bosnian-only literals)
- L139 — headline `"Tvoj vodič kroz njemački sistem."`
- L150 — subline `"Formulari, zahtjevi i procedure objašnjeni jasno, strukturirano i na jednom mjestu."`
- L175 — primary CTA `"Pokreni vodič"`
- L190 — secondary CTA `"Pogledaj planove"`
- L201 — disclaimer `"BalkanLink nije pravni savjetnik. Sadržaj služi isključivo za orijentaciju."`

The component does **not** import `useTranslation` — that's why nothing switches. `de/pages.json` has a `home` block but with old/different keys (`heroHeadline`, `ctaPrimary`, `ctaSecondary`) that the hero never reads.

**Bug 2 root cause:** `src/components/LanguageSwitcher.tsx` renders `FlagBA` for the `bs` row and trigger (lines `Flag: FlagBA` in the LANGUAGES array, plus `<CurrentFlag>` in trigger and `<RowFlag>` in dropdown rows). Asymmetric removal needed.

**Other landing pages (Step 4 scan):** Most landing-page bodies (`Viza`, `DokumentenCheck`, `DeutschTrainer`, `NudimTrazim`) remain in Bosnian by design — they are still under the `TranslationPendingBanner` per prior scope. Index.tsx contains the FreemiumGate / pricing tables, also not in scope of this task. **Only the Hero section is in scope here** (the prompt explicitly lists the hero strings as Bug 1). Remaining Bosnian strings on those pages will be reported but not auto-translated unless they are simple CTAs that already have keys — to avoid creeping outside the approved "Chrome + landing pages" scope.

---

## Plan

### 1. Update locale JSON files

**`src/i18n/locales/bs/pages.json`** — replace the `home` block with:
```json
"home": {
  "heroHeadlineBeforeAccent": "Tvoj vodič kroz ",
  "heroHeadlineAccent": "njemački sistem",
  "heroHeadlineAfterAccent": ".",
  "heroSubline": "Formulari, zahtjevi i procedure objašnjeni jasno, strukturirano i na jednom mjestu.",
  "ctaPrimary": "Pokreni vodič",
  "ctaSecondary": "Pogledaj planove",
  "disclaimer": "BalkanLink nije pravni savjetnik. Sadržaj služi isključivo za orijentaciju.",
  "trustBadges": {
    "officialSources": "Službeni izvori",
    "updated": "Ažurirano 2026",
    "stepByStep": "Korak-po-korak vodiči"
  },
  "servicesTitle": "Naši servisi",
  "partnersTitle": "Naši partneri"
}
```
(Preserves `servicesTitle` / `partnersTitle` already used elsewhere.)

**`src/i18n/locales/de/pages.json`** — mirror with German:
```json
"home": {
  "heroHeadlineBeforeAccent": "Ihr Wegweiser durch das ",
  "heroHeadlineAccent": "deutsche System",
  "heroHeadlineAfterAccent": ".",
  "heroSubline": "Formulare, Anträge und Verfahren — klar, strukturiert und an einem Ort erklärt.",
  "ctaPrimary": "Leitfaden starten",
  "ctaSecondary": "Pläne ansehen",
  "disclaimer": "BalkanLink ist keine Rechtsberatung. Die Inhalte dienen ausschließlich der Orientierung.",
  "trustBadges": {
    "officialSources": "Offizielle Quellen",
    "updated": "Stand 2026",
    "stepByStep": "Schritt-für-Schritt-Leitfäden"
  },
  "servicesTitle": "Unsere Leistungen",
  "partnersTitle": "Unsere Partner"
}
```

### 2. Refactor `src/components/home/HeroSection.tsx`

- Add `import { useTranslation } from "react-i18next";`
- Add `import { useLocalizedNavigate } from "@/hooks/useLocalizedHref";` (replaces raw `useNavigate` so CTAs land on `/de/formulari` and `/de/paketi` when on /de).
- Inside component: `const { t } = useTranslation("pages");`
- Replace literals:
  - L139 headline → 3-span split with gold accent preserved on the middle span:
    ```tsx
    {t("home.heroHeadlineBeforeAccent")}
    <span style={{ color: "#D4AF37" }}>{t("home.heroHeadlineAccent")}</span>
    {t("home.heroHeadlineAfterAccent")}
    ```
    *(The current headline uses a full-text gradient, not a span accent. To preserve the visual treatment in both languages we keep the existing `WebkitBackgroundClip: "text"` gradient on the `<h1>` itself, which already paints the whole sentence in the white→gold gradient. The 3-span split is therefore wrapped inside the same gradient `<h1>` — no inner span color override needed. This honors the constraint "Color tokens, spacing, gold accent treatment — DO NOT TOUCH." We will simply concatenate the three keys inside the gradient h1: the gradient already ends in gold so `njemački sistem` / `deutsche System` naturally sits in the gold portion.)*
  - L150 subline → `{t("home.heroSubline")}`
  - L175 primary CTA → `{t("home.ctaPrimary")}`
  - L178 navigate path → `navigate("/formulari")` already; with `useLocalizedNavigate` it auto-prefixes `/de`.
  - L190 secondary CTA → `{t("home.ctaSecondary")}`
  - L201 disclaimer → `{t("home.disclaimer")}`
  - L19–23 trustBadges array → derive inside component:
    ```ts
    const trustBadges = [
      t("home.trustBadges.officialSources"),
      t("home.trustBadges.updated"),
      t("home.trustBadges.stepByStep"),
    ];
    ```

### 3. Update `src/components/LanguageSwitcher.tsx`

- Remove `FlagBA` import. Keep `FlagDE`.
- Update LANGUAGES array — `bs` entry has no `Flag`:
  ```ts
  const LANGUAGES: { code: SupportedLanguage; nativeName: string; Flag: FlagComp | null }[] = [
    { code: "bs", nativeName: "Bosanski", Flag: null },
    { code: "de", nativeName: "Deutsch", Flag: FlagDE },
  ];
  ```
- Trigger render: only render `<CurrentFlag width={20} />` when `CurrentFlag` is non-null. When `bs`, render nothing (text-only — keeps the same vertical alignment because the chevron and padding remain).
- Dropdown row render: when a row's Flag is null, render a `<span style={{ width: 20, display: "inline-block", flexShrink: 0 }} aria-hidden />` spacer so labels align across both rows.
- Add the design-rationale comment at the top of the LANGUAGES const, exactly as specified in Step 3 of the prompt.

### 4. Delete `src/components/flags/FlagBA.tsx`

No longer imported anywhere. Removing the file keeps the codebase clean.

### 5. Update memory

Append a note to `mem://style/flag-usage-standard` reflecting the asymmetric flag rule (DE flag yes, BiH flag no) so future sessions don't re-add it.

### Out of scope (explicitly NOT touched)

- `Index.tsx` body sections (FreemiumGate, pricing comparison) — those are gated under `TranslationPendingBanner` by prior scope.
- `Viza.tsx`, `DokumentenCheck.tsx`, `DeutschTrainer.tsx`, `NudimTrazim.tsx` body content — same reason. Their hero/title strings already come from `pages.json` (`pages:visa.title`, etc.) per prior work, but body copy is intentionally still Bosnian until the translation banner is removed.
- `ttsConfig.ts`, color tokens, layout, brand name, premium pricing copy.

### Files touched
- `src/i18n/locales/bs/pages.json` (modify)
- `src/i18n/locales/de/pages.json` (modify)
- `src/components/home/HeroSection.tsx` (modify)
- `src/components/LanguageSwitcher.tsx` (modify)
- `src/components/flags/FlagBA.tsx` (delete)
- `mem://style/flag-usage-standard` (update)

### Verification after deploy
1. Visit `/de` → headline `Ihr Wegweiser durch das deutsche System.` rendered in white→gold gradient (existing styling preserved).
2. Subline + both CTAs + disclaimer + 3 badges all in German.
3. Switcher trigger on `/de` → `[DE flag] Deutsch`.
4. Open dropdown → `[DE flag] Deutsch ✓` and `[20px spacer] Bosanski` (labels left-aligned identically).
5. Switch to `/` → trigger reads `Bosanski` (no flag), and the same dropdown alignment applies.
6. CTAs on `/de` route to `/de/formulari` and `/de/paketi` (via `useLocalizedNavigate`).