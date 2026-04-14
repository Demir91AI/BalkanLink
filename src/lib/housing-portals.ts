const enc = encodeURIComponent;

export interface HousingPortal {
  name: string;
  desc: string;
  buildUrl: (city: string, query?: string) => string;
}

/* ── Hauptportale ────────────────────────────── */
export const PORTALE_HAUPT: HousingPortal[] = [
  {
    name: "ImmobilienScout24",
    desc: "Najveći portal za stanove u Njemačkoj",
    buildUrl: (c) => `https://www.immobilienscout24.de/Suche/de/${enc(c)}/wohnung-mieten`,
  },
  {
    name: "Immowelt",
    desc: "Širok izbor stanova u svim gradovima",
    buildUrl: (c) => `https://www.immowelt.de/liste/${enc(c.toLowerCase())}/wohnungen/mieten`,
  },
  {
    name: "Immonet",
    desc: "Klasičan njemački portal za nekretnine",
    buildUrl: () => `https://www.immonet.de/wohnung/mieten.html`,
  },
  {
    name: "Kleinanzeigen",
    desc: "Privatni oglasi – često bez provizije",
    buildUrl: (c) => `https://www.kleinanzeigen.de/s-wohnung-mieten/${enc(c.toLowerCase())}/k0`,
  },
  {
    name: "Meinestadt",
    desc: "Regionalni portal za lokalne stanove",
    buildUrl: (c) => `https://www.meinestadt.de/${enc(c.toLowerCase())}/immobilien/wohnungen`,
  },
  {
    name: "Wohnungsboerse.net",
    desc: "Besplatni oglasi bez provizije",
    buildUrl: () => `https://www.wohnungsboerse.net/suche`,
  },
  {
    name: "Kalaydo",
    desc: "Regionalni portal za zapadnu Njemačku",
    buildUrl: () => `https://www.kalaydo.de/immobilien/wohnungen/mieten/`,
  },
];

/* ── WG / Sobe ───────────────────────────────── */
export const PORTALE_WG: HousingPortal[] = [
  {
    name: "WG-Gesucht",
    desc: "Najveći portal za zajedničke stanove (WG)",
    buildUrl: () => `https://www.wg-gesucht.de`,
  },
  {
    name: "Studenten-WG",
    desc: "Sobe za studente u cijeloj Njemačkoj",
    buildUrl: () => `https://www.studenten-wg.de`,
  },
  {
    name: "HousingAnywhere",
    desc: "Međunarodni portal – engleski oglasi",
    buildUrl: () => `https://housinganywhere.com/`,
  },
  {
    name: "Spotahome",
    desc: "Online obilazak stana prije useljenja",
    buildUrl: () => `https://www.spotahome.com/`,
  },
  {
    name: "Uniplaces",
    desc: "Sobe i stanovi za studente",
    buildUrl: () => `https://www.uniplaces.com/accommodation/germany`,
  },
];

/* ── Kratkoročno / Möbliert ──────────────────── */
export const PORTALE_KURZZEIT: HousingPortal[] = [
  {
    name: "Wunderflats",
    desc: "Namješteni stanovi – s Anmeldung mogućnošću",
    buildUrl: (c) => `https://wunderflats.com/en/furnished-apartments/${enc(c.toLowerCase())}`,
  },
  {
    name: "HomeCompany",
    desc: "Privremeni stanovi za profesionalce",
    buildUrl: () => `https://www.homecompany.de`,
  },
  {
    name: "Monteurzimmer.de",
    desc: "Sobe za radnike i majstore",
    buildUrl: () => `https://www.monteurzimmer.de`,
  },
  {
    name: "Airbnb (mjesečno)",
    desc: "Duži boravci sa popustom",
    buildUrl: (c) => `https://www.airbnb.de/s/${enc(c)}/homes?min_nights=28`,
  },
];

/* ── Filter types ────────────────────────────── */
export interface HousingFilters {
  city: string;
  umkreis: string;
  maxMiete: string;
  tip: string; // "stan" | "wg" | ""
  bezProvizije: boolean;
  kratkorocno: boolean;
  namjesteno: boolean;
  anmeldung: boolean;
}

export const MIETE_OPTIONS = ["300", "400", "500", "600", "700", "800", "1000", "1200", "1500", "2000"];

/* ── Smart search logic ──────────────────────── */
export interface SmartHousingResult {
  portal: HousingPortal;
  url: string;
  tag: string;
}

export function getHousingCity(f: HousingFilters): string {
  return f.city || "Deutschland";
}

export function generateHousingResults(f: HousingFilters): SmartHousingResult[] {
  const city = getHousingCity(f);
  const results: SmartHousingResult[] = [];

  const isWg = f.tip === "wg";
  const isKurz = f.kratkorocno;

  // Main portals (always, unless WG-only)
  if (!isWg) {
    for (const p of PORTALE_HAUPT.slice(0, 4)) {
      results.push({ portal: p, url: p.buildUrl(city), tag: "haupt" });
    }
  }

  // WG portals
  if (isWg || !f.tip) {
    for (const p of PORTALE_WG.slice(0, isWg ? 4 : 2)) {
      results.push({ portal: p, url: p.buildUrl(city), tag: "wg" });
    }
  }

  // Kurzzeit / Möbliert
  if (isKurz || f.namjesteno || f.anmeldung) {
    for (const p of PORTALE_KURZZEIT.slice(0, 3)) {
      results.push({ portal: p, url: p.buildUrl(city), tag: "kurzzeit" });
    }
  }

  // If no special filters, add Kleinanzeigen for provisionsfrei
  if (f.bezProvizije) {
    const ka = PORTALE_HAUPT.find((p) => p.name === "Kleinanzeigen");
    if (ka && !results.some((r) => r.portal.name === ka.name)) {
      results.push({ portal: ka, url: ka.buildUrl(city), tag: "haupt" });
    }
    const wb = PORTALE_HAUPT.find((p) => p.name === "Wohnungsboerse.net");
    if (wb && !results.some((r) => r.portal.name === wb.name)) {
      results.push({ portal: wb, url: wb.buildUrl(city), tag: "haupt" });
    }
  }

  // Fallback: if nothing matched, show top portals
  if (results.length === 0) {
    for (const p of PORTALE_HAUPT.slice(0, 5)) {
      results.push({ portal: p, url: p.buildUrl(city), tag: "haupt" });
    }
  }

  return results;
}
