/**
 * BalkanLink Language Policy
 *
 * Bilingual mode: Bosanski (default, root paths) + Deutsch (/de/* prefix).
 * Switcher is visible in the header (desktop) and at the top of the mobile sidebar drawer.
 *
 * For long-form Smart Guide bodies that have not yet been translated to German,
 * a TranslationPendingBanner is displayed on /de/* routes — they remain in Bosnian
 * until a dedicated translation pass is run.
 */
export const LANGUAGE_POLICY = {
  keepI18n: true,
  activeLanguages: ["bs", "de"] as const,
  defaultLanguage: "bs" as const,
  showLanguageSwitcher: true,
  germanRoutePrefix: "/de" as const,
  // Legacy fields kept for back-compat with code that may still read them.
  activeLanguage: "bs" as const,
  allowOtherLanguagesInUI: true,
  notes: [
    "BS at root paths, DE at /de/* paths.",
    "Native-name dropdown switcher in header + mobile sidebar.",
    "Untranslated guide bodies on /de/* show the TranslationPendingBanner.",
  ],
} as const;
