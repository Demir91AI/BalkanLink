

# Plan: Add Wohngeldrechner Link to Wohngeld Guide

## Change

### `src/lib/guide-data.ts` — line 1131

Replace the empty `officialPdf` or add the Wohngeldrechner URL. The most logical place is to add it alongside the existing links. Currently:
- `officialPdf: ""` (empty)
- `onlineLink` → verwaltung.bund.de
- `officialInfoUrl` → bmwsb.bund.de general page

**Update `officialPdf`** to point to the Wohngeldrechner:
```
officialPdf: "https://www.bmwsb.bund.de/DE/wohnen/wohngeld/wohngeldrechner/wohngeldrechner-2025_node.html"
```

Also update the references to the Wohngeldrechner in the step text (lines 1052 and 1099) to include the full URL instead of just "bmwsb.bund.de", so users can directly access it:
- DE step 4 (line 1052): mention the full link
- BS step 4 (line 1099): mention the full link
- EN step 4 (line 1116): mention the full link

This is a small metadata update — no structural changes needed.

