import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@/i18n";
import i18n from "i18next";
import { DialoguePlayer, AudioStatusNotice, SpeedToggle } from "./AudioPlayerParts";
import { DEFAULT_VOICE_ID, SECOND_VOICE_ID } from "@/lib/audio/audio-engine";

const lines = [{ speaker: "A", de: "Guten Tag!" }, { speaker: "B", de: "Wie heißen Sie?" }, { speaker: "A", de: "Ich heiße Maja." }];

describe("audio player parts", () => {
  it("plays the whole dialogue in order with speaker voices and no browser fallback", async () => {
    await i18n.changeLanguage("bs");
    const calls: any[] = [];
    const toggle = vi.fn((id, text, opts) => { calls.push({ id, text, voice: opts.voiceId, fb: opts.allowFallback }); setTimeout(() => opts.onEnded?.(), 0); });
    render(<DialoguePlayer idPrefix="x" lines={lines} toggle={toggle} stop={vi.fn()} activeId={null} playState="idle" />);
    fireEvent.click(screen.getByRole("button", { name: /Pusti cijeli dijalog/ }));
    await vi.waitFor(() => expect(calls).toHaveLength(3));
    expect(calls.map((c) => c.text)).toEqual(lines.map((l) => l.de));
    expect(calls.map((c) => c.voice)).toEqual([DEFAULT_VOICE_ID, SECOND_VOICE_ID, DEFAULT_VOICE_ID]);
    expect(calls.every((c) => c.fb === false)).toBe(true);
  });
  it("stop button stops sequence", () => {
    const stop = vi.fn();
    render(<DialoguePlayer idPrefix="y" lines={lines} toggle={vi.fn()} stop={stop} activeId={null} playState="idle" />);
    fireEvent.click(screen.getByRole("button", { name: /Pusti cijeli dijalog/ }));
    fireEvent.click(screen.getByRole("button", { name: /Zaustavi/ }));
    expect(stop).toHaveBeenCalled();
  });
  it("speed toggle uses client rates 1.0/0.75", () => {
    const setRate = vi.fn();
    render(<SpeedToggle rate={1} setRate={setRate} />);
    fireEvent.click(screen.getByRole("button", { name: "Sporije" }));
    expect(setRate).toHaveBeenCalledWith(0.75);
  });
  it("fallback is labelled as basic device voice, never silent", () => {
    const { rerender, container } = render(<AudioStatusNotice usingFallback={false} audioError={false} />);
    expect(container.textContent).toBe("");
    rerender(<AudioStatusNotice usingFallback audioError={false} />);
    expect(screen.getByRole("status").textContent).toMatch(/osnovni glas/);
  });
  it("audio labels exist in all four languages", async () => {
    const keys = (l: string) => Object.keys((i18n.getResourceBundle(l, "pages") as any).deutschTrainer.audio).sort();
    for (const l of ["hr", "sr", "de"]) expect(keys(l)).toEqual(keys("bs"));
  });
});
