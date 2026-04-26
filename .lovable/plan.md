# Bilingual BalkanLink — Bosanski (default) + Deutsch at /de/*

## Scope confirmed with you
- **Policy override**: I will overwrite `src/config/language-policy.ts` and update `mem://architecture/language-hardcoding-policy` to allow BS + DE. Switcher becomes visible.
- **Translation depth**: Chrome (Header, Footer, AppSidebar, MobileBottomNav, AuthModal, NotFound) + 5 landing pages (Home/Index, /dokumenten-check, /viza, /deutsch-trainer, /nudim-trazim). All other pages stay Bosnian and show the translation-pending banner on `/de/*`.
- **Sitemap**: ~25 public canonical routes, bilingual.

---

## Audit findings

1. **Routes** (App.tsx ~80 entries): Home + Layout-wrapped pages + redirects + admin. Public canonicals to mirror: `/`, `/dolazak` + 10 children, `/zivot`, `/probleme`, `/formulari`, `/dokumenten-check`, `/viza`, `/deutsch-trainer` (+ preise/faq/bonusbedingungen), `/nudim-trazim`, `/vorlagen`, `/qa`, `/paketi`, `/kalkulatori`, `/zivot-u-njemackoj`, `/radno-pravo`, `/biznis`, `/mietrecht`, `/familie`, `/foerderungen`, `/wohnungen`, `/stellenangebote`, legal (`/impressum`, `/datenschutz`, `/agb`, `/disclaimer`, `/napomena-o-ki`, `/dsa`, `/cookie-richtlinie`).
2. **react-i18next**: NOT installed. Need `i18next`, `react-i18next`, `i18next-browser-languagedetector`.
3. **Header**: `src/components/layout/Header.tsx` — hamburger left, logo center, Premium CTA + UserCircle right. Nav lives in AppSidebar (drawer), not header. Will inject `<LanguageSwitcher />` between Premium CTA and UserCircle on desktop.
4. **Footer**: `src/components/layout/Footer.tsx` — hardcoded `NAV_LINKS`, `LEGAL_LINKS`, copy, copyright "© 2026 BalkanLink · Sva prava zadržana."
5. **Forms / inputs / buttons**: Spread across 267 .tsx files. We will translate ONLY the chrome + 5 landing pages per agreed scope; AuthModal, Login, Register, ForgotPassword, ResetPassword forms get their labels/validation translated.
6. **Toasts**: `useToast` from `@/hooks/use-toast` and `sonner` are used everywhere. Out of scope to retranslate every call site; only translate toasts inside the in-scope files (AuthModal, Header, the 5 landing pages, NotFound, LanguageSwitcher).
7. **SEO**: `src/components/SEO.tsx` exists with hardcoded `og:locale="bs_BA"` and Bosnian default title/description.
8. **shadcn DropdownMenu**: present at `src/components/ui/dropdown-menu.tsx` ✅ — will use it.

---

## Step 1 — Dependencies
Add via `bun add`: `i18next`, `react-i18next`, `i18next-browser-languagedetector`.

## Step 2 — i18n bootstrap

**`src/i18n/index.ts`** (new):
- `supportedLngs: ['bs','de']`, `fallbackLng: 'bs'`, `defaultNS: 'common'`.
- `ns: ['common','forms','pages','errors']`.
- Detection order: `localStorage`, `navigator`. localStorage key: `balkanlink-lang`.
- `react: { useSuspense: false }`.
- Resources imported statically from the 8 JSON files.
- `interpolation.escapeValue: false`.

**`src/main.tsx`**: add `import "./i18n";` BEFORE `import App`. Keep HelmetProvider.

## Step 3 — Locale JSON files
Create the 8 files exactly as specified in the prompt (bs/de × common/forms/pages/errors). German uses formal "Sie".

## Step 4 — Routing strategy

**`src/components/LanguageRouter.tsx`** (new) — mounted inside `<BrowserRouter>` and outside `<Routes>`:
- Reads `useLocation().pathname`.
- If pathname === `/de` or starts with `/de/` → `i18n.changeLanguage('de')`, `document.documentElement.lang='de'`, `localStorage.setItem('balkanlink-lang','de')`.
- Else → same with `'bs'`.

