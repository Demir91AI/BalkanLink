import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { DVOJNO_DRZAVLJANSTVO_COUNTRIES } from "@/data/dvojnoDrzavljanstvoContent";
import bs from "@/i18n/locales/bs/dvojnoDrzavljanstvo.json";
import hr from "@/i18n/locales/hr/dvojnoDrzavljanstvo.json";
import sr from "@/i18n/locales/sr/dvojnoDrzavljanstvo.json";
import de from "@/i18n/locales/de/dvojnoDrzavljanstvo.json";

const L = { bs, hr, sr, de } as unknown as Record<string, any>;
const read = (p: string) => readFileSync(p, "utf8");

describe("Dual citizenship audit, 28 October 2026", () => {
  it("sidebar no longer marks dual citizenship as new, other badges unchanged", () => {
    const src = read("src/components/layout/AppSidebar.tsx");
    const line = src.split("\n").find((l) => l.includes('url: "/dvojno-drzavljanstvo"'))!;
    expect(line).toMatch(/isNew: false/);
    expect(src).toMatch(/url: "\/obnova-pasosa".*isNew: true/);
    expect(src).toMatch(/url: "\/sacuvano".*isNew: true/);
  });

  it("keeps the 7 countries and their ids; Montenegro and BiH are special cases", () => {
    expect(DVOJNO_DRZAVLJANSTVO_COUNTRIES.map((c) => c.id)).toEqual(["bih", "srbija", "kosovo", "hrvatska", "crnaGora", "albanija", "sjevernaMakedonija"]);
    const st = Object.fromEntries(DVOJNO_DRZAVLJANSTVO_COUNTRIES.map((c) => [c.id, c.status]));
    expect(st.bih).toBe("warning");
    expect(st.crnaGora).toBe("warning");
  });

  it("BiH: no treaty, retention not lost by law, reacquisition requires renouncing German — in all languages", () => {
    for (const l of Object.keys(L)) {
      const s = L[l].countries.bih.sections;
      expect(JSON.stringify(s)).not.toMatch(/isključivo ako postoji bilateralni|ausschließlich.*bilateral/);
      expect(s.practical.body).toMatch(/(odrican|odrican|odricanj|Verzicht).*(njemačk|nemačk|deutschen)/i);
      expect(s.bihLaw.body).toMatch(/Ustavn|Verfassungsgericht/);
    }
  });

  it("no live 3-year naturalization route; 5 years + spouse exception", () => {
    const page = read("src/pages/DvojnoDrzavljanstvo.tsx");
    expect(page).not.toMatch(/Zadržavaš automatski|Wird automatisch behalten/);
    expect((page.match(/30\.10\.2025/g) || []).length).toBe(4);
    expect((page.match(/§ 9 StAG/g) || []).length).toBe(4);
    const guide = read("src/data/einbuergerung-guide-i18n.ts");
    expect(guide).not.toMatch(/ili 3 godine uz|3 sa posebnim|turbo-postupak|već nakon 3 godine/);
    for (const l of ["bs", "hr", "sr", "de"]) expect(read(`src/i18n/locales/${l}/checklists.json`)).not.toMatch(/ubrzani postupak \(3 god\.\)|beschleunigtes Verfahren \(3 Jahre\)/);
  });

  it("origin-country law decides, stated in all four banners", () => {
    for (const l of Object.keys(L)) expect(L[l].page.infoBannerBody).toMatch(/porijekl|podrijetl|porekl|Herkunftsstaat/);
  });
});
