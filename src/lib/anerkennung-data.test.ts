import { describe, expect, it } from "vitest";
import { PROFESSIONS, COUNTRIES } from "./anerkennung-data";
import { AUTHORITIES, BUNDESLAENDER, getAuthority } from "./anerkennung-bundeslaender";
import bs from "@/i18n/locales/bs/anerkennung.json";
import hr from "@/i18n/locales/hr/anerkennung.json";
import sr from "@/i18n/locales/sr/anerkennung.json";
import de from "@/i18n/locales/de/anerkennung.json";

const LEGACY_IDS = [
  "pflegefachperson", "arzt", "ingenieur", "lehrer", "physiotherapeut", "erzieher", "apotheker", "zahnarzt",
  "koch", "elektroniker", "maurer", "kfz_mechatroniker", "schweisser", "it_fachkraft", "medizinische_fachangestellte",
  "altenpfleger", "berufskraftfahrer", "ekonomist_bachelor", "dachdecker", "anlagenmechaniker_shk", "buchhalter", "sozialpaedagoge",
];
const NEW_IDS = [
  "elektroniker_betriebstechnik", "industriemechaniker", "zerspanungsmechaniker", "maschinen_anlagenfuehrer", "metallbauer",
  "konstruktionsmechaniker", "mechatroniker", "tischler", "zimmerer", "fliesenleger", "maler_lackierer", "strassenbauer",
  "beton_stahlbetonbauer", "gebaeudereiniger", "baecker", "friseur", "fachkraft_lagerlogistik",
];
const IHK = ["elektroniker_betriebstechnik", "industriemechaniker", "zerspanungsmechaniker", "maschinen_anlagenfuehrer", "konstruktionsmechaniker", "mechatroniker", "fachkraft_lagerlogistik", "koch", "it_fachkraft"];
const locales = { bs, hr, sr, de } as Record<string, { professions: Record<string, { steps: string[]; documents: string[]; name: string }> }>;

describe("Anerkennung occupations, 28 October 2026", () => {
  it("keeps all 22 legacy ids first and in order, then adds 17 unique entries", () => {
    const ids = PROFESSIONS.map((p) => p.id);
    expect(ids.slice(0, 22)).toEqual(LEGACY_IDS);
    expect(ids.slice(22)).toEqual(NEW_IDS);
    expect(new Set(ids).size).toBe(39);
    expect(new Set(PROFESSIONS.map((p) => p.nameDE)).size).toBe(39);
    expect(COUNTRIES.map((c) => c.code)).toEqual(["BA", "HR", "RS", "ME", "MK", "XK"]);
  });

  it("has every new occupation in BS/HR/SR/DE with identical list lengths", () => {
    for (const id of NEW_IDS) {
      const ref = locales.bs.professions[id];
      for (const l of ["hr", "sr", "de"]) {
        const e = locales[l].professions[id];
        expect(e, `${l} ${id}`).toBeTruthy();
        expect(e.steps.length).toBe(ref.steps.length);
        expect(e.documents.length).toBe(ref.documents.length);
      }
    }
  });

  it("routes IHK occupations to IHK FOSA and crafts to a Handwerkskammer in all 16 Länder", () => {
    for (const b of BUNDESLAENDER) {
      for (const id of IHK) expect(getAuthority(id, b.code)?.authorityType).toBe("IHK FOSA");
      for (const id of NEW_IDS.filter((i) => !IHK.includes(i))) expect(getAuthority(id, b.code)?.authorityType).toBe("HWK");
    }
    expect(Object.keys(AUTHORITIES)).toEqual(expect.arrayContaining(["dachdecker", "anlagenmechaniker_shk", "berufskraftfahrer"]));
  });

  it("labels welding and CNC as activities and never promises equivalence for experience alone", () => {
    for (const l of Object.keys(locales)) {
      const p = locales[l].professions;
      expect(JSON.stringify(p.schweisser)).toMatch(/Ausbildungsberuf/);
      expect(JSON.stringify(p.zerspanungsmechaniker)).toMatch(/CNC/);
      expect(JSON.stringify(p.zerspanungsmechaniker)).toMatch(/Ausbildungsberuf/);
    }
    const craft = PROFESSIONS.filter((p) => ["elektroniker", "maurer", "kfz_mechatroniker"].includes(p.id));
    for (const p of craft) expect(p.steps.join(" ")).not.toMatch(/Kenntnisprüfung|Eignungsprüfung|Anabin/);
    expect(PROFESSIONS.find((p) => p.id === "koch")?.notes).not.toMatch(/300|500 €/);
  });
});
