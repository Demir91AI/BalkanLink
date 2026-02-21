import { useCountry } from "@/contexts/CountryContext";
import { useLanguage } from "@/contexts/LanguageContext";

export default function CountryNavBar() {
  const { activeCountry, setActiveCountry, countries } = useCountry();
  const { t } = useLanguage();

  return (
    <div
      className="sticky top-14 z-40 overflow-x-auto scrollbar-hide"
      style={{
        background: "rgba(11,31,58,0.97)",
        borderBottom: "1px solid rgba(227,179,65,0.12)",
      }}
    >
      <div className="container flex gap-1 py-2">
        {countries.map((c) => {
          const isActive = activeCountry === c.code;
          return (
            <button
              key={c.code}
              onClick={() => setActiveCountry(c.code)}
              className="flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold transition-all"
              style={{
                background: isActive ? "rgba(227,179,65,0.15)" : "transparent",
                color: isActive ? "#E3B341" : "rgba(255,255,255,0.5)",
                border: isActive ? "1px solid rgba(227,179,65,0.3)" : "1px solid transparent",
              }}
            >
              <span className="text-base leading-none">{c.flag}</span>
              <span className="hidden sm:inline">{t(c.nameKey)}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
