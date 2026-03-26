import { Volume2, Pause } from "lucide-react";
import { cn } from "@/lib/utils";

interface AudioButtonProps {
  text: string;
  toggle: (text: string) => void;
  state: "idle" | "playing" | "paused";
  size?: "sm" | "md";
}

export default function AudioButton({ text, toggle, state, size = "sm" }: AudioButtonProps) {
  const isActive = state === "playing";
  const iconSize = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";
  const btnSize = size === "sm" ? "h-7 w-7" : "h-8 w-8";

  return (
    <button
      onClick={() => toggle(text)}
      className={cn(
        "inline-flex items-center justify-center rounded-full transition-all duration-150",
        btnSize,
        isActive
          ? "bg-primary text-primary-foreground"
          : "bg-primary/10 text-primary hover:bg-primary/20"
      )}
      aria-label={isActive ? "Pause" : "Abspielen"}
    >
      {isActive ? (
        <Pause className={iconSize} />
      ) : (
        <Volume2 className={iconSize} />
      )}
    </button>
  );
}