**Route mirroring in `src/App.tsx`**:
- Extract the existing `<Layout>` route children into a single array `LAYOUT_ROUTES = [{path,element}, …]`.
- Render `LAYOUT_ROUTES.flatMap(r => [<Route path={r.path} …/>, <Route path={`/de${r.path}`} …/>])`.
- Same pattern for the HomeLayout `/` (also generates `/de`).
- Skip mirroring for: `/admin/*` (admin stays single), `/payment-success`, `/placanje-uspjesno`, `/placanje-otkazano`, all `<Navigate>` redirects (those keep working from BS, but we add `/de`-prefixed redirects for the canonical ones only).
- 404 catch-all stays single.
- Add `<LanguageRouter />` right under `<ScrollToTop />`.

**Path mirroring helper** (`src/lib/i18n-paths.ts`):
- `mirrorPath(pathname, target: 'bs'|'de')`:
  - `/de` → `/`
  - `/de/foo/bar` → `/foo/bar`
  - `/foo/bar` (target de) → `/de/foo/bar`
  - `/` (target de) → `/de`

## Step 5 — Language dropdown

**`src/components/LanguageSwitcher.tsx`** (rewrite the existing file):
- Uses shadcn `DropdownMenu`.
- Trigger: `<button>` showing the active language NATIVE name (`Bosanski` or `Deutsch`) + `ChevronDown` (lucide). Styled to match the dark navy header glass aesthetic (rgba bg + 1px white/8% border, rounded-full, 7px 14px, 12px font, white/85 text).
- Content: two `DropdownMenuItem`s, each rendering its own native name unconditionally:
  - `Bosanski`
  - `Deutsch`
