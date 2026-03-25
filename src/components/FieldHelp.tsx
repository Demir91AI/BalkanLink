import { useState } from "react";
import { Info, AlertTriangle, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

interface FieldHelpProps {
  /** Free explanation text */
  explanation: string;
  /** Common mistake warning */
  warning?: string;
  /** Premium-only extra info */
  premiumTip?: string;
  /** Extra className */
  className?: string;
}

export default function FieldHelp({ explanation, warning, premiumTip, className }: FieldHelpProps) {
  const [expanded, setExpanded] = useState(false);
  const { isPremium } = useAuth();

  if (!explanation) return null;

  return (
    <div className={cn("mt-1", className)}>
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground transition-colors"
      >
        <Info className="h-3 w-3" />
        <span>{expanded ? "Zatvori pomoć" : "Pomoć za ovo polje"}</span>
      </button>

      {expanded && (
        <div className="mt-1.5 space-y-1.5 rounded-lg border border-border/50 bg-muted/30 p-3 text-xs leading-relaxed animate-in fade-in-0 slide-in-from-top-1 duration-150">
          {/* Free explanation */}
          <p className="text-foreground">{explanation}</p>

          {/* Warning */}
          {warning && (
            <div className="flex items-start gap-1.5 rounded-md bg-orange-50 dark:bg-orange-950/20 border border-orange-200/60 dark:border-orange-800/30 px-2.5 py-1.5">
              <AlertTriangle className="h-3 w-3 shrink-0 text-orange-500 mt-0.5" />
              <p className="text-orange-700 dark:text-orange-300">{warning}</p>
            </div>
          )}

          {/* Premium tip */}
          {premiumTip && (
            isPremium ? (
              <p className="text-foreground/80 border-t border-border/30 pt-1.5">{premiumTip}</p>
            ) : (
              <div className="flex items-start gap-1.5 rounded-md bg-primary/5 border border-primary/10 px-2.5 py-1.5">
                <Lock className="h-3 w-3 shrink-0 text-primary mt-0.5" />
                <p className="text-muted-foreground">
                  <Link to="/premium" className="text-primary font-medium hover:underline">Premium</Link>
                  {" "}– detaljno objašnjenje i savjeti
                </p>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
