# BalkanLink Deutsch — Phase 2: audio quality (28.10.2026)

Targeted upgrade of the playback engine; no course rewrite. The 240 old lessons + 2 pilots, IDs, progress, levels A1–C2, languages, prices, sign-in, and the server function `generate-tts` are **unchanged** (nothing deployed). Not published.

## Baseline (read from source and database, read-only)
- Voice: ElevenLabs "Laura" (`FGY2WhTYpPnrIDTdsKH5`), model `eleven_multilingual_v2`, stability 0.5, similarity 0.75, style 0, speaker boost, MP3 44.1 kHz/128 kbps (`src/config/ttsConfig.ts`).
- Server `generate-tts`: requires a signed-in user; max 500 characters; storage cache key = SHA-256(`text|voice|model`) in the public `tts-audio` bucket (`tts/<hash>.mp3`); generates audio for new text on first request; daily cap through `reserve_usage("tts_generation")`.
- Database (read-only): `tts-audio` is **public**, holding 32 files (~1.1 MB) — so almost all lesson phrases have never been generated yet. `entitlement_settings.protective_caps_enforced = false` → the daily cap is **not currently enforced**.
- Client `useTTS`: speed 0.5–1.5 via `playbackRate` (persisted locally), browser voice as an emergency fallback **without any notice**, no stop on unmount, each instance played independently (could overlap), no voice choice, no "play the whole dialogue".

## Risks found (not changed on the server — needs owner approval + deployment)
1. The server accepts **any voiceId** and **any text** from a signed-in user → cost, and typed personal text could end up in the public bucket. Recommendation: allowlist voices and only allow lesson texts (e.g. a hash list) in `generate-tts`.
2. Daily cap switched off (`protective_caps_enforced = false`).
3. Cache key ignores voice settings (harmless as long as settings are fixed in code).

## Implemented (client)
- `src/lib/audio/audio-engine.ts`: voice allowlist (Laura + "George" `JBFqnCBsd6RMkjVDRZzb` as the second dialogue voice), cache identity text|voice|model, guard against personal-looking text (e-mail, IBAN, long digit strings → no request), speaker→voice assignment, one global player ("only one sound at a time").
- `useTTS` (all old and pilot lessons): `toggle(id, text, { voiceId, onEnded, allowFallback })`; stopping one player stops any other; **stops on unmount/leaving**; `usingFallback` and `audioError` flags; personal-looking text is refused.
- `ttsProvider`: voice per line (allowlisted), session cache per voice.
- `AudioPlayerParts`: `SpeedToggle` Normal/Slower (1.0/0.75, client playback rate only, **no new generation**), `AudioStatusNotice` (basic device voice / error shown clearly, 4 languages), `DialoguePlayer` (replay any sentence, "Play whole dialogue" in order, stop, speaker names, highlights the current line, **no browser fallback in dialogues**).
- Pilot lessons: speed switch + dialogue player with two separate voices (Maja/Frau Berger; Damir/Herr Wagner). Old lessons: status notice under the speaking section; their speed selector is unchanged.
- Labels `deutschTrainer.audio.*` in BS/HR/SR/DE, including a provider note (ElevenLabs, only lesson text).

## Cost
- **No audio was generated during this work** (no batch, no demo calls). A new line is generated only when a signed-in user taps it, then cached permanently. Pilot dialogues: 20 lines (10 of them with the second voice) + 23 vocabulary items — a one-off, very small amount. The 240 old lessons are not pre-generated.
- Slower playback creates no new audio.

## Not checked / limits
- **Audio quality not checked by listening** — neither Laura nor George. George is a premade multilingual voice with an English character; whether he sounds natural in German is unverified. Alternative: choose a German native voice from the library (owner decision; changing `SECOND_VOICE_ID` is enough).
- Question intonation relies only on the model and the question mark in the text; there is no pronunciation scoring, speech recognition or tutor.
- Real playback in the browser was not tried (fake session, backend blocked). The server changes recommended above were **not** made.

## Tests
- `src/lib/audio/audio-engine.test.ts` (6), `src/hooks/useTTS.test.tsx` (5: voice passed, no overlap, stop on unmount, privacy guard, onEnded), `src/components/trainer/audio/AudioPlayerParts.test.tsx` (5: dialogue order + voices + no fallback, stop, speed 0.75, fallback notice, 4 languages). Pilot tests adjusted.
- Browser (isolated fake session): pilot lesson at 390 px/1280 px, no horizontal scrolling, speed switch and dialogue player visible.
