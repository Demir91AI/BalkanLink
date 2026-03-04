

## Plan: Add explanatory text below "Oficijelni Rechner" title

**File**: `src/pages/Generatoren.tsx`

**Change**: Replace the existing short description on line 58 with the new two-line explanatory paragraph. The current `text-xs` line (`tools.officialDesc`) will be replaced with the hardcoded Bosnian text using `text-sm text-muted-foreground` styling for a slightly larger, readable paragraph below the title.

**Location**: Line 58, replace the existing `<p>` with the new text block containing both lines separated by `<br />`.

