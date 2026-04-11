import { useTranslation } from "@/i18n/useTranslation";
import type { Language } from "@/lib/translations";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

const SUPPORTED_LANGS = [
  { code: "bs", name: "Bosanski", flag: "https://flagcdn.com/h40/ba.png" },
  { code: "hr", name: "Hrvatski", flag: "https://flagcdn.com/h40/hr.png" },
  { code: "sr", name: "Srpski",   flag: "https://flagcdn.com/h40/rs.png" },
  { code: "de", name: "Deutsch",  flag: "https://flagcdn.com/h40/de.png" },
];

export default function LanguageSelector() {
  const { currentLanguage, setLanguage } = useTranslation();
  const current = SUPPORTED_LANGS.find(l => l.code === currentLanguage)
    ?? SUPPORTED_LANGS[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex items-center gap-1.5 rounded-lg px-2.5 h-9
                     text-white/70 hover:text-white hover:bg-white/8
                     active:scale-[0.93] transition-all duration-150
                     border border-white/10 hover:border-white/20"
          aria-label="Promijeni jezik"
        >
          <img
            src={current.flag}
            alt={current.name}
            className="h-3.5 w-5 rounded-[2px] object-cover shrink-0"
          />
          <span className="text-[11px] font-bold uppercase tracking-wide">
            {current.code}
          </span>
          <ChevronDown className="h-3 w-3 text-white/40" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="min-w-[160px] bg-[hsl(215,55%,10%)] border-white/10 shadow-xl"
      >
        {SUPPORTED_LANGS.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code as Language)}
            className={`
              flex items-center gap-2.5 text-white/80
              hover:text-white focus:text-white focus:bg-white/10
              ${currentLanguage === lang.code
                ? "bg-white/10 text-[hsl(var(--gold))] font-semibold"
                : ""}
            `}
          >
            <img
              src={lang.flag}
              alt=""
              className="h-4 w-6 rounded-[2px] object-cover shrink-0"
            />
            <span className="text-sm">{lang.name}</span>
            {currentLanguage === lang.code && (
              <span className="ml-auto text-[hsl(var(--gold))] text-xs">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
