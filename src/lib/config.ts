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
  membershipYearly: "19,99 € godišnje (7 dana besplatno)",
  singleForm: "3.99€",
  proAd7Days: "2.99€",
  proAd30Days: "9.99€",
  firmBasic: "9.99€/mj.",
  firmFeatured: "19.99€/mj.",
  docCheck: "uključeno u članstvo (Fair Use)",
  vatNote: "Sve cijene bez PDV-a. §19 UStG.",
} as const;
