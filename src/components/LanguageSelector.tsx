import { useLanguage } from "@/contexts/LanguageContext";
import { type Language } from "@/lib/translations";

interface LangPill {
  id: string;
  label: string;
  flagUrl: string;
  lang: Language;
}

const BALKAN_PILLS: LangPill[] = [
  { id: "bs", label: "BS", flagUrl: "https://flagcdn.com/w40/ba.png", lang: "bhs" },
  { id: "hr", label: "HR", flagUrl: "https://flagcdn.com/w40/hr.png", lang: "bhs" },
  { id: "sr", label: "SR", flagUrl: "https://flagcdn.com/w40/rs.png", lang: "bhs" },
];

const DE_PILL: LangPill = { id: "de", label: "DE", flagUrl: "https://flagcdn.com/w40/de.png", lang: "de" };

const LS_VARIANT_KEY = "balkanlink-variant";

function getSavedVariant(): string {
  try {
    return localStorage.getItem(LS_VARIANT_KEY) || "bs";
  } catch {
    return "bs";
  }
}

function Pill({ pill, isActive, onClick }: { pill: LangPill; isActive: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-[5px] text-[12px] font-semibold transition-all duration-200 cursor-pointer border"
      style={{
        background: isActive ? "#C9A84C" : "rgba(255,255,255,0.08)",
        color: isActive ? "#1a1a1a" : "rgba(255,255,255,0.85)",
        borderColor: isActive ? "#C9A84C" : "rgba(255,255,255,0.2)",
      }}
    >
      <img
        src={pill.flagUrl}
        alt={pill.label}
        width={16}
        height={12}
        className="rounded-[2px] object-cover"
        style={{ width: 16, height: 12 }}
        loading="eager"
      />
      <span>{pill.label}</span>
    </button>
  );
}

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  const activeId = language === "de" ? "de" : getSavedVariant();

  const handleClick = (pill: LangPill) => {
    if (pill.lang === "bhs") {
      try {
        localStorage.setItem(LS_VARIANT_KEY, pill.id);
      } catch {}
    }
    setLanguage(pill.lang);
    if (pill.lang === language && pill.lang === "bhs") {
      window.dispatchEvent(new Event("storage"));
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* BHS group */}
      <div className="flex items-center gap-1">
        {BALKAN_PILLS.map((pill) => (
          <Pill
            key={pill.id}
            pill={pill}
            isActive={pill.id === activeId}
            onClick={() => handleClick(pill)}
          />
        ))}
      </div>

      {/* Divider */}
      <div className="w-px h-5 bg-white/25" />

      {/* DE */}
      <Pill
        pill={DE_PILL}
        isActive={activeId === "de"}
        onClick={() => handleClick(DE_PILL)}
      />
    </div>
  );
}
