import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Info, Play, Square } from "lucide-react";
import AudioButton from "@/components/trainer/AudioButton";
import { SPEED_RATES, speakerVoices, type SpeedMode } from "@/lib/audio/audio-engine";
import type { PlayOptions } from "@/hooks/useTTS";

type Toggle = (id: string, text: string, opts?: PlayOptions) => void;
type PlayState = "idle" | "loading" | "playing" | "paused";

/** Normal / slower toggle using client-side playbackRate (no extra generation). */
export function SpeedToggle({ rate, setRate }: { rate: number; setRate: (r: number) => void }) {
  const { t } = useTranslation("pages");
  const mode: SpeedMode = rate < 1 ? "slow" : "normal";
  return (
    <div role="group" aria-label={t("deutschTrainer.audio.speed")} className="inline-flex rounded-full border border-white/15 p-0.5">
      {(["normal", "slow"] as const).map((m) => (
        <button key={m} type="button" aria-pressed={mode === m} onClick={() => setRate(SPEED_RATES[m])}
          className={`rounded-full px-3 py-1 text-xs font-bold ${mode === m ? "bg-gold text-background" : "text-white/80 hover:text-white"}`}>
          {t(`deutschTrainer.audio.${m}`)}
        </button>
      ))}
    </div>
  );
}

/** Honest status: basic browser voice or failure is never shown as professional audio. */
export function AudioStatusNotice({ usingFallback, audioError }: { usingFallback: boolean; audioError: boolean }) {
  const { t } = useTranslation("pages");
  if (!usingFallback && !audioError) return null;
  return (
    <p role="status" className="flex gap-2 rounded-lg border border-amber-400/40 bg-amber-500/10 px-3 py-2 text-xs text-amber-100">
      <Info className="h-4 w-4 shrink-0" />
      {audioError ? t("deutschTrainer.audio.error") : t("deutschTrainer.audio.fallback")}
    </p>
  );
}

export interface DialogueLine { speaker: string; de: string; tr?: string }

/** Sentence-level replay + "play all" with per-speaker voices. */
export function DialoguePlayer({ idPrefix, lines, toggle, stop, activeId, playState, distinctVoices = true }: {
  idPrefix: string; lines: DialogueLine[]; toggle: Toggle; stop: () => void;
  activeId: string | null; playState: PlayState; distinctVoices?: boolean;
}) {
  const { t } = useTranslation("pages");
  const voices = speakerVoices(lines.map((l) => l.speaker));
  const [sequence, setSequence] = useState<number | null>(null);
  const seqRef = useRef<number | null>(null);
  seqRef.current = sequence;

  const lineId = (i: number) => `${idPrefix}-d${i}`;
  const opts = (i: number, onEnded?: () => void): PlayOptions => ({
    voiceId: distinctVoices ? voices[lines[i].speaker] : undefined, allowFallback: false, onEnded,
  });
  const playFrom = (i: number) => {
    if (i >= lines.length) { setSequence(null); return; }
    setSequence(i);
    toggle(lineId(i), lines[i].de, opts(i, () => { if (seqRef.current === i) playFrom(i + 1); }));
  };
  const stopAll = () => { setSequence(null); stop(); };
  useEffect(() => () => setSequence(null), []);

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        {sequence === null
          ? <button type="button" onClick={() => playFrom(0)} className="inline-flex items-center gap-1.5 rounded-full bg-gold/15 px-3 py-1.5 text-xs font-bold text-gold hover:bg-gold/25"><Play className="h-3.5 w-3.5" />{t("deutschTrainer.audio.playAll")}</button>
          : <button type="button" onClick={stopAll} className="inline-flex items-center gap-1.5 rounded-full bg-gold/15 px-3 py-1.5 text-xs font-bold text-gold hover:bg-gold/25"><Square className="h-3.5 w-3.5" />{t("deutschTrainer.audio.stopAll")}</button>}
      </div>
      <ol className="space-y-3">
        {lines.map((d, i) => {
          const active = activeId === lineId(i);
          return (
            <li key={i} className={`flex items-start gap-3 rounded-lg p-1 ${active ? "bg-white/[0.05]" : ""}`} aria-current={active ? "true" : undefined}>
              <AudioButton id={lineId(i)} text={d.de} activeId={activeId} playState={playState}
                toggle={(id, text) => { setSequence(null); toggle(id, text, opts(i)); }}
                className={active ? undefined : "bg-gold/15 text-gold hover:bg-gold/25"} />
              <div>
                <p className="text-xs font-bold text-gold">{d.speaker}</p>
                <p className="text-white" lang="de">{d.de}</p>
                {d.tr && <p className="text-xs text-white/60">{d.tr}</p>}
              </div>
            </li>
          );
        })}
      </ol>
      <p className="mt-3 text-[11px] text-white/50">{t("deutschTrainer.audio.voiceNote")}</p>
    </div>
  );
}
