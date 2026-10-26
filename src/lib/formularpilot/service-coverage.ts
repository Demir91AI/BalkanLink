/**
 * FormularPilot — service coverage registry (separate from PDF filling).
 * Pure, no network. Nothing is "tested" until a hash-pinned preflight manifest +
 * golden read-back test exists. Unverified data is never presented as ready.
 * Delivery is ALWAYS user-reviewed: the user prints/signs/submits; no auto-send.
 */
import { BUNDESLAND_CODES, BUNDESLAND_NAMES, type BundeslandCode } from "./jurisdiction";
import { ELTERNGELD_BUNDESLAENDER } from "@/lib/elterngeld-bundeslaender";
import {
  BAYERN_EDITIONS, BW_EDITIONS, BW_ONLINE_URL, BW_ROUTING_URL, ZBFS_ROUTING_URL,
} from "./manifests/elterngeld-pilot";

export type CoverageScope = "federal" | "state" | "district_or_municipal" | "agency";
export type VerificationStatus = "tested" | "blocked" | "needs_review";
export type DeliveryMode = "official_link_only" | "user_prints_and_submits" | "official_online_portal";

export interface FormEdition {
  /** ISO date; edition applies to births/events on or after this date. */
  validFrom: string;
  /** ISO date exclusive; undefined = open-ended. */
  validUntil?: string;
  versionLabel: string;
  sourceUrl: string;
  status: VerificationStatus;
  sha256?: string;
  /** Form technology of the official file as downloaded. */
  technology?: "acroform" | "xfa" | "flat" | "online_only";
  fieldCount?: number;
  verifiedAt?: string;
  note?: string;
}

export interface JurisdictionCoverage {
  authority: string;
  /** Official page used for routing (where the user must go). */
  routingSourceUrl: string;
  routingStatus: VerificationStatus;
  editions: FormEdition[];
  deliveryModes: DeliveryMode[];
  onlinePortalUrl?: string;
}

export interface ServiceDefinition {
  serviceKey: string;
  scope: CoverageScope;
  /** Federal: single entry; state: per Bundesland (missing = unsupported). */
  federal?: JurisdictionCoverage;
  byState?: Partial<Record<BundeslandCode, JurisdictionCoverage>>;
}

const FAMILIENPORTAL_FORMS = "https://familienportal.de/familienportal/rechner-antraege/antragsformulare";

function elterngeldState(code: BundeslandCode): JurisdictionCoverage {
  if (code === "by") {
    return {
      authority: "ZBFS — Zentrum Bayern Familie und Soziales",
      routingSourceUrl: ZBFS_ROUTING_URL,
      routingStatus: "needs_review",
      editions: BAYERN_EDITIONS,
      deliveryModes: ["official_link_only", "official_online_portal"],
      onlinePortalUrl: "https://www.elterngeld.bayern.de/onlineantrag/",
    };
  }
  if (code === "bw") {
    return {
      authority: "L-Bank — Landeskreditbank Baden-Württemberg",
      routingSourceUrl: BW_ROUTING_URL,
      routingStatus: "needs_review",
      editions: BW_EDITIONS,
      deliveryModes: ["official_online_portal", "official_link_only"],
      onlinePortalUrl: BW_ONLINE_URL,
    };
  }
  const legacy = ELTERNGELD_BUNDESLAENDER.find((b) => b.id === code);
  return {
    authority: legacy?.authority ?? BUNDESLAND_NAMES[code],
    routingSourceUrl: FAMILIENPORTAL_FORMS,
    routingStatus: "needs_review",
    editions: [],
    deliveryModes: ["official_link_only"],
  };
}

export const SERVICE_REGISTRY: Record<string, ServiceDefinition> = {
  "kindergeld-kg1": {
    serviceKey: "kindergeld-kg1",
    scope: "federal",
    federal: {
      authority: "Familienkasse der Bundesagentur für Arbeit",
      routingSourceUrl:
        "https://www.arbeitsagentur.de/familie-und-kinder/downloads-familie-und-kinder/formulare-kindergeld",
      routingStatus: "tested",
      editions: [{
        validFrom: "2025-10-15",
        versionLabel: "KG1 (BA, mod. 2025-10-15)",
        sourceUrl: "https://www.arbeitsagentur.de/datei/kg1-antrag-kindergeld_ba036550.pdf",
        status: "blocked",
        sha256: "53651bbe336039b6ca3852f1fa7288b4841349afd1978a4b91469fea15eaac43",
        note: "XFA + encrypted; no AcroForm mapping allowed.",
      }],
      deliveryModes: ["official_link_only"],
    },
  },
  elterngeld: {
    serviceKey: "elterngeld",
    scope: "state",
    byState: Object.fromEntries(BUNDESLAND_CODES.map((c) => [c, elterngeldState(c)])),
  },
};

export type CoverageRefusal =
  | "UNKNOWN_SERVICE" | "STATE_REQUIRED" | "UNSUPPORTED_JURISDICTION"
  | "DATE_REQUIRED" | "NO_EDITION_FOR_DATE" | "EDITION_NOT_TESTED" | "EDITION_BLOCKED";

export type CoverageResult =
  | { ok: true; coverage: JurisdictionCoverage; edition: FormEdition }
  | { ok: false; reason: CoverageRefusal; coverage?: JurisdictionCoverage; edition?: FormEdition };

/**
 * Resolve which official edition applies. Returns ok:true ONLY for "tested" editions.
 * Refusals still carry `coverage` so the UI can show the official link/authority.
 */
export function resolveServiceCoverage(
  serviceKey: string,
  opts: { state?: BundeslandCode; referenceDate?: string },
): CoverageResult {
  const svc = SERVICE_REGISTRY[serviceKey];
  if (!svc) return { ok: false, reason: "UNKNOWN_SERVICE" };
  let coverage: JurisdictionCoverage | undefined;
  if (svc.scope === "federal") coverage = svc.federal;
  else {
    if (!opts.state) return { ok: false, reason: "STATE_REQUIRED" };
    coverage = svc.byState?.[opts.state];
  }
  if (!coverage) return { ok: false, reason: "UNSUPPORTED_JURISDICTION" };
  if (!opts.referenceDate || !/^\d{4}-\d{2}-\d{2}$/.test(opts.referenceDate)) {
    return { ok: false, reason: "DATE_REQUIRED", coverage };
  }
  const d = opts.referenceDate;
  const edition = coverage.editions.find((e) => d >= e.validFrom && (!e.validUntil || d < e.validUntil));
  if (!edition) return { ok: false, reason: "NO_EDITION_FOR_DATE", coverage };
  if (edition.status === "blocked") return { ok: false, reason: "EDITION_BLOCKED", coverage, edition };
  if (edition.status !== "tested") return { ok: false, reason: "EDITION_NOT_TESTED", coverage, edition };
  return { ok: true, coverage, edition };
}
