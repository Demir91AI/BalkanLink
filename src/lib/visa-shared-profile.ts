/**
 * Shared visa profile — auto-fill across all visa Musterformulare.
 *
 * Common fields (Familienname, Pass, Adresse...) are stored in ONE LS key
 * so the user only types them once. Each route-specific Musterformular
 * merges this profile with its own data slice.
 *
 * Princip identičan kao Elterngeld/Kindergeld wizardi — jednom popuniš,
 * koristi se u svim formulаrima vize.
 */

export const VISA_SHARED_LS_KEY = "visa-shared-profile-v1";

export interface VisaSharedProfile {
  // Person
  familienname: string;
  geburtsname: string;
  vornamen: string;
  geburtsdatum: string;
  geburtsort: string;
  geburtsland: string;
  staatsangehoerigkeit: string;
  geschlecht: string;
  familienstand: string;
  // Pass
  passNr: string;
  passAusgestellt: string;
  passGueltigBis: string;
  passBehoerde: string;
  // Anschrift (DE)
  strasse: string;
  plz: string;
  ort: string;
  // Kontakt
  telefon: string;
  email: string;
}

export const EMPTY_VISA_PROFILE: VisaSharedProfile = {
  familienname: "", geburtsname: "", vornamen: "",
  geburtsdatum: "", geburtsort: "", geburtsland: "",
  staatsangehoerigkeit: "", geschlecht: "", familienstand: "",
  passNr: "", passAusgestellt: "", passGueltigBis: "", passBehoerde: "",
  strasse: "", plz: "", ort: "",
  telefon: "", email: "",
};

export function loadVisaProfile(): VisaSharedProfile {
  try {
    const s = localStorage.getItem(VISA_SHARED_LS_KEY);
    if (s) return { ...EMPTY_VISA_PROFILE, ...JSON.parse(s) };
  } catch { /* noop */ }
  return { ...EMPTY_VISA_PROFILE };
}

export function saveVisaProfile(profile: Partial<VisaSharedProfile>) {
  try {
    const current = loadVisaProfile();
    const merged = { ...current, ...profile };
    localStorage.setItem(VISA_SHARED_LS_KEY, JSON.stringify(merged));
  } catch { /* noop */ }
}

export function resetVisaProfile() {
  try { localStorage.removeItem(VISA_SHARED_LS_KEY); } catch { /* noop */ }
}

/**
 * Combine shared profile + form-specific extras into a single state object.
 * Used inside each visa Musterformular wizard.
 */
export function loadFormState<T extends Record<string, unknown>>(
  formLsKey: string,
  defaults: T,
): T & VisaSharedProfile {
  const profile = loadVisaProfile();
  let extras: Partial<T> = {};
  try {
    const s = localStorage.getItem(formLsKey);
    if (s) extras = JSON.parse(s);
  } catch { /* noop */ }
  return { ...defaults, ...profile, ...extras };
}

/** Save form state — splits into shared profile vs form-specific extras. */
export function saveFormState<T extends Record<string, unknown>>(
  formLsKey: string,
  state: T & VisaSharedProfile,
) {
  const profileKeys = Object.keys(EMPTY_VISA_PROFILE) as (keyof VisaSharedProfile)[];
  const profile: Partial<VisaSharedProfile> = {};
  const extras: Record<string, unknown> = {};
  for (const k of Object.keys(state)) {
    if (profileKeys.includes(k as keyof VisaSharedProfile)) {
      (profile as Record<string, unknown>)[k] = (state as Record<string, unknown>)[k];
    } else {
      extras[k] = (state as Record<string, unknown>)[k];
    }
  }
  saveVisaProfile(profile);
  try { localStorage.setItem(formLsKey, JSON.stringify(extras)); } catch { /* noop */ }
}
