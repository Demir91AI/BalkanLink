/**
 * Dvojno Državljanstvo — strukturni podaci.
 *
 * Sav tekstualni sadržaj NIJE ovdje — živi u i18n namespace-u
 * `dvojnoDrzavljanstvo` (4 jezika: bs/de/hr/sr). Ovaj fajl drži samo
 * stabilne ID-jeve, zastavice (emoji) i listu sekcija po zemlji, te
 * status (utiče na boju badge-a).
 */

export type CitizenshipStatus = "ok" | "okEu" | "warning";

export interface CitizenshipCountry {
  /** Stabilni ID — odgovara ključu u `countries.<id>` u i18n namespace-u. */
  id: string;
  /** Emoji zastavica (4-u-1, isti za sve jezike). */
  flag: string;
  /** Status određuje boju badge-a (ok = zeleno, warning = žuto/amber). */
  status: CitizenshipStatus;
  /** Lista section ključeva — odgovaraju `countries.<id>.sections.<key>`. */
  sectionKeys: string[];
}

export const DVOJNO_DRZAVLJANSTVO_COUNTRIES: CitizenshipCountry[] = [
  {
    id: "bih",
    flag: "🇧🇦",
    status: "warning",
    sectionKeys: ["germanLaw", "bihLaw", "practical", "note"],
  },
  {
    id: "srbija",
    flag: "🇷🇸",
    status: "ok",
    sectionKeys: ["germanLaw", "ownLaw"],
  },
  {
    id: "kosovo",
    flag: "🇽🇰",
    status: "ok",
    sectionKeys: ["germanLaw", "ownLaw"],
  },
  {
    id: "hrvatska",
    flag: "🇭🇷",
    status: "okEu",
    sectionKeys: ["euStatus", "ownLaw"],
  },
  {
    id: "crnaGora",
    flag: "🇲🇪",
    status: "warning",
    sectionKeys: ["bothLaws"],
  },
  {
    id: "albanija",
    flag: "🇦🇱",
    status: "ok",
    sectionKeys: ["bothLaws"],
  },
  {
    id: "sjevernaMakedonija",
    flag: "🇲🇰",
    status: "ok",
    sectionKeys: ["bothLaws"],
  },
];

export const DEFAULT_COUNTRY_ID = "bih";
