/** FormularPilot inventory — DEVELOPMENT-ONLY audit types. No runtime/UI use. */
export type InventoryKind =
  | "pdf_fill"          // (a)+(c) interactive UI that fills a bundled PDF
  | "print_simulation"  // (a) interactive Musterformular, printed via window.print(), no official PDF
  | "external_link"     // (b) official link only
  | "letter_template"   // (d) generic letter (Vorlagen)
  | "planned";          // (e) listed in catalog, no route/implementation
export type Scope = "federal" | "state" | "district_or_municipal" | "agency" | "none";
export type PdfTech = "acroform" | "acroform_with_xfa" | "flat" | "encrypted" | "placeholder" | "not_pdf" | "unknown";
export type Readiness = "blocked" | "needs_review" | "tested";
export type Provenance = "authentic_official_verified" | "differs_from_official" | "unverified" | "not_applicable";
export type RightsStatus = "unknown" | "not_applicable";

export interface InventoryVariant {
  id: string;
  /** e.g. Bundesland code or birth-date range */
  appliesTo?: string;
  bundledFile?: string;
  officialUrl?: string;
  /** Last observed HTTP status of officialUrl, with date. */
  officialUrlCheck?: { status: number; checkedAt: string };
  pdfTech: PdfTech;
  fieldCount?: number;
  provenance: Provenance;
  readiness: Readiness;
  blockers: string[];
}

export interface InventoryEntry {
  id: string;
  name: string;
  category: string;
  kind: InventoryKind;
  /** App route(s) and fill module / caller found in repo. */
  routes: string[];
  callers: string[];
  issuer: string;
  scope: Scope;
  /** Conditions such as birth date or effective date that select a variant. */
  variantSelectors: string[];
  variants: InventoryVariant[];
  outputMethod: "filled_pdf_download" | "browser_print" | "docx_or_pdf_letter" | "link_out" | "none";
  /** Mapping coverage: fields our code writes / total, when known. */
  mappingCoverage?: string;
  authorityRouting: "authority-routing.ts" | "not_modelled";
  annexes: string[];
  signaturesRequired: "yes" | "unknown" | "not_applicable";
  rights: RightsStatus;
  tests: string[];
  acceptance: string[];
}
