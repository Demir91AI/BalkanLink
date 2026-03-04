/**
 * BalkanLink Brutto-Netto Rechner – Configuration & Calculation Engine
 * All rates/thresholds for 2025 (Germany). Update this file annually.
 *
 * DISCLAIMER: This is an approximation. Real payroll involves many edge cases.
 */

// ─── Tax Year Config ───
export const TAX_YEARS = [2025, 2024] as const;
export type TaxYear = (typeof TAX_YEARS)[number];

// ─── Bundesländer ───
export const BUNDESLAENDER = [
  { value: "BW", label: "Baden-Württemberg", kirchensteuerSatz: 8 },
  { value: "BY", label: "Bayern", kirchensteuerSatz: 8 },
  { value: "BE", label: "Berlin", kirchensteuerSatz: 9 },
  { value: "BB", label: "Brandenburg", kirchensteuerSatz: 9 },
  { value: "HB", label: "Bremen", kirchensteuerSatz: 9 },
  { value: "HH", label: "Hamburg", kirchensteuerSatz: 9 },
  { value: "HE", label: "Hessen", kirchensteuerSatz: 9 },
  { value: "MV", label: "Mecklenburg-Vorpommern", kirchensteuerSatz: 9 },
  { value: "NI", label: "Niedersachsen", kirchensteuerSatz: 9 },
  { value: "NW", label: "Nordrhein-Westfalen", kirchensteuerSatz: 9 },
  { value: "RP", label: "Rheinland-Pfalz", kirchensteuerSatz: 9 },
  { value: "SL", label: "Saarland", kirchensteuerSatz: 9 },
  { value: "SN", label: "Sachsen", kirchensteuerSatz: 9 },
  { value: "ST", label: "Sachsen-Anhalt", kirchensteuerSatz: 9 },
  { value: "SH", label: "Schleswig-Holstein", kirchensteuerSatz: 9 },
  { value: "TH", label: "Thüringen", kirchensteuerSatz: 9 },
] as const;

// ─── Social contribution rates (2025, employee share unless noted) ───
export interface SocialRates {
  rv: number;          // Rentenversicherung AN-Anteil
  rvAG: number;        // Rentenversicherung AG-Anteil
  av: number;          // Arbeitslosenversicherung AN
  avAG: number;        // Arbeitslosenversicherung AG
  kvBase: number;      // KV allgemeiner Beitragssatz AN
  kvAG: number;        // KV AG
  pvBase: number;      // Pflegeversicherung Basis AN
  pvAG: number;        // PV AG
  pvKinderlosZuschlag: number;  // Zuschlag für Kinderlose ab 23
  pvKindAbschlag: number;       // Abschlag pro Kind unter 25 (ab 2. Kind)
  bbgRvAv: number;     // Beitragsbemessungsgrenze RV/AV (monatlich)
  bbgKvPv: number;     // Beitragsbemessungsgrenze KV/PV (monatlich)
  defaultZusatzbeitrag: number; // KV Zusatzbeitrag default (gesamt, AN zahlt Hälfte)
}

export const RATES_2025: SocialRates = {
  rv: 0.093,
  rvAG: 0.093,
  av: 0.013,
  avAG: 0.013,
  kvBase: 0.073,        // 14.6% / 2
  kvAG: 0.073,
  pvBase: 0.017,         // 3.4% / 2
  pvAG: 0.017,
  pvKinderlosZuschlag: 0.006,
  pvKindAbschlag: 0.0025,
  bbgRvAv: 7550,
  bbgKvPv: 5512.50,
  defaultZusatzbeitrag: 2.5,  // % Gesamtzusatzbeitrag, AN zahlt Hälfte
};

