/**
 * FormularPilot — authority / postal destination routing (DEVELOPMENT ONLY).
 * Separate from form/edition selection. Pure, deterministic, no network.
 *
 * Hard rules:
 * - A postal address is returned ONLY from an exact, officially verified, versioned
 *   lookup entry (status "verified", exact PLZ match, not stale, office-level).
 * - Generic state ministry / portal entries are never a postal destination.
 * - Kindergeld office is NEVER derived from the child's birth date.
 * - Special cases (cross-border, public-service employer, protected persons) always
 *   require manual confirmation via the official central service.
 * - The verified lookup table ships EMPTY: no address has been verified yet.
 */
import { BUNDESLAND_NAMES, type BundeslandCode } from "./jurisdiction";
import { ZBFS_ROUTING_URL, BW_ROUTING_URL } from "./manifests/elterngeld-pilot";

export const BA_KINDERGELD_MERKBLATT_URL =
  "https://www.arbeitsagentur.de/datei/kg2-merkblattkindergeld_ba034475.pdf";
export const BA_ZENTRALER_KINDERGELDSERVICE_URL =
  "https://www.arbeitsagentur.de/familie-und-kinder/zentraler-kindergeldservice";
export const FAMILIENPORTAL_ELTERNGELD_FAQ_URL =
  "https://familienportal.de/familienportal/familienleistungen/elterngeld/faq/wie-kann-ich-elterngeld-beantragen--124762";
export const FAMILIENPORTAL_FORMS_URL =
  "https://familienportal.de/familienportal/rechner-antraege/antragsformulare";

/** Max age of a verified entry before it must be re-checked. */
export const MAX_VERIFICATION_AGE_DAYS = 180;

export type AuthorityServiceKey = "kindergeld" | "elterngeld";

/** Tri-state: undefined = not asked yet (forces an additional question). */
export interface SpecialQualifiers {
  /** Applicant lives abroad, or works in DE while family lives in another country. */
  crossBorder?: boolean;
  /** Applicant employed in public service with own/special Familienkasse. */
  publicServiceEmployer?: boolean;
  /** Protected person / special status listed by the central Kindergeldservice. */
  protectedPerson?: boolean;
}

export interface AuthorityRoutingInput {
  serviceKey: string;
  applicantState?: BundeslandCode;
  applicantPlz?: string;
  applicantCity?: string;
  /** Elterngeld: child's residence decides the competent office. */
  childResidenceState?: BundeslandCode;
  childResidencePlz?: string;
  /** Edition/application-rule context ONLY — never office routing for Kindergeld. */
  childBirthDate?: string;
  qualifiers?: SpecialQualifiers;
  /** ISO date for staleness checks (injected for determinism). */
  today: string;
}

export interface ProvenanceSource {
  url: string;
  checkedAt: string;
  note: string;
}

export interface VerifiedAuthorityEntry {
  serviceKey: AuthorityServiceKey;
  /** Only "office" entries may carry a postal destination. */
  level: "office" | "state_ministry" | "portal";
  status: "verified" | "needs_review";
  state: BundeslandCode;
  /** Exact 5-digit PLZ this entry covers. */
  plz: string[];
  authorityName: string;
  postalAddress: string[];
  source: ProvenanceSource;
  lastVerifiedAt: string;
  versionLabel: string;
}

/** Intentionally empty — add entries only from verified official lookups. */
export const VERIFIED_AUTHORITY_LOOKUP: readonly VerifiedAuthorityEntry[] = [];

export type MissingInput =
  | "applicantState" | "applicantPlz" | "childResidenceState" | "childResidencePlz"
  | "childBirthDate" | "qualifiers.crossBorder" | "qualifiers.publicServiceEmployer"
  | "qualifiers.protectedPerson";

export type AuthorityRoutingResult =
  | {
      status: "verified";
      authorityName: string;
      postalAddress: string[];
      provenance: ProvenanceSource;
      lastVerifiedAt: string;
      versionLabel: string;
      criteria: string[];
    }
  | {
      status: "requires_official_lookup" | "needs_manual_confirmation";
      reason: string;
      locatorUrl: string;
      sources: string[];
      missingInputs: MissingInput[];
      criteria: string[];
    }
  | { status: "unsupported_service"; serviceKey: string };

const PLZ_RE = /^\d{5}$/;

function daysBetween(a: string, b: string): number {
  return (Date.parse(b) - Date.parse(a)) / 86_400_000;
}

function findVerified(
  table: readonly VerifiedAuthorityEntry[],
  serviceKey: AuthorityServiceKey,
  state: BundeslandCode | undefined,
  plz: string | undefined,
  today: string,
): VerifiedAuthorityEntry | undefined {
  if (!state || !plz || !PLZ_RE.test(plz)) return undefined;
  return table.find((e) =>
    e.serviceKey === serviceKey &&
    e.level === "office" &&
    e.status === "verified" &&
    e.state === state &&
    e.plz.includes(plz) &&
    e.postalAddress.length > 0 &&
    Number.isFinite(Date.parse(e.lastVerifiedAt)) &&
    daysBetween(e.lastVerifiedAt, today) <= MAX_VERIFICATION_AGE_DAYS &&
    daysBetween(e.lastVerifiedAt, today) >= 0,
  );
}

