/**
 * Elterngeld shared 2025 — STAGE 2: sections 2 (Eltern), 3 (Beziehung zum Kind), 4 (weitere Kinder), pages 2–8.
 * Semantics come from the printed questions of "Antragsversion August 2025" (verified 2026-11-25) and the
 * widget positions; every checkbox group below is a printed single choice, modelled as one enum so at most
 * one native box per group can ever be set. Conditions follow the printed instructions:
 *  - 2.b: other-parent questions are always required unless a box in 2.a (single-parent) is ticked.
 *  - 2.f note: from 2.g on, other-parent questions only when "Beide Elternteile" apply.
 *  - 2.c "Nein, ich lebe im Ausland" requires Anlage "Wohnsitz im Ausland" → not supported yet → blocked.
 *  - 2.g "Eine andere, keine oder ungeklärt" requires Anlage "Staatsangehörigkeit" → separate module; blocked
 *    for a Land without a verified attachment original.
 *  - 2.i KK name/seat and Versichertennummer only for gesetzlich pflicht-/freiwillig versichert.
 *  - 4.a counts all other children up to18; 4.b separately lists at most three children meeting printed
 *    Geschwisterbonus points (never decided here); additional qualifying entries must use youngest-first.
 * Unresolved (documented, never guessed): dual citizenship incl. German; Aufnahmedatum for non-adoptive
 * relations in 3.b; whether a separate Anlage copy is needed per parent.
 */
import { blank, isoDateValid, isoToDe, type StrictFill } from "../engine/strict-acroform";
import type { EgFieldName } from "./elterngeld-shared-2025";

type F = StrictFill<EgFieldName>;
export type Geschlecht = "weiblich" | "männlich" | "divers" | "ohne Angaben";
export type Familienstand = "verheiratet" | "verpartnert" | "geschieden" | "verwitwet" | "ledig";
export type Kv = "pflicht" | "freiwillig" | "familie" | "privat" | "heilfuersorge" | "keine";
export type Beziehung = "leiblich" | "adoptiv" | "stiefkind" | "verwandt";
export interface Address { strasse: string; nr: string; strasse2?: string; plz: string; ort: string; zusatz?: string }

export interface ParentAnswers {
  vorname: string; nachname: string; geburtsdatum: string; geschlecht: Geschlecht;
  familienstand: Familienstand; /** AS only: married/partnered to the other parent? */ mitAnderemElternteil?: boolean;
  wohnsitzDE: boolean; seitGeburt?: boolean; inDeSeit?: string;
  /** 2E only: same address as applicant (then no address). */ gleicheAdresse?: boolean; adresse?: Address;
  arbeitAuslandStaat?: string; steuerId: string;
  staatsangehoerigkeit?: "deutsch" | "andere"; nato?: boolean; diplomat?: boolean;
  kv?: Kv; versichertennummer?: string; kkName?: string; kkOrt?: string; /** 2E only */ gleicheKk?: boolean;
  imHaushalt?: boolean; beziehung?: Beziehung; verwandtAls?: string;
}
export interface Sibling { vorname: string; nachname: string; geburtsdatum: string; aufnahme?: string; behinderung20: boolean; leiblichAS: boolean; leiblich2E: boolean }
export interface HouseholdAnswers {
  alleinerziehend: { entlastung: boolean; unmoeglich: boolean; kindeswohl: boolean };
  as: ParentAnswers; other?: ParentAnswers;
  kindAdresse: "wie_as" | "wie_2e" | "andere"; kindAdresseAndere?: Omit<Address, "strasse2" | "zusatz">;
  einkommen: "bis175_fest" | "ueber175_fest" | "ueber175_vorauss" | "unter175_vorauss";
  antragstellende: "beide" | "ich_spaeter" | "ich_bereits" | "nur_ich";
  aufnahmedatum?: string;
  /** Printed 4.a counts ALL other children up to18 in the household, not just the 4.b list. */
  weitereKinderImHaushalt: number;
  /** Printed 4.b: user-selected qualifying children only, at most3; no eligibility inference. */
  weitereKinder: Sibling[];
}
export interface HhError { field: string; code: string }
export type HhBlock = "WOHNSITZ_AUSLAND_UNSUPPORTED" | "TOO_MANY_SIBLINGS";

