import { HelpCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
const TOOLTIP_FIELDS: Record<string, string> = {
  "Steuernummer": "fieldTooltips.Steuernummer",
  "Steuer-ID": "fieldTooltips.Steuer-ID",
  "Steuerliche Identifikationsnummer": "fieldTooltips.Steuer-ID",
  "IBAN": "fieldTooltips.IBAN",
  "Steuerklasse": "fieldTooltips.Steuerklasse",
  "Kindergeldnummer": "fieldTooltips.Kindergeldnummer",
  "Bedarfsgemeinschaft": "fieldTooltips.Bedarfsgemeinschaft",
  "Familienstand": "fieldTooltips.Familienstand",
  "Geburtsdatum": "fieldTooltips.Geburtsdatum",
  "Staatsangehörigkeit": "fieldTooltips.Staatsangehörigkeit",
  "Aufenthaltstitel": "fieldTooltips.Aufenthaltstitel",
  "Arbeitgeber": "fieldTooltips.Arbeitgeber",
  "Meldebescheinigung": "fieldTooltips.Meldebescheinigung",
};

interface FieldTooltipProps {
  label: string;
}

export default function FieldTooltip({ label }: FieldTooltipProps) {
  // Check if label (or part of it) matches a known field
  const matchedKey = Object.keys(TOOLTIP_FIELDS).find(
    (key) => label.includes(key)
  );

  if (!matchedKey) return null;

  const translationKey = TOOLTIP_FIELDS[matchedKey];
  const tooltip = t(translationKey);

  // If translation returns the key itself, no translation found
  if (tooltip === translationKey) return null;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          className="ml-1 inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
          onClick={(e) => e.preventDefault()}
        >
          <HelpCircle className="h-3 w-3" />
        </button>
      </TooltipTrigger>
      <TooltipContent
        side="top"
        className="max-w-[260px] text-xs leading-relaxed"
      >
        {tooltip}
      </TooltipContent>
    </Tooltip>
  );
}
