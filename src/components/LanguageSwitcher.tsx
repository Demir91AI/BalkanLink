/**
 * <LanguageSwitcher />
 *
 * Dropdown switcher for BalkanLink — shows native language names ("Bosanski" / "Deutsch")
 * with no flags and no country codes. Each language label is ALWAYS written in its
 * own language regardless of active UI language.
 *
 * On selection: changes i18n language, navigates to the mirrored URL (BS root ↔ /de/*),
 * and persists the choice to localStorage.
 */
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronDown, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LANG_STORAGE_KEY, type SupportedLanguage } from "@/i18n";
import { mirrorPath } from "@/lib/i18n-paths";

const LANGUAGES: { code: SupportedLanguage; nativeName: string }[] = [
  { code: "bs", nativeName: "Bosanski" },
  { code: "de", nativeName: "Deutsch" },
];

const GOLD = "#D4AF37";

interface Props {
  /** Visual variant: "header" (default, dark glass) or "sidebar" (light, larger). */
  variant?: "header" | "sidebar";
}

export function LanguageSwitcher({ variant = "header" }: Props) {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const currentLang = (LANGUAGES.find((l) => l.code === i18n.language)?.code ??
    "bs") as SupportedLanguage;
  const currentNative =
    LANGUAGES.find((l) => l.code === currentLang)?.nativeName ?? "Bosanski";

  const handleSelect = (lang: SupportedLanguage) => {
    if (lang === currentLang) return;
    void i18n.changeLanguage(lang);
    try {
      localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch {
      /* ignore */
    }
    const target = mirrorPath(location.pathname, lang);
    // Preserve search/hash on switch
    navigate(`${target}${location.search}${location.hash}`);
  };

  const triggerClass =
    variant === "header"
      ? "inline-flex items-center gap-1.5 rounded-full text-[12px] font-semibold text-white/85 transition-all hover:text-white"
      : "inline-flex items-center justify-between w-full gap-2 rounded-lg text-sm font-semibold text-foreground transition-all hover:bg-muted/50";

  const triggerStyle: React.CSSProperties =
    variant === "header"
      ? {
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          padding: "7px 14px",
          letterSpacing: "0.02em",
        }
      : {
          padding: "10px 14px",
          border: "1px solid hsl(var(--border))",
        };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Language / Sprache / Jezik"
        className={`${triggerClass} focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/60 data-[state=open]:scale-[1.02] transition-transform duration-200`}
        style={triggerStyle}
      >
        <span>{currentNative}</span>
        <ChevronDown className="h-3.5 w-3.5 opacity-70" strokeWidth={2.25} />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={6}
        className="min-w-[160px] rounded-xl border-white/10 bg-[#0d1526] p-1 text-white shadow-2xl animate-in fade-in-0 zoom-in-95 duration-200"
      >
        {LANGUAGES.map((lang) => {
          const active = lang.code === currentLang;
          return (
            <DropdownMenuItem
              key={lang.code}
              onSelect={() => handleSelect(lang.code)}
              className={`flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm font-medium outline-none transition-colors focus:bg-white/5 ${
                active
                  ? "border-l-2 text-white"
                  : "border-l-2 border-transparent text-white/70 hover:bg-white/5 hover:text-white"
              }`}
              style={active ? { borderLeftColor: GOLD } : undefined}
            >
              <span>{lang.nativeName}</span>
              {active && <Check className="h-4 w-4" style={{ color: GOLD }} strokeWidth={2.5} />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LanguageSwitcher;