export const singleParent = (h: HouseholdAnswers) => h.alleinerziehend.entlastung || h.alleinerziehend.unmoeglich || h.alleinerziehend.kindeswohl;
export const otherPart1Required = (h: HouseholdAnswers) => !singleParent(h);
export const otherPart2Required = (h: HouseholdAnswers) => h.antragstellende === "beide";
export const needsCitizenshipAnnex = (h: HouseholdAnswers): ("as" | "2e")[] => [
  ...(h.as.staatsangehoerigkeit === "andere" ? ["as" as const] : []),
  ...(otherPart2Required(h) && h.other?.staatsangehoerigkeit === "andere" ? ["2e" as const] : []),
];

const steuerIdOk = (v: string) => /^[1-9]\d{10}$/.test(v.replace(/\s/g, ""));
const kvNeedsDetails = (k?: Kv) => k === "pflicht" || k === "freiwillig";

function vAddress(p: string, a: Partial<Address> | undefined, e: HhError[]) {
  if (!a) { e.push({ field: `${p}.adresse`, code: "required" }); return; }
  if (blank(a.strasse)) e.push({ field: `${p}.strasse`, code: "required" });
  if (blank(a.nr) || (a.nr?.length ?? 0) > 6) e.push({ field: `${p}.nr`, code: "required" });
  if (!/^\d{5}$/.test(a.plz ?? "")) e.push({ field: `${p}.plz`, code: "plz" });
  if (blank(a.ort)) e.push({ field: `${p}.ort`, code: "required" });
}

function vParent(p: "as" | "2e", x: ParentAnswers | undefined, part2: boolean, today: string, e: HhError[], blocks: Set<HhBlock>) {
  if (!x) { e.push({ field: p, code: "required" }); return; }
  if (blank(x.vorname)) e.push({ field: `${p}.vorname`, code: "required" });
  if (blank(x.nachname)) e.push({ field: `${p}.nachname`, code: "required" });
  if (!isoDateValid(x.geburtsdatum, today)) e.push({ field: `${p}.geburtsdatum`, code: "date" });
  if (!["weiblich", "männlich", "divers", "ohne Angaben"].includes(x.geschlecht)) e.push({ field: `${p}.geschlecht`, code: "required" });
  if (!["verheiratet", "verpartnert", "geschieden", "verwitwet", "ledig"].includes(x.familienstand)) e.push({ field: `${p}.familienstand`, code: "required" });
  if (p === "as" && (x.familienstand === "verheiratet" || x.familienstand === "verpartnert") && x.mitAnderemElternteil === undefined) e.push({ field: "as.mitAnderemElternteil", code: "required" });
  if (!x.wohnsitzDE) blocks.add("WOHNSITZ_AUSLAND_UNSUPPORTED");
  else {
    if (x.seitGeburt === undefined) e.push({ field: `${p}.seit`, code: "required" });
    else if (!x.seitGeburt && !isoDateValid(x.inDeSeit ?? "", today)) e.push({ field: `${p}.inDeSeit`, code: "date" });
    if (!(p === "2e" && x.gleicheAdresse)) vAddress(p, x.adresse, e);
  }
  if (!steuerIdOk(x.steuerId)) e.push({ field: `${p}.steuerId`, code: "steuer_id" });
  if (!part2) return;
  if (!["deutsch", "andere"].includes(x.staatsangehoerigkeit ?? "")) e.push({ field: `${p}.staatsangehoerigkeit`, code: "required" });
  if (x.nato === undefined) e.push({ field: `${p}.nato`, code: "required" });
  if (x.diplomat === undefined) e.push({ field: `${p}.diplomat`, code: "required" });
  if (!["pflicht", "freiwillig", "familie", "privat", "heilfuersorge", "keine"].includes(x.kv ?? "")) e.push({ field: `${p}.kv`, code: "required" });
  if (kvNeedsDetails(x.kv)) {
    if (blank(x.versichertennummer)) e.push({ field: `${p}.versichertennummer`, code: "required" });
    if (!(p === "2e" && x.gleicheKk) && (blank(x.kkName) || blank(x.kkOrt))) e.push({ field: `${p}.kk`, code: "required" });
  }
  if (x.imHaushalt === undefined) e.push({ field: `${p}.imHaushalt`, code: "required" });
  if (!["leiblich", "adoptiv", "stiefkind", "verwandt"].includes(x.beziehung ?? "")) e.push({ field: `${p}.beziehung`, code: "required" });
  if (x.beziehung === "verwandt" && blank(x.verwandtAls)) e.push({ field: `${p}.verwandtAls`, code: "required" });
}

