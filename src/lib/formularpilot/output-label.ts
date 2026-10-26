/**
 * FormularPilot output label rule — DEVELOPMENT-ONLY, not wired to any page.
 * Any NEW 2.0 UI must derive its badge from this function, never hardcode it.
 * "verified_official" is only possible for an authentic, tested variant with
 * cleared reuse rights.
 */
import type { InventoryEntry, InventoryVariant } from "./inventory/types";

export type OutputLabel = "verified_official" | "helper_sheet_non_official" | "guide_with_official_link";

export function outputLabelFor(entry: Pick<InventoryEntry, "kind" | "rights">, variant?: InventoryVariant): OutputLabel {
  if (
    variant &&
    entry.kind === "pdf_fill" &&
    variant.readiness === "tested" &&
    variant.provenance === "authentic_official_verified" &&
    entry.rights !== "unknown" &&
    variant.blockers.length === 0
  ) return "verified_official";
  if (entry.kind === "pdf_fill" || entry.kind === "print_simulation" || entry.kind === "letter_template") {
    return "helper_sheet_non_official";
  }
  return "guide_with_official_link";
}
