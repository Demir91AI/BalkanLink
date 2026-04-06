import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { type Language } from "@/lib/translations";

const LANG_OPTIONS: { code: string; label: string; flag: string }[] = [
  { code: "de", label: "Deutsch", flag: "https://flagcdn.com/h40/de.png" },
  { code: "bs", label: "Bosanski", flag: "https://flagcdn.com/h40/ba.png" },
  { code: "hr", label: "Hrvatski", flag: "https://flagcdn.com/h40/hr.png" },
  { code: "sr", label: "Srpski", flag: "https://flagcdn.com/h40/rs.png" },
  { code: "me", label: "Crnogorski", flag: "https://flagcdn.com/h40/me.png" },
  { code: "sl", label: "Slovenščina", flag: "https://flagcdn.com/h40/si.png" },
  { code: "mk", label: "Македонски", flag: "https://flagcdn.com/h40/mk.png" },
  { code: "sq", label: "Shqip", flag: "https://flagcdn.com/h40/al.png" },
];

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = LANG_OPTIONS.find((l) => l.code === language) || LANG_OPTIONS[0];

  const handleChange = (code: string) => {
    setLanguage(code as Language);
    setOpen(false);
  };

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative z-50">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-2 rounded-[24px] px-[14px] py-[6px] transition-all duration-200 cursor-pointer"
        style={{
          background: "rgba(255,255,255,0.15)",
          border: "1px solid rgba(255,255,255,0.35)",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.25)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.15)")}
      >
        <img src={current.flag} alt="" className="h-[20px] w-auto" style={{ imageRendering: "auto" }} />
        <span className="text-[13px] font-medium text-white">{current.label}</span>
        <ChevronDown className="h-[14px] w-[14px] text-white" />
      </button>

      {open && (
        <div
          className="absolute top-full right-0 mt-2 w-[200px] rounded-[12px] bg-white py-2"
          style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.15)" }}
        >
          {LANG_OPTIONS.map((opt) => (
            <button
              key={opt.code}
              onClick={() => handleChange(opt.code)}
              className="flex w-full items-center gap-3 px-4 py-[10px] text-left transition-colors hover:bg-[#FFF8EC]"
              style={{
                borderLeft: opt.code === language ? "3px solid #C9A84C" : "3px solid transparent",
                fontWeight: opt.code === language ? 700 : 400,
              }}
            >
              <img src={opt.flag} alt="" className="h-[20px] w-auto" />
              <span className="text-[14px] text-[#2D2D2D]">{opt.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
