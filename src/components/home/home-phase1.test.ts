import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { HOME_CATEGORIES, HOME_SMARTGUIDES } from "./HeroSection";
import { formCatalog } from "@/lib/form-catalog";

const read = (p: string) => readFileSync(p, "utf8");
const app = read("src/App.tsx");
const routeExists = (path: string) => app.includes(`path="${path.replace(/^\//, "")}"`);

describe("homepage phase 1", () => {
  it("shows exactly 6 categories, all existing routes", () => {
    expect(HOME_CATEGORIES).toHaveLength(6);
    for (const c of HOME_CATEGORIES) expect([c.path, routeExists(c.path)]).toEqual([c.path, true]);
  });
  it("shows 2 SmartGuide links whose slugs exist in the form catalog", () => {
    expect(HOME_SMARTGUIDES).toHaveLength(2);
    expect(routeExists("/formulari/:slug")).toBe(true);
    const slugs = new Set(formCatalog.flatMap((g) => [...g.items, ...(g.subGroups ?? []).flatMap((s) => s.items)].map((i) => i.slug)));
    for (const g of HOME_SMARTGUIDES) expect(slugs.has(g.slug)).toBe(true);
  });
  it("removes the fixed bottom nav from every layout and the simulated ticker", () => {
    for (const f of ["src/components/layout/Layout.tsx", "src/components/layout/HomeLayout.tsx"]) expect(read(f)).not.toMatch(/MobileBottomNav/);
    expect(read("src/components/home/HeroSection.tsx")).not.toMatch(/DateSeededTicker|seededRandom/);
  });
  it("hero question opens the existing assistant event", () => {
    expect(read("src/components/home/HeroSection.tsx")).toMatch(/new CustomEvent\("open-assistant"/);
  });
  it("has all new homepage texts in BS/HR/SR/DE", () => {
    const keys = (o: object, p = ""): string[] => Object.entries(o).flatMap(([k, v]) => typeof v === "object" ? keys(v, `${p}${k}.`) : [`${p}${k}`]);
    const bs = keys(JSON.parse(read("src/i18n/locales/bs/pages.json")).home.v2).sort();
    for (const l of ["hr", "sr", "de"]) expect(keys(JSON.parse(read(`src/i18n/locales/${l}/pages.json`)).home.v2).sort()).toEqual(bs);
  });
});
