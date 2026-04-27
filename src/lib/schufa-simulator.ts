/**
 * Schufa Simulator — Edukativna client-side procjena.
 *
 * VAŽNO: Ovo NIJE zvanični Schufa Score. Ovo je orijentaciona procjena
 * bazirana na Schufa javno objavljenim scoring faktorima
 * (https://www.schufa.de/scoring/). Sva logika se izvršava u browseru,
 * ništa se ne šalje na server.
 *
 * i18n: simulator vraća translation KEYS (npr. "stayLong"), komponente
 * koriste useTranslation("schufa") da prevedu na trenutni jezik.
 */

export type DispoUsage =
  | "none"
  | "approved_unused"
  | "occasional"
  | "constant"
  | "mahnung"
  | "cancelled";

export type CardCount = "0" | "1-2" | "3-4" | "5+";
export type ActiveLoans = "0" | "1" | "2-3" | "4+";
export type AddressChanges = "0-1" | "2-3" | "4+";
export type SchufaInquiries = "0-2" | "3-5" | "6-10" | "11+";
export type UnpaidBills = "none" | "one" | "multiple" | "inkasso";
export type Insolvency = "no" | "discharged" | "active";

export interface SimInput {
  yearsInGermany: number;
  addressChanges: AddressChanges;
  activeLoans: ActiveLoans;
  cardCount: CardCount;
  bankAccounts: number;
  dispo: DispoUsage;
  unpaidBills: UnpaidBills;
  schufaInquiries: SchufaInquiries;
  insolvency: Insolvency;
}

export type RiskClass = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H";

export interface Factor {
  /** i18n key in `schufa.factors.*` */
  key: string;
  /** Pozitivni doprinos je +X, negativni -X (procentnih poena) */
  delta: number;
  /** Optional interpolation params (e.g. { count: 2 }) */
  params?: Record<string, string | number>;
}

export interface ActionItem {
  priority: "high" | "medium" | "low";
  /** i18n key in `schufa.actions.*` */
  key: string;
  /** Procijenjeni efekat — već lokalizovan ili oznaka tipa "+10-18%" / "Prevencija" */
  estimatedImpact: string;
  /** Vremenski okvir u mjesecima */
  timeframeMonths: number;
}

export interface SimResult {
  rangeLow: number;
  rangeHigh: number;
  riskClass: RiskClass;
  factors: Factor[];
  chances: {
    rentMunich: "low" | "medium" | "high";
    consumerLoan: "low" | "medium" | "high";
    creditCard: "low" | "medium" | "high";
    carLeasing: "low" | "medium" | "high";
  };
  actionPlan: ActionItem[];
}

