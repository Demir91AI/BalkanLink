import { describe, expect, it } from "vitest";
import { PROFESSIONS } from "./anerkennung-data";
import { AUTHORITIES, BUNDESLAENDER, getAuthority } from "./anerkennung-bundeslaender";
import bs from "@/i18n/locales/bs/anerkennung.json";
import hr from "@/i18n/locales/hr/anerkennung.json";
import sr from "@/i18n/locales/sr/anerkennung.json";
import de from "@/i18n/locales/de/anerkennung.json";

type Prof = { name: string; description: string; steps: string[]; documents: string[]; durationRange: string; costRange: string; notes?: string };
type Loc = { professions: Record<string, Prof>; ui: Record<string, string>; authorityNotes: Record<string, string> };
const L = { bs, hr, sr, de } as unknown as Record<string, Loc>;
const LANGS = ["bs", "hr", "sr", "de"];
const LEGACY8 = ["medizinische_fachangestellte", "altenpfleger", "berufskraftfahrer", "ekonomist_bachelor", "dachdecker", "anlagenmechaniker_shk", "buchhalter", "sozialpaedagoge"];
const REGULATED = ["pflegefachperson", "arzt", "lehrer", "physiotherapeut", "erzieher", "apotheker", "zahnarzt", "altenpfleger"];

describe("Anerkennung final cleanup, 28 October 2026", () => {
  it("keeps 39 occupations with unchanged ids", () => {
    expect(PROFESSIONS).toHaveLength(39);
    expect(new Set(PROFESSIONS.map((p) => p.id)).size).toBe(39);
  });

  it("(1) every occupation is translated in all four languages with equal list lengths", () => {
    for (const p of PROFESSIONS) {
      const ref = L.bs.professions[p.id];
      expect(ref, `bs ${p.id}`).toBeTruthy();
      for (const l of LANGS) {
        const e = L[l].professions[p.id];
        expect(e, `${l} ${p.id}`).toBeTruthy();
        expect(e.steps.length, `${l} ${p.id} steps`).toBe(ref.steps.length);
        expect(e.documents.length, `${l} ${p.id} docs`).toBe(ref.documents.length);
      }
    }
    for (const id of LEGACY8) {
      expect(L.de.professions[id].description).not.toBe(L.bs.professions[id].description);
      expect(L.sr.professions[id].description).not.toBe(L.bs.professions[id].description);
    }
  });

  it("(2) no occupation falls back to ZAB by accident; ZAB only for the academic economist", () => {
    for (const p of PROFESSIONS) for (const b of BUNDESLAENDER) expect(getAuthority(p.id, b.code), `${p.id} ${b.code}`).not.toBeNull();
    const BL = BUNDESLAENDER.map((b) => b.code);
    for (const c of BL) {
      expect(getAuthority("ekonomist_bachelor", c)?.name).toMatch(/^ZAB/);
      expect(getAuthority("altenpfleger", c)).toEqual(getAuthority("pflegefachperson", c));
      expect(getAuthority("sozialpaedagoge", c)?.url).toMatch(/anerkennung-in-deutschland\.de/);
      expect(getAuthority("buchhalter", c)?.url).toMatch(/anerkennung-in-deutschland\.de/);
      expect(getAuthority("berufskraftfahrer", c)?.noteKey).toBe("bkf");
    }
    const mfa = (c: string) => getAuthority("medizinische_fachangestellte", c)?.name;
    for (const c of BL.filter((c) => !["BY", "BB", "ST"].includes(c))) expect(mfa(c)).toBe("Ärztekammer Westfalen-Lippe");
    expect(mfa("BY")).toBe("Bayerische Landesärztekammer");
    expect(mfa("BB")).toBe("Landesärztekammer Brandenburg");
    expect(mfa("ST")).toBe("Ärztekammer Sachsen-Anhalt");
    expect(getAuthority("pflegefachperson", "BY")?.name).toMatch(/Landesamt für Pflege/);
    expect(getAuthority("physiotherapeut", "BY")?.name).toMatch(/Landesamt für Pflege/);
  });

  it("(3) doctors, dentists and pharmacists mention the 1.11.2026 direct Kenntnisprüfung; no Anabin-H+ requirement", () => {
    for (const l of LANGS) for (const id of ["arzt", "zahnarzt", "apotheker"]) {
      const s = L[l].professions[id].steps.join(" ");
      expect(s).toMatch(/1\. ?11\. ?2026/);
      expect(s).toMatch(/Kenntnisprüfung/);
      expect(s).not.toMatch(/H\+/);
    }
    for (const l of LANGS) for (const id of REGULATED) expect(L[l].professions[id].steps.join(" ")).toMatch(/Anerkennungs-Finder/);
    expect(PROFESSIONS.find((p) => p.id === "sozialpaedagoge")?.regulation).toBe("REG");
  });

  it("(4) every authority note key is translated in all four languages", () => {
    const keys = new Set<string>();
    for (const m of Object.values(AUTHORITIES)) for (const a of Object.values(m)) if (a.noteKey) keys.add(a.noteKey);
    expect(keys.size).toBeGreaterThan(5);
    for (const l of LANGS) for (const k of keys) expect(L[l].authorityNotes[k], `${l} ${k}`).toBeTruthy();
    for (const m of Object.values(AUTHORITIES)) for (const a of Object.values(m)) if (a.notes) expect(a.noteKey).toBeTruthy();
  });

  it("(5) no text promises higher pay or better status from recognition", () => {
    const promise = /bolj[iu] (status|plat)|bolju plaću|besseren Status|besseres Gehalt(?! noch)/;
    for (const l of LANGS) {
      expect(L[l].ui.nregInfoBody).not.toMatch(promise);
      expect(L[l].ui.nregInfoBody).toMatch(/garant|jamči|garantiert/);
      for (const [id, p] of Object.entries(L[l].professions)) expect(`${p.description} ${p.notes ?? ""}`, `${l} ${id}`).not.toMatch(promise);
    }
  });
});
