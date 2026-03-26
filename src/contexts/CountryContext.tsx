import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type CountryCode = "BIH" | "SRB" | "HR" | "ME" | "MK" | "XK" | "AL" | "SI";

export interface CountryInfo {
  code: CountryCode;
  flag: string;
  nameKey: string; // translation key
}

export const COUNTRIES: CountryInfo[] = [
  { code: "BIH", flag: "🇧🇦", nameKey: "country.BIH" },
  { code: "SRB", flag: "🇷🇸", nameKey: "country.SRB" },
  { code: "HR",  flag: "🇭🇷", nameKey: "country.HR" },
  { code: "ME",  flag: "🇲🇪", nameKey: "country.ME" },
  { code: "MK",  flag: "🇲🇰", nameKey: "country.MK" },
  { code: "XK",  flag: "🇽🇰", nameKey: "country.XK" },
  { code: "AL",  flag: "🇦🇱", nameKey: "country.AL" },
  { code: "SI",  flag: "🇸🇮", nameKey: "country.SI" },
];

interface CountryContextType {
  activeCountry: CountryCode;
  setActiveCountry: (code: CountryCode) => void;
  countries: typeof COUNTRIES;
}

const CountryContext = createContext<CountryContextType | undefined>(undefined);

export function CountryProvider({ children }: { children: ReactNode }) {
  const [activeCountry, setActiveCountryState] = useState<CountryCode>(() => {
    const saved = localStorage.getItem("balkanlink-country");
    return (saved as CountryCode) || "BIH";
  });

  const setActiveCountry = useCallback((code: CountryCode) => {
    setActiveCountryState(code);
    localStorage.setItem("balkanlink-country", code);
  }, []);

  return (
    <CountryContext.Provider value={{ activeCountry, setActiveCountry, countries: COUNTRIES }}>
      {children}
    </CountryContext.Provider>
  );
}

export function useCountry() {
  const ctx = useContext(CountryContext);
  if (!ctx) throw new Error("useCountry must be used within CountryProvider");
  return ctx;
}
