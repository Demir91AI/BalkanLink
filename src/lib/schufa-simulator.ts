/**
 * Schufa Simulator — Edukativna client-side procjena.
 *
 * VAŽNO: Ovo NIJE zvanični Schufa Score. Ovo je orijentaciona procjena
 * bazirana na Schufa javno objavljenim scoring faktorima
 * (https://www.schufa.de/scoring/). Sva logika se izvršava u browseru,
 * ništa se ne šalje na server.
 *
 * Pravna osnova naših referenci:
 * - §31 BDSG (Scoring)
 * - §15 DSGVO (Datenkopie — pravo na besplatni izvod 1x godišnje)
 * - Schufa zvanične informacije o faktorima koji utječu na scoring
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
  /** Bosanski opis faktora */
  label: string;
  /** Pozitivni doprinos je +X, negativni -X (procentnih poena) */
  delta: number;
  /** Detaljnije objašnjenje */
  detail: string;
}

export interface ActionItem {
  priority: "high" | "medium" | "low";
  title: string;
  detail: string;
  /** Procijenjeni efekat na score raspon (npr. "+3-5%") */
  estimatedImpact: string;
  /** Vremenski okvir u mjesecima */
  timeframeMonths: number;
}

export interface SimResult {
  /** Donja granica raspona indikativne procjene (%) */
  rangeLow: number;
  /** Gornja granica raspona indikativne procjene (%) */
  rangeHigh: number;
  /** Indikativna risk klasa (A=najbolja, H=najgora) — ne identično sa Schufa Risikoklasom */
  riskClass: RiskClass;
  /** Top faktori koji utječu (sortirani po apsolutnom uticaju) */
  factors: Factor[];
  /** Procijenjene šanse za različite scenarije */
  chances: {
    rentMunich: "low" | "medium" | "high";
    consumerLoan: "low" | "medium" | "high";
    creditCard: "low" | "medium" | "high";
    carLeasing: "low" | "medium" | "high";
  };
  /** 6-mjesečni akcioni plan, sortiran po prioritetu */
  actionPlan: ActionItem[];
}

/**
 * Glavni scoring algoritam.
 * Polazimo od baseline 87% (njemački prosjek je oko 90% prema Schufa Kredit-Kompass)
 * i prilagođavamo prema unesenim faktorima.
 */
