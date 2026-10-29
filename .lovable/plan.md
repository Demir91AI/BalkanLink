# Bringing back the homepage top section with cities, modernised

## What the old version looked like (before 29.10.2026)
- Full-screen photo slideshow of 10 German cities (Frankfurt, Berlin, München, Hamburg, Köln, Freilassing, Stuttgart, Düsseldorf, Nürnberg, Leipzig), slowly zooming in, with a darkened edge and a navy fade at the bottom. All 12 photos are still in the app.
- Large white-to-gold headline: "Tvoj vodič kroz njemački sistem." plus a one-line subtitle.
- Two buttons ("Pokreni vodič", "Pogledaj planove"), a "Šta je BalkanLink" link, trust badges and an assistant question box with rotating examples.
- Problems at the time: invented live counters ("X korisnika aktivno u Berlinu"), a large amount of animation, a plans button straight on the homepage, and a total of about 645 lines.

## What it looks like now
- No photos: dark background with a gold glow and a fine grid, the question "Šta želiš riješiti danas?", a question box, 6 category tiles and 2 SmartGuide links. Functional, but it lost the recognisable "Germany" feel.

## What I suggest (the minimal return)
1. **City photos come back as the background** of the top section, with the same order and the slow cross-fade. The zoom only plays when the device doesn't have "reduce motion" switched on. Only the first photo loads straight away, the rest later.
2. **Better readability:** a stronger dark layer behind the text so white and gold pass contrast checks on every photo.
3. **Headline:** the old "Tvoj vodič kroz njemački sistem." with the gold-accented word, in a slightly smaller, sharper size on phones. The current "Šta želiš riješiti danas?" moves to the label above the question box.
4. **Main action = the assistant:** one large question box with a gold "Pitaj" button, opening the existing assistant. One quiet second link: "Sve usluge". No plans button at the top.
5. **The 6 category tiles and 2 SmartGuide links stay**, directly below the photo (on desktop as a 3x2 grid overlapping the bottom of the photo, on phones as a 2x3 grid).
6. **Small city label** in the corner (for example "FRANKFURT") and small dots to switch photos, usable with keyboard.
7. **Sizes:** on phones about 70% of the screen high, so the categories are visible without scrolling; on tablet and desktop at most about 80%. Tested at 340, 390, 768 and 1280 px, and as an installed app.

## What will not come back
- Invented counters or "users active in…" lines
- Bottom bar on phones
- Rotating promo banner
- Plans/price button at the top
- Sparkle animations
- Popup

## Technical details
- Files: `src/components/home/HeroSection.tsx` (photo layer + headline; question box and tiles stay); `src/components/home/home-phase1.test.ts` (no counters, no bottom bar, existing routes, photo alt text); if needed a few new texts in the four `pages.json` language files (existing headline texts are reused).
- `src/pages/Index.tsx` and the assistant are not touched. Nothing gets published.
- Photos: reuse existing `public/assets/hero-*.jpg/webp` (the source and licence of these photos must be confirmed before release, under the legal rule).