export function validateHousehold(h: HouseholdAnswers, today: string): { errors: HhError[]; blocks: HhBlock[] } {
  const e: HhError[] = [], blocks = new Set<HhBlock>();
  vParent("as", h.as, true, today, e, blocks);
  if (otherPart1Required(h) || otherPart2Required(h)) vParent("2e", h.other, otherPart2Required(h), today, e, blocks);
  if (h.kindAdresse === "andere") vAddress("kind", h.kindAdresseAndere, e);
  if (h.kindAdresse === "wie_2e" && !h.other) e.push({ field: "kindAdresse", code: "no_other_parent" });
  if (!["wie_as", "wie_2e", "andere"].includes(h.kindAdresse)) e.push({ field: "kindAdresse", code: "required" });
  if (!["bis175_fest", "ueber175_fest", "ueber175_vorauss", "unter175_vorauss"].includes(h.einkommen)) e.push({ field: "einkommen", code: "required" });
  if (!["beide", "ich_spaeter", "ich_bereits", "nur_ich"].includes(h.antragstellende)) e.push({ field: "antragstellende", code: "required" });
  if (h.antragstellende === "beide" && singleParent(h)) e.push({ field: "antragstellende", code: "conflicts_2a" });
  const adoptive = h.as.beziehung === "adoptiv" || (otherPart2Required(h) && h.other?.beziehung === "adoptiv");
  if (adoptive && !isoDateValid(h.aufnahmedatum ?? "", today)) e.push({ field: "aufnahmedatum", code: "date" });
  if (!adoptive && h.aufnahmedatum) e.push({ field: "aufnahmedatum", code: "only_if_adoption" });
  if (h.weitereKinder.length > 3) blocks.add("TOO_MANY_SIBLINGS");
  if (!Number.isInteger(h.weitereKinderImHaushalt) || h.weitereKinderImHaushalt < 0) e.push({ field: "weitereKinderImHaushalt", code: "nonnegative_integer" });
  if (h.weitereKinder.length > h.weitereKinderImHaushalt) e.push({ field: "weitereKinder", code: "exceeds_household_count" });
  h.weitereKinder.slice(0, 3).forEach((s, i) => {
    if (blank(s.vorname) || blank(s.nachname)) e.push({ field: `kind${i + 1}.name`, code: "required" });
    if (!isoDateValid(s.geburtsdatum, today)) e.push({ field: `kind${i + 1}.geburtsdatum`, code: "date" });
    if (s.aufnahme && !isoDateValid(s.aufnahme, today)) e.push({ field: `kind${i + 1}.aufnahme`, code: "date" });
  });
  return { errors: e, blocks: [...blocks] };
}

const T = (name: EgFieldName, value?: string): F[] => (typeof value !== "string" || blank(value) ? [] : [{ name, type: "text", value: value.trim() }]);
const C = (name: EgFieldName, on: boolean | undefined): F[] => (on ? [{ name, type: "check" }] : []);
/** Native prefix: 1–22 are "2b Familienstand n", 23–29 (page 4) are "2e Familienstand n". */
const FS = (n: number) => `${n >= 23 ? "2e" : "2b"} Familienstand ${n}` as EgFieldName;

