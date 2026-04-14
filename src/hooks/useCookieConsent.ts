import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "bl_cookie_consent";

export interface CookieConsent {
  consentGiven: boolean;
  consentVersion: string;
  consentUpdatedAt: string;
  analyticsConsent: boolean;
  marketingConsent: boolean;
  functionalConsent: boolean;
}

const CURRENT_VERSION = "1.0";

const DEFAULT_CONSENT: CookieConsent = {
  consentGiven: false,
  consentVersion: CURRENT_VERSION,
  consentUpdatedAt: "",
  analyticsConsent: false,
  marketingConsent: false,
  functionalConsent: false,
};

function load(): CookieConsent | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CookieConsent;
    if (!parsed.consentGiven) return null;
    return parsed;
  } catch {
    return null;
  }
}

function save(consent: CookieConsent) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
}

export function useCookieConsent() {
  const [consent, setConsent] = useState<CookieConsent>(() => load() ?? DEFAULT_CONSENT);
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

  useEffect(() => {
    const saved = load();
    if (saved) {
      setConsent(saved);
      setShowBanner(false);
    } else {
      setShowBanner(true);
    }
  }, []);

  const acceptAll = useCallback(() => {
    const c: CookieConsent = {
      consentGiven: true,
      consentVersion: CURRENT_VERSION,
      consentUpdatedAt: new Date().toISOString(),
      analyticsConsent: true,
      marketingConsent: true,
      functionalConsent: true,
    };
    save(c);
    setConsent(c);
    setShowBanner(false);
    setShowPreferences(false);
  }, []);

  const rejectOptional = useCallback(() => {
    const c: CookieConsent = {
      consentGiven: true,
      consentVersion: CURRENT_VERSION,
      consentUpdatedAt: new Date().toISOString(),
      analyticsConsent: false,
      marketingConsent: false,
      functionalConsent: false,
    };
    save(c);
    setConsent(c);
    setShowBanner(false);
    setShowPreferences(false);
  }, []);

  const saveCustom = useCallback((partial: Pick<CookieConsent, "analyticsConsent" | "marketingConsent" | "functionalConsent">) => {
    const c: CookieConsent = {
      consentGiven: true,
      consentVersion: CURRENT_VERSION,
      consentUpdatedAt: new Date().toISOString(),
      ...partial,
    };
    save(c);
    setConsent(c);
    setShowBanner(false);
    setShowPreferences(false);
  }, []);

  const openPreferences = useCallback(() => {
    setShowPreferences(true);
  }, []);

  const closePreferences = useCallback(() => {
    setShowPreferences(false);
    if (!consent.consentGiven) setShowBanner(true);
  }, [consent.consentGiven]);

  return {
    consent,
    showBanner,
    showPreferences,
    acceptAll,
    rejectOptional,
    saveCustom,
    openPreferences,
    closePreferences,
  };
}
