

## Plan: Unified "Službene informacije" bottom section for all SmartGuide pages

### Overview
Replace the multiple-link bottom sections in both `SmartGuide.tsx` and `GuideDetail.tsx` with a single clean "Službene informacije" section containing informational text and one official link.

### Data layer: `src/lib/guide-data.ts`
- Add an `officialUrl` field to the `Guide` type — a single canonical official URL per guide
- For each guide, compute priority: `officialInfoUrl` > `onlineLink` > `officialPdf` (use whichever is available)
- Add a helper function `getOfficialUrl(guide: Guide): string` that returns the best available URL
- For guides like Kindergeld that lack `officialInfoUrl`, set it to the most relevant page (e.g., `https://www.arbeitsagentur.de/familie-und-kinder/kindergeld-beantragen`)

### `src/pages/SmartGuide.tsx` (lines 166-183)
Replace the entire "Official links" block with:
- A rounded card titled **"Službene informacije"**
- Paragraph text: *"Ovaj vodič temelji se na informacijama službenih njemačkih institucija. Za službeni formular i dodatne informacije posjeti službenu stranicu."*
- One link/button: "🔗 Otvori službenu stranicu" → opens the official URL in new tab
- Minimal styling consistent with existing cards

### `src/pages/GuideDetail.tsx` (lines 184-208)
Replace the entire Links `motion.div` block with the same unified section:
- Same title, text, and single link structure
- Keep the `motion.div` animation wrapper
- Remove all `liveLinks`, `showFallback`, `linkStyle`, `linkIcon`, `buttonLabels` logic
- Remove unused imports (`resolveGuideLinks`, `auditGuideLinks`, `Download`) and related `useMemo`/`useEffect`

### Cleanup
- Remove `linkIcon`, `linkStyle`, `buttonLabels`, `fallbackTexts` from `GuideDetail.tsx`
- Remove unused icon imports (`FileText`, `ExternalLink` from SmartGuide if no longer needed)

