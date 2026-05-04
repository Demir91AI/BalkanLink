import React from "react";
import { Loader2, Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";

interface AudioButtonProps {
  id: string;
  text: string;
  toggle: (id: string, text: string) => void;
  activeId: string | null;
  playState: "idle" | "loading" | "playing" | "paused";
}

const AudioButton = React.forwardRef<HTMLButtonElement, AudioButtonProps>(
  ({ id, text, toggle, activeId, playState }, ref) => {
    const isThisActive = activeId === id;
    const isLoading = isThisActive && playState === "loading";
    const isPlaying = isThisActive && playState === "playing";

    return (
      <button
        ref={ref}
        onClick={(e) => {
          e.stopPropagation();
          toggle(id, text);
        }}
        className={cn(
          "relative inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
          "transition-all duration-200 ease-out",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
          isPlaying || isLoading
            ? "bg-primary text-primary-foreground shadow-[0_0_12px_hsl(var(--primary)/0.4)]"
            : isThisActive && playState === "paused"
              ? "bg-primary/20 text-primary ring-1 ring-primary/30"
              : "bg-primary/10 text-primary hover:bg-primary/20 hover:shadow-sm active:scale-95"
        )}
        aria-label={isPlaying || isLoading ? "Pause" : "Abspielen"}
      >
        {isLoading ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        ) : isPlaying ? (
          <Pause className="h-3.5 w-3.5" fill="currentColor" />
        ) : (
          <Play className="h-3.5 w-3.5 translate-x-[1px]" fill="currentColor" />
        )}
      </button>
    );
  }
);
AudioButton.displayName = "AudioButton";

export default AudioButton;
