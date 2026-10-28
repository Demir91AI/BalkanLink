# Anerkennung Navigator — future notes (read-only audit)

`/anerkennung-navigator` (`src/pages/AnerkennungNavigator.tsx`, ~990 lines) is its own interactive tool reached from the FormCenter entry; FormCenter only redirects to it. Not changed.

Possible future work, only with owner approval:
- Re-verify each of the 14 profession routes and state authorities against anerkennung-in-deutschland.de, and add `verifiedOn` dates for each one.
- Optional SmartGuide-style "what to bring" checklist per profession, only if it is source-checked. Keep the existing navigator.
