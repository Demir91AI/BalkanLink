import { useLanguage } from "@/contexts/LanguageContext";
import { type Language } from "@/lib/translations";

interface LangPill {
  id: string;
  label: string;
  flag: string;
  lang: Language;
}

const PILLS: LangPill[] = [
  { id: "bs", label: "BS", flag: "🇧🇦", lang: "bhs" },
  { id: "hr", label: "HR", flag: "🇭🇷", lang: "bhs" },
  { id: "sr", label: "SR", flag: "🇷🇸", lang: "bhs" },
  { id: "de", label: "DE", flag: "🇩🇪", lang: "de" },
];

const LS_VARIANT_KEY = "balkanlink-variant";

function getSavedVariant(): string {
  try {
    return localStorage.getItem(LS_VARIANT_KEY) || "bs";
  } catch {
    return "bs";
  }
}

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  // Track which BHS variant is visually selected
  const activeId =
    language === "de" ? "de" : getSavedVariant();

  const handleClick = (pill: LangPill) => {
    if (pill.lang === "bhs") {
      try {
        localStorage.setItem(LS_VARIANT_KEY, pill.id);
      } catch {}
    }
    setLanguage(pill.lang);
    // Force re-render for variant highlight
    if (pill.lang === language && pill.lang === "bhs") {
      window.dispatchEvent(new Event("storage"));
    }
  };

  return (
    <div className="flex items-center gap-1">
      {PILLS.map((pill) => {
        const isActive = pill.id === activeId;
        return (
          <button
            key={pill.id}
            onClick={() => handleClick(pill)}
            className="inline-flex items-center gap-1 rounded-full px-2.5 py-[5px] text-[12px] font-semibold transition-all duration-200 cursor-pointer border"
            style={{
              background: isActive ? "#C9A84C" : "rgba(255,255,255,0.08)",
              color: isActive ? "#1a1a1a" : "rgba(255,255,255,0.85)",
              borderColor: isActive ? "#C9A84C" : "rgba(255,255,255,0.2)",
            }}
          >
            <span className="text-[13px] leading-none">{pill.flag}</span>
            <span>{pill.label}</span>
          </button>
        );
      })}
    </div>
  );
}
