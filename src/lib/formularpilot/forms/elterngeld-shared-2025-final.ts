/** August 2025 shared original, pp.21–23, section 13. HH original re-served 26.11.2026.
 * Bank options follow widget coordinates, not field-number guesses: AS 1/2/3, 2E 4/5/6.
 * Contacts are voluntary; representatives need the printed proof, never inferred from age.
 * Signature/date/place remain in EG_NEVER_FILL. Foreign accounts are blocked pending verified
 * country-specific banking validation; no input is silently dropped or truncated.
 */
import { blank, ibanValidDE, type StrictFill } from "../engine/strict-acroform";
import type { EgError, EgFieldName } from "./elterngeld-shared-2025";
import { otherPart2Required, type HouseholdAnswers } from "./elterngeld-shared-2025-parents";

export type AccountHolder = { kind: "self" } | { kind: "other_parent" } | { kind: "third_party"; firstName: string; lastName: string };
export type BankAnswers = { kind: "same_as_applicant" } | {
  kind: "account"; bank: string; iban: string;
  /** Explicit location of the account, not citizenship or the applicant's address. */
  country: "DE" | "foreign"; bic?: string; holder: AccountHolder;
};
export interface FinalParentAnswers {
  bank: BankAnswers;
  phone?: string; email?: string; message?: string;
  representative?: { firstName: string; lastName: string; proofAttached: boolean };
}
export interface FinalStageAnswers { as: FinalParentAnswers; other?: FinalParentAnswers }
export type FinalBlock = "FOREIGN_ACCOUNT_VALIDATION_UNVERIFIED";
const unsafe = (s: string) => /[\u0000-\u001f\u007f]/.test(s);

export function validateFinalStage(a: FinalStageAnswers, h: HouseholdAnswers): { errors: EgError[]; blocks: FinalBlock[] } {
  const errors: EgError[] = [], blocks = new Set<FinalBlock>();
  function parent(p: "as" | "other", x: FinalParentAnswers) {
    const err = (field: string, code: string) => errors.push({ field: `${p}.${field}`, code });
    const b = x.bank;
    if (b.kind === "same_as_applicant") {
      if (p !== "other") err("bank", "same_account_other_only");
      if (Object.keys(b).length !== 1) err("bank", "hidden_answers");
    } else if (b.kind === "account") {
      if (blank(b.bank) || unsafe(b.bank)) err("bank.bank", "required_safe_text");
      if (b.country === "DE") {
        if (!ibanValidDE(b.iban)) err("bank.iban", "de_iban_checksum");
        if (b.bic) err("bank.bic", "germany_no_bic");
      } else if (b.country === "foreign") {
        blocks.add("FOREIGN_ACCOUNT_VALIDATION_UNVERIFIED");
        if (!b.bic || !/^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/.test(b.bic)) err("bank.bic", "bic");
      } else err("bank.country", "required");
      if (b.holder.kind === "third_party") {
        if (blank(b.holder.firstName) || unsafe(b.holder.firstName)) err("bank.holder.firstName", "required_safe_text");
        if (blank(b.holder.lastName) || unsafe(b.holder.lastName)) err("bank.holder.lastName", "required_safe_text");
      } else if (b.holder.kind === "self" || b.holder.kind === "other_parent") {
        if (Object.keys(b.holder).length !== 1) err("bank.holder", "hidden_answers");
        if (b.holder.kind === "other_parent" && !h.other) err("bank.holder", "other_parent_name_required");
      } else err("bank.holder", "required");
    } else err("bank", "required");
    if (x.phone && (unsafe(x.phone) || !/^[+()\d /.-]{3,40}$/.test(x.phone))) err("phone", "phone");
    if (x.email && (unsafe(x.email) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(x.email))) err("email", "email");
    // Shared engine currently checks single-line width. Do not offer unverified multiline layout.
    if (x.message && unsafe(x.message)) err("message", "single_line_only");
    if (x.representative) {
      if (blank(x.representative.firstName) || unsafe(x.representative.firstName)) err("representative.firstName", "required_safe_text");
      if (blank(x.representative.lastName) || unsafe(x.representative.lastName)) err("representative.lastName", "required_safe_text");
      if (x.representative.proofAttached !== true) err("representative.proofAttached", "proof_required");
    }
  }
  parent("as", a.as);
  if (otherPart2Required(h)) {
    if (!a.other) errors.push({ field: "other", code: "required" });
    else parent("other", a.other);
  } else if (a.other) errors.push({ field: "other", code: "not_applicable" });
  return { errors, blocks: [...blocks] };
}

type F = StrictFill<EgFieldName>;
const C = (name: string): F => ({ name: name as EgFieldName, type: "check" });
const T = (name: string, value: string): F => ({ name: name as EgFieldName, type: "text", value: value.trim() });
function parentFills(x: FinalParentAnswers, p: "AS" | "2E"): F[] {
  const f: F[] = [], b = x.bank;
  if (b.kind === "same_as_applicant") f.push(C("13a Konto wie AS"));
  else {
    f.push(T(`13a Bankname ${p}`, b.bank), T(`13a IBAN ${p}`, b.iban.replace(/\s/g, "").toUpperCase()));
    if (b.country === "foreign" && b.bic) f.push(T(`13a BIC ${p}`, b.bic));
    const n = { self: 1, other_parent: 2, third_party: 3 }[b.holder.kind] + (p === "AS" ? 0 : 3);
    f.push(C(`13a Bankverbindung ${n}`));
    if (b.holder.kind === "third_party") f.push(T(`13a KtoInhaber Vorname ${p}`, b.holder.firstName), T(`13a KtoInhaber Nachname ${p}`, b.holder.lastName));
  }
  if (x.phone?.trim()) f.push(T(`13b Telefon ${p}`, x.phone));
  if (x.email?.trim()) f.push(T(`13b E-Mail ${p}`, x.email));
  if (x.message?.trim()) f.push(T(`13c Weiteres ${p}`, x.message));
  if (x.representative) f.push(T(`13c Vorname Vertr ${p}`, x.representative.firstName), T(`13c Nachname Vertr ${p}`, x.representative.lastName));
  return f;
}
/** Pure transcription only; validateFinalStage must succeed before engine use. */
export function finalStageFills(a: FinalStageAnswers, h: HouseholdAnswers): F[] {
  return [...parentFills(a.as, "AS"), ...(otherPart2Required(h) && a.other ? parentFills(a.other, "2E") : [])];
}