import { describe, expect, it } from "vitest";
import { lessonsA1 } from "../lessons-a1";
import { lessonsA2 } from "../lessons-a2";
import { lessonsB1 } from "../lessons-b1";
import { lessonsB2 } from "../lessons-b2";
import { lessonsC1 } from "../lessons-c1";
import { lessonsC2 } from "../lessons-c2";
import { FREE_LESSONS_PER_LEVEL, LEVELS } from "../types";
import { checkAnswer, type L } from "../pilot/a1-pilot-lessons";
import { AUTHORED_CORE_LESSONS, STANDARDIZED_LESSONS, getStandardizedFor } from "./authored-lessons";
import { CORE_CHECKPOINT_CAP, CORE_PRACTICE_CAP, buildCorePlan, isValidExercise, isCorrectLegacy } from "./core-plan";
import bs from "@/i18n/locales/bs/pages.json";
import hr from "@/i18n/locales/hr/pages.json";
import sr from "@/i18n/locales/sr/pages.json";
import de from "@/i18n/locales/de/pages.json";

const byLevel = { A1: lessonsA1, A2: lessonsA2, B1: lessonsB1, B2: lessonsB2, C1: lessonsC1, C2: lessonsC2 };
const all = Object.values(byLevel).flat();

describe("course invariants (240 legacy lessons preserved)", () => {
  it("has 6 CEFR levels × 40 lessons with stable IDs a1-01 … c2-40", () => {
    expect([...LEVELS]).toEqual(["A1", "A2", "B1", "B2", "C1", "C2"]);
    for (const lvl of LEVELS) {
      const ids = byLevel[lvl].map((l) => l.id);
      expect(ids).toEqual(Array.from({ length: 40 }, (_, i) => `${lvl.toLowerCase()}-${String(i + 1).padStart(2, "0")}`));
      expect(byLevel[lvl].every((l) => l.level === lvl)).toBe(true);
    }
    expect(new Set(all.map((l) => l.id)).size).toBe(240);
  });

  it("keeps all legacy exercises (15 per lesson) and access flags (10 free + 30 premium per level, 3 free in UI)", () => {
    expect(FREE_LESSONS_PER_LEVEL).toBe(3);
    for (const lvl of LEVELS) expect(byLevel[lvl].filter((l) => l.premium).length).toBe(30);
    expect(all.every((l) => l.stages.length === 3 && l.stages.every((s) => s.exercises.length === 5))).toBe(true);
  });
});

describe("core plan for every lesson", () => {
  it("is capped, valid, de-duplicated and accounts for every legacy exercise", () => {
    for (const lesson of all) {
      const plan = buildCorePlan(lesson);
      expect(plan.practice.length).toBeGreaterThanOrEqual(3);
      expect(plan.practice.length).toBeLessThanOrEqual(CORE_PRACTICE_CAP);
      expect(plan.checkpoint.length).toBeGreaterThanOrEqual(1);
      expect(plan.checkpoint.length).toBeLessThanOrEqual(CORE_CHECKPOINT_CAP);
      const refs = [...plan.practice, ...plan.checkpoint];
      expect(new Set(refs.map((r) => r.key)).size).toBe(refs.length);
      expect(new Set(refs.map((r) => `${r.exercise.question}|${JSON.stringify(r.exercise.answer)}`)).size).toBe(refs.length);
      for (const r of refs) {
        expect(isValidExercise(r.exercise)).toBe(true);
        const m = /^(.+):s(\d):e(\d+)$/.exec(r.key)!;
        expect(m[1]).toBe(lesson.id);
        expect(lesson.stages[+m[2]].exercises[+m[3]]).toBe(r.exercise);
      }
      expect(plan.extraCount + refs.length).toBe(15);
      expect(plan.status).toBe(getStandardizedFor(lesson.id) ? "standardized" : "legacy-adapted");
    }
  });

  it("mixes exercise types in practice where the lesson offers them", () => {
    const plan = buildCorePlan(lessonsA1[0]);
    expect(new Set(plan.practice.map((p) => p.exercise.type)).size).toBeGreaterThanOrEqual(3);
  });

  it("scores legacy answers deterministically", () => {
    const sort = lessonsA1[0].stages[0].exercises[1];
    expect(isCorrectLegacy(sort, sort.answer as number[])).toBe(true);
    expect(isCorrectLegacy(sort, [...(sort.answer as number[])].reverse())).toBe(false);
    const fill = lessonsA1[0].stages[0].exercises[2];
    expect(isCorrectLegacy(fill, "tut")).toBe(true);
    expect(isCorrectLegacy(fill, "macht")).toBe(false);
  });
});