export const RATES_2024: SocialRates = {
  rv: 0.093,
  rvAG: 0.093,
  av: 0.013,
  avAG: 0.013,
  kvBase: 0.073,
  kvAG: 0.073,
  pvBase: 0.017,
  pvAG: 0.017,
  pvKinderlosZuschlag: 0.006,
  pvKindAbschlag: 0.0025,
  bbgRvAv: 7550,
  bbgKvPv: 5175,
  defaultZusatzbeitrag: 1.7,
};

export function getRatesForYear(year: TaxYear): SocialRates {
  return year === 2024 ? RATES_2024 : RATES_2025;
}

// ─── Income tax zones (2025 simplified progressive tariff §32a EStG) ───
function computeYearlyTax2025(zvE: number): number {
  // zvE = zu versteuerndes Einkommen (yearly)
  if (zvE <= 12084) return 0;
  if (zvE <= 17430) {
    const y = (zvE - 12084) / 10000;
    return Math.floor((932.30 * y + 1400) * y);
  }
  if (zvE <= 68430) {
    const y = (zvE - 17430) / 10000;
    return Math.floor((176.44 * y + 2397) * y + 1025.38);
  }
  if (zvE <= 277825) {
    return Math.floor(0.42 * zvE - 10602.13);
  }
  return Math.floor(0.45 * zvE - 18936.88);
}

function computeYearlyTax2024(zvE: number): number {
  if (zvE <= 11604) return 0;
  if (zvE <= 17005) {
    const y = (zvE - 11604) / 10000;
    return Math.floor((922.98 * y + 1400) * y);
  }
  if (zvE <= 66760) {
    const y = (zvE - 17005) / 10000;
    return Math.floor((181.19 * y + 2397) * y + 1025.38);
  }
  if (zvE <= 277825) {
    return Math.floor(0.42 * zvE - 10602.13);
  }
  return Math.floor(0.45 * zvE - 18936.88);
}

function computeYearlyTax(zvE: number, year: TaxYear): number {
  return year === 2024 ? computeYearlyTax2024(zvE) : computeYearlyTax2025(zvE);
}

// ─── Steuerklasse multiplier / Grundfreibetrag adjustments ───
// Steuerklasse 3 → double Grundfreibetrag, Klasse 5/6 → no Grundfreibetrag
function adjustTaxForSteuerklasse(
  yearlyBrutto: number,
  steuerklasse: number,
  kinderfreibetrag: number,
  freibetrag: number,
  year: TaxYear
): number {
  // Simplified: compute zvE from brutto minus Werbungskosten-Pauschale & Sozialversicherung estimate
  const werbungskosten = 1230;
  const sonderausgaben = 36; // Pauschbetrag
  const vorsorgepauschale = yearlyBrutto * 0.11; // rough estimate for social deductions
  
  let zvE = yearlyBrutto - werbungskosten - sonderausgaben - vorsorgepauschale - freibetrag;
  
  // Kinderfreibetrag (applied per tax unit, rough)
  const kinderfreibetragBetrag = kinderfreibetrag * 9312; // 2025: 6612 + 2928 BEA = 9540 approx, use 9312 simplified
  
  // Steuerklasse adjustments
  switch (steuerklasse) {
    case 1:
    case 4:
      // Standard
      zvE = Math.max(0, zvE);
      break;
    case 2:
      // Entlastungsbetrag für Alleinerziehende: 4260€
      zvE = Math.max(0, zvE - 4260);
      break;
    case 3:
      // Splitting: double Grundfreibetrag effect → compute tax on half, then double
      zvE = Math.max(0, zvE);
      return computeYearlyTax(zvE / 2, year) * 2;
    case 5:
      // No Grundfreibetrag → higher tax
      zvE = yearlyBrutto - werbungskosten - sonderausgaben - vorsorgepauschale - freibetrag;
      zvE = Math.max(0, zvE);
      // Rough: add back the Grundfreibetrag that's normally subtracted in the formula
      return computeYearlyTax(zvE, year) * 1.0; // formula already handles it
    case 6:
      // Highest: no freibeträge
      zvE = yearlyBrutto - werbungskosten - sonderausgaben - vorsorgepauschale;
      zvE = Math.max(0, zvE);
      return computeYearlyTax(zvE, year);
  }
  
  // Check Günstigerprüfung: Kindergeld vs Kinderfreibetrag
  // Simplified: if kinderfreibetrag > 0, subtract from zvE
  if (kinderfreibetrag > 0) {
    const taxWithout = computeYearlyTax(zvE, year);
    const taxWith = computeYearlyTax(Math.max(0, zvE - kinderfreibetragBetrag), year);
    const kindergeldYearly = kinderfreibetrag * 250 * 12; // rough
    if ((taxWithout - taxWith) > kindergeldYearly) {
      zvE = Math.max(0, zvE - kinderfreibetragBetrag);
    }
  }
  
  return computeYearlyTax(Math.max(0, zvE), year);
}

