import { describe, expect, it, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";

vi.mock("@/services/ttsProvider", () => ({
  getCachedAudioUrl: () => null,
  getDirectAudioUrl: vi.fn(async (s: any) => `https://audio.test/${s.voiceId ?? "default"}/${encodeURIComponent(s.text)}`),
}));
vi.mock("sonner", () => ({ toast: { error: vi.fn() } }));

const instances: any[] = [];
class FakeAudio {
  src = ""; paused = true; currentTime = 0; playbackRate = 1; preload = "";
  onplay: any; onplaying: any; onended: any; onerror: any;
  constructor() { instances.push(this); }
  load() {} pause() { this.paused = true; }
  play() { this.paused = false; this.onplay?.(); return Promise.resolve(); }
  removeAttribute() { this.src = ""; }
}
beforeEach(() => { instances.length = 0; (globalThis as any).Audio = FakeAudio; });

import { useTTS } from "./useTTS";
import { getDirectAudioUrl } from "@/services/ttsProvider";
import { SECOND_VOICE_ID } from "@/lib/audio/audio-engine";

const flush = () => act(async () => { await new Promise((r) => setTimeout(r, 0)); });

describe("useTTS engine", () => {
  it("passes the allowlisted speaker voice and plays", async () => {
    const { result } = renderHook(() => useTTS());
    act(() => result.current.toggle("a", "Wie heißen Sie?", { voiceId: SECOND_VOICE_ID }));
    await flush();
    expect((getDirectAudioUrl as any).mock.calls.at(-1)[0].voiceId).toBe(SECOND_VOICE_ID);
    expect(result.current.playState).toBe("playing");
  });
  it("a second hook instance stops the first (no overlap)", async () => {
    const one = renderHook(() => useTTS()); const two = renderHook(() => useTTS());
    act(() => one.result.current.toggle("a", "Hallo")); await flush();
    act(() => two.result.current.toggle("b", "Tschüss")); await flush();
    expect(one.result.current.playState).toBe("idle");
    expect(instances[0].paused).toBe(true);
    expect(two.result.current.playState).toBe("playing");
  });
  it("stops on unmount", async () => {
    const h = renderHook(() => useTTS());
    act(() => h.result.current.toggle("a", "Hallo")); await flush();
    const audio = instances.at(-1);
    h.unmount();
    expect(audio.paused).toBe(true);
  });
  it("refuses personal-looking text without calling the service", async () => {
    const n = (getDirectAudioUrl as any).mock.calls.length;
    const { result } = renderHook(() => useTTS());
    act(() => result.current.toggle("p", "Schreib an maja@example.com")); await flush();
    expect((getDirectAudioUrl as any).mock.calls.length).toBe(n);
    expect(result.current.audioError).toBe(true);
  });
  it("calls onEnded after natural end (enables dialogue sequencing)", async () => {
    const onEnded = vi.fn();
    const { result } = renderHook(() => useTTS());
    act(() => result.current.toggle("a", "Hallo", { onEnded })); await flush();
    act(() => instances.at(-1).onended()); await act(async () => { await new Promise((r) => setTimeout(r, 150)); });
    expect(onEnded).toHaveBeenCalled();
  });
});
