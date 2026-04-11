import { useLanguage } from "@/contexts/LanguageContext";

export function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();
  return (
    <div className="flex items-center gap-1 text-xs font-semibold">
      <button
        onClick={() => setLang("bs")}
        className={`px-2 py-1 rounded transition-colors ${
          lang === "bs"
            ? "bg-[hsl(var(--gold))] text-white"
            : "text-white/50 hover:text-white"
        }`}
      >
        BS
      </button>
      <span className="text-white/30">|</span>
      <button
        onClick={() => setLang("de")}
        className={`px-2 py-1 rounded transition-colors ${
          lang === "de"
            ? "bg-[hsl(var(--gold))] text-white"
            : "text-white/50 hover:text-white"
        }`}
      >
        DE
      </button>
    </div>
  );
}
