/**
 * <TranslationPendingBanner /> — DISABLED.
 *
 * Per Demir's apr 2026 directive: the platform must NEVER advertise
 * "translation pending" / "prijevod u tijeku" / "prevod u toku". All UI
 * strings for HR, SR and DE ship fully translated via the locale JSONs
 * (src/i18n/locales/{hr,sr,de}/*.json).
 *
 * The component is kept as a no-op so that existing imports and mount
 * points (Layout.tsx) keep compiling without ripple changes. If a
 * partial-translation workflow is ever reintroduced, restore the
 * previous render logic from git history.
 */
export default function TranslationPendingBanner() {
  return null;
}
