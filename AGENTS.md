# AGENTS.md

- FormularPilot code lives in `src/lib/formularpilot/` and stays unwired from live pages until owner release approval — keeps production behaviour unchanged during 2.0.
- Every official-form fill pipeline is fail-closed: validate → preflight (hash + native fields) → edition gate → fill → read-back; never guess field names — prevents wrong or outdated forms reaching users.
- PDF field appearances use the locally bundled, hash-pinned Unicode font in `src/assets/fonts/` via `@pdf-lib/fontkit`; never load fonts remotely — BHS letters must print and no third-party font requests.
- Encrypted/XFA official forms are never decrypted or re-mapped; offer a clearly non-official answer sheet plus official links instead — respects publisher restrictions.