export function simulate(input: SimInput): SimResult {
  let score = 87;
  const factors: Factor[] = [];

  // --- Boravak ---
  if (input.yearsInGermany >= 5) {
    score += 3;
    factors.push({
      label: "Dugogodišnji boravak u Njemačkoj",
      delta: 3,
      detail: "Schufa pozitivno tretira stabilan boravak duži od 5 godina jer pokazuje stabilnost.",
    });
  } else if (input.yearsInGermany >= 2) {
    score += 1;
    factors.push({
      label: "Stabilan boravak (2+ godine)",
      delta: 1,
      detail: "Boravak duži od 2 godine je neutralno-pozitivan signal.",
    });
  } else {
    score -= 4;
    factors.push({
      label: "Kratko vrijeme u Njemačkoj",
      delta: -4,
      detail: "Schufa ima manje istorijskih podataka o tebi, što povećava rizik za poslovne partnere.",
    });
  }

  // --- Promjene adrese (česta promjena = upozorenje) ---
  if (input.addressChanges === "4+") {
    score -= 6;
    factors.push({
      label: "Česte promjene adrese (4+)",
      delta: -6,
      detail: "Više od 3 prijave u zadnjih 5 god. Schufa tumači kao nestabilnost (BDSG §31).",
    });
  } else if (input.addressChanges === "2-3") {
    score -= 2;
    factors.push({
      label: "Umjerene promjene adrese",
      delta: -2,
      detail: "2-3 promjene su prosjek; nemaju veliki uticaj.",
    });
  }

  // --- Aktivni krediti ---
  if (input.activeLoans === "0") {
    // Bez kredita = manje historije = neutralno
    score -= 1;
    factors.push({
      label: "Nema aktivnih kredita",
      delta: -1,
      detail: "Bez kredita Schufa nema dovoljno podataka za pouzdanu procjenu — score je 'tanji'.",
    });
  } else if (input.activeLoans === "1") {
    score += 2;
    factors.push({
      label: "Jedan aktivan kredit (uredan)",
      delta: 2,
      detail: "Uredno otplaćivanje 1 kredita je najbolji signal pouzdanosti.",
    });
  } else if (input.activeLoans === "2-3") {
    score -= 1;
    factors.push({
      label: "2-3 aktivna kredita",
      delta: -1,
      detail: "Više kredita povećava ukupnu zaduženost.",
    });
  } else {
    score -= 8;
    factors.push({
      label: "4+ aktivnih kredita",
      delta: -8,
      detail: "Visoka zaduženost je značajan negativan faktor po Schufa modelu.",
    });
  }

  // --- Kreditne kartice ---
  if (input.cardCount === "5+") {
    score -= 5;
    factors.push({
      label: "5+ kreditnih kartica",
      delta: -5,
      detail: "Previše otvorenih kreditnih linija povećava percepciju rizika.",
    });
  } else if (input.cardCount === "3-4") {
    score -= 1;
    factors.push({
      label: "3-4 kreditne kartice",
      delta: -1,
      detail: "Više kartica nego što ti realno treba.",
    });
  } else if (input.cardCount === "1-2") {
    score += 1;
    factors.push({
      label: "1-2 kreditne kartice (idealno)",
      delta: 1,
      detail: "Optimalan broj — pokazuje finansijsku organiziranost.",
    });
  }

  // --- Bankovni računi ---
  if (input.bankAccounts === 0) {
    score -= 5;
    factors.push({
      label: "Nema Girokonta",
      delta: -5,
      detail: "Bez bankovnog računa Schufa nema osnovnih podataka — kritično za bilo koju aplikaciju.",
    });
  } else if (input.bankAccounts >= 4) {
    score -= 3;
    factors.push({
      label: "Previše bankovnih računa (4+)",
      delta: -3,
      detail: "Više računa može djelovati kao 'rasipanje' — banke vole jasnu sliku.",
    });
  } else {
    score += 1;
    factors.push({
      label: `${input.bankAccounts} bankovni račun(a)`,
      delta: 1,
      detail: "Razuman broj računa je pozitivan signal.",
    });
  }

  // --- DISPO (najnijansiranije pitanje!) ---
  switch (input.dispo) {
    case "none":
      // OK, ali nema pozitivan marker
      break;
    case "approved_unused":
      score += 3;
      factors.push({
        label: "Dispokredit odobren, ne koristi se",
        delta: 3,
        detail:
          "POZITIVNO: Schufa vidi da ti banka vjeruje (odobren limit). Ne koristiš ga = idealan signal.",
      });
      break;
    case "occasional":
      score += 1;
      factors.push({
        label: "Dispokredit, povremeno korištenje",
        delta: 1,
        detail: "Sam Dispo je pozitivan, povremeno korištenje je neutralno.",
      });
      break;
    case "constant":
      // Schufa NE VIDI saldo, ali ti se finansijski profil pogoršava
      score -= 2;
      factors.push({
        label: "Stalno u Dispo minusu",
        delta: -2,
        detail:
          "VAŽNO: Schufa NE VIDI tvoj trenutni saldo, ali konstantni minus 3+ mjeseca može dovesti do Mahnunga koji JESTE Schufa unos.",
      });
      break;
    case "mahnung":
      score -= 18;
      factors.push({
        label: "Dobio Mahnung zbog Dispo",
        delta: -18,
        detail:
          "OZBILJNO: Mahnung nakon 90 dana neplaćanja se prijavljuje Schufi kao Negativeintrag i ostaje 3 godine.",
      });
      break;
    case "cancelled":
      score -= 22;
      factors.push({
        label: "Banka otkazala Dispo",
        delta: -22,
        detail:
          "KRITIČNO: Otkaz Dispo zbog prekoračenja je teški Negativeintrag — banke i stanodavci ovo odmah vide.",
      });
      break;
  }

  // --- Neplaćeni računi / Inkasso ---
  switch (input.unpaidBills) {
    case "none":
      score += 2;
      factors.push({
        label: "Nema neplaćenih računa",
        delta: 2,
        detail: "Bez negativnih unosa — ovo je osnova zdravog Schufa profila.",
      });
      break;
    case "one":
      score -= 8;
      factors.push({
        label: "Jedan neplaćeni račun",
        delta: -8,
        detail: "Čak i jedan Mahnung negativno utječe. Plati ODMAH i traži Erledigungsvermerk.",
      });
      break;
    case "multiple":
      score -= 16;
      factors.push({
        label: "Više neplaćenih računa",
        delta: -16,
        detail: "Više Mahnunga = ozbiljan signal nepouzdanosti za sve poslovne partnere.",
      });
      break;
    case "inkasso":
      score -= 28;
      factors.push({
        label: "Aktivan Inkasso postupak",
        delta: -28,
        detail:
          "KRITIČNO: Inkasso unos je hardneg. unos koji blokira većinu kredita, stanova i ugovora.",
      });
      break;
  }

  // --- Schufa upiti (svaka prijava na stan/kredit = upit) ---
  switch (input.schufaInquiries) {
    case "0-2":
      score += 1;
      factors.push({
        label: "Malo Schufa upita (0-2 u zadnjih 12 mj)",
        delta: 1,
        detail: "Niska aktivnost upita pokazuje da nisi u 'panici za novcem'.",
      });
      break;
    case "3-5":
      // Neutralno
      break;
    case "6-10":
      score -= 4;
      factors.push({
        label: "Mnogo Schufa upita (6-10)",
        delta: -4,
        detail: "Svaka prijava na stan ili kredit = Schufa upit. Više upita = veća percepcija rizika.",
      });
      break;
    case "11+":
      score -= 10;
      factors.push({
        label: "Vrlo mnogo Schufa upita (11+)",
        delta: -10,
        detail:
          "Banke i stanodavci ovo tumače kao 'očajnu potragu' — savjet: pauziraj prijave 3+ mjeseca.",
      });
      break;
  }

  // --- Insolvencija ---
  if (input.insolvency === "active") {
    score -= 35;
    factors.push({
      label: "Aktivna Privatinsolvencija",
      delta: -35,
      detail:
        "Aktivna insolvencija je teški Negativeintrag — kredit, stan i većina ugovora su praktično blokirani.",
    });
  } else if (input.insolvency === "discharged") {
    score -= 12;
    factors.push({
      label: "Završena insolvencija (Restschuldbefreiung)",
      delta: -12,
      detail:
        "Po §882e ZPO unos ostaje 3 godine nakon završetka. Postepeno se oporavlja.",
    });
  }

  // Clamp na realni opseg
  score = Math.max(35, Math.min(99, score));

  // Sortiraj faktore po apsolutnom uticaju
  factors.sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta));

  // --- Risk klasa (naša interna, NE identična Schufi) ---
  const riskClass: RiskClass =
    score >= 95 ? "A" :
    score >= 90 ? "B" :
    score >= 85 ? "C" :
    score >= 80 ? "D" :
    score >= 70 ? "E" :
    score >= 60 ? "F" :
    score >= 50 ? "G" : "H";

  // --- Šanse ---
  const c = (s: number): "low" | "medium" | "high" =>
    s >= 90 ? "high" : s >= 78 ? "medium" : "low";

  const chances = {
    rentMunich: c(score - 4), // stanovi u top gradovima su stroži
    consumerLoan: c(score),
    creditCard: c(score + 2),
    carLeasing: c(score - 1),
  };

  // --- Akcioni plan (personaliziran prema input-u) ---
  const actionPlan: ActionItem[] = [];

  // BESPLATNI Datenkopie je UVIJEK prvi savjet (pravna obaveza nas)
  actionPlan.push({
    priority: "high",
    title: "Zatraži BESPLATAN zvanični Schufa Datenkopie",
    detail:
      "Po §15 DSGVO imaš pravo na besplatni izvod 1x godišnje. Ovo je JEDINI način da znaš stvarni Schufa Score i provjeriš ima li netačnih podataka.",
    estimatedImpact: "Saznaš stvarne podatke",
    timeframeMonths: 1,
  });

  if (input.unpaidBills === "inkasso" || input.unpaidBills === "multiple") {
    actionPlan.push({
      priority: "high",
      title: "Plati sve otvorene Inkasso/Mahnung pozive",
      detail:
        "Nakon plaćanja zatraži pisani 'Erledigungsvermerk' i pošalji ga Schufi. Negativan unos može biti označen kao 'erledigt'.",
      estimatedImpact: "+10-18%",
      timeframeMonths: 3,
    });
  }

  if (input.dispo === "mahnung" || input.dispo === "cancelled") {
    actionPlan.push({
      priority: "high",
      title: "Reguliši Dispo dug s bankom",
      detail:
        "Dogovori plan otplate (Ratenzahlung). Nakon završetka traži pisanu potvrdu i prijavi Schufi za Erledigungsvermerk.",
      estimatedImpact: "+8-15%",
      timeframeMonths: 6,
    });
  }

  if (input.schufaInquiries === "6-10" || input.schufaInquiries === "11+") {
    actionPlan.push({
      priority: "high",
      title: "Pauziraj prijave na stanove/kredite 3 mjeseca",
      detail:
        "Svaka prijava = Schufa upit. Pravilo: prijavi se SAMO na stanove gdje ozbiljno možeš dobiti, ne 'po inerciji'. Stari upiti polako blijede nakon 12 mjeseci.",
      estimatedImpact: "+2-5%",
      timeframeMonths: 12,
    });
  }

  if (input.cardCount === "5+" || input.cardCount === "3-4") {
    actionPlan.push({
      priority: "medium",
      title: "Zatvori nekorištene kreditne kartice",
      detail:
        "Zadrži 1-2 koje aktivno koristiš. Pri zatvaranju traži pisanu potvrdu od izdavaoca i pošalji Schufi.",
      estimatedImpact: "+1-3%",
      timeframeMonths: 2,
    });
  }

  if (input.dispo === "constant") {
    actionPlan.push({
      priority: "medium",
      title: "Izađi iz Dispo minusa do kraja kvartala",
      detail:
        "Schufa NE VIDI saldo — ALI ako te banka pošalje na Mahnung, vidjet će. Bolje napravi plan otplate ranije.",
      estimatedImpact: "Sprečava -18%",
      timeframeMonths: 3,
    });
  }

  if (input.bankAccounts === 0) {
    actionPlan.push({
      priority: "high",
      title: "Otvori Girokonto i drži ga 6 mj. bez minusa",
      detail:
        "Najbolje besplatne opcije: DKB, ING, Comdirect. Uredan Girokonto bez minusa = jak pozitivan marker.",
      estimatedImpact: "+3-6%",
      timeframeMonths: 6,
    });
  }

  if (input.activeLoans === "0" && input.cardCount === "0") {
    actionPlan.push({
      priority: "low",
      title: "Razmotri 1 mali kredit za izgradnju historije",
      detail:
        "Schufa bez ikakvih kredita je 'tanak' score. Mali, uredan ratni kredit (npr. mobitel na rate) gradi pozitivnu historiju za 6-12 mjeseci.",
      estimatedImpact: "+2-4%",
      timeframeMonths: 12,
    });
  }

  if (input.dispo === "approved_unused") {
    actionPlan.push({
      priority: "low",
      title: "Zadrži Dispo otvoren — ne otkazuj",
      detail:
        "Imaš idealnu situaciju: odobren ali nekorišten. Otkazivanje bi uklonilo pozitivan marker.",
      estimatedImpact: "Čuva +3%",
      timeframeMonths: 0,
    });
  }

  if (input.insolvency === "discharged") {
    actionPlan.push({
      priority: "medium",
      title: "Sačekaj 3 god. od Restschuldbefreiung",
      detail:
        "Unos se automatski briše. U međuvremenu ne uzimaj nove kredite — gradi stabilnost.",
      estimatedImpact: "+10-12%",
      timeframeMonths: 12,
    });
  }

  // Uvijek dodaj edukativni savjet
  actionPlan.push({
    priority: "low",
    title: "Provjeri Schufa svake godine",
    detail:
      "Po §15 DSGVO imaš pravo na 1 besplatni Datenkopie godišnje. Iskoristi ovo pravo — često se nađu greške koje vuku score dolje.",
    estimatedImpact: "Prevencija",
    timeframeMonths: 12,
  });

  // Sortiraj po prioritetu
  const priorityOrder = { high: 0, medium: 1, low: 2 };
  actionPlan.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  // Raspon je ±3% jer je procjena indikativna
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

export const RISK_CLASS_LABELS: Record<RiskClass, { label: string; color: string }> = {
  A: { label: "Odlično", color: "hsl(140, 65%, 50%)" },
  B: { label: "Vrlo dobro", color: "hsl(125, 60%, 50%)" },
  C: { label: "Dobro", color: "hsl(85, 55%, 50%)" },
  D: { label: "Zadovoljavajuće", color: "hsl(48, 80%, 55%)" },
  E: { label: "Granično", color: "hsl(35, 80%, 55%)" },
  F: { label: "Slabo", color: "hsl(20, 75%, 55%)" },
  G: { label: "Loše", color: "hsl(5, 70%, 55%)" },
  H: { label: "Vrlo loše", color: "hsl(0, 75%, 50%)" },
};
