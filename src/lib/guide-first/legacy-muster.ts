/**
 * Guide-first cutover (2026-10-27): legacy /musterformular/* manual-fill pages
 * are no longer shown. Every old deep link resolves to the matching
 * /formulari/:slug SmartGuide (locale prefix preserved). Source pages, PDFs and
 * storage keys remain in the repo untouched so the change is reversible by
 * removing LegacyMusterGuard from Layout.
 */
import { MUSTER_SLUG_MAP } from "@/lib/form-catalog";

/** Muster slugs whose target is not a 1:1 catalog slug. */
const SPECIAL_TARGETS: Record<string, string> = {
  // Shared by Hauptantrag and Weiterbewilligung → ask the user which one.
  buergergeld: "/formulari/hauptantrag?from=buergergeld",
  einbuergerung: "/dvojno-drzavljanstvo/einbuergerung-vodic",
  "antrag-generic": "/formulari",
};

const MUSTER_TO_SLUG: Record<string, string> = (() => {
  const out: Record<string, string> = {};
  for (const [slug, ms] of Object.entries(MUSTER_SLUG_MAP)) {
    if (!(ms in out)) out[ms] = slug;
  }
  return out;
})();

const MUSTER_RE = /^(\/(?:de|hr|sr))?\/musterformular(?:\/([^/]+))?\/?$/;
const PREVIEW_RE = /^(\/(?:de|hr|sr))?\/muster\/kindergeld\/preview\/?$/;

/** Returns the guide target for a legacy Muster path, or null if not legacy. */
export function resolveLegacyMuster(pathname: string): string | null {
  const preview = pathname.match(PREVIEW_RE);
  if (preview) return `${preview[1] ?? ""}/formulari/kindergeld`;
  const m = pathname.match(MUSTER_RE);
  if (!m) return null;
  const prefix = m[1] ?? "";
  const ms = m[2] ? decodeURIComponent(m[2]) : "";
  const target = SPECIAL_TARGETS[ms] ?? (MUSTER_TO_SLUG[ms] ? `/formulari/${MUSTER_TO_SLUG[ms]}` : "/formulari");
  return `${prefix}${target}`;
}
