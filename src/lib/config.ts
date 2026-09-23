/**
 * Global admin/public mode switch.
 * Set to `true` for admin preview (all content unlocked).
 * Set to `false` before public deploy (real premium logic applies).
 */
export const IS_ADMIN_PREVIEW = false;

/**
 * Correct pricing constants for the entire platform.
 */
export const PRICING = {
  plusOneTime: "19,90€ jednokratno",
  singleForm: "3.99€",
  proAd7Days: "2.99€",
  proAd30Days: "9.99€",
  firmBasic: "9.99€/mj.",
  firmFeatured: "19.99€/mj.",
  docCheck: "1,99€ / provjera",
  vatNote: "Sve cijene bez PDV-a. §19 UStG.",
} as const;
