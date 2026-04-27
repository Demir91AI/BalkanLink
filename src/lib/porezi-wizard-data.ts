/**
 * Tax Wizard — 8-step classifier data + classification logic.
 *
 * Goal: tell the user (in plain language) whether their German income-tax
 * return is **mandatory** (Pflichtveranlagung), **voluntary but
 * recommended** (Antragsveranlagung — likely worth filing), or
 * **voluntary and probably optional** (Antragsveranlagung — usually not
 * worth it).
 *
 * STRICT LEGAL CONSTRAINTS:
 *   - This is informational only. It is NOT tax advice and does NOT replace
 *     a Steuerberater or Lohnsteuerhilfeverein.
 *   - We never quote concrete refund amounts, freibeträge, or thresholds in
 *     euros. The wizard expresses results qualitatively.
 *   - We never collect or transmit PII. State stays in component memory.
 *
 * Source-of-truth references (for the user-facing legal note):
 *   §§ 25, 46 EStG (Einkommensteuergesetz)
 *   R LStR (Lohnsteuer-Richtlinien)
 *   BMF Schreiben (laufende Anwendungserlasse)
 *
 * All user-visible strings live in the i18n `porezi` namespace under
 * `wizard.*` for all four languages (bs/de/hr/sr).
 */

export type WizardStepId =
  | "year"
  | "residency"
  | "employer"
  | "wageReplacement"
  | "maritalStatus"
  | "sideIncome"
  | "freibetrag"
  | "deductibles";

/** Identifier for an individual answer option. Stable across languages. */
export type WizardAnswerId = string;

export interface WizardOption {
  /** Stable id used as both the key in answers and the i18n suffix. */
  id: WizardAnswerId;
  /**
   * Optional flag — only shown on this step if the previous answers warrant
   * it. Used by the conditional "deductibles" multi-select.
   */
  group?: "common" | "extra";
}

export interface WizardStep {
  id: WizardStepId;
  /**
   * `single` — one-of-N radio
   * `multi`  — checkbox list (deductibles only)
   */
  type: "single" | "multi";
  options: WizardOption[];
  /**
   * If returning false, the step is hidden for the current answers.
   * Used for non-resident early-out: once user says they were not tax
   * resident, the rest of the questions are skipped.
   */
  show?: (answers: WizardAnswers) => boolean;
}

export type WizardAnswers = Partial<{
  year: "2024" | "2025";
  residency: "yesFullYear" | "yesPartial" | "no";
  employer: "singleEmployer" | "multipleEmployers" | "noEmployment";
  wageReplacement:
    | "none"
    | "kurzarbeit"
    | "elterngeld"
    | "krankengeld"
    | "arbeitslosengeld";
  maritalStatus: "single" | "marriedClass3or5" | "marriedClass4Faktor" | "marriedClass4";
  sideIncome: "none" | "minor" | "significant";
  freibetrag: "yes" | "no";
  /** Multi-select. Empty array = none. */
  deductibles: WizardDeductibleId[];
}>;

export type WizardDeductibleId =
  | "commute"
  | "homeOffice"
  | "doppelHaushalt"
  | "workClothing"
  | "training"
  | "donations"
  | "childcare"
  | "healthExtras"
  | "householdServices"
  | "none";

/** Final classification bucket. */
export type WizardOutcome =
  | "mandatory"
  | "recommended"
  | "optional"
  | "nonResident";

