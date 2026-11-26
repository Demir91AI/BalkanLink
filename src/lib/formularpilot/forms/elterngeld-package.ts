/**
 * Elterngeld shared original (Stand 08/2025) — integrated package for one verified Land.
 * Validates main sections 1–13 together with every annex the answers trigger, then fills each
 * user-selected original through the strict engine. Any trigger without a verified annex original
 * for the chosen Land, and every still-unverified special case, returns an explicit official-route
 * fallback instead of a partial PDF. Memory-only: no storage, network or logging.
 */
import { fillStrictAcroForm, type StrictFillOptions } from "../engine/strict-acroform";
import { checkJurisdiction, childFills, validateChild, EG_SPEC, type EgChildAnswers, type EgLand } from "./elterngeld-shared-2025";
import { householdFills, needsCitizenshipAnnex, otherPart2Required, validateHousehold, type HouseholdAnswers } from "./elterngeld-shared-2025-parents";
import { incomeStageFills, validateIncomeStage, type IncomeStageAnswers } from "./elterngeld-shared-2025-income";
import { planStageFills, validatePlanStage, type PlanStageAnswers } from "./elterngeld-shared-2025-plan";
import { finalStageFills, validateFinalStage, type FinalStageAnswers } from "./elterngeld-shared-2025-final";
import { staFills, staSpec, validateSta, type StaInput } from "./elterngeld-anlage-staatsangehoerigkeit";
import { incomeAnnexFills, incomeAnnexSpec, validateIncomeAnnex, type IncomeAnnexAnswers } from "./elterngeld-anlage-income";
import { residenceFills, residenceSpec, validateResidenceAnnex, type ResidenceAnnexAnswers } from "./elterngeld-anlage-residence";
import { resolveElterngeldRoute } from "./elterngeld-jurisdiction";

export type Role = "as" | "2e";
export type AnnexKind = "sta" | "income" | "residence";
export interface PackageAnswers {
  child: EgChildAnswers; household: HouseholdAnswers; income: IncomeStageAnswers; plan: PlanStageAnswers; final: FinalStageAnswers;
  sta?: Partial<Record<Role, StaInput>>; incomeAnnex?: Partial<Record<Role, IncomeAnnexAnswers>>; residence?: Partial<Record<Role, ResidenceAnnexAnswers>>;
}
export interface PackageOriginals { main: Uint8Array; sta?: Uint8Array; income?: Uint8Array; residence?: Uint8Array }
export interface RequiredAnnex { kind: AnnexKind; role: Role; verifiedForLand: boolean }
export type PackageResult =
  | { ok: true; files: { kind: "main" | AnnexKind; role?: Role; bytes: Uint8Array; filledFields: number }[] }
  | { ok: false; code: "INVALID_INPUT"; errors: { field: string; code: string }[] }
  | { ok: false; code: "OFFICIAL_ROUTE"; reasons: string[]; route: ReturnType<typeof resolveElterngeldRoute> }
  | { ok: false; code: "ORIGINAL_MISSING"; missing: ("main" | AnnexKind)[] }
  | { ok: false; code: "FILL_REFUSED"; document: "main" | AnnexKind; detail: string };

const roles = (h: HouseholdAnswers): Role[] => (otherPart2Required(h) ? ["as", "2e"] : ["as"]);
const parentOf = (h: HouseholdAnswers, r: Role) => (r === "as" ? h.as : h.other);

/** Annexes the printed main-form answers trigger. Nationality alone never triggers: only 2.g "andere". */
export function requiredAnnexes(land: EgLand, a: Pick<PackageAnswers, "household" | "plan">): RequiredAnnex[] {
  const out: RequiredAnnex[] = [];
  for (const r of needsCitizenshipAnnex(a.household)) out.push({ kind: "sta", role: r, verifiedForLand: !!staSpec(land) });
  for (const r of roles(a.household)) {
    if (parentOf(a.household, r)?.wohnsitzDE === false) out.push({ kind: "residence", role: r, verifiedForLand: !!residenceSpec(land) });
    const p = r === "as" ? a.plan.as : a.plan.other;
    if (p?.during && (p.during.wages || p.during.profits)) out.push({ kind: "income", role: r, verifiedForLand: !!incomeAnnexSpec(land) });
  }
  // Annex for a non-applying (2.a single-parent / part-1 only) other parent abroad is not covered.
  if (!otherPart2Required(a.household) && a.household.other?.wohnsitzDE === false) out.push({ kind: "residence", role: "2e", verifiedForLand: false });
  return out;
}

