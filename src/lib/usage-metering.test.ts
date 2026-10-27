import { describe, it, expect, vi } from "vitest";
import { readFileSync } from "node:fs";
import { trialDaysLeft } from "@/hooks/useFeatureAccess";
// @ts-expect-error Deno-style .ts import of a plain module works under Vitest
import { meterStream } from "../../supabase/functions/_shared/usage.ts";

const read = (p: string) => readFileSync(p, "utf8");

function streamOf(chunks: string[], failAfter = -1) {
  let i = 0;
  return new ReadableStream<Uint8Array>({
    pull(c) {
      if (i === failAfter) { c.error(new Error("upstream")); return; }
      if (i >= chunks.length) { c.close(); return; }
      c.enqueue(new TextEncoder().encode(chunks[i++]));
    },
  });
}
async function drain(s: ReadableStream<Uint8Array>) {
  const r = s.getReader();
  try { for (;;) { const { done } = await r.read(); if (done) break; } } catch { /* expected */ }
}

describe("assistant streaming metering", () => {
  it("commits once when the stream completes", async () => {
    const commit = vi.fn(async () => {}), release = vi.fn(async () => {});
    await drain(meterStream(streamOf(["a", "b"]), commit, release));
    expect(commit).toHaveBeenCalledTimes(1);
    expect(release).not.toHaveBeenCalled();
  });
  it("releases when the upstream fails before any content", async () => {
    const commit = vi.fn(async () => {}), release = vi.fn(async () => {});
    await drain(meterStream(streamOf(["a"], 0), commit, release));
    expect(release).toHaveBeenCalledTimes(1);
    expect(commit).not.toHaveBeenCalled();
  });
  it("releases an empty stream", async () => {
    const commit = vi.fn(async () => {}), release = vi.fn(async () => {});
    await drain(meterStream(streamOf([]), commit, release));
    expect(release).toHaveBeenCalledTimes(1);
  });
  it("counts a reply the user cancelled after content arrived", async () => {
    const commit = vi.fn(async () => {}), release = vi.fn(async () => {});
    const r = meterStream(streamOf(["a", "b", "c"]), commit, release).getReader();
    await r.read();
    await r.cancel();
    expect(commit).toHaveBeenCalledTimes(1);
    expect(release).not.toHaveBeenCalled();
  });
});

describe("trial countdown", () => {
  const now = new Date("2026-10-27T12:00:00Z");
  it("shows 7 days right after a 7-day grant and 0 after expiry", () => {
    expect(trialDaysLeft("2026-11-03T12:00:00Z", now)).toBe(7);
    expect(trialDaysLeft("2026-10-27T11:00:00Z", now)).toBe(0);
    expect(trialDaysLeft(null, now)).toBe(0);
  });
});

describe("server quota rules (migration source)", () => {
  const sql = read("drizzle/migrations/0002_phase2_trial_and_usage_metering.sql");
  it("trial: 2 document analyses and 10 assistant replies in total", () => {
    expect(sql).toMatch(/p_source = 'trial' THEN period_key := v_trial; lim := CASE p_feature WHEN 'document_analysis' THEN 2 ELSE 10 END/);
  });
  it("yearly: 5 document analyses and 40 assistant replies per Berlin calendar month", () => {
    expect(sql).toMatch(/p_source = 'new_yearly' THEN period_key := 'm:' \|\| v_month; lim := CASE p_feature WHEN 'document_analysis' THEN 5 ELSE 40 END/);
    expect(sql).toContain("to_char(now() AT TIME ZONE 'Europe/Berlin','YYYY-MM')");
  });
  it("legacy lifetime, legacy subscription and admin are never capped", () => {
    expect(sql).toMatch(/p_source IN \('admin','legacy_lifetime','legacy_sub'\) THEN period_key := 'm:' \|\| v_month; lim := NULL/);
  });
  it("trial lasts 7 days, needs a verified email and is off until the owner enables it", () => {
    expect(sql).toContain("now() + interval '7 days'");
    expect(sql).toContain("NEW.email_confirmed_at IS NOT NULL");
    expect(sql).toContain("trial_signup_enabled boolean NOT NULL DEFAULT false");
  });
  it("metering functions are not callable from the browser", () => {
    for (const fn of ["reserve_usage(uuid,text,text)", "commit_usage(uuid)", "release_usage(uuid)"]) {
      expect(sql).toContain(`REVOKE ALL ON FUNCTION public.${fn} FROM PUBLIC, anon, authenticated`);
    }
  });
});

describe("endpoints use server metering", () => {
  it("document-check and chat-assistant reserve and settle usage", () => {
    const doc = read("supabase/functions/document-check/index.ts");
    expect(doc).toContain('reserveUsage(adminSupabase, userId, "document_analysis")');
    expect(doc).toContain("releaseUsage(adminRef, reservation)");
    expect(doc).not.toContain("1.99€ pro Pruefung");
    const chat = read("supabase/functions/chat-assistant/index.ts");
    expect(chat).toContain('reserveUsage(admin, userId, "assistant_reply")');
    expect(chat).toContain("meterStream(response.body");
  });
  it("TTS meters only new generations, never cached audio", () => {
    const tts = read("supabase/functions/generate-tts/index.ts");
    expect(tts.indexOf("Storage cache hit")).toBeLessThan(tts.indexOf('"tts_generation"'));
  });
});
