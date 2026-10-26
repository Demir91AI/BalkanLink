# BalkanLink 2.0 — Compliance Track (Urheberrecht, IP, Lizenzen, DSGVO)

Owner rule (non-negotiable): every current and future feature must be legally compliant. This is an audit and plan only. It is NOT a statement that the platform is compliant. Legal pages stay unchanged until a human legal reviewer and Demir approve.

Legend: Severity H/M/L. "Evidence" = seen in code this turn. "Unverified" = needs a document or answer from the owner.

## Where it fits in the master roadmap

- **C0 (runs alongside P0):** inventory and provenance register, and remove anything of unknown origin from new work.
- **C1 (before P1 FormularPilot ships):** form PDF rights check.
- **C2 (before P2 news/blog goes public):** editorial content rules built into the publishing workflow.
- **C3 (before P3/P4):** assistant, provider and data-processing checks.
- **C4:** legal text review by a lawyer, then the owner publishes.
- **Gate for every future change:** a new asset, service or text needs a provenance/licence entry and sign-off.

## 1. Assets (photos, logos, icons, fonts, audio)

| Risk | Location | Sev | Status | Mitigation | Sign-off |
|---|---|---|---|---|---|
| City and hero photos with unknown origin | `src/assets/hero-*.jpg` (14), `balkan-*.jpg`, `balkanci-*.jpg`, `src/assets/carousel/` | H | Evidence: files exist. Unverified: source/licence | Register each file with source, licence, author and attribution. Replace any of unknown origin with own or licensed images | Demir |
| Partner and advertiser logos and photos | `logo-aaa-fusspflege.png`, `logo-ecronix.jpg`, `logo-aluhome.jpg`, `logo-ameise-film.webp`, `ad-*`, `aaa-fusspflege-*`, `ecronix-slide-*`, `flow-ad-*` | H | Unverified: written permission from the businesses | Get written image and trademark permission from each advertiser and archive it. Remove any without permission | Demir |
| Generated images (earlier turns) | assets in `src/assets` | M | Unverified: which files are generated | Mark them in the register. Check the image provider's usage terms. Never imitate real people or brands | Demir |
| Google Fonts loaded from Google's servers (sends IP to Google; German courts have ruled against this, LG München 2022) | `src/components/vorlagen/VorlagenGenerator.tsx:103`, `src/pages/admin/AdminDashboard.tsx:462-464` | H | Evidence | Host the fonts ourselves (OFL licence allows it) and check `index.html`/CSS for other remote fonts | Dev + Demir |
| Icons/libraries (lucide, shadcn) | `package.json` | L | Evidence: MIT-style licences, unverified per package | Create a licence list for all packages (`bun pm ls` plus a licence scan) and keep notices | Dev |
| TTS audio (cached in `tts-audio`, never delete) | storage `tts-audio` | M | Unverified: ElevenLabs commercial licence for the plan in use | Confirm the plan allows commercial redistribution. Don't touch the stored files | Demir |
| Social images | `public/og-image.jpg`, `public/balkanlink-share-20260430.jpg`, `public/icons` | M | Unverified | Register provenance | Demir |

Rule: anything of unknown origin is rejected for new work. Existing items get flagged in the register and are not removed until Demir decides.

## 2. Articles and news (P2)

| Risk | Location | Sev | Status | Mitigation |
|---|---|---|---|---|
| Copying or scraping third-party articles | `editorial_articles` (DB only, empty) | H | Evidence: no public pages yet | Only original summaries. Short quotations only with a clear purpose and source (§51 UrhG). Always a source link. No wholesale import |
| Images in articles | not built | H | — | Own, licensed or official images with credit. Store the licence field per image |
| Law-status confusion | `editorial_validate()` trigger | M | Evidence: the trigger requires an official source, legal status and verification date | Add the statuses "proposed / adopted / in force", the date it takes effect, and a two-person review before publishing |
| Generated legal text published automatically | workflow | H | Evidence: publishing requires approval | Keep it manual. Generated text is only a draft and must be marked internally |

## 3. Government PDF forms (FormularPilot)

| Risk | Location | Sev | Status | Mitigation |
|---|---|---|---|---|
| 30 official forms hosted on our own server | `public/muster/*.pdf` (Bürgergeld + 11 Anlagen, Elterngeld per state, BAföG, …) | H | Evidence: self-hosted. Unverified: reuse conditions | For each form, record the official URL, issuer, version/date, hash and reuse statement (official works under §5 UrhG are often free to reuse, but check each one). Where unclear, link or download from the official site instead of hosting |
| Outdated versions | `check-pdf-versions` (monthly) | M | Evidence: the check exists (auth gap noted under P0) | If the hash differs, block filling (fail-closed, P1) |
| Implying official endorsement | form pages | M | Unverified wording | Add a visible note: "Nicht amtlich / no affiliation with the authority" |

## 4. Asistent and generated outputs