function parentFills(p: "AS" | "2E", x: ParentAnswers, part2: boolean): F[] {
  const f: F[] = [...T(`2b Vorname(n) ${p}` as EgFieldName, x.vorname), ...T(`2b Nachname ${p}` as EgFieldName, x.nachname),
    ...T(`2b Geburtsdatum ${p} Jahr` as EgFieldName, isoToDe(x.geburtsdatum)),
    { name: `2b Geschlecht ${p}` as EgFieldName, type: "radio", value: x.geschlecht }];
  // Page 3 order (widget positions): AS 1 verh, 2/3 mit anderem ja/nein, 4 verp, 5/6 ja/nein, 7 gesch, 8 verw, 9 ledig; 2E 10–14.
  const ms = p === "AS" ? { verheiratet: 1, verpartnert: 4, geschieden: 7, verwitwet: 8, ledig: 9 } : { verheiratet: 10, verpartnert: 11, geschieden: 12, verwitwet: 13, ledig: 14 };
  f.push({ name: FS(ms[x.familienstand]), type: "check" });
  if (p === "AS" && x.familienstand === "verheiratet") f.push({ name: FS(x.mitAnderemElternteil ? 2 : 3), type: "check" });
  if (p === "AS" && x.familienstand === "verpartnert") f.push({ name: FS(x.mitAnderemElternteil ? 5 : 6), type: "check" });
  // 2.c: AS ja 15 / seit Geburt 16 / seit 17 / Ausland 18; 2E 19/20/21/22.
  const w = p === "AS" ? [15, 16, 17] : [19, 20, 21];
  if (x.wohnsitzDE) {
    f.push({ name: FS(w[0]), type: "check" }, { name: FS(x.seitGeburt ? w[1] : w[2]), type: "check" });
    if (!x.seitGeburt && x.inDeSeit) f.push(...T(`2c ${p} in D seit Jahr` as EgFieldName, isoToDe(x.inDeSeit)));
    if (p === "2E" && x.gleicheAdresse) f.push({ name: "2c Adr E2 wie AS", type: "check" });
    else if (x.adresse) {
      const a = x.adresse;
      f.push(...T(`2c ${p} Str_1` as EgFieldName, a.strasse), ...T(`2c ${p} Hausnr` as EgFieldName, a.nr), ...T(`2c ${p} Str_2` as EgFieldName, a.strasse2),
        ...T((p === "AS" ? "2c AS PLZ" : "2c 2E PLZ 1") as EgFieldName, a.plz), ...T(`2c ${p} Ort_2` as EgFieldName, a.ort), ...T(`2c ${p} AdrZusatz` as EgFieldName, a.zusatz));
    }
  }
  f.push(...T(`2d ${p} Arbeit Ausland` as EgFieldName, x.arbeitAuslandStaat), ...T(`2d ${p} Steuer-ID` as EgFieldName, x.steuerId.replace(/\s/g, "")));
  if (!part2) return f;
  const o = p === "AS" ? 0 : 1;
  f.push({ name: `2g Staatsangehörigkeit ${x.staatsangehoerigkeit === "deutsch" ? 1 + 2 * o : 2 + 2 * o}` as EgFieldName, type: "check" });
  // 2.h widget order: AS NATO 1/2, AS Mission 3/4, 2E NATO 5/6, 2E Mission 7/8 (ja/nein).
  f.push({ name: `2h Nato ${(x.nato ? 1 : 2) + 4 * o}` as EgFieldName, type: "check" }, { name: `2h Nato ${(x.diplomat ? 3 : 4) + 4 * o}` as EgFieldName, type: "check" });
  const kv = x.kv ? { pflicht: 1, freiwillig: 2, familie: 3, privat: 4, heilfuersorge: 5, keine: 6 }[x.kv] : undefined;
  if (kv !== undefined) f.push({ name: `2i Krankenversicherung ${kv + 6 * o}` as EgFieldName, type: "check" });
  if (kvNeedsDetails(x.kv)) {
    f.push(...T(`2i Versichertennummer ${p}` as EgFieldName, x.versichertennummer));
    if (p === "2E" && x.gleicheKk) f.push({ name: "2i gleiche KK wie AS", type: "check" });
    else f.push(...T(`2i Name KK ${p}` as EgFieldName, x.kkName), ...T(`2i Ort KK ${p}` as EgFieldName, x.kkOrt));
  }
  f.push({ name: `3a Betreuung ${(x.imHaushalt ? 1 : 2) + 2 * o}` as EgFieldName, type: "check" });
  const bz = x.beziehung ? { leiblich: 1 + 2 * o, adoptiv: 2 + 2 * o, stiefkind: 5 + 2 * o, verwandt: 6 + 2 * o }[x.beziehung] : undefined;
  if (bz !== undefined) f.push({ name: `3b Eltern ${bz}` as EgFieldName, type: "check" });
  if (x.beziehung === "verwandt") f.push(...T(`3b andere Beziehung ${p}` as EgFieldName, x.verwandtAls));
  return f;
}

