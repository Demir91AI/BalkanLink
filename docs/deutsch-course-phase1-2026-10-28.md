# BalkanLink Deutsch — Phase 1: A1 pilot (28.10.2026)

Baseline: `docs/deutsch-course-audit-2026-10-28.md`. Not published.

## Before → after
| | Before | After |
|---|---|---|
| A1 lessons | 40 (unchanged) | 40 + **2 pilot lessons** in their own section on the A1 tab |
| Other levels A2–C2 | 40 each | unchanged; nothing claims they are reworked |
| Lesson structure | 3 stages of exercises, explanations in German | Pilot: goals, 11–12 words with article/plural, dialogue with translation, grammar with examples, 8 exercises, review, completion screen |
| Explanation languages | UI only | Pilot content in BS/HR/SR/DE (DE: simple German explanations) |
| Progress | `useTrainerProgress` | unchanged; the pilot only calls `completeLesson("a1-pilot-0x")` — no new storage, no answers saved |
| Access/payments/sign-in | — | unchanged; pilot lessons sit behind the same `AuthGate` as the course and are not membership-locked |

## Live in preview
- `/deutsch-trainer` → tab A1 → section "A1 pilot: lessons from everyday life" with two cards; deep link `?pilot=a1-pilot-01` / `?pilot=a1-pilot-02`.
- **a1-pilot-01 "Sich vorstellen"** (12 min): signing up at a language school; heißen/kommen/wohnen in the present tense, W-questions with the verb in position 2, du vs. Sie; 12 words.
- **a1-pilot-02 "Eine Wohnung besichtigen"** (14 min): viewing a flat; der/die/das, ein/eine, plural die; Kaltmiete + Nebenkosten = Warmmiete, Kaution is one-off; 11 words.
- Exercise types: matching, filling a gap (one choice), choice, putting words in order. Tip on request, right/wrong feedback with the correct answer and an explanation. Every mistake is repeated once at the end ("Review"). Completion shows the number right on the first try and saves the lesson as complete.
- Audio: play buttons for words and dialogue lines use the existing voice (`useTTS`/`generate-tts`, permanent cache). The first time a new phrase is played, it is made once through the existing voice service and then cached. There are **no listening exercises and no speech assessment**.
- All examples are fictional (Maja Kovač, Damir Novak, Lindenstraße 12, Lindenweg 7).

## Only for the next phase
- More pilot topics (doctor's appointment, workplace), the rest of the A1 curriculum, A2–C1.
- Review spaced over several days (needs a decision about storage; today the review happens only within one session).
- Listening exercises with checked recordings; native-speaker proofreading of HR/SR.

## Tests
- `src/lib/trainer/pilot/a1-pilot-lessons.test.ts` (7): IDs don't clash with the 40 existing A1 lessons; structure (minutes, goals, 8–12 words, dialogue, grammar, ≥3 exercise types); four languages filled for every explanation; articles/plurals (das Zimmer/die Zimmer, die Bäder, die Länder, die Städte, Nebenkosten plural only); every answer right/wrong is decided correctly, 830 € total rent; review queue; UI labels identical in 4 languages + fallback.
- `src/components/trainer/pilot/PilotLessonView.test.tsx` (1): full run in Croatian with a deliberate mistake → review → "Lekcija završena", 7/8, `completeLesson("a1-pilot-01")` called.
- `src/test/phase1` (no-downgrade) still passes.
- Browser (isolated, fake session with blocked backend, **no real sign-in**): overview and lesson at 390 px and 1280 px, no horizontal scrolling (scrollWidth = viewport), no page errors. Signed-out visitors see the existing sign-up gate.
- Full Vitest: 51 files, 1,388/1,388 pass; preview build OK.

## Known limitations
- Only 2 of the planned 2–3 lessons (quality first).
- Audio quality and the first playback of new phrases were not tested in the browser (blocked backend).
- Old A1 lessons on the same topics are still there next to the pilot.