- Active item: gold `Check` icon (#D4AF37) on the right + thin gold left border (`border-l-2 border-[#D4AF37]`).
- Inactive hover: `bg-white/5`.
- On click: `i18n.changeLanguage(lang)`, then `navigate(mirrorPath(currentPath, lang))`, persist to localStorage, dropdown closes automatically (Radix handles Escape + outside click + fade/scale).
- Mobile: also rendered at the top of `AppSidebar` drawer (first item, separated by a divider).

**Header injection**: insert `<LanguageSwitcher />` in the `RIGHT` flex container, before the Premium CTA on `sm:` and up; on mobile it lives in the sidebar.

## Step 6 — Translate in-scope strings to t()

Files I will edit and the keys they use:
- **Header.tsx** — `nav.login` (UserCircle aria), Premium CTA gets a `nav.premiumActive`/`nav.becomePremium` (will add to `common.json` in both languages — DE: "Premium aktiv" / "Premium werden"). Admin badge stays "Admin".
- **Footer.tsx** — Replace `NAV_LINKS`/`LEGAL_LINKS` arrays to use t() at render time. Add new keys for "Navigacija", "Pravno", "Kontakt", "Načini plaćanja", tagline, copyright, "Tvoj vodič kroz njemački sistem" → `footer.brandTagline`, payments label, "Powered by RealCore" line. RealCore name + "BalkanLink" stay untranslated. Will add the missing keys to BOTH locale files.
- **AppSidebar.tsx** — section titles + nav items get t() via `common:nav.*` plus new section-title keys (added to JSON in both languages).
- **MobileBottomNav.tsx** — 5 tab labels via t().
- **AuthModal.tsx + Login + Register + ForgotPassword + ResetPassword** — labels (`forms:labels.*`), validation messages (`forms:validation.*`), submit/cancel buttons (`common:buttons.*`), error toasts (`errors:*`).
- **NotFound.tsx** — `pages:notFound.*`.
- **Index.tsx (home)** — hero headline/subline/CTAs (`pages:home.*`). Subsections that have heavy hardcoded copy (BeforeAfterSection, FeatureCards, etc.) stay Bosnian for now; banner doesn't apply since home is in the "translated" set, but per agreed scope only the hero + main CTAs get t() — I'll explicitly note the rest as out-of-scope leftovers in the deliverable.
- **DokumentenCheck.tsx**, **Viza.tsx**, **DeutschTrainer.tsx**, **NudimTrazim.tsx** — page H1 + subtitle + primary CTAs only (`pages:<page>.title`, `.subtitle`, plus per-page CTA keys added to JSON in both languages). Body content beyond the hero stays Bosnian for now (called out in deliverable).

I will NOT touch: muster forms, smart guides, asistent, trainer lessons, vorlagen, QA, biznis/radno-pravo/mietrecht hubs, dolazak/* pages, or any string outside the in-scope file list. Those rely on the translation-pending banner on `/de/*`.

## Step 7 — SEO component i18n

Rewrite `src/components/SEO.tsx`:
- Use `useTranslation()` to read current lang.
- `<html lang={lang}>` via `<html>` Helmet child.
- `og:locale` = `bs_BA` or `de_DE`.
- New props: accepts optional `titleKey`/`descKey` (preferred) OR existing `title`/`description` (kept for back-compat).
- `path` prop is the BS canonical path (no `/de`); component computes `bsHref`, `deHref`:
  - bs: `${BASE_URL}${path}`
  - de: `${BASE_URL}/de${path}` (with `/` → `/de`)
- Emits 3 alternates: `hreflang="bs"` → bsHref, `hreflang="de"` → deHref, `hreflang="x-default"` → bsHref.
- `canonical` = active-language URL.

## Step 8 — sitemap.xml regeneration

Replace `/public/sitemap.xml` with bilingual entries for the ~25 canonical public routes confirmed above. Each `<url>` carries 2 `<xhtml:link rel="alternate">` siblings. Both BS and DE versions listed (so both get crawled). `xmlns:xhtml="http://www.w3.org/1999/xhtml"` added to `<urlset>`. Priorities: home 1.0, hubs 0.9, guides/forms 0.8, legal 0.5.

## Step 9 — Translation-pending banner

**`src/components/TranslationPendingBanner.tsx`** (new):
- Subtle yellow info banner: `bg-[#FEF9C3]/10 border border-[#EAB308]/30 text-[#EAB308]`, fits dark theme.
- Reads `pages:translationBanner.title` + `.message` via t().
- Dismissible X button (component-local `useState`, no persistence — reappears on refresh/navigation).
- Mounted inside `Layout.tsx` above `<Outlet />`. Visibility logic:
  - Show only when `lang === 'de'` AND current pathname matches one of the "guide body" patterns:
    - `/de/formulari/:slug` (any slug)
    - `/de/musterformular/:slug`
    - `/de/dolazak/*` children (not `/de/dolazak` itself — that's a hub but still untranslated; keep banner ON for all `/de/dolazak` paths)
    - `/de/zivot`, `/de/probleme`, `/de/familie`, `/de/foerderungen`, `/de/wohnungen`, `/de/stellenangebote`, `/de/vorlagen` + `:slug`, `/de/qa` + `:id`, `/de/kalkulatori`, `/de/zivot-u-njemackoj`, `/de/radno-pravo` + `:slug`, `/de/biznis` + `:slug`, `/de/mietrecht`, `/de/bussgeld`, `/de/ai-asistent`, `/de/brutto-netto-rechner`, `/de/paketi`, `/de/premium`, `/de/profil*`, `/de/moji-podaci`, `/de/directory*`, `/de/ambasade-konzulati`, `/de/firma/:slug`, all legal pages.
  - Hide on: `/de`, `/de/dokumenten-check`, `/de/viza`, `/de/deutsch-trainer` (+ preise/faq/bonusbedingungen), `/de/nudim-trazim`.

## Step 10 — Policy + memory updates

- Rewrite `src/config/language-policy.ts`:
  ```ts
  export const LANGUAGE_POLICY = {
    keepI18n: true,
    activeLanguages: ["bs","de"] as const,
    defaultLanguage: "bs",
    showLanguageSwitcher: true,
    germanRoutePrefix: "/de",
  } as const;
  ```
- Update existing `src/contexts/LanguageContext.tsx` to remain a thin compatibility shim that delegates to react-i18next so existing `useLanguage()` callers don't break (its `t()` keeps working against `BS` table, `lang` reflects i18next).
- Update `mem://architecture/language-hardcoding-policy` to reflect bilingual mode.
- Update `mem://nav/sidebar-organization` to mention LanguageSwitcher placement.
- Update `mem://tech/seo/metadata-and-indexing` to record hreflang + bilingual sitemap.

---

## Files to be created (10)
1. `src/i18n/index.ts`
2. `src/i18n/locales/bs/common.json`
3. `src/i18n/locales/bs/forms.json`
4. `src/i18n/locales/bs/pages.json`
5. `src/i18n/locales/bs/errors.json`
6. `src/i18n/locales/de/common.json`
7. `src/i18n/locales/de/forms.json`
8. `src/i18n/locales/de/pages.json`
9. `src/i18n/locales/de/errors.json`
10. `src/components/TranslationPendingBanner.tsx`
11. `src/components/LanguageRouter.tsx`
12. `src/lib/i18n-paths.ts`

## Files to be edited (~16)
- `src/main.tsx` — i18n import
- `src/App.tsx` — route mirroring helper, mount LanguageRouter
- `src/config/language-policy.ts` — bilingual config
- `src/contexts/LanguageContext.tsx` — delegate to i18next
- `src/components/LanguageSwitcher.tsx` — full rewrite (native names, dropdown)
- `src/components/SEO.tsx` — hreflang + i18n
- `src/components/layout/Header.tsx` — inject switcher, t() Premium CTA
- `src/components/layout/Footer.tsx` — t() everywhere
- `src/components/layout/Layout.tsx` — mount TranslationPendingBanner
- `src/components/layout/AppSidebar.tsx` — t() nav, mobile switcher
- `src/components/layout/MobileBottomNav.tsx` — t() tabs
- `src/components/auth/AuthModal.tsx` — t() labels/validation/toasts
- `src/pages/Login.tsx`, `Register.tsx`, `ForgotPassword.tsx`, `ResetPassword.tsx` — t()
- `src/pages/NotFound.tsx` — t()
- `src/pages/Index.tsx` — t() hero only
- `src/pages/DokumentenCheck.tsx`, `Viza.tsx`, `DeutschTrainer.tsx`, `NudimTrazim.tsx` — t() H1 + subtitle + primary CTAs
- `public/sitemap.xml` — full regen (bilingual ~25 URLs × 2)
- `package.json` — 3 new deps (via `bun add`)

## Out of scope (will be reported as leftovers in deliverable)
- All Smart Guide bodies, muster forms, vorlagen, QA, asistent, trainer lessons.
- Dolazak/* page bodies, hub pages (radno-pravo, biznis, mietrecht), familie, foerderungen, wohnungen, stellenangebote.
- Index.tsx subsections beyond the hero (BeforeAfterSection, FeatureCards, WhatIsWhat, etc.).
- Toast strings in components outside the in-scope list.
- Legal pages bodies (Impressum/Datenschutz/AGB/etc. stay Bosnian; banner shows on /de/*).

These remain Bosnian; the translation-pending banner is the user-visible signal on /de/*.

## Manual test plan after deploy
1. Open `/` — Bosnian hero, header dropdown reads "Bosanski", `<html lang="bs">`.
2. Click dropdown → "Deutsch" — URL becomes `/de`, hero in German, `<html lang="de">`, dropdown reads "Deutsch", localStorage `balkanlink-lang=de`.
3. Click dropdown → "Bosanski" — URL returns to `/`, full Bosnian UI.
4. On `/de/login`, submit empty form — validation messages appear in German formal "Sie".
5. Visit `/de/formulari/buergergeld` — yellow translation-pending banner in German shows above page H1; dismiss with X; refresh page → banner reappears.
