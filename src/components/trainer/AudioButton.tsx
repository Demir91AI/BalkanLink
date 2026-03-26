import { Volume2, RotateCcw, Snail } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface AudioButtonProps {
  text: string;
  speak: (text: string, slow?: boolean) => void;
  isSpeaking: boolean;
  size?: "sm" | "md";
}

/**
 * Compact inline audio controls: Play · Replay · Slow
 * Expands on first tap to reveal replay + slow buttons.
 */
export default function AudioButton({ text, speak, isSpeaking, size = "sm" }: AudioButtonProps) {
  const [expanded, setExpanded] = useState(false);

  const iconSize = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";
  const btnBase = cn(
    "inline-flex items-center justify-center rounded-full transition-all duration-200",
    size === "sm" ? "h-7 w-7" : "h-8 w-8"
  );

  const handlePlay = () => {
    speak(text);
    setExpanded(true);
  };

  if (!expanded) {
    return (
      <button
        onClick={handlePlay}
        className={cn(btnBase, "bg-primary/10 text-primary hover:bg-primary/20")}
        aria-label="Anhören"
      >
        <Volume2 className={cn(iconSize, isSpeaking && "animate-pulse")} />
      </button>
    );
  }

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-border/50 bg-muted/40 p-0.5">
      {/* Play / Replay */}
      <button
        onClick={() => speak(text)}
        className={cn(btnBase, "bg-primary/10 text-primary hover:bg-primary/20")}
        aria-label="Nochmal anhören"
        title="Nochmal anhören"
      >
        <RotateCcw className={cn(iconSize, isSpeaking && "animate-spin")} />
      </button>

      {/* Slow mode */}
      <button
        onClick={() => speak(text, true)}
        className={cn(btnBase, "bg-accent/60 text-accent-foreground hover:bg-accent")}
        aria-label="Langsam abspielen"
        title="Langsam abspielen"
      >
        <Snail className={iconSize} />
      </button>
    </div>
  );
}