describe("standardized lessons", () => {
  it("exist for exactly 7 legacy IDs, at least one per CEFR level, with matching level", () => {
    expect(STANDARDIZED_LESSONS.map((s) => s.legacyId)).toEqual(["a1-03", "a1-04", "a2-11", "b1-08", "b2-02", "c1-05", "c2-14"]);
    for (const s of STANDARDIZED_LESSONS) {
      const legacy = all.find((l) => l.id === s.legacyId)!;
      expect(legacy).toBeTruthy();
      expect(legacy.level).toBe(s.level);
    }
    expect(new Set(STANDARDIZED_LESSONS.map((s) => s.level))).toEqual(new Set(LEVELS));
  });

  const strings = (o: unknown, out: L[] = []): L[] => {
    if (o && typeof o === "object") {
      const k = Object.keys(o);
      if (k.length === 4 && ["bs", "hr", "sr", "de"].every((x) => k.includes(x))) out.push(o as L);
      else Object.values(o).forEach((v) => strings(v, out));
    }
    return out;
  };

  for (const lesson of AUTHORED_CORE_LESSONS) {
    it(`${lesson.id}: four-locale parity, solvable exercises, articles/plurals`, () => {
      for (const t of strings(lesson)) for (const v of Object.values(t)) expect(v.trim().length).toBeGreaterThan(0);
      // Croatian must not use Bosnian/Serbian "tačno"; Serbian must be ekavian in common words.
      for (const t of strings(lesson)) {
        expect(t.hr).not.toMatch(/[Tt]ačn/);
        expect(t.sr).not.toMatch(/(gdje|riječ|vrijem|mjest|vježb|poslije|prije|dvije|mjesec|zahtjev|rješenj|primjed)/i);
      }
      expect(lesson.objectives.length).toBeGreaterThanOrEqual(3);
      expect(lesson.vocab.filter((v) => v.article).every((v) => v.plural)).toBe(true);
      expect(lesson.vocab.filter((v) => v.article).length).toBeGreaterThanOrEqual(5);
      expect(lesson.dialogue.length).toBeGreaterThanOrEqual(6);
      expect(new Set(lesson.exercises.map((e) => e.kind)).size).toBe(4);
      for (const ex of lesson.exercises) {
        if (ex.kind === "gap") { expect(ex.options).toContain(ex.answer); expect(checkAnswer(ex, ex.answer)).toBe(true); expect(checkAnswer(ex, ex.options.find((o) => o !== ex.answer))).toBe(false); }
        if (ex.kind === "choice") { expect(ex.answer).toBeLessThan(ex.options.length); expect(checkAnswer(ex, ex.answer)).toBe(true); }
        if (ex.kind === "order") { expect(ex.words.join(" ")).toBe(ex.answer); expect(new Set(ex.words).size).toBe(ex.words.length); expect(checkAnswer(ex, [...ex.words].reverse())).toBe(false); }
        if (ex.kind === "match") { expect(checkAnswer(ex, Object.fromEntries(ex.pairs.map((p) => [p.de, p.de])))).toBe(true); }
      }
    });
  }
});

describe("core UI labels", () => {
  it("exist with identical keys in bs/hr/sr/de", () => {
    const keys = (d: any) => Object.keys(d.deutschTrainer.core).sort();
    expect(keys(hr)).toEqual(keys(bs));
    expect(keys(sr)).toEqual(keys(bs));
    expect(keys(de)).toEqual(keys(bs));
    for (const d of [bs, hr, sr, de]) for (const v of Object.values((d as any).deutschTrainer.core)) expect(String(v).length).toBeGreaterThan(0);
  });
});
