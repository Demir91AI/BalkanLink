# BalkanLink Deutsch — baseline audit (28.10.2026)

Read-only audit made before the A1 pilot. Nothing listed here was removed or changed, except one optional `className` prop added to `AudioButton` (existing callers behave the same).

## Pages and routes
- `/deutsch-trainer` (`src/pages/DeutschTrainer.tsx`): hero, level pills A1–C2, level progress bar, reset button, lesson grid (9 per page), membership card. `?lesson=<id>&stage=<n>` opens a lesson; `?demo=1` opens the first A1 lesson.
- `/deutsch-trainer/faq`, `/deutsch-trainer/bonusbedingungen`; `/deutsch-trainer/preise` and `/deutsch` redirect.
- The lesson view (`TrainerLesson.tsx`) sits behind `AuthGate`.

## Content
- `src/lib/trainer/lessons-{a1..c2}.ts`: 40 lessons per level, 240 in total, lazy-loaded per level (`deutsch-trainer-data.ts`).
- Lesson = 3 stages (Grundlagen/Anwendung/Realität), exercises of 4 types: `multiple_choice`, `sort_sentence`, `fill_blank`, `quick_reaction`, plus `importantPhrases` and `commonMistakes`. Situations and explanations are written in German; there are no BS/HR/SR explanations inside the lesson content (only the surrounding UI is translated, via `pages.json → deutschTrainer`).
- No vocabulary list with article/plural, no dialogue, no separate grammar section, no CEFR objectives.
- `useGeneratedExercises` calls a server function (`supabase.functions.invoke`) to add generated exercises (existing feature, untouched).

## Access
- First 3 lessons per level are free (`FREE_LESSONS_PER_LEVEL`); after that `isPremium` decides. Inside a lesson: 50 exercises per stage free, 500 for members. No changes made.

## Progress / persistence
- `useTrainerProgress`: localStorage key `balkanlink_trainer` (`_v3` format) + the `trainer_progress` table (xp, streak, level, completed_lessons), with a merge on login and a debounced upsert. Only completed lesson IDs, XP and streak are stored — no answers.

## Audio
- `useTTS`: an ElevenLabs voice through the existing `generate-tts` server function. Audio is cached in the `tts-audio` storage bucket (never cleared) and in memory. The browser's built-in speech is used as an emergency fallback. `AudioButton` plays it. There is no speech recognition or pronunciation scoring.

## Tests before the pilot
- Only `src/test/phase1/no-downgrade.test.ts` pins trainer routes and storage keys. There were no content or exercise tests.

## Accessibility / UX notes
- Dark navy design. Exercise buttons are mostly accessible by role. In the existing `AudioButton` colours the play icon has low contrast on the dark background (the pilot passes stronger gold colours; the old lessons are unchanged).
- Some lessons with the same topic exist as old A1 lessons ("Sich vorstellen", "Wohnung suchen"); the pilot adds deeper, separate versions and does not replace them.