function verifiedResult(e: VerifiedAuthorityEntry, criteria: string[]): AuthorityRoutingResult {
  return {
    status: "verified", authorityName: e.authorityName, postalAddress: [...e.postalAddress],
    provenance: { ...e.source }, lastVerifiedAt: e.lastVerifiedAt, versionLabel: e.versionLabel, criteria,
  };
}

function routeKindergeld(i: AuthorityRoutingInput, table: readonly VerifiedAuthorityEntry[]): AuthorityRoutingResult {
  const criteria = ["applicant residence / habitual abode (BA Merkblatt KG2)", "child birth date NOT used for office routing"];
  const q = i.qualifiers ?? {};
  const missing: MissingInput[] = [];
  if (q.crossBorder === undefined) missing.push("qualifiers.crossBorder");
  if (q.publicServiceEmployer === undefined) missing.push("qualifiers.publicServiceEmployer");
  if (q.protectedPerson === undefined) missing.push("qualifiers.protectedPerson");
  const sources = [BA_KINDERGELD_MERKBLATT_URL, BA_ZENTRALER_KINDERGELDSERVICE_URL];

  if (q.crossBorder || q.publicServiceEmployer || q.protectedPerson) {
    return {
      status: "needs_manual_confirmation",
      reason: "special_jurisdiction_case",
      locatorUrl: BA_ZENTRALER_KINDERGELDSERVICE_URL, sources, missingInputs: missing, criteria,
    };
  }
  if (!i.applicantState) missing.push("applicantState");
  if (!i.applicantPlz || !PLZ_RE.test(i.applicantPlz)) missing.push("applicantPlz");
  if (missing.length === 0) {
    const hit = findVerified(table, "kindergeld", i.applicantState, i.applicantPlz, i.today);
    if (hit) return verifiedResult(hit, criteria);
  }
  return {
    status: missing.length ? "needs_manual_confirmation" : "requires_official_lookup",
    reason: missing.length ? "additional_questions_required" : "no_verified_office_entry",
    locatorUrl: BA_KINDERGELD_MERKBLATT_URL, sources, missingInputs: missing, criteria,
  };
}

function elterngeldLocator(state?: BundeslandCode): string {
  if (state === "by") return ZBFS_ROUTING_URL;
  if (state === "bw") return BW_ROUTING_URL;
  return FAMILIENPORTAL_FORMS_URL;
}

function routeElterngeld(i: AuthorityRoutingInput, table: readonly VerifiedAuthorityEntry[]): AuthorityRoutingResult {
  const criteria = ["child's residence decides competent office (Familienportal)", "child birth date selects edition/rules only"];
  const missing: MissingInput[] = [];
  if (!i.childResidenceState) missing.push("childResidenceState");
  if (!i.childResidencePlz || !PLZ_RE.test(i.childResidencePlz)) missing.push("childResidencePlz");
  if (!i.childBirthDate || !Number.isFinite(Date.parse(i.childBirthDate))) missing.push("childBirthDate");
  const locatorUrl = elterngeldLocator(i.childResidenceState);
  const sources = [FAMILIENPORTAL_ELTERNGELD_FAQ_URL, locatorUrl];
  if (i.qualifiers?.crossBorder) {
    return { status: "needs_manual_confirmation", reason: "special_jurisdiction_case", locatorUrl, sources, missingInputs: missing, criteria };
  }
  if (missing.length === 0) {
    const hit = findVerified(table, "elterngeld", i.childResidenceState, i.childResidencePlz, i.today);
    if (hit) return verifiedResult(hit, criteria);
  }
  return {
    status: missing.length ? "needs_manual_confirmation" : "requires_official_lookup",
    reason: missing.length ? "additional_questions_required" : "no_verified_office_entry",
    locatorUrl, sources, missingInputs: missing, criteria,
  };
}

export function resolveAuthority(
  input: AuthorityRoutingInput,
  table: readonly VerifiedAuthorityEntry[] = VERIFIED_AUTHORITY_LOOKUP,
): AuthorityRoutingResult {
  if (input.serviceKey === "kindergeld") return routeKindergeld(input, table);
  if (input.serviceKey === "elterngeld") return routeElterngeld(input, table);
  return { status: "unsupported_service", serviceKey: input.serviceKey };
}

export const stateLabel = (c: BundeslandCode) => BUNDESLAND_NAMES[c];

/**
 * Preflight checklist every offered form must pass before a prepared document
 * is shown. Not an official endorsement; user always reviews, signs, submits.
 */
export const FORM_PREFLIGHT_CHECKLIST = [
  "jurisdiction_resolved_exact_or_confirmed",
  "edition_matches_effective_or_birth_date",
  "authority_and_postal_destination_verified_or_official_lookup_shown",
  "special_cases_asked_and_answered",
  "prerequisites_checked",
  "required_attachments_listed",
  "signatures_required_listed",
  "official_template_hash_and_fields_verified",
  "no_protected_or_xfa_pdf_modified",
  "hosting_and_reuse_licence_confirmed",
  "source_url_and_checked_date_recorded",
  "user_reviewed_and_confirmed",
  "no_auto_submission",
  "no_official_endorsement_implied",
] as const;
export type PreflightChecklistItem = (typeof FORM_PREFLIGHT_CHECKLIST)[number];
