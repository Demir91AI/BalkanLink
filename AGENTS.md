# AGENTS.md

- FormularPilot code lives in `src/lib/formularpilot/` and stays unwired from live pages until owner release approval — keeps production behaviour unchanged during 2.0.
- Every official-form fill pipeline is fail-closed: validate → preflight (hash + native fields) → edition gate → fill → read-back; never guess field names — prevents wrong or outdated forms reaching users.
- PDF field appearances use the locally bundled, hash-pinned Unicode font in `src/assets/fonts/` via `@pdf-lib/fontkit`; never load fonts remotely — BHS letters must print and no third-party font requests.
- Encrypted/XFA official forms are never decrypted or re-mapped; offer a clearly non-official answer sheet plus official links instead — respects publisher restrictions.
- `src/test/phase1/` pins routes, redirects, storage keys, hub imports, payment contract and family PDF mappings; update `baseline.json`/snapshots only with owner approval — prevents silent downgrades of legacy behaviour.
- Agency reply drafting is isolated in `src/lib/letter-reply/` and `src/components/letter-reply/`; shared visibility is unconditional in all builds but never grants access, entries inherit host access checks and drafts exist only in mounted component state — prepares owner-controlled publication without changing entitlements or retaining sensitive drafts.
- Sidebar agency replies use the existing localized Vorlagen `?task=reply` URL; only the overview handles it after subscription loading, and closing replaces only that query — preserves routes, access and browser history without reopening drafts.
