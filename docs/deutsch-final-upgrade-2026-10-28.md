# BalkanLink Deutsch – course upgrade (2026-10-28)

Status: in Preview code only. Nothing has been published or deployed, and there were no backend, database, payment, auth or audio changes.

## 1. Before (verified by script against the source data)

| | A1 | A2 | B1 | B2 | C1 | C2 |
|---|---|---|---|---|---|---|
| Lessons | 40 | 40 | 40 | 40 | 40 | 40 |
| Static exercises (3 stages × 5) | 600 | 600 | 600 | 600 | 600 | 600 |
| Unique exercises in the level (question + answer) | 344 | 115 | 122 | 115 | 61 | 64 |
| Unique "important phrases" in the level (50 listed per lesson) | 149 | **50** | **50** | **50** | **50** | **50** |
| Unique common mistakes in the level | 63 | 12 | 12 | 9 | 6 | 6 |
| Free lessons in the UI (first 3) / `premium` flag | 3 / 30 | same | same | same | same | same |

Findings:
- From A2 to C2, every lesson in a level lists the **same 50 phrases**. Most exercises are templates with the topic name inserted, which produces ungrammatical sentences at C1/C2, e.g. „Du diskutierst über Medienberichte analysieren.“
- There are no lesson goals, no vocabulary with article and plural, no dialogue, no grammar explanation and no BS/HR/SR explanations. There was no partial resume and no spaced review.
- A lesson counted as complete only after a whole stage: 50 exercises for free users and up to 500 for paid users, with AI-generated batches.
- Every static legacy exercise is structurally valid: the answer exists among the options and sentence orders are permutations.

## 2. CEFR coverage matrix (topics against CEFR Global Scale / Companion Volume descriptors)

This is an honest content audit. It is not accreditation and not a mastery claim.

| Level | CEFR descriptor focus | Covered by legacy topics | Real gaps |
|---|---|---|---|
| A1 | Familiar everyday expressions; introduce self; simple questions about person, place, possessions | Strong set of everyday topics: doctor, shop, authorities, numbers/time, family, directions, transport | No explicit teaching of articles/gender, plural, verb conjugation or the alphabet; no listening comprehension; no writing (forms/short messages) |
| A2 | Routine tasks; immediate needs; describe background | Work contract, complaints, landlord, appointments, trips | Exercises are 70–80 % templated; no past-tense (Perfekt) or comparison grammar strand; no listening or writing |
| B1 | Main points of clear standard input; deal with travel/work situations; describe experiences and give reasons | Formal letters, interviews, tenancy, workplace | Templated; no subordinate-clause grammar progression; no extended reading or writing tasks |
| B2 | Main ideas of complex text; spontaneous interaction; clear detailed text and arguments | Negotiation, projects, feedback, conflict | Largely generic register advice instead of language; no connectors/passive/Konjunktiv strand; no argumentative writing |
| C1 | Demanding longer texts; implicit meaning; flexible effective use; well-structured text | Debate, media, law, science topics | About 61 unique exercises shared across 40 lessons; little real C1 language (nominal style, concessives, register shifts) |
| C2 | Understand virtually everything; summarise sources; fine shades of meaning | Linguistics/philosophy topics | About 64 unique exercises; topics are meta-linguistic rather than C2 language use; no summarising or mediation tasks |

Missing everywhere: graded listening, productive writing and speaking (by design: no microphone or AI scoring), and mediation tasks.

## 3. What was implemented

1. **One core lesson flow for all 240 lessons** (opened from the lesson page; deep link `?lesson=<id>&core=1`):
   - **Standardized lessons (7)**: goals, vocabulary with article and plural, an original dialogue with BS/HR/SR/DE translations, grammar explained in four languages, four deterministic exercise types with hints and explanations, and a repeat of missed items.
     - The A1 pilots are now attached to their legacy lessons: `a1-03` (Sich vorstellen) and `a1-04` (Wohnung).
     - New authored lessons: `a2-11` (weil-Sätze), `b1-08` (Passiv Präsens, Behördenbrief), `b2-02` (obwohl/trotzdem/deshalb, Konjunktiv II), `c1-05` (zwar … aber, einräumen, indem) and `c2-14` (idioms, register, fixedness).
   - **Legacy-adapted lessons (233)** follow the same structure: goals, key phrases, typical mistakes, **6 practice + 3 checkpoint** exercises, and one repeat of missed items. The exercises are a deterministic, validated, de-duplicated selection from the lesson's own data.
     - Items specific to the lesson are preferred over templates repeated in 4 or more lessons of the level.
     - Phrases and mistakes repeated in 4 or more lessons are **not shown** as if they belonged to the lesson.
     - Each of these lessons carries a visible notice that its vocabulary, dialogue and grammar are still being written. None of them is labelled "standardized".
