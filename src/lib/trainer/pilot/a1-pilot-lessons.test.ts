import { describe, expect, it } from "vitest";
import { A1_PILOT_LESSONS, buildQueue, checkAnswer, getPilotLesson, pilotLocale } from "./a1-pilot-lessons";
import { getLessonsForLevelAsync } from "@/lib/deutsch-trainer-data";
import bs from "@/i18n/locales/bs/pages.json";
import hr from "@/i18n/locales/hr/pages.json";
import sr from "@/i18n/locales/sr/pages.json";
import de from "@/i18n/locales/de/pages.json";

const LOCS = ["bs", "hr", "sr", "de"] as const;
const allL = (o: unknown): Record<string, string>[] => {
  const out: Record<string, string>[] = [];
  const walk = (v: any) => { if (v && typeof v === "object") { if (LOCS.every((k) => typeof v[k] === "string")) out.push(v); else Object.values(v).forEach(walk); } };
  walk(o); return out;
};

describe("A1 pilot lessons", () => {
  it("has two A1 pilot lessons with unique ids that don't clash with existing lessons", async () => {
    expect(A1_PILOT_LESSONS.map((l) => l.id)).toEqual(["a1-pilot-01", "a1-pilot-02"]);
    const existing = await getLessonsForLevelAsync("A1");
    expect(existing.length).toBe(40);
    for (const p of A1_PILOT_LESSONS) expect(existing.some((e) => e.id === p.id)).toBe(false);
  });

  it("each lesson: 10–15 min, 3 objectives, 8–12 words, dialogue, grammar, ≥6 exercises of ≥3 kinds", () => {
    for (const l of A1_PILOT_LESSONS) {
      expect(l.minutes).toBeGreaterThanOrEqual(10); expect(l.minutes).toBeLessThanOrEqual(15);
      expect(l.objectives.length).toBe(3);
      expect(l.vocab.length).toBeGreaterThanOrEqual(8); expect(l.vocab.length).toBeLessThanOrEqual(12);
      expect(l.dialogue.length).toBeGreaterThanOrEqual(8);
      expect(l.grammar.examples.length).toBeGreaterThanOrEqual(3);
      expect(l.exercises.length).toBeGreaterThanOrEqual(6);
      expect(new Set(l.exercises.map((e) => e.kind)).size).toBeGreaterThanOrEqual(3);
    }
  });

  it("every explanatory text exists, non-empty, in BS/HR/SR/DE", () => {
    for (const l of A1_PILOT_LESSONS) for (const t of allL(l)) for (const k of LOCS) expect(t[k].trim().length).toBeGreaterThan(0);
  });

  it("key German facts: articles and plurals", () => {
    const v = Object.fromEntries(A1_PILOT_LESSONS.flatMap((l) => l.vocab).map((x) => [x.de, x]));
    expect(v.Zimmer.article).toBe("das"); expect(v.Zimmer.plural).toBe("die Zimmer");
    expect(v.Küche.article).toBe("die"); expect(v.Bad.plural).toBe("die Bäder");
    expect(v.Land.plural).toBe("die Länder"); expect(v.Stadt.plural).toBe("die Städte");
    expect(v.Adresse.article).toBe("die"); expect(v.Nebenkosten.article).toBeUndefined();
  });

  it("exercise answers are valid and deterministic", () => {
    for (const l of A1_PILOT_LESSONS) for (const e of l.exercises) {
      if (e.kind === "gap") { expect(e.options).toContain(e.answer); expect(checkAnswer(e, e.answer)).toBe(true); expect(checkAnswer(e, e.options.find((o) => o !== e.answer))).toBe(false); }
      if (e.kind === "choice") { expect(e.options[e.answer]).toBeTruthy(); expect(checkAnswer(e, e.answer)).toBe(true); expect(checkAnswer(e, (e.answer + 1) % e.options.length)).toBe(false); }
      if (e.kind === "order") { expect([...e.words].sort()).toEqual(e.answer.split(" ").sort()); expect(e.words.join(" ")).not.toBe(e.answer); expect(checkAnswer(e, e.answer.split(" "))).toBe(true); expect(checkAnswer(e, e.words)).toBe(false); }
      if (e.kind === "match") { const ok = Object.fromEntries(e.pairs.map((p) => [p.de, p.de])); expect(checkAnswer(e, ok)).toBe(true); expect(checkAnswer(e, { ...ok, [e.pairs[0].de]: e.pairs[1].de })).toBe(false); }
    }
    const rent = getPilotLesson("a1-pilot-02")!.exercises.find((e) => e.id === "c1")!;
    expect(rent.kind === "choice" && rent.options[rent.answer]).toBe("830 Euro");
  });

  it("missed exercises are repeated once at the end", () => {
    const ex = A1_PILOT_LESSONS[0].exercises;
    const q = buildQueue(ex, ["g1", "o2"]);
    expect(q.length).toBe(ex.length + 2);
    expect(q.slice(-2).map((e) => e.id)).toEqual(["g1#review", "o2#review"]);
  });

  it("UI labels have locale parity and fall back to BS for unknown languages", () => {
    const keys = (o: any) => Object.keys(o.deutschTrainer.pilot).sort();
    for (const d of [hr, sr, de]) expect(keys(d)).toEqual(keys(bs));
    expect((de as any).deutschTrainer.pilot.check).toBe("Prüfen");
    expect(pilotLocale("en")).toBe("bs"); expect(pilotLocale("sr-RS")).toBe("sr");
  });
});
