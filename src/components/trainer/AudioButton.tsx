import { Volume2, RotateCcw } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface AudioButtonProps {
  text: string;
  speak: (text: string) => void;
  isSpeaking: boolean;
  size?: "sm" | "md";
}

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
      <button
        onClick={() => speak(text)}
        className={cn(btnBase, "bg-primary/10 text-primary hover:bg-primary/20")}
        aria-label="Nochmal anhören"
        title="Nochmal anhören"
      >
        <RotateCcw className={cn(iconSize, isSpeaking && "animate-spin")} />
      </button>
    </div>
  );
}
