/**
 * <LanguageSwitcher />
 *
 * Dropdown switcher for BalkanLink — shows native language names ("Bosanski" / "Deutsch").
 * Each label is ALWAYS written in its own language regardless of active UI language.
 *
 * On selection: changes i18n language, navigates to the mirrored URL (BS root ↔ /de/*),
 * and persists the choice to localStorage.
 */
import { useEffect, useState, type ComponentType } from "react";
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
import { FlagDE } from "@/components/flags/FlagDE";
import { FlagBA } from "@/components/flags/FlagBA";

type FlagComp = ComponentType<{ width?: number; className?: string }>;

// Bosnian and German both shown with their official flags.
const LANGUAGES: { code: SupportedLanguage; nativeName: string; Flag: FlagComp | null }[] = [
  { code: "bs", nativeName: "Bosanski", Flag: FlagBA },
  { code: "de", nativeName: "Deutsch", Flag: FlagDE },
];

/**
 * Responsive flag slot. Larger on small screens (where dropdown buttons
 * are tap-sized and stars must remain legible) and on high-DPR devices.
 *  - mobile (<640px):  34
 *  - tablet (<1024px): 30
 *  - desktop:          28
 * Sidebar variant adds +4px across the board.
 * On DPR >= 2 we add +2px so anti-aliased star points stay crisp.
 */
function useResponsiveFlagSize(variant: "header" | "sidebar"): number {
  const [size, setSize] = useState<number>(28);
  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      const dpr = window.devicePixelRatio || 1;
      let base: number;
      if (w < 640) base = 34;
      else if (w < 1024) base = 30;
      else base = 28;
      if (variant === "sidebar") base += 4;
      if (dpr >= 2) base += 2;
      setSize(base);
    };
    compute();
    const mqls = [
      window.matchMedia("(max-width: 639px)"),
      window.matchMedia("(max-width: 1023px)"),
      window.matchMedia("(min-resolution: 2dppx)"),
    ];
    mqls.forEach((m) => m.addEventListener("change", compute));
    window.addEventListener("resize", compute);
    return () => {
      mqls.forEach((m) => m.removeEventListener("change", compute));
      window.removeEventListener("resize", compute);
    };
  }, [variant]);
  return size;
}

const GOLD = "#D4AF37";

interface Props {
  /** Visual variant: "header" (default, dark glass) or "sidebar" (light, larger). */
  variant?: "header" | "sidebar";
}

export function LanguageSwitcher({ variant = "header" }: Props) {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const flagSize = useResponsiveFlagSize(variant);

  const currentEntry =
    LANGUAGES.find((l) => l.code === i18n.language) ?? LANGUAGES[0];
  const currentLang = currentEntry.code;
  const currentNative = currentEntry.nativeName;
  const CurrentFlag = currentEntry.Flag;

  const handleSelect = async (lang: SupportedLanguage) => {
    if (lang === currentLang) {
      setOpen(false);
      return;
    }
    // 1. Update i18next FIRST so subsequent renders use the new language.
    await i18n.changeLanguage(lang);

    // 2. Persist to localStorage.
    try {
      localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch {
      /* storage unavailable — ignore */
    }

    // 3. Update <html lang>.
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }

    // 4. Compute mirror path (preserves search/hash).
    const target = mirrorPath(location.pathname, lang);

    // 5. Navigate to mirror path.
    navigate(`${target}${location.search}${location.hash}`);

    // 6. Close dropdown.
    setOpen(false);
  };

  const isHeader = variant === "header";

  // Header: round 36x36 icon-only button on mobile, expands to label+chevron on desktop.
  // Sidebar: full-width labeled row.
  const triggerClass = isHeader
    ? "inline-flex items-center justify-center sm:justify-start sm:gap-1.5 text-[12px] font-semibold text-white/85 transition-all hover:text-white"
    : "inline-flex items-center justify-between w-full gap-2 rounded-lg text-sm font-semibold text-foreground transition-all hover:bg-muted/50";

  const triggerStyle: React.CSSProperties = isHeader
    ? {
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.1)",
        letterSpacing: "0.02em",
      }
    : {
        padding: "10px 14px",
        border: "1px solid hsl(var(--border))",
      };

  // Compact flag for the round mobile trigger so it fits cleanly inside 36x36.
  const headerTriggerFlagSize = 20;

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        aria-label="Language / Sprache / Jezik"
        className={`${triggerClass} focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/60 data-[state=open]:scale-[1.02] transition-transform duration-200 rounded-full sm:rounded-full h-9 w-9 sm:h-auto sm:w-auto sm:px-3.5 sm:py-1.5`}
        style={triggerStyle}
      >
        {CurrentFlag ? (
          <>
            {/* Mobile: small flag fitted to round button */}
            <span className="sm:hidden inline-flex">
              <CurrentFlag width={headerTriggerFlagSize} />
            </span>
            {/* Desktop / sidebar: responsive flag */}
            <span className="hidden sm:inline-flex">
              <CurrentFlag width={flagSize} />
            </span>
          </>
        ) : null}
        <span
          className={isHeader ? "hidden sm:inline" : ""}
          style={{ marginLeft: CurrentFlag && !isHeader ? 8 : undefined }}
        >
          {currentNative}
        </span>
        <ChevronDown
          className={`h-3.5 w-3.5 opacity-70 ${isHeader ? "hidden sm:inline-block" : ""}`}
          strokeWidth={2.25}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={6}
        className="min-w-[180px] rounded-xl border-white/10 bg-[#0d1526] p-1 text-white shadow-2xl animate-in fade-in-0 zoom-in-95 duration-200"
      >
        {LANGUAGES.map((lang) => {
          const active = lang.code === currentLang;
          const RowFlag = lang.Flag;
          return (
            <DropdownMenuItem
              key={lang.code}
              onSelect={(e) => {
                e.preventDefault();
                void handleSelect(lang.code);
              }}
              className={`flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm font-medium outline-none transition-colors focus:bg-white/5 ${
                active
                  ? "border-l-2 text-white"
                  : "border-l-2 border-transparent text-white/70 hover:bg-white/5 hover:text-white"
              }`}
              style={active ? { borderLeftColor: GOLD } : undefined}
            >
              <span className="flex items-center gap-2">
                {RowFlag ? (
                  <RowFlag width={flagSize} />
                ) : (
                  // Spacer so labels with and without a flag align identically.
                  <span
                    aria-hidden
                    style={{ width: flagSize, display: "inline-block", flexShrink: 0 }}
                  />
                )}
                <span>{lang.nativeName}</span>
              </span>
              {active && <Check className="h-4 w-4" style={{ color: GOLD }} strokeWidth={2.5} />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LanguageSwitcher;