2. **Core lessons are separate from extra practice.** Finishing the 9-item core completes the lesson. The existing Grundlagen/Anwendung/Realität stages remain as "Extra practice (optional)", with unchanged 50/500 limits, unchanged AI generation and unchanged permissions.
3. **Resume and spaced review**:
   - These are stored under a new key, `balkanlink_trainer_learning_v1`. The legacy `balkanlink_trainer` record and its server sync are not touched.
   - What is stored: the resume step, wrong-answer keys and Leitner boxes with intervals of 1, 3, 7 and 14 days. Typed text and personal data are never stored.
   - The overview now offers "Continue learning" and "Review (n)" (`?review=1`).
   - The reset dialog now explains exactly what gets deleted and also clears this new state.
4. **Overview**:
   - The old "A1 pilot" box has become "Standardized lessons (level)" and is shown on every level.
   - Each lesson card shows "Standardized" or "Core lesson + extra practice".
   - Tap targets are at least 44 px; there are progress bars, and the screen-reader labels have been translated.
5. **Not changed**: audio and the ElevenLabs integration, the `tts-audio` bucket, auth, subscriptions, pricing, lesson IDs and data, the progress format, and the rule of 3 free lessons per level. The A1 pilots stay reachable via `?pilot=` with their previous access.

## 4. Numbers: standardized vs legacy-adapted

- **Fully standardized: 7 of 242 entries** (7 legacy lessons, including the 2 former pilots). There is at least one per level.
- **Legacy-adapted core plus extra practice: 233 lessons.** This is not standardized pedagogy and is not reviewed as such.
- Even after preferring lesson-specific items, some core items are still generic templates: A1 0, A2 0, B1 45, B2 38, C1 125, C2 46 (out of 360 per level).
- Lessons without any lesson-specific key phrase: A1 38, and every lesson (40 of 40) at A2–C2.

## 5. Tests and checks

- New tests (19):
  - `src/lib/trainer/core/core-course.test.ts`: 240 IDs and 6 levels, the exercise and free/premium invariants, cap and validity and de-duplication for every lesson, the generic-content filter, deterministic scoring, the 7 standardized mappings, four-locale parity and solvable exercises, dialect checks on HR and SR, and label parity.
  - `learning-state.test.ts`: the separate key, corrupt-data tolerance, and the 1/3/7/14 schedule with demotion.
  - `CoreLessonView.test.tsx`: the full core flow with one miss, review scheduling, completion of the legacy ID, and resume.
- Full Vitest run: 1416/1418 in parallel. The 2 failures were the known letter-reply timing tests, which pass 12/12 when run alone. Build OK.
- Browser check, with test-only mocked sessions and no real login:
  - Screens: 390 px as a free user, and 390 px and 1280 px as a mocked member.
  - Lessons opened: a1-01, a2-11, b1-08, b2-05, c1-05 and c2-02, plus the German overview.
  - Results: no horizontal overflow and no page errors. Browser Back goes from the core lesson to the lesson page. The resume and review entries were written correctly.

## 6. Known gaps and limitations

- 233 lessons still need authored vocabulary, dialogue, grammar and four-language explanations. C1/C2 legacy exercises in particular need rewriting by a qualified author. This was not mass-generated, by design.
- Native-speaker proofreading of the 5 new lessons is still pending. They are original content and use fictional people and places.
- Resume and review live only on the device. Syncing them across devices would need a server schema change, which needs owner approval.
- Review covers missed items from legacy-adapted lessons only. Misses in standardized lessons are repeated within the session but are not yet scheduled.
- A legacy-adapted lesson can also be completed through an extra-practice stage, as before; this behaviour was kept for compatibility.
- Opening `?lesson=<id>` directly behaves as before: the lock is enforced by the lesson grid. This was not changed.
- No listening, writing, speaking or mediation tasks have been added.
- Costs: no paid API calls, no TTS generation and no new dependencies.