export function simulate(input: SimInput): SimResult {
  let score = 87;
  const factors: Factor[] = [];

  // Boravak
  if (input.yearsInGermany >= 5) {
    score += 3;
    factors.push({ key: "stayLong", delta: 3 });
  } else if (input.yearsInGermany >= 2) {
    score += 1;
    factors.push({ key: "stayMid", delta: 1 });
  } else {
    score -= 4;
    factors.push({ key: "stayShort", delta: -4 });
  }

  // Adresa
  if (input.addressChanges === "4+") {
    score -= 6;
    factors.push({ key: "addressMany", delta: -6 });
  } else if (input.addressChanges === "2-3") {
    score -= 2;
    factors.push({ key: "addressMid", delta: -2 });
  }

  // Krediti
  if (input.activeLoans === "0") {
    score -= 1;
    factors.push({ key: "loansNone", delta: -1 });
  } else if (input.activeLoans === "1") {
    score += 2;
    factors.push({ key: "loansOne", delta: 2 });
  } else if (input.activeLoans === "2-3") {
    score -= 1;
    factors.push({ key: "loansMid", delta: -1 });
  } else {
    score -= 8;
    factors.push({ key: "loansMany", delta: -8 });
  }

  // Kartice
  if (input.cardCount === "5+") {
    score -= 5;
    factors.push({ key: "cardsMany", delta: -5 });
  } else if (input.cardCount === "3-4") {
    score -= 1;
    factors.push({ key: "cardsMid", delta: -1 });
  } else if (input.cardCount === "1-2") {
    score += 1;
    factors.push({ key: "cardsIdeal", delta: 1 });
  }

  // Računi
  if (input.bankAccounts === 0) {
    score -= 5;
    factors.push({ key: "accountsNone", delta: -5 });
  } else if (input.bankAccounts >= 4) {
    score -= 3;
    factors.push({ key: "accountsMany", delta: -3 });
  } else {
    score += 1;
    factors.push({ key: "accountsOk", delta: 1, params: { count: input.bankAccounts } });
  }

  // Dispo
  switch (input.dispo) {
    case "none":
      break;
    case "approved_unused":
      score += 3;
      factors.push({ key: "dispoApprovedUnused", delta: 3 });
      break;
    case "occasional":
      score += 1;
      factors.push({ key: "dispoOccasional", delta: 1 });
      break;
    case "constant":
      score -= 2;
      factors.push({ key: "dispoConstant", delta: -2 });
      break;
    case "mahnung":
      score -= 18;
      factors.push({ key: "dispoMahnung", delta: -18 });
      break;
    case "cancelled":
      score -= 22;
      factors.push({ key: "dispoCancelled", delta: -22 });
      break;
  }

  // Računi
  switch (input.unpaidBills) {
    case "none":
      score += 2;
      factors.push({ key: "billsNone", delta: 2 });
      break;
    case "one":
      score -= 8;
      factors.push({ key: "billsOne", delta: -8 });
      break;
    case "multiple":
      score -= 16;
      factors.push({ key: "billsMultiple", delta: -16 });
      break;
    case "inkasso":
      score -= 28;
      factors.push({ key: "billsInkasso", delta: -28 });
      break;
  }

  // Upiti
  switch (input.schufaInquiries) {
    case "0-2":
      score += 1;
      factors.push({ key: "inquiriesFew", delta: 1 });
      break;
    case "3-5":
      break;
    case "6-10":
      score -= 4;
      factors.push({ key: "inquiriesMany", delta: -4 });
      break;
    case "11+":
      score -= 10;
      factors.push({ key: "inquiriesVeryMany", delta: -10 });
      break;
  }

  // Insolvencija
  if (input.insolvency === "active") {
    score -= 35;
    factors.push({ key: "insolvencyActive", delta: -35 });
  } else if (input.insolvency === "discharged") {
    score -= 12;
    factors.push({ key: "insolvencyDischarged", delta: -12 });
  }

  score = Math.max(35, Math.min(99, score));
  factors.sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta));

  const riskClass: RiskClass =
    score >= 95 ? "A" :
    score >= 90 ? "B" :
    score >= 85 ? "C" :
    score >= 80 ? "D" :
    score >= 70 ? "E" :
    score >= 60 ? "F" :
    score >= 50 ? "G" : "H";

  const c = (s: number): "low" | "medium" | "high" =>
    s >= 90 ? "high" : s >= 78 ? "medium" : "low";

  const chances = {
    rentMunich: c(score - 4),
    consumerLoan: c(score),
    creditCard: c(score + 2),
    carLeasing: c(score - 1),
  };

  const actionPlan: ActionItem[] = [];

  actionPlan.push({
    priority: "high",
    key: "datenkopie",
    estimatedImpact: "datenkopie",
    timeframeMonths: 1,
  });

  if (input.unpaidBills === "inkasso" || input.unpaidBills === "multiple") {
    actionPlan.push({ priority: "high", key: "payInkasso", estimatedImpact: "+10-18%", timeframeMonths: 3 });
  }
  if (input.dispo === "mahnung" || input.dispo === "cancelled") {
    actionPlan.push({ priority: "high", key: "regulateDispo", estimatedImpact: "+8-15%", timeframeMonths: 6 });
  }
  if (input.schufaInquiries === "6-10" || input.schufaInquiries === "11+") {
    actionPlan.push({ priority: "high", key: "pauseInquiries", estimatedImpact: "+2-5%", timeframeMonths: 12 });
  }
  if (input.cardCount === "5+" || input.cardCount === "3-4") {
    actionPlan.push({ priority: "medium", key: "closeCards", estimatedImpact: "+1-3%", timeframeMonths: 2 });
  }
  if (input.dispo === "constant") {
    actionPlan.push({ priority: "medium", key: "exitDispo", estimatedImpact: "exitDispo", timeframeMonths: 3 });
  }
  if (input.bankAccounts === 0) {
    actionPlan.push({ priority: "high", key: "openGiro", estimatedImpact: "+3-6%", timeframeMonths: 6 });
  }
  if (input.activeLoans === "0" && input.cardCount === "0") {
    actionPlan.push({ priority: "low", key: "buildHistory", estimatedImpact: "+2-4%", timeframeMonths: 12 });
  }
  if (input.dispo === "approved_unused") {
    actionPlan.push({ priority: "low", key: "keepDispo", estimatedImpact: "keepDispo", timeframeMonths: 0 });
  }
  if (input.insolvency === "discharged") {
    actionPlan.push({ priority: "medium", key: "waitInsolvency", estimatedImpact: "+10-12%", timeframeMonths: 12 });
  }

  actionPlan.push({ priority: "low", key: "checkAnnually", estimatedImpact: "checkAnnually", timeframeMonths: 12 });

  const priorityOrder = { high: 0, medium: 1, low: 2 };
  actionPlan.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  const rangeLow = Math.max(30, score - 3);
  const rangeHigh = Math.min(99, score + 3);

  return {
    rangeLow,
    rangeHigh,
    riskClass,
    factors: factors.slice(0, 6),
    chances,
    actionPlan,
  };
}

/** Color tokens only — labels come from i18n: schufa.riskClass.<X> */
export const RISK_CLASS_COLORS: Record<RiskClass, string> = {
  A: "hsl(140, 65%, 50%)",
  B: "hsl(125, 60%, 50%)",
  C: "hsl(85, 55%, 50%)",
  D: "hsl(48, 80%, 55%)",
  E: "hsl(35, 80%, 55%)",
  F: "hsl(20, 75%, 55%)",
  G: "hsl(5, 70%, 55%)",
  H: "hsl(0, 75%, 50%)",
};

/** @deprecated keep for back-compat — use RISK_CLASS_COLORS + i18n */
export const RISK_CLASS_LABELS: Record<RiskClass, { label: string; color: string }> = {
  A: { label: "A", color: RISK_CLASS_COLORS.A },
  B: { label: "B", color: RISK_CLASS_COLORS.B },
  C: { label: "C", color: RISK_CLASS_COLORS.C },
  D: { label: "D", color: RISK_CLASS_COLORS.D },
  E: { label: "E", color: RISK_CLASS_COLORS.E },
  F: { label: "F", color: RISK_CLASS_COLORS.F },
  G: { label: "G", color: RISK_CLASS_COLORS.G },
  H: { label: "H", color: RISK_CLASS_COLORS.H },
};

/** Specijalni "impact" labeli koji su pune rečenice (ne procenti) — i18n keys */
export const SPECIAL_IMPACT_KEYS = new Set([
  "datenkopie",
  "exitDispo",
  "keepDispo",
  "checkAnnually",
]);
