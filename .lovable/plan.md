

## Pomoć u Njemačkoj -- Grid Layout

Currently the 10 items in "Pomoć u Njemačkoj" are displayed as a single-column vertical list, making the section very long. The plan is to switch them to a compact tile/grid layout (similar to the existing Lifestyle section) so items sit side by side in rows.

### Changes

**File: `src/pages/Index.tsx`**

1. **Replace `SectionItem` rendering for `pomocItems`** -- instead of the current single-column list (`grid gap-0.5`), use a responsive grid: `grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4`

2. **Change tile style** -- each item becomes a compact card (like the Lifestyle tiles) with icon on top and label below, centered:
   - Rounded border container with hover effect
   - Icon in a circle/rounded-square at top center
   - Label text below, `text-xs font-medium`, centered, max 2 lines

3. This matches the existing Lifestyle section pattern already in the codebase, keeping the design consistent.

### Result
- 10 items will display as 2 columns on mobile, 3 on small tablets, reducing vertical height from ~10 rows to ~3-4 rows
- Consistent with the Lifestyle grid already on the page
- No new components or dependencies needed

### Technical Details

- Modify lines 142-144 in `Index.tsx`: change the grid wrapper from `grid gap-0.5` to `grid grid-cols-2 gap-2 sm:grid-cols-3`
- Render `pomocItems` using the same tile markup pattern as `lifestyleItems` (lines 189-199) instead of using `SectionItem`
- The `SectionItem` component can remain for any other usage or be removed if unused