export function householdFills(h: HouseholdAnswers): F[] {
  const f: F[] = [...C("2a Nicht zusammenlebend", h.alleinerziehend.entlastung), ...C("2a unmöglich", h.alleinerziehend.unmoeglich), ...C("2a Kindeswohl", h.alleinerziehend.kindeswohl)];
  f.push(...parentFills("AS", h.as, true));
  if (h.other && (otherPart1Required(h) || otherPart2Required(h))) f.push(...parentFills("2E", h.other, otherPart2Required(h)));
  f.push({ name: FS({ wie_as: 23, wie_2e: 24, andere: 25 }[h.kindAdresse]), type: "check" });
  if (h.kindAdresse === "andere" && h.kindAdresseAndere) {
    const a = h.kindAdresseAndere;
    f.push(...T("2c Adr Kind Str", a.strasse), ...T("2c Adr Kind Hausnr", a.nr), ...T("2c Adr Kind PLZ", a.plz), ...T("2c Adr Kind Ort", a.ort));
  }
  f.push({ name: FS({ bis175_fest: 26, ueber175_fest: 27, ueber175_vorauss: 28, unter175_vorauss: 29 }[h.einkommen]), type: "check" });
  f.push({ name: `2f Antragstellende ${{ beide: 1, ich_spaeter: 2, ich_bereits: 3, nur_ich: 4 }[h.antragstellende]}` as EgFieldName, type: "check" });
  if (h.aufnahmedatum) f.push(...T("3c Aufnahmedatum Jahr", isoToDe(h.aufnahmedatum)));
  if (h.weitereKinderImHaushalt === 0) f.push({ name: "4a Anzahl 1", type: "check" });
  else f.push({ name: "4a Anzahl 2", type: "check" }, ...T("4a weitere Kinder Anzahl", String(h.weitereKinderImHaushalt)));
  h.weitereKinder.slice(0, 3).forEach((s, i) => {
    const n = i + 1;
    f.push(...T(`4b Vorname${n}` as EgFieldName, s.vorname), ...T(`4b Nachname${n}` as EgFieldName, s.nachname), ...T(`4b Geburtsdatum${n} Jahr` as EgFieldName, isoToDe(s.geburtsdatum)),
      ...T(`4b Aufnahmedatum${n} Jahr` as EgFieldName, s.aufnahme ? isoToDe(s.aufnahme) : undefined), ...C(`4b Behinderung${n}` as EgFieldName, s.behinderung20),
      ...C(`4b Beziehung${n} AS` as EgFieldName, s.leiblichAS), ...C(`4b Beziehung${n} 2E` as EgFieldName, s.leiblich2E));
  });
  return f;
}

/** Printed single-choice groups (native checkboxes) — used by tests to prove mutual exclusivity. */
export const EG_EXCLUSIVE_GROUPS: EgFieldName[][] = [
  [1, 4, 7, 8, 9], [2, 3], [5, 6], [10, 11, 12, 13, 14], [15, 18], [16, 17], [19, 22], [20, 21], [23, 24, 25], [26, 27, 28, 29],
].map((g) => g.map(FS)).concat([
  ["2f Antragstellende 1", "2f Antragstellende 2", "2f Antragstellende 3", "2f Antragstellende 4"],
  ["2g Staatsangehörigkeit 1", "2g Staatsangehörigkeit 2"], ["2g Staatsangehörigkeit 3", "2g Staatsangehörigkeit 4"],
  ...[[1, 2], [3, 4], [5, 6], [7, 8]].map((g) => g.map((n) => `2h Nato ${n}` as EgFieldName)),
  [1, 2, 3, 4, 5, 6].map((n) => `2i Krankenversicherung ${n}` as EgFieldName), [7, 8, 9, 10, 11, 12].map((n) => `2i Krankenversicherung ${n}` as EgFieldName),
  ["3a Betreuung 1", "3a Betreuung 2"], ["3a Betreuung 3", "3a Betreuung 4"],
  ["3b Eltern 1", "3b Eltern 2", "3b Eltern 5", "3b Eltern 6"], ["3b Eltern 3", "3b Eltern 4", "3b Eltern 7", "3b Eltern 8"],
  ["4a Anzahl 1", "4a Anzahl 2"],
] as EgFieldName[][]);
