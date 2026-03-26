import { Volume2, Lock, Crown } from "lucide-react";
import AudioButton from "./AudioButton";
import { Button } from "@/components/ui/button";
import type { Lesson } from "@/lib/deutsch-trainer-data";

interface Props {
  lesson: Lesson;
  isPremium: boolean;
  freePhraseLimit: number;
  totalPhrases: number;
  toggle: (id: string, text: string) => void;
  activeId: string | null;
  playState: "playing" | "paused" | "idle";
  onUpgrade: () => void;
}

export default function SprachassistentSection({
  lesson,
  isPremium,
  freePhraseLimit,
  totalPhrases,
  toggle,
  activeId,
  playState,
  onUpgrade,
}: Props) {
  if (lesson.importantPhrases.length === 0) return null;

  const visiblePhrases = isPremium
    ? lesson.importantPhrases
    : lesson.importantPhrases.slice(0, freePhraseLimit);

  const lockedCount = isPremium ? 0 : totalPhrases - freePhraseLimit;
  const displayTotal = isPremium ? totalPhrases : totalPhrases;

  // Show a few "blurred" preview phrases for free users
  const blurredPreviewPhrases = !isPremium
    ? lesson.importantPhrases.slice(freePhraseLimit, freePhraseLimit + 3)
    : [];

  return (
    <div className="mb-4 rounded-xl border bg-card p-4">
      <div className="mb-2 flex items-center gap-2">
        <Volume2 className="h-4 w-4 text-primary" />
        <h3 className="text-xs font-bold">Sprachassistent</h3>
        <span className="ml-auto rounded-full bg-muted px-2 py-0.5 text-[9px] font-bold text-muted-foreground">
          {visiblePhrases.length}/{displayTotal}
        </span>
        {!isPremium && (
          <span className="rounded-full bg-gold/10 px-2 py-0.5 text-[9px] font-bold text-gold-dark">
            Vorschau
          </span>
        )}
      </div>

      {/* Visible phrases */}
      <div className="flex flex-col gap-2">
        {visiblePhrases.map((phrase, i) => {
          const audioId = `phrase-${lesson.id}-${i}`;
          return (
            <div key={i} className="flex items-center gap-3 rounded-lg bg-muted/50 px-3 py-2.5">
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold">{phrase.de}</p>
                <p className="text-[10px] text-muted-foreground">{phrase.context}</p>
              </div>
              <AudioButton id={audioId} text={phrase.de} toggle={toggle} activeId={activeId} playState={playState} />
            </div>
          );
        })}
      </div>

      {/* Blurred locked phrases preview */}
      {!isPremium && blurredPreviewPhrases.length > 0 && (
        <div className="relative mt-2">
          <div className="flex flex-col gap-2 select-none pointer-events-none">
            {blurredPreviewPhrases.map((phrase, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-lg bg-muted/50 px-3 py-2.5 opacity-40"
                style={{ filter: "blur(4px)" }}
              >
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold">{phrase.de}</p>
                  <p className="text-[10px] text-muted-foreground">{phrase.context}</p>
                </div>
                <Lock className="h-4 w-4 text-muted-foreground shrink-0" />
              </div>
            ))}
          </div>
          {/* Gradient fade overlay */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-card to-transparent" />
        </div>
      )}

      {/* Lock CTA */}
      {!isPremium && (
        <div className="mt-3 rounded-xl border border-gold/20 bg-gradient-to-b from-gold/5 to-gold/10 p-4 text-center">
          <Lock className="mx-auto mb-1.5 h-5 w-5 text-gold" />
          <p className="text-xs font-bold">
            🔒 +{lockedCount} weitere Sätze freischalten
          </p>
          <p className="mt-0.5 text-[11px] text-muted-foreground">
            Nur mit Ultimate freigeschaltet
          </p>
          <Button
            onClick={onUpgrade}
            className="mt-3 h-9 w-full rounded-xl bg-gold text-xs font-bold text-gold-foreground shadow-[0_4px_20px_rgba(255,204,0,0.3)] hover:bg-gold-light"
          >
            <Crown className="mr-1.5 h-3.5 w-3.5" /> Sprachassistent freischalten
          </Button>
        </div>
      )}
    </div>
  );
}
