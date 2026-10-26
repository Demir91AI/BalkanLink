/**
 * Family PDF field parity: synthetic data → the exact field names/types each
 * legacy builder writes today. A changed mapping must be reviewed deliberately.
 */
import { describe, it, expect } from "vitest";
import { buildKindergeldFieldFills, initialKindergeldData } from "@/lib/kindergeld-fields";
import { buildKinderzuschlagFieldFills } from "@/lib/pdf-fill-kinderzuschlag";
import { buildMutterschaftsgeldFieldFills } from "@/lib/pdf-fill-mutterschaftsgeld";
import { getPdfConfig } from "@/lib/pdf-fill-elterngeld";
import { initialData as initialElterngeld } from "@/lib/elterngeld-bayern-fields";
import type { BundeslandId } from "@/lib/elterngeld-bundeslaender";

/** Fill every string with a deterministic synthetic value (dates for date-like keys). */
function synth<T>(o: T): T {
  if (Array.isArray(o)) return o.map(synth) as T;
  if (o && typeof o === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(o)) {
      if (typeof v === "string") out[k] = v !== "" ? v : /datum|seit|von|bis|termin|geburt|entbindung/i.test(k) ? "2026-01-15" : "Maja Kovač";
      else if (typeof v === "boolean") out[k] = true;
      else out[k] = synth(v);
    }
    return out as T;
  }
  return o;
}

const shape = (fills: { name: string; type: string }[]) =>
  [...new Set(fills.map((f) => `${f.type}:${f.name}`))].sort();

describe("family PDF field parity (synthetic)", () => {
  it("Kindergeld KG1", () => {
    const d = synth(initialKindergeldData());
    expect(shape(buildKindergeldFieldFills(d))).toMatchSnapshot();
  });

  it("Kinderzuschlag KiZ1", () => {
    const d = synth({
      familienname: "", vorname: "", titel: "", geburtsname: "", geburtsdatum: "", geschlecht: "weiblich",
      staatsangehoerigkeit: "", anschrift: "", telefon: "", familienstand: "verheiratet", familienstandSeit: "",
      pName: "", pStaatsangehoerigkeit: "", pGeburtsdatum: "", iban: "DE89370400440532013000", bic: "", kontoinhaber: "",
      kinder: Array.from({ length: 6 }, () => ({ vorname: "", nachname: "", geburtsdatum: "" })), ort: "", datum: "",
    } as const);
    expect(shape(buildKinderzuschlagFieldFills(d as never))).toMatchSnapshot();
  });

  it("Mutterschaftsgeld BAS", () => {
    const keys = ["vorname", "nachname", "geburtsdatum", "versichertenNr", "strasse", "plz", "ort", "krankenkasse", "entbindungstermin", "tatsaechlicheGeburt", "beschaeftigtBei", "beschaeftigtSeit", "schutzfristVon", "schutzfristBis", "iban", "bic", "kontoinhaber"];
    const d = synth(Object.fromEntries(keys.map((k) => [k, ""])));
    expect(shape(buildMutterschaftsgeldFieldFills(d as never))).toMatchSnapshot();
  });

  const states: BundeslandId[] = ["by", "hh", "ni", "bb", "mv", "be", "hb", "rp", "sh", "st", "th"] as BundeslandId[];
  for (const bl of states) {
    it(`Elterngeld ${bl} keeps its PDF and field mapping`, () => {
      const cfg = getPdfConfig(bl);
      expect(cfg?.url).toMatch(/^\/muster\/elterngeld-.+\.pdf$/);
      const d = synth(initialElterngeld());
      expect({ url: cfg!.url, fields: shape(cfg!.builder(d) as never) }).toMatchSnapshot();
    });
  }
});