export function validatePackage(land: EgLand | "", a: PackageAnswers, today: string) {
  const reasons = new Set<string>();
  const errors: { field: string; code: string }[] = [];
  const j = checkJurisdiction({ land, today }, a.child.geburtsdatum);
  if (j) return { errors, reasons: [j], required: [] as RequiredAnnex[] };
  const L = land as EgLand;
  errors.push(...validateChild(a.child, today));
  const hh = validateHousehold(a.household, today);
  errors.push(...hh.errors, ...validateIncomeStage(a.income, a.household, a.child.geburtsdatum));
  const pv = validatePlanStage(a.plan, a.income, a.household, a.child), fv = validateFinalStage(a.final, a.household);
  errors.push(...pv.errors, ...fv.errors);
  const required = requiredAnnexes(L, a);
  for (const x of required) if (!x.verifiedForLand) reasons.add(`ANNEX_${x.kind.toUpperCase()}_UNVERIFIED_FOR_LAND`);
  const covered = (k: AnnexKind) => required.some((x) => x.kind === k && x.verifiedForLand);
  for (const b of hh.blocks) if (!(b === "WOHNSITZ_AUSLAND_UNSUPPORTED" && covered("residence"))) reasons.add(b);
  for (const b of pv.blocks) if (!(b === "INCOME_ANNEX_REQUIRED" && covered("income"))) reasons.add(b);
  for (const b of fv.blocks) reasons.add(b);
  const ctx = { vorname: a.child.vorname, nachname: a.child.nachname, geburtsdatum: a.child.geburtsdatum };
  for (const x of required.filter((r) => r.verifiedForLand)) {
    const parent = parentOf(a.household, x.role);
    const ans = x.kind === "sta" ? a.sta?.[x.role] : x.kind === "income" ? a.incomeAnnex?.[x.role] : a.residence?.[x.role];
    const f = `${x.kind}.${x.role}`;
    if (!ans) { errors.push({ field: f, code: "required" }); continue; }
    // Annex identity must equal the main form: never let annex headers drift from sections 1/2.
    if (!parent || ans.parent.vorname.trim() !== parent.vorname.trim() || ans.parent.nachname.trim() !== parent.nachname.trim() || ans.parent.geburtsdatum !== parent.geburtsdatum
      || ans.child.vorname.trim() !== ctx.vorname.trim() || ans.child.nachname.trim() !== ctx.nachname.trim() || ans.child.geburtsdatum !== ctx.geburtsdatum)
      errors.push({ field: f, code: "identity_mismatch" });
    const e = x.kind === "sta" ? validateSta(ans as StaInput).map((code) => ({ field: f, code }))
      : x.kind === "income" ? validateIncomeAnnex(ans as IncomeAnnexAnswers, today) : validateResidenceAnnex(ans as ResidenceAnnexAnswers, today);
    errors.push(...e.map((y) => ({ field: y.field.startsWith(f) ? y.field : `${f}.${y.field}`, code: y.code })));
  }
  // Same annex kind for both parents would need two copies of one original: supported (separate files).
  for (const k of ["sta", "income", "residence"] as const) {
    const given = k === "sta" ? a.sta : k === "income" ? a.incomeAnnex : a.residence;
    for (const r of Object.keys(given ?? {}) as Role[]) if (!required.some((x) => x.kind === k && x.role === r)) errors.push({ field: `${k}.${r}`, code: "not_applicable" });
  }
  return { errors, reasons: [...reasons], required };
}

export async function prepareElterngeldPackage(land: EgLand | "", a: PackageAnswers, originals: PackageOriginals, today: string, opts: StrictFillOptions): Promise<PackageResult> {
  const v = validatePackage(land, a, today);
  if (v.reasons.length) return { ok: false, code: "OFFICIAL_ROUTE", reasons: v.reasons, route: resolveElterngeldRoute(land, a.child.geburtsdatum, today) };
  if (v.errors.length) return { ok: false, code: "INVALID_INPUT", errors: v.errors };
  const L = land as EgLand;
  const missing = (["main", ...new Set(v.required.map((x) => x.kind))] as const).filter((k) => !originals[k]);
  if (missing.length) return { ok: false, code: "ORIGINAL_MISSING", missing: [...missing] };
  const files: Extract<PackageResult, { ok: true }>["files"] = [];
  const main = await fillStrictAcroForm(EG_SPEC, originals.main, [
    ...childFills(a.child), ...householdFills(a.household), ...incomeStageFills(a.income, a.household),
    ...planStageFills(a.plan, a.income, a.household), ...finalStageFills(a.final, a.household)], opts);
  if (main.ok === false) return { ok: false, code: "FILL_REFUSED", document: "main", detail: main.code };
  files.push({ kind: "main", bytes: main.bytes, filledFields: main.filledFields });
  for (const x of v.required) {
    const spec = x.kind === "sta" ? staSpec(L) : x.kind === "income" ? incomeAnnexSpec(L) : residenceSpec(L);
    const fills = x.kind === "sta" ? staFills(a.sta![x.role]!) : x.kind === "income" ? incomeAnnexFills(a.incomeAnnex![x.role]!) : residenceFills(a.residence![x.role]!);
    // A fresh copy per parent: the engine never mutates the user's original buffer.
    const r = await fillStrictAcroForm(spec as never, originals[x.kind]!.slice(), fills as never, opts);
    if (r.ok === false) return { ok: false, code: "FILL_REFUSED", document: x.kind, detail: r.code };
    files.push({ kind: x.kind, role: x.role, bytes: r.bytes, filledFields: r.filledFields });
  }
  return { ok: true, files };
}