// ─── Main calculation ───
export interface BruttoNettoInputs {
  brutto: number;
  period: "monatlich" | "jaehrlich";
  steuerklasse: number;
  bundesland: string;
  kirchensteuer: boolean;
  kirchensteuerSatzOverride?: number;
  steuerjahr: TaxYear;
  alter: number;
  kinderfreibetrag: number;
  kinderlos: boolean;
  kinderUnter25: number;
  kvType: "gesetzlich" | "privat";
  zusatzbeitrag: number;
  pkvBeitrag: number;
  rvEnabled: boolean;
  avEnabled: boolean;
  pvEnabled: boolean;
  kvEnabled: boolean;
  freibetrag: number;
  einmalzahlung: number;
}

export interface BruttoNettoResult {
  bruttoMonat: number;
  bruttoJahr: number;
  nettoMonat: number;
  nettoJahr: number;
  lohnsteuerMonat: number;
  soliMonat: number;
  kirchensteuerMonat: number;
  steuernGesamt: number;
  rvAN: number;
  avAN: number;
  kvAN: number;
  pvAN: number;
  sozialabgabenGesamt: number;
  rvAG: number;
  avAG: number;
  kvAG: number;
  pvAG: number;
  agKostenGesamt: number;
  pkvBeitragMonat: number;
}

