/**
 * Global admin/public mode switch.
 * Set to `true` for admin preview (all content unlocked).
 * Set to `false` before public deploy (real premium logic applies).
 */
export const IS_ADMIN_PREVIEW = false;

/**
 * Current membership only. Historical prices belong to billing reconciliation,
 * not public sales constants. User-facing copy lives in four locale namespaces.
 */
export const PRICING = {
  membershipYearly: "19,99 € godišnje (7 dana besplatno)",
  docCheck: "uključeno u članstvo (Fair Use)",
  vatNote: "Sve cijene bez PDV-a. §19 UStG.",
} as const;
