/**
 * FormularPilot — Germany jurisdiction normalization (all 16 Bundesländer).
 * Pure, deterministic, no network. Fuzzy matches ALWAYS require user confirmation.
 * "Sachsen" and "Sachsen-Anhalt" are distinct exact aliases and never fuzzy-collide.
 */
export type BundeslandCode =
  | "bw" | "by" | "be" | "bb" | "hb" | "hh" | "he" | "mv"
  | "ni" | "nw" | "rp" | "sl" | "sn" | "st" | "sh" | "th";

export const BUNDESLAND_NAMES: Record<BundeslandCode, string> = {
  bw: "Baden-Württemberg", by: "Bayern", be: "Berlin", bb: "Brandenburg",
  hb: "Bremen", hh: "Hamburg", he: "Hessen", mv: "Mecklenburg-Vorpommern",
  ni: "Niedersachsen", nw: "Nordrhein-Westfalen", rp: "Rheinland-Pfalz",
  sl: "Saarland", sn: "Sachsen", st: "Sachsen-Anhalt", sh: "Schleswig-Holstein",
  th: "Thüringen",
};

export const BUNDESLAND_CODES = Object.keys(BUNDESLAND_NAMES) as BundeslandCode[];

const EXTRA_ALIASES: Record<BundeslandCode, string[]> = {
  bw: ["BaWü", "Baden Wuerttemberg"], by: ["Bavaria", "Freistaat Bayern"],
  be: [], bb: [], hb: ["Freie Hansestadt Bremen", "Bremerhaven"], hh: ["Freie und Hansestadt Hamburg"],
  he: ["Hesse"], mv: ["Meck-Pomm", "MeckPomm"], ni: ["Lower Saxony"],
  nw: ["NRW", "North Rhine-Westphalia"], rp: ["RLP", "Rhineland-Palatinate"],
  sl: [], sn: ["Freistaat Sachsen", "Saxony"], st: ["Saxony-Anhalt", "LSA"],
  sh: [], th: ["Freistaat Thüringen", "Thuringia"],
};

/** Lowercase, fold umlauts/ß, drop everything but [a-z0-9]. */
export function normalizeLabel(input: string): string {
  return input
    .toLowerCase()
    .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "");
}

const ALIAS_INDEX: Map<string, BundeslandCode> = (() => {
  const m = new Map<string, BundeslandCode>();
  for (const code of BUNDESLAND_CODES) {
    for (const a of [code, `de${code}`, BUNDESLAND_NAMES[code], ...EXTRA_ALIASES[code]]) {
      m.set(normalizeLabel(a), code);
    }
  }
  return m;
})();

function levenshtein(a: string, b: string): number {
  const prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let diag = prev[0];
    prev[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const tmp = prev[j];
      prev[j] = Math.min(prev[j] + 1, prev[j - 1] + 1, diag + (a[i - 1] === b[j - 1] ? 0 : 1));
      diag = tmp;
    }
  }
  return prev[b.length];
}

export type JurisdictionMatch =
  | { status: "exact"; code: BundeslandCode; name: string }
  | { status: "needs_confirmation"; code: BundeslandCode; name: string; distance: number }
  | { status: "ambiguous"; candidates: BundeslandCode[] }
  | { status: "unknown" };

export function resolveBundesland(input: string): JurisdictionMatch {
  const key = normalizeLabel(input ?? "");
  if (!key) return { status: "unknown" };
  const exact = ALIAS_INDEX.get(key);
  if (exact) return { status: "exact", code: exact, name: BUNDESLAND_NAMES[exact] };
  if (key.length < 4) return { status: "unknown" };

  const best = new Map<BundeslandCode, number>();
  for (const [alias, code] of ALIAS_INDEX) {
    if (alias.length < 4) continue;
    const d = levenshtein(key, alias);
    if (d <= Math.max(2, Math.floor(alias.length * 0.25))) {
      best.set(code, Math.min(best.get(code) ?? Infinity, d));
    }
  }
  if (best.size === 0) return { status: "unknown" };
  const sorted = [...best.entries()].sort((x, y) => x[1] - y[1]);
  // Reject if a second state is close to the best one (e.g. Sachsen vs Sachsen-Anhalt).
  if (sorted.length > 1 && sorted[1][1] - sorted[0][1] <= 1) {
    return { status: "ambiguous", candidates: sorted.map(([c]) => c) };
  }
  const [code, distance] = sorted[0];
  return { status: "needs_confirmation", code, name: BUNDESLAND_NAMES[code], distance };
}