| Risk | Location | Sev | Status | Mitigation |
|---|---|---|---|---|
| Model providers' terms and data handling | `chat-assistant`, `document-check`, `nebenkosten-scan`, `generate-trainer-exercises` | H | Unverified: model provider terms, EU transfer, whether data is used for training | Document the provider, region, DPA/SCCs and retention. Add them to the privacy policy (after legal review) |
| Uploaded documents with personal data sent for analysis | `document-check`, `nebenkosten-scan` | H | Evidence: images go to the model | Only send what is needed, don't store or log the image, state the purpose, ask for consent before upload |
| Reproducing protected text | Asistent prompts | M | Unverified | System rule: no long verbatim copies of third-party works, summarise and link instead |
| "AI/KI/Hermes" naming | UI | L | Owner rule | Keep "BalkanLink Asistent". Still disclose automated generation where the law requires it (EU AI Act transparency) — needs legal input |

## 5. Third-party services and data processors

Services seen in code: Stripe (payments), ElevenLabs (voice), Google Places (import), Lovable Cloud (database/functions, eu-central-1), the email service, the model gateway, Google Fonts.

For each one record: commercial licence, API/data terms (e.g. Google Places rules on caching and attribution — `import-places` stores place data permanently, **H, unverified whether allowed**), costs/limits, DPA signed, international transfer basis, sub-processors. Output: a "Verzeichnis der Verarbeitungstätigkeiten" (record of processing) and a processor list. Sign-off: Demir.

## 6. User uploads

| Risk | Sev | Mitigation |
|---|---|---|
| Ownership/rights of uploaded content (ads, Q&A, reviews, document photos) | M | Terms clause: the user confirms their rights. Content is not passed on to others; moderation stays |
| Retention and deletion | H | Unverified: how long uploads and ad images are kept. Set retention per type, delete them when the account is deleted (`delete-account` exists — check that it removes stored files) |
| Storage access | H | Already open in P0: check storage rules for uploaded document images |

## 7. Legal text (review only, no edits)

Seen in code: `src/pages/Impressum.tsx`, `Datenschutz.tsx`, `CookieRichtlinie.tsx`, `Disclaimer.tsx`, `Nutzungsbedingungen.tsx`.

| Gap | Sev | Status |
|---|---|---|
| Datenschutz must list all processors, AI providers and payment — and the hosted Google Fonts once changed | H | Unverified against current services |
| One-time 19,90 € digital product: withdrawal (cancellation) notice for digital content, consent to immediate start and loss of the right to withdraw (§356 Abs. 5 BGB), order button text "zahlungspflichtig bestellen" | H | Unverified: no dedicated withdrawal page found by filename |
| AGB/Nutzungsbedingungen still mention the old subscriptions or credits | M | Unverified — old pricing wording is still elsewhere in the app |
| Disclaimer: no legal advice (RDG); no promise that applications will succeed | M | Check wording |
| Impressum details (§5 DDG), §19 UStG note | M | Check against current company details |

Rule: drafts are prepared, a German lawyer reviews them, then Demir approves before anything goes live. No invented legal assurances.

## 8. Consent, accessibility, trademarks, advertising claims

- **Cookies/consent:** no tracking scripts found (searched for gtag/plausible/hotjar/fbq). The consent banner must still cover the remote fonts, the Stripe scripts and any embeds. M.
- **Accessibility (BFSG since 28.06.2025, applies to e-commerce consumer services; exemption for micro-enterprises may apply — unverified):** run an accessibility check against WCAG 2.1 AA and publish an accessibility statement if required. M.
- **Trademarks:** names of agencies (Jobcenter, Familienkasse), partner logos and the "BalkanLink" mark itself — check the trademark register and use names descriptively only. M.
- **Advertising claims (UWG):** remove claims like "garantiert", "100 % korrekt", invented user numbers and invented testimonials. Live statistics must come from real data. Check the homepage, pricing and ads. M.

## Deliverables (in order, each needs approval)

1. Provenance register (spreadsheet in Files): every asset, form PDF, font, audio and service, with source, licence, attribution, permission proof and status.
2. Package licence report.
3. Processor/transfer list plus record of processing activities.
4. Form rights table for the 30 PDFs.
5. Editorial rules (§51 quotations, sources, law status) built into the admin workflow.
6. Fix list for code-only items: self-host the fonts, consent coverage, upload deletion. Separate approval, done in a draft.
7. Legal text review package for the lawyer. No edits until approved.

## Owner input needed

- Licence or source proof for the hero/city photos and for the partner/ad images.
- Written permissions from advertisers.
- Which ElevenLabs and Google Places plans you have, and the signed DPAs.
- Is the company a micro-enterprise (for the accessibility law)?
- Who is the legal reviewer?

## Technical notes

- Searches used this turn: `src/assets` (79 entries), `public/muster` (30 PDFs), `rg fonts.googleapis`, edge-function service search, `src/pages` legal filenames, tracker search.
- Not checked yet: the contents of the legal pages, `index.html` fonts, storage bucket policies, `delete-account` file removal, the Places caching rules.