export const WIZARD_STEPS: WizardStep[] = [
  {
    id: "year",
    type: "single",
    options: [{ id: "2024" }, { id: "2025" }],
  },
  {
    id: "residency",
    type: "single",
    options: [
      { id: "yesFullYear" },
      { id: "yesPartial" },
      { id: "no" },
    ],
  },
  {
    id: "employer",
    type: "single",
    options: [
      { id: "singleEmployer" },
      { id: "multipleEmployers" },
      { id: "noEmployment" },
    ],
    show: (a) => a.residency !== "no",
  },
  {
    id: "wageReplacement",
    type: "single",
    options: [
      { id: "none" },
      { id: "kurzarbeit" },
      { id: "elterngeld" },
      { id: "krankengeld" },
      { id: "arbeitslosengeld" },
    ],
    show: (a) => a.residency !== "no",
  },
  {
    id: "maritalStatus",
    type: "single",
    options: [
      { id: "single" },
      { id: "marriedClass3or5" },
      { id: "marriedClass4Faktor" },
      { id: "marriedClass4" },
    ],
    show: (a) => a.residency !== "no",
  },
  {
    id: "sideIncome",
    type: "single",
    options: [{ id: "none" }, { id: "minor" }, { id: "significant" }],
    show: (a) => a.residency !== "no",
  },
  {
    id: "freibetrag",
    type: "single",
    options: [{ id: "yes" }, { id: "no" }],
    show: (a) => a.residency !== "no",
  },
  {
    id: "deductibles",
    type: "multi",
    options: [
      { id: "commute" },
      { id: "homeOffice" },
      { id: "doppelHaushalt" },
      { id: "workClothing" },
      { id: "training" },
      { id: "donations" },
      { id: "childcare" },
      { id: "healthExtras" },
      { id: "householdServices" },
      { id: "none" },
    ],
    show: (a) => a.residency !== "no",
  },
];

/**
 * Classification logic.
 *
 * The order matters — mandatory triggers (§ 46 Abs. 2 EStG) are checked
 * first. If none fire, the wizard decides between "recommended" and
 * "optional" based on signals that *typically* lead to a refund.
 */
export function classify(a: WizardAnswers): WizardOutcome | null {
  // Need at least year + residency answered before we can classify.
  if (!a.year || !a.residency) return null;

  if (a.residency === "no") return "nonResident";

  // Need the employer-related questions answered.
  if (!a.employer || !a.wageReplacement || !a.maritalStatus) return null;
  if (!a.sideIncome || !a.freibetrag || !a.deductibles) return null;

  /* ─── MANDATORY (Pflichtveranlagung) ─── */

  // Multiple employers in the same year → Pflicht (§ 46 Abs. 2 Nr. 2 EStG).
  if (a.employer === "multipleEmployers") return "mandatory";

  // Wage replacement above the Progressionsvorbehalt threshold —
  // any of these typically trigger Pflicht (§ 46 Abs. 2 Nr. 1 EStG).
  if (a.wageReplacement && a.wageReplacement !== "none") return "mandatory";

  // Steuerklassen-Kombi III/V → Pflicht (§ 46 Abs. 2 Nr. 3a EStG).
  // IV/IV mit Faktor → also Pflicht (§ 46 Abs. 2 Nr. 3a EStG).
  if (
    a.maritalStatus === "marriedClass3or5" ||
    a.maritalStatus === "marriedClass4Faktor"
  ) {
    return "mandatory";
  }

  // Significant side income → Pflicht (§ 46 Abs. 2 Nr. 1 EStG, broadly).
  if (a.sideIncome === "significant") return "mandatory";

  // Lohnsteuer-Freibetrag eingetragen → Pflicht (§ 46 Abs. 2 Nr. 4 EStG).
  if (a.freibetrag === "yes") return "mandatory";

  /* ─── RECOMMENDED (Antragsveranlagung — likely worth filing) ─── */

  const ded = new Set(a.deductibles);
  const hasMeaningfulDeductible = [
    "commute",
    "doppelHaushalt",
    "training",
    "donations",
    "childcare",
    "householdServices",
  ].some((k) => ded.has(k as WizardDeductibleId));

  // Partial-year residency without high deductibles still tends to be
  // worthwhile because the annual basic allowance is fully granted.
  if (a.residency === "yesPartial") return "recommended";

  if (hasMeaningfulDeductible) return "recommended";

  /* ─── OPTIONAL (Antragsveranlagung — usually not worth it) ─── */
  return "optional";
}
