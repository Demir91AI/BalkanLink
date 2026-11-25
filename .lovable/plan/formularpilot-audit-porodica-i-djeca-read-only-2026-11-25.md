# FormularPilot audit: Porodica i djeca (read-only)

Anlage SV is finished (commit e2b4335d). It is not running anymore. This plan covers research only: no code, database, user or billing changes, and no publishing.

## Scope
1. **Catalog inventory.** List every family service in the BalkanLink catalog: the `FAMILY_SLUGS`, the Kindergeld pilot, the hub cards and the existing manifests (KG1, KiZ1, Elterngeld, Mutterschaftsgeld BAS). Record each service's slug, route, the guide it uses and its current output type.
2. **Official sources per service.** For each service record:
   - jurisdiction (federal, state, local or insurance),
   - the official landing page,
   - the direct PDF or online route,
   - the edition and its effective date, and who it applies to,
   - the rights terms, or "unknown".
3. **PDF byte inspection.** Download each PDF to `/tmp` only. Record the full SHA-256, page count, field names, types and count, encryption and XFA. Group identical hashes and separate distinct templates. A form counts as compatible only after its bytes have been inspected.
4. **Status per item.** Each item gets one status:
   - verified (bytes inspected),
   - blocked (encrypted, XFA, online-only or superseded),
   - unverified (source not reachable).
   Each status comes with an evidence link and the check date.

## Batches (priority order; each batch reported as completed or partial)
- **A: Kindergeld (federal, Familienkasse).** KG1, Anlage Kind and the related Anlagen. Treaty states: BiH, Serbia, Montenegro, Kosovo. Croatia under EU rules. The online route is included too. Already known: KG1 is XFA or encrypted and stays blocked. This will be confirmed again.
- **B: Elterngeld, all 16 Länder.** Each state's authority and its application, including variants by child's date of birth, attachments and online options (ElterngeldDigital). Known: Bayern has 5 editions, and Berlin is encrypted.
- **C: Kinderzuschlag, Mutterschaftsgeld, Unterhaltsvorschuss.** KiZ is federal. Mutterschaftsgeld comes from the BAS or the person's Krankenkasse. UVG applications differ by state.
- **D: Local and regional benefits.** Kita and childcare, Bildung und Teilhabe (BuT), and regional benefits such as Bayern Krippengeld, Familiengeld and Landeserziehungsgeld. Wirtschaftliche Jugendhilfe is included too. Municipal forms are not listed exhaustively. Instead, the audit records a reliable official authority finder and a safe fallback: the guide plus an official link.

## Deliverables
- `docs/family-audit-2026-11-25.md`: the evidence-linked registry, gaps, duplicate hashes and what each blocker means.
- `docs/family-audit-2026-11-25.json`: the registry in machine-readable form.
- A recommended phased rollout using the shared strict engine:
  1. federal forms whose bytes are verified,
  2. state forms with a fail-closed rule: the state must be chosen explicitly, and its hash must match before anything is filled,
  3. guide plus official link for everything blocked or municipal.
- A Bosnian report giving actual coverage per batch, what remains open and credit use.

## Rules
- No circumvention of protected PDFs, and no hosting, bundling or proxying.
- Downloads go to `/tmp` only. No personal data.
- Rights stay "unknown" unless the publisher's terms are explicit.
- No implementation until the owner approves.

## Technical details
- Reuse the scan script pattern from 01.05 (pdf-lib field and type dump plus a check for `/Encrypt` and `/XFA`) and the existing official-source records.
- Look up primary sources on the issuer sites: arbeitsagentur.de/familie-und-kinder, familienportal.de, elterngeld-digital.de, each state's Elterngeld authority, bundesamtsozialesicherung.de, and each state's UVG portal.
- If the amount of work is too large for one turn, batches C and D are reported as not started rather than guessed.