export function computeBruttoNetto(inputs: BruttoNettoInputs): BruttoNettoResult {
  const rates = getRatesForYear(inputs.steuerjahr);
  
  // Normalize to monthly
  const bruttoMonat = inputs.period === "jaehrlich" ? inputs.brutto / 12 : inputs.brutto;
  const bruttoJahr = bruttoMonat * 12;
  
  // ── Social contributions (employee) ──
  const rvBasis = Math.min(bruttoMonat, rates.bbgRvAv);
  const kvBasis = Math.min(bruttoMonat, rates.bbgKvPv);
  
  const rvAN = inputs.rvEnabled ? rvBasis * rates.rv : 0;
  const avAN = inputs.avEnabled ? rvBasis * rates.av : 0;
  
  // KV
  let kvAN = 0;
  let pkvBeitragMonat = 0;
  if (inputs.kvType === "gesetzlich" && inputs.kvEnabled) {
    const zusatzAnteil = (inputs.zusatzbeitrag / 100) / 2;
    kvAN = kvBasis * (rates.kvBase + zusatzAnteil);
  } else if (inputs.kvType === "privat") {
    pkvBeitragMonat = inputs.pkvBeitrag;
  }
  
  // PV
  let pvAN = 0;
  if (inputs.pvEnabled) {
    let pvRate = rates.pvBase;
    if (inputs.kinderlos && inputs.alter >= 23) {
      pvRate += rates.pvKinderlosZuschlag;
    }
    // Abschlag for children under 25 (from 2nd child onwards)
    if (inputs.kinderUnter25 >= 2) {
      const abschlag = Math.min(inputs.kinderUnter25 - 1, 4) * rates.pvKindAbschlag;
      pvRate = Math.max(0, pvRate - abschlag);
    }
    pvAN = kvBasis * pvRate;
  }
  
  const sozialabgabenGesamt = rvAN + avAN + kvAN + pvAN + pkvBeitragMonat;
  
  // ── Taxes ──
  const kirchensteuerSatz = inputs.kirchensteuerSatzOverride ??
    (BUNDESLAENDER.find(b => b.value === inputs.bundesland)?.kirchensteuerSatz ?? 9);
  
  const yearlyTax = adjustTaxForSteuerklasse(
    bruttoJahr,
    inputs.steuerklasse,
    inputs.kinderfreibetrag,
    inputs.freibetrag + inputs.einmalzahlung,
    inputs.steuerjahr
  );
  
  const lohnsteuerMonat = Math.max(0, yearlyTax / 12);
  
  // Soli: only if Lohnsteuer > Freigrenze (2025: ~18,130€/year → ~1510/month for singles)
  // Simplified: Soli applies if monthly tax > ~83€ (rough threshold)
  const soliFreigrenze = inputs.steuerklasse === 3 ? 162.34 : 81.17;
  const soliMonat = lohnsteuerMonat > soliFreigrenze ? lohnsteuerMonat * 0.055 : 0;
  
  const kirchensteuerMonat = inputs.kirchensteuer ? lohnsteuerMonat * (kirchensteuerSatz / 100) : 0;
  
  const steuernGesamt = lohnsteuerMonat + soliMonat + kirchensteuerMonat;
  
  // ── Netto ──
  const nettoMonat = bruttoMonat - steuernGesamt - sozialabgabenGesamt;
  
  // ── Employer costs ──
  const rvAG = inputs.rvEnabled ? rvBasis * rates.rvAG : 0;
  const avAG = inputs.avEnabled ? rvBasis * rates.avAG : 0;
  const kvAG = inputs.kvType === "gesetzlich" && inputs.kvEnabled
    ? kvBasis * (rates.kvAG + (inputs.zusatzbeitrag / 100) / 2)
    : 0;
  const pvAG = inputs.pvEnabled ? kvBasis * rates.pvAG : 0;
  const agKostenGesamt = bruttoMonat + rvAG + avAG + kvAG + pvAG;
  
  const r2 = (n: number) => Math.round(n * 100) / 100;
  
  return {
    bruttoMonat: r2(bruttoMonat),
    bruttoJahr: r2(bruttoJahr),
    nettoMonat: r2(nettoMonat),
    nettoJahr: r2(nettoMonat * 12),
    lohnsteuerMonat: r2(lohnsteuerMonat),
    soliMonat: r2(soliMonat),
    kirchensteuerMonat: r2(kirchensteuerMonat),
    steuernGesamt: r2(steuernGesamt),
    rvAN: r2(rvAN),
    avAN: r2(avAN),
    kvAN: r2(kvAN),
    pvAN: r2(pvAN),
    sozialabgabenGesamt: r2(sozialabgabenGesamt),
    rvAG: r2(rvAG),
    avAG: r2(avAG),
    kvAG: r2(kvAG),
    pvAG: r2(pvAG),
    agKostenGesamt: r2(agKostenGesamt),
    pkvBeitragMonat: r2(pkvBeitragMonat),
  };
}

export const DEFAULT_INPUTS: BruttoNettoInputs = {
  brutto: 3500,
  period: "monatlich",
  steuerklasse: 1,
  bundesland: "NW",
  kirchensteuer: false,
  steuerjahr: 2025,
  alter: 30,
  kinderfreibetrag: 0,
  kinderlos: true,
  kinderUnter25: 0,
  kvType: "gesetzlich",
  zusatzbeitrag: 2.5,
  pkvBeitrag: 400,
  rvEnabled: true,
  avEnabled: true,
  pvEnabled: true,
  kvEnabled: true,
  freibetrag: 0,
  einmalzahlung: 0,
};
