# BalkanLink 2.0 — Phase 0 Audit and Phased Plan

Read-only audit. Nothing is edited, migrated, deployed or priced in this step.

## A) Baseline (what exists today)

| Area | Status | Evidence |
|---|---|---|
| Pages / routing (4 languages, ~200 routes) | Implemented | `src/App.tsx`, `LanguageRouter` |
| SmartGuide V1/V2 + ~30 guide contents | Implemented, keep as is | `src/components/guides/*` |
| Original-PDF filling (Kindergeld, Bürgergeld + 11 Anlagen, Elterngeld per Land, BAföG, KiZ, IK, EZB, Mutterschaftsgeld) | Implemented, partially safe | `src/lib/pdf-form-engine.ts`, `pdf-fill-*.ts` |
| PDF version monitor | Partial (detects changes, does not block filling) | `check-pdf-versions`, `external_pdf_versions` |
| Asistent (chat) | Implemented, separate from doc check/forms | `chat-assistant`, `src/components/chat/*` |
| Document check | Implemented, separate flow | `document-check`, `DokumentenCheck.tsx` |
| Stripe: one product only (Plus 19,90€ one-time); 1,99€ check removed in code | Implemented in repo; live status of last half-finished change unverified | `_shared/products.ts` |
| Legacy monthly subscribers (2) | Preserved | `is_legacy_doccheck_user`, webhook |
| News/blog storage (articles, revisions, approval rules, source rules) | Database only | `editorial_articles`, `editorial_validate()` |
| News/blog pages, admin editor, sitemap/SEO | Missing | no pages in `src/pages` |
| Usage limits for assistant / doc check | Partial (chat daily count only) | `chat_usage`, `get_daily_chat_count` |
| Automated legal-change monitoring with human approval | Missing (only PDF headers checked) | — |
| Visual regression tests | Minimal (one flag test) | `tests/visual/` |

## B) P0 safety issues (fix first)

1. **Build state of last two unfinished turns** — previous reports said `DokumentenCheck.tsx` fails to build; verify, then fix. Also confirm the published site still matches what Stripe charges (1,99€ check was removed from code but may still be live).
2. **Public endpoints without login check** (`verify_jwt=false`): `chat-assistant`, `document-check`, `generate-tts`, `import-places`, `preview-transactional-email`. Each must verify the user in code, or be admin/cron-only. `import-places` and `preview-transactional-email` most risky (cost / data exposure).
3. **2 critical security scan findings** still open — read results and fix.
4. **~18 SECURITY DEFINER functions callable by signed-in users** — revoke where not needed (e.g. `grant_doc_check_credit`, `consume_doc_check`, `deactivate_*`, `purge_*`).
5. **Uploaded documents** — confirm document check images are not stored; if stored, add owner-only storage rules and automatic deletion.
6. **PDF filling does not fail closed** — missing fields only produce a console warning; a changed official PDF still gets filled.
7. **Asistent/doc check provider transparency** — keep it in Datenschutz (legal page, untouched without go-ahead).

## C) Roadmap

**P0 — Safety and baseline (1–2 sessions, no cost)**
- Files: `DokumentenCheck.tsx`, the 5 functions above, one migration with REVOKEs, `pdf-form-engine.ts`.
- Baseline: create a Lovable draft for all 2.0 work; record screenshots of top 20 pages as reference.
- Accept: build clean, security scan without critical issues, all endpoints reject anonymous calls where intended.
- Risk: tightening checks can break the assistant for signed-out visitors — test both states.

**P1 — FormularPilot foundation (2–3 sessions)**
- New `src/lib/formularpilot/` registry: per form source URL, approved hash, version date, field list with types/required flags.
- Engine refuses to fill when hash differs or a required field is missing; shows "unknown" fields explicitly.
- Tests: fill each PDF, read values back, compare; screenshot compare first page.
- Accept: every existing form passes read-back test; changed PDF is blocked with a clear message.

**P2 — News and blog (2 sessions)**
- Pages: news index, blog index, category pages (Arbeit, Aufenthalt, Familie, Steuern, Sozialleistungen, Alltag), article page; admin editor with draft → review → approved → published.
- Sitemap and search titles; all text in 4 languages.
- Accept: only approved articles visible; law-change article needs official source.

**P3 — One unified Asistent (3 sessions)**
- One entry with 3 tasks: explain a letter, draft a reply, fill a form (FormularPilot); document check as a task inside it; "Napredna pomoć" as richer option.
- Replace public "AI/KI" wording (5 hits in BS files, check all locales).
- Accept: no public "AI/KI/Hermes" text outside Datenschutz.

**P4 — Usage limits and costs (1–2 sessions)**
- Server-side per-user daily limits, file size/type limits, request rate limits, cache, cheaper model for simple tasks; user sees "X of Y left today".
- Pay-per-task stays out until the owner decides.

**P5 — Look and feel + automation (ongoing)**
- Polished cards, 3 clear entry tasks on home, gentle CSS animations respecting reduced motion; no fake counts.
- Legal-change monitoring (n8n/LangGraph evaluated only, not connected) feeding the editorial queue with mandatory approval.
- Price change to 9,99€ one-time only after a separate approved plan (new Stripe price, existing buyers keep access).

## D) First small reversible change

Fix the build on the Document Check page and add a read-only "missing required fields" result to `pdf-form-engine.ts` (returned, not yet enforced). No payments, data or published site affected.

## E) Contradictions to fix in documentation later

- Project knowledge: "Premium 9.99€/month or 99.90€/year" and "DeutschTrainer per-level 5€" — outdated; code sells 19,90€ one-time; owner direction now 9,99€ one-time.
- Knowledge "Premium gating temporarily disabled / DEV_MODE": `IS_ADMIN_PREVIEW = false`, so gating is active.
- Memory "Dokumenten-Check 2.99€ or 1/day free Premium" and "1,99€ per check" — both outdated vs latest code.
- Memory "Launch Trial until 31.05.2026" and "Featured package 14.99€" vs code 19.99€ — outdated.
- Knowledge "no localStorage" vs memory "Save for Later uses localStorage" and cookie consent.
- Memory "Spam protection: Turnstile" vs "No Turnstile" rule.
- Recommendation: after P0, rewrite the pricing/access memories and project knowledge in one pass.

## Technical notes
- All work in a draft first; published site unchanged until approval.
- Never touch the two legacy subscriptions, `tts-audio`, or legal pages without go-ahead.
