

## Plan: Add informational note below results in Brutto-Netto Rechner

**File**: `src/pages/BruttoNettoRechner.tsx`

**Change**: Insert a small info note between the "Dein Ergebnis" card (ends at line 574) and the "Arbeitgeberkosten" card (starts at line 577).

The note will contain:
- `Info` icon from lucide-react
- Two-line text in Bosnian as specified
- Small font, muted grey color, consistent with existing styling

**Location**: After line 574 (closing `</div>` of results card), before line 576 (AG Kosten card).

