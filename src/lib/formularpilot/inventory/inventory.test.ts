import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { join } from "node:path";
import { PDF_FILL_FORMS, ELTERNGELD_VARIANTS, PRINT_SIMULATION_SLUGS, PLANNED_OR_LINK_ONLY_SLUGS, NEXT_GOLDEN_BATCH } from "./forms";
import { BUNDLED_PDF_HASHES } from "./bundled-hashes";
import { BUNDESLAND_CODES } from "../jurisdiction";
import { formCatalog } from "@/lib/form-catalog";

const MUSTER = join(process.cwd(), "public/muster");
const variants = PDF_FILL_FORMS.flatMap((f) => f.variants);

describe("forms inventory integrity", () => {
  it("every bundled PDF is inventoried and every referenced file exists", () => {
    const files = readdirSync(MUSTER).filter((f) => f.endsWith(".pdf")).sort();
    const referenced = new Set(variants.map((v) => v.bundledFile).filter(Boolean));
    expect([...referenced].sort()).toEqual(files);
    expect(Object.keys(BUNDLED_PDF_HASHES).sort()).toEqual(files);
  });

  it("bundled bytes still match recorded hashes (no silent replacement)", () => {
    for (const [f, h] of Object.entries(BUNDLED_PDF_HASHES)) {
      const sha = createHash("sha256").update(readFileSync(join(MUSTER, f))).digest("hex");
      expect(sha, f).toBe(h.sha256);
    }
  });

  it("nothing is marked tested yet", () => {
    expect(variants.filter((v) => v.readiness === "tested")).toEqual([]);
  });

  it("all 16 states have an Elterngeld variant", () => {
    expect(ELTERNGELD_VARIANTS.map((v) => v.appliesTo).sort()).toEqual([...BUNDESLAND_CODES].sort());
  });

  it("non-ready variants always carry blockers; rights never claimed", () => {
    for (const v of variants) expect(v.blockers.length, v.id).toBeGreaterThan(0);
    for (const f of PDF_FILL_FORMS) expect(f.rights).toBe("unknown");
  });

  it("known broken items stay flagged", () => {
    const byId = Object.fromEntries(variants.map((v) => [v.id, v]));
    expect(byId["kg1-ank"].readiness).toBe("blocked");
    expect(byId["kg1"].readiness).toBe("blocked");
    expect(byId["elterngeld-mv"].readiness).toBe("blocked");
    const dupes = ["bb", "hh", "rp", "sh"].map((s) => BUNDLED_PDF_HASHES[`elterngeld-${({ bb: "brandenburg", hh: "hamburg", rp: "rheinland-pfalz", sh: "schleswig-holstein" } as const)[s as "bb"]}-2025.pdf`].sha256);
    expect(new Set(dupes).size).toBe(1);
  });

  it("every print-simulation slug has a page file", () => {
    const pages = readdirSync(join(process.cwd(), "src/pages/muster")).join(" ").toLowerCase();
    for (const s of PRINT_SIMULATION_SLUGS) {
      const key = s.replace(/-/g, "").replace("ae", "a").replace("ue", "u");
      expect(pages.replace(/ä|ü/g, (c) => (c === "ä" ? "a" : "u")).includes(key.slice(0, 8)), s).toBe(true);
    }
  });

  it("catalog slugs are all classified", () => {
    const all = formCatalog.flatMap((g) => [...g.items, ...(g.subGroups ?? []).flatMap((s) => s.items)]).map((i) => i.slug);
    const known = new Set<string>([
      ...PDF_FILL_FORMS.map((f) => f.id), "hauptantrag", "kinderzuschlag", "bafoeg", "integrationskurs",
      ...PRINT_SIMULATION_SLUGS, ...PLANNED_OR_LINK_ONLY_SLUGS,
    ]);
    const unclassified = all.filter((s) => !known.has(s));
    expect(unclassified).toEqual([]);
  });

  it("next batch refers to inventoried forms", () => {
    expect(NEXT_GOLDEN_BATCH).toHaveLength(3);
    expect(existsSync(join(MUSTER, "kiz1-antrag-2026.pdf"))).toBe(true);
  });
});
