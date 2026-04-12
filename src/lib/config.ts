/**
 * Global admin/public mode switch.
 * Set to `true` for admin preview (all content unlocked).
 * Set to `false` before public deploy (real premium logic applies).
 */
export const IS_ADMIN_PREVIEW = true;

/**
 * Correct pricing constants for the entire platform.
 */
export const PRICING = {
  premiumMonthly: "9.99€/mj.",
  premiumYearly: "99.90€/god.",
  singleForm: "3.99€",
  proAd7Days: "2.99€",
  proAd30Days: "9.99€",
  firmBasic: "9.99€/mj.",
  firmFeatured: "19.99€/mj.",
  docCheck: "2.99€ / dokument",
  docCheckPremium: "1x dnevno gratis uz Premium",
  vatNote: "Sve cijene bez PDV-a. §19 UStG.",
} as const;
