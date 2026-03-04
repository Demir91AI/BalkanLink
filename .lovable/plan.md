

## Plan: Update "Bankovni račun" page

**Finding**: The current BaFin link (`basiskonto_node.html`) returns HTTP 404 — the page no longer exists.

**Action**: Since the link is dead and per your instruction ("ako ne radi izbrisi skroz direktni linkovi"), I will remove the entire "Direktni linkovi" section from the bottom of the page by setting `links` to an empty array.

**File to change**: `src/pages/dolazak/BankovniRacun.tsx` — change `links={[...]}` to `links={[]}`.

> Note: You mentioned "koristi ovaj link" but no new URL was included in your message. If you have a specific replacement link, please share it and I'll add it instead of removing the section.

