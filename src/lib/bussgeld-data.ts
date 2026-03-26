/** Traffic fine calculator data for Germany (Bußgeldkatalog) */

export type OffenseType = "speed" | "phone" | "redLight" | "parking" | "alcohol";

export interface FineResult {
  amount: number;
  points: number;
  ban: boolean;
  banDuration?: string;
  explanation: string;
}

// Speed fines (innerorts / außerorts) – simplified from official Bußgeldkatalog
const speedFinesInnerorts: { upTo: number; amount: number; points: number; ban: boolean; banDuration?: string }[] = [
  { upTo: 10, amount: 30, points: 0, ban: false },
  { upTo: 15, amount: 50, points: 0, ban: false },
  { upTo: 20, amount: 70, points: 0, ban: false },
  { upTo: 25, amount: 115, points: 1, ban: false },
  { upTo: 30, amount: 180, points: 1, ban: true, banDuration: "1 mjesec" },
  { upTo: 40, amount: 260, points: 2, ban: true, banDuration: "1 mjesec" },
  { upTo: 50, amount: 400, points: 2, ban: true, banDuration: "1 mjesec" },
  { upTo: 60, amount: 560, points: 2, ban: true, banDuration: "2 mjeseca" },
  { upTo: 70, amount: 700, points: 2, ban: true, banDuration: "3 mjeseca" },
];

const speedFinesAusserorts: { upTo: number; amount: number; points: number; ban: boolean; banDuration?: string }[] = [
  { upTo: 10, amount: 20, points: 0, ban: false },
  { upTo: 15, amount: 40, points: 0, ban: false },
  { upTo: 20, amount: 60, points: 0, ban: false },
  { upTo: 25, amount: 100, points: 1, ban: false },
  { upTo: 30, amount: 150, points: 1, ban: false },
  { upTo: 40, amount: 200, points: 1, ban: true, banDuration: "1 mjesec" },
  { upTo: 50, amount: 320, points: 2, ban: true, banDuration: "1 mjesec" },
  { upTo: 60, amount: 480, points: 2, ban: true, banDuration: "1 mjesec" },
  { upTo: 70, amount: 600, points: 2, ban: true, banDuration: "2 mjeseca" },
];

export function calculateSpeedFine(kmOver: number, innerorts: boolean): FineResult {
  const table = innerorts ? speedFinesInnerorts : speedFinesAusserorts;
  const entry = table.find((e) => kmOver <= e.upTo) || table[table.length - 1];

  const locationLabel = innerorts ? "u gradu" : "van naselja";
  let explanation = `${kmOver} km/h preko dozvoljene brzine ${locationLabel}.`;

  if (entry.points > 0) {
    explanation += ` Ovo je ozbiljan prekršaj – dobijaš ${entry.points} bod(a) u Flensburgu.`;
  }
  if (entry.ban) {
    explanation += ` Prijeti ti zabrana vožnje${entry.banDuration ? ` od ${entry.banDuration}` : ""}.`;
  }
  if (kmOver <= 10) {
    explanation += " Blaži prekršaj, ali pazi ubuduće.";
  }

  return {
    amount: entry.amount,
    points: entry.points,
    ban: entry.ban,
    banDuration: entry.banDuration,
    explanation,
  };
}

export function calculatePhoneFine(): FineResult {
  return {
    amount: 100,
    points: 1,
    ban: false,
    explanation:
      "Korištenje telefona u vožnji je 100€ + 1 bod. Ako dođe do nesreće ili ugrožavanja, kazna može biti viša – do 200€ + zabrana vožnje.",
  };
}

export function calculateRedLightFine(longRed: boolean): FineResult {
  if (longRed) {
    return {
      amount: 200,
      points: 2,
      ban: true,
      banDuration: "1 mjesec",
      explanation:
        "Prelazak crvenog svjetla (duže od 1 sekunde) je težak prekršaj. Osim novčane kazne, dobijaš 2 boda i 1 mjesec zabrane vožnje.",
    };
  }
  return {
    amount: 90,
    points: 1,
    ban: false,
    explanation:
      "Prelazak crvenog svjetla (kratko, ispod 1 sekunde) – kazna 90€ i 1 bod. Ozbiljan prekršaj, pazi na semafore!",
  };
}

export function calculateParkingFine(): FineResult {
  return {
    amount: 55,
    points: 0,
    ban: false,
    explanation:
      "Nepropisno parkiranje – kazna varira od 10€ do 55€+. Za parkiranje na invalidskom mjestu ili vatrogasnom putu kazne su znatno veće (do 100€+). Prikazana kazna je prosječna.",
  };
}

export function calculateAlcoholFine(): FineResult {
  return {
    amount: 500,
    points: 2,
    ban: true,
    banDuration: "1 mjesec",
    explanation:
      "Alkohol u vožnji (0,5‰ i više) – prvi put 500€, 2 boda, 1 mjesec zabrana. Drugi put 1.000€, treći 1.500€. Iznad 1,1‰ je krivično djelo!",
  };
}

export function calculateFine(
  offense: OffenseType,
  options?: { kmOver?: number; innerorts?: boolean; longRed?: boolean }
): FineResult {
  switch (offense) {
    case "speed":
      return calculateSpeedFine(options?.kmOver ?? 10, options?.innerorts ?? true);
    case "phone":
      return calculatePhoneFine();
    case "redLight":
      return calculateRedLightFine(options?.longRed ?? false);
    case "parking":
      return calculateParkingFine();
    case "alcohol":
      return calculateAlcoholFine();
  }
}

// Quick reference tables for display
export const speedTableInnerorts = speedFinesInnerorts.map((e, i) => ({
  range: i === 0 ? `do ${e.upTo}` : `${speedFinesInnerorts[i - 1].upTo + 1}–${e.upTo}`,
  amount: e.amount,
  points: e.points,
  ban: e.ban ? (e.banDuration || "Da") : "–",
}));

export const speedTableAusserorts = speedFinesAusserorts.map((e, i) => ({
  range: i === 0 ? `do ${e.upTo}` : `${speedFinesAusserorts[i - 1].upTo + 1}–${e.upTo}`,
  amount: e.amount,
  points: e.points,
  ban: e.ban ? (e.banDuration || "Da") : "–",
}));

export const otherOffensesTable = [
  { offense: "📱 Telefon u vožnji", amount: "100€", points: 1, ban: "–" },
  { offense: "📱 Telefon + nesreća", amount: "200€", points: 2, ban: "1 mj." },
  { offense: "🚦 Crveno (kratko)", amount: "90€", points: 1, ban: "–" },
  { offense: "🚦 Crveno (dugo >1s)", amount: "200€", points: 2, ban: "1 mj." },
  { offense: "🚫 Parkiranje (prosječno)", amount: "55€", points: 0, ban: "–" },
  { offense: "🚫 Invalidsko mjesto", amount: "55–100€", points: 0, ban: "–" },
  { offense: "🍺 Alkohol ≥0,5‰ (1. put)", amount: "500€", points: 2, ban: "1 mj." },
  { offense: "🍺 Alkohol ≥0,5‰ (2. put)", amount: "1.000€", points: 2, ban: "3 mj." },
];
