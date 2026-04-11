/**
 * BalkanLink Language Policy
 *
 * i18n remains in codebase for future scalability.
 * Only Bosanski is currently active in production.
 * Language switcher is disabled in UI.
 * Other languages remain inactive until explicitly re-enabled.
 */
export const LANGUAGE_POLICY = {
  keepI18n: true,
  activeLanguage: "bs",
  showLanguageSwitcher: false,
  allowOtherLanguagesInUI: false,
  notes: [
    "Only Bosanski is currently active in production UI.",
    "No language switcher should be visible.",
    "Other languages remain in codebase for future use only.",
  ],
} as const;
