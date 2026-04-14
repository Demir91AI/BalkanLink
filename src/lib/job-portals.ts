const enc = encodeURIComponent;

export interface PortalDef {
  name: string;
  desc: string;
  buildUrl: (city: string, query?: string) => string;
}

/* ── Staatliche / Government ─────────────────── */
export const PORTALE_STAATLICH: PortalDef[] = [
  {
    name: "Bundesagentur für Arbeit",
    desc: "Službeni portal saveznog zavoda za zapošljavanje",
    buildUrl: (c, q) =>
      `https://www.arbeitsagentur.de/jobsuche/suche?angebotsart=1&wo=${enc(c)}${q ? `&was=${enc(q)}` : ""}`,
  },
  {
    name: "EURES",
    desc: "EU portal za traženje posla u cijeloj Evropi",
    buildUrl: () => `https://eures.europa.eu/index_de`,
  },
];

/* ── Große Portale ───────────────────────────── */
export const PORTALE_GROSS: PortalDef[] = [
  {
    name: "Indeed",
    desc: "Najveći portal za sve vrste poslova",
    buildUrl: (c, q) =>
      `https://de.indeed.com/Jobs?l=${enc(c)}${q ? `&q=${enc(q)}` : ""}`,
  },
  {
    name: "StepStone",
    desc: "Premium portal za kvalificirane poslove",
    buildUrl: (c, q) =>
      `https://www.stepstone.de/jobs/${q ? enc(q) + "/" : ""}${enc(c)}`,
  },
  {
    name: "Monster",
    desc: "Međunarodni portal s velikim brojem oglasa",
    buildUrl: (c, q) =>
      `https://www.monster.de/jobs/suche/?where=${enc(c)}${q ? `&q=${enc(q)}` : ""}`,
  },
  {
    name: "Meinestadt",
    desc: "Regionalni portal – dobro za lokalne poslove",
    buildUrl: (c) =>
      `https://www.meinestadt.de/${enc(c.toLowerCase())}/jobs`,
  },
  {
    name: "Joblift",
    desc: "Meta-pretraga – objedinjuje oglase iz više portala",
    buildUrl: (c, q) =>
      `https://joblift.de/Suche?l=${enc(c)}${q ? `&k=${enc(q)}` : ""}`,
  },
  {
    name: "Kimeta",
    desc: "Agregator s više od 2.5 miliona oglasa",
    buildUrl: (c, q) =>
      `https://www.kimeta.de/stellenangebote?where=${enc(c)}${q ? `&q=${enc(q)}` : ""}`,
  },
  {
    name: "Glassdoor",
    desc: "Ocjene firmi i plate – poslovi s transparentnošću",
    buildUrl: (c) =>
      `https://www.glassdoor.de/Job/jobs.htm?locT=C&locKeyword=${enc(c)}`,
  },
  {
    name: "Stellenanzeigen.de",
    desc: "Veliki njemački portal za sve branše",
    buildUrl: (c) =>
      `https://www.stellenanzeigen.de/jobs-in-${enc(c.toLowerCase())}`,
  },
  {
    name: "Jobware",
    desc: "Fokus na kvalificirane stručne pozicije",
    buildUrl: () => `https://www.jobware.de`,
  },
];

/* ── Spezialisierte ──────────────────────────── */
export const PORTALE_SPEZIAL: PortalDef[] = [
  {
    name: "Medwing",
    desc: "Zdravstvo i njega – specijalizirani portal",
    buildUrl: () => `https://www.medwing.com/jobs`,
  },
  {
    name: "Bau-Stellen",
    desc: "Građevinska industrija i zanatski poslovi",
    buildUrl: () => `https://www.bau-stellen.de`,
  },
  {
    name: "Logistic-Jobs",
    desc: "Logistika, skladište, transport",
    buildUrl: () => `https://www.logistic-jobs.de`,
  },
  {
    name: "Ausbildung.de",
    desc: "Portal za stručno osposobljavanje (Ausbildung)",
    buildUrl: () => `https://www.ausbildung.de`,
  },
];

/* ── Branche → German keyword mapping ────────── */
export const BRANCHE_KEYWORD: Record<string, string> = {
  pflege: "Pflege",
  bau: "Bau",
  logistik: "Logistik Lager",
  produktion: "Produktion Helfer",
  reinigung: "Reinigung",
  gastro: "Gastronomie Küche",
  it: "IT Software",
  handwerk: "Handwerk",
  buero: "Büro Verwaltung",
  ausbildung: "Ausbildung",
};

/* ── Build smart search query from filters ───── */
export interface JobFilters {
  city: string;
  bundesland: string;
  umkreis: string;
  branche: string;
  vertragsart: string;
  ohneDeutsch: boolean;
  mitUnterkunft: boolean;
  quereinsteiger: boolean;
  schnellerEinstieg: boolean;
}

export function buildSearchQuery(f: JobFilters): string {
  const parts: string[] = [];
  if (f.branche && f.branche !== "alle") parts.push(BRANCHE_KEYWORD[f.branche] || f.branche);
  if (f.ohneDeutsch) parts.push("ohne Deutschkenntnisse");
  if (f.mitUnterkunft) parts.push("mit Unterkunft");
  if (f.quereinsteiger) parts.push("Quereinsteiger");
  if (f.schnellerEinstieg) parts.push("sofort");
  return parts.join(" ");
}

export function getSearchCity(f: JobFilters): string {
  if (f.city) return f.city;
  if (f.bundesland && f.bundesland !== "alle") return f.bundesland;
  return "Deutschland";
}

export interface SmartResult {
  portal: PortalDef;
  url: string;
  tag: string; // category tag for grouping
}

export function generateSmartResults(f: JobFilters): SmartResult[] {
  const city = getSearchCity(f);
  const query = buildSearchQuery(f);
  const results: SmartResult[] = [];

  // Always include top portals
  for (const p of PORTALE_STAATLICH.slice(0, 2)) {
    results.push({ portal: p, url: p.buildUrl(city, query), tag: "staat" });
  }
  for (const p of PORTALE_GROSS.slice(0, 5)) {
    results.push({ portal: p, url: p.buildUrl(city, query), tag: "gross" });
  }

  // Add specialized portals based on branche
  if (f.branche === "pflege") {
    const med = PORTALE_SPEZIAL.find((p) => p.name === "Medwing");
    if (med) results.push({ portal: med, url: med.buildUrl(city), tag: "spezial" });
  }
  if (f.branche === "bau" || f.branche === "handwerk") {
    const bau = PORTALE_SPEZIAL.find((p) => p.name === "Bau-Stellen");
    if (bau) results.push({ portal: bau, url: bau.buildUrl(city), tag: "spezial" });
  }
  if (f.branche === "logistik") {
    const log = PORTALE_SPEZIAL.find((p) => p.name === "Logistic-Jobs");
    if (log) results.push({ portal: log, url: log.buildUrl(city), tag: "spezial" });
  }
  if (f.branche === "ausbildung") {
    const aus = PORTALE_SPEZIAL.find((p) => p.name === "Ausbildung.de");
    if (aus) results.push({ portal: aus, url: aus.buildUrl(city), tag: "spezial" });
  }

  return results;
}
