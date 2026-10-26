import { describe, it, expect } from "vitest";
import {
  resolveAuthority, VERIFIED_AUTHORITY_LOOKUP, BA_ZENTRALER_KINDERGELDSERVICE_URL,
  FORM_PREFLIGHT_CHECKLIST, type VerifiedAuthorityEntry, type AuthorityRoutingInput,
} from "./authority-routing";
import { ZBFS_ROUTING_URL, BW_ROUTING_URL } from "./manifests/elterngeld-pilot";

const today = "2026-10-26";
const noSpecial = { crossBorder: false, publicServiceEmployer: false, protectedPerson: false };
const kg = (o: Partial<AuthorityRoutingInput>): AuthorityRoutingInput => ({ serviceKey: "kindergeld", today, qualifiers: noSpecial, ...o });
const eg = (o: Partial<AuthorityRoutingInput>): AuthorityRoutingInput => ({ serviceKey: "elterngeld", today, ...o });
const hasAddress = (r: object) => "postalAddress" in r;

// Clearly synthetic plumbing fixture — not a real authority or address.
const fixture = (o: Partial<VerifiedAuthorityEntry>): VerifiedAuthorityEntry => ({
  serviceKey: "kindergeld", level: "office", status: "verified", state: "sn", plz: ["00000"],
  authorityName: "TEST_FIXTURE", postalAddress: ["TEST_FIXTURE"],
  source: { url: "https://example.invalid/test", checkedAt: "2026-10-01", note: "test" },
  lastVerifiedAt: "2026-10-01", versionLabel: "test", ...o,
});

describe("authority routing", () => {
  it("ships no verified addresses", () => expect(VERIFIED_AUTHORITY_LOOKUP).toHaveLength(0));

  it("Kindergeld: never outputs an address without verified entry, any state", () => {
    for (const s of ["bw", "by", "sn", "st"] as const) {
      const r = resolveAuthority(kg({ applicantState: s, applicantPlz: "12345" }));
      expect(r.status).toBe("requires_official_lookup");
      expect(hasAddress(r)).toBe(false);
    }
  });

  it("Kindergeld: birth date does not change routing", () => {
    const a = resolveAuthority(kg({ applicantState: "by", applicantPlz: "12345", childBirthDate: "2020-01-01" }));
    const b = resolveAuthority(kg({ applicantState: "by", applicantPlz: "12345", childBirthDate: "2026-01-01" }));
    expect(a).toEqual(b);
  });

  it("Kindergeld: missing PLZ asks for it", () => {
    const r = resolveAuthority(kg({ applicantState: "sn" }));
    expect(r.status).toBe("needs_manual_confirmation");
    if (r.status === "needs_manual_confirmation") expect(r.missingInputs).toContain("applicantPlz");
  });

  it("Kindergeld: unanswered special questions force additional questions", () => {
    const r = resolveAuthority(kg({ applicantState: "sn", applicantPlz: "12345", qualifiers: {} }));
    expect(r.status).toBe("needs_manual_confirmation");
    if (r.status === "needs_manual_confirmation") expect(r.missingInputs).toContain("qualifiers.crossBorder");
  });

  it("Kindergeld: cross-border goes to central service, even with verified entry", () => {
    const r = resolveAuthority(kg({ applicantState: "sn", applicantPlz: "00000", qualifiers: { ...noSpecial, crossBorder: true } }), [fixture({})]);
    expect(r.status).toBe("needs_manual_confirmation");
    if (r.status === "needs_manual_confirmation") expect(r.locatorUrl).toBe(BA_ZENTRALER_KINDERGELDSERVICE_URL);
  });

  it("verified entry only on exact state+PLZ; Sachsen ≠ Sachsen-Anhalt", () => {
    const t = [fixture({})];
    expect(resolveAuthority(kg({ applicantState: "sn", applicantPlz: "00000" }), t).status).toBe("verified");
    expect(resolveAuthority(kg({ applicantState: "st", applicantPlz: "00000" }), t).status).toBe("requires_official_lookup");
    expect(resolveAuthority(kg({ applicantState: "sn", applicantPlz: "00001" }), t).status).toBe("requires_official_lookup");
  });

  it("rejects needs_review, ministry-level and stale entries", () => {
    const i = kg({ applicantState: "sn", applicantPlz: "00000" });
    expect(resolveAuthority(i, [fixture({ status: "needs_review" })]).status).toBe("requires_official_lookup");
    expect(resolveAuthority(i, [fixture({ level: "state_ministry" })]).status).toBe("requires_official_lookup");
    expect(resolveAuthority(i, [fixture({ lastVerifiedAt: "2025-01-01" })]).status).toBe("requires_official_lookup");
  });

  it("Elterngeld: Bayern/BW point to own official locators, no address", () => {
    const by = resolveAuthority(eg({ childResidenceState: "by", childResidencePlz: "12345", childBirthDate: "2025-06-01" }));
    const bw = resolveAuthority(eg({ childResidenceState: "bw", childResidencePlz: "12345", childBirthDate: "2025-06-01" }));
    expect(by.status).toBe("requires_official_lookup");
    if (by.status === "requires_official_lookup") expect(by.locatorUrl).toBe(ZBFS_ROUTING_URL);
    if (bw.status === "requires_official_lookup") expect(bw.locatorUrl).toBe(BW_ROUTING_URL);
    expect(hasAddress(by) || hasAddress(bw)).toBe(false);
  });

  it("Elterngeld: missing birth date / child residence asks for them", () => {
    const r = resolveAuthority(eg({ childResidenceState: "sn" }));
    expect(r.status).toBe("needs_manual_confirmation");
    if (r.status === "needs_manual_confirmation")
      expect(r.missingInputs).toEqual(expect.arrayContaining(["childBirthDate", "childResidencePlz"]));
  });

  it("Elterngeld uses child's residence, not applicant's", () => {
    const t = [fixture({ serviceKey: "elterngeld", state: "st" })];
    const r = resolveAuthority(eg({ applicantState: "st", applicantPlz: "00000", childResidenceState: "sn", childResidencePlz: "00000", childBirthDate: "2025-06-01" }), t);
    expect(r.status).toBe("requires_official_lookup");
  });

  it("unknown service is unsupported; checklist covers key gates", () => {
    expect(resolveAuthority({ serviceKey: "x", today }).status).toBe("unsupported_service");
    expect(FORM_PREFLIGHT_CHECKLIST).toContain("authority_and_postal_destination_verified_or_official_lookup_shown");
    expect(FORM_PREFLIGHT_CHECKLIST).toContain("no_auto_submission");
  });
});
